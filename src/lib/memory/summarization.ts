import { Memory, MemoryType } from "./types";
import { getDbInstance } from "../db/core";

export interface SummarizationResult {
  originalCount: number;
  summarizedCount: number;
  tokensSaved: number;
}

export async function summarizeMemories(
  apiKeyId: string,
  sessionId?: string,
  maxTokens: number = 4000
): Promise<SummarizationResult> {
  const db = getDbInstance();

  const whereClause = sessionId
    ? "WHERE api_key_id = ? AND session_id = ?"
    : "WHERE api_key_id = ?";
  const params = sessionId ? [apiKeyId, sessionId] : [apiKeyId];

  const memories = db
    .prepare(`SELECT * FROM memories ${whereClause} ORDER BY created_at DESC`)
    .all(...params) as any[];

  if (memories.length === 0) {
    return { originalCount: 0, summarizedCount: 0, tokensSaved: 0 };
  }

  let totalTokens = 0;
  const toSummarize: Memory[] = [];
  const toKeep: Memory[] = [];

  for (const mem of memories) {
    const tokens = estimateTokens(mem.content);
    if (totalTokens + tokens <= maxTokens) {
      toKeep.push({
        id: mem.id,
        apiKeyId: mem.api_key_id,
        sessionId: mem.session_id,
        type: mem.type as MemoryType,
        key: mem.key,
        content: mem.content,
        metadata: mem.metadata ? JSON.parse(mem.metadata) : {},
        createdAt: new Date(mem.created_at),
        updatedAt: new Date(mem.updated_at),
        expiresAt: mem.expires_at ? new Date(mem.expires_at) : null,
      });
      totalTokens += tokens;
    } else {
      toSummarize.push({
        id: mem.id,
        apiKeyId: mem.api_key_id,
        sessionId: mem.session_id,
        type: mem.type as MemoryType,
        key: mem.key,
        content: mem.content,
        metadata: mem.metadata ? JSON.parse(mem.metadata) : {},
        createdAt: new Date(mem.created_at),
        updatedAt: new Date(mem.updated_at),
        expiresAt: mem.expires_at ? new Date(mem.expires_at) : null,
      });
    }
  }

  const summarizedCount = toSummarize.length;
  let tokensSaved = 0;

  for (const mem of toSummarize) {
    const summary = generateSummary(mem.content);
    const oldTokens = estimateTokens(mem.content);
    const newTokens = estimateTokens(summary);
    tokensSaved += oldTokens - newTokens;

    db.prepare("UPDATE memories SET content = ?, updated_at = ? WHERE id = ?").run(
      summary,
      new Date().toISOString(),
      mem.id
    );
  }

  return {
    originalCount: memories.length,
    summarizedCount,
    tokensSaved,
  };
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function generateSummary(content: string): string {
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length <= 3) {
    return content;
  }
  return sentences.slice(0, 3).join(". ") + ".";
}
