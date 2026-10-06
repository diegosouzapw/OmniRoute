/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import { spawnSync, type SpawnSyncOptions } from "node:child_process";

export interface CommandResult {
  status: number;
  stdout: string;
  stderr: string;
}

export function processRunning(
  pid: unknown,
  probe: (pid: number, signal: 0) => void = process.kill
): boolean {
  if (!Number.isInteger(pid) || (pid as number) < 1) return false;
  try {
    probe(pid as number, 0);
    return true;
  } catch (error) {
    // Windows and hardened Unix environments can deny signalling an existing process. EPERM is
    // existence evidence, not proof that the launcher/browser/tunnel owner disappeared.
    return (error as NodeJS.ErrnoException)?.code === "EPERM";
  }
}

export function runCommand(
  command: string,
  args: string[],
  options: SpawnSyncOptions = {}
): CommandResult {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: "pipe",
    ...options,
  });
  if (result.error) throw result.error;
  return {
    status: result.status ?? 1,
    stdout:
      typeof result.stdout === "string" ? result.stdout : (result.stdout?.toString("utf8") ?? ""),
    stderr:
      typeof result.stderr === "string" ? result.stderr : (result.stderr?.toString("utf8") ?? ""),
  };
}

export function runChecked(
  command: string,
  args: string[],
  options: SpawnSyncOptions = {}
): CommandResult {
  const result = runCommand(command, args, options);
  if (result.status !== 0) {
    const detail = result.stderr.trim() || result.stdout.trim() || `exit ${result.status}`;
    throw new Error(`${command} ${args.join(" ")} failed: ${detail}`);
  }
  return result;
}
