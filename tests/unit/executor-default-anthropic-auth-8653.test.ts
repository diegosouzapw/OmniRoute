/**
 * Regression tests for #8653: Claude Code 2.1.220 returns 401 Missing API key
 *
 * Root cause: DefaultExecutor.buildHeaders for the built-in `claude`/`anthropic`
 * providers emitted `Authorization: Bearer null` when the connection has an
 * empty apiKey and no accessToken, and for `anthropic-compatible-*` nodes omitted
 * the auth header entirely — both get forwarded to the upstream, producing the
 * relayed "401 Missing API key" error.
 *
 * Fix: Guard against falsy credentials (no garbage headers), and extend the
 * 9router b977bf74 dual-header fix (Bearer alongside x-api-key) to the built-in
 * `claude`/`anthropic` providers for non-official baseUrls.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// ── claude / anthropic — empty credentials guard ─────────────────────────

test("claude provider with empty apiKey and no accessToken does NOT emit Authorization header", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders(
    { apiKey: "", providerSpecificData: {} } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  // Must not emit 'Bearer null' / 'Bearer undefined'
  assert.equal(headers["Authorization"], undefined);
  assert.equal(headers["x-api-key"], undefined);
});

test("anthropic provider with empty apiKey and no accessToken does NOT emit Authorization header", () => {
  const executor = new DefaultExecutor("anthropic");
  const headers = executor.buildHeaders(
    { apiKey: "", providerSpecificData: {} } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["Authorization"], undefined);
  assert.equal(headers["x-api-key"], undefined);
});

test("claude provider with both apiKey and accessToken as null/undefined does NOT emit Bearer null", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders(
    { providerSpecificData: {} } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["Authorization"], undefined);
  assert.equal(headers["x-api-key"], undefined);
});

// ── claude / anthropic — dual-header parity (9router b977bf74) ──────────

test("claude provider with non-official baseUrl sends BOTH x-api-key and Authorization: Bearer", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders(
    {
      apiKey: "k-third-party",
      providerSpecificData: { baseUrl: "https://gateway.example/v1" },
    } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "k-third-party");
  assert.equal(
    headers["Authorization"],
    "Bearer k-third-party",
    "third-party claude upstream needs the Bearer fallback alongside x-api-key"
  );
});

test("anthropic provider with non-official baseUrl sends BOTH x-api-key and Authorization: Bearer", () => {
  const executor = new DefaultExecutor("anthropic");
  const headers = executor.buildHeaders(
    {
      apiKey: "k-third-party",
      providerSpecificData: { baseUrl: "https://anthropic-proxy.example/v1" },
    } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "k-third-party");
  assert.equal(
    headers["Authorization"],
    "Bearer k-third-party",
    "third-party anthropic upstream needs the Bearer fallback alongside x-api-key"
  );
});

// ── claude / anthropic — official api.anthropic.com stays x-api-key-only ─

test("claude provider with official api.anthropic.com baseUrl: x-api-key only, no Bearer", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders(
    {
      apiKey: "k-official",
      providerSpecificData: { baseUrl: "https://api.anthropic.com/v1" },
    } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "k-official");
  assert.equal(
    headers["Authorization"],
    undefined,
    "official api.anthropic.com must NOT receive a Bearer header alongside x-api-key"
  );
});

test("anthropic provider with official api.anthropic.com baseUrl: x-api-key only, no Bearer", () => {
  const executor = new DefaultExecutor("anthropic");
  const headers = executor.buildHeaders(
    {
      apiKey: "k-official",
      providerSpecificData: { baseUrl: "https://api.anthropic.com/v1" },
    } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "k-official");
  assert.equal(headers["Authorization"], undefined);
});

test("claude provider with empty baseUrl (defaults to official): x-api-key only, no Bearer", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders(
    { apiKey: "k-empty", providerSpecificData: {} } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "k-empty");
  assert.equal(headers["Authorization"], undefined);
});

// ── claude OAuth (accessToken-only) keeps Authorization: Bearer ──────────

test("claude provider with accessToken-only (OAuth mode): Authorization Bearer, no x-api-key", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders(
    { accessToken: "oauth-token", providerSpecificData: {} } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["Authorization"], "Bearer oauth-token");
  assert.equal(headers["x-api-key"], undefined);
});

test("anthropic provider with accessToken-only (OAuth mode): Authorization Bearer, no x-api-key", () => {
  const executor = new DefaultExecutor("anthropic");
  const headers = executor.buildHeaders(
    { accessToken: "oauth-token", providerSpecificData: {} } as Record<string, unknown>,
    true
  ) as Record<string, string>;
  assert.equal(headers["Authorization"], "Bearer oauth-token");
  assert.equal(headers["x-api-key"], undefined);
});

// ── existing behavior preserved ─────────────────────────────────────────

test("claude provider with apiKey on default baseUrl: x-api-key only, respects existing behavior", () => {
  const executor = new DefaultExecutor("claude");
  const headers = executor.buildHeaders({ apiKey: "claude-key" } as Record<string, unknown>, true) as Record<string, string>;
  assert.equal(headers["x-api-key"], "claude-key");
  assert.equal(headers["Authorization"], undefined);
});
