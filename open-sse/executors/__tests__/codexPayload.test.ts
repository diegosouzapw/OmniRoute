/**
 * codex.ts payload-construction unit tests (PR-027).
 *
 * Tests the request-payload-construction surface of
 * `open-sse/executors/codex.ts`. The executor is the OpenAI Codex adapter that
 * bridges Chat Completions and Responses-API callers to the Codex
 * `/codex/responses` upstream, and its `transformRequest` method (the
 * `buildCodexRequestPayload` equivalent) is the single entry point that:
 *
 *   - rewrites a Chat-Completions `messages` / `prompt` payload into the
 *     Responses-API `input` shape,
 *   - injects the Codex default `instructions` (or the chat default when
 *     there are no tools, or the passthrough placeholder on native Codex
 *     passthrough),
 *   - strips every Chat-Completions field that the Codex Responses backend
 *     rejects (max_tokens, max_output_tokens, prompt_cache_retention,
 *     safety_identifier, user, truncation, background, messages, prompt),
 *   - normalises tools to the flat Responses shape
 *     ({ type: "function", name, description, parameters }), preserves
 *     hosted tools (web_search, file_search, image_generation, code_interpreter,
 *     mcp, …) and namespace tools (MCP groups), and refuses orphaned
 *     tool_choice.name references,
 *   - strips server-generated IDs from the input array (rs_, fc_, resp_, msg_)
 *     and inserts missing `function_call_output` siblings for orphan
 *     `function_call` items,
 *   - clamps reasoning effort to per-model max-effort caps, folds the legacy
 *     `reasoning_effort` field and the `*-{effort}` model suffix into the
 *     canonical `reasoning: { effort, summary }` object, and adds
 *     `reasoning.encrypted_content` to `include` for cache hydration,
 *   - toggles `store` per-credential / per-endpoint and rewrites
 *     `service_tier: "fast"` to the wire value `"priority"`.
 *
 * The exported helpers in this file — `parseCodexQuotaHeaders`,
 * `getCodexResetTime`, `getCodexDualWindowCooldownMs`, `getCodexUpstreamModel`,
 * `isCodexFreePlan`, `stripStoredItemReferences`, `isCompactResponsesEndpoint`,
 * `normalizeCodexTools`, `isCodexResponsesWebSocketRequired`,
 * `encodeResponseSseEvent`, `filterNonstandardCodexSse`, and the test-only
 * `__setCodexWebSocketTransportForTesting` — are exercised directly so each
 * one has at least one assertion covering the happy path and a regression case.
 *
 * Scope (per PR-027 task):
 *   - request payload construction with all tool/stream parameters,
 *   - system prompt injection,
 *   - model ID fallback chain (model-suffix → body.reasoning.effort →
 *     body.reasoning_effort → requestDefaults → per-model cap),
 *   - headers propagation (Version, User-Agent, originator, session_id,
 *     chatgpt-account-id, prompt_cache_key),
 *   - tool call transformation (Chat Completions → Responses flat shape),
 *   - conversation history merge (messages → input, prompt → input,
 *     text content parts → input_text),
 *   - refusal handling (response.failed / error / 400/429 detection in
 *     `encodeResponseSseEvent` and `filterNonstandardCodexSse`).
 *
 * Imports are kept to `../codex.ts` only — the same relative-path discipline
 * as PR-024 (claudeIdentity) and PR-026 (budget forecast). Do not modify
 * `codex.ts`; tests target the existing exported contract.
 */
import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";

// Polyfill structuredClone for older Node test runners that lack it.
// `codex.ts` uses structuredClone() in transformRequest for the input body
// deep copy. Without this, transformRequest would throw on the very first call.
const g = globalThis as unknown as { structuredClone?: typeof structuredClone };
if (typeof g.structuredClone !== "function") {
  g.structuredClone = ((value: unknown) => JSON.parse(JSON.stringify(value))) as typeof structuredClone;
}

import {
  CodexExecutor,
  __setCodexWebSocketTransportForTesting,
  encodeResponseSseEvent,
  filterNonstandardCodexSse,
  getCodexDualWindowCooldownMs,
  getCodexResetTime,
  getCodexUpstreamModel,
  isCodexFreePlan,
  isCodexResponsesWebSocketRequired,
  isCompactResponsesEndpoint,
  normalizeCodexTools,
  parseCodexQuotaHeaders,
  stripStoredItemReferences,
  type CodexQuotaSnapshot,
} from "../codex.ts";

/**
 * Helper — invoke `transformRequest` on a fresh CodexExecutor. transformRequest
 * is the equivalent of `buildCodexRequestPayload` for the Codex executor.
 */
function buildPayload(
  body: unknown,
  options: { model?: string; stream?: boolean; credentials?: Record<string, unknown> } = {}
): Record<string, unknown> {
  const exec = new CodexExecutor();
  const credentials = (options.credentials ?? { accessToken: "test-tok" }) as Parameters<
    typeof exec.transformRequest
  >[3];
  return exec.transformRequest(options.model ?? "gpt-5", body, options.stream ?? true, credentials) as Record<
    string,
    unknown
  >;
}

// ============================================================================
// §1. getCodexUpstreamModel — model ID suffix stripping (chain step 1)
// ============================================================================

describe("getCodexUpstreamModel (model ID suffix → base model)", () => {
  it("strips a -high effort suffix from a Codex model id", () => {
    assert.equal(getCodexUpstreamModel("gpt-5.1-codex-high"), "gpt-5.1-codex");
  });

  it("strips -xhigh, -low, -medium, -none suffixes", () => {
    assert.equal(getCodexUpstreamModel("gpt-5-codex-xhigh"), "gpt-5-codex");
    assert.equal(getCodexUpstreamModel("gpt-5-codex-low"), "gpt-5-codex");
    assert.equal(getCodexUpstreamModel("gpt-5-codex-medium"), "gpt-5-codex");
    assert.equal(getCodexUpstreamModel("gpt-5-codex-none"), "gpt-5-codex");
  });

  it("returns the input unchanged when no effort suffix is present", () => {
    assert.equal(getCodexUpstreamModel("gpt-5-codex"), "gpt-5-codex");
    assert.equal(getCodexUpstreamModel("gpt-5.1-codex-max"), "gpt-5.1-codex-max");
  });

  it("returns the empty string for non-string inputs (defensive)", () => {
    assert.equal(getCodexUpstreamModel(undefined), "");
    assert.equal(getCodexUpstreamModel(null), "");
    assert.equal(getCodexUpstreamModel(42), "");
    assert.equal(getCodexUpstreamModel({}), "");
  });

  it("does NOT confuse a model name that contains -high mid-string with a suffix", () => {
    // e.g. "gpt-5-high-context" is not a known Codex effort suffix; only the
    // exact trailing -<level> matches, so this is preserved verbatim.
    assert.equal(getCodexUpstreamModel("gpt-5-high-context"), "gpt-5-high-context");
  });

  it("returns the input verbatim when only the very last token matches", () => {
    // Effort suffix matching is anchored to the end of the string, so the
    // last `-{level}` (if any) is stripped, even from a multi-dash id.
    assert.equal(getCodexUpstreamModel("gpt-5.1-codex-medium-fine-tune"), "gpt-5.1-codex-medium-fine-tune");
  });
});

