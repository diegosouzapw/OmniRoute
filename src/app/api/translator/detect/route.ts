import { NextResponse } from "next/server";
import { detectFormat } from "@omniroute/open-sse/services/provider.ts";
import { translatorDetectSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * POST /api/translator/detect
 * Detect the format of a request body.
 * Body: { body: object }
 * Returns: { format, label }
 */
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(translatorDetectSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }
    const { body } = validation.data;

    const format = detectFormat(body);

    return NextResponse.json({
      success: true,
      format,
    });
  } catch (error) {
    console.error("Error detecting format:", error);
    return NextResponse.json({ success: false, error: "Failed to detect format" }, { status: 500 });
  }
}
