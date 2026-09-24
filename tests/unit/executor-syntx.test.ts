import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mod = await import("../../open-sse/executors/syntx.ts");
const auth = await import("../../open-sse/services/syntxAuth.ts");
const models = await import("../../open-sse/services/syntxModels.ts");
const sessions = await import("../../open-sse/services/syntxSessions.ts");
const usageLeaf = await import("../../open-sse/services/usage/syntx.ts");
const usageMain = await import("../../open-sse/services/usage.ts");

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");

function fakeJwt(payload: Record<string, unknown> = {}): string {
  return (
    "eyJhbGciOiJub25lIn0." +
    Buffer.from(JSON.stringify({ sub: "1", exp: Math.floor(Date.now() / 1000) + 3600, ...payload })).toString(
      "base64url"
    ) +
    ".x"
  );
}

function sseFrame(obj: unknown): string {
  return `data: ${typeof obj === "string" ? obj : JSON.stringify(obj)}\n\n`;
}

describe("SyntxExecutor", () => {
  it("strips syntx/ prefixes and maps auto to the free-safe default", () => {
    assert.equal(mod.mapSyntxModel("syntx/gpt-5.4"), "gpt-5.4");
    assert.equal(mod.mapSyntxModel("stx/gpt-5.4"), "gpt-5.4");
    assert.equal(mod.mapSyntxModel("auto"), mod.SYNTX_DEFAULT_MODEL);
    assert.equal(mod.mapSyntxModel("syntx/auto"), mod.SYNTX_DEFAULT_MODEL);
  });

  it("extracts a JWT from Bearer and JSON wrappers", () => {
    const jwt = fakeJwt();
    assert.equal(auth.extractSyntxTokenFromUnknown(`Bearer ${jwt}`), jwt);
    assert.equal(auth.extractSyntxTokenFromUnknown({ accessToken: jwt }), jwt);
    assert.equal(auth.looksLikeJwt(jwt), true);
    assert.equal(auth.looksLikeJwt("cookie=abc"), false);
  });

  it("infers ai_name from model id", () => {
    assert.equal(models.inferSyntxAiName("claude-sonnet-5"), "claude");
    assert.equal(models.inferSyntxAiName("gpt-5-nano-2025-08-07"), "chatgpt");
    assert.equal(models.inferSyntxAiName("gemini-3.8-flash"), "gemini");
    assert.equal(models.inferSyntxAiName("glm-5.2"), "zai");
    assert.equal(models.inferSyntxAiName("sonar"), "perplexity");
  });

  it("parses live models catalog rows", () => {
    const parsed = models.parseSyntxModelsCatalog({
      models: [
        {
          id: "gpt-5-nano-2025-08-07",
          label: "GPT-5 Nano",
          ai_name: "chatgpt",
          capabilities: { images: true, thinking: true },
          context_window: 356000,
        },
      ],
    });
    assert.equal(parsed[0].id, "gpt-5-nano-2025-08-07");
    assert.equal(parsed[0].aiName, "chatgpt");
    assert.equal(parsed[0].vision, true);
  });

  it("builds generate body with native search/code/shell tools and optional files", () => {
    const body = mod.buildSyntxGenerateBody({
      chatUuid: "chat-1",
      text: "hello",
      model: "gpt-5-nano-2025-08-07",
      thinking: false,
      files: [{ object_type: "image", object_url: "https://r2.syntx.ai/x.png" }],
    });
    assert.equal(body.chat_uuid, "chat-1");
    assert.equal(body.thinking, false);
    assert.deepEqual(body.tools, ["search", "code", "shell"]);
    assert.equal((body.files as Array<{ object_url: string }>)[0].object_url, "https://r2.syntx.ai/x.png");
  });

  it("extracts content + usage_final from SYNTX SSE", () => {
    const first = mod.extractSyntxSseEvent(sseFrame({ type: "content", content: "PO" }));
    const second = mod.extractSyntxSseEvent(sseFrame({ type: "content", content: "NG" }));
    const usage = mod.extractSyntxSseEvent(
      sseFrame({ type: "usage_final", tokens_input: 76, tokens_output: 248 })
    );
    assert.equal(first.delta, "PO");
    assert.equal(second.delta, "NG");
    assert.deepEqual(usage.usage, { prompt_tokens: 76, completion_tokens: 248, total_tokens: 324 });
    assert.equal(mod.extractSyntxSseEvent("data: [DONE]\n\n").delta, undefined);
  });

  it("accepts only sse.syntx.ai stream URLs", () => {
    assert.equal(
      mod.isSyntxStreamUrl("https://sse.syntx.ai/stream/abc?token=x"),
      true
    );
    assert.equal(mod.isSyntxStreamUrl("https://evil.example/stream/abc"), false);
    assert.equal(mod.isSyntxStreamUrl("http://sse.syntx.ai/stream/abc"), false);
  });

  it("reuses chat_uuid across OpenAI multi-turn prefix hashes", () => {
    sessions.__resetSyntxSessionsForTests();
    const turn1 = [
      { role: "system", content: "Be brief." },
      { role: "user", content: "ping" },
    ];
    sessions.rememberSyntxFollowUp("conn-1", "gpt-5-nano-2025-08-07", turn1, "PONG", "uuid-1");
    const turn2 = [
      { role: "system", content: "Be brief." },
      { role: "user", content: "ping" },
      { role: "assistant", content: "PONG" },
      { role: "user", content: "again" },
    ];
    const prefix = sessions.conversationPrefixBeforeLastUser(turn2);
    const key = sessions.hashSyntxConversation("conn-1", "gpt-5-nano-2025-08-07", prefix);
    assert.equal(sessions.lookupSyntxChatUuid(key), "uuid-1");
  });

  it("does not reuse chat_uuid for a fresh Claude Code /new (same first words, no assistant)", () => {
    sessions.__resetSyntxSessionsForTests();
    sessions.rememberSyntxFollowUp(
      "conn-new",
      "claude-sonnet-5",
      [
        { role: "system", content: "You are Claude Code." },
        { role: "user", content: "hi" },
      ],
      "Hello from the old chat",
      "uuid-old"
    );
    const fresh = [
      { role: "system", content: "You are Claude Code." },
      { role: "user", content: "hi" },
    ];
    assert.equal(sessions.lookupSyntxChatUuidForMessages("conn-new", "claude-sonnet-5", fresh), null);
  });

  it("reuses a pending first-turn uuid for OpenCode abort retries (exact + empty assistant)", () => {
    sessions.__resetSyntxSessionsForTests();
    const first = [
      { role: "system", content: "You are opencode, an interactive CLI tool that helps users with software engineering tasks." },
      { role: "user", content: "fix the bug" },
    ];
    sessions.rememberSyntxPendingRequest("oc-1", "claude-sonnet-5", first, "uuid-pending");
    assert.equal(sessions.lookupSyntxChatUuidForMessages("oc-1", "claude-sonnet-5", first), "uuid-pending");
    const withEmptyAssistant = [
      ...first,
      { role: "assistant", content: "" },
    ];
    assert.equal(
      sessions.lookupSyntxChatUuidForMessages("oc-1", "claude-sonnet-5", withEmptyAssistant),
      "uuid-pending"
    );
    sessions.forgetSyntxPendingExact("oc-1", "claude-sonnet-5", first);
    sessions.rememberSyntxFollowUp("oc-1", "claude-sonnet-5", first, "ok", "uuid-pending");
    assert.equal(sessions.lookupSyntxChatUuidForMessages("oc-1", "claude-sonnet-5", first), null);
  });

  it("folds Anthropic system / Responses instructions into the SYNTX flatten", () => {
    const normalized = mod.normalizeSyntxRequestMessages({
      system: "You are opencode, an interactive CLI tool that helps users with software engineering tasks.",
      instructions: "Keep answers short.",
      messages: [{ role: "user", content: "hi" }],
    });
    const flat = mod.flattenSyntxMessages(normalized);
    assert.match(flat, /<system>/);
    assert.match(flat, /You are opencode/);
    assert.match(flat, /Keep answers short/);
    assert.match(flat, /<user>\nhi\n<\/user>/);
  });

  it("does not reuse chat_uuid when Claude Code /clear|/new envelope is the last user turn", () => {
    sessions.__resetSyntxSessionsForTests();
    sessions.rememberSyntxFollowUp(
      "conn-clear",
      "claude-sonnet-5",
      [
        { role: "system", content: "You are Claude Code." },
        { role: "user", content: "work on the repo" },
      ],
      "sure",
      "uuid-old-clear"
    );
    const envelope =
      "<local-command-caveat>Caveat: The messages below were generated by the user while running local commands.</local-command-caveat>\n\n" +
      "<command-name>/clear</command-name>\n" +
      "<command-message>clear</command-message>\n" +
      "<command-args></command-args>\n\n" +
      "<local-command-stdout></local-command-stdout>\n\n" +
      "hi";
    const withHistory = [
      { role: "system", content: "You are Claude Code." },
      { role: "user", content: "work on the repo" },
      { role: "assistant", content: "sure" },
      { role: "user", content: envelope },
    ];
    assert.equal(sessions.looksLikeClaudeCodeSessionReset(envelope), true);
    assert.equal(
      sessions.looksLikeClaudeCodeSessionReset(
        "<command-name>/new</command-name>\n<command-message>new</command-message>\n\nhi"
      ),
      true
    );
    assert.equal(sessions.stripClaudeCodeLocalCommandEnvelope(envelope), "hi");
    assert.equal(
      sessions.lookupSyntxChatUuidForMessages("conn-clear", "claude-sonnet-5", withHistory),
      null
    );
    assert.deepEqual(sessions.syntxMessagesForNewSession(withHistory), [{ role: "user", content: "hi" }]);
  });

  it("honors thinking=true and Anthropic thinking objects; ignores catalog-only thinking", () => {
    assert.equal(mod.wantSyntxThinking({ thinking: true }, "claude-sonnet-5"), true);
    assert.equal(
      mod.wantSyntxThinking({ thinking: { type: "enabled", budget_tokens: 8000 } }, "claude-sonnet-5"),
      true
    );
    assert.equal(mod.wantSyntxThinking({ reasoning_effort: "high" }, "gpt-5-nano-2025-08-07"), true);
    assert.equal(mod.wantSyntxThinking({}, "gpt-5-nano-2025-08-07"), false);
    assert.equal(mod.wantSyntxThinking({}, "claude-opus-5-thinking"), true);
  });

  it("sets deep_research only when explicitly requested; native tools stay on", () => {
    const off = mod.buildSyntxGenerateBody({
      chatUuid: "c1",
      text: "hello",
      model: "claude-sonnet-5",
      thinking: true,
    });
    assert.equal(off.deep_research, false);
    assert.equal(off.thinking, true);
    assert.deepEqual(off.tools, ["search", "code", "shell"]);
    const on = mod.buildSyntxGenerateBody({
      chatUuid: "c2",
      text: "search",
      model: "claude-sonnet-5",
      deepResearch: true,
    });
    assert.equal(on.deep_research, true);
    assert.deepEqual(on.tools, ["search", "code", "shell"]);
  });

  it("omits native tools for isolated compact generate", () => {
    const compact = mod.buildSyntxGenerateBody({
      chatUuid: "c3",
      text: "summarize",
      model: "claude-sonnet-5",
      nativeTools: false,
    });
    assert.deepEqual(compact.tools, []);
  });

  it("logically strips generate text that exceeds the 200k SYNTX input cap", () => {
    const huge = "HEAD".padEnd(150_000, "A") + "TAIL".padStart(80_000, "B");
    const capped = mod.capSyntxGenerateText(huge, 200_000);
    assert.ok(capped.length <= 200_000);
    assert.match(capped, /logical strip/);
    assert.ok(capped.startsWith("HEAD"));
    assert.ok(capped.endsWith("TAIL"));
    assert.equal(mod.capSyntxGenerateText("short"), "short");
  });

  it("sends last user text on reuse and flattens history on a new chat", () => {
    const messages = [
      { role: "system", content: "sys" },
      { role: "user", content: "first" },
      { role: "assistant", content: "ok" },
      { role: "user", content: "second" },
    ];
    assert.equal(mod.buildSyntxGenerateText({ messages, reuseChat: true }).text, "second");
    assert.match(mod.buildSyntxGenerateText({ messages, reuseChat: false }).text, /<user>\nsecond\n<\/user>/);
  });

  it("injects the tool catalog once, then follow-ups are only the new delta", () => {
    const glob = {
      type: "function",
      function: {
        name: "Glob",
        description: "List files",
        parameters: { type: "object", properties: { pattern: { type: "string" } }, required: ["pattern"] },
      },
    };
    const first = [
      { role: "user", content: "list the directory" },
    ];
    const created = mod.buildSyntxGenerateText({
      messages: first,
      tools: [glob],
      reuseChat: false,
      emulateTools: true,
    });
    assert.equal(created.injectedCatalog, true);
    assert.match(created.text, /# Tool Calling/);
    assert.match(created.text, /### Glob/);
    assert.match(created.text, /list the directory/);

    const secondUser = [
      { role: "user", content: "list the directory" },
      { role: "assistant", content: "ok" },
      { role: "user", content: "now the parent folder" },
    ];
    const follow = mod.buildSyntxGenerateText({
      messages: secondUser,
      tools: [glob],
      reuseChat: true,
      toolsAlreadyInjected: true,
      emulateTools: true,
    });
    assert.equal(follow.injectedCatalog, false);
    assert.equal(follow.text, "now the parent folder");
    assert.doesNotMatch(follow.text, /# Tool Calling/);
    assert.doesNotMatch(follow.text, /list the directory/);

    const toolContinue = [
      { role: "user", content: "list the directory" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ type: "function", function: { name: "Glob", arguments: "{\"pattern\":\"*\"}" } }],
      },
      { role: "tool", name: "Glob", content: "a.txt\nb.txt" },
    ];
    const results = mod.buildSyntxGenerateText({
      messages: toolContinue,
      tools: [glob],
      reuseChat: true,
      toolsAlreadyInjected: true,
      emulateTools: true,
    });
    assert.equal(results.injectedCatalog, false);
    assert.match(results.text, /<tool_result name="Glob">/);
    assert.match(results.text, /a\.txt/);
    assert.doesNotMatch(results.text, /# Tool Calling/);
    assert.doesNotMatch(results.text, /list the directory/);
  });

  it("does not inject a SYNTX tool catalog when backend emulation is off", () => {
    const glob = {
      type: "function",
      function: { name: "Glob", parameters: { type: "object", properties: { pattern: { type: "string" } } } },
    };
    const generated = mod.buildSyntxGenerateText({
      messages: [{ role: "user", content: "list the directory" }],
      tools: [glob],
      reuseChat: false,
      emulateTools: false,
    });
    assert.equal(generated.injectedCatalog, false);
    assert.doesNotMatch(generated.text, /# Tool Calling/);
    assert.match(generated.text, /list the directory/);
  });

  it("reuses chat_uuid for a tool-result follow-up that has no new user turn", () => {
    sessions.__resetSyntxSessionsForTests();
    const turn1 = [{ role: "user", content: "list the directory" }];
    sessions.rememberSyntxFollowUp("conn-tools", "gpt-5-nano-2025-08-07", turn1, "calling glob", "uuid-tools");
    const turn2 = [
      { role: "user", content: "list the directory" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ type: "function", function: { name: "Glob", arguments: "{}" } }],
      },
      { role: "tool", name: "Glob", content: "ok" },
    ];
    assert.equal(
      sessions.lookupSyntxChatUuidForMessages("conn-tools", "gpt-5-nano-2025-08-07", turn2),
      "uuid-tools"
    );
  });

  it("reuses chat_uuid when turn 1 pinned the task onto the last user message and turn 2 sends the original user + tool results", () => {
    sessions.__resetSyntxSessionsForTests();
    const original = "do you have tools, give list of files in dir C:\\adb";
    const pinned =
      "Hi! I'm using my local workflow automation tool.\n\n" +
      "Here is the catalog of commands my local tool supports:\n- PowerShell\n\n" +
      `My current task: ${original}`;
    sessions.rememberSyntxFollowUp(
      "conn-pin",
      "claude-sonnet-5",
      [
        { role: "system", content: "Here is the catalog of commands my local tool supports:\n- PowerShell" },
        { role: "user", content: pinned },
      ],
      "Intent: List files\n```json\n{\"tool\":\"PowerShell\"}\n```",
      "uuid-pin"
    );
    const turn2 = [
      { role: "system", content: "Here is the catalog of commands my local tool supports:\n- PowerShell" },
      { role: "user", content: original },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            type: "function",
            function: {
              name: "PowerShell",
              arguments: "{\"command\":\"Get-ChildItem -Path 'C:\\\\adb'\"}",
            },
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_1",
            content: "Mode LastWriteTime Length Name\n-a--- adb.exe",
          },
        ],
      },
    ];
    assert.equal(
      sessions.lookupSyntxChatUuidForMessages("conn-pin", "claude-sonnet-5", turn2),
      "uuid-pin"
    );
    assert.equal(sessions.canonicalizeSyntxUserText(pinned), original.replace(/\s+/g, " ").trim());
    const follow = mod.buildSyntxGenerateText({
      messages: turn2,
      reuseChat: true,
      toolsAlreadyInjected: true,
      emulateTools: false,
    });
    assert.match(follow.text, /<tool_result/);
    assert.match(follow.text, /adb\.exe/);
    assert.doesNotMatch(follow.text, /My current task/);
    assert.doesNotMatch(follow.text, /do you have tools/);
  });

  it("extracts Anthropic tool_result content from user parts", () => {
    const text = sessions.extractSyntxMessageText([
      { type: "tool_result", tool_use_id: "x", content: "adb.exe" },
    ]);
    assert.equal(text, "adb.exe");
  });

  it("enables thinking from reasoning_effort", () => {
    assert.equal(mod.wantSyntxThinking({ reasoning_effort: "high" }, "gpt-5-nano-2025-08-07"), true);
    assert.equal(mod.wantSyntxThinking({}, "gpt-5-nano-2025-08-07"), false);
    assert.equal(mod.wantSyntxThinking({}, "claude-opus-5-thinking"), true);
  });

  it("collects image_url parts from the last user message", () => {
    const images = mod.collectSyntxImageSources([
      { type: "text", text: "what is on image" },
      { type: "image_url", image_url: { url: "https://r2.syntx.ai/user/x.png" } },
    ]);
    assert.equal(images[0].url, "https://r2.syntx.ai/user/x.png");
  });

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
      function: { name: "Glob", parameters: { type: "object", properties: { pattern: { type: "string" } } } },
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
          sseFrame({ type: "content", content: "<tool_call>\n{\"name\":\"Glob\",\"arguments\":{\"pattern\":\"*\"}}\n</tool_call>" }) +
            sseFrame("[DONE]"),
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
              tool_calls: [{ type: "function", function: { name: "Glob", arguments: "{\"pattern\":\"*\"}" } }],
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
        const raw = typeof init?.body === "string" ? init.body : Buffer.isBuffer(init?.body) ? init.body.toString("latin1") : String(init?.body || "");
        assert.match(String(init?.headers && (init.headers as Record<string, string>)["content-type"]), /multipart\/form-data; boundary=/);
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
    assert.equal(result.quotas.hours.resetAt, new Date(Date.parse(started) + 6 * 3600_000).toISOString());
    assert.equal(result.quotas.weekly.resetAt, new Date(Date.parse(started) + 7 * 24 * 3600_000).toISOString());
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
      function: { name: "Glob", parameters: { type: "object", properties: { pattern: { type: "string" } } } },
    };
    const messages = [
      { role: "system", content: "Here is the catalog of commands my local tool supports:\n- Glob" },
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
    let generateBody: { text?: string; files?: Array<{ object_url?: string; object_type?: string }>; tools?: unknown } =
      {};
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
        return new Response(sseFrame({ type: "content", content: "handoff" }) + sseFrame("[DONE]"), {
          status: 200,
        });
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
    let generateBody: { chat_uuid?: string; text?: string; tools?: unknown; files?: unknown[] } = {};
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
        return new Response(sseFrame({ type: "content", content: "handoff" }) + sseFrame("[DONE]"), {
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
      assert.equal(payload.user?.text?.system_prompt?.default, "Just output command JSON for my local agent.");
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

  it("looks up continue uuid by first-user identity without follow-up history", () => {
    sessions.__resetSyntxSessionsForTests();
    sessions.rememberSyntxFollowUp(
      "fp-lu",
      "claude-sonnet-5",
      [{ role: "user", content: "original task" }],
      "ok",
      "uuid-lu"
    );
    assert.equal(
      sessions.lookupSyntxContinueChatUuid("fp-lu", "claude-sonnet-5", "original task"),
      "uuid-lu"
    );
    assert.equal(sessions.lookupSyntxContinueChatUuid("fp-lu", "claude-sonnet-5", ""), null);
  });

  it("keeps registry, executor, discovery, and validator files in the tree", () => {
    const files = [
      "open-sse/executors/syntx.ts",
      "open-sse/services/syntxAuth.ts",
      "open-sse/services/syntxModels.ts",
      "open-sse/services/syntxSessions.ts",
      "open-sse/services/usage/syntx.ts",
      "open-sse/config/providers/registry/syntx/index.ts",
      "src/app/api/providers/[id]/models/syntxDiscovery.ts",
    ];
    for (const rel of files) {
      assert.ok(fs.existsSync(path.join(repoRoot, rel)), `missing ${rel}`);
    }
    const registry = fs.readFileSync(path.join(repoRoot, "open-sse/config/providers/index.ts"), "utf8");
    assert.match(registry, /syntxProvider/);
    const validation = fs.readFileSync(path.join(repoRoot, "src/lib/providers/validation.ts"), "utf8");
    assert.match(validation, /validateSyntxProvider/);
  });
});
