/**
 * GET/POST /api/github-skills
 *
 * GitHub agent skill discovery and import.
 *
 * GET:  Search GitHub for repos containing SKILL.md / agent skill files
 *       Query params: minStars, maxResults, minScore, query
 *
 * POST: Install a discovered GitHub skill into target agent directories
 *       Body: { repoName, targets, description }
 */
import { NextRequest, NextResponse } from "next/server";
import { searchGitHubSkills } from "@/lib/skills/githubCollector";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const minStars = parseInt(searchParams.get("minStars") ?? "1", 10);
    const maxResults = Math.min(parseInt(searchParams.get("maxResults") ?? "50", 10), 200);
    const minScore = parseFloat(searchParams.get("minScore") ?? "0");
    const query = searchParams.get("query") || "";

    const { repos, errors } = await searchGitHubSkills({
      minStars: isNaN(minStars) ? 1 : minStars,
      maxResults: isNaN(maxResults) ? 5 : maxResults,
    });

    let filtered = repos;
    if (minScore > 0) filtered = filtered.filter((r) => r.score >= minScore);
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (r) => r.fullName.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      skills: filtered.map((r) => ({
        fullName: r.fullName,
        stars: r.stars,
        score: r.score,
        description: r.description.slice(0, 300),
        hasSkillFile: r.hasSkillFile,
        license: r.license,
      })),
      total: filtered.length,
      ...(errors.length > 0 ? { errors } : {}),
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: msg, skills: [], total: 0 }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      repoName,
      targets = ["hermes"],
      description = "",
    } = body as {
      repoName?: string;
      targets?: string[];
      description?: string;
    };

    if (!repoName || typeof repoName !== "string") {
      return NextResponse.json(buildErrorBody(400, "repoName is required"), { status: 400 });
    }

    const { resolveInstallPath, INSTALL_TARGETS } = await import("@/lib/skills/githubCollector");
    const skillName = repoName.split("/").pop() || repoName;

    const results = targets.map((target) => {
      try {
        const dest = resolveInstallPath(target as any, skillName, description);
        return { target, ok: true, action: "planned", destDir: dest };
      } catch (err) {
        return { target, ok: false, action: "error", error: (err as Error).message };
      }
    });

    return NextResponse.json({
      repoName,
      skillName,
      results,
      allOk: results.every((r) => r.ok),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}
