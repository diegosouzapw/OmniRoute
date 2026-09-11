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
import { printHeading, printInfo, printSuccess, printError, printWarning } from "../io.mjs";
import { guardHostConfigTarget } from "../utils/config-home-guard.mjs";
import {
  categoriseModel,
  isCodexCompatibleTextModel,
  profileNameFromModelId,
} from "./setup-codex.mjs";

/** Map a Codex-style effort to a Claude Code settings.json effortLevel. */
function effortLevelFor(cfg) {
  // Codex categories use xhigh/high/low/undefined; Claude Code accepts the same
  // names (low|medium|high|xhigh). Pass through, omit for the "simple" tier.
  return cfg.effort || undefined;
}

/**
 * Generic profile for a live-catalog model that `categoriseModel()` doesn't
 * recognize (e.g. any provider added after the hardcoded glm/kimi/mimo/…
 * pattern list was written). Mirrors setup-codex.mjs's fallbackCodexProfile()
 * so setup-claude never silently produces zero profiles for a fresh catalog.
 */
export function fallbackClaudeProfile(modelId, model) {
  if (!isCodexCompatibleTextModel(model)) return null;
  return { name: profileNameFromModelId(modelId) };
}

/**
 * Manual-launch hint for one profile, in the syntax of the host shell.
 *
 * Claude Code resolves `CLAUDE_CONFIG_DIR` verbatim — its config root is
 * `process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), ".claude")`, with **no
 * tilde expansion**. So the `CLAUDE_CONFIG_DIR=~/.claude/profiles/<name>`
 * one-liner this command used to print only works on a shell that expands `~`
 * itself (bash/zsh). On PowerShell or cmd.exe it either fails to parse or
 * resolves to a literal `./~/.claude/...` that does not exist — Claude Code
 * then starts with NO `ANTHROPIC_BASE_URL`, and its `firstParty` provider
 * falls back to `api.anthropic.com`, which rejects an OmniRoute key with a real
 * Anthropic `401 {"type":"error","error":{"type":"authentication_error",…}}`
 * (#11525).
 *
 * Always emit the ABSOLUTE profile directory so the hint is copy-pasteable on
 * every platform.
 *
 * @param {string} profileDir  absolute path to `<claudeHome>/profiles/<name>`
 * @param {NodeJS.Platform|string} [platform]
 * @returns {string}
 */
export function formatManualLaunchHint(profileDir, platform = process.platform) {
  if (platform === "win32") {
    return (
      `$env:CLAUDE_CONFIG_DIR="${profileDir}"; ` +
      `$env:ANTHROPIC_AUTH_TOKEN="<your OmniRoute key>"; claude`
    );
  }
  return `CLAUDE_CONFIG_DIR="${profileDir}" ANTHROPIC_AUTH_TOKEN="<your OmniRoute key>" claude`;
}

/**
 * `ANTHROPIC_API_KEY` inherited from the operator's shell is the other half of
 * the #11525 dead end: Claude Code sends it as `x-api-key` and shows the
 * "Detected a custom API key in your environment" consent screen, so a session
 * that never picked up `ANTHROPIC_BASE_URL` looks configured right up until
 * Anthropic itself answers 401. Warn once, at generation time.
 *
 * @param {Record<string,string|undefined>} env
 * @returns {string|null} the warning line, or null when the shell is clean
 */
