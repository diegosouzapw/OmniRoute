import { execFile } from "node:child_process";
import { t } from "../i18n.mjs";

function parsePort(value, fallback) {
  const parsed = parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

export function registerDashboard(program) {
  program
    .command("dashboard")
    .description(t("dashboard.description"))
    .option("--url", t("dashboard.urlOnly"))
    .option("--port <port>", "Port the server is running on")
    .option("--tui", t("dashboard.tui") || "Open interactive TUI dashboard (terminal UI)")
    .action(async (opts, cmd) => {
      if (opts.tui) {
        const globalOpts = cmd.optsWithGlobals();
        const port = parsePort(opts.port ?? process.env.PORT ?? "20128", 20128);
        const baseUrl = globalOpts.baseUrl ?? `http://localhost:${port}`;
        const apiKey = globalOpts.apiKey ?? null;
        const { startInteractiveTui } = await import("../tui/Dashboard.jsx");
        await startInteractiveTui({ port, baseUrl, apiKey });
        return;
      }
      const exitCode = await runDashboardCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runDashboardCommand(opts = {}) {
  const port = parsePort(opts.port ?? process.env.PORT ?? "20128", 20128);
  const dashboardUrl = `http://localhost:${port}`;

  if (opts.url) {
    console.log(dashboardUrl);
    return 0;
  }

  console.log(t("dashboard.opening", { url: dashboardUrl }));

  try {
    const open = await import("open");
    await open.default(dashboardUrl);
  } catch {
    await openFallback(dashboardUrl);
  }

  return 0;
}

/**
 * Resolve the command and args to open a URL in the default browser
 * for a given platform. Exported for testing — callers should use openFallback().
 * @param {"darwin"|"win32"|string} platform
 * @param {string} url
 * @returns {{ cmd: string, args: string[] }}
 */
export function resolveOpenCommand(platform, url) {
  if (platform === "darwin") return { cmd: "open", args: [url] };
  if (platform === "win32") return { cmd: "rundll32", args: ["url.dll,FileProtocolHandler", url] };
  return { cmd: "xdg-open", args: [url] };
}

function openFallback(url) {
  return new Promise((resolve) => {
    const { cmd, args } = resolveOpenCommand(process.platform, url);
    execFile(cmd, args, { stdio: "ignore" }, () => resolve());
  });
}
