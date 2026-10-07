import assert from "node:assert/strict";
import test from "node:test";
import {
  prepareRulesetProposal,
  verifyRulesetSnapshot,
} from "../../scripts/quality/prepare-ruleset-admission.mjs";

const snapshot = {
  id: 42,
  source: "owner/repo",
  source_type: "Repository",
  updated_at: "2026-09-21T00:00:00Z",
  name: "Protect main",
  target: "branch",
  enforcement: "active",
  bypass_actors: [{ actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "always" }],
  conditions: { ref_name: { include: ["refs/heads/main"], exclude: [] } },
  rules: [
    { type: "deletion" },
    { type: "non_fast_forward" },
    { type: "pull_request", parameters: { required_approving_review_count: 2 } },
  ],
};
const checks = [
  { context: "Gate / CI", integration_id: 15368 },
  { context: "Gate / Quality", integration_id: 15368 },
];

test("proposal adds strict checks without removing existing protections or bypass configuration", () => {
  const original = structuredClone(snapshot);
  const proposal = prepareRulesetProposal(snapshot, checks);
  assert.deepEqual(snapshot, original, "proposal must not mutate its input");
  assert.deepEqual(proposal.payload.rules.slice(0, 3), snapshot.rules);
  assert.deepEqual(proposal.payload.bypass_actors, snapshot.bypass_actors);
  assert.deepEqual(proposal.payload.conditions, snapshot.conditions);
  assert.equal(proposal.payload.enforcement, "active");
  assert.equal(proposal.applied, false);
  assert.equal(proposal.requiresOwnerApproval, true);
  assert.deepEqual(proposal.payload.rules.at(-1).parameters, {
    required_status_checks: checks,
    strict_required_status_checks_policy: true,
    do_not_enforce_on_create: false,
  });
});

test("existing required checks are retained and repeated preparation is idempotent", () => {
  const first = prepareRulesetProposal(snapshot, [
    { context: "Existing check", integration_id: 7 },
  ]);
  const next = { ...snapshot, ...first.payload };
  const second = prepareRulesetProposal(next, checks);
  const third = prepareRulesetProposal({ ...snapshot, ...second.payload }, checks);
  assert.deepEqual(second.payload, third.payload);
  assert.equal(second.payload.rules.at(-1).parameters.required_status_checks.length, 3);
});

test("missing privileged readback, conflicting identity and non-branch targets are rejected", () => {
  const noBypassReadback = structuredClone(snapshot);
  delete noBypassReadback.bypass_actors;
  assert.throws(() => prepareRulesetProposal(noBypassReadback, checks), /bypass/);
  for (const patch of [
    { target: "tag" },
    { id: null },
    { source_type: "Organization" },
    { updated_at: "" },
  ]) {
    assert.throws(() => prepareRulesetProposal({ ...snapshot, ...patch }, checks));
  }
  assert.throws(() => prepareRulesetProposal(snapshot, []));
  assert.throws(() => prepareRulesetProposal(snapshot, [{ context: "Gate / CI" }]));
  const boundElsewhere = prepareRulesetProposal(snapshot, [
    { context: "Gate / CI", integration_id: 8 },
  ]);
  assert.throws(
    () => prepareRulesetProposal({ ...snapshot, ...boundElsewhere.payload }, checks),
    /integration/
  );
});

test("precondition rejects stale or changed ruleset snapshots", () => {
  const proposal = prepareRulesetProposal(snapshot, checks);
  assert.equal(verifyRulesetSnapshot(proposal, snapshot), true);
  assert.equal(
    verifyRulesetSnapshot(proposal, { ...snapshot, updated_at: "2026-09-22T00:00:00Z" }),
    false
  );
  assert.equal(verifyRulesetSnapshot(proposal, { ...snapshot, rules: [] }), false);
  assert.equal(verifyRulesetSnapshot(proposal, { ...snapshot, id: 43 }), false);
  assert.equal(verifyRulesetSnapshot(proposal, { ...snapshot, bypass_actors: [] }), false);
});

test("duplicate required-status-check rules fail closed", () => {
  const first = prepareRulesetProposal(snapshot, checks);
  const doubled = { ...snapshot, rules: [...first.payload.rules, first.payload.rules.at(-1)] };
  assert.throws(() => prepareRulesetProposal(doubled, checks), /duplicate/);
});
