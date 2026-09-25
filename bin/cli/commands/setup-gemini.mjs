/** Configure Google Gemini CLI's native Gemini endpoint for OmniRoute. */

import { existsSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { resolveActiveContext } from "../contexts.mjs";
import { createPrompt, printError, printHeading, printInfo, printSuccess } from "../io.mjs";
import { writePrivateFileAtomic } from "../private-file.mjs";
import { guardHostConfigTarget } from "../utils/config-home-guard.mjs";

const MANAGED_ENV_KEYS = new Set([
  "GEMINI_API_KEY",
  "GEMINI_DEFAULT_AUTH_TYPE",
  "GEMINI_MODEL",
  "GOOGLE_GEMINI_BASE_URL",
  "GOOGLE_GENAI_USE_GCA",
  "GOOGLE_GENAI_USE_VERTEXAI",
]);

function stripGeminiBaseUrl(value) {
  const baseUrl = String(value || "")
    .trim()
    .replace(/\/+$/, "");
  return baseUrl.endsWith("/v1") ? baseUrl.slice(0, -3) : baseUrl;
}

function validateGeminiEndpoint(baseUrl) {
  try {
    const url = new URL(baseUrl);
    if (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash
    )
      return baseUrl;
  } catch {
    // Keep endpoint values out of error messages.
  }
  throw new TypeError(
    "Use an HTTP(S) endpoint without credentials, query parameters or a fragment."
  );
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readSettings(filePath) {
  if (!existsSync(filePath)) return {};
  const parsed = JSON.parse(readFileSync(filePath, "utf8"));
  if (!isRecord(parsed)) throw new Error("Gemini CLI settings.json must contain a JSON object");
  return parsed;
}

function readText(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

function envAssignment(name, value) {
  return `${name}=${JSON.stringify(String(value))}`;
}

/** Resolve the root Gemini endpoint and credential without exposing either in settings JSON. */
export function resolveGeminiTarget(opts = {}) {
  let baseUrl = stripGeminiBaseUrl(opts.remote || opts.baseUrl);
  let context;
  if (!baseUrl || !(opts.apiKey ?? opts["api-key"])) {
    try {
      context = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
    } catch {
      // Contexts are optional for local configuration.
    }
  }
  if (!baseUrl) baseUrl = stripGeminiBaseUrl(context?.baseUrl);
  if (!baseUrl) {
    const port = Number(opts.port ?? process.env.PORT ?? 20128) || 20128;
    baseUrl = `http://localhost:${port}`;
  }

  const apiKey =
    opts.apiKey ??
    opts["api-key"] ??
    context?.accessToken ??
    context?.apiKey ??
    process.env.OMNIROUTE_API_KEY ??
    "omniroute-no-auth";
  return { baseUrl: validateGeminiEndpoint(baseUrl), apiKey };
}

/** Merge only the auth selection and default model, preserving every user-owned setting. */
export function mergeGeminiSettings(existing, model) {
  const next = isRecord(existing) ? { ...existing } : {};
  const security = isRecord(next.security) ? { ...next.security } : {};
  const auth = isRecord(security.auth) ? { ...security.auth } : {};
  auth.selectedType = "gemini-api-key";
  security.auth = auth;
  next.security = security;
  next.model = { ...(isRecord(next.model) ? next.model : {}), name: String(model) };
  return next;
}

/** Replace only variables owned by the OmniRoute Gemini recipe. */
export function mergeGeminiEnv(existing, { baseUrl, apiKey, model }) {
  const lines = String(existing || "")
    .split(/\r?\n/)
    .filter((line) => {
      const match = line.match(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=/);
      return !match || !MANAGED_ENV_KEYS.has(match[1]);
    });
  while (lines.at(-1) === "") lines.pop();
  lines.push(
    envAssignment("GEMINI_API_KEY", apiKey),
    envAssignment("GOOGLE_GEMINI_BASE_URL", baseUrl),
    envAssignment("GEMINI_MODEL", model),
    envAssignment("GEMINI_DEFAULT_AUTH_TYPE", "gemini-api-key"),
    envAssignment("GOOGLE_GENAI_USE_VERTEXAI", "false"),
    envAssignment("GOOGLE_GENAI_USE_GCA", "false")
  );
  return `${lines.join("\n")}\n`;
}

export async function runSetupGeminiCommand(opts = {}) {
  let target;
  try {
    target = resolveGeminiTarget(opts);
  } catch {
    printError("Use an HTTP(S) endpoint without credentials, query parameters or a fragment.");
    return 2;
  }
  const { baseUrl, apiKey } = target;
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const geminiHome = opts.geminiHome ?? opts["gemini-home"] ?? process.env.GEMINI_CLI_HOME;
  const userHome = geminiHome || os.homedir();
  const settingsPath =
    opts.settingsPath ?? opts["settings-path"] ?? path.join(userHome, ".gemini", "settings.json");
  const envPath = opts.envPath ?? opts["env-path"] ?? path.join(path.dirname(settingsPath), ".env");

  printHeading("OmniRoute → Google Gemini CLI (native Gemini API)");
  printInfo(`GOOGLE_GEMINI_BASE_URL: ${baseUrl}`);

  for (const target of [settingsPath, envPath]) {
    const guard = await guardHostConfigTarget(target, {
      toolLabel: "Google Gemini CLI",
      hostCommand: "omniroute setup-gemini",
      allowContainerWrite: Boolean(opts.allowContainerWrite ?? opts["allow-container-write"]),
      dryRun,
    });
    if (guard !== 0) return guard;
  }

  let model = String(opts.model || "").trim();
  if (!model && !opts.yes) {
    const prompt = createPrompt();
    try {
      model = String(await prompt.ask("Model id for Gemini CLI")).trim();
    } finally {
      prompt.close();
    }
  }
  if (!model) {
    printError("A model is required. Pass --model <id>.");
    return 2;
  }

  try {
    const settingsText = `${JSON.stringify(mergeGeminiSettings(readSettings(settingsPath), model), null, 2)}\n`;
    const envText = mergeGeminiEnv(readText(envPath), { baseUrl, apiKey, model });
    if (dryRun) {
      printInfo(`[dry-run] settings → ${settingsPath}`);
      printInfo(`[dry-run] credential and endpoint → ${envPath} (values redacted)`);
      return 0;
    }

    writePrivateFileAtomic(envPath, envText);
    writePrivateFileAtomic(settingsPath, settingsText);
    printSuccess(`Wrote ${settingsPath}`);
    printSuccess(`Updated ${envPath} (private Gemini environment)`);
    printInfo('Run: gemini   (or headless: gemini -p "reply OK")');
    return 0;
  } catch {
    printError(
      "Failed to configure Gemini CLI. Check that the settings contain a valid JSON object and the target files are accessible."
    );
    return 1;
  }
}

export function registerSetupGemini(program) {
  program
    .command("setup-gemini")
    .description("Configure Google Gemini CLI's native endpoint for OmniRoute")
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL")
    .option("--context <name>", "Named local/remote context")
    .option("--api-key <key>", "OmniRoute API key")
    .option("--model <id>", "Default model id for Gemini CLI")
    .option("--gemini-home <dir>", "Gemini CLI home root (default: GEMINI_CLI_HOME or ~)")
    .option("--settings-path <path>", "Gemini CLI settings.json path")
    .option("--env-path <path>", "Gemini CLI .env path")
    .option("--yes", "Non-interactive; requires --model")
    .option("--dry-run", "Preview target files without writing values or secrets")
    .option(
      "--allow-container-write",
      "Write even when the target is inside a container and not mounted from the host"
    )
    .action(async (opts) => {
      const code = await runSetupGeminiCommand(opts);
      if (code !== 0) process.exitCode = code;
    });
}
