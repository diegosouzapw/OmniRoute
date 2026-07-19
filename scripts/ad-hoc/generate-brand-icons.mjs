// Regenerates the raster brand icons in public/ from their SVG sources, so the
// PNG/ICO assets can never drift from the canonical vector artwork again.
//
//   public/favicon.svg           → public/favicon.ico (16/32/48/64/96/128/256, PNG frames)
//   public/favicon.svg           → public/icon-512.png
//   public/apple-touch-icon.svg  → public/apple-touch-icon.png (180×180, as declared in layout.tsx)
//
// Usage:
//   npm i --no-save sharp
//   node scripts/ad-hoc/generate-brand-icons.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("sharp is required: npm i --no-save sharp");
  process.exit(1);
}

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");
const faviconSvg = readFileSync(join(publicDir, "favicon.svg"));
const appleSvg = readFileSync(join(publicDir, "apple-touch-icon.svg"));

// favicon.svg is authored on a 32×32 viewBox; scale density so each target
// size is rendered from the vector instead of upscaling a small raster.
// Palette quantization (8-bit, ≤256 colors) is only applied where asked:
// it keeps the ICO frames tiny, but measurably clips the antialiased
// gradient on large standalone PNGs (1242 → 253 distinct colors at 512px),
// so those stay truecolor.
const renderPng = (svg, viewBox, size, usePalette = false) =>
  sharp(svg, { density: 72 * (size / viewBox) })
    .resize(size, size)
    .png({ compressionLevel: 9, palette: usePalette, effort: 10 })
    .toBuffer();

// ICO container with PNG-compressed frames (identical layout to the icon the
// package previously shipped, but ~16 KB instead of ~141 KB).
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + 16 * frames.length;
  const entries = frames.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size === 256 ? 0 : size, 0); // width (0 means 256)
    e.writeUInt8(size === 256 ? 0 : size, 1); // height
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...frames.map((f) => f.png)]);
}

const icoSizes = [16, 32, 48, 64, 96, 128, 256];
const frames = [];
for (const size of icoSizes) {
  frames.push({ size, png: await renderPng(faviconSvg, 32, size, true) });
}
writeFileSync(join(publicDir, "favicon.ico"), buildIco(frames));

writeFileSync(join(publicDir, "icon-512.png"), await renderPng(faviconSvg, 32, 512));

// layout.tsx declares apple-touch-icon.png as 180×180; its SVG source is
// authored on a 180×180 viewBox.
writeFileSync(join(publicDir, "apple-touch-icon.png"), await renderPng(appleSvg, 180, 180));

console.log(`favicon.ico (${icoSizes.join("/")}), icon-512.png, apple-touch-icon.png regenerated`);
