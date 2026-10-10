import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  readFileSync,
  mkdirSync,
  mkdtempSync,
  renameSync,
  symlinkSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import {
  parseNameStatus,
  createShadowPlan,
  verifyShadowPlan,
  CONTROL_FILES,
} from "../../../scripts/quality/shadow-policy-bootstrap.mjs";

test("empty Git output is an empty list for the caller to classify conservatively", () => {
  assert.deepEqual(parseNameStatus(Buffer.alloc(0)), []);
});

test("NUL Git diff preserves both rename paths, deletions and embedded spaces", () => {
  const output = Buffer.from(
    "R100\0docs/old name.md\0open-sse/executors/new name.ts\0D\0src/deleted.ts\0M\0README.md\0"
  );
  assert.deepEqual(parseNameStatus(output), [
    "README.md",
    "docs/old name.md",
    "open-sse/executors/new name.ts",
    "src/deleted.ts",
  ]);
});

test("truncated Git records fail instead of becoming an empty successful diff", () => {
  assert.throws(() => parseNameStatus(Buffer.from("R100\0docs/a.md\0")), /diff/i);
});

function repository(t: TestContext) {
  const root = mkdtempSync(join(tmpdir(), "shadow-git-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const file of [
    ...new Set([
      ...CONTROL_FILES,
      "package-lock.json",
      "config/ci/toolchain.json",
      ".github/actions/npm-ci-retry/action.yml",
      ".github/workflows/ci.yml",
      ".github/workflows/quality.yml",
    ]),
  ]) {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    copyFileSync(resolve(file), join(root, file));
  }
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_NOSYSTEM: "1" },
    }).trim();
  git("init", "--quiet");
  git("config", "user.name", "Synthetic Fixture");
  git("config", "user.email", "fixture@example.invalid");
  mkdirSync(join(root, "docs"));
  writeFileSync(join(root, "docs/original name.md"), "same content for rename\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture base");
  const base = git("rev-parse", "HEAD");
  return { root, git, base };
}
function context(base: string, head: string, baseRef = "main") {
  return {
    repository: "example/fixture",
    headRepository: "example/fixture",
    eventName: "pull_request",
    number: 16075,
    runId: "123",
    runAttempt: "1",
    baseSha: base,
    headSha: head,
    candidateSha: head,
    workflowSourceSha: head,
    baseRef,
    headRef: "feat/example",
    draft: false,
    prBody: "Synthetic PR body",
  };
}

test("real rename into a provider preserves its documentation origin and selects all domains", (t) => {
  const { root, git, base } = repository(t);
  mkdirSync(join(root, "open-sse/executors"), { recursive: true });
  renameSync(join(root, "docs/original name.md"), join(root, "open-sse/executors/new name.ts"));
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture rename");
  const head = git("rev-parse", "HEAD");
  const plan = createShadowPlan({ root, sourceRoot: root, context: context(base, head) });
  assert.deepEqual(plan.files, ["docs/original name.md", "open-sse/executors/new name.ts"]);
  assert.equal(plan.selection.selectedIds.length, 31);
  assert.deepEqual(plan.selection.domains, ["docs", "provider"]);
  assert.equal(plan.identity.candidateSha, head);
  assert.equal(Object.hasOwn(plan.identity, "prBody"), false);
});

test("one docs-only diff has the same conservative selection for main and release", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "docs/original name.md"), "changed documentation\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture docs");
  const head = git("rev-parse", "HEAD");
  writeFileSync(join(root, "config/quality/test-impact-map.json"), JSON.stringify({ sources: {} }));
  const main = createShadowPlan({ root, sourceRoot: root, context: context(base, head) });
  const release = createShadowPlan({
    root,
    sourceRoot: root,
    context: context(base, head, "release/v3.8.52"),
  });
  assert.equal(main.selection.selectedIds.length, 23);
  assert.deepEqual(main.selection.selectedIds, release.selection.selectedIds);
  assert.equal(main.selection.selectedIds.includes("ci:build"), true);
  assert.equal(main.selection.selectedIds.includes("ci:docs-lint"), true);
  assert.equal(main.selection.selectedIds.includes("ci:i18n"), false);
});

