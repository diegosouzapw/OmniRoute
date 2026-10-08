import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MockAgent, fetch } from "undici";
import {
  buildSocksFamilySocketOptions,
  createSocksDispatcherWithFamily,
  socksConnectorWithFamily,
} from "../../open-sse/utils/socksConnectorWithFamily.ts";

describe("socksConnectorWithFamily", () => {
  it("returns family:6 + autoSelectFamily:false for ipv6", () => {
    assert.deepEqual(buildSocksFamilySocketOptions(6), { family: 6, autoSelectFamily: false });
  });
  it("returns family:4 + autoSelectFamily:false for ipv4", () => {
    assert.deepEqual(buildSocksFamilySocketOptions(4), { family: 4, autoSelectFamily: false });
  });
  it("returns an empty object for auto (no pin)", () => {
    assert.deepEqual(buildSocksFamilySocketOptions(null), {});
  });
});

// Inspect the options at the real Agent-to-pool dispatch boundary without network I/O.
it("SOCKS dispatch disables HTTP/2 even when the caller enables it", async () => {
  const mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  const pool = mockAgent.get("https://example.com");
  pool.intercept({ path: "/", method: "GET" }).reply(200, "ok");
  let dispatchedOptions: Record<string, unknown> | undefined;
  const dispatcher = createSocksDispatcherWithFamily(
    { host: "127.0.0.1", port: 1080, type: 5 },
    4,
    {
      allowH2: true,
      factory: (_origin, options) => {
        dispatchedOptions = options as Record<string, unknown>;
        return pool;
      },
    }
  );
  try {
    const response = await fetch("https://example.com/", { dispatcher });
    assert.equal(await response.text(), "ok");
    assert.ok(dispatchedOptions, "the Agent must dispatch through the pool factory");
    assert.equal(dispatchedOptions.allowH2, false);
    mockAgent.assertNoPendingInterceptors();
  } finally {
    await dispatcher.close();
    await mockAgent.close();
  }
});

// The custom connect bypasses Agent.allowH2; the TLS connector itself must not offer h2 via ALPN.
it("SOCKS TLS connector is built with allowH2:false", () => {
  let built: Record<string, unknown> | undefined;
  const fakeBuild = ((opts: Record<string, unknown>) => {
    built = opts;
    return () => {};
  }) as never;
  socksConnectorWithFamily(
    { host: "127.0.0.1", port: 1080, type: 5 },
    4,
    { allowH2: true } as never,
    5000,
    fakeBuild
  );
  assert.equal(built?.allowH2, false);
  assert.equal(built?.timeout, 5000);
});
