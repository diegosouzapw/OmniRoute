# Docs Site V2 — Integrated OmniRoute Documentation

## Goal
Enhance the existing `src/app/docs/` route inside OmniRoute to be a proper multi-page documentation section with sidebar navigation, rendering the existing 29 markdown files from `docs/` directory.

## Context
- `src/app/docs/` already has `page.tsx` (610 lines) and `content.ts` (173 lines)
- `src/shared/components/docs/` has 7 components (some corrupted with doubled tags)
- `docs/` directory has 29 markdown files (source of truth)
- OmniRoute uses Tailwind CSS 4, next-intl for i18n, Next.js 16 App Router
- turbopack root already configured in next.config.mjs
- Previous attempt created standalone sites at wrong locations — must integrate into OmniRoute proper

## TODOs

### Phase 1: Foundation
- [ ] T1: Fix corrupted components in `src/shared/components/docs/` — all files with doubled JSX tags
- [ ] T2: Install markdown rendering deps (`react-markdown`, `remark-gfm`, `rehype-highlight`) and verify build passes
- [ ] T3: Create docs layout with sidebar navigation at `src/app/docs/layout.tsx`

### Phase 2: Multi-page Docs
- [ ] T4: Create sub-routes for doc sections (getting-started, features, guides, api-reference, deployment, protocols, operations)
- [ ] T5: Create markdown page renderer component that reads from `docs/*.md` and renders with proper styling
- [ ] T6: Wire sidebar navigation with all 29 doc pages, matching existing dashboard theming

### Phase 3: Polish
- [ ] T7: Add search functionality (search dialog component) for docs pages
- [ ] T8: Add breadcrumbs navigation for docs sub-pages
- [ ] T9: Ensure i18n keys are added for new UI strings (sidebar labels, breadcrumbs)

### Phase 4: Cleanup
- [ ] T10: Delete standalone sites (`/home/openclaw/omniroute-docs-site/` and `/home/openclaw/OmniRoute/docs-site/`)
- [ ] T11: Verify build passes, docs render correctly in browser

## Final Verification Wave
- [ ] F1: Code quality review — all components match existing codebase patterns
- [ ] F2: Build verification — `npm run build` passes
- [ ] F3: Visual verification — docs page renders correctly with sidebar + content
- [ ] F4: No regressions — existing docs page at `/docs` still works

## Architecture Decisions
- **No MDX** — render existing `.md` files directly via `react-markdown` instead of converting 29 files to MDX
- **Keep docs in `docs/`** — source of truth stays in the markdown directory, rendered at runtime
- **Server Components** — markdown reading happens server-side for SEO and performance
- **Tailwind theming** — reuse existing `bg-bg`, `text-text-main`, `border-border` tokens
- **i18n** — sidebar labels and UI strings use next-intl; markdown content is English-only (already the case)

## File Map
```
src/app/docs/
  layout.tsx          # NEW — sidebar + content layout
  page.tsx            # EXISTING — keep as docs overview/home
  content.ts          # EXISTING — keep for overview page
  [slug]/
    page.tsx          # NEW — dynamic route for markdown docs
  components/
    DocsContent.tsx   # NEW — markdown renderer component
    DocsNav.tsx       # NEW — sidebar navigation config

src/shared/components/docs/
  Callout.tsx         # FIX — corrupted doubled tags
  CodeBlock.tsx       # FIX — corrupted doubled tags
  Tabs.tsx            # FIX — corrupted doubled tags
  DocsSidebar.tsx     # FIX — corrupted doubled tags
  DocsBreadcrumbs.tsx # FIX — corrupted doubled tags
  APIReference.tsx    # FIX — corrupted doubled tags
  tokens.ts           # KEEP — design tokens
```
