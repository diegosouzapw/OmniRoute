import assert from "node:assert/strict";
import { test } from "node:test";

import {
  isAnthropicAccountHeader,
  shouldStripAnthropicAccountHeaders,
  type AnthropicAccountHeaderPolicyKeyInfo,
} from "@omniroute/open-sse/handlers/chatCore/upstreamAccountHeaders.ts";
import {
  buildStreamingResponseHeaders,
  type StreamingResponseHeadersMeta,
} from "@omniroute/open-sse/handlers/chatCore/responseHeaders.ts";

// Per-API-key policy for forwarding the
// upstream anthropic-ratelimit-*/anthropic-organization-id headers on the
// streaming passthrough.

function getHeaderValue(headers: Record<string, string>, name: string): string | undefined {
  const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase());
  return entry?.[1];
}

test("isAnthropicAccountHeader matches ratelimit prefix and organization-id, case-insensitively", () => {
  assert.equal(isAnthropicAccountHeader("anthropic-ratelimit-unified-status"), true);
  assert.equal(isAnthropicAccountHeader("Anthropic-Ratelimit-Unified-5h-Utilization"), true);
  assert.equal(isAnthropicAccountHeader("anthropic-organization-id"), true);
  assert.equal(isAnthropicAccountHeader("ANTHROPIC-ORGANIZATION-ID"), true);
  assert.equal(isAnthropicAccountHeader("anthropic-organization-id-extra"), false);
  assert.equal(isAnthropicAccountHeader("retry-after"), false);
  assert.equal(isAnthropicAccountHeader("x-request-id"), false);
  assert.equal(isAnthropicAccountHeader("anthropic-ratelimit-"), true);
});

test("shouldStripAnthropicAccountHeaders: table-driven policy cases", () => {
  type Case = {
    name: string;
    apiKeyInfo: AnthropicAccountHeaderPolicyKeyInfo | null | undefined;
    provider: string | null | undefined;
    expectedStrip: boolean;
  };

  const cases: Case[] = [
    {
      name: "no API key on the request -> forward (unchanged behavior)",
      apiKeyInfo: null,
      provider: "claude",
      expectedStrip: false,
    },
    {
      name: "apiKeyInfo undefined -> forward",
      apiKeyInfo: undefined,
      provider: "claude",
      expectedStrip: false,
    },
    {
      name: 'mode "forward" -> forward regardless of scopes/connections',
      apiKeyInfo: { anthropicRateLimitHeaders: "forward" },
      provider: "claude",
      expectedStrip: false,
    },
    {
      name: 'mode "strip" -> strip regardless of scopes/connections',
      apiKeyInfo: {
        anthropicRateLimitHeaders: "strip",
        scopes: ["self:account-quota"],
        allowedConnections: ["conn-1"],
      },
      provider: "claude",
      expectedStrip: true,
    },
    {
      name: 'mode "auto" without self:account-quota scope -> strip',
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        allowedConnections: ["conn-1"],
      },
      provider: "claude",
      expectedStrip: true,
    },
    {
      name: 'mode "auto" with self:account-quota scope, single connection, no shared-provider restriction -> forward',
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
        allowedConnections: ["conn-1"],
        sharedQuotaProviders: null,
      },
      provider: "claude",
      expectedStrip: false,
    },
    {
      name: "mode unset (default forward) preserves legacy behavior -> forward even without scope",
      apiKeyInfo: {
        scopes: [],
        allowedConnections: ["conn-1"],
      },
      provider: "claude",
      expectedStrip: false,
    },
    {
      name: "auto + scoped + single connection + serving provider IN sharedQuotaProviders -> forward",
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
        allowedConnections: ["conn-1"],
        sharedQuotaProviders: ["claude", "codex"],
      },
      provider: "claude",
      expectedStrip: false,
    },
    {
      name: "auto + scoped + single connection + serving provider NOT in sharedQuotaProviders -> strip",
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
        allowedConnections: ["conn-1"],
        sharedQuotaProviders: ["codex"],
      },
      provider: "claude",
      expectedStrip: true,
    },
    {
      name: "auto + scoped + sharedQuotaProviders null (all providers) -> forward",
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
        allowedConnections: ["conn-1"],
        sharedQuotaProviders: null,
      },
      provider: "gemini",
      expectedStrip: false,
    },
    {
      name: "auto + scoped + 0 allowedConnections -> strip (not pinned to a single account)",
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
        allowedConnections: [],
      },
      provider: "claude",
      expectedStrip: true,
    },
    {
      name: "auto + scoped + 2 allowedConnections -> strip (ambiguous which account is served)",
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
        allowedConnections: ["conn-1", "conn-2"],
      },
      provider: "claude",
      expectedStrip: true,
    },
    {
      name: "auto + scoped + allowedConnections undefined -> strip",
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
      },
      provider: "claude",
      expectedStrip: true,
    },
  ];

  for (const testCase of cases) {
    const actual = shouldStripAnthropicAccountHeaders(testCase.apiKeyInfo, testCase.provider);
    assert.equal(actual, testCase.expectedStrip, testCase.name);
  }
});

