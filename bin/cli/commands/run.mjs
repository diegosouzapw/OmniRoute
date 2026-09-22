import {
  runLaunchCommand as runLaunchClaudeCommand,
  buildClaudeEnv,
  resolveClaudeSpawn,
  quoteClaudeArgs,
  resolveLaunchTarget,
} from "./launch.mjs";
import {
  buildCodexEnv,
  buildCodexProviderArgs,
  resolveCodexSpawn,
  quoteCodexArgs,
  resolveCodexTarget,
  runLaunchCodexCommand as runLaunchCodexCommand,
} from "./launch-codex.mjs";
import { t } from "../i18n.mjs";
import os from "node:os";
import { join } from "node:path";
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolveActiveContext } from "../contexts.mjs";
import { quoteShellArgs } from "../utils/winShellArgs.mjs";
import {
  listManifestTargets,
  manifestModelArgs,
  manifestRequiresModel,
  resolveManifestTarget,
} from "../cli-manifest.mjs";

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function toAuthSource(targetOpts) {
  const explicit =
    !isBlank(targetOpts.token) || !isBlank(targetOpts.apiKey) || !isBlank(targetOpts["api-key"]);
  if (explicit) return "option";

  const envName = String(targetOpts.apiKeyEnv || targetOpts["api-key-env"] || "").trim();
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(envName) && !isBlank(process.env[envName])) {
    return "env";
  }

  try {
    const context = resolveActiveContext(targetOpts.context || process.env.OMNIROUTE_CONTEXT);
    if (context && (context.accessToken || context.apiKey)) return "context";
  } catch {
    // no active context
  }

  if (!isBlank(process.env.OMNIROUTE_API_KEY)) return "env";
  if (!isBlank(process.env.ANTHROPIC_AUTH_TOKEN)) return "env";
  return "none";
}

/** Resolve a token option without ever printing its value in a plan. */
function resolveAuthTokenOption(targetOpts = {}) {
  const direct = targetOpts.token || targetOpts.apiKey || targetOpts["api-key"];
  if (!isBlank(direct)) return direct;

  const envName = String(targetOpts.apiKeyEnv || targetOpts["api-key-env"] || "").trim();
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(envName)) return process.env[envName];
  return undefined;
}

/** Resolve supported target (id or alias) to canonical id via the manifest. */
export function resolveRunTarget(target) {
  return resolveManifestTarget(target, "run");
}

export function listRunTargets() {
  return listManifestTargets("run");
}

/**
 * Normalize `--provider` + `--model` into one model id.
 *
 * - when model contains a slash, keep it as-is
 * - when provider exists and model does not, prefix provider/
 */
export function resolveModelFromTargetOptions(targetOpts = {}) {
  const provider = String(targetOpts.provider || "").trim();
  const model = String(targetOpts.model || "").trim();
  if (!model) return "";
  if (provider && !model.includes("/")) return `${provider}/${model}`;
  return model;
}

function describeCommand(command, shellMode) {
  return `${command}${shellMode ? " [shell]" : ""}`;
}

function envPreview(before = {}, after = {}) {
  const beforeKeys = new Set(Object.keys(before));
  const changedOrAdded = [];
  const removed = [];

  for (const key of Object.keys(after)) {
    if (!beforeKeys.has(key) || String(before[key]) !== String(after[key])) {
      changedOrAdded.push(key);
    }
  }

  for (const key of Object.keys(before)) {
    if (!(key in after)) removed.push(key);
  }

  return {
    changedOrAdded,
    removed,
  };
}

