import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-p24-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_OMNICONTEXT_GIT_PROBE;

const coreDb = await import("../../../src/lib/db/core.ts");
const { createProject, addProjectMember } =
  await import("../../../src/lib/db/omnicontextProjects.ts");
const { softDeleteArtifact } = await import("../../../src/lib/db/omnicontextArtifacts.ts");
const { upsertHandoff, getHandoff } = await import("../../../src/lib/db/contextHandoffs.ts");
const { createTeam, assignProjectToTeam, listProjectsByTeam } =
  await import("../../../src/lib/db/omnicontextTeams.ts");
const { createHandoff } = await import("../../../src/lib/db/omnicontextHandoffs.ts");
const { publishArtifact, publishArtifactAsync, PublishError } =
  await import("../../../src/lib/omnicontext/publish.ts");
const { retrieveHybrid, indexArtifactEmbedding } =
  await import("../../../src/lib/omnicontext/hybridRetrieve.ts");
const { normalizePointers, formatPointersMarkdown } =
  await import("../../../src/lib/omnicontext/pointers.ts");
const { remoteRetrieve, RemoteBackendError } =
  await import("../../../src/lib/omnicontext/remoteClient.ts");
const { defaultDlpHook, setDlpHook, runDlpHook } =
  await import("../../../src/lib/omnicontext/dlp.ts");
const { setLegalHold, isLegalHold } = await import("../../../src/lib/omnicontext/legalHold.ts");
const { syncProjectMembersFromScim } = await import("../../../src/lib/omnicontext/scimSync.ts");
const { buildInjectBlock } = await import("../../../src/lib/omnicontext/inject.ts");
const {
  invalidateOmniContextSettingsCache,
  saveOmniContextSettings,
  normalizeOmniContextSettings,
} = await import("../../../src/lib/omnicontext/settings.ts");
const { EVENT_DESCRIPTIONS } = await import("../../../src/lib/webhooks/eventDescriptions.ts");

