/**
 * modelsDevSync/transform — pure data model + transform layer.
 *
 * Extracted verbatim from modelsDevSync.ts. Holds the models.dev data-model
 * types, the provider-id mapping table, and the raw→OmniRoute transform
 * functions. Zero imports, no DB access, no module state — pure functions and
 * static data. The host (modelsDevSync.ts) imports these for its sync
 * orchestration and re-exports the originally-public symbols.
 *
 * @module lib/modelsDevSync/transform
 */

export type PricingEntry = {
  input: number;
  output: number;
  cached?: number;
  cache_creation?: number;
  reasoning?: number;
};

export type PricingModels = Record<string, PricingEntry>;
export type PricingByProvider = Record<string, PricingModels>;

export interface ModelCapabilityEntry {
  tool_call: boolean | null;
  reasoning: boolean | null;
  attachment: boolean | null;
  structured_output: boolean | null;
  temperature: boolean | null;
  modalities_input: string; // JSON array
  modalities_output: string; // JSON array
  knowledge_cutoff: string | null;
  release_date: string | null;
  last_updated: string | null;
  status: string | null;
  family: string | null;
  open_weights: boolean | null;
  limit_context: number | null;
  limit_input: number | null;
  limit_output: number | null;
  interleaved_field: string | null;
}

export type CapabilitiesByProvider = Record<string, Record<string, ModelCapabilityEntry>>;

// ─── models.dev API types (raw) ──────────────────────────

export interface ModelsDevCost {
  input?: number;
  output?: number;
  reasoning?: number;
  cache_read?: number;
  cache_write?: number;
  input_audio?: number;
  output_audio?: number;
}

export interface ModelsDevLimit {
  context?: number;
  input?: number;
  output?: number;
}

export interface ModelsDevModalities {
  input?: string[];
  output?: string[];
}

export interface ModelsDevInterleaved {
  field?: string;
}

export interface ModelsDevModel {
  id: string;
  name: string;
  family?: string;
  attachment?: boolean;
  reasoning?: boolean;
  tool_call?: boolean;
  structured_output?: boolean;
  temperature?: boolean;
  knowledge?: string;
  release_date?: string;
  last_updated?: string;
  open_weights?: boolean;
  status?: string;
  cost?: ModelsDevCost;
  limit?: ModelsDevLimit;
  modalities?: ModelsDevModalities;
  interleaved?: ModelsDevInterleaved | boolean;
}

export interface ModelsDevProvider {
  id: string;
  name?: string;
  env?: string[];
  npm?: string;
  api?: string;
  doc?: string;
  models: Record<string, ModelsDevModel>;
}

export type ModelsDevData = Record<string, ModelsDevProvider>;

// ─── Provider mapping: models.dev provider ID → OmniRoute provider IDs/aliases ──
//
// models.dev uses canonical provider IDs (e.g. "openai", "anthropic", "google").
// OmniRoute uses both full IDs and short aliases (e.g. "cc" for claude, "cx" for codex).
// We map each models.dev provider to ALL OmniRoute identifiers that should receive
// its pricing/capability data.

export const MODELS_DEV_PROVIDER_MAP: Record<string, string[]> = {
  // Major providers
  openai: ["openai", "cx"], // cx = Codex (uses OpenAI models)
  anthropic: ["anthropic", "cc"], // cc = Claude Code
  google: ["gemini"],
  "google-vertex": ["gemini", "vertex"],
  "google-vertex-anthropic": ["anthropic", "cc", "vertex"],
  vertex_ai: ["gemini", "vertex"],
  deepseek: ["deepseek", "if"], // if = Qoder (routes through DeepSeek)
  groq: ["groq"],
  xai: ["xai"],
  mistral: ["mistral"],
  togetherai: ["together", "openrouter"],
  together_ai: ["together", "openrouter"],
  "fireworks-ai": ["fireworks"],
  fireworks: ["fireworks"],
  cerebras: ["cerebras"],
  cohere: ["cohere"],
  nvidia: ["nvidia"],
  nebius: ["nebius"],
  siliconflow: ["siliconflow"],
  hyperbolic: ["hyperbolic"],
  huggingface: ["hf", "huggingface"],
  openrouter: ["openrouter"],
  perplexity: ["pplx", "perplexity"],
  // OAuth / special providers
  bedrock: ["kiro", "kr"], // kr = Kiro (AWS Bedrock)
  "github-copilot": ["github", "gh"],
  "github-models": ["github", "gh"],
  kilo: ["kilocode", "kc", "kilo-gateway"],
  kilocode: ["kilocode", "kc", "kilo-gateway"],
  "kimi-for-coding": ["kimi-coding", "kmc", "kimi-coding-apikey", "kmca"],
  // The `opencode` models.dev entry used to map only to "opencode-zen" because
  // that is the historical alias pair. But OmniRoute's catalog & combo targets
  // reference models under BOTH provider IDs:
  //   - `opencode-zen/big-pickle` (alias form)
  //   - `opencode/big-pickle`    (canonical id form, used by live API catalog
  //                               and by combos like "Opencode FREE Omni")
  // If we only store synced capabilities under "opencode-zen", the canonical
  // `opencode/<model>` lookup in getCanonicalModelMetadata returns null and
  // any combo that targets `opencode/...` ends up with no computed context.
  // Symmetric mapping keeps both lookup paths populated.
  opencode: ["opencode", "opencode-zen"],
  "opencode-go": ["opencode-go", "opencode-zen"],
  // Additional providers that may overlap with OmniRoute
  alibaba: ["ali", "alibaba"],
  "alibaba-cn": ["ali-cn", "alibaba-cn", "alibaba-china"],
  "alibaba-coding-plan": ["bcp", "bailian-coding-plan"],
  zai: ["zai", "glm"], // GLM models via Z.AI
  "zai-coding-plan": ["zai", "glm"],
  moonshotai: ["moonshot", "kimi"],
  "moonshotai-cn": ["moonshot", "kimi"],
  moonshot: ["moonshot", "kimi", "kimi-coding", "kmc", "kmca"],
  minimax: ["minimax", "minimax-cn"],
  "minimax-cn": ["minimax-cn"],
  longcat: ["lc", "longcat"],
  pollinations: ["pol", "pollinations"],
  puter: ["pu", "puter"],
  cloudflare: ["cf"],
  scaleway: ["scw"],
  ollama: ["ollamacloud", "ollama-cloud"],
  blackbox: ["bb", "blackbox"],
  cline: ["cl", "cline"],
  cursor: ["cu", "cursor"],
  github: ["gh", "github"],
  // Fallback: if no mapping exists, use the models.dev ID as-is
};

