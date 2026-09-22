#!/usr/bin/env node
/**
 * check:pack-boot — boot-smoke of the REAL npm tarball (#7065 class killer, WS1.2/T1).
 *
 * Three releases shipped a tarball that crashed on every boot (tls-options/3.8.41,
 * head-response-guard VPS #7040 + npm #7065) because no gate ever EXECUTED the
 * artifact: structure checks (check:pack-artifact) validate lists, not runtime.
 * This gate packs the tree, installs the tarball into a clean prefix, boots the
 * installed CLI and polls /api/monitoring/health until it proves the artifact
 * starts — regardless of WHICH packaging list drifted.
 *
 * Requires a built dist/ (run after `npm run build:cli`, e.g. in the CI
 * package-artifact job or `check:release-green --with-build`). Exit codes:
 * 0 = boots and reports the right version · 1 = boot failed · 2 = missing build.
 */
import { execFileSync, spawn } from "node:child_process";
import { createHmac } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const POLL_INTERVAL_MS = 2_000;
const BOOT_DEADLINE_MS = 240_000;
const MAX_SERVER_OUTPUT_CHARS = 1_000_000;
const SQLJS_STARTUP_MARKER = "Pre-initializing sql.js WASM";
const DEFAULT_CLI_SALT = "omniroute-cli-auth-v1";

// Dependency-based packaging (#11242): the tarball can never contain a node_modules
// path (files[] has "!**/node_modules/**" and check:pack-artifact fails on the
// segment), so sql.js must be required where a clean `npm install` of the declared
// `dependencies` places it — <packageRoot>/node_modules/sql.js — NOT under the old
// vendored dist/node_modules location. The runtime resolves the WASM the same way
// (src/lib/db/adapters/sqljsAdapter.ts → <cwd>/node_modules/sql.js/dist/sql-wasm.wasm).
export const REQUIRED_SQLJS_RUNTIME_FILES = Object.freeze([
  "node_modules/sql.js/package.json",
  "node_modules/sql.js/dist/sql-wasm.js",
  "node_modules/sql.js/dist/sql-wasm.wasm",
]);

export const REQUIRED_MACHINE_TOKEN_RUNTIME_FILES = Object.freeze([
  "node_modules/node-machine-id/package.json",
  "node_modules/node-machine-id/index.js",
]);

