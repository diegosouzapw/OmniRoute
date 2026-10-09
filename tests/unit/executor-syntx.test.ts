import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/syntx.ts");
const sessions = await import("../../open-sse/services/syntxSessions.ts");
const usageLeaf = await import("../../open-sse/services/usage/syntx.ts");
const usageMain = await import("../../open-sse/services/usage.ts");

function fakeJwt(payload: Record<string, unknown> = {}): string {
  return (
    "eyJhbGciOiJub25lIn0." +
    Buffer.from(
      JSON.stringify({ sub: "1", exp: Math.floor(Date.now() / 1000) + 3600, ...payload })
    ).toString("base64url") +
    ".x"
  );
}

function sseFrame(obj: unknown): string {
  return `data: ${typeof obj === "string" ? obj : JSON.stringify(obj)}\n\n`;
}

describe("SyntxExecutor", () => {
  it("returns 401 when no JWT is configured", async () => {
    const executor = new mod.SyntxExecutor();
    const result = await executor.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });
    assert.equal(result.response.status, 401);
  });

  it("creates a chat, generates, and maps SSE to an OpenAI completion", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const calls: Array<{ url: string; method?: string; body: unknown }> = [];
    const jwt = fakeJwt();
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      let parsedBody: unknown = null;
      if (typeof init?.body === "string") {
        try {
          parsedBody = JSON.parse(init.body);
        } catch {
          parsedBody = init.body;
        }
      }
      calls.push({ url, method: init?.method, body: parsedBody });
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "chat-uuid-1" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        return new Response(
          JSON.stringify({
            job_id: "job-1",
            stream_url: "https://sse.syntx.ai/stream/job-1?token=abc",
            chat_uuid: "chat-uuid-1",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        const sse =
          sseFrame({ type: "content", content: "PONG" }) +
          sseFrame({ type: "usage_final", tokens_input: 76, tokens_output: 248 }) +
          sseFrame("[DONE]");
        return new Response(sse, { status: 200 });
      }
      if (url.includes("/api/v1/llm/models")) {
        return new Response(JSON.stringify({ models: [] }), { status: 200 });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const result = await executor.execute({
        model: "syntx/gpt-5-nano-2025-08-07",
        body: { messages: [{ role: "user", content: "Reply with PONG only." }] },
        stream: false,
        credentials: { apiKey: jwt, connectionId: "conn-test" },
        signal: null,
      });
      const json = await result.response.json();
      assert.equal(result.response.status, 200);
      assert.equal(json.choices[0].message.content, "PONG");
      assert.equal(json.usage.total_tokens, 324);
      assert.equal(calls[0].url, "https://api.syntx.ai/api/v1/chats");
      assert.match(calls[1].url, /ai_name=chatgpt/);
      const posted = calls[1].body as { tools?: unknown; model?: string; chat_uuid?: string };
      assert.deepEqual(posted.tools, ["search", "code", "shell"]);
      assert.equal(posted.model, "gpt-5-nano-2025-08-07");
      assert.equal(posted.chat_uuid, "chat-uuid-1");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("omits native SYNTX tools on isolated compact generate", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    let postedTools: unknown = null;
    const jwt = fakeJwt();
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "compact-uuid" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        postedTools = (JSON.parse(String(init?.body || "{}")) as { tools?: unknown }).tools;
        return new Response(
          JSON.stringify({
            job_id: "job-c",
            stream_url: "https://sse.syntx.ai/stream/job-c?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(sseFrame({ type: "content", content: "ok" }) + sseFrame("[DONE]"), {
          status: 200,
        });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      assert.equal(executor.getTimeoutMs(), 600_000);
      await executor.execute({
        model: "claude-sonnet-5",
        body: {
          syntx_isolated: true,
          syntx_force_new_chat: true,
          messages: [{ role: "user", content: "summarize this chat" }],
        },
        stream: false,
        credentials: { apiKey: jwt },
        signal: null,
      });
      assert.deepEqual(postedTools, []);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("reuses the previous chat_uuid on the second turn", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const chatPosts: number[] = [];
    const jwt = fakeJwt();
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        chatPosts.push(1);
        return new Response(JSON.stringify({ uuid: "sticky-uuid" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        return new Response(
          JSON.stringify({
            job_id: "job-2",
            stream_url: "https://sse.syntx.ai/stream/job-2?token=abc",
            chat_uuid: "sticky-uuid",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(sseFrame({ type: "content", content: "ok" }) + sseFrame("[DONE]"), {
          status: 200,
        });
      }
      if (url.includes("/api/v1/llm/models")) {
        return new Response(JSON.stringify({ models: [] }), { status: 200 });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const creds = { apiKey: jwt, connectionId: "sticky" };
      await executor.execute({
        model: "gpt-5-nano-2025-08-07",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: creds,
        signal: null,
      });
      await executor.execute({
        model: "gpt-5-nano-2025-08-07",
        body: {
          messages: [
            { role: "user", content: "hi" },
            { role: "assistant", content: "ok" },
            { role: "user", content: "again" },
          ],
        },
        stream: false,
        credentials: creds,
        signal: null,
      });
      assert.equal(chatPosts.length, 1);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("opens a new SYNTX chat when Claude Code sends /clear even after a sticky session", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const chatPosts: number[] = [];
    const generateBodies: Array<{ text?: string; deep_research?: boolean; tools?: unknown }> = [];
    const jwt = fakeJwt();
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        chatPosts.push(1);
        return new Response(JSON.stringify({ uuid: `uuid-${chatPosts.length}` }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        generateBodies.push(JSON.parse(String(init?.body || "{}")));
        return new Response(
          JSON.stringify({
            job_id: "job-n",
            stream_url: "https://sse.syntx.ai/stream/job-n?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(sseFrame({ type: "content", content: "hello" }) + sseFrame("[DONE]"), {
          status: 200,
        });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const creds = { apiKey: jwt, connectionId: "clear-conn" };
      await executor.execute({
        model: "claude-sonnet-5",
        body: {
          messages: [
            { role: "system", content: "You are Claude Code." },
            { role: "user", content: "work on the repo" },
          ],
        },
        stream: false,
        credentials: creds,
        signal: null,
      });
      await executor.execute({
        model: "claude-sonnet-5",
        body: {
          thinking: true,
          deep_research: true,
          messages: [
            { role: "system", content: "You are Claude Code." },
            { role: "user", content: "work on the repo" },
            { role: "assistant", content: "sure" },
            {
              role: "user",
              content:
                "<command-name>/clear</command-name>\n<command-message>clear</command-message>\n\nhi",
            },
          ],
        },
        stream: false,
        credentials: creds,
        signal: null,
      });
      assert.equal(chatPosts.length, 2);
      assert.equal(generateBodies[1].deep_research, false);
      assert.deepEqual(generateBodies[1].tools, ["search", "code", "shell"]);
      assert.equal(generateBodies[1].thinking, true);
      assert.match(String(generateBodies[1].text || ""), /\bhi\b/);
      assert.doesNotMatch(String(generateBodies[1].text || ""), /command-name/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("does not resend the tool catalog on the second generate of a reused chat", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const jwt = fakeJwt();
    const generateTexts: string[] = [];
    const glob = {
      type: "function",
      function: {
        name: "Glob",
        parameters: { type: "object", properties: { pattern: { type: "string" } } },
      },
    };
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "tools-uuid" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        const parsed = JSON.parse(String(init?.body || "{}")) as { text?: string };
        generateTexts.push(parsed.text || "");
        return new Response(
          JSON.stringify({
            job_id: "job-t",
            stream_url: "https://sse.syntx.ai/stream/job-t?token=abc",
            chat_uuid: "tools-uuid",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(
          sseFrame({
            type: "content",
            content: '<tool_call>\n{"name":"Glob","arguments":{"pattern":"*"}}\n</tool_call>',
          }) + sseFrame("[DONE]"),
          { status: 200 }
        );
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const creds = { apiKey: jwt, connectionId: "tools-once" };
      await executor.execute({
        model: "gpt-5-nano-2025-08-07",
        body: { messages: [{ role: "user", content: "list files" }], tools: [glob] },
        stream: false,
        credentials: creds,
        signal: null,
      });
      await executor.execute({
        model: "gpt-5-nano-2025-08-07",
        body: {
          messages: [
            { role: "user", content: "list files" },
            {
              role: "assistant",
              content: null,
              tool_calls: [
                { type: "function", function: { name: "Glob", arguments: '{"pattern":"*"}' } },
              ],
            },
            { role: "tool", name: "Glob", content: "a.txt" },
          ],
          tools: [glob],
        },
        stream: false,
        credentials: creds,
        signal: null,
      });
      assert.equal(generateTexts.length, 2);
      assert.match(generateTexts[0], /# Tool Calling/);
      assert.match(generateTexts[0], /list files/);
      assert.doesNotMatch(generateTexts[1], /# Tool Calling/);
      assert.doesNotMatch(generateTexts[1], /list files/);
      assert.match(generateTexts[1], /<tool_result name="Glob">/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("uploads images and attaches r2 URLs on generate", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const jwt = fakeJwt();
    let generateBody: Record<string, unknown> | null = null;
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "img-chat" }), { status: 200 });
      }
      if (url.endsWith("/api/v1/chats/upload-files")) {
        const raw =
          typeof init?.body === "string"
            ? init.body
            : Buffer.isBuffer(init?.body)
              ? init.body.toString("latin1")
              : String(init?.body || "");
        assert.match(
          String(init?.headers && (init.headers as Record<string, string>)["content-type"]),
          /multipart\/form-data; boundary=/
        );
        assert.match(raw, /name="files"; filename="/);
        return new Response(
          JSON.stringify({
            files: [{ url: "https://r2.syntx.ai/user/uploaded/x.png", status: "success" }],
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/v1/llm/generate")) {
        generateBody = JSON.parse(String(init?.body || "{}")) as Record<string, unknown>;
        return new Response(
          JSON.stringify({
            job_id: "job-img",
            stream_url: "https://sse.syntx.ai/stream/job-img?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(sseFrame({ type: "content", content: "cat" }) + sseFrame("[DONE]"), {
          status: 200,
        });
      }
      if (url.includes("/api/v1/llm/models")) {
        return new Response(JSON.stringify({ models: [] }), { status: 200 });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const png =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
      const executor = new mod.SyntxExecutor();
      const result = await executor.execute({
        model: "gpt-5-nano-2025-08-07",
        body: {
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "what is on image" },
                { type: "image_url", image_url: { url: png } },
              ],
            },
          ],
        },
        stream: false,
        credentials: { apiKey: jwt },
        signal: null,
      });
      assert.equal(result.response.status, 200);
      const files = generateBody?.files as Array<{ object_type: string; object_url: string }>;
      assert.equal(files[0].object_type, "image");
      assert.equal(files[0].object_url, "https://r2.syntx.ai/user/uploaded/x.png");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("builds Hours/Weekly quotas from live percent_left including 0% and started_at reset", () => {
    const started = "2026-09-19T02:23:47.293352Z";
    const result = usageLeaf.buildSyntxUsageResult(
      { tokens: "5.500", type: null, active: false },
      {
        plan: "free",
        window_6h: { percent_left: 0.0, started_at: started, expires_at: null },
        window_7d: { percent_left: "0.0", started_at: started, expires_at: null },
      }
    );
    assert.equal(result.plan, "SYNTX Free");
    assert.equal(result.quotas.credits.remaining, 5.5);
    assert.equal(result.quotas.hours.remainingPercentage, 0);
    assert.equal(result.quotas.hours.used, 100);
    assert.equal(result.quotas.hours.displayName, "Hours (6h)");
    assert.equal(result.quotas.weekly.remainingPercentage, 0);
    assert.equal(result.quotas.weekly.displayName, "Weekly (7d)");
    assert.equal(
      result.quotas.hours.resetAt,
      new Date(Date.parse(started) + 6 * 3600_000).toISOString()
    );
    assert.equal(
      result.quotas.weekly.resetAt,
      new Date(Date.parse(started) + 7 * 24 * 3600_000).toISOString()
    );
  });

  it("keeps an explicit expires_at reset on weekly", () => {
    const result = usageLeaf.buildSyntxUsageResult(
      { tokens: "5.500", type: null, active: false },
      {
        plan: "free",
        window_6h: { percent_left: 100, expires_at: null },
        window_7d: { percent_left: 80, expires_at: "2026-09-26T00:00:00Z" },
      }
    );
    assert.equal(result.quotas.hours.remainingPercentage, 100);
    assert.equal(result.quotas.weekly.remainingPercentage, 80);
    assert.equal(result.quotas.weekly.resetAt, "2026-09-26T00:00:00.000Z");
  });

  it("sanitizes a thrown usage fetch error (no token or stack in the message)", async () => {
    const jwt = fakeJwt();
    const original = globalThis.fetch;
    globalThis.fetch = (async () => {
      throw new Error(
        `connect failed Authorization: Bearer ${jwt}\n    at fetch (/srv/app/node_modules/undici/index.js:10:5)`
      );
    }) as typeof fetch;
    try {
      const result = (await usageLeaf.getSyntxUsage(jwt)) as { message?: string };
      assert.match(String(result.message), /^SYNTX usage failed: /);
      assert.ok(!String(result.message).includes(jwt), "usage error must not echo the JWT");
      assert.ok(!String(result.message).includes("at /"), "usage error must not leak a stack");
    } finally {
      globalThis.fetch = original;
    }
  });

  it("registers syntx in USAGE_FETCHER_PROVIDERS", () => {
    assert.ok(
      (usageMain.USAGE_FETCHER_PROVIDERS as readonly string[]).includes("syntx"),
      "USAGE_FETCHER_PROVIDERS must list syntx"
    );
    assert.ok((usageMain.USAGE_FETCHER_PROVIDERS as readonly string[]).includes("stx"));
  });

  it("registers syntx for Limits provider-limits sync (apikey JWT)", async () => {
    const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const { isSupportedUsageConnection } = await import("../../src/lib/usage/providerLimits.ts");
    assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("syntx"));
    assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("stx"));
    assert.equal(
      isSupportedUsageConnection({ id: "c1", provider: "syntx", authType: "apikey" }),
      true
    );
    assert.equal(
      isSupportedUsageConnection({ id: "c2", provider: "stx", authType: "api_key" }),
      true
    );
  });

  it("rolls a SYNTX chat at 700 generates with striped continue-from handoff", async () => {
    sessions.__resetSyntxSessionsForTests();
    assert.equal(sessions.SYNTX_CHAT_ROLLOVER_TURNS, 700);
    assert.equal(sessions.SYNTX_CHAT_MESSAGE_LIMIT, 800);
    assert.equal(sessions.shouldRolloverSyntxChat("missing"), false);
    sessions.__setSyntxChatGenerateCountForTests("old-uuid", 699);
    assert.equal(sessions.shouldRolloverSyntxChat("old-uuid"), false);
    sessions.__setSyntxChatGenerateCountForTests("old-uuid", 700);
    assert.equal(sessions.shouldRolloverSyntxChat("old-uuid"), true);

    const glob = {
      type: "function",
      function: {
        name: "Glob",
        parameters: { type: "object", properties: { pattern: { type: "string" } } },
      },
    };
    const messages = [
      {
        role: "system",
        content: "Here is the catalog of commands my local tool supports:\n- Glob",
      },
      { role: "user", content: "start the work" },
      { role: "assistant", content: "calling glob" },
      { role: "tool", name: "Glob", content: "x".repeat(8000) },
      { role: "user", content: "continue the work" },
    ];
    const handoff = mod.buildSyntxGenerateText({
      messages,
      tools: [glob],
      reuseChat: false,
      threadRollover: true,
      emulateTools: true,
    });
    assert.equal(handoff.injectedCatalog, true);
    assert.match(handoff.text, /# Tool Calling/);
    assert.match(handoff.text, /Continue from the previous SYNTX thread/);
    assert.match(handoff.text, /--- start of thread ---/);
    assert.match(handoff.text, /--- end of thread ---/);
    assert.match(handoff.text, /Latest user message:/);
    assert.match(handoff.text, /continue the work/);
    assert.match(handoff.text, /logical strip/);
    assert.doesNotMatch(handoff.text, /<system>/);

    const originalFetch = globalThis.fetch;
    const calls: Array<{ url: string; method?: string; body: unknown }> = [];
    const jwt = fakeJwt();
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      let parsedBody: unknown = null;
      if (typeof init?.body === "string") {
        try {
          parsedBody = JSON.parse(init.body);
        } catch {
          parsedBody = init.body;
        }
      }
      calls.push({ url, method: init?.method, body: parsedBody });
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "new-uuid" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        return new Response(
          JSON.stringify({
            job_id: "job-roll",
            stream_url: "https://sse.syntx.ai/stream/job-roll?token=abc",
            chat_uuid: "new-uuid",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        const sse =
          sseFrame({ type: "content", content: "ok" }) +
          sseFrame({ type: "usage_final", tokens_input: 10, tokens_output: 2 }) +
          sseFrame("[DONE]");
        return new Response(sse, { status: 200 });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      sessions.rememberSyntxFollowUp(
        "conn-roll",
        "gpt-5-nano-2025-08-07",
        [{ role: "user", content: "start the work" }],
        "calling glob",
        "old-uuid"
      );
      sessions.__setSyntxChatGenerateCountForTests("old-uuid", 700);
      const executor = new mod.SyntxExecutor();
      const result = await executor.execute({
        model: "syntx/gpt-5-nano-2025-08-07",
        body: {
          messages: [
            { role: "user", content: "start the work" },
            { role: "assistant", content: "calling glob" },
            { role: "user", content: "continue the work" },
          ],
          tools: [glob],
        },
        stream: false,
        credentials: { apiKey: jwt, connectionId: "conn-roll" },
        signal: null,
      });
      assert.equal(result.response.status, 200);
      assert.ok(calls.some((c) => c.url.endsWith("/api/v1/chats") && c.method === "POST"));
      const generateCall = calls.find((c) => c.url.includes("/api/v1/llm/generate"));
      assert.ok(generateCall);
      const posted = generateCall!.body as { chat_uuid?: string; text?: string; tools?: unknown };
      assert.equal(posted.chat_uuid, "new-uuid");
      assert.match(String(posted.text), /Continue from the previous SYNTX thread/);
      assert.match(String(posted.text), /continue the work/);
      assert.deepEqual(posted.tools, ["search", "code", "shell"]);
      assert.equal(sessions.getSyntxChatGenerateCount("new-uuid"), 1);
      assert.equal(sessions.getSyntxChatGenerateCount("old-uuid"), 700);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("reuses one SYNTX chat when the same first-turn OpenCode request is retried before persist", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const chatPosts: string[] = [];
    const generateTexts: string[] = [];
    const jwt = fakeJwt();
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        chatPosts.push("create");
        return new Response(JSON.stringify({ uuid: "retry-uuid" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        const posted = JSON.parse(String(init?.body || "{}")) as { text?: string };
        generateTexts.push(posted.text || "");
        if (generateTexts.length === 1) throw new Error("aborted");
        return new Response(
          JSON.stringify({
            job_id: "job-r",
            stream_url: "https://sse.syntx.ai/stream/job-r?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(sseFrame({ type: "content", content: "ok" }) + sseFrame("[DONE]"), {
          status: 200,
        });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const creds = { apiKey: jwt, connectionId: "opencode-retry" };
      const body = {
        messages: [
          {
            role: "system",
            content:
              "You are opencode, an interactive CLI tool that helps users with software engineering tasks.",
          },
          { role: "user", content: "fix the bug" },
        ],
      };
      const first = await executor.execute({
        model: "claude-sonnet-5",
        body,
        stream: false,
        credentials: creds,
        signal: null,
      });
      assert.equal(first.response.status, 502);
      const second = await executor.execute({
        model: "claude-sonnet-5",
        body,
        stream: false,
        credentials: creds,
        signal: null,
      });
      assert.equal(second.response.status, 200);
      assert.equal(chatPosts.length, 1);
      assert.equal(generateTexts.length, 2);
      assert.match(generateTexts[0], /<system>/);
      assert.match(generateTexts[0], /You are opencode/);
      assert.match(generateTexts[1], /<system>/);
      assert.match(generateTexts[1], /fix the bug/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("uploads tmp.txt for isolated compact and keeps the short analyze prompt", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const jwt = fakeJwt();
    let uploaded = false;
    let generateBody: {
      text?: string;
      files?: Array<{ object_url?: string; object_type?: string }>;
      tools?: unknown;
    } = {};
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "compact-file-uuid" }), { status: 200 });
      }
      if (url.includes("/api/v1/chats/upload-files")) {
        uploaded = true;
        const raw = Buffer.isBuffer(init?.body)
          ? init.body.toString("utf8")
          : String(init?.body || "");
        assert.match(raw, /filename="tmp.txt"/);
        return new Response(
          JSON.stringify({ files: [{ url: "https://r2.syntx.ai/tmp.txt", object_type: "file" }] }),
          { status: 200 }
        );
      }
      if (url.includes("/api/v1/llm/generate")) {
        generateBody = JSON.parse(String(init?.body || "{}"));
        return new Response(
          JSON.stringify({
            job_id: "job-f",
            stream_url: "https://sse.syntx.ai/stream/job-f?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(
          sseFrame({ type: "content", content: "handoff" }) + sseFrame("[DONE]"),
          {
            status: 200,
          }
        );
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const history = "User: do the thing\n\nAssistant: working\n\n" + "x".repeat(4000);
      const result = await executor.execute({
        model: "claude-sonnet-5",
        body: {
          syntx_isolated: true,
          syntx_force_new_chat: true,
          syntx_history_file: history,
          syntx_history_filename: "tmp.txt",
          messages: [{ role: "user", content: "summarize this chat" }],
        },
        stream: false,
        credentials: { apiKey: jwt },
        signal: null,
      });
      assert.equal(result.response.status, 200);
      assert.equal(uploaded, true);
      assert.equal(generateBody.files?.[0]?.object_url, "https://r2.syntx.ai/tmp.txt");
      assert.match(String(generateBody.text), /attached tmp.txt/);
      assert.doesNotMatch(String(generateBody.text), /xxxx/);
      assert.deepEqual(generateBody.tools, []);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns 422 when compact history file upload fails", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const jwt = fakeJwt();
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "compact-fail-uuid" }), { status: 200 });
      }
      if (url.includes("/api/v1/chats/upload-files")) {
        return new Response("nope", { status: 500 });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const result = await executor.execute({
        model: "claude-sonnet-5",
        body: {
          syntx_isolated: true,
          syntx_force_new_chat: true,
          syntx_history_file: "User: all of the history\n",
          syntx_history_filename: "tmp.txt",
          messages: [{ role: "user", content: "summarize" }],
        },
        stream: false,
        credentials: { apiKey: jwt },
        signal: null,
      });
      assert.equal(result.response.status, 422);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("reuses the original uuid for syntx_continue_chat compact (no new thread, tools:[])", async () => {
    sessions.__resetSyntxSessionsForTests();
    sessions.rememberSyntxFollowUp(
      "fp-continue",
      "claude-sonnet-5",
      [
        { role: "system", content: "catalog" },
        { role: "user", content: "fix the bug" },
      ],
      "working",
      "uuid-original"
    );
    sessions.noteSyntxGenerate("uuid-original");
    sessions.markSyntxGeneratePosted("uuid-original");

    const originalFetch = globalThis.fetch;
    const jwt = fakeJwt();
    const chatPosts: string[] = [];
    let generateBody: { chat_uuid?: string; text?: string; tools?: unknown; files?: unknown[] } =
      {};
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        chatPosts.push("create");
        return new Response(JSON.stringify({ uuid: "uuid-should-not" }), { status: 200 });
      }
      if (url.includes("/api/v1/chats/upload-files")) {
        return new Response(
          JSON.stringify({ files: [{ url: "https://r2.syntx.ai/tmp.txt", object_type: "file" }] }),
          { status: 200 }
        );
      }
      if (url.includes("/api/v1/llm/generate")) {
        generateBody = JSON.parse(String(init?.body || "{}"));
        return new Response(
          JSON.stringify({
            job_id: "job-c",
            stream_url: "https://sse.syntx.ai/stream/job-c?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(
          sseFrame({ type: "content", content: "handoff" }) + sseFrame("[DONE]"),
          {
            status: 200,
          }
        );
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const result = await executor.execute({
        model: "claude-sonnet-5",
        body: {
          syntx_continue_chat: true,
          syntx_continue_first_user: "fix the bug",
          tools: [],
          syntx_history_file: "User: fix the bug\nAssistant: working\n",
          syntx_history_filename: "tmp.txt",
          messages: [{ role: "user", content: "Analyze the attached tmp.txt" }],
        },
        stream: false,
        credentials: { apiKey: jwt, connectionId: "fp-continue" },
        signal: null,
      });
      assert.equal(result.response.status, 200);
      assert.equal(chatPosts.length, 0);
      assert.equal(generateBody.chat_uuid, "uuid-original");
      assert.deepEqual(generateBody.tools, []);
      assert.match(String(generateBody.text || ""), /same chat/i);
      assert.equal(
        sessions.lookupSyntxContinueChatUuid("fp-continue", "claude-sonnet-5", "fix the bug"),
        "uuid-original"
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("PUTs account system prompt only when creating a new SYNTX thread", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const jwt = fakeJwt();
    const puts: unknown[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/user/settings") && init?.method === "PUT") {
        puts.push(JSON.parse(String(init?.body || "{}")));
        return new Response("{}", { status: 200 });
      }
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "uuid-new-settings" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        return new Response(
          JSON.stringify({
            job_id: "job-s",
            stream_url: "https://sse.syntx.ai/stream/job-s?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(sseFrame({ type: "content", content: "ok" }) + sseFrame("[DONE]"), {
          status: 200,
        });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const result = await executor.execute({
        model: "claude-sonnet-5",
        body: {
          syntx_account_system_prompt: "Just output command JSON for my local agent.",
          messages: [{ role: "user", content: "hello" }],
        },
        stream: false,
        credentials: { apiKey: jwt, connectionId: "fp-settings" },
        signal: null,
      });
      assert.equal(result.response.status, 200);
      assert.equal(puts.length, 1);
      const payload = puts[0] as { user?: { text?: { system_prompt?: { default?: string } } } };
      assert.equal(
        payload.user?.text?.system_prompt?.default,
        "Just output command JSON for my local agent."
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("clamps account system prompt to 4000 characters on PUT", async () => {
    sessions.__resetSyntxSessionsForTests();
    const originalFetch = globalThis.fetch;
    const jwt = fakeJwt();
    const puts: unknown[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/v1/user/settings") && init?.method === "PUT") {
        puts.push(JSON.parse(String(init?.body || "{}")));
        return new Response("{}", { status: 200 });
      }
      if (url.endsWith("/api/v1/chats") && init?.method === "POST") {
        return new Response(JSON.stringify({ uuid: "uuid-new-settings-cap" }), { status: 200 });
      }
      if (url.includes("/api/v1/llm/generate")) {
        return new Response(
          JSON.stringify({
            job_id: "job-cap",
            stream_url: "https://sse.syntx.ai/stream/job-cap?token=abc",
          }),
          { status: 200 }
        );
      }
      if (url.startsWith("https://sse.syntx.ai/stream/")) {
        return new Response(sseFrame({ type: "content", content: "ok" }) + sseFrame("[DONE]"), {
          status: 200,
        });
      }
      return new Response("unexpected", { status: 500 });
    }) as typeof fetch;

    try {
      const executor = new mod.SyntxExecutor();
      const longPrompt = `${"A".repeat(2500)}\n${"B".repeat(2500)}`;
      const result = await executor.execute({
        model: "claude-sonnet-5",
        body: {
          syntx_account_system_prompt: longPrompt,
          messages: [{ role: "user", content: "hello" }],
        },
        stream: false,
        credentials: { apiKey: jwt, connectionId: "fp-settings-cap" },
        signal: null,
      });
      assert.equal(result.response.status, 200);
      assert.equal(puts.length, 1);
      const payload = puts[0] as { user?: { text?: { system_prompt?: { default?: string } } } };
      const sent = payload.user?.text?.system_prompt?.default ?? "";
      assert.ok(sent.length <= mod.SYNTX_ACCOUNT_SYSTEM_PROMPT_MAX_CHARS);
      assert.ok(sent.startsWith("A"));
      assert.equal(sent.includes("B"), false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
