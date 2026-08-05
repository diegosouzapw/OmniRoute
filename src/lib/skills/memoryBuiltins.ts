import { createMemory, updateMemory, deleteMemory, getMemory } from "@/lib/memory/store";
import { retrieveMemories } from "@/lib/memory/retrieval";
import { getMemorySettings, DEFAULT_MEMORY_SETTINGS, toMemoryRetrievalConfig } from "@/lib/memory/settings";
import { MemoryType } from "@/lib/memory/types";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("MEMORY_BUILTINS");

export const MEMORY_SAVE_TOOL_NAME = "memory_save";
export const MEMORY_UPDATE_TOOL_NAME = "memory_update";
export const MEMORY_SEARCH_TOOL_NAME = "memory_search";
export const MEMORY_DELETE_TOOL_NAME = "memory_delete";

export const MEMORY_BUILTIN_TOOL_NAMES = [
  MEMORY_SAVE_TOOL_NAME,
  MEMORY_UPDATE_TOOL_NAME,
  MEMORY_SEARCH_TOOL_NAME,
  MEMORY_DELETE_TOOL_NAME,
] as const;

const MEMORY_TYPES = ["factual", "episodic", "procedural", "semantic"] as const;

function toMemoryType(value: unknown): MemoryType {
  return MEMORY_TYPES.includes(value as (typeof MEMORY_TYPES)[number])
    ? (value as MemoryType)
    : MemoryType.FACTUAL;
}

function toPositiveInt(value: unknown, fallback: number, max: number): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, max);
}

async function assertOwner(memoryId: string, apiKeyId: string): Promise<void> {
  const memory = await getMemory(memoryId);
  if (!memory) throw new Error(`Memory not found: ${memoryId}`);
  if (memory.apiKeyId !== apiKeyId) {
    throw new Error("Memory does not belong to this API key");
  }
}

function memoryToPlain(memory: Awaited<ReturnType<typeof createMemory>>) {
  return {
    id: memory.id,
    type: memory.type,
    key: memory.key,
    content: memory.content,
    metadata: memory.metadata,
    createdAt: memory.createdAt.toISOString(),
    updatedAt: memory.updatedAt.toISOString(),
  };
}

async function handleMemorySave(input: Record<string, unknown>, context: { apiKeyId: string; sessionId: string }) {
  const { type, key, content, metadata } = input as {
    type?: string;
    key: string;
    content: string;
    metadata?: Record<string, unknown>;
  };
  if (!key || typeof key !== "string") throw new Error("Missing required field: key");
  if (!content || typeof content !== "string") throw new Error("Missing required field: content");

  const saved = await createMemory({
    apiKeyId: context.apiKeyId,
    sessionId: context.sessionId || "",
    type: toMemoryType(type),
    key,
    content,
    metadata: metadata && typeof metadata === "object" ? metadata : {},
    expiresAt: null,
  });

  return {
    success: true,
    memory: memoryToPlain(saved),
    message: "Memory saved successfully",
    context: context.apiKeyId,
  };
}

async function handleMemoryUpdate(input: Record<string, unknown>, context: { apiKeyId: string }) {
  const { id, type, key, content, metadata } = input as {
    id: string;
    type?: string;
    key?: string;
    content?: string;
    metadata?: Record<string, unknown>;
  };
  if (!id || typeof id !== "string") throw new Error("Missing required field: id");

  await assertOwner(id, context.apiKeyId);

  const updates: Record<string, unknown> = {};
  if (type !== undefined) updates.type = toMemoryType(type);
  if (key !== undefined) updates.key = key;
  if (content !== undefined) updates.content = content;
  if (metadata !== undefined) updates.metadata = metadata;

  if (Object.keys(updates).length === 0) throw new Error("No fields to update");

  const ok = await updateMemory(id, updates);
  if (!ok) throw new Error(`Failed to update memory: ${id}`);

  return {
    success: true,
    id,
    message: "Memory updated successfully",
    context: context.apiKeyId,
  };
}

async function handleMemorySearch(input: Record<string, unknown>, context: { apiKeyId: string }) {
  const { query, type, limit, maxTokens } = input as {
    query?: string;
    type?: string;
    limit?: number;
    maxTokens?: number;
  };

  const memorySettings = (await getMemorySettings().catch(() => null)) ?? DEFAULT_MEMORY_SETTINGS;
  const baseConfig = toMemoryRetrievalConfig(memorySettings, { query });
  const config = {
    ...baseConfig,
    enabled: true,
    maxTokens: toPositiveInt(maxTokens, memorySettings.maxTokens, 8000),
  };

  const memories = await retrieveMemories(context.apiKeyId, config);

  const filtered = type ? memories.filter((m) => m.type === type) : memories;
  const limited = limit ? filtered.slice(0, toPositiveInt(limit, 10, 50)) : filtered;

  return {
    success: true,
    data: {
      memories: limited.map((m) => memoryToPlain(m)),
      count: limited.length,
      totalTokens: limited.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0),
    },
    context: context.apiKeyId,
  };
}

async function handleMemoryDelete(input: Record<string, unknown>, context: { apiKeyId: string }) {
  const { id } = input as { id: string };
  if (!id || typeof id !== "string") throw new Error("Missing required field: id");

  await assertOwner(id, context.apiKeyId);

  const ok = await deleteMemory(id);
  if (!ok) throw new Error(`Failed to delete memory: ${id}`);

  return {
    success: true,
    id,
    message: "Memory deleted successfully",
    context: context.apiKeyId,
  };
}

