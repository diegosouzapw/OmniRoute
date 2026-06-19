/**
 * omniroute setup-qwen — configure Qwen Code (QwenLM/qwen-code) for OmniRoute.
 *
 * Qwen Code is a terminal AI agent (gemini-cli fork) with a file-based config at
 * ~/.qwen/settings.json. For a custom OpenAI-compatible endpoint it uses a
 * `modelProviders` entry with authType "openai", baseUrl WITH /v1, and an
 * `envKey` naming the env var holding the key (secret stays in the env, never the
 * file). Remote-aware; headless test via `qwen -p "..."`.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError, createPrompt } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

function ensureV1(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s : `${s}/v1`;
}

/** Resolve baseUrl (WITH /v1) + apiKey from flags → active context → localhost. */
export function resolveQwenTarget(opts = {}) {
  let root;
  if (opts.remote) root = String(opts.remote).replace(/\/+$/, "");
  else {
    try {
      root = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT)?.baseUrl;
    } catch {
      /* none */
    }
    if (!root) root = `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }
  let apiKey = opts.apiKey ?? opts["api-key"];
  if (!apiKey) {
    try {
      const c = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      apiKey = c?.accessToken || c?.apiKey;
    } catch {
      /* none */
    }
  }
  if (!apiKey) apiKey = process.env.OMNIROUTE_API_KEY || "";
  return { baseUrl: ensureV1(root), apiKey };
}

/** Merge the OmniRoute modelProvider into Qwen's settings.json (preserve rest). */
export function buildQwenSettings(existing, { baseUrl, model }) {
  const s = existing && typeof existing === "object" ? { ...existing } : {};
  const providers = Array.isArray(s.modelProviders) ? s.modelProviders.filter((p) => p?.id !== "omniroute") : [];
  providers.push({
    id: "omniroute",
    name: "OmniRoute",
    authType: "openai",
    baseUrl,
    envKey: "OMNIROUTE_API_KEY",
  });
  s.modelProviders = providers;
  if (model) {
    s.selectedProvider = "omniroute";
    s.model = model;
  }
  return s;
}

function readJson(path) {
  try {
    if (existsSync(path)) return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    /* corrupt/missing */
  }
  return {};
}

async function fetchModelIds(baseUrl, apiKey) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${baseUrl.replace(/\/v1$/, "")}/v1/models`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const body = await res.json();
    const list = Array.isArray(body) ? body : body.data ?? body.models ?? [];
    return list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function runSetupQwenCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveQwenTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const configPath = opts.configPath ?? opts["config-path"] ?? join(os.homedir(), ".qwen", "settings.json");

  printHeading("OmniRoute → Qwen Code (openai-compatible)");
  printInfo(`baseUrl: ${baseUrl}`);

  let model = opts.model;
  if (!model) {
    const ids = await fetchModelIds(baseUrl, apiKey);
    if (ids.length && !opts.yes) {
      printInfo(`Examples: ${ids.slice(0, 20).join(", ")}${ids.length > 20 ? " …" : ""}`);
      const prompt = createPrompt();
      try {
        model = await prompt.ask("Model id for Qwen");
      } finally {
        prompt.close();
      }
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id>.");
    return 2;
  }

  const merged = buildQwenSettings(readJson(configPath), { baseUrl, model });
  const out = JSON.stringify(merged, null, 2) + "\n";

  if (dryRun) {
    console.log("\n" + out);
    printInfo(`[dry-run] → ${configPath}`);
  } else {
    mkdirSync(join(configPath, ".."), { recursive: true });
    writeFileSync(configPath, out, "utf8");
    printSuccess(`Wrote ${configPath}`);
  }
  printInfo("\nProvide the key (settings reference OMNIROUTE_API_KEY):  export OMNIROUTE_API_KEY=...");
  printInfo('Then run:  qwen        (or headless: qwen -p "reply OK")');
  return 0;
}

export function registerSetupQwen(program) {
  program
    .command("setup-qwen")
    .description("Configure Qwen Code for OmniRoute: write ~/.qwen/settings.json (openai modelProvider)")
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Model id for Qwen (required unless picked interactively)")
    .option("--config-path <path>", "settings.json path (default: ~/.qwen/settings.json)")
    .option("--yes", "Non-interactive: do not prompt (requires --model)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const code = await runSetupQwenCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
