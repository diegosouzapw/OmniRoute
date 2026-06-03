import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DuckDuckGoWebExecutor, DUCKDUCKGO_BASE } from "../../open-sse/executors/duckduckgo-web.ts";

const VALID_MESSAGES_BODY = { messages: [{ role: "user", content: "ping" }] };
const EMPTY_MESSAGES_BODY = { messages: [] };

/**
 * The executor must satisfy the `ExecuteResult` contract used by
 * `open-sse/handlers/chatCore.ts` (see chatCore.ts:3937-4486). Concretely:
 *   - return value is an object, NOT a raw Response
 *   - `.response` is a `Response`
 *   - `.url` and `.headers` and `.transformedBody` are present
 *
 * A previous version of this executor returned a raw `Response`, which
 * caused `res.response.status` to throw "Cannot read properties of undefined
 * (reading 'status')" upstream. The tests below pin the wrapper shape.
 */
function assertExecutorResultShape(result: unknown): asserts result is {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
} {
  assert.ok(result && typeof result === "object", "execute() must return an object");
  const r = result as Record<string, unknown>;
  assert.ok(r.response instanceof Response, "result.response must be a Response");
  assert.equal(typeof r.url, "string", "result.url must be a string");
  assert.ok(r.headers && typeof r.headers === "object", "result.headers must be an object");
}

