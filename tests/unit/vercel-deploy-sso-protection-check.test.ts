// Regression guard for upstream report: "Vercel Relay with Codex returns 403
// Access denied and lacks source diagnostics".
//
// Root cause: the Vercel deploy route disables project SSO/Deployment
// Protection via a PATCH request, but fired it with `.catch(() => {})` and
// never inspected `res.ok`. If Vercel rejects or no-ops the PATCH (plan
// doesn't allow disabling protection, stale/under-scoped token, etc.), the
// relay is still saved and activated as a healthy proxy pool — later
// requests routed through it fail with an undiagnosed `403 Access denied`
// from Vercel's own deployment protection, indistinguishable from an
// upstream-provider 403.
//
// Fix: check the PATCH response and surface the failure back to the caller
// (`ssoProtectionWarning` in the JSON response) instead of silently
// swallowing it, so the UI/API consumer can diagnose the 403 source.
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { __disableSsoProtectionForTest } from "../../src/app/api/settings/proxy/vercel-deploy/route";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ROUTE_PATH = join(
  ROOT,
  "src/app/api/settings/proxy/vercel-deploy/route.ts"
);

describe("disableSsoProtection — checks the Vercel PATCH response instead of swallowing it", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("reports failure when Vercel rejects the PATCH (e.g. plan does not allow disabling protection)", async () => {
    global.fetch = (async () =>
      new Response(JSON.stringify({ error: { message: "Forbidden" } }), {
        status: 403,
      })) as typeof fetch;

    const result = await __disableSsoProtectionForTest(
      "https://api.vercel.com",
      "proj_123",
      "test-token"
    );

    assert.equal(result.ok, false, "must report ok:false on a non-2xx PATCH response");
    assert.equal(result.status, 403);
  });

  it("reports success when Vercel accepts the PATCH", async () => {
    global.fetch = (async () => new Response(null, { status: 200 })) as typeof fetch;

    const result = await __disableSsoProtectionForTest(
      "https://api.vercel.com",
      "proj_123",
      "test-token"
    );

    assert.equal(result.ok, true);
  });

  it("reports failure (not a thrown exception) when the PATCH request itself fails", async () => {
    global.fetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;

    const result = await __disableSsoProtectionForTest(
      "https://api.vercel.com",
      "proj_123",
      "test-token"
    );

    assert.equal(result.ok, false);
  });
});

describe("vercel-deploy route — wires the SSO-protection check into the response", () => {
  const src = readFileSync(ROUTE_PATH, "utf8");

  it("no longer fires the PATCH with a silent `.catch(() => {})`", () => {
    assert.ok(
      !/ssoProtection:\s*null[\s\S]*?\.catch\(\s*\(\)\s*=>\s*\{\s*\}\s*\)/.test(src),
      "the ssoProtection PATCH must not be silently swallowed with .catch(() => {})"
    );
  });

  it("surfaces a warning in the JSON response when disabling SSO protection failed", () => {
    assert.ok(
      src.includes("ssoProtectionWarning"),
      "POST handler must surface ssoProtectionWarning in the response payload when the PATCH failed"
    );
  });
});
