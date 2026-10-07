import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import type { BrowserBackedChatRequest } from "../../open-sse/services/browserBackedChat.ts";

const mod = await import("../../open-sse/executors/zai-web.ts");
const browserChat = await import("../../open-sse/services/browserBackedChat.ts");

const ZAI_HOME_URL = "https://chat.z.ai/";
const ZAI_NEW_CHAT_URL = "https://chat.z.ai/api/v1/chats/new";
const ZAI_COMPLETION_PATH = "/api/v2/chat/completions";
const TEST_TOKEN = `e30.${Buffer.from(JSON.stringify({ id: "user-123" })).toString("base64url")}.sig`;
const TEST_CREDENTIAL = JSON.stringify({
  token: TEST_TOKEN,
  captcha_verify_param: "captcha-proof",
});

interface ZaiFetchCapture {
  completionInit?: RequestInit;
  completionUrl?: string;
  newChatInit?: RequestInit;
}

function installZaiFetch(
  completionResponse: () => Response,
  capture: ZaiFetchCapture = {}
): typeof globalThis.fetch {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const value = String(url);
    if (value === ZAI_HOME_URL) {
      return new Response(
        '<script src="https://z-cdn.chatglm.cn/z-ai/frontend/prod-fe-1.1.92/assets/index.js"></script>'
      );
    }
    if (value === ZAI_NEW_CHAT_URL) {
      capture.newChatInit = init;
      return Response.json({ id: "chat-123" });
    }
    if (new URL(value).pathname === ZAI_COMPLETION_PATH) {
      capture.completionUrl = value;
      capture.completionInit = init;
      return completionResponse();
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;
  return originalFetch;
}

function makeBrowserResult(content: string) {
  return {
    status: 200,
    contentType: "text/event-stream",
    body: Buffer.from(
      [
        `data: ${JSON.stringify({ type: "chat:completion", data: { delta_content: content, phase: "answer", done: false } })}`,
        `data: ${JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })}`,
        "",
        "",
      ].join("\n")
    ),
    isStealth: true,
    timing: {
      acquireContextMs: 1,
      navigateMs: 1,
      submitMs: 1,
      captureResponseMs: 1,
      totalMs: 4,
    },
  };
}

describe("ZaiWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.ZaiWebExecutor();
    assert.ok(executor);
  });

  it("preserves browser transport failure details and timing", () => {
    assert.equal(
      mod.describeZaiBrowserFailure({
        status: 502,
        body: Buffer.from(
          JSON.stringify({
            error: { message: "browserBackedChat failed: response.body unavailable" },
          })
        ),
        timing: { captureResponseMs: 30_001, totalMs: 33_412 },
      }),
      "Z.ai browser transport failed (502; capture 30001ms, total 33412ms): " +
        "browserBackedChat failed: response.body unavailable"
    );
    assert.equal(
      mod.describeZaiBrowserFailure({
        status: 0,
        body: Buffer.alloc(0),
        observedPostUrls: ["https://chat.z.ai/api/v1/chats/new"],
        observedPostResponses: [{ url: "https://chat.z.ai/api/v1/chats/new", status: 200 }],
        timing: { captureResponseMs: 30_000, totalMs: 33_000 },
      }),
      "Z.ai browser transport failed (no matching response; capture 30000ms, total 33000ms): " +
        "The page did not issue the expected authenticated chat completion request. " +
        "Observed POST targets: https://chat.z.ai/api/v1/chats/new. " +
        "Observed POST responses: https://chat.z.ai/api/v1/chats/new [200]."
    );
  });

  it("extracts the token cookie value from a full Cookie header", () => {
    assert.equal(mod.extractZaiToken("token=abc123; other=xyz"), "abc123");
    assert.equal(mod.extractZaiToken("Cookie: other=xyz; token=abc123"), "abc123");
  });

  it("extracts the current localStorage Bearer token and JSON credential", () => {
    assert.equal(mod.extractZaiToken("Bearer abc123"), "abc123");
    assert.equal(mod.extractZaiToken("Authorization: Bearer abc123"), "abc123");
    assert.equal(mod.extractZaiToken(TEST_CREDENTIAL), TEST_TOKEN);
    assert.equal(mod.extractZaiCaptchaVerifyParam(TEST_CREDENTIAL), "captcha-proof");
    assert.equal(mod.extractZaiUserId(TEST_TOKEN), "user-123");
  });

  it("reproduces the live frontend HMAC signature algorithm", () => {
    assert.equal(
      mod.buildZaiSignature({
        prompt: "Reply with exactly: OMNIROUTE_ZAI_WEB_TEST",
        requestId: "3b907de9-793c-41d1-8b8e-6ed6a714ee08",
        timestamp: 1784855934807,
        userId: "user-123",
      }),
      "14f17673ccd4ec86476549ebe60f181529572f7a0cfe8ba179206cf2d37cf442"
    );
  });

  it("parses the deployed frontend version from the homepage asset path", () => {
    assert.equal(
      mod.parseZaiFrontendVersion(
        "https://z-cdn.chatglm.cn/z-ai/frontend/prod-fe-1.1.92/assets/index.js"
      ),
      "prod-fe-1.1.92"
    );
    assert.equal(mod.parseZaiFrontendVersion("<html></html>"), null);
  });

  it("accepts a bare JWT/token with no cookie name prefix", () => {
    // a bare token with no '=' and no ';' falls through to the raw string
    assert.equal(
      mod.extractZaiToken("eyJhbGciOiJIUzI1NiJ9.payload.sig"),
      "eyJhbGciOiJIUzI1NiJ9.payload.sig"
    );
    assert.equal(mod.extractZaiToken("plainsessiontoken"), "plainsessiontoken");
  });

  it("returns empty string when no cookie is provided", () => {
    assert.equal(mod.extractZaiToken(""), "");
  });

  it("parses the internal z.ai delta_content/phase SSE envelope", () => {
    const delta = mod.parseZaiFrame({
      type: "chat:completion",
      data: { delta_content: "Hello", phase: "answer", done: false },
    });
    assert.deepEqual(delta, { content: "Hello", reasoning: "", done: false });
  });

  it("routes thinking-phase content into the reasoning field", () => {
    const delta = mod.parseZaiFrame({
      type: "chat:completion",
      data: { delta_content: "pondering...", phase: "thinking", done: false },
    });
    assert.deepEqual(delta, { content: "", reasoning: "pondering...", done: false });
  });

  it("detects end-of-stream from the internal envelope", () => {
    const delta = mod.parseZaiFrame({
      type: "chat:completion",
      data: { phase: "done", done: true },
    });
    assert.equal(delta?.done, true);
  });

  it("parses an OpenAI-shaped pass-through frame", () => {
    const delta = mod.parseZaiFrame({
      choices: [{ delta: { content: "Hi there" }, finish_reason: null }],
    });
    assert.deepEqual(delta, { content: "Hi there", reasoning: "", done: false });
  });

  it("detects end-of-stream from an OpenAI-shaped finish_reason", () => {
    const delta = mod.parseZaiFrame({
      choices: [{ delta: {}, finish_reason: "stop" }],
    });
    assert.equal(delta?.done, true);
  });

  it("returns null for frames with no usable delta", () => {
    assert.equal(mod.parseZaiFrame(null), null);
    assert.equal(mod.parseZaiFrame({}), null);
    assert.equal(mod.parseZaiFrame({ data: { phase: "answer" } }), null);
  });

  it("folds multimodal message content into text without leaking image payloads", () => {
    const folded = mod.foldMessages([
      { role: "user", content: "hi" },
      { role: "user", content: { foo: "bar" } },
      {
        role: "user",
        content: [
          { type: "text", text: "inspect this" },
          { type: "image_url", image_url: { url: "data:image/png;base64,aW1hZ2U=" } },
        ],
      },
    ]);
    assert.deepEqual(folded, [
      { role: "user", content: "hi" },
      { role: "user", content: "" },
      { role: "user", content: "inspect this" },
    ]);
  });

  it("maps the three public models to their current Deep Think effort vocabularies", () => {
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.3-flash", { reasoning_effort: "low" }), {
      supported: true,
      enabled: true,
      effort: "low",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("zw/glm-5.3", { reasoning_effort: "medium" }), {
      supported: true,
      enabled: true,
      effort: "high",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.3", { reasoning: { effort: "high" } }), {
      supported: true,
      enabled: true,
      effort: "high",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.3", { reasoning_effort: "off" }), {
      supported: true,
      enabled: true,
      effort: "max",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.3", { enable_thinking: false }), {
      supported: true,
      enabled: true,
      effort: "max",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.2", { reasoning_effort: "low" }), {
      supported: true,
      enabled: true,
      effort: "high",
      effortSupported: true,
    });
  });

  it("maps GLM-5.3-Flash vision and web controls from live capabilities", () => {
    assert.deepEqual(mod.getZaiModelCapabilities("zw/glm-5.3-flash"), {
      mcp: false,
      reasoningEffort: true,
      returnFc: true,
      thinking: true,
      vision: true,
      vlmTools: false,
      vlmWebSearch: false,
      vlmWebsiteMode: false,
      webSearch: true,
    });
    assert.deepEqual(mod.getZaiModelCapabilities("x-preview-l"), {
      mcp: false,
      reasoningEffort: true,
      returnFc: true,
      thinking: true,
      vision: true,
      vlmTools: false,
      vlmWebSearch: false,
      vlmWebsiteMode: false,
      webSearch: true,
    });
    assert.deepEqual(mod.resolveZaiVlmConfig("glm-5.3-flash", { web_search: true }), {
      toolsEnabled: false,
      webSearchEnabled: true,
      websiteModeEnabled: false,
    });
    assert.deepEqual(mod.resolveZaiVlmConfig("glm-5.3", {}), {
      toolsEnabled: false,
      webSearchEnabled: false,
      websiteModeEnabled: false,
    });
    assert.equal(mod.zaiUpstreamModelId("zai-web/glm-5.3-flash"), "x-preview-l");
    assert.equal(mod.zaiUpstreamModelId("zai-web/glm-5.3"), "glm-5.3");
    assert.equal(mod.getZaiModelCapabilities("GLM-5.1").thinking, false);
  });

  it("returns a credential error when no session credential is provided", async () => {
    const executor = new mod.ZaiWebExecutor();
    const result = await executor.execute({
      model: "glm-5.3",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });

    assert.equal(result.response.status, 400);
    assert.equal(new URL(result.url).hostname, "chat.z.ai");
    const parsed = await result.response.json();
    assert.match(parsed.error.message, /web-session credential/);
  });

  it("uses the browser transport with only the Local Storage token", async () => {
    let capturedRequest: BrowserBackedChatRequest | null = null;
    browserChat.__setBrowserBackedChatOverrideForTesting(async (request) => {
      capturedRequest = request;
      return makeBrowserResult("Browser");
    });

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: TEST_TOKEN },
        signal: null,
      });

      const completion = await result.response.json();
      assert.equal(completion.choices[0].message.content, "Browser");
      assert.equal(completion.model, "glm-5.3");
      assert.equal(capturedRequest?.localStorage?.token, TEST_TOKEN);
      assert.equal(capturedRequest?.localStorageOrigin, "https://chat.z.ai");
      assert.equal(capturedRequest?.headless, false);
      assert.equal(capturedRequest?.inputSelector, "#chat-input");
      assert.equal(
        capturedRequest?.submitButtonSelector,
        '[aria-label="Send Message"] button:not([disabled])'
      );
      assert.equal(capturedRequest?.submitButtonMode, "dom");
      assert.equal(capturedRequest?.userMessage, "hi");
      assert.match(capturedRequest?.chatPageUrl ?? "", /model=GLM-5\.3/);
      assert.equal(typeof capturedRequest?.beforeSubmit, "function");
      assert.equal(result.headers["X-OmniRoute-Transport"], "browser");
      assert.equal(result.transformedBody.browser_backed, true);
      assert.equal(result.transformedBody.enable_thinking, true);
      assert.equal(result.transformedBody.reasoning_effort, "max");
    } finally {
      browserChat.__resetBrowserBackedChatOverrideForTesting();
    }
  });

  it("configures GLM-5.3-Flash on the browser transport", async () => {
    let capturedRequest: BrowserBackedChatRequest | null = null;
    browserChat.__setBrowserBackedChatOverrideForTesting(async (request) => {
      capturedRequest = request;
      return makeBrowserResult("VLM");
    });

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-5.3-flash",
        body: { messages: [{ role: "user", content: "use flash" }] },
        stream: false,
        credentials: { apiKey: TEST_TOKEN },
        signal: null,
      });

      const completion = await result.response.json();
      assert.equal(completion.choices[0].message.content, "VLM");
      assert.match(capturedRequest?.chatPageUrl ?? "", /model=GLM-5\.3-Flash/);
      assert.equal(typeof capturedRequest?.beforeSubmit, "function");
      assert.equal(result.transformedBody.enable_thinking, true);
      assert.equal(result.transformedBody.reasoning_effort, "max");
      assert.equal(result.transformedBody.vlm_tools_enable, false);
      assert.equal(result.transformedBody.vlm_web_search_enable, false);
      assert.equal(result.transformedBody.vlm_website_mode, false);
    } finally {
      browserChat.__resetBrowserBackedChatOverrideForTesting();
    }
  });

  it("uploads GLM-5.3-Flash image input through the authenticated browser page", async () => {
    let capturedRequest: BrowserBackedChatRequest | null = null;
    browserChat.__setBrowserBackedChatOverrideForTesting(async (request) => {
      capturedRequest = request;
      return makeBrowserResult("The image says OMNIROUTE.");
    });

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-5.3-flash",
        body: {
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What word is in this image?" },
                {
                  type: "image_url",
                  image_url: { url: "data:image/png;base64,aW1hZ2UtYnl0ZXM=" },
                },
              ],
            },
          ],
        },
        stream: false,
        // Supplying a CAPTCHA proof must not select the direct path for image
        // requests because the browser page owns Z.ai's authenticated upload.
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      assert.equal(result.response.status, 200);
      assert.equal(capturedRequest?.userMessage, "What word is in this image?");
      assert.equal(capturedRequest?.attachments?.length, 1);
      assert.equal(capturedRequest?.attachments?.[0]?.name, "omniroute-image-1.png");
      assert.equal(capturedRequest?.attachments?.[0]?.mimeType, "image/png");
      assert.equal(capturedRequest?.attachments?.[0]?.buffer.toString("utf8"), "image-bytes");
      assert.equal(result.transformedBody.image_count, 1);
      assert.deepEqual(result.transformedBody.messages, [
        { role: "user", content: "What word is in this image?" },
      ]);
    } finally {
      browserChat.__resetBrowserBackedChatOverrideForTesting();
    }
  });

  it("rejects image input on Z.ai text-only models", async () => {
    const executor = new mod.ZaiWebExecutor();
    const result = await executor.execute({
      model: "glm-5.2",
      body: {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "inspect" },
              {
                type: "image_url",
                image_url: { url: "data:image/png;base64,aW1hZ2U=" },
              },
            ],
          },
        ],
      },
      stream: false,
      credentials: { apiKey: TEST_TOKEN },
      signal: null,
    });

    assert.equal(result.response.status, 400);
    const parsed = await result.response.json();
    assert.match(parsed.error.message, /use GLM-5\.3-Flash/);
  });

  it("creates a chat, signs the v2 request, and forwards the CAPTCHA proof", async () => {
    const capture: ZaiFetchCapture = {};
    const originalFetch = installZaiFetch(
      () =>
        new Response("data: [DONE]\n\n", {
          headers: { "Content-Type": "text/event-stream" },
        }),
      capture
    );

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-5.3",
        body: {
          model: "glm-5.3",
          messages: [{ role: "user", content: "hello" }],
          temperature: 0.4,
          web_search: true,
        },
        stream: false,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      assert.ok(capture.newChatInit);
      const newChatHeaders = capture.newChatInit?.headers as Record<string, string>;
      assert.equal(newChatHeaders.Authorization, `Bearer ${TEST_TOKEN}`);
      const newChatBody = JSON.parse(String(capture.newChatInit?.body));
      assert.deepEqual(newChatBody.chat.models, ["glm-5.3"]);
      assert.equal(newChatBody.chat.history.currentId.length, 36);
      assert.equal(newChatBody.chat.enable_thinking, true);
      assert.equal(newChatBody.chat.auto_web_search, true);

      const completionUrl = new URL(String(capture.completionUrl));
      assert.equal(completionUrl.pathname, ZAI_COMPLETION_PATH);
      assert.equal(completionUrl.searchParams.get("token"), TEST_TOKEN);
      assert.equal(completionUrl.searchParams.get("user_id"), "user-123");
      assert.equal(completionUrl.searchParams.get("version"), "0.0.1");
      assert.equal(
        completionUrl.searchParams.get("signature_timestamp"),
        completionUrl.searchParams.get("timestamp")
      );

      const headers = capture.completionInit?.headers as Record<string, string>;
      assert.equal(headers.Authorization, `Bearer ${TEST_TOKEN}`);
      assert.equal(headers["X-FE-Version"], "prod-fe-1.1.92");
      assert.match(headers["X-Signature"], /^[a-f0-9]{64}$/);

      const parsedBody = JSON.parse(String(capture.completionInit?.body));
      assert.equal(parsedBody.model, "glm-5.3");
      assert.equal(parsedBody.stream, true);
      assert.deepEqual(parsedBody.messages, [{ role: "user", content: "hello" }]);
      assert.equal(parsedBody.signature_prompt, "hello");
      assert.equal(parsedBody.captcha_verify_param, "captcha-proof");
      assert.equal(parsedBody.chat_id, "chat-123");
      assert.equal(parsedBody.params.temperature, 0.4);
      assert.equal(parsedBody.features.web_search, false);
      assert.equal(parsedBody.features.auto_web_search, true);
      assert.equal(parsedBody.features.enable_thinking, true);
      assert.equal(parsedBody.features.reasoning_effort, "max");
      assert.equal(result.headers.Authorization, "Bearer [REDACTED]");
      assert.equal(result.transformedBody.captcha_verify_param, "[REDACTED]");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("sends GLM-5.3 Deep Think Low through the direct request path", async () => {
    const capture: ZaiFetchCapture = {};
    const originalFetch = installZaiFetch(
      () =>
        new Response("data: [DONE]\n\n", {
          headers: { "Content-Type": "text/event-stream" },
        }),
      capture
    );

    try {
      const executor = new mod.ZaiWebExecutor();
      await executor.execute({
        model: "glm-5.3",
        body: {
          model: "glm-5.3",
          messages: [{ role: "user", content: "think carefully" }],
          reasoning_effort: "low",
        },
        stream: false,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      // The query string
      // carries the per-request signature payload, so match the endpoint prefix.
      assert.ok(
        String(capture.completionUrl).startsWith("https://chat.z.ai/api/v2/chat/completions?"),
        `expected the current completions endpoint, got ${capture.completionUrl}`
      );
      const newChatBody = JSON.parse(String(capture.newChatInit?.body));
      assert.equal(newChatBody.chat.enable_thinking, true);
      assert.equal(newChatBody.chat.reasoning_effort, "low");

      const completionBody = JSON.parse(String(capture.completionInit?.body));
      assert.equal(completionBody.features.enable_thinking, true);
      assert.equal(completionBody.features.reasoning_effort, "low");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("maps GLM-5.3-Flash to its opaque wire id on the direct path", async () => {
    const capture: ZaiFetchCapture = {};
    const originalFetch = installZaiFetch(
      () =>
        new Response("data: [DONE]\n\n", {
          headers: { "Content-Type": "text/event-stream" },
        }),
      capture
    );

    try {
      const executor = new mod.ZaiWebExecutor();
      await executor.execute({
        model: "glm-5.3-flash",
        body: {
          model: "glm-5.3-flash",
          messages: [{ role: "user", content: "answer quickly" }],
          web_search: true,
        },
        stream: false,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      const newChatBody = JSON.parse(String(capture.newChatInit?.body));
      assert.deepEqual(newChatBody.chat.models, ["x-preview-l"]);
      assert.deepEqual(
        newChatBody.chat.history.messages[newChatBody.chat.history.currentId].models,
        ["x-preview-l"]
      );
      assert.equal(newChatBody.chat.enable_thinking, true);
      assert.equal(newChatBody.chat.auto_web_search, true);
      assert.equal(newChatBody.chat.reasoning_effort, "max");
      assert.equal(newChatBody.chat.extra.vlm_tools_enable, false);
      assert.equal(newChatBody.chat.extra.vlm_web_search_enable, false);
      assert.equal(newChatBody.chat.extra.vlm_website_mode, false);

      const completionBody = JSON.parse(String(capture.completionInit?.body));
      assert.equal(completionBody.model, "x-preview-l");
      assert.equal(completionBody.features.enable_thinking, true);
      assert.equal(completionBody.features.reasoning_effort, "max");
      assert.equal(completionBody.features.auto_web_search, true);
      assert.equal(completionBody.features.vlm_tools_enable, false);
      assert.equal(completionBody.features.vlm_web_search_enable, false);
      assert.equal(completionBody.features.vlm_website_mode, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("aggregates streamed internal-envelope deltas into a non-streaming completion", async () => {
    const originalFetch = installZaiFetch(
      () =>
        new Response(
          [
            `data: ${JSON.stringify({ type: "chat:completion", data: { delta_content: "Hel", phase: "answer", done: false } })}`,
            `data: ${JSON.stringify({ type: "chat:completion", data: { delta_content: "lo", phase: "answer", done: false } })}`,
            `data: ${JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })}`,
            "data: [DONE]",
            "",
            "",
          ].join("\n"),
          { headers: { "Content-Type": "text/event-stream" } }
        )
    );

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-5.3",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      const completion = await result.response.json();
      assert.equal(completion.choices[0].message.content, "Hello");
      assert.equal(completion.choices[0].finish_reason, "stop");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("streams internal-envelope deltas as OpenAI-shaped SSE chunks", async () => {
    const originalFetch = installZaiFetch(
      () =>
        new Response(
          [
            `data: ${JSON.stringify({ type: "chat:completion", data: { delta_content: "Hi", phase: "answer", done: false } })}`,
            `data: ${JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })}`,
            "",
            "",
          ].join("\n"),
          { headers: { "Content-Type": "text/event-stream" } }
        )
    );

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-5.3",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      const text = await result.response.text();
      assert.match(text, /"content":"Hi"/);
      assert.match(text, /"finish_reason":"stop"/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("propagates upstream HTTP errors", async () => {
    const originalFetch = installZaiFetch(() => new Response("session expired", { status: 401 }));

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "glm-5.3",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      assert.equal(result.response.status, 401);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
