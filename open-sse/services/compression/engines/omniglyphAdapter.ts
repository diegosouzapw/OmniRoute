/**
 * OmniGlyph — compressão contexto-como-imagem (Anthropic/Fable 5 apenas).
 * Renderiza system prompt, tool docs, histórico antigo e tool_results grandes
 * como páginas PNG densas; o modelo lê as páginas no lugar do texto por ~10×
 * menos tokens no bloco convertido (59-70% ponta a ponta, medido).
 *
 * GATES (todos fail-closed; cada skip vira técnica `skip:<motivo>` nos stats):
 *  - supportsVision !== true            → skip:no_vision
 *  - modelo fora da allowlist medida    → skip:model_not_approved
 *  - providerTransport !== 'direct'     → skip:transport_not_direct
 *    (agregadores redimensionam imagens e destroem a legibilidade — medido)
 *  - corpo não é formato Claude nativo  → skip:source_format_not_claude
 *  - gate de rentabilidade interno do omniglyph decide o resto (patches 28px
 *    exatos; texto esparso/pequeno passa direto) → skip:not_profitable
 *
 * `sampling: true`: perda é INTENCIONAL (byte-exatos viajam no factsheet em
 * texto) — o fidelity gate pula esta engine por design, não por acidente.
 */
import type { CompressionEngine, CompressionEngineApplyOptions } from "./types.ts";
import type { CompressionResult } from "../types.ts";
import { createCompressionStats } from "../stats.ts";
import { transformAnthropicMessages, isOmniGlyphSupportedModel } from "omniglyph";

function skip(body: Record<string, unknown>, reason: string): CompressionResult {
  try {
    return {
      body,
      compressed: false,
      stats: createCompressionStats(body, body, "stacked", [`skip:${reason}`]),
    };
  } catch {
    // Fail-open guard: a non-serializable body (e.g. circular reference) makes
    // createCompressionStats' internal JSON.stringify throw too — stats become
    // best-effort telemetry, never a reason to propagate the error.
    return { body, compressed: false, stats: null };
  }
}

/** Formato Claude nativo: system no topo, nunca role:"system" dentro de messages. */
function isClaudeFormat(body: Record<string, unknown>): boolean {
  const messages = body.messages;
  if (!Array.isArray(messages)) return false;
  return !messages.some((m) => (m as { role?: string } | null)?.role === "system");
}

async function applyOmniglyph(
  body: Record<string, unknown>,
  options?: CompressionEngineApplyOptions
): Promise<CompressionResult> {
  const model = options?.model ?? (body as { model?: string }).model ?? "";
  if (options?.supportsVision !== true) return skip(body, "no_vision");
  if (!isOmniGlyphSupportedModel(model)) return skip(body, "model_not_approved");
  if (options?.providerTransport !== "direct") return skip(body, "transport_not_direct");
  if (!isClaudeFormat(body)) return skip(body, "source_format_not_claude");

  const started = Date.now();
  let outBody: Record<string, unknown>;
  try {
    const encoded = new TextEncoder().encode(JSON.stringify(body));
    const result = await transformAnthropicMessages({ body: encoded, model });
    if (!result.applied) return skip(body, result.reason ?? "not_profitable");
    outBody = JSON.parse(new TextDecoder().decode(result.body)) as Record<string, unknown>;
  } catch {
    // Fail-open: qualquer erro no encode/transform/decode (ex.: corpo não serializável,
    // render PNG estourando, JSON decodificado malformado) vira skip, nunca propaga.
    return skip(body, "transform_error");
  }

  return {
    body: outBody,
    compressed: true,
    stats: createCompressionStats(
      body,
      outBody,
      "stacked",
      ["omniglyph:context-as-image"],
      undefined,
      Date.now() - started
    ),
  };
}

export const omniglyphEngine: CompressionEngine = {
  id: "omniglyph",
  name: "OmniGlyph",
  description:
    "Contexto-como-imagem (Anthropic Fable 5, rota direta): system prompt, tool docs e histórico viram páginas PNG densas — ~10× menos tokens no bloco convertido.",
  icon: "image",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 90, // por último: RTK/Caveman limpam texto antes; omniglyph imageia o residual
  sampling: true, // perda intencional + factsheet → fidelity gate pula por design
  metadata: {
    id: "omniglyph",
    name: "OmniGlyph",
    description: "Contexto-como-imagem para Claude Fable 5 via rota direta Anthropic.",
    inputScope: "mixed",
    targetLatencyMs: 250, // render+encode PNG de páginas grandes
    supportsPreview: true,
    stable: false, // P1: preview — promover após o e2e P3 (30/30 via OmniRoute)
  },
  // Contrato da interface: engines async-only mantêm apply síncrono como pass-through seguro.
  apply(body) {
    return { body, compressed: false, stats: null };
  },
  applyAsync: applyOmniglyph,
  compress(body, config) {
    return this.apply(body, { stepConfig: config });
  },
  getConfigSchema() {
    return [];
  },
  validateConfig() {
    return { valid: true, errors: [] };
  },
};
