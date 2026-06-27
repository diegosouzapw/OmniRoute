import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression tests for #5128 — one-click relay deployments (Deno + Cloudflare +
// Vercel) broken in v3.8.37. Four distinct, independently-reproducible bugs:
//   A) /api/settings/proxy/test only handled type "vercel", so a "deno" or
//      "cloudflare" relay fell through to the generic
//      `proxy.type must be http, https, or socks5` 400 and was never tested.
//   B) the test route parsed only { relayAuth } from notes, ignoring the
//      encrypted { relayAuthEnc } form, so on installs with STORAGE_ENCRYPTION_KEY
//      the relay auth was empty → relay returns 401 → publicIp null.
//   C) the Cloudflare Worker upload sent the script part with MIME
//      "application/javascript+module", which the CF API rejects (only
//      application/javascript | text/javascript | multipart/form-data allowed).
//   D) the proxy-registry schema enum lacked "deno"/"cloudflare", so editing a
//      deployed relay in the UI failed Zod validation with a silent 400.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-5128-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const proxyTestRoute = await import("../../src/app/api/settings/proxy/test/route.ts");
const proxySchemas = await import("../../src/shared/validation/schemas/proxy.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* best effort */
  }
});

// --------------------------------------------------------------------------
// A) Deno relay no longer rejected as an unsupported proxy type
// --------------------------------------------------------------------------
test("#5128A: a 'deno' relay proxy is routed through the relay branch, not rejected as unsupported", async () => {
  const stored = await proxiesDb.createProxy({
    name: "Deno Relay",
    type: "deno",
    host: "127.0.0.1",
    port: 443,
    notes: JSON.stringify({ relayAuth: "deno-secret" }),
  });

  const res = await proxyTestRoute.POST(
    new Request("http://localhost/api/settings/proxy/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ proxyId: stored.id, proxy: { host: "127.0.0.1", port: 443 } }),
    })
  );
  const body = (await res.json()) as { error?: { message?: string } };

  // Before the fix this returned 400 "proxy.type must be http, https, or socks5".
  assert.notEqual(res.status, 400, body.error?.message ?? "expected non-400");
});

// --------------------------------------------------------------------------
// B) extractRelayAuth prefers the encrypted relayAuthEnc form
// --------------------------------------------------------------------------
test("#5128B: extractRelayAuth decrypts the encrypted relayAuthEnc form (encryption disabled = identity)", () => {
  // With STORAGE_ENCRYPTION_KEY unset, decrypt() is a no-op passthrough, so the
  // stored relayAuthEnc value is returned verbatim. The bug was that the test
  // route never looked at relayAuthEnc at all (only plain relayAuth).
  const enc = proxiesDb.extractRelayAuth(JSON.stringify({ relayAuthEnc: "enc-token" }));
  assert.equal(enc, "enc-token");

  const plain = proxiesDb.extractRelayAuth(JSON.stringify({ relayAuth: "plain-token" }));
  assert.equal(plain, "plain-token");

  assert.equal(proxiesDb.extractRelayAuth("not-json"), undefined);
});

// --------------------------------------------------------------------------
// C) Cloudflare Worker upload uses an accepted script MIME type
// --------------------------------------------------------------------------
test("#5128C: Cloudflare worker upload sends an accepted script Content-Type", async () => {
  const realFetch = globalThis.fetch;
  let putBodyType: string | undefined;
  globalThis.fetch = (async (input: unknown, init: RequestInit = {}) => {
    const url = String(input);
    if (init.method === "PUT" && url.includes("/workers/scripts/")) {
      const fd = init.body as FormData;
      const scriptPart = fd.get("index.js") as Blob;
      putBodyType = scriptPart.type;
      // Simulate the CF API rejecting the upload so the route short-circuits
      // without making the follow-up subdomain calls.
      return Response.json({ errors: [{ message: "stubbed" }] }, { status: 400 });
    }
    return Response.json({ result: {} });
  }) as unknown as typeof globalThis.fetch;

  try {
    const route = await import("../../src/app/api/settings/proxy/cloudflare-deploy/route.ts");
    await route.POST(
      new Request("http://localhost/api/settings/proxy/cloudflare-deploy", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          accountId: "abcdef0123456789",
          apiToken: "cf-token-aaaaaaaaaaaaaaaaaaaaaa",
          projectName: "omniroute-relay",
        }),
      })
    );
  } finally {
    globalThis.fetch = realFetch;
  }

  // CF rejects "application/javascript+module"; only these are accepted.
  assert.ok(
    putBodyType === "application/javascript" || putBodyType === "text/javascript",
    `expected an accepted script MIME, got "${putBodyType}"`
  );
});

// --------------------------------------------------------------------------
// D) proxy-registry schema accepts deno/cloudflare relay types + sources
// --------------------------------------------------------------------------
test("#5128D: proxyRegistryFieldsSchema accepts deno/cloudflare types and relay sources", () => {
  for (const type of ["deno", "cloudflare", "vercel"]) {
    const parsed = proxySchemas.proxyRegistryFieldsSchema.safeParse({
      name: `${type} relay`,
      type,
      host: "example.workers.dev",
      port: 443,
      source: `${type}-relay`,
    });
    assert.ok(parsed.success, `type "${type}" / source "${type}-relay" should validate`);
  }
});
