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

// ── Phase 2: primitives adopt the shared radius scale, brand gradient & border token ──

const read = (p: string) => fs.readFileSync(new URL(p, import.meta.url), "utf8");

test("globals.css exposes the semantic radius utilities", () => {
  assert.match(globalsCss, /--radius-control:\s*9px/); // :root value
  assert.match(globalsCss, /--radius-card:\s*var\(--radius\)/); // @theme → rounded-card (14px)
  assert.match(globalsCss, /--radius-control:\s*var\(--radius-control\)/); // @theme → rounded-control
});

test("Button uses the brand gradient + accent variant + control radius", () => {
  const button = read("../../src/shared/components/Button.tsx");
  assert.match(button, /primary:\s*"bg-\[image:var\(--grad-brand\)\]/);
  assert.match(button, /accent:\s*"bg-accent/);
  assert.ok(
    !button.includes("from-primary to-primary-hover"),
    "the flat red→red gradient is replaced by --grad-brand"
  );
  assert.ok(button.includes("rounded-control"), "button sizes use the control radius");
});

test("Card / Modal / Input / Select adopt the radius scale and border token", () => {
  const card = read("../../src/shared/components/Card.tsx");
  const modal = read("../../src/shared/components/Modal.tsx");
  const input = read("../../src/shared/components/Input.tsx");
  const select = read("../../src/shared/components/Select.tsx");
  assert.ok(card.includes("border border-border"), "card uses the --color-border token");
  assert.ok(card.includes("rounded-card"), "card uses rounded-card (14px)");
  assert.ok(!card.includes("border-black/5"), "the under-weight /5 border is gone");
  assert.ok(modal.includes("rounded-card"), "modal uses rounded-card");
  assert.ok(input.includes("rounded-control"), "input uses rounded-control (9px)");
  assert.ok(select.includes("rounded-control"), "select uses rounded-control (9px)");
});

// ── Phase 3 (partial): status hex centralized + mono font token ──

test("status colors come from one canonical module", () => {
  const mod = read("../../src/shared/constants/statusColors.ts");
  assert.match(mod, /success:\s*"#22c55e"/);
  assert.match(mod, /warning:\s*"#f59e0b"/);
  assert.match(mod, /error:\s*"#ef4444"/);

  const edges = read("../../src/shared/components/flow/edgeStyles.ts");
  const badge = read("../../src/shared/components/TokenHealthBadge.tsx");
  assert.ok(edges.includes('from "@/shared/constants/statusColors"'), "edgeStyles imports the module");
  assert.ok(edges.includes("STATUS_HEX.success"), "edgeStyles uses STATUS_HEX, not a literal");
  assert.ok(!edges.includes('"#22c55e"'), "edgeStyles no longer hardcodes the success hex");
  assert.ok(badge.includes("STATUS_HEX.success"), "TokenHealthBadge uses STATUS_HEX");
  assert.ok(!badge.includes('"#22c55e"'), "TokenHealthBadge no longer hardcodes the success hex");
});

test("globals.css defines a monospace token (site parity)", () => {
  assert.match(globalsCss, /--font-mono:\s*ui-monospace/);
});
