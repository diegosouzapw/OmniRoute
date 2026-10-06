/**
 * OmniGlyph — compressão contexto-como-imagem para os wires Anthropic e OpenAI.
 * A versão 1.3.x do pacote também traz transformadores nativos para Chat
 * Completions e Responses; o adaptador escolhe o transformador pelo formato do
 * provider, nunca pelo formato que o cliente usou na entrada.
 *
 * GATES (todos fail-closed; cada skip vira técnica `skip:<motivo>` nos stats):
 *  - supportsVision !== true            → skip:no_vision
 *  - modelo fora da allowlist medida    → skip:model_not_approved
 *  - providerTransport !== 'direct'     → skip:transport_not_direct
 *    (agregadores redimensionam imagens e destroem a legibilidade — medido)
 *  - imageTransportFidelity !== 'byte-preserving' → skip:transport_fidelity_unknown/resizes
 *  - wire não é Claude/OpenAI suportado → skip:target_format_not_supported
 *  - gate de rentabilidade interno do omniglyph decide o resto (patches 28px
 *    exatos; texto esparso/pequeno passa direto) → skip:not_profitable
 *
 * `sampling: true`: perda é INTENCIONAL (byte-exatos viajam no factsheet em
 * texto) — o fidelity gate pula esta engine por design, não por acidente.
 */
import type { CompressionEngine, CompressionEngineApplyOptions } from "./types.ts";
import type { CompressionResult } from "../types.ts";
import { createCompressionStats } from "../stats.ts";
import {
  buildOmniGlyphAccounting,
  type OmniGlyphAccounting,
} from "../omniglyphTelemetry.ts";
import {
  isOmniGlyphSupportedModelForScope,
  mergeCompressionProfileOptions,
  resolveCompressionProfile,
  transformAnthropicMessages,
  transformOpenAIChatCompletions,
  transformOpenAIResponses,
  type CompressionProfile,
  type OmniGlyphSafetyScope,
} from "omniglyph";
import { isModelImageable } from "omniglyph/applicability";

/**
 * Teto de modelos do OmniRoute — sempre o escopo mais restrito do pacote.
 *
 * `isOmniGlyphSupportedModel()` resolve o escopo lendo `OMNIGLYPH_PROFILE` do
 * processo, e a lista base sai de `OMNIGLYPH_MODELS`. Duas variáveis do HOST
 * decidiriam, em silêncio, o gate de todo request do OmniRoute: `passthrough`
 * desligaria a engine inteira e `OMNIGLYPH_MODELS` ADMITIRIA modelos sem
 * recibo medido — enquanto a UI continua prometendo "Claude Fable 5 na rota
 * direta medida". Fixar o escopo mais restrito faz o gate só poder ESTREITAR
 * pela env, nunca alargar, e mantém a decisão na configuração do OmniRoute.
 */
const MEASURED_MODEL_SCOPE: OmniGlyphSafetyScope = "coding-safe";

/**
 * Perfil padrão do OmniRoute.
 *
 * `aggressive` é a política que os recibos publicados mediram. `coding-safe` e
 * `balanced` fixam `minCompressChars` no máximo e só colapsam histórico antigo:
 * medido nesta base, uma sessão sem histórico acumulado fica em
 * `below_min_chars` e a engine não faz nada — o operador veria "ligado, 0% de
 * ganho". Ficam disponíveis como escolha explícita, não como default.
 */
const DEFAULT_PROFILE: OmniGlyphSafetyScope = "aggressive";

/** Perfil do passo (mais específico) > perfil global > default do OmniRoute. */
function resolveProfileName(options?: CompressionEngineApplyOptions): string {
  const step = options?.stepConfig?.profile;
  if (typeof step === "string" && step.trim()) return step;
  const global = (options?.config as { omniglyph?: { profile?: unknown } } | undefined)?.omniglyph
    ?.profile;
  if (typeof global === "string" && global.trim()) return global;
  return DEFAULT_PROFILE;
}

/**
 * O modelo precisa passar no teto medido E no escopo em vigor. Os dois wires
 * (Anthropic e GPT) compartilham a mesma allowlist no pacote desde 1.4.0, então
 * uma única checagem cobre os dois.
 */
function isModelWithinScope(model: string, scope: OmniGlyphSafetyScope): boolean {
  if (!isOmniGlyphSupportedModelForScope(model, MEASURED_MODEL_SCOPE)) return false;
  return isOmniGlyphSupportedModelForScope(model, scope);
}

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

