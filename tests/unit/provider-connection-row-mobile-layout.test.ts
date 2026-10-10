import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow.tsx",
    import.meta.url
  ),
  "utf8"
);

test("provider connection actions fill the row width and wrap on mobile", () => {
  assert.match(
    source,
    /className="flex w-full flex-wrap items-center justify-between gap-0.5 sm:gap-1 xl:justify-end \[&>button\]:grow-0"/,
    "on narrow screens the action icons must spread across the full row width and wrap instead of scrolling"
  );
  assert.match(
    source,
    /className="contents"/,
    "icon-only actions must join the same flex line so they are spread with the other actions"
  );
  assert.match(
    source,
    /className="inline-flex size-7 items-center justify-center/,
    "icon-only actions must use the same square touch target"
  );
  assert.match(
    source,
    /className="!size-7 !p-0 sm:!w-auto sm:!px-2 text-xs"/,
    "labeled actions must collapse to the same icon-only square on narrow rows"
  );
  // PR #15532 review: the collapse is phone-only — from `sm` up the labeled actions
  // keep their visible text (Retest, Token, Apply/Export Codex/Claude auth).
  for (const label of [
    't("retest")',
    't("tokenShort")',
    "applyCodexAuthLabel",
    "exportCodexAuthLabel",
    "applyClaudeAuthLabel",
    "exportClaudeAuthLabel",
  ]) {
    assert.ok(
      source.includes(`<span className="hidden sm:inline">{${label}}</span>`),
      `the ${label} action must show its text label from the sm breakpoint up`
    );
  }
  assert.doesNotMatch(
    source,
    /className="!size-7 !p-0 text-xs[^"]*"/,
    "no labeled action may stay icon-only on desktop widths"
  );
  assert.match(
    source,
    /className="basis-full min-w-0 xl:basis-auto"/,
    "narrow screens must give the action bar the full row width"
  );
  assert.doesNotMatch(
    source,
    /w-max min-w-full|overflow-x-auto xl:basis-auto/,
    "the action bar must not fall back to a horizontally scrolling single row"
  );
});

const read = (rel: string) => readFileSync(new URL(`../../${rel}`, import.meta.url), "utf8");
const providerComponents = "src/app/(dashboard)/dashboard/providers/[id]/components";

test("connections toolbar and bulk actions use the shared full-width ActionBar", () => {
  assert.match(read(`${providerComponents}/ConnectionsHeaderToolbar.tsx`), /<ActionBar>/);
  assert.match(read(`${providerComponents}/ConnectionsListPanel.tsx`), /<ActionBar>/);
  const actionBar = read("src/shared/components/ActionBar.tsx");
  assert.match(
    actionBar,
    /flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0 \[&>\*\]:grow \[&>\*\]:justify-center sm:\[&>\*\]:grow-0/,
    "on narrow screens the bar buttons must grow to fill each line and wrap"
  );
});

test("connection filters use the shared FilterPills that fill the line on phones", () => {
  assert.match(read(`${providerComponents}/ConnectionsListPanel.tsx`), /<FilterPills/);
  const pills = read("src/shared/components/FilterPills.tsx");
  assert.match(pills, /flex w-full flex-wrap items-center gap-1\.5 sm:w-auto/);
  assert.match(pills, /inline-flex grow items-center justify-center/);
});

test("connection rows use the compact shared ReorderControl and hide separators on phones", () => {
  assert.match(source, /<ReorderControl/);
  assert.doesNotMatch(source, /<span className="text-text-muted\/30 select-none">\|<\/span>/);
  assert.match(
    read("src/shared/components/ReorderControl.tsx"),
    /flex size-5 items-center justify-center/
  );
});

test("icon size utilities win over the Material Symbols base size", () => {
  const globals = read("src/app/globals.css");
  assert.match(globals, /@import "material-symbols\/outlined\.css" layer\(base\);/);
  assert.match(globals, /@layer base \{\s*:where\(\.material-symbols-outlined\) \{/);
});

test("provider lists use the shared one-column-on-phones card grid", () => {
  const page = read("src/app/(dashboard)/dashboard/providers/page.tsx");
  assert.match(page, /<ProviderCardGrid>/);
  assert.doesNotMatch(
    page,
    /<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">/
  );
  assert.match(
    read("src/shared/components/ProviderCardGrid.tsx"),
    /grid grid-cols-1 gap-3 min-\[480px\]:grid-cols-2/
  );
});

test("no bare pipe separators are left visible on phones in the connection row", () => {
  const quotaToggle = read(`${providerComponents}/ProviderQuotaVisibilityToggle.tsx`);
  assert.doesNotMatch(quotaToggle, /<span className="text-text-muted\/30 select-none">\|<\/span>/);
});

test("custom model add and edit forms share the two-column phone grid", () => {
  const custom = read(`${providerComponents}/CustomModelsSection.tsx`);
  assert.match(custom, /const FORMAT_FIELDS_GRID = "grid grid-cols-2 items-end gap-3/);
  assert.equal(custom.match(/className=\{FORMAT_FIELDS_GRID\}/g)?.length, 2);
  assert.equal(custom.match(/className=\{ENDPOINTS_GRID\}/g)?.length, 2);
  assert.doesNotMatch(custom, /overflow-x-auto overflow-y-visible/);
});

test("toggle thumb is vertically centred in its track", () => {
  const toggle = read("src/shared/components/Toggle.tsx");
  assert.match(toggle, /"relative inline-flex shrink-0 cursor-pointer items-center rounded-full"/);
  assert.doesNotMatch(toggle, /"mt-0\.5"/);
});

test("provider models use the symmetric AutoGrid", () => {
  assert.match(read(`${providerComponents}/ProviderModelsSection.tsx`), /<AutoGrid>/);
  assert.match(
    read("src/shared/components/AutoGrid.tsx"),
    /repeat\(auto-fill,minmax\(var\(--auto-grid-min\),1fr\)\)/
  );
  assert.doesNotMatch(read(`${providerComponents}/ModelRow.tsx`), /max-w-md/);
});

test("model card: icon + full name on top, copy pinned top-right, details below", () => {
  const row = read(`${providerComponents}/ModelRow.tsx`);
  assert.match(row, /relative flex h-full w-full min-w-0 flex-col gap-1\.5/);
  assert.match(row, /<code className="min-w-0 break-all pt-px font-mono/);
  assert.match(row, /<div className="flex min-w-0 items-center gap-2 pl-6">/);
  assert.match(
    read(`${providerComponents}/ModelCompatPopover.tsx`),
    /<span className="hidden sm:inline">\{t\("compatButtonLabel"\)\}<\/span>/
  );
  assert.match(row, /absolute right-2 top-2 rounded p-0\.5/);
});
