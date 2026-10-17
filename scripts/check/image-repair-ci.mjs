#!/usr/bin/env node

import assert from "node:assert/strict";
import { verifyImageArtifact } from "./image-artifact.mjs";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const baseline = "858d6022270b73489dfa8d89eee6fcc9a6a9e214";
const work = path.join(root, ".ci-work/image-repair");
const home = path.join(work, "isolated-home");
const temp = path.join(work, "isolated-temp");
const env = {
  PATH: process.env.PATH,
  LANG: "C.UTF-8",
  CI: "true",
  GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
  HOME: home,
  USERPROFILE: home,
  APPDATA: path.join(home, "AppData/Roaming"),
  LOCALAPPDATA: path.join(home, "AppData/Local"),
  XDG_CONFIG_HOME: path.join(home, ".config"),
  XDG_CACHE_HOME: path.join(home, ".cache"),
  DATA_DIR: path.join(work, "isolated-data"),
  TMPDIR: temp,
  TMP: temp,
  TEMP: temp,
  npm_config_cache: path.join(work, "npm-cache"),
  NEXT_TELEMETRY_DISABLED: "1",
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
  OMNIROUTE_SKIP_DNS_WRITE: "1",
  ADOBE_FIREFLY_BROWSER_REFRESH: "0",
  OMNIROUTE_BUILD_BACKEND_ONLY: "1",
  OMNIROUTE_USE_TURBOPACK: "0",
  NEXT_DIST_DIR: ".build/next",
  OMNIROUTE_MAX_TEST_WORKERS: "2",
};

function log(level, message) {
  console.error(`[${new Date().toISOString()}] [${level}] [image-repair-ci] ${message}`);
}

function signalGroup(pid, signal) {
  try {
    process.kill(-pid, signal);
    return true;
  } catch (error) {
    if (error.code === "ESRCH") return false;
    throw error;
  }
}

async function sweep(pid) {
  if (!signalGroup(pid, 0)) return;
  signalGroup(pid, "SIGKILL");
  const deadline = Date.now() + 3000;
  while (signalGroup(pid, 0)) {
    if (Date.now() >= deadline) throw new Error(`Owned process group ${pid} survived cleanup`);
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function run(label, command, args, wall = 240, idle = 60, capture = false) {
  log("INFO", `start=${label} wall=${wall}s idle=${idle}s`);
  const child = spawn(command, args, {
    cwd: root,
    env,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
    timeout: wall * 1000,
  });
  const started = Date.now();
  let output = "";
  let failure;
  let escalation;
  let idleTimer;
  const terminate = (reason) => {
    if (failure) return;
    failure = new Error(`${label}: ${reason}`);
    if (child.pid) signalGroup(child.pid, "SIGTERM");
    escalation = setTimeout(() => {
      if (child.pid) signalGroup(child.pid, "SIGKILL");
    }, 2000);
  };
  const resetIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => terminate(`idle timeout after ${idle}s`), idle * 1000);
  };
  const onInterrupt = (signal) => terminate(`cancelled by ${signal}`);
  const onSigint = () => onInterrupt("SIGINT");
  const onSigterm = () => onInterrupt("SIGTERM");
  const wallTimer = setTimeout(() => terminate(`wall timeout after ${wall}s`), wall * 1000);
  resetIdle();
  process.on("SIGINT", onSigint);
  process.on("SIGTERM", onSigterm);
  child.stdout.on("data", (data) => {
    resetIdle();
    if (capture) output += data.toString("utf8");
    else process.stdout.write(data);
  });
  child.stderr.on("data", (data) => {
    resetIdle();
    process.stderr.write(data);
  });
  try {
    const result = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", (code, signal) => resolve({ code, signal }));
    });
    if (failure) throw failure;
    if (result.code !== 0) throw new Error(`${label}: exit=${result.code} signal=${result.signal}`);
    log("INFO", `complete=${label} duration=${((Date.now() - started) / 1000).toFixed(1)}s`);
    return output;
  } finally {
    clearTimeout(wallTimer);
    clearTimeout(idleTimer);
    clearTimeout(escalation);
    process.off("SIGINT", onSigint);
    process.off("SIGTERM", onSigterm);
    if (child.pid) await sweep(child.pid);
  }
}

