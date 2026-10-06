// Regression guard for #10273: opt-in CSP relaxation so OmniRoute's HTML pages can be
// embedded in the VS Code Simple Browser (the OmniCopilot extension's `dashboardOpen:
// "editor"` mode renders them inside a `vscode-webview:` iframe).
//
// The default posture is UNCHANGED and must stay that way: `frame-ancestors 'none'` +
// `X-Frame-Options: DENY` on every route. Only when the operator explicitly sets
// DASHBOARD_ALLOW_EMBED=vscode do the HTML pages switch to
// `frame-ancestors 'self' vscode-webview:` and drop `X-Frame-Options` (XFO has no syntax
// for a custom scheme, and CSP frame-ancestors supersedes it in modern engines).
//
// The API surface (`/api`, `/v1`, `/v1beta`, the root-level rewrite aliases, `/a2a`,
// `/healthz`) must keep the strict headers even in embed mode — those are the
// Hard-Rule-15/17 surfaces and never need framing.
//
// These tests assert EFFECTIVE headers, not config shape: `effectiveHeaders()` replays
// Next.js's own matching + last-wins merge (see
// node_modules/next/dist/server/lib/router-utils/resolve-routes.js, `resHeaders[key] = value`)
// so a rule that silently stops matching, or an ordering regression, fails here.

import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match.js";

import {
  DASHBOARD_EMBED_ENV,
  EMBED_FRAME_ANCESTORS,
  resolveDashboardEmbedMode,
  nonPageRoutePrefixes,
  buildSecurityHeaderRules,
} from "../../scripts/build/dashboardEmbed.mjs";

const modulePath = path.join(process.cwd(), "next.config.mjs");
const originalEmbed = process.env[DASHBOARD_EMBED_ENV];

interface HeaderEntry {
  key: string;
  value: string;
}
interface HeaderRule {
  source: string;
  headers: HeaderEntry[];
}

async function loadHeaders(label: string): Promise<HeaderRule[]> {
  const mod = await import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
  return mod.default.headers();
}

/** Replay Next.js's header matching + last-wins merge for one pathname. */
function effectiveHeaders(rules: HeaderRule[], pathname: string): Record<string, string> {
  const merged: Record<string, string> = {};
  for (const rule of rules) {
    if (getPathMatch(rule.source, { removeUnnamedParams: true })(pathname) === false) continue;
    for (const { key, value } of rule.headers) merged[key] = value;
  }
  return merged;
}

// Pages an operator expects to reach inside the VS Code Simple Browser. `/login` is on the
// list on purpose: the webview has its own cookie jar, so an embedded session ALWAYS starts
// unauthenticated and `/dashboard` redirects there (src/server/authz/pipeline.ts).
const PAGE_PATHS = [
  "/",
  "/dashboard",
  "/dashboard/providers",
  "/dashboard/combos/editor",
  "/login",
  "/forgot-password",
  "/docs/guides/i18n",
  "/landing",
  "/status",
];

// Never framable — the process-spawning / proxy surfaces plus every root-level API alias
// declared in next.config.mjs `rewrites()`.
const API_PATHS = [
  "/api",
  "/api/v1/chat/completions",
  "/api/services/ninerouter/start",
  "/v1",
  "/v1/models",
  "/v1beta/models",
  "/chat/completions",
  "/responses",
  "/responses/abc/cancel",
  "/models",
  "/codex/responses",
  "/anthropic/v1/messages",
  "/openai/v1/models",
  "/metrics",
  "/debug",
  "/.env",
  "/a2a",
  "/healthz",
];

function restoreEnv(): void {
  if (originalEmbed === undefined) delete process.env[DASHBOARD_EMBED_ENV];
  else process.env[DASHBOARD_EMBED_ENV] = originalEmbed;
}

test.afterEach(restoreEnv);

// ── the opt-in switch itself ───────────────────────────────────────────────

test("#10273 embed mode is OFF unless DASHBOARD_ALLOW_EMBED names a known mode", () => {
  for (const raw of [undefined, "", "  ", "0", "1", "true", "yes", "on", "browser", "vscode-web"]) {
    assert.equal(
      resolveDashboardEmbedMode(raw === undefined ? {} : { [DASHBOARD_EMBED_ENV]: raw }),
      null,
      `DASHBOARD_ALLOW_EMBED=${JSON.stringify(raw)} must not enable embedding`
    );
  }
});

