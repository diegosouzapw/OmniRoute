import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  REQUIRED_SQLJS_RUNTIME_FILES,
  pickTarball,
  evaluateBoot,
  pickPort,
  findMissingSqlJsRuntimeFiles,
  evaluateSqlJsRoundTrip,
  evaluateRestartPersistence,
} from "../../scripts/check/check-pack-boot.mjs";

// WS1.2 (T1, v3.8.49 quality plan) — pure-function guards for the tarball boot-smoke
// gate that kills the #7065 class (published artifact crashes on every boot because a
// packaging list drifted; 3rd recurrence). The end-to-end path runs in CI's
// package-artifact job; these tests pin the decision logic.

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/check/check-pack-boot.mjs"
);

test("pickTarball extracts the filename from npm pack --json output", () => {
  assert.equal(
    pickTarball('[{"filename":"omniroute-3.8.49.tgz","size":1}]'),
    "omniroute-3.8.49.tgz"
  );
});

test("pickTarball normalizes scoped slashes to the on-disk dash form", () => {
  assert.equal(pickTarball('[{"filename":"@scope/pkg-1.0.0.tgz"}]'), "@scope-pkg-1.0.0.tgz");
});

test("pickTarball throws on empty/odd npm output instead of booting garbage", () => {
  assert.throws(() => pickTarball("[]"));
  assert.throws(() => pickTarball("{}"));
});

test("evaluateBoot passes on HTTP 200 + matching version, whatever the health status", () => {
  const r = evaluateBoot(200, { version: "3.8.49", status: "warning" }, "3.8.49");
  assert.equal(r.ok, true);
  assert.deepEqual(r.failures, []);
});

test("evaluateBoot fails on non-200, non-JSON body, and version mismatch", () => {
  assert.equal(evaluateBoot(503, { version: "3.8.49" }, "3.8.49").ok, false);
  assert.equal(evaluateBoot(200, null, "3.8.49").ok, false);
  const wrong = evaluateBoot(200, { version: "3.8.48" }, "3.8.49");
  assert.equal(wrong.ok, false);
  assert.match(wrong.failures[0], /3\.8\.48/);
});

test("pickPort stays inside the reserved smoke range for any pid", () => {
  for (const seed of [0, 1, 4000, 65535, 123456]) {
    const p = pickPort(seed);
    assert.ok(p >= 23000 && p < 27000, `port ${p} out of range for seed ${seed}`);
  }
});

test("installed package contract requires sql.js metadata, entrypoint, and WASM", () => {
  const present = new Set(REQUIRED_SQLJS_RUNTIME_FILES.map((file) => path.join("/pkg", file)));
  assert.deepEqual(
    findMissingSqlJsRuntimeFiles("/pkg", (file) => present.has(file)),
    []
  );

  present.delete(path.join("/pkg", "dist/node_modules/sql.js/dist/sql-wasm.wasm"));
  assert.deepEqual(
    findMissingSqlJsRuntimeFiles("/pkg", (file) => present.has(file)),
    ["dist/node_modules/sql.js/dist/sql-wasm.wasm"]
  );
});

test("sql.js round trip requires the forced-driver marker plus PATCH and GET persistence", () => {
  const passing = evaluateSqlJsRoundTrip({
    startupOutput: "[DB] Pre-initializing sql.js WASM (synchronous drivers unavailable)...",
    beforeValue: true,
    patchedValue: false,
    readBackValue: false,
  });
  assert.deepEqual(passing, { ok: true, failures: [] });

  const failing = evaluateSqlJsRoundTrip({
    startupOutput: "[DB] SQLite database ready",
    beforeValue: false,
    patchedValue: true,
    readBackValue: false,
  });
  assert.equal(failing.ok, false);
  assert.equal(failing.failures.length, 2);
  assert.match(failing.failures[0], /forced sql\.js startup path/);
  assert.match(failing.failures[1], /GET debugMode/);
});

test("source guard: the gate polls the real health endpoint of the INSTALLED binary", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(
    src.includes('"install", "-g", "--prefix"'),
    "must install the packed tarball into a clean prefix"
  );
  assert.ok(src.includes("/api/monitoring/health"), "must poll the health endpoint");
  assert.ok(src.includes("/api/settings"), "must verify a real application write and read");
  assert.ok(
    src.includes('OMNIROUTE_PACK_BOOT_FORCE_SQLJS: "1"'),
    "must force the packaged sql.js tier during this smoke"
  );
  assert.ok(src.indexOf("npm") < src.indexOf("spawn"), "pack+install must precede the boot spawn");
});

test("restart persistence requires the reboot value to match the boot #1 written value", () => {
  assert.deepEqual(evaluateRestartPersistence({ expectedValue: true, restartValue: true }), {
    ok: true,
    failures: [],
  });
  assert.deepEqual(evaluateRestartPersistence({ expectedValue: false, restartValue: false }), {
    ok: true,
    failures: [],
  });

  const mismatch = evaluateRestartPersistence({ expectedValue: true, restartValue: false });
  assert.equal(mismatch.ok, false);
  assert.equal(mismatch.failures.length, 1);
  assert.match(mismatch.failures[0], /after restart/);
});

test("source guard: the gate reboots on the SAME DATA_DIR and reads debugMode as a strict boolean", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(src.includes("boot #2"), "must run a second boot to prove disk persistence");

  // Count only the CALLS, not the `function spawnServer(` declaration: the calls are the
  // destructuring-assignment form `= spawnServer(...)`. Capture each call's arg list and
  // assert both pass the SAME shared dataDir variable — that is what makes boot #2 read
  // boot #1's disk state.
  const calls = [...src.matchAll(/= spawnServer\(([^)]*)\)/g)];
  assert.equal(calls.length, 2, "must spawn exactly two boots (write, then reboot to verify)");
  for (const call of calls) {
    assert.equal(
      call[1],
      "binPath, port, dataDir",
      "both boots must pass the same shared dataDir variable"
    );
  }

  assert.ok(
    src.includes("evaluateRestartPersistence"),
    "must evaluate the value read back after the reboot"
  );
  // readSettingsDebugMode must reject a missing/malformed field instead of coercing it, or
  // a false expectedValue could pass on an empty response.
  assert.ok(
    src.includes('typeof body.debugMode !== "boolean"'),
    "must require debugMode to be a real boolean, not coerce it"
  );
});

test("source guard: final shutdown only deletes the workspace after a CONFIRMED stop", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(
    src.includes("shutdownConfirmed"),
    "must gate temp-dir deletion on a confirmed process-group stop"
  );
  assert.ok(src.includes("primaryError"), "must report the smoke failure distinctly");
  assert.ok(src.includes("cleanupError"), "must report a final-shutdown failure distinctly");
  assert.ok(
    src.includes("hasExited(child)"),
    "stopChild/waitForHealthy must read authoritative exit state, not a stale boolean"
  );
});
