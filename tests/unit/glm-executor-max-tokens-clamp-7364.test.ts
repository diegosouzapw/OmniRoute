// tests/unit/glm-executor-max-tokens-clamp-7364.test.ts
// #7364 Defect B: GlmExecutor.execute() drives its own fetch flow (executeTransport /
// transformForTransport) and never runs through DefaultExecutor.execute()'s
// stripUnsupportedParams() call site — so a STRIP_RULES clamp entry for provider "glm"
// was dead code until transformForTransport() called it directly. This proves the wiring,
// not just the STRIP_RULES entry (see zai-glm-max-tokens-clamp-7364.test.ts for that).
import test from "node:test";
import assert from "node:assert/strict";

import { GlmExecutor } from "../../open-sse/executors/glm.ts";

test("GlmExecutor.transformForTransport clamps an oversized client max_tokens for glm-4.6v (openai transport)", () => {
  const executor = new GlmExecutor("glm");
  const body = { messages: [{ role: "user", content: "describe this image" }], max_tokens: 65536 };

  const transformed = executor.transformForTransport(
    "glm-4.6v",
    body,
    false,
    { apiKey: "glm-key" },
    "openai"
  ) as { max_tokens?: number };

  assert.equal(
    transformed.max_tokens,
    32768,
    "#7364: glm-4.6v max_tokens above the catalog ceiling must be clamped by the real GlmExecutor transform path"
  );
});

test("GlmExecutor.transformForTransport leaves an in-range max_tokens for glm-4.6v untouched", () => {
  const executor = new GlmExecutor("glm");
  const body = { messages: [{ role: "user", content: "describe this image" }], max_tokens: 2048 };

  const transformed = executor.transformForTransport(
    "glm-4.6v",
    body,
    false,
    { apiKey: "glm-key" },
    "openai"
  ) as { max_tokens?: number };

  assert.equal(transformed.max_tokens, 2048);
});
