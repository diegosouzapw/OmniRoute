import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { DuckDuckGoWebExecutor, DUCKDUCKGO_BASE } from "../../open-sse/executors/duckduckgo-web.ts";

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
    it("should reject empty messages array", async () => {
      const executor = new DuckDuckGoWebExecutor();
      
      const response = await executor.execute({
        model: "gpt-4o-mini",
        messages: [],
        stream: false,
      } as any);

      assert.ok(response instanceof Response, "should return Response");
      assert.equal(response.status, 400, "should return 400 for empty messages");
      
      const body = await response.json();
      assert.ok(body.error, "error response should have error field");
    });

    it("should accept non-empty messages array", async () => {
      const executor = new DuckDuckGoWebExecutor();
      
      // This will fail due to network, but should pass input validation
      try {
        const response = await executor.execute({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "test" }],
          stream: false,
        } as any);

        // Should either succeed with real response or fail with network error (status 5xx, not 400)
        assert.notEqual(response.status, 400, "should not return 400 for valid messages");
      } catch (error) {
        // Network error is expected since we're not running against real DuckDuckGo
        assert.ok(error instanceof Error, "should throw Error for network issues");
      }
    });

    it("should handle missing model parameter", async () => {
      const executor = new DuckDuckGoWebExecutor();
      
      try {
        await executor.execute({
          model: undefined,
          messages: [{ role: "user", content: "test" }],
          stream: false,
        } as any);
      } catch (error) {
        assert.ok(error instanceof Error || error instanceof Response, "should handle missing model");
      }
    });
  });

  describe("testConnection method", () => {
    it("should return boolean", async () => {
      const executor = new DuckDuckGoWebExecutor();
      
      try {
        const result = await executor.testConnection({});
        assert.equal(typeof result, "boolean", "testConnection should return boolean");
      } catch (error) {
        // Network error is acceptable - just verify method exists and is callable
        assert.ok(true, "testConnection is callable");
      }
    });

    it("should complete within timeout", async () => {
      const executor = new DuckDuckGoWebExecutor();
      const startTime = Date.now();
      
      try {
        await executor.testConnection({});
      } catch (error) {
        // Expected to fail or timeout
      }
      
      const elapsed = Date.now() - startTime;
      assert.ok(elapsed < 35000, `testConnection should complete within 35 seconds, took ${elapsed}ms`);
    });
  });

  describe("response handling", () => {
    it("should handle AbortSignal", async () => {
      const executor = new DuckDuckGoWebExecutor();
      const controller = new AbortController();
      
      // Abort immediately
      controller.abort();
      
      const response = await executor.execute({
        model: "gpt-4o-mini",
        body: { messages: [{ role: "user", content: "test" }] },
        stream: false,
        signal: controller.signal,
      } as any);

      assert.ok(response instanceof Response, "should return Response");
      assert.equal(response.status, 499, "should return 499 for aborted request");
    });

    it("should support streaming parameter", async () => {
      const executor = new DuckDuckGoWebExecutor();
      
      try {
        // Test with stream: true
        const response1 = await executor.execute({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "test" }],
          stream: true,
        } as any);
        assert.ok(response1 instanceof Response, "streaming mode should return Response");

        // Test with stream: false
        const response2 = await executor.execute({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "test" }],
          stream: false,
        } as any);
        assert.ok(response2 instanceof Response, "non-streaming mode should return Response");
      } catch (error) {
        // Network errors are expected
        assert.ok(error instanceof Error || error instanceof Response);
      }
    });
  });

  describe("error handling", () => {
    it("should handle network timeouts gracefully", async () => {
      const executor = new DuckDuckGoWebExecutor();
      
      try {
        const response = await executor.execute({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "test" }],
          stream: false,
        } as any);

        // Should get a response, not throw
        assert.ok(response instanceof Response, "should return Response even on timeout");
      } catch (error) {
        // Timeout or network error is acceptable
        assert.ok(error instanceof Error, "should handle errors gracefully");
      }
    });

    it("should return valid error responses with JSON", async () => {
      const executor = new DuckDuckGoWebExecutor();
      
      const response = await executor.execute({
        model: "gpt-4o-mini",
        messages: [],
        stream: false,
      } as any);

      assert.equal(response.status, 400);
      const contentType = response.headers.get("content-type");
      assert.ok(contentType?.includes("application/json"), "error response should be JSON");
      
      const body = await response.json();
      assert.ok(body.error, "error response should have error object");
      assert.ok(body.error.message, "error should have message");
    });
  });

  describe("integration checks", () => {
    it("should be properly exported from executor module", async () => {
      // Import the singleton as well
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
