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
- **Tool Result Compression** — long tool outputs truncated or elided (first/last lines,
  match-line filtering, JSON key compaction)
- **Structural Integrity Guards** — ensures `tool_use` + `tool_result` pairs stay consistent
- **Context Window Awareness** — respects per-model token limits

**Best for:** Extended debugging sessions, large codebases.

### Ultra Mode (~75% savings)

Maximum compression for token-critical scenarios:

- **Heuristic Pruning** — score-based token pruning of prose
- **Structure Preservation** — fenced code blocks, inline code, URLs and identifiers are
  tombstoned and re-stitched verbatim, never pruned
- **Optional SLM tier** — a small local model can refine the prune when configured
- Independent of Aggressive mode: it does not run message aging, tool-result compression
  or the fallback summarizer (only an SLM-tier failure can route a fallback pass through
  aggressive)

**Best for:** When you're hitting context limits repeatedly.

### RTK Mode (60-90% upstream range)

RTK mode is optimized for verbose tool outputs that appear in coding-agent sessions:

- Detects command/output classes such as `git status`, `git diff`, `git log`, test runners,
  TypeScript/Vite/Webpack builds, ESLint/Biome/Prettier, npm audit/installs, Docker logs, infra
  output, and generic shell output
- Applies JSON filter packs from `open-sse/services/compression/engines/rtk/filters/`
- Imports RTK TOML schema v1 filters from project or global `filters.toml` files, with inline-test
  validation and trust-gating for project files
- Ships 55 built-in filters with inline verify samples
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

### What "eligible" actually means

The 15-95% headline range is real, but it only applies to **redundant or verbose** content — repeated
error lines, a build log that spams the same warning, an oversized `grep`/file-read dump. It does
**not** mean every request saves that much.

Verified empirically (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): a
`stacked` (RTK + Caveman) run against an Anthropic-shape `tool_result` block containing 300 identical
error lines produced **95.93% token savings / 96.26% character savings** — squarely in the advertised
range. But the same pipeline run against normal, non-redundant tool output (a clean `grep` match list,
a short file read, ordinary conversational text) correctly produces **near-zero savings**, because
there is nothing repetitive to remove and `validateCompression()` (`validation.ts`) refuses to ship a
rewrite that would drop or alter code blocks, URLs, headings, versions, or ALL-CAPS constant identifiers.

This is expected, safe behavior, not a bug: a coding session that mostly reads/greps clean files will
see modest total savings even with compression fully enabled, while a session that hits a failing
loop or a chatty linter will see the full 78-95% range on that traffic. Don't use a single session's
low aggregate savings percentage as evidence compression is misconfigured — check whether the
underlying tool output was actually redundant first.

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
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

This lets you use stacked compression on free/coding providers while keeping lite mode on paid
subscriptions.

This "Per-Combo Override" assignment is a different control from the **routing-combo compression
mode** override (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — the field's
schema also accepts `rtk`, `stacked` and `omniglyph`) — that override does not pick a named
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

| Value         | Effect                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `off`         | No compression for this request.                                                                 |
| `default`     | The panel-derived Default profile (ignores the active profile). Lossy engines are left off.      |
| `safe`        | Same as omitting the header: dedup and whitespace folding only.                                  |
| `allow-lossy` | Keep this request's operator plan, including summaries, relevance filters, and style rewrites.   |
| `engine:<id>` | A single engine when enabled, e.g. `engine:rtk`. This is the per-request opt-in for that engine. |
| `<combo>`     | A named combo, matched by name (case-insensitive) first, then by id.                             |

Without `allow-lossy`, `engine:<id>`, or a named combo, lossy engines are not applied. The
request still gets session dedup and whitespace folding when compression is on.

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

