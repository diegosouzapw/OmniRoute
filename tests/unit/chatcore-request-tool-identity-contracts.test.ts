import assert from "node:assert/strict";
import test from "node:test";

import { toToolNameAliasMap } from "../../open-sse/handlers/chatCore/requestToolIdentity.ts";

test("copies a string-valued request tool alias ledger", () => {
  const source = new Map<string, unknown>([["lowercase_tool", "OriginalTool"]]);

  const aliases = toToolNameAliasMap(source);

  assert.deepEqual(aliases, new Map([["lowercase_tool", "OriginalTool"]]));
  assert.notEqual(aliases, source);
});

test("does not reinterpret namespace identities as response aliases", () => {
  const identities = new Map<string, unknown>([
    ["mcp__files__read", { namespace: "mcp__files", name: "read" }],
  ]);

  assert.equal(toToolNameAliasMap(identities), null);
});

test("rejects mixed alias and identity ledgers", () => {
  const mixed = new Map<string, unknown>([
    ["plain", "PlainTool"],
    ["mcp__files__read", { namespace: "mcp__files", name: "read" }],
  ]);

  assert.equal(toToolNameAliasMap(mixed), null);
});
