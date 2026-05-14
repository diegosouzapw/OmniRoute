---
title: "Diagrams"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Diagrams

Mermaid sources (`.mmd`) and exported SVGs for OmniRoute v3.8.0 architecture flows.

## Canonical diagrams

| Source                                             | Exported                                 | Used in                                                                        |
| -------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| [request-pipeline.mmd](./request-pipeline.mmd)     | [SVG](./exported/request-pipeline.svg)   | docs/architecture/ARCHITECTURE.md, docs/architecture/CODEBASE_DOCUMENTATION.md |
| [auto-combo-9factor.mmd](./auto-combo-9factor.mmd) | [SVG](./exported/auto-combo-9factor.svg) | docs/routing/AUTO-COMBO.md                                                     |
| [resilience-3layers.mmd](./resilience-3layers.mmd) | [SVG](./exported/resilience-3layers.svg) | docs/architecture/RESILIENCE_GUIDE.md, CLAUDE.md                               |
| [i18n-flow.mmd](./i18n-flow.mmd)                   | [SVG](./exported/i18n-flow.svg)          | docs/guides/I18N.md                                                            |
| [mcp-tools-37.mmd](./mcp-tools-37.mmd)             | [SVG](./exported/mcp-tools-37.svg)       | docs/frameworks/MCP-SERVER.md                                                  |
| [cloud-agent-flow.mmd](./cloud-agent-flow.mmd)     | [SVG](./exported/cloud-agent-flow.svg)   | docs/frameworks/CLOUD_AGENT.md                                                 |
| [authz-pipeline.mmd](./authz-pipeline.mmd)         | [SVG](./exported/authz-pipeline.svg)     | docs/architecture/AUTHZ_GUIDE.md                                               |
| [db-schema-overview.mmd](./db-schema-overview.mmd) | [SVG](./exported/db-schema-overview.svg) | docs/architecture/CODEBASE_DOCUMENTATION.md                                    |

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
![Resilience layers](./docs/diagrams/exported/resilience-3layers.svg)
```

## Conventions

- One concept per diagram. Don't try to fit the whole platform in one chart.
- Keep node labels short (3-6 words). Use `<br/>` for line breaks inside nodes.
- Prefer `flowchart LR` for pipelines and `flowchart TB` for layered models.
- Use `sequenceDiagram` for interactive (request/response) flows.
- Use `erDiagram` for database schema overviews.
- Update both `.mmd` and `.svg` in the same commit. Keep them in lock-step.
