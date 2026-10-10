/**
 * #16068 — path-literal edges: tests that read a workflow/config/doc as a FILE get an
 * `artifacts` edge in the impact map, consumed by the sibling gate and TIA (additively).
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { after } from "node:test";

import { analyzeForgottenSiblingTests } from "../../scripts/check/check-forgotten-sibling-tests.mjs";
import { buildTestImpactMap } from "../../scripts/quality/build-test-impact-map.mjs";
import { extractPathLiteralEdges } from "../../scripts/quality/lib/pathLiteralEdges.mjs";
import { selectImpacted } from "../../scripts/quality/select-impacted-tests.mjs";

const fixtureRoots: string[] = [];
after(() => {
  for (const root of fixtureRoots) fs.rmSync(root, { recursive: true, force: true });
});

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

function fixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "path-literal-"));
  fixtureRoots.push(root);
  for (const [file, contents] of Object.entries(files)) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }
  execFileSync("git", ["init", "-q"], { cwd: root });
  if (Object.keys(files).length)
    execFileSync("git", ["add", "--", ...Object.keys(files)], { cwd: root });
  return root;
}

const TRACKED = new Set([
  ".github/workflows/quality.yml",
  "next.config.mjs",
  "eslint.config.mjs",
  "docs/guide.md",
  "package.json",
  "package-lock.json",
  "src/lib/value.ts",
  "tests/unit/other.test.ts",
  "dist/bundle.js",
  ".next/cache.json",
  "coverage/lcov.info",
  "docs/i18n/pt/guide.md",
]);

function extract(testBody: string) {
  const files = Object.fromEntries([...TRACKED].map((file) => [file, "fixture\n"]));
  const root = fixture({ ...files, "tests/unit/a.test.ts": testBody });
  return extractPathLiteralEdges({ root, testFiles: ["tests/unit/a.test.ts"] });
}

test("new URL(..., import.meta.url) literal resolves test-relative", () => {
  const out = extract('const p = new URL("../../.github/workflows/quality.yml", import.meta.url);');
  assert.deepEqual(out, { ".github/workflows/quality.yml": ["tests/unit/a.test.ts"] });
});

test("resolve(here, ...) literal resolves test-relative", () => {
  const out = extract('readFileSync(resolve(here, "../../next.config.mjs"), "utf8");');
  assert.deepEqual(out, { "next.config.mjs": ["tests/unit/a.test.ts"] });
});

test("path.join(process.cwd(), ...) resolves root-relative, including multi-segment joins", () => {
  const out = extract(
    'path.join(process.cwd(), "eslint.config.mjs");\npath.join(process.cwd(), "docs", "guide.md");'
  );
  assert.deepEqual(Object.keys(out), ["docs/guide.md", "eslint.config.mjs"]);
});

test("readFileSync with a plain root-relative literal resolves", () => {
  const out = extract('readFileSync("next.config.mjs", "utf8");');
  assert.deepEqual(out, { "next.config.mjs": ["tests/unit/a.test.ts"] });
});

test("negatives: nonexistent path, import specifier, tests/, generated trees, hub files", () => {
  const out = extract(
    [
      'readFileSync("nope/missing.yml");',
      'import { value } from "../../src/lib/value";',
      'import "../../src/lib/value.ts";',
      'readFileSync("tests/unit/other.test.ts");',
      'readFileSync("dist/bundle.js");',
      'readFileSync(".next/cache.json");',
      'readFileSync("coverage/lcov.info");',
      'readFileSync("docs/i18n/pt/guide.md");',
      'readFileSync("package.json");',
      'readFileSync(path.join(process.cwd(), "package-lock.json"));',
      'readFileSync("src/lib/value.ts");',
    ].join("\n")
  );
  assert.deepEqual(out, {});
});

test("output is sorted and deterministic", () => {
  const a = extract('read("next.config.mjs"); read("eslint.config.mjs"); read("docs/guide.md");');
  assert.deepEqual(Object.keys(a), ["docs/guide.md", "eslint.config.mjs", "next.config.mjs"]);
});

test("TIA selects artifact tests additively and never escalates to __RUN_ALL__", () => {
  const map = {
    sources: { "src/lib/value.ts": ["tests/unit/value.test.ts"] },
    artifacts: { "next.config.mjs": ["tests/unit/nextcfg.test.ts"] },
  };
  assert.deepEqual(selectImpacted({ changed: ["next.config.mjs"], map }), [
    "tests/unit/nextcfg.test.ts",
  ]);
  assert.deepEqual(selectImpacted({ changed: ["next.config.mjs", "src/lib/value.ts"], map }), [
    "tests/unit/nextcfg.test.ts",
    "tests/unit/value.test.ts",
  ]);
  assert.deepEqual(selectImpacted({ changed: ["README.md"], map }), []);
  // map without an artifacts key keeps the old behavior
  assert.deepEqual(selectImpacted({ changed: ["next.config.mjs"], map: { sources: {} } }), []);
});

test("sibling gate: artifact edge reports a missing test, honours diff, masking and allowlist", () => {
  const root = fixture({});
  const impactMap = {
    sources: {},
    artifacts: { "next.config.mjs": ["tests/unit/nextcfg.test.ts"] },
  };
  const base = { root, impactMap, allowlist: [] };
  const missing = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [{ status: "M", file: "next.config.mjs" }],
  });
  assert.equal(missing.findings.length, 1);
  assert.equal(missing.findings[0].candidateTest, "tests/unit/nextcfg.test.ts");

  const touched = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [
      { status: "M", file: "next.config.mjs" },
      { status: "M", file: "tests/unit/nextcfg.test.ts" },
    ],
  });
  assert.equal(touched.findings.length, 0);

  const deleted = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [
      { status: "M", file: "next.config.mjs" },
      { status: "D", file: "tests/unit/nextcfg.test.ts" },
    ],
  });
  assert.equal(deleted.maskingRisks.length, 1);

  const allowed = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [{ status: "M", file: "next.config.mjs" }],
    allowlist: [
      {
        consumer: "next.config.mjs",
        candidateTest: "tests/unit/nextcfg.test.ts",
        rationale: "reviewed: config change does not affect this test",
        reference: "#16068",
      },
    ],
  });
  assert.equal(allowed.findings.length, 0);
  assert.equal(allowed.suppressed.length, 1);
});

function gitFixture() {
  const root = fixture({
    ".github/workflows/quality.yml": "name: quality\n",
    "package.json": "{}\n",
    "src/lib/value.ts": "export const value = 1;\n",
    "tests/unit/build/check-workflows.test.ts":
      'const qualityWorkflowPath = new URL("../../../.github/workflows/quality.yml", import.meta.url);\n' +
      'readFileSync("package.json");\n',
    "tests/unit/value.test.ts": 'import { value } from "../../src/lib/value";\n',
  });
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["add", "-A"], { cwd: root });
  return root;
}

test("#10408 regression: changed quality.yml names check-workflows.test.ts in gate and TIA", () => {
  const root = gitFixture();
  const map = buildTestImpactMap(root);
  const pinned = "tests/unit/build/check-workflows.test.ts";
  assert.deepEqual(map.artifacts, { ".github/workflows/quality.yml": [pinned] });
  assert.deepEqual(map.sources, { "src/lib/value.ts": ["tests/unit/value.test.ts"] });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: ".github/workflows/quality.yml" }],
    impactMap: map,
    allowlist: [],
  });
  assert.deepEqual(
    result.findings.map((f: { candidateTest: string }) => f.candidateTest),
    [pinned]
  );

  const selected = selectImpacted({ changed: [".github/workflows/quality.yml"], map });
  assert.deepEqual(selected, [pinned]);
});

test("the real check-workflows test is linked to the real quality.yml", () => {
  const artifacts = extractPathLiteralEdges({
    root: REPO_ROOT,
    testFiles: ["tests/unit/build/check-workflows.test.ts"],
  });
  assert.ok(
    artifacts[".github/workflows/quality.yml"]?.includes("tests/unit/build/check-workflows.test.ts")
  );
});

test("determinism: building the map twice is byte-identical", () => {
  const root = gitFixture();
  assert.equal(JSON.stringify(buildTestImpactMap(root)), JSON.stringify(buildTestImpactMap(root)));
});

function trackedFixturePaths(root: string) {
  return execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
}

for (const state of [
  "regular",
  "removed",
  "directory",
  "untracked",
  "symlink",
  "dangling",
] as const) {
  test(`R1: only a current regular tracked file is an artifact (${state})`, () => {
    const root = fixture({
      "config/quality/policy.json": "{}\n",
      "tests/unit/a.test.ts": 'readFileSync("../../config/quality/policy.json");',
    });
    const target = path.join(root, "config/quality/policy.json");
    if (state === "untracked") {
      execFileSync("git", ["rm", "--cached", "--", "config/quality/policy.json"], { cwd: root });
      assert.ok(fs.statSync(target).isFile());
    } else if (state !== "regular") {
      fs.unlinkSync(target);
      if (state === "directory") fs.mkdirSync(target);
      if (state === "symlink") {
        const outside = fixture({ "policy.json": "{}\n" });
        fs.symlinkSync(path.join(outside, "policy.json"), target);
      }
      if (state === "dangling") fs.symlinkSync("absent.json", target);
    }
    assert.equal(
      trackedFixturePaths(root).includes("config/quality/policy.json"),
      state !== "untracked"
    );
    assert.deepEqual(
      extractPathLiteralEdges({ root, testFiles: ["tests/unit/a.test.ts"] }),
      state === "regular" ? { "config/quality/policy.json": ["tests/unit/a.test.ts"] } : {}
    );
  });
}

test("R1: a literal resolving outside the repository has no artifact edge", () => {
  const outside = fixture({ "policy.json": "{}\n" });
  const root = fixture({
    "tests/unit/a.test.ts": `readFileSync(${JSON.stringify(path.join(outside, "policy.json"))});`,
  });
  assert.deepEqual(
    extractPathLiteralEdges({
      root,
      testFiles: ["tests/unit/a.test.ts"],
      tracked: new Set([path.relative(root, path.join(outside, "policy.json"))]),
    }),
    {}
  );
});

for (const location of ["inside", "outside"] as const) {
  test(`R1: a symlinked parent cannot create an artifact edge (${location})`, () => {
    const root = fixture({
      "config/quality/policy.json": "{}\n",
      "tests/unit/a.test.ts": 'readFileSync("config/quality/policy.json");',
    });
    const targetRoot =
      location === "outside" ? fixture({ "policy.json": "{}\n" }) : path.join(root, "real");
    fs.mkdirSync(targetRoot, { recursive: true });
    fs.writeFileSync(path.join(targetRoot, "policy.json"), "{}\n");
    fs.rmSync(path.join(root, "config/quality"), { recursive: true });
    fs.symlinkSync(targetRoot, path.join(root, "config/quality"));
    assert.ok(trackedFixturePaths(root).includes("config/quality/policy.json"));
    assert.ok(fs.statSync(path.join(root, "config/quality/policy.json")).isFile());
    assert.deepEqual(extractPathLiteralEdges({ root, testFiles: ["tests/unit/a.test.ts"] }), {});
  });
}

const IMPORT_FORMS = [
  'import policy from "../../config/quality/policy.json" with { type: "json" };',
  'import "../../config/quality/policy.json";',
  'const policy = require("../../config/quality/policy.json");',
  'const policy = import("../../config/quality/policy.json");',
];

for (const [index, statement] of IMPORT_FORMS.entries()) {
  test(`R2: eligible JSON import alone is not an artifact (form ${index})`, () => {
    const root = fixture({
      "config/quality/policy.json": "{}\n",
      "tests/unit/a.test.ts": statement,
    });
    assert.deepEqual(buildTestImpactMap(root).artifacts, {});
  });
  for (const order of ["before", "after"] as const) {
    test(`R2: an independent read survives the same import value (${index}, ${order})`, () => {
      const read = 'readFileSync("../../config/quality/policy.json", "utf8");';
      const root = fixture({
        "config/quality/policy.json": "{}\n",
        "tests/unit/a.test.ts": (order === "before" ? [read, statement] : [statement, read]).join(
          "\n"
        ),
      });
      const map = buildTestImpactMap(root);
      assert.deepEqual(map.artifacts, { "config/quality/policy.json": ["tests/unit/a.test.ts"] });
      assert.deepEqual(map.sources, {});
      assert.deepEqual(selectImpacted({ changed: ["config/quality/policy.json"], map }), [
        "tests/unit/a.test.ts",
      ]);
      const result = analyzeForgottenSiblingTests({
        root,
        impactMap: map,
        allowlist: [],
        changedEntries: [{ status: "M", file: "config/quality/policy.json" }],
      });
      assert.deepEqual(
        result.findings.map((finding) => finding.candidateTest),
        ["tests/unit/a.test.ts"]
      );
    });
  }
}

test("R2: quotes, joins and duplicate reads retain one sorted artifact edge per test", () => {
  const root = fixture({
    "config/quality/policy.json": "{}\n",
    "tests/unit/z.test.ts":
      IMPORT_FORMS[0] +
      "\nreadFileSync('../../config/quality/policy.json');\nreadFileSync(`../../config/quality/policy.json`);",
    "tests/unit/a.test.ts":
      IMPORT_FORMS[1] + '\nreadFileSync(join("config", "quality", "policy.json"));',
  });
  const map = buildTestImpactMap(root);
  assert.deepEqual(map.artifacts, {
    "config/quality/policy.json": ["tests/unit/a.test.ts", "tests/unit/z.test.ts"],
  });
  assert.equal(JSON.stringify(map), JSON.stringify(buildTestImpactMap(root)));
});

test("built artifact map keeps diff, allowlist and masking behavior", () => {
  const root = gitFixture();
  const impactMap = buildTestImpactMap(root);
  const artifact = ".github/workflows/quality.yml";
  const candidateTest = "tests/unit/build/check-workflows.test.ts";
  const allowlist = [
    {
      consumer: artifact,
      candidateTest,
      rationale: "Reviewed unchanged fixture",
      reference: "#16068",
    },
  ];
  const artifactChange = { status: "M", file: artifact };
  const run = (changedEntries: { status: string; file: string }[], addedTestLines: string[] = []) =>
    analyzeForgottenSiblingTests({ root, impactMap, allowlist, changedEntries, addedTestLines });
  const allowed = run([artifactChange]);
  assert.equal(allowed.findings.length, 0);
  assert.equal(allowed.suppressed.length, 1);
  const touched = run([artifactChange, { status: "M", file: candidateTest }]);
  assert.equal(touched.findings.length, 0);
  assert.equal(touched.suppressed.length, 0);
  assert.equal(touched.maskingRisks.length, 0);
  for (const status of ["D", "skip", "todo"]) {
    const masked = run(
      [artifactChange, { status: status === "D" ? "D" : "M", file: candidateTest }],
      status === "D" ? [] : [`+test.${status}("case");`]
    );
    assert.equal(masked.maskingRisks.length, 1);
    assert.equal(masked.maskingRisks[0].candidateTest, candidateTest);
    assert.equal(masked.suppressed.length, 0);
  }
  assert.equal(run([{ status: "M", file: "docs/unrelated.md" }]).findings.length, 0);
  assert.deepEqual(selectImpacted({ changed: [artifact, "src/lib/value.ts"], map: impactMap }), [
    candidateTest,
    "tests/unit/value.test.ts",
  ]);
  assert.deepEqual(selectImpacted({ changed: ["package.json"], map: impactMap }), ["__RUN_ALL__"]);
  assert.deepEqual(selectImpacted({ changed: ["src/lib/unmapped.ts"], map: impactMap }), [
    "__RUN_ALL__",
  ]);
});

test("scanner: parentheses inside quoted join segments stay part of the artifact path", () => {
  const root = fixture({
    "docs)/guide.md": "fixture\n",
    "next.config.mjs": "fixture\n",
    "tests/unit/a.test.ts":
      'readFileSync(path.join(process.cwd(), "docs)", "guide.md"));\n' +
      'readFileSync("next.config.mjs");',
  });
  const map = buildTestImpactMap(root);
  assert.deepEqual(map.artifacts, {
    "docs)/guide.md": ["tests/unit/a.test.ts"],
    "next.config.mjs": ["tests/unit/a.test.ts"],
  });
  assert.deepEqual(selectImpacted({ changed: ["docs)/guide.md"], map }), ["tests/unit/a.test.ts"]);
});

for (const size of [300, 301]) {
  test(`scanner: raw literal length ${size} is not truncated to another artifact`, () => {
    const prefix = `config/${"a".repeat(140)}/`;
    const literal = prefix + "b".repeat(size - prefix.length - 5) + ".json";
    const root = fixture({
      [literal]: "{}\n",
      ...(size === 301 ? { [literal.slice(0, 300)]: "{}\n" } : {}),
      "next.config.mjs": "fixture\n",
      "tests/unit/a.test.ts": `readFileSync(${JSON.stringify(literal)});\nreadFileSync("next.config.mjs");`,
    });
    assert.equal(literal.length, size);
    const map = buildTestImpactMap(root);
    assert.deepEqual(
      Object.keys(map.artifacts),
      size === 300 ? [literal, "next.config.mjs"] : ["next.config.mjs"]
    );
    assert.deepEqual(
      selectImpacted({ changed: [literal], map }),
      size === 300 ? ["tests/unit/a.test.ts"] : []
    );
  });
}

for (const quote of ['"', "'", "`"] as const) {
  test(`scanner: escaped delimiters in an oversized ${quote} literal create no internal edge`, () => {
    const value = "x".repeat(301) + "\\" + quote + "config/hidden.json" + "\\" + quote;
    const root = fixture({
      "config/hidden.json": "{}\n",
      "next.config.mjs": "fixture\n",
      "tests/unit/a.test.ts": `const note = ${quote}${value}${quote};\nreadFileSync("next.config.mjs");`,
    });
    assert.deepEqual(buildTestImpactMap(root).artifacts, {
      "next.config.mjs": ["tests/unit/a.test.ts"],
    });
  });
}

for (const broken of [
  `const note = "unterminated 'config/hidden.json'`,
  `readFileSync(join("config", "hidden.json";`,
]) {
  test(`scanner: incomplete input is consumed without inventing a path (${broken})`, () => {
    const root = fixture({
      "config/hidden.json": "{}\n",
      "next.config.mjs": "fixture\n",
      "tests/unit/a.test.ts": broken + '\nreadFileSync("next.config.mjs");',
    });
    assert.deepEqual(buildTestImpactMap(root).artifacts, {
      "next.config.mjs": ["tests/unit/a.test.ts"],
    });
  });
}

const MULTILINE_IMPORTS = [
  'import policy from\n "../../config/quality/policy.json" with { type: "json" };',
  'import\n "../../config/quality/policy.json";',
  'const policy = require(\n "../../config/quality/policy.json");',
  'const policy = import(\n "../../config/quality/policy.json");',
];
for (const [form, statement] of MULTILINE_IMPORTS.entries()) {
  test(`scanner: multiline import ${form} remains occurrence-specific`, () => {
    const root = fixture({
      "config/quality/policy.json": "{}\n",
      "tests/unit/import.test.ts": statement,
      "tests/unit/before.test.ts":
        'readFileSync("../../config/quality/policy.json");\n' + statement,
      "tests/unit/after.test.ts": statement + '\nreadFileSync("../../config/quality/policy.json");',
    });
    const map = buildTestImpactMap(root);
    assert.deepEqual(map.artifacts, {
      "config/quality/policy.json": ["tests/unit/after.test.ts", "tests/unit/before.test.ts"],
    });
    assert.deepEqual(selectImpacted({ changed: ["config/quality/policy.json"], map }), [
      "tests/unit/after.test.ts",
      "tests/unit/before.test.ts",
    ]);
  });
}

test("scanner: short escaped strings and interpolated templates do not expose inner paths", () => {
  const root = fixture({
    "config/hidden.json": "{}\n",
    "config/${name}/policy.json": "{}\n",
    "next.config.mjs": "fixture\n",
    "tests/unit/a.test.ts":
      String.raw`const note = "\"config/hidden.json\""; const dynamic = ` +
      '`config/${name}/policy.json`;\nreadFileSync("next.config.mjs");',
  });
  assert.deepEqual(buildTestImpactMap(root).artifacts, {
    "next.config.mjs": ["tests/unit/a.test.ts"],
  });
});

test("scanner: a tagged template containing an opening parenthesis is not a join call", () => {
  const root = fixture({
    "config/hidden.json": "{}\n",
    "next.config.mjs": "fixture\n",
    "tests/unit/a.test.ts":
      'const note = (resolve`(`, "config", "hidden.json");\nreadFileSync("next.config.mjs");',
  });
  assert.deepEqual(buildTestImpactMap(root).artifacts, {
    "next.config.mjs": ["tests/unit/a.test.ts"],
  });
});
