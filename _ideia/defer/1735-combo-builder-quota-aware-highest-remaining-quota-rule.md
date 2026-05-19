---
issue: 1735
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 20
  labels: []
  state: open
  classified_at: 2026-05-01T10:53:10Z
---

# Feature: [Feature] Combo Builder: quota-aware Highest Remaining Quota rule

> GitHub Issue: #1735 — opened by @apoapostolov on 2026-04-28T17:54:35Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem
Combo building needs a quota-aware ranking rule that favors models whose remaining quota can last through the rest of the current quota window.

## Proposed rule: Highest Remaining Quota Rate
For any service with a fixed quota window:

- Let `remaining_quota` be the fraction of quota still available, normalized to `0..1`.
- Let `remaining_days` be the time left in the current quota window, expressed in days.
- Compute `remaining_quota_rate = remaining_quota / remaining_days`.

For weekly quotas:

- The expected pacing threshold is `1/7` quota per day.
- Prefer models where `remaining_quota_rate > 1/7`.
- If `remaining_quota_rate <= 1/7`, stop using that model in active combos until it recovers above the threshold.

## Example
If a model has `60%` of its weekly quota left and `2d 10hr` remaining:

- `remaining_days = 2.4167`
- `remaining_quota_rate = 0.60 / 2.4167 = 0.248/day`
- Since `0.248 > 1/7`, the model should remain eligible and be preferred over lower-rate options.

## Expected behavior
- Combos should rank models using the `remaining_quota_rate` rule whenever a quota window is known.
- Models above the threshold should be preferred or retained.
- Models at or below the threshold should be dropped from active use.
- The rule should be applied consistently during combo evaluation and refresh.

## Notes
- If a quota is measured in calls instead of percentage, normalize it to a fraction of the current window before applying the rule.
- The same rule should generalize to other quota windows by using `1 / window_length_days` as the threshold.


## 💬 Community Discussion

*No comments.*

### Participants

- @apoapostolov

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.

### What it solves

- TBD

### How it should work (high level)

1. TBD
2. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
