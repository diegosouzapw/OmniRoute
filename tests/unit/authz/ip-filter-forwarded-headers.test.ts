// The IP allow/deny list has to judge the address of the connection unless a proxy that may be
// trusted sits in front: a loopback or private-network proxy, a Cloudflare edge, or an address
// the operator names in OMNIROUTE_TRUSTED_PROXIES. A direct client on a public address can put
// any value in X-Forwarded-For, X-Real-IP or CF-Connecting-IP, so those headers must not change
// who the filter thinks it is talking to; behind a trusted proxy, only what the proxy itself
// added counts, not whatever the client sent ahead of it.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { wrapRequestListenerWithPeerStamp } from "../../../scripts/dev/peer-stamp.mjs";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ipfilter-fwd-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-secret-ipfilter-forwarded";

const core = await import("../../../src/lib/db/core.ts");
const ipFilter = await import("../../../open-sse/services/ipFilter.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");

const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
const ORIGINAL_TRUSTED_PROXIES = process.env.OMNIROUTE_TRUSTED_PROXIES;

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  restoreEnv("DATA_DIR", ORIGINAL_DATA_DIR);
  restoreEnv("OMNIROUTE_PEER_STAMP_TOKEN", ORIGINAL_STAMP_TOKEN);
  restoreEnv("OMNIROUTE_TRUSTED_PROXIES", ORIGINAL_TRUSTED_PROXIES);
});

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  ipFilter.resetIPFilter();
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-tok";
  delete process.env.OMNIROUTE_TRUSTED_PROXIES;
});

const BLOCKED = "203.0.113.9";
const ALLOWED = "203.0.113.10";

// What the custom server does before the request reaches the pipeline: stamp the socket peer.
function stampedRequest(peer: string, headers: Record<string, string>) {
  const stamped: Record<string, string> = {};
  wrapRequestListenerWithPeerStamp((req: { headers: Record<string, string> }) => {
    Object.assign(stamped, req.headers);
  })({ headers: { ...headers }, socket: { remoteAddress: peer } } as never, {} as never);
  return new NextRequest("http://localhost/v1/models", { headers: stamped });
}

async function blockedByIpFilter(request: NextRequest): Promise<boolean> {
  const res = await pipeline.runAuthzPipeline(request, { enforce: true });
  if (res.status !== 403) return false;
  const body = (await res.clone().json()) as { error?: unknown };
  return typeof body.error === "string" && /blacklist|not in whitelist|banned/i.test(body.error);
}

function blacklist(...ips: string[]) {
  ipFilter.configureIPFilter({ enabled: true, mode: "blacklist" });
  for (const ip of ips) ipFilter.addToBlacklist(ip);
}

function whitelist(...ips: string[]) {
  ipFilter.configureIPFilter({ enabled: true, mode: "whitelist" });
  for (const ip of ips) ipFilter.addToWhitelist(ip);
}

test("a direct client cannot dodge the blacklist with a forged forwarding header", async () => {
  blacklist(BLOCKED);

  for (const forged of [
    { "x-forwarded-for": ALLOWED },
    { "x-real-ip": ALLOWED },
    { "cf-connecting-ip": ALLOWED },
  ]) {
    assert.equal(
      await blockedByIpFilter(stampedRequest(BLOCKED, forged)),
      true,
      `forged ${Object.keys(forged)[0]}`
    );
  }
});

test("a direct client cannot pass the whitelist with a forged forwarding header", async () => {
  whitelist(ALLOWED);

  assert.equal(
    await blockedByIpFilter(stampedRequest(BLOCKED, { "x-forwarded-for": ALLOWED })),
    true
  );
});

test("a loopback proxy is still trusted to report the client address", async () => {
  blacklist(BLOCKED);

  assert.equal(
    await blockedByIpFilter(stampedRequest("127.0.0.1", { "x-forwarded-for": BLOCKED })),
    true
  );
  assert.equal(
    await blockedByIpFilter(stampedRequest("127.0.0.1", { "x-forwarded-for": ALLOWED })),
    false
  );
});

test("a proxy on a private network is still trusted to report the client address", async () => {
  blacklist(BLOCKED);

  for (const proxy of ["10.1.2.3", "172.18.0.2", "192.168.1.5", "100.64.0.9"]) {
    assert.equal(
      await blockedByIpFilter(stampedRequest(proxy, { "x-forwarded-for": BLOCKED })),
      true,
      proxy
    );
  }

  ipFilter.resetIPFilter();
  whitelist(ALLOWED);
  assert.equal(
    await blockedByIpFilter(stampedRequest("10.1.2.3", { "x-forwarded-for": ALLOWED })),
    false
  );
});

test("a Cloudflare edge is trusted to report the client address", async () => {
  blacklist(BLOCKED);

  assert.equal(
    await blockedByIpFilter(stampedRequest("172.71.150.1", { "cf-connecting-ip": BLOCKED })),
    true
  );
  assert.equal(
    await blockedByIpFilter(stampedRequest("172.71.150.1", { "cf-connecting-ip": ALLOWED })),
    false
  );
});

test("behind a proxy that appends to X-Forwarded-For, an address the client put first is ignored", async () => {
  blacklist(BLOCKED);

  // nginx: proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for
  assert.equal(
    await blockedByIpFilter(
      stampedRequest("127.0.0.1", { "x-forwarded-for": `${ALLOWED}, ${BLOCKED}` })
    ),
    true
  );
  assert.equal(
    await blockedByIpFilter(
      stampedRequest("127.0.0.1", { "x-forwarded-for": `${BLOCKED}, ${ALLOWED}` })
    ),
    false
  );
});

test("a forged CF-Connecting-IP behind a proxy that is not Cloudflare is ignored", async () => {
  blacklist(BLOCKED);

  assert.equal(
    await blockedByIpFilter(
      stampedRequest("127.0.0.1", { "x-forwarded-for": BLOCKED, "cf-connecting-ip": ALLOWED })
    ),
    true
  );

  ipFilter.resetIPFilter();
  whitelist(ALLOWED);
  assert.equal(
    await blockedByIpFilter(
      stampedRequest("127.0.0.1", { "x-forwarded-for": BLOCKED, "cf-connecting-ip": ALLOWED })
    ),
    true
  );
});

test("a private-network client whose forwarding header holds no address is judged as itself", async () => {
  blacklist("192.168.1.50");

  for (const junk of [{ "x-forwarded-for": "x" }, { "x-real-ip": "unknown" }]) {
    assert.equal(
      await blockedByIpFilter(stampedRequest("192.168.1.50", junk)),
      true,
      Object.keys(junk)[0]
    );
  }
});

test("a proxy on any other public address is judged as itself until the operator names it", async () => {
  const proxy = "198.51.100.7";
  whitelist(ALLOWED);
  const viaProxy = () => stampedRequest(proxy, { "x-forwarded-for": ALLOWED });

  assert.equal(await blockedByIpFilter(viaProxy()), true);

  process.env.OMNIROUTE_TRUSTED_PROXIES = "198.51.100.0/24";
  assert.equal(await blockedByIpFilter(viaProxy()), false);
  assert.equal(
    await blockedByIpFilter(stampedRequest(proxy, { "x-forwarded-for": BLOCKED })),
    true
  );
});
