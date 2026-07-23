import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Test marketplace route module existence and type contracts.
// Full HTTP integration tests require the Next.js test harness.

describe("plugin marketplace", () => {
  describe("route module exists", () => {
    it("marketplace route exports GET and OPTIONS", async () => {
      const mod = await import("../../src/app/api/plugins/marketplace/route.ts");
      assert.equal(typeof mod.GET, "function");
      assert.equal(typeof mod.OPTIONS, "function");
    });
  });

  describe("listMarketplacePlugins", () => {
    it("returns an array of plugins with seed data", async () => {
      const { listMarketplacePlugins } = await import("../../src/lib/plugins/marketplace.ts");
      const plugins = await listMarketplacePlugins();
      assert.ok(Array.isArray(plugins));
      assert.ok(plugins.length > 0);
      // Each entry should have a name
      for (const p of plugins) {
        assert.equal(typeof p.name, "string");
        assert.ok(p.name.length > 0);
      }
    });
  });

  describe("isMarketplaceAvailable", () => {
    it("returns true (always available, falls back to seed)", async () => {
      const { isMarketplaceAvailable } = await import("../../src/lib/plugins/marketplace.ts");
      const result = isMarketplaceAvailable();
      assert.equal(result, true);
    });
  });

  describe("searchMarketplace", () => {
    it("filters plugins by name", async () => {
      const { searchMarketplace } = await import("../../src/lib/plugins/marketplace.ts");
      const results = await searchMarketplace("logger");
      assert.ok(Array.isArray(results));
      assert.ok(results.length > 0);
      assert.ok(results.every((p: { name: string }) => p.name.includes("logger")));
    });

    it("returns empty array for non-matching query", async () => {
      const { searchMarketplace } = await import("../../src/lib/plugins/marketplace.ts");
      const results = await searchMarketplace("zzz_nonexistent_zzz");
      assert.ok(Array.isArray(results));
      assert.equal(results.length, 0);
    });
  });

  describe("getMarketplaceEntry", () => {
    it("finds a plugin by name", async () => {
      const { getMarketplaceEntry } = await import("../../src/lib/plugins/marketplace.ts");
      const entry = await getMarketplaceEntry("request-logger");
      assert.ok(entry);
      assert.equal(entry.name, "request-logger");
    });

    it("returns undefined for unknown name", async () => {
      const { getMarketplaceEntry } = await import("../../src/lib/plugins/marketplace.ts");
      const entry = await getMarketplaceEntry("nonexistent-plugin");
      assert.equal(entry, undefined);
    });
  });

  describe("isSafeMarketplaceUrl — SSRF guard", () => {
    // A resolver stub so the DNS-resolution branch is deterministic in tests.
    const resolveTo = (...ips: string[]) => async () => ips.map((address) => ({ address }));

    it("rejects non-http(s) protocols", async () => {
      const { isSafeMarketplaceUrl } = await import("../../src/lib/plugins/marketplace.ts");
      assert.equal(await isSafeMarketplaceUrl("file:///etc/passwd", resolveTo("1.1.1.1")), false);
      assert.equal(await isSafeMarketplaceUrl("ftp://example.com", resolveTo("1.1.1.1")), false);
      assert.equal(await isSafeMarketplaceUrl("gopher://x", resolveTo("1.1.1.1")), false);
    });

    it("rejects literal private/loopback IPv4 hosts", async () => {
      const { isSafeMarketplaceUrl } = await import("../../src/lib/plugins/marketplace.ts");
      for (const h of ["http://127.0.0.1", "http://10.0.0.5", "http://192.168.1.1", "http://169.254.169.254"]) {
        assert.equal(await isSafeMarketplaceUrl(h, resolveTo("8.8.8.8")), false, h);
      }
    });

    it("rejects literal IPv6 loopback / ULA / link-local hosts (the IPv4-only bypass)", async () => {
      const { isSafeMarketplaceUrl } = await import("../../src/lib/plugins/marketplace.ts");
      for (const h of ["http://[::1]", "http://[fc00::1]", "http://[fd12:3456::1]", "http://[fe80::1]"]) {
        assert.equal(await isSafeMarketplaceUrl(h, resolveTo("8.8.8.8")), false, h);
      }
    });

    it("rejects a public hostname that RESOLVES to a private IPv4 (DNS rebinding / public→private)", async () => {
      const { isSafeMarketplaceUrl } = await import("../../src/lib/plugins/marketplace.ts");
      assert.equal(await isSafeMarketplaceUrl("https://evil.example.com", resolveTo("10.1.2.3")), false);
      assert.equal(await isSafeMarketplaceUrl("https://evil.example.com", resolveTo("169.254.169.254")), false);
    });

    it("rejects a public hostname that resolves to a private IPv6 (AAAA bypass)", async () => {
      const { isSafeMarketplaceUrl } = await import("../../src/lib/plugins/marketplace.ts");
      // Public-looking A but private AAAA — must reject because ALL records are validated.
      assert.equal(
        await isSafeMarketplaceUrl("https://evil.example.com", resolveTo("8.8.8.8", "::1")),
        false
      );
      assert.equal(await isSafeMarketplaceUrl("https://evil.example.com", resolveTo("fc00::1")), false);
    });

    it("rejects on DNS failure or empty resolution (fail-closed)", async () => {
      const { isSafeMarketplaceUrl } = await import("../../src/lib/plugins/marketplace.ts");
      const throwing = async () => {
        throw new Error("ENOTFOUND");
      };
      assert.equal(await isSafeMarketplaceUrl("https://example.com", throwing), false);
      assert.equal(await isSafeMarketplaceUrl("https://example.com", resolveTo()), false);
    });

    it("accepts a public hostname resolving only to public addresses", async () => {
      const { isSafeMarketplaceUrl } = await import("../../src/lib/plugins/marketplace.ts");
      assert.equal(
        await isSafeMarketplaceUrl("https://registry.example.com", resolveTo("93.184.216.34", "2606:2800:220:1::1")),
        true
      );
    });
  });
});
