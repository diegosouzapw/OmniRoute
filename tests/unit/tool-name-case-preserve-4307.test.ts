/**
 * #4307 — Tool name case changes (`read` -> `Read`) leaks to the client.
 *
 * Native Claude OAuth traffic runs through the anti-fingerprint tool-name cloak
 * (`remapToolNamesInRequest`/`cloakThirdPartyToolNames`), which renames a tool
 * literally named `read` to `Read` and records the reverse alias (`Read -> read`)
 * on a NON-ENUMERABLE `body._toolNameMap`. The response side un-cloaks the
 * streamed `tool_use.name` back to the client's original casing using that map.
 *
 * Regression (v3.8.27 / #3941/#3968): `execute()` started returning a
 * JSON-round-tripped `serializedBody` as `result.transformedBody`. The round-trip
 * drops the non-enumerable `_toolNameMap`, so chatCore's response-side restore
 * sees an empty map and the cloaked `Read` streams verbatim to the client — the
 * tool name case is corrupted (`read` -> `Read`).
 *
 * This test pins the executor boundary: after `execute()` runs the claude-OAuth
 * cloak, the returned `transformedBody` MUST still carry the per-request
 * `_toolNameMap` (non-enumerable, so it never re-serializes upstream).
 */
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";

// Minimal `claude` executor: passthrough transformRequest, no credential refresh,
// so we exercise exactly base.ts's cloak + serialize-and-return path.
class ClaudeLikeExecutor extends BaseExecutor {
  constructor() {
    super("claude", { baseUrls: ["https://api.anthropic.com/v1/messages"] });
  }
  // Never trigger the refresh branch in execute().
  needsRefresh() {
    return false;
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

test("#4307 execute() preserves the tool-name cloak map (read->Read reverse) on the returned body", async () => {
  const executor = new ClaudeLikeExecutor();
  const originalFetch = globalThis.fetch;
  let upstreamBody: Record<string, unknown> | null = null;

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    upstreamBody = JSON.parse(String(init.body));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  after(() => {
    globalThis.fetch = originalFetch;
  });

  const result = await executor.execute({
    model: "claude-sonnet-4-5",
    body: {
      messages: [{ role: "user", content: "hi" }],
      // A tool literally named `read` (lower-case) — must round-trip unchanged
      // back to the client.
      tools: [{ name: "read", description: "read a file", input_schema: { type: "object" } }],
    },
    stream: false,
    // OAuth token (sk-ant-oat…) with NO apiKey => hasClaudeOAuthToken => cloak fires.
    credentials: { accessToken: "sk-ant-oat-test-token-4307" },
  });

  // Precondition: the cloak actually fired — the body sent UPSTREAM carries the
  // TitleCase alias `Read` (this is intentional anti-fingerprint behavior).
  assert.ok(upstreamBody, "fetch must have been called");
  const upstreamToolName = (upstreamBody!.tools as Array<{ name: string }>)[0].name;
  assert.equal(upstreamToolName, "Read", "precondition: cloak renames read -> Read on the wire");
  // And the cloak map never re-serializes onto the wire (stays non-enumerable).
  assert.equal(
    JSON.stringify(upstreamBody).includes("_toolNameMap"),
    false,
    "_toolNameMap must never appear in the serialized upstream body"
  );

  // The actual regression guard: the returned transformedBody must still carry
  // the reverse map so chatCore can restore `Read` -> `read` for the client.
  const returned = result.transformedBody as Record<string, unknown>;
  const map = returned._toolNameMap;
  assert.ok(
    map instanceof Map,
    "result.transformedBody must carry the non-enumerable _toolNameMap (dropped by the v3.8.27 serialize round-trip without the #4307 fix)"
  );
  assert.equal(
    (map as Map<string, string>).get("Read"),
    "read",
    "reverse map must restore the client's original tool-name casing"
  );
  // The re-attached map must remain non-enumerable (never re-serializes upstream).
  assert.equal(
    Object.keys(returned).includes("_toolNameMap"),
    false,
    "_toolNameMap must stay non-enumerable on the returned body"
  );
});
