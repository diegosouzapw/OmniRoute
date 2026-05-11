import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CavemanIntensity, CavemanRule } from "./types.ts";

type CavemanRuleCategory = NonNullable<CavemanRule["category"]>;
type CavemanRuleContext = CavemanRule["context"];

interface FileRule {
  name: string;
  pattern: string;
  replacement?: string;
  replacementMap?: Record<string, string>;
  flags?: string;
  context?: CavemanRuleContext;
  category?: CavemanRuleCategory;
  minIntensity?: CavemanIntensity;
  description?: string;
}

interface RulePack {
  language: string;
  category: string;
  rules: FileRule[];
}

export interface RulePackMetadata {
  language: string;
  categories: string[];
  ruleCount: number;
}

const VALID_CONTEXTS = new Set(["all", "user", "system", "assistant"]);
const VALID_CATEGORIES = new Set(["filler", "context", "structural", "dedup", "terse", "ultra"]);
const VALID_INTENSITIES = new Set(["lite", "full", "ultra"]);
const cache = new Map<string, CavemanRule[]>();
let rulesDirCache: string | null = null;

function normalizeReplacementKey(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function compileReplacement(rule: FileRule): CavemanRule["replacement"] {
  if (!rule.replacementMap) return rule.replacement ?? "";

  const normalizedMap = new Map(
    Object.entries(rule.replacementMap).map(([key, value]) => [normalizeReplacementKey(key), value])
  );
  const fallback = rule.replacement;
  return (match: string) => {
    const normalized = normalizeReplacementKey(match);
    if (normalizedMap.has(normalized)) return normalizedMap.get(normalized) ?? "";
    return fallback ?? match;
  };
}

function getRuleFlags(rule: FileRule): string {
  return rule.flags ?? "gi";
}

function getRulesDir(): string {
  if (rulesDirCache) return rulesDirCache;
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.join(moduleDir, "rules"),
    path.join(moduleDir, "..", "services", "compression", "rules"),
    path.join(process.cwd(), "open-sse", "services", "compression", "rules"),
    path.join(process.cwd(), "app", "open-sse", "services", "compression", "rules"),
  ];
  rulesDirCache =
    candidates.find((candidate, index) => {
      return candidates.indexOf(candidate) === index && fs.existsSync(candidate);
    }) ?? candidates[0];
  return rulesDirCache;
}

