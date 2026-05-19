# Feature: [Feature] Caveman Compression Mode — Rule-Based Prompt Compression (Phase 2)

> GitHub Issue: #1587 — opened by @oyi77 on 2026-04-25T11:54:00Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem / Use Case

Phase 1 (#1586) establishes the compression pipeline framework and Lite mode (10-15% savings via structural optimizations). This issue covers **Phase 2**: the flagship "Caveman Mode" that delivers 25-40% token savings through rule-based natural language compression — without any LLM assistance and with <5ms overhead.

**The core insight**: LLMs don't need grammatically complete sentences. They need *semantic content*. "Caveman mode" strips language to its essential information carriers, removing filler, hedging, politeness, and redundancy while preserving all meaning-carrying tokens.

**Example:**

```
BEFORE (147 tokens):
"Please analyze the following code snippet and provide a detailed explanation 
of what the function does. I need to understand the control flow, error handling 
patterns, and any potential edge cases that might cause issues. The function 
appears to be handling user authentication and I want to make sure I understand 
all the security implications before I modify it."

AFTER — Caveman (58 tokens, ~60% reduction):
"Analyze code snippet. Explain: control flow, error handling, edge cases. 
Function handles user auth. Need security implications before modifying."
```

This is the feature that makes OmniRoute's compression **visibly impactful** — users will see significantly shorter prompts and lower token counts in their usage stats.

## Proposed Solution

### Caveman Compression Rules Engine (`open-sse/services/compression/caveman.ts`)

A rule-based NLP pipeline that applies deterministic transformations to message content. No LLM calls, no external dependencies, <5ms per request.

#### Rule Categories

**1. Filler Removal (biggest wins)**
- Remove polite framing: "please", "could you", "would you", "can you", "I would like", "I want you to"
- Remove hedging: "it seems like", "it appears that", "I think that", "I believe that", "probably", "possibly", "maybe"
- Remove verbose instructions: "provide a detailed" → "provide", "give me a comprehensive" → "give", "write an in-depth" → "write"

**2. Context Condensation**
- Collapse compound instructions: "control flow, error handling patterns, and any potential edge cases" → "control flow, error handling, edge cases"
- Remove explanatory prefixes: "The function appears to be handling" → "Function:"
- Convert questions to directives where appropriate: "Can you explain why..." → "Explain why..."

**3. Structural Compression**
- Replace verbose conjunctions: ", and also " → ", "
- Shorten purpose phrases: "in order to" → "to", "for the purpose of" → "for"
- Collapse redundant quantifiers: "each and every" → "each", "any and all" → "all"

**4. Multi-Turn Dedup**
- Replace repeated context: "As we discussed earlier" → "See above"
- Remove re-established context that hasn't changed between turns

**5. Preservation Rules (critical for quality)**
- **Never compress**: Code blocks (````...```), URLs, file paths, variable names, error messages, numbers, technical terms
- **Never compress**: System prompts (configurable via `preserveSystemPrompt`)
- **Never compress**: Messages marked with special preservation flags
- **Lighter touch on**: User messages vs assistant messages (users are more verbose, assistants are already concise)

#### Implementation

```typescript
interface CavemanRule {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, groups: Record<string, string>) => string);
  context: "all" | "user" | "system" | "assistant";
  preservePatterns?: RegExp[]; // Skip compression if these patterns are found nearby
}

const CAVEMAN_RULES: CavemanRule[] = [
  // Filler removal
  { name: "polite_framing", pattern: /\b(please|kindly|could you|would you|can you|i would like|i want you to|i need you to)\b/gi, replacement: "", context: "user" },
  { name: "hedging", pattern: /\b(it seems like|it appears that|i think that|i believe that|probably|possibly|maybe)\b/gi, replacement: "", context: "all" },
  { name: "verbose_instructions", pattern: /\b(provide a detailed|give me a comprehensive|write an in-depth|create a thorough)\b/gi, replacement: (m) => m.split(" ")[0], context: "all" },
  // Structural compression
  { name: "list_conjunction", pattern: /,?\s+and\s+/g, replacement: ", ", context: "all" },
  { name: "explanation_of_purpose", pattern: /\bin order to\b/gi, replacement: "to", context: "all" },
  // Multi-turn dedup
  { name: "repeated_context", pattern: /As (?:we |I )?discussed(?: earlier| previously)?/gi, replacement: "See above", context: "user" },
];

export function cavemanCompress(
  body: ChatRequestBody, 
  options: CavemanConfig
): CompressionResult {
  // 1. Extract code blocks and preserve them
  // 2. Apply rules in priority order based on message role
  // 3. Restore preserved code blocks
  // 4. Clean up artifacts (double spaces, empty lines)
  // 5. Compute stats (original vs compressed tokens)
}
```

### Caveman Rule Set (`open-sse/services/compression/cavemanRules.ts`)

Separate file for the rule definitions — makes it easy to add/remove/tune rules without touching the engine.

Target: **30+ rules** covering the most common verbosity patterns in coding-related prompts.

### Per-Combo Override in Dashboard

Add compression mode selection to the combo builder UI:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-7     → Compression: off (premium, prompt caching)
  2. glm/glm-4.7           → Compression: caveman (cost-sensitive)
  3. if/kimi-k2-thinking    → Compression: aggressive (free tier)
```

