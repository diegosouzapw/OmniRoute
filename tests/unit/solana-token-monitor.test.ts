import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  filterNewPools,
  formatTokenAlert,
  parseGeckoNewPools,
  parseLiquidityLockEvidence,
  readSolanaMonitorConfig,
  SolanaTokenMonitor,
  type DedupeStore,
  parseRetryAfter,
  isRetryableStatus,
} from "../../scripts/solana/tokenMonitor.ts";

const now = Date.parse("2026-09-21T12:00:00.000Z");

function poolPayload(overrides: Record<string, unknown> = {}) {
  return {
    data: [
      {
        id: "solana_pool-1",
        attributes: {
          name: "New / SOL",
          base_token_address: "Token111",
          base_token_symbol: "NEW",
          base_token_name: "New Token",
          pool_created_at: "2026-09-21T11:45:00.000Z",
          market_cap_usd: "35000",
          reserve_in_usd: "12000",
          dex_id: "raydium",
          ...overrides,
        },
      },
    ],
  };
}

describe("Solana token monitor parsing", () => {
  test("parses validated GeckoTerminal pool fields", () => {
    const [pool] = parseGeckoNewPools(poolPayload());
    assert.equal(pool.tokenAddress, "Token111");
    assert.equal(pool.marketCapUsd, 35000);
    assert.equal(pool.address, "pool-1");
    assert.equal(parseGeckoNewPools({ data: [{ attributes: { fdv_usd: "99999" } }] }).length, 0);
  });

  test("filters by the configurable window and market cap", () => {
    const pools = parseGeckoNewPools(poolPayload());
    assert.equal(filterNewPools(pools, now, { windowMs: 30 * 60_000, minMarketCapUsd: 30_000 }).length, 1);
    assert.equal(
      filterNewPools(pools, now, { windowMs: 10 * 60_000, minMarketCapUsd: 30_000 }).length,
      0
    );
    const below = parseGeckoNewPools(poolPayload({ market_cap_usd: "29999" }));
    assert.equal(filterNewPools(below, now, { windowMs: 30 * 60_000, minMarketCapUsd: 30_000 }).length, 0);
  });

  test("requires explicit lock evidence, not tags or liquidity alone", () => {
    assert.equal(parseLiquidityLockEvidence({ markets: [{ lp: { tags: ["locked"], lpLocked: false } }] }).confirmed, false);
    assert.equal(parseLiquidityLockEvidence({ markets: [{ lp: { lpLocked: true } }] }).confirmed, true);
    assert.equal(parseLiquidityLockEvidence({ markets: [{ lp: { lpLockedPct: 80 } }] }).confirmed, true);
  });

  test("reads safe defaults and never requires the verifier key", () => {
    const config = readSolanaMonitorConfig({});
    assert.equal(config.windowMs, 30 * 60_000);
    assert.equal(config.minMarketCapUsd, 30_000);
    assert.equal(config.rugcheckApiKey, "");
    assert.equal(config.enabled, false);
  });

  test("includes useful links and informational-only warning", () => {
    const pool = parseGeckoNewPools(poolPayload())[0];
    const alert = formatTokenAlert(pool, { confirmed: true, source: "rugcheck", reason: "explicit" });
    assert.match(alert, /dexscreener\.com\/solana\/pool-1/);
    assert.match(alert, /solscan\.io\/token\/Token111/);
    assert.match(alert, /no se ejecutan compras ni ventas/i);
  });

  test("deduplicates a confirmed pool across polls", async () => {
    const config = {
      ...readSolanaMonitorConfig({
        SOLANA_TOKEN_MONITOR_ENABLED: "true",
        SOLANA_TOKEN_MONITOR_TELEGRAM_CHAT_ID: "chat",
      }),
    };
    const responses = [
      new Response(JSON.stringify(poolPayload()), { status: 200 }),
      new Response(JSON.stringify({ markets: [{ lp: { lpLocked: true } }] }), { status: 200 }),
      new Response(JSON.stringify(poolPayload()), { status: 200 }),
      new Response(JSON.stringify({ markets: [{ lp: { lpLocked: true } }] }), { status: 200 }),
    ];
    const alerts: string[] = [];
    const monitor = new SolanaTokenMonitor(
      config,
      async () => responses.shift() as Response,
      () => now,
      async (text) => alerts.push(text),
      async () => undefined,
      { load: async () => ({}), save: async () => undefined }
    );

    assert.equal(await monitor.poll(), 1);
    assert.equal(await monitor.poll(), 0);
    assert.equal(alerts.length, 1);
  });

  test("uses Retry-After for 429 and retries before parsing the response", async () => {
    const config = {
      ...readSolanaMonitorConfig({
        SOLANA_TOKEN_MONITOR_ENABLED: "true",
        SOLANA_TOKEN_MONITOR_TELEGRAM_CHAT_ID: "chat",
        SOLANA_TOKEN_MONITOR_MAX_RETRIES: "1",
        SOLANA_TOKEN_MONITOR_RETRY_BASE_DELAY_MS: "1000",
      }),
    };
    const responses = [
      new Response("busy", { status: 429, headers: { "retry-after": "0" } }),
      new Response(JSON.stringify({ data: [] }), { status: 200 }),
    ];
    const delays: number[] = [];
    const monitor = new SolanaTokenMonitor(
      config,
      async () => responses.shift() as Response,
      () => now,
      async () => undefined,
      async (delay) => delays.push(delay),
      { load: async () => ({}), save: async () => undefined }
    );
    assert.equal(await monitor.poll(), 0);
    assert.deepEqual(delays, [0]);
    assert.equal(isRetryableStatus(429), true);
    assert.equal(parseRetryAfter("2", now), 2000);
    assert.equal(isRetryableStatus(401), false);
  });

  test("does not alert on malformed verifier responses and survives a restart", async () => {
    const entries: Record<string, number> = {};
    const store: DedupeStore = {
      load: async () => ({ ...entries }),
      save: async (next) => Object.assign(entries, next),
    };
    const config = {
      ...readSolanaMonitorConfig({
        SOLANA_TOKEN_MONITOR_ENABLED: "true",
        SOLANA_TOKEN_MONITOR_TELEGRAM_CHAT_ID: "chat",
        SOLANA_TOKEN_MONITOR_MAX_RETRIES: "0",
      }),
    };
    const makeMonitor = (verifier: unknown, alerts: string[]) => {
      const responses = [
        new Response(JSON.stringify(poolPayload()), { status: 200 }),
        new Response(JSON.stringify(verifier), { status: 200 }),
      ];
      return new SolanaTokenMonitor(
        config,
        async () => responses.shift() as Response,
        () => now,
        async (text) => alerts.push(text),
        async () => undefined,
        store
      );
    };
    const firstAlerts: string[] = [];
    assert.equal(await makeMonitor({ tags: ["locked"] }, firstAlerts).poll(), 0);
    assert.equal(firstAlerts.length, 0);

    const secondAlerts: string[] = [];
    assert.equal(
      await makeMonitor({ markets: [{ lp: { lpLocked: true } }] }, secondAlerts).poll(),
      1
    );
    assert.equal(secondAlerts.length, 1);

    const afterRestartAlerts: string[] = [];
    assert.equal(
      await makeMonitor({ markets: [{ lp: { lpLocked: true } }] }, afterRestartAlerts).poll(),
      0
    );
    assert.equal(afterRestartAlerts.length, 0);
  });
});
