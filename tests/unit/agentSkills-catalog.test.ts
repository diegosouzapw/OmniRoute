import test from "node:test";
import assert from "node:assert/strict";

// Dynamic imports to pick up ESM modules with tsx
const {
  getCatalog,
  getSkillById,
  filterCatalog,
  computeCoverage,
  refreshCatalog,
  API_SKILL_IDS,
  CLI_SKILL_IDS,
} = await import("../../src/lib/agentSkills/catalog.ts");
const agentSkillsConstants = await import("../../src/shared/constants/agentSkills.ts");

// ─── Counts ───────────────────────────────────────────────────────────────────

test("getCatalog() returns exactly 43 entries", () => {
  refreshCatalog();
  const catalog = getCatalog();
  assert.equal(catalog.length, 43, `Expected 43 but got ${catalog.length}`);
});

test("API_SKILL_IDS has exactly 22 entries", () => {
  assert.equal(API_SKILL_IDS.length, 22);
});

test("CLI_SKILL_IDS has exactly 20 entries", () => {
  assert.equal(CLI_SKILL_IDS.length, 20);
});

test("getCatalog() contains exactly 22 api skills", () => {
  const apiSkills = getCatalog().filter((s) => s.category === "api");
  assert.equal(apiSkills.length, 22);
});

test("getCatalog() contains exactly 20 cli skills", () => {
  const cliSkills = getCatalog().filter((s) => s.category === "cli");
  assert.equal(cliSkills.length, 20);
});

// ─── ID format ────────────────────────────────────────────────────────────────

test("all skill IDs match regex ^[a-z][a-z0-9-]*$", () => {
  const ID_REGEX = /^[a-z][a-z0-9-]*$/;
  for (const skill of getCatalog()) {
    assert.match(skill.id, ID_REGEX, `Skill ID "${skill.id}" does not match expected format`);
  }
});

test("all skill IDs are unique (no duplicates)", () => {
  const ids = getCatalog().map((s) => s.id);
  const uniqueIds = new Set(ids);
  assert.equal(
    uniqueIds.size,
    ids.length,
    `Duplicate IDs found: ${ids.filter((id, i) => ids.indexOf(id) !== i).join(", ")}`
  );
});

// ─── Required fields ──────────────────────────────────────────────────────────

test("all skills have non-empty name and description", () => {
  for (const skill of getCatalog()) {
    assert.ok(skill.name.length > 0, `Skill ${skill.id} has empty name`);
    assert.ok(skill.description.length > 0, `Skill ${skill.id} has empty description`);
  }
});

test("all skills have rawUrl and githubUrl as valid GitHub URLs", () => {
  for (const skill of getCatalog()) {
    assert.ok(
      skill.rawUrl.startsWith("https://raw.githubusercontent.com/"),
      `Skill ${skill.id}: rawUrl "${skill.rawUrl}" is not a GitHub raw URL`
    );
    assert.ok(
      skill.githubUrl.startsWith("https://github.com/"),
      `Skill ${skill.id}: githubUrl "${skill.githubUrl}" is not a GitHub blob URL`
    );
    assert.ok(
      skill.rawUrl.endsWith("/SKILL.md"),
      `Skill ${skill.id}: rawUrl does not end with /SKILL.md`
    );
  }
});

test("agent skills constants expose URL builders without the unused repository URL", () => {
  assert.equal(typeof agentSkillsConstants.getAgentSkillRawUrl, "function");
  assert.equal(typeof agentSkillsConstants.getAgentSkillBlobUrl, "function");
  assert.equal("AGENT_SKILLS_REPO_URL" in agentSkillsConstants, false);
});

test("api skills have area matching API_SKILL_IDS derived IDs", () => {
  const catalog = getCatalog();
  for (const id of API_SKILL_IDS) {
    const skill = catalog.find((s) => s.id === id);
    assert.ok(skill, `API skill ID "${id}" not found in catalog`);
    assert.equal(
      skill!.category,
      "api",
      `Skill "${id}" expected category api, got ${skill!.category}`
    );
  }
});

test("cli skills have area matching CLI_SKILL_IDS derived IDs", () => {
  const catalog = getCatalog();
  for (const id of CLI_SKILL_IDS) {
    const skill = catalog.find((s) => s.id === id);
    assert.ok(skill, `CLI skill ID "${id}" not found in catalog`);
    assert.equal(
      skill!.category,
      "cli",
      `Skill "${id}" expected category cli, got ${skill!.category}`
    );
  }
});

// ─── getSkillById ─────────────────────────────────────────────────────────────

test("getSkillById('omni-providers') returns the omni-providers entry", () => {
  const skill = getSkillById("omni-providers");
  assert.ok(skill, "Expected skill to be found");
  assert.equal(skill!.id, "omni-providers");
  assert.equal(skill!.category, "api");
  assert.equal(skill!.area, "providers");
});

