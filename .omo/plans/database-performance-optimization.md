# Database Performance Optimization Plan

## TL;DR

> **Quick Summary**: Expand the EXISTING "System Storage" tab in Settings to consolidate ALL database-related settings (location, purge, logs, backup/restore/import/export, retention, compression, optimization, AND cache settings). Fix database crashes caused by 587K+ unbounded rows with user-configurable aggregation and cleanup.
> 
> **Deliverables**: 
> - Expanded "System Storage" settings tab with 8 sections (location, purge, logs, backup, cache, retention, compression, optimization)
> - Cache settings moved FROM `CacheSettingsTab.tsx` INTO `SystemStorageTab.tsx` (then delete CacheSettingsTab)
> - User-configurable aggregation, retention, and optimization settings
> - Aggregated summary tables with configurable retention
> - Per-table retention policies (replacing hardcoded env vars)
> - Backup/restore UI with auto-backup scheduling (already exists, keep it)
> - Purge UI with confirmation dialogs (already exists, extend it)
> 
> **Estimated Effort**: Large (4-5 days implementation + testing)
> **Parallel Execution:** YES - 5 waves, 32 tasks total
> **Critical Path**: Migration 050-054 → Settings API → Aggregation engine → Expanded SystemStorageTab UI

---

## Context

### Problem Statement

Database is **238MB** with **587,510 quota_snapshots** in just **18 days** (32K/day). Pages crash when loading 2.5+ months of data:

- **Cost page**: Loads all call_logs into memory → crash
- **Analytics page**: Aggregates usage_history in JS → crash  
- **Debug page**: Queries quota_snapshots without indexes → timeout
- **No user control**: Retention periods are hardcoded in environment variables

### Root Causes Identified

| Issue | Impact | Current State |
|-------|--------|---------------|
| `quota_snapshots` no cleanup | 334,901 rows (>7 days old) | 57% stale data |
| `compression_analytics` no indexes | Full table scans | 27K rows, growing |
| `compression_analytics` no cleanup | Unbounded growth | ~27K rows/day |
| Missing composite indexes | Slow filtered queries | (provider, timestamp) |
| No auto_vacuum | Space never reclaimed | 238MB with deletions |
| Hardcoded retention | Users can't adjust | Env vars only |
| No page_size tuning | Default 4096 may not be optimal | Not configurable |
| No cache_size tuning | Default -2000 (~2MB) may be small | Not configurable |

### Solution: Expand Existing System Storage Tab

> **KEY DECISION**: Do NOT create a new "Database" tab. Instead, expand the EXISTING
> `SystemStorageTab.tsx` with additional collapsible sections. This avoids redundancy
> since SystemStorageTab already has backup/restore/import/export, purge, and storage health.

```
┌─────────────────────────────────────────────────────────┐
│  Settings Page → System Storage Tab (EXPANDED)          │
│  │                                                      │
│  │  EXISTING (keep as-is):                              │
│  ├─ Storage Health (DB size, WAL, pages) ✅             │
│  ├─ Export/Import JSON ✅                               │
│  ├─ Backup/Restore ✅                                   │
│  ├─ Maintenance (clear cache, purge logs) ✅            │
│  │                                                      │
│  │  NEW SECTIONS (add):                                 │
│  ├─ Cache Settings (moved from CacheSettingsTab)        │
│  │  ├─ Semantic cache enabled/toggle                    │
│  │  ├─ Semantic cache max size                          │
│  │  ├─ Semantic cache TTL                               │
│  │  ├─ Prompt cache enabled/toggle                      │
│  │  ├─ Prompt cache strategy                            │
│  │  └─ Always preserve client cache                     │
│  ├─ Aggregation Settings                                │
│  │  ├─ Enable aggregation: [✓]                          │
│  │  ├─ Raw data retention: [30] days                    │
│  │  ├─ Aggregation granularity: [hourly/daily/monthly]  │
│  │  └─ Auto-cleanup: [✓]                                │
│  ├─ Database Compression                                │
│  │  ├─ Auto-vacuum mode: [FULL/INCREMENTAL/NONE]        │
│  │  ├─ Page size: [4096] bytes (next restart)           │
│  │  ├─ Cache size: [-2000] KB (runtime)                 │
│  │  ├─ Manual VACUUM: [Run Now] button                  │
│  │  └─ Scheduled VACUUM: [daily/weekly/monthly/never]   │
│  └─ Per-Table Retention                                 │
│     ├─ Quota snapshots: [7] days                        │
│     ├─ Compression analytics: [30] days                 │
│     ├─ MCP audit logs: [30] days                        │
│     ├─ A2A events: [30] days                            │
│     └─ Memory entries: [30] days                        │
└─────────────────────────────────────────────────────────┘
```

---

## Work Objectives

### Core Objective
Implement user-configurable database performance optimization system with aggregation, compression, and retention policies that preserve 100% dashboard accuracy while preventing crashes.

### Concrete Deliverables

1. **Schema migrations** (5 files): 
   - Summary tables for aggregation
   - Composite indexes for performance
   - Settings storage tables

2. **Settings system** (4 components):
   - Database settings schema validation
   - `/api/settings/database` API endpoints
   - Default settings migration
   - Settings UI sections within SystemStorageTab

3. **Aggregation engine** (3 functions):
   - Configurable aggregation job
   - Backfill utility with progress tracking
   - Dynamic query builder (uses raw vs agg based on retention)

4. **Compression & optimization** (4 functions):
   - Auto-vacuum configuration manager
   - Manual VACUUM trigger
   - Page size/cache size optimization
   - Scheduled maintenance scheduler

5. **Cleanup functions** (6 functions):
   - Configurable retention for each table
   - User-defined retention periods
   - Cleanup scheduler

### Definition of Done

- [ ] ALL database-related settings consolidated into EXISTING "System Storage" tab (expanded)
- [ ] CacheSettingsTab.tsx removed (moved into SystemStorageTab)
- [ ] No database/cache settings scattered across other settings tabs
- [ ] User can configure aggregation settings via System Storage tab
- [ ] User can set raw data retention period (days)
- [ ] User can enable/disable auto_vacuum and choose mode
- [ ] User can trigger manual VACUUM from System Storage tab
- [ ] User can set per-table retention policies
- [ ] User can backup/restore/import/export from System Storage tab (already works)
- [ ] User can purge specific tables from System Storage tab
- [ ] User can see database location, size, and health stats (already works)
- [ ] User can configure log capture settings (detailed logs, pipeline, ring buffer)
- [ ] User can configure semantic/prompt cache settings (moved from CacheSettingsTab)
- [ ] Cost page loads in < 2s regardless of data size
- [ ] Aggregated totals match raw data (100% accuracy)
- [ ] Settings persist across restarts
- [ ] Database size reduces by 50%+ with optimization
- [ ] All settings have sensible defaults
- [ ] Hardcoded env vars (CALL_LOG_RETENTION_DAYS etc.) replaced by DB settings

### Must Have (User-Configurable)

