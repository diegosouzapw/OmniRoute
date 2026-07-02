import test from "node:test";
import assert from "node:assert/strict";

import {
  getToolName,
  getToolSource,
  summarizeToolSources,
} from "../../open-sse/utils/toolSources.ts";

test("getToolName resolves across OpenAI / Claude / hosted shapes", () => {
  assert.equal(getToolName({ name: "search" }), "search");
  assert.equal(getToolName({ function: { name: "fn_call" } }), "fn_call");
  assert.equal(getToolName({ type: "web_search" }), "web_search");
  assert.equal(getToolName({}), "unknown");
  assert.equal(getToolName(null), "unknown");
  assert.equal(getToolName(undefined), "unknown");
  // top-level name wins over nested/type
  assert.equal(getToolName({ name: "top", function: { name: "nested" }, type: "x" }), "top");
});

test("getToolSource classifies MCP / hosted / client tools", () => {
  assert.equal(getToolSource("mcp__notion__create_page"), "mcp:notion");
  assert.equal(getToolSource("mcp__"), "mcp");
  assert.equal(getToolSource("web_search"), "hosted:web");
  assert.equal(getToolSource("web_fetch_url"), "hosted:web");
  assert.equal(getToolSource("computer_use"), "hosted:computer");
  assert.equal(getToolSource("str_replace_editor"), "hosted:computer");
  assert.equal(getToolSource("get_weather"), "client");
});

test("summarizeToolSources returns null for empty / non-array input", () => {
  assert.equal(summarizeToolSources(null), null);
  assert.equal(summarizeToolSources(undefined), null);
  assert.equal(summarizeToolSources([]), null);
  assert.equal(summarizeToolSources("nope"), null);
});

test("summarizeToolSources counts tools and groups by source", () => {
  const summary = summarizeToolSources([
    { name: "mcp__notion__create_page" },
    { name: "mcp__notion__search" },
    { type: "web_search" },
    { function: { name: "get_weather" } },
  ]);
  assert.ok(summary);
  assert.match(summary as string, /^4 tools \|/);
  assert.match(summary as string, /mcp:notion=2/);
  assert.match(summary as string, /hosted:web=1/);
  assert.match(summary as string, /client=1/);
  assert.match(summary as string, /names: mcp__notion__create_page, mcp__notion__search/);
});

test("summarizeToolSources truncates names beyond 80 and reports overflow", () => {
  const tools = Array.from({ length: 85 }, (_, i) => ({ name: `tool_${i}` }));
  const summary = summarizeToolSources(tools) as string;
  assert.match(summary, /^85 tools \|/);
  assert.match(summary, /client=85/);
  assert.match(summary, /\.\.\. \+5 more$/);
  // only the first 80 names should appear before the overflow marker
  assert.ok(summary.includes("tool_79"));
  assert.ok(!summary.includes("tool_80,"));
});
