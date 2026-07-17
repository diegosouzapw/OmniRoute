import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  VALID_VARIANTS,
  type AutoVariant,
} from "@omniroute/open-sse/services/autoCombo/autoPrefix";
import { AUTO_SUFFIX_VARIANTS } from "@omniroute/open-sse/services/autoCombo/builtinCatalog";
import { parseAutoSuffix } from "@omniroute/open-sse/services/autoCombo/suffixComposition";

const ALL_VARIANTS: Array<{ variant: AutoVariant | undefined; name: string }> = [
  { variant: undefined, name: "Auto" },
  ...VALID_VARIANTS.map((v) => ({
    variant: v,
    name: `Auto ${v.charAt(0).toUpperCase() + v.slice(1)}`,
  })),
];

// GET /api/combos/auto - List available auto combo variants with candidate info
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { createVirtualAutoCombo } =
      await import("@omniroute/open-sse/services/autoCombo/virtualFactory");

    const combos = [];
    for (const { variant, name } of ALL_VARIANTS) {
      try {
        const virtual = await createVirtualAutoCombo(variant);
        combos.push({
          id: variant ? `auto/${variant}` : "auto",
          name,
          variant: variant ?? null,
          type: "auto",
          isHidden: false,
          candidatePool: virtual.candidatePool ?? [],
          candidateCount: virtual.candidatePool?.length ?? 0,
          // MAX of candidates' windows — consumers (opencode plugin) need a
          // real value here: advertising 0 disables client auto-compaction.
          context_length: virtual.advertisedContextLength ?? null,
          max_output_tokens: virtual.advertisedMaxOutputTokens ?? null,
          config: virtual.config ?? {},
        });
      } catch {
        // Individual variant failure — skip, don't break the whole list
      }
    }

    // #4235 Phase B: enumerate tiered `auto/<category>[:<tier>]` variants
    // (e.g. auto/coding:free, auto/reasoning:pro) that the backend already
    // supports via suffixComposition.ts + virtualFactory.ts but were not
    // exposed by this endpoint.
    for (const modelStr of AUTO_SUFFIX_VARIANTS) {
      try {
        const suffix = modelStr.slice("auto/".length);
        const parsed = parseAutoSuffix(suffix);
        if (!parsed.valid) continue;

        const virtual = await createVirtualAutoCombo(undefined, {
          category: parsed.category,
          tier: parsed.tier,
        });

        // Build a human-readable name from the category and tier
        const catName = parsed.category
          ? parsed.category.charAt(0).toUpperCase() + parsed.category.slice(1)
          : "";
        const tierName = parsed.tier
          ? `${parsed.tier.charAt(0).toUpperCase() + parsed.tier.slice(1)}`
          : "";
        const displayName = tierName ? `${catName} ${tierName}` : catName;

        combos.push({
          id: modelStr,
          name: `Auto ${displayName}`,
          variant: null,
          type: "auto",
          isHidden: false,
          candidatePool: virtual.candidatePool ?? [],
          candidateCount: virtual.candidatePool?.length ?? 0,
          context_length: virtual.advertisedContextLength ?? null,
          max_output_tokens: virtual.advertisedMaxOutputTokens ?? null,
          config: virtual.config ?? {},
        });
      } catch {
        // Individual variant failure — skip, don't break the whole list
      }
    }

    return NextResponse.json({ combos });
  } catch (error) {
    console.error("Error fetching auto combos:", error);
    return NextResponse.json({ combos: [] });
  }
}
