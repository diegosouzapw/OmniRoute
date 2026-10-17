import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { acknowledgeSeenModels } from "@/lib/db/seenModels";

export const dynamic = "force-dynamic";

const acknowledgeBodySchema = z
  .object({
    all: z.boolean().optional(),
    models: z
      .array(
        z.object({
          provider: z.string().min(1).max(200),
          modelId: z.string().min(1).max(500),
        })
      )
      .max(1000)
      .optional(),
  })
  .strict();

// POST /api/models/new/acknowledge — mark unread models as seen.
// Body: { models: [{ provider, modelId }] } for a selection, or {} / { all: true } for all.
export async function POST(request: Request) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    let rawBody: unknown = {};
    const text = await request.text();
    if (text.trim()) {
      try {
        rawBody = JSON.parse(text);
      } catch {
        return createErrorResponse({ status: 400, message: "Invalid JSON body" });
      }
    }

    const parsed = acknowledgeBodySchema.safeParse(rawBody);
    if (!parsed.success) {
      return createErrorResponse({
        status: 400,
        message: "Invalid request body",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const { all, models } = parsed.data;
    const acknowledged = acknowledgeSeenModels(all || !models ? undefined : models);
    return NextResponse.json({ ok: true, acknowledged });
  } catch (error) {
    console.error(
      "[API] POST /api/models/new/acknowledge failed:",
      error instanceof Error ? error.name : "unknown error"
    );
    return createErrorResponse({ status: 500, message: "Failed to acknowledge models" });
  }
}
