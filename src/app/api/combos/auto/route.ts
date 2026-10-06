import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  VALID_VARIANTS,
  type AutoVariant,
} from "@omniroute/open-sse/services/autoCombo/autoPrefix";
import {
  AUTO_SUFFIX_VARIANTS,
  AUTO_TEMPLATE_VARIANTS,
  AUTO_FAMILY_IDS,
} from "@omniroute/open-sse/services/autoCombo/builtinCatalog";
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
    const { prepareVirtualAutoComboInputs, createVirtualAutoComboFromPrepared } =
      await import("@omniroute/open-sse/services/autoCombo/virtualFactory");

    // #14889: every variant below is built from the same candidate pool, so prepare
    // it once per request. createVirtualAutoCombo() prepares it again on each call,
    // which made this route rebuild the whole pool once per listed variant.
    const prepared = await prepareVirtualAutoComboInputs();

    const combos: Array<Record<string, unknown>> = [];
    const seenIds = new Set<string>();
    const skipped: Array<{ id: string; reason: string }> = [];
    const pushVariant = async (id: string, build: () => Promise<(typeof combos)[number]>) => {
      if (seenIds.has(id)) return;
      try {
        combos.push(await build());
        seenIds.add(id);
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        skipped.push({ id, reason: reason.replace(/[\r\n\t]+/g, " ").trim() });
      }
    };
    for (const { variant, name } of ALL_VARIANTS) {
      const id = variant ? `auto/${variant}` : "auto";
      await pushVariant(id, async () => {
        const virtual = await createVirtualAutoComboFromPrepared(prepared, variant);
        return {
          id,
          name,
          variant: variant ?? null,
          type: "auto",
          isHidden: false,
          candidatePool: virtual.candidatePool ?? [],
          candidateCount: virtual.candidatePool?.length ?? 0,
          // MAX of candidates' windows — consumers (opencode plugin) need a
          // real value here: advertising 0 disables client auto-compaction.
          // #7662: mirror catalog.ts's established fallback (advertisedMaxOutputTokens
          // has no generic default in computeAdvertisedLimits() the way context length
          // does — an all-unregistered candidate pool, e.g. a no-auth provider's model,
          // otherwise advertises null and disables client auto-compaction).
          context_length: virtual.advertisedContextLength || 128000,
          max_output_tokens: virtual.advertisedMaxOutputTokens || 8192,
          config: virtual.config ?? {},
        };
      });
    }

    // Phase B: enumerate template variants (auto/best-coding, auto/pro-*,
    // auto/claude-*, auto/best-free, etc.) that the backend already supports
    // via builtinCatalog.ts but were not exposed by this endpoint.
    // Run BEFORE suffix variants so template resolution wins for overlapping
    // ids (auto/reasoning, auto/vision), matching catalog.ts behavior.
    for (const modelStr of Object.keys(AUTO_TEMPLATE_VARIANTS)) {
      if (seenIds.has(modelStr)) continue;
      const variant = AUTO_TEMPLATE_VARIANTS[modelStr];
      const spec = modelStr === "auto/best-free" ? { tier: "free" as const } : undefined;
      await pushVariant(modelStr, async () => {
        const virtual = await createVirtualAutoComboFromPrepared(prepared, variant, spec);

        const displayName = variant
          ? `Auto ${variant.charAt(0).toUpperCase() + variant.slice(1)}`
          : "Auto Chat";

        return {
          id: modelStr,
          name: displayName,
          variant: null,
          type: "auto",
          isHidden: false,
          candidatePool: virtual.candidatePool ?? [],
          candidateCount: virtual.candidatePool?.length ?? 0,
          // #7662: mirror catalog.ts's established fallback (advertisedMaxOutputTokens
          // has no generic default in computeAdvertisedLimits() the way context length
          // does — an all-unregistered candidate pool, e.g. a no-auth provider's model,
          // otherwise advertises null and disables client auto-compaction).
          context_length: virtual.advertisedContextLength || 128000,
          max_output_tokens: virtual.advertisedMaxOutputTokens || 8192,
          config: virtual.config ?? {},
        };
      });
    }

    // Phase C: enumerate tiered `auto/<category>[:<tier>]` variants
    // (e.g. auto/coding:free, auto/reasoning:pro) that the backend already
    // supports via suffixComposition.ts + virtualFactory.ts but were not
    // exposed by this endpoint.
    for (const modelStr of AUTO_SUFFIX_VARIANTS) {
      if (seenIds.has(modelStr)) continue;
      const suffix = modelStr.slice("auto/".length);
      const parsed = parseAutoSuffix(suffix);
      if (!parsed.valid) continue;

      await pushVariant(modelStr, async () => {
        const virtual = await createVirtualAutoComboFromPrepared(prepared, undefined, {
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

        return {
          id: modelStr,
          name: `Auto ${displayName}`,
          variant: null,
          type: "auto",
          isHidden: false,
          candidatePool: virtual.candidatePool ?? [],
          candidateCount: virtual.candidatePool?.length ?? 0,
          // #7662: mirror catalog.ts's established fallback (advertisedMaxOutputTokens
          // has no generic default in computeAdvertisedLimits() the way context length
          // does — an all-unregistered candidate pool, e.g. a no-auth provider's model,
          // otherwise advertises null and disables client auto-compaction).
          context_length: virtual.advertisedContextLength || 128000,
          max_output_tokens: virtual.advertisedMaxOutputTokens || 8192,
          config: virtual.config ?? {},
        };
      });
    }

    // Phase D: enumerate family variants (auto/glm, auto/llama,
    // auto/gemini, etc.) that the backend already supports via modelFamily.ts
    // but were not exposed by this endpoint.
    for (const modelStr of AUTO_FAMILY_IDS) {
      if (seenIds.has(modelStr)) continue;
      const suffix = modelStr.slice("auto/".length);
      await pushVariant(modelStr, async () => {
        const virtual = await createVirtualAutoComboFromPrepared(prepared, undefined, {
          family: suffix,
        });

        const displayName = `Auto ${suffix.charAt(0).toUpperCase() + suffix.slice(1)}`;

        return {
          id: modelStr,
          name: displayName,
          variant: null,
          type: "auto",
          isHidden: false,
          candidatePool: virtual.candidatePool ?? [],
          candidateCount: virtual.candidatePool?.length ?? 0,
          // #7662: mirror catalog.ts's established fallback (advertisedMaxOutputTokens
          // has no generic default in computeAdvertisedLimits() the way context length
          // does — an all-unregistered candidate pool, e.g. a no-auth provider's model,
          // otherwise advertises null and disables client auto-compaction).
          context_length: virtual.advertisedContextLength || 128000,
          max_output_tokens: virtual.advertisedMaxOutputTokens || 8192,
          config: virtual.config ?? {},
        };
      });
    }

    // An id that failed in one loop but built in a later one is not skipped.
    const missing = skipped.filter((s) => !seenIds.has(s.id));
    if (missing.length > 0) {
      const ids = [...new Set(missing.map((s) => s.id))].join(", ");
      console.warn(
        `auto combo variants skipped: ${ids} (first error: ${missing[0].reason.slice(0, 300)})`
      );
    }

    return NextResponse.json({ combos });
  } catch (error) {
    console.error("Error fetching auto combos:", error);
    return NextResponse.json({ combos: [] });
  }
}
