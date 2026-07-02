import {
  getVersionManagerStatus,
  getVersionManagerTool,
  upsertVersionManagerTool,
  updateVersionManagerTool,
  setToolStatus,
  updateToolVersion,
} from "@/lib/db/versionManager";
import { getLatestRelease, clearCache as clearReleaseCache } from "./releaseChecker.ts";
import { installVersion, getCurrentBinaryPath, rollbackVersion } from "./binaryManager.ts";
import { startProcess, stopProcess, restartProcess, isProcessRunning } from "./processManager.ts";
import { checkHealth, startMonitoring, stopMonitoring, isMonitoring } from "./healthMonitor.ts";

export { getVersionManagerStatus, getVersionManagerTool } from "@/lib/db/versionManager";

export type { HealthResult } from "./healthMonitor.ts";

export async function installTool(
  tool: string,
  version?: string
): Promise<{
  installedVersion: string;
  binaryPath: string;
}> {
  const targetVersion = version || (await getLatestRelease()).version;
  const binaryPath = await installVersion(targetVersion);

  await upsertVersionManagerTool({
    tool,
    installedVersion: targetVersion,
    binaryPath,
    status: "installed",
  });

  return { installedVersion: targetVersion, binaryPath };
}

export async function startTool(tool: string): Promise<{
  pid: number;
  port: number;
  health?: Awaited<ReturnType<typeof checkHealth>>;
}> {
  const info = await getVersionManagerTool(tool);
  const binaryPath = info?.binaryPath || (await getCurrentBinaryPath());

  if (!binaryPath) {
    throw new Error(
      `No binary found for ${tool}. Run installTool('${tool}') or set binaryPath in version manager.`
    );
  }

  const { pid, port } = await startProcess(binaryPath, info?.port || undefined);

  const url = `http://127.0.0.1:${port}`;
  startMonitoring(tool, url);

  const health = await checkHealth(url);

  return { pid, port, health };
}

export async function stopTool(tool: string): Promise<void> {
  const info = await getVersionManagerTool(tool);

  stopMonitoring(tool);

  if (info?.pid) {
    await stopProcess(info.pid);
  }

  await setToolStatus(tool, "stopped");
}

export async function restartTool(tool: string): Promise<{
  pid: number;
  port: number;
}> {
  const info = await getVersionManagerTool(tool);
  const binaryPath = info?.binaryPath || (await getCurrentBinaryPath());

  if (!binaryPath) {
    throw new Error(`No binary found for ${tool}`);
  }

  const { pid, port } = await restartProcess(
    binaryPath,
    info?.port || undefined,
    undefined,
    info?.pid || undefined
  );

  const url = `http://127.0.0.1:${port}`;
  if (isMonitoring(tool)) {
    stopMonitoring(tool);
  }
  startMonitoring(tool, url);

  return { pid, port };
}

export async function checkForUpdates(tool: string): Promise<{
  current: string | null;
  latest: string;
  updateAvailable: boolean;
}> {
  clearReleaseCache();
  const latest = (await getLatestRelease()).version;
  const info = await getVersionManagerTool(tool);
  const current = info?.installedVersion || null;

  if (!current) {
    return { current: null, latest, updateAvailable: true };
  }

  return {
    current,
    latest,
    updateAvailable: current !== latest,
  };
}

export async function pinVersion(tool: string, version: string): Promise<void> {
  await updateVersionManagerTool(tool, { pinnedVersion: version });
}

export async function unpinVersion(tool: string): Promise<void> {
  await updateVersionManagerTool(tool, { pinnedVersion: null });
}

export async function getToolHealth(
  tool: string
): Promise<Awaited<ReturnType<typeof checkHealth>> | null> {
  const info = await getVersionManagerTool(tool);
  if (!info?.port || info.status !== "running") return null;

  const url = `http://127.0.0.1:${info.port}`;
  return checkHealth(url);
}

export async function rollbackTool(tool: string): Promise<string | null> {
  const previousVersion = await rollbackVersion();
  if (!previousVersion) return null;

  await updateVersionManagerTool(tool, {
    installedVersion: previousVersion,
    status: "installed",
  });

  const info = await getVersionManagerTool(tool);
  if (info?.pid && isProcessRunning(info.pid)) {
    await restartTool(tool);
  }

  return previousVersion;
}
