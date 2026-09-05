/**
 * GitHub Copilot live model discovery (#3120, #3121).
 *
 * The `github` (Copilot) provider previously shipped a STATIC hardcoded model
 * catalog in `providerRegistry.ts` and had no discovery source, so "Import
 * Models" could never refresh the list (#3120) and advertised models the
 * account is not entitled to (e.g. gemini previews), which fail upstream with
 * `400 ... not supported` when tested (#3121).
 *
 * Copilot exposes its per-account catalog at `https://api.githubcopilot.com/models`,
 * authenticated with the Copilot bearer token + the standard Copilot chat
 * headers. The response shape is `{ data: [{ id, name, model_picker_enabled,
 * policy, capabilities, ... }] }`. We map `data[].id` into managed models. Only
 * entitled models appear in the live response, so parsing it directly gives the
 * entitlement filtering #3121 needs.
 *
 * A safe fallback to the existing static catalog is preserved for
 * offline/unauthed/failed refresh so the import flow never breaks.
 */
import { getGitHubCopilotChatHeaders } from "../config/providerHeaderProfiles.ts";
import { githubProvider } from "../config/providers/registry/github/index.ts";
import { isRetiredGitHubCopilotModelId } from "../config/providers/registry/github/retiredModels.ts";

export const GITHUB_COPILOT_MODELS_URL = "https://api.githubcopilot.com/models";

// Static fallback catalog. Used ONLY when live discovery is unavailable
// (offline / unauthed / upstream error): the account's real entitlements can't
// be read, so we fall back to this curated set of known-good chat ids. It is
// NOT used to gate the LIVE response — see parseGitHubCopilotModels, which keeps
// every entitled chat model the catalog returns (so newly-entitled models like
// grok-4.6 / mai-code-1.1-flash / gemini-3.8-flash appear without a code edit).
// Upstream retirements and explicit local removals are excluded from both results.
export const GITHUB_COPILOT_STATIC_FALLBACK_MODELS: readonly string[] = Object.freeze(
  githubProvider.models.map((model) => model.id)
);

// Back-compat alias: earlier code + tests imported this name. It is now the
// static FALLBACK catalog, not a live-response gate.
export const GITHUB_COPILOT_MODEL_ALLOWLIST = GITHUB_COPILOT_STATIC_FALLBACK_MODELS;

const GITHUB_COPILOT_STATIC_FALLBACK_SET = new Set<string>(GITHUB_COPILOT_STATIC_FALLBACK_MODELS);

export type GitHubCopilotModel = {
  id: string;
  name: string;
  owned_by: string;
};

type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

// Decide whether a live /models row is a routable chat model. Capability-driven
// (rename-robust) rather than an id allowlist: any model the account is entitled
// to whose capabilities.type is "chat" (or that carries a chat-shaped
// supported_endpoints) is kept, so a newly-entitled model shows up with no code
// change. Also filters out rows when policy.state is set and != "enabled", or
// when model_picker_enabled=false. Explicitly non-chat rows (embeddings /
// completion) are dropped as well.
function isRoutableChatModel(item: RawRecord): boolean {
  const policy = asRecord(item.policy);
  const policyState = toNonEmptyString(policy.state);
  if (policyState && policyState !== "enabled") return false;
  if (item.model_picker_enabled === false) return false;

  const capabilities = asRecord(item.capabilities);
  const capType = toNonEmptyString(capabilities.type);
  if (capType) return capType === "chat";

  // No capabilities.type present — fall back to supported_endpoints shape. A
  // chat model exposes /chat/completions, /responses, or /v1/messages.
  const endpoints = Array.isArray(item.supported_endpoints)
    ? (item.supported_endpoints as unknown[])
    : Array.isArray((asRecord(item.capabilities) as RawRecord).supported_endpoints)
      ? ((asRecord(item.capabilities) as RawRecord).supported_endpoints as unknown[])
      : [];
  if (endpoints.length > 0) {
    return endpoints.some((e) => {
      const s = toNonEmptyString(e) || "";
      return (
        s.includes("/chat/completions") || s.includes("/responses") || s.includes("/v1/messages")
      );
    });
  }

  // Neither signal present: keep it unless its id looks like a known non-chat
  // utility (embedding / completion sentinels). This keeps discovery permissive
  // without re-introducing a brittle positive allowlist.
  const id = (toNonEmptyString(item.id) || toNonEmptyString(item.model) || "").toLowerCase();
  if (!id) return false;
  return !(id.includes("embedding") || id === "gpt-41-copilot");
}

/**
 * Parse a Copilot `/models` response into managed chat-model rows. Keeps every
 * entitled CHAT model in the live response (capability-driven filtering) and
 * drops non-chat, hidden, policy-disabled, and explicitly retired rows.
 * Newly entitled models need no allowlist update; announced retirements are
 * excluded even while upstream continues returning them during the transition.
 */
export function parseGitHubCopilotModels(data: unknown): GitHubCopilotModel[] {
  const payload = asRecord(data);
  const items = Array.isArray(payload.data)
    ? (payload.data as unknown[])
    : Array.isArray(payload.models)
      ? (payload.models as unknown[])
      : [];

  const seen = new Set<string>();
  const models: GitHubCopilotModel[] = [];

  for (const value of items) {
    const item = asRecord(value);
    const id = toNonEmptyString(item.id) || toNonEmptyString(item.model);
    if (!id || seen.has(id)) continue;
    if (isRetiredGitHubCopilotModelId("github", id)) continue;
    if (!isRoutableChatModel(item)) continue;
    seen.add(id);
    const name = toNonEmptyString(item.name) || toNonEmptyString(item.display_name) || id;
    models.push({ id, name, owned_by: "github" });
  }

  return models;
}

