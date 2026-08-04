---
title: "Termux Headless Setup"
version: 3.8.49
lastUpdated: 2026-07-25
---

# Termux Headless Setup

OmniRoute can run as a headless server on Android through Termux. The Electron desktop app is not supported in Termux, but the web dashboard and OpenAI-compatible API work from the local browser or from other devices on the same network.

## Prerequisites

Install Termux from F-Droid or GitHub releases, then update packages and install the build tools required by native dependencies such as `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js version:** OmniRoute requires Node `>=22.22.2 <23 || >=24.0.0 <27` (matches `engines` in `package.json` / `SUPPORTED_NODE_RANGE`). Termux's `nodejs-lts` typically ships Node 20 LTS, which is **no longer supported** — install `pkg install nodejs` (current) instead and verify `node --version` reports a 22.x/24.x+ line.

If native package compilation fails, rerun the `pkg install` command above and then retry the OmniRoute install.

## Install

Run the latest published package directly:

```bash
npx -y omniroute@latest
```

You can also install it globally:

```bash
npm install -g omniroute
omniroute
```

## Run

Start OmniRoute in headless server mode:

```bash
omniroute
```

or:

```bash
npx omniroute
```

The dashboard listens on:

```text
http://localhost:20128
```

Open that URL in the Android browser. If you run clients inside Termux, use the same host and port as the OpenAI-compatible base URL.

## Background Execution

For a simple background process:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

To stop it:

```bash
pkill -f omniroute
```

For automatic startup after device boot, install the Termux:Boot add-on and create a boot script:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android battery optimization can stop long-running background processes. Disable battery optimization for Termux if the server is expected to stay online.

## Access From Other Devices

Find the phone IP address on the WiFi network:

```bash
ip addr show wlan0
```

Then open the dashboard from another device:

```text
http://PHONE_IP:20128
```

For example:

```text
http://192.168.1.50:20128
```

Keep the phone and client on the same trusted network. If you expose OmniRoute outside the phone, enable API keys and dashboard authentication.

## Data Directory

By default OmniRoute stores data under the Termux home directory, following the same server-side data path behavior used on Linux. To place the database somewhere explicit:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Limitations

- Electron does not run in Termux.
- There is no system tray or desktop integration.
- This setup is server-only: use the browser dashboard.
- Native dependencies may need local compilation.
- Low-memory Android devices may need fewer concurrent requests.
- MITM/system certificate features may require Android-level trust-store work outside Termux.

## Troubleshooting

### Unsupported platform: android (every request returns HTTP 500)

**Symptom:** `omniroute` / `omniroute serve` prints `✔ OmniRoute is running!`, but every dashboard or API request returns a bare `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` stays empty, `APP_LOG_LEVEL=debug` prints nothing useful, and the response body is plain text (`Internal Server Error`) with no JSON detail.

**Cause:** Some Termux/Node builds report `process.platform === "android"`. Next.js `getCacheDirectory()` does not handle that platform: it requires `~/.cache` (or a generic tmp dir) to _already_ exist, otherwise it fails while loading the instrumentation hook with:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Because the hook never loads, logging never starts — the 500 looks completely undiagnosable. OmniRoute creates `~/.cache` (and sets `XDG_CACHE_HOME` when unset) in the CLI entrypoint before Next.js starts so this probe succeeds on Android/Termux.

**Supported resolution (no package patching):**

```bash
mkdir -p ~/.cache
omniroute serve
```

On current OmniRoute builds the CLI does this automatically on Android/Termux — a fresh `npx -y omniroute@latest` / global install should not require the manual step. If you still see the error after upgrading, create `~/.cache` once as above and restart.

**Do not** patch `dist/server.js` to force `process.platform = "linux"`. That kind of package patch is overwritten on every reinstall/upgrade and is unnecessary once the cache directory exists.

### better-sqlite3 Build Errors

Install the Termux build toolchain:

```bash
pkg install nodejs python build-essential
```

Then rerun:

```bash
npx -y omniroute@latest
```

### Port Already In Use

Check what is listening on the default port:

```bash
ss -ltnp | grep 20128
```

Stop the old process:

```bash
pkill -f omniroute
```

### Dashboard Not Reachable From Another Device

Verify both devices are on the same WiFi network, then test from Termux:

```bash
curl http://localhost:20128
```

If local access works but LAN access does not, check Android hotspot/WiFi isolation and any firewall or VPN profile on the phone.