- [ ] `aggregationEnabled` - Enable/disable time-based aggregation
- [ ] `rawDataRetentionDays` - How long to keep raw data (default: 30)
- [ ] `aggregationGranularity` - hourly/daily/weekly (default: daily)
- [ ] `autoVacuumMode` - NONE/FULL/INCREMENTAL (default: FULL)
- [ ] `scheduledVacuum` - never/daily/weekly/monthly (default: weekly)
- [ ] `quotaSnapshotRetentionDays` - Quota data retention (default: 7)
- [ ] `compressionAnalyticsRetentionDays` - Compression stats retention (default: 30)
- [ ] `mcpAuditRetentionDays` - MCP audit retention (default: 30)
- [ ] `a2aEventsRetentionDays` - A2A events retention (default: 30)
- [ ] `callLogRetentionDays` - Call log retention (default: 30, replaces env var)
- [ ] `appLogRetentionDays` - App log retention (default: 7, replaces env var)
- [ ] `memoryRetentionDays` - Memory entries retention (default: 30, moved from Memory tab)
- [ ] `detailedLogsEnabled` - Detailed request logging (moved to System Storage tab)
- [ ] `callLogPipelineEnabled` - Call log pipeline (moved to System Storage tab)
- [ ] `semanticCacheEnabled` - Semantic cache toggle (moved from CacheSettingsTab)
- [ ] `semanticCacheMaxSize` - Semantic cache max entries (moved from CacheSettingsTab)
- [ ] `semanticCacheTTL` - Semantic cache TTL in ms (moved from CacheSettingsTab)
- [ ] `promptCacheEnabled` - Prompt cache toggle (moved from CacheSettingsTab)
- [ ] `promptCacheStrategy` - Prompt cache strategy (moved from CacheSettingsTab)
- [ ] `alwaysPreserveClientCache` - Client cache preservation (moved from CacheSettingsTab)
- [ ] `autoBackupEnabled` - Auto-backup scheduling
- [ ] `autoBackupFrequency` - Backup frequency
- [ ] `keepLastNBackups` - Number of backups to retain

### Must NOT Have (Guardrails)

- [ ] No hardcoded retention values (all user-configurable via System Storage tab)
- [ ] No database settings scattered across multiple tabs (System Storage tab only)
- [ ] No CacheSettingsTab.tsx remaining after migration (absorbed into SystemStorageTab)
- [ ] No deletion of raw data without aggregation verification
- [ ] No aggregation of "today" (incomplete day boundary)
- [ ] No database operations without user consent (for manual actions)
- [ ] No settings that can cause data loss without warnings
- [ ] No purge/restore without confirmation dialog

---

## User-Configurable Settings Schema

### Database Settings Structure

```typescript
// src/types/databaseSettings.ts
export interface DatabaseSettings {
  // 1. Location (read-only display)
  location: {
    databasePath: string;              // e.g., ~/.omniroute/storage.sqlite
    dataDir: string;                   // e.g., ~/.omniroute/
    walSizeBytes: number;              // Size of WAL file
    schemaVersion: number;             // Current migration version
  };

  // 2. Purge (manual trigger actions)
  // Note: Purge is action-based, not settings-based. Handled via POST endpoints.

  // 3. Logs (what gets captured)
  logs: {
    detailedLogsEnabled: boolean;      // Default: false
    callLogPipelineEnabled: boolean;   // Default: false
    maxDetailSizeKb: number;           // Default: 10, min: 1, max: 100
    ringBufferSize: number;            // Default: 500 (request_detail_logs max rows)
  };

  // 4. Backup (backup/restore/import/export)
  backup: {
    autoBackupEnabled: boolean;        // Default: false
    autoBackupFrequency: 'never' | 'daily' | 'weekly' | 'monthly';  // Default: 'never'
    keepLastNBackups: number;          // Default: 5, min: 1, max: 20
  };

  // 5. Cache (moved from CacheSettingsTab.tsx)
  cache: {
    semanticCacheEnabled: boolean;     // Default: true
    semanticCacheMaxSize: number;      // Default: 100
    semanticCacheTTL: number;          // Default: 1800000 (30 min in ms)
    promptCacheEnabled: boolean;       // Default: true
    promptCacheStrategy: 'auto' | 'system-only' | 'manual';  // Default: 'auto'
    alwaysPreserveClientCache: 'auto' | 'always' | 'never';  // Default: 'auto'
  };

  // 6. Retention (per-table cleanup policies)
  retention: {
    quotaSnapshots: number;            // Default: 7, min: 1, max: 365
    compressionAnalytics: number;      // Default: 30, min: 1, max: 365
    mcpAudit: number;                  // Default: 30, min: 1, max: 365
    a2aEvents: number;                 // Default: 30, min: 1, max: 365
    callLogs: number;                  // Default: 30, min: 1, max: 365
    usageHistory: number;              // Default: 30, min: 1, max: 365
    memoryEntries: number;             // Default: 30, min: 1, max: 365
    autoCleanupEnabled: boolean;       // Default: true
  };

  // 7. Compression (aggregation)
  aggregation: {
    enabled: boolean;                  // Default: true
    rawDataRetentionDays: number;      // Default: 30, min: 1, max: 365
    granularity: 'hourly' | 'daily' | 'weekly';  // Default: 'daily'
  };

  // 8. Optimization (auto_vacuum, VACUUM, page/cache)
  optimization: {
    autoVacuumMode: 'NONE' | 'FULL' | 'INCREMENTAL';  // Default: 'FULL'
    scheduledVacuum: 'never' | 'daily' | 'weekly' | 'monthly';  // Default: 'weekly'
    vacuumHour: number;                // Default: 2 (2 AM), 0-23
    pageSize: number;                  // Default: 4096, options: 512, 1024, 2048, 4096, 8192
    cacheSize: number;                 // Default: -2000, range: -100000 to -512
    optimizeOnStartup: boolean;        // Default: true
  };

  // Read-only stats
  stats: {
    databaseSizeBytes: number;
    pageCount: number;
    freelistCount: number;
    lastVacuumAt: string | null;
    lastOptimizationAt: string | null;
    integrityCheck: 'ok' | 'error' | null;
  };
}
```

---

## Database Compression & Optimization Methods

### 1. Auto-Vacuum Modes

```typescript
// User-configurable via settings
export type AutoVacuumMode = 'NONE' | 'FULL' | 'INCREMENTAL';

const autoVacuumConfig = {
  NONE: {
    // Default SQLite behavior
    // Deleted pages marked as free, reused later
    // Database file never shrinks
    // Requires manual VACUUM to reclaim space
    sql: 'PRAGMA auto_vacuum = NONE;',
    pros: 'Fastest inserts/updates, no overhead',
    cons: 'Database file grows indefinitely, requires manual VACUUM',
    bestFor: 'Small databases, development'
  },
  FULL: {
    // Automatically truncates file on commit
    // Reclaims space immediately after delete
    // Slight performance overhead on commits
    sql: 'PRAGMA auto_vacuum = FULL;',
    pros: 'File stays compact, no manual VACUUM needed',
    cons: 'Slight overhead, causes file fragmentation',
    bestFor: 'Production databases with frequent deletes'
  },
  INCREMENTAL: {
    // Reclaims space incrementally, not on every commit
    // Balance between NONE and FULL
    // Requires PRAGMA incremental_vacuum(N) calls
    sql: 'PRAGMA auto_vacuum = INCREMENTAL;',
    pros: 'Controlled reclamation, less fragmentation',
    cons: 'Requires periodic incremental_vacuum calls',
    bestFor: 'Large databases, embedded systems'
  }
};
```

### 2. Page Size Optimization

```typescript
// Page size affects I/O performance and storage efficiency
const pageSizeOptions = {
  512: {
    bestFor: 'Very small databases, embedded',
    pros: 'Minimal waste for small rows',
    cons: 'More pages = more I/O overhead'
  },
  4096: {
    bestFor: 'General purpose (DEFAULT)',
    pros: 'Matches most filesystem block sizes',
    cons: 'May waste space with small rows'
  },
  8192: {
    bestFor: 'Large databases, few rows, big blobs',
    pros: 'Less I/O for large data',
    cons: 'More wasted space, requires SQLITE_MAX_PAGE_SIZE compile'
  }
};

// Can only be changed on new database or after VACUUM
// PRAGMA page_size = 4096;
// VACUUM;  // Required to apply
```

### 3. Cache Size Tuning

```typescript
// Runtime-configurable, affects memory usage
// PRAGMA cache_size = -2000;  // Negative = KB, Positive = pages

const cacheSizeRecommendations = {
  small: -2000,     // 2MB - Default
  medium: -10000,   // 10MB
  large: -50000,    // 50MB
  server: -100000   // 100MB - For high-traffic
};
```

