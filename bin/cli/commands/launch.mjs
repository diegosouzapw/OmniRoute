import { spawn } from "node:child_process";
import { t } from "../i18n.mjs";

/**
 * Build a clean child env for Claude Code pointed at the local proxy.
 * Strips any inherited ANTHROPIC_* (avoids a stale shell token leaking through),
 * then injects the proxy base URL, gateway model discovery, and auto-compact window.
 * @param {Record<string,string>} baseEnv
 * @param {number} port
 * @param {string|undefined} authToken
 * @returns {Record<string,string>}
 */
export function buildClaudeEnv(baseEnv, port, authToken) {
  const env = { ...baseEnv };
  for (const key of Object.keys(env)) {
    if (key.startsWith("ANTHROPIC_")) delete env[key];
  }
  env.ANTHROPIC_BASE_URL = `http://localhost:${port}`;
  if (authToken) env.ANTHROPIC_AUTH_TOKEN = authToken;
  env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY = "1";
  env.CLAUDE_CODE_AUTO_COMPACT_WINDOW = "190000";
  return env;
}

/**
 * @param {{port?:string, token?:string}} opts
 * @param {string[]} claudeArgs  pass-through args for the claude binary
 * @returns {Promise<number>} exit code
 */
export async function runLaunchCommand(opts = {}, claudeArgs = []) {
  const port = Number(opts.port ?? process.env.PORT ?? 20128) || 20128;

  // Health check the proxy before launching.
  try {
    const res = await fetch(`http://localhost:${port}/api/monitoring/health`, {
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
  } catch (e) {
    console.error(
      (t("launch.notRunning") || "OmniRoute is not running on port {port}. Start it with 'omniroute serve'.").replace(
        "{port}",
        String(port)
      )
    );
    return 1;
  }

  const token = opts.token ?? process.env.ANTHROPIC_AUTH_TOKEN ?? undefined;
  const env = buildClaudeEnv(process.env, port, token);

  return await new Promise((resolve) => {
    const child = spawn("claude", claudeArgs, { env, stdio: "inherit" });
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
    .description(t("launch.description") || "Launch Claude Code pointed at the local OmniRoute proxy")
    .option("--port <port>", t("serve.port") || "Proxy port", "20128")
    .option("--token <token>", t("launch.token") || "API key the Claude client should send (ANTHROPIC_AUTH_TOKEN)")
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[claudeArgs...]", "arguments passed through to the claude binary")
    .action(async (claudeArgs, opts) => {
      const exitCode = await runLaunchCommand(opts, claudeArgs ?? []);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
