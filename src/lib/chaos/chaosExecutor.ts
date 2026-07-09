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
import { POST as postChatCompletion } from "@/app/api/v1/chat/completions/route";

// Wrapped in an object (rather than called as a bare imported function) so unit
// tests can swap it out via `mock.method(chatDispatch, "postChatCompletion", ...)`
// without hitting real upstream providers — the same pattern src/lib/batches/
// dispatch.ts uses for its `dispatch` export (ES module named bindings are
// read-only and cannot be mocked directly).
export const chatDispatch = {
  postChatCompletion,
};

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
  /**
   * API key to attribute the in-process dispatch calls to (usage accounting,
   * per-key policy). Optional — omitted for dashboard-initiated runs, which fall
   * back to the same "local mode" (no Authorization header) path used by
   * src/lib/evals/runtime.ts and src/lib/batches/dispatch.ts.
   */
  apiKey?: string | null;
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

interface EffectiveRunParams {
  mode: ChaosMode;
  timeoutMs: number;
  maxTokens: number;
  effectiveSystemPrompt: string;
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

// ── Internal helpers — config/param resolution ──────────────────────────────

function resolveEffectiveRunParams(
  input: ChaosRunInput,
  globalConfig: ChaosConfig
): EffectiveRunParams {
  const mode: ChaosMode = input.mode || globalConfig.defaultMode || "parallel";
  const timeoutMs = input.timeoutMs || globalConfig.timeoutMs || 120_000;
  const maxTokens = input.maxTokens || globalConfig.maxTokens || DEFAULT_MAX_TOKENS;
  const effectiveSystemPrompt =
    input.systemPrompt ||
    globalConfig.systemPrompt ||
    (mode === "collaborative" ? COLLABORATIVE_SYSTEM_PROMPT : DEFAULT_SYSTEM_PROMPT);

  return { mode, timeoutMs, maxTokens, effectiveSystemPrompt };
}

/**
 * Resolve the best model ID for a provider connection.
 * Applies provider overrides from global chaos config if present.
 */
function resolveModelId(
  conn: { provider?: string; id?: string; defaultModel?: string | null },
  overrides: ChaosConfig["providerOverrides"]
): string {
  const override = overrides.find(
    (o) =>
      o.enabled &&
      (o.providerId.toLowerCase() === (conn.provider || "").toLowerCase() ||
        o.providerId.toLowerCase() === (conn.id || "").toLowerCase())
  );
  if (override?.modelId) return override.modelId;
  return conn.defaultModel || conn.provider || conn.id || "unknown";
}

// ── Internal helpers — provider selection ───────────────────────────────────

/** Narrow `active` connections down to the caller-requested `providers` filter. */
function filterByRequestedProviders(active: any[], requested: string[]): any[] {
  const filterSet = new Set(requested.map((p: string) => p.toLowerCase()));
  const selected = active.filter((c: any) => filterSet.has((c.provider ?? "").toLowerCase()));
  if (selected.length === 0) {
    throw new Error(`None of the specified providers are active: ${requested.join(", ")}`);
  }
  return selected;
}

/** Narrow `active` connections down to the enabled global-config overrides (soft filter). */
function filterByEnabledOverrides(
  active: any[],
  enabledOverrides: ChaosConfig["providerOverrides"]
): any[] {
  const overrideIds = new Set(enabledOverrides.map((o) => o.providerId.toLowerCase()));
  const selected = active.filter(
    (c: any) =>
      overrideIds.has((c.provider ?? "").toLowerCase()) || overrideIds.has((c.id ?? "").toLowerCase())
  );
  return selected.length > 0 ? selected : active; // fallback to all active
}

function toProviderInfoList(selected: any[]): ProviderInfo[] {
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
  return Array.from(providerMap.values());
}

/**
 * Fetch active provider connections and narrow them down to the requested
 * (explicit `providers` filter, else enabled global-config overrides, else all
 * active) set, deduplicated by provider id.
 */
async function selectChaosProviders(
  input: ChaosRunInput,
  globalConfig: ChaosConfig
): Promise<{ providers: ProviderInfo[]; enabledOverrides: ChaosConfig["providerOverrides"] }> {
  const allConnections = await getProviderConnections().catch(() => [] as any[]);
  const active = (Array.isArray(allConnections) ? allConnections : []).filter(
    (c: any) => c.isActive !== false
  );

  if (active.length === 0) {
    throw new Error("No active provider connections found");
  }

  const enabledOverrides = globalConfig.providerOverrides.filter((o) => o.enabled);

  let selected = active;
  if (input.providers && input.providers.length > 0) {
    selected = filterByRequestedProviders(active, input.providers);
  } else if (enabledOverrides.length > 0) {
    selected = filterByEnabledOverrides(active, enabledOverrides);
  }

  return { providers: toProviderInfoList(selected), enabledOverrides };
}

// ── Internal helpers — single-model dispatch ────────────────────────────────

function buildDispatchRequest(
  model: string,
  messages: { role: string; content: string }[],
  maxTokens: number,
  timeoutMs: number,
  apiKey?: string | null
): Request {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (apiKey) {
    headers.set("Authorization", `Bearer ${apiKey}`);
  }
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({ model, messages, stream: false, max_tokens: maxTokens }),
    signal: AbortSignal.timeout(timeoutMs),
  });
}

