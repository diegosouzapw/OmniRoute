import { test, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import {
  slmAvailable,
  __resetUltraEntryForTests,
} from "../../../open-sse/services/compression/engines/llmlingua/ultraEntry.ts";
import { __resetLlmlinguaWorkerForTests } from "../../../open-sse/services/compression/engines/llmlingua/worker.ts";

const require = createRequire(import.meta.url);

function depsResolve(): boolean {
  try {
    require.resolve("@atjsh/llmlingua-2");
    return true;
  } catch {
    return false;
  }
}

after(() => {
  __resetUltraEntryForTests();
  __resetLlmlinguaWorkerForTests();
});

test("slmAvailable() is false and fast when optional deps are absent", () => {
  if (depsResolve()) {
    console.log("skip: optional deps present — absent-probe test N/A");
    return;
  }
  const start = Date.now();
  const available = slmAvailable();
  const elapsed = Date.now() - start;
  assert.equal(available, false);
  assert.ok(elapsed < 1000, `expected <1000ms, got ${elapsed}ms`);
});

test("slmAvailable() result is cached (second call also fast)", () => {
  if (depsResolve()) return;
  const start = Date.now();
  slmAvailable();
  slmAvailable();
  assert.ok(Date.now() - start < 1000);
});
