import { execFile } from "node:child_process";
import { t } from "../i18n.mjs";

export function registerDashboard(program) {
  program
    .command("dashboard")
    .description(t("dashboard.description"))
    .option("--url", t("dashboard.urlOnly"))
    .option("--port <port>", "Port the server is running on", "20128")
    .option("--tui", t("dashboard.tui") || "Open interactive TUI dashboard (terminal UI)")
    .action(async (opts, cmd) => {
      if (opts.tui) {
        const globalOpts = cmd.optsWithGlobals();
        const port = opts.port ? parseInt(String(opts.port), 10) : 20128;
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
  const port = opts.port ? parseInt(String(opts.port), 10) : 20128;
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

function openFallback(url) {
  return new Promise((resolve) => {
    const { platform } = process;
    let cmd, args;

    if (platform === "darwin") {
      cmd = "open";
      args = [url];
    } else if (platform === "win32") {
      cmd = "cmd";
      args = ["/c", "start", "", url];
    } else {
      cmd = "xdg-open";
      args = [url];
    }

    execFile(cmd, args, { stdio: "ignore" }, () => resolve());
  });
}
