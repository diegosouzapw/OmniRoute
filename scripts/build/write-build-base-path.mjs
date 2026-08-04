#!/usr/bin/env node

/**
 * Writes BUILD_OMNIROUTE_BASE_PATH into the standalone bundle so container start
 * can compare the baked Next.js basePath against OMNIROUTE_BASE_PATH.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeBasePath } from "./normalizeBasePath.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const NEXT_DIST = process.env.NEXT_DIST_DIR || ".build/next";

function writeSentinel(targetDir) {
  const basePath = normalizeBasePath(process.env.OMNIROUTE_BASE_PATH);
  const sentinel = path.join(targetDir, "BUILD_OMNIROUTE_BASE_PATH");
  fs.writeFileSync(sentinel, `${basePath}\n`);
  return { basePath, sentinel };
}

const standaloneDir = path.join(ROOT, NEXT_DIST, "standalone");
if (!fs.existsSync(standaloneDir)) {
  console.error(
    `[write-build-base-path] FATAL: standalone dir not found: ${standaloneDir}\n` +
      "  Run `npm run build` first."
  );
  process.exit(1);
}

const { basePath, sentinel } = writeSentinel(standaloneDir);
console.log(
  `[write-build-base-path] Recorded basePath ${basePath || "(root)"} -> ${path.relative(ROOT, sentinel)}`
);

const distDir = path.join(ROOT, "dist");
if (fs.existsSync(distDir)) {
  const distSentinel = writeSentinel(distDir).sentinel;
  console.log(`[write-build-base-path] Recorded basePath -> ${path.relative(ROOT, distSentinel)}`);
}
