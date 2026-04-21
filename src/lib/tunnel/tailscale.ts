import fs from "fs";
import os from "os";
import path from "path";
import { execSync, spawn } from "child_process";
import { execWithPassword } from "@/mitm/dns/dnsConfig";
import { resolveDataDir } from "@/lib/dataPaths";
import { getRuntimePorts } from "@/lib/runtime/ports";
import {
  clearTailscalePid,
  loadTailscalePid,
  saveTailscalePid,
  updateTunnelState,
} from "./tunnelState";

const IS_MAC = os.platform() === "darwin";
const IS_LINUX = os.platform() === "linux";
const IS_WINDOWS = os.platform() === "win32";
const EXTENDED_PATH = `/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:${process.env.PATH || ""}`;
const WINDOWS_TAILSCALE_BIN = "C:\\Program Files\\Tailscale\\tailscale.exe";
const TAILSCALE_DIR = path.join(resolveDataDir(), "tailscale");
const TAILSCALE_SOCKET = path.join(TAILSCALE_DIR, "tailscaled.sock");
const SOCKET_FLAG = IS_WINDOWS ? [] : ["--socket", TAILSCALE_SOCKET];

type InstallProgressCallback = (message: string) => void;

function buildCommandEnv(): NodeJS.ProcessEnv {
  return { ...process.env, PATH: EXTENDED_PATH };
}

function quoteArg(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
}

function hasBrew(): boolean {
  if (!IS_MAC) return false;
  try {
    execSync("which brew", {
      stdio: "ignore",
      windowsHide: true,
      env: buildCommandEnv(),
    });
    return true;
  } catch {
    return false;
  }
}

function getTailscaleBinaryCandidate(): string | null {
  try {
    const command = IS_WINDOWS ? "where tailscale" : "which tailscale";
    const output = execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      windowsHide: true,
      env: buildCommandEnv(),
    }).trim();
    if (output) {
      return output.split(/\r?\n/).find(Boolean) || null;
    }
  } catch {
    // Ignore PATH lookup failures.
  }

  if (IS_WINDOWS && fs.existsSync(WINDOWS_TAILSCALE_BIN)) {
    return WINDOWS_TAILSCALE_BIN;
  }

  return null;
}

function getTailscaledBinaryCandidate(tailscaleBin: string | null): string | null {
  const candidates = new Set<string>();

  if (tailscaleBin) {
    candidates.add(
      path.join(path.dirname(tailscaleBin), IS_WINDOWS ? "tailscaled.exe" : "tailscaled")
    );
  }

  if (IS_MAC) {
    candidates.add("/opt/homebrew/bin/tailscaled");
    candidates.add("/usr/local/bin/tailscaled");
  }

  if (IS_LINUX) {
    candidates.add("/usr/sbin/tailscaled");
    candidates.add("/usr/bin/tailscaled");
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  try {
    const command = IS_WINDOWS ? "where tailscaled" : "which tailscaled";
    const output = execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      windowsHide: true,
      env: buildCommandEnv(),
    }).trim();
    if (output) {
      return output.split(/\r?\n/).find(Boolean) || null;
    }
  } catch {
    // Ignore PATH lookup failures.
  }

  return null;
}

function runSync(command: string, timeout = 5000): string {
  return execSync(command, {
    encoding: "utf8",
    windowsHide: true,
    env: buildCommandEnv(),
    timeout,
  });
}

