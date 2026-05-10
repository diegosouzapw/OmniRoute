-- 043: Upgrade the seeded default compression combo from Caveman-only to RTK + Caveman.

UPDATE compression_combos
SET
  description = 'Default RTK + Caveman compression pipeline',
  pipeline = '[{"engine":"rtk","intensity":"standard"},{"engine":"caveman","intensity":"full"}]',
  updated_at = datetime('now')
WHERE
  id = 'default-caveman'
  AND name = 'Standard Savings'
  AND description = 'Default Caveman compression pipeline'
  AND pipeline = '[{"engine":"caveman","intensity":"full"}]';
