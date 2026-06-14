/**
 * catalog.ts — single source of truth for the 43-entry Agent Skills catalog.
 *
 * Consumers: REST routes (/api/agent-skills/*), MCP tools, A2A skill, Generator.
 * Do NOT import this from UI components directly — use the REST API instead.
 */

import fs from "node:fs";
import path from "node:path";
import type { AgentSkill, SkillCoverage, SkillMarkdown } from "./types";
import { CURATED_SKILLS, getAgentSkillRawUrl, getAgentSkillBlobUrl } from "@/shared/constants/agentSkills";

// ── Canonical ID lists (D28) ────────────────────────────────────────────────

/** 22 canonical API skill IDs, in spec order. */
export const API_SKILL_IDS: readonly string[] = [
  "omni-auth",
  "omni-providers",
  "omni-models",
  "omni-combos-routing",
  "omni-api-keys",
  "omni-usage-logs",
  "omni-budget",
  "omni-settings",
  "omni-proxies",
  "omni-cache",
  "omni-compression",
  "omni-context-rtk",
  "omni-resilience",
  "omni-cli-tools",
  "omni-tunnels",
  "omni-sync-cloud",
  "omni-db-backups",
  "omni-webhooks",
  "omni-mcp",
  "omni-agents-a2a",
  "omni-version-manager",
  "omni-inference",
] as const;

/** Config skill IDs. */
export const CONFIG_SKILL_IDS: readonly string[] = [
  "config-codex-cli",
] as const;

/** 20 canonical CLI skill IDs, in spec order. */
export const CLI_SKILL_IDS: readonly string[] = [
  "cli-serve",
  "cli-health",
  "cli-providers",
  "cli-keys",
  "cli-models",
  "cli-chat",
  "cli-routing",
  "cli-resilience",
  "cli-compression",
  "cli-contexts",
  "cli-cost-usage",
  "cli-mcp",
  "cli-a2a",
  "cli-tunnel",
  "cli-backup-sync",
  "cli-policy-audit",
  "cli-batches",
  "cli-eval",
  "cli-plugins-skills",
  "cli-setup",
] as const;

// ── Module-scope cache ──────────────────────────────────────────────────────

let _cache: AgentSkill[] | null = null;

// ── Helpers ─────────────────────────────────────────────────────────────────

function buildFullSkill(
  curated: (typeof CURATED_SKILLS)[number],
): AgentSkill {
  return {
    ...curated,
    endpoints: curated.category === "api" ? [] : undefined,
    cliCommands: curated.category === "cli" ? [] : undefined,
    rawUrl: getAgentSkillRawUrl(curated.id),
    githubUrl: getAgentSkillBlobUrl(curated.id),
  };
}

