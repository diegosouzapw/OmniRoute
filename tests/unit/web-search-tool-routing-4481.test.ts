import test from "node:test";
import assert from "node:assert/strict";

// #4481 layer 2 — CCR-style `Router.webSearch`. When a request carries a NATIVE
// web-search server tool (`web_search`, `web_search_preview`, or Anthropic's versioned
// `web_search_20250305`) and an operator configured `webSearchRouteModel`, route the
// whole request to that model instead of the default — so a provider that doesn't
// implement the server tool (e.g. MiniMax) isn't asked to run a tool it 400s on.
// Pure helpers, no DB.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  hasNativeWebSearchTool,
  resolveWebSearchRouteOverride,
} from "../../open-sse/services/webSearchRouting.ts";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// ── Wiring source-guard (RED on base: chat.ts doesn't call the router yet) ─

test("chat.ts wires the web-search router at the request entrypoint", () => {
  const chat = readFileSync(join(REPO_ROOT, "src/sse/handlers/chat.ts"), "utf8");
  assert.match(chat, /from "@omniroute\/open-sse\/services\/webSearchRouting\.ts"/);
  assert.match(chat, /hasNativeWebSearchTool\(body\)/);
  assert.match(chat, /resolveWebSearchRouteOverride\(/);
});

test("webSearchRouteModel is registered in the settings Zod schema", () => {
  const schema = readFileSync(join(REPO_ROOT, "src/shared/validation/settingsSchemas.ts"), "utf8");
  assert.match(schema, /webSearchRouteModel:\s*z\.string\(\)/);
});

// ── hasNativeWebSearchTool ───────────────────────────────────────────────

test("detects the plain and preview native web-search tool types", () => {
  assert.equal(hasNativeWebSearchTool({ tools: [{ type: "web_search" }] }), true);
  assert.equal(hasNativeWebSearchTool({ tools: [{ type: "web_search_preview" }] }), true);
});

test("detects Anthropic's versioned web_search_20250305 (and future dated names)", () => {
  assert.equal(
    hasNativeWebSearchTool({ tools: [{ type: "web_search_20250305", name: "web_search" }] }),
    true
  );
  assert.equal(hasNativeWebSearchTool({ tools: [{ type: "web_search_20251201" }] }), true);
});

test("detects a native web-search tool anywhere in a mixed tools array", () => {
  assert.equal(
    hasNativeWebSearchTool({
      tools: [{ type: "function", function: { name: "x" } }, { type: "web_search_20250305" }],
    }),
    true
  );
});

test("ignores a custom FUNCTION tool merely named web_search (has a function field)", () => {
  assert.equal(
    hasNativeWebSearchTool({
      tools: [{ type: "function", function: { name: "web_search", parameters: {} } }],
    }),
    false
  );
  // A bare web_search type WITH a function field is also not the native server tool.
  assert.equal(
    hasNativeWebSearchTool({ tools: [{ type: "web_search", function: { name: "x" } }] }),
    false
  );
});

test("returns false for no tools / non-web-search tools / malformed input", () => {
  assert.equal(hasNativeWebSearchTool({ tools: [] }), false);
  assert.equal(hasNativeWebSearchTool({ tools: [{ type: "code_interpreter" }] }), false);
  assert.equal(hasNativeWebSearchTool({}), false);
  assert.equal(hasNativeWebSearchTool({ tools: "nope" }), false);
  assert.equal(hasNativeWebSearchTool(null), false);
  assert.equal(hasNativeWebSearchTool(undefined), false);
});

// ── resolveWebSearchRouteOverride ────────────────────────────────────────

const bodyWithSearch = { tools: [{ type: "web_search_20250305", name: "web_search" }] };

test("routes to the configured model when a native web-search tool is present", () => {
  const r = resolveWebSearchRouteOverride("minimax,MiniMax-M3", bodyWithSearch, {
    webSearchRouteModel: "openrouter,anthropic/claude-3.5-sonnet",
  });
  assert.deepEqual(r, { wasRouted: true, model: "openrouter,anthropic/claude-3.5-sonnet" });
});

test("does NOT route when the request has no native web-search tool", () => {
  const r = resolveWebSearchRouteOverride("minimax,MiniMax-M3", { tools: [{ type: "function" }] }, {
    webSearchRouteModel: "openrouter,anthropic/claude-3.5-sonnet",
  });
  assert.deepEqual(r, { wasRouted: false, model: "minimax,MiniMax-M3" });
});

test("does NOT route when no route model is configured (or it is blank)", () => {
  assert.deepEqual(resolveWebSearchRouteOverride("minimax,MiniMax-M3", bodyWithSearch, {}), {
    wasRouted: false,
    model: "minimax,MiniMax-M3",
  });
  assert.deepEqual(
    resolveWebSearchRouteOverride("minimax,MiniMax-M3", bodyWithSearch, {
      webSearchRouteModel: "   ",
    }),
    { wasRouted: false, model: "minimax,MiniMax-M3" }
  );
});

test("does NOT route (no-op) when the configured model equals the current model", () => {
  const r = resolveWebSearchRouteOverride("openrouter,claude", bodyWithSearch, {
    webSearchRouteModel: "  openrouter,claude  ",
  });
  assert.deepEqual(r, { wasRouted: false, model: "openrouter,claude" });
});

test("trims the configured route model", () => {
  const r = resolveWebSearchRouteOverride("minimax,M3", bodyWithSearch, {
    webSearchRouteModel: "  anthropic/claude-opus-4-8  ",
  });
  assert.deepEqual(r, { wasRouted: true, model: "anthropic/claude-opus-4-8" });
});

test("ignores a non-string route config", () => {
  const r = resolveWebSearchRouteOverride("minimax,M3", bodyWithSearch, {
    webSearchRouteModel: 123 as unknown as string,
  });
  assert.deepEqual(r, { wasRouted: false, model: "minimax,M3" });
});
