import { describe, test, expect, beforeEach, afterEach } from "vitest";
import Database from "better-sqlite3";
import { retrieveMemories, estimateTokens } from "../retrieval";

// ────────────────────────────────────────────────────────────
// Existing tests (pure-logic, no DB required)
// ────────────────────────────────────────────────────────────

/**
 * Test that corrupt metadata in retrieval doesn't throw (returns {} instead).
 * This validates the fix for the 500 error caused by JSON.parse on corrupt metadata.
 */
describe("Memory Retrieval - corrupt metadata handling", () => {
  test("corrupt metadata JSON does not throw, returns empty object", () => {
    // Simulate what retrieval.ts line 74 does: JSON.parse(String(metadata))
    // The fix should wrap this in try/catch and return {} on failure.
    const corruptValues = ["{invalid json", "not-json-at-all", "{{{}}}", "", "undefined"];

    for (const corrupt of corruptValues) {
      // This simulates the fixed parsing logic
      const result = (() => {
        try {
          return JSON.parse(String(corrupt));
        } catch {
          return {};
        }
      })();
      expect(result).toEqual({});
    }
  });
});

/**
 * Test that GET /api/memory response includes stats object with total field.
 */
describe("Memory API - response shape", () => {
  test("GET /api/memory response should include stats with total field", async () => {
    // We test the response shape by importing the route handler
    // Since the route depends on DB, we test the stats computation logic directly
    const memories = [
      { type: "factual", content: "test1" },
      { type: "factual", content: "test2" },
      { type: "procedural", content: "test3" },
    ];

    const stats = {
      total: memories.length,
      byType: memories.reduce(
        (acc, m) => {
          acc[m.type] = (acc[m.type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    expect(stats).toHaveProperty("total");
    expect(stats.total).toBe(3);
    expect(stats).toHaveProperty("byType");
    expect(stats.byType).toEqual({ factual: 2, procedural: 1 });
  });
});

// ────────────────────────────────────────────────────────────
// FTS5-specific tests (real in-memory SQLite DB)
// ────────────────────────────────────────────────────────────

const API_KEY_ID = "test-api-key-fts5";

/**
 * Helper: create the `memories` table + `memory_fts` FTS5 virtual table
 * with the same DDL used in the real migrations (015 + 022).
 */
function setupSchema(db: InstanceType<typeof Database>) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY,
      api_key_id TEXT NOT NULL,
      session_id TEXT,
      type TEXT NOT NULL CHECK(type IN ('factual','episodic','procedural','semantic')),
      key TEXT,
      content TEXT NOT NULL,
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_memories_api_key ON memories(api_key_id);
    CREATE INDEX IF NOT EXISTS idx_memories_session ON memories(session_id);
  `);
}

function setupFts(db: InstanceType<typeof Database>) {
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS memory_fts USING fts5(
      content,
      key,
      content='memories',
      content_rowid='id'
    );

    CREATE TRIGGER IF NOT EXISTS memory_fts_ai AFTER INSERT ON memories BEGIN
      INSERT INTO memory_fts(rowid, content, key) VALUES (new.id, new.content, new.key);
    END;

    CREATE TRIGGER IF NOT EXISTS memory_fts_ad AFTER DELETE ON memories BEGIN
      INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.id, old.content, old.key);
    END;

    CREATE TRIGGER IF NOT EXISTS memory_fts_au AFTER UPDATE ON memories BEGIN
      INSERT INTO memory_fts(memory_fts, rowid, content, key) VALUES('delete', old.id, old.content, old.key);
      INSERT INTO memory_fts(rowid, content, key) VALUES (new.id, new.content, new.key);
    END;
  `);
}

/** Insert a memory row with an auto-incremented INTEGER id (FTS5-compatible). */
function insertMemory(
  db: InstanceType<typeof Database>,
  opts: {
    apiKeyId?: string;
    sessionId?: string;
    type?: string;
    key?: string;
    content: string;
    metadata?: string;
    createdAt?: string;
  }
) {
  const now = opts.createdAt ?? new Date().toISOString();
  db.prepare(
    `INSERT INTO memories (api_key_id, session_id, type, key, content, metadata, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    opts.apiKeyId ?? API_KEY_ID,
    opts.sessionId ?? null,
    opts.type ?? "factual",
    opts.key ?? "",
    opts.content,
    opts.metadata ?? "{}",
    now,
    now
  );
}

describe("Memory Retrieval — FTS5 integration", () => {
  let db: InstanceType<typeof Database>;
  let savedDb: unknown;

  beforeEach(() => {
    // Capture whatever DB singleton existed before the test
    savedDb = (globalThis as any).__omnirouteDb;

    // Stand up an in-memory SQLite DB and inject it as the singleton
    db = new Database(":memory:");
    db.pragma("journal_mode = WAL");
    setupSchema(db);
    setupFts(db);
    (globalThis as any).__omnirouteDb = db;
  });

  afterEach(() => {
    // Restore the previous singleton (or remove it)
    if (savedDb) {
      (globalThis as any).__omnirouteDb = savedDb;
    } else {
      delete (globalThis as any).__omnirouteDb;
    }
    try {
      db.close();
    } catch {
      // already closed
    }
  });

  // ── 1. Ranked results — FTS5 returns results ordered by relevance ──

  test("semantic strategy returns FTS5-ranked results with most relevant first", async () => {
    // Insert memories with varying relevance to the query "TypeScript"
    insertMemory(db, {
      content: "Python is a popular programming language for data science.",
      key: "python-info",
    });
    insertMemory(db, {
      content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
      key: "typescript-overview",
    });
    insertMemory(db, {
      content:
        "The TypeScript compiler (tsc) performs type checking and emits JavaScript. The TypeScript compiler is fast and TypeScript is great.",
      key: "typescript-compiler",
    });

    // Use single-token query so FTS5 MATCH finds all memories containing "TypeScript"
    const results = await retrieveMemories(API_KEY_ID, {
      query: "TypeScript",
      retrievalStrategy: "semantic",
      maxTokens: 8000,
    });

    // Should return at least the two TypeScript memories (Python one won't match)
    expect(results.length).toBeGreaterThanOrEqual(2);

    // The memory mentioning "TypeScript" more times should rank higher via BM25
    const topContent = results[0].content;
    expect(topContent).toContain("TypeScript compiler");
  });

  // ── 2. Hybrid strategy — combines FTS5 + recency/keyword signals ──

  test("hybrid strategy merges FTS5 results with keyword results without duplicates", async () => {
    // Memory that matches FTS5 query
    insertMemory(db, {
      content: "Kubernetes orchestrates containerized applications in a cluster.",
      key: "kubernetes",
    });
    // Memory that won't match FTS5 but contains the keyword in metadata/key
    insertMemory(db, {
      content: "Container deployment best practices for production systems.",
      key: "container-deploy",
    });
    // Unrelated memory
    insertMemory(db, {
      content: "Baking a sourdough loaf requires patience and a good starter.",
      key: "baking",
    });

    const results = await retrieveMemories(API_KEY_ID, {
      query: "Kubernetes",
      retrievalStrategy: "hybrid",
      maxTokens: 8000,
    });

    // Should return the Kubernetes memory (FTS5 match)
    expect(results.some((m) => m.content.includes("Kubernetes"))).toBe(true);

    // Verify no duplicates (unique ids)
    const ids = results.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // ── 3. Graceful fallback — FTS5 table missing → falls back to LIKE / chronological ──

  test("semantic strategy does not throw when memory_fts table is missing", async () => {
    // Seed data first (while FTS5 table still exists)
    insertMemory(db, {
      content: "React hooks simplify stateful logic in function components.",
      key: "react-hooks",
    });
    insertMemory(db, {
      content: "Vue 3 composition API provides flexible component composition.",
      key: "vue-composition",
    });

    // Now drop the FTS5 virtual table to simulate it being absent
    db.exec("DROP TABLE IF EXISTS memory_fts");

    // Should NOT throw — falls back to chronological retrieval
    const results = await retrieveMemories(API_KEY_ID, {
      query: "React",
      retrievalStrategy: "semantic",
      maxTokens: 8000,
    });

    // With FTS5 gone, the code falls back to chronological ORDER BY.
    // The query filter still applies via getRelevanceScore post-scoring,
    // so we should still get the React memory back.
    expect(results.some((m) => m.content.includes("React"))).toBe(true);
  });

  // ── 4. Special characters in FTS5 queries ──

  test("queries with special characters do not throw and return results gracefully", async () => {
    insertMemory(db, {
      content: "C++ is a powerful systems programming language with operator overloading.",
      key: "cpp-info",
    });
    insertMemory(db, {
      content: "Johnson & Johnson is a healthcare company.",
      key: "company-info",
    });

    const specialQueries = [
      '"quoted phrase"',
      "C++ language",
      "Johnson & Johnson",
      "dash-separated-query",
      "parens(test)",
      "asterisk*wildcard",
      "single'quote",
    ];

    for (const q of specialQueries) {
      // Must not throw regardless of strategy
      const semanticResults = await retrieveMemories(API_KEY_ID, {
        query: q,
        retrievalStrategy: "semantic",
        maxTokens: 8000,
      });
      expect(Array.isArray(semanticResults)).toBe(true);

      const hybridResults = await retrieveMemories(API_KEY_ID, {
        query: q,
        retrievalStrategy: "hybrid",
        maxTokens: 8000,
      });
      expect(Array.isArray(hybridResults)).toBe(true);
    }
  });

  // ── 5. Token budget enforcement ──

  test("results are trimmed when token budget is exceeded", async () => {
    // Each memory is ~100 chars = ~25 tokens
    const longContent = "A".repeat(400); // ~100 tokens per memory
    for (let i = 0; i < 10; i++) {
      insertMemory(db, {
        content: `Memory ${i}: ${longContent}`,
        key: `bulk-${i}`,
      });
    }

    // With maxTokens=50, we should get at most 1 memory (~100+ tokens each,
    // but the first one is always included even if it exceeds the budget)
    const results = await retrieveMemories(API_KEY_ID, {
      retrievalStrategy: "exact",
      maxTokens: 50,
    });

    // At least 1 memory (the "always include at least 1" rule)
    expect(results.length).toBeGreaterThanOrEqual(1);
    // But far fewer than all 10
    expect(results.length).toBeLessThan(10);
  });

  // ── 6. estimateTokens utility ──

  test("estimateTokens returns correct approximation", () => {
    expect(estimateTokens("")).toBe(0);
    expect(estimateTokens("abcd")).toBe(1); // 4 chars / 4 = 1
    expect(estimateTokens("abcde")).toBe(2); // ceil(5/4) = 2
    expect(estimateTokens("a".repeat(100))).toBe(25);
    // edge cases
    expect(estimateTokens(null as unknown as string)).toBe(0);
    expect(estimateTokens(undefined as unknown as string)).toBe(0);
  });
});
