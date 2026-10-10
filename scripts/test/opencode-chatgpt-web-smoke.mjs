#!/usr/bin/env node
/**
 * Live smoke test: OpenCode → OmniRoute → chatgpt-web (clean-room browser transport).
 *
 * Why a script and not a unit test: this exercises a real logged-in ChatGPT session through a
 * real browser, which CI cannot do (see AGENTS.md → Testing → "Bug fix / issue triage protocol",
 * real-environment branch, and the OpenCode E2E acceptance criterion in issue #14375).
 *
 * Usage:
 *   node scripts/test/opencode-chatgpt-web-smoke.mjs
 *   npm run test:opencode:smoke
 *   node scripts/test/opencode-chatgpt-web-smoke.mjs --dry-run          # preflight only
 *   node scripts/test/opencode-chatgpt-web-smoke.mjs --task "..." --timeout 420
 *   node scripts/test/opencode-chatgpt-web-smoke.mjs --expect-file out/index.html
 *   node scripts/test/opencode-chatgpt-web-smoke.mjs --format default   # human-readable stream
 *
 * Flags:
 *   --model <p/m>     OpenCode model id            (default omniroute/chatgpt-web/gpt-5.6-luna-free)
 *   --task <text>     Prompt sent to OpenCode      (default: the #14375 index.html repro)
 *   --dir <path>      Working dir for the run      (default: a fresh temp dir)
 *   --expect-file <f> File that must exist after   (default: index.html)
 *   --timeout <sec>   Hard wall clock              (default 420)
 *   --format <f>      default | json               (default json, easier to assert on)
 *   --dry-run         Preflight checks only, no model call
 *   --keep            Keep the working dir on success (it is always kept on failure)
 *   --attach <url>    Pass through to `opencode run --attach`
 *
 * Exit codes: 0 pass · 1 assertion/timeout failure · 2 preflight failure.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

const DEFAULTS = {
  model: "omniroute/chatgpt-web/gpt-5.6-luna-free",
  task: "Use multiple tools to inspect and then create index.html. Actually execute both tool calls.",
  expectFile: "index.html",
  timeout: 420,
  format: "json",
  baseUrl: "http://localhost:20128",
};

function parseArgv(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      out._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      out[key] = true;
    } else {
      out[key] = next;
      i += 1;
    }
  }
  return out;
}

const args = parseArgv(process.argv.slice(2));
const model = typeof args.model === "string" ? args.model : DEFAULTS.model;
const task = typeof args.task === "string" ? args.task : DEFAULTS.task;
const expectFile =
  typeof args["expect-file"] === "string" ? args["expect-file"] : DEFAULTS.expectFile;
const timeoutSec = Number(args.timeout ?? DEFAULTS.timeout);
const format = typeof args.format === "string" ? args.format : DEFAULTS.format;
const baseUrl = typeof args["base-url"] === "string" ? args["base-url"] : DEFAULTS.baseUrl;
const dryRun = Boolean(args["dry-run"]);
const keep = Boolean(args.keep);

/**
 * `~/…` must be expanded here: a literal leading `~` makes Node create a directory of that name
 * under the current working directory, which puts the workspace inside OmniRoute's own git repo —
 * OpenCode then resolves the project root to OmniRoute and applies patches there instead of the
 * requested directory.
 */
function expandHome(value) {
  if (value === "~") return homedir();
  if (value.startsWith("~/")) return join(homedir(), value.slice(2));
  return resolve(value);
}

const workDir =
  typeof args.dir === "string"
    ? expandHome(args.dir)
    : join(tmpdir(), `omniroute-opencode-smoke-${Date.now().toString(36)}`);

const log = (message) => console.log(message);
const fail = (message) => {
  console.error(`\n✖ ${message}`);
};

/** Preflight: the three things that make this test meaningful. */
async function preflight() {
  const problems = [];

  // 1. OmniRoute reachable and healthy.
  try {
    const response = await fetch(`${baseUrl}/api/health`, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) problems.push(`${baseUrl}/api/health returned ${response.status}`);
    else log(`✓ OmniRoute healthy at ${baseUrl}`);
  } catch (error) {
    problems.push(
      `OmniRoute not reachable at ${baseUrl} (${error.message}) — start it with npm run dev`
    );
  }

  // 2. OpenCode usable.
  const opencode = await runCapture("opencode", ["--version"], { timeoutMs: 10_000 }).catch(
    () => null
  );
  if (!opencode || opencode.code !== 0) problems.push("`opencode` not found on PATH");
  else log(`✓ opencode ${opencode.stdout.trim()}`);

  // 3. The provider/model must exist in OpenCode's config, otherwise the run fails for an
  //    unrelated reason and the smoke result is meaningless.
  const configs = [
    join(homedir(), ".config", "opencode", "opencode.jsonc"),
    join(homedir(), ".config", "opencode", "opencode.json"),
  ];
  const provider = model.split("/")[0];
  const found = configs.filter(
    (file) => existsSync(file) && readFileSync(file, "utf8").includes(`"${provider}"`)
  );
  if (found.length === 0) {
    problems.push(
      `provider "${provider}" is not configured in ${configs.map((f) => f.replace(homedir(), "~")).join(" or ")} — ` +
        `generate it with: omniroute config opencode --base-url ${baseUrl} --api-key <key>`
    );
  } else {
    const text = readFileSync(found[0], "utf8");
    if (!text.includes(model.slice(provider.length + 1))) {
      problems.push(`model "${model}" is not listed under provider "${provider}" in ${found[0]}`);
    } else {
      log(`✓ ${model} configured in ${found[0].replace(homedir(), "~")}`);
    }
  }

  return problems;
}

