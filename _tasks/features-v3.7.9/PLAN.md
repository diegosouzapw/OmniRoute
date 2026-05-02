# Caveman Compression Pipeline - v3.7.9 Expanded Feature Plan

> **Origin**: Deep code review comparing OmniRoute's compression pipeline against
> [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman), local reference
> `_references/_outros/caveman` at commit `ef6050c` / tag `v1.7.0`.
>
> **Goal**: Close all Caveman parity gaps, harden compression safety, port recent
> upstream MCP shrink/stat features, and make OmniRoute's compression behavior testable
> end to end.

---

## Current Verdict

OmniRoute already has a real proxy-side compression pipeline with `off`, `lite`,
`standard`, `aggressive`, and `ultra` modes. It also has DB-backed settings,
analytics, preview API, MCP management tools, and dashboard controls.

Still missing for "100%" Caveman coverage:

1. Core Caveman rules are incomplete (`articles`, `pleasantries`, `leaders`,
   redundant phrasing).
2. Preservation is not robust enough for production prompt rewriting.
3. There is no post-compression validation fallback.
4. `caveman-shrink` MCP description compression is not ported.
5. Caveman upstream's primary value is terse **output**; OmniRoute currently mostly
   compresses **input/context**.
6. `aggressive` and `ultra` need multimodal safety before broad enablement.
7. Some settings are exposed but not honored (`preserveSystemPrompt`,
   `preservePatterns`).
8. Compression MCP management tools need stricter schemas and aggregate status.
9. The full compression unit test gate is not currently green.
10. Golden tests are too weak for the desired parity claim.

Authoritative audit: `caveman-expansion-review.md`.

---

## Scope

| Area | Files Impacted |
|---|---|
| Caveman rule engine | `open-sse/services/compression/cavemanRules.ts` |
| Caveman orchestrator | `open-sse/services/compression/caveman.ts` |
| Output-mode instruction injection | New: `open-sse/services/compression/outputMode.ts`; `open-sse/handlers/chatCore.ts` |
| Preserved-block pipeline | `open-sse/services/compression/preservation.ts` |
| Post-compression validation | New: `open-sse/services/compression/validation.ts` |
| Multimodal-safe compression | `aggressive.ts`, `ultra.ts`, shared helper if needed |
| Settings contracts | `types.ts`, `strategySelector.ts`, `src/lib/db/compression.ts`, settings API/UI |
| MCP description compression | New: `open-sse/mcp-server/descriptionCompressor.ts`; `server.ts` |
| MCP compression management | `open-sse/mcp-server/tools/compressionTools.ts`, `schemas/tools.ts` |
| Preview diff | `src/app/api/compression/preview/route.ts`, new diff helper |
| Analytics / real receipts | `stats.ts`, `compressionAnalytics.ts`, analytics API/dashboard |
| Dashboard | `CompressionSettingsTab.tsx`, optional rule metadata API |
| Tests | `tests/unit/compression/*.test.ts`, `tests/golden-set/*.test.ts`, MCP tests |

---

## Task Summary

| # | Task | Priority | Effort | Status |
|---|---|---|---|---|
| 01 | Add article removal rule (`a/an/the`) | P0 | 15 min | Not started |
| 02 | Add pleasantries rule (`sure/certainly/of course/happy to`) | P0 | 15 min | Not started |
| 03 | Add leader removal rule (`I'll/Let me/You can/We will`) | P0 | 15 min | Not started |
| 04 | Fix fenced code block regex with line-based parser | P1 | 45 min | Not started |
| 05 | Use random sentinels for preserved block placeholders | P1 | 20 min | Not started |
| 06 | Add post-compression validation layer | P1 | 60 min | Not started |
| 07 | Add sentence re-capitalization after removals | P1 | 15 min | Not started |
| 08 | Port caveman-shrink protected patterns | P1 | 30 min | Not started |
| 09 | Add intensity sub-levels to standard mode | P2 | 60 min | Not started |
| 10 | Compress MCP tool descriptions in server responses | P1 | 90 min | Not started |
| 11 | Add `make sure to` / redundant phrasing rules | P2 | 15 min | Not started |
| 12 | Add compression preview diff endpoint | P2 | 45 min | Partial endpoint exists |
| 13 | Golden-set regression tests for all new rules | P1 | 60 min | Partial weak coverage |
| 14 | Add Caveman output mode via system instruction | P0 | 120 min | Not started |
| 15 | Make aggressive/ultra multimodal-safe | P0 | 90 min | Not started |
| 16 | Enforce settings contracts (`preserveSystemPrompt`, `preservePatterns`, auto trigger) | P1 | 90 min | Not started |
| 17 | Fix MCP compression configure/status contracts | P1 | 60 min | Not started |
| 18 | Restore full compression unit test gate | P1 | 45 min | Not started |
| 19 | Replace hardcoded dashboard rule list with rule metadata | P2 | 75 min | Not started |
| 20 | Add real usage stats / Caveman receipts | P2 | 120 min | Not started |
| 21 | Preserve Typst/LaTeX/math/frontmatter/headings/tables | P2 | 90 min | Not started |
| 22 | Add upstream parity benchmark suite | P2 | 90 min | Not started |

