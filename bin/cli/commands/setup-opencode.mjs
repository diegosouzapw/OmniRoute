/**
 * omniroute setup-opencode — Remote-aware OpenCode provider generator
 * (openai-compatible). Distinct from `omniroute setup opencode` (which wires the
 * @omniroute/opencode-plugin). This writes the `omniroute` provider into
 * the active OpenCode JSON/JSONC config with every catalog model, so you can run
 * `opencode -m omniroute/<model>`.
 *
 * Reuses the proven server-side generator (config-generator/opencode.ts) for the
 * catalog fetch + merge, then references the API key by env var (never on disk).
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname } from "node:path";
import { applyEdits, modify, parse, printParseErrorCode } from "jsonc-parser";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";
import { guardHostConfigTarget } from "../utils/config-home-guard.mjs";

const ENV_KEY_REF = "{env:OMNIROUTE_API_KEY}";
const JSON_FORMATTING_OPTIONS = { insertSpaces: true, tabSize: 2 };

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
    if (!baseUrl)
      baseUrl = `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }

  // Precedence: explicit --api-key flag > OMNIROUTE_API_KEY env var > active
  // context's management token. A context's accessToken/apiKey is a CLI
  // management credential (oma_live_...) with no /v1/* inference scope — it
  // must never silently outrank a real inference key the caller supplied
  // either as a flag or via the ambient env var (mirrors the explicit >
  // ambient-env > context precedence documented in bin/cli/api.mjs's
  // buildHeaders()). Only fall back to the context token when neither an
  // explicit flag nor the env var is set.
  let apiKey = opts.apiKey ?? opts["api-key"];
  if (!apiKey) apiKey = process.env.OMNIROUTE_API_KEY || "";
  if (!apiKey) {
    try {
      const c = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      apiKey = c?.accessToken || c?.apiKey || "";
    } catch {
      /* no context auth */
    }
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}

/**
 * Post-process the generator output: reference the API key by env var (keep the
 * secret off disk) and optionally keep only models whose id matches `only`.
 * Pure + testable. Returns the final JSONC string while preserving comments
 * outside the OmniRoute-managed fields.
 *
 * @param {string} rawJson  output of generateOpencodeConfig
 * @param {{ only?: string[] }} [opts]
 * @returns {{ json: string, modelCount: number }}
 */
export function postProcessOpencodeConfig(rawJson, opts = {}) {
  const errors = [];
  const config = parse(rawJson, errors, { allowTrailingComma: true, disallowComments: false });
  if (errors.length > 0 || !config || typeof config !== "object" || Array.isArray(config)) {
    const details = errors
      .map((error) => `${printParseErrorCode(error.error)} at offset ${error.offset}`)
      .join(", ");
    throw new Error(`Failed to parse generated OpenCode config${details ? `: ${details}` : ""}`);
  }

  const prov = config.provider?.omniroute;
  let json = rawJson;
  if (prov?.options) {
    json = applyEdits(
      json,
      modify(json, ["provider", "omniroute", "options", "apiKey"], ENV_KEY_REF, {
        formattingOptions: JSON_FORMATTING_OPTIONS,
      })
    );
  }

  let models = prov?.models;
  if (opts.only && opts.only.length && prov?.models) {
    const kept = {};
    for (const [id, entry] of Object.entries(prov.models)) {
      if (opts.only.some((f) => id.includes(f))) kept[id] = entry;
    }
    models = kept;
    json = applyEdits(
      json,
      modify(json, ["provider", "omniroute", "models"], kept, {
        formattingOptions: JSON_FORMATTING_OPTIONS,
      })
    );
  }
  const modelCount = models ? Object.keys(models).length : 0;
  return { json: json.endsWith("\n") ? json : `${json}\n`, modelCount };
}

export async function runSetupOpencodeCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveOpencodeTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const only = opts.only
    ? opts.only
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;

  printHeading("OmniRoute → OpenCode provider (openai-compatible)");
  printInfo(`Connecting to ${baseUrl} …`);

  // Deferred import: opencode.ts is TypeScript; tsx is registered by
  // bin/omniroute.mjs before any command runs, so importing here is safe.
  let raw;
  let configPath;
  try {
    const { generateOpencodeConfig } =
      await import("../../../src/lib/cli-helper/config-generator/opencode.ts");
    const { resolveOpencodeConfigPath } =
      await import("../../../src/shared/services/opencodeConfigPath.ts");
    configPath = resolveOpencodeConfigPath();

    const guard = await guardHostConfigTarget(configPath, {
      toolLabel: "OpenCode",
      hostCommand: "omniroute setup-opencode",
      allowContainerWrite: Boolean(opts.allowContainerWrite ?? opts["allow-container-write"]),
      dryRun,
    });
    if (guard !== 0) return guard;

    raw = await generateOpencodeConfig({
      baseUrl,
      apiKey,
      model: opts.model,
      providerId: "omniroute",
      configPath,
    });
  } catch (err) {
    printError(`Failed to generate OpenCode config: ${err?.message || err}`);
    printInfo("Make sure OmniRoute is running and --remote/--api-key are correct.");
    return 1;
  }

  const { json, modelCount } = postProcessOpencodeConfig(raw, { only });
  const configDir = dirname(configPath);

  if (dryRun) {
    console.log(json.length > 4000 ? json.slice(0, 4000) + "\n… (truncated)" : json);
    printInfo(`[dry-run] ${modelCount} model(s) under provider 'omniroute' → ${configPath}`);
    return 0;
  }

  if (!existsSync(configDir)) mkdirSync(configDir, { recursive: true });
  writeFileSync(configPath, json, "utf8");
  printSuccess(
    `${basename(configPath)} updated at ${configPath} (${modelCount} models under 'omniroute')`
  );
  printInfo('Use it:  opencode -m omniroute/<model> "..."   (export OMNIROUTE_API_KEY first)');
  return 0;
}

export function registerSetupOpencode(program) {
  program
    .command("setup-opencode")
    .description(
      "Generate the OmniRoute openai-compatible provider in the active OpenCode config " +
        "from the live model catalog (local or remote VPS)"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Set the default top-level model (omniroute/<id>)")
    .option("--only <patterns>", "Comma-separated substrings — keep only matching model IDs")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .option(
      "--allow-container-write",
      "Write even when the target is inside a container and not mounted from the host"
    )
    .action(async (opts, cmd) => {
      // Commander parses the ancestor program's own global --api-key option
      // (bin/cli/program.mjs, bound to .env("OMNIROUTE_API_KEY")) against any
      // occurrence of the flag in argv, so it wins the value even when the
      // user typed --api-key AFTER `setup-opencode` — this local option's own
      // `opts.apiKey` never sees it. cmd.optsWithGlobals() resolves to the
      // correct value either way ("globals overwrite locals" is exactly the
      // outcome we want here, since the global option is where the value
      // always actually lands).
      const resolvedOpts = { ...opts, apiKey: cmd.optsWithGlobals().apiKey ?? opts.apiKey };
      const code = await runSetupOpencodeCommand(resolvedOpts);
      if (code !== 0) process.exit(code);
    });
}
