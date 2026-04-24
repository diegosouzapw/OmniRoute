import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skillssh-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { searchSkillsSh, fetchSkillMd, SkillsShSearchResponseSchema, SkillsShSkillSchema } =
  await import("../../src/lib/skills/skillssh.ts");
const searchRoute = await import("../../src/app/api/skills/skillssh/route.ts");
const installRoute = await import("../../src/app/api/skills/skillssh/install/route.ts");

function clearSkillRegistry() {
  skillRegistry.registeredSkills?.clear?.();
  skillRegistry.versionCache?.clear?.();
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });
  clearSkillRegistry();
  core.getDbInstance();
}

const originalFetch = globalThis.fetch;

test.beforeEach(async () => {
  resetStorage();
  await settingsDb.updateSettings({ skillsProvider: "skillssh", requireLogin: false });
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  clearSkillRegistry();
  globalThis.fetch = originalFetch;
  process.env.DATA_DIR = originalDataDir;
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// ── Zod schema validation tests ──

test("SkillsShSkillSchema parses a valid skill object", () => {
  const result = SkillsShSkillSchema.parse({
    id: "supabase/agent-skills/supabase-postgres",
    skillId: "supabase-postgres",
    name: "Supabase Postgres",
    installs: 42,
    source: "supabase/agent-skills",
  });
  assert.equal(result.id, "supabase/agent-skills/supabase-postgres");
  assert.equal(result.installs, 42);
});

test("SkillsShSkillSchema defaults installs to 0 when missing", () => {
  const result = SkillsShSkillSchema.parse({
    id: "x/y/z",
    skillId: "z",
    name: "Z Skill",
    source: "x/y",
  });
  assert.equal(result.installs, 0);
});

test("SkillsShSearchResponseSchema parses a full response", () => {
  const result = SkillsShSearchResponseSchema.parse({
    query: "postgres",
    searchType: "text",
    skills: [{ id: "a/b/c", skillId: "c", name: "C", source: "a/b" }],
    count: 1,
    duration_ms: 50,
  });
  assert.equal(result.skills.length, 1);
  assert.equal(result.count, 1);
});

test("SkillsShSearchResponseSchema defaults skills to empty array", () => {
  const result = SkillsShSearchResponseSchema.parse({});
  assert.deepEqual(result.skills, []);
});

// ── searchSkillsSh tests ──

test("searchSkillsSh returns parsed results on success", async () => {
  const mockPayload = {
    query: "test",
    searchType: "text",
    skills: [
      {
        id: "owner/repo/skill-a",
        skillId: "skill-a",
        name: "Skill A",
        installs: 10,
        source: "owner/repo",
      },
    ],
    count: 1,
    duration_ms: 12,
  };

  globalThis.fetch = async (url) => {
    assert.ok(url.includes("skills.sh/api/search"));
    assert.ok(url.includes("q=test"));
    return new Response(JSON.stringify(mockPayload), { status: 200 });
  };

  const result = await searchSkillsSh("test", 10);
  assert.equal(result.skills.length, 1);
  assert.equal(result.skills[0].skillId, "skill-a");
});

test("searchSkillsSh throws on non-ok response", async () => {
  globalThis.fetch = async () => new Response("Server Error", { status: 500 });

  await assert.rejects(
    () => searchSkillsSh("fail"),
    (err) => (err as any).message.includes("skills.sh API error: 500")
  );
});

// ── fetchSkillMd tests ──

test("fetchSkillMd returns SKILL.md content on success", async () => {
  const mdContent = "# My Skill\nDoes things.";
  globalThis.fetch = async (url) => {
    const u = new URL(url.toString());
    assert.equal(u.hostname, "raw.githubusercontent.com");
    assert.ok(u.pathname.includes("/owner/repo/main/skills/my-skill/SKILL.md"));
    return new Response(mdContent, { status: 200 });
  };

  const result = await fetchSkillMd("owner/repo", "my-skill");
  assert.equal(result, mdContent);
});

test("fetchSkillMd throws on 404", async () => {
  globalThis.fetch = async () => new Response("Not Found", { status: 404 });

  await assert.rejects(
    () => fetchSkillMd("owner/repo", "missing-skill"),
    (err) => (err as any).message.includes("Failed to fetch SKILL.md: 404")
  );
});

// ── GET /api/skills/skillssh route tests ──

test("skillssh search route returns skills from the API", async () => {
  const mockPayload = {
    query: "docker",
    searchType: "text",
    skills: [
      {
        id: "o/r/docker-skill",
        skillId: "docker-skill",
        name: "Docker Skill",
        installs: 5,
        source: "o/r",
      },
      {
        id: "o/r/compose-skill",
        skillId: "compose-skill",
        name: "Compose Skill",
        installs: 3,
        source: "o/r",
      },
    ],
    count: 2,
    duration_ms: 8,
  };

  globalThis.fetch = async () => new Response(JSON.stringify(mockPayload), { status: 200 });

  const req = new Request("http://localhost/api/skills/skillssh?q=docker&limit=10");
  const res = await searchRoute.GET(req);
  const body = (await res.json()) as any;

  assert.equal(res.status, 200);
  assert.equal(body.skills.length, 2);
  assert.equal(body.skills[0].name, "Docker Skill");
  assert.equal(body.skills[1].skillId, "compose-skill");
});

test("skillssh search route returns 500 when upstream fails", async () => {
  globalThis.fetch = async () => new Response("Bad Gateway", { status: 502 });

  const req = new Request("http://localhost/api/skills/skillssh?q=broken");
  const res = await searchRoute.GET(req);
  const body = (await res.json()) as any;

  assert.equal(res.status, 500);
  assert.ok(body.error.includes("skills.sh API error"));
});

// ── POST /api/skills/skillssh/install route tests ──

test("skillssh install route registers a skill from skills.sh", async () => {
  const mdContent = "# Docker Best Practices\nContent here.";

  globalThis.fetch = async (url) => {
    if (new URL(url.toString()).hostname === "raw.githubusercontent.com") {
      return new Response(mdContent, { status: 200 });
    }
    return new Response("Not Found", { status: 404 });
  };

  const req = new Request("http://localhost/api/skills/skillssh/install", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "docker-best-practices",
      description: "Docker best practices skill",
      source: "owner/repo",
      skillId: "docker-best-practices",
      version: "1.0.0",
    }),
  });

  const res = await installRoute.POST(req);
  const body = (await res.json()) as any;

  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.ok(body.id);

  // Verify the skill was registered with correct metadata
  const skills = skillRegistry.list();
  const installed = skills.find((s) => s.name === "docker-best-practices");
  assert.ok(installed);
  assert.equal(installed.apiKeyId, "skillssh");
  assert.ok(installed.handler.includes("Installed from skills.sh"));
  assert.ok(installed.handler.includes(mdContent));
});

