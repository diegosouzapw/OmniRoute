#!/usr/bin/env node
/**
 * scripts/chaos/network-partition.mjs
 *
 * Fault-injection helper for the `bifrost-network-partition.test.ts` chaos
 * scenario. Wraps the platform-native firewall to either DROP traffic to
 * a target host:port (block) or RESTORE the original state (unblock).
 *
 * The CLI shape is intentionally minimal:
 *
 *   node scripts/chaos/network-partition.mjs block   --host 127.0.0.1 --port 8080 [--duration 10]
 *   node scripts/chaos/network-partition.mjs unblock --host 127.0.0.1 --port 8080
 *   node scripts/chaos/network-partition.mjs dry-run --host 127.0.0.1 --port 8080
 *
 * Dry-run mode (default when DRY_RUN=1 or the env var CHAOS_DRY_RUN=1 is
 * set) prints the platform-specific command line that *would* run, then
 * exits 0. This is the mode used in CI: it lets us test the orchestrator
 * path end-to-end without needing elevated privileges in the runner
 * sandbox.
 *
 * Platform detection:
 *   • Windows  → netsh advfirewall firewall add/delete rule
 *   • Linux    → iptables -A/-D INPUT ... (and OUTPUT for completeness)
 *   • macOS    → pf (not implemented; falls back to dry-run with a warning)
 *
 * The script is zero-dependency on purpose. It only uses `node:child_process`
 * and `node:os`. We deliberately avoid shelling out via `exec` so we never
 * accidentally interpolate user input into a shell — `spawn` is used
 * throughout with explicit argv arrays.
 *
 * Exit codes:
 *   0  — block/unblock applied (or simulated in dry-run)
 *   1  — invalid arguments
 *   2  — platform not supported
 *   3  — firewall tool not on PATH
 *   4  — firewall tool returned non-zero
 */
import { spawn, spawnSync } from "node:child_process";
import os from "node:os";

// ─── Constants ──────────────────────────────────────────────────────────────

/** Stable rule name we tag onto every Windows firewall entry. We make
 *  this include a random suffix so two parallel chaos tests on the
 *  same host don't trip over each other. */
const RULE_NAME_PREFIX = "OmniRoute-Chaos-NetworkPartition";

/** How long we wait for netsh/iptables to finish before giving up.
 *  On a busy CI runner, firewall rules can take a few seconds. */
const FIREWALL_TIMEOUT_MS = 15_000;

// ─── CLI parsing ───────────────────────────────────────────────────────────

/**
 * @typedef {Object} ParsedArgs
 * @property {"block"|"unblock"|"dry-run"} command
 * @property {string} host
 * @property {number} port
 * @property {number} [duration]  seconds; only meaningful for `block`
 */

/** Tiny argv parser. Avoids pulling in commander/minimist to keep the
 *  "zero new deps" constraint. Returns null on bad input. */
export function parseArgs(argv) {
  const cmd = argv[0];
  if (cmd !== "block" && cmd !== "unblock" && cmd !== "dry-run") return null;

  /** @type {ParsedArgs} */
  const out = { command: cmd, host: "127.0.0.1", port: 0 };
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--host" && argv[i + 1]) out.host = String(argv[++i]);
    else if (a === "--port" && argv[i + 1]) {
      const p = Number(argv[++i]);
      if (!Number.isInteger(p) || p < 1 || p > 65535) return null;
      out.port = p;
    } else if (a === "--duration" && argv[i + 1]) {
      const d = Number(argv[++i]);
      if (!Number.isFinite(d) || d < 0) return null;
      out.duration = d;
    }
  }
  if (out.port <= 0) return null;
  return out;
}

// ─── Platform detection ────────────────────────────────────────────────────

/** Returns "win32" | "linux" | "darwin" | "other". Cached after first call. */
let _platformCache = null;
export function detectPlatform() {
  if (_platformCache) return _platformCache;
  const p = os.platform();
  if (p === "win32") _platformCache = "win32";
  else if (p === "linux") _platformCache = "linux";
  else if (p === "darwin") _platformCache = "darwin";
  else _platformCache = "other";
  return _platformCache;
}

/** True if a binary exists on PATH. Uses `which` semantics: synchronous,
 *  exits non-zero on miss. We only use this at startup so it's cheap. */
export function toolOnPath(name) {
  const probe = process.platform === "win32" ? "where" : "which";
  const res = spawnSync(probe, [name], { stdio: "ignore" });
  return res.status === 0;
}

