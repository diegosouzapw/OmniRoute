import test from "node:test";
import assert from "node:assert/strict";

const {
  resolveModelAlias,
  getDeprecationNotice,
  isDeprecated,
  setCustomAliases,
  getCustomAliases,
  addCustomAlias,
  removeCustomAlias,
  getAllAliases,
  getBuiltInAliases,
} = await import("../../open-sse/services/modelDeprecation.ts");

// ─── resolveModelAlias ──────────────────────────────────────────────────────

test("resolveModelAlias: returns original for non-deprecated model", () => {
  assert.equal(resolveModelAlias("claude-opus-4-6"), "claude-opus-4-6");
});

test("resolveModelAlias: resolves deprecated Gemini model", () => {
  assert.equal(resolveModelAlias("gemini-pro"), "gemini-2.5-pro");
  assert.equal(resolveModelAlias("gemini-1.5-pro"), "gemini-2.5-pro");
  assert.equal(resolveModelAlias("gemini-1.5-flash"), "gemini-2.5-flash");
});

test("resolveModelAlias: resolves deprecated Claude model", () => {
  assert.equal(resolveModelAlias("claude-3-opus-20240229"), "claude-opus-4-20250514");
  assert.equal(resolveModelAlias("claude-3-5-sonnet-latest"), "claude-sonnet-4-20250514");
});

test("resolveModelAlias: resolves deprecated OpenAI model", () => {
  assert.equal(resolveModelAlias("gpt-4-turbo-preview"), "gpt-4-turbo");
  assert.equal(resolveModelAlias("gpt-3.5-turbo-0125"), "gpt-3.5-turbo");
});

test("resolveModelAlias: handles null/empty", () => {
  assert.equal(resolveModelAlias(""), "");
  assert.equal(resolveModelAlias(null), null);
  assert.equal(resolveModelAlias(undefined), undefined);
});

// ─── getDeprecationNotice ───────────────────────────────────────────────────

test("getDeprecationNotice: returns message for deprecated model", () => {
  const notice = getDeprecationNotice("gemini-pro");
  assert.ok(notice);
  assert.ok(notice.includes("deprecated"));
  assert.ok(notice.includes("gemini-2.5-pro"));
});

test("getDeprecationNotice: returns null for non-deprecated model", () => {
  assert.equal(getDeprecationNotice("claude-opus-4-6"), null);
});

test("getDeprecationNotice: returns null for empty/null", () => {
  assert.equal(getDeprecationNotice(""), null);
  assert.equal(getDeprecationNotice(null), null);
});

// ─── isDeprecated ───────────────────────────────────────────────────────────

test("isDeprecated: true for deprecated model", () => {
  assert.equal(isDeprecated("gemini-pro"), true);
});

test("isDeprecated: false for current model", () => {
  assert.equal(isDeprecated("claude-opus-4-6"), false);
});

// ─── Custom Aliases ─────────────────────────────────────────────────────────

test("custom aliases override built-in", () => {
  setCustomAliases({ "gemini-pro": "gemini-3.1-pro" });
  assert.equal(resolveModelAlias("gemini-pro"), "gemini-3.1-pro"); // custom wins
  setCustomAliases({}); // reset
});

test("addCustomAlias and removeCustomAlias", () => {
  addCustomAlias("my-old-model", "my-new-model");
  assert.equal(resolveModelAlias("my-old-model"), "my-new-model");

  const removed = removeCustomAlias("my-old-model");
  assert.equal(removed, true);
  assert.equal(resolveModelAlias("my-old-model"), "my-old-model");
});

test("removeCustomAlias: returns false for non-existent", () => {
  assert.equal(removeCustomAlias("nonexistent"), false);
});

test("getAllAliases: includes both built-in and custom", () => {
  addCustomAlias("test-from", "test-to");
  const all = getAllAliases();
  assert.ok(all["gemini-pro"]); // built-in
  assert.equal(all["test-from"], "test-to"); // custom
  removeCustomAlias("test-from"); // cleanup
});

test("getBuiltInAliases: returns built-in aliases", () => {
  const builtIn = getBuiltInAliases();
  assert.ok(builtIn["gemini-pro"]);
  assert.ok(builtIn["claude-3-opus-20240229"]);
});
