/**
 * lib/chaos/chaosExecutor.ts
 *
 * Shared Chaos Mode execution engine — used by BOTH:
 *   - POST /api/chaos/run       (dashboard, management-session auth)
 *   - POST /api/skills/collect/chaos  (external, Bearer-token auth)
 *
 * Eliminates the ~150 lines of duplicate dispatch logic that previously existed
 * in both route files.
 */
import { getProviderConnections } from "@/models";
import { getChaosConfig, type ChaosConfig } from "@/lib/chaos/chaosConfig";

// ── Exported types ───────────────────────────────────────────────────────────

export interface ProviderInfo {
  id: string;
  name: string;
  provider: string;
  defaultModel: string | null;
}

export interface ModelResult {
  providerId: string;
  providerName: string;
  modelId: string;
  status: "success" | "error" | "skipped";
  content: string | null;
  error?: string;
  durationMs: number;
}

export type ChaosMode = "parallel" | "collaborative";

export interface ChaosRunInput {
  task: string;
  providers?: string[];
  mode?: ChaosMode;
  systemPrompt?: string;
  /** Override the global timeout for this single run */
  timeoutMs?: number;
  /** Override max_tokens sent to each model (default 4096) */
  maxTokens?: number;
}

export interface ChaosRunResult {
  task: string;
  mode: ChaosMode;
  startedAt: string;
  totalProviders: number;
  totalResults: number;
  models: ModelResult[];
  summary?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const DEFAULT_SYSTEM_PROMPT = `You are one of several AI models working in CHAOS MODE.

Your job:
1. Analyze the user's task thoroughly
2. Produce the best possible response using your unique strengths
3. Be concise but complete — your output will be combined with other models' outputs
4. Do NOT refer to "other models" or "CHAOS MODE" in your response — just answer the task directly`;

export const COLLABORATIVE_SYSTEM_PROMPT = `You are one of several AI models working in CHAOS MODE (collaborative).

Your job:
1. You will see the task AND the previous model's output
2. Build upon, refine, critique, or extend the previous work
3. Add new insights, fix issues, or provide an alternative perspective
4. Do NOT refer to "CHAOS MODE" or other models explicitly — just contribute your part naturally`;

const DEFAULT_MAX_TOKENS = 4096;
/** Maximum concurrent fetch requests in parallel mode */
const MAX_CONCURRENCY = 10;

// ── Internal helpers ─────────────────────────────────────────────────────────

const OMNIROUTE_BASE = process.env.OMNIROUTE_INTERNAL_URL || "http://localhost:30129";

/**
 * Resolve the best model ID for a provider connection.
 * Applies provider overrides from global chaos config if present.
 */
function resolveModelId(conn: { provider?: string; id?: string; defaultModel?: string | null }, overrides: ChaosConfig["providerOverrides"]): string {
  const override = overrides.find(
    (o) =>
      o.enabled &&
      (o.providerId.toLowerCase() === (conn.provider || "").toLowerCase() ||
        o.providerId.toLowerCase() === (conn.id || "").toLowerCase())
  );
  if (override?.modelId) return override.modelId;
  return conn.defaultModel || conn.provider || conn.id || "unknown";
}

/**
 * Call OmniRoute's own /v1/chat/completions for a given provider+model.
 */
async function dispatchToModel(
  providerId: string,
  providerName: string,
  modelId: string,
  messages: { role: string; content: string }[],
  timeoutMs: number,
  maxTokens: number,
): Promise<ModelResult> {
  const start = performance.now();
  try {
    const model = modelId || providerId;
    const res = await fetch(`${OMNIROUTE_BASE}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages, stream: false, max_tokens: maxTokens }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "unknown error");
      return {
        providerId, providerName, modelId,
        status: "error", content: null,
        error: `API ${res.status}: ${errText.slice(0, 500)}`,
        durationMs: Math.round(performance.now() - start),
      };
    }

    const data = await res.json();
    const content =
      data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? JSON.stringify(data);

    return {
      providerId, providerName, modelId,
      status: "success", content,
      durationMs: Math.round(performance.now() - start),
    };
  } catch (err: unknown) {
    const errObj = err as { name?: string; type?: string; message?: string };
    const isAbort = errObj?.name === "AbortError" || errObj?.type === "aborted";
    return {
      providerId, providerName, modelId,
      status: "error", content: null,
      error: isAbort ? `timeout (${timeoutMs}ms)` : (errObj?.message ?? String(err)),
      durationMs: Math.round(performance.now() - start),
    };
  }
}

/**
 * Run an array of async functions with a concurrency limit.
 * Uses a simple pooling approach: start up to `limit` tasks at once,
 * and as each completes, start the next one.
 */
async function runWithConcurrencyLimit<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < tasks.length) {
      const idx = nextIndex++;
      results[idx] = await tasks[idx]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// ── Main execution function ──────────────────────────────────────────────────

/**
 * Execute a Chaos Mode run.
 *
 * This is the single shared implementation used by both API routes.
 */
export async function executeChaosRun(input: ChaosRunInput): Promise<ChaosRunResult> {
  const globalConfig = getChaosConfig();

  // Merge request overrides → global config → hardcoded defaults
  const mode: ChaosMode = input.mode || globalConfig.defaultMode || "parallel";
  const timeoutMs = input.timeoutMs || globalConfig.timeoutMs || 120_000;
  const maxTokens = input.maxTokens || globalConfig.maxTokens || DEFAULT_MAX_TOKENS;

  const effectiveSystemPrompt =
    input.systemPrompt ||
    globalConfig.systemPrompt ||
    (mode === "collaborative" ? COLLABORATIVE_SYSTEM_PROMPT : DEFAULT_SYSTEM_PROMPT);

  // 1. Fetch all active provider connections
  const allConnections = await getProviderConnections().catch(() => [] as any[]);
  const active = (Array.isArray(allConnections) ? allConnections : []).filter(
    (c: any) => c.isActive !== false
  );

  if (active.length === 0) {
    throw new Error("No active provider connections found");
  }

  // 2. Apply provider overrides from global config
  const enabledOverrides = globalConfig.providerOverrides.filter((o) => o.enabled);
  let selected = active;

  if (input.providers && input.providers.length > 0) {
    // Request explicitly named providers
    const filterSet = new Set(input.providers.map((p: string) => p.toLowerCase()));
    selected = active.filter((c: any) => filterSet.has((c.provider ?? "").toLowerCase()));
    if (selected.length === 0) {
      throw new Error(`None of the specified providers are active: ${input.providers.join(", ")}`);
    }
  } else if (enabledOverrides.length > 0) {
    // Use global config overrides to filter
    const overrideIds = new Set(enabledOverrides.map((o) => o.providerId.toLowerCase()));
    selected = active.filter(
      (c: any) =>
        overrideIds.has((c.provider ?? "").toLowerCase()) ||
        overrideIds.has((c.id ?? "").toLowerCase())
    );
    if (selected.length === 0) selected = active; // fallback to all active
  }

  // 3. Build provider list with resolved models (deduplicate by provider id)
  const providerMap = new Map<string, ProviderInfo>();
  for (const conn of selected) {
    const providerKey = conn.provider || conn.id;
    if (!providerMap.has(providerKey)) {
      providerMap.set(providerKey, {
        id: conn.id,
        name: conn.name || conn.provider || providerKey,
        provider: conn.provider || providerKey,
        defaultModel: conn.defaultModel || null,
      });
    }
  }
  const providers = Array.from(providerMap.values());

  // 4. Dispatch
  const startedAt = new Date().toISOString();
  let results: ModelResult[];

  if (mode === "parallel") {
    // All models run concurrently (with a concurrency cap)
    const tasks = providers.map((p) => () => {
      const modelId = resolveModelId(p, enabledOverrides);
      const messages = [
        { role: "system" as const, content: effectiveSystemPrompt },
        { role: "user" as const, content: input.task },
      ];
      return dispatchToModel(p.id, p.name, modelId, messages, timeoutMs, maxTokens);
    });

    results = await runWithConcurrencyLimit(tasks, MAX_CONCURRENCY);

    // Sort: successes first, then errors, then by duration
    results.sort((a, b) => {
      if (a.status === "success" && b.status !== "success") return -1;
      if (a.status !== "success" && b.status === "success") return 1;
      return a.durationMs - b.durationMs;
    });
  } else {
    // Collaborative mode: chain outputs through models sequentially
    results = [];
    let context = input.task;

    for (const p of providers) {
      const modelId = resolveModelId(p, enabledOverrides);
      const messages = [
        { role: "system" as const, content: effectiveSystemPrompt },
        { role: "user" as const, content: context },
      ];

      const result = await dispatchToModel(p.id, p.name, modelId, messages, timeoutMs, maxTokens);
      results.push(result);

      if (result.status === "success" && result.content) {
        context = `Task: ${input.task}\n\nPrevious model's output:\n${result.content}\n\n---\n\nPlease refine, extend, critique, or provide an alternative perspective on the above.`;
      }
    }
  }

  // 5. Build summary for collaborative mode
  let summary: string | undefined;
  if (mode === "collaborative") {
    const successfulOutputs = results
      .filter((r) => r.status === "success" && r.content)
      .map((r) => r.content!)
      .join("\n\n---\n\n");
    summary = successfulOutputs || undefined;
  }

  return {
    task: input.task,
    mode,
    startedAt,
    totalProviders: providers.length,
    totalResults: results.length,
    models: results,
    ...(summary ? { summary } : {}),
  };
}
