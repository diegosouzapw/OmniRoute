import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Static guards for the shared visual identity (Phase 1: graph-paper grid wallpaper).
// These lock in the cross-product design contract so an accidental edit can't silently
// remove the grid or re-introduce the opaque wrapper that hides it. See design.md.

const globalsCss = fs.readFileSync(new URL("../../src/app/globals.css", import.meta.url), "utf8");
const dashboardLayout = fs.readFileSync(
  new URL("../../src/shared/components/layouts/DashboardLayout.tsx", import.meta.url),
  "utf8"
);

test("globals.css defines the grid wallpaper tokens for both themes", () => {
  // light (opacity tuned up from the site's 0.045 so the grid is visible on the
  // dense dashboard — see the token comment in globals.css)
  assert.match(globalsCss, /--grid-line:\s*rgba\(0,\s*0,\s*0,\s*0\.07\)/);
  // dark
  assert.match(globalsCss, /--grid-line:\s*rgba\(255,\s*255,\s*255,\s*0\.06\)/);
  // size (shrunk ~30% from 46px for a tighter grid) + alternating-section overlay
  assert.match(globalsCss, /--grid-size:\s*32px/);
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
  assert.match(before, /linear-gradient\(to right,\s*var\(--grid-line\) 1px, transparent 1px\)/);
  assert.match(before, /linear-gradient\(to bottom,\s*var\(--grid-line\) 1px, transparent 1px\)/);
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
  assert.ok(
    edges.includes('from "@/shared/constants/statusColors"'),
    "edgeStyles imports the module"
  );
  assert.ok(edges.includes("STATUS_HEX.success"), "edgeStyles uses STATUS_HEX, not a literal");
  assert.ok(!edges.includes('"#22c55e"'), "edgeStyles no longer hardcodes the success hex");
  assert.ok(badge.includes("STATUS_HEX.success"), "TokenHealthBadge uses STATUS_HEX");
  assert.ok(!badge.includes('"#22c55e"'), "TokenHealthBadge no longer hardcodes the success hex");
});

test("globals.css defines a monospace token (site parity)", () => {
  assert.match(globalsCss, /--font-mono:\s*ui-monospace/);
});

