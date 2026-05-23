/**
 * Static guard tests for the error-sanitization fixes in release/v3.8.2.
 *
 * Review findings: two authenticated routes returned raw error text in their
 * HTTP body (`(error as Error).message` / `String(error)`), violating the
 * project's error-sanitization policy (CLAUDE.md hard rule 12,
 * docs/security/ERROR_SANITIZATION.md). These guards pin the fix in source so
 * the anti-pattern cannot silently return. (Static-source assertions mirror the
 * established style of cli-tools-auth-hardening.test.ts.)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRoute(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
}

const CACHE_STATS = "src/app/api/cache/stats/route.ts";
const HERMES = "src/app/api/cli-tools/hermes-agent-settings/route.ts";
const DB_IMPORT = "src/app/api/db-backups/import/route.ts";

test("db-backups/import awaits getSettings() before re-hydrating the system prompt", () => {
  // getSettings() is async; without `await`, importedSettings is a Promise and
  // `.systemPrompt` is always undefined, so the #2470 re-hydration silently
  // never fires after a DB import.
  const src = readRoute(DB_IMPORT);
  assert.match(
    src,
    /const importedSettings = await getSettings\(\);/,
    "must await getSettings() so systemPrompt re-hydration actually runs"
  );
  assert.ok(
    !/const importedSettings = getSettings\(\);/.test(src),
    "must not read systemPrompt off an un-awaited Promise"
  );
});

test("cache/stats route routes errors through sanitizeErrorMessage", () => {
  const src = readRoute(CACHE_STATS);
  assert.match(src, /import \{ sanitizeErrorMessage \}/, "must import sanitizeErrorMessage");
  assert.match(src, /sanitizeErrorMessage\(error\)/, "catch blocks must sanitize the error");
  assert.ok(
    !/\(error as Error\)\.message/.test(src),
    "must not put raw (error as Error).message in the response body"
  );
});

test("hermes-agent-settings GET sanitizes its error response (no raw String(error))", () => {
  const src = readRoute(HERMES);
  assert.match(src, /import \{ sanitizeErrorMessage \}/, "must import sanitizeErrorMessage");
  assert.match(src, /sanitizeErrorMessage\(error\)/, "GET catch must sanitize the error");
  assert.ok(
    !/error: String\(error\)/.test(src),
    "must not return raw String(error) in the response body"
  );
});

test("hermes-agent-settings POST validates baseUrl as an http(s) URL", () => {
  const src = readRoute(HERMES);
  assert.match(
    src,
    /import \{ validateBaseUrl \}/,
    "must import the shared validateBaseUrl helper"
  );
  assert.match(src, /validateBaseUrl\(baseUrl\)/, "POST must validate the supplied baseUrl");
});
