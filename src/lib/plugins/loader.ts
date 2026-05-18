/**
 * Plugin loader — loads plugins in sandboxed VM contexts.
 *
 * Uses Node.js vm module for in-process isolation. Plugins run in a
 * restricted context with permission-gated globals.
 *
 * @module plugins/loader
 */

import { readFile } from "fs/promises";
import * as vm from "vm";
import { logger } from "../../../open-sse/utils/logger.ts";
import type { PluginManifestWithDefaults, Permission } from "./manifest";
import type { Plugin, PluginContext, PluginResult } from "./index";

const log = logger("PLUGIN_LOADER");

export interface LoadedPlugin {
  name: string;
  manifest: PluginManifestWithDefaults;
  plugin: Plugin;
  cleanup: () => void;
}

/**
 * Create a sandboxed context with permission-gated globals.
 */
function createSandbox(permissions: Permission[]): Record<string, unknown> {
  const sandbox: Record<string, unknown> = {
    console: {
      log: (...args: unknown[]) => log.info("plugin.log", { args }),
      warn: (...args: unknown[]) => log.warn("plugin.warn", { args }),
      error: (...args: unknown[]) => log.error("plugin.error", { args }),
    },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Promise,
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
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    Buffer,
    URL,
    URLSearchParams,
  };

  if (permissions.includes("network")) {
    sandbox.fetch = globalThis.fetch;
    sandbox.AbortController = globalThis.AbortController;
    sandbox.Headers = globalThis.Headers;
    sandbox.Request = globalThis.Request;
    sandbox.Response = globalThis.Response;
  }

  return sandbox;
}

/**
 * Load a plugin entry point in a VM context.
 * Returns the exported hooks (onRequest, onResponse, onError) wrapped as a Plugin.
 */
export async function loadPlugin(
  entryPoint: string,
  manifest: PluginManifestWithDefaults
): Promise<LoadedPlugin> {
  const permissions = manifest.requires.permissions;
  const sandbox = createSandbox(permissions);

  // Read plugin source
  const source = await readFile(entryPoint, "utf-8");

  // Create VM context
  const context = vm.createContext(sandbox);

  // Provide a minimal module system
  const moduleExports: Record<string, any> = {};
  const moduleObj = { exports: moduleExports };
  sandbox.module = moduleObj;
  sandbox.exports = moduleExports;
  sandbox.require = (id: string) => {
    // Only allow specific safe modules
    const allowed: Record<string, unknown> = {};
    if (id === "crypto") {
      allowed.crypto = require("crypto");
    }
    if (allowed[id]) return allowed[id];
    throw new Error(`Module '${id}' is not allowed in plugin sandbox`);
  };

  try {
    // Wrap source in a function to capture exports
    const wrapped = `(async function(module, exports, require) { ${source} })(module, exports, require);`;
    vm.runInContext(wrapped, context, {
      filename: entryPoint,
      timeout: 10000, // 10s init timeout
    });
  } catch (err: any) {
    log.error("loader.vm_error", { name: manifest.name, error: err.message });
    throw new Error(`Failed to load plugin '${manifest.name}': ${err.message}`);
  }

  // Extract exports
  const pluginExports = moduleObj.exports;

  // Build Plugin interface
  const hooks: string[] = [];
  const plugin: Plugin = {
    name: manifest.name,
    priority: 100,
    enabled: true,
  };

  if (typeof pluginExports.onRequest === "function") {
    plugin.onRequest = async (ctx: PluginContext): Promise<PluginResult | void> => {
      try {
        return await pluginExports.onRequest(ctx);
      } catch (err: any) {
        log.error("plugin.onRequest_error", { name: manifest.name, error: err.message });
      }
    };
    hooks.push("onRequest");
  }

  if (typeof pluginExports.onResponse === "function") {
    plugin.onResponse = async (ctx: PluginContext, response: any): Promise<any | void> => {
      try {
        return await pluginExports.onResponse(ctx, response);
      } catch (err: any) {
        log.error("plugin.onResponse_error", { name: manifest.name, error: err.message });
      }
    };
    hooks.push("onResponse");
  }

  if (typeof pluginExports.onError === "function") {
    plugin.onError = async (ctx: PluginContext, error: Error): Promise<any | void> => {
      try {
        return await pluginExports.onError(ctx, error);
      } catch (err: any) {
        log.error("plugin.onError_error", { name: manifest.name, error: err.message });
      }
    };
    hooks.push("onError");
  }

  // Also check for default export
  if (pluginExports.default && typeof pluginExports.default === "object") {
    const def = pluginExports.default;
    if (typeof def.onRequest === "function" && !plugin.onRequest) {
      plugin.onRequest = async (ctx) => {
        try {
          return await def.onRequest(ctx);
        } catch (err: any) {
          log.error("plugin.onRequest_error", { name: manifest.name, error: err.message });
        }
      };
      hooks.push("onRequest");
    }
    if (typeof def.onResponse === "function" && !plugin.onResponse) {
      plugin.onResponse = async (ctx, resp) => {
        try {
          return await def.onResponse(ctx, resp);
        } catch (err: any) {
          log.error("plugin.onResponse_error", { name: manifest.name, error: err.message });
        }
      };
      hooks.push("onResponse");
    }
    if (typeof def.onError === "function" && !plugin.onError) {
      plugin.onError = async (ctx, err) => {
        try {
          return await def.onError(ctx, err);
        } catch (e: any) {
          log.error("plugin.onError_error", { name: manifest.name, error: e.message });
        }
      };
      hooks.push("onError");
    }
  }

  log.info("loader.loaded", { name: manifest.name, hooks });

  const cleanup = () => {
    // VM contexts are GC'd when no references remain
    log.info("loader.cleanup", { name: manifest.name });
  };

  return { name: manifest.name, manifest, plugin, cleanup };
}
