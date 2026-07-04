/**
 * omniroute setup-codex — Remote-aware Codex CLI profile generator.
 *
 * Connects to a running OmniRoute instance (local or remote VPS), fetches the
 * live model catalog via GET /v1/models, then generates ~/.codex/<name>.config.toml
 * profile files for each model — so you can switch providers with a single flag
 * (`codex --profile glm52`) without editing config files by hand.
 *
 * Primary use-case: configure a local Codex CLI to use models from a VPS.
 *   omniroute setup-codex --remote http://100.67.86.91:20128 --api-key sk-xxx
 *
 * The command is idempotent: re-running updates existing profile files in place.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { t } from "../i18n.mjs";

// ── Model categorisation ──────────────────────────────────────────────────────

/**
 * Map a model ID (as returned by /v1/models) to a Codex profile configuration.
 * Returns null for models that should not get their own profile (e.g. aliases).
 *
 * Exported so the Claude Code profile generator (`setup-claude`) reuses the SAME
 * profile names (glm52, kimi-k27, …) for cross-CLI consistency.
 *
 * @param {string} modelId
 * @returns {{ name:string, ctx:number, compact:number, effort?:string, summary?:boolean, toolLimit:number }|null}
 */
export function categoriseModel(modelId) {
  const id = modelId.toLowerCase();

  // ── Thinking models (max effort, detailed summary) ────────────────────────
  const thinkingPatterns = [
    { re: /kmc\/kimi-k2\.7/, name: "kimi-k27", ctx: 131072, compact: 112000, toolLimit: 32768 },
    { re: /kmc\/kimi-k2\.6/, name: "kimi-k26", ctx: 131072, compact: 112000, toolLimit: 32768 },
    { re: /glm\/glm-5\.2-max/, name: "glm52max", ctx: 131072, compact: 112000, toolLimit: 32768 },
    { re: /glm\/glm-5\.2$/, name: "glm52", ctx: 131072, compact: 112000, toolLimit: 32768 },
    {
      re: /opencode-go\/mimo-v2\.5-pro/,
      name: "mimo-pro",
      ctx: 131072,
      compact: 112000,
      toolLimit: 32768,
    },
    {
      re: /opencode-go\/qwen3\.7-plus/,
      name: "qwen37plus",
      ctx: 32768,
      compact: 28000,
      toolLimit: 16384,
    },
  ];

  // ── Good models (high effort) ─────────────────────────────────────────────
  const goodPatterns = [
    {
      re: /ollamacloud\/deepseek-v4-pro/,
      name: "deepseek-pro",
      ctx: 131072,
      compact: 112000,
      toolLimit: 32768,
    },
    {
      re: /opencode-go\/mimo-v2\.5$/,
      name: "mimo",
      ctx: 131072,
      compact: 112000,
      toolLimit: 32768,
    },
  ];

  // ── Simple models (no effort) ─────────────────────────────────────────────
  const simplePatterns = [
    { re: /ollamacloud\/gemma4:31b/, name: "gemma4", ctx: 32768, compact: 28000, toolLimit: 16384 },
    {
      re: /ollamacloud\/nemotron-3-super/,
      name: "nemotron",
      ctx: 32768,
      compact: 28000,
      toolLimit: 16384,
    },
    {
      re: /ollamacloud\/gpt-oss:20b/,
      name: "gptoss",
      ctx: 32768,
      compact: 28000,
      toolLimit: 16384,
    },
  ];

  // ── Fast models (low effort) ──────────────────────────────────────────────
  const fastPatterns = [
    {
      re: /ollamacloud\/deepseek-v4-flash/,
      name: "deepseek-flash",
      ctx: 65536,
      compact: 56000,
      toolLimit: 16384,
    },
    {
      re: /ollamacloud\/gemini-3-flash/,
      name: "gemini-flash",
      ctx: 1000000,
      compact: 850000,
      toolLimit: 32768,
    },
    { re: /glm\/glm-5-turbo/, name: "glm5turbo", ctx: 131072, compact: 112000, toolLimit: 16384 },
    {
      re: /glm\/glm-4\.7-flash/,
      name: "glm47flash",
      ctx: 131072,
      compact: 112000,
      toolLimit: 16384,
    },
  ];

  for (const p of thinkingPatterns) {
    if (p.re.test(id)) return { ...p, effort: "xhigh", summary: true };
  }
  for (const p of goodPatterns) {
    if (p.re.test(id)) return { ...p, effort: "high", summary: false };
  }
  for (const p of simplePatterns) {
    if (p.re.test(id)) return { ...p, effort: undefined, summary: false };
  }
  for (const p of fastPatterns) {
    if (p.re.test(id)) return { ...p, effort: "low", summary: false };
  }

  return null;
}

