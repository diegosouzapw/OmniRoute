/**
 * Community server federation — connect, sync, and manage servers.
 *
 * @module lib/gamification/servers
 */

import crypto from "crypto";

export interface ServerConnection {
  id: string;
  name: string;
  url: string;
  status: "connected" | "disconnected" | "error";
  lastSyncAt: string | null;
  errorMessage: string | null;
}

/**
 * Connect to a community server.
 */
export async function connectServer(
  name: string,
  url: string,
  apiKey: string
): Promise<ServerConnection> {
  const id = crypto.randomUUID();
  const apiKeyHash = crypto
    .pbkdf2Sync(apiKey, "omniroute-federation-salt", 120000, 32, "sha256")
    .toString("hex");

  const { connectServer: dbConnect } = await import("../db/gamification");
  dbConnect(id, name, url, apiKeyHash);

  return { id, name, url, status: "connected", lastSyncAt: null, errorMessage: null };
}

/**
 * Disconnect from a community server.
 */
export async function disconnectServer(serverId: string): Promise<void> {
  const { disconnectServer: dbDisconnect } = await import("../db/gamification");
  dbDisconnect(serverId);
}

/**
 * List all connected servers.
 */
export async function listServers(): Promise<ServerConnection[]> {
  const { listServers: dbList } = await import("../db/gamification");
  return dbList() as ServerConnection[];
}

/**
 * Sync leaderboard with a community server.
 * Fetches remote scores and merges into local leaderboard.
 */
export async function syncLeaderboard(
  serverId: string
): Promise<{ synced: number; errors: string[] }> {
  const db = (await import("../db/core")).getDbInstance();

  const server = db
    .prepare(
      "SELECT url, api_key_hash FROM community_servers WHERE id = ? AND status = 'connected'"
    )
    .get(serverId) as { url: string; api_key_hash: string } | undefined;

  if (!server) {
    return { synced: 0, errors: ["Server not found or not connected"] };
  }

  try {
    // Fetch remote leaderboard
    const response = await fetch(`${server.url}/api/gamification/federation/leaderboard`, {
      headers: { Authorization: `Bearer ${server.api_key_hash}` },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = (await response.json()) as {
      entries: Array<{ apiKeyId: string; score: number }>;
    };

    // Overwrite local scores with remote scores (not additive)
    const db2 = (await import("../db/core")).getDbInstance();
    for (const entry of data.entries) {
      db2
        .prepare(
          `INSERT INTO leaderboard (api_key_id, scope, score, updated_at)
         VALUES (?, 'global', ?, datetime('now'))
         ON CONFLICT(api_key_id, scope) DO UPDATE SET score = excluded.score, updated_at = excluded.updated_at`
        )
        .run(entry.apiKeyId, entry.score);
    }

    // Update last sync time
    db.prepare(
      "UPDATE community_servers SET last_sync_at = datetime('now'), error_message = NULL WHERE id = ?"
    ).run(serverId);

    return { synced: data.entries.length, errors: [] };
  } catch (err: any) {
    db.prepare("UPDATE community_servers SET status = 'error', error_message = ? WHERE id = ?").run(
      err.message,
      serverId
    );

    return { synced: 0, errors: [err.message] };
  }
}

/**
 * Push local scores to a community server.
 */
export async function pushScore(
  serverId: string,
  apiKeyId: string,
  score: number
): Promise<{ success: boolean; error?: string }> {
  const db = (await import("../db/core")).getDbInstance();

  const server = db
    .prepare(
      "SELECT url, api_key_hash FROM community_servers WHERE id = ? AND status = 'connected'"
    )
    .get(serverId) as { url: string; api_key_hash: string } | undefined;

  if (!server) {
    return { success: false, error: "Server not found or not connected" };
  }

  try {
    const response = await fetch(`${server.url}/api/gamification/federation/score`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${server.api_key_hash}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKeyId, score }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Health check a server connection.
 */
export async function healthCheck(
  serverId: string
): Promise<{ healthy: boolean; latencyMs: number }> {
  const db = (await import("../db/core")).getDbInstance();

  const server = db.prepare("SELECT url FROM community_servers WHERE id = ?").get(serverId) as
    | { url: string }
    | undefined;

  if (!server) return { healthy: false, latencyMs: 0 };

  const start = Date.now();
  try {
    const response = await fetch(`${server.url}/api/gamification/federation/leaderboard`, {
      signal: AbortSignal.timeout(5000),
    });
    return { healthy: response.ok, latencyMs: Date.now() - start };
  } catch {
    return { healthy: false, latencyMs: Date.now() - start };
  }
}
