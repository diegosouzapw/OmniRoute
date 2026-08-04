import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function readSrc(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

// Regression guard: the desktop dashboard sidebar must stay visible on desktop.
// The old `hidden ... lg:flex` Tailwind cascade is fragile — class ordering /
// specificity can collapse the `lg:flex` and leave the sidebar permanently
// hidden. The fix moves visibility into an explicit `.dashboard-sidebar-desktop`
// class backed by a 1024px media query in globals.css.

test("DashboardLayout desktop sidebar uses the explicit visibility class, not the hidden/lg:flex cascade", () => {
  const source = readSrc("src/shared/components/layouts/DashboardLayout.tsx");

  // The desktop sidebar wrapper must reference the dedicated class.
  assert.match(
    source,
    /className="dashboard-sidebar-desktop"/,
    "Desktop sidebar wrapper must use the dashboard-sidebar-desktop class"
  );

  // The fragile Tailwind cascade must be gone.
  assert.doesNotMatch(
    source,
    /className="hidden[^"]*lg:flex"/,
    "Desktop sidebar wrapper must not rely on the hidden/lg:flex Tailwind cascade"
  );
});

test("globals.css defines dashboard-sidebar-desktop hidden by default and flex at >=1024px", () => {
  const css = readSrc("src/app/globals.css");

  // Class exists.
  assert.match(
    css,
    /\.dashboard-sidebar-desktop\s*\{/,
    "globals.css must define .dashboard-sidebar-desktop"
  );

  // Hidden by default (mobile-first), then shown via a 1024px desktop media query.
  const classIndex = css.indexOf(".dashboard-sidebar-desktop");
  const desktopRule =
    /@media\s*\(min-width:\s*1024px\)\s*\{[^}]*\.dashboard-sidebar-desktop\s*\{[^}]*display:\s*flex/;
  assert.match(
    css.slice(classIndex - 200),
    desktopRule,
    "globals.css must show .dashboard-sidebar-desktop with display:flex at min-width:1024px"
  );

  // Default state hides it (display:none) so mobile is unaffected.
  const baseRule = /\.dashboard-sidebar-desktop\s*\{[^}]*display:\s*none/;
  assert.match(
    css,
    baseRule,
    "globals.css must hide .dashboard-sidebar-desktop by default (display:none)"
  );
});