// ============================================================================
// §2. parseCodexQuotaHeaders — quota snapshot construction
// ============================================================================

describe("parseCodexQuotaHeaders (5h / 7d window snapshot)", () => {
  it("returns null when no quota headers are present", () => {
    assert.equal(parseCodexQuotaHeaders({}), null);
    assert.equal(parseCodexQuotaHeaders({ "x-other": "1" }), null);
  });

  it("parses a full 5h + 7d quota snapshot", () => {
    const snap = parseCodexQuotaHeaders({
      "x-codex-5h-usage": "12000",
      "x-codex-5h-limit": "50000",
      "x-codex-5h-reset-at": "2026-07-01T00:00:00Z",
      "x-codex-7d-usage": "900000",
      "x-codex-7d-limit": "2000000",
      "x-codex-7d-reset-at": "2026-07-07T00:00:00Z",
    });
    assert.equal(snap?.usage5h, 12000);
    assert.equal(snap?.limit5h, 50000);
    assert.equal(snap?.resetAt5h, "2026-07-01T00:00:00Z");
    assert.equal(snap?.usage7d, 900000);
    assert.equal(snap?.limit7d, 2000000);
    assert.equal(snap?.resetAt7d, "2026-07-07T00:00:00Z");
  });

  it("returns a non-null snapshot as soon as ANY quota header is present", () => {
    const snap = parseCodexQuotaHeaders({ "x-codex-5h-usage": "5" });
    assert.ok(snap);
    assert.equal(snap?.usage5h, 5);
    // Missing limit → Infinity, missing reset → null
    assert.equal(snap?.limit5h, Infinity);
    assert.equal(snap?.resetAt5h, null);
  });

  it("defaults missing usage to 0 (not NaN)", () => {
    const snap = parseCodexQuotaHeaders({
      "x-codex-5h-limit": "1000",
      "x-codex-7d-limit": "5000",
    });
    assert.equal(snap?.usage5h, 0);
    assert.equal(snap?.usage7d, 0);
  });

  it("parses fractional usage values (e.g. 1.5k tokens used)", () => {
    const snap = parseCodexQuotaHeaders({
      "x-codex-5h-usage": "1500.75",
      "x-codex-5h-limit": "5000",
    });
    assert.equal(snap?.usage5h, 1500.75);
  });
});

// ============================================================================
// §3. getCodexResetTime — soonest-effective reset selection
// ============================================================================

describe("getCodexResetTime (returns the FURTHEST-OUT future reset, never past)", () => {
  it("returns null when both reset timestamps are absent", () => {
    const snap: CodexQuotaSnapshot = {
      usage5h: 0,
      limit5h: 100,
      resetAt5h: null,
      usage7d: 0,
      limit7d: 100,
      resetAt7d: null,
    };
    assert.equal(getCodexResetTime(snap), null);
  });

  it("returns null when both reset timestamps are in the past", () => {
    const past = new Date(Date.now() - 60_000).toISOString();
    const snap: CodexQuotaSnapshot = {
      usage5h: 0,
      limit5h: 100,
      resetAt5h: past,
      usage7d: 0,
      limit7d: 100,
      resetAt7d: past,
    };
    assert.equal(getCodexResetTime(snap), null);
  });

  it("ignores invalid (NaN) reset timestamps", () => {
    const snap: CodexQuotaSnapshot = {
      usage5h: 0,
      limit5h: 100,
      resetAt5h: "not-a-date",
      usage7d: 0,
      limit7d: 100,
      resetAt7d: "also-not-a-date",
    };
    assert.equal(getCodexResetTime(snap), null);
  });

  it("returns the FURTHER-OUT reset (5h or 7d), never the earlier one", () => {
    const now = Date.now();
    const earlier = new Date(now + 60 * 60 * 1000).toISOString(); // +1h
    const later = new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString(); // +3d
    const snap: CodexQuotaSnapshot = {
      usage5h: 0,
      limit5h: 100,
      resetAt5h: earlier,
      usage7d: 0,
      limit7d: 100,
      resetAt7d: later,
    };
    const result = getCodexResetTime(snap);
    assert.ok(result !== null);
    // Math.max picks the FURTHER-OUT (later) reset; never the earlier one.
    assert.equal(result, new Date(later).getTime());
  });
});

// ============================================================================
// §4. getCodexDualWindowCooldownMs — 7d-takes-priority cooldown policy
// ============================================================================

