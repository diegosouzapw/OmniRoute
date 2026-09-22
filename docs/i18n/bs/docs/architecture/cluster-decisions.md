# Cluster Decisions — Optional Sidecar Profiles (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

# Odluke o klasteru — Opcioni sidecar profili

**Status:** prijedlog (čeka se pregled od @diegosouzapw)
**Datum:** 2026-06-20
**Ref:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Dva opciona compose profila (`memory`, `bifrost`) za postojeću implementaciju od 8 servisa u [`docker-compose.yml`](../../docker-compose.yml). Ponašanje pri podrazumijevanom pokretanju (default-up) je **nepromijenjeno**: 3 × `omniroute` replike + Caddy + Redis + CliproxyAPI. Dva nova profila dodaju Qdrant i Bifrost kao opcione sidecar servise, kontrolisane pomoću `docker compose --profile <name> up`. **Nijedan postojeći servis nije uklonjen ili zamijenjen.**

## Zašto je ovo konzervativan pristup

Postojeća struktura implementacije OmniRoute-a je već lagana i provjerena:

- **`redis:7-alpine`** upravlja radnim opterećenjem ograničenja brzine/keširanja (rate-limit/cache) na produkcijskom nivou.
- **SQLite + sqlite-vec + FTS5** pokrivaju lokalnu memoriju + vektor + pretragu teksta (pogledajte [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** je već LB + TLS terminator ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** je već integrisan kao Tier-1 ruter u [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar proxy sa kill switch-em putem `BIFROST_ENABLED` env varijable — postavite `=0` da zaobiđete sidecar i pređete na TS putanju).

Dva profila ovdje su **opcije za horizontalno skaliranje za implementacije koje dostižu ograničenja SQLite-a** — a ne migracije. Oba su podrazumijevano isključena.

## Dva profila

### `memory` — Qdrant vektorski memorijski sidecar

**Kada uključiti:**

- > 1M embeddinga po implementaciji (sqlite-vec počinje usporavati pri većem obimu).
- Implementacija sa više replika kojoj je potrebno dijeljeno vektorsko stanje između `omniroute-1/2/3`.
- Već imate eksterni Qdrant klaster (Qdrant Cloud, on-prem).

**Šta dodaje:**

| Servis   | Slika                   | Portovi     | Napomene                                            |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW indeks; trajni volumen `omniroute_qdrant_data` |

**Aktivacija:** uključite `qdrantEnabled = true` u Settings UI-u **ili** postavite `QDRANT_HOST=qdrant` env. Pogledajte [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) za pravila prioriteta (tabela postavki → env varijabla → podrazumijevano).

**Env varijable:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (pogledajte `.env.example` linije 1672-1683).

### `bifrost` — Bifrost Tier-1 ruter sidecar

**Kada uključiti:**

- Pokrećete ≥3 `omniroute` replike i želite centralizovanu rotaciju provajdera u jednom Go procesu.
- Želite jedinstvenu površinu za reviziju/logovanje za zahtjeve prema upstream provajderima kroz sve replike.
- Želite horizontalno skaliranje Tier-1 sloja rutiranja nezavisno od OmniRoute replika.

**Šta dodaje:**

| Servis    | Slika                             | Portovi | Napomene                                                                         |
| --------- | --------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Tier-1 ruter zasnovan na Go-u; trajni volumen za logove `omniroute_bifrost_logs` |

**Aktivacija:** postavite `BIFROST_BASE_URL=http://bifrost:8080` u `.env.example`. Postojeća sidecar proxy ruta na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (dodata u PR #4381) će ovo automatski preuzeti.

**Env varijable:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (pogledajte `.env.example` linije 1685-1695).

## Šta ovaj PR izričito NE radi

Originalna nit problema (issue thread) je predložila veći rewrite klastera. Nakon revizije stvarnog oblika radnog opterećenja, sljedeće stavke su **odbijene** iz navedenih razloga:

| Komponenta                           | Odluka       | Razlog                                                                                                                                                      |
| ------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ODBAČENO** | `redis:7-alpine` je već sasvim dovoljan za radno opterećenje ograničenja stope (rate-limit) na produkcijskoj skali; nema gornje granice koju treba probiti. |
| **NATS**                             | **ODBAČENO** | Svaka `omniroute` replika je jedan Node.js proces; ne postoji radno opterećenje sa više procesa (multi-process pub/sub).                                    |
| **PostgreSQL**                       | **ODBAČENO** | SQLite + sqlite-vec + FTS5 pokrivaju sva 3 slučaja upotrebe; 97 migracija + Electron pakovanje blokiraju migraciju.                                         |
| **Neo4j**                            | **ODBAČENO** | Rutiranje je spajanje (join) 5 tabela; rekurzivni CTE na SQLite-u je dovoljan.                                                                              |
| **MinIO**                            | **ODBAČENO** | Nema radnog opterećenja sa blobovima od više MB; slike/audio su passthrough proxyji.                                                                        |
| **pgvector / pg_ai / pg_textsearch** | **ODBAČENO** | Isti razlog gornje granice SQLite-a kao i kod PostgreSQL-a; pgvector ekosistem je fragmentiran.                                                             |
| **HAProxy / Envoy**                  | **ODBAČENO** | Caddy već obavlja LB + TLS; oba su izričito odbijena kao Tier-1 ruteri (pogledajte `AGENTS.md`).                                                            |

Ako budući slučaj upotrebe opravda neku od ovih stavki, ovaj dokument je mjesto za izmjene.

## 4-nedeljno uvođenje (ako bude odobreno)

1. **1. nedelja** — Implementacija ovog PR-a + verifikacija opt-in profila sa compose stackom od 3 replike.
2. **2. nedelja** — Potpuna aktivacija Bifrost-a za OpenAI/Claude/Gemini/Ollama (4 od 14+ provajdera) koristeći sidecar proxy rutu na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ograničeno sa `BIFROST_ENABLED`, sa mogućnošću isključivanja u runtime-u).
3. **3. nedelja** — Qdrant memorijski profil omogućen u jednoj testnoj implementaciji; mjerenje delta latencije u odnosu na sqlite-vec.
4. **4. nedelja** — Observability healthcheckovi (izlazni kodovi `docker compose ps` + `wget` smoke testovi); osvježavanje 71-pillar prema ADR-041.

## Datoteke izmijenjene u ovom PR-u

| Datoteka                                                | Izmjena                                                                                                                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                    | +30 linija: `memory` profil (Qdrant), `bifrost` profil (Bifrost), trajni volumeni, healthcheckovi.                                                                                                                  |
| `.env.example`                                          | +24 linije: `QDRANT_*` (6 varijabli), `BIFROST_*` (4 varijable).                                                                                                                                                    |
| `docs/reference/ENVIRONMENT.md`                         | +6 redova u sekciji 25 za `QDRANT_*` env varijable.                                                                                                                                                                 |
| `src/lib/memory/qdrant.ts`                              | +33 linije: lanac fallback-a env-varijabli (settings → env → default) za `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | +88 linija: 9 novih testnih slučajeva koji fiksiraju prioritet fallback-a env-varijabli.                                                                                                                            |
| `docs/architecture/cluster-decisions.md` (ova datoteka) | NOVO — zapis odluke za opt-in profile.                                                                                                                                                                              |
| `AGENTS.md`                                             | +1 linija: pokazivač na ovaj dokument u tabeli referentne dokumentacije.                                                                                                                                            |

**Neto izmijenjeni kod:** 4 produkcijske datoteke (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testna datoteka (`qdrant-wiring.test.ts`), 2 dokumentacione datoteke (`cluster-decisions.md`, `AGENTS.md`).
