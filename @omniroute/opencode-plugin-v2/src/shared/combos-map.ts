import type { Model as ModelV2 } from "@opencode-ai/sdk/v2";
import { type ApiFormatV2, type OmniRouteRawModelEntry, resolveApiBlockV2 } from "./models-map.js";

export interface OmniRouteRawComboMemberRef {
  /** Step kind: "model" references a raw model id; "combo-ref" nests another combo. */
  kind?: "model" | "combo-ref";
  /** Full model id referenced by this step (when kind === "model"). */
  model?: string;
  /** Nested combo name (when kind === "combo-ref"). */
  comboName?: string;
  /** Routing weight inside the combo (0–100, advisory at LCD time). */
  weight?: number;
  /** Step-local label, distinct from the parent combo's display name. */
  label?: string;
}

export interface OmniRouteRawCombo {
  id: string;
  name?: string;
  /** Routing strategy. Surfaced for forward-compat but not consumed by LCD. */
  strategy?: string;
  /** Member step list. Only `kind: "model"` steps participate in LCD. */
  models?: OmniRouteRawComboMemberRef[];
  /** Hidden combos are excluded from the OC model picker. */
  isHidden?: boolean;
  /** When OmniRoute attaches a lifecycle hint we forward it; today it doesn't. */
  release_date?: string;
  /**
   * Server-computed context window for this combo (aggregated from member
   * models using the same logic as /v1/models). When present, the client
   * uses this value directly instead of re-aggregating from member models.
   *
   * Added in 3.9.x — old servers do not send it.
   */
  computed_context_length?: number;
}

/**
 * Fetcher contract for `/api/combos`. Same DI shape as
 * `OmniRouteModelsFetcher` so unit tests can inject a stub instead of
 * monkey-patching global `fetch`.
 */
export type OmniRouteCombosFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteRawCombo[]>;

function trimTrailingSlashes(value: string): string {
  let i = value.length;
  while (i > 0 && value.charCodeAt(i - 1) === 0x2f /* "/" */) i--;
  return i === value.length ? value : value.slice(0, i);
}

/**
 * Default fetcher: `GET <baseURL>/api/combos` with bearer auth +
 * AbortController timeout. Accepts both the `{combos: [...]}` envelope the
 * gateway emits today and a bare-array envelope (defensive — keeps the
 * plugin working if a future OmniRoute build trims the wrapper).
 *
 * Differences from `defaultOmniRouteModelsFetcher`:
 *   - URL is `/api/combos`, NOT `/v1/combos`. The `/v1/...` namespace is the
 *     OpenAI-compatible surface (chat completions, models); combo discovery
 *     lives on the management plane under `/api/...`. We tolerate both
 *     `https://host` and `https://host/v1` baseURL forms by stripping the
 *     trailing `/v1` segment before appending `/api/combos`.
 *   - Combos endpoint requires a management-scoped API key when
 *     `REQUIRE_API_KEY` is enabled. We don't enforce that here; the
 *     gateway returns 401/403 with an actionable error which we propagate.
 *
 * Anything that isn't an object with a string `id` is filtered out silently.
 */
export const defaultOmniRouteCombosFetcher: OmniRouteCombosFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000
) => {
  if (!apiKey) throw new Error("[omniroute-v2] apiKey required to fetch /api/combos");
  if (!baseURL) throw new Error("[omniroute-v2] baseURL required to fetch /api/combos");

  // Strip trailing slashes, then strip a trailing `/v1` so we land on the
  // management plane. Models live under `/v1/models`; combos live under
  // `/api/combos` from the same gateway root.
  const trimmed = trimTrailingSlashes(baseURL);
  const root = trimmed.replace(/\/v\d+$/, "");
  const url = `${root}/api/combos`;

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
      : body && typeof body === "object" && Array.isArray((body as { combos?: unknown }).combos)
        ? ((body as { combos: unknown[] }).combos as unknown[])
        : [];
    const out: OmniRouteRawCombo[] = [];
    for (const r of rawList) {
      if (r && typeof r === "object" && typeof (r as { id?: unknown }).id === "string") {
        out.push(r as OmniRouteRawCombo);
      }
    }
    return out;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Map a raw combo entry → `ModelV2` by computing the lowest-common-denominator
 * (LCD) of its underlying member models. The LCD policy is the only way to
 * surface a single capability vector to OpenCode without lying: if any member
 * lacks a capability, the combo as a whole cannot guarantee it.
 *
 * LCD rules:
 *   - `limit.context` = `min(...members.context_length)`.
 *   - `limit.output` = `min(...members.max_output_tokens)`.
 *   - `limit.input` = `min(...members.max_input_tokens)` ONLY when every
 *     member declares one (ModelV2.limit.input is optional — better to
 *     omit than to fabricate a min over partial data).
 *   - `capabilities.toolcall` / `reasoning` / `attachment` / `temperature`:
 *     `every(member ⇒ supports?)`. The `reasoning` axis ORs across
 *     `reasoning` and `thinking` per member before AND-ing across the
 *     combo (mirrors `mapRawModelToModelV2`). The `attachment` axis ORs
 *     across `attachment` and `vision` per member. The `temperature` axis
 *     uses default-true semantics: a member supports temperature unless
 *     it explicitly declares `temperature: false`.
 *   - `capabilities.input.*` / `output.*`: flattened AND across members'
 *     modality flags. Missing arrays default to `["text"]` (same default
 *     as `mapRawModelToModelV2`).
 *
 * Defensive: empty members array → ALL capabilities `false`, limits zero.
 * That's an intentional safety posture (you can't route through an empty
 * combo, so OC should grey it out in the picker).
 *
 * Spec mapping: `cost` zeroed; `status = "active"`;
 * `release_date = combo.release_date ?? ""`;
 * `api = LCD (all-anthropic else openai-compatible)`;
 * `name = combo.name ?? combo.id`.
 *
 * @param combo Raw `/api/combos` entry.
 * @param members Raw `/v1/models` entries for THIS combo's member ids.
 *                Caller resolves `combo.models[].model` ids; unknown ids
 *                are silently dropped before this call.
 * @param providerId OpenCode provider id (multi-instance aware).
 * @param baseURL Resolved gateway base URL for ModelV2.api.url.
 */
