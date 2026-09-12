- **fix(i18n):** the nine locales added with the EU-language batch (Greek, Estonian, Irish,
  Croatian, Lithuanian, Latvian, Maltese, Slovenian, Serbian) were missing the eleven
  Orchestration Canvas keys that Phase 3 introduced, so the compare-runs panel and the
  "no runs match these filters" empty state fell back to English in those languages
  (`deepMergeFallback` substitutes English for an absent key, so nothing rendered blank —
  it rendered untranslated). The coverage gate does not catch this: it enforces an 80% floor
  per locale, and eleven missing keys out of ~13,000 leaves coverage at 99.9%. Translated for
  real in each language, calibrated against the wording each file already uses for "run",
  "filter" and "skill".
