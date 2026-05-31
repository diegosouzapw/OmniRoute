/**
 * Plugin loader — loads plugins in isolated child processes.
 *
 * Uses a child Node.js process with IPC for process-level isolation. Each plugin
 * runs in a separate Node.js process with restricted environment.
 * Complies with Rule 3 (no eval/new Function/implied eval).
 *
 * @module plugins/loader
 */

import { spawn } from "child_process";
import { writeFile, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import { logger } from "../../../open-sse/utils/logger.ts";
import type { PluginManifestWithDefaults, Permission } from "./manifest";
import type { Plugin, PluginContext, PluginResult } from "./index";

const log = logger("PLUGIN_LOADER");

const DEFAULT_HOOK_TIMEOUT = 10_000;
const SIGKILL_GRACE_MS = 3_000;

export interface LoadedPlugin {
  name: string;
  manifest: PluginManifestWithDefaults;
  plugin: Plugin;
  cleanup: () => void;
}

// ── Plugin host script (runs in child process over IPC) ──
// Uses process.send()/process.on("message") — NOT worker_threads.
// Written as .mjs to force ESM execution regardless of package.json.

const PLUGIN_HOST_SCRIPT = `
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const pluginPath = process.argv[2];
const plugin = await import(pluginPath);
const exports = plugin.default || plugin;

// Send ready signal
process.send({ type: "ready", hooks: Object.keys(exports).filter(k => typeof exports[k] === "function") });

// Handle messages from parent
process.on("message", async (msg) => {
  if (msg.type === "call") {
    try {
      const handler = exports[msg.hook];
      if (typeof handler !== "function") {
        process.send({ type: "result", id: msg.id, error: "Hook not found" });
        return;
      }
      const result = await handler(msg.payload);
      process.send({ type: "result", id: msg.id, result });
    } catch (err) {
      process.send({ type: "result", id: msg.id, error: err.message });
    }
  }
});
`;

/**
 * Load a plugin in an isolated child process.
 * Returns the plugin interface with hooks that communicate via IPC.
 */
export async function loadPlugin(
  entryPoint: string,
  manifest: PluginManifestWithDefaults
): Promise<LoadedPlugin> {
  const permissions = manifest.requires.permissions;
  const hostId = randomUUID();
  // .mjs extension forces ESM execution
  const hostScriptPath = join(tmpdir(), `omniroute-plugin-host-${hostId}.mjs`);

  await writeFile(hostScriptPath, PLUGIN_HOST_SCRIPT, "utf-8");

  const env: Record<string, string> = {
    ...getFilteredEnv(permissions),
    PLUGIN_ENTRY: entryPoint,
    PLUGIN_NAME: manifest.name,
  };

  const child = spawn(process.execPath, ["--no-warnings", hostScriptPath, entryPoint], {
    env,
    stdio: ["ignore", "ignore", "ignore", "ipc"],
  });

  // Track pending calls with timeout support
  const pendingCalls: Map<
    string,
    {
      resolve: (value: unknown) => void;
      reject: (reason: Error) => void;
      timer: ReturnType<typeof setTimeout>;
    }
  > = new Map();
  let callCounter = 0;

  child.on(
    "message",
    (msg: { type: string; id?: string; hooks?: string[]; result?: unknown; error?: string }) => {
      if (msg.type === "ready") {
        log.info("loader.process_ready", { name: manifest.name, hooks: msg.hooks });
      } else if (msg.type === "result" && msg.id) {
        const pending = pendingCalls.get(msg.id);
        if (pending) {
          clearTimeout(pending.timer);
          pendingCalls.delete(msg.id);
          if (msg.error) {
            pending.reject(new Error(msg.error));
          } else {
            pending.resolve(msg.result);
          }
        }
      }
    }
  );

  child.on("error", (err) => {
    log.error("loader.process_error", { name: manifest.name, error: err.message });
  });

  child.on("exit", (code) => {
    log.info("loader.process_exit", { name: manifest.name, code });
    for (const [, pending] of pendingCalls) {
      clearTimeout(pending.timer);
      pending.reject(new Error(`Plugin process exited with code ${code}`));
    }
    pendingCalls.clear();
    rm(hostScriptPath, { force: true }).catch(() => {});
  });

  // Call a hook in the child process with timeout + SIGTERM + SIGKILL escalation
  const callHook = (
    hook: string,
    payload: unknown,
    timeout = DEFAULT_HOOK_TIMEOUT
  ): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      const id = String(++callCounter);
      const timer = setTimeout(() => {
        pendingCalls.delete(id);
        child.kill("SIGTERM");
        // Escalate to SIGKILL if plugin ignores SIGTERM
        const killTimer = setTimeout(() => {
          try {
            child.kill("SIGKILL");
          } catch {}
        }, SIGKILL_GRACE_MS);
        child.once("exit", () => clearTimeout(killTimer));
        reject(new Error(`Plugin hook '${hook}' timed out after ${timeout}ms`));
      }, timeout);

      pendingCalls.set(id, { resolve, reject, timer });
      child.send({ type: "call", id, hook, payload });
    });
  };

  // Build Plugin interface
  const plugin: Plugin = {
    name: manifest.name,
    priority: 100,
    enabled: true,
  };

  plugin.onRequest = async (ctx: PluginContext): Promise<PluginResult | void> => {
    try {
      const result = await callHook("onRequest", ctx);
      return result as PluginResult | void;
    } catch (err: unknown) {
      log.error("plugin.onRequest_error", {
        name: manifest.name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  plugin.onResponse = async (ctx: PluginContext, response: unknown): Promise<unknown | void> => {
    try {
      return await callHook("onResponse", { ctx, response });
    } catch (err: unknown) {
      log.error("plugin.onResponse_error", {
        name: manifest.name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  plugin.onError = async (ctx: PluginContext, error: Error): Promise<unknown | void> => {
    try {
      return await callHook("onError", { ctx, error: error.message });
    } catch (err: unknown) {
      log.error("plugin.onError_error", {
        name: manifest.name,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  log.info("loader.loaded", {
    name: manifest.name,
    hooks: ["onRequest", "onResponse", "onError"],
    pid: child.pid,
  });

  const cleanup = () => {
    child.kill("SIGTERM");
    // Escalate to SIGKILL after grace period
    const killTimer = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {}
    }, SIGKILL_GRACE_MS);
    child.once("exit", () => clearTimeout(killTimer));
    rm(hostScriptPath, { force: true }).catch(() => {});
    log.info("loader.cleanup", { name: manifest.name });
  };

  return { name: manifest.name, manifest, plugin, cleanup };
}

/**
 * Filter environment variables based on permissions.
 * Uses allowlist approach — only pass explicitly safe vars.
 */
function getFilteredEnv(permissions: Permission[]): Record<string, string> {
  const safeKeys = ["PATH", "HOME", "USER", "LANG", "LC_ALL", "NODE_ENV"];
  const extendedSafeKeys = [...safeKeys, "PORT", "HOSTNAME", "TZ", "TMPDIR"];
  const allowedKeys = permissions.includes("env") ? extendedSafeKeys : safeKeys;
  const env: Record<string, string> = {};

  for (const key of allowedKeys) {
    if (process.env[key] !== undefined) env[key] = process.env[key]!;
  }

  return env;
}
