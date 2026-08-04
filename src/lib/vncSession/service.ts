import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { chmodSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { validateProviderApiKey } from "@/lib/providers/validation";
import { VNC_CONFIG, getVncProvider } from "./manifest";
import { harvestFromContainer, harvestToCredentials, waitForCdpReady } from "./harvest";

export type VncSessionStatus = "starting" | "running" | "harvesting" | "stopping" | "error";

export interface VncSession {
  sessionId: string;
  connectionId: string;
  providerId: string;
  containerName: string;
  profileDir: string;
  cdpPort: number;
  vncPort: number;
  url: string;
  status: VncSessionStatus;
  startedAt: number;
  lastViewerAt: number;
  lastHarvestAt: number;
  error?: string;
}

export interface HarvestSessionResult {
  harvested: boolean;
  sessionId: string;
  connectionId: string;
  providerId: string;
  updatedFields: string[];
  validation: {
    valid: boolean;
    unsupported: boolean;
    error: string | null;
  } | null;
}

const LABEL = "com.omniroute.browser-login";
const SESSIONS = new Map<string, VncSession>();
let idleTimer: NodeJS.Timeout | null = null;
let reconciliationPromise: Promise<void> | null = null;

function docker(
  args: string[],
  opts: { timeoutMs?: number } = {}
): Promise<{ code: number; out: string; err: string }> {
  return new Promise((resolve) => {
    let settled = false;
    let out = "";
    let err = "";
    const child = spawn(VNC_CONFIG.dockerBin, args, { stdio: ["ignore", "pipe", "pipe"] });
    let timer: NodeJS.Timeout | null = null;
    const finish = (result: { code: number; out: string; err: string }) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      resolve(result);
    };
    timer = setTimeout(() => {
      child.kill("SIGKILL");
      finish({ code: -1, out, err: `${err} (docker timed out)`.trim() });
    }, opts.timeoutMs ?? 60_000);

    child.stdout.on("data", (data) => {
      out += data.toString();
    });
    child.stderr.on("data", (data) => {
      err += data.toString();
    });
    child.on("error", (error) => {
      finish({ code: -1, out, err: error.message });
    });
    child.on("close", (code) => {
      finish({ code: code ?? -1, out, err });
    });
  });
}

export function sessionKey(sessionId: string): string {
  return `omniroute-browser-login-${sessionId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20)}`;
}

export function getSession(connectionId: string, sessionId: string): VncSession | undefined {
  const session = SESSIONS.get(sessionId);
  return session?.connectionId === connectionId ? session : undefined;
}

export function listSessions(connectionId?: string): VncSession[] {
  const sessions = [...SESSIONS.values()];
  return connectionId ? sessions.filter((session) => session.connectionId === connectionId) : sessions;
}

async function reconcileStaleContainers(): Promise<void> {
  if (!reconciliationPromise) {
    reconciliationPromise = (async () => {
      const listed = await docker(
        ["ps", "-aq", "--filter", `label=${LABEL}=true`],
        { timeoutMs: 20_000 }
      );
      if (listed.code !== 0) return;
      const ids = listed.out
        .split(/\s+/)
        .map((value) => value.trim())
        .filter(Boolean);
      if (ids.length > 0) {
        await docker(["rm", "-f", ...ids], { timeoutMs: 30_000 });
      }
    })();
  }
  await reconciliationPromise;
}

function findActiveSessionForConnection(connectionId: string): VncSession | undefined {
  return [...SESSIONS.values()].find(
    (session) =>
      session.connectionId === connectionId &&
      ["starting", "running", "harvesting"].includes(session.status)
  );
}

function safePathSegment(value: string): string {
  const safe = value.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  if (!safe || safe === "." || safe === "..") throw new Error("Invalid profile identifier");
  return safe;
}

function createProfileDir(connectionId: string, sessionId: string): string {
  mkdirSync(VNC_CONFIG.profileDir, { recursive: true, mode: 0o700 });
  chmodSync(VNC_CONFIG.profileDir, 0o700);
  const profileName = safePathSegment(VNC_CONFIG.persistProfiles ? connectionId : sessionId);
  const profileDir = join(VNC_CONFIG.profileDir, profileName);
  mkdirSync(profileDir, { recursive: true, mode: 0o700 });
  chmodSync(profileDir, 0o700);
  return profileDir;
}

