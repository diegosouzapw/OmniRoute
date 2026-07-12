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
import { NextRequest, NextResponse } from "next/server";
import { getCliRuntimeStatus, CLI_TOOL_IDS } from "@/shared/services/cliRuntime";
import { searchGitHubSkills, type GitHubSkillRepo } from "@/lib/skills/githubCollector";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

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

interface DetectedTool {
  installed: boolean;
  runnable: boolean;
  command: string | null;
  reason: string | null;
}

interface MatchedSkill {
  toolId: string;
  toolName: string;
  skillName: string;
  repo: string;
  htmlUrl: string;
  score: number;
  stars: number;
  description: string;
}

/** Probes every catalog CLI tool in parallel via getCliRuntimeStatus(). */
async function detectInstalledTools(): Promise<Record<string, DetectedTool>> {
  const toolIds = CLI_TOOL_IDS as readonly string[];
  const detectedTools: Record<string, DetectedTool> = {};

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

  return detectedTools;
}

function toMatchedSkill(toolId: string, repo: GitHubSkillRepo): MatchedSkill {
  return {
    toolId,
    toolName: toolId,
    skillName: repo.fullName?.split("/").pop() ?? "unknown",
    repo: repo.fullName ?? "",
    htmlUrl: repo.htmlUrl ?? "",
    score: repo.score ?? 0,
    stars: repo.stars ?? 0,
    description: (repo.description ?? "").slice(0, 200),
  };
}

/** For each repo, matches it to the first installed tool whose keywords hit. */
function matchSkillsToTools(repos: GitHubSkillRepo[], installedTools: string[]): MatchedSkill[] {
  const matchedSkills: MatchedSkill[] = [];

  for (const repo of repos) {
    const name = (repo.fullName ?? "").toLowerCase();
    const desc = (repo.description ?? "").toLowerCase();

    const matchedTool = installedTools.find((toolId) => {
      const keywords = CODING_TOOL_KEYWORDS[toolId] ?? [toolId];
      return keywords.some((kw) => name.includes(kw) || desc.includes(kw));
    });
    if (matchedTool) matchedSkills.push(toMatchedSkill(matchedTool, repo));
  }

  return matchedSkills;
}

/** Fills in tools with zero keyword matches by distributing top-scored skills evenly. */
function distributeUnmatchedSkills(
  repos: GitHubSkillRepo[],
  matchedSkills: MatchedSkill[],
  installedTools: string[]
): MatchedSkill[] {
  const toolsWithoutMatches = installedTools.filter(
    (id) => !matchedSkills.some((m) => m.toolId === id)
  );
  if (toolsWithoutMatches.length === 0 || repos.length === 0) return matchedSkills;

  const topSkills = repos.filter((r) => (r.score ?? 0) >= 0.4).slice(0, Math.min(10, repos.length));
  const distributed = topSkills.map((r, i) =>
    toMatchedSkill(toolsWithoutMatches[i % toolsWithoutMatches.length], r)
  );

  return [...matchedSkills, ...distributed];
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const detectedTools = await detectInstalledTools();
    const installedTools = Object.entries(detectedTools)
      .filter(([, v]) => v.installed)
      .map(([id]) => id);

    const { repos, errors } = await searchGitHubSkills({ minStars: 1, maxResults: 100 });

    const directMatches = matchSkillsToTools(repos, installedTools);
    const matchedSkills = distributeUnmatchedSkills(repos, directMatches, installedTools);

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
