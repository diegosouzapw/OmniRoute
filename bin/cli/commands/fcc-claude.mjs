/**
 * omniroute fcc-claude — FCC (Free-Claude-Code) style launcher, ported from the
 * "plan one" PoC.
 *
 * Features:
 *   1. Launch the claude binary pointed at a local or remote OmniRoute instance
 *      (supports e.g. omni.paibao.ai)
 *   2. Anthropic Messages API streaming client with a built-in fallback chain
 *   3. Dual-upstream version tracking (OmniRoute + FCC GitHub)
 *
 * Usage:
 *   omniroute fcc-claude [options] [claude args...]
 *   omniroute fcc-claude --remote https://omni.paibao.ai
 *   omniroute fcc-claude --fallback models.json "help me fix a bug"
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { t } from "../i18n.mjs";
import { resolveDataDir } from "../data-dir.mjs";
import { resolveActiveContext } from "../contexts.mjs";
import { quoteShellArgs } from "../utils/winShellArgs.mjs";
import {
  buildClaudeEnv,
  resolveLaunchTarget,
  resolveClaudeSpawn,
  quoteClaudeArgs,
} from "./launch.mjs";

// Own subdirectory under the shared OmniRoute data dir (honours the DATA_DIR env
// override, same as every other CLI command — see bin/cli/data-dir.mjs) rather
// than a standalone ~/.omni-fcc-poc directory.
function getFccDataDir() {
  return join(resolveDataDir(), "fcc-claude");
}

function getFallbackConfigPath() {
  return join(getFccDataDir(), "fallback.json");
}

function getVersionCachePath() {
  return join(getFccDataDir(), "version-cache.json");
}

// ─── Default fallback chain (FCC style) ──────────────────────────────────────

const DEFAULT_FALLBACK_MODELS = ["auto/best-coding", "auto/best-chat", "auto/fast"];

/**
 * Load the fallback chain config (JSON file or defaults).
 * Format: { "models": ["auto/best-coding", ...], "strategy": "priority" }
 */
export function loadFallbackChain(opts = {}) {
  if (opts.models) {
    return { models: opts.models, strategy: opts.strategy || "priority" };
  }
  try {
    const raw = readFileSync(getFallbackConfigPath(), "utf8");
    return JSON.parse(raw);
  } catch {
    return { models: DEFAULT_FALLBACK_MODELS, strategy: "priority" };
  }
}

// ─── Anthropic Messages streaming client (ported from FCC's ProviderExecutor) ─

/**
 * Stream an Anthropic Messages API call with fallback-chain support.
 * Mirrors FCC's ProviderExecutor.stream_messages().
 *
 * @param {Array} messages  Anthropic messages array
 * @param {string} model    primary model ID
 * @param {string} baseUrl  OmniRoute base URL (without /v1)
 * @param {string|undefined} authToken  Bearer token
 * @param {string[]} fallbackModels  fallback model chain
 * @param {object} options  extra body params (max_tokens, temperature, reasoning_effort, etc.)
 * @yields {string} raw SSE lines
 */
export async function* streamMessages(
  messages,
  model,
  baseUrl,
  authToken,
  fallbackModels = [],
  options = {}
) {
  const allModels = [model, ...fallbackModels];
  let lastError = null;

  for (let i = 0; i < allModels.length; i++) {
    const currentModel = allModels[i];
    const isFallback = i > 0;

    if (isFallback) {
      console.error(`\x1b[33m[fcc-claude] fallback: ${allModels[i - 1]} → ${currentModel}\x1b[0m`);
    }

    const body = {
      model: currentModel,
      messages,
      stream: true,
      ...options,
    };

    try {
      const url = `${baseUrl.replace(/\/+$/, "")}/v1/messages`;
      const headers = {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(120_000),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${errText.slice(0, 200)}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let newlineIdx;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          yield line + "\n";
        }
      }

      if (buffer) yield buffer;
      return; // success
    } catch (err) {
      lastError = err;
      console.error(
        `\x1b[33m[fcc-claude] WARN\x1b[0m Model ${currentModel} failed: ${err.message}`
      );
      if (i < allModels.length - 1) continue;
      throw new Error(`All models exhausted. Last: ${err.message}`);
    }
  }
}

/**
 * Direct streaming smoke test (CLI mode): like fcc-claude itself but for
 * non-interactive testing.
 * Usage: omniroute fcc-claude --test "hello"
 */
export async function runTestCommand(opts = {}) {
  const { baseUrl, authToken } = resolveLaunchTarget(opts);
  const prompt = opts.test || opts.prompt || "Say hi";
  const chain = loadFallbackChain(opts);
  const fallbackModels = chain.models?.slice(1) || [];

  console.error(`[fcc-claude] Testing → ${baseUrl} model=${chain.models[0]}`);
  if (fallbackModels.length) console.error(`[fcc-claude] Fallback: ${fallbackModels.join(" → ")}`);

  try {
    for await (const line of streamMessages(
      [{ role: "user", content: prompt }],
      chain.models[0],
      baseUrl,
      authToken,
      fallbackModels
    )) {
      process.stdout.write(line);
    }
    console.error("\n[fcc-claude] ✓ test passed");
    return 0;
  } catch (err) {
    console.error(`\n[fcc-claude] ✖ test failed: ${err.message}`);
    return 1;
  }
}

// ─── Dual-upstream version tracking (ported from the PoC) ────────────────────

/**
 * Fetch the latest version from both upstreams and cache it (1h TTL).
 * Returns a { omniRoute, fcc } structure.
 */
