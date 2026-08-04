import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextResponse } from "next/server";
import {
  applyCorsHeaders,
  getCorsStatus,
  resolveAllowedOrigin,
  setRuntimeAllowedOrigins,
  STATIC_CORS_HEADERS,
} from "../../../src/server/cors/origins";

const ENV_KEYS = ["CORS_ALLOW_ALL", "CORS_ALLOWED_ORIGINS", "CORS_ORIGIN"] as const;

function snapshotEnv(): Record<string, string | undefined> {
  const snap: Record<string, string | undefined> = {};
  for (const key of ENV_KEYS) snap[key] = process.env[key];
  return snap;
}

function restoreEnv(snap: Record<string, string | undefined>) {
  for (const key of ENV_KEYS) {
    if (snap[key] === undefined) delete process.env[key];
    else process.env[key] = snap[key];
  }
}

describe("cors/origins.resolveAllowedOrigin", () => {
  let envSnap: Record<string, string | undefined>;

  beforeEach(() => {
    envSnap = snapshotEnv();
    for (const key of ENV_KEYS) delete process.env[key];
    setRuntimeAllowedOrigins("");
  });

  afterEach(() => {
    restoreEnv(envSnap);
    setRuntimeAllowedOrigins("");
  });

  it("returns null by default — fail-closed without explicit allowlist", () => {
    assert.equal(resolveAllowedOrigin("https://app.example.com"), null);
  });

  it("returns null when origin header is absent", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    assert.equal(resolveAllowedOrigin(null), null);
    assert.equal(resolveAllowedOrigin(undefined), null);
  });

  it("echoes origin when env allowlist matches (case-insensitive, trailing slash ignored)", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com, https://Admin.Example.com/";
    assert.equal(resolveAllowedOrigin("https://app.example.com"), "https://app.example.com");
    assert.equal(resolveAllowedOrigin("https://admin.example.com"), "https://admin.example.com");
    assert.equal(resolveAllowedOrigin("https://other.example.com"), null);
  });

  it("merges env allowlist and runtime allowlist", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://env.example.com";
    setRuntimeAllowedOrigins("https://runtime.example.com");
    assert.equal(resolveAllowedOrigin("https://env.example.com"), "https://env.example.com");
    assert.equal(
      resolveAllowedOrigin("https://runtime.example.com"),
      "https://runtime.example.com"
    );
    assert.equal(resolveAllowedOrigin("https://other.example.com"), null);
  });

  it("CORS_ALLOW_ALL=true echoes any origin (with Vary applied later)", () => {
    process.env.CORS_ALLOW_ALL = "true";
    assert.equal(
      resolveAllowedOrigin("https://anything.example.com"),
      "https://anything.example.com"
    );
  });

  it("CORS_ALLOW_ALL falls back to '*' when no Origin header is present", () => {
    process.env.CORS_ALLOW_ALL = "1";
    assert.equal(resolveAllowedOrigin(null), "*");
  });

  it("legacy CORS_ORIGIN=* behaves like CORS_ALLOW_ALL", () => {
    process.env.CORS_ORIGIN = "*";
    assert.equal(
      resolveAllowedOrigin("https://anything.example.com"),
      "https://anything.example.com"
    );
  });

  it("legacy CORS_ORIGIN=<single> is added to env allowlist", () => {
    process.env.CORS_ORIGIN = "https://legacy.example.com";
    assert.equal(resolveAllowedOrigin("https://legacy.example.com"), "https://legacy.example.com");
    assert.equal(resolveAllowedOrigin("https://other.example.com"), null);
  });
});