for (const [label, patch] of [
  ["SHA injection", { headSha: "HEAD; echo injected" }],
  ["unsupported event", { eventName: "pull_request_target" }],
  ["foreign repository", { repository: "../escape" }],
  ["missing attempt", { runAttempt: "" }],
  ["same head/base ref", { headRef: "main" }],
  ["unknown secret-bearing field", { token: "must-not-appear" }],
] as const) {
  test(`invalid context rejects ${label} before emitting a plan`, (t) => {
    const { root, base } = repository(t);
    assert.throws(
      () =>
        createShadowPlan({ root, sourceRoot: root, context: { ...context(base, base), ...patch } }),
      /context|target/i
    );
  });
}

test("checkout identity cannot be silently replaced by another valid commit", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "docs/original name.md"), "changed\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture changed");
  assert.throws(
    () => createShadowPlan({ root, sourceRoot: root, context: context(base, base) }),
    /checkout|candidate/i
  );
});

test("plan identity rejects changed bytes, a different attempt and a changed tracked checkout", (t) => {
  const { root, base } = repository(t);
  const input = context(base, base);
  const plan = createShadowPlan({ root, sourceRoot: root, context: input });
  const options = { root, sourceRoot: root, expectedPlanHash: plan.planSha256, context: input };
  assert.equal(verifyShadowPlan(plan, options).identity.candidateSha, base);
  assert.throws(
    () => verifyShadowPlan({ ...plan, files: ["injected"] }, options),
    /hash|identity/i
  );
  assert.throws(
    () => verifyShadowPlan(plan, { ...options, context: { ...input, runAttempt: "2" } }),
    /identity/i
  );
  writeFileSync(join(root, "docs/original name.md"), "changed after classification\n");
  assert.throws(() => verifyShadowPlan(plan, options), /checkout|changed/i);
});

test("malformed TIA map conservatively selects every gate even for docs", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "docs/original name.md"), "changed\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture changed");
  writeFileSync(join(root, "config/quality/test-impact-map.json"), "{}");
  const plan = createShadowPlan({
    root,
    sourceRoot: root,
    context: context(base, git("rev-parse", "HEAD")),
  });
  assert.equal(plan.selection.selectedIds.length, 31);
  assert.match(plan.diagnostics.join(" "), /TIA/);
});

function cliEnvironment(root: string, input: ReturnType<typeof context>) {
  const state = join(root, ".shadow-state");
  mkdirSync(state);
  const eventFile = join(state, "event.json");
  writeFileSync(
    eventFile,
    JSON.stringify({
      repository: { full_name: input.repository },
      number: input.number,
      pull_request: {
        number: input.number,
        draft: input.draft,
        body: input.prBody,
        head: { sha: input.headSha, ref: input.headRef, repo: { full_name: input.headRepository } },
        base: { sha: input.baseSha, ref: input.baseRef },
      },
    })
  );
  return {
    ...process.env,
    GITHUB_EVENT_PATH: eventFile,
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_REPOSITORY: input.repository,
    GITHUB_SHA: input.candidateSha,
    GITHUB_RUN_ID: input.runId,
    GITHUB_RUN_ATTEMPT: input.runAttempt,
    SHADOW_WORKFLOW_SHA: input.workflowSourceSha,
    SHADOW_STATE_DIR: state,
    SHADOW_RUN_ALL: "false",
    GITHUB_OUTPUT: join(state, "outputs"),
  };
}

