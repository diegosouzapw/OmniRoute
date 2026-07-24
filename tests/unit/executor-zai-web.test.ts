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
        '<script src="https://z-cdn.chatglm.cn/z-ai/frontend/prod-fe-1.1.79/assets/index.js"></script>'
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
    assert.match(
      mod.describeZaiBrowserFailure({
        status: 0,
        body: Buffer.alloc(0),
        timing: { captureResponseMs: 30_000, totalMs: 33_000 },
      }),
      /no matching response.*did not issue the expected authenticated chat completion request/
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
        "https://z-cdn.chatglm.cn/z-ai/frontend/prod-fe-1.1.79/assets/index.js"
      ),
      "prod-fe-1.1.79"
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

  it("enables Deep Think for every public model and limits effort to GLM-5.2", () => {
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.2", {}), {
      supported: true,
      enabled: true,
      effort: "max",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("zw/glm-5.2", { reasoning_effort: "medium" }), {
      supported: true,
      enabled: true,
      effort: "high",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.2", { reasoning: { effort: "high" } }), {
      supported: true,
      enabled: true,
      effort: "high",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("glm-5.2", { reasoning_effort: "off" }), {
      supported: true,
      enabled: false,
      effort: "max",
      effortSupported: true,
    });
    assert.deepEqual(mod.resolveZaiThinkingConfig("GLM-5.1", { reasoning_effort: "max" }), {
      supported: true,
      enabled: true,
      effort: "max",
      effortSupported: false,
    });
  });

  it("maps GLM-5V-Turbo vision and internal VLM controls from live capabilities", () => {
    assert.deepEqual(mod.getZaiModelCapabilities("zw/GLM-5v-Turbo"), {
      mcp: false,
      reasoningEffort: false,
      returnFc: true,
      thinking: true,
      vision: true,
      vlmTools: true,
      vlmWebSearch: true,
      vlmWebsiteMode: true,
      webSearch: true,
    });
    assert.deepEqual(mod.resolveZaiVlmConfig("GLM-5v-Turbo", {}), {
      toolsEnabled: true,
      webSearchEnabled: true,
      websiteModeEnabled: true,
    });
    assert.deepEqual(
      mod.resolveZaiVlmConfig("GLM-5v-Turbo", {
        features: {
          vlm_tools_enable: false,
          vlm_web_search_enable: false,
          vlm_website_mode: false,
        },
      }),
      {
        toolsEnabled: false,
        webSearchEnabled: false,
        websiteModeEnabled: true,
      }
    );
    assert.deepEqual(mod.resolveZaiVlmConfig("GLM-5.1", {}), {
      toolsEnabled: false,
      webSearchEnabled: false,
      websiteModeEnabled: false,
    });
    assert.deepEqual(mod.resolveZaiVlmConfig("GLM-5.1", { web_search: true }), {
      toolsEnabled: false,
      webSearchEnabled: true,
      websiteModeEnabled: false,
    });
  });

  it("returns a credential error when no session credential is provided", async () => {
    const executor = new mod.ZaiWebExecutor();
    const result = await executor.execute({
      model: "GLM-5.1",
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
        model: "glm-5.2",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: TEST_TOKEN },
        signal: null,
      });

      const completion = await result.response.json();
      assert.equal(completion.choices[0].message.content, "Browser");
      assert.equal(capturedRequest?.localStorage?.token, TEST_TOKEN);
      assert.equal(capturedRequest?.localStorageOrigin, "https://chat.z.ai");
      assert.equal(capturedRequest?.inputSelector, "#chat-input");
      assert.equal(
        capturedRequest?.submitButtonSelector,
        '[aria-label="Send Message"] button:not([disabled])'
      );
      assert.equal(capturedRequest?.submitButtonMode, "dom");
      assert.equal(capturedRequest?.userMessage, "hi");
      assert.match(capturedRequest?.chatPageUrl ?? "", /model=GLM-5\.2/);
      assert.equal(typeof capturedRequest?.beforeSubmit, "function");
      assert.equal(result.headers["X-OmniRoute-Transport"], "browser");
      assert.equal(result.transformedBody.browser_backed, true);
      assert.equal(result.transformedBody.enable_thinking, true);
      assert.equal(result.transformedBody.reasoning_effort, "max");
    } finally {
      browserChat.__resetBrowserBackedChatOverrideForTesting();
    }
  });

  it("configures GLM-5V-Turbo controls on the browser transport", async () => {
    let capturedRequest: BrowserBackedChatRequest | null = null;
    browserChat.__setBrowserBackedChatOverrideForTesting(async (request) => {
      capturedRequest = request;
      return makeBrowserResult("VLM");
    });

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "GLM-5v-Turbo",
        body: { messages: [{ role: "user", content: "use the model tools" }] },
        stream: false,
        credentials: { apiKey: TEST_TOKEN },
        signal: null,
      });

      const completion = await result.response.json();
      assert.equal(completion.choices[0].message.content, "VLM");
      assert.match(capturedRequest?.chatPageUrl ?? "", /model=GLM-5V-Turbo/);
      assert.equal(typeof capturedRequest?.beforeSubmit, "function");
      assert.equal(result.transformedBody.enable_thinking, true);
      assert.equal(result.transformedBody.vlm_tools_enable, true);
      assert.equal(result.transformedBody.vlm_web_search_enable, true);
      assert.equal(result.transformedBody.vlm_website_mode, true);
      assert.equal("reasoning_effort" in result.transformedBody, false);
    } finally {
      browserChat.__resetBrowserBackedChatOverrideForTesting();
    }
  });

  it("uploads GLM-5V-Turbo image input through the authenticated browser page", async () => {
    let capturedRequest: BrowserBackedChatRequest | null = null;
    browserChat.__setBrowserBackedChatOverrideForTesting(async (request) => {
      capturedRequest = request;
      return makeBrowserResult("The image says OMNIROUTE.");
    });

    try {
      const executor = new mod.ZaiWebExecutor();
      const result = await executor.execute({
        model: "GLM-5v-Turbo",
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
    assert.match(parsed.error.message, /use GLM-5V-Turbo/);
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
        model: "GLM-5.1",
        body: {
          model: "GLM-5.1",
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
      assert.deepEqual(newChatBody.chat.models, ["GLM-5.1"]);
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
      assert.equal(headers["X-FE-Version"], "prod-fe-1.1.79");
      assert.match(headers["X-Signature"], /^[a-f0-9]{64}$/);

      const parsedBody = JSON.parse(String(capture.completionInit?.body));
      assert.equal(parsedBody.model, "GLM-5.1");
      assert.equal(parsedBody.stream, true);
      assert.deepEqual(parsedBody.messages, [{ role: "user", content: "hello" }]);
      assert.equal(parsedBody.signature_prompt, "hello");
      assert.equal(parsedBody.captcha_verify_param, "captcha-proof");
      assert.equal(parsedBody.chat_id, "chat-123");
      assert.equal(parsedBody.params.temperature, 0.4);
      assert.equal(parsedBody.features.web_search, false);
      assert.equal(parsedBody.features.auto_web_search, true);
      assert.equal(parsedBody.features.enable_thinking, true);
      assert.equal("reasoning_effort" in parsedBody.features, false);
      assert.equal(result.headers.Authorization, "Bearer [REDACTED]");
      assert.equal(result.transformedBody.captcha_verify_param, "[REDACTED]");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("sends GLM-5.2 Deep Think High through the direct request path", async () => {
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
        model: "glm-5.2",
        body: {
          model: "glm-5.2",
          messages: [{ role: "user", content: "think carefully" }],
          reasoning_effort: "high",
        },
        stream: false,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      const newChatBody = JSON.parse(String(capture.newChatInit?.body));
      assert.equal(newChatBody.chat.enable_thinking, true);
      assert.equal(newChatBody.chat.reasoning_effort, "high");

      const completionBody = JSON.parse(String(capture.completionInit?.body));
      assert.equal(completionBody.features.enable_thinking, true);
      assert.equal(completionBody.features.reasoning_effort, "high");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("sends GLM-5V-Turbo VLM tools and web-search flags through the direct path", async () => {
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
        model: "GLM-5v-Turbo",
        body: {
          model: "GLM-5v-Turbo",
          messages: [{ role: "user", content: "inspect this image" }],
        },
        stream: false,
        credentials: { apiKey: TEST_CREDENTIAL },
        signal: null,
      });

      const newChatBody = JSON.parse(String(capture.newChatInit?.body));
      assert.equal(newChatBody.chat.enable_thinking, true);
      assert.equal(newChatBody.chat.auto_web_search, true);
      assert.equal(newChatBody.chat.extra.vlm_tools_enable, true);
      assert.equal(newChatBody.chat.extra.vlm_web_search_enable, true);
      assert.equal(newChatBody.chat.extra.vlm_website_mode, true);

      const completionBody = JSON.parse(String(capture.completionInit?.body));
      assert.equal(completionBody.features.enable_thinking, true);
      assert.equal(completionBody.features.auto_web_search, false);
      assert.equal(completionBody.features.vlm_tools_enable, true);
      assert.equal(completionBody.features.vlm_web_search_enable, true);
      assert.equal(completionBody.features.vlm_website_mode, true);
      assert.equal("reasoning_effort" in completionBody.features, false);
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
        model: "GLM-5.1",
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
        model: "GLM-5.1",
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
        model: "GLM-5.1",
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
