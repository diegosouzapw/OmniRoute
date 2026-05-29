# Discovery Tool — Design Document

> **Status:** Design + Stub (Phase 1)
> **Related:** [Issue #2885](https://github.com/diegosouzapw/OmniRoute/issues/2885)

## Overview

The Discovery Tool is an automated service that scans LLM providers for free/unlimited access methods, tests authentication bypasses, validates endpoints, and reports findings. It integrates into OmniRoute as an opt-in service (default off).

## Architecture

```
┌─────────────────────────────────────────────┐
│           Discovery Service                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Scanner  │  │ Tester   │  │ Reporter │  │
│  │          │  │          │  │          │  │
│  │ - Probe  │  │ - Auth   │  │ - JSON   │  │
│  │   URLs   │  │   bypass │  │   report │  │
│  │ - Detect │  │ - Cookie │  │ - DB     │  │
│  │   APIs   │  │   extract│  │   store  │  │
│  │ - Model  │  │ - Rate   │  │ - Notify │  │
│  │   disco  │  │   limits │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
         │               │               │
         ▼               ▼               ▼
    Provider DB    Test Results    User Dashboard
```

## Components

### 1. Scanner
- Probes known provider URLs for API endpoints
- Detects authentication requirements (none, cookie, API key, OAuth)
- Discovers available models via `/v1/models` or equivalent
- Checks for rate limits and free tier availability

### 2. Tester
- Tests authentication bypass methods (cookie extraction, public endpoints)
- Validates session token freshness
- Measures rate limits and quotas
- Tests streaming support

### 3. Reporter
- Generates structured JSON reports
- Stores findings in SQLite (`discovery_results` table)
- Sends notifications for high-value discoveries
- Updates provider registry suggestions

## Configuration

```typescript
interface DiscoveryConfig {
  enabled: boolean;           // Default: false (opt-in)
  scanInterval: number;       // ms between scans (default: 24h)
  maxConcurrentScans: number; // parallel scan limit (default: 3)
  targetProviders: string[];  // specific providers to scan (empty = all known)
  notificationWebhook?: string; // URL for discovery notifications
}
```

## DB Schema

```sql
CREATE TABLE discovery_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_id TEXT NOT NULL,
  method TEXT NOT NULL,           -- 'free_tier', 'web_cookie', 'auto_register', 'trial'
  endpoint TEXT,
  auth_type TEXT,                 -- 'none', 'cookie', 'api_key', 'oauth'
  models TEXT,                    -- JSON array of discovered models
  rate_limit TEXT,
  feasibility INTEGER,            -- 1-5 scale
  risk_level TEXT,                -- 'none', 'low', 'medium', 'high', 'critical'
  status TEXT DEFAULT 'pending',  -- 'pending', 'testing', 'verified', 'rejected'
  notes TEXT,
  discovered_at TEXT DEFAULT (datetime('now')),
  verified_at TEXT,
  UNIQUE(provider_id, method, endpoint)
);
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/discovery/results` | List all discovery results |
| GET | `/api/discovery/results/:id` | Get specific result |
| POST | `/api/discovery/scan` | Trigger manual scan |
| POST | `/api/discovery/verify/:id` | Verify a discovery |
| DELETE | `/api/discovery/results/:id` | Delete a result |

## Settings Toggle

In OmniRoute dashboard settings:

```typescript
{
  discovery: {
    enabled: false,           // Default off
    scanInterval: 86400000,   // 24 hours
    maxConcurrentScans: 3,
    targetProviders: [],
  }
}
```

## Implementation Plan

### Phase 1 (Current — Stub)
- [x] Design doc
- [ ] Stub service (`src/lib/discovery/index.ts`)
- [ ] DB migration for `discovery_results` table
- [ ] Settings toggle in settings API
- [ ] Basic scanner that probes a single URL

### Phase 2 (Future)
- [ ] Full scanner with multi-provider support
- [ ] Auth bypass testing
- [ ] Model discovery
- [ ] Rate limit detection
- [ ] Dashboard UI tab

### Phase 3 (Future)
- [ ] Auto-registration integration
- [ ] Session pool management
- [ ] Continuous scanning
- [ ] Notification webhooks

## Security Considerations

- Discovery results may contain sensitive endpoint information
- Cookie/session data should be encrypted at rest
- Scan requests should respect rate limits to avoid IP bans
- Results should be user-scoped (not shared across instances)
