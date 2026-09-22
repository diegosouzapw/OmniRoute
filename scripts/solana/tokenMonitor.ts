import { sendTelegramMessage } from "../../src/lib/telegram/botApi.ts";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { createServer, type Server } from "node:http";

export interface SolanaPool {
  address: string;
  name: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  createdAt: number;
  marketCapUsd: number;
  liquidityUsd: number;
  dexId: string;
  url: string;
}

export interface LiquidityLockEvidence {
  confirmed: boolean;
  source: string;
  reason: string;
}

export interface SolanaMonitorConfig {
  enabled: boolean;
  windowMs: number;
  minMarketCapUsd: number;
  pollIntervalMs: number;
  geckoApiBase: string;
  rugcheckApiBase: string;
  rugcheckApiKey: string;
  telegramChatId: string;
  requestTimeoutMs: number;
  maxRetries: number;
  retryBaseDelayMs: number;
  retryMaxDelayMs: number;
  dedupePath: string;
}

export interface FetchLike {
  (input: string, init?: RequestInit): Promise<Response>;
}

export interface DedupeStore {
  load(): Promise<Record<string, number>>;
  save(entries: Record<string, number>): Promise<void>;
}

export interface MonitorHealth {
  status: "starting" | "healthy" | "degraded";
  lastSuccessAt: number | null;
  lastErrorAt: number | null;
  lastError: string | null;
}

