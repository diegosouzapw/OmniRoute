/**
 * #3166 — kilocode must use the OpenAI-compatible format + default executor.
 *
 * kilocode hits an `api.kilo.ai` endpoint (`/api/openrouter/chat/completions`)
 * that returns the OpenAI chat-completions shape — the same family as its
 * sibling `kilo-gateway`. It was previously registered with
 * `format/executor: "openrouter"`, which applied OpenRouter-specific handling
 * the endpoint does not expect. Align it with `kilo-gateway` (format "openai",
 * executor "default").
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

test("#3166 kilocode uses the OpenAI format + default executor (matches kilo-gateway)", () => {
  const reg = REGISTRY as Record<string, Record<string, unknown>>;
  const kilocode = reg.kilocode;
  assert.ok(kilocode, "kilocode should be present in the executor registry");
  assert.equal(kilocode.format, "openai");
  assert.equal(kilocode.executor, "default");

  // Consistency with the sibling api.kilo.ai provider.
  const gateway = reg["kilo-gateway"];
  if (gateway) {
    assert.equal(kilocode.format, gateway.format, "kilocode format must match kilo-gateway");
    assert.equal(
      kilocode.executor,
      gateway.executor,
      "kilocode executor must match kilo-gateway"
    );
  }
});
