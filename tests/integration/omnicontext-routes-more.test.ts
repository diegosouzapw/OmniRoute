import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-int2-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-32chars-xxxxxx";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { createProject, addProjectMember } = await import("../../src/lib/db/omnicontextProjects.ts");
const { publishArtifact } = await import("../../src/lib/omnicontext/publish.ts");
const { invalidateOmniContextSettingsCache } =
  await import("../../src/lib/omnicontext/settings.ts");

const projectIdRoute = await import("../../src/app/api/omnicontext/projects/[id]/route.ts");
const membersRoute = await import("../../src/app/api/omnicontext/projects/[id]/members/route.ts");
const artifactsRoute =
  await import("../../src/app/api/omnicontext/projects/[id]/artifacts/route.ts");
const handoffsRoute = await import("../../src/app/api/omnicontext/projects/[id]/handoffs/route.ts");
const bootstrapRoute =
  await import("../../src/app/api/omnicontext/projects/[id]/bootstrap/route.ts");
const metricsRoute = await import("../../src/app/api/omnicontext/metrics/route.ts");
const repoMapRoute = await import("../../src/app/api/omnicontext/repo-map/route.ts");
const teamsRoute = await import("../../src/app/api/omnicontext/teams/route.ts");
const v1Projects = await import("../../src/app/api/v1/omnicontext/projects/route.ts");
const v1Handoffs = await import("../../src/app/api/v1/omnicontext/handoffs/route.ts");
const v1Bootstrap = await import("../../src/app/api/v1/omnicontext/bootstrap/route.ts");
const v1Artifacts = await import("../../src/app/api/v1/omnicontext/artifacts/route.ts");
const v1Retrieve = await import("../../src/app/api/v1/omnicontext/retrieve/route.ts");
const v1Feedback = await import("../../src/app/api/v1/omnicontext/feedback/route.ts");

async function resetStorage() {
  invalidateOmniContextSettingsCache();
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await localDb.updateSettings({ requireLogin: false });
}