### 4. VACUUM Operations

```typescript
interface VacuumOptions {
  // Regular VACUUM - rebuilds database in-place
  // Requires 2x disk space temporarily
  // Blocks all writes during operation
  standard: 'VACUUM;',
  
  // VACUUM INTO - creates optimized copy
  // Original database unchanged
  // Can be used for backup + optimize in one step
  into: 'VACUUM INTO \'backup.sqlite\';',
  
  // For auto_vacuum=INCREMENTAL databases
  // Reclaims N pages without full rebuild
  incremental: 'PRAGMA incremental_vacuum(1000);'
}
```

### 5. ANALYZE for Query Optimization

```typescript
// Updates statistics for query planner
// Should run after significant data changes or index creation
const analyzeOptions = {
  full: 'ANALYZE;',                    // All tables
  table: 'ANALYZE call_logs;',         // Specific table
  index: 'ANALYZE idx_cl_timestamp;',  // Specific index
  
  // With analysis limit (faster, approximate)
  limited: 'PRAGMA analysis_limit=1000; ANALYZE;',
  
  // Automatic optimization (SQLite 3.46+)
  auto: 'PRAGMA optimize;'
};
```

### 6. Potential External Compression

```typescript
// For extreme compression (advanced users)
interface ExternalCompressionOptions {
  // ZFS/btrfs compression at filesystem level
  // Transparent, automatic
  filesystem: 'Enable compression on DATA_DIR filesystem',
  
  // SQLite Compression Extension (ZLIB)
  // Requires custom SQLite build with -DSQLITE_HAVE_ZLIB
  // Not available in standard better-sqlite3
  sqliteZlib: 'Not available in current build',
  
  // Application-level compression for large text/blob columns
  // Compress before INSERT, decompress after SELECT
  application: 'Compress JSON columns before storage'
}
```

---

## Verification Strategy

### Test Strategy

- **TDD for settings validation**: Schema validation, bounds checking
- **Integration tests**: Settings API, database operations
- **Performance tests**: Query speed before/after optimization
- **User scenario tests**: Settings changes, VACUUM operations

### QA Scenarios (Agent-Executed)

Every task includes verification steps executed by the implementing agent.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - Schema + Settings API):
├── Task 1: Create database settings schema and types [quick]
├── Task 2: Create database settings migration [quick]
├── Task 3: Create /api/settings/database API endpoints [quick]
├── Task 4: Create settings validation schemas [quick]
├── Task 5: Create aggregation settings tables migration [quick]
└── Task 6: Add default settings to migration runner [quick]

Wave 2 (Aggregation Engine - After Wave 1):
├── Task 7: Create aggregation utility functions [unspecified-high]
├── Task 8: Create summary tables migration [quick]
├── Task 9: Create backfill script with progress tracking [deep]
├── Task 10: Update Cost/Budget queries for aggregation [unspecified-high]
├── Task 11: Update Analytics queries for aggregation [quick]
└── Task 12: Update Quota utilization queries [unspecified-high]

Wave 3 (Cleanup + Compression - After Wave 2):
├── Task 13: Create configurable cleanup functions [quick]
├── Task 14: Implement auto_vacuum mode management [quick]
├── Task 15: Implement manual VACUUM trigger [quick]
├── Task 16: Create database compression scheduler [unspecified-high]
├── Task 17: Implement page_size/cache_size optimization [quick]
└── Task 18: Add compression_analytics indexes migration [quick]

Wave 4 (UI — Expand SystemStorageTab, 9 tasks):
├── Task 19: Extend SystemStorageTab — add Purge section [visual-engineering]
├── Task 20: Add Logs settings section (detailed logs, pipeline, ring buffer) [visual-engineering]
├── Task 21: Add Cache settings section (move from CacheSettingsTab.tsx) [visual-engineering]
├── Task 22: Verify backup/restore/import/export section (already exists, extend if needed) [quick]
├── Task 23: Add Retention policy settings UI (all 7 tables + auto-cleanup) [visual-engineering]
├── Task 24: Add Compression/aggregation settings UI [visual-engineering]
├── Task 25: Add Optimization settings UI (vacuum, page/cache, ANALYZE, integrity) [visual-engineering]
├── Task 26: Add database stats display (size, pages, last ops) [visual-engineering]
└── Task 27: Remove CacheSettingsTab + move scattered settings into SystemStorageTab [visual-engineering]

Wave 5 (Verification - After Wave 4):
├── Task 28: Verify aggregation accuracy (raw vs agg) [deep]
├── Task 29: Performance test with configurable settings [deep]
├── Task 30: Test settings persistence across restarts [deep]
├── Task 31: Verify all DB settings consolidated (no scatter) [quick]
└── Task 32: Database size validation [quick]
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|------------|--------|
| 1-6 (schema/settings) | - | 7, 9, 13, 14 |
| 7 (agg utils) | 5 | 8, 9, 10, 11, 12 |
| 8-12 (aggregation) | 7 | 28 |
| 13-18 (cleanup/compression) | 1-6 | 19-27 |
| 19 (purge section) | 1-6, 13-18 | 20-27 |
| 20-27 (UI sections) | 19 | 28-32 |
| 28-32 (verification) | All previous | - |

### Agent Dispatch Summary

- **Wave 1**: 6 tasks → all `quick`
- **Wave 2**: 6 tasks → 2 `unspecified-high`, 2 `deep`, 2 `quick`
- **Wave 3**: 6 tasks → 4 `quick`, 2 `unspecified-high`
- **Wave 4**: 9 tasks → all `visual-engineering`
- **Wave 5**: 5 tasks → 3 `deep`, 2 `quick`

---

## TODOs

### Wave 1: Foundation (Schema + Settings API)

- [x] 1. Create database settings schema and types

  **What to do:**
  - Create `src/types/databaseSettings.ts` with DatabaseSettings interface
  - Define all configuration options with types and defaults
  - Export validation functions
  
  **Must NOT do:**
  - Do not use hardcoded values
  - Do not make settings optional (must have defaults)
  
  **Recommended Agent Profile:**
  - **Category**: `quick` - Type definitions
  
  **Parallelization:**
  - **Can Run In Parallel**: YES (with Tasks 2, 3, 4, 5, 6)
  - **Parallel Group**: Wave 1
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Types compile correctly
    Tool: Bash
    Steps:
      1. Run: npm run typecheck:core
      2. Verify: No TypeScript errors
    Expected Result: Clean compilation
    Evidence: .sisyphus/evidence/task-1-types.txt
  ```
  
  **Commit**: YES
  - Message: `feat(types): add database settings schema with user-configurable options`
  - Files: `src/types/databaseSettings.ts`

- [x] 2. Create database settings migration

  **What to do:**
  - Create `src/lib/db/migrations/050_database_settings.sql`
  - Add default settings to key_value table under namespace 'databaseSettings'
  - Include all aggregation, compression, retention settings
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Migration inserts default settings
    Tool: Bash
    Steps:
      1. Run migration
      2. Query: SELECT * FROM key_value WHERE namespace = 'databaseSettings'
    Expected Result: All default settings present
    Evidence: .sisyphus/evidence/task-2-migration.txt
  ```
  
  **Commit**: YES

