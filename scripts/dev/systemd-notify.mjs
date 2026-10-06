/**
 * Minimal systemd sd_notify integration (sd_notify(3) protocol).
 *
 * Node's stable API has no AF_UNIX datagram socket support (node:dgram is
 * udp4/udp6 only), so notifications are sent by spawning the `systemd-notify`
 * binary — present on every systemd host, no extra dependency.
 *
 * Everything is guarded: without a NOTIFY_SOCKET (plain terminal, Docker,
 * Electron, Windows) the notifier is a no-op and costs nothing. Set
 * OMNIROUTE_DISABLE_SD_NOTIFY=1 to force-disable even under systemd.
 *
 * A watchdog keep-alive interval lives in the main event loop of the process
 * that runs it: if that loop is ever blocked (frozen server, cf. the cold
 * /v1/models rebuild freeze), the pings stop and systemd kills the service
 * after WatchdogSec=.
 */

import { spawn } from "node:child_process";

export const SD_NOTIFY_BINARY = "systemd-notify";
export const SD_NOTIFY_SOCKET_ENV = "NOTIFY_SOCKET";
export const SD_NOTIFY_DISABLE_ENV = "OMNIROUTE_DISABLE_SD_NOTIFY";
// Ping every 60s — satisfies any systemd WatchdogSec= >= 120s (systemd
// requires keep-alive pings at most every WatchdogSec/2).
export const SD_NOTIFY_WATCHDOG_INTERVAL_MS = 60_000;

export function isSystemdNotifyEnabled(env = process.env) {
  return Boolean(env[SD_NOTIFY_SOCKET_ENV]) && env[SD_NOTIFY_DISABLE_ENV] !== "1";
}

export function buildNotifyMessage(kind) {
  switch (kind) {
    case "ready":
      return "READY=1";
    case "watchdog":
      return "WATCHDOG=1";
    case "stopping":
      return "STOPPING=1";
    default:
      throw new Error(`[omniroute][sd_notify] unknown message kind: ${kind}`);
  }
}

export function createSystemdNotifier({
  env = process.env,
  binary = SD_NOTIFY_BINARY,
  watchdogIntervalMs = SD_NOTIFY_WATCHDOG_INTERVAL_MS,
  spawnFn = spawn,
  onWarn = (message) => console.warn(message),
} = {}) {
  const enabled = isSystemdNotifyEnabled(env);
  let disabled = false;
  let watchdogTimer = null;

  const send = (kind) => {
    if (!enabled || disabled) return;
    const child = spawnFn(binary, [buildNotifyMessage(kind)], { env, stdio: "ignore" });
    // Never let a hung systemd-notify keep the process alive.
    child.unref?.();
    child.on("error", (err) => {
      // A failed send means systemd never sees the keep-alive: the service
      // would be killed as unhealthy anyway, so disabling loudly (one
      // warning) is safer than spamming errors forever.
      disabled = true;
      if (watchdogTimer) {
        clearInterval(watchdogTimer);
        watchdogTimer = null;
      }
      onWarn(
        `[omniroute][sd_notify] failed to send '${kind}' (${err?.code ?? err?.message ?? err}); sd_notify disabled for this process`
      );
    });
  };

  return {
    enabled,
    ready() {
      send("ready");
    },
    watchdog() {
      send("watchdog");
    },
    stopping() {
      send("stopping");
    },
    startWatchdog() {
      if (!enabled || disabled || watchdogTimer) return;
      watchdogTimer = setInterval(() => send("watchdog"), watchdogIntervalMs);
      watchdogTimer.unref?.();
    },
    dispose() {
      if (watchdogTimer) {
        clearInterval(watchdogTimer);
        watchdogTimer = null;
      }
    },
  };
}