| Phase    | Modes                                                                                                                                         | Status     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Phase 1  | Off, Lite                                                                                                                                     | ✅ Shipped |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                                   | ✅ Shipped |
| Phase 3  | RTK, Stacked, Compression Combos                                                                                                              | ✅ Shipped |
| Phase 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                   | ✅ Shipped |
| Phase 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` on `PUT /api/settings/compression`) + dashboard mode/policy controls | ✅ Shipped |

---

## Acknowledgments

Standard mode compression rules are inspired by **[Caveman](https://github.com/JuliusBrussee/caveman)** by **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — the viral "why use many token when few token do trick" project. Caveman reports `~75%` fewer output tokens, `65%` benchmark average output savings, a `22-87%` output range, and a `~46%` input-compression tool.

RTK mode is inspired by **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** by **[RTK AI](https://github.com/rtk-ai)** — the high-performance command-output compression project for terminal, build, test, git, and tool-output filtering. RTK reports `60-90%` savings, with its README sample session showing `~80%` saved.

---

## Advanced Compression Systems

Beyond the 7 modes described above (the source also accepts `codex-responses` and
`omniglyph` modes, which this guide does not cover), the sections below cover features
that work inside or alongside those modes: Tool Result Compression and Progressive Aging
are steps 1 and 2 of the aggressive engine (Aggressive mode and an `aggressive` step of a
stacked pipeline), the Stacked Pipeline is how Stacked mode runs, Cache-Aware Compression
downgrades `aggressive` and `ultra` to `standard` for caching providers while compression
is on, and Caveman Output Mode and Output Styles are opt-in system-prompt instructions,
off by default, that shape the model's output instead of compressing the request.

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

The strategy helper also returns a `deterministicOnly` flag, but the plan builder consumes
only the strategy — nothing downstream reads the flag today.

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
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### When to use

Cache-aware compression is **always on** — no configuration needed. It kicks in whenever
compression is on and the target provider supports prompt caching (Anthropic, OpenAI,
etc.); explicit `cache_control` markers are not required — a caching provider alone
triggers the downgrade, and markers alone never do (marker detection feeds cache
telemetry, not the strategy decision).

### Progressive Aging

Long conversations accumulate many message turns, but older turns become less
relevant. The `progressiveAging.ts` module **degrades messages by turn distance**
(distance measured from the end of the conversation). With the shipped defaults
(`verbatim: 2, light: 2, moderate: 3`):

- **Last 2 turns (distance ≤ 2)**: Kept verbatim
- **Distance 3**: Caveman compression (filler removal)
- **Distance 4+**: Assistant messages summarized; user messages reduced to their first
  line, capped at 120 characters; other roles untouched. System prompts, already-aged
  messages and the latest user message are always kept verbatim regardless of distance.
  Nothing is dropped outright, and the `light`
  band is unreachable with the shipped defaults (`light` equals `verbatim`).

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
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### When to use

Progressive aging is **always on** for `aggressive` mode — it is step 2 of
`compressAggressive()`. Ultra mode does not run it. It's
particularly effective for:

- Long-running coding sessions
- Multi-day conversations
- Agentic workflows with many tool calls

### Caveman Output Mode

Caveman output mode adds **system prompt instructions** that ask the model itself for
terse output — the `lite` level asks for concise answers that keep full sentences, `full`
asks it to "respond terse like smart caveman", and `ultra` asks for telegraphic output;
instructions only ask, they cannot guarantee it. Requests receive them through
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` first resolves the selection with the back-compat shim
(`resolveOutputStyleSelection()` in
`open-sse/services/compression/outputStyles/backCompat.ts`), which, while `outputStyles`
is empty, maps an enabled `cavemanOutputMode` to the `terse-prose` output style at
`cavemanOutputMode.intensity` (see Back-compat below); a non-empty `outputStyles`
selection is used as is, and `cavemanOutputMode.enabled` and `intensity` then have no
effect, while its `autoClarity` toggle still applies. `outputMode.ts` holds the
instruction texts (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), the content bypass and the
placement helper that injection uses; its own `applyCavemanOutputMode()` injector has no
production caller.

#### How it works

This mode does not compress the input. It adds an instruction block to the system prompt
(see How injection works below), and any input compression mode selected for the request
still runs afterwards, on the body that now carries the block. Ahead of the shared
boundaries clause that every level ends with, the English `full` level reads:

> "Respond terse like smart caveman. Drop articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries, hedging. Fragments OK. Short synonyms (big not extensive, fix not implement). Keep all technical substance, code, errors, URLs, identifiers exact."

This works particularly well for:

- Code generation (terser output = fewer tokens)
- Quick Q&A (no need for elaborate explanations)
- Batch processing (maximize throughput)

#### When to use

