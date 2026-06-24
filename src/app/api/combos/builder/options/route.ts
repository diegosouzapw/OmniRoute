import { NextResponse } from "next/server";
import { getComboBuilderOptions } from "@/lib/combos/builderOptions";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const options = await getComboBuilderOptions();
    return NextResponse.json(options);
  } catch (error) {
    console.error(
      "[combos.builder.options]",
      { err: error },
      "Error fetching combo builder options"
    );
    return NextResponse.json({ error: "Failed to fetch combo builder options" }, { status: 500 });
  }
}