test("native CLI records a real plan, verifies it, and rejects another run attempt without node_modules", (t) => {
  const { root, base } = repository(t);
  const env = cliEnvironment(root, context(base, base));
  const script = join(root, "scripts/quality/shadow-policy-bootstrap.mjs");
  assert.equal(existsSync(join(root, "node_modules")), false);
  const run = (mode: string, extra = {}) =>
    spawnSync(process.execPath, [script, mode], {
      cwd: root,
      env: { ...env, ...extra },
      encoding: "utf8",
      timeout: 15_000,
    });
  const created = run("plan");
  assert.equal(created.status, 0, created.stderr);
  assert.equal(existsSync(join(env.SHADOW_STATE_DIR, "plan.json")), true);
  const plan = JSON.parse(readFileSync(join(env.SHADOW_STATE_DIR, "plan.json"), "utf8"));
  assert.equal(plan.selection.selectedIds.length, 31);
  assert.equal(Object.keys(plan.execution).length, 31);
  assert.equal(
    Object.values(plan.execution).filter((entry: { implemented: boolean }) => entry.implemented)
      .length,
    10
  );
  const verified = run("verify", { SHADOW_PLAN_HASH: plan.planSha256 });
  assert.equal(verified.status, 0, verified.stderr);
  assert.equal(
    run("verify", { SHADOW_PLAN_HASH: plan.planSha256, GITHUB_RUN_ATTEMPT: "2" }).status,
    1
  );
});

test("native receipt CLI writes one real artifact and reports the complete 31-row incomplete pilot", (t) => {
  const { root, base } = repository(t);
  const env = cliEnvironment(root, context(base, base));
  const invoke = (script: string, mode: string, extra = {}) =>
    spawnSync(process.execPath, [join(root, `scripts/quality/${script}.mjs`), mode], {
      cwd: root,
      env: { ...env, ...extra },
      encoding: "utf8",
      timeout: 15_000,
    });
  assert.equal(invoke("shadow-policy-bootstrap", "plan").status, 0);
  const plan = JSON.parse(readFileSync(join(env.SHADOW_STATE_DIR, "plan.json"), "utf8"));
  const steps = Object.fromEntries(
    Array.from({ length: 6 }, (_, index) => [
      `gate_${index}`,
      { outcome: "success", conclusion: "success" },
    ])
  );
  const saved = invoke("shadow-policy-receipt", "write", {
    SHADOW_PLAN_HASH: plan.planSha256,
    SHADOW_GROUP: "ci:docs-sync-strict",
    SHADOW_JOB_STATUS: "success",
    SHADOW_STEPS: JSON.stringify(steps),
  });
  assert.equal(saved.status, 0, saved.stderr);
  const receiptFile = join(env.SHADOW_STATE_DIR, "receipt.json");
  assert.equal(existsSync(receiptFile), true);
  const receipt = JSON.parse(readFileSync(receiptFile, "utf8"));
  assert.equal(receipt.groupId, "ci:docs-sync-strict");
  assert.equal(receipt.outcome, "success");
  assert.equal(
    receipt.conclusion,
    null,
    "the final hosted conclusion is not available inside its running job"
  );
  const receipts = join(
    env.SHADOW_STATE_DIR,
    "receipts",
    `shadow-receipt-123-1-${base}-ci_docs_sync_strict`
  );
  mkdirSync(receipts, { recursive: true });
  renameSync(receiptFile, join(receipts, "receipt.json"));
  const collected = invoke("shadow-policy-receipt", "collect", {
    SHADOW_PLAN_HASH: plan.planSha256,
    SHADOW_NEEDS: JSON.stringify({ ci_docs_sync_strict: { result: "success" } }),
  });
  assert.equal(collected.status, 2, collected.stderr);
  const report = JSON.parse(readFileSync(join(env.SHADOW_STATE_DIR, "report.json"), "utf8"));
  assert.equal(report.gates.length, 31);
  assert.equal(
    report.gates.filter((gate: { state: string }) => gate.state === "not_implemented").length,
    21
  );
  assert.equal(
    report.gates.find((gate: { id: string }) => gate.id === "ci:docs-sync-strict").jobConclusion,
    "success"
  );
  assert.equal(report.physicalBootstrapExecutions, 1);
});