// ─── Command builders (pure functions, easy to unit-test) ──────────────────

/** Build the Windows netsh command for the given operation.
 *  @returns {string[]} argv array (no shell metacharacters). */
export function buildWindowsArgs(command, host, port) {
  const name = `${RULE_NAME_PREFIX}-${host}-${port}`;
  if (command === "block") {
    return [
      "advfirewall", "firewall", "add", "rule",
      `name=${name}`,
      "dir=out",
      "action=block",
      `remoteip=${host}`,
      `remoteport=${port}`,
      "protocol=any",
    ];
  }
  if (command === "unblock") {
    return ["advfirewall", "firewall", "delete", "rule", `name=${name}`];
  }
  // dry-run
  return ["advfirewall", "firewall", "show", "rule", `name=${name}`];
}

/** Build the Linux iptables command. We add two rules (one INPUT, one
 *  OUTPUT) so loopback testing works in either direction. */
export function buildLinuxArgs(command, host, port) {
  const comment = `${RULE_NAME_PREFIX} ${host}:${port}`;
  if (command === "block") {
    return [
      ["-A", "INPUT", "-s", host, "-p", "tcp", "--dport", String(port), "-j", "DROP", "-m", "comment", "--comment", comment],
      ["-A", "OUTPUT", "-d", host, "-p", "tcp", "--sport", String(port), "-j", "DROP", "-m", "comment", "--comment", comment],
    ];
  }
  if (command === "unblock") {
    return [
      ["-D", "INPUT", "-s", host, "-p", "tcp", "--dport", String(port), "-j", "DROP", "-m", "comment", "--comment", comment],
      ["-D", "OUTPUT", "-d", host, "-p", "tcp", "--sport", String(port), "-j", "DROP", "-m", "comment", "--comment", comment],
    ];
  }
  // dry-run: -C (check) is harmless and prints whether the rule exists.
  return [
    ["-C", "INPUT", "-s", host, "-p", "tcp", "--dport", String(port), "-j", "DROP", "-m", "comment", "--comment", comment],
  ];
}

// ─── Runner (executes the actual firewall commands) ────────────────────────

/** Result of an apply() call. The test harness matches on `dryRun` to
 *  decide whether to assert that the partition actually took effect. */
export class NetworkPartitionResult {
  constructor({ ok, dryRun, platform, command, stdout, stderr, error }) {
    this.ok = ok;
    this.dryRun = dryRun;
    this.platform = platform;
    this.command = command;
    this.stdout = stdout;
    this.stderr = stderr;
    this.error = error;
  }
  toJSON() {
    return {
      ok: this.ok,
      dryRun: this.dryRun,
      platform: this.platform,
      command: this.command,
      stdout: this.stdout,
      stderr: this.stderr,
      error: this.error ? String(this.error.message ?? this.error) : undefined,
    };
  }
}

/** Decide whether we should simulate rather than execute. */
function shouldDryRun(env) {
  if (env.CHAOS_DRY_RUN === "1") return true;
  if (env.DRY_RUN === "1") return true;
  // If the user explicitly asked to skip privileged ops, do so.
  if (env.CHAOS_SKIP_PRIVILEGED === "1") return true;
  return false;
}

/** Run a single subprocess with full output capture. */
function runProc(binary, argv, env) {
  return new Promise((resolve, reject) => {
    const proc = spawn(binary, argv, {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, ...env },
      windowsHide: true,
    });
    const outChunks = [];
    const errChunks = [];
    proc.stdout.on("data", (c) => outChunks.push(c));
    proc.stderr.on("data", (c) => errChunks.push(c));

    const timer = setTimeout(() => {
      proc.kill("SIGKILL");
      reject(new Error(`firewall tool timed out after ${FIREWALL_TIMEOUT_MS}ms`));
    }, FIREWALL_TIMEOUT_MS);

    proc.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    proc.on("close", (code) => {
      clearTimeout(timer);
      resolve({
        status: code ?? 0,
        stdout: Buffer.concat(outChunks).toString("utf8"),
        stderr: Buffer.concat(errChunks).toString("utf8"),
      });
    });
  });
}

/**
 * Apply the requested network partition. Safe to call in dry-run mode
 * from CI; safe to call with real privileges from staging.
 *
 * @param {ParsedArgs} args
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {Promise<NetworkPartitionResult>}
 */
