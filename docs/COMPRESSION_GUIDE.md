# 🗜️ Prompt Compression Guide — OmniRoute

> Save 15-75% on token costs automatically. For a quick overview, see the [README Compression section](../README.md#%EF%B8%8F-prompt-compression--save-15-75-tokens-automatically).

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

---

## Token Savings Visualization

```
Without compression: 47K tokens sent to LLM
With Lite:           40K tokens sent          (15% saved — safe, always-on)
With Standard:       33K tokens sent          (30% saved — caveman-speak rules)
With Aggressive:     24K tokens sent          (50% saved — aging + summarization)
With Ultra:          12K tokens sent          (75% saved — heuristic pruning)
```

---

## Configuration

### Dashboard

Navigate to `Dashboard → Settings → Compression`:

- **Default Mode** — sets the system-wide compression mode
- **Auto-Trigger Threshold** — automatically engage compression when token count exceeds threshold
- **Per-Combo Override** — each combo can have its own compression mode

### Per-Combo Override

In `Dashboard → Combos → [Your Combo] → Advanced`, set compression mode per combo:

```txt
Combo: "free-forever"
  Mode: Standard
  Targets:
    1. gc/gemini-3-flash
    2. if/kimi-k2-thinking
```

This lets you use aggressive compression on free providers while keeping lite mode on paid subscriptions.

### API

```bash
# Get compression settings
curl http://localhost:20128/api/settings/compression

# Update compression settings
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"lite","autoTriggerThreshold":32000}'
```

---

## What Gets Protected

The compression engine **always preserves:**

- ✅ Code blocks (fenced and inline)
- ✅ URLs and file paths
- ✅ JSON structures and structured data
- ✅ API keys, tokens, and identifiers
- ✅ Mathematical expressions
- ✅ Tool/function call definitions
- ✅ System prompts (in lite mode)

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
  "latencyMs": 0.8
}
```

---

## Phase Roadmap

| Phase   | Modes                                | Status     |
| ------- | ------------------------------------ | ---------- |
| Phase 1 | Off, Lite                            | ✅ Shipped |
| Phase 2 | Standard, Aggressive, Ultra          | ✅ Shipped |
| Phase 3 | Per-model adaptive, ML-based pruning | 🗓️ Planned |

---

## Acknowledgments

Standard mode compression rules are inspired by **[Caveman](https://github.com/JuliusBrussee/caveman)** by **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — the viral "why use many token when few token do trick" project.

---

## See Also

- [Environment Config](ENVIRONMENT.md) — Compression environment variables
- [Architecture Guide](ARCHITECTURE.md) — Compression pipeline internals
- [User Guide](USER_GUIDE.md) — Getting started with compression
