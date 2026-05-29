# Self-Service API Key Usage and Quota Visibility

## Problem

Operators often share one upstream coding account, such as Codex, across multiple OmniRoute API keys. OmniRoute already records per-key usage and supports per-key USD budgets, but a normal client API key cannot query its own spend or token totals. The existing usage APIs are management endpoints, so exposing them to each API key would disclose other keys, account metadata, and operational settings.

Operators also need a way to decide whether a key may see the shared upstream account quota. For Codex this includes the short session window and weekly window fetched from ChatGPT usage APIs. That quota is account-level state, not key-level state, so it should not be visible by default.

The goal is to add a small self-service status API and matching dashboard controls so a delegated API key can see:

- Its own USD usage against its configured budget.
- Its own token usage totals.
- The percent used toward its own USD budget limit.
- Optionally, shared upstream account quota remaining when explicitly permitted.

## Baseline

This design was written after comparing the official source and a live deployment:

- Official checkout: `origin/main` at `dc3915a4`, package version `3.8.5`.
- Live deployment: package version `3.8.3`, installed under `/usr/lib/node_modules/omniroute/app`.
- Contributor guide: PRs currently target `release/v3.8.3`, so implementation should start from the release branch even though the source survey used current `main`.

Relevant current implementation:

- API key creation is in `src/app/api/keys/route.ts`; `createKeySchema` currently accepts `name`, `noLog`, and `scopes`.
- API key metadata is stored in `api_keys`, including `scopes`, `allowed_connections`, model restrictions, request rate limits, and lifecycle fields.
- Management auth treats `manage` and `admin` as management scopes in `src/shared/constants/managementScopes.ts`.
- `/api/v1/*` routes are public from the route classifier perspective, but individual handlers still validate Bearer API keys.
- Per-key USD budgets already exist through `domain_budgets`, `domain_cost_history`, `getCostSummary(apiKeyId)`, and `checkBudget(apiKeyId)`.
- Token usage is already recorded per key in `usage_history.api_key_id` with input, output, cache read, cache creation, and reasoning token columns.
- Provider quota data is fetched through `src/lib/usage/providerLimits.ts` and Codex quota support in `open-sse/services/codexQuotaFetcher.ts` / `open-sse/services/usage.ts`.
- The API Manager UI currently has a management-access toggle on create/edit and sends `scopes: ["manage"]` or `[]`; the edit modal must be changed before adding more scope types so it does not discard unrelated scopes.

## Goals

- Add an authenticated self-service endpoint for the calling API key's own usage.
- Keep management endpoints protected exactly as they are today.
- Use USD budgets for enforcement and percentage reporting.
- Include token totals as reporting data only, not as quota enforcement.
- Make account quota visibility opt-in per API key.
- Add create/edit UI controls for self-service visibility while reusing the existing budget configuration flow for USD limits.
- Add all new dashboard text through OmniRoute's i18n message system.
- Preserve arbitrary existing scopes when the dashboard edits permissions.
- Provide a design that can become an upstream-quality PR with tests and docs.

## Non-Goals

- Do not expose other API keys' usage through the self-service endpoint.
- Do not add token-based quota enforcement in this change.
- Do not change provider routing, fallback, or quota preflight behavior.
- Do not disclose upstream access tokens, workspace IDs, emails, or connection secrets.
- Do not make shared account quota visible by default.
- Do not replace the existing management usage dashboards.

## Proposed API

Add:

```text
GET /api/v1/me/status
Authorization: Bearer <api-key>
```

The route is under `/api/v1` so it follows the client API surface, but the handler must explicitly validate the Bearer API key and load its metadata. It must not use `requireManagementAuth()`.

The handler must not rely only on the global `CLIENT_API` authz policy. In the current source, `clientApiPolicy` can allow anonymous traffic when `REQUIRE_API_KEY` is not `"true"`, and some `/api/v1` helper code assumes the middleware already made that decision. This endpoint is more sensitive, so it must perform handler-local validation:

- Require an `Authorization: Bearer <api-key>` credential.
- Call `validateApiKey()` / `getApiKeyMetadata()` or an equivalent DB-backed helper.
- Reject anonymous, dashboard-session-only, invalid, expired, revoked, inactive, and env-only management keys for this self-service response.
- Derive the returned API key id from metadata, never from request parameters.

The response contains only the caller's own API key identity, budget usage, token usage, and optional account quota:

```json
{
  "apiKey": {
    "id": "key_123",
    "name": "team-a"
  },
  "usage": {
    "cost": {
      "period": "monthly",
      "currency": "USD",
      "usedUsd": 12.34,
      "limitUsd": 50,
      "remainingUsd": 37.66,
      "usedPercent": 24.68,
      "warningThreshold": 0.8,
      "resetAt": "2026-06-01T00:00:00.000Z",
      "periodStartAt": "2026-05-01T00:00:00.000Z"
    },
    "tokens": {
      "periodStartAt": "2026-05-01T00:00:00.000Z",
      "inputTokens": 900000,
      "outputTokens": 32000,
      "cacheReadTokens": 120000,
      "cacheCreationTokens": 10000,
      "reasoningTokens": 5000,
      "totalTokens": 1067000
    }
  },
  "accountQuota": {
    "provider": "codex",
    "connectionId": "conn_123",
    "shared": true,
    "quotas": {
      "session": {
        "remainingPercentage": 99,
        "usedPercentage": 1,
        "resetAt": "2026-05-29T18:11:44.000Z"
      },
      "weekly": {
        "remainingPercentage": 3,
        "usedPercentage": 97,
        "resetAt": "2026-05-31T01:23:38.000Z"
      }
    }
  }
}
```

`accountQuota` is omitted unless the key has the account quota scope. If the scope is present but the connection cannot be resolved safely, return:

```json
{
  "accountQuota": {
    "available": false,
    "reason": "ambiguous_connection"
  }
}
```

Use stable reason strings: `not_supported`, `ambiguous_connection`, `no_allowed_connection`, `not_available`, and `fetch_failed`.

## Scopes

Add self-service scopes that do not grant management access:

- `self:usage`: allows a key to query its own spend, budget percent, and token totals.
- `self:account-quota`: allows a key to see shared upstream account quota for its resolved connection.

`self:usage` should be enabled by default for newly created ordinary API keys. The UI should show it checked by default and persist the scope when the control is enabled. For backwards compatibility, the implementation should backfill `self:usage` onto existing ordinary keys during migration or first startup after upgrade. After that compatibility step, absence of `self:usage` means own-usage visibility is disabled and the self-service endpoint returns `403`.

`self:account-quota` must be disabled by default. The dashboard should require an explicit opt-in when creating or editing a key.

These scopes must not be added to `MANAGEMENT_API_KEY_SCOPES`. `manage` and `admin` remain the only management-grade scopes.

## Budget Semantics

The existing USD budget system remains authoritative:

- `getCostSummary(apiKeyId)` provides current period cost, active USD limit, reset interval, reset time, and period boundaries.
- `checkBudget(apiKeyId)` remains the enforcement check used by request handling.
- The self-service endpoint reports budget percentage as `usedUsd / limitUsd * 100`.
- When no budget is configured, return `limitUsd: null`, `remainingUsd: null`, and `usedPercent: null`.

The endpoint should report the active period from the budget window when configured. If a key has no budget, use the current calendar month for display-only usage aggregation so the API still returns useful cost and token totals.

## Token Usage Semantics

Add a small aggregation helper over `usage_history` scoped by `api_key_id` and time window:

```sql
SELECT
  COALESCE(SUM(tokens_input), 0) AS inputTokens,
  COALESCE(SUM(tokens_output), 0) AS outputTokens,
  COALESCE(SUM(tokens_cache_read), 0) AS cacheReadTokens,
  COALESCE(SUM(tokens_cache_creation), 0) AS cacheCreationTokens,
  COALESCE(SUM(tokens_reasoning), 0) AS reasoningTokens
FROM usage_history
WHERE api_key_id = ?
  AND timestamp >= ?
```

`totalTokens` should include all reported token categories. Token totals are informational and should not affect budget enforcement.

## Account Quota Resolution

Account quota is shared provider state. The self-service endpoint may include it only when:

