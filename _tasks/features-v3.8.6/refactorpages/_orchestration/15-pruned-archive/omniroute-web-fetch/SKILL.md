---
name: omniroute-web-fetch
description: Fetch a URL and convert to clean markdown via OmniRoute proxying Jina Reader, Firecrawl, raw HTML strip. Use when the user wants to ingest a webpage as markdown for context in an LLM conversation.
---

# OmniRoute — Web Fetch

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Endpoint

- `POST $OMNIROUTE_URL/v1/web/fetch`

## Discover

```bash
curl $OMNIROUTE_URL/v1/models/web | jq '.data[] | select(.kind == "webFetch")'
```

## Example

```bash
curl -X POST $OMNIROUTE_URL/v1/web/fetch \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "jina/reader",
    "url": "https://anthropic.com",
    "format": "markdown"
  }'
```

Response: `{ url, title, markdown, links?:[...], images?:[...] }`

## Parameters

| Field    | Type   | Description                                                             |
| -------- | ------ | ----------------------------------------------------------------------- |
| `model`  | string | Provider from `/v1/models/web` (e.g. `jina/reader`, `firecrawl/scrape`) |
| `url`    | string | URL to fetch                                                            |
| `format` | string | `markdown` (default), `html`, `text`                                    |

## Errors

- `400 invalid_url` → URL must be http/https
- `403 blocked` → provider blocked by target site; try a different model
- `503` → provider unavailable; try another model in `/v1/models/web`
