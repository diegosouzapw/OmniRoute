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
 * Max wall-clock time a single operator-authored hook may run. With
 * `microtaskMode: "afterEvaluate"` the vm timeout covers the hook's async
 * continuations too: the sandbox has no timers or I/O, so every `await` inside it
 * resolves as a microtask that runs before `runInContext()` returns.
 */
const HOOK_EXECUTION_TIMEOUT_MS = 5000;

const HOOK_INPUT_GLOBAL = "__omnirouteHookInput";
const HOOK_OUTPUT_GLOBAL = "__omnirouteHookOutput";

/**
 * GHSA-9p9m-h9rj-rhhg — the hook runs in its OWN realm and only JSON crosses the
 * boundary.
 *
 * The previous sandbox handed the hook the host's `Object`, `Array`, `Promise`, … and
 * the live `context` object, so hook code could write the SERVER's `Object.prototype`
 * (e.g. `Object.prototype.env = { NODE_OPTIONS: "--require …" }`, which a later
 * `worker_threads` Worker inherits → code execution). Now:
 *
 * - the vm context is created from a null-prototype object, so the hook sees the fresh
 *   realm's own intrinsics — polluting its `Object.prototype` never reaches the host,
 *   and `this.constructor.constructor` resolves to that realm's `Function`, which
 *   `codeGeneration.strings: false` blocks;
 * - no host object or function is exposed: the request context goes in as a JSON
 *   string and is parsed inside the realm; `context.log.*` buffers into an array;
 * - the hook's result, its mutated context and the buffered log lines come back as ONE
 *   JSON string written to a sandbox global. The host never awaits or calls anything
 *   from the realm (a hook could replace `Promise.prototype.then`, and a host `await`
 *   would hand its own resolve functions — and with them the host `Function` — to it).
 *
 * Node's `vm` is still not a hard security boundary; the write path stays loopback/LAN
 * only (`/api/middleware/` in LOCAL_ONLY_API_PREFIXES). This removes the shared-realm
 * escape, not the need to trust hook authors.
 */
function buildHookSource(code: string): string {
  return `(async () => {
  const __omnirouteLogs = [];
  let __omniroutePayload;
  try {
    const context = JSON.parse(${HOOK_INPUT_GLOBAL});
    context.log = {
      info: (tag, msg) => { __omnirouteLogs.push(["info", String(tag), String(msg)]); },
      warn: (tag, msg) => { __omnirouteLogs.push(["warn", String(tag), String(msg)]); },
      error: (tag, msg) => { __omnirouteLogs.push(["error", String(tag), String(msg)]); },
    };
    const __omnirouteResult = await (async () => { ${code}
    })();
    delete context.log;
    __omniroutePayload = {
      ok: true,
      result: __omnirouteResult === undefined || __omnirouteResult === null ? {} : __omnirouteResult,
      context,
      logs: __omnirouteLogs,
    };
  } catch (__omnirouteError) {
    let message = "Hook threw";
    try {
      message = String(
        __omnirouteError && __omnirouteError.message !== undefined
          ? __omnirouteError.message
          : __omnirouteError
      );
    } catch {}
    __omniroutePayload = { ok: false, error: message, logs: __omnirouteLogs };
  }
  globalThis.${HOOK_OUTPUT_GLOBAL} = JSON.stringify(__omniroutePayload);
})();`;
}

type HookPayload = {
  ok?: unknown;
  error?: unknown;
  result?: unknown;
  context?: unknown;
  logs?: unknown;
};

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Parse realm output on the host; `__proto__` keys are dropped, never assigned. */
function parseHookPayload(raw: string, hookName: string): HookPayload {
  try {
    const parsed: unknown = JSON.parse(raw, (key, value) =>
      key === "__proto__" ? undefined : value
    );
    if (isPlainRecord(parsed)) return parsed as HookPayload;
  } catch {
    // fall through
  }
  throw new Error(`Hook "${hookName}" returned an unreadable result`);
}