async function buildClaudePlan(rawOpts, args = []) {
  const model = resolveModelFromTargetOptions(rawOpts);
  const merged = {
    ...rawOpts,
    model,
    apiKey: resolveAuthTokenOption(rawOpts),
    token: resolveAuthTokenOption(rawOpts),
    profile: rawOpts.profile ?? rawOpts.p,
  };

  const { baseUrl, authToken } = resolveLaunchTarget(merged);
  const commandSpec = await resolveClaudeSpawn(process.platform);

  const configDir = merged.profile
    ? join(merged.claudeHome || join(os.homedir(), ".claude"), "profiles", merged.profile)
    : undefined;

  const env = buildClaudeEnv(process.env, baseUrl, authToken, {
    configDir,
    model: merged.model || undefined,
  });
  const quotedArgs = quoteClaudeArgs(args, process.platform);

  return {
    target: "claude",
    baseUrl,
    command: commandSpec.command,
    shell: commandSpec.shell,
    args: quotedArgs,
    model: merged.model || undefined,
    envDiff: envPreview(process.env, env),
    authSource: toAuthSource(rawOpts),
    commandDisplay: describeCommand(commandSpec.command, commandSpec.shell),
  };
}

async function buildCodexPlan(rawOpts, args = []) {
  const model = resolveModelFromTargetOptions(rawOpts);
  const merged = {
    ...rawOpts,
    apiKey: resolveAuthTokenOption(rawOpts),
    model,
    profile: rawOpts.profile ?? rawOpts.p,
  };

  const { baseUrl, authToken } = resolveCodexTarget(merged);
  const commandSpec = await resolveCodexSpawn(process.platform);

  const providerArgs = buildCodexProviderArgs(baseUrl, merged.model || undefined);
  const profileArgs = merged.profile ? ["--profile", merged.profile] : [];

  const env = buildCodexEnv(process.env, authToken);
  const fullArgs = [...providerArgs, ...profileArgs, ...args];
  const quotedArgs = quoteCodexArgs(fullArgs, process.platform);

  return {
    target: "codex",
    baseUrl,
    command: commandSpec.command,
    shell: commandSpec.shell,
    args: quotedArgs,
    model: merged.model || undefined,
    envDiff: envPreview(process.env, env),
    authSource: toAuthSource(rawOpts),
    commandDisplay: describeCommand(commandSpec.command, commandSpec.shell),
    providerArgs,
    profileArgs,
  };
}

const NO_AUTH_SENTINEL = "omniroute-no-auth";

function resolveGenericSpawn(command) {
  if (process.platform !== "win32") return { command, shell: undefined };

  try {
    const output = execFileSync("where.exe", [command], {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
      timeout: 3000,
      windowsHide: true,
    });
    const matches = output
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);
    const preferred = matches.find((value) => /\.exe$/i.test(value));
    if (preferred) return { command: preferred, shell: undefined };
    const shim = matches.find((value) => /\.(?:cmd|bat)$/i.test(value));
    if (shim) return { command: shim, shell: true };
  } catch {
    // Fall through to the conventional npm shim.
  }

  return { command: `${command}.cmd`, shell: true };
}

