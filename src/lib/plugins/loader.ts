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
import { writeFile, rm, readFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID, createHash } from "crypto";
import { logger } from "../../../open-sse/utils/logger.ts";
import type { PluginManifestWithDefaults, Permission } from "./manifest";
import type { Plugin, PluginContext, PluginResult } from "./index";

const log = logger("PLUGIN_LOADER");

const DEFAULT_HOOK_TIMEOUT = 10_000;
const SIGKILL_GRACE_MS = 3_000;

/**
 * Compute a `sha256-<base64>` integrity hash of the given source string.
 * Matches the SRI (Subresource Integrity) format: `sha256-<base64>`.
 */
export function computeIntegrity(source: string): string {
  const hash = createHash("sha256").update(source, "utf-8").digest("base64");
  return `sha256-${hash}`;
}

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
  // Integrity check: if the manifest declares an integrity field, verify the entry point.
  // Missing integrity is OK for backward compatibility; mismatched integrity is a fatal error.
  const integrityField = (manifest as unknown as Record<string, unknown>).integrity;
  if (typeof integrityField === "string" && integrityField.length > 0) {
    let source: string;
    try {
      source = await readFile(entryPoint, "utf-8");
    } catch (err: unknown) {
      throw new Error(
        `Plugin '${manifest.name}' integrity check failed: cannot read entry point — ${err instanceof Error ? err.message : String(err)}`
      );
    }
    const actual = computeIntegrity(source);
    if (actual !== integrityField) {
      throw new Error(
        `Plugin '${manifest.name}' integrity mismatch: expected ${integrityField}, got ${actual}`
      );
    }
  }

  const permissions = manifest.requires.permissions;

  // IMPORTANT-6: Write the host script with O_EXCL (wx flag) so the open fails if
  // anything already exists at that path, defeating symlink/pre-create races (TOCTOU).
  // mode 0o600 ensures no other OS user can read or replace the script.
  // On EEXIST collision (astronomically unlikely with UUID but theoretically possible),
  // retry once with a fresh UUID.
  let hostScriptPath: string;
  {
    // .mjs extension forces ESM execution regardless of package.json type field
    const tryWrite = async (id: string): Promise<string> => {
      const p = join(tmpdir(), `omniroute-plugin-host-${id}.mjs`);
      await writeFile(p, PLUGIN_HOST_SCRIPT, { encoding: "utf-8", mode: 0o600, flag: "wx" });
      return p;
    };
    try {
      hostScriptPath = await tryWrite(randomUUID());
    } catch (err: unknown) {
      // EEXIST on a UUID path is a collision — retry once with a fresh UUID.
      if (err instanceof Error && (err as NodeJS.ErrnoException).code === "EEXIST") {
        hostScriptPath = await tryWrite(randomUUID());
      } else {
        throw err;
      }
    }
  }

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

  // Build Plugin interface — only register hooks declared in the manifest.
  const plugin: Plugin = {
    name: manifest.name,
    priority: 100,
    enabled: true,
  };

  const registeredHooks: string[] = [];

  if (manifest.hooks.onRequest) {
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
    registeredHooks.push("onRequest");
  }

  if (manifest.hooks.onResponse) {
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
    registeredHooks.push("onResponse");
  }

  if (manifest.hooks.onError) {
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
    registeredHooks.push("onError");
  }
  // ── Lifecycle hooks (fire-and-forget, errors logged but don't block) ──
  const lifecycleHooks: Array<{
    key: "onInstall" | "onActivate" | "onDeactivate" | "onUninstall";
    manifestFlag: boolean;
  }> = [
    { key: "onInstall", manifestFlag: manifest.hooks.onInstall },
    { key: "onActivate", manifestFlag: manifest.hooks.onActivate },
    { key: "onDeactivate", manifestFlag: manifest.hooks.onDeactivate },
    { key: "onUninstall", manifestFlag: manifest.hooks.onUninstall },
  ];

  for (const { key, manifestFlag } of lifecycleHooks) {
    if (manifestFlag) {
      plugin[key] = async (payload: unknown): Promise<void> => {
        try {
          await callHook(key, payload);
        } catch (err: unknown) {
          log.error(`plugin.${key}_error`, {
            name: manifest.name,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      };
      registeredHooks.push(key);
    }
  }

  log.info("loader.loaded", {
    name: manifest.name,
    hooks: registeredHooks,
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
