# RTK Compression

RTK compression is OmniRoute's command-aware compression engine for terminal and tool output. It is
designed for coding-agent sessions where most context growth comes from test logs, build output,
package manager noise, shell transcripts, Docker output, git output, and stack traces.

RTK can run directly with `defaultMode: "rtk"` or as the first step in a stacked pipeline, usually:

```txt
rtk -> caveman
```

That order compresses noisy machine output first, then lets Caveman condense remaining prose.

Upstream RTK reports `60-90%` command-output savings. Its README sample session goes from
`~118,000` standard tokens to `~23,900` RTK tokens, which is `79.7%` saved (`~80%`). OmniRoute uses
that upstream average for the stacked savings calculation with Caveman input compression:

```txt
RTK average:    80% saved
Caveman input: 46% saved
Stacked:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% saved
Range:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## What It Compresses

The built-in catalog currently ships 49 filters across these categories:

| Category  | Examples                                                      |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go tests, Cargo tests       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, generic shell logs                      |
| `docker`  | `docker ps`, Docker logs                                      |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON output, stack traces, generic output fallback            |

The detector in `open-sse/services/compression/engines/rtk/commandDetector.ts` classifies output
before filter selection. Filters can also match by command pattern or output regex when a command
class is not enough.

## Filter Resolution

RTK loads filters in this order:

1. Project filters from `.rtk/filters.json`, only when trusted.
2. Global filters from `DATA_DIR/rtk/filters.json`.
3. Built-in filters from `open-sse/services/compression/engines/rtk/filters/`.

Project filters are intentionally trust-gated because regex filters can change how tool output is
shown to agents. A project filter file is accepted when one of these is true:

- `rtkConfig.trustProjectFilters` is `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` is set.
- `.rtk/trust.json` contains the SHA-256 hash of `.rtk/filters.json`.

Trust file example:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Custom filters can be one filter object or an array of filter objects. Invalid custom filters are
skipped and reported by `/api/context/rtk/filters` diagnostics. Invalid built-in filters fail fast.

## Filter DSL

Filters use the JSON schema described in [Compression Rules Format](COMPRESSION_RULES_FORMAT.md).
The runtime applies these stages in order:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Important fields:

| Field                        | Purpose                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| `rules.stripAnsi`            | Remove terminal color/control sequences before matching        |
| `rules.filterStderr`         | Normalize common stderr prefixes before matching/filtering     |
| `rules.replace`              | Apply ordered regex replacements                               |
| `rules.matchOutput`          | Return a compact summary when output matches a known condition |
| `rules.matchOutput[].unless` | Skip the shortcut when an error/failure pattern is present     |
| `rules.dropPatterns`         | Remove noisy lines                                             |
| `rules.includePatterns`      | Prefer actionable lines                                        |
| `rules.collapsePatterns`     | Collapse repeated matching lines                               |
| `rules.truncateLineAt`       | Unicode-safe per-line truncation                               |
| `rules.onEmpty`              | Fallback message if all lines are filtered out                 |
| `tests[]`                    | Inline samples used by the verify gate                         |

Built-in filters are expected to include inline `tests[]` samples. Custom filters should include
them too, especially when they are shared across projects.

## Configuration

Global settings are available through `/api/settings/compression`. RTK-specific settings are also
available through `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576
  }
}
```

`enabledFilters` and `disabledFilters` use filter ids, for example `test-vitest` or `git-diff`.

## API

| Route                              | Method | Purpose                                      |
| ---------------------------------- | ------ | -------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Read RTK config                              |
| `/api/context/rtk/config`          | PUT    | Update RTK config                            |
| `/api/context/rtk/filters`         | GET    | List filter catalog and load diagnostics     |
| `/api/context/rtk/test`            | POST   | Preview RTK compression for one text payload |
| `/api/context/rtk/raw-output/[id]` | GET    | Read retained redacted raw output            |
| `/api/compression/preview`         | POST   | Preview any compression mode                 |

RTK test payload:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Compression preview payload:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Management routes require dashboard management auth or the matching API-key policy.

## Raw Output Recovery

RTK normally returns only compressed text. For debugging, `rawOutputRetention` can retain redacted
raw output:

| Value      | Behavior                                                |
| ---------- | ------------------------------------------------------- |
| `never`    | Do not retain raw output                                |
| `failures` | Retain only likely failure output                       |
| `always`   | Retain every compressed RTK raw output, after redaction |

Retained files are written under:

```txt
DATA_DIR/rtk/raw-output/
```

Secrets are redacted before persistence, including common bearer tokens, API keys, Slack tokens,
AWS access keys, and assignment-style `token=...`, `secret=...`, `password=...` values. Analytics
stores only the pointer id, size, and hash metadata.

## Verify Gate

The focused verify gate runs built-in inline filter tests without shelling out to external commands:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

The broader RTK gate is:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Run the broad compression gate before release:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Extending RTK

1. Add or update a filter JSON file.
2. Include at least one `tests[]` sample that proves the important behavior.
3. Add a fixture under `tests/unit/compression/fixtures/rtk/` for new command families.
4. Add command detection coverage when introducing a new output class.
5. Run the verify and broad RTK gates.
6. If the filter is project-local, commit `.rtk/filters.json` and refresh `.rtk/trust.json` only after review.
