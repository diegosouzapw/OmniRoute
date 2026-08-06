/**
 * #8964 — native xAI Agent Tools passthrough for /v1/responses
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  shouldUseNativeXaiResponsesPassthrough,
  shouldUseNativeCodexPassthrough,
  isResponsesEndpointPath,
  stampNativeResponsesPassthroughBody,
  XAI_API_PROVIDERS,
} = await import("../../open-sse/handlers/chatCore/passthroughHelpers.ts");

const {
  supportsNativeWebSearchFallbackBypass,
  prepareWebSearchFallbackBody,
  OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
} = await import("../../open-sse/services/webSearchFallback.ts");

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

const { XaiExecutor } = await import("../../open-sse/executors/xai.ts");

// ── Predicate ──────────────────────────────────────────────────────────────

test("native xAI passthrough: true for xai-oauth + responses endpoint", () => {
  assert.equal(
    shouldUseNativeXaiResponsesPassthrough({
      provider: "xai-oauth",
      sourceFormat: "openai-responses",
      endpointPath: "/v1/responses",
    }),
    true
  );
});

test("native xAI passthrough: true for xao alias and xai API key provider", () => {
  assert.equal(
    shouldUseNativeXaiResponsesPassthrough({
      provider: "xao",
      sourceFormat: "openai-responses",
      endpointPath: "/v1/responses",
    }),
    true
  );
  assert.equal(
    shouldUseNativeXaiResponsesPassthrough({
      provider: "xai",
      sourceFormat: "openai-responses",
      endpointPath: "responses",
    }),
    true
  );
});

test("native xAI passthrough: false for grok-cli / chat completions / wrong format", () => {
  assert.equal(
    shouldUseNativeXaiResponsesPassthrough({
      provider: "grok-cli",
      sourceFormat: "openai-responses",
      endpointPath: "/v1/responses",
    }),
    false
  );
  assert.equal(
    shouldUseNativeXaiResponsesPassthrough({
      provider: "xai-oauth",
      sourceFormat: "openai-responses",
      endpointPath: "/v1/chat/completions",
    }),
    false
  );
  assert.equal(
    shouldUseNativeXaiResponsesPassthrough({
      provider: "xai-oauth",
      sourceFormat: "openai",
      endpointPath: "/v1/responses",
    }),
    false
  );
  assert.ok(XAI_API_PROVIDERS.has("xai-oauth"));
  assert.equal(XAI_API_PROVIDERS.has("grok-cli"), false);
});

test("Codex passthrough is unchanged and does not match xAI providers", () => {
  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "xai-oauth",
      sourceFormat: "openai-responses",
      endpointPath: "/v1/responses",
    }),
    false
  );
  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: "openai-responses",
      endpointPath: "/v1/responses",
    }),
    true
  );
});

test("isResponsesEndpointPath shared helper", () => {
  assert.equal(isResponsesEndpointPath("/v1/responses"), true);
  assert.equal(isResponsesEndpointPath("/v1/responses/"), true);
  assert.equal(isResponsesEndpointPath("responses"), true);
  assert.equal(isResponsesEndpointPath("/v1/chat/completions"), false);
});

test("stampNativeResponsesPassthroughBody modes", () => {
  assert.deepEqual(stampNativeResponsesPassthroughBody({ a: 1 }, "codex"), {
    a: 1,
    _nativeCodexPassthrough: true,
  });
  assert.deepEqual(stampNativeResponsesPassthroughBody({ a: 1 }, "xai"), {
    a: 1,
    _nativeXaiResponsesPassthrough: true,
  });
});

// ── Web search rewrite bypass (via existing nativeCodexPassthrough flag) ──

test("web_search is NOT rewritten when native Responses passthrough flag is true", () => {
  const input = { tools: [{ type: "web_search" }, { type: "x_search", from_date: "2026-05-01" }] };
  const { body, fallback } = prepareWebSearchFallbackBody(input, {
    provider: "xai-oauth",
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
    nativeCodexPassthrough: true,
  });
  assert.equal(fallback.enabled, false);
  assert.deepEqual(body, input);
});

test("web_search IS rewritten for xAI when native passthrough flag is false", () => {
  const { body, fallback } = prepareWebSearchFallbackBody(
    { tools: [{ type: "web_search" }] },
    {
      provider: "xai-oauth",
      sourceFormat: "openai-responses",
      targetFormat: "openai",
      nativeCodexPassthrough: false,
    }
  );
  assert.equal(fallback.enabled, true);
  assert.equal(fallback.toolName, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  const tools = body.tools as Record<string, unknown>[];
  const names = tools.map((t) => (t.function ? (t.function as { name?: string }).name : t.name));
  assert.ok(names.includes(OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME));
});

test("interceptSearchOverride true still forces rewrite on passthrough path", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "xai-oauth",
      sourceFormat: "openai-responses",
      targetFormat: "openai-responses",
      nativeCodexPassthrough: true,
      interceptSearchOverride: true,
    }),
    false
  );
});

// ── Translator allowlist / Chat drop ───────────────────────────────────────

test("Responses→Chat validation accepts x_search (no unsupported_feature 400)", () => {
  assert.doesNotThrow(() => {
    openaiResponsesToOpenAIRequest(
      "gpt-4o",
      {
        model: "gpt-4o",
        input: "hi",
        tools: [
          { type: "web_search" },
          { type: "x_search", from_date: "2026-05-01", to_date: "2026-08-01" },
          {
            type: "function",
            name: "lookup",
            parameters: { type: "object", properties: {} },
          },
        ],
      },
      false,
      {}
    );
  });
});

test("Responses→Chat conversion drops x_search (no Chat equivalent)", () => {
  const converted = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      model: "gpt-4o",
      input: "hi",
      tools: [
        { type: "x_search", from_date: "2026-05-01" },
        {
          type: "function",
          name: "lookup",
          parameters: { type: "object", properties: {} },
        },
      ],
    },
    false,
    {}
  ) as { tools?: Array<{ type?: string; function?: { name?: string }; name?: string }> };

  const tools = converted.tools || [];
  assert.equal(
    tools.some((t) => t.type === "x_search"),
    false,
    "x_search must not be forwarded on Chat Completions downgrade"
  );
  assert.ok(
    tools.some((t) => t.function?.name === "lookup" || t.name === "lookup"),
    "function tools survive"
  );
});

// ── XaiExecutor URL + marker strip ─────────────────────────────────────────

test("XaiExecutor.buildUrl uses responsesBaseUrl when requestEndpointPath is /v1/responses", () => {
  const executor = new XaiExecutor("xai-oauth");
  const chatUrl = String(executor.buildUrl("grok-4.20-0309-reasoning", false, 0, null));
  assert.ok(
    chatUrl.includes("chat/completions") || !chatUrl.includes("/responses"),
    `default chat path expected, got ${chatUrl}`
  );

  const responsesUrl = String(
    executor.buildUrl("grok-4.20-0309-reasoning", false, 0, {
      requestEndpointPath: "/v1/responses",
    } as never)
  );
  assert.match(responsesUrl, /\/responses/);
});

test("XaiExecutor.transformRequest strips internal passthrough markers", () => {
  const executor = new XaiExecutor("xai-oauth");
  const out = executor.transformRequest(
    "grok-4.20-0309-reasoning",
    {
      model: "grok-4.20-0309-reasoning",
      input: "hi",
      tools: [{ type: "web_search" }, { type: "x_search" }],
      _nativeXaiResponsesPassthrough: true,
      _nativeCodexPassthrough: true,
    },
    false,
    {} as never
  ) as Record<string, unknown>;

  assert.equal(out._nativeXaiResponsesPassthrough, undefined);
  assert.equal(out._nativeCodexPassthrough, undefined);
  assert.ok(Array.isArray(out.tools));
  assert.equal((out.tools as unknown[]).length, 2);
});

// ── Composition invariant ──────────────────────────────────────────────────

test("composition: flag → targetFormat Responses → no rewrite → credentials stamp → Responses URL", async () => {
  const { resolveChatCoreRequestFormat } =
    await import("../../open-sse/handlers/chatCore/requestFormat.ts");
  const { resolveChatCoreTargetFormat } =
    await import("../../open-sse/handlers/chatCore/targetFormat.ts");
  const { resolveExecutionCredentials } =
    await import("../../open-sse/handlers/chatCore/executionCredentials.ts");

  const fmt = resolveChatCoreRequestFormat({
    body: {
      input: "hi",
      tools: [{ type: "web_search" }, { type: "x_search", from_date: "2026-05-01" }],
    },
    provider: "xai-oauth",
    userAgent: "unit-test",
    clientRawRequest: { endpoint: "/v1/responses", headers: new Headers() },
  });
  assert.equal(fmt.nativeXaiResponsesPassthrough, true);
  const nativeResponsesPassthrough =
    fmt.nativeCodexPassthrough || fmt.nativeXaiResponsesPassthrough;

  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "xai-oauth",
    resolvedModel: "grok-4.20-0309-reasoning",
    apiFormat: undefined,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
    nativeXaiResponsesPassthrough: fmt.nativeXaiResponsesPassthrough,
  });
  assert.equal(targetFormat, "openai-responses");

  const { fallback } = prepareWebSearchFallbackBody(
    { tools: [{ type: "web_search" }, { type: "x_search" }] },
    {
      provider: "xai-oauth",
      sourceFormat: fmt.sourceFormat,
      targetFormat,
      nativeCodexPassthrough: nativeResponsesPassthrough,
    }
  );
  assert.equal(fallback.enabled, false);

  const creds = resolveExecutionCredentials({
    credentials: {},
    nativeCodexPassthrough: nativeResponsesPassthrough,
    endpointPath: fmt.endpointPath,
    targetFormat,
    provider: "xai-oauth",
    ccSessionId: null,
  }) as { requestEndpointPath?: string };
  assert.equal(creds.requestEndpointPath, "/v1/responses");

  const url = String(
    new XaiExecutor("xai-oauth").buildUrl("grok-4.20-0309-reasoning", false, 0, {
      requestEndpointPath: creds.requestEndpointPath,
    } as never)
  );
  assert.match(url, /\/responses/);
  assert.equal(url.includes("chat/completions"), false);
});

// ── Response fidelity ──────────────────────────────────────────────────────

test("sanitizeResponsesApiResponse keeps xAI server-side tool usage + cost ticks", async () => {
  const { sanitizeResponsesApiResponse } =
    await import("../../open-sse/handlers/responseSanitizer.ts");
  const sanitized = sanitizeResponsesApiResponse({
    id: "resp_test",
    object: "response",
    created_at: 1,
    model: "grok-4.20-0309-reasoning",
    status: "completed",
    output: [
      {
        id: "ws_1",
        type: "web_search_call",
        status: "completed",
        action: { type: "search", query: "stripe" },
      },
      {
        id: "msg_1",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: '{"ok":true}' }],
      },
    ],
    usage: {
      input_tokens: 10,
      output_tokens: 5,
      total_tokens: 15,
      cost_in_usd_ticks: 154733500,
      server_side_tool_usage_details: { web_search_calls: 1, x_search_calls: 0 },
    },
    cost_in_usd_ticks: 154733500,
    server_side_tool_usage_details: { web_search_calls: 1 },
  }) as Record<string, unknown>;

  const usage = sanitized.usage as Record<string, unknown>;
  assert.equal(usage.cost_in_usd_ticks, 154733500);
  assert.deepEqual(usage.server_side_tool_usage_details, {
    web_search_calls: 1,
    x_search_calls: 0,
  });
  assert.equal(sanitized.cost_in_usd_ticks, 154733500);
  assert.deepEqual(sanitized.server_side_tool_usage_details, { web_search_calls: 1 });
  assert.ok((sanitized.output as { type: string }[]).some((o) => o.type === "web_search_call"));
});

test("filterUsageForFormat(Responses) keeps cost ticks + server-side tool details", async () => {
  const { filterUsageForFormat } = await import("../../open-sse/utils/usageTracking.ts");
  const filtered = filterUsageForFormat(
    {
      input_tokens: 10,
      output_tokens: 5,
      total_tokens: 15,
      cost_in_usd_ticks: 154733500,
      server_side_tool_usage_details: { web_search_calls: 1, x_search_calls: 0 },
      server_side_tool_usage: { web_search: 1 },
      x_groq: { should_not: "survive" },
    },
    "openai-responses"
  ) as Record<string, unknown>;

  assert.equal(filtered.cost_in_usd_ticks, 154733500);
  assert.deepEqual(filtered.server_side_tool_usage_details, {
    web_search_calls: 1,
    x_search_calls: 0,
  });
  assert.equal(filtered.x_groq, undefined);
});
