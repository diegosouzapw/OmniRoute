import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildConolUserTurn,
  buildConolPromptText,
  clearConolSessionBindingsForTests,
  collectConolMessageStream,
  ConolWebExecutor,
  normalizeConolCookie,
  parseConolMessageStream,
  resolveConolClientSessionKey,
  resolveConolCredentials,
} from "../../open-sse/executors/conol-web.ts";
import {
  CONOL_FALLBACK_MODELS,
  parseConolAgentServers,
  resolveConolModelSelection,
} from "../../open-sse/services/conolModels.ts";
import { buildConolUsageResult } from "../../open-sse/services/conolUsage.ts";
import { extractConolBrowserCredentials } from "../../open-sse/services/conolBrowserLogin.ts";
import { claudeToOpenAIRequest } from "../../open-sse/translator/request/claude-to-openai.ts";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";

const SESSION_COOKIE_NAME = "__Secure-better-auth.session_token";

describe("Conol web provider", () => {
  it("normalizes raw, full-header, JSON, and provider-data credentials", () => {
    assert.equal(normalizeConolCookie("token-value"), `${SESSION_COOKIE_NAME}=token-value`);
    assert.equal(
      normalizeConolCookie(`Cookie: preference=compact; ${SESSION_COOKIE_NAME}=token-value`),
      `preference=compact; ${SESSION_COOKIE_NAME}=token-value`
    );
    assert.deepEqual(
      resolveConolCredentials({
        apiKey: JSON.stringify({ cookie: `${SESSION_COOKIE_NAME}=json-token` }),
      }),
      { cookie: `${SESSION_COOKIE_NAME}=json-token` }
    );
    assert.deepEqual(
      resolveConolCredentials({
        providerSpecificData: { [SESSION_COOKIE_NAME]: "provider-token" },
      }),
      { cookie: `${SESSION_COOKIE_NAME}=provider-token` }
    );
  });

  it("sends only the latest user turn and strips generated image metadata", () => {
    const messages = [
      { role: "system", content: "Be concise." },
      { role: "user", content: "Earlier user turn" },
      { role: "assistant", content: "Ready." },
      { role: "tool", content: "secret tool output" },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "[Image 1]: (unavailable)\n" +
              "[Image: source: C:\\Users\\someone\\.claude\\image-cache\\id\\2.png]\n" +
              "Inspect this",
          },
          { type: "image_url", image_url: { url: "data:image/png;base64,YQ==" } },
        ],
      },
    ];
    const turn = buildConolUserTurn(messages);
    const prompt = buildConolPromptText(messages);

    assert.equal(prompt, "Inspect this");
    assert.equal(turn.text, "Inspect this");
    assert.deepEqual(turn.imageUrls, ["data:image/png;base64,YQ=="]);
    assert.doesNotMatch(prompt, /Be concise|Earlier user turn|Ready|secret tool output/);
    assert.doesNotMatch(prompt, /image-cache|unavailable/);
    assert.doesNotMatch(prompt, /base64/);
  });

  it("derives stable client session keys without exposing the raw identifier", () => {
    const fromHeader = resolveConolClientSessionKey(
      {},
      { "x-claude-code-session-id": "client-session-123" }
    );
    const repeated = resolveConolClientSessionKey(
      {},
      { "X-Claude-Code-Session-Id": "client-session-123" }
    );
    const movedToBody = resolveConolClientSessionKey({
      conversation_id: "client-session-123",
    });
    const fromMetadata = resolveConolClientSessionKey({
      metadata: { user_id: JSON.stringify({ session_id: "metadata-session-456" }) },
    });

    assert.equal(fromHeader, repeated);
    assert.equal(fromHeader, movedToBody);
    assert.match(fromHeader || "", /^[a-f0-9]{64}$/);
    assert.doesNotMatch(fromHeader || "", /client-session-123/);
    assert.match(fromMetadata || "", /^[a-f0-9]{64}$/);
    assert.equal(resolveConolClientSessionKey({}), null);
  });

  it("keeps Claude system/tool data out while preserving its translated image", () => {
    const translated = claudeToOpenAIRequest(
      "conol-web/claude-fable-5",
      {
        system: [{ type: "text", text: "Large Claude Code system instructions." }],
        messages: [
          {
            role: "assistant",
            content: [
              {
                type: "tool_use",
                id: "tool-1",
                name: "Read",
                input: { path: "private.txt" },
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: "tool-1",
                content: "Private tool result",
              },
              {
                type: "text",
                text: "Describe this image",
              },
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/png",
                  data: "aW1hZ2U=",
                },
              },
            ],
          },
        ],
      },
      false
    );
    const turn = buildConolUserTurn(
      translated.messages as Array<{
        role: string;
        content: unknown;
      }>
    );

    assert.equal(turn.text, "Describe this image");
    assert.deepEqual(turn.imageUrls, ["data:image/png;base64,aW1hZ2U="]);
    assert.doesNotMatch(turn.text, /system instructions|Private tool result|private\.txt/);
  });

  it("uses the latest cumulative history snapshot", () => {
    const raw = [
      JSON.stringify({
        type: "history_delta",
        stages: [
          {
            preview: [{ role: "assistant", content: [{ type: "text", text: "Hel" }] }],
          },
        ],
      }),
      JSON.stringify({
        type: "history_delta",
        stages: [
          {
            logs: [{ role: "assistant", content: [{ type: "text", text: "Hello world!" }] }],
          },
        ],
        contextUsage: {
          usedTokens: 42,
          contextWindow: 200000,
          modelId: "claude-fable-5",
        },
      }),
      JSON.stringify({ type: "done" }),
    ].join("\n");

    assert.deepEqual(parseConolMessageStream(raw), {
      text: "Hello world!",
      usedTokens: 42,
      contextWindow: 200000,
      modelId: "claude-fable-5",
      done: true,
    });
  });

  it("stops reading when done arrives even if the upstream never closes", async () => {
    const encoder = new TextEncoder();
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            [
              `message\t${JSON.stringify({
                type: "history_delta",
                stages: [
                  {
                    logs: [{ role: "assistant", content: [{ type: "text", text: "Finished" }] }],
                  },
                ],
              })}`,
              `message\t${JSON.stringify({ type: "done" })}`,
              "",
            ].join("\n")
          )
        );
      },
      cancel() {
        cancelled = true;
      },
    });

    const raw = await Promise.race([
      collectConolMessageStream(new Response(body)),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("collector did not stop at done")), 1_000)
      ),
    ]);
    assert.equal(parseConolMessageStream(raw).text, "Finished");
    assert.equal(cancelled, true);
  });

  it("parses the live nested agent-server model schema and strips server secrets", () => {
    const discovery = parseConolAgentServers([
      {
        id: "server-1",
        apiKey: "must-not-leak",
        capabilities: {
          defaultAgent: "conol",
          agents: [
            {
              name: "conol",
              defaultModel: "claude-fable-5",
              models: [
                {
                  name: "claude-fable-5",
                  displayName: "Claude Fable 5",
                  efforts: ["low", "xhigh"],
                  inputModalities: ["text", "image"],
                },
                {
                  name: "deepseek/deepseek-v4-pro",
                  displayName: "DeepSeek V4 Pro",
                  inputModalities: ["text"],
                },
              ],
            },
          ],
        },
      },
    ]);

    assert.deepEqual(discovery, {
      agentServerId: "server-1",
      defaultModel: "claude-fable-5",
      models: [
        { id: "claude-fable-5", name: "Claude Fable 5", supportsVision: true },
        {
          id: "deepseek/deepseek-v4-pro",
          name: "DeepSeek V4 Pro",
          supportsVision: false,
        },
      ],
    });
    assert.equal(JSON.stringify(discovery).includes("must-not-leak"), false);
    assert.ok(CONOL_FALLBACK_MODELS.length > 0);
  });

  it("reports native vision support for effort variants and preserves text-only models", () => {
    assert.equal(
      getResolvedModelCapabilities("conol-web/claude-fable-5-xhigh").supportsVision,
      true
    );
    assert.equal(
      getResolvedModelCapabilities("cnl/deepseek/deepseek-v4-pro").supportsVision,
      false
    );
  });

  it("separates effort suffixes from the upstream model ID", () => {
    assert.deepEqual(resolveConolModelSelection("conol-web/claude-fable-5-xhigh"), {
      model: "claude-fable-5",
      effort: "xhigh",
    });
    assert.deepEqual(resolveConolModelSelection("cnl/gpt-5.6-sol"), {
      model: "gpt-5.6-sol",
    });
  });

  it("extracts only a valid Conol secure browser cookie", () => {
    assert.deepEqual(
      extractConolBrowserCredentials([
        { name: "other", value: "ignored", domain: ".conol.ai" },
        { name: SESSION_COOKIE_NAME, value: "browser-token", domain: ".conol.ai" },
      ]),
      { cookie: `${SESSION_COOKIE_NAME}=browser-token` }
    );
    assert.equal(
      extractConolBrowserCredentials([
        { name: SESSION_COOKIE_NAME, value: "unsafe;cookie", domain: ".conol.ai" },
      ]),
      null
    );
    assert.equal(
      extractConolBrowserCredentials([
        { name: SESSION_COOKIE_NAME, value: "wrong-domain", domain: ".example.com" },
      ]),
      null
    );
  });

  it("maps remaining balances without inventing consumed history", () => {
    const usage = buildConolUsageResult({
      dailyCredits: 12.5,
      subscriptionCredits: 7,
      subscriptionAmount: 20,
      extraCredits: 3,
      total: 22.5,
    });

    assert.equal(usage.plan, "Subscription");
    assert.equal(usage.quotas.credits.remaining, 22.5);
    assert.equal(usage.quotas.credits.used, 0);
    assert.equal(usage.quotas.subscription.total, 20);
    assert.equal(usage.quotas.subscription.used, 13);
  });

  it("creates a session with base model and effort and returns a completed response", async () => {
    clearConolSessionBindingsForTests();
    const originalFetch = globalThis.fetch;
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = input instanceof Request ? input.url : String(input);
      calls.push({ url, init });
      if (url.endsWith("/api/sessions")) {
        return new Response(JSON.stringify({ sessionId: "session_123" }), {
          status: 201,
          headers: { "content-type": "application/json" },
        });
      }
      if (url.includes("/api/sessions/session_123/messages")) {
        return new Response(
          [
            JSON.stringify({
              type: "history_delta",
              stages: [
                {
                  logs: [
                    {
                      role: "assistant",
                      content: [{ type: "text", text: "OK" }],
                    },
                  ],
                },
              ],
            }),
            JSON.stringify({ type: "done" }),
          ].join("\n"),
          { status: 200, headers: { "content-type": "application/x-ndjson" } }
        );
      }
      throw new Error(`Unexpected test URL: ${url}`);
    }) as typeof fetch;

    try {
      const executor = new ConolWebExecutor();
      const result = await executor.execute({
        model: "conol-web/claude-fable-5-xhigh",
        stream: false,
        body: {
          messages: [{ role: "user", content: "Reply OK" }],
          timezone: "Europe/Chisinau",
        },
        credentials: {
          providerSpecificData: { cookie: `${SESSION_COOKIE_NAME}=synthetic-token` },
        },
      });

      const capture = result as {
        response: Response;
        headers: Record<string, string>;
        transformedBody: Record<string, unknown>;
      };
      assert.deepEqual(capture.headers, { cookie: "***" });
      assert.equal(JSON.stringify(capture).includes("synthetic-token"), false);
      assert.deepEqual(capture.transformedBody, {
        model: "claude-fable-5",
        effort: "xhigh",
        sessionId: "session_123",
        reusedSession: false,
        clientSessionBound: false,
        imageCount: 0,
      });

      const sessionBody = JSON.parse(String(calls[0]?.init?.body));
      assert.equal(sessionBody.agentModel, "claude-fable-5");
      assert.equal(sessionBody.agentEffort, "xhigh");
      assert.equal(calls[0]?.init?.headers instanceof Headers, false);

      const responseBody = await capture.response.json();
      assert.equal(responseBody.choices[0].message.content, "OK");
      assert.equal(responseBody.model, "claude-fable-5");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("reuses one Conol session for follow-ups and forwards only the newest user turn", async () => {
    clearConolSessionBindingsForTests();
    const originalFetch = globalThis.fetch;
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    let streamCount = 0;
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = input instanceof Request ? input.url : String(input);
      calls.push({ url, init });
      if (url.endsWith("/api/sessions") && init?.method === "POST") {
        return new Response(JSON.stringify({ sessionId: "sticky_session" }), { status: 201 });
      }
      if (url.endsWith("/api/sessions/sticky_session/messages") && init?.method === "POST") {
        return new Response(null, { status: 202 });
      }
      if (url.includes("/api/sessions/sticky_session/messages?logDeltas=1")) {
        streamCount += 1;
        return new Response(
          [
            JSON.stringify({
              type: "history_delta",
              stages: [
                {
                  logs: [
                    {
                      role: "assistant",
                      content: [{ type: "text", text: streamCount === 1 ? "First" : "Second" }],
                    },
                  ],
                },
              ],
            }),
            JSON.stringify({ type: "done" }),
          ].join("\n"),
          { status: 200 }
        );
      }
      throw new Error(`Unexpected test URL: ${url}`);
    }) as typeof fetch;

    const executor = new ConolWebExecutor();
    const sharedInput = {
      model: "conol-web/claude-fable-5",
      stream: false,
      credentials: {
        connectionId: "connection-1",
        apiKey: `${SESSION_COOKIE_NAME}=synthetic-token`,
      },
      clientHeaders: { "x-claude-code-session-id": "logical-chat-1" },
    };

    try {
      const first = await executor.execute({
        ...sharedInput,
        body: {
          messages: [
            { role: "system", content: "Never forward this system prompt." },
            { role: "user", content: "First user turn" },
          ],
        },
      });
      const second = await executor.execute({
        ...sharedInput,
        body: {
          messages: [
            { role: "system", content: "Never forward this system prompt." },
            { role: "user", content: "First user turn" },
            { role: "assistant", content: "First" },
            { role: "tool", content: "Never forward this tool output." },
            { role: "user", content: "Second user turn" },
          ],
        },
      });

      assert.equal((first as { response: Response }).response.status, 200);
      assert.equal((second as { response: Response }).response.status, 200);
      const createCalls = calls.filter(
        (call) => call.url.endsWith("/api/sessions") && call.init?.method === "POST"
      );
      const followUpCalls = calls.filter(
        (call) =>
          call.url.endsWith("/api/sessions/sticky_session/messages") && call.init?.method === "POST"
      );
      assert.equal(createCalls.length, 1);
      assert.equal(followUpCalls.length, 1);

      const createBody = JSON.parse(String(createCalls[0]?.init?.body));
      const followUpBody = JSON.parse(String(followUpCalls[0]?.init?.body));
      assert.deepEqual(createBody.messages, [{ type: "text", content: "First user turn" }]);
      assert.deepEqual(followUpBody.messages, [{ type: "text", content: "Second user turn" }]);
      assert.equal("source" in followUpBody, false);
      assert.equal("agentModel" in followUpBody, false);
      assert.doesNotMatch(
        JSON.stringify([createBody, followUpBody]),
        /system prompt|tool output|\"role\"/
      );
      assert.equal(
        (first as { transformedBody: Record<string, unknown> }).transformedBody.reusedSession,
        false
      );
      assert.equal(
        (second as { transformedBody: Record<string, unknown> }).transformedBody.reusedSession,
        true
      );
    } finally {
      globalThis.fetch = originalFetch;
      clearConolSessionBindingsForTests();
    }
  });

  it("keeps different client session IDs in different Conol sessions", async () => {
    clearConolSessionBindingsForTests();
    const originalFetch = globalThis.fetch;
    let createdCount = 0;
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = input instanceof Request ? input.url : String(input);
      if (url.endsWith("/api/sessions") && init?.method === "POST") {
        createdCount += 1;
        return new Response(JSON.stringify({ sessionId: `session_${createdCount}` }), {
          status: 201,
        });
      }
      if (url.includes("/messages?logDeltas=1")) {
        return new Response(
          `${JSON.stringify({
            type: "history_delta",
            stages: [
              {
                logs: [{ role: "assistant", content: [{ type: "text", text: "Isolated" }] }],
              },
            ],
          })}\n${JSON.stringify({ type: "done" })}\n`,
          { status: 200 }
        );
      }
      throw new Error(`Unexpected test URL: ${url}`);
    }) as typeof fetch;

    try {
      const executor = new ConolWebExecutor();
      for (const sessionId of ["client-a", "client-b"]) {
        await executor.execute({
          model: "conol-web/claude-fable-5",
          stream: false,
          body: { messages: [{ role: "user", content: "Same text" }] },
          credentials: {
            connectionId: "connection-1",
            apiKey: `${SESSION_COOKIE_NAME}=synthetic-token`,
          },
          clientHeaders: { "x-session-id": sessionId },
        });
      }
      assert.equal(createdCount, 2);
    } finally {
      globalThis.fetch = originalFetch;
      clearConolSessionBindingsForTests();
    }
  });

  it("uploads the structured image and references it before clean user text", async () => {
    clearConolSessionBindingsForTests();
    const originalFetch = globalThis.fetch;
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nGQAAAAASUVORK5CYII=",
      "base64"
    );
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = input instanceof Request ? input.url : String(input);
      calls.push({ url, init });
      if (url.endsWith("/api/assets")) {
        assert.deepEqual(Buffer.from(init?.body as Uint8Array), png);
        return new Response(
          JSON.stringify({
            id: "asset_1",
            url: "/api/assets/asset_1",
            mediaType: "image/png",
          }),
          { status: 201 }
        );
      }
      if (url.endsWith("/api/sessions")) {
        return new Response(JSON.stringify({ sessionId: "image_session" }), { status: 201 });
      }
      if (url.includes("/api/sessions/image_session/messages?logDeltas=1")) {
        return new Response(
          `${JSON.stringify({
            type: "history_delta",
            stages: [
              {
                logs: [{ role: "assistant", content: [{ type: "text", text: "Image received" }] }],
              },
            ],
          })}\n${JSON.stringify({ type: "done" })}\n`,
          { status: 200 }
        );
      }
      throw new Error(`Unexpected test URL: ${url}`);
    }) as typeof fetch;

    try {
      const result = await new ConolWebExecutor().execute({
        model: "conol-web/claude-fable-5",
        stream: false,
        body: {
          messages: [
            { role: "system", content: "System data must stay local." },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    "[Image 1]: (unavailable)\n" +
                    "[Image: source: C:\\Users\\someone\\.claude\\image-cache\\id\\2.png]\n" +
                    "What is on the image?",
                },
                {
                  type: "image_url",
                  image_url: { url: `data:image/png;base64,${png.toString("base64")}` },
                },
              ],
            },
          ],
        },
        credentials: { apiKey: `${SESSION_COOKIE_NAME}=synthetic-token` },
      });

      assert.equal((result as { response: Response }).response.status, 200);
      const createCall = calls.find((call) => call.url.endsWith("/api/sessions"));
      const createBody = JSON.parse(String(createCall?.init?.body));
      assert.deepEqual(createBody.messages, [
        {
          type: "image",
          content: "/api/assets/asset_1",
          mediaType: "image/png",
        },
        { type: "text", content: "What is on the image?" },
      ]);
      assert.doesNotMatch(JSON.stringify(createBody), /unavailable|image-cache|System data/);
    } finally {
      globalThis.fetch = originalFetch;
      clearConolSessionBindingsForTests();
    }
  });

  it("emits OpenAI SSE data and a terminal DONE marker", async () => {
    clearConolSessionBindingsForTests();
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: string | URL | Request) => {
      const url = input instanceof Request ? input.url : String(input);
      if (url.endsWith("/api/sessions")) {
        return new Response(JSON.stringify({ sessionId: "session_stream" }), { status: 201 });
      }
      return new Response(
        `${JSON.stringify({
          type: "history_delta",
          stages: [
            {
              logs: [{ role: "assistant", content: [{ type: "text", text: "Streamed" }] }],
            },
          ],
        })}\n${JSON.stringify({ type: "done" })}\n`,
        { status: 200 }
      );
    }) as typeof fetch;

    try {
      const result = await new ConolWebExecutor().execute({
        model: "conol-web/claude-haiku-4-5",
        stream: true,
        body: { messages: [{ role: "user", content: "Test" }] },
        credentials: { apiKey: `${SESSION_COOKIE_NAME}=synthetic-token` },
      });
      const text = await (result as { response: Response }).response.text();
      assert.match(text, /"content":"Streamed"/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
