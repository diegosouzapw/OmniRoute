import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-p0-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_OMNICONTEXT_GIT_PROBE;

const coreDb = await import("../../../src/lib/db/core.ts");
const { createProject, addProjectMember, listProjectsForApiKey, getProjectById } =
  await import("../../../src/lib/db/omnicontextProjects.ts");
const { setRepoProjectMapping } = await import("../../../src/lib/db/omnicontextRepoMap.ts");
const { appendAuditEvent, listAuditEvents } =
  await import("../../../src/lib/db/omnicontextAudit.ts");
const {
  DEFAULT_OMNICONTEXT_SETTINGS,
  normalizeOmniContextSettings,
  isGitProbeEnvEnabled,
  invalidateOmniContextSettingsCache,
} = await import("../../../src/lib/omnicontext/settings.ts");
const { buildWorkContext } = await import("../../../src/lib/omnicontext/workContext.ts");
const { resolveScope } = await import("../../../src/lib/omnicontext/scope.ts");
const { roleHasPermission } = await import("../../../src/lib/omnicontext/permissions.ts");
const { PROJECT_ID_HEADER } = await import("../../../src/lib/omnicontext/types.ts");

async function resetStorage() {
  invalidateOmniContextSettingsCache();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function createTestApiKey(id: string, name: string) {
  const db = coreDb.getDbInstance();
  db.prepare(
    "INSERT OR IGNORE INTO api_keys (id, name, key, machine_id, scopes, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, name, `sk-test-${id}`, "test-machine", "[]", new Date().toISOString());
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("migration creates omnicontext tables", () => {
  const db = coreDb.getDbInstance();
  const tables = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'omnicontext_%' ORDER BY name"
    )
    .all() as Array<{ name: string }>;
  const names = tables.map((t) => t.name);
  assert.ok(names.includes("omnicontext_projects"));
  assert.ok(names.includes("omnicontext_project_members"));
  assert.ok(names.includes("omnicontext_repo_map"));
  assert.ok(names.includes("omnicontext_audit_log"));
});

test("settings default enabled false and git probe env off", () => {
  assert.equal(DEFAULT_OMNICONTEXT_SETTINGS.enabled, false);
  assert.equal(DEFAULT_OMNICONTEXT_SETTINGS.gitProbeEnabled, false);
  assert.equal(DEFAULT_OMNICONTEXT_SETTINGS.embedSource, "local");
  assert.equal(isGitProbeEnvEnabled(), false);
  const normalized = normalizeOmniContextSettings({});
  assert.equal(normalized.enabled, false);
  assert.equal(normalized.gitProbeEnabled, false);
  assert.equal(normalized.embedSource, "local");
});

test("create project, add member, list for api key", () => {
  createTestApiKey("key-1", "Dev Key");
  const project = createProject({ name: "Checkout", slug: "checkout-v2" });
  assert.ok(getProjectById(project.id));
  addProjectMember(project.id, "key-1", "member");
  const listed = listProjectsForApiKey("key-1");
  assert.equal(listed.length, 1);
  assert.equal(listed[0].id, project.id);
});

test("repo map resolve → high confidence", () => {
  createTestApiKey("key-2", "Key 2");
  const project = createProject({ name: "Payments", slug: "payments" });
  setRepoProjectMapping("checkout-service", project.id);
  const scope = resolveScope({
    workContext: {
      appCategory: "cli",
      repo: "checkout-service",
      scopeConfidence: "low",
    },
    apiKeyId: "key-2",
  });
  assert.equal(scope.confidence, "high");
  assert.equal(scope.reason, "repo_map");
  assert.equal(scope.scope.projectId, project.id);
});

test("single membership → medium confidence", () => {
  createTestApiKey("key-3", "Key 3");
  const project = createProject({ name: "Solo", slug: "solo" });
  addProjectMember(project.id, "key-3", "lead");
  const scope = resolveScope({
    workContext: { appCategory: "unknown", scopeConfidence: "low" },
    apiKeyId: "key-3",
  });
  assert.equal(scope.confidence, "medium");
  assert.equal(scope.reason, "single_membership");
  assert.equal(scope.scope.projectId, project.id);
});

test("ambiguous membership → low confidence", () => {
  createTestApiKey("key-4", "Key 4");
  const a = createProject({ name: "A", slug: "proj-a" });
  const b = createProject({ name: "B", slug: "proj-b" });
  addProjectMember(a.id, "key-4", "member");
  addProjectMember(b.id, "key-4", "member");
  const scope = resolveScope({
    workContext: { appCategory: "cli", scopeConfidence: "low" },
    apiKeyId: "key-4",
  });
  assert.equal(scope.confidence, "low");
  assert.equal(scope.reason, "ambiguous_membership");
  assert.equal(scope.scope.projectId, undefined);
});

test("explicit project header → high confidence", () => {
  const project = createProject({ name: "Header", slug: "header-proj" });
  const headers = new Headers({ [PROJECT_ID_HEADER]: project.id });
  const scope = resolveScope({ headers });
  assert.equal(scope.confidence, "high");
  assert.equal(scope.reason, "explicit_project_id");
});

test("workContext does not git-probe by default", async () => {
  const wc = await buildWorkContext({
    cwd: process.cwd(),
    gitProbeEnabled: false,
    headers: { "x-omniroute-repo": "from-header" },
  });
  assert.equal(wc.repo, "from-header");
  assert.equal(wc.gitBranch, undefined);
});

test("audit append works without bodies", () => {
  const project = createProject({ name: "Audit", slug: "audit" });
  appendAuditEvent({
    action: "project.create",
    projectId: project.id,
    meta: { slug: "audit" },
  });
  const events = listAuditEvents({ projectId: project.id });
  assert.equal(events.length, 1);
  assert.equal(events[0].action, "project.create");
  assert.deepEqual(events[0].artifactIds, []);
});

test("permissions: lead can approve, member cannot", () => {
  assert.equal(roleHasPermission("lead", "APPROVE"), true);
  assert.equal(roleHasPermission("member", "APPROVE"), false);
  assert.equal(roleHasPermission("admin", "MANAGE_PROJECT"), true);
});