- [x] 3. Create /api/settings/database API endpoints

  **What to do:**
  - Create `src/app/api/settings/database/route.ts`
  - GET endpoint: Returns current database settings + stats
  - PATCH endpoint: Updates database settings with validation
  - POST endpoint: Trigger manual VACUUM or optimization
  
  **Recommended Agent Profile:**
  - **Category**: `quick` - API endpoints
  
  **Parallelization:**
  - **Can Run In Parallel**: YES (with Tasks 1, 2, 4, 5, 6)
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: GET returns current settings
    Tool: curl
    Steps:
      1. GET /api/settings/database
      2. Verify: Response includes aggregation, compression, retention
    Expected Result: 200 OK with complete settings
    Evidence: .sisyphus/evidence/task-3-api-get.json
  
  Scenario: PATCH updates settings
    Tool: curl
    Steps:
      1. PATCH /api/settings/database with { rawDataRetentionDays: 60 }
      2. Verify: Setting persisted
    Expected Result: 200 OK, setting updated
    Evidence: .sisyphus/evidence/task-3-api-patch.json
  ```
  
  **Commit**: YES
  - Message: `feat(api): add database settings endpoints with CRUD operations`
  - Files: `src/app/api/settings/database/route.ts`

- [x] 4. Create settings validation schemas

  **What to do:**
  - Add `databaseSettingsUpdateSchema` to `src/shared/validation/settingsSchemas.ts`
  - Validate all fields: ranges, enums, types
  - Include bounds checking (e.g., retentionDays: 1-365)
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Rejects invalid values
    Tool: Node test
    Steps:
      1. Validate: { rawDataRetentionDays: 500 }
      2. Assert: Validation fails (max 365)
    Expected Result: Zod validation error
    Evidence: .sisyphus/evidence/task-4-validation.txt
  ```
  
  **Commit**: YES

- [x] 5. Create aggregation settings tables migration

  **What to do:**
  - Create `src/lib/db/migrations/051_aggregation_tables.sql`
  - Create daily_usage_summary table
  - Create hourly_quota_summary table
  - Add indexes
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Tables created successfully
    Tool: Bash
    Steps:
      1. Run migration
      2. Query: .schema daily_usage_summary
    Expected Result: Table exists with correct columns
    Evidence: .sisyphus/evidence/task-5-tables.txt
  ```
  
  **Commit**: YES

- [x] 6. Add default settings to migration runner

  **What to do:**
  - Ensure migrations run in correct order
  - Add verification step for settings insertion
  - Handle upgrade from existing installations
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Acceptance Criteria:**
  - [ ] Migration 050 runs successfully
  - [ ] Default settings inserted into key_value table
  - [ ] Upgrades from existing installs don't break

  **QA Scenarios:**
  ```
  Scenario: Migration runner inserts default settings
    Tool: Bash
    Steps:
      1. Run: node --import tsx/esm -e "import { getDbInstance } from './src/lib/db/core.ts'; const db = getDbInstance(); const row = db.prepare('SELECT * FROM key_value WHERE namespace = ?').get('databaseSettings'); console.log(JSON.stringify(row));"
      2. Verify: Row contains default values for all settings
    Expected Result: Default database settings present in key_value table
    Evidence: .sisyphus/evidence/task-6-migration-settings.json

  Scenario: Existing installation upgrade doesn't break
    Tool: Bash
    Steps:
      1. Run: npm run dev & (background)
      2. Wait 5s for startup
      3. Check: curl http://localhost:20128/api/settings/database | jq '.location'
    Expected Result: API returns valid response, no errors in logs
    Evidence: .sisyphus/evidence/task-6-upgrade.txt
  ```

  **Commit**: YES (grouped with Tasks 2, 5)

### Wave 2: Aggregation Engine

- [x] 7. Create aggregation utility functions

  **What to do:**
  - Create `src/lib/usage/aggregateHistory.ts`
  - Implement `rollupDailyUsage(date, granularity)` with configurable granularity
  - Implement `rollupHourlyQuota(date)`
  - Read retention settings from database settings
  
  **Must NOT do:**
  - Do not use hardcoded retention values
  - Do not aggregate incomplete days
  
  **Recommended Agent Profile:**
  - **Category**: `unspecified-high` - Database operations
  
  **Parallelization:**
  - **Can Run In Parallel**: NO (needs Task 5)
  - **Blocked By**: Task 5
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Aggregation respects retention settings
    Tool: Bash
    Steps:
      1. Set rawDataRetentionDays to 7
      2. Run aggregation for day 8 days ago
      3. Verify: Day aggregated, not deleted yet
    Expected Result: Configurable retention honored
    Evidence: .sisyphus/evidence/task-7-retention.txt
  ```
  
  **Commit**: YES
  - Message: `feat(usage): add configurable aggregation engine`
  - Files: `src/lib/usage/aggregateHistory.ts`

- [x] 8. Create summary tables migration

  **What to do:**
  - Create monthly_cost_summary table
  - Add composite indexes for query performance
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Parallelization:**
  - **Can Run In Parallel**: YES (with Task 9)
  
  **Commit**: YES

- [x] 9. Create backfill script with progress tracking

  **What to do:**
  - Create `scripts/backfill-aggregates.ts`
  - Read settings for granularity and retention
  - Track progress in db_meta table (resumable)
  - Process in batches of 10 days
  
  **Recommended Agent Profile:**
  - **Category**: `deep` - Complex batch processing
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Backfill resumes from last position
    Tool: Bash
    Steps:
      1. Start backfill, interrupt at 50%
      2. Restart, verify resumes from checkpoint
    Expected Result: No duplicate work
    Evidence: .sisyphus/evidence/task-9-resumable.txt
  ```
  
  **Commit**: YES

- [x] 10. Update Cost/Budget queries for aggregation

  **What to do:**
  - Modify cost analysis to use UNION strategy
  - Respect user's rawDataRetentionDays setting
  - Query summary tables for older data
  
  **Recommended Agent Profile:**
  - **Category**: `unspecified-high`
  
  **Parallelization:**
  - **Can Run In Parallel**: YES (with Tasks 11, 12)
  - **Blocked By**: Task 7

  **QA Scenarios:**
  ```
  Scenario: Cost query returns data from both raw and summary tables
    Tool: Bash
    Steps:
      1. Run: curl -s http://localhost:20128/api/analytics/cost?start=2026-04-01 | jq '.total'
      2. Compare: With direct SQL query to both tables
    Expected Result: API returns sum matching UNION query result
    Evidence: .sisyphus/evidence/task-10-cost-query.json
  ```
  
  **Commit**: YES

- [x] 11. Update Analytics queries

  **What to do:**
  - Update time-series queries for aggregation
  - Preserve chart data format
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Parallelization:**
  - **Can Run In Parallel**: YES (with Tasks 10, 12)
  - **Blocked By**: Task 7

  **QA Scenarios:**
  ```
  Scenario: Analytics page loads without crashing
    Tool: Playwright
    Steps:
      1. Navigate: /dashboard/analytics
      2. Wait 5s for data load
      3. Verify: Chart renders with data
    Expected Result: Analytics loads in under 3s, chart visible
    Evidence: .sisyphus/evidence/task-11-analytics-load.png
  ```

  **Commit**: YES

- [x] 12. Update Quota utilization queries

  **What to do:**
  - Implement tiered query based on settings
  - Raw for recent, hourly for older, daily for very old
  
  **Recommended Agent Profile:**
  - **Category**: `unspecified-high`
  
  **Parallelization:**
  - **Can Run In Parallel**: YES (with Tasks 10, 11)
  - **Blocked By**: Task 7

  **QA Scenarios:**
  ```
  Scenario: Quota page shows accurate totals
    Tool: Bash
    Steps:
      1. Run: curl -s http://localhost:20128/api/quota | jq '.used'
      2. Compare: With direct query to usage_history + summary tables
    Expected Result: API total matches direct SQL sum
    Evidence: .sisyphus/evidence/task-12-quota-match.json
  ```

  **Commit**: YES

### Wave 3: Cleanup + Compression

- [x] 13. Create configurable cleanup functions

  **What to do:**
  - Update `cleanupOldSnapshots()` to use retention.quotaSnapshots setting
  - Create `cleanupCompressionAnalytics()` using retention.compressionAnalytics
  - Create `cleanupMcpAudit()` using retention.mcpAudit
  - Create `cleanupA2aEvents()` using retention.a2aEvents
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Parallelization:**
  - **Can Run In Parallel**: YES (with Tasks 14, 15, 16, 17, 18)
  - **Blocked By**: Task 1-6
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Cleanup respects user retention settings
    Tool: Bash
    Steps:
      1. Set quotaSnapshotRetentionDays to 3
      2. Run cleanup
      3. Verify: Only last 3 days kept
    Expected Result: User-defined retention honored
    Evidence: .sisyphus/evidence/task-13-cleanup.txt
  ```
  
  **Commit**: YES

