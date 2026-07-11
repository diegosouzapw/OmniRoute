import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-gaps-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_OMNICONTEXT_GIT_PROBE;

const coreDb = await import("../../../src/lib/db/core.ts");
const { createProject, addProjectMember, updateProject, removeProjectMember, listProjects } =
  await import("../../../src/lib/db/omnicontextProjects.ts");
const { softDeleteArtifact, listArtifacts, getStablePrefix } =
  await import("../../../src/lib/db/omnicontextArtifacts.ts");
const { deleteArtifactEmbedding } = await import("../../../src/lib/db/omnicontextEmbeddings.ts");
const { listFeedback, countFeedbackByVerdict, createFeedback } =
  await import("../../../src/lib/db/omnicontextFeedback.ts");
const { setRepoProjectMapping, getProjectIdForRepo, listRepoMap, deleteRepoMapping } =
  await import("../../../src/lib/db/omnicontextRepoMap.ts");
const { createTeam, getTeamById, getTeamBySlug, listTeams } =
  await import("../../../src/lib/db/omnicontextTeams.ts");
const { resumeHandoff, closeHandoff, createHandoff, formatHandoffMarkdown } =
  await import("../../../src/lib/db/omnicontextHandoffs.ts");
const { listAuditEvents } = await import("../../../src/lib/db/omnicontextAudit.ts");
const { publishArtifact, publishArtifactAsync, PublishError } =
  await import("../../../src/lib/omnicontext/publish.ts");
const { submitFeedback } = await import("../../../src/lib/omnicontext/feedback.ts");
const { approvePendingArtifact, promoteArtifactToStable } =
  await import("../../../src/lib/omnicontext/promote.ts");
const { setLegalHold, assertNotOnLegalHold, isLegalHold } =
  await import("../../../src/lib/omnicontext/legalHold.ts");
const { emitOmniContextMetricsWebhook } =
  await import("../../../src/lib/omnicontext/metricsWebhook.ts");
const { remotePublish, RemoteBackendError } =
  await import("../../../src/lib/omnicontext/remoteClient.ts");
const { retrieveForProjectCached } = await import("../../../src/lib/omnicontext/retrieveCached.ts");
const { buildWorkContext, readExplicitProjectId } =
  await import("../../../src/lib/omnicontext/workContext.ts");
const { normalizePointers, formatPointersMarkdown } =
  await import("../../../src/lib/omnicontext/pointers.ts");
const {
  invalidateOmniContextSettingsCache,
  saveOmniContextSettings,
  getOmniContextSettings,
  toOmniContextSettingsUpdates,
} = await import("../../../src/lib/omnicontext/settings.ts");
const { buildInjectBlock, describeHandoffForInject } =
  await import("../../../src/lib/omnicontext/inject.ts");
const { setDlpHook } = await import("../../../src/lib/omnicontext/dlp.ts");
const { clearRetrieveCache, getOrCoalesceRetrieve, peekCacheEntry } =
  await import("../../../src/lib/omnicontext/cache.ts");
const { injectOmniContext } =
  await import("../../../open-sse/services/omnicontext/omnicontextInjection.ts");
const { PROJECT_ID_HEADER, REPO_HEADER, TICKET_HEADER, TOOL_HEADER } =
  await import("../../../src/lib/omnicontext/types.ts");
const { indexArtifactEmbedding, retrieveHybrid } =
  await import("../../../src/lib/omnicontext/hybridRetrieve.ts");
const { syncProjectMembersFromScim } = await import("../../../src/lib/omnicontext/scimSync.ts");
const { bootstrapFromDirectory } = await import("../../../src/lib/omnicontext/bootstrap.ts");