---

## Existing Task Amendments

The original task files 01-13 remain valid. Apply these adjustments when implementing them:

| Task | Amendment |
|---|---|
| 06 | Validation must return original text on hard error and record validation fallback stats. It must also expose validation warnings for preview/analytics. |
| 08 | Keep the original caveman-shrink protected patterns, but do not try to include all Typst/LaTeX/frontmatter work here. That is Task 21. |
| 09 | This is only Caveman input rule intensity. Do not use it as output-mode support; output mode is Task 14. |
| 10 | Must not compress tool-call response bodies. Only list metadata (`tools`, `prompts`, `resources`, `resourceTemplates`). Add env/settings kill switch. |
| 12 | Diff response must include preserved blocks, rule removals, validation warnings, and whether compression fell back to original. |
| 13 | Replace weak thresholds. The current savings test title says 20% but accepts 3%; new gate must assert real targets by mode. |

---

## Dependency Graph

```text
Core rules:
  Task 01
  Task 02
  Task 03
  Task 11
      -> Task 07
      -> Task 09
      -> Task 13
      -> Task 14

Preservation and validation:
  Task 04
      -> Task 05
      -> Task 08
      -> Task 21
      -> Task 06
      -> Task 12
      -> Task 13
      -> Task 22

Runtime safety:
  Task 15
      -> Task 18
      -> Task 13

Settings and MCP:
  Task 16
      -> Task 19
  Task 08
      -> Task 10
      -> Task 17

Observability:
  Task 06
      -> Task 20
  Task 14
      -> Task 20
  Task 22
      -> Task 20
```

---

## Execution Order

### Phase 0 - Make the gate trustworthy

1. Task 18: restore `tests/unit/compression/*.test.ts`.
2. Task 15: make `aggressive` and `ultra` safe for multimodal payloads.

Rationale: do not broaden compression while the module-level gate is red or while modes can
drop image parts.

### Phase 1 - Caveman core parity

1. Task 01: article removal.
2. Task 02: pleasantries.
3. Task 03: leaders.
4. Task 11: redundant phrasing.
5. Task 07: recapitalization and punctuation cleanup.
6. Task 13: golden regression coverage for the new rules.

### Phase 2 - Preservation safety

1. Task 04: line-based fence parser.
2. Task 05: random sentinels.
3. Task 08: caveman-shrink protected patterns.
4. Task 21: Typst/LaTeX/math/frontmatter/headings/tables.
5. Task 06: validation fallback.

### Phase 3 - Settings and UX contract

1. Task 16: enforce exposed settings.
2. Task 19: dashboard rule metadata.
3. Task 12: preview diff.

### Phase 4 - MCP parity with Caveman v1.7.0

1. Task 10: MCP description compression.
2. Task 17: MCP configure/status contracts.

### Phase 5 - Output-token parity

1. Task 09: standard-mode intensity sublevels.
2. Task 14: Caveman output mode via system instruction and auto-clarity.

### Phase 6 - Receipts and upstream benchmark

1. Task 22: upstream parity benchmark suite.
2. Task 20: real usage stats and Caveman receipts.

---

## Acceptance Criteria For 100%

The feature set is complete only when all conditions below are true:

1. `tests/unit/compression/*.test.ts` passes.
2. Golden-set tests prove:
   - no loss of code blocks, URLs, inline code, versions, frontmatter, headings, tables, or
     multimodal non-text parts;
   - expected savings targets per mode.
