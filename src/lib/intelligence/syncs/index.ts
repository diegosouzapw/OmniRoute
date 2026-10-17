/**
 * syncs/index.ts — Initialization hook for intelligence syncs.
 *
 * Exports initIntelligenceSyncs to start all four intelligence syncs.
 */

import { initModelgrepSync } from "./modelgrepSync";
import { initPublicaiSync } from "./publicaiSync";
import { initArenaExternalSync } from "./arenaExternalSync";
import { initHuggingfaceSync } from "./huggingfaceSync";

export async function initIntelligenceSyncs(): Promise<void> {
  // Initialize all syncs; each returns true if started, false if disabled.
  await Promise.all([
    initModelgrepSync(),
    initPublicaiSync(),
    initArenaExternalSync(),
    initHuggingfaceSync(),
  ]);
}