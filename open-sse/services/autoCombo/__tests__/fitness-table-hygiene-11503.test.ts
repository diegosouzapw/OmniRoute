/**
 * TDD regression for #11503: `FITNESS_TABLE` (resolution layer 4) was a hand-maintained
 * table of version-less family patterns matched by `String.includes`, so it kept ranking
 * models the vendors had already retired — and ranked them ABOVE live flagships it had
 * never heard of. On `release/v3.8.51`, `openai/gpt-5.2-codex` (shut down 2026-07-23)
 * scored 0.98 for `coding` via the `codex` row while `claude-fable-5-thinking-max` and
 * `gpt-5.6-sol-xhigh` — both live — fell to the wildcard 0.5.
 *
 * Two changes are pinned here:
 *  1. The table only carries VERSIONED rows that name a live catalog model. Retired
 *     families (`codex`, `o1`, `mixtral`, `grok-4-fast`) and version-less family
 *     patterns (`claude-sonnet`, `qwen`, `llama`, `gemini-pro`, …) are gone.
 *  2. Matching is anchored to segment boundaries, so a row can no longer leak into an
 *     id that merely contains its characters.
 *
 * An id the table does not know resolves to the wildcard baseline 0.5 — the documented
 * neutral for "no evidence", never a quality claim.
 */
import { describe, it, expect } from "vitest";
import lifecycleData from "../../../../config/quality/model-lifecycle.json";
import { getStaticFitnessTableScore } from "../taskFitness";
import { REGISTRY } from "../../../config/providers/index.ts";

const TASK_TYPES = ["coding", "review", "planning", "analysis", "debugging", "documentation"];

// Import data through the runner instead of letting Vite rewrite new URL(...)
// as a browser asset URL in the jsdom lane.
const lifecycle = lifecycleData as { retired: Record<string, { status: string }> };

const retiredIds = new Set(
  Object.entries(lifecycle.retired)
    .filter(([, entry]) => entry.status === "retired")
    .map(([id]) => id.toLowerCase())
);

/** Every model id the provider catalog can route, including per-model aliases. */
function collectCatalogIds(): string[] {
  const ids = new Set<string>();
  for (const entry of Object.values(REGISTRY) as Array<{ models?: unknown[] }>) {
    for (const model of entry?.models ?? []) {
      const record = model as { id?: unknown; aliases?: unknown[] };
      if (typeof record?.id === "string") ids.add(record.id);
      for (const alias of record?.aliases ?? []) {
        if (typeof alias === "string") ids.add(alias);
      }
    }
  }
  return [...ids];
}

/** A catalog id is retired when its bare form (after any `vendor/` prefix) is retired. */
function isRetired(id: string): boolean {
  const lower = id.toLowerCase();
  if (retiredIds.has(lower)) return true;
  const slash = lower.lastIndexOf("/");
  return slash !== -1 && retiredIds.has(lower.slice(slash + 1));
}

describe("#11503 FITNESS_TABLE carries no retired or version-less rows", () => {
  it("scores no routable retired model through the static table", () => {
    // Scoped to ids the catalog can actually route: those are the ones layer 4 ranks.
    // (Retired ids absent from the catalog — `gpt-4o-audio-preview` and friends — are
    // unroutable, so a row matching them cannot invert a routing decision.)
    const routableRetired = collectCatalogIds().filter(isRetired);
    expect(routableRetired.length).toBeGreaterThan(0);

    const scored = routableRetired
      .flatMap((id) =>
        TASK_TYPES.map((task) => ({ id, task, score: getStaticFitnessTableScore(id, task) }))
      )
      .filter((row) => row.score !== null);

    expect(scored).toEqual([]);
  });

  it("does not capture live models through a version-less family row", () => {
    // These are live flagships; before #11503 the family rows either scored them from a
    // sibling's number or (worse) left them at 0.5 while a dead model scored 0.98.
    expect(getStaticFitnessTableScore("claude-sonnet-5", "coding")).toBeNull();
    expect(getStaticFitnessTableScore("claude-fable-5-thinking-max", "coding")).toBeNull();
    expect(getStaticFitnessTableScore("gpt-5.6-sol-xhigh", "coding")).toBeNull();
  });

  it("matches patterns on segment boundaries only", () => {
    // `solar-pro3` contains "o3" but is not an o3 model.
    expect(getStaticFitnessTableScore("solar-pro3", "coding")).toBeNull();
    // `chatgpt-4o-latest` contains "-4o-" but not `gpt-4o` at a boundary. OpenAI shut it
    // down on 2026-02-17; it used to inherit the live flagship's 0.9.
    expect(getStaticFitnessTableScore("chatgpt-4o-latest", "coding")).toBeNull();
  });

  it("keeps hyphen-suffixed and vendor-prefixed forms of a versioned row", () => {
    expect(getStaticFitnessTableScore("gpt-4o-mini", "coding")).toBe(0.8);
    expect(getStaticFitnessTableScore("gpt-4o-2024-11-20", "coding")).toBe(0.9);
    expect(getStaticFitnessTableScore("o3-mini", "coding")).toBe(0.95);
    expect(getStaticFitnessTableScore("openai/o3", "coding")).toBe(0.95);
  });
});
