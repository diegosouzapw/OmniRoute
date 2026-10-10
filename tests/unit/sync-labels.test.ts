// Guard for scripts/release/sync-labels.mjs — the declarative label sync behind
// `npm run labels:sync` (.github/labels.yml -> GitHub labels).
//
// The gh runner is injected, so these tests never touch the network. What matters:
//   - a label missing on GitHub is created, a divergent one is edited, an identical one
//     is left alone (the script runs repeatedly; it must be idempotent);
//   - dry-run (the default) only READS — it must never call `gh label create|edit`;
//   - every gh call is an argv array (Hard Rule #13: no shell string to interpolate into).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  parseLabels,
  planLabelSync,
  syncLabels,
  parseArgs,
} from "../../scripts/release/sync-labels.mjs";

type GhCall = string[];

function fakeGh(existing: Array<{ name: string; color: string; description: string }>) {
  const calls: GhCall[] = [];
  const runGh = async (args: string[]) => {
    assert.ok(Array.isArray(args), "gh must be invoked with an argv array");
    calls.push(args);
    if (args[0] === "label" && args[1] === "list") return JSON.stringify(existing);
    return "";
  };
  return { runGh, calls };
}

const DESIRED_YAML = `
- name: v4-feature
  color: "1D76DB"
  description: Feature PR held for the v4 channel
- name: lts
  color: "0E8A16"
  description: Belongs to the v3 LTS line
- name: forward-port
  color: "C5DEF5"
  description: Forward-ported fix
`;

test("parseLabels normalizes color (strips '#', lowercases) and keeps descriptions", () => {
  const labels = parseLabels(
    `- name: a\n  color: "#ABCDEF"\n  description: hi\n- name: b\n  color: "012345"\n`
  );
  assert.deepEqual(labels, [
    { name: "a", color: "abcdef", description: "hi" },
    { name: "b", color: "012345", description: "" },
  ]);
});

test("parseLabels rejects invalid colors, empty names, duplicates and over-long descriptions", () => {
  assert.throws(() => parseLabels(`- name: a\n  color: red\n`), /color/);
  // Unquoted hex is coerced by YAML (5319E7 -> 5.319e10, 012345 -> 12345): must be refused.
  assert.throws(() => parseLabels(`- name: a\n  color: 5319E7\n`), /quoted string/);
  assert.throws(() => parseLabels(`- name: a\n  color: 012345\n`), /quoted string/);
  assert.throws(() => parseLabels(`- name: ""\n  color: "abcdef"\n`), /name/);
  assert.throws(
    () => parseLabels(`- name: a\n  color: "abcdef"\n- name: A\n  color: "123456"\n`),
    /duplicate/i
  );
  assert.throws(
    () => parseLabels(`- name: a\n  color: "abcdef"\n  description: ${"x".repeat(101)}\n`),
    /100/
  );
  assert.throws(() => parseLabels(`name: a\n`), /list/);
});

test("planLabelSync: creates a missing label", () => {
  const plan = planLabelSync([{ name: "lts", color: "0e8a16", description: "LTS" }], []);
  assert.equal(plan.length, 1);
  assert.equal(plan[0].action, "create");
  assert.equal(plan[0].label.name, "lts");
});

test("planLabelSync: updates a label whose color diverges", () => {
  const plan = planLabelSync(
    [{ name: "lts", color: "0e8a16", description: "LTS" }],
    [{ name: "lts", color: "FFFFFF", description: "LTS" }]
  );
  assert.equal(plan[0].action, "update");
  assert.deepEqual(plan[0].changes, ["color: ffffff -> 0e8a16"]);
});

test("planLabelSync: updates a label whose description diverges", () => {
  const plan = planLabelSync(
    [{ name: "lts", color: "0e8a16", description: "new" }],
    [{ name: "lts", color: "0e8a16", description: "old" }]
  );
  assert.equal(plan[0].action, "update");
  assert.match(plan[0].changes[0], /^description:/);
});

test("planLabelSync: skips an identical label (color compared case-insensitively)", () => {
  const plan = planLabelSync(
    [{ name: "lts", color: "0e8a16", description: "LTS" }],
    [{ name: "lts", color: "0E8A16", description: "LTS" }]
  );
  assert.equal(plan[0].action, "skip");
});

