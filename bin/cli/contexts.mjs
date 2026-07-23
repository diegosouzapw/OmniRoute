import { existsSync, readFileSync, writeFileSync, mkdirSync, chmodSync } from "node:fs";
import { join, dirname } from "node:path";
import { resolveDataDir } from "./data-dir.mjs";

const CONFIG_VERSION = 1;

export function configPath() {
  return join(resolveDataDir(), "config.json");
}

function defaultConfig() {
  return {
    version: CONFIG_VERSION,
    currentContext: "default",
    contexts: {
      default: { baseUrl: `http://localhost:${process.env.PORT || "20128"}`, apiKey: null },
    },
  };
}

export function loadContexts() {
  try {
    if (!existsSync(configPath())) return defaultConfig();
    return JSON.parse(readFileSync(configPath(), "utf8"));
  } catch {
    return defaultConfig();
  }
}

export function saveContexts(cfg) {
  const path = configPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(cfg, null, 2));
  try {
    chmodSync(path, 0o600);
  } catch {}
}

/**
 * Resolve the active context for a CLI invocation.
 *
 * Canonical schema is `{ currentContext, contexts }` (written by
 * `omniroute contexts ...`). For backward compatibility we also read the legacy
 * `{ activeProfile, profiles }` shape and a bare top-level `baseUrl` — older
 * configs and `api.mjs::getBaseUrl` used those before remote-mode unified the
 * store. `overrideName` (from `--context`/`OMNIROUTE_CONTEXT`) wins when set.
 *
 * A context may carry `{ baseUrl, accessToken?, apiKey?, scope?, description? }`.
 * `accessToken` is the scoped CLI access token (preferred); `apiKey` is the
 * legacy inference key kept for back-compat.
 */
export function resolveActiveContext(overrideName) {
  const cfg = loadContexts();
  const contexts = cfg.contexts || cfg.profiles || {};
  const name = overrideName || cfg.currentContext || cfg.activeProfile || "default";
  const found = contexts[name] || contexts.default;
  if (found) return found;
  if (cfg.baseUrl) return { baseUrl: cfg.baseUrl };
  return { baseUrl: `http://localhost:${process.env.PORT || "20128"}` };
}
