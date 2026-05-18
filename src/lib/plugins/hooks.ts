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

export type HookHandler = (payload: unknown) => void | Promise<void>;

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
] as const;

export type BuiltinEvent = (typeof BUILTIN_EVENTS)[number];

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
 */
export async function emitHook(event: string, payload: unknown): Promise<void> {
  const list = hooks.get(event);
  if (!list || list.length === 0) return;

  for (const reg of list) {
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
 * Reset all hooks (for testing).
 */
export function resetHooks(): void {
  hooks.clear();
}