test("candidate lock, toolchain, installer and legacy command sources have immutable fingerprints", (t) => {
  const { root, base } = repository(t);
  const plan = createShadowPlan({ root, sourceRoot: root, context: context(base, base) });
  assert.deepEqual(
    Object.keys(plan.candidateHashes).sort(),
    [
      "package.json",
      "package-lock.json",
      "config/ci/toolchain.json",
      ".github/actions/npm-ci-retry/action.yml",
      ".github/workflows/ci.yml",
      ".github/workflows/quality.yml",
    ].sort()
  );
  for (const hash of Object.values(plan.candidateHashes))
    assert.match(String(hash), /^[a-f0-9]{64}$/);
});

test("draft eligibility is separate from selection, including the Quality merge-queue exception", (t) => {
  const { root, base } = repository(t);
  const draft = createShadowPlan({
    root,
    sourceRoot: root,
    context: { ...context(base, base), draft: true },
  });
  assert.equal(draft.selection.selectedIds.length, 31);
  assert.equal(draft.execution["ci:docs-sync-strict"].eligible, false);
  assert.equal(draft.execution["quality:docs-gates"].eligible, false);
  const queue = createShadowPlan({
    root,
    sourceRoot: root,
    context: { ...context(base, base), draft: true, headRef: "mergify/merge-queue/main/pr-42" },
  });
  assert.equal(queue.execution["quality:docs-gates"].eligible, true);
  assert.equal(queue.execution["ci:docs-sync-strict"].eligible, false);
});

test("a fork keeps the same policy and a merge candidate contributes paths beyond the PR head", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "docs/original name.md"), "PR head documentation\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture head");
  const head = git("rev-parse", "HEAD");
  mkdirSync(join(root, "open-sse/executors"), { recursive: true });
  writeFileSync(join(root, "open-sse/executors/example.ts"), "// merge-only fixture\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture merge candidate");
  const candidate = git("rev-parse", "HEAD");
  const plan = createShadowPlan({
    root,
    sourceRoot: root,
    context: {
      ...context(base, head),
      candidateSha: candidate,
      workflowSourceSha: candidate,
      headRepository: "fork/fixture",
    },
  });
  assert.deepEqual(plan.files, ["docs/original name.md", "open-sse/executors/example.ts"]);
  assert.equal(plan.selection.selectedIds.length, 31);
});

test("newline paths trigger a diagnostic full selection instead of an incomplete line-based diff", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "docs/line\nbreak.md"), "fixture\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture newline");
  const plan = createShadowPlan({
    root,
    sourceRoot: root,
    context: context(base, git("rev-parse", "HEAD")),
  });
  assert.equal(plan.selection.selectedIds.length, 31);
  assert.match(plan.diagnostics.join(" "), /Git diff/);
});

test("the plan records head and candidate diffs separately instead of losing their comparison boundary", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "docs/original name.md"), "changed head\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture head");
  const head = git("rev-parse", "HEAD");
  writeFileSync(join(root, "docs/candidate.md"), "candidate addition\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture candidate");
  const candidate = git("rev-parse", "HEAD");
  const result = createShadowPlan({
    root,
    sourceRoot: root,
    context: { ...context(base, head), candidateSha: candidate, workflowSourceSha: candidate },
  });
  assert.deepEqual(result.diffs, {
    head: ["docs/original name.md"],
    candidate: ["docs/candidate.md", "docs/original name.md"],
  });
});

test("copy records, deletions and shell-looking filenames stay literal data", () => {
  assert.deepEqual(
    parseNameStatus(
      Buffer.from("C100\0docs/source.md\0docs/copied $(name).md\0D\0docs/removed.md\0")
    ),
    ["docs/copied $(name).md", "docs/removed.md", "docs/source.md"]
  );
});

test("invalid policy and missing Git objects are hard errors while a valid unknown path selects all", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "unknown.asset"), "fixture\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture unknown");
  const head = git("rev-parse", "HEAD");
  const result = createShadowPlan({ root, sourceRoot: root, context: context(base, head) });
  assert.equal(result.selection.selectedIds.length, 31);
  assert.throws(() =>
    createShadowPlan({
      root,
      sourceRoot: root,
      context: { ...context(base, head), baseSha: "f".repeat(40) },
    })
  );
  writeFileSync(join(root, "config/quality/admission-policy.json"), "{}");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture invalid policy");
  assert.throws(
    () =>
      createShadowPlan({
        root,
        sourceRoot: root,
        context: context(base, git("rev-parse", "HEAD")),
      }),
    /policy|profiles|schema/i
  );
});

