// Probe for issue #6699 -- "Google Jules provider validation rejects a valid API key".
//
// A second reporter (MohammadMD1383) supplied screenshots showing that OmniRoute, when
// actually routing a chat-completion request for a saved "jules" connection, sends the
// request to https://api.openai.com/v1/chat/completions and surfaces OpenAI's own
// "Incorrect API key provided ... platform.openai.com" error -- even though the provider
// is displayed as JULES with target "jules/jules". This probe proves the executor-level
// root cause directly: getExecutor("jules") has no specialized executor and no REGISTRY
// entry, so DefaultExecutor's constructor silently falls back to PROVIDERS.openai,
// making buildUrl() return OpenAI's endpoint for a provider the user believes is Jules.
import test from "node:test";
import assert from "node:assert/strict";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

test("#6699: jules has no specialized executor (falls through to DefaultExecutor)", () => {
  assert.equal(hasSpecializedExecutor("jules"), false);
});

test("#6699: a chat-completion request routed to provider 'jules' must not silently hit OpenAI's endpoint", () => {
  // Desired behavior: the Jules provider (a cloud-agent, registered only in
  // CLOUD_AGENT_PROVIDERS/staticModels, never in the chat REGISTRY) must not silently
  // resolve to OpenAI's chat/completions endpoint when routed through the normal
  // chat-completions executor path. getExecutor() now throws a clear, sanitized error
  // for this narrow set of chat-unsupported cloud-agent providers instead of falling
  // through to DefaultExecutor's `PROVIDERS.openai` fallback (which produced the
  // "Incorrect API key provided ... platform.openai.com" error the reporter saw for a
  // genuine Jules key). Before the fix, getExecutor("jules") returned a working
  // executor whose buildUrl() resolved to OpenAI's endpoint -- this assertion FAILS on
  // unfixed release/v3.8.49 code because no error is thrown at all.
  assert.throws(
    () => getExecutor("jules"),
    (err) => {
      assert.match(err.message, /cloud-agent provider/i);
      assert.match(err.message, /does not support direct chat completions/i);
      assert.equal(err.status, 400);
      return true;
    },
    "provider 'jules' must raise a clear error instead of silently inheriting OpenAI's base URL/config"
  );
});
