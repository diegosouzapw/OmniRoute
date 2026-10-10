import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import test, { type TestContext } from "node:test";

const DOCS = [
  "ci:build",
  "ci:changes",
  "ci:coverage-pr-comment",
  "ci:docs-lint",
  "ci:docs-sync-strict",
  "ci:electron-package-smoke",
  "ci:lint",
  "ci:package-artifact",
  "ci:pr-test-policy",
  "ci:quality-extended",
  "ci:quality-gate",
  "ci:test-coverage",
  "ci:test-e2e",
  "ci:test-security",
  "ci:test-unit",
  "ci:test-vitest",
  "quality:changes",
  "quality:docs-gates",
  "quality:fast-gates",
  "quality:fast-unit",
  "quality:fast-vitest",
  "quality:lint-guard",
  "quality:merge-integrity",
];
const ALL = [
  ...DOCS,
  "ci:i18n-ui-coverage",
  "ci:i18n-glossary-zhcn",
  "ci:i18n",
  "ci:test-bun-sqlite",
  "ci:test-integration",
  "ci:test-ecosystem",
  "ci:test-protocols-e2e",
  "ci:sonarqube",
].sort();

function fixture(t: TestContext) {
  const root = mkdtempSync(join(tmpdir(), "shadow-cli-16075-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const file of [
    "scripts/quality/shadow-gate-policy.mjs",
    "scripts/quality/select-shadow-gates.mjs",
    "scripts/quality/classify-pr-changes.mjs",
    "scripts/quality/gate-manifest.mjs",
    "config/quality/admission-policy.json",
    "config/quality/gate-manifest.json",
    "package.json",
  ]) {
    const target = join(root, file);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(resolve(file), target);
  }
  assert.equal(existsSync(join(root, "node_modules")), false);
  return root;
}

function invoke(root: string, input: unknown, args: string[] = []) {
  return spawnSync(
    process.execPath,
    [join(root, "scripts/quality/select-shadow-gates.mjs"), ...args],
    {
      cwd: root,
      input: JSON.stringify(input),
      encoding: "utf8",
      timeout: 15_000,
      env: { ...process.env, NODE_PATH: "" },
    }
  );
}

test("native Node CLI plans real mapped docs groups without installed dependencies", (t) => {
  const result = invoke(fixture(t), { domains: ["docs"] });
  assert.equal(result.status, 0, result.stderr);
  const plan = JSON.parse(result.stdout);
  assert.equal(plan.kind, "shadow-gate-plan");
  assert.deepEqual(plan.selectedIds, DOCS);
  assert.equal(Object.hasOwn(plan, "verdict"), false);
});

for (const [name, input] of [
  ["CSV", { domains: "docs" }],
  ["changed paths", { files: ["README.md", "docs/guides/QUICK_START.md"] }],
]) {
  test(`CLI accepts ${name} through the same real classifier and selector`, (t) => {
    const result = invoke(fixture(t), input);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout).selectedIds, DOCS);
  });
}

test("CLI reads a workspace-relative JSON file and explicit stdin identically", (t) => {
  const root = fixture(t);
  writeFileSync(join(root, "request.json"), JSON.stringify({ files: ["README.md"] }));
  const file = invoke(root, null, ["request.json"]);
  const stdin = invoke(root, { files: ["README.md"] }, ["-"]);
  assert.equal(file.status, 0, file.stderr);
  assert.equal(stdin.status, 0, stdin.stderr);
  assert.deepEqual(JSON.parse(file.stdout), JSON.parse(stdin.stdout));
  assert.deepEqual(JSON.parse(file.stdout).selectedIds, DOCS);
});

for (const [name, request] of [
  ["run-all", { domains: ["docs"], runAll: true }],
  ["unknown changed path", { files: ["unclaimed.config"] }],
  ["both rename sides", { files: ["docs/old.md", "open-sse/executors/new.ts"] }],
  ["deleted provider path", { files: ["open-sse/executors/removed.ts"], runAll: true }],
]) {
  test(`${name} retains full selection without claiming execution`, (t) => {
    const result = invoke(fixture(t), request);
    assert.equal(result.status, 0, result.stderr);
    const plan = JSON.parse(result.stdout);
    assert.deepEqual(plan.selectedIds, ALL);
    assert.equal(plan.kind, "shadow-gate-plan");
    assert.equal(Object.hasOwn(plan, "verdict"), false);
  });
}

for (const [name, input] of [
  ["empty request", {}],
  ["null request", null],
  ["unknown domains", { domains: ["docz"] }],
  ["ambiguous domains and files", { domains: ["docs"], files: ["open-sse/executors/model.ts"] }],
  ["non-array paths", { files: "README.md" }],
  ["non-string path", { files: [42] }],
  ["empty paths", { files: [] }],
  ["escaped path", { files: ["../README.md"] }],
  ["classification failure", { domains: ["docs"], classificationFailed: true }],
  ["malformed flag", { domains: ["docs"], runAll: "false" }],
  ["misspelled run-all flag", { domains: ["docs"], runALL: true }],
]) {
  test(`${name} is a complete fallback plan with nonzero diagnostic status`, (t) => {
    const result = invoke(fixture(t), input);
    assert.equal(result.status, 2, result.stderr);
    const plan = JSON.parse(result.stdout);
    assert.equal(plan.status, "fallback");
    assert.deepEqual(plan.selectedIds, ALL);
    assert.ok(plan.diagnostics.length > 0);
  });
}

