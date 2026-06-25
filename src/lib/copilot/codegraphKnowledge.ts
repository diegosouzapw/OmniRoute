/**
 * Copilot CodeGraph Knowledge Module
 *
 * Provides the Copilot with read-only access to the project's CodeGraph index.
 * Queries the `.codegraph/codegraph.db` SQLite database to find symbols,
 * explore relationships, list files, and search documentation.
 *
 * Falls back gracefully if the CodeGraph DB does not exist (e.g., production installs).
 */

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CodeGraphNode {
  id: string;
  kind: string;
  name: string;
  qualifiedName: string;
  filePath: string;
  language: string;
  startLine: number;
  endLine: number;
  signature?: string;
  docstring?: string;
  isExported: boolean;
  visibility?: string;
}

interface CodeGraphEdge {
  id: number;
  source: string;
  target: string;
  kind: string;
  line?: number;
  metadata?: Record<string, unknown>;
}

interface CodeGraphFile {
  path: string;
  language: string;
  nodeCount: number;
  modifiedAt: number;
}

interface CodeGraphSearchResult {
  nodes: CodeGraphNode[];
  total: number;
}

// ---------------------------------------------------------------------------
// Database access (lazy loaded)
// ---------------------------------------------------------------------------

let _db: unknown = null;

function getDbPath(): string | null {
  // Try project root first (dev), then cwd, then DATA_DIR
  const candidates = [
    join(process.cwd(), ".codegraph", "codegraph.db"),
    join(process.cwd(), "..", ".codegraph", "codegraph.db"),
  ];

  // Try to resolve from the project root
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Walk up to find .codegraph/
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    const candidate = join(dir, ".codegraph", "codegraph.db");
    if (existsSync(candidate)) return candidate;
    const parent = join(dir, "..");
    if (parent === dir) break;
    dir = parent;
  }

  for (const c of candidates) {
    if (existsSync(c)) return c;
  }

  return null;
}

export interface CodeGraphQueryResult {
  success: boolean;
  data: unknown;
  error?: string;
  engine: "sqlite" | "cli" | "none";
}

function queryDb(query: string, params: unknown[] = []): CodeGraphQueryResult {
  try {
    if (!_db) {
      const dbPath = getDbPath();
      if (!dbPath) {
        return { success: false, data: null, error: "CodeGraph DB not found", engine: "none" };
      }
      // Dynamic import to avoid hard dependency on better-sqlite3
      _db = null;

      // Use better-sqlite3 if available
      try {
        const Database = require("better-sqlite3");
        _db = new Database(dbPath, { readonly: true });
      } catch {
        return {
          success: false,
          data: null,
          error: "better-sqlite3 not available",
          engine: "none",
        };
      }
    }

    const stmt = (
      _db as { prepare: (sql: string) => { all: (params: unknown[]) => unknown[] } }
    ).prepare(query);
    const rows = stmt.all(params);
    return { success: true, data: rows, engine: "sqlite" };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      engine: "none",
    };
  }
}

// ---------------------------------------------------------------------------
// Search operations
// ---------------------------------------------------------------------------

/**
 * Search symbols by name (exact or partial match via FTS).
 */
export function searchSymbols(query: string, limit = 20): CodeGraphQueryResult {
  const sql = `
    SELECT n.*
    FROM nodes n
    JOIN nodes_fts fts ON n.id = fts.id
    WHERE nodes_fts MATCH ?
    ORDER BY rank
    LIMIT ?
  `;

  // Escape FTS special chars and create prefix query
  const sanitized = query.replace(/[^a-zA-Z0-9_]/g, " ").trim();
  if (!sanitized) {
    // Fallback to LIKE if query is empty after sanitization
    return queryDb(`SELECT * FROM nodes WHERE lower(name) LIKE ? ORDER BY kind, name LIMIT ?`, [
      `%${query.toLowerCase()}%`,
      limit,
    ]);
  }

  const ftsQuery = sanitized
    .split(/\s+/)
    .map((w) => `"${w}"*`)
    .join(" AND ");

  return queryDb(sql, [ftsQuery, limit]);
}

