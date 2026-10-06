#!/usr/bin/env node
/**
 * scripts/ops/deploy-canary.mjs — ship a packaged artifact to a canary host and PROVE it works.
 *
 * Replaces the manual build → pack → scp → `npm i -g` → `pm2 restart` sequence that caused
 * the 2026-08-14 gateway outage (#10429): the package installed there had been built from a
 * feature branch predating #10373, the process came up healthy, and every request returned
 * `502 … Executor result must contain a Response` until a human noticed.
 *
 * The policy lives in `deployCanary.ts` (pure, unit-tested); this file is the thin shell
 * that performs the side effects and rolls back when the smoke fails.
 *
 * Usage:
 *   node scripts/ops/deploy-canary.mjs --host root@192.168.0.17 --tarball ./omniroute-3.8.50.tgz \
 *        --base-url http://192.168.0.17:20128 --model cx/gpt-5.6-terra --model qct/deepseek-v4-flash-0731
 *
 * Flags:
 *   --host       ssh target (required)
 *   --tarball    local tarball produced by `npm run build:release && npm pack` (required)
 *   --base-url   http base of the deployed gateway (required)
 *   --model      completion probe target; repeatable, at least one required
 *   --pm2-app    process-manager app name (default: omniroute)
 *   --dry-run    print the plan and the remote steps, change nothing
 *
 * Env:
 *   OMNIROUTE_RELEASE_REF        ref to check ancestry against (default origin/main)
 *   OMNIROUTE_ALLOW_CANARY_BUILD set to 1 to deploy an artifact that is not on the release line
 *   OMNIROUTE_SMOKE_API_KEY      sent as Authorization: Bearer when the gateway requires auth
 */

import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

import {
  buildRemoteSteps,
  classifyInstallOutcome,
  evaluateSmoke,
  planCanaryDeploy,
} from "./deployCanary.ts";
import { makeGitAncestryProbe, readBuildSha } from "../build/buildProvenance.ts";

function parseArgs(argv) {
  const args = { models: [], pm2App: "omniroute", dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === "--host") args.host = value;
    else if (flag === "--tarball") args.tarball = value;
    else if (flag === "--base-url") args.baseUrl = value;
    else if (flag === "--model") args.models.push(value);
    else if (flag === "--pm2-app") args.pm2App = value;
    else if (flag === "--dry-run") args.dryRun = true;
  }
  return args;
}

function fail(message) {
  console.error(`\n❌ ${message}`);
  process.exit(1);
}

function run(step) {
  console.log(`\n▶ ${step.name}: ${step.description}`);
  const [command, ...rest] = step.argv;
  return execFileSync(command, rest, { encoding: "utf8" }).trim();
}

/**
 * Like `run`, but never throws: returns the exit code plus both streams. Used for the
 * install, whose exit code does not decide the outcome (see classifyInstallOutcome) and
 * whose stderr must reach the log — it used to be swallowed by execFileSync throwing.
 */
function runCapturing(step) {
  console.log(`\n▶ ${step.name}: ${step.description}`);
  const [command, ...rest] = step.argv;
  const result = spawnSync(command, rest, { encoding: "utf8" });
  return {
    exitCode: result.status ?? 1,
    stdout: (result.stdout || "").trim(),
    stderr: (result.stderr || "").trim(),
  };
}

async function probeHealth(baseUrl) {
  try {
    const response = await fetch(new URL("/api/monitoring/health", baseUrl), {
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return { ok: false, buildSha: null };
    const body = await response.json();
    return {
      ok: body?.status === "healthy",
      buildSha: body?.system?.buildSha ?? null,
    };
  } catch {
    return { ok: false, buildSha: null };
  }
}

async function probeCompletion(baseUrl, model, apiKey) {
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  try {
    const response = await fetch(new URL("/v1/chat/completions", baseUrl), {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "reply with: ok" }],
        max_tokens: 16,
      }),
      signal: AbortSignal.timeout(120_000),
    });
    // A 2xx alone is not enough: the outage this script exists for returned a body-level
    // failure. Require a parseable completion with at least one choice.
    const body = await response.json().catch(() => null);
    const ok = response.ok && Array.isArray(body?.choices) && body.choices.length > 0;
    return { model, ok, status: response.status };
  } catch {
    return { model, ok: false, status: 0 };
  }
}