test("malformed input JSON keeps all gates and exposes the classification failure", (t) => {
  const root = fixture(t);
  writeFileSync(join(root, "request.json"), "{");
  const result = invoke(root, null, ["request.json"]);
  assert.equal(result.status, 2, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).selectedIds, ALL);
});

test("invalid committed metadata is a hard error, never a fallback success", (t) => {
  const root = fixture(t);
  const path = join(root, "config/quality/admission-policy.json");
  const policy = JSON.parse(readFileSync(path, "utf8"));
  policy.profiles.ci.jobs.lint.domains = [];
  writeFileSync(path, JSON.stringify(policy));
  const result = invoke(root, { domains: ["core"] });
  assert.equal(result.status, 1, result.stderr);
  const failure = JSON.parse(result.stdout);
  assert.equal(failure.status, "error");
  assert.equal(Object.hasOwn(failure, "selectedIds"), false);
  assert.equal(Object.hasOwn(failure, "verdict"), false);
});

test("a new mapped job requires dependency metadata before the CLI can plan it", (t) => {
  const root = fixture(t);
  const path = join(root, "config/quality/admission-policy.json");
  const policy = JSON.parse(readFileSync(path, "utf8"));
  policy.profiles.ci.jobs.extra = { when: "code", disposition: "required", domains: ["docs"] };
  writeFileSync(path, JSON.stringify(policy));
  const result = invoke(root, { domains: ["core"] });
  assert.equal(result.status, 1, result.stderr);
  assert.equal(JSON.parse(result.stdout).status, "error");
});

test("input file paths cannot escape the workspace, including through symlinks", (t) => {
  const root = fixture(t);
  const outsideRoot = mkdtempSync(join(tmpdir(), "shadow-private-input-16075-"));
  const outside = join(outsideRoot, "request.json");
  writeFileSync(outside, JSON.stringify({ domains: ["docs"] }));
  t.after(() => rmSync(outsideRoot, { recursive: true, force: true }));
  symlinkSync(outside, join(root, "linked.json"));
  for (const input of [outside, relative(root, outside), "linked.json"]) {
    const result = invoke(root, null, [input]);
    assert.equal(result.status, 1, result.stderr);
    const failure = JSON.parse(result.stdout);
    assert.equal(failure.status, "error");
    assert.equal(Object.hasOwn(failure, "selectedIds"), false);
  }
});

for (const [domain, omitted] of [
  ["build", ["ci:docs-lint", "ci:i18n-glossary-zhcn"]],
  [
    "catalog",
    [
      "ci:docs-lint",
      "ci:i18n",
      "ci:i18n-ui-coverage",
      "ci:i18n-glossary-zhcn",
      "ci:test-bun-sqlite",
    ],
  ],
  ["cli", ["ci:docs-lint", "ci:i18n-glossary-zhcn", "ci:test-bun-sqlite"]],
  ["core", []],
  ["db", ["ci:docs-lint", "ci:i18n", "ci:i18n-ui-coverage", "ci:i18n-glossary-zhcn"]],
  [
    "docs",
    [
      "ci:i18n",
      "ci:i18n-ui-coverage",
      "ci:i18n-glossary-zhcn",
      "ci:test-bun-sqlite",
      "ci:test-integration",
      "ci:test-ecosystem",
      "ci:test-protocols-e2e",
      "ci:sonarqube",
    ],
  ],
  ["i18n", ["ci:docs-lint", "ci:test-bun-sqlite"]],
  [
    "provider",
    [
      "ci:docs-lint",
      "ci:i18n",
      "ci:i18n-ui-coverage",
      "ci:i18n-glossary-zhcn",
      "ci:test-bun-sqlite",
    ],
  ],
  [
    "routing",
    [
      "ci:docs-lint",
      "ci:i18n",
      "ci:i18n-ui-coverage",
      "ci:i18n-glossary-zhcn",
      "ci:test-bun-sqlite",
    ],
  ],
  ["tests", ["ci:docs-lint"]],
  ["ui", ["ci:docs-lint", "ci:i18n-glossary-zhcn", "ci:test-bun-sqlite"]],
  ["workflow", []],
] as [string, string[]][]) {
  test(`the committed ${domain} domain has its independently specified gate set`, (t) => {
    const result = invoke(fixture(t), { domains: [domain] });
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(
      JSON.parse(result.stdout).selectedIds,
      ALL.filter((id) => !omitted.includes(id))
    );
  });
}
