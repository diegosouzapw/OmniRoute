# Compression Engines

OmniRoute compression is built around engine contracts. A mode can run one engine directly
(`caveman` or `rtk`) or a deterministic stacked pipeline that executes multiple engines in order.

## Modes

| Mode         | Engine path                        | Intended input                               |
| ------------ | ---------------------------------- | -------------------------------------------- |
| `off`        | none                               | Exact prompt preservation                    |
| `lite`       | Caveman lite helpers               | Low-risk always-on cleanup                   |
| `standard`   | Caveman                            | Natural-language prompt condensation         |
| `aggressive` | Caveman + history/tool summarizers | Long chat sessions                           |
| `ultra`      | Caveman + pruning helpers          | Context-limit recovery                       |
| `rtk`        | RTK                                | Terminal, shell, build, test, and git output |
| `stacked`    | Pipeline, default `rtk -> caveman` | Mixed tool logs and prose, max savings       |

## Engine Registry

The registry lives in `open-sse/services/compression/engines/registry.ts`. Engines expose a shared
contract:

- `id`: stable engine id such as `caveman` or `rtk`
- `label`: dashboard-readable name
- `supports(mode)`: whether the engine can execute a compression mode
- `compress(input)`: transforms text/messages and returns stats

`strategySelector.ts` registers the built-in engines before compression runs. This lets preview,
runtime compression, stacked mode, tests, and future engines use the same execution path.

## Caveman

Caveman mode focuses on semantic condensation of normal prose:

- preserves code blocks, URLs, JSON, paths, and structured data
- removes filler, hedging, repeated context, and verbose connective phrasing
- supports language-aware file rule packs in `open-sse/services/compression/rules/`
- remains available through the legacy `standard`, `aggressive`, and `ultra` modes

The dashboard surface is `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream reports `~75%` fewer output tokens, `65%` average output savings in benchmarks
with a `22-87%` range, and a `~46%` input-compression tool. OmniRoute uses the Caveman input-side
number when documenting stacked prompt/context savings; Caveman output mode remains a separate
response-behavior feature.

## RTK

RTK mode focuses on command and tool output:

- detects output classes such as `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go tests, TypeScript/Vite/Webpack builds, ESLint, npm audit/installs, Docker logs,
  shell `find`/`grep`, stack traces, and generic logs
- applies 49 JSON filters from `open-sse/services/compression/engines/rtk/filters/`
- supports the RTK-style declarative pipeline: ANSI stripping, replace, match-output short-circuit,
  strip/keep lines, per-line truncation, head/tail/max-line truncation, and on-empty fallback
- supports trust-gated project filters in `.rtk/filters.json` and global filters in
  `DATA_DIR/rtk/filters.json`
- strips ANSI sequences, progress noise, repeated lines, and unhelpful boilerplate
- preserves actionable failures, warnings, summaries, changed files, and tail context
- can optionally retain redacted raw output for recovery/debugging through authenticated management
  routes

The dashboard surface is `Dashboard -> Context & Cache -> RTK`.

Operational details for custom filters, trust, verify, and raw-output recovery live in
[`RTK_COMPRESSION.md`](RTK_COMPRESSION.md).

RTK upstream reports `60-90%` savings for command-output compression. Its README example shows a
30-minute Claude Code session going from `~118,000` tokens to `~23,900`, or `79.7%` saved.

## Stacked Pipelines

Stacked mode runs pipeline steps in order. The default is:

```txt
rtk -> caveman
```

Use this for coding-agent sessions where a prompt combines command output with human or assistant
prose. RTK reduces noisy tool logs first, then Caveman compresses remaining natural language.

Pipeline steps are configured with `stackedPipeline` in compression settings or through compression
combos.

When both engines reduce the same eligible payload, savings compound:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Compression Combos

Compression combos are named compression profiles that can be assigned to routing combos:

- `compression_combos`: stores mode, pipeline, RTK config, language config, and default marker
- `compression_combo_assignments`: maps a compression combo to a routing combo
- runtime integration resolves an assigned compression combo before generic combo overrides
- analytics include `compression_combo_id` and `engine`

Dashboard surface: `Dashboard -> Context & Cache -> Compression Combos`.

## API Surface

| Route                                  | Purpose                                    |
| -------------------------------------- | ------------------------------------------ |
| `/api/settings/compression`            | Global compression settings                |
| `/api/compression/preview`             | Preview any compression mode               |
| `/api/compression/language-packs`      | List available Caveman language packs      |
| `/api/context/caveman/config`          | Caveman settings alias                     |
| `/api/context/rtk/config`              | RTK defaults and settings                  |
| `/api/context/rtk/filters`             | RTK filter catalog                         |
| `/api/context/rtk/test`                | RTK preview/test endpoint                  |
| `/api/context/rtk/raw-output/[id]`     | Authenticated redacted raw-output recovery |
| `/api/context/combos`                  | Compression combo CRUD                     |
| `/api/context/combos/[id]/assignments` | Routing-combo assignment CRUD              |
| `/api/context/analytics`               | Compression analytics alias                |

Management routes require management authentication or API-key policy checks.

## MCP Tools

Compression exposes five MCP tools:

| Tool                                | Scope               | Purpose                          |
| ----------------------------------- | ------------------- | -------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Settings, analytics, cache stats |
| `omniroute_compression_configure`   | `write:compression` | Update global settings           |
| `omniroute_set_compression_engine`  | `write:compression` | Set mode and optional pipeline   |
| `omniroute_list_compression_combos` | `read:compression`  | List compression combos          |
| `omniroute_compression_combo_stats` | `read:compression`  | Read combo/engine analytics      |

## Validation

The focused gates for this area are:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
npm run typecheck:core
```
