import { spawn, type ChildProcess } from "child_process";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import os from "os";
import { setToolStatus, getVersionManagerTool } from "@/lib/db/versionManager";

const DEFAULT_PORT = 8317;
const GRACEFUL_TIMEOUT_MS = 5000;

function defaultConfigDir(): string {
  return process.env.CLIPROXYAPI_CONFIG_DIR || path.join(os.homedir(), ".cli-proxy-api");
}

async function writeConfig(
  configDir: string,
  port: number,
  overrides?: Record<string, unknown>
): Promise<string> {
  await fs.mkdir(configDir, { recursive: true });
  const configPath = path.join(configDir, "config.yaml");
  const config = `port: ${port}
host: 127.0.0.1
log_level: warn
`;
  await fs.writeFile(configPath, config);
  return configPath;
}

export async function startProcess(
  binaryPath: string,
  port?: number,
  configDir?: string
): Promise<{ pid: number; port: number }> {
  const existing = await getVersionManagerTool("cliproxyapi");
  if (existing?.pid) {
    const alive = isProcessRunning(existing.pid);
    if (alive) return { pid: existing.pid, port: existing.port };
  }

  const actualPort = port || DEFAULT_PORT;
  const actualConfigDir = configDir || defaultConfigDir();
  await writeConfig(actualConfigDir, actualPort);

  const child = spawn(binaryPath, ["-c", path.join(actualConfigDir, "config.yaml")], {
    detached: false,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
  });

  child.stdout?.on("data", () => {});
  child.stderr?.on("data", () => {});

  child.on("error", async (err) => {
    await setToolStatus("cliproxyapi", "error", undefined, err.message);
  });

  child.on("exit", async (code) => {
    if (code !== 0 && code !== null) {
      await setToolStatus("cliproxyapi", "stopped", undefined, `Process exited with code ${code}`);
    }
  });

  const pid = child.pid;
  await setToolStatus("cliproxyapi", "running", pid);

  return { pid, port: actualPort };
}

export function isProcessRunning(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function stopProcess(pid: number): Promise<void> {
  return new Promise((resolve) => {
    if (!isProcessRunning(pid)) {
      resolve();
      return;
    }

    try {
      process.kill(pid, "SIGTERM");
    } catch {
      resolve();
      return;
    }

    const timer = setTimeout(() => {
      try {
        process.kill(pid, "SIGKILL");
      } catch {}
      clearInterval(check);
      resolve();
    }, GRACEFUL_TIMEOUT_MS);

    const check = setInterval(() => {
      if (!isProcessRunning(pid)) {
        clearTimeout(timer);
        clearInterval(check);
        resolve();
      }
    }, 200);
  });
}

export async function restartProcess(
  binaryPath: string,
  port?: number,
  configDir?: string,
  currentPid?: number | null
): Promise<{ pid: number; port: number }> {
  if (currentPid) {
    await stopProcess(currentPid);
    await new Promise((r) => setTimeout(r, 500));
  }
  return startProcess(binaryPath, port, configDir);
}

export async function getProcessInfo(pid: number): Promise<{
  pid: number;
  alive: boolean;
  memoryUsage?: number;
}> {
  if (!isProcessRunning(pid)) {
    return { pid, alive: false };
  }

  try {
    if (process.platform === "linux" || process.platform === "android") {
      const statusFile = `/proc/${pid}/status`;
      const content = await fs.readFile(statusFile, "utf-8");
      const match = content.match(/VmRSS:\s+(\d+)\s+kB/);
      if (match) {
        return { pid, alive: true, memoryUsage: parseInt(match[1], 10) * 1024 };
      }
    } else if (process.platform === "darwin") {
      const { execFile } = await import("child_process");
      const { promisify } = await import("util");
      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("ps", ["-o", "rss=", "-p", String(pid)]);
      const rssKb = parseInt(stdout.trim(), 10);
      if (!isNaN(rssKb)) {
        return { pid, alive: true, memoryUsage: rssKb * 1024 };
      }
    }
    return { pid, alive: true };
  } catch {
    return { pid, alive: true };
  }
}
