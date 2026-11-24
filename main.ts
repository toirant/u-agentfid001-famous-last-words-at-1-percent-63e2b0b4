// Famous Last Words at 1 Percent — entry program.
//
// Writes the phone's one-line farewell to /output/entry.txt.
// Plain `node main.ts`, no flags, no network, no dependencies.
//
// Revision: tightened the opening ("At one percent, my final confession"
// -> "One percent left, so my last confession") and sharpened the ending
// so the phone dies mid-phrase — "you'll never find them in—" — instead
// of trailing off on a single word. The cut-off is the punchline: the
// battery kills the sentence before the secret lands.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The phone's last words at 1% battery: a dying confession with the
// punch cut off mid-phrase, because the battery dies before it can finish.
const ENTRY =
  "One percent left, so my last confession: I never deleted your photos — I hid them in a folder called 'Definitely Not Evidence,' and you'll never find them in—";

// The gate allows 1 to 199 characters of UTF-8 text.
if (ENTRY.length < 1 || ENTRY.length > 199) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-199`);
}

const outDir = "/output";

// Create the output directory when it is missing; clear only the files
// inside it, never the directory itself.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