export function mapComboToModelV2(
  combo: OmniRouteRawCombo,
  members: OmniRouteRawModelEntry[],
  providerId: string,
  baseURL: string,
  apiFormat?: ApiFormatV2
): ModelV2 {
  // `every` over an empty array returns true (would lie about an empty
  // combo's capabilities) — short-circuit to all-false when no members.
  const hasMembers = members.length > 0;

  const memberInMods = members.map((m) => new Set(m.input_modalities ?? ["text"]));
  const memberOutMods = members.map((m) => new Set(m.output_modalities ?? ["text"]));

  const modalityAllHave = (sets: Array<Set<string>>, key: string): boolean =>
    hasMembers && sets.every((s) => s.has(key));

  const contextValues = members
    .map((m) => m.context_length)
    .filter((v): v is number => typeof v === "number" && v > 0);
  const outputValues = members
    .map((m) => m.max_output_tokens)
    .filter((v): v is number => typeof v === "number" && v > 0);
  const inputValues = members
    .map((m) => m.max_input_tokens)
    .filter((v): v is number => typeof v === "number" && v > 0);

  const everyDeclaresInput = hasMembers && inputValues.length === members.length;

  const capabilities: ModelV2["capabilities"] = {
    temperature:
      hasMembers && members.every((m) => (m.capabilities?.temperature ?? true) !== false),
    reasoning:
      hasMembers &&
      members.every((m) => Boolean(m.capabilities?.reasoning || m.capabilities?.thinking)),
    attachment:
      hasMembers &&
      members.every((m) => Boolean(m.capabilities?.attachment ?? m.capabilities?.vision ?? false)),
    toolcall: hasMembers && members.every((m) => Boolean(m.capabilities?.tool_calling ?? false)),
    input: {
      text: modalityAllHave(memberInMods, "text"),
      audio: modalityAllHave(memberInMods, "audio"),
      image: modalityAllHave(memberInMods, "image"),
      video: modalityAllHave(memberInMods, "video"),
      pdf: modalityAllHave(memberInMods, "pdf"),
    },
    output: {
      text: modalityAllHave(memberOutMods, "text"),
      audio: modalityAllHave(memberOutMods, "audio"),
      image: modalityAllHave(memberOutMods, "image"),
      video: modalityAllHave(memberOutMods, "video"),
      pdf: modalityAllHave(memberOutMods, "pdf"),
    },
    interleaved: hasMembers && members.every((m) => Boolean(m.capabilities?.thinking)),
  };

  // Combos span multiple providers. Use Anthropic format only when ALL
  // members resolve to Anthropic — otherwise fall back to OpenAI-compat
  // (lowest common denominator that every upstream understands).
  const comboApiBlock = (() => {
    if (!hasMembers) return resolveApiBlockV2(combo.id, baseURL, apiFormat);
    const allAnthropic = members.every(
      (m) => resolveApiBlockV2(m.id, baseURL, apiFormat).id === "anthropic"
    );
    return allAnthropic
      ? resolveApiBlockV2(members[0].id, baseURL, apiFormat)
      : resolveApiBlockV2(combo.id, baseURL, apiFormat);
  })();

  return {
    id: combo.id,
    providerID: providerId,
    api: comboApiBlock,
    name: combo.name && combo.name.trim().length > 0 ? combo.name : combo.id,
    capabilities,
    cost: {
      input: 0,
      output: 0,
      cache: { read: 0, write: 0 },
    },
    limit: {
      context:
        typeof combo.computed_context_length === "number" && combo.computed_context_length > 0
          ? combo.computed_context_length
          : contextValues.length > 0
            ? Math.min(...contextValues)
            : 0,
      ...(everyDeclaresInput ? { input: Math.min(...inputValues) } : {}),
      output: outputValues.length > 0 ? Math.min(...outputValues) : 0,
    },
    status: "active",
    options: {},
    headers: {},
    release_date: combo.release_date ?? "",
  };
}