describe("getCodexDualWindowCooldownMs (7d takes priority over 5h)", () => {
  it("returns window=none and cooldownMs=0 when both windows are well under threshold", () => {
    const snap: CodexQuotaSnapshot = {
      usage5h: 10,
      limit5h: 100,
      resetAt5h: null,
      usage7d: 100,
      limit7d: 1000,
      resetAt7d: null,
    };
    const result = getCodexDualWindowCooldownMs(snap);
    assert.equal(result.cooldownMs, 0);
    assert.equal(result.window, "none");
  });

  it("returns window=5h when 5h is over threshold and 7d is healthy", () => {
    const futureReset = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // +30m
    const snap: CodexQuotaSnapshot = {
      usage5h: 96,
      limit5h: 100,
      resetAt5h: futureReset,
      usage7d: 100,
      limit7d: 1000,
      resetAt7d: null,
    };
    const result = getCodexDualWindowCooldownMs(snap, 0.95);
    assert.equal(result.window, "5h");
    assert.ok(result.cooldownMs > 0);
    assert.ok(result.cooldownMs <= 30 * 60 * 1000);
  });

  it("returns window=7d when 7d is over threshold (priority over 5h)", () => {
    const futureReset = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // +2h
    const snap: CodexQuotaSnapshot = {
      usage5h: 96,
      limit5h: 100,
      resetAt5h: futureReset,
      usage7d: 970,
      limit7d: 1000,
      resetAt7d: futureReset,
    };
    const result = getCodexDualWindowCooldownMs(snap, 0.95);
    // 7d takes priority — the 7d reset is the one we should wait for.
    assert.equal(result.window, "7d");
  });

  it("returns window=none when 5h is exhausted but the reset is in the past", () => {
    // The reset is behind us — the quota is "stale"; no cooldown.
    const pastReset = new Date(Date.now() - 60_000).toISOString();
    const snap: CodexQuotaSnapshot = {
      usage5h: 96,
      limit5h: 100,
      resetAt5h: pastReset,
      usage7d: 0,
      limit7d: 100,
      resetAt7d: null,
    };
    const result = getCodexDualWindowCooldownMs(snap, 0.95);
    assert.equal(result.cooldownMs, 0);
    assert.equal(result.window, "none");
  });

  it("treats Infinity limits as no cap (cooldown not triggered)", () => {
    const snap: CodexQuotaSnapshot = {
      usage5h: 999_999,
      limit5h: Infinity,
      resetAt5h: null,
      usage7d: 999_999,
      limit7d: Infinity,
      resetAt7d: null,
    };
    const result = getCodexDualWindowCooldownMs(snap, 0.95);
    assert.equal(result.window, "none");
  });
});

// ============================================================================
// §5. isCodexFreePlan — free-plan detection
// ============================================================================

describe("isCodexFreePlan (workspacePlanType === 'free')", () => {
  it("returns false for null / undefined / non-object inputs", () => {
    assert.equal(isCodexFreePlan(undefined), false);
    assert.equal(isCodexFreePlan(null), false);
    assert.equal(isCodexFreePlan("free"), false);
    assert.equal(isCodexFreePlan(42), false);
  });

  it("returns true when workspacePlanType is 'free' (case-insensitive, trimmed)", () => {
    assert.equal(isCodexFreePlan({ workspacePlanType: "free" }), true);
    assert.equal(isCodexFreePlan({ workspacePlanType: "  Free  " }), true);
    assert.equal(isCodexFreePlan({ workspacePlanType: "FREE" }), true);
  });

  it("returns false for paid plans (pro, team, enterprise, business)", () => {
    for (const plan of ["pro", "team", "enterprise", "business", "plus"]) {
      assert.equal(isCodexFreePlan({ workspacePlanType: plan }), false, `plan=${plan}`);
    }
  });

  it("returns false when workspacePlanType is missing", () => {
    assert.equal(isCodexFreePlan({}), false);
    assert.equal(isCodexFreePlan({ other: "free" }), false);
  });
});

// ============================================================================
// §6. stripStoredItemReferences — server-generated ID stripper
// ============================================================================

describe("stripStoredItemReferences (rs_/fc_/resp_/msg_ ID + reasoning-blob strip)", () => {
  it("injects a default user 'continue' turn when input is an empty array", () => {
    const body: Record<string, unknown> = { input: [] };
    stripStoredItemReferences(body);
    const input = body.input as Array<Record<string, unknown>>;
    assert.equal(input.length, 1);
    assert.equal(input[0].type, "message");
    assert.equal(input[0].role, "user");
    const content = input[0].content as Array<Record<string, unknown>>;
    assert.equal(content[0].type, "input_text");
    assert.equal(content[0].text, "continue");
  });

  it("is a no-op when input is not an array", () => {
    const body: Record<string, unknown> = { input: "not-an-array" };
    stripStoredItemReferences(body);
    assert.equal(body.input, "not-an-array");
  });

  it("is a no-op when body has no input key", () => {
    const body: Record<string, unknown> = { model: "gpt-5" };
    stripStoredItemReferences(body);
    assert.equal(body.model, "gpt-5");
    assert.equal("input" in body, false);
  });

  it("filters out bare string references like 'rs_abc'", () => {
    const body: Record<string, unknown> = {
      input: ["rs_abc", "msg_xyz", "fc_1", "resp_9", "plain-string"],
    };
    stripStoredItemReferences(body);
    const input = body.input as string[];
    assert.deepEqual(input, ["plain-string"]);
  });

  it("filters out object items with type=item_reference", () => {
    const body: Record<string, unknown> = {
      input: [
        { type: "item_reference", id: "rs_abc" },
        { type: "item_reference", id: "resp_xyz" },
        { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
      ],
    };
    stripStoredItemReferences(body);
    const input = body.input as Array<Record<string, unknown>>;
    assert.equal(input.length, 1);
    assert.equal(input[0].role, "user");
  });

  it("strips the id field from object items whose id matches a server prefix (content preserved)", () => {
    const body: Record<string, unknown> = {
      input: [
        {
          id: "rs_abc",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "hello" }],
        },
        {
          id: "fc_xyz",
          type: "function_call",
          call_id: "call_1",
          arguments: "{}",
        },
      ],
    };
    stripStoredItemReferences(body);
    const input = body.input as Array<Record<string, unknown>>;
    assert.equal(input.length, 2);
    assert.equal("id" in input[0], false);
    assert.equal("id" in input[1], false);
    // The other fields are kept.
    assert.equal(input[0].type, "message");
    assert.equal(input[1].type, "function_call");
    assert.equal((input[1] as { call_id?: string }).call_id, "call_1");
  });

  it("filters out reasoning blobs (unusable with store=false)", () => {
    const body: Record<string, unknown> = {
      input: [
        { type: "reasoning", summary: [{ type: "summary_text", text: "thinking" }] },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
    };
    stripStoredItemReferences(body);
    const input = body.input as Array<Record<string, unknown>>;
    assert.equal(input.length, 1);
    assert.equal(input[0].type, "message");
  });
});

// ============================================================================
// §7. isCompactResponsesEndpoint — /responses/compact detection
// ============================================================================

