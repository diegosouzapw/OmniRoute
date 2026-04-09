# Task 6.04 — Executors + Stream Utilities

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `open-sse/executors/kiro.ts` (24.57% → 70%+)
  - `open-sse/executors/cursor.ts` (64.34% → 80%+)
  - `open-sse/executors/antigravity.ts`
  - `open-sse/utils/stream.ts` (66.97% → 82%+)
  - `open-sse/utils/streamPayloadCollector.ts` (57.05% → 80%+)
  - `open-sse/utils/cursorProtobuf.ts` (70.12% → 85%+)
  - `open-sse/utils/proxyFetch.ts` (44.91% → 75%+)
- **Test files to extend/create**:
  - `tests/unit/executor-kiro.test.mjs`
  - `tests/unit/executor-cursor-extended.test.mjs`
  - `tests/unit/executor-antigravity.test.mjs`
  - `tests/unit/stream-utils.test.mjs`
  - `tests/unit/cursor-protobuf.test.mjs`
  - `tests/unit/proxy-fetch.test.mjs`
- **Estimated assertions**: ~40

## Pre-requisites
1. Read all target executors and utilities
2. Reuse fetch mocks and synthetic SSE payloads instead of broad fixtures
3. Capture branch gaps with a focused `c8` report

## Focus Areas
- Auth/header assembly and endpoint selection branches
- Provider-specific retries, proxy configuration, and timeout behavior
- Binary / protobuf decoding edge cases
- Stream chunk aggregation, malformed frames, and collector reset paths
- Proxy fetch behavior with upstream errors and abort signals

## Acceptance Criteria
- [ ] `kiro.ts` is no longer a long-tail outlier below 30% lines
- [ ] Stream utility tests cover malformed and partial payloads
- [ ] Executor group reaches 78%+ lines overall
- [ ] Utility group reaches 80%+ lines overall

