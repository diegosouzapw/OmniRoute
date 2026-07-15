import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { parse as parseToml } from "smol-toml";
import { z } from "zod";
import { isReDoSProne, type RtkFilterDefinition } from "./filterSchema.ts";
import { applyLineFilter } from "./lineFilter.ts";

const MAX_TOML_BYTES = 1024 * 1024;

const replaceRuleSchema = z
  .object({
    pattern: z.string().min(1),
    replacement: z.string(),
  })
  .strict();

const matchOutputRuleSchema = z
  .object({
    pattern: z.string().min(1),
    message: z.string(),
    unless: z.string().min(1).optional(),
  })
  .strict();

const filterSchema = z
  .object({
    description: z.string().optional(),
    match_command: z.string().min(1),
    strip_ansi: z.boolean().optional(),
    filter_stderr: z.boolean().optional(),
    strip_lines_matching: z.array(z.string()).optional(),
    keep_lines_matching: z.array(z.string()).optional(),
    replace: z.array(replaceRuleSchema).optional(),
    match_output: z.array(matchOutputRuleSchema).optional(),
    truncate_lines_at: z.number().int().min(0).optional(),
    head_lines: z.number().int().min(0).optional(),
    tail_lines: z.number().int().min(0).optional(),
    max_lines: z.number().int().min(0).optional(),
    on_empty: z.string().optional(),
  })
  .strict();

const inlineTestSchema = z
  .object({
    name: z.string().min(1),
    input: z.string(),
    expected: z.string(),
  })
  .strict();

const fileSchema = z
  .object({
    schema_version: z.literal(1),
    filters: z.record(z.string().min(1), filterSchema).default({}),
    tests: z.record(z.string().min(1), z.array(inlineTestSchema)).default({}),
  })
  .strict();

type ParsedFilter = z.infer<typeof filterSchema>;

function arrayOrEmpty<T>(value: T[] | undefined): T[] {
  return value ?? [];
}

function numberOrZero(value: number | undefined): number {
  return value ?? 0;
}

export interface RtkTomlTestOutcome {
  filterId: string;
  testName: string;
  passed: boolean;
  actual: string;
  expected: string;
}

export interface RtkTomlCompatibilityResult {
  schemaVersion: 1;
  sha256: string;
  filters: RtkFilterDefinition[];
  outcomes: RtkTomlTestOutcome[];
  filtersWithoutTests: string[];
  warnings: string[];
  passed: boolean;
}

export class RtkTomlCompatibilityError extends Error {
  readonly publicMessage: string;

  constructor(message: string) {
    super("RTK TOML schema v1 compatibility error");
    this.name = "RtkTomlCompatibilityError";
    this.publicMessage = message;
  }
}

function compatibilityError(message: string): RtkTomlCompatibilityError {
  return new RtkTomlCompatibilityError(message);
}

function categoryFor(name: string, commandPattern: string): RtkFilterDefinition["category"] {
  const value = `${name} ${commandPattern}`.toLowerCase();
  if (/\b(?:git|gh)\b/.test(value)) return "git";
  if (/\b(?:test|jest|vitest|pytest|cargo test|go test|rspec|playwright)\b/.test(value)) {
    return "test";
  }
  if (/\b(?:build|tsc|eslint|ruff|clippy|gradle|make|next|vite|webpack)\b/.test(value)) {
    return "build";
  }
  if (/\b(?:docker|kubectl|podman|compose)\b/.test(value)) return "docker";
  if (/\b(?:npm|pnpm|yarn|bun|pip|poetry|uv|bundle|composer)\b/.test(value)) {
    return "package";
  }
  if (/\b(?:terraform|tofu|ansible|helm|pulumi)\b/.test(value)) return "infra";
  if (/\b(?:aws|gcloud|az|cloudflare)\b/.test(value)) return "cloud";
  if (/\b(?:ls|find|grep|rg|df|du|ps|systemctl|ssh|rsync)\b/.test(value)) return "shell";
  return "generic";
}

function regexFields(filter: ParsedFilter): Array<{ field: string; pattern: string }> {
  return [
    { field: "match_command", pattern: filter.match_command },
    ...(filter.strip_lines_matching ?? []).map((pattern) => ({
      field: "strip_lines_matching",
      pattern,
    })),
    ...(filter.keep_lines_matching ?? []).map((pattern) => ({
      field: "keep_lines_matching",
      pattern,
    })),
    ...(filter.replace ?? []).map(({ pattern }) => ({ field: "replace.pattern", pattern })),
    ...(filter.match_output ?? []).flatMap(({ pattern, unless }) => [
      { field: "match_output.pattern", pattern },
      ...(unless ? [{ field: "match_output.unless", pattern: unless }] : []),
    ]),
  ];
}

function validateRegexes(name: string, filter: ParsedFilter): void {
  for (const { field, pattern } of regexFields(filter)) {
    if (isReDoSProne(pattern)) {
      throw compatibilityError(`filter '${name}' has an unsafe regex in ${field}`);
    }
    try {
      new RegExp(pattern);
    } catch {
      throw compatibilityError(`filter '${name}' has an invalid regex in ${field}`);
    }
  }
}

