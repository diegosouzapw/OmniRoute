---
title: "Paczki językowe kompresji"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Paczki językowe kompresji

Kompresja Caveman może ładować pakiety reguł specyficzne dla języka obok wbudowanych reguł angielskich.
Dzięki temu silnik bazowy pozostaje stabilny, a paczki portugalskie, hiszpańskie, niemieckie, francuskie, japońskie
i przyszłe mogą ewoluować niezależnie.

## Lokalizacja

Paczki językowe znajdują się w:

```txt
open-sse/services/compression/rules/<language>/
```

Aktualnie dostarczane paczki (zweryfikowane względem zawartości katalogu `rules/`):

| Język                  | Katalog        | Obecne kategorie reguł                              |
| ---------------------- | -------------- | --------------------------------------------------- |
| Angielski              | `rules/en/`    | `context`, `dedup`, `filler`, `structural`, `ultra` |
| Hiszpański             | `rules/es/`    | `context`, `dedup`, `filler`, `structural`, `ultra` |
| Portugalski (Brazylia) | `rules/pt-BR/` | `context`, `dedup`, `filler`, `structural`, `ultra` |
| Indonezyjski           | `rules/id/`    | `context`, `dedup`, `filler`, `structural`, `ultra` |
| Niemiecki              | `rules/de/`    | `context`, `filler`, `structural`                   |
| Francuski              | `rules/fr/`    | `context`, `filler`, `structural`                   |
| Japoński               | `rules/ja/`    | `context`, `filler`, `structural`                   |

> **Uwaga o parytecie:** paczki `en`, `es`, `pt-BR` i `id` mają pełne 5 kategorii; `de`, `fr`, `ja` dostarczają 3 kategorie. Brakujące kategorie `dedup` i `ultra` cicho wracają do angielskich wbudowanych. Wkład mile widziany — dodaj `dedup.json` i `ultra.json` do mniejszych paczek.
>
> Paczka `pt-BR` opiera się na **[Troglodita](https://github.com/leninejunior/troglodita)** autorstwa Lenine Júnior — systemie kompresji zaprojektowanym od zera pod gramatykę portugalskiego brazylijskiego (redukcja pleonazmów, usuwanie wypełniaczy PT-BR, skróty techniczne dla społeczności deweloperów BR).
>
> Kanoniczna lista kategorii i schemat per kategoria znajdują się w [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).

## Wykrywanie języka

`languageDetector.ts` używa lekkich heurystyk, aby wywnioskować język z tekstu promptu.
Skonfigurowany domyślny język jest nadal respektowany, a wykrywanie można wyłączyć w konfiguracji,
gdy wymagana jest ścisła kontrola.

Wynik wykrywania służy wyłącznie do wyboru paczek reguł. Nie zmienia routingu providerów, wyboru
locale ani języka UI.

## Kształt konfiguracji

Ustawienia kompresji mogą zawierać:

```json
{
  "languageConfig": {
    "enabled": true,
    "defaultLanguage": "en",
    "autoDetect": true,
    "enabledPacks": ["en", "pt-BR", "es", "id", "de", "fr", "ja"]
  },
  "cavemanConfig": {
    "language": "en",
    "autoDetectLanguage": true,
    "enabledLanguagePacks": ["en", "pt-BR", "es", "id", "de", "fr", "ja"]
  }
}
```

`languageConfig` steruje domyślnymi wartościami dashboardu/podglądu. `cavemanConfig` to konfiguracja
silnika runtime używana, gdy Caveman kompresuje tekst wiadomości.

## Dodawanie paczki językowej

1. Utwórz `open-sse/services/compression/rules/<language>/<pack>.json`.
2. Użyj formatu reguł Caveman z `docs/compression/COMPRESSION_RULES_FORMAT.md`.
3. Zachowuj konserwatywne zamiany i unikaj zmiany kodu, identyfikatorów, URL-i oraz JSON.
4. Dodaj lub zaktualizuj testy wyboru języka i zachowania zamian.
5. Udostępnij nowe etykiety dashboardu/i18n, jeśli język pojawia się w selektorach UI.

## API

Dostępne paczki można odpytać przez:

```bash
curl http://localhost:20128/api/compression/language-packs
```

Endpoint podglądu akceptuje nadpisania konfiguracji języka:

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

## SHARED_BOUNDARIES (v3.8.0)

Wszystkie 6 paczek językowych otrzymało klauzulę `SHARED_BOUNDARIES` w v3.8.0, stosowaną przy każdej
intensywności Caveman (LITE, FULL, ULTRA). Nakazuje silnikowi zachować te wzorce dosłownie,
niezależnie od usuwania otaczających wypełniaczy:

| Typ wzorca                              | Przykład                               |
| --------------------------------------- | -------------------------------------- |
| Bloki kodu w płotkach (fenced)          | ` ```python\n...\n``` `                |
| Kod inline                              | `` `my_var` ``                         |
| URL-e                                   | `https://example.com/path`             |
| Ścieżki plików (bezwzględne + względne) | `/etc/hosts`, `./src/index.ts`         |
| Nagłówki błędów                         | `Error:`, `TypeError:`, `SyntaxError:` |
| Linie stack trace                       | `  at functionName (file.ts:12:3)`     |

Te wzorce są wypełniane w `DEFAULT_CAVEMAN_CONFIG.preservePatterns` (wcześniej `[]`).
Stała znajduje się w `open-sse/services/compression/types.ts`.

### Dlaczego to ma znaczenie

Bez SHARED_BOUNDARIES agresywne tryby Caveman mogłyby usuwać treść, która wyglądała jak powtarzalna
proza, a w rzeczywistości była fragmentem kodu, ścieżką pliku lub stackiem błędu. SHARED_BOUNDARIES
działa jako agnostyczna językowo siatka bezpieczeństwa stosowana przed regułami wypełniaczy.

### Dostosowywanie preservePatterns

Dodatkowe wzorce można dodać w runtime przez ustawienia kompresji:

````json
{
  "cavemanConfig": {
    "preservePatterns": [
      "```[\\s\\S]*?```",
      "`[^`]+`",
      "https?://\\S+",
      "(?:/|\\./)[^\\s]+",
      "\\b(?:Error|TypeError|SyntaxError|RangeError):",
      "\\s+at\\s+\\S+\\s+\\(\\S+:\\d+:\\d+\\)"
    ]
  }
}
````

Wzorce niestandardowe rozszerzają (nie zastępują) 6 domyślnych.

---

## Uwagi operacyjne

- Angielskie reguły wbudowane pozostają fallbackiem, gdy brakuje paczki językowej.
- Nieprawidłowe wbudowane paczki JSON nie przechodzą walidacji, więc artefakty wydania nie degradują się po cichu.
- Paczki reguł są wyłącznie danymi i nie powinny importować kodu ani uruchamiać dowolnej logiki.
- Warstwa analityki kompresji zapisuje wybrany tryb i silnik, a nie pełny tekst promptu.
