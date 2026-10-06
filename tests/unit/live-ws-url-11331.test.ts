import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  deriveLiveWsPath,
  resolveLiveWsUrl,
  sanitizeLiveWsPort,
} from "../../src/shared/utils/wsPath.ts";

/**
 * The /api/v1/ws?handshake=1 response reports `live.port` — the port the live
 * server is actually listening on — but the dashboard client read only
 * `publicUrl` and `path`. An operator who moved the server with LIVE_WS_PORT
 * still got the compiled-in 20132 and a permanently disconnected Combo Studio
 * (#11331).
 */
const DEFAULT_URL = "wss://omniroute.example.tld:20132/live-ws";

describe("sanitizeLiveWsPort", () => {
  it("accepts a port in range, as a number or a string", () => {
    assert.equal(sanitizeLiveWsPort(20140), 20140);
    assert.equal(sanitizeLiveWsPort("20140"), 20140);
  });

  it("rejects anything that is not a usable port", () => {
    for (const value of [0, -1, 65536, 1.5, "", "abc", null, undefined, {}, NaN]) {
      assert.equal(sanitizeLiveWsPort(value), null, `expected null for ${String(value)}`);
    }
  });
});

describe("resolveLiveWsUrl", () => {
  it("uses the port the handshake reports instead of the compiled-in one", () => {
    const url = resolveLiveWsUrl({ handshakePort: 20140, defaultUrl: DEFAULT_URL });
    assert.equal(new URL(url).port, "20140");
    assert.equal(new URL(url).hostname, "omniroute.example.tld");
    assert.equal(new URL(url).pathname, "/live-ws");
  });

  it("keeps the default when the handshake reports nothing", () => {
    assert.equal(resolveLiveWsUrl({ defaultUrl: DEFAULT_URL }), DEFAULT_URL);
  });

  it("ignores a port the handshake cannot mean", () => {
    assert.equal(resolveLiveWsUrl({ handshakePort: 0, defaultUrl: DEFAULT_URL }), DEFAULT_URL);
    assert.equal(
      resolveLiveWsUrl({ handshakePort: 70000 as number, defaultUrl: DEFAULT_URL }),
      DEFAULT_URL
    );
  });

  it("applies the port and the path together", () => {
    const url = new URL(
      resolveLiveWsUrl({ handshakePort: 9443, handshakePath: "/ws/live", defaultUrl: DEFAULT_URL })
    );
    assert.equal(url.port, "9443");
    assert.equal(url.pathname, "/ws/live");
  });

  it("ignores a path that is not a path", () => {
    const url = new URL(resolveLiveWsUrl({ handshakePath: "live-ws", defaultUrl: DEFAULT_URL }));
    assert.equal(url.pathname, "/live-ws");
  });

  it("lets a complete publicUrl win over the reported port", () => {
    assert.equal(
      resolveLiveWsUrl({
        handshakeUrl: "wss://omniroute.example.tld/live-ws",
        handshakePort: 20140,
        defaultUrl: DEFAULT_URL,
      }),
      "wss://omniroute.example.tld/live-ws"
    );
  });

  it("lets an explicit wsUrl win over everything", () => {
    assert.equal(
      resolveLiveWsUrl({
        explicit: "wss://elsewhere.example/socket",
        handshakeUrl: "wss://omniroute.example.tld/live-ws",
        handshakePort: 20140,
        defaultUrl: DEFAULT_URL,
      }),
      "wss://elsewhere.example/socket"
    );
  });

  it("falls back to the default rather than throwing on an unparseable default", () => {
    assert.equal(resolveLiveWsUrl({ handshakePort: 20140, defaultUrl: "not a url" }), "not a url");
  });

  it("leaves deriveLiveWsPath alone", () => {
    assert.equal(deriveLiveWsPath("wss://host:20132/ws/live"), "/ws/live");
    assert.equal(deriveLiveWsPath("wss://host:20132/"), "/live-ws");
    assert.equal(deriveLiveWsPath(undefined), "/live-ws");
  });
});
