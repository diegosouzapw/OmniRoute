# Feature: [Feature] MCP Compression Tools & Provider-Aware Caching Integration

> GitHub Issue: #1591 — opened by @oyi77 on 2026-04-25T11:58:23Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem / Use Case

The compression pipeline (Phases 1-4: #1586, #1587, #1588, #1589) is a proxy-layer optimization. Two gaps remain:

1. **No programmatic control** — MCP clients (IDEs, agents, scripts) cannot query or configure compression at runtime. They need MCP tools to check savings and adjust modes.
2. **Provider-side prompt caching conflict** — Anthropic, OpenAI, and Google offer prompt caching where repeated identical prompts cost significantly less. If OmniRoute compresses a cached prompt differently each time, it **breaks the cache** and increases costs instead of saving them. The compression pipeline must be aware of provider-side caching.

**Concrete problem**: A user has Anthropic prompt caching enabled. OmniRoute compresses the system prompt slightly differently each request (due to varying user content). Anthropic's cache never hits. Result: **higher costs than if compression was disabled**.

## Proposed Solution

### 1. MCP Compression Tools (2 new tools)

Add to the existing MCP server (`open-sse/mcp-server/`):

#### Tool: `compression_status`

Query compression statistics and current configuration.

```typescript
{
  name: "compression_status",
  description: "Get compression savings statistics and current configuration. Shows tokens saved, mode distribution, and per-provider breakdowns.",
  inputSchema: z.object({
    timeRange: z.enum(["1h", "24h", "7d", "30d"]).default("24h"),
    provider: z.string().optional(),  // Filter by provider
    combo: z.string().optional(),    // Filter by combo
  }),
  handler: async (args) => {
    // Query compression_analytics table
    // Return: totalSaved, mode, savingsPercent, costSaved, latencyImpact
  }
}
```

**Example output:**
```json
{
  "enabled": true,
  "defaultMode": "standard",
  "last24h": {
    "totalRequests": 472,
    "totalTokensSaved": 38420,
    "avgSavingsPercent": 27.3,
    "estimatedCostSaved": "$0.077",
    "modeDistribution": { "lite": "8%", "standard": "72%", "aggressive": "20%" },
    "avgLatencyMs": 2.8
  }
}
```

#### Tool: `compression_configure`

Change compression settings at runtime.

```typescript
{
  name: "compression_configure",
  description: "Configure compression mode and settings. Changes take effect immediately for new requests.",
  inputSchema: z.object({
    enabled: z.boolean().optional(),
    defaultMode: z.enum(["off", "lite", "standard", "aggressive"]).optional(),
    autoTriggerTokens: z.number().optional(),
    preserveSystemPrompt: z.boolean().optional(),
    comboOverrides: z.record(z.string(), z.enum(["off", "lite", "standard", "aggressive"])).optional(),
  }),
  handler: async (args) => {
    // Update compression config in DB
    // Return: updated config
  }
}
```

**Scope requirement**: Both tools require a new MCP scope: `compression` (read + write).

### 2. Provider-Aware Caching Integration (`open-sse/services/compression/cachingAware.ts`)

Detect when provider-side prompt caching is active and **skip or reduce compression** to preserve cache hits.

#### Caching Detection Rules

| Provider | Caching Mechanism | Detection |
|---|---|---|
| **Anthropic** | Prompt caching via `cache_control` markers | Check if `cache_control` is present in request; check if provider supports caching |
| **OpenAI** | Automatic prompt caching (GPT-4o, GPT-4.5) | Always active for supported models — detect by model name |
| **Google Gemini** | Context caching API | Detect via explicit cached context references |

#### Strategy: Cache-Preserving Compression

When provider caching is active:

1. **System prompt**: **Never compress** (system prompts are the most commonly cached component)
2. **Static context** (system + early messages): Use **deterministic compression** — same input always produces same output, so cache still hits
3. **Dynamic messages** (recent user/assistant): Apply compression normally (these aren't cached)

```typescript
interface CachingAwareConfig {
  enabled: boolean;
  // Providers with known prompt caching
  cachedProviders: string[];  // default: ["anthropic", "openai"]
  // Whether to skip system prompt compression for cached providers
  preserveSystemForCached: boolean;  // default: true
  // Whether to use deterministic compression for static context
  deterministicStatic: boolean;  // default: true
}

export function shouldSkipCompression(
  provider: string, 
  body: ChatRequestBody,
  compressionMode: CompressionMode,
  config: CachingAwareConfig
): { skip: boolean; reason: string; adjustedMode: CompressionMode } {
  // 1. Check if provider has prompt caching
  // 2. Check if request has cache_control markers
  // 3. If caching active: preserve system, use deterministic for static, normal for dynamic
  // 4. Return adjusted mode (possibly downgraded from "aggressive" to "lite")
}
```

#### Deterministic Compression Guarantee

For cache-preserving compression, the output must be **deterministic** given the same input. This means:
- No random elements in compression
- No timestamp- or session-dependent compression
- Same input text → same compressed output

The Caveman rules engine is inherently deterministic (regex-based), making it suitable for cache-preserving compression. Aggressive mode's summarization is NOT deterministic (it can vary) and should be skipped for cached prefixes.

### 3. Cache Hit Rate Analytics

Track cache hit rates with and without compression to validate the strategy:

```sql
CREATE TABLE IF NOT EXISTS compression_cache_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT,
  model TEXT,
  compression_mode TEXT,
  cache_control_present BOOLEAN,
  estimated_cache_hit BOOLEAN,  -- based on response headers
  tokens_saved_compression INTEGER,
  tokens_saved_caching INTEGER,
  net_savings INTEGER,          -- compression savings - caching cost
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**This is crucial**: We need to prove that compression + caching = positive net savings, not negative.

## Alternatives Considered

1. **Always compress, ignore caching** — Would break prompt caching for Anthropic/OpenAI, increasing costs. Rejected.
2. **Never compress when caching detected** — Too conservative. Static context can benefit from deterministic compression that still preserves cache. Middle ground needed.
3. **Let users manually configure** — Too complex. Users shouldn't need to understand the interaction between compression and caching. Auto-detection is required.

## Acceptance Criteria

- [ ] `compression_status` MCP tool — Returns savings stats with time range / provider / combo filters
- [ ] `compression_configure` MCP tool — Runtime compression config changes
- [ ] New MCP scope `compression` added to scope registry (10 → 11 scopes)
- [ ] MCP audit entries for compression tool invocations
- [ ] `open-sse/services/compression/cachingAware.ts` — Provider caching detection
- [ ] System prompts never compressed for Anthropic/OpenAI when caching is active
- [ ] Deterministic compression for static context on cached providers
- [ ] Cache hit rate tracking in `compression_cache_stats` table
- [ ] When compression would reduce cache savings, strategy selector downgrades mode
- [ ] Unit tests for cache-aware compression logic
- [ ] Integration test: compression + Anthropic-style `cache_control` request
- [ ] Net savings tracking: prove compression + caching > either alone

## Area

- [x] Proxy / Routing
- [ ] Dashboard / UI
- [ ] Provider Support
- [x] CLI Tools Integration
- [ ] OAuth / Authentication
- [x] Analytics / Usage Tracking

## Related Provider(s)

- **Anthropic** — Prompt caching (cache_control markers)
- **OpenAI** — Automatic prompt caching (GPT-4o, GPT-4.5)
- **Google Gemini** — Context caching API
- All other providers — no caching, full compression applies

## Additional Context

### Anthropic Prompt Caching Economics

- Cached input: **$0.50/1M tokens** (10x cheaper than $3.00/1M standard)
- A 10K token system prompt cached vs uncached: $0.005 vs $0.03 — **6x savings from caching alone**
- If compression breaks the cache (even at 30% token savings): $0.021 vs $0.005 — **4x more expensive than caching**
- **Lesson**: For cached contexts, preserving the cache is more valuable than compressing tokens

### OpenAI Prompt Caching

- Automatic for prompts with repeated prefixes
- Discount: **50% savings** on cached prompt tokens
- Compression that changes the prefix (even slightly) breaks the cache

### Interaction Diagram

```
Request arrives
  │
  ├── Provider has caching? ──── No ──→ Full compression (any mode)
  │
  └── Yes
       │
       ├── cache_control in request? ──── No ──→ Full compression
       │                                              (provider may cache anyway)
       └── Yes
            │
            ├── System prompt ──→ NO compression (preserve cache key)
            ├── Static messages ──→ Deterministic Caveman only
            └── Dynamic messages ──→ Normal compression (not cached)
```

## Expected Test Plan

- Unit tests for `compression_status` MCP tool handler
- Unit tests for `compression_configure` MCP tool handler
- Unit tests for `cachingAware.ts` — all provider + caching state combinations
- Unit test: deterministic compression produces identical output for identical input
- Integration test: MCP tool invocation via stdio transport
- Integration test: compression + Anthropic request with `cache_control`
- Integration test: cache hit rate tracking
- Regression: existing MCP tools unaffected by new scope

## 💬 Community Discussion

**@kilo-code-bot** (2026-04-25T11:58:29Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/813.

> **\[Feature\] Prompt Caching & Provider-Specific Caching Support** (#813)

Similarity score: 93%

*This comment was generated by Kilo Auto-Triage.*
---
**@oyi77** (2026-04-25T12:08:24Z):
**Not a duplicate of #813.** These are complementary but distinct:

- **#813 (Prompt Caching)**: Uses *provider-side* caching mechanisms (Anthropic `cache_control`, Gemini `cachedContent`, OpenAI `prompt_cache_key`) to save costs on repeated identical prefixes. No token reduction — same prompt, cheaper because provider reuses KV cache.

- **This issue (MCP Compression Tools + Caching Integration)**: Two parts:
  1. MCP tools for programmatic compression control (`compression_status`, `compression_configure`)
  2. Provider-aware compression that **preserves caching** — when a provider has prompt caching active, compression is adjusted to avoid breaking cache hits (deterministic compression for static context, skip system prompts)

Far from being a duplicate, this issue specifically **builds on** #813's work by ensuring our compression pipeline doesn't conflict with the caching layer #813 introduces.
---
**@dmpost** (2026-04-28T11:32:00Z):
Does that mean we should better disable OmniRoute caching until the issue fixed?
Or have only one of them enabled, agent cache or OmniRoute cache?
---


### Participants

- @oyi77
- @dmpost
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
