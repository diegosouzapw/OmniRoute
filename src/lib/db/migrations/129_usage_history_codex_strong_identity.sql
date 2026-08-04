-- Migration 128: Promote only provable Codex user/email snapshots to the
-- strong user identity written by current runtime code.
--
-- Migration 127 has already shipped, so this follow-up must repair existing
-- databases rather than editing the old migration. A weak historical snapshot
-- may be promoted only when the account_key itself recorded the same
-- chatgptUserId that the still-present OAuth Codex connection reports today:
-- the embedded historical user ID is proof the snapshot belongs to that user
-- only when the current connection has no nonblank workspaceId. A current
-- workspace may differ from the historical workspace, so migration 128 must
-- never derive a workspace-qualified key from that current value.
-- Email equality is deliberately NOT required (email can change). Snapshots
-- with a current nonblank workspace, workspace/email snapshots, mismatched
-- users, and other unproven identities stay unchanged until runtime observes
-- the matching account again.
--
-- Snapshots that are already strong, deleted/exported orphans, non-Codex,
-- non-OAuth, or malformed keep their historical identity. The statement is a
-- no-op when the strong key already matches, so reruns are idempotent.

UPDATE usage_history
SET account_key = (
  SELECT json_array(
    'oauth',
    'codex',
    'user',
    json_extract(c.provider_specific_data, '$.chatgptUserId')
  )
  FROM provider_connections c
  WHERE c.id = usage_history.connection_id
)
WHERE EXISTS (
  SELECT 1
  FROM provider_connections c
  WHERE c.id = usage_history.connection_id
    AND c.provider = 'codex'
    AND c.auth_type = 'oauth'
    AND json_valid(COALESCE(c.provider_specific_data, ''))
    AND json_type(c.provider_specific_data, '$.chatgptUserId') = 'text'
    AND json_extract(c.provider_specific_data, '$.chatgptUserId') <> ''
    AND (
      json_type(c.provider_specific_data, '$.workspaceId') IS NULL
      OR json_type(c.provider_specific_data, '$.workspaceId') <> 'text'
      OR trim(json_extract(c.provider_specific_data, '$.workspaceId')) = ''
    )
    AND json_valid(COALESCE(usage_history.account_key, ''))
    AND json_type(usage_history.account_key) = 'array'
    AND json_array_length(usage_history.account_key) = 6
    AND json_type(usage_history.account_key, '$[0]') = 'text'
    AND json_extract(usage_history.account_key, '$[0]') = 'oauth'
    AND json_type(usage_history.account_key, '$[1]') = 'text'
    AND json_extract(usage_history.account_key, '$[1]') = 'codex'
    AND json_type(usage_history.account_key, '$[2]') = 'text'
    AND json_extract(usage_history.account_key, '$[2]') = 'user'
    AND json_type(usage_history.account_key, '$[3]') = 'text'
    AND json_extract(usage_history.account_key, '$[3]') =
      json_extract(c.provider_specific_data, '$.chatgptUserId')
    AND json_type(usage_history.account_key, '$[4]') = 'text'
    AND json_extract(usage_history.account_key, '$[4]') = 'email'
    AND json_type(usage_history.account_key, '$[5]') = 'text'
    AND json_extract(usage_history.account_key, '$[5]') <> ''
);
