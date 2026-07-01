import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { platform, totalmem } from "node:os";
import { t } from "../i18n.mjs";
import { writePidFile, cleanupPidFile, waitForServer } from "../utils/pid.mjs";
import { ServerSupervisor, detectMitmCrash } from "../runtime/processSupervisor.mjs";
import { isTermux } from "../../../scripts/build/postinstallSupport.mjs";
import {
  resolveMaxOldSpaceMb,
  calibrateHeapFallbackMb,
  buildServerNodeOptions,
  buildNodeHeapArgs,
} from "../../../scripts/build/runtime-env.mjs";
import { resolveTlsOptions } from "../../../scripts/dev/tls-options.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const _pkg = JSON.parse(readFileSync(join(__dirname, "..", "..", "..", "package.json"), "utf8"));

// URL scheme for the "OmniRoute is running" banner — flipped to https when
// opt-in TLS (#5242) is active. Process-scoped: one `serve` run = one scheme.
let urlScheme = "http";
const ROOT = join(__dirname, "..", "..", "..");
// The standalone bundle ships in `dist/` (since the build-output-isolation
// refactor). Fall back to the legacy `app/` location so an upgrade over a
// partially-replaced install — or a package built before the rename — still
// boots. Backward-compatible by design: every deployed runtime keeps its path.
const APP_DIR = existsSync(join(ROOT, "dist", "server.js"))
  ? join(ROOT, "dist")
  : join(ROOT, "app");

