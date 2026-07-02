/**
 * omniroute setup-aider — configure Aider (aider.chat) for OmniRoute.
 *
 * Aider (LiteLLM under the hood) talks to an OpenAI-compatible endpoint via env
 * `OPENAI_API_BASE` (ROOT url — LiteLLM appends /v1/chat/completions) + the model
 * flag `--model openai/<model>`. This writes ~/.aider.conf.yml (openai-api-base +
 * model) — the key stays in OPENAI_API_KEY (env, never the file) — and prints the
 * guaranteed env recipe + headless command. Remote-aware.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError, createPrompt } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

function stripToRoot(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s.slice(0, -3) : s;
}

/** Resolve OPENAI_API_BASE (ROOT, no /v1 — LiteLLM appends) + apiKey. */
export function resolveAiderTarget(opts = {}) {
  let root;
  if (opts.remote) root = stripToRoot(opts.remote);
  else {
    try {
      root = stripToRoot(resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT)?.baseUrl);
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
  return { apiBase: root, apiKey };
}

/** Merge openai-api-base + model into an .aider.conf.yml object (preserve rest). */
export function buildAiderConfig(existing, { apiBase, model }) {
  const cfg = existing && typeof existing === "object" ? { ...existing } : {};
  cfg["openai-api-base"] = apiBase;
  if (model) cfg.model = `openai/${model}`;
  return cfg;
}

/** The guaranteed env + run recipe (pure → testable). */
export function buildAiderRecipe({ apiBase, model }) {
  return [
    `export OPENAI_API_BASE=${apiBase}`,
    "export OPENAI_API_KEY=$OMNIROUTE_API_KEY",
    `aider --model openai/${model}`,
    `# headless:  aider --model openai/${model} --message "reply OK" --yes`,
  ].join("\n");
}

function readYamlSafe(yaml, path) {
  try {
    if (existsSync(path)) return yaml.load(readFileSync(path, "utf8")) || {};
  } catch {
    /* corrupt/missing */
  }
  return {};
}

async function fetchModelIds(apiBase, apiKey) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${apiBase}/v1/models`, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const body = await res.json();
    const list = Array.isArray(body) ? body : body.data ?? body.models ?? [];
    return list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function runSetupAiderCommand(opts = {}) {
  const { apiBase, apiKey } = resolveAiderTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const configPath = opts.configPath ?? opts["config-path"] ?? join(os.homedir(), ".aider.conf.yml");

  printHeading("OmniRoute → Aider (openai-compatible via LiteLLM)");
  printInfo(`OPENAI_API_BASE: ${apiBase}   (no /v1 — LiteLLM appends it)`);

  let model = opts.model;
  if (!model) {
    const ids = await fetchModelIds(apiBase, apiKey);
    if (ids.length && !opts.yes) {
      printInfo(`Examples: ${ids.slice(0, 20).join(", ")}${ids.length > 20 ? " …" : ""}`);
      const prompt = createPrompt();
      try {
        model = await prompt.ask("Model id for Aider (without the openai/ prefix)");
      } finally {
        prompt.close();
      }
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id> (the openai/ prefix is added automatically).");
    return 2;
  }

  const yaml = await import("js-yaml");
  const merged = buildAiderConfig(readYamlSafe(yaml, configPath), { apiBase, model });
  const out = yaml.dump(merged, { lineWidth: -1 });

  if (dryRun) {
    console.log("\n" + out);
    printInfo(`[dry-run] → ${configPath}`);
  } else {
    mkdirSync(join(configPath, ".."), { recursive: true });
    writeFileSync(configPath, out, "utf8");
    printSuccess(`Wrote ${configPath}`);
  }
  printInfo("\nProvide the key + run (the key stays in the env, never the file):");
  console.log(buildAiderRecipe({ apiBase, model }));
  return 0;
}

export function registerSetupAider(program) {
  program
    .command("setup-aider")
    .description("Configure Aider for OmniRoute: write ~/.aider.conf.yml + print the env recipe")
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Model id (the openai/ prefix is added automatically)")
    .option("--config-path <path>", ".aider.conf.yml path (default: ~/.aider.conf.yml)")
    .option("--yes", "Non-interactive: do not prompt (requires --model)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const code = await runSetupAiderCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
