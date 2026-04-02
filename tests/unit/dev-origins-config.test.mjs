import test from "node:test";
import assert from "node:assert/strict";

test("next config allows loopback dev origins alongside LAN access", async () => {
  const { default: nextConfig } = await import("../../next.config.mjs");

  assert.deepEqual(nextConfig.allowedDevOrigins, [
    "localhost",
    "127.0.0.1",
    "172.30.1.50",
    "10.*",
    "192.168.*",
    "172.16.*",
    "172.17.*",
    "172.18.*",
    "172.19.*",
    "172.20.*",
    "172.21.*",
    "172.22.*",
    "172.23.*",
    "172.24.*",
    "172.25.*",
    "172.26.*",
    "172.27.*",
    "172.28.*",
    "172.29.*",
    "172.30.*",
    "172.31.*",
  ]);
});