function parseAuthUrl(text: string): string | null {
  const match = text.match(/https:\/\/login\.tailscale\.com\/[^\s)"]+/i);
  return match ? match[0] : null;
}

function parseFunnelUrl(text: string): string | null {
  const match = text.match(/https:\/\/[a-z0-9-]+\.[a-z0-9.-]+\.ts\.net[^\s)"]*/i);
  return match ? match[0].replace(/\/$/, "") : null;
}

function isProcessAlive(pid: number | null): boolean {
  if (!pid || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function discoverTailscaledPid(): number | null {
  const cachedPid = loadTailscalePid();
  if (isProcessAlive(cachedPid)) return cachedPid;

  if (IS_WINDOWS) return null;

  try {
    const output = runSync("pgrep -x tailscaled | tail -n 1", 3000).trim();
    const pid = Number.parseInt(output, 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
  }
}

function ensureTailscaleDir(): void {
  fs.mkdirSync(TAILSCALE_DIR, { recursive: true });
}

function buildSocketArgs(args: string[]): string[] {
  return [...SOCKET_FLAG, ...args];
}

export { TAILSCALE_SOCKET };

export function getTailscaleBin(): string | null {
  return getTailscaleBinaryCandidate();
}

export function isTailscaleInstalled(): boolean {
  return getTailscaleBin() !== null;
}

export function canInstallTailscaleWithoutSudo(): boolean {
  return IS_WINDOWS || hasBrew();
}

export function isTailscaleDaemonRunning(): boolean {
  const bin = getTailscaleBin();
  if (!bin) return false;

  try {
    runSync(`${quoteArg(bin)} ${SOCKET_FLAG.join(" ")} status --json`, 3000);
    return true;
  } catch {
    return isProcessAlive(discoverTailscaledPid());
  }
}

export function isTailscaleLoggedIn(): boolean {
  const bin = getTailscaleBin();
  if (!bin) return false;

  try {
    const output = runSync(`${quoteArg(bin)} ${SOCKET_FLAG.join(" ")} status --json`, 5000);
    const parsed = JSON.parse(output) as { BackendState?: string };
    return parsed.BackendState === "Running";
  } catch {
    return false;
  }
}

export function isTailscaleRunning(): boolean {
  const bin = getTailscaleBin();
  if (!bin) return false;

  try {
    const output = runSync(`${quoteArg(bin)} ${SOCKET_FLAG.join(" ")} funnel status --json`, 5000);
    const parsed = JSON.parse(output) as { AllowFunnel?: Record<string, unknown> };
    return !!parsed.AllowFunnel && Object.keys(parsed.AllowFunnel).length > 0;
  } catch {
    return false;
  }
}

export function getTailscaleFunnelUrl(): string | null {
  const bin = getTailscaleBin();
  if (!bin || !isTailscaleRunning()) return null;

  try {
    const output = runSync(`${quoteArg(bin)} ${SOCKET_FLAG.join(" ")} status --json`, 5000);
    const parsed = JSON.parse(output) as {
      Self?: {
        DNSName?: string;
      };
    };
    const dnsName = parsed.Self?.DNSName?.replace(/\.$/, "");
    return dnsName ? `https://${dnsName}` : null;
  } catch {
    return null;
  }
}

async function installTailscaleMac(
  sudoPassword: string,
  onProgress: InstallProgressCallback
): Promise<void> {
  if (hasBrew()) {
    onProgress("Installing via Homebrew...");
    await new Promise<void>((resolve, reject) => {
      const child = spawn("brew", ["install", "tailscale"], {
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
        env: buildCommandEnv(),
      });

      child.stdout.on("data", (chunk) => {
        const message = chunk.toString().trim();
        if (message) onProgress(message);
      });
      child.stderr.on("data", (chunk) => {
        const message = chunk.toString().trim();
        if (message) onProgress(message);
      });
      child.on("error", reject);
      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`brew install failed (code ${code})`));
      });
    });
    return;
  }

  if (!sudoPassword.trim()) {
    throw new Error("Sudo password is required");
  }

  const pkgUrl = "https://pkgs.tailscale.com/stable/tailscale-latest.pkg";
  const pkgPath = path.join(os.tmpdir(), "tailscale.pkg");

  onProgress("Downloading Tailscale package...");
  await new Promise<void>((resolve, reject) => {
    const child = spawn("curl", ["-fL", "--progress-bar", pkgUrl, "-o", pkgPath], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    child.stderr.on("data", (chunk) => {
      const message = chunk.toString().trim();
      if (message) onProgress(message);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Download failed (code ${code})`));
    });
  });

  onProgress("Installing package...");
  await new Promise<void>((resolve, reject) => {
    const child = spawn("sudo", ["-S", "installer", "-pkg", pkgPath, "-target", "/"], {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    });
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      const message = chunk.toString().trim();
      if (message) onProgress(message);
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      const message = chunk.toString().trim();
      if (message) onProgress(message);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      try {
        fs.unlinkSync(pkgPath);
      } catch {
        // Ignore cleanup failures.
      }
      if (code === 0) {
        resolve();
        return;
      }
      const wrongPassword = stderr.includes("incorrect password") || stderr.includes("Sorry");
      reject(new Error(wrongPassword ? "Wrong sudo password" : stderr || `Exit code ${code}`));
    });

    child.stdin.write(`${sudoPassword}\n`);
    child.stdin.end();
  });
}

async function installTailscaleLinux(
  sudoPassword: string,
  onProgress: InstallProgressCallback
): Promise<void> {
  if (!sudoPassword.trim()) {
    throw new Error("Sudo password is required");
  }

  onProgress("Downloading install script...");
  await new Promise<void>((resolve, reject) => {
    const curlChild = spawn("curl", ["-fsSL", "https://tailscale.com/install.sh"], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    let script = "";
    let curlError = "";

    curlChild.stdout.on("data", (chunk) => {
      script += chunk.toString();
    });
    curlChild.stderr.on("data", (chunk) => {
      curlError += chunk.toString();
      const message = chunk.toString().trim();
      if (message) onProgress(message);
    });
    curlChild.on("error", reject);
    curlChild.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Failed to download install script: ${curlError || code}`));
        return;
      }

      onProgress("Running install script...");
      const child = spawn("sudo", ["-S", "sh"], {
        stdio: ["pipe", "pipe", "pipe"],
        windowsHide: true,
      });
      let stderr = "";

      child.stdout.on("data", (chunk) => {
        const message = chunk.toString().trim();
        if (message) onProgress(message);
      });
      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
        const message = chunk.toString().trim();
        if (message) onProgress(message);
      });
      child.on("error", reject);
      child.on("close", (childCode) => {
        if (childCode === 0) {
          resolve();
          return;
        }
        const wrongPassword = stderr.includes("incorrect password") || stderr.includes("Sorry");
        reject(
          new Error(wrongPassword ? "Wrong sudo password" : stderr || `Exit code ${childCode}`)
        );
      });

      child.stdin.write(`${sudoPassword}\n`);
      child.stdin.write(script);
      child.stdin.end();
    });
  });
}

