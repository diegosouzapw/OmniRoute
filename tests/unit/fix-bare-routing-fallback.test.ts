import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";

// #FIX: end-to-end precedence checks for bare model routing. These guard
// the contract that:
//  - Bare Codex-default model ids (gpt-5.6-sol, gpt-5.5, etc.) ALWAYS route
//    to `codex`, regardless of which other providers are also active.
//  - Bare model ids shared between providers (e.g. claude-opus-5 across
//    anthropic/claude/github/agentrouter/etc.) never silently route to a
//    provider whose static registry does NOT actually catalog them (the
//    kiro-synced-catalog bug).
//  - Explicit `provider/model` prefixes always win over the bare inference.

test("bare gpt-5.6-sol routes to codex (precedence via CODEX_NATIVE_UNPREFIXED_MODELS)", async () => {
  const info = await getModelInfoCore("gpt-5.6-sol", null);
  assert.equal(
    info.provider,
    "codex",
    "bare gpt-5.6-sol must route to codex — the Codex CLI default"
  );
});

test("bare gpt-5.5 routes to codex", async () => {
  const info = await getModelInfoCore("gpt-5.5", null);
  assert.equal(info.provider, "codex");
});

test("bare gpt-5.6-sol-xhigh (a tier id) routes to codex", async () => {
  const info = await getModelInfoCore("gpt-5.6-sol-xhigh", null);
  assert.equal(info.provider, "codex");
});

test("explicit prefix overrides bare precedence (agentrouter/gpt-5.6-sol)", async () => {
  const info = await getModelInfoCore("agentrouter/gpt-5.6-sol", null);
  assert.equal(info.provider, "agentrouter");
});

test("explicit prefix overrides bare precedence (openai/gpt-5.6-sol)", async () => {
  const info = await getModelInfoCore("openai/gpt-5.6-sol", null);
  assert.equal(info.provider, "openai");
});

test("bare claude-opus-5 never resolves to kiro (synced-catalog validation)", async () => {
  // The bug: a kiro connection had claude-opus-5 in its synced /v1/models
  // cache (likely from a brief upstream quirk). The bare-routing path
  // accepted it as a candidate and routed traffic there, which then 404'd
  // because kiro's static registry never cataloged claude-opus-5.
  // The fix: validated synced candidates against the static registry.
  const info = await getModelInfoCore("claude-opus-5", null);
  assert.notEqual(
    info.provider,
    "kiro",
    `kiro must NOT win bare claude-opus-5 routing — it does not catalog the model`
  );
});

test("bare claude-opus-4-8 also never resolves to kiro (same fix must apply to all shared models)", async () => {
  const info = await getModelInfoCore("claude-opus-4-8", null);
  assert.notEqual(info.provider, "kiro");
});