import { describe, it, expect, beforeEach } from "vitest";
import { retrieveMemories } from "../../memory/retrieval";
import { createMemory, deleteMemory } from "../../memory/store";
import { injectSkills } from "../injection";
import { skillRegistry } from "../registry";
import { skillExecutor } from "../executor";

describe("Memory + Skills Integration", () => {
  const apiKeyId = "test-api-key";

  it("should retrieve and inject memories", async () => {
    await createMemory({
      apiKeyId,
      type: "factual" as any,
      key: "test-key",
      content: "Test memory content",
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
    const skill = await skillRegistry.register({
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
});
