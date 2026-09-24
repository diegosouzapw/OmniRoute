import test from "node:test";
import assert from "node:assert/strict";
import { reduce } from "../../scripts/quality/release-acceptance/reduce.mjs";

const SHA = "30b5bf18fbe827a0283ce17e91bda22cc8b4c13e";
const planPack = {
  required_gates: [
    { gate_id: "pack-artifact", suite_id: null, shard_index: null, shard_total: null },
    { gate_id: "pack-boot", suite_id: null, shard_index: null, shard_total: null },
  ],
  identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
  dependencies: { "pack-boot": "pack-artifact" },
};

function record(partial) {
  return {
    gate_id: "pack-artifact",
    suite_id: null,
    shard_index: null,
    shard_total: null,
    tested_sha: SHA,
    run_id: "1",
    run_attempt: 1,
    command_id: "check:pack-artifact",
    gate_type: "artifact",
    status: "PASS",
    cause: null,
    exit_code: 0,
    duration_ms: 10,
    evidence: [],
    ...partial,
  };
}

test("legacy computeVerdict still hard-fails pack-boot when pack-artifact times out", async () => {
  const { computeVerdict } = await import("../../scripts/quality/validate-release-green.mjs");
  const v = computeVerdict([
    { id: "pack-artifact", kind: "hard", ok: false, detail: "timeout" },
    {
      id: "pack-boot",
      kind: "hard",
      ok: false,
      detail: "skipped because package-artifact did not produce a valid dist/ build",
    },
  ]);
  assert.equal(v.releaseGreen, false);
});

test("new reducer maps the same timeout to UNVERIFIED", () => {
  const out = reduce(planPack, [
    record({ gate_id: "pack-artifact", status: "INFRA_ERROR" }),
  ]);
  assert.equal(out.verdict, "UNVERIFIED");
});

test("synthesized pack-boot without identity.tested_sha keeps a 40-hex sha and FAILED", () => {
  const plan = {
    required_gates: planPack.required_gates,
    identity: { run_id: "1", run_attempt: 1 },
    dependencies: { "pack-boot": "pack-artifact" },
  };
  const out = reduce(plan, [record({ gate_id: "pack-artifact", status: "FAIL" })]);
  const boot = out.gates.find((g) => g.gate_id === "pack-boot");
  assert.ok(boot);
  assert.notEqual(boot.tested_sha, null);
  assert.match(String(boot.tested_sha), /^[0-9a-f]{40}$/);
  assert.equal(out.verdict, "FAILED");
});
