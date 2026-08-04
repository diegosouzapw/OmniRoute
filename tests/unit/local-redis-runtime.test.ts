import assert from "node:assert/strict";
import { test } from "node:test";

import {
  REDIS_CONTAINER_NAME,
  detectRedisContainerRuntime,
  redisRuntimeUnavailableResponse,
  runRedisRuntimeCommand,
} from "../../src/app/api/local/redis/redisRuntime.ts";

test("detectRedisContainerRuntime returns the first available runtime", async () => {
  const calls: string[] = [];
  const runtime = await detectRedisContainerRuntime(async (file) => {
    calls.push(file);
    if (file === "podman") {
      throw new Error("missing");
    }
    return { stdout: "Docker version 1\n", stderr: "" };
  });

  assert.equal(runtime, "docker");
  assert.deepEqual(calls, ["podman", "docker"]);
});

test("detectRedisContainerRuntime returns null when no runtime is available", async () => {
  const runtime = await detectRedisContainerRuntime(async () => {
    throw new Error("missing");
  });

  assert.equal(runtime, null);
});

test("runRedisRuntimeCommand trims command output", async () => {
  const result = await runRedisRuntimeCommand(
    "docker",
    ["stop", REDIS_CONTAINER_NAME],
    15_000,
    async () => ({
      stdout: " stopped \n",
      stderr: " warning \n",
    })
  );

  assert.deepEqual(result, { stdout: "stopped", stderr: "warning" });
});

test("redisRuntimeUnavailableResponse preserves the route error shape", async () => {
  const response = redisRuntimeUnavailableResponse();

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: "No container runtime (podman or docker) found on PATH",
  });
});
