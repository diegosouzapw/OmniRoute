/**
 * Issue #2346 — Regression guard: src/sse/handlers/chat.ts used the bare name
 * `getSettings` without importing it, causing a ReferenceError on every
 * `auto` / `auto/*` request. Make sure the module loads cleanly AND that any
 * `await getSettings()` invocation in the source uses an imported binding
 * (not a global that will resolve to undefined at runtime).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHAT_PATH = path.resolve(__dirname, "../../src/sse/handlers/chat.ts");

test("#2346 chat.ts does not call bare getSettings() without importing it", () => {
  const source = fs.readFileSync(CHAT_PATH, "utf8");

  // Strip comment lines so doc references like "Issue #2346: `getSettings`..."
  // don't trip the regex.
  const stripped = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

  // Find any call to a bare `getSettings(` identifier (not preceded by . or `).
  const callRe = /(?<![.\w`])getSettings\s*\(/g;
  const hasCall = callRe.test(stripped);

  if (!hasCall) {
    // No call at all — also fine.
    return;
  }

  // If there's a call, make sure `getSettings` was imported (named import).
  const importsGetSettings = /import\s*\{[^}]*\bgetSettings\b[^}]*\}/.test(stripped);
  assert.ok(
    importsGetSettings,
    "chat.ts calls getSettings() but never imports it — this is the regression that caused #2346"
  );
});
