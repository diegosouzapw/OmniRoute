/**
 * #4091 — MCP tool dispatch broken in Claude Code ("No such tool available")
 * on native Claude OAuth, regression from v3.8.27.
 *
 * Root cause: the native-Claude tool-name cloak stores the per-request
 * alias→original map as a NON-ENUMERABLE `_toolNameMap` on the request body.
 * The request-inspector capture added in 3.8.27 intercepts the upstream fetch,
 * takes the serialized body string and rebuilds the object via
 * `JSON.parse(JSON.stringify(...))` — which drops non-enumerable properties.
 * `finalBody = providerRequestCapture.body(transformedBody)` then resolves to
 * that round-tripped copy, so the response-side un-cloak
 * (`mergeResponseToolNameMap` → `remapToolNamesInResponse`) sees an empty map
 * and the cloaked PascalCase name (`McpN8nMcpSearchWorkflows`) streams verbatim
 * to Claude Code, which rejects it client-side.
 *
 * These tests pin the lossy boundary: `createPreparedRequestLogger().body()`
 * must preserve the cloak map from the real (fallback) transformed body even
 * when the captured copy lost it to JSON serialization.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  createPreparedRequestLogger,
  type ProviderRequestPrepared,
} from "../../open-sse/utils/providerRequestLogging.ts";
import {
  cloakThirdPartyToolNames,
  remapToolNamesInResponse,
} from "../../open-sse/services/claudeCodeToolRemapper.ts";

function makeCapture() {
  const logged: unknown[] = [];
  const reqLogger = {
    logTargetRequest: (_url: unknown, _headers: Record<string, string>, body: unknown) => {
      logged.push(body);
    },
  };
  const scope = { id: null, model: "claude-opus-4-8", provider: "claude", connectionId: null };
  return { capture: createPreparedRequestLogger(reqLogger, scope), logged };
}

const ALIAS = "McpN8nMcpSearchWorkflows";
const ORIGINAL = "mcp__n8n-mcp__search_workflows";

function makeCloakedClaudeBody(): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: "claude-opus-4-8",
    messages: [{ role: "user", content: "hi" }],
    tools: [{ name: ORIGINAL, input_schema: { type: "object", properties: {} } }],
  };
  const map = cloakThirdPartyToolNames(body);
  // Sanity: the cloak fired and the alias matches the reporter's observed name.
  assert.equal((body.tools as Array<{ name: string }>)[0].name, ALIAS);
  assert.ok(map instanceof Map && map.get(ALIAS) === ORIGINAL);
  return body;
}

test("#4091 body() preserves the non-enumerable cloak map dropped by the capture round-trip", () => {
  const { capture } = makeCapture();
  const transformedBody = makeCloakedClaudeBody();

  // The fetch-capture serializes the outgoing body and rebuilds it — exactly
  // what `captureFetchRequest` does — which strips the non-enumerable map.
  const bodyString = JSON.stringify(transformedBody);
  const captured = JSON.parse(bodyString);
  assert.equal(
    (captured as Record<string, unknown>)._toolNameMap,
    undefined,
    "precondition: JSON round-trip drops the non-enumerable _toolNameMap"
  );
  const prepared: ProviderRequestPrepared = {
    url: "https://api.anthropic.com/v1/messages",
    headers: {},
    body: captured,
    bodyString,
  };
  capture.capture(prepared);

  // finalBody is what chatCore feeds to mergeResponseToolNameMap.
  const finalBody = capture.body(transformedBody) as Record<string, unknown>;
  const map = finalBody._toolNameMap;
  assert.ok(map instanceof Map, "finalBody must still carry the per-request cloak map");
  assert.equal((map as Map<string, string>).get(ALIAS), ORIGINAL);

  // End-to-end: the streamed tool_use.name is un-cloaked back to the registered
  // MCP name, so Claude Code can dispatch it instead of rejecting it.
  const chunk = `event: content_block_start\ndata: {"type":"tool_use","name":"${ALIAS}"}\n\n`;
  const restored = remapToolNamesInResponse(chunk, true, map as Map<string, string>);
  assert.ok(
    restored.includes(`"name":"${ORIGINAL}"`),
    "cloaked alias must be restored to the registered MCP tool name"
  );
  assert.ok(!restored.includes(`"name":"${ALIAS}"`), "cloaked alias must not leak to the client");
});

test("#4091 body() preserves the map kept non-enumerable on the captured copy too", () => {
  // Defensive: the map must not be re-attached enumerably (it must never
  // re-serialize into an upstream request body).
  const { capture } = makeCapture();
  const transformedBody = makeCloakedClaudeBody();
  const bodyString = JSON.stringify(transformedBody);
  capture.capture({
    url: "https://api.anthropic.com/v1/messages",
    headers: {},
    body: JSON.parse(bodyString),
    bodyString,
  });
  const finalBody = capture.body(transformedBody) as Record<string, unknown>;
  assert.ok(finalBody._toolNameMap instanceof Map);
  assert.ok(
    !Object.keys(finalBody).includes("_toolNameMap"),
    "_toolNameMap must stay non-enumerable so it never re-serializes upstream"
  );
  assert.ok(
    !JSON.stringify(finalBody).includes("_toolNameMap"),
    "_toolNameMap must not appear in a serialized provider body"
  );
});

test("#4091 body() leaves non-cloaked traffic untouched (no spurious map)", () => {
  const { capture } = makeCapture();
  const plainBody: Record<string, unknown> = {
    model: "claude-opus-4-8",
    messages: [{ role: "user", content: "hi" }],
    tools: [{ name: "Bash", input_schema: { type: "object" } }],
  };
  const bodyString = JSON.stringify(plainBody);
  capture.capture({
    url: "https://api.anthropic.com/v1/messages",
    headers: {},
    body: JSON.parse(bodyString),
    bodyString,
  });
  const finalBody = capture.body(plainBody) as Record<string, unknown>;
  assert.equal(finalBody._toolNameMap, undefined);
});

test("#4091 body() falls back to the original body when nothing was captured", () => {
  const { capture } = makeCapture();
  const transformedBody = makeCloakedClaudeBody();
  // No capture() call — body() returns the fallback, which already has the map.
  const finalBody = capture.body(transformedBody) as Record<string, unknown>;
  assert.ok(finalBody._toolNameMap instanceof Map);
});
