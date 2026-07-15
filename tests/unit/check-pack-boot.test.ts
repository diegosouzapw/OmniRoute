import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pickTarball, evaluateBoot, pickPort } from "../../scripts/check/check-pack-boot.mjs";

// WS1.2 (T1, v3.8.49 quality plan) — pure-function guards for the tarball boot-smoke
// gate that kills the #7065 class (published artifact crashes on every boot because a
// packaging list drifted; 3rd recurrence). The end-to-end path runs in CI's
// package-artifact job; these tests pin the decision logic.

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/check/check-pack-boot.mjs"
);

test("pickTarball extracts the filename from npm pack --json output", () => {
  assert.equal(pickTarball('[{"filename":"omniroute-3.8.49.tgz","size":1}]'), "omniroute-3.8.49.tgz");
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

test("source guard: the gate polls the real health endpoint of the INSTALLED binary", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(src.includes('"install", "-g", "--prefix"'), "must install the packed tarball into a clean prefix");
  assert.ok(src.includes("/api/monitoring/health"), "must poll the health endpoint");
  assert.ok(src.indexOf("npm") < src.indexOf("spawn"), "pack+install must precede the boot spawn");
});
