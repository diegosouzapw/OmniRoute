/**
 * OmniRoute Electron Desktop App - Main Process
 * 
 * This is the entry point for the Electron desktop application.
 * It manages the main window, system tray, and IPC communication.
 */

const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

// Environment detection
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const isProduction = !isDev;

// Paths
const APP_PATH = app.getAppPath();
const RESOURCES_PATH = isProduction ? process.resourcesPath : APP_PATH;
const NEXT_SERVER_PATH = path.join(RESOURCES_PATH, 'app');

// State
let mainWindow = null;
let tray = null;
let nextServer = null;
let serverPort = 20128;

// Server URL
const getServerUrl = () => `http://localhost:${serverPort}`;

/**
 * Create the main application window
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'OmniRoute',
    icon: path.join(RESOURCES_PATH, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
    show: false,
    backgroundColor: '#0a0a0a',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
  });

  // Load the Next.js app
  if (isDev) {
    mainWindow.loadURL(getServerUrl());
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadURL(getServerUrl());
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle window close
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Create system tray icon
 */
function createTray() {
  const iconPath = path.join(RESOURCES_PATH, 'assets', 'tray-icon.png');
  let icon;
  
  try {
    icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) {
      icon = nativeImage.createEmpty();
    }
  } catch {
    icon = nativeImage.createEmpty();
  }

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open OmniRoute',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      },
    },
    {
      label: 'Open Dashboard',
      click: () => {
        shell.openExternal(getServerUrl());
      },
    },
    { type: 'separator' },
    {
      label: 'Server Port',
      submenu: [
        { label: `Port: ${serverPort}`, enabled: false },
        { type: 'separator' },
        { label: '20128', click: () => changePort(20128) },
        { label: '3000', click: () => changePort(3000) },
        { label: '8080', click: () => changePort(8080) },
      ],
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip('OmniRoute');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

/**
 * Change the server port
 */
function changePort(port) {
  if (port === serverPort) return;
  serverPort = port;
  if (mainWindow) {
    mainWindow.loadURL(getServerUrl());
  }
  createTray();
}

/**
 * Start the Next.js server (production mode)
 */
function startNextServer() {
  if (isDev) {
    console.log('Development mode: Connect to existing Next.js server');
    return;
  }

  const serverScript = path.join(NEXT_SERVER_PATH, 'server.js');
  
  if (!fs.existsSync(serverScript)) {
    console.error('Server script not found:', serverScript);
    return;
  }

  console.log('Starting Next.js server...');
  
  nextServer = spawn('node', [serverScript], {
    cwd: NEXT_SERVER_PATH,
    env: {
      ...process.env,
      PORT: String(serverPort),
      NODE_ENV: 'production',
    },
    stdio: 'inherit',
  });

  nextServer.on('error', (err) => {
    console.error('Failed to start server:', err);
  });

  nextServer.on('exit', (code) => {
    console.log('Server exited with code:', code);
  });
}

/**
 * Stop the Next.js server
 */
function stopNextServer() {
  if (nextServer) {
    nextServer.kill();
    nextServer = null;
  }
}

/**
 * IPC Handlers
 */
function setupIpcHandlers() {
  // Get app info
  ipcMain.handle('get-app-info', () => ({
    name: app.getName(),
    version: app.getVersion(),
    platform: process.platform,
    isDev,
    port: serverPort,
  }));

  // Open external URL
  ipcMain.handle('open-external', (event, url) => {
    shell.openExternal(url);
  });

  // Get data directory
  ipcMain.handle('get-data-dir', () => {
    const home = require('os').homedir();
    return path.join(home, '.omniroute');
  });

  // Restart server
  ipcMain.handle('restart-server', async () => {
    stopNextServer();
    await new Promise(resolve => setTimeout(resolve, 1000));
    startNextServer();
    return { success: true };
  });
}

// App lifecycle events
app.whenReady().then(() => {
  startNextServer();
  createWindow();
  createTray();
  setupIpcHandlers();

  // macOS: recreate window when dock icon clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Clean up before quit
app.on('before-quit', () => {
  app.isQuitting = true;
  stopNextServer();
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
