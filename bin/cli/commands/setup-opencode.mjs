/**
 * omniroute setup-opencode — Remote-aware OpenCode provider generator
 * (openai-compatible). Distinct from `omniroute setup opencode` (which wires the
 * @omniroute/opencode-plugin). This writes the `omniroute` provider into
 * ~/.config/opencode/opencode.json with every catalog model, so you can run
 * `opencode -m omniroute/<model>`.
 *
 * Reuses the proven server-side generator (config-generator/opencode.ts) for the
 * catalog fetch + merge, then references the API key by env var (never on disk).
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";

const ENV_KEY_REF = "{env:OMNIROUTE_API_KEY}";

/** Resolve baseUrl + (literal) apiKey from flags → active context → localhost. */
export function resolveOpencodeTarget(opts = {}) {
  let baseUrl;
  if (opts.remote) {
    baseUrl = String(opts.remote).replace(/\/+$/, "");
  } else {
    try {
      const c = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      baseUrl = c?.baseUrl;
    } catch {
      /* no context */
    }
    if (!baseUrl) baseUrl = `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }

  let apiKey = opts.apiKey ?? opts["api-key"];
  if (!apiKey) {
    try {
      const c = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      apiKey = c?.accessToken || c?.apiKey;
    } catch {
      /* no context auth */
    }
  }
  if (!apiKey) apiKey = process.env.OMNIROUTE_API_KEY || "";
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}

/**
 * Post-process the generator output: reference the API key by env var (keep the
 * secret off disk) and optionally keep only models whose id matches `only`.
 * Pure + testable. Returns the final JSON string.
 *
 * @param {string} rawJson  output of generateOpencodeConfig
 * @param {{ only?: string[] }} [opts]
 * @returns {{ json: string, modelCount: number }}
 */
export function postProcessOpencodeConfig(rawJson, opts = {}) {
  const config = JSON.parse(rawJson);
  const prov = config.provider?.omniroute;
  if (prov?.options) prov.options.apiKey = ENV_KEY_REF;

  if (opts.only && opts.only.length && prov?.models) {
    const kept = {};
    for (const [id, entry] of Object.entries(prov.models)) {
      if (opts.only.some((f) => id.includes(f))) kept[id] = entry;
    }
    prov.models = kept;
  }
  const modelCount = prov?.models ? Object.keys(prov.models).length : 0;
  return { json: JSON.stringify(config, null, 2) + "\n", modelCount };
}

export async function runSetupOpencodeCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveOpencodeTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const only = opts.only ? opts.only.split(",").map((s) => s.trim()).filter(Boolean) : null;

  printHeading("OmniRoute → OpenCode provider (openai-compatible)");
  printInfo(`Connecting to ${baseUrl} …`);

  // Deferred import: opencode.ts is TypeScript; tsx is registered by
  // bin/omniroute.mjs before any command runs, so importing here is safe.
  let raw;
  try {
    const { generateOpencodeConfig } = await import(
      "../../../src/lib/cli-helper/config-generator/opencode.ts"
    );
    raw = await generateOpencodeConfig({ baseUrl, apiKey, model: opts.model, providerId: "omniroute" });
  } catch (err) {
    printError(`Failed to generate opencode.json: ${err?.message || err}`);
    printInfo("Make sure OmniRoute is running and --remote/--api-key are correct.");
    return 1;
  }

  const { json, modelCount } = postProcessOpencodeConfig(raw, { only });
  const configDir = join(os.homedir(), ".config", "opencode");
  const configPath = join(configDir, "opencode.json");

  if (dryRun) {
    console.log(json.length > 4000 ? json.slice(0, 4000) + "\n… (truncated)" : json);
    printInfo(`[dry-run] ${modelCount} model(s) under provider 'omniroute' → ${configPath}`);
    return 0;
  }

  if (!existsSync(configDir)) mkdirSync(configDir, { recursive: true });
  writeFileSync(configPath, json, "utf8");
  printSuccess(`opencode.json updated at ${configPath} (${modelCount} models under 'omniroute')`);
  printInfo('Use it:  opencode -m omniroute/<model> "..."   (export OMNIROUTE_API_KEY first)');
  return 0;
}

export function registerSetupOpencode(program) {
  program
    .command("setup-opencode")
    .description(
      "Generate the OmniRoute openai-compatible provider in ~/.config/opencode/opencode.json " +
        "from the live model catalog (local or remote VPS)"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Set the default top-level model (omniroute/<id>)")
    .option("--only <patterns>", "Comma-separated substrings — keep only matching model IDs")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const code = await runSetupOpencodeCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
