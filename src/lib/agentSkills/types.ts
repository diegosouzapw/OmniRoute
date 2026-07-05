export type SkillCategory = "api" | "cli" | "config";

export type SkillArea =
  // API areas (22)
  | "auth"
  | "providers"
  | "models"
  | "combos-routing"
  | "api-keys"
  | "usage-logs"
  | "budget"
  | "settings"
  | "proxies"
  | "cache"
  | "compression"
  | "context-rtk"
  | "resilience"
  | "cli-tools"
  | "tunnels"
  | "sync-cloud"
  | "db-backups"
  | "webhooks"
  | "mcp"
  | "agents-a2a"
  | "version-manager"
  | "inference"
  // GitHub skills
  | "github-skills"
  // Config skills
  | "config-codex-cli"
  // CLI families (20)
  | "cli-serve"
  | "cli-health"
  | "cli-providers"
  | "cli-keys"
  | "cli-models"
  | "cli-chat"
  | "cli-routing"
  | "cli-resilience"
  | "cli-compression"
  | "cli-contexts"
  | "cli-cost-usage"
  | "cli-mcp"
  | "cli-a2a"
  | "cli-tunnel"
  | "cli-backup-sync"
  | "cli-policy-audit"
  | "cli-batches"
  | "cli-eval"
  | "cli-plugins-skills"
  | "cli-setup";

export interface AgentSkill {
  id: string; // canonical id (e.g. "omni-providers", "cli-serve")
  name: string; // human-readable
  description: string; // 1-paragraph
  category: SkillCategory;
  area: SkillArea;
  endpoints?: string[]; // e.g. ["POST /api/providers", "GET /api/providers/:id"] (api only)
  cliCommands?: string[]; // e.g. ["providers list", "providers test", "providers rotate"] (cli only)
  icon?: string; // Material symbol name
  isEntry?: boolean; // "start here" tag
  isNew?: boolean; // "new" tag
  rawUrl: string; // GitHub raw URL of SKILL.md
  githubUrl: string; // GitHub blob URL
}

export interface SkillCoverage {
  api: { have: number; total: 23 };
  cli: { have: number; total: 20 };
  config: { have: number; total: number };
  totalSkills: number; // sum
  generatedAt: string; // ISO datetime
}

export interface SkillCatalogEntry extends AgentSkill {
  // No additional fields; alias for AgentSkill at catalog-level.
}

export interface SkillMarkdown {
  id: string;
  frontmatter: { name: string; description: string };
  body: string; // raw markdown after frontmatter
  source: "filesystem" | "github" | "generated";
  fetchedAt: string; // ISO
}

export interface GeneratorOptions {
  dryRun: boolean; // default true
  prune: boolean; // default false
  outputDir?: string; // default "skills/"
  onlyIds?: string[]; // regenerate only these
}

export interface GeneratorReport {
  generated: string[]; // ids that got new/updated SKILL.md
  unchanged: string[]; // ids that already match
  pruned: string[]; // ids whose folder was deleted (prune mode)
  orphansDetected: string[]; // ids in repo that aren't in catalog (prune dry-run shows these)
  errors: Array<{ id: string; error: string }>;
}