export function inheritedAnthropicKeyWarning(env = process.env) {
  const key = env?.ANTHROPIC_API_KEY;
  if (!key || !String(key).trim()) return null;
  return (
    "ANTHROPIC_API_KEY is set in this shell. Claude Code sends it as x-api-key and asks " +
    "\"Detected a custom API key in your environment\" — if ANTHROPIC_BASE_URL is not " +
    "picked up, that key goes to api.anthropic.com and you get a real Anthropic 401. " +
    "Unset it, or use `omniroute launch --profile <name>` (it strips every inherited " +
    "ANTHROPIC_* var before spawning claude)."
  );
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
 * @param {{claudeHome?:string, baseUrl:string, dryRun?:boolean, only?:string, log?:(line:string)=>void}} opts
 * @returns {Promise<{written:number, skipped:number, profiles:Array<{name:string, model:string, filePath:string}>}>}
 */
export async function syncClaudeProfilesFromModels(models, opts = {}) {
  const claudeHome = opts.claudeHome || join(os.homedir(), ".claude");
  const profilesRoot = join(claudeHome, "profiles");
  const baseUrl = opts.baseUrl;
  const dryRun = Boolean(opts.dryRun);
  // Injectable dry-run printer (#5959): under the node:test runner, a child
  // process writing multi-byte UTF-8 (the "──" box-drawing heading) to stdout
  // corrupts the runner's V8-serialized event stream ~50% of the time
  // ("Unable to deserialize cloned data due to invalid or unsupported
  // version"). Tests inject a collector; the CLI default stays console.log.
  const log = opts.log ?? console.log;
  const onlyFilter = opts.only ? opts.only.split(",").map((s) => s.trim()) : null;

  if (!dryRun && !existsSync(profilesRoot)) {
    mkdirSync(profilesRoot, { recursive: true });
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

    const cfg = categoriseModel(id) ?? fallbackClaudeProfile(id, m);
    if (!cfg) {
      skipped++;
      continue;
    }

    const dir = join(profilesRoot, cfg.name);
    const filePath = join(dir, "settings.json");
    const content = buildProfileSettings(id, baseUrl, cfg);

    if (dryRun) {
      log(`\n── [dry-run] ${filePath} ──`);
      log(content);
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
  const baseUrl = (opts.remote ?? `http://localhost:${port}`)
    .replace(/\/+$/, "")
    .replace(/\/v1$/, "");
  const apiKey = opts.apiKey ?? opts["api-key"] ?? process.env.OMNIROUTE_API_KEY ?? "";
  const claudeHome = opts.claudeHome ?? opts["claude-home"] ?? join(os.homedir(), ".claude");
  const profilesRoot = join(claudeHome, "profiles");
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);

  printHeading("OmniRoute → Claude Code profile generator");
  printInfo(`Connecting to ${baseUrl} …`);

  const guard = await guardHostConfigTarget(profilesRoot, {
    toolLabel: "Claude Code",
    hostCommand: "omniroute setup-claude",
    allowContainerWrite: Boolean(opts.allowContainerWrite ?? opts["allow-container-write"]),
    dryRun,
  });
  if (guard !== 0) return guard;

  // ── Fetch model catalog ───────────────────────────────────────────────────
  let models;
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    const res = await fetch(`${baseUrl}/v1/models`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try {
        const errorBody = await res.json();
        const serverMsg =
          errorBody?.error?.message || errorBody?.error || errorBody?.message || "";
        if (serverMsg) detail += ` — ${serverMsg}`;
      } catch {}
      throw new Error(detail);
    }
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
    // Absolute path, host-shell syntax: Claude Code does not expand `~` in
    // CLAUDE_CONFIG_DIR, and a config dir that does not resolve silently drops
    // ANTHROPIC_BASE_URL — the request then goes to api.anthropic.com (#11525).
    const sample = join(profilesRoot, profiles[0]?.name ?? "<name>");
    console.log("  # or, without the launcher:");
    console.log(`  ${formatManualLaunchHint(sample)}`);
    const keyWarning = inheritedAnthropicKeyWarning();
    if (keyWarning) {
      console.log("");
      printWarning(keyWarning);
    }
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
    .option(
      "--only <patterns>",
      "Comma-separated substrings — only matching model IDs (e.g. glm,kimi)"
    )
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .option(
      "--allow-container-write",
      "Write even when the target is inside a container and not mounted from the host"
    )
    .action(async (opts) => {
      const exitCode = await runSetupClaudeCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
