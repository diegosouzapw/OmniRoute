// Guard for scripts/release/rehome-open-prs.mjs — the parallel-cycle PR re-home
// (generate-release Phase 0a.0b step 3).
//
// The script exists because `gh pr edit --base` fails SILENTLY (v3.8.42): it exits 0
// while leaving the base untouched. The network side of that is verified by a read-back
// in the script itself; what is testable here is the decision — which PRs get retargeted
// and which are left alone. Getting that wrong in either direction is expensive:
//   - retargeting a PR that was never on the frozen branch drags unrelated work into the cycle
//   - skipping one strands a contributor on a branch the captain has taken over

import test from "node:test";
import assert from "node:assert/strict";

import { classify } from "../../scripts/release/rehome-open-prs.mjs";

const FROZEN = "release/v3.8.49";
const NEXT = "release/v3.8.50";

test("retargets an open PR sitting on the frozen release branch", () => {
  const { action } = classify(
    { number: 1, baseRefName: FROZEN, isDraft: false },
    FROZEN,
    NEXT
  );
  assert.equal(action, "retarget");
});

test("retargets a DRAFT on the frozen branch — a draft still needs a live base", () => {
  const { action } = classify({ number: 2, baseRefName: FROZEN, isDraft: true }, FROZEN, NEXT);
  assert.equal(action, "retarget");
});

test("skips a PR already re-homed — the script must be idempotent for a resumed release", () => {
  const { action, reason } = classify(
    { number: 3, baseRefName: NEXT, isDraft: false },
    FROZEN,
    NEXT
  );
  assert.equal(action, "skip");
  assert.match(reason, /already re-homed/);
});

test("never touches a PR based on main — that is the release PR's own lane", () => {
  const { action, reason } = classify({ number: 4, baseRefName: "main", isDraft: false }, FROZEN, NEXT);
  assert.equal(action, "skip");
  assert.match(reason, /not the frozen branch/);
});

test("never touches a PR based on an older, already-shipped release", () => {
  const { action } = classify(
    { number: 5, baseRefName: "release/v3.8.47", isDraft: false },
    FROZEN,
    NEXT
  );
  assert.equal(action, "skip");
});