/** Parse `npm pack --json` output into the generated tarball filename. */
export function pickTarball(packJsonOutput) {
  const parsed = JSON.parse(packJsonOutput);
  const filename = Array.isArray(parsed) ? parsed[0]?.filename : undefined;
  if (!filename) throw new Error("npm pack --json returned no filename");
  // npm >=9 may emit scoped names with "/" — normalize to the on-disk file name.
  return filename.replace(/\//g, "-");
}

/**
 * Boot verdict: HTTP 200 + a JSON body reporting the version we just packed.
 * `status` is logged but NOT asserted — a clean install with zero providers may
 * legitimately report degraded states; the gate targets boot crashes, not health.
 */
export function evaluateBoot(httpStatus, body, expectedVersion) {
  const failures = [];
  if (httpStatus !== 200) failures.push(`health HTTP ${httpStatus} (expected 200)`);
  if (!body || typeof body !== "object") failures.push("health body is not JSON");
  else if (body.version !== expectedVersion)
    failures.push(`version "${body.version}" (expected "${expectedVersion}")`);
  return { ok: failures.length === 0, failures };
}

/** Deterministic-enough free-ish port in a range CI runners don't use. */
export function pickPort(seed = process.pid) {
  return 23000 + (seed % 4000);
}

export function findMissingSqlJsRuntimeFiles(packageRoot, exists = fs.existsSync) {
  return REQUIRED_SQLJS_RUNTIME_FILES.filter(
    (relativePath) => !exists(path.join(packageRoot, relativePath))
  );
}

export function findMissingMachineTokenRuntimeFiles(packageRoot, exists = fs.existsSync) {
  return REQUIRED_MACHINE_TOKEN_RUNTIME_FILES.filter(
    (relativePath) => !exists(path.join(packageRoot, relativePath))
  );
}

export function evaluateMachineTokenAuth({
  cliToken,
  unauthenticatedStatus,
  invalidStatus,
  authenticatedStatus,
  salt = process.env.OMNIROUTE_CLI_SALT || DEFAULT_CLI_SALT,
}) {
  const failures = [];
  if (!/^[0-9a-f]{64}$/.test(cliToken || "")) {
    failures.push("packaged CLI derived an empty or malformed machine token");
  }
  const emptyMachineIdToken = createHmac("sha256", "").update(salt).digest("hex");
  if (cliToken === emptyMachineIdToken) {
    failures.push("packaged CLI derived the public empty-machine-id token");
  }
  if (unauthenticatedStatus !== 401) {
    failures.push(`no-credential request returned ${unauthenticatedStatus} (expected 401)`);
  }
  if (invalidStatus !== 401) {
    failures.push(`invalid-token request returned ${invalidStatus} (expected 401)`);
  }
  if (authenticatedStatus !== 200) {
    failures.push(`packaged CLI token request returned ${authenticatedStatus} (expected 200)`);
  }
  return { ok: failures.length === 0, failures };
}

export function evaluateSqlJsRoundTrip({
  startupOutput,
  beforeValue,
  patchedValue,
  readBackValue,
}) {
  const failures = [];
  if (!startupOutput.includes(SQLJS_STARTUP_MARKER)) {
    failures.push("server output did not confirm the forced sql.js startup path");
  }
  if (patchedValue !== !beforeValue) {
    failures.push(
      `PATCH debugMode returned ${String(patchedValue)} (expected ${String(!beforeValue)})`
    );
  }
  if (readBackValue !== !beforeValue) {
    failures.push(
      `GET debugMode returned ${String(readBackValue)} (expected ${String(!beforeValue)})`
    );
  }
  return { ok: failures.length === 0, failures };
}

/**
 * After a clean shutdown + restart with the same DATA_DIR, the value written in boot #1
 * must be read back from disk in boot #2. sql.js is in-memory with debounced/flush writes,
 * so this proves the persisted file actually landed and the restart reads it.
 */
export function evaluateRestartPersistence({ expectedValue, restartValue }) {
  const failures = [];
  if (restartValue !== expectedValue) {
    failures.push(
      `restart GET debugMode returned ${String(restartValue)} (expected ${String(expectedValue)} after restart)`
    );
  }
  return { ok: failures.length === 0, failures };
}

async function readJsonResponse(url, options) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => null);
  return { response, body };
}

async function verifySettingsRoundTrip(baseUrl, startupOutput, cliToken) {
  const authHeaders = { "x-omniroute-cli-token": cliToken };
  const initial = await readJsonResponse(`${baseUrl}/api/settings`, { headers: authHeaders });
  if (initial.response.status !== 200 || !initial.body || typeof initial.body !== "object") {
    return {
      ok: false,
      failures: [`initial settings HTTP ${initial.response.status} or non-JSON body`],
    };
  }

  const beforeValue = initial.body.debugMode === true;
  const expectedValue = !beforeValue;
  const patched = await readJsonResponse(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({ debugMode: expectedValue }),
  });
  if (patched.response.status !== 200 || !patched.body || typeof patched.body !== "object") {
    return {
      ok: false,
      failures: [`settings PATCH HTTP ${patched.response.status} or non-JSON body`],
    };
  }

  const readBack = await readJsonResponse(`${baseUrl}/api/settings`, { headers: authHeaders });
  if (readBack.response.status !== 200 || !readBack.body || typeof readBack.body !== "object") {
    return {
      ok: false,
      failures: [`settings read-back HTTP ${readBack.response.status} or non-JSON body`],
    };
  }

  return {
    ...evaluateSqlJsRoundTrip({
      startupOutput,
      beforeValue,
      patchedValue: patched.body.debugMode,
      readBackValue: readBack.body.debugMode,
    }),
    // The exact value boot #2 must read back from disk to prove persistence.
    expectedValue,
  };
}

function log(msg) {
  console.log(`[pack-boot] ${msg}`);
}

/** Node sets exitCode/signalCode synchronously when the process dies — authoritative. */
function hasExited(child) {
  return child.exitCode !== null || child.signalCode !== null;
}

/**
 * SIGTERM the process GROUP and wait for its REAL exit — the graceful-shutdown handler
 * (initGracefulShutdown) drains requests, checkpoints the DB via closeDbInstance(), then
 * calls process.exit(0). A fixed sleep + hard kill could SIGKILL mid-flush and silently
 * drop the very persistence this gate proves, so SIGKILL is a last resort after the grace
 * deadline, and a CONFIRMED exit is required before returning: if even SIGKILL fails to
 * reap, throw, so boot #2 cannot start against a port a zombie still holds.
 *
 * The child is spawned with detached:true, so it leads its own process group and
 * -child.pid signals the whole tree, not just the launcher.
 */
