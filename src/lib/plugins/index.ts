/**
 * Plugin/Middleware Architecture — L-8
 *
 * Pre/post hooks on the request pipeline. Plugins are registered
 * with a priority (lower = runs first) and can intercept requests
 * before they reach the chat handler or modify responses after.
 *
 * Lifecycle:
 *   onRequest  → runs BEFORE chat handler (can block/modify request)
 *   onResponse → runs AFTER  chat handler (can modify/log response)
 *   onError    → runs on handler errors (can recover or re-throw)
 *
 * @module lib/plugins
 *
 * @deprecated Import from "./hooks.ts" or "./sdk.ts" directly.
 * This module re-exports from hooks.ts for backward compatibility.
 */

// Re-export types from hooks.ts (canonical source)
export type {
  PluginContext,
  PluginResult,
  Plugin,
  BlockingHookResult,
  HookHandler,
  HookRegistration,
} from "./hooks.ts";

// Re-export execution functions from hooks.ts
export {
  runOnRequest,
  runOnResponse,
  runOnError,
  resetHooks as resetPlugins,
  registerHook as registerPlugin,
  unregisterHooks as unregisterPluginList,
  getHooks as listPlugins,
} from "./hooks.ts";

// Re-export SDK utilities
export { definePlugin, blockRequest, modifyBody, addMetadata } from "./sdk.ts";
