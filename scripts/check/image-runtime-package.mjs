#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { assemblePathSanitize } from "../build/assembleStandalone.mjs";
import { verifyImageArtifact } from "./image-artifact.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
assert.equal(process.platform, "win32", "Windows hosted packaging only");
assert.equal(process.env.GITHUB_ACTIONS, "true", "Local builds are not authorized");
// The hosted workspace drive may fail SWC's ancestor ownership checks.
const compilerCache = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-image-swc-"));
const work = path.join(root, ".ci-work/windows-runtime");
const home = path.join(work, "home");
const temp = path.join(work, "temp");
const env = Object.fromEntries(
  ["PATH", "Path", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT"]
    .filter((key) => process.env[key])
    .map((key) => [key, process.env[key]])
);
Object.assign(env, {
  CI: "true",
  GITHUB_ACTIONS: "true",
  HOME: home,
  USERPROFILE: home,
  APPDATA: path.join(home, "AppData/Roaming"),
  LOCALAPPDATA: path.join(home, "AppData/Local"),
  DATA_DIR: path.join(work, "data"),
  TEMP: temp,
  TMP: temp,
  TMPDIR: temp,
  npm_config_cache: path.join(work, "npm-cache"),
  HUSKY: "0",
  OMNIROUTE_SKIP_POSTINSTALL: "1",
  OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
  OMNIROUTE_SKIP_DNS_WRITE: "1",
  ADOBE_FIREFLY_BROWSER_REFRESH: "0",
  NEXT_TELEMETRY_DISABLED: "1",
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1",
  OMNIROUTE_USE_TURBOPACK: "0",
  NEXT_DIST_DIR: ".build/next",
  OMNIROUTE_BUILD_MEMORY_MB: "8192",
  NODE_OPTIONS: "--max-old-space-size=8192",
  OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "true",
  OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK: "true",
  SWC_NATIVE_BINDING_CACHE: compilerCache,
});

async function run(label, args, wall, idle) {
  const npm = path.join(path.dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");
  await fs.access(npm);
  const child = spawn(process.execPath, [npm, ...args], {
    cwd: root,
    env,
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let failure;
  let idleTimer;
  const kill = (reason) => {
    if (failure) return;
    failure = new Error(`${label}: ${reason}`);
    if (child.pid)
      spawn("taskkill.exe", ["/PID", String(child.pid), "/T", "/F"], {
        windowsHide: true,
        stdio: "ignore",
      });
  };
  const progress = (data) => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => kill("idle timeout"), idle * 1000);
    process.stderr.write(data);
  };
  const wallTimer = setTimeout(() => kill("wall timeout"), wall * 1000);
  idleTimer = setTimeout(() => kill("idle timeout"), idle * 1000);
  child.stdout.on("data", progress);
  child.stderr.on("data", progress);
  console.error(
    `[${new Date().toISOString()}] [INFO] [runtime-package] start=${label} pid=${child.pid}`
  );
  try {
    const code = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    });
    if (failure) throw failure;
    assert.equal(code, 0, `${label} failed`);
  } finally {
    clearTimeout(wallTimer);
    clearTimeout(idleTimer);
  }
}

try {
  for (const dir of [home, temp, env.APPDATA, env.LOCALAPPDATA, env.DATA_DIR])
    await fs.mkdir(dir, { recursive: true });
  Object.assign(process.env, env);
  await run("locked Windows install", ["ci", "--no-audit", "--no-fund"], 600, 180);
  // A child releases the native DLL before the owned cache is removed on Windows.
  const compilerAdmission = spawnSync(
    process.execPath,
    [
      "-e",
      "require('@swc/core').transformSync('const nativeBinding = 1;', { jsc: { target: 'es2022' } });",
    ],
    { cwd: root, env, windowsHide: true, stdio: "inherit", timeout: 60000 }
  );
  assert.equal(compilerAdmission.status, 0, "Native compiler cache admission failed");
  await run("full build with canonical postbuild", ["run", "build"], 1800, 600);
  const out = path.join(root, ".build/next/standalone");
  assemblePathSanitize(root, out, ".build/next");
  // Generated JSON embeds Windows paths with escaped separators; the canonical
  // sanitizer handles slash paths only. Keep the portable artifact relocatable.
  const escapedRoot = JSON.stringify(root).slice(1, -1);
  for (const relative of ["server.js", ".build/next/required-server-files.json"]) {
    const file = path.join(out, relative);
    const text = (await fs.readFile(file, "utf8")).replaceAll(escapedRoot, ".");
    assert.ok(!text.includes(escapedRoot), "Build-machine path remains in portable artifact");
    await fs.writeFile(file, text, "utf8");
  }
  await fs.writeFile(path.join(out, "BUILD_SHA"), process.env.GITHUB_SHA ?? "unknown", "utf8");
  const workers = [
    "src/lib/db/healthCheckWorker.js",
    "src/lib/usage/callLogArtifactWorker.js",
    "open-sse/services/compression/compressionWorker.js",
  ];
  for (const worker of workers) {
    const file = path.join(out, worker);
    assert.ok((await fs.stat(file)).size > 0, `Missing worker ${worker}`);
    const pkg = JSON.parse(
      await fs.readFile(path.join(path.dirname(file), "package.json"), "utf8")
    );
    assert.equal(pkg.type, "module", `Missing worker ESM scope ${worker}`);
  }
  const manifest = JSON.parse(
    await fs.readFile(path.join(out, ".build/next/server/app-paths-manifest.json"), "utf8")
  );
  assert.ok(
    Object.keys(manifest).some((route) => route.includes("dashboard") && route.endsWith("/page")),
    "Full dashboard absent"
  );
  for (const file of [
    "server-ws.mjs",
    "node_modules/sql.js/dist/sql-wasm.wasm",
    "node_modules/tiktoken/tiktoken_bg.wasm",
  ])
    assert.ok((await fs.stat(path.join(out, file))).size > 0, `Missing runtime asset ${file}`);
  const native = path.join(out, "node_modules/keytar/build/Release/keytar.node");
  const bytes = await fs.readFile(native);
  assert.equal(bytes.subarray(0, 2).toString("ascii"), "MZ", "Windows native module is not PE");
  const pkg = JSON.parse(await fs.readFile(path.join(out, "package.json"), "utf8"));
  assert.notEqual(pkg.type, "module", "Standalone server requires CommonJS root");
  await verifyImageArtifact(root);
  console.error(
    `[${new Date().toISOString()}] [INFO] [runtime-package] full Windows runtime verified`
  );
} finally {
  try {
    await fs.rm(work, { recursive: true, force: true });
  } finally {
    await fs.rm(compilerCache, { recursive: true, force: true });
  }
}
