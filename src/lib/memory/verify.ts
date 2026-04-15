/**
 * Memory extraction pipeline verification
 * Creates a test memory, verifies it can be listed, and cleans up.
 */

import { createMemory, listMemories, deleteMemory } from "./store";
import { MemoryType } from "./types";
import { logger } from "../../../open-sse/utils/logger.js";

const log = logger("MEMORY_VERIFY");

export async function verifyExtractionPipeline(
  apiKeyId: string
): Promise<{ working: boolean; latencyMs: number; error?: string }> {
  const start = Date.now();
  log.info("memory.verify.start", { apiKeyId });

  let createdMemory: { id: string } | null = null;

  try {
    createdMemory = await createMemory({
      key: "__extraction_test__",
      content: "pipeline verification test",
      type: MemoryType.FACTUAL,
      apiKeyId,
      sessionId: "",
      metadata: {},
      expiresAt: null,
    });

    const result = await listMemories({ apiKeyId, page: 1, limit: 100 });
    const found = result.data.some((m) => m.key === "__extraction_test__");

    const latencyMs = Date.now() - start;
    const working = found;

    log.info("memory.verify.complete", { working, latencyMs });

    return { working, latencyMs };
  } catch (err: unknown) {
    const latencyMs = Date.now() - start;
    const error = String(err);

    log.info("memory.verify.complete", { working: false, latencyMs });

    return { working: false, latencyMs, error };
  } finally {
    if (createdMemory) {
      try {
        await deleteMemory(createdMemory.id);
      } catch {
        // Cleanup best-effort — don't mask original error
      }
    }
  }
}
