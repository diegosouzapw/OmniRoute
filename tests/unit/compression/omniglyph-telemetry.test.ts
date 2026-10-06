import { test } from "node:test";
import assert from "node:assert";
import { omniglyphEngine } from "../../../open-sse/services/compression/engines/omniglyphAdapter.ts";

// O OmniGlyph 1.4.0 expõe `normalizeAccounting()`, que classifica o GRAU DE
// EVIDÊNCIA da economia (provider-reported / estimated / bytes-only /
// unavailable) e resolve a semântica de cache por provider — Anthropic usa
// buckets disjuntos, OpenAI/xAI reportam cached como subconjunto do input.
// Somar à mão dá double-count. Antes disso o adapter descartava tudo e a UI
// exibia um número sem dizer de onde ele veio.

const SEGREDO = "sk-ant-api03-SEGREDO-QUE-NAO-PODE-VAZAR-NA-TELEMETRIA";
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
    system: `${DENSE}\nAPI_KEY=${SEGREDO}\ncwd=/home/operador/projeto-secreto`,
    messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
  };
}

const OK = {
  model: "claude-fable-5",
  provider: "anthropic",
  supportsVision: true,
  providerTransport: "direct" as const,
  imageTransportFidelity: "byte-preserving" as const,
};

test("stats do omniglyph carregam a contabilidade normalizada com grau de evidência", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), OK as never);
  assert.equal(r.compressed, true);

  const accounting = r.stats?.omniglyph;
  assert.ok(accounting, "compressão aplicada deve registrar a contabilidade");
  assert.equal(accounting.provider, "anthropic");
  assert.ok(
    ["provider-reported", "estimated", "bytes-only", "unavailable"].includes(
      accounting.savings.evidence
    ),
    `evidência inesperada: ${accounting.savings.evidence}`
  );
  // Sem contadores do provider nesta etapa, a base honesta é o tamanho do corpo.
  assert.equal(accounting.savings.evidence, "bytes-only");
  assert.ok(typeof accounting.bytes.original === "number" && accounting.bytes.original > 0);
  assert.ok(typeof accounting.bytes.transformed === "number");
  assert.ok(typeof accounting.images.count === "number" && accounting.images.count > 0);
  assert.ok(typeof accounting.images.bytes === "number" && accounting.images.bytes > 0);
});

test("telemetria não carrega conteúdo: nem base64, nem prompt, nem segredo, nem ambiente", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), OK as never);
  assert.equal(r.compressed, true);

  const serialized = JSON.stringify(r.stats);

  // Valores do request.
  assert.ok(!serialized.includes(SEGREDO), "segredo do system vazou na telemetria");
  assert.ok(!serialized.includes("projeto-secreto"), "caminho do operador vazou");
  assert.ok(!serialized.includes("const row_0 = compute"), "texto do system vazou");
  assert.ok(!serialized.includes("data:image/png;base64"), "data URL de imagem vazou");
  assert.ok(!serialized.includes("iVBORw0KGgo"), "cabeçalho PNG em base64 vazou");

  // Chaves do TransformInfo que carregam conteúdo, hash de conteúdo ou ambiente.
  for (const proibida of [
    "imageSourceText",
    "imageSourceTexts",
    "recoverable",
    "systemSha8",
    "claudeMdSha8",
    "firstUserSha8",
    "unknownStaticTags",
    "churningStaticTags",
    '"env"',
  ]) {
    assert.ok(!serialized.includes(proibida), `campo proibido na telemetria: ${proibida}`);
  }

  // A allowlist é positiva: todo valor da contabilidade é número, string de enum
  // conhecida, ou objeto desses. Nada de texto livre vindo do request.
  const accounting = r.stats?.omniglyph;
  assert.ok(accounting);
  const enums = new Set([
    "anthropic",
    "openai",
    "xai",
    "unknown",
    "provider-reported",
    "estimated",
    "bytes-only",
    "unavailable",
    "claude-fable-5",
  ]);
  const walk = (value: unknown, path: string): void => {
    if (value === undefined || value === null || typeof value === "number") return;
    if (typeof value === "string") {
      assert.ok(enums.has(value), `string fora da allowlist em ${path}: ${value}`);
      return;
    }
    assert.equal(typeof value, "object", `tipo inesperado em ${path}`);
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) walk(v, `${path}.${k}`);
  };
  walk(accounting, "omniglyph");
});

test("skip não inventa contabilidade", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), {
    ...OK,
    imageTransportFidelity: "unknown",
  } as never);
  assert.equal(r.compressed, false);
  assert.equal(r.stats?.omniglyph, undefined);
});
