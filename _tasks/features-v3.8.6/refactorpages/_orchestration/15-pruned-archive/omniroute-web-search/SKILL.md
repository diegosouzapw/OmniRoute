---
name: omniroute-web-search
description: Web search via OmniRoute proxying Tavily, Brave Search, SerpAPI, Exa with auto-fallback. Use when the user wants live web search results, current news, or facts that may be beyond the LLM training cutoff.
---

# OmniRoute — Web Search

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Endpoint

- `POST $OMNIROUTE_URL/v1/web/search` — unified search format

## Discover

```bash
curl $OMNIROUTE_URL/v1/models/web | jq '.data[] | select(.kind == "webSearch")'
```

## Example

```bash
curl -X POST $OMNIROUTE_URL/v1/web/search \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tavily/search",
    "query": "OmniRoute github latest release",
    "max_results": 5,
    "include_answer": true
  }'
```

Response: `{ answer?, results:[{ url, title, content, score }] }`

## Parameters

| Field            | Type    | Description                          |
| ---------------- | ------- | ------------------------------------ |
| `model`          | string  | Provider model from `/v1/models/web` |
| `query`          | string  | Search query                         |
| `max_results`    | number  | Max results (default: 5)             |
| `include_answer` | boolean | Include AI-synthesized answer        |
| `search_depth`   | string  | `basic` or `advanced` (Tavily)       |

## Errors

- `400 query_too_long` → shorten the search query
- `503` → provider unavailable; try another model in `/v1/models/web`
