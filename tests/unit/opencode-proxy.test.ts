import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

/**
 * #7993 — Noauth connections do not use assigned proxies.
 *
 * The bug is combo-specific: direct model requests honor the proxy, but combo
 * requests (which route through the same OpencodeExecutor) lose it.
 *
 * This test verifies that syncAccountsFromCredentials correctly maps proxies
 * when credentials come from the combo credential cache (preselectedCredentials).
 */

// Minimal type stubs for testing
interface OpencodeAccountState {
  fingerprint: string;
  cooldownUntil: number;
  consecutiveFails: number;
  proxy: any;
}

interface ProviderCredentials {
  apiKey?: string;
  accessToken?: string | null;
  providerSpecificData?: any;
  connectionId?: string;
}

/**
 * Replicate the syncAccountsFromCredentials logic from opencode.ts
 * to test the fingerprint→proxy mapping in isolation.
 */
function syncAccountsFromCredentials(
  credentials: ProviderCredentials,
  accounts: OpencodeAccountState[]
): OpencodeAccountState[] {
  const psd = credentials?.providerSpecificData;
  const fingerprints = Array.isArray(psd?.fingerprints)
    ? (psd!.fingerprints as unknown[]).filter((f): f is string => typeof f === "string")
    : [];

  const accountProxies = psd?.accountProxies;
  const proxyMap = Array.isArray(accountProxies)
    ? new Map(accountProxies.map((ap: any) => [ap.fingerprint, ap.proxy ?? null] as const))
    : null;

  if (fingerprints.length === 0) {
    return [{ fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null }];
  }

  const previous = new Map(accounts.map((a) => [a.fingerprint, a] as const));
  const result = fingerprints.map((fp) => {
    const prior = previous.get(fp);
    return {
      fingerprint: fp,
      cooldownUntil: prior?.cooldownUntil ?? 0,
      consecutiveFails: prior?.consecutiveFails ?? 0,
      proxy: proxyMap ? (proxyMap.get(fp) ?? null) : null,
    };
  });
  return result;
}

describe("OpencodeExecutor proxy mapping (#7993)", () => {
  it("should map proxy when fingerprint matches between fingerprints[] and accountProxies[]", () => {
    const credentials: ProviderCredentials = {
      providerSpecificData: {
        fingerprints: ["fp-aaa", "fp-bbb"],
        accountProxies: [
          { fingerprint: "fp-aaa", proxy: { type: "socks5", host: "1.1.1.1", port: 1080 } },
          { fingerprint: "fp-bbb", proxy: { type: "socks5", host: "2.2.2.2", port: 1080 } },
        ],
      },
    };

    const accounts = syncAccountsFromCredentials(credentials, []);
    assert.equal(accounts.length, 2);
    assert.equal(accounts[0].fingerprint, "fp-aaa");
    assert.deepEqual(accounts[0].proxy, { type: "socks5", host: "1.1.1.1", port: 1080 });
    assert.equal(accounts[1].fingerprint, "fp-bbb");
    assert.deepEqual(accounts[1].proxy, { type: "socks5", host: "2.2.2.2", port: 1080 });
  });

  it("should return null proxy when accountProxies is missing (no proxy configured)", () => {
    const credentials: ProviderCredentials = {
      providerSpecificData: {
        fingerprints: ["fp-aaa"],
      },
    };

    const accounts = syncAccountsFromCredentials(credentials, []);
    assert.equal(accounts.length, 1);
    assert.equal(accounts[0].proxy, null);
  });

  it("should return null proxy when fingerprint has no matching accountProxy entry", () => {
    const credentials: ProviderCredentials = {
      providerSpecificData: {
        fingerprints: ["fp-aaa", "fp-bbb"],
        accountProxies: [
          // Only fp-aaa has a proxy; fp-bbb has no entry
          { fingerprint: "fp-aaa", proxy: { type: "socks5", host: "1.1.1.1", port: 1080 } },
        ],
      },
    };

    const accounts = syncAccountsFromCredentials(credentials, []);
    assert.equal(accounts.length, 2);
    assert.deepEqual(accounts[0].proxy, { type: "socks5", host: "1.1.1.1", port: 1080 });
    assert.equal(accounts[1].proxy, null);
  });

  // ★ This is the key test for #7993: verify the combo credential cache
  // path preserves the PSD with accountProxies
  it("should preserve proxy mapping when credentials come from combo cache (preselectedCredentials)", () => {
    // Simulate what checkModelAvailable caches
    const cachedCredentials: ProviderCredentials = {
      providerSpecificData: {
        fingerprints: ["fp-aaa"],
        accountProxies: [
          { fingerprint: "fp-aaa", proxy: { type: "socks5", host: "proxy.example.com", port: 1080 } },
        ],
      },
      connectionId: "SYNTHETIC_NOAUTH",
    };

    // Simulate what happens after checkAndRefreshToken (shallow copy for noauth)
    const refreshedCredentials = { ...cachedCredentials };

    // syncAccountsFromCredentials should still see the PSD
    const accounts = syncAccountsFromCredentials(refreshedCredentials, []);
    assert.equal(accounts.length, 1);
    assert.equal(accounts[0].proxy?.host, "proxy.example.com");
    assert.equal(accounts[0].proxy?.port, 1080);
  });

  it("should detect hasProxies correctly when there is 1 account with proxy", () => {
    const credentials: ProviderCredentials = {
      providerSpecificData: {
        fingerprints: ["fp-aaa"],
        accountProxies: [
          { fingerprint: "fp-aaa", proxy: { type: "socks5", host: "1.1.1.1", port: 1080 } },
        ],
      },
    };

    const accounts = syncAccountsFromCredentials(credentials, []);
    const hasProxies = accounts.some((a) => a.proxy !== null);

    // This must be true so the fast-path bypass (line 157) does NOT trigger
    assert.equal(hasProxies, true);
    assert.equal(accounts.length, 1);
  });

  it("should NOT trigger fast-path bypass when account has proxy (combo scenario)", () => {
    const credentials: ProviderCredentials = {
      providerSpecificData: {
        fingerprints: ["fp-aaa"],
        accountProxies: [
          { fingerprint: "fp-aaa", proxy: { type: "socks5", host: "1.1.1.1", port: 1080 } },
        ],
      },
    };

    const accounts = syncAccountsFromCredentials(credentials, []);

    // Replicate the fast-path check from opencode.ts line 157
    const hasProxies = accounts.some((a) => a.proxy !== null);
    const wouldBypass = accounts.length === 1 && !hasProxies;

    assert.equal(wouldBypass, false, "Fast-path bypass should NOT trigger when proxy is configured");
  });
});
