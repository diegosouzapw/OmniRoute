import { NextResponse } from "next/server";

/**
 * Result of attempting to parse a JSON body from a Request.
 *
 * Discriminated union: callers narrow on `success` to either get the
 * already-parsed data or short-circuit with the prepared 400 response.
 */
export type ReadJsonBodyResult =
  | { success: true; data: unknown }
  | { success: false; response: NextResponse };

/**
 * Parse a request body as JSON, returning either the parsed value or a
 * pre-shaped 400 response that mirrors the standard error envelope used
 * elsewhere in the API (`{ error: { message, details: [{ field, message }] } }`).
 *
 * Why this exists: the 13-line `try { await request.json() } catch { return
 * NextResponse.json({...}, { status: 400 }) }` block was copy-pasted into
 * 170+ route handlers. Centralizing it here keeps the envelope shape
 * consistent and makes it possible to evolve the shape in one place.
 *
 * Usage:
 *
 * ```ts
 * const bodyResult = await readJsonBody(request);
 * if (!bodyResult.success) return bodyResult.response;
 * const rawBody = bodyResult.data;
 * ```
 */
export async function readJsonBody(request: Request): Promise<ReadJsonBodyResult> {
  try {
    return { success: true, data: await request.json() };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: {
            message: "Invalid request",
            details: [{ field: "body", message: "Invalid JSON body" }],
          },
        },
        { status: 400 }
      ),
    };
  }
}