test("planLabelSync: never plans anything for labels absent from the desired file", () => {
  const plan = planLabelSync(
    [{ name: "lts", color: "0e8a16", description: "LTS" }],
    [
      { name: "lts", color: "0e8a16", description: "LTS" },
      { name: "queue", color: "0E8A16", description: "merge approval" },
    ]
  );
  assert.deepEqual(
    plan.map((p) => p.label.name),
    ["lts"]
  );
});

test("syncLabels dry-run (default) only lists labels — never creates or edits", async () => {
  const { runGh, calls } = fakeGh([{ name: "lts", color: "FFFFFF", description: "x" }]);
  const result = await syncLabels({
    labels: parseLabels(DESIRED_YAML),
    runGh,
    repo: "owner/repo",
    log: () => {},
  });
  assert.equal(result.applied, false);
  assert.equal(calls.length, 1, "only the read-only `gh label list` call is allowed");
  assert.deepEqual(calls[0].slice(0, 2), ["label", "list"]);
  assert.deepEqual(
    result.plan.map((p: { action: string }) => p.action),
    ["create", "update", "create"]
  );
});

test("syncLabels --apply creates missing, edits divergent, skips identical", async () => {
  const { runGh, calls } = fakeGh([
    { name: "v4-feature", color: "1D76DB", description: "Feature PR held for the v4 channel" },
    { name: "lts", color: "FFFFFF", description: "Belongs to the v3 LTS line" },
  ]);
  await syncLabels({
    labels: parseLabels(DESIRED_YAML),
    runGh,
    apply: true,
    repo: "owner/repo",
    log: () => {},
  });
  const writes = calls.filter((c) => c[0] === "label" && c[1] !== "list");
  assert.deepEqual(writes, [
    [
      "label",
      "edit",
      "lts",
      "--color",
      "0e8a16",
      "--description",
      "Belongs to the v3 LTS line",
      "--repo",
      "owner/repo",
    ],
    [
      "label",
      "create",
      "forward-port",
      "--color",
      "c5def5",
      "--description",
      "Forward-ported fix",
      "--repo",
      "owner/repo",
    ],
  ]);
});

test("syncLabels --apply renames when only the case of the name differs", async () => {
  const { runGh, calls } = fakeGh([{ name: "LTS", color: "0e8a16", description: "d" }]);
  await syncLabels({
    labels: [{ name: "lts", color: "0e8a16", description: "d" }],
    runGh,
    apply: true,
    repo: "owner/repo",
    log: () => {},
  });
  const edit = calls.find((c) => c[1] === "edit");
  assert.ok(edit);
  assert.deepEqual(edit.slice(0, 5), ["label", "edit", "LTS", "--name", "lts"]);
});

test("parseArgs: dry-run is the default; --apply opts in; both together is an error", () => {
  assert.equal(parseArgs([]).apply, false);
  assert.equal(parseArgs(["--dry-run"]).apply, false);
  assert.equal(parseArgs(["--apply"]).apply, true);
  assert.throws(() => parseArgs(["--apply", "--dry-run"]), /mutually exclusive/);
  assert.throws(() => parseArgs(["--bogus"]), /Unknown/);
  assert.equal(parseArgs(["--repo", "a/b"]).repo, "a/b");
});

test("the committed .github/labels.yml parses and declares the rail labels", () => {
  const file = path.join(process.cwd(), ".github", "labels.yml");
  const labels = parseLabels(fs.readFileSync(file, "utf8"));
  const names = labels.map((l: { name: string }) => l.name);
  for (const required of [
    "v4-feature",
    "lts",
    "forward-port",
    "channel:latest",
    "channel:next",
    "channel:nightly",
    "preview-artifact",
  ]) {
    assert.ok(names.includes(required), `labels.yml must declare ${required}`);
  }
  // Operational labels keep their existing meaning — the rail file must not redefine them.
  for (const reserved of ["queue", "release-freeze", "base-red"]) {
    assert.ok(!names.includes(reserved), `labels.yml must not redefine ${reserved}`);
  }
});
