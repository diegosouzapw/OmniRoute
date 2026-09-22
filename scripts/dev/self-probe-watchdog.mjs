/**
 * Self-probe wedge watchdog (2026-09-05 incident follow-up).
 *
 * Failure mode: the HTTP/2 pool to an upstream died mid-stream
 * (ERR_HTTP2_STREAM_ERROR / UND_ERR_SOCKET), a client abort during the combo
 * cleanup left the event loop wedged — the listener kept accepting TCP but no
 * request was ever served again and nothing was logged. The existing
 * supervisor only restarts on process *exit*, so the wedge persisted for hours
 * until the operator noticed.
 *
 * Defense: periodic loopback self-probe of the health endpoint. The probe runs
 * on the same event loop it monitors, so a wedged loop cannot answer it.
 * N consecutive connect/timeout failures (a serving instance answers 401 on
 * /api/status — that counts as alive) → loud log + `process.exit(1)`, and the
 * platform supervisor (launchd KeepAlive / systemd / Docker restart) relaunches.
 *
 * Pure decision helpers are exported for tests; the interval lives in
 * `startSelfProbeWatchdog()`, called once from standalone-server-ws.mjs after
 * the listener is accepting.
 */

const DEFAULT_PROBE_INTERVAL_MS = 60_000;
const DEFAULT_PROBE_TIMEOUT_MS = 15_000;
const DEFAULT_PROBE_FAILURE_THRESHOLD = 3;

export function parseSelfProbeConfig(env) {
  const raw = (env.OMNIROUTE_SELF_PROBE ?? "").trim();
  if (/^(0|false|no|off)$/i.test(raw)) return { enabled: false };
  const int = (name, fallback, min) => {
    const v = Number(env[name]);
    return Number.isFinite(v) && v >= min ? Math.floor(v) : fallback;
  };
  return {
    enabled: true,
    intervalMs: int("OMNIROUTE_SELF_PROBE_INTERVAL_MS", DEFAULT_PROBE_INTERVAL_MS, 5_000),
    timeoutMs: int("OMNIROUTE_SELF_PROBE_TIMEOUT_MS", DEFAULT_PROBE_TIMEOUT_MS, 1_000),
    threshold: int("OMNIROUTE_SELF_PROBE_THRESHOLD", DEFAULT_PROBE_FAILURE_THRESHOLD, 2),
  };
}

export function shouldSelfProbeExit(consecutiveFailures, threshold) {
  return (
    Number.isFinite(consecutiveFailures) &&
    consecutiveFailures >= threshold &&
    threshold > 0
  );
}

export function startSelfProbeWatchdog({ port, scheme = "http", log = console }) {
  const config = parseSelfProbeConfig(process.env);
  if (!config.enabled) return null;

  let consecutiveFailures = 0;
  const probeUrl = `${scheme}://127.0.0.1:${port}/api/status`;

  const timer = setInterval(async () => {
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), config.timeoutMs);
    abortTimer.unref?.();
    let ok = false;
    try {
      // Any HTTP response — 200 or 401 or 500-with-headers — proves the loop
      // is serving. Only connect/timeout failures indicate a wedge.
      const response = await fetch(probeUrl, {
        signal: controller.signal,
        headers: { connection: "close" },
      });
      // Any HTTP response (200/401/500) proves the event loop is serving.
      ok = true;
    } catch {
      ok = false;
    } finally {
      clearTimeout(abortTimer);
    }
    if (ok) {
      if (consecutiveFailures > 0) {
        log.warn?.(
          `[SelfProbe] recovered after ${consecutiveFailures} failed probe(s)`
        );
      }
      consecutiveFailures = 0;
      return;
    }
    consecutiveFailures += 1;
    log.warn?.(
      `[SelfProbe] probe failed (${consecutiveFailures}/${config.threshold}) — ` +
        `${probeUrl} timed out or refused within ${config.timeoutMs}ms`
    );
    if (shouldSelfProbeExit(consecutiveFailures, config.threshold)) {
      log.error?.(
        `[SelfProbe] event loop wedged — ${consecutiveFailures} consecutive probe failures. ` +
          `Exiting (code 1) so the platform supervisor relaunches.`
      );
      process.exit(1);
    }
  }, config.intervalMs);
  timer.unref?.();

  return { stop: () => clearInterval(timer), config };
}
