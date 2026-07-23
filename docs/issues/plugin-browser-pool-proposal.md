# [Feature] Pluginization Phase 1: Extract Playwright/CloakBrowser Browser Pool

**Labels:** `enhancement`, `plugin`, `architecture`

## Problem / Use Case

OmniRoute's Playwright/CloakBrowser dependency is a **large, non-essential dependency** (~1500+ LOC across 22 source files + ~35 test files) pulled into every installation regardless of whether the user needs browser-backed chat. Users who run OmniRoute purely as a proxy/router (the majority) pay for:

- **Disk space**: ~200+ MB from Playwright browsers + Chromium binaries (installed via `npx playwright install`)
- **Build complexity**: Turbopack must handle the `cloakbrowser` package
- **Bundle size**: All browser-pool code is compiled into the main codebase
- **Surface area**: 7 files with direct Playwright imports (4 dynamic, 3 static type imports)
- **CI/cache impact**: Playwright installs in CI pipelines even when not needed

Currently, only environment variables (`OMNIROUTE_BROWSER_POOL=off`) gate _runtime_ execution — the code still loads, imports get resolved, and Playwright must be installed.

## Proposed Solution

Extract the Playwright/CloakBrowser browser pool into an **optional package** loaded via dynamic `import()` at runtime, following the existing pattern used for `cloakbrowser` (computed-string dynamic import to avoid resolution). The core retains thin interface stubs that gracefully degrade when the optional package is absent.

### Architecture

```
open-sse/
  interfaces/
    browserPool.ts       ← NEW: BrowserPoolProvider interface + types
  services/
    browserPool.ts       ← BECOMES: thin stub, delegates to optional package
    browserBackedChat.ts ← BECOMES: thin stub, delegates to optional package
    grokClearance.ts     ← BECOMES: thin stub

packages/browser-pool/   ← NEW: optional package
  index.ts               ← exports BrowserPoolProvider implementation
  src/
    browserPool.ts       ← extracted from open-sse/services/browserPool.ts
    browserBackedChat.ts ← extracted from open-sse/services/browserBackedChat.ts
    grokClearance.ts     ← extracted from open-sse/services/grokClearance.ts
    claudeTurnstileSolver.ts ← extracted (tightly coupled, moved as-is)
    inAppLoginService.ts ← extracted (own Playwright instance, separate lifecycle)
  package.json
  tsconfig.json
```

### Phase Breakdown

**Phase 1 — Core pool extraction (this issue):**

1. Define `BrowserPoolProvider` interface in `open-sse/interfaces/browserPool.ts`
2. Extract `browserPool.ts` (~502 LOC), `browserBackedChat.ts` (~270 LOC), `grokClearance.ts` (~84 LOC) into `packages/browser-pool/`
3. Replace core files with thin stubs that try `import('../../../packages/browser-pool')` with graceful fallback
4. Keep `poolTools.ts` importing the core stub (unchanged from consumer perspective)
5. Make Playwright an optional dependency (not in root `package.json`)
6. Typecheck core passes with and without the package installed
7. All existing tests pass (with plugin installed)

**Phase 2 — Turnstile solver extraction (future):**

- Extract `claudeTurnstileSolver.ts` (~212 LOC) — has static Playwright type imports, needs type interface
- Move `claudeWebAutoRefresh.ts` (depends on turnstile solver)

**Phase 3 — Standalone Playwright instances (future):**

- Extract `inAppLoginService.ts` (~257 LOC)
- Refactor `gemini-web.ts` executor's own Playwright path (~553 LOC)

### Interface Design (Phase 1)

```typescript
// open-sse/interfaces/browserPool.ts
export interface BrowserPoolProvider {
  acquireBrowserContext(options?: BrowserPoolContextOptions): Promise<PooledContext>;
  releaseBrowserContext(ctx: PooledContext): Promise<void>;
  getBrowserPoolMetrics(): BrowserPoolMetrics;
  shutdownPool(): Promise<void>;
  isPoolEnabled(): boolean;
  openPage(url: string, ctx?: PooledContext): Promise<{ page: any }>;
  readPageResponseBody(page: any): Promise<string>;
  getBrowserPoolStatus(): BrowserPoolStatus;
}
```

### Stub Pattern

