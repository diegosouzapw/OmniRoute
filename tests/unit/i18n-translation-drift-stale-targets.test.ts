import { test } from "node:test";
import assert from "node:assert/strict";
import { findStaleTargets } from "../../scripts/i18n/check-translation-drift.mjs";

// A partial refresh run (17 of 65 locales retranslated before an upstream 429)
// bumps the top-level source_hash while the interrupted locales keep the old
// one. The drift gate compared only the top-level hash and reported PASS for
// 45 stale mirrors; it must list every locale record behind its source (as a
// warning — an interrupted refresh must not turn every PR's CI red).
test("a locale whose record was written from an older source is stale", () => {
  const sources = {
    "README.md": {
      source_hash: "new",
      locales: {
        de: { source_hash: "new", target_hash: "t1" },
        hu: { source_hash: "old", target_hash: "t2" },
        fr: { source_hash: "old", target_hash: "t3" },
      },
    },
    "docs/x.md": {
      source_hash: "same",
      locales: { de: { source_hash: "same", target_hash: "t4" } },
    },
  };
  assert.deepEqual(
    findStaleTargets(sources).map((s) => `${s.locale}:${s.rel}`),
    ["hu:README.md", "fr:README.md"]
  );
});

test("records without a per-locale source_hash (legacy) are not reported", () => {
  const sources = { "docs/y.md": { source_hash: "h", locales: { de: { target_hash: "t" } } } };
  assert.deepEqual(findStaleTargets(sources), []);
  assert.deepEqual(findStaleTargets({}), []);
});
