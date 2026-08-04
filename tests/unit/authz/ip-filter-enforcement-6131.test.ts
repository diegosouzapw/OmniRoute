// Regression for #6131 (Part B — enforcement): the IP blacklist was never wired
// into the request pipeline, so blacklisted IPs were not actually blocked. This
// locks that runAuthzPipeline blocks a blacklisted client IP with 403 before the
// route policy runs, allows a clean IP through to the normal auth outcome, and
// exempts loopback so the local operator can never lock themselves out.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ipenforce-6131-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-secret-6131";

const core = await import("../../../src/lib/db/core.ts");
const ipFilter = await import("../../../open-sse/services/ipFilter.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");

const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_STAMP_TOKEN === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  else process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_STAMP_TOKEN;
});

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  ipFilter.resetIPFilter();
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
});

const BLOCKED = "203.0.113.9";
const CLEAN = "203.0.113.10";

function req(xff: string, extraHeaders: Record<string, string> = {}) {
  return new NextRequest("http://localhost/v1/models", {
    headers: { "x-forwarded-for": xff, ...extraHeaders },
  });
}

async function isIpBlocked(res: Response): Promise<boolean> {
  if (res.status !== 403) return false;
  const body = (await res.clone().json()) as { error?: unknown };
  // The IP-filter block returns a plain string error; policy 403s use a nested object.
  return typeof body.error === "string" && /blacklist|not in whitelist|banned/i.test(body.error);
}

test("#6131 blacklisted remote IP is blocked with 403 before the route policy", async () => {
  ipFilter.configureIPFilter({ enabled: true, mode: "blacklist" });
  ipFilter.addToBlacklist(BLOCKED);

  const res = await pipeline.runAuthzPipeline(req(BLOCKED), { enforce: true });
  assert.equal(res.status, 403);
  assert.equal(await isIpBlocked(res), true, "expected the IP-filter 403 block");
});

test("#6131 a clean remote IP passes the IP filter (reaches the normal auth outcome)", async () => {
  ipFilter.configureIPFilter({ enabled: true, mode: "blacklist" });
  ipFilter.addToBlacklist(BLOCKED);

  const res = await pipeline.runAuthzPipeline(req(CLEAN), { enforce: true });
  // The IP filter must let it through to the normal route/auth outcome, whatever
  // that is (the point is: NOT the IP-filter 403 block).
  assert.equal(await isIpBlocked(res), false, "clean IP must not be blocked by the IP filter");
});

test("#6131 disabled filter never blocks (even a listed IP)", async () => {
  ipFilter.configureIPFilter({ enabled: false, mode: "blacklist" });
  ipFilter.addToBlacklist(BLOCKED);

  const res = await pipeline.runAuthzPipeline(req(BLOCKED), { enforce: true });
  assert.equal(await isIpBlocked(res), false, "disabled filter must not block");
});

test("#6131 loopback is exempt — operator can't lock themselves out locally", async () => {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-tok";
  ipFilter.configureIPFilter({ enabled: true, mode: "blacklist" });
  ipFilter.addToBlacklist(BLOCKED);

  // A trusted stamped loopback peer IP downgrades the request to "loopback".
  const res = await pipeline.runAuthzPipeline(
    req(BLOCKED, { "x-omniroute-peer-ip": "stamp-tok|127.0.0.1" }),
    { enforce: true }
  );
  assert.equal(await isIpBlocked(res), false, "loopback must be exempt from the IP filter");
});