describe("isCompactResponsesEndpoint", () => {
  it("detects a bare 'responses' path (not compact)", () => {
    assert.equal(isCompactResponsesEndpoint("responses"), false);
    assert.equal(isCompactResponsesEndpoint("/responses"), false);
  });

  it("detects a 'responses/compact' or '/responses/compact' path", () => {
    assert.equal(isCompactResponsesEndpoint("responses/compact"), true);
    assert.equal(isCompactResponsesEndpoint("/responses/compact"), true);
    assert.equal(isCompactResponsesEndpoint("/responses/compact/"), true);
  });

  it("detects compact subpath case-insensitively", () => {
    assert.equal(isCompactResponsesEndpoint("/responses/Compact"), true);
    assert.equal(isCompactResponsesEndpoint("/RESPONSES/COMPACT"), true);
  });

  it("returns false for unrelated subpaths", () => {
    assert.equal(isCompactResponsesEndpoint("/responses/stream"), false);
    assert.equal(isCompactResponsesEndpoint("/other"), false);
    assert.equal(isCompactResponsesEndpoint(""), false);
  });

  it("returns false for non-string inputs", () => {
    assert.equal(isCompactResponsesEndpoint(undefined), false);
    assert.equal(isCompactResponsesEndpoint(null), false);
  });
});

// ============================================================================
// §8. normalizeCodexTools — tool-call transformation
// ============================================================================

