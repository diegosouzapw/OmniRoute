import assert from "node:assert/strict";
import { test } from "node:test";

// #audit-x-opencode-session: outbound header verification for the 2026-09-06
// upstream enforcement (requests missing x-opencode-session may error).
//
// Verified live 2026-09-04 against https://opencode.ai/zen/go/v1/models:
//   - responses-only: muse-spark-1.2-contributor answers 200 via /responses,
//     /chat/completions answers upstream 500 (non-JSON body)
//   - header echo: requests without x-opencode-session carry the
//     x-openrouter-warning "missing x-opencode-session" badge
//
// What this pins (after the 09/06 fix in opencodeHeaders.ts):
//   1. OpencodeExecutor.buildHeaders ALWAYS puts a session id outbound —
//      client-supplied (case-insensitive, cache-affinity preserved), affinity
//      header mapped, or synthesized: conversation-stable fingerprint of
//      (model, system, first user message, tools) via generateSessionId so
//      upstream prompt caching hits, or a random UUID when there is no body.
//   2. Muse responses upstreams reject the short conversation fingerprint —
//      muse-spark + openai-responses forces a proper UUID (upstream v3.8.51
//      behavior mirrored).
//   3. DefaultExecutor is unchanged: forwards a client session when present,
//      never synthesizes for non-OpenCode upstreams (intentional).

const { OpencodeExecutor } = await import("../../../open-sse/executors/opencode.ts");
const { DefaultExecutor } = await import("../../../open-sse/executors/default.ts");
const { getModelTargetFormat } = await import("../../../open-sse/config/providerModels.ts");

const AGENT_BODY = {
  model: "kimi-k2.6",
  messages: [{ role: "user", content: "Hello agent turn one" }],
  system: "You are a helpful agent.",
};

test("opencode executor: forwards client x-opencode-session (case-insensitive) for cache affinity", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const headers = executor.buildHeaders(
    { accessToken: "test-key" } as any,
    true,
    {
      "X-OpenCode-Session": "client-session-abc",
      "x-opencode-request": "client-request-123",
    },
    "muse-spark-1.2-contributor",
    undefined,
    AGENT_BODY
  ) as Record<string, string>;
  assert.equal(headers["x-opencode-session"], "client-session-abc");
  assert.equal(headers["x-opencode-request"], "client-request-123");
  assert.equal(headers["Authorization"], "Bearer test-key");
});

test("opencode executor: maps x-session-affinity to x-opencode-session", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const headers = executor.buildHeaders(
    { accessToken: "k" } as any,
    true,
    { "x-session-affinity": "aff-1" },
    "m",
    undefined,
    AGENT_BODY
  ) as Record<string, string>;
  assert.equal(headers["x-opencode-session"], "aff-1");
});

test("opencode executor: synthesizes a conversation-stable session when the client omits it (09/06 safe)", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const headers = executor.buildHeaders(
    { accessToken: "test-key" } as any,
    true,
    {},
    "kimi-k2.6",
    undefined,
    AGENT_BODY
  ) as Record<string, string>;
  assert.ok(headers["x-opencode-session"], "synthesized x-opencode-session missing outbound");
  assert.ok(headers["x-opencode-request"], "synthesized x-opencode-request missing outbound");
});

test("opencode executor: same body fingerprint keeps the session stable across turns (prompt caching)", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const h1 = executor.buildHeaders(
    { accessToken: "k" } as any,
    true,
    {},
    "kimi-k2.6",
    undefined,
    AGENT_BODY
  ) as Record<string, string>;
  const h2 = executor.buildHeaders(
    { accessToken: "k" } as any,
    true,
    {},
    "kimi-k2.6",
    undefined,
    AGENT_BODY
  ) as Record<string, string>;
  assert.equal(h1["x-opencode-session"], h2["x-opencode-session"]);
});

test("opencode executor: different first user message → different synthesized session", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const h1 = executor.buildHeaders({ accessToken: "k" } as any, true, {}, "m", {
    model: "m",
    messages: [{ role: "user", content: "conversation A" }],
  }) as Record<string, string>;
  const h2 = executor.buildHeaders({ accessToken: "k" } as any, true, {}, "m", {
    model: "m",
    messages: [{ role: "user", content: "conversation B" }],
  }) as Record<string, string>;
  assert.notEqual(h1["x-opencode-session"], h2["x-opencode-session"]);
});

test("opencode executor: no body → session still present (random UUID fallback)", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const headers = executor.buildHeaders({ accessToken: "k" } as any, true, {}, "m") as Record<
    string,
    string
  >;
  assert.ok(headers["x-opencode-session"], "session missing with no body");
  assert.match(headers["x-opencode-session"], /^[0-9a-f-]{36}$/i);
});

test("muse responses: non-UUID session (e.g. conversation fingerprint) replaced with UUID", () => {
  const executor = new OpencodeExecutor("opencode-go");
  executor._requestFormat = "openai-responses";
  const headers = executor.buildHeaders(
    { accessToken: "k" } as any,
    true,
    {},
    "muse-spark-1.2-contributor",
    undefined,
    { model: "muse-spark-1.2-contributor", messages: [{ role: "user", content: "turn one" }] }
  ) as Record<string, string>;
  assert.match(
    headers["x-opencode-session"],
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    "muse responses session must be a UUID, got " + headers["x-opencode-session"]
  );
});

test("default executor: forwards a client session when present", () => {
  const executor = new DefaultExecutor("default-header-audit-test");
  const headers = executor.buildHeaders({ apiKey: "k" } as any, true, {
    "x-opencode-session": "s-1",
  }) as Record<string, string>;
  assert.equal(headers["x-opencode-session"], "s-1");
});

test("default executor: does NOT synthesize a session for non-OpenCode upstreams", () => {
  const executor = new DefaultExecutor("default-header-audit-test");
  const headers = executor.buildHeaders({ apiKey: "k" } as any, true, {}) as Record<string, string>;
  assert.equal(headers["x-opencode-session"], undefined);
});

test("muse-spark-1.2-contributor routes via /responses (responses-only upstream)", () => {
  const executor = new OpencodeExecutor("opencode-go");
  // execute() sets _requestFormat from the registry entry before buildUrl runs
  // (execute:184) — mirror that instead of assigning the private field by hand.
  const executorWithFormat = executor as unknown as {
    _requestFormat: string | null;
    buildUrl: (model: string, stream: boolean) => string;
  };
  executorWithFormat._requestFormat = getModelTargetFormat(
    "opencode-go",
    "muse-spark-1.2-contributor"
  );
  const url = executorWithFormat.buildUrl("muse-spark-1.2-contributor", true);
  assert.ok(url.endsWith("/responses"), `expected /responses, got ${url}`);
});
