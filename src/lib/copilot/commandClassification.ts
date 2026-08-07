/**
 * Command classification for runOmniRouteCli approval gate (#8461).
 *
 * Defines a classification table mapping CLI subcommand patterns to safety
 * categories, plus the classifier function. Read-only commands execute
 * directly; all others are blocked with a warning asserting operator intent.
 * Unknown commands are denied by default (no matching rule → blocked).
 */

export type CommandCategory =
  | "read-only"
  | "mutating"
  | "destructive"
  | "secret-affecting";

export interface ClassificationRule {
  pattern: RegExp;
  category: CommandCategory;
  reason: string;
}

const CLASSIFICATION_RULES: ClassificationRule[] = [
  // ── Destructive (highest priority) ──
  {
    pattern: /\b(?:delete|remove|rm|drop|uninstall|reset)\b/i,
    category: "destructive",
    reason:
      "This operation permanently removes or resets data and cannot be undone.",
  },

  // ── Secret-affecting ──
  {
    pattern:
      /\b(?:show.*(?:secret|key|token|credential)|key.*show|export|auth.*token)\b/i,
    category: "secret-affecting",
    reason:
      "This operation may expose secrets or credentials in the output.",
  },

  // ── Mutating ──
  {
    pattern:
      /\b(?:set|create|add|update|config\s+set|config\s+unset|providers?\s+add|keys?\s+create|keys?\s+revoke|settings?\s+update)\b/i,
    category: "mutating",
    reason:
      "This operation changes configuration or creates resources.",
  },

  // ── Read-only (lowest priority — checked last) ──
  {
    pattern:
      /\b(?:status|doctor|health|version|help|list|show|get|config\s+list|providers?\s+list|keys?\s+list|logs|models?)\b/i,
    category: "read-only",
    reason:
      "This operation only reads data and does not make changes.",
  },
];

/**
 * Classify a CLI command argv array into a category and matching rule.
 * Iterates rules in priority order (destructive → secret-affecting →
 * mutating → read-only). Returns null when no rule matches (unknown
 * command — denied by default).
 */
export function classifyCommand(argv: string[]): {
  category: CommandCategory;
  rule: ClassificationRule;
} | null {
  const cmdLine = argv.join(" ");

  for (const rule of CLASSIFICATION_RULES) {
    if (rule.pattern.test(cmdLine)) {
      return { category: rule.category, rule };
    }
  }

  return null;
}
