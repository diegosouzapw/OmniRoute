// Tests for the Notion AI Web executor (#6758) — cookie auth + NDJSON
// transcript-patch parsing for Notion's undocumented runInferenceTranscript
// endpoint. Covers: registry consistency, request/response translation
// against a mocked upstream, and the error-sanitization contract.

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/notion-web.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers/web-cookie.ts");

describe("NotionWebExecutor — registry consistency", () => {
  it("is present in WEB_COOKIE_PROVIDERS with the expected shape", () => {
    const entry = (WEB_COOKIE_PROVIDERS as Record<string, Record<string, unknown>>)["notion-web"];
    assert.ok(entry, "notion-web missing from WEB_COOKIE_PROVIDERS");
    assert.equal(entry.id, "notion-web");
    assert.equal(entry.alias, "nw");
    assert.equal(entry.subscriptionRisk, true);
    assert.equal(entry.riskNoticeVariant, "webCookie");
    assert.match(String(entry.name), /unofficial|experimental/i);
  });

  it("registers a model catalog reachable via getModelsByProviderId", () => {
    const models = getModelsByProviderId("notion-web");
    assert.ok(models.length >= 1);
    assert.ok(models.some((m) => m.id === "notion-ai"));
    // Seed catalog uses real web-picker labels (fable-5 / gpt-5.6-sol), not food codenames.
    assert.ok(
      models.some((m) => m.id === "fable-5" || m.id === "gpt-5.6-sol" || m.id === "opus-4.8")
    );
    assert.equal(
      models.some(
        (m) =>
          m.id === "ambrosia-tart-high" || m.id === "orange-mousse" || m.id === "acai-budino-high"
      ),
      false
    );
  });
});

