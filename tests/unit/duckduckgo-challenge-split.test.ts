import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the duckduckgo-web challenge-solver extraction.
// The anti-abuse challenge solver + FE signals live in duckduckgo-web/challenge.ts
// (pure of module state; the vm sandbox + 5s timeout are preserved). Host imports back.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "duckduckgo-web.ts");
const LEAF = join(EXE, "duckduckgo-web/challenge.ts");

test("leaf hosts the solver and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  assert.match(src, /export async function solveDuckDuckGoChallenge\b/);
  assert.match(src, /export function makeDuckDuckGoFeSignals\b/);
  assert.doesNotMatch(src, /from "\.\.\/duckduckgo-web\.ts"/);
  // The vm sandbox timeout must survive the move (security invariant).
  assert.match(src, /timeout/);
});

test("host imports the solver back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/duckduckgo-web\/challenge\.ts"/);
});

test("makeDuckDuckGoFeSignals returns a base64 string", async () => {
  const { makeDuckDuckGoFeSignals } =
    await import("../../open-sse/executors/duckduckgo-web/challenge.ts");
  const out = makeDuckDuckGoFeSignals();
  assert.equal(typeof out, "string");
  assert.ok(out.length > 0);
});
