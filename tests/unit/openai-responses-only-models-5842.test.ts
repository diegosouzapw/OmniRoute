import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { openaiProvider } from "../../open-sse/config/providers/registry/openai/index.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";

// #5842 — OpenAI responses-only models (o1-pro / gpt-5.x-pro) 404 on
// /v1/chat/completions ("This model is only supported in v1/responses").
// The native `openai` provider must route them to /v1/responses, mirroring the
// gh executor's per-model targetFormat + heuristic routing (9router#102).

// --- Registry: curated responses-only entries are tagged ---

test("openai registry tags gpt-5.5-pro and gpt-5.4-pro as openai-responses", () => {
  for (const id of ["gpt-5.5-pro", "gpt-5.4-pro"]) {
    const entry = openaiProvider.models.find((m) => m.id === id);
    assert.ok(entry, `${id} must stay in the curated openai catalog`);
    assert.equal(
      entry.targetFormat,
      "openai-responses",
      `${id} is responses-only upstream and must carry targetFormat: "openai-responses"`
    );
  }
});

test("openai chat models stay untagged (default /chat/completions path)", () => {
  for (const id of ["gpt-5.5", "gpt-4o", "gpt-4.1", "o3"]) {
    assert.equal(
      getModelTargetFormat("openai", id),
      null,
      `${id} is a chat model and must not be re-routed`
    );
  }
});

// --- Heuristic: dynamically-synced *-pro ids (not in the curated catalog) ---

test("dynamically-synced OpenAI *-pro ids resolve to openai-responses", () => {
  for (const id of ["o1-pro", "gpt-5.2-pro"]) {
    assert.equal(
      getModelTargetFormat("openai", id),
      "openai-responses",
      `${id} should hit the -pro responses-only heuristic`
    );
  }
});

test("the -pro heuristic is scoped to the openai alias only", () => {
  // blackbox ships gpt-5.4-pro as a plain chat entry — other providers must not
  // inherit OpenAI's endpoint semantics.
  assert.equal(getModelTargetFormat("blackbox", "gpt-5.4-pro"), null);
});

// --- chatCore wire format resolution ---

test("resolveChatCoreTargetFormat picks openai-responses for openai pro models", () => {
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: "gpt-5.5-pro",
    apiFormat: undefined,
    customModelTargetFormat: undefined,
    providerSpecificData: null,
  });
  assert.equal(targetFormat, "openai-responses");
});

// --- Executor URL routing ---

test("DefaultExecutor routes openai responses-only models to /v1/responses", () => {
  const executor = new DefaultExecutor("openai");
  assert.equal(
    executor.buildUrl("gpt-5.5-pro", false),
    "https://api.openai.com/v1/responses"
  );
  assert.equal(executor.buildUrl("o1-pro", true), "https://api.openai.com/v1/responses");
});

test("DefaultExecutor keeps openai chat models on /v1/chat/completions", () => {
  const executor = new DefaultExecutor("openai");
  assert.equal(
    executor.buildUrl("gpt-4o", false),
    "https://api.openai.com/v1/chat/completions"
  );
  assert.equal(
    executor.buildUrl("gpt-5.5", true),
    "https://api.openai.com/v1/chat/completions"
  );
});

test("DefaultExecutor honors a custom openai base URL for both endpoints", () => {
  const executor = new DefaultExecutor("openai");
  const credentials = { providerSpecificData: { baseUrl: "https://gw.example.com/v1" } };
  assert.equal(
    executor.buildUrl("gpt-5.5-pro", false, 0, credentials),
    "https://gw.example.com/v1/responses"
  );
  assert.equal(
    executor.buildUrl("gpt-4o", false, 0, credentials),
    "https://gw.example.com/v1/chat/completions"
  );
});
