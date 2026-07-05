/**
 * githubCollector.ts — GitHub agent skill discovery, scoring, and import.
 *
 * Mirrors the logic from the Skill Collector Python tool:
 *   - Searches GitHub for repos with SKILL.md / agent skill files
 *   - Scores repos by relevance (stars, name/desc signals, topics)
 *   - Scans for blocked patterns (malware, secrets)
 *   - Installs SKILL.md into agent directories (Hermes, Claude, etc.)
 *
 * This is the backend library consumed by the MCP tools and REST API.
 */

import { z } from "zod";

// ── Types ────────────────────────────────────────────────────────────────────

export interface GitHubSkillRepo {
  fullName: string;
  htmlUrl: string;
  description: string;
  stars: number;
  forks: number;
  topics: string[];
  score: number;
  hasSkillFile: boolean;
  isAwesome: boolean;
  updatedAt: string | null;
  license: string | null;
}

export interface ScanFinding {
  file: string;
  pattern: string;
  context: string;
}

export interface SkillInstallResult {
  target: string;
  ok: boolean;
  action: "installed" | "already_up_to_date" | "skipped" | "error";
  error?: string;
  destDir?: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const BLOCKED_PATTERNS: { regex: RegExp; description: string }[] = [
  { regex: /eval\s*\(base64/i, description: "eval(base64) — dangerous code execution" },
  { regex: /exec\s*\(base64/i, description: "exec(base64) — dangerous code execution" },
  { regex: /os\.system\(/i, description: "os.system() — shell injection risk" },
  { regex: /subprocess\.Popen\(/i, description: "subprocess.Popen() — shell spawn" },
  { regex: /invoke-expression/i, description: "PowerShell Invoke-Expression" },
  { regex: /-----BEGIN.*PRIVATE KEY-----/i, description: "Private key leaked" },
  { regex: /id_rsa/i, description: "SSH private key reference" },
  { regex: /password\s*[=:]\s*['"]/, description: "Hardcoded password" },
  { regex: /api_key\s*[=:]\s*['"]/, description: "Hardcoded API key" },
  { regex: /secret\s*[=:]\s*['"]/, description: "Hardcoded secret" },
  { regex: /sk-[a-zA-Z0-9]{20,}/i, description: "OpenAI API key pattern" },
  { regex: /ghp_[a-zA-Z0-9]{36,}/i, description: "GitHub PAT token" },
];

const SKILL_FILE_SIGNALS = [
  "skill.md",
  "skills.md",
  "agents.md",
  "claude.md",
  "codex.md",
  "cursor.md",
  "copilot.md",
  ".cursorrules",
  ".clauderules",
  ".windsurfrules",
  "copilot-instructions",
  "agent.md",
  "context.md",
  "instructions.md",
  "rules.md",
  "conventions.md",
];

const HIGH_VALUE_KEYWORDS = [
  "agent",
  "skill",
  "cursor",
  "copilot",
  "claude",
  "codex",
  "gemini",
  "opencode",
  "hermes",
  "windsurf",
  "mcp",
  "llm",
  "autonomous",
  "orchestrat",
  "workflow",
];

const AGENT_TOPICS = new Set([
  "agent",
  "ai-agent",
  "llm-agent",
  "agentic-ai",
  "agent-framework",
  "autonomous-agent",
  "multi-agent",
  "mcp",
  "mcp-server",
  "mcp-tool",
  "claude",
  "claude-code",
  "cursor-ai",
  "copilot",
  "codex",
  "prompt-engineering",
  "context-engineering",
  "ai-toolkit",
]);

const KNOWN_GOLD_REPOS = new Set([
  "addyosmani/agent-skills",
  "K-Dense-AI/scientific-agent-skills",
  "modelcontextprotocol/servers",
  "continuedev/continue",
  "aider-ai/aider",
  "Significant-Gravitas/AutoGPT",
  "crewAIInc/crewAI",
  "microsoft/autogen",
  "langchain-ai/langchain",
  "openai/codex",
]);

export const INSTALL_TARGETS = ["hermes", "claude", "gemini", "opencode"] as const;
export type InstallTarget = (typeof INSTALL_TARGETS)[number];

const INSTALL_PATHS: Record<InstallTarget, string> = {
  hermes: "~/AppData/Local/hermes/skills/{category}",
  claude: "~/.claude/skills/{category}",
  gemini: "~/.gemini/skills/{category}",
  opencode: "~/.opencode/skills/{category}",
};

// ── Scoring ──────────────────────────────────────────────────────────────────

/**
 * Score a GitHub repo for agent-skill relevance (0.0 – 1.0).
 * Uses metadata only — no extra GitHub API calls.
 */
export function scoreRepo(params: {
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  hasLicense: boolean;
  topics: string[];
}): number {
  const { fullName, description, stars: rawStars, forks, hasLicense, topics } = params;
  const name = fullName.toLowerCase();
  const desc = description.toLowerCase();
  let stars = rawStars;

  let points = 0.0;
  let bonus = 0.0;
  let isAwesome = false;
  let hasSkillFile = false;

  // Gold repos get max score
  if (KNOWN_GOLD_REPOS.has(fullName)) return 0.98;

  // Awesome-list detection (curated, not skill repos)
  if (name.includes("awesome") || desc.includes("curated list") || desc.includes("awesome list")) {
    isAwesome = true;
    points += 0.3;
  }

  // Skill-file name signals
  for (const sig of SKILL_FILE_SIGNALS) {
    if (name.includes(sig)) {
      points += 0.22;
      hasSkillFile = true;
      break;
    }
  }

  // Loose keyword matches
  for (const sig of [".md", "skill", "agent", "rules", "instructions"]) {
    if (name.includes(sig)) points += 0.02;
    if (desc.includes(sig)) points += 0.01;
  }

  // High-value keywords
  for (const kw of HIGH_VALUE_KEYWORDS) {
    if (name.includes(kw)) points += 0.04;
    if (desc.includes(kw)) points += 0.02;
  }

  // Topic matches
  const topicMatch = topics.filter((t) => AGENT_TOPICS.has(t)).length;
  points += topicMatch * 0.06;

  // Stars bonus (logarithmic, capped for awesome lists)
  if (isAwesome) stars = Math.min(stars, 1000);
  if (stars > 20000) bonus = Math.min(0.7, stars / 30000);
  else if (stars > 5000) bonus = stars / 15000;
  else if (stars > 1000) bonus = stars / 10000;
  else if (stars > 300) bonus = stars / 8000;
  else if (stars > 100) bonus = stars / 12000;
  else if (stars > 50) bonus = stars / 15000;

  if (forks > 500) bonus += 0.05;
  else if (forks > 100) bonus += 0.03;

  if (hasLicense) points += 0.03;
  if (stars < 300 && !isAwesome) points += 0.06;

  const base = isAwesome ? (hasSkillFile ? 0.38 : 0.16) : hasSkillFile ? 0.38 : 0.28;
  let score = Math.min(1.0, (points + bonus) * 0.48 + base);
  if (isAwesome && !hasSkillFile) score = Math.min(score, 0.82);

  return Math.round(score * 10000) / 10000;
}

// ── Scanning ─────────────────────────────────────────────────────────────────

const DOC_FILES = new Set([
  "readme.md",
  "changelog.md",
  "security.md",
  "contributing.md",
  "code_of_conduct.md",
  "license",
  "authors.md",
  "credits.md",
]);

/**
 * Scan text content for blocked patterns.
 */
export function scanText(text: string, label = ""): ScanFinding[] {
  const findings: ScanFinding[] = [];
  for (const { regex, description } of BLOCKED_PATTERNS) {
    const match = regex.exec(text);
    if (match) {
      const start = Math.max(0, match.index - 10);
      const context = text.slice(start, match.index + match[0].length + 20).replace(/\n/g, " ");
      findings.push({ file: label, pattern: description, context: `...${context}...` });
    }
  }
  return findings;
}

/**
 * Categorize a skill repo into a target directory category.
 */
export function inferCategory(fullName: string, description: string): string {
  const text = `${fullName} ${description}`.toLowerCase();
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

/**
 * Resolve install path for a target + skill name.
 */
export function resolveInstallPath(
  target: InstallTarget,
  skillName: string,
  description: string
): string {
  const category = inferCategory(skillName, description);
  let template = INSTALL_PATHS[target];
  if (!template) throw new Error(`Unknown install target: ${target}`);
  template = template.replace("{category}", category);
  const home =
    typeof process !== "undefined" && process.env?.HOME
      ? process.env.HOME
      : typeof process !== "undefined" && process.env?.USERPROFILE
        ? process.env.USERPROFILE
        : "";
  return template.replace("~", home).replace("{name}", skillName);
}

// ── GitHub API Search ────────────────────────────────────────────────────────

export const QUERY_STRATEGIES = {
  file: [
    "filename:SKILL.md stars:>=1",
    "filename:CLAUDE.md stars:>=1",
    "filename:CODEX.md stars:>=1",
    "filename:CURSOR.md stars:>=1",
    "filename:.cursorrules stars:>=1",
    "filename:AGENTS.md stars:>=1",
    "filename:COPILOT.md stars:>=1",
    "filename:.clauderules stars:>=1",
    "filename:copilot-instructions.md stars:>=1",
    "filename:INSTRUCTIONS.md stars:>=1",
  ],
  name: [
    "agent skill in:name stars:>=3",
    "skill-pack in:name stars:>=3",
    "cursor rules in:name stars:>=3",
    "claude rules in:name stars:>=3",
    "agent codex in:name stars:>=3",
    "mcp server in:name,topic stars:>=3",
    "llm agent in:name stars:>=5",
  ],
  description: [
    "agent skill in:description stars:>=5",
    "SKILL.md in:description stars:>=3",
    "LLM agent tool in:description stars:>=5",
  ],
} as const;

export interface SearchOptions {
  token?: string;
  minStars?: number;
  maxResults?: number;
}

/**
 * Search GitHub for agent skill repos.
 * Returns scored results sorted by score descending.
 */
export async function searchGitHubSkills(
  options: SearchOptions = {}
): Promise<{ repos: GitHubSkillRepo[]; errors: string[] }> {
  const { token = process.env.GITHUB_TOKEN || "", minStars = 1, maxResults = 100 } = options;
  const seen = new Set<string>();
  const repos: GitHubSkillRepo[] = [];
  const errors: string[] = [];

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const allQueries = [
    ...QUERY_STRATEGIES.file,
    ...QUERY_STRATEGIES.name,
    ...QUERY_STRATEGIES.description,
  ];

  for (const query of allQueries) {
    if (repos.length >= maxResults) break;
    try {
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=30`;
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
      if (!res.ok) {
        if (res.status === 403) {
          errors.push("GitHub API rate limited — add a GITHUB_TOKEN");
          break;
        }
        if (res.status === 422) continue; // bad query, skip
        errors.push(`GitHub API ${res.status} for query: ${query.slice(0, 40)}`);
        continue;
      }
      const data = (await res.json()) as { items?: any[] };
      for (const item of data.items || []) {
        if (repos.length >= maxResults) break;
        if (seen.has(item.full_name)) continue;
        if ((item.stargazers_count ?? 0) < minStars) continue;
        seen.add(item.full_name);

        repos.push({
          fullName: item.full_name,
          htmlUrl: item.html_url,
          description: item.description || "",
          stars: item.stargazers_count ?? 0,
          forks: item.forks_count ?? 0,
          topics: item.topics || [],
          score: scoreRepo({
            fullName: item.full_name,
            description: item.description || "",
            stars: item.stargazers_count ?? 0,
            forks: item.forks_count ?? 0,
            hasLicense: !!item.license,
            topics: item.topics || [],
          }),
          hasSkillFile: SKILL_FILE_SIGNALS.some((s) => item.full_name.toLowerCase().includes(s)),
          isAwesome: item.full_name.toLowerCase().includes("awesome"),
          updatedAt: item.updated_at || null,
          license: item.license?.spdx_id || null,
        });
      }
    } catch (err) {
      errors.push(`Query "${query.slice(0, 30)}…" failed: ${(err as Error).message}`);
    }
  }

  repos.sort((a, b) => b.score - a.score);
  return { repos, errors };
}

// ── Zod Schemas for MCP tools ────────────────────────────────────────────────

export const GitHubSkillsSearchSchema = z.object({
  query: z.string().optional().describe("Optional search text to filter results"),
  minStars: z.number().min(0).max(100000).default(1).describe("Minimum GitHub stars"),
  maxResults: z.number().min(1).max(500).default(50).describe("Max repos to return"),
  minScore: z.number().min(0).max(1).default(0).describe("Minimum relevance score filter"),
});

export const GitHubSkillsScanSchema = z.object({
  repoName: z.string().describe("Full repo name (e.g. 'user/repo')"),
  content: z.string().describe("SKILL.md or README content to scan"),
});

export const GitHubSkillsInstallSchema = z.object({
  repoName: z.string().describe("Full repo name to install"),
  targets: z
    .array(z.enum(INSTALL_TARGETS))
    .default(["hermes"])
    .describe("Where to install the skill"),
  description: z.string().default("").describe("Repo description for category inference"),
});