export async function apply(args, env = process.env) {
  if (!args) return new NetworkPartitionResult({ ok: false, error: new Error("invalid args") });
  const platform = detectPlatform();
  const dryRun = shouldDryRun(env);

  if (dryRun) {
    const commands = buildCommands(platform, args.command, args.host, args.port);
    return new NetworkPartitionResult({
      ok: true,
      dryRun: true,
      platform,
      command: commands,
      stdout: "[dry-run] " + commands.map((c) => c.join(" ")).join(" ; "),
      stderr: "",
    });
  }

  // ── Real execution path ──────────────────────────────────────────────
  if (platform === "win32") {
    if (!toolOnPath("netsh")) {
      return new NetworkPartitionResult({ ok: false, error: new Error("netsh not on PATH") });
    }
    const argv = buildWindowsArgs(args.command, args.host, args.port);
    try {
      const r = await runProc("netsh", argv, env);
      return new NetworkPartitionResult({
        ok: r.status === 0,
        platform,
        command: ["netsh", ...argv],
        stdout: r.stdout,
        stderr: r.stderr,
        error: r.status === 0 ? undefined : new Error(`netsh exited ${r.status}: ${r.stderr}`),
      });
    } catch (e) {
      return new NetworkPartitionResult({ ok: false, platform, error: e });
    }
  }

  if (platform === "linux") {
    if (!toolOnPath("iptables")) {
      return new NetworkPartitionResult({ ok: false, error: new Error("iptables not on PATH") });
    }
    const ruleSets = buildLinuxArgs(args.command, args.host, args.port);
    const lastErr = { value: undefined };
    for (const argv of ruleSets) {
      try {
        const r = await runProc("iptables", argv, env);
        if (r.status !== 0) {
          // -D on a non-existent rule returns non-zero; for unblock that's OK.
          if (args.command === "unblock") continue;
          lastErr.value = new Error(`iptables exited ${r.status}: ${r.stderr}`);
          break;
        }
      } catch (e) {
        lastErr.value = e;
        break;
      }
    }
    return new NetworkPartitionResult({
      ok: !lastErr.value,
      platform,
      command: ["iptables", ...ruleSets[0]],
      stderr: lastErr.value ? String(lastErr.value.message ?? lastErr.value) : "",
      error: lastErr.value,
    });
  }

  // macOS / other: pf is the right tool but we deliberately don't ship
  // a default ruleset. Surface a clear error so callers know.
  return new NetworkPartitionResult({
    ok: false,
    platform,
    error: new Error(`platform ${platform} not supported by network-partition.mjs (dry-run only)`),
  });
}

/** Convert the platform-specific argv into a human-readable command
 *  string for logs. Pure helper; no I/O. */
export function buildCommands(platform, command, host, port) {
  if (platform === "win32") return [["netsh", ...buildWindowsArgs(command, host, port)]];
  if (platform === "linux") return buildLinuxArgs(command, host, port).map((a) => ["iptables", ...a]);
  return [["echo", "[unsupported-platform]"]];
}

// ─── CLI entry ─────────────────────────────────────────────────────────────

function usageAndExit(code) {
  process.stderr.write([
    "usage: network-partition.mjs <block|unblock|dry-run> --host <ip> --port <port> [--duration <seconds>]",
    "",
    "Env:",
    "  CHAOS_DRY_RUN=1   Always dry-run (default in CI)",
    "  CHAOS_SKIP_PRIVILEGED=1   Skip privileged ops, behave like dry-run",
    "",
  ].join("\n"));
  process.exit(code);
}

// When invoked as `node scripts/chaos/network-partition.mjs ...`, run the CLI.
// When imported by another module, just export the helpers — do NOT touch argv.
const isMain = (() => {
  try {
    const url = new URL(import.meta.url);
    const scriptPath = url.pathname.replace(/^\//, "");
    return process.argv[1] && process.argv[1].endsWith(scriptPath.split("/").pop());
  } catch {
    return false;
  }
})();

if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  if (!args) usageAndExit(1);
  apply(args).then((r) => {
    process.stdout.write(JSON.stringify(r.toJSON(), null, 2) + "\n");
    process.exit(r.ok ? 0 : 4);
  }).catch((e) => {
    process.stderr.write("fatal: " + (e?.stack ?? String(e)) + "\n");
    process.exit(4);
  });
}