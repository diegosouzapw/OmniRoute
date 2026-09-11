- **chore(ci):** two gates that close the blind spots behind the exclusions above.
  `check:vitest-exclusions` requires every Vitest exclusion to name a tracking issue and to
  appear in `config/quality/vitest-exclusions.json` — the previous list grew to 62 files behind
  a comment pointing at an issue that had been closed for a month. `check-new-key-coverage`
  requires a key newly added to `en.json` to reach every locale; the existing coverage gate is a
  percentage floor per locale, so eleven absent keys out of ~13,000 left it at 99.9% while a
  whole feature shipped untranslated in nine languages. Both are diff-aware, so pre-existing
  debt stays frozen and neither needed a migration to turn on.
