/**
 * OmniRoute Electron Desktop App - Main Process
 *
 * This is the entry point for the Electron desktop application.
 * It manages the main window, system tray, server lifecycle, and IPC communication.
 *
 * Code Review Fixes Applied:
 * #1  Server readiness — wait for health check before loading window
 * #2  Restart timeout — 5s timeout + SIGKILL to prevent hanging
 * #3  changePort — stop + restart server on new port
 * #4  Tray cleanup — destroy old tray before recreating
 * #5  Emit server-status/port-changed IPC events
 * #8  Removed dead isProduction variable
 * #9  Platform-conditional titleBarStyle
 * #10 stdio: pipe + stdout/stderr capture for readiness detection
 * #14 Removed dead omniroute:// protocol (no handler existed)
 * #15 Content Security Policy via session headers
 */

const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  nativeImage,
  shell,
  session,
  Notification,
} = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");
const { autoUpdater } = require("electron-updater");

// ── Single Instance Lock ───────────────────────────────────
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
});

// ── Environment Detection ──────────────────────────────────
const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

// ── Paths ──────────────────────────────────────────────────
const APP_PATH = app.getAppPath();
const RESOURCES_PATH = !isDev ? process.resourcesPath : APP_PATH;
const NEXT_SERVER_PATH = path.join(RESOURCES_PATH, "app");

// ── State ──────────────────────────────────────────────────
let mainWindow = null;
let tray = null;
let nextServer = null;
let serverPort = 20128;
let isServerStopped = false;

const getServerUrl = () => `http://localhost:${serverPort}`;

function resolveNodeExecutable(env = process.env) {
  // #1081: Ensure Next.js standalone runs using Electron's Node runtime
  // instead of a randomly found system Node to prevent ABI architecture mismatches.
  return process.execPath;
}

function resolveServerNodePath(env = process.env) {
  const seen = new Set();
  const entries = [];

  const addEntry = (entry) => {
    if (!entry || typeof entry !== "string") return;
    const trimmed = entry.trim();
    if (!trimmed) return;
    const normalized = path.normalize(trimmed);
    if (seen.has(normalized)) return; // already included
    if (!fs.existsSync(normalized)) {
      console.debug("[Electron] NODE_PATH candidate not found (skipped):", normalized);
      return;
    }
    seen.add(normalized);
    entries.push(normalized);
  };

  for (const existing of (env.NODE_PATH || "").split(path.delimiter)) {
    addEntry(existing);
  }

  // Electron-builder installs native modules like better-sqlite3 under
  // app.asar.unpacked, while the standalone bundle still carries helper deps
  // such as bindings/file-uri-to-path inside resources/app/node_modules.
  addEntry(path.join(process.resourcesPath, "app.asar.unpacked", "node_modules"));
  addEntry(path.join(NEXT_SERVER_PATH, "node_modules"));

  return entries.join(path.delimiter);
}

function resolveDataDir(overridePath, env = process.env) {
  if (overridePath && overridePath.trim()) return path.resolve(overridePath);

  const configured = env.DATA_DIR?.trim();
  if (configured) return path.resolve(configured);

  if (process.platform === "win32") {
    const appData = env.APPDATA || path.join(require("os").homedir(), "AppData", "Roaming");
    return path.join(appData, "omniroute");
  }

  const xdg = env.XDG_CONFIG_HOME?.trim();
  if (xdg) return path.join(path.resolve(xdg), "omniroute");

  return path.join(require("os").homedir(), ".omniroute");
}

function getPreferredEnvFilePath(env = process.env) {
  const candidates = [];

  if (env.DATA_DIR?.trim()) {
    candidates.push(path.join(path.resolve(env.DATA_DIR.trim()), ".env"));
  }

  candidates.push(path.join(resolveDataDir(null, env), ".env"));
  candidates.push(path.join(process.cwd(), ".env"));

  return candidates.find((filePath) => fs.existsSync(filePath)) || null;
}

