import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * #10692's static-graph guard (client-bundle-no-server-only-10692.test.ts) does
 * NOT follow dynamic `import()` edges — but Turbopack does. `combos/page.tsx` is
 * a "use client" dashboard page; importing `resolveCanonicalProviderModel` from
 * `open-sse/services/model.ts` pulled model.ts's server chain (activeSyncedCatalog
 * → db/providers → … → browserPool → playwright-core, reached via model.ts's
 * DYNAMIC db import) into the client bundle and broke `npm run build` with 170
 * "Module not found: async_hooks/child_process/fs" Turbopack errors.
 *
 * The page only consumes the result's `.provider`, which is always
 * `resolveProviderAlias(aliasOrProvider)` from the client-safe pure module — so
 * the fix imports that directly. This test keeps the page's import surface on
 * that client-safe module.
 */

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PAGE = path.join(REPO_ROOT, "src/app/(dashboard)/dashboard/combos/page.tsx");

test("combos page does not statically import open-sse/services/model.ts", () => {
  const source = fs.readFileSync(PAGE, "utf8");
  assert.equal(
    /from\s+"@omniroute\/open-sse\/services\/model\.ts"/.test(source),
    false,
    "combos/page.tsx must not statically import open-sse/services/model.ts — " +
      "model.ts's server chain (reached via its dynamic activeSyncedCatalog import) " +
      "breaks the dashboard client bundle"
  );
});

test("combos page resolves provider aliases from the client-safe providerAlias module", () => {
  const source = fs.readFileSync(PAGE, "utf8");
  assert.match(
    source,
    /from\s+"@omniroute\/open-sse\/services\/providerAlias\.ts"/,
    "combos/page.tsx should import resolveProviderAlias from the pure providerAlias module"
  );
});
