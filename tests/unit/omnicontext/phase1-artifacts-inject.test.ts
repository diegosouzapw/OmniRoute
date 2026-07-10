import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-p1-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_OMNICONTEXT_GIT_PROBE;

const coreDb = await import("../../../src/lib/db/core.ts");
const { createProject, addProjectMember } =
  await import("../../../src/lib/db/omnicontextProjects.ts");
const { createArtifact, searchArtifacts, getStablePrefix } =
  await import("../../../src/lib/db/omnicontextArtifacts.ts");
const { createHandoff, resumeHandoff, closeHandoff, listHandoffs } =
  await import("../../../src/lib/db/omnicontextHandoffs.ts");
const { redactForPublish } = await import("../../../src/lib/omnicontext/redact.ts");
const { publishArtifact, PublishError } = await import("../../../src/lib/omnicontext/publish.ts");
const { retrieveForProject } = await import("../../../src/lib/omnicontext/retrieve.ts");
const { buildInjectBlock, estimateTokens } = await import("../../../src/lib/omnicontext/inject.ts");
const { assertInjectOrder, INJECT_LAYER_ORDER } =
  await import("../../../src/lib/omnicontext/assembler.ts");
const { bootstrapFromDirectory } = await import("../../../src/lib/omnicontext/bootstrap.ts");
const { invalidateOmniContextSettingsCache, saveOmniContextSettings } =
  await import("../../../src/lib/omnicontext/settings.ts");
const { injectOmniContext, isNoOmniContextRequested } =
  await import("../../../open-sse/services/omnicontext/omnicontextInjection.ts");
const { omnicontextTools } = await import("../../../open-sse/mcp-server/tools/omnicontextTools.ts");

async function resetStorage() {
  invalidateOmniContextSettingsCache();
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

test("migration creates artifacts + handoffs + fts", () => {
  const db = coreDb.getDbInstance();
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE name LIKE 'omnicontext_%' ORDER BY name")
    .all() as Array<{ name: string }>;
  const names = tables.map((t) => t.name);
  assert.ok(names.includes("omnicontext_artifacts"));
  assert.ok(names.includes("omnicontext_handoffs"));
  assert.ok(names.includes("omnicontext_artifact_fts"));
});

test("redact strips secrets and emails", () => {
  const r = redactForPublish("key sk-abcdefghijklmnopqrstuvwxyz123456 email a@b.co");
  assert.equal(r.redacted, true);
  assert.ok(r.text.includes("[REDACTED]"));
  assert.ok(!r.text.includes("sk-abcdefghijklmnopqrstuvwxyz123456"));
});

test("publish fails closed for non-member", () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p" });
  assert.throws(
    () =>
      publishArtifact({
        projectId: project.id,
        apiKeyId: "k1",
        type: "summary",
        title: "t",
        body: "b",
      }),
    (err: unknown) => err instanceof PublishError && err.status === 403
  );
});

test("publish redacts and stores searchable artifact", () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p" });
  addProjectMember(project.id, "k1", "member");
  const result = publishArtifact({
    projectId: project.id,
    apiKeyId: "k1",
    type: "decision",
    title: "Use SQLite",
    body: "We chose SQLite. token=sk-abcdefghijklmnopqrstuvwxyz123456",
  });
  assert.equal(result.redacted, true);
  assert.ok(result.artifact.body.includes("[REDACTED]"));
  const hits = searchArtifacts({ projectId: project.id, query: "SQLite" });
  assert.ok(hits.length >= 1);
  assert.equal(hits[0].artifact.title, "Use SQLite");
});

test("handoff create resume close lifecycle", () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p" });
  addProjectMember(project.id, "k1", "member");
  const h = createHandoff({
    projectId: project.id,
    goal: "Finish Phase 1",
    currentStatus: "in progress",
    fromApiKeyId: "k1",
  });
  assert.equal(h.status, "active");
  const resumed = resumeHandoff(h.id, "k1");
  assert.equal(resumed?.status, "resumed");
  const closed = closeHandoff(h.id);
  assert.equal(closed?.status, "closed");
  assert.equal(listHandoffs({ projectId: project.id, status: "closed" }).length, 1);
});

