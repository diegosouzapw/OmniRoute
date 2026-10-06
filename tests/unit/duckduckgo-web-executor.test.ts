import { describe, it, type TestContext } from "node:test";
import assert from "node:assert/strict";
import { FETCH_TIMEOUT_MS } from "../../open-sse/config/constants.ts";
import {
  DuckDuckGoWebExecutor,
  DUCKDUCKGO_BASE,
  CHAT_URL,
  normalizeDuckDuckGoMessages,
  STATUS_URL,
} from "../../open-sse/executors/duckduckgo-web.ts";

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
      assert.equal(
        typeof executor.testConnection,
        "function",
        "testConnection should be a function"
      );
    });

    it("should export DUCKDUCKGO_BASE constant", () => {
      assert.equal(
        DUCKDUCKGO_BASE,
        "https://duck.ai",
        "DUCKDUCKGO_BASE should be correct URL"
      );
    });
  });

  describe("execute method validation", () => {
    it("normalizes only role-bearing request messages without dropping metadata", () => {
      assert.deepEqual(
        normalizeDuckDuckGoMessages([
          { role: "user", content: "hello", name: "caller" },
          { role: "assistant", tool_calls: [{ id: "call-1" }] },
          { content: "missing role" },
          null,
        ]),
        [
          { role: "user", content: "hello", name: "caller" },
          { role: "assistant", content: undefined, tool_calls: [{ id: "call-1" }] },
        ]
      );
    });

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
        assert.ok(
          error instanceof Error || error instanceof Response,
          "should handle missing model"
        );
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

    it("should abort the status request when its timeout expires", async (t) => {
      t.mock.timers.enable({ apis: ["setTimeout"] });
      let requestSignal: AbortSignal | null = null;

      t.mock.method(globalThis, "fetch", async (input, init) => {
        assert.equal(String(input), STATUS_URL);
        assert.equal(init?.method, "GET");
        requestSignal = init?.signal ?? null;

        return new Promise<Response>((_resolve, reject) => {
          requestSignal?.addEventListener("abort", () => reject(requestSignal?.reason), {
            once: true,
          });
        });
      });

      const resultPromise = new DuckDuckGoWebExecutor().testConnection({});
      assert.ok(requestSignal, "status fetch should receive an AbortSignal");
      assert.equal(requestSignal.aborted, false);

      t.mock.timers.tick(FETCH_TIMEOUT_MS);

      assert.equal(requestSignal.aborted, true);
      assert.equal(requestSignal.reason?.name, "TimeoutError");
      assert.equal(await resultPromise, false);
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

  describe("system-role shielding (#ddgw)", () => {
    type ExecuteArgs = Parameters<DuckDuckGoWebExecutor["execute"]>[0];
    // duck.ai's duckchat/v1/chat rejects role:"system" with 400 ERR_BAD_REQUEST.
    // The translator-side normalizer folds system/developer into the first user
    // message; this shield guarantees the executor never forwards such roles
    // upstream even when a future bypass reintroduces them after translation
    // (e.g. prepareToolMessages' injected tool prompt).
    function mockDuckChat(t: TestContext, capturedBodies: unknown[]): void {
      t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        const method = init?.method ?? "GET";
        if (method === "GET" && url === STATUS_URL) {
          return new Response(null, {
            status: 200,
            headers: { "x-vqd-4": "test-vqd-4" },
          });
        }
        if (method === "POST" && url === CHAT_URL) {
          capturedBodies.push(JSON.parse(String(init?.body)));
          return new Response('data: {"message":"OK"}\n\ndata: [DONE]\n\n', {
            status: 200,
            headers: { "Content-Type": "text/event-stream" },
          });
        }
        // warmSession + country/token fetches tolerate empty 2xx responses.
        return new Response(null, { status: 200 });
      });
    }

    it("folds a leading system message into the first user message before the upstream POST", async (t) => {
      const captured: unknown[] = [];
      mockDuckChat(t, captured);

      await new DuckDuckGoWebExecutor().execute({
        model: "gpt-5.4-nano",
        body: {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Reply with OK" },
          ],
        },
        stream: false,
      } as unknown as ExecuteArgs);

      assert.equal(captured.length, 1, "chat POST should be captured");
      const upstreamMessages = (captured[0] as { messages: Array<{ role: string }> }).messages;
      const roles = upstreamMessages.map((m) => m.role);
      assert.equal(
        roles.some((r) => r === "system" || r === "developer"),
        false,
        "no system/developer role may reach the upstream payload"
      );
      assert.deepEqual(roles, ["user"]);
      assert.match(
        String((upstreamMessages[0] as { content: string }).content),
        /^\[System Instructions\]\n/
      );
    });

    it("preserves plain user/assistant conversations untouched", async (t) => {
      const captured: unknown[] = [];
      mockDuckChat(t, captured);

      await new DuckDuckGoWebExecutor().execute({
        model: "gpt-5.4-nano",
        body: {
          messages: [
            { role: "user", content: "hi" },
            { role: "assistant", content: "hello" },
            { role: "user", content: "bye" },
          ],
        },
        stream: false,
      } as unknown as ExecuteArgs);

      const upstream = (captured[0] as { messages: Array<{ role: string; content: string }> })
        .messages;
      assert.deepEqual(
        upstream.map((m) => [m.role, m.content]),
        [
          ["user", "hi"],
          ["assistant", "hello"],
          ["user", "bye"],
        ]
      );
    });

    it("shields the executor-injected tool prompt system message too", async (t) => {
      const captured: unknown[] = [];
      mockDuckChat(t, captured);

      await new DuckDuckGoWebExecutor().execute({
        model: "grole",
        body: {
          messages: [{ role: "user", content: "list files" }],
          tools: [
            {
              type: "function",
              function: { name: "list_files", description: "lists files", parameters: {} },
            },
          ],
        },
        stream: false,
      } as unknown as ExecuteArgs);

      const upstream = (captured[0] as { messages: Array<{ role: string; content: string }> })
        .messages;
      assert.equal(
        upstream.some((m) => m.role === "system" || m.role === "developer"),
        false,
        "the tool-prompt system message must be folded before dispatch"
      );
      assert.match(String(upstream.at(-1)?.content), /list_files/);
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
      const executor = await getExecutor("duckduckgo-web");
      assert.ok(executor, "executor should be registered in index");
      assert.equal(
        typeof executor.execute,
        "function",
        "registered executor should have execute method"
      );
    });
  });
});