function offline(command, args) {
  // Set up loopback as root, then drop back to the runner before executing project code.
  const script =
    'uid="$1"; gid="$2"; shift 2; ip link set lo up; exec setpriv --reuid "$uid" --regid "$gid" --clear-groups -- "$@"';
  return [
    "sudo",
    [
      "-n",
      "unshare",
      "--net",
      "--",
      "/bin/bash",
      "-euc",
      script,
      "image-ci",
      String(process.getuid()),
      String(process.getgid()),
      "/usr/bin/env",
      "-i",
      ...Object.entries(env).map(([key, value]) => `${key}=${value}`),
      command,
      ...args,
    ],
  ];
}

async function changedSources() {
  const tracked = await run(
    "discover changed roots",
    "git",
    ["diff", "--name-only", "--diff-filter=ACMR", "-z", baseline, "--"],
    30,
    15,
    true
  );
  const added = await run(
    "discover new roots",
    "git",
    ["ls-files", "--others", "--exclude-standard", "-z"],
    30,
    15,
    true
  );
  return [
    ...new Set(
      `${tracked}\0${added}`
        .split("\0")
        .filter((file) => /^(src|open-sse|tests)\//.test(file) && /\.(?:[cm]?[jt]sx?)$/.test(file))
    ),
  ].sort();
}

async function typecheck() {
  const { default: ts } = await import("typescript");
  const files = JSON.parse(await fs.readFile(path.join(work, "roots.json"), "utf8"));
  const configPath = path.join(root, "tsconfig.json");
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error)
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const declarations = [
    ...parsed.fileNames.filter((file) => file.endsWith(".d.ts")),
    path.join(root, "open-sse/types.d.ts"),
  ];
  const program = ts.createProgram(
    [...files.map((file) => path.join(root, file)), ...declarations],
    {
      ...parsed.options,
      noCheck: false,
      noEmit: true,
      incremental: false,
    }
  );
  const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
  if (diagnostics.length) {
    console.error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (file) => file,
        getCurrentDirectory: () => root,
        getNewLine: () => "\n",
      })
    );
    throw new Error(
      `Changed-root compiler: ${diagnostics.length} diagnostics (including transitive imports)`
    );
  }
  log("INFO", `compiler roots=${files.length} noCheck=false strict=${parsed.options.strict}`);
}

const regressionFiles = [
  "10197-openrouter-image-edits-route.test.ts",
  "codex-free-plan-image-generation.test.ts",
  "codex-images-dedicated-endpoint.test.ts",
  "codex-spark-image-generation.test.ts",
  "hard-session-lease-bypass-inventory.test.ts",
  "proxySubscription.parse.test.ts",
  "image-normalize.test.ts",
  "image-accounting-adapters.test.ts",
  "image-usage-accounting.test.ts",
  "t42-image-size-to-aspect-ratio.test.ts",
  "fal-image-edit.test.ts",
  "fal-image-generation-default.test.ts",
  "nanobanana-image-handler.test.ts",
  "muse-image-provider.test.ts",
  "nan-provider.test.ts",
  "combo/image-combo.test.ts",
  "combo/image-combo-empty-200-fallback.test.ts",
];