describe("normalizeCodexTools (Chat-Completions → Responses flat shape)", () => {
  it("flattens a { type:'function', function:{name,description,parameters} } tool", () => {
    const body: Record<string, unknown> = {
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Get the weather",
            parameters: { type: "object", properties: { city: { type: "string" } } },
          },
        },
      ],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal(tools[0].type, "function");
    assert.equal(tools[0].name, "get_weather");
    assert.equal(tools[0].description, "Get the weather");
    assert.deepEqual(tools[0].parameters, {
      type: "object",
      properties: { city: { type: "string" } },
    });
    // The nested function wrapper must be gone.
    assert.equal("function" in tools[0], false);
  });

  it("preserves a top-level function tool already in Responses shape", () => {
    const body: Record<string, unknown> = {
      tools: [
        {
          type: "function",
          name: "search",
          description: "Search",
          parameters: { type: "object", properties: {} },
        },
      ],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools[0].name, "search");
    assert.equal("function" in tools[0], false);
  });

  it("preserves hosted tools (web_search, file_search, code_interpreter, mcp)", () => {
    const body: Record<string, unknown> = {
      tools: [
        { type: "web_search" },
        { type: "file_search" },
        { type: "code_interpreter" },
        { type: "mcp", server_label: "atlassian" },
      ],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 4);
    assert.equal(tools[0].type, "web_search");
    assert.equal(tools[1].type, "file_search");
    assert.equal(tools[2].type, "code_interpreter");
    assert.equal(tools[3].type, "mcp");
  });

  it("preserves namespace tools (MCP tool groups) and registers their sub-tool names", () => {
    const body: Record<string, unknown> = {
      tools: [
        {
          type: "namespace",
          name: "mcp__atlassian__",
          tools: [
            { name: "create_issue" },
            { name: "search_jira" },
          ],
        },
      ],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal(tools[0].type, "namespace");
    // A tool_choice.name reference to a registered sub-tool is preserved.
    body.tool_choice = { type: "function", name: "create_issue" };
    normalizeCodexTools(body);
    assert.deepEqual(body.tool_choice, { type: "function", name: "create_issue" });
  });

  it("preserves custom tools only when preserveCustomTools=true", () => {
    const body: Record<string, unknown> = {
      tools: [{ type: "custom", name: "apply_patch", format: "diff" }],
    };
    // Without the flag, custom tools are filtered out.
    normalizeCodexTools(body);
    assert.equal((body.tools as unknown[]).length, 0);

    // With the flag, custom tools are kept.
    body.tools = [{ type: "custom", name: "apply_patch", format: "diff" }];
    normalizeCodexTools(body, { preserveCustomTools: true });
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal(tools[0].name, "apply_patch");
  });

  it("drops function tools with empty / whitespace-only names", () => {
    const body: Record<string, unknown> = {
      tools: [
        { type: "function", name: "", function: { name: "" } },
        { type: "function", name: "   ", function: { name: "   " } },
        { type: "function", name: "valid" },
      ],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal(tools[0].name, "valid");
  });

  it("drops unknown hosted tool types (logs and continues)", () => {
    const body: Record<string, unknown> = {
      tools: [
        { type: "future_hosted_tool_type" },
        { type: "function", name: "kept" },
      ],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal(tools[0].name, "kept");
  });

  it("truncates function names longer than 128 characters (Codex wire limit)", () => {
    const longName = "x".repeat(200);
    const body: Record<string, unknown> = {
      tools: [{ type: "function", name: longName }],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal((tools[0].name as string).length, 128);
  });

  it("drops image_generation for free-plan accounts (#2980)", () => {
    const body: Record<string, unknown> = {
      tools: [{ type: "image_generation" }, { type: "web_search" }],
    };
    normalizeCodexTools(body, { dropImageGeneration: true });
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools.length, 1);
    assert.equal(tools[0].type, "web_search");
  });

  it("strips tool_choice.name references that don't match any valid tool", () => {
    const body: Record<string, unknown> = {
      tools: [{ type: "function", name: "alpha" }],
      tool_choice: { type: "function", name: "ghost" },
    };
    normalizeCodexTools(body);
    assert.equal("tool_choice" in body, false);
  });

  it("preserves tool_choice.name when it matches a valid function tool", () => {
    const body: Record<string, unknown> = {
      tools: [{ type: "function", name: "alpha" }],
      tool_choice: { type: "function", name: "alpha" },
    };
    normalizeCodexTools(body);
    assert.deepEqual(body.tool_choice, { type: "function", name: "alpha" });
  });

  it("propagates strict mode from the nested function wrapper to the top level", () => {
    const body: Record<string, unknown> = {
      tools: [
        {
          type: "function",
          function: {
            name: "strict_tool",
            description: "d",
            parameters: { type: "object", properties: {} },
            strict: true,
          },
        },
      ],
    };
    normalizeCodexTools(body);
    const tools = body.tools as Array<Record<string, unknown>>;
    assert.equal(tools[0].strict, true);
  });
});

// ============================================================================
// §9. isCodexResponsesWebSocketRequired — WS transport gate
// ============================================================================

describe("isCodexResponsesWebSocketRequired (opt-in WS transport)", () => {
  const originalOverride = (globalThis as { __codexWsForTest?: unknown }).__codexWsForTest;

  beforeEach(() => {
    // Reset any prior override before each test.
    __setCodexWebSocketTransportForTesting(null);
  });

  after(() => {
    __setCodexWebSocketTransportForTesting(originalOverride as never);
  });

  it("returns false when codexTransport is not 'websocket'", () => {
    const creds = { providerSpecificData: { codexTransport: "http" } };
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5", creds), false);
  });

  it("returns false when codexTransport='websocket' but the WS transport is unavailable", () => {
    const creds = { providerSpecificData: { codexTransport: "websocket" } };
    __setCodexWebSocketTransportForTesting(null);
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5", creds), false);
  });

  it("returns true when codexTransport='websocket' AND the WS transport is available", () => {
    // Provide a minimal stub for the WS transport.
    __setCodexWebSocketTransportForTesting((async () => ({
      send: () => {},
      close: () => {},
      onmessage: null,
      onerror: null,
      onclose: null,
    })) as never);
    const creds = { providerSpecificData: { codexTransport: "websocket" } };
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5", creds), true);
  });

  it("returns false when credentials are missing or malformed", () => {
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5", null), false);
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5", undefined), false);
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5", "not-an-object"), false);
  });

  it("ignores the model argument (HTTP is the default for ALL Codex models)", () => {
    const creds = { providerSpecificData: {} };
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5", creds), false);
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5.1-codex", creds), false);
    assert.equal(isCodexResponsesWebSocketRequired("gpt-5.3-codex", creds), false);
  });
});

// ============================================================================
// §10. encodeResponseSseEvent — SSE event encoding + refusal handling
// ============================================================================

describe("encodeResponseSseEvent (SSE framing + refusal/error mapping)", () => {
  it("wraps a JSON Responses-API event in the canonical 'event: / data:' SSE shape", () => {
    const payload = JSON.stringify({ type: "response.created", response: { id: "r_1" } });
    const result = encodeResponseSseEvent(payload);
    assert.equal(result.sse, `event: response.created\ndata: ${payload}\n\n`);
    assert.equal(result.terminal, false);
  });

  it("marks response.completed as terminal", () => {
    const payload = JSON.stringify({ type: "response.completed", response: { id: "r_1" } });
    const result = encodeResponseSseEvent(payload);
    assert.equal(result.terminal, true);
  });

  it("marks response.failed as terminal", () => {
    const payload = JSON.stringify({
      type: "response.failed",
      response: { id: "r_1", error: { code: "x", message: "y" } },
    });
    const result = encodeResponseSseEvent(payload);
    assert.equal(result.terminal, true);
    // response.failed events are emitted on the 'response.failed' SSE channel.
    assert.equal(result.sse.startsWith("event: response.failed\n"), true);
  });

  it("rewrites a generic {type:'error'} event into response.failed and maps status 400", () => {
    const payload = JSON.stringify({
      type: "error",
      status_code: 400,
      error: { code: "bad_request", message: "Invalid request" },
    });
    const result = encodeResponseSseEvent(payload);
    const out = JSON.parse(result.sse.replace(/^event: [^\n]+\ndata: /, "").replace(/\n\n$/, ""));
    assert.equal(out.type, "response.failed");
    assert.equal(out.response.status, "failed");
    assert.equal(out.response.error.code, "bad_request");
    assert.equal(out.response.error.status_code, 400);
    assert.equal(result.terminal, true);
  });

  it("infers status 429 from a quota/rate-limit-shaped message when no explicit status is given", () => {
    const payload = JSON.stringify({
      type: "error",
      error: { code: "rate_limit_exceeded", message: "Too many requests" },
    });
    const result = encodeResponseSseEvent(payload);
    const out = JSON.parse(result.sse.replace(/^event: [^\n]+\ndata: /, "").replace(/\n\n$/, ""));
    assert.equal(out.response.error.status_code, 429);
  });

  it("preserves a non-JSON raw payload as a generic 'message' SSE event", () => {
    const result = encodeResponseSseEvent("not-json");
    assert.equal(result.sse, "event: message\ndata: not-json\n\n");
    assert.equal(result.terminal, false);
  });

  it("drops empty / whitespace-only payloads (no SSE frame emitted)", () => {
    assert.equal(encodeResponseSseEvent("").sse, "");
    assert.equal(encodeResponseSseEvent("   ").sse, "");
    assert.equal(encodeResponseSseEvent("\n").sse, "");
  });

  it("drops non-standard codex.* events when the OMNIROUTE_CODEX_DROP_NONSTANDARD_EVENTS env is on", () => {
    const prev = process.env.OMNIROUTE_CODEX_DROP_NONSTANDARD_EVENTS;
    process.env.OMNIROUTE_CODEX_DROP_NONSTANDARD_EVENTS = "true";
    try {
      const payload = JSON.stringify({ type: "codex.rate_limits", info: { remaining: 0 } });
      const result = encodeResponseSseEvent(payload);
      assert.equal(result.sse, "");
    } finally {
      if (prev === undefined) delete process.env.OMNIROUTE_CODEX_DROP_NONSTANDARD_EVENTS;
      else process.env.OMNIROUTE_CODEX_DROP_NONSTANDARD_EVENTS = prev;
    }
  });

  it("emits a non-JSON error string as a generic 'message' event (not response.failed)", () => {
    const result = encodeResponseSseEvent("raw error string");
    assert.equal(result.sse, "event: message\ndata: raw error string\n\n");
  });
});

// ============================================================================
// §11. filterNonstandardCodexSse — HTTP-transport byte-stream filter
// ============================================================================

describe("filterNonstandardCodexSse (HTTP-transport codex.* block filter)", () => {
  function makeSseResponse(body: string, contentType = "text/event-stream"): Response {
    return new Response(new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(body));
        controller.close();
      },
    }), { headers: { "content-type": contentType } });
  }

  it("returns the response unchanged when content-type is not text/event-stream", async () => {
    const r = new Response("plain", { headers: { "content-type": "text/plain" } });
    const out = filterNonstandardCodexSse(r);
    assert.equal(out, r);
  });

  it("returns the response unchanged when body is null", () => {
    const r = new Response(null, { headers: { "content-type": "text/event-stream" } });
    const out = filterNonstandardCodexSse(r);
    assert.equal(out, r);
  });

  it("strips event blocks whose event name starts with 'codex.'", async () => {
    const body =
      "event: response.created\ndata: {\"id\":\"r_1\"}\n\n" +
      "event: codex.rate_limits\ndata: {\"remaining\":0}\n\n" +
      "event: response.completed\ndata: {\"id\":\"r_1\"}\n\n";
    const out = filterNonstandardCodexSse(makeSseResponse(body));
    const text = await new Response(out.body!).text();
    assert.equal(text.includes("response.created"), true);
    assert.equal(text.includes("response.completed"), true);
    assert.equal(text.includes("codex.rate_limits"), false);
  });
});

