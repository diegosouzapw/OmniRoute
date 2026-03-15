import test from "node:test";
import assert from "node:assert/strict";

test("next config allows loopback dev origins alongside LAN access", async () => {
  const { default: nextConfig } = await import("../../next.config.mjs");

  assert.deepEqual(nextConfig.allowedDevOrigins, ["localhost", "127.0.0.1", "192.168.*"]);
});