async function installTailscaleWindows(onProgress: InstallProgressCallback): Promise<void> {
  const msiUrl = "https://pkgs.tailscale.com/stable/tailscale-setup-latest-amd64.msi";
  const msiPath = path.join(os.tmpdir(), "tailscale-setup.msi");

  onProgress("Downloading Tailscale installer...");
  await new Promise<void>((resolve, reject) => {
    const child = spawn("curl.exe", ["-L", "-#", "-o", msiPath, msiUrl], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    child.stderr.on("data", (chunk) => {
      const message = chunk.toString().trim();
      if (message) onProgress(message);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Download failed (code ${code})`));
    });
  });

  onProgress("Installing Tailscale (UAC prompt may appear)...");
  await new Promise<void>((resolve, reject) => {
    const args = `'/i','${msiPath}','TS_NOLAUNCH=true','/quiet','/norestart'`;
    const child = spawn(
      "powershell",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Start-Process msiexec -ArgumentList ${args} -Verb RunAs -Wait`,
      ],
      {
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      }
    );

    child.stderr.on("data", (chunk) => {
      const message = chunk.toString().trim();
      if (message) onProgress(message);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      try {
        fs.unlinkSync(msiPath);
      } catch {
        // Ignore cleanup failures.
      }
      if (code === 0) resolve();
      else reject(new Error(`msiexec failed (code ${code})`));
    });
  });
}

export async function installTailscale(
  sudoPassword: string,
  hostname: string,
  onProgress: InstallProgressCallback = () => {}
): Promise<{ success: true; authUrl?: string | null }> {
  if (IS_WINDOWS) {
    await installTailscaleWindows(onProgress);
  } else if (IS_MAC) {
    await installTailscaleMac(sudoPassword, onProgress);
  } else if (IS_LINUX) {
    await installTailscaleLinux(sudoPassword, onProgress);
  } else {
    throw new Error(`Unsupported platform: ${process.platform}`);
  }

  onProgress("Starting daemon...");
  await startDaemonWithPassword(sudoPassword);

  onProgress("Opening login flow...");
  const loginResult = await startLogin(hostname);
  return {
    success: true,
    authUrl: loginResult.authUrl || null,
  };
}

export async function startDaemonWithPassword(sudoPassword: string): Promise<void> {
  if (IS_WINDOWS) {
    try {
      const bin = getTailscaleBin();
      if (bin) {
        runSync(`${quoteArg(bin)} status --json`, 3000);
        return;
      }
    } catch {
      // Try starting the Windows service below.
    }

    try {
      runSync("net start Tailscale", 10000);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch {
      // Ignore service start errors; later status checks surface the failure.
    }
    return;
  }

  if (isTailscaleDaemonRunning()) return;

  if (!sudoPassword.trim()) {
    throw new Error("Sudo password is required to start tailscaled");
  }

  ensureTailscaleDir();
  const tailscaleBin = getTailscaleBin();
  const tailscaledBin = getTailscaledBinaryCandidate(tailscaleBin);

  if (!tailscaledBin) {
    throw new Error("tailscaled binary not found");
  }

  const command = [
    "sudo -S nohup",
    quoteArg(tailscaledBin),
    `--socket=${quoteArg(TAILSCALE_SOCKET)}`,
    `--statedir=${quoteArg(TAILSCALE_DIR)}`,
    "> /dev/null 2>&1 &",
  ].join(" ");

  await execWithPassword(command, sudoPassword);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const pid = discoverTailscaledPid();
  if (pid) saveTailscalePid(pid);

  if (!isTailscaleDaemonRunning()) {
    throw new Error("tailscaled failed to start");
  }
}

export async function startLogin(
  hostname?: string
): Promise<{ alreadyLoggedIn?: true; authUrl?: string | null }> {
  const bin = getTailscaleBin();
  if (!bin) throw new Error("Tailscale not installed");

  if (isTailscaleLoggedIn()) {
    return { alreadyLoggedIn: true };
  }

  const args = buildSocketArgs(["up", "--accept-routes"]);
  if (hostname) args.push(`--hostname=${hostname}`);

  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, {
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
      windowsHide: true,
      env: buildCommandEnv(),
    });

    let buffer = "";
    let settled = false;

    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      callback();
    };

    const timeoutId = setTimeout(() => {
      finish(() => {
        child.unref();
        const authUrl = parseAuthUrl(buffer);
        if (authUrl) resolve({ authUrl });
        else reject(new Error("tailscale up timed out without auth URL"));
      });
    }, 15000);

    const handleData = (chunk: Buffer) => {
      buffer += chunk.toString();
      const authUrl = parseAuthUrl(buffer);
      if (!authUrl) return;

      finish(() => {
        clearTimeout(timeoutId);
        updateTunnelState({ shortId: hostname || null });
        child.unref();
        resolve({ authUrl });
      });
    };

    child.stdout.on("data", handleData);
    child.stderr.on("data", handleData);
    child.on("error", (error) => {
      finish(() => {
        clearTimeout(timeoutId);
        reject(error);
      });
    });
    child.on("exit", (code) => {
      finish(() => {
        clearTimeout(timeoutId);
        const authUrl = parseAuthUrl(buffer);
        if (authUrl) {
          resolve({ authUrl });
        } else if (code === 0 || isTailscaleLoggedIn()) {
          resolve({ alreadyLoggedIn: true });
        } else {
          reject(new Error(`tailscale up exited with code ${code}`));
        }
      });
    });
  });
}

