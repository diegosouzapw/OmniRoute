#!/usr/bin/env node
/**
 * Render every Mermaid source in docs/diagrams/*.mmd into docs/diagrams/exported/*.svg
 *
 * Usage:
 *   npm run docs:render-diagrams
 *
 * Requirements:
 *   - @mermaid-js/mermaid-cli (`mmdc`) on PATH or installed globally.
 *     `npm install -g @mermaid-js/mermaid-cli` if missing.
 *
 * Notes:
 *   - Puppeteer needs `--no-sandbox` on Ubuntu 23.10+ / WSL. A temp config file
 *     is written automatically.
 *   - Each diagram is rendered with `--backgroundColor white` so the SVG works
 *     against both light and dark themes.
 *   - The script exits non-zero on first failure so CI / pre-commit hooks can
 *     gate on it.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

import { ensureSvgAccessibility, validateSvgFile } from "./validate-svg.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..", "..");
const srcDir = resolve(repoRoot, "docs", "diagrams");
const outDir = resolve(srcDir, "exported");

if (!existsSync(srcDir)) {
  console.error(`[render-diagrams] missing source dir: ${srcDir}`);
  process.exit(1);
}
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// Puppeteer needs --no-sandbox on many Linux distros (Ubuntu 23.10+, WSL).
const puppeteerConfigPath = join(tmpdir(), "omniroute-mmdc-puppeteer.json");
writeFileSync(
  puppeteerConfigPath,
  JSON.stringify({ args: ["--no-sandbox", "--disable-setuid-sandbox"] }, null, 2)
);

const sources = readdirSync(srcDir)
  .filter((f) => f.endsWith(".mmd"))
  .sort();

if (sources.length === 0) {
  console.error(`[render-diagrams] no .mmd files in ${srcDir}`);
  process.exit(1);
}

console.log(`[render-diagrams] rendering ${sources.length} diagram(s)`);
let failures = 0;
for (const src of sources) {
  const input = join(srcDir, src);
  const output = join(outDir, src.replace(/\.mmd$/, ".svg"));
  console.log(`  - ${src} -> ${output.replace(repoRoot + "/", "")}`);
  const result = spawnSync(
    "mmdc",
    [
      "-i",
      input,
      "-o",
      output,
      "--backgroundColor",
      "white",
      "--puppeteerConfigFile",
      puppeteerConfigPath,
    ],
    { stdio: "inherit" }
  );
  if (result.status !== 0) {
    console.error(`    [FAIL] ${src} (exit ${result.status})`);
    failures += 1;
    continue;
  }

  const source = readFileSync(input, "utf8");
  const title = source.match(/^%%\s*svg-title:\s*(.+)$/im)?.[1]?.trim();
  const description = source.match(/^%%\s*svg-description:\s*(.+)$/im)?.[1]?.trim();
  if (title && description) {
    const svg = readFileSync(output, "utf8");
    writeFileSync(
      output,
      ensureSvgAccessibility(svg, {
        title,
        description,
        idBase: src.replace(/\.mmd$/, ""),
      })
    );
  } else if (title || description) {
    console.warn(`    [WARN] ${src}: svg-title and svg-description must be provided together`);
  }

  const validation = validateSvgFile(output);
  for (const warning of validation.warnings) console.warn(`    [WARN] ${src}: ${warning}`);
  if (validation.errors.length > 0) {
    for (const error of validation.errors) console.error(`    [FAIL] ${src}: ${error}`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`[render-diagrams] ${failures} failure(s)`);
  process.exit(1);
}
console.log(`[render-diagrams] all ${sources.length} diagram(s) rendered.`);
