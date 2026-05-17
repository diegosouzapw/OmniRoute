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

export function resolveActiveContext(overrideName) {
  const cfg = loadContexts();
  const name = overrideName || cfg.currentContext || "default";
  return cfg.contexts?.[name] || cfg.contexts?.default || { baseUrl: "http://localhost:20128" };
}
