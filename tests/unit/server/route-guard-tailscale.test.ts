/**
 * Unit tests for `isPrivateLanHost` — Tailscale CGNAT recognition (Bug #2).
 *
 * Bug #2 from `plans/2026-06-23-omniroute-v3.8.34-deep-audit.md`:
 * the route guard `PRIVATE_LAN_PATTERNS` array did not include the Tailscale
 * CGNAT range (`100.64.0.0/10`). Operators running OmniRoute on a Tailscale
 * network saw `/api/system/version` return 403 because `classifyHostLocality`
 * classified Tailscale IPs as `remote`, not `lan`, and the management policy
 * rejects `LOCAL_ONLY` paths from non-loopback requests.
 *
 * The fix is opt-in via the `TAILSCALE_CIDR` env var (default: `enabled`,
 * matching prior behaviour intent). Operators on non-Tailscale networks can
 * set `TAILSCALE_CIDR=disabled` to revert.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";

// `isPrivateLanHost` lives in `@/server/authz/routeGuard`, which transitively
// loads the credentials/dataPaths bootstrap on first import. On Windows the
// first dynamic import of a `src/server/...` module can take 3-5s (sqlite
// native binding + config bootstrap), so bump the per-test timeout to absorb
// the cold-start cost on the first few tests of the run.
const TEST_TIMEOUT = 30_000;

// Helper: import the routeGuard module fresh per test block so we can flip
// `process.env.TAILSCALE_CIDR` between groups without polluting module state.
// (Vitest module caching across blocks is bypassed by the dynamic import in
// each describe block; we use a per-block `await import` so each block gets
// a clean module evaluation order.)

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("isPrivateLanHost — Tailscale CGNAT (default enabled)", () => {
  beforeEach(() => {
    delete process.env.TAILSCALE_CIDR;
  });

  it.each([
    "100.64.0.0",       // first address of CGNAT block
    "100.96.135.160",   // user-observed value from the bug report
    "100.100.100.100",  // mid-range
    "100.127.255.255",  // last address of CGNAT block
  ])("treats Tailscale IP %s as LAN", async (ip) => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost(ip)).toBe(true);
  }, TEST_TIMEOUT);

  it("treats 100.x IPs outside the CGNAT range as remote (not LAN)", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    // 100.0.0.0 – 100.63.255.255 is RESERVED IANA space, NOT Tailscale.
    // 100.128.0.0 – 100.255.255.255 is also reserved.
    expect(isPrivateLanHost("100.0.0.1")).toBe(false);
    expect(isPrivateLanHost("100.63.255.255")).toBe(false);
    expect(isPrivateLanHost("100.128.0.0")).toBe(false);
    expect(isPrivateLanHost("100.200.0.1")).toBe(false);
  }, TEST_TIMEOUT);

  it("still recognizes RFC 1918 ranges after Tailscale support added", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("10.0.0.1")).toBe(true);
    expect(isPrivateLanHost("192.168.1.1")).toBe(true);
    expect(isPrivateLanHost("172.16.0.1")).toBe(true);
    expect(isPrivateLanHost("172.31.255.255")).toBe(true);
    expect(isPrivateLanHost("172.32.0.0")).toBe(false);
  }, TEST_TIMEOUT);

  it("does NOT treat public IPs as LAN", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("8.8.8.8")).toBe(false);
    expect(isPrivateLanHost("1.1.1.1")).toBe(false);
    expect(isPrivateLanHost("203.0.113.5")).toBe(false);
  });

  it("strips a :port suffix before matching", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("100.96.135.160:20128")).toBe(true);
    expect(isPrivateLanHost("192.168.1.10:8080")).toBe(true);
  });

  it("returns false for null/empty input", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost(null)).toBe(false);
    expect(isPrivateLanHost("")).toBe(false);
  });
});

describe("isPrivateLanHost — Tailscale opt-out via TAILSCALE_CIDR=disabled", () => {
  beforeEach(() => {
    process.env.TAILSCALE_CIDR = "disabled";
  });

  it("rejects Tailscale CGNAT when operator has opted out", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("100.96.135.160")).toBe(false);
    expect(isPrivateLanHost("100.64.0.0")).toBe(false);
    expect(isPrivateLanHost("100.127.255.255")).toBe(false);
  });

  it("still recognizes RFC 1918 ranges with Tailscale opt-out", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("10.0.0.1")).toBe(true);
    expect(isPrivateLanHost("192.168.1.1")).toBe(true);
  });
});

describe("classifyHostLocality — Tailscale treated as LAN", () => {
  beforeEach(() => {
    delete process.env.TAILSCALE_CIDR;
  });

  it.each([
    ["127.0.0.1", "loopback"],
    ["192.168.1.1", "lan"],
    ["100.96.135.160", "lan"],
    ["8.8.8.8", "remote"],
  ])("classifies %s as %s", async (ip, expected) => {
    const { classifyHostLocality } = await import("@/server/authz/routeGuard");
    expect(classifyHostLocality(ip)).toBe(expected);
  });
});

describe("isPrivateLanHost — PRIVATE_LAN_CIDR allow-list (overlay networks)", () => {
  // Reset both knobs to off so the CIDR allow-list is the only thing that can
  // possibly turn a previously-remote IP into LAN. Toggles set in this block
  // should not leak into the other describe blocks (the top-level beforeEach
  // restores process.env from the snapshot).
  beforeEach(() => {
    process.env.TAILSCALE_CIDR = "disabled";
    process.env.PRIVATE_LAN_CIDR = "100.96.0.0/12"; // Cloudflare WARP
  });

  it("accepts IPs in a CIDR allow-list (Cloudflare WARP 100.96.0.0/12)", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("100.96.0.0")).toBe(true);
    expect(isPrivateLanHost("100.96.135.160")).toBe(true);
    expect(isPrivateLanHost("100.111.255.255")).toBe(true);
  });

  it("rejects IPs outside the CIDR allow-list", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("100.95.255.255")).toBe(false);
    expect(isPrivateLanHost("100.112.0.0")).toBe(false);
    expect(isPrivateLanHost("100.127.255.255")).toBe(false);
  });

  it("accepts multiple comma-separated CIDRs", async () => {
    process.env.PRIVATE_LAN_CIDR = "25.0.0.0/8,100.96.0.0/12"; // Hamachi + WARP
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("25.0.0.1")).toBe(true);
    expect(isPrivateLanHost("25.255.255.255")).toBe(true);
    expect(isPrivateLanHost("100.96.135.160")).toBe(true);
  });

  it("tolerates malformed CIDR entries without crashing authz", async () => {
    process.env.PRIVATE_LAN_CIDR = "bogus,10.0.0.0/8,no-slash,256.0.0.0/8,10.1.0.0/33";
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("10.5.5.5")).toBe(true);
    expect(isPrivateLanHost("8.8.8.8")).toBe(false);
  });
});

describe("isPrivateLanHost — Tailscale CIDR override is treated as opt-in", () => {
  // When TAILSCALE_CIDR=disabled, Tailscale IPs stop being LAN. An operator
  // who still wants to trust Tailscale can re-add it explicitly via
  // PRIVATE_LAN_CIDR. This documents the migration path.
  beforeEach(() => {
    process.env.TAILSCALE_CIDR = "disabled";
    process.env.PRIVATE_LAN_CIDR = "100.64.0.0/10";
  });

  it("accepts Tailscale CGNAT via explicit PRIVATE_LAN_CIDR when TAILSCALE_CIDR=disabled", async () => {
    const { isPrivateLanHost } = await import("@/server/authz/routeGuard");
    expect(isPrivateLanHost("100.96.135.160")).toBe(true);
    expect(isPrivateLanHost("100.64.0.0")).toBe(true);
    expect(isPrivateLanHost("100.127.255.255")).toBe(true);
  });
});
