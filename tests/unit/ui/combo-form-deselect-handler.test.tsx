// Pure unit test for the deselect filter semantics used by ComboFormModal in
// src/app/(dashboard)/dashboard/combos/page.tsx — ported from upstream PR
// decolua/9router#889 (Fajar Hidayat).
//
// The page-level handler removes every step whose qualified `model` matches
// the value sent from the ModelSelectModal, matching upstream JS behavior
// (`setModels(models.filter((m) => m !== model.value))`). Duplicates with
// different providerId/weight pointing at the same model id are all stripped.
import { describe, expect, it } from "vitest";

type Step = { model: string; providerId?: string; weight?: number };

// Mirror of src/app/(dashboard)/dashboard/combos/page.tsx::handleDeselectModel.
// Kept in lockstep so the same filter behavior is checked here, leaf-only.
function deselectModel(models: Step[], model: { value?: string } | string): Step[] {
  const value =
    typeof (model as any)?.value === "string"
      ? (model as any).value
      : typeof model === "string"
        ? model
        : "";
  if (!value) return models;
  return models.filter((m) => m.model !== value);
}

describe("ComboFormModal deselect handler (upstream PR #889)", () => {
  it("removes the single matching step when called with { value }", () => {
    const models: Step[] = [
      { model: "openai/gpt-4o", weight: 50 },
      { model: "anthropic/claude-3-5-sonnet", weight: 50 },
    ];
    const next = deselectModel(models, { value: "openai/gpt-4o" });
    expect(next).toEqual([{ model: "anthropic/claude-3-5-sonnet", weight: 50 }]);
  });

  it("strips every duplicate of the same qualified model", () => {
    const models: Step[] = [
      { model: "openai/gpt-4o", providerId: "openai-a", weight: 30 },
      { model: "openai/gpt-4o", providerId: "openai-b", weight: 70 },
      { model: "anthropic/claude-3-5-sonnet", weight: 0 },
    ];
    const next = deselectModel(models, { value: "openai/gpt-4o" });
    expect(next).toEqual([{ model: "anthropic/claude-3-5-sonnet", weight: 0 }]);
  });

  it("is a no-op when the value is not in the list", () => {
    const models: Step[] = [{ model: "openai/gpt-4o", weight: 100 }];
    const next = deselectModel(models, { value: "openai/gpt-3.5" });
    expect(next).toEqual(models);
  });

  it("is a no-op for empty/missing value (defensive guard)", () => {
    const models: Step[] = [{ model: "openai/gpt-4o", weight: 100 }];
    expect(deselectModel(models, { value: "" })).toEqual(models);
    expect(deselectModel(models, {})).toEqual(models);
  });

  it("accepts a raw string model identifier (legacy upstream call shape)", () => {
    const models: Step[] = [
      { model: "openai/gpt-4o", weight: 50 },
      { model: "anthropic/claude-3-5-sonnet", weight: 50 },
    ];
    const next = deselectModel(models, "openai/gpt-4o");
    expect(next).toEqual([{ model: "anthropic/claude-3-5-sonnet", weight: 50 }]);
  });
});
