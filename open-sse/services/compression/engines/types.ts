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
  config?: CompressionConfig;
  compressionComboId?: string | null;
  stepConfig?: Record<string, unknown>;
}

export interface CompressionEngine {
  id: string;
  name: string;
  description: string;
  icon: string;
  targets: CompressionEngineTarget[];
  stackable: boolean;
  stackPriority: number;
  metadata: CompressionEngineMetadata;
  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult;
  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config: Record<string, unknown>): EngineValidationResult;
}

export interface EngineRegistryEntry {
  engine: CompressionEngine;
  enabled: boolean;
  config: Record<string, unknown>;
}
