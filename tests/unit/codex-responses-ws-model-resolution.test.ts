/**
 * tests/unit/codex-responses-ws-model-resolution.test.ts
 *
 * The Codex Responses-over-WebSocket bridge is codex-only, but the OpenAI Codex
 * CLI rejects provider-prefixed model ids ("codex/gpt-5.5") client-side when
 * `supports_websockets` is enabled and sends bare ids ("gpt-5.5"). Those can
 * resolve to a non-codex default provider, which the bridge would reject.
 * `resolveCodexWsModelInfo` re-resolves bare ids under the codex/ prefix.
 *
 * Empirically: with the bare id, ChatGPT's codex backend accepts model
 * "gpt-5.5" and streams a response; without this re-resolution OmniRoute routed
 * "gpt-5.5" to openrouter ("No credentials for provider: openrouter").
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveCodexWsModelInfo,
  type ModelResolver,
} from "../../src/app/api/internal/codex-responses-ws/modelResolution.ts";

// A resolver mirroring OmniRoute's real behavior: bare "gpt-5.5" → openrouter,
// but the codex/ prefix forces provider=codex with the prefix stripped.
const realisticResolver: ModelResolver = async (m) =>
  m.startsWith("codex/")
    ? { provider: "codex", model: m.slice("codex/".length) }
    : { provider: "openrouter", model: m };

test("bare ChatGPT model id re-resolves to codex provider with stripped model", async () => {
  const info = await resolveCodexWsModelInfo("gpt-5.5", realisticResolver);
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5", "model sent upstream must be the bare ChatGPT id");
});

test("provider-prefixed id is respected without a second resolve call", async () => {
  let calls = 0;
  const resolver: ModelResolver = async (m) => {
    calls += 1;
    return { provider: "codex", model: m.replace(/^codex\//, "") };
  };
  const info = await resolveCodexWsModelInfo("codex/gpt-5.5", resolver);
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
  assert.equal(calls, 1, "must not double-resolve an explicitly prefixed id");
});

test("first resolution already codex short-circuits", async () => {
  let calls = 0;
  const resolver: ModelResolver = async (m) => {
    calls += 1;
    return { provider: "codex", model: m };
  };
  const info = await resolveCodexWsModelInfo("gpt-5.5", resolver);
  assert.equal(info.provider, "codex");
  assert.equal(calls, 1);
});

test("genuinely non-codex model stays non-codex (bridge then rejects it)", async () => {
  const resolver: ModelResolver = async (m) => ({ provider: "openai", model: m });
  const info = await resolveCodexWsModelInfo("gpt-4o", resolver);
  assert.notEqual(info.provider, "codex");
});
