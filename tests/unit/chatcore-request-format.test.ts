// tests/unit/chatcore-request-format.test.ts
// Characterization of resolveChatCoreRequestFormat — the endpoint/format resolution slice extracted
// from the top of handleChatCore (chatCore god-file decomposition, #3501). Locks the endpointPath
// construction, the /responses detection, the nativeCodexPassthrough + isDroidCLI + copilot wiring,
// and the clientResponseFormat downgrade (OpenAI Responses shape off a non-/responses, non-Droid
// endpoint collapses to plain OpenAI).
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveChatCoreRequestFormat } from "../../open-sse/handlers/chatCore/requestFormat.ts";
import { shouldUseNativeCodexPassthrough } from "../../open-sse/handlers/chatCore/passthroughHelpers.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const base = {
  body: { messages: [{ role: "user", content: "hi" }] },
  provider: "openai",
  userAgent: "unit-test",
};

test("chat/completions endpoint → openai source, not a responses endpoint, no downgrade", () => {
  const r = resolveChatCoreRequestFormat({
    ...base,
    clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Headers() },
  });
  assert.equal(r.endpointPath, "/v1/chat/completions");
  assert.equal(r.sourceFormat, FORMATS.OPENAI);
  assert.equal(r.isResponsesEndpoint, false);
  assert.equal(r.clientResponseFormat, FORMATS.OPENAI);
  assert.equal(r.nativeCodexPassthrough, false); // provider !== codex
  assert.equal(r.isDroidCLI, false);
  assert.equal(r.copilotCompatibleReasoning, false);
});

test("/responses endpoint → openai-responses source + isResponsesEndpoint, kept (no downgrade)", () => {
  const r = resolveChatCoreRequestFormat({
    body: { input: "x" },
    provider: "openai",
    userAgent: "unit-test",
    clientRawRequest: { endpoint: "/v1/responses", headers: new Headers() },
  });
  assert.equal(r.sourceFormat, FORMATS.OPENAI_RESPONSES);
  assert.equal(r.isResponsesEndpoint, true);
  assert.equal(r.clientResponseFormat, FORMATS.OPENAI_RESPONSES);
});

test("Responses-shaped body on a /chat/completions endpoint downgrades clientResponseFormat to openai", () => {
  const r = resolveChatCoreRequestFormat({
    body: { input: "describe" }, // input + no messages → openai-responses via body
    provider: "openai",
    userAgent: "unit-test",
    clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Headers() },
  });
  assert.equal(r.sourceFormat, FORMATS.OPENAI_RESPONSES);
  assert.equal(r.isResponsesEndpoint, false);
  assert.equal(r.clientResponseFormat, FORMATS.OPENAI); // downgraded
});

test("Droid CLI suppresses the downgrade (clientResponseFormat stays openai-responses)", () => {
  const r = resolveChatCoreRequestFormat({
    body: { input: "describe" },
    provider: "openai",
    userAgent: "Droid/1.2 codex-cli",
    clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Headers() },
  });
  assert.equal(r.isDroidCLI, true);
  assert.equal(r.sourceFormat, FORMATS.OPENAI_RESPONSES);
  assert.equal(r.clientResponseFormat, FORMATS.OPENAI_RESPONSES); // !isDroidCLI is false → no downgrade
});

test("copilotCompatibleReasoning detects copilot via header or user-agent", () => {
  const viaUa = resolveChatCoreRequestFormat({
    ...base,
    userAgent: "GitHubCopilotChat/0.1",
    clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Headers() },
  });
  assert.equal(viaUa.copilotCompatibleReasoning, true);

  const viaHeader = resolveChatCoreRequestFormat({
    ...base,
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      headers: new Headers({ "x-client": "copilot-vscode" }),
    },
  });
  assert.equal(viaHeader.copilotCompatibleReasoning, true);
});

test("nativeCodexPassthrough delegates to shouldUseNativeCodexPassthrough (codex + responses)", () => {
  const r = resolveChatCoreRequestFormat({
    body: { input: "x" },
    provider: "codex",
    userAgent: "unit-test",
    clientRawRequest: { endpoint: "/v1/responses", headers: new Headers() },
  });
  assert.equal(
    r.nativeCodexPassthrough,
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: r.sourceFormat,
      endpointPath: r.endpointPath,
    })
  );
});

test("missing clientRawRequest → empty endpointPath", () => {
  const r = resolveChatCoreRequestFormat({ ...base, clientRawRequest: null });
  assert.equal(r.endpointPath, "");
});