async function publishedPort(containerName: string, containerPort: number): Promise<number> {
  const result = await docker(["port", containerName, `${containerPort}/tcp`], {
    timeoutMs: 10_000,
  });
  if (result.code !== 0) {
    throw new Error(result.err.trim() || `Could not resolve published port ${containerPort}`);
  }

  for (const line of result.out.split(/\r?\n/)) {
    const match = line.trim().match(/:(\d+)$/);
    if (match) return Number(match[1]);
  }
  throw new Error(`Docker did not publish container port ${containerPort}`);
}

export async function startSession(connectionId: string): Promise<VncSession> {
  await reconcileStaleContainers();

  const connection = await getProviderConnectionById(connectionId);
  if (!connection) throw new Error("Provider connection not found");
  const providerId = typeof connection.provider === "string" ? connection.provider : "";
  const provider = getVncProvider(providerId);
  if (!provider) {
    throw new Error(`Browser login is not supported for provider '${providerId || "unknown"}'`);
  }

  const existing = findActiveSessionForConnection(connectionId);
  if (existing) return existing;
  if (SESSIONS.size >= VNC_CONFIG.maxSessions) {
    throw new Error(`Maximum ${VNC_CONFIG.maxSessions} concurrent browser-login sessions reached`);
  }

  const sessionId = randomUUID();
  const containerName = sessionKey(sessionId);
  const profileDir = createProfileDir(connectionId, sessionId);
  const state: VncSession = {
    sessionId,
    connectionId,
    providerId,
    containerName,
    profileDir,
    cdpPort: 0,
    vncPort: 0,
    url: provider.url,
    status: "starting",
    startedAt: Date.now(),
    lastViewerAt: Date.now(),
    lastHarvestAt: 0,
  };
  SESSIONS.set(sessionId, state);

  try {
    const chromeCli = `${VNC_CONFIG.chromiumArgs} ${provider.url}`;
    const result = await docker(
      [
        "run",
        "-d",
        "--name",
        containerName,
        "--restart",
        "no",
        "--label",
        `${LABEL}=true`,
        "--label",
        `${LABEL}.session-id=${sessionId}`,
        "--label",
        `${LABEL}.connection-id=${connectionId}`,
        "--shm-size",
        "1gb",
        "-p",
        `127.0.0.1::${VNC_CONFIG.containerVncPort}`,
        "-p",
        `127.0.0.1::${VNC_CONFIG.containerCdpPort}`,
        "-v",
        `${profileDir}:${VNC_CONFIG.containerProfileDir}`,
        "-e",
        `CHROME_CLI=${chromeCli}`,
        VNC_CONFIG.image,
      ],
      { timeoutMs: 120_000 }
    );
    if (result.code !== 0) {
      const message = result.err.trim() || "docker run failed";
      const buildHint =
        VNC_CONFIG.image === "omniroute-vnc-chromium:local" &&
        /pull access denied|unable to find image|not found/i.test(message)
          ? " Build it with: docker build -t omniroute-vnc-chromium:local docker/vnc-browser/chromium"
          : "";
      throw new Error(`${message}${buildHint}`);
    }

    state.vncPort = await publishedPort(containerName, VNC_CONFIG.containerVncPort);
    state.cdpPort = await publishedPort(containerName, VNC_CONFIG.containerCdpPort);
    await waitForCdpReady(state.cdpPort, VNC_CONFIG.browserReadyTimeoutMs);

    state.status = "running";
    scheduleIdleSweep();
    return state;
  } catch (error) {
    state.status = "error";
    state.error = error instanceof Error ? error.message : String(error);
    SESSIONS.delete(sessionId);
    await docker(["rm", "-f", containerName], { timeoutMs: 20_000 });
    cleanupProfile(state);
    throw new Error(`Failed to start browser login for connection ${connectionId}: ${state.error}`);
  }
}

export function markViewerActive(connectionId: string, sessionId: string): void {
  const session = getSession(connectionId, sessionId);
  if (session) session.lastViewerAt = Date.now();
}

