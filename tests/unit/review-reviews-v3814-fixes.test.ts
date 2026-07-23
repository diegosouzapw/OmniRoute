/**
 * Regression guards for the /review-reviews battery findings (v3.8.14).
 * Each test maps to a LEDGER-* item from the consolidated review.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-review-reviews-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createProviderNodeSchema } = await import("../../src/shared/validation/schemas.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── LEDGER-1: updateProviderNode must preserve custom headers on partial update ──
test("LEDGER-1: updateProviderNode preserves customHeaders when the field is omitted", async () => {
  const created = await providersDb.createProviderNode({
    type: "openai-compatible",
    name: "node-a",
    prefix: "nodea",
    apiType: "chat",
    baseUrl: "https://proxy.example.com/v1",
    customHeaders: { "X-Tenant": "acme", "X-Env": "prod" },
  });
  // Partial update that does NOT resend customHeaders (only renames the node).
  const updated = await providersDb.updateProviderNode(created.id as string, { name: "node-a2" });
  assert.deepEqual(
    updated?.customHeaders,
    { "X-Tenant": "acme", "X-Env": "prod" },
    "omitting customHeaders on update must NOT wipe stored headers"
  );
  // And reading it back confirms persistence.
  const fetched = await providersDb.getProviderNodeById(created.id as string);
  assert.deepEqual(fetched?.customHeaders, { "X-Tenant": "acme", "X-Env": "prod" });
});

test("LEDGER-1: updateProviderNode still clears headers when explicitly set to null", async () => {
  const created = await providersDb.createProviderNode({
    type: "openai-compatible",
    name: "node-b",
    prefix: "nodeb",
    apiType: "chat",
    baseUrl: "https://proxy.example.com/v1",
    customHeaders: { "X-Tenant": "acme" },
  });
  const updated = await providersDb.updateProviderNode(created.id as string, {
    customHeaders: null,
  });
  assert.equal(updated?.customHeaders, null, "explicit null must clear headers");
});

// ── LEDGER-2 / LEDGER-3: schema reuses canonical guards + rejects auth headers ──
test("LEDGER-2: customHeaders rejects CRLF / control-char values", () => {
  const bad = createProviderNodeSchema.safeParse({
    type: "openai-compatible",
    name: "n",
    prefix: "n",
    apiType: "chat",
    baseUrl: "https://x/v1",
    customHeaders: { "X-Inject": "foo\r\nX-Evil: bar" },
  });
  assert.equal(bad.success, false, "CRLF in a header value must be rejected at the schema");
});

test("LEDGER-2: customHeaders rejects control-char / whitespace / ':' in names", () => {
  for (const badName of ["X Bad", "X:Bad", "X\r\nBad"]) {
    const res = createProviderNodeSchema.safeParse({
      type: "openai-compatible",
      name: "n",
      prefix: "n",
      apiType: "chat",
      baseUrl: "https://x/v1",
      customHeaders: { [badName]: "v" },
    });
    assert.equal(res.success, false, `header name "${badName}" must be rejected`);
  }
});

test("LEDGER-2: customHeaders rejects more than 16 entries", () => {
  const many: Record<string, string> = {};
  for (let i = 0; i < 17; i++) many[`X-H${i}`] = "v";
  const res = createProviderNodeSchema.safeParse({
    type: "openai-compatible",
    name: "n",
    prefix: "n",
    apiType: "chat",
    baseUrl: "https://x/v1",
    customHeaders: many,
  });
  assert.equal(res.success, false, "more than 16 custom headers must be rejected");
});

test("LEDGER-3: customHeaders rejects auth header names at the schema boundary", () => {
  for (const authName of ["Authorization", "x-api-key", "X-Goog-Api-Key", "api-key"]) {
    const res = createProviderNodeSchema.safeParse({
      type: "openai-compatible",
      name: "n",
      prefix: "n",
      apiType: "chat",
      baseUrl: "https://x/v1",
      customHeaders: { [authName]: "Bearer x" },
    });
    assert.equal(res.success, false, `auth header "${authName}" must be rejected (no silent drop)`);
  }
});

test("LEDGER-2: valid custom headers still pass", () => {
  const res = createProviderNodeSchema.safeParse({
    type: "openai-compatible",
    name: "n",
    prefix: "n",
    apiType: "chat",
    baseUrl: "https://x/v1",
    customHeaders: { "X-Tenant": "acme", "X-Trace-Id": "abc-123" },
  });
  assert.equal(res.success, true, res.success ? "" : JSON.stringify(res.error?.issues));
});

// ── LEDGER-4: every minimax-m3 registry entry is flagged multimodal ──
test("LEDGER-4: all minimax-m3 registry entries set supportsVision (matches lite.ts)", () => {
  const entries: { id: string; supportsVision?: boolean }[] = [];
  for (const provider of Object.values(
    REGISTRY as Record<string, { models?: { id: string; supportsVision?: boolean }[] }>
  )) {
    for (const m of provider.models || []) {
      if (/minimax-m3/i.test(m.id)) entries.push(m);
    }
  }
  assert.ok(entries.length >= 6, `expected several minimax-m3 entries, got ${entries.length}`);
  const unflagged = entries.filter((m) => m.supportsVision !== true).map((m) => m.id);
  assert.deepEqual(
    unflagged,
    [],
    `these minimax-m3 entries miss supportsVision: ${unflagged.join(", ")}`
  );
});

// ── LEDGER-5: anthropic-compatible-cc-* nodes honor custom headers ──
test("LEDGER-5: custom headers reach the wire for anthropic-compatible-cc-* nodes", () => {
  const executor = new DefaultExecutor("anthropic-compatible-cc-test");
  const headers = executor.buildHeaders(
    {
      accessToken: "tok",
      providerSpecificData: { customHeaders: { "X-CC-Custom": "yes" } },
    },
    false
  ) as Record<string, string>;
  assert.equal(headers["X-CC-Custom"], "yes", "CC node must apply operator custom headers");
});

// ── LEDGER-10: case-insensitive override — no duplicate Content-Type/Accept ──
test("LEDGER-10: a custom content-type overrides (not duplicates) the executor's Content-Type", () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  const headers = executor.buildHeaders(
    {
      apiKey: "k",
      providerSpecificData: {
        baseUrl: "https://x/v1",
        customHeaders: { "content-type": "application/custom" },
      },
    },
    false
  ) as Record<string, string>;
  const ctKeys = Object.keys(headers).filter((k) => k.toLowerCase() === "content-type");
  assert.equal(
    ctKeys.length,
    1,
    `exactly one content-type header expected, got ${ctKeys.join(", ")}`
  );
  assert.equal(headers[ctKeys[0]], "application/custom");
});

test("LEDGER-3: executor still drops auth/forbidden custom headers (defense-in-depth)", () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  const headers = executor.buildHeaders(
    {
      apiKey: "real-key",
      providerSpecificData: {
        baseUrl: "https://x/v1",
        customHeaders: { Authorization: "Bearer evil", Host: "evil.example", "X-Ok": "ok" },
      },
    },
    false
  ) as Record<string, string>;
  assert.equal(headers["X-Ok"], "ok");
  assert.notEqual(
    headers["Authorization"],
    "Bearer evil",
    "auth must not be overridden by a custom header"
  );
  assert.ok(!Object.keys(headers).some((k) => k.toLowerCase() === "host"));
});

// ── LEDGER-9: rowToCamel normalizes a NULL _json column to the base key ──
test("LEDGER-9: rowToCamel surfaces a NULL _json column under the base key as null", () => {
  const row = { id: "x", custom_headers_json: null, name: "n" };
  const camel = core.rowToCamel(row);
  assert.equal(camel?.customHeaders, null, "NULL _json column should be customHeaders: null");
  assert.ok(
    !("customHeadersJson" in (camel as object)),
    "the suffixed key must not leak on the null path"
  );
});

// ── LEDGER-11: a node created on a fresh DB round-trips the custom_headers_json column ──
test("LEDGER-11: fresh-DB migration leaves provider_nodes.custom_headers_json usable", async () => {
  const created = await providersDb.createProviderNode({
    type: "openai-compatible",
    name: "fresh",
    prefix: "fresh",
    apiType: "chat",
    baseUrl: "https://x/v1",
    customHeaders: { "X-A": "1" },
  });
  const fetched = await providersDb.getProviderNodeById(created.id as string);
  assert.deepEqual(fetched?.customHeaders, { "X-A": "1" });
});