type OmniGlyphWireFormat = "claude" | "openai" | "openai-responses";

/** Formato Claude nativo: system no topo, nunca role:"system" dentro de messages. */
function isClaudeFormat(body: Record<string, unknown>): boolean {
  const messages = body.messages;
  if (!Array.isArray(messages)) return false;
  return !messages.some((m) => (m as { role?: string } | null)?.role === "system");
}

function inferWireFormat(body: Record<string, unknown>): OmniGlyphWireFormat {
  if (Array.isArray(body.input) || typeof body.instructions === "string") {
    return "openai-responses";
  }
  if (!isClaudeFormat(body)) return "openai";
  return "claude";
}

function resolveWireFormat(
  body: Record<string, unknown>,
  options?: CompressionEngineApplyOptions
): OmniGlyphWireFormat | null {
  const stage = options?.compressionStage ?? "pre-translation";
  const requested = stage === "post-translation" ? options?.targetFormat : options?.sourceFormat;
  if (requested === "claude" || requested === "openai" || requested === "openai-responses") {
    return requested;
  }
  if (requested) return null;
  return inferWireFormat(body);
}

async function applyOmniglyph(
  body: Record<string, unknown>,
  options?: CompressionEngineApplyOptions
): Promise<CompressionResult> {
  const model = options?.model ?? (body as { model?: string }).model ?? "";
  if (options?.supportsVision !== true) return skip(body, "no_vision");
  if (options?.providerTransport !== "direct") return skip(body, "transport_not_direct");
  // Keep the old direct-call contract usable for standalone callers, but let
  // production callers override it explicitly. The chat pipeline supplies
  // `unknown` for every provider without a byte-preservation receipt.
  if (
    options?.imageTransportFidelity !== undefined &&
    options.imageTransportFidelity !== "byte-preserving"
  ) {
    return skip(
      body,
      options.imageTransportFidelity === "resizes"
        ? "transport_resizes_images"
        : "transport_fidelity_unknown"
    );
  }

  const stage = options?.compressionStage ?? "pre-translation";
  const wireFormat = resolveWireFormat(body, options);
  // A source/target format mismatch means the body is still on the wrong wire,
  // even when the source itself is native Claude. Defer the engine until the
  // translated provider body so Claude→OpenAI cannot be imaged once before
  // translation and then considered again on the target wire.
  const sourceWireFormat = options?.sourceFormat ?? wireFormat;
  if (
    stage === "pre-translation" &&
    options?.targetFormat &&
    sourceWireFormat &&
    options.targetFormat !== sourceWireFormat
  ) {
    return skip(body, "requires_post_translation");
  }
  // The pre-translation lane is retained for the existing native Claude
  // passthrough. OpenAI requests must wait until translation has produced the
  // exact provider wire, otherwise Responses input[] would be flattened by the
  // generic compression adapter and lose native tool/reasoning items.
  if (stage === "pre-translation" && wireFormat !== "claude") {
    return skip(body, "requires_post_translation");
  }
  if (!wireFormat) return skip(body, "target_format_not_supported");
  if (wireFormat === "claude" && !isClaudeFormat(body)) {
    return skip(body, "source_format_not_claude");
  }
  if (wireFormat === "openai" && !Array.isArray(body.messages)) {
    return skip(body, "source_format_not_openai");
  }
  if (
    wireFormat === "openai-responses" &&
    !Array.isArray(body.input) &&
    typeof body.input !== "string"
  ) {
    return skip(body, "source_format_not_openai_responses");
  }
  let profile: CompressionProfile;
  try {
    profile = resolveCompressionProfile(resolveProfileName(options));
  } catch {
    // `resolveCompressionProfile` lança em nome desconhecido. Um perfil que o
    // pacote não entende não pode virar "roda com a política padrão".
    return skip(body, "invalid_profile");
  }
  if (profile.name === "passthrough") return skip(body, "profile_passthrough");
  if (!isModelWithinScope(model, profile.name)) {
    return skip(body, "model_not_approved");
  }
  const preserveSystemPrompt =
    (typeof options?.stepConfig?.preserveSystemPrompt === "boolean"
      ? options.stepConfig.preserveSystemPrompt
      : options?.config?.preserveSystemPrompt) === true;
  // `compressSystem` só existe no transform Anthropic. Os wires OpenAI honram
  // apenas compressTools/gptHistory/minCompressChars/reflow e sempre trocam a
  // instrução por um ponteiro para a imagem. Imagear o system quando o OmniRoute
  // decidiu preservá-lo queimaria o prefixo quente que a política cache-aware
  // está protegendo — e nada no corpo devolvido denunciaria isso. Sem como
  // honrar a política nesse wire, a engine pula.
  if (preserveSystemPrompt && wireFormat !== "claude") {
    return skip(body, "system_preservation_unsupported_on_wire");
  }
  // OmniGlyph 1.3.x deliberately keeps unverified families (currently Grok)
  // text-only until the operator acknowledges them via its own env gate.
  if (!isModelImageable(model)) return skip(body, "model_not_imageable");
  const started = Date.now();
  let outBody: Record<string, unknown>;
  let accounting: OmniGlyphAccounting | undefined;
  try {
    // The upstream OpenAI transformer resolves its billing/render profile from
    // body.model. Keep the provider body byte-compatible on output, but use the
    // already-resolved engine model for that internal gate when a translator
    // omitted the model or left an alias in place.
    const transformBody =
      wireFormat !== "claude" && model && body.model !== model ? { ...body, model } : body;
    const encoded = new TextEncoder().encode(JSON.stringify(transformBody));
    const overrides = preserveSystemPrompt ? { compressSystem: false } : {};
    // Só `transformAnthropicMessages` resolve o perfil por conta própria; os
    // transformadores OpenAI recebem TransformOptions cru e ignorariam o campo.
    const openAIOptions = mergeCompressionProfileOptions(profile, overrides);
    const result =
      wireFormat === "claude"
        ? await transformAnthropicMessages({
            body: encoded,
            model,
            options: { ...overrides, profile: profile.name },
          })
        : wireFormat === "openai"
          ? await transformOpenAIChatCompletions(encoded, openAIOptions)
          : await transformOpenAIResponses(encoded, openAIOptions);
    const applied = "applied" in result ? result.applied : result.info.compressed;
    if (!applied) return skip(body, result.info?.reason ?? "not_profitable");
    outBody = JSON.parse(new TextDecoder().decode(result.body)) as Record<string, unknown>;
    if (transformBody !== body && body.model !== undefined) outBody.model = body.model;
    accounting = buildOmniGlyphAccounting({
      provider: options?.provider,
      model,
      originalBytes: encoded.byteLength,
      transformedBytes: result.body.byteLength,
      info: result.info,
      durationMs: Date.now() - started,
    });
  } catch {
    // Fail-open: qualquer erro no encode/transform/decode (ex.: corpo não serializável,
    // render PNG estourando, JSON decodificado malformado) vira skip, nunca propaga.
    return skip(body, "transform_error");
  }

  const stats = createCompressionStats(
    body,
    outBody,
    "stacked",
    ["omniglyph:context-as-image"],
    undefined,
    Date.now() - started
  );
  // A contabilidade só acompanha uma conversão que realmente aconteceu: um skip
  // não tem economia para reportar, e inventar zeros ali viraria "0% de ganho"
  // indistinguível de "a engine nem rodou".
  if (accounting) stats.omniglyph = accounting;

  return { body: outBody, compressed: true, stats };
}

export const omniglyphEngine: CompressionEngine = {
  id: "omniglyph",
  name: "OmniGlyph",
  description:
    "Contexto-como-imagem para Claude Fable 5 na rota direta medida; wires GPT nativos ficam disponíveis apenas após recibo de fidelidade do provedor.",
  icon: "image",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 90, // por último: RTK/Caveman limpam texto antes; omniglyph imageia o residual
  sampling: true, // perda intencional + factsheet → fidelity gate pula por design
  metadata: {
    id: "omniglyph",
    name: "OmniGlyph",
    description:
      "Contexto-como-imagem para Claude Fable 5 na rota direta medida; transformadores GPT nativos permanecem fail-closed até validação do provedor.",
    inputScope: "mixed",
    targetLatencyMs: 250, // render+encode PNG de páginas grandes
    supportsPreview: true,
    stable: false, // P1: preview — promover após o e2e P3 (30/30 via OmniRoute)
    executionStages: ["pre-translation", "post-translation"],
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
