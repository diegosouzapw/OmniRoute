import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Regression guard for #4745 / discussion #4744.
// The v3.8.34 release refactor (commit 19d91d82e) removed the
// `import { useLiveRequests } from "@/hooks/useLiveDashboard"` line and the prop
// that consumed it, but left an orphaned `useLiveRequests()` call in the body.
// At runtime that threw `ReferenceError: useLiveRequests is not defined`, which
// the error boundary rendered as "Internal Server Error" -- the dashboard home
// page was completely broken in the shipped build. This test fails if any
// `useLive*` hook is *called* in HomePageClient without being imported.

const FILE = "src/app/(dashboard)/dashboard/HomePageClient.tsx";

test("HomePageClient does not call any useLive* hook without importing it (#4745)", () => {
  const source = readFileSync(FILE, "utf8");

  // Collect every hook called as `useLiveXxx(` in the component body.
  const calledHooks = new Set<string>();
  for (const m of source.matchAll(/\b(useLive[A-Za-z0-9]*)\s*\(/g)) {
    calledHooks.add(m[1]);
  }

  // Collect every identifier imported from the live-dashboard hook module.
  const importedHooks = new Set<string>();
  for (const m of source.matchAll(
    /import\s*\{([^}]*)\}\s*from\s*["']@\/hooks\/useLive[A-Za-z]*["']/g
  )) {
    for (const name of m[1].split(",")) {
      const clean = name.trim().split(/\s+as\s+/)[0].trim();
      if (clean) importedHooks.add(clean);
    }
  }

  for (const hook of calledHooks) {
    assert.ok(
      importedHooks.has(hook),
      `HomePageClient calls ${hook}() but never imports it -> ReferenceError at render (regression #4745)`
    );
  }
});
