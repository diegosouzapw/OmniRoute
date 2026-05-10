# 🗜️ Prompt Compression Guide — OmniRoute

> Save 15-95% on eligible context automatically. For a quick overview, see the [README Compression section](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Overview

OmniRoute implements a modular prompt compression pipeline that runs **proactively** before requests hit upstream providers. This means your token savings happen transparently — no changes needed to your workflow.

```
Client Request
  → Compression Strategy Selector
    → Combo override? → Use combo setting
    → Auto-trigger threshold? → Use auto mode
    → Default mode? → Use global setting
    → Off? → Skip compression
  → Selected Compression Mode
    → Off: No compression
    → Lite: Safe whitespace/formatting cleanup (~15%)
    → Standard: Caveman-speak filler removal (~30%)
    → Aggressive: History aging + summarization (~50%)
    → Ultra: Heuristic pruning + code-block thinning (~75%)
    → RTK: Command-aware terminal/tool-output filtering (60-90% upstream range)
    → Stacked: Ordered multi-engine pipeline, usually RTK then Caveman (78-95% eligible range)
  → Compressed Request → Provider
```

---

## Compression Modes

### Off

No compression applied. All messages pass through unchanged.

### Lite Mode (~15% savings, <1ms latency)

The safest mode — zero semantic change, only formatting cleanup:

| Technique                | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `collapseWhitespace`     | Merge consecutive blank lines and trailing spaces |
| `dedupSystemPrompt`      | Remove duplicate system messages                  |
| `compressToolResults`    | Compress verbose tool/function outputs            |
| `removeRedundantContent` | Strip repeated instructions                       |
| `replaceImageUrls`       | Shorten base64 image data URIs                    |

**Best for:** Always-on usage, safety-critical workflows.

### Standard Mode (~30% savings)

Inspired by [Caveman](https://github.com/JuliusBrussee/caveman) — removes filler words and verbose phrasing while preserving meaning:

- Removes filler words ("please", "I think", "basically", "actually")
- Condenses verbose phrases ("in order to" → "to", "as a result of" → "because")
- Strips polite hedging ("Would you mind...", "If you could possibly...")
- 30+ regex rules tuned for coding prompts

**Best for:** Daily coding workflows, cost-conscious teams.

### Aggressive Mode (~50% savings)

Smart history management for long sessions:

- **Message Aging** — older messages get progressively compressed
- **Tool Result Summarization** — long tool outputs replaced with summaries
- **Structural Integrity Guards** — ensures `tool_use` + `tool_result` pairs stay consistent
- **Context Window Awareness** — respects per-model token limits

**Best for:** Extended debugging sessions, large codebases.

### Ultra Mode (~75% savings)

Maximum compression for token-critical scenarios:

- **Heuristic Pruning** — removes messages below relevance threshold
- **Code Block Thinning** — compresses repetitive code examples
- **Binary Search Truncation** — finds optimal cut point for context window
- All Aggressive mode features included

**Best for:** When you're hitting context limits repeatedly.

### RTK Mode (60-90% upstream range)

RTK mode is optimized for verbose tool outputs that appear in coding-agent sessions:

- Detects command/output classes such as `git status`, `git diff`, `git log`, test runners,
  TypeScript/Vite/Webpack builds, ESLint/Biome/Prettier, npm audit/installs, Docker logs, infra
  output, and generic shell output
- Applies JSON filter packs from `open-sse/services/compression/engines/rtk/filters/`
- Ships 49 built-in filters with inline verify samples
- Removes ANSI control sequences, progress bars, repeated lines, and non-actionable noise
- Preserves failures, errors, warnings, changed files, summaries, and the tail of long output
- Supports trust-gated project filters, global filters, and optional redacted raw-output recovery

**Best for:** Agent sessions with shell, build, test, git, grep, and file-output transcripts.

### Stacked Mode (78-95% eligible range)

Stacked mode runs multiple compression engines in a deterministic order. The default pipeline is:

```txt
RTK -> Caveman
```

That order keeps terminal/tool output compact first, then applies Caveman semantic condensation to
the remaining natural-language prompt. Stacked pipelines can be configured globally or through
compression combos assigned to routing combos.

**Best for:** Mixed context with large tool logs plus human instructions or assistant summaries.

---

## Upstream Savings Math

OmniRoute documents compression savings from two sources: upstream project benchmarks and
OmniRoute's own engine composition.

| Source  | Upstream README number used here                                                                                      |
| ------- | --------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` fewer output tokens, `65%` benchmark average output savings, `22-87%` range, and `~46%` input compression tool |
| RTK     | `60-90%` command-output savings; sample session `~118,000 -> ~23,900` tokens, or `79.7%` saved (`~80%`)               |

For overlapping tool/context payloads, the default OmniRoute combo stacks the engines:

```txt
RTK -> Caveman
```

The combined savings are multiplicative, not additive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

That `78-95%` number applies when both RTK and Caveman can reduce the same input/context payload.
Caveman response output mode is separate: when enabled, use Caveman's own output savings (`65%`
average, `~75%` headline, `22-87%` range). Total billing savings depend on your prompt/output mix.

---

## Token Savings Visualization

```
Without compression: 47K tokens sent to LLM
With Lite:           40K tokens sent          (15% saved — safe, always-on)
With Standard:       33K tokens sent          (30% saved — caveman-speak rules)
With Aggressive:     24K tokens sent          (50% saved — aging + summarization)
With Ultra:          12K tokens sent          (75% saved — heuristic pruning)
With RTK:            19K-5K tokens sent       (60-90% saved on command/tool output)
With Stacked:        10K-2.5K tokens sent     (78-95% eligible RTK+Caveman range)
```

---

## Configuration

### Dashboard

Navigate to `Dashboard → Context & Cache`:

- **Caveman** — mode selection, language packs, preview, and global defaults
- **RTK** — command-filter preview, RTK safety settings, and filter catalog
- **Compression Combos** — named engine pipelines assigned to routing combos
- **Auto-Trigger Threshold** — automatically engage compression when token count exceeds threshold

### Per-Combo Override

In `Dashboard → Context & Cache → Compression Combos`, assign a compression combo to a routing
combo:

```txt
Combo: "free-forever"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. gc/gemini-3-flash
    2. if/kimi-k2-thinking
```

This lets you use stacked compression on free/coding providers while keeping lite mode on paid
subscriptions.

### API

```bash
# Get compression settings
curl http://localhost:20128/api/settings/compression

# Update compression settings
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Preview a specific RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List RTK filter packs
curl http://localhost:20128/api/context/rtk/filters

# Test RTK directly with optional command metadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## What Gets Protected

The compression engine **always preserves:**

- ✅ Code blocks (fenced and inline)
- ✅ URLs and file paths
- ✅ JSON structures and structured data
- ✅ Identifiers and protected technical tokens
- ✅ Mathematical expressions
- ✅ Tool/function call definitions
- ✅ System prompts (in lite mode)

RTK raw-output recovery redacts common API keys, bearer tokens, Slack tokens, AWS access keys,
passwords, tokens, and secrets before anything is persisted.

---

## Compression Stats

Every compressed request includes stats in the server logs:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Phase Roadmap

| Phase   | Modes                                | Status     |
| ------- | ------------------------------------ | ---------- |
| Phase 1 | Off, Lite                            | ✅ Shipped |
| Phase 2 | Standard, Aggressive, Ultra          | ✅ Shipped |
| Phase 3 | RTK, Stacked, Compression Combos     | ✅ Shipped |
| Phase 4 | Per-model adaptive, ML-based pruning | 🗓️ Planned |

---

## Acknowledgments

Standard mode compression rules are inspired by **[Caveman](https://github.com/JuliusBrussee/caveman)** by **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — the viral "why use many token when few token do trick" project. Caveman reports `~75%` fewer output tokens, `65%` benchmark average output savings, a `22-87%` output range, and a `~46%` input-compression tool.

RTK mode is inspired by **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** by **[RTK AI](https://github.com/rtk-ai)** — the high-performance command-output compression project for terminal, build, test, git, and tool-output filtering. RTK reports `60-90%` savings, with its README sample session showing `~80%` saved.

---

## See Also

- [Environment Config](ENVIRONMENT.md) — Compression environment variables
- [Architecture Guide](ARCHITECTURE.md) — Compression pipeline internals
- [User Guide](USER_GUIDE.md) — Getting started with compression
- [RTK Compression](RTK_COMPRESSION.md) — RTK filters, trust model, verify gate, raw-output recovery
- [Compression Engines](COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, dashboard
- [Compression Rules Format](COMPRESSION_RULES_FORMAT.md) — JSON rule-pack format
- [Compression Language Packs](COMPRESSION_LANGUAGE_PACKS.md) — Language-specific Caveman rules
