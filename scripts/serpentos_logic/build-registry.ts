import { readFileSync, writeFileSync, globSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { parseManifest } from "../packages/core/src/manifest-schema.js";
import type { ToolManifest } from "../packages/core/src/types.js";

export interface Catalog {
  generatedAt: string;
  tools: ToolManifest[];
}

export function buildCatalog(rawManifests: unknown[]): Catalog {
  const tools = rawManifests.map((m) => parseManifest(m));
  tools.sort((a, b) => a.name.localeCompare(b.name));
  return { generatedAt: new Date().toISOString(), tools };
}

function main(): void {
  const files = globSync("packages/*/tool.manifest.json");
  const raw = files.map((f) => JSON.parse(readFileSync(f, "utf8")));
  const catalog = buildCatalog(raw);
  writeFileSync("tools.generated.json", JSON.stringify(catalog, null, 2) + "\n");
  console.log(`build-registry: wrote ${catalog.tools.length} tools to tools.generated.json`);
}

// Run only when executed directly (not when imported by tests).
// Use pathToFileURL so paths containing spaces/special chars compare correctly.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
