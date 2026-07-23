import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// #7339 — regression guard for the chatCore.ts call site added right after the
// existing interceptSearch block. Proves that with no interceptFetch DB row
// configured (the default/common case), a request carrying a native web_fetch
// tool declaration produces a BYTE-IDENTICAL outgoing body to pre-#7339
// behavior — chatCore.ts never called any web_fetch interception logic before
// this change, so "byte-identical" here means prepareWebFetchFallbackBody must
// be a true no-op end to end (resolver -> body-prep), not just individually.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-chatcore-intercept-fetch-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const { setInterceptionRules, resolveInterceptFetch } = await import(
  "../../src/lib/db/interceptionRules.ts"
);
const { prepareWebFetchFallbackBody } = await import(
  "../../open-sse/services/webFetchInterception.ts"
);

function buildRequestBody() {
  return {
    model: "gpt-5",
    messages: [{ role: "user", content: "Summarize https://example.com" }],
    tools: [{ type: "web_fetch" }],
  };
}

// Mirrors the exact two-call sequence chatCore.ts now runs at its interceptFetch
// call site: resolveInterceptFetch(provider, effectiveModel) followed by
// prepareWebFetchFallbackBody(body, { ...options, interceptFetchOverride }).
function runChatCoreInterceptFetchStep(
  provider: string,
  effectiveModel: string,
  body: Record<string, unknown>
) {
  const interceptFetchOverride = resolveInterceptFetch(provider, effectiveModel);
  return prepareWebFetchFallbackBody(body, {
    provider,
    sourceFormat: "openai",
    targetFormat: "openai",
    nativeCodexPassthrough: false,
    interceptFetchOverride,
  });
}

describe("chatCore.ts interceptFetch call site — flag-off regression guard (#7339)", () => {
  function resetDb() {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  beforeEach(() => {
    resetDb();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("leaves the outgoing body byte-identical when no interceptFetch rule is configured", () => {
    const originalBody = buildRequestBody();
    const preChangeSerialized = JSON.stringify(originalBody);

    const { body: nextBody, fallback } = runChatCoreInterceptFetchStep(
      "openai",
      "gpt-5",
      originalBody
    );

    assert.equal(fallback.enabled, false);
    assert.equal(JSON.stringify(nextBody), preChangeSerialized);
    assert.equal(nextBody, originalBody, "must be the same object reference — true no-op");
  });

  it("leaves the body untouched for a request with no web_fetch tool at all, regardless of rule state", () => {
    setInterceptionRules("openai", { interceptFetch: true });
    const originalBody = {
      model: "gpt-5",
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "get_weather", parameters: {} } }],
    };
    const preChangeSerialized = JSON.stringify(originalBody);

    const { body: nextBody, fallback } = runChatCoreInterceptFetchStep(
      "openai",
      "gpt-5",
      originalBody
    );

    assert.equal(fallback.enabled, false);
    assert.equal(JSON.stringify(nextBody), preChangeSerialized);
  });

  it("only converts the tool once the operator explicitly opts a provider/model into interceptFetch", () => {
    setInterceptionRules("openai", { interceptFetch: true });
    const originalBody = buildRequestBody();

    const { body: nextBody, fallback } = runChatCoreInterceptFetchStep(
      "openai",
      "gpt-5",
      originalBody
    );

    assert.equal(fallback.enabled, true);
    assert.notEqual(nextBody, originalBody);
    assert.equal(originalBody.tools[0].type, "web_fetch", "the input object itself is untouched");
  });
});
