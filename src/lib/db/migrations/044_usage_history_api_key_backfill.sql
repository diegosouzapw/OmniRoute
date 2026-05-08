-- Usage History API Key Backfill
-- Backfills missing API key names and IDs in usage_history using the connection_id

UPDATE usage_history
SET 
  api_key_name = (
    SELECT api_key_name
    FROM usage_history AS uh2
    WHERE uh2.connection_id = usage_history.connection_id
      AND uh2.api_key_name IS NOT NULL
      AND uh2.api_key_name != ''
    GROUP BY uh2.api_key_name
    ORDER BY COUNT(*) DESC
    LIMIT 1
  ),
  api_key_id = (
    SELECT api_key_id
    FROM usage_history AS uh2
    WHERE uh2.connection_id = usage_history.connection_id
      AND uh2.api_key_id IS NOT NULL
      AND uh2.api_key_id != ''
    GROUP BY uh2.api_key_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
  )
WHERE (api_key_name IS NULL OR api_key_name = '')
  AND connection_id IS NOT NULL;
