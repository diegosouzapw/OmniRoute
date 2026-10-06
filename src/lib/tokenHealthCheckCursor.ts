/**
 * Cursor-specific sweep-glue for the proactive token health check. Cursor has
 * no refresh_token by design — its ~24h import-token is renewed via a
 * cursor-agent nudge + IDE/agent credential re-scrape (see
 * src/lib/cursor/renewal.ts), not a standard OAuth refresh_token exchange.
 *
 * Sibling to tokenHealthCheckCopilot.ts (same injection-to-avoid-circular-
 * import technique — tokenHealthCheck.ts-private helpers passed as params
 * rather than imported) but greenfield: type-checked normally, no
 * @ts-nocheck, and imports updateProviderConnection directly from its
 * owning db/ module (Hard Rule #2).
 */

import { updateProviderConnection } from "@/lib/db/providers";
import {
  renewCursorConnection,
  buildCursorRenewedUpdate,
  runCursorRenewalExclusive,
} from "@/lib/cursor/renewal";
import type { buildRefreshFailureUpdate } from "@/lib/tokenHealthCheck";

export async function checkCursorConnectionIfNeeded(params: {
  conn: any;
  now: string;
  buildRefreshFailureUpdate: typeof buildRefreshFailureUpdate;
  log: (message: string, ...args: any[]) => void;
  logWarn: (message: string, ...args: any[]) => void;
  logError: (message: string, ...args: any[]) => void;
  getConnectionLogLabel: (conn: { name?: string; email?: string; id?: string }) => string;
  logPrefix: string;
  /** Testability seam forwarded verbatim to renewCursorConnection() — mirrors
   * the deps param Task 2 added there, so tests can force a {status:"error"}
   * result without a mock.module() shim. */
  deps?: Parameters<typeof renewCursorConnection>[1];
}): Promise<void> {
  const {
    conn,
    now,
    buildRefreshFailureUpdate,
    log,
    logWarn,
    logError,
    getConnectionLogLabel,
    logPrefix,
    deps,
  } = params;

  await runCursorRenewalExclusive(conn.id, async () => {
    const result = await renewCursorConnection(
      {
        accessToken: conn.accessToken,
        machineId: conn.providerSpecificData?.machineId ?? null,
      },
      deps
    );

    switch (result.status) {
      case "renewed": {
        await updateProviderConnection(conn.id, buildCursorRenewedUpdate(conn, result, now));
        log(
          `${logPrefix} ✓ Cursor session renewed for ${getConnectionLogLabel(conn)} (source: ${result.source})`
        );
        return;
      }
      case "unchanged":
      case "error": {
        const message =
          result.status === "error"
            ? `Cursor session renewal failed: ${result.error}`
            : "Cursor session unchanged — no newer token found on this host.";
        await updateProviderConnection(
          conn.id,
          buildRefreshFailureUpdate(conn, now, {
            errorCode: "cursor_session_stale",
            lastErrorType: "cursor_session_stale",
            lastError: message,
            testStatus: "active",
          })
        );
        const logFn = result.status === "error" ? logError : logWarn;
        logFn(`${logPrefix} ✗ Cursor session stale for ${getConnectionLogLabel(conn)}: ${message}`);
        return;
      }
      default: {
        const _exhaustive: never = result;
        throw new Error(`Unhandled CursorRenewalResult status: ${JSON.stringify(_exhaustive)}`);
      }
    }
  });
}
