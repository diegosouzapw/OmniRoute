/**
 * Regression test for #7258 — zh-TW (and other locales) rendering the raw
 * `__MISSING__:<english>` sentinel written by `scripts/i18n/sync-ui-keys.mjs`
 * instead of falling back to the clean English value.
 *
 * `deepMergeFallback` (src/i18n/request.ts) previously only substituted the
 * EN value when a key was entirely `undefined`; a key that existed but still
 * carried the untranslated placeholder passed through untouched and was
 * rendered verbatim to the user.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { deepMergeFallback, PLACEHOLDER_PREFIX } from "../../src/i18n/request.ts";

const messagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "src",
  "i18n",
  "messages"
);

function loadLocale(locale: string): Record<string, unknown> {
  const raw = readFileSync(path.join(messagesDir, `${locale}.json`), "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

function collectPlaceholderLeaves(
  node: unknown,
  pathPrefix: string,
  out: string[]
): void {
  if (node === null || typeof node !== "object") {
    if (typeof node === "string" && node.startsWith(PLACEHOLDER_PREFIX)) {
      out.push(pathPrefix);
    }
    return;
  }
  if (Array.isArray(node)) return;
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    collectPlaceholderLeaves(value, pathPrefix ? `${pathPrefix}.${key}` : key, out);
  }
}

// ---------------------------------------------------------------------------
// 1. Focused repro: the exact keys from the issue report
// ---------------------------------------------------------------------------

test("#7258 repro: zh-TW keys carry a raw __MISSING__: placeholder before the fix is exercised", () => {
  const zhTW = loadLocale("zh-TW");
  const leaves: string[] = [];
  collectPlaceholderLeaves(zhTW, "", leaves);
  assert.ok(
    leaves.length > 0,
    "expected zh-TW.json to still contain __MISSING__: placeholders (translation content backlog)"
  );
});

test("#7258: deepMergeFallback replaces an untranslated __MISSING__ placeholder with the EN fallback value", () => {
  const target: Record<string, unknown> = {
    localUsageCommand: `${PLACEHOLDER_PREFIX}Run this command locally`,
  };
  const source: Record<string, unknown> = {
    localUsageCommand: "Run this command locally",
  };
  const result = deepMergeFallback(target, source);
  assert.equal(result.localUsageCommand, "Run this command locally");
  assert.ok(!(result.localUsageCommand as string).startsWith(PLACEHOLDER_PREFIX));
});

test("#7258: deepMergeFallback still lets a real (non-placeholder) locale value win", () => {
  const target: Record<string, unknown> = { greeting: "Hola" };
  const source: Record<string, unknown> = { greeting: "Hello" };
  const result = deepMergeFallback(target, source);
  assert.equal(result.greeting, "Hola");
});

test("#7258: deepMergeFallback replaces nested placeholder leaves too", () => {
  const target: Record<string, unknown> = {
    ns: { a: `${PLACEHOLDER_PREFIX}English A`, b: "translated B" },
  };
  const source: Record<string, unknown> = {
    ns: { a: "English A", b: "English B" },
  };
  const result = deepMergeFallback(target, source);
  const ns = result.ns as Record<string, unknown>;
  assert.equal(ns.a, "English A");
  assert.equal(ns.b, "translated B", "already-translated sibling key is untouched");
});

// ---------------------------------------------------------------------------
// 2. General regression: for every shipped locale, the REAL production merge
//    (locale ⟵ EN fallback) leaves zero raw __MISSING__: leaves.
// ---------------------------------------------------------------------------

test("#7258: after the real EN-fallback merge, no locale has a raw __MISSING__: leaf", () => {
  const en = loadLocale("en");
  const locales = readdirSync(messagesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .filter((locale) => locale !== "en");

  assert.ok(locales.length > 0, "expected at least one non-EN locale file");

  const offenders: Record<string, string[]> = {};
  for (const locale of locales) {
    const localeMessages = loadLocale(locale);
    const merged = deepMergeFallback({ ...localeMessages }, en);
    const leaves: string[] = [];
    collectPlaceholderLeaves(merged, "", leaves);
    if (leaves.length > 0) offenders[locale] = leaves;
  }

  assert.deepEqual(
    offenders,
    {},
    `expected zero __MISSING__: leaves after EN fallback merge, found: ${JSON.stringify(offenders)}`
  );
});
