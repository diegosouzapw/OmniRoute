import type { Model as ModelV2 } from "@opencode-ai/sdk/v2";
import { normaliseFreeLabel } from "./naming.js";

export interface OmniRouteRawModelEntry {
  id: string;
  object?: string;
  owned_by?: string;
  root?: string | null;
  parent?: string | null;
  context_length?: number;
  max_input_tokens?: number;
  max_output_tokens?: number;
  input_modalities?: string[];
  output_modalities?: string[];
  capabilities?: {
    tool_calling?: boolean;
    reasoning?: boolean;
    vision?: boolean;
    thinking?: boolean;
    attachment?: boolean;
    structured_output?: boolean;
    temperature?: boolean;
    /** Runtime-learned or synced reasoning tiers (server-gated, blind-mapped). */
    effort_tiers?: string[];
  };
  release_date?: string;
  last_updated?: string;
  api_format?: string;
}

/**
 * Fetcher contract: returns the raw `/v1/models` entry list from a running
 * OmniRoute instance. Surfaced as a dependency so unit tests can inject a
 * stub without monkey-patching global `fetch`.
 *
 * Why we inline this instead of using `@omniroute/opencode-provider`'s
 * `fetchLiveModels`: the sibling helper returns a stripped `{id, name,
 * contextLength?}` shape that drops the `capabilities` / `*_modalities` /
 * `max_*_tokens` blocks the mapping needs for ModelV2 pass-through.
 */
export type OmniRouteModelsFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteRawModelEntry[]>;

/**
 * Default fetcher: `GET <baseURL>/v1/models` with bearer auth + AbortController
 * timeout. Accepts both the `{object:"list", data:[…]}` envelope OmniRoute
 * emits today and a bare-array envelope (defensive — keeps the plugin
 * working if a future OmniRoute build trims the wrapper). Anything that
 * isn't an object with a string `id` is filtered out silently.
 */
export const defaultOmniRouteModelsFetcher: OmniRouteModelsFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000
) => {
  if (!apiKey) throw new Error("[omniroute-v2] apiKey required to fetch /v1/models");
  if (!baseURL) throw new Error("[omniroute-v2] baseURL required to fetch /v1/models");

  const trimmed = trimTrailingSlashes(baseURL);
  // Tolerate both `https://host` and `https://host/v1` forms — the gateway
  // exposes /v1/models either way; we just don't want a double `/v1/v1`.
  const url = /\/v\d+$/.test(trimmed) ? `${trimmed}/models` : `${trimmed}/v1/models`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`[omniroute-v2] GET ${url} failed: ${res.status} ${res.statusText}`);
    }
    const body = (await res.json()) as unknown;
    const rawList: unknown[] = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { data?: unknown }).data)
        ? ((body as { data: unknown[] }).data as unknown[])
        : [];
    const out: OmniRouteRawModelEntry[] = [];
    for (const r of rawList) {
      if (r && typeof r === "object" && typeof (r as { id?: unknown }).id === "string") {
        out.push(r as OmniRouteRawModelEntry);
      }
    }
    return out;
  } finally {
    clearTimeout(timer);
  }
};

// Manual trim helpers avoid polynomial-regex CodeQL warnings on
// user-supplied baseURL strings (string.replace(/\/+$/, "")). The same
// behaviour, no backtracking.
function trimTrailingSlashes(value: string): string {
  let i = value.length;
  while (i > 0 && value.charCodeAt(i - 1) === 0x2f /* "/" */) i--;
  return i === value.length ? value : value.slice(0, i);
}

/**
 * Ensure a baseURL ends with `/v1` so the OpenAI-compat SDK constructs
 * `/v1/chat/completions` correctly. The Anthropic SDK does NOT want `/v1`
 * (it appends `/v1/messages` automatically), so callers should branch on
 * format first.
 */
