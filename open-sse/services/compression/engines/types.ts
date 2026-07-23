import type { CompressionConfig, CompressionResult } from "../types.ts";

export type CompressionEngineTarget = "messages" | "tool_results" | "code_blocks";

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
}

export interface CompressionEngineApplyOptions {
  model?: string;
  supportsVision?: boolean | null;
  /** Como o request chega ao provider: rota direta oficial ('direct') vs
   *  agregador que pode reprocessar imagens ('aggregator'). O engine omniglyph
   *  exige 'direct' — medição 2026-07-06: agregadores redimensionam as páginas
   *  e destroem a legibilidade. undefined = desconhecido = skip (fail-closed). */
  providerTransport?: "direct" | "aggregator";
  config?: CompressionConfig;
  compressionComboId?: string | null;
  stepConfig?: Record<string, unknown>;
  /** Authenticated principal (API key id) making the request. Used by CCR to scope its store. */
  principalId?: string;
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