function runCapture(command, argv, { timeoutMs }) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, argv, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`${command} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

/** Run OpenCode, streaming nothing but recording NDJSON events and timing. */
function runOpenCode() {
  return new Promise((resolve) => {
    const argv = ["run", "-m", model, "--format", format, task];
    if (typeof args.attach === "string") argv.push("--attach", args.attach);
    const started = Date.now();
    // OpenCode resolves its project from PWD, which the shell exports and a child process
    // inherits — so setting only `cwd` left it operating on the launching directory (it applied
    // patches into the OmniRoute checkout instead of the requested workspace).
    const child = spawn("opencode", argv, {
      cwd: workDir,
      env: { ...process.env, PWD: workDir },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let killed = false;
    const timer = setTimeout(() => {
      killed = true;
      child.kill("SIGKILL");
    }, timeoutSec * 1000);
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr, durationMs: Date.now() - started, killed });
    });
  });
}

/** NDJSON → tallies. `opencode run --format json` emits one JSON object per line. */
function summarizeEvents(stdout) {
  const summary = { events: 0, steps: 0, tools: 0, errors: [], texts: [], unparsed: 0 };
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let event;
    try {
      event = JSON.parse(trimmed);
    } catch {
      summary.unparsed += 1;
      continue;
    }
    summary.events += 1;
    if (event.type === "step_start") summary.steps += 1;
    if (event.type === "tool") summary.tools += 1;
    if (event.type === "text" && typeof event.part?.text === "string")
      summary.texts.push(event.part.text);
    if (event.type === "error") {
      const raw = event.error?.data?.message ?? event.error?.message ?? JSON.stringify(event.error);
      summary.errors.push(String(raw).slice(0, 400));
    }
  }
  return summary;
}

/** Last CHATGPT-WEB lines from the OmniRoute application log — the useful server-side trail. */
function serverTrail(limit = 12) {
  const file = join(homedir(), ".omniroute", "logs", "application", "app.log");
  if (!existsSync(file)) return [];
  const text = readFileSync(file, "utf8");
  return text
    .split("\n")
    .filter((line) => /CHATGPT-WEB|chatgpt-web/i.test(line))
    .slice(-limit)
    .map((line) => {
      try {
        const parsed = JSON.parse(line);
        const message = String(parsed.msg ?? parsed.message ?? "");
        return `${String(parsed.time ?? parsed.timestamp ?? "").slice(11, 23)} ${message}`
          .trim()
          .slice(0, 180);
      } catch {
        return line.slice(0, 180);
      }
    });
}

const problems = await preflight();
if (problems.length > 0) {
  for (const problem of problems) fail(problem);
  console.error("\nPreflight failed — fix the above before running the smoke test.");
  process.exit(2);
}

if (dryRun) {
  log("\n✓ dry run: preflight passed, no model call made.");
  process.exit(0);
}

mkdirSync(workDir, { recursive: true });
log(`\n▶ ${model}`);
log(`  task: ${task}`);
log(`  dir : ${workDir}`);
log(`  cap : ${timeoutSec}s\n`);

const run = await runOpenCode();
const summary = summarizeEvents(run.stdout);
const artifact = join(workDir, expectFile);
const artifactOk = existsSync(artifact) && statSync(artifact).size > 0;

log(
  `duration     : ${(run.durationMs / 1000).toFixed(1)}s${run.killed ? ` (killed at ${timeoutSec}s cap)` : ""}`
);
log(
  `events       : ${summary.events} (steps=${summary.steps}, tools=${summary.tools}, unparsed=${summary.unparsed})`
);
log(`exit code    : ${run.code}`);
log(
  `${expectFile.padEnd(13)}: ${artifactOk ? `created (${statSync(artifact).size} bytes)` : "MISSING"}`
);
if (summary.texts.length > 0) {
  log(`model text   : ${summary.texts.join(" ").slice(0, 300)}`);
}

const trail = serverTrail();
if (trail.length > 0) {
  log("\nserver trail (last chatgpt-web lines):");
  for (const line of trail) log(`  ${line}`);
}

const passed = artifactOk && summary.errors.length === 0 && !run.killed;
if (summary.errors.length > 0) {
  log("\nclient-visible errors:");
  for (const error of summary.errors) log(`  • ${error}`);
}

log("");
if (passed) {
  log(`✓ PASS — OpenCode created ${expectFile} through ChatGPT Web tool turns.`);
  if (!keep) rmSync(workDir, { recursive: true, force: true });
  process.exit(0);
}

fail("FAIL — see the summary above.");
log("  Next diagnostics:");
log("   • raw call logs   : ls -lt ~/.omniroute/call_logs/$(date +%F)/ | head");
log("   • server log      : tail -f ~/.omniroute/logs/application/app.log");
log(`   • artefacts kept  : ${workDir}`);
if (summary.errors.some((error) => /non-SSE response|app shell/i.test(error))) {
  log("   • the app-shell redirect is an upstream/session condition, not tool parsing —");
  log("     pause browser turns or give the connection a different network identity, then re-run.");
}
process.exit(1);