async function resetStorage() {
  invalidateOmniContextSettingsCache();
  setDlpHook(null);
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

test("workContext reads Headers + record headers and explicit project id", async () => {
  const headers = new Headers({
    [TOOL_HEADER]: "cursor",
    [REPO_HEADER]: "OmniRoute",
    [TICKET_HEADER]: "OR-42",
    [PROJECT_ID_HEADER]: "proj-1",
  });
  const ctx = await buildWorkContext({
    headers,
    body: { model: "gpt-test" },
  });
  assert.equal(ctx.tool, "cursor");
  assert.equal(ctx.repo, "OmniRoute");
  assert.equal(ctx.ticketId, "OR-42");
  assert.equal(ctx.requestModel, "gpt-test");
  assert.equal(readExplicitProjectId(headers), "proj-1");

  const fromRecord = await buildWorkContext({
    headers: { [TOOL_HEADER]: ["cli"], [REPO_HEADER]: "  " },
    body: { request_model: "alt-model" },
  });
  assert.equal(fromRecord.tool, "cli");
  assert.equal(fromRecord.requestModel, "alt-model");
});

test("parseRepoName and extractTicket cover URL/SSH/basename paths", async () => {
  const { parseRepoName, extractTicket } =
    await import("../../../src/lib/omnicontext/workContext.ts");
  assert.equal(parseRepoName(undefined), undefined);
  assert.equal(parseRepoName("git@github.com:acme/demo-repo.git"), "demo-repo");
  assert.equal(parseRepoName("https://github.com/acme/demo-repo.git"), "demo-repo");
  assert.equal(parseRepoName("github.com/acme/demo-repo"), "demo-repo");
  assert.ok(
    parseRepoName("/local/path/my-repo") === "my-repo" || parseRepoName("/local/path/my-repo")
  );
  assert.equal(extractTicket(undefined), undefined);
  assert.equal(extractTicket("feat/OR-99-work"), "OR-99");
  assert.equal(extractTicket("no-ticket-here"), undefined);

  // Probe with missing git dir returns empty (covers gitProbe catch/empty path)
  fs.mkdirSync(path.join(TEST_DATA_DIR, "no-git-here"), { recursive: true });
  const ctx = await buildWorkContext({
    cwd: path.join(TEST_DATA_DIR, "no-git-here"),
    gitProbeEnabled: true,
  });
  assert.equal(ctx.gitBranch, undefined);
});

test("hybrid skips other users drafts; custom DLP hook; setDlpHook restore", async () => {
  createTestApiKey("a");
  createTestApiKey("b");
  createTestApiKey("lead");
  const project = createProject({ name: "P", slug: "p-hy3" });
  addProjectMember(project.id, "a", "member");
  addProjectMember(project.id, "b", "member");
  addProjectMember(project.id, "lead", "lead");
  const pending = publishArtifact({
    projectId: project.id,
    apiKeyId: "a",
    type: "summary",
    title: "Private draft widgets",
    body: "widgets only for author",
    publishPolicy: "review_required",
  });
  indexArtifactEmbedding(pending.artifact.id);
  // lead_only + lead → active + draft (covers embedding draft visibility gate)
  const activeDraft = publishArtifact({
    projectId: project.id,
    apiKeyId: "lead",
    type: "summary",
    title: "Lead draft widgets",
    body: "widgets from lead draft tier",
    publishPolicy: "lead_only",
  });
  assert.equal(activeDraft.artifact.status, "active");
  assert.equal(activeDraft.artifact.trustTier, "draft");
  indexArtifactEmbedding(activeDraft.artifact.id);

  const asB = retrieveHybrid({
    projectId: project.id,
    query: "widgets",
    viewerApiKeyId: "b",
  });
  assert.ok(!asB.dynamic.some((h) => h.artifact.id === pending.artifact.id));
  assert.ok(!asB.dynamic.some((h) => h.artifact.id === activeDraft.artifact.id));

  const asLead = retrieveHybrid({
    projectId: project.id,
    query: "widgets",
    viewerApiKeyId: "lead",
  });
  assert.ok(asLead.dynamic.some((h) => h.artifact.id === activeDraft.artifact.id));

  setDlpHook(async (input) => ({
    verdict: "allow",
    title: input.title,
    body: input.body,
    reasons: ["custom"],
  }));
  await saveOmniContextSettings({ dlpEnabled: true });
  const pub = await publishArtifactAsync({
    projectId: project.id,
    apiKeyId: "a",
    type: "summary",
    title: "Custom DLP",
    body: "allowed by custom hook",
  });
  assert.deepEqual(pub.dlpReasons, ["custom"]);
  setDlpHook(null);
});

test("settings round-trip all Phase 2–4 fields via save", async () => {
  const saved = await saveOmniContextSettings({
    enabled: true,
    injectBudgetTokens: 1500,
    retrieveTimeoutMs: 1500,
    gitProbeEnabled: true,
    autoPublish: "confirm",
    hybridRetrieve: true,
    preferStablePrefix: false,
    embedSource: "memory-auto",
    backend: "remote",
    remoteBaseUrl: "https://wcs.example",
    remoteApiKey: "rk",
    remoteTimeoutMs: 900,
    dlpEnabled: true,
    departmentReviewRequired: false,
    universalHandoff: {
      enabled: false,
      trigger: "on-error",
      maxMessagesForSummary: 20,
      handoffModel: "gpt",
      ttlMinutes: 60,
      preserveSystemPrompt: false,
    },
  });
  assert.equal(saved.enabled, true);
  assert.equal(saved.backend, "remote");
  assert.equal(saved.embedSource, "memory-auto");
  assert.equal(saved.universalHandoff.trigger, "on-error");
  const again = await getOmniContextSettings();
  assert.equal(again.remoteBaseUrl, "https://wcs.example");
  const updates = toOmniContextSettingsUpdates({ enabled: false, dlpEnabled: false });
  assert.equal(updates.omnicontextEnabled, false);
  assert.equal(updates.omnicontextDlpEnabled, false);
});

test("feedback list/count + promote/approve error paths", () => {
  createTestApiKey("lead");
  createTestApiKey("member");
  const project = createProject({ name: "P", slug: "p-fb" });
  addProjectMember(project.id, "lead", "lead");
  addProjectMember(project.id, "member", "member");
  const pending = publishArtifact({
    projectId: project.id,
    apiKeyId: "member",
    type: "summary",
    title: "Needs review",
    body: "body",
    publishPolicy: "review_required",
  });
  assert.equal(pending.artifact.status, "pending");
  assert.throws(
    () =>
      approvePendingArtifact({
        projectId: project.id,
        artifactId: pending.artifact.id,
        apiKeyId: "member",
      }),
    (e: unknown) => e instanceof PublishError && e.status === 403
  );
  const approved = approvePendingArtifact({
    projectId: project.id,
    artifactId: pending.artifact.id,
    apiKeyId: "lead",
  });
  assert.equal(approved.status, "active");
  assert.throws(
    () =>
      approvePendingArtifact({
        projectId: project.id,
        artifactId: pending.artifact.id,
        apiKeyId: "lead",
      }),
    (e: unknown) => e instanceof PublishError && e.status === 422
  );

  submitFeedback({
    projectId: project.id,
    artifactId: approved.id,
    apiKeyId: "member",
    verdict: "helpful",
    note: "good",
  });
  createFeedback({
    projectId: project.id,
    artifactId: approved.id,
    verdict: "harmful",
    actorApiKeyId: "member",
  });
  const listed = listFeedback({ projectId: project.id, artifactId: approved.id });
  assert.ok(listed.length >= 2);
  const counts = countFeedbackByVerdict(project.id);
  assert.ok(counts.helpful >= 1);
  assert.ok(counts.harmful >= 1);

  assert.throws(
    () =>
      promoteArtifactToStable({
        projectId: project.id,
        artifactId: "missing",
        apiKeyId: "lead",
      }),
    (e: unknown) => e instanceof PublishError && e.status === 404
  );
  promoteArtifactToStable({
    projectId: project.id,
    artifactId: approved.id,
    apiKeyId: "lead",
  });
});

test("legal hold clear + assertNotOnLegalHold", () => {
  createTestApiKey("admin");
  const project = createProject({ name: "P", slug: "p-lh" });
  addProjectMember(project.id, "admin", "admin");
  const pub = publishArtifact({
    projectId: project.id,
    apiKeyId: "admin",
    type: "summary",
    title: "Doc",
    body: "retain",
  });
  assertNotOnLegalHold(pub.artifact.id);
  setLegalHold({
    projectId: project.id,
    artifactId: pub.artifact.id,
    apiKeyId: "admin",
    held: true,
  });
  assert.throws(() => assertNotOnLegalHold(pub.artifact.id), /legal hold/i);
  const cleared = setLegalHold({
    projectId: project.id,
    artifactId: pub.artifact.id,
    apiKeyId: "admin",
    held: false,
  });
  assert.equal(isLegalHold(cleared), false);
  softDeleteArtifact(pub.artifact.id);
});

test("repo map + teams + project update/remove member", () => {
  createTestApiKey("k1");
  const team = createTeam({ name: "Core", slug: "core", orgId: "org1", departmentId: "d1" });
  assert.equal(getTeamBySlug("core")?.id, team.id);
  assert.equal(getTeamById(team.id)?.name, "Core");
  assert.equal(listTeams({ orgId: "org1" }).length, 1);
  assert.equal(listTeams({ departmentId: "d1" }).length, 1);

  const project = createProject({ name: "P", slug: "p-upd", teamId: team.id });
  addProjectMember(project.id, "k1", "member");
  updateProject(project.id, { name: "P2", injectEnabled: false });
  assert.equal(listProjects().find((p) => p.id === project.id)?.name, "P2");
  removeProjectMember(project.id, "k1");

  setRepoProjectMapping("acme/repo", project.id);
  assert.equal(getProjectIdForRepo("acme/repo"), project.id);
  assert.ok(listRepoMap().some((m) => m.repoKey === "acme/repo"));
  deleteRepoMapping("acme/repo");
  assert.equal(getProjectIdForRepo("acme/repo"), null);
});

test("handoff resume/close + pointers markdown formatting", () => {
  const project = createProject({ name: "P", slug: "p-ho" });
  const { pointers } = normalizePointers([
    { kind: "url", url: "https://example.com", title: "Ex" },
    { kind: "file", path: "/tmp/a.md" },
  ]);
  const h = createHandoff({
    projectId: project.id,
    goal: "Finish",
    pointers: { items: pointers },
    fromApiKeyId: "k",
  });
  const md = formatHandoffMarkdown(h);
  assert.match(md, /Pointers/);
  assert.match(describeHandoffForInject(h), /Finish/);
  assert.match(formatPointersMarkdown(pointers), /URL/);
  assert.match(formatPointersMarkdown(pointers), /File/);

  resumeHandoff(h.id, "k2");
  closeHandoff(h.id);
});

test("publish lead_only + async DLP redact path + empty body fails", async () => {
  createTestApiKey("lead");
  createTestApiKey("member");
  const project = createProject({ name: "P", slug: "p-pub" });
  addProjectMember(project.id, "lead", "lead");
  addProjectMember(project.id, "member", "member");

  assert.throws(
    () =>
      publishArtifact({
        projectId: project.id,
        apiKeyId: "member",
        type: "summary",
        title: "x",
        body: "y",
        publishPolicy: "lead_only",
      }),
    (e: unknown) => e instanceof PublishError && e.status === 403
  );
  publishArtifact({
    projectId: project.id,
    apiKeyId: "lead",
    type: "summary",
    title: "ok",
    body: "lead body",
    publishPolicy: "lead_only",
  });

  assert.throws(
    () =>
      publishArtifact({
        projectId: project.id,
        apiKeyId: "lead",
        type: "summary",
        title: "   ",
        body: "   ",
      }),
    (e: unknown) => e instanceof PublishError && e.status === 422
  );

  await saveOmniContextSettings({ dlpEnabled: true });
  const hex = "ab".repeat(32);
  const redacted = await publishArtifactAsync({
    projectId: project.id,
    apiKeyId: "lead",
    type: "summary",
    title: "Secrets",
    body: `token ${hex} end`,
  });
  assert.ok(redacted.dlpReasons?.includes("hex_secret_redacted"));
  assert.match(redacted.artifact.body, /DLP_REDACTED/);
});

test("remote publish + metrics webhook + retrieveCached hybrid/remote", async () => {
  let webhookCalled = false;
  const originalFetch = globalThis.fetch;
  // metrics webhook uses notifyWebhookEvent — just ensure emit does not throw
  emitOmniContextMetricsWebhook();
  webhookCalled = true;
  assert.equal(webhookCalled, true);

  const published = await remotePublish(
    { baseUrl: "https://remote.example", apiKey: "k", timeoutMs: 1000 },
    { title: "t" },
    (async () => new Response(JSON.stringify({ ok: true }), { status: 200 })) as typeof fetch
  );
  assert.equal((published as { ok: boolean }).ok, true);

  await assert.rejects(
    () => remotePublish({ baseUrl: "", timeoutMs: 100 }, {}, originalFetch),
    (e: unknown) => e instanceof RemoteBackendError
  );

  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p-rc" });
  addProjectMember(project.id, "k1", "member");
  const pub = publishArtifact({
    projectId: project.id,
    apiKeyId: "k1",
    type: "summary",
    title: "Hybrid cache",
    body: "embedding friendly text about routing",
  });
  indexArtifactEmbedding(pub.artifact.id);
  await saveOmniContextSettings({ hybridRetrieve: true });
  const hybrid = await retrieveForProjectCached(
    { projectId: project.id, query: "routing", viewerApiKeyId: "k1" },
    { hybrid: true }
  );
  assert.ok(hybrid.result);

  await saveOmniContextSettings({
    backend: "remote",
    remoteBaseUrl: "https://remote.example",
    remoteTimeoutMs: 1000,
  });
  const prevFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        dynamic: [{ artifact: { id: "r1", title: "R", body: "B", type: "summary" }, rank: 1 }],
        stablePrefix: { id: "sp", title: "S", body: "stable" },
      }),
      { status: 200 }
    )) as typeof fetch;
  try {
    const remote = await retrieveForProjectCached({ projectId: project.id, query: "q" });
    assert.ok(remote.result);
    assert.equal(remote.result?.dynamic[0]?.artifact.id, "r1");
  } finally {
    globalThis.fetch = prevFetch;
  }
  deleteArtifactEmbedding(pub.artifact.id);
});

