import test from "node:test";
import assert from "node:assert/strict";

const { AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema } =
  await import("../../src/lib/agentSkills/schemas.ts");

test("agent skills schemas module exposes runtime validators", async () => {
  const schemas = await import("../../src/lib/agentSkills/schemas.ts");

  for (const key of [
    "AgentSkillSchema",
    "GenerateBodySchema",
    "ListQuerySchema",
    "SkillCategorySchema",
    "SkillCoverageSchema",
  ]) {
    assert.equal(typeof schemas[key].safeParse, "function", `${key} should stay exported`);
  }
});

// ─── AgentSkillSchema ─────────────────────────────────────────────────────────

test("AgentSkillSchema — valid api skill parses successfully", () => {
  const input = {
    id: "omni-providers",
    name: "Providers",
    description: "Manage LLM providers",
    category: "api" as const,
    area: "providers",
    endpoints: ["GET /api/providers", "POST /api/providers"],
    rawUrl: "https://raw.githubusercontent.com/owner/repo/main/skills/omni-providers/SKILL.md",
    githubUrl: "https://github.com/owner/repo/blob/main/skills/omni-providers/SKILL.md",
  };
  const result = AgentSkillSchema.safeParse(input);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.id, "omni-providers");
    assert.equal(result.data.category, "api");
  }
});

test("AgentSkillSchema — valid cli skill parses successfully", () => {
  const input = {
    id: "cli-serve",
    name: "Serve",
    description: "Start the OmniRoute server",
    category: "cli" as const,
    area: "cli-serve",
    cliCommands: ["serve", "serve --port 8080"],
    rawUrl: "https://raw.githubusercontent.com/owner/repo/main/skills/cli-serve/SKILL.md",
    githubUrl: "https://github.com/owner/repo/blob/main/skills/cli-serve/SKILL.md",
  };
  const result = AgentSkillSchema.safeParse(input);
  assert.equal(result.success, true);
});

test("AgentSkillSchema — invalid id (uppercase) fails", () => {
  const input = {
    id: "Omni-Providers",
    name: "Providers",
    description: "Manage LLM providers",
    category: "api",
    area: "providers",
    rawUrl: "https://raw.githubusercontent.com/owner/repo/main/skills/omni-providers/SKILL.md",
    githubUrl: "https://github.com/owner/repo/blob/main/skills/omni-providers/SKILL.md",
  };
  const result = AgentSkillSchema.safeParse(input);
  assert.equal(result.success, false);
});

test("AgentSkillSchema — invalid category fails", () => {
  const input = {
    id: "omni-providers",
    name: "Providers",
    description: "Manage LLM providers",
    category: "unknown",
    area: "providers",
    rawUrl: "https://raw.githubusercontent.com/owner/repo/main/skills/omni-providers/SKILL.md",
    githubUrl: "https://github.com/owner/repo/blob/main/skills/omni-providers/SKILL.md",
  };
  const result = AgentSkillSchema.safeParse(input);
  assert.equal(result.success, false);
});

test("AgentSkillSchema — non-url rawUrl fails", () => {
  const input = {
    id: "omni-providers",
    name: "Providers",
    description: "Manage LLM providers",
    category: "api",
    area: "providers",
    rawUrl: "not-a-url",
    githubUrl: "https://github.com/owner/repo/blob/main/skills/omni-providers/SKILL.md",
  };
  const result = AgentSkillSchema.safeParse(input);
  assert.equal(result.success, false);
});

test("AgentSkillSchema — optional fields absent parses successfully", () => {
  const input = {
    id: "omni-providers",
    name: "Providers",
    description: "Manage LLM providers",
    category: "api",
    area: "providers",
    rawUrl: "https://raw.githubusercontent.com/owner/repo/main/skills/omni-providers/SKILL.md",
    githubUrl: "https://github.com/owner/repo/blob/main/skills/omni-providers/SKILL.md",
  };
  const result = AgentSkillSchema.safeParse(input);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.endpoints, undefined);
    assert.equal(result.data.cliCommands, undefined);
    assert.equal(result.data.icon, undefined);
    assert.equal(result.data.isEntry, undefined);
    assert.equal(result.data.isNew, undefined);
  }
});

