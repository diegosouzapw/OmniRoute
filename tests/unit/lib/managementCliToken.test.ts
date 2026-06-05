import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { getLegacyCliTokenSync, getMachineTokenSync } from "../../../src/lib/machineToken.ts";
import { managementPolicy } from "../../../src/server/authz/policies/management.ts";
import { CLI_TOKEN_HEADER } from "../../../src/server/authz/headers.ts";

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
