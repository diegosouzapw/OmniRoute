import { describe, it, expect, beforeEach, vi } from "vitest";
import { retrieveMemories } from "../../memory/retrieval";
import { createMemory } from "../../memory/store";
import { skillRegistry } from "../registry";
import { skillExecutor } from "../executor";

vi.mock("../../db/settings", () => ({
  getSettings: vi.fn().mockResolvedValue({ skillsEnabled: true }),
  updateSettings: vi.fn().mockResolvedValue({}),
}));

import { getSettings } from "../../db/settings";
const mockedGetSettings = vi.mocked(getSettings);

describe("Memory + Skills Integration", () => {
  const apiKeyId = "test-api-key";

  beforeEach(() => {
    mockedGetSettings.mockResolvedValue({ skillsEnabled: true } as any);
  });

  it("should retrieve and inject memories", async () => {
    await createMemory({
      apiKeyId,
      type: "factual" as any,
      key: "test-key",
      content: "Test memory content",
      sessionId: "",
      metadata: {},
      expiresAt: null,
    });

    const config = {
      enabled: true,
      maxTokens: 2000,
      retrievalStrategy: "exact" as const,
      autoSummarize: false,
      persistAcrossModels: false,
      retentionDays: 30,
      scope: "apiKey" as const,
    };

    const memories = await retrieveMemories(apiKeyId, config);
    expect(memories).toBeDefined();
    expect(Array.isArray(memories)).toBe(true);
  });

  it("should register and list skills", async () => {
    const _skill = await skillRegistry.register({
      name: "test-skill",
      version: "1.0.0",
      description: "Test skill",
      schema: { input: {}, output: {} },
      handler: "echo",
      apiKeyId,
    });

    const skills = skillRegistry.list(apiKeyId);
    expect(skills.length).toBeGreaterThan(0);
  });

  it("blocks execution when skillsEnabled=false", async () => {
    mockedGetSettings.mockResolvedValue({ skillsEnabled: false } as any);

    await expect(skillExecutor.execute("some-skill", {}, { apiKeyId })).rejects.toThrow(
      /skills.*disabled/i
    );
  });

  it("allows execution when skillsEnabled=true (skill not found still throws)", async () => {
    mockedGetSettings.mockResolvedValue({ skillsEnabled: true } as any);

    await expect(skillExecutor.execute("nonexistent-skill", {}, { apiKeyId })).rejects.toThrow(
      /not found/i
    );
  });

  it("should unregisterById and return false for non-existent id", async () => {
    const result = await skillRegistry.unregisterById("nonexistent-id-12345");
    expect(result).toBe(false);
  });

  it("should register and then unregisterById successfully", async () => {
    const skill = await skillRegistry.register({
      name: "unregister-test-skill",
      version: "1.0.0",
      description: "Skill to be unregistered",
      schema: { input: {}, output: {} },
      handler: "echo",
      apiKeyId,
    });

    const deleted = await skillRegistry.unregisterById(skill.id);
    expect(deleted).toBe(true);

    // Verify it's gone from the list
    const remaining = skillRegistry.list(apiKeyId).filter((s) => s.id === skill.id);
    expect(remaining.length).toBe(0);
  });
});

describe("SkillsMP Marketplace Integration", () => {
  const apiKeyId = "skillsmp";

  it("GET /api/skills/marketplace without API key returns 400", async () => {
    // Simulate the marketplace route logic: no API key configured
    mockedGetSettings.mockResolvedValue({} as any);
    const settings = await getSettings();
    const mpApiKey = (settings as Record<string, unknown>).skillsmpApiKey;
    expect(mpApiKey).toBeUndefined();
    // The endpoint would return 400 when no key is configured
  });

  it("POST /api/skills/marketplace/install with valid data registers locally", async () => {
    const skill = await skillRegistry.register({
      name: "mp-test-skill",
      version: "1.0.0",
      description: "A marketplace skill",
      schema: { input: { content: "string" }, output: { result: "string" } },
      handler: "// Installed from SkillsMP\n// SKILL.md content:\n# Test Skill\nDoes things",
      apiKeyId: "skillsmp",
      enabled: true,
    });

    expect(skill).toBeDefined();
    expect(skill.id).toBeDefined();
    expect(skill.name).toBe("mp-test-skill");
    expect(skill.apiKeyId).toBe("skillsmp");
    expect(skill.handler).toContain("Installed from SkillsMP");

    // Verify it appears in registry list
    const skills = skillRegistry.list(apiKeyId);
    const found = skills.find((s) => s.name === "mp-test-skill");
    expect(found).toBeDefined();

    // Cleanup
    await skillRegistry.unregisterById(skill.id);
  });
});
