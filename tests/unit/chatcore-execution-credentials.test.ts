// tests/unit/chatcore-execution-credentials.test.ts
// Characterization of resolveExecutionCredentials — the per-execution credentials builder extracted
// from handleChatCore (chatCore god-file decomposition, #3501). Locks: the native-Codex passthrough
// endpoint override, the Azure AI / OCI apiType=responses forcing (+ responses-upstream marker) only
// under the OpenAI Responses target format, respecting an explicit apiType, and the Claude Code
// session-id threading.
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveExecutionCredentials } from "../../open-sse/handlers/chatCore/executionCredentials.ts";

const RESPONSES = "openai-responses";

const base = {
  credentials: { providerSpecificData: { foo: "bar" } } as Record<string, unknown>,
  nativeCodexPassthrough: false,
  endpointPath: "/v1/responses",
  targetFormat: "openai",
  provider: "openai",
  ccSessionId: null,
};

test("non-passthrough leaves credentials without a requestEndpointPath", () => {
  const out = resolveExecutionCredentials({ ...base }) as Record<string, unknown>;
  assert.equal("requestEndpointPath" in out, false);
  assert.deepEqual(out.providerSpecificData, { foo: "bar" });
});

test("native Codex passthrough injects requestEndpointPath", () => {
  const out = resolveExecutionCredentials({
    ...base,
    nativeCodexPassthrough: true,
  }) as Record<string, unknown>;
  assert.equal(out.requestEndpointPath, "/v1/responses");
});

test("azure-ai + responses target forces apiType=responses and the upstream marker", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "azure-ai",
    targetFormat: RESPONSES,
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, "responses");
  assert.equal(psd._omnirouteForceResponsesUpstream, true);
});

test("a non-responses apiType is forced to responses under the responses target", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "oci",
    targetFormat: RESPONSES,
    credentials: { providerSpecificData: { apiType: "chat" } },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, "responses");
  assert.equal(psd._omnirouteForceResponsesUpstream, true);
});

test("an explicit apiType=responses is preserved (guard short-circuits the reassignment)", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "oci",
    targetFormat: RESPONSES,
    credentials: { providerSpecificData: { apiType: "responses" } },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, "responses");
  assert.equal(psd._omnirouteForceResponsesUpstream, true);
});

test("non azure/oci providers never get apiType forcing", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "openai",
    targetFormat: RESPONSES,
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, undefined);
  assert.equal(psd._omnirouteForceResponsesUpstream, undefined);
});

test("ccSessionId is threaded into providerSpecificData when present", () => {
  const out = resolveExecutionCredentials({
    ...base,
    ccSessionId: "sess-123",
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.ccSessionId, "sess-123");
  assert.equal(psd.foo, "bar");
});

test("missing providerSpecificData defaults to an empty object", () => {
  const out = resolveExecutionCredentials({
    ...base,
    credentials: { connectionId: "c1" },
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, {});
});

test("Kimi execution credentials carry the discovered protocol and thinking policy", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "kimi-coding",
    targetFormat: "claude",
    modelInfo: {
      supportsThinking: true,
      alwaysThinking: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
      defaultThinkingEffort: "medium",
    },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd._omnirouteKimiTargetFormat, "claude");
  assert.deepEqual(psd._omnirouteKimiThinking, {
    supportsThinking: true,
    alwaysThinking: true,
    supportedThinkingEfforts: ["low", "medium", "high"],
    defaultThinkingEffort: "medium",
  });
});

test("Kimi Code k3 exposes its documented efforts from the offline policy before model import", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "kimi-coding",
    targetFormat: "claude",
    modelInfo: { model: "k3" },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.deepEqual(psd._omnirouteKimiThinking, {
    supportsThinking: true,
    supportedThinkingEfforts: ["low", "high", "max"],
    defaultThinkingEffort: "max",
  });
});
