/**
 * OpenCode Zen free-tier request contract.
 *
 * Since 2026-09-17 the free tier answers 403 FreeTierError unless the request carries
 * all four of: `stream: true`, a non-empty `tools` array, an `x-opencode-session` (or
 * `x-session-id`) shaped `ses_` + 12 hex + 14 base62, and a `User-Agent` containing
 * `opencode/<version >= 1.17>`. Removing any one of the four turns a 200 into a 403, and
 * a version below 1.17 answers 426 instead.
 *
 * Measured again on 2026-09-18, and the tools condition is narrower than it first looked:
 * the upstream inspects which names are declared. One made-up name, twelve made-up names
 * and twelve plausible names borrowed from another vocabulary are all refused, while six,
 * nine and twelve names from the official client pass; three of those same names are
 * refused. What the upstream takes also differs by model and moves between days, which is
 * why the placeholder is resolved at runtime rather than pinned here.
 *
 * `tool_choice` is never imposed on any surface: the upstream rejects every value but
 * "auto" with a 400 invalid_request_error (`only "auto" is supported for tool_choice`).
 *
 * Paid models on the same host are not gated (one without tools answers 401), so the
 * request contract applies to free-tier models only.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyFreeTierRequestContract,
  configuredPlaceholderToolNames,
  mergeClientToolsWithObserved,
  noteFreeTierOutcome,
  prepareFreeTierRequest,
  isGatedFreeTierRequest,
  requiresFreeTierRequestContract,
  surfaceFromBaseUrl,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import {
  _resetToolObservationForTests,
  getObservedToolNames,
} from "../../open-sse/executors/opencodeToolObservation.ts";
import {
  DEFAULT_OPENCODE_USER_AGENT,
  OPENCODE_SESSION_PATTERN,
  clientSuppliedOpencodeSession,
  forwardOpencodeClientHeaders,
  satisfiesOpencodeUserAgentContract,
} from "../../open-sse/utils/opencodeHeaders.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

const CHAT_BODY = () => ({
  model: "nemotron-3.5-lightning-free",
  messages: [{ role: "user", content: "hi" }],
});
const RESPONSES_BODY = () => ({
  model: "muse-spark-1.3-contributor-free",
  input: [{ role: "user", content: "hi" }],
});

test("the contract applies to free-tier models on the gated surface only", () => {
  assert.equal(
    requiresFreeTierRequestContract("zen", "opencode", "nemotron-3.5-lightning-free"),
    true
  );
  assert.equal(requiresFreeTierRequestContract("zen", "opencode-zen", "big-pickle"), true);
  assert.equal(
    requiresFreeTierRequestContract("zen", "opencode-zen", "muse-spark-1.3-contributor-free"),
    true
  );
  assert.equal(requiresFreeTierRequestContract("zen", "opencode-zen", "gpt-5.6-luna"), false);
  // The other surface refuses a request that carries tools rather than one that does not
  // (upstream anomalyco/opencode#44300 and #44382), so it is never brought up to this
  // contract — including for the free model its registry declares.
  assert.equal(requiresFreeTierRequestContract("go", "opencode-go", "big-pickle"), false);
  assert.equal(requiresFreeTierRequestContract("go", "opencode-go", "ox-alpha-free"), false);
  assert.equal(requiresFreeTierRequestContract("other", "groq", "big-pickle"), false);
});

test("the surface is told apart by base url, so the `oc` alias needs no special case", () => {
  assert.equal(surfaceFromBaseUrl("https://opencode.ai/zen/v1"), "zen");
  assert.equal(surfaceFromBaseUrl("https://opencode.ai/zen/go/v1"), "go");
  assert.equal(surfaceFromBaseUrl("https://api.groq.com/openai/v1"), "other");
  assert.equal(surfaceFromBaseUrl(undefined), "other");
});

test("chat completions: the contract adds streaming and a placeholder tool, and no tool_choice", () => {
  const body = applyFreeTierRequestContract(CHAT_BODY(), "openai") as Record<string, unknown>;
  assert.equal(body.stream, true);
  const tools = body.tools as Array<{ type: string; function: { name: string } }>;
  assert.equal(tools.length, 1);
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "_noop");
  // The upstream answers 400 `only "auto" is supported for tool_choice` (measured
  // 2026-09-18 on the Chat Completions surface), so none is imposed here either.
  assert.equal("tool_choice" in body, false);
});

test("the placeholder carries the names it is given, one entry each", () => {
  const body = applyFreeTierRequestContract(CHAT_BODY(), "openai", [
    "glob",
    "grep",
    "read",
  ]) as Record<string, unknown>;
  const tools = body.tools as Array<{ function: { name: string; parameters: object } }>;
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["glob", "grep", "read"]
  );
  // Names only: an empty parameter object, so a borrowed name is a list entry rather than
  // a tool the model could usefully call.
  assert.deepEqual(tools[0].function.parameters, { type: "object", properties: {} });
});

test("responses: several placeholder names keep the flat shape and no tool_choice", () => {
  const body = applyFreeTierRequestContract(RESPONSES_BODY(), "openai-responses", [
    "glob",
    "grep",
  ]) as Record<string, unknown>;
  const tools = body.tools as Array<{ type: string; name: string }>;
  assert.deepEqual(
    tools.map((t) => t.name),
    ["glob", "grep"]
  );
  assert.equal("tool_choice" in body, false);
});

test("an empty tools array counts as no tools", () => {
  // It is the exact shape the upstream refuses — the official client sends it on its own
  // compaction path (upstream anomalyco/opencode#49433).
  const body = applyFreeTierRequestContract({ ...CHAT_BODY(), tools: [] }, "openai") as Record<
    string,
    unknown
  >;
  assert.equal((body.tools as unknown[]).length, 1);
});

test("responses: the placeholder tool is flat and tool_choice stays absent", () => {
  // The upstream Responses surface rejects tool_choice with a 400 invalid_request_error
  // (measured on both "none" and {type:"none"}), so the contract must not send it there.
  const body = applyFreeTierRequestContract(RESPONSES_BODY(), "openai-responses") as Record<
    string,
    unknown
  >;
  assert.equal(body.stream, true);
  const tools = body.tools as Array<{ type: string; name: string }>;
  assert.equal(tools.length, 1);
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].name, "_noop");
  assert.equal("tool_choice" in body, false);
});

test("client-supplied tools are never replaced, and no tool_choice is imposed", () => {
  const clientTools = [
    { type: "function", function: { name: "search", parameters: { type: "object" } } },
  ];
  const body = applyFreeTierRequestContract(
    { ...CHAT_BODY(), tools: clientTools },
    "openai"
  ) as Record<string, unknown>;
  assert.deepEqual(body.tools, clientTools);
  assert.equal("tool_choice" in body, false);
  assert.equal(body.stream, true);
});

test("a client tool_choice is preserved", () => {
  const body = applyFreeTierRequestContract(
    { ...CHAT_BODY(), tool_choice: "auto" },
    "openai"
  ) as Record<string, unknown>;
  assert.equal(body.tool_choice, "auto");
});

test("applying the contract twice does not duplicate the placeholder tool", () => {
  const once = applyFreeTierRequestContract(CHAT_BODY(), "openai");
  const twice = applyFreeTierRequestContract(once, "openai") as Record<string, unknown>;
  assert.equal((twice.tools as unknown[]).length, 1);
});

test("an unknown body format only gets the streaming flag", () => {
  const body = applyFreeTierRequestContract(CHAT_BODY(), "claude") as Record<string, unknown>;
  assert.equal(body.stream, true);
  assert.equal("tools" in body, false);
  assert.equal("tool_choice" in body, false);
});

test("the user-agent contract accepts a versioned opencode client and rejects the rest", () => {
  assert.equal(satisfiesOpencodeUserAgentContract(DEFAULT_OPENCODE_USER_AGENT), true);
  assert.equal(satisfiesOpencodeUserAgentContract("opencode/1.17.0"), true);
  assert.equal(satisfiesOpencodeUserAgentContract("opencode/beta/1.18.31/cli"), true);
  assert.equal(
    satisfiesOpencodeUserAgentContract("opencode/1.18.14 ai-sdk/provider-utils/4.0.23"),
    true
  );
  // Measured: 1.16.0 answers 426 UpgradeRequired, so it does not satisfy the contract.
  assert.equal(satisfiesOpencodeUserAgentContract("opencode/1.16.0"), false);
  assert.equal(satisfiesOpencodeUserAgentContract("opencode-cli/1.0.0"), false);
  assert.equal(satisfiesOpencodeUserAgentContract("opencode"), false);
  assert.equal(satisfiesOpencodeUserAgentContract("curl/8.5.0"), false);
  assert.equal(satisfiesOpencodeUserAgentContract(undefined), false);
});

test("synthesized identity headers carry a canonical session and request id", () => {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headers,
    {},
    {
      cliDefaults: {
        userAgent: DEFAULT_OPENCODE_USER_AGENT,
        client: "desktop",
        project: "global",
      },
      sessionBody: CHAT_BODY(),
    }
  );
  assert.equal(headers["User-Agent"], DEFAULT_OPENCODE_USER_AGENT);
  assert.match(headers["x-opencode-session"] ?? "", OPENCODE_SESSION_PATTERN);
  assert.match(headers["x-opencode-request"] ?? "", /^msg_[0-9a-f]{12}[0-9A-Za-z]{14}$/);
});

test("the same conversation keeps the same session id, a different one does not", () => {
  const sessionFor = (body: Record<string, unknown>) => {
    const headers: Record<string, string> = {};
    forwardOpencodeClientHeaders(
      headers,
      {},
      {
        cliDefaults: {
          userAgent: DEFAULT_OPENCODE_USER_AGENT,
          client: "desktop",
          project: "global",
        },
        sessionBody: body,
      }
    );
    return headers["x-opencode-session"];
  };
  const first = sessionFor(CHAT_BODY());
  assert.equal(sessionFor(CHAT_BODY()), first, "conversation-stable, so upstream caching hits");
  assert.notEqual(
    sessionFor({ ...CHAT_BODY(), messages: [{ role: "user", content: "other" }] }),
    first
  );
});

test("a client session already in the canonical shape is preserved", () => {
  const canonical = "ses_0123456789abABCDEFGHIJKLMN";
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headers,
    { "x-opencode-session": canonical },
    {
      cliDefaults: {
        userAgent: DEFAULT_OPENCODE_USER_AGENT,
        client: "desktop",
        project: "global",
      },
    }
  );
  assert.equal(headers["x-opencode-session"], canonical);
});

test("a foreign client session is translated into the canonical shape, deterministically", () => {
  const translate = () => {
    const headers: Record<string, string> = {};
    forwardOpencodeClientHeaders(
      headers,
      { "x-opencode-session": "conv-42" },
      {
        cliDefaults: {
          userAgent: DEFAULT_OPENCODE_USER_AGENT,
          client: "desktop",
          project: "global",
        },
      }
    );
    return headers["x-opencode-session"];
  };
  const translated = translate();
  assert.match(translated ?? "", OPENCODE_SESSION_PATTERN);
  assert.equal(translate(), translated, "same client session, same upstream session");
});

test("buildHeaders: a free-tier request accepts an event stream even when the client wants JSON", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  const headers = executor.buildHeaders(null, false, null, "nemotron-3.5-lightning-free");
  assert.equal(headers["Accept"], "text/event-stream");
  assert.equal(headers["User-Agent"], DEFAULT_OPENCODE_USER_AGENT);
  assert.match(headers["x-opencode-session"] ?? "", OPENCODE_SESSION_PATTERN);
});

test("buildHeaders: a paid model keeps the client's non-streaming expectation", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  const headers = executor.buildHeaders(null, false, null, "gpt-5.6-luna");
  assert.equal(headers["Accept"], undefined);
});

test("transformRequest: the contract is applied for a free model and skipped for a paid one", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  const free = executor.transformRequest(
    "nemotron-3.5-lightning-free",
    CHAT_BODY(),
    false,
    null as never
  ) as Record<string, unknown>;
  assert.equal(free.stream, true);
  assert.equal((free.tools as unknown[]).length, 1);

  const paid = executor.transformRequest(
    "gpt-5.6-luna",
    { model: "gpt-5.6-luna", messages: [{ role: "user", content: "hi" }] },
    false,
    null as never
  ) as Record<string, unknown>;
  assert.equal("tools" in paid, false);
  assert.equal(paid.stream, undefined);
});

test("a JSON caller gets a JSON body back even though the upstream request was streamed", async () => {
  // The contract forces streaming, so the executor owes every caller that asked for JSON a
  // JSON body — handleChatCore can buffer an event stream, but the other consumers
  // (compression judge, token counting) call execute() and read response.json() directly.
  const executor = new OpencodeExecutor("opencode-zen");
  const originalFetch = globalThis.fetch;
  const seen: Array<Record<string, unknown>> = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    seen.push(JSON.parse(String(init?.body ?? "{}")));
    const sse =
      'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"hi"},"finish_reason":null}]}\n\n' +
      'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n' +
      "data: [DONE]\n\n";
    return new Response(sse, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof globalThis.fetch;

  try {
    const result = (await executor.execute({
      model: "nemotron-3.5-lightning-free",
      body: { model: "nemotron-3.5-lightning-free", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      signal: null,
      credentials: { apiKey: "k", accessToken: null, connectionId: "c" },
      log: { debug() {}, info() {}, warn() {}, error() {} },
    })) as { response: Response };

    assert.equal(seen[0]?.stream, true, "the upstream request was streamed");
    assert.equal((seen[0]?.tools as unknown[]).length, 1, "and carried the placeholder tool");
    assert.match(result.response.headers.get("content-type") ?? "", /application\/json/);
    const json = (await result.response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    assert.equal(json.choices?.[0]?.message?.content, "hi");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a streaming caller still receives the event stream untouched", async () => {
  const executor = new OpencodeExecutor("opencode-zen");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response('data: {"choices":[{"delta":{"content":"hi"}}]}\n\n', {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    })) as typeof globalThis.fetch;
  try {
    const result = (await executor.execute({
      model: "nemotron-3.5-lightning-free",
      body: {
        model: "nemotron-3.5-lightning-free",
        messages: [{ role: "user", content: "hi" }],
        stream: true,
      },
      stream: true,
      signal: null,
      credentials: { apiKey: "k", accessToken: null, connectionId: "c" },
      log: { debug() {}, info() {}, warn() {}, error() {} },
    })) as { response: Response };
    assert.match(result.response.headers.get("content-type") ?? "", /text\/event-stream/);
    await result.response.body?.cancel();
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a gated request repairs a stale configured user-agent, a non-gated one keeps it", () => {
  // An operator still carrying the previous default in OPENCODE_USER_AGENT would otherwise
  // keep sending `opencode`, which the free tier refuses. Outside the gate the configured
  // value is still honoured verbatim (#5997).
  const saved = process.env.OPENCODE_USER_AGENT;
  process.env.OPENCODE_USER_AGENT = "opencode";
  try {
    const executor = new OpencodeExecutor("opencode-zen");
    const gated = executor.buildHeaders(null, true, null, "nemotron-3.5-lightning-free");
    assert.equal(gated["User-Agent"], DEFAULT_OPENCODE_USER_AGENT);
    assert.ok(satisfiesOpencodeUserAgentContract(gated["User-Agent"]));

    const paid = executor.buildHeaders(null, true, null, "gpt-5.6-luna");
    assert.equal(paid["User-Agent"], "opencode");
  } finally {
    if (saved === undefined) delete process.env.OPENCODE_USER_AGENT;
    else process.env.OPENCODE_USER_AGENT = saved;
  }
});

test("responses: two conversations on the same model get different session ids", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "openai-responses";
  const sessionFor = (text: string) =>
    executor.buildHeaders(null, true, null, "muse-spark-1.3-contributor-free", undefined, {
      model: "muse-spark-1.3-contributor-free",
      input: [{ role: "user", content: text }],
    })["x-opencode-session"];

  const first = sessionFor("first conversation");
  assert.match(first ?? "", OPENCODE_SESSION_PATTERN);
  assert.equal(sessionFor("first conversation"), first, "same conversation, same session");
  assert.notEqual(
    sessionFor("a completely different opening message"),
    first,
    "the Responses surface carries the conversation under input, not messages"
  );
});

// ── The placeholder is resolved from what the upstream is currently accepting ──────────

test("the opt-out switches the body half off and leaves the scope predicate alone", () => {
  const previous = process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT;
  try {
    process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT = "off";
    assert.equal(
      requiresFreeTierRequestContract("zen", "opencode", "nemotron-3.5-lightning-free"),
      false
    );
    assert.equal(isGatedFreeTierRequest("zen", "opencode", "nemotron-3.5-lightning-free"), true);
    const { body, attempt } = prepareFreeTierRequest(
      CHAT_BODY(),
      "openai",
      "zen",
      "opencode",
      "nemotron-3.5-lightning-free"
    );
    assert.equal(attempt, null);
    assert.equal("tools" in (body as Record<string, unknown>), false);
    assert.equal("stream" in (body as Record<string, unknown>), false);
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT;
    else process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT = previous;
  }
});

test("configured placeholder names are parsed, bad entries dropped, unset stays empty", () => {
  const previous = process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
  try {
    delete process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
    assert.deepEqual(configuredPlaceholderToolNames(), []);
    process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = " glob , grep ,,9bad, glob ,ok-name";
    assert.deepEqual(configuredPlaceholderToolNames(), ["glob", "grep", "ok-name"]);
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
    else process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = previous;
  }
});

test("with nothing observed and nothing configured, the built-in placeholder is used", () => {
  _resetToolObservationForTests();
  const { body, attempt } = prepareFreeTierRequest(
    CHAT_BODY(),
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free"
  );
  const tools = (body as Record<string, unknown>).tools as Array<{ function: { name: string } }>;
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["_noop"]
  );
  // Nothing was borrowed, so a refusal here must not be charged against the store.
  assert.equal(attempt?.borrowed, false);
});

test("an accepted request teaches the names it carried, and a later bare request borrows them", () => {
  _resetToolObservationForTests();
  const withTools = {
    ...CHAT_BODY(),
    tools: [
      { type: "function", function: { name: "glob" } },
      { type: "function", function: { name: "grep" } },
    ],
  };
  const first = prepareFreeTierRequest(
    withTools,
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free"
  );
  assert.deepEqual(first.attempt?.clientToolNames, ["glob", "grep"]);
  noteFreeTierOutcome(first.attempt, true);
  assert.deepEqual(getObservedToolNames("opencode", "nemotron-3.5-lightning-free"), [
    "glob",
    "grep",
  ]);

  const second = prepareFreeTierRequest(
    CHAT_BODY(),
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free"
  );
  const tools = (second.body as Record<string, unknown>).tools as Array<{
    function: { name: string };
  }>;
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["glob", "grep"]
  );
  assert.equal(second.attempt?.borrowed, true);
});

test("what one model learns stays with that model", () => {
  // Asserts an absence, so it stays green if the store is removed entirely — it guards
  // against cross-model leakage, not against the mechanism disappearing.
  _resetToolObservationForTests();
  const learned = prepareFreeTierRequest(
    { ...CHAT_BODY(), tools: [{ type: "function", function: { name: "glob" } }] },
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free"
  );
  noteFreeTierOutcome(learned.attempt, true);
  assert.equal(getObservedToolNames("opencode", "big-pickle"), null);
  assert.equal(getObservedToolNames("opencode-zen", "nemotron-3.5-lightning-free"), null);
});

test("a borrowed set is dropped after three refusals in a row, not after one", () => {
  _resetToolObservationForTests();
  const learned = prepareFreeTierRequest(
    { ...CHAT_BODY(), tools: [{ type: "function", function: { name: "glob" } }] },
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free"
  );
  noteFreeTierOutcome(learned.attempt, true);

  const borrow = () =>
    prepareFreeTierRequest(CHAT_BODY(), "openai", "zen", "opencode", "nemotron-3.5-lightning-free")
      .attempt;
  // One refusal is not proof: the same body was refused and then accepted minutes apart on
  // a free model (measured 2026-09-18), so a single verdict must not clear the entry.
  noteFreeTierOutcome(borrow(), false);
  assert.deepEqual(getObservedToolNames("opencode", "nemotron-3.5-lightning-free"), ["glob"]);
  noteFreeTierOutcome(borrow(), false);
  assert.deepEqual(getObservedToolNames("opencode", "nemotron-3.5-lightning-free"), ["glob"]);
  noteFreeTierOutcome(borrow(), false);
  assert.equal(getObservedToolNames("opencode", "nemotron-3.5-lightning-free"), null);
});

test("an acceptance resets the refusal streak", () => {
  _resetToolObservationForTests();
  const withTools = {
    ...CHAT_BODY(),
    tools: [{ type: "function", function: { name: "glob" } }],
  };
  const learned = prepareFreeTierRequest(
    withTools,
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free"
  );
  noteFreeTierOutcome(learned.attempt, true);
  const borrow = () =>
    prepareFreeTierRequest(CHAT_BODY(), "openai", "zen", "opencode", "nemotron-3.5-lightning-free")
      .attempt;
  noteFreeTierOutcome(borrow(), false);
  noteFreeTierOutcome(borrow(), false);
  noteFreeTierOutcome(
    prepareFreeTierRequest(withTools, "openai", "zen", "opencode", "nemotron-3.5-lightning-free")
      .attempt,
    true
  );
  noteFreeTierOutcome(borrow(), false);
  assert.deepEqual(getObservedToolNames("opencode", "nemotron-3.5-lightning-free"), ["glob"]);
});

test("a refusal on the caller's own tools never touches the store", () => {
  _resetToolObservationForTests();
  const withTools = {
    ...CHAT_BODY(),
    tools: [{ type: "function", function: { name: "glob" } }],
  };
  noteFreeTierOutcome(
    prepareFreeTierRequest(withTools, "openai", "zen", "opencode", "nemotron-3.5-lightning-free")
      .attempt,
    true
  );
  for (let i = 0; i < 5; i++) {
    const own = prepareFreeTierRequest(
      withTools,
      "openai",
      "zen",
      "opencode",
      "nemotron-3.5-lightning-free"
    );
    assert.equal(own.attempt?.borrowed, false);
    noteFreeTierOutcome(own.attempt, false);
  }
  assert.deepEqual(getObservedToolNames("opencode", "nemotron-3.5-lightning-free"), ["glob"]);
});

test("the other surface is left alone entirely", () => {
  // Scope guard only. That `/zen/go/v1` refuses a request carrying tools comes from
  // upstream anomalyco/opencode#44300 and #44382, not from a measurement here: this
  // installation exposes no model on that surface.
  _resetToolObservationForTests();
  const { body, attempt } = prepareFreeTierRequest(
    CHAT_BODY(),
    "openai",
    "go",
    "opencode-go",
    "ox-alpha-free"
  );
  assert.equal(attempt, null);
  assert.equal("tools" in (body as Record<string, unknown>), false);
  assert.equal("stream" in (body as Record<string, unknown>), false);
});

// ── A conversation repairs its own service requests ───────────────────────────────────

const SES_A = "ses_0123456789abABCDEFGHIJKLMN";
const SES_B = "ses_fedcba987654ZYXWVUTSRQPONM";

test("a session's service request borrows the list its own build request declared", () => {
  _resetToolObservationForTests();
  // The official client sends its build requests with a full tool list and its title and
  // compaction requests with none, on the same session (upstream
  // anomalyco/opencode#49433). The second gets back what the first declared.
  const build = prepareFreeTierRequest(
    {
      ...CHAT_BODY(),
      tools: [
        { type: "function", function: { name: "glob" } },
        { type: "function", function: { name: "grep" } },
      ],
    },
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free",
    SES_A
  );
  noteFreeTierOutcome(build.attempt, true);

  const title = prepareFreeTierRequest(
    CHAT_BODY(),
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free",
    SES_A
  );
  const tools = (title.body as Record<string, unknown>).tools as Array<{
    function: { name: string };
  }>;
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["glob", "grep"]
  );
  assert.equal(title.attempt?.borrowed, true);
});

test("a session's own list wins over the shared one", () => {
  _resetToolObservationForTests();
  // Order matters: the session entry is recorded FIRST and the shared entry overwritten
  // afterwards by another conversation, so a store keyed by model alone would answer
  // "shared" here and this case would fail.
  const own = prepareFreeTierRequest(
    { ...CHAT_BODY(), tools: [{ type: "function", function: { name: "own" } }] },
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free",
    SES_A
  );
  noteFreeTierOutcome(own.attempt, true);
  const shared = prepareFreeTierRequest(
    { ...CHAT_BODY(), tools: [{ type: "function", function: { name: "shared" } }] },
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free",
    SES_B
  );
  noteFreeTierOutcome(shared.attempt, true);

  const borrowed = prepareFreeTierRequest(
    CHAT_BODY(),
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free",
    SES_A
  );
  const tools = (borrowed.body as Record<string, unknown>).tools as Array<{
    function: { name: string };
  }>;
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["own"]
  );
});

test("a session that has declared nothing yet falls back to the shared entry", () => {
  _resetToolObservationForTests();
  noteFreeTierOutcome(
    prepareFreeTierRequest(
      { ...CHAT_BODY(), tools: [{ type: "function", function: { name: "shared" } }] },
      "openai",
      "zen",
      "opencode",
      "nemotron-3.5-lightning-free",
      SES_A
    ).attempt,
    true
  );
  const fresh = prepareFreeTierRequest(
    CHAT_BODY(),
    "openai",
    "zen",
    "opencode",
    "nemotron-3.5-lightning-free",
    SES_B
  );
  const tools = (fresh.body as Record<string, unknown>).tools as Array<{
    function: { name: string };
  }>;
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["shared"]
  );
});

test("a client session id is read case-insensitively, a synthesized one is not borrowed from", () => {
  assert.equal(clientSuppliedOpencodeSession({ "X-OpenCode-Session": SES_A }), SES_A);
  assert.equal(clientSuppliedOpencodeSession({ "x-session-id": SES_B }), SES_B);
  assert.equal(clientSuppliedOpencodeSession({ "x-opencode-session": "   " }), undefined);
  assert.equal(clientSuppliedOpencodeSession({}), undefined);
  assert.equal(clientSuppliedOpencodeSession(undefined), undefined);
});

test("mergeClientToolsWithObserved: keeps client tools first and appends missing observed names with empty schemas [free-tier-observed-tools]", () => {
  _resetToolObservationForTests();
  const body = {
    ...CHAT_BODY(),
    tools: [
      { type: "function", function: { name: "glob", parameters: { type: "object" } } },
      { type: "function", function: { name: "read", parameters: { type: "object" } } },
    ],
  };
  const merged = mergeClientToolsWithObserved(body, "openai", "opencode", "big-pickle", undefined, [
    "read",
    "edit",
  ]);
  const tools = (merged as Record<string, unknown>).tools as Array<{
    function: { name: string; parameters: object };
  }>;
  assert.deepEqual(
    tools.map((t) => t.function.name),
    ["glob", "read", "edit"]
  );
  // Appended entries are list entries, not callable tools.
  assert.deepEqual(tools[2].function.parameters, { type: "object", properties: {} });
});

test("mergeClientToolsWithObserved: leaves the body untouched when nothing observed [free-tier-observed-tools]", () => {
  _resetToolObservationForTests();
  const body = {
    ...CHAT_BODY(),
    tools: [{ type: "function", function: { name: "glob", parameters: { type: "object" } } }],
  };
  assert.equal(
    mergeClientToolsWithObserved(body, "openai", "opencode", "big-pickle", undefined, []),
    body
  );
});