test("skillssh install route returns 400 for invalid payload", async () => {
  const req = new Request("http://localhost/api/skills/skillssh/install", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "",
      description: "Missing name",
      source: "owner/repo",
      skillId: "something",
    }),
  });

  const res = await installRoute.POST(req);
  assert.equal(res.status, 400);
});

test("skillssh install route returns 500 when SKILL.md fetch fails", async () => {
  globalThis.fetch = async () => new Response("Not Found", { status: 404 });

  const req = new Request("http://localhost/api/skills/skillssh/install", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "missing-skill",
      description: "Skill that does not exist",
      source: "owner/repo",
      skillId: "nonexistent",
    }),
  });

  const res = await installRoute.POST(req);
  const body = (await res.json()) as any;

  assert.equal(res.status, 500);
  assert.ok(body.error.includes("Failed to fetch SKILL.md"));
});

test("skillssh install route defaults version to 1.0.0 when omitted", async () => {
  globalThis.fetch = async (url) => {
    if (new URL(url.toString()).hostname === "raw.githubusercontent.com") {
      return new Response("# Skill Content", { status: 200 });
    }
    return new Response("Not Found", { status: 404 });
  };

  const req = new Request("http://localhost/api/skills/skillssh/install", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "version-default-test",
      description: "Test version default",
      source: "owner/repo",
      skillId: "vd-test",
    }),
  });

  const res = await installRoute.POST(req);
  const body = (await res.json()) as any;

  assert.equal(res.status, 200);
  assert.equal(body.success, true);

  const skills = skillRegistry.list();
  const installed = skills.find((s) => s.name === "version-default-test");
  assert.ok(installed);
  assert.equal(installed.version, "1.0.0");
});
