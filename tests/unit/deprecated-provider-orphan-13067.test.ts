/**
 * leftover catalog-removed provider rows (#13067).
 *
 * Classifier only: isDeprecatedProvider latch. Custom openai-compatible-*
 * nodes must never become leftovers.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  isOrphanDeprecatedConnection,
  listDeprecatedProviderLeftovers,
} from "../../src/lib/providers/deprecatedProviderCleanup.ts";

test("classifier matrix: only catalog-removed ids are leftovers", () => {
  const cases: Array<{ provider?: string | null; leftover: boolean }> = [
    { provider: "gemini-cli", leftover: true },
    { provider: "gemini", leftover: false },
    { provider: "openai-compatible-foo", leftover: false },
    { provider: "anthropic-compatible-bar", leftover: false },
    { provider: "anthropic-compatible-cc-baz", leftover: false },
    { provider: "", leftover: false },
    { leftover: false },
    { provider: "Gemini-CLI", leftover: false },
  ];

  for (const row of cases) {
    assert.equal(
      isOrphanDeprecatedConnection({ provider: row.provider }),
      row.leftover,
      `provider=${JSON.stringify(row.provider)}`
    );
  }
});

test("mixed connections group only gemini-cli leftovers", () => {
  const leftovers = listDeprecatedProviderLeftovers([
    { id: "g1", provider: "gemini", name: "live gemini" },
    { id: "c1", provider: "gemini-cli", name: "old cli" },
    { id: "c2", provider: "gemini-cli", name: "old cli 2" },
    { id: "o1", provider: "openai-compatible-foo", name: "custom" },
  ]);

  assert.equal(leftovers.length, 1);
  assert.equal(leftovers[0]?.provider, "gemini-cli");
  assert.equal(leftovers[0]?.migrateTo, "gemini");
  assert.ok(leftovers[0]?.reason);
  assert.deepEqual(leftovers[0]?.connectionIds, ["c1", "c2"]);
  assert.deepEqual(leftovers[0]?.names, ["old cli", "old cli 2"]);
});
