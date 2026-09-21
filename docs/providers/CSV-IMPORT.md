---
title: "Import providers from a CSV or JSON file"
---

# Import providers from a CSV or JSON file

Dashboard → Providers → **Import from file** creates API-key connections from a CSV or JSON list. Each row can target a different provider. Partial failure is the contract: valid rows still import when others fail, and the modal lists why the failed rows were rejected.

This import does **not** create new OpenAI/Anthropic-compatible endpoint nodes. Create those first (Dashboard → Providers → Add OpenAI-Compatible, or `omniroute nodes add`), then import rows whose `provider` column is that node's id. A per-row `baseUrl` can still override the node's URL.

## CSV (positional)

Column names are cosmetic. The parser splits each row and destructures by index:

| Index | Field | Required | Notes |
| ----- | ----- | -------- | ----- |
| 0 | `provider` | yes | Existing managed provider id (`openai`, `anthropic`, …) **or** an already-registered OpenAI/Anthropic-compatible **node** id |
| 1 | `name` | yes | Connection display name |
| 2 | `apiKey` | yes | API key |
| 3 | `baseUrl` | no | Per-row URL override |
| 4 | `priority` | no | Integer 1–100 |

A first line whose first column is the literal word `provider` (any case) is skipped as a header. Blank lines and `#` comments are skipped.

Download a starter file from the import modal (**Download CSV template**). Example:

```csv
# OmniRoute provider import (positional columns)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

A made-up id such as `openai-compatible-chat-001` is not a node. The API returns `Unknown or unsupported provider` for that row; the modal shows it next to the row name.

## JSON

A JSON array of objects with the same fields (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Unlike CSV, JSON keys are named.

```json
[
  { "provider": "openai", "name": "Prod OpenAI", "apiKey": "sk-your-openai-key", "priority": 1 }
]
```