function toDefinition(
  name: string,
  filter: ParsedFilter,
  tests: z.infer<typeof inlineTestSchema>[]
): RtkFilterDefinition {
  if (
    (filter.strip_lines_matching?.length ?? 0) > 0 &&
    (filter.keep_lines_matching?.length ?? 0) > 0
  ) {
    throw compatibilityError(
      `filter '${name}' cannot combine strip_lines_matching with keep_lines_matching`
    );
  }
  validateRegexes(name, filter);
  return {
    id: name,
    name,
    description: filter.description ?? "",
    commandTypes: [],
    commandPatterns: [filter.match_command],
    matchPatterns: [],
    category: categoryFor(name, filter.match_command),
    priority: 50,
    stripPatterns: arrayOrEmpty(filter.strip_lines_matching),
    keepPatterns: arrayOrEmpty(filter.keep_lines_matching),
    priorityPatterns: [],
    collapsePatterns: [],
    stripAnsi: filter.strip_ansi ?? false,
    replace: arrayOrEmpty(filter.replace),
    matchOutput: arrayOrEmpty(filter.match_output),
    truncateLineAt: numberOrZero(filter.truncate_lines_at),
    onEmpty: filter.on_empty ?? "",
    filterStderr: false,
    deduplicate: false,
    maxLines: numberOrZero(filter.max_lines),
    preserveHead: 0,
    preserveTail: 0,
    rtkTomlHeadLines: filter.head_lines,
    rtkTomlTailLines: filter.tail_lines,
    rtkTomlMaxLines: filter.max_lines,
    sourceFormat: "rtk-toml-v1",
    tests,
  };
}

function comparable(value: string): string {
  return value.replace(/\n+$/g, "");
}

function tomlSyntaxLocation(error: unknown): string {
  if (typeof error !== "object" || error === null) return "";
  const { line, column } = error as { line?: unknown; column?: unknown };
  if (!Number.isSafeInteger(line) || !Number.isSafeInteger(column)) return "";
  return ` (line ${line}, column ${column})`;
}

export function parseRtkTomlV1(content: string): RtkTomlCompatibilityResult {
  if (Buffer.byteLength(content, "utf8") > MAX_TOML_BYTES) {
    throw compatibilityError(`file exceeds the ${MAX_TOML_BYTES}-byte limit`);
  }

  let raw: unknown;
  try {
    raw = parseToml(content);
  } catch (error) {
    throw compatibilityError(`invalid TOML syntax${tomlSyntaxLocation(error)}`);
  }

  const parsed = fileSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path.length ? issue.path.join(".") : "document";
    throw compatibilityError(`${field}: ${issue?.message ?? "invalid document"}`);
  }
  if (Object.keys(parsed.data.filters).length === 0) {
    throw compatibilityError("document contains no filters");
  }

  for (const testName of Object.keys(parsed.data.tests)) {
    if (!(testName in parsed.data.filters)) {
      throw compatibilityError(`tests reference unknown filter '${testName}'`);
    }
  }

  const filters = Object.entries(parsed.data.filters).map(([name, filter]) =>
    toDefinition(name, filter, parsed.data.tests[name] ?? [])
  );
  const outcomes = filters.flatMap((filter) =>
    filter.tests.map((test) => {
      const actual = comparable(applyLineFilter(test.input, filter).text);
      const expected = comparable(test.expected);
      return {
        filterId: filter.id,
        testName: test.name,
        passed: actual === expected,
        actual,
        expected,
      };
    })
  );
  const filtersWithoutTests = filters
    .filter((filter) => filter.tests.length === 0)
    .map((filter) => filter.id);
  const warnings = filtersWithoutTests.map(
    (id) => `Filter '${id}' has no inline tests and should be reviewed before installation`
  );
  for (const [id, filter] of Object.entries(parsed.data.filters)) {
    if (filter.filter_stderr) {
      warnings.push(
        `Filter '${id}': filter_stderr is accepted as a no-op because OmniRoute receives already-captured tool output`
      );
    }
  }

  return {
    schemaVersion: 1,
    sha256: crypto.createHash("sha256").update(content).digest("hex"),
    filters,
    outcomes,
    filtersWithoutTests,
    warnings,
    passed: outcomes.every((outcome) => outcome.passed),
  };
}

function getDataDir(): string {
  return process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");
}

export function getGlobalRtkTomlPath(): string {
  return path.join(getDataDir(), "rtk", "filters.toml");
}

export function installGlobalRtkTomlV1(
  content: string,
  options: { overwrite?: boolean } = {}
): RtkTomlCompatibilityResult & { installedPath: string; backupCreated: boolean } {
  const result = parseRtkTomlV1(content);
  if (!result.passed) {
    throw compatibilityError("one or more inline tests failed");
  }

  const target = getGlobalRtkTomlPath();
  const directory = path.dirname(target);
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  try {
    fs.chmodSync(directory, 0o700);
  } catch {
    // Best effort on filesystems that do not support POSIX permissions.
  }
  if (fs.existsSync(target) && !options.overwrite) {
    throw compatibilityError("filters.toml already exists; confirm overwrite to replace it");
  }

  let backupCreated = false;
  if (fs.existsSync(target)) {
    fs.copyFileSync(target, `${target}.bak`);
    try {
      fs.chmodSync(`${target}.bak`, 0o600);
    } catch {
      // Best effort on filesystems that do not support POSIX permissions.
    }
    backupCreated = true;
  }
  const temporary = `${target}.${process.pid}.${crypto.randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporary, content, { encoding: "utf8", mode: 0o600, flag: "wx" });
    fs.renameSync(temporary, target);
    try {
      fs.chmodSync(target, 0o600);
    } catch {
      // Best effort on filesystems that do not support POSIX permissions.
    }
  } finally {
    fs.rmSync(temporary, { force: true });
  }

  return { ...result, installedPath: "rtk/filters.toml", backupCreated };
}

export const RTK_TOML_MAX_BYTES = MAX_TOML_BYTES;
