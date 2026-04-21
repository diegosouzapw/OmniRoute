import { getSettings, updateSettings } from "@/lib/localDb";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { getCloudflaredTunnelStatus } from "@/lib/cloudflaredTunnel";
import {
  canInstallTailscaleWithoutSudo,
  getTailscaleBin,
  getTailscaleFunnelUrl,
  installTailscale,
  isTailscaleDaemonRunning,
  isTailscaleInstalled,
  isTailscaleLoggedIn,
  isTailscaleRunning,
  startDaemonWithPassword,
  startFunnel,
  startLogin,
  stopDaemon,
  stopFunnel,
} from "./tailscale";
import { generateShortId, loadTunnelState, updateTunnelState } from "./tunnelState";

export type TailscaleTunnelPhase =
  | "unsupported"
  | "not_installed"
  | "needs_daemon"
  | "needs_login"
  | "stopped"
  | "running"
  | "error";

export type TailscaleTunnelStatus = {
  supported: boolean;
  platform: NodeJS.Platform;
  installed: boolean;
  binaryPath: string | null;
  brewAvailable: boolean;
  daemonRunning: boolean;
  loggedIn: boolean;
  running: boolean;
  tunnelUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: TailscaleTunnelPhase;
  enabled: boolean;
  lastError: string | null;
};

type TailscaleActionOptions = {
  sudoPassword?: string;
};

function isSupportedPlatform(): boolean {
  return (
    process.platform === "darwin" || process.platform === "linux" || process.platform === "win32"
  );
}

function getTargetUrl(): string {
  const { apiPort } = getRuntimePorts();
  return `http://127.0.0.1:${apiPort}`;
}

function toApiUrl(tunnelUrl: string | null): string | null {
  return tunnelUrl ? `${tunnelUrl.replace(/\/$/, "")}/v1` : null;
}

export function deriveTailscalePhase(input: {
  supported: boolean;
  installed: boolean;
  daemonRunning: boolean;
  loggedIn: boolean;
  running: boolean;
  lastError?: string | null;
}): TailscaleTunnelPhase {
  if (!input.supported) return "unsupported";
  if (!input.installed) return "not_installed";
  if (input.lastError) return "error";
  if (!input.daemonRunning) return "needs_daemon";
  if (!input.loggedIn) return "needs_login";
  if (input.running) return "running";
  return "stopped";
}

async function persistTailscaleSettings(enabled: boolean, tunnelUrl: string | null): Promise<void> {
  await updateSettings({
    tailscaleEnabled: enabled,
    tailscaleUrl: tunnelUrl || "",
  });
}

function ensureTunnelShortId(): string {
  const current = loadTunnelState();
  const shortId = current?.shortId || generateShortId();
  updateTunnelState({ shortId });
  return shortId;
}

export async function installAndPrepareTailscale(options: TailscaleActionOptions = {}): Promise<{
  success: true;
  authUrl?: string | null;
}> {
  const shortId = ensureTunnelShortId();
  const result = await installTailscale(options.sudoPassword || "", shortId);
  return {
    success: true,
    authUrl: result.authUrl || null,
  };
}

export async function enableTailscale(options: TailscaleActionOptions = {}): Promise<
  | {
      success: true;
      tunnelUrl: string;
      apiUrl: string;
      status: TailscaleTunnelStatus;
    }
  | {
      success: false;
      needsLogin?: true;
      authUrl?: string;
      funnelNotEnabled?: true;
      enableUrl?: string;
      status: TailscaleTunnelStatus;
    }
> {
  if (!isSupportedPlatform()) {
    throw new Error(`Unsupported platform for Tailscale: ${process.platform}`);
  }

  if (!isTailscaleInstalled()) {
    throw new Error("Tailscale is not installed");
  }

  if (!isTailscaleDaemonRunning()) {
    await startDaemonWithPassword(options.sudoPassword || "");
  }

  const shortId = ensureTunnelShortId();
  if (!isTailscaleLoggedIn()) {
    const loginResult = await startLogin(shortId);
    const status = await getTailscaleStatus();
    return {
      success: false,
      needsLogin: true,
      authUrl: loginResult.authUrl || undefined,
      status,
    };
  }

  stopFunnel();
  const funnelResult = await startFunnel();
  if (funnelResult.funnelNotEnabled) {
    const status = await getTailscaleStatus(
      funnelResult.enableUrl ? null : "Funnel is not enabled for this tailnet"
    );
    return {
      success: false,
      funnelNotEnabled: true,
      enableUrl: funnelResult.enableUrl,
      status,
    };
  }

  const tunnelUrl = funnelResult.tunnelUrl || getTailscaleFunnelUrl();
  if (!tunnelUrl) {
    throw new Error("Tailscale funnel did not return a public URL");
  }

  updateTunnelState({ tailscaleUrl: tunnelUrl });
  await persistTailscaleSettings(true, tunnelUrl);
  const status = await getTailscaleStatus();

  return {
    success: true,
    tunnelUrl,
    apiUrl: toApiUrl(tunnelUrl) || "",
    status,
  };
}

export async function disableTailscale(
  options: TailscaleActionOptions = {}
): Promise<{ success: true; status: TailscaleTunnelStatus }> {
  stopFunnel();
  try {
    await stopDaemon(options.sudoPassword || "");
  } catch {
    // Stopping the daemon is best-effort; resetting funnel is the important part.
  }

  updateTunnelState({ tailscaleUrl: null });
  await persistTailscaleSettings(false, null);
  const status = await getTailscaleStatus();
  return { success: true, status };
}

export async function getTailscaleStatus(
  lastError: string | null = null
): Promise<TailscaleTunnelStatus> {
  const settings = await getSettings();
  const supported = isSupportedPlatform();
  const installed = supported && isTailscaleInstalled();
  const daemonRunning = installed && isTailscaleDaemonRunning();
  const loggedIn = daemonRunning && isTailscaleLoggedIn();
  const running = loggedIn && isTailscaleRunning();
  const detectedUrl = running ? getTailscaleFunnelUrl() : null;
  const tunnelUrl =
    detectedUrl ||
    (typeof settings.tailscaleUrl === "string" && settings.tailscaleUrl.trim().length > 0
      ? settings.tailscaleUrl.trim()
      : null);

  return {
    supported,
    platform: process.platform,
    installed,
    binaryPath: installed ? getTailscaleBin() : null,
    brewAvailable: canInstallTailscaleWithoutSudo() && process.platform === "darwin",
    daemonRunning,
    loggedIn,
    running,
    tunnelUrl,
    apiUrl: toApiUrl(tunnelUrl),
    targetUrl: getTargetUrl(),
    phase: deriveTailscalePhase({
      supported,
      installed,
      daemonRunning,
      loggedIn,
      running,
      lastError,
    }),
    enabled: settings.tailscaleEnabled === true && running,
    lastError,
  };
}

export async function getTunnelStatus() {
  return getCloudflaredTunnelStatus();
}
