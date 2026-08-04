---
title: "Źródło kontekstu Local Corpus"
version: 3.8.49
lastUpdated: 2026-07-20
---

# Źródło kontekstu Local Corpus

> **Source of truth:** `src/lib/localCorpus/index.ts` (ograniczony indeks tekstowy),
> `src/lib/localCorpus/configured.ts` (skonfigurowany runtime),
> `src/lib/db/localCorpus.ts` (trwałość ścieżki root),
> `open-sse/mcp-server/tools/localCorpusTools.ts` (3 narzędzia MCP tylko do odczytu) oraz
> `src/app/api/settings/local-corpus/route.ts` (API ustawień).

## Czym to jest

Local Corpus pozwala operatorowi udostępnić jeden jawnie zatwierdzony katalog plików
tekstowych serwerowi MCP OmniRoute. Pliki pozostają w oryginalnym katalogu: OmniRoute
zapisuje w SQLite wyłącznie kanoniczną ścieżkę root i utrzymuje indeks wyszukiwania
w pamięci. Nie kopiuje zawartości korpusu do repozytorium ani bazy danych.

Odświeżanie indeksu jest przyrostowe. Niezmienione pliki są ponownie wykorzystywane
na podstawie rozmiaru i czasu modyfikacji, zmienione pliki są ponownie odczytywane
i hashowane SHA-256, a usunięte pliki są usuwane z indeksu. Wyszukiwanie odświeża
indeks starszy niż 30 sekund; wywołujący może też zażądać natychmiastowego odświeżenia.

## Konfiguracja źródła

Trasa ustawień wymaga tego samego uwierzytelniania zarządzającego co pozostałe API
ustawień. Przesłana ścieżka musi już istnieć i musi być bezwzględną ścieżką katalogu.

```bash
# Connect an approved directory
curl -X POST http://localhost:20128/api/settings/local-corpus \
  -H "Content-Type: application/json" \
  -d '{"rootPath":"/absolute/path/to/approved-text"}'

# Check configuration and index status
curl http://localhost:20128/api/settings/local-corpus

# Disconnect without changing source files
curl -X DELETE http://localhost:20128/api/settings/local-corpus
```

## Narzędzia MCP

Wszystkie trzy narzędzia wymagają `read:local-corpus`. Odpowiedzi narzędzi ujawniają
ścieżki względne oraz basename katalogu root, nigdy jego ścieżki bezwzględnej.

| Narzędzie             | Opis                                                                                          |
| :-------------------- | :-------------------------------------------------------------------------------------------- |
| `local_corpus_status` | Raportuje stan konfiguracji, rozmiar indeksu, limity oraz czas ostatniego odświeżenia         |
| `local_corpus_search` | Przeszukuje zindeksowany tekst i zwraca ograniczone snippety w zakresie linii (do 20 wyników) |
| `local_corpus_read`   | Odczytuje ograniczony zakres linii z jednego dozwolonego pliku względem korpusu               |

Przykładowe wejścia MCP:

```json
{ "query": "Red River monitoring", "limit": 10, "refresh": false }
```

```json
{ "relativePath": "hydrology/stations.md", "startLine": 20, "endLine": 80 }
```

## Granice bezpieczeństwa

- Allowlista jest zorientowana na tekst: `.cfg`, `.csv`, `.geojson`, `.htm`, `.html`, `.ini`,
  `.js`, `.json`, `.jsonl`, `.jsx`, `.log`, `.md`, `.mjs`, `.ps1`, `.py`, `.sh`,
  `.sql`, `.toml`, `.ts`, `.tsx`, `.txt`, `.xml`, `.yaml` oraz `.yml`.
- Dowiązania symboliczne są pomijane. Ścieżki odczytu są kanonizowane i muszą pozostać
  wewnątrz skonfigurowanego root; ścieżki bezwzględne oraz próby path traversal są odrzucane.
- Wykluczane są wrażliwe i generowane nazwy katalogów: `.build`, `.codex`, `.env`,
  `.git`, `.next`, `.omniroute`, `.ssh`, `coverage`, `dist`, `node_modules` oraz
  `secrets`.
- Domyślne limity to 5000 plików, 1 MiB na plik, 64 MiB łącznie zindeksowanej zawartości,
  około 4000 znaków na fragment wyszukiwania oraz 400 linii na odczyt.
- Pliki zawierające NUL są traktowane jako nietekstowe i pomijane lub odrzucane.

Dokumenty binarne, takie jak PDF, DOCX, obrazy i archiwa, są celowo nieobsługiwane.
Przed indeksowaniem przekonwertuj je do zatwierdzonego formatu tekstowego w skonfigurowanym
katalogu.

## Uwagi operacyjne

- Zmiana lub usunięcie skonfigurowanego root czyści współdzielony indeks w pamięci.
- Restart procesu odrzuca indeks; kolejne wyszukiwanie przebudowuje go ze skonfigurowanego
  źródła.
- `local_corpus_status` nie wymusza skanowania. Użyj `local_corpus_search` z
  `refresh: true`, gdy wymagane jest natychmiastowe ponowne skanowanie.
- Błędy skanowania i odczytu są zliczane lub zwracane jako zsanityzowane błędy; pliki
  źródłowe nigdy nie są modyfikowane.
