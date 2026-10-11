import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn, type ChildProcess } from "node:child_process";
import path from "node:path";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROXY_SCRIPT = path.resolve(
  __dirname,
  "../../docker/chatgpt-web-codex-browser/cdp-proxy.mjs"
);
const UPSTREAM_PORT = 19222; // overridden via CDP_PROXY_UPSTREAM_PORT (avoids clashing with other cdp-proxy tests)
const PORT_ENV = {
  CDP_PROXY_LISTEN_PORT: "19223",
  CDP_PROXY_UPSTREAM_PORT: "19222",
};
const PROXY_PORT = 19223; // overridden via CDP_PROXY_LISTEN_PORT

// #14486: unlike the sibling docker/vnc-browser/chromium/cdp-bridge.py, which
// FAILS CLOSED when its token env var is unset (has_valid_token() returns
// False unconditionally when TOKEN is empty), cdp-proxy.mjs's hasValidToken()
// returns `true` when CDP_PROXY_TOKEN is unset (its default state — the
// docker-compose.yml service passes `CDP_PROXY_TOKEN=${CDP_PROXY_TOKEN:-}`,
// which is empty unless the operator opts in). A fresh install with no
// CDP_PROXY_TOKEN set forwards every CDP request, with full Runtime.evaluate
// control over the live browser session, to any caller that can reach
// 0.0.0.0:9223 with NO token at all. This proves that default (no-token)
// state is fail-OPEN, not fail-CLOSED.

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

function waitForListening(server: http.Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.once("listening", () => resolve());
    server.once("error", reject);
  });
}

function startUpstream(): Promise<{ server: http.Server; receivedAnyRequest: () => boolean }> {
  let received = false;
  const server = http.createServer((_req, res) => {
    received = true;
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

function startProxyWithTokenFile(file: string): ChildProcess {
  const env = { ...process.env, ...PORT_ENV, CDP_PROXY_TOKEN_FILE: file };
  delete env.CDP_PROXY_TOKEN;
  return spawn(process.execPath, [PROXY_SCRIPT], { stdio: ["ignore", "ignore", "pipe"], env });
}

function startProxyWithoutToken(): ChildProcess {
  // Simulate the actual default deploy state: CDP_PROXY_TOKEN unset/empty,
  // exactly as docker-compose.yml's `CDP_PROXY_TOKEN=${CDP_PROXY_TOKEN:-}`
  // resolves to when the operator has not opted in.
  const env = { ...process.env, ...PORT_ENV };
  delete env.CDP_PROXY_TOKEN;
  return spawn(process.execPath, [PROXY_SCRIPT], {
    stdio: ["ignore", "ignore", "pipe"],
    env,
  });
}

function requestProxyNoToken(headers: Record<string, string> = {}): Promise<number | null> {
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

test("cdp-proxy.mjs must FAIL CLOSED (reject) when CDP_PROXY_TOKEN is unset, matching cdp-bridge.py (#14486)", async () => {
  const upstream = await startUpstream();
  const proxy = startProxyWithoutToken();

  try {
    await waitForProxyReady(proxy);
    const status = await requestProxyNoToken();

    assert.equal(
      upstream.receivedAnyRequest(),
      false,
      "cdp-proxy.mjs forwarded a request to the live CDP upstream with NO " +
        "CDP_PROXY_TOKEN configured at all — full unauthenticated Runtime.evaluate " +
        "control over the browser session for anyone who can reach 0.0.0.0:9223 on the " +
        "default (no-token) deploy state (#14486)."
    );
    assert.notEqual(
      status,
      200,
      "cdp-proxy.mjs returned the upstream CDP response instead of refusing the " +
        "unauthenticated request when no CDP_PROXY_TOKEN was configured (#14486)."
    );
  } finally {
    proxy.kill("SIGKILL");
    await new Promise<void>((resolve) => upstream.server.close(() => resolve()));
  }
});

test("cdp-proxy.mjs auto-generates a token into CDP_PROXY_TOKEN_FILE and enforces it (#14486)", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "cdp-token-14486-"));
  const file = path.join(dir, "token");
  const upstream = await startUpstream();
  const proxy = startProxyWithTokenFile(file);
  try {
    await waitForProxyReady(proxy);
    const token = readFileSync(file, "utf8").trim();
    assert.match(token, /^[0-9a-f]{64}$/);
    assert.equal(await requestProxyNoToken(), 403);
    assert.equal(upstream.receivedAnyRequest(), false);
    assert.equal(await requestProxyNoToken({ "x-omni-cdp-token": "wrong" }), 403);
    assert.equal(await requestProxyNoToken({ "x-omni-cdp-token": token }), 200);
  } finally {
    proxy.kill("SIGKILL");
    await new Promise<void>((resolve) => upstream.server.close(() => resolve()));
    rmSync(dir, { recursive: true, force: true });
  }
});
