// Exercises the REAL Select all / Unselect all batch handlers ComboFormModal
// (src/app/(dashboard)/dashboard/combos/page.tsx::handleAddModels /
// handleDeselectModels) delegates to. Previously this test re-implemented the
// batch logic by hand as a parallel copy — that copy could stay green while
// the real component logic broke (#8526). The regression guard that actually
// blocks CI is the node:test copy of this file at
// tests/unit/combo-select-all-batch-8526.test.ts (this file's location,
// tests/unit/ui/*.test.tsx, is only collected by the advisory
// `test:vitest:ui` — see CONTRIBUTING.md "Both test runners must pass").
import { describe, expect, it } from "vitest";
import {
  computeBatchAddModelSteps,
  computeBatchDeselectModelSteps,
} from "@/lib/combos/builderDraft";

describe("ComboFormModal Select all / Unselect all handlers (real implementation)", () => {
  it("adds every candidate in one pass (no stale single-add overwrite)", () => {
    const { next, addedAny } = computeBatchAddModelSteps(
      [],
      [
        { value: "openai/gpt-4o" },
        { value: "openai/gpt-4o-mini" },
        { value: "anthropic/claude-3-5-sonnet" },
      ],
      []
    );
    expect(addedAny).toBe(true);
    expect(next.map((m) => m.model)).toEqual([
      "openai/gpt-4o",
      "openai/gpt-4o-mini",
      "anthropic/claude-3-5-sonnet",
    ]);
  });

  it("skips models already present (exact duplicate)", () => {
    const existing = [{ model: "openai/gpt-4o", providerId: "openai", weight: 0 }];
    const { next } = computeBatchAddModelSteps(
      existing,
      [{ value: "openai/gpt-4o", providerId: "openai" }, { value: "openai/gpt-4o-mini" }],
      []
    );
    expect(next.map((m) => m.model)).toEqual(["openai/gpt-4o", "openai/gpt-4o-mini"]);
  });

  it("ignores empty / missing values", () => {
    const { next, addedAny } = computeBatchAddModelSteps(
      [],
      [{ value: "" }, {}, { value: "openai/gpt-4o" }],
      []
    );
    expect(addedAny).toBe(true);
    expect(next).toEqual([{ model: "openai/gpt-4o", providerId: "openai", weight: 0 }]);
  });

  it("is a no-op when nothing is selected", () => {
    const existing = [{ model: "openai/gpt-4o", weight: 0 }];
    const { next, addedAny } = computeBatchAddModelSteps(existing, [], []);
    expect(addedAny).toBe(false);
    expect(next).toBe(existing);
  });

  it("removes every matching qualified model in one pass", () => {
    const models = [
      { model: "openai/gpt-4o", weight: 0 },
      { model: "openai/gpt-4o-mini", weight: 0 },
      { model: "anthropic/claude-3-5-sonnet", weight: 0 },
    ];
    const next = computeBatchDeselectModelSteps(models, [
      { value: "openai/gpt-4o" },
      { value: "openai/gpt-4o-mini" },
    ]);
    expect(next).toEqual([{ model: "anthropic/claude-3-5-sonnet", weight: 0 }]);
  });

  it("accepts raw string identifiers in the deselect batch", () => {
    const models = [
      { model: "openai/gpt-4o", weight: 0 },
      { model: "openai/gpt-4o-mini", weight: 0 },
    ];
    const next = computeBatchDeselectModelSteps(models, ["openai/gpt-4o"]);
    expect(next).toEqual([{ model: "openai/gpt-4o-mini", weight: 0 }]);
  });

  it("is a no-op (same reference) when nothing to remove", () => {
    const models = [{ model: "openai/gpt-4o", weight: 0 }];
    expect(computeBatchDeselectModelSteps(models, [])).toBe(models);
    expect(computeBatchDeselectModelSteps(models, [{ value: "" }])).toBe(models);
  });
});
