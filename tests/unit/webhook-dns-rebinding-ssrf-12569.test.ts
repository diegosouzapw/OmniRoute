/**
 * Regression for issue #12569: the webhook outbound-URL guard
 * (`parseAndValidateWebhookUrl`, `isPrivateHost`, `isCloudMetadataHost`) classified only the
 * literal hostname STRING in the configured webhook URL. It never resolved DNS before
 * deciding a target was public, so a domain an attacker controls (DNS A record pointed at
 * 169.254.169.254 / an RFC1918 address) passed the guard, and the real `fetch()` that
 * followed resolved DNS itself and reached the internal target (DNS rebinding).
 *
 * Fixed by `fetchWebhookUrl` (`src/shared/network/webhookFetch.ts`), which resolves DNS
 * up-front, rejects any resolved answer that is cloud-metadata/private, and pins the
 * connection to the validated address (so a *second*, real DNS lookup at connect time cannot
 * rebind to a different address either).
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/webhook-dns-rebinding-ssrf-12569.test.ts
 */

import { describe, it, mock, after } from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";

import { deliverWebhook } from "../../src/lib/webhookDispatcher.ts";

const REBOUND_HOSTNAME = "evil.example.com";
const IMDS_ADDRESS = "169.254.169.254";

const originalLookup = dns.promises.lookup;
mock.method(
  dns.promises,
  "lookup",
  async (hostname: string): Promise<dns.LookupAddress[]> => {
    if (hostname === REBOUND_HOSTNAME) {
      return [{ address: IMDS_ADDRESS, family: 4 }];
    }
    return originalLookup(hostname, { all: true });
  }
);

after(() => {
  mock.restoreAll();
});

describe("#12569 — webhook outbound guard is hostname-string-only (DNS rebinding)", () => {
  it("does NOT let a hostname that resolves to the cloud-metadata IP reach fetch()", async () => {
    const fetchCalls: string[] = [];
    const originalFetch = globalThis.fetch;
    // @ts-expect-error - stubbing global fetch for the probe
    globalThis.fetch = async (input: string) => {
      fetchCalls.push(String(input));
      return new Response("ok", { status: 200 });
    };

    try {
      const res = await deliverWebhook(
        `http://${REBOUND_HOSTNAME}/hook`,
        { event: "test.ping", timestamp: new Date().toISOString(), data: {} },
        "secret"
      );

      assert.equal(
        fetchCalls.length,
        0,
        `guard should have blocked dispatch to a hostname resolving to ${IMDS_ADDRESS}, ` +
          `but fetch() was called with: ${JSON.stringify(fetchCalls)}`
      );
      assert.equal(res.success, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("blocks a hostname that resolves to an RFC1918 address, without retrying", async () => {
    const start = Date.now();
    const res = await deliverWebhook(
      "http://rebind-to-lan.example.com/hook",
      { event: "test.ping", timestamp: new Date().toISOString(), data: {} },
      null,
      3,
      { lookup: async () => [{ address: "10.1.2.3", family: 4 }] }
    );
    const elapsedMs = Date.now() - start;

    assert.equal(res.success, false);
    assert.ok(
      typeof res.error === "string" && /private|blocked|local/i.test(res.error),
      `expected guard error, got: ${res.error}`
    );
    // A guard-blocked verdict must fail fast — no exponential-backoff retries (1s+2s+4s) for
    // something that will keep resolving the same way.
    assert.ok(elapsedMs < 900, `blocked delivery must not retry with backoff (took ${elapsedMs}ms)`);
  });

  it("blocks when any of several resolved addresses is private (multi-A trick)", async () => {
    const fetchCalls: string[] = [];
    const res = await deliverWebhook(
      "http://multi-answer.example.com/hook",
      { event: "test.ping", timestamp: new Date().toISOString(), data: {} },
      null,
      0,
      {
        lookup: async () => [
          { address: "203.0.113.5", family: 4 },
          { address: "169.254.169.254", family: 4 },
        ],
        fetchImpl: async (input: string | URL) => {
          fetchCalls.push(String(input));
          return new Response("ok", { status: 200 });
        },
      }
    );

    assert.equal(res.success, false);
    assert.equal(fetchCalls.length, 0, "fetch must never fire when any resolved IP is blocked");
  });

  it("allows a hostname that resolves only to public addresses", async () => {
    const fetchCalls: string[] = [];
    const res = await deliverWebhook(
      "http://public-looking.example.com/hook",
      { event: "test.ping", timestamp: new Date().toISOString(), data: {} },
      null,
      0,
      {
        lookup: async () => [{ address: "203.0.113.5", family: 4 }],
        fetchImpl: async (input: string | URL) => {
          fetchCalls.push(String(input));
          return new Response("ok", { status: 200 });
        },
      }
    );

    assert.equal(res.success, true);
    assert.equal(fetchCalls.length, 1);
  });
});
