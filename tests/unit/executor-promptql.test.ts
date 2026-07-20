// Unit tests for PromptQL playground executor (unofficial session bridge).

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/promptql.ts");
const usage = await import("../../open-sse/services/usage/promptql.ts");
const models = await import("../../open-sse/services/promptqlModels.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
const { WEB_COOKIE_PROVIDERS } = await import(
  "../../src/shared/constants/providers/web-cookie.ts"
);

// Sample JWT payload (unsigned shape for claim extraction only)
function makeFakeJwt(claims: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${header}.${payload}.sig`;
}

const sampleJwt = makeFakeJwt({
  "https://promptql.hasura.io": {
    "x-hasura-project-id": "01a0fe61-baf4-4e31-9311-8cc0bb3eba91",
    "x-hasura-email": "test@example.com",
  },
  exp: Math.floor(Date.now() / 1000) + 3600,
  iat: Math.floor(Date.now() / 1000),
});

describe("PromptQl — registry consistency", () => {
  it("is present in WEB_COOKIE_PROVIDERS", () => {
    const entry = (WEB_COOKIE_PROVIDERS as Record<string, Record<string, unknown>>)["promptql"];
    assert.ok(entry, "promptql missing from WEB_COOKIE_PROVIDERS");
    assert.equal(entry.id, "promptql");
    assert.equal(entry.alias, "pql");
    assert.equal(entry.subscriptionRisk, true);
  });

  it("registers a model catalog via getModelsByProviderId", () => {
    const catalog = getModelsByProviderId("promptql");
    assert.ok(catalog.length >= 5);
    assert.ok(catalog.some((m) => m.id === "gemini-3.5-flash" || m.id.includes("gemini")));
    assert.ok(catalog.some((m) => m.id.includes("gpt-5.6") || m.id.includes("fable")));
  });
});

describe("PromptQl — helpers", () => {
  it("normalizes Bearer tokens and extracts projectId", () => {
    assert.equal(mod.normalizePromptQlToken("Bearer abc.def.ghi"), "abc.def.ghi");
    assert.equal(mod.extractProjectIdFromToken(sampleJwt), "01a0fe61-baf4-4e31-9311-8cc0bb3eba91");
  });

  it("extracts final_response.message from AgentMessage event_data", () => {
    const eventData = {
      AgentMessage: {
        update: {
          content: {
            interaction_update: {
              main_agent: {
                actions_parsed: {
                  actions: [{ final_response: { message: "PONG-PROMPTQL-OK" } }],
                },
              },
            },
          },
        },
      },
    };
    assert.equal(mod.extractFinalResponseMessage(eventData), "PONG-PROMPTQL-OK");
    assert.equal(mod.isFinalAgentEvent(eventData), true);
  });

  it("parses final_response from response_text XML", () => {
    const eventData = {
      AgentMessage: {
        update: {
          content: {
            interaction_update: {
              main_agent: {
                llm_response: {
                  response_text:
                    "<action>\n<final_response>\nHello there\n</final_response>\n</action>",
                },
              },
            },
          },
        },
      },
    };
    assert.equal(mod.extractFinalResponseMessage(eventData), "Hello there");
  });

  it("resolves model slugs and prefixes", () => {
    assert.equal(models.clientFacingPromptQlModelId("promptql/gemini-3.5-flash"), "gemini-3.5-flash");
    assert.equal(models.clientFacingPromptQlModelId("pql/gpt-5.6-sol"), "gpt-5.6-sol");
    const r = models.resolvePromptQlModel("Claude Fable 5");
    assert.ok(r);
    assert.equal(r!.id, "vertex-claude-fable-5");
  });

  it("converts credit micros to USD", () => {
    assert.equal(usage.microsToUsd(46370444), 46.37);
    assert.equal(usage.microsToUsd(50000000), 50);
    const q = usage.buildPromptQlCreditsQuota({
      available_credits_usd_micros: 50000000,
      total_drawn_usd_micros: 3629556,
      remaining_credits_usd_micros: 46370444,
      last_drawdown_at: "2026-07-20T23:01:33.508593+00:00",
    });
    assert.equal(q.currency, "USD");
    assert.equal(q.remaining, 46.37);
    assert.equal(q.total, 50);
    assert.ok((q.used ?? 0) > 0);
  });

  it("extracts OpenAI content-parts arrays", () => {
    assert.equal(
      mod.extractMessageText([{ type: "text", text: "hi" }, { type: "text", text: " there" }]),
      "hi\n there"
    );
  });
});

describe("PromptQlExecutor — auth / validation", () => {
  it("can be instantiated", () => {
    const executor = new mod.PromptQlExecutor();
    assert.ok(executor);
    assert.equal(executor.getProvider(), "promptql");
  });

  it("returns 401 when no token is supplied", async () => {
    const executor = new mod.PromptQlExecutor();
    const result = await executor.execute({
      model: "gemini-3.5-flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
      signal: null,
    } as never);
    assert.equal(result.response.status, 401);
    const errBody = (await result.response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /JWT|Bearer|token/i);
  });

  it("returns 400 when no user message is present", async () => {
    const executor = new mod.PromptQlExecutor();
    const result = await executor.execute({
      model: "gemini-3.5-flash",
      body: { messages: [{ role: "assistant", content: "hi" }] },
      stream: false,
      credentials: { apiKey: sampleJwt },
      signal: null,
    } as never);
    assert.equal(result.response.status, 400);
  });
});

describe("PromptQlExecutor — mocked GraphQL turn", () => {
  it("start_thread + poll AgentMessage → chat.completion", async () => {
    const originalFetch = globalThis.fetch;
    let call = 0;
    globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
      call++;
      const body = typeof init?.body === "string" ? init.body : "";
      if (body.includes("StartThread") || body.includes("start_thread")) {
        return new Response(
          JSON.stringify({
            data: {
              start_thread: {
                thread_id: "thread-1",
                thread_events: [{ thread_event_id: "10", event_data: { UserMessage: {} } }],
              },
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      if (body.includes("QueryThreadEvents") || body.includes("thread_events")) {
        return new Response(
          JSON.stringify({
            data: {
              thread_events: [
                {
                  thread_event_id: "11",
                  event_data: {
                    AgentMessage: {
                      update: {
                        content: {
                          interaction_update: {
                            main_agent: {
                              actions_parsed: {
                                actions: [{ final_response: { message: "HELLO-PQL" } }],
                              },
                              action_completed: {
                                result: {
                                  agent_loop_action_result_type: "final_response_sent",
                                  message: "HELLO-PQL",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ errors: [{ message: "unexpected" }] }), {
        status: 200,
      });
    }) as typeof fetch;

    try {
      const executor = new mod.PromptQlExecutor();
      const result = await executor.execute({
        model: "gemini-3.5-flash",
        body: { messages: [{ role: "user", content: "ping" }] },
        stream: false,
        credentials: { apiKey: sampleJwt },
        signal: null,
      } as never);
      assert.equal(result.response.status, 200);
      const json = (await result.response.json()) as {
        choices: Array<{ message: { content: string } }>;
        promptql_thread_id?: string;
        model: string;
      };
      assert.equal(json.choices[0]!.message.content, "HELLO-PQL");
      assert.equal(json.promptql_thread_id, "thread-1");
      assert.equal(json.model, "gemini-3.5-flash");
      assert.ok(call >= 2);
      assert.equal(result.response.headers.get("X-PromptQL-Thread-Id"), "thread-1");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
