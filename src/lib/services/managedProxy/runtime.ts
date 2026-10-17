import { execFile } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { promisify } from "node:util";
import { ServiceSupervisor } from "../ServiceSupervisor";
import { registerSupervisor, getSupervisor, unregisterSupervisor } from "../registry";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { nativeCheckArgs, type ManagedCore, type ManagedListener } from "./config";
import { officialRelease } from "./releases";

const execute = promisify(execFile);

/** No inherited core configuration directories, proxy variables or provider credentials. */
export function coreEnvironment(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const key of ["SystemRoot", "WINDIR", "TEMP", "TMP", "PATH", "LANG", "LC_ALL"]) {
    if (process.env[key]) env[key] = process.env[key];
  }
  return env;
}

export async function checkNative(
  core: ManagedCore,
  executable: string,
  configPath: string
): Promise<void> {
  try {
    await execute(executable, nativeCheckArgs(core, configPath), {
      cwd: path.dirname(configPath),
      env: coreEnvironment(),
      timeout: 15000,
      maxBuffer: 64 * 1024,
      windowsHide: true,
    });
  } catch {
    // Native diagnostics can embed credentials and complete outbound configuration.
    throw new Error(`Native ${core} configuration check failed; verify protocol and options`);
  }
}

export function probeSocks(port: number, signal: AbortSignal): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    let settled = false;
    const done = (ok: boolean) => {
      if (settled) return;
      settled = true;
      signal.removeEventListener("abort", abort);
      socket.destroy();
      resolve(ok);
    };
    const abort = () => done(false);
    if (signal.aborted) {
      done(false);
      return;
    }
    signal.addEventListener("abort", abort, { once: true });
    socket.setTimeout(1500, () => done(false));
    socket.once("connect", () => socket.write(Buffer.from([5, 1, 0])));
    const bytes: number[] = [];
    socket.on("data", (chunk: Buffer) => {
      for (const byte of chunk) if (bytes.length < 2) bytes.push(byte);
      if (bytes.length === 2) done(bytes[0] === 5 && bytes[1] === 0);
    });
    socket.once("error", () => done(false));
    socket.once("end", () => done(false));
  });
}

export async function allocatePort(excluded: Set<number>): Promise<number> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const port = await new Promise<number>((resolve, reject) => {
      const server = net.createServer();
      server.once("error", reject);
      server.listen(0, "127.0.0.1", () => {
        const address = server.address();
        const value = address && typeof address !== "string" ? address.port : 0;
        server.close((error) => (error ? reject(error) : resolve(value)));
      });
    });
    if (port && !excluded.has(port)) return port;
  }
  throw new Error("No distinct localhost port is available");
}

export function isManagedRunning(core: ManagedCore): boolean {
  return getSupervisor(`managed-proxy-${core}`)?.getStatus().state === "running";
}

export async function startManaged(
  core: ManagedCore,
  executable: string,
  configPath: string,
  listeners: ManagedListener[]
): Promise<void> {
  const tool = `managed-proxy-${core}`;
  const { logger } = await import("@/shared/utils/logger");
  const log = logger.child({ module: "managed-proxy", core });
  const existing = getSupervisor(tool);
  if (existing?.getStatus().state === "running" && existing.getStatus().health === "healthy")
    return;
  if (existing) {
    await existing.stop();
    unregisterSupervisor(tool);
  }
  log.info({ listeners: listeners.length }, "Starting managed proxy core");
  await upsertVersionManagerTool({
    tool,
    installedVersion: officialRelease(core).version,
    binaryPath: executable,
    status: "stopped",
    port: listeners[0].port,
    autoStart: false,
  });
  const supervisor = new ServiceSupervisor({
    tool,
    port: listeners[0].port,
    spawnArgs: () => ({
      command: executable,
      args: ["run", "-c", configPath],
      env: coreEnvironment(),
      cwd: path.dirname(configPath),
    }),
    healthUrl: () => "",
    healthProbe: async (signal) => {
      for (const listener of listeners)
        if (!(await probeSocks(listener.port, signal))) return false;
      return true;
    },
    requireHealthy: true,
    sanitizeLogLine: () => "",
    healthIntervalMs: 1000,
    stopTimeoutMs: 3000,
    logsBufferBytes: 1024,
  });
  registerSupervisor(supervisor);
  try {
    const status = await supervisor.start();
    if (status.state !== "running" || status.health !== "healthy" || !status.pid)
      throw new Error("Managed core did not start healthy");
    log.info({ pid: status.pid }, "Managed proxy core listeners ready");
  } catch (error) {
    log.error("Managed proxy core startup failed");
    await supervisor.stop();
    unregisterSupervisor(tool);
    throw error;
  }
}

export async function stopManaged(core: ManagedCore): Promise<void> {
  const tool = `managed-proxy-${core}`;
  const supervisor = getSupervisor(tool);
  if (supervisor) {
    await supervisor.stop();
    unregisterSupervisor(tool);
    const { logger } = await import("@/shared/utils/logger");
    logger.info({ module: "managed-proxy", core }, "Managed proxy core stopped");
  }
}
