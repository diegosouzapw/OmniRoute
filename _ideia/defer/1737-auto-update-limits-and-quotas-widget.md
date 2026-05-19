---
issue: 1737
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 20
  labels: []
  state: open
  classified_at: 2026-05-01T10:53:10Z
---

# Feature: [Feature] Auto-update Limits and Quotas widget

> GitHub Issue: #1737 — opened by @apoapostolov on 2026-04-28T18:04:00Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem
The Limits and Quotas widget should refresh automatically instead of requiring manual updates or stale page reloads. Quota data changes over time and needs to stay current enough to be useful on the dashboard.

## Request
Add automatic refresh for the Limits and Quotas widget block with the following behavior:
- Refresh interval defaults to 3 minutes.
- Auto-update is off by default.
- Users can enable it when they want the widget to stay current.

## Why this matters
- The widget is only useful when the quota numbers are fresh.
- For tracked services like GLM, Codex, Claude, and Copilot, the displayed remaining quota can change quickly enough that stale values are misleading.
- The /Home dashboard becomes much more useful if the widget can keep itself updated while the page stays open.

## Expected behavior
- When enabled, the widget refreshes on the configured interval without full page reloads.
- The refresh should not be noisy or visually disruptive.
- The interval should be configurable, but 3 minutes is a sensible default.
- The feature should be opt-in, not forced on every user.

## Notes
- The widget should continue to work as a normal static block when auto-update is disabled.
- If a refresh fails, the widget should degrade gracefully and keep the last known data visible.


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
