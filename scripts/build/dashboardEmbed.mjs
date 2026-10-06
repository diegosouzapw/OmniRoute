/**
 * Opt-in iframe embedding for OmniRoute's HTML pages (#10273).
 *
 * OmniRoute ships `frame-ancestors 'none'` + `X-Frame-Options: DENY` on every route, which
 * is the right default for a proxy that holds provider credentials. The OmniCopilot VS Code
 * extension, however, renders the dashboard inside the built-in Simple Browser — an iframe
 * whose ancestor is a `vscode-webview:` document — so the strict default paints a blank tab.
 *
 * Setting `DASHBOARD_ALLOW_EMBED=vscode` at build time swaps the page surface to
 * `frame-ancestors 'self' vscode-webview:` and drops `X-Frame-Options` for those pages.
 * XFO has no syntax for a custom scheme, and keeping `DENY` alongside a permissive
 * `frame-ancestors` would still block the frame in engines that honour XFO first — dropping
 * it is required, not cosmetic. (Modern engines ignore XFO entirely once `frame-ancestors`
 * is present, so nothing is lost where CSP is supported.)
 *
 * The API surface is deliberately left out: `/api/*`, `/v1*`, `/a2a`, `/healthz` and every
 * root-level rewrite alias keep the strict headers even in embed mode. Those are the
 * Hard-Rule-15/17 process-spawning and proxy surfaces and never need framing.
 *
 * Build-time by design: Next.js resolves `headers()` when the config loads, matching the
 * existing env-driven knobs in `next.config.mjs` (`OMNIROUTE_BASE_PATH`,
 * `OMNIROUTE_BUILD_PROFILE`, …). Changing the value requires a rebuild.
 */

export const DASHBOARD_EMBED_ENV = "DASHBOARD_ALLOW_EMBED";

/** Ancestor allow-list per supported embed mode. Adding a mode here is the only extension point. */
export const EMBED_FRAME_ANCESTORS = Object.freeze({
  // `vscode-webview:` is the scheme VS Code assigns to webview/Simple Browser documents.
  // `'self'` keeps OmniRoute's own same-origin frames (e.g. the G-10 9Router embed) working.
  vscode: "'self' vscode-webview:",
});

/** The strict `frame-ancestors` token the CSP carries by default. */
export const STRICT_FRAME_ANCESTORS = "frame-ancestors 'none'";

/**
 * App-router surfaces that are not HTML pages and have no `rewrites()` alias to derive them
 * from. Everything else in the exclusion list comes from the rewrite table, so a future API
 * alias is excluded automatically instead of silently becoming framable.
 */
export const STATIC_NON_PAGE_PREFIXES = Object.freeze(["api", "a2a", "healthz"]);

/**
 * Resolve the opt-in embed mode from the environment.
 * Unknown / truthy-looking values (`1`, `true`, `on`) intentionally do NOT enable embedding:
 * the operator must name the ancestor family they are opening up.
 *
 * @param {Record<string, string | undefined>} env
 * @returns {"vscode" | null}
 */
export function resolveDashboardEmbedMode(env = process.env) {
  const raw = env?.[DASHBOARD_EMBED_ENV];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim().toLowerCase();
  return Object.hasOwn(EMBED_FRAME_ANCESTORS, normalized) ? normalized : null;
}

/**
 * The first path segment of every route that must stay unframable, derived from the
 * `rewrites()` table plus the static app-router API surfaces.
 *
 * @param {{ source: string }[]} rewriteRules
 * @returns {string[]} sorted, de-duplicated prefixes
 */
export function nonPageRoutePrefixes(rewriteRules = []) {
  const prefixes = new Set(STATIC_NON_PAGE_PREFIXES);
  for (const { source } of rewriteRules) {
    const first = source.replace(/^\//, "").split("/")[0];
    // Skip parameterised first segments (`/:path*`) — they would exclude the whole site.
    if (first && !first.startsWith(":")) prefixes.add(first);
  }
  return [...prefixes].sort();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Two complementary Next.js `source` patterns built from the same prefix list, so the union
 * covers every pathname exactly once — no gap (a page with no security headers) and no
 * overlap (an order-dependent merge).
 *
 * @param {string[]} prefixes
 * @returns {{ nonPageSource: string, pageSource: string }}
 */
export function complementarySources(prefixes) {
  const alternation = prefixes.map(escapeRegExp).join("|");
  const boundary = `(?:${alternation})(?:/|$)`;
  return {
    nonPageSource: `/((?=${boundary}).*)`,
    pageSource: `/((?!${boundary}).*)`,
  };
}

/**
 * Swap only the `frame-ancestors` token of an existing CSP, leaving every other directive
 * byte-identical.
 *
 * @param {string} contentSecurityPolicy
 * @param {"vscode"} mode
 */
export function relaxFrameAncestors(contentSecurityPolicy, mode) {
  return contentSecurityPolicy.replace(
    STRICT_FRAME_ANCESTORS,
    `frame-ancestors ${EMBED_FRAME_ANCESTORS[mode]}`
  );
}

/**
 * Build the `headers()` rules carrying OmniRoute's baseline security headers.
 *
 * With embedding off this returns the single catch-all rule the config has always had, so a
 * default build is unchanged. With embedding on it returns two complementary rules: the API
 * surface keeps the strict headers, the page surface gets the relaxed CSP and no XFO.
 *
 * @param {{
 *   mode: "vscode" | null,
 *   securityHeaders: { key: string, value: string }[],
 *   prefixes?: string[],
 * }} options
 * @returns {{ source: string, headers: { key: string, value: string }[] }[]}
 */
export function buildSecurityHeaderRules({ mode, securityHeaders, prefixes = [] }) {
  if (!mode) return [{ source: "/:path*", headers: securityHeaders }];

  const { nonPageSource, pageSource } = complementarySources(prefixes);
  const pageHeaders = securityHeaders
    // X-Frame-Options cannot express `vscode-webview:` and would veto the relaxed CSP.
    .filter((header) => header.key !== "X-Frame-Options")
    .map((header) =>
      header.key === "Content-Security-Policy"
        ? { key: header.key, value: relaxFrameAncestors(header.value, mode) }
        : header
    );

  return [
    { source: nonPageSource, headers: securityHeaders },
    { source: pageSource, headers: pageHeaders },
  ];
}
