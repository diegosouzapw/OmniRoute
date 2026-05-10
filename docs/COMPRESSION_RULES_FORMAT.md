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
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Caveman Fields

| Field                    | Required | Description                                                      |
| ------------------------ | -------- | ---------------------------------------------------------------- |
| `language`               | yes      | BCP-47-like language key such as `en`, `pt-BR`, `es`             |
| `category`               | yes      | Pack category filename/category, for example `filler` or `dedup` |
| `rules`                  | yes      | Array of regex replacement rules                                 |
| `rules[].name`           | yes      | Stable rule name                                                 |
| `rules[].pattern`        | yes      | JavaScript regex source                                          |
| `rules[].flags`          | no       | JavaScript regex flags; default `gi`                             |
| `rules[].replacement`    | no       | Replacement string or fallback when `replacementMap` misses      |
| `rules[].replacementMap` | no       | Match-specific replacements keyed by normalized matched text     |
| `rules[].context`        | no       | `all`, `user`, `assistant`, or `system`; default `all`           |
| `rules[].category`       | no       | `filler`, `context`, `structural`, `dedup`, `terse`, or `ultra`  |
| `rules[].minIntensity`   | no       | `lite`, `full`, or `ultra`; default `lite`                       |
| `rules[].description`    | no       | Human-readable rule summary                                      |

Use `flags` when case-sensitive matching matters, for example article removal before lowercase prose
without stripping `the OpenAI API`. Use `replacementMap` when one regex has multiple alternatives
that need different outputs; this keeps JSON rule packs data-only while preserving the behavior of
the richer built-in TypeScript replacement functions.

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
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      { "pattern": "All tests passed", "message": "vitest: ok", "unless": "FAIL|Error:" }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK Fields

| Field                      | Required | Description                                                                    |
| -------------------------- | -------- | ------------------------------------------------------------------------------ |
| `id`                       | yes      | Stable filter id                                                               |
| `label`                    | yes      | Dashboard-readable name                                                        |
| `category`                 | yes      | Filter family: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | no       | Higher priority wins when multiple filters match                               |
| `match.outputTypes`        | no       | Detector output ids that select this filter                                    |
| `match.commands`           | no       | Command tokens that select this filter                                         |
| `match.patterns`           | no       | Regex patterns that select this filter from output text                        |
| `rules.stripAnsi`          | no       | Remove ANSI escape sequences before regex stages                               |
| `rules.replace`            | no       | Ordered regex substitutions applied line by line                               |
| `rules.matchOutput`        | no       | Short-circuit output rules with optional `unless` guard                        |
| `rules.includePatterns`    | no       | Lines to prefer preserving                                                     |
| `rules.dropPatterns`       | no       | Lines to remove as noise                                                       |
| `rules.collapsePatterns`   | no       | Repeated matching lines that can be collapsed                                  |
| `rules.deduplicate`        | no       | Collapse duplicate normalized lines                                            |
| `rules.truncateLineAt`     | no       | Unicode-safe per-line character limit                                          |
| `rules.maxLines`           | no       | Maximum retained lines before tail preservation                                |
| `rules.headLines`          | no       | Head lines retained during truncation                                          |
| `rules.tailLines`          | no       | Tail lines retained for recent context                                         |
| `rules.onEmpty`            | no       | Fallback message when filtering removes all content                            |
| `rules.filterStderr`       | no       | Normalize common stderr prefixes before later filtering stages                 |
| `preserve.errorPatterns`   | no       | Error lines that should survive truncation                                     |
| `preserve.summaryPatterns` | no       | Summary lines that should survive truncation                                   |
| `tests[]`                  | no       | Inline verification samples used by the RTK verify gate                        |

RTK applies declarative stages in this order: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines`, and `onEmpty`.

Custom filters can be loaded from:

1. Project `.rtk/filters.json` files only after a matching `.rtk/trust.json` hash is present or
   `trustProjectFilters` is enabled.
2. Global `DATA_DIR/rtk/filters.json`.
3. Built-in filters.

Project/global custom files may contain one filter object or an array of filter objects. Invalid
custom filters are skipped with diagnostics; invalid built-in filters fail validation.

Project trust file:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

The environment override `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` trusts project filters without a
hash and should be limited to controlled local development.

## Safety Rules

- Keep rules idempotent: running the same filter twice should not corrupt output.
- Preserve exact error text, file paths, line numbers, and command summaries where possible.
- Avoid rules that modify code blocks, JSON payloads, URLs, or secrets.
- Add unit coverage for new command families in detector/filter tests.
- Add `tests[]` samples to every built-in filter and to shared custom filters.

## Validation

Rule packs are validated before use. Built-in Caveman packs and built-in RTK filters fail fast
during validation so broken release assets are caught before shipment. Custom RTK filters are
skipped with diagnostics when parsing or trust validation fails.

Focused validation:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
