export const ANTIGRAVITY_PUBLIC_MODELS = Object.freeze([
  // Claude (Antigravity backend). The `agy` provider already ships these from the live
  // :fetchAvailableModels probe (see agyModels.ts) and discussion #3184 confirmed they
  // are user-callable through the `antigravity` OAuth provider too — same backend.
  // `antigravity/claude-opus-4-6-thinking` and `antigravity/claude-sonnet-4-6` both work.
  // They are upstream IDs, so no alias remapping is required.
  {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 (Thinking)",
    contextLength: 200000,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6 (Thinking)",
    contextLength: 200000,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Gemini 3.5 Flash tiers exposed by Antigravity 2.0.4's model selector.
  // The user-facing names are Low / Medium / High, but fetchAvailableModels reports
  // legacy upstream IDs for two of them:
  //   Low    -> gemini-3.5-flash-extra-low (displayName: Gemini 3.5 Flash (Low))
  //   Medium -> gemini-3.5-flash-low       (displayName: Gemini 3.5 Flash (Medium))
  //   High   -> gemini-3-flash-agent       (displayName: Gemini 3.5 Flash (High))
  // Keep the clean public IDs here and map them below for routing/quota.
  {
    id: "gemini-3.5-flash-low",
    name: "Gemini 3.5 Flash (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.5-flash-medium",
    name: "Gemini 3.5 Flash (Medium)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.5-flash-high",
    name: "Gemini 3.5 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3-pro-preview",
    name: "Gemini 3.1 Pro",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Gemini 3.1 Pro budget tiers — agy ships these and they route directly via the
  // antigravity OAuth provider. The upstream ACCEPTS the suffixed ids verbatim (wire-
  // confirmed via `agy --model gemini-3.1-pro-high`: 200 OK on /v1internal:streamGenerateContent).
  // No alias needed; see #3696 (supersedes the #3229 premise).
  {
    id: "gemini-3.1-pro-high",
    name: "Gemini 3.1 Pro (High)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-pro-low",
    name: "Gemini 3.1 Pro (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  {
    id: "gemini-2.5-flash-thinking",
    name: "Gemini 2.5 Flash Thinking",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  {
    id: "gemini-pro-agent",
    name: "Gemini 3.1 Pro (High)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  },
  { id: "gemini-3-pro-image-preview", name: "Gemini 3 Pro Image" },
  { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash Image" },
  {
    id: "gemini-2.5-computer-use-preview-10-2025",
    name: "Gemini 2.5 Computer Use Preview (10/2025)",
  },
]);

export const ANTIGRAVITY_MODEL_ALIASES = Object.freeze({
  "gemini-3.5-flash-low": "gemini-3.5-flash-extra-low",
  "gemini-3.5-flash-medium": "gemini-3.5-flash-low",
  "gemini-3.5-flash-high": "gemini-3-flash-agent",
  // Backward-compat: the retired flagship public id `gemini-3.5-flash-preview`
  // (Antigravity 2.0's "Gemini 3.5 Flash") is kept as a HIDDEN alias so saved
  // combos/configs keep routing — it maps to the reasoning-capable High tier
  // (upstream `gemini-3-flash-agent`). It is NOT re-added to the public catalog.
  "gemini-3.5-flash-preview": "gemini-3-flash-agent",
  "gemini-3-pro-preview": "gemini-3.1-pro",
  // gemini-3.1-pro-high and gemini-3.1-pro-low are NOT aliased here: wire capture
  // (#3696) confirmed the upstream accepts the suffixed ids verbatim → pass through.
  // (The earlier #3229 assumption — "upstream rejects -high/-low for gemini-3.x" —
  // was refuted by the agy --log-file 200 OK evidence.)
  "gemini-3-pro-image-preview": "gemini-3-pro-image",
  "gemini-2.5-computer-use-preview-10-2025": "rev19-uic3-1p",
  // Legacy Claude display ids → current upstream ids. NOTE: an earlier comment here
  // assumed Claude was removed from Antigravity 2.0 and would 404; discussion #3184
  // disproved that — the Antigravity OAuth backend still serves claude-opus-4-6-thinking
  // and claude-sonnet-4-6 (now listed in ANTIGRAVITY_PUBLIC_MODELS above). These aliases
  // remap the old gemini-claude-* ids to the live upstream ids.
  "gemini-claude-sonnet-4-5": "claude-sonnet-4-6",
  "gemini-claude-sonnet-4-5-thinking": "claude-sonnet-4-6",
  "gemini-claude-opus-4-5-thinking": "claude-opus-4-6-thinking",
});

type AntigravityModelAliasMap = Record<string, string>;

/**
 * #3786 — Per-request upstream-id FALLBACK CHAINS for the Gemini 3.1 Pro family.
 *
 * On recent Antigravity versions `gemini-3.1-pro-high` started returning HTTP 400
 * ("Antigravity upstream error (400)") while `gemini-3.1-pro-low` still works. The upstream
 * changed the accepted id format for the Pro-high tier and the live id cannot be determined
 * from static analysis — the two actively-maintained competitor proxies DISAGREE:
 *   - AntigravityManager → `gemini-3.1-pro-high`
 *   - CLIProxyAPI        → `gemini-pro-agent` (display: "Gemini 3.1 Pro (High)")
 *   - older form         → `gemini-3-pro-high`
 *
 * Mirroring AntigravityManager's robust approach, the executor retries the next candidate id
 * on a 400 until one succeeds (2xx) or the chain is exhausted. This is a REQUEST-TIME retry,
 * NOT a change to the static `resolveAntigravityModelId` map — the #3696 pass-through
 * invariant (suffixed ids reach the upstream verbatim on the FIRST attempt) is preserved.
 *
 * Each chain starts with its own key so the happy path (first id 200) incurs zero extra
 * calls, and every candidate is listed at most once so the retry loop is bounded.
 */
export const ANTIGRAVITY_PRO_FALLBACK_CHAINS: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    "gemini-3.1-pro-high": Object.freeze([
      "gemini-3.1-pro-high",
      "gemini-pro-agent",
      "gemini-3-pro-high",
    ]),
    // pro-low currently works but is given a trivially-symmetric chain for resilience if the
    // upstream renames it the same way it renamed pro-high.
    "gemini-3.1-pro-low": Object.freeze(["gemini-3.1-pro-low", "gemini-3-pro-low"]),
  });

/**
 * Return the ordered upstream-id fallback chain for `modelId` (the requested id first), or
 * `[]` when the model has no chain (flash, claude, plain pro, etc.). Pure — safe to unit test
 * and to call on every request (returns `[]` cheaply off the happy path's hot models).
 */
export function getAntigravityModelFallbacks(modelId: string): readonly string[] {
  if (!modelId) return [];
  return ANTIGRAVITY_PRO_FALLBACK_CHAINS[modelId] ?? [];
}

export const ANTIGRAVITY_REVERSE_MODEL_ALIASES: AntigravityModelAliasMap = Object.freeze({
  "gemini-3.5-flash-extra-low": "gemini-3.5-flash-low",
  "gemini-3-flash-agent": "gemini-3.5-flash-high",
  "gemini-3.1-pro": "gemini-3-pro-preview",
  "gemini-3-pro-image": "gemini-3-pro-image-preview",
  "rev19-uic3-1p": "gemini-2.5-computer-use-preview-10-2025",
});

const CLIENT_VISIBLE_MODEL_NAMES = Object.freeze(
  ANTIGRAVITY_PUBLIC_MODELS.reduce<Record<string, string>>((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {})
);

const PUBLIC_MODEL_IDS = new Set(ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id));
const UPSTREAM_PUBLIC_MODEL_IDS = new Set(
  ANTIGRAVITY_PUBLIC_MODELS.map((model) => resolveAntigravityModelId(model.id))
);

export function resolveAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return (ANTIGRAVITY_MODEL_ALIASES as AntigravityModelAliasMap)[modelId] || modelId;
}

export function toClientAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return ANTIGRAVITY_REVERSE_MODEL_ALIASES[modelId] || modelId;
}

// Quota buckets reported by the Antigravity backend are keyed by UPSTREAM model ids — a
// DIFFERENT namespace from the public/client catalog. In that upstream quota namespace
// `gemini-3.5-flash-low` denotes the *Medium* tier's bucket (it is the upstream target of
// the `gemini-3.5-flash-medium` forward alias), even though the same literal is also a
// public "Low" client id. This remap therefore CANNOT be derived from
// ANTIGRAVITY_REVERSE_MODEL_ALIASES (which has no `gemini-3.5-flash-low` entry precisely
// because it is already a valid client id) — it encodes the upstream-bucket → client-tier
// chain explicitly. Keep it the inverse of the `-low/-medium/-high` rows in
// ANTIGRAVITY_MODEL_ALIASES above. (#3821-review LEDGER-5 — was duplicated as an inline
// if-ladder in open-sse/services/usage.ts.)
const ANTIGRAVITY_QUOTA_BUCKET_TO_CLIENT: AntigravityModelAliasMap = Object.freeze({
  "gemini-3.5-flash-extra-low": "gemini-3.5-flash-low",
  "gemini-3.5-flash-low": "gemini-3.5-flash-medium",
  "gemini-3-flash-agent": "gemini-3.5-flash-high",
});

// Retired/hidden upstream preview buckets that must be dropped from client-facing usage.
const ANTIGRAVITY_DROPPED_QUOTA_BUCKETS = new Set<string>([
  "gemini-3.5-flash-preview",
  "gemini-3-flash-preview",
]);

/**
 * Map an UPSTREAM Antigravity quota-bucket model id to the client-visible tier id used in
 * usage responses, or `null` if the bucket should be hidden from clients. Operates on the
 * upstream quota namespace (see ANTIGRAVITY_QUOTA_BUCKET_TO_CLIENT) — do NOT pass client
 * ids here. Single source of truth shared by the usage service and the provider-limits
 * cache sanitizer.
 */
export function toClientAntigravityQuotaModelId(modelId: string): string | null {
  if (!modelId) return null;
  if (ANTIGRAVITY_DROPPED_QUOTA_BUCKETS.has(modelId)) return null;
  const tierClientId = ANTIGRAVITY_QUOTA_BUCKET_TO_CLIENT[modelId];
  if (tierClientId) return tierClientId;
  return toClientAntigravityModelId(modelId);
}

export function getClientVisibleAntigravityModelName(
  modelId: string,
  fallbackName?: string
): string {
  return CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}

export function isUserCallableAntigravityModelId(modelId: string): boolean {
  if (!modelId) return false;
  const clientId = toClientAntigravityModelId(modelId);
  const upstreamId = resolveAntigravityModelId(modelId);
  return PUBLIC_MODEL_IDS.has(clientId) || UPSTREAM_PUBLIC_MODEL_IDS.has(upstreamId);
}
