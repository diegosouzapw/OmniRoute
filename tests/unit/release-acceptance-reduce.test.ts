import test from "node:test";
import assert from "node:assert/strict";
import { reduce } from "../../scripts/quality/release-acceptance/reduce.mjs";

const SHA = "30b5bf18fbe827a0283ce17e91bda22cc8b4c13e";

function key(gate_id) {
  return { gate_id, suite_id: null, shard_index: null, shard_total: null };
}

function record(partial) {
  return {
    gate_id: "lint",
    suite_id: null,
    shard_index: null,
    shard_total: null,
    tested_sha: SHA,
    run_id: "1",
    run_attempt: 1,
    command_id: partial.gate_id ?? "lint",
    gate_type: "static",
    status: "PASS",
    cause: null,
    exit_code: partial.status === "FAIL" ? 1 : partial.status === "INFRA_ERROR" ? 2 : 0,
    duration_ms: 10,
    evidence: [],
    ...partial,
  };
}

function planWithRequired(gateId, extra = {}) {
  return {
    required_gates: [key(gateId)],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
    ...extra,
  };
}

const planPack = {
  required_gates: [key("pack-artifact"), key("pack-boot")],
  identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
  dependencies: { "pack-boot": "pack-artifact" },
};

test("required SKIPPED never yields VERIFIED", () => {
  const out = reduce(planWithRequired("lint"), [
    record({ gate_id: "lint", status: "SKIPPED", reason: "optional-looking" }),
  ]);
  assert.equal(out.verdict, "UNVERIFIED");
});

test("a complete matching required PASS is VERIFIED", () => {
  assert.equal(reduce(planWithRequired("lint"), [record({})]).verdict, "VERIFIED");
});

for (const mismatch of [
  { tested_sha: "a".repeat(40) },
  { run_id: "older-run" },
  { run_attempt: 2 },
]) {
  test(`PASS from a different validation identity is UNVERIFIED: ${JSON.stringify(mismatch)}`, () => {
    const out = reduce(planWithRequired("lint"), [record(mismatch)]);
    assert.equal(out.verdict, "UNVERIFIED");
    assert.ok(out.evidence_errors.some((error) => error.code === "identity_mismatch"));
  });
}

test("duplicate required PASS records cannot be counted as independent proof", () => {
  const out = reduce(planWithRequired("lint"), [record({}), record({})]);
  assert.equal(out.verdict, "UNVERIFIED");
  assert.ok(out.evidence_errors.some((error) => error.code === "duplicate_record"));
});

for (const inconsistent of [
  { status: "PASS", exit_code: 42 },
  { status: "PASS", exit_code: null },
  { status: "FAIL", exit_code: 0 },
  { status: "PENDING", exit_code: 0 },
]) {
  test(`inconsistent or non-terminal command evidence is UNVERIFIED: ${JSON.stringify(inconsistent)}`, () => {
    const out = reduce(planWithRequired("lint"), [record(inconsistent)]);
    assert.equal(out.verdict, "UNVERIFIED");
  });
}

test("missing plan identity cannot certify an otherwise passing record", () => {
  const out = reduce(planWithRequired("lint", { identity: {} }), [record({})]);
  assert.equal(out.verdict, "UNVERIFIED");
});

test("pack-artifact FAIL classifies pack-boot as FAIL with cause", () => {
  const out = reduce(planPack, [
    record({ gate_id: "pack-artifact", status: "FAIL", gate_type: "artifact" }),
  ]);
  const boot = out.gates.find((g) => g.gate_id === "pack-boot");
  assert.equal(boot.status, "FAIL");
  assert.equal(boot.cause.gate_id, "pack-artifact");
  assert.equal(out.verdict, "FAILED");
});

test("pack-artifact INFRA_ERROR classifies pack-boot as INFRA_ERROR", () => {
  const out = reduce(planPack, [
    record({
      gate_id: "pack-artifact",
      status: "INFRA_ERROR",
      gate_type: "artifact",
    }),
  ]);
  const boot = out.gates.find((g) => g.gate_id === "pack-boot");
  assert.equal(boot.status, "INFRA_ERROR");
  assert.equal(out.verdict, "UNVERIFIED");
});

test("plan that marks a required gate's prerequisite optional is rejected", () => {
  const illegalPlan = {
    required_gates: [key("pack-boot")],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
    dependencies: { "pack-boot": "pack-artifact" },
    optional_gates: [key("pack-artifact")],
  };
  assert.throws(() => reduce(illegalPlan, []), /optional prerequisite/);
});

