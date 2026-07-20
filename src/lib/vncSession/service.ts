/**
 * vncSession service — lifecycle for persistent web-login browser containers.
 *
 * When a cookie/token web provider is configured in OmniRoute, the operator can
 * start a containerized browser (noVNC web UI) here, log in interactively, and
 * have the resulting cookies/localStorage harvested back into the provider's
 * `provider_connections` row via the Chrome/Firefox DevTools Protocol.
 *
 * The container is auto-stopped when idle (no viewer + no harvest) for
 * `idleTimeoutMs`, and all containers are torn down on server shutdown.
 *
 * Docker is the only external dependency; if the `docker` CLI is missing the
 * feature degrades gracefully (start throws a clear error, shutdown is a no-op).
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { getProviderConnections, updateProviderConnection } from "@/lib/db/providers";
import { VNC_CONFIG, getVncProvider, type VncProviderEntry } from "./manifest";
import { harvestFromContainer, harvestToCredentials } from "./harvest";

export type VncSessionStatus = "starting" | "running" | "stopping" | "error";

export interface VncSession {
  providerId: string;
  containerName: string;
  cdpPort: number;
  vncPort: number;
  url: string;
  status: VncSessionStatus;
  startedAt: number;
  lastViewerAt: number;
  lastHarvestAt: number;
  error?: string;
}

const SESSIONS = new Map<string, VncSession>();
let idleTimer: NodeJS.Timeout | null = null;

function dockerBin(): string {
  return process.env.OMNIROUTE_DOCKER_BIN || "docker";
}

function docker(
  args: string[],
  opts: { timeoutMs?: number } = {}
): Promise<{ code: number; out: string; err: string }> {
  return new Promise((resolve) => {
    const child = spawn(dockerBin(), args, { stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    let err = "";
    const to = setTimeout(() => {
      child.kill("SIGKILL");
      resolve({ code: -1, out, err: err + " (docker timed out)" });
    }, opts.timeoutMs ?? 60_000);
    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (err += d.toString()));
    child.on("error", (e) => {
      clearTimeout(to);
      resolve({ code: -1, out, err: String(e?.message ?? e) });
    });
    child.on("close", (code) => {
      clearTimeout(to);
      resolve({ code: code ?? -1, out, err });
    });
  });
}

export function sessionKey(providerId: string): string {
  return `omniroute-vnc-${providerId}`;
}
export function getSession(providerId: string): VncSession | undefined {
  return SESSIONS.get(providerId);
}
export function listSessions(): VncSession[] {
  return [...SESSIONS.values()];
}

function pickPort(role: "vnc" | "cdp"): number {
  const used = new Set([...SESSIONS.values()].flatMap((s) => [s.vncPort, s.cdpPort]));
  for (let i = 0; i < VNC_CONFIG.maxSessions; i++) {
    const p = VNC_CONFIG.vncBasePort + i * 2 + (role === "cdp" ? 1 : 0);
    if (!used.has(p)) return p;
  }
  throw new Error("no free VNC session port");
}

function profileRoot(): string {
  return (
    process.env.OMNIROUTE_VNC_PROFILE_DIR ||
    join(process.env.HOME || homedir(), ".omniroute", "vnc-profiles")
  );
}

export async function startSession(providerId: string): Promise<VncSession> {
  const provider = getVncProvider(providerId);
  if (!provider) throw new Error(`unknown vnc provider: ${providerId}`);

  const existing = SESSIONS.get(providerId);
  if (existing && (existing.status === "running" || existing.status === "starting")) {
    return existing;
  }
  if (SESSIONS.size >= VNC_CONFIG.maxSessions) {
    throw new Error(`max ${VNC_CONFIG.maxSessions} concurrent VNC sessions reached`);
  }

  const containerName = sessionKey(providerId);
  const vncPort = pickPort("vnc");
  const cdpPort = pickPort("cdp");
  const profileDir = join(profileRoot(), providerId);
  mkdirSync(profileDir, { recursive: true });

  const state: VncSession = {
    providerId,
    containerName,
    cdpPort,
    vncPort,
    url: provider.url,
    status: "starting",
    startedAt: Date.now(),
    lastViewerAt: Date.now(),
    lastHarvestAt: 0,
  };
  SESSIONS.set(providerId, state);

  // Remove any stale container with the same name first.
  await docker(["rm", "-f", containerName], { timeoutMs: 20_000 });

  const args = [
    "run",
    "-d",
    "--name",
    containerName,
    "--restart",
    "no",
    "-p",
    `${vncPort}:${VNC_CONFIG.containerVncPort}`,
    "-p",
    `${cdpPort}:${VNC_CONFIG.containerCdpPort}`,
    "-v",
    `${profileDir}:${VNC_CONFIG.containerProfileDir}`,
    "-e",
    `VNC_START_URL=${provider.url}`,
    VNC_CONFIG.image,
  ];
  const res = await docker(args, { timeoutMs: 120_000 });
  if (res.code !== 0) {
    state.status = "error";
    state.error = res.err.trim() || "docker run failed";
    throw new Error(`failed to start VNC container for ${providerId}: ${state.error}`);
  }

  state.status = "running";
  scheduleIdleSweep();
  return state;
}

export function markViewerActive(providerId: string): void {
  const s = SESSIONS.get(providerId);
  if (s) s.lastViewerAt = Date.now();
}

export async function harvestSession(
  providerId: string
): Promise<{ ok: boolean; credential?: string }> {
  const s = SESSIONS.get(providerId);
  const provider = getVncProvider(providerId);
  if (!s || !provider) throw new Error(`no active session for ${providerId}`);
  if (s.status !== "running")
    throw new Error(`session for ${providerId} not running (${s.status})`);

  const harvest = await harvestFromContainer(s.cdpPort, provider);
  s.lastHarvestAt = Date.now();

  if (!harvest.hasCredential) return { ok: false };

  const { providerSpecificData, apiKey } = harvestToCredentials(harvest, provider);
  await writeCredentials(providerId, providerSpecificData, apiKey);
  return {
    ok: true,
    credential: apiKey
      ? apiKey.slice(0, 8) + "…"
      : providerSpecificData.cookie
        ? String(providerSpecificData.cookie).slice(0, 24) + "…"
        : undefined,
  };
}

async function writeCredentials(
  providerId: string,
  psd: Record<string, unknown>,
  apiKey: string | null
): Promise<void> {
  const rows = await getProviderConnections({ provider: providerId });
  if (!rows || rows.length === 0) {
    throw new Error(`no provider_connections row for ${providerId} to update`);
  }
  const row = rows[0] as Record<string, any>;
  const merged = { ...(row.providerSpecificData || row.provider_specific_data || {}), ...psd };
  await updateProviderConnection(row.id, {
    providerSpecificData: merged,
    ...(apiKey ? { apiKey } : {}),
  });
}

export async function stopSession(providerId: string): Promise<void> {
  const s = SESSIONS.get(providerId);
  if (!s) return;
  s.status = "stopping";
  await docker(["rm", "-f", s.containerName], { timeoutMs: 20_000 });
  SESSIONS.delete(providerId);
}

export async function stopAllSessions(): Promise<void> {
  await Promise.all([...SESSIONS.keys()].map((p) => stopSession(p).catch(() => {})));
  if (idleTimer) clearInterval(idleTimer);
  idleTimer = null;
}

function scheduleIdleSweep(): void {
  if (idleTimer) return;
  idleTimer = setInterval(async () => {
    const now = Date.now();
    for (const s of [...SESSIONS.values()]) {
      if (s.status !== "running") continue;
      const idleFor = now - Math.max(s.lastViewerAt, s.lastHarvestAt);
      const overMax = VNC_CONFIG.maxSessionMs > 0 && now - s.startedAt > VNC_CONFIG.maxSessionMs;
      if (idleFor >= VNC_CONFIG.idleTimeoutMs || overMax) {
        try {
          await stopSession(s.providerId);
        } catch {
          /* best-effort */
        }
      }
    }
  }, 30_000);
  idleTimer.unref?.();
}