describe("NotionWebExecutor — instantiation & auth errors", () => {
  it("can be instantiated", () => {
    const executor = new mod.NotionWebExecutor();
    assert.ok(executor);
    assert.equal(executor.getProvider(), "notion-web");
  });

  it("returns 401 when no cookie credential is supplied", async () => {
    const executor = new mod.NotionWebExecutor();
    const result = await executor.execute({
      model: "notion-ai",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
      signal: null,
    } as never);
    assert.equal(result.response.status, 401);
    const errBody = (await result.response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /token_v2/i);
  });

  it("returns 400 when no user message is present", async () => {
    const executor = new mod.NotionWebExecutor();
    const result = await executor.execute({
      model: "notion-ai",
      body: { messages: [{ role: "assistant", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "token_v2=fake" },
      signal: null,
    } as never);
    assert.equal(result.response.status, 400);
  });
});

/** Cookie with space_id so execute() does not need a live getSpaces call. */
const COOKIE_WITH_SPACE = "token_v2=xyz; space_id=space-1; notion_user_id=user-1";

describe("NotionWebExecutor — upstream translation (mocked fetch)", () => {
  it("posts createThread + config/context/user and returns a chat.completion", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedUrl = "";
    let capturedHeaders: Record<string, string> = {};
    let capturedBody: {
      createThread?: boolean;
      threadId?: string;
      spaceId?: string;
      transcript: Array<{ type: string; value: unknown }>;
    } | null = null;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (url: string | URL, opts: RequestInit) => {
        capturedUrl = String(url);
        capturedHeaders = opts.headers as Record<string, string>;
        capturedBody = JSON.parse(String(opts.body));
        // Modern record-map response (live shape 2026-07-19).
        const ndjson = [
          JSON.stringify({ type: "patch-start", data: { s: [] } }),
          JSON.stringify({
            type: "record-map",
            recordMap: {
              thread_message: {
                m1: {
                  value: {
                    value: {
                      step: {
                        type: "agent-inference",
                        value: [{ type: "text", content: '<lang primary="en-US"/>Hello there!' }],
                      },
                    },
                  },
                },
              },
            },
          }),
        ].join("\n");
        return new Response(ndjson, { status: 200 });
      }) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);

      assert.equal(capturedUrl, "https://app.notion.com/api/v3/runInferenceTranscript");
      assert.equal(capturedHeaders.Cookie, COOKIE_WITH_SPACE);
      assert.equal(capturedHeaders["x-notion-space-id"], "space-1");
      assert.equal(capturedHeaders["x-notion-active-user-header"], "user-1");
      // Browser fingerprint headers to reduce Cloudflare challenges.
      assert.ok(capturedHeaders["sec-ch-ua"], "sec-ch-ua should be present");
      assert.ok(capturedHeaders["sec-fetch-dest"], "sec-fetch-dest should be present");
      assert.ok(capturedHeaders["sec-fetch-mode"], "sec-fetch-mode should be present");
      assert.equal(capturedHeaders["sec-fetch-mode"], "cors");
      assert.ok(capturedHeaders["sec-ch-ua-platform"], "sec-ch-ua-platform should be present");
      assert.equal(capturedHeaders["cache-control"], "no-cache");
      assert.equal(capturedHeaders["pragma"], "no-cache");
      assert.ok(capturedBody);
      assert.equal(capturedBody.createThread, true);
      assert.ok(typeof capturedBody.threadId === "string" && capturedBody.threadId.length > 0);
      assert.equal(capturedBody.spaceId, "space-1");
      // Transcript: config + context + user (system would fold into context).
      assert.equal(capturedBody.transcript[0].type, "config");
      assert.equal(capturedBody.transcript[1].type, "context");
      assert.equal(capturedBody.transcript[2].type, "user");
      assert.deepEqual(capturedBody.transcript[2].value, [["hi"]]);

      assert.equal(result.response.status, 200);
      const json = (await result.response.json()) as {
        object: string;
        choices: Array<{ message: { content: string } }>;
      };
      assert.equal(json.object, "chat.completion");
      // Lang tag stripped; final assistant text kept.
      assert.equal(json.choices[0].message.content, "Hello there!");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("injects a config transcript entry with the selected Notion model codename", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedBody: {
      transcript: Array<{ type: string; value?: { model?: string } }>;
    } | null = null;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (_url: string | URL, opts: RequestInit) => {
        capturedBody = JSON.parse(String(opts.body));
        return new Response(JSON.stringify({ value: [["ok"]] }), { status: 200 });
      }) as typeof fetch;

      // Legacy food codename still accepted for power users / cached clients.
      await executor.execute({
        model: "orange-mousse",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);

      assert.ok(capturedBody);
      assert.equal(capturedBody.transcript[0].type, "config");
      assert.equal(capturedBody.transcript[0].value?.model, "orange-mousse");
      assert.equal(capturedBody.transcript[1].type, "context");
      assert.equal(capturedBody.transcript[2].type, "user");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("resolves friendly slug / provider-prefixed model ids to the Notion food codename", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedBody: {
      transcript: Array<{ type: string; value?: { model?: string } }>;
    } | null = null;
    let responseModel = "";
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (_url: string | URL, opts: RequestInit) => {
        capturedBody = JSON.parse(String(opts.body));
        return new Response(JSON.stringify({ value: [["ok"]] }), { status: 200 });
      }) as typeof fetch;

      const result = await executor.execute({
        model: "notion-web/gpt-5.6-sol",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);

      assert.ok(capturedBody);
      assert.equal(capturedBody.transcript[0].type, "config");
      // Wire protocol still uses the food codename.
      assert.equal(capturedBody.transcript[0].value?.model, "orange-mousse");
      // Response echoes the client-facing real model name.
      const json = (await result.response.json()) as { model?: string };
      responseModel = json.model || "";
      assert.equal(responseModel, "gpt-5.6-sol");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("resolves fable-5 to acai-budino-high for the transcript config entry", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedBody: {
      transcript: Array<{ type: string; value?: { model?: string } }>;
    } | null = null;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (_url: string | URL, opts: RequestInit) => {
        capturedBody = JSON.parse(String(opts.body));
        return new Response(JSON.stringify({ value: [["ok"]] }), { status: 200 });
      }) as typeof fetch;

      const result = await executor.execute({
        model: "fable-5",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);

      assert.ok(capturedBody);
      assert.equal(capturedBody.transcript[0].value?.model, "acai-budino-high");
      const json = (await result.response.json()) as { model?: string };
      assert.equal(json.model, "fable-5");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("accepts a full cookie header verbatim (already containing token_v2=)", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedHeaders: Record<string, string> = {};
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (_url: string | URL, opts: RequestInit) => {
        capturedHeaders = opts.headers as Record<string, string>;
        return new Response(JSON.stringify({ value: [["ok"]] }), { status: 200 });
      }) as typeof fetch;

      await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token_v2=xyz; space_id=abc-def" },
        signal: null,
      } as never);

      assert.equal(capturedHeaders.Cookie, "token_v2=xyz; space_id=abc-def");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns a pseudo-streamed SSE response with [DONE] when stream=true", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () =>
        new Response(JSON.stringify({ value: [["Streamed reply"]] }), {
          status: 200,
        })) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);

      assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
      const text = await result.response.text();
      assert.match(text, /Streamed reply/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns 502 when Notion sends no parseable text (endpoint drift)", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () =>
        new Response("not-json\n{}", { status: 200 })) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);
      assert.equal(result.response.status, 502);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns a sanitized 403 error without leaking raw upstream error text shape", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () => new Response("Forbidden", { status: 403 })) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token_v2=expired; space_id=s1" },
        signal: null,
      } as never);
      assert.equal(result.response.status, 403);
      const errBody = (await result.response.json()) as {
        error: { message: string; code: string };
      };
      assert.match(errBody.error.message, /session expired|invalid/i);
      assert.equal(errBody.error.code, "HTTP_403");
      // No stack trace / file path leakage (Hard Rule #12).
      assert.ok(!errBody.error.message.includes("at /"));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns 502 with a sanitized message when the fetch itself throws", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () => {
        throw new Error("getaddrinfo ENOTFOUND www.notion.so at /some/internal/path.ts:42");
      }) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);
      assert.equal(result.response.status, 502);
      const errBody = (await result.response.json()) as { error: { message: string } };
      assert.ok(!errBody.error.message.includes("at /some/internal/path.ts"));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("parseNotionInferenceStream", () => {
  const { parseNotionInferenceStream } = mod;

  it("returns empty string for empty input", () => {
    assert.equal(parseNotionInferenceStream(""), "");
  });

  it("keeps only the last non-empty cumulative frame (snapshot semantics)", () => {
    const ndjson = [
      JSON.stringify({ value: [["H"]] }),
      JSON.stringify({ value: [["He"]] }),
      JSON.stringify({ value: [["Hello world"]] }),
    ].join("\n");
    assert.equal(parseNotionInferenceStream(ndjson), "Hello world");
  });

  it("skips unparseable lines without throwing", () => {
    const ndjson = ["not json", JSON.stringify({ value: [["ok"]] }), ""].join("\n");
    assert.equal(parseNotionInferenceStream(ndjson), "ok");
  });

  it("prefers record-map agent-inference over empty patches and strips lang tags", () => {
    const ndjson = [
      JSON.stringify({ type: "patch-start", data: { s: [] } }),
      JSON.stringify({
        type: "record-map",
        recordMap: {
          thread_message: {
            m1: {
              value: {
                value: {
                  step: {
                    type: "agent-inference",
                    value: [{ type: "text", content: '<lang primary="en-US"/>final' }],
                  },
                },
              },
            },
          },
        },
      }),
    ].join("\n");
    assert.equal(parseNotionInferenceStream(ndjson), "final");
  });

  it("extracts text from patch value/- append ops", () => {
    const ndjson = JSON.stringify({
      type: "patch",
      v: [{ o: "a", p: "/s/2/value/-", v: { type: "text", content: "from patch" } }],
    });
    assert.equal(parseNotionInferenceStream(ndjson), "from patch");
  });
});

