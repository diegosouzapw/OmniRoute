# Task 2.08 — Test: Emergency Fallback + Quota Monitor + Role Normalizer

## Metadata
- **Phase**: 2
- **Source files**: `open-sse/services/emergencyFallback.ts`, `open-sse/services/quotaMonitor.ts`, `open-sse/services/quotaPreflight.ts`, `open-sse/services/roleNormalizer.ts`
- **Test files to create**: One per service in `tests/unit/`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read each source file
2. Check existing: `tests/unit/quota-policy-generalization.test.mjs`

## Test Scenarios

### emergencyFallback.ts (~8)
- Fallback decision logic; provider health check; isFallbackDecision; shouldUseFallback with various error types

### quotaMonitor.ts (~6)
- Quota tracking per provider; alert thresholds; quota exhaustion detection; recovery; per-model quota

### quotaPreflight.ts (~5)
- Pre-request quota check; sufficient quota → pass; insufficient → reject with info; quota cache freshness

### roleNormalizer.ts (~6)
- Message role normalization across formats; developer → system; unknown roles; case sensitivity; empty role

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] services/ coverage improves to ≥ 68%
