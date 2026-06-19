# OmniRoute — Design System & Visual Identity

> **Status:** standardization plan. **Phases 1–3 are implemented in this PR** (grid, primitives, status-color centralization, mono token, and the DataTable token migration). The DataTable migration is **faithful** — dark stays byte-identical (the new `--table-*` dark values equal the old hardcoded rgba); light is fixed (it was buggy always-dark via dead `var()` fallbacks). **⚠️ Wants a visual pass before merge** (light-theme tables + the secondary-text shift `#888`→`--color-text-muted`). **Phase 4 is now largely done too** (C6 focus-ring → accent, C7 Checkbox/Textarea primitives, C9 `cn()`→tailwind-merge); only the selective C8 hex-sweep remains. Note several remaining "hardcoded" hex are _intentional_ (always-dark console terminal, ReactFlow SVG strokes) and must NOT be swept. **Phase 5 (D4 + D8): the grid now reaches every standalone screen** (login/auth/error/legal/status/onboarding — their opaque `bg-bg` full-screen wrappers were hiding it) **and the dashboard content shell is fluid up to 4K** (`max-w-7xl` → `max-w-[3840px]`) so it follows the viewport on large monitors instead of centering with wide side gutters. **Phase 6 (D9): data tables are now opaque surfaces** so the grid no longer bleeds through their rows — card-less tables paint `bg-surface`, and the two log tables' semi-transparent `bg-black/5` tint (which tailwind-merge let win over the Card's `bg-surface`) is removed. The grid size itself is already correct (32px, identical to the site); a "bigger" grid on a running instance is a stale build, not code.
> **Date:** 2026-06-16 · **Scope:** unify the OmniRoute dashboard (`src/`) with the marketing site (`_mono_repo/omnirouteSite/`) into **one visual identity** — same graph-paper grid background, same color tokens, standardized components.

---

## 1. Purpose

The marketing site (`viral.omniroute.online`, `why.omniroute.online`, `omniroute.online`) and the product dashboard should look like **one product**. The site already borrowed its palette from the dashboard — its `css/tokens.css` even says _"Palette mirrors the OmniRoute dashboard (src/app/globals.css)"_. So the two are already ~80% aligned at the color level. What's missing on the dashboard:

1. The **graph-paper grid wallpaper** the site uses on every page.
2. A handful of **shared design tokens** the site has but the dashboard lacks (radius scale, brand gradient, `surface-2`, mono font).
3. **Component-level consistency** — a number of dashboard components bypass the theme tokens with hardcoded hex/rgba.

This document is the analysis and the plan.

---

## 2. Principles