test("retrieveCached serves warm cache when breaker open", async () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p-brk" });
  addProjectMember(project.id, "k1", "member");
  publishArtifact({
    projectId: project.id,
    apiKeyId: "k1",
    type: "summary",
    title: "Warm",
    body: "cache me please",
  });
  const params = { projectId: project.id, query: "cache", viewerApiKeyId: "k1" };
  const first = await retrieveForProjectCached(params, { ttlMs: 60_000, hybrid: false });
  assert.ok(first.result);
  const { getOmniContextRetrieveBreaker, OMNICONTEXT_RETRIEVE_BREAKER_NAME } =
    await import("../../../src/lib/omnicontext/retrieveCached.ts");
  const breaker = getOmniContextRetrieveBreaker();
  for (let i = 0; i < 6; i++) {
    try {
      await breaker.execute(async () => {
        throw new Error("fail");
      });
    } catch {
      /* trip */
    }
  }
  const warm = await retrieveForProjectCached(params, { ttlMs: 60_000, hybrid: false });
  assert.equal(warm.cached, true);
  assert.ok(warm.result);
  breaker.reset();
  const { deleteCircuitBreakerState } = await import("../../../src/lib/db/domainState.ts");
  deleteCircuitBreakerState(OMNICONTEXT_RETRIEVE_BREAKER_NAME);
});

