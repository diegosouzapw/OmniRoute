---
title: "RTK Compression"
version: 3.8.2
lastUpdated: 2026-05-13
---

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

Filters use the JSON schema described in [Compression Rules Format](./COMPRESSION_RULES_FORMAT.md).
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

---

## Intensity Levels (v3.8.16+)

RTK supports **3 intensity levels** that trade off between **compression aggressiveness** and **safety**. The level is set via `config.intensity` in the engine config.

### The 3 Levels

| Level | Truncation threshold | Token savings | Risk | Best for |
|-------|---------------------|---------------|------|----------|
| `minimal` | 24 lines per section | ~20-40% | Very low | Production with critical context |
| `standard` (default) | 24 lines per section | ~50-70% | Low | Daily coding sessions |
| `aggressive` | 16 lines per section | ~70-90% | Medium | Long sessions, max savings |

### Where the Truncation Happens

The truncation threshold affects `lineFilter.ts`:

```ts
// From open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Both the **head** and **tail** of each section are preserved; middle content is dropped when truncation kicks in.

### What Stays vs. What Gets Cut

| Content | minimal | standard | aggressive |
|---------|---------|----------|------------|
| Errors / stack traces | ✅ preserved | ✅ preserved | ✅ preserved |
| Test failures | ✅ preserved | ✅ preserved | ✅ preserved |
| Build errors | ✅ preserved | ✅ preserved | ✅ preserved |
| Test passes (verbose) | ✅ preserved | 🟡 collapsed | 🟡 collapsed |
| Routine output (info logs) | 🟡 collapsed | 🟡 collapsed | ❌ dropped |
| Progress bars | 🟡 collapsed | ❌ dropped | ❌ dropped |
| Banner / ASCII art | 🟡 collapsed | ❌ dropped | ❌ dropped |

### Choosing the Right Intensity

```
                  Is losing context catastrophic?
                  │
      ┌───────────┼───────────┐
      │           │           │
    YES          NO          NOT SURE
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      How critical    Try `standard` first
      │      is throughput?  (works for 80% of
      │           │          cases)
      │      ┌────┴────┐
      │      │         │
      │     LOW       HIGH
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Configuring Intensity

**Globally** (via env):

```bash
RTK_INTENSITY=aggressive
```

**Per-combo** (in combo config):

```json
{
  "combo": "my-coding-combo",
  "routing": { /* ... */ },
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Programmatically**:

```ts
import { rtkEngine } from "omniroute/compression/engines/rtk";

