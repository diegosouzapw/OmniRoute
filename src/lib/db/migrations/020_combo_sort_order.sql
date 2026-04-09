ALTER TABLE combos ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0;

WITH ordered_combos AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      ORDER BY created_at ASC, updated_at ASC, name COLLATE NOCASE ASC
    ) AS next_sort_order
  FROM combos
)
UPDATE combos
SET sort_order = (
  SELECT next_sort_order
  FROM ordered_combos
  WHERE ordered_combos.id = combos.id
);