function hasEncryptedCredentials(dbPath) {
  if (!fs.existsSync(dbPath)) return false;

  try {
    const Database = require("better-sqlite3");
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });
    try {
      const row = db
        .prepare(
          `SELECT 1
             FROM provider_connections
            WHERE access_token LIKE 'enc:v1:%'
               OR refresh_token LIKE 'enc:v1:%'
               OR api_key LIKE 'enc:v1:%'
               OR id_token LIKE 'enc:v1:%'
            LIMIT 1`
        )
        .get();
      return !!row;
    } finally {
      db.close();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to inspect existing database at ${dbPath}: ${message}`);
  }
}

// ── Auto-Updater Configuration ──────────────────────────────
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.logger = console;

// ── Helper: Send IPC event to renderer (#5) ────────────────
function sendToRenderer(channel, data) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, data);
  }
}

// ── Helper: Wait for server readiness (#1, #10) ────────────
async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return true;
    } catch {
      /* server not ready yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  console.warn("[Electron] Server readiness timeout — showing window anyway");
  return false;
}

// ── Helper: Wait for server process exit with timeout (#2) ─
async function waitForServerExit(proc, timeoutMs = 5000) {
  if (!proc) return;
  await Promise.race([
    new Promise((r) => proc.once("exit", r)),
    new Promise((r) =>
      setTimeout(() => {
        try {
          proc.kill("SIGKILL");
        } catch {
          /* already dead */
        }
        r();
      }, timeoutMs)
    ),
  ]);
}

// ── Auto-Updater Event Handlers ─────────────────────────────
function setupAutoUpdater() {
  autoUpdater.on("checking-for-update", () => {
    sendToRenderer("update-status", { status: "checking" });
    console.log("[Electron] Checking for updates...");
  });

  autoUpdater.on("update-available", (info) => {
    sendToRenderer("update-status", { status: "available", version: info.version });
    console.log("[Electron] Update available:", info.version);
  });

  autoUpdater.on("update-not-available", (info) => {
    sendToRenderer("update-status", { status: "not-available", version: info.version });
    console.log("[Electron] No update available");
  });

  autoUpdater.on("download-progress", (progress) => {
    sendToRenderer("update-status", {
      status: "downloading",
      percent: Math.round(progress.percent),
      transferred: progress.transferred,
      total: progress.total,
    });
  });

  autoUpdater.on("update-downloaded", (info) => {
    sendToRenderer("update-status", { status: "downloaded", version: info.version });
    console.log("[Electron] Update downloaded:", info.version);

    if (Notification.isSupported()) {
      const notification = new Notification({
        title: "OmniRoute Update Ready",
        body: `Version ${info.version} is ready to install. Click to restart.`,
      });
      notification.on("click", () => {
        autoUpdater.quitAndInstall();
      });
      notification.show();
    }
  });

  autoUpdater.on("error", (error) => {
    sendToRenderer("update-status", { status: "error", message: error.message });
    console.error("[Electron] Update error:", error);
  });
}

async function checkForUpdates(silent = false) {
  if (isDev) {
    console.log("[Electron] Dev mode — skipping auto-update");
    if (!silent) {
      sendToRenderer("update-status", { status: "error", message: "Updates disabled in dev mode" });
    }
    return;
  }
  await autoUpdater.checkForUpdates();
}

async function downloadUpdate() {
  await autoUpdater.downloadUpdate();
}

function installUpdate() {
  if (nextServer) {
    nextServer.kill("SIGTERM");
    nextServer = null;
  }
  autoUpdater.quitAndInstall();
}

// ── Content Security Policy (#15) ──────────────────────────
function setupContentSecurityPolicy() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";
    const csp = [
      "default-src 'self'",
      `connect-src 'self' http://localhost:* ws://localhost:* https://*.omniroute.online https://*.omniroute.dev`,
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self'",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ");

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [csp],
      },
    });
  });
}

