# Typography System

## Font Stack

| Level | Family | Weight | Size | Line Height | Tracking |
|-------|--------|--------|------|-------------|----------|
| **Display** | Inter Display, SF Pro Display | 700 | 48px / 3rem | 1.1 | -0.02em |
| **Heading 1** | Inter, SF Pro | 700 | 32px / 2rem | 1.2 | -0.015em |
| **Heading 2** | Inter, SF Pro | 600 | 24px / 1.5rem | 1.25 | -0.01em |
| **Heading 3** | Inter, SF Pro | 600 | 20px / 1.25rem | 1.3 | normal |
| **Body** | Inter, SF Pro | 400 | 14px / 0.875rem | 1.5 | normal |
| **Body Small** | Inter, SF Pro | 400 | 13px / 0.8125rem | 1.5 | normal |
| **Caption** | Inter, SF Pro | 400 | 12px / 0.75rem | 1.4 | normal |
| **Code** | JetBrains Mono, Fira Code | 400 | 13px / 0.8125rem | 1.5 | normal |
| **Label** | Inter, SF Pro | 500 | 12px / 0.75rem | 1.33 | +0.04em |

## Font Assets

- **Primary**: Inter (variable) — loaded from Google Fonts via `next/font`
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Mono**: JetBrains Mono — loaded from Google Fonts via `next/font`

## Usage Guidelines

- **Display** — Hero sections, feature callouts, marketing pages only
- **H1/H2** — Dashboard page titles, section headers
- **H3** — Card headers, modal titles, settings group titles
- **Body** — All primary reading content, table cells, form labels
- **Body Small** — Secondary text, descriptions, helper text
- **Caption** — Timestamps, status labels, badges, metadata
- **Code** — Inline code, code blocks, API response display
- **Label** — Form labels, tab labels, column headers

## Accessibility

- Body text minimum **14px** (never below 12px for UI text)
- Line height minimum **1.4** for body text (WCAG SC 1.4.8)
- Font weight below 400 only used for decorative text (never for body or interactive elements)
- Percentages or `rem` units preferred over `px` for user-scalable text
