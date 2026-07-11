import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-p1b-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_OMNICONTEXT_GIT_PROBE;

const coreDb = await import("../../../src/lib/db/core.ts");
const { createProject, addProjectMember } =
  await import("../../../src/lib/db/omnicontextProjects.ts");
const { createArtifact } = await import("../../../src/lib/db/omnicontextArtifacts.ts");
const { clearRetrieveCache, getRetrieveCacheStats, computeRetrieveCacheKey } =
  await import("../../../src/lib/omnicontext/cache.ts");
const { retrieveForProjectCached, getOmniContextRetrieveBreaker } =
  await import("../../../src/lib/omnicontext/retrieveCached.ts");
const { getOmniContextMetricsSummary, resetOmniContextMetrics, recordInjectSkipped } =
  await import("../../../src/lib/omnicontext/metrics.ts");
const { submitFeedback } = await import("../../../src/lib/omnicontext/feedback.ts");
const { promoteArtifactToStable, approvePendingArtifact } =
  await import("../../../src/lib/omnicontext/promote.ts");
const { publishArtifact, PublishError } = await import("../../../src/lib/omnicontext/publish.ts");
const { RETRIEVAL_EVAL_FIXTURES } = await import("../../../src/lib/omnicontext/eval/fixtures.ts");
const { runRetrievalEvalSuite } =
  await import("../../../src/lib/omnicontext/eval/retrievalEval.ts");
const { invalidateOmniContextSettingsCache, saveOmniContextSettings } =
  await import("../../../src/lib/omnicontext/settings.ts");
const { injectOmniContext } =
  await import("../../../open-sse/services/omnicontext/omnicontextInjection.ts");