function deriveCatalog(): AgentSkill[] {
  return CURATED_SKILLS.map(buildFullSkill);
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the full catalog (43 entries). Cached in module scope after first call.
 * Safe to call multiple times — re-derives only after `refreshCatalog()`.
 */
export function getCatalog(): AgentSkill[] {
  if (!_cache) {
    _cache = deriveCatalog();
  }
  return _cache;
}

/** Returns single skill metadata or null. */
export function getSkillById(id: string): AgentSkill | null {
  return getCatalog().find((s) => s.id === id) ?? null;
}

/** Filters catalog by category and/or area. */
export function filterCatalog(opts: { category?: "api" | "cli"; area?: string }): AgentSkill[] {
  let skills = getCatalog();
  if (opts.category) {
    skills = skills.filter((s) => s.category === opts.category);
  }
  if (opts.area) {
    skills = skills.filter((s) => s.area === opts.area);
  }
  return skills;
}

/**
 * Computes coverage stats: filesystem has SKILL.md vs catalog declares 42.
 * Reads `skills/` relative to the project root (CWD).
 */
export function computeCoverage(): SkillCoverage {
  const catalog = getCatalog();
  const skillsDir = path.resolve(process.cwd(), "skills");

  let presentIds: Set<string>;
  try {
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    presentIds = new Set(
      entries
        .filter((e) => e.isDirectory())
        .filter((e) => fs.existsSync(path.join(skillsDir, e.name, "SKILL.md")))
        .map((e) => e.name),
    );
  } catch {
    // Directory doesn't exist yet — zero coverage
    presentIds = new Set();
  }

  const apiHave = catalog.filter((s) => s.category === "api" && presentIds.has(s.id)).length;
  const cliHave = catalog.filter((s) => s.category === "cli" && presentIds.has(s.id)).length;
  const configTotal = CONFIG_SKILL_IDS.length;
  const configHave = catalog.filter((s) => s.category === "config" && presentIds.has(s.id)).length;

  return {
    api: { have: apiHave, total: 22 },
    cli: { have: cliHave, total: 20 },
    config: { have: configHave, total: configTotal },
    totalSkills: apiHave + cliHave + configHave,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Forces re-derivation of the catalog on next `getCatalog()` call.
 * Used by tests and by the generator after writing new SKILL.md files.
 */
export function refreshCatalog(): void {
  _cache = null;
}

/**
 * Fetches the SKILL.md content for a given skill ID.
 *
 * Resolution order:
 *  1. Local filesystem `skills/{id}/SKILL.md` (fast, used during dev + after generation)
 *  2. GitHub raw URL with 1-hour cache (production fallback when file not yet generated)
 *
 * Returns a `SkillMarkdown` shape. Throws if both sources fail.
 * Used by: F4 `/api/agent-skills/[id]/raw` route.
 */
export async function fetchSkillMarkdown(id: string): Promise<SkillMarkdown> {
  const localPath = path.resolve(process.cwd(), "skills", id, "SKILL.md");

  // 1. Try filesystem first
  try {
    const raw = fs.readFileSync(localPath, "utf-8");
    const parsed = parseMarkdownFrontmatter(raw);
    return {
      id,
      frontmatter: parsed.frontmatter,
      body: parsed.body,
      source: "filesystem",
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    // File not present locally — fall through to GitHub
  }

  // 2. Fetch from GitHub raw (with Next.js revalidate cache if available)
  const skill = getSkillById(id);
  if (!skill) {
    throw new Error(`Skill not found in catalog: ${id}`);
  }

  const response = await fetch(
    skill.rawUrl,
    { next: { revalidate: 3600 } } as unknown as RequestInit
  );

  if (!response.ok) {
    throw new Error(`GitHub raw fetch failed: HTTP ${response.status} for ${skill.rawUrl}`);
  }

  const raw = await response.text();
  const parsed = parseMarkdownFrontmatter(raw);

  return {
    id,
    frontmatter: parsed.frontmatter,
    body: parsed.body,
    source: "github",
    fetchedAt: new Date().toISOString(),
  };
}

// ── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Parses YAML frontmatter from a markdown string.
 * Expects: `---\nkey: value\n---\n<body>` format.
 * Returns default values if frontmatter is absent or malformed.
 */
function parseMarkdownFrontmatter(content: string): {
  frontmatter: { name: string; description: string };
  body: string;
} {
  const FM_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = FM_REGEX.exec(content);

  if (!match) {
    return {
      frontmatter: { name: "", description: "" },
      body: content,
    };
  }

  const yamlBlock = match[1];
  const body = match[2] ?? "";

  // Simple key: value extraction (avoids importing js-yaml here to stay lightweight)
  const nameMatch = /^name:\s*(.+)$/m.exec(yamlBlock);
  const descMatch = /^description:\s*(.+)$/m.exec(yamlBlock);

  return {
    frontmatter: {
      name: nameMatch ? nameMatch[1].trim().replace(/^["']|["']$/g, "") : "",
      description: descMatch ? descMatch[1].trim().replace(/^["']|["']$/g, "") : "",
    },
    body,
  };
}
