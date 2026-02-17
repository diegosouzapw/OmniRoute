import { NextResponse } from "next/server";
import { detectFormat } from "@omniroute/open-sse/services/provider.ts";

/**
 * POST /api/translator/detect
 * Detect the format of a request body.
 * Body: { body: object }
 * Returns: { format, label }
 */
export async function POST(request) {
  try {
    const { body } = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Body must be a JSON object" },
        { status: 400 }
      );
    }

    const format = detectFormat(body);

    return NextResponse.json({
      success: true,
      format,
    });
  } catch (error) {
    console.error("Error detecting format:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
