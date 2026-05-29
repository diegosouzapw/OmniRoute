# Tasks

## 1. Scope and Validation

- [ ] Add `self:usage` and `self:account-quota` constants outside management scopes.
- [ ] Extend key creation validation to accept self-service scopes.
- [ ] Raise or replace the current 16-scope validation cap so new scopes do not break existing custom/MCP-heavy keys.
- [ ] Add an idempotent compatibility migration or startup normalization for existing keys.
- [ ] Add tests proving self-service scopes do not satisfy management auth.

## 2. Usage Aggregation

- [ ] Add helper to derive self-service status from authenticated API key metadata.
- [ ] Aggregate cost through existing `getCostSummary()` and `checkBudget()`.
- [ ] Aggregate token totals from `usage_history` by `api_key_id` and period start.
- [ ] Add tests for missing budget, configured budget, and token totals.

## 3. Account Quota

- [ ] Resolve account quota only when the key has `self:account-quota`.
- [ ] Use exactly one explicit allowed connection; treat unrestricted or multiple connections as ambiguous.
- [ ] Normalize Codex quota windows to `session` and `weekly`.
- [ ] Add tests for no scope, one connection, multiple connections, unsupported provider, and fetch failure.

## 4. API Endpoint

- [ ] Add `GET /api/v1/me/status`.
- [ ] Authenticate in the handler using a normal Bearer API key and derive the API key id from DB metadata.
- [ ] Reject anonymous access even when global client API auth would allow anonymous local traffic.
- [ ] Reject env-only management keys for this own-key endpoint.
- [ ] Reject missing/invalid keys with `401`.
- [ ] Reject keys without `self:usage` with `403` after compatibility backfill has run.
- [ ] Ignore any caller-supplied `apiKeyId`.
- [ ] Add route tests for isolation and response shape.

## 5. Dashboard

- [ ] Add create-key controls for own usage visibility and shared account quota visibility.
- [ ] Add edit-permissions controls for self-service visibility.
- [ ] Reuse the existing budget configuration surface for USD limit editing.
- [ ] Preserve unrelated scopes when editing permissions.
- [ ] Show per-key budget percent and token totals in the key details experience.
- [ ] Show no-budget state as not configured while still showing usage.
- [ ] Add UI tests for defaults and scope preservation.

## 6. Internationalization

- [ ] Add translation keys under the existing API Manager namespace for all new UI text.
- [ ] Update default and generated locale message files according to the repo's i18n workflow.
- [ ] Add or run a translation key consistency check.
- [ ] Run `npm run i18n:sync-ui:dry`.
- [ ] Run `npm run i18n:check-ui-coverage`.

## 7. Budget Endpoint Hardening

- [ ] Add handler-level management auth to `/api/usage/budget` GET and POST, or document and test why proxy-only protection is intentional.
- [ ] Add a regression test proving ordinary self-service keys cannot use `/api/usage/budget?apiKeyId=...` to read arbitrary keys.

## 8. Documentation

- [ ] Add API reference entry for `/api/v1/me/status`.
- [ ] Update user guide/API manager docs.
- [ ] Document privacy behavior for shared account quota.
- [ ] Add migration/compatibility note for existing keys.

## 9. Verification

- [ ] Run lint.
- [ ] Run typecheck.
- [ ] Run focused unit/API/UI tests.
- [ ] Run coverage or the repo-required validation command before PR.
