# Learnings — Phase 3 Aggressive Compression

## 2026-04-28 Session Start

### Codebase State
- `CompressionMode` already includes `"aggressive"` in types.ts (line 10)
- DB uses `key_value` table with `namespace='compression'` — NO `compression_settings` table
- Latest migration is `030_caveman_compression_tests.sql` (SELECT 1 no-op)
- `compression.ts` uses switch on `key` for read, upsert for write
- Existing modules: `lite.ts`, `caveman.ts`, `cavemanRules.ts`, `preservation.ts`, `strategySelector.ts`, `stats.ts`, `types.ts`, `index.ts`
- Existing tests: 7 caveman test files in `tests/unit/compression/`
- `CompressionConfig` has optional `cavemanConfig?: CavemanConfig` — same pattern for `aggressive?: AggressiveConfig`
- `CompressionStats` has `techniquesUsed: string[]` and `rulesApplied?: string[]` — extended with `aggressive?` breakdown

### Key Decisions (from plan patches)
- Migration 031 = `SELECT 1` no-op (like 030) — aggressive config stored as kv key
- `compression.ts` needs `case "aggressiveConfig":` branch in read/write switch ✓ DONE
- T1 must NOT re-add `"aggressive"` to CompressionMode union (already exists) ✓ DONE
- QA scenarios in T5 must check kv key, NOT `.schema compression_settings`

### Implementation Progress
- T1 ✅: Added AggressiveConfig, Summarizer, SummarizerOpts, AgingThresholds, ToolStrategiesConfig, DEFAULT_AGGRESSIVE_CONFIG to types.ts
- T2 ✅: RuleBasedSummarizer with 22 tests passing
- T3 ✅: compressToolResult with 5 strategies + auto-detection, 25 tests passing
- T4 ✅: applyAging with 4-tier degradation, 15 tests passing
- T5 ✅: Migration 031 (SELECT 1 no-op) + compression.ts aggressiveConfig branch + getDefaultAggressiveConfig()
- T6 ✅: compressAggressive orchestrator with downgrade chain
- T7 ✅: 8 orchestrator unit tests passing
- Total: 83 Phase 3 tests + 12 caveman tests = all passing

### Patterns Discovered
- `cavemanCompress()` returns `{ body: { messages }, compressed: bool, stats }` — need to access `.body.messages` for result
- `applyLiteCompression()` returns same shape as cavemanCompress
- Import path from tests: `../../../open-sse/services/compression/xxx.ts`
- `extractText()` helper needed in multiple modules — consider extracting to shared utility
- `COMPRESSED_MARKER_RE = /^\[COMPRESSED:/` used in both summarizer and progressiveAging