import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

// MLX ports (deterministic, documented)
const MLX_GEMMA_PORT = 11435;
const MLX_QWEN_PORT = 11436;

// ─────────────────────────────────────────────────────────────────────────────
// Memory-aware context windows for MLX models on 24GB unified memory.
// Based on verified peak memory: Gemma 26B ~15.9GB, Qwen 27B ~13.1GB.
// KV cache estimate: 2 * 2 * layers * kv_heads * head_dim * num_ctx bytes.
// Conservative context windows to leave headroom for OS/other processes.
export const MLX_DEFAULT_CONTEXT_LIMIT = 32768;

const CONTEXT_GEMMA_26B = 8192; // 15.9GB weights + ~3.5GB KV @ 8k = ~19.4GB (safe for 24GB)
const CONTEXT_QWEN_27B = 8192; // 13.1GB weights + ~3.5GB KV @ 8k = ~16.6GB (safe for 24GB)

// ─────────────────────────────────────────────────────────────────────────────
// MLX Gemma 26B Provider
// Model: mlx-community/gemma-4-26B-A4B-it-qat-q4_0-mlx-aligned
// Verified speed: ~38.5 tok/s, peak memory: ~15.9 GB
export const mlxGemmaProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "mlx-gemma",
  alias: "mlx-gemma",
  baseUrl: `http://localhost:${MLX_GEMMA_PORT}/v1`,
  modelsUrl: `http://localhost:${MLX_GEMMA_PORT}/v1/models`,
  passthroughModels: false,
  defaultContextLength: MLX_DEFAULT_CONTEXT_LIMIT,
  models: [
    {
      id: "mlx-community/gemma-4-26B-A4B-it-qat-q4_0-mlx-aligned",
      name: "Gemma 4 26B A4B IT-QAT (MLX)",
      toolCalling: true,
      supportsVision: false,
      supportsReasoning: false,
      contextLength: CONTEXT_GEMMA_26B,
      maxOutputTokens: 8192,
    },
  ],
  timeoutMs: 120000, // Longer timeout for model loading
});

// ─────────────────────────────────────────────────────────────────────────────
// MLX Qwen3.8 27B Provider
// Model: maglun/Qwen3.8-27B-MLX-Mixed-3.80bpw
// Verified speed: ~9.1 tok/s, peak memory: ~13.1 GB
export const mlxQwenProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "mlx-qwen",
  alias: "mlx-qwen",
  baseUrl: `http://localhost:${MLX_QWEN_PORT}/v1`,
  modelsUrl: `http://localhost:${MLX_QWEN_PORT}/v1/models`,
  passthroughModels: false,
  defaultContextLength: MLX_DEFAULT_CONTEXT_LIMIT,
  models: [
    {
      id: "maglun/Qwen3.8-27B-MLX-Mixed-3.80bpw",
      name: "Qwen 3.8 27B MLX Mixed 3.80bpw",
      toolCalling: true,
      supportsVision: false,
      supportsReasoning: false,
      contextLength: CONTEXT_QWEN_27B,
      maxOutputTokens: 8192,
    },
  ],
  timeoutMs: 120000, // Longer timeout for model loading
});
