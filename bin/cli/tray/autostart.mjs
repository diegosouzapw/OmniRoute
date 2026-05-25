import { existsSync, writeFileSync, unlinkSync, mkdirSync, realpathSync } from "node:fs";
import { execSync } from "node:child_process";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const APP_LABEL = "com.omniroute.autostart";
const WIN_REG_VALUE = "OmniRoute";
const LINUX_SERVICE_NAME = "omniroute.service";
const LINUX_DESKTOP_NAME = "omniroute.desktop";

function resolveCliPath() {
  const candidates = [];
  if (process.argv[1]) candidates.push(process.argv[1]);
  try {
    const which = execSync("command -v omniroute 2>/dev/null", { encoding: "utf8" }).trim();
    if (which) candidates.push(which);
  } catch {
    // command -v unavailable
  }
  candidates.push(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "omniroute.mjs"));

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const resolved = realpathSync(candidate);
      if (resolved.endsWith("omniroute.mjs") && existsSync(resolved)) return resolved;
    } catch {
      // try next candidate
    }
  }

  const fallback = candidates[candidates.length - 1];
  return existsSync(fallback) ? fallback : null;
}

function quoteExecArg(value) {
  if (!/[ \t"'\\]/.test(value)) return value;
  return `"${value.replace(/(["\\])/g, "\\$1")}"`;
}

function buildServeExecLine(cliPath, { tray = false } = {}) {
  const parts = [quoteExecArg(process.execPath), quoteExecArg(cliPath), "serve", "--no-open"];
  if (tray) parts.push("--tray");
  return parts.join(" ");
}

function isGraphicalLinuxSession() {
  if (process.env.DISPLAY || process.env.WAYLAND_DISPLAY) return true;
  if (process.env.XDG_CURRENT_DESKTOP) return true;
  return false;
}

function linuxSystemdUnitPath() {
  return join(homedir(), ".config", "systemd", "user", LINUX_SERVICE_NAME);
}

function linuxDesktopPath() {
  return join(homedir(), ".config", "autostart", LINUX_DESKTOP_NAME);
}

function runUserSystemctl(args, { ignoreFailure = true } = {}) {
  try {
    execSync(`systemctl --user ${args}`, { stdio: "ignore" });
    return true;
  } catch {
    return ignoreFailure ? false : false;
  }
}

function isSystemdUserAvailable() {
  try {
    execSync("systemctl --user --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function isSystemdServiceEnabled() {
  if (!existsSync(linuxSystemdUnitPath())) return false;
  try {
    execSync(`systemctl --user is-enabled ${LINUX_SERVICE_NAME}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function tryEnableLinger() {
  try {
    const user =
      process.env.USER ||
      process.env.LOGNAME ||
      execSync("whoami", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (!user) return false;
    execSync(`loginctl enable-linger ${JSON.stringify(user)}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function writeLinuxSystemdUnit(cliPath) {
  const unitDir = dirname(linuxSystemdUnitPath());
  mkdirSync(unitDir, { recursive: true });
  const envFile = join(homedir(), ".omniroute", ".env");
  const lines = [
    "[Unit]",
    "Description=OmniRoute AI proxy router",
    "After=network-online.target",
    "Wants=network-online.target",
    "",
    "[Service]",
    "Type=simple",
    `ExecStart=${buildServeExecLine(cliPath, { tray: false })}`,
    "Restart=on-failure",
    "RestartSec=5",
  ];
  if (existsSync(envFile)) lines.push(`EnvironmentFile=-${envFile}`);
  lines.push("", "[Install]", "WantedBy=default.target", "");
  writeFileSync(linuxSystemdUnitPath(), `${lines.join("\n")}\n`, { mode: 0o644 });
}

function writeLinuxDesktopEntry(cliPath) {
  const dir = dirname(linuxDesktopPath());
  mkdirSync(dir, { recursive: true });
  const desktop =
    [
      "[Desktop Entry]",
      "Type=Application",
      "Name=OmniRoute",
      "Comment=AI proxy router with auto fallback",
      `Exec=${buildServeExecLine(cliPath, { tray: true })}`,
      "Terminal=false",
      "Hidden=false",
      "X-GNOME-Autostart-enabled=true",
    ].join("\n") + "\n";
  writeFileSync(linuxDesktopPath(), desktop, { mode: 0o644 });
}

export function getAutostartStatus() {
  if (process.platform === "linux") {
    const systemdUnit = linuxSystemdUnitPath();
    const desktopFile = linuxDesktopPath();
    const systemdEnabled = isSystemdServiceEnabled();
    const desktopEnabled = existsSync(desktopFile);
    const enabled = systemdEnabled || desktopEnabled;
    let mechanism = null;
    if (systemdEnabled) mechanism = "systemd-user";
    else if (desktopEnabled) mechanism = "xdg-desktop";
    return {
      enabled,
      mechanism,
      systemdUnit: existsSync(systemdUnit) ? systemdUnit : null,
      desktopFile: desktopEnabled ? desktopFile : null,
      linger: tryReadLingerEnabled(),
    };
  }
  return { enabled: isAutostartEnabled(), mechanism: null };
}

function tryReadLingerEnabled() {
  try {
    const user = process.env.USER || process.env.LOGNAME;
    if (!user) return null;
    const out = execSync(`loginctl show-user ${JSON.stringify(user)} -p Linger`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out.includes("Linger=yes");
  } catch {
    return null;
  }
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
  if (!cliPath) return false;
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
  if (!cliPath) return false;
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
  const cliPath = resolveCliPath();
  if (!cliPath) return false;

  if (!isSystemdUserAvailable() && !isGraphicalLinuxSession()) {
    return false;
  }

  let ok = false;

  if (isSystemdUserAvailable()) {
    writeLinuxSystemdUnit(cliPath);
    runUserSystemctl("daemon-reload");
    ok = runUserSystemctl(`enable ${LINUX_SERVICE_NAME}`) || existsSync(linuxSystemdUnitPath());
    runUserSystemctl(`start ${LINUX_SERVICE_NAME}`);
    tryEnableLinger();
  }

  if (isGraphicalLinuxSession()) {
    writeLinuxDesktopEntry(cliPath);
    ok = true;
  }

  return ok || isEnabledLinux();
}

function disableLinux() {
  if (isSystemdUserAvailable()) {
    runUserSystemctl(`disable --now ${LINUX_SERVICE_NAME}`);
    runUserSystemctl("daemon-reload");
  }
  try {
    unlinkSync(linuxSystemdUnitPath());
  } catch {}
  try {
    unlinkSync(linuxDesktopPath());
  } catch {}
  return !isEnabledLinux();
}

function isEnabledLinux() {
  if (isSystemdServiceEnabled()) return true;
  return existsSync(linuxDesktopPath());
}
