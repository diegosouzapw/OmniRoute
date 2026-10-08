import assert from "node:assert/strict";
import { test } from "node:test";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

// Every registry entry whose id encodes "<family>-<version>" must carry a display
// name with the same family and version. Guards against copy-paste drift where a
// duplicated entry keeps the source model's name (seen: claude-sonnet-4.5 named
// "Claude Sonnet 4.6", claude-sonnet-4-5-20250929 named "Claude 4.5 Sonnet").
const REGISTRIES = ["claude", "anthropic", "github", "ghe-copilot"];

function expectedNameParts(id: string): { family: string; version: string } | null {
  const m = id.match(/^claude-(opus|sonnet|haiku|fable)-(\d+)[-.](\d+)/);
  if (!m) return null;
  return { family: m[1], version: `${m[2]}.${m[3]}` };
}

for (const providerId of REGISTRIES) {
  test(`${providerId} registry display names match their model ids`, () => {
    const mismatches: string[] = [];
    for (const entry of getModelsByProviderId(providerId)) {
      const want = expectedNameParts(entry.id);
      if (!want) continue;
      const name = entry.name.toLowerCase();
      // Canonical word order: "claude <family> <version>" (dotted or dashed).
      const v = want.version;
      const ok =
        name.includes(`claude ${want.family} ${v}`) ||
        name.includes(`claude ${want.family} ${v.replace(".", "-")}`);
      if (!ok) {
        mismatches.push(`${entry.id} -> "${entry.name}"`);
      }
    }
    assert.deepEqual(mismatches, [], `${providerId} id/name mismatches`);
  });
}
