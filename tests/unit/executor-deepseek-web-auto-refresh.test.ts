import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/deepseek-web-with-auto-refresh.ts");

describe("DeepSeekWebWithAutoRefreshExecutor", () => {
  it("can be instantiated with default config", () => {
    const executor = new mod.DeepSeekWebWithAutoRefreshExecutor();
    assert.ok(executor);
  });

  it("can be instantiated with custom config", () => {
    const executor = new mod.DeepSeekWebWithAutoRefreshExecutor({
      sessionRefreshInterval: 30 * 60 * 1000,
      maxRefreshRetries: 5,
      autoRefresh: false,
    });
    assert.ok(executor);
  });

  it("isSessionValid returns false initially", () => {
    const executor = new mod.DeepSeekWebWithAutoRefreshExecutor();
    assert.equal(executor.isSessionValid(), false);
  });

  it("getTimeSinceRefresh returns a number", () => {
    const executor = new mod.DeepSeekWebWithAutoRefreshExecutor();
    const elapsed = executor.getTimeSinceRefresh();
    assert.ok(typeof elapsed === "number");
    assert.ok(elapsed >= 0);
  });

  it("destroy does not throw", () => {
    const executor = new mod.DeepSeekWebWithAutoRefreshExecutor();
    executor.destroy(); // should not throw
    assert.ok(true);
  });

  it("exports singleton instance", () => {
    assert.ok(mod.deepseekWebWithAutoRefreshExecutor);
    assert.ok(mod.deepseekWebWithAutoRefreshExecutor instanceof mod.DeepSeekWebWithAutoRefreshExecutor);
  });
});
