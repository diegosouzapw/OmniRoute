import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";
import {
  selectShadowGates,
  SHADOW_GATE_DEPENDENCIES,
} from "../../../scripts/quality/shadow-gate-policy.mjs";

function fixture() {
  return {
    policy: {
      schemaVersion: 1,
      profiles: {
        ci: {
          checkName: "Gate / CI",
          jobs: {
            build: { when: "code", disposition: "required", domains: ["build"] },
            docs: { when: "docs", disposition: "required", domains: ["docs"] },
          },
        },
        quality: {
          checkName: "Gate / Quality",
          jobs: {
            lint: { when: "code", disposition: "required", domains: ["provider"] },
            prose: {
              when: "docs",
              disposition: "advisory",
              reason: "Prose report only",
              domains: ["docs"],
            },
          },
        },
      },
    },
    dependencies: { "ci:build": [], "ci:docs": [], "quality:lint": [], "quality:prose": [] },
  };
}

test("a selector result identifies a plan without claiming candidate admission", () => {
  const plan = selectShadowGates({ ...fixture(), domains: ["docs"] });
  assert.equal(plan.kind, "shadow-gate-plan");
  assert.equal(Object.hasOwn(plan, "verdict"), false);
});

test("a docs diff selects its required and advisory groups, not unrelated build or lint", () => {
  const plan = selectShadowGates({ ...fixture(), domains: ["docs"] });
  assert.deepEqual(plan.selectedIds, ["ci:docs", "quality:prose"]);
});

const ALL = ["ci:build", "ci:docs", "quality:lint", "quality:prose"];

for (const [name, options] of [
  ["core", { domains: ["core"] }],
  ["workflow", { domains: ["workflow"] }],
  ["cross-domain", { domains: ["docs", "provider"] }],
  ["explicit TIA run-all", { domains: ["docs"], runAll: true }],
] as const) {
  test(`${name} preserves full selection including specialized groups`, () => {
    const plan = selectShadowGates({ ...fixture(), ...options });
    assert.deepEqual(plan.selectedIds, ALL);
    assert.equal(plan.fullSelection, true);
    assert.equal(plan.status, "planned");
  });
}

function changedRule(overrides: Record<string, unknown>) {
  const policy = fixture().policy;
  return {
    ...policy,
    profiles: {
      ...policy.profiles,
      ci: {
        ...policy.profiles.ci,
        jobs: {
          ...policy.profiles.ci.jobs,
          docs: { ...policy.profiles.ci.jobs.docs, ...overrides },
        },
      },
    },
  };
}

for (const [name, policy] of [
  ["missing policy", undefined],
  ["unknown schema", { ...fixture().policy, schemaVersion: 2 }],
  ["unknown profile", { schemaVersion: 1, profiles: { other: fixture().policy.profiles.ci } }],
  [
    "empty jobs",
    {
      schemaVersion: 1,
      profiles: { ...fixture().policy.profiles, ci: { checkName: "CI", jobs: {} } },
    },
  ],
  [
    "missing check name",
    {
      schemaVersion: 1,
      profiles: { ...fixture().policy.profiles, ci: { jobs: fixture().policy.profiles.ci.jobs } },
    },
  ],
  ["missing domains", changedRule({ domains: undefined })],
  ["empty domains", changedRule({ domains: [] })],
  ["unknown declared domain", changedRule({ domains: ["docz"] })],
  ["duplicate declared domains", changedRule({ domains: ["docs", "docs"] })],
  ["unknown disposition", changedRule({ disposition: "optional" })],
  ["non-string reason", changedRule({ reason: { mutable: true } })],
  ["advisory without reason", changedRule({ disposition: "advisory" })],
  ["unknown legacy condition", changedRule({ when: "never" })],
]) {
  test(`${name} is a hard metadata error even when full selection was requested`, () => {
    assert.throws(
      () => selectShadowGates({ ...fixture(), policy, domains: ["core"] }),
      /Invalid shadow policy/
    );
  });
}

