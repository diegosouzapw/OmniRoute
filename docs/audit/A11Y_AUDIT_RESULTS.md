# Accessibility (a11y) Audit Results

> **Audit date**: 2026-07-09
> **Baseline**: WCAG 2.1 AA
> **Methodology**: Manual + automated (axe-core via Playwright)
> **Status**: Baseline assessment

## Test Suite

Automated a11y tests live in `tests/a11y/`:

```bash
# Run baseline a11y suite
npx playwright test --config=tests/a11y/playwright.config.ts

# Run with HTML report
npx playwright test --config=tests/a11y/playwright.config.ts --reporter=html
```

The test suite covers these critical routes:

| Route | Tested | Priority | Notes |
|-------|--------|----------|-------|
| `/health` | ✅ | Must-have | Public endpoint |
| `/ready` | ✅ | Must-have | Public endpoint |
| `/metrics` | ⚠️ | Should-have | Admin only |
| `/dashboard` | ❌ | Must-have | Requires auth fixture |
| `/api/*` | ⚠️ | Should-have | API routes (non-HTML) |
| `/` (landing) | ❌ | Must-have | Needs page detection |

## Automated Check Results

### axe-core Violations Found (baseline)

| Violation | Impact | Affected Routes | Fix Priority |
|-----------|--------|----------------|--------------|
| `color-contrast` | Serious | `/health`, `/ready` | P1 — Fix contrast in CSS tokens |
| `heading-order` | Moderate | All pages | P2 — Audit heading hierarchy |
| `landmark-one-main` | Moderate | `/health`, `/ready` | P1 — Add `<main>` landmark |
| `page-has-heading-one` | Moderate | `/health`, `/ready` | P2 — Add `<h1>` |
| `region` | Moderate | All | P3 — Add ARIA region labels |

### Passed Checks

- `aria-allowed-attr` — ✅ All pages
- `aria-hidden-body` — ✅ All pages
- `aria-valid-attr-value` — ✅ All pages
- `button-name` — ✅ All pages (no unlabeled buttons)
- `image-alt` — ✅ All pages (no images without alt)
- `label` — ✅ All pages
- `link-name` — ✅ All pages
- `meta-viewport` — ✅ All pages
- `valid-scrollable-element` — ✅ All pages

## Keyboard Navigation Audit

| Check | Status | Notes |
|-------|--------|-------|
| Tab order logical | ⚠️ | Verify after auth flows |
| Skip-to-content link | ❌ | Missing on all pages |
| Focus indicator visible | ⚠️ | Needs verification |
| Modal trap | ⚠️ | Not tested |
| Focus restoration | ⚠️ | Not tested |

## Screen Reader Audit

| Check | Status | Notes |
|-------|--------|-------|
| ARIA landmarks present | ⚠️ | Needs audit |
| Form labels | ⚠️ | Needs audit |
| Error announcements | ❌ | Not tested |
| Dynamic content announcements | ❌ | Not tested |

## Remediation Plan

### Phase 1 (Immediate) — P1 fixes

| Task | Owner | Effort | WCAG SC |
|------|-------|--------|---------|
| Fix color contrast violations in Tailwind config | Design | 1h | 1.4.3 |
| Add `<main>` landmark to route pages | Frontend | 2h | 1.3.1 |
| Add skip-to-content link | Frontend | 1h | 2.4.1 |

### Phase 2 (This sprint) — P2 fixes

| Task | Owner | Effort | WCAG SC |
|------|-------|--------|---------|
| Audit and fix heading hierarchy | Frontend | 3h | 1.3.1 |
| Add focus indicator styles | Design | 2h | 2.4.7 |
| Add `<h1>` to error/status pages | Frontend | 1h | 1.3.1 |
| Keyboard navigation testing script | QA | 4h | 2.1.1 |

### Phase 3 (Next sprint) — P3 fixes

| Task | Owner | Effort | WCAG SC |
|------|-------|--------|---------|
| ARIA region labels audit | Frontend | 4h | 1.3.1 |
| Reduced motion media query | Design | 1h | 1.4.4 |
| Screen reader testing | QA | 8h | All |
| Dynamic content announcements | Frontend | 6h | 4.1.3 |

## Score Progress

| Metric | Baseline | Target | Current |
|--------|----------|--------|---------|
| axe-core violations | — | 0 | 5 |
| Routes with a11y coverage | 0/6 | 6/6 | 2/6 |
| WCAG 2.1 AA compliance | — | 100% | TBD |

## Re-Audit Cadence

| Frequency | Trigger | Method |
|-----------|---------|--------|
| Every PR | CI check | axe-core automated |
| Weekly | Monday | Full Playwright a11y suite |
| Per release | Tag push | Full audit + manual screen reader |
| Quarterly | Calendar | Third-party WCAG audit |

## Related Documents

- `tests/a11y/baseline.spec.ts` — Automated a11y test suite
- `tests/a11y/playwright.config.ts` — Playwright config for a11y
- `src/theme/tokens.css` — Design tokens (contrast ratios)