3. `standard` mode reaches Caveman full rule parity for English prose.
4. `aggressive` and `ultra` preserve multimodal arrays and non-text content.
5. Custom `preservePatterns` work and invalid patterns are handled safely.
6. `preserveSystemPrompt` has a documented and tested behavior in every mode.
7. MCP `tools/list`/`prompts/list`/`resources/list` descriptions can be compressed and can
   be disabled.
8. MCP compression status reports all modes, not only `standard`.
9. Output Caveman mode exists as an opt-in instruction layer and does not post-process or
   corrupt model output.
10. Auto-clarity bypasses Caveman output mode for security warnings, irreversible actions,
    clarification requests, and ambiguity-prone multi-step instructions.
11. Preview endpoint shows changed text, preserved blocks, rule-level removals, validation
    warnings, and fallback status.
12. Analytics can distinguish estimated savings from real provider usage receipts.

---

## Verification Commands

Use Node 24 from the repo's `.nvmrc` / `.node-version`:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH node --version
```

Core gate:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test tests/unit/compression/*.test.ts
```

Golden gate:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test tests/golden-set/*.test.ts
```

MCP compression gate:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test \
  tests/unit/compression/compressionMcpTools.test.ts \
  open-sse/mcp-server/__tests__/*.test.ts
```

Final broader gate:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH npm run lint
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH npm run typecheck:core
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH npm run test:unit
```

---

## Branch Strategy

All work should target `release/v3.7.9` or a dedicated branch that will merge into it.
Each task should be a scoped commit:

```text
feat(compression): <task description>
fix(compression): <task description>
test(compression): <task description>
```

---

## Files Reference

| Path | Purpose |
|---|---|
| `open-sse/services/compression/cavemanRules.ts` | Rule definitions |
| `open-sse/services/compression/caveman.ts` | Standard/Caveman orchestrator |
| `open-sse/services/compression/preservation.ts` | Protected block extraction/restoration |
| `open-sse/services/compression/validation.ts` | New validation fallback module |
| `open-sse/services/compression/outputMode.ts` | New output-mode instruction module |
| `open-sse/services/compression/strategySelector.ts` | Mode selection and auto-trigger contract |
| `open-sse/services/compression/aggressive.ts` | Aggressive pipeline and multimodal safety |
| `open-sse/services/compression/ultra.ts` | Ultra pruning and multimodal safety |
| `open-sse/services/compression/stats.ts` | Estimated stats and tracking |
| `src/lib/db/compression.ts` | Settings persistence and normalization |
| `src/lib/db/compressionAnalytics.ts` | Analytics summaries |
| `src/app/api/settings/compression/route.ts` | Settings API validation |
| `src/app/api/compression/preview/route.ts` | Preview and diff API |
| `src/app/api/analytics/compression/route.ts` | Analytics API |
| `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx` | Dashboard controls |
| `open-sse/mcp-server/descriptionCompressor.ts` | New MCP description compressor |
| `open-sse/mcp-server/server.ts` | MCP tool registration/listing integration |
| `open-sse/mcp-server/tools/compressionTools.ts` | MCP settings/status tools |
| `open-sse/mcp-server/schemas/tools.ts` | MCP schema definitions |

---

## Upstream Reference

| Caveman File | What We Port |
|---|---|
| `caveman/SKILL.md` | Output terse mode, rules, intensity, auto-clarity |
| `caveman-compress/SKILL.md` | Preservation rules and natural-language compression contract |
| `caveman-compress/scripts/compress.py` | Safety boundaries, wrapper stripping, retry/fix flow concepts |
| `caveman-compress/scripts/validate.py` | In-memory version of the validation suite |
| `caveman-compress/scripts/detect.py` | File/content classification ideas for benchmark fixtures |
| `mcp-servers/caveman-shrink/compress.js` | Description compression patterns and protected segments |
| `mcp-servers/caveman-shrink/index.js` | MCP list-response interception pattern |
| `skills/caveman-stats/SKILL.md` | Real usage receipts concept |
| `skills/cavecrew/SKILL.md` and `agents/*` | Short agent/subagent prompt patterns |
| `hooks/caveman-activate.js` | Intensity filtering and activation behavior |
