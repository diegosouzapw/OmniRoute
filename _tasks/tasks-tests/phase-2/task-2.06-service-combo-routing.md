# Task 2.06 — Test: Combo Routing Engine

## Metadata
- **Phase**: 2
- **Source file**: `open-sse/services/combo.ts` (1,457 LoC)
- **Test file to create**: `tests/unit/combo-routing-engine.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~30

## Pre-requisites
1. Read: `open-sse/services/combo.ts`
2. Read: `open-sse/services/comboConfig.ts`, `open-sse/services/comboMetrics.ts`
3. Check existing: `tests/unit/model-combo-mappings.test.mjs`
4. Read: `src/shared/constants/routingStrategies.ts`

## Test Scenarios

### Strategy Resolution
```
1. round-robin strategy → sequential account rotation
2. weighted strategy → weight-proportional selection
3. priority strategy → highest priority first, fallback on failure
4. latency strategy → lowest latency account
5. random strategy → random selection (verify distribution)
6. fallback strategy → try each in order until success
7. Default strategy when none configured
```

### Model Selection
```
8. Exact model match in combo
9. Wildcard model match (provider/*)
10. Global wildcard (*)
11. Model alias resolution
12. No matching model → error
13. Multiple models → selection based on strategy
```

### Fallback Chains
```
14. Primary fails → fallback to next combo entry
15. All entries fail → error propagation
16. Rate limited entry → skip to next
17. Circuit breaker open → skip to next
18. Fallback with different provider
19. Fallback with same provider, different account
```

### Metrics & State
```
20. Metrics recording on success
21. Metrics recording on failure
22. Latency tracking
23. Request count per account
24. Error rate per account
```

### Edge Cases
```
25. Empty combo configuration
26. Single entry combo
27. Circular fallback prevention
28. Concurrent request handling (thundering herd)
29. Combo with disabled entry
30. Combo config hot reload
```

## Acceptance Criteria
- [ ] All 30 assertions pass
- [ ] combo.ts coverage reaches ≥ 75%
