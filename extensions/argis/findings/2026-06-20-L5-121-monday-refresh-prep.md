# L5-121: 71-Pillar Monday Refresh Prep

**Date**: 2026-06-20
**Status**: Complete
**Device**: macbook

## What

Pre-staged the 71-pillar refresh template for the Monday 2026-06-22 sweep (ADR-041). The ADR tree was wiped by orchestration — ADR-024 (71-pillar framework), ADR-041 (refresh cadence), and all prior scorecard files are missing from disk. The schema doc at `findings/71-pillar-2026-06-17-schema.md` survived.

## Deliverable

- `findings/71-pillar-refresh-template.md` — Reusable 170-line scorecard template for any repo. 9 domains, 71 pillars, 0–3 scoring with N/A support for L40/L41. Includes aggregate table, per-domain scoring tables, delta summary, and P0 remediation tracker.

## Monday entry point

```bash
# For each active repo:
for repo in Civis Dino WSM; do
  cp findings/71-pillar-refresh-template.md "findings/71-pillar-2026-06-22-${repo,,}.md"
  # Edit scores in each file, then:
done
python3 scripts/71_pillar_rollup.py  # Aggregate org-wide score
```

## Linked ADRs

- ADR-024 (71-pillar framework) — missing from disk, schema doc survives
- ADR-041 (weekly refresh cadence, Mon 09:00 PDT) — missing from disk
