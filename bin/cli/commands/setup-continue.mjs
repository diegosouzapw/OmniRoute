/**
 * omniroute setup-continue — configure Continue (continue.dev) for OmniRoute.
 *
 * Continue uses a file-based, mergeable ~/.continue/config.yaml shared by the VS
 * Code / JetBrains extensions AND the `cn` CLI. Models use `provider: openai`
 * with a custom `apiBase` (WITH /v1 — Continue appends /chat/completions) and an
 * `apiKey: ${{ secrets.OMNIROUTE_API_KEY }}` reference (secret never written to
 * config.yaml). Remote-aware; curated model set with Continue roles.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";
import { categoriseModel } from "./setup-codex.mjs";

const SECRET_REF = "${{ secrets.OMNIROUTE_API_KEY }}";

function ensureV1(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s : `${s}/v1`;
}

/** Resolve apiBase (WITH /v1) + apiKey from flags → active context → localhost. */
export function resolveContinueTarget(opts = {}) {
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
  return { apiBase: ensureV1(root), apiKey };
}

/** Build Continue model entries (provider: openai) for the given catalog ids. */
export function buildContinueModels(modelIds, apiBase) {
  const out = [];
  for (const id of modelIds) {
    const cfg = categoriseModel(id);
    if (!cfg) continue;
    const roles = ["chat", "edit", "apply"];
    if (cfg.effort === "low") roles.push("autocomplete"); // fast tier → autocomplete
    out.push({
      name: `OmniRoute: ${id}`,
      provider: "openai",
      model: id,
      apiBase,
      apiKey: SECRET_REF,
      roles,
    });
  }
  return out;
}

/**
 * Merge OmniRoute models into an existing Continue config object: drop any prior
 * models pointing at this apiBase, keep everything else, append the new set.
 */
export function mergeContinueConfig(existing, newModels, apiBase) {
  const cfg = existing && typeof existing === "object" ? { ...existing } : {};
  const prior = Array.isArray(cfg.models) ? cfg.models : [];
  const kept = prior.filter((m) => !m || m.apiBase !== apiBase);
  cfg.models = [...kept, ...newModels];
  if (!cfg.name) cfg.name = "OmniRoute Config";
  if (!cfg.version) cfg.version = "1.0";
  if (!cfg.schema) cfg.schema = "v1";
  return cfg;
}

async function fetchModelIds(apiBase, apiKey) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${apiBase.replace(/\/v1$/, "")}/v1/models`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    const list = Array.isArray(body) ? body : body.data ?? body.models ?? [];
    return list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  } catch (e) {
    throw new Error(`Could not fetch models: ${e.message}`);
  }
}

export async function runSetupContinueCommand(opts = {}) {
  const { apiBase, apiKey } = resolveContinueTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const only = opts.only ? opts.only.split(",").map((s) => s.trim()).filter(Boolean) : null;
  const configPath = opts.configPath ?? opts["config-path"] ?? join(os.homedir(), ".continue", "config.yaml");

  printHeading("OmniRoute → Continue (config.yaml)");
  printInfo(`apiBase: ${apiBase}`);

  let ids;
  try {
    ids = await fetchModelIds(apiBase, apiKey);
  } catch (e) {
    printError(e.message);
    printInfo("Make sure OmniRoute is running and --remote/--api-key are correct.");
    return 1;
  }
  if (only) ids = ids.filter((id) => only.some((f) => id.includes(f)));

  const models = buildContinueModels(ids, apiBase);
  if (!models.length) {
    printError("No matching curated models in the catalog (try --only or check the server).");
    return 1;
  }

  const yaml = await import("js-yaml");
  let existing = {};
  if (existsSync(configPath)) {
    try {
      existing = yaml.load(readFileSync(configPath, "utf8")) || {};
    } catch {
      printInfo("Existing config.yaml unparseable — starting fresh (a .bak is kept).");
      if (!dryRun) writeFileSync(`${configPath}.bak`, readFileSync(configPath));
      existing = {};
    }
  }
  const merged = mergeContinueConfig(existing, models, apiBase);
  const out = yaml.dump(merged, { lineWidth: -1 });

  if (dryRun) {
    console.log("\n" + (out.length > 3500 ? out.slice(0, 3500) + "\n… (truncated)" : out));
    printInfo(`[dry-run] ${models.length} OmniRoute model(s) → ${configPath}`);
    return 0;
  }

  mkdirSync(join(configPath, ".."), { recursive: true });
  writeFileSync(configPath, out, "utf8");
  printSuccess(`Wrote ${configPath} (${models.length} OmniRoute models)`);
  printInfo("\nProvide the key (config.yaml references it, not stores it):");
  printInfo("  cn CLI:  export OMNIROUTE_API_KEY=...   (read from your shell)");
  printInfo("  IDE:     echo 'OMNIROUTE_API_KEY=...' >> ~/.continue/.env");
  printInfo("Run:  cn -p \"reply OK\"");
  return 0;
}

export function registerSetupContinue(program) {
  program
    .command("setup-continue")
    .description(
      "Generate ~/.continue/config.yaml (Continue / cn CLI) from the OmniRoute model catalog"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--only <patterns>", "Comma-separated substrings — keep only matching model IDs")
    .option("--config-path <path>", "config.yaml path (default: ~/.continue/config.yaml)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const code = await runSetupContinueCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
