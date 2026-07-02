import { test } from "node:test";
import assert from "node:assert/strict";

import {
  LOCAL_PROVIDERS,
  isLocalProvider,
  isSelfHostedChatProvider,
} from "@/shared/constants/providers";
import { DefaultExecutor } from "@omniroute/open-sse/executors/default.ts";

// #5578: Ollama is the most popular local runtime, yet OmniRoute only shipped
// `ollama-cloud` (api-key, cloud) and `ollama-search` (web search). There was no
// first-class card for the local Ollama runtime (localhost:11434). This adds
// `ollama-local` to the local catalog so users get a dedicated card instead of
// falling back to the generic `openai-compatible-*` provider.

test("ollama-local is a first-class entry in the local catalog", () => {
  const entry = LOCAL_PROVIDERS["ollama-local"];
  assert.ok(entry, "ollama-local must be defined in LOCAL_PROVIDERS");
  assert.equal(entry.id, "ollama-local");
  assert.equal(entry.name, "Ollama");
  // Ollama exposes an OpenAI-compatible surface at /v1 on its default port.
  assert.equal(entry.localDefault, "http://localhost:11434/v1");
  // Models are listed via the OpenAI-compatible /v1/models passthrough.
  assert.equal(entry.passthroughModels, true);
});

test("ollama-local is classified as a local, self-hosted chat provider", () => {
  assert.equal(isLocalProvider("ollama-local"), true);
  assert.equal(isSelfHostedChatProvider("ollama-local"), true);
});

test("ollama-local buildUrl routes to the configured local baseUrl, not OpenAI", () => {
  const executor = new DefaultExecutor("ollama-local");
  const url = executor.buildUrl("llama3.2", true, 0, {
    providerSpecificData: { baseUrl: "http://127.0.0.1:11434/v1" },
  });

  assert.equal(url, "http://127.0.0.1:11434/v1/chat/completions");
  assert.equal(new URL(url).hostname, "127.0.0.1", `expected local host, got ${url}`);
});

test("ollama-local buildUrl falls back to localhost:11434, never OpenAI, when no baseUrl is set", () => {
  const executor = new DefaultExecutor("ollama-local");
  const url = executor.buildUrl("llama3.2", true, 0, {});

  assert.equal(url, "http://localhost:11434/v1/chat/completions");
  assert.equal(new URL(url).hostname, "localhost", `expected local default host, got ${url}`);
  assert.notEqual(new URL(url).hostname, "api.openai.com");
});
