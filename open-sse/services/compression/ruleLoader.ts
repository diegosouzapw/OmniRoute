import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CavemanIntensity, CavemanRule } from "./types.ts";

interface FileRule {
  name: string;
  pattern: string;
  replacement: string;
  context?: CavemanRule["context"];
  category?: CavemanRule["category"];
  minIntensity?: CavemanIntensity;
  description?: string;
}

let cache = new Map<string, CavemanRule[]>();

function getRulesDir(): string {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), "rules");
}

function compileRule(rule: FileRule): CavemanRule {
  return {
    name: rule.name,
    pattern: new RegExp(rule.pattern, "gi"),
    replacement: rule.replacement,
    context: rule.context ?? "all",
    category: rule.category ?? "filler",
    minIntensity: rule.minIntensity ?? "lite",
    description: rule.description,
  };
}

export function loadCavemanFileRules(
  language: string,
  options: { refresh?: boolean } = {}
): CavemanRule[] {
  if (cache.has(language) && !options.refresh) return cache.get(language) ?? [];
  const languageDir = path.join(getRulesDir(), language);
  if (!fs.existsSync(languageDir)) {
    cache.set(language, []);
    return [];
  }

  const rules: CavemanRule[] = [];
  for (const file of fs
    .readdirSync(languageDir)
    .filter((entry) => entry.endsWith(".json"))
    .sort()) {
    const parsed = JSON.parse(fs.readFileSync(path.join(languageDir, file), "utf8"));
    const entries = Array.isArray(parsed.rules) ? parsed.rules : [];
    for (const entry of entries) {
      rules.push(compileRule(entry as FileRule));
    }
  }
  cache.set(language, rules);
  return rules;
}

export function listCavemanRulePacks(): Array<{ language: string; ruleCount: number }> {
  const root = getRulesDir();
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((entry) => fs.statSync(path.join(root, entry)).isDirectory())
    .map((language) => ({
      language,
      ruleCount: loadCavemanFileRules(language).length,
    }))
    .sort((a, b) => a.language.localeCompare(b.language));
}