function parsePort(value, fallback) {
  const parsed = parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

export function registerServe(program) {
  program
    .command("serve", { isDefault: true })
    .description(t("serve.description"))
    .option("--port <port>", t("serve.port"))
    .option("--no-open", t("serve.no_open"))
    .option("--daemon", t("serve.daemon"))
    .option("--log", t("serve.log"))
    .option("--no-recovery", t("serve.no_recovery"))
    .option("--max-restarts <n>", t("serve.max_restarts"), parseInt, 2)
    .option("--tray", t("serve.tray") || "Show system tray icon (desktop only)")
    .option("--no-tray", t("serve.no_tray") || "Disable system tray icon")
    .option(
      "--tls-cert <path>",
      t("serve.tls_cert") ||
        "Path to a TLS certificate (PEM) to serve HTTPS (also OMNIROUTE_TLS_CERT)"
    )
    .option(
      "--tls-key <path>",
      t("serve.tls_key") ||
        "Path to the TLS private key (PEM) to serve HTTPS (also OMNIROUTE_TLS_KEY)"
    )
    .action(async (opts) => {
      await runServe(opts);
    });
}

export async function runServe(opts = {}) {
  const { isNativeBinaryCompatible } =
    await import("../../../scripts/build/native-binary-compat.mjs");
  const { getNodeRuntimeSupport, getNodeRuntimeWarning } =
    await import("../../nodeRuntimeSupport.mjs");

  const port = parsePort(opts.port ?? process.env.PORT ?? "20128", 20128);
  const apiPort = parsePort(process.env.API_PORT ?? String(port), port);
  const dashboardPort = parsePort(process.env.DASHBOARD_PORT ?? String(port), port);
  const noOpen = opts.open === false;

  console.log(`
\x1b[36m   ____                  _ ____              _
   / __ \\                (_) __ \\            | |
  | |  | |_ __ ___  _ __ _| |__) |___  _   _| |_ ___
  | |  | | '_ \` _ \\| '_ \\ |  _  // _ \\| | | | __/ _ \\
  | |__| | | | | | | | | | | | \\ \\ (_) | |_| | ||  __/
   \\____/|_| |_| |_|_| |_|_|_|  \\_\\___/ \\__,_|\\__\\___|
\x1b[0m`);
  console.log(`\x1b[2m  v${_pkg.version}\x1b[0m\n`);

  const nodeSupport = getNodeRuntimeSupport();
  if (!nodeSupport.nodeCompatible) {
    const runtimeWarning = getNodeRuntimeWarning() || "Unsupported Node.js runtime detected.";
    console.warn(`\x1b[33m  ⚠  Warning: You are running Node.js ${process.versions.node}.
     ${runtimeWarning}

     Supported secure runtimes: ${nodeSupport.supportedDisplay}
     Recommended: use Node.js ${nodeSupport.recommendedVersion} or newer on the 22.x LTS line.
     Workaround:  npm rebuild better-sqlite3
     Or run:      omniroute runtime repair  (rebuilds into a user-writable runtime; works without a C++ toolchain)\x1b[0m
`);
  }

  const serverWsJs = join(APP_DIR, "server-ws.mjs");
  const serverJs = existsSync(serverWsJs) ? serverWsJs : join(APP_DIR, "server.js");

  if (!existsSync(serverJs)) {
    console.error("\x1b[31m✖ Server not found at:\x1b[0m", serverJs);
    console.error("  The package may not have been built correctly.");
    console.error("");
    const nodeExec = process.execPath || "";
    const isMise = nodeExec.includes("mise") || nodeExec.includes(".local/share/mise");
    const isNvm = nodeExec.includes(".nvm") || nodeExec.includes("nvm");
    if (isMise) {
      console.error(
        "  \x1b[33m⚠ mise detected:\x1b[0m If you installed via `npm install -g omniroute`,"
      );
      console.error("    try: \x1b[36mnpx omniroute@latest\x1b[0m  (downloads a fresh copy)");
      console.error("    or:  \x1b[36mmise exec -- npx omniroute\x1b[0m");
    } else if (isNvm) {
      console.error(
        "  \x1b[33m⚠ nvm detected:\x1b[0m Try reinstalling after loading the correct Node version:"
      );
      console.error("    \x1b[36mnvm use --lts && npm install -g omniroute\x1b[0m");
    } else {
      console.error("  Try: \x1b[36mnpm install -g omniroute\x1b[0m  (reinstall)");
      console.error("  Or:  \x1b[36mnpx omniroute@latest\x1b[0m");
    }
    process.exit(1);
  }

  const sqliteBinary = join(
    APP_DIR,
    "node_modules",
    "better-sqlite3",
    "build",
    "Release",
    "better_sqlite3.node"
  );
  if (existsSync(sqliteBinary) && !isNativeBinaryCompatible(sqliteBinary)) {
    console.error(
      "\x1b[31m✖ better-sqlite3 native module is incompatible with this platform.\x1b[0m"
    );
    console.error(`  Run: cd ${APP_DIR} && npm rebuild better-sqlite3`);
    console.error(
      "  Or run: \x1b[36momniroute runtime repair\x1b[0m" +
        "  (rebuilds into a user-writable runtime; works without a C++ toolchain)"
    );
    if (platform() === "darwin") {
      console.error("  If build tools are missing: xcode-select --install");
    }
    process.exit(1);
  }

  console.log(`  \x1b[2m⏳ Starting server...\x1b[0m\n`);

  // #5172/#5160/#5152: default the V8 heap to ~35% of physical RAM (clamped
  // [512, 4096]) instead of a fixed 512MB, which OOM-crashed boxes with plenty
  // of RAM under load. An explicit OMNIROUTE_MEMORY_MB still wins.
  const memoryLimit = resolveMaxOldSpaceMb(
    process.env.OMNIROUTE_MEMORY_MB,
    calibrateHeapFallbackMb(totalmem())
  );

  // #5242: opt-in native HTTPS. CLI flags take precedence over env; the child
  // server (server-ws.mjs) reads these and terminates TLS on the same listener.
  const tlsCert = opts.tlsCert ?? process.env.OMNIROUTE_TLS_CERT;
  const tlsKey = opts.tlsKey ?? process.env.OMNIROUTE_TLS_KEY;

  const env = {
    ...process.env,
    OMNIROUTE_PORT: String(port),
    PORT: String(dashboardPort),
    DASHBOARD_PORT: String(dashboardPort),
    API_PORT: String(apiPort),
    HOSTNAME: process.env.HOSTNAME || "0.0.0.0",
    NODE_ENV: "production",
    // #5238: preserve a user-set NODE_OPTIONS (incl. their own
    // `--max-old-space-size=…`) instead of clobbering it with the calibrated
    // default — mirror the Electron/standalone launchers.
    NODE_OPTIONS: buildServerNodeOptions(process.env, memoryLimit),
    ...(tlsCert ? { OMNIROUTE_TLS_CERT: tlsCert } : {}),
    ...(tlsKey ? { OMNIROUTE_TLS_KEY: tlsKey } : {}),
  };

  // Validate the TLS pair up front so the operator sees a clear warning in the
  // CLI (the child re-validates authoritatively). Drives the banner scheme;
  // when null we fall through to identical plain-HTTP behavior as before.
  urlScheme = resolveTlsOptions(env) ? "https" : "http";

  const isDaemon = opts.daemon === true;
  const useTray = opts.tray === true;

  if (isDaemon) {
    return runDaemon(serverJs, env, memoryLimit, dashboardPort, apiPort);
  }

  if (opts.noRecovery) {
    return runWithoutRecovery(serverJs, env, memoryLimit, dashboardPort, apiPort, noOpen);
  }

  return runWithSupervisor(
    serverJs,
    env,
    memoryLimit,
    dashboardPort,
    apiPort,
    noOpen,
    opts.log === true,
    opts.maxRestarts ?? 2,
    useTray
  );
}

function runDaemon(serverJs, env, memoryLimit, dashboardPort, apiPort) {
  // #5238: skip the explicit CLI --max-old-space-size when the user pinned the
  // heap via NODE_OPTIONS (a CLI arg would shadow/override their value).
  const server = spawn("node", [...buildNodeHeapArgs(process.env, memoryLimit), serverJs], {
    cwd: APP_DIR,
    env,
    stdio: "ignore",
    detached: true,
  });
  writePidFile("server", server.pid);
  server.unref();
  console.log(`\x1b[32m✔ OmniRoute started in background (PID: ${server.pid})\x1b[0m`);
  console.log(`  \x1b[1mDashboard:\x1b[0m  ${urlScheme}://localhost:${dashboardPort}`);
  console.log(`  \x1b[1mAPI Base:\x1b[0m   ${urlScheme}://localhost:${apiPort}/v1`);
}

function runWithoutRecovery(serverJs, env, memoryLimit, dashboardPort, apiPort, noOpen) {
  // #5238: skip the explicit CLI --max-old-space-size when the user pinned the
  // heap via NODE_OPTIONS (a CLI arg would shadow/override their value).
  const server = spawn("node", [...buildNodeHeapArgs(process.env, memoryLimit), serverJs], {
    cwd: APP_DIR,
    env,
    stdio: "pipe",
  });

  writePidFile("server", server.pid);

  let started = false;

  server.stdout.on("data", (data) => {
    const text = data.toString();
    process.stdout.write(text);
    if (
      !started &&
      (text.includes("Ready") || text.includes("started") || text.includes("listening"))
    ) {
      started = true;
      onReady(dashboardPort, apiPort, noOpen);
    }
  });

  server.stderr.on("data", (data) => process.stderr.write(data));

  server.on("error", (err) => {
    console.error("\x1b[31m✖ Failed to start server:\x1b[0m", err.message);
    process.exit(1);
  });

  server.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`\x1b[31m✖ Server exited with code ${code}\x1b[0m`);
    }
    process.exit(code ?? 0);
  });

  const shutdown = () => {
    console.log("\n\x1b[33m⏹ Shutting down OmniRoute...\x1b[0m");
    cleanupPidFile("server");
    server.kill("SIGTERM");
    setTimeout(() => {
      server.kill("SIGKILL");
      process.exit(0);
    }, 5000);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  setTimeout(() => {
    if (!started) {
      started = true;
      onReady(dashboardPort, apiPort, noOpen);
    }
  }, 15000);
}

