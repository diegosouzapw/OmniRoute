/**
 * omniroute setup-gemini — point the Gemini CLI at OmniRoute's Gemini endpoint.
 *
 * The Gemini CLI is NOT OpenAI-compatible — it speaks the native Gemini API.
 * OmniRoute exposes a Gemini-native surface at /v1beta (e.g.
 * /v1beta/models/<model>:generateContent), so the CLI can target it via the
 * @google/genai SDK env `GOOGLE_GEMINI_BASE_URL` (ROOT — the SDK appends /v1beta)
 * + `GEMINI_API_KEY`. There is no settings.json key for the base URL, so this is
 * primarily an env recipe; we optionally write ~/.gemini/settings.json `model`.
 *
 * ⚠ Known Gemini CLI caveat: it may ignore GOOGLE_GEMINI_BASE_URL if a cached
 * Google login exists — run `gemini` logged-out / API-key-only for it to take.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError, createPrompt } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

function stripToRoot(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1beta") ? s.slice(0, -7) : s.endsWith("/v1") ? s.slice(0, -3) : s;
}

/** Resolve GOOGLE_GEMINI_BASE_URL (ROOT — SDK appends /v1beta) + apiKey. */
export function resolveGeminiTarget(opts = {}) {
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
  return { baseUrl: root, apiKey };
}

/** The guaranteed env recipe (pure → testable). */
export function buildGeminiRecipe({ baseUrl, model }) {
  return [
    `export GOOGLE_GEMINI_BASE_URL=${baseUrl}`,
    "export GEMINI_API_KEY=$OMNIROUTE_API_KEY",
    `export GEMINI_MODEL=${model}`,
    `gemini -p "reply OK"      # or: gemini  (interactive)`,
  ].join("\n");
}

/** Merge the model into ~/.gemini/settings.json (base URL is env-only). */
export function buildGeminiSettings(existing, { model }) {
  const s = existing && typeof existing === "object" ? { ...existing } : {};
  if (model) s.model = model;
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

async function fetchGeminiModelIds(baseUrl, apiKey) {
  try {
    const res = await fetch(`${baseUrl}/v1beta/models`, {
      headers: { "x-goog-api-key": apiKey || "" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const body = await res.json();
    return (body.models || []).map((m) => String(m.name || "").replace(/^models\//, "")).filter(Boolean);
  } catch {
    return [];
  }
}

export async function runSetupGeminiCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveGeminiTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const configPath = opts.configPath ?? opts["config-path"] ?? join(os.homedir(), ".gemini", "settings.json");

  printHeading("OmniRoute → Gemini CLI (native Gemini /v1beta endpoint)");
  printInfo(`GOOGLE_GEMINI_BASE_URL: ${baseUrl}   (root — SDK appends /v1beta)`);

  let model = opts.model;
  if (!model) {
    const ids = await fetchGeminiModelIds(baseUrl, apiKey);
    if (ids.length && !opts.yes) {
      printInfo(`Examples: ${ids.slice(0, 20).join(", ")}${ids.length > 20 ? " …" : ""}`);
      const prompt = createPrompt();
      try {
        model = await prompt.ask("Model id for Gemini CLI");
      } finally {
        prompt.close();
      }
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id>.");
    return 2;
  }

  if (dryRun) {
    console.log(`\n── [dry-run] ${configPath} ── { "model": "${model}" }`);
  } else {
    const merged = buildGeminiSettings(readJson(configPath), { model });
    mkdirSync(join(configPath, ".."), { recursive: true });
    writeFileSync(configPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
    printSuccess(`Wrote ${configPath} (model)`);
  }

  printInfo("\nThe base URL is env-only for Gemini CLI — export these:");
  console.log(buildGeminiRecipe({ baseUrl, model }));
  printInfo("\n⚠  If Gemini CLI ignores the base URL, you have a cached Google login —");
  printInfo("   run logged-out (API-key only) so GOOGLE_GEMINI_BASE_URL takes effect.");
  return 0;
}

export function registerSetupGemini(program) {
  program
    .command("setup-gemini")
    .description("Point the Gemini CLI at OmniRoute's native Gemini /v1beta endpoint (env recipe + settings model)")
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Model id for Gemini CLI (required unless picked interactively)")
    .option("--config-path <path>", "settings.json path (default: ~/.gemini/settings.json)")
    .option("--yes", "Non-interactive: do not prompt (requires --model)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const code = await runSetupGeminiCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
