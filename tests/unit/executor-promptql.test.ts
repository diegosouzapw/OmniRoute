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

  it("registers promptql on the usage-fetcher + limits allowlists", async () => {
    const usageMain = await import("../../open-sse/services/usage.ts");
    assert.ok(
      (usageMain.USAGE_FETCHER_PROVIDERS as readonly string[]).includes("promptql"),
      "USAGE_FETCHER_PROVIDERS must list promptql so generic quota fetcher can call it"
    );
    assert.ok((usageMain.USAGE_FETCHER_PROVIDERS as readonly string[]).includes("pql"));
    const { USAGE_SUPPORTED_PROVIDERS } = await import(
      "../../src/shared/constants/providers.ts"
    );
    assert.ok(
      (USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("promptql"),
      "USAGE_SUPPORTED_PROVIDERS must list promptql for provider-limits sync"
    );
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

describe("PromptQl — thread continuity (no cross-chat sticky)", () => {
  const projectId = "01a0fe61-baf4-4e31-9311-8cc0bb3eba91";

  it("two chats with the same first user text get different follow-up keys", () => {
    mod.clearPromptQlThreadBindingsForTests();
    const chatATurn1 = [{ role: "user", content: "hi" }];
    const chatBTurn1 = [{ role: "user", content: "hi" }]; // same greeting

    const a1 = mod.resolvePromptQlThreadBinding(projectId, chatATurn1);
    const b1 = mod.resolvePromptQlThreadBinding(projectId, chatBTurn1);
    assert.equal(a1.isFollowUp, false);
    assert.equal(b1.isFollowUp, false);
    assert.equal(a1.threadId, "");
    assert.equal(b1.threadId, "");

    // After distinct assistant replies, sticky keys diverge
    mod.storePromptQlThreadAfterTurn(projectId, chatATurn1, "reply-A-unique", "thread-A");
    mod.storePromptQlThreadAfterTurn(projectId, chatBTurn1, "reply-B-unique", "thread-B");

    const chatATurn2 = [
      { role: "user", content: "hi" },
      { role: "assistant", content: "reply-A-unique" },
      { role: "user", content: "follow A" },
    ];
    const chatBTurn2 = [
      { role: "user", content: "hi" },
      { role: "assistant", content: "reply-B-unique" },
      { role: "user", content: "follow B" },
    ];
    const a2 = mod.resolvePromptQlThreadBinding(projectId, chatATurn2);
    const b2 = mod.resolvePromptQlThreadBinding(projectId, chatBTurn2);
    assert.equal(a2.isFollowUp, true);
    assert.equal(b2.isFollowUp, true);
    assert.equal(a2.threadId, "thread-A");
    assert.equal(b2.threadId, "thread-B");
    assert.notEqual(a2.threadId, b2.threadId);
  });

  it("does NOT reuse a first-user-only mapping when history has no matching prefix", () => {
    mod.clearPromptQlThreadBindingsForTests();
    // Simulate old bug residue: someone stored under a first-user key only.
    // New resolver ignores bare first-user stickies and only matches full prefix.
    mod.storePromptQlThreadAfterTurn(
      projectId,
      [{ role: "user", content: "shared greeting" }],
      "old-asst",
      "old-thread"
    );
    // Brand-new multi-turn history that only shares the first user text but has
    // a DIFFERENT assistant — must not stick to old-thread.
    const otherChat = [
      { role: "user", content: "shared greeting" },
      { role: "assistant", content: "brand-new-asst" },
      { role: "user", content: "next" },
    ];
    const r = mod.resolvePromptQlThreadBinding(projectId, otherChat);
    assert.equal(r.isFollowUp, false);
    assert.equal(r.threadId, "");
  });

  it("honors explicit client thread id over cache", () => {
    mod.clearPromptQlThreadBindingsForTests();
    mod.storePromptQlThreadAfterTurn(
      projectId,
      [{ role: "user", content: "x" }],
      "y",
      "cached-thread"
    );
    const msgs = [
      { role: "user", content: "x" },
      { role: "assistant", content: "y" },
      { role: "user", content: "z" },
    ];
    const r = mod.resolvePromptQlThreadBinding(projectId, msgs, "client-thread-99");
    assert.equal(r.isFollowUp, true);
    assert.equal(r.threadId, "client-thread-99");
  });

  it("readClientThreadId accepts body and header variants", () => {
    assert.equal(
      mod.readClientThreadId({ promptql_thread_id: "t1" } as never),
      "t1"
    );
    assert.equal(
      mod.readClientThreadId({ thread_id: "t2" } as never),
      "t2"
    );
    assert.equal(
      mod.readClientThreadId({} as never, { "X-PromptQL-Thread-Id": "t3" }),
      "t3"
    );
    assert.equal(
      mod.readClientThreadId({} as never, { "x-conversation-id": "t4" }),
      "t4"
    );
  });

  it("system messages do not collide independent user chats", () => {
    mod.clearPromptQlThreadBindingsForTests();
    const sys = { role: "system", content: "same agentic pin for everyone" };
    const a = [sys, { role: "user", content: "topic A only" }];
    const b = [sys, { role: "user", content: "topic B only" }];
    mod.storePromptQlThreadAfterTurn(projectId, a, "asA", "thA");
    mod.storePromptQlThreadAfterTurn(projectId, b, "asB", "thB");
    const a2 = mod.resolvePromptQlThreadBinding(projectId, [
      sys,
      { role: "user", content: "topic A only" },
      { role: "assistant", content: "asA" },
      { role: "user", content: "more A" },
    ]);
    const b2 = mod.resolvePromptQlThreadBinding(projectId, [
      sys,
      { role: "user", content: "topic B only" },
      { role: "assistant", content: "asB" },
      { role: "user", content: "more B" },
    ]);
    assert.equal(a2.threadId, "thA");
    assert.equal(b2.threadId, "thB");
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
