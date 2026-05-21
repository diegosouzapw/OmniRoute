/**
 * POST /api/providers/zed/manual-import
 *
 * Accepts a manually-pasted Zed API token for a specific provider.
 * Intended for Docker/headless deployments where keychain access is unavailable.
 *
 * Security: protected by requireManagementAuth.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createProviderConnection } from "@/lib/db/providers";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

const manualImportSchema = z.object({
  provider: z.string().min(1).max(64),
  token: z.string().min(1).max(512),
  label: z.string().max(128).optional(),
});

export async function POST(request: Request): Promise<NextResponse> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError as NextResponse;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }

  const parsed = manualImportSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(
        400,
        "Validation failed: " + parsed.error.issues.map((i) => i.message).join(", ")
      ),
      { status: 400 }
    );
  }

  const { provider, token, label } = parsed.data;

  try {
    const connection = await createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: token,
      name: label ?? `Zed Manual Import (${provider})`,
      isActive: true,
    });

    return NextResponse.json({ success: true, connectionId: connection.id, provider });
  } catch (err: unknown) {
    console.error("[Zed Manual Import] Failed to save credential:", err);
    return NextResponse.json(buildErrorBody(500, "Failed to save credential"), { status: 500 });
  }
}