test("required SKIPPED prerequisite classifies dependent as SKIPPED, does not throw", () => {
  const out = reduce(planPack, [
    record({
      gate_id: "pack-artifact",
      status: "SKIPPED",
      reason: "runner skipped",
      gate_type: "artifact",
    }),
  ]);
  const boot = out.gates.find((g) => g.gate_id === "pack-boot");
  assert.equal(boot.status, "SKIPPED");
  assert.equal(boot.cause.gate_id, "pack-artifact");
  assert.equal(out.verdict, "UNVERIFIED");
});

test("INFRA_ERROR artifact reclassifies an already-emitted FAIL boot to INFRA_ERROR", () => {
  const out = reduce(planPack, [
    record({
      gate_id: "pack-artifact",
      status: "INFRA_ERROR",
      gate_type: "artifact",
    }),
    record({
      gate_id: "pack-boot",
      status: "FAIL",
      gate_type: "artifact",
    }),
  ]);
  const boot = out.gates.find((g) => g.gate_id === "pack-boot");
  assert.equal(boot.status, "INFRA_ERROR");
  assert.equal(boot.cause.gate_id, "pack-artifact");
  assert.equal(out.verdict, "UNVERIFIED");
});

test("empty required_gates is UNVERIFIED", () => {
  const out = reduce(
    { required_gates: [], identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 } },
    [record({ gate_id: "lint", status: "PASS" })]
  );
  assert.equal(out.verdict, "UNVERIFIED");
  assert.ok(out.evidence_errors.some((e) => e.code === "empty_required_set"));
});

test("INFRA_ERROR artifact reclassifies every FAIL boot copy", () => {
  const out = reduce(planPack, [
    record({ gate_id: "pack-artifact", status: "INFRA_ERROR", gate_type: "artifact" }),
    record({ gate_id: "pack-boot", status: "FAIL", gate_type: "artifact" }),
    record({ gate_id: "pack-boot", status: "FAIL", gate_type: "artifact" }),
  ]);
  const boots = out.gates.filter((g) => g.gate_id === "pack-boot");
  assert.ok(boots.length >= 1);
  assert.ok(boots.every((g) => g.status === "INFRA_ERROR"));
  assert.equal(out.verdict, "UNVERIFIED");
});

test("transitive INFRA on a three-gate chain is UNVERIFIED, not leaked FAIL", () => {
  const plan = {
    required_gates: [key("a"), key("b"), key("c")],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
    dependencies: { b: "a", c: "b" },
  };
  const out = reduce(plan, [
    record({ gate_id: "a", status: "INFRA_ERROR", gate_type: "artifact" }),
    record({ gate_id: "b", status: "FAIL", gate_type: "artifact" }),
    record({ gate_id: "c", status: "PASS", gate_type: "artifact" }),
  ]);
  assert.equal(out.gates.find((g) => g.gate_id === "a").status, "INFRA_ERROR");
  assert.equal(out.gates.find((g) => g.gate_id === "b").status, "INFRA_ERROR");
  assert.equal(out.gates.find((g) => g.gate_id === "c").status, "INFRA_ERROR");
  assert.equal(out.verdict, "UNVERIFIED");
});

test("transitive FAIL on a three-gate chain classifies every dependent", () => {
  const plan = {
    required_gates: [key("a"), key("b"), key("c")],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
    dependencies: { b: "a", c: "b" },
  };
  const out = reduce(plan, [
    record({ gate_id: "a", status: "FAIL", gate_type: "artifact" }),
    record({ gate_id: "b", status: "PASS", gate_type: "artifact" }),
    record({ gate_id: "c", status: "PASS", gate_type: "artifact" }),
  ]);
  assert.equal(out.gates.find((g) => g.gate_id === "b").status, "FAIL");
  assert.equal(out.gates.find((g) => g.gate_id === "c").status, "FAIL");
  assert.equal(out.verdict, "FAILED");
});

test("INFRA copy of a required gate dominates a FAIL copy of the same key", () => {
  const out = reduce(planPack, [
    record({ gate_id: "pack-artifact", status: "INFRA_ERROR", gate_type: "artifact" }),
    record({ gate_id: "pack-artifact", status: "FAIL", gate_type: "artifact" }),
    record({ gate_id: "pack-boot", status: "PASS", gate_type: "artifact" }),
  ]);
  assert.equal(out.verdict, "UNVERIFIED");
  const boot = out.gates.find((g) => g.gate_id === "pack-boot");
  assert.equal(boot.status, "INFRA_ERROR");
});

