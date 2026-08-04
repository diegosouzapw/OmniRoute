// Memory system type definitions for OmniRoute
// These types support the memory management system for AI agents

/**
 * Memory types for AI agent memory management system
 */
export enum MemoryType {
  FACTUAL = "factual",
  EPISODIC = "episodic",
  PROCEDURAL = "procedural",
  SEMANTIC = "semantic",
}

/**
 * Memory interface representing individual memory entries
 */
export interface Memory {
  id: string;
  apiKeyId: string;
  sessionId: string;
  type: MemoryType;
  key: string;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
  /** TV6 typed-decay telemetry: how many times this memory has been injected into a prompt. */
  accessCount: number;
  /** TV6 typed-decay telemetry: timestamp of the most recent injection (re-bases the decay clock). */
  lastAccessedAt: Date | null;
}

/**
 * Memory configuration interface for memory system settings
 */
export interface MemoryConfig {
  enabled: boolean;
  maxTokens: number;
  retrievalStrategy: "exact" | "semantic" | "hybrid";
  autoSummarize: boolean;
  persistAcrossModels: boolean;
  retentionDays: number;
  scope: "session" | "apiKey" | "global";
}
