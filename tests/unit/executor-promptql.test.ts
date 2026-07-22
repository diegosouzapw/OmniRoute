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

const PROJECT_ID = "01a0fe61-baf4-4e31-9311-8cc0bb3eba91";

/** Playground enrich-token shape (chat-capable). */
const sampleJwt = makeFakeJwt({
  "https://promptql.hasura.io": {
    "x-hasura-project-id": PROJECT_ID,
    "x-hasura-email": "test@example.com",
  },
  aud: "promptql.hasura.io",
  iss: "enrich-token",
  exp: Math.floor(Date.now() / 1000) + 3600,
  iat: Math.floor(Date.now() / 1000),
});

/**
 * Live DDN / lux project JWT shape (verified 2026-07-21):
 * aud = project UUID, NO hasura claims. Works for getCreditSummary, not playground chat.
 */
const ddnLuxJwt = makeFakeJwt({
  aud: PROJECT_ID,
  exp: Math.floor(Date.now() / 1000) + 3600,
  iat: Math.floor(Date.now() / 1000),
  iss: "https://auth.pro.hasura.io/ddn/token",
  sub: "fad1258d-520b-455c-9cc0-596ca862104b",
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
  it("normalizes Bearer tokens and extracts projectId from enrich-token JWT", () => {
    assert.equal(mod.normalizePromptQlToken("Bearer abc.def.ghi"), "abc.def.ghi");
    assert.equal(mod.extractProjectIdFromToken(sampleJwt), PROJECT_ID);
    assert.equal(mod.isPlaygroundPromptQlToken(sampleJwt), true);
    assert.equal(mod.isDdnProjectPromptQlToken(sampleJwt), false);
  });

  it("extracts projectId from DDN lux JWT aud (no hasura claims)", () => {
    assert.equal(mod.extractProjectIdFromToken(ddnLuxJwt), PROJECT_ID);
    assert.equal(mod.isPlaygroundPromptQlToken(ddnLuxJwt), false);
    assert.equal(mod.isDdnProjectPromptQlToken(ddnLuxJwt), true);
    // usage leaf must match (same claim logic)
    assert.equal(usage.extractProjectIdFromToken(ddnLuxJwt), PROJECT_ID);
    assert.equal(usage.extractProjectIdFromToken(sampleJwt), PROJECT_ID);
  });

  it("resolvePromptQlCredentials accepts PSD projectId and connection.projectId", () => {
    const fromPsd = mod.resolvePromptQlCredentials({
      apiKey: ddnLuxJwt,
      providerSpecificData: { projectId: PROJECT_ID },
    } as never);
    assert.equal(fromPsd.projectId, PROJECT_ID);
    assert.equal(fromPsd.token, ddnLuxJwt);

    const fromConn = mod.resolvePromptQlCredentials({
      apiKey: ddnLuxJwt,
      projectId: PROJECT_ID,
    } as never);
    assert.equal(fromConn.projectId, PROJECT_ID);

    const fromAudOnly = mod.resolvePromptQlCredentials({
      apiKey: ddnLuxJwt,
    } as never);
    assert.equal(fromAudOnly.projectId, PROJECT_ID);
  });

  it("buildPromptQlCreditsQuota maps live ge_balance micros correctly", () => {
    // Real capture: remaining 28484763, drawn 21515237, available 50000000 → $28.48 / $21.52 / $50
    const q = usage.buildPromptQlCreditsQuota({
      available_credits_usd_micros: 50_000_000,
      total_drawn_usd_micros: 21_515_237,
      remaining_credits_usd_micros: 28_484_763,
    });
    assert.equal(q.total, 50);
    assert.equal(q.remaining, 28.48);
    assert.equal(q.used, 21.52);
    assert.ok((q.remainingPercentage ?? 0) > 50 && (q.remainingPercentage ?? 0) < 60);
    // Must NOT be the fake 0 used / 100% remaining default
    assert.notEqual(q.used, 0);
    assert.notEqual(q.remainingPercentage, 100);
  });

  it("getPromptQlUsage prefers PSD.luxJwt (DDN) over enrich apiKey for credits", async () => {
    const originalFetch = globalThis.fetch;
    const calls: string[] = [];
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const headers = init?.headers as Record<string, string> | undefined;
      const auth = String(headers?.authorization || headers?.Authorization || "");
      calls.push(auth);
      // Reject ONLY the enrich-token JWT (full match), accept DDN luxJwt
      if (auth.includes(sampleJwt)) {
        return new Response(
          JSON.stringify({
            errors: [{ message: "Authentication hook unauthorized this request" }],
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }
      if (!auth.includes(ddnLuxJwt)) {
        return new Response(
          JSON.stringify({ errors: [{ message: "unexpected token in test" }] }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({
          data: {
            promptql_project_credit_summary: [
              {
                available_credits_usd_micros: 50_000_000,
                total_drawn_usd_micros: 22_000_000,
                remaining_credits_usd_micros: 28_000_000,
              },
            ],
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }) as typeof fetch;
    try {
      const result = (await usage.getPromptQlUsage(sampleJwt, {
        projectId: PROJECT_ID,
        luxJwt: ddnLuxJwt,
      })) as { quotas?: { credits?: { used?: number; remaining?: number; total?: number } }; message?: string };
      assert.ok(result.quotas?.credits, `expected credits quota from luxJwt, got ${JSON.stringify(result)}`);
      assert.equal(result.quotas!.credits!.total, 50);
      assert.equal(result.quotas!.credits!.used, 22);
      assert.equal(result.quotas!.credits!.remaining, 28);
      // First attempt should use luxJwt (DDN preferred over enrich apiKey)
      assert.ok(calls.length >= 1);
      assert.ok(calls[0]!.includes(ddnLuxJwt), `first call should use DDN luxJwt, got ${calls[0]?.slice(0, 80)}`);
    } finally {
      globalThis.fetch = originalFetch;
    }
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

  it("rejects DDN lux JWT for chat with clear paste instructions (not Missing projectId)", async () => {
    const executor = new mod.PromptQlExecutor();
    const result = await executor.execute({
      model: "vertex-claude-fable-5",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: ddnLuxJwt },
      signal: null,
    } as never);
    assert.equal(result.response.status, 401);
    const errBody = (await result.response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /DDN|enrich-token|credits only/i);
    assert.doesNotMatch(errBody.error.message, /Missing projectId/i);
  });

  it("does not claim Missing projectId when DDN JWT has aud project UUID", async () => {
    // Pre-fix regression: extractProjectId ignored aud → 400 Missing projectId
    assert.equal(mod.extractProjectIdFromToken(ddnLuxJwt), PROJECT_ID);
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

  it("tool-result follow-up sticks even when assistant is tool_calls-only (empty content)", () => {
    mod.clearPromptQlThreadBindingsForTests();
    const turn1 = [
      {
        role: "user",
        content:
          "I am testing an interoperability layer between PromptQL and my desktop application.\n\nCurrent request: find skills about security",
      },
    ];
    const asst =
      'Intent: Search online skills.\n```json\n{"tool":"find_skills_online","args":{"query":"prompt injection"}}\n```';
    mod.storePromptQlThreadAfterTurn(projectId, turn1, asst, "thread-tools");

    // Client re-sends assistant as OpenAI tool_calls with null content + tool result user
    const turn2 = [
      { role: "user", content: "find skills about security" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: {
              name: "find_skills_online",
              arguments: '{"query":"prompt injection"}',
            },
          },
        ],
      },
      {
        role: "user",
        content:
          "@test Here is data returned by my desktop application after applying the previous recommendation " +
          "(for your context only — you do not execute anything):\n\n[tool result for find_skills_online]\nHere are practical approaches...",
      },
    ];
    const r = mod.resolvePromptQlThreadBinding(projectId, turn2 as never);
    assert.equal(r.isFollowUp, true, "must stick — not start_thread");
    assert.equal(r.threadId, "thread-tools");
  });

  it("tool-role result (not converted to user) still sticks via last assistant", () => {
    mod.clearPromptQlThreadBindingsForTests();
    const turn1 = [{ role: "user", content: "do thing" }];
    const asst = 'Intent: X\n```json\n{"tool":"run_cmd","args":{"cmd":"ls"}}\n```';
    mod.storePromptQlThreadAfterTurn(projectId, turn1, asst, "thread-tool-role");
    const turn2 = [
      { role: "user", content: "do thing" },
      { role: "assistant", content: asst },
      { role: "tool", content: "[tool result for run_cmd]\nok" },
    ];
    const r = mod.resolvePromptQlThreadBinding(projectId, turn2 as never);
    assert.equal(r.isFollowUp, true);
    assert.equal(r.threadId, "thread-tool-role");
  });

  it("extractMessageTextFromMessage reads tool_calls when content is null", () => {
    const text = mod.extractMessageTextFromMessage({
      role: "assistant",
      content: null,
      tool_calls: [
        {
          function: { name: "find_skills_online", arguments: '{"q":"x"}' },
        },
      ],
    } as never);
    assert.match(text, /find_skills_online/);
  });

  it("follows up when last user turn was rewritten (UREW) but assistant matches", () => {
    mod.clearPromptQlThreadBindingsForTests();
    // Turn 1 as seen by executor (rewritten last user)
    const turn1 = [
      {
        role: "user",
        content: "Hi! I'm using my local workflow…\n\nUser request:\nhello",
      },
    ];
    mod.storePromptQlThreadAfterTurn(projectId, turn1, "Hello there!", "thread-rewritten");
    // Turn 2: client history has ORIGINAL user text (proxy only rewrote outbound last user)
    const turn2 = [
      { role: "user", content: "hello" },
      { role: "assistant", content: "Hello there!" },
      {
        role: "user",
        content: "Hi! I'm using my local workflow…\n\nUser request:\nhello 2",
      },
    ];
    const r = mod.resolvePromptQlThreadBinding(projectId, turn2);
    assert.equal(r.isFollowUp, true);
    assert.equal(r.threadId, "thread-rewritten");
  });

  it("normalizeForFingerprint strips agent_mention and User request wrappers", () => {
    assert.equal(mod.normalizeForFingerprint("<agent_mention /> hello"), "hello");
    assert.equal(
      mod.normalizeForFingerprint("noise\n\nUser request:\nhello 2"),
      "hello 2"
    );
  });
});

describe("PromptQl credits (ge_balance capture)", () => {
  it("maps micros like live getCreditSummary to used/remaining USD", () => {
    // From promptql/ge_balance.txt live capture
    const q = usage.buildPromptQlCreditsQuota({
      available_credits_usd_micros: 50000000,
      total_drawn_usd_micros: 21515237,
      remaining_credits_usd_micros: 28484763,
      last_drawdown_at: "2026-07-21T01:37:36.491359+00:00",
    });
    assert.equal(q.total, 50);
    assert.equal(q.remaining, 28.48);
    assert.equal(q.used, 21.52);
    assert.ok((q.remainingPercentage ?? 0) > 50 && (q.remainingPercentage ?? 0) < 60);
    assert.equal(q.currency, "USD");
    assert.equal(q.displayName, "Credits (USD)");
    assert.equal(q.resetAt, null);
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
