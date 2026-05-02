# Task 19 - Replace Hardcoded Dashboard Rule List With Rule Metadata

> **Priority**: P2
> **Effort**: 75 min
> **Dependencies**: Tasks 01, 02, 03, 09, 11
> **Branch**: `release/v3.7.9`

---

## Problem

`CompressionSettingsTab.tsx` contains a hardcoded `ALL_CAVEMAN_RULES` array. When new
rules are added (`articles`, `pleasantries`, `leader_phrases`, `redundant_phrasing`) or
rules gain intensity metadata, the dashboard can drift from the backend.

---

## Solution

Expose rule metadata from the backend and have the dashboard render from it.

Metadata should include:

```typescript
interface CavemanRuleMetadata {
  name: string;
  category: string;
  context: "all" | "user" | "system" | "assistant";
  intensities?: Array<"lite" | "full" | "ultra">;
  description: string;
  risky?: boolean;
}
```

Implementation options:

1. Export metadata from `cavemanRules.ts` and serve it through a settings API route.
2. Add `/api/settings/compression/rules`.
3. Keep a fallback static list in the UI only for API failure.

---

## Files

- `open-sse/services/compression/cavemanRules.ts`
- `src/app/api/settings/compression/rules/route.ts`
- `CompressionSettingsTab.tsx`
- i18n messages if visible labels are localized
- Tests for route and UI helper

---

## Tests

Add tests for:

- all backend rules have metadata;
- rules API returns new rules;
- dashboard does not require hardcoded list;
- skipped rules still persist as names.

---

## Acceptance Criteria

- Adding a new rule in `cavemanRules.ts` does not require manual UI list edits.
- UI displays intensity/category context.
- Existing saved `skipRules` values still work.

---

## Rollback

Restore hardcoded list and manually add new rule names. This is acceptable only as a
temporary fallback.
