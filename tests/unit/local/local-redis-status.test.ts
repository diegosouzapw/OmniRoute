/**
 * tests/unit/local-redis-status.test.ts
 *
 * Coverage for src/app/api/local/redis/status/route.ts:
 *   - The status endpoint must report OmniRoute as "connected" whenever the
 *     native REDIS_URL is reachable — not only when a Docker/Podman container
 *     is present. This is the production path used by this instance
 *     (redis on 127.0.0.1:6379, no container).
 *
 * Verified at the source-contract level (the route imports Next.js + the route
 * guard, which is heavy to import in the native runner and would make the test
 * environment-dependent on a live container runtime).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATUS_SRC = path.resolve(__dirname, "../../../src/app/api/local/redis/status/route.ts");
const src = fs.readFileSync(STATUS_SRC, "utf8");

test("redis status: reports running via REDIS_URL reachability, not only Docker", () => {
  assert.ok(src.includes("parseRedisUrl"), "status route must parse REDIS_URL");
  assert.ok(
    src.includes("redisUrlReachable"),
    "status route must probe REDIS_URL reachability"
  );
  assert.ok(
    src.includes("redisUrlConfigured"),
    "status route must report whether REDIS_URL is configured"
  );
  assert.ok(
    src.includes("const running = container.running || redisUrlReachable;"),
    "status route must treat a reachable native REDIS_URL as a connected state"
  );
});
