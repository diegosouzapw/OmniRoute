import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mod = await import("../../open-sse/executors/syntx.ts");
const auth = await import("../../open-sse/services/syntxAuth.ts");
const models = await import("../../open-sse/services/syntxModels.ts");
const sessions = await import("../../open-sse/services/syntxSessions.ts");

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");

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
    assert.equal(
      (body.files as Array<{ object_url: string }>)[0].object_url,
      "https://r2.syntx.ai/x.png"
    );
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
    assert.equal(mod.isSyntxStreamUrl("https://sse.syntx.ai/stream/abc?token=x"), true);
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
    assert.equal(
      sessions.lookupSyntxChatUuidForMessages("conn-new", "claude-sonnet-5", fresh),
      null
    );
  });

  it("reuses a pending first-turn uuid for OpenCode abort retries (exact + empty assistant)", () => {
    sessions.__resetSyntxSessionsForTests();
    const first = [
      {
        role: "system",
        content:
          "You are opencode, an interactive CLI tool that helps users with software engineering tasks.",
      },
      { role: "user", content: "fix the bug" },
    ];
    sessions.rememberSyntxPendingRequest("oc-1", "claude-sonnet-5", first, "uuid-pending");
    assert.equal(
      sessions.lookupSyntxChatUuidForMessages("oc-1", "claude-sonnet-5", first),
      "uuid-pending"
    );
    const withEmptyAssistant = [...first, { role: "assistant", content: "" }];
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
      system:
        "You are opencode, an interactive CLI tool that helps users with software engineering tasks.",
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
    assert.deepEqual(sessions.syntxMessagesForNewSession(withHistory), [
      { role: "user", content: "hi" },
    ]);
  });

  it("honors thinking=true and Anthropic thinking objects; ignores catalog-only thinking", () => {
    assert.equal(mod.wantSyntxThinking({ thinking: true }, "claude-sonnet-5"), true);
    assert.equal(
      mod.wantSyntxThinking(
        { thinking: { type: "enabled", budget_tokens: 8000 } },
        "claude-sonnet-5"
      ),
      true
    );
    assert.equal(
      mod.wantSyntxThinking({ reasoning_effort: "high" }, "gpt-5-nano-2025-08-07"),
      true
    );
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
    assert.match(
      mod.buildSyntxGenerateText({ messages, reuseChat: false }).text,
      /<user>\nsecond\n<\/user>/
    );
  });

  it("injects the tool catalog once, then follow-ups are only the new delta", () => {
    const glob = {
      type: "function",
      function: {
        name: "Glob",
        description: "List files",
        parameters: {
          type: "object",
          properties: { pattern: { type: "string" } },
          required: ["pattern"],
        },
      },
    };
    const first = [{ role: "user", content: "list the directory" }];
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
        tool_calls: [
          { type: "function", function: { name: "Glob", arguments: '{"pattern":"*"}' } },
        ],
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
      function: {
        name: "Glob",
        parameters: { type: "object", properties: { pattern: { type: "string" } } },
      },
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
    sessions.rememberSyntxFollowUp(
      "conn-tools",
      "gpt-5-nano-2025-08-07",
      turn1,
      "calling glob",
      "uuid-tools"
    );
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
        {
          role: "system",
          content: "Here is the catalog of commands my local tool supports:\n- PowerShell",
        },
        { role: "user", content: pinned },
      ],
      'Intent: List files\n```json\n{"tool":"PowerShell"}\n```',
      "uuid-pin"
    );
    const turn2 = [
      {
        role: "system",
        content: "Here is the catalog of commands my local tool supports:\n- PowerShell",
      },
      { role: "user", content: original },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            type: "function",
            function: {
              name: "PowerShell",
              arguments: '{"command":"Get-ChildItem -Path \'C:\\\\adb\'"}',
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
    assert.equal(
      mod.wantSyntxThinking({ reasoning_effort: "high" }, "gpt-5-nano-2025-08-07"),
      true
    );
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
      "open-sse/executors/syntxChat.ts",
      "open-sse/services/syntxAuth.ts",
      "open-sse/services/syntxModels.ts",
      "open-sse/services/syntxSessions.ts",
      "open-sse/services/usage/syntx.ts",
      "open-sse/config/providers/registry/syntx/index.ts",
      "src/app/api/providers/[id]/models/syntxDiscovery.ts",
      "src/app/api/providers/[id]/models/webSessionDiscovery.ts",
    ];
    for (const rel of files) {
      assert.ok(fs.existsSync(path.join(repoRoot, rel)), `missing ${rel}`);
    }
    const registry = fs.readFileSync(
      path.join(repoRoot, "open-sse/config/providers/index.ts"),
      "utf8"
    );
    assert.match(registry, /syntxProvider/);
    const validation = fs.readFileSync(
      path.join(repoRoot, "src/lib/providers/validation.ts"),
      "utf8"
    );
    assert.match(validation, /validateSyntxProvider/);
  });
});