test("retrieve + inject respects token budget and layer order", () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p" });
  addProjectMember(project.id, "k1", "lead");
  createArtifact({
    projectId: project.id,
    type: "stable_prefix",
    title: "Conventions",
    body: "Always write tests.",
    trustTier: "stable",
    status: "active",
  });
  createArtifact({
    projectId: project.id,
    type: "decision",
    title: "FTS first",
    body: "Keyword FTS before embeddings.",
    trustTier: "member",
  });
  createHandoff({
    projectId: project.id,
    goal: "Ship inject",
    nextStepsMd: "Wire chatCore",
    fromApiKeyId: "k1",
  });

  assert.ok(getStablePrefix(project.id));
  const retrieved = retrieveForProject({
    projectId: project.id,
    query: "FTS",
    viewerApiKeyId: "k1",
  });
  assert.ok(retrieved.stablePrefix);
  assert.ok(retrieved.activeHandoff);

  const block = buildInjectBlock(project.id, retrieved, 2000);
  assert.ok(block);
  assert.ok(block.markdown.includes("Stable project conventions"));
  assert.ok(block.markdown.includes("Active handoff"));
  assert.ok(block.tokensEstimate <= 2000);
  assert.ok(estimateTokens(block.markdown) > 0);

  const tiny = buildInjectBlock(project.id, retrieved, 30);
  // May be null if header alone exceeds budget
  if (tiny) assert.ok(tiny.tokensEstimate <= 30);

  assert.equal(assertInjectOrder([...INJECT_LAYER_ORDER]), true);
  assert.equal(assertInjectOrder(["D:memory_and_skills", "A:omnicontext_stable_prefix"]), false);
});

test("bootstrap seeds from AGENTS.md", async () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p" });
  addProjectMember(project.id, "k1", "member");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "oc-boot-"));
  fs.writeFileSync(path.join(dir, "AGENTS.md"), "# Agents\nUse worktrees.\n");
  fs.writeFileSync(path.join(dir, "README.md"), "# Readme\nHello.\n");
  const result = await bootstrapFromDirectory({
    projectId: project.id,
    apiKeyId: "k1",
    cwd: dir,
  });
  assert.ok(result.created.length >= 2);
  assert.ok(result.skipped.includes("CLAUDE.md"));
  fs.rmSync(dir, { recursive: true, force: true });
});

test("injectOmniContext fail-open when disabled / opt-out / low scope", async () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p" });
  addProjectMember(project.id, "k1", "member");
  createArtifact({
    projectId: project.id,
    type: "summary",
    title: "Ctx",
    body: "Important context about checkout.",
  });

  const body = {
    model: "gpt-test",
    messages: [{ role: "user", content: "checkout help" }],
  };

  assert.equal(isNoOmniContextRequested({ "x-omniroute-no-omnicontext": "true" }), true);

  let r = await injectOmniContext({
    body: { ...body },
    headers: {},
    apiKeyId: "k1",
    provider: "openai",
  });
  assert.equal(r.injected, false);
  assert.equal(r.reason, "disabled");

  await saveOmniContextSettings({ enabled: true });

  r = await injectOmniContext({
    body: { ...body },
    headers: { "x-omniroute-no-omnicontext": "yes" },
    apiKeyId: "k1",
    provider: "openai",
  });
  assert.equal(r.injected, false);
  assert.equal(r.reason, "opt_out_header");

  // Ambiguous membership → low confidence → no inject
  const project2 = createProject({ name: "Q", slug: "q" });
  addProjectMember(project2.id, "k1", "member");
  r = await injectOmniContext({
    body: { ...body },
    headers: {},
    apiKeyId: "k1",
    provider: "openai",
  });
  assert.equal(r.injected, false);
  assert.equal(r.reason, "low_scope");

  r = await injectOmniContext({
    body: { ...body },
    headers: { "x-omniroute-project-id": project.id },
    apiKeyId: "k1",
    provider: "openai",
  });
  assert.equal(r.injected, true);
  assert.ok(
    Array.isArray(r.body.messages) &&
      (r.body.messages as Array<{ content?: string }>).some((m) =>
        String(m.content || "").includes("omniroute-omnicontext")
      )
  );
});

test("MCP omnicontext tool set is registered with scopes", () => {
  const names = Object.keys(omnicontextTools);
  assert.ok(names.includes("omniroute_omnicontext_retrieve"));
  assert.ok(names.includes("omniroute_omnicontext_publish"));
  assert.ok(names.includes("omniroute_omnicontext_handoff_create"));
  assert.deepEqual(omnicontextTools.omniroute_omnicontext_retrieve.scopes, ["read:omnicontext"]);
  assert.deepEqual(omnicontextTools.omniroute_omnicontext_publish.scopes, ["write:omnicontext"]);
});