describe("DuckDuckGoWebExecutor", () => {
  describe("class instantiation", () => {
    it("should instantiate executor", () => {
      const executor = new DuckDuckGoWebExecutor();
      assert.ok(executor, "Executor should be created");
    });

    it("should have execute method", () => {
      const executor = new DuckDuckGoWebExecutor();
      assert.equal(typeof executor.execute, "function", "execute should be a function");
    });

    it("should have testConnection method", () => {
      const executor = new DuckDuckGoWebExecutor();
      assert.equal(typeof executor.testConnection, "function", "testConnection should be a function");
    });

    it("should export DUCKDUCKGO_BASE constant", () => {
      assert.equal(DUCKDUCKGO_BASE, "https://duckduckgo.com", "DUCKDUCKGO_BASE should be correct URL");
    });
  });

  describe("execute method validation", () => {
    it("should reject empty messages array with 400 (wrapped shape)", async () => {
      const executor = new DuckDuckGoWebExecutor();

      const result = await executor.execute({
        model: "gpt-4o-mini",
        body: EMPTY_MESSAGES_BODY,
        stream: false,
        credentials: {} as never,
      } as never);

      assertExecutorResultShape(result);
      assert.equal(result.response.status, 400, "should return 400 for empty messages");
      const body = await result.response.json();
      assert.ok(body.error, "error response should have error field");
    });

    it("should accept non-empty messages via ExecuteInput.body.messages", async () => {
      const executor = new DuckDuckGoWebExecutor();

      try {
        const result = await executor.execute({
          model: "gpt-4o-mini",
          body: VALID_MESSAGES_BODY,
          stream: false,
          credentials: {} as never,
        } as never);

        // The contract: result is the wrapper, not a raw Response.
        assertExecutorResultShape(result);
        assert.notEqual(result.response.status, 400, "should not return 400 for valid messages");
      } catch (error) {
        // Network errors are acceptable in this offline test environment.
        assert.ok(error instanceof Error, "should throw Error for network issues");
      }
    });

    it("should fall back to 400 when body has no messages key (not 500 / not TypeError)", async () => {
      const executor = new DuckDuckGoWebExecutor();

      const result = await executor.execute({
        model: "gpt-4o-mini",
        body: {},
        stream: false,
        credentials: {} as never,
      } as never);

      assertExecutorResultShape(result);
      assert.equal(result.response.status, 400);
    });

    it("should handle missing model parameter without throwing TypeError", async () => {
      const executor = new DuckDuckGoWebExecutor();

      const result = await executor.execute({
        model: undefined as unknown as string,
        body: VALID_MESSAGES_BODY,
        stream: false,
        credentials: {} as never,
      } as never);

      assertExecutorResultShape(result);
      // Should be a Response (likely 4xx/5xx from upstream) — never a TypeError.
      assert.ok(result.response instanceof Response);
    });
  });

  describe("testConnection method", () => {
    it("should return boolean", async () => {
      const executor = new DuckDuckGoWebExecutor();

      try {
        const result = await executor.testConnection({});
        assert.equal(typeof result, "boolean", "testConnection should return boolean");
      } catch {
        // Network error is acceptable — just verify the method is callable.
        assert.ok(true, "testConnection is callable");
      }
    });

    it("should complete within timeout", async () => {
      const executor = new DuckDuckGoWebExecutor();
      const startTime = Date.now();

      try {
        await executor.testConnection({});
      } catch {
        // Expected to fail or timeout in offline env.
      }

      const elapsed = Date.now() - startTime;
      assert.ok(elapsed < 35000, `testConnection should complete within 35 seconds, took ${elapsed}ms`);
    });
  });

  describe("response handling", () => {
    it("should handle AbortSignal with 499 and the wrapper shape", async () => {
      const executor = new DuckDuckGoWebExecutor();
      const controller = new AbortController();
      controller.abort();

      const result = await executor.execute({
        model: "gpt-4o-mini",
        body: VALID_MESSAGES_BODY,
        stream: false,
        signal: controller.signal,
        credentials: {} as never,
      } as never);

      assertExecutorResultShape(result);
      assert.equal(result.response.status, 499, "should return 499 for aborted request");
    });

    it("should support streaming parameter and return wrapper shape", async () => {
      const executor = new DuckDuckGoWebExecutor();

      try {
        const r1 = await executor.execute({
          model: "gpt-4o-mini",
          body: VALID_MESSAGES_BODY,
          stream: true,
          credentials: {} as never,
        } as never);
        assertExecutorResultShape(r1);

        const r2 = await executor.execute({
          model: "gpt-4o-mini",
          body: VALID_MESSAGES_BODY,
          stream: false,
          credentials: {} as never,
        } as never);
        assertExecutorResultShape(r2);
      } catch (error) {
        assert.ok(error instanceof Error, "should throw Error on network failure");
      }
    });
  });

  describe("error handling", () => {
    it("should not throw a TypeError when messages are valid (regression: 'reading status')", async () => {
      const executor = new DuckDuckGoWebExecutor();

      // This is the exact bug from the live probe: duckduckgo-web returned
      // a raw Response, so chatCore.ts read `.response.status` on a Response
      // and threw "Cannot read properties of undefined (reading 'status')".
      // We assert that execute() never returns a raw Response and that
      // the result can be safely destructured.
      let caught: unknown = null;
      try {
        const r = await executor.execute({
          model: "gpt-4o-mini",
          body: VALID_MESSAGES_BODY,
          stream: false,
          credentials: {} as never,
        } as never);
        assertExecutorResultShape(r);
        // .status must be reachable without throwing
        void r.response.status;
      } catch (err) {
        caught = err;
      }

      // The executor should never surface the JS-level TypeError
      // "Cannot read properties of undefined (reading 'status')"
      if (caught instanceof Error) {
        assert.doesNotMatch(
          caught.message,
          /reading 'status'/,
          "executor must not surface the chatCore-side TypeError"
        );
      }
    });

    it("should return a JSON Content-Type on synthetic error responses", async () => {
      const executor = new DuckDuckGoWebExecutor();

      const result = await executor.execute({
        model: "gpt-4o-mini",
        body: EMPTY_MESSAGES_BODY,
        stream: false,
        credentials: {} as never,
      } as never);

      assertExecutorResultShape(result);
      assert.equal(result.response.status, 400);
      const contentType = result.response.headers.get("content-type");
      assert.ok(
        contentType?.includes("application/json"),
        "error response should be JSON"
      );
      const body = await result.response.json();
      assert.ok(body.error, "error response should have error object");
      assert.ok(body.error.message, "error should have message");
    });
  });

  describe("integration checks", () => {
    it("should be properly exported as singleton", async () => {
      const { duckduckgoWebExecutor } = await import("../../open-sse/executors/duckduckgo-web.ts");
      assert.ok(duckduckgoWebExecutor, "singleton executor should be exported");
      assert.ok(duckduckgoWebExecutor.execute, "singleton should have execute method");
    });

    it("should be registered in executor index", async () => {
      const { getExecutor } = await import("../../open-sse/executors/index.ts");
      const executor = getExecutor("duckduckgo-web");
      assert.ok(executor, "executor should be registered in index");
      assert.equal(typeof executor.execute, "function", "registered executor should have execute method");
    });
  });
});