for (const [name, dependencies] of [
  ["missing graph", undefined],
  ["empty graph", {}],
  ["unknown job", { ...fixture().dependencies, "ci:ghost": [] }],
  ["non-array dependency", { ...fixture().dependencies, "ci:docs": "ci:build" }],
  ["unknown dependency", { ...fixture().dependencies, "ci:docs": ["ci:ghost"] }],
  ["repeated dependency", { ...fixture().dependencies, "ci:docs": ["ci:build", "ci:build"] }],
  ["self-cycle", { ...fixture().dependencies, "ci:docs": ["ci:docs"] }],
  [
    "two-job cycle",
    { ...fixture().dependencies, "ci:docs": ["ci:build"], "ci:build": ["ci:docs"] },
  ],
]) {
  test(`${name} cannot silently remove prerequisites or produce a successful plan`, () => {
    assert.throws(
      () => selectShadowGates({ ...fixture(), dependencies, domains: ["docs"] }),
      /Invalid shadow dependencies/
    );
  });
}

test("dependency closure includes transitive prerequisites with attributable reasons", () => {
  const input = fixture();
  const dependencies = {
    ...input.dependencies,
    "ci:docs": ["quality:lint"],
    "quality:lint": ["ci:build"],
  };
  const plan = selectShadowGates({ ...input, dependencies, domains: ["docs"] });
  assert.deepEqual(plan.selectedIds, ALL);
  assert.equal(plan.fullSelection, false);
  assert.deepEqual(plan.gates.find((gate) => gate.id === "quality:lint")?.reasons, [
    "dependency:ci:docs",
  ]);
  assert.deepEqual(plan.gates.find((gate) => gate.id === "ci:build")?.reasons, [
    "dependency:quality:lint",
  ]);
  assert.deepEqual(
    plan.gates.find((gate) => gate.id === "quality:prose"),
    {
      id: "quality:prose",
      when: "docs",
      disposition: "advisory",
      policyReason: "Prose report only",
      domains: ["docs"],
      selected: true,
      reasons: ["domain:docs"],
    }
  );
});

test("planning is deterministic and leaves caller policy, domains and dependencies unchanged", () => {
  const input = { ...fixture(), domains: ["docs", "docs"] };
  const before = structuredClone(input);
  const first = selectShadowGates(input);
  const second = selectShadowGates(input);
  assert.deepEqual(input, before);
  assert.deepEqual(second, first);
  assert.deepEqual(first.notSelectedIds, ["ci:build", "quality:lint"]);
});

test("the dependency table preserves every current workflow prerequisite", () => {
  const expected: Record<string, string[]> = {};
  for (const profile of ["ci", "quality"]) {
    const workflow = load(readFileSync(`.github/workflows/${profile}.yml`, "utf8")) as {
      jobs: Record<string, { needs?: string | string[] }>;
    };
    for (const [id, job] of Object.entries(workflow.jobs)) {
      if (id === "admission-verdict" || id === "ci-summary") continue;
      const needs = typeof job.needs === "string" ? [job.needs] : (job.needs ?? []);
      expected[`${profile}:${id}`] = needs.map((dependency) => `${profile}:${dependency}`).sort();
    }
  }
  assert.equal(Object.keys(expected).length, 31);
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(SHADOW_GATE_DEPENDENCIES).map(([id, needs]) => [id, [...needs].sort()])
    ),
    expected
  );
});

test("CSV domains are trimmed and deduplicated without forcing cross-domain selection", () => {
  const plan = selectShadowGates({ ...fixture(), domains: " docs, docs " });
  assert.deepEqual(plan.selectedIds, ["ci:docs", "quality:prose"]);
  assert.deepEqual(plan.domains, ["docs"]);
  assert.deepEqual(plan.diagnostics, []);
});

for (const [name, options] of [
  ["missing", {}],
  ["empty", { domains: [] }],
  ["unknown", { domains: ["docz"] }],
  ["malformed CSV", { domains: "docs,,provider" }],
  ["wrong type", { domains: 42 }],
  ["non-string domain", { domains: ["docs", null] }],
  ["classification failed", { domains: ["docs"], classificationFailed: true }],
  ["malformed classification status", { domains: ["docs"], classificationFailed: "false" }],
  ["malformed runAll", { domains: ["docs"], runAll: "false" }],
]) {
  test(`${name} classification keeps every gate and exposes incomplete evidence`, () => {
    const plan = selectShadowGates({ ...fixture(), ...options });
    assert.deepEqual(plan.selectedIds, ALL);
    assert.equal(plan.status, "fallback");
    assert.ok(plan.diagnostics.length > 0);
    assert.equal(Object.hasOwn(plan, "verdict"), false);
  });
}
