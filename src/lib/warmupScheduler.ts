import { getProviderConnections } from "@/lib/db/providers";
import { getSettings } from "@/lib/db/settings";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { extractResolvedProxyConfig } from "@/lib/tokenHealthCheck";
import { refreshAndUpdateCredentials } from "@/lib/usage/providerLimits";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch";
import { logger } from "@omniroute/open-sse/utils/logger";
import { matchesCron } from "@/lib/jobs/cronMatch";
import { getCircuitBreakerStore } from "./warmupScheduler/circuitBreakerFactory";
import { TERMINAL_CONNECTION_STATUSES } from "@/lib/quota/connectionRecovery";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import type { WarmupResult, WarmupFailureKind, WarmupTarget } from "./warmupScheduler/core";

export type { WarmupResult, WarmupFailureKind } from "./warmupScheduler/core";

interface WarmupConnection {
  id: string;
  provider?: string;
  authType?: string;
  email?: string | null;
  name?: string | null;
  testStatus?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpiresAt?: string | null;
  providerSpecificData?: unknown;
}

const log = logger("WarmupScheduler");
const WARMUP_MESSAGES = ["hi", "hello", "ping", "ready"];
let messageCounter = 0;

function getWarmupMessage(): string {
  const msg = WARMUP_MESSAGES[messageCounter % WARMUP_MESSAGES.length];
  messageCounter++;
  return msg;
}

declare global {
  var __omnirouteWarmupScheduler: {
    timer: NodeJS.Timeout | null;
    executing: boolean;
    lastFireMinute: number;
  };
}
const STATE = (globalThis.__omnirouteWarmupScheduler ??= {
  timer: null,
  executing: false,
  lastFireMinute: -1,
});

const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

function isEnabled(): boolean {
  const raw = process.env.OMNIROUTE_WARMUP_ENABLED;
  return raw ? TRUE_ENV_VALUES.has(raw.trim().toLowerCase()) : false;
}

function getCron(): string {
  return process.env.OMNIROUTE_WARMUP_CRON || "0 7 * * *";
}

function getConcurrency(): number {
  const raw = process.env.OMNIROUTE_WARMUP_CONCURRENCY;
  const parsed = raw ? parseInt(raw, 10) : NaN;
  return Math.min(10, Math.max(1, Number.isFinite(parsed) ? parsed : 3));
}

function toPacificTime(date: Date): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(date);
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value || "0", 10);
  return new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
}

export function startWarmupScheduler(): NodeJS.Timeout | null {
  if (STATE.timer) return STATE.timer;
  if (!isEnabled()) {
    log.info("disabled (OMNIROUTE_WARMUP_ENABLED not set)");
    return null;
  }
  const cron = getCron();
  log.info("scheduler started", { cron, concurrency: getConcurrency() });
  STATE.timer = setInterval(tick, 60_000);
  STATE.timer.unref();
  tick();
  return STATE.timer;
}

export function stopWarmupScheduler(): void {
  if (STATE.timer) {
    clearInterval(STATE.timer);
    STATE.timer = null;
  }
  STATE.executing = false;
  STATE.lastFireMinute = -1;
}

/** Test-only: reset the globalThis singleton so each test starts fresh. */
export function __resetWarmupState(): void {
  if (STATE.timer) {
    clearInterval(STATE.timer);
  }
  STATE.timer = null;
  STATE.executing = false;
  STATE.lastFireMinute = -1;
}

async function tick(): Promise<void> {
  if (STATE.executing) return;
  const now = new Date();
  const ptNow = toPacificTime(now);
  if (!matchesCron(getCron(), ptNow)) {
    STATE.lastFireMinute = -1;
    return;
  }
  const minuteKey = Math.floor(ptNow.getTime() / 60_000);
  if (minuteKey === STATE.lastFireMinute) return;
  STATE.lastFireMinute = minuteKey;
  STATE.executing = true;
  try {
    await executeWarmup();
  } catch (err) {
    log.error("tick failed", { err });
  } finally {
    STATE.executing = false;
  }
}

