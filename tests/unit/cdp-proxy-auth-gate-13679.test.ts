import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn, type ChildProcess } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROXY_SCRIPT = path.resolve(
  __dirname,
  "../../docker/chatgpt-web-codex-browser/cdp-proxy.mjs"
);
const UPSTREAM_PORT = 9222; // upstreamPort in cdp-proxy.mjs
const PROXY_PORT = 9223; // listenPort in cdp-proxy.mjs
const TOKEN = "test-secret-token-13679";
const TOKEN_HEADER = "X-Omni-Cdp-Token";

// #13679 item #9: docker/chatgpt-web-codex-browser/cdp-proxy.mjs republishes
// Chromium's loopback CDP (127.0.0.1:9222) onto 0.0.0.0:9223 with NO auth
// check at all — unlike the sibling docker/vnc-browser/chromium/cdp-bridge.py,
// which requires an `X-Omni-Cdp-Token` header once CDP_BRIDGE_TOKEN is set
// (#12571). This proves cdp-proxy.mjs must gate requests the same way once an
// operator opts in via CDP_PROXY_TOKEN.

function waitForListening(server: http.Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.once("listening", () => resolve());
    server.once("error", reject);
  });
}

function waitForProxyReady(child: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("cdp-proxy.mjs did not report ready in time")),
      5000
    );
    child.stderr?.on("data", (chunk: Buffer) => {
      if (chunk.toString("utf8").includes("listening on")) {
        clearTimeout(timer);
        resolve();
      }
    });
    child.once("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`cdp-proxy.mjs exited early with code ${code}`));
    });
  });
}

function startUpstream(): Promise<{ server: http.Server; receivedAnyRequest: () => boolean }> {
  let received = false;
  const server = http.createServer((_req, res) => {
    received = true;
    // Real Chromium CDP responses always carry Content-Length (never
    // chunked) — match that here, since cdp-proxy.mjs blindly re-adds a
    // computed content-length on top of whatever the upstream sent.
    const body = "{}";
    res.writeHead(200, {
      "content-type": "application/json",
      "content-length": String(body.length),
    });
    res.end(body);
  });
  return waitForListening(server.listen(UPSTREAM_PORT, "127.0.0.1")).then(() => ({
    server,
    receivedAnyRequest: () => received,
  }));
}

function startProxy(): ChildProcess {
  return spawn(process.execPath, [PROXY_SCRIPT], {
    stdio: ["ignore", "ignore", "pipe"],
    env: { ...process.env, CDP_PROXY_TOKEN: TOKEN },
  });
}

function requestProxy(headers: Record<string, string>): Promise<number | null> {
  return new Promise((resolve) => {
    const req = http.request(
      { host: "127.0.0.1", port: PROXY_PORT, path: "/json/version", method: "GET", headers },
      (res) => {
        res.resume();
        resolve(res.statusCode ?? null);
      }
    );
    req.on("error", () => resolve(null));
    req.end();
  });
}

test("cdp-proxy.mjs must reject a request with no CDP token once CDP_PROXY_TOKEN is set (#13679)", async () => {
  const upstream = await startUpstream();
  const proxy = startProxy();

  try {
    await waitForProxyReady(proxy);
    const status = await requestProxy({});

    assert.notEqual(
      status,
      200,
      "cdp-proxy.mjs forwarded an unauthenticated request straight through to Chromium's CDP " +
        "port even though CDP_PROXY_TOKEN was set — the proxy has no auth gate at all"
    );
    assert.equal(
      upstream.receivedAnyRequest(),
      false,
      "cdp-proxy.mjs must not forward the request upstream before checking the CDP token"
    );
  } finally {
    proxy.kill("SIGKILL");
    await new Promise<void>((resolve) => upstream.server.close(() => resolve()));
  }
});

test("cdp-proxy.mjs forwards the request once the caller presents the configured token (#13679)", async () => {
  const upstream = await startUpstream();
  const proxy = startProxy();

  try {
    await waitForProxyReady(proxy);
    const status = await requestProxy({ [TOKEN_HEADER]: TOKEN });

    assert.equal(
      status,
      200,
      "cdp-proxy.mjs should forward the request once the caller presents the correct " +
        "CDP_PROXY_TOKEN"
    );
    assert.equal(upstream.receivedAnyRequest(), true);
  } finally {
    proxy.kill("SIGKILL");
    await new Promise<void>((resolve) => upstream.server.close(() => resolve()));
  }
});
