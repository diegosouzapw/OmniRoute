#!/usr/bin/env node
/**
 * OmniRoute — UI i18n ICU gate (CI gate, blocking).
 *
 * Compiles EVERY message value in every locale catalog
 * (src/i18n/messages/*.json) with `IntlMessageFormat` — the exact parser
 * next-intl uses under the hood. Any message that fails to compile will
 * throw INVALID_MESSAGE / INVALID_TAG / UNCLOSED_TAG / MALFORMED_ARGUMENT in
 * the running app (RSC Flight path) and silently break that page — the card
 * falls back to the raw key name instead of the translated copy.
 *
 * Real incidents this gate prevents (all same class, all fixed with ICU
 * single-quote escaping):
 *   - #12302: `ccOnboardingKeyPlaceholder` = `<your OmniRoute API key>`
 *     in every locale catalog — INVALID_TAG crashed the Claude Code onboarding
 *     block.
 *   - #12505: `featureFlags.definitions.OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES
 *     .description` = `~/.claude/profiles/<name>/settings.json` in every
 *     locale catalog
 *     locales — UNCLOSED_TAG made the Feature Flags page show the raw key.
 *   - The same class had already shipped 4 more times: `<gateway-alias>/
 *     <model>` (feature flag description), literal JSON/regex paste-hint
 *     examples (`[{ json, name?, email? }...]`), and `{" "}` artifacts in
 *     two status labels — 381 message values total, all fixed in one sweep
 *     by `scripts/ad-hoc/fix-invalid-icu.mjs` (381 values changed across the
 *     42 catalogs).
 *
 * Legitimate rich-text messages (`t.rich`, e.g. `"<b>bold</b>"`) compile
 * fine — tags with matching open/close are valid ICU. Only genuinely
 * malformed ICU fails, which is exactly what should block a PR.
 *
 * Usage:
 *   node scripts/i18n/check-ui-icu.mjs                # strict (default), exit 1 on any failure
 *   node scripts/i18n/check-ui-icu.mjs --warn        # report, exit 0
 *   node scripts/i18n/check-ui-icu.mjs --json        # machine-readable report
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { IntlMessageFormat } from "intl-messageformat";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");

/** Flatten a nested message catalog into `{ "a.b.c": value }`. */
export function flattenLeaves(node, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(node ?? {})) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flattenLeaves(value, dotted, out);
    } else {
      out[dotted] = value;
    }
  }
  return out;
}

/**
 * Pure core: which (file, key, value) pairs fail ICU compilation?
 *
 * @param {Record<string, object>} catalogs  locale -> parsed catalog
 * @returns {Array<{ file: string, key: string, code: string, message: string, value: string }>}
 */
export function findInvalidMessages(catalogs) {
  const bad = [];
  for (const [file, catalog] of Object.entries(catalogs)) {
    const locale = file.endsWith(".json") ? file.slice(0, -5) : file;
    for (const [key, value] of Object.entries(flattenLeaves(catalog))) {
      if (typeof value !== "string") continue;
      try {
        new IntlMessageFormat(value, locale);
      } catch (err) {
        bad.push({
          file,
          key,
          code: err.code ?? err.constructor.name ?? "SyntaxError",
          message: String(err.message ?? "").split("\n")[0],
          value,
        });
      }
    }
  }
  return bad.sort((a, b) => a.file.localeCompare(b.file) || a.key.localeCompare(b.key));
}

function parseArgs(argv) {
  const opts = { mode: "strict", json: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--warn") opts.mode = "warn";
    else if (arg === "--strict") opts.mode = "strict";
    else if (arg === "--json") opts.json = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/check-ui-icu.mjs [--strict|--warn] [--json]",
          "",
          "  --strict  (default) exit 1 when any message fails ICU compilation",
          "  --warn    report failures but exit 0",
          "  --json    machine-readable report on stdout",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

function readCatalogs() {
  const catalogs = {};
  for (const file of fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"))) {
    try {
      catalogs[file] = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
    } catch (err) {
      console.error(`[ui-icu] ✗ ${file}: unreadable/invalid JSON — ${err.message}`);
      process.exit(1);
    }
  }
  return catalogs;
}

function main() {
  const opts = parseArgs(process.argv);
  const catalogs = readCatalogs();
  const bad = findInvalidMessages(catalogs);

  if (opts.json) {
    process.stdout.write(JSON.stringify({ ok: bad.length === 0, failures: bad }, null, 2) + "\n");
    process.exit(bad.length === 0 || opts.mode === "warn" ? 0 : 1);
  }

  if (bad.length === 0) {
    const total = Object.values(catalogs).reduce(
      (n, c) => n + Object.keys(flattenLeaves(c)).length,
      0
    );
    console.log(
      `[ui-icu] PASS — all ${total} messages in ${Object.keys(catalogs).length} catalogs compile.`
    );
    process.exit(0);
  }

  console.error(
    `[ui-icu] ${bad.length} message(s) fail ICU compilation (will break next-intl rendering):`
  );
  for (const { file, key, code, message, value } of bad.slice(0, 50)) {
    console.error(`  ✗ ${file} ${key} — ${code}: ${message}`);
    console.error(`      value: ${JSON.stringify(value).slice(0, 120)}`);
  }
  if (bad.length > 50) console.error(`  … and ${bad.length - 50} more`);

  console.error("");
  console.error("  Fix: wrap literal braces/tags in ICU single quotes so they render");
  console.error("  verbatim, e.g. '<name>' or '{ json, name? }'. Do NOT use HTML entities");
  console.error("  when the literal text is copy-paste content (file paths, JSON, regex).");
  console.error("  See scripts/ad-hoc/fix-invalid-icu.mjs for the exact transform + the");
  console.error("  render-identical assertion used to fix the pre-existing cases.");

  if (opts.mode === "warn") {
    console.error(`[ui-icu] WARN — ${bad.length} failure(s) (warn mode, exiting 0).`);
    process.exit(0);
  }
  console.error(`[ui-icu] FAIL — ${bad.length} failure(s).`);
  process.exit(1);
}

// Only run the CLI when invoked directly, so the pure helpers stay importable in tests.
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
) {
  main();
}