- [x] 14. Implement auto_vacuum mode management

  **What to do:**
  - Create `src/lib/db/vacuumManager.ts`
  - Function to change auto_vacuum mode (requires VACUUM)
  - Warn user that mode change requires database rebuild
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Auto-vacuum mode change applies after VACUUM
    Tool: Bash
    Steps:
      1. Change setting to FULL
      2. Run VACUUM
      3. Verify: PRAGMA auto_vacuum returns 1
    Expected Result: Mode persisted
    Evidence: .sisyphus/evidence/task-14-autovacuum.txt
  ```
  
  **Commit**: YES

- [x] 15. Implement manual VACUUM trigger

  **What to do:**
  - Add POST /api/settings/database/vacuum endpoint
  - Show progress if possible
  - Return before/after stats
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Manual VACUUM reduces database size
    Tool: curl + du
    Steps:
      1. Note size: du -h storage.sqlite
      2. POST /api/settings/database/vacuum
      3. Verify: Size reduced, stats updated
    Expected Result: Database optimized
    Evidence: .sisyphus/evidence/task-15-vacuum.txt
  ```
  
  **Commit**: YES

- [x] 16. Create database compression scheduler

  **What to do:**
  - Create `src/lib/db/optimizationScheduler.ts`
  - Run VACUUM based on scheduledVacuum setting
  - Run ANALYZE after index changes
  - Respect vacuumHour setting
  
  **Recommended Agent Profile:**
  - **Category**: `unspecified-high` - Scheduling
  
  **Acceptance Criteria:**
  
  **QA Scenarios:**
  ```
  Scenario: Scheduler runs at configured hour
    Tool: Bash (with test override)
    Steps:
      1. Set vacuumHour to current hour
      2. Trigger scheduler
      3. Verify: VACUUM executed
    Expected Result: Scheduled maintenance works
    Evidence: .sisyphus/evidence/task-16-scheduler.txt
  ```
  
  **Commit**: YES

- [x] 17. Implement page_size/cache_size optimization

  **What to do:**
  - Apply PRAGMA cache_size on startup based on settings
  - Document page_size requires VACUUM to apply
  - Add warning to UI about page_size requiring restart
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Commit**: YES

- [x] 18. Add compression_analytics indexes migration

  **What to do:**
  - Create `src/lib/db/migrations/052_compression_analytics_indexes.sql`
  - Add indexes: timestamp, mode, provider
  
  **Recommended Agent Profile:**
  - **Category**: `quick`
  
  **Commit**: YES

### Wave 4: Expand SystemStorageTab UI (9 tasks)

> **KEY DECISION**: Do NOT create a new tab. EXPAND the existing `SystemStorageTab.tsx`.
> The existing sections (storage health, export/import, backup/restore, maintenance) stay.
> New sections are appended below the existing content.
> CacheSettingsTab.tsx is deleted after its settings are moved in.

- [x] 19. Extend SystemStorageTab — add Purge section

  **What to do:**
  - Add new collapsible "Database Purge" section BELOW the existing Maintenance section
  - Add per-table purge buttons: All Logs, Call Logs, Quota Snapshots, Compression Analytics
  - Each button requires confirmation dialog (reuse existing pattern from restore confirmation)
  - Show estimated rows to purge for each table
  - Wire to existing `/api/settings/purge-logs` endpoint
  - Add new endpoints for per-table purge if needed
  - Move `detailed_logs_enabled` and `call_log_pipeline_enabled` toggles here

  **Must NOT do:**
  - Do NOT modify existing sections (health, export/import, backup/restore, maintenance)
  - Do NOT execute purge without confirmation

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering` - React UI

  **Parallelization:**
  - **Can Run In Parallel**: NO (foundation for Tasks 20-27)
  - **Blocked By**: Tasks 1-18

  **References:**
  - `src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx` — EXISTING component to extend
  - `src/app/api/settings/purge-logs/route.ts` — Existing purge endpoint
  - SystemStorageTab already has confirmation dialog pattern (see restore confirmation at line 938)

  **Acceptance Criteria:**

  **QA Scenarios:**
  ```
  Scenario: Purge section appears in System Storage tab
    Tool: Playwright
    Steps:
      1. Navigate: /dashboard/settings → AI tab → scroll to System Storage
      2. Verify: "Database Purge" section visible
      3. Click: "Purge Quota Snapshots"
      4. Verify: Confirmation dialog appears
      5. Click: "Confirm"
      6. Verify: Success message, row count updated
    Expected Result: Purge executes with user confirmation
    Evidence: .sisyphus/evidence/task-19-purge.png
  ```

  **Commit**: YES

- [x] 20. Add Logs settings section

  **What to do:**
  - Add collapsible "Database Logs" section to SystemStorageTab
  - Move `detailed_logs_enabled` toggle here (if not already in Task 19)
  - Move `call_log_pipeline_enabled` toggle here
  - Add `maxDetailSizeKb` slider (1-100 KB)
  - Add `ringBufferSize` number input (request_detail_logs max rows)
  - Wire to PATCH /api/settings/database
  - Info text: "These control what gets logged, not what gets kept"

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering`

  **References:**
  - `src/lib/db/detailedLogs.ts` — Ring buffer trigger, current 500-row limit
  - Key-value settings: `detailed_logs_enabled`, `call_log_pipeline_enabled`

  **Commit**: YES

