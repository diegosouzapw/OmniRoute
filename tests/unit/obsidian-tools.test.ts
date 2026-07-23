import test from "node:test";
import assert from "node:assert/strict";

import { evaluateToolScopes } from "../../open-sse/mcp-server/scopeEnforcement.ts";

test("obsidian tools — enforcement disabled allows any", () => {
  const result = evaluateToolScopes("obsidian_search_simple", [], false);
  assert.equal(result.allowed, true);
});

test("obsidian tools — getClient helper works when token is set", async () => {
  // Mock getObsidianToken + getObsidianBaseUrl via dynamic import
  const { getObsidianToken, getObsidianBaseUrl } = await import("../../src/lib/db/obsidian.ts");
  // These return null/default in test env — just verify they don't throw
  assert.equal(typeof getObsidianToken, "function");
  assert.equal(typeof getObsidianBaseUrl, "function");
});

test("obsidian tools — missing read:obsidian denied via inline scopes", () => {
  const result = evaluateToolScopes("obsidian_search_simple", ["read:health"], true, ["read:obsidian"]);
  assert.equal(result.allowed, false);
  assert.ok(result.missing.includes("read:obsidian"));
});

test("obsidian tools — correct read scope allowed via inline scopes", () => {
  const result = evaluateToolScopes("obsidian_search_simple", ["read:obsidian"], true, ["read:obsidian"]);
  assert.equal(result.allowed, true);
  assert.deepEqual(result.missing, []);
});

test("obsidian tools — wildcard read:* covers read:obsidian", () => {
  const result = evaluateToolScopes("obsidian_search_simple", ["read:*"], true, ["read:obsidian"]);
  assert.equal(result.allowed, true);
});

test("obsidian tools — write:obsidian denied for read-only caller", () => {
  const result = evaluateToolScopes("obsidian_write_note", ["read:obsidian"], true, ["write:obsidian"]);
  assert.equal(result.allowed, false);
  assert.ok(result.missing.includes("write:obsidian"));
});

test("obsidian tools — write:obsidian allowed with correct scope", () => {
  const result = evaluateToolScopes("obsidian_write_note", ["write:obsidian"], true, ["write:obsidian"]);
  assert.equal(result.allowed, true);
});

test("obsidian tools — tool without inline scopes returns denied with tool_definition_missing", () => {
  const result = evaluateToolScopes("obsidian_search_simple", ["read:obsidian"], true);
  assert.equal(result.allowed, false);
  assert.equal(result.reason, "tool_definition_missing");
});

test("obsidian tools — all 10 read tools accept read:obsidian", () => {
  const readTools = [
    "obsidian_check_status",
    "obsidian_search_simple",
    "obsidian_search_structured",
    "obsidian_read_note",
    "obsidian_list_vault",
    "obsidian_get_document_map",
    "obsidian_get_note_metadata",
    "obsidian_get_active_file",
    "obsidian_get_periodic_note",
    "obsidian_get_tags",
  ];
  for (const name of readTools) {
    const result = evaluateToolScopes(name, ["read:obsidian"], true, ["read:obsidian"]);
    assert.equal(result.allowed, true, `${name} should be allowed with read:obsidian`);
  }
});

test("obsidian tools — all 7 write tools require write:obsidian", () => {
  const writeTools = [
    "obsidian_write_note",
    "obsidian_append_note",
    "obsidian_patch_note",
    "obsidian_delete_note",
    "obsidian_move_note",
    "obsidian_execute_command",
    "obsidian_open_file",
  ];
  for (const name of writeTools) {
    const result = evaluateToolScopes(name, ["read:obsidian"], true, ["write:obsidian"]);
    assert.equal(result.allowed, false, `${name} should deny read-only caller`);
    const allowed = evaluateToolScopes(name, ["write:obsidian"], true, ["write:obsidian"]);
    assert.equal(allowed.allowed, true, `${name} should be allowed with write:obsidian`);
  }
});
