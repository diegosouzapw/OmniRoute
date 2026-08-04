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

export async function GET() {
  const guard = isLocalRequestAllowed();
  if (!guard.allowed) {
    return NextResponse.json({ error: guard.reason }, { status: 403 });
  }

  const runtime = await detectRuntime();
  if (!runtime) {
    return NextResponse.json(
      { exists: false, running: false, reachable: false, error: "No container runtime (podman or docker) found on PATH" },
      { status: 503 }
    );
  }

  const { exists, running } = await containerState(runtime);
  const reachable = running ? await pingRedis(HOST_PORT) : false;
  return NextResponse.json({ runtime, name: CONTAINER_NAME, port: HOST_PORT, exists, running, reachable });
}