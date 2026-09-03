import test from "node:test";
import assert from "node:assert/strict";
import {
  formatMissingEmbeddingCredentialsError,
  formatUnknownEmbeddingProviderError,
  OPENROUTER_GEMINI_EMBEDDING_2,
  OPENROUTER_GEMINI_EMBEDDING_2_PREVIEW,
  NATIVE_GEMINI_EMBEDDING_2,
} from "../../../src/lib/embeddings/errors.ts";

test("missing gemini embed credentials name the working OpenRouter ids", () => {
  const message = formatMissingEmbeddingCredentialsError("gemini");
  assert.match(message, /^No credentials for embedding provider: gemini/);
  assert.match(message, new RegExp(OPENROUTER_GEMINI_EMBEDDING_2));
  assert.match(message, new RegExp(OPENROUTER_GEMINI_EMBEDDING_2_PREVIEW));
  assert.match(message, /Google AI Studio/);
});

test("missing credentials for other providers stay a short 400", () => {
  assert.equal(
    formatMissingEmbeddingCredentialsError("openai"),
    "No credentials for embedding provider: openai"
  );
});

test("unknown google provider names Gemini Embedding 2 workarounds", () => {
  const message = formatUnknownEmbeddingProviderError("google", "gemini-embedding-2");
  assert.match(message, /^Unknown embedding provider: google/);
  assert.match(message, new RegExp(OPENROUTER_GEMINI_EMBEDDING_2));
  assert.match(message, new RegExp(NATIVE_GEMINI_EMBEDDING_2));
});

test("unknown unrelated providers stay a short 400", () => {
  assert.equal(
    formatUnknownEmbeddingProviderError("not-a-provider", "text-embedding-3-small"),
    "Unknown embedding provider: not-a-provider. No matching hardcoded or local provider found."
  );
});
