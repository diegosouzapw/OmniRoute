---
title: "Model Exposure Allow/Deny List"
version: 3.8.51
lastUpdated: 2026-08-29
---

# Model Exposure Allow/Deny List

> Opt-in, off by default (`modelVisibilityAllowlist`/`modelVisibilityDenylist` both empty leaves
> the `/v1/models` catalog AND every `auto/*` candidate pool byte-identical). A sibling of
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) for operators who want a curated
> model list for reasons that have nothing to do with cost.

## Why this exists

`hidePaidModels` answers "is this model free?" and `hideAutoCombos` answers "should `auto/*`
virtual ids be advertised at all?" — neither lets an operator curate an arbitrary subset of
models (e.g. presenting exactly the models a given Claude Code / OpenCode client should see,
independent of pricing). #11481 adds that as two independent, opt-in string-array settings.

## Settings

| Key                          | Type       | Default | Meaning                                                          |
| ----------------------------- | ---------- | ------- | ----------------------------------------------------------------- |
| `modelVisibilityDenylist`     | `string[]` | `[]`    | Entries matching a candidate hide it from the catalog/candidate pool. |
| `modelVisibilityAllowlist`    | `string[]` | `[]`    | When non-empty, ONLY entries matching a candidate stay exposed.   |

Both accept up to 500 entries of up to 200 characters each (Zod-validated in
`src/shared/validation/settingsSchemas.ts`). An entry is either:

- an exact catalog id — `"gpt-4o"` (bare model id) or `"openai/gpt-4o"` (provider-prefixed), or
- a glob pattern using `*`/`?` — e.g. `"openai/gpt-4*"` or `"anthropic/*"` — resolved via the
  same shared `globToRegex()` matcher (`src/shared/utils/globPattern.ts`) already used by
  `ModelRoutingSection`'s per-model combo mappings and `freeModels.ts::matchesOnlyPaidModels`.

Precedence: the denylist is checked first (a denied entry is always hidden, even if it also
matches the allowlist); when the allowlist is non-empty, only entries it matches survive.

## Two chokepoints, not one

The lesson from #6512 (a `hidePaidModels`-only catalog filter still let `auto/*` route to a
paid model, since the combo candidate pool was built independently) applies identically here.
The matching predicate `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) is
called from BOTH:

- `src/app/api/v1/models/catalog.ts` — the `/v1/models` listing itself, at the same 5 per-source
  chokepoints `shouldHidePaid()` already gates (static `PROVIDER_MODELS`, synced provider rows,
  custom rows, alias-backed rows, managed-fallback rows).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — called
  from `virtualFactory.ts::buildPreparedPool`, immediately after the equivalent
  `filterPaidOnlyCandidates()` call, so a denied model can never be selected into an `auto/*`
  candidate pool either.

## What is NOT filtered

Mirrors `hideAutoCombos`'s existing behaviour: a model id sent **explicitly** (not via `auto/*`,
and not discovered through the catalog listing) is never blocked at dispatch — only
advertisement/candidate-pool membership is filtered. This is independent of `hidePaidModels`;
an operator may want a curated set for reasons that have nothing to do with cost, so both
settings compose as independent AND-ed filters, same as the existing multi-flag composition in
`catalog.ts`.

Settings export (`GET /api/settings/export-json`) includes both arrays verbatim, like any other
settings field — unlike `hidePaidModels`'s combo-step export filter, there is no re-hydration
risk here: a denied id embedded in an exported combo step is the operator's own explicit routing
choice, not something the export boundary needs to strip.
