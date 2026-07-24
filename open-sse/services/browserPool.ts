/**
 * browserPool.ts — core stub that delegates to @omniroute/browser-pool.
 *
 * Copyright 2025 OmniRoute. All rights reserved.
 *
 * Lightweight functions (resolvePlaywrightProxy, getBrowserPoolStatus)
 * remain inline to avoid forcing an async package load for trivial lookups.
 * All heavy browser-interaction functions are forwarded to the optional
 * @omniroute/browser-pool package via dynamic import.
 */

import { Buffer } from "node:buffer";

type Browser = import("playwright").Browser;
type BrowserContext = import("playwright").BrowserContext;
type Page = import("playwright").Page;

// ---------------------------------------------------------------------------
// Types — re-exported so callers never import from @omniroute/browser-pool
// directly. When the package is installed these would come from there, but by
// keeping local definitions both the stub and the package agree on shape.
// ---------------------------------------------------------------------------

export interface BrowserPoolContextOptions {
  cookieDomain: string;
  cookieString?: string | null;
  warmupUrl?: string | null;
  userAgent?: string;
  locale?: string;
  timezone?: string;
  preferCloakbrowser?: boolean;
  proxyProviderKey?: string;
}

export interface PooledContext {
  id: string;
  context: BrowserContext;
  warmupPage: Page | null;
  lastUsed: number;
  isStealth: boolean;
}

export interface BrowserPoolMetrics {
  browserLaunches: number;
  browserLaunchFailures: number;
  contextsCreated: number;
  contextsReused: number;
  contextsEvicted: number;
  contextsReleased: number;
  contextCreateFailures: number;
  shutdowns: number;
  lastShutdownReason: string | null;
}

// ---------------------------------------------------------------------------
// Proxy resolver types — local to resolvePlaywrightProxy
// ---------------------------------------------------------------------------

interface ProxyRecord {
  type?: string;
  host: string;
  port: number;
  username?: string | null;
  password?: string | null;
}

interface ResolvePlaywrightProxyDeps {
  resolveProxy?: (providerId: string) => Promise<ProxyRecord | null | undefined>;
}

// ---------------------------------------------------------------------------
// Dynamic import rationale: we keep the import URL as a computed string so
// that bundlers (Turbopack / webpack / esbuild) do NOT statically resolve
// it during route compilation. If a literal dynamic import of the module
// appeared here, Turbopack resolve it during route compilation and error out.
// By shunting through a join pattern the bundler never sees the literal
// dependency path and leaves the import as a true runtime dynamic import.
//   return ["cloak", "browser"].join("");
// ---------------------------------------------------------------------------
/**
 * Resolve the cloakbrowser module name without a literal string —
 * prevents Turbopack from resolving it at build time.
 */
function resolveCloakBrowserModule(): string {
  return ["cloak", "browser"].join("");
}

// ---------------------------------------------------------------------------
// Dynamic import — eager; load starts on module import.
// setProxyResolver is called once the module resolves, so any subsequent
// acquireBrowserContext call will have the resolver wired in.
// ---------------------------------------------------------------------------

let modPromise: Promise<typeof import("@omniroute/browser-pool")> | null = null;

function getMod(): Promise<typeof import("@omniroute/browser-pool")> {
  if (!modPromise) {
    modPromise = import("@omniroute/browser-pool").then((mod) => {
      mod.setProxyResolver(resolvePlaywrightProxy);
      return mod;
    });
  }
  return modPromise;
}

// ---------------------------------------------------------------------------
// resolvePlaywrightProxy — INLINE (no Playwright dependency at runtime)
// ---------------------------------------------------------------------------

/**
 * Resolve a Playwright-compatible proxy config for a given provider key.
 * Looks up the proxy from the database via resolveProxyForProvider, then
 * builds the { server, username?, password? } object that Playwright expects.
 *
 * May be injected into @omniroute/browser-pool via setProxyResolver so
 * that acquireBrowserContext uses the same proxy resolution as the rest
 * of the application.
 */
