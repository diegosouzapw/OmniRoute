import { NextResponse } from "next/server";
import { skillRegistry } from "@/lib/skills/registry";
import { parsePaginationParams, buildPaginatedResponse } from "@/shared/types/pagination";
import { getSkillsProviderSetting } from "@/lib/skills/providerSettings";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const POPULAR_BY_PROVIDER = {
  skillsmp: ["web-search", "file-reader", "sql-assistant", "devops-helper", "docs-assistant"],
  skillssh: ["git", "terminal", "postgres", "kubernetes", "playwright"],
} as const;

export async function GET(request?: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    await skillRegistry.loadFromDatabase();
    const provider = await getSkillsProviderSetting();
    const url = request?.url || "http://localhost/api/skills";
    const parsedUrl = new URL(url);
    const query = parsedUrl.searchParams.get("q")?.trim().toLowerCase() || "";
    const modeFilter = parsedUrl.searchParams.get("mode");
    const sourceFilter = parsedUrl.searchParams.get("source");

    let allSkills = skillRegistry.list();

    if (query) {
      allSkills = allSkills.filter((skill) => {
        const tags = Array.isArray(skill.tags) ? skill.tags.join(" ").toLowerCase() : "";
        return (
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          tags.includes(query)
        );
      });
    }

    if (modeFilter === "on" || modeFilter === "off" || modeFilter === "auto") {
      allSkills = allSkills.filter(
        (skill) => (skill.mode || (skill.enabled ? "on" : "off")) === modeFilter
      );
    }

    if (sourceFilter === "skillsmp" || sourceFilter === "skillssh" || sourceFilter === "local") {
      allSkills = allSkills.filter((skill) => (skill.sourceProvider || "local") === sourceFilter);
    }

    const params = parsePaginationParams(parsedUrl.searchParams);
    const paged = allSkills.slice((params.page - 1) * params.limit, params.page * params.limit);
    const response = buildPaginatedResponse(paged, allSkills.length, params);
    return NextResponse.json({
      ...response,
      skills: response.data,
      provider,
      popularDefaults: POPULAR_BY_PROVIDER[provider],
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
