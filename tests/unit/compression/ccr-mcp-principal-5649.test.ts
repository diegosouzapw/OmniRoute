/**
 * #5649 — CCR MCP retrieve principal resolution.
 *
 * CCR stores blocks keyed by `String(apiKeyInfo.id)` at compression time. The MCP
 * `omniroute_ccr_retrieve` tool used to resolve the caller via `extra.authInfo.clientId`
 * (never populated for API-key auth) → "anonymous" → a store-key miss ("block not
 * found"). The fix resolves the caller's API-key id from the auth headers via the SAME
 * `getApiKeyMetadata` lookup, so retrieval matches storage — without weakening
 * cross-tenant IDOR isolation.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  resolvePrincipalFromHeaders,
  resolveMcpCallerApiKeyId,
} from "../../../open-sse/mcp-server/mcpCallerIdentity.ts";
import {
  storeBlock,
  retrieveBlock,
  handleCcrRetrieve,
  resetCcrStore,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";

// A fake key→metadata lookup: maps a raw key to a DB-row id, exactly like getApiKeyMetadata.
const fakeLookup = (map: Record<string, string>) => async (rawKey: string) =>
  map[rawKey] ? { id: map[rawKey] } : null;

test("#5649 resolves a Bearer API key to its principal id (not anonymous)", async () => {
  const id = await resolvePrincipalFromHeaders(
    { Authorization: "Bearer sk-tenant-A" },
    fakeLookup({ "sk-tenant-A": "42" })
  );
  assert.equal(
    id,
    "42",
    "a valid Bearer key must resolve to its api-key id, not undefined/anonymous"
  );
});

test("#5649 resolves x-api-key (with anthropic-version gate) to its principal id", async () => {
  const id = await resolvePrincipalFromHeaders(
    { "x-api-key": "sk-anthropic", "anthropic-version": "2023-06-01" },
    fakeLookup({ "sk-anthropic": "99" })
  );
  assert.equal(id, "99");
});

test("#5649 distinct keys resolve to distinct principals (IDOR isolation preserved)", async () => {
  const lookup = fakeLookup({ "sk-A": "42", "sk-B": "77" });
  const a = await resolvePrincipalFromHeaders({ Authorization: "Bearer sk-A" }, lookup);
  const b = await resolvePrincipalFromHeaders({ Authorization: "Bearer sk-B" }, lookup);
  assert.equal(a, "42");
  assert.equal(b, "77");
  assert.notEqual(a, b);
});

test("#5649 no auth headers → undefined (never calls the lookup)", async () => {
  let called = false;
  const id = await resolvePrincipalFromHeaders({}, async () => {
    called = true;
    return { id: "x" };
  });
  assert.equal(id, undefined);
  assert.equal(called, false, "must not hit the DB when there is no key");
});

test("#5649 unknown / unresolvable key → undefined (fail closed to anonymous bucket)", async () => {
  const id = await resolvePrincipalFromHeaders(
    { Authorization: "Bearer sk-unknown" },
    fakeLookup({ "sk-A": "42" })
  );
  assert.equal(id, undefined);
});

test("#5649 end-to-end: a block stored under the api-key id is retrievable by the resolved principal, not by another tenant", async () => {
  resetCcrStore();
  const lookup = fakeLookup({ "sk-A": "42", "sk-B": "77" });
  const bigText = "confidential block for tenant 42 ".repeat(40);

  // Storage side (mirrors chatCore: principal = String(apiKeyInfo.id)).
  const hash = storeBlock(bigText, "42");

  // Retrieval side: resolve the SAME key's headers → "42" → block found.
  const owner = await resolvePrincipalFromHeaders({ Authorization: "Bearer sk-A" }, lookup);
  assert.equal(owner, "42");
  assert.equal(retrieveBlock(hash, owner), bigText, "owner key must retrieve its own block");
  const ownerResult = handleCcrRetrieve({ hash }, owner);
  assert.ok("content" in ownerResult, "owner retrieve returns content");

  // A different tenant's key resolves to a different principal → blocked.
  const other = await resolvePrincipalFromHeaders({ Authorization: "Bearer sk-B" }, lookup);
  assert.equal(other, "77");
  assert.equal(
    retrieveBlock(hash, other),
    null,
    "[HIGH IDOR] other tenant must not retrieve the block"
  );
  const otherResult = handleCcrRetrieve({ hash }, other);
  assert.ok("error" in otherResult, "[HIGH IDOR] cross-tenant retrieve returns error");
});

// ─── env-var fallback (stdio transport, #7883) ─────────────────────────

test("#7883 resolveMcpCallerApiKeyId returns undefined when both headers and env var are absent", async () => {
  const prev = process.env.OMNIROUTE_API_KEY;
  delete process.env.OMNIROUTE_API_KEY;
  try {
    const result = await resolveMcpCallerApiKeyId();
    assert.equal(result, undefined);
  } finally {
    if (prev) process.env.OMNIROUTE_API_KEY = prev;
  }
});

test("#7883 resolveMcpCallerApiKeyId env-var fallback executes without throwing", async () => {
  const prev = process.env.OMNIROUTE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "sk-test-env-key";
  try {
    // Will return undefined because sk-test-env-key isn't a real DB key,
    // but proves the env var codepath runs without error
    const result = await resolveMcpCallerApiKeyId();
    assert.ok(result === undefined || typeof result === "string");
  } finally {
    if (prev) process.env.OMNIROUTE_API_KEY = prev;
    else delete process.env.OMNIROUTE_API_KEY;
  }
});