- [x] 21. Add Cache settings section (move from CacheSettingsTab.tsx)

  **What to do:**
  - Add collapsible "Cache Settings" section to SystemStorageTab
  - Move ALL 6 cache settings from CacheSettingsTab.tsx:
    - semanticCacheEnabled (toggle)
    - semanticCacheMaxSize (number input)
    - semanticCacheTTL (number input, in ms)
    - promptCacheEnabled (toggle)
    - promptCacheStrategy (select: auto/system-only/manual)
    - alwaysPreserveClientCache (select: auto/always/never)
  - Wire to existing `/api/settings/cache-config` endpoint (PUT)
  - Match the existing UI pattern (Card + form fields + Save button)
  - After verified working: DELETE `CacheSettingsTab.tsx`
  - Remove CacheSettingsTab import from `page.tsx`

  **Must NOT do:**
  - Do NOT delete CacheSettingsTab.tsx until new section is verified
  - Do NOT change the API endpoint (`/api/settings/cache-config`) — keep it as-is

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering`

  **References:**
  - `src/app/(dashboard)/dashboard/settings/components/CacheSettingsTab.tsx` — SOURCE: 6 settings to move (191 lines)
  - `src/app/(dashboard)/dashboard/settings/page.tsx` — Remove CacheSettingsTab import after move
  - `src/app/api/settings/cache-config/route.ts` — Existing cache config API

  **QA Scenarios:**
  ```
  Scenario: Cache settings work in System Storage tab
    Tool: Playwright
    Steps:
      1. Navigate: System Storage tab → Cache Settings section
      2. Toggle: "Semantic Cache" OFF
      3. Click: "Save Cache Settings"
      4. Reload page
      5. Verify: Semantic cache still OFF
    Expected Result: Cache settings persist correctly
    Evidence: .sisyphus/evidence/task-21-cache.png

  Scenario: CacheSettingsTab.tsx removed
    Tool: Bash
    Steps:
      1. Verify CacheSettingsTab.tsx does NOT exist
      2. Verify page.tsx does NOT import CacheSettingsTab
      3. Run npm run build → success
    Expected Result: No build errors after removal
    Evidence: .sisyphus/evidence/task-21-cleanup.txt
  ```

  **Commit**: YES

- [x] 22. Verify backup/restore/import/export section (already exists)

  **What to do:**
  - The backup/restore/import/export section ALREADY EXISTS in SystemStorageTab
  - Verify it still works after new sections are added
  - Only extend if needed: add auto-backup frequency dropdown, keep-last-N slider
  - Ensure backup retention config wires to new database settings API
  - Wire backup cleanup options to new DB settings endpoint

  **Must NOT do:**
  - Do NOT rewrite the existing backup section — it already works
  - Do NOT break existing backup/restore functionality

  **Recommended Agent Profile:**
  - **Category**: `quick` - Minimal changes, mostly verification

- [x] 23. Add retention policy settings UI

  **What to do:**
  - Add collapsible "Database Retention" section to SystemStorageTab
  - 7 sliders for per-table retention (quotaSnapshots, compressionAnalytics, mcpAudit, a2aEvents, callLogs, usageHistory, memoryEntries)
  - Auto-cleanup toggle
  - "Run Cleanup Now" button
  - Each slider shows: table name, current row count, rows that would be cleaned
  - Move `memoryRetentionDays` from Memory settings to here
  - Replace hardcoded env vars (`CALL_LOG_RETENTION_DAYS`, `APP_LOG_RETENTION_DAYS`) with DB settings

  **Must NOT do:**
  - Do NOT delete any hardcoded env var support yet (keep as fallback)

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering`

  **References:**
  - `src/lib/memory/settings.ts` — Memory retention settings (to be consolidated)
  - `src/lib/logEnv.ts` — Hardcoded CALL_LOG_RETENTION_DAYS, APP_LOG_RETENTION_DAYS
  - `src/lib/db/quotaSnapshots.ts:cleanupOldSnapshots()` — Quota cleanup function

  **Commit**: YES

- [x] 24. Add compression/aggregation settings UI

  **What to do:**
  - Add collapsible "Database Compression" section to SystemStorageTab
  - Aggregation toggle + raw data retention slider + granularity dropdown
  - "Run Aggregation Now" button (backfill trigger)
  - Note: prompt compression settings stay in Context & Cache tab — add link to that section
  - Compression analytics retention links to Retention section

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering`

  **References:**
  - `src/app/api/settings/compression/route.ts` — Compression settings endpoint
  - `src/app/(dashboard)/dashboard/analytics/CompressionAnalyticsTab.tsx` — Compression analytics UI

  **Commit**: YES

- [x] 25. Add optimization settings UI

  **What to do:**
  - Add collapsible "Database Optimization" section to SystemStorageTab
  - Auto-vacuum mode dropdown (NONE/FULL/INCREMENTAL)
  - Scheduled VACUUM dropdown (never/daily/weekly/monthly)
  - Vacuum hour number input (0-23)
  - Page size select with restart warning
  - Cache size slider (-512 to -100000 KB)
  - "Run VACUUM Now" button with progress indicator
  - "Run ANALYZE Now" button
  - "Check Integrity" button (runs PRAGMA integrity_check)

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering`

  **References:**
  - Database optimization methods documented in plan's "Database Compression & Optimization Methods" section

  **QA Scenarios:**
  ```
  Scenario: Run VACUUM from UI
    Tool: Playwright
    Steps:
      1. Navigate: Database tab → Optimization section
      2. Note: Current database size displayed
      3. Click: "Run VACUUM Now"
      4. Verify: Progress indicator appears
      5. Verify: Success message with before/after size
    Expected Result: VACUUM executes and reports results
    Evidence: .sisyphus/evidence/task-25-optimization.png
  ```

  **Commit**: YES