export function ensureV1Suffix(url: string): string {
  const trimmed = trimTrailingSlashes(url);
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

export interface ApiFormatV2 {
  allowAnthropic?: boolean;
  anthropicModels?: string[];
  /**
   * Deprecated v1 prefix list (default v1:
   * `cc,claude,anthropic,kiro,kr`). Accepted for backward compatibility:
   * prefix OR allowlist routes to anthropic, with a one-time deprecation
   * warning pointing at `anthropicModels`. Prefer full IDs.
   */
  anthropicPrefixes?: string[];
}

/** Default v1 prefix list, kept so copied v1 configs keep routing. */
export const DEFAULT_ANTHROPIC_PREFIXES_V1 = ["cc", "claude", "anthropic", "kiro", "kr"];

const warnedPrefixLists = new Set<string>();

function warnDeprecatedPrefixesOnce(prefixes: string[]): void {
  const key = [...prefixes].sort().join(",");
  if (warnedPrefixLists.has(key)) return;
  warnedPrefixLists.add(key);
  console.warn(
    "[omniroute-plugin] [WARN] apiFormat.anthropicPrefixes is deprecated; convert to anthropicModels (full IDs)"
  );
}

/**
 * The Anthropic SDK block appends `/v1/messages` itself, so it needs the
 * gateway root. A config carrying the `/v1` the OpenAI-compatible block wants
 * would otherwise produce `/v1/v1/messages`.
 */
function stripV1Suffix(baseURL: string): string {
  return baseURL.replace(/\/v1\/?$/, "");
}

/**
 * Resolve the API block (id + url + npm package) for a given model id.
 *
 * v2 rule: a model routes to the Anthropic SDK block when
 * `apiFormat.allowAnthropic === true` AND (its FULL id is allowlisted in
 * `apiFormat.anthropicModels` OR its prefix is listed in the deprecated
 * `apiFormat.anthropicPrefixes`, defaulting to the v1 list when prefixes
 * are absent). The deprecated path warns once per prefix list. With
 * neither allowlist nor prefix match, the model stays openai-compatible.
 */
export function resolveApiBlockV2(
  modelId: string,
  baseURL: string,
  apiFormat?: ApiFormatV2
): { id: string; url: string; npm: string } {
  if (apiFormat?.allowAnthropic === true) {
    if ((apiFormat.anthropicModels ?? []).includes(modelId)) {
      return {
        id: "anthropic",
        url: stripV1Suffix(trimTrailingSlashes(baseURL)),
        npm: "@ai-sdk/anthropic",
      };
    }
    const prefixes = apiFormat.anthropicPrefixes ?? DEFAULT_ANTHROPIC_PREFIXES_V1;
    if (apiFormat.anthropicPrefixes !== undefined) warnDeprecatedPrefixesOnce(prefixes);
    const slash = modelId.indexOf("/");
    const prefix = slash === -1 ? modelId : modelId.slice(0, slash);
    if (prefixes.includes(prefix)) {
      return {
        id: "anthropic",
        url: stripV1Suffix(trimTrailingSlashes(baseURL)),
        npm: "@ai-sdk/anthropic",
      };
    }
  }
  return {
    id: "openai-compatible",
    url: ensureV1Suffix(baseURL),
    npm: "@ai-sdk/openai-compatible",
  };
}

/**
 * Map a raw `/v1/models` entry → `ModelV2` (the type @opencode-ai/sdk/v2
 * exports as `Model`, re-exported by @opencode-ai/plugin as `ModelV2`).
 *
 * ModelV2 requires a much richer shape than a flat record. Concretely it
 * expects:
 *   - flat `id`, `name`, `providerID`, `api: {id,url,npm}`
 *   - nested `capabilities: { temperature, reasoning, attachment, toolcall,
 *     input:{text,audio,image,video,pdf}, output:{…}, interleaved }`
 *   - `cost: { input, output, cache:{read,write} }` (NOT optional)
 *   - `limit: { context, input?, output }`
 *   - `status: "alpha"|"beta"|"deprecated"|"active"`, `options:{}`, `headers:{}`
 *   - `release_date: string`
 *
 * Field adaptations:
 *   1. Flat `tool_call` / `reasoning` / `attachment` / `modalities`
 *      top-level fields don't exist in ModelV2 — folded into
 *      `capabilities.{toolcall, reasoning, attachment, input.*, output.*}`.
 *   2. `cost: undefined` is illegal (cost is required). OmniRoute doesn't
 *      surface pricing on /v1/models, so we emit a zeroed cost block.
 *      Downstream opencode reads this for display only — the live pricing
 *      is OmniRoute's responsibility at routing time.
 *   3. `tool_call` → `toolcall` (ModelV2 field name; one word).
 *   4. `attachment` maps from `capabilities.vision` per OmniRoute
 *      convention: vision = ability to receive image attachments. If the
 *      raw entry happens to expose an explicit `capabilities.attachment`,
 *      that wins.
 *   5. `thinking` from OmniRoute has no 1:1 ModelV2 slot. We OR it into
 *      `reasoning` so thinking-only models still surface a non-false
 *      reasoning flag.
 *   6. `last_updated` from OmniRoute has no ModelV2 slot — dropped.
 *      `release_date` lands in ModelV2.release_date with `""` fallback
 *      (the field is required as `string`).
 *   7. `temperature: true` per OmniRoute convention (OpenAI-compat mode
 *      always supports the temperature knob). If a raw entry sets
 *      `capabilities.temperature` explicitly, that wins.
 *   8. Input/output modality arrays: each known modality flips its boolean.
 *      Unknown strings (future OmniRoute additions) are ignored — when the
 *      server adds new modalities we can map them here without breaking
 *      existing entries.
 *   9. `status: "active"` — OmniRoute doesn't tier models alpha/beta on
 *      /v1/models, and opencode needs a non-deprecated status to expose
 *      the model in the picker. If a future entry surfaces an explicit
 *      lifecycle hint we can map it then.
 *  10. `options: {}` and `headers: {}` left empty — they're escape hatches
 *      for opencode users to attach per-model overrides; the provider
 *      plugin must not preempt them.
 *  11. `limit.input` is OPTIONAL on ModelV2 (the `?` modifier). We only
 *      emit it when OmniRoute supplies `max_input_tokens` — keeps the
 *      shape clean for combo entries that only carry context_length.
 */
export function mapRawModelToModelV2(
  raw: OmniRouteRawModelEntry,
  ctx: { providerId: string; baseURL: string; apiFormat?: ApiFormatV2 }
): ModelV2 {
  const caps = raw.capabilities ?? {};
  // effort_tiers loop: server-declared tiers become ModelV2 variants so the
  // UI offers exactly the tiers OmniRoute vouches for (instead of opencode's
  // invented [low, medium, high] fallback). Blind: filtering/exclusion rules
  // live server-side. Absent/empty/malformed => key omitted ENTIRELY (an
  // empty variants object would suppress opencode's fallback for this model).
  const declaredTiers = Array.isArray(caps.effort_tiers)
    ? caps.effort_tiers.filter((t): t is string => typeof t === "string" && t.length > 0)
    : [];
  const variants =
    declaredTiers.length > 0
      ? Object.fromEntries(declaredTiers.map((tier) => [tier, { reasoningEffort: tier }]))
      : undefined;
  const inMods = new Set(raw.input_modalities ?? ["text"]);
  const outMods = new Set(raw.output_modalities ?? ["text"]);

  return {
    // OC's static-catalog reader parses the key on `/` to recover
    // `(providerID, modelID)`. If the raw id is already provider-prefixed
    // (e.g. `cc/claude-opus-4-7` from the `cc` Claude Code alias, or
    // `nvidia/llama-3-70b` from a provider that ships prefixed ids), leave
    // it as-is — double-prefixing breaks OC's lookup. Bare **combo** ids
    // (`owned_by: "combo"`, e.g. `gpt-5.6-sol`) must also stay unprefixed:
    // OpenCode looks up `-m <plugin>/<combo>` as model id `<combo>` under
    // the plugin provider. Other bare ids still prefix with
    // `providerId` so credentials resolve as `(omniroute, model)`.
    id: raw.id.includes("/") || raw.owned_by === "combo" ? raw.id : `${ctx.providerId}/${raw.id}`,
    /**
     * Display name. Falls back to raw.id when no enrichment is available;
     * the caller overlays `/api/pricing/models` data via enrichment when
     * the enrichment feature is enabled.
     */
    name: normaliseFreeLabel(raw.id),
    capabilities: {
      temperature: caps.temperature ?? true,
      reasoning: Boolean(caps.reasoning || caps.thinking),
      attachment: Boolean(caps.attachment ?? caps.vision ?? false),
      toolcall: Boolean(caps.tool_calling ?? false),
      input: {
        text: inMods.has("text"),
        audio: inMods.has("audio"),
        image: inMods.has("image"),
        video: inMods.has("video"),
        pdf: inMods.has("pdf"),
      },
      output: {
        text: outMods.has("text"),
        audio: outMods.has("audio"),
        image: outMods.has("image"),
        video: outMods.has("video"),
        pdf: outMods.has("pdf"),
      },
      interleaved: Boolean(caps.thinking),
    },
    cost: {
      input: 0,
      output: 0,
      cache: { read: 0, write: 0 },
    },
    limit: {
      context: typeof raw.context_length === "number" ? raw.context_length : 0,
      ...(typeof raw.max_input_tokens === "number" ? { input: raw.max_input_tokens } : {}),
      output: typeof raw.max_output_tokens === "number" ? raw.max_output_tokens : 0,
    },
    ...(variants ? { variants } : {}),
    status: "active",
    options: {},
    headers: {},
    release_date: raw.release_date ?? "",
    providerID: ctx.providerId,
    api: resolveApiBlockV2(raw.id, ctx.baseURL, ctx.apiFormat),
  };
}