// ── Create Window ──────────────────────────────────────────
function createWindow() {
  // Platform-conditional options (#9)
  const platformWindowOptions =
    process.platform === "darwin"
      ? { titleBarStyle: "hiddenInset", trafficLightPosition: { x: 16, y: 16 } }
      : { titleBarStyle: "default" };

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: "OmniRoute",
    icon: path.join(RESOURCES_PATH, "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
    show: false,
    backgroundColor: "#0a0a0a",
    ...platformWindowOptions,
  });

  // Load the Next.js app
  mainWindow.loadURL(getServerUrl());
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Handle external links — validate URL protocol to prevent RCE
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const parsedUrl = new URL(url);
      if (["http:", "https:"].includes(parsedUrl.protocol)) {
        shell.openExternal(url);
      } else {
        console.warn("[Electron] Blocked unsafe protocol:", parsedUrl.protocol);
      }
    } catch {
      console.error("[Electron] Blocked invalid URL:", url);
    }
    return { action: "deny" };
  });

  // Handle window close — minimize to tray
  mainWindow.on("close", (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// ── System Tray ────────────────────────────────────────────
function createTray() {
  // Fix #4: Destroy old tray before recreating
  if (tray) {
    tray.destroy();
    tray = null;
  }

  const iconPath = path.join(RESOURCES_PATH, "assets", "tray-icon.png");
  let icon;
  try {
    icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) icon = nativeImage.createEmpty();
  } catch {
    icon = nativeImage.createEmpty();
  }

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open OmniRoute",
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      },
    },
    {
      label: "Open Dashboard",
      click: () => shell.openExternal(getServerUrl()),
    },
    { type: "separator" },
    {
      label: "Server Port",
      submenu: [
        { label: `Port: ${serverPort}`, enabled: false },
        { type: "separator" },
        { label: "20128", click: () => changePort(20128) },
        { label: "3000", click: () => changePort(3000) },
        { label: "8080", click: () => changePort(8080) },
      ],
    },
    { type: "separator" },
    {
      label: "Check for Updates",
      click: () => checkForUpdates(false),
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("OmniRoute");
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

// ── Change Port (#3: now restarts server) ──────────────────
async function changePort(newPort) {
  if (newPort === serverPort) return;

  const oldPort = serverPort;
  serverPort = newPort;

  sendToRenderer("server-status", { status: "restarting", port: newPort });

  // Stop current server and wait for exit
  const serverToStop = nextServer;
  stopNextServer();
  await waitForServerExit(serverToStop);

  // Start server on new port
  startNextServer();
  await waitForServer(getServerUrl());

  // Reload window and update tray
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.loadURL(getServerUrl());
  }
  createTray();

  sendToRenderer("port-changed", serverPort);
  sendToRenderer("server-status", { status: "running", port: serverPort });
  console.log(`[Electron] Port changed: ${oldPort} → ${serverPort}`);
}