- [x] 26. Add database stats display

  **What to do:**
  - Stats card at top of Optimization section (or as standalone card)
  - Show: database size, page count, free pages, fragmentation %
  - Show: last VACUUM time, last ANALYZE time, last cleanup time
  - Show: integrity status (ok/error/not checked)
  - Auto-refresh every 30 seconds or on action
  - Visual indicator: green/yellow/red based on health

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering`

  **Commit**: YES

- [x] 27. Remove CacheSettingsTab + move scattered settings into SystemStorageTab

  **What to do:**
  - Delete `CacheSettingsTab.tsx` (settings already moved in Task 21)
  - Remove CacheSettingsTab import from `page.tsx`
  - Find all database-related settings currently in other components
  - Add redirect/deprecation notices at old locations: "Configure in System Storage → [section]"
  - Move `memoryRetentionDays` from MemorySkillsTab → SystemStorageTab Retention section
  - Replace hardcoded env vars in `logEnv.ts` with DB settings reads
  - Ensure backward compatibility (old API endpoints still work)

  **Settings to consolidate (from scattered locations):**
  - `memoryRetentionDays` → from MemorySkillsTab → System Storage → Retention
  - `detailed_logs_enabled` → already in SystemStorageTab → Purge/Logs
  - `call_log_pipeline_enabled` → already in SystemStorageTab → Logs
  - `CALL_LOG_RETENTION_DAYS` (env) → from `logEnv.ts` → DB settings
  - `APP_LOG_RETENTION_DAYS` (env) → from `logEnv.ts` → DB settings
  - Cache settings → already moved in Task 21, delete CacheSettingsTab.tsx

  **Must NOT do:**
  - Do NOT break existing API endpoints (keep as aliases)
  - Do NOT remove settings from MemorySkillsTab until SystemStorageTab section is verified

  **Recommended Agent Profile:**
  - **Category**: `visual-engineering`

  **References:**
  - `src/app/(dashboard)/dashboard/settings/components/CacheSettingsTab.tsx` — DELETE this file
  - `src/app/(dashboard)/dashboard/settings/page.tsx` — Remove CacheSettingsTab import
  - `src/app/(dashboard)/dashboard/settings/components/MemorySkillsTab.tsx` — Remove memoryRetentionDays
  - `src/lib/logEnv.ts` — Replace hardcoded env vars with DB settings
  - `src/app/api/settings/memory/route.ts` — Memory settings API
  - `src/app/api/settings/purge-logs/route.ts` — Purge endpoint

  **QA Scenarios:**
  ```
  Scenario: All DB/Cache settings accessible from System Storage tab
    Tool: Playwright
    Steps:
      1. Navigate: /dashboard/settings → AI tab → scroll to System Storage
      2. Verify: All new sections present (Purge, Logs, Cache, Retention, Compression, Optimization)
      3. Verify: Cache settings work (semantic cache toggle, prompt cache settings)
      4. Verify: No CacheSettingsTab.tsx in imports
      5. Run npm run build → success
    Expected Result: Everything database/cache-related in System Storage tab
    Evidence: .sisyphus/evidence/task-27-consolidated.png

  Scenario: Memory retention moved from MemorySkillsTab
    Tool: Bash
    Steps:
      1. Grep MemorySkillsTab.tsx for "retentionDays" → should NOT exist
      2. Grep SystemStorageTab.tsx for "memoryEntries" → should exist
    Expected Result: Memory retention lives in SystemStorageTab only
    Evidence: .sisyphus/evidence/task-27-memory-moved.txt
  ```

  **Commit**: YES

### Wave 5: Verification

- [x] 28. Verify aggregation accuracy

  **What to do:**
  - Compare raw sums vs aggregated sums
  - Test with different granularity settings
  - Verify across all providers
   
  **Recommended Agent Profile:**
  - **Category**: `deep` - Comprehensive testing
   
  **Acceptance Criteria:**
   
  **QA Scenarios:**
  ```
  Scenario: Aggregated cost matches raw exactly
    Tool: Bash test
    Steps:
      1. Query raw: SELECT SUM(cost) FROM call_logs
      2. Query agg: SELECT SUM(total_cost) FROM daily_usage_summary
      3. Compare: Difference < 0.001
    Expected Result: 100% accuracy
    Evidence: .sisyphus/evidence/task-28-accuracy.txt
  ```
   
  **Commit**: YES

- [x] 29. Performance test with configurable settings

  **What to do:**
  - Test query speed with different retention settings
  - Test with different page sizes
  - Benchmark before/after
  
  **Recommended Agent Profile:**
  - **Category**: `deep`

  **QA Scenarios:**
  ```
  Scenario: Cost page loads fast with aggregation enabled
    Tool: Bash
    Steps:
      1. time curl -s http://localhost:20128/api/analytics/cost?start=2026-04-01 | jq '.total'
      2. Verify: Response < 2 seconds
    Expected Result: Cost page loads in < 2s
    Evidence: .sisyphus/evidence/task-29-perf.json

  Scenario: Query speed improves with smaller retention
    Tool: Bash
    Steps:
      1. Set retention to 7 days
      2. Run: time curl .../cost | jq '.total'
      3. Set retention to 90 days
      4. Run: time curl .../cost | jq '.total'
    Expected Result: 7-day retention is faster than 90-day
    Evidence: .sisyphus/evidence/task-29-retention-perf.txt
  ```

  **Commit**: YES

- [x] 30. Test settings persistence

  **What to do:**
  - Change settings, restart app
  - Verify settings restored
  - Test migration from old versions
  
  **Recommended Agent Profile:**
  - **Category**: `deep`

  **QA Scenarios:**
  ```
  Scenario: Settings persist after app restart
    Tool: Bash + Playwright
    Steps:
      1. PUT /api/settings/database { "retention": { "quotaSnapshots": 3 } }
      2. Kill and restart app
      3. GET /api/settings/database | jq '.retention.quotaSnapshots'
    Expected Result: Returns 3 (not default 7)
    Evidence: .sisyphus/evidence/task-30-persistence.json

  Scenario: Settings persist in UI after restart
    Tool: Playwright
    Steps:
      1. Navigate: Settings → System Storage → Retention
      2. Change quota snapshots slider to 5
      3. Save
      4. Reload page
      5. Verify: Slider shows 5
    Expected Result: UI shows persisted value
    Evidence: .sisyphus/evidence/task-30-ui-persist.png
  ```

  **Commit**: YES

- [x] 31. Verify all DB settings consolidated (no scatter)

  **What to do:**
  - Search codebase for database-related settings outside SystemStorageTab
  - Verify CacheSettingsTab.tsx is DELETED
  - Verify memoryRetentionDays is NOT in MemorySkillsTab
  - Verify all old locations redirect or show "moved" notice
  - Confirm API backward compatibility
  
  **Recommended Agent Profile:**
  - **Category**: `quick`

  **QA Scenarios:**
  ```
  Scenario: No scattered database settings
    Tool: Bash
    Steps:
      1. grep -r "detailed_logs_enabled" src/app --include="*.tsx" | grep -v SystemStorageTab
      2. grep -r "call_log_pipeline_enabled" src/app --include="*.tsx" | grep -v SystemStorageTab
      3. grep -r "memoryRetentionDays" src/app --include="*.tsx" | grep -v SystemStorageTab
    Expected Result: All results in SystemStorageTab only
    Evidence: .sisyphus/evidence/task-31-no-scatter.txt

  Scenario: CacheSettingsTab.tsx deleted
    Tool: Bash
    Steps:
      1. ls src/app/(dashboard)/dashboard/settings/components/CacheSettingsTab.tsx
    Expected Result: File not found
    Evidence: .sisyphus/evidence/task-31-cache-deleted.txt
  ```

  **Commit**: YES

- [x] 32. Database size validation

  **What to do:**
  - Measure size before/after optimization
  - Document space savings
  
  **Recommended Agent Profile:**
  - **Category**: `quick`

  **QA Scenarios:**
  ```
  Scenario: Database shrinks after VACUUM
    Tool: Bash
    Steps:
      1. Before: ls -la ~/.omniroute/storage.sqlite
      2. Run VACUUM via UI
      3. After: ls -la ~/.omniroute/storage.sqlite
    Expected Result: File size reduced by 50%+
    Evidence: .sisyphus/evidence/task-32-size.json
  ```

  **Commit**: YES

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Verify: All 32 TODOs implemented, all settings user-configurable, 0 hardcoded values, UI present with all new sections in SystemStorageTab. CacheSettingsTab.tsx deleted. All database-related settings consolidated into System Storage tab. VERDICT

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run typecheck + lint. Check for hardcoded retention values. Verify no database settings scattered outside SystemStorageTab. Verify CacheSettingsTab.tsx is deleted. VERDICT

- [x] F3. **Integration QA** — `unspecified-high` (+ `playwright`)
  Test: Settings change → API → Database → Query → Display. Screenshot all new sections. Test backup/restore round-trip. Test purge with confirmation. Test cache settings save/load. VERDICT

- [x] F4. **Scope Fidelity Check** — `deep`
  Verify: No hardcoded retention, all user-configurable, no data loss, all DB settings in System Storage tab. Flag any database/cache settings found outside SystemStorageTab. Verify CacheSettingsTab.tsx removed. VERDICT

---

## Success Criteria

### Verification Commands

```bash
# 1. Settings API works
curl http://localhost:20128/api/settings/database | jq

# 2. User can change retention
curl -X PATCH http://localhost:20128/api/settings/database \
  -H "Content-Type: application/json" \
  -d '{"retention": {"quotaSnapshots": 3}}'

# 3. Aggregation accuracy
node --import tsx/esm --test tests/unit/aggregation-accuracy.test.ts

# 4. Performance test
npm run test:perf:database

# 5. Size check
sqlite3 ~/.omniroute/storage.sqlite "SELECT page_count * page_size / 1024 / 1024"

