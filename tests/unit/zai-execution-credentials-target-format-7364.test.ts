// tests/unit/zai-execution-credentials-target-format-7364.test.ts
// #7364 Defect A: resolveExecutionCredentials must thread a resolved "openai"
// targetFormat onto providerSpecificData for the "zai"/"glm-coding-apikey" providers,
// so DefaultExecutor.buildUrl()'s zai branch (open-sse/executors/default/zaiFormatOverride.ts)
// can see the per-model custom-model targetFormat override (#2905) and route to the
// OpenAI-compatible endpoint instead of the default Anthropic Messages URL.
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveExecutionCredentials } from "../../open-sse/handlers/chatCore/executionCredentials.ts";

const base = {
  credentials: { providerSpecificData: { foo: "bar" } } as Record<string, unknown>,
  nativeCodexPassthrough: false,
  endpointPath: "/v1/messages",
  ccSessionId: null,
};

test("zai + resolved openai targetFormat threads providerSpecificData.targetFormat", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "zai",
    targetFormat: "openai",
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, { foo: "bar", targetFormat: "openai" });
});

test("glm-coding-apikey + resolved openai targetFormat threads providerSpecificData.targetFormat", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "glm-coding-apikey",
    targetFormat: "openai",
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, { foo: "bar", targetFormat: "openai" });
});

test("zai + default claude targetFormat does NOT inject a targetFormat override", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "zai",
    targetFormat: "claude",
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, { foo: "bar" });
});

test("unrelated provider (openai) with targetFormat=openai is untouched by the zai branch", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "openai",
    targetFormat: "openai",
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, { foo: "bar" });
});