const args = parseArgs(process.argv.slice(2));
if (!args.host) fail("--host is required");
if (!args.tarball) fail("--tarball is required");
if (!args.baseUrl) fail("--base-url is required");
if (args.models.length === 0) {
  fail("at least one --model is required — a health check cannot see a broken egress path");
}

const repoRoot = process.cwd();
const localBuildSha = readBuildSha(repoRoot);
const plan = planCanaryDeploy({
  buildSha: localBuildSha,
  isAncestorOfRelease: makeGitAncestryProbe(
    process.env.OMNIROUTE_RELEASE_REF || "origin/main",
    repoRoot
  ),
  allowCanary: process.env.OMNIROUTE_ALLOW_CANARY_BUILD === "1",
});

console.log(`[provenance] ${plan.reason}`);
if (!plan.proceed) fail("refusing to deploy an artifact that cannot be traced to the release line");

const remoteTarball = path.posix.join("/root", path.basename(args.tarball));
const steps = buildRemoteSteps({
  host: args.host,
  tarballPath: remoteTarball,
  pm2App: args.pm2App,
});

if (args.dryRun) {
  console.log("\n--dry-run: nothing will be changed. Planned steps:");
  console.log(`  scp ${args.tarball} ${args.host}:${remoteTarball}`);
  for (const step of steps) console.log(`  ${step.argv.join(" ")}`);
  console.log(`  probes: health + ${args.models.join(", ")}`);
  process.exit(0);
}

let previousSha = null;
try {
  const [capture, install, restart, verify] = steps;

  previousSha = run(capture);
  console.log(`   previous BUILD_SHA: ${previousSha || "(none)"}`);

  console.log(`\n▶ upload: ${args.tarball} → ${args.host}:${remoteTarball}`);
  execFileSync("scp", [args.tarball, `${args.host}:${remoteTarball}`], { stdio: "inherit" });

  const installResult = runCapturing(install);
  const outcome = classifyInstallOutcome({
    exitCode: installResult.exitCode,
    stderr: installResult.stderr,
    installedSha: run(verify),
    expectedSha: localBuildSha,
  });
  if (!outcome.installed) {
    if (installResult.stderr) console.error(installResult.stderr);
    fail(`install did not land: ${outcome.reason}`);
  }
  if (outcome.kind === "installed-with-cleanup-failure") {
    console.warn(`   ⚠️  ${outcome.reason}`);
  } else {
    console.log(`   ${outcome.reason}`);
  }

  run(restart);

  const installedSha = run(verify);
  console.log(`   installed BUILD_SHA: ${installedSha}`);

  // Give the process a moment to bind before probing.
  await new Promise((resolve) => setTimeout(resolve, 15_000));

  const health = await probeHealth(args.baseUrl);
  const completions = [];
  for (const model of args.models) {
    const probe = await probeCompletion(args.baseUrl, model, process.env.OMNIROUTE_SMOKE_API_KEY);
    console.log(`   probe ${probe.model}: ${probe.ok ? "ok" : `FAILED (${probe.status})`}`);
    completions.push(probe);
  }

  const verdict = evaluateSmoke({ healthOk: health.ok, completions });
  if (!verdict.ok) {
    console.error(`\n❌ smoke failed: ${verdict.reason}`);
    if (previousSha) {
      console.error(
        `\n⚠️  ROLLBACK REQUIRED — the previous artifact was ${previousSha}. This script does ` +
          "not keep old tarballs, so reinstall that build and restart:\n" +
          `   ssh ${args.host} npm install -g <tarball-for-${previousSha}> --no-audit --no-fund\n` +
          `   ssh ${args.host} pm2 restart ${args.pm2App} --update-env`
      );
    }
    process.exit(1);
  }

  console.log(`\n✅ ${verdict.reason}`);
  console.log(`   deployed BUILD_SHA: ${installedSha}`);
  if (health.buildSha && health.buildSha !== installedSha) {
    console.warn(
      `\n⚠️  health reports buildSha ${health.buildSha} but the package says ${installedSha} — ` +
        "the process may still be serving the old artifact."
    );
  }
} catch (error) {
  fail(`deploy aborted: ${error.message}`);
}