function genericEnv(baseEnv, kind, baseUrl, authToken, model) {
  const env = { ...baseEnv };
  for (const key of Object.keys(env)) {
    if (kind === "aider" && /^(OPENAI_API_KEY|OPENAI_API_BASE|OPENAI_BASE_URL)$/.test(key)) {
      delete env[key];
    }
    if (
      kind === "goose" &&
      (/^(OPENAI_API_KEY|OPENAI_API_BASE|OPENAI_BASE_URL)$/.test(key) || key.startsWith("GOOSE_"))
    ) {
      delete env[key];
    }
    if (kind === "opencode" && key === "OPENCODE_CONFIG_CONTENT") delete env[key];
    if (kind === "qwen" && (key === "QWEN_HOME" || key === "OMNIROUTE_API_KEY")) {
      delete env[key];
    }
    if (
      kind === "omp" &&
      (key === "OMNIROUTE_API_KEY" ||
        key.startsWith("XDG_") ||
        key.startsWith("OPENAI_") ||
        key.startsWith("ANTHROPIC_"))
    ) {
      delete env[key];
    }
    if (
      kind === "gemini" &&
      /^(GOOGLE_GEMINI_BASE_URL|GEMINI_API_KEY|GOOGLE_API_KEY|GEMINI_CLI_HOME|GEMINI_DEFAULT_AUTH_TYPE|GOOGLE_GENAI_USE_VERTEXAI|GOOGLE_GENAI_USE_GCA)$/.test(
        key
      )
    ) {
      delete env[key];
    }
  }

  const token = (authToken && String(authToken).trim()) || NO_AUTH_SENTINEL;
  if (kind === "aider") {
    env.OPENAI_API_BASE = baseUrl;
    env.OPENAI_API_KEY = token;
  } else if (kind === "goose") {
    env.GOOSE_PROVIDER = "openai";
    env.OPENAI_HOST = baseUrl;
    env.OPENAI_API_KEY = token;
    if (model) env.GOOSE_MODEL = model;
  } else if (kind === "opencode") {
    env.OMNIROUTE_API_KEY = token;
    env.OPENCODE_CONFIG_CONTENT = JSON.stringify({
      $schema: "https://opencode.ai/config.json",
      provider: {
        omniroute: {
          npm: "@ai-sdk/openai-compatible",
          name: "OmniRoute",
          options: {
            baseURL: ensureV1BaseUrl(baseUrl),
            apiKey: "{env:OMNIROUTE_API_KEY}",
          },
          ...(model ? { models: { [model]: { name: model } } } : {}),
        },
      },
    });
  } else if (kind === "qwen") {
    env.OMNIROUTE_API_KEY = token;
  } else if (kind === "omp") {
    env.OMNIROUTE_API_KEY = token;
  } else if (kind === "gemini") {
    // Verified against @google/gemini-cli 0.50.0: the SDK appends
    // /v1beta/models/<model>:generateContent to this base URL, which is
    // OmniRoute's native Gemini surface. Auth is the API-key path; the
    // isolated GEMINI_CLI_HOME (set at spawn time) keeps any stored OAuth
    // session from overriding it.
    env.GOOGLE_GEMINI_BASE_URL = baseUrl;
    env.GEMINI_API_KEY = token;
    env.GEMINI_DEFAULT_AUTH_TYPE = "gemini-api-key";
  }
  return env;
}

function ensureV1BaseUrl(baseUrl) {
  const normalized = String(baseUrl || "").replace(/\/+$/, "");
  return normalized.endsWith("/v1") ? normalized : `${normalized}/v1`;
}

function modelArgsForTarget(target, model) {
  return manifestModelArgs(target, model);
}

function buildGeminiSettings() {
  // Force API-key auth in the isolated home so the operator's stored OAuth
  // session (Code Assist) never leaks into an OmniRoute-directed launch.
  return JSON.stringify({ security: { auth: { selectedType: "gemini-api-key" } } }, null, 2);
}

function buildQwenSettings(baseUrl, model) {
  const qwenBaseUrl = ensureV1BaseUrl(baseUrl);
  return JSON.stringify(
    {
      modelProviders: {
        openai: [
          {
            id: model,
            name: `${model} (OmniRoute)`,
            envKey: "OMNIROUTE_API_KEY",
            baseUrl: qwenBaseUrl,
          },
        ],
      },
      security: { auth: { selectedType: "openai" } },
      model: { name: model, baseUrl: qwenBaseUrl },
    },
    null,
    2
  );
}

