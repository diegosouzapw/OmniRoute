/**
 * MemoryBackend Provider Pattern
 * Interface for pluggable memory backends (SQLite, Obsidian, Brain, Notion, Custom)
 */
import type { Memory, MemoryType } from "./types";
export type { Memory, MemoryType } from "./types";

/** Input for creating a new memory */
export interface CreateMemoryInput {
  apiKeyId: string;
  sessionId: string;
  type: MemoryType;
  key: string;
  content: string;
  metadata?: Record<string, unknown>;
  expiresAt?: Date | null;
}

/** Filters for listing/searching memories */
export interface MemoryFilter {
  apiKeyId?: string;
  type?: MemoryType;
  sessionId?: string;
  category?: string;
  query?: string;
  limit?: number;
  offset?: number;
  orderBy?: "createdAt" | "updatedAt" | "lastAccessedAt";
  orderDir?: "asc" | "desc";
}

/** Search configuration - backend decides strategy (exact, semantic, hybrid) */
export interface SearchConfig {
  query: string;
  apiKeyId: string;
  limit?: number;
  maxTokens?: number;
  strategy?: "exact" | "semantic" | "hybrid";
  /** Backend-specific options */
  options?: Record<string, unknown>;
}

/** Health check result */
export interface HealthCheckResult {
  ok: boolean;
  latencyMs: number;
  error?: string;
}

/** Core MemoryBackend interface - all backends must implement */
export interface MemoryBackend {
  /** Unique backend identifier: "sqlite" | "obsidian" | "brain" | "notion" | "custom" */
  readonly id: string;

  /** Human-readable display name */
  readonly displayName: string;

  // ─── CRUD ───

  /** Create a new memory (upsert if same apiKeyId + key) */
  create(input: CreateMemoryInput): Promise<Memory>;

  /** Get a memory by ID */
  get(id: string): Promise<Memory | null>;

  /** Update a memory */
  update(id: string, updates: Partial<Omit<Memory, "id" | "createdAt">>): Promise<boolean>;

  /** Delete a memory by ID */
  delete(id: string): Promise<boolean>;

  /** List memories with filtering and pagination */
  list(
    filter: MemoryFilter
  ): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // ─── Search ───

  /** Search memories - backend decides strategy (FTS5, vector, hybrid, etc.) */
  search(config: SearchConfig): Promise<Memory[]>;

  // ─── Health ───

  /** Health check - returns ok + latency */
  health(): Promise<HealthCheckResult>;

  // ─── Optional lifecycle ───

  /** Initialize backend (connect, create tables, etc.) - called on registration */
  initialize?(): Promise<void>;

  /** Shutdown backend (close connections, etc.) - called on unregister */
  shutdown?(): Promise<void>;
}