describe("buildNotionTranscript", () => {
  const { buildNotionTranscript } = mod;

  it("maps roles to Notion transcript entry types (config+context+user+agent)", () => {
    const transcript = buildNotionTranscript(
      [
        { role: "system", content: "be nice" },
        { role: "user", content: "hi" },
        { role: "assistant", content: "hello" },
      ],
      { spaceId: "s1", userId: "u1" }
    );
    assert.deepEqual(
      transcript.map((t) => t.type),
      ["config", "context", "user", "agent-inference"]
    );
    const ctx = transcript[1].value as { instructions?: string; spaceId?: string };
    assert.equal(ctx.instructions, "be nice");
    assert.equal(ctx.spaceId, "s1");
    assert.deepEqual(transcript[2].value, [["hi"]]);
    assert.deepEqual(transcript[3].value, [{ type: "text", content: "hello" }]);
    assert.ok(transcript.every((t) => typeof t.id === "string" && (t.id as string).length > 0));
  });

  it("drops messages with empty content but keeps config+context", () => {
    const transcript = buildNotionTranscript([
      { role: "user", content: "" },
      { role: "user", content: "keep me" },
    ]);
    assert.equal(transcript.length, 3); // config + context + user
    assert.equal(transcript[2].type, "user");
  });

  it("accepts OpenAI content-parts arrays for system + user (agent clients)", () => {
    // Regression: array-shaped content was previously dropped entirely, so
    // system injects (jailbreak/agentic) and multimodal user turns never
    // reached Notion's transcript.
    const transcript = buildNotionTranscript(
      [
        {
          role: "system",
          content: [
            { type: "text", text: "[VP-JB] follow tools" },
            { type: "text", text: "second system part" },
          ] as unknown as string,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "find icon skill" },
          ] as unknown as string,
        },
      ],
      { spaceId: "s1" }
    );
    assert.deepEqual(
      transcript.map((t) => t.type),
      ["config", "context", "user"]
    );
    const ctx = transcript[1].value as { instructions?: string };
    assert.match(String(ctx.instructions), /\[VP-JB\] follow tools/);
    assert.match(String(ctx.instructions), /second system part/);
    assert.deepEqual(transcript[2].value, [["find icon skill"]]);
  });

  it("accepts bare string parts inside content arrays", () => {
    const transcript = buildNotionTranscript([
      {
        role: "user",
        content: ["hello", "world"] as unknown as string,
      },
    ]);
    assert.equal(transcript[2].type, "user");
    assert.deepEqual(transcript[2].value, [["hello\nworld"]]);
  });

  it("puts model food-codename on config when provided", () => {
    const transcript = buildNotionTranscript([{ role: "user", content: "hi" }], {
      notionModel: "acai-budino-high",
    });
    assert.equal((transcript[0].value as { model?: string }).model, "acai-budino-high");
  });

  it("accepts OpenAI content-parts arrays for system + user", () => {
    const transcript = buildNotionTranscript(
      [
        {
          role: "system",
          content: [{ type: "text", text: "be helpful" }] as unknown as string,
        },
        {
          role: "user",
          content: [{ type: "text", text: "hi parts" }] as unknown as string,
        },
      ],
      { spaceId: "s1" }
    );
    assert.deepEqual(
      transcript.map((t) => t.type),
      ["config", "context", "user"]
    );
    const ctx = transcript[1].value as { instructions?: string };
    assert.match(String(ctx.instructions), /be helpful/);
    assert.deepEqual(transcript[2].value, [["hi parts"]]);
  });
});

