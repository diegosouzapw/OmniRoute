import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const execFileAsync = promisify(execFile);

const CONTAINER_NAME = process.env.OMNIROUTE_REDIS_CONTAINER_NAME || "omniroute-redis";

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

export async function POST() {
  const guard = isLocalRequestAllowed();
  if (!guard.allowed) {
    return NextResponse.json({ error: guard.reason }, { status: 403 });
  }

  const runtime = await detectRuntime();
  if (!runtime) {
    return NextResponse.json(
      { ok: false, error: "No container runtime (podman or docker) found on PATH" },
      { status: 503 }
    );
  }

  try {
    const { stdout, stderr } = await execFileAsync(runtime, ["stop", CONTAINER_NAME], { timeout: 15_000 });
    return NextResponse.json({ ok: true, runtime, name: CONTAINER_NAME, stdout: stdout.trim(), stderr: stderr.trim() });
  } catch (err) {
    const rawMessage = err instanceof Error ? err.message : String(err);
    // exit code != 0 from `stop` typically means "not running" — surface that as ok=false but don't 500
    if (rawMessage.includes("no container with name") || rawMessage.includes("No such container")) {
      return NextResponse.json({ ok: false, runtime, error: "not running" }, { status: 404 });
    }
    // Hard Rule #12: never put a raw execFile error (command line + paths) in the body.
    return NextResponse.json(
      { ok: false, runtime, error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}