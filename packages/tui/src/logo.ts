// ORCHIUM wordmark, compressed to 3 terminal rows using
// half-block chars (▀ ▄) so it renders at correct terminal aspect ratio.
// Left column is rendered muted, right column bold — the renderer's 1-char
// gap is the H–I separator.
export const logo = {
  left: [
    "▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █",
    "█   █ █▀▀█  █     █▀▀▀█",
    " ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀",
  ],
  right: [
    "▀█▀ █   █ █▄ ▄█",
    " █  █   █ █ ▀ █",
    "▀▀▀  ▀▀▀  ▀   ▀",
  ],
}

// Pulse renderer geometry follows the wordmark dims (left 23, gap 1, right 15).
export const go = {
  left: logo.left,
  right: logo.right,
}

export const marks = "_^~,"