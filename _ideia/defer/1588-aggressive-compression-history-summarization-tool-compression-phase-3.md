# Feature: [Feature] Aggressive Compression — History Summarization & Tool Compression (Phase 3)

> GitHub Issue: #1588 — opened by @oyi77 on 2026-04-25T11:56:47Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem / Use Case

Phases 1 (#1586) and 2 (#1587) handle structural and linguistic compression for 10-40% savings. But the biggest token consumers in real-world OmniRoute usage are **long conversations** and **tool-heavy coding sessions**, where:

1. **Tool results dominate the token budget** — A single tool call (file read, grep, shell command) can return 5-50K tokens. After 5-10 tool calls in a coding session, tool results can be 80%+ of the total prompt.
2. **Conversation history grows unbounded** — The existing context manager only starts dropping messages when the window is exceeded. There's no progressive compression that keeps recent context rich while condensing older context.
3. **Thinking blocks accumulate** — Models like DeepSeek R1 and Claude emit `<thinking>`/`<antThinking>` blocks that are useful for the current response but consume massive tokens in history.

**Example scenario**: A user coding with Claude Code through OmniRoute sends a 30-message conversation with 15 tool calls. Total tokens: ~80K. After aggressive compression: ~32K (60% savings). The model still has full context for the last 5 exchanges and summarized context for earlier exchanges.

## Proposed Solution

Aggressive mode **combines all Caveman techniques with intelligent history management** — summarizing old turns, compressing tool results, and removing thinking blocks from history.

### Module 1: History Summarization (`open-sse/services/compression/summarizer.ts`)

Convert messages older than N turns into a compact summary system message:

```
BEFORE (messages 1-10, ~15K tokens):
  [user] "Can you help me debug this function?"
  [assistant] "Sure, let me look at the code..."
  [user] "Here's the error: TypeError at line 42..."
  [assistant] "I see the issue. It's a type mismatch..."
  [tool_result] "function authenticate(user) { ... }" (3K tokens)
  ... (6 more messages)

AFTER (~1.5K tokens):
  [system] "[Session summary: Debugged authenticate() function — TypeError at line 42 caused by type mismatch on user parameter. Fixed by adding type check. Discussed error handling approach and decided on early-return pattern.]"
```

**Implementation options:**
1. **Rule-based summarization** (Phase 3A): Extract key phrases from user questions + assistant conclusions. No LLM needed. Fast but coarse.
2. **LLM-assisted summarization** (Phase 3B): Send old messages to a cheap model (e.g., LongCat Flash Lite at $0, or DeepSeek V3 at $0.27/1M) to produce a summary. Higher quality but adds ~500ms latency and a small cost.

Both should be supported, selectable via config.

### Module 2: Tool Result Compression (`open-sse/services/compression/toolCompress.ts`)

Smart compression of tool outputs that preserves actionable information:

| Strategy | What It Does | Savings | Example |
|---|---|---|---|
| **File content compression** | Keep first/last N lines + line count | 70-90% | 500-line file → first 10 + last 10 + "[470 lines omitted]" |
| **Grep/search result compression** | Keep match + surrounding context | 50-70% | 50 matches with 3-line context → match lines only |
| **Shell output compression** | Keep exit code + key lines | 60-80% | 100-line build output → exit code + error lines |
| **JSON response compression** | Keep structure, remove whitespace/redundancy | 20-40% | Prettified JSON → compact JSON |
| **Error message compression** | Keep error type + first occurrence | 50-70% | Repeated stack traces → first + count |

**Key design**: Tool compression should understand the *semantic structure* of common tool output formats (file diffs, grep results, stack traces, API responses) rather than blindly truncating at character limits (current context manager approach).

### Module 3: Progressive Compression (`open-sse/services/compression/progressive.ts`)

Apply increasing compression to older messages while keeping recent context intact:

```
Messages 1-5 (oldest):  Full summarization — collapse to 1 system message
Messages 6-10:          Moderate — strip details, keep key facts + conclusions  
Messages 11-15:         Light — apply Caveman rules only
Messages 16-20 (newest): Verbatim — no modification
```

This creates a "fading context" effect where the model has full detail for recent exchanges and progressively less detail for older ones, matching how humans actually recall conversation history.

### Module 4: Aggressive Mode Orchestration (`open-sse/services/compression/aggressive.ts`)

Combines all techniques in order:

1. Apply Caveman compression to all messages
2. Remove thinking blocks from non-last assistant messages (existing logic from contextManager — refactor it out)
3. Compress tool results using toolCompress
4. Apply progressive compression (older = more aggressive)
5. If still over threshold, summarize oldest messages

### Configuration

```typescript
interface AggressiveCompressionConfig {
  enabled: boolean;
  // After how many turns to start compressing history
  summarizeAfterTurns: number; // default: 4
  // Summarization method: "rule-based" | "llm-assisted"
  summarizationMethod: string; // default: "rule-based"
  // Model to use for LLM-assisted summarization
  summarizationModel: string; // default: "deepseek/deepseek-chat"
  // Max tool result length in characters
  maxToolResultChars: number; // default: 500
  // Progressive compression thresholds
  progressiveThresholds: {
    fullSummaryTurns: number; // default: 5 (all older → summary)
    moderateTurns: number;   // default: 3 (strip details)
    lightTurns: number;      // default: 2 (caveman only)
    verbatimTurns: number;   // default: 2 (no change)
  };
}
```

## Alternatives Considered

1. **Blind truncation** (current context manager approach) — Loses critical information. A 2000-char limit on tool results can cut error messages in half.
2. **Full summarization** (all old messages → one summary) — Loses granularity. Progressive compression preserves more nuance for recent history.
3. **No tool compression** — Tool outputs are typically the largest token consumers. Ignoring them leaves 50%+ of potential savings on the table.

## Acceptance Criteria

- [ ] `open-sse/services/compression/summarizer.ts` — Rule-based history summarization
- [ ] `open-sse/services/compression/toolCompress.ts` — 5 tool compression strategies implemented
- [ ] `open-sse/services/compression/progressive.ts` — Progressive aging with configurable thresholds
- [ ] `open-sse/services/compression/aggressive.ts` — Aggressive mode orchestration combining all techniques
- [ ] Tool results compressed to ≤`maxToolResultChars` without losing error/signal information
- [ ] Progressive compression produces fading-context message arrays
- [ ] `tests/unit/compression/summarizer.test.ts` — Summarization quality tests
- [ ] `tests/unit/compression/toolCompress.test.ts` — Tool compression strategy tests
- [ ] `tests/unit/compression/progressive.test.ts` — Progressive compression tests
- [ ] Integration test: 30-message conversation compressed through aggressive pipeline
- [ ] Token savings ≥40% on tool-heavy conversations with ≤5% quality degradation
- [ ] Aggressive mode adds <50ms latency per request

## Area

- [x] Proxy / Routing
- [ ] Dashboard / UI
- [ ] Provider Support
- [ ] CLI Tools Integration
- [ ] OAuth / Authentication
- [x] Analytics / Usage Tracking

## Related Provider(s)

All providers — especially valuable for:
- **Free tier providers** (Qoder, Qwen, Gemini CLI) — maximize limited quota
- **Small context window models** — fit more conversation
- **Tool-calling models** (Claude Code, Codex) — compress tool results

## Additional Context

### Real-World Token Distribution

Based on typical OmniRoute traffic patterns:

| Content Type | % of Total Tokens | Compression Potential |
|---|---|---|
| Tool results | 40-60% | 50-80% savings |
| User messages | 15-25% | 25-40% (Caveman) |
| Assistant responses | 10-20% | 20-40% (remove thinking) |
| System prompts | 5-10% | 0-10% (preserve) |

Tool results are the **dominant compression target**. Aggressive mode that effectively compresses tool outputs will deliver the highest absolute savings.

### LLM-Assisted Summarization Cost

Using DeepSeek V3 ($0.27/1M input) to summarize 15K tokens of history:
- Input cost: ~$0.004
- Output cost (1.5K tokens): ~$0.002
- Total: ~$0.006 per summarization call
- This saves ~13K tokens on the main request (~$0.026 for Claude at $2/1M)
- **Net savings**: ~$0.020 per request — clear ROI

Using a free model (LongCat Flash Lite, Qwen3 Coder) brings summarization cost to $0.

## Expected Test Plan

- Unit tests for `summarizer.ts` — test with conversations of varying lengths
- Unit tests for `toolCompress.ts` — each strategy with real tool output samples (file contents, grep results, stack traces)
- Unit tests for `progressive.ts` — verify compression gradient across message positions
- Integration test: full aggressive pipeline on 30+ message conversation
- Performance test: latency measurement on 80K token conversations
- Golden set eval with aggressive compression enabled — ≤5% quality degradation
- All existing tests pass with aggressive mode enabled

## 💬 Community Discussion

**@kilo-code-bot** (2026-04-25T11:56:53Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/1587.

> **\[Feature\] Caveman Compression Mode — Rule-Based Prompt Compression \(Phase 2\)** (#1587)

Similarity score: 93%

*This comment was generated by Kilo Auto-Triage.*
---
**@oyi77** (2026-04-25T12:08:19Z):
**Not a duplicate of #1586.** This is Phase 3, building on Phases 1-2:

- **#1586 (Phase 1)**: Pipeline framework + Lite compression (10-15% savings, structural only)
- **#1587 (Phase 2)**: Caveman compression (25-40% savings, rule-based NLP)
- **This issue (Phase 3)**: Aggressive compression (40-60% savings) — adds history summarization, tool result compression, and progressive aging. Completely different compression techniques from Phases 1-2.

Each phase adds a new module (`summarizer.ts`, `toolCompress.ts`, `progressive.ts`) that didn't exist in earlier phases.
---
**@dhaern** (2026-04-26T06:06:06Z):
Do you make this optional no? Because many of us already use a compressor like Opencode plugins or whatever, how can be this compatible for example with https://github.com/cortexkit/opencode-magic-context??
---


### Participants

- @oyi77
- @dhaern
- @kilo-code-bot

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.

### What it solves

- TBD

### How it should work (high level)

1. TBD
2. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
