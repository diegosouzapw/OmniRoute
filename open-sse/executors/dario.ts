/**
 * Dario Executor — routes requests to a local Dario (@askalf/dario) instance.
 *
 * Dario is a local OpenAI- and Anthropic-compatible proxy that authenticates
 * with the operator's own Claude Pro/Max subscription (Claude Code OAuth) and
 * rebuilds every request into Claude Code's exact wire shape. It plays the same
 * role for the `claude` provider that CLIProxyAPI's "claude-native" deep mode
 * does — an alternative/failover backend for Claude-Code-shaped proxying.
 *
 * Unlike CliproxyapiExecutor this is a deliberately MINIMAL passthrough:
 *   - shape detection (Anthropic Messages vs OpenAI Chat Completions) + endpoint
 *     routing only — the same dual-shape convention CLIProxyAPI uses;
 *   - NO MCP tool-name rewriting, NO Anthropic-extras stripping.
 * Dario is a different, actively-maintained project explicitly built to track
 * Anthropic's wire-shape drift itself (live capture off an installed `claude`
 * binary), so the extras-billing-gate workarounds CliproxyapiExecutor carries
 * are Dario's own responsibility, not ours. Add such request-mangling here only
 * if live testing proves Dario needs it too — start clean.
 *
 * Activation (parallel to, and independent of, CLIProxyAPI):
 *   1. Per-connection darioMode === "claude-native" in providerSpecificData (UI)
 *   2. Per-provider upstream_proxy_config (mode="dario", or mode="fallback" with
 *      fallbackBackend="dario"). See handlers/chatCore/executorProxy.ts.
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ProviderCredentials,
  type ExecutorLog,
} from "./base.ts";
import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { getProviderPluginManifestHeader } from "../config/providerPluginManifestUrl.ts";

const DEFAULT_PORT = 3456;
const DEFAULT_HOST = "127.0.0.1";
const HEALTH_CHECK_TIMEOUT_MS = 5000;

// Cached URL from settings (loaded once, invalidated via clearDarioUrlCache).
let _cachedSettingsUrl: { url: string; ts: number } | null = null;
const URL_CACHE_TTL_MS = 60_000;

export function clearDarioUrlCache() {
  _cachedSettingsUrl = null;
}

// Pre-load settings URL at module init so the sync path has a cache hit.
// Runs once when the executor module is first imported (mirrors cliproxyapi.ts).
(async () => {
  try {
    const { getSettings } = await import("@/lib/db/settings");
    const settings = await getSettings();
    if (typeof settings.dario_url === "string" && settings.dario_url.trim()) {
      _cachedSettingsUrl = { url: settings.dario_url.trim(), ts: Date.now() };
    }
  } catch {
    /* env vars will be used as fallback */
  }
})();

/**
 * Resolve Dario base URL. Priority:
 *   1. Settings table `dario_url` (set via UI)
 *   2. Environment variables DARIO_HOST / DARIO_PORT
 *   3. Defaults (127.0.0.1:3456)
 */
async function resolveDarioBaseUrl(): Promise<string> {
  if (_cachedSettingsUrl && Date.now() - _cachedSettingsUrl.ts < URL_CACHE_TTL_MS) {
    return _cachedSettingsUrl.url;
  }

  try {
    const { getSettings } = await import("@/lib/db/settings");
    const settings = await getSettings();
    if (typeof settings.dario_url === "string" && settings.dario_url.trim()) {
      const url = settings.dario_url.trim();
      _cachedSettingsUrl = { url, ts: Date.now() };
      return url;
    }
  } catch {
    /* fall through to env vars */
  }

  const host = process.env.DARIO_HOST || DEFAULT_HOST;
  const port = parseInt(process.env.DARIO_PORT || String(DEFAULT_PORT), 10);
  const url = `http://${host}:${port}`;
  _cachedSettingsUrl = { url, ts: Date.now() };
  return url;
}

// Sync wrapper for backward compatibility (constructor default, health checks, tests).
function resolveDarioBaseUrlSync(): string {
  if (_cachedSettingsUrl && Date.now() - _cachedSettingsUrl.ts < URL_CACHE_TTL_MS) {
    return _cachedSettingsUrl.url;
  }
  const host = process.env.DARIO_HOST || DEFAULT_HOST;
  const port = parseInt(process.env.DARIO_PORT || String(DEFAULT_PORT), 10);
  return `http://${host}:${port}`;
}

export { resolveDarioBaseUrl };

/**
 * Check if a connection has Dario deep mode enabled via UI toggle.
 * Mirrors isCliproxyapiDeepModeEnabled but keys off a SEPARATE field
 * (`darioMode`) so a connection can opt into Dario or CLIProxyAPI independently.
 * Used by chatCore's resolveExecutorWithProxy to decide routing.
 */
export function isDarioDeepModeEnabled(
  providerSpecificData?: Record<string, unknown> | null
): boolean {
  return providerSpecificData?.darioMode === "claude-native";
}

export class DarioExecutor extends BaseExecutor {
  private readonly upstreamBaseUrl: string;

