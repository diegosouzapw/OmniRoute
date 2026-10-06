/**
 * Opt-in REAL smoke harness for upstream CLIs launched through `omniroute run`.
 *
 * Deterministic regression for the launch plans lives in
 * `tests/unit/cli/run-command.test.ts` (dry-run plans) and
 * `tests/unit/cli/run-execution.test.ts` (child-process isolation). This file
 * exercises the REAL binaries against a REAL OmniRoute server and therefore:
 *
 *   - NEVER runs automatically: every sub-test skips unless RUN_CLI_SMOKE=1;
 *   - NEVER ships or prints credentials: the API key is passed by env-var NAME
 *     (`--api-key-env`), values are never logged, and assertions only inspect
 *     exit codes and redacted output classes;
 *   - classifies failures as binary-missing / server-unreachable / auth /
 *     upstream instead of a bare boolean.
 *
 * Operator usage (all knobs are env vars — no secrets on the command line):
 *
 *   RUN_CLI_SMOKE=1 \
 *   OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
 *   OMNIROUTE_SMOKE_MODEL="<provider/model>" \
 *   OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
 *   node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
 *
 * Optional: OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen" restricts the sweep;
 * OMNIROUTE_SMOKE_TIMEOUT_MS overrides the per-target timeout (default 120s).
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ENABLED = process.env.RUN_CLI_SMOKE === "1";
const BASE_URL = (process.env.OMNIROUTE_SMOKE_BASE_URL || "http://localhost:20128").replace(
  /\/+$/,
  ""
);
const MODEL = process.env.OMNIROUTE_SMOKE_MODEL || "";
const API_KEY_ENV = process.env.OMNIROUTE_SMOKE_API_KEY_ENV || "OMNIROUTE_API_KEY";
const TIMEOUT_MS = Number(process.env.OMNIROUTE_SMOKE_TIMEOUT_MS || 120_000);

const CLI_ENTRY = fileURLToPath(new URL("../../bin/omniroute.mjs", import.meta.url));

/** One-shot, non-interactive invocation per target. Prompts are inert. */
const SMOKE_TARGETS: Record<string, { args: string[] }> = {
  codex: { args: ["exec", "--skip-git-repo-check", "reply with the single word OK"] },
  aider: { args: ["--message", "reply with the single word OK", "--no-git", "--yes-always"] },
  goose: { args: ["run", "-t", "reply with the single word OK"] },
  opencode: { args: ["run", "reply with the single word OK"] },
  qwen: { args: ["-p", "reply with the single word OK"] },
  gemini: { args: ["--skip-trust", "-p", "reply with the single word OK"] },
};

function selectedTargets(): string[] {
  const filter = String(process.env.OMNIROUTE_SMOKE_TARGETS || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const all = Object.keys(SMOKE_TARGETS);
  return filter.length ? all.filter((t) => filter.includes(t)) : all;
}

function binaryAvailable(target: string): boolean {
  try {
    execFileSync("sh", ["-c", 'command -v -- "$1"', "sh", target], {
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 5000,
    });
    return true;
  } catch {
    return false;
  }
}

async function serverReachable(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/monitoring/health`, {
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Redact anything that looks like a secret before recording output. */
function redact(text: string): string {
  return text
    .replace(/(sk|pk|rk)[-_][A-Za-z0-9_-]{8,}/g, "[redacted-key]")
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, "Bearer [redacted]")
    .slice(0, 2000);
}

type SmokeResult = {
  exitCode: number | null;
  stdout: string;
  stderr: string;
  classification: "pass" | "auth" | "upstream" | "config" | "unknown";
};

function classify(exitCode: number | null, output: string): SmokeResult["classification"] {
  if (exitCode === 0) return "pass";
  if (/401|403|unauthorized|invalid[_ ]api[_ ]key/i.test(output)) return "auth";
  if (/5\d\d|upstream|overloaded|rate.?limit|429/i.test(output)) return "upstream";
  if (/not found|unknown model|unsupported|invalid (option|argument)/i.test(output)) {
    return "config";
  }
  return "unknown";
}

function runSmoke(target: string): Promise<SmokeResult> {
  const spec = SMOKE_TARGETS[target];
  const args = [
    CLI_ENTRY,
    "run",
    target,
    "--base-url",
    BASE_URL,
    "--api-key-env",
    API_KEY_ENV,
    ...(MODEL ? ["--model", MODEL] : []),
    "--",
    ...spec.args,
  ];

  return new Promise((resolve) => {
    const child = spawn(process.execPath, args, {
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (c) => (stdout += String(c)));
    child.stderr.on("data", (c) => (stderr += String(c)));
    const timer = setTimeout(() => child.kill("SIGKILL"), TIMEOUT_MS);
    // Resolve on "exit", not "close": some CLIs leave grandchildren holding the
    // stdio pipes after the parent dies, and "close" would wait on them forever.
    child.on("exit", (code) => {
      clearTimeout(timer);
      setTimeout(() => {
        const combined = redact(stdout + "\n" + stderr);
        resolve({
          exitCode: code,
          stdout: redact(stdout),
          stderr: redact(stderr),
          classification: classify(code, combined),
        });
      }, 250); // small grace period to flush buffered output
    });
  });
}

// NOTE: node:test treats `timeout: 0` as "time out immediately", not "no
// timeout" — size the budget from the per-target cap instead.
const SWEEP_TIMEOUT_MS = (Object.keys(SMOKE_TARGETS).length + 1) * (TIMEOUT_MS + 30_000);

test(
  "upstream CLI smoke sweep (opt-in via RUN_CLI_SMOKE=1)",
  { timeout: SWEEP_TIMEOUT_MS },
  async (t) => {
    if (!ENABLED) {
      t.skip("RUN_CLI_SMOKE!=1 — real smoke is operator opt-in, never automatic");
      return;
    }
    assert.ok(MODEL, "OMNIROUTE_SMOKE_MODEL must name the provider/model to exercise");
    assert.ok(
      process.env[API_KEY_ENV] !== undefined,
      `credential env var '${API_KEY_ENV}' must exist (value is never printed)`
    );
    assert.ok(await serverReachable(), `OmniRoute is not reachable at ${BASE_URL}`);

    for (const target of selectedTargets()) {
      await t.test(`smoke: ${target}`, async (st) => {
        if (!binaryAvailable(target)) {
          st.skip(`binary '${target}' not installed on this machine`);
          return;
        }
        const result = await runSmoke(target);
        st.diagnostic(`${target}: exit=${result.exitCode} class=${result.classification}`);
        assert.equal(
          result.classification,
          "pass",
          `${target} smoke failed (exit=${result.exitCode}, class=${result.classification}).\n` +
            `stderr (redacted): ${result.stderr.slice(0, 500)}`
        );
      });
    }
  }
);
