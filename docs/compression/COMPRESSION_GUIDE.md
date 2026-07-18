---
title: "🗜️ Prompt Compression Guide — OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

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
    1. if/kimi-k2-thinking
    2. qw/qwen3-coder-plus
```

This lets you use stacked compression on free/coding providers while keeping lite mode on paid
subscriptions.

This "Per-Combo Override" assignment is a different control from the **routing-combo compression
mode** override (Default/Off/Lite/Standard/Aggressive/Ultra) — that override does not pick a named
compression-combo pipeline; it just sets the `compressionMode` field consulted by
`resolveCompressionPlan`. It can be set either on the combo card (`Dashboard → Combos`) or, since
#6760, per routing combo in the "Assign to routing" list on
`Dashboard → Context & Cache → Compression Combos`, right next to the pipeline-assignment checkbox
documented above. Both surfaces persist through the same `PUT /api/combos/{id}` endpoint.

### Per-request override

Send the `x-omniroute-compression` request header to override the compression plan for a single
request. It has the highest precedence — it beats the routing-combo override, the active profile,
auto-trigger, and the panel Default. Unknown values are ignored (the request is never rejected) and
the global master switch still gates everything: when compression is off globally, the header cannot
turn it on. Values:

| Value         | Effect                                                               |
| ------------- | -------------------------------------------------------------------- |
| `off`         | No compression for this request.                                     |
| `default`     | The panel-derived Default profile (ignores the active profile).      |
| `engine:<id>` | A single engine when enabled, e.g. `engine:rtk`.                     |
| `<combo>`     | A named combo, matched by name (case-insensitive) first, then by id. |

The applied plan is echoed back in the `X-OmniRoute-Compression: <mode>; source=<source>` response
header, where `<source>` is one of `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, or `off`.

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

| Phase   | Modes                                                                | Status     |
| ------- | -------------------------------------------------------------------- | ---------- |
| Phase 1 | Off, Lite                                                            | ✅ Shipped |
| Phase 2 | Standard, Aggressive, Ultra                                          | ✅ Shipped |
| Phase 3 | RTK, Stacked, Compression Combos                                     | ✅ Shipped |
| Phase 4 | Output Styles, SLM-tier Ultra, eval harness | ✅ Shipped |
| Phase 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` on `PUT /api/settings/compression`) | ✅ Shipped (API-configurable; dashboard controls not yet built, #7005) |

---

## Acknowledgments

Standard mode compression rules are inspired by **[Caveman](https://github.com/JuliusBrussee/caveman)** by **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — the viral "why use many token when few token do trick" project. Caveman reports `~75%` fewer output tokens, `65%` benchmark average output savings, a `22-87%` output range, and a `~46%` input-compression tool.

RTK mode is inspired by **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** by **[RTK AI](https://github.com/rtk-ai)** — the high-performance command-output compression project for terminal, build, test, git, and tool-output filtering. RTK reports `60-90%` savings, with its README sample session showing `~80%` saved.

---

## Advanced Compression Systems

Beyond the 7 standard modes, OmniRoute includes several advanced compression
systems that work automatically based on context.

### Cache-Aware Compression

Some providers (like Anthropic with prompt caching) support **prompt caching**,
which lets them cache parts of the prompt to reduce costs and latency. When
caching is enabled, aggressive compression can actually **hurt** performance
because it changes the cached tokens, invalidating the cache.

The `cachingAware.ts` module solves this by **detecting caching context** and
**adjusting the compression strategy** accordingly.

#### How it works

1. **Detect caching context** — Scans the request body for `cache_control` markers
2. **Identify caching providers** — Checks if the target provider supports caching
3. **Adjust strategy** — Downgrades `aggressive`/`ultra` to `standard` for caching providers
4. **Skip system prompt** — System prompts are usually cached, so don't compress them
5. **Use deterministic transformations** — Only use transformations that produce consistent output

#### Code example

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### When to use

Cache-aware compression is **always on** — no configuration needed. It only kicks in
when:

- The request has `cache_control` markers
- The target provider supports prompt caching (Anthropic, OpenAI, etc.)

### Progressive Aging

Long conversations accumulate many message turns, but older turns become less
relevant. The `progressiveAging.ts` module **degrades messages by turn distance**:

- **Recent turns (0-3)**: Kept verbatim (full detail)
- **Medium turns (4-8)**: Lite compression (whitespace, formatting cleanup)
- **Old turns (9+)**: Caveman compression (filler removal, summarization)
- **Very old turns (20+)**: Heavily summarized or dropped

#### Code example

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // First 3 turns: verbatim
  light: 8, // Turns 4-8: lite compression
  moderate: 20, // Turns 9-20: caveman compression
  // Turns 21+: heavy summarization
});

// saved = number of tokens saved
```

#### When to use

Progressive aging is **always on** for `aggressive` and `ultra` modes. It's
particularly effective for:

- Long-running coding sessions
- Multi-day conversations
- Agentic workflows with many tool calls

### Caveman Output Mode

The `outputMode.ts` module injects **system prompt instructions** to make the
model itself produce compressed, terse output (a "caveman" style).

#### How it works

Instead of compressing the input, this mode adds a system prompt like:

> "Reply in minimal words. Skip pleasantries. Use short sentences."

This works particularly well for:

- Code generation (terser output = fewer tokens)
- Quick Q&A (no need for elaborate explanations)
- Batch processing (maximize throughput)

#### When to use

Caveman output mode is **opt-in** — set it via the combo config:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Tool Result Compression

The `toolResultCompressor.ts` module provides **5 specialized compression strategies**
for tool results (function calls, agent outputs, search results, etc.):

1. **Search result compression** — Removes redundant results, keeps top-N
2. **File read compression** — Truncates large files, preserves headers/imports
3. **Code execution compression** — Keeps only essential stdout/stderr
4. **Database query compression** — Limits rows, removes verbose metadata
5. **API response compression** — Strips null fields, condenses arrays

#### When to use

Tool result compression is **always on** when tool calls are present. No
configuration needed.

### Stacked Pipeline

The stacked mode runs **multiple engines in sequence** — usually RTK first
(60-90% savings on tool output), then Caveman (30% additional savings on the
remaining text). This achieves **78-95% total savings**.

#### How it works

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 140 tokens
  → Output (140 tokens, 86% savings)
```

#### When to use

Use stacked mode for:

- Tool-heavy workflows (agentic coding, research)
- Cost-sensitive batch processing
- When you need maximum token savings

Configure via combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Compression Combo Overrides

You can override the global compression mode **per combo** to fine-tune behavior
for different use cases:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

This is useful for:

- **Coding combos**: Use `aggressive` mode for long sessions
- **Quick Q&A combos**: Use `lite` mode for fast responses
- **Tool-heavy combos**: Use `stacked` mode for max savings
- **Production combos**: Use `cache-aware` mode for caching providers

---

## See Also

- [Environment Config](../reference/ENVIRONMENT.md) — Compression environment variables
- [Architecture Guide](../architecture/ARCHITECTURE.md) — Compression pipeline internals
- [User Guide](../guides/USER_GUIDE.md) — Getting started with compression
- [RTK Compression](./RTK_COMPRESSION.md) — RTK filters, trust model, verify gate, raw-output recovery
- [Compression Engines](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, dashboard
- [Compression Rules Format](./COMPRESSION_RULES_FORMAT.md) — JSON rule-pack format
- [Compression Language Packs](./COMPRESSION_LANGUAGE_PACKS.md) — Language-specific Caveman rules
