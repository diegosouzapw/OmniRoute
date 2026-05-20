import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { getMachineTokenSync } from "../../../src/lib/machineToken.ts";
import { managementPolicy } from "../../../src/server/authz/policies/management.ts";
import { CLI_TOKEN_HEADER } from "../../../src/server/authz/headers.ts";

function makeCtx(headers: Record<string, string>) {
  return {
    request: {
      method: "GET",
      headers: new Headers(headers),
      cookies: { get: () => undefined },
      nextUrl: { pathname: "/api/settings" },
      url: "http://localhost:20128/api/settings",
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
  const ctx = makeCtx({ host: "localhost", [CLI_TOKEN_HEADER]: token });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
  if (outcome.allow) {
    assert.equal(outcome.subject.id, "cli");
  }
});

test("management policy rejects valid token from non-localhost", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx({ host: "192.168.1.100", [CLI_TOKEN_HEADER]: token });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
});

test("management policy rejects wrong CLI token from localhost", async () => {
  const ctx = makeCtx({
    host: "localhost",
    [CLI_TOKEN_HEADER]: "deadbeefdeadbeefdeadbeefdeadbeef",
  });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
});
