import assert from "node:assert/strict";
import test from "node:test";

import { evaluateToolScopes } from "../../open-sse/mcp-server/scopeEnforcement.ts";
import { localCorpusTools } from "../../open-sse/mcp-server/tools/localCorpusTools.ts";

test("local corpus exposes only the three read-only tools", () => {
  assert.deepEqual(
    localCorpusTools.map((tool) => tool.name),
    ["local_corpus_status", "local_corpus_search", "local_corpus_read"]
  );
  for (const tool of localCorpusTools) {
    assert.deepEqual(tool.scopes, ["read:local-corpus"]);
  }
});

test("local corpus tools require read:local-corpus when scope enforcement is enabled", () => {
  for (const tool of localCorpusTools) {
    const denied = evaluateToolScopes(tool.name, ["read:health"], true, tool.scopes);
    assert.equal(denied.allowed, false);
    assert.deepEqual(denied.missing, ["read:local-corpus"]);

    const allowed = evaluateToolScopes(tool.name, ["read:local-corpus"], true, tool.scopes);
    assert.equal(allowed.allowed, true);
  }
});

test("local corpus tool schemas reject invalid input", () => {
  const search = localCorpusTools.find((tool) => tool.name === "local_corpus_search");
  const read = localCorpusTools.find((tool) => tool.name === "local_corpus_read");
  assert.ok(search);
  assert.ok(read);
  assert.equal(search.inputSchema.safeParse({ query: "" }).success, false);
  assert.equal(search.inputSchema.safeParse({ query: "water", limit: 21 }).success, false);
  assert.equal(read.inputSchema.safeParse({ relativePath: "" }).success, false);
  assert.equal(
    read.inputSchema.safeParse({ relativePath: "notes.md", startLine: 0 }).success,
    false
  );
});