function anthropicUpstreamHeaders(): Headers {
  const upstream = new Headers();
  upstream.set("anthropic-ratelimit-unified-status", "allowed");
  upstream.set("anthropic-ratelimit-unified-5h-utilization", "42");
  upstream.set("anthropic-organization-id", "org-abc123");
  upstream.set("retry-after", "5");
  upstream.set("x-request-id", "req-anthropic-header-policy");
  return upstream;
}

test("buildStreamingResponseHeaders forwards anthropic account headers when the flag is false/absent", () => {
  const out = buildStreamingResponseHeaders(anthropicUpstreamHeaders(), {
    // stripAnthropicAccountHeaders intentionally omitted.
  } satisfies StreamingResponseHeadersMeta);

  assert.equal(getHeaderValue(out, "anthropic-ratelimit-unified-status"), "allowed");
  assert.equal(getHeaderValue(out, "anthropic-ratelimit-unified-5h-utilization"), "42");
  assert.equal(getHeaderValue(out, "anthropic-organization-id"), "org-abc123");
  assert.equal(getHeaderValue(out, "retry-after"), "5");
  assert.equal(getHeaderValue(out, "x-request-id"), "req-anthropic-header-policy");
});

test("buildStreamingResponseHeaders forwards anthropic account headers when the flag is explicitly false", () => {
  const out = buildStreamingResponseHeaders(anthropicUpstreamHeaders(), {
    stripAnthropicAccountHeaders: false,
  } satisfies StreamingResponseHeadersMeta);

  assert.equal(getHeaderValue(out, "anthropic-ratelimit-unified-status"), "allowed");
  assert.equal(getHeaderValue(out, "anthropic-organization-id"), "org-abc123");
});

test("buildStreamingResponseHeaders strips only the anthropic account headers when the flag is true", () => {
  const out = buildStreamingResponseHeaders(anthropicUpstreamHeaders(), {
    stripAnthropicAccountHeaders: true,
  } satisfies StreamingResponseHeadersMeta);

  assert.equal(
    getHeaderValue(out, "anthropic-ratelimit-unified-status"),
    undefined,
    "anthropic-ratelimit-unified-status must be stripped when the flag is true"
  );
  assert.equal(
    getHeaderValue(out, "anthropic-ratelimit-unified-5h-utilization"),
    undefined,
    "anthropic-ratelimit-unified-5h-utilization must be stripped when the flag is true"
  );
  assert.equal(
    getHeaderValue(out, "anthropic-organization-id"),
    undefined,
    "anthropic-organization-id must be stripped when the flag is true"
  );

  // Non-anthropic-account headers survive untouched.
  assert.equal(getHeaderValue(out, "retry-after"), "5");
  assert.equal(getHeaderValue(out, "x-request-id"), "req-anthropic-header-policy");
});

import { stripNonStreamingForwardedHeaders } from "@omniroute/open-sse/handlers/chatCore/responseHeaders.ts";

test("stripNonStreamingForwardedHeaders strips anthropic account headers on non-streaming path when mode is strip", () => {
  const headers = anthropicUpstreamHeaders();
  stripNonStreamingForwardedHeaders(headers, { anthropicRateLimitHeaders: "strip" }, "claude");
  assert.equal(headers.get("anthropic-ratelimit-unified-status"), null);
  assert.equal(headers.get("anthropic-organization-id"), null);
  assert.equal(headers.get("retry-after"), "5");
});

test("stripNonStreamingForwardedHeaders forwards anthropic account headers on non-streaming path by default", () => {
  const headers = anthropicUpstreamHeaders();
  stripNonStreamingForwardedHeaders(headers, null, "claude");
  assert.equal(headers.get("anthropic-ratelimit-unified-status"), "allowed");
  assert.equal(headers.get("anthropic-organization-id"), "org-abc123");
});
