/**
 * Plugin SDK — typed API for plugin developers.
 *
 * Provides `definePlugin()` factory and re-exports all types needed
 * to build OmniRoute plugins.
 *
 * @module plugins/sdk
 */

import type {
  Plugin,
  PluginContext,
  PluginResult,
  BlockingHookResult,
} from "./hooks.ts";

export type { Plugin, PluginContext, PluginResult, BlockingHookResult };

// ── Plugin Definition Helper ──

export interface PluginDefinition {
  /** Plugin name (kebab-case) */
  name: string;
  /** Priority (lower = runs first, default 100) */
  priority?: number;
  /** Start enabled? (default true) */
  enabled?: boolean;
  /** Hook: runs before chat handler. Can block or modify request. */
  onRequest?: (ctx: PluginContext) => Promise<PluginResult | void> | PluginResult | void;
  /** Hook: runs after chat handler. Can modify response. */
  onResponse?: (ctx: PluginContext, response: unknown) => Promise<unknown | void> | unknown | void;
  /** Hook: runs on handler error. Can recover or re-throw. */
  onError?: (ctx: PluginContext, error: Error) => Promise<unknown | void> | unknown | void;
}

/**
 * Define an OmniRoute plugin with type safety.
 *
 * @example
 * ```ts
 * import { definePlugin } from "omniroute/plugins/sdk";
 *
 * export default definePlugin({
 *   name: "my-plugin",
 *   priority: 50,
 *   onRequest: async (ctx) => {
 *     console.log(`Request ${ctx.requestId} for ${ctx.model}`);
 *   },
 *   onResponse: async (ctx, response) => {
 *     console.log(`Response for ${ctx.requestId}`);
 *     return response;
 *   },
 * });
 * ```
 */
export function definePlugin(def: PluginDefinition): Plugin {
  return {
    name: def.name,
    priority: def.priority ?? 100,
    enabled: def.enabled ?? true,
    onRequest: def.onRequest,
    onResponse: def.onResponse,
    onError: def.onError,
  };
}

// ── Utility Helpers ──

/**
 * Block a request with a 403 response.
 */
export function blockRequest(response?: unknown): PluginResult {
  return { blocked: true, response };
}

/**
 * Modify the request body.
 */
export function modifyBody(body: unknown): PluginResult {
  return { body };
}

/**
 * Add metadata to the request context.
 */
export function addMetadata(metadata: Record<string, unknown>): PluginResult {
  return { metadata };
}
