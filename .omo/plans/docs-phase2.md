# Docs Site Phase 2: Search, Versioning & Content Enhancement

## TODOs

- [x] T1: Add full-text search with fuse.js — search bar in sidebar, index all 29 doc pages, keyboard shortcut (Cmd+K), result highlighting
- [x] T2: Add "On this page" table of contents — extract headings from rendered content, sticky TOC sidebar on desktop
- [x] T3: Add copy-to-clipboard on code blocks — click-to-copy button on all `<pre>` code blocks
- [x] T4: Add version badge + "Last updated" metadata — read frontmatter `version` and `lastUpdated` from .md files, display beside title
- [x] T5: Add previous/next page navigation — bottom-of-page prev/next links based on sidebar order
- [x] T6: Improve markdown renderer — handle nested lists, definition lists, admonitions (TIP/WARNING/DANGER), and footnotes
- [x] T7: Add docs home page `/docs` — landing page with cards for each section, quick links, and search CTA
- [x] T8: Add breadcrumb structured data (JSON-LD) for SEO — BreadcrumbList schema on every doc page

## Final Verification Wave

- [ ] F1: `npm run build` passes with zero errors in docs files
- [ ] F2: All 30 routes (29 docs + /docs home) return HTTP 200
- [ ] F3: Search returns relevant results for 5+ test queries
- [ ] F4: Code review — read every changed/created file, verify logic matches requirements