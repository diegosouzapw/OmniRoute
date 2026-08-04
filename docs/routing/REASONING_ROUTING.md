---
title: "Reasoning Routing"
---

# Reasoning Routing

Reasoning routing rules extend the existing model and combo routing. When no active rule matches,
the existing thinking, suffix, connection-default, and provider-translation behavior remains
unchanged.

## Management

Rule management is available under **Settings → Global Routing**. The API-key editor provides the
same management UI filtered to the selected key.

The management API is exposed by these routes:

- `GET` and `POST` at `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH`, and `DELETE` at `/api/settings/reasoning-routing-rules/[id]`
- `POST` at `/api/settings/reasoning-routing-rules/simulate`

All routes use `requireManagementAuth`. Inputs are validated with the schemas in
`src/shared/validation/schemas/reasoningRouting.ts`. The simulator never makes an upstream call.

## Rule Resolution

The early evaluation selects exactly one rule. Scopes are checked in this order:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Within a scope, higher `priority` wins first, followed by an exact model match over a glob pattern,
then stable `createdAt` and `id` ordering. `requestTags` are read exclusively from `metadata.tags`
and support `any` or `all` matching.

A `connection` rule is evaluated only when no early rule won and a concrete provider connection has
already been selected. It may change effort and budget only.

## Effort and Budget

`sourceEffort` accepts `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max`, and
`ultra`. `missing` means that the request contains neither a discrete effort nor a thinking toggle
or thinking budget. A budget-only signal is therefore matched only by `any`.

`effortMode` has three variants:

- `inherit` keeps the client effort while still allowing the model or combo to change.
- `default` sets `targetEffort` only when no explicit reasoning signal is present.
- `force` replaces the discrete effort with `targetEffort`.

Independently, `budgetAction` can be `preserve`, `remove`, or `set`. `force` with `none` removes
all recognized effort and budget fields. `none` together with `set` is invalid.

Requests targeting known-incompatible models are rejected before the upstream call. For combo
targets, incompatible entries are removed; if none remain, the request returns status `400`.
Unknown capability data produces a warning and leaves the rule active.

## Security and Transports

The source and target model, or source and target combo, remain subject to the existing API-key
policy. A reasoning rule never expands model, combo, or quota permissions.

The engine is integrated into Chat Completions, Responses, Anthropic Messages, and the internal
Codex WebSocket path. The WebSocket path accepts Codex target models only; combo targets cannot be
executed there. The rule decision is stored in the existing route trace without secrets.

## Persistence

The migration `src/lib/db/migrations/126_reasoning_routing_rules.sql` creates the
`reasoning_routing_rules` table. Rules reference stored API keys, combos, and provider connections.
Deletes clean up related rules. The database access layer in
`src/lib/db/reasoningRoutingRules.ts` maintains an invalidatable cache for the request path.

Rules are included in SQLite backups, the full database export, and the config-sync bundle.
`reconcileReasoningRulesForSync` disables imported rules with missing references and reports those
conflicts.