test("getSkillById('cli-serve') returns the cli-serve entry", () => {
  const skill = getSkillById("cli-serve");
  assert.ok(skill);
  assert.equal(skill!.id, "cli-serve");
  assert.equal(skill!.category, "cli");
  assert.equal(skill!.isEntry, true);
});

test("getSkillById('omni-auth') returns entry with isEntry=true", () => {
  const skill = getSkillById("omni-auth");
  assert.ok(skill);
  assert.equal(skill!.isEntry, true);
});

test("getSkillById('does-not-exist') returns null", () => {
  const skill = getSkillById("does-not-exist");
  assert.equal(skill, null);
});

test("getSkillById('') returns null", () => {
  const skill = getSkillById("");
  assert.equal(skill, null);
});

// ─── filterCatalog ────────────────────────────────────────────────────────────

test("filterCatalog({ category: 'api' }) returns 22 api skills", () => {
  const skills = filterCatalog({ category: "api" });
  assert.equal(skills.length, 22);
  for (const s of skills) {
    assert.equal(s.category, "api");
  }
});

test("filterCatalog({ category: 'cli' }) returns 20 cli skills", () => {
  const skills = filterCatalog({ category: "cli" });
  assert.equal(skills.length, 20);
  for (const s of skills) {
    assert.equal(s.category, "cli");
  }
});

test("filterCatalog({ area: 'providers' }) returns exactly omni-providers", () => {
  const skills = filterCatalog({ area: "providers" });
  assert.equal(skills.length, 1);
  assert.equal(skills[0].id, "omni-providers");
});

test("filterCatalog({ category: 'api', area: 'mcp' }) returns omni-mcp", () => {
  const skills = filterCatalog({ category: "api", area: "mcp" });
  assert.equal(skills.length, 1);
  assert.equal(skills[0].id, "omni-mcp");
});

test("filterCatalog({ area: 'nonexistent' }) returns empty array", () => {
  const skills = filterCatalog({ area: "nonexistent" });
  assert.equal(skills.length, 0);
});

test("filterCatalog({}) returns full catalog (43 entries)", () => {
  const skills = filterCatalog({});
  assert.equal(skills.length, 43);
});

// ─── refreshCatalog ───────────────────────────────────────────────────────────

test("refreshCatalog() causes getCatalog() to re-derive (returns fresh array)", () => {
  const first = getCatalog();
  refreshCatalog();
  const second = getCatalog();
  // Different array reference after refresh
  assert.notEqual(first, second);
  // But same content
  assert.equal(first.length, second.length);
  assert.equal(first[0].id, second[0].id);
});

// ─── computeCoverage ─────────────────────────────────────────────────────────

test("computeCoverage() returns valid SkillCoverage shape", () => {
  const cov = computeCoverage();

  assert.ok(typeof cov.api === "object");
  assert.equal(cov.api.total, 22);
  assert.ok(typeof cov.api.have === "number");
  assert.ok(cov.api.have >= 0 && cov.api.have <= 22);

  assert.ok(typeof cov.cli === "object");
  assert.equal(cov.cli.total, 20);
  assert.ok(typeof cov.cli.have === "number");
  assert.ok(cov.cli.have >= 0 && cov.cli.have <= 20);

  assert.equal(cov.totalSkills, cov.api.have + cov.cli.have + (cov.config?.have ?? 0));

  // generatedAt must be a valid ISO datetime string
  assert.ok(
    !isNaN(Date.parse(cov.generatedAt)),
    `generatedAt "${cov.generatedAt}" is not a valid ISO date`
  );
});

test("computeCoverage() api.have + cli.have = totalSkills", () => {
  const cov = computeCoverage();
  assert.equal(cov.totalSkills, cov.api.have + cov.cli.have + (cov.config?.have ?? 0));
});

// ─── Cache behaviour ─────────────────────────────────────────────────────────

test("getCatalog() returns the same array reference on repeated calls (cached)", () => {
  refreshCatalog();
  const first = getCatalog();
  const second = getCatalog();
  assert.strictEqual(first, second, "Expected same cached array reference");
});

// ─── Canonical IDs check ─────────────────────────────────────────────────────

test("API_SKILL_IDS first entry is omni-auth", () => {
  assert.equal(API_SKILL_IDS[0], "omni-auth");
});

test("API_SKILL_IDS last entry is omni-inference", () => {
  assert.equal(API_SKILL_IDS[API_SKILL_IDS.length - 1], "omni-inference");
});

test("CLI_SKILL_IDS first entry is cli-serve", () => {
  assert.equal(CLI_SKILL_IDS[0], "cli-serve");
});

test("CLI_SKILL_IDS last entry is cli-setup", () => {
  assert.equal(CLI_SKILL_IDS[CLI_SKILL_IDS.length - 1], "cli-setup");
});
