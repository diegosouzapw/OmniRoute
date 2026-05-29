/**
 * Plugin/Middleware Architecture — Re-export shim.
 *
 * Canonical registry is hooks.ts. This file re-exports for backward
 * compatibility with existing imports from "./index".
 *
 * @module lib/plugins
 */

import type {
  PluginContext,
  PluginResult,
  BlockingHookResult,
  HookHandler,
  HookRegistration,
} from "./hooks.ts";

export {
  registerHook as registerPlugin,
  unregisterHooks as unregisterPlugin,
  emitHook,
  emitHookBlocking,
  resetHooks as resetPlugins,
  runOnRequest,
  runOnResponse,
  runOnError,
  getHooks,
  getActiveEvents,
} from "./hooks.ts";

// Re-export types
export type { PluginContext, PluginResult, BlockingHookResult, HookHandler, HookRegistration };

// Legacy Plugin interface — loader.ts and manager.ts import this
export interface Plugin {
  name: string;
  priority?: number;
  enabled?: boolean;
  onRequest?: (ctx: PluginContext) => Promise<PluginResult | void> | PluginResult | void;
  onResponse?: (ctx: PluginContext, response: any) => Promise<any | void> | any | void;
  onError?: (ctx: PluginContext, error: Error) => Promise<any | void> | any | void;
}

// Legacy shim functions
export function setPluginEnabled(_name: string, _enabled: boolean): boolean {
  return true;
}

export function listPlugins(): Array<{
  name: string;
  priority: number;
  enabled: boolean;
  hooks: string[];
}> {
  return [];
}
