// Regression guard for https://github.com/diegosouzapw/OmniRoute/issues/4858
//
// The live-ws / SSE auth path used to log a raw API key at DEBUG level. The
// current contract is:
//
//   1. `maskKey` (src/shared/utils/formatting.ts) is the single redaction
//      helper for the AUTH debug log. It returns a first-4 + ... + last-4
//      shape (e.g. `sk-a...xyz1`).
//   2. `src/sse/handlers/chat.ts` MUST route the API key through `maskKey`
//      when emitting the AUTH debug line — no raw `apiKey` interpolation.
//   3. `src/server/ws/liveServer.ts` `authorizeConnection` MUST NOT log the
//      API key in any form (no console.* calls, no template interpolation).
//
// If any of the above regresses (someone removes `maskKey`, swaps the
// interpolation back to a raw key, or adds a `console.log(apiKey)` in the WS
// auth path), these tests fail fast so the leak doesn't ship.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { maskKey } from "../../src/shared/utils/formatting.ts";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const chatSrc = readFileSync(join(repoRoot, "src/sse/handlers/chat.ts"), "utf8");
const liveWsSrc = readFileSync(join(repoRoot, "src/server/ws/liveServer.ts"), "utf8");

// ── 1. maskKey redaction contract ─────────────────────────────────────────

test("maskKey redacts an API key to first-4 + ... + last-4 chars (issue #4858)", () => {
  // Shape required by the issue: first 4 + "..." + last 4.
  assert.equal(maskKey("sk-abcdefghijklmnop"), "sk-a...mnop");
  assert.equal(maskKey("sk-proj-1234567890abcdef"), "sk-p...cdef");
  // The split is purely positional — no need to align on a separator.
  assert.equal(maskKey("abcdefghijkl"), "abcd...ijkl");
  // Short / empty / nullish keys collapse to a fully-masked token so we never
  // leak a fingerprint via the prefix / suffix alone.
  assert.equal(maskKey("short"), "***");
  assert.equal(maskKey(""), "***");
  assert.equal(maskKey(undefined), "***");
  assert.equal(maskKey(null), "***");
});

// ── 2. chat.ts AUTH debug line redaction ───────────────────────────────────

test("chat.ts AUTH debug log routes the API key through maskKey (regression guard for #4858)", () => {
  // Pin the AUTH block by its sentinel comment so the test stays stable as
  // the surrounding code evolves.
  const authBlock = chatSrc.match(/Log API key \(masked\)[\s\S]{0,400}/);
  assert.ok(authBlock, "expected the chat.ts AUTH debug block to still exist");

  // Must call maskKey on the apiKey.
  assert.match(
    authBlock[0],
    /maskKey\s*\(\s*apiKey\s*\)/,
    "AUTH debug log must redact the API key via `maskKey(apiKey)` (#4858)"
  );

  // Must NOT interpolate the raw `apiKey` token (without maskKey) into the log line.
  assert.doesNotMatch(
    authBlock[0],
    /\$\{apiKey\}(?!\s*\})/,
    "AUTH debug log must not interpolate the raw `apiKey` token"
  );

  // Belt-and-braces: there is no `API Key: $apiKey` (or `API Key: ${apiKey}`)
  // pattern that bypasses the redaction helper.
  assert.doesNotMatch(
    authBlock[0],
    /`API Key:\s*\$\{apiKey\}`/,
    "AUTH debug log must not contain a raw `API Key: ${apiKey}` template"
  );
});

// ── 3. liveServer.ts authorizeConnection must not log the API key ─────────

test("liveServer.ts authorizeConnection does NOT log the API key (regression guard for #4858)", () => {
  // Slice out the authorizeConnection function body so we don't false-positive
  // on the broader file (which legitimately mentions "api key" in comments).
  const fnMatch = liveWsSrc.match(
    /async function authorizeConnection\([\s\S]*?\n\}/m
  );
  assert.ok(fnMatch, "expected authorizeConnection to still be present in liveServer.ts");
  const fnBody = fnMatch[0];

  // 3a. No raw `apiKey` reference inside any console.* call within the auth fn.
  for (const call of fnBody.matchAll(/console\.(log|info|warn|error|debug)\s*\(([^)]*)\)/g)) {
    assert.doesNotMatch(
      call[2],
      /\bapiKey\b/,
      `authorizeConnection must not reference the raw \`apiKey\` in a console.* call (saw: ${call[0]})`
    );
  }

  // 3b. No template-literal interpolation that mentions `apiKey` (either
  // direct `${apiKey}` or `Bearer ${apiKey}` style).
  assert.doesNotMatch(
    fnBody,
    /`[^`]*\$\{apiKey\}/,
    "authorizeConnection must not interpolate `apiKey` into a template literal"
  );

  // 3c. The token (Bearer / X-Live-WS-Token header) is read but never logged.
  // If a future refactor adds a `console.log("token=", token)` debug line,
  // this still passes (token is a different variable) — but the strict rule
  // above keeps the API key safe. This test exists so any future change to
  // also pass the raw token through to logs is reviewed consciously.
  assert.ok(
    fnBody.includes("token = extractBearerToken(request) || extractAltTokenHeader(request)"),
    "authorizeConnection should still extract the bearer / alt token before validating"
  );
});
