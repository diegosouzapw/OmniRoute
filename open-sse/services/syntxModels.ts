/**
 * SYNTX.ai model catalog — live GET /api/v1/llm/models plus a seed fallback.
 *
 * Each model has an `ai_name` (chatgpt/claude/gemini/…) required as the
 * `?ai_name=` query on POST /api/v1/llm/generate.
 */
import { SYNTX_API_BASE, syntxAuthHeaders } from "./syntxAuth.ts";

export const SYNTX_MODELS_URL = `${SYNTX_API_BASE}/api/v1/llm/models?enabled_only=true&lang=en`;
export const SYNTX_DEFAULT_MODEL = "gpt-5-nano-2025-08-07";

export type SyntxCatalogModel = {
  id: string;
  name: string;
  aiName: string;
  vision?: boolean;
  thinking?: boolean;
  contextLength?: number;
  maxOutputTokens?: number;
};

export const SYNTX_FALLBACK_MODELS: readonly SyntxCatalogModel[] = [
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", aiName: "claude", vision: true, thinking: true, contextLength: 2_000_000, maxOutputTokens: 20_000 },
  { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", aiName: "claude", vision: true, thinking: true, contextLength: 256_000, maxOutputTokens: 16_000 },
  { id: "claude-opus-5", name: "Claude Opus 5", aiName: "claude", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "claude-fable-5", name: "Claude Fable 5", aiName: "claude", vision: true, thinking: true, contextLength: 256_000, maxOutputTokens: 32_000 },
  { id: "claude-opus-4-6", name: "Claude Opus 4.6", aiName: "claude", vision: true, thinking: true, contextLength: 256_000, maxOutputTokens: 32_000 },
  { id: "claude-opus-4-7", name: "Claude Opus 4.7", aiName: "claude", vision: true, thinking: true, contextLength: 256_000, maxOutputTokens: 32_000 },
  { id: "claude-opus-4-8", name: "Claude Opus 4.8", aiName: "claude", vision: true, thinking: true, contextLength: 256_000, maxOutputTokens: 32_000 },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", aiName: "claude", vision: true, thinking: true, contextLength: 256_000, maxOutputTokens: 32_000 },
  { id: "claude-sonnet-5", name: "Claude Sonnet 5", aiName: "claude", vision: true, thinking: true, contextLength: 256_000, maxOutputTokens: 32_000 },
  { id: "qwen3-max-2026-01-23", name: "Qwen 3 Max", aiName: "qwen", thinking: true, contextLength: 356_000, maxOutputTokens: 65_536 },
  { id: "qwen3.7-max", name: "Qwen 3.7 Max", aiName: "qwen", thinking: true, contextLength: 356_000, maxOutputTokens: 65_536 },
  { id: "qwen3.7-plus", name: "Qwen 3.7 Plus", aiName: "qwen", thinking: true, contextLength: 356_000, maxOutputTokens: 65_536 },
  { id: "deepseek-r1", name: "DeepSeek R1", aiName: "deepseek", thinking: true, contextLength: 356_000, maxOutputTokens: 384_000 },
  { id: "deepseek-v3", name: "DeepSeek V3", aiName: "deepseek", contextLength: 356_000, maxOutputTokens: 384_000 },
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro", aiName: "gemini", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 65_536 },
  { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash", aiName: "gemini", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 65_536 },
  { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash Lite", aiName: "gemini", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 65_536 },
  { id: "gemini-3.6-flash", name: "Gemini 3.6 Flash", aiName: "gemini", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 65_536 },
  { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash", aiName: "gemini", vision: true, thinking: true, contextLength: 200_000, maxOutputTokens: 12_000 },
  { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash", aiName: "gemini", vision: true, thinking: true, contextLength: 200_000, maxOutputTokens: 12_000 },
  { id: "gpt-5-mini-2025-08-07", name: "GPT-5 Mini", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-5-nano-2025-08-07", name: "GPT-5 Nano", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-5.6-luna", name: "GPT 5.6 Luna", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-6-astra", name: "GPT 6 Astra", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-5.6-terra", name: "GPT 5.6 Terra", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-5.6-sol", name: "GPT 5.6 Sol", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-5.2", name: "GPT 5.2", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-5.4", name: "GPT 5.4", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "gpt-5.5", name: "GPT 5.5", aiName: "chatgpt", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
  { id: "sonar", name: "Perplexity Sonar + Internet", aiName: "perplexity", contextLength: 128_000, maxOutputTokens: 8192 },
  { id: "grok-4.6", name: "Grok 4.6", aiName: "grok", thinking: true, contextLength: 356_000, maxOutputTokens: 32_800 },
  { id: "grok-4.3", name: "Grok 4.3", aiName: "grok", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 131_072 },
  { id: "grok-4.5", name: "Grok 4.5", aiName: "grok", vision: true, thinking: true, contextLength: 356_000, maxOutputTokens: 32_768 },
  { id: "glm-5.2", name: "GLM 5.2", aiName: "zai", thinking: true, contextLength: 356_000, maxOutputTokens: 128_000 },
];

const FALLBACK_BY_ID = new Map(SYNTX_FALLBACK_MODELS.map((model) => [model.id, model]));

export function stripSyntxModelPrefix(model: string): string {
  const raw = (model || "").trim();
  if (raw.startsWith("syntx/")) return raw.slice("syntx/".length) || SYNTX_DEFAULT_MODEL;
  if (raw.startsWith("stx/")) return raw.slice("stx/".length) || SYNTX_DEFAULT_MODEL;
  return raw || SYNTX_DEFAULT_MODEL;
}

export function mapSyntxModel(model: string): string {
  const stripped = stripSyntxModelPrefix(model);
  if (!stripped || stripped === "auto" || stripped === "default") return SYNTX_DEFAULT_MODEL;
  return stripped;
}

export function inferSyntxAiName(modelId: string, catalog?: ReadonlyMap<string, SyntxCatalogModel>): string {
  const id = stripSyntxModelPrefix(modelId).toLowerCase();
  const hit = catalog?.get(stripSyntxModelPrefix(modelId)) || FALLBACK_BY_ID.get(stripSyntxModelPrefix(modelId));
  if (hit?.aiName) return hit.aiName;
  if (id.startsWith("claude")) return "claude";
  if (id.startsWith("gemini")) return "gemini";
  if (id.startsWith("qwen")) return "qwen";
  if (id.startsWith("deepseek")) return "deepseek";
  if (id.startsWith("grok")) return "grok";
  if (id.startsWith("glm") || id.startsWith("zai")) return "zai";
  if (id === "sonar" || id.includes("perplexity") || id.startsWith("pplx")) return "perplexity";
  return "chatgpt";
}

export function parseSyntxModelsCatalog(json: unknown): SyntxCatalogModel[] {
  const root = json && typeof json === "object" && !Array.isArray(json) ? (json as Record<string, unknown>) : {};
  const rows = Array.isArray(root.models) ? root.models : Array.isArray(json) ? json : [];
  const seen = new Set<string>();
  const models: SyntxCatalogModel[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row)) continue;
    const rec = row as Record<string, unknown>;
    const id = typeof rec.id === "string" ? rec.id.trim() : "";
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const caps =
      rec.capabilities && typeof rec.capabilities === "object" && !Array.isArray(rec.capabilities)
        ? (rec.capabilities as Record<string, unknown>)
        : {};
    models.push({
      id,
      name: typeof rec.label === "string" && rec.label.trim() ? rec.label.trim() : id,
      aiName: typeof rec.ai_name === "string" && rec.ai_name.trim() ? rec.ai_name.trim() : inferSyntxAiName(id),
      vision: caps.images === true,
      thinking: caps.thinking === true,
      contextLength: typeof rec.context_window === "number" ? rec.context_window : undefined,
      maxOutputTokens: typeof rec.default_max_tokens === "number" ? rec.default_max_tokens : undefined,
    });
  }
  return models;
}

const catalogCache = new Map<string, { models: SyntxCatalogModel[]; byId: Map<string, SyntxCatalogModel>; ts: number }>();
const CATALOG_TTL_MS = 10 * 60_000;

export async function discoverSyntxModels(options: {
  token: string;
  fetchImpl?: typeof fetch;
}): Promise<SyntxCatalogModel[]> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const response = await fetchImpl(SYNTX_MODELS_URL, {
    method: "GET",
    headers: syntxAuthHeaders(options.token),
  });
  if (!response.ok) {
    throw new Error(`SYNTX models HTTP ${response.status}`);
  }
  const models = parseSyntxModelsCatalog(await response.json());
  if (models.length === 0) throw new Error("SYNTX models catalog was empty");
  catalogCache.set(options.token.slice(-16), {
    models,
    byId: new Map(models.map((model) => [model.id, model])),
    ts: Date.now(),
  });
  return models;
}

export async function getSyntxCatalogMap(options: {
  token: string;
  fetchImpl?: typeof fetch;
}): Promise<Map<string, SyntxCatalogModel>> {
  const cacheKey = options.token.slice(-16);
  const cached = catalogCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CATALOG_TTL_MS) return cached.byId;
  try {
    const models = await discoverSyntxModels(options);
    return new Map(models.map((model) => [model.id, model]));
  } catch {
    return new Map(SYNTX_FALLBACK_MODELS.map((model) => [model.id, { ...model }]));
  }
}

export function __resetSyntxModelCacheForTests(): void {
  catalogCache.clear();
}
