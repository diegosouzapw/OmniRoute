# Cluster Decisions — Optional Sidecar Profiles (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Stav:** návrh (čeká na kontrolu od @diegosouzapw)
**Datum:** 2026-06-20
**Odkazy:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Stručně

Dva volitelné profily Compose (`memory`, `bifrost`) pro stávající nasazení 8 služeb v souboru [`docker-compose.yml`](../../docker-compose.yml). Výchozí chování při spuštění je **beze změny**: 3 × repliky `omniroute` + Caddy + Redis + CliproxyAPI. Dva nové profily přidávají Qdrant a Bifrost jako volitelné sidecary, aktivované pomocí `docker compose --profile <name> up`. **Žádná existující služba není odebrána ani nahrazena.**

## Proč je tento přístup konzervativní

Stávající architektura nasazení OmniRoute je již úsporná a osvědčená:

- **`redis:7-alpine`** zvládá při produkčním zatížení omezení rychlosti a ukládání do mezipaměti.
- **SQLite + sqlite-vec + FTS5** pokrývají lokální paměť, vektorové vyhledávání a textové vyhledávání (viz [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** již funguje jako nástroj pro vyvažování zátěže a ukončení TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** je již integrován jako směrovač 1. úrovně v souboru [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar proxy s nouzovým vypínačem prostřednictvím proměnné prostředí `BIFROST_ENABLED` — nastavením `=0` sidecar obejdete a přejdete na cestu TS).

Tyto dva profily představují **možnosti škálování pro nasazení, která narazí na limity SQLite** — nejde o migrace. Oba jsou ve výchozím nastavení vypnuté.

## Dva profily

### `memory` — sidecar Qdrant pro vektorovou paměť

**Kdy jej zapnout:**

- > 1M embeddingů na jedno nasazení (sqlite-vec se při velkém objemu začíná zpomalovat).
- Nasazení s více replikami, které potřebuje sdílený vektorový stav mezi `omniroute-1/2/3`.
- Již máte externí cluster Qdrant (Qdrant Cloud, místní nasazení).

**Co přidává:**

| Služba   | Image                   | Porty       | Poznámky                                          |
| -------- | ----------------------- | ----------- | ------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Index HNSW; trvalý svazek `omniroute_qdrant_data` |

**Aktivace:** zapněte `qdrantEnabled = true` v uživatelském rozhraní Nastavení **nebo** nastavte proměnnou prostředí `QDRANT_HOST=qdrant`. Pravidla priority (tabulka nastavení → proměnná prostředí → výchozí hodnota) naleznete v souboru [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Proměnné prostředí:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (viz řádky 1672–1683 v souboru `.env.example`).

### `bifrost` — sidecar Bifrost pro směrovač 1. úrovně

**Kdy jej zapnout:**

- Provozujete ≥3 repliky `omniroute` a chcete centralizovat rotaci poskytovatelů v jediném procesu Go.
- Chcete jednotné místo pro audit a protokolování požadavků na upstream poskytovatele napříč všemi replikami.
- Chcete horizontálně škálovat směrovací vrstvu 1. úrovně nezávisle na replikách OmniRoute.

**Co přidává:**

| Služba    | Image                             | Porty  | Poznámky                                                                            |
| --------- | --------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Směrovač 1. úrovně založený na Go; trvalý svazek protokolů `omniroute_bifrost_logs` |

**Aktivace:** nastavte `BIFROST_BASE_URL=http://bifrost:8080` v souboru `.env.example`. Stávající trasa sidecar proxy v souboru [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (přidaná v PR #4381) tuto hodnotu automaticky použije.

**Proměnné prostředí:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (viz řádky 1685–1695 v souboru `.env.example`).

## Co tento PR výslovně NEDĚLÁ

V původním vlákně issue byl navržen rozsáhlejší přepis clusteru. Po auditu skutečné podoby zátěže jsou následující komponenty z uvedených důvodů **zamítnuty**:

| Komponenta                           | Verdikt     | Důvod                                                                                                                           |
| ------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **VYŘADIT** | `redis:7-alpine` již pro rate-limit zátěž v produkčním měřítku dostačuje; neexistuje žádný limit, který by bylo nutné překonat. |
| **NATS**                             | **VYŘADIT** | Každá replika `omniroute` je samostatný proces Node.js; neexistuje žádná víceprocesová pub/sub zátěž.                           |
| **PostgreSQL**                       | **VYŘADIT** | SQLite + sqlite-vec + FTS5 pokrývají všechny 3 případy použití; migraci blokuje 97 migrací a balení pro Electron.               |
| **Neo4j**                            | **VYŘADIT** | Směrování je spojení 5 tabulek; rekurzivní CTE v SQLite je dostačující.                                                         |
| **MinIO**                            | **VYŘADIT** | Neexistuje žádná zátěž s objekty o velikosti více MB; obrázky a zvuk jsou předávány přes proxy beze změny.                      |
| **pgvector / pg_ai / pg_textsearch** | **VYŘADIT** | Stejný důvod související s limity SQLite jako u PostgreSQL; ekosystém pgvector je roztříštěný.                                  |
| **HAProxy / Envoy**                  | **VYŘADIT** | Caddy již zajišťuje LB + TLS; oba byly výslovně odmítnuty jako routery Tier-1 (viz `AGENTS.md`).                                |

Pokud některou z těchto komponent opodstatní budoucí případ použití, tento dokument je místem, kde má být rozhodnutí upraveno.

## Čtyřtýdenní zavádění (v případě schválení)

1. **Týden 1** — Začlenění tohoto PR + ověření volitelných profilů pomocí compose stacku se 3 replikami.
2. **Týden 2** — Plná aktivace Bifrost pro OpenAI/Claude/Gemini/Ollama (4 ze 14+ poskytovatelů) pomocí proxy trasy sidecaru na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (řízeno pomocí `BIFROST_ENABLED`, s možností deaktivace za běhu).
3. **Týden 3** — Aktivace paměťového profilu Qdrant v jednom testovacím nasazení; změření rozdílu latence oproti sqlite-vec.
4. **Týden 4** — Kontroly stavu observability (`docker compose ps` návratové kódy + smoke testy pomocí `wget`); aktualizace 71 pilířů podle ADR-041.

## Soubory změněné v tomto PR

| Soubor                                                  | Změna                                                                                                                                                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                    | +30 řádků: profil `memory` (Qdrant), profil `bifrost` (Bifrost), trvalé svazky, kontroly stavu.                                                                                                                                                   |
| `.env.example`                                          | +24 řádků: `QDRANT_*` (6 proměnných), `BIFROST_*` (4 proměnné).                                                                                                                                                                                   |
| `docs/reference/ENVIRONMENT.md`                         | +6 řádků v části 25 pro proměnné prostředí `QDRANT_*`.                                                                                                                                                                                            |
| `src/lib/memory/qdrant.ts`                              | +33 řádků: řetězec záložních hodnot proměnných prostředí (nastavení → prostředí → výchozí hodnota) pro `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | +88 řádků: 9 nových testovacích případů ověřujících prioritu záložních hodnot proměnných prostředí.                                                                                                                                               |
| `docs/architecture/cluster-decisions.md` (tento soubor) | NOVÝ — záznam rozhodnutí pro volitelné profily.                                                                                                                                                                                                   |
| `AGENTS.md`                                             | +1 řádek: odkaz na tento dokument v tabulce referenční dokumentace.                                                                                                                                                                               |

**Čistý počet dotčených souborů s kódem:** 4 produkční soubory (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testovací soubor (`qdrant-wiring.test.ts`), 2 dokumentační soubory (`cluster-decisions.md`, `AGENTS.md`).
