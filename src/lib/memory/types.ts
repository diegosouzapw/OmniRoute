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