function firstPositiveNumber(...values) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return value;
    }
  }
  return null;
}

function shortHash(value) {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) + hash) ^ value.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

export function profileNameFromModelId(modelId) {
  const normalized = String(modelId)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const base = normalized || "model";
  if (base.length <= 96) return base;
  return `${base.slice(0, 84).replace(/-+$/g, "")}-${shortHash(base)}`;
}

function hasAnyValue(values, patterns) {
  return values.some((value) => patterns.some((pattern) => pattern.test(value)));
}

export function isCodexCompatibleTextModel(model) {
  if (typeof model === "string") return true;

  const id = String(model?.id ?? "").toLowerCase();
  const type = String(model?.type ?? "").toLowerCase();
  const outputModalities = Array.isArray(model?.output_modalities)
    ? model.output_modalities.map((value) => String(value).toLowerCase())
    : [];

  if (type && !["chat", "text", "language", "llm", "model"].includes(type)) {
    return false;
  }

  const unsupportedPatterns = [
    /(^|[/_-])(image|img|video|veo|seedance|audio|speech|voice|tts|stt|whisper)([/_-]|$)/,
    /(^|[/_-])(embedding|embeddings|embed|rerank|moderation|transcription)([/_-]|$)/,
  ];
  if (hasAnyValue([id, type], unsupportedPatterns)) return false;

  const nonTextModalities = [/^(image|video|audio)$/];
  if (hasAnyValue(outputModalities, nonTextModalities)) return false;

  if (outputModalities.length > 0 && !outputModalities.includes("text")) {
    return false;
  }

  return true;
}

export function fallbackCodexProfile(modelId, model) {
  if (!isCodexCompatibleTextModel(model)) return null;

  const ctx =
    typeof model === "string"
      ? 128000
      : (firstPositiveNumber(
          model.context_length,
          model.max_context_window_tokens,
          model.max_input_tokens
        ) ?? 128000);
  const maxOutput =
    typeof model === "string"
      ? null
      : firstPositiveNumber(model.max_output_tokens, model.output_token_limit);
  const toolLimit = Math.min(Math.max(maxOutput ?? 16384, 8192), 32768);

  return {
    name: profileNameFromModelId(modelId),
    ctx,
    compact: Math.floor(ctx * 0.85),
    summary: false,
    toolLimit,
  };
}

/** Build the TOML content for a single profile. */
function buildProfileToml(modelId, cfg) {
  const lines = [
    `# codex --profile ${cfg.name}`,
    `# ${modelId}`,
    `model                          = "${modelId}"`,
    `model_provider                 = "omniroute"`,
  ];

  if (cfg.effort) {
    lines.push(`model_reasoning_effort         = "${cfg.effort}"`);
  }
  if (cfg.summary) {
    lines.push(`model_reasoning_summary        = "detailed"`);
  }

  lines.push(
    `model_context_window           = ${cfg.ctx}`,
    `model_auto_compact_token_limit = ${cfg.compact}`,
    `tool_output_token_limit        = ${cfg.toolLimit}`
  );

  return lines.join("\n") + "\n";
}

