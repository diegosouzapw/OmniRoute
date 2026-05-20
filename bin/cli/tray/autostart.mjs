import { existsSync, writeFileSync, unlinkSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const APP_LABEL = "com.omniroute.autostart";
const WIN_REG_VALUE = "OmniRoute";

function resolveCliPath() {
  return (
    process.argv[1] || join(dirname(fileURLToPath(import.meta.url)), "..", "..", "omniroute.mjs")
  );
}

export function enable() {
  if (process.platform === "darwin") return enableMac();
  if (process.platform === "win32") return enableWin();
  if (process.platform === "linux") return enableLinux();
  return false;
}

export function disable() {
  if (process.platform === "darwin") return disableMac();
  if (process.platform === "win32") return disableWin();
  if (process.platform === "linux") return disableLinux();
  return false;
}

export function isAutostartEnabled() {
  if (process.platform === "darwin") return isEnabledMac();
  if (process.platform === "win32") return isEnabledWin();
  if (process.platform === "linux") return isEnabledLinux();
  return false;
}

function enableMac() {
  const plistDir = join(homedir(), "Library", "LaunchAgents");
  mkdirSync(plistDir, { recursive: true });
  const plistPath = join(plistDir, `${APP_LABEL}.plist`);
  const cliPath = resolveCliPath();
  const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${APP_LABEL}</string>
  <key>ProgramArguments</key><array>
    <string>${process.execPath}</string>
    <string>${cliPath}</string>
    <string>serve</string>
    <string>--tray</string>
    <string>--no-open</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><false/>
</dict></plist>`;
  writeFileSync(plistPath, plist, { mode: 0o644 });
  try {
    execSync("launchctl load -w " + JSON.stringify(plistPath), { stdio: "ignore" });
  } catch {}
  return existsSync(plistPath);
}

function disableMac() {
  const plistPath = join(homedir(), "Library", "LaunchAgents", `${APP_LABEL}.plist`);
  try {
    execSync("launchctl unload -w " + JSON.stringify(plistPath), { stdio: "ignore" });
  } catch {}
  try {
    unlinkSync(plistPath);
  } catch {}
  return !existsSync(plistPath);
}

function isEnabledMac() {
  return existsSync(join(homedir(), "Library", "LaunchAgents", `${APP_LABEL}.plist`));
}

function enableWin() {
  const cliPath = resolveCliPath();
  const value = `"${process.execPath}" "${cliPath}" serve --tray --no-open`;
  try {
    execSync(
      `reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v ${WIN_REG_VALUE} /t REG_SZ /d "${value}" /f`,
      { stdio: "ignore", windowsHide: true }
    );
    return true;
  } catch {
    return false;
  }
}

function disableWin() {
  try {
    execSync(
      `reg delete HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v ${WIN_REG_VALUE} /f`,
      { stdio: "ignore", windowsHide: true }
    );
    return true;
  } catch {
    return false;
  }
}

function isEnabledWin() {
  try {
    const out = execSync(
      `reg query HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v ${WIN_REG_VALUE}`,
      { stdio: "pipe", windowsHide: true, encoding: "utf8" }
    );
    return out.includes(WIN_REG_VALUE);
  } catch {
    return false;
  }
}

function enableLinux() {
  const dir = join(homedir(), ".config", "autostart");
  mkdirSync(dir, { recursive: true });
  const cliPath = resolveCliPath();
  const desktop =
    [
      "[Desktop Entry]",
      "Type=Application",
      "Name=OmniRoute",
      "Comment=AI proxy router with auto fallback",
      `Exec=${process.execPath} ${cliPath} serve --tray --no-open`,
      "Terminal=false",
      "Hidden=false",
      "X-GNOME-Autostart-enabled=true",
    ].join("\n") + "\n";
  writeFileSync(join(dir, "omniroute.desktop"), desktop, { mode: 0o644 });
  return true;
}

function disableLinux() {
  const desktopPath = join(homedir(), ".config", "autostart", "omniroute.desktop");
  try {
    unlinkSync(desktopPath);
    return true;
  } catch {
    return false;
  }
}

function isEnabledLinux() {
  return existsSync(join(homedir(), ".config", "autostart", "omniroute.desktop"));
}
