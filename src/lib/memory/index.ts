/**
 * Memory module exports and initialization
 */

import { logger } from "../../../open-sse/utils/logger.ts";
const log = logger("MEMORY");

export * from "./backend";
export * from "./manager";
export * from "./settings";
export * from "./types";
export * from "./store";
export * from "./retrieval";
export * from "./vectorStore";
export * from "./embedding";
export * from "./sqliteBackend";
export * from "./genericBackend";

// Auto-register SQLiteBackend with MemoryManager on import (sync only)
import { memoryManager } from "./manager";
import { sqliteBackend } from "./sqliteBackend";

memoryManager.register(sqliteBackend);

export { memoryManager } from "./manager";
export { sqliteBackend } from "./sqliteBackend";
export { createGenericMemoryBackend, createKnownBackend } from "./genericBackend";
export type { GenericBackendConfig, KnownBackendId } from "./genericBackend";
export { KNOWN_BACKENDS } from "./genericBackend";

/**
 * Initialize memory backends from settings.
 * Call this after DB is ready (e.g., from app bootstrap).
 */
export async function initMemoryBackends(): Promise<void> {
  const { getMemorySettings } = await import("./settings");
  try {
    const settings = await getMemorySettings();
    memoryManager.configure(settings.primaryBackend, settings.fallbackBackends);
    await memoryManager.initialize();
  } catch (e) {
    log.warn("Failed to initialize backends", { error: String(e) });
  }
}