export async function startFunnel(
  port = getRuntimePorts().apiPort
): Promise<{ tunnelUrl?: string; funnelNotEnabled?: true; enableUrl?: string }> {
  const bin = getTailscaleBin();
  if (!bin) throw new Error("Tailscale not installed");

  stopFunnel();

  return new Promise((resolve, reject) => {
    const child = spawn(bin, buildSocketArgs(["funnel", "--bg", String(port)]), {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
      env: buildCommandEnv(),
    });

    let buffer = "";
    let settled = false;

    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      callback();
    };

    const timeoutId = setTimeout(() => {
      finish(() => {
        const tunnelUrl = parseFunnelUrl(buffer) || getTailscaleFunnelUrl();
        if (tunnelUrl) {
          resolve({ tunnelUrl });
        } else {
          reject(new Error(`Tailscale funnel timed out: ${buffer.trim() || "no output"}`));
        }
      });
    }, 30000);

    const handleData = (chunk: Buffer) => {
      buffer += chunk.toString();
      if (buffer.includes("Funnel is not enabled")) {
        const enableUrl = parseAuthUrl(buffer);
        if (enableUrl) {
          finish(() => {
            clearTimeout(timeoutId);
            resolve({ funnelNotEnabled: true, enableUrl });
          });
        }
        return;
      }

      const tunnelUrl = parseFunnelUrl(buffer);
      if (!tunnelUrl) return;

      finish(() => {
        clearTimeout(timeoutId);
        resolve({ tunnelUrl });
      });
    };

    child.stdout.on("data", handleData);
    child.stderr.on("data", handleData);
    child.on("error", (error) => {
      finish(() => {
        clearTimeout(timeoutId);
        reject(error);
      });
    });
    child.on("exit", (code) => {
      finish(() => {
        clearTimeout(timeoutId);
        const tunnelUrl = parseFunnelUrl(buffer) || getTailscaleFunnelUrl();
        if (tunnelUrl) {
          resolve({ tunnelUrl });
        } else {
          reject(new Error(`tailscale funnel failed (code ${code}): ${buffer.trim()}`));
        }
      });
    });
  });
}

export function stopFunnel(): void {
  const bin = getTailscaleBin();
  if (!bin) return;

  try {
    runSync(`${quoteArg(bin)} ${SOCKET_FLAG.join(" ")} funnel --bg reset`, 5000);
  } catch {
    // Ignore reset failures.
  }
}

export async function stopDaemon(sudoPassword: string): Promise<void> {
  if (IS_WINDOWS) return;

  try {
    runSync("pkill -x tailscaled", 3000);
  } catch {
    // Ignore when process is not running.
  }

  const remainingPid = discoverTailscaledPid();
  if (!remainingPid) {
    clearTailscalePid();
    try {
      if (fs.existsSync(TAILSCALE_SOCKET)) fs.unlinkSync(TAILSCALE_SOCKET);
    } catch {
      // Ignore stale socket cleanup failures.
    }
    return;
  }

  if (!sudoPassword.trim()) {
    throw new Error("Sudo password is required to stop tailscaled");
  }

  await execWithPassword("sudo -S pkill -x tailscaled", sudoPassword);
  clearTailscalePid();

  try {
    if (fs.existsSync(TAILSCALE_SOCKET)) fs.unlinkSync(TAILSCALE_SOCKET);
  } catch {
    // Ignore stale socket cleanup failures.
  }
}
