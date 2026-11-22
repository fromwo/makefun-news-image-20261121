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

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(repoRoot, "entry.png");
const outputDir = "/output";
const targetImage = join(outputDir, "entry.png");

if (!existsSync(sourceImage)) {
  throw new Error(`entry.png not found next to main.ts: ${sourceImage}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceImage, targetImage);

console.log(`Wrote ${targetImage}`);
