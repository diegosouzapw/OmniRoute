import test from "node:test";
import assert from "node:assert/strict";

import {
  CODEX_NATIVE_UNPREFIXED_MODELS,
  getModelInfoCore,
} from "../../open-sse/services/model.ts";

// #FIX: bare Codex-default model ids must always route to the `codex`
// provider (chatgpt.com OAuth) when no provider prefix is supplied, even
// when other providers that also catalog the id (e.g. `agentrouter`,
// `openai`) are active. The Codex cookie quota is the source of truth —
// auto-fanning to other providers silently breaks the "default" experience.

test("CODEX_NATIVE_UNPREFIXED_MODELS includes gpt-5.6-sol tier set", () => {
  for (const id of [
    "gpt-5.6-sol",
    "gpt-5.6-sol-max",
    "gpt-5.6-sol-xhigh",
    "gpt-5.6-sol-high",
    "gpt-5.6-sol-medium",
    "gpt-5.6-sol-low",
    "gpt-5.6-terra",
    "gpt-5.6-terra-xhigh",
    "gpt-5.6-luna",
    "gpt-5.6-luna-xhigh",
    "gpt-5.5",
    "gpt-5.5-xhigh",
    "gpt-5.5-medium",
    "gpt-5.5-low",
    "gpt-5.3-codex-spark",
    "codex-auto-review",
  ]) {
    assert.equal(
      CODEX_NATIVE_UNPREFIXED_MODELS.has(id),
      true,
      `expected CODEX_NATIVE_UNPREFIXED_MODELS to include ${id}`
    );
  }
});

test("bare gpt-5.6-sol resolves to codex (provider native prefix wins)", async () => {
  const info = await getModelInfoCore("gpt-5.6-sol", null);
  assert.equal(info.provider, "codex", "bare gpt-5.6-sol must route to codex");
  assert.equal(info.model, "gpt-5.6-sol");
});

test("bare gpt-5.5 resolves to codex", async () => {
  const info = await getModelInfoCore("gpt-5.5", null);
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
});

test("bare gpt-5.6-sol-max resolves to codex", async () => {
  const info = await getModelInfoCore("gpt-5.6-sol-max", null);
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.6-sol-max");
});

test("agentrouter/gpt-5.6-sol (explicit prefix) routes to agentrouter", async () => {
  const info = await getModelInfoCore("agentrouter/gpt-5.6-sol", null);
  assert.equal(info.provider, "agentrouter");
  assert.equal(info.model, "gpt-5.6-sol");
});

test("openai/gpt-5.6-sol (explicit prefix) routes to openai", async () => {
  const info = await getModelInfoCore("openai/gpt-5.6-sol", null);
  assert.equal(info.provider, "openai");
  assert.equal(info.model, "gpt-5.6-sol");
});

test("codex-auto-review remains in the precedence set (regression guard)", async () => {
  // Pre-fix regression: removing/replacing the set would silently break the
  // `/review` codepath that ships with the Codex CLI.
  assert.equal(CODEX_NATIVE_UNPREFIXED_MODELS.has("codex-auto-review"), true);
  const info = await getModelInfoCore("codex-auto-review", null);
  assert.equal(info.provider, "codex");
});