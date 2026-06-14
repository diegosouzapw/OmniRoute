/**
 * GET /api/agent-skills
 *
 * Returns the full Agent Skills catalog with optional filtering by category or area.
 *
 * Query params:
 *   - category?: "api" | "cli"
 *   - area?: string
 *
 * Response: { skills: AgentSkill[], count: number, coverage: SkillCoverage }
 */
import { NextResponse } from "next/server";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { ListQuerySchema } from "@/lib/agentSkills/schemas";
import { filterCatalog, computeCoverage } from "@/lib/agentSkills/catalog";

// Catalog reads filesystem on demand — disable static caching
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = ListQuerySchema.safeParse({
      category: searchParams.get("category") ?? undefined,
      area: searchParams.get("area") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid query parameters"),
        { status: 400 },
      );
    }

    const skills = filterCatalog(parsed.data);
    const coverage = computeCoverage();

    return NextResponse.json({ skills, count: skills.length, coverage });
  } catch (error) {
    console.error("[API] GET /api/agent-skills error:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to load agent skills catalog"), {
      status: 500,
    });
  }
}
