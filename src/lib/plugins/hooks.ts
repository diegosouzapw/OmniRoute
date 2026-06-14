/**
 * Custom hook registry — event-driven plugin hook system.
 *
 * Plugins can register handlers for any OmniRoute event. Built-in events
 * cover the full request lifecycle plus routing, rate limiting, and errors.
 *
 * @module plugins/hooks
 */

import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("PLUGIN_HOOKS");

// ── Types ──

export type BlockingHookResult = {
  blocked?: boolean;
  response?: unknown;
  body?: unknown;
  metadata?: Record<string, unknown>;
};

export type HookHandler = (
  payload: unknown
) => void | Promise<void> | BlockingHookResult | Promise<BlockingHookResult>;

export interface HookRegistration {
  pluginName: string;
  handler: HookHandler;
  priority: number;
}

// ── Built-in events ──

export const BUILTIN_EVENTS = [
  "onRequest",
  "onResponse",
  "onError",
  "onModelSelect",
  "onComboResolve",
  "onRateLimit",
  "onQuotaExhaust",
  "onProviderError",
  "onStreamStart",
  "onStreamEnd",
  "onInstall",
  "onActivate",
  "onDeactivate",
  "onUninstall",
] as const;

export type BuiltinEvent = (typeof BUILTIN_EVENTS)[number];

// ── Rate limiting ──

const RATE_LIMIT_MAX = 100; // max calls per plugin per window
const RATE_LIMIT_WINDOW_MS = 1000; // 1 second window

interface RateLimitState {
  count: number;
  windowStart: number;
}

const rateLimitMap: Map<string, RateLimitState> = new Map();