describe("cors/origins.applyCorsHeaders", () => {
  let envSnap: Record<string, string | undefined>;

  beforeEach(() => {
    envSnap = snapshotEnv();
    for (const key of ENV_KEYS) delete process.env[key];
    setRuntimeAllowedOrigins("");
  });

  afterEach(() => {
    restoreEnv(envSnap);
    setRuntimeAllowedOrigins("");
  });

  it("does not set Allow-Origin when origin is not in allowlist", () => {
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/chat/completions", {
      headers: { Origin: "https://evil.example.com" },
    });
    applyCorsHeaders(res, req);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), null);
    assert.match(res.headers.get("Access-Control-Allow-Methods") || "", /OPTIONS/);
  });

  it("echoes origin and sets Vary: Origin when origin is allowed", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/chat/completions", {
      headers: { Origin: "https://app.example.com" },
    });
    applyCorsHeaders(res, req);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), "https://app.example.com");
    assert.match(res.headers.get("Vary") || "", /Origin/);
  });

  it("CLIENT_API: echoes arbitrary Origin (+Vary) when no allowlist matches (relaxForTokenAuth)", () => {
    // Token-authenticated /v1/* surface (issue #5242): no allowlist, arbitrary
    // origin → echo it back so browser/Electron renderers can read the body.
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/models", {
      headers: { Origin: "http://localhost" },
    });
    applyCorsHeaders(res, req, true);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), "http://localhost");
    assert.match(res.headers.get("Vary") || "", /Origin/);
    // Never paired with Allow-Credentials on the token-auth surface.
    assert.equal(res.headers.get("Access-Control-Allow-Credentials"), null);
  });

  it("CLIENT_API: returns '*' when no Origin header is present (relaxForTokenAuth)", () => {
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/models");
    applyCorsHeaders(res, req, true);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), "*");
    assert.equal(res.headers.get("Access-Control-Allow-Credentials"), null);
  });

  it("MANAGEMENT: stays fail-closed for arbitrary Origin with no allowlist (relax off)", () => {
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/keys", {
      headers: { Origin: "http://localhost" },
    });
    // Default (relaxForTokenAuth = false) — same as MANAGEMENT routes.
    applyCorsHeaders(res, req);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), null);
    applyCorsHeaders(res, req, false);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), null);
  });

  it("relaxForTokenAuth still honors an explicit allowlist match exactly (no wildcard)", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/models", {
      headers: { Origin: "https://app.example.com" },
    });
    applyCorsHeaders(res, req, true);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), "https://app.example.com");
    assert.match(res.headers.get("Vary") || "", /Origin/);
  });

  it("CLIENT_API: appends Vary: Accept-Encoding on a 2xx relaxForTokenAuth response (#6737)", () => {
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/models");
    applyCorsHeaders(res, req, true);
    assert.match(res.headers.get("Vary") || "", /Accept-Encoding/);
  });

  it("CLIENT_API: combines with Vary: Origin into a single comma-joined header (#6737)", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/models", {
      headers: { Origin: "https://app.example.com" },
    });
    applyCorsHeaders(res, req, true);
    const varyValues = res.headers.getSetCookie ? res.headers.get("Vary") : res.headers.get("Vary");
    assert.equal(varyValues, "Origin, Accept-Encoding");
    assert.equal([...res.headers.entries()].filter(([k]) => k.toLowerCase() === "vary").length, 1);
  });

  it("MANAGEMENT: does not append Vary: Accept-Encoding (relax off) (#6737)", () => {
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/keys");
    applyCorsHeaders(res, req);
    assert.doesNotMatch(res.headers.get("Vary") || "", /Accept-Encoding/);
    applyCorsHeaders(res, req, false);
    assert.doesNotMatch(res.headers.get("Vary") || "", /Accept-Encoding/);
  });

  it("204 response: does not append Vary: Accept-Encoding even with relaxForTokenAuth (#6737)", () => {
    const res = new NextResponse(null, { status: 204 });
    const req = new Request("https://server.example.com/api/v1/models", {
      method: "OPTIONS",
    });
    applyCorsHeaders(res, req, true);
    assert.doesNotMatch(res.headers.get("Vary") || "", /Accept-Encoding/);
  });

  it("CLIENT_API: appends Vary: Accept-Encoding even without an Origin header (#6737)", () => {
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/models");
    applyCorsHeaders(res, req, true);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), "*");
    assert.match(res.headers.get("Vary") || "", /Accept-Encoding/);
  });

  it("reflects requested headers from Access-Control-Request-Headers preflight", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://app.example.com";
    const res = NextResponse.json({ ok: true });
    const req = new Request("https://server.example.com/api/v1/chat/completions", {
      method: "OPTIONS",
      headers: {
        Origin: "https://app.example.com",
        "Access-Control-Request-Headers": "x-custom-header, authorization",
      },
    });
    applyCorsHeaders(res, req);
    assert.equal(res.headers.get("Access-Control-Allow-Headers"), "x-custom-header, authorization");
  });
});

describe("cors/origins.getCorsStatus", () => {
  let envSnap: Record<string, string | undefined>;

  beforeEach(() => {
    envSnap = snapshotEnv();
    for (const key of ENV_KEYS) delete process.env[key];
    setRuntimeAllowedOrigins("");
  });

  afterEach(() => {
    restoreEnv(envSnap);
    setRuntimeAllowedOrigins("");
  });

  it("default (no env, no runtime) → allowAll false, empty origins", () => {
    assert.deepEqual(getCorsStatus(), { allowAll: false, allowedOrigins: [] });
  });

  it("CORS_ALLOW_ALL=true → allowAll true", () => {
    process.env.CORS_ALLOW_ALL = "true";
    assert.equal(getCorsStatus().allowAll, true);
  });

  it("legacy CORS_ORIGIN=* → allowAll true", () => {
    process.env.CORS_ORIGIN = "*";
    assert.equal(getCorsStatus().allowAll, true);
  });

  it("merges env + runtime allowlists, normalized, sorted, deduped", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://Env.Example.com/, https://shared.example.com";
    setRuntimeAllowedOrigins("https://runtime.example.com, https://shared.example.com/");
    assert.deepEqual(getCorsStatus(), {
      allowAll: false,
      allowedOrigins: [
        "https://env.example.com",
        "https://runtime.example.com",
        "https://shared.example.com",
      ],
    });
  });
});

describe("cors/origins.STATIC_CORS_HEADERS", () => {
  it("never contains Access-Control-Allow-Origin", () => {
    assert.equal(
      Object.prototype.hasOwnProperty.call(STATIC_CORS_HEADERS, "Access-Control-Allow-Origin"),
      false
    );
    assert.match(STATIC_CORS_HEADERS["Access-Control-Allow-Methods"], /OPTIONS/);
  });
});
