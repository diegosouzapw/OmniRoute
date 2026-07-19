-- Migration 127: Snapshot stable account identity on usage events.
-- Startup schema ensure adds the columns first so an interrupted pre-marker
-- upgrade can rerun this atomic backfill and index creation.

UPDATE usage_history
SET
  account_key = COALESCE(
    (
      SELECT CASE
        WHEN c.auth_type = 'oauth'
          AND c.provider = 'codex'
          AND json_valid(COALESCE(c.provider_specific_data, ''))
          AND json_type(c.provider_specific_data, '$.workspaceId') = 'text'
          AND json_extract(c.provider_specific_data, '$.workspaceId') <> ''
          AND c.email <> ''
        THEN json_array(
          'oauth',
          c.provider,
          'workspace',
          json_extract(c.provider_specific_data, '$.workspaceId'),
          'email',
          c.email
        )
        WHEN c.auth_type = 'oauth'
          AND c.provider = 'codex'
          AND json_valid(COALESCE(c.provider_specific_data, ''))
          AND json_type(c.provider_specific_data, '$.chatgptUserId') = 'text'
          AND json_extract(c.provider_specific_data, '$.chatgptUserId') <> ''
          AND c.email <> ''
        THEN json_array(
          'oauth',
          c.provider,
          'user',
          json_extract(c.provider_specific_data, '$.chatgptUserId'),
          'email',
          c.email
        )
        WHEN c.auth_type = 'oauth'
          AND c.provider <> 'codex'
          AND c.email <> ''
          AND json_valid(COALESCE(c.provider_specific_data, ''))
          AND json_type(c.provider_specific_data, '$.username') = 'text'
          AND json_extract(c.provider_specific_data, '$.username') <> ''
        THEN json_array(
          'oauth',
          CASE WHEN typeof(c.provider) = 'text' AND c.provider <> '' THEN c.provider ELSE 'unknown' END,
          'email',
          c.email,
          'username',
          json_extract(c.provider_specific_data, '$.username')
        )
        WHEN c.auth_type = 'oauth'
          AND c.provider <> 'codex'
          AND c.email <> ''
        THEN json_array(
          'oauth',
          CASE WHEN typeof(c.provider) = 'text' AND c.provider <> '' THEN c.provider ELSE 'unknown' END,
          'email',
          c.email
        )
        ELSE json_array(
          'connection',
          CASE WHEN typeof(c.provider) = 'text' AND c.provider <> '' THEN c.provider ELSE 'unknown' END,
          CASE
            WHEN typeof(c.id) = 'text' AND c.id <> '' THEN c.id
            WHEN typeof(usage_history.connection_id) = 'text' AND usage_history.connection_id <> ''
            THEN usage_history.connection_id
            ELSE 'unknown'
          END
        )
      END
      FROM provider_connections c
      WHERE c.id = usage_history.connection_id
    ),
    json_array(
      'connection',
      CASE
        WHEN typeof(usage_history.provider) = 'text' AND usage_history.provider <> ''
        THEN usage_history.provider
        ELSE 'unknown'
      END,
      CASE
        WHEN typeof(usage_history.connection_id) = 'text' AND usage_history.connection_id <> ''
        THEN usage_history.connection_id
        ELSE 'unknown'
      END
    )
  ),
  account_label = COALESCE(
    (
      SELECT COALESCE(
        NULLIF(TRIM(c.display_name), ''),
        NULLIF(TRIM(c.email), ''),
        NULLIF(TRIM(c.name), ''),
        NULLIF(TRIM(c.id), '')
      )
      FROM provider_connections c
      WHERE c.id = usage_history.connection_id
    ),
    NULLIF(TRIM(usage_history.connection_id), ''),
    'unknown'
  ),
  account_label_priority = COALESCE(
    (
      SELECT CASE
        WHEN NULLIF(TRIM(c.display_name), '') IS NOT NULL THEN 4
        WHEN NULLIF(TRIM(c.email), '') IS NOT NULL THEN 3
        WHEN NULLIF(TRIM(c.name), '') IS NOT NULL THEN 2
        WHEN NULLIF(TRIM(c.id), '') IS NOT NULL THEN 1
        ELSE 0
      END
      FROM provider_connections c
      WHERE c.id = usage_history.connection_id
    ),
    CASE WHEN NULLIF(TRIM(usage_history.connection_id), '') IS NOT NULL THEN 1 ELSE 0 END
  )
WHERE account_key IS NULL OR account_key = '';

UPDATE usage_history
SET
  account_label = COALESCE(
    (
      SELECT COALESCE(
        NULLIF(TRIM(c.display_name), ''),
        NULLIF(TRIM(c.email), ''),
        NULLIF(TRIM(c.name), ''),
        NULLIF(TRIM(c.id), '')
      )
      FROM provider_connections c
      WHERE c.id = usage_history.connection_id
    ),
    NULLIF(TRIM(usage_history.connection_id), ''),
    'unknown'
  ),
  account_label_priority = COALESCE(
    (
      SELECT CASE
        WHEN NULLIF(TRIM(c.display_name), '') IS NOT NULL THEN 4
        WHEN NULLIF(TRIM(c.email), '') IS NOT NULL THEN 3
        WHEN NULLIF(TRIM(c.name), '') IS NOT NULL THEN 2
        WHEN NULLIF(TRIM(c.id), '') IS NOT NULL THEN 1
        ELSE 0
      END
      FROM provider_connections c
      WHERE c.id = usage_history.connection_id
    ),
    CASE WHEN NULLIF(TRIM(usage_history.connection_id), '') IS NOT NULL THEN 1 ELSE 0 END
  )
WHERE account_key IS NOT NULL
  AND account_key <> ''
  AND (account_label IS NULL OR account_label = '');

CREATE INDEX IF NOT EXISTS idx_uh_account_key ON usage_history(account_key);
