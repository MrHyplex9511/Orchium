import fs from "fs/promises"
import fsSync from "fs"
import path from "path"
import os from "os"
import readline from "readline/promises"
import type { Argv } from "yargs"
import { Global } from "@orchium/core/global"
import { cmd } from "./cmd"
import { UI } from "../ui"

const legacyHome = () => path.join(os.homedir(), ".opencode")
const legacyConfig = () => path.join(os.homedir(), ".config", "opencode")
const legacyData = () => path.join(os.homedir(), ".local", "share", "opencode")
const flagFile = () => path.join(Global.Path.config, ".migration-complete")

export function checkForLegacyOpencode(): boolean {
  return fsSync.existsSync(legacyHome()) || fsSync.existsSync(legacyConfig()) || fsSync.existsSync(legacyData())
}

export function shouldShowMigrationNotice(): boolean {
  return checkForLegacyOpencode() && !fsSync.existsSync(flagFile())
}

const NOTICE = `Detected a legacy OpenCode installation.

Orchium can migrate your:
  • Session history (from ~/.local/share/opencode)
  • Configuration (agents, MCP servers, permissions)
  • Skills and instructions

Run \`orchium migrate\` to migrate, or \`orchium migrate --skip\` to dismiss.`

export function showMigrationNotice() {
  process.stderr.write(NOTICE + "\n")
}

async function copyEntry(source: string, target: string, copied: string[], skipped: string[]) {
  if (fsSync.existsSync(target)) {
    skipped.push(target)
    return
  }
  const sourceStat = await fs.stat(source)
  if (sourceStat.isDirectory()) {
    await fs.mkdir(target, { recursive: true })
    for (const entry of await fs.readdir(source, { withFileTypes: true })) {
      await copyEntry(path.join(source, entry.name), path.join(target, entry.name), copied, skipped)
    }
    return
  }
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.copyFile(source, target)
  copied.push(target)
}

async function copyDatabase(sourceDir: string, copied: string[], skipped: string[]) {
  const targetDir = Global.Path.data
  await fs.mkdir(targetDir, { recursive: true })

  // WAL-mode SQLite DB: copy the main file + WAL + SHM for consistency.
  const entries = [
    { source: "opencode.db", target: "orchium.db" },
    { source: "opencode.db-wal", target: "orchium.db-wal" },
    { source: "opencode.db-shm", target: "orchium.db-shm" },
  ]

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.source)
    const targetPath = path.join(targetDir, entry.target)
    if (!fsSync.existsSync(sourcePath)) continue
    if (fsSync.existsSync(targetPath)) {
      skipped.push(targetPath)
      continue
    }
    UI.println(`  Copying ${entry.source}...`)
    await fs.copyFile(sourcePath, targetPath)
    copied.push(targetPath)
  }
}

export async function migrate() {
  const copied: string[] = []
  const skipped: string[] = []

  // Session history — copy the database from legacy data directory.
  const dataDir = legacyData()
  if (fsSync.existsSync(dataDir)) {
    UI.println("Migrating session history...")
    await copyDatabase(dataDir, copied, skipped)
  }

  // Configuration files.
  const jobs: Array<{ source: string; target: string }> = [
    { source: path.join(legacyConfig(), "opencode.json"), target: path.join(Global.Path.config, "orchium.json") },
    { source: path.join(legacyConfig(), "opencode.jsonc"), target: path.join(Global.Path.config, "orchium.jsonc") },
    { source: path.join(legacyConfig(), "agents"), target: path.join(Global.Path.config, "agents") },
    { source: path.join(legacyConfig(), "skills"), target: path.join(Global.Path.config, "skills") },
  ]

  for (const job of jobs) {
    if (!fsSync.existsSync(job.source)) continue
    await copyEntry(job.source, job.target, copied, skipped)
  }

  // Legacy home directory (very old installs).
  if (fsSync.existsSync(legacyHome())) {
    await copyEntry(path.join(legacyHome(), "opencode.json"), path.join(Global.Path.config, "orchium.json"), copied, skipped)
    await copyEntry(path.join(legacyHome(), "opencode.jsonc"), path.join(Global.Path.config, "orchium.jsonc"), copied, skipped)
  }

  await fs.mkdir(Global.Path.config, { recursive: true })
  await fs.writeFile(flagFile(), "", "utf8")

  UI.println(UI.Style.TEXT_SUCCESS_BOLD + "Migration complete" + UI.Style.TEXT_NORMAL)
  if (copied.length > 0) {
    UI.println("Copied:")
    for (const file of copied) UI.println("  " + file)
  }
  if (skipped.length > 0) {
    UI.println("Skipped (target already exists):")
    for (const file of skipped) UI.println("  " + file)
  }
}

export async function skipMigration() {
  await fs.mkdir(Global.Path.config, { recursive: true })
  await fs.writeFile(flagFile(), "", "utf8")
}

async function confirm(): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const answer = await rl.question("Migrate? [y/N] ")
  rl.close()
  return answer.trim().toLowerCase() === "y"
}

export const MigrateCommand = cmd({
  command: "migrate",
  describe: "Migrate data from a legacy OpenCode installation",
  builder: (yargs: Argv) =>
    yargs
      .option("skip", {
        describe: "dismiss the migration notice without migrating",
        type: "boolean",
      })
      .option("yes", {
        alias: "y",
        describe: "migrate without prompting",
        type: "boolean",
      }),
  handler: async (args: { skip?: boolean; yes?: boolean }) => {
    if (args.skip) {
      await skipMigration()
      UI.println("Migration notice dismissed.")
      return
    }
    if (args.yes || (await confirm())) {
      await migrate()
      return
    }
    UI.println("Migration skipped.")
  },
})
