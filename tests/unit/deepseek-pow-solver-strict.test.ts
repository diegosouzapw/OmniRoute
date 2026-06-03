import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const requireCJS = createRequire(import.meta.url);

test("deepseek-pow-solver.cjs loads under Node strict mode without ReferenceError (#2724)", () => {
  let mod: { U?: unknown };
  assert.doesNotThrow(() => {
    mod = requireCJS("../../open-sse/lib/deepseek-pow-solver.cjs");
  });
  assert.ok(mod!, "module loaded");
  assert.equal(typeof mod!.U, "function", "expected exported constructor U");
});

test("deepseek-pow-solver.cjs does not pollute globalThis.onmessage in Node (#2724)", () => {
  const before = (globalThis as { onmessage?: unknown }).onmessage;
  requireCJS("../../open-sse/lib/deepseek-pow-solver.cjs");
  const after = (globalThis as { onmessage?: unknown }).onmessage;
  assert.equal(after, before, "onmessage must remain unchanged outside Worker context");
});
