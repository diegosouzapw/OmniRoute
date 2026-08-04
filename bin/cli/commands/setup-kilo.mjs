/**
 * omniroute setup-kilo — configure Kilo Code to use OmniRoute.
 *
 * Kilo Code (kilocode.kilo-code, a Cline/Roo descendant) has two surfaces:
 *   - CLI/standalone mode reads ~/.local/share/kilo/auth.json.
 *   - The VS Code extension reads `kilocode.*` keys from VS Code settings.json.
 * This writes BOTH (matching the OmniRoute dashboard) and prints the UI settings.
 *
 * Unlike Cline, Kilo's openAi baseURL INCLUDES /v1 (it appends /chat/completions).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError, createPrompt } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

/** Ensure the URL ends with /v1 (Kilo appends /chat/completions to it). */
function ensureV1(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s : `${s}/v1`;
}

/** Resolve baseUrl (WITH /v1) + apiKey from flags → active context → localhost. */
export function resolveKiloTarget(opts = {}) {
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

/** Merge the OmniRoute openai-compatible provider into Kilo's CLI auth.json. */
export function buildKiloAuth(existing, { apiKey, baseUrl, model }) {
  const auth = { ...(existing || {}) };
  auth["openai-compatible"] = {
    ...(auth["openai-compatible"] || {}),
    apiKey: apiKey || "sk_omniroute",
    baseUrl,
    model,
  };
  return auth;
}

/** Merge the kilocode.* keys into VS Code settings.json (extension surface). */
export function buildKiloVscodeSettings(existing, { apiKey, baseUrl, model }) {
  const s = { ...(existing || {}) };
  s["kilocode.customProvider"] = { name: "OmniRoute", baseURL: baseUrl, apiKey: apiKey || "sk_omniroute" };
  s["kilocode.defaultModel"] = model;
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

async function fetchModelIds(root, apiKey) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${root.replace(/\/v1$/, "")}/v1/models`, {
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

export async function runSetupKiloCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveKiloTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const authPath = opts.authPath ?? opts["auth-path"] ?? join(os.homedir(), ".local", "share", "kilo", "auth.json");
  const vscodePath =
    opts.vscodeSettings ?? opts["vscode-settings"] ?? join(os.homedir(), ".config", "Code", "User", "settings.json");

  printHeading("OmniRoute → Kilo Code (OpenAI-compatible)");
  printInfo(`Server: ${baseUrl}`);

  let model = opts.model;
  if (!model) {
    const ids = await fetchModelIds(baseUrl, apiKey);
    if (ids.length && !opts.yes) {
      printInfo(`Examples: ${ids.slice(0, 20).join(", ")}${ids.length > 20 ? " …" : ""}`);
      const prompt = createPrompt();
      try {
        model = await prompt.ask("Model id for Kilo");
      } finally {
        prompt.close();
      }
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id> (Kilo's extension has no model auto-discovery).");
    return 2;
  }

  const auth = buildKiloAuth(readJson(authPath), { apiKey, baseUrl, model });
  // Only touch VS Code settings.json if it already exists (avoid creating a
  // bogus one for users who don't use that VS Code variant).
  const vscodeExists = existsSync(vscodePath);
  const vscodeSettings = vscodeExists
    ? buildKiloVscodeSettings(readJson(vscodePath), { apiKey, baseUrl, model })
    : null;

  if (dryRun) {
    console.log(`\n── [dry-run] ${authPath} ──`);
    console.log(
      JSON.stringify(
        { "openai-compatible": { ...auth["openai-compatible"], apiKey: apiKey ? "set" : "sk_omniroute" } },
        null,
        2
      )
    );
    console.log(`\n── [dry-run] ${vscodePath} ── ${vscodeExists ? "(would merge kilocode.* keys)" : "(skipped — file absent)"}`);
  } else {
    mkdirSync(join(authPath, ".."), { recursive: true });
    writeFileSync(authPath, JSON.stringify(auth, null, 2) + "\n", "utf8");
    printSuccess(`Wrote ${authPath}`);
    if (vscodeSettings) {
      writeFileSync(vscodePath, JSON.stringify(vscodeSettings, null, 2) + "\n", "utf8");
      printSuccess(`Updated ${vscodePath} (kilocode.customProvider + defaultModel)`);
    } else {
      printInfo(`Skipped VS Code settings (${vscodePath} not found).`);
    }
  }

  printInfo("\nFor the Kilo Code VS Code extension, set Settings → Providers → OpenAI Compatible:");
  printInfo(`  Base URL:  ${baseUrl}        (Kilo expects /v1)`);
  printInfo(`  API Key:   <your OMNIROUTE_API_KEY>`);
  printInfo(`  Model:     ${model}`);
  return 0;
}

export function registerSetupKilo(program) {
  program
    .command("setup-kilo")
    .description(
      "Configure Kilo Code for OmniRoute: write ~/.local/share/kilo/auth.json (CLI) + VS Code kilocode.* settings"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Model id for Kilo (required unless picked interactively)")
    .option("--auth-path <path>", "Kilo CLI auth.json path (default: ~/.local/share/kilo/auth.json)")
    .option("--vscode-settings <path>", "VS Code settings.json (default: ~/.config/Code/User/settings.json)")
    .option("--yes", "Non-interactive: do not prompt (requires --model)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const code = await runSetupKiloCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
