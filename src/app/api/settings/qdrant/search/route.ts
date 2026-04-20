import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { searchSemanticMemory } from "@/lib/memory/qdrant";

const schema = z
  .object({
    query: z.string().min(1),
    topK: z.number().int().min(1).max(20).optional(),
  })
  .strict();

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateBody(schema, rawBody);
    if (isValidationFailure(validation)) return validation.response;

    const result = await searchSemanticMemory(validation.data.query, validation.data.topK ?? 5);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ ok: false, latencyMs: 0, error: String(error) }, { status: 500 });
  }
}
