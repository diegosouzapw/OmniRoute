// Split out of executor-notion-web.test.ts (file-size gate) — Notion AI Web
// thread session continuity: sticky root binding, prefix-hash lookup/store,
// error-retry stickiness, and the OpenAI multi-turn createThread flip
// (createThread:true on turn 1, createThread:false + same threadId on turn 2+).
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/notion-web.ts");
const { __setTlsFetchOverrideForTesting } = await import(
  "../../open-sse/services/notionTlsClient.ts"
);

const COOKIE_WITH_SPACE = "token_v2=xyz; space_id=space-1; notion_user_id=user-1";

/** Mock the Chrome-JA3 path used by sendNotionInferenceRequest (not global fetch). */
function installNotionTlsMock(
  handler: (url: string, opts: { headers?: Record<string, string>; body?: string }) => Promise<{
    status: number;
    text: string;
  }>
): () => void {
  __setTlsFetchOverrideForTesting(async (url, options) => {
    const r = await handler(url, {
      headers: options.headers as Record<string, string> | undefined,
      body: options.body,
    });
    return {
      status: r.status,
      headers: new Headers(),
      text: r.text,
      body: null,
    };
  });
  return () => __setTlsFetchOverrideForTesting(null);
}

function okNdjson(text: string): string {
  return [
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
                  value: [{ type: "text", content: text }],
                },
              },
            },
          },
        },
      },
    }),
  ].join("\n");
}

