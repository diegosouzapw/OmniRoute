import assert from "node:assert/strict";
import test from "node:test";

import {
  collectQuotaState,
  parseRateLimitHeaders,
  unknownQuotaState,
} from "@/lib/quota/providerQuotaTelemetry";
import { classifyProviderFailure } from "@/lib/resilience/failureClassification";
import { rankCandidates, shouldFailover } from "@/lib/routing/adaptiveRouting";

test("unknown quota remains unknown and does not disable routing", async () => {
  const state = await collectQuotaState({ id: "c1", provider: "codex" }, []);
  assert.equal(state.supported, false);
  assert.equal(state.status, "unknown");
  assert.deepEqual(state.values, []);

  const ranked = rankCandidates([
    {
      providerId: "codex",
      modelId: "gpt-5",
      capabilityScore: 1,
      allocation: "allow",
      healthScore: 1,
      circuit: "closed",
      quota: state.status,
    },
  ]);
  assert.equal(ranked.selected?.providerId, "codex");
});

test("quota source priority prefers authoritative values per dimension", async () => {
  const state = await collectQuotaState({ id: "c1", provider: "codex" }, [
    {
      kind: "estimated",
      supports: () => true,
      read: async () => [
        { dimension: "requests", remaining: 1, source: "estimated", confidence: "low" },
      ],
    },
    {
      kind: "provider_api",
      supports: () => true,
      read: async () => [
        {
          dimension: "requests",
          limit: 100,
          remaining: 80,
          source: "provider_api",
          confidence: "authoritative",
        },
      ],
    },
  ]);
  assert.equal(state.status, "healthy");
  assert.equal(state.values[0]?.source, "provider_api");
  assert.equal(state.values[0]?.remaining, 80);
});

test("response headers normalize only through an explicit provider mapping", () => {
  const parsed = parseRateLimitHeaders(
    { "x-limit": "100", "x-remaining": "12", "x-reset": "1700000000" },
    "provider",
    "connection",
    { limit: "x-limit", remaining: "x-remaining", reset: "x-reset", dimension: "requests" }
  );
  assert.equal(parsed?.value.dimension, "requests");
  assert.equal(parsed?.value.remaining, 12);
  assert.equal(parsed?.snapshot.requestLimit, 100);
  assert.equal(parseRateLimitHeaders({}, "p", "c", { limit: "missing" }), null);
});

test("exhausted quota and open circuits are excluded; approaching quota is penalized", () => {
  const result = rankCandidates([
    {
      providerId: "exhausted",
      modelId: "m",
      capabilityScore: 1,
      allocation: "allow",
      healthScore: 1,
      circuit: "closed",
      quota: "exhausted",
    },
    {
      providerId: "open",
      modelId: "m",
      capabilityScore: 1,
      allocation: "allow",
      healthScore: 1,
      circuit: "open",
      quota: "unknown",
    },
    {
      providerId: "approaching",
      modelId: "m",
      capabilityScore: 1,
      allocation: "allow",
      healthScore: 1,
      circuit: "closed",
      quota: "approaching_limit",
    },
    {
      providerId: "healthy",
      modelId: "m",
      capabilityScore: 1,
      allocation: "allow",
      healthScore: 1,
      circuit: "closed",
      quota: "unknown",
    },
  ]);
  assert.equal(result.selected?.providerId, "healthy");
  assert.equal(
    result.candidates.find((candidate) => candidate.providerId === "exhausted")?.eligible,
    false
  );
  assert.ok(
    (result.candidates.find((candidate) => candidate.providerId === "approaching")?.score ?? 1) < 1
  );
});

test("failure classification retries transient failures but not authentication errors", () => {
  const timeout = classifyProviderFailure({
    providerId: "codex",
    statusCode: 504,
    message: "upstream timeout",
  });
  const auth = classifyProviderFailure({
    providerId: "codex",
    statusCode: 401,
    message: "invalid token",
  });
  assert.equal(timeout.type, "timeout");
  assert.equal(shouldFailover(timeout), true);
  assert.equal(auth.type, "authentication_error");
  assert.equal(shouldFailover(auth), false);
});

test("unknown state helper is explicit", () => {
  const state = unknownQuotaState("p", "c", "2026-01-01T00:00:00.000Z");
  assert.deepEqual(state, {
    providerId: "p",
    connectionId: "c",
    supported: false,
    fetchedAt: "2026-01-01T00:00:00.000Z",
    values: [],
    status: "unknown",
  });
});
