import { spawn } from "node:child_process";
import { t } from "../i18n.mjs";

/**
 * Health-check an OmniRoute endpoint (local or remote) before launching Codex.
 * @param {string} baseUrl
 * @param {number} timeoutMs
 * @returns {Promise<boolean>}
 */
async function healthCheck(baseUrl, timeoutMs = 3000) {
  try {
    const res = await fetch(`${baseUrl.replace(/\/v1$/, "")}/api/monitoring/health`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Build the env for the Codex child process.
 * Injects OMNIROUTE_API_KEY if an explicit api-key was provided on the command line
 * (useful when launching against a remote VPS whose key differs from ~/.bashrc).
 * @param {Record<string,string>} baseEnv
 * @param {string|undefined} apiKey
 * @returns {Record<string,string>}
 */
export function buildCodexEnv(baseEnv, apiKey) {
  const env = { ...baseEnv };
  if (apiKey) env.OMNIROUTE_API_KEY = apiKey;
  return env;
}

/**
 * @param {{port?:string, remote?:string, profile?:string, apiKey?:string}} opts
 * @param {string[]} codexArgs  pass-through args for the codex binary
 * @returns {Promise<number>} exit code
 */
export async function runLaunchCodexCommand(opts = {}, codexArgs = []) {
  const port = Number(opts.port ?? process.env.PORT ?? 20128) || 20128;
  const baseUrl = opts.remote ?? `http://localhost:${port}/v1`;

  const ok = await healthCheck(baseUrl);
  if (!ok) {
    const location = opts.remote ?? `port ${port}`;
    console.error(
      (t("launch.notRunning") || "OmniRoute is not running on port {port}. Start it with 'omniroute serve'.")
        .replace("{port}", String(location))
    );
    return 1;
  }

  const profile = opts.profile;
  const extraArgs = profile ? ["--profile", profile, ...codexArgs] : codexArgs;
  const env = buildCodexEnv(process.env, opts.apiKey ?? opts["api-key"]);

  return await new Promise((resolve) => {
    const child = spawn("codex", extraArgs, { env, stdio: "inherit" });
    child.on("error", (err) => {
      if (err?.code === "ENOENT") {
        console.error(
          "The 'codex' CLI was not found in PATH. Install with:\n" +
            "  npm install -g @openai/codex"
        );
        resolve(127);
      } else {
        console.error(String(err?.message || err));
        resolve(1);
      }
    });
    child.on("exit", (code) => resolve(code ?? 0));
  });
}

export function registerLaunchCodex(program) {
  program
    .command("launch-codex")
    .description(
      t("launchCodex.description") ||
        "Launch Codex CLI pointed at OmniRoute (local or remote VPS)"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option(
      "--remote <url>",
      "Remote OmniRoute base URL, e.g. http://100.67.86.91:20128/v1 (overrides --port)"
    )
    .option("--profile <name>", "Codex profile to activate (passed as --profile <name>)")
    .option("-p, --p <name>", "Alias for --profile")
    .option(
      "--api-key <key>",
      "OmniRoute API key (overrides OMNIROUTE_API_KEY env var for this invocation)"
    )
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[codexArgs...]", "arguments passed through to the codex binary")
    .action(async (codexArgs, opts) => {
      // -p is an alias for --profile
      const merged = { ...opts, profile: opts.profile ?? opts.p };
      const exitCode = await runLaunchCodexCommand(merged, codexArgs ?? []);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