const DEFAULT_GECKO_API = "https://api.geckoterminal.com/api/v2";
const DEFAULT_RUGCHECK_API = "https://api.rugcheck.xyz/v1";

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function nonNegativeInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function positiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function envPath(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

export function readSolanaMonitorConfig(env: NodeJS.ProcessEnv = process.env): SolanaMonitorConfig {
  const windowMinutes = positiveInteger(env.SOLANA_TOKEN_MONITOR_WINDOW_MINUTES, 30);
  const dataDir = envPath(env.DATA_DIR || env.OMNIROUTE_DATA_DIR, join(homedir(), ".omniroute"));
  return {
    enabled: env.SOLANA_TOKEN_MONITOR_ENABLED === "1" || env.SOLANA_TOKEN_MONITOR_ENABLED === "true",
    windowMs: windowMinutes * 60_000,
    minMarketCapUsd: positiveNumber(env.SOLANA_TOKEN_MONITOR_MIN_MARKET_CAP_USD, 30_000),
    pollIntervalMs: positiveInteger(env.SOLANA_TOKEN_MONITOR_POLL_INTERVAL_MS, 60_000),
    geckoApiBase: (env.SOLANA_TOKEN_MONITOR_GECKO_API_BASE || DEFAULT_GECKO_API).replace(/\/+$/, ""),
    rugcheckApiBase: (env.SOLANA_TOKEN_MONITOR_RUGCHECK_API_BASE || DEFAULT_RUGCHECK_API).replace(
      /\/+$/,
      ""
    ),
    rugcheckApiKey: env.SOLANA_TOKEN_MONITOR_RUGCHECK_API_KEY || "",
    telegramChatId: env.SOLANA_TOKEN_MONITOR_TELEGRAM_CHAT_ID || "",
    requestTimeoutMs: positiveInteger(env.SOLANA_TOKEN_MONITOR_REQUEST_TIMEOUT_MS, 10_000),
    maxRetries: nonNegativeInteger(env.SOLANA_TOKEN_MONITOR_MAX_RETRIES, 3),
    retryBaseDelayMs: positiveInteger(env.SOLANA_TOKEN_MONITOR_RETRY_BASE_DELAY_MS, 500),
    retryMaxDelayMs: positiveInteger(env.SOLANA_TOKEN_MONITOR_RETRY_MAX_DELAY_MS, 10_000),
    dedupePath: envPath(
      env.SOLANA_TOKEN_MONITOR_DEDUPE_PATH,
      join(dataDir, "solana-token-monitor-seen.json")
    ),
  };
}

function finiteNumber(value: unknown): number | null {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function parseGeckoNewPools(payload: unknown): SolanaPool[] {
  if (!payload || typeof payload !== "object" || !Array.isArray((payload as { data?: unknown }).data)) {
    return [];
  }

  const pools: SolanaPool[] = [];
  for (const item of (payload as { data: unknown[] }).data) {
    if (!item || typeof item !== "object") continue;
    const attributes = (item as { attributes?: unknown }).attributes;
    if (!attributes || typeof attributes !== "object") continue;
    const a = attributes as Record<string, unknown>;
    const address = stringValue((item as { id?: unknown }).id)?.split("_").pop() || stringValue(a.address);
    const tokenAddress = stringValue(a.base_token_address);
    const createdAt = Date.parse(stringValue(a.pool_created_at) || "");
    // FDV is not market cap. Do not substitute it when the provider omits the
    // market-cap field, otherwise the threshold would produce false positives.
    const marketCapUsd = finiteNumber(a.market_cap_usd);
    const liquidityUsd = finiteNumber(a.reserve_in_usd);
    const name = stringValue(a.name);
    const url = stringValue(a.pool_created_at) && address
      ? `https://www.geckoterminal.com/solana/pools/${address}`
      : null;
    if (
      !address ||
      !tokenAddress ||
      !name ||
      !Number.isFinite(createdAt) ||
      marketCapUsd === null ||
      liquidityUsd === null ||
      !url
    ) {
      continue;
    }
    pools.push({
      address,
      name,
      tokenAddress,
      tokenSymbol: stringValue(a.base_token_symbol) || "unknown",
      tokenName: stringValue(a.base_token_name) || name,
      createdAt,
      marketCapUsd,
      liquidityUsd,
      dexId: stringValue(a.dex_id) || "unknown",
      url,
    });
  }
  return pools;
}

/**
 * Only fields that explicitly describe a lock are accepted. Tags, risk labels,
 * pool age, and a non-zero liquidity balance are intentionally insufficient.
 */
export function parseLiquidityLockEvidence(
  payload: unknown,
  source = "rugcheck"
): LiquidityLockEvidence {
  if (!payload || typeof payload !== "object") {
    return { confirmed: false, source, reason: "invalid verifier response" };
  }
  const markets = (payload as { markets?: unknown }).markets;
  if (!Array.isArray(markets)) {
    return { confirmed: false, source, reason: "verifier did not return markets" };
  }
  for (const market of markets) {
    if (!market || typeof market !== "object") continue;
    const lp = (market as { lp?: unknown }).lp;
    if (!lp || typeof lp !== "object") continue;
    const lock = lp as Record<string, unknown>;
    if (lock.lpLocked === true || lock.locked === true) {
      return { confirmed: true, source, reason: "explicit locked=true evidence" };
    }
    const percentage = finiteNumber(lock.lpLockedPct) ?? finiteNumber(lock.lockedPercentage);
    if (percentage !== null && percentage > 0) {
      return { confirmed: true, source, reason: "explicit positive locked percentage" };
    }
  }
  return { confirmed: false, source, reason: "no explicit liquidity-lock evidence" };
}

export function parseRetryAfter(value: string | null, nowMs = Date.now()): number | null {
  if (!value) return null;
  const seconds = Number(value.trim());
  if (Number.isFinite(seconds) && seconds >= 0) return Math.ceil(seconds * 1000);
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? Math.max(0, timestamp - nowMs) : null;
}

export function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

export class JsonFileDedupeStore implements DedupeStore {
  constructor(private readonly path: string) {}

  async load(): Promise<Record<string, number>> {
    try {
      const parsed: unknown = JSON.parse(await readFile(this.path, "utf8"));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
      return Object.fromEntries(
        Object.entries(parsed).filter(
          ([key, value]) => typeof key === "string" && typeof value === "number" && Number.isFinite(value)
        )
      ) as Record<string, number>;
    } catch (error: unknown) {
      const code = error && typeof error === "object" && "code" in error
        ? (error as { code?: unknown }).code
        : undefined;
      if (code === "ENOENT") return {};
      throw error;
    }
  }

  async save(entries: Record<string, number>): Promise<void> {
    await mkdir(dirname(this.path), { recursive: true });
    const temporary = `${this.path}.${process.pid}.tmp`;
    await writeFile(temporary, JSON.stringify(entries), { encoding: "utf8", mode: 0o600 });
    await rename(temporary, this.path);
  }
}

export function filterNewPools(
  pools: SolanaPool[],
  nowMs: number,
  config: Pick<SolanaMonitorConfig, "windowMs" | "minMarketCapUsd">
): SolanaPool[] {
  return pools.filter(
    (pool) =>
      pool.createdAt > nowMs - config.windowMs &&
      pool.createdAt <= nowMs &&
      pool.marketCapUsd >= config.minMarketCapUsd
  );
}

export function formatTokenAlert(pool: SolanaPool, evidence: LiquidityLockEvidence): string {
  return [
    "🟢 Nuevo par Solana elegible",
    `${pool.tokenName} (${pool.tokenSymbol})`,
    `Market cap: $${pool.marketCapUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    `Liquidez: $${pool.liquidityUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    `DEX: ${pool.dexId}`,
    `Liquidity locked: confirmado (${evidence.source})`,
    `Par: https://dexscreener.com/solana/${pool.address}`,
    `Pool: ${pool.url}`,
    `Token: https://solscan.io/token/${pool.tokenAddress}`,
    "Solo alerta informativa; no se ejecutan compras ni ventas.",
  ].join("\n");
}

export class SolanaTokenMonitor {
  private readonly seen = new Map<string, number>();
  private loaded = false;

  constructor(
    private readonly config: SolanaMonitorConfig,
    private readonly fetcher: FetchLike = fetch,
    private readonly now: () => number = Date.now,
    private readonly alert: (text: string) => Promise<void> = async (text) => {
      if (!config.telegramChatId) throw new Error("SOLANA_TOKEN_MONITOR_TELEGRAM_CHAT_ID is not set");
      await sendTelegramMessage({ chat_id: config.telegramChatId, text, disable_web_page_preview: false });
    },
    private readonly sleep: (delayMs: number) => Promise<void> = (delayMs) =>
      new Promise((resolve) => setTimeout(resolve, delayMs)),
    private readonly dedupeStore: DedupeStore = new JsonFileDedupeStore(config.dedupePath),
  ) {}

  private async getJson(url: string, headers: Record<string, string> = {}): Promise<unknown> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt += 1) {
      try {
        const response = await this.fetcher(url, {
          headers: { accept: "application/json", ...headers },
          signal: AbortSignal.timeout(this.config.requestTimeoutMs),
        });
        if (!response.ok) {
          const retryAfter = parseRetryAfter(response.headers.get("retry-after"), this.now());
          if (!isRetryableStatus(response.status) || attempt === this.config.maxRetries) {
            const error = new Error(`Solana monitor request failed: ${response.status}`);
            Object.assign(error, { retryable: false });
            throw error;
          }
          const exponential = Math.min(
            this.config.retryMaxDelayMs,
            this.config.retryBaseDelayMs * 2 ** attempt
          );
          await this.sleep(Math.min(this.config.retryMaxDelayMs, retryAfter ?? exponential));
          continue;
        }
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
          throw new Error("Solana monitor source returned an invalid JSON object");
        }
        return payload;
      } catch (error: unknown) {
        lastError = error;
        if (
          error &&
          typeof error === "object" &&
          (error as { retryable?: unknown }).retryable === false
        ) {
          throw error;
        }
        if (attempt === this.config.maxRetries) throw error;
        await this.sleep(
          Math.min(this.config.retryMaxDelayMs, this.config.retryBaseDelayMs * 2 ** attempt)
        );
      }
    }
    throw lastError instanceof Error ? lastError : new Error("Solana monitor request failed");
  }

  async poll(): Promise<number> {
    if (!this.config.enabled) return 0;
    await this.loadSeen();
    const payload = await this.getJson(`${this.config.geckoApiBase}/networks/solana/new_pools`);
    const candidates = filterNewPools(
      parseGeckoNewPools(payload),
      this.now(),
      this.config
    );
    let emitted = 0;
    for (const pool of candidates) {
      const evidencePayload = await this.getJson(
        `${this.config.rugcheckApiBase}/tokens/${encodeURIComponent(pool.tokenAddress)}/report`,
        this.config.rugcheckApiKey
          ? { authorization: "Bearer " + this.config.rugcheckApiKey }
          : {}
      );
      const evidence = parseLiquidityLockEvidence(evidencePayload);
      if (!evidence.confirmed || this.seen.has(pool.address)) continue;
      this.seen.set(pool.address, this.now());
      await this.alert(formatTokenAlert(pool, evidence));
      await this.persistSeen();
      emitted += 1;
    }
    this.pruneSeen();
    return emitted;
  }

  private async loadSeen(): Promise<void> {
    if (this.loaded) return;
    const entries = await this.dedupeStore.load();
    for (const [key, timestamp] of Object.entries(entries)) this.seen.set(key, timestamp);
    this.loaded = true;
    this.pruneSeen();
  }

  private async persistSeen(): Promise<void> {
    await this.dedupeStore.save(Object.fromEntries(this.seen));
  }

  private pruneSeen(): void {
    const cutoff = this.now() - this.config.windowMs;
    for (const [key, timestamp] of this.seen) {
      if (timestamp < cutoff) this.seen.delete(key);
    }
    while (this.seen.size > 2_000) {
      const oldest = this.seen.keys().next().value;
      if (oldest === undefined) break;
      this.seen.delete(oldest);
    }
  }
}