async function buildGenericPlan(target, rawOpts, args = []) {
  const { baseUrl, authToken } = resolveLaunchTarget({
    ...rawOpts,
    apiKey: resolveAuthTokenOption(rawOpts),
  });
  const commandSpec = resolveGenericSpawn(target);
  const model = resolveModelFromTargetOptions(rawOpts);
  if (manifestRequiresModel(target) && !model) {
    throw new Error("Qwen Code requires --model in non-interactive OmniRoute launches");
  }
  const modelArgs = modelArgsForTarget(target, model);
  const fullArgs = [...modelArgs, ...args];
  const env = genericEnv(process.env, target, baseUrl, authToken, model);

  return {
    target,
    baseUrl,
    command: commandSpec.command,
    shell: commandSpec.shell,
    args: quoteShellArgs(fullArgs, process.platform),
    model: model || undefined,
    envDiff: envPreview(process.env, env),
    authSource: toAuthSource(rawOpts),
    commandDisplay: describeCommand(commandSpec.command, commandSpec.shell),
    modelArgs,
    configOverlay:
      target === "qwen"
        ? "temporary QWEN_HOME (removed after exit)"
        : target === "gemini"
          ? "temporary GEMINI_CLI_HOME (removed after exit)"
          : target === "omp"
            ? "temporary OMP home (removed after exit)"
            : target === "opencode"
              ? "OPENCODE_CONFIG_CONTENT (process environment only)"
              : undefined,
  };
}

