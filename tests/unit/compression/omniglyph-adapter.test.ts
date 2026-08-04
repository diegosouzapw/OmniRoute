import { test } from "node:test";
import assert from "node:assert";
import { omniglyphEngine } from "../../../open-sse/services/compression/engines/omniglyphAdapter.ts";

// Corpo Claude denso o bastante para o gate de rentabilidade do omniglyph converter.
const DENSE =
  "X".repeat(500) +
  "\n" +
  Array.from(
    { length: 400 },
    (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`
  ).join("\n");
function claudeBody(): Record<string, unknown> {
  return {
    model: "claude-fable-5",
    max_tokens: 128,
    system: DENSE,
    messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
  };
}
const OK = { model: "claude-fable-5", supportsVision: true, providerTransport: "direct" as const };

test("happy path: comprime corpo claude denso em blocos de imagem", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), OK);
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
});

test("skip fail-closed: sem supportsVision / transporte agregador / undefined", async () => {
  for (const opts of [
    { ...OK, supportsVision: false },
    { ...OK, providerTransport: "aggregator" as const },
    { model: "claude-fable-5", supportsVision: true }, // transport undefined
  ]) {
    const r = await omniglyphEngine.applyAsync!(claudeBody(), opts);
    assert.equal(r.compressed, false);
    assert.ok(!JSON.stringify(r.body).includes('"type":"image"'));
  }
});

test("skip: modelo fora da allowlist medida", async () => {
  const body = { ...claudeBody(), model: "gpt-5.5" };
  const r = await omniglyphEngine.applyAsync!(body, { ...OK, model: "gpt-5.5" });
  assert.equal(r.compressed, false);
});

test("skip: corpo em formato OpenAI (role system nas messages)", async () => {
  const body = {
    model: "claude-fable-5",
    messages: [
      { role: "system", content: DENSE },
      { role: "user", content: "oi" },
    ],
  };
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.equal(r.compressed, false);
});

test("cache_control do cliente sobrevive byte a byte", async () => {
  const body = claudeBody();
  (body.messages as Array<Record<string, unknown>>).push({
    role: "user",
    content: [{ type: "text", text: "âncora", cache_control: { type: "ephemeral" } }],
  });
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.ok(JSON.stringify(r.body).includes('"cache_control"'));
});

test("apply síncrono é pass-through seguro (engine async-only)", () => {
  const body = claudeBody();
  const r = omniglyphEngine.apply(body, OK);
  assert.equal(r.compressed, false);
  assert.deepEqual(r.body, body);
});

test("fail-open: erro no transform vira skip, nunca propaga", async () => {
  const body = claudeBody() as Record<string, unknown>;
  (body as { self?: unknown }).self = body; // referência circular → JSON.stringify lança
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.equal(r.compressed, false);
  assert.deepEqual(r.body, body); // corpo original devolvido intacto
});
