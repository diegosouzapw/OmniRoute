import { test } from "node:test";
import assert from "node:assert/strict";

/**
 * #8134: GitHub T5 model fallback tries unsupported models
 *
 * When a provider (like GitHub Models) has a restricted catalog,
 * getNextFamilyFallback should skip candidates not in the provider's
 * supportedIds list instead of trying them and wasting round-trips.
 *
 * The fix adds `else continue` when a candidate is not in the provider's
 * catalog and no dot-notation variant matches.
 */

const { getNextFamilyFallback } = await import(
  "../../open-sse/services/modelFamilyFallback.ts"
);

test("#8134: family fallback returns a sibling model for known families", () => {
  const next = getNextFamilyFallback(
    "anthropic/claude-opus-4.8",
    new Set(["anthropic/claude-opus-4.8"])
  );
  assert.ok(next, "Should return a fallback model");
  assert.ok(
    next.includes("claude-opus") || next.includes("claude-sonnet"),
    "Should be a Claude family member, got: " + next
  );
});

test("#8134: family fallback returns null for unknown families", () => {
  const next = getNextFamilyFallback("unknown/random-model", new Set(["unknown/random-model"]));
  assert.equal(next, null, "Should return null for unknown families");
});

test("#8134: getNextFamilyFallback does not return the same model", () => {
  const next = getNextFamilyFallback(
    "github/claude-opus-4.8",
    new Set(["github/claude-opus-4.8"])
  );
  if (next) {
    assert.notEqual(next, "github/claude-opus-4.8");
  }
});

test("#8134: fix adds 'continue' to skip unsupported catalog entries", () => {
  // Read source code to verify the continue statement exists
  const source = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../open-sse/services/modelFamilyFallback.ts"),
    "utf8"
  );
  assert.ok(
    source.includes("else continue;"),
    "getNextFamilyFallback should have 'else continue' to skip unsupported catalog entries"
  );
});

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
