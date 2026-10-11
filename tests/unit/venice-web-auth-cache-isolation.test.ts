import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { getSessionJwt, evictSessionJwt, decodeJwtPayload } =
  await import("../../open-sse/executors/venice-web-auth.ts");

const originalFetch = globalThis.fetch;

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

// Two Clerk `__client` cookies share the JWT header, so their first 32 chars are identical.
const HEADER = b64url({ alg: "RS256", typ: "JWT", kid: "ins_shared" });
const clientA = `${HEADER}.${b64url({ sub: "client_A" })}.sigA`;
const clientB = `${HEADER}.${b64url({ sub: "client_B" })}.sigB`;

function sessionJwtFor(sub: string): string {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  return `eyJ${b64url({ alg: "RS256" }).slice(3)}.${b64url({ sub, exp })}.sig`;
}

describe("venice-web session JWT cache", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    evictSessionJwt(clientA);
    evictSessionJwt(clientB);
  });

  it("never serves one account's session JWT to another account (#15846)", async () => {
    assert.equal(clientA.slice(0, 32), clientB.slice(0, 32));
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
      const cookie = String((init?.headers as Record<string, string>)?.Cookie ?? "");
      const who = cookie.includes(clientA) ? "A" : "B";
      if (String(url).endsWith("/v1/client")) {
        return Response.json({ response: { sessions: [{ id: `sess_${who}`, status: "active" }] } });
      }
      return Response.json({ jwt: sessionJwtFor(`user_${who}`) });
    }) as typeof fetch;

    const jwtA = await getSessionJwt(clientA);
    const jwtB = await getSessionJwt(clientB);
    assert.notEqual(jwtA, jwtB);
    assert.equal(decodeJwtPayload(jwtA).sub, "user_A");
    assert.equal(decodeJwtPayload(jwtB).sub, "user_B");
  });
});