/**
 * Map a models.dev provider ID to OmniRoute provider IDs.
 * Returns array of provider identifiers (may include aliases).
 */
export function mapProviderId(modelsDevProviderId: string): string[] {
  return MODELS_DEV_PROVIDER_MAP[modelsDevProviderId] || [modelsDevProviderId];
}

// ─── Transform: Pricing ──────────────────────────────────

/**
 * Transform models.dev raw data → OmniRoute PricingByProvider format.
 *
 * models.dev costs are already in $/1M tokens (same as OmniRoute format).
 * Maps: cache_read → cached, cache_write → cache_creation.
 */
export function transformModelsDevToPricing(raw: ModelsDevData): PricingByProvider {
  const result: PricingByProvider = {};

  for (const [providerId, providerData] of Object.entries(raw)) {
    const omniRouteProviders = mapProviderId(providerId);

    for (const [modelId, model] of Object.entries(providerData.models || {})) {
      if (!model.cost) continue;

      // Must have at least input pricing
      if (model.cost.input == null) continue;

      const entry: PricingEntry = {
        input: model.cost.input,
        output: model.cost.output ?? 0,
      };

      if (model.cost.cache_read != null) {
        entry.cached = model.cost.cache_read;
      }
      if (model.cost.cache_write != null) {
        entry.cache_creation = model.cost.cache_write;
      }
      if (model.cost.reasoning != null) {
        entry.reasoning = model.cost.reasoning;
      }

      // Write to ALL mapped OmniRoute providers
      for (const omniProvider of omniRouteProviders) {
        if (!result[omniProvider]) result[omniProvider] = {};
        result[omniProvider][modelId] = entry;
      }
    }
  }

  return result;
}

// ─── Transform: Capabilities ─────────────────────────────

/**
 * Transform models.dev raw data → CapabilitiesByProvider format.
 */
export function transformModelsDevToCapabilities(raw: ModelsDevData): CapabilitiesByProvider {
  const result: CapabilitiesByProvider = {};

  for (const [providerId, providerData] of Object.entries(raw)) {
    const omniRouteProviders = mapProviderId(providerId);

    for (const [modelId, model] of Object.entries(providerData.models || {})) {
      const cap: ModelCapabilityEntry = {
        tool_call: model.tool_call ?? null,
        reasoning: model.reasoning ?? null,
        attachment: model.attachment ?? null,
        structured_output: model.structured_output ?? null,
        temperature: model.temperature ?? null,
        modalities_input: JSON.stringify(model.modalities?.input ?? []),
        modalities_output: JSON.stringify(model.modalities?.output ?? []),
        knowledge_cutoff: model.knowledge ?? null,
        release_date: model.release_date ?? null,
        last_updated: model.last_updated ?? null,
        status: model.status ?? null,
        family: model.family ?? null,
        open_weights: model.open_weights ?? null,
        limit_context: model.limit?.context ?? null,
        limit_input: model.limit?.input ?? null,
        limit_output: model.limit?.output ?? null,
        interleaved_field:
          typeof model.interleaved === "object" && model.interleaved?.field
            ? model.interleaved.field
            : model.interleaved === true
              ? "reasoning_content"
              : null,
      };

      for (const omniProvider of omniRouteProviders) {
        if (!result[omniProvider]) result[omniProvider] = {};
        result[omniProvider][modelId] = cap;
      }
    }
  }

  return result;
}
