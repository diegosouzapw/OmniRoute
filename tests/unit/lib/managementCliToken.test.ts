import { test, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Hermetic auth context (6A re-wire fix): the "rejects ..." assertions assume
// login protection is ON — on a fresh DB (CI) isAuthRequired() is false and the
// policy anonymous-allows before any token check. Locally this only passed
// because the dev DATA_DIR had a real password. Isolate + enable protection.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mgmt-cli-token-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
await settingsDb.updateSettings({
  requireLogin: true,
  setupComplete: true,
  password: "test-password-hash",
});

const { getLegacyCliTokenSync, getMachineTokenSync } = await import(
  "../../../src/lib/machineToken.ts"
);
const { managementPolicy } = await import("../../../src/server/authz/policies/management.ts");
const { CLI_TOKEN_HEADER } = await import("../../../src/server/authz/headers.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

function makeCtx(headers: Record<string, string>, requestExtras: Record<string, unknown> = {}) {
  return {
    request: {
      method: "GET",
      headers: new Headers(headers),
      cookies: { get: () => undefined },
      nextUrl: { pathname: "/api/settings" },
      url: "http://localhost:20128/api/settings",
      ...requestExtras,
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      normalizedPath: "/api/settings",
      method: "GET",
    },
    requestId: "test-req",
  };
}

test("management policy allows valid CLI token from localhost", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx(
    { host: "localhost", [CLI_TOKEN_HEADER]: token },
    { socket: { remoteAddress: "127.0.0.1" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
  if (outcome.allow) {
    assert.equal(outcome.subject.id, "cli");
  }
});

test("management policy accepts legacy 32-character CLI token from localhost", async () => {
  const token = getLegacyCliTokenSync();
  assert.equal(token.length, 32);
  const ctx = makeCtx(
    {
      host: "localhost",
      [CLI_TOKEN_HEADER]: token,
    },
    { socket: { remoteAddress: "127.0.0.1" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
  if (outcome.allow) {
    assert.equal(outcome.subject.id, "cli");
  }
});

test("management policy rejects valid token from non-localhost", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx(
    { host: "localhost", [CLI_TOKEN_HEADER]: token },
    { socket: { remoteAddress: "192.168.1.100" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
});

test("management policy rejects wrong CLI token from localhost", async () => {
  const ctx = makeCtx(
    {
      host: "localhost",
      [CLI_TOKEN_HEADER]: "deadbeefdeadbeefdeadbeefdeadbeef",
    },
    { socket: { remoteAddress: "127.0.0.1" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
});
