/**
 * Unit tests for `liveServerAllowList`.
 *
 * Bug #1 (plans/2026-06-23-omniroute-v3.8.34-deep-audit.md) introduced the
 * `LIVE_WS_ALLOWED_HOSTS` opt-in for LAN/Tailscale deployments. These tests
 * pin down the contract: defaults remain loopback-only; the env var extends
 * the allow-list with bare hostnames or `host:port` pairs; the absence of
 * Origin is still only acceptable on loopback.
 *
 * Runner note: lives under tests/unit/security/ (a node:test–collected subdir)
 * and uses node:test + assert/strict so the gate `check:test-discovery` actually
 * runs it. The original copy under tests/unit/server/ used vitest in a path no
 * runner collected — it never executed (caught by Gate 6A.1).
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildAllowedOrigins,
  buildAllowedHosts,
  isOriginAllowed,
  originHost,
  originHostMatches,
  parseCsvEnv,
  DEFAULT_ALLOWED_ORIGINS,
} from "@/server/ws/liveServerAllowList";

const EMPTY_ENV: NodeJS.ProcessEnv = {};

describe("parseCsvEnv", () => {
  it("returns empty set for undefined", () => {
    assert.equal(parseCsvEnv(undefined).size, 0);
  });

  it("returns empty set for empty string", () => {
    assert.equal(parseCsvEnv("").size, 0);
  });

  it("trims whitespace and drops empty entries", () => {
    const out = parseCsvEnv("  a , b ,, c  ");
    assert.deepEqual([...out], ["a", "b", "c"]);
  });

  it("deduplicates entries", () => {
    const out = parseCsvEnv("a,a,b");
    assert.deepEqual([...out], ["a", "b"]);
  });
});

describe("buildAllowedOrigins", () => {
  it("includes the loopback defaults", () => {
    const out = buildAllowedOrigins(EMPTY_ENV);
    for (const origin of DEFAULT_ALLOWED_ORIGINS) {
      assert.equal(out.has(origin), true);
    }
  });

  it("extends defaults with LIVE_WS_ALLOWED_ORIGINS", () => {
    const env = {
      ...EMPTY_ENV,
      LIVE_WS_ALLOWED_ORIGINS: "https://dash.example.com,https://other.example.com",
    };
    const out = buildAllowedOrigins(env);
    assert.equal(out.has("https://dash.example.com"), true);
    assert.equal(out.has("https://other.example.com"), true);
    // Defaults remain.
    assert.equal(out.has("http://localhost:20128"), true);
  });
});

describe("buildAllowedHosts", () => {
  it("returns empty set when env is not set", () => {
    assert.equal(buildAllowedHosts(EMPTY_ENV).size, 0);
  });

  it("parses comma-separated hosts", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_HOSTS: "100.96.135.160,desktop.tailnet.ts.net" };
    const out = buildAllowedHosts(env);
    assert.equal(out.has("100.96.135.160"), true);
    assert.equal(out.has("desktop.tailnet.ts.net"), true);
  });
});

describe("originHost", () => {
  it("returns host and hostname for a valid URL", () => {
    assert.deepEqual(originHost("http://100.96.135.160:20128"), {
      host: "100.96.135.160:20128",
      hostname: "100.96.135.160",
    });
  });

  it("returns null for an invalid URL", () => {
    assert.equal(originHost("not a url"), null);
  });
});

describe("originHostMatches", () => {
  it("returns false when the allow-list is empty", () => {
    assert.equal(originHostMatches("http://100.96.135.160:20128", new Set()), false);
  });

  it("matches by exact host:port", () => {
    const allow = new Set(["100.96.135.160:20128"]);
    assert.equal(originHostMatches("http://100.96.135.160:20128", allow), true);
  });

  it("matches by bare hostname regardless of port", () => {
    const allow = new Set(["100.96.135.160"]);
    assert.equal(originHostMatches("http://100.96.135.160:20128", allow), true);
    assert.equal(originHostMatches("http://100.96.135.160:55555", allow), true);
  });

  it("returns false for a non-matching host", () => {
    const allow = new Set(["100.96.135.160"]);
    assert.equal(originHostMatches("http://10.0.0.5:20128", allow), false);
  });

  it("returns false for an unparseable origin", () => {
    const allow = new Set(["100.96.135.160"]);
    assert.equal(originHostMatches("not-a-url", allow), false);
  });
});

describe("isOriginAllowed", () => {
  it("rejects any non-loopback origin by default", () => {
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", EMPTY_ENV), false);
  });

  it("accepts the default loopback origins", () => {
    assert.equal(isOriginAllowed("http://127.0.0.1:20128", EMPTY_ENV), true);
    assert.equal(isOriginAllowed("http://localhost:20128", EMPTY_ENV), true);
    assert.equal(isOriginAllowed("http://[::1]:20128", EMPTY_ENV), true);
  });

  it("accepts an Origin matching LIVE_WS_ALLOWED_ORIGINS", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_ORIGINS: "https://dash.example.com" };
    assert.equal(isOriginAllowed("https://dash.example.com", env), true);
  });

  it("accepts a Tailscale Origin when LIVE_WS_ALLOWED_HOSTS is set", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_HOSTS: "100.96.135.160" };
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", env), true);
  });

  it("accepts a Tailscale Origin matched by host:port when LIVE_WS_ALLOWED_HOSTS is set", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_HOSTS: "100.96.135.160:20128" };
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", env), true);
  });

  it("does NOT accept a Tailscale Origin when LIVE_WS_ALLOWED_HOSTS is unset", () => {
    // Critical security invariant: without explicit opt-in, the LAN/Tailscale
    // surface is closed even though the listener is reachable.
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", EMPTY_ENV), false);
  });

  it("rejects a missing Origin when bound to LAN (0.0.0.0)", () => {
    // A CLI client that omits Origin should NOT be accepted when the
    // operator opted into LAN exposure. Browsers always send Origin, so the
    // empty-Origin path is for non-browser callers; the security stance is
    // "refuse unless loopback".
    const env = { ...EMPTY_ENV, LIVE_WS_HOST: "0.0.0.0" };
    assert.equal(isOriginAllowed(undefined, env), false);
  });

  it("accepts a missing Origin on loopback (CLI/MCP)", () => {
    // CLI/MCP clients running on the same host omit Origin. The default
    // listener (127.0.0.1) accepts them.
    assert.equal(isOriginAllowed(undefined, EMPTY_ENV), true);
  });

  it("accepts a missing Origin on ::1 / localhost hosts", () => {
    const env1 = { ...EMPTY_ENV, LIVE_WS_HOST: "::1" };
    assert.equal(isOriginAllowed(undefined, env1), true);
    const env2 = { ...EMPTY_ENV, LIVE_WS_HOST: "localhost" };
    assert.equal(isOriginAllowed(undefined, env2), true);
  });
});
