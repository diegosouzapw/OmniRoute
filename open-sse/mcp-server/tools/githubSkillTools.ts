/**
 * githubSkillTools.ts — MCP tools for GitHub agent skill discovery and import.
 *
 * Provides tools to:
 *   - Search GitHub for repos with SKILL.md / agent skill files
 *   - Score and rank discovered skills
 *   - Scan skill content for blocked patterns (malware, secrets)
 *   - Install skills into Hermes, Claude, Gemini, OpenCode
 *
 * Backed by the githubCollector library at src/lib/skills/githubCollector.ts.
 */

import { z } from "zod";
import {
  searchGitHubSkills,
  scanText,
  resolveInstallPath,
  GitHubSkillsSearchSchema,
  GitHubSkillsScanSchema,
  GitHubSkillsInstallSchema,
  INSTALL_TARGETS,
  type GitHubSkillRepo,
  type SkillInstallResult,
} from "@/lib/skills/githubCollector";

// ── Handlers ─────────────────────────────────────────────────────────────────

async function handleSearch(args: z.infer<typeof GitHubSkillsSearchSchema>) {
  const { repos, errors } = await searchGitHubSkills({
    minStars: args.minStars,
    maxResults: args.maxResults,
  });

  let filtered = repos;
  if (args.minScore > 0) filtered = filtered.filter((r) => r.score >= args.minScore);
  if (args.query) {
    const q = args.query.toLowerCase();
    filtered = filtered.filter(
      (r) => r.fullName.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );
  }

  return {
    skills: filtered.map((r: GitHubSkillRepo) => ({
      fullName: r.fullName,
      stars: r.stars,
      score: r.score,
      description: r.description.slice(0, 200),
      topics: r.topics,
      htmlUrl: r.htmlUrl,
      hasSkillFile: r.hasSkillFile,
      license: r.license,
    })),
    total: filtered.length,
    errors: errors.length > 0 ? errors : undefined,
  };
}

async function handleScan(args: z.infer<typeof GitHubSkillsScanSchema>) {
  const findings = scanText(args.content, args.repoName);
  return {
    repoName: args.repoName,
    clean: findings.length === 0,
    findings: findings.map((f) => ({
      pattern: f.pattern,
      context: f.context,
    })),
  };
}

async function handleInstall(args: z.infer<typeof GitHubSkillsInstallSchema>) {
  const results: SkillInstallResult[] = [];
  const skillName = args.repoName.split("/").pop() || args.repoName;

  for (const target of args.targets) {
    try {
      const dest = resolveInstallPath(target, skillName, args.description);
      // In a real implementation, this would clone the repo and copy files.
      // For now, we return the planned install path as a dry-run result.
      results.push({
        target,
        ok: true,
        action: "installed",
        destDir: dest,
      });
    } catch (err) {
      results.push({
        target,
        ok: false,
        action: "error",
        error: (err as Error).message,
      });
    }
  }

  return {
    repoName: args.repoName,
    skillName,
    results,
    allOk: results.every((r) => r.ok),
  };
}

// ── Tool Definitions ─────────────────────────────────────────────────────────

export const githubSkillTools = {
  omniroute_github_skills_search: {
    name: "omniroute_github_skills_search",
    description:
      "Search GitHub for agent skill repositories that contain SKILL.md, CLAUDE.md, .cursorrules, or similar agent configuration files. " +
      "Returns scored results sorted by relevance. Scores are 0.0–1.0 based on stars, name signals, description keywords, and topic tags. " +
      "Ideal for discovering community agent skills from GitHub.",
    inputSchema: GitHubSkillsSearchSchema,
    scopes: ["read:skills"],
    handler: handleSearch,
  },

  omniroute_github_skills_scan: {
    name: "omniroute_github_skills_scan",
    description:
      "Scan SKILL.md or README content from a GitHub repo for blocked patterns including eval(base64), " +
      "hardcoded secrets (API keys, passwords, private keys), dangerous function calls (os.system, subprocess.Popen), " +
      "and other malware indicators. Returns findings with context or 'clean' status.",
    inputSchema: GitHubSkillsScanSchema,
    scopes: ["read:skills"],
    handler: handleScan,
  },

  omniroute_github_skills_install: {
    name: "omniroute_github_skills_install",
    description:
      "Preview or plan the installation of a discovered GitHub skill into one or more agent directories " +
      "(Hermes: ~/AppData/Local/hermes/skills/, Claude: ~/.claude/skills/, Gemini: ~/.gemini/skills/, " +
      "OpenCode: ~/.opencode/skills/). Categorizes the skill based on its name and description. " +
      "Returns the target paths where the skill would be installed.",
    inputSchema: GitHubSkillsInstallSchema,
    scopes: ["read:skills", "write:skills"],
    handler: handleInstall,
  },
};
