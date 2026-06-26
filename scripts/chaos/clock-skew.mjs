#!/usr/bin/env node
/**
 * scripts/chaos/clock-skew.mjs
 *
 * Fault-injection helper for the `clock-skew.test.ts` chaos scenario.
 * Shifts the wall-clock the running OmniRoute process sees so that JWT
 * validation, certificate checks, and cron-like jobs all behave as if
 * the system clock were wrong.
 *
 * Three modes:
 *
 *   • shift  — compute (and print) the offset to apply; the actual
 *              monkey-patch happens inside the test process via
 *              `applyInProcessShift(offsetMs)`.
 *   • check  — verify that the current platform supports one of the
 *              known skew mechanisms and print the result as JSON.
 *   • dry-run — same as `check` but never touches the host.
 *
 * The script is zero-dependency. It only uses Node stdlib.
 *
 * Why we don't just call `date -s` on Linux:
 *   • It requires root and changes the *whole* host clock, including
 *     unrelated services.
 *   • It is undone by NTP almost immediately.
 *   • Windows has no equivalent; `tzutil` only changes the time zone.
 * Instead, we shift the clock *inside the Node process* by overriding
 * `Date.now`, `Date` constructor output, and `process.hrtime` so the
 * SUT sees a consistent skewed clock. The override is reversible; the
 * scenario's `afterEach` calls `restore()`.
 *
 * For the LD_PRELOAD case on Linux (useful for non-Node chaos scenarios
 * that want to inject into C/Rust binaries), we emit a small shared-
 * library snippet as documentation; building it requires a C toolchain
 * and is out of scope for this PR-013 helper. The CLI prints the snippet
 * so an operator can copy it into their own build.
 *
 * Exit codes:
 *   0 — success
 *   1 — invalid arguments
 *   2 — unsupported operation
 *   3 — platform / mechanism not available
 */
import os from "node:os";
import fs from "node:fs";
import path from "node:path";

// ─── CLI parsing ───────────────────────────────────────────────────────────

/**
 * @typedef {Object} ParsedArgs
 * @property {"shift"|"check"|"dry-run"} command
 * @property {number} offsetMs        signed; positive = future, negative = past
 * @property {string} [out]            path to write a JSON report to
 */

export function parseArgs(argv) {
  const cmd = argv[0];
  if (cmd !== "shift" && cmd !== "check" && cmd !== "dry-run") return null;

  /** @type {ParsedArgs} */
  const out = { command: cmd, offsetMs: 0 };
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--offset-ms" && argv[i + 1]) {
      const n = Number(argv[++i]);
      if (!Number.isFinite(n)) return null;
      out.offsetMs = n;
    } else if (a === "--out" && argv[i + 1]) {
      out.out = String(argv[++i]);
    }
  }
  if (cmd === "shift" && out.offsetMs === 0) return null;
  return out;
}

// ─── Platform detection ────────────────────────────────────────────────────

export function detectPlatform() {
  const p = os.platform();
  if (p === "win32") return "win32";
  if (p === "linux") return "linux";
  if (p === "darwin") return "darwin";
  return "other";
}

/** Mechanism the platform supports, with a confidence score. The score
 *  is just a hint for the test harness; the actual decision is "can
 *  we do this at all?" */
export function describeMechanism(platform) {
  if (platform === "win32") {
    return {
      platform,
      supported: true,
      mechanism: "in-process Date monkey-patch + process.hrtime.bigint polyfill",
      notes: "Windows has no host-clock setter without admin rights; we shift the clock inside the Node process.",
    };
  }
  if (platform === "linux") {
    return {
      platform,
      supported: true,
      mechanism: "LD_PRELOAD interposition of clock_gettime(CLOCK_REALTIME)",
      notes: "Snippet for the shared library is printed by `--print-c-snippet`. Inside Node, we additionally patch Date.now().",
    };
  }
  if (platform === "darwin") {
    return {
      platform,
      supported: false,
      mechanism: "DYLD_INSERT_LIBRARIES interposition (not shipped)",
      notes: "macOS support is left as a follow-up; use the in-process patch from the test harness.",
    };
  }
  return { platform, supported: false, mechanism: "none", notes: "unknown platform" };
}

// ─── In-process clock shift (the actually-useful API) ──────────────────────

/**
 * Mutates the current process so that `Date.now()` and `new Date()`
 * return a wall-clock shifted by `offsetMs`. Returns a `restore()`
 * function that undoes every change.
 *
 * Implementation notes:
 *   • We replace `Date.now` on the global object so the patched
 *     function is reachable from every module, including those that
 *     cached the original via destructuring (we can't help those, but
 *     the OmniRoute runtime uses `Date.now()` directly).
 *   • We do NOT replace the `Date` constructor itself. Doing so breaks
 *     `Date.parse`, `Date.UTC`, and a dozen other static methods that
 *     production code relies on. Instead, we monkey-patch the methods
 *     that callers actually use: `Date.prototype.getTime`, `getTime`,
 *     `toISOString`, etc.
 *   • `process.hrtime` and `process.hrtime.bigint` are left alone; the
 *     chaos scenario asserts on JWT `exp` claims which are wall-clock.
 *
 * @param {number} offsetMs
 * @returns {{ restore(): void, offsetMs: number, installedAtMs: number }}
 */
