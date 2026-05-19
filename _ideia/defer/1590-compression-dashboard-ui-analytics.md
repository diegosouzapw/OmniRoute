# Feature: [Feature] Compression Dashboard UI & Analytics

> GitHub Issue: #1590 — opened by @oyi77 on 2026-04-25T11:57:53Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem / Use Case

The compression pipeline (Phases 1-4: #1586, #1587, #1588, #1589) provides powerful token-saving capabilities, but users need visibility into:

1. **How much they're saving** — "Am I actually spending fewer tokens with compression on?"
2. **What mode to choose** — "Should I use Lite, Caveman, or Aggressive for my use case?"
3. **Quality trade-offs** — "Is compression hurting my response quality?"
4. **Per-combo configuration** — "I want premium combos uncompressed and free-tier combos aggressively compressed."

Without a UI, compression is an invisible feature. Users won't trust what they can't see.

## Proposed Solution

### 1. Compression Settings Page (`/dashboard/compression`)

A dedicated settings page for managing compression:

| Section | Controls |
|---|---|
| **Global Toggle** | Enable/disable compression entirely |
| **Default Mode** | Dropdown: Off / Lite / Caveman / Aggressive / Ultra |
| **Auto-Trigger Threshold** | Slider: only compress when estimated tokens > N |
| **System Prompt Preservation** | Toggle: never compress system prompts |
| **Provider-Aware Caching** | Toggle: skip compression for providers with prompt caching |
| **Cache Duration** | Input: cache compressed results for N minutes |

### 2. Per-Combo Compression Override

In the combo builder, add a compression mode selector per combo target:

```
Combo: "my-coding-stack"
  ┌──────────────────────────────────────────────────┐
  │ 1. cc/claude-opus-4-7                              │
  │    Compression: [Off ▼] (premium — prompt caching) │
  │                                                      │
  │ 2. glm/glm-4.7                                      │
  │    Compression: [Caveman ▼] (cost-sensitive)        │
  │                                                      │
  │ 3. if/kimi-k2-thinking                              │
  │    Compression: [Aggressive ▼] (free tier — max)    │
  └──────────────────────────────────────────────────┘
```

This enables **smart cost optimization**: premium providers get uncompressed prompts (they cache them), while cheap/free providers get compressed prompts (saves quota).

### 3. Compression Analytics Dashboard

Add a **Compression** tab to the existing Analytics page:

| Widget | Data |
|---|---|
| **Savings Over Time** | Line chart: tokens saved per day/week (stacked by mode) |
| **Mode Distribution** | Pie chart: % of requests per compression mode |
| **Cumulative Savings** | Counter: total tokens saved since enabling compression |
| **Cost Savings Estimate** | Counter: estimated $ saved based on provider pricing |
| **Quality Score** | Chart: golden set eval scores with/without compression |
| **Per-Provider Breakdown** | Table: savings per provider (which providers benefit most) |
| **Latency Impact** | Chart: compression latency histogram |

### 4. Log-Level Compression Stats

In the existing request log detail modal, add compression info:

```
┌─────────────────────────────────────┐
│ Request Details                      │
│ ─────────────────────────────        │
│ Compression: Caveman                 │
│ Original Tokens: 4,230              │
│ Compressed Tokens: 2,890            │
│ Saved: 1,340 (31.7%)               │
│ Latency: 3.2ms                      │
│ Est. Cost Saved: $0.0027            │
│ Techniques: filler_removal,         │
│   hedging_removal, structural_compress│
└─────────────────────────────────────┘
```

### 5. Compression Preview (Playground)

Add a "Compression Preview" mode in the existing Translator Playground:

1. User enters a prompt
2. Selects compression mode
3. Sees side-by-side: original vs compressed
4. Sees token count comparison
5. Can send the compressed prompt to any provider to verify quality

## Alternatives Considered

1. **CLI-only configuration** (env vars + settings API) — No visibility. Users can't discover or understand compression benefits. Insufficient.
2. **No per-combo override** — All-or-nothing compression is wasteful. Premium providers with prompt caching shouldn't have their prompts compressed (it breaks caching).
3. **Separate analytics dashboard** — Fragmented UX. Better to integrate into existing analytics page.

## Acceptance Criteria

- [ ] `/dashboard/compression` — Compression settings page with all controls listed above
- [ ] Combo builder — Compression mode dropdown per combo target
- [ ] Analytics tab — Compression savings chart + cumulative counter + per-provider table
- [ ] Request log — Compression stats in detail modal (tokens saved, mode, techniques, latency)
- [ ] Playground — Compression preview mode with side-by-side comparison
- [ ] Settings API — All compression settings CRUD via `/api/v1/settings/compression`
- [ ] Compression analytics API — `/api/v1/analytics/compression` endpoint
- [ ] i18n — All compression UI strings in 30 languages
- [ ] Responsive — Compression dashboard works on mobile

## Area

- [ ] Proxy / Routing
- [x] Dashboard / UI
- [ ] Provider Support
- [ ] CLI Tools Integration
- [ ] OAuth / Authentication
- [x] Analytics / Usage Tracking

## Related Provider(s)

All providers — the UI helps users optimize compression per-provider.

## Additional Context

### Design Considerations

- The compression savings counter should be **prominent and satisfying** — seeing "You've saved 1.2M tokens" reinforces the feature's value
- Per-combo compression is the **key differentiator** — no other proxy does this
- The preview mode helps users **trust** compression before enabling it system-wide

### Data Flow

```
Request → Compression Pipeline → Stats (original, compressed, mode, techniques) 
                                                │
                                    ┌──────────┴──────────┐
                                    │                      │
                              Detailed logs           Compression
                              (per-request)           analytics table
                                    │                      │
                              Log detail modal        Analytics dashboard
```

### Compression Analytics Table Schema

```sql
CREATE TABLE IF NOT EXISTS compression_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id TEXT,
  combo_id TEXT,
  provider TEXT,
  model TEXT,
  compression_mode TEXT,         -- lite/standard/aggressive/ultra
  original_tokens INTEGER,
  compressed_tokens INTEGER,
  tokens_saved INTEGER,
  savings_percent REAL,
  techniques_used TEXT,          -- JSON array of technique names
  compression_latency_ms REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Expected Test Plan

- E2E test: navigate to compression settings, change mode, verify API update
- E2E test: add per-combo override, verify combo config updated
- Unit test: compression analytics API returns correct aggregates
- Unit test: compression stats in detailed log schema
- Visual test: analytics charts render with compression data
- i18n test: all compression UI keys translated

## 💬 Community Discussion

**@kilo-code-bot** (2026-04-25T11:57:57Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/1586.

> **\[Feature\] Modular Prompt Compression Pipeline — Foundation \(Phase 1\)** (#1586)

Similarity score: 91%

*This comment was generated by Kilo Auto-Triage.*
---
**@oyi77** (2026-04-25T12:08:22Z):
**Not a duplicate of #1586.** This is the cross-cutting UI/Analytics issue for the compression feature:

- **#1586 (Phase 1)**: Backend compression pipeline + API
- **This issue**: Dashboard UI, analytics charts, per-combo configuration UI, compression preview playground. Entirely a frontend + analytics concern, not a compression engine.
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