test("cyclic dependencies are rejected", () => {
  const cyclic = {
    required_gates: [key("a"), key("b")],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
    dependencies: { a: "b", b: "a" },
  };
  assert.throws(
    () =>
      reduce(cyclic, [
        record({ gate_id: "a", status: "INFRA_ERROR" }),
        record({ gate_id: "b", status: "FAIL" }),
      ]),
    /cyclic prerequisite/
  );
});

test("missing prerequisite records one evidence error, not one per loop", () => {
  const out = reduce(
    {
      required_gates: [key("boot")],
      identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
      dependencies: { boot: "art" },
    },
    []
  );
  assert.equal(out.verdict, "UNVERIFIED");
  assert.equal(out.evidence_errors.filter((e) => e.code === "prerequisite_missing").length, 1);
});

test("missing prerequisite records one evidence error for all shards of a gate_id", () => {
  const shard0 = { gate_id: "u", suite_id: "s", shard_index: 0, shard_total: 2 };
  const shard1 = { gate_id: "u", suite_id: "s", shard_index: 1, shard_total: 2 };
  const out = reduce(
    {
      required_gates: [shard0, shard1],
      identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
      dependencies: { u: "art" },
    },
    []
  );
  assert.equal(out.verdict, "UNVERIFIED");
  assert.equal(out.evidence_errors.filter((e) => e.code === "prerequisite_missing").length, 1);
});

test("two dependents of the same missing prerequisite keep one error per edge", () => {
  const out = reduce(
    {
      required_gates: [key("boot"), key("pack")],
      identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
      dependencies: { boot: "art", pack: "art" },
    },
    []
  );
  assert.equal(out.verdict, "UNVERIFIED");
  const missing = out.evidence_errors.filter((e) => e.code === "prerequisite_missing");
  assert.equal(missing.length, 2);
  const gates = missing.map((e) => e.gate?.gate_id).sort();
  assert.deepEqual(gates, ["boot", "pack"]);
  assert.equal(out.gates.find((g) => g.gate_id === "boot")?.status, "INFRA_ERROR");
  assert.equal(out.gates.find((g) => g.gate_id === "pack")?.status, "INFRA_ERROR");
});

test("sharded required dependents inherit a FAIL prerequisite of the same gate_id", () => {
  const shard0 = { gate_id: "u", suite_id: "s", shard_index: 0, shard_total: 2 };
  const shard1 = { gate_id: "u", suite_id: "s", shard_index: 1, shard_total: 2 };
  const out = reduce(
    {
      required_gates: [shard0, shard1],
      identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
      dependencies: { u: "art" },
    },
    [
      record({ gate_id: "art", status: "FAIL", gate_type: "artifact" }),
      record({ ...shard0, status: "PASS", gate_type: "artifact" }),
      record({ ...shard1, status: "PASS", gate_type: "artifact" }),
    ]
  );
  const shards = out.gates.filter((g) => g.gate_id === "u" && g.suite_id === "s");
  assert.equal(shards.length, 2);
  assert.ok(shards.every((g) => g.status === "FAIL"));
  assert.equal(out.verdict, "FAILED");
});

test("sharded required dependents inherit an INFRA prerequisite of the same gate_id", () => {
  const shard0 = { gate_id: "u", suite_id: "s", shard_index: 0, shard_total: 2 };
  const shard1 = { gate_id: "u", suite_id: "s", shard_index: 1, shard_total: 2 };
  const out = reduce(
    {
      required_gates: [shard0, shard1],
      identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
      dependencies: { u: "art" },
    },
    [
      record({ gate_id: "art", status: "INFRA_ERROR", gate_type: "artifact" }),
      record({ ...shard0, status: "PASS", gate_type: "artifact" }),
      record({ ...shard1, status: "PASS", gate_type: "artifact" }),
    ]
  );
  const shards = out.gates.filter((g) => g.gate_id === "u" && g.suite_id === "s");
  assert.ok(shards.every((g) => g.status === "INFRA_ERROR"));
  assert.equal(out.verdict, "UNVERIFIED");
});