# 6. Settings persisted after restart
# (Restart app, verify settings)
```

### Final Checklist

- [ ] All settings user-configurable via Settings → AI → System Storage tab (expanded)
- [ ] ALL database-related settings consolidated into System Storage tab (no scatter)
- [ ] CacheSettingsTab.tsx deleted (all cache settings moved into SystemStorageTab)
- [ ] No hardcoded retention values anywhere (env vars replaced by DB settings)
- [ ] Aggregation respects user's rawDataRetentionDays
- [ ] Auto-vacuum mode user-configurable (FULL/INCREMENTAL/NONE)
- [ ] Manual VACUUM button works
- [ ] Page size and cache size configurable
- [ ] Per-table retention policies work (7 tables)
- [ ] Backup/restore/import/export all work from System Storage tab (existing)
- [ ] Purge operations require confirmation
- [ ] Database location displayed (read-only, existing)
- [ ] Log settings (detailed logs, pipeline, ring buffer) in System Storage tab
- [ ] Memory retention moved to System Storage → Retention
- [ ] Cache settings (semantic/prompt) in System Storage → Cache section
- [ ] Cost page loads < 2s
- [ ] Aggregated totals match raw data (100% accuracy)
- [ ] Settings persist across restarts
- [ ] Database size reduces by 50%+
- [ ] UI shows database stats
- [ ] Scheduled maintenance runs at configured hour

---

## Commit Strategy

- **Wave 1**: `feat(settings): add database settings schema and API endpoints`
- **Wave 2**: `feat(aggregation): add configurable aggregation engine`
- **Wave 3**: `feat(optimization): add user-configurable compression and cleanup`
- **Wave 4**: `feat(ui): expand SystemStorageTab with cache, retention, optimization sections`
- **Wave 5**: `test(database): add comprehensive verification tests`

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User sets retention too low | Medium | High | Minimum 1 day enforced, warning in UI |
| User disables aggregation | Medium | High | Explain performance impact, suggest minimum retention |
| VACUUM takes too long | Medium | Medium | Run off-hours, show progress, allow cancellation |
| Page size change requires rebuild | Low | Medium | Warn user, schedule for restart |
| Settings migration fails | Low | High | Fallback to defaults, log error |

---

## Settings Page UI Structure — Expanded System Storage Tab

> **KEY DECISION**: Do NOT create a new "Database" tab. Expand the EXISTING `SystemStorageTab.tsx`.
> The tab keeps its current name "System Storage" and existing sections, with new collapsible sections added.
> `CacheSettingsTab.tsx` is removed after its settings are moved in.

```
Settings → AI → System Storage (EXPANDED, existing tab)
│
│  EXISTING SECTIONS (keep as-is):
│
├── 📊 Storage Health (ALREADY EXISTS)
│   ├── Database path: ~/.omniroute/storage.sqlite (read-only)
│   ├── Size: 238 MB
│   ├── WAL file size: 12 MB
│   ├── Pages: 60,934
│   ├── Call retention: 7d, App retention: 7d
│   └── Schema version: 34
│
├── 📥 Export/Import JSON (ALREADY EXISTS)
│   ├── [Button] Export JSON
│   └── [Button] Import JSON + file picker + confirmation
│
├── 💾 Backup/Restore (ALREADY EXISTS)
│   ├── Last backup timestamp
│   ├── [Button] Backup Now
│   ├── Backup retention config
│   └── Backup history list with restore/delete
│
├── 🔧 Maintenance (ALREADY EXISTS)
│   ├── [Button] Clear Cache
│   └── [Button] Purge Expired Logs
│
│  NEW SECTIONS (add below existing):
│
├── 🗑️ 5. Database Purge (NEW)
│   ├── [Toggle] Enable detailed request logging (detailed_logs_enabled)
│   ├── [Toggle] Enable call log pipeline (call_log_pipeline_enabled)
│   ├── [Slider] Call log retention: 7 days (1-365)
│   ├── [Slider] App log retention: 7 days (1-365)
│   ├── [Button] 🧹 Purge All Logs Now
│   ├── [Button] 🧹 Purge Call Logs
│   ├── [Button] 🧹 Purge Quota Snapshots
│   ├── [Button] 🧹 Purge Compression Analytics
│   └── ⚠️ Confirmation dialog before any purge
│
├── 📋 6. Database Logs (NEW)
│   ├── [Toggle] Detailed logs (request/response bodies)
│   ├── [Toggle] Call log pipeline
│   ├── [Slider] Max detail size per request: 10 KB (1-100)
│   ├── [Slider] Ring buffer size (request_detail_logs): 500 rows
│   └── Info: "These control what gets logged, not what gets kept"
│
├── 🗄️ 7. Cache Settings (NEW — moved from CacheSettingsTab.tsx)
│   ├── [Toggle] Semantic cache enabled
│   ├── [Number] Semantic cache max size: 100
│   ├── [Number] Semantic cache TTL: 1800000 ms (30 min)
│   ├── [Toggle] Prompt cache enabled
│   ├── [Select] Prompt cache strategy: auto / system-only / manual
│   ├── [Select] Always preserve client cache: auto / always / never
│   └── [Button] Save Cache Settings
│
├── ⏰ 8. Database Retention (NEW)
│   ├── Quota snapshots: [Slider] 7 days (1-365)
│   ├── Compression analytics: [Slider] 30 days (1-365)
│   ├── MCP audit logs: [Slider] 30 days (1-365)
│   ├── A2A events: [Slider] 30 days (1-365)
│   ├── Call logs: [Slider] 30 days (1-365)
│   ├── Usage history: [Slider] 30 days (1-365)
│   ├── Memory entries: [Slider] 30 days (1-365)
│   ├── [Toggle] Auto-cleanup: [✓]
│   └── [Button] 🧹 Run Cleanup Now
│
├── 🗜️ 9. Database Compression (NEW)
│   ├── Prompt compression: (links to Context & Cache → Compression)
│   ├── [Toggle] Enable time-based aggregation
│   ├── [Slider] Keep raw data for: 30 days (1-365)
│   ├── [Dropdown] Aggregation granularity: Daily
│   ├── Compression analytics retention: (see Retention above)
│   └── [Button] 🔄 Run Aggregation Now
│
└── ⚡ 10. Database Optimization (NEW)
    ├── Size: 238 MB
    ├── Pages: 60,934
    ├── Free pages: 1,247
    ├── Last VACUUM: 2026-05-01 02:00
    ├── Last optimization: 2026-05-04 03:00
    ├── [Dropdown] Auto-vacuum mode: Full
    ├── [Dropdown] Scheduled VACUUM: Weekly
    ├── [Number] Run at hour: 2 (0-23)
    ├── [Select] Page size: 4096 bytes (⚠️ requires restart)
    ├── [Slider] Cache size: -2000 KB (-512 to -100000)
    ├── [Button] 🔧 Run VACUUM Now
    ├── [Button] 📊 Run ANALYZE Now
    └── [Button] 🔍 Check Integrity
```

### Settings Currently Scattered (to be moved INTO SystemStorageTab)

| Setting | Current Location | Move To |
|---------|-----------------|---------|
| `detailed_logs_enabled` | Settings → General (?) | System Storage → Purge |
| `call_log_pipeline_enabled` | Settings → General (?) | System Storage → Logs |
| `memoryRetentionDays` | `/api/settings/memory` (MemorySkillsTab) | System Storage → Retention |
| `CALL_LOG_RETENTION_DAYS` (env) | `logEnv.ts` hardcoded | System Storage → Retention |
| `APP_LOG_RETENTION_DAYS` (env) | `logEnv.ts` hardcoded | System Storage → Retention |
| Semantic cache settings | `CacheSettingsTab.tsx` | System Storage → Cache (then DELETE CacheSettingsTab) |
| Prompt cache settings | `CacheSettingsTab.tsx` | System Storage → Cache (then DELETE CacheSettingsTab) |
| Compression settings | Context & Cache tab | System Storage → Compression (or keep link) |
| Purge logs | `/api/settings/purge-logs` | System Storage → Purge (already exists, extend) |
| Export/Import JSON | `/api/settings/export-json`, `/api/settings/import-json` | System Storage → (already exists) |
| SQLite backup | `/api/storage/health` | System Storage → (already exists) |
| `DATA_DIR` | Environment variable | System Storage → Location (display only, already exists) |

---

## Notes

### Why User-Configurable?

- **Power users** may want longer raw retention for debugging
- **Resource-constrained** users may want shorter retention
- **Compliance requirements** may mandate specific retention periods
- **Performance tuning** requires experimentation with different settings

### Page Size Change Requirements

Page size can only be changed on:
1. New database (before any tables created)
2. After `PRAGMA page_size = X; VACUUM;`

For existing databases, this requires:
1. Export data
2. Close database
3. Delete file
4. Reopen with new page_size
5. Import data

UI will show warning: "⚠️ Changing page size requires database rebuild (data export/import)."

### Cache Size is Runtime-Only

Cache size can be changed anytime:
```sql
PRAGMA cache_size = -10000;  -- 10MB
```
No restart required. Takes effect immediately for new queries.

### Auto-Vacuum Mode Change

Requires:
```sql
PRAGMA auto_vacuum = FULL;
VACUUM;  -- Rebuilds entire database
```

This is a heavy operation. UI will warn: "⚠️ Changing auto-vacuum mode requires full database rebuild."

---

Plan generated: 2026-05-04
Updated: Expand EXISTING SystemStorageTab (not new tab). CacheSettingsTab absorbed. Keep "System Storage" name.
Ready for `/start-work` execution
