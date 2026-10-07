import { describe, it, afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";
import type net from "node:net";
import { SocksClient, type SocksClientOptions, type SocksProxy } from "socks";
import type { buildConnector } from "undici";

// Lightweight oracle — node:test, no vi.mock.
// We patch SocksClient.createConnection (writable) and inject a fake
// buildConnector via the 5th param to capture the TLS timeout without
// mutating the read-only undici module.

describe("socks connectTimeout forwarder", () => {
  let capturedTimeout: number | undefined = undefined;
  let capturedTlsTimeout: number | null | undefined = undefined;
  let capturedTlsUndefined = false;
  let origCreateConnection: typeof SocksClient.createConnection;

  beforeEach(() => {
    origCreateConnection = SocksClient.createConnection;
    capturedTimeout = undefined;
    capturedTlsTimeout = undefined;
    capturedTlsUndefined = false;
    SocksClient.createConnection = (async (opts: SocksClientOptions) => {
      capturedTimeout = opts?.timeout;
      return { socket: { setNoDelay: () => ({ setNoDelay: () => {} }) } } as unknown as Awaited<
        ReturnType<typeof origCreateConnection>
      >;
    }) as typeof SocksClient.createConnection;
  });

  afterEach(() => {
    SocksClient.createConnection = origCreateConnection;
    capturedTimeout = undefined;
    capturedTlsTimeout = undefined;
    capturedTlsUndefined = false;
  });

  function fakeBuildConnector(opts: buildConnector.BuildOptions = {}): buildConnector.connector {
    if (opts && typeof opts.timeout !== "undefined") capturedTlsTimeout = opts.timeout;
    else capturedTlsUndefined = true;
    return (_options, cb) => cb(null, { setNoDelay: () => ({}) } as unknown as net.Socket);
  }

  async function driveConnector(args: {
    family: 4 | 6 | null;
    tlsOpts?: buildConnector.BuildOptions;
    connectTimeout?: number;
    protocol?: string;
    hostname?: string;
    port?: string;
  }) {
    const mod = (await import(
      `../../open-sse/utils/socksConnectorWithFamily.ts?t=${Date.now()}-${Math.random()}`
    )) as typeof import("../../open-sse/utils/socksConnectorWithFamily.ts");
    const proxy: SocksProxy = { host: "1.2.3.4", port: 1080, type: 5 };
    const tlsOpts = args.tlsOpts ?? {};
    const connectTimeout = args.connectTimeout;
    const connector = mod.socksConnectorWithFamily(
      proxy,
      args.family,
      tlsOpts,
      connectTimeout,
      fakeBuildConnector
    );
    await new Promise<void>((resolve, reject) =>
      connector(
        {
          protocol: args.protocol ?? "https:",
          hostname: args.hostname ?? "example.com",
          port: args.port ?? "443",
        },
        (err) => (err ? reject(err) : resolve())
      )
    );
    return { capturedTimeout, capturedTlsTimeout, capturedTlsUndefined, mod, connector };
  }

  it("U1: Agent.connectTimeout → SocksClient.timeout + TLS timeout", async () => {
    const { capturedTimeout: t, capturedTlsTimeout: tls } = await driveConnector({
      family: 4,
      tlsOpts: {},
      connectTimeout: 5000,
      protocol: "https:",
      port: "443",
    });
    assert.equal(t, 5000);
    assert.equal(tls, 5000);
  });

  it("U2: fallback sans connectTimeout → SOCKS_HANDSHAKE (TLS no timeout)", async () => {
    const prev = process.env.SOCKS_HANDSHAKE_TIMEOUT_MS;
    process.env.SOCKS_HANDSHAKE_TIMEOUT_MS = "7777";
    try {
      const { capturedTimeout: t, capturedTlsUndefined: tlsUndef } = await driveConnector({
        family: 6,
        tlsOpts: {},
        connectTimeout: undefined,
        protocol: "https:",
        port: "443",
      });
      assert.equal(t, 7777);
      assert.equal(tlsUndef, true);
    } finally {
      if (prev === undefined) delete process.env.SOCKS_HANDSHAKE_TIMEOUT_MS;
      else process.env.SOCKS_HANDSHAKE_TIMEOUT_MS = prev;
    }
  });

  it("U3: http (no TLS) still bounds SocksClient", async () => {
    const { capturedTimeout: t } = await driveConnector({
      family: null,
      tlsOpts: {},
      connectTimeout: 5000,
      protocol: "http:",
      port: "80",
    });
    assert.equal(t, 5000);
  });

  it("U4: connectTimeout=0 → SocksClient undefined (SOCKS defaults to 30s) + TLS timeout 0 (disabled)", async () => {
    const { capturedTimeout: t, capturedTlsTimeout: tls } = await driveConnector({
      family: 4,
      tlsOpts: {},
      connectTimeout: 0,
      protocol: "https:",
      port: "443",
    });
    assert.equal(t, undefined);
    assert.equal(tls, 0);
  });
});