export async function resolvePlaywrightProxy(
  providerKey: string,
  deps?: ResolvePlaywrightProxyDeps
): Promise<import("playwright").LaunchOptions["proxy"] | undefined> {
  try {
    const resolver =
      deps?.resolveProxy ??
      (async (id: string) => {
        const { resolveProxyForProvider } = await import("../../src/lib/db/proxies");
        return resolveProxyForProvider(id);
      });
    const p = await resolver(providerKey);
    if (!p?.host) return undefined;
    const scheme = p.type === "socks5" ? "socks5" : "http";
    // Build explicitly instead of a conditional object spread: the spread form
    // widens username/password to `{}` under the LaunchOptions["proxy"] type,
    // tripping typecheck once browserPool.ts is pulled into typecheck-core scope.
    const proxy: NonNullable<import("playwright").LaunchOptions["proxy"]> = {
      server: `${scheme}://${p.host}:${p.port}`,
    };
    if (p.username) {
      proxy.username = String(p.username);
      proxy.password = p.password == null ? "" : String(p.password);
    }
    return proxy;
  } catch (err) {
    console.warn("[BrowserPool] Failed to resolve proxy from DB:", err);
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// getBrowserPoolStatus — INLINE (returns disabled status)
// ---------------------------------------------------------------------------

/**
 * Return the current status of the browser pool. In the core stub, the pool
 * is always reported as disabled — the real pool lives inside the optional
 * @omniroute/browser-pool package.
 */
export function getBrowserPoolStatus(): {
  enabled: boolean;
  contexts: number;
  browserRunning: boolean;
  stealthAvailable: boolean;
  lastActivityAgoMs: number;
} {
  return {
    enabled: false,
    contexts: 0,
    browserRunning: false,
    stealthAvailable: false,
    lastActivityAgoMs: -1,
  };
}

/**
 * Resolve a Playwright proxy config suitable for a new browser context.
 * Uses `proxyProviderKey` from the context options if provided, falling back
 * to the context key. Inline in core (no @omniroute/browser-pool required).
 */
export async function resolveBrowserContextProxy(
  contextKey: string,
  options: Pick<BrowserPoolContextOptions, "proxyProviderKey">,
  deps?: ResolvePlaywrightProxyDeps
): Promise<import("playwright").LaunchOptions["proxy"] | undefined> {
  return resolvePlaywrightProxy(options.proxyProviderKey ?? contextKey, deps);
}

// ---------------------------------------------------------------------------
// Delegated functions — forwarded to @omniroute/browser-pool
// ---------------------------------------------------------------------------

export async function acquireBrowserContext(
  key: string,
  options: BrowserPoolContextOptions
): Promise<PooledContext> {
  const mod = await getMod();
  return mod.acquireBrowserContext(key, options);
}
/**
 * #3368 PR7 — browser-pool observability. Returns disabled status and empty
 * metrics. Callers get a snapshot; the real pool state lives inside the
 * optional @omniroute/browser-pool package.
 */
export function getBrowserPoolMetrics(): {
  status: ReturnType<typeof getBrowserPoolStatus>;
  metrics: BrowserPoolMetrics;
} {
  return { status: getBrowserPoolStatus(), metrics: createEmptyMetrics() };
}

function createEmptyMetrics(): BrowserPoolMetrics {
  return {
    browserLaunches: 0,
    browserLaunchFailures: 0,
    contextsCreated: 0,
    contextsReused: 0,
    contextsEvicted: 0,
    contextsReleased: 0,
    contextCreateFailures: 0,
    shutdowns: 0,
    lastShutdownReason: null,
  };
}

export async function releaseBrowserContext(key: string): Promise<void> {
  const mod = await getMod();
  return mod.releaseBrowserContext(key);
}

export async function shutdownPool(reason: string): Promise<void> {
  const mod = await getMod();
  return mod.shutdownPool(reason);
}


/**
 * Test-only: reset cumulative metrics so assertions start from a clean slate.
 *
 * NOTE: This is async (returning `Promise<void>`) while upstream/release/v3.8.49
 * has a sync version (`function` → `void`). The stub MUST delegate to the
 * optional @omniroute/browser-pool package via `await getMod()`, so async is
 * unavoidable here. During rebase, RESOLVE by keeping the async version
 * (stub side) — the sync upstream version belongs to the full Playwright
 * implementation that lives in the package.
 */

export async function readPageResponseBody(
  response: import("playwright").Response
): Promise<{ status: number; headers: Record<string, string>; body: Buffer }> {
  const mod = await getMod();
  return mod.readPageResponseBody(response);
}