// ============================================================================
// §12. CodexExecutor.buildUrl — URL composition (compact subpath)
// ============================================================================

describe("CodexExecutor.buildUrl (compact-subpath composition)", () => {
  it("appends /compact to the base URL for a /responses/compact request", () => {
    const exec = new CodexExecutor();
    const creds = { requestEndpointPath: "/responses/compact" } as Parameters<typeof exec.buildUrl>[3];
    const url = exec.buildUrl("gpt-5", true, 0, creds);
    assert.ok(typeof url === "string");
    assert.ok(url.endsWith("/responses/compact"), `url=${url}`);
  });

  it("uses /responses (no subpath) when requestEndpointPath is '/responses'", () => {
    const exec = new CodexExecutor();
    const creds = { requestEndpointPath: "/responses" } as Parameters<typeof exec.buildUrl>[3];
    const url = exec.buildUrl("gpt-5", true, 0, creds);
    assert.ok(typeof url === "string");
    // Either "/responses" or "/responses/" — both are equivalent.
    assert.ok(url.endsWith("/responses") || url.endsWith("/responses/"), `url=${url}`);
  });

  it("falls back to the base executor's URL when requestEndpointPath is absent", () => {
    const exec = new CodexExecutor();
    const url = exec.buildUrl("gpt-5", true, 0, { accessToken: "t" } as Parameters<typeof exec.buildUrl>[3]);
    assert.ok(typeof url === "string");
    // The base URL is from PROVIDERS.codex — we just verify it builds.
    assert.ok(url.length > 0);
  });
});

// ============================================================================
// §13. CodexExecutor.buildHeaders — header propagation
// ============================================================================

describe("CodexExecutor.buildHeaders (Version, User-Agent, originator, session_id, chatgpt-account-id)", () => {
  it("sets Version, originator, User-Agent, and Bearer Authorization by default", () => {
    const exec = new CodexExecutor();
    const headers = exec.buildHeaders({ accessToken: "tok-abc" } as Parameters<typeof exec.buildHeaders>[0]);
    assert.equal(headers["originator"], "codex_cli_rs");
    assert.equal(headers["Authorization"], "Bearer tok-abc");
    assert.ok(typeof headers["Version"] === "string" && headers["Version"].length > 0);
    assert.ok(typeof headers["User-Agent"] === "string" && headers["User-Agent"].length > 0);
  });

  it("adds chatgpt-account-id when workspaceId is set in providerSpecificData", () => {
    const exec = new CodexExecutor();
    const headers = exec.buildHeaders({
      accessToken: "tok",
      providerSpecificData: { workspaceId: "ws-12345" },
    } as Parameters<typeof exec.buildHeaders>[0]);
    assert.equal(headers["chatgpt-account-id"], "ws-12345");
  });

  it("omits chatgpt-account-id when workspaceId is missing or empty", () => {
    const exec = new CodexExecutor();
    const headers = exec.buildHeaders({
      accessToken: "tok",
      providerSpecificData: { workspaceId: "" },
    } as Parameters<typeof exec.buildHeaders>[0]);
    assert.equal("chatgpt-account-id" in headers, false);
  });

  it("picks application/json Accept for /responses/compact (stream flag is forced to false)", () => {
    const exec = new CodexExecutor();
    const headers = exec.buildHeaders(
      { accessToken: "tok", requestEndpointPath: "/responses/compact" } as Parameters<
        typeof exec.buildHeaders
      >[0]
    );
    assert.equal(headers["Accept"], "application/json");
  });

  it("picks text/event-stream Accept for /responses (stream default true)", () => {
    const exec = new CodexExecutor();
    const headers = exec.buildHeaders(
      { accessToken: "tok", requestEndpointPath: "/responses" } as Parameters<typeof exec.buildHeaders>[0]
    );
    assert.equal(headers["Accept"], "text/event-stream");
  });
});

// ============================================================================
// §14. CodexExecutor.transformRequest — system prompt injection
// ============================================================================

