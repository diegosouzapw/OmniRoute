import { existsSync, writeFileSync, unlinkSync, mkdirSync, realpathSync } from "node:fs";
import { execFileSync, execSync } from "node:child_process";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const APP_LABEL = "com.omniroute.autostart";
const WIN_REG_VALUE = "OmniRoute";
const WIN_STARTUP_FILE = "OmniRoute.vbs";
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

function userHomeDir() {
  return process.env.HOME || homedir();
}

function linuxSystemdUnitPath() {
  return join(userHomeDir(), ".config", "systemd", "user", LINUX_SERVICE_NAME);
}

function linuxDesktopPath() {
  return join(userHomeDir(), ".config", "autostart", LINUX_DESKTOP_NAME);
}

function runUserSystemctl(args, { ignoreFailure = true } = {}) {
  try {
    execFileSync("systemctl", ["--user", ...args], { stdio: "ignore" });
    return true;
  } catch (err) {
    if (!ignoreFailure) throw err;
    return false;
  }
}

function isSystemdUserAvailable() {
  try {
    execFileSync("systemctl", ["--user", "--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function isSystemdServiceEnabled() {
  if (!existsSync(linuxSystemdUnitPath())) return false;
  try {
    execFileSync("systemctl", ["--user", "is-enabled", LINUX_SERVICE_NAME], { stdio: "ignore" });
    return true;
  } catch {
    // systemctl --user can't query the bus (headless environments / CI runners).
    // Treat the presence of the unit file as the source of truth, matching the
    // fallback used in enableLinux() where unit-file existence counts as success.
    return true;
  }
}

function tryEnableLinger() {
  try {
    const user =
      process.env.USER ||
      process.env.LOGNAME ||
      execFileSync("whoami", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (!user) return false;
    execFileSync("loginctl", ["enable-linger", user], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function writeLinuxSystemdUnit(cliPath) {
  const unitDir = dirname(linuxSystemdUnitPath());
  mkdirSync(unitDir, { recursive: true });
  const envFile = join(userHomeDir(), ".omniroute", ".env");
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
    const systemdUnitExists = existsSync(systemdUnit);
    const systemdEnabled = isSystemdServiceEnabled() || systemdUnitExists;
    const desktopEnabled = existsSync(desktopFile);
    const enabled = systemdEnabled || desktopEnabled;
    let mechanism = null;
    if (systemdEnabled) mechanism = "systemd-user";
    else if (desktopEnabled) mechanism = "xdg-desktop";
    return {
      enabled,
      mechanism,
      systemdUnit: systemdUnitExists ? systemdUnit : null,
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
    const out = execFileSync("loginctl", ["show-user", user, "-p", "Linger"], {
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

/**
 * Pure parse of `launchctl list <label>` output: true only when the agent's
 * "PID" line matches the given process id. launchctl prints the running PID for
 * a managed Aqua agent; a loaded-but-not-running agent omits the key entirely.
 *
 * Exported for unit testing — the darwin branch can't execute on the Linux CI.
 */
export function parseAgentSelfFromLaunchctl(output, pid) {
  if (!output) return false;
  const match = output.match(/"PID"\s*=\s*(\d+)/);
  return !!(match && parseInt(match[1], 10) === pid);
}

/**
 * True when `runList()` (which should run `launchctl list <label>`) succeeds,
 * i.e. launchd actually recognizes the agent. A plist sitting on disk that
 * launchd never loaded must NOT count as enabled — checking file existence
 * alone makes the tray menu lie ("✓ Enabled" while launchd has the agent in a
 * failed state or never loaded it).
 *
 * `runList` is injectable so the parse/branch logic is testable without a real
 * launchctl on the (Linux) CI runner.
 */
export function isLaunchdAgentLoaded(runList) {
  try {
    runList();
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns true when the current Node process IS the running instance launchd is
 * managing under our agent label.
 *
 * `launchctl unload`/`load -w` for a user-domain agent sends SIGTERM to the
 * running process. When the running OmniRoute cli was itself spawned by the
 * autostart launchd agent (autostart was enabled, then the machine rebooted,
 * then the user clicked the tray "Disable Autostart" item), an unload would
 * kill the very process executing the click handler — the tray icon would
 * silently disappear instead of the menu label flipping. Enable/disable skip
 * launchctl in that case; the on-disk plist change is what matters for the next
 * login, and launchd already has us loaded under our own PID.
 */
function isAgentSelfMac() {
  try {
    const output = execFileSync("launchctl", ["list", APP_LABEL], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 3000,
    });
    return parseAgentSelfFromLaunchctl(output, process.pid);
  } catch {
    return false;
  }
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
  // If we're already the running agent, launchctl load/unload would SIGTERM us.
  // The plist is updated on disk and launchd already has us loaded under our own
  // PID — nothing more to do for the current session.
  if (isAgentSelfMac()) return existsSync(plistPath);
  try {
    execSync("launchctl load -w " + JSON.stringify(plistPath), { stdio: "ignore" });
  } catch {}
  return existsSync(plistPath);
}

function disableMac() {
  const plistPath = join(homedir(), "Library", "LaunchAgents", `${APP_LABEL}.plist`);
  // Don't kill ourselves: when the current process is the running agent,
  // `launchctl unload` sends SIGTERM and a user clicking "Disable Autostart"
  // from the tray would lose the tray icon instead of just flipping the label.
  // Removing the plist file is enough to stop the agent at the next login.
  if (!isAgentSelfMac()) {
    try {
      execSync("launchctl unload -w " + JSON.stringify(plistPath), { stdio: "ignore" });
    } catch {}
  }
  try {
    unlinkSync(plistPath);
  } catch {}
  return !existsSync(plistPath);
}

function isEnabledMac() {
  const plistPath = join(homedir(), "Library", "LaunchAgents", `${APP_LABEL}.plist`);
  if (!existsSync(plistPath)) return false;
  // The plist file existing is not enough — launchd must actually recognize the
  // agent, otherwise the tray menu reports "Enabled" for an inert/failed agent.
  return isLaunchdAgentLoaded(() =>
    execFileSync("launchctl", ["list", APP_LABEL], {
      stdio: ["ignore", "ignore", "ignore"],
      timeout: 3000,
    })
  );
}

/**
 * Returns the absolute path to the Windows Startup folder
 * (%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\),
 * or null when APPDATA is not set.
 */
function winStartupDir() {
  if (!process.env.APPDATA) return null;
  return join(process.env.APPDATA, "Microsoft", "Windows", "Start Menu", "Programs", "Startup");
}

/**
 * Returns the full path to the VBS autostart script in the Startup folder,
 * or null when the Startup folder cannot be resolved.
 */
function winStartupPath() {
  const dir = winStartupDir();
  return dir ? join(dir, WIN_STARTUP_FILE) : null;
}

/**
 * Builds the VBScript source that launches OmniRoute with WSH's Run method
 * using SW_HIDE (0) so no console window appears.
 *
 * 9Router uses the same pattern: a .vbs file in the Startup folder that calls
 * WScript.Shell.Run with window style 0 (hidden). This avoids the console
 * window flash that HKCU\Run causes for console-mode node.exe.
 */
function buildWinVbsContent(cliPath) {
  const execLine = buildServeExecLine(cliPath, { tray: true });
  // VBScript doubles `"` inside a string to escape them. The execLine already
  // contains quoted paths; escape each `"` to `""` so the VBS parser reads
  // them as literal quote characters in the command string passed to Run().
  const vbsSafe = execLine.replace(/"/g, '""');
  return [
    'Set WshShell = CreateObject("WScript.Shell")',
    `WshShell.Run "${vbsSafe}", 0, False`,
    "",
  ].join("\n");
}

/**
 * Removes the legacy HKCU\Run registry value if present. Callers use this
 * during migration so stale Run entries don't linger after switching to the
 * VBS-based autostart.
 */
function cleanLegacyWinReg() {
  try {
    execSync(
      `reg delete HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v ${WIN_REG_VALUE} /f 2>nul`,
      { stdio: "ignore", windowsHide: true }
    );
  } catch {
    // entry did not exist or already removed — noop
  }
}

function enableWin() {
  const cliPath = resolveCliPath();
  if (!cliPath) return false;
  const vbsPath = winStartupPath();
  if (!vbsPath) return false;
  const dir = dirname(vbsPath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(vbsPath, buildWinVbsContent(cliPath), { mode: 0o644 });
  // Migrate away from the legacy HKCU\Run entry — it launches node.exe with
  // a visible console window. The VBS approach is the replacement.
  cleanLegacyWinReg();
  return existsSync(vbsPath);
}

function disableWin() {
  const vbsPath = winStartupPath();
  if (!vbsPath) return false;
  try {
    unlinkSync(vbsPath);
  } catch {
    // already removed
  }
  // Also clean up any lingering legacy registry entry as a safety net.
  cleanLegacyWinReg();
  return !existsSync(vbsPath);
}

function isEnabledWin() {
  const vbsPath = winStartupPath();
  if (!vbsPath) return false;
  // Primary check: VBS file exists in the Startup folder.
  if (existsSync(vbsPath)) return true;
  // Fallback check: legacy HKCU\Run entry (for users who enabled autostart
  // before the VBS migration). Treat it as enabled so the tray menu shows
  // the correct toggle state, and calling disable() will clean it up.
  try {
    const out = execSync(
      `reg query HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v ${WIN_REG_VALUE}`,
      { stdio: "pipe", windowsHide: true, encoding: "utf8", timeout: 3000 }
    );
    return out.includes(WIN_REG_VALUE);
  } catch {
    return false;
  }
}

function enableLinux() {
  const cliPath = resolveCliPath();
  if (!cliPath) return false;

  const graphicalSession = isGraphicalLinuxSession();
  const systemdAvailable = isSystemdUserAvailable();

  if (!graphicalSession && !systemdAvailable) {
    return false;
  }

  let ok = false;

  if (graphicalSession) {
    writeLinuxDesktopEntry(cliPath);
    ok = true;
  } else if (systemdAvailable) {
    writeLinuxSystemdUnit(cliPath);
    runUserSystemctl(["daemon-reload"]);
    ok = runUserSystemctl(["enable", LINUX_SERVICE_NAME]) || existsSync(linuxSystemdUnitPath());
    runUserSystemctl(["start", LINUX_SERVICE_NAME]);
    tryEnableLinger();
  }

  return ok || isEnabledLinux();
}

function disableLinux() {
  if (isSystemdUserAvailable()) {
    runUserSystemctl(["disable", "--now", LINUX_SERVICE_NAME]);
    runUserSystemctl(["daemon-reload"]);
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
  if (existsSync(linuxSystemdUnitPath())) return true;
  return existsSync(linuxDesktopPath());
}
