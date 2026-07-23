/**
 * POST /api/skills/collect/install
 *
 * Install a discovered GitHub skill to detected CLI tools.
 * Uses OmniRoute's skill registry + CLI tool paths (no Skill Collector bridge).
 *
 * Body: {
 *   repoName: string,       // GitHub full name (e.g. "user/repo")
 *   targets: string[],      // Tool IDs to install to (e.g. ["codex", "claude"])
 *   description?: string    // Repo description for category inference
 * }
 *
 * Returns: { ok, results: { target, action, destDir, error? }[] }
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { sanitizeErrorMessage, buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const installSchema = z.object({
  repoName: z.string().min(1, "repoName is required"),
  targets: z
    .array(z.string().min(1, "target toolId must be non-empty"))
    .min(1, "at least one target required")
    .max(10, "max 10 targets"),
  description: z.string().default(""),
});

const CODING_TOOL_PATHS: Record<string, string> = {
  claude: "~/.claude/skills/{category}",
  codex: "~/.codex/skills/{category}",
  hermes: "~/AppData/Local/hermes/skills/{category}",
  opencode: "~/.opencode/skills/{category}",
  gemini: "~/.gemini/skills/{category}",
  cursor: "~/.cursor/skills/{category}",
  copilot: "~/.copilot/skills/{category}",
  cline: "~/.cline/skills/{category}",
  windsurf: "~/.windsurf/skills/{category}",
  devin: "~/.devin/skills/{category}",
  antigravity: "~/.antigravity/skills/{category}",
  kilocode: "~/.kilocode/skills/{category}",
  openclaw: "~/.openclaw/skills/{category}",
  droid: "~/.droid/skills/{category}",
  continue: "~/.continue/skills/{category}",
  qwen: "~/.qwen/skills/{category}",
};

function inferCategory(skillName: string, description: string): string {
  const text = `${skillName} ${description}`.toLowerCase();
  const mapping: Record<string, string[]> = {
    security: ["security", "pentest", "exploit", "malware", "forensics", "vulnerability"],
    "data-science": ["data", "analytics", "pandas", "ml", "model", "train"],
    devops: ["deploy", "docker", "k8s", "terraform", "ci/cd", "pipeline"],
    creative: ["design", "image", "video", "art", "music"],
    productivity: ["email", "doc", "slide", "report", "calendar"],
    research: ["paper", "arxiv", "academic", "literature"],
    "software-development": ["code", "refactor", "test", "lint", "review", "debug"],
    media: ["youtube", "transcript", "gif", "video", "audio"],
  };
  for (const [cat, keywords] of Object.entries(mapping)) {
    if (keywords.some((k) => text.includes(k))) return cat;
  }
  return "imported-github";
}

function expandHome(dir: string): string {
  // Home dir resolution: Windows (USERPROFILE) → Unix fallback (HOME)
  const home =
    typeof process !== "undefined" ? process.env.USERPROFILE || process.env.HOME || "" : "";
  return dir.replace(/^~/, home);
}

function resolveDestDir(target: string, skillName: string, description: string): string {
  const template = CODING_TOOL_PATHS[target];
  if (!template) {
    throw new Error(
      `Unknown target tool: "${target}". Supported: ${Object.keys(CODING_TOOL_PATHS).join(", ")}`
    );
  }
  const category = inferCategory(skillName, description);
  const resolved = template.replace("{category}", category).replace("{name}", skillName);
  return expandHome(`${resolved}/${skillName}`);
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(installSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(buildErrorBody(400, validation.error.message), { status: 400 });
    }

    const { repoName, targets, description } = validation.data;
    const skillName = repoName.split("/").pop() || repoName;

    const results = targets.map((target) => {
      try {
        const destDir = resolveDestDir(target, skillName, description);
        return {
          target,
          ok: true,
          action: "planned",
          destDir,
          note: `Ready: SKILL.md from ${repoName} can be synced to ${destDir}`,
        };
      } catch (err) {
        return {
          target,
          ok: false,
          action: "error",
          error: (err as Error).message,
        };
      }
    });

    return NextResponse.json({
      ok: results.every((r) => r.ok),
      repoName,
      skillName,
      results,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}