- The API key has `self:account-quota`.
- A single provider connection can be resolved without ambiguity.
- The provider supports quota fetching.

Connection resolution must follow the source semantics for `allowedConnections`: an empty array means unrestricted access to all connections, not "no connections".

- If exactly one explicit allowed connection exists and it resolves to a quota-supported provider, use that connection.
- If `allowedConnections` is empty, treat the connection scope as ambiguous and return `available: false` with `ambiguous_connection`. This avoids exposing shared quota for a broad/unrestricted key.
- If explicit allowed connection ids are present but none resolve, return `available: false` with `no_allowed_connection`.
- If multiple explicit allowed connections exist, return `available: false` with `ambiguous_connection`.

This conservative rule avoids accidentally exposing quota for an account the key may not actually use. A later change can add an explicitly authorized `?connectionId=` flow if there is demand for multi-connection keys.

For Codex, reuse the existing provider limits / Codex quota path. Normalize Codex windows to `session` and `weekly` and return used/remaining percentages plus reset timestamps. Do not return raw upstream payloads.

## Dashboard UX

API Manager should expose these controls during key creation and editing.

Create key modal:

- Management access remains a separate, off-by-default toggle.
- Add "Self-service visibility":
  - "Own cost and token usage" checked by default.
  - "Shared account quota" unchecked by default.
- Do not add budget limit fields here. Per-key USD budgets already have a dedicated configuration surface, and this feature should link to or surface the existing budget state instead of creating a second configuration path.

Editing permissions:

- Keep existing model, endpoint, connection, schedule, and rate-limit controls.
- Add the same self-service visibility toggles.
- Preserve all existing scopes when toggling one permission. The current edit flow must not rebuild scopes as only `["manage"]` or `[]`.
- Do not move budget editing into the permissions modal. The permissions modal may show a read-only hint or link to the existing budget configuration area.

Usage display:

- In the key list or details panel, show USD used, active USD limit, and used percent when a budget exists.
- Show token totals in a compact details view.
- Show shared account quota only for keys with `self:account-quota`, clearly labeled as shared account quota, not per-key quota.
- When no USD budget is configured, show usage normally and render the limit, remaining amount, and percent as unset/not configured rather than `0%`.

## Internationalization

OmniRoute's dashboard is localized through `src/i18n/messages/*.json` and components use `useTranslations()`. All new API Manager labels, descriptions, tooltips, empty states, and error messages must use translation keys instead of hard-coded UI strings.

Implementation should:

- Add new keys under the existing `apiManager` namespace for self-service visibility labels, shared account quota labels, and unset-budget display text.
- Update the default source locale and keep other locale files structurally compatible with the repo's i18n workflow.
- Avoid concatenating translated fragments for dynamic text; use complete translation strings with variables where needed.
- Run the repo's UI i18n checks, especially `npm run i18n:sync-ui:dry` and `npm run i18n:check-ui-coverage`, so missing translations are caught before PR.
- If the implementation touches the existing budget page for links or hints, localize any new budget-page strings as well. The existing `BudgetTab` still has some hard-coded labels, so do not add more hard-coded user-facing text there.

## Validation and Storage Changes

Extend `createKeySchema` to accept:

- `scopes` containing the new self-service scope names.

`createKeySchema` and `updateKeyPermissionsSchema` currently cap `scopes` at 16 entries. Adding two self-service scopes can make legitimate keys exceed that limit when they already carry management or MCP/custom scopes. The implementation should either raise the cap to a documented value such as 32 or validate against named scope families instead of keeping the current 16-entry limit.

Do not extend key creation with a budget object in this change. Budget limits are already configured through the existing budget APIs and UI. The self-service endpoint should read those existing limits and display `null` limit/percent fields when none are configured.

Add a compatibility migration or startup normalization step:

- Existing ordinary keys receive `self:usage`.
- Existing keys do not receive `self:account-quota`.
- Existing management keys keep their current management scopes and may also receive `self:usage` if they are expected to use the self-service endpoint.
- The backfill is one-time and guarded by the repo's existing migration/version mechanism so it cannot re-enable `self:usage` after an operator later disables it.
- After that one-time backfill, missing `self:usage` is an explicit denial for the self-service endpoint.

