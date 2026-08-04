import test from "node:test";
import assert from "node:assert/strict";

import { generateUniqueModelAlias } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/passthroughAlias.ts";

/**
 * Regression guard for upstream 9router#1850.
 *
 * The naive last-segment alias collapsed distinct namespaced model ids to the
 * same alias, blocking the second model from ever being added.
 */

test("bare last segment when free (preserves the common case)", () => {
  assert.equal(generateUniqueModelAlias("enx/gpt-5.5", {}), "gpt-5.5");
  assert.equal(generateUniqueModelAlias("gpt-5.5", {}), "gpt-5.5");
});

test("#1850: namespaced ids that share a last segment get distinct aliases", () => {
  const aliases: Record<string, unknown> = {};
  const a = generateUniqueModelAlias("enx/gpt-5.5", aliases);
  aliases[a] = { modelId: "enx/gpt-5.5" };
  const b = generateUniqueModelAlias("enx/codebuddy/gpt-5.5", aliases);

  assert.equal(a, "gpt-5.5");
  assert.equal(b, "codebuddy-gpt-5.5", "second model must not collide with the first");
  assert.notEqual(a, b);
});

test("falls back to a numeric suffix when every qualified form is taken", () => {
  const aliases: Record<string, unknown> = {
    "gpt-5.5": {},
    "codebuddy-gpt-5.5": {},
    "enx-codebuddy-gpt-5.5": {},
  };
  const alias = generateUniqueModelAlias("enx/codebuddy/gpt-5.5", aliases);
  assert.equal(alias, "gpt-5.5-2");
});

test("numeric suffix increments past existing numbered aliases", () => {
  const aliases: Record<string, unknown> = { foo: {}, "foo-2": {}, "foo-3": {} };
  // single-segment id whose only candidate is taken → numeric fallback skips to -4
  assert.equal(generateUniqueModelAlias("foo", aliases), "foo-4");
});

test("degenerate ids do not throw", () => {
  assert.equal(typeof generateUniqueModelAlias("", {}), "string");
  assert.equal(typeof generateUniqueModelAlias("///", {}), "string");
});