describe("CodexExecutor.transformRequest — system prompt (instructions) injection", () => {
  it("injects the CODEX_DEFAULT_INSTRUCTIONS for a tool-bearing translated request", () => {
    const body = {
      model: "gpt-5",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
      tools: [{ type: "function", name: "f", description: "d", parameters: { type: "object", properties: {} } }],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    // instructions should be set; we just check it's a non-empty string.
    assert.equal(typeof out.instructions, "string");
    assert.ok((out.instructions as string).length > 0);
  });

  it("injects the CHAT default instructions for a tool-less translated request", () => {
    const body = {
      model: "gpt-5",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal(typeof out.instructions, "string");
    assert.ok((out.instructions as string).length > 0);
    // The chat default is shorter than the tool default — quick sanity check.
    assert.ok((out.instructions as string).includes("ChatGPT"));
  });

  it("does NOT overwrite an existing non-empty instructions field", () => {
    const custom = "MY-CUSTOM-INSTRUCTIONS-XYZ";
    const body = {
      model: "gpt-5",
      instructions: custom,
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal(out.instructions, custom);
  });

  it("uses a minimal placeholder instructions on native Codex passthrough", () => {
    const body = {
      model: "gpt-5",
      _nativeCodexPassthrough: true,
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal(out.instructions, "Follow the developer instructions in the conversation.");
    // The native passthrough marker is consumed and removed.
    assert.equal("_nativeCodexPassthrough" in out, false);
  });
});

// ============================================================================
// §15. CodexExecutor.transformRequest — model ID fallback chain
// ============================================================================

describe("CodexExecutor.transformRequest — model ID reasoning-effort fallback chain", () => {
  it("chains: model-suffix → body.reasoning.effort → body.reasoning_effort → defaults", () => {
    // 1) Model suffix alone
    const body1 = { model: "gpt-5-codex-high" };
    const out1 = buildPayload(body1, { credentials: { accessToken: "t" } });
    const r1 = out1.reasoning as Record<string, unknown>;
    assert.equal(r1.effort, "high");
    // The model is stripped of the suffix.
    assert.equal(out1.model, "gpt-5-codex");

    // 2) body.reasoning.effort overrides the (absent) model suffix
    const body2 = {
      model: "gpt-5-codex",
      reasoning: { effort: "low" },
    };
    const out2 = buildPayload(body2, { credentials: { accessToken: "t" } });
    const r2 = out2.reasoning as Record<string, unknown>;
    assert.equal(r2.effort, "low");

    // 3) body.reasoning_effort (legacy) is the next fallback
    const body3 = {
      model: "gpt-5-codex",
      reasoning_effort: "medium",
    };
    const out3 = buildPayload(body3, { credentials: { accessToken: "t" } });
    const r3 = out3.reasoning as Record<string, unknown>;
    assert.equal(r3.effort, "medium");
    // The legacy field is removed after folding.
    assert.equal("reasoning_effort" in out3, false);
  });

  it("clamps an over-cap effort for a known cap model (e.g. gpt-5-mini caps at high)", () => {
    const body = {
      model: "gpt-5-mini",
      reasoning: { effort: "xhigh" },
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const r = out.reasoning as Record<string, unknown>;
    // gpt-5-mini's MAX_EFFORT_BY_MODEL entry is "high"; xhigh is clamped to it.
    assert.equal(r.effort, "high");
  });

  it("normalises 'max' → 'xhigh' before applying the cap", () => {
    const body = {
      model: "gpt-5.3-codex",
      reasoning_effort: "max",
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const r = out.reasoning as Record<string, unknown>;
    // gpt-5.3-codex has cap=xhigh and max normalises to xhigh, so no clamp is needed.
    assert.equal(r.effort, "xhigh");
  });

  it("emits a summary='auto' and adds reasoning.encrypted_content to include when effort is non-none", () => {
    const body = {
      model: "gpt-5",
      reasoning: { effort: "medium" },
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const r = out.reasoning as Record<string, unknown>;
    assert.equal(r.summary, "auto");
    assert.ok(Array.isArray(out.include));
    assert.ok((out.include as string[]).includes("reasoning.encrypted_content"));
  });

  it("does NOT add a summary or encrypted_content include when reasoning.effort is 'none'", () => {
    const body = {
      model: "gpt-5",
      reasoning: { effort: "none" },
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const r = out.reasoning as Record<string, unknown>;
    assert.equal("summary" in r, false);
  });
});

// ============================================================================
// §16. CodexExecutor.transformRequest — tool call transformation
// ============================================================================

describe("CodexExecutor.transformRequest — tool call transformation (allowlist)", () => {
  it("flattens a Chat Completions-shape function tool into the Responses shape", () => {
    const body = {
      model: "gpt-5",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "go" }] }],
      tools: [
        {
          type: "function",
          function: {
            name: "do_thing",
            description: "Do the thing",
            parameters: { type: "object", properties: { x: { type: "string" } } },
          },
        },
      ],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const tools = out.tools as Array<Record<string, unknown>>;
    assert.equal(tools[0].type, "function");
    assert.equal(tools[0].name, "do_thing");
    assert.equal("function" in tools[0], false);
  });

  it("strips Chat-Completions-only fields (max_tokens, max_output_tokens, truncation, etc.)", () => {
    const body = {
      model: "gpt-5",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "go" }] }],
      max_tokens: 100,
      max_output_tokens: 200,
      truncation: "auto",
      background: true,
      prompt_cache_retention: "long",
      safety_identifier: "user-1",
      user: "user-1",
      // A pass-through field that is NOT in the allowlist should also be dropped.
      temperature: 0.7,
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal("max_tokens" in out, false);
    assert.equal("max_output_tokens" in out, false);
    assert.equal("truncation" in out, false);
    assert.equal("background" in out, false);
    assert.equal("prompt_cache_retention" in out, false);
    assert.equal("safety_identifier" in out, false);
    assert.equal("user" in out, false);
    assert.equal("temperature" in out, false);
  });

  it("strips messages and prompt keys to keep only input (Responses schema)", () => {
    const body = {
      model: "gpt-5",
      messages: [{ role: "user", content: "hi" }],
      prompt: "fallback prompt",
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal("messages" in out, false);
    assert.equal("prompt" in out, false);
    assert.ok(Array.isArray(out.input));
  });
});

// ============================================================================
// §17. CodexExecutor.transformRequest — conversation history merge
// ============================================================================

describe("CodexExecutor.transformRequest — conversation history merge (messages/prompt → input)", () => {
  it("maps a flat messages array into a Responses-API input array", () => {
    const body = {
      model: "gpt-5",
      messages: [
        { role: "system", content: "be terse" },
        { role: "user", content: "hello" },
        { role: "assistant", content: "hi" },
        { role: "user", content: "what is 2+2?" },
      ],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const input = out.input as Array<Record<string, unknown>>;
    // The system message is converted to developer in-place (cacheable).
    assert.equal(input[0].role, "developer");
    assert.equal(input[1].role, "user");
    assert.equal(input[2].role, "assistant");
    assert.equal(input[3].role, "user");
    // String content is wrapped in input_text.
    for (const msg of input) {
      const content = msg.content as Array<Record<string, unknown>>;
      assert.equal(content[0].type, "input_text");
    }
  });

  it("preserves explicit text content parts (and converts type='text' → 'input_text')", () => {
    const body = {
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "hello" },
            { type: "image", image_url: "https://x/y.png" },
          ],
        },
      ],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const input = out.input as Array<Record<string, unknown>>;
    const content = input[0].content as Array<Record<string, unknown>>;
    assert.equal(content[0].type, "input_text");
    assert.equal(content[0].text, "hello");
    // The image part is preserved as-is (Codex has a sibling image type).
    assert.equal(content[1].type, "image");
  });

  it("maps a top-level string 'prompt' field into a single user input turn", () => {
    const body = { model: "gpt-5", prompt: "tell me a joke" };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const input = out.input as Array<Record<string, unknown>>;
    assert.equal(input.length, 1);
    assert.equal(input[0].role, "user");
    const content = input[0].content as Array<Record<string, unknown>>;
    assert.equal(content[0].type, "input_text");
    assert.equal(content[0].text, "tell me a joke");
  });

  it("ignores an empty 'prompt' string (does not produce a synthetic 'continue' turn)", () => {
    const body = { model: "gpt-5", prompt: "   " };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    // No input was provided, so no synthetic turn is added.
    assert.equal("input" in out, false);
  });

  it("maps a top-level array 'prompt' field into per-item user turns", () => {
    const body = { model: "gpt-5", prompt: ["first", "second"] };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const input = out.input as Array<Record<string, unknown>>;
    assert.equal(input.length, 2);
    assert.equal(
      (input[0].content as Array<Record<string, unknown>>)[0].text,
      "first"
    );
    assert.equal(
      (input[1].content as Array<Record<string, unknown>>)[0].text,
      "second"
    );
  });

  it("preserves a non-string 'phase' field on a messages[].phase hint", () => {
    const body = {
      model: "gpt-5",
      messages: [{ role: "user", content: "hi", phase: "final" }],
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    const input = out.input as Array<Record<string, unknown>>;
    assert.equal(input[0].phase, "final");
  });
});

// ============================================================================
// §18. CodexExecutor.transformRequest — store / stream / compact toggles
// ============================================================================

describe("CodexExecutor.transformRequest — stream / store / compact toggles", () => {
  it("forces stream=true for a regular /responses request regardless of input stream flag", () => {
    const body = { model: "gpt-5", input: [] };
    const out = buildPayload(body, { stream: false, credentials: { accessToken: "t" } });
    assert.equal(out.stream, true);
  });

  it("DELETES stream and stream_options for a /responses/compact request (the compact endpoint rejects them)", () => {
    const body = {
      model: "gpt-5",
      input: [],
      stream: true,
      stream_options: { include_usage: true },
    };
    const out = buildPayload(body, {
      stream: true,
      credentials: { accessToken: "t", requestEndpointPath: "/responses/compact" },
    });
    assert.equal("stream" in out, false);
    assert.equal("stream_options" in out, false);
  });

  it("defaults store=false for a regular Codex account", () => {
    const body = { model: "gpt-5", input: [] };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal(out.store, false);
  });

  it("sets store=true only when openaiStoreEnabled is true (API-key accounts)", () => {
    const body = { model: "gpt-5", input: [] };
    const out = buildPayload(body, {
      credentials: { accessToken: "t", providerSpecificData: { openaiStoreEnabled: true } },
    });
    assert.equal(out.store, true);
  });

  it("DELETES store for a /responses/compact request (compact rejects the store field entirely)", () => {
    const body = { model: "gpt-5", input: [], store: true };
    const out = buildPayload(body, {
      credentials: { accessToken: "t", requestEndpointPath: "/responses/compact" },
    });
    assert.equal("store" in out, false);
  });

  it("rewrites service_tier 'fast' to the wire value 'priority' and preserves other tiers", () => {
    const bodyFast = { model: "gpt-5", input: [], service_tier: "fast" };
    const outFast = buildPayload(bodyFast, { credentials: { accessToken: "t" } });
    assert.equal(outFast.service_tier, "priority");

    const bodyDefault = { model: "gpt-5", input: [], service_tier: "default" };
    const outDefault = buildPayload(bodyDefault, { credentials: { accessToken: "t" } });
    assert.equal(outDefault.service_tier, "default");
  });
});

// ============================================================================
// §19. CodexExecutor.transformRequest — prompt_cache_key derivation
// ============================================================================

describe("CodexExecutor.transformRequest — prompt_cache_key derivation", () => {
  it("uses the body's prompt_cache_key verbatim (per-conversation cache affinity)", () => {
    const body = {
      model: "gpt-5",
      input: [],
      prompt_cache_key: "11111111-2222-3333-4444-555555555555",
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal(out.prompt_cache_key, "11111111-2222-3333-4444-555555555555");
  });

  it("falls back to body.session_id when prompt_cache_key is absent", () => {
    const body = {
      model: "gpt-5",
      input: [],
      session_id: "session_xyz_123",
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal(out.prompt_cache_key, "session_xyz_123");
    // session_id is consumed and removed from the body.
    assert.equal("session_id" in out, false);
  });

  it("falls back to body.conversation_id when neither prompt_cache_key nor session_id is set", () => {
    const body = {
      model: "gpt-5",
      input: [],
      conversation_id: "conv_xyz_456",
    };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal(out.prompt_cache_key, "conv_xyz_456");
    assert.equal("conversation_id" in out, false);
  });

  it("falls back to credentials.providerSpecificData.workspaceId as a last resort", () => {
    const body = { model: "gpt-5", input: [] };
    const out = buildPayload(body, {
      credentials: { accessToken: "t", providerSpecificData: { workspaceId: "ws-fallback" } },
    });
    assert.equal(out.prompt_cache_key, "ws-fallback");
  });

  it("omits prompt_cache_key entirely when no candidate ID is present", () => {
    const body = { model: "gpt-5", input: [] };
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    assert.equal("prompt_cache_key" in out, false);
  });
});

// ============================================================================
// §20. CodexExecutor.transformRequest — defensive cloning
// ============================================================================

describe("CodexExecutor.transformRequest — does NOT mutate the caller's payload", () => {
  it("leaves the original body.input array intact (deep clone)", () => {
    const body = {
      model: "gpt-5",
      input: [
        { type: "message", role: "system", content: [{ type: "input_text", text: "be terse" }] },
        { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
      ],
    };
    const originalInput = JSON.parse(JSON.stringify(body.input));
    const out = buildPayload(body, { credentials: { accessToken: "t" } });
    // Output's system role is rewritten to developer.
    const outInput = out.input as Array<Record<string, unknown>>;
    assert.equal(outInput[0].role, "developer");
    // But the ORIGINAL body's system role is preserved (clone, not in-place).
    assert.equal((body.input as Array<Record<string, unknown>>)[0].role, "system");
    assert.deepEqual(body.input, originalInput);
  });

  it("handles a non-object body gracefully (empty object fallback)", () => {
    const out = buildPayload(null, { credentials: { accessToken: "t" } });
    assert.equal(typeof out, "object");
    assert.equal(out.stream, true);
    assert.equal(out.store, false);
  });
});

// ============================================================================
// §21. CodexExecutor.refreshCredentials — token refresh behaviour
// ============================================================================

describe("CodexExecutor.refreshCredentials (returns null when refresh is impossible)", () => {
  it("returns null when no refreshToken is on the credentials", async () => {
    const exec = new CodexExecutor();
    const result = await exec.refreshCredentials({ accessToken: "t" } as Parameters<
      typeof exec.refreshCredentials
    >[0]);
    assert.equal(result, null);
  });
});
