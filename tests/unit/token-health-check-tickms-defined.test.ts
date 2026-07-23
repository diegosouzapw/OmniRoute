import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

/**
 * Regression guard for `ReferenceError: TICK_MS is not defined`, introduced by
 * #7719: it deleted `const TICK_MS = 60 * 1000` from
 * `src/lib/tokenHealthCheck.ts` but left two call sites referencing it — the
 * startup log line and `setInterval(sweep, TICK_MS)`.
 *
 * Why this is a source-level test rather than a behavioral one:
 * `initTokenHealthCheck()` bails out early via `isHealthCheckDisabled()` →
 * `isAutomatedTestProcess()`, which is ALWAYS true under `node --test`. So the
 * scheduler-start branch that dereferences TICK_MS is unreachable from any
 * unit test — an "it doesn't throw" assertion passes with or without the const
 * and proves nothing (verified: such a test stayed green with the const
 * deleted). That is exactly why the bug reached the release tip despite a full
 * green suite, and why the failure only surfaced in the CI gate.
 *
 * These assertions fail with the const removed and pass with it present.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(HERE, "../../src/lib/tokenHealthCheck.ts");

function readSource(): string {
  return readFileSync(SOURCE, "utf8");
}

/** Strip line comments and block comments so doc-prose mentions don't count. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

test("every TICK_MS reference in tokenHealthCheck.ts has a matching declaration", () => {
  const code = stripComments(readSource());

  const uses = code.match(/\bTICK_MS\b/g) ?? [];
  assert.ok(
    uses.length > 0,
    "expected tokenHealthCheck.ts to still reference TICK_MS — if the scheduler " +
      "was intentionally rewritten to drop it, delete this regression test too"
  );

  const declared = /\bconst\s+TICK_MS\s*=/.test(code);
  assert.ok(
    declared,
    `tokenHealthCheck.ts references TICK_MS ${uses.length}x but never declares it — ` +
      "this is the #7719 ReferenceError that breaks initTokenHealthCheck() at runtime"
  );
});

test("TICK_MS keeps its documented 60s sweep interval", () => {
  const code = stripComments(readSource());
  const match = code.match(/\bconst\s+TICK_MS\s*=\s*([^;]+);/);
  assert.ok(match, "TICK_MS declaration not found");

  const expr = match[1].trim();
  assert.match(
    expr,
    /^[\d\s*_]+$/,
    `expected TICK_MS to be a plain numeric expression, got: ${expr}`
  );
  const value = expr
    .split("*")
    .map((part) => Number(part.trim().replace(/_/g, "")))
    .reduce((a, b) => a * b, 1);

  assert.equal(
    value,
    60_000,
    "the module docstring and the startup log both state a 60s sweep interval"
  );
});
