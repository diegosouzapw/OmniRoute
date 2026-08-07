import test from "node:test";
import assert from "node:assert/strict";

import {
  ollama_localProvider,
  OLLAMA_DEFAULT_CONTEXT_LIMIT,
} from "../../open-sse/config/providers/registry/ollama-local/index.ts";

// Regression guard for the 24GB OOM. The OllamaExecutor sends each model's
// contextLength as a per-request `options.num_ctx` on the native /api/chat
// endpoint, so the registry values ARE the loaded KV window — they must be
// memory-aware, not GGUF-declared maxima (mistral-nemo "1 024 000",
// north-mini-code "500 000" would allocate ~40GB / ~50GB KV caches).
test("ollama-local: defaultContextLength is the safe baseline", () => {
  assert.equal(ollama_localProvider.defaultContextLength, OLLAMA_DEFAULT_CONTEXT_LIMIT);
  assert.ok(OLLAMA_DEFAULT_CONTEXT_LIMIT >= 32768);
});

test("ollama-local: every model has a positive contextLength", () => {
  assert.ok(ollama_localProvider.models.length > 0, "registry must not be empty");
  for (const model of ollama_localProvider.models) {
    assert.ok(
      typeof model.contextLength === "number" && model.contextLength > 0,
      `${model.id}: contextLength must be a positive number`
    );
  }
});

test("ollama-local: no model advertises its unreachable GGUF/Modelfile maximum", () => {
  const byId = Object.fromEntries(ollama_localProvider.models.map((m) => [m.id, m.contextLength]));
  // GGUF declares these maxima; loading a KV cache for them OOMs the 24GB box.
  assert.ok((byId["mistral-nemo:latest"] ?? 0) < 1_024_000, "mistral-nemo must not advertise 1M");
  assert.ok(
    (byId["north-mini-code-1.0:latest"] ?? 0) < 500_000,
    "north-mini-code must not advertise 500k"
  );
  assert.ok((byId["phi3.5:latest"] ?? 0) <= 32768, "phi3.5 (MHA KV-hog) must stay at 32k");
});

test("ollama-local: small models get the big windows the box can actually serve", () => {
  const byId = Object.fromEntries(ollama_localProvider.models.map((m) => [m.id, m.contextLength]));
  assert.equal(byId["qwen2.5vl:7b"], 131072, "qwen2.5vl 7B can serve 128k on 24GB");
  assert.equal(byId["llama3.1:latest"], 98304, "llama3.1 gets ~96k");
  assert.equal(byId["mistral-nemo:latest"], 65536, "mistral-nemo capped at 64k (KV budget)");
  assert.equal(byId["qwen2.5:14b"], 32768, "qwen2.5 14B is GGUF-capped at 32k");
});
