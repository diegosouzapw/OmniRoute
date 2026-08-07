import test from "node:test";
import assert from "node:assert/strict";

// Guards the deterministic quota-card ordering fix. Before this, the quota
// dashboard globally sorted ALL connections by status then soonest reset and
// grouped by first-appearance — so each provider group's position was decided
// by whichever account happened to sort first, and groups shuffled on every
// refresh. These tests pin the providers-page-style rule: provider rank →
// provider label → provider key fixes each group's slot, and status/reset only
// orders accounts inside their own group with a deterministic name/email/id
// tiebreak.

const utils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");
const constants =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants.ts");

const { compareQuotaConnections, compareProviderGroups } = utils;
const { PROVIDER_ORDER, PROVIDER_LABEL } = constants;

const OPTS = { providerOrder: PROVIDER_ORDER, providerLabels: PROVIDER_LABEL };

function ids(conns) {
  return conns.map((c) => c.id);
}

test("quota-order: provider rank dominates account status (group slot is fixed)", () => {
  // antigravity (rank 1) ok account vs codex (rank 4) critical account.
  // Pre-fix, the critical codex account floated above antigravity and dragged
  // the codex group to the top. Now antigravity's rank wins.
  const okAntigravity = { id: "a", provider: "antigravity", name: "Ag" };
  const criticalCodex = { id: "c", provider: "codex", name: "Cx" };
  // accountCompare that would put codex first if provider rank were ignored:
  const criticalFirst = (x, y) =>
    (x.provider === "codex" ? 0 : 1) - (y.provider === "codex" ? 0 : 1);

  const sorted = [criticalCodex, okAntigravity].sort((a, b) =>
    compareQuotaConnections(a, b, { ...OPTS, accountCompare: criticalFirst })
  );
  assert.deepEqual(ids(sorted), ["a", "c"], "provider rank outranks account status");
});

test("quota-order: accountCompare orders accounts within the same provider group", () => {
  const a = { id: "a", provider: "codex", name: "Acct A" };
  const b = { id: "b", provider: "codex", name: "Acct B" };
  // b is "critical" (rank 0), a is "ok" (rank 2) via the injected comparator.
  const statusOf = { a: 2, b: 0 };
  const criticalFirst = (x, y) => statusOf[x.id] - statusOf[y.id];

  const sorted = [a, b].sort((x, y) =>
    compareQuotaConnections(x, y, { ...OPTS, accountCompare: criticalFirst })
  );
  assert.deepEqual(ids(sorted), ["b", "a"], "critical account first inside its group");
});

test("quota-order: deterministic name tiebreak makes equal-status accounts stable", () => {
  const make = () => [
    { id: "1", provider: "codex", name: "Zeta" },
    { id: "2", provider: "codex", name: "Alpha" },
    { id: "3", provider: "codex", name: "Mid" },
  ];
  const noStatus = () => 0;
  const first = [...make()].sort((x, y) =>
    compareQuotaConnections(x, y, { ...OPTS, accountCompare: noStatus })
  );
  const second = [...make()]
    .reverse()
    .sort((x, y) => compareQuotaConnections(x, y, { ...OPTS, accountCompare: noStatus }));
  assert.deepEqual(ids(first), ["2", "3", "1"], "name alphabetical");
  assert.deepEqual(ids(first), ids(second), "input order does not change output");
});

test("quota-order: unranked providers fall back to label alphabetical, after ranked", () => {
  // github is ranked 3; the two fake providers are unranked (→ 99). Two
  // unranked providers order among themselves by label (here label falls back
  // to the provider key since neither is in PROVIDER_LABEL).
  const conns = [
    { id: "1", provider: "zzz-unranked", name: "X" },
    { id: "2", provider: "aaa-unranked", name: "Y" },
    { id: "3", provider: "github", name: "Z" },
  ];
  const sorted = [...conns].sort((a, b) => compareQuotaConnections(a, b, OPTS));
  assert.deepEqual(
    ids(sorted),
    ["3", "2", "1"],
    "ranked first; unranked by label (labels fall back to provider key here)"
  );
});

test("quota-order: group keys order by rank then label then key", () => {
  const keys = ["codex", "antigravity", "some-new-provider", "github"];
  const sorted = [...keys].sort((a, b) => compareProviderGroups(a, b, OPTS));
  assert.deepEqual(
    sorted,
    ["antigravity", "github", "codex", "some-new-provider"],
    "PROVIDER_ORDER rank 1,3,4 then unranked provider last"
  );
});

test("quota-order: aliased providers with equal rank break tie by provider key", () => {
  // xai-oauth and xao are both rank 16 in PROVIDER_ORDER. Deterministic key
  // tiebreak (ASCII) must decide, not insertion order.
  const a = ["xai-oauth", "xao"].sort((x, y) => compareProviderGroups(x, y, OPTS));
  const b = ["xao", "xai-oauth"].sort((x, y) => compareProviderGroups(x, y, OPTS));
  assert.deepEqual(a, b, "stable regardless of input order");
  assert.deepEqual(a[0], "xai-oauth", "ASCII: 'xai-oauth' < 'xao'");
});

test("quota-order: full grid end-to-end keeps group slots fixed while ordering accounts inside", () => {
  // Simulate the real pipeline: flat list across providers, mixed statuses.
  const conns = [
    { id: "ag1", provider: "antigravity", name: "Ag One" },
    { id: "cx-ok", provider: "codex", name: "Codex Ok" },
    { id: "gh1", provider: "github", name: "Gh One" },
    { id: "cx-crit", provider: "codex", name: "Codex Crit" },
    { id: "ag2", provider: "antigravity", name: "Ag Two" },
  ];
  // codex-crit is critical, everything else ok.
  const statusOf = { "cx-crit": 0 };
  const criticalFirst = (x, y) => (statusOf[x.id] ?? 2) - (statusOf[y.id] ?? 2);

  const sorted = [...conns].sort((a, b) =>
    compareQuotaConnections(a, b, { ...OPTS, accountCompare: criticalFirst })
  );

  // Provider group slots follow rank: antigravity(1) → github(3) → codex(4).
  // The critical codex account does NOT pull the codex group to the front.
  assert.deepEqual(
    sorted.map((c) => c.provider),
    ["antigravity", "antigravity", "github", "codex", "codex"]
  );
  // Inside codex, critical first.
  assert.deepEqual(ids(sorted).slice(3), ["cx-crit", "cx-ok"]);
  // Inside antigravity, name alphabetical.
  assert.deepEqual(ids(sorted).slice(0, 2), ["ag1", "ag2"]);
});