async function resetStorage() {
  invalidateOmniContextSettingsCache();
  resetOmniContextMetrics();
  clearRetrieveCache();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function createTestApiKey(id: string) {
  const db = coreDb.getDbInstance();
  db.prepare(
    "INSERT OR IGNORE INTO api_keys (id, name, key, machine_id, scopes, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, id, `sk-test-${id}`, "test-machine", "[]", new Date().toISOString());
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("migration creates omnicontext_feedback", () => {
  const db = coreDb.getDbInstance();
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE name = 'omnicontext_feedback'")
    .get() as { name: string } | undefined;
  assert.equal(row?.name, "omnicontext_feedback");
});

test("retrieve cache hits on second call", async () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p-cache" });
  addProjectMember(project.id, "k1", "member");
  createArtifact({
    projectId: project.id,
    type: "summary",
    title: "Cached summary",
    body: "Body about caching Continuity retrieve",
  });

  const params = { projectId: project.id, query: "caching", viewerApiKeyId: "k1" };
  const first = await retrieveForProjectCached(params, { ttlMs: 60_000 });
  assert.equal(first.cached, false);
  assert.ok(first.result);

  const second = await retrieveForProjectCached(params, { ttlMs: 60_000 });
  assert.equal(second.cached, true);
  assert.equal(getRetrieveCacheStats().hits >= 1, true);

  const key = computeRetrieveCacheKey(params);
  assert.equal(typeof key, "string");
  assert.equal(key.length, 64);
});

test("circuit open with cold cache skips; warm cache still serves", async () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p-cb" });
  addProjectMember(project.id, "k1", "member");
  createArtifact({
    projectId: project.id,
    type: "decision",
    title: "Breaker test",
    body: "Circuit breaker for Continuity retrieve",
  });

  const params = { projectId: project.id, query: "breaker", viewerApiKeyId: "k1" };
  const warm = await retrieveForProjectCached(params, { ttlMs: 60_000 });
  assert.ok(warm.result);

  const breaker = getOmniContextRetrieveBreaker();
  // Trip the breaker
  for (let i = 0; i < 6; i++) {
    try {
      await breaker.execute(async () => {
        throw new Error("forced");
      });
    } catch {
      /* expected */
    }
  }
  assert.equal(breaker.canExecute(), false);

  const fromCache = await retrieveForProjectCached(params, { ttlMs: 60_000 });
  assert.equal(fromCache.cached, true);
  assert.ok(fromCache.result);

  clearRetrieveCache();
  const cold = await retrieveForProjectCached(
    { projectId: project.id, query: "other-query", viewerApiKeyId: "k1" },
    { ttlMs: 60_000 }
  );
  assert.equal(cold.result, null);
  assert.equal(cold.skippedReason, "circuit_open");

  breaker.reset();
});

test("metrics record skip reasons and summary shape", () => {
  resetOmniContextMetrics();
  recordInjectSkipped("disabled");
  recordInjectSkipped("low_scope");
  recordInjectSkipped("low_scope");
  const summary = getOmniContextMetricsSummary();
  assert.equal(summary.injectSkipped.disabled, 1);
  assert.equal(summary.injectSkipped.low_scope, 2);
  assert.equal(summary.scopeUnresolvedTotal, 2);
  assert.ok("retrieveTotal" in summary);
  assert.ok("feedback" in summary);
});

test("feedback helpful/harmful fail-closed for non-member", () => {
  createTestApiKey("k1");
  createTestApiKey("k2");
  const project = createProject({ name: "P", slug: "p-fb" });
  addProjectMember(project.id, "k1", "member");
  const art = createArtifact({
    projectId: project.id,
    type: "summary",
    title: "FB",
    body: "feedback body",
  });

  assert.throws(
    () =>
      submitFeedback({
        projectId: project.id,
        artifactId: art.id,
        apiKeyId: "k2",
        verdict: "helpful",
      }),
    (err: unknown) => err instanceof PublishError && err.status === 403
  );

  const row = submitFeedback({
    projectId: project.id,
    artifactId: art.id,
    apiKeyId: "k1",
    verdict: "helpful",
  });
  assert.equal(row.verdict, "helpful");
  assert.equal(getOmniContextMetricsSummary().feedback.helpful, 1);
});

test("promote stable_prefix to trust_tier=stable (lead only)", () => {
  createTestApiKey("member");
  createTestApiKey("lead");
  const project = createProject({ name: "P", slug: "p-promote" });
  addProjectMember(project.id, "member", "member");
  addProjectMember(project.id, "lead", "lead");

  const pending = publishArtifact({
    projectId: project.id,
    apiKeyId: "member",
    type: "stable_prefix",
    title: "Conventions",
    body: "Use worktrees always.",
  });
  assert.equal(pending.artifact.status, "pending");
  assert.equal(pending.artifact.trustTier, "draft");

  assert.throws(
    () =>
      promoteArtifactToStable({
        projectId: project.id,
        artifactId: pending.artifact.id,
        apiKeyId: "member",
      }),
    (err: unknown) => err instanceof PublishError && err.status === 403
  );

  const approved = approvePendingArtifact({
    projectId: project.id,
    artifactId: pending.artifact.id,
    apiKeyId: "lead",
  });
  assert.equal(approved.status, "active");
  assert.equal(approved.trustTier, "lead_approved");

  const promoted = promoteArtifactToStable({
    projectId: project.id,
    artifactId: pending.artifact.id,
    apiKeyId: "lead",
  });
  assert.equal(promoted.trustTier, "stable");
  assert.equal(getOmniContextMetricsSummary().promoteStableTotal, 1);
});

test("retrieval eval suite meets Recall@3 gate and no wrong-project leak", () => {
  createTestApiKey("eval-key");
  const suite = runRetrievalEvalSuite(RETRIEVAL_EVAL_FIXTURES, "eval-key");
  assert.equal(suite.allPassed, true, JSON.stringify(suite.results, null, 2));
  assert.ok(suite.meanRecallAt3 >= 0.85);
});

test("inject records skip metrics when disabled", async () => {
  resetOmniContextMetrics();
  createTestApiKey("k1");
  const body = { model: "m", messages: [{ role: "user", content: "hi" }] };
  const r = await injectOmniContext({ body, headers: {}, apiKeyId: "k1", provider: "openai" });
  assert.equal(r.injected, false);
  assert.equal(r.reason, "disabled");
  assert.equal(getOmniContextMetricsSummary().injectSkipped.disabled, 1);

  await saveOmniContextSettings({ enabled: true });
});
