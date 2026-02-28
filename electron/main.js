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
} = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

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

const getServerUrl = () => `http://localhost:${serverPort}`;

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

// ── Content Security Policy (#15) ──────────────────────────
function setupContentSecurityPolicy() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = [
      "default-src 'self'",
      `connect-src 'self' http://localhost:* ws://localhost:* https://*.omniroute.online https://*.omniroute.dev`,
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self'",
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

  console.log("[Electron] Starting Next.js server on port", serverPort);
  sendToRenderer("server-status", { status: "starting", port: serverPort });

  // Fix #10: Use pipe instead of inherit for logging & readiness detection
  nextServer = spawn("node", [serverScript], {
    cwd: NEXT_SERVER_PATH,
    env: {
      ...process.env,
      PORT: String(serverPort),
      NODE_ENV: "production",
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
app.on("before-quit", () => {
  app.isQuitting = true;
  stopNextServer();
});

// Global error handlers
process.on("uncaughtException", (error) => {
  console.error("[Electron] Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("[Electron] Unhandled Rejection:", reason);
});
