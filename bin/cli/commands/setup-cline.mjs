/**
 * omniroute setup-cline — configure the Cline AI coding agent to use OmniRoute.
 *
 * Cline's VS Code extension keeps its config in VS Code's opaque globalStorage
 * (not file-writable). Its CLI/standalone mode reads ~/.cline/data/. This command
 * writes the CLI-mode files (matching the OmniRoute dashboard) AND prints the
 * Base URL / model to paste into the VS Code extension UI.
 *
 * Cline uses the OpenAI-compatible provider: openAiBaseUrl is the ROOT URL
 * (no /v1 — Cline appends /v1/chat/completions). Plan + Act modes are set to the
 * same provider/model. The key goes in secrets.json (Cline has no env ref).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError, createPrompt } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

function stripToRoot(url) {
  let s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s.slice(0, -3) : s;
}

/** Resolve baseUrl (ROOT, no /v1) + apiKey from flags → active context → localhost. */
export function resolveClineTarget(opts = {}) {
  let baseUrl;
  if (opts.remote) baseUrl = stripToRoot(opts.remote);
  else {
    try {
      baseUrl = stripToRoot(resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT)?.baseUrl);
    } catch {
      /* none */
    }
    if (!baseUrl) baseUrl = `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
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
  return { baseUrl, apiKey };
}

/** Merge OmniRoute openai-compatible settings into Cline's globalState (Plan + Act). */
export function buildClineGlobalState(existing, { baseUrl, model }) {
  const gs = { ...(existing || {}) };
  gs.actModeApiProvider = "openai";
  gs.planModeApiProvider = "openai";
  gs.openAiBaseUrl = baseUrl; // ROOT — Cline appends /v1/chat/completions
  if (model) {
    gs.openAiModelId = model;
    gs.planModeOpenAiModelId = model;
  }
  return gs;
}

/** Merge the API key into Cline's secrets (Cline has no env-var reference). */
export function buildClineSecrets(existing, { apiKey }) {
  return { ...(existing || {}), openAiApiKey: apiKey || "sk_omniroute" };
}

function readJson(path) {
  try {
    if (existsSync(path)) return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    /* corrupt/missing → start fresh */
  }
  return {};
}

async function fetchModelIds(baseUrl, apiKey) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${baseUrl}/v1/models`, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const body = await res.json();
    const list = Array.isArray(body) ? body : body.data ?? body.models ?? [];
    return list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function runSetupClineCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveClineTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const clineDir = opts.clineDir ?? opts["cline-dir"] ?? join(os.homedir(), ".cline", "data");

  printHeading("OmniRoute → Cline (OpenAI-compatible)");
  printInfo(`Server: ${baseUrl}`);

  // Resolve the model (Cline needs one explicit id — no auto-discovery).
  let model = opts.model;
  if (!model) {
    const ids = await fetchModelIds(baseUrl, apiKey);
    if (ids.length && !opts.yes) {
      printInfo(`Examples: ${ids.slice(0, 20).join(", ")}${ids.length > 20 ? " …" : ""}`);
      const prompt = createPrompt();
      try {
        model = await prompt.ask("Model id for Cline");
      } finally {
        prompt.close();
      }
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id> (Cline has no model auto-discovery).");
    return 2;
  }

  const gsPath = join(clineDir, "globalState.json");
  const secPath = join(clineDir, "secrets.json");
  const globalState = buildClineGlobalState(readJson(gsPath), { baseUrl, model });
  const secrets = buildClineSecrets(readJson(secPath), { apiKey });

  if (dryRun) {
    console.log(`\n── [dry-run] ${gsPath} ──`);
    console.log(JSON.stringify({ actModeApiProvider: globalState.actModeApiProvider, planModeApiProvider: globalState.planModeApiProvider, openAiBaseUrl: globalState.openAiBaseUrl, openAiModelId: globalState.openAiModelId }, null, 2));
    console.log(`\n── [dry-run] ${secPath} ── (openAiApiKey: ${apiKey ? "set" : "sk_omniroute"})`);
  } else {
    if (!existsSync(clineDir)) mkdirSync(clineDir, { recursive: true });
    writeFileSync(gsPath, JSON.stringify(globalState, null, 2) + "\n", "utf8");
    writeFileSync(secPath, JSON.stringify(secrets, null, 2) + "\n", "utf8");
    printSuccess(`Wrote ${gsPath}`);
    printSuccess(`Wrote ${secPath}`);
  }

  // The VS Code extension uses opaque globalStorage — can't be file-written.
  printInfo("\nFor the Cline VS Code extension, set these in its Settings → API (OpenAI Compatible):");
  printInfo(`  Base URL:  ${baseUrl}        (NOT /v1 — Cline appends it)`);
  printInfo(`  API Key:   <your OMNIROUTE_API_KEY>`);
  printInfo(`  Model:     ${model}`);
  return 0;
}

export function registerSetupCline(program) {
  program
    .command("setup-cline")
    .description(
      "Configure Cline for OmniRoute: write ~/.cline/data (CLI mode) + print VS Code extension settings"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Model id for Cline (required unless picked interactively)")
    .option("--cline-dir <dir>", "Cline data dir (default: ~/.cline/data)")
    .option("--yes", "Non-interactive: do not prompt (requires --model)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const code = await runSetupClineCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
