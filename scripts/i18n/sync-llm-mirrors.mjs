#!/usr/bin/env node
/**
 * sync-llm-mirrors.mjs — keep docs/i18n/<locale>/llm.txt in lock-step with
 * the root `llm.txt`. The mirrors are strict copies (no translation): they
 * preserve the per-locale heading + language bar block they already have at
 * the top of the file, then replace everything after the `---` separator with
 * the root body (heading stripped).
 *
 * Usage:
 *   node scripts/i18n/sync-llm-mirrors.mjs
 *
 * Idempotent. Safe to run repeatedly. Used after any edit to `llm.txt` to
 * keep `npm run check:docs-sync` green.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const I18N_DIR = path.join(ROOT, "docs", "i18n");
const ROOT_LLM = path.join(ROOT, "llm.txt");
const FILE_NAME = "llm.txt";

function stripTopHeading(content) {
  return content.replace(/^# .+\r?\n+/, "");
}

async function main() {
  const rootText = await fs.readFile(ROOT_LLM, "utf8");
  const rootBody = stripTopHeading(rootText).replace(/\r\n/g, "\n");

  const entries = await fs.readdir(I18N_DIR, { withFileTypes: true });
  const locales = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  let updated = 0;
  let unchanged = 0;
  let missing = 0;

  for (const locale of locales) {
    const target = path.join(I18N_DIR, locale, FILE_NAME);
    let existing;
    try {
      existing = await fs.readFile(target, "utf8");
    } catch {
      console.warn(`[sync-llm-mirrors] skip ${locale}: ${FILE_NAME} missing`);
      missing += 1;
      continue;
    }

    // The locale header is everything up to and including the first `---`
    // separator on its own line. We keep that prefix verbatim and replace
    // the rest with the root body.
    const sepMatch = existing.match(/^---\s*$/m);
    if (!sepMatch || sepMatch.index === undefined) {
      console.warn(`[sync-llm-mirrors] skip ${locale}: missing --- separator`);
      missing += 1;
      continue;
    }

    const headerEnd = sepMatch.index + sepMatch[0].length;
    const header = existing.slice(0, headerEnd).replace(/\r\n/g, "\n");
    const trimmedHeader = header.replace(/\n+$/, "");
    const next = `${trimmedHeader}\n\n${rootBody.trimStart()}`.replace(/\r\n/g, "\n");

    const normalizedExisting = existing.replace(/\r\n/g, "\n");
    if (normalizedExisting === next) {
      unchanged += 1;
      continue;
    }
    await fs.writeFile(target, next, "utf8");
    updated += 1;
    console.log(`[sync-llm-mirrors] updated docs/i18n/${locale}/${FILE_NAME}`);
  }

  console.log(
    `[sync-llm-mirrors] done — updated=${updated} unchanged=${unchanged} missing=${missing} (${locales.length} locales)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
