import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const REDIS_CONTAINER_NAME = process.env.OMNIROUTE_REDIS_CONTAINER_NAME || "omniroute-redis";

export const RUNTIME_PREFERENCE = ["podman", "docker"] as const;

// The 1-click launcher starts Redis without AUTH, so its published port stays
// on loopback. `-p 6379:6379` would bind 0.0.0.0 and expose an unauthenticated
// Redis to the whole LAN. Operators who really need remote access set
// OMNIROUTE_REDIS_BIND_HOST and secure the instance themselves.
export const REDIS_DEFAULT_BIND_HOST = "127.0.0.1";

/**
 * Build the `-p` publish spec for the launcher's Redis container.
 * Always host-qualified so the container runtime never falls back to 0.0.0.0.
 */
export function buildRedisPublishSpec(
  bindHost: string = REDIS_DEFAULT_BIND_HOST,
  hostPort: string | number = "6379"
): string {
  const host = String(bindHost || REDIS_DEFAULT_BIND_HOST).trim() || REDIS_DEFAULT_BIND_HOST;
  const port = String(hostPort || "6379").trim() || "6379";
  // Bracket IPv6 literals (e.g. ::1) so `host:port:port` stays unambiguous.
  const normalizedHost = host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
  return `${normalizedHost}:${port}:6379`;
}

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
