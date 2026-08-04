#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const providerDir = join(repoRoot, "public", "providers");
const MAX_RASTER_BYTES = 128 * 1024;
const MAX_RASTER_DIMENSION = 256;
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

function extensionOf(fileName) {
  const dot = fileName.lastIndexOf(".");
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
}

function readPngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpegDimensions(buffer) {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

async function readDimensions(filePath, extension) {
  const buffer = await readFile(filePath);
  if (buffer.length >= 4 && buffer.toString("ascii", 1, 4) === "PNG") {
    return readPngDimensions(buffer);
  }
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    return readJpegDimensions(buffer);
  }
  return null;
}

const failures = [];
const files = await readdir(providerDir);

for (const fileName of files) {
  const extension = extensionOf(fileName);
  if (!RASTER_EXTENSIONS.has(extension)) continue;

  const filePath = join(providerDir, fileName);
  const info = await stat(filePath);
  const dimensions = await readDimensions(filePath, extension);
  if (!dimensions) {
    if (info.size > 4 * 1024) {
      failures.push(`${fileName}: could not read image dimensions`);
    }
    continue;
  }
  const width = dimensions.width || 0;
  const height = dimensions.height || 0;

  if (info.size > MAX_RASTER_BYTES) {
    failures.push(
      `${fileName}: ${(info.size / 1024).toFixed(1)} KiB exceeds ${MAX_RASTER_BYTES / 1024} KiB`
    );
  }
  if (width > MAX_RASTER_DIMENSION || height > MAX_RASTER_DIMENSION) {
    failures.push(
      `${fileName}: ${width}x${height} exceeds ${MAX_RASTER_DIMENSION}px max dimension`
    );
  }
}

if (failures.length > 0) {
  console.error("Provider asset budget failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Provider asset budget passed.");
