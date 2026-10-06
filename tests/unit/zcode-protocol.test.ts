import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { ZcodeAppServerClient } from "../../open-sse/executors/zcodeProtocol.ts";

const fixture = join(process.cwd(), "tests/fixtures/fake-zcode-app-server.mjs");

test("ZCode protocol performs hello handshake and exchanges fragmented framed RPC", async () => {
  const client = new ZcodeAppServerClient({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    startupTimeoutMs: 3000,
    requestTimeoutMs: 3000,
  });
  try {
    await client.start();
    const result = await client.call("zcode-agent", "initialize", [
      { workspacePath: "/workspace", workspaceIdentity: "/workspace" },
    ]);
    assert.deepEqual(result, {
      available: true,
      protocolName: "ZCode Protocol",
      protocolVersion: 1,
      transportKind: "stdio",
    });
  } finally {
    await client.close();
  }
});