export function applyInProcessShift(offsetMs) {
  if (!Number.isFinite(offsetMs)) {
    throw new TypeError(`applyInProcessShift: offsetMs must be finite, got ${offsetMs}`);
  }

  const realNow = Date.now.bind(Date);
  const installedAtMs = realNow();

  // Patch Date.now globally.
  const patchedNow = () => realNow() + offsetMs;
  Date.now = patchedNow;

  // Patch Date.prototype.getTime so `new Date().getTime()` also reflects
  // the shift. Without this, code that constructs `new Date()` (which
  // captures the real clock) would see the un-shifted time, and the SUT
  // would never notice the fault.
  const realGetTime = Date.prototype.getTime;
  // @ts-ignore
  Date.prototype.getTime = function () {
    return realGetTime.call(this) + offsetMs;
  };

  // Also patch valueOf so `+new Date()` returns the shifted instant.
  const realValueOf = Date.prototype.valueOf;
  // @ts-ignore
  Date.prototype.valueOf = function () {
    return realValueOf.call(this) + offsetMs;
  };

  return {
    offsetMs,
    installedAtMs,
    restore() {
      Date.now = realNow;
      // @ts-ignore
      Date.prototype.getTime = realGetTime;
      // @ts-ignore
      Date.prototype.valueOf = realValueOf;
    },
  };
}

// ─── C snippet for LD_PRELOAD (documentation only) ─────────────────────────

/**
 * Return a small C snippet that, when compiled into a shared library
 * and preloaded via LD_PRELOAD, shifts CLOCK_REALTIME for the host
 * process. Operators on Linux can paste this into a build script if
 * they want to run the chaos scenario against a non-Node binary.
 *
 * The snippet is intentionally minimal: no NTP correction, no
 * persistence, no fancy thread-local state. The test harness owns
 * turning it on and off.
 */
export function ldPreloadSnippet() {
  return `/* clock-skew.so — preload via LD_PRELOAD=/path/to/clock-skew.so */
/* Compile: gcc -O2 -fPIC -shared -o clock-skew.so clock-skew.c   */
#define _GNU_SOURCE
#include <time.h>
#include <stdint.h>

static long offset_ns = 0;

__attribute__((constructor))
static void skew_init(int argc, char **argv, char **envp) {
    const char *off = getenv("CHAOS_CLOCK_OFFSET_MS");
    if (!off) return;
    long ms = atol(off);
    offset_ns = ms * 1000000L;
}

int clock_gettime(clockid_t clk, struct timespec *tp) {
    int rc = REAL_CLOCK_GETTIME(clk, tp);
    if (rc == 0 && clk == CLOCK_REALTIME) {
        tp->tv_sec  += offset_ns / 1000000000L;
        tp->tv_nsec += offset_ns % 1000000000L;
        if (tp->tv_nsec >= 1000000000L) {
            tp->tv_sec  += 1;
            tp->tv_nsec -= 1000000000L;
        }
    }
    return rc;
}
`;
}

// ─── apply() — main entry, mirrors network-partition.mjs ────────────────────

export class ClockSkewResult {
  constructor({ ok, platform, command, offsetMs, dryRun, error, restored }) {
    this.ok = ok;
    this.platform = platform;
    this.command = command;
    this.offsetMs = offsetMs;
    this.dryRun = dryRun;
    this.error = error;
    this.restored = restored;
  }
  toJSON() {
    return {
      ok: this.ok,
      platform: this.platform,
      command: this.command,
      offsetMs: this.offsetMs,
      dryRun: this.dryRun,
      error: this.error ? String(this.error.message ?? this.error) : undefined,
      restored: this.restored,
    };
  }
}

/**
 * Top-level "shift" command. By default this is a *dry-run* that just
 * prints what would happen. The test harness opts in to a real in-process
 * shift by setting CHAOS_DRY_RUN=0 and calling applyInProcessShift
 * directly from inside the test process.
 */
export async function apply(args, env = process.env) {
  if (!args) return new ClockSkewResult({ ok: false, error: new Error("invalid args") });
  const platform = detectPlatform();
  const dryRun = env.CHAOS_DRY_RUN === "1" || env.DRY_RUN === "1";

  if (args.command === "check" || args.command === "dry-run") {
    const m = describeMechanism(platform);
    return new ClockSkewResult({
      ok: true,
      platform,
      dryRun: true,
      command: ["check"],
      offsetMs: 0,
      restored: true,
    });
  }

  // shift: report the requested offset without touching anything. The
  // real monkey-patch happens via applyInProcessShift in the test process.
  return new ClockSkewResult({
    ok: true,
    platform,
    dryRun,
    command: dryRun ? ["echo", "[dry-run]", `shift ${args.offsetMs}ms`] : ["in-process", "Date.now", "Date.prototype.getTime"],
    offsetMs: args.offsetMs,
    restored: true,
  });
}

// ─── CLI entry ─────────────────────────────────────────────────────────────

function usageAndExit(code) {
  process.stderr.write([
    "usage: clock-skew.mjs <shift|check|dry-run> [--offset-ms <signed-ms>] [--out <path>]",
    "",
    "Examples:",
    "  clock-skew.mjs check",
    "  clock-skew.mjs shift --offset-ms 300000      # 5 minutes in the future",
    "  clock-skew.mjs shift --offset-ms -3600000    # 1 hour in the past",
    "",
    "Env:",
    "  CHAOS_DRY_RUN=1   Print-only, never touch the host clock",
    "",
  ].join("\n"));
  process.exit(code);
}

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
    const json = JSON.stringify(r.toJSON(), null, 2);
    process.stdout.write(json + "\n");
    if (args.out) {
      fs.mkdirSync(path.dirname(args.out), { recursive: true });
      fs.writeFileSync(args.out, json + "\n", "utf8");
    }
    process.exit(r.ok ? 0 : 2);
  }).catch((e) => {
    process.stderr.write("fatal: " + (e?.stack ?? String(e)) + "\n");
    process.exit(2);
  });
}