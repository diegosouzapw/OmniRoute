/**
 * The well-known default management password may only be used from the host itself. That
 * decision, and the failed-attempt lockout key on `/api/auth/login` and `/api/cli/connect`,
 * must come from the peer address the authz pipeline stamps on the request, never from
 * `X-Forwarded-For`, `X-Real-IP` or `CF-Connecting-IP`, which any remote caller can set to
 * any value. Requests here go through `runAuthzPipeline` first, the way they do in the
 * server, so the stamping and the header stripping are part of what is tested.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-default-pw-peer-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "default-pw-peer-jwt-secret";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
const STAMP_TOKEN = "default-pw-peer-stamp-token";
process.env.OMNIROUTE_PEER_STAMP_TOKEN = STAMP_TOKEN;

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const pipeline = await import("../../src/server/authz/pipeline.ts");
const { PEER_IP_HEADER, VIA_PROXY_HEADER, AUTHZ_HEADER_TRUSTED_PEER_IP } =
  await import("../../src/server/authz/headers.ts");
const loginRoute = await import("../../src/app/api/auth/login/route.ts");
const connectRoute = await import("../../src/app/api/cli/connect/route.ts");

const originalGetCookieStore = loginRoute.authRouteInternals.getCookieStore;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.INITIAL_PASSWORD = "CHANGEME";
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = STAMP_TOKEN;
  loginRoute.authRouteInternals.getCookieStore = async () => ({ set() {} });
});

test.afterEach(() => {
  loginRoute.authRouteInternals.getCookieStore = originalGetCookieStore;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  if (ORIGINAL_STAMP_TOKEN === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  else process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_STAMP_TOKEN;
});

type Caller = {
  /** Socket peer address the server stamps. */
  peerIp: string;
  /** Whether the server saw X-Forwarded-For / X-Real-IP on the connection. */
  viaProxy?: boolean;
  forwardedFor?: string;
  /** Host the request is addressed to. */
  host?: string;
};

const LOCAL: Caller = { peerIp: "127.0.0.1" };

// Runs the request through the authz pipeline and rebuilds what the route handler receives:
// the pipeline strips caller-supplied trusted headers and forwards its own verdicts.
async function throughPipeline(url: string, body: unknown, caller: Caller): Promise<Request> {
  const host = caller.host ?? "localhost";
  const headers: Record<string, string> = {
    "content-type": "application/json",
    [PEER_IP_HEADER]: `${STAMP_TOKEN}|${caller.peerIp}`,
    [VIA_PROXY_HEADER]: `${STAMP_TOKEN}|${caller.viaProxy ? "1" : "0"}`,
  };
  if (caller.forwardedFor) headers["x-forwarded-for"] = caller.forwardedFor;
  const payload = JSON.stringify(body);
  const incoming = new NextRequest(`http://${host}${url}`, {
    method: "POST",
    headers,
    body: payload,
  });
  const res = await pipeline.runAuthzPipeline(incoming, { enforce: true });
  assert.equal(
    res.headers.get("x-middleware-next"),
    "1",
    `pipeline blocked the request: ${res.status}`
  );
  const forwarded = new Headers();
  for (const [name, value] of res.headers) {
    if (name.startsWith("x-middleware-request-")) {
      forwarded.set(name.slice("x-middleware-request-".length), value);
    }
  }
  return new Request(`http://${host}${url}`, { method: "POST", headers: forwarded, body: payload });
}

async function login(password: string, caller: Caller) {
  return loginRoute.POST((await throughPipeline("/api/auth/login", { password }, caller)) as never);
}

async function connect(password: string, caller: Caller) {
  return connectRoute.POST(
    (await throughPipeline("/api/cli/connect", { password, name: "cli" }, caller)) as never
  );
}

test("the host itself can still log in and pair with the default password", async () => {
  assert.equal((await login("CHANGEME", LOCAL)).status, 200);
  const res = await connect("CHANGEME", LOCAL);
  assert.equal(res.status, 200);
  assert.ok(((await res.json()) as { token?: string }).token);
});

test("a remote peer that forges X-Forwarded-For is refused the default password", async () => {
  const remote: Caller = {
    peerIp: "203.0.113.9",
    forwardedFor: "127.0.0.1",
    host: "omniroute.example",
  };
  const loginRes = await login("CHANGEME", remote);
  assert.equal(loginRes.status, 403);
  assert.equal(loginRes.headers.get("set-cookie"), null);
  const connectRes = await connect("CHANGEME", remote);
  assert.equal(connectRes.status, 403);
  assert.equal(((await connectRes.json()) as { token?: string }).token, undefined);
});

test("a LAN peer is refused the default password", async () => {
  const lan: Caller = { peerIp: "192.168.1.20", host: "192.168.1.5:20128" };
  assert.equal((await login("CHANGEME", lan)).status, 403);
  assert.equal((await connect("CHANGEME", lan)).status, 403);
});

test("a loopback proxy hop that reports forwarding headers is refused the default password", async () => {
  const proxied: Caller = {
    peerIp: "127.0.0.1",
    viaProxy: true,
    forwardedFor: "203.0.113.9",
    host: "omniroute.example",
  };
  assert.equal((await login("CHANGEME", proxied)).status, 403);
  assert.equal((await connect("CHANGEME", proxied)).status, 403);
});

test("a same-host proxy that adds no forwarding headers is refused when it passes a public Host", async () => {
  const silentProxy: Caller = { peerIp: "127.0.0.1", host: "omniroute.example" };
  assert.equal((await login("CHANGEME", silentProxy)).status, 403);
  assert.equal((await connect("CHANGEME", silentProxy)).status, 403);
});

test("the blocked-login audit row describes the peer, not the forwarded address", async () => {
  const remote: Caller = {
    peerIp: "203.0.113.9",
    forwardedFor: "127.0.0.1",
    host: "omniroute.example",
  };
  await login("CHANGEME", remote);
  const [entry] = compliance.getAuditLog({
    action: "auth.login.insecure_default_blocked",
    limit: 1,
  });
  assert.ok(entry, "expected an insecure_default_blocked audit entry");
  const metadata = entry.metadata as Record<string, unknown>;
  assert.equal(metadata.sourceScope, "public");
  assert.equal(metadata.peerLocality, "remote");
});

test("a wrong password from a remote peer forging X-Forwarded-For is not tagged internal", async () => {
  const remote: Caller = {
    peerIp: "203.0.113.10",
    forwardedFor: "127.0.0.1",
    host: "omniroute.example",
  };
  assert.equal((await login("wrong-password", remote)).status, 401);
  const [entry] = compliance.getAuditLog({ action: "auth.login.failed", limit: 1 });
  const metadata = entry.metadata as Record<string, unknown>;
  assert.equal(metadata.sourceScope, "public");
  assert.equal(metadata.internalOrigin, false);
});

test("the cli/connect audit rows keep the forwarded client address", async () => {
  const remote: Caller = {
    peerIp: "127.0.0.1",
    viaProxy: true,
    forwardedFor: "198.51.100.77",
    host: "omniroute.example",
  };
  assert.equal((await connect("wrong-password", remote)).status, 401);
  const [entry] = compliance.getAuditLog({ action: "cli.connect.failed", limit: 1 });
  assert.equal(entry.ip_address, "198.51.100.77");
});

async function lockoutStatuses(
  attempt: (password: string, caller: Caller) => Promise<Response>,
  peerIp: string
) {
  const statuses: number[] = [];
  for (let i = 0; i < 8; i += 1) {
    const res = await attempt(`wrong-guess-${i}`, {
      peerIp,
      forwardedFor: `203.0.113.${i + 1}`,
      host: "omniroute.example",
    });
    statuses.push(res.status);
  }
  return statuses;
}

test("the /api/auth/login lockout follows the peer, not a rotating X-Forwarded-For", async () => {
  const statuses = await lockoutStatuses(login, "198.51.100.44");
  assert.equal(statuses[0], 401);
  assert.equal(statuses.at(-1), 429, `no lockout after 8 wrong guesses: ${statuses.join(",")}`);
});

test("the /api/cli/connect lockout follows the peer, not a rotating X-Forwarded-For", async () => {
  const statuses = await lockoutStatuses(connect, "198.51.100.45");
  assert.equal(statuses[0], 401);
  assert.equal(statuses.at(-1), 429, `no lockout after 8 wrong guesses: ${statuses.join(",")}`);
});

test("a request with no stamped peer shares one lockout key instead of trusting X-Forwarded-For", async () => {
  // A request that reaches the handler without the pipeline's trusted peer header.
  const statuses: number[] = [];
  for (let i = 0; i < 8; i += 1) {
    const res = await connectRoute.POST(
      new Request("http://omniroute.example/api/cli/connect", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": `198.18.0.${i + 1}`,
          [AUTHZ_HEADER_TRUSTED_PEER_IP]: "",
        },
        body: JSON.stringify({ password: `wrong-guess-${i}`, name: "cli" }),
      }) as never
    );
    statuses.push(res.status);
  }
  assert.equal(statuses.at(-1), 429, `no lockout after 8 wrong guesses: ${statuses.join(",")}`);
});
