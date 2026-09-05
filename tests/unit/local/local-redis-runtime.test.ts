import assert from "node:assert/strict";
import { test } from "node:test";

import {
  REDIS_CONTAINER_NAME,
  REDIS_DEFAULT_BIND_HOST,
  buildRedisPublishSpec,
  detectRedisContainerRuntime,
  redisRuntimeUnavailableResponse,
  runRedisRuntimeCommand,
} from "../../../src/app/api/local/redis/redisRuntime.ts";

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

// ─── Redis launcher must not publish on 0.0.0.0 ──────────────────────────
// The launcher starts Redis with no `requirepass`; a bare "6379:6379" publish
// spec binds every interface and hands the LAN an unauthenticated Redis.

test("buildRedisPublishSpec defaults to loopback, never 0.0.0.0", () => {
  assert.equal(REDIS_DEFAULT_BIND_HOST, "127.0.0.1");
  assert.equal(buildRedisPublishSpec(), "127.0.0.1:6379:6379");
  assert.equal(buildRedisPublishSpec(undefined, "6380"), "127.0.0.1:6380:6379");
});

test("buildRedisPublishSpec falls back to loopback for empty/blank bind hosts", () => {
  assert.equal(buildRedisPublishSpec("", "6379"), "127.0.0.1:6379:6379");
  assert.equal(buildRedisPublishSpec("   ", "6379"), "127.0.0.1:6379:6379");
  assert.equal(buildRedisPublishSpec("127.0.0.1", ""), "127.0.0.1:6379:6379");
});

test("buildRedisPublishSpec honours an explicit override and brackets IPv6", () => {
  // Opt-in exposure is still possible — it just can never be the default.
  assert.equal(buildRedisPublishSpec("0.0.0.0", "6379"), "0.0.0.0:6379:6379");
  assert.equal(buildRedisPublishSpec("::1", "6379"), "[::1]:6379:6379");
  assert.equal(buildRedisPublishSpec("[::1]", "6379"), "[::1]:6379:6379");
});

test("redisRuntimeUnavailableResponse preserves the route error shape", async () => {
  const response = redisRuntimeUnavailableResponse();

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: "No container runtime (podman or docker) found on PATH",
  });
});