export async function syncCodexProfilesFromModels(models, opts = {}) {
  const codexHome = opts.codexHome || join(os.homedir(), ".codex");
  const dryRun = Boolean(opts.dryRun);
  const onlyFilter = opts.only ? opts.only.split(",").map((s) => s.trim()) : null;

  if (!dryRun && !existsSync(codexHome)) {
    mkdirSync(codexHome, { recursive: true });
  }

  let written = 0;
  let skipped = 0;
  const profiles = [];

  for (const m of models) {
    const id = typeof m === "string" ? m : (m.id ?? "");
    if (!id) {
      skipped++;
      continue;
    }
    if (onlyFilter && !onlyFilter.some((f) => id.includes(f))) {
      skipped++;
      continue;
    }

    const cfg = categoriseModel(id) ?? fallbackCodexProfile(id, m);
    if (!cfg) {
      skipped++;
      continue;
    }

    const filePath = join(codexHome, `${cfg.name}.config.toml`);
    const content = buildProfileToml(id, cfg);

    if (dryRun) {
      console.log(`\n── [dry-run] ${filePath} ──`);
      console.log(content);
    } else {
      writeFileSync(filePath, content, "utf8");
    }
    profiles.push({ name: cfg.name, model: id, filePath });
    written++;
  }

  return { written, skipped, profiles };
}

// ── Command ───────────────────────────────────────────────────────────────────

/**
 * @param {{remote?:string, port?:string, apiKey?:string, codexHome?:string, dryRun?:boolean, only?:string}} opts
 * @returns {Promise<number>}
 */
export async function runSetupCodexCommand(opts = {}) {
  const port = Number(opts.port ?? process.env.PORT ?? 20128) || 20128;
  const baseUrl = (opts.remote ?? `http://localhost:${port}`).replace(/\/v1$/, "");
  const apiKey = opts.apiKey ?? opts["api-key"] ?? process.env.OMNIROUTE_API_KEY ?? "";
  const codexHome = opts.codexHome ?? opts["codex-home"] ?? join(os.homedir(), ".codex");
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const onlyFilter = opts.only ? opts.only.split(",").map((s) => s.trim()) : null;

  printHeading(`OmniRoute → Codex CLI profile generator`);
  printInfo(`Connecting to ${baseUrl} …`);

  // ── Fetch model catalog ───────────────────────────────────────────────────
  let models;
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

    const res = await fetch(`${baseUrl}/v1/models`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const body = await res.json();
    models = body.data ?? body.models ?? [];
  } catch (err) {
    printError(`Failed to fetch models: ${err.message}`);
    printInfo(
      "Make sure OmniRoute is running and the --remote URL is correct.\n" +
        "You may also need --api-key if OmniRoute requires authentication."
    );
    return 1;
  }

  printInfo(`Received ${models.length} models from ${baseUrl}`);

  // ── Generate profiles ─────────────────────────────────────────────────────
  const { written, skipped, profiles } = await syncCodexProfilesFromModels(models, {
    codexHome,
    dryRun,
    only: opts.only,
  });

  if (!dryRun) {
    for (const profile of profiles) {
      printSuccess(`  ✓ ${profile.name}.config.toml  (${profile.model})`);
    }
    console.log("");
    printSuccess(`${written} profiles written to ${codexHome}`);
    if (skipped > 0) {
      printInfo(`${skipped} models skipped (no matching profile pattern)`);
    }
    console.log("\nTo use a profile:");
    console.log("  codex --profile <name>    # e.g. codex --profile glm52");
    console.log("  codex -p <name>           # short form");
  } else {
    console.log(`\n[dry-run] ${written} profiles would be written (${skipped} skipped)`);
  }

  return 0;
}

export function registerSetupCodex(program) {
  program
    .command("setup-codex")
    .description(
      "Fetch the live model catalog from OmniRoute (local or remote VPS) and generate " +
        "~/.codex/<name>.config.toml profiles for each supported model"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option(
      "--remote <url>",
      "Remote OmniRoute URL, e.g. http://100.67.86.91:20128 — fetches models from there"
    )
    .option(
      "--api-key <key>",
      "OmniRoute API key for the remote instance (defaults to OMNIROUTE_API_KEY env var)"
    )
    .option("--codex-home <dir>", "Directory where profile files are written (default: ~/.codex)")
    .option(
      "--only <patterns>",
      "Comma-separated substrings — only generate profiles for matching model IDs (e.g. glm,kimi)"
    )
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const exitCode = await runSetupCodexCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
