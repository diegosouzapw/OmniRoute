import { Memory, MemoryType } from "./types";
import { getDbInstance } from "../db/core";
import { deleteMemory, createMemory } from "./store";

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
    .all(...params) as MemoryRow[];

  if (memories.length === 0) {
    return { originalCount: 0, summarizedCount: 0, tokensSaved: 0 };
  }

  let totalTokens = 0;
  const toSummarize: Memory[] = [];
  const toKeep: Memory[] = [];

  for (const mem of memories) {
    const tokens = estimateTokens(mem.content);
    if (totalTokens + tokens <= maxTokens) {
      toKeep.push(rowToMemory(mem));
      totalTokens += tokens;
    } else {
      toSummarize.push(rowToMemory(mem));
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

// ──────────────── Types ────────────────

interface MemoryRow {
  id: string;
  api_key_id: string;
  session_id: string | null;
  type: string;
  key: string | null;
  content: string;
  metadata: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
}

function rowToMemory(row: MemoryRow): Memory {
  return {
    id: String(row.id),
    apiKeyId: String(row.api_key_id),
    sessionId: typeof row.session_id === "string" ? row.session_id : "",
    type: row.type as MemoryType,
    key: typeof row.key === "string" ? row.key : "",
    content: String(row.content),
    metadata: row.metadata
      ? (() => {
          try {
            const p = JSON.parse(row.metadata);
            return typeof p === "object" && p !== null ? p : {};
          } catch {
            return {};
          }
        })()
      : {},
    createdAt: new Date(String(row.created_at)),
    updatedAt: new Date(String(row.updated_at)),
    expiresAt: row.expires_at ? new Date(String(row.expires_at)) : null,
  };
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function generateSummary(content: string): string {
  const sentences = content
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
  if (sentences.length <= 3) {
    return content;
  }
  return sentences.slice(0, 3).join(". ") + ".";
}

// ──────────────── Plan 21 D19: summarizeMemoriesOlderThan ────────────────

export interface SummarizeOlderThanResult {
  candidates: Memory[];
  totalTokens: number;
  deletedCount: number;
  summaryId: string | null;
  dryRun: boolean;
}

/**
 * Summarize (or dry-run preview) memories older than `days` days for a given apiKeyId.
 *
 * - dryRun=true: returns candidates + totalTokens without touching the DB.
 * - dryRun=false: creates ONE summary memory (type="semantic"), deletes all candidates,
 *   returns { candidates, totalTokens, deletedCount, summaryId, dryRun:false }.
 *
 * Used by POST /api/memory/summarize (F6).
 */
export async function summarizeMemoriesOlderThan(
  apiKeyId: string | undefined,
  days: number,
  dryRun: boolean
): Promise<SummarizeOlderThanResult> {
  const db = getDbInstance();

  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const rows: MemoryRow[] = apiKeyId
    ? (db
        .prepare(
          "SELECT * FROM memories WHERE api_key_id = ? AND created_at < ? ORDER BY created_at ASC"
        )
        .all(apiKeyId, cutoff) as MemoryRow[])
    : (db
        .prepare("SELECT * FROM memories WHERE created_at < ? ORDER BY created_at ASC")
        .all(cutoff) as MemoryRow[]);

  const candidates = rows.map(rowToMemory);
  const totalTokens = candidates.reduce((sum, m) => sum + estimateTokens(m.content), 0);

  if (dryRun || candidates.length === 0) {
    return { candidates, totalTokens, deletedCount: 0, summaryId: null, dryRun: true };
  }

  // Build a condensed summary text from all candidates
  const summaryLines = candidates.map(
    (m) => `[${m.type}] ${m.key ? m.key + ": " : ""}${generateSummary(m.content)}`
  );
  const summaryContent = `Resumo de ${candidates.length} memórias (>${days} dias):\n${summaryLines.join("\n")}`;

  // Create ONE new summary memory
  const summaryMemory = await createMemory({
    apiKeyId: apiKeyId ?? "",
    sessionId: "",
    type: MemoryType.SEMANTIC,
    key: `summary_${new Date().toISOString()}`,
    content: summaryContent,
    metadata: {
      summarizedCount: candidates.length,
      olderThanDays: days,
      generatedAt: new Date().toISOString(),
    },
    expiresAt: null,
  });

  // Delete all original candidates (use deleteMemory to ensure vec + Qdrant sync)
  let deletedCount = 0;
  for (const candidate of candidates) {
    const ok = await deleteMemory(candidate.id);
    if (ok) deletedCount++;
  }

  return {
    candidates,
    totalTokens,
    deletedCount,
    summaryId: summaryMemory.id,
    dryRun: false,
  };
}
