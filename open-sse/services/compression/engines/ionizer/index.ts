// open-sse/services/compression/engines/ionizer/index.ts
import { createCompressionStats } from "../../stats.ts";
import { runIonizerPass } from "./sample.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";
import type { CompressionResult } from "../../types.ts";

const ENGINE_ID = "ionizer";

type MessageLike = { role?: string; content?: unknown; [key: string]: unknown };

const IONIZER_SCHEMA: EngineConfigField[] = [
  { key: "enabled", type: "boolean", label: "Enabled", defaultValue: true },
  {
    key: "threshold",
    type: "number",
    label: "Row threshold",
    description: "Only arrays with more than this many object rows are sampled. Default: 200.",
    defaultValue: 200,
    min: 2,
    max: 1000000,
  },
  {
    key: "targetRows",
    type: "number",
    label: "Target kept rows",
    description: "Approximate number of rows kept inline after sampling. Default: 50.",
    defaultValue: 50,
    min: 1,
    max: 100000,
  },
];

function validateIonizerConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  for (const k of ["threshold", "targetRows"]) {
    if (config[k] !== undefined) {
      const v = config[k];
      if (typeof v !== "number" || !Number.isFinite(v) || v < 1) {
        errors.push(`${k} must be a positive number`);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}

export const ionizerEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "Ionizer",
  description:
    "Lossy statistical sampling of oversized homogeneous JSON arrays. Keeps schema + error rows " +
    "+ first/last rows + a seeded uniform middle sample inline; stores the whole array in CCR " +
    "for recovery. Complements headroom (lossless) as the fallback when columnar still overflows.",
  icon: "filter_alt",
  targets: ["messages"],
  stackable: true,
  // stackPriority 13 = between rtk (10) and headroom (15): sample raw rows BEFORE headroom
  // losslessly compacts the survivors.
  stackPriority: 13,
  sampling: true,
  metadata: {
    id: ENGINE_ID,
    name: "Ionizer",
    description:
      "Lossy statistical sampling of oversized homogeneous JSON arrays, reversible via CCR.",
    inputScope: "messages",
    targetLatencyMs: 2,
    supportsPreview: true,
    stable: true,
  },

  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult {
    const stepConfig = options?.stepConfig ?? {};
    if (stepConfig["enabled"] === false) {
      return { body, compressed: false, stats: null };
    }
    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    const start = performance.now();
    const { messages: finalMessages, ionizedCount } = runIonizerPass(
      messages as MessageLike[],
      stepConfig,
      options?.principalId
    );

    if (ionizedCount === 0) {
      return { body, compressed: false, stats: null };
    }

    const newBody: Record<string, unknown> = { ...body, messages: finalMessages };
    const durationMs = Math.round(performance.now() - start);
    const stats = createCompressionStats(
      body,
      newBody,
      "stacked",
      ["ionizer"],
      [`ionizer-${ionizedCount}-arrays-sampled`],
      durationMs
    );
    return { body: newBody, compressed: true, stats };
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return IONIZER_SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validateIonizerConfig(config);
  },
};
