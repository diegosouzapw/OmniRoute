import { isKimiTokenExpiringSoon } from "@omniroute/open-sse/utils/kimiJwt.ts";
import { exchangeKimiRefreshToken } from "@/lib/kimi/tokenRefresh";
import { updateProviderConnection } from "@/lib/db/providers";

/**
 * Refresh window, spread over [60, 240) seconds before expiry so a fleet of
 * connections does not stampede the token endpoint at the same instant.
 *
 * Kept as a named export rather than inline: it is the only nondeterminism in this
 * path, and a caller that needs a decision it can predict — a test — has to be able
 * to replace it. `tests/unit/token-health-check-kimi.test.ts` used a token expiring
 * in 90 s and asserted a refresh, which is a coin the draw loses 1 in 6 times
 * (a refresh needs `jitter >= 90`, i.e. 150 of the 180 possible values). It failed
 * that way on the Node 26 nightly and was triaged as a Node-compat break.
 */
export function defaultKimiRefreshJitterSec(): number {
  return 60 + Math.floor(Math.random() * 180);
}

export async function checkKimiWebConnectionIfNeeded(params: {
  conn: any;
  now: string;
  log: (msg: string, ...args: any[]) => void;
  logWarn: (msg: string, ...args: any[]) => void;
  logError: (msg: string, ...args: any[]) => void;
  getConnectionLogLabel: (conn: any) => string;
  logPrefix: string;
  exchangeFn?: typeof exchangeKimiRefreshToken;
  persistFn?: typeof updateProviderConnection;
  /**
   * Seconds before expiry at which a refresh is triggered. Defaults to the random
   * spread below; injectable so a caller — a test above all — can decide the window
   * instead of drawing it.
   */
  jitterSecFn?: () => number;
}): Promise<boolean> {
  const { conn, log, logWarn, getConnectionLogLabel, logPrefix } = params;
  const provider = String(conn?.provider || "").toLowerCase();
  if (provider !== "kimi-web" && provider !== "kimi_web") return false;

  const refreshToken = conn.refreshToken || conn.providerSpecificData?.refreshToken;
  if (!refreshToken) return true; // Handled, but cannot refresh without refresh_token

  const token = conn.apiKey || conn.accessToken;
  const jitterSec = (params.jitterSecFn ?? defaultKimiRefreshJitterSec)();
  const expiringSoon = isKimiTokenExpiringSoon(token, jitterSec);

  if (!expiringSoon) return true;

  log(
    `${logPrefix} Kimi Web connection ${getConnectionLogLabel(conn)} token expiring soon; refreshing in background...`
  );

  const exchange = params.exchangeFn || exchangeKimiRefreshToken;
  const persist = params.persistFn || updateProviderConnection;

  const res = await exchange(refreshToken);
  if (res.success && res.accessToken) {
    log(
      `${logPrefix} Kimi Web connection ${getConnectionLogLabel(conn)} token refreshed successfully.`
    );
    await persist(conn.id, {
      apiKey: res.accessToken,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      expiresAt: res.expiresAtSec ? new Date(res.expiresAtSec * 1000).toISOString() : undefined,
      testStatus: "active",
      lastError: null,
      errorCode: null,
    });
  } else {
    logWarn(`${logPrefix} Failed to auto-refresh Kimi Web token: ${res.error}`);
  }

  return true;
}
