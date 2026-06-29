/**
 * Bifrost Provider Map — OmniRoute → Bifrost name translation
 *
 * Maps OmniRoute provider IDs to Bifrost (maximhq/bifrost, Go) provider IDs.
 * Bifrost ships with ~23 first-class providers; OmniRoute tracks 232 (some
 * custom, some web-cookie-only, some deprecated). For each OmniRoute
 * provider, this map tells us whether Bifrost can serve it, and if so,
 * under what name.
 *
 * Update policy: when Bifrost gains a provider, add an entry here so the
 * Tier-2 engine knows to forward to it. When OmniRoute gains a custom
 * provider that Bifrost cannot serve, mark it `supports: false` and the
 * Tier-2 engine will keep it on the legacy `chatCore.ts` path.
 *
 * @see src/app/api/v1/relay/chat/completions/bifrost/route.ts (the bifrost
 *   sidecar route that uses this map to decide routing)
 */

export type BifrostProviderStatus =
  | "native" // Bifrost supports this provider natively (same wire format)
  | "alias" // Bifrost supports under a different ID; mapped via this entry
  | "passthrough" // Bifrost supports but uses generic OpenAI-compat path
  | "unsupported"; // Bifrost does not support; stay on OmniRoute legacy

export interface BifrostProviderEntry {
  /** Bifrost's provider ID (or null if unsupported) */
  bifrostId: string | null;
  /** Status classification */
  status: BifrostProviderStatus;
  /**
   * Optional model-name override (e.g. if Bifrost uses a different
   * canonical model name than OmniRoute). Most providers pass through
   * unchanged, so this is usually null.
   */
  modelOverride?: (model: string) => string;
  /** Free-text note surfaced in the dashboard migration panel */
  note?: string;
}

/**
 * Bifrost provider catalog (23+ as of 2026-06-18). Tracked explicitly so
 * the TypeScript compiler can warn if a Bifrost entry is added but the
 * map is not extended.
 */
export const BIFROST_PROVIDER_IDS = [
  "openai",
  "anthropic",
  "gemini",
  "bedrock",
  "cohere",
  "mistral",
  "groq",
  "together",
  "fireworks",
  "openrouter",
  "azure",
  "vertex",
  "perplexity",
  "deepseek",
  "xai",
  "replicate",
  "anyscale",
  "lepton",
  "octoai",
  "voyage",
  "ai21",
  "huggingface",
  "ollama",
] as const;

export type BifrostProviderId = (typeof BIFROST_PROVIDER_IDS)[number];

/**
 * OmniRoute → Bifrost provider map.
 *
 * Most common case: Bifrost supports the provider natively and the IDs
 * match (`openai`, `anthropic`, `gemini`, etc.). For renamed/merged
 * providers (e.g. `claude` → `anthropic`), add an explicit alias.
 *
 * Web-cookie providers (e.g. `claude-web`, `chatgpt-web`) and custom
 * non-API providers (e.g. `cliproxyapi`) are NOT supported by Bifrost
 * and remain on the OmniRoute legacy path.
 */