test("run-all overrides a known docs selection without adding a legacy lane condition", (t) => {
  const { root, git, base } = repository(t);
  writeFileSync(join(root, "docs/original name.md"), "changed docs\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture docs");
  writeFileSync(join(root, "config/quality/test-impact-map.json"), JSON.stringify({ sources: {} }));
  const input = { root, sourceRoot: root, context: context(base, git("rev-parse", "HEAD")) };
  assert.equal(createShadowPlan(input).selection.selectedIds.length, 23);
  const full = createShadowPlan({ ...input, runAll: true });
  assert.equal(full.selection.selectedIds.length, 31);
  assert.equal(full.execution["ci:i18n"].legacyWouldRun, false);
  assert.equal(full.execution["ci:i18n"].eligible, true);
});

test("a fork may target the same branch name in another repository", (t) => {
  const { root, base } = repository(t);
  const sameRefs = { ...context(base, base, "release/v3.8.52"), headRef: "release/v3.8.52" };
  assert.throws(
    () => createShadowPlan({ root, sourceRoot: root, context: sameRefs }),
    /self-target|context/i
  );
  const fork = createShadowPlan({
    root,
    sourceRoot: root,
    context: { ...sameRefs, headRepository: "fork/fixture" },
  });
  assert.equal(fork.identity.headRepository, "fork/fixture");
  assert.equal(fork.identity.baseRef, fork.identity.headRef);
  assert.equal(fork.selection.selectedIds.length, 31);
});

test("pilot context accepts its inclusive defensive metadata bounds", (t) => {
  const { root, base } = repository(t);
  const input = {
    ...context(base, base),
    repository: `${"a".repeat(256)}/${"b".repeat(256)}`,
    headRepository: `${"c".repeat(256)}/${"d".repeat(256)}`,
    runId: "9".repeat(32),
    runAttempt: "9".repeat(32),
  };
  assert.equal(
    createShadowPlan({ root, sourceRoot: root, context: input }).identity.runId,
    input.runId
  );
});

for (const [field, value] of [
  ["repository", `${"a".repeat(257)}/repo`],
  ["headRepository", `owner/${"b".repeat(257)}`],
  ["runId", "9".repeat(33)],
  ["runAttempt", "9".repeat(33)],
] as const) {
  test(`pilot context rejects ${field} beyond its defensive metadata bound`, (t) => {
    const { root, base } = repository(t);
    assert.throws(
      () =>
        createShadowPlan({
          root,
          sourceRoot: root,
          context: { ...context(base, base), [field]: value },
        }),
      /context/i
    );
  });
}

function detailCli(t: TestContext, group: string) {
  const { root, base } = repository(t);
  const env = cliEnvironment(root, context(base, base));
  const plan = createShadowPlan({ root, sourceRoot: root, context: context(base, base) });
  writeFileSync(join(env.SHADOW_STATE_DIR, "plan.json"), JSON.stringify(plan));
  const invoke = () =>
    spawnSync(
      process.execPath,
      [join(root, "scripts/quality/shadow-policy-receipt.mjs"), "preserve"],
      {
        cwd: root,
        env: { ...env, SHADOW_PLAN_HASH: plan.planSha256, SHADOW_GROUP: group },
        encoding: "utf8",
        timeout: 15_000,
      }
    );
  return { root, state: env.SHADOW_STATE_DIR, invoke };
}

