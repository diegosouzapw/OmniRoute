- **chore(release):** merge-train `--fast` now classifies changed tests with the same
  `tests/unit/{…}` subdir allowlist `test:unit` runs — vitest-only subdirs (e.g.
  `tests/unit/autoCombo/`) are skipped instead of misrun under node:test, and
  `tests/unit/ui/**/*.test.ts` (node:test) is no longer over-excluded.
