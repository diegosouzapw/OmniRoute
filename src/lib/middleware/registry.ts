/**
 * Pre-request Hook Registry
 *
 * Singleton registry for pre-request middleware hooks.
 * Follows the same globalThis pattern as GuardrailRegistry.
 *
 * Hooks execute in priority order (lower = first) BEFORE provider
 * selection and combo routing. They can:
 *   - Mutate the request body/headers
 *   - Redirect to a different model/combo
 *   - Short-circuit with a custom response
 *   - Skip remaining hooks
 */

import {
  type HookMiddleware,
  type HookConfig,
  type PreRequestHookContext,
  type HookResult,
  type HookScope,
  type HookLogEntry,
  HookPriority,
} from "./types";

// ── State (globalThis singleton) ──────────────────────────────────────────

declare global {
  var __omniroutePreRequestRegistry:
    | {
        initialized: boolean;
        hooks: Map<string, HookConfig>;
        middlewares: Map<string, HookMiddleware>;
        logs: HookLogEntry[];
        maxLogs: number;
      }
    | undefined;
}

function getRegistryState() {
  if (!globalThis.__omniroutePreRequestRegistry) {
    globalThis.__omniroutePreRequestRegistry = {
      initialized: false,
      hooks: new Map(),
      middlewares: new Map(),
      logs: [],
      maxLogs: 1000,
    };
  }
  return globalThis.__omniroutePreRequestRegistry;
}

// ── Compile hook code into middleware function ────────────────────────────

function compileHookCode(code: string, hookName: string): HookMiddleware {
  try {
    // Wrap in async function that returns HookResult
    // eslint-disable-next-line no-new-func
    const fn = new Function("context", `return (async () => { ${code} })();`) as (
      context: PreRequestHookContext
    ) => Promise<HookResult>;
    return fn;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Compilation error";
    throw new Error(`Failed to compile hook "${hookName}": ${message}`);
  }
}

// ── Default context factory ──────────────────────────────────────────────

export function createHookContext(params: {
  body: Record<string, unknown>;
  headers: Record<string, string | string[] | undefined>;
  model: string;
  combo?: string;
  apiKeyInfo?: Record<string, unknown>;
  log?: any;
}): PreRequestHookContext {
  const logger = params.log || console;
  return {
    body: { ...params.body },
    headers: { ...params.headers },
    model: params.model,
    combo: params.combo,
    apiKeyInfo: params.apiKeyInfo ? { ...params.apiKeyInfo } : undefined,
    metadata: {},
    log: {
      info: (tag: string, msg: string) => logger.info?.(tag, msg) ?? console.log(`[${tag}] ${msg}`),
      warn: (tag: string, msg: string) =>
        logger.warn?.(tag, msg) ?? console.warn(`[${tag}] ${msg}`),
      error: (tag: string, msg: string) =>
        logger.error?.(tag, msg) ?? console.error(`[${tag}] ${msg}`),
    },
  };
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Register a pre-request hook.
 */
export function registerHook(config: HookConfig, middleware?: HookMiddleware): void {
  const state = getRegistryState();

  if (state.hooks.has(config.name)) {
    throw new Error(`Hook "${config.name}" is already registered`);
  }

  state.hooks.set(config.name, { ...config });

  if (middleware) {
    state.middlewares.set(config.name, middleware);
  } else {
    // Compile from code
    const compiled = compileHookCode(config.code, config.name);
    state.middlewares.set(config.name, compiled);
  }
}

/**
 * Unregister a hook by name.
 */
export function unregisterHook(name: string): boolean {
  const state = getRegistryState();
  const removed = state.hooks.delete(name);
  state.middlewares.delete(name);
  return removed;
}

/**
 * Update an existing hook's config and optionally recompile.
 */
export function updateHook(name: string, updates: Partial<HookConfig>): boolean {
  const state = getRegistryState();
  const existing = state.hooks.get(name);
  if (!existing) return false;

  const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
  state.hooks.set(name, updated);

  // Recompile if code changed
  if (updates.code) {
    try {
      const compiled = compileHookCode(updated.code, name);
      state.middlewares.set(name, compiled);
    } catch (err: unknown) {
      state.hooks.set(name, { ...existing, lastError: (err as Error).message });
      throw err;
    }
  }

  return true;
}

/**
 * Get all registered hooks.
 */
export function getAllHooks(): HookConfig[] {
  return Array.from(getRegistryState().hooks.values());
}

/**
 * Execute all enabled hooks for the given context.
 * Returns the final context with all mutations applied.
 *
 * If any hook short-circuits, returns { response } immediately
 * and stops processing.
 */
export async function runHooks(
  context: PreRequestHookContext,
  comboId?: string
): Promise<{
  context: PreRequestHookContext;
  response?: { status: number; body: Record<string, unknown> };
}> {
  const state = getRegistryState();
  const hooks = Array.from(state.hooks.values())
    .filter(
      (h) =>
        h.enabled &&
        (h.scope.type === "global" ||
          (h.scope.type === "combo" && comboId && h.scope.comboId === comboId))
    )
    .sort((a, b) => a.priority - b.priority);

  for (const hook of hooks) {
    const middleware = state.middlewares.get(hook.name);
    if (!middleware) continue;

    const startTime = Date.now();
    try {
      const result = await middleware(context);

      // Apply mutations
      if (result.body) {
        context.body = { ...context.body, ...result.body };
      }
      if (result.headers) {
        context.headers = { ...context.headers, ...result.headers };
      }
      if (result.model) {
        context.model = result.model;
      }
      if (result.combo) {
        context.combo = result.combo;
      }

      // Update run count
      hook.runCount = (hook.runCount || 0) + 1;

      // Record execution log
      const logEntry: HookLogEntry = {
        id: `${hook.name}-${Date.now()}`,
        hookName: hook.name,
        requestId: `${Date.now()}`,
        durationMs: Date.now() - startTime,
        mutated: !!(result.body || result.headers || result.model || result.combo),
        skipped: !!result.skipRemaining,
        timestamp: new Date().toISOString(),
      };

      state.logs.push(logEntry);
      if (state.logs.length > state.maxLogs) {
        state.logs.splice(0, state.logs.length - state.maxLogs);
      }

      // Short-circuit
      if (result.response) {
        return { context, response: result.response };
      }

      // Skip remaining
      if (result.skipRemaining) {
        break;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      hook.lastError = message;
      hook.runCount = (hook.runCount || 0) + 1;

      state.logs.push({
        id: `${hook.name}-err-${Date.now()}`,
        hookName: hook.name,
        requestId: `${Date.now()}`,
        durationMs: Date.now() - startTime,
        mutated: false,
        skipped: false,
        error: message,
        timestamp: new Date().toISOString(),
      });

      console.error(`[Middleware] Hook "${hook.name}" failed:`, message);
    }
  }

  return { context };
}

/**
 * Get execution logs.
 */
export function getHookLogs(hookName?: string, limit = 50): HookLogEntry[] {
  const state = getRegistryState();
  let logs = state.logs;
  if (hookName) {
    logs = logs.filter((l) => l.hookName === hookName);
  }
  return logs.slice(-limit);
}

/**
 * Initialize registry (idempotent).
 */
export function initPreRequestRegistry(): void {
  getRegistryState().initialized = true;
}
