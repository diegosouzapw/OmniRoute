/**
 * Plugin Worker Thread — runs plugins in isolated Worker threads.
 *
 * Receives messages from the main thread:
 * - { type: "load", entryPoint, permissions, name } → load plugin, send back hooks
 * - { type: "call", hook, payload, response?, error? } → call hook, send back result
 * - { type: "cleanup" } → terminate gracefully
 *
 * @module plugins/pluginWorker
 */

import { parentPort, workerData } from "worker_threads";
import { readFile, readdir, stat, writeFile, mkdir, rm } from "fs/promises";
import { resolve } from "path";
import * as vm from "vm";

if (!parentPort) {
  throw new Error("pluginWorker must be run as a Worker thread");
}

const port = parentPort;

interface LoadMessage {
  type: "load";
  entryPoint: string;
  permissions: string[];
  name: string;
}

interface CallMessage {
  type: "call";
  hook: string;
  payload: unknown;
  response?: unknown;
  error?: string;
}

interface CleanupMessage {
  type: "cleanup" | "exit" | "terminate";
}

type WorkerMessage = LoadMessage | CallMessage | CleanupMessage;

/**
 * createSandbox — capability-gated object passed to vm.createContext().
 *
 * TRUST MODEL: vm is NOT a security boundary (shares the worker's V8 heap;
 * prototype-chain escapes are possible). Plugin execution is safe only because:
 *   1. /api/plugins/ is classified LOCAL_ONLY in routeGuard — loopback enforced
 *      before any auth check (Hard Rules #15/#17).
 *   2. The `exec` permission additionally requires OMNIROUTE_PLUGINS_ALLOW_EXEC=1
 *      (opt-in, default OFF) — child_process is never wired silently.
 * Treat plugins as local-operator-trusted code, not sandboxed untrusted code.
 */
function createSandbox(permissions: string[], pluginDir: string): Record<string, unknown> {
  const activeTimers = new Set<ReturnType<typeof setTimeout>>();

  const sandbox: Record<string, unknown> = {
    console: {
      log: (...args: unknown[]) => port.postMessage({ type: "log", level: "info", args }),
      warn: (...args: unknown[]) => port.postMessage({ type: "log", level: "warn", args }),
      error: (...args: unknown[]) => port.postMessage({ type: "log", level: "error", args }),
    },
    setTimeout: (fn: (...args: unknown[]) => void, ms?: number) => { const t = setTimeout(fn, ms); activeTimers.add(t); return t; },
    clearTimeout: (t: unknown) => { activeTimers.delete(t as ReturnType<typeof setTimeout>); clearTimeout(t as ReturnType<typeof setTimeout>); },
    setInterval: (fn: (...args: unknown[]) => void, ms?: number) => { const t = setInterval(fn, ms); activeTimers.add(t); return t; },
    clearInterval: (t: unknown) => { activeTimers.delete(t as ReturnType<typeof setInterval>); clearInterval(t as ReturnType<typeof setInterval>); },
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
    URL,
    URLSearchParams,
  };

  if (permissions.includes("file-read") || permissions.includes("file-write")) {
    sandbox.Buffer = Buffer;
  }

  if (permissions.includes("network")) {
    sandbox.fetch = globalThis.fetch;
    sandbox.AbortController = globalThis.AbortController;
    sandbox.Headers = globalThis.Headers;
    sandbox.Request = globalThis.Request;
    sandbox.Response = globalThis.Response;
  }

  if (permissions.includes("file-read")) {
    sandbox.fs = {
      readFile: (p: string, enc?: string) => readFile(resolve(pluginDir, p), enc as BufferEncoding),
      readdir: (p: string) => readdir(resolve(pluginDir, p)),
      stat: (p: string) => stat(resolve(pluginDir, p)),
    };
  }

  if (permissions.includes("file-write")) {
    const fs = sandbox.fs as Record<string, unknown> || {};
    fs.writeFile = (p: string, data: string) => writeFile(resolve(pluginDir, p), data);
    fs.mkdir = (p: string) => mkdir(resolve(pluginDir, p), { recursive: true });
    fs.rm = (p: string) => rm(resolve(pluginDir, p), { recursive: true, force: true });
    sandbox.fs = fs;
  }

  if (permissions.includes("env")) {
    sandbox.process = { env: new Proxy({}, {
      get: (_t, key) => typeof key === "string" ? process.env[key] : undefined,
      set: () => false,
      has: (_t, key) => typeof key === "string" ? key in process.env : false,
    }) };
  }

  if (permissions.includes("exec")) {
    if (process.env.OMNIROUTE_PLUGINS_ALLOW_EXEC !== "1") {
      throw new Error(
        `Plugin '${name}' requested the 'exec' permission, which is disabled. Set OMNIROUTE_PLUGINS_ALLOW_EXEC=1 to enable (local operator only).`
      );
    }
    sandbox.child_process = {
      exec: require("child_process").exec,
      execSync: require("child_process").execSync,
    };
  }

  sandbox.__activeTimers = activeTimers;
  return sandbox;
}