async function executeWarmup(): Promise<void> {
  const settings = await getSettings();
  const enabledMap = (settings?.claudeWarmup as Record<string, boolean> | undefined)?.connections;
  const connections = (await getProviderConnections({
    provider: "claude",
    isActive: true,
  })) as unknown as WarmupConnection[];
  const concurrency = getConcurrency();
  const cbStore = await getCircuitBreakerStore();
  const targets: WarmupTarget[] = [];
  const headers = await getWarmupHeaders();

  for (const conn of connections) {
    if (await isConnectionUnavailableToAuxiliaryActivity(conn.id)) continue;
    if (enabledMap?.[conn.id] !== true) {
      log.debug("warmup skip", { connectionId: conn.id, reason: "not opted-in" });
      continue;
    }
    if (classifyForWarmup(conn) !== "subscription") {
      log.debug("warmup skip", { connectionId: conn.id, reason: "not subscription" });
      continue;
    }
    if (conn.testStatus && TERMINAL_CONNECTION_STATUSES.has(conn.testStatus.toLowerCase())) {
      log.debug("warmup skip", {
        connectionId: conn.id,
        reason: "terminal",
        status: conn.testStatus,
      });
      continue;
    }
    if (await cbStore.isInBackoff(conn.id)) {
      log.debug("warmup skip", { connectionId: conn.id, reason: "backoff" });
      continue;
    }
    const cbState = await cbStore.get(conn.id);
    if (cbState?.lastResult === "forbidden") {
      log.debug("warmup skip", { connectionId: conn.id, reason: "forbidden" });
      continue;
    }
    const proxyResolution = await resolveProxyForConnection(conn.id).catch((err) => {
      log.warn("proxy resolution failed, falling back to direct", { connectionId: conn.id, err });
      return null;
    });
    const proxyConfig = (
      proxyResolution ? extractResolvedProxyConfig(proxyResolution) : null
    ) as WarmupTarget["proxyConfig"];
    targets.push({
      connectionId: conn.id,
      label: conn.email || conn.name || conn.id,
      accessToken: conn.accessToken,
      refreshToken: conn.refreshToken,
      tokenExpiresAt: conn.tokenExpiresAt,
      authType: conn.authType,
      providerSpecificData:
        (conn.providerSpecificData as Record<string, unknown> | undefined) ?? undefined,
      baseUrl: "https://api.anthropic.com/v1/messages",
      urlSuffix: "?beta=true",
      headers,
      proxyConfig,
      model: process.env.OMNIROUTE_WARMUP_MODEL || "claude-3-5-haiku-20241022",
    });
  }

  if (targets.length === 0) {
    log.info("no subscription connections to warm up");
    return;
  }

  for (let i = 0; i < targets.length; i += concurrency) {
    const chunk = targets.slice(i, i + concurrency);
    const results = await Promise.allSettled(chunk.map((t) => executeWarmupTarget(t)));
    for (let j = 0; j < chunk.length; j++) {
      const target = chunk[j];
      const settled = results[j];
      const result: WarmupResult =
        settled.status === "fulfilled"
          ? settled.value
          : {
              success: false,
              tokensUsed: 0,
              durationMs: 0,
              failureKind: "unknown",
              error: String(settled.reason),
            };
      try {
        await cbStore.recordResult(target.connectionId, result);
      } catch (err) {
        log.error("persist failed", { err, connectionId: target.connectionId });
      }
    }
  }
}

async function getWarmupHeaders(): Promise<Record<string, string>> {
  const { getClaudeCliHeaders } = await import("@omniroute/open-sse/config/providers/shared");
  return getClaudeCliHeaders();
}

type WarmupPath = "subscription" | "skip";

function classifyForWarmup(conn: {
  provider?: string;
  authType?: string;
  accessToken?: string;
  providerSpecificData?: unknown;
}): WarmupPath {
  if (conn.provider !== "claude") return "skip";
  if (conn.authType === "api_key" || conn.authType === "apikey") return "skip";
  if (conn.authType !== "oauth") return "skip";
  if (!conn.accessToken) return "skip";
  const psd = (conn.providerSpecificData as Record<string, unknown> | undefined | null) || {};
  const orgType = psd.organizationType as string | undefined;
  const subStatus = psd.subscriptionStatus as string | undefined;
  if (["claude_pro", "claude_max", "claude_team", "claude_enterprise"].includes(orgType)) {
    return "subscription";
  }
  if (orgType === "free") return "skip";
  if (subStatus === "active") return "subscription";
  return "skip";
}

