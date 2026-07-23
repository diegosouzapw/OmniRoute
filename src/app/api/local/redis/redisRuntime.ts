import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const REDIS_CONTAINER_NAME = process.env.OMNIROUTE_REDIS_CONTAINER_NAME || "omniroute-redis";

export const RUNTIME_PREFERENCE = ["podman", "docker"] as const;

type ExecFileAsync = (
  file: string,
  args: readonly string[],
  options: { timeout: number }
) => Promise<{ stdout: string; stderr: string }>;

const execFileAsync = promisify(execFile) as ExecFileAsync;

export async function detectRedisContainerRuntime(
  runCommand: ExecFileAsync = execFileAsync
): Promise<string | null> {
  for (const candidate of RUNTIME_PREFERENCE) {
    try {
      await runCommand(candidate, ["--version"], { timeout: 3000 });
      return candidate;
    } catch {
      // try next
    }
  }
  return null;
}

export function redisRuntimeUnavailableResponse() {
  return NextResponse.json(
    { ok: false, error: "No container runtime (podman or docker) found on PATH" },
    { status: 503 }
  );
}

export async function runRedisRuntimeCommand(
  runtime: string,
  args: readonly string[],
  timeout: number,
  runCommand: ExecFileAsync = execFileAsync
) {
  const { stdout, stderr } = await runCommand(runtime, args, { timeout });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
}