The key creation route should:

1. Validate the request.
2. Normalize scopes by preserving known custom scopes and adding `self:usage` when omitted by the UI default.
3. Create the key.
4. Return the created key metadata.

The update permissions route should support the same scope preservation behavior. Scope mutation should be set-based:

- Start from existing scopes.
- Add or remove only the scopes represented by the UI controls.
- Leave unknown or unrelated scopes intact.

The current `PermissionsModal` calls `onSave(..., manageEnabled ? ["manage"] : [], ...)`, which would discard any new self-service or custom scope. This must be changed before the self-service toggles are added.

## Existing Budget Endpoint Guard

The global authz proxy classifies `/api/usage/budget` as a management API, but unlike `/api/usage/budget/bulk`, the current route handler does not call `requireManagementAuth()` directly. The self-service design must not reuse `/api/usage/budget?apiKeyId=...` because that endpoint accepts arbitrary key ids.

For defense in depth and easier direct route testing, the implementation PR should either:

- Add handler-level `requireManagementAuth()` to `/api/usage/budget` GET and POST, matching the bulk route; or
- Include an explicit note and tests proving the proxy is the only intended guard.

The preferred upstream-quality fix is to add handler-level management auth to `/api/usage/budget` while adding the separate own-key `/api/v1/me/status` endpoint.

## Security and Privacy

The self-service handler must be own-key only. It should derive `apiKeyId` from the presented Bearer key and never accept an `apiKeyId` query parameter.

Never include:

- Full API key value.
- Upstream access tokens or refresh tokens.
- Provider account email unless that email is already visible to this key through another client API.
- Other keys' spend, token totals, names, or budgets.
- Raw ChatGPT/Codex usage payloads.

Account quota should be treated as sensitive because it lets delegated users infer shared account exhaustion. The default remains off.

## Error Handling

- Missing or invalid Bearer key: `401` with a generic auth error.
- Valid key without `self:usage`: `403`.
- Budget missing: `200` with null limit and percent fields.
- Usage aggregation failure: `500` with generic message; log server-side details.
- Quota fetch unsupported or unavailable: `200` with `accountQuota.available: false`.
- Quota fetch auth failure: do not leak provider auth details; return `not_available` or `fetch_failed` and log details server-side.

## Testing

Add focused tests:

- Self-service endpoint rejects missing and invalid Bearer keys.
- Self-service endpoint rejects anonymous access even when `REQUIRE_API_KEY` is not `"true"`.
- Self-service endpoint rejects env-only management keys or any key without DB metadata suitable for own-key usage.
- A normal key with `self:usage` can query its own cost and token totals without `manage`.
- The endpoint never accepts an `apiKeyId` override.
- Key A cannot see Key B usage.
- A key without account quota scope does not receive `accountQuota`.
- A key with account quota scope and one allowed Codex connection receives normalized session and weekly quota.
- Unrestricted or multiple allowed connections return `ambiguous_connection`.
- Create UI defaults own usage on and shared quota off.
- Edit UI preserves unrelated scopes.
- UI renders the no-budget state as not configured, with usage and token totals still visible.
- New dashboard strings are covered by i18n keys.
- `/api/usage/budget` remains management-only and is not usable as an own-key data escape hatch.

## Implementation Notes

Recommended new files:

- `src/shared/constants/selfServiceScopes.ts`
- `src/lib/usage/apiKeySelfService.ts`
- `src/app/api/v1/me/status/route.ts`

Recommended modified files:

- `src/shared/validation/schemas.ts`
- `src/app/api/keys/route.ts`
- `src/app/api/keys/[id]/route.ts`
- `src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx`
- `src/i18n/messages/*.json`
- API reference docs after implementation.

## Acceptance Criteria

- Delegated keys can see their own USD usage, budget percentage, and token usage.
- Shared account quota is hidden unless explicitly enabled per key.
- The dashboard can configure self-service visibility during create/edit.
- The dashboard continues to use the existing budget configuration surface for USD limits.
- New UI text is localized through existing i18n files.
- Existing management usage APIs remain management-only.
- Scope edits do not discard unrelated scopes.
- Tests cover API, helper logic, and UI scope defaults.
