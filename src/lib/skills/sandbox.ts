import { createRequire } from "module";
import type { ChildProcess } from "child_process";
import { randomUUID } from "crypto";
import {
  resolveProvider,
  buildKillCommand,
  type ContainerProvider,
  type SandboxConfig,
  type SandboxRuntimeId,
} from "./containerProvider.ts";

const require = createRequire(import.meta.url);
const childProcess = require("child_process") as typeof import("child_process");

interface SandboxResult {
  id: string;
  runtime: SandboxRuntimeId;
  exitCode: number | null;
  stdout: string;
  stderr: string;
  duration: number;
  killed: boolean;
}

const DEFAULT_CONFIG: SandboxConfig = {
  cpuLimit: 100,
  memoryLimit: 256,
  timeout: 30000,
  networkEnabled: false,
  readOnly: true,
};

class SandboxRunner {
  private static instance: SandboxRunner;
  private runningContainers: Map<string, ChildProcess> = new Map();
  private config: SandboxConfig;
  private cachedProvider: ContainerProvider | null = null;

  private constructor(config: Partial<SandboxConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  static getInstance(config?: Partial<SandboxConfig>): SandboxRunner {
    if (!SandboxRunner.instance) {
      SandboxRunner.instance = new SandboxRunner(config);
    }
    return SandboxRunner.instance;
  }

  setConfig(config: Partial<SandboxConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Returns the container provider that the next `run()` call will use.
   * Resolution is async (it shells out to probe installed runtimes) so the
   * caller must `await`. The result is cached on the runner for the
   * remainder of the process so subsequent `run()` calls stay sync-friendly.
   */
  async getProvider(): Promise<ContainerProvider> {
    if (!this.cachedProvider) {
      this.cachedProvider = await resolveProvider();
    }
    return this.cachedProvider;
  }

  async run(
    image: string,
    command: string[],
    env: Record<string, string> = {},
    configOverride: Partial<SandboxConfig> = {}
  ): Promise<SandboxResult> {
    const sandboxId = randomUUID();
    const startTime = Date.now();
    const config = { ...this.config, ...configOverride };
    const provider = await this.getProvider();
    const resolved = provider.buildRun(image, command, sandboxId, config);

    return new Promise((resolve) => {
      const proc = childProcess.spawn(resolved.command, resolved.args, {
        env: { ...process.env, ...env },
        stdio: ["ignore", "pipe", "pipe"],
      });

      this.runningContainers.set(sandboxId, proc);

      let stdout = "";
      let stderr = "";

      proc.stdout?.on("data", (data) => {
        stdout += data.toString();
      });

      proc.stderr?.on("data", (data) => {
        stderr += data.toString();
      });

      const timeoutId = setTimeout(() => {
        this.kill(sandboxId);
      }, config.timeout);

      proc.on("close", (code) => {
        clearTimeout(timeoutId);
        this.runningContainers.delete(sandboxId);

        resolve({
          id: sandboxId,
          runtime: provider.id,
          exitCode: code,
          stdout,
          stderr,
          duration: Date.now() - startTime,
          killed: code === null,
        });
      });

      proc.on("error", (err) => {
        clearTimeout(timeoutId);
        this.runningContainers.delete(sandboxId);

        resolve({
          id: sandboxId,
          runtime: provider.id,
          exitCode: -1,
          stdout,
          stderr: err.message,
          duration: Date.now() - startTime,
          killed: false,
        });
      });
    });
  }

  kill(sandboxId: string): boolean {
    const proc = this.runningContainers.get(sandboxId);
    if (proc) {
      proc.kill("SIGTERM");
      this.runningContainers.delete(sandboxId);
      const provider = this.cachedProvider;
      if (provider) {
        const kill = buildKillCommand(provider, sandboxId);
        childProcess.spawn(kill.command, kill.args, { stdio: "ignore" });
      } else {
        childProcess.spawn("docker", ["kill", `omniroute-${sandboxId}`], {
          stdio: "ignore",
        });
      }
      return true;
    }
    return false;
  }

  killAll(): void {
    const provider = this.cachedProvider;
    for (const [id, proc] of this.runningContainers) {
      proc.kill("SIGTERM");
      if (provider) {
        const kill = buildKillCommand(provider, id);
        childProcess.spawn(kill.command, kill.args, { stdio: "ignore" });
      } else {
        childProcess.spawn("docker", ["kill", `omniroute-${id}`], {
          stdio: "ignore",
        });
      }
    }
    this.runningContainers.clear();
  }

  isRunning(sandboxId: string): boolean {
    return this.runningContainers.has(sandboxId);
  }

  getRunningCount(): number {
    return this.runningContainers.size;
  }
}

export const sandboxRunner = SandboxRunner.getInstance();
export type { SandboxConfig, SandboxResult };