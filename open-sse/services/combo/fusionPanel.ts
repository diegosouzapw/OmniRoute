/**
 * Fusion panel member extraction — resolves combo.models entries for the
 * fusion strategy, including nested `combo-ref` steps (#6764).
 *
 * A combo-ref panel member is dispatched as ONE black-box panel voice (a full
 * recursive handleComboChat call for the referenced combo, reusing the same
 * executeComboRefUnit + cycle/depth guards every other combo-ref-consuming
 * strategy already uses) — NOT a fan-out of the referenced combo's own
 * targets. This keeps panel sizing and cost predictable and matches how a
 * literal `auto/*` string panel member already behaves via the single-
 * dispatch safety net in src/sse/handlers/chat.ts.
 */
import { normalizeComboStep } from "../../../src/lib/combos/steps.ts";
import { executeComboRefUnit } from "./runtimeUnits.ts";
import type {
  ComboCollectionLike,
  ComboNestingContext,
  HandleComboChatOptions,
  HandleSingleModel,
  ResolvedComboRefTarget,
} from "./types.ts";

export type FusionPanelSpec = {
  /** Dispatch keys handed to fusion.ts's `models` — comboName for combo-ref members, plain model string otherwise. */
  panel: string[];
  /** comboName -> resolved combo-ref unit, consumed by buildFusionHandleSingleModel. */
  comboRefUnits: Map<string, ResolvedComboRefTarget>;
};

export function extractFusionPanelSpec(
  models: unknown[],
  comboName: string,
  allCombos: ComboCollectionLike
): FusionPanelSpec {
  const panel: string[] = [];
  const comboRefUnits = new Map<string, ResolvedComboRefTarget>();
  models.forEach((entry, index) => {
    const step = normalizeComboStep(entry, { comboName, index, allCombos });
    if (!step) return;
    if (step.kind === "combo-ref") {
      if (!comboRefUnits.has(step.comboName)) {
        comboRefUnits.set(step.comboName, {
          kind: "combo-ref",
          stepId: step.id,
          executionKey: step.id,
          comboName: step.comboName,
          weight: step.weight,
          label: step.label ?? null,
        });
      }
      panel.push(step.comboName);
      return;
    }
    panel.push(step.model);
  });
  return { panel, comboRefUnits };
}

export function buildFusionHandleSingleModel(args: {
  handleSingleModel: HandleSingleModel;
  comboRefUnits: Map<string, ResolvedComboRefTarget>;
  allCombos: ComboCollectionLike;
  nesting: ComboNestingContext;
  baseOptions: HandleComboChatOptions;
  runCombo: (options: HandleComboChatOptions) => Promise<Response>;
}): HandleSingleModel {
  return (body, modelStr, target) => {
    const unit = args.comboRefUnits.get(modelStr);
    if (!unit) return args.handleSingleModel(body, modelStr, target);
    return executeComboRefUnit({
      body,
      unit,
      allCombos: args.allCombos,
      runCombo: args.runCombo,
      baseOptions: args.baseOptions,
      nesting: args.nesting,
    });
  };
}
