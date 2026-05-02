# Compression Rules Format

Compression rules are JSON files loaded at runtime. They are intentionally data-only so new
language packs and RTK command filters can be reviewed without changing engine code.

## Caveman Rule Packs

Caveman rule packs live under:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Each pack contains replacements that apply to normal prose after protected regions are isolated.

```json
{
  "id": "en-filler",
  "language": "en",
  "description": "English filler phrase removal",
  "rules": [
    {
      "id": "remove-basically",
      "pattern": "\\bbasically\\b",
      "replacement": "",
      "flags": "gi",
      "intensity": "safe"
    }
  ]
}
```

### Caveman Fields

| Field                 | Required | Description                                          |
| --------------------- | -------- | ---------------------------------------------------- |
| `id`                  | yes      | Stable pack id                                       |
| `language`            | yes      | BCP-47-like language key such as `en`, `pt-BR`, `es` |
| `description`         | no       | Human-readable pack summary                          |
| `rules`               | yes      | Array of regex replacement rules                     |
| `rules[].id`          | yes      | Stable rule id                                       |
| `rules[].pattern`     | yes      | JavaScript regex source                              |
| `rules[].replacement` | yes      | Replacement string                                   |
| `rules[].flags`       | no       | Regex flags, default `gi`                            |
| `rules[].intensity`   | no       | `safe`, `balanced`, or `full`                        |

## RTK Filter Packs

RTK filters live under:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Each filter describes how to recognize and compress a command-output family.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "match": {
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "deduplicate": true,
    "maxLines": 160,
    "tailLines": 40
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  }
}
```

### RTK Fields

| Field                      | Required | Description                                             |
| -------------------------- | -------- | ------------------------------------------------------- |
| `id`                       | yes      | Stable filter id                                        |
| `label`                    | yes      | Dashboard-readable name                                 |
| `match.commands`           | no       | Command tokens that select this filter                  |
| `match.patterns`           | no       | Regex patterns that select this filter from output text |
| `rules.includePatterns`    | no       | Lines to prefer preserving                              |
| `rules.dropPatterns`       | no       | Lines to remove as noise                                |
| `rules.deduplicate`        | no       | Collapse duplicate normalized lines                     |
| `rules.maxLines`           | no       | Maximum retained lines before tail preservation         |
| `rules.tailLines`          | no       | Tail lines retained for recent context                  |
| `preserve.errorPatterns`   | no       | Error lines that should survive truncation              |
| `preserve.summaryPatterns` | no       | Summary lines that should survive truncation            |

## Safety Rules

- Keep rules idempotent: running the same filter twice should not corrupt output.
- Preserve exact error text, file paths, line numbers, and command summaries where possible.
- Avoid rules that modify code blocks, JSON payloads, URLs, or secrets.
- Add unit coverage for new command families in `tests/unit/compression/rtk-engine.test.ts`.

## Validation

Rule packs are validated by Zod schemas before use. Invalid packs are ignored by the loader rather
than breaking the request pipeline. Run focused compression tests after adding or changing packs.
