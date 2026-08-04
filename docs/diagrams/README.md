---
title: "Diagrams"
version: 3.8.49
lastUpdated: 2026-07-17
---

# Diagrams

Mermaid sources (`.mmd`) and exported SVGs for OmniRoute v3.8.0 architecture flows.

## Canonical diagrams

| Source                                               | Exported                                  | Used in                                                                        |
| ---------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| [request-pipeline.mmd](./request-pipeline.mmd)       | [SVG](./exported/request-pipeline.svg)    | docs/architecture/ARCHITECTURE.md, docs/architecture/CODEBASE_DOCUMENTATION.md |
| [auto-combo-12factor.mmd](./auto-combo-12factor.mmd) | [SVG](./exported/auto-combo-12factor.svg) | docs/routing/AUTO-COMBO.md                                                     |
| [resilience-3layers.mmd](./resilience-3layers.mmd)   | [SVG](./exported/resilience-3layers.svg)  | docs/architecture/RESILIENCE_GUIDE.md, CLAUDE.md                               |
| [i18n-flow.mmd](./i18n-flow.mmd)                     | [SVG](./exported/i18n-flow.svg)           | docs/guides/I18N.md                                                            |
| [mcp-tools-104.mmd](./mcp-tools-104.mmd)               | [SVG](./exported/mcp-tools-104.svg)        | docs/frameworks/MCP-SERVER.md                                                  |
| [cloud-agent-flow.mmd](./cloud-agent-flow.mmd)       | [SVG](./exported/cloud-agent-flow.svg)    | docs/frameworks/CLOUD_AGENT.md                                                 |
| [authz-pipeline.mmd](./authz-pipeline.mmd)           | [SVG](./exported/authz-pipeline.svg)      | docs/architecture/AUTHZ_GUIDE.md                                               |
| [db-schema-overview.mmd](./db-schema-overview.mmd)   | [SVG](./exported/db-schema-overview.svg)  | docs/architecture/CODEBASE_DOCUMENTATION.md                                    |

## Hand-authored animated diagrams

Not every diagram comes from a `.mmd` source. Hand-authored SVGs live at this
directory's root and animate with SMIL only (no JS, no external fonts), so they play
inside GitHub's `<img>` sandbox:

| File                                                   | Used in          | Notes                                                                                                                                                                                                                     |
| ------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [tier-cascade.svg](./tier-cascade.svg)                 | README.md (root) | Animated 4-tier auto-fallback cascade (16s loop, 4 acts). Edit the SVG directly — there is no `.mmd` source.                                                                                                              |
| [pool-fair-share.svg](./pool-fair-share.svg)           | README.md (root) | Animated key-pool fair-share quota (generous → strict, 16s loop). Edit the SVG directly — there is no `.mmd` source.                                                                                                      |
| [combo-always-on.svg](./combo-always-on.svg)           | style reference  | Animated priority-combo fallback (4 layers, 16s loop). Edit the SVG directly — there is no `.mmd` source.                                                                                                                 |
| [cli-terminal.svg](./cli-terminal.svg)                 | README.md (root) | Compact half-height animated terminal (1200×350): 3 real CLI commands cycling with typewriter + scrolling subcommand ticker; first frame = completed providers screen. Edit the SVG directly — there is no `.mmd` source. |
| [compression-pipeline.svg](./compression-pipeline.svg) | README.md (root) | Animated 10-engine compression funnel (8s loop). Edit the SVG directly — there is no `.mmd` source.                                                                                                                       |
| [free-tier-budget.svg](./free-tier-budget.svg)         | README.md (root) | Animated free-tier budget card (~1.4B/mo headline, 19-pool budget bar, per-model grid, signup credits, 10s loop). Edit the SVG directly — there is no `.mmd` source.                                                      |
| [readme-hero.svg](./readme-hero.svg)                   | README.md (root) | Animated hero card (tagline, 268-provider/90+ free headline, full-width compression bar demo, 6 stat chips). Edit the SVG directly — there is no `.mmd` source.                                                           |
| [promise-pillars.svg](./promise-pillars.svg)           | README.md (root) | Animated "The Promise" 6-pillar card (12s border-highlight sweep). Edit the SVG directly — there is no `.mmd` source.                                                                                                     |
| [why-pain-fix.svg](./why-pain-fix.svg)                 | README.md (root) | Animated "Why OmniRoute" 10-row pain-vs-fix ledger (15s green row sweep). Edit the SVG directly — there is no `.mmd` source.                                                                                              |
| [strategies-grid.svg](./strategies-grid.svg)           | README.md (root) | Animated 6×3 grid of all 18 routing-strategy flows (one micro-stage per strategy, staggered dot loops). Edit the SVG directly — there is no `.mmd` source.                                                                |
| [privacy-local.svg](./privacy-local.svg)               | README.md (root) | Animated "Private & Local-First" 11-row guarantee ledger with receipt chips (16s green row sweep). Edit the SVG directly — there is no `.mmd` source.                                                                     |
| [resilience-layers.svg](./resilience-layers.svg)       | README.md (root) | Animated 3-layer resilience card (breaker states CLOSED→OPEN→HALF-OPEN, key cooldown with ×2 backoff, model lockout — 18s loops). Edit the SVG directly — there is no `.mmd` source.                                      |

## How to update

1. Edit `*.mmd`.
2. Re-render: `npm run docs:render-diagrams` (uses `@mermaid-js/mermaid-cli`).
3. Commit both `.mmd` and `.svg`.

If `@mermaid-js/mermaid-cli` is not available locally, install it once:

```bash
npm install -g @mermaid-js/mermaid-cli
```

The script renders every `.mmd` in `docs/diagrams/` into `docs/diagrams/exported/*.svg`
with a white background, suitable for both dark and light themes.

## Linking from a doc

From a doc in `docs/<subfolder>/`, the relative path becomes `../diagrams/...`:

```markdown
![Request pipeline](../diagrams/exported/request-pipeline.svg)

> Source: [../diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)
```

From the repo root (e.g. `CLAUDE.md`):

```markdown
![Resilience layers](./exported/resilience-3layers.svg)
```

## Conventions

- One concept per diagram. Don't try to fit the whole platform in one chart.
- Keep node labels short (3-6 words). Use `<br/>` for line breaks inside nodes.
- Prefer `flowchart LR` for pipelines and `flowchart TB` for layered models.
- Use `sequenceDiagram` for interactive (request/response) flows.
- Use `erDiagram` for database schema overviews.
- Update both `.mmd` and `.svg` in the same commit. Keep them in lock-step.
