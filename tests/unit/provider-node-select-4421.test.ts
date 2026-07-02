import test from "node:test";
import assert from "node:assert/strict";

// #4421: creating a connection with `provider: "openai-compatible-responses"` (the bare
// derived type) returned 404 "OpenAI Compatible node not found" even though a node of
// that type existed — the handler did an exact-id lookup, but node ids carry a UUID
// suffix ("openai-compatible-responses-<uuid>"). selectProviderNodeForConnection now
// also resolves the bare type to the sole matching node.

const { selectProviderNodeForConnection, nodeTypeFromId } = await import(
  "../../src/lib/db/providerNodeSelect.ts"
);

const UUID = "1715ed0f-1111-2222-3333-444455556666";
const UUID2 = "2222aaaa-1111-2222-3333-444455556666";

test("#4421 resolves by exact node id (dashboard path, unchanged)", () => {
  const nodes = [{ id: `openai-compatible-responses-${UUID}`, name: "fox" }];
  const r = selectProviderNodeForConnection(`openai-compatible-responses-${UUID}`, nodes);
  assert.equal(r?.name, "fox");
});

test("#4421 resolves the bare base type to the sole matching node (direct-API path)", () => {
  // Before the fix the handler called getProviderNodeById("openai-compatible-responses")
  // — an exact-id lookup that returned null → 404.
  const nodes = [{ id: `openai-compatible-responses-${UUID}`, name: "fox" }];
  const r = selectProviderNodeForConnection("openai-compatible-responses", nodes);
  assert.equal(r?.name, "fox");
});

test("#4421 returns null when the base type is ambiguous (more than one node)", () => {
  const nodes = [
    { id: `openai-compatible-responses-${UUID}`, name: "a" },
    { id: `openai-compatible-responses-${UUID2}`, name: "b" },
  ];
  assert.equal(selectProviderNodeForConnection("openai-compatible-responses", nodes), null);
});

test("#4421 a base type does not match a more-specific node type", () => {
  // "openai-compatible" (chat) must NOT resolve an "openai-compatible-responses" node.
  const nodes = [{ id: `openai-compatible-responses-${UUID}`, name: "fox" }];
  assert.equal(selectProviderNodeForConnection("openai-compatible", nodes), null);
});

test("#4421 nodeTypeFromId strips a trailing UUID", () => {
  assert.equal(nodeTypeFromId(`openai-compatible-responses-${UUID}`), "openai-compatible-responses");
  assert.equal(nodeTypeFromId(`openai-compatible-${UUID}`), "openai-compatible");
  assert.equal(nodeTypeFromId("no-uuid-here"), "no-uuid-here");
});

test("#4421 returns null when no node matches", () => {
  assert.equal(selectProviderNodeForConnection("anthropic-compatible", []), null);
});
