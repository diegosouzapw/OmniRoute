# Change: Self-Service API Key Usage and Quota Visibility

## Summary

Add a client-facing self-service status endpoint and dashboard controls that let each OmniRoute API key inspect its own USD usage, token usage, and percent used against its existing USD budget configuration. Optionally expose shared upstream account quota when an operator grants a dedicated per-key scope.

## Motivation

OmniRoute can route multiple delegated API keys through one upstream coding account. Operators need per-key accountability without giving every delegated key management access. Existing management usage APIs are too broad for delegated clients because they can expose other keys and operational state.

This change creates a narrow own-key API and UI controls:

- Own cost and token usage are visible by default for ordinary new keys.
- Shared account quota remains opt-in because it is account-level and sensitive.
- USD budgets remain the enforcement mechanism; token totals are reporting only.

## Scope

In scope:

- New `GET /api/v1/me/status` endpoint authenticated by normal Bearer API key.
- New self-service API key scopes: `self:usage` and `self:account-quota`.
- Per-key cost and token aggregation for the calling key.
- Optional normalized provider account quota for unambiguous single-connection keys.
- API Manager create/edit controls for visibility scopes.
- Reuse the existing budget configuration surface for USD limits.
- i18n message keys for all new dashboard text.
- Tests and docs for the new behavior.

Out of scope:

- Token quota enforcement.
- Cross-key reporting through the self-service endpoint.
- Changing management usage APIs.
- Changing provider routing or quota preflight behavior.
- Raw upstream quota payload exposure.
- A second budget editor inside key creation or permissions dialogs.

## Compatibility

Existing keys should continue to work. A migration or first-start normalization step should backfill `self:usage` onto existing ordinary keys so they receive the same default own-usage visibility as newly created keys. Existing keys must not receive shared account quota visibility unless `self:account-quota` is explicitly granted.

The new scopes must not grant management access. Only `manage` and `admin` remain management-grade.

## Risks

- Scope editing in the current dashboard can collapse scopes to only management access; implementation must preserve unrelated scopes.
- Shared account quota can reveal account exhaustion; it must remain disabled by default.
- Multi-connection and unrestricted-connection keys are ambiguous; first implementation should decline account quota rather than guessing.
- Backfill must be idempotent so upgrades do not repeatedly rewrite API keys or re-enable a permission an operator later disabled.
- New UI text can regress non-English dashboards if translation keys are not added consistently.
- The current scope validation cap is 16 entries; adding self-service scopes may require raising that cap.
- The current `/api/usage/budget` route relies on route-level authz rather than handler-level `requireManagementAuth()`, so the PR should harden it or explicitly test the proxy guard.

## Rollout

1. Add constants, validation, and helper tests.
2. Raise or otherwise adapt scope validation limits.
3. Add idempotent existing-key backfill for `self:usage`.
4. Harden `/api/usage/budget` with handler-level management auth or add explicit proxy-guard tests.
5. Add self-service status endpoint.
6. Add create/edit dashboard controls.
7. Add i18n message keys for dashboard text.
8. Add API/reference docs.
9. Verify against release branch used for upstream PR.
