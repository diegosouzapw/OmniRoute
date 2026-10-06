import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";

const execFileAsync = promisify(execFile);

const CONTAINER_NAME = process.env.OMNIROUTE_REDIS_CONTAINER_NAME || "omniroute-redis";
const HOST_PORT = process.env.OMNIROUTE_REDIS_HOST_PORT || "6379";

const RUNTIME_PREFERENCE = ["podman", "docker"];

async function detectRuntime(): Promise<string | null> {
  for (const candidate of RUNTIME_PREFERENCE) {
    try {
      await execFileAsync(candidate, ["--version"], { timeout: 3000 });
      return candidate;
    } catch {
      // try next
    }
  }
  return null;
}

async function containerState(runtime: string) {
  try {
    const { stdout } = await execFileAsync(runtime, [
      "ps",
      "-a",
      "--filter",
      `name=^${CONTAINER_NAME}$`,
      "--format",
      "{{.Names}}\t{{.State}}",
    ]);
    const trimmed = stdout.trim();
    if (!trimmed) return { exists: false, running: false };
    const [, state] = trimmed.split("\t");
    return { exists: true, running: state === "running" };
  } catch {
    return { exists: false, running: false };
  }
}

async function pingRedis(port: string): Promise<boolean> {
  return new Promise((resolve) => {
    import("node:net").then(({ createConnection }) => {
      const socket = createConnection({ port: Number(port), host: "127.0.0.1" });
      const timeout = setTimeout(() => {
        socket.destroy();
        resolve(false);
      }, 1500);
      socket.once("connect", () => {
        clearTimeout(timeout);
        socket.end();
        resolve(true);
      });
      socket.once("error", () => {
        clearTimeout(timeout);
        resolve(false);
      });
    });
  });
}

function parseRedisUrl(url?: string): { host: string; port: number } | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return { host: u.hostname || "127.0.0.1", port: Number(u.port) || 6379 };
  } catch {
    return null;
  }
}

export async function GET() {
  const guard = isLocalRequestAllowed();
  if (!guard.allowed) {
    const reason = (guard as { reason?: string }).reason ?? "Forbidden: not a loopback request";
    return NextResponse.json({ error: reason }, { status: 403 });
  }

  // Docker/Podman container state (the 1-click launcher path).
  const runtime = await detectRuntime();
  let container = { exists: false, running: false, reachable: false };
  if (runtime) {
    const { exists, running } = await containerState(runtime);
    const reachable = running ? await pingRedis(HOST_PORT) : false;
    container = { exists, running, reachable };
  }

  // Native Redis via REDIS_URL (the production path this instance uses). OmniRoute
  // is "connected" whenever REDIS_URL is configured AND the server answers — even
  // when no Docker container is present.
  const redisUrl = process.env.REDIS_URL?.trim() || "";
  const parsed = parseRedisUrl(redisUrl);
  const redisUrlReachable = parsed ? await pingRedis(String(parsed.port)) : false;

  const running = container.running || redisUrlReachable;
  const reachable = container.reachable || redisUrlReachable;
  const exists = container.exists || redisUrlReachable;

  return NextResponse.json({
    runtime: runtime ?? null,
    name: CONTAINER_NAME,
    port: HOST_PORT,
    exists,
    running,
    reachable,
    redisUrlConfigured: Boolean(redisUrl),
    redisUrlReachable,
  });
}