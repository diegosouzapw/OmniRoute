import type { A2ATask, TaskArtifact } from "./taskManager";
import { appendA2ATaskEvent } from "@/lib/db/a2aTasks";
import { memoryManager } from "@/lib/memory/manager";

type TaskManagerLike = {
  updateTask: (
    taskId: string,
    state: "completed" | "failed",
    artifacts?: Array<{ type: string; content: string }>,
    message?: string
  ) => unknown;
};

type StreamTaskResult = {
  artifacts: TaskArtifact[];
  metadata: Record<string, unknown>;
};

/**
 * Task D2 (Orchestration Canvas Fase 2, PR-C): a memory hit recorded for OBSERVABILITY ONLY.
 * The retrieved memory is never injected into a skill's prompt or behavior — it is only
 * mirrored into `task.metadata.memoryHits` and a `memory_hits` history event so the dashboard
 * can show which memories were consulted for a given A2A task.
 *
 * Note on drift from the original spec: `Memory` (`src/lib/memory/types.ts`) does not expose a
 * `score` field, so hits carry `key`/`type` instead of a relevance score.
 */
export interface MemoryHit {
  id: string;
  key: string;
  type: string;
  /** `content` truncated to 200 chars — never the full memory body. */
  snippet: string;
}

/** DI seam for `collectMemoryHits` — tests need neither a real memory backend nor a database. */
export interface MemoryHitsDeps {
  search?: (cfg: {
    query: string;
    apiKeyId: string;
    limit?: number;
  }) => Promise<Array<{ id: string; key: string; type: string; content: string }>>;
  appendEvent?: (taskId: string, eventType: string, dataJson?: string) => void;
}

/**
 * Collect the memories consulted for a task's last user message, as pure observability.
 *
 * - Kill-switch: `OMNIROUTE_A2A_MEMORY_HITS=0` returns `[]` without querying anything.
 * - Query = the content of the LAST message with `role === "user"`; empty/absent ⇒ `[]`.
 * - Owner id = `task.owner ?? "mcp"` — the same keyless fallback the MCP memory tools use
 *   (`open-sse/mcp-server/tools/memoryTools.ts::resolveMemoryOwnerId`).
 * - Any failure in the recall path ⇒ `[]` — this must never fail the caller's task.
 *
 * KNOWN LIMITATION — recall only resolves under the KEYLESS posture. `task.owner` is a
 * SHA-256 PREFIX of the raw API key (`src/lib/a2a/authenticate.ts::resolveA2AOwner`), while
 * memory rows are keyed by the DB api-key **id** (`String(apiKeyInfo.id)`, the value
 * `getApiKeyMetadata()` returns — see `open-sse/mcp-server/mcpCallerIdentity.ts`). The two
 * live in different namespaces, so for a keyed caller the search below matches nothing and
 * the hits list is always empty; only the keyless case (`owner === undefined` → `"mcp"`)
 * lines up with the MCP-tool owner id. Bridging them needs a hash→api-key-id lookup that
 * does NOT exist today: `src/lib/db/apiKeys.ts` only ever looks a key up by its RAW value
 * (`WHERE key = ? OR key_hash = ?`, with the FULL sha256 hex), and the raw key is long gone
 * by the time a task executes. Deliberately NOT worked around here — inventing a
 * prefix-scan lookup over `api_keys` would be a new auth-adjacent surface. Follow-up:
 * either persist the DB api-key id on the task alongside the hash, or add an explicit
 * `getApiKeyIdByKeyHashPrefix()` in the db layer.
 */
export async function collectMemoryHits(
  task: A2ATask,
  deps?: MemoryHitsDeps
): Promise<MemoryHit[]> {
  if (process.env.OMNIROUTE_A2A_MEMORY_HITS === "0") return [];

  const messages = task.input?.messages ?? [];
  let query: string | undefined;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") {
      query = messages[i].content;
      break;
    }
  }
  if (!query || query.trim() === "") return [];

  try {
    const search =
      deps?.search ??
      (async (cfg: { query: string; apiKeyId: string; limit?: number }) =>
        memoryManager.getPrimaryBackend().search(cfg));
    const apiKeyId = task.owner ?? "mcp";
    const results = await search({ query, apiKeyId, limit: 5 });
    return results.map((m) => ({
      id: m.id,
      key: m.key,
      type: m.type,
      snippet: m.content.slice(0, 200),
    }));
  } catch {
    return [];
  }
}

export type A2ASkillHandler = (task: A2ATask) => Promise<StreamTaskResult>;

export const A2A_SKILL_HANDLERS: Record<string, A2ASkillHandler> = {
  "smart-routing": async (task) => {
    const skillModule = await import("./skills/smartRouting");
    return skillModule.executeSmartRouting(task);
  },
  "quota-management": async (task) => {
    const skillModule = await import("./skills/quotaManagement");
    return skillModule.executeQuotaManagement(task);
  },
  "provider-discovery": async (task) => {
    const skillModule = await import("./skills/providerDiscovery");
    return skillModule.executeProviderDiscovery(task);
  },
  "cost-analysis": async (task) => {
    const skillModule = await import("./skills/costAnalysis");
    return skillModule.executeCostAnalysis(task);
  },
  "health-report": async (task) => {
    const skillModule = await import("./skills/healthReport");
    return skillModule.executeHealthReport(task);
  },
  "list-capabilities": async (task) => {
    const skillModule = await import("./skills/listCapabilities");
    return skillModule.executeListCapabilities(task);
  },
};

export async function executeA2ATaskWithState(
  tm: TaskManagerLike,
  task: A2ATask,
  handler: (task: A2ATask) => Promise<StreamTaskResult>,
  deps?: MemoryHitsDeps
) {
  try {
    const hits = await collectMemoryHits(task, deps);
    if (hits.length) {
      task.metadata.memoryHits = hits;
      try {
        (deps?.appendEvent ?? appendA2ATaskEvent)(task.id, "memory_hits", JSON.stringify(hits));
      } catch {
        // best-effort — never break the task's write path
      }
    }

    const result = await handler(task);
    tm.updateTask(task.id, "completed", result.artifacts);
    return result;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    try {
      tm.updateTask(task.id, "failed", [{ type: "error", content: msg }], msg);
    } catch {
      // Task may already be terminal (e.g., cancelled). Preserve original error.
    }
    throw err;
  }
}