function isRateLimited(pluginName: string): boolean {
  const now = Date.now();
  const key = pluginName;
  const state = rateLimitMap.get(key);

  if (!state || now - state.windowStart >= RATE_LIMIT_WINDOW_MS) {
    // New window
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return false;
  }

  state.count++;
  if (state.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// ── Registry ──

const hooks: Map<string, HookRegistration[]> = new Map();

/**
 * Register a handler for an event.
 */
export function registerHook(
  event: string,
  pluginName: string,
  handler: HookHandler,
  priority: number = 100
): void {
  if (!hooks.has(event)) {
    hooks.set(event, []);
  }
  const list = hooks.get(event)!;

  // Prevent duplicate registration
  if (list.some((r) => r.pluginName === pluginName && r.handler === handler)) {
    return;
  }

  list.push({ pluginName, handler, priority });
  list.sort((a, b) => a.priority - b.priority);

  log.info("hook.registered", { event, pluginName, priority });
}

/**
 * Unregister all handlers for a plugin.
 * Also evicts the plugin's rate-limit state so uninstalled plugins don't leak memory.
 */
export function unregisterHooks(pluginName: string): void {
  for (const [event, list] of hooks.entries()) {
    const before = list.length;
    const filtered = list.filter((r) => r.pluginName !== pluginName);
    if (filtered.length !== before) {
      hooks.set(event, filtered);
      log.info("hook.unregistered", { event, pluginName, removed: before - filtered.length });
    }
  }
  // Evict rate-limit state so uninstalled plugins don't accumulate entries
  rateLimitMap.delete(pluginName);
}

/**
 * Unregister a specific handler.
 */
export function unregisterHook(event: string, pluginName: string): void {
  const list = hooks.get(event);
  if (!list) return;
  const before = list.length;
  const filtered = list.filter((r) => r.pluginName !== pluginName);
  hooks.set(event, filtered);
  if (before !== filtered.length) {
    log.info("hook.unregistered", { event, pluginName });
  }
}

/**
 * Emit an event — fire all registered handlers.
 * Handler errors are logged but don't block other handlers.
 * Rate-limited per plugin: max 100 calls per second.
 */
export async function emitHook(event: string, payload: unknown): Promise<void> {
  const list = hooks.get(event);
  if (!list || list.length === 0) return;

  for (const reg of list) {
    if (isRateLimited(reg.pluginName)) {
      log.warn("hook.rate_limited", { event, pluginName: reg.pluginName });
      continue;
    }
    try {
      await reg.handler(payload);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      log.error("hook.handler_error", {
        event,
        pluginName: reg.pluginName,
        error: message,
      });
    }
  }
}

/**
 * Emit a blocking event — fire handlers with body/metadata chaining.
 * Returns blocking result from the first handler that blocks, or merged body/metadata.
 * Used for onRequest and onResponse where plugins can modify or block the request.
 */
export async function emitHookBlocking(
  event: string,
  payload: unknown
): Promise<{
  blocked?: boolean;
  response?: unknown;
  body?: unknown;
  metadata?: Record<string, unknown>;
}> {
  const list = hooks.get(event) || [];
  const ctx = (payload || {}) as Record<string, unknown>;
  let mergedBody: unknown = ctx.body;
  let mergedMetadata: Record<string, unknown> = (ctx.metadata as Record<string, unknown>) || {};

  for (const reg of list) {
    // Mirror emitHook: rate-limit the hot blocking path too
    if (isRateLimited(reg.pluginName)) {
      log.warn("hook.blocking_rate_limited", { event, pluginName: reg.pluginName });
      continue;
    }
    try {
      // Chain the payload: each handler must see the body/metadata as mutated by
      // previous handlers, not the original static payload — otherwise plugin B
      // can't observe plugin A's changes. (#3286)
      const currentPayload = { ...ctx, body: mergedBody, metadata: mergedMetadata };
      const result = await reg.handler(currentPayload);
      if (result && typeof result === "object") {
        if ("body" in result) mergedBody = (result as Record<string, unknown>).body;
        if ("metadata" in result)
          mergedMetadata = {
            ...mergedMetadata,
            ...(((result as Record<string, unknown>).metadata as Record<string, unknown>) || {}),
          };
        if ("blocked" in result && (result as BlockingHookResult).blocked) {
          return {
            ...result,
            body: (result as BlockingHookResult).body ?? mergedBody,
            metadata: { ...mergedMetadata, ...((result as BlockingHookResult).metadata || {}) },
          };
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      log.error("hook.blocking_handler_error", {
        event,
        pluginName: reg.pluginName,
        error: message,
      });
    }
  }
  return { body: mergedBody, metadata: mergedMetadata };
}

// ── Lifecycle wrappers (for chatCore.ts convenience) ──

export interface PluginContext {
  requestId: string;
  body: unknown;
  model: string;
  provider: string;
  apiKeyInfo?: unknown;
  metadata: Record<string, unknown>;
}

export interface PluginResult {
  blocked?: boolean;
  response?: unknown;
  body?: unknown;
  metadata?: Record<string, unknown>;
}

// ── Plugin interface (for loader/manager compatibility) ──

export interface Plugin {
  name: string;
  priority?: number;
  enabled?: boolean;
  onRequest?: (ctx: PluginContext) => Promise<PluginResult | void> | PluginResult | void;
  onResponse?: (ctx: PluginContext, response: unknown) => Promise<unknown | void> | unknown | void;
  onError?: (ctx: PluginContext, error: Error) => Promise<unknown | void> | unknown | void;
  // ── Lifecycle hooks (fire-and-forget, non-blocking) ──
  onInstall?: (payload: unknown) => Promise<void> | void;
  onActivate?: (payload: unknown) => Promise<void> | void;
  onDeactivate?: (payload: unknown) => Promise<void> | void;
  onUninstall?: (payload: unknown) => Promise<void> | void;
}

/**
 * Run onRequest hooks — blocking. Plugins can modify body/metadata or block with 403.
 */
export async function runOnRequest(ctx: PluginContext): Promise<PluginResult> {
  return emitHookBlocking("onRequest", ctx);
}

/**
 * Run onResponse hooks — chains response through plugins. Each plugin can modify the response.
 */
export async function runOnResponse(ctx: PluginContext, response: unknown): Promise<unknown> {
  let currentResponse = response;
  const list = hooks.get("onResponse") || [];
  for (const reg of list) {
    try {
      const result = await reg.handler({ ...ctx, response: currentResponse });
      if (
        result !== undefined &&
        result !== null &&
        typeof result === "object" &&
        "response" in result
      ) {
        currentResponse = (result as { response: unknown }).response;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      log.error("hook.response_handler_error", { pluginName: reg.pluginName, error: message });
    }
  }
  return currentResponse;
}

/**
 * Run onError hooks — fire-and-forget notification.
 */
export async function runOnError(ctx: PluginContext, error: Error): Promise<void> {
  await emitHook("onError", { ...ctx, error });
}

/**
 * Get all registered hooks for an event.
 */
export function getHooks(event: string): HookRegistration[] {
  return hooks.get(event) ?? [];
}

/**
 * Get all events that have registered handlers.
 */
export function getActiveEvents(): string[] {
  return [...hooks.entries()].filter(([, list]) => list.length > 0).map(([event]) => event);
}

/**
 * Reset all hooks and rate limit state (for testing).
 */
export function resetHooks(): void {
  hooks.clear();
  rateLimitMap.clear();
}
