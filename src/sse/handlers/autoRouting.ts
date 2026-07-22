import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import type { AutoVariant } from "@omniroute/open-sse/services/autoCombo/autoPrefix.ts";
import {
  AUTO_TEMPLATE_VARIANTS,
  VALID_AUTO_VARIANTS,
} from "@omniroute/open-sse/services/autoCombo/builtinCatalog.ts";
import {
  parseAutoSuffix,
  type AutoCategory,
  type AutoTier,
} from "@omniroute/open-sse/services/autoCombo/suffixComposition.ts";
import { getCachedSettings } from "@/lib/localDb";
import * as log from "../utils/logger";

export type AutoRoutingState = {
  model: string;
  variant?: AutoVariant;
  spec?: { category?: AutoCategory; tier?: AutoTier };
  isAutoRouting: boolean;
  recognizedBuiltInAuto: boolean;
  response: Response | null;
};

function classifyAutoModel(
  model: string
): Pick<AutoRoutingState, "variant" | "spec" | "recognizedBuiltInAuto"> {
  const recognizedBuiltInAuto =
    model === "auto" || Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, model);
  if (Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, model)) {
    return { variant: AUTO_TEMPLATE_VARIANTS[model], recognizedBuiltInAuto: true };
  }
  if (!model.startsWith("auto/")) return { recognizedBuiltInAuto };

  const suffix = model.slice(5);
  if (VALID_AUTO_VARIANTS.has(suffix as AutoVariant)) {
    return { recognizedBuiltInAuto: true };
  }
  const parsedSuffix = parseAutoSuffix(suffix);
  return parsedSuffix.valid
    ? {
        recognizedBuiltInAuto: true,
        spec: { category: parsedSuffix.category, tier: parsedSuffix.tier },
      }
    : { recognizedBuiltInAuto };
}

async function applyAutoPrefix(
  model: string,
  state: Pick<AutoRoutingState, "variant" | "spec">,
  settings: Record<string, unknown>
): Promise<Pick<AutoRoutingState, "variant" | "spec">> {
  try {
    const { parseAutoPrefix } =
      await import("@omniroute/open-sse/services/autoCombo/autoPrefix.ts");
    const parsed = parseAutoPrefix(model);
    if (!parsed.valid) {
      if (!state.spec) log.warn("AUTO", `Invalid auto prefix format: ${model}`);
      return state;
    }

    const variant = Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, model)
      ? state.variant
      : parsed.variant;
    const defaultVariant =
      model === "auto" && variant === undefined
        ? (settings.autoRoutingDefaultVariant as AutoVariant | undefined)
        : undefined;
    const resolvedVariant = variant ?? defaultVariant;
    log.info(
      "AUTO",
      `Zero-config routing variant: ${resolvedVariant || "default"} (model=${model})`
    );
    return { variant: resolvedVariant, spec: state.spec };
  } catch (err) {
    log.error("AUTO", "Failed to load auto-prefix parser", { err });
    return state;
  }
}

export async function resolveAutoRoutingState(model: string): Promise<AutoRoutingState> {
  const isAutoRouting = model === "auto" || model.startsWith("auto/");
  const classified = classifyAutoModel(model);

  if (!isAutoRouting) {
    return { model, ...classified, isAutoRouting, response: null };
  }

  const settings = await getCachedSettings().catch(() => ({}) as Record<string, unknown>);
  if (settings?.autoRoutingEnabled === false) {
    return {
      model,
      ...classified,
      isAutoRouting,
      response: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        "Auto routing is disabled. Enable it in Settings > Routing."
      ),
    };
  }

  const resolved = await applyAutoPrefix(model, classified, settings);
  return { model, ...classified, ...resolved, isAutoRouting, response: null };
}

export async function createVirtualAutoCombo(
  state: AutoRoutingState,
  combo: any,
  apiKeyId?: string
): Promise<any | Response> {
  if (!state.isAutoRouting || combo !== null) return combo;
  if (!state.recognizedBuiltInAuto) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Model '${state.model}' is not a valid combo or provider. Unknown built-in auto combo.`
    );
  }

  try {
    const { createVirtualAutoCombo: createVirtual } =
      await import("@omniroute/open-sse/services/autoCombo/virtualFactory.ts");
    // #7819 (Level 2): scope candidate exclusions to this API key + the
    // requested auto channel (e.g. "auto/best-coding"). Omitted for any
    // caller that doesn't pass apiKeyId — routing stays unfiltered.
    const virtualCombo = await createVirtual(state.variant, state.spec, apiKeyId, state.model);
    virtualCombo.name = state.model;
    virtualCombo.id = state.model;
    log.info(
      "AUTO",
      `Virtual auto-combo created: ${virtualCombo.name} (${virtualCombo.candidatePool?.length || 0} candidates)`
    );
    return virtualCombo;
  } catch (err) {
    log.error("AUTO", "Failed to create virtual auto-combo", { err });
    return null;
  }
}