async function stopChild(child, graceMs = 30_000) {
  if (!child?.pid) return;
  // Fast path: already reaped (crashed mid-smoke, or exited before this call) — nothing
  // left to signal or wait for.
  if (hasExited(child)) return;

  let onSettled;
  const exited = new Promise((resolve) => {
    onSettled = () => resolve();
    child.once("exit", onSettled);
    child.once("close", onSettled);
  });
  // Race the exit/close promise against a timeout; then re-read authoritative state, so a
  // same-tick exit that lost the race still counts. Timer is always cleared.
  const waitForExit = (ms) => {
    let timer;
    return Promise.race([
      exited,
      new Promise((resolve) => {
        timer = setTimeout(resolve, ms);
      }),
    ])
      .finally(() => clearTimeout(timer))
      .then(() => hasExited(child));
  };

  try {
    // Re-check AFTER attaching: if the process died in the gap between the fast path and
    // listener attach, once("exit") can never fire (event already emitted), and without
    // this waitForExit would burn the full grace window.
    if (hasExited(child)) return;

    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      /* group already gone */
    }
    if (await waitForExit(graceMs)) return;

    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {
      /* group already gone */
    }
    if (!(await waitForExit(5_000))) {
      throw new Error(
        `[pack-boot] server process group ${child.pid} still alive 5s after SIGKILL — ` +
          "refusing to reboot on the same port"
      );
    }
  } finally {
    child.removeListener("exit", onSettled);
    child.removeListener("close", onSettled);
  }
}

/**
 * Boot the installed CLI once on an isolated DATA_DIR. The child is spawned detached:true
 * so it leads its own process group — stopChild() relies on that to SIGTERM the whole tree.
 * The caller owns shutdown so the graceful DB flush lands before teardown.
 */
function spawnServer(binPath, port, dataDir) {
  const child = spawn(binPath, ["serve", "--port", String(port), "--log", "--no-open"], {
    env: {
      ...process.env,
      PORT: String(port),
      DATA_DIR: dataDir,
      JWT_SECRET: "pack-boot-smoke-secret-with-sufficient-length-000",
      API_KEY_SECRET: "pack-boot-smoke-api-key-secret-long",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
      OMNIROUTE_PACK_BOOT_SMOKE: "1",
      OMNIROUTE_PACK_BOOT_FORCE_SQLJS: "1",
      INITIAL_PASSWORD: "pack-boot-machine-token-auth-required",
    },
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  const tail = [];
  let retainedChars = 0;
  const keepTail = (chunk) => {
    const text = String(chunk);
    tail.push(text);
    retainedChars += text.length;
    while (retainedChars > MAX_SERVER_OUTPUT_CHARS && tail.length > 1) {
      retainedChars -= tail.shift().length;
    }
  };
  child.stdout.on("data", keepTail);
  child.stderr.on("data", keepTail);
  return { child, tail };
}

export function buildPackagedCliTokenEnv(dataDir, baseEnv = process.env) {
  return { ...baseEnv, DATA_DIR: dataDir };
}

function derivePackagedCliToken(packageRoot, dataDir) {
  const cliModuleUrl = pathToFileURL(
    path.join(packageRoot, "bin", "cli", "utils", "cliToken.mjs")
  ).href;
  return execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      "import(process.argv[1]).then(async m => process.stdout.write(await m.getCliToken()))",
      cliModuleUrl,
    ],
    { encoding: "utf8", env: buildPackagedCliTokenEnv(dataDir) }
  ).trim();
}

async function verifyMachineTokenAuth(baseUrl, cliToken) {
  const endpoint = `${baseUrl}/api/cli/whoami`;
  const unauthenticatedStatus = (await fetch(endpoint)).status;
  const invalidStatus = (
    await fetch(endpoint, { headers: { "x-omniroute-cli-token": "0".repeat(64) } })
  ).status;
  const authenticatedStatus = (
    await fetch(endpoint, { headers: { "x-omniroute-cli-token": cliToken } })
  ).status;
  return evaluateMachineTokenAuth({
    cliToken,
    unauthenticatedStatus,
    invalidStatus,
    authenticatedStatus,
  });
}

