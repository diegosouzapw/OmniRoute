import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRunArgs, sessionKey } from "@/lib/vncSession/service";
import { VNC_CONFIG } from "@/lib/vncSession/manifest";

test("buildRunArgs (#12571) injects the CDP bridge token and a non-default network", () => {
  const args = buildRunArgs({
    containerName: sessionKey("session-abc"),
    sessionId: "session-abc",
    connectionId: "connection-xyz",
    profileDir: "/tmp/profile",
    chromeCli: "--remote-debugging-port=9222 https://example.com",
    cdpToken: "super-secret-token",
  });

  const networkIndex = args.indexOf("--network");
  assert.ok(networkIndex >= 0, "docker run args must include --network");
  assert.equal(args[networkIndex + 1], VNC_CONFIG.network);
  assert.notEqual(
    args[networkIndex + 1],
    "bridge",
    "must not join Docker's default bridge network (#12571)"
  );

  const envFlags = args.filter((_value, index) => args[index - 1] === "-e");
  assert.ok(
    envFlags.some((flag) => flag === "CDP_BRIDGE_TOKEN=super-secret-token"),
    "docker run args must inject CDP_BRIDGE_TOKEN for the container's cdp-bridge.py"
  );
});

test("buildRunArgs (#12571) generates a distinct token per call so sessions cannot reuse each other's secret", () => {
  const base = {
    containerName: "c",
    sessionId: "s",
    connectionId: "conn",
    profileDir: "/tmp/p",
    chromeCli: "--x",
  };
  const argsA = buildRunArgs({ ...base, cdpToken: "token-a" });
  const argsB = buildRunArgs({ ...base, cdpToken: "token-b" });

  assert.ok(argsA.includes("CDP_BRIDGE_TOKEN=token-a"));
  assert.ok(argsB.includes("CDP_BRIDGE_TOKEN=token-b"));
  assert.notDeepEqual(argsA, argsB);
});
