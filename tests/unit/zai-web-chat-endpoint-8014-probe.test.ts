import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/zai-web.ts");

const STALE_URL = "https://chat.z.ai/api/chat/completions";
const TEST_TOKEN = "e30.eyJpZCI6InVzZXItMTIzIn0.sig";

/**
 * #8014 guard: the executor must target the versioned v2 completions endpoint,
 * never the stale unversioned `/api/chat/completions` path, which 404s
 * model-independently.
 *
 * Setup notes for this flow (the executor now creates a remote chat first and
 * signs the completion request):
 *  - a `captcha_verify_param` is required to take the direct HTTP path; without
 *    one the executor routes through the browser transport and never calls
 *    fetch at all, so the probe would capture nothing.
 *  - the completion URL carries the signature payload as a query string, so the
 *    assertion matches on pathname rather than the whole URL.
 */
test("#8014: ZaiWebExecutor must POST to the current chat.z.ai v2 chat-completions endpoint, not the stale unversioned path", async () => {
  const originalFetch = globalThis.fetch;
  const requested: string[] = [];

  globalThis.fetch = (async (url: string) => {
    const target = String(url);
    requested.push(target);

    if (target === STALE_URL) {
      return new Response(JSON.stringify({ detail: "Not Found" }), { status: 404 });
    }
    if (target.startsWith("https://chat.z.ai/api/v1/chats/new")) {
      return new Response(JSON.stringify({ id: "chat-1" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("data: [DONE]\n\n", {
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof fetch;

  try {
    const executor = new mod.ZaiWebExecutor();
    const result = await executor.execute({
      model: "glm-5.3",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: {
        apiKey: JSON.stringify({ token: TEST_TOKEN, captcha_verify_param: "captcha-proof" }),
      },
      signal: null,
    });

    assert.ok(requested.length > 0, "the direct path must actually reach fetch");

    assert.ok(
      !requested.some((url) => url === STALE_URL),
      `zai-web executor POSTed to the stale endpoint — matches #8014's model-independent 404 "Not Found"`
    );

    // The executor also probes the homepage for the frontend version and calls
    // /api/v1/chats/new first, so pick the completions request by its path.
    const completions = requested.filter((u) => new URL(u).pathname.endsWith("/chat/completions"));
    assert.equal(
      completions.length,
      1,
      `expected exactly one completions request, got ${requested}`
    );
    assert.equal(
      new URL(completions[0]).pathname,
      "/api/v2/chat/completions",
      `completions must target the v2 path, got ${completions[0]}`
    );

    assert.notEqual(
      result.response.status,
      404,
      "chat call must not 404 when the endpoint path is correct"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
