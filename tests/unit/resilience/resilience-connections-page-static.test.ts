/**
 * Static assertions for the /dashboard/resilience/connections page.
 *
 * Source-text greps enforce the plan's structural invariants without spinning
 * up the Next.js runtime — these are the "must hold by construction" facts:
 * force-dynamic rendering, LOCAL_ONLY gating, i18n-only labels, DataTable
 * usage, stoppedRef pattern, optional-chaining on breaker, single-provider
 * data ownership, and the absence of banned patterns (ErrorBanner, rowClassName,
 * getJobRegistry coupling).
 *
 * Run: node --import tsx/esm --test --test-force-exit
 *        tests/unit/resilience-connections-page-static.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");

function read(rel: string): string {
  return readFileSync(resolve(root, rel), "utf8");
}

// All component source files that must be i18n-clean.
const componentFiles = [
  "src/app/(dashboard)/dashboard/resilience/connections/page.tsx",
  "src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient.tsx",
  "src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionsTable.tsx",
  "src/app/(dashboard)/dashboard/resilience/connections/components/BreakerTimeline.tsx",
  "src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionDetail.tsx",
];

test("page.tsx exports force-dynamic (no stale prerender)", () => {
  const src = read(componentFiles[0]);
  assert.match(
    src,
    /export\s+const\s+dynamic\s*=\s*"force-dynamic"/,
    "force-dynamic export missing"
  );
});

test("no getJobRegistry import in resilience page (wrong domain coupling)", () => {
  for (const f of componentFiles) {
    const src = read(f);
    assert.doesNotMatch(src, /getJobRegistry/, `${f} must not import getJobRegistry`);
  }
});

test("no ErrorBanner reference (plan uses inline banner)", () => {
  for (const f of componentFiles) {
    const src = read(f);
    assert.doesNotMatch(src, /ErrorBanner/, `${f} must not reference ErrorBanner`);
  }
});

test("no rowClassName reference (status colors live in renderCell)", () => {
  for (const f of componentFiles) {
    const src = read(f);
    assert.doesNotMatch(src, /rowClassName/, `${f} must not reference rowClassName`);
  }
});

test("DataTable columns use label (not header)", () => {
  const src = read(componentFiles[2]);
  assert.match(src, /label:\s*t\(/, "columns must use label prop");
  assert.doesNotMatch(src, /header:\s*t\(/, "columns must not use header prop");
});

test("stoppedRef pattern present in ResilienceConnectionsClient", () => {
  const src = read(componentFiles[1]);
  assert.match(src, /stoppedRef\s*=\s*useRef/, "stoppedRef pattern missing");
  assert.match(
    src,
    /stoppedRef\.current\s*=\s*true/,
    "stoppedRef permanent-stop assignment missing"
  );
});

test("breaker accessed with optional chaining (breaker?.state)", () => {
  const src = read(componentFiles[2]);
  assert.match(src, /breaker\?\.state/, "breaker must be accessed via optional chaining");
  assert.doesNotMatch(
    src,
    /(?<!\?)\.state\s*===/,
    "raw breaker.state (no chaining) must not appear"
  );
});

test("renderCell used as component-level prop with type annotation", () => {
  const src = read(componentFiles[2]);
  assert.match(
    src,
    /renderCell=\{\(row:\s*DataTableRow,\s*col:\s*DataTableColumn\)/,
    "renderCell must be a component-level prop with (row, col) type annotation"
  );
});

test("BreakerTimeline does NOT fetch independently (single-provider invariant)", () => {
  const src = read(componentFiles[3]);
  assert.doesNotMatch(src, /fetch\s*\(/, "BreakerTimeline must not self-fetch");
});

test("/dashboard/resilience/connections in LOCAL_ONLY_API_PREFIXES", () => {
  const src = read("src/server/authz/routeGuard.ts");
  assert.match(
    src,
    /"\/dashboard\/resilience\/connections"/,
    "dashboard path missing from LOCAL_ONLY"
  );
});

test("/api/resilience/connections in LOCAL_ONLY_API_PREFIXES", () => {
  const src = read("src/server/authz/routeGuard.ts");
  assert.match(src, /"\/api\/resilience\/connections"/, "api path missing from LOCAL_ONLY");
});

test("sidebar nav item has i18nKey and icon", () => {
  const src = read("src/shared/constants/sidebarVisibility/sections.ts");
  assert.match(src, /id:\s*"resilience-connections"/, "sidebar id missing");
  assert.match(src, /i18nKey:\s*"resilienceConnections"/, "sidebar i18nKey missing");
  assert.match(src, /icon:\s*"shield"/, "sidebar icon missing");
});

test("SYSTEM_GROUP referenced in sections.ts (symbol-based)", () => {
  const src = read("src/shared/constants/sidebarVisibility/sections.ts");
  assert.match(src, /SYSTEM_GROUP/, "SYSTEM_GROUP reference missing");
});

test("no hardcoded English labels in component files (all via t(...))", () => {
  // Heuristic: flag bare string literals used as JSX children that look like
  // English labels. We allow the known i18n-key strings and structural code.
  for (const f of componentFiles) {
    const src = read(f);
    // Disallow obvious hardcoded status labels outside t() calls.
    assert.doesNotMatch(src, />\s*Connection Resilience\s*</, `${f}: hardcoded page title`);
    assert.doesNotMatch(src, />\s*No connections\s*</, `${f}: hardcoded empty title`);
  }
});

test("page leads with plain-language reassurance before mechanics", () => {
  const src = read(componentFiles[0]);
  assert.match(src, /reassuranceTitle/, "reassurance heading missing from page.tsx");
  assert.match(src, /reassuranceDetail/, "reassurance detail missing from page.tsx");
  // Plain-language state legend renders before the client component
  const legendPos = src.indexOf("plainStates");
  const clientPos = src.indexOf("<ResilienceConnectionsClient");
  assert.ok(legendPos > -1 && legendPos < clientPos, "state legend must render before the table");
});

test("en.json carries plain-language state copy", () => {
  const messages = JSON.parse(read("src/i18n/messages/en.json"));
  const block = messages.resilienceConnections;
  assert.equal(block.reassuranceTitle, "Your connections recover automatically");
  assert.match(block.reassuranceDetail, /no action is needed/i);
  assert.equal(block.plainStates.healthy, "Requests can be sent");
  assert.equal(block.plainStates.coolingDown, "Trying again soon");
  assert.equal(block.plainStates.lockedOut, "Needs your attention");
});
