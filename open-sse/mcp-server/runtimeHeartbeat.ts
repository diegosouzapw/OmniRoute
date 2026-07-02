/**
 * MCP Runtime Heartbeat
 *
 * Persists MCP stdio process liveness into DATA_DIR/runtime/mcp-heartbeat.json
 * so dashboard APIs can report real online/offline state.
 */

import { promises as fs } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export type McpHeartbeatSnapshot = {
  pid: number;
  startedAt: string;
  lastHeartbeatAt: string;
  version: string;
  transport: "stdio";
  scopesEnforced: boolean;
  allowedScopes: string[];
  toolCount: number;
};

const HEARTBEAT_FILE = "mcp-heartbeat.json";
const RUNTIME_DIR = "runtime";
const DEFAULT_INTERVAL_MS = 5000;

function resolveDataDir(): string {
  const configured = process.env.DATA_DIR;
  if (typeof configured === "string" && configured.trim().length > 0) {
    return configured.trim();
  }
  return join(homedir(), ".omniroute");
}

export function resolveMcpHeartbeatPath(): string {
  return join(resolveDataDir(), RUNTIME_DIR, HEARTBEAT_FILE);
}

async function writeHeartbeat(snapshot: McpHeartbeatSnapshot): Promise<void> {
  const heartbeatPath = resolveMcpHeartbeatPath();
  const runtimeDir = join(resolveDataDir(), RUNTIME_DIR);
  await fs.mkdir(runtimeDir, { recursive: true });
  await fs.writeFile(heartbeatPath, JSON.stringify(snapshot, null, 2), "utf-8");
}

export function startMcpHeartbeat(config: {
  version: string;
  scopesEnforced: boolean;
  allowedScopes: string[];
  toolCount: number;
  intervalMs?: number;
}): () => void {
  const startedAt = new Date().toISOString();
  let timer: ReturnType<typeof setInterval> | null = null;
  let stopped = false;
  const intervalMs =
    typeof config.intervalMs === "number" && config.intervalMs > 0
      ? config.intervalMs
      : DEFAULT_INTERVAL_MS;

  const tick = async () => {
    if (stopped) return;
    const snapshot: McpHeartbeatSnapshot = {
      pid: process.pid,
      startedAt,
      lastHeartbeatAt: new Date().toISOString(),
      version: config.version,
      transport: "stdio",
      scopesEnforced: config.scopesEnforced,
      allowedScopes: [...config.allowedScopes],
      toolCount: config.toolCount,
    };

    try {
      await writeHeartbeat(snapshot);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("[MCP Heartbeat] Failed to write heartbeat:", message);
    }
  };

  void tick();
  timer = setInterval(() => {
    void tick();
  }, intervalMs);

  return () => {
    if (stopped) return;
    stopped = true;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    // Keep last snapshot on disk for post-mortem/offline reporting.
    void tick();
  };
}

export async function readMcpHeartbeat(): Promise<McpHeartbeatSnapshot | null> {
  const heartbeatPath = resolveMcpHeartbeatPath();
  try {
    const raw = await fs.readFile(heartbeatPath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<McpHeartbeatSnapshot>;
    if (!parsed || typeof parsed !== "object") return null;

    if (
      typeof parsed.pid !== "number" ||
      typeof parsed.startedAt !== "string" ||
      typeof parsed.lastHeartbeatAt !== "string" ||
      typeof parsed.version !== "string" ||
      parsed.transport !== "stdio" ||
      typeof parsed.scopesEnforced !== "boolean" ||
      !Array.isArray(parsed.allowedScopes) ||
      typeof parsed.toolCount !== "number"
    ) {
      return null;
    }

    const allowedScopes = parsed.allowedScopes.filter((scope): scope is string => {
      return typeof scope === "string";
    });

    return {
      pid: parsed.pid,
      startedAt: parsed.startedAt,
      lastHeartbeatAt: parsed.lastHeartbeatAt,
      version: parsed.version,
      transport: "stdio",
      scopesEnforced: parsed.scopesEnforced,
      allowedScopes,
      toolCount: parsed.toolCount,
    };
  } catch {
    return null;
  }
}

export function isProcessAlive(pid: number): boolean {
  if (!Number.isFinite(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function isMcpHeartbeatOnline(
  snapshot: McpHeartbeatSnapshot | null,
  options?: { staleAfterMs?: number; requireLivePid?: boolean }
): boolean {
  if (!snapshot) return false;
  const staleAfterMs =
    typeof options?.staleAfterMs === "number" && options.staleAfterMs > 0
      ? options.staleAfterMs
      : DEFAULT_INTERVAL_MS * 3;
  const elapsed = Date.now() - new Date(snapshot.lastHeartbeatAt).getTime();
  if (!Number.isFinite(elapsed) || elapsed > staleAfterMs) return false;

  if (options?.requireLivePid === false) return true;
  return isProcessAlive(snapshot.pid);
}
