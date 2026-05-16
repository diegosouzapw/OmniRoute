import test from "node:test";
import assert from "node:assert/strict";
import { DeepSeekWebExecutor } from "../../open-sse/executors/deepseek-web.ts";

// Skip if live test credentials are not set
if (!process.env.DEEPSEEK_WEB_SESSION_COOKIE) {
  console.log("Skipping DeepSeek Web live test: DEEPSEEK_WEB_SESSION_COOKIE not set");
  test.skip("Live test credentials not set", () => {});
} else {
  test("DeepSeek Web: live completion request", async () => {
    const executor = new DeepSeekWebExecutor();

    const result = await executor.execute({
      model: "deepseek-v4-flash",
      body: {
        messages: [{ role: "user", content: "Say hello in one word." }],
        temperature: 0.7,
        max_tokens: 10,
      },
      stream: false,
      credentials: {
        cookies: process.env.DEEPSEEK_WEB_SESSION_COOKIE!,
      } as any,
      signal: AbortSignal.timeout(30000),
    });

    assert.ok(result.response, "Should return a response");
    assert.ok(result.url.includes("chat.deepseek.com"), "Should target chat.deepseek.com");

    if (result.response.ok) {
      const ct = result.response.headers.get("content-type") || "";
      // Should be JSON, not HTML (SPA fallback)
      assert.ok(!ct.includes("text/html"), "Should not return HTML");
      const text = await result.response.text();
      const parsed = JSON.parse(text);
      // Should not have DeepSeek error codes
      assert.equal(parsed.code, undefined, "Should not have error code");
      assert.ok(parsed.choices || parsed.data, "Should have choices or data");
    } else {
      // Even errors are valid — proves we reached the real API
      const status = result.response.status;
      assert.ok([401, 403, 429].includes(status), `Unexpected status: ${status}`);
    }
  });

  test("DeepSeek Web: live streaming request", async () => {
    const executor = new DeepSeekWebExecutor();

    const result = await executor.execute({
      model: "deepseek-v4-flash",
      body: {
        messages: [{ role: "user", content: "Say hi" }],
        temperature: 0.7,
        max_tokens: 20,
      },
      stream: true,
      credentials: {
        cookies: process.env.DEEPSEEK_WEB_SESSION_COOKIE!,
      } as any,
      signal: AbortSignal.timeout(30000),
    });

    assert.ok(result.response, "Should return a response");

    if (result.response.ok) {
      const ct = result.response.headers.get("content-type") || "";
      assert.ok(
        ct.includes("text/event-stream") || ct.includes("application/json"),
        `Expected SSE or JSON, got: ${ct}`
      );
    }
  });
}