describe("estimateNotionUsage", () => {
  const { estimateNotionUsage } = mod;

  it("scales with prompt and completion length (not a constant 2000)", () => {
    const short = estimateNotionUsage([{ role: "user", content: "hi" }], "PONG");
    const long = estimateNotionUsage([{ role: "user", content: "a".repeat(400) }], "b".repeat(400));
    assert.equal(short.estimated, true);
    assert.ok(short.prompt_tokens >= 1);
    assert.ok(short.completion_tokens >= 1);
    assert.equal(short.total_tokens, short.prompt_tokens + short.completion_tokens);
    assert.ok(long.prompt_tokens > short.prompt_tokens);
    assert.ok(long.completion_tokens > short.completion_tokens);
    // Never hardcode the USAGE_TOKEN_BUFFER default.
    assert.notEqual(short.total_tokens, 2000);
  });
});

describe("Notion upstream error extraction", () => {
  const { extractNotionUpstreamError } = mod as typeof mod & {
    extractNotionUpstreamError: (raw: string) => {
      message: string;
      subType?: string;
      isRetryable: boolean;
    } | null;
  };

  it("parses temporarily-unavailable NDJSON/JSON errors", () => {
    const err = extractNotionUpstreamError(
      JSON.stringify({
        id: "e141a6fd-79fa-4bec-9a19-ac41e9728ee6",
        type: "error",
        message: "Something went wrong. Please try again later.",
        subType: "temporarily-unavailable",
        isRetryable: false,
      })
    );
    assert.ok(err);
    assert.match(err!.message, /went wrong/i);
    assert.equal(err!.subType, "temporarily-unavailable");
    assert.equal(err!.isRetryable, true); // subtype forces retryable
  });
});

