import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { deriveLiveWsPath, resolveLiveWsPublicUrl } from "../../src/shared/utils/wsPath.ts";

// #11331 — behind a reverse proxy the Combo Studio dashboard kept dialling
// `wss://<host>:20132/live-ws` and reported "Live disabled — WebSocket
// disconnected", ignoring the container's environment.
//
// The runtime-discovery path already existed: the browser reads
// `/api/v1/ws?handshake=1` precisely because `NEXT_PUBLIC_*` is inlined at BUILD
// time and a prebuilt Docker/npm image can never carry an operator's value. But
// the server side of that handshake read only the `NEXT_PUBLIC_`-prefixed name,
// so the echo had nothing to echo and the client fell back to the hardcoded port.

test("#11331 the runtime name is honoured", () => {
  assert.equal(
    resolveLiveWsPublicUrl({ LIVE_WS_PUBLIC_URL: "wss://omniroute.example.tld/live-ws" }),
    "wss://omniroute.example.tld/live-ws"
  );
});

test("#11331 the build-time name still works, and the runtime name wins", () => {
  assert.equal(
    resolveLiveWsPublicUrl({ NEXT_PUBLIC_LIVE_WS_PUBLIC_URL: "ws://built-in:20132/live-ws" }),
    "ws://built-in:20132/live-ws"
  );
  assert.equal(
    resolveLiveWsPublicUrl({
      LIVE_WS_PUBLIC_URL: "wss://proxy.example.tld/live-ws",
      NEXT_PUBLIC_LIVE_WS_PUBLIC_URL: "ws://built-in:20132/live-ws",
    }),
    "wss://proxy.example.tld/live-ws"
  );
});

test("#11331 only ws:// and wss:// are accepted", () => {
  assert.equal(resolveLiveWsPublicUrl({ LIVE_WS_PUBLIC_URL: "https://proxy.example.tld" }), null);
  assert.equal(resolveLiveWsPublicUrl({ LIVE_WS_PUBLIC_URL: "javascript:alert(1)" }), null);
  assert.equal(resolveLiveWsPublicUrl({ LIVE_WS_PUBLIC_URL: "proxy.example.tld:443" }), null);
});

test("#11331 blank and missing values fall through", () => {
  assert.equal(resolveLiveWsPublicUrl({}), null);
  assert.equal(resolveLiveWsPublicUrl({ LIVE_WS_PUBLIC_URL: "" }), null);
  assert.equal(resolveLiveWsPublicUrl({ LIVE_WS_PUBLIC_URL: "   " }), null);
  assert.equal(
    resolveLiveWsPublicUrl({
      LIVE_WS_PUBLIC_URL: "  ",
      NEXT_PUBLIC_LIVE_WS_PUBLIC_URL: "wss://b/live-ws",
    }),
    "wss://b/live-ws"
  );
});

test("#11331 a surrounding-whitespace value is trimmed, not rejected", () => {
  assert.equal(
    resolveLiveWsPublicUrl({ LIVE_WS_PUBLIC_URL: "  wss://proxy.example.tld/live-ws  " }),
    "wss://proxy.example.tld/live-ws"
  );
});

test("#11331 the path follows the resolved URL", () => {
  assert.equal(deriveLiveWsPath("wss://proxy.example.tld/omniroute/live"), "/omniroute/live");
  assert.equal(deriveLiveWsPath("wss://proxy.example.tld"), "/live-ws");
  assert.equal(deriveLiveWsPath(undefined), "/live-ws");
});

test("#11331 the handshake route resolves the URL at runtime", () => {
  const src = fs.readFileSync(new URL("../../src/app/api/v1/ws/route.ts", import.meta.url), "utf8");
  assert.ok(
    src.includes("resolveLiveWsPublicUrl()"),
    "the handshake must resolve the public URL at runtime"
  );
  assert.equal(
    /process\.env\.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL/.test(src),
    false,
    "the route must not read the build-time-only name directly"
  );
});
