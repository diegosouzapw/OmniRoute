import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildConolPromptText,
  collectConolMessageStream,
  ConolWebExecutor,
  normalizeConolCookie,
  parseConolMessageStream,
  resolveConolCredentials,
} from "../../open-sse/executors/conol-web.ts";
import {
  CONOL_FALLBACK_MODELS,
  parseConolAgentServers,
  resolveConolModelSelection,
} from "../../open-sse/services/conolModels.ts";
import { buildConolUsageResult } from "../../open-sse/services/conolUsage.ts";
import { extractConolBrowserCredentials } from "../../open-sse/services/conolBrowserLogin.ts";

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

  it("preserves prompt roles and strips image payloads from text", () => {
    const prompt = buildConolPromptText([
      { role: "system", content: "Be concise." },
      { role: "assistant", content: "Ready." },
      {
        role: "user",
        content: [
          { type: "text", text: "Inspect this" },
          { type: "image_url", image_url: { url: "data:image/png;base64,YQ==" } },
        ],
      },
    ]);

    assert.match(prompt, /\[System\]\nBe concise\./);
    assert.match(prompt, /\[Assistant\]\nReady\./);
    assert.match(prompt, /\[User\]\nInspect this/);
    assert.doesNotMatch(prompt, /base64/);
  });

  it("uses the latest cumulative history snapshot", () => {
    const raw = [
      JSON.stringify({
        type: "history_delta",
        stages: [
          {
            preview: [
              { role: "assistant", content: [{ type: "text", text: "Hel" }] },
            ],
          },
        ],
      }),
      JSON.stringify({
        type: "history_delta",
        stages: [
          {
            logs: [
              { role: "assistant", content: [{ type: "text", text: "Hello world!" }] },
            ],
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
                    logs: [
                      { role: "assistant", content: [{ type: "text", text: "Finished" }] },
                    ],
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
      models: [{ id: "claude-fable-5", name: "Claude Fable 5" }],
    });
    assert.equal(JSON.stringify(discovery).includes("must-not-leak"), false);
    assert.ok(CONOL_FALLBACK_MODELS.length > 0);
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

  it("emits OpenAI SSE data and a terminal DONE marker", async () => {
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
              logs: [
                { role: "assistant", content: [{ type: "text", text: "Streamed" }] },
              ],
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
