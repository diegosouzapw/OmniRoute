# Audit Ratchet — CI Gate + Cron Setup

> **Generated 2026-06-16.** Wires the 30-pillar audit into a recurring check.

## Goal

Two failure modes to detect:
1. **Stale audit** — the audit sheet is older than 90 days (no re-audit)
2. **Score regression** — a previously non-zero pillar becomes zero in a re-audit

## Plan (Phase 7)

### Step 1: Add `docs/audits/scripts/score.py`

A scoring script that:
- Reads all repos in `/Users/kooshapari/CodeProjects/Phenotype/repos/` (excluding skip-list)
- For each repo, computes the 109 pillar scores via file-presence checks
- Outputs JSON: `{"repos": {<name>: {"mean": X, "scores": {...}}, ...}}`
- Comparison mode: `--diff <previous-scores.json>` flags any pillar that dropped from >0 to 0

The bulk scoring I already ran in Phase 4 is the seed for this script. To extract:

```bash
cp /tmp/fleet-scores.json docs/audits/scripts/last-scores.json
```

### Step 2: Add CI gate in OmniRoute (or any Tier 1 repo)

The CI gate is a shell script in `.github/workflows/audit-ratchet.yml`:

```yaml
name: Audit Ratchet
on:
  schedule:
    - cron: '0 0 1 */3 *'  # quarterly
  workflow_dispatch:

jobs:
  audit-ratchet:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA>
      - name: Check audit freshness
        run: |
          AGE_DAYS=$(( ($(date +%s) - $(git log -1 --format=%ct docs/audits/FLEET-AUDIT-30-PILLAR.md)) / 86400 ))
          if [ $AGE_DAYS -gt 90 ]; then
            echo "::error::Audit is $AGE_DAYS days old (>90). Re-audit required."
            exit 1
          fi
      - name: Run score diff
        run: |
          python3 docs/audits/scripts/score.py > /tmp/current.json
          python3 docs/audits/scripts/score.py --diff docs/audits/scripts/last-scores.json --current /tmp/current.json
```

### Step 3: Cron for quarterly re-audit

```bash
# Add to crontab via SessionStart hook (not the host cron)
# In /Users/kooshapari/.claude/CLAUDE.md or session hook:
# 0 0 1 */3 *  →  trigger a subagent to re-run the scoring script
```

### Step 4: Re-audit acceptance criteria

A re-audit is accepted when:
- All repos in the inventory are scored (111 today, 29 no-local-clone need an inventory decision)
- Mean pillar score is reported for each repo
- Pillar-by-pillar delta vs previous audit is shown
- Any pillar that regressed from 1+ to 0 is flagged for a fix PR

## Status

This is a **plan**, not yet executed. The data is in place:
- `docs/audits/FLEET-AUDIT-30-PILLAR.md` (scored grid)
- `docs/audits/AUDIT-METHOD.md` (rubric)
- `docs/audits/REPO-INVENTORY.md` (197 to-score)
- `docs/audits/FLEET-AUDIT-REPORT.md` (writeup)
- `docs/audits/BACKLOG.md` (P0/P1 prioritized)
- `docs/audits/weakest10/<repo>-ACTION-PLAN.md` × 10
- `docs/audits/strongest5/<repo>-ACTION-PLAN.md` × 5

Phase 7 will:
1. Extract the Phase 4 scoring Python into `docs/audits/scripts/score.py`
2. Add `docs/audits/scripts/last-scores.json` snapshot
3. Add `.github/workflows/audit-ratchet.yml` to OmniRoute (the Tier 1 reference repo)
4. Add a SessionStart hook to `~/.claude/CLAUDE.md` that re-runs the audit quarterly

## Out of scope (deferred)

- Wiring the same CI gate into every Tier 1 repo (5 repos) — start with OmniRoute, copy to others
- Wiring into Tier 2/3 (135 repos) — too many at once; do per-chat
- Replacing the file-presence heuristic with deeper code analysis (e.g., for the 0-scored pillars where the evidence is more complex)
