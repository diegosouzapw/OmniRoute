import { getDbInstance } from "../db/core";
import { Memory, MemoryConfig, MemoryType } from "./types";
import { MemoryConfigSchema } from "./schemas";

/**
 * Simple token estimation function (roughly 1 token per 4 characters)
 */
export function estimateTokens(text: string): number {
  if (!text || typeof text !== "string") return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Retrieve memories with token budget enforcement
 */
export async function retrieveMemories(
  apiKeyId: string,
  config: Partial<MemoryConfig> = {}
): Promise<Memory[]> {
  // Validate and normalize config
  const normalizedConfig = MemoryConfigSchema.parse({
    enabled: true,
    maxTokens: 2000,
    retrievalStrategy: "recent",
    autoSummarize: false,
    persistAcrossModels: false,
    retentionDays: 30,
    scope: "apiKey",
    ...config,
  });

  const maxTokens = Math.min(Math.max(normalizedConfig.maxTokens, 100), 8000);
  const strategy = normalizedConfig.retrievalStrategy;

  const db = getDbInstance();
  const memories: Memory[] = [];
  let totalTokens = 0;

  // Build base query
  let query = "SELECT * FROM memory WHERE apiKeyId = ?";
  const params: any[] = [apiKeyId];

  // Add ordering based on strategy
  switch (strategy) {
    case "semantic":
      // For now, semantic search is same as exact (FTS5 not implemented yet)
      query += " ORDER BY createdAt DESC";
      break;
    case "hybrid":
      // Hybrid is same as exact for now
      query += " ORDER BY createdAt DESC";
      break;
    case "exact":
    default:
      query += " ORDER BY createdAt DESC";
  }

  // Add limit for performance
  query += " LIMIT 100";

  // Execute query
  const stmt = db.prepare(query);
  const rows = stmt.all(...params);

  // Process memories until budget exceeded
  for (const row of rows) {
    const memory: Memory = {
      id: String((row as any).id),
      apiKeyId: String((row as any).apiKeyId),
      sessionId: String((row as any).sessionId),
      type: (row as any).type as MemoryType,
      key: String((row as any).key),
      content: String((row as any).content),
      metadata: JSON.parse(String((row as any).metadata)),
      createdAt: new Date(String((row as any).createdAt)),
      updatedAt: new Date(String((row as any).updatedAt)),
      expiresAt: (row as any).expiresAt ? new Date(String((row as any).expiresAt)) : null,
    };

    // Estimate tokens for this memory
    const memoryTokens = estimateTokens(memory.content);

    // Check if adding this memory would exceed budget
    if (totalTokens + memoryTokens > maxTokens) {
      // If we haven't added any memories yet, add this one anyway
      if (memories.length === 0) {
        memories.push(memory);
        totalTokens += memoryTokens;
      }
      break;
    }

    // Add memory to results
    memories.push(memory);
    totalTokens += memoryTokens;
  }

  return memories;
}
