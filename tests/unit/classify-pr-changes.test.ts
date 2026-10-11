/**
 * tests/unit/classify-pr-changes.test.ts
 *
 * Locks the *existence reason* of each change flag used by ci.yml path filters:
 * - code  → heavy static + unit/vitest (code regression surface)
 * - docs  → docs-sync / prose only
 * - i18n  → translation validation; pure messages must NOT force full unit
 * - workflow → always code (CI is part of the safety net)
 * - unknown → code (fail-safe over-run)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  CHANGE_DOMAINS,
  classifyDomain,
  classifyDomains,
  classifyPaths,
} from "../../scripts/quality/classify-pr-changes.mjs";

test("pure docs PR → docs only (no code unit/lint bag)", () => {
  const c = classifyPaths(["docs/architecture/QUALITY_GATES.md", "README.md"]);
  assert.deepEqual(c, { code: false, docs: true, i18n: false, workflow: false, testsOnly: false });
});

test("openapi under docs/ → docs (contract gates live in docs-sync, not unit)", () => {
  const c = classifyPaths(["docs/openapi.yaml"]);
  assert.equal(c.docs, true);
  assert.equal(c.code, false);
});

test("pure message catalog → i18n only (not full unit suite)", () => {
  const c = classifyPaths(["src/i18n/messages/en.json", "src/i18n/messages/ko.json"]);
  assert.deepEqual(c, { code: false, docs: false, i18n: true, workflow: false, testsOnly: false });
});

test("i18n tooling/scripts → i18n + code (tooling can break runtime paths)", () => {
  const c = classifyPaths(["scripts/i18n/check-ui-keys-coverage.mjs"]);
  assert.equal(c.i18n, true);
  assert.equal(c.code, true);
});

test("src/i18n loader TS (non-messages) → i18n + code", () => {
  const c = classifyPaths(["src/i18n/request.ts"]);
  assert.equal(c.i18n, true);
  assert.equal(c.code, true);
});

test("workflow change → workflow + code (gates protect the gates)", () => {
  const c = classifyPaths([".github/workflows/ci.yml"]);
  assert.equal(c.workflow, true);
  assert.equal(c.code, true);
});

test("production source → code", () => {
  const c = classifyPaths(["open-sse/handlers/chatCore.ts", "src/lib/db/core.ts"]);
  assert.deepEqual(c, { code: true, docs: false, i18n: false, workflow: false, testsOnly: false });
});

test("mixed docs + code → both flags (jobs union their filters)", () => {
  const c = classifyPaths(["docs/README.md", "src/lib/db/core.ts"]);
  assert.equal(c.docs, true);
  assert.equal(c.code, true);
});

test("unknown path → code fail-safe (never skip heavy gates by accident)", () => {
  const c = classifyPaths(["weird/unclassified.bin"]);
  assert.equal(c.code, true);
});

test("empty change list → all false (nothing to validate)", () => {
  const c = classifyPaths([]);
  assert.deepEqual(c, { code: false, docs: false, i18n: false, workflow: false, testsOnly: false });
});

// WS3.1 (v3.8.49 quality plan) — testsOnly powers the hotfix/test-only fast lane:
// a diff touching ONLY tests/ (and no tests/e2e/ spec) does not change the served
// app, so the 9-shard E2E matrix adds wall-time without coverage. e2e specs are
// excluded from the shortcut — changing an e2e spec REQUIRES running e2e.

test("testsOnly: pure unit-test diff → true (still code)", () => {
  const c = classifyPaths(["tests/unit/foo.test.ts", "tests/integration/bar.test.ts"]);
  assert.equal(c.testsOnly, true);
  assert.equal(c.code, true);
});

test("testsOnly: any non-test file flips it false", () => {
  const c = classifyPaths(["tests/unit/foo.test.ts", "src/lib/db/core.ts"]);
  assert.equal(c.testsOnly, false);
});

test("testsOnly: touching an e2e spec is NOT tests-only (e2e must run)", () => {
  const c = classifyPaths(["tests/e2e/login.spec.ts"]);
  assert.equal(c.testsOnly, false);
});

test("testsOnly: empty change list → false (fail-safe)", () => {
  const c = classifyPaths([]);
  assert.equal(c.testsOnly, false);
});

// ── One-CI-policy step 1 (rail 3.8.52, RFC #8084 D1-full) ─────────────────────
// A second, ADDITIVE classification level: the set of real change *domains*.
// Nothing consumes it yet — ci.yml / quality.yml only expose it as
// `outputs.domains` so the future single policy can be measured in parallel.
// classifyPaths() and the legacy five stdout lines MUST stay byte-identical.

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CLASSIFY_SCRIPT = path.join(REPO_ROOT, "scripts", "quality", "classify-pr-changes.mjs");

test("domains: the published domain list is the closed, sorted set", () => {
  assert.deepEqual(
    [...CHANGE_DOMAINS],
    [
      "build",
      "catalog",
      "cli",
      "core",
      "db",
      "docs",
      "i18n",
      "provider",
      "routing",
      "tests",
      "ui",
      "workflow",
    ]
  );
});

// Two real (or real-shaped) positive paths per domain.
const POSITIVE_CASES: Array<[string, string[]]> = [
  ["provider", ["open-sse/executors/base.ts", "open-sse/translator/index.ts"]],
  ["provider", ["open-sse/config/providers/foo.ts", "src/shared/constants/providers.ts"]],
  ["provider", ["src/shared/constants/providers/oauth.ts"]],
  ["routing", ["open-sse/services/combo.ts", "open-sse/services/combo/strategies.ts"]],
  [
    "routing",
    [
      "open-sse/services/autoCombo/complexityRouter.ts",
      "open-sse/services/accountFallback.ts",
      "open-sse/services/providerCooldownTracker.ts",
      "open-sse/services/rateLimitManager.ts",
      "open-sse/services/fusion.ts",
      "src/lib/resilience/settings.ts",
      "src/shared/utils/circuitBreaker.ts",
    ],
  ],
  ["catalog", ["src/app/api/v1/models/route.ts", "src/lib/catalog/index.ts"]],
  ["catalog", ["open-sse/config/providerRegistry.ts"]],
  ["ui", ["src/app/(dashboard)/dashboard/page.tsx", "src/shared/components/Button.tsx"]],
  ["i18n", ["src/i18n/messages/en.json", "scripts/i18n/check-ui-keys-coverage.mjs"]],
  ["i18n", ["config/i18n.json", "src/i18n/request.ts"]],
  ["db", ["src/lib/db/core.ts", "src/lib/db/migrations/001_initial_schema.sql"]],
  ["cli", ["bin/omniroute.mjs", "bin/cli/commands/serve.mjs"]],
  [
    "build",
    [
      "package.json",
      "package-lock.json",
      "next.config.mjs",
      "Dockerfile",
      "Dockerfile.bun",
      "tsconfig.json",
      "tsconfig.typecheck-core.json",
      "scripts/build/postinstall.mjs",
      "open-sse/package.json",
    ],
  ],
  [
    "core",
    [
      "open-sse/handlers/chatCore.ts",
      "open-sse/utils/error.ts",
      "src/server/authz/routeGuard.ts",
      "src/lib/memory/store.ts",
      "open-sse/services/model.ts",
    ],
  ],
  [
    "tests",
    [
      "tests/unit/foo.test.ts",
      "tests/e2e/login.spec.ts",
      "open-sse/services/__tests__/combo.test.ts",
    ],
  ],
  ["docs", ["docs/architecture/QUALITY_GATES.md", "README.md", "open-sse/services/AGENTS.md"]],
  [
    "workflow",
    [".github/workflows/ci.yml", ".zizmor.yml", ".github/actions/npm-ci-retry/action.yml"],
  ],
];

for (const [domain, files] of POSITIVE_CASES) {
  test(`domains: ${files.join(", ")} → ${domain}`, () => {
    for (const f of files) assert.equal(classifyDomain(f), domain, f);
    assert.deepEqual(classifyDomains(files), [domain]);
  });
}

test("domains: multi-domain diff → sorted, de-duplicated union", () => {
  const d = classifyDomains([
    "src/lib/db/core.ts",
    "open-sse/executors/base.ts",
    "docs/README.md",
    "open-sse/executors/other.ts",
    "tests/unit/x.test.ts",
    ".github/workflows/ci.yml",
  ]);
  assert.deepEqual(d, ["db", "docs", "provider", "tests", "workflow"]);
});

test("domains: unknown path → core (fail-safe, same spirit as code=true)", () => {
  assert.equal(classifyDomain("weird/unclassified.bin"), "core");
  assert.equal(classifyDomain("src/app/login/page.tsx"), "core");
  assert.deepEqual(classifyDomains(["weird/unclassified.bin"]), ["core"]);
});

test("domains: empty change list → empty set", () => {
  assert.deepEqual(classifyDomains([]), []);
  assert.deepEqual(classifyDomains(["", "   "]), []);
});

test("domains: backslash paths are normalized like classifyPaths()", () => {
  assert.equal(classifyDomain("open-sse\\executors\\base.ts"), "provider");
});

test("domains: every classifier result is a member of CHANGE_DOMAINS", () => {
  const all = POSITIVE_CASES.flatMap(([, files]) => files).concat(["x/y", "LICENSE"]);
  for (const f of all) assert.ok(CHANGE_DOMAINS.includes(classifyDomain(f)), f);
});

// ── Regression: the legacy flags and the legacy stdout lines are unchanged ──

test("regression: classifyPaths() keeps its exact legacy shape (no domains key)", () => {
  const c = classifyPaths(["open-sse/handlers/chatCore.ts", "src/lib/db/core.ts"]);
  assert.deepEqual(Object.keys(c), ["code", "docs", "i18n", "workflow", "testsOnly"]);
});

function runCli(lines: string[]) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "classify-domains-"));
  try {
    fs.writeFileSync(path.join(cwd, "changed-files.txt"), lines.join("\n") + "\n");
    const res = spawnSync(process.execPath, [CLASSIFY_SCRIPT, "changed-files.txt"], {
      cwd,
      encoding: "utf8",
    });
    assert.equal(res.status, 0, res.stderr);
    return res.stdout;
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

const LEGACY_STDOUT_CASES: Array<[string[], string, string]> = [
  [
    ["docs/architecture/QUALITY_GATES.md", "README.md"],
    "code=false\ndocs=true\ni18n=false\nworkflow=false\ntestsOnly=false\n",
    "docs",
  ],
  [
    ["src/i18n/messages/en.json"],
    "code=false\ndocs=false\ni18n=true\nworkflow=false\ntestsOnly=false\n",
    "i18n",
  ],
  [
    [".github/workflows/ci.yml"],
    "code=true\ndocs=false\ni18n=false\nworkflow=true\ntestsOnly=false\n",
    "workflow",
  ],
  [
    ["open-sse/handlers/chatCore.ts", "src/lib/db/core.ts"],
    "code=true\ndocs=false\ni18n=false\nworkflow=false\ntestsOnly=false\n",
    "core,db",
  ],
  [
    ["tests/unit/foo.test.ts"],
    "code=true\ndocs=false\ni18n=false\nworkflow=false\ntestsOnly=true\n",
    "tests",
  ],
  [
    ["weird/unclassified.bin"],
    "code=true\ndocs=false\ni18n=false\nworkflow=false\ntestsOnly=false\n",
    "core",
  ],
];

for (const [files, legacy, domains] of LEGACY_STDOUT_CASES) {
  test(`regression: stdout keeps the legacy lines byte-identical, then appends domains (${files[0]})`, () => {
    const out = runCli(files);
    assert.equal(out, `${legacy}domains=${domains}\n`);
  });
}

// Push / dispatch events skip the classifier and enable every lane; the inline
// `domains=` literal in both workflows must therefore be the full domain set.
for (const wf of ["ci.yml", "quality.yml"]) {
  test(`workflow ${wf}: changes job exposes outputs.domains and the push literal is the full set`, () => {
    const src = fs.readFileSync(path.join(REPO_ROOT, ".github", "workflows", wf), "utf8");
    assert.match(src, /^ {6}domains: \$\{\{ steps\.classify\.outputs\.domains \}\}$/m);
    assert.ok(
      src.includes(`echo "domains=${CHANGE_DOMAINS.join(",")}"`),
      `${wf} must echo the full domain list for non-PR events`
    );
  });
}
