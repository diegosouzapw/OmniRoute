/**
 * global-error.tsx embeds a hardcoded copy of the en.json
 * `publicSystem.globalError` strings (statically importing the whole ~770 KB
 * catalog would ship it in the initial chunk of every page — Next.js includes
 * the root global-error chunk on all routes). This test fails when the
 * catalog copy drifts so the fallback strings are regenerated.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");

test("global-error fallback strings stay in sync with en.json", () => {
  const en = JSON.parse(
    readFileSync(join(REPO_ROOT, "src", "i18n", "messages", "en.json"), "utf8")
  );
  const expected = en?.publicSystem?.globalError;
  assert.equal(typeof expected, "object", "en.json must keep publicSystem.globalError");

  const source = readFileSync(join(REPO_ROOT, "src", "app", "global-error.tsx"), "utf8");
  const match = source.match(/const FALLBACK_EN_GLOBAL_ERROR = \{([\s\S]*?)\} as const;/);
  assert.ok(match, "FALLBACK_EN_GLOBAL_ERROR literal not found in global-error.tsx");

  // Parse the literal's key: "value" pairs (keys may be quoted or bare).
  const actual: Record<string, string> = {};
  const pairRe = /(?:"([^"]+)"|([A-Za-z0-9_]+))\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  let pair: RegExpExecArray | null;
  while ((pair = pairRe.exec(match[1])) !== null) {
    const key = pair[1] ?? pair[2];
    actual[key] = JSON.parse(`"${pair[3]}"`);
  }

  assert.deepEqual(
    actual,
    expected,
    "global-error fallback strings drifted from en.json — update FALLBACK_EN_GLOBAL_ERROR"
  );
});

test("global-error.tsx does not statically import a full locale catalog", () => {
  const source = readFileSync(join(REPO_ROOT, "src", "app", "global-error.tsx"), "utf8");
  assert.ok(
    !/^\s*import\s+.*from\s+["']@\/i18n\/messages\//m.test(source),
    "global-error.tsx must not statically import from @/i18n/messages/* (ships ~770 KB on every page)"
  );
});