export async function harvestSession(
  connectionId: string,
  sessionId: string
): Promise<HarvestSessionResult> {
  const session = getSession(connectionId, sessionId);
  if (!session) throw new Error("Browser-login session not found");
  if (session.status !== "running") {
    throw new Error(`Browser-login session is not running (${session.status})`);
  }

  const provider = getVncProvider(session.providerId);
  if (!provider) throw new Error("Provider is no longer supported for browser login");

  session.status = "harvesting";
  try {
    const harvest = await harvestFromContainer(
      session.cdpPort,
      provider,
      VNC_CONFIG.harvestTimeoutMs
    );
    session.lastHarvestAt = Date.now();
    if (!harvest.hasCredential) {
      return {
        harvested: false,
        sessionId,
        connectionId,
        providerId: session.providerId,
        updatedFields: [],
        validation: null,
      };
    }

    const connection = await getProviderConnectionById(connectionId);
    if (!connection) throw new Error("Provider connection no longer exists");
    if (connection.provider !== session.providerId) {
      throw new Error("Provider connection changed while browser login was active");
    }

    const { providerSpecificData, apiKey } = harvestToCredentials(harvest, provider);
    const existingData =
      connection.providerSpecificData &&
      typeof connection.providerSpecificData === "object" &&
      !Array.isArray(connection.providerSpecificData)
        ? connection.providerSpecificData
        : {};
    const mergedData = { ...existingData, ...providerSpecificData };

    await updateProviderConnection(connectionId, {
      providerSpecificData: mergedData,
      ...(apiKey ? { apiKey } : {}),
    });

    const validationKey =
      apiKey ||
      (typeof mergedData.cookie === "string" ? mergedData.cookie : null) ||
      (typeof connection.apiKey === "string" ? connection.apiKey : "");
    const validationResult = await validateProviderApiKey({
      provider: session.providerId,
      apiKey: validationKey,
      providerSpecificData: mergedData,
    });

    return {
      harvested: true,
      sessionId,
      connectionId,
      providerId: session.providerId,
      updatedFields: [
        ...Object.keys(providerSpecificData).map((key) => `providerSpecificData.${key}`),
        ...(apiKey ? ["apiKey"] : []),
      ],
      validation: {
        valid: !!validationResult.valid,
        unsupported: !!validationResult.unsupported,
        error:
          typeof validationResult.error === "string" && validationResult.error.trim()
            ? validationResult.error
            : null,
      },
    };
  } finally {
    if (session.status === "harvesting") session.status = "running";
  }
}

export async function stopSession(connectionId: string, sessionId: string): Promise<void> {
  const session = getSession(connectionId, sessionId);
  if (!session || session.status === "stopping") return;

  session.status = "stopping";
  SESSIONS.delete(sessionId);
  try {
    const result = await docker(["rm", "-f", session.containerName], { timeoutMs: 20_000 });
    if (result.code !== 0 && !/no such container/i.test(result.err)) {
      throw new Error(result.err.trim() || "Failed to remove browser container");
    }
  } finally {
    cleanupProfile(session);
  }
}

export async function stopAllSessions(): Promise<void> {
  const sessions = [...SESSIONS.values()];
  await Promise.all(
    sessions.map((session) => stopSession(session.connectionId, session.sessionId).catch(() => {}))
  );
  if (idleTimer) clearInterval(idleTimer);
  idleTimer = null;
}

function cleanupProfile(session: VncSession): void {
  if (VNC_CONFIG.persistProfiles) return;
  try {
    rmSync(session.profileDir, { recursive: true, force: true });
  } catch {
    // Best-effort cleanup; the directory remains mode 0700 if removal fails.
  }
}

function scheduleIdleSweep(): void {
  if (idleTimer) return;
  idleTimer = setInterval(async () => {
    const now = Date.now();
    for (const session of [...SESSIONS.values()]) {
      if (session.status !== "running") continue;
      const idleFor = now - Math.max(session.lastViewerAt, session.lastHarvestAt);
      const overMax =
        VNC_CONFIG.maxSessionMs > 0 && now - session.startedAt >= VNC_CONFIG.maxSessionMs;
      if (idleFor >= VNC_CONFIG.idleTimeoutMs || overMax) {
        await stopSession(session.connectionId, session.sessionId).catch(() => {});
      }
    }
  }, 30_000);
  idleTimer.unref?.();
}
