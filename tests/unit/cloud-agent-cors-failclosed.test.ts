import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { getCloudAgentCorsHeaders } from "../../src/lib/cloudAgent/api.ts";

// The cloud-agent routes are management (cookie/session) authed, so their CORS
// must be fail-closed. The previous `origin || "*"` reflected ANY caller's origin
// AND paired it with Allow-Credentials: true — letting any website make
// credentialed (cookie-bearing) requests to the management API (CSRF/exfil).

const ENV_KEYS = ["CORS_ALLOW_ALL", "CORS_ALLOWED_ORIGINS", "CORS_ORIGIN"] as const;
const snap: Record<string, string | undefined> = {};

function req(origin: string | null): Request {
  return new Request(
    "https://gateway.local/api/cloud-agent/tasks",
    origin ? { headers: { origin } } : undefined,
  );
}

describe("getCloudAgentCorsHeaders — fail-closed credentialed CORS", () => {
  beforeEach(() => {
    for (const k of ENV_KEYS) {
      snap[k] = process.env[k];
      delete process.env[k];
    }
  });
  afterEach(() => {
    for (const k of ENV_KEYS) {
      if (snap[k] === undefined) delete process.env[k];
      else process.env[k] = snap[k];
    }
  });

  it("allowlisted origin -> echoes it, with credentials + Vary: Origin", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    const h = getCloudAgentCorsHeaders(req("https://app.example.com"));
    assert.equal(h["Access-Control-Allow-Origin"], "https://app.example.com");
    assert.equal(h["Access-Control-Allow-Credentials"], "true");
    assert.equal(h["Vary"], "Origin");
  });

  it("non-allowlisted origin -> NO ACAO and NO credentials (fail-closed)", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    const h = getCloudAgentCorsHeaders(req("https://evil.example.com"));
    assert.equal(h["Access-Control-Allow-Origin"], undefined);
    assert.equal(h["Access-Control-Allow-Credentials"], undefined);
  });

  it("CORS_ALLOW_ALL wildcard -> NEVER pairs Allow-Credentials with a wildcard echo", () => {
    process.env.CORS_ALLOW_ALL = "true";
    const h = getCloudAgentCorsHeaders(req("https://anything.example.com"));
    assert.equal(h["Access-Control-Allow-Credentials"], undefined);
  });

  it("no Origin header (same-origin dashboard) -> no ACAO", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    const h = getCloudAgentCorsHeaders(req(null));
    assert.equal(h["Access-Control-Allow-Origin"], undefined);
  });
});