export async function fetchUpstreamVersions() {
  const now = Date.now();
  const cachePath = getVersionCachePath();
  let cache = {};
  try {
    const raw = readFileSync(cachePath, "utf8");
    cache = JSON.parse(raw);
    if (cache._fetchedAt && now - cache._fetchedAt < 60 * 60 * 1000) {
      return cache;
    }
  } catch {
    /* fresh start */
  }

  // Upstream 1: local/remote OmniRoute version
  let omniVersion = null;
  try {
    const res = await fetch("http://localhost:20128/api/monitoring/health", {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const json = await res.json();
      omniVersion = json.version || json.system?.version || null;
    }
  } catch {
    /* unreachable */
  }

  // Upstream 2: FCC GitHub (latest release, or most recent commit as a fallback)
  let fccVersion = null;
  try {
    const res = await fetch(
      "https://api.github.com/repos/Alishahryar1/free-claude-code/releases/latest",
      { signal: AbortSignal.timeout(5000) }
    );
    if (res.ok) {
      const json = await res.json();
      fccVersion = json.tag_name || null;
    } else {
      const commitRes = await fetch(
        "https://api.github.com/repos/Alishahryar1/free-claude-code/commits?per_page=1",
        { signal: AbortSignal.timeout(5000) }
      );
      if (commitRes.ok) {
        const json = await commitRes.json();
        if (Array.isArray(json) && json.length > 0) {
          fccVersion = json[0].sha.slice(0, 8);
        }
      }
    }
  } catch {
    /* unreachable */
  }

  cache = {
    _fetchedAt: now,
    omniRoute: { running: omniVersion, source: "health-api" },
    fcc: { latestRelease: fccVersion, source: "github-api" },
  };

  try {
    const dir = getFccDataDir();
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  } catch {
    /* non-fatal */
  }

  return cache;
}

export async function runVersionStatusCommand() {
  const cache = await fetchUpstreamVersions();
  console.log("\n=== OmniRoute × FCC dual-upstream version status ===\n");
  console.log(`OmniRoute running: ${cache.omniRoute.running || "unreachable"}`);
  console.log(`FCC latest: ${cache.fcc.latestRelease || "unreachable"}`);
  console.log();
}

// ─── Main launcher (reuses launch.mjs's buildClaudeEnv + resolveLaunchTarget) ─

/**
 * `omniroute fcc-claude [options] [claude args...]`
 *
 * Differs from `omniroute launch` by:
 *   - a built-in fallback chain (automatic model switch on failure)
 *   - a --test mode (non-interactive streaming smoke test)
 *   - a --check-updates mode (dual-upstream version check)
 */
export async function runFccClaude(opts = {}, claudeArgs = []) {
  // --check-updates and --test are special modes that don't spawn claude.
  if (opts.checkUpdates) {
    await runVersionStatusCommand();
    return 0;
  }

  if (opts.test || opts.prompt) {
    return await runTestCommand({
      ...opts,
      test: opts.test || opts.prompt,
    });
  }

  // Normal mode: launch the claude binary.
  const { baseUrl, authToken } = resolveLaunchTarget(opts);

  // Health check
  try {
    const res = await fetch(`${baseUrl}/api/monitoring/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
  } catch {
    console.error(
      (t("launch.notRunning") || "OmniRoute is not reachable at {url}.").replace("{url}", baseUrl)
    );
    return 1;
  }

  // Load and print the fallback chain.
  const chain = loadFallbackChain(opts);
  const fallbackModels = chain.models?.slice(1) || [];
  if (fallbackModels.length) {
    console.error(`[fcc-claude] fallback chain: ${chain.models.join(" → ")}`);
  }

  // Build the claude env (reuses launch.mjs's buildClaudeEnv).
  const env = buildClaudeEnv(process.env, baseUrl, authToken);

  // Locate the claude binary.
  const { command, shell } = await resolveClaudeSpawn(process.platform);

  console.error(`[fcc-claude] launching ${command} → ${baseUrl}`);

  const child = spawn(command, quoteClaudeArgs(claudeArgs, process.platform), {
    env,
    stdio: "inherit",
    shell,
    ...(process.platform === "win32" ? { windowsHide: true } : {}),
  });

  child.on("error", (err) => {
    if (err.code === "ENOENT") {
      console.error(
        `"${command}" not found. Install with: npm install -g @anthropic-ai/claude-code`
      );
    } else {
      console.error(String(err.message || err));
    }
    process.exit(127);
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

export function registerFccClaude(program) {
  program
    .command("fcc-claude")
    .description(
      "FCC-style launcher: Claude Code with built-in fallback chain and dual-upstream version tracking"
    )
    .option("--port <port>", "OmniRoute port (default: 20128)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL (e.g. https://omni.paibao.ai)")
    .option("--token <token>", "Auth token (ANTHROPIC_AUTH_TOKEN)")
    .option("--api-key <key>", "Alias for --token")
    .option(
      "--models <ids>",
      "Fallback model chain, comma-separated (e.g. auto/best-coding,auto/best-chat,auto/fast)"
    )
    .option("--fallback <file>", "Path to fallback config JSON file")
    .option("--test <prompt>", "Non-interactive stream test mode")
    .option("--prompt <prompt>", "Alias for --test")
    .option("--check-updates", "Check dual-upstream versions and exit")
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[claudeArgs...]", "arguments passed through to the claude binary")
    .action(async (claudeArgs, opts) => {
      const merged = {
        ...opts,
        models: opts.models ? opts.models.split(",").map((s) => s.trim()) : undefined,
      };
      process.exitCode = await runFccClaude(merged, claudeArgs ?? []);
    });
}
