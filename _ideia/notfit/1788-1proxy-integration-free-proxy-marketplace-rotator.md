# Feature: [Feature] 1proxy Integration - Free Proxy Marketplace & Rotator

> GitHub Issue: #1788 — opened by @oyi77 on 2026-04-29T19:04:21Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

# Feature Request: 1proxy Integration - Free Proxy Marketplace & Rotator

## Summary

Add integration with [1proxy](https://oyi77.is-a.dev/1proxy) - a community-driven free proxy aggregation platform - to provide free proxy fetching, validation, and auto-rotation capabilities in OmniRoute.

## Motivation

### Current Problem
OmniRoute users currently need to manually configure proxies or use external tools. There's no built-in source for free, validated proxies that can be used for:
- Bypassing regional restrictions
- Increasing request diversity
- Fallback when paid proxies fail

### Solution
Integrate 1proxy as a "Free Proxy Source" provider that:
1. Fetches free proxies from 1proxy's validated proxy list
2. Provides quality-based proxy selection (0-100 score)
3. Enables auto-rotation when proxies fail
4. Adds filtering by protocol, country, anonymity level

## Detailed Design

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     OmniRoute                                │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │   Proxy     │    │   1proxy    │    │    Dashboard    │  │
│  │  Registry   │◄──►│   Sync      │◄──►│      UI         │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│         ▲                  │                                  │
│         │           ┌──────┴──────┐                          │
│         │           │  Rotator     │                          │
│         │           │   Logic     │                          │
│         └───────────┴─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
           ┌────────────────────────┐
           │   1proxy API            │
           │ (1proxy-api.aitradepulse │
           │        .com)             │
           └────────────────────────┘
```

### Components

1. **Data Module** (`src/lib/db/oneproxy.ts`)
   - Store 1proxy-sourced proxies separately from manually configured ones
   - Fields: ip, port, protocol, country, anonymity, quality_score, last_validated, status

2. **Sync Service** (`src/lib/oneproxySync.ts`)
   - Periodic sync from 1proxy API (configurable interval)
   - Cache last successful fetch for offline resilience
   - Circuit breaker on API failures

3. **Rotator Logic** (`src/lib/oneproxyRotator.ts`)
   - Strategies: random, quality-based, sequential
   - Auto-skip failed proxies
   - Retry with new proxy on failure

4. **API Routes** (`src/app/api/settings/oneproxy/route.ts`)
   - `GET /api/settings/oneproxy/proxies` - List synced proxies
   - `POST /api/settings/oneproxy/sync` - Trigger manual sync
   - `POST /api/settings/oneproxy/rotate` - Get next proxy
   - `DELETE /api/settings/oneproxy/proxies/:id` - Remove proxy

5. **Dashboard UI**
   - New "1proxy" tab in Settings → Proxies
   - Proxy list with quality indicators
   - Sync controls and status
   - Filter controls (protocol, country, quality)

6. **MCP Tools**
   - `oneproxy_fetch` - Get proxies with filters
   - `oneproxy_rotate` - Get next available proxy
   - `oneproxy_stats` - Get sync status and stats

### API Response Mapping

1proxy proxy format → OmniRoute format:
```
1proxy: { ip, port, protocol, country, anonymity, quality, latency, google_access }
 OmniRoute: { host: ip, port, port, type: protocol, region: country, status: quality > 50 ? 'active' : 'inactive' }
```

## Technical Implementation

### File Changes

1. **New Files**:
   - `src/lib/db/oneproxy.ts` - Database module
   - `src/lib/oneproxySync.ts` - Sync service
   - `src/lib/oneproxyRotator.ts` - Rotation logic
   - `src/app/api/settings/oneproxy/route.ts` - API routes
   - `src/shared/validation/oneproxySchemas.ts` - Zod schemas
   - `src/components/dashboard/SettingsProxiesOneproxy.tsx` - UI component

2. **Modified Files**:
   - `open-sse/mcp-server/index.ts` - Add MCP tools
   - `src/lib/db/localDb.ts` - Re-export oneproxy module
   - `src/app/dashboard/settings/proxies/page.tsx` - Add tab

### Database Schema

```sql
CREATE TABLE oneproxy_proxies (
  id TEXT PRIMARY KEY,
  ip TEXT NOT NULL,
  port INTEGER NOT NULL,
  protocol TEXT NOT NULL,  -- http, socks4, socks5
  country TEXT,
  anonymity TEXT,           -- transparent, anonymous, elite
  quality_score INTEGER,   -- 0-100
  latency_ms INTEGER,
  google_access BOOLEAN,
  last_validated TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT,
  updated_at TEXT
);

CREATE INDEX idx_oneproxy_quality ON oneproxy_proxies(quality_score DESC);
CREATE INDEX idx_oneproxy_protocol ON oneproxy_proxies(protocol);
CREATE INDEX idx_oneproxy_country ON oneproxy_proxies(country);
```

### Environment Variables

```env
# 1proxy Integration
ONEPROXY_ENABLED=true                    # Enable/disable integration
ONEPROXY_API_URL=https://1proxy-api.aitradepulse.com  # API endpoint
ONEPROXY_SYNC_INTERVAL_MINUTES=60       # Sync interval
ONEPROXY_MIN_QUALITY_THRESHOLD=50       # Minimum quality to import
ONEPROXY_MAX_PROXIES=500                 # Maximum proxies to store
```

### Edge Cases

1. **API Unavailable**: Use cached proxy list, show warning in UI
2. **Rate Limiting**: Implement exponential backoff, cache aggressively
3. **All Proxies Dead**: Fall back to manual proxy registry
4. **Duplicate Proxies**: Deduplicate by ip:port combination
5. **Memory Pressure**: Limit stored proxies, use LRU eviction

## Acceptance Criteria

- [ ] `GET /api/settings/oneproxy/proxies` returns list of synced proxies
- [ ] `POST /api/settings/oneproxy/sync` triggers sync and returns count
- [ ] `POST /api/settings/oneproxy/rotate` returns next available proxy
- [ ] Dashboard shows 1proxy tab with working UI
- [ ] MCP tools registered and functional
- [ ] Graceful degradation when 1proxy API unavailable
- [ ] Tests pass with >60% coverage

## Benefits

1. **Free Proxy Access**: No additional cost for validated proxies
2. **Quality Filtering**: Use 1proxy's scoring to select best proxies
3. **Auto-Rotation**: Automatically cycle through proxies on failure
4. **Geographic Diversity**: Filter by country for specific use cases
5. **Community Integration**: Strengthens open-source ecosystem

## Alternatives Considered

1. **GitHub RAW Files**: Simpler but no quality scores, less reliable
2. **Multiple Proxy Sources**: Could add more later (proxifly, etc.)
3. **Custom Proxy Pool**: Build own scraper - too much maintenance

## Priority

Medium - Adds valuable free tier capability without affecting existing functionality.

---

**Related**: This integration enables the "Free Stack" combo to use proxy rotation for improved reliability.

## 💬 Community Discussion

**@kilo-code-bot** (2026-04-29T19:04:26Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/1787.

> **Feature Proposal: Integrate 1proxy - Free Proxy Marketplace & Rotator** (#1787)

Similarity score: 95%

*This comment was generated by Kilo Auto-Triage.*
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
