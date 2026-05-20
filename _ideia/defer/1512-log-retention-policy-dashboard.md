# Feature: [Feature] allow setting `Log retention policy` via web dashboard

> GitHub Issue: #1512 — opened by @uwuclxdy on 2026-04-22T13:40:34Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

I'm trying to configure Log retention policy via dashboard to set it to unlimited. History older than 7d in Activity tab gets deleted by default - which I would like to set to unlimited.

### Proposed Solution

Implement input fields to allow setting custom / unlimited duration of log retention as well as the other two settings there.

### Alternatives Considered

_No response_

### Acceptance Criteria

being able to customize Log retention policy from web dashboard and set it to unlimited.

### Area

Dashboard / UI, Analytics / Usage Tracking

### Related Provider(s)

_No response_

### Additional Context

_No response_

### Expected Test Plan

_No response_

## 💬 Community Discussion



### Participants

- @uwuclxdy — Original requester

### Key Points

- User wants to override the default 7-day retention policy for call logs directly via the Dashboard UI.
- Wants option for "unlimited" retention.

## 🎯 Refined Feature Description

Currently, OmniRoute clears call logs older than a specific timeframe (often handled by `logRotation.ts` or similar cron tasks). Users want a setting in the dashboard under Settings -> System & Storage (or similar) to control `LOG_RETENTION_DAYS`. A value of `0` or `unlimited` could be used to disable rotation.

### What it solves

- Prevents automatic deletion of logs for users who want to keep complete historical records.
- Eliminates the need to use environment variables for retention policy if it currently relies on them.

### How it should work (high level)

1. Add a new setting key in the SQLite `settings` table for `log_retention_days`.
2. Update the `SystemStorageTab.tsx` in the dashboard to include a dropdown or input for "Log Retention (days)". Options could be "7 Days", "30 Days", "90 Days", "Unlimited".
3. Update `src/lib/logRotation.ts` to read this setting instead of using a hardcoded or environment variable default. If the setting is unlimited, it should skip rotation for call logs.

### Affected areas

- `src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx`
- `src/lib/logRotation.ts`
- `src/lib/db/settings.ts`

## 📎 Attachments & References

- None.

## 🔗 Related Ideas

- None.