function compileRule(rule: FileRule, source: string): CavemanRule {
  try {
    const flags = getRuleFlags(rule);
    return {
      name: rule.name,
      pattern: new RegExp(rule.pattern, flags),
      replacement: compileReplacement(rule),
      context: rule.context ?? "all",
      category: rule.category ?? "filler",
      minIntensity: rule.minIntensity ?? "lite",
      description: rule.description,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid Caveman rule pattern in ${source}:${rule.name}: ${message}`);
  }
}

export function validateRulePack(pack: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!pack || typeof pack !== "object") {
    return { valid: false, errors: ["Rule pack must be an object"] };
  }

  const value = pack as Partial<RulePack>;
  if (typeof value.language !== "string" || !value.language.trim()) {
    errors.push("language must be a non-empty string");
  }
  if (typeof value.category !== "string" || !value.category.trim()) {
    errors.push("category must be a non-empty string");
  }
  if (!Array.isArray(value.rules)) {
    errors.push("rules must be an array");
  } else {
    value.rules.forEach((rule, index) => {
      if (!rule || typeof rule !== "object") {
        errors.push(`rules[${index}] must be an object`);
        return;
      }
      const entry = rule as Partial<FileRule>;
      const flags = typeof entry.flags === "string" ? entry.flags : "gi";
      if (typeof entry.name !== "string" || !entry.name.trim()) {
        errors.push(`rules[${index}].name must be a non-empty string`);
      }
      if (typeof entry.pattern !== "string" || !entry.pattern.trim()) {
        errors.push(`rules[${index}].pattern must be a non-empty string`);
      } else {
        try {
          new RegExp(entry.pattern, flags);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          errors.push(`rules[${index}].pattern is invalid: ${message}`);
        }
      }
      if (entry.flags !== undefined && typeof entry.flags !== "string") {
        errors.push(`rules[${index}].flags must be a string`);
      }
      if (entry.replacement !== undefined && typeof entry.replacement !== "string") {
        errors.push(`rules[${index}].replacement must be a string`);
      }
      if (entry.replacementMap !== undefined) {
        if (
          !entry.replacementMap ||
          typeof entry.replacementMap !== "object" ||
          Array.isArray(entry.replacementMap)
        ) {
          errors.push(`rules[${index}].replacementMap must be an object`);
        } else {
          Object.entries(entry.replacementMap).forEach(([key, replacement]) => {
            if (!key.trim()) {
              errors.push(`rules[${index}].replacementMap contains an empty key`);
            }
            if (typeof replacement !== "string") {
              errors.push(`rules[${index}].replacementMap.${key} must be a string`);
            }
          });
        }
      }
      if (typeof entry.replacement !== "string" && entry.replacementMap === undefined) {
        errors.push(`rules[${index}] must define replacement or replacementMap`);
      }
      if (entry.context !== undefined && !VALID_CONTEXTS.has(entry.context)) {
        errors.push(`rules[${index}].context is invalid`);
      }
      if (entry.category !== undefined && !VALID_CATEGORIES.has(entry.category)) {
        errors.push(`rules[${index}].category is invalid`);
      }
      if (entry.minIntensity !== undefined && !VALID_INTENSITIES.has(entry.minIntensity)) {
        errors.push(`rules[${index}].minIntensity is invalid`);
      }
    });
  }
  return { valid: errors.length === 0, errors };
}

function readPack(language: string, category: string): RulePack | null {
  const filename = path.join(getRulesDir(), language, `${category}.json`);
  if (!fs.existsSync(filename)) return null;
  const parsed = JSON.parse(fs.readFileSync(filename, "utf8")) as unknown;
  const validation = validateRulePack(parsed);
  if (!validation.valid) {
    throw new Error(
      `Invalid Caveman rule pack ${language}/${category}: ${validation.errors.join("; ")}`
    );
  }
  return parsed as RulePack;
}

export function loadRulePack(
  language: string,
  category: string,
  options: { refresh?: boolean } = {}
): CavemanRule[] {
  const key = `${getRulesDir()}:${language}:${category}`;
  if (cache.has(key) && !options.refresh) return cache.get(key) ?? [];

  const pack = readPack(language, category);
  if (!pack) {
    cache.set(key, []);
    return [];
  }

  const rules = pack.rules.map((rule) => compileRule(rule, `${language}/${category}`));
  cache.set(key, rules);
  return rules;
}

export function loadAllRulesForLanguage(
  language: string,
  options: { refresh?: boolean } = {}
): CavemanRule[] {
  const key = `${getRulesDir()}:${language}:*`;
  if (cache.has(key) && !options.refresh) return cache.get(key) ?? [];

  const languageDir = path.join(getRulesDir(), language);
  if (!fs.existsSync(languageDir)) {
    cache.set(key, []);
    return [];
  }

  const rules = fs
    .readdirSync(languageDir)
    .filter((entry) => entry.endsWith(".json"))
    .sort()
    .flatMap((entry) => loadRulePack(language, path.basename(entry, ".json"), options));

  cache.set(key, rules);
  return rules;
}

export function getAvailableLanguagePacks(): RulePackMetadata[] {
  const root = getRulesDir();
  if (!fs.existsSync(root)) return [];

  return fs
    .readdirSync(root)
    .filter((entry) => fs.statSync(path.join(root, entry)).isDirectory())
    .map((language) => {
      const categories = fs
        .readdirSync(path.join(root, language))
        .filter((entry) => entry.endsWith(".json"))
        .map((entry) => path.basename(entry, ".json"))
        .sort();
      const ruleCount = categories.reduce(
        (count, category) => count + loadRulePack(language, category).length,
        0
      );
      return { language, categories, ruleCount };
    })
    .sort((a, b) => a.language.localeCompare(b.language));
}

export function loadCavemanFileRules(
  language: string,
  options: { refresh?: boolean } = {}
): CavemanRule[] {
  return loadAllRulesForLanguage(language, options);
}

export function listCavemanRulePacks(): RulePackMetadata[] {
  return getAvailableLanguagePacks();
}
