import { NextResponse } from "next/server";
import { getComboBuilderOptions } from "@/lib/combos/builderOptions";
import { findAllStaleComboModelRefs } from "@/lib/combos/staleModelRefs";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const [options, staleComboRefs] = await Promise.all([
      getComboBuilderOptions(),
      // #13505: badge data for the combo editor. A failed check must not
      // break the builder, so it degrades to "nothing flagged".
      findAllStaleComboModelRefs().catch(() => []),
    ]);
    return NextResponse.json({ ...options, staleComboRefs });
  } catch (error) {
    console.log("Error fetching combo builder options:", error);
    return NextResponse.json({ error: "Failed to fetch combo builder options" }, { status: 500 });
  }
}
