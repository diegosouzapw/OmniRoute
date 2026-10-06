import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCombos, createCombo } from "@/lib/db/combos";
import { normalizeComboModels } from "@/lib/combos/steps";
import { duplicateAutoComboSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  AUTO_FAMILY_IDS,
  resolveBuiltinAutoSpec,
} from "@omniroute/open-sse/services/autoCombo/builtinCatalog";
import { AutoVariant } from "@omniroute/open-sse/services/autoCombo/autoPrefix";
import { AutoComboSpec } from "@omniroute/open-sse/services/autoCombo/virtualFactory";
import { MODEL_FAMILIES, ModelFamily } from "@omniroute/open-sse/services/autoCombo/modelFamily";

// POST /api/combos/duplicate - Resolve an auto-combo into a static combo snapshot.
// Takes an auto/* template name, resolves its candidate pool using the same logic as
// createVirtualAutoCombo(), then creates a persistent editable combo with those models.
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(duplicateAutoComboSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(
      {
        error:
          validation.error.details[0]?.message ||
          validation.error.message ||
          'Missing required field: "name" (e.g. auto/best-coding)',
      },
      { status: 400 }
    );
  }

  const { name, strategy } = validation.data;

  try {
    const { createVirtualAutoCombo } =
      await import("@omniroute/open-sse/services/autoCombo/virtualFactory");

    // Resolve the variant/spec using the same logic as builtinCatalog.
    const suffix = name.slice("auto/".length);
    const resolved = resolveBuiltinAutoSpec(name, suffix);

    let variant: AutoVariant | undefined;
    let spec: AutoComboSpec | undefined;

    if ("category" in resolved) {
      // Category/tier path (e.g. auto/best-vision → { category: "vision" })
      spec = {
        category: resolved.category,
        ...(resolved.tier ? { tier: resolved.tier } : {}),
      };
    } else if (resolved.variant !== undefined) {
      // Variant path (e.g. auto/best-coding → variant "coding")
      variant = resolved.variant ?? undefined;
      spec = name === "auto/best-free" ? { tier: "free" as const } : undefined;
    }
    // Family suffixes (auto/glm, etc.) — resolveBuiltinAutoSpec returns
    // { variant: undefined } for them, so fall through to MODEL_FAMILIES check.
    if (!variant && !spec) {
      const candidate = suffix as ModelFamily;
      if (MODEL_FAMILIES.includes(candidate)) {
        spec = { family: candidate };
      }
    }

    // Reject unknown templates early instead of silently passing bad data downstream.
    if (!variant && !spec) {
      return NextResponse.json(
        { error: `Unknown auto-combo template: "${name}"` },
        { status: 422 }
      );
    }

    // Materialize the virtual auto-combo to get resolved models.
    // includeResolvedCapabilities is required so computeSnapshotWeights can
    // differentiate candidates by vision/reasoning capabilities at snapshot time.
    const { prepareVirtualAutoComboInputs, createVirtualAutoComboFromPrepared } =
      await import("@omniroute/open-sse/services/autoCombo/virtualFactory");

    const prepared = await prepareVirtualAutoComboInputs({
      includeResolvedCapabilities: true,
    });

    const virtualCombo = await createVirtualAutoComboFromPrepared(prepared, variant, spec);

    if (!Array.isArray(virtualCombo.models) || virtualCombo.models.length === 0) {
      return NextResponse.json(
        { error: "No connected providers/models match this auto-combo template" },
        { status: 422 }
      );
    }

    // Convert virtual combo models into static combo step format.
    // Use simple string entries (e.g. "provider/model") so normalizeComboModels
    // handles provider extraction and ID generation — same path as handleCreate.
    const rawModels = virtualCombo.models.map(
      (m: { model?: string; providerId?: string; weight?: number }, index: number) => ({
        id: `auto-duplicate-${name}-${index + 1}`,
        kind: "model",
        model: m.model || `${m.providerId}/unknown`,
        weight: m.weight ?? 1,
      })
    );

    // Normalize models the same way /api/combos POST does (via normalizeComboModels).
    const allCombos = await getCombos();
    const normalizedModels = normalizeComboModels(rawModels, {
      comboName: `static-${name.replace("auto/", "")}`,
      allCombos: allCombos as never,
    });

    if (normalizedModels.length === 0) {
      return NextResponse.json(
        { error: "No valid models resolved from this auto-combo template" },
        { status: 422 }
      );
    }

    // Normalize scored weights so they sum to exactly 100.
    const totalWeight = normalizedModels.reduce((s, m) => s + (m.weight ?? 0), 0);
    if (totalWeight > 0 && normalizedModels.length > 0) {
      for (const m of normalizedModels) {
        m.weight = Math.max(1, Math.floor(((m.weight ?? 0) / totalWeight) * 100));
      }
      let remainder = 100 - normalizedModels.reduce((s, m) => s + m.weight, 0);
      for (let i = 0; i < normalizedModels.length && remainder > 0; i++) {
        normalizedModels[i].weight++;
        remainder--;
      }
    }

    // Generate a unique combo name based on the template (no "copy" appellation).
    const baseName = `static-${name.replace("auto/", "")}`;
    const existingNames = new Set(allCombos.map((c: any) => c.name));
    let newName = baseName;
    let counter = 1;
    while (existingNames.has(newName)) {
      counter++;
      newName = `${baseName} ${counter}`;
    }

    // Capture the mode-pack weights from the virtual combo config so the snapshot
    // preserves the scoring profile (quality-first, ship-fast, etc.) at creation time.
    const weightPack = virtualCombo.weights ?? virtualCombo.autoConfig?.weights;

    // Create the static combo using the template's strategy.
    const comboStrategy = strategy || "priority";
    const snapshotDate = new Date().toISOString();
    const comboData = await createCombo({
      name: newName,
      models: normalizedModels,
      strategy: comboStrategy,
      description: `${name} @ ${snapshotDate}`,
      config: { sourceAutoCombo: name, weightPack },
      version: 2,
    });

    return NextResponse.json(comboData, { status: 201 });
  } catch (error) {
    console.error("Error duplicating auto-combo:", error);
    return NextResponse.json(
      {
        error: "Failed to duplicate auto-combo",
        details:
          typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : String(error),
      },
      { status: 500 }
    );
  }
}
