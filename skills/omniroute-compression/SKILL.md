---
name: omniroute-compression
description: Configure OmniRoute token compression to save 60–90% of context tokens. Covers RTK (command/tool output), Caveman (prose), stacked mode (both), and the MCP accessibility-tree filter (browser snapshots). Use when the user wants to reduce costs, fit long sessions into context windows, or speed up AI responses.
---

# OmniRoute — Compression

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Overview

OmniRoute compresses token payloads before forwarding to providers. No code changes required — set it once, it applies to all requests transparently.

| Engine                    | Best for                             | Typical savings |
| ------------------------- | ------------------------------------ | --------------- |
| RTK                       | Terminal / build / test / git output | 60–90%          |
| Caveman                   | Human prose, chat history            | 46% input       |
| Stacked (`rtk → caveman`) | Mixed coding sessions                | 78–95%          |
| MCP accessibility filter  | Browser/accessibility tool results   | 60–80%          |

## Get current settings

```bash
curl $OMNIROUTE_URL/api/settings/compression \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

## Enable RTK (best for coding agents)

```bash
curl -X PUT $OMNIROUTE_URL/api/settings/compression \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "mode": "rtk", "enabled": true }'
```

## Enable stacked mode (maximum savings)

```bash
curl -X PUT $OMNIROUTE_URL/api/settings/compression \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "stacked",
    "enabled": true,
    "stackedPipeline": ["rtk", "caveman"]
  }'
```

## Enable Caveman (prose / chat)

```bash
curl -X PUT $OMNIROUTE_URL/api/settings/compression \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "mode": "standard", "enabled": true }'
```

Caveman intensities: `lite` (safe), `standard` (balanced), `aggressive` (long sessions), `ultra` (context recovery).

## Preview compression before enabling

```bash
curl -X POST $OMNIROUTE_URL/api/compression/preview \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "rtk",
    "text": "$ npm test\n> jest\n\nPASS src/a.test.ts (2.1s)\nPASS src/b.test.ts (1.8s)\n..."
  }'
```

Response includes `compressed`, `original_length`, `compressed_length`, `savings_pct`.

## MCP accessibility-tree filter (browser agent use)

When OmniRoute is used with browser/Playwright MCP tools, it automatically compresses verbose accessibility-tree tool results. Enabled by default; configure thresholds:

```bash
curl -X PUT $OMNIROUTE_URL/api/settings/compression \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "mcpAccessibility": {
      "enabled": true,
      "collapseThreshold": 30,
      "maxTextChars": 50000
    }
  }'
```

`collapseThreshold`: collapse sibling lines when ≥ N repeats (default 30).  
`maxTextChars`: hard truncate after N chars with navigation hint (default 50000).

## Language packs (Caveman)

Caveman supports language-aware rules for pt-BR, es, de, fr, ja:

```bash
curl -X PUT $OMNIROUTE_URL/api/settings/compression \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "standard",
    "cavemanConfig": {
      "language": "pt-BR",
      "autoDetectLanguage": true
    }
  }'
```

## Via MCP

```
omniroute_compression_status     → current settings + savings analytics
omniroute_compression_configure  → update mode/threshold/language
omniroute_set_compression_engine → switch engine at runtime
```

## Disable compression

```bash
curl -X PUT $OMNIROUTE_URL/api/settings/compression \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -d '{ "enabled": false }'
```

## Errors

- `400 invalid mode` → use `off`, `lite`, `standard`, `aggressive`, `ultra`, `rtk`, or `stacked`
- `400 invalid stackedPipeline` → array must contain valid engine ids (`rtk`, `caveman`)
