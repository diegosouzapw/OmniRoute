# Implementation Plan: Select/Filter Models to List on Providers

> Issue: #750
> Idea: [_ideia/viable/750-select-models-filter.md](../../_ideia/viable/750-select-models-filter.md)
> Branch: `release/v3.5.6`

## Overview

Add model activation/deactivation toggles to the provider models list, allowing users to hide models without deleting them. Include "Select All / Deselect All" bulk operations and a search/filter bar.

## Pre-Implementation Checklist

- [ ] Read provider detail page model list section
- [ ] Read `src/lib/db/models.ts` for model schema
- [ ] Check `/v1/models` API route for filtering

## Implementation Steps

### Step 1: Database Migration — Add `is_active` column

**Files:**
- `src/lib/db/migrations/` — NEW migration file

**Details:**
```sql
ALTER TABLE models ADD COLUMN is_active INTEGER NOT NULL DEFAULT 1;
CREATE INDEX idx_models_is_active ON models(is_active);
```

### Step 2: Update DB Module

**Files:**
- `src/lib/db/models.ts` — MODIFY

**Details:**
- Add `toggleModelActive(modelId: string, isActive: boolean)` function
- Add `bulkToggleModels(providerPrefix: string, isActive: boolean)` function
- Update `getModels()` to accept optional `activeOnly: boolean` filter parameter

### Step 3: Update API Route `/v1/models`

**Files:**
- `src/app/api/v1/models/route.ts` — MODIFY

**Details:**
- Filter out models where `is_active = 0` from the response
- Inactive models should NOT appear in `/v1/models` endpoint

### Step 4: Create Toggle API Endpoint

**Files:**
- `src/app/api/models/toggle/route.ts` — NEW

**Details:**
- `PATCH /api/models/toggle` — toggle single model active state
- `PATCH /api/models/toggle-bulk` — toggle all models for a provider
- Auth middleware required

### Step 5: Update Provider Detail UI — Model List

**Files:**
- `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` — MODIFY

**Details:**
- Add toggle switch next to each model
- Add "Select All / Deselect All" buttons at top of model list
- Add search/filter input
- Visually dim inactive models (opacity/gray)
- Show count: "N of M models active"

### Step 6: i18n

**Translation keys:**
- `provider.modelActive` — "Active"
- `provider.modelInactive` — "Inactive"
- `provider.selectAll` — "Select All"
- `provider.deselectAll` — "Deselect All"
- `provider.modelsActive` — "{count} of {total} models active"
- `provider.filterModels` — "Search models..."

### Step 7: Tests

**Test cases:**
- [ ] Migration adds `is_active` column
- [ ] `toggleModelActive` updates DB correctly
- [ ] `bulkToggleModels` affects all models for a provider
- [ ] `/v1/models` excludes inactive models
- [ ] Toggle API validates auth

## Verification Plan

1. Run `npm run build` — must pass
2. Run tests — all pass
3. Run `npm run lint` — no new errors

## Commit Plan

```
feat: add model activation/deactivation toggles in provider UI (#750)
```
