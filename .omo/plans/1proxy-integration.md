# Implementation Plan: 1proxy Integration

**Issue**: https://github.com/diegosouzapw/OmniRoute/issues/1788  
**Status**: Ready for Implementation  
**Complexity**: Medium  
**Estimated Effort**: 2-3 days  

---

## Executive Summary

Integrate [1proxy](https://oyi77.is-a.dev/1proxy) as a new "Free Proxy Source" data provider in OmniRoute. This adds automatic fetching, validation, and rotation of free proxies to OmniRoute's existing proxy infrastructure.

**Key Deliverables**:
1. Data module for 1proxy proxy storage
2. Background sync service  
3. Proxy rotator with quality-based selection
4. REST API endpoints
5. Dashboard UI component
6. MCP tools for programmatic access

---

## Technical Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        OmniRoute App                            │
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │   Dashboard     │    │   Settings      │                   │
│  │   (Proxies)     │◄──►│   API Routes    │                   │
│  └────────┬────────┘    └────────┬────────┘                   │
│           │                     │                             │
│           ▼                     ▼                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  API Layer                               │   │
│  │  GET/POST /api/settings/oneproxy/*                       │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                      │
│           ┌───────────────┼───────────────┐                     │
│           ▼               ▼               ▼                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  oneproxy   │  │   oneproxy  │  │   oneproxy  │             │
│  │   Sync      │  │   Rotator   │  │    MCP      │             │
│  │   Service   │  │   Logic     │  │   Tools     │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Data Layer (SQLite)                         │   │
│  │   oneproxy_proxies table                                 │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                      │
└───────────────────────────┼─────────────────────────────────────┘
                            │ HTTPS
                            ▼
              ┌─────────────────────────────┐
              │   1proxy API                │
              │  1proxy-api.aitradepulse   │
              │        .com                 │
              └─────────────────────────────┘
```

### Data Flow

```
1. Sync Trigger (manual or scheduled)
       │
       ▼
2. Fetch from 1proxy API
       │
       ▼
3. Validate & Transform
       │
       ├──► Upsert to SQLite
       │
       ▼
4. Cache Result
       │
       ▼
5. API/UI Available
```

---

## File Structure

### New Files

| File | Purpose | Type |
|------|---------|------|
| `src/lib/db/oneproxy.ts` | Database CRUD operations | Core |
| `src/lib/oneproxySync.ts` | Background sync service | Core |
| `src/lib/oneproxyRotator.ts` | Proxy rotation logic | Core |
| `src/app/api/settings/oneproxy/route.ts` | REST API endpoints | API |
| `src/shared/validation/oneproxySchemas.ts` | Zod validation schemas | Schema |
| `tests/unit/db/oneproxy.test.ts` | Unit tests | Test |
| `tests/unit/oneproxySync.test.ts` | Sync service tests | Test |
| `tests/unit/oneproxyRotator.test.ts` | Rotator tests | Test |
| `tests/integration/oneproxy.test.ts` | Integration tests | Test |

### Modified Files

| File | Changes | Risk |
|------|---------|------|
| `src/lib/db/localDb.ts` | Add re-export | Low |
| `open-sse/mcp-server/index.ts` | Add 3 MCP tools | Low |
| `src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx` | Add 1proxy section | Low |
| `src/lib/db/core.ts` | Add migration | Medium |

---

## Implementation Details

### Task 1: Database Schema & Module

**File**: `src/lib/db/oneproxy.ts`

```typescript
// Schema (inline for reference - actual in schemas.ts)
interface OneProxyRecord {
  id: string;
  ip: string;
  port: number;
  protocol: 'http' | 'socks4' | 'socks5';
  country: string | null;
  anonymity: 'transparent' | 'anonymous' | 'elite' | null;
  qualityScore: number;      // 0-100 from 1proxy
  latencyMs: number | null;
  googleAccess: boolean;
  lastValidated: string;
  status: 'active' | 'inactive' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// Exported functions
export async function createOneProxy(data: OneProxyInput): Promise<OneProxyRecord>
export async function getOneProxy(id: string): Promise<OneProxyRecord | null>
export async function listOneProxies(filters?: OneProxyFilters): Promise<OneProxyRecord[]>
export async function updateOneProxy(id: string, data: Partial<OneProxyInput>): Promise<OneProxyRecord | null>
export async function deleteOneProxy(id: string): Promise<boolean>
export async function upsertOneProxies(proxies: OneProxyInput[]): Promise<{ inserted: number; updated: number }>
export async function getOneProxyStats(): Promise<OneProxyStats>
```

**Migration** (`db/migrations/022_onproxy_proxies.sql`):
```sql
CREATE TABLE IF NOT EXISTS oneproxy_proxies (
  id TEXT PRIMARY KEY,
  ip TEXT NOT NULL,
  port INTEGER NOT NULL,
  protocol TEXT NOT NULL CHECK (protocol IN ('http', 'socks4', 'socks5')),
  country TEXT,
  anonymity TEXT,
  quality_score INTEGER DEFAULT 0,
  latency_ms INTEGER,
  google_access INTEGER DEFAULT 0,
  last_validated TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'failed')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(ip, port)
);

CREATE INDEX idx_oneproxy_quality ON oneproxy_proxies(quality_score DESC);
CREATE INDEX idx_oneproxy_protocol ON oneproxy_proxies(protocol);
CREATE INDEX idx_oneproxy_country ON oneproxy_proxies(country);
CREATE INDEX idx_oneproxy_status ON oneproxy_proxies(status);
```

**Acceptance Criteria**:
- [ ] Table created via migration
- [ ] CRUD operations work correctly
- [ ] Upsert handles duplicates properly
- [ ] Indexes improve query performance

---

### Task 2: Zod Schemas

**File**: `src/shared/validation/oneproxySchemas.ts`

```typescript
import { z } from 'zod';

export const oneproxyProxyInputSchema = z.object({
  ip: z.string().ip(),
  port: z.number().int().min(1).max(65535),
  protocol: z.enum(['http', 'socks4', 'socks5']),
  country: z.string().max(2).nullable().optional(),
  anonymity: z.enum(['transparent', 'anonymous', 'elite']).nullable().optional(),
  qualityScore: z.number().int().min(0).max(100).default(0),
  latencyMs: z.number().int().nullable().optional(),
  googleAccess: z.boolean().default(false),
});

export const oneproxyFiltersSchema = z.object({
  protocol: z.enum(['http', 'socks4', 'socks5']).optional(),
  country: z.string().max(2).optional(),
  anonymity: z.enum(['transparent', 'anonymous', 'elite']).optional(),
  minQuality: z.number().int().min(0).max(100).optional(),
  status: z.enum(['active', 'inactive', 'failed']).optional(),
  limit: z.number().int().min(1).max(500).default(100),
});

export const oneproxyRotateSchema = z.object({
  strategy: z.enum(['random', 'quality', 'sequential']).default('quality'),
  protocol: z.enum(['http', 'socks4', 'socks5']).optional(),
  country: z.string().max(2).optional(),
  minQuality: z.number().int().min(0).max(100).default(0),
  excludeFailed: z.boolean().default(true),
});

export type OneProxyInput = z.infer<typeof oneproxyProxyInputSchema>;
export type OneProxyFilters = z.infer<typeof oneproxyFiltersSchema>;
export type OneProxyRotateOptions = z.infer<typeof oneproxyRotateSchema>;
```

**Acceptance Criteria**:
- [ ] All schemas validate correctly
- [ ] Invalid inputs rejected with clear errors
- [ ] TypeScript types inferred correctly

---

### Task 3: API Routes

**File**: `src/app/api/settings/oneproxy/route.ts`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings/oneproxy/proxies` | List proxies with filters |
| GET | `/api/settings/oneproxy/proxies/:id` | Get single proxy |
| POST | `/api/settings/oneproxy/sync` | Trigger manual sync |
| POST | `/api/settings/oneproxy/rotate` | Get next proxy |
| DELETE | `/api/settings/oneproxy/proxies/:id` | Delete proxy |
| GET | `/api/settings/oneproxy/stats` | Get sync stats |

**Example Requests**:
```bash
# List proxies with filters
curl -X GET "http://localhost:20128/api/settings/oneproxy/proxies?protocol=http&minQuality=50&limit=20"

# Trigger sync
curl -X POST "http://localhost:20128/api/settings/oneproxy/sync"

# Rotate (get next proxy)
curl -X POST "http://localhost:20128/api/settings/oneproxy/rotate" \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality", "minQuality": 30}'
```

**Response Format**:
```typescript
// GET /proxies
{
  "proxies": [
    {
      "id": "uuid",
      "ip": "192.168.1.1",
      "port": 8080,
      "protocol": "http",
      "country": "US",
      "anonymity": "elite",
      "qualityScore": 85,
      "latencyMs": 120,
      "googleAccess": true,
      "status": "active"
    }
  ],
  "total": 100,
  "syncedAt": "2026-04-30T12:00:00Z"
}

// POST /rotate
{
  "proxy": {
    "id": "uuid",
    "ip": "192.168.1.1",
    "port": 8080,
    "protocol": "http"
  },
  "strategy": "quality"
}
```

**Acceptance Criteria**:
- [ ] All endpoints return correct status codes
- [ ] Authentication required for all endpoints
- [ ] Input validation works
- [ ] Filters apply correctly

---

### Task 4: Sync Service

**File**: `src/lib/oneproxySync.ts`

```typescript
interface SyncConfig {
  apiUrl: string;
  intervalMinutes: number;
  minQualityThreshold: number;
  maxProxies: number;
}

interface SyncResult {
  success: boolean;
  fetched: number;
  inserted: number;
  updated: number;
  errors: string[];
}

// Core sync function
async function syncOneProxies(config?: Partial<SyncConfig>): Promise<SyncResult> {
  // 1. Fetch from 1proxy API
  const response = await fetch(`${apiUrl}/proxies`);
  const data = await response.json();
  
  // 2. Transform and validate
  const proxies = data.proxies.map(transformFrom1Proxy);
  
  // 3. Filter by quality threshold
  const filtered = proxies.filter(p => p.qualityScore >= minQualityThreshold);
  
  // 4. Upsert to database
  const result = await upsertOneProxies(filtered.slice(0, maxProxies));
  
  // 5. Update sync timestamp
  await setSetting('oneproxy_last_sync', new Date().toISOString());
  
  return result;
}

// Circuit breaker for API failures
class OneProxyCircuitBreaker {
  private failures = 0;
  private lastFailure: Date | null = null;
  private threshold = 3;
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.isOpen()) {
      throw new Error('Circuit breaker open - using cached data');
    }
    try {
      return await fn();
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }
  
  private isOpen(): boolean {
    if (this.failures >= this.threshold) {
      const cooldown = 5 * 60 * 1000; // 5 minutes
      return Date.now() - (this.lastFailure?.getTime() ?? 0) < cooldown;
    }
    return false;
  }
}
```

**Acceptance Criteria**:
- [ ] Sync fetches from 1proxy API
- [ ] Transforms data correctly
- [ ] Handles API failures gracefully
- [ ] Respects quality threshold
- [ ] Updates sync timestamp

---

### Task 5: Rotator Logic

**File**: `src/lib/oneproxyRotator.ts`

```typescript
type RotationStrategy = 'random' | 'quality' | 'sequential';

interface RotateOptions {
  strategy: RotationStrategy;
  protocol?: string;
  country?: string;
  minQuality: number;
  excludeFailed: boolean;
}

class OneProxyRotator {
  private lastIndex = 0;
  
  async rotate(options: RotateOptions): Promise<OneProxyRecord | null> {
    const proxies = await listOneProxies({
      protocol: options.protocol,
      country: options.country,
      minQuality: options.minQuality,
      status: options.excludeFailed ? 'active' : undefined,
    });
    
    if (proxies.length === 0) {
      return null;
    }
    
    switch (options.strategy) {
      case 'random':
        return this.randomSelect(proxies);
      case 'quality':
        return this.qualitySelect(proxies);
      case 'sequential':
        return this.sequentialSelect(proxies);
    }
  }
  
  private randomSelect(proxies: OneProxyRecord[]): OneProxyRecord {
    const index = Math.floor(Math.random() * proxies.length);
    return proxies[index];
  }
  
  private qualitySelect(proxies: OneProxyRecord[]): OneProxyRecord {
    // Return highest quality proxy
    return proxies.reduce((best, current) => 
      current.qualityScore > best.qualityScore ? current : best
    );
  }
  
  private sequentialSelect(proxies: OneProxyRecord[]): OneProxyRecord {
    const proxy = proxies[this.lastIndex];
    this.lastIndex = (this.lastIndex + 1) % proxies.length;
    return proxy;
  }
  
  async markFailed(proxyId: string): Promise<void> {
    await updateOneProxy(proxyId, { status: 'failed' });
  }
  
  async markSuccess(proxyId: string): Promise<void> {
    await updateOneProxy(proxyId, { 
      status: 'active',
      lastValidated: new Date().toISOString() 
    });
  }
}
```

**Acceptance Criteria**:
- [ ] Random strategy works
- [ ] Quality strategy returns highest quality
- [ ] Sequential strategy cycles through
- [ ] Failed proxies can be marked
- [ ] Success updates last validated

---

### Task 6: MCP Tools

**File**: Add to `open-sse/mcp-server/index.ts`

```typescript
// Tool definitions
const oneproxyFetchTool = {
  name: 'oneproxy_fetch',
  description: 'Fetch free proxies from 1proxy with optional filters',
  inputSchema: oneproxyFiltersSchema,
  handler: async (args) => {
    const proxies = await listOneProxies(args);
    return { proxies, total: proxies.length };
  }
};

const oneproxyRotateTool = {
  name: 'oneproxy_rotate',
  description: 'Get next available proxy with rotation strategy',
  inputSchema: oneproxyRotateSchema,
  handler: async (args) => {
    const rotator = new OneProxyRotator();
    const proxy = await rotator.rotate(args);
    return { proxy };
  }
};

const oneproxyStatsTool = {
  name: 'oneproxy_stats',
  description: 'Get 1proxy sync status and statistics',
  inputSchema: z.object({}),
  handler: async () => {
    const stats = await getOneProxyStats();
    const lastSync = await getSetting('oneproxy_last_sync');
    return { ...stats, lastSync };
  }
};
```

**Acceptance Criteria**:
- [ ] 3 tools registered
- [ ] Input validation works
- [ ] Proper error handling
- [ ] Audit logging enabled

---

### Task 7: Dashboard UI

**File**: Add to `src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Settings → Proxies                                             │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Global Proxy                                              │   │
│  └───────────────────────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Proxy Registry                                            │   │
│  └───────────────────────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ 🔄 1proxy Source          [Sync Now]  Last: 5m ago      │   │
│  ├───────────────────────────────────────────────────────────┤   │
│  │ Filters: [HTTP▼] [US▼] [Quality: 50▼]                    │   │
│  ├───────────────────────────────────────────────────────────┤   │
│  │ IP:Port          Protocol  Country  Quality  Status      │   │
│  │ 192.168.1.1:8080  HTTP      US       ██████ 85  Active    │   │
│  │ 10.0.0.1:3128     SOCKS5    DE       █████  70  Active    │   │
│  └───────────────────────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Debug Toggle                                              │   │
│  └───────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🔄 Last synced: 5 minutes ago          [Sync Now] [⚙️]   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Filters:                                                        │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌────────────────┐  │
│  │ Protocol │ │ Country  │ │ Min Quality │ │    Search      │  │
│  │ HTTP ▼   │ │ All ▼    │ │ 50 ▼        │ │ 🔍            │  │
│  └──────────┘ └──────────┘ └────────────┘ └────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ IP Address      │ Port │ Protocol │ Country │ Quality   │   │
│  │ 192.168.1.1    │ 8080 │ HTTP     │ US      │ ██████ 85  │   │
│  │ 10.0.0.1       │ 3128 │ SOCKS5   │ DE      │ █████  70  │   │
│  │ 172.16.0.1     │ 1080 │ SOCKS4   │ GB      │ ████   50  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Showing 3 of 245 proxies                          [Export ▼]   │
└─────────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Tab renders correctly
- [ ] Proxy list displays with quality bars
- [ ] Sync button triggers API call
- [ ] Filters work correctly
- [ ] Export functionality works

---

## Environment Variables

```env
# 1proxy Integration Configuration
ONEPROXY_ENABLED=true                    # Enable/disable (default: false)
ONEPROXY_API_URL=https://1proxy-api.aitradepulse.com  # API endpoint
ONEPROXY_SYNC_INTERVAL_MINUTES=60       # Auto-sync interval (default: 60)
ONEPROXY_MIN_QUALITY_THRESHOLD=50        # Minimum quality to import
ONEPROXY_MAX_PROXIES=500                 # Maximum proxies to store
ONEPROXY_STRATEGY=quality                # Default rotation strategy
```

---

## Testing Strategy

### Unit Tests

```typescript
// tests/unit/db/oneproxy.test.ts
describe('OneProxy DB Module', () => {
  it('should create oneproxy proxy', async () => {
    const proxy = await createOneProxy(validInput);
    expect(proxy.id).toBeDefined();
  });
  
  it('should upsert duplicates', async () => {
    await createOneProxy(input);
    const result = await upsertOneProxies([input]);
    expect(result.updated).toBe(1);
    expect(result.inserted).toBe(0);
  });
  
  it('should filter by quality', async () => {
    await createOneProxy({ ...input, qualityScore: 80 });
    await createOneProxy({ ...input, qualityScore: 30, ip: '10.0.0.1' });
    const list = await listOneProxies({ minQuality: 50 });
    expect(list).toHaveLength(1);
  });
});

// tests/unit/oneproxyRotator.test.ts
describe('OneProxy Rotator', () => {
  it('should return random proxy', async () => {
    const proxy = await rotator.rotate({ strategy: 'random' });
    expect(proxy).toBeDefined();
  });
  
  it('should return highest quality', async () => {
    const proxy = await rotator.rotate({ strategy: 'quality' });
    expect(proxy?.qualityScore).toBe(80);
  });
});
```

### Integration Tests

```typescript
// tests/integration/oneproxy.test.ts
describe('OneProxy Integration', () => {
  it('should sync and list proxies', async () => {
    await syncOneProxies();
    const list = await listOneProxies();
    expect(list.length).toBeGreaterThan(0);
  });
  
  it('should rotate through proxies', async () => {
    const p1 = await rotate();
    const p2 = await rotate();
    expect(p1?.id).not.toBe(p2?.id);
  });
});
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/dashboard/oneproxy.spec.ts
test('1proxy tab functionality', async ({ page }) => {
  await page.goto('/dashboard/settings/proxies');
  await page.click('button:has-text("1proxy")');
  
  // Verify tab is active
  await expect(page.locator('[data-testid="oneproxy-tab"]')).toBeVisible();
  
  // Trigger sync
  await page.click('button:has-text("Sync Now")');
  await expect(page.locator('[data-testid="sync-spinner"]')).toBeHidden();
  
  // Verify proxy list
  await expect(page.locator('[data-testid="proxy-list"]')).toBeVisible();
});
```

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 1proxy API unavailable | Medium | Medium | Cache last successful fetch |
| Rate limiting | Low | High | Implement backoff, cache aggressively |
| Memory pressure | Medium | Low | Limit max proxies, LRU eviction |
| Schema changes | Medium | Low | Version API calls, handle gracefully |

---

## Timeline

| Task | Estimate | Dependencies |
|------|----------|--------------|
| Database schema & module | 1h | - |
| Zod schemas | 30m | Task 1 |
| API routes | 2h | Task 2 |
| Sync service | 3h | Task 1, 2 |
| Rotator logic | 2h | Task 1, 2 |
| MCP tools | 1h | Task 3 |
| Dashboard UI | 3h | Task 3 |
| Tests | 4h | Tasks 1-7 |
| **Total** | **~16h** | - |

---

## Success Criteria

- [ ] GET /api/settings/oneproxy/proxies returns list
- [ ] POST /api/settings/oneproxy/sync triggers sync
- [ ] POST /api/settings/oneproxy/rotate returns proxy
- [ ] Dashboard shows 1proxy tab with working UI
- [ ] 3 MCP tools registered and functional
- [ ] Circuit breaker prevents cascade failures
- [ ] Tests pass with >60% coverage
- [ ] No TypeScript errors
- [ ] No lint errors