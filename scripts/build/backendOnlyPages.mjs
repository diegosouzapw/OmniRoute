#!/usr/bin/env node
/**
 * Backend-only build helper.
 *
 * When `OMNIROUTE_BUILD_BACKEND_ONLY=1` (or `OMNIROUTE_BUILD_PROFILE=backend`) is set,
 * `build-next-isolated.mjs` calls `stubDashboardPages()` BEFORE `next build` and
 * `restoreDashboardPages()` in a `finally` afterward.
 *
 * WHY: OmniRoute embedders that only consume the HTTP API (`/api/*`, `/v1/*`, `/v1beta/*`)
 * — e.g. the VibeProxy desktop app, headless self-hosters, CI that only needs the router —
 * do NOT need the Next.js dashboard UI. Building it dominates `next build`: the ~126 leaf
 * pages pull in heavy client vendor chunks (recharts, monaco-editor, @xyflow, mermaid,
 * @lobehub/icons), the static-generation pass renders every route, and React Server Actions
 * generate a client-entry manifest. Replacing every App-Router UI file (page/layout/template/
 * loading/error/not-found/default) with a trivial server stub removes the client graph, the
 * prerender pass, AND all `"use server"` actions, while leaving EVERY `route.ts` (API) handler,
 * `middleware`, and metadata route (sitemap/robots/manifest/icon/...) fully intact. The
 * resulting standalone `server.js` serves the complete backend API; the dashboard renders
 * nothing.
 *
 * WHY STUB LAYOUTS TOO (not just pages): Next's FlightClientEntryPlugin builds a per-route
 * Server-Actions manifest. Stubbing only the pages while leaving layouts (which import client
 * providers and inline `"use server"` actions) leaves actions registered whose page-level
 * client entry no longer exists — `createActionAssets` then dereferences an undefined module
 * map ("Cannot read properties of undefined (reading 'server')"). Stubbing the whole UI tree
 * removes every action and client reference, so the plugin has nothing to reconcile.
 *
 * SAFETY: these files are git-tracked, so a hard kill is recoverable via `git checkout -- src/app`.
 * The caller also restores in a `finally` block and on SIGINT/SIGTERM. Stubs carry a marker so
 * the operation is idempotent and detectable.
 */

import fs from "node:fs";
import path from "node:path";

export const BACKEND_ONLY_STUB_MARKER =
  "/* omniroute:backend-only-stub (auto-restored after build) */";

const HEADER = `${BACKEND_ONLY_STUB_MARKER}\n`;

// Leaf page → force-dynamic (never prerendered) server component returning null.
const PAGE_STUB = `${HEADER}export const dynamic = "force-dynamic";\nexport default function BackendOnlyPageStub() {\n  return null;\n}\n`;
// Root layout MUST render <html>/<body>. Minimal server component, no client imports.
const ROOT_LAYOUT_STUB = `${HEADER}export const dynamic = "force-dynamic";\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}\n`;
// Non-root layout / template → pass children through unchanged.
const PASSTHROUGH_STUB = `${HEADER}export default function BackendOnlyPassthroughStub({ children }) {\n  return children;\n}\n`;
// loading / default / not-found → render nothing.
const NULL_STUB = `${HEADER}export default function BackendOnlyNullStub() {\n  return null;\n}\n`;
// Error boundaries must be Client Components in Next; a no-op client stub carries no action.
const ERROR_STUB = `${HEADER}"use client";\nexport default function BackendOnlyErrorStub() {\n  return null;\n}\n`;
// global-error replaces the root layout on a root error, so it must render <html>/<body>.
const GLOBAL_ERROR_STUB = `${HEADER}"use client";\nexport default function BackendOnlyGlobalErrorStub() {\n  return (\n    <html>\n      <body></body>\n    </html>\n  );\n}\n`;

const UI_BASENAME_RE = /^(page|layout|template|loading|error|global-error|not-found|default)\.(tsx|jsx|ts|js)$/;
const ROUTE_FILE_RE = /[\\/]route\.(ts|js|tsx|jsx)$/;

/**
 * Strip a leading `"use server"` module directive. Some OmniRoute API Route Handlers
 * (`src/app/api/**\/route.ts`) carry a top-level `"use server"` — which registers the module
 * as a React Server-Actions provider. Once the dashboard pages that import those exports as
 * actions are stubbed away, Next's FlightClientEntryPlugin still has the action registered but
 * no client entry to bind it to, and `createActionAssets` dereferences an undefined module map
 * ("Cannot read properties of undefined (reading 'server')"). Removing the directive turns the
 * file back into a plain Route Handler — the GET/POST HTTP endpoint is UNCHANGED (route handlers
 * are server-side regardless of the directive) — so the API keeps working while the phantom
 * action registration disappears. The directive is only removed when it is the first real
 * statement (comments may precede it); a `"use server"` string appearing later is untouched.
 */
function stripLeadingUseServer(src) {
  const lines = src.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim().replace(/^\uFEFF/, "");
    if (t === "") continue;
    if (/^["']use server["'];?$/.test(t)) {
      lines.splice(i, 1);
      return { changed: true, src: lines.join("\n") };
    }
    if (t.startsWith("//") || t.startsWith("/*") || t.startsWith("*")) continue;
    break; // first real statement is not the directive
  }
  return { changed: false, src };
}

/** True when the current build should skip the dashboard frontend. */
export function isBackendOnlyBuild(env = process.env) {
  return env.OMNIROUTE_BUILD_BACKEND_ONLY === "1" || env.OMNIROUTE_BUILD_PROFILE === "backend";
}

function walkFiles(dir, out = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

/** Pick the stub source for an App-Router UI file (null = don't stub this file). */
function stubFor(file, appDir) {
  const base = path.basename(file);
  const m = UI_BASENAME_RE.exec(base);
  if (!m) return null;
  const kind = m[1];
  const relDir = path.relative(appDir, path.dirname(file));
  const isRoot = relDir === "" || relDir === ".";

  switch (kind) {
    case "page":
      return PAGE_STUB;
    case "layout":
      return isRoot ? ROOT_LAYOUT_STUB : PASSTHROUGH_STUB;
    case "template":
      return PASSTHROUGH_STUB;
    case "loading":
    case "default":
    case "not-found":
      return NULL_STUB;
    case "error":
      return ERROR_STUB;
    case "global-error":
      return GLOBAL_ERROR_STUB;
    default:
      return null;
  }
}

/**
 * Replace every App-Router UI file under src/app with a trivial stub.
 * @returns {{file:string, original:string}[]} stubbed files + their original contents.
 */
export function stubDashboardPages(rootDir = process.cwd(), log = console) {
  const appDir = path.join(rootDir, "src", "app");
  if (!fs.existsSync(appDir)) {
    log.warn?.("[backend-only] src/app not found — nothing to stub");
    return [];
  }

  const stubbed = [];
  for (const file of walkFiles(appDir)) {
    const stub = stubFor(file, appDir);
    if (stub) {
      let original;
      try {
        original = fs.readFileSync(file, "utf8");
      } catch {
        continue;
      }
      if (original.includes(BACKEND_ONLY_STUB_MARKER)) continue; // idempotent
      try {
        fs.writeFileSync(file, stub, "utf8");
        stubbed.push({ file, original });
      } catch (err) {
        log.warn?.(`[backend-only] Could not stub ${file}: ${err?.message || err}`);
      }
      continue;
    }

    // Route Handlers with a leading "use server" directive: strip the directive so the module
    // is no longer registered as a Server-Actions provider (the HTTP endpoint is unchanged).
    if (ROUTE_FILE_RE.test(file)) {
      let original;
      try {
        original = fs.readFileSync(file, "utf8");
      } catch {
        continue;
      }
      const { changed, src } = stripLeadingUseServer(original);
      if (!changed) continue;
      try {
        fs.writeFileSync(file, src, "utf8");
        stubbed.push({ file, original });
      } catch (err) {
        log.warn?.(`[backend-only] Could not de-action ${file}: ${err?.message || err}`);
      }
    }
  }

  const uiCount = stubbed.filter((e) => ROUTE_FILE_RE.test(e.file) === false).length;
  log.log?.(
    `[backend-only] Stubbed ${uiCount} App-Router UI file(s) + de-actioned ${
      stubbed.length - uiCount
    } route handler(s); route.ts HTTP endpoints left intact`
  );
  return stubbed;
}

/** Restore the original contents of every stubbed file. Best-effort; logs failures. */
export function restoreDashboardPages(stubbed, log = console) {
  if (!Array.isArray(stubbed) || stubbed.length === 0) return;
  let restored = 0;
  for (const entry of stubbed) {
    if (!entry) continue;
    try {
      fs.writeFileSync(entry.file, entry.original, "utf8");
      restored += 1;
    } catch (err) {
      log.error?.(
        `[backend-only] FAILED to restore ${entry.file}: ${err?.message || err} — ` +
          `run \`git checkout -- ${entry.file}\` to recover`
      );
    }
  }
  log.log?.(`[backend-only] Restored ${restored}/${stubbed.length} App-Router UI file(s)`);
}
