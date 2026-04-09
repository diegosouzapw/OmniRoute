# Task 2.10 — Test: Utils Coverage

## Metadata
- **Phase**: 2
- **Source files**: All files in `open-sse/utils/` (~18 files, 51.97% coverage)
- **Test files to create**: Multiple in `tests/unit/`
- **Estimated assertions**: ~40

## Pre-requisites
1. Read each utils file
2. Check existing: `tests/unit/streamHelpers.test.mjs`

## Files to Test

### Priority (lowest coverage first):
```
- thinkTagParser.ts → tests/unit/think-tag-parser.test.mjs (~6 tests: extraction, injection, nested, malformed, empty, streaming)
- cacheControlPolicy.ts → tests/unit/cache-control-policy-utils.test.mjs (~6 tests: per-provider, per-format, user-agent, combo, disabled, default)
- aiSdkCompat.ts → tests/unit/ai-sdk-compat-utils.test.mjs (~5 tests: Accept header normalization, streaming detection, format inference, edge cases)
- ollamaTransform.ts → tests/unit/ollama-transform-utils.test.mjs (~5 tests: Ollama format transform, model name, options, streaming, error)
- cors.ts → tests/unit/cors-utils.test.mjs (~4 tests: origin resolution, wildcard, specific origin, missing)
- proxyFetch.ts → tests/unit/proxy-fetch-utils.test.mjs (~4 tests: proxy-aware fetch, direct, SOCKS, HTTP proxy)
- usageTracking.ts → tests/unit/usage-tracking-utils.test.mjs (~4 tests: aggregation, per-provider, per-model, reset)
- bypassHandler.ts → tests/unit/bypass-handler.test.mjs (~3 tests: bypass decision, whitelist, default)
- progressTracker.ts → tests/unit/progress-tracker.test.mjs (~3 tests: progress update, completion, error)
```

## Acceptance Criteria
- [ ] All ~40 assertions pass across multiple test files
- [ ] utils/ coverage reaches ≥ 70%
