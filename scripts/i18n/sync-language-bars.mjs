#!/usr/bin/env node
/**
 * Rewrites every `🌐 **Languages:** …` bar from config/i18n.json:
 *   - English sources (root MDs + docs/**.md that already carry a bar) → buildSourceBar
 *   - mirrors under docs/i18n/<locale>/ → buildMirrorBar
 * Never inserts a bar where there is none. Idempotent. `--dry-run` lists files.
 */
import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildMirrorBar, buildSourceBar, replaceLanguageBar } from "./lib/language-bar.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

async function walkMd(dir, out = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkMd(abs, out);
    else if (entry.name.endsWith(".md") || entry.name === "llm.txt") out.push(abs);
  }
  return out;
}

export async function syncLanguageBars({ root = ROOT, dryRun = false } = {}) {
  const config = JSON.parse(await fs.readFile(path.join(root, "config", "i18n.json"), "utf8"));
  const changed = [];
  // 1. English sources under docs/ (excluding docs/i18n).
  for (const abs of await walkMd(path.join(root, "docs"))) {
    const rel = path.relative(root, abs).split(path.sep).join("/");
    if (rel.startsWith("docs/i18n/")) continue;
    const text = await fs.readFile(abs, "utf8");
    const next = replaceLanguageBar(text, buildSourceBar(rel, config));
    if (next && next !== text) {
      changed.push(rel);
      if (!dryRun) await fs.writeFile(abs, next, "utf8");
    }
  }
  // 2. Mirrors.
  for (const entry of config.locales) {
    const dir = path.join(root, "docs", "i18n", entry.code);
    if (!existsSync(dir)) continue;
    for (const abs of await walkMd(dir)) {
      const relInMirror = path.relative(dir, abs).split(path.sep).join("/");
      const text = await fs.readFile(abs, "utf8");
      const next = replaceLanguageBar(text, buildMirrorBar(relInMirror, entry.code, config));
      if (next && next !== text) {
        changed.push(path.relative(root, abs).split(path.sep).join("/"));
        if (!dryRun) await fs.writeFile(abs, next, "utf8");
      }
    }
  }
  return changed;
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  const dryRun = process.argv.includes("--dry-run");
  syncLanguageBars({ dryRun })
    .then((changed) =>
      console.log(`[i18n-bars] ${dryRun ? "would update" : "updated"} ${changed.length} file(s)`)
    )
    .catch((err) => {
      console.error("[i18n-bars] ERROR", err?.stack || err?.message || String(err));
      process.exit(1);
    });
}
