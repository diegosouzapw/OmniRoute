# Feature: [Feature] Ultra Compression — LLMLingua-Style Token Pruning (Phase 4)

> GitHub Issue: #1589 — opened by @oyi77 on 2026-04-25T11:57:32Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem / Use Case

Phases 1-3 (#1586, #1587, #1588) deliver 10-60% token savings through structural, linguistic, and history-based compression. This issue covers **Phase 4**: the optionally-enabled "Ultra" mode that can achieve 60-80% savings using perplexity-based token pruning, inspired by Microsoft's LLMLingua research.

**Use cases for Ultra mode:**
- **Extreme quota constraints**: Users on free tiers who need to squeeze every possible token from their allowance
- **Small context window models**: Fitting complex conversations into 8K-32K context windows
- **Batch processing**: Non-interactive workloads where latency is acceptable but token cost must be minimized
- **Emergency compression**: When aggressive mode isn't enough to fit a critically long conversation

**Why optional**: Ultra mode adds 100-500ms latency and requires either a local SLM (500MB-2GB memory) or an API call to a compression model. This is only justified when the token savings outweigh the latency and compute cost.

## Proposed Solution

### Two Implementation Tiers

**Tier A: Character-Level Information Density Scoring (no SLM required)**

A lightweight approximation of perplexity-based pruning that doesn't require loading a model:

| Heuristic | What It Measures | Example |
|---|---|---|
| **Token frequency** | Common words ("the", "a", "is") = low information → removable | "the" → remove |
| **Character entropy** | Low per-character entropy = redundant | "aaaaaaaa" = low entropy |
| **Capitalization patterns** | ALL CAPS = emphasis/high info, mixed = potentially removable | "ERROR" = keep, "maybe" = candidate |
| **Punctuation density** | High punctuation = structured/technical = keep | Code blocks, JSON |
| **Numeric content** | Numbers, versions, IDs = high information = keep | "v3.2.1" = keep |
| **Length penalty** | Very long words = likely technical terms = keep | "authentication" = keep |

This approach can achieve ~40-60% compression with <10ms overhead. It's an approximation of true perplexity scoring but sufficient for most use cases.

**Tier B: Local SLM Perplexity Scoring (true LLMLingua)**

Load a small language model (Qwen3-0.6B, Phi-2, or similar) to calculate actual perplexity for each token, then remove low-perplexity tokens:

1. **Tokenize** the prompt using the SLM's tokenizer
2. **Calculate perplexity** for each token given its context
3. **Rank tokens** by perplexity (high perplexity = surprising = important)
4. **Remove lowest-ranked tokens** until budget is met
5. **Force-preserve** critical tokens (numbers, code, special characters, URLs)

Based on LLMLingua-2 research: **up to 20x compression** with <2% quality loss on classification tasks, and **6x compression** with 17% quality improvement on RAG tasks.

### Module: Ultra Compression (`open-sse/services/compression/ultra.ts`)

```typescript
interface UltraConfig {
  enabled: boolean;
  // Tier: "heuristic" (no SLM) or "slm" (local model)
  tier: "heuristic" | "slm";
  // Compression rate: 0.2 = keep 20% of tokens (5x compression)
  compressionRate: number; // default: 0.5 (2x compression)
  // SLM configuration (Tier B only)
  slm: {
    modelPath?: string;  // Local path to GGUF/ONNX model
    modelUrl?: string;   // URL to download model
    maxMemoryMB: number; // Maximum memory for SLM (default: 1024)
    useGPU: boolean;     // GPU acceleration (default: false)
    batchSize: number;   // Processing batch size (default: 400)
  };
  // Force tokens that must be preserved
  forceTokens: string[]; // default: ["\n", "?", "!", ".", ":", ";", "+", "-", "*", "/", "="]
  // Fallback mode when SLM is unavailable
  fallbackMode: "standard" | "aggressive"; // default: "aggressive"
}
```

### Implementation Path

1. **Phase 4A**: Implement heuristic-based information density scoring (Tier A)
2. **Phase 4B**: Integrate with ONNX Runtime or similar for local SLM inference (Tier B)
3. **Phase 4C**: Batch processing mode — queue requests for ultra compression during low-traffic periods

### Heuristic Scoring Algorithm (Tier A)

```typescript
function scoreToken(token: string, context: string): number {
  let score = 0;
  
  // 1. Frequency score — common words score low
  const commonWords = new Set(["the", "a", "an", "is", "are", "was", ...]);
  if (commonWords.has(token.toLowerCase())) score -= 3;
  
  // 2. Information density — technical/numeric tokens score high
  if (/\d/.test(token)) score += 5;          // Contains numbers
  if (/[A-Z]{2,}/.test(token)) score += 4;   // ALL CAPS (acronyms, error codes)
  if (token.length > 12) score += 3;          // Long word (likely technical)
  if (/^[$_]/.test(token)) score += 5;        // Variable-like
  
  // 3. Punctuation — structural markers score high
  if (/[:;={}[\]()]/.test(token)) score += 4;
  if (/[.!?]/.test(token)) score += 2;
  
  // 4. Position score — first/last tokens in sentence score higher
  // (beginning = topic, end = conclusion/keyword)
  
  return score;
}
```

## Alternatives Considered

1. **API-based SLM** (call an external perplexity API) — Adds network latency (100-500ms). Defeats the purpose of fast proxy-layer compression. Rejected.
2. **Python LLMLingua server** (sidecar process) — Adds operational complexity (separate process, Python dependency). Could be a future option if demand exists.
3. **No Ultra mode** — Some users (especially on free tiers with extreme quota limits) need maximum compression. Ultra mode serves them.

## Acceptance Criteria

- [ ] `open-sse/services/compression/ultra.ts` — Ultra compression orchestrator with tier selection
- [ ] `open-sse/services/compression/ultraHeuristic.ts` — Heuristic information density scorer (Tier A)
- [ ] Heuristic scorer produces token-level scores with <10ms per 1K tokens
- [ ] Heuristic compression achieves ≥40% token savings with ≤5% quality degradation on golden set
- [ ] Force tokens are always preserved (numbers, code syntax, URLs)
- [ ] Fallback to aggressive mode when SLM is unavailable
- [ ] `tests/unit/compression/ultraHeuristic.test.ts` — Scoring accuracy tests
- [ ] Ultra mode is **disabled by default** in compression config
- [ ] When enabled, ultra mode can be selected per-combo or per-provider
- [ ] Memory usage of SLM (Tier B) stays within configured `maxMemoryMB`
- [ ] SLM-based compression adds <500ms latency per request

## Area

- [x] Proxy / Routing
- [ ] Dashboard / UI
- [ ] Provider Support
- [ ] CLI Tools Integration
- [ ] OAuth / Authentication
- [ ] Analytics / Usage Tracking

## Related Provider(s)

All providers — but most valuable for:
- **Free tier** (maximize quota)
- **Small context windows** (8K-32K models)
- **Batch workloads** (latency-tolerant, cost-sensitive)

## Additional Context

### LLMLingua Research Benchmarks

| Method | Paper | Compression | Speed | Quality Impact |
|---|---|---|---|---|
| LLMLingua | EMNLP 2023 | Up to 20x | Baseline | <2% drop |
| LongLLMLingua | ACL 2024 | 4x | Baseline | +17.1% improvement |
| LLMLingua-2 | ACL 2024 Findings | Up to 20x | 3-6x faster | Improved OOD handling |

### Real-World Example (from or-cli implementation)

```
Original Tokens: 28,275
Compressed Tokens: 16,183 (LLMLingua-2, rate 0.5)
Compression Rate: 1.7x
Savings: 42.8%
```

### Resource Requirements

| Tier | Memory | Latency | GPU Required | Model Size |
|---|---|---|---|---|
| Heuristic (Tier A) | ~10MB | <10ms | No | N/A |
| SLM Qwen3-0.6B | ~500MB | 100-300ms | Optional | ~600MB |
| SLM Phi-2 | ~2GB | 200-500ms | Recommended | ~1.8GB |

## Expected Test Plan

- Unit tests for heuristic scorer — token scoring accuracy
- Unit tests for force token preservation
- Integration test: heuristic compression on sample prompts
- Benchmark: compression ratio vs quality degradation at different rates
- Memory test: SLM loading/unloading without leaks
- Performance: latency measurement at different token counts
- Golden set eval with ultra compression enabled
- Fallback test: ultra → aggressive fallback when SLM unavailable

## 💬 Community Discussion

**@kilo-code-bot** (2026-04-25T11:57:37Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/1586.

> **\[Feature\] Modular Prompt Compression Pipeline — Foundation \(Phase 1\)** (#1586)

Similarity score: 91%

*This comment was generated by Kilo Auto-Triage.*
---
**@oyi77** (2026-04-25T12:08:21Z):
**Not a duplicate of #1586.** This is Phase 4, the optionally-enabled Ultra mode:

- **#1586 (Phase 1)**: Lite compression (structural, 10-15% savings, <1ms)
- **This issue (Phase 4)**: Ultra compression (LLMLingua-style token pruning, 60-80% savings, 100-500ms) — completely different algorithm (perplexity-based scoring, optional local SLM). Disabled by default, opt-in only.
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