// ── Server Lifecycle (#1, #5, #10) ─────────────────────────
function startNextServer() {
  if (isDev) {
    console.log("[Electron] Dev mode — connect to existing Next.js server");
    sendToRenderer("server-status", { status: "running", port: serverPort });
    return;
  }

  const serverScript = path.join(NEXT_SERVER_PATH, "server.js");
  if (!fs.existsSync(serverScript)) {
    console.error("[Electron] Server script not found:", serverScript);
    sendToRenderer("server-status", { status: "error", port: serverPort });
    return;
  }

  // ── Zero-config bootstrap: auto-generate required secrets ─────────────────
  // Electron uses CJS — cannot dynamically import ESM bootstrap-env.mjs.
  // This mirrors bootstrap-env.mjs logic synchronously:
  //   1. Read persisted secrets from the resolved DATA_DIR/server.env
  //   2. Generate missing secrets with crypto.randomBytes()
  //   3. Persist back to DATA_DIR/server.env for future restarts
  const crypto = require("crypto");

  // Parse a simple KEY=VALUE file
  function parseEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const env = {};
    for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq < 1) continue;
      env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
    }
    return env;
  }

  const preferredEnvPath = getPreferredEnvFilePath(process.env);
  const preferredEnv = preferredEnvPath ? parseEnvFile(preferredEnvPath) : {};
  const dataDir = resolveDataDir(null, { ...preferredEnv, ...process.env });
  const serverEnvPath = path.join(dataDir, "server.env");
  const persisted = parseEnvFile(serverEnvPath);
  const serverEnv = { ...persisted, ...preferredEnv, ...process.env };
  let changed = false;

  if (!serverEnv.JWT_SECRET) {
    serverEnv.JWT_SECRET = persisted.JWT_SECRET = crypto.randomBytes(64).toString("hex");
    changed = true;
    console.log("[Electron] ✨ JWT_SECRET auto-generated");
  }
  if (!serverEnv.STORAGE_ENCRYPTION_KEY) {
    if (hasEncryptedCredentials(path.join(dataDir, "storage.sqlite"))) {
      console.error(
        `[Electron] Refusing to auto-generate STORAGE_ENCRYPTION_KEY: encrypted credentials already exist in ${path.join(
          dataDir,
          "storage.sqlite"
        )}. Restore the key via ${preferredEnvPath || "an appropriate .env file"}, ${serverEnvPath}, or process.env.`
      );
      sendToRenderer("server-status", { status: "error", port: serverPort });
      return;
    }
    serverEnv.STORAGE_ENCRYPTION_KEY = persisted.STORAGE_ENCRYPTION_KEY = crypto
      .randomBytes(32)
      .toString("hex");
    serverEnv.STORAGE_ENCRYPTION_KEY_VERSION = persisted.STORAGE_ENCRYPTION_KEY_VERSION = "v1";
    changed = true;
    console.log("[Electron] ✨ STORAGE_ENCRYPTION_KEY auto-generated");
  }
  if (!serverEnv.API_KEY_SECRET) {
    serverEnv.API_KEY_SECRET = persisted.API_KEY_SECRET = crypto.randomBytes(32).toString("hex");
    changed = true;
    console.log("[Electron] ✨ API_KEY_SECRET auto-generated");
  }
  if (changed) {
    serverEnv.OMNIROUTE_BOOTSTRAPPED = "true";
    try {
      fs.mkdirSync(dataDir, { recursive: true });
      const lines = [
        "# Auto-generated by OmniRoute bootstrap",
        "",
        ...Object.entries(persisted).map(([k, v]) => `${k}=${v}`),
        "",
      ];
      fs.writeFileSync(serverEnvPath, lines.join("\n"), "utf8");
      console.log("[Electron] 📁 Secrets persisted to:", serverEnvPath);
    } catch (e) {
      console.warn("[Electron] Could not persist secrets:", e.message);
    }
  }

  const nodeExecutable = resolveNodeExecutable(serverEnv);

  console.log("[Electron] Starting Next.js server on port", serverPort);
  console.log("[Electron] Using Node executable:", nodeExecutable);
  sendToRenderer("server-status", { status: "starting", port: serverPort });

  // Fix #10: Use pipe instead of inherit for logging & readiness detection
  nextServer = spawn(nodeExecutable, [serverScript], {
    cwd: NEXT_SERVER_PATH,
    env: {
      ...serverEnv,
      DATA_DIR: dataDir,
      PORT: String(serverPort),
      NODE_ENV: "production",
      ELECTRON_RUN_AS_NODE: "1",
      NODE_PATH: resolveServerNodePath(serverEnv),
    },
    stdio: "pipe",
  });

  // Capture server output for logging
  nextServer.stdout?.on("data", (data) => {
    const text = data.toString();
    process.stdout.write(`[Server] ${text}`);

    // Detect server ready
    if (text.includes("Ready") || text.includes("started") || text.includes("listening")) {
      sendToRenderer("server-status", { status: "running", port: serverPort });
    }
  });

  nextServer.stderr?.on("data", (data) => {
    process.stderr.write(`[Server:err] ${data}`);
  });

  nextServer.on("error", (err) => {
    console.error("[Electron] Failed to start server:", err);
    sendToRenderer("server-status", { status: "error", port: serverPort });
  });

  nextServer.on("exit", (code) => {
    console.log("[Electron] Server exited with code:", code);
    sendToRenderer("server-status", { status: "stopped", port: serverPort });
    nextServer = null;
  });
}

