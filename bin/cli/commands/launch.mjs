import { spawn } from "node:child_process";
import { join } from "node:path";
import os from "node:os";
import { t } from "../i18n.mjs";
import { resolveActiveContext } from "../contexts.mjs";

function stripTrailingSlash(value) {
  let s = String(value);
  let end = s.length;
  while (end > 0 && s.charCodeAt(end - 1) === 47) end--;
  return end === s.length ? s : s.slice(0, end);
}

/**
 * Build a clean child env for Claude Code pointed at OmniRoute.
 *
 * Strips inherited ANTHROPIC_* (avoids a stale shell token leaking through), then
 * injects the base URL, gateway model discovery, and auto-compact window.
 *
 * @param {Record<string,string>} baseEnv
 * @param {number|string} baseUrlOrPort  a port (→ http://localhost:<port>) or a full base URL
 * @param {string|undefined} authToken
 * @param {{ configDir?:string, model?:string }} [opts]
 * @returns {Record<string,string>}
 */
export function buildClaudeEnv(baseEnv, baseUrlOrPort, authToken, opts = {}) {
  const env = { ...baseEnv };
  for (const key of Object.keys(env)) {
    if (key.startsWith("ANTHROPIC_")) delete env[key];
  }

  // Accept a bare port (number/numeric string → localhost) or a full base URL.
  // Claude Code wants the ROOT URL (it appends /v1/messages itself) — no /v1 here.
  let baseUrl;
  if (typeof baseUrlOrPort === "number" || /^\d+$/.test(String(baseUrlOrPort))) {
    baseUrl = `http://localhost:${Number(baseUrlOrPort) || 20128}`;
  } else {
    baseUrl = stripTrailingSlash(String(baseUrlOrPort)).replace(/\/v1$/, "");
  }

  env.ANTHROPIC_BASE_URL = baseUrl;
  // Always set a token: when none is resolved, a sentinel keeps newer Claude Code
  // from stopping at its local login gate before it ever contacts OmniRoute (an
  // open backend ignores the value). Mirrors free-claude-code. ANTHROPIC_API_KEY
  // stays stripped (above) so it can't shadow the Bearer token.
  env.ANTHROPIC_AUTH_TOKEN = (authToken && String(authToken).trim()) || "omniroute-no-auth";
  env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY = "1";
  env.CLAUDE_CODE_AUTO_COMPACT_WINDOW = "190000";
  // Profile isolation (Claude Code has no native profiles — CLAUDE_CONFIG_DIR is
  // the idiomatic mechanism: separate settings/credentials/history/cache per dir).
  if (opts.configDir) env.CLAUDE_CONFIG_DIR = opts.configDir;
  if (opts.model) env.ANTHROPIC_MODEL = opts.model;
  return env;
}

/**
 * Resolve the OmniRoute base URL + auth for launch, honouring (in order):
 * explicit flags → the active context (remote mode) → localhost:<port>.
 * @param {{port?:string, remote?:string, baseUrl?:string, token?:string, apiKey?:string, context?:string}} opts
 * @returns {{ baseUrl:string, authToken:string|undefined }}
 */
export function resolveLaunchTarget(opts = {}) {
  const explicit = opts.remote ?? opts.baseUrl;
  let baseUrl;
  if (explicit) {
    baseUrl = stripTrailingSlash(explicit).replace(/\/v1$/, "");
  } else {
    let fromCtx;
    try {
      const ctx = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      fromCtx = ctx?.baseUrl;
    } catch {
      /* no context */
    }
    baseUrl = fromCtx
      ? stripTrailingSlash(fromCtx).replace(/\/v1$/, "")
      : `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }

  let authToken = opts.token ?? opts.apiKey ?? opts["api-key"];
  if (!authToken) {
    try {
      const ctx = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      authToken = ctx?.accessToken || ctx?.apiKey || undefined;
    } catch {
      /* no context auth */
    }
  }
  if (!authToken) authToken = process.env.ANTHROPIC_AUTH_TOKEN ?? process.env.OMNIROUTE_API_KEY;
  return { baseUrl, authToken };
}

/**
 * @param {{port?:string, remote?:string, token?:string, apiKey?:string, profile?:string, claudeHome?:string}} opts
 * @param {string[]} claudeArgs  pass-through args for the claude binary
 * @returns {Promise<number>} exit code
 */
export async function runLaunchCommand(opts = {}, claudeArgs = []) {
  const { baseUrl, authToken } = resolveLaunchTarget(opts);

  // Health check the (possibly remote) proxy before launching.
  try {
    const res = await fetch(`${baseUrl}/api/monitoring/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
  } catch {
    console.error(
      (
        t("launch.notRunning") ||
        "OmniRoute is not reachable at {port}. Start it with 'omniroute serve'."
      ).replace("{port}", baseUrl)
    );
    return 1;
  }

  const configDir = opts.profile
    ? join(opts.claudeHome || join(os.homedir(), ".claude"), "profiles", opts.profile)
    : undefined;
  const env = buildClaudeEnv(process.env, baseUrl, authToken, { configDir });

  return await new Promise((resolve) => {
    // #8246: on Windows, npm installs claude as a .cmd shim — spawn() without
    // shell:true cannot resolve PATHEXT shims and fails with ENOENT.
    const claudeCommand = process.platform === "win32" ? "claude.cmd" : "claude";
    const child = spawn(claudeCommand, claudeArgs, {
      env,
      stdio: "inherit",
      ...(process.platform === "win32" ? { shell: true, windowsHide: true } : {}),
    });
    child.on("error", (err) => {
      if (err && err.code === "ENOENT") {
        console.error(t("launch.notFound") || "The 'claude' CLI was not found in PATH.");
        resolve(127);
      } else {
        console.error(String(err?.message || err));
        resolve(1);
      }
    });
    child.on("exit", (code) => resolve(code ?? 0));
  });
}

export function registerLaunch(program) {
  program
    .command("launch")
    .description(
      t("launch.description") || "Launch Claude Code pointed at OmniRoute (local or remote)"
    )
    .option("--port <port>", t("serve.port") || "Proxy port", "20128")
    .option("--remote <url>", "Remote OmniRoute base URL (overrides --port and the active context)")
    .option(
      "--profile <name>",
      "Claude Code profile to use (CLAUDE_CONFIG_DIR ~/.claude/profiles/<name>)"
    )
    .option("--token <token>", t("launch.token") || "Token Claude sends (ANTHROPIC_AUTH_TOKEN)")
    .option("--api-key <key>", "Alias for --token (OmniRoute access token / API key)")
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[claudeArgs...]", "arguments passed through to the claude binary")
    .action(async (claudeArgs, opts) => {
      const exitCode = await runLaunchCommand(opts, claudeArgs ?? []);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