Caveman output mode is **opt-in**. With compression on (`enabled: true`, the master toggle
on the Compression Settings page), turn it on with `cavemanOutputMode.enabled`; `intensity`
picks `lite`, `full` or `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

A compression combo's **Output Mode** toggle (`outputMode`, level in `outputModeIntensity`)
sets the same switch for the requests that combo applies to, and the
`omniroute_set_compression_engine` MCP tool writes it through its boolean `outputMode`
argument. A non-empty `outputStyles` selection takes precedence over this switch. In the
dashboard, enabling the **Terse prose** output style injects the same block (see Output
Styles below).

### Output Styles (catalog)

Caveman output mode above is the **legacy single-style path**. Phase 4 generalized it
into a catalog of composable output styles: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Each style is a system-prompt
instruction that asks the model itself for cheaper output; styles can be enabled
together and are injected in catalog order.

| Style                      | `id`          | What it does                                                                                                                                                                                                 | Instruction languages                         |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Terse prose                | `terse-prose` | Drop filler/articles/hedging; keep technical substance exact. Same text as the legacy caveman output mode (referenced, not re-typed).                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Less code                  | `less-code`   | YAGNI ladder: smallest working change, no unrequested abstractions.                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (lazy senior dev) | `ponytail`    | "The best code is the code never written": reuse > rewrite, root cause > symptom, shortest working diff.                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| I have ADHD (action-first) | `i-have-adhd` | Action first (command/path/snippet before prose), numbered bounded steps, ONE concrete next step, no preamble/recap/closers. Adapted from [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)           | `terse-cjk`   | `full`/`ultra` answer in Classical Chinese (文言); `lite` only asks for brief answers without function words, pleasantries or embellishment.                                                                 | zh (locale-gated, see below)                  |

Every style ships three intensity levels — `lite`, `full`, `ultra` — and every level
ends with the shared boundaries clause (`SHARED_BOUNDARIES` in `outputMode.ts`), which
keeps code blocks, file paths, commands, errors and URLs exact. The `terse-prose` and
`terse-cjk` level texts add identifiers to that list.

`terse-cjk` is locale-gated to `zh` in two places. The Compression Settings page lists
its row only when the dashboard UI language is Chinese (`zh-CN` or `zh-TW`), and
`applyOutputStyles()` injects it only when the request's resolved language (see Language
selection below) is `zh`. Hiding the row does not clear a saved `terse-cjk` selection:
the settings API accepts any style id, and saving other styles on the page keeps it. At
request time, the `applyOutputStyles()` language check is the only locale gate.

#### How injection works

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolves
the selection against the catalog (unknown ids and locale-mismatched styles are
dropped, never an error; a selection that resolves to no style leaves the body
unchanged, skipped as `no_styles`), concatenates the selected instructions in catalog
order,
appends the boundaries clause **once** (plus the safety clause, `SAFETY_BOUNDARIES` or its
translation, when `less-code` or `ponytail` is selected), and starts the block with a
single idempotency marker (`[OmniRoute Output Styles]`), so re-applying is a no-op. When
the resolved language (see Language selection below) has a translation, the localized
instruction is injected instead of English.

On a body with a non-empty `messages` array, the idempotency check runs before the
content bypass: when the `[OmniRoute Output Styles]` marker is already in the top-level
`system` field (a string or a content-block array) or in a system message with string
content, the body is left unchanged as `already_applied` and no keyword check runs.
Otherwise a content bypass (`shouldBypassCavemanOutputMode()` in
`open-sse/services/compression/outputMode.ts`) checks the text of the last three
messages, whatever their role, and skips the styles for the whole turn when that text
matches its security, irreversible-action or clarification keywords, or an
order-sensitive sequence: `first`, `then`, `after that`, `before`, `rollback` or
`backup` followed within 240 characters by `delete`, `drop`, `migrate`, `deploy` or
`release`. The bypass runs while the **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`, on by default) is on; turning the toggle off skips the
keyword check.

When the bypass lets the turn through, `placeSystemInstruction()` (same file), which
never creates a new `messages[0]`, places the block in the first of these it finds:

1. A leading system message with string content: the block is appended after its text.
2. The top-level `system` field: the block is appended after the text of a string, or
   added as a new text block to a content-block array.
3. The first later system message with string content: the block is appended after its
   text.