/** Only an own data property holding a string is accepted — never a getter. */
function readHookOutput(sandbox: object): string | null {
  const descriptor = Object.getOwnPropertyDescriptor(sandbox, HOOK_OUTPUT_GLOBAL);
  return descriptor && "value" in descriptor && typeof descriptor.value === "string"
    ? descriptor.value
    : null;
}

/**
 * Message of an error that escaped `runInContext()` (the vm timeout is raised from the
 * realm, so it is not `instanceof Error` here). Read as an own data property only: a
 * getter would run realm code outside the timeout.
 */
function ownStringMessage(err: unknown): string | null {
  if (err instanceof Error) return err.message;
  if (typeof err !== "object" || err === null) return null;
  const descriptor = Object.getOwnPropertyDescriptor(err, "message");
  return descriptor && "value" in descriptor && typeof descriptor.value === "string"
    ? descriptor.value
    : null;
}

function toHookInput(context: PreRequestHookContext): string {
  return JSON.stringify({
    body: context.body,
    headers: context.headers,
    model: context.model,
    combo: context.combo,
    apiKeyInfo: context.apiKeyInfo,
    metadata: context.metadata,
  });
}

/** Copy the hook's in-place mutations back onto the host context (data fields only). */
function applyContextMutations(context: PreRequestHookContext, mutated: unknown): void {
  if (!isPlainRecord(mutated)) return;
  if (isPlainRecord(mutated.body)) context.body = mutated.body;
  if (isPlainRecord(mutated.headers)) {
    context.headers = mutated.headers as PreRequestHookContext["headers"];
  }
  if (typeof mutated.model === "string") context.model = mutated.model;
  if (typeof mutated.combo === "string") context.combo = mutated.combo;
  else if (mutated.combo === undefined || mutated.combo === null) context.combo = undefined;
  if (isPlainRecord(mutated.metadata)) context.metadata = mutated.metadata;
}

function replayHookLogs(context: PreRequestHookContext, logs: unknown): void {
  if (!Array.isArray(logs)) return;
  for (const entry of logs) {
    if (!Array.isArray(entry) || entry.length !== 3) continue;
    const [level, tag, msg] = entry;
    if (level !== "info" && level !== "warn" && level !== "error") continue;
    context.log?.[level]?.(String(tag), String(msg));
  }
}

function compileHookCode(code: string, hookName: string): HookMiddleware {
  // Compile-once: parse the source into a reusable vm.Script. This throws on
  // syntax errors at registration time (preserving the original behavior) and
  // is cached in the returned closure so each execution only pays for a fresh
  // isolated context, not re-parsing.
  let script: vm.Script;
  try {
    script = new vm.Script(buildHookSource(code), {
      filename: `omniroute-hook:${hookName}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Compilation error";
    throw new Error(`Failed to compile hook "${hookName}": ${message}`);
  }

  return async (context: PreRequestHookContext): Promise<HookResult> => {
    const sandbox: Record<string, unknown> = Object.create(null);
    sandbox[HOOK_INPUT_GLOBAL] = toHookInput(context);
    const vmContext = vm.createContext(sandbox, {
      codeGeneration: { strings: false, wasm: false },
      microtaskMode: "afterEvaluate",
    });

    try {
      script.runInContext(vmContext, { timeout: HOOK_EXECUTION_TIMEOUT_MS });
    } catch (err: unknown) {
      // A vm timeout / realm error: its constructor is not the host Error. Normalize
      // to a readable host Error without calling into the realm.
      throw new Error(ownStringMessage(err) ?? `Hook "${hookName}" failed`);
    }

    const raw = readHookOutput(sandbox);
    if (raw === null) {
      throw new Error(`Hook "${hookName}" did not finish (awaited something that never settles?)`);
    }
    const payload = parseHookPayload(raw, hookName);
    replayHookLogs(context, payload.logs);
    if (payload.ok !== true) {
      throw new Error(typeof payload.error === "string" ? payload.error : "Hook threw");
    }
    applyContextMutations(context, payload.context);
    return (isPlainRecord(payload.result) ? payload.result : {}) as HookResult;
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
