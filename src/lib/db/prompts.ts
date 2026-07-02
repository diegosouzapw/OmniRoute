/**
 * Prompt Template Versioning — L-6
 *
 * SQLite-backed prompt template storage with version tracking.
 * Each prompt has a unique `slug`, and every save creates a new version
 * (content-addressed via SHA-256 hash). Previous versions are retained
 * for rollback and audit.
 *
 * @module lib/db/prompts
 */

import crypto from "crypto";
import { getDbInstance } from "./core";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { lastInsertRowid?: number | bigint; changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  exec: (sql: string) => void;
  transaction: (fn: () => void) => () => void;
}

interface PromptRow {
  id: unknown;
  slug: unknown;
  version: unknown;
  content: unknown;
  content_hash: unknown;
  variables: unknown;
  description: unknown;
  is_active: unknown;
  created_at: unknown;
}

interface PromptListRow {
  slug: unknown;
  active_version: unknown;
  total_versions: unknown;
}

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number"
    ? value
    : typeof value === "bigint"
      ? Number(value)
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : fallback;
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function parseVariables(value: unknown): string[] | null {
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return null;
  }
}

// ── Schema (auto-created on first access) ──

const PROMPT_SCHEMA = `
  CREATE TABLE IF NOT EXISTS prompt_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    content TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    variables TEXT,
    description TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(slug, version)
  );
  CREATE INDEX IF NOT EXISTS idx_pt_slug ON prompt_templates(slug);
  CREATE INDEX IF NOT EXISTS idx_pt_active ON prompt_templates(slug, is_active);
  CREATE INDEX IF NOT EXISTS idx_pt_hash ON prompt_templates(content_hash);
`;

let _initialized = false;

function ensureSchema(): void {
  if (_initialized) return;
  try {
    const db = getDbInstance() as unknown as DbLike;
    db.exec(PROMPT_SCHEMA);
    _initialized = true;
  } catch {
    // Schema creation is best-effort during build phase
  }
}

function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16);
}

// ── Public API ──

export interface PromptTemplate {
  id: number;
  slug: string;
  version: number;
  content: string;
  contentHash: string;
  variables: string[] | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
}

/**
 * Save a prompt template. If the slug already exists and the content
 * has changed, a new version is created. If content is identical,
 * returns the existing version without duplicating.
 */
export function savePrompt(
  slug: string,
  content: string,
  options: { variables?: string[]; description?: string } = {}
): PromptTemplate {
  ensureSchema();
  const db = getDbInstance() as unknown as DbLike;
  const hash = hashContent(content);

  // Check if identical content already exists for this slug
  const existing = db
    .prepare<PromptRow>("SELECT * FROM prompt_templates WHERE slug = ? AND content_hash = ?")
    .get(slug, hash);

  if (existing) {
    return rowToPrompt(existing);
  }

  // Deactivate previous active version
  db.prepare("UPDATE prompt_templates SET is_active = 0 WHERE slug = ? AND is_active = 1").run(
    slug
  );

  // Get next version number
  const maxVersion = db
    .prepare<{
      max_v: unknown;
    }>("SELECT MAX(version) as max_v FROM prompt_templates WHERE slug = ?")
    .get(slug);
  const nextVersion = toNumber(maxVersion?.max_v, 0) + 1;

  // Insert new version
  const result = db
    .prepare(
      `INSERT INTO prompt_templates (slug, version, content, content_hash, variables, description, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`
    )
    .run(
      slug,
      nextVersion,
      content,
      hash,
      options.variables ? JSON.stringify(options.variables) : null,
      options.description || null
    );

  return {
    id: toNumber(result.lastInsertRowid, 0),
    slug,
    version: nextVersion,
    content,
    contentHash: hash,
    variables: options.variables || null,
    description: options.description || null,
    isActive: true,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Get the active (latest) version of a prompt by slug.
 */
export function getActivePrompt(slug: string): PromptTemplate | null {
  ensureSchema();
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare<PromptRow>("SELECT * FROM prompt_templates WHERE slug = ? AND is_active = 1")
    .get(slug);
  return row ? rowToPrompt(row) : null;
}

/**
 * Get a specific version of a prompt.
 */
export function getPromptVersion(slug: string, version: number): PromptTemplate | null {
  ensureSchema();
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare<PromptRow>("SELECT * FROM prompt_templates WHERE slug = ? AND version = ?")
    .get(slug, version);
  return row ? rowToPrompt(row) : null;
}

/**
 * List all versions of a prompt (newest first).
 */
export function listPromptVersions(slug: string): PromptTemplate[] {
  ensureSchema();
  const db = getDbInstance() as unknown as DbLike;
  const rows = db
    .prepare<PromptRow>("SELECT * FROM prompt_templates WHERE slug = ? ORDER BY version DESC")
    .all(slug);
  return rows.map(rowToPrompt);
}

/**
 * List all prompt slugs with their active version info.
 */
export function listPrompts(): Array<{
  slug: string;
  activeVersion: number;
  totalVersions: number;
}> {
  ensureSchema();
  const db = getDbInstance() as unknown as DbLike;
  const rows = db
    .prepare<PromptListRow>(
      `SELECT slug,
              MAX(CASE WHEN is_active = 1 THEN version ELSE 0 END) as active_version,
              COUNT(*) as total_versions
       FROM prompt_templates
       GROUP BY slug
       ORDER BY slug`
    )
    .all();

  return rows.map((r) => ({
    slug: toString(r.slug),
    activeVersion: toNumber(r.active_version, 0),
    totalVersions: toNumber(r.total_versions, 0),
  }));
}

/**
 * Rollback to a previous version (makes it the active one).
 */
export function rollbackPrompt(slug: string, version: number): PromptTemplate | null {
  ensureSchema();
  const db = getDbInstance() as unknown as DbLike;

  const target = db
    .prepare<PromptRow>("SELECT * FROM prompt_templates WHERE slug = ? AND version = ?")
    .get(slug, version);

  if (!target) return null;

  const rollback = db.transaction(() => {
    db.prepare("UPDATE prompt_templates SET is_active = 0 WHERE slug = ?").run(slug);
    db.prepare("UPDATE prompt_templates SET is_active = 1 WHERE slug = ? AND version = ?").run(
      slug,
      version
    );
  });
  rollback();

  return rowToPrompt({ ...target, is_active: 1 });
}

/**
 * Render a prompt template by substituting variables.
 */
export function renderPrompt(slug: string, vars: Record<string, string> = {}): string | null {
  const prompt = getActivePrompt(slug);
  if (!prompt) return null;

  let content = prompt.content;
  for (const [key, value] of Object.entries(vars)) {
    content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }
  return content;
}

// ── Internal ──

function rowToPrompt(row: PromptRow): PromptTemplate {
  return {
    id: toNumber(row.id, 0),
    slug: toString(row.slug),
    version: toNumber(row.version, 1),
    content: toString(row.content),
    contentHash: toString(row.content_hash),
    variables: parseVariables(row.variables),
    description: typeof row.description === "string" ? row.description : null,
    isActive: row.is_active === 1 || row.is_active === true,
    createdAt: toString(row.created_at),
  };
}