/**
 * Find callers of a symbol (edges where target matches).
 */
export function findCallers(symbolName: string, limit = 20): CodeGraphQueryResult {
  return queryDb(
    `SELECT e.id as edgeId, e.kind as edgeKind, e.line, e.col,
            s.id as sourceId, s.name as sourceName, s.kind as sourceKind,
            s.file_path as sourceFile, s.start_line as sourceLine,
            t.name as targetName, t.file_path as targetFile
     FROM edges e
     JOIN nodes s ON e.source = s.id
     JOIN nodes t ON e.target = t.id
     WHERE t.name = ?
     ORDER BY e.kind
     LIMIT ?`,
    [symbolName, limit]
  );
}

/**
 * Find callees of a symbol (edges where source matches).
 */
export function findCallees(symbolName: string, limit = 20): CodeGraphQueryResult {
  return queryDb(
    `SELECT e.id as edgeId, e.kind as edgeKind, e.line, e.col,
            s.name as sourceName,
            t.id as targetId, t.name as targetName, t.kind as targetKind,
            t.file_path as targetFile, t.start_line as targetLine
     FROM edges e
     JOIN nodes s ON e.source = s.id
     JOIN nodes t ON e.target = t.id
     WHERE s.name = ?
     ORDER BY e.kind
     LIMIT ?`,
    [symbolName, limit]
  );
}

/**
 * Get context for a file: all symbols defined in it.
 */
export function getFileContext(filePath: string): CodeGraphQueryResult {
  // Try matching on suffix of file_path (many nodes store paths relative to root)
  return queryDb(
    `SELECT * FROM nodes
     WHERE file_path LIKE ? OR file_path = ?
     ORDER BY start_line
     LIMIT 100`,
    [`%${filePath}`, filePath]
  );
}

/**
 * List all indexed files, optionally filtered by language.
 */
export function listFiles(language?: string, limit = 50): CodeGraphQueryResult {
  if (language) {
    return queryDb(`SELECT * FROM files WHERE language = ? ORDER BY path LIMIT ?`, [
      language,
      limit,
    ]);
  }
  return queryDb(`SELECT * FROM files ORDER BY path LIMIT ?`, [limit]);
}

/**
 * Get impact analysis: find symbols that depend on a given symbol (transitively).
 */
export function getImpactAnalysis(symbolName: string, depth = 1): CodeGraphQueryResult {
  if (depth <= 0)
    return { success: false, data: null, error: "Depth must be >= 1", engine: "none" };

  // Direct callers (depth 1)
  const directCallers = findCallers(symbolName);
  if (depth === 1) return directCallers;

  // For depth > 1, we'd need recursive CTE or multiple queries.
  // For now, just return direct callers with a note.
  const result = directCallers;
  return {
    ...result,
    data: (result.data as Record<string, unknown>[])?.map((r) => ({
      ...r,
      _depth: 1,
      _note: `Depth > 1 requires multiple queries. Use searchSymbols() + findCallers() iteratively for deeper analysis.`,
    })),
  };
}

/**
 * Check if CodeGraph DB is available.
 */
export function isCodeGraphAvailable(): boolean {
  return getDbPath() !== null;
}

/**
 * Get summary stats from the index.
 */
export function getCodeGraphStats(): CodeGraphQueryResult {
  return queryDb(`SELECT 'total_nodes' as key, COUNT(*) as value FROM nodes UNION ALL
                   SELECT 'total_edges', COUNT(*) FROM edges UNION ALL
                   SELECT 'total_files', COUNT(*) FROM files UNION ALL
                   SELECT 'languages', GROUP_CONCAT(DISTINCT language) FROM files UNION ALL
                   SELECT 'node_kinds', GROUP_CONCAT(DISTINCT kind) FROM nodes`);
}