test("#10273 DASHBOARD_ALLOW_EMBED=vscode enables the vscode mode, case/space tolerant", () => {
  for (const raw of ["vscode", "VSCode", "  vscode  ", "VSCODE"]) {
    assert.equal(resolveDashboardEmbedMode({ [DASHBOARD_EMBED_ENV]: raw }), "vscode");
  }
  assert.equal(EMBED_FRAME_ANCESTORS.vscode, "'self' vscode-webview:");
});

// ── default posture must not move ──────────────────────────────────────────

test("#10273 default build keeps frame-ancestors 'none' + X-Frame-Options: DENY everywhere", async () => {
  delete process.env[DASHBOARD_EMBED_ENV];
  const rules = await loadHeaders("embed-off");

  assert.equal(
    rules[0].source,
    "/:path*",
    "the global rule must stay a plain catch-all by default"
  );

  for (const pathname of [...PAGE_PATHS, ...API_PATHS]) {
    const headers = effectiveHeaders(rules, pathname);
    assert.match(
      headers["Content-Security-Policy"],
      /frame-ancestors 'none'/,
      `${pathname} must keep frame-ancestors 'none' when the opt-in is off`
    );
    assert.equal(
      headers["X-Frame-Options"],
      "DENY",
      `${pathname} must keep X-Frame-Options: DENY when the opt-in is off`
    );
  }
});

test("#10273 default build emits no extra header rules (byte-identical to pre-feature config)", async () => {
  delete process.env[DASHBOARD_EMBED_ENV];
  const rules = await loadHeaders("embed-off-shape");
  assert.deepEqual(
    rules.map((rule) => rule.source),
    ["/:path*", "/dashboard/providers/services/:name/embed/:path*"]
  );
});

// ── embed mode ─────────────────────────────────────────────────────────────

test("#10273 embed mode lets vscode-webview: frame the HTML pages and drops X-Frame-Options", async () => {
  process.env[DASHBOARD_EMBED_ENV] = "vscode";
  const rules = await loadHeaders("embed-on-pages");

  for (const pathname of PAGE_PATHS) {
    const headers = effectiveHeaders(rules, pathname);
    assert.ok(
      headers["Content-Security-Policy"],
      `${pathname} must still receive a Content-Security-Policy`
    );
    assert.match(
      headers["Content-Security-Policy"],
      /frame-ancestors 'self' vscode-webview:/,
      `${pathname} must allow the vscode-webview: ancestor in embed mode`
    );
    assert.equal(
      headers["X-Frame-Options"],
      undefined,
      `${pathname} must NOT carry X-Frame-Options in embed mode (it would still block the iframe)`
    );
  }
});

test("#10273 embed mode keeps the API surface strictly unframable", async () => {
  process.env[DASHBOARD_EMBED_ENV] = "vscode";
  const rules = await loadHeaders("embed-on-api");

  for (const pathname of API_PATHS) {
    const headers = effectiveHeaders(rules, pathname);
    assert.match(
      headers["Content-Security-Policy"],
      /frame-ancestors 'none'/,
      `${pathname} is an API surface and must keep frame-ancestors 'none' even in embed mode`
    );
    assert.equal(
      headers["X-Frame-Options"],
      "DENY",
      `${pathname} is an API surface and must keep X-Frame-Options: DENY even in embed mode`
    );
    assert.ok(
      !headers["Content-Security-Policy"].includes("vscode-webview:"),
      `${pathname} must never allow the vscode-webview: ancestor`
    );
  }
});

test("#10273 embed mode relaxes ONLY frame-ancestors — every other directive/header survives", async () => {
  process.env[DASHBOARD_EMBED_ENV] = "vscode";
  const relaxed = effectiveHeaders(await loadHeaders("embed-on-intact"), "/dashboard");

  delete process.env[DASHBOARD_EMBED_ENV];
  const strict = effectiveHeaders(await loadHeaders("embed-off-intact"), "/dashboard");

  assert.equal(
    relaxed["Content-Security-Policy"],
    strict["Content-Security-Policy"].replace(
      "frame-ancestors 'none'",
      `frame-ancestors ${EMBED_FRAME_ANCESTORS.vscode}`
    ),
    "embed mode must swap the frame-ancestors token and change nothing else in the CSP"
  );

  for (const key of [
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Strict-Transport-Security",
  ]) {
    assert.equal(relaxed[key], strict[key], `${key} must be identical in embed mode`);
  }
});

