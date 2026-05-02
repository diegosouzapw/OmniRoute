import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { detectCommandType } from "./commandDetector.ts";
import { validateRtkFilter, type RtkFilterDefinition } from "./filterSchema.ts";

let cache: RtkFilterDefinition[] | null = null;

function getFiltersDir(): string {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), "filters");
}

export function loadRtkFilters(options: { refresh?: boolean } = {}): RtkFilterDefinition[] {
  if (cache && !options.refresh) return cache;
  const dir = getFiltersDir();
  if (!fs.existsSync(dir)) {
    cache = [];
    return cache;
  }

  const filters: RtkFilterDefinition[] = [];
  for (const file of fs
    .readdirSync(dir)
    .filter((entry) => entry.endsWith(".json"))
    .sort()) {
    const fullPath = path.join(dir, file);
    try {
      const parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      filters.push(validateRtkFilter(parsed));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Invalid RTK filter ${file}: ${message}`);
    }
  }

  cache = filters.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
  return cache;
}

export function getRtkFilterCatalog(): Array<
  Pick<
    RtkFilterDefinition,
    "id" | "name" | "description" | "commandTypes" | "category" | "priority"
  >
> {
  return loadRtkFilters().map((filter) => ({
    id: filter.id,
    name: filter.name,
    description: filter.description,
    commandTypes: filter.commandTypes,
    category: filter.category,
    priority: filter.priority,
  }));
}

export function matchRtkFilter(text: string, command?: string | null): RtkFilterDefinition | null {
  const detection = detectCommandType(text, command);
  return (
    loadRtkFilters().find((filter) => filter.commandTypes.includes(detection.type)) ??
    loadRtkFilters().find((filter) => filter.commandTypes.includes("generic-output")) ??
    null
  );
}
