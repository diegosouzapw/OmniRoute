/**
 * TDD regression for #11503: `BUILT_IN_ALIASES` is applied to `body.model` on every
 * request (`modelLifecyclePolicy.ts`), so a stale target is a guaranteed 404. Seven rows
 * forwarded to a model the vendor had retired or the catalog never carried — five Claude
 * rows chained one retired id to another, `gemini-3-pro-high` used a spelling
 * (`gemini-3.1-pro-high`) no provider serves, and `llama-3-8b` pointed at a Groq model
 * deprecated on 2025-08-30.
 *
 * The table is also global while the catalog is not: aggregators still serve `kimi-k2`
 * and `gemini-2.0-flash` under their original ids, and the unconditional rewrite broke
 * them. `resolveModelAlias` now takes the provider and skips the rewrite when that
 * provider serves the id as-is.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  getBuiltInAliases,
  resolveModelAlias,
  setCustomAliases,
} from "../../open-sse/services/modelDeprecation.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";

const lifecycle = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("../../config/quality/model-lifecycle.json", import.meta.url)),
    "utf8"
  )
) as { retired: Record<string, { status: string }> };

const retiredIds = new Set(
  Object.entries(lifecycle.retired)
    .filter(([, entry]) => entry.status === "retired")
    .map(([id]) => id.toLowerCase())
);

/** Every model id the catalog can route, lowercased, including per-model aliases. */
const catalogIds = (() => {
  const ids = new Set<string>();
  for (const entry of Object.values(REGISTRY) as Array<{ models?: unknown[] }>) {
    for (const model of entry?.models ?? []) {
      const record = model as { id?: unknown; aliases?: unknown[] };
      if (typeof record?.id === "string") ids.add(record.id.toLowerCase());
      for (const alias of record?.aliases ?? []) {
        if (typeof alias === "string") ids.add(alias.toLowerCase());
      }
    }
  }
  return ids;
})();

describe("#11503 BUILT_IN_ALIASES point at live catalog models", () => {
  const aliases = Object.entries(getBuiltInAliases());

  it("has aliases to check", () => {
    assert.ok(aliases.length > 0);
  });

  for (const [source, target] of aliases) {
    it(`forwards ${source} to a model the catalog serves`, () => {
      assert.ok(
        catalogIds.has(target.toLowerCase()),
        `"${source}" forwards to "${target}", which no provider in REGISTRY serves`
      );
    });

    it(`forwards ${source} to a model the vendor has not retired`, () => {
      assert.ok(
        !retiredIds.has(target.toLowerCase()),
        `"${source}" forwards to "${target}", which the vendor has retired`
      );
    });
  }

  it("applies the corrected Claude replacement", () => {
    // Was claude-opus-4-20250514, retired 2026-06-15.
    assert.equal(resolveModelAlias("claude-3-opus-20240229"), "claude-opus-4-8");
  });
});

describe("#11503 resolveModelAlias respects the serving provider", () => {
  it("leaves the id alone when the provider serves it as-is", () => {
    assert.equal(resolveModelAlias("kimi-k2", "t3-web"), "kimi-k2");
  });

  it("still rewrites for a provider that only knows the canonical id", () => {
    assert.equal(resolveModelAlias("kimi-k2", "fireworks"), "moonshotai/Kimi-K2");
  });

  it("keeps the unconditional rewrite when no provider is known", () => {
    assert.equal(resolveModelAlias("kimi-k2"), "moonshotai/Kimi-K2");
  });

  it("lets a custom alias win over a built-in one, provider or not", () => {
    setCustomAliases({ "kimi-k2": "custom-target" });
    try {
      assert.equal(resolveModelAlias("kimi-k2"), "custom-target");
      assert.equal(resolveModelAlias("kimi-k2", "t3-web"), "custom-target");
    } finally {
      setCustomAliases({});
    }
  });
});
