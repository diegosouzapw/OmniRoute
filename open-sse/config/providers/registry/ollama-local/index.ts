import type { RegistryEntry } from "../../shared.ts";

// ─────────────────────────────────────────────────────────────────────────────
// Per-model memory-aware context windows (24GB unified memory, M-series).
//
// The OllamaExecutor (open-sse/executors/ollama.ts) sends these as per-request
// `options.num_ctx` on the NATIVE /api/chat endpoint. The OpenAI-compatible
// /v1/chat/completions endpoint IGNORES num_ctx and loads every model at the
// global OLLAMA_CONTEXT_LENGTH (Ollama Desktop → Settings → Context Length),
// which is what caused the 45GB swap/OOM: mistral-nemo's GGUF declares
// context_length=1 024 000 and ollama tried to allocate a ~40GB KV cache at load.
//
// Values are the advertised limit AND the actual loaded KV window, so /v1/models
// is truthful and opencode compacts toward a limit the box can actually serve.
// Budget rule of thumb: weights + KV(2×2×layers×kv_heads×head_dim×num_ctx) ≤ ~18GB.
// A model's GGUF context_length is the hard ceiling (ollama clamps num_ctx to it).
export const OLLAMA_DEFAULT_CONTEXT_LIMIT = 32768;

const CONTEXT_QWEN2_14B = 32768; // GGUF clamps at 32768
const CONTEXT_QWEN2_CODER_7B = 32768; // GGUF clamps at 32768
const CONTEXT_QWEN3_8B = 40960; // GGUF clamps at 40960
const CONTEXT_QWEN2_5VL_7B = 131072; // 6.0GB + 57KB/tok → ~13.5GB ✓
const CONTEXT_GEMMA4_12B = 40960; // 9.6GB + 172KB/tok → ~16.7GB ✓
const CONTEXT_GEMMA4_12B_MLX = 40960; // 7.7GB + ~196KB/tok → ~15.7GB ✓
const CONTEXT_MISTRAL_NEMO = 65536; // 7.1GB + 164KB/tok → ~17.8GB ✓
const CONTEXT_LLAMA3_1 = 98304; // 4.9GB + 131KB/tok → ~17.8GB ✓
const CONTEXT_PHI3_5 = 32768; // 2.2GB + 393KB/tok (MHA) → ~15.1GB ✓
const CONTEXT_DEEPSEEK_CODER_V2 = 65536; // 8.9GB + 111KB/tok → ~16.1GB ✓
// Heavyweights: keep resident without OOM, but they are NOT suited to agentic
// opencode sessions (tiny window). Prefer them out of the vivanta-ollama combo.
const CONTEXT_NORTH_MINI_CODE = 8192; // 18GB + 100KB/tok → ~18.8GB (tight)
const CONTEXT_GEMMA4_26B = 4096; // 17GB + 983KB/tok (MHA) → ~21GB (swaps; manual use only)
const CONTEXT_GLM_4_7_FLASH = 4096; // 19GB + 241KB/tok → ~20GB; upstream hangs anyway

// Local Ollama instance (http://localhost:11434). No API key required.
// The OllamaExecutor talks to the native /api/chat endpoint so per-model num_ctx
// is honored. Models are discovered via /api/tags and passed through
// (passthroughModels) so any pulled model works without a code change.
//
// toolCalling flags below reflect empirical testing on M5/24GB (see benchmarks):
//  - qwen2.5-coder:7b returns tool_call as plain JSON in `content` (NOT native) — demoted to toolCalling:false
//  - qwen3:8b returns 502/empty on /v1/chat with tools (broken upstream)
//  - phi3.5:latest / deepseek-coder-v2:16b reject tools with HTTP 400 ("does not support tools")
//  - glm-4.7-flash:latest hangs >180s on the OpenAI-compatible endpoint (broken)
//  - the rest issue native `choices[0].message.tool_calls` correctly.
export const ollama_localProvider: RegistryEntry = {
  id: "ollama-local",
  alias: "ollama",
  format: "openai",
  executor: "ollama",
  baseUrl: "http://localhost:11434/v1/chat/completions",
  modelsUrl: "http://localhost:11434/api/tags",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  defaultContextLength: OLLAMA_DEFAULT_CONTEXT_LIMIT,
  models: [
    // Tool-call capable (verified native tool_calls)
    { id: "qwen2.5:14b", name: "Qwen2.5 14B", toolCalling: true, contextLength: CONTEXT_QWEN2_14B },
    { id: "qwen3:8b", name: "Qwen3 8B", toolCalling: false, contextLength: CONTEXT_QWEN3_8B },
    {
      id: "gemma4:latest",
      name: "Gemma 4 (reasoning)",
      toolCalling: true,
      contextLength: CONTEXT_GEMMA4_12B,
    },
    {
      id: "gemma4:12b-mlx",
      name: "Gemma 4 12B MLX (reasoning)",
      toolCalling: true,
      contextLength: CONTEXT_GEMMA4_12B_MLX,
    },
    {
      id: "gemma4:26b-a4b-it-q4_K_M",
      name: "Gemma 4 26B (reasoning)",
      toolCalling: true,
      contextLength: CONTEXT_GEMMA4_26B,
    },
    {
      id: "mistral-nemo:latest",
      name: "Mistral Nemo",
      toolCalling: true,
      contextLength: CONTEXT_MISTRAL_NEMO,
    },
    {
      id: "llama3.1:latest",
      name: "Llama 3.1",
      toolCalling: true,
      contextLength: CONTEXT_LLAMA3_1,
    },
    {
      id: "north-mini-code-1.0:latest",
      name: "North Mini Code 1.0",
      toolCalling: true,
      contextLength: CONTEXT_NORTH_MINI_CODE,
    },
    // NOT tool-call native (content-only tool-call) — useful for non-tool/light requests
    {
      id: "qwen2.5-coder:7b",
      name: "Qwen2.5 Coder 7B",
      toolCalling: false,
      contextLength: CONTEXT_QWEN2_CODER_7B,
    },
    // Tool support broken upstream — behave like text-only but intentionally registered
    { id: "phi3.5:latest", name: "Phi 3.5", toolCalling: false, contextLength: CONTEXT_PHI3_5 },
    {
      id: "deepseek-coder-v2:16b",
      name: "DeepSeek Coder V2 16B",
      toolCalling: false,
      contextLength: CONTEXT_DEEPSEEK_CODER_V2,
    },
    {
      id: "glm-4.7-flash:latest",
      name: "GLM 4.7 Flash",
      toolCalling: false,
      contextLength: CONTEXT_GLM_4_7_FLASH,
    },
    // Ollama rejects native tool calls for this model: "qwen2.5vl:7b does not
    // support tools" (observed live 2026-08-06). Keep for vision/text only.
    {
      id: "qwen2.5vl:7b",
      name: "Qwen2.5 VL 7B",
      supportsVision: true,
      toolCalling: false,
      contextLength: CONTEXT_QWEN2_5VL_7B,
    },
  ],
};
