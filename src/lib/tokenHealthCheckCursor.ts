/**
 * Cursor-specific sweep-glue for the proactive token health check. Cursor has
 * no refresh_token by design — its ~24h import-token is renewed via a
 * cursor-agent nudge + IDE/agent credential re-scrape (see
 * src/lib/cursor/renewal.ts), not a standard OAuth refresh_token exchange.
 *
 * Sibling to tokenHealthCheckCopilot.ts (same injection-to-avoid-circular-
 * import technique — tokenHealthCheck.ts-private helpers passed as params
 * rather than imported, and updateProviderConnection imported directly from
 * @/lib/localDb) but greenfield: type-checked normally, no @ts-nocheck.
 */

import { updateProviderConnection } from "@/lib/localDb";
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
}): Promise<void> {
  const { conn, now, buildRefreshFailureUpdate, log, logWarn, getConnectionLogLabel, logPrefix } =
    params;

  await runCursorRenewalExclusive(conn.id, async () => {
    const result = await renewCursorConnection({
      accessToken: conn.accessToken,
      machineId: conn.providerSpecificData?.machineId ?? null,
    });

    if (result.status === "renewed") {
      await updateProviderConnection(conn.id, buildCursorRenewedUpdate(conn, result, now));
      log(
        `${logPrefix} ✓ Cursor session renewed for ${getConnectionLogLabel(conn)} (source: ${result.source})`
      );
      return;
    }

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
    logWarn(`${logPrefix} ✗ Cursor session stale for ${getConnectionLogLabel(conn)}: ${message}`);
  });
}
