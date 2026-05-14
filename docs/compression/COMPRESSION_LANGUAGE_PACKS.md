---
title: "Compression Language Packs"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Compression Language Packs

Caveman compression can load language-specific rule packs in addition to the built-in English rules.
This keeps the core engine stable while allowing Portuguese, Spanish, German, French, Japanese, and
future language packs to evolve independently.

## Location

Language packs live under:

```txt
open-sse/services/compression/rules/<language>/
```

Current shipped packs (verified against `rules/` directory contents):

| Language            | Directory      | Rule categories present                             |
| ------------------- | -------------- | --------------------------------------------------- |
| English             | `rules/en/`    | `context`, `dedup`, `filler`, `structural`, `ultra` |
| Spanish             | `rules/es/`    | `context`, `dedup`, `filler`, `structural`, `ultra` |
| Portuguese (Brazil) | `rules/pt-BR/` | `context`, `filler`, `structural`                   |
| German              | `rules/de/`    | `context`, `filler`, `structural`                   |
| French              | `rules/fr/`    | `context`, `filler`, `structural`                   |
| Japanese            | `rules/ja/`    | `context`, `filler`, `structural`                   |

> **Parity note:** `en` and `es` packs have the full 5 categories; `pt-BR`, `de`, `fr`, `ja` ship 3 categories. The missing `dedup` and `ultra` categories silently fall back to the English built-ins. Contributions welcome to add `dedup.json` and `ultra.json` for the smaller packs.
>
> The canonical category list and per-category schema live in [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).

## Language Detection

`languageDetector.ts` uses lightweight heuristics to infer the language from prompt text. The
configured default language is still respected, and detection can be disabled by config when exact
control is required.

Detection output is used only to choose rule packs. It does not change provider routing, locale
selection, or UI language.

## Config Shape

Compression settings can include:

```json
{
  "languageConfig": {
    "enabled": true,
    "defaultLanguage": "en",
    "autoDetect": true,
    "enabledPacks": ["en", "pt-BR", "es", "de", "fr", "ja"]
  },
  "cavemanConfig": {
    "language": "en",
    "autoDetectLanguage": true,
    "enabledLanguagePacks": ["en", "pt-BR", "es", "de", "fr", "ja"]
  }
}
```

`languageConfig` controls dashboard/preview defaults. `cavemanConfig` is the runtime engine config
used when Caveman compresses message text.

## Adding a Language Pack

1. Create `open-sse/services/compression/rules/<language>/<pack>.json`.
2. Use the Caveman rule format from `docs/compression/COMPRESSION_RULES_FORMAT.md`.
3. Keep replacements conservative and avoid changing code, identifiers, URLs, or JSON.
4. Add or update tests for language selection and replacement behavior.
5. Expose new dashboard/i18n labels if the language appears in UI selectors.

## API

Available packs can be queried with:

```bash
curl http://localhost:20128/api/compression/language-packs
```

The preview endpoint accepts language config overrides:

```bash
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "standard",
    "text": "Por favor, eu gostaria que voce basicamente resumisse isso.",
    "config": {
      "languageConfig": {
        "defaultLanguage": "pt-BR",
        "autoDetect": true
      }
    }
  }'
```

## Operational Notes

- English built-in rules remain the fallback when a language pack is missing.
- Invalid built-in JSON packs fail validation so release assets do not silently degrade.
- Rule packs are data-only and should not import code or run arbitrary logic.
- The compression analytics layer records the selected mode and engine, not full prompt text.
