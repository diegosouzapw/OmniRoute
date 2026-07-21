/**
 * HyperAgent (hyperagent.com) hardcoded model catalog.
 *
 * Wire ids come from the SPA pricing map (available_models.txt capture).
 * Display names are human-friendly (Fable 5, not "fable") while /chat uses modelId.
 */

export interface HyperAgentModel {
  /** Wire modelId sent to HyperAgent (e.g. fable, opus-latest, gpt-5.6-sol). */
  id: string;
  /** Pretty picker / /v1/models name. */
  name: string;
}

/**
 * Offline catalog from hyperagent/available_models.txt (2026-07-21).
 * First group = Claude-family runtimes; second = OpenAI-compatible chat models.
 */
export const HYPERAGENT_FALLBACK_MODELS: HyperAgentModel[] = [
  // Claude / Anthropic family (SPA pricing keys)
  { id: "opus-latest", name: "Claude Opus Latest" },
  { id: "sonnet-latest", name: "Claude Sonnet Latest" },
  { id: "fable", name: "Claude Fable 5" },
  { id: "fruitcake-eap", name: "Claude Fruitcake EAP" },
  { id: "opus-4-8", name: "Claude Opus 4.8" },
  { id: "opus-4-7", name: "Claude Opus 4.7" },
  { id: "opus-4-6", name: "Claude Opus 4.6" },
  { id: "opus-4-5", name: "Claude Opus 4.5" },
  { id: "opus-4", name: "Claude Opus 4" },
  { id: "sonnet-5", name: "Claude Sonnet 5" },
  { id: "sonnet-4", name: "Claude Sonnet 4" },
  { id: "haiku-4", name: "Claude Haiku 4" },
  // OpenAI / other chat models
  { id: "gpt-5.6-luna", name: "GPT-5.6 Luna" },
  { id: "gpt-5.6-sol", name: "GPT-5.6 Sol" },
  { id: "gpt-5.6-terra", name: "GPT-5.6 Terra" },
  { id: "gpt-5.5", name: "GPT-5.5" },
  { id: "gpt-5.4", name: "GPT-5.4" },
  { id: "kimi-k2.6", name: "Kimi K2.6" },
  { id: "kimi-k3", name: "Kimi K3" },
  { id: "glm-5.2-fast", name: "GLM 5.2 Fast" },
  { id: "glm-5.2", name: "GLM 5.2" },
  { id: "qwen3.7-plus", name: "Qwen 3.7 Plus" },
  { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash" },
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
  { id: "fugu-ultra", name: "Fugu Ultra" },
  { id: "grok-4.5", name: "Grok 4.5" },
  { id: "muse-spark-1.1", name: "Muse Spark 1.1" },
  { id: "inkling", name: "Inkling" },
];

export function stripHyperAgentModelPrefix(model: string): string {
  let m = (model || "").trim();
  if (m.startsWith("hyperagent/")) m = m.slice("hyperagent/".length);
  else if (m.startsWith("ha/")) m = m.slice(3);
  else if (m.startsWith("hyper/")) m = m.slice("hyper/".length);
  return m;
}

/** Resolve client slug / pretty name / wire id → catalog entry. */
export function resolveHyperAgentModel(model: unknown): HyperAgentModel | null {
  const raw = typeof model === "string" ? stripHyperAgentModelPrefix(model) : "";
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const catalog = HYPERAGENT_FALLBACK_MODELS;

  // Exact wire id
  const byId = catalog.find((m) => m.id.toLowerCase() === lower);
  if (byId) return byId;

  // Pretty name (case-insensitive)
  const byName = catalog.find((m) => m.name.toLowerCase() === lower);
  if (byName) return byName;

  // Compact pretty forms: "fable-5", "claude-fable-5", "fable5"
  const compact = lower.replace(/[\s_]+/g, "-");
  const aliases: Record<string, string> = {
    "fable-5": "fable",
    "claude-fable-5": "fable",
    fable5: "fable",
    fruitcake: "fruitcake-eap",
    "opus-latest": "opus-latest",
    "sonnet-latest": "sonnet-latest",
    "claude-opus-4.8": "opus-4-8",
    "claude-opus-4-8": "opus-4-8",
    "claude-sonnet-5": "sonnet-5",
    "claude-haiku-4": "haiku-4",
  };
  if (aliases[compact]) {
    return catalog.find((m) => m.id === aliases[compact]) || null;
  }

  // Partial contains on id or name
  return (
    catalog.find((m) => compact.includes(m.id.toLowerCase())) ||
    catalog.find((m) => m.name.toLowerCase().includes(compact)) ||
    null
  );
}

/** Client-facing model id for OpenAI responses (prefer wire id). */
export function clientFacingHyperAgentModelId(model: unknown): string {
  const resolved = resolveHyperAgentModel(model);
  if (resolved) return resolved.id;
  const stripped = typeof model === "string" ? stripHyperAgentModelPrefix(model) : "";
  return stripped || "opus-latest";
}

/** Wire modelId for HyperAgent chat body (default opus-latest from live capture). */
export function wireHyperAgentModelId(model: unknown): string {
  return clientFacingHyperAgentModelId(model);
}