/** Poll /api/monitoring/health until the packed version answers or the boot deadline passes. */
async function waitForHealthy(port, child, expectedVersion, cliToken) {
  // Seed from authoritative state (Node sets these synchronously at death), then attach a
  // named once-listener, then re-check: a child that died before this call, or in the gap
  // before the listener attached, would otherwise never fire "exit" and waste the deadline.
  const exitDescriptor = (code, signal) => (signal ? `signal ${signal}` : `code ${code ?? -1}`);
  let childExit = hasExited(child) ? exitDescriptor(child.exitCode, child.signalCode) : null;
  const onChildExit = (code, signal) => {
    childExit = exitDescriptor(code, signal);
  };
  child.once("exit", onChildExit);
  if (hasExited(child)) {
    childExit = exitDescriptor(child.exitCode, child.signalCode);
  }

  const deadline = Date.now() + BOOT_DEADLINE_MS;
  let verdict = { ok: false, failures: ["never polled"] };
  try {
    while (Date.now() < deadline) {
      if (childExit !== null) {
        return { ok: false, failures: [`process exited (${childExit}) before serving`] };
      }
      try {
        const res = await fetch(`http://127.0.0.1:${port}/api/monitoring/health`, {
          headers: { "x-omniroute-cli-token": cliToken },
        });
        const body = await res.json().catch(() => null);
        verdict = evaluateBoot(res.status, body, expectedVersion);
        if (verdict.ok) return verdict;
      } catch {
        // not listening yet — keep polling
      }
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
    return verdict;
  } finally {
    child.removeListener("exit", onChildExit);
  }
}

/**
 * Read the current debugMode setting and return the EXACT boolean. A missing or non-boolean
 * field throws: coercing with `=== true` would read `false` for a malformed response and
 * could falsely "pass" persistence whenever the expected value happens to be false.
 */
async function readSettingsDebugMode(baseUrl, cliToken) {
  const { response, body } = await readJsonResponse(`${baseUrl}/api/settings`, {
    headers: { "x-omniroute-cli-token": cliToken },
  });
  if (response.status !== 200 || !body || typeof body !== "object") {
    throw new Error(`settings GET HTTP ${response.status} or non-JSON body`);
  }
  if (typeof body.debugMode !== "boolean") {
    throw new Error(`settings debugMode is ${typeof body.debugMode} (expected boolean)`);
  }
  return body.debugMode;
}

async function main() {
  const ROOT = process.cwd();
  if (!fs.existsSync(path.join(ROOT, "dist", "server.js"))) {
    console.error(
      "[pack-boot] dist/server.js missing — run `npm run build:cli` first (this is a --with-build gate)"
    );
    process.exit(2);
  }
  const expectedVersion = JSON.parse(
    fs.readFileSync(path.join(ROOT, "package.json"), "utf8")
  ).version;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pack-boot-"));
  let child = null;
  let tail = [];
  let exitCode = 1;
  let primaryError = null; // a smoke-logic failure: boot/PATCH/GET/restart, or an in-flow stop
  let cleanupError = null; // recorded ONLY in finally, ONLY for a final stopChild failure
  let shutdownConfirmed = false; // process group confirmed stopped → safe to rm the workspace
  try {
    log(`packing v${expectedVersion}…`);
    const packOut = execFileSync("npm", ["pack", "--json", "--pack-destination", tmp], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    const tarball = path.join(tmp, pickTarball(packOut));
    log(`installing ${path.basename(tarball)} into a clean prefix (postinstall runs for real)…`);
    const prefix = path.join(tmp, "prefix");
    execFileSync("npm", ["install", "-g", "--prefix", prefix, tarball], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    const packageRoot = path.join(prefix, "lib", "node_modules", "omniroute");
    const missingSqlJsFiles = findMissingSqlJsRuntimeFiles(packageRoot);
    if (missingSqlJsFiles.length > 0) {
      throw new Error(
        `installed package is missing the sql.js runtime contract: ${missingSqlJsFiles.join(", ")}`
      );
    }
    log("installed package contains the complete sql.js WASM runtime");
    const missingMachineTokenFiles = findMissingMachineTokenRuntimeFiles(packageRoot);
    if (missingMachineTokenFiles.length > 0) {
      throw new Error(
        `installed package is missing the node-machine-id runtime contract: ${missingMachineTokenFiles.join(", ")}`
      );
    }
    log("installed package contains the node-machine-id runtime");

    const port = pickPort();
    const dataDir = path.join(tmp, "data");
    fs.mkdirSync(dataDir, { recursive: true });
    const binPath = path.join(prefix, "bin", "omniroute");
    const packagedCliToken = derivePackagedCliToken(packageRoot, dataDir);

    // BOOT #1 — boot, prove the forced sql.js tier, PATCH a setting, then shut down cleanly
    // so the sql.js adapter's graceful persist actually lands on disk. The in-flow stopChild
    // THROWS on failure; that lands in catch as primaryError and boot #2 never starts.
    log(`boot #1: installed CLI on :${port} (DATA_DIR isolated)…`);
    ({ child, tail } = spawnServer(binPath, port, dataDir));
    let verdict = await waitForHealthy(port, child, expectedVersion, packagedCliToken);
    if (verdict.ok) {
      log(`healthy: HTTP 200, version ${expectedVersion}`);
      const baseUrl = `http://127.0.0.1:${port}`;
      const machineAuth = await verifyMachineTokenAuth(baseUrl, packagedCliToken);
      if (!machineAuth.ok) {
        verdict = machineAuth;
      } else {
        log("machine-token auth passed with no/invalid/valid contrast controls");
      }
      const roundTrip = verdict.ok
        ? await verifySettingsRoundTrip(baseUrl, tail.join(""), packagedCliToken)
        : { ok: false, failures: verdict.failures };
      if (roundTrip.ok) {
        log("settings write/read succeeded through the forced sql.js driver");
        await stopChild(child); // throws here → primaryError; boot #2 is skipped
        child = null;

        // BOOT #2 — same DATA_DIR, fresh process: the value must be read back FROM DISK.
        log("boot #2: rebooting on the same DATA_DIR to prove disk persistence…");
        ({ child, tail } = spawnServer(binPath, port, dataDir));
        verdict = await waitForHealthy(port, child, expectedVersion, packagedCliToken);
        if (verdict.ok) {
          log(`healthy: HTTP 200, version ${expectedVersion}`);
          const restartValue = await readSettingsDebugMode(
            `http://127.0.0.1:${port}`,
            packagedCliToken
          );
          const persistence = evaluateRestartPersistence({
            expectedValue: roundTrip.expectedValue,
            restartValue,
          });
          if (persistence.ok) {
            log("value survived a clean shutdown + restart — disk persistence proven");
            await stopChild(child); // throws here → primaryError
            child = null;
            exitCode = 0;
          } else {
            verdict = persistence;
          }
        }
      } else {
        verdict = roundTrip;
      }
    }
    if (!verdict.ok) {
      primaryError = new Error(verdict.failures.join("; "));
      exitCode = 1;
    }
  } catch (e) {
    // Every smoke-logic failure — boot/PATCH/GET/restart AND in-flow stopChild throws.
    primaryError = e;
    exitCode = 1;
  } finally {
    // Tear down whatever is still running. This block records ONLY a stopChild failure,
    // and never overwrites primaryError.
    if (child) {
      try {
        await stopChild(child);
        shutdownConfirmed = true;
      } catch (e) {
        cleanupError = e; // still !shutdownConfirmed → workspace preserved below
      }
      child = null;
    } else {
      // Stopped in-flow (already confirmed) or never spawned — nothing left to confirm.
      shutdownConfirmed = true;
    }
    // Remove the workspace ONLY after confirmed shutdown; a process group that refused to
    // die keeps its DATA_DIR for diagnosis.
    if (shutdownConfirmed) {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }

  // Report primaryError as the smoke failure; report cleanupError separately. Either one
  // fails the gate.
  if (primaryError) {
    console.error(`[pack-boot] ❌ smoke FAILED: ${primaryError.message}`);
    if (tail.length) {
      console.error(
        "[pack-boot] last server output:\n" + tail.join("").split("\n").slice(-40).join("\n")
      );
    }
  }
  if (cleanupError) {
    console.error(`[pack-boot] ❌ final shutdown FAILED: ${cleanupError.message}`);
    exitCode = 1;
  }
  if (exitCode === 0) {
    log("✅ the packed tarball boots AND persists — #7065 class gate green");
  }
  if (!shutdownConfirmed) {
    console.error(
      `[pack-boot] ⚠ process group not confirmed stopped — workspace preserved for diagnosis: ${tmp}`
    );
  }
  process.exit(exitCode);
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isDirectRun) {
  main().catch((e) => {
    console.error("[pack-boot] fatal:", e.message);
    process.exit(1);
  });
}
