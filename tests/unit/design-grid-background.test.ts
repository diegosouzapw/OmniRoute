import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Static guards for the shared visual identity (Phase 1: graph-paper grid wallpaper).
// These lock in the cross-product design contract so an accidental edit can't silently
// remove the grid or re-introduce the opaque wrapper that hides it. See design.md.

const globalsCss = fs.readFileSync(
  new URL("../../src/app/globals.css", import.meta.url),
  "utf8"
);
const dashboardLayout = fs.readFileSync(
  new URL("../../src/shared/components/layouts/DashboardLayout.tsx", import.meta.url),
  "utf8"
);

test("globals.css defines the grid wallpaper tokens for both themes", () => {
  // light
  assert.match(globalsCss, /--grid-line:\s*rgba\(0,\s*0,\s*0,\s*0\.045\)/);
  // dark
  assert.match(globalsCss, /--grid-line:\s*rgba\(255,\s*255,\s*255,\s*0\.035\)/);
  // size + alternating-section overlay
  assert.match(globalsCss, /--grid-size:\s*46px/);
  assert.match(globalsCss, /--section-alt:\s*rgba\(0,\s*0,\s*0,\s*0\.022\)/);
  assert.match(globalsCss, /--section-alt:\s*rgba\(255,\s*255,\s*255,\s*0\.018\)/);
});

test("globals.css renders the grid via a body::before fixed layer", () => {
  // The pseudo-element must exist and be the grid renderer.
  const before = globalsCss.slice(globalsCss.indexOf("body::before"));
  assert.ok(before.length > 0, "body::before rule is present");
  assert.match(before, /position:\s*fixed/);
  assert.match(before, /z-index:\s*-1/);
  assert.match(before, /pointer-events:\s*none/);
  assert.match(
    before,
    /linear-gradient\(to right,\s*var\(--grid-line\) 1px, transparent 1px\)/
  );
  assert.match(
    before,
    /linear-gradient\(to bottom,\s*var\(--grid-line\) 1px, transparent 1px\)/
  );
  assert.match(before, /background-size:\s*var\(--grid-size\) var\(--grid-size\)/);
});

test("globals.css adds the shared identity tokens", () => {
  assert.match(globalsCss, /--surface-2:\s*#f5f5fa/); // light
  assert.match(globalsCss, /--surface-2:\s*#1c2230/); // dark
  assert.match(globalsCss, /--radius:\s*14px/);
  assert.match(
    globalsCss,
    /--grad-brand:\s*linear-gradient\(135deg,\s*var\(--color-primary\),\s*var\(--color-accent-light\)\)/
  );
  // exposed to Tailwind as bg-surface-2 for later phases
  assert.match(globalsCss, /--color-surface-2:\s*var\(--surface-2\)/);
});

test("DashboardLayout wrapper stays transparent so the grid shows through", () => {
  // Regression guard: the outer shell must NOT paint an opaque bg over the body grid.
  assert.ok(
    !dashboardLayout.includes("overflow-hidden bg-bg"),
    "DashboardLayout outer wrapper must not use bg-bg (it would hide the grid wallpaper)"
  );
  assert.ok(
    dashboardLayout.includes('className="flex h-dvh min-h-0 w-full overflow-hidden"'),
    "DashboardLayout outer wrapper is present and transparent"
  );
});
