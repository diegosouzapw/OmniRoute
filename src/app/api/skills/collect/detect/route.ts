/**
 * GET /api/skills/collect/detect
 *
 * Detect installed CLI coding tools + search GitHub for matching agent skills.
 * Uses OmniRoute's built-in CLI_TOOL_IDS detection (no Skill Collector bridge needed).
 *
 * Returns: {
 *   tools: { toolId, installed, runnable, command, reason }[],
 *   matchedSkills: { toolId, skillName, repo, score, stars }[],
 *   totalSkills: number
 * }
 */
import { NextResponse } from "next/server";
import { getCliRuntimeStatus, CLI_TOOL_IDS } from "@/shared/services/cliRuntime";
import { searchGitHubSkills } from "@/lib/skills/githubCollector";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

const CODING_TOOL_KEYWORDS: Record<string, string[]> = {
  claude: ["claude", "anthropic", "claude-code"],
  codex: ["codex", "openai", "gpt"],
  cursor: ["cursor", "cursor-ai"],
  copilot: ["copilot", "github-copilot"],
  opencode: ["opencode"],
  cline: ["cline"],
  kilocode: ["kilo", "kilocode"],
  hermes: ["hermes", "nous-research"],
  "hermes-agent": ["hermes", "hermes-agent"],
  openclaw: ["openclaw"],
  droid: ["droid", "factory-ai"],
  continue: ["continue"],
  antigravity: ["antigravity"],
  qwen: ["qwen", "alibaba"],
  windsurf: ["windsurf"],
  devin: ["devin", "cognition"],
};

export async function GET(_request: Request) {
  try {
    // 1. Detect installed CLI tools
    const toolIds = CLI_TOOL_IDS as readonly string[];
    const detectedTools: Record<
      string,
      { installed: boolean; runnable: boolean; command: string | null; reason: string | null }
    > = {};

    await Promise.allSettled(
      toolIds.map(async (toolId) => {
        try {
          const result = await getCliRuntimeStatus(toolId);
          detectedTools[toolId] = {
            installed: result.installed,
            runnable: result.runnable,
            command: result.command ?? null,
            reason: result.reason ?? null,
          };
        } catch {
          detectedTools[toolId] = {
            installed: false,
            runnable: false,
            command: null,
            reason: "check_failed",
          };
        }
      })
    );

    const installedTools = Object.entries(detectedTools)
      .filter(([, v]) => v.installed)
      .map(([id]) => id);

    // 2. Search GitHub for agent skills
    const { repos, errors } = await searchGitHubSkills({
      minStars: 1,
      maxResults: 100,
    });

    // 3. Match skills to installed tools
    const matchedSkills: {
      toolId: string;
      toolName: string;
      skillName: string;
      repo: string;
      htmlUrl: string;
      score: number;
      stars: number;
      description: string;
    }[] = [];

    for (const repo of repos) {
      const name = (repo.fullName ?? "").toLowerCase();
      const desc = (repo.description ?? "").toLowerCase();

      for (const toolId of installedTools) {
        const keywords = CODING_TOOL_KEYWORDS[toolId] ?? [toolId];
        const match = keywords.some((kw) => name.includes(kw) || desc.includes(kw));
        if (match) {
          matchedSkills.push({
            toolId,
            toolName: toolId,
            skillName: repo.fullName?.split("/").pop() ?? "unknown",
            repo: repo.fullName ?? "",
            htmlUrl: repo.htmlUrl ?? "",
            score: repo.score ?? 0,
            stars: repo.stars ?? 0,
            description: (repo.description ?? "").slice(0, 200),
          });
          break;
        }
      }
    }

    // For tools with no specific matches, distribute top skills evenly
    const toolsWithoutMatches = installedTools.filter(
      (id) => !matchedSkills.some((m) => m.toolId === id)
    );
    if (toolsWithoutMatches.length > 0 && repos.length > 0) {
      const topSkills = repos
        .filter((r) => (r.score ?? 0) >= 0.4)
        .slice(0, Math.min(10, repos.length));
      topSkills.forEach((r, i) => {
        const toolIdx = i % toolsWithoutMatches.length;
        matchedSkills.push({
          toolId: toolsWithoutMatches[toolIdx],
          toolName: toolsWithoutMatches[toolIdx],
          skillName: r.fullName?.split("/").pop() ?? "unknown",
          repo: r.fullName ?? "",
          htmlUrl: r.htmlUrl ?? "",
          score: r.score ?? 0,
          stars: r.stars ?? 0,
          description: (r.description ?? "").slice(0, 200),
        });
      });
    }

    return NextResponse.json({
      tools: detectedTools,
      installedToolIds: installedTools,
      matchedSkills: matchedSkills.slice(0, 50),
      totalSkills: repos.length,
      totalMatched: matchedSkills.length,
      searchErrors: (errors?.length ?? 0) > 0 ? errors : undefined,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}
