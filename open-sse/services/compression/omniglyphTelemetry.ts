/**
 * Ponte de telemetria do OmniGlyph — allowlist positiva.
 *
 * `TransformInfo` mistura contadores inofensivos com material que NUNCA pode
 * ser persistido: bytes PNG, `imageSourceText(s)`, `recoverable[].text`, os
 * sha8 de system/CLAUDE.md/primeira mensagem, os nomes de tags observadas e o
 * bloco `env` (cwd, branch, versões). Copiar o objeto inteiro seria transformar
 * a telemetria de compressão num vazamento do prompt.
 *
 * Este módulo não filtra por denylist — ele MONTA um objeto novo, campo a
 * campo, só com número e enum. Um campo novo no upstream não entra sozinho.
 *
 * `normalizeAccounting()` (OmniGlyph 1.4.0) faz a parte difícil: classifica o
 * grau de evidência da economia e resolve a semântica de cache por provider —
 * Anthropic reporta input/cache-create/cache-read em buckets DISJUNTOS,
 * enquanto OpenAI e xAI reportam `cached` como SUBCONJUNTO do input. Somar à
 * mão dá double-count silencioso.
 */

import {
  normalizeAccounting,
  type AccountingProvider,
  type OmniGlyphTransformInfo,
  type SavingsEvidence,
} from "omniglyph";

/** Contabilidade segura de uma execução do OmniGlyph. Só número e enum. */
export interface OmniGlyphAccounting {
  provider: AccountingProvider;
  model?: string;
  bytes: {
    original?: number;
    transformed?: number;
    reduced?: number;
    compressionRatio?: number;
  };
  tokens: {
    estimatedOriginalInput?: number;
    estimatedActualInput?: number;
    estimatedReduced?: number;
    image?: number;
  };
  savings: {
    /** De onde saiu o número: contagem do provider, estimativa ou só bytes. */
    evidence: SavingsEvidence;
    inputTokensReduced?: number;
    inputReductionRatio?: number;
  };
  images: {
    count: number;
    bytes: number;
    pixels?: number;
  };
  /** Chars de origem imageados vs. mantidos como texto por turno. */
  chars: {
    original?: number;
    imaged?: number;
    static?: number;
    dynamic?: number;
    outgoingText?: number;
  };
  dynamicBlockCount?: number;
  latencyMs?: number;
}

/**
 * A semântica de cache de `normalizeAccounting` depende da família do provider,
 * não do nome comercial da rota. Rota desconhecida vira `unknown`, que faz o
 * upstream falhar fechado em vez de adivinhar buckets de cache.
 */
export function toAccountingProvider(provider: string | null | undefined): AccountingProvider {
  const normalized = typeof provider === "string" ? provider.trim().toLowerCase() : "";
  if (normalized === "anthropic" || normalized === "claude") return "anthropic";
  if (normalized === "openai" || normalized === "codex" || normalized === "chatgpt") {
    return "openai";
  }
  if (normalized === "xai" || normalized === "grok") return "xai";
  return "unknown";
}

function count(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
}

export function buildOmniGlyphAccounting(params: {
  provider: string | null | undefined;
  model?: string;
  originalBytes: number;
  transformedBytes: number;
  info?: OmniGlyphTransformInfo | null;
  durationMs?: number;
}): OmniGlyphAccounting {
  const { info } = params;
  const provider = toAccountingProvider(params.provider);

  // `baselineImagedTokens` é o custo em tokens de texto do que foi imageado (o
  // "teria pago assim"); `imageTokens` é o que as imagens custam de fato. Os
  // dois só existem no wire GPT — no Anthropic a evidência honesta cai para
  // bytes, e é isso que o campo `evidence` passa a dizer em vez de exibir um
  // número sem procedência.
  const normalized = normalizeAccounting({
    provider,
    ...(params.model ? { model: params.model } : {}),
    originalBytes: params.originalBytes,
    transformedBytes: params.transformedBytes,
    ...(count(info?.baselineImagedTokens) !== undefined
      ? { estimatedOriginalInputTokens: info!.baselineImagedTokens }
      : {}),
    ...(count(info?.imageTokens) !== undefined
      ? { estimatedTransformedInputTokens: info!.imageTokens }
      : {}),
    ...(count(info?.imageTokens) !== undefined ? { imageTokens: info!.imageTokens } : {}),
    ...(params.durationMs !== undefined ? { proxyAddedLatencyMs: params.durationMs } : {}),
  });

  const chars = {
    ...(count(info?.origChars) !== undefined ? { original: info!.origChars } : {}),
    ...(count(info?.compressedChars) !== undefined ? { imaged: info!.compressedChars } : {}),
    ...(count(info?.staticChars) !== undefined ? { static: info!.staticChars } : {}),
    ...(count(info?.dynamicChars) !== undefined ? { dynamic: info!.dynamicChars } : {}),
    ...(count(info?.outgoingTextChars) !== undefined
      ? { outgoingText: info!.outgoingTextChars }
      : {}),
  };

  return {
    provider: normalized.provider,
    ...(normalized.model ? { model: normalized.model } : {}),
    bytes: normalized.bytes,
    tokens: {
      ...(normalized.tokens.estimatedOriginalInput !== undefined
        ? { estimatedOriginalInput: normalized.tokens.estimatedOriginalInput }
        : {}),
      ...(normalized.tokens.estimatedActualInput !== undefined
        ? { estimatedActualInput: normalized.tokens.estimatedActualInput }
        : {}),
      ...(normalized.tokens.estimatedReduced !== undefined
        ? { estimatedReduced: normalized.tokens.estimatedReduced }
        : {}),
      ...(normalized.tokens.image !== undefined ? { image: normalized.tokens.image } : {}),
    },
    savings: normalized.savings,
    images: {
      count: count(info?.imageCount) ?? 0,
      bytes: count(info?.imageBytes) ?? 0,
      ...(count(info?.imagePixels) !== undefined ? { pixels: info!.imagePixels } : {}),
    },
    chars,
    ...(count(info?.dynamicBlockCount) !== undefined
      ? { dynamicBlockCount: info!.dynamicBlockCount }
      : {}),
    ...(normalized.latency.proxyAddedMs !== undefined
      ? { latencyMs: normalized.latency.proxyAddedMs }
      : {}),
  };
}