async function parseDispatchResponse(
  res: Response,
  ctx: { providerId: string; providerName: string; modelId: string },
  start: number
): Promise<ModelResult> {
  if (!res.ok) {
    const errText = await res.text().catch(() => "unknown error");
    return {
      ...ctx,
      status: "error",
      content: null,
      error: `API ${res.status}: ${errText.slice(0, 500)}`,
      durationMs: Math.round(performance.now() - start),
    };
  }

  const data = await res.json();
  const content =
    data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? JSON.stringify(data);

  return {
    ...ctx,
    status: "success",
    content,
    durationMs: Math.round(performance.now() - start),
  };
}

function buildDispatchErrorResult(
  err: unknown,
  ctx: { providerId: string; providerName: string; modelId: string },
  start: number,
  timeoutMs: number
): ModelResult {
  const errObj = err as { name?: string; type?: string; message?: string };
  const isAbort = errObj?.name === "AbortError" || errObj?.type === "aborted";
  return {
    ...ctx,
    status: "error",
    content: null,
    error: isAbort ? `timeout (${timeoutMs}ms)` : (errObj?.message ?? String(err)),
    durationMs: Math.round(performance.now() - start),
  };
}

/**
 * Dispatch to OmniRoute's own /v1/chat/completions handler for a given
 * provider+model — in-process, via a synthetic Request handed directly to the
 * route's POST handler. No network hop, no port dependency. Mirrors the
 * established pattern in src/lib/batches/dispatch.ts and src/lib/evals/runtime.ts
 * (which the codebase's outbound-self-call convention requires — see #6679 review).
 */
async function dispatchToModel(
  providerId: string,
  providerName: string,
  modelId: string,
  messages: { role: string; content: string }[],
  timeoutMs: number,
  maxTokens: number,
  apiKey?: string | null
): Promise<ModelResult> {
  const start = performance.now();
  const ctx = { providerId, providerName, modelId };

  try {
    const model = modelId || providerId;
    const request = buildDispatchRequest(model, messages, maxTokens, timeoutMs, apiKey);
    const res = await chatDispatch.postChatCompletion(request);
    return await parseDispatchResponse(res, ctx, start);
  } catch (err: unknown) {
    return buildDispatchErrorResult(err, ctx, start, timeoutMs);
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

// ── Internal helpers — mode dispatch ────────────────────────────────────────

function buildMessages(
  systemPrompt: string,
  userContent: string
): { role: "system" | "user"; content: string }[] {
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userContent },
  ];
}

async function dispatchParallel(
  providers: ProviderInfo[],
  input: ChaosRunInput,
  overrides: ChaosConfig["providerOverrides"],
  params: EffectiveRunParams
): Promise<ModelResult[]> {
  const tasks = providers.map((p) => () => {
    const modelId = resolveModelId(p, overrides);
    const messages = buildMessages(params.effectiveSystemPrompt, input.task);
    return dispatchToModel(
      p.id,
      p.name,
      modelId,
      messages,
      params.timeoutMs,
      params.maxTokens,
      input.apiKey
    );
  });

  const results = await runWithConcurrencyLimit(tasks, MAX_CONCURRENCY);

  // Sort: successes first, then errors, then by duration
  results.sort((a, b) => {
    if (a.status === "success" && b.status !== "success") return -1;
    if (a.status !== "success" && b.status === "success") return 1;
    return a.durationMs - b.durationMs;
  });

  return results;
}

async function dispatchCollaborative(
  providers: ProviderInfo[],
  input: ChaosRunInput,
  overrides: ChaosConfig["providerOverrides"],
  params: EffectiveRunParams
): Promise<ModelResult[]> {
  const results: ModelResult[] = [];
  let context = input.task;

  for (const p of providers) {
    const modelId = resolveModelId(p, overrides);
    const messages = buildMessages(params.effectiveSystemPrompt, context);

    const result = await dispatchToModel(
      p.id,
      p.name,
      modelId,
      messages,
      params.timeoutMs,
      params.maxTokens,
      input.apiKey
    );
    results.push(result);

    if (result.status === "success" && result.content) {
      context = `Task: ${input.task}\n\nPrevious model's output:\n${result.content}\n\n---\n\nPlease refine, extend, critique, or provide an alternative perspective on the above.`;
    }
  }

  return results;
}

function buildCollaborativeSummary(mode: ChaosMode, results: ModelResult[]): string | undefined {
  if (mode !== "collaborative") return undefined;
  return (
    results
      .filter((r) => r.status === "success" && r.content)
      .map((r) => r.content!)
      .join("\n\n---\n\n") || undefined
  );
}

// ── Main execution function ──────────────────────────────────────────────────

/**
 * Execute a Chaos Mode run.
 *
 * This is the single shared implementation used by both API routes.
 */
export async function executeChaosRun(input: ChaosRunInput): Promise<ChaosRunResult> {
  const globalConfig = await getChaosConfig();
  const params = resolveEffectiveRunParams(input, globalConfig);
  const { providers, enabledOverrides } = await selectChaosProviders(input, globalConfig);

  const startedAt = new Date().toISOString();
  const results =
    params.mode === "parallel"
      ? await dispatchParallel(providers, input, enabledOverrides, params)
      : await dispatchCollaborative(providers, input, enabledOverrides, params);

  const summary = buildCollaborativeSummary(params.mode, results);

  return {
    task: input.task,
    mode: params.mode,
    startedAt,
    totalProviders: providers.length,
    totalResults: results.length,
    models: results,
    ...(summary ? { summary } : {}),
  };
}
