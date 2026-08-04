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

import * as vm from "vm";

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

/**
 * Max wall-clock time a single operator-authored hook may run.
 * Synchronous runaway loops are cut off by the `vm` timeout; async work that
 * never settles is cut off by the Promise.race guard below.
 */
const HOOK_EXECUTION_TIMEOUT_MS = 5000;

/**
 * Build the minimal, capability-free context object exposed to hook code.
 *
 * TRUST MODEL: Node's `vm` is NOT a hard security boundary (it shares the host
 * V8 heap and prototype-chain escapes exist). Its purpose here is to remove
 * *ambient* authority — hook code compiled from `HookConfig.code` must not see
 * `process`, `require`, `global`/`globalThis`, `fetch`, `Buffer`, timers, or
 * the module scope. Only the request `context` and pure/deterministic globals
 * are reachable, so a hook cannot read `process.env`, spawn processes, open
 * sockets, or `require()` arbitrary modules. Combined with the operator-only
 * write path (hooks are authored locally), this closes the `new Function()`
 * ambient-authority exposure (Hard Rule #3 / SonarCloud S1523).
 */
function createHookSandbox(context: PreRequestHookContext): Record<string, unknown> {
  return {
    context,
    // Pure / deterministic globals only — no I/O, no ambient authority.
    JSON,
    Math,
    Date,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    Error,
    TypeError,
    RangeError,
    SyntaxError,
    URIError,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Symbol,
    Promise,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    URL,
    URLSearchParams,
    // Deliberately absent: process, require, module, exports, global,
    // globalThis, fetch, Buffer, setTimeout/setInterval, __dirname, __filename.
  };
}

function compileHookCode(code: string, hookName: string): HookMiddleware {
  // Compile-once: parse the source into a reusable vm.Script. This throws on
  // syntax errors at registration time (preserving the original behavior) and
  // is cached in the returned closure so each execution only pays for a fresh
  // minimal context, not re-parsing.
  let script: vm.Script;
  try {
    script = new vm.Script(`(async () => { ${code} })();`, {
      filename: `omniroute-hook:${hookName}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Compilation error";
    throw new Error(`Failed to compile hook "${hookName}": ${message}`);
  }

  return async (context: PreRequestHookContext): Promise<HookResult> => {
    const sandbox = createHookSandbox(context);
    const vmContext = vm.createContext(sandbox, {
      codeGeneration: { strings: false, wasm: false },
    });

    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      // The `vm` timeout only interrupts *synchronous* runaway code; the
      // Promise.race below bounds async work that never settles.
      const execution: unknown = script.runInContext(vmContext, {
        timeout: HOOK_EXECUTION_TIMEOUT_MS,
      });

      const timeoutGuard = new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => {
          reject(
            new Error(`Hook "${hookName}" timed out after ${HOOK_EXECUTION_TIMEOUT_MS}ms`)
          );
        }, HOOK_EXECUTION_TIMEOUT_MS);
      });

      const result = await Promise.race([Promise.resolve(execution), timeoutGuard]);
      return (result ?? {}) as HookResult;
    } catch (err: unknown) {
      // Errors thrown from inside the vm context use the context's own
      // constructors, so they are not `instanceof` the host Error. Normalize
      // to a host Error carrying a readable message so callers/observability
      // classify it correctly.
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "message" in err
            ? String((err as { message: unknown }).message)
            : String(err);
      throw new Error(message);
    } finally {
      if (timer) clearTimeout(timer);
    }
  };
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
 * Get a hook config by name.
 */
export function getHook(name: string): HookConfig | undefined {
  return getRegistryState().hooks.get(name);
}

/**
 * Get all registered hooks.
 */
export function getAllHooks(): HookConfig[] {
  return Array.from(getRegistryState().hooks.values());
}

/**
 * Load hooks from DB config rows into the registry.
 * This is called at startup to restore persisted hooks.
 */
export function loadHooksFromConfig(rows: HookConfig[]): void {
  const state = getRegistryState();
  for (const row of rows) {
    if (!state.hooks.has(row.name)) {
      state.hooks.set(row.name, row);
      try {
        const compiled = compileHookCode(row.code, row.name);
        state.middlewares.set(row.name, compiled);
      } catch (err) {
        console.error(`[Middleware] Failed to compile hook "${row.name}":`, err);
      }
    }
  }
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

/**
 * Clear all hooks (for testing).
 */
export function clearAllHooks(): void {
  const state = getRegistryState();
  state.hooks.clear();
  state.middlewares.clear();
  state.logs = [];
}

/**
 * Get registry stats for health monitoring.
 */
export function getRegistryStats(): {
  totalHooks: number;
  enabledHooks: number;
  globalHooks: number;
  comboScopedHooks: number;
  recentLogs: number;
} {
  const state = getRegistryState();
  const hooks = Array.from(state.hooks.values());
  return {
    totalHooks: hooks.length,
    enabledHooks: hooks.filter((h) => h.enabled).length,
    globalHooks: hooks.filter((h) => h.scope.type === "global").length,
    comboScopedHooks: hooks.filter((h) => h.scope.type === "combo").length,
    recentLogs: state.logs.length,
  };
}