test("DataTable is theme-aware via --table-* tokens (dark = the exact old values)", () => {
  // The dark token values must equal the rgba the component used to hardcode, so dark
  // stays byte-identical while light gets fixed.
  assert.match(globalsCss, /--table-header-bg:\s*rgba\(15,\s*15,\s*25,\s*0\.95\)/); // dark
  assert.match(globalsCss, /--table-row-zebra:\s*rgba\(255,\s*255,\s*255,\s*0\.02\)/); // dark
  assert.match(globalsCss, /--table-row-hover:\s*rgba\(255,\s*255,\s*255,\s*0\.04\)/); // dark
  assert.match(globalsCss, /--table-cell-border:\s*rgba\(255,\s*255,\s*255,\s*0\.04\)/); // dark
  assert.match(globalsCss, /--table-header-bg:\s*rgba\(249,\s*249,\s*251,\s*0\.95\)/); // light fix

  const dt = read("../../src/shared/components/DataTable.tsx");
  assert.ok(dt.includes("var(--table-header-bg)"), "header uses the token");
  assert.ok(dt.includes("var(--table-row-zebra)"), "zebra uses the token");
  assert.ok(dt.includes("var(--color-border)"), "header border uses the brand token");
  assert.ok(
    !/rgba\(|#[0-9a-fA-F]{3,6}/.test(dt),
    "DataTable no longer hardcodes any color literal"
  );
  assert.ok(
    !dt.includes("--text-secondary") && !dt.includes("--bg-table-header"),
    "the dead var fallbacks are gone"
  );
});

// ── Phase 4 (safe additives): cn() merge + Checkbox / Textarea primitives ──

test("cn() dedupes conflicting Tailwind classes via tailwind-merge", () => {
  const cnSrc = read("../../src/shared/utils/cn.ts");
  assert.match(cnSrc, /from "tailwind-merge"/);
  assert.match(cnSrc, /from "clsx"/);
  assert.match(cnSrc, /twMerge\(clsx\(/);
});

test("Checkbox + Textarea primitives exist and are exported", () => {
  const barrel = read("../../src/shared/components/index.tsx");
  assert.ok(barrel.includes('export { default as Checkbox } from "./Checkbox"'));
  assert.ok(barrel.includes('export { default as Textarea } from "./Textarea"'));
  const checkbox = read("../../src/shared/components/Checkbox.tsx");
  const textarea = read("../../src/shared/components/Textarea.tsx");
  assert.ok(
    checkbox.includes("accent-[var(--color-accent)]"),
    "checkbox uses the brand accent token"
  );
  assert.ok(textarea.includes("rounded-control"), "textarea uses the control radius");
});

// ── C6: form controls share one accent focus ring (separate from the red error state) ──

test("form controls focus on the accent ring, not the red primary", () => {
  // The global :focus-visible ring already uses --color-accent. Align the form
  // controls to it so keyboard focus is one consistent violet everywhere and the
  // red focus ring no longer collides with the red error state.
  assert.match(globalsCss, /--focus-ring:.*var\(--color-accent\)/);
  for (const name of ["Input", "Select", "Textarea", "Toggle", "Checkbox"]) {
    const src = read(`../../src/shared/components/${name}.tsx`);
    assert.ok(/ring-accent\/30/.test(src), `${name} uses the accent focus ring`);
    assert.ok(
      !/(?:focus|focus-visible):ring-primary\/30/.test(src),
      `${name} no longer uses the red primary focus ring`
    );
    // the red error ring stays intact where the control has an error state
    if (src.includes("error")) {
      assert.ok(src.includes("ring-red-500/20"), `${name} keeps the red error ring`);
    }
  }
});

// ── Phase 5: the grid reaches every standalone screen + the shell is fluid up to 4K ──

test("standalone full-screen pages stay transparent so the grid shows through", () => {
  // Same contract as the DashboardLayout shell: a full-viewport wrapper must not paint
  // an opaque bg-bg over the body::before grid. These are the auth / error / legal /
  // status / onboarding screens that render outside the dashboard layout — the ones the
  // first grid phase missed. (?![\w-]) keeps bg-bg-alt / bg-bg-main from matching.
  const pages = [
    "../../src/app/login/page.tsx",
    "../../src/app/forgot-password/page.tsx",
    "../../src/app/callback/page.tsx",
    "../../src/app/maintenance/page.tsx",
    "../../src/app/offline/page.tsx",
    "../../src/app/status/page.tsx",
    "../../src/app/terms/page.tsx",
    "../../src/app/privacy/page.tsx",
    "../../src/app/(dashboard)/dashboard/onboarding/page.tsx",
    "../../src/shared/components/ErrorPageScaffold.tsx",
  ];
  for (const p of pages) {
    const src = read(p);
    assert.ok(
      !/min-h-screen[^"]*\bbg-bg(?![\w-])/.test(src) &&
        !/\bbg-bg(?![\w-])[^"]*min-h-screen/.test(src),
      `${p} must not paint bg-bg on a min-h-screen wrapper (it would hide the grid)`
    );
  }
});

test("DashboardLayout content shell is fluid up to ~4K before centering", () => {
  // The inner content wrapper grows with the viewport up to a 4K cap (3840px) instead
  // of the old max-w-7xl (1280px) that left wide side gutters on large monitors.
  assert.ok(
    dashboardLayout.includes("max-w-[3840px] mx-auto"),
    "content wrapper caps at 3840px (4K) and centers only beyond that"
  );
  assert.ok(!dashboardLayout.includes("max-w-7xl"), "the old 1280px max-w-7xl cap is gone");
});

// ── Phase 6: data tables are opaque content surfaces so the grid never bleeds through ──
//
// The dashboard content area is intentionally transparent (the body::before grid shows
// through as a wallpaper). A data table whose nearest ancestor is NOT an opaque surface
// would let the grid bleed through its transparent even-rows / low-alpha zebra rows.
// Cards already carry bg-surface; these guards cover the shared table primitives and the
// tables that render *without* a Card. Tables verified to live inside a <Card>/Modal are
// intentionally left untouched (bg-surface there would be a redundant no-op).

test("DataTable primitive paints its own opaque surface", () => {
  const dt = read("../../src/shared/components/DataTable.tsx");
  assert.ok(
    dt.includes("var(--color-surface)"),
    "DataTable scroll container is opaque (its even rows are transparent by design)"
  );
});

test("log table cards are opaque (no semi-transparent bg-black tint)", () => {
  // bg-black/5|20 on a <Card> wins over the Card's own bg-surface via tailwind-merge,
  // turning the big log tables ~95% transparent — the grid bled straight through them.
  for (const p of [
    "../../src/shared/components/ProxyLogger.tsx",
    "../../src/shared/components/RequestLoggerV2.tsx",
  ]) {
    const src = read(p);
    assert.ok(
      !src.includes("bg-black/5") && !src.includes("bg-black/20"),
      `${p} must not tint the table Card with bg-black/5|20 (it drops the Card's opaque surface)`
    );
    assert.ok(src.includes("bg-surface"), `${p} table card uses the opaque bg-surface`);
  }
});

test("card-less data tables wrap their table in an opaque surface", () => {
  const expect = [
    [
      "../../src/app/(dashboard)/dashboard/batch/BatchListTab.tsx",
      "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]",
    ],
    [
      "../../src/app/(dashboard)/dashboard/batch/FilesListTab.tsx",
      "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]",
    ],
    [
      "../../src/app/(dashboard)/dashboard/cache/components/CacheEntriesTab.tsx",
      "overflow-x-auto bg-surface",
    ],
    [
      "../../src/app/(dashboard)/dashboard/settings/components/proxy/FreePoolTab.tsx",
      "rounded border border-border bg-surface",
    ],
    [
      "../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/ModelMappingTable.tsx",
      "overflow-hidden bg-surface",
    ],
    [
      "../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/shared/HeaderTable.tsx",
      "bg-surface",
    ],
  ];
  for (const [p, needle] of expect) {
    const src = read(p);
    assert.ok(
      src.includes(needle),
      `${p} must include "${needle}" so the table is opaque over the grid`
    );
  }
});

test("semi-transparent cache table boxes are now opaque", () => {
  for (const p of [
    "../../src/app/(dashboard)/dashboard/cache/components/ReasoningCacheTab.tsx",
    "../../src/app/(dashboard)/dashboard/cache/page.tsx",
  ]) {
    const src = read(p);
    assert.ok(
      !src.includes("bg-surface/35"),
      `${p} table box no longer uses the ~35%-opaque bg-surface/35 (the grid bled through it)`
    );
  }
});