function req(
  url: string,
  {
    method = "GET",
    body,
    headers,
  }: { method?: string; body?: unknown; headers?: Record<string, string> } = {}
) {
  const h = new Headers(headers || {});
  if (body !== undefined) h.set("content-type", "application/json");
  return new NextRequest(url, {
    method,
    headers: h,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function ctx(id: string) {
  return { params: Promise.resolve({ id }) };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("project PATCH/DELETE + members GET/DELETE + artifact approve/delete", async () => {
  const project = createProject({ name: "Delta", slug: "delta" });
  const key = await apiKeysDb.createApiKey("lead", "m-lead");
  addProjectMember(project.id, key.id, "lead");

  const patched = await projectIdRoute.PATCH(
    req(`http://localhost/api/omnicontext/projects/${project.id}`, {
      method: "PATCH",
      body: { name: "Delta2", injectEnabled: false },
    }),
    ctx(project.id)
  );
  assert.equal(patched.status, 200);

  const membersGet = await membersRoute.GET(
    req(`http://localhost/api/omnicontext/projects/${project.id}/members`),
    ctx(project.id)
  );
  assert.equal(membersGet.status, 200);

  const pending = publishArtifact({
    projectId: project.id,
    apiKeyId: key.id,
    type: "summary",
    title: "Pending",
    body: "needs approve",
    publishPolicy: "review_required",
  });
  const approve = await artifactsRoute.PATCH(
    req(`http://localhost/api/omnicontext/projects/${project.id}/artifacts`, {
      method: "PATCH",
      body: { artifactId: pending.artifact.id, action: "approve", apiKeyId: key.id },
    }),
    ctx(project.id)
  );
  assert.equal(approve.status, 200);

  const promote = await artifactsRoute.PATCH(
    req(`http://localhost/api/omnicontext/projects/${project.id}/artifacts`, {
      method: "PATCH",
      body: { artifactId: pending.artifact.id, action: "promote_stable", apiKeyId: key.id },
    }),
    ctx(project.id)
  );
  assert.equal(promote.status, 200);

  const delArt = await artifactsRoute.DELETE(
    req(
      `http://localhost/api/omnicontext/projects/${project.id}/artifacts?artifactId=${pending.artifact.id}`,
      { method: "DELETE" }
    ),
    ctx(project.id)
  );
  assert.equal(delArt.status, 200);

  const member2 = await apiKeysDb.createApiKey("tmp", "m-tmp");
  await membersRoute.POST(
    req(`http://localhost/api/omnicontext/projects/${project.id}/members`, {
      method: "POST",
      body: { apiKeyId: member2.id, role: "member" },
    }),
    ctx(project.id)
  );
  const delMember = await membersRoute.DELETE(
    req(`http://localhost/api/omnicontext/projects/${project.id}/members?apiKeyId=${member2.id}`, {
      method: "DELETE",
    }),
    ctx(project.id)
  );
  assert.equal(delMember.status, 200);

  const deleted = await projectIdRoute.DELETE(
    req(`http://localhost/api/omnicontext/projects/${project.id}`, { method: "DELETE" }),
    ctx(project.id)
  );
  assert.equal(deleted.status, 200);
});

test("bootstrap + handoff resume + repo-map delete + metrics reset", async () => {
  const project = createProject({ name: "Eps", slug: "eps" });
  const key = await apiKeysDb.createApiKey("boot", "m-boot");
  addProjectMember(project.id, key.id, "admin");

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "oc-int-boot-"));
  fs.writeFileSync(path.join(dir, "README.md"), "# Readme\nHello\n");
  const boot = await bootstrapRoute.POST(
    req(`http://localhost/api/omnicontext/projects/${project.id}/bootstrap`, {
      method: "POST",
      body: { apiKeyId: key.id, cwd: dir },
    }),
    ctx(project.id)
  );
  assert.equal(boot.status, 201);
  fs.rmSync(dir, { recursive: true, force: true });

  const handoff = await handoffsRoute.POST(
    req(`http://localhost/api/omnicontext/projects/${project.id}/handoffs`, {
      method: "POST",
      body: { apiKeyId: key.id, goal: "Resume me" },
    }),
    ctx(project.id)
  );
  const handoffId = ((await handoff.json()) as { handoff: { id: string } }).handoff.id;
  const resume = await handoffsRoute.PATCH(
    req(`http://localhost/api/omnicontext/projects/${project.id}/handoffs`, {
      method: "PATCH",
      body: { handoffId, action: "resume", apiKeyId: key.id },
    }),
    ctx(project.id)
  );
  assert.equal(resume.status, 200);

  await repoMapRoute.PUT(
    req("http://localhost/api/omnicontext/repo-map", {
      method: "PUT",
      body: { repoKey: "acme/eps", projectId: project.id },
    })
  );
  const delMap = await repoMapRoute.DELETE(
    req("http://localhost/api/omnicontext/repo-map?repoKey=acme/eps", { method: "DELETE" })
  );
  assert.equal(delMap.status, 200);

  const metricsDel = await metricsRoute.DELETE(
    req("http://localhost/api/omnicontext/metrics", { method: "DELETE" })
  );
  assert.equal(metricsDel.status, 200);

  const teamsList = await teamsRoute.GET(req("http://localhost/api/omnicontext/teams"));
  assert.equal(teamsList.status, 200);
});

test("v1 projects/handoffs/bootstrap + auth failures", async () => {
  const key = await apiKeysDb.createApiKey("v1", "m-v1");
  const project = createProject({ name: "Zeta", slug: "zeta" });
  addProjectMember(project.id, key.id, "member");
  const auth = { authorization: `Bearer ${key.key}` };

  const projects = await v1Projects.GET(
    req("http://localhost/api/v1/omnicontext/projects", { headers: auth })
  );
  assert.equal(projects.status, 200);

  const handoff = await v1Handoffs.POST(
    req("http://localhost/api/v1/omnicontext/handoffs", {
      method: "POST",
      headers: auth,
      body: { projectId: project.id, goal: "v1 handoff" },
    })
  );
  assert.equal(handoff.status, 201);
  const handoffId = ((await handoff.json()) as { handoff: { id: string } }).handoff.id;

  const listH = await v1Handoffs.GET(
    req(`http://localhost/api/v1/omnicontext/handoffs?projectId=${project.id}`, {
      headers: auth,
    })
  );
  assert.equal(listH.status, 200);

  const close = await v1Handoffs.PATCH(
    req("http://localhost/api/v1/omnicontext/handoffs", {
      method: "PATCH",
      headers: auth,
      body: { handoffId, action: "close" },
    })
  );
  assert.equal(close.status, 200);

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "oc-v1-boot-"));
  fs.writeFileSync(path.join(dir, "CLAUDE.md"), "# Claude\n");
  const boot = await v1Bootstrap.POST(
    req("http://localhost/api/v1/omnicontext/bootstrap", {
      method: "POST",
      headers: auth,
      body: { projectId: project.id, cwd: dir },
    })
  );
  assert.equal(boot.status, 201);
  fs.rmSync(dir, { recursive: true, force: true });

  const unauth = await v1Artifacts.GET(
    req("http://localhost/api/v1/omnicontext/artifacts?projectId=x")
  );
  assert.equal(unauth.status, 401);

  const forbidden = await v1Retrieve.POST(
    req("http://localhost/api/v1/omnicontext/retrieve", {
      method: "POST",
      headers: auth,
      body: { projectId: "missing-project", query: "x" },
    })
  );
  assert.equal(forbidden.status, 403);

  const badFeedback = await v1Feedback.GET(
    req("http://localhost/api/v1/omnicontext/feedback", { headers: auth })
  );
  assert.equal(badFeedback.status, 400);

  const feedbackList = await v1Feedback.GET(
    req(`http://localhost/api/v1/omnicontext/feedback?projectId=${project.id}`, {
      headers: auth,
    })
  );
  assert.equal(feedbackList.status, 200);
});

test("not-found and validation edges", async () => {
  const missing = await projectIdRoute.GET(
    req("http://localhost/api/omnicontext/projects/nope"),
    ctx("nope")
  );
  assert.equal(missing.status, 404);

  const badTeam = await teamsRoute.POST(
    req("http://localhost/api/omnicontext/teams", {
      method: "POST",
      body: { name: "X", slug: "BAD" },
    })
  );
  assert.equal(badTeam.status, 400);

  const badMap = await repoMapRoute.PUT(
    req("http://localhost/api/omnicontext/repo-map", {
      method: "PUT",
      body: { repoKey: "r", projectId: "missing" },
    })
  );
  assert.equal(badMap.status, 404);

  const delMissingArt = await artifactsRoute.DELETE(
    req("http://localhost/api/omnicontext/projects/p/artifacts", { method: "DELETE" }),
    ctx("p")
  );
  assert.equal(delMissingArt.status, 400);
});
