# 10 -- pnpm Audit Report

> **Date**: 2026-09-13
> **Status**: Analysis complete

## Summary

| Category | Count |
|----------|-------|
| **Total vulnerabilities** | 74 |
| **Production vulnerabilities** | 35 |
| **Dev-only vulnerabilities** | 39 |
| **Critical** | 2 |
| **High** | 35 |
| **Moderate** | 31 |
| **Low** | 6 |

## Production Vulnerabilities

### Fixable (Direct Dependencies)

| Package | Vulnerable | Patched | Path | Action |
|---------|-----------|---------|------|--------|
| **next** | >=16.0.0 <16.3.3 | >=16.3.3 | `>next` | Upgrade Next.js |
| **mermaid** | Various | Latest | `>mermaid` | Upgrade mermaid |
| **nanoid** | <3.3.18 | >=3.3.18 | Transitive | Upgrade parent |

### Unfixable (Deep Transitive)

| Package | Vulnerable | Path | Root Cause |
|---------|-----------|------|------------|
| **sharp** | <0.35.4 | `>next>sharp` | Next.js pins sharp version |
| **postcss** | <=8.5.18 | `>next>postcss` | Next.js pins postcss |
| **fast-uri** | <3.1.6 | `>@modelcontextprotocol/sdk>ajv>fast-uri` | MCP SDK pins ajv |
| **hono** | <4.12.34 | `>@modelcontextprotocol/sdk>hono` | MCP SDK pins hono |
| **dompurify** | Various | `>monaco-editor>dompurify` | Monaco pins DOMPurify |
| **qs** | Various | `>express>qs` | Express pins qs |
| **vue runtime-core** | Various | `>@lobehub/icons>@lobehub/ui>@shikijs/stream>vue` | LobeHub deep chain |
| **colord** | Various | `>@lobehub/icons>@lobehub/ui>leva>colord` | LobeHub deep chain |
| **decode-uri-component** | Various | `>@lobehub/icons>@lobehub/ui>query-string>decode-uri-component` | LobeHub deep chain |

## Dev-Only Vulnerabilities

| Package | Path | Risk |
|---------|------|------|
| **joi** | `>wait-on>joi` | Low (test utility only) |
| **extract-zip** | `>promptfoo>extract-zip` | Low (eval tool only) |
| Various MCP dev deps | Multiple | Low (dev tooling) |

## Recommendations

1. **Upgrade Next.js to >=16.3.3** — Fixes 2 critical + 2 high vulns (sharp, postcss transitives)
2. **Upgrade mermaid** — Direct dependency, straightforward
3. **MCP SDK** — Wait for upstream to upgrade hono/fast-uri
4. **LobeHub icons** — Consider if still needed; deep transitive chain
5. **Monaco editor** — DOMPurify vuln is XSS-related; Monaco runs in sandboxed iframe
6. **All 39 dev-only vulns** — Acceptable risk for development tooling

## Remaining Risk

After upgrading Next.js and mermaid, production vulnerabilities would drop from 35 to ~25 (all deep transitive, acceptably low risk).
