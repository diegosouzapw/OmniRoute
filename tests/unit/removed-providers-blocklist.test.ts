/**
 * Regression guard for docs/reference/REMOVED_PROVIDERS.md.
 *
 * Providers removed at their operator's request must never come back: not in the
 * provider catalogs, not in the executor map, not in the registry sources and not
 * as an upstream domain in any executor. Keep this list in sync with the table in
 * the doc; add the identifiers of a new takedown here in the same PR.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getProviderById, getProviderByAlias } =
  await import("../../src/shared/constants/providers.ts");
const { hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.data.ts");

interface RemovedProvider {
  id: string;
  alias: string;
  domains: string[];
  removalPr: number;
}

export const REMOVED_PROVIDERS: readonly RemovedProvider[] = [
  { id: "puter", alias: "pu", domains: ["puter.com"], removalPr: 10210 },
  {
    id: "theoldllm",
    alias: "tllm",
    domains: ["theoldllm.com", "theoldllm.vercel.app"],
    removalPr: 12440,
  },
];

// Source trees where a reintroduction would land. Scanned for ids, aliases and domains.
const SCANNED_DIRS = [
  "open-sse/config/providers",
  "open-sse/executors",
  "src/shared/constants/providers",
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|mts|js|mjs|json)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const ROOT = process.cwd();
const scannedFiles = SCANNED_DIRS.flatMap((dir) => walk(path.join(ROOT, dir)));

for (const removed of REMOVED_PROVIDERS) {
  test(`removed provider "${removed.id}" (PR #${removed.removalPr}) stays out of the chat registry`, () => {
    assert.equal(REGISTRY[removed.id], undefined, `${removed.id} must not be in REGISTRY`);
    assert.equal(REGISTRY[removed.alias], undefined, `${removed.alias} must not be in REGISTRY`);
  });

  test(`removed provider "${removed.id}" stays out of the provider catalogs`, () => {
    assert.equal(getProviderById(removed.id), undefined, `${removed.id} must not be a provider`);
    assert.equal(
      getProviderByAlias(removed.alias),
      null,
      `alias ${removed.alias} must not be reused by any provider`
    );
  });

  test(`removed provider "${removed.id}" has no executor (id or alias)`, () => {
    assert.equal(hasSpecializedExecutor(removed.id), false);
    assert.equal(hasSpecializedExecutor(removed.alias), false);
  });

  test(`removed provider "${removed.id}" has no free-model catalog entries`, () => {
    assert.deepEqual(
      FREE_MODEL_BUDGETS.filter((b) => b.provider === removed.id),
      [],
      `${removed.id} must not appear in FREE_MODEL_BUDGETS`
    );
  });

  test(`removed provider "${removed.id}" identifiers and domains are absent from registry/executor sources`, () => {
    const needles = [`"${removed.id}"`, `"${removed.alias}"`, ...removed.domains];
    const offenders: string[] = [];
    for (const file of scannedFiles) {
      const text = fs.readFileSync(file, "utf8");
      for (const needle of needles) {
        if (text.includes(needle)) offenders.push(`${path.relative(ROOT, file)} :: ${needle}`);
      }
    }
    assert.deepEqual(
      offenders,
      [],
      `reintroduction of "${removed.id}" detected — see docs/reference/REMOVED_PROVIDERS.md`
    );
  });
}

test("the REMOVED_PROVIDERS doc lists every guarded id", () => {
  const doc = fs.readFileSync(path.join(ROOT, "docs/reference/REMOVED_PROVIDERS.md"), "utf8");
  for (const removed of REMOVED_PROVIDERS) {
    assert.ok(doc.includes(`\`${removed.id}\``), `${removed.id} must have a row in the doc`);
    assert.ok(doc.includes(`#${removed.removalPr}`), `PR #${removed.removalPr} must be linked`);
  }
});