async function resetStorage() {
  invalidateOmniContextSettingsCache();
  setDlpHook(null);
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

test("migration 122 creates teams + embeddings tables and B1 columns", () => {
  const db = coreDb.getDbInstance();
  for (const name of ["omnicontext_teams", "omnicontext_artifact_embeddings"]) {
    const row = db.prepare("SELECT name FROM sqlite_master WHERE name = ?").get(name) as
      { name: string } | undefined;
    assert.equal(row?.name, name);
  }
  const cols = db.prepare(`PRAGMA table_info(context_handoffs)`).all() as Array<{
    name: string;
  }>;
  const names = new Set(cols.map((c) => c.name));
  assert.ok(names.has("approaches_tried"));
  assert.ok(names.has("blockers"));
});

test("team grouping assigns projects", () => {
  const team = createTeam({ name: "Platform", slug: "platform" });
  const project = createProject({ name: "P", slug: "p-team" });
  assignProjectToTeam(project.id, team.id);
  const listed = listProjectsByTeam(team.id);
  assert.equal(listed.length, 1);
  assert.equal(listed[0].id, project.id);
});

test("hybrid retrieve boosts embedding-similar artifacts", () => {
  createTestApiKey("k1");
  const project = createProject({ name: "P", slug: "p-hybrid" });
  addProjectMember(project.id, "k1", "member");
  const pub = publishArtifact({
    projectId: project.id,
    apiKeyId: "k1",
    type: "summary",
    title: "Circuit breaker recovery",
    body: "Provider circuit breaker opens after repeated 503 failures then half-opens.",
  });
  indexArtifactEmbedding(pub.artifact.id);
  const result = retrieveHybrid({
    projectId: project.id,
    query: "circuit breaker half-open recovery",
    viewerApiKeyId: "k1",
  });
  assert.ok(result.dynamic.some((h) => h.artifact.id === pub.artifact.id));
});

test("Notion/Obsidian pointer normalization", () => {
  const { pointers, json } = normalizePointers({
    notion: [{ id: "abc", title: "Spec", url: "https://notion.so/abc" }],
    obsidian: [{ path: "Notes/handoff.md", title: "Handoff" }],
  });
  assert.equal(pointers.length, 2);
  assert.ok(json);
  const md = formatPointersMarkdown(pointers);
  assert.match(md, /Notion/);
  assert.match(md, /Obsidian/);

  const handoff = createHandoff({
    projectId: createProject({ name: "HP", slug: "hp-ptr" }).id,
    goal: "Ship pointers",
    pointers: { items: pointers },
  });
  assert.ok(handoff.pointers);
  assert.ok(JSON.stringify(handoff.pointers).includes("notion"));
});

test("routing context_handoffs stores approaches_tried and blockers (B1)", () => {
  const now = new Date().toISOString();
  upsertHandoff({
    sessionId: "sess-b1",
    comboName: "default",
    fromAccount: "acct",
    summary: "Working on routing",
    keyDecisions: ["use hybrid"],
    taskProgress: "in_progress",
    activeEntities: [],
    approachesTried: ["pure FTS only"],
    blockers: ["embedding model unavailable"],
    messageCount: 3,
    model: "test-model",
    warningThresholdPct: 80,
    generatedAt: now,
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
  });
  const row = getHandoff("sess-b1", "default");
  assert.ok(row);
  assert.deepEqual(row.approachesTried, ["pure FTS only"]);
  assert.deepEqual(row.blockers, ["embedding model unavailable"]);
});

test("preferStablePrefix truncates stable to fit tight budget before dynamic", () => {
  const stableBody = "A".repeat(800);
  const block = buildInjectBlock(
    "proj",
    {
      stablePrefix: {
        id: "sp1",
        projectId: "proj",
        type: "stable_prefix",
        title: "Stable",
        body: stableBody,
        status: "active",
        trustTier: "stable",
      } as never,
      dynamic: [
        {
          artifact: {
            id: "d1",
            type: "summary",
            title: "Dyn",
            body: "dynamic content that should be skipped under tight budget",
            trustTier: "member",
            status: "active",
          } as never,
          rank: 1,
        },
      ],
      activeHandoff: null,
    },
    80,
    { preferStablePrefix: true }
  );
  assert.ok(block);
  assert.match(block.markdown, /Stable project conventions/);
  assert.ok(block.tokensEstimate <= 80);
  assert.ok(!block.markdown.includes("dynamic content"));
});

test("remote retrieve client parses response and fails on HTTP error", async () => {
  const ok = await remoteRetrieve(
    { baseUrl: "https://remote.example", timeoutMs: 1000 },
    { projectId: "p1", query: "q" },
    (async () =>
      new Response(
        JSON.stringify({
          dynamic: [{ artifact: { id: "a1", title: "T", body: "B", type: "summary" }, rank: 0.9 }],
          stablePrefix: null,
        }),
        { status: 200 }
      )) as typeof fetch
  );
  assert.equal(ok.artifacts.length, 1);
  assert.equal(ok.artifacts[0].id, "a1");

  await assert.rejects(
    () =>
      remoteRetrieve(
        { baseUrl: "https://remote.example", timeoutMs: 1000 },
        { projectId: "p1", query: "q" },
        (async () => new Response("nope", { status: 503 })) as typeof fetch
      ),
    (err: unknown) => err instanceof RemoteBackendError
  );
});

test("DLP blocks private key PEM and redacts hex secrets", async () => {
  const blocked = await runDlpHook({
    title: "key",
    body: "-----BEGIN PRIVATE KEY-----\nMIIE\n-----END PRIVATE KEY-----",
    projectId: "p",
  });
  assert.equal(blocked.verdict, "block");

  const redacted = defaultDlpHook({
    title: "ok",
    body: `token ${"ab".repeat(32)} end`,
    projectId: "p",
  });
  assert.equal(redacted.verdict, "redact");
  assert.match(redacted.body, /DLP_REDACTED/);
});

test("async publish with DLP enabled blocks PEM", async () => {
  createTestApiKey("k1");
  await saveOmniContextSettings({ dlpEnabled: true });
  const project = createProject({ name: "P", slug: "p-dlp" });
  addProjectMember(project.id, "k1", "member");
  await assert.rejects(
    () =>
      publishArtifactAsync({
        projectId: project.id,
        apiKeyId: "k1",
        type: "summary",
        title: "Secrets",
        body: "-----BEGIN RSA PRIVATE KEY-----\nxx\n-----END RSA PRIVATE KEY-----",
      }),
    (err: unknown) => err instanceof PublishError && err.status === 422
  );
});

test("department project forces review_required on auto publish", () => {
  createTestApiKey("k1");
  const project = createProject({
    name: "Dept",
    slug: "p-dept",
    departmentId: "eng",
  });
  addProjectMember(project.id, "k1", "member");
  const result = publishArtifact({
    projectId: project.id,
    apiKeyId: "k1",
    type: "summary",
    title: "Needs review",
    body: "Department scoped content",
  });
  assert.equal(result.artifact.status, "pending");
  assert.equal(result.artifact.trustTier, "draft");
});

test("legal hold blocks soft delete", () => {
  createTestApiKey("admin");
  const project = createProject({ name: "P", slug: "p-hold" });
  addProjectMember(project.id, "admin", "admin");
  const pub = publishArtifact({
    projectId: project.id,
    apiKeyId: "admin",
    type: "summary",
    title: "Held",
    body: "Must retain",
  });
  const held = setLegalHold({
    projectId: project.id,
    artifactId: pub.artifact.id,
    apiKeyId: "admin",
    held: true,
  });
  assert.ok(isLegalHold(held));
  assert.throws(() => softDeleteArtifact(pub.artifact.id), /legal hold/i);
});

test("SCIM sync adds new members and skips existing", () => {
  createTestApiKey("admin");
  createTestApiKey("m1");
  createTestApiKey("m2");
  const project = createProject({ name: "P", slug: "p-scim" });
  addProjectMember(project.id, "admin", "admin");
  addProjectMember(project.id, "m1", "member");
  const result = syncProjectMembersFromScim({
    projectId: project.id,
    actorApiKeyId: "admin",
    members: [
      { apiKeyId: "m1", role: "member" },
      { apiKeyId: "m2", role: "lead" },
    ],
  });
  assert.deepEqual(result.added, ["m2"]);
  assert.deepEqual(result.skipped, ["m1"]);
});

test("omnicontext.metrics webhook event is registered", () => {
  assert.ok(EVENT_DESCRIPTIONS["omnicontext.metrics"]);
});

test("settings normalize Phase 2–4 fields", () => {
  const s = normalizeOmniContextSettings({
    omnicontextHybridRetrieve: true,
    omnicontextBackend: "remote",
    omnicontextRemoteBaseUrl: "https://wcs.example",
    omnicontextDlpEnabled: true,
    omnicontextUniversalHandoff: { enabled: false, trigger: "always" },
  });
  assert.equal(s.hybridRetrieve, true);
  assert.equal(s.backend, "remote");
  assert.equal(s.remoteBaseUrl, "https://wcs.example");
  assert.equal(s.dlpEnabled, true);
  assert.equal(s.universalHandoff.enabled, false);
  assert.equal(s.universalHandoff.trigger, "always");
});