let context: vm.Context | null = null;
let pluginExports: Record<string, unknown> | null = null;
let activeTimers: Set<ReturnType<typeof setTimeout>> | null = null;

async function loadPlugin(entryPoint: string, permissions: string[], name: string): Promise<string[]> {
  const pluginDir = resolve(entryPoint, "..");
  const sandbox = createSandbox(permissions, pluginDir);
  context = vm.createContext(sandbox);
  activeTimers = sandbox.__activeTimers as Set<ReturnType<typeof setTimeout>>;

  const moduleExports: Record<string, unknown> = {};
  const moduleObj = { exports: moduleExports };
  sandbox.module = moduleObj;
  sandbox.exports = moduleExports;
  sandbox.require = (id: string) => {
    const allowed: Record<string, unknown> = {};
    if (id === "crypto") allowed.crypto = require("crypto");
    if (allowed[id]) return allowed[id];
    throw new Error(`Module '${id}' is not allowed in plugin sandbox`);
  };

  const source = await readFile(entryPoint, "utf-8");
  const wrapped = `(async function(module, exports, require) { ${source} })(module, exports, require);`;
  vm.runInContext(wrapped, context, { filename: entryPoint, timeout: 10000 });

  pluginExports = moduleObj.exports;

  const hooks: string[] = [];
  const sources = [pluginExports];
  if (pluginExports.default && typeof pluginExports.default === "object") {
    sources.push(pluginExports.default as Record<string, unknown>);
  }

  for (const src of sources) {
    if (typeof src.onRequest === "function" && !hooks.includes("onRequest")) hooks.push("onRequest");
    if (typeof src.onResponse === "function" && !hooks.includes("onResponse")) hooks.push("onResponse");
    if (typeof src.onError === "function" && !hooks.includes("onError")) hooks.push("onError");
  }

  return hooks;
}

function callHook(hook: string, payload: unknown, extra?: { response?: unknown; error?: string }): unknown {
  if (!context || !pluginExports) throw new Error("Plugin not loaded");

  const sources = [pluginExports];
  if (pluginExports.default && typeof pluginExports.default === "object") {
    sources.push(pluginExports.default as Record<string, unknown>);
  }

  for (const src of sources) {
    const fn = src[hook];
    if (typeof fn === "function") {
      if (hook === "onResponse" && extra?.response !== undefined) {
        return fn(payload, extra.response);
      }
      if (hook === "onError" && extra?.error !== undefined) {
        return fn(payload, new Error(extra.error));
      }
      return fn(payload);
    }
  }

  throw new Error(`Hook '${hook}' not found in plugin exports`);
}

function cleanup(): void {
  if (activeTimers) {
    for (const t of activeTimers) {
      clearTimeout(t);
      clearInterval(t);
    }
    activeTimers.clear();
  }
  context = null;
  pluginExports = null;
  activeTimers = null;
}

port.on("message", async (msg: WorkerMessage) => {
  try {
    if (msg.type === "load") {
      const hooks = await loadPlugin(msg.entryPoint, msg.permissions, msg.name);
      port.postMessage({ type: "loaded", hooks });
    } else if (msg.type === "call") {
      const result = callHook(msg.hook, msg.payload, { response: (msg as CallMessage).response, error: (msg as CallMessage).error });
      port.postMessage({ type: "result", value: result });
    } else if (msg.type === "cleanup" || msg.type === "exit" || msg.type === "terminate") {
      cleanup();
      port.postMessage({ type: "cleaned" });
      process.exit(0);
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    port.postMessage({ type: "error", error: errMsg, hook: (msg as CallMessage).hook });
  }
});

port.postMessage({ type: "ready" });
