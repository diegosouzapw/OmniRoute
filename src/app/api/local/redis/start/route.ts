import { NextResponse } from "next/server";

import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import {
  REDIS_CONTAINER_NAME,
  detectRedisContainerRuntime,
  redisRuntimeUnavailableResponse,
  runRedisRuntimeCommand,
} from "../redisRuntime";

const HOST_PORT = process.env.OMNIROUTE_REDIS_HOST_PORT || "6379";
const IMAGE = process.env.OMNIROUTE_REDIS_IMAGE || "docker.io/redis:7-alpine";

export async function POST() {
  const guard = isLocalRequestAllowed();
  if (!guard.allowed) {
    return NextResponse.json({ error: guard.reason }, { status: 403 });
  }

  const runtime = await detectRedisContainerRuntime();
  if (!runtime) {
    return redisRuntimeUnavailableResponse();
  }

  try {
    // -d detached, -p publish, --restart unless-stopped for dev convenience.
    // NOTE: do NOT add --rm — it conflicts with --restart ("Conflicting options:
    // --restart and --rm") and the runtime rejects the run. --restart already keeps
    // the container around across the dev session; `down` removes it explicitly.
    const args = [
      "run",
      "-d",
      "--name",
      REDIS_CONTAINER_NAME,
      "-p",
      `${HOST_PORT}:6379`,
      "--restart",
      "unless-stopped",
      IMAGE,
    ];
    const { stdout, stderr } = await runRedisRuntimeCommand(runtime, args, 30_000);
    return NextResponse.json({
      ok: true,
      runtime,
      name: REDIS_CONTAINER_NAME,
      port: HOST_PORT,
      stdout,
      stderr,
    });
  } catch (err) {
    // Hard Rule #12: never put a raw execFile error (command line + paths) in the body.
    return NextResponse.json(
      { ok: false, runtime, error: sanitizeErrorMessage(err) },
      { status: 500 }
    );
  }
}
