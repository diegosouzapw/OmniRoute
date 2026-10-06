import { test } from "node:test";
import assert from "node:assert";
import { estimateCompressionTokens } from "../../../open-sse/services/compression/stats.ts";
import { transformAnthropicMessages, transformOpenAIChatCompletions } from "omniglyph";

const CHARS_PER_TOKEN = 4;

// Corpo Claude denso o bastante para o gate de rentabilidade do omniglyph converter
// (mesmo fixture usado em omniglyph-adapter.test.ts / omniglyph-plumbing.test.ts).
const DENSE =
  "X".repeat(500) +
  "\n" +
  Array.from(
    { length: 400 },
    (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`
  ).join("\n");

const DENSE_CLAUDE_BODY = {
  model: "claude-fable-5",
  max_tokens: 128,
  system: DENSE,
  messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
};

test("estimateCompressionTokens é image-aware: encolhe de verdade numa página omniglyph real", async () => {
  const encoded = new TextEncoder().encode(JSON.stringify(DENSE_CLAUDE_BODY));
  const result = await transformAnthropicMessages({ body: encoded, model: "claude-fable-5" });
  assert.ok(
    result.applied,
    `omniglyph deveria ter convertido o corpo denso (reason=${result.reason})`
  );
  const outBody = JSON.parse(new TextDecoder().decode(result.body)) as Record<string, unknown>;
  assert.ok(
    JSON.stringify(outBody).includes('"type":"image"'),
    "saída deveria conter bloco de imagem"
  );

  const naiveCharEstimate = Math.ceil(JSON.stringify(outBody).length / CHARS_PER_TOKEN);
  const imageAwareEstimate = estimateCompressionTokens(outBody);
  const originalTextEstimate = estimateCompressionTokens(DENSE_CLAUDE_BODY);

  console.log(
    `naive-char=${naiveCharEstimate} image-aware=${imageAwareEstimate} original-text=${originalTextEstimate}`
  );

  // O estimador ciente de imagem deve ser MUITO menor que o char-count ingênuo do
  // próprio base64 (prova que o base64 não é contado por char).
  assert.ok(
    imageAwareEstimate < naiveCharEstimate,
    `esperado image-aware (${imageAwareEstimate}) < naive-char (${naiveCharEstimate})`
  );
  // E deve representar encolhimento real frente ao texto original (não só frente ao
  // próprio char-count do PNG).
  assert.ok(
    imageAwareEstimate < originalTextEstimate,
    `esperado image-aware (${imageAwareEstimate}) < original-text (${originalTextEstimate})`
  );
});

test("regressão: corpo sem imagem estima o MESMO valor de antes (char-count puro)", () => {
  const plainBody = {
    model: "claude-sonnet-5",
    max_tokens: 128,
    system: "prompt curto",
    messages: [{ role: "user", content: [{ type: "text", text: "olá, tudo bem?" }] }],
  };
  const expected = Math.ceil(JSON.stringify(plainBody).length / CHARS_PER_TOKEN);
  assert.equal(estimateCompressionTokens(plainBody), expected);
});

test("estimateCompressionTokens contabiliza image_url PNG no wire OpenAI", async () => {
  const originalBody = {
    model: "gpt-5.6",
    messages: [
      { role: "system", content: DENSE },
      { role: "user", content: "oi" },
    ],
  };
  const encoded = new TextEncoder().encode(JSON.stringify(originalBody));
  const result = await transformOpenAIChatCompletions(encoded);
  assert.equal(result.info.compressed, true);
  const compressedBody = JSON.parse(new TextDecoder().decode(result.body)) as Record<
    string,
    unknown
  >;
  assert.ok(JSON.stringify(compressedBody).includes('"type":"image_url"'));

  const originalEstimate = estimateCompressionTokens(originalBody);
  const compressedEstimate = estimateCompressionTokens(compressedBody);
  const naiveEstimate = Math.ceil(JSON.stringify(compressedBody).length / CHARS_PER_TOKEN);
  assert.ok(
    compressedEstimate < naiveEstimate,
    `expected image-aware (${compressedEstimate}) < base64 char estimate (${naiveEstimate})`
  );
  assert.ok(
    compressedEstimate < originalEstimate,
    `expected OpenAI image compression (${compressedEstimate}) < original (${originalEstimate})`
  );
});
