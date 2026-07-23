import { describe, it } from "node:test";
import assert from "node:assert";
import { SandboxLevel, getSandboxLabel } from "../../src/lib/plugins/sandbox.ts";

describe("SandboxLevel", () => {
  it("has 4 levels", () => {
    assert.strictEqual(SandboxLevel.IN_PROCESS, 0);
    assert.strictEqual(SandboxLevel.CHILD_FULL_ENV, 1);
    assert.strictEqual(SandboxLevel.CHILD_FILTERED_ENV, 2);
    assert.strictEqual(SandboxLevel.CHILD_ISOLATED, 3);
  });

  it("getSandboxLabel returns correct labels", () => {
    assert.strictEqual(getSandboxLabel(SandboxLevel.IN_PROCESS), "In-Process");
    assert.strictEqual(getSandboxLabel(SandboxLevel.CHILD_FULL_ENV), "Child (Full Env)");
    assert.strictEqual(getSandboxLabel(SandboxLevel.CHILD_FILTERED_ENV), "Child (Filtered Env)");
    assert.strictEqual(getSandboxLabel(SandboxLevel.CHILD_ISOLATED), "Child (Isolated)");
  });
});
