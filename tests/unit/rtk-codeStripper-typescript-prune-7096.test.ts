// Issue #7096 — RTK codeStripper must not require the `typescript` devDependency at
// module load. After `npm prune --omit=dev`, typescript is gone; the stripper must
// degrade gracefully (skip TS-aware comment stripping) instead of throwing
// "Cannot find module 'typescript'". The lazy loader is exercised here on the
// happy path (typescript present in dev/build) and the function is asserted to
// stay callable and JSX-safe.
import test from "node:test";
import assert from "node:assert/strict";

const { stripCode } = await import(
  "../../open-sse/services/compression/engines/rtk/codeStripper.ts"
);

test("#7096 TS-aware comment stripping works when typescript is available", () => {
  const input = "// leading\nconst x = 1; // trailing\nfunction f() { return 2; }";
  const out = stripCode(input, "javascript", { removeComments: true });
  assert.ok(!out.text.includes("// leading"), "leading comment stripped");
  assert.ok(!out.text.includes("// trailing"), "trailing comment stripped");
  assert.ok(out.text.includes("const x = 1"), "code preserved");
});

test("#7096 JSX is left intact (no corruption of expression comments)", () => {
  const input = "const el = <div>{/* c */ 1}</div>;";
  const out = stripCode(input, "typescript", { removeComments: true });
  assert.ok(out.text.includes("<div>"), "JSX preserved");
});

test("#7096 stripCode stays callable and does not throw", () => {
  assert.doesNotThrow(() =>
    stripCode("/* block */ const y = 2;", "typescript", { removeComments: true })
  );
  const out = stripCode("/* block */ const y = 2;", "typescript", { removeComments: true });
  assert.ok(typeof out.text === "string");
});
