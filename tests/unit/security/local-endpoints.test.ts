import { test } from "node:test";
import assert from "node:assert/strict";
import { isLocalRequestAllowed } from "../../../src/lib/security/localEndpoints.ts";

/**
 * Tests for the /api/local/* security guard. The guard reads from
 * `globalThis.__omniRequestHeaders` (set by the Next.js middleware shim) and
 * from `process.env` (production opt-in and bearer token). Each test cleans
 * up both before and after running so the order doesn't matter.
 */

type OmniGlobals = { __omniRequestHeaders?: Headers };
const G = globalThis as OmniGlobals;

function reset() {
  delete G.__omniRequestHeaders;
}

function setHeaders(headers: Record<string, string>) {
  G.__omniRequestHeaders = new Headers(headers);
}

test("isLocalRequestAllowed: allows when no headers injected and not production", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevEnabled = process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED;
  delete process.env.NODE_ENV;
  delete process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED;
  reset();
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, true, `expected allowed, got: ${JSON.stringify(out)}`);
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevEnabled !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED = prevEnabled;
  }
});

test("isLocalRequestAllowed: allows loopback host + empty xff (browser dev path)", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevToken = process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  delete process.env.NODE_ENV;
  delete process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  setHeaders({ host: "localhost:20128" });
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, true, `expected allowed, got: ${JSON.stringify(out)}`);
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevToken !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN = prevToken;
  }
});

test("isLocalRequestAllowed: allows IPv4 loopback host 127.0.0.1", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  delete process.env.NODE_ENV;
  setHeaders({ host: "127.0.0.1:20128" });
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, true);
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
  }
});

test("isLocalRequestAllowed: allows IPv6 loopback host [::1]", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  delete process.env.NODE_ENV;
  setHeaders({ host: "[::1]:20128" });
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, true);
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
  }
});

test("isLocalRequestAllowed: rejects public host even with loopback x-forwarded-for", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevToken = process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  delete process.env.NODE_ENV;
  delete process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  // Public Host with loopback XFF is rejected — Host header is the
  // authoritative loopback check (defence against Host header injection
  // from a tunneled dev URL).
  setHeaders({ host: "example.com", "x-forwarded-for": "127.0.0.1" });
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, false);
    assert.equal(out.reason, "non-local origin");
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevToken !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN = prevToken;
  }
});

test("isLocalRequestAllowed: rejects non-loopback origin (no bearer token)", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevToken = process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  delete process.env.NODE_ENV;
  delete process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  setHeaders({ host: "example.com", "x-forwarded-for": "203.0.113.5" });
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, false);
    assert.equal(out.reason, "non-local origin");
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevToken !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN = prevToken;
  }
});

test("isLocalRequestAllowed: bearer token takes precedence over host check (desktop app)", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevToken = process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN = "s3cret-token-abc";
  delete process.env.NODE_ENV;
  // Non-loopback origin BUT valid bearer token → allowed (desktop app)
  setHeaders({
    host: "example.com",
    "x-forwarded-for": "203.0.113.5",
    authorization: "Bearer s3cret-token-abc",
  });
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, true, `expected allowed, got: ${JSON.stringify(out)}`);
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevToken !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN = prevToken;
  }
});

test("isLocalRequestAllowed: rejects wrong bearer token even with token configured", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevToken = process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
  process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN = "s3cret-token-abc";
  delete process.env.NODE_ENV;
  setHeaders({
    host: "example.com",
    "x-forwarded-for": "203.0.113.5",
    authorization: "Bearer wrong-token",
  });
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, false);
    // Falls through to the host check, which rejects.
    assert.equal(out.reason, "non-local origin");
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevToken !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN = prevToken;
  }
});

test("isLocalRequestAllowed: production without opt-in rejects (no headers path)", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevEnabled = process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED;
  process.env.NODE_ENV = "production";
  delete process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED;
  reset();
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, false);
    assert.equal(out.reason, "disabled in production");
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevEnabled !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED = prevEnabled;
  }
});

test("isLocalRequestAllowed: production WITH opt-in allows (no headers path)", () => {
  // The "no headers" path bypasses the host check entirely; it's the catch-all
  // for non-Next contexts (cron jobs, scripts). In production with opt-in,
  // the function returns { allowed: true } for that path. This is by design:
  // the production gate is at the route handler, not the guard.
  const prevNodeEnv = process.env.NODE_ENV;
  const prevEnabled = process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED;
  process.env.NODE_ENV = "production";
  process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED = "1";
  reset();
  try {
    const out = isLocalRequestAllowed();
    assert.equal(out.allowed, true);
  } finally {
    reset();
    if (prevNodeEnv !== undefined) process.env.NODE_ENV = prevNodeEnv;
    if (prevEnabled !== undefined) process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED = prevEnabled;
  }
});
