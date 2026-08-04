import { test } from "node:test";
import assert from "node:assert/strict";
import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";

test("#7617: stripUnsupportedParams strips prompt_cache_key for nvidia when present", () => {
  const body: Record<string, unknown> = {
    model: "some-nvidia-model",
    prompt_cache_key: "codex-cli-session-abc123",
    max_tokens: 512,
  };
  stripUnsupportedParams("nvidia", "some-nvidia-model", body);
  assert.equal(
    body.prompt_cache_key,
    undefined,
    "prompt_cache_key must be stripped for nvidia"
  );
  assert.equal(body.max_tokens, 512, "unrelated params must be preserved");
});

test("#7617: stripUnsupportedParams preserves prompt_cache_key for non-nvidia providers (e.g. openai)", () => {
  const body: Record<string, unknown> = {
    model: "gpt-5.4",
    prompt_cache_key: "some-cache-key",
  };
  stripUnsupportedParams("openai", "gpt-5.4", body);
  assert.equal(
    body.prompt_cache_key,
    "some-cache-key",
    "prompt_cache_key must be preserved for non-nvidia providers"
  );
});

test("#7617: stripUnsupportedParams is a no-op for nvidia when prompt_cache_key is absent", () => {
  const body: Record<string, unknown> = {
    model: "some-nvidia-model",
    max_tokens: 256,
  };
  stripUnsupportedParams("nvidia", "some-nvidia-model", body);
  assert.equal("prompt_cache_key" in body, false);
  assert.equal(body.max_tokens, 256);
});