4. None of the above: the block goes into a new system message at the end of `messages`.

On a body without a `messages` array (or with an empty one), no content bypass runs and
a top-level `system` field is not consulted. The block is appended after the text of a
string `instructions` field, unless that field already contains the
`[OmniRoute Output Styles]` marker, in which case the body is left unchanged as
`already_applied`. When the body has no string `instructions` field but carries `input`
(a string or an array), the block becomes `instructions`, replacing any non-string value
that field held. A body with neither a string `instructions` field nor a string or array
`input` is left unchanged and skipped as `no_messages`.

#### How to enable

In the dashboard: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles section: one row per style with an on/off
toggle and a level selector. Styles inject while compression itself is on (the page's
master toggle, `enabled`). The **Auto-Clarity Bypass** toggle is on the **Caveman**
page (`/dashboard/context/caveman`), in its **Output Mode** card. Programmatically, the
compression config persists the selection as:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: while `outputStyles` is empty, the legacy `cavemanOutputMode.enabled`
setting maps to `terse-prose` at `cavemanOutputMode.intensity`. The block then starts
with the `[OmniRoute Output Styles]` marker, where the legacy `applyCavemanOutputMode()`
injector wrote `[OmniRoute Caveman Output Mode]`. Below the marker, the text matches the
legacy injection in en, pt-BR, es, de, fr, it, ru, id and vi; in ja and zh it carries one
extra space before the boundaries clause. `terse-prose` translates into pt-BR, es, de,
fr, it, ru, zh, ja, id and vi, so a request whose resolved language is `hu` gets the
English text where the legacy injector used its Hungarian one.