### Configuration Schema

```typescript
interface CavemanConfig {
  enabled: boolean;
  // Which message roles to compress
  compressRoles: ("user" | "assistant" | "system")[];
  // Rules to skip (by name)
  skipRules: string[];
  // Minimum message length to compress (skip short messages)
  minMessageLength: number; // default: 50 chars
  // Preserve patterns (regex) — never compress text matching these
  preservePatterns: string[];
}
```

## Alternatives Considered

1. **LLM-based compression** (send to cheap model to summarize) — Adds 1-5s latency, costs tokens, unreliable quality. Kept for "Ultra" mode only.
2. **LLMLingua-style perplexity pruning** — Requires local SLM, adds GPU/CPU memory requirement. Too heavy for Phase 2. Planned for Phase 4.
3. **Simple truncation** — Current context manager approach. Loses information. Caveman preserves semantics while reducing verbosity.

## Acceptance Criteria

- [ ] `open-sse/services/compression/caveman.ts` — Caveman compression engine with rule application pipeline
- [ ] `open-sse/services/compression/cavemanRules.ts` — 30+ compression rules covering common verbosity patterns
- [ ] Code block preservation — content inside ``` blocks is never modified
- [ ] URL, path, and number preservation — these are never compressed
- [ ] Role-aware compression — user messages get full treatment, system messages are lighter touch (configurable)
- [ ] `tests/unit/compression/caveman.test.ts` — Unit tests for each rule category + integration test for full pipeline
- [ ] Token savings verification — automated test that verifies ≥20% token reduction on a sample of verbose prompts
- [ ] Quality verification — compressed prompts produce equivalent responses on golden set eval (≤2% quality drop)
- [ ] Performance — caveman compression adds <5ms per request on messages up to 10K tokens
- [ ] Integration with strategy selector — caveman mode selected when `defaultMode: "standard"` in config
- [ ] Per-combo override — compression mode field in combo config UI

## Area

- [x] Proxy / Routing
- [x] Dashboard / UI
- [ ] Provider Support
- [ ] CLI Tools Integration
- [ ] OAuth / Authentication
- [ ] Analytics / Usage Tracking

## Related Provider(s)

All providers — caveman mode is format-agnostic and works across all LLM APIs.

## Additional Context

### Why "Caveman Mode" Works

Research shows LLMs process tokens by *semantic content*, not grammatical completeness. A prompt like "Explain function auth flow, edge cases, security implications" produces nearly identical results to "Please provide a detailed explanation of the authentication function's control flow, including any edge cases and security implications you identify." The difference is 60% fewer tokens.

Microsoft's LLMLingua research (EMNLP 2023, ACL 2024) demonstrated that removing up to 60% of tokens from prompts had minimal impact on response quality. Caveman mode achieves similar savings through simpler, faster, deterministic rules rather than perplexity-based pruning.

### Expected Impact by Provider

| Provider Context Window | Recommended Mode | Expected Savings | Impact |
|---|---|---|---|
| 128K (GPT-4, Claude) | Caveman | 25-40% | Cost savings on every request |
| 32K (smaller models) | Caveman | 25-40% | Fits more conversation in smaller window |
| 8K (legacy models) | Aggressive | 40-60% | Critical for fitting long conversations |
| Free tier (rate-limited) | Aggressive | 40-60% | Doubles effective quota |

## Expected Test Plan

- Unit tests per rule category (filler, hedging, structural, dedup)
- Integration test: full pipeline with real prompt samples
- Golden set eval: compare response quality with/without caveman
- Performance benchmark: latency impact measurement
- Regression: all existing tests pass

## 💬 Community Discussion

**@kilo-code-bot** (2026-04-25T11:54:06Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/1586.

> **\[Feature\] Modular Prompt Compression Pipeline — Foundation \(Phase 1\)** (#1586)

Similarity score: 93%

*This comment was generated by Kilo Auto-Triage.*
---
**@oyi77** (2026-04-25T12:08:04Z):
**Not a duplicate of #1586.** This is Phase 2 of the same proposal, not a duplicate:

- **#1586 (Phase 1)**: Pipeline framework, strategy selector, and **Lite** compression (structural only: whitespace, dedup, image placeholder). Delivers 10-15% savings.
- **This issue (Phase 2)**: **Caveman** compression mode — rule-based NLP compression (filler removal, hedging stripping, instruction condensation). Delivers 25-40% savings. Requires Phase 1's pipeline but is a completely different compression engine.

Each phase is a separate module (`lite.ts` vs `caveman.ts`) with distinct implementation, tests, and acceptance criteria. They're designed to be implemented incrementally.
---


### Participants

- @oyi77
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