```typescript
// open-sse/services/browserPool.ts — thin stub
let _impl: BrowserPoolProvider | null = null;

async function getImpl(): Promise<BrowserPoolProvider> {
  if (!_impl) {
    try {
      const { createBrowserPoolProvider } = await import("../../packages/browser-pool");
      _impl = createBrowserPoolProvider();
    } catch {
      // Graceful fallback — disabled
      _impl = createNullBrowserPoolProvider();
    }
  }
  return _impl;
}

export async function acquireBrowserContext(...args) {
  return (await getImpl()).acquireBrowserContext(...args);
}
```

## Alternatives Considered

1. **Existing hook-based PluginManager**: Rejected. The current PluginManager operates via child-process IPC and request-pipeline hooks (`onRequest`, `onResponse`, `onError`). A browser pool is an in-process runtime service with composable lifecycle — not a request pipeline hook. Forcing it through IPC would add ~50ms+ per browser operation and break the existing synchronous pool pattern.

2. **Keep as-is, just lazy-load the import**: Minimal improvement — the dependency tree still references Playwright types, requiring it to be available. Doesn't reduce bundle size or simplify CI.

3. **Replace Playwright with a protocol-level abstraction**: Too ambitious and would change the behavior of the pool. Playwright's CDP capabilities (context isolation, cookies, screenshots) are fundamental to how the pool works.

4. **Monorepo workspace**: Too heavy for this scope. A simple extracted package avoids workspace tooling changes.

## Acceptance Criteria

1. `open-sse/interfaces/browserPool.ts` exists and exports `BrowserPoolProvider`, `PooledContext`, `BrowserPoolMetrics` types
2. `open-sse/services/browserPool.ts` becomes a thin stub with zero Playwright imports
3. `packages/browser-pool/` contains all extracted implementation (browserPool, browserBackedChat, grokClearance)
4. Core typecheck (`npm run typecheck:core`) passes with 0 errors **without** the browser-pool package installed
5. Core typecheck passes with the package installed
6. All existing tests pass when the browser-pool package is installed
7. `poolTools.ts` `omniroute_browser_pool_status` tool works end-to-end when the package is installed
8. Graceful degradation: when the package is absent, `getBrowserPoolStatus()` returns `{ enabled: false }` without crashing
9. Playwright is moved from root `dependencies` to optional/peer in the extracted package
10. Documentation updated in `docs/reference/ENVIRONMENT.md`

## Expected Test Plan

- Unit tests for the stub fallback path (simulate import failure, verify graceful degradation)
- Unit tests moved to the extracted package
- Verify `tests/unit/browser-pool-optional-import.test.ts` passes (still validates cloakbrowser isn't statically resolved)
- Verify `tests/unit/browserPool-proxy.test.ts` passes
- Verify `tests/unit/browserBackedChat-matcher.test.ts` passes
- E2E: `npm run typecheck:core` without the package installed → 0 errors
- E2E: `npm run test:coverage` (with package installed) → existing coverage gates pass

## Additional Context

Current dependency graph (simplified):

```
open-sse/services/browserPool.ts (502 LOC, singleton Playwright/CloakBrowser pool)
  ├── open-sse/services/browserBackedChat.ts (270 LOC, browser-backed chat runner)
  │     ├── open-sse/executors/claude-web.ts (imports tryBackedChat)
  │     └── open-sse/executors/duckduckgo-web.ts (imports tryBackedChat)
  ├── open-sse/services/grokClearance.ts (84 LOC, CF clearance via browser)
  └── open-sse/mcp-server/tools/poolTools.ts (imports getBrowserPoolMetrics)

Standalone Playwright users (separate, future phases):
  ├── open-sse/services/claudeTurnstileSolver.ts (212 LOC, static Playwright type imports)
  ├── open-sse/services/inAppLoginService.ts (257 LOC, own browser lifecycle)
  └── open-sse/executors/gemini-web.ts (553 LOC, private Playwright path)

Kill switches: OMNIROUTE_BROWSER_POOL, WEB_COOKIE_USE_BROWSER (both env vars)
```

Total extracted in Phase 1: ~856 LOC, 3 files.
Total deferred to Phase 2/3: ~1022 LOC, 4 files.

This is the first pluginization step. Future targets (separate issues): memory/compression plugin, additional provider support extraction.

## Related References

- PR #8219 (model catalog connection filter + cache TTL) — same baseline `release/v3.8.49`
- `docs/reference/ENVIRONMENT.md` — browser pool env vars documentation
- Plugin system docs at `docs/PLUGINS.md` — existing PluginManager (not used here, referenced for contrast)