Output-style language selection (`resolveOutputStyleLanguage()` in
`outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the
latest user message in the request's `messages` array that has text (string content, or
the `text` of its content parts) and runs the Caveman engine's detector
(`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han
characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match —
text it cannot classify gets English, never `defaultLanguage`, and `vi` is never
detected although the styles ship `vi` text. A Responses API body keeps its turns in
`input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user
message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies,
then English. With `languageConfig.enabled` off, the language is English — unless a
compression combo applies to the request (a combo assigned to the request's routing
combo, or the default compression combo chatCore falls back to for the built-in stacked
pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets
`defaultLanguage` from the combo's language packs (the saved value if it is one of the
combo's packs, otherwise the combo's first pack, which defaults to `en`), while the
saved `autoDetect` (on by default) still applies. The Caveman input engine picks its
rule-pack language differently — per text part and, with auto-detect off, gated on
`enabledPacks`.

The style × language matrix is pinned by
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: every catalog style needs an
entry in the test's `BASELINE_LANGUAGES`; a style that is not locale-gated must ship a
pt-BR translation (the locale-gated `terse-cjk` is exempt from this rule) unless it is
listed in `KNOWN_ENGLISH_ONLY`, which may hold only styles with no translations at all —
a listed style that has any translation fails the test; and a style fails the test when
it loses a language that its `BASELINE_LANGUAGES` entry lists. To add a style, see
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Tool Result Compression

`compressToolResult()` in `open-sse/services/compression/toolResultCompressor.ts`
compresses tool-result text with **5 strategies**. It tries them in this order, and the
first enabled strategy whose check matches the content decides the result:

1. **`fileContent`**: content of 3 or more lines in which at least one line, ignoring
   leading indentation, starts with `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` or `return ` (the keyword plus a space), or with `if`,
   `for` or `while` followed by `(` or ` (`, keeps its first 20 and last 5 lines, with
   the elided middle marked.
2. **`grepSearch`**: content with at least one line of the form `<path>:<digits>:`,
   where the text before the first colon has no whitespace, keeps only those lines, at
   most 30, followed by a count of any further matches and the list of matched files;
   every other line is dropped. One such line is enough to trigger the strategy, so a
   log line starting with a timestamp such as `12:30:45` also counts.
3. **`shellOutput`**: output that contains an ANSI CSI sequence (`ESC[` then digits or
   semicolons then a letter, as in color codes) or a `$` followed by whitespace
   anywhere in the text loses those sequences (other escapes, such as `ESC[?25l` or an
   OSC window-title sequence, are kept) and keeps its last 50 lines, with consecutive
   repeated lines collapsed. Because this check runs before `json` and `errorMessage`,
   JSON or error output that contains such a `$` never reaches them while
   `shellOutput` is on.
4. **`json`**: a JSON payload over 2,000 characters that starts with `{` or `[` (after
   optional whitespace) and parses is summarized: an array of more than 7 items keeps
   its first 5 and last 2 items and its total count, and an object keeps its first 20
   keys, with each nested object or array value replaced by a `{…N keys}` placeholder
   (for an array, N is its length) and a `_remaining_<N>_keys` marker counting the keys
   dropped past the first 20. Scalar values are copied whole, so an object of 20 keys
   or fewer with no nested values is only re-indented — a minified one gains characters
   and stays unchanged.
5. **`errorMessage`**: output that contains, anywhere and in any letter case, `error:`,
   `error ` (the word followed by a space, as in `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` or `traceback` keeps its first line, the
   next 10 lines and the last 3, with a `… [N frames elided] …` marker in place of the
   lines between them. The marker appears only when more than 13 lines follow the first
   line, so error output of 14 lines or fewer is not shortened (at 12 or 13 lines the
   last 3 repeat lines already kept).

After a strategy matches, even one that saves nothing, the later strategies are not
tried. When the matching strategy saves no estimated tokens (length ÷ 4, rounded up) —
for example a code-like file of 25 lines or fewer, or a JSON array over 2,000
characters with 7 items or fewer — the aggressive engine keeps the original tool
result: both callers (`compressAggressive()` and `compressAnthropicToolResultBlock()`)
keep the original when `saved` is 0 or below, while `compressToolResult()` itself still
returns that strategy's output. The tool-result step is not the last word: the
engine's fallback summarizer can still shorten a `tool` or `function` message longer
than 8,192 characters (`maxTokensPerMessage`, 2,048, times 4).

#### When to use

Tool result compression is step 1 of the aggressive engine (`compressAggressive()` in
`open-sse/services/compression/aggressive.ts`), so it runs in Aggressive mode and in an
`aggressive` step of a stacked pipeline. It compresses OpenAI-shape `tool` and `function`
messages and the text inside Anthropic `tool_result` blocks. Each strategy has its own
switch under `aggressive.toolStrategies`, all on by default. In the dashboard, the
switches are in the Caveman page's **Advanced** view while compression is on and the
default mode is Aggressive.

### Stacked Pipeline

The stacked mode runs **multiple engines in sequence** — usually RTK first
(60-90% savings on tool output), then Caveman on the remaining text (~46% input
savings). Composed, that is the **78-95% eligible range** (see Upstream Savings Math
above): `1 - (1 - 0.60..0.90) × (1 - 0.46)` averages ≈89%.

#### How it works

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### When to use

Use stacked mode for:

- Tool-heavy workflows (agentic coding, research)
- Cost-sensitive batch processing
- When you need maximum token savings

Stacked pipelines are configured through the global `stackedPipeline` compression
setting, or through a named compression combo assigned to a routing combo (see
Per-Combo Override above) — not through an auto-combo `modePack` (that field only
re-weights auto-combo model selection, and `stacked` is not a valid pack name).

---

## Compression Combo Overrides

You can override the global compression mode **per combo** to fine-tune behavior
for different use cases:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

This is useful for:

- **Coding combos**: Use `aggressive` mode for long sessions
- **Quick Q&A combos**: Use `lite` mode for fast responses
- **Tool-heavy combos**: Use `stacked` mode for max savings
- **Production combos**: leave the override off for caching providers — the always-on
  cache-aware adjustment downgrades `aggressive`/`ultra` to `standard` automatically
  (there is no selectable `cache-aware` mode)

---

## See Also

- [Environment Config](../reference/ENVIRONMENT.md) — Compression environment variables
- [Architecture Guide](../architecture/ARCHITECTURE.md) — Compression pipeline internals
- [User Guide](../guides/USER_GUIDE.md) — Getting started with compression
- [RTK Compression](./RTK_COMPRESSION.md) — RTK filters, trust model, verify gate, raw-output recovery
- [Compression Engines](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, dashboard
- [Compression Rules Format](./COMPRESSION_RULES_FORMAT.md) — JSON rule-pack format
- [Compression Language Packs](./COMPRESSION_LANGUAGE_PACKS.md) — Language-specific Caveman rules
