import test from "node:test";
import assert from "node:assert/strict";
import { buildRelayTestResult } from "@/app/api/settings/proxy/test/relayTestResult";

const base = { publicIp: "1.2.3.4", latencyMs: 12, relayUrl: "https://relay.example" };

// Minimal HeaderAccessor so we do not depend on a concrete Headers implementation.
function headers(map: Record<string, string>): { get(name: string): string | null } {
  return { get: (name: string) => (name in map ? map[name] : null) };
}

test("parses relay awareness from x-relay-* response headers on success", () => {
  const r = buildRelayTestResult({
    ...base,
    statusCode: 200,
    relayAuthPresent: true,
    relayResponseHeaders: headers({
      "x-relay-url": "https://relay-1.example",
      "x-relay-mode": "primary",
      "x-relay-attempts": "3",
      "x-relay-fallback": "true",
    }),
  });
  assert.equal(r.success, true);
  assert.deepEqual(r.relay, {
    url: "https://relay-1.example",
    mode: "primary",
    attempts: 3,
    fallback: true,
  });
});

test("omits relay block when no response headers provided", () => {
  const r = buildRelayTestResult({ ...base, statusCode: 200, relayAuthPresent: true });
  assert.equal(r.success, true);
  assert.equal(r.relay, undefined);
});

test("coerces missing/invalid awareness header values to null", () => {
  const r = buildRelayTestResult({
    ...base,
    statusCode: 200,
    relayAuthPresent: true,
    relayResponseHeaders: headers({
      "x-relay-attempts": "not-a-number",
      "x-relay-fallback": "maybe",
    }),
  });
  assert.deepEqual(r.relay, {
    url: null,
    mode: null,
    attempts: null,
    fallback: false,
  });
});

test("does not parse awareness on a failed relay response", () => {
  const r = buildRelayTestResult({
    ...base,
    statusCode: 502,
    publicIp: null,
    relayAuthPresent: true,
    relayResponseHeaders: headers({ "x-relay-url": "https://relay-1.example" }),
  });
  assert.equal(r.success, false);
  assert.equal(r.relay, undefined);
  assert.ok(typeof r.error === "string" && r.error.includes("502"));
});
