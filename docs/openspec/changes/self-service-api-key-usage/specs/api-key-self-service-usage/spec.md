# Specification: API Key Self-Service Usage

## ADDED Requirements

### Requirement: Self-service status endpoint

OmniRoute SHALL provide `GET /api/v1/me/status` for a valid Bearer API key to retrieve status for that same API key.

#### Scenario: Valid key reads own status

- GIVEN a valid API key with own-usage visibility
- WHEN it calls `GET /api/v1/me/status`
- THEN the response status SHALL be `200`
- AND the response SHALL include the API key id and name
- AND the response SHALL include cost usage for that key
- AND the response SHALL include token usage for that key

#### Scenario: Invalid key is rejected

- GIVEN a missing or invalid Bearer token
- WHEN the caller calls `GET /api/v1/me/status`
- THEN the response status SHALL be `401`

#### Scenario: Anonymous client API mode does not bypass self-service auth

- GIVEN global client API auth allows anonymous local traffic
- WHEN a caller without a Bearer API key calls `GET /api/v1/me/status`
- THEN the response status SHALL be `401`

#### Scenario: Environment management key is not a self-service key

- GIVEN the deployment has an environment management key
- WHEN that key calls `GET /api/v1/me/status`
- THEN the response SHALL NOT expose delegated API key usage

### Requirement: Own-key isolation

The self-service endpoint SHALL derive the API key id from the authenticated Bearer key and SHALL NOT accept caller-supplied key ids for lookup.

#### Scenario: Caller tries to query another key

- GIVEN API key A and API key B both have usage
- WHEN API key A calls `GET /api/v1/me/status?apiKeyId=<key-b-id>`
- THEN the response SHALL contain only API key A identity and usage
- AND the response SHALL NOT contain API key B usage

### Requirement: USD budget status

The self-service endpoint SHALL report per-key USD budget usage using the existing budget system.

#### Scenario: Key has an active monthly budget

- GIVEN an API key has a monthly USD budget of `50`
- AND the key has current-period cost of `12.50`
- WHEN the key calls the self-service status endpoint
- THEN `usage.cost.limitUsd` SHALL be `50`
- AND `usage.cost.usedUsd` SHALL be `12.50`
- AND `usage.cost.usedPercent` SHALL be `25`
- AND `usage.cost.remainingUsd` SHALL be `37.50`

#### Scenario: Key has no budget

- GIVEN an API key has no configured budget
- WHEN the key calls the self-service status endpoint
- THEN `usage.cost.limitUsd` SHALL be `null`
- AND `usage.cost.usedPercent` SHALL be `null`
- AND cost and token totals SHALL still be returned for the default display period

### Requirement: Token usage reporting

The self-service endpoint SHALL report token totals from `usage_history` for the authenticated API key and selected reporting period.

#### Scenario: Token totals include all tracked categories

- GIVEN an API key has usage rows with input, output, cache read, cache creation, and reasoning tokens
- WHEN the key calls the self-service status endpoint
- THEN the response SHALL include each token category total
- AND `totalTokens` SHALL include all reported token categories

### Requirement: Self-service scopes

OmniRoute SHALL support `self:usage` and `self:account-quota` API key scopes. These scopes SHALL NOT grant management API access.

#### Scenario: Self-service scope is not management

- GIVEN an API key has `self:usage`
- AND it does not have `manage` or `admin`
- WHEN it calls a management usage endpoint
- THEN the response SHALL be forbidden

#### Scenario: New key defaults

- GIVEN an operator opens the create API key UI
- THEN own cost and token usage visibility SHALL be enabled by default
- AND shared account quota visibility SHALL be disabled by default

#### Scenario: Existing keys receive own-usage visibility on upgrade

- GIVEN an ordinary API key existed before this feature
- AND it does not have `self:usage`
- WHEN the compatibility migration or startup normalization runs
- THEN the API key SHALL have `self:usage`
- AND the API key SHALL NOT have `self:account-quota`

#### Scenario: Key without own-usage scope is denied

- GIVEN a valid API key does not have `self:usage`
- WHEN it calls `GET /api/v1/me/status`
- THEN the response status SHALL be `403`

### Requirement: Shared account quota permission

The self-service endpoint SHALL include shared account quota only when the authenticated key has `self:account-quota`.

#### Scenario: Account quota hidden by default

- GIVEN a valid API key has own-usage visibility
- AND it does not have `self:account-quota`
- WHEN it calls the self-service endpoint
- THEN the response SHALL NOT include shared account quota details

#### Scenario: Codex quota shown with explicit permission

- GIVEN a valid API key has `self:account-quota`
- AND it is restricted to exactly one Codex connection
- AND Codex quota data is available
- WHEN it calls the self-service endpoint
- THEN the response SHALL include normalized `session` and `weekly` quota windows
- AND each window SHALL include used percentage, remaining percentage, and reset timestamp when known

#### Scenario: Multiple connections are ambiguous

- GIVEN a valid API key has `self:account-quota`
- AND it is allowed to use more than one connection
- WHEN it calls the self-service endpoint
- THEN `accountQuota.available` SHALL be `false`
- AND `accountQuota.reason` SHALL be `ambiguous_connection`

#### Scenario: Unrestricted connections are ambiguous

- GIVEN a valid API key has `self:account-quota`
- AND its `allowedConnections` list is empty, meaning all connections are allowed
- WHEN it calls the self-service endpoint
- THEN `accountQuota.available` SHALL be `false`
- AND `accountQuota.reason` SHALL be `ambiguous_connection`

### Requirement: Dashboard configuration

The API Manager SHALL allow operators to configure self-service visibility and SHALL reuse the existing budget configuration surface for USD limits.

#### Scenario: Edit preserves unrelated scopes

- GIVEN an API key has scopes `["self:usage", "custom:scope"]`
- WHEN an operator enables shared account quota in the permissions UI
- THEN the saved scopes SHALL include `self:usage`
- AND the saved scopes SHALL include `self:account-quota`
- AND the saved scopes SHALL still include `custom:scope`

#### Scenario: Budget editing remains in existing budget UI

- GIVEN an operator wants to change a key's USD budget limit
- WHEN they use the dashboard
- THEN OmniRoute SHALL direct them to the existing budget configuration surface
- AND the create-key dialog SHALL NOT introduce a second budget editor

#### Scenario: No budget is displayed as not configured

- GIVEN an API key has no configured budget
- WHEN the API Manager shows self-service usage for that key
- THEN the UI SHALL show usage and token totals
- AND the budget limit, remaining amount, and percent SHALL be shown as not configured

### Requirement: Dashboard internationalization

All new API Manager text for self-service usage visibility, shared account quota visibility, and no-budget display SHALL use OmniRoute's existing i18n message system.

#### Scenario: New UI strings use translation keys

- GIVEN the API Manager renders the new self-service controls
- THEN labels, descriptions, tooltips, empty states, and errors SHALL come from translation keys
- AND no new user-visible dashboard text SHALL be hard-coded in the component

#### Scenario: Locale files stay structurally compatible

- GIVEN new API Manager translation keys are added
- WHEN the translation consistency check runs
- THEN supported locale message files SHALL have compatible key structure

### Requirement: Existing budget management remains protected

The existing `/api/usage/budget` management endpoint SHALL NOT become an own-key self-service data source.

#### Scenario: Self-service key cannot read arbitrary budget endpoint

- GIVEN an API key has `self:usage`
- AND it does not have `manage` or `admin`
- WHEN it calls `/api/usage/budget?apiKeyId=<another-key-id>`
- THEN the response SHALL be rejected by management auth