for (const [group, directory, name] of [
  ["ci:pr-test-policy", ".artifacts", "pr-test-policy.md"],
  ["ci:i18n", "i18n-results", "pt-BR.txt"],
] as const) {
  test(`native details preservation retains original ${group} bytes privately, separate from receipts`, (t) => {
    const { root, state, invoke } = detailCli(t, group);
    const content = Buffer.from("original résumé\r\n$HOME; $(false)\n", "utf8");
    mkdirSync(join(root, directory));
    writeFileSync(join(root, directory, name), content);
    const result = invoke();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(existsSync(join(root, "node_modules")), false);
    assert.deepEqual(readFileSync(join(state, "details", name)), content);
    assert.deepEqual(readFileSync(join(root, directory, name)), content);
    const observed = JSON.parse(readFileSync(join(state, "details", "details.json"), "utf8"));
    assert.equal(observed.status, "available");
    assert.equal(observed.groupId, group);
    assert.deepEqual(
      observed.files.map((file: { name: string }) => file.name),
      [name]
    );
    assert.equal(observed.identity.runId, "123");
    assert.equal(observed.identity.runAttempt, "1");
    assert.equal(existsSync(join(state, "receipt.json")), false);
    assert.equal(Object.hasOwn(observed, "admit"), false);
  });
}

test("native details preservation records absence without inventing a summary", (t) => {
  const { state, invoke } = detailCli(t, "ci:pr-test-policy");
  const result = invoke();
  assert.equal(result.status, 0, result.stderr);
  const observed = JSON.parse(readFileSync(join(state, "details", "details.json"), "utf8"));
  assert.equal(observed.status, "missing");
  assert.deepEqual(observed.files, []);
  assert.equal(existsSync(join(state, "details", "pr-test-policy.md")), false);
});

for (const boundary of ["source directory", "source file", "destination directory"] as const) {
  test(`native details preservation rejects a symlink at the ${boundary} boundary`, (t) => {
    const { root, state, invoke } = detailCli(t, "ci:pr-test-policy");
    const privateDirectory = join(root, "owned-control");
    mkdirSync(privateDirectory);
    const privateFile = join(privateDirectory, "pr-test-policy.md");
    writeFileSync(privateFile, "synthetic private control");
    if (boundary === "source directory") symlinkSync(privateDirectory, join(root, ".artifacts"));
    else {
      mkdirSync(join(root, ".artifacts"));
      if (boundary === "source file")
        symlinkSync(privateFile, join(root, ".artifacts", "pr-test-policy.md"));
      else {
        writeFileSync(join(root, ".artifacts", "pr-test-policy.md"), "public summary");
        symlinkSync(privateDirectory, join(state, "details"));
      }
    }
    assert.equal(invoke().status, 1);
    assert.equal(readFileSync(privateFile, "utf8"), "synthetic private control");
    assert.equal(existsSync(join(privateDirectory, "details.json")), false);
  });
}

test("native details preservation keeps multiple i18n texts and excludes unrelated workspace files", (t) => {
  const { root, state, invoke } = detailCli(t, "ci:i18n");
  mkdirSync(join(root, "i18n-results"));
  writeFileSync(join(root, "i18n-results", "es.txt"), "Español\n");
  writeFileSync(join(root, "i18n-results", "ja.txt"), "日本語\n");
  writeFileSync(join(root, "i18n-results", "unrelated.json"), "synthetic private data");
  assert.equal(invoke().status, 0);
  const observed = JSON.parse(readFileSync(join(state, "details", "details.json"), "utf8"));
  assert.deepEqual(
    observed.files.map((file: { name: string }) => file.name),
    ["es.txt", "ja.txt"]
  );
  assert.equal(readFileSync(join(state, "details", "ja.txt"), "utf8"), "日本語\n");
  assert.equal(existsSync(join(state, "details", "unrelated.json")), false);
});

test("native details preservation rejects a non-regular report without blocking", (t) => {
  const { root, invoke } = detailCli(t, "ci:pr-test-policy");
  mkdirSync(join(root, ".artifacts"));
  execFileSync("mkfifo", [join(root, ".artifacts", "pr-test-policy.md")]);
  const result = invoke();
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
});

test("native details preservation rejects groups with no detail contract", (t) => {
  const { state, invoke } = detailCli(t, "ci:docs-sync-strict");
  assert.equal(invoke().status, 1);
  assert.equal(existsSync(join(state, "details")), false);
});
