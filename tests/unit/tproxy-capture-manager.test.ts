/**
 * Fase 3 / Epic A — TPROXY capture-mode manager (decrypt 4a/N).
 *
 * The manager is the singleton lifecycle a (local-only) route drives: it gates on
 * native-addon availability, builds the dynamic CA, wires the injected trust-store
 * installer through to the decrypt listener, counts interceptions, and reports
 * status. All effectful seams are injected so this is testable without root or the
 * native addon. The real intercept/decrypt path was proven in #4169/#4179/#4200.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  startCaptureMode,
  stopCaptureMode,
  getCaptureStatus,
  __resetCaptureManager,
  type StartCaptureModeOptions,
} from "../../src/mitm/tproxy/captureManager.ts";

const CFG = { dport: 443, mark: 0x2333, onPort: 8443, routeTable: 233, bypassMark: 0x539 };

interface CapturedStart {
  cfg?: unknown;
  options?: {
    decrypt?: { installCa: (p: string) => Promise<void>; uninstallCa: () => Promise<void> };
    onIntercept?: (info: { destIp: string; destPort: number }) => void;
  };
  stopped: boolean;
}

/** A fake `startTproxyCapture` that records what it was handed and returns a
 * handle whose stop() flips a flag. */
function fakeStart(rec: CapturedStart) {
  return async (cfg: unknown, options: CapturedStart["options"]) => {
    rec.cfg = cfg;
    rec.options = options;
    return {
      cfg: cfg as never,
      server: {} as never,
      stop: async () => {
        rec.stopped = true;
      },
    };
  };
}

function baseOptions(over: Partial<StartCaptureModeOptions> = {}): StartCaptureModeOptions {
  return {
    cfg: CFG,
    installCa: async () => {},
    uninstallCa: async () => {},
    ...over,
  };
}

test.afterEach(() => __resetCaptureManager());

test("startCaptureMode rejects when the native addon is unavailable", async () => {
  await assert.rejects(
    () => startCaptureMode(baseOptions({ deps: { isAvailable: () => false } })),
    /native addon|CAP_NET_ADMIN/
  );
});

test("startCaptureMode wires the injected CA installer into the decrypt listener", async () => {
  const rec: CapturedStart = { stopped: false };
  const installCa = async () => {};
  const uninstallCa = async () => {};
  const status = await startCaptureMode(
    baseOptions({
      installCa,
      uninstallCa,
      deps: { isAvailable: () => true, startTproxyCapture: fakeStart(rec) as never },
    })
  );
  assert.equal(status.running, true);
  assert.equal(status.onPort, 8443);
  assert.equal(rec.options?.decrypt?.installCa, installCa, "installCa is passed through to decrypt");
  assert.equal(rec.options?.decrypt?.uninstallCa, uninstallCa, "uninstallCa is passed through");
});

test("startCaptureMode refuses to start a second concurrent session", async () => {
  const rec: CapturedStart = { stopped: false };
  const deps = { isAvailable: () => true, startTproxyCapture: fakeStart(rec) as never };
  await startCaptureMode(baseOptions({ deps }));
  await assert.rejects(() => startCaptureMode(baseOptions({ deps })), /already running/);
});

test("stopCaptureMode stops the handle and clears the running state", async () => {
  const rec: CapturedStart = { stopped: false };
  await startCaptureMode(
    baseOptions({ deps: { isAvailable: () => true, startTproxyCapture: fakeStart(rec) as never } })
  );
  const status = await stopCaptureMode();
  assert.equal(rec.stopped, true, "the handle's stop() was invoked");
  assert.equal(status.running, false);
});

test("stopCaptureMode is a no-op when nothing is running", async () => {
  const status = await stopCaptureMode();
  assert.equal(status.running, false);
});

test("getCaptureStatus counts interceptions reported by the listener", async () => {
  const rec: CapturedStart = { stopped: false };
  await startCaptureMode(
    baseOptions({
      deps: { isAvailable: () => true, startTproxyCapture: fakeStart(rec) as never },
    })
  );
  rec.options?.onIntercept?.({ destIp: "1.2.3.4", destPort: 443 });
  rec.options?.onIntercept?.({ destIp: "5.6.7.8", destPort: 443 });
  const status = getCaptureStatus();
  assert.equal(status.running, true);
  assert.equal(status.interceptCount, 2);
});

test("getCaptureStatus reports not-running when idle", () => {
  const status = getCaptureStatus();
  assert.equal(status.running, false);
  assert.equal(typeof status.available, "boolean");
});