- **Single source of truth = `src/app/globals.css`.** The site mirrors the dashboard, never the other way around. New tokens land in `globals.css` first.
- **Tokens, never literals.** Components consume semantic tokens (`bg-surface`, `text-primary`, `border-border`), never raw `#hex`.
- **Subtle, not loud.** The grid is a faint wallpaper that sits behind content — it must never reduce text contrast or fight the UI.
- **Theme-aware.** Everything works in both `.dark` (the product's signature look) and light.
- **Surgical rollout.** Ship the grid + tokens first (low risk, high visibility), then component cleanups in waves.

---

## 3. Current state — what's already aligned vs. what's not

### 3.1 Colors — already unified ✅

Every brand color and surface already matches the site **by value** (only the names differ — dashboard prefixes with `--color-`). Verified in `src/app/globals.css:30-128`:

| Concept                    | Site token (`tokens.css`)                   | Dashboard token (`globals.css`) | Match        |
| -------------------------- | ------------------------------------------- | ------------------------------- | ------------ |
| primary                    | `--primary #e54d5e`                         | `--color-primary #e54d5e`       | ✅           |
| primary-hover              | `--primary-hover #c93d4e`                   | `--color-primary-hover #c93d4e` | ✅           |
| accent                     | `--accent #6366f1`                          | `--color-accent #6366f1`        | ✅           |
| accent-2                   | `--accent-2 #8b5cf6`                        | `--color-accent-hover #8b5cf6`  | ✅ (renamed) |
| accent-3                   | `--accent-3 #a855f7`                        | `--color-accent-light #a855f7`  | ✅ (renamed) |
| success / warning / error  | `#22c55e / #f59e0b / #ef4444`               | identical                       | ✅           |
| traffic lights             | `#ff5f56 / #ffbd2e / #27c93f`               | identical                       | ✅           |
| dark bg / surface / border | `#0b0e14 / #161b22 / rgba(255,255,255,.08)` | identical                       | ✅           |
| light bg / surface / text  | `#f9f9fb / #fff / #1a1a2e`                  | identical                       | ✅           |

**Conclusion:** there is no color migration to do. The identity is already shared; we are _finishing_ it, not rebuilding it.

### 3.2 Gaps — what the dashboard is missing

| Gap                     | Site has                                                                       | Dashboard                                                | Action                 |
| ----------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- | ---------------------- |
| **Grid wallpaper**      | `body::before` graph-paper, `--grid-line`, `--grid-size 32px`, `--section-alt` | **✅ added (Phase 1)**                                   | **Part A**             |
| **Radius scale**        | `--radius 14px`, `--radius-sm 9px`                                             | `--radius 14px` added; `-sm` + component repoint pending | **Part B / Phase 2**   |
| **Brand gradient**      | `--grad-brand 135deg primary→accent-3`                                         | **✅ token added (Phase 1)**; consumed in Phase 2        | **Part B**             |
| **Nested surface**      | `--surface-2 #1c2230`                                                          | **✅ added (Phase 1)**                                   | **Part B**             |
| **Mono font**           | `--font-mono` (ui-monospace stack)                                             | pending (Phase 4, with consumers)                        | **Part B**             |
| **`text-muted` (dark)** | `#8b8b9e`                                                                      | `#a1a1aa` (zinc-400)                                     | reconcile — **Part B** |

### 3.3 Theming mechanics (so we don't break anything)

- **Tailwind v4, CSS-first** (no `tailwind.config.*`). Tokens are defined in `:root`/`.dark` and exposed to utilities via `@theme inline` (`globals.css:130-179`).
- **Dark via `.dark` class** on `<html>` (`@custom-variant dark` at `globals.css:22`), toggled by a custom Zustand store (`src/store/themeStore.ts`), default theme = `system` (`src/shared/constants/appConfig.ts:11`). The site uses `html[data-theme="light"]` instead — **the mechanisms differ but never meet** (separate origins), so no conflict. We keep the dashboard's `.dark` mechanism.
- **Runtime primary override** exists (`themeStore.ts:85-97`, presets in `COLOR_THEMES`) — users can swap `--color-primary`. Any new token (gradient, etc.) that references `--color-primary` inherits those overrides for free. ✅
- **Tailwind v4 reserved radius names:** `--radius-sm/md/lg/...` back the `rounded-*` utilities. Redefining them retroactively changes every existing `rounded-*` (e.g. `rounded-sm` is used in 12 files). So the small-radius value and component repoint are deliberately deferred to Phase 2, where consumers change together.

---

## 4. Part A — The graph-paper grid background (headline ask) — IMPLEMENTED (Phase 1)

### 4.1 What it is

The exact recipe from the site (`_mono_repo/omnirouteSite/css/base.css`): a **fixed, full-viewport pseudo-element** painting two 1px line gradients, sitting at `z-index:-1` behind all content.

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
}
```

**Why this works even though `body` has an opaque `background-color`:** a `::before` with `z-index:-1` paints _above_ the element's own background but _below_ its in-flow content. So `--color-bg` is the base fill, the grid is layered on top of it, and the app renders above the grid.

### 4.2 Precedent already in the codebase

`src/app/landing/page.tsx:16-26` **already implements this same grid per-page** — but with **red** lines (`#E54D5E`, opacity `0.06`) at **50px**, plus animated orbs. So the pattern is proven in the product; this work promotes it to a **global, theme-aware** wallpaper.

### 4.3 Tokens added (in `globals.css`)

```css
:root {
  /* light — grid opacity tuned up from the site's 0.045 so the wallpaper is
     actually visible on the dense dashboard (cards/chrome cover most of the viewport) */
  --grid-line: rgba(0, 0, 0, 0.07);
  --grid-size: 32px;
  --section-alt: rgba(0, 0, 0, 0.022);
}
.dark {
  /* dark — tuned up from 0.035 for the same reason */
  --grid-line: rgba(255, 255, 255, 0.06);
  --section-alt: rgba(255, 255, 255, 0.018);
}
```