async function focusedTests(roots) {
  const all = await fs.readdir(path.join(root, "tests/unit"));
  const selected = all
    .filter(
      (file) =>
        /^(?:native-(?:codex|antigravity|image)|antigravity-image-|image-(?:generation|edits|credential|registry|routes|combo-edits|upscale-error))/.test(
          file
        ) && file.endsWith(".test.ts")
    )
    .map((file) => `tests/unit/${file}`);
  for (const file of regressionFiles) {
    await fs.access(path.join(root, "tests/unit", file));
    selected.push(`tests/unit/${file}`);
  }
  for (const file of roots.filter((file) => /^tests\/.*\.test\.(?:ts|mjs)$/.test(file)))
    selected.push(file);
  const files = [...new Set(selected)].sort();
  assert.ok(files.length > 0, "No focused image suites discovered");
  log("INFO", `focused suites=${files.length} workers=2 native timeout=120s/file`);
  for (const file of files) log("INFO", `suite=${file}`);
  const args = [
    "--import",
    "tsx/esm",
    "--import",
    "./tests/_setup/isolateDataDir.ts",
    "--import",
    "./open-sse/utils/setupPolyfill.ts",
    "--test",
    "--test-timeout=120000",
    "--test-concurrency=1",
    "--test-reporter=spec",
  ];
  const lifecycleSuites = new Set(
    [
      "10197-openrouter-image-edits-route.test.ts",
      "combo/image-combo.test.ts",
      "combo/image-combo-empty-200-fallback.test.ts",
      "fal-image-edit.test.ts",
      "fal-image-generation-default.test.ts",
      "image-combo-edits-fallback-12547.test.ts",
      "image-edits-multipart-3273.test.ts",
      "image-generation-fetch-timeout.test.ts",
      "image-generation-handler.test.ts",
      "image-generation-route-auth.test.ts",
      "image-generation-route.test.ts",
      "image-generation-resilience.test.ts",
      "image-generation-proxy.test.ts",
      "image-generation-n-fanout.test.ts",
      "image-accounting-adapters.test.ts",
      "image-usage-accounting.test.ts",
      "codex-images-dedicated-endpoint.test.ts",
      "image-generation-size-and-payload-guard.test.ts",
      "image-routes-combo-edits-3214-3215.test.ts",
      "image-upscale-error-log.test.ts",
      "nanobanana-image-handler.test.ts",
      "t42-image-size-to-aspect-ratio.test.ts",
    ].map((file) => `tests/unit/${file}`)
  );
  // A preload also runs in the native parent. One file per invocation prevents its
  // DATA_DIR from being inherited by multiple workers; run at most two invocations.
  const workspace = path.join(root, ".ci-work");
  const before = new Set(await fs.readdir(workspace));
  const deadline = Date.now() + 240_000;
  try {
    for (let index = 0; index < files.length; index += 2) {
      const remaining = Math.ceil((deadline - Date.now()) / 1000);
      if (remaining <= 0) throw new Error("Focused image bucket exceeded wall timeout of 240s");
      const results = await Promise.allSettled(
        files.slice(index, index + 2).map((file) => {
          const lifecycle = lifecycleSuites.has(file)
            ? ["--import", "./tests/_setup/imageCallLogLifecycle.ts"]
            : [];
          return run(
            file,
            ...offline("/usr/bin/env", [
              "-u",
              "DATA_DIR",
              process.execPath,
              ...args,
              ...lifecycle,
              file,
            ]),
            remaining,
            60
          );
        })
      );
      const failed = results.filter((result) => result.status === "rejected");
      if (failed.length)
        throw new AggregateError(
          failed.map((result) => result.reason),
          failed.map((result) => result.reason.message).join("; ")
        );
    }
  } finally {
    for (const name of await fs.readdir(workspace)) {
      if (name.startsWith("isolated-") && !before.has(name)) {
        await fs.rm(path.join(workspace, name), { recursive: true, force: true });
      }
    }
  }
}

async function main() {
  assert.equal(process.platform, "linux", "This entry point is hosted Ubuntu-only");
  assert.equal(process.env.GITHUB_ACTIONS, "true", "Local process execution is not authorized");
  for (const dir of [home, temp, env.APPDATA, env.LOCALAPPDATA, env.DATA_DIR]) {
    await fs.mkdir(dir, { recursive: true });
  }
  Object.assign(process.env, env);
  if (process.argv[2] === "--typecheck") return typecheck();
  try {
    await run("locked npm install", "npm", ["ci", "--no-audit", "--no-fund"], 480, 180);
    await run(
      "runner syntax",
      process.execPath,
      ["--check", fileURLToPath(import.meta.url)],
      30,
      15
    );
    const roots = await changedSources();
    assert.ok(roots.length > 0, "No changed/new source roots found against repair baseline");
    await fs.writeFile(path.join(work, "roots.json"), JSON.stringify(roots), "utf8");
    for (const file of roots) log("INFO", `compiler/lint root=${file}`);
    await run(
      "changed-root TypeScript",
      process.execPath,
      [fileURLToPath(import.meta.url), "--typecheck"],
      240,
      120
    );
    await run(
      "changed-source ESLint",
      process.execPath,
      [
        "node_modules/eslint/bin/eslint.js",
        "--suppressions-location",
        "config/quality/eslint-suppressions.json",
        "--pass-on-unpruned-suppressions",
        ...roots,
      ],
      240,
      120
    );
    await focusedTests(roots);
    await run(
      "backend standalone build",
      ...offline(
        process.execPath,
        // Hosted cold builds measured260-394s and webpack can be quiet during compilation.
        ["scripts/build/build-next-isolated.mjs"]
      ),
      900,
      450
    );
    await verifyImageArtifact(root);
  } finally {
    await fs.rm(work, { recursive: true, force: true });
  }
}

try {
  await main();
} catch (error) {
  log("ERROR", error.message);
  process.exitCode = 1;
}