test("#10273 embed mode preserves the G-10 9Router embed override (last rule still wins)", async () => {
  process.env[DASHBOARD_EMBED_ENV] = "vscode";
  const rules = await loadHeaders("embed-on-g10");
  const headers = effectiveHeaders(rules, "/dashboard/providers/services/ninerouter/embed/ui");

  assert.equal(
    headers["Content-Security-Policy"],
    "frame-ancestors 'self'",
    "the G-10 same-origin override must keep the last word for the 9Router embed route"
  );
});

// ── the API prefix list must stay derived from the config, not hand-maintained ──

test("#10273 every root-level rewrite alias is excluded from the embeddable page surface", async () => {
  const modUrl = `${pathToFileURL(modulePath).href}?case=prefixes-${Date.now()}`;
  const nextConfig = (await import(modUrl)).default;
  const rewrites = await nextConfig.rewrites();
  const prefixes = new Set(nonPageRoutePrefixes(rewrites));

  for (const { source } of rewrites) {
    const first = source.replace(/^\//, "").split("/")[0];
    assert.ok(
      prefixes.has(first),
      `rewrite alias "${source}" must be excluded from the embeddable page surface — ` +
        `it proxies an API route and must never be framable`
    );
  }
  // The app-router API surfaces that have no rewrite alias.
  for (const literal of ["api", "a2a", "healthz"]) {
    assert.ok(prefixes.has(literal), `"${literal}" must be excluded from the page surface`);
  }
});

test("#10273 Next.js accepts the generated header sources in BOTH modes (startup guard)", async () => {
  // `loadCustomRoutes` is the validation Next runs when the config loads: a `source` it
  // rejects aborts the build. The embed-mode sources are regexes, and CI never builds with
  // DASHBOARD_ALLOW_EMBED set — without this guard a malformed source would only blow up on
  // the operator's machine, at build time, with the feature already shipped.
  const require = createRequire(import.meta.url);
  const loadCustomRoutes = require("next/dist/lib/load-custom-routes.js").default;

  for (const mode of [undefined, "vscode"]) {
    if (mode) process.env[DASHBOARD_EMBED_ENV] = mode;
    else delete process.env[DASHBOARD_EMBED_ENV];

    const nextConfig = (
      await import(`${pathToFileURL(modulePath).href}?case=validate-${mode}-${Date.now()}`)
    ).default;
    const routes = await loadCustomRoutes({
      ...nextConfig,
      trailingSlash: false,
      skipTrailingSlashRedirect: false,
      basePath: "",
      i18n: undefined,
    });

    assert.equal(
      routes.headers.length,
      mode ? 3 : 2,
      `mode=${mode ?? "off"} should produce ${mode ? 3 : 2} header routes`
    );
  }
});

test("#10273 buildSecurityHeaderRules produces complementary sources with no gap", () => {
  const securityHeaders = [
    { key: "Content-Security-Policy", value: "frame-ancestors 'none'; default-src 'self'" },
    { key: "X-Frame-Options", value: "DENY" },
  ];
  const rules = buildSecurityHeaderRules({
    mode: "vscode",
    securityHeaders,
    prefixes: ["api", "v1"],
  });

  // Every pathname must be covered by exactly one of the two rules — a gap would ship a
  // page with NO security headers at all, an overlap would make the merge order-dependent.
  for (const pathname of ["/", "/dashboard", "/login", "/api/v1/models", "/v1/models", "/apifoo"]) {
    const matched = rules.filter(
      (rule) => getPathMatch(rule.source, { removeUnnamedParams: true })(pathname) !== false
    );
    assert.equal(
      matched.length,
      1,
      `${pathname} must match exactly one rule, got ${matched.length}`
    );
  }
});
