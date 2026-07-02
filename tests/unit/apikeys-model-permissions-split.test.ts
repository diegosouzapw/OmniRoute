// Characterization of the db/apiKeys.ts model-permission split (god-file decomposition): the pure
// permission-matching logic (Claude-Code alias/prefix resolution + wildcard/glob matching) moved into
// db/apiKeys/modelPermissions.ts. Behavior-preserving move — these functions decide whether a model is
// allowed for a key, so the locks here exercise the wildcard semantics directly. The DB-backed
// isModelAllowedForKey flow stays covered by api-key-policy / combo-provider-wildcard.
import { test } from "node:test";
import assert from "node:assert/strict";

const M = await import("../../src/lib/db/apiKeys/modelPermissions.ts");

test("module exposes the matching helpers + Claude-Code alias sets", () => {
  for (const name of [
    "modelPatternMatches",
    "matchesWildcardPattern",
    "segmentMatchesWildcard",
    "hasClaudeCodeWildcardPermission",
    "isPotentialUnprefixedClaudeCodeModel",
    "addModelCandidate",
    "stripExtendedContextSuffix",
  ]) {
    assert.equal(typeof (M as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
  assert.ok((M.CLAUDE_CODE_PROVIDER_PREFIXES as Set<string>).has("cc"));
  assert.ok((M.CLAUDE_CODE_SHORT_ALIASES as Set<string>).has("sonnet"));
});

test("matchesWildcardPattern honors segment globs and exact matches", () => {
  assert.equal(M.matchesWildcardPattern("openai/*", "openai/gpt-4o"), true);
  assert.equal(M.matchesWildcardPattern("openai/*", "anthropic/claude"), false);
  assert.equal(M.matchesWildcardPattern("gpt-4o", "gpt-4o"), true);
});

test("modelPatternMatches matches a candidate against an exact or wildcard pattern", () => {
  assert.equal(M.modelPatternMatches("openai/*", ["openai/gpt-4o"]), true);
  assert.equal(M.modelPatternMatches("gpt-4o", ["gpt-4o"]), true);
  assert.equal(M.modelPatternMatches("gpt-4o", ["gpt-4o-mini"]), false);
});

test("stripExtendedContextSuffix removes the extended-context marker", () => {
  const out = M.stripExtendedContextSuffix("claude-sonnet-4-5[1m]");
  assert.equal(out.includes("[1m]"), false);
});
