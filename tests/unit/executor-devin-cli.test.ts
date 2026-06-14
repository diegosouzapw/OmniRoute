import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/devin-cli.ts");

describe("DevinCliExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.DevinCliExecutor();
    assert.ok(executor);
  });

  it("buildUrl returns devin protocol", () => {
    const executor = new mod.DevinCliExecutor();
    assert.equal(executor.buildUrl(), "devin://acp/stdio");
  });

  it("buildHeaders returns empty object", () => {
    const executor = new mod.DevinCliExecutor();
    assert.deepEqual(executor.buildHeaders(), {});
  });

  it("transformRequest returns null", () => {
    const executor = new mod.DevinCliExecutor();
    assert.equal(executor.transformRequest(), null);
  });
});
