/**
 * UC (uncensored.com) PERSONA model catalog.
 *
 * These 19 ids are the empirically-verified working persona-mode models: each
 * one returned real text from the WebSocket backend in a live audit
 * (UC-UNCENSORED-MODELS.md / UC-NATIVE-PORT-FINDINGS.md). Guessed/broken ids
 * (e.g. persona `gpt-5.4`, base `claude-opus-4.8` non-uncensored) were dropped
 * so the provider never advertises a model that 500s.
 *
 * `id` is the UC persona **shortname** (provider prefix dropped, dots stripped):
 * this is exactly the value sent as the WS frame's `model` field. Context /
 * max-output come from UC's direct-mode catalog (direct-models.json); grok-4.x
 * publish no separate output cap (bounded by the context window).
 *
 * The ⭐ `-uncensored` / persona variants are the differentiator (unlocked
 * behavior) — the whole reason this un-metered surface is worth porting.
 */
import type { RegistryModel } from "../../config/providers/shared.ts";

interface UcModelSpec {
  id: string;
  name: string;
  contextLength: number;
  maxOutputTokens?: number;
  supportsReasoning?: boolean;
  /**
   * Vision-capable (the underlying model accepts image input). UC persona feeds
   * images via the blob-upload layer (see uc/media.ts), which the backend parses
   * server-side and hands to the model — so vision works for these ids.
   * Sourced from UC's direct-mode catalog (direct-models.json capabilities).
   */
  supportsVision?: boolean;
}

/** The 19 offered persona (un-metered) chat models. */
export const UC_MODELS: UcModelSpec[] = [
  // Anthropic (persona: 4.8 is uncensored-only, so we expose the -uncensored id)
  {
    id: "claude-opus-45",
    name: "Claude Opus 4.5",
    contextLength: 200_000,
    maxOutputTokens: 64_000,
    supportsVision: true,
  },
  {
    id: "claude-opus-46",
    name: "Claude Opus 4.6",
    contextLength: 1_000_000,
    maxOutputTokens: 128_000,
    supportsVision: true,
  },
  {
    id: "claude-opus-46-v2",
    name: "Claude Opus 4.6 (v2)",
    contextLength: 1_000_000,
    maxOutputTokens: 128_000,
    supportsVision: true,
  },
  {
    id: "claude-opus-47",
    name: "Claude Opus 4.7",
    contextLength: 1_000_000,
    maxOutputTokens: 128_000,
    supportsVision: true,
  },
  {
    id: "claude-opus-47-v2",
    name: "Claude Opus 4.7 (v2)",
    contextLength: 1_000_000,
    maxOutputTokens: 128_000,
    supportsVision: true,
  },
  {
    id: "claude-opus-48-uncensored",
    name: "Claude Opus 4.8 (Uncensored)",
    contextLength: 1_000_000,
    maxOutputTokens: 128_000,
    supportsVision: true,
  },
  // DeepSeek
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    contextLength: 163_840,
    maxOutputTokens: 16_000,
    supportsReasoning: true,
  },
  // GLM
  { id: "glm-5.1", name: "GLM 5.1", contextLength: 202_752, maxOutputTokens: 131_072 },
  // OpenAI (gpt-5.5 is the only working persona GPT; guardrailed → code-style tools)
  {
    id: "gpt-5.5",
    name: "GPT-5.5",
    contextLength: 1_050_000,
    maxOutputTokens: 128_000,
    supportsVision: true,
  },
  // Google Gemini
  {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash",
    contextLength: 1_048_576,
    maxOutputTokens: 65_536,
    supportsVision: true,
  },
  {
    id: "gemini-31-uncensored",
    name: "Gemini 3.1 (Uncensored)",
    contextLength: 1_048_576,
    maxOutputTokens: 65_536,
    supportsVision: true,
  },
  {
    id: "gemini-emotional",
    name: "Gemini (Emotional)",
    contextLength: 1_048_576,
    maxOutputTokens: 65_536,
    supportsVision: true,
  },
  {
    id: "gemini-3-uncensored",
    name: "Gemini 3 (Uncensored)",
    contextLength: 1_048_576,
    maxOutputTokens: 65_536,
    supportsVision: true,
  },
  // xAI Grok (no separate output cap — bounded by context window)
  { id: "grok-4", name: "Grok 4", contextLength: 1_000_000, supportsVision: true },
  { id: "grok-4-20", name: "Grok 4.20", contextLength: 2_000_000, supportsVision: true },
  { id: "grok-4-3", name: "Grok 4.3", contextLength: 1_000_000, supportsVision: true },
  // Moonshot Kimi
  {
    id: "kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    contextLength: 262_144,
    maxOutputTokens: 262_144,
    supportsReasoning: true,
  },
  {
    id: "kimi-k2.5",
    name: "Kimi K2.5",
    contextLength: 262_144,
    maxOutputTokens: 262_144,
    supportsVision: true,
  },
  // MiniMax
  {
    id: "minimax-m2-her",
    name: "MiniMax M2 (Her)",
    contextLength: 204_800,
    maxOutputTokens: 131_072,
  },
];

/** RegistryModel[] form for the provider registry entry. */
export const UC_REGISTRY_MODELS: RegistryModel[] = UC_MODELS.map((m) => ({
  id: m.id,
  name: m.name,
  contextLength: m.contextLength,
  // Prompted tool-calling: UC persona has no native tools[] API, but the
  // executor injects a <tool_call> preamble and parses the calls back, so the
  // capability is real from the client's perspective.
  toolCalling: true,
  ...(m.maxOutputTokens ? { maxOutputTokens: m.maxOutputTokens } : {}),
  ...(m.supportsReasoning ? { supportsReasoning: true } : {}),
  ...(m.supportsVision ? { supportsVision: true } : {}),
}));

/** Default context window for an unknown model. */
export const UC_DEFAULT_CONTEXT = 128_000;

export function ucContextWindow(modelId: string): number {
  return UC_MODELS.find((m) => m.id === modelId)?.contextLength ?? UC_DEFAULT_CONTEXT;
}
