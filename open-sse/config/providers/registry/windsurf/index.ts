import type { RegistryEntry } from "../../shared.ts";

export const windsurfProvider: RegistryEntry = {
  id: "windsurf",
  alias: "ws",
  format: "windsurf",
  executor: "windsurf",
  // gRPC-web endpoint — handled entirely inside WindsurfExecutor.
  // Model IDs are the canonical Windsurf catalog names (with dots), auto-synced
  // from the Windsurf cloud via GetCascadeModelConfigs. Source: guanxiaol/WindsurfPoolAPI.
  baseUrl: "https://server.self-serve.windsurf.com",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  defaultContextLength: 200000,
  // Model IDs verified against model_configs_v2.bin from Devin CLI binary (2026.5.x).
  // dot-notation = OmniRoute ID; executor MODEL_ALIAS_MAP maps it to Windsurf modelUid.
  models: [
    // ── Cognition / SWE ──────────────────────────────────────────────────
    { id: "swe-1.6-fast", name: "SWE-1.6 Fast" },
    { id: "swe-1.6", name: "SWE-1.6" },
    { id: "swe-1.5-fast", name: "SWE-1.5 Fast" },
    { id: "swe-1.5", name: "SWE-1.5" },
    // ── Claude Opus 4.7 — effort-tiered ─────────────────────────────────
    { id: "claude-opus-4.7-max", name: "Claude Opus 4.7 Max", contextLength: 200000 },
    { id: "claude-opus-4.7-xhigh", name: "Claude Opus 4.7 XHigh", contextLength: 200000 },
    { id: "claude-opus-4.7-high", name: "Claude Opus 4.7 High", contextLength: 200000 },
    { id: "claude-opus-4.7-medium", name: "Claude Opus 4.7 Medium", contextLength: 200000 },
    { id: "claude-opus-4.7-low", name: "Claude Opus 4.7 Low", contextLength: 200000 },
    { id: "claude-opus-4.7-review", name: "Claude Opus 4.7 Review", contextLength: 200000 },
    // ── Claude Sonnet/Opus 4.6 ──────────────────────────────────────────
    {
      id: "claude-sonnet-4.6-thinking-1m",
      name: "Claude Sonnet 4.6 Thinking 1M",
      contextLength: 1000000,
    },
    { id: "claude-sonnet-4.6-1m", name: "Claude Sonnet 4.6 1M", contextLength: 1000000 },
    {
      id: "claude-sonnet-4.6-thinking",
      name: "Claude Sonnet 4.6 Thinking",
      contextLength: 200000,
    },
    { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", contextLength: 200000 },
    { id: "claude-opus-4.6-thinking", name: "Claude Opus 4.6 Thinking", contextLength: 200000 },
    { id: "claude-opus-4.6", name: "Claude Opus 4.6", contextLength: 200000 },
    // ── Claude 4.5 ──────────────────────────────────────────────────────
    { id: "claude-opus-4.5-thinking", name: "Claude Opus 4.5 Thinking", contextLength: 200000 },
    { id: "claude-opus-4.5", name: "Claude Opus 4.5", contextLength: 200000 },
    {
      id: "claude-sonnet-4.5-thinking",
      name: "Claude Sonnet 4.5 Thinking",
      contextLength: 200000,
    },
    { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", contextLength: 200000 },
    { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", contextLength: 200000 },
    // ── GPT-5.5 — effort-tiered (+ fast/priority variants) ──────────────
    { id: "gpt-5.5-xhigh-fast", name: "GPT-5.5 XHigh Fast", contextLength: 200000 },
    { id: "gpt-5.5-xhigh", name: "GPT-5.5 XHigh", contextLength: 200000 },
    { id: "gpt-5.5-high-fast", name: "GPT-5.5 High Fast", contextLength: 200000 },
    { id: "gpt-5.5-high", name: "GPT-5.5 High", contextLength: 200000 },
    { id: "gpt-5.5-medium-fast", name: "GPT-5.5 Medium Fast", contextLength: 200000 },
    { id: "gpt-5.5-medium", name: "GPT-5.5 Medium", contextLength: 200000 },
    { id: "gpt-5.5-low-fast", name: "GPT-5.5 Low Fast", contextLength: 200000 },
    { id: "gpt-5.5-low", name: "GPT-5.5 Low", contextLength: 200000 },
    { id: "gpt-5.5-none-fast", name: "GPT-5.5 None Fast", contextLength: 200000 },
    { id: "gpt-5.5-none", name: "GPT-5.5 None", contextLength: 200000 },
    // ── GPT-5.4 — effort-tiered (+ mini + fast variants) ────────────────
    { id: "gpt-5.4-xhigh-fast", name: "GPT-5.4 XHigh Fast", contextLength: 200000 },
    { id: "gpt-5.4-xhigh", name: "GPT-5.4 XHigh", contextLength: 200000 },
    { id: "gpt-5.4-high-fast", name: "GPT-5.4 High Fast", contextLength: 200000 },
    { id: "gpt-5.4-high", name: "GPT-5.4 High", contextLength: 200000 },
    { id: "gpt-5.4-medium-fast", name: "GPT-5.4 Medium Fast", contextLength: 200000 },
    { id: "gpt-5.4-medium", name: "GPT-5.4 Medium", contextLength: 200000 },
    { id: "gpt-5.4-low-fast", name: "GPT-5.4 Low Fast", contextLength: 200000 },
    { id: "gpt-5.4-low", name: "GPT-5.4 Low", contextLength: 200000 },
    { id: "gpt-5.4-none-fast", name: "GPT-5.4 None Fast", contextLength: 200000 },
    { id: "gpt-5.4-none", name: "GPT-5.4 None", contextLength: 200000 },
    { id: "gpt-5.4-mini-xhigh", name: "GPT-5.4 Mini XHigh", contextLength: 128000 },
    { id: "gpt-5.4-mini-high", name: "GPT-5.4 Mini High", contextLength: 128000 },
    { id: "gpt-5.4-mini-medium", name: "GPT-5.4 Mini Medium", contextLength: 128000 },
    { id: "gpt-5.4-mini-low", name: "GPT-5.4 Mini Low", contextLength: 128000 },
    // ── GPT-5.3 Codex — effort-tiered (+ fast variants) ─────────────────
    { id: "gpt-5.3-codex-xhigh-fast", name: "GPT-5.3 Codex XHigh Fast", contextLength: 200000 },
    { id: "gpt-5.3-codex-xhigh", name: "GPT-5.3 Codex XHigh", contextLength: 200000 },
    { id: "gpt-5.3-codex-high-fast", name: "GPT-5.3 Codex High Fast", contextLength: 200000 },
    { id: "gpt-5.3-codex-high", name: "GPT-5.3 Codex High", contextLength: 200000 },
    { id: "gpt-5.3-codex-medium-fast", name: "GPT-5.3 Codex Medium Fast", contextLength: 200000 },
    { id: "gpt-5.3-codex-medium", name: "GPT-5.3 Codex Medium", contextLength: 200000 },
    { id: "gpt-5.3-codex-low-fast", name: "GPT-5.3 Codex Low Fast", contextLength: 200000 },
    { id: "gpt-5.3-codex-low", name: "GPT-5.3 Codex Low", contextLength: 200000 },
    // ── GPT-5.2 ─────────────────────────────────────────────────────────
    { id: "gpt-5.2-xhigh", name: "GPT-5.2 XHigh", contextLength: 200000 },
    { id: "gpt-5.2-high", name: "GPT-5.2 High", contextLength: 200000 },
    { id: "gpt-5.2-medium", name: "GPT-5.2 Medium", contextLength: 200000 },
    { id: "gpt-5.2-low", name: "GPT-5.2 Low", contextLength: 200000 },
    { id: "gpt-5.2-none", name: "GPT-5.2 None", contextLength: 200000 },
    // ── GPT-5 ────────────────────────────────────────────────────────────
    { id: "gpt-5", name: "GPT-5", contextLength: 200000 },
    // ── GPT-4.1 / 4o ────────────────────────────────────────────────────
    { id: "gpt-4.1", name: "GPT-4.1", contextLength: 200000 },
    { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", contextLength: 128000 },
    { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", contextLength: 32000 },
    { id: "gpt-4o", name: "GPT-4o", contextLength: 128000 },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", contextLength: 128000 },
    // ── Gemini ───────────────────────────────────────────────────────────
    { id: "gemini-3.1-pro-high", name: "Gemini 3.1 Pro High", contextLength: 1000000 },
    { id: "gemini-3.1-pro-low", name: "Gemini 3.1 Pro Low", contextLength: 1000000 },
    { id: "gemini-3.0-flash-high", name: "Gemini 3 Flash High", contextLength: 1000000 },
    { id: "gemini-3.0-flash-medium", name: "Gemini 3 Flash Medium", contextLength: 1000000 },
    { id: "gemini-3.0-flash-low", name: "Gemini 3 Flash Low", contextLength: 1000000 },
    { id: "gemini-3.0-flash-minimal", name: "Gemini 3 Flash Minimal", contextLength: 1000000 },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", contextLength: 1000000 },
    // ── Others ───────────────────────────────────────────────────────────
    { id: "deepseek-v4", name: "DeepSeek V4", contextLength: 64000 },
    { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 131000 },
    { id: "kimi-k2.5", name: "Kimi K2.5", contextLength: 131000 },
    { id: "glm-5.1", name: "GLM-5.1", contextLength: 128000 },
  ],
};
