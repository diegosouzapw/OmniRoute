# Task 20 - Add Real Usage Stats and Caveman Receipts

> **Priority**: P2
> **Effort**: 120 min
> **Dependencies**: Tasks 06, 14, 22
> **Branch**: `release/v3.7.9`

---

## Problem

OmniRoute currently estimates compression tokens mostly with `chars / 4`. That is fine
for hot-path decisions, but not enough for accurate savings reports.

Upstream Caveman v1.7.0 added stats that read session JSONL and report real token
reduction. OmniRoute should distinguish estimated savings from provider usage receipts.

---

## Solution

Add real usage receipt tracking where provider responses include usage metadata.

Track:

- estimated input tokens before/after compression;
- provider-reported input tokens, output tokens, cache read/write tokens when available;
- estimated output savings for Caveman output mode when usage can be compared to a baseline;
- USD saved using OmniRoute pricing registry;
- validation fallback count;
- MCP description compression savings;
- multimodal skip count.

---

## Files

- `open-sse/services/compression/stats.ts`
- `src/lib/db/compressionAnalytics.ts`
- DB migration if schema changes are needed
- `src/app/api/analytics/compression/route.ts`
- `open-sse/mcp-server/tools/compressionTools.ts`
- Dashboard analytics components
- Tests under `tests/unit/compression/`

---

## Data Model Sketch

Add optional columns or a JSON details column:

```typescript
estimated_original_tokens
estimated_compressed_tokens
provider_input_tokens
provider_output_tokens
provider_cache_read_tokens
provider_cache_write_tokens
estimated_usd_saved
validation_fallback
mcp_description_tokens_saved
multimodal_skip_count
source: "estimated" | "provider_receipt" | "mixed"
```

Keep existing columns backward compatible.

---

## Tests

Add tests for:

- analytics summary works with old rows and new rows;
- provider receipt rows aggregate separately from estimated rows;
- USD saved calculation handles missing pricing;
- MCP status exposes estimated vs real fields clearly.

---

## Acceptance Criteria

- Reports never present estimates as exact provider usage.
- Dashboard/API can show estimated and real savings separately.
- Existing analytics tables migrate without data loss.

---

## Rollback

Drop new optional fields/migration only if no release has shipped. Otherwise keep fields
and stop writing them.
