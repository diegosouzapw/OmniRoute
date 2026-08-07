import { NextResponse } from "next/server";
import { z } from "zod";

import { buildComboStateResponse } from "@/lib/usage/comboState";

const querySchema = z.object({
  range: z.enum(["1h", "24h", "7d", "30d"]).default("24h"),
  comboId: z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    .optional(),
  comboName: z.string().min(1).max(200).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedQuery = querySchema.safeParse({
      range: searchParams.get("range") || undefined,
      comboId: searchParams.get("comboId") || undefined,
      comboName: searchParams.get("comboName") || undefined,
    });

    if (!parsedQuery.success) {
      return NextResponse.json(
        {
          error: parsedQuery.error.issues[0]?.message ?? "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const response = await buildComboStateResponse(parsedQuery.data);
    if ((parsedQuery.data.comboId || parsedQuery.data.comboName) && response.combos.length === 0) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching combo state:", error);
    return NextResponse.json({ error: "Failed to fetch combo state" }, { status: 500 });
  }
}
