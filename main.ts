// main.ts — entry point for the make.fun "Sum up 21 November's world news
// in one image" bounty (news-image-20261121).
//
// The entry artwork is entry.png, a news infographic drawn for this
// competition summarising six verified stories from 21 November 2026:
// the AI stock sell-off, the World Court's Myanmar genocide ruling,
// the capture of cartel boss "El Chapo Isidro" in Mexico, the Russian
// missile strike on Kryvyi Rih, the COP31 talks running past deadline,
// and the dengue-cutting mosquito trial in Brazil.
//
// Running this script copies the artwork into the output directory so
// the generated entry.png is available at /output/entry.png.

import { copyFileSync, existsSync, mkdirSync, openSync, readSync, closeSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(repoRoot, "entry.png");
const outputDir = "/output";
const targetImage = join(outputDir, "entry.png");

if (!existsSync(sourceImage)) {
  throw new Error(`entry.png not found next to main.ts: ${sourceImage}`);
}

// A PNG file always starts with the 8-byte signature
// 89 50 4E 47 0D 0A 1A 0A. Refuse to copy anything else so a
// misnamed or truncated file can never be submitted as the entry.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const fd = openSync(sourceImage, "r");
try {
  const header = Buffer.alloc(PNG_SIGNATURE.length);
  if (readSync(fd, header, 0, header.length, 0) !== PNG_SIGNATURE.length || !header.equals(PNG_SIGNATURE)) {
    throw new Error(`entry.png is not a valid PNG file: ${sourceImage}`);
  }
} finally {
  closeSync(fd);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceImage, targetImage);

console.log(`Wrote ${targetImage}`);
