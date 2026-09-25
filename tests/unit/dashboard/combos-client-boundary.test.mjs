import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pageUrl = new URL(
  "../../../src/app/(dashboard)/dashboard/combos/page.tsx",
  import.meta.url
);

const source = await readFile(pageUrl, "utf8");

test("combos dashboard keeps provider alias resolution on the client-safe module", () => {
  assert.match(
    source,
    /import\s+\{\s*resolveProviderAlias\s*\}\s+from\s+["']@omniroute\/open-sse\/services\/providerAlias\.ts["'];?/
  );

  assert.doesNotMatch(
    source,
    /@omniroute\/open-sse\/services\/model\.ts/
  );

  assert.doesNotMatch(
    source,
    /\bresolveCanonicalProviderModel\b/
  );

  assert.match(
    source,
    /return resolveProviderAlias\(aliasOrProvider\) \|\| "";/
  );
});