  constructor(baseUrl?: string) {
    const effectiveBase = baseUrl ?? resolveDarioBaseUrlSync();
    super("dario", {
      id: "dario",
      baseUrl: effectiveBase + "/v1/chat/completions",
      headers: { "Content-Type": "application/json" },
    });
    this.upstreamBaseUrl = effectiveBase;
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    _credentials: ProviderCredentials | null = null
  ): string {
    // Default endpoint when called without body context (kept for back-compat).
    // execute() picks the right endpoint from the body shape; see selectEndpoint().
    return `${this.upstreamBaseUrl}/v1/chat/completions`;
  }

  /**
   * Returns true when the body matches the Anthropic Messages wire shape.
   * Same detection heuristics as CliproxyapiExecutor.isAnthropicShape: an
   * Anthropic-source client (`/v1/messages`, anthropic-version header, claude/*
   * model) is not openai-translated by chatCore, so the executor sees the
   * original Anthropic body. Dario exposes both `/v1/messages` (Anthropic SSE)
   * and `/v1/chat/completions` (OpenAI SSE) on the same port with the shape
   * auto-detected — route to the matching one so Anthropic-SDK clients get
   * proper `event: message_start` / `content_block_delta` frames.
   */
  private isAnthropicShape(body: unknown): boolean {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;
    // Top-level `system` is unique to the Anthropic Messages API.
    if (b.system !== undefined) return true;
    // Top-level `thinking` is Anthropic-only (OpenAI uses reasoning*).
    if (b.thinking !== undefined) return true;
    // metadata.user_id is the CC wire-image identifier; OpenAI bodies lack it.
    if (
      b.metadata &&
      typeof b.metadata === "object" &&
      (b.metadata as Record<string, unknown>).user_id !== undefined
    )
      return true;
    // messages[0].content as an array of Anthropic content blocks.
    const msgs = b.messages;
    if (Array.isArray(msgs) && msgs.length > 0) {
      const first = msgs[0] as Record<string, unknown>;
      if (Array.isArray(first?.content)) return true;
    }
    return false;
  }

  private selectEndpoint(body: unknown): string {
    return this.isAnthropicShape(body) ? "/v1/messages" : "/v1/chat/completions";
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true): Record<string, string> {
    // On loopback-only LLM routes Dario does not require a real bearer token
    // (its proxy-key auth is mandatory only when binding non-loopback). We still
    // forward whatever key is on the credentials if present — harmless — and
    // default to the documented "dario" placeholder so an Authorization header
    // is always present.
    const key = credentials?.apiKey || credentials?.accessToken || "dario";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...getProviderPluginManifestHeader(),
    };

    headers["Authorization"] = `Bearer ${key}`;
    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    _credentials: ProviderCredentials | null
  ): unknown {
    // Minimal passthrough: only ensure the model field matches the routed model.
    // Dario handles Claude-Code wire-shape reconstruction itself.
    if (!body || typeof body !== "object") return body;
    const transformed = { ...(body as Record<string, unknown>) };
    if (transformed.model !== model) {
      transformed.model = model;
    }
    return transformed;
  }

  async execute(input: {
    model: string;
    body: unknown;
    stream: boolean;
    credentials: ProviderCredentials;
    signal?: AbortSignal | null;
    log?: ExecutorLog | null;
    upstreamExtraHeaders?: Record<string, string> | null;
  }) {
    // Resolve URL dynamically so settings table dario_url is respected.
    // Uses 60s cache to avoid DB reads on every request.
    const baseUrl = await resolveDarioBaseUrl();
    const endpoint = this.selectEndpoint(input.body);
    const url = `${baseUrl}${endpoint}`;
    const shape = endpoint === "/v1/messages" ? "anthropic" : "openai";
    const headers = this.buildHeaders(input.credentials, input.stream);
    const transformedBody = this.transformRequest(
      input.model,
      input.body,
      input.stream,
      input.credentials
    );
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders);

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;

    input.log?.info?.("DARIO", `Dario → ${url} (model: ${input.model}, shape: ${shape})`);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: combinedSignal,
    });

    if (response.status === HTTP_STATUS.RATE_LIMITED) {
      input.log?.warn?.("DARIO", `Dario rate limited: ${response.status}`);
    }

    return { response, url, headers, transformedBody };
  }

  /**
   * Health check — verifies Dario is reachable.
   *
   * Dario's `/health` returns 200 {status:"ok"} once ≥1 healthy account exists
   * and 503 {status:"degraded"} while zero accounts are configured (or all are
   * in auth-cooldown). We treat this as a plain `res.ok` check: 503-while-empty
   * is semantically correct ("reachable but not yet useful"), so the dashboard
   * shows running+degraded until the operator completes the Claude OAuth login.
   */
  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      const baseUrl = await resolveDarioBaseUrl();
      const res = await fetch(`${baseUrl}/health`, {
        signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
      });
      return {
        ok: res.ok,
        latencyMs: Date.now() - start,
        ...(!res.ok ? { error: `HTTP ${res.status}` } : {}),
      };
    } catch (err) {
      return {
        ok: false,
        latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
}

export default DarioExecutor;