async function runWithSupervisor(
  serverJs,
  env,
  memoryLimit,
  dashboardPort,
  apiPort,
  noOpen,
  showLog,
  maxRestarts,
  useTray = false
) {
  if (showLog) process.env.OMNIROUTE_SHOW_LOG = "1";

  const supervisor = new ServerSupervisor({
    serverPath: serverJs,
    env,
    memoryLimit,
    maxRestarts,
    onCrashCallback: async (crashLog) => {
      if (detectMitmCrash(crashLog)) {
        try {
          const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
          const { updateSettings } = await import(`${PROJECT_ROOT}/src/lib/db/settings.ts`);
          updateSettings({ mitmEnabled: false });
        } catch {}
        return "disable-mitm-and-retry";
      }
      return null;
    },
  });

  supervisor.start();

  process.on("SIGINT", () => {
    killTrayIfActive();
    supervisor.stop();
  });
  process.on("SIGTERM", () => {
    killTrayIfActive();
    supervisor.stop();
  });

  if (!showLog) {
    waitForServer(dashboardPort, 60000).then(async (up) => {
      if (up) {
        if (useTray) await maybeStartTray(dashboardPort, apiPort, supervisor);
        onReady(dashboardPort, apiPort, noOpen);
      }
    });
  }
}

let _killTray = null;
function killTrayIfActive() {
  if (_killTray) {
    try {
      _killTray();
    } catch {}
    _killTray = null;
  }
}

async function maybeStartTray(port, apiPort, supervisor) {
  try {
    const { initTray, isTraySupported } = await import("../tray/index.mjs");
    if (!isTraySupported()) return;
    const { default: open } = await import("open").catch(() => ({ default: null }));
    const dashboardUrl = `${urlScheme}://localhost:${port}`;
    const tray = await initTray({
      port,
      onQuit: () => {
        killTrayIfActive();
        supervisor.stop();
      },
      onOpenDashboard: () => open?.(dashboardUrl),
      onShowLogs: () => {
        // In-place: open logs stream (best-effort)
        process.stdout.write(`[omniroute][tray] Logs at: ${dashboardUrl}/logs\n`);
      },
    });
    if (tray) {
      const { killTray } = await import("../tray/index.mjs");
      _killTray = killTray;
    }
  } catch (err) {
    // tray is optional — do not fail the server, but surface why it failed so
    // "--tray shows nothing" is diagnosable instead of silent (#4605).
    process.stderr.write(`[omniroute][tray] failed to start: ${err?.message ?? String(err)}\n`);
  }
}

async function onReady(dashboardPort, apiPort, noOpen) {
  const dashboardUrl = `${urlScheme}://localhost:${dashboardPort}`;
  const apiUrl = `${urlScheme}://localhost:${apiPort}`;

  console.log(`
  \x1b[32m✔ OmniRoute is running!\x1b[0m

  \x1b[1m  Dashboard:\x1b[0m  ${dashboardUrl}
  \x1b[1m  API Base:\x1b[0m   ${apiUrl}/v1

  \x1b[2m  Point your CLI tool (Cursor, Cline, Codex) to:\x1b[0m
  \x1b[33m  ${apiUrl}/v1\x1b[0m

  \x1b[2m  Press Ctrl+C to stop\x1b[0m
  `);

  if (!noOpen && !isTermux()) {
    try {
      const open = await import("open");
      await open.default(dashboardUrl);
    } catch {
      // open is optional — skip if unavailable
    }
  }
}
