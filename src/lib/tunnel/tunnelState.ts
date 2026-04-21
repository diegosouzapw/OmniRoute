import fs from "fs";
import path from "path";
import { resolveDataDir } from "@/lib/dataPaths";

export type TunnelState = {
  shortId?: string | null;
  tailscaleUrl?: string | null;
  updatedAt?: string | null;
};

const SHORT_ID_LENGTH = 6;
const SHORT_ID_CHARS = "abcdefghijklmnpqrstuvwxyz23456789";

function getTunnelDir() {
  return path.join(resolveDataDir(), "tunnel");
}

function getStateFilePath() {
  return path.join(getTunnelDir(), "state.json");
}

function getTailscalePidFilePath() {
  return path.join(getTunnelDir(), "tailscale.pid");
}

function ensureTunnelDir() {
  fs.mkdirSync(getTunnelDir(), { recursive: true });
}

export function loadTunnelState(): TunnelState | null {
  try {
    if (!fs.existsSync(getStateFilePath())) return null;
    const raw = fs.readFileSync(getStateFilePath(), "utf8");
    return JSON.parse(raw) as TunnelState;
  } catch {
    return null;
  }
}

export function saveTunnelState(state: TunnelState): void {
  ensureTunnelDir();
  const nextState: TunnelState = {
    ...state,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(getStateFilePath(), JSON.stringify(nextState, null, 2) + "\n", "utf8");
}

export function updateTunnelState(patch: TunnelState): TunnelState {
  const current = loadTunnelState() || {};
  const next = { ...current, ...patch };
  saveTunnelState(next);
  return next;
}

export function clearTunnelState(): void {
  try {
    fs.unlinkSync(getStateFilePath());
  } catch {
    // Ignore missing state files.
  }
}

export function saveTailscalePid(pid: number): void {
  ensureTunnelDir();
  fs.writeFileSync(getTailscalePidFilePath(), String(pid), "utf8");
}

export function loadTailscalePid(): number | null {
  try {
    if (!fs.existsSync(getTailscalePidFilePath())) return null;
    const raw = fs.readFileSync(getTailscalePidFilePath(), "utf8");
    const pid = Number.parseInt(raw.trim(), 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
  }
}

export function clearTailscalePid(): void {
  try {
    fs.unlinkSync(getTailscalePidFilePath());
  } catch {
    // Ignore missing pid files.
  }
}

export function generateShortId(): string {
  let result = "";
  for (let i = 0; i < SHORT_ID_LENGTH; i += 1) {
    result += SHORT_ID_CHARS.charAt(Math.floor(Math.random() * SHORT_ID_CHARS.length));
  }
  return result;
}