async function executeWarmupTarget(target: WarmupTarget): Promise<WarmupResult> {
  const start = Date.now();
  const message = getWarmupMessage();

  const doFetch = async (accessToken: string): Promise<Response> => {
    const fetchFn = () =>
      fetch(`${target.baseUrl}${target.urlSuffix}`, {
        method: "POST",
        headers: {
          ...target.headers,
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: target.model,
          max_tokens: 1,
          messages: [{ role: "user", content: message }],
        }),
        signal: AbortSignal.timeout(10_000),
      });
    return target.proxyConfig ? runWithProxyContext(target.proxyConfig, fetchFn) : fetchFn();
  };

  const cleanupBody = (resp: Response) => {
    resp.body?.cancel?.().catch(() => {});
  };

  try {
    let resp = await doFetch(target.accessToken);
    if (resp.status === 401) {
      const refreshed = await refreshAndUpdateCredentials(
        {
          id: target.connectionId,
          provider: "claude",
          authType: "oauth",
          accessToken: target.accessToken,
          refreshToken: target.refreshToken,
          tokenExpiresAt: target.tokenExpiresAt,
          providerSpecificData: target.providerSpecificData,
        } as any,
        { allowRotatingRefresh: true, force: true }
      ).catch(() => null);
      if (refreshed?.refreshed === true && refreshed.connection?.accessToken) {
        cleanupBody(resp);
        resp = await doFetch(refreshed.connection.accessToken);
        if (resp.ok) {
          const tokensUsed = await extractTokens(resp);
          cleanupBody(resp);
          return {
            success: true,
            tokensUsed,
            durationMs: Date.now() - start,
            retryAttempted: true,
          };
        }
        return classifyResponse(resp, start, true);
      }
      cleanupBody(resp);
      return {
        success: false,
        tokensUsed: 0,
        durationMs: Date.now() - start,
        failureKind: "auth",
        error: "Token expired (401 after retry)",
        retryAttempted: true,
      };
    }
    return classifyResponse(resp, start, false);
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    return {
      success: false,
      tokensUsed: 0,
      durationMs: Date.now() - start,
      failureKind: isTimeout ? "network" : "unknown",
      error: err instanceof Error ? err.message : "Unknown",
    };
  }
}

async function classifyResponse(
  resp: Response,
  start: number,
  retryAttempted: boolean
): Promise<WarmupResult> {
  const cleanup = () => {
    resp.body?.cancel?.().catch(() => {});
  };
  if (resp.ok) {
    const tokensUsed = await extractTokens(resp);
    cleanup();
    return { success: true, tokensUsed, durationMs: Date.now() - start, retryAttempted };
  }
  if (resp.status === 401) {
    cleanup();
    return {
      success: false,
      tokensUsed: 0,
      durationMs: Date.now() - start,
      failureKind: "auth",
      error: "Auth error (401)",
      retryAttempted,
    };
  }
  if (resp.status === 403) {
    cleanup();
    return {
      success: false,
      tokensUsed: 0,
      durationMs: Date.now() - start,
      failureKind: "forbidden",
      error: "Forbidden (403)",
      retryAttempted,
    };
  }
  if (resp.status === 429) {
    const retryAfter = resp.headers.get("retry-after");
    const retryAfterSec = retryAfter ? parseInt(retryAfter, 10) : NaN;
    cleanup();
    return {
      success: false,
      tokensUsed: 0,
      durationMs: Date.now() - start,
      failureKind: "rate_limit",
      error: "Rate limited (429)",
      retryAfterSeconds: Number.isFinite(retryAfterSec) ? retryAfterSec : undefined,
      retryAttempted,
    };
  }
  cleanup();
  return {
    success: false,
    tokensUsed: 0,
    durationMs: Date.now() - start,
    failureKind: "unknown",
    error: `HTTP ${resp.status}`,
    retryAttempted,
  };
}

async function extractTokens(resp: Response): Promise<number> {
  try {
    const body = (await resp.json()) as {
      usage?: { input_tokens?: number; output_tokens?: number };
    };
    return (body?.usage?.input_tokens ?? 0) + (body?.usage?.output_tokens ?? 0);
  } catch {
    return 5;
  }
}