describe("Notion custom agent + workflow id", () => {
  const {
    normalizeNotionWorkflowId,
    resolveNotionAgentOptions,
    buildNotionTranscript,
    __resetNotionThreadSessionsForTests,
  } = mod;

  it("normalizes agent URL and dashless hex to UUID", () => {
    assert.equal(
      normalizeNotionWorkflowId(
        "https://app.notion.com/agent/3a3fa5616e71804098510092923e14f9?wfv=chat"
      ),
      "3a3fa561-6e71-8040-9851-0092923e14f9"
    );
    assert.equal(
      normalizeNotionWorkflowId("3a3fa561-6e71-8040-9851-0092923e14f9"),
      "3a3fa561-6e71-8040-9851-0092923e14f9"
    );
  });

  it("reads workflow_id from cookie string", () => {
    const cookie =
      "token_v2=abc; space_id=space-1; workflow_id=3a3fa561-6e71-8040-9851-0092923e14f9";
    const agent = resolveNotionAgentOptions({ apiKey: cookie }, cookie);
    assert.equal(agent.workflowId, "3a3fa561-6e71-8040-9851-0092923e14f9");
  });

  it("buildNotionTranscript sets custom agent flags when workflowId present", () => {
    const transcript = buildNotionTranscript([{ role: "user", content: "hi" }], {
      spaceId: "space-1",
      userId: "user-1",
      agent: { workflowId: "3a3fa561-6e71-8040-9851-0092923e14f9" },
    });
    const config = transcript.find((t) => t.type === "config") as {
      value: Record<string, unknown>;
    };
    const context = transcript.find((t) => t.type === "context") as {
      value: Record<string, unknown>;
    };
    assert.equal(config.value.isCustomAgent, true);
    assert.equal(config.value.useCustomAgentDraft, true);
    assert.equal(config.value.workflowId, "3a3fa561-6e71-8040-9851-0092923e14f9");
    assert.equal(context.value.surface, "custom_agent");
    assert.equal(context.value.workflowId, "3a3fa561-6e71-8040-9851-0092923e14f9");
  });

  it("default AI transcript is not a custom agent", () => {
    __resetNotionThreadSessionsForTests();
    const transcript = buildNotionTranscript([{ role: "user", content: "hi" }], {
      spaceId: "space-1",
      notionModel: "acai-budino-high",
    });
    const config = transcript.find((t) => t.type === "config") as {
      value: Record<string, unknown>;
    };
    const context = transcript.find((t) => t.type === "context") as {
      value: Record<string, unknown>;
    };
    assert.equal(config.value.isCustomAgent, false);
    assert.equal(context.value.surface, "ai_module");
    assert.equal(config.value.model, "acai-budino-high");
  });
});

describe("resolveNotionWebCookie", () => {
  const { resolveNotionWebCookie, normalizeNotionCookieInput } = mod;

  it("normalizes a bare token to token_v2=...", () => {
    assert.equal(normalizeNotionCookieInput("abc"), "token_v2=abc");
  });

  it("leaves an already-prefixed cookie untouched", () => {
    assert.equal(normalizeNotionCookieInput("token_v2=abc"), "token_v2=abc");
  });

  it("prefers apiKey over providerSpecificData", () => {
    const cookie = resolveNotionWebCookie({
      apiKey: "token_v2=direct",
      providerSpecificData: { token_v2: "ignored" },
    } as never);
    assert.equal(cookie, "token_v2=direct");
  });

  it("assembles a cookie from structured providerSpecificData fields", () => {
    const cookie = resolveNotionWebCookie({
      providerSpecificData: {
        token_v2: "abc",
        space_id: "space-1",
        notion_browser_id: "browser-1",
      },
    } as never);
    assert.equal(cookie, "token_v2=abc; space_id=space-1; notion_browser_id=browser-1");
  });

  it("returns empty string when no credential is present", () => {
    assert.equal(resolveNotionWebCookie({} as never), "");
  });
});
