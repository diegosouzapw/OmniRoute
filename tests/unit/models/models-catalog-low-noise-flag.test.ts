import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-catalog-low-noise-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-low-noise-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const featureFlagsDb = await import("../../../src/lib/db/featureFlags.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../../src/app/api/v1/models/catalog.ts");

type ModelsResponseBody = {
  data: Array<{ id: string }>;
};

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, accessToken: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    name: `${provider}-low-noise`,
    apiKey: null,
    accessToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function getIds(url = "http://localhost/api/v1/models"): Promise<Set<string>> {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(new Request(url));
  const body = (await response.json()) as ModelsResponseBody;
  return new Set(body.data.map((item) => item.id));
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("MODELS_CATALOG_PREFIX_MODE=alias suppresses canonical provider-id prefixes", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "alias");
  try {
    await seedConnection("claude", "claude-access");
    await seedConnection("cline", "cline-access");
    await modelsDb.addCustomModel("cline", "demo-custom", "Demo Custom");
    const ids = await getIds();
    assert.ok(ids.has("cc/claude-sonnet-4-6"), "alias prefix cc/ should be present");
    assert.equal(
      ids.has("claude/claude-sonnet-4-6"),
      false,
      "canonical prefix claude/ should be absent"
    );
    assert.ok(ids.has("cl/demo-custom"), "alias prefix cl/ should be present");
    assert.equal(ids.has("cline/demo-custom"), false, "canonical prefix cline/ should be absent");
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("MODELS_CATALOG_PREFIX_MODE=dual emits both alias and canonical prefixes (default)", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "dual");
  try {
    await seedConnection("claude", "claude-access");
    const ids = await getIds();
    assert.ok(ids.has("cc/claude-sonnet-4-6"), "alias prefix cc/ should be present in dual mode");
    assert.ok(
      ids.has("claude/claude-sonnet-4-6"),
      "canonical prefix claude/ should be present in dual mode"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("?prefix=alias query param overrides flag to alias-only mode", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "dual");
  try {
    await seedConnection("claude", "claude-access");
    const ids = await getIds("http://localhost/api/v1/models?prefix=alias");
    assert.ok(ids.has("cc/claude-sonnet-4-6"), "alias prefix present with ?prefix=alias");
    assert.equal(
      ids.has("claude/claude-sonnet-4-6"),
      false,
      "canonical prefix absent with ?prefix=alias"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("?prefix=canonical query param overrides flag to canonical-only mode", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "dual");
  try {
    await seedConnection("claude", "claude-access");
    const ids = await getIds("http://localhost/api/v1/models?prefix=canonical");
    assert.equal(
      ids.has("cc/claude-sonnet-4-6"),
      false,
      "alias prefix absent with ?prefix=canonical"
    );
    assert.ok(
      ids.has("claude/claude-sonnet-4-6"),
      "canonical prefix present with ?prefix=canonical"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

// ---------------------------------------------------------------------------
// #11632 — the Codex-native emission loop ignores the prefix-mode gates.
//
// catalog.ts:303-307 resolves `includeAlias` / `includeCanonical`, and every
// general loop honours them: static (:1022/:1036), synced (:1203/:1236),
// custom (:1628/:1654) and alias-backed (:1746/:1758). The Codex-native loop
// at :1064-1093 consults NEITHER. It builds the three-entry array at
// :1075-1079 and pushes all of it at :1081-1092, gated only by
// providerSupportsModel(), the #11300 hidden-model check, and a first-wins
// id-dedupe — so `alias` and `canonical` mode both leak the rows they are
// supposed to suppress, via the ?prefix= path AND the feature-flag path.
//
// Root `gpt-5.6-sol-ultra` is used for the id-set cases: it is a member of
// CODEX_NATIVE_UNPREFIXED_MODELS (open-sse/services/model.ts:147-175). It is
// also present in the static PROVIDER_MODELS catalog (as are 26 of the 27
// roots), which is why the separate parent-rule test below deliberately uses
// `codex-auto-review` instead — see the comment on that test.
// ---------------------------------------------------------------------------

const CODEX_NATIVE_ROOT = "gpt-5.6-sol-ultra";

type CatalogRow = {
  id: string;
  root?: string;
  parent?: string | null;
};

async function getRows(url = "http://localhost/api/v1/models"): Promise<CatalogRow[]> {
  // #6408 installed a 1.5s TTL response cache keyed only on
  // (prefix, isCodex client, apiKey) — NOT on DB/settings state. Two cases in
  // the same file that differ only by seeded connections would otherwise be
  // served the earlier case's serialized catalog. Reset before every request.
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(new Request(url));
  const body = (await response.json()) as { data: CatalogRow[] };
  return body.data;
}

/** Rows the Codex-native loop owns for a given root, sorted for stable compare. */
function rowsForRoot(rows: CatalogRow[], root: string): Array<[string, string | null]> {
  return rows
    .filter((row) => row.root === root)
    .map((row): [string, string | null] => [row.id, row.parent ?? null])
    .sort((a, b) => a[0].localeCompare(b[0]));
}

async function seedCodexConnection(name: string) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    apiKey: null,
    accessToken: `${name}-access`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

// The `cxa/` rows below come from the `codex-app-server` provider — a noAuth,
// isLocalCli sibling of `codex` that shares codexProvider.models
// (src/shared/constants/providers/noauth.ts:177-180). They are emitted by the
// STATIC PROVIDER_MODELS loop at :954, gated at :1022/:1036 — not by the DB
// alias-backed loop at :1746, which has no modelAliases rows to work from on a
// freshly reset database. Either way that loop already honours the gates, so
// the rows are expected in `alias`/`dual` and absent in `canonical`. They are
// not part of this defect; they are asserted so a fix scoped to :1064-1093
// cannot disturb a neighbouring, already-correct loop.
//
// PROVIDER_MODELS["cxa"] carries 26 of the 27 native roots — `codex-auto-review`
// is absent from it, which is why that root has no `cxa/` row.
const CODEX_APP_SERVER_ALIAS_ROW: [string, string | null] = [`cxa/${CODEX_NATIVE_ROOT}`, null];

// FROZEN acceptance matrix, per Codex-native root:
//   alias     -> cx/<root> only, parent null
//   canonical -> codex/<root> only, parent null (no surviving row may point at
//                a suppressed predecessor)
//   dual      -> all three, chained cx/ -> codex/ -> bare
// Sorted by id to match rowsForRoot(): "cx/" sorts before "cxa" ("/" < "a").
const EXPECTED_ALIAS_MODE_ROWS: Array<[string, string | null]> = [
  [`cx/${CODEX_NATIVE_ROOT}`, null],
  CODEX_APP_SERVER_ALIAS_ROW,
];

const EXPECTED_CANONICAL_MODE_ROWS: Array<[string, string | null]> = [
  [`codex/${CODEX_NATIVE_ROOT}`, null],
];

const EXPECTED_DUAL_MODE_ROWS: Array<[string, string | null]> = [
  [`codex/${CODEX_NATIVE_ROOT}`, `cx/${CODEX_NATIVE_ROOT}`],
  [`cx/${CODEX_NATIVE_ROOT}`, null],
  CODEX_APP_SERVER_ALIAS_ROW,
  [CODEX_NATIVE_ROOT, `codex/${CODEX_NATIVE_ROOT}`],
].sort((a, b) => String(a[0]).localeCompare(String(b[0]))) as Array<[string, string | null]>;

test("#11632 ?prefix=alias suppresses canonical and bare rows for Codex-native roots", async () => {
  await seedCodexConnection("codex-primary");

  const rows = await getRows("http://localhost/api/v1/models?prefix=alias");
  // Guard: a broken import/seed would yield an empty or trivial catalog, and an
  // empty id-set would satisfy an "absent" assertion vacuously.
  assert.ok(rows.length > 100, `expected a populated catalog, got ${rows.length} rows`);

  assert.deepEqual(
    rowsForRoot(rows, CODEX_NATIVE_ROOT),
    EXPECTED_ALIAS_MODE_ROWS,
    "alias mode must emit only the cx/ alias row (plus the already-gated cxa/ " +
      "app-server row); catalog.ts:1064-1093 ignores includeCanonical and leaks " +
      `codex/${CODEX_NATIVE_ROOT} and the bare ${CODEX_NATIVE_ROOT}`
  );
});

test("#11632 ?prefix=canonical suppresses alias and bare rows for Codex-native roots", async () => {
  await seedCodexConnection("codex-primary");

  const rows = await getRows("http://localhost/api/v1/models?prefix=canonical");
  assert.ok(rows.length > 100, `expected a populated catalog, got ${rows.length} rows`);

  assert.deepEqual(
    rowsForRoot(rows, CODEX_NATIVE_ROOT),
    EXPECTED_CANONICAL_MODE_ROWS,
    "canonical mode must emit only the codex/ row re-rooted to parent null; " +
      "catalog.ts:1064-1093 ignores includeAlias and leaks " +
      `cx/${CODEX_NATIVE_ROOT} and the bare ${CODEX_NATIVE_ROOT}`
  );
});

test("#11632 ?prefix=dual keeps the full three-level Codex-native chain", async () => {
  await seedCodexConnection("codex-primary");

  const rows = await getRows("http://localhost/api/v1/models?prefix=dual");
  assert.ok(rows.length > 100, `expected a populated catalog, got ${rows.length} rows`);

  assert.deepEqual(
    rowsForRoot(rows, CODEX_NATIVE_ROOT),
    EXPECTED_DUAL_MODE_ROWS,
    "dual mode is the default and must keep alias -> canonical -> bare intact"
  );
});

test("#11632 MODELS_CATALOG_PREFIX_MODE=alias flag path gates Codex-native roots", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "alias");
  try {
    await seedCodexConnection("codex-primary");

    // No ?prefix= query param: the mode must resolve through
    // getModelsCatalogPrefixMode() at catalog.ts:304-305.
    const rows = await getRows("http://localhost/api/v1/models");
    assert.ok(rows.length > 100, `expected a populated catalog, got ${rows.length} rows`);

    assert.deepEqual(
      rowsForRoot(rows, CODEX_NATIVE_ROOT),
      EXPECTED_ALIAS_MODE_ROWS,
      "the defect is mode-invariant: the feature-flag resolution path leaks the " +
        "same rows as ?prefix=alias"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("#11632 MODELS_CATALOG_PREFIX_MODE=canonical flag path gates Codex-native roots", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "canonical");
  try {
    await seedCodexConnection("codex-primary");

    const rows = await getRows("http://localhost/api/v1/models");
    assert.ok(rows.length > 100, `expected a populated catalog, got ${rows.length} rows`);

    assert.deepEqual(
      rowsForRoot(rows, CODEX_NATIVE_ROOT),
      EXPECTED_CANONICAL_MODE_ROWS,
      "canonical mode via the feature flag must emit only the codex/ row, " +
        "re-rooted to parent null"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("#11632 canonical mode re-roots the surviving row instead of dangling at a suppressed parent", async () => {
  // Parent rule (frozen): no surviving row may point at a suppressed
  // predecessor. This needs a root the native loop emits FIRST, otherwise the
  // rule is unobservable: 26 of the 27 CODEX_NATIVE_UNPREFIXED_MODELS entries
  // are also in the static PROVIDER_MODELS catalog, so the static loop
  // (:1022/:1036/:1052) already emits a correctly re-rooted `codex/<root>` and
  // the native loop's first-wins dedupe at :1082 then skips its own entry —
  // masking a wrong parent there.
  //
  // `codex-auto-review` is the sole root NOT in the static catalog (it is not
  // in codexProvider.models either, which is why it has no `cxa/` row), so its
  // `codex/` row is produced by the native loop and its parent is observable.
  // Verified against a mutant that gates the ids correctly but leaves the
  // canonical parent at `cx/<root>`: that mutant survives every
  // gpt-5.6-sol-ultra assertion and is caught only here.
  await seedCodexConnection("codex-primary");

  const rows = await getRows("http://localhost/api/v1/models?prefix=canonical");
  assert.ok(rows.length > 100, `expected a populated catalog, got ${rows.length} rows`);

  assert.deepEqual(rowsForRoot(rows, "codex-auto-review"), [["codex/codex-auto-review", null]]);
});

test("#11632 the gating holds for every Codex-native root, not just the sampled ones", async () => {
  // Closes the "special-case the tested roots" escape hatch: a fix that hard-codes
  // gpt-5.6-sol-ultra and codex-auto-review would satisfy every other case here.
  // This walks all of CODEX_NATIVE_UNPREFIXED_MODELS and asserts the frozen
  // matrix per root.
  //
  // Scoped by `root === <root>`, which is what the Codex-native loop stamps on
  // the rows it emits (catalog.ts:1088). This deliberately excludes rows that
  // carry the same id shape but `root: null` — measured on this base, alias mode
  // also contains codex/gpt-5.6-sol, codex/gpt-5.6-terra and codex/gpt-5.6-luna
  // with `root: null` and `owned_by: "codex"`, emitted by a different loop.
  // Those are outside this card's frozen scope; asserting on them here would
  // fail even against a correct fix to :1064-1093.
  const { CODEX_NATIVE_UNPREFIXED_MODELS } = await import("../../../open-sse/services/model.ts");
  const roots = [...CODEX_NATIVE_UNPREFIXED_MODELS] as string[];
  assert.ok(roots.length > 20, `expected the native root set, got ${roots.length}`);

  await seedCodexConnection("codex-primary");

  const aliasRows = await getRows("http://localhost/api/v1/models?prefix=alias");
  const canonicalRows = await getRows("http://localhost/api/v1/models?prefix=canonical");
  const nativeIds = (rows: CatalogRow[], root: string) =>
    new Set(rows.filter((row) => row.root === root).map((row) => row.id));

  const aliasLeaks: string[] = [];
  const canonicalLeaks: string[] = [];
  for (const root of roots) {
    const inAlias = nativeIds(aliasRows, root);
    if (inAlias.has(`codex/${root}`)) aliasLeaks.push(`codex/${root}`);
    if (inAlias.has(root)) aliasLeaks.push(root);

    const inCanonical = nativeIds(canonicalRows, root);
    if (inCanonical.has(`cx/${root}`)) canonicalLeaks.push(`cx/${root}`);
    if (inCanonical.has(root)) canonicalLeaks.push(root);
  }

  // Anti-vacuity: the walk must actually have seen native rows.
  assert.ok(
    nativeIds(aliasRows, CODEX_NATIVE_ROOT).has(`cx/${CODEX_NATIVE_ROOT}`),
    "expected the native alias row to be present at all"
  );

  assert.deepEqual(
    aliasLeaks,
    [],
    "alias mode must suppress canonical and bare rows for every native root"
  );
  assert.deepEqual(
    canonicalLeaks,
    [],
    "canonical mode must suppress alias and bare rows for every native root"
  );
});

test("#11632 regression guard: unrelated providers keep their own prefix gating", async () => {
  await seedCodexConnection("codex-primary");
  await seedConnection("claude", "claude-access");

  const rows = await getRows("http://localhost/api/v1/models?prefix=alias");
  const ids = new Set(rows.map((row) => row.id));

  // Anti-vacuity is asserted against rows this test actually depends on rather
  // than a total-row-count floor. The absolute total varies with catalog state
  // that has nothing to do with this defect (an independent review of this
  // commit measured 614 here and 452 in a differently-ordered run), so a
  // numeric floor is a flaky guard, not a contract.
  assert.ok(ids.has("cc/claude-sonnet-4-6"), "claude alias row must survive a Codex-scoped fix");
  assert.equal(
    ids.has("claude/claude-sonnet-4-6"),
    false,
    "claude canonical row must stay suppressed in alias mode"
  );
  // Proves the absence assertion above is not vacuous: the claude rows exist in
  // dual mode, so their canonical absence in alias mode is real gating.
  const dualIds = new Set(
    (await getRows("http://localhost/api/v1/models?prefix=dual")).map((row) => row.id)
  );
  assert.ok(
    dualIds.has("claude/claude-sonnet-4-6"),
    "claude canonical row must exist in dual mode"
  );
});

test("#11632 regression guard: the already-gated cxa/ alias loop is untouched", async () => {
  // The card's scenario: two active Codex OAuth connections. Measured on the
  // exact base, the second connection adds no id (the catalog is per-provider,
  // not per-connection), and the cxa/ rows come from the codex-app-server
  // provider via the alias-backed loop at :1746/:1758 — which already honours
  // the gates. Asserted here so a fix scoped to :1064-1093 cannot regress it.
  await seedCodexConnection("codex-primary");
  await seedCodexConnection("codex-secondary");

  for (const mode of ["alias", "dual"] as const) {
    const rows = await getRows(`http://localhost/api/v1/models?prefix=${mode}`);
    const ids = rows.map((row) => row.id);
    assert.ok(
      ids.includes(`cxa/${CODEX_NATIVE_ROOT}`),
      `cxa/${CODEX_NATIVE_ROOT} must be present in ${mode} mode`
    );
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    assert.deepEqual(duplicates, [], `${mode} mode must not emit duplicate ids`);
  }

  const canonicalRows = await getRows("http://localhost/api/v1/models?prefix=canonical");
  const canonicalIds = canonicalRows.map((row) => row.id);
  // Anti-vacuity: the canonical response must be non-empty and must still carry
  // the codex canonical row, otherwise "cxa/ is absent" would pass on a broken
  // build that emitted nothing at all.
  assert.ok(
    canonicalIds.includes(`codex/${CODEX_NATIVE_ROOT}`),
    "canonical response must still contain the codex canonical row"
  );
  assert.equal(
    canonicalIds.includes(`cxa/${CODEX_NATIVE_ROOT}`),
    false,
    "cxa/ alias rows must stay suppressed in canonical mode"
  );
  const canonicalDuplicates = canonicalIds.filter(
    (id, index) => canonicalIds.indexOf(id) !== index
  );
  assert.deepEqual(canonicalDuplicates, [], "canonical mode must not emit duplicate ids");
});

test("#11632 backward compatibility: dual-mode codex-auto-review chain is preserved", async () => {
  // Freezes the same contract as tests/unit/models-catalog-route.test.ts:652-680
  // so the fix cannot satisfy the new matrix by flattening the default mode.
  await seedCodexConnection("codex-primary");

  const rows = await getRows("http://localhost/api/v1/models");
  const find = (id: string) => rows.find((row) => row.id === id);

  const bare = find("codex-auto-review");
  const canonical = find("codex/codex-auto-review");
  const alias = find("cx/codex-auto-review");

  assert.ok(bare, "expected bare codex-auto-review row");
  assert.ok(canonical, "expected codex/codex-auto-review row");
  assert.ok(alias, "expected cx/codex-auto-review row");
  assert.equal(bare.parent, "codex/codex-auto-review");
  assert.equal(canonical.parent, "cx/codex-auto-review");
  assert.equal(alias.parent, null);
  assert.equal(find("openai/codex-auto-review"), undefined);
});
