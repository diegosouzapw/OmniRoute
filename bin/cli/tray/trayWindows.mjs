import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";

const OMNIROUTE_IPC_PORT_BASE = 29128;

export function initWinTray({ port, onQuit, onOpenDashboard, onShowLogs }) {
  if (process.platform !== "win32") return null;

  const ipcPort = OMNIROUTE_IPC_PORT_BASE + (port % 1000);
  const scriptPath = join(tmpdir(), `omniroute-tray-${process.pid}.ps1`);

  const ps1 = `
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$tray = New-Object System.Windows.Forms.NotifyIcon
$tray.Text = "OmniRoute - Port ${port}"
$tray.Icon = [System.Drawing.SystemIcons]::Application
$tray.Visible = $true

$menu = New-Object System.Windows.Forms.ContextMenuStrip

$mDash = $menu.Items.Add("Open Dashboard")
$mDash.add_Click({ [System.Net.Sockets.TcpClient]::new("127.0.0.1", ${ipcPort}).Close(); Write-Host "DASHBOARD" })

$mLogs = $menu.Items.Add("Show Logs")
$mLogs.add_Click({ Write-Host "LOGS" })

$mAutostart = $menu.Items.Add("Enable Auto-start")
$mAutostart.add_Click({ Write-Host "AUTOSTART" })

$mQuit = $menu.Items.Add("Quit OmniRoute")
$mQuit.add_Click({ Write-Host "QUIT"; [System.Windows.Forms.Application]::Exit() })

$tray.ContextMenuStrip = $menu
[System.Windows.Forms.Application]::Run()
$tray.Dispose()
`.trim();

  writeFileSync(scriptPath, ps1, "utf8");

  const proc = spawn("powershell.exe", ["-NonInteractive", "-File", scriptPath], {
    stdio: ["ignore", "pipe", "ignore"],
    windowsHide: true,
    detached: false,
    shell: false,
  });

  proc.stdout.on("data", async (data) => {
    const line = data.toString().trim();
    if (line === "DASHBOARD") onOpenDashboard?.();
    else if (line === "LOGS") onShowLogs?.();
    else if (line === "AUTOSTART") {
      const { enable, disable, isAutostartEnabled } = await import("./autostart.mjs");
      if (isAutostartEnabled()) disable();
      else enable();
    } else if (line === "QUIT") onQuit?.();
  });

  proc.on("exit", () => {
    try {
      if (existsSync(scriptPath)) unlinkSync(scriptPath);
    } catch {}
  });

  return proc;
}

export function killWinTray(proc) {
  try {
    proc.kill("SIGTERM");
  } catch {}
}