### 4.4 The single blocker — removed

The grid is global by construction (it covers the panel, `auth`/`login`, error pages — every route — at once). Exactly **one** element hid it inside the panel:

- `src/shared/components/layouts/DashboardLayout.tsx` — the outer wrapper painted an opaque `bg-bg`. Everything below it is already transparent (`<main>`, the scroll container, the `max-w-7xl` inner), so **removing `bg-bg`** lets the body grid show through the content area (the body's `--color-bg` remains the base fill).

  ```diff
  - <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-bg">
  + <div className="flex h-dvh min-h-0 w-full overflow-hidden">
  ```

### 4.5 Chrome interaction (sidebar / header)

- `Header` (`Header.tsx:207`, `bg-bg`) and `Sidebar` (`Sidebar.tsx:430`, `bg-sidebar`) stay **opaque** → the grid shows in the **content area only**, with solid chrome framing it. Calm default, matches how the site separates chrome from canvas (decision D3 = solid).

### 4.6 Login / auth / error pages

These render directly under `<body>` (no panel chrome), so the global grid should appear behind them automatically. **Phase 5 — DONE:** the standalone full-screen wrappers were in fact opaque (`min-h-screen … bg-bg`, where `bg-bg` is the same solid fill as `<body>`), which hid the grid on every non-dashboard screen — not just login. All of them are now transparent so the shared wallpaper shows through: `login`, `forgot-password`, `callback`, `maintenance`, `offline`, `status`, `terms`, `privacy`, `onboarding`, and `ErrorPageScaffold` (covers `400`/`401`). This closes **D4** (extended from login-only to every standalone screen). Guarded by `tests/unit/design-grid-background.test.ts`.

### 4.7 Landing page

`landing/page.tsx` keeps its richer animated background (orbs + vignette) — its own marketing splash (decision D5 = leave as-is).

---

## 5. Part B — Token unification

Phase 1 adds the inert, collision-free identity tokens (`--surface-2`/`--color-surface-2`, `--grad-brand`, `--radius`). Phase 2 wires the radius scale into Tailwind and repoints components; Phase 4 adds `--font-mono` with its consumers.

| Token                      | Why                                                             | Phase                          |
| -------------------------- | --------------------------------------------------------------- | ------------------------------ |
| `--radius` / `--radius-sm` | One radius scale (14/9) instead of 6/8/12 ad-hoc                | 1 (value) / 2 (wire + repoint) |
| `--grad-brand`             | Brand gradient for primary CTAs (red→violet), matching the site | 1 (token) / 2 (Button)         |
| `--surface-2`              | Nested panels / table headers / inset rows                      | 1                              |
| `--font-mono`              | Code blocks, terminal, IDs, endpoints                           | 4                              |
| `--text-muted` reconcile   | Pick one value site↔panel (`#a1a1aa` recommended)               | 2                              |

**D2 (text-muted):** site `#8b8b9e` vs dashboard `#a1a1aa`. Recommend keeping the **dashboard's `#a1a1aa`** and updating the _site_ to match. Cosmetic.

---

## 6. Part C — Component standardization (Phases 2–4)

Custom components (no shadcn/Radix), Tailwind v4, semantic tokens **mostly** adopted (195 files import the shared barrel). The work is removing the **bypasses**. Home: `src/shared/components/`.

| #   | Item                                   | File(s)                                                                                                                  | Problem → Target                                                                                                    | Phase |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ----- |
| C1  | **Radius alignment**                   | `Button.tsx:14-18`, `Card.tsx:39`, `Modal.tsx`, `Input.tsx`, `Select.tsx`                                                | mixed 6/8/12px → `--radius`/`--radius-sm` (14/9)                                                                    | 2     |
| C2  | **Button gradient + `accent` variant** | `Button.tsx:5-12`                                                                                                        | primary is flat red→red; align to `--grad-brand`; add missing `accent` variant. ~195 importers — highest visibility | 2     |
| C3  | **Tables**                             | `DataTable.tsx:122-176`, `logTableStyles.ts`, `globals.css:405-414`                                                      | 100% inline hardcoded rgba + non-existent vars; migrate to tokens, retire divergent styles                          | 3     |
| C4  | **Centralize status colors**           | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `ProviderCascadeNode.tsx`, `Badge.tsx` + 5 helpers | 6+ copies of the same hex → one module off `--color-success/warning/error`                                          | 3     |
| C5  | **Card border**                        | `Card.tsx:39`                                                                                                            | `border-white/5` → brand `/8`                                                                                       | 2     |
| C6  | **Focus ring reconcile** ✅ DONE       | `globals.css` `--focus-ring` (accent) vs form controls' `ring-primary/30`                                                | unified on **accent (violet)** to match the global ring + disambiguate from the red error ring; error stays red     | 4     |
| C7  | **Add `Checkbox` + `Textarea`**        | raw `<input>`/`<textarea>` w/ inline `accentColor:#6366f1`                                                               | token-driven primitives                                                                                             | 4     |
| C8  | **Hardcoded-hex sweep**                | `ConsoleLogViewer.tsx:240`, `ComboLiveStudio.tsx:306`, Modal dots, ~14 chart files                                       | literals → tokens                                                                                                   | 4     |
| C9  | **`cn()` → clsx + tailwind-merge**     | `src/shared/utils/cn.ts`                                                                                                 | conflicting classes stack; needed for C1 overrides                                                                  | 2     |

**Already on-brand (token-driven, only need radius):** `Badge`, `Toggle`, `SegmentedControl`, `Input`, `Select`.

---

## 7. Rollout plan

- **Phase 1 — Grid + identity tokens (THIS PR).** `globals.css` grid + `--surface-2`/`--grad-brand`/`--radius` tokens; `body::before` wallpaper; remove the `bg-bg` blocker; static guard test. Low risk, reversible in one commit.
- **Phase 2 — Primitives (C1, C2, C5) — DONE in this PR.** Semantic radius utilities `rounded-card` (14px) / `rounded-control` (9px) added via `@theme` (custom names, so the default `rounded-sm/md/lg/xl` stay untouched — no 400-file blast); Card/Modal → 14px, Button/Input/Select → 9px; Button primary → `--grad-brand` (red→violet) + new `accent` variant; Card borders → the `border-border` token (0.08). **Deferred:** `cn()`→tailwind-merge (C9) needs new deps; the ad-hoc `rounded-lg` sweep (326 files) is left as-is since the primitives carry the bulk of the surface.
- **Phase 3 — Status colors + tables (C3, C4) — DONE in this PR.** ✅ **C4** (`src/shared/constants/statusColors.ts` — `STATUS_HEX` single source; `flow/edgeStyles.ts` + `TokenHealthBadge` repointed, faithful/same hex). ✅ **`--font-mono`** token. ✅ **C3 (DataTable)** — replaced every inline rgba + the dead `var(--bg-table-header)` / `var(--text-secondary)` fallbacks with a `--table-*` token set (`--table-header-bg/-row-zebra/-row-hover/-cell-border/-row-selected`) whose **dark values exactly equal the old hardcoded rgba** (dark byte-identical) and whose light values fix the previously-always-dark light theme. Header border → `--color-border`, secondary text → `--color-text-muted`. **Wants a visual pass before merge.** (Not touched: `logTableStyles.ts` and the legacy Ant `.ant-table` rules — separate, lower priority.)
- **Phase 4 — Cleanup (C6, C7, C9 done; C8 pending).** ✅ **C9** `cn()` → `twMerge(clsx(...))` (clsx + tailwind-merge added as deps) — a caller's `className` now correctly _replaces_ a primitive's conflicting class instead of stacking. ✅ **C7** new `Checkbox` + `Textarea` primitives (token-driven, exported from the barrel; additive — adoption of the 32 raw checkboxes / 41 raw textareas can follow incrementally). ✅ **C6** focus-ring reconcile — the form controls (`Input`/`Select`/`Textarea`/`Toggle`/`Checkbox`) now focus on the **accent (violet)** ring to match the global `--focus-ring` and to stop colliding with the red error ring; the red error state is unchanged. ⏳ **C8 hex-sweep is NOT a blind find/replace** — confirmed offenders that are _intentional_ and must stay: `ConsoleLogViewer.tsx:240` (always-dark terminal), `TokenHealthBadge` popover, ReactFlow SVG strokes. Only migrate hex genuinely meant to be theme-aware.

Each phase: `npm run lint` + `npm run typecheck:core` + a visual pass.

---

## 8. Open decisions (recommendations)

- **D1 — Button primary:** keep red→red or switch to **red→violet `--grad-brand`**? Rec: **red→violet** (Phase 2).
- **D2 — Grid line color:** **neutral** (site style) — chosen — vs brand-red. Size **32px** (shrunk ~30% from the original 46px on owner feedback — 46px cells read too large on the dashboard layout).
- **D3 — Chrome vibrancy:** sidebar/header **solid** — chosen.
- **D4 — Auth/login grid:** ✅ **DONE (Phase 5)** — opaque `bg-bg` removed from every standalone full-screen wrapper (not just login), so the grid shows on all screens. See §4.6.
- **D5 — Landing page:** leave animated splash as-is. Chosen.
- **D6 — Radius 14/9 product-wide:** Rec: yes (Phase 2).
- **D7 — Phase 1 ships first:** Chosen.
- **D8 — Layout width (Phase 5):** the dashboard content shell was capped at `max-w-7xl` (1280px), centering with wide empty side gutters on large monitors. ✅ **DONE** — raised to a fluid `max-w-[3840px]` (true 4K): content now follows the viewport up to ~4K and only centers beyond it (`DashboardLayout.tsx`). Deliberately-narrow pages stay narrow by design (`ProviderOnboardingWizard` max-w-5xl, `Rtk`/`CavemanContextPageClient` max-w-6xl).
- **D9 — Opaque data tables (Phase 6):** with the dashboard content area now transparent (so the grid wallpaper shows through, Phase 5), data tables whose container was _not_ an opaque surface let the grid bleed through their transparent even-rows / low-alpha zebra. ✅ **DONE** — every card-less table now paints `bg-surface` (or, for the `<DataTable>` primitive, `background: var(--color-surface)` on its scroll container). Fixed: `DataTable` (primitive), `ProxyLogger`/`RequestLoggerV2` (their `<Card>` `bg-black/5 dark:bg-black/20` tint was winning over the Card's `bg-surface` via tailwind-merge → ~95% transparent), `BatchListTab`/`FilesListTab`/`CacheEntriesTab`/`ReasoningCacheTab`/`cache page`/`FreePoolTab`/`ModelMappingTable`/`HeaderTable`, plus the two CSS-grid "tables" in the cache views (`bg-surface/35` → `bg-surface`). Tables already inside a `<Card>`/Modal were verified opaque and deliberately left untouched (bg-surface there is a redundant no-op). The grid itself needed **no change** — dashboard `body::before` is byte-identical to the site (`--grid-size: 32px`); any "bigger grid" seen on a running instance is a stale pre-`#4143` build, not code. Guarded by `tests/unit/design-grid-background.test.ts` (Phase 6 block).

---

## 9. Out of scope / risks

- **No palette change** — colors already match; we only add missing tokens. Zero risk of recoloring the product.
- **No theme-engine change** — keep `.dark` + Zustand store.
- **Radius shift (Phase 2) is broad** — touches every card/button/input; eyeball busy screens (tables, modals) before merge.
- **Tables (C3)** carry the most hardcoded styling and the highest regression surface — isolate in their own PR.

---

## 10. Reference index

| Area                              | Path                                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Dashboard tokens                  | `src/app/globals.css` (`:root`, `.dark`, `@theme inline`, `body`, `body::before`)                                    |
| Theme store                       | `src/store/themeStore.ts`, `src/shared/components/ThemeProvider.tsx`, `src/shared/constants/appConfig.ts:9-11`       |
| Panel shell (grid unblocked here) | `src/shared/components/layouts/DashboardLayout.tsx`                                                                  |
| Chrome                            | `src/shared/components/Header.tsx:207`, `src/shared/components/Sidebar.tsx:430`                                      |
| Grid precedent                    | `src/app/landing/page.tsx:16-26`                                                                                     |
| Primitives                        | `src/shared/components/{Button,Card,Input,Select,Badge,Modal,Toggle,SegmentedControl,Loading,Tooltip,DataTable}.tsx` |
| Status-color sources              | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `logTableStyles.ts`                            |
| `cn` util                         | `src/shared/utils/cn.ts`                                                                                             |
| Phase 1 guard test                | `tests/unit/design-grid-background.test.ts`                                                                          |
| Site reference                    | `_mono_repo/omnirouteSite/css/tokens.css`, `css/base.css`                                                            |