export type FetchGitHubCopilotModelsOptions = {
  /** Copilot bearer token (copilotToken; falls back to GitHub accessToken upstream). */
  token: string | null | undefined;
  /** Injectable fetch (defaults to global fetch). */
  fetchImpl?: typeof fetch;
  /** Static catalog to fall back to when live discovery is unavailable. */
  fallbackModels?: Array<{ id: string; name?: string }>;
};

export type GitHubCopilotModelsResult = {
  models: GitHubCopilotModel[];
  /** "api" = live discovery; "fallback" = static catalog (offline/unauthed/error). */
  source: "api" | "fallback";
};

function toFallbackResult(
  fallbackModels: Array<{ id: string; name?: string }> | undefined
): GitHubCopilotModelsResult {
  const models = (fallbackModels || [])
    .map((model) => {
      const id = toNonEmptyString(model.id);
      if (!id) return null;
      if (!GITHUB_COPILOT_STATIC_FALLBACK_SET.has(id)) return null;
      return { id, name: toNonEmptyString(model.name) || id, owned_by: "github" };
    })
    .filter((model): model is GitHubCopilotModel => Boolean(model));
  return { models, source: "fallback" };
}

/**
 * Discover the Copilot model catalog live, falling back to the static catalog
 * when no token is available or the upstream request fails.
 */
export async function fetchGitHubCopilotModels(
  options: FetchGitHubCopilotModelsOptions
): Promise<GitHubCopilotModelsResult> {
  const { token, fetchImpl = fetch, fallbackModels } = options;

  if (!toNonEmptyString(token)) {
    return toFallbackResult(fallbackModels);
  }

  try {
    const response = await fetchImpl(GITHUB_COPILOT_MODELS_URL, {
      method: "GET",
      headers: {
        ...getGitHubCopilotChatHeaders("application/json"),
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return toFallbackResult(fallbackModels);
    }

    const data = await response.json();
    const models = parseGitHubCopilotModels(data);
    if (models.length === 0) {
      return toFallbackResult(fallbackModels);
    }
    return { models, source: "api" };
  } catch {
    // Network/parse failure — never break the import flow.
    return toFallbackResult(fallbackModels);
  }
}

/**
 * GHE Copilot live model discovery.
 *
 * The GHE token endpoint returns TWO hosts in `endpoints`:
 *   - `endpoints.api`   (copilotApiUrl)   → chat/completions + the real chat
 *      model catalog. Response shape is `{ data: [{ id, name, ... }] }` (same
 *      shape as github.com's api.githubcopilot.com/models).
 *   - `endpoints.proxy` (copilotProxyUrl) → NES / autocomplete / instant-apply
 *      models only. Response shape is `{ models: [{ name, ... }] }`.
 *
 * We discover from the `api` host so the imported catalog is the real chat
 * models (claude-*, gpt-*, gemini-*), not the completion-only proxy set. Unlike
 * github.com, the IDs are enterprise-specific, so NO static allowlist applies —
 * every id in the live response is kept. Both response shapes are parsed so a
 * legacy connection that still points at the proxy host keeps working.
 */
function asGheRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function parseGheCopilotModels(data: unknown): GitHubCopilotModel[] {
  const payload = asGheRecord(data);
  // api host → { data: [{ id }] }; proxy host → { models: [{ name }] }.
  const items = Array.isArray(payload.data)
    ? (payload.data as unknown[])
    : Array.isArray(payload.models)
      ? (payload.models as unknown[])
      : [];

  const seen = new Set<string>();
  const models: GitHubCopilotModel[] = [];

  for (const value of items) {
    const item = asGheRecord(value);
    // api host uses `id`; proxy host uses `name` as the model id.
    const id = toNonEmptyString(item.id) || toNonEmptyString(item.name);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const name =
      toNonEmptyString(item.name) ||
      toNonEmptyString(item.display_name) ||
      toNonEmptyString(item.label) ||
      id;
    models.push({
      id,
      name,
      owned_by: toNonEmptyString(item.vendor || item.provider) || "ghe-copilot",
    });
  }

  return models;
}

export type FetchGheCopilotModelsOptions = {
  /**
   * Copilot API base URL (providerSpecificData.copilotApiUrl, from
   * endpoints.api). This is the host that serves the real chat model catalog.
   */
  apiUrl: string | null | undefined;
  /** Copilot bearer token. */
  token: string | null | undefined;
  /** Injectable fetch (defaults to global fetch). */
  fetchImpl?: typeof fetch;
};

/**
 * Discover the GHE Copilot model catalog live from `<apiUrl>/models`.
 * Returns an empty list (no fallback catalog) when discovery is unavailable —
 * GHE model IDs are enterprise-specific, so a static fallback would be wrong.
 */
export async function fetchGheCopilotModels(
  options: FetchGheCopilotModelsOptions
): Promise<GitHubCopilotModel[]> {
  const { apiUrl, token, fetchImpl = fetch } = options;
  const base = toNonEmptyString(apiUrl);
  if (!base || !toNonEmptyString(token)) return [];

  try {
    const response = await fetchImpl(`${base.replace(/\/+$/, "")}/models`, {
      method: "GET",
      headers: {
        ...getGitHubCopilotChatHeaders("application/json"),
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return parseGheCopilotModels(data);
  } catch {
    return [];
  }
}
