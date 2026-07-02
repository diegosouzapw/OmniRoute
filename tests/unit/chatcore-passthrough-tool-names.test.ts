import test from "node:test";
import assert from "node:assert/strict";

import {
  buildClaudePassthroughToolNameMap,
  restoreClaudePassthroughToolNames,
  mergeResponseToolNameMap,
} from "../../open-sse/handlers/chatCore/passthroughToolNames.ts";
import { CLAUDE_OAUTH_TOOL_PREFIX } from "../../open-sse/translator/request/openai-to-claude.ts";

test("buildClaudePassthroughToolNameMap maps prefixed -> original names", () => {
  const map = buildClaudePassthroughToolNameMap({
    tools: [{ type: "function", function: { name: "get_weather" } }],
  });
  assert.ok(map);
  assert.equal(map?.get(`${CLAUDE_OAUTH_TOOL_PREFIX}get_weather`), "get_weather");
  assert.equal(buildClaudePassthroughToolNameMap({ tools: [] }), null);
  assert.equal(buildClaudePassthroughToolNameMap(null), null);
});

test("restoreClaudePassthroughToolNames rewrites tool_use block names", () => {
  const map = new Map([[`${CLAUDE_OAUTH_TOOL_PREFIX}x`, "x"]]);
  const restored = restoreClaudePassthroughToolNames(
    { content: [{ type: "tool_use", name: `${CLAUDE_OAUTH_TOOL_PREFIX}x` }] },
    map
  ) as { content: { name: string }[] };
  assert.equal(restored.content[0].name, "x");
  const body = { content: [{ type: "tool_use", name: "y" }] };
  assert.equal(restoreClaudePassthroughToolNames(body, null), body);
});

test("mergeResponseToolNameMap unions base with executor _toolNameMap", () => {
  const base = new Map([["a", "1"]]);
  const merged = mergeResponseToolNameMap(base, { _toolNameMap: new Map([["b", "2"]]) }) as Map<
    string,
    string
  >;
  assert.equal(merged.get("a"), "1");
  assert.equal(merged.get("b"), "2");
  assert.equal(mergeResponseToolNameMap(base, {}), base);
});
