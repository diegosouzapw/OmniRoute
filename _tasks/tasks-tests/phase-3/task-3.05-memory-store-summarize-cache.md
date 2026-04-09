# Task 3.05 — Test: Memory Store, Summarization, Cache

## Metadata
- **Phase**: 3
- **Source files**: `src/lib/memory/store.ts`, `src/lib/memory/summarization.ts`, `src/lib/memory/cache.ts`
- **Test files to create**: `tests/unit/memory-store.test.mjs`, `tests/unit/memory-summarization.test.mjs`, `tests/unit/memory-cache.test.mjs`
- **Estimated assertions**: ~20

## Pre-requisites
1. Read each source file
2. Check existing: `tests/unit/memory-extraction.test.mjs`, `tests/unit/memory-settings.test.mjs`
3. Read: `src/lib/memory/__tests__/` (Vitest collocated tests)

## Test Scenarios

### store.ts (~8): CRUD operations; TTL cleanup; capacity limits; store by key ID; list memories; search memories; delete old memories; edge: empty store

### summarization.ts (~6): Summarization trigger conditions; token limit enforcement; summary generation (mocked LLM call); incremental summarization; empty conversation; long conversation handling

### cache.ts (~6): LRU insertion; LRU eviction when full; cache hit; cache miss; hit/miss tracking stats; clear cache

## Acceptance Criteria
- [ ] All 20 assertions pass
- [ ] memory/ coverage reaches ≥ 75%
