import type { Model as ModelV2 } from "@opencode-ai/sdk/v2";
import type { ApiFormatV2 } from "./models-map.js";
import { resolveApiBlockV2 } from "./models-map.js";
import { autoComboModelId, formatAutoComboName, type AutoVariant } from "./naming.js";

export type { AutoVariant };

/**
 * Raw shape of an auto combo entry as returned by OmniRoute's
 * `/api/combos/auto` endpoint. Auto combos are virtual -- they self-manage
 * provider selection via scoring/bandit exploration at runtime.
 *
 * Ported from the v1 plugin (`index.ts:1672-1698`); the shape is unchanged
 * so old and new gateways stay wire-compatible.
 */
export interface OmniRouteRawAutoCombo {
  /** Stable id (e.g. "auto", "auto/coding"). */
  id: string;
  /** Human-readable name (e.g. "Auto", "Auto Coding"). */
  name?: string;
  /** Variant key or undefined for the default auto. */
  variant?: AutoVariant;
  /** Provider names eligible for this auto combo. */
  candidatePool?: string[];
  /** Number of candidates resolved at fetch time. */
  candidateCount?: number;
  /** MAX of candidates' context windows, served by newer gateway builds.
   * Absent on older servers -- the mapper falls back to a safe default. */
  context_length?: number;
  /** MAX of candidates' max output tokens (same provenance as context_length). */
  max_output_tokens?: number;
  /** Whether this auto combo should be hidden from the picker. */
  isHidden?: boolean;
  /** Auto-combo configuration. */
  config?: {
    auto?: {
      candidatePool?: string[];
      explorationRate?: number;
      routerStrategy?: string;
    };
  };
}

/** Minimal warn sink so the fetcher never depends on the plugin logger. */
export interface AutoCombosWarnSink {
  warn: (message: string, ...args: unknown[]) => void;
}

/**
 * Fetcher contract for `/api/combos/auto`. Returns the list of virtual
 * auto combos the server can create. Same DI shape as the other fetchers
 * so unit tests can inject a stub instead of monkey-patching `fetch`.
 *
 * HTTP refusals (non-2xx other than 404) and network errors THROW: the caller
 * distinguishes "the gateway failed" (keep last-known) from "the gateway
 * answered empty" (publish empty). Only 404 stays soft — the endpoint does
 * not exist yet on older gateways, and that is an answer, not a failure.
 */
export type OmniRouteAutoCombosFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number,
  logger?: AutoCombosWarnSink,
  onSourceError?: (endpoint: string, reason: string) => void
) => Promise<OmniRouteRawAutoCombo[]>;

function trimTrailingSlashes(value: string): string {
  let i = value.length;
  while (i > 0 && value.charCodeAt(i - 1) === 0x2f /* "/" */) i--;
  return i === value.length ? value : value.slice(0, i);
}

function fallbackWarn(message: string, ...args: unknown[]): void {
  console.warn(`[omniroute-plugin] [WARN] ${message}`, ...args);
}

/**
 * Default auto combos fetcher: `GET <baseURL>/api/combos/auto`.
 *
 * 404 stays soft (endpoint not deployed yet on older gateways — an answer,
 * not a failure). Any other non-2xx or network error THROWS so the caller
 * keeps last-known instead of publishing an empty tier: a 403 behind a
 * management-token gate must not wipe the auto combos the picker had.
 * v1 parity keeps the 5s timeout budget.
 */
export const defaultOmniRouteAutoCombosFetcher: OmniRouteAutoCombosFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 5_000,
  logger?: AutoCombosWarnSink,
  onSourceError?: (endpoint: string, reason: string) => void
) => {
  if (!apiKey || !baseURL) return [];
  const warn = logger?.warn ?? fallbackWarn;
  const report = (reason: string): void => {
    warn(reason);
    onSourceError?.("/api/combos/auto", reason);
  };

  const trimmed = trimTrailingSlashes(baseURL);
  const root = trimmed.replace(/\/v\d+$/, "");
  const url = `${root}/api/combos/auto`;

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
    // 404 = endpoint not deployed yet -- expected during rollout
    if (res.status === 404) {
      warn(`/api/combos/auto not available (404) -- auto combos disabled`);
      return [];
    }
    if (!res.ok) {
      const reason = `HTTP ${res.status} ${res.statusText}`;
      report(`/api/combos/auto refused (${reason}) -- keeping last-known auto combos`);
      throw new Error(reason);
    }
    const body = (await res.json()) as unknown;
    const rawList: unknown[] = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { combos?: unknown }).combos)
        ? ((body as { combos: unknown[] }).combos as unknown[])
        : [];
    const out: OmniRouteRawAutoCombo[] = [];
    for (const r of rawList) {
      if (r && typeof r === "object" && typeof (r as { id?: unknown }).id === "string") {
        out.push(r as OmniRouteRawAutoCombo);
      }
    }
    return out;
  } catch (err) {
    // Network error, timeout, abort -- keep last-known, never publish empty.
    // (The 404-soft path above returns directly and never reaches this throw.)
    const reason = `/api/combos/auto fetch failed: ${err instanceof Error ? err.message : String(err)} -- keeping last-known auto combos`;
    report(reason);
    throw err instanceof Error ? err : new Error(String(err));
  } finally {
    clearTimeout(timer);
  }
};

/** Fallbacks when the server does not advertise auto-combo limits (older
 * gateway builds). MUST be positive: OpenCode's overflow guard treats
 * `limit.context === 0` as "never overflow" and silently DISABLES smart
 * auto-compaction, letting the session grow until the gateway's destructive
 * history purge kicks in. */
export const AUTO_COMBO_FALLBACK_CONTEXT = 128_000;
export const AUTO_COMBO_FALLBACK_OUTPUT = 8_192;

/**
 * Convert a raw auto combo into a `ModelV2` entry for the picker.
 * Auto combos route to capable models, so tool_call and reasoning default
 * to true. Context/output limits come from the server (MAX of the
 * candidate pool's windows); a safe positive fallback applies when the
 * server omits them. Never 0.
 */
export function mapAutoComboToModelV2(
  autoCombo: OmniRouteRawAutoCombo,
  providerId: string,
  baseURL: string,
  apiFormat?: ApiFormatV2
): ModelV2 {
  const name = formatAutoComboName(autoCombo.variant, autoCombo.candidateCount);
  const context =
    typeof autoCombo.context_length === "number" && autoCombo.context_length > 0
      ? autoCombo.context_length
      : AUTO_COMBO_FALLBACK_CONTEXT;
  const output =
    typeof autoCombo.max_output_tokens === "number" && autoCombo.max_output_tokens > 0
      ? autoCombo.max_output_tokens
      : AUTO_COMBO_FALLBACK_OUTPUT;
  return {
    id: autoComboModelId(autoCombo.variant),
    providerID: providerId,
    api: resolveApiBlockV2(autoComboModelId(autoCombo.variant), baseURL, apiFormat),
    name,
    capabilities: {
      temperature: true,
      reasoning: true,
      attachment: false,
      toolcall: true,
      input: {
        text: true,
        audio: false,
        image: false,
        video: false,
        pdf: false,
      },
      output: {
        text: true,
        audio: false,
        image: false,
        video: false,
        pdf: false,
      },
      interleaved: false,
    },
    cost: {
      input: 0,
      output: 0,
      cache: { read: 0, write: 0 },
    },
    limit: {
      context,
      output,
    },
    status: "active",
    options: {},
    headers: {},
    release_date: "",
  };
}
