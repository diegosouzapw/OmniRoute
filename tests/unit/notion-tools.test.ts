import test from "node:test";
import assert from "node:assert/strict";

import { evaluateToolScopes } from "../../open-sse/mcp-server/scopeEnforcement.ts";

test("notion tools — enforcement disabled allows any", () => {
  const result = evaluateToolScopes("notion_search", [], false);
  assert.equal(result.allowed, true);
});

test("notion tools — missing read:notion denied via inline scopes", () => {
  const result = evaluateToolScopes("notion_search", ["read:health"], true, ["read:notion"]);
  assert.equal(result.allowed, false);
  assert.ok(result.missing.includes("read:notion"));
});

test("notion tools — correct read scope allowed via inline scopes", () => {
  const result = evaluateToolScopes("notion_search", ["read:notion"], true, ["read:notion"]);
  assert.equal(result.allowed, true);
  assert.deepEqual(result.missing, []);
});

test("notion tools — wildcard read:* covers read:notion", () => {
  const result = evaluateToolScopes("notion_search", ["read:*"], true, ["read:notion"]);
  assert.equal(result.allowed, true);
});

test("notion tools — write:notion denied for read-only caller", () => {
  const result = evaluateToolScopes("notion_append_blocks", ["read:notion"], true, ["write:notion"]);
  assert.equal(result.allowed, false);
  assert.ok(result.missing.includes("write:notion"));
});

test("notion tools — write:notion allowed with correct scope", () => {
  const result = evaluateToolScopes("notion_append_blocks", ["write:notion"], true, ["write:notion"]);
  assert.equal(result.allowed, true);
});

test("notion tools — tool without inline scopes returns denied with tool_definition_missing", () => {
  // Without inline scopes, a tool not in MCP_TOOL_MAP is treated as missing.
  const result = evaluateToolScopes("notion_search", ["read:notion"], true);
  assert.equal(result.allowed, false);
  assert.equal(result.reason, "tool_definition_missing");
});

test("notion tools — inline scopes parameter missing scope denied", () => {
  const result = evaluateToolScopes("notion_search", ["read:health"], true, ["read:notion"]);
  assert.equal(result.allowed, false);
});

test("notion tools — each read tool validates independently", () => {
  for (const name of ["notion_search", "notion_get_page", "notion_list_block_children", "notion_query_database", "notion_get_database"]) {
    const result = evaluateToolScopes(name, ["read:notion"], true, ["read:notion"]);
    assert.equal(result.allowed, true, `${name} should be allowed with read:notion`);
  }
});

test("notion tools — append_blocks requires write scope", () => {
  const result = evaluateToolScopes("notion_append_blocks", ["read:notion"], true, ["write:notion"]);
  assert.equal(result.allowed, false);
});