describe("Notion thread session continuity", () => {
  const {
    __resetNotionThreadSessionsForTests,
    conversationPrefixBeforeLastUser,
    hashNotionConversation,
    notionThreadSessionLookup,
    notionThreadSessionStore,
  } = mod;

  it("first user turn has no prior assistant history (lookup misses)", () => {
    assert.deepEqual(
      conversationPrefixBeforeLastUser([{ role: "user", content: "hi" }]),
      []
    );
    // System-only prefix is fine — still no stored thread for a first user turn
    const withSys = [
      { role: "system", content: "sys" },
      { role: "user", content: "hi" },
    ];
    assert.deepEqual(conversationPrefixBeforeLastUser(withSys), [
      { role: "system", content: "sys" },
    ]);
    __resetNotionThreadSessionsForTests();
    assert.equal(notionThreadSessionLookup("space-1", withSys), null);
  });

  it("prefix includes prior turns for multi-turn OpenAI history", () => {
    const msgs = [
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" },
      { role: "user", content: "next" },
    ];
    const prefix = conversationPrefixBeforeLastUser(msgs);
    assert.equal(prefix.length, 2);
    assert.equal(prefix[0].content, "hi");
    assert.equal(prefix[1].role, "assistant");
  });

  it("stores threadId after turn 1 and reuses it on turn 2 (same space)", async () => {
    __resetNotionThreadSessionsForTests();
    const spaceId = "space-1";
    const turn1 = [{ role: "user", content: "first question" }];
    assert.equal(notionThreadSessionLookup(spaceId, turn1), null);

    const threadId = "11111111-2222-3333-4444-555555555555";
    notionThreadSessionStore(spaceId, turn1, "assistant reply one", threadId);

    const turn2 = [
      { role: "user", content: "first question" },
      { role: "assistant", content: "assistant reply one" },
      { role: "user", content: "follow up" },
    ];
    assert.equal(notionThreadSessionLookup(spaceId, turn2), threadId);
    // Different space must not share the thread
    assert.equal(notionThreadSessionLookup("other-space", turn2), null);
  });

  it("reuses the same Notion thread for new stateless prompts in the same caller scope", () => {
    __resetNotionThreadSessionsForTests();
    const spaceId = "caller:cookie-hash|space-stateless";
    const firstPrompt = [{ role: "user", content: "first standalone prompt" }];
    const secondPrompt = [{ role: "user", content: "different standalone prompt" }];
    const threadId = "99999999-8888-7777-6666-555555555555";

    assert.equal(notionThreadSessionLookup(spaceId, firstPrompt), null);
    notionThreadSessionStore(spaceId, firstPrompt, "assistant reply one", threadId);

    assert.equal(notionThreadSessionLookup(spaceId, secondPrompt), threadId);
    assert.equal(notionThreadSessionLookup("caller:other|space-stateless", secondPrompt), null);
  });

  it("reuses thread when turn-1 user was UREW-rewritten but client replays original text", () => {
    __resetNotionThreadSessionsForTests();
    const spaceId = "space-urew";
    const threadId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    // What OmniRoute saw after VibeProxy agentic/UREW rewrite on turn 1
    const turn1Rewritten = [
      {
        role: "user",
        content:
          "Hi! I'm using my local workflow automation tool…\nMy current task: first question",
      },
    ];
    notionThreadSessionStore(spaceId, turn1Rewritten, "assistant reply one", threadId);

    // SkillsManager / OpenAI client history keeps the original user wording
    const turn2Client = [
      { role: "user", content: "first question" },
      { role: "assistant", content: "assistant reply one" },
      { role: "user", content: "follow up" },
    ];
    assert.equal(notionThreadSessionLookup(spaceId, turn2Client), threadId);
  });

  it("sticky root survives a failed first request (no second createThread)", async () => {
    __resetNotionThreadSessionsForTests();
    const {
      resolveNotionThreadBinding,
      notionThreadMarkCreateAttempted,
      NotionWebExecutor,
    } = mod as typeof mod & {
      resolveNotionThreadBinding: (
        spaceKey: string,
        messages: { role: string; content: string }[],
        clientThreadId?: string
      ) => { threadId: string; createThread: boolean; rootKey: string | null };
      notionThreadMarkCreateAttempted: (rootKey: string | null, threadId: string) => void;
    };

    const spaceId = "space-fail-sticky";
    const turn1 = [{ role: "user", content: "will fail once" }];
    const b1 = resolveNotionThreadBinding(spaceId, turn1);
    assert.equal(b1.createThread, true);
    notionThreadMarkCreateAttempted(b1.rootKey, b1.threadId);

    // Simulated error: binding for the same conversation must NOT mint a new thread
    const b2 = resolveNotionThreadBinding(spaceId, turn1);
    assert.equal(b2.threadId, b1.threadId);
    assert.equal(b2.createThread, false);

    // Live execute: first upstream error (in-band temporarily-unavailable), second ok
    const executor = new NotionWebExecutor();
    const captured: Array<{ createThread?: boolean; threadId?: string }> = [];
    let n = 0;
    const restoreTls = installNotionTlsMock(async (_url, opts) => {
      const body = JSON.parse(String(opts.body)) as {
        createThread?: boolean;
        threadId?: string;
      };
      captured.push(body);
      n++;
      if (n === 1) {
        return {
          status: 200,
          text: JSON.stringify({
            id: "e1",
            type: "error",
            message: "Something went wrong. Please try again later.",
            subType: "temporarily-unavailable",
            isRetryable: false,
          }),
        };
      }
      return { status: 200, text: okNdjson("recovered") };
    });
    try {
      const result = await executor.execute({
        model: "fable-5",
        body: { messages: turn1 },
        stream: false,
        credentials: { apiKey: "token_v2=test; space_id=space-fail-sticky" },
        signal: null,
      } as never);
      assert.equal(result.response.status, 200);
      // Retry must keep the same threadId and flip createThread off
      assert.ok(captured.length >= 2);
      assert.equal(captured[0]!.threadId, captured[1]!.threadId);
      assert.equal(captured[1]!.createThread, false);
      const json = (await result.response.json()) as { choices?: { message?: { content?: string } }[] };
      assert.match(String(json.choices?.[0]?.message?.content || ""), /recovered/);
    } finally {
      restoreTls();
      __resetNotionThreadSessionsForTests();
    }
  });

  it("new first-turn after confirmed chat with same opener mints a fresh thread", () => {
    __resetNotionThreadSessionsForTests();
    const {
      resolveNotionThreadBinding,
      notionThreadMarkCreateAttempted,
      notionThreadMarkConfirmed,
    } = mod as typeof mod & {
      resolveNotionThreadBinding: (
        spaceKey: string,
        messages: { role: string; content: string }[],
        clientThreadId?: string
      ) => { threadId: string; createThread: boolean; rootKey: string | null };
      notionThreadMarkCreateAttempted: (rootKey: string | null, threadId: string) => void;
      notionThreadMarkConfirmed: (rootKey: string | null, threadId: string) => void;
    };

    const spaceId = "space-new-session";
    const hi = [{ role: "user", content: "hi" }];

    const b1 = resolveNotionThreadBinding(spaceId, hi);
    assert.equal(b1.createThread, true);
    notionThreadMarkCreateAttempted(b1.rootKey, b1.threadId);
    notionThreadMarkConfirmed(b1.rootKey, b1.threadId);

    // Claude Code "New session" + same first message must NOT fork the prior Notion chat
    const b2 = resolveNotionThreadBinding(spaceId, hi);
    assert.equal(b2.createThread, true);
    assert.notEqual(b2.threadId, b1.threadId);

    // Multi-turn of the *new* session still sticks to b2 via prefix / sticky history
    mod.notionThreadSessionStore(
      spaceId,
      [{ role: "user", content: "hi" }],
      "hello from session 2",
      b2.threadId
    );
    const multi = [
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello from session 2" },
      { role: "user", content: "next" },
    ];
    const b3 = resolveNotionThreadBinding(spaceId, multi);
    assert.equal(b3.createThread, false);
    assert.equal(b3.threadId, b2.threadId);
  });

  it("execute: two sequential first-turns with same text get distinct Notion threads", async () => {
    __resetNotionThreadSessionsForTests();
    const executor = new mod.NotionWebExecutor();
    const captured: Array<{ createThread?: boolean; threadId?: string }> = [];
    const restoreTls = installNotionTlsMock(async (_url, opts) => {
      captured.push(JSON.parse(String(opts.body)));
      return { status: 200, text: okNdjson("pong") };
    });
    try {
      const creds = { apiKey: COOKIE_WITH_SPACE };
      const r1 = await executor.execute({
        model: "fable-5",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: creds,
        signal: null,
      } as never);
      assert.equal(r1.response.status, 200);
      assert.equal(captured[0]!.createThread, true);

      // Brand-new Claude Code session, same opener text only
      const r2 = await executor.execute({
        model: "fable-5",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: creds,
        signal: null,
      } as never);
      assert.equal(r2.response.status, 200);
      assert.equal(captured[1]!.createThread, true);
      assert.notEqual(captured[0]!.threadId, captured[1]!.threadId);
    } finally {
      restoreTls();
      __resetNotionThreadSessionsForTests();
    }
  });

  it("hash is stable for the same conversation prefix", () => {
    const a = hashNotionConversation("s", [
      { role: "user", content: "x" },
      { role: "assistant", content: "y" },
    ]);
    const b = hashNotionConversation("s", [
      { role: "user", content: "x" },
      { role: "assistant", content: "y" },
    ]);
    assert.equal(a, b);
    assert.notEqual(
      a,
      hashNotionConversation("s", [
        { role: "user", content: "x" },
        { role: "assistant", content: "z" },
      ])
    );
  });

  it("execute: first request createThread=true; second multi-turn reuses threadId + createThread=false", async () => {
    __resetNotionThreadSessionsForTests();
    const executor = new mod.NotionWebExecutor();
    const captured: Array<{ createThread?: boolean; threadId?: string }> = [];
    const restoreTls = installNotionTlsMock(async (_url, opts) => {
      captured.push(JSON.parse(String(opts.body)));
      return { status: 200, text: okNdjson("ok") };
    });
    try {
      const r1 = await executor.execute({
        model: "fable-5",
        body: { messages: [{ role: "user", content: "hello continuity" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);
      assert.equal(r1.response.status, 200);
      assert.equal(captured[0]!.createThread, true);
      const t1 = captured[0]!.threadId;
      assert.ok(t1 && t1.length > 10);

      const json1 = (await r1.response.json()) as { notion_thread_id?: string; id?: string };
      assert.equal(json1.notion_thread_id, t1);

      const r2 = await executor.execute({
        model: "fable-5",
        body: {
          messages: [
            { role: "user", content: "hello continuity" },
            { role: "assistant", content: "ok" },
            { role: "user", content: "second turn" },
          ],
        },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);
      assert.equal(r2.response.status, 200);
      assert.equal(captured[1]!.createThread, false);
      assert.equal(captured[1]!.threadId, t1);
    } finally {
      restoreTls();
      __resetNotionThreadSessionsForTests();
    }
  });

  it("execute: honors X-Notion-Thread-Id via ExecuteInput.clientHeaders (not input.headers)", async () => {
    __resetNotionThreadSessionsForTests();
    const executor = new mod.NotionWebExecutor();
    const pinned = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    let capturedCreateThread: boolean | undefined;
    let capturedThreadId: string | undefined;
    const restoreTls = installNotionTlsMock(async (_url, opts) => {
      const body = JSON.parse(String(opts.body)) as {
        createThread?: boolean;
        threadId?: string;
      };
      capturedCreateThread = body.createThread;
      capturedThreadId = body.threadId;
      return { status: 200, text: okNdjson("ok") };
    });
    try {
      // Real ExecuteInput shape: clientHeaders only (headers is undefined).
      const result = await executor.execute({
        model: "fable-5",
        body: { messages: [{ role: "user", content: "resume thread" }] },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
        clientHeaders: { "X-Notion-Thread-Id": pinned },
      } as never);

      assert.equal(result.response.status, 200);
      assert.equal(capturedThreadId, pinned);
      // Client-supplied thread id must force follow-up mode (createThread=false).
      assert.equal(capturedCreateThread, false);
    } finally {
      restoreTls();
      __resetNotionThreadSessionsForTests();
    }
  });

  it("execute: folds response_format into Notion transcript instructions for JSON callers", async () => {
    __resetNotionThreadSessionsForTests();
    const executor = new mod.NotionWebExecutor();
    let capturedContext: Record<string, unknown> | undefined;
    const restore = installNotionTlsMock(async (_url, opts) => {
      const body = JSON.parse(String(opts.body)) as {
        transcript?: Array<{ type?: string; value?: Record<string, unknown> }>;
      };
      capturedContext = body.transcript?.find((step) => step.type === "context")?.value;
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
                      value: [{ type: "text", content: "{\"reply\":\"ok\"}" }],
                    },
                  },
                },
              },
            },
          },
        }),
      ].join("\n");
      return { status: 200, text: ndjson };
    });
    try {
      const result = await executor.execute({
        model: "fable-5",
        body: {
          messages: [{ role: "user", content: "Return a reply object" }],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "xpuffer_reply",
              schema: {
                type: "object",
                properties: { reply: { type: "string" } },
                required: ["reply"],
              },
            },
          },
        },
        stream: false,
        credentials: { apiKey: COOKIE_WITH_SPACE },
        signal: null,
      } as never);

      assert.equal(result.response.status, 200);
      assert.match(String(capturedContext?.instructions || ""), /Return only valid JSON/);
      assert.match(String(capturedContext?.instructions || ""), /xpuffer_reply/);
    } finally {
      restore();
      __resetNotionThreadSessionsForTests();
    }
  });
});
