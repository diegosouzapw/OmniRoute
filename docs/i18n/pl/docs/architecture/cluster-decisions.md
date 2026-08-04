---
title: "Decyzje klastrowe"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Decyzje klastrowe — opcjonalne profile sidecar

**Status:** propozycja (oczekuje na review @diegosouzapw)
**Date:** 2026-06-20
**Refs:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Dwa opt-in profile compose (`memory`, `bifrost`) dla istniejącego wdrożenia 8-usługowego w [`docker-compose.yml`](../../docker-compose.yml). Domyślne zachowanie `up` jest **niezmienione**: 3 × repliki `omniroute` + Caddy + Redis + CliproxyAPI. Dwa nowe profile dodają Qdrant i Bifrost jako opcjonalne sidecary, bramkowane przez `docker compose --profile <name> up`. **Żadna istniejąca usługa nie jest usuwana ani zastępowana.**

## Dlaczego to jest konserwatywne

Istniejący kształt wdrożenia OmniRoute jest już szczupły i sprawdzony:

- **`redis:7-alpine`** obsługuje obciążenie rate-limit/cache w skali produkcyjnej.
- **SQLite + sqlite-vec + FTS5** pokrywają lokalną pamięć + wektory + wyszukiwanie tekstowe (zob. [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** jest już LB + terminatorem TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** jest już zintegrowany jako router Tier-1 w [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar z kill switch przez zmienną środowiskową `BIFROST_ENABLED` — ustaw `=0`, aby ominąć sidecar i spaść na ścieżkę TS).

Te dwa profile to **opcje scale-out dla wdrożeń, które uderzają w sufit SQLite** — nie migracje. Oba są domyślnie wyłączone.

## Dwa profile

### `memory` — sidecar pamięci wektorowej Qdrant

**Kiedy włączyć:**

- > 1M embeddingów na wdrożenie (sqlite-vec zaczyna zwalniać przy skali).
- Wdrożenie multi-replica, które potrzebuje współdzielonego stanu wektorowego między `omniroute-1/2/3`.
- Masz już zewnętrzny klaster Qdrant (Qdrant Cloud, on-prem).

**Co dodaje:**

| Service  | Image                   | Ports       | Notes                                               |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Indeks HNSW; trwały wolumen `omniroute_qdrant_data` |

**Aktywacja:** ustaw `qdrantEnabled = true` w Settings UI **lub** ustaw env `QDRANT_HOST=qdrant`. Zob. [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) dla reguł pierwszeństwa (tabela settings → zmienna env → domyślna wartość).

**Zmienne env:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (zob. `.env.example` linie 1672-1683).

### `bifrost` — sidecar routera Tier-1 Bifrost

**Kiedy włączyć:**

- Uruchamiasz ≥3 repliki `omniroute` i chcesz scentralizowaną rotację providerów w jednym procesie Go.
- Chcesz jedną powierzchnię audit/logging dla żądań upstream-provider we wszystkich replikach.
- Chcesz skalowania horyzontalnego warstwy routingu Tier-1 niezależnie od replik OmniRoute.

**Co dodaje:**

| Service   | Image                            | Ports  | Notes                                                             |
| --------- | -------------------------------- | ------ | ----------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:1.5.21` | `8080` | Router Tier-1 w Go; trwały wolumen logów `omniroute_bifrost_logs` |

**Aktywacja:** ustaw `BIFROST_BASE_URL=http://bifrost:8080` w `.env.example`. Istniejąca trasa proxy sidecara w [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (dodana w PR #4381) przejmie to automatycznie.

**Zmienne env:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (zob. `.env.example` linie 1685-1695).

## Czego ten PR wyraźnie NIE robi

Oryginalny wątek issue proponował większy rewrite klastra. Po audycie rzeczywistego kształtu obciążenia poniższe zostały **odrzucone** z podanych powodów:

| Component                            | Verdict  | Reason                                                                                                                |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **DROP** | `redis:7-alpine` już wystarcza do obciążenia rate-limit w skali produkcyjnej; nie ma sufitu do przebicia.             |
| **NATS**                             | **DROP** | Każda replika `omniroute` to pojedynczy proces Node.js; nie ma obciążenia multi-process pub/sub.                      |
| **PostgreSQL**                       | **DROP** | SQLite + sqlite-vec + FTS5 pokrywają wszystkie 3 przypadki użycia; 97 migracji + pakowanie Electron blokują migrację. |
| **Neo4j**                            | **DROP** | Routing to join 5 tabel; rekurencyjne CTE na SQLite wystarcza.                                                        |
| **MinIO**                            | **DROP** | Brak obciążenia blobami multi-MB; images/audio to proxy passthrough.                                                  |
| **pgvector / pg_ai / pg_textsearch** | **DROP** | Ten sam powód sufitu SQLite co PostgreSQL; ekosystem pgvector jest pofragmentowany.                                   |
| **HAProxy / Envoy**                  | **DROP** | Caddy już robi LB + TLS; oba zostały wyraźnie odrzucone jako routery Tier-1 (zob. `AGENTS.md`).                       |

Jeśli przyszły przypadek użycia potwierdzi któryś z nich, ten dokument jest miejscem na poprawkę.

## Wdrożenie 4-tygodniowe (jeśli zatwierdzone)

1. **Wk 1** — Wylądowanie tego PR + weryfikacja profili opt-in na stosie compose z 3 replikami.
2. **Wk 2** — Pełna aktywacja Bifrost dla OpenAI/Claude/Gemini/Ollama (4 z 14+ providerów) przez trasę proxy sidecara w [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (bramkowane przez `BIFROST_ENABLED`, wyłączalne w runtime).
3. **Wk 3** — Profil pamięci Qdrant włączony w jednym wdrożeniu testowym; pomiar delty opóźnienia vs sqlite-vec.
4. **Wk 4** — Healthchecki observability (kody wyjścia `docker compose ps` + smoke testy `wget`); odświeżenie 71-pillar zgodnie z ADR-041.

## Pliki zmienione w tym PR

| File                                                 | Change                                                                                                                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 linii: profil `memory` (Qdrant), profil `bifrost` (Bifrost), trwałe wolumeny, healthchecki.                                                                                                                     |
| `.env.example`                                       | +24 linie: `QDRANT_*` (6 vars), `BIFROST_*` (4 vars).                                                                                                                                                               |
| `docs/reference/ENVIRONMENT.md`                      | +6 wierszy w sekcji 25 dla zmiennych env `QDRANT_*`.                                                                                                                                                                |
| `src/lib/memory/qdrant.ts`                           | +33 linie: łańcuch fallback zmiennych env (settings → env → default) dla `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 linii: 9 nowych przypadków testowych pinujących pierwszeństwo fallback zmiennych env.                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (this file) | NEW — zapis decyzji dla profili opt-in.                                                                                                                                                                             |
| `AGENTS.md`                                          | +1 linia: wskaźnik do tego dokumentu w tabeli dokumentacji referencyjnej.                                                                                                                                           |

**Net touched code:** 4 pliki produkcyjne (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 plik testowy (`qdrant-wiring.test.ts`), 2 pliki docs (`cluster-decisions.md`, `AGENTS.md`).
