import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireOmniContextApiKeyId } from "../_auth";
import { getMembership } from "@/lib/db/omnicontextProjects";
import { retrieveForProjectCached } from "@/lib/omnicontext/retrieveCached";
import { buildInjectBlock } from "@/lib/omnicontext/inject";
import { getOmniContextSettings } from "@/lib/omnicontext/settings";
import { roleHasPermission } from "@/lib/omnicontext/permissions";
import type { ProjectRole } from "@/lib/omnicontext/types";

const schema = z.object({
  projectId: z.string().min(1),
  query: z.string().max(4000).optional().default(""),
  limit: z.number().int().min(1).max(50).optional(),
});

export async function POST(request: NextRequest) {
  const auth = await requireOmniContextApiKeyId(request);
  if (auth instanceof Response) return auth;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const validation = validateBody(schema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const membership = getMembership(validation.data.projectId, auth.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "VIEW")) {
    return NextResponse.json({ error: { message: "Forbidden" } }, { status: 403 });
  }
  try {
    const cached = await retrieveForProjectCached({
      projectId: validation.data.projectId,
      query: validation.data.query,
      limit: validation.data.limit,
      viewerApiKeyId: auth.apiKeyId,
    });
    if (!cached.result) {
      return NextResponse.json(
        {
          error: { message: "Retrieve unavailable" },
          skippedReason: cached.skippedReason ?? "error",
        },
        { status: 503 }
      );
    }
    const retrieved = cached.result;
    const settings = await getOmniContextSettings();
    const block = buildInjectBlock(
      validation.data.projectId,
      retrieved,
      settings.injectBudgetTokens
    );
    return NextResponse.json({
      stablePrefix: retrieved.stablePrefix,
      activeHandoff: retrieved.activeHandoff,
      dynamic: retrieved.dynamic.map((h) => ({
        artifact: h.artifact,
        rank: h.rank,
      })),
      injectPreview: block,
      cached: cached.cached,
      latencyMs: cached.latencyMs,
    });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
