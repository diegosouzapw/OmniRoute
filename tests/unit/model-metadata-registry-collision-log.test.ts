/**
 * `findInsensitive()` in modelMetadataRegistry builds a lowercase-key index and
 * warns when two keys collide case-insensitively (e.g. models.dev returning both
 * "OpenAI" and "openai"). The warning is a genuine upstream data-quality signal
 * and must be kept.
 *
 * The problem is volume, not the signal: it logged once PER COLLIDING KEY per
 * index build. On a real catalog that is hundreds of lines per rebuild — a
 * production log captured 27,296 of these in a single file, 40% of all lines,
 * in bursts of ~500/sec, driving 52 MB log rotations.
 *
 * This test pins the aggregate shape: one warning per index build, carrying the
 * collision count, no matter how many keys collide. It fails against the
 * per-key implementation (3 warnings for 3 collisions).
 */

import assert from "node:assert/strict";
import test from "node:test";

import { enrichCatalogModelEntry } from "@/lib/modelMetadataRegistry";

type Warn = (...args: unknown[]) => void;

/** Runs `fn` with console.warn captured; returns the warning lines. */
function captureWarnings(fn: () => void): string[] {
  const lines: string[] = [];
  const original: Warn = console.warn;
  console.warn = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  try {
    fn();
  } finally {
    console.warn = original;
  }
  return lines.filter((l) => l.includes("findInsensitive"));
}

/**
 * Fresh object per call: the lowercase index is cached in a WeakMap keyed by
 * object identity, so reusing one would skip the rebuild (and the warning).
 *
 * The provider key is deliberately spelled "OpenAI", not "openai". findInsensitive
 * short-circuits on `if (key in obj) return obj[key]` — an exact hit returns before
 * the index is ever built, so a fixture containing the literal lookup key produces
 * zero warnings and proves nothing.
 */
function pricingWithCollisions(count: number): Record<string, unknown> {
  const pricing: Record<string, unknown> = {
    OpenAI: { "gpt-4o": { input: 1, output: 2 } },
  };
  for (let i = 0; i < count; i++) {
    // Same key differing only in case -> collides with a previously inserted one.
    pricing[`Dup${i}Provider`] = { m: { input: 1, output: 2 } };
    pricing[`dup${i}provider`] = { m: { input: 9, output: 9 } };
  }
  return pricing;
}

test("findInsensitive emits ONE aggregated warning per index build, not one per collision", () => {
  const warnings = captureWarnings(() => {
    enrichCatalogModelEntry(
      { id: "gpt-4o", owned_by: "openai" },
      { provider: "openai", model: "gpt-4o" },
      { modelsDevPricing: pricingWithCollisions(3) } as never
    );
  });

  assert.equal(
    warnings.length,
    1,
    `expected a single aggregated warning, got ${warnings.length}:\n${warnings.join("\n")}`
  );
  assert.match(warnings[0], /3 case-insensitive key collision/);
});

test("the aggregated warning still names colliding keys so the signal survives", () => {
  const warnings = captureWarnings(() => {
    enrichCatalogModelEntry(
      { id: "gpt-4o", owned_by: "openai" },
      { provider: "openai", model: "gpt-4o" },
      { modelsDevPricing: pricingWithCollisions(2) } as never
    );
  });

  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /dup0provider/);
});

test("warning count stays at one as collisions scale", () => {
  const warnings = captureWarnings(() => {
    enrichCatalogModelEntry(
      { id: "gpt-4o", owned_by: "openai" },
      { provider: "openai", model: "gpt-4o" },
      { modelsDevPricing: pricingWithCollisions(50) } as never
    );
  });

  assert.equal(warnings.length, 1, "50 collisions must still produce exactly one line");
  assert.match(warnings[0], /50 case-insensitive key collision/);
});

test("no collisions means no warning at all", () => {
  const warnings = captureWarnings(() => {
    enrichCatalogModelEntry(
      { id: "gpt-4o", owned_by: "openai" },
      { provider: "openai", model: "gpt-4o" },
      { modelsDevPricing: { OpenAI: { "gpt-4o": { input: 1, output: 2 } } } } as never
    );
  });

  assert.deepEqual(warnings, []);
});
