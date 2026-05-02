# Task 16 - Enforce Compression Settings Contracts

> **Priority**: P1
> **Effort**: 90 min
> **Dependencies**: Tasks 04, 05 if using preserved blocks for custom patterns
> **Branch**: `release/v3.7.9`

---

## Problem

Some settings are exposed in DB/API/dashboard but are not fully honored by the runtime.

Confirmed gaps:

- `preserveSystemPrompt` exists but does not centrally govern every compression mode.
- `cavemanConfig.preservePatterns` exists but is not applied in `cavemanCompress()`.
- `autoTriggerTokens` always selects `lite`, even when `defaultMode` is stronger.

This creates false confidence in the UI and API.

---

## Solution

Define and enforce these contracts:

### `preserveSystemPrompt`

When true:

- system messages are not rewritten by any compression mode;
- duplicate system prompt removal is skipped or limited to exact duplicate removal only if
  explicitly documented;
- aggressive aging/summarizer must not summarize system messages.

### `preservePatterns`

User-supplied regex strings must:

- be validated by the settings API;
- be compiled safely at runtime;
- preserve matching spans using the preserved-block pipeline;
- fail closed on invalid patterns.

### `autoTriggerMode`

Add optional setting:

```typescript
autoTriggerMode?: CompressionMode;
```

Default can stay `lite` for backward compatibility, but the UI/API must make that explicit.

---

## Files

- `open-sse/services/compression/types.ts`
- `open-sse/services/compression/strategySelector.ts`
- `open-sse/services/compression/caveman.ts`
- `open-sse/services/compression/lite.ts`
- `open-sse/services/compression/aggressive.ts`
- `open-sse/services/compression/ultra.ts`
- `src/lib/db/compression.ts`
- `src/app/api/settings/compression/route.ts`
- `CompressionSettingsTab.tsx`
- Tests under `tests/unit/compression/`

---

## Tests

Add tests for:

- system prompts unchanged in all modes when `preserveSystemPrompt=true`;
- system prompts may compress only when explicitly configured;
- valid `preservePatterns` protect spans;
- invalid `preservePatterns` fail validation or are ignored with an explicit warning;
- `autoTriggerMode` chooses configured mode;
- old config without `autoTriggerMode` still behaves as `lite`.

---

## Acceptance Criteria

- Every exposed compression setting has a tested runtime effect.
- Dashboard labels match actual behavior.
- Backward compatibility is maintained for existing DB rows.

---

## Rollback

Remove `autoTriggerMode`, restore old strategy selector behavior, and remove custom
pattern application.
