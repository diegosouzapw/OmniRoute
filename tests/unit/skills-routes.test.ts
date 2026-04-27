import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-route-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const skillsRoute = await import("../../src/app/api/skills/route.ts");
const skillByIdRoute = await import("../../src/app/api/skills/[id]/route.ts");

function clearSkillRegistry() {
  skillRegistry.registeredSkills?.clear?.();
  skillRegistry.versionCache?.clear?.();
  if (typeof skillRegistry.invalidateCache === "function") {
    skillRegistry.invalidateCache();
  }
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });
  clearSkillRegistry();
  core.getDbInstance();
}

async function registerSkill(overrides = {}) {
  return skillRegistry.register({
    apiKeyId: "api-key-1",
    name: "lookupWeather",
    version: "1.0.0",
    description: "Weather lookup",
    schema: {
      input: {
        type: "object",
        properties: {
          location: { type: "string" },
        },
      },
      output: {
        type: "object",
      },
    },
    handler: "weather-handler",
    enabled: true,
    ...overrides,
  });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  clearSkillRegistry();
  process.env.DATA_DIR = originalDataDir;
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test("skills route GET loads skills from the database and lists them", async () => {
  const created = await registerSkill();

  clearSkillRegistry();

  const response = await skillsRoute.GET(
    new Request("http://localhost/api/skills?page=1&limit=50")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.equal(body.data.length, 1);
  assert.equal(body.data[0].id, created.id);
  assert.equal(body.data[0].name, "lookupWeather");
});

test("skills route GET returns 500 when the registry load fails", async () => {
  const originalLoadFromDatabase = skillRegistry.loadFromDatabase;
  skillRegistry.loadFromDatabase = async () => {
    throw new Error("skill db unavailable");
  };

  try {
    const response = await skillsRoute.GET(
      new Request("http://localhost/api/skills?page=1&limit=50")
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 500);
    assert.equal(body.error, "skill db unavailable");
  } finally {
    skillRegistry.loadFromDatabase = originalLoadFromDatabase;
  }
});

test("skills by-id DELETE removes existing skills, returns 404 for missing ones, and handles failures", async () => {
  const created = await registerSkill();

  const deleted = await skillByIdRoute.DELETE(new Request("http://localhost/api/skills/id"), {
    params: Promise.resolve({ id: created.id }),
  });
  const deletedBody = (await deleted.json()) as any;

  const missing = await skillByIdRoute.DELETE(new Request("http://localhost/api/skills/id"), {
    params: Promise.resolve({ id: created.id }),
  });
  const missingBody = (await missing.json()) as any;

  const originalUnregisterById = skillRegistry.unregisterById;
  skillRegistry.unregisterById = async () => {
    throw new Error("delete failed");
  };

  try {
    const failed = await skillByIdRoute.DELETE(new Request("http://localhost/api/skills/id"), {
      params: Promise.resolve({ id: "broken-skill" }),
    });
    const failedBody = (await failed.json()) as any;

    assert.equal(deleted.status, 200);
    assert.deepEqual(deletedBody, { success: true });
    assert.equal(missing.status, 404);
    assert.equal(missingBody.error, "Skill not found");
    assert.equal(failed.status, 500);
    assert.equal(failedBody.error, "delete failed");
  } finally {
    skillRegistry.unregisterById = originalUnregisterById;
  }
});

test("skills by-id PUT updates enabled state, validates input, and surfaces parse failures", async () => {
  const created = await registerSkill({ enabled: false });

  const updated = await skillByIdRoute.PUT(
    new Request("http://localhost/api/skills/id", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    }),
    { params: Promise.resolve({ id: created.id }) }
  );

  clearSkillRegistry();
  await skillRegistry.loadFromDatabase();

  const invalid = await skillByIdRoute.PUT(
    new Request("http://localhost/api/skills/id", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ enabled: "yes" }),
    }),
    { params: Promise.resolve({ id: created.id }) }
  );

  const malformed = await skillByIdRoute.PUT(
    new Request("http://localhost/api/skills/id", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: "{",
    }),
    { params: Promise.resolve({ id: created.id }) }
  );

  const updatedBody = (await updated.json()) as any;
  const invalidBody = (await invalid.json()) as any;
  const malformedBody = (await malformed.json()) as any;
  const loadedSkillRow = core
    .getDbInstance()
    .prepare("SELECT enabled FROM skills WHERE id = ?")
    .get(created.id);
  const isEnabled = loadedSkillRow ? (loadedSkillRow as any).enabled === 1 : false;

  assert.equal(updated.status, 200);
  assert.deepEqual(updatedBody, { success: true, enabled: true });
  assert.equal(isEnabled, true);

  assert.equal(invalid.status, 400);
  assert.match(invalidBody.message, /invalid/i);

  assert.equal(malformed.status, 500);
  assert.match(malformedBody.error, /json|property name/i);
});
