import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mod = await import("../../scripts/check/check-pr-evidence.mjs");
const { evaluatePrBody } = mod;
const SCRIPT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/check/check-pr-evidence.mjs"
);

function run(body) {
  try {
    const out = execFileSync("node", [SCRIPT], {
      encoding: "utf8",
      env: { ...process.env, PR_BODY: body },
    });
    return { code: 0, out };
  } catch (err) {
    return { code: err.status ?? 1, out: `${err.stdout || ""}${err.stderr || ""}` };
  }
}

test("evaluatePrBody: no outcome claim → pass (no evidence required)", () => {
  const r = evaluatePrBody("Adds a helper module.");
  assert.equal(r.result, "pass");
  assert.match(r.reason, /no evidence required/i);
});

test("evaluatePrBody: outcome claim + evidence block → pass", () => {
  const r = evaluatePrBody("Tests pass.\n\n## Evidence\n```\ntests 20 / pass 20 / fail 0\n```");
  assert.equal(r.result, "pass");
});

test("evaluatePrBody: outcome claim without evidence → fail", () => {
  const r = evaluatePrBody("All 20 tests pass and 0 errors.");
  assert.equal(r.result, "fail");
});

test("the FAIL report explains that editing the body does not re-run the gate (push instead)", () => {
  const { code, out } = run("All 20 tests pass and 0 errors."); // claim, no evidence
  assert.equal(code, 1, "gate fails on a claim with no evidence");
  assert.match(out, /Result: FAIL/);
  assert.match(out, /does NOT re-run this gate/);
  assert.match(out, /push a commit/i);
});

test("the hint does NOT appear when the gate passes", () => {
  const { code, out } = run("Tests pass.\n\n## Evidence\n```\ntests 20 / pass 20 / fail 0\n```");
  assert.equal(code, 0);
  assert.match(out, /Result: PASS/);
  assert.doesNotMatch(out, /does NOT re-run this gate/);
});