export const BIFROST_PROVIDER_MAP: Record<string, BifrostProviderEntry> = {
  // --- Direct matches: OmniRoute ID == Bifrost ID ---
  openai: {
    bifrostId: "openai",
    status: "native",
    note: "Full coverage incl. o1/o3/gpt-4o; uses BifrostResponses for /v1/responses.",
  },
  anthropic: {
    bifrostId: "anthropic",
    status: "native",
    note: "Claude 3.5/3.7/4 incl. extended thinking and prompt caching.",
  },
  gemini: {
    bifrostId: "gemini",
    status: "native",
    note: "Vertex-style; supports system instructions, JSON mode, multimodal.",
  },
  bedrock: { bifrostId: "bedrock", status: "native" },
  cohere: { bifrostId: "cohere", status: "native" },
  mistral: { bifrostId: "mistral", status: "native" },
  groq: { bifrostId: "groq", status: "native" },
  together: { bifrostId: "together", status: "native" },
  fireworks: { bifrostId: "fireworks", status: "native" },
  openrouter: { bifrostId: "openrouter", status: "native" },
  azure: {
    bifrostId: "azure",
    status: "native",
    note: "Azure OpenAI; deployments map via modelOverride below.",
  },
  vertex: { bifrostId: "vertex", status: "native" },
  perplexity: { bifrostId: "perplexity", status: "native" },
  deepseek: { bifrostId: "deepseek", status: "native" },
  xai: { bifrostId: "xai", status: "native", note: "Grok-1/2/3 incl. function calling." },
  ollama: {
    bifrostId: "ollama",
    status: "native",
    note: "Local; Bifrost talks to local Ollama daemon.",
  },
  voyage: { bifrostId: "voyage", status: "native", note: "Embeddings only." },

  // --- Aliases: OmniRoute ID != Bifrost ID ---
  claude: {
    bifrostId: "anthropic",
    status: "alias",
    note: "OmniRoute's legacy 'claude' ID maps to Bifrost's 'anthropic'.",
  },
  gpt: {
    bifrostId: "openai",
    status: "alias",
    note: "OmniRoute's legacy 'gpt' ID maps to Bifrost's 'openai'.",
  },
  palm: {
    bifrostId: "gemini",
    status: "alias",
    note: "Legacy PaLM ID; Bifrost serves via Gemini.",
  },
  palm2: {
    bifrostId: "gemini",
    status: "alias",
    note: "Legacy PaLM2 ID; Bifrost serves via Gemini (gemini-1.5-flash-class).",
  },
  bard: {
    bifrostId: "gemini",
    status: "alias",
    note: "Legacy Bard ID; Bifrost serves via Gemini.",
  },

  // --- Passthrough: Bifrost can serve but uses generic OpenAI-compat path ---
  anyscale: { bifrostId: "anyscale", status: "passthrough" },
  replicate: { bifrostId: "replicate", status: "passthrough" },
  lepton: { bifrostId: "lepton", status: "passthrough" },
  octoai: { bifrostId: "octoai", status: "passthrough" },
  ai21: { bifrostId: "ai21", status: "passthrough" },
  huggingface: { bifrostId: "huggingface", status: "passthrough" },

  // --- Azure model override example: deployment-name → model-id ---
  // Bifrost expects the model ID (gpt-4o, gpt-4-turbo), but OmniRoute's
  // Azure UI often stores the deployment name. The override function
  // normalizes.
  "azure-gpt4": {
    bifrostId: "azure",
    status: "alias",
    modelOverride: (model: string) => {
      // If the model looks like a deployment name (contains slashes or
      // uppercase letters after a dash), strip it down to a known model
      // family. Otherwise pass through.
      if (/^gpt-4o/i.test(model)) return "gpt-4o";
      if (/^gpt-4-turbo/i.test(model)) return "gpt-4-turbo";
      if (/^gpt-35/i.test(model)) return "gpt-35-turbo";
      return model;
    },
    note: "Strips Azure deployment names to Bifrost's model-id namespace.",
  },

  // --- Unsupported: stay on OmniRoute legacy ---
  "claude-web": {
    bifrostId: null,
    status: "unsupported",
    note: "Web-cookie provider; not a Bifrost use case.",
  },
  "chatgpt-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "gemini-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "grok-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "kimi-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "qwen-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "deepseek-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "perplexity-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "copilot-web": { bifrostId: null, status: "unsupported", note: "Web-cookie provider." },
  "duckduckgo-web": { bifrostId: null, status: "unsupported", note: "Web-cookie search provider." },
  cliproxyapi: { bifrostId: null, status: "unsupported", note: "Custom CLIProxyAPI executor." },
  ninerouter: { bifrostId: null, status: "unsupported", note: "Custom 9router executor." },
  codex: { bifrostId: null, status: "unsupported", note: "Custom codex CLI executor." },
  cursor: { bifrostId: null, status: "unsupported", note: "Custom Cursor IDE executor." },
  trae: { bifrostId: null, status: "unsupported", note: "Custom Trae IDE executor." },
  qoder: { bifrostId: null, status: "unsupported", note: "Custom Qoder IDE executor." },
  kiro: { bifrostId: null, status: "unsupported", note: "Custom Kiro IDE executor." },
  antigravity: { bifrostId: null, status: "unsupported", note: "Custom antigravity executor." },
  devin: { bifrostId: null, status: "unsupported", note: "Custom devin CLI executor." },
  windsurf: { bifrostId: null, status: "unsupported", note: "Custom Windsurf executor." },
  commandcode: { bifrostId: null, status: "unsupported", note: "Custom commandcode executor." },
};

/**
 * Look up Bifrost provider info for an OmniRoute provider ID.
 * Returns `null` if the provider is not in the map (treated as
 * "unsupported" by callers — defaults to legacy chatCore path).
 */
export function getBifrostEntry(omnirouteId: string): BifrostProviderEntry | null {
  return BIFROST_PROVIDER_MAP[omnirouteId] ?? null;
}

/**
 * Resolve the Bifrost provider ID for an OmniRoute provider. Returns
 * `null` if Bifrost cannot serve the provider (caller should fall back
 * to the legacy `chatCore.ts` path).
 */
export function resolveBifrostProviderId(omnirouteId: string): string | null {
  return getBifrostEntry(omnirouteId)?.bifrostId ?? null;
}

/**
 * Apply model-name override if the entry defines one. Most entries are
 * identity (passthrough). Returns the input unchanged if no override.
 */
export function applyBifrostModelOverride(omnirouteId: string, model: string): string {
  const entry = getBifrostEntry(omnirouteId);
  return entry?.modelOverride ? entry.modelOverride(model) : model;
}

/**
 * Check whether Bifrost can serve a given OmniRoute provider. Convenience
 * predicate for routing decisions.
 */
export function isBifrostSupported(omnirouteId: string): boolean {
  const entry = getBifrostEntry(omnirouteId);
  return entry !== null && entry.status !== "unsupported" && entry.bifrostId !== null;
}

/**
 * Get all OmniRoute providers Bifrost supports. Useful for the dashboard
 * migration panel (shows the user which providers can be flipped to
 * Bifrost-backed mode).
 */
export function listBifrostSupportedProviders(): Array<{
  omnirouteId: string;
  bifrostId: string;
  status: BifrostProviderStatus;
  note?: string;
}> {
  return Object.entries(BIFROST_PROVIDER_MAP)
    .filter(([, entry]) => entry.status !== "unsupported" && entry.bifrostId !== null)
    .map(([omnirouteId, entry]) => ({
      omnirouteId,
      bifrostId: entry.bifrostId!,
      status: entry.status,
      note: entry.note,
    }));
}

/**
 * Get all OmniRoute providers Bifrost cannot serve. Useful for the
 * dashboard to show "this provider stays on legacy chatCore" badges.
 */
export function listBifrostUnsupportedProviders(): Array<{
  omnirouteId: string;
  status: BifrostProviderStatus;
  note?: string;
}> {
  return Object.entries(BIFROST_PROVIDER_MAP)
    .filter(([, entry]) => entry.status === "unsupported" || entry.bifrostId === null)
    .map(([omnirouteId, entry]) => ({
      omnirouteId,
      status: entry.status,
      note: entry.note,
    }));
}
