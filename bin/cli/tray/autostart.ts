import { existsSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { join, dirname, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir, platform } from "node:os";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_NAME = "omniroute";
const APP_LABEL = "com.omniroute.autostart";

function resolveCliPath(): string | null {
  if (
    process.argv[1] &&
    basename(process.argv[1]) === "omniroute.mjs" &&
    existsSync(process.argv[1])
  ) {
    return resolve(process.argv[1]);
  }
  // autostart.ts lives at bin/cli/tray/ → walk up to bin/omniroute.mjs
  const guess = resolve(__dirname, "..", "..", "omniroute.mjs");
  return existsSync(guess) ? guess : null;
}

export async function enableAutoStart(): Promise<boolean> {
  const cliPath = resolveCliPath();
  if (!cliPath) return false;
  switch (platform()) {
    case "darwin":
      return enableMacOS(cliPath);
    case "linux":
      return enableLinux(cliPath);
    case "win32":
      return enableWindows(cliPath);
    default:
      return false;
  }
}

export async function disableAutoStart(): Promise<boolean> {
  switch (platform()) {
    case "darwin":
      return disableMacOS();
    case "linux":
      return disableLinux();
    case "win32":
      return disableWindows();
    default:
      return false;
  }
}

export async function isAutoStartEnabled(): Promise<boolean> {
  switch (platform()) {
    case "darwin":
      return existsSync(macPlistPath());
    case "linux":
      return existsSync(linuxDesktopPath());
    case "win32":
      return windowsRegistryHasKey();
    default:
      return false;
  }
}

function macPlistPath(): string {
  return join(homedir(), "Library", "LaunchAgents", `${APP_LABEL}.plist`);
}

function enableMacOS(cliPath: string): boolean {
  const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${APP_LABEL}</string>
  <key>ProgramArguments</key><array><string>/usr/bin/env</string><string>node</string><string>${cliPath}</string><string>--tray</string></array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><false/>
</dict></plist>`;
  const path = macPlistPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, plist, "utf-8");
  try {
    execSync(`launchctl load -w "${path}"`);
  } catch {
    // non-fatal — file was written, launchctl may fail in CI
  }
  return true;
}

function disableMacOS(): boolean {
  const path = macPlistPath();
  if (!existsSync(path)) return true;
  try {
    execSync(`launchctl unload "${path}"`);
  } catch {
    // non-fatal
  }
  try {
    unlinkSync(path);
  } catch {
    // non-fatal
  }
  return true;
}

function linuxDesktopPath(): string {
  return join(homedir(), ".config", "autostart", `${APP_NAME}.desktop`);
}

function enableLinux(cliPath: string): boolean {
  const desktop = `[Desktop Entry]
Type=Application
Name=OmniRoute
Exec=node "${cliPath}" --tray
X-GNOME-Autostart-enabled=true
NoDisplay=false
`;
  const path = linuxDesktopPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, desktop, "utf-8");
  return true;
}

function disableLinux(): boolean {
  const path = linuxDesktopPath();
  if (existsSync(path)) unlinkSync(path);
  return true;
}

function enableWindows(cliPath: string): boolean {
  try {
    const cmd = `node "${cliPath}" --tray`;
    execSync(
      `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v ${APP_NAME} /t REG_SZ /d "${cmd}" /f`,
      { windowsHide: true }
    );
    return true;
  } catch {
    return false;
  }
}

function disableWindows(): boolean {
  try {
    execSync(
      `reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v ${APP_NAME} /f`,
      { windowsHide: true }
    );
  } catch {
    // already absent — treat as success
  }
  return true;
}

function windowsRegistryHasKey(): boolean {
  try {
    const out = execSync(
      `reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v ${APP_NAME}`,
      { windowsHide: true, stdio: ["ignore", "pipe", "ignore"] }
    ).toString();
    return out.includes(APP_NAME);
  } catch {
    return false;
  }
}
