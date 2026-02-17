/**
 * Token Health API Route — Batch G
 *
 * Exposes aggregate health status of OAuth tokens.
 * Used by TokenHealthBadge in the Header.
 */

import { getProviderConnections } from "@/lib/localDb";

export async function GET() {
  try {
    const connections = await getProviderConnections({ authType: "oauth" });
    const oauthConns = (connections || []).filter((c) => c.isActive && c.refreshToken);

    const total = oauthConns.length;
    const healthy = oauthConns.filter((c) => c.testStatus === "active" || !c.lastError).length;
    const errored = oauthConns.filter(
      (c) => c.testStatus === "error" || c.lastErrorType === "token_refresh_failed"
    ).length;
    const lastCheck = oauthConns.reduce((latest, c) => {
      if (!c.lastHealthCheckAt) return latest;
      return latest && latest > c.lastHealthCheckAt ? latest : c.lastHealthCheckAt;
    }, null);

    return Response.json({
      total,
      healthy,
      errored,
      warning: total - healthy - errored,
      lastCheckAt: lastCheck,
      status: errored > 0 ? "error" : healthy < total ? "warning" : "healthy",
    });
  } catch (err) {
    return Response.json({ error: err.message, status: "unknown" }, { status: 500 });
  }
}
