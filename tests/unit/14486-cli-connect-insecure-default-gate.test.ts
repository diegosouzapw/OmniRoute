import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Regression test for #14486 (item 1).
 *
 * #13679 (PR D, item #5) refuses a login that matches the well-known
 * `INITIAL_PASSWORD=CHANGEME` placeholder unless the request comes from
 * loopback — but that gate lives in `/api/auth/login` only.
 *
 * `POST /api/cli/connect` verifies the same management password
 * (`verifyManagementPassword`) and, on success, mints an `admin`-scoped `oma_`
 * access token. It is not in `LOCAL_ONLY_API_PREFIXES`, so on a fresh install
 * — where `scripts/dev/sync-env.mjs` copies `INITIAL_PASSWORD=CHANGEME` from
 * `.env.example` into `.env` — anyone who can reach the port could exchange the
 * public default for an admin token. The insecure-default gate has to hold on
 * every path that accepts that password, not just the dashboard one.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14486-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-14486";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const connectRoute = await import("../../src/app/api/cli/connect/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.INITIAL_PASSWORD = "CHANGEME";
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

function postConnect(password: string, forwardedFor: string) {
  return connectRoute.POST(
    new Request("http://localhost/api/cli/connect", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": forwardedFor,
      },
      body: JSON.stringify({ password, name: "test-cli" }),
    }) as never
  );
}

test("a public-IP cli/connect with the well-known default password is refused an admin token", async () => {
  const response = await postConnect("CHANGEME", "203.0.113.77");

  assert.equal(
    response.status,
    403,
    "the well-known default must not be exchangeable for an admin-scoped oma_ token " +
      "from off-loopback — the same control /api/auth/login applies since #13679"
  );

  const body = (await response.json()) as { token?: string; error?: string };
  assert.equal(body.token, undefined, "no access token may be minted for the blocked attempt");
  assert.ok(!String(body.error ?? "").includes("at /"), "no stack trace in the error body");

  const [entry] = compliance.getAuditLog({
    action: "cli.connect.insecure_default_blocked",
    limit: 1,
  });
  assert.ok(entry, "expected a cli.connect.insecure_default_blocked audit entry");
});

test("a loopback cli/connect with the well-known default password still works", async () => {
  const response = await postConnect("CHANGEME", "127.0.0.1");

  assert.equal(
    response.status,
    200,
    "the operator must still be able to pair a local CLI before rotating the password"
  );
  const body = (await response.json()) as { token?: string };
  assert.ok(body.token, "a loopback pairing must still receive its token");
});

test("a public-IP cli/connect with a rotated password still works", async () => {
  process.env.INITIAL_PASSWORD = "a-real-rotated-password-14486";
  const response = await postConnect("a-real-rotated-password-14486", "203.0.113.77");

  assert.equal(
    response.status,
    200,
    "the gate must only bite on the well-known default, never on a rotated password"
  );
  const body = (await response.json()) as { token?: string };
  assert.ok(body.token, "a remote pairing with a real password must still receive its token");
});
