/**
 * omniroute setup-claude — Remote-aware Claude Code profile generator.
 *
 * Claude Code has no native profile files (unlike Codex). The idiomatic way to
 * keep multiple named configs is `CLAUDE_CONFIG_DIR` — a separate config dir per
 * profile (its own settings.json, credentials, history, cache). This command
 * fetches the live /v1/models catalog from a (possibly remote) OmniRoute and
 * writes `~/.claude/profiles/<name>/settings.json` for each supported model,
 * reusing the SAME profile names as `setup-codex` (glm52, kimi-k27, …).
 *
 * Launch a profile with:  omniroute launch --profile <name>
 * (which injects ANTHROPIC_AUTH_TOKEN from the active context — the token is
 * never written to disk). Or export ANTHROPIC_AUTH_TOKEN and run:
 *   CLAUDE_CONFIG_DIR=~/.claude/profiles/<name> claude
 *
 * Idempotent: re-running overwrites each profile's settings.json in place.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { categoriseModel } from "./setup-codex.mjs";

/** Map a Codex-style effort to a Claude Code settings.json effortLevel. */
function effortLevelFor(cfg) {
  // Codex categories use xhigh/high/low/undefined; Claude Code accepts the same
  // names (low|medium|high|xhigh). Pass through, omit for the "simple" tier.
  return cfg.effort || undefined;
}

/** Build the settings.json content for one Claude Code profile. */
export function buildProfileSettings(modelId, baseUrl, cfg) {
  const env = {
    ANTHROPIC_BASE_URL: baseUrl,
    ANTHROPIC_MODEL: modelId,
    CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY: "1",
    CLAUDE_CODE_AUTO_COMPACT_WINDOW: "190000",
  };
  const settings = {
    $schema: "https://json.schemastore.org/claude-code-settings.json",
    model: modelId,
    env,
  };
  const effort = effortLevelFor(cfg);
  if (effort) settings.effortLevel = effort;
  // NOTE: ANTHROPIC_AUTH_TOKEN is intentionally NOT written here — `omniroute
  // launch --profile` injects it from the active context, keeping the secret off
  // disk. For direct `CLAUDE_CONFIG_DIR=… claude` use, export it in your shell.
  return JSON.stringify(settings, null, 2) + "\n";
}

/**
 * Generate Claude Code profile files for a live model catalog. Shared by the
 * `setup-claude` CLI command and the post-model-sync auto-sync so both stay
 * behaviorally identical. Writes `<claudeHome>/profiles/<name>/settings.json`
 * (directory-per-profile); never touches the active/default Claude config.
 * @param {Array} models
 * @param {{claudeHome?:string, baseUrl:string, dryRun?:boolean, only?:string}} opts
 * @returns {Promise<{written:number, skipped:number, profiles:Array<{name:string, model:string, filePath:string}>}>}
 */
export async function syncClaudeProfilesFromModels(models, opts = {}) {
  const claudeHome = opts.claudeHome || join(os.homedir(), ".claude");
  const profilesRoot = join(claudeHome, "profiles");
  const baseUrl = opts.baseUrl;
  const dryRun = Boolean(opts.dryRun);
  const onlyFilter = opts.only ? opts.only.split(",").map((s) => s.trim()) : null;

  if (!dryRun && !existsSync(profilesRoot)) {
    mkdirSync(profilesRoot, { recursive: true });
  }

  let written = 0;
  let skipped = 0;
  const profiles = [];

  for (const m of models) {
    const id = typeof m === "string" ? m : m.id ?? "";
    if (!id) {
      skipped++;
      continue;
    }
    if (onlyFilter && !onlyFilter.some((f) => id.includes(f))) {
      skipped++;
      continue;
    }

    const cfg = categoriseModel(id);
    if (!cfg) {
      skipped++;
      continue;
    }

    const dir = join(profilesRoot, cfg.name);
    const filePath = join(dir, "settings.json");
    const content = buildProfileSettings(id, baseUrl, cfg);

    if (dryRun) {
      console.log(`\n── [dry-run] ${filePath} ──`);
      console.log(content);
    } else {
      mkdirSync(dir, { recursive: true });
      writeFileSync(filePath, content, "utf8");
    }
    profiles.push({ name: cfg.name, model: id, filePath });
    written++;
  }

  return { written, skipped, profiles };
}

/**
 * @param {{remote?:string, port?:string, apiKey?:string, claudeHome?:string, dryRun?:boolean, only?:string}} opts
 * @returns {Promise<number>}
 */
export async function runSetupClaudeCommand(opts = {}) {
  const port = Number(opts.port ?? process.env.PORT ?? 20128) || 20128;
  const baseUrl = (opts.remote ?? `http://localhost:${port}`).replace(/\/+$/, "").replace(/\/v1$/, "");
  const apiKey = opts.apiKey ?? opts["api-key"] ?? process.env.OMNIROUTE_API_KEY ?? "";
  const claudeHome = opts.claudeHome ?? opts["claude-home"] ?? join(os.homedir(), ".claude");
  const profilesRoot = join(claudeHome, "profiles");
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);

  printHeading("OmniRoute → Claude Code profile generator");
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

  const { written, skipped, profiles } = await syncClaudeProfilesFromModels(models, {
    claudeHome,
    baseUrl,
    dryRun,
    only: opts.only,
  });

  if (!dryRun) {
    for (const profile of profiles) {
      printSuccess(`  ✓ profiles/${profile.name}/settings.json  (${profile.model})`);
    }
    console.log("");
    printSuccess(`${written} Claude Code profiles written to ${profilesRoot}`);
    if (skipped > 0) printInfo(`${skipped} models skipped (no matching profile pattern)`);
    console.log("\nTo use a profile:");
    console.log("  omniroute launch --profile <name>     # e.g. omniroute launch --profile glm52");
    console.log("  # or: CLAUDE_CONFIG_DIR=~/.claude/profiles/<name> claude  (export ANTHROPIC_AUTH_TOKEN first)");
  } else {
    console.log(`\n[dry-run] ${written} profiles would be written (${skipped} skipped)`);
  }

  return 0;
}

export function registerSetupClaude(program) {
  program
    .command("setup-claude")
    .description(
      "Fetch the live model catalog from OmniRoute (local or remote VPS) and generate " +
        "~/.claude/profiles/<name>/ Claude Code profiles (CLAUDE_CONFIG_DIR) for each model"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key (defaults to OMNIROUTE_API_KEY env var)")
    .option("--claude-home <dir>", "Claude home dir (default: ~/.claude)")
    .option("--only <patterns>", "Comma-separated substrings — only matching model IDs (e.g. glm,kimi)")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .action(async (opts) => {
      const exitCode = await runSetupClaudeCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
