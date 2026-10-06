import type { CompressionConfig, CompressionResult } from "../types.ts";

export type CompressionEngineTarget = "messages" | "tool_results" | "code_blocks";

/** Protocol shape and pipeline stage used by format-sensitive engines. */
export type CompressionWireFormat = "claude" | "openai" | "openai-responses" | string;

export type CompressionStage = "pre-translation" | "post-translation";

/** Whether an upstream route preserves OmniGlyph PNG bytes and dimensions. */
export type ImageTransportFidelity = "byte-preserving" | "resizes" | "unknown";

export interface EngineConfigField {
  key: string;
  type: "boolean" | "number" | "string" | "select" | "multiselect";
  label: string;
  i18nKey?: string;
  description?: string;
  defaultValue: unknown;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
}

export interface EngineValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CompressionEngineMetadata {
  id: string;
  name: string;
  description: string;
  inputScope: "messages" | "tool-results" | "mixed";
  targetLatencyMs: number;
  supportsPreview: boolean;
  stable: boolean;
  /** Stages at which this engine can receive a request body. Omitted means pre-translation. */
  executionStages?: CompressionStage[];
}

export interface CompressionEngineApplyOptions {
  model?: string;
  supportsVision?: boolean | null;
  /** Como o request chega ao provider: rota direta oficial ('direct') vs
   *  agregador que pode reprocessar imagens ('aggregator'). O engine omniglyph
   *  exige 'direct' — medição 2026-07-06: agregadores redimensionam as páginas
   *  e destroem a legibilidade. A política de produção também informa
   *  imageTransportFidelity; chamadas legadas sem esse campo mantêm o gate direct. */
  providerTransport?: "direct" | "aggregator";
  /** Independent image-fidelity gate; direct HTTP does not imply byte preservation. */
  imageTransportFidelity?: ImageTransportFidelity;
  /** Protocol shape before the current compression stage. */
  sourceFormat?: CompressionWireFormat;
  /** Protocol shape expected by the upstream provider. */
  targetFormat?: CompressionWireFormat;
  /** Whether the body is still client-shaped or already provider-shaped. */
  compressionStage?: CompressionStage;
  config?: CompressionConfig;
  compressionComboId?: string | null;
  stepConfig?: Record<string, unknown>;
  /** Authenticated principal (API key id) making the request. Used by CCR to scope its store. */
  principalId?: string;
  /** Provider resolvido do alvo. A contabilidade do omniglyph depende dele:
   *  Anthropic reporta input/cache em buckets disjuntos, OpenAI/xAI reportam
   *  cached como subconjunto do input. Ausente => `unknown` (falha fechado). */
  provider?: string;
}

export interface CompressionEngine {
  id: string;
  name: string;
  description: string;
  icon: string;
  targets: CompressionEngineTarget[];
  stackable: boolean;
  stackPriority: number;
  /**
   * Marks an intentionally-lossy sampling engine (e.g. ionizer). The fidelity gate SKIPS such
   * engines: their drop is deliberate and recoverable via CCR, not accidental corruption.
   */
  sampling?: boolean;
  metadata: CompressionEngineMetadata;
  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult;
  /**
   * Optional async variant (H10). Engines whose real work is asynchronous
   * (e.g. a worker-thread model like LLMLingua-2) implement this. The stacked
   * pipeline awaits `applyAsync` when present and falls back to the synchronous
   * `apply` otherwise, so async-only engines MUST keep `apply` as a safe
   * synchronous pass-through. Sync engines never need to implement this.
   */
  applyAsync?(
    body: Record<string, unknown>,
    options?: CompressionEngineApplyOptions
  ): Promise<CompressionResult>;
  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config: Record<string, unknown>): EngineValidationResult;
}

export interface EngineRegistryEntry {
  engine: CompressionEngine;
  enabled: boolean;
  config: Record<string, unknown>;
}
