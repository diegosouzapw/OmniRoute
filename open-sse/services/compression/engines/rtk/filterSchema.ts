import { z } from "zod";

const rtkFilterCategorySchema = z.enum([
  "git",
  "test",
  "build",
  "shell",
  "docker",
  "package",
  "infra",
  "cloud",
  "generic",
]);

const rtkReplaceRuleSchema = z
  .object({
    pattern: z.string().min(1),
    replacement: z.string(),
  })
  .strict();

const rtkMatchOutputRuleSchema = z
  .object({
    pattern: z.string().min(1),
    message: z.string(),
    unless: z.string().min(1).optional(),
  })
  .strict();

const rtkInlineTestSchema = z
  .object({
    name: z.string().min(1),
    input: z.string(),
    expected: z.string(),
    command: z.string().optional(),
  })
  .strict();

const rtkFilterMatchSchema = z
  .object({
    commands: z.array(z.string().min(1)).default([]),
    patterns: z.array(z.string().min(1)).default([]),
    outputTypes: z.array(z.string().min(1)).default([]),
  })
  .strict();

const rtkFilterRulesSchema = z
  .object({
    stripAnsi: z.boolean().default(false),
    replace: z.array(rtkReplaceRuleSchema).default([]),
    matchOutput: z.array(rtkMatchOutputRuleSchema).default([]),
    includePatterns: z.array(z.string()).default([]),
    dropPatterns: z.array(z.string()).default([]),
    collapsePatterns: z.array(z.string()).default([]),
    deduplicate: z.boolean().default(false),
    truncateLineAt: z.number().int().min(0).default(0),
    maxLines: z.number().int().min(0).default(0),
    headLines: z.number().int().min(0).default(20),
    tailLines: z.number().int().min(0).default(20),
    onEmpty: z.string().default(""),
    filterStderr: z.boolean().default(false),
  })
  .strict();

const rtkFilterPreserveSchema = z
  .object({
    errorPatterns: z.array(z.string()).default([]),
    summaryPatterns: z.array(z.string()).default([]),
  })
  .strict();

export const rtkFilterPackSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    description: z.string().default(""),
    category: rtkFilterCategorySchema,
    priority: z.number().int().min(0).max(100).default(50),
    match: rtkFilterMatchSchema,
    rules: rtkFilterRulesSchema.default({}),
    preserve: rtkFilterPreserveSchema.default({}),
    tests: z.array(rtkInlineTestSchema).default([]),
  })
  .strict();

const legacyRtkFilterSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().default(""),
    commandTypes: z.array(z.string().min(1)).min(1),
    category: rtkFilterCategorySchema,
    priority: z.number().int().min(0).max(100).default(50),
    stripPatterns: z.array(z.string()).default([]),
    keepPatterns: z.array(z.string()).default([]),
    priorityPatterns: z.array(z.string()).default([]),
    collapsePatterns: z.array(z.string()).default([]),
    stripAnsi: z.boolean().default(false),
    replace: z.array(rtkReplaceRuleSchema).default([]),
    matchOutput: z.array(rtkMatchOutputRuleSchema).default([]),
    truncateLineAt: z.number().int().min(0).default(0),
    onEmpty: z.string().default(""),
    filterStderr: z.boolean().default(false),
    maxLines: z.number().int().min(0).default(0),
    preserveHead: z.number().int().min(0).default(20),
    preserveTail: z.number().int().min(0).default(20),
    tests: z.array(rtkInlineTestSchema).default([]),
  })
  .strict();

export const rtkFilterSchema = z.union([rtkFilterPackSchema, legacyRtkFilterSchema]);

export type RtkFilterPack = z.infer<typeof rtkFilterPackSchema>;

export interface RtkFilterDefinition {
  id: string;
  name: string;
  description: string;
  commandTypes: string[];
  commandPatterns: string[];
  matchPatterns: string[];
  category: z.infer<typeof rtkFilterCategorySchema>;
  priority: number;
  stripPatterns: string[];
  keepPatterns: string[];
  priorityPatterns: string[];
  collapsePatterns: string[];
  stripAnsi: boolean;
  replace: Array<{ pattern: string; replacement: string }>;
  matchOutput: Array<{ pattern: string; message: string; unless?: string }>;
  truncateLineAt: number;
  onEmpty: string;
  filterStderr: boolean;
  deduplicate: boolean;
  maxLines: number;
  preserveHead: number;
  preserveTail: number;
  tests: Array<{ name: string; input: string; expected: string; command?: string }>;
}

function isCanonicalFilter(value: z.infer<typeof rtkFilterSchema>): value is RtkFilterPack {
  return "label" in value && "match" in value && "rules" in value;
}

export function validateRtkFilter(value: unknown): RtkFilterDefinition {
  const parsed = rtkFilterSchema.parse(value);
  if (!isCanonicalFilter(parsed)) {
    return {
      ...parsed,
      commandPatterns: [],
      matchPatterns: [],
      deduplicate: parsed.collapsePatterns.length > 0,
    };
  }

  const preservePatterns = [...parsed.preserve.errorPatterns, ...parsed.preserve.summaryPatterns];
  return {
    id: parsed.id,
    name: parsed.label,
    description: parsed.description,
    commandTypes: parsed.match.outputTypes,
    commandPatterns: parsed.match.commands,
    matchPatterns: parsed.match.patterns,
    category: parsed.category,
    priority: parsed.priority,
    stripPatterns: parsed.rules.dropPatterns,
    keepPatterns: parsed.rules.includePatterns,
    priorityPatterns: preservePatterns,
    collapsePatterns: parsed.rules.collapsePatterns,
    stripAnsi: parsed.rules.stripAnsi,
    replace: parsed.rules.replace,
    matchOutput: parsed.rules.matchOutput,
    truncateLineAt: parsed.rules.truncateLineAt,
    onEmpty: parsed.rules.onEmpty,
    filterStderr: parsed.rules.filterStderr,
    deduplicate: parsed.rules.deduplicate,
    maxLines: parsed.rules.maxLines,
    preserveHead: parsed.rules.headLines,
    preserveTail: parsed.rules.tailLines,
    tests: parsed.tests,
  };
}
