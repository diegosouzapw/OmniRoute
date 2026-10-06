-- 149: Make API-key Combo access explicit: combo/* allows all; [] denies all.
-- Existing null/empty/malformed values meant allow-all before this migration.

UPDATE api_keys
SET allowed_combos = json_array('combo/*')
WHERE allowed_combos IS NULL
  OR trim(allowed_combos) = ''
  OR json_valid(allowed_combos) = 0
  OR CASE
    WHEN json_valid(allowed_combos) = 1 THEN json_type(allowed_combos) != 'array'
    ELSE 0
  END
  OR CASE
    WHEN json_valid(allowed_combos) = 1 AND json_type(allowed_combos) = 'array'
      THEN json_array_length(allowed_combos) = 0
    ELSE 0
  END;