export function startSolanaHealthServer(
  health: MonitorHealth,
  port = nonNegativeInteger(
    process.env.SOLANA_TOKEN_MONITOR_HEALTH_PORT || process.env.PORT,
    8080
  )
): Server {
  const server = createServer((request, response) => {
    if (request.url !== "/healthz" && request.url !== "/readyz") {
      response.writeHead(404).end();
      return;
    }
    const ready = health.status === "healthy";
    const ok = request.url === "/healthz" ? true : ready;
    response.writeHead(ok ? 200 : 503, { "content-type": "application/json" });
    response.end(JSON.stringify(health));
  });
  server.listen(port, "0.0.0.0");
  return server;
}

export async function runSolanaTokenMonitor(
  config = readSolanaMonitorConfig(),
  monitor = new SolanaTokenMonitor(config)
): Promise<void> {
  if (!config.enabled) {
    console.info("[SolanaTokenMonitor] disabled; set SOLANA_TOKEN_MONITOR_ENABLED=true to enable");
    return;
  }
  if (!config.telegramChatId) {
    throw new Error("SOLANA_TOKEN_MONITOR_TELEGRAM_CHAT_ID is required when the monitor is enabled");
  }
  const health: MonitorHealth = {
    status: "starting",
    lastSuccessAt: null,
    lastErrorAt: null,
    lastError: null,
  };
  const server = startSolanaHealthServer(health);
  const poll = async (): Promise<void> => {
    try {
      await monitor.poll();
      health.status = "healthy";
      health.lastSuccessAt = Date.now();
      health.lastError = null;
    } catch (error: unknown) {
      health.status = "degraded";
      health.lastErrorAt = Date.now();
      health.lastError = error instanceof Error ? error.message : "poll failed";
      throw error;
    }
  };
  let timer: ReturnType<typeof setInterval> | null = null;
  const shutdown = (): void => {
    if (timer) clearInterval(timer);
    server.close();
    process.exitCode = 0;
  };
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
  await poll();
  timer = setInterval(() => {
    poll().catch((error: unknown) => {
      console.error("[SolanaTokenMonitor] poll failed", error);
    });
  }, config.pollIntervalMs);
  timer.unref?.();
}

if (process.argv[1]?.endsWith("tokenMonitor.ts")) {
  runSolanaTokenMonitor().catch((error: unknown) => {
    console.error("[SolanaTokenMonitor] startup failed", error);
    process.exitCode = 1;
  });
}
