/**
 * Regression guard for the broken Turbopack production build on release/v3.8.50.
 *
 * Six independent module-level defects, each from a different PR, made `npm run build`
 * fail. Most are *link-time* errors, so those cases are expressed as "this module must be
 * importable / statically resolvable" rather than as behavioral assertions:
 *
 *  1. src/shared/components/modelSelectModalHelpers.ts — a lost `}` (#9011) left
 *     `export const PROVIDER_TEST_CHUNK_SIZE` inside a function body.
 *  2. open-sse/handlers/videoGeneration.ts — `handleFalVideoGeneration` imported
 *     twice from two different modules (#9982 landed on top of #9969).
 *  3. src/app/api/v1/models/catalog.ts — re-exported three SWR symbols that #9199
 *     deliberately removed from ./catalogCache when it replaced #8728's injectable
 *     policy with a fixed 30 s bound. The consumer was never updated.
 *  4. src/app/api/v1/models/catalogCache.ts — the same PR left two dangling statements
 *     referencing undeclared `inFlight` / `promise`, so every stale-while-revalidate
 *     read threw a ReferenceError at RUNTIME (this one the build never caught).
 *  5. open-sse/executors/tinycmsSigner.ts — generated wasm-bindgen glue kept a
 *     `new URL('wasm_signer_bg.wasm', import.meta.url)` default that no file backs.
 *  6. src/app/api/providers/[id]/models/conolDiscovery.ts — imported
 *     `getProviderOutboundGuard` from ./outboundUrlGuard, which does not export it (#8974).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

test("modelSelectModalHelpers exports survive isProviderModelHidden (#9011 missing brace)", async () => {
  const helpers = await import("@/shared/components/modelSelectModalHelpers");

  // The missing `}` swallowed everything after isProviderModelHidden into its body,
  // so this constant stopped being a module-level export.
  assert.equal(helpers.PROVIDER_TEST_CHUNK_SIZE, 3);

  const hidden = helpers.parseHiddenModelsByProvider({ openai: ["gpt-4o"] });
  assert.equal(helpers.isProviderModelHidden(hidden, "openai", "gpt-4o"), true);
  assert.equal(helpers.isProviderModelHidden(hidden, "openai", "gpt-4o-mini"), false);
  assert.equal(helpers.isProviderModelHidden(hidden, "anthropic", "gpt-4o"), false);
});

test("videoGeneration handler links with a single handleFalVideoGeneration binding (#9982)", async () => {
  // A duplicate import binding is an ESM early SyntaxError, so the import itself is
  // the assertion. The Fal video path must resolve to the provider-neutral module
  // that #9982 added (it also covers the #9969 Grok Imagine routing).
  const mod = await import("@omniroute/open-sse/handlers/videoGeneration.ts");
  assert.equal(typeof mod.handleVideoGeneration, "function");

  const source = readFileSync(path.join(repoRoot, "open-sse/handlers/videoGeneration.ts"), "utf8");
  const falImports = source.match(/import \{ handleFalVideoGeneration \}/g) ?? [];
  assert.equal(falImports.length, 1, "handleFalVideoGeneration must be imported exactly once");
  assert.match(source, /handleFalVideoGeneration \} from "\.\/mediaGeneration\/fal\.ts"/);
});

test("catalog.ts re-exports only what catalogCache actually exports (#9199)", async () => {
  // #9199 deliberately replaced #8728's injectable SWR policy with a fixed bound, but
  // left catalog.ts re-exporting the three removed symbols. Re-exporting a binding the
  // source module does not export is a link-time error, so this import IS the assertion.
  const catalog = await import("@/app/api/v1/models/catalog");
  const catalogCache = await import("@/app/api/v1/models/catalogCache");

  assert.equal(catalogCache.CATALOG_STALE_WHILE_REVALIDATE_MS, 30_000);
  assert.equal(catalog.CATALOG_STALE_WHILE_REVALIDATE_MS, 30_000);

  // The accessor/policy trio must stay gone — re-adding it would resurrect the
  // unbounded window #9199 removed (a failing refresh could pin an old catalog forever).
  for (const removed of [
    "getCatalogStaleWhileRevalidateMs",
    "__setCatalogStaleWhileRevalidateAccessorForTest",
    "__setCatalogStaleWhileRevalidateMsForTest",
  ]) {
    assert.equal(
      (catalogCache as Record<string, unknown>)[removed],
      undefined,
      `${removed} was removed by #9199 and must not come back`
    );
  }
});

test("the stale-while-revalidate path does not throw a ReferenceError (#9199 merge residue)", async () => {
  // The mangled merge left `inFlight = { … promise }` referencing two undeclared
  // identifiers inside scheduleBackgroundRefresh, so EVERY stale read crashed at runtime.
  const catalogCache = await import("@/app/api/v1/models/catalogCache");
  catalogCache.__resetCatalogBuilderRunsForTest();

  const payload = (body: string) => ({
    body,
    headers: { "content-type": "application/json" },
    status: 200,
    cacheTTL: 60_000,
  });
  const call = (body: string) =>
    catalogCache.resolveCachedCatalogResponse(
      new Request("http://localhost/v1/models"),
      { corsHeaders: {}, diagnosticHeaders: {} },
      async () => payload(body)
    );

  await call("first");
  catalogCache.__expireCatalogCacheForTest();

  const stale = await call("second");
  assert.equal(await stale.text(), "first", "the stale body must be served, not a crash");
  await catalogCache.__flushCatalogBackgroundRefreshForTest();
});

test("conolDiscovery resolves getProviderOutboundGuard from the policy module (#8974)", async () => {
  // outboundUrlGuard.ts does NOT export getProviderOutboundGuard — importing it from
  // there is a link-time error, so the import below is the assertion.
  const mod = await import("@/app/api/providers/[id]/models/conolDiscovery");
  assert.equal(typeof mod.maybeHandleConolModelDiscovery, "function");

  // The fix must stay on the consumer side. outboundUrlGuard.ts is loaded by the packaged
  // CLI, where no tsconfig resolves `@/*`, so re-exporting the policy helpers from it
  // (they pull in featureFlags → the DB layer) would break `omniroute setup-opencode`
  // (#7682). Guard that nobody "fixes" this by adding the re-export instead.
  const guardSource = readFileSync(
    path.join(repoRoot, "src/shared/network/outboundUrlGuard.ts"),
    "utf8"
  );
  // Positive anchor: prove we are still reading the real guard module — a stable
  // top-level export — so the negative guard below cannot rot into a vacuous pass
  // against an empty/moved file (source-scanner-guards rule).
  assert.match(
    guardSource,
    /export class OutboundUrlGuardError extends Error/,
    "outboundUrlGuard.ts moved or was emptied — re-anchor this guard before trusting it"
  );
  assert.doesNotMatch(
    guardSource,
    /^\s*(import|export)[^\n]*from\s+["']@\//m,
    "outboundUrlGuard.ts must stay free of @/-aliased imports/re-exports (#7682)"
  );
});

test("tinycmsSigner has no build-time-resolvable wasm sidecar URL (#8736/#10087)", () => {
  const source = readFileSync(path.join(repoRoot, "open-sse/executors/tinycmsSigner.ts"), "utf8");

  // The wasm binary ships inlined as WASM_BASE64; there is no wasm_signer_bg.wasm file.
  // Turbopack statically resolves `new URL(<literal>, import.meta.url)`, so leaving the
  // generated default in place fails `next build` with "Module not found".
  assert.ok(source.includes("const WASM_BASE64 ="), "wasm binary must stay inlined");
  assert.doesNotMatch(
    source,
    /new URL\(\s*['"]wasm_signer_bg\.wasm['"]/,
    "generated wasm-bindgen sidecar URL must not survive — Turbopack resolves it at build time"
  );
});
