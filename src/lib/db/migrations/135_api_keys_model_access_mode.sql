ALTER TABLE api_keys
ADD COLUMN model_access_mode TEXT NOT NULL DEFAULT 'all'
CHECK (model_access_mode IN ('all', 'restricted'));

UPDATE api_keys
SET model_access_mode = CASE
  WHEN allowed_models IS NULL OR trim(allowed_models) = '' THEN 'all'
  WHEN json_valid(allowed_models) = 1 AND (
    json_type(allowed_models) = 'null'
    OR (json_type(allowed_models) = 'array' AND json_array_length(allowed_models) = 0)
  ) THEN 'all'
  ELSE 'restricted'
END;
