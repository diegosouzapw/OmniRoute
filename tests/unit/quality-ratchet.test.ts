import { test } from "node:test";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SCRIPT = path.resolve("scripts/quality/check-quality-ratchet.mjs");

function run(baseline: unknown, metrics: unknown, extraArgs: string[] = []) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ratchet-"));
  const bPath = path.join(dir, "baseline.json");
  const mPath = path.join(dir, "metrics.json");
  fs.writeFileSync(bPath, JSON.stringify(baseline));
  fs.writeFileSync(mPath, JSON.stringify(metrics));
  try {
    const out = execFileSync("node", [SCRIPT, "--baseline", bPath, "--metrics", mPath, ...extraArgs], {
      encoding: "utf8",
    });
    return { code: 0, out, dir, bPath };
  } catch (e) {
    const err = e as { status?: number; stdout?: string; stderr?: string };
    return { code: err.status as number, out: (err.stdout || "") + (err.stderr || ""), dir, bPath };
  }
}

test("passes when metrics equal baseline", () => {
  const b = {
    metrics: {
      eslintWarnings: { value: 100, direction: "down" },
      "coverage.lines": { value: 80, direction: "up" },
    },
  };
  assert.equal(run(b, { eslintWarnings: 100, "coverage.lines": 80 }).code, 0);
});

test("fails when a 'down' metric regresses (more warnings)", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  const r = run(b, { eslintWarnings: 101 });
  assert.equal(r.code, 1);
  assert.match(r.out, /eslintWarnings/);
});

test("fails when an 'up' metric regresses (coverage drops)", () => {
  const b = { metrics: { "coverage.lines": { value: 80, direction: "up" } } };
  assert.equal(run(b, { "coverage.lines": 79 }).code, 1);
});

test("passes on improvement; --update ratchets the baseline", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  const r = run(b, { eslintWarnings: 90 }, ["--update"]);
  assert.equal(r.code, 0);
  const updated = JSON.parse(fs.readFileSync(r.bPath, "utf8"));
  assert.equal(updated.metrics.eslintWarnings.value, 90);
});

test("fails when a baseline metric is missing from collected metrics", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  assert.equal(run(b, {}).code, 1);
});

test("--allow-missing skips absent metrics instead of failing", () => {
  const b = {
    metrics: {
      eslintWarnings: { value: 100, direction: "down" },
      "coverage.lines": { value: 80, direction: "up" },
    },
  };
  assert.equal(run(b, { eslintWarnings: 100 }, ["--allow-missing"]).code, 0);
});