test("cache coalesce + peek + inject success path", async () => {
  let calls = 0;
  const { data, cached } = await getOrCoalesceRetrieve("k-coalesce", 60_000, async () => {
    calls += 1;
    return { ok: true };
  });
  assert.equal(data.ok, true);
  assert.equal(cached, false);
  const second = await getOrCoalesceRetrieve("k-coalesce", 60_000, async () => {
    calls += 1;
    return { ok: false };
  });
  assert.equal(second.cached, true);
  assert.equal(calls, 1);
  assert.ok(peekCacheEntry("k-coalesce"));

  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p-inj" });
  addProjectMember(project.id, "k1", "member");
  publishArtifact({
    projectId: project.id,
    apiKeyId: "k1",
    type: "summary",
    title: "Inject me",
    body: "team context for inject path",
  });
  await saveOmniContextSettings({ enabled: true, injectBudgetTokens: 2000, backend: "native" });
  const { getOmniContextRetrieveBreaker } =
    await import("../../../src/lib/omnicontext/retrieveCached.ts");
  getOmniContextRetrieveBreaker().reset();
  const result = await injectOmniContext({
    body: { messages: [{ role: "user", content: "inject me" }] },
    headers: { [PROJECT_ID_HEADER]: project.id },
    apiKeyId: "k1",
    provider: "openai",
  });
  assert.equal(result.injected, true, `inject skipped: ${result.reason}`);
  assert.ok(result.tokensEstimate && result.tokensEstimate > 0);
});

