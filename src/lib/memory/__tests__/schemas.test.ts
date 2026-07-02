import { MemoryConfigSchema, MemoryCreateInputSchema, MemoryUpdateInputSchema } from "../schemas";
import { z } from "zod";

describe("Memory Schemas", () => {
  const validConfig = {
    enabled: true,
    maxTokens: 2048,
    retrievalStrategy: "semantic",
    autoSummarize: true,
    persistAcrossModels: true,
    retentionDays: 30,
    scope: "apiKey",
  };

  const validCreateInput = {
    type: "factual",
    key: "user_preference",
    content: "Dark mode enabled",
    metadata: { source: "settings" },
  };

  const validUpdateInput = {
    content: "Updated content",
    metadata: { updatedAt: new Date() },
  };

  test("MemoryConfigSchema validation", () => {
    expect(MemoryConfigSchema.parse(validConfig)).toBeDefined();
    const invalidConfig = { ...validConfig, maxTokens: -1 };
    expect(() => MemoryConfigSchema.parse(invalidConfig)).toThrow();
  });

  test("MemoryCreateInputSchema validation", () => {
    expect(MemoryCreateInputSchema.parse(validCreateInput)).toBeDefined();
    const invalidCreate = { ...validCreateInput, key: "" };
    expect(() => MemoryCreateInputSchema.parse(invalidCreate)).toThrow();
  });

  test("MemoryUpdateInputSchema validation", () => {
    expect(MemoryUpdateInputSchema.parse(validUpdateInput)).toBeDefined();
    const invalidUpdate = { key: "test" };
    expect(() => MemoryUpdateInputSchema.parse(invalidUpdate)).toThrow();
  });
});
