import { describe, it } from "node:test";
import assert from "node:assert";
import {
  ChipotleExecutor,
  randomServerId,
  randomSessionId,
} from "../../open-sse/executors/chipotle.ts";

const executor = new ChipotleExecutor();

describe("ChipotleExecutor", () => {
  it("buildHeaders returns static headers", () => {
    const headers = (executor as any).buildHeaders({});
    assert.strictEqual(headers["Content-Type"], "application/json");
  });

  it("buildUrl returns Amelia endpoint", () => {
    const url = executor.buildUrl("pepper-1", false);
    const parsed = new URL(url);
    assert.strictEqual(parsed.hostname, "amelia.chipotle.com");
  });

  // Regression guard for the node:crypto import — randomInt is NOT on the Web
  // Crypto global, so a bare `crypto.randomInt` would throw at WS-connect time.
  it("randomServerId yields a 3-digit numeric string (crypto.randomInt available)", () => {
    for (let i = 0; i < 50; i++) {
      const id = randomServerId();
      assert.match(id, /^\d{3}$/, `expected 3 digits, got "${id}"`);
      assert.ok(Number(id) >= 0 && Number(id) <= 999);
    }
  });

  it("randomSessionId yields 32 hex chars (crypto.randomUUID available)", () => {
    const id = randomSessionId();
    assert.match(id, /^[0-9a-f]{32}$/, `expected 32 hex chars, got "${id}"`);
    assert.notStrictEqual(randomSessionId(), randomSessionId());
  });

  it("transformRequest passes model through", () => {
    const result = (executor as any).transformRequest(
      "pepper-1",
      { model: "pepper-1", messages: [{ role: "user", content: "hi" }] },
      false,
    );
    assert.strictEqual(result.model, "pepper-1");
  });

  it("returns 499 on pre-aborted signal", async () => {
    const controller = new AbortController();
    controller.abort(new Error("cancelled"));

    const result = await executor.execute({
      model: "pepper-1",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: controller.signal,
      credentials: {},
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    });

    assert.strictEqual((result as any).response.status, 499);
  });

  it("is registered in executor index", async () => {
    const { getExecutor } = await import("../../open-sse/executors/index.ts");
    const exec = getExecutor("chipotle");
    assert.ok(exec, "chipotle executor should be registered");
    assert.ok(exec instanceof ChipotleExecutor);
  });

  it("pepper alias works", async () => {
    const { getExecutor } = await import("../../open-sse/executors/index.ts");
    const exec = getExecutor("pepper");
    assert.ok(exec, "pepper alias should be registered");
    assert.ok(exec instanceof ChipotleExecutor);
  });
});
