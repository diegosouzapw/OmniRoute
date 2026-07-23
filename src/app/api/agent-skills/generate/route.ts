/**
 * POST /api/agent-skills/generate
 *
 * Triggers the Agent Skills generator. Requires management auth.
 * Default: dryRun=true, prune=false (safe preview mode).
 *
 * Body (all optional):
 *   - dryRun?: boolean   (default true)
 *   - prune?: boolean    (default false)
 *   - onlyIds?: string[] (only regenerate these skill IDs)
 *
 * Response: GeneratorReport
 * 401 if unauthenticated.
 * 400 if body is malformed.
 * 503 if generator module is not yet available (F3 not merged).
 * 500 on internal error.
 */
import { NextResponse } from "next/server";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { GenerateBodySchema } from "@/lib/agentSkills/schemas";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Management auth — returns null if OK, error Response if not
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  // Parse + validate request body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Request body must be valid JSON"), {
      status: 400,
    });
  }

  const parsed = GenerateBodySchema.safeParse(rawBody ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid request body"),
      { status: 400 },
    );
  }

  // Dynamic import — F3 (generator.ts) may not be merged yet
  let generateAgentSkills: (opts: typeof parsed.data) => Promise<unknown>;
  try {
    const mod = await import("@/lib/agentSkills/generator");
    generateAgentSkills = mod.generateAgentSkills;
  } catch {
    return NextResponse.json(
      buildErrorBody(503, "Generator module is not yet available"),
      { status: 503 },
    );
  }

  try {
    const report = await generateAgentSkills(parsed.data);
    return NextResponse.json(report);
  } catch (error) {
    console.error("[API] POST /api/agent-skills/generate error:", error);
    return NextResponse.json(buildErrorBody(500, "Generator failed"), { status: 500 });
  }
}
