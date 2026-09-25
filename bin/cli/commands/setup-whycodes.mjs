/**
 * omniroute setup-whycodes — configure WhyCodes for OmniRoute.
 *
 * WhyCodes is a broad-purpose autonomous CLI agent. Custom OpenAI-compatible
 * providers live in config.toml under `[providers.<name>]` with `base_url`
 * (bare `/v1` is accepted) and `api_key`. The Chat Completions client posts
 * to `{base}/chat/completions`.
 *
 * This writes the WhyCodes side (not OmniRoute):
 *   [providers.omniroute] + optional [default_model]
 *
 * Remote-aware; `--dry-run` prints TOML without writing; the printed recipe
 * never includes the API key value.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError, createPrompt } from "../io.mjs";
import { resolveActiveContext } from "../contexts.mjs";
import { guardHostConfigTarget } from "../utils/config-home-guard.mjs";

const PROVIDER_ID = "omniroute";

function ensureV1(url) {
  const s = String(url || "").replace(/\/+$/, "");
  return s.endsWith("/v1") ? s : `${s}/v1`;
}

function defaultConfigPath() {
  const homeOverride = String(process.env.WHYCODES_HOME || "").trim();
  if (homeOverride) return join(homeOverride, "config.toml");
  if (process.platform === "win32") {
    const appData =
      String(process.env.APPDATA || "").trim() || join(os.homedir(), "AppData", "Roaming");
    return join(appData, "whycorporation", "whycodes", "config.toml");
  }
  if (process.platform === "darwin") {
    return join(
      os.homedir(),
      "Library",
      "Application Support",
      "com.whycorporation.whycodes",
      "config.toml"
    );
  }
  const xdg = String(process.env.XDG_CONFIG_HOME || "").trim();
  return join(xdg || join(os.homedir(), ".config"), "com.whycorporation.whycodes", "config.toml");
}

/** Resolve base_url (WITH /v1) + apiKey from flags → active context → localhost. */
export function resolveWhyCodesTarget(opts = {}) {
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

function tomlString(value) {
  return JSON.stringify(String(value));
}

/** Render the OmniRoute provider + optional default model as TOML (no merge). */
export function buildWhyCodesToml({ baseUrl, model }) {
  const lines = [
    `[providers.${PROVIDER_ID}]`,
    `name = ${tomlString(PROVIDER_ID)}`,
    `base_url = ${tomlString(baseUrl)}`,
    `api_key = ${tomlString("$OMNIROUTE_API_KEY")}`,
  ];
  if (model) {
    lines.push(
      "",
      "[default_model]",
      `provider_id = ${tomlString(PROVIDER_ID)}`,
      `model_id = ${tomlString(model)}`,
      "supports_tools = true"
    );
  }
  return lines.join("\n") + "\n";
}

export function buildWhyCodesCliRecipe({ baseUrl, model }) {
  const lines = [
    `whycodes provider add ${PROVIDER_ID} --api-key "$OMNIROUTE_API_KEY" --base-url ${tomlString(baseUrl)}`,
  ];
  if (model) {
    lines.push(`whycodes model default ${PROVIDER_ID} ${model}`);
  }
  lines.push(
    `whycodes -P ${PROVIDER_ID}${model ? ` -m ${model}` : ""} generate "ping" --format json`
  );
  return lines.join("\n");
}

async function fetchModelIds(host, apiKey) {
  const root = String(host || "").replace(/\/v1\/?$/, "");
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${root}/v1/models`, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const body = await res.json();
    const list = Array.isArray(body) ? body : (body.data ?? body.models ?? []);
    return list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function runSetupWhyCodesCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveWhyCodesTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const configPath = opts.configPath ?? opts["config-path"] ?? defaultConfigPath();

  const guard = await guardHostConfigTarget(configPath, {
    toolLabel: "WhyCodes",
    hostCommand: "omniroute setup-whycodes",
    allowContainerWrite: Boolean(opts.allowContainerWrite ?? opts["allow-container-write"]),
    dryRun,
  });
  if (guard !== 0) return guard;

  printHeading("OmniRoute → WhyCodes (openai-compatible)");
  printInfo(`base_url: ${baseUrl}   (with /v1 — WhyCodes posts /chat/completions)`);

  let model = opts.model;
  if (!model) {
    const ids = await fetchModelIds(baseUrl, apiKey);
    if (ids.length && !opts.yes) {
      printInfo(`Examples: ${ids.slice(0, 20).join(", ")}${ids.length > 20 ? " …" : ""}`);
      const prompt = createPrompt();
      try {
        model = await prompt.ask("Model id for WhyCodes");
      } finally {
        prompt.close();
      }
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id>.");
    return 2;
  }

  const { generateWhyCodesConfig, redactWhyCodesApiKey } =
    await import("../../../src/lib/cli-helper/config-generator/whycodes.ts");
  let out;
  try {
    out = generateWhyCodesConfig({
      baseUrl,
      apiKey: apiKey || "$OMNIROUTE_API_KEY",
      model,
      configPath,
    });
  } catch (err) {
    printError(err instanceof Error ? err.message : String(err));
    return 1;
  }

  const printed = redactWhyCodesApiKey(out);

  if (dryRun) {
    console.log("\n" + printed);
    printInfo(`[dry-run] → ${configPath}`);
  } else {
    mkdirSync(dirname(configPath), { recursive: true });
    writeFileSync(configPath, out, "utf8");
    printSuccess(`Wrote ${configPath}`);
  }

  printInfo("\nEquivalent WhyCodes CLI (API key stays in the env):");
  console.log(buildWhyCodesCliRecipe({ baseUrl, model }));
  printInfo(
    'Then run:  whycodes generate "ping" --format json   (or: omniroute run whycodes --model <id>)'
  );
  return 0;
}

export function registerSetupWhyCodes(program) {
  program
    .command("setup-whycodes")
    .description(
      "Configure WhyCodes for OmniRoute: write config.toml [providers.omniroute] + default model"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--model <id>", "Model id for WhyCodes (required unless picked interactively)")
    .option("--config-path <path>", "config.toml path (default: WhyCodes platform config dir)")
    .option("--yes", "Non-interactive: do not prompt (requires --model)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .option(
      "--allow-container-write",
      "Write even when the target is inside a container and not mounted from the host"
    )
    .action(async (opts) => {
      const code = await runSetupWhyCodesCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
