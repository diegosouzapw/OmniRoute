/**
 * Fase 3 / Epic A — TPROXY capture-mode manager (decrypt 4a/N).
 *
 * Singleton lifecycle around the decrypt-capable transparent listener
 * (`captureMode.ts`): builds the dynamic CA (#4173), gates on native-addon
 * availability, holds the single running handle, counts interceptions, and
 * exposes start / stop / status for a (local-only) route to drive.
 *
 * The OS trust-store mechanism is deliberately NOT baked in here: `installCa` /
 * `uninstallCa` are injected by the caller (the route / VPS e2e provides the real
 * installer, which needs its own trust-store slot so it does not clobber the
 * static MITM cert). This keeps the manager unit-testable without root and means
 * it never mutates the trust store on its own.
 */
import { DynamicCertStore } from "./dynamicCert";
import { startTproxyCapture, type TproxyCaptureHandle } from "./captureMode";
import { isTransparentSocketAvailable } from "./transparentSocket";
import type { TproxyConfig } from "./commands";

export interface CaptureManagerStatus {
  /** Whether a capture session is currently running. */
  running: boolean;
  /** Whether the native IP_TRANSPARENT addon is loadable on this host. */
  available: boolean;
  /** ISO timestamp of when the running session started. */
  startedAt?: string;
  /** Number of connections intercepted in the running session. */
  interceptCount?: number;
  /** The transparent listener port of the running session. */
  onPort?: number;
}

export interface CaptureManagerDeps {
  startTproxyCapture: typeof startTproxyCapture;
  isAvailable: () => boolean;
  createCertStore: () => DynamicCertStore;
  now: () => string;
}

const realDeps: CaptureManagerDeps = {
  startTproxyCapture,
  isAvailable: isTransparentSocketAvailable,
  createCertStore: () => new DynamicCertStore(),
  now: () => new Date().toISOString(),
};

export interface StartCaptureModeOptions {
  cfg: TproxyConfig;
  /** Install the dynamic CA cert (PEM) into the OS trust store. Injected so the
   * manager never touches the trust store itself. */
  installCa: (caPem: string) => Promise<void>;
  /** Remove the CA from the trust store on stop (symmetric teardown). Injected. */
  uninstallCa: () => Promise<void>;
  /** Seam overrides for unit testing. */
  deps?: Partial<CaptureManagerDeps>;
}

interface ActiveCapture {
  handle: TproxyCaptureHandle;
  startedAt: string;
  intercepts: { count: number };
}

let active: ActiveCapture | null = null;

/**
 * Start the decrypt-capable TPROXY capture mode. Rejects if a session is already
 * running or the native addon is unavailable. The dynamic CA is created here and
 * installed in the trust store via the injected `installCa`.
 */
export async function startCaptureMode(
  options: StartCaptureModeOptions
): Promise<CaptureManagerStatus> {
  if (active) throw new Error("TPROXY capture mode is already running");

  const deps: CaptureManagerDeps = { ...realDeps, ...options.deps };
  if (!deps.isAvailable()) {
    throw new Error("TPROXY capture mode requires the native addon (Linux + CAP_NET_ADMIN).");
  }

  const certStore = deps.createCertStore();
  const intercepts = { count: 0 };
  const handle = await deps.startTproxyCapture(options.cfg, {
    decrypt: { certStore, installCa: options.installCa, uninstallCa: options.uninstallCa },
    onIntercept: () => {
      intercepts.count += 1;
    },
  });
  active = { handle, startedAt: deps.now(), intercepts };
  return getCaptureStatus();
}

/** Stop the running capture session (closes the listener, uninstalls the CA, and
 * reverts the rules via the handle). Idempotent — a no-op when nothing runs. */
export async function stopCaptureMode(): Promise<CaptureManagerStatus> {
  const current = active;
  active = null;
  if (current) await current.handle.stop();
  return getCaptureStatus();
}

/** Current capture-mode status (safe to call any time, including when idle). */
export function getCaptureStatus(): CaptureManagerStatus {
  const available = isTransparentSocketAvailable();
  if (!active) return { running: false, available };
  return {
    running: true,
    available,
    startedAt: active.startedAt,
    interceptCount: active.intercepts.count,
    onPort: active.handle.cfg.onPort,
  };
}

/** Test-only: clear the singleton without invoking teardown. */
export function __resetCaptureManager(): void {
  active = null;
}