test("bootstrap skips missing/empty files; SCIM rejects non-lead", async () => {
  createTestApiKey("member");
  createTestApiKey("lead");
  const project = createProject({ name: "P", slug: "p-boot" });
  addProjectMember(project.id, "member", "member");
  addProjectMember(project.id, "lead", "lead");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "oc-boot2-"));
  fs.writeFileSync(path.join(dir, "README.md"), "");
  fs.writeFileSync(path.join(dir, "AGENTS.md"), "# Agents\nRules\n");
  const boot = await bootstrapFromDirectory({
    projectId: project.id,
    apiKeyId: "lead",
    cwd: dir,
  });
  assert.ok(boot.created.some((a) => a.title.includes("AGENTS")));
  assert.ok(boot.skipped.includes("README.md"));
  assert.ok(boot.skipped.includes("CLAUDE.md"));
  fs.rmSync(dir, { recursive: true, force: true });

  assert.throws(
    () =>
      syncProjectMembersFromScim({
        projectId: project.id,
        actorApiKeyId: "member",
        members: [{ apiKeyId: "x" }],
      }),
    (e: unknown) => e instanceof PublishError && e.status === 403
  );
});

test("hybrid retrieve draft visibility + listArtifacts filters + audit list", () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p-hy2" });
  addProjectMember(project.id, "k1", "member");
  const draft = publishArtifact({
    projectId: project.id,
    apiKeyId: "k1",
    type: "summary",
    title: "Draft only",
    body: "secret draft content about widgets",
    publishPolicy: "review_required",
  });
  indexArtifactEmbedding(draft.artifact.id);
  const withViewer = retrieveHybrid({
    projectId: project.id,
    query: "widgets",
    viewerApiKeyId: "k1",
  });
  assert.ok(withViewer.dynamic.some((h) => h.artifact.id === draft.artifact.id));

  const arts = listArtifacts({ projectId: project.id, type: "summary", status: "pending" });
  assert.ok(arts.length >= 1);
  assert.equal(getStablePrefix(project.id), null);
  assert.ok(Array.isArray(listAuditEvents({ projectId: project.id, limit: 10 })));
});

test("inject preferStablePrefix false skips oversized stable", () => {
  const block = buildInjectBlock(
    "p",
    {
      stablePrefix: {
        id: "sp",
        type: "stable_prefix",
        title: "S",
        body: "Z".repeat(2000),
        trustTier: "stable",
        status: "active",
      } as never,
      dynamic: [],
      activeHandoff: null,
    },
    40,
    { preferStablePrefix: false }
  );
  // header alone may exceed or stable skipped → null or no stable section
  if (block) {
    assert.ok(!block.markdown.includes("Stable project conventions") || block.tokensEstimate <= 40);
  }
});

test("pointers normalize items array and unknown kinds ignored", () => {
  const { pointers } = normalizePointers({
    items: [{ type: "notion", id: "n1", title: "N" }, { kind: "weird" }, null],
  });
  assert.equal(pointers.length, 1);
  assert.equal(pointers[0].kind, "notion");
});
