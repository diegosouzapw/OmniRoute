---
title: "Monitoring & Costs — Navigation Structure"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Monitoring & Costs — Navigation Structure

> Implemented in Group B (plan 16). See `src/shared/constants/sidebarVisibility.ts`.

---

## High-Level Navigation

The dashboard sidebar (after Group B) has these top-level sections in order:

```
Home
Providers
Combos
API Keys
Settings
Analytics
Costs          ← NEW (Group B, plan 16)
Monitoring     ← REORGANIZED (Group B, plan 16)
...
```

---

## Costs section (new, level 1)

Path prefix: `/dashboard/costs/`

| Item          | URL                                  | Description                                      |
| ------------- | ------------------------------------ | ------------------------------------------------ |
| Overview      | `/dashboard/costs`                   | Aggregated cost dashboard (moved from Analytics) |
| Pricing       | `/dashboard/costs/pricing`           | Per-model pricing table                          |
| Budget        | `/dashboard/costs/budget`            | Budget thresholds + alerts                       |
| Quota Sharing | `/dashboard/costs/quota-share`       | Quota Share pools + usage                        |
| Plan Config   | `/dashboard/costs/quota-share/plans` | Per-provider plan overrides                      |

**Rationale**: Pricing, Budget, and Quota Sharing were previously under
`Monitoring > Costs Parameters`. Moving them to a dedicated top-level section
makes them discoverable without navigating through observability tooling.

---

## Monitoring section (reorganized)

The Monitoring section now has **Activity at the top** followed by **3 subgroups**:

```
Monitoring
├── Activity             ← Timeline feed (top-level item)
├── Logs group
│   ├── Logs (all)
│   ├── Proxy Logs
│   └── Console Logs
├── Audit group
│   ├── Audit Log
│   ├── MCP Audit
│   └── A2A Audit
└── System group
    ├── Health
    └── Runtime
```

### What changed from the old structure

| Before                                                                           | After                                             |
| -------------------------------------------------------------------------------- | ------------------------------------------------- |
| Activity = tab inside Logs that rendered the Audit Log                           | Activity = dedicated feed (`/dashboard/activity`) |
| Costs Parameters group in Monitoring                                             | Moved to Costs section                            |
| Flat list: Logs, Activity (logs), Audit, Health, Runtime, Pricing, Budget, Quota | Structured 3-group + dedicated Costs section      |

---

## Activity vs Audit Log

These two are now distinct:

| Dimension        | Activity (`/dashboard/activity`)                       | Audit Log (`/dashboard/audit`)            |
| ---------------- | ------------------------------------------------------ | ----------------------------------------- |
| **Purpose**      | User-facing event feed ("what happened recently")      | Compliance / security log                 |
| **Data source**  | `GET /api/compliance/audit-log?level=high`             | `GET /api/compliance/audit-log?level=all` |
| **Format**       | Timeline, grouped by day, human-readable verbs + icons | Dense paginaged table, 50/page            |
| **Filters**      | Event type category                                    | Action, severity, actor, date range       |
| **Export**       | Not available                                          | JSON export                               |
| **Actor filter** | Not applicable                                         | Filterable by actor                       |
| **Events shown** | High-level actions only (allowlist)                    | All audit events                          |

### High-Level Actions allowlist

Defined in `src/lib/audit/highLevelActions.ts`. Controls which events appear in
the Activity feed. The allowlist includes:

- Provider add/remove/test events
- Combo create/update/delete
- API key lifecycle (create, revoke, rotate)
- Budget threshold reached
- Auth login/logout
- Cloud agent session creation
- MCP tool registration
- Webhook create/delete
- Quota pool/plan changes (`quota.*` actions, Group B)
- Platform events (update, deploy)
- Skill install/remove

Events not in this list appear only in the Audit Log.

### Adding a new high-level action

Edit `src/lib/audit/highLevelActions.ts` and add the action string to
`HIGH_LEVEL_ACTIONS`. This requires a PR (the list is code, not DB-configurable).
The corresponding icon can be added to `src/lib/audit/activityIcons.ts`.

---

## Redirect: `/dashboard/logs/activity`

The old path `/dashboard/logs/activity` is permanently redirected (HTTP 308) to
`/dashboard/activity` via `permanentRedirect()` in
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

The legacy sidebar ID `logs-activity` is preserved in `HIDEABLE_SIDEBAR_ITEM_IDS`
(but removed from `SIDEBAR_DEFINITIONS`) to avoid breaking user presets that
reference the old ID.

---

## i18n

Namespaces added by Group B:

| Namespace key           | Covers                                                         |
| ----------------------- | -------------------------------------------------------------- |
| `sidebar.costsSection`  | Costs section label                                            |
| `sidebar.activity`      | Activity sidebar item                                          |
| `sidebar.logsGroup`     | Logs subgroup label                                            |
| `sidebar.systemGroup`   | System subgroup label                                          |
| `sidebar.costsOverview` | Costs overview item                                            |
| `activity.*`            | All Activity page strings (title, verbs, filters, empty state) |

Source-of-truth locales: `pt-BR` and `en`. All other 39 locales fall back to
English via the `next-intl` fallback mechanism (configured in `src/i18n/config.ts`).