rtkEngine.updateConfig({ intensity: "aggressive" });
```

### Verifying the Effect

Use the **Verify Gate** (see below) to confirm your filter is safe at your chosen intensity:

```bash
# Will fail if your filters cut important context
npm run check:rtk -- --intensity=aggressive
```

---

## Custom Filter Development (v3.8.16+)

The `engines/rtk/filters/` directory contains **49+ built-in filter JSON files**. You can add your own to compress output from custom tools not covered by the defaults.

### Filter Schema (Zod)

From `open-sse/services/compression/engines/rtk/filterSchema.ts`:

```ts
{
  "name": "string",                    // Filter name (kebab-case)
  "version": "string",                 // SemVer
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "match": {
    "commands": ["string"],            // Command names to match (e.g., "kubectl get")
    "patterns": ["string"],            // Regex patterns to match output
    "outputTypes": ["string"]          // Detected output classes (e.g., "test-failure")
  },
  "rules": {
    "stripAnsi": true,                 // Strip ANSI color codes
    "replace": [                       // Find-and-replace rules
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Short-circuit on pattern match
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Skip if this pattern matches
      }
    ],
    "strip": [                         // Lines to remove entirely
      { "pattern": "regex" }
    ],
    "keep": [                          // Lines to always keep
      { "pattern": "regex" }
    ],
    "truncate": [                      // Per-line truncation
      { "pattern": "regex", "maxLength": 200 }
    ],
    "head": 5,                         // Keep first N lines of matched output
    "tail": 5,                         // Keep last N lines of matched output
    "maxLines": 100                    // Hard cap on total lines
  },
  "tests": [                           // Inline tests for verification
    {
      "name": "string",
      "input": "sample output",
      "expected": "expected compressed output",
      "command": "optional command context"
    }
  ]
}
```

### Example: Python Traceback Filter

```json
{
  "name": "python-traceback",
  "version": "1.0.0",
  "category": "generic",
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "keep": [
      { "pattern": "^\\s*File \".+\", line \\d+" },
      { "pattern": "^\\s*[A-Z][a-zA-Z]+Error|^\\s*[A-Z][a-zA-Z]+Exception" }
    ],
    "head": 3,
    "tail": 8,
    "maxLines": 25
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Loading Custom Filters

Place the file in a recognized location:

```
~/.omniroute/rtk/filters/my-filter.json     # User-level
<project>/.rtk/filters/my-filter.json      # Project-level
```

Or load programmatically:

```ts
import { loadFilter } from "omniroute/compression/engines/rtk/filterLoader";

await loadFilter("./my-custom-filter.json");
```

### Validation

Filters are validated against the Zod schema on load. A filter with bad structure will fail to load and log an error:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Run `npm run check:rtk` to validate all installed filters at once.

### Best Practices

1. **Always include `tests[]`** — they prove your filter works and prevent regressions
2. **Use `matchOutput` for short-circuits** — if a single line tells the story, replace the whole block
3. **Prefer `keep` over `strip`** — explicit "always preserve" rules are safer than "always remove"
4. **Test at all 3 intensity levels** — `minimal` should be a no-op, `aggressive` should still preserve errors
5. **Use the `unless` field** — guard short-circuits with "don't trigger if X is present"

---

## Raw Output Recovery & Verify Gate

When RTK compresses output aggressively, you can **recover the original text** for debugging, audit, or replay.

### How Raw Output Recovery Works

```
Original output (10K tokens)
        │
        ▼
RTK compress (with rawOutput.enabled=true)
        │
        ├─▶ Compressed output (2K tokens)  ──▶ to LLM
        │
        └─▶ Original output (10K tokens)   ──▶ stored in DB
                                                  (linked by request_id)
```

### Enabling Raw Output Storage

**Per-request** (in combo config):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576  // 1MB cap
    }
  }
}
```

**Globally** (env):

```bash
RTK_RAW_OUTPUT_ENABLED=true
RTK_RAW_OUTPUT_MAX_BYTES=1048576
```

**Default**: `rawOutput.enabled: false` (saves storage).

### Storage Cost

| Per-request | 1MB cap | 10MB cap |
|-------------|---------|----------|
| Average compressed output | ~5KB | ~5KB |
| Raw output stored | ~50-500KB | ~500KB-5MB |
| With 1000 requests/day | 50-500MB/day | 500MB-5GB/day |

> **Recommendation**: Only enable raw output for **debugging sessions** or **sampled auditing**, not always-on.

### Recovering the Original

```ts
import { getRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = await getRawOutput(requestId);
if (raw) {
  console.log("Original output:", raw.content);
  console.log("Compressed at:", raw.compressedAt);
  console.log("Filter used:", raw.filterName);
}
```

### The Verify Gate

The **Verify Gate** (`open-sse/services/compression/engines/rtk/verify.ts`) is a CI check that runs all your filters against their `tests[]` and validates behavior at all 3 intensity levels.

**Run locally**:

```bash
npm run check:rtk
```

**What it checks**:

1. Every filter loads (schema valid)
2. Every `tests[]` entry passes
3. `minimal` intensity is a no-op (preserves original)
4. `aggressive` intensity preserves errors, test failures, and stack traces
5. Compressed output is never larger than input

**CI integration**:

```yaml
# .github/workflows/rtk-verify.yml
- name: RTK verify gate
  run: npm run check:rtk
  # Fails the build if any filter regression is detected
```

### When to Run Verify

- **Before merging a filter change** — always
- **After upgrading RTK engine** — schema may have changed
- **Periodically in CI** — protects against drift in test fixtures
- **When adding a new tool/command family** — proves the new filter works

---

## See Also

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Full compression pipeline overview
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Engine registry and built-in engines
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Custom engines, language packs, stacked pipelines
- Source: `open-sse/services/compression/engines/rtk/` (10 files, ~70KB)