export const memoryBuiltinHandlers = {
  [MEMORY_SAVE_TOOL_NAME]: handleMemorySave,
  [MEMORY_UPDATE_TOOL_NAME]: handleMemoryUpdate,
  [MEMORY_SEARCH_TOOL_NAME]: handleMemorySearch,
  [MEMORY_DELETE_TOOL_NAME]: handleMemoryDelete,
} as const;

const MEMORY_SAVE_DESCRIPTION = [
  "Save a memory entry for the current API key. Creates a new entry, or updates the existing",
  "entry with the same key (UPSERT). Use this to persist user preferences, facts, decisions,",
  "or context worth remembering across conversations. Returned memory.id can be used later",
  "with memory_update / memory_delete.",
].join(" ");

const MEMORY_UPDATE_DESCRIPTION = [
  "Update an existing memory entry by id (returned by memory_save or memory_search).",
  "Only provided fields are changed. Content updates re-embed the memory.",
].join(" ");

const MEMORY_SEARCH_DESCRIPTION = [
  "Search the current API key's memory entries by query or type. Returns matching memories",
  "with their ids so they can be referenced or updated.",
].join(" ");

const MEMORY_DELETE_DESCRIPTION = [
  "Delete a memory entry by id (returned by memory_save or memory_search).",
].join(" ");

const MEMORY_TYPE_SCHEMA = {
  type: "string",
  enum: [...MEMORY_TYPES],
  description: "Memory category: factual (facts/preferences), episodic (events), procedural (how-to), semantic (knowledge).",
};

const memorySaveParameters = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: "string", description: "Unique key for the memory entry (e.g. 'preference:coffee'). Reusing a key updates the existing entry." },
    content: { type: "string", description: "The memory content to store." },
    type: MEMORY_TYPE_SCHEMA,
    metadata: { type: "object", description: "Optional structured metadata attached to the entry." },
  },
  required: ["key", "content"],
};

const memoryUpdateParameters = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string", description: "Memory entry id returned by memory_save or memory_search." },
    type: MEMORY_TYPE_SCHEMA,
    key: { type: "string", description: "New key for the entry." },
    content: { type: "string", description: "New content for the entry." },
    metadata: { type: "object", description: "Replacement metadata." },
  },
  required: ["id"],
};

const memorySearchParameters = {
  type: "object",
  additionalProperties: false,
  properties: {
    query: { type: "string", description: "Search query text. When omitted, returns recent memories." },
    type: MEMORY_TYPE_SCHEMA,
    limit: { type: "integer", minimum: 1, maximum: 50, description: "Maximum number of results (default 10)." },
    maxTokens: { type: "integer", minimum: 1, maximum: 8000, description: "Token budget for the results." },
  },
};

const memoryDeleteParameters = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string", description: "Memory entry id returned by memory_save or memory_search." },
  },
  required: ["id"],
};

export function buildMemoryOpenAITools(): unknown[] {
  const wrap = (name: string, description: string, parameters: Record<string, unknown>) => ({
    type: "function",
    function: { name, description, parameters },
  });
  return [
    wrap(MEMORY_SAVE_TOOL_NAME, MEMORY_SAVE_DESCRIPTION, memorySaveParameters),
    wrap(MEMORY_UPDATE_TOOL_NAME, MEMORY_UPDATE_DESCRIPTION, memoryUpdateParameters),
    wrap(MEMORY_SEARCH_TOOL_NAME, MEMORY_SEARCH_DESCRIPTION, memorySearchParameters),
    wrap(MEMORY_DELETE_TOOL_NAME, MEMORY_DELETE_DESCRIPTION, memoryDeleteParameters),
  ];
}

export function buildMemoryClaudeTools(): unknown[] {
  const wrap = (name: string, description: string, input_schema: Record<string, unknown>) => ({
    name,
    description,
    input_schema,
  });
  return [
    wrap(MEMORY_SAVE_TOOL_NAME, MEMORY_SAVE_DESCRIPTION, memorySaveParameters),
    wrap(MEMORY_UPDATE_TOOL_NAME, MEMORY_UPDATE_DESCRIPTION, memoryUpdateParameters),
    wrap(MEMORY_SEARCH_TOOL_NAME, MEMORY_SEARCH_DESCRIPTION, memorySearchParameters),
    wrap(MEMORY_DELETE_TOOL_NAME, MEMORY_DELETE_DESCRIPTION, memoryDeleteParameters),
  ];
}

export function buildMemoryGeminiTools(): unknown[] {
  const wrap = (name: string, description: string, parameters: Record<string, unknown>) => ({
    name,
    description,
    parameters,
  });
  return [
    wrap(MEMORY_SAVE_TOOL_NAME, MEMORY_SAVE_DESCRIPTION, memorySaveParameters),
    wrap(MEMORY_UPDATE_TOOL_NAME, MEMORY_UPDATE_DESCRIPTION, memoryUpdateParameters),
    wrap(MEMORY_SEARCH_TOOL_NAME, MEMORY_SEARCH_DESCRIPTION, memorySearchParameters),
    wrap(MEMORY_DELETE_TOOL_NAME, MEMORY_DELETE_DESCRIPTION, memoryDeleteParameters),
  ];
}

export function buildMemoryToolsForProvider(
  provider: "openai" | "anthropic" | "google" | "other"
): unknown[] {
  switch (provider) {
    case "anthropic":
      return buildMemoryClaudeTools();
    case "google":
      return buildMemoryGeminiTools();
    default:
      return buildMemoryOpenAITools();
  }
}
