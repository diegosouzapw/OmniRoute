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