test("AgentSkillSchema — .parse throws on invalid input", () => {
  assert.throws(() => {
    AgentSkillSchema.parse({
      id: "bad id",
      name: "",
      description: "",
      category: "api",
      area: "x",
      rawUrl: "x",
      githubUrl: "x",
    });
  });
});

// ─── SkillCoverageSchema ──────────────────────────────────────────────────────

test("SkillCoverageSchema — valid coverage parses successfully", () => {
  const input = {
    api: { have: 22, total: 22 },
    cli: { have: 20, total: 20 },
    totalSkills: 42,
    generatedAt: new Date().toISOString(),
  };
  const result = SkillCoverageSchema.safeParse(input);
  assert.equal(result.success, true);
});

test("SkillCoverageSchema — wrong total literal (api.total=21) fails", () => {
  const input = {
    api: { have: 21, total: 21 },
    cli: { have: 20, total: 20 },
    totalSkills: 41,
    generatedAt: new Date().toISOString(),
  };
  const result = SkillCoverageSchema.safeParse(input);
  assert.equal(result.success, false);
});

test("SkillCoverageSchema — wrong total literal (cli.total=19) fails", () => {
  const input = {
    api: { have: 22, total: 22 },
    cli: { have: 19, total: 19 },
    totalSkills: 41,
    generatedAt: new Date().toISOString(),
  };
  const result = SkillCoverageSchema.safeParse(input);
  assert.equal(result.success, false);
});

test("SkillCoverageSchema — invalid datetime fails", () => {
  const input = {
    api: { have: 22, total: 22 },
    cli: { have: 20, total: 20 },
    totalSkills: 42,
    generatedAt: "not-a-date",
  };
  const result = SkillCoverageSchema.safeParse(input);
  assert.equal(result.success, false);
});

test("SkillCoverageSchema — negative have value fails", () => {
  const input = {
    api: { have: -1, total: 22 },
    cli: { have: 20, total: 20 },
    totalSkills: 42,
    generatedAt: new Date().toISOString(),
  };
  const result = SkillCoverageSchema.safeParse(input);
  assert.equal(result.success, false);
});

// ─── ListQuerySchema ──────────────────────────────────────────────────────────

test("ListQuerySchema — empty object parses successfully", () => {
  const result = ListQuerySchema.safeParse({});
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.category, undefined);
    assert.equal(result.data.area, undefined);
  }
});

test("ListQuerySchema — valid category parses successfully", () => {
  const result = ListQuerySchema.safeParse({ category: "api" });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.category, "api");
  }
});

test("ListQuerySchema — invalid category fails", () => {
  const result = ListQuerySchema.safeParse({ category: "invalid" });
  assert.equal(result.success, false);
});

test("ListQuerySchema — area filter parses successfully", () => {
  const result = ListQuerySchema.safeParse({ category: "cli", area: "cli-serve" });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.area, "cli-serve");
  }
});

// ─── GenerateBodySchema ───────────────────────────────────────────────────────

test("GenerateBodySchema — empty object applies defaults", () => {
  const result = GenerateBodySchema.safeParse({});
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.dryRun, true);
    assert.equal(result.data.prune, false);
    assert.equal(result.data.onlyIds, undefined);
  }
});

test("GenerateBodySchema — explicit dryRun=false parses", () => {
  const result = GenerateBodySchema.safeParse({ dryRun: false, prune: true });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.dryRun, false);
    assert.equal(result.data.prune, true);
  }
});

test("GenerateBodySchema — onlyIds array parses", () => {
  const result = GenerateBodySchema.safeParse({ onlyIds: ["omni-providers", "cli-serve"] });
  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.onlyIds, ["omni-providers", "cli-serve"]);
  }
});

test("GenerateBodySchema — non-boolean dryRun fails", () => {
  const result = GenerateBodySchema.safeParse({ dryRun: "yes" });
  assert.equal(result.success, false);
});
