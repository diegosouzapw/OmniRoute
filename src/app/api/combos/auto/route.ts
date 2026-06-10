import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  VALID_VARIANTS,
  type AutoVariant,
} from "@omniroute/open-sse/services/autoCombo/autoPrefix";

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
