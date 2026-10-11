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
const { MUSIC_PROVIDERS } = await import("../../open-sse/config/musicRegistry.ts");

interface RemovedProvider {
  id: string;
  alias: string;
  domains: string[];
  /** Removal PR number; `null` while the PR is still being opened. */
  removalPr: number | null;
  /**
   * Source needles to scan for instead of the bare quoted id/alias. Needed when the
   * id is also a token shared by providers that stay (e.g. `opencode` is the executor
   * family of `opencode-zen`/`opencode-go`, their icon key, and the name of the OpenCode
   * client integration): the guard then looks for the shapes a reintroduction takes —
   * a catalog/registry declaration or an executor-map key — rather than any mention.
   */
  sourceNeedles?: string[];
}

export const REMOVED_PROVIDERS: readonly RemovedProvider[] = [
  { id: "puter", alias: "pu", domains: ["puter.com"], removalPr: 10210 },
  {
    id: "theoldllm",
    alias: "tllm",
    domains: ["theoldllm.com", "theoldllm.vercel.app"],
    removalPr: 12440,
  },
  {
    id: "gemini-business",
    alias: "gembiz",
    domains: ["business.gemini.google"],
    removalPr: 14467,
  },
  {
    id: "suno",
    alias: "suno",
    domains: ["studio-api.suno.ai", "studio-api-prod.suno.com"],
    removalPr: 14468,
  },
  {
    // Keyless "OpenCode Free". Its upstream host (opencode.ai/zen) is shared with the
    // paid `opencode-zen`/`opencode-go` providers, which stay, so no domain is guarded.
    id: "opencode",
    alias: "oc",
    domains: [],
    removalPr: null,
    sourceNeedles: [
      'id: "opencode"',
      'alias: "oc"',
      '"oc"',
      "opencode: opencodeProvider",
      "opencode: {",
      "opencode: () =>",
      "registry/opencode/index.ts",
      "opencodeFreeTierContract",
      "OPENCODE_FREE_TIER_REQUEST_CONTRACT",
      "OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS",
    ],
  },
];

// Source trees where a reintroduction would land. Scanned for ids, aliases and domains.
const SCANNED_DIRS = [
  "open-sse/config",
  "open-sse/executors",
  "open-sse/handlers",
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
  test(`removed provider "${removed.id}" (PR #${removed.removalPr ?? "pending"}) stays out of the chat registry`, () => {
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

  test(`removed provider "${removed.id}" has no music registry entry`, () => {
    assert.equal(
      MUSIC_PROVIDERS[removed.id],
      undefined,
      `${removed.id} must not be in MUSIC_PROVIDERS`
    );
  });

  test(`removed provider "${removed.id}" identifiers and domains are absent from registry/executor sources`, () => {
    const needles = removed.sourceNeedles
      ? [...removed.sourceNeedles, ...removed.domains]
      : [`"${removed.id}"`, `"${removed.alias}"`, ...removed.domains];
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
    if (removed.removalPr !== null) {
      assert.ok(doc.includes(`#${removed.removalPr}`), `PR #${removed.removalPr} must be linked`);
    }
  }
});

test("the opencode guard leaves the paid OpenCode providers and the client integration alone", () => {
  // opencode-zen / opencode-go stay registered, with their own executors.
  assert.ok(REGISTRY["opencode-zen"], "opencode-zen must stay in REGISTRY");
  assert.ok(REGISTRY["opencode-go"], "opencode-go must stay in REGISTRY");
  assert.ok(getProviderById("opencode-zen"), "opencode-zen must stay a provider");
  assert.ok(getProviderById("opencode-go"), "opencode-go must stay a provider");
  assert.equal(hasSpecializedExecutor("opencode-zen"), true);
  assert.equal(hasSpecializedExecutor("opencode-go"), true);
  // The needles never match the kept declarations.
  const opencode = REMOVED_PROVIDERS.find((r) => r.id === "opencode");
  assert.ok(opencode?.sourceNeedles);
  for (const kept of [
    'id: "opencode-zen"',
    'alias: "opencode-go"',
    '"opencode-zen": () =>',
    'executor: "opencode"',
    'icon: "opencode"',
  ]) {
    for (const needle of opencode.sourceNeedles) {
      assert.equal(kept.includes(needle), false, `needle ${needle} must not match ${kept}`);
    }
  }
});
