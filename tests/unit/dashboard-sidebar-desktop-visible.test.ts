import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function readSrc(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

// Regression guard: the dashboard shell must have one Sidebar DOM mount.
// Responsive behavior is implemented by changing that node's positioning,
// not by rendering separate desktop and mobile sidebars.

test("DashboardLayout uses one sidebar shell instead of the old dual responsive wrappers", () => {
  const source = readSrc("src/shared/components/layouts/DashboardLayout.tsx");
  assert.match(source, /id="dashboard-sidebar"/);
  assert.doesNotMatch(
    source,
    /dashboard-sidebar-desktop|mobile-sidebar|className="hidden[^"]*lg:flex"/
  );
});

test("DashboardLayout renders exactly one Sidebar and one Header", () => {
  const source = readSrc("src/shared/components/layouts/DashboardLayout.tsx");
  assert.equal((source.match(/<Sidebar\b/g) ?? []).length, 1);
  assert.equal((source.match(/<Header\b/g) ?? []).length, 1);
});

test("DashboardLayout uses one responsive sidebar shell", () => {
  const source = readSrc("src/shared/components/layouts/DashboardLayout.tsx");
  assert.match(source, /id="dashboard-sidebar"/);
  assert.doesNotMatch(source, /mobile-sidebar|dashboard-sidebar-desktop/);
});

test("globals.css defines one shell that is static on desktop and a drawer below 1024px", () => {
  const css = readSrc("src/app/globals.css");
  assert.match(css, /\.dashboard-sidebar-shell\s*\{[\s\S]*display:\s*flex/);
  assert.match(css, /@media\s*\(max-width:\s*1023px\)[\s\S]*position:\s*fixed/);
  assert.match(css, /@media\s*\(min-width:\s*1024px\)[\s\S]*position:\s*relative/);
});
