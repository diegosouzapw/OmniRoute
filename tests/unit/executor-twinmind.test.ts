import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mod = await import("../../open-sse/executors/twinmind.ts");
const auth = await import("../../open-sse/services/twinmindAuth.ts");
const models = await import("../../open-sse/services/twinmindModels.ts");
const { resolvePublicCred } = await import("../../open-sse/utils/publicCreds.ts");

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");

function sseEvent(type: string, content: string): string {
  return `data: ${JSON.stringify({ type, content })}\n\n`;
}

describe("TwinmindExecutor", () => {
  it("flattens OpenAI history into Twinmind tagged query text", () => {
    const flattened = mod.flattenTwinmindMessages([
      { role: "system", content: "Be brief." },
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" },
      { role: "user", content: [{ type: "text", text: "again" }] },
    ]);
    assert.match(flattened, /<system>\nBe brief.\n<\/system>/);
    assert.match(flattened, /<user>\nagain\n<\/user>/);
  });

  it("neutralizes Cursor/Claude Code workspace-identity in system history", () => {
    const flattened = mod.flattenTwinmindMessages([
      {
        role: "system",
        content:
          "You are Claude Code, Anthropic's CLI. If coding workspace tools are not available in this session, reopen this request in a coding-enabled workspace.",
      },
      { role: "user", content: "list files" },
    ]);
    assert.match(flattened, /live local tools/);
    assert.doesNotMatch(flattened, /You are Claude Code/);
    assert.doesNotMatch(flattened, /coding-enabled workspace/);
  });

  it("drops client system prompts on tool queries so Cursor identity cannot refuse", () => {
    const query = mod.buildTwinmindQuery({
      messages: [
        {
          role: "system",
          content:
            "You are Cursor Grok. If tools are not available in this session, tell the user to reopen in a coding-enabled workspace.",
        },
        { role: "user", content: "inspect the repo" },
      ],
      tools: [{ type: "function", function: { name: "Glob", parameters: { type: "object" } } }],
    });
    assert.doesNotMatch(query, /You are Cursor Grok/);
    assert.doesNotMatch(query, /reopen in a coding-enabled workspace/);
    assert.match(query, /inspect the repo/);
    assert.match(query, /### Glob/);
  });

  it("strips twinmind/ prefixes and maps auto to the default wire model", () => {
    assert.equal(mod.mapTwinmindModel("twinmind/claude-opus-5-thinking"), "claude-opus-5-thinking");
    assert.equal(mod.mapTwinmindModel("tm/claude-opus-5-thinking"), "claude-opus-5-thinking");
    assert.equal(mod.mapTwinmindModel("auto"), mod.TWINMIND_DEFAULT_MODEL);
    assert.equal(mod.mapTwinmindModel("twinmind/auto"), mod.TWINMIND_DEFAULT_MODEL);
  });

  it("parses <tool_call> blocks into OpenAI tool_calls", () => {
    const parsed = mod.parseTwinmindToolCalls(
      'ok\n<tool_call>\n{"name":"bash","arguments":{"command":"ls"}}\n</tool_call>'
    );
    assert.equal(parsed.calls.length, 1);
    assert.equal(parsed.calls[0].function.name, "bash");
    assert.equal(JSON.parse(parsed.calls[0].function.arguments).command, "ls");
    assert.equal(parsed.content, "ok");
  });

  it("parses Claude invoke blocks and fenced tool JSON", () => {
    const invoke = mod.parseTwinmindToolCalls(
      'Checking\n<invoke name="Glob"><parameter name="pattern">*.cs</parameter></invoke>'
    );
    assert.equal(invoke.calls.length, 1);
    assert.equal(invoke.calls[0].function.name, "Glob");
    assert.equal(JSON.parse(invoke.calls[0].function.arguments).pattern, "*.cs");

    const fenced = mod.parseTwinmindToolCalls(
      'Intent: list files\n```json\n{"tool":"Read","args":{"path":"AGENTS.md"}}\n```'
    );
    assert.equal(fenced.calls.length, 1);
    assert.equal(fenced.calls[0].function.name, "Read");
    assert.equal(JSON.parse(fenced.calls[0].function.arguments).path, "AGENTS.md");
  });

  it("detects Twinmind tool-refusal openings", () => {
    assert.equal(mod.looksLikeTwinmindRefusal("I don't have access to the filesystem or bash tools."), true);
    assert.equal(mod.looksLikeTwinmindRefusal("Here is the listing of the folder."), false);
    const preamble = `${"Thinking about the previous tool output. ".repeat(40)}I don't have access to local tools.`;
    assert.equal(mod.looksLikeTwinmindRefusal(preamble), true);
    assert.equal(
      mod.looksLikeTwinmindRefusal('<tool_call>\n{"name":"bash","arguments":{}}\n</tool_call>'),
      false
    );
    const cursorRefusal =
      "I'm ready to implement this, but the coding workspace tools needed to inspect and modify the VibeProxy repository are not available in this session. I can't safely create the privacy pipeline without reading and editing the existing project files first. Please reopen this request in a coding-enabled workspace session.";
    assert.equal(mod.looksLikeTwinmindRefusal(cursorRefusal), true);
    assert.equal(
      mod.looksLikeTwinmindRefusal("Please reopen this request in a coding-enabled workspace session so I can modify files."),
      true
    );
    assert.equal(
      mod.looksLikeTwinmindRefusal(
        "I can’t inspect the repository because the requested `Glob` and `Read` tools are not exposed in this session."
      ),
      true
    );
    assert.equal(
      mod.looksLikeTwinmindRefusal(
        "I can’t inspect the repository in this chat because the live filesystem tools (`Glob` and `Read`) aren’t exposed to me here. No files were read."
      ),
      true
    );
  });

  it("builds a Twinmind chat body with type app and model.model_name", () => {
    const body = mod.buildTwinmindChatBody("hello world", "claude-opus-5-thinking");
    assert.equal(body.type, "app");
    assert.equal(body.version, 1);
    assert.equal(body.mode, "private");
    assert.equal(body.query, "hello world");
    assert.deepEqual(body.model, { model_name: "claude-opus-5-thinking" });
    assert.equal(body.context, null);
    const client = body.client as { platform?: string };
    assert.equal(client.platform, "web");
  });

  it("uses last user + system prefix when tools are absent", () => {
    const query = mod.buildTwinmindQuery({
      messages: [
        { role: "system", content: "sys" },
        { role: "user", content: "first" },
        { role: "assistant", content: "ok" },
        { role: "user", content: "second" },
      ],
    });
    assert.equal(query, "sys\n\nsecond");
  });

  it("puts emulated tool instructions before history so follow-ups keep them", () => {
    const query = mod.buildTwinmindQuery({
      messages: [{ role: "user", content: "list files" }],
      tools: [
        {
          type: "function",
          function: {
            name: "bash",
            description: "Run a shell command",
            parameters: { type: "object", properties: { command: { type: "string" } }, required: ["command"] },
          },
        },
      ],
    });
    assert.match(query, /<user>\nlist files\n<\/user>/);
    assert.match(query, /<tool_call>/);
    assert.match(query, /### bash/);
    assert.ok(query.indexOf("### bash") < query.indexOf("<user>\nlist files"));
    assert.match(query, /Use the tools listed at the top/);
    assert.match(query, /Twinmind's calendar assistant/);
    assert.match(query, /<tool_call>\n\{"name": "bash"/);
    assert.ok(query.indexOf("<user>\nlist files") < query.indexOf("Twinmind's calendar assistant"));
  });

  it("pins a continue reminder after tool results so turn 2 still uses tools", () => {
    const query = mod.buildTwinmindQuery({
      messages: [
        { role: "user", content: "list files" },
        {
          role: "assistant",
          content: "",
          tool_calls: [
            { type: "function", function: { name: "bash", arguments: "{\"command\":\"ls\"}" } },
          ],
        },
        { role: "tool", name: "bash", content: "README.md" },
      ],
      tools: [
        {
          type: "function",
          function: { name: "bash", parameters: { type: "object", properties: {} } },
        },
      ],
    });
    assert.match(query, /<tool_result name="bash">/);
    assert.match(query, /YOUR local tools that already ran/);
    assert.ok(query.indexOf("Available tools") < query.indexOf("<tool_result"));
    assert.equal(mod.messagesHaveTwinmindToolTraffic([{ role: "tool", content: "ok" }]), true);
  });

  it("extracts text_start/text_delta SSE content and ignores other events", () => {
    const deltas = [
      ...mod.extractTwinmindSseDeltas('data: {"type":"text_start","content":"Hel"}'),
      ...mod.extractTwinmindSseDeltas('data: {"type":"text_delta","content":"lo"}'),
      ...mod.extractTwinmindSseDeltas("data: [DONE]"),
      ...mod.extractTwinmindSseDeltas('data: {"type":"usage","tokens":3}'),
    ];
    assert.deepEqual(deltas, ["Hel", "lo"]);
  });

  it("flattens Twinmind grouped providers catalog and always includes auto", () => {
    const ids = models.flattenTwinmindModelsCatalog({
      providers: [
        {
          id: "google",
          display_name: "Google",
          models: [
            { name: "gemini-3.8-flash-thinking", display_name: "Gemini 3.8 Flash Thinking" },
          ],
        },
      ],
      default_model: { name: "gpt-5.6-sol-thinking", display_name: "GPT-5.6 Sol Thinking" },
    });
    assert.equal(ids[0].id, "auto");
    assert.ok(ids.some((m) => m.id === "gemini-3.8-flash-thinking" && m.name === "Gemini 3.8 Flash Thinking"));
    assert.ok(ids.some((m) => m.id === "gpt-5.6-sol-thinking"));
  });

  it("returns 401 when no token is configured", async () => {
    const executor = new mod.TwinmindExecutor();
    const result = await executor.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });
    assert.equal(result.response.status, 401);
  });

  it("POSTs Twinmind body and maps SSE to a non-streaming OpenAI completion", async () => {
    const originalFetch = globalThis.fetch;
    const calls: Array<{ url: string; body: unknown }> = [];
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : null });
      const sse = sseEvent("text_start", "Hel") + sseEvent("text_delta", "lo");
      return new Response(sse, { status: 200 });
    }) as typeof fetch;

    try {
      const executor = new mod.TwinmindExecutor();
      const result = await executor.execute({
        model: "twinmind/claude-opus-5-thinking",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: {
          apiKey:
            "eyJhbGciOiJub25lIn0." +
            Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64") +
            ".x",
        },
        signal: null,
      });
      const json = await result.response.json();
      assert.equal(result.response.status, 200);
      assert.equal(json.choices[0].message.content, "Hello");
      assert.equal(calls[0].url, "https://api2.twinmind.com/api/v3/chat");
      const posted = calls[0].body as { type?: string; model?: { model_name?: string }; messages?: unknown };
      assert.equal(posted.type, "app");
      assert.equal(posted.model?.model_name, "claude-opus-5-thinking");
      assert.equal(posted.messages, undefined);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("streams OpenAI chunks from Twinmind text_delta events", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(sseEvent("text_delta", "Hi") + sseEvent("text_delta", " there"), {
        status: 200,
      })) as typeof fetch;

    try {
      const executor = new mod.TwinmindExecutor();
      const result = await executor.execute({
        model: "auto",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: {
          apiKey:
            "eyJhbGciOiJub25lIn0." +
            Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64") +
            ".x",
        },
        signal: null,
      });
      const text = await result.response.text();
      assert.match(text, /"content":"Hi"/);
      assert.match(text, /"content":" there"/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("refreshes on 401 and retries without duplicating the stream", async () => {
    const originalFetch = globalThis.fetch;
    let chatAttempts = 0;
    const persisted: unknown[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("securetoken.googleapis.com")) {
        return new Response(
          JSON.stringify({
            id_token:
              "eyJhbGciOiJub25lIn0." +
              Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64") +
              ".x",
            refresh_token: "rotated-refresh",
          }),
          { status: 200 }
        );
      }
      chatAttempts += 1;
      if (chatAttempts === 1) return new Response("expired", { status: 401 });
      const auth = String((init?.headers as Record<string, string> | undefined)?.authorization || "");
      assert.match(auth, /^Bearer eyJ/);
      return new Response(sseEvent("text_delta", "ok"), { status: 200 });
    }) as typeof fetch;

    try {
      const executor = new mod.TwinmindExecutor();
      const result = await executor.execute({
        model: "auto",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "stale-refresh-token-not-a-jwt" },
        signal: null,
        onCredentialsRefreshed: (patch) => {
          persisted.push(patch);
        },
      });
      const json = await result.response.json();
      assert.equal(result.response.status, 200);
      assert.equal(json.choices[0].message.content, "ok");
      assert.equal(chatAttempts, 2);
      assert.ok(persisted.length >= 1);
      const last = persisted[persisted.length - 1] as { refreshToken?: string };
      assert.equal(last.refreshToken, "rotated-refresh");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("does not embed a raw AIza Firebase key in Twinmind or public-creds source", () => {
    const files = [
      "open-sse/executors/twinmind.ts",
      "open-sse/services/twinmindAuth.ts",
      "open-sse/services/twinmindModels.ts",
      "open-sse/config/providers/registry/twinmind/index.ts",
    ];
    for (const rel of files) {
      const src = fs.readFileSync(path.join(repoRoot, rel), "utf8");
      assert.doesNotMatch(src, /AIza[A-Za-z0-9_-]{10,}/, `${rel} contains a raw AIza literal`);
    }
    const decoded = resolvePublicCred("twinmind_fb");
    assert.match(decoded, /^AIza/);
    assert.equal(decoded.startsWith("AIzaSy"), true);
  });

  it("emits OpenAI tool_calls when the model returns a Twinmind tool_call block", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const posted = JSON.parse(String(init?.body || "{}")) as { query?: string; model?: { model_name?: string } };
      assert.match(posted.query || "", /<tool_call>/);
      assert.equal(posted.model?.model_name, "claude-opus-5-thinking");
      return new Response(
        sseEvent("text_delta", '<tool_call>\n{"name":"bash","arguments":{"command":"pwd"}}\n</tool_call>'),
        { status: 200 }
      );
    }) as typeof fetch;

    try {
      const executor = new mod.TwinmindExecutor();
      const result = await executor.execute({
        model: "twinmind/claude-opus-5-thinking",
        body: {
          messages: [{ role: "user", content: "pwd" }],
          tools: [{ type: "function", function: { name: "bash", parameters: { type: "object" } } }],
        },
        stream: false,
        credentials: {
          apiKey:
            "eyJhbGciOiJub25lIn0." +
            Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64") +
            ".x",
        },
        signal: null,
      });
      const json = await result.response.json();
      assert.equal(result.response.status, 200);
      assert.equal(json.choices[0].finish_reason, "tool_calls");
      assert.equal(json.choices[0].message.tool_calls[0].function.name, "bash");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("retries when a follow-up refuses tools after a long thinking preamble", async () => {
    const originalFetch = globalThis.fetch;
    let chatAttempts = 0;
    const jwt =
      "eyJhbGciOiJub25lIn0." +
      Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64") +
      ".x";
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      chatAttempts += 1;
      if (chatAttempts === 1) {
        const thinking = "Let me review the previous output. ".repeat(20);
        return new Response(
          sseEvent("text_delta", thinking) + sseEvent("text_delta", "I don't have access to bash tools."),
          { status: 200 }
        );
      }
      const posted = JSON.parse(String(init?.body || "{}")) as { query?: string };
      assert.match(posted.query || "", /Output a <tool_call> now/);
      return new Response(
        sseEvent("text_delta", '<tool_call>\n{"name":"bash","arguments":{"command":"ls"}}\n</tool_call>'),
        { status: 200 }
      );
    }) as typeof fetch;

    try {
      const executor = new mod.TwinmindExecutor();
      const result = await executor.execute({
        model: "auto",
        body: {
          messages: [
            { role: "user", content: "list files" },
            {
              role: "assistant",
              content: "",
              tool_calls: [{ type: "function", function: { name: "bash", arguments: "{}" } }],
            },
            { role: "tool", name: "bash", content: "ok" },
          ],
          tools: [{ type: "function", function: { name: "bash", parameters: { type: "object" } } }],
        },
        stream: false,
        credentials: { apiKey: jwt },
        signal: null,
      });
      const json = await result.response.json();
      assert.equal(result.response.status, 200);
      assert.equal(json.choices[0].finish_reason, "tool_calls");
      assert.equal(json.choices[0].message.tool_calls[0].function.name, "bash");
      assert.equal(chatAttempts, 2);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("retries Cursor-style workspace-unavailable refusals into a tool_call", async () => {
    const originalFetch = globalThis.fetch;
    let chatAttempts = 0;
    const jwt =
      "eyJhbGciOiJub25lIn0." +
      Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64") +
      ".x";
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      chatAttempts += 1;
      if (chatAttempts === 1) {
        return new Response(
          sseEvent(
            "text_delta",
            "I'm ready to implement this, but the coding workspace tools needed to inspect and modify the VibeProxy repository are not available in this session."
          ),
          { status: 200 }
        );
      }
      const posted = JSON.parse(String(init?.body || "{}")) as { query?: string };
      assert.match(posted.query || "", /not Cursor and not a coding-enabled workspace/);
      assert.match(posted.query || "", /Output a <tool_call> now/);
      assert.match(posted.query || "", /Twinmind calendar, email, notes, and artifacts are disabled/);
      return new Response(
        sseEvent("text_delta", '<tool_call>\n{"name":"Glob","arguments":{"pattern":"*.cs"}}\n</tool_call>'),
        { status: 200 }
      );
    }) as typeof fetch;

    try {
      const executor = new mod.TwinmindExecutor();
      const result = await executor.execute({
        model: "twinmind/claude-opus-5-thinking",
        body: {
          messages: [{ role: "user", content: "implement the privacy pipeline" }],
          tools: [{ type: "function", function: { name: "Glob", parameters: { type: "object" } } }],
        },
        stream: false,
        credentials: { apiKey: jwt },
        signal: null,
      });
      const json = await result.response.json();
      assert.equal(result.response.status, 200);
      assert.equal(json.choices[0].finish_reason, "tool_calls");
      assert.equal(json.choices[0].message.tool_calls[0].function.name, "Glob");
      assert.equal(chatAttempts, 2);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("does not send an expired JWT when Firebase refresh fails", async () => {
    const originalFetch = globalThis.fetch;
    let chatAttempts = 0;
    const expired =
      "eyJhbGciOiJub25lIn0." +
      Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 3600 })).toString("base64") +
      ".x";
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("securetoken.googleapis.com")) {
        return new Response(JSON.stringify({ error: "invalid" }), { status: 400 });
      }
      chatAttempts += 1;
      return new Response("expired", { status: 401 });
    }) as typeof fetch;
    try {
      const executor = new mod.TwinmindExecutor();
      const result = await executor.execute({
        model: "auto",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: expired, refreshToken: `AMf-${"x".repeat(80)}` },
        signal: null,
      });
      const json = await result.response.json();
      const message = String(json.error?.message || json.message || "");
      assert.equal(result.response.status, 401);
      assert.match(message, /Firebase refresh failed/);
      assert.equal(chatAttempts, 0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("treats a pasted non-JWT apiKey as the Firebase refresh token", () => {
    assert.equal(auth.looksLikeJwt("AIzaNotAJwt"), false);
    assert.equal(
      auth.resolveTwinmindRefreshToken({ apiKey: "durable-refresh-token" }),
      "durable-refresh-token"
    );
    assert.equal(auth.resolveTwinmindAccessToken({ apiKey: "durable-refresh-token" }), "");
  });
});