async function healthCheckForRun(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/api/monitoring/health`, {
      signal: AbortSignal.timeout(3000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function runGenericTarget(target, rawOpts, args) {
  const { baseUrl, authToken } = resolveLaunchTarget({
    ...rawOpts,
    apiKey: resolveAuthTokenOption(rawOpts),
  });
  if (!(await healthCheckForRun(baseUrl))) {
    console.error(`OmniRoute is not reachable at ${baseUrl}. Start it or check --remote.`);
    return 1;
  }

  const model = resolveModelFromTargetOptions(rawOpts);
  if (manifestRequiresModel(target) && !model) {
    console.error("Qwen Code requires --model in non-interactive OmniRoute launches.");
    return 2;
  }
  const modelArgs = modelArgsForTarget(target, model);
  const commandSpec = resolveGenericSpawn(target);
  const childEnv = genericEnv(process.env, target, baseUrl, authToken, model);
  let overlayHome;
  if (target === "qwen") {
    overlayHome = mkdtempSync(join(os.tmpdir(), "omniroute-qwen-run-"));
    writeFileSync(join(overlayHome, "settings.json"), buildQwenSettings(baseUrl, model), {
      encoding: "utf8",
      mode: 0o600,
    });
    childEnv.QWEN_HOME = overlayHome;
  } else if (target === "gemini") {
    overlayHome = mkdtempSync(join(os.tmpdir(), "omniroute-gemini-run-"));
    mkdirSync(join(overlayHome, ".gemini"), { recursive: true });
    writeFileSync(join(overlayHome, ".gemini", "settings.json"), buildGeminiSettings(), {
      encoding: "utf8",
      mode: 0o600,
    });
    childEnv.GEMINI_CLI_HOME = overlayHome;
  } else if (target === "omp") {
    // Generate the overlay document BEFORE creating the temp home: the
    // cleanup handler is only registered after spawn, so a generator/import
    // failure after mkdtemp would leak the directory. No fallback template —
    // a generator throw fails the run loudly.
    const { generateOmpConfig } =
      await import("../../../src/lib/cli-helper/config-generator/omp.ts");
    const modelsYml = await generateOmpConfig({ baseUrl: ensureV1BaseUrl(baseUrl) });
    overlayHome = mkdtempSync(join(os.tmpdir(), "omniroute-omp-run-"));
    try {
      const agentDir = join(overlayHome, ".omp", "agent");
      mkdirSync(agentDir, { recursive: true });
      // omp 18.x also honors XDG_CONFIG_HOME / XDG_STATE_HOME / XDG_DATA_HOME /
      // XDG_CACHE_HOME; without pinning them into the overlay an inherited value
      // would touch REAL user state despite the isolated HOME.
      mkdirSync(join(overlayHome, ".config"), { recursive: true });
      mkdirSync(join(overlayHome, ".local", "state"), { recursive: true });
      mkdirSync(join(overlayHome, ".local", "share"), { recursive: true });
      mkdirSync(join(overlayHome, ".cache"), { recursive: true });
      writeFileSync(join(agentDir, "models.yml"), modelsYml, {
        encoding: "utf8",
        mode: 0o600,
      });
      childEnv.HOME = overlayHome;
      childEnv.XDG_CONFIG_HOME = join(overlayHome, ".config");
      childEnv.XDG_STATE_HOME = join(overlayHome, ".local", "state");
      childEnv.XDG_DATA_HOME = join(overlayHome, ".local", "share");
      childEnv.XDG_CACHE_HOME = join(overlayHome, ".cache");
    } catch (error) {
      try {
        rmSync(overlayHome, { recursive: true, force: true });
      } catch {
        // Best-effort cleanup of a half-written overlay.
      }
      overlayHome = undefined;
      throw error;
    }
  }

  const cleanup = () => {
    if (!overlayHome) return;
    try {
      rmSync(overlayHome, { recursive: true, force: true });
    } catch {
      // Best-effort cleanup; the directory contains no persistent credentials.
    }
  };

  let child;
  try {
    child = spawn(commandSpec.command, quoteShellArgs([...modelArgs, ...args], process.platform), {
      env: childEnv,
      stdio: "inherit",
      shell: commandSpec.shell,
      ...(process.platform === "win32" ? { windowsHide: true } : {}),
    });
  } catch (error) {
    cleanup();
    console.error(String(error?.message || error));
    return 1;
  }

  return await new Promise((resolve) => {
    let settled = false;
    const signalExitCode = { SIGINT: 130, SIGTERM: 143, SIGHUP: 129 };
    const finish = (code) => {
      if (settled) return;
      settled = true;
      for (const signal of Object.keys(signalExitCode)) {
        process.removeListener(signal, signalHandlers[signal]);
      }
      cleanup();
      resolve(code);
    };
    const signalHandlers = {};
    for (const signal of Object.keys(signalExitCode)) {
      signalHandlers[signal] = () => {
        try {
          child.kill(signal);
        } catch {
          // The child may have already exited between the signal and cleanup.
        }
        finish(signalExitCode[signal]);
      };
      process.once(signal, signalHandlers[signal]);
    }
    child.on("error", (error) => {
      if (error?.code === "ENOENT") {
        console.error(`The '${target}' CLI was not found in PATH.`);
        finish(127);
      } else {
        console.error(String(error?.message || error));
        finish(1);
      }
    });
    child.on("exit", (code, signal) => {
      finish(code ?? signalExitCode[signal] ?? 0);
    });
  });
}

/** Build a launch plan and redact any resolved secret values. */
export async function buildRunPlan(target, rawOpts = {}, args = []) {
  const canonical = resolveRunTarget(target);
  if (!canonical) {
    throw new Error(
      `Unsupported target '${target}'. Supported targets: ${listRunTargets().join(", ")}`
    );
  }

  if (canonical === "claude") {
    return buildClaudePlan(rawOpts, args);
  }

  if (canonical === "codex") {
    return buildCodexPlan(rawOpts, args);
  }

  return buildGenericPlan(canonical, rawOpts, args);
}

function writeDryRunOutput(plan, opts = {}) {
  const output = {
    target: plan.target,
    baseUrl: plan.baseUrl,
    command: plan.command,
    args: plan.args,
    auth: {
      source: plan.authSource,
      present: plan.authSource !== "none",
    },
    shell: !!plan.shell,
    model: plan.model || null,
    configOverlay: plan.configOverlay || null,
    env: {
      changedOrAdded: plan.envDiff.changedOrAdded,
      removed: plan.envDiff.removed,
    },
  };

  if (opts.json) {
    console.error(`Running in dry-run mode for '${plan.target}'.`);
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.log(`target: ${output.target}`);
    console.log(`baseUrl: ${output.baseUrl}`);
    console.log(`command: ${output.command}`);
    console.log(`shell: ${output.shell ? "yes" : "no"}`);
    console.log(`args: ${JSON.stringify(output.args)}`);
    console.log(`auth: ${JSON.stringify(output.auth)}`);
    console.log(`model: ${output.model || "(not set)"}`);
    if (output.configOverlay) console.log(`config overlay: ${output.configOverlay}`);
    if (output.env.changedOrAdded.length) {
      console.log(`env added/changed: ${output.env.changedOrAdded.join(", ")}`);
    }
    if (output.env.removed.length) {
      console.log(`env removed: ${output.env.removed.join(", ")}`);
    }
  }
}

function buildExecutionOptionsForClaude(rawOpts) {
  return {
    ...rawOpts,
    model: resolveModelFromTargetOptions(rawOpts),
    token: resolveAuthTokenOption(rawOpts),
    apiKey: resolveAuthTokenOption(rawOpts),
    profile: rawOpts.profile || rawOpts.p,
  };
}

function buildExecutionOptionsForCodex(rawOpts) {
  return {
    ...rawOpts,
    model: resolveModelFromTargetOptions(rawOpts),
    apiKey: resolveAuthTokenOption(rawOpts),
    profile: rawOpts.profile || rawOpts.p,
  };
}

/**
 * Execute or preview one target launch.
 *
 * Return code conventions:
 * 0 success, 1 runtime launch failure, 2 invalid args.
 */
export async function runCliTarget(target, opts = {}, args = []) {
  const canonical = resolveRunTarget(target);
  if (!canonical) {
    process.stderr.write(
      `Unsupported target '${target}'. Supported targets: ${listRunTargets().join(", ")}\n`
    );
    return 2;
  }

  let plan;
  try {
    plan = await buildRunPlan(target, opts, args);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  }

  if (opts.dryRun) {
    writeDryRunOutput(plan, opts);
    return 0;
  }

  if (canonical === "claude") {
    return await runLaunchClaudeCommand(buildExecutionOptionsForClaude(opts), args);
  }

  if (canonical === "codex") {
    return await runLaunchCodexCommand(buildExecutionOptionsForCodex(opts), args);
  }

  return await runGenericTarget(canonical, opts, args);
}

export function registerRun(program) {
  program
    .command("run <target>")
    .description(t("run.description") || "Run a supported CLI target through OmniRoute")
    .option(
      "--port <port>",
      "Local OmniRoute port (ignored when --remote or --base-url is set)",
      "20128"
    )
    .option(
      "--remote <url>",
      "Remote OmniRoute base URL (overrides --port, --base-url, and the active context)"
    )
    .option("--base-url <url>", "OmniRoute base URL (alias for --remote)")
    .option("--context <name>", "Named local/remote context to use for URL and credentials")
    .option("--provider <id>", "Provider id for shorthand model composition")
    .option("--model <id>", "Model id to inject in the launched target where supported")
    .option("--profile <name>", "Profile/alias argument for target launchers that support it")
    .option("-p, --p <name>", "Alias for --profile")
    .option("--token <token>", "Authentication token for the launched target (same as --api-key)")
    .option("--api-key <key>", "Authentication token for the launched target")
    .option("--api-key-env <name>", "Read the launch token from an environment variable")
    .option("--dry-run", "Show planned command and env keys without executing")
    .option("--json", "Return dry-run output in machine-readable format")
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[toolArgs...]")
    .action(async (target, toolArgs = [], opts, cmd) => {
      const globalOpts = cmd?.optsWithGlobals ? cmd.optsWithGlobals() : {};
      const merged = { ...globalOpts, ...opts };
      const code = await runCliTarget(target, merged, toolArgs);
      // process.exit() here can interrupt cleanup when the child terminates;
      // setting process.exitCode lets the event loop drain first.
      process.exitCode = code;
    });
}
