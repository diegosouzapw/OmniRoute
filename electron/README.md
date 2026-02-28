# OmniRoute Electron Desktop App

This directory contains the Electron desktop application wrapper for OmniRoute.

## Structure

```
electron/
├── main.js          # Main process (window management, IPC)
├── preload.js       # Preload script (secure bridge to renderer)
├── package.json     # Electron-specific dependencies
├── types.d.ts       # TypeScript definitions
└── assets/          # Application icons and resources
```

## Development

### Prerequisites

1. Build the Next.js app first:
```bash
npm run build
```

2. Install Electron dependencies:
```bash
cd electron
npm install
```

### Running in Development

1. Start the Next.js development server:
```bash
npm run dev
```

2. In another terminal, start Electron:
```bash
cd electron
npm run dev
```

### Running in Production Mode

1. Build Next.js in standalone mode:
```bash
npm run build
```

2. Start Electron:
```bash
cd electron
npm start
```

## Building

### Build for Current Platform
```bash
cd electron
npm run build
```

### Build for Specific Platforms

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## Output

Built applications are placed in `dist-electron/`:
- Windows: `.exe` installer (NSIS)
- macOS: `.dmg` installer
- Linux: `.AppImage`

## Features

- **System Tray Integration**: Minimize to tray, quick actions
- **Native Notifications**: Desktop notifications
- **Window Management**: Minimize, maximize, close
- **Auto-start**: Option to launch on system startup
- **Offline Support**: Local server bundled with the app

## Configuration

### Environment Variables

The Electron app respects these environment variables:
- `OMNIROUTE_PORT`: Server port (default: 20128)
- `NODE_ENV`: Set to 'production' for production builds

### Custom Icon

Place your icons in `assets/`:
- `icon.ico` - Windows icon (256x256)
- `icon.icns` - macOS icon bundle
- `icon.png` - Linux/general use (512x512)
- `tray-icon.png` - System tray icon (16x16 or 32x32)

## IPC Channels

| Channel | Direction | Description |
|---------|-----------|-------------|
| `get-app-info` | Renderer → Main | Get app name, version, platform |
| `open-external` | Renderer → Main | Open URL in default browser |
| `get-data-dir` | Renderer → Main | Get data directory path |
| `restart-server` | Renderer → Main | Restart the internal server |
| `server-status` | Main → Renderer | Server status updates |
| `port-changed` | Main → Renderer | Port change notifications |

## Security

- `contextIsolation: true` - Isolates renderer from Node.js
- `nodeIntegration: false` - No direct Node.js access in renderer
- Preload script validates IPC channels
- No remote code execution

## Troubleshooting

### App Won't Start

1. Check if port 20128 is available
2. Check logs in the console
3. Verify the build output exists

### White Screen

1. Verify Next.js build exists
2. Check the server URL in main.js
3. Check for console errors

### Build Fails

1. Ensure you have build tools installed:
   - Windows: Visual Studio Build Tools
   - macOS: Xcode Command Line Tools
   - Linux: build-essential, libsecret-1-dev

## License

MIT
