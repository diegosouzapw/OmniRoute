import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-marketplace-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { GLOBAL_SKILL_OWNER_ID, skillRegistry } = await import("../../src/lib/skills/registry.ts");
const installRoute = await import("../../src/app/api/skills/marketplace/install/route.ts");

function clearSkillRegistry() {
  skillRegistry.registeredSkills?.clear?.();
  skillRegistry.versionCache?.clear?.();
  skillRegistry.loadedApiKeyIds?.clear?.();
  skillRegistry.invalidateCache();
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(tmpDir, { recursive: true });
  clearSkillRegistry();
  core.getDbInstance();
}

test.beforeEach(async () => {
  resetStorage();
  await settingsDb.updateSettings({
    skillsProvider: "skillsmp",
    requireLogin: false,
  });
});

test.after(() => {
  core.resetDbInstance();
  clearSkillRegistry();
  process.env.DATA_DIR = originalDataDir;
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("SkillsMP installs are available to API-key-scoped requests", async () => {
  const req = new Request("http://localhost/api/skills/marketplace/install", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "release-notes",
      description: "Draft release notes from repository changes",
      skillMdContent: "# Release Notes\nSummarize user-facing changes.",
      version: "1.0.0",
    }),
  });

  const res = await installRoute.POST(req);
  const body = (await res.json()) as { success: boolean; id: string };
  const installed = skillRegistry.getSkill(body.id);

  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.equal(installed?.apiKeyId, GLOBAL_SKILL_OWNER_ID);
  assert.equal(installed?.sourceProvider, "skillsmp");
  assert.equal(skillRegistry.list("customer-key")[0]?.id, body.id);
});
