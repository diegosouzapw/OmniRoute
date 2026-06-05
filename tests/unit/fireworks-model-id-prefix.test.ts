import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";

// --- DefaultExecutor.transformRequest: modelIdPrefix logic ---

test("DefaultExecutor.transformRequest prepends modelIdPrefix for fireworks short model IDs", () => {
  const executor = new DefaultExecutor("fireworks");
  const body = { model: "kimi-k2p6", messages: [{ role: "user", content: "hi" }] };

  const result = executor.transformRequest("kimi-k2p6", body, false, {});

  assert.equal((result as Record<string, unknown>).model, "accounts/fireworks/models/kimi-k2p6");
});

test("DefaultExecutor.transformRequest does not double-prepend modelIdPrefix", () => {
  const executor = new DefaultExecutor("fireworks");
  const body = {
    model: "accounts/fireworks/models/kimi-k2p6",
    messages: [{ role: "user", content: "hi" }],
  };

  const result = executor.transformRequest("accounts/fireworks/models/kimi-k2p6", body, false, {});

  assert.equal((result as Record<string, unknown>).model, "accounts/fireworks/models/kimi-k2p6");
});

test("DefaultExecutor.transformRequest preserves fully-qualified fireworks router IDs (#3133)", () => {
  const executor = new DefaultExecutor("fireworks");
  const body = {
    model: "accounts/fireworks/routers/kimi-k2p6-turbo",
    messages: [{ role: "user", content: "hi" }],
  };

  const result = executor.transformRequest(
    "accounts/fireworks/routers/kimi-k2p6-turbo",
    body,
    false,
    {}
  );

  assert.equal(
    (result as Record<string, unknown>).model,
    "accounts/fireworks/routers/kimi-k2p6-turbo"
  );
});

test("DefaultExecutor.transformRequest does not modify model for providers without modelIdPrefix", () => {
  const executor = new DefaultExecutor("openai");
  const body = { model: "gpt-4.1", messages: [{ role: "user", content: "hi" }] };

  const result = executor.transformRequest("gpt-4.1", body, false, {});

  assert.equal((result as Record<string, unknown>).model, "gpt-4.1");
});

// --- Registry: modelIdPrefix field ---

test("Fireworks registry entry has modelIdPrefix defined", () => {
  const entry = REGISTRY["fireworks"];
  assert.ok(entry, "fireworks entry should exist in REGISTRY");
  assert.equal(entry.modelIdPrefix, "accounts/fireworks/models/");
});

test("Fireworks registry models use short IDs (no prefix)", () => {
  const entry = REGISTRY["fireworks"];
  assert.ok(entry, "fireworks entry should exist in REGISTRY");

  for (const model of entry.models) {
    assert.ok(
      !model.id.startsWith("accounts/fireworks/models/"),
      `Model "${model.id}" should use short ID without prefix`
    );
  }
});

test("Fireworks registry entry has modelsUrl for dynamic sync", () => {
  const entry = REGISTRY["fireworks"];
  assert.ok(entry, "fireworks entry should exist in REGISTRY");
  assert.ok(entry.modelsUrl, "fireworks should have modelsUrl for model sync");
  assert.ok(entry.modelsUrl.includes("fireworks.ai"), "modelsUrl should point to Fireworks API");
});
