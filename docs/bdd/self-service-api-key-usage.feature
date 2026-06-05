Feature: Self-service API key usage and account quota visibility

  Background:
    Given OmniRoute has usage accounting enabled
    And management APIs require a dashboard session or a key with "manage" or "admin"

  Scenario: A delegated key reads its own cost and token usage
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" already has a monthly USD budget of 50 configured in the existing budget UI
    And "team-a" has current-period spend of 12.50 USD
    And "team-a" has current-period token usage:
      | input | output | cache_read | cache_creation | reasoning |
      | 900000 | 32000 | 120000 | 10000 | 5000 |
    When "team-a" calls GET "/api/v1/me/status" with its Bearer token
    Then the response status should be 200
    And the response apiKey.name should be "team-a"
    And the response usage.cost.limitUsd should be 50
    And the response usage.cost.usedUsd should be 12.50
    And the response usage.cost.usedPercent should be 25
    And the response usage.tokens.totalTokens should be 1067000

  Scenario: A delegated key cannot query another key by id
    Given an API key named "team-a" has the scope "self:usage"
    And an API key named "team-b" has the scope "self:usage"
    And "team-b" has current-period spend of 99.00 USD
    When "team-a" calls GET "/api/v1/me/status?apiKeyId=<team-b-id>" with its Bearer token
    Then the response status should be 200
    And the response apiKey.name should be "team-a"
    And the response should not contain "team-b"
    And the response should not contain "99.00" as team-b usage

  Scenario: Anonymous client API mode does not expose self-service status
    Given global client API auth allows anonymous local traffic
    When an anonymous caller calls GET "/api/v1/me/status"
    Then the response status should be 401

  Scenario: Self-service usage scope does not grant management access
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" does not have the scope "manage"
    And "team-a" does not have the scope "admin"
    When "team-a" calls GET "/api/usage/history" with its Bearer token
    Then the response status should be 403

  Scenario: Own usage visibility can be disabled
    Given an API key named "team-a" does not have the scope "self:usage"
    When "team-a" calls GET "/api/v1/me/status" with its Bearer token
    Then the response status should be 403

  Scenario: Existing ordinary keys are backfilled for own usage visibility
    Given an ordinary API key named "legacy-key" existed before self-service usage scopes
    And "legacy-key" does not have the scope "self:usage"
    When OmniRoute runs the compatibility migration
    Then "legacy-key" should have the scope "self:usage"
    And "legacy-key" should not have the scope "self:account-quota"

  Scenario: Shared account quota is hidden by default
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" does not have the scope "self:account-quota"
    And "team-a" is restricted to a Codex connection with available quota
    When "team-a" calls GET "/api/v1/me/status" with its Bearer token
    Then the response status should be 200
    And the response should not include shared account quota details

  Scenario: Shared provider account quotas are visible with explicit permission
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" has the scope "self:account-quota"
    And "team-a" is restricted to a Codex connection and a Claude connection
    And Codex reports a session quota with 1 percent used
    And Claude reports a daily quota with 35 percent used
    When "team-a" calls GET "/api/v1/me/status" with its Bearer token
    Then the response status should be 200
    And the response accountQuotas should contain 2 entries
    And the first response accountQuotas entry provider should be "codex"
    And the first response accountQuotas entry quotas.session.remainingPercentage should be 99
    And the second response accountQuotas entry provider should be "claude"
    And the second response accountQuotas entry quotas.daily.remainingPercentage should be 65

  Scenario: A single allowed provider also keeps the compatibility accountQuota field
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" has the scope "self:account-quota"
    And "team-a" is restricted to exactly one Codex connection
    And Codex reports a weekly quota with 97 percent used
    When "team-a" calls GET "/api/v1/me/status" with its Bearer token
    Then the response status should be 200
    And the response accountQuotas should contain 1 entry
    And the response accountQuota.provider should be "codex"
    And the response accountQuota.quotas.weekly.remainingPercentage should be 3

  Scenario: Unrestricted keys can see all active provider account quotas
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" has the scope "self:account-quota"
    And "team-a" has no explicit allowed connection restrictions
    And OmniRoute has active Codex and Cursor provider connections with quota data
    When "team-a" calls GET "/api/v1/me/status" with its Bearer token
    Then the response status should be 200
    And the response accountQuotas should contain the Codex account quota
    And the response accountQuotas should contain the Cursor account quota

  Scenario: Provider connection lookup failures do not hide own usage
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" has the scope "self:account-quota"
    And "team-a" is restricted to a Codex connection and another provider connection
    And OmniRoute cannot resolve the other provider connection metadata
    When "team-a" calls GET "/api/v1/me/status" with its Bearer token
    Then the response status should be 200
    And the response should still include own cost and token usage
    And the unresolved response accountQuotas entry should have available false
    And the unresolved response accountQuotas entry reason should be "connection_lookup_failed"

  Scenario: Existing budget endpoint stays management-only
    Given an API key named "team-a" has the scope "self:usage"
    And "team-a" does not have the scope "manage"
    When "team-a" calls GET "/api/usage/budget?apiKeyId=<another-key-id>" with its Bearer token
    Then the response status should be 403

  Scenario: API Manager defaults are privacy-preserving
    Given an operator opens the create API key dialog
    Then the own cost and token usage visibility control should be checked
    And the shared account quota visibility control should be unchecked
    And management access should be unchecked
    And the dialog should not include a second budget editor

  Scenario: API Manager preserves unrelated scopes
    Given an API key has scopes:
      | scope |
      | self:usage |
      | custom:scope |
    When an operator enables shared account quota in the permissions dialog
    And saves the permissions
    Then the API key scopes should include "self:usage"
    And the API key scopes should include "self:account-quota"
    And the API key scopes should include "custom:scope"

  Scenario: API Manager uses existing budget configuration
    Given an operator wants to set a monthly USD budget for an API key
    When the operator uses the dashboard
    Then the operator should use the existing budget configuration surface
    And the create key dialog should not save budget limits

  Scenario: New API Manager text is localized
    Given the dashboard locale is not English
    When the API Manager renders self-service visibility controls
    Then the labels should come from the API Manager translation namespace
    And the component should not render hard-coded English strings for the new controls