function stopNextServer() {
  if (nextServer) {
    nextServer.kill("SIGTERM");
    nextServer = null;
  }
}

// ── IPC Handlers ───────────────────────────────────────────
function setupIpcHandlers() {
  ipcMain.handle("get-app-info", () => ({
    name: app.getName(),
    version: app.getVersion(),
    platform: process.platform,
    isDev,
    port: serverPort,
  }));

  ipcMain.handle("open-external", (_event, url) => {
    try {
      const parsedUrl = new URL(url);
      if (["http:", "https:"].includes(parsedUrl.protocol)) {
        shell.openExternal(url);
      }
    } catch {
      console.error("[Electron] Blocked invalid URL:", url);
    }
  });

  ipcMain.handle("get-data-dir", () => app.getPath("userData"));

  // Fix #2: Add timeout to restart
  ipcMain.handle("restart-server", async () => {
    const serverToStop = nextServer;
    stopNextServer();
    await waitForServerExit(serverToStop);
    startNextServer();
    await waitForServer(getServerUrl());
    return { success: true };
  });

  // Window controls
  ipcMain.on("window-minimize", () => mainWindow?.minimize());

  ipcMain.on("window-maximize", () => {
    if (mainWindow) {
      mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    }
  });

  ipcMain.on("window-close", () => mainWindow?.close());

  // Auto-update IPC handlers
  ipcMain.handle("check-for-updates", async () => {
    try {
      await checkForUpdates(false);
      return { success: true };
    } catch (error) {
      console.error("[Electron] Check for updates failed:", error);
      sendToRenderer("update-status", { status: "error", message: error.message });
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("download-update", async () => {
    try {
      await downloadUpdate();
      return { success: true };
    } catch (error) {
      console.error("[Electron] Download update failed:", error);
      sendToRenderer("update-status", { status: "error", message: error.message });
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("install-update", () => {
    installUpdate();
    // No return value — app will quit and restart
  });

  ipcMain.handle("get-app-version", () => app.getVersion());
}

// ── App Lifecycle ──────────────────────────────────────────
app.whenReady().then(async () => {
  // Fix #15: Set up CSP before any content loads
  setupContentSecurityPolicy();

  // Fix #1: Start server and WAIT for readiness before showing window
  startNextServer();
  if (!isDev) {
    await waitForServer(getServerUrl());
  }

  createWindow();
  createTray();
  setupIpcHandlers();
  setupAutoUpdater();

  // Check for updates after a short delay (don't block startup)
  if (!isDev) {
    setTimeout(() => {
      checkForUpdates(true);
    }, 3000);
  }

  // macOS: recreate window when dock icon clicked
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

// Quit when all windows closed (except macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Clean up before quit
app.on("before-quit", async (event) => {
  if (nextServer && !isServerStopped) {
    event.preventDefault(); // Stop immediate quit
    app.isQuitting = true;

    // Stop server and wait up to 5s for graceful WAL checkpoint
    const serverToStop = nextServer;
    stopNextServer();
    await waitForServerExit(serverToStop, 5000);

    isServerStopped = true;
    app.quit(); // Resume quit safely
  } else {
    app.isQuitting = true;
  }
});

// Global error handlers
process.on("uncaughtException", (error) => {
  console.error("[Electron] Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("[Electron] Unhandled Rejection:", reason);
});
