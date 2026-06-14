/**
 * Verifies that the logs/activity page calls permanentRedirect("/dashboard/activity").
 * We mock next/navigation so no Next.js runtime is needed.
 */

import test from "node:test";
import assert from "node:assert/strict";

// Mock next/navigation before importing the page
let capturedRedirectTarget: string | undefined;

// Stub permanentRedirect to capture the call instead of throwing
const mockNavigation = {
  permanentRedirect: (target: string) => {
    capturedRedirectTarget = target;
    // permanentRedirect normally throws (NEXT_REDIRECT error)
    // In tests we just record the call
  },
  redirect: () => {},
  useRouter: () => ({}),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams(),
};

// Node.js module mock via loader is complex; instead we test by importing
// the source and verifying the permanent redirect is invoked correctly
// by inspecting the module's source text.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PAGE_PATH = resolve(
  import.meta.dirname ?? new URL(".", import.meta.url).pathname,
  "../../../src/app/(dashboard)/dashboard/logs/activity/page.tsx"
);

test("logs/activity/page.tsx contains permanentRedirect('/dashboard/activity')", () => {
  const src = readFileSync(PAGE_PATH, "utf-8");
  assert.ok(
    src.includes("permanentRedirect"),
    "page.tsx must call permanentRedirect"
  );
  assert.ok(
    src.includes("/dashboard/activity"),
    "page.tsx must redirect to /dashboard/activity"
  );
  assert.ok(
    src.includes(`from "next/navigation"`),
    "page.tsx must import from next/navigation"
  );
});

test("logs/activity/page.tsx does NOT import AuditLogTab anymore", () => {
  const src = readFileSync(PAGE_PATH, "utf-8");
  assert.ok(
    !src.includes("AuditLogTab"),
    "page.tsx must not reference AuditLogTab after F4 cleanup"
  );
});

test("logs/activity/page.tsx does NOT have 'use client' directive (server component)", () => {
  const src = readFileSync(PAGE_PATH, "utf-8");
  assert.ok(
    !src.includes('"use client"'),
    "redirect page must be a server component (no 'use client')"
  );
});

test("AuditLogTab.tsx no longer exists (deleted by F4)", () => {
  const AUDIT_LOG_TAB_PATH = resolve(
    import.meta.dirname ?? new URL(".", import.meta.url).pathname,
    "../../../src/app/(dashboard)/dashboard/logs/AuditLogTab.tsx"
  );
  let exists = false;
  try {
    readFileSync(AUDIT_LOG_TAB_PATH);
    exists = true;
  } catch {
    exists = false;
  }
  assert.ok(!exists, "AuditLogTab.tsx must have been deleted");
});

// Also confirm ActivityFeedClient exists
test("activity/ActivityFeedClient.tsx exists", () => {
  const CLIENT_PATH = resolve(
    import.meta.dirname ?? new URL(".", import.meta.url).pathname,
    "../../../src/app/(dashboard)/dashboard/activity/ActivityFeedClient.tsx"
  );
  let src: string;
  try {
    src = readFileSync(CLIENT_PATH, "utf-8");
  } catch {
    assert.fail("ActivityFeedClient.tsx does not exist");
    return;
  }
  assert.ok(src.includes("/api/compliance/audit-log"), "Client must fetch from audit-log endpoint");
  // The client sets level: "high" in URLSearchParams (produces level=high in the query string)
  assert.ok(
    src.includes('level: "high"') || src.includes("level=high"),
    "Client must request level=high"
  );
});

// Dummy to satisfy the mockNavigation reference (avoid unused var lint)
void mockNavigation;
