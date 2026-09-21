# Cluster Decisions — Optional Sidecar Profiles (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Stav:** návrh (čaká sa na kontrolu od @diegosouzapw)
**Dátum:** 2026-06-20
**Referencie:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Dva voliteľné profily Compose (`memory`, `bifrost`) pre existujúce nasadenie 8 služieb v súbore [`docker-compose.yml`](../../docker-compose.yml). Predvolené správanie pri spustení zostáva **nezmenené**: 3 × repliky `omniroute` + Caddy + Redis + CliproxyAPI. Dva nové profily pridávajú Qdrant a Bifrost ako voliteľné sidecary, aktivované pomocou `docker compose --profile <name> up`. **Žiadna existujúca služba sa neodstraňuje ani nenahrádza.**

## Prečo je tento prístup konzervatívny

Existujúca architektúra nasadenia OmniRoute je už úsporná a overená:

- **`redis:7-alpine`** zvláda pracovnú záťaž obmedzovania frekvencie požiadaviek a vyrovnávacej pamäte v produkčnom rozsahu.
- **SQLite + sqlite-vec + FTS5** pokrývajú lokálnu pamäť, vektorové vyhľadávanie a textové vyhľadávanie (pozrite si [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** už slúži ako nástroj na vyvažovanie záťaže a ukončovanie TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** je už integrovaný ako smerovač úrovne Tier-1 v súbore [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar proxy s núdzovým vypínačom prostredníctvom premennej prostredia `BIFROST_ENABLED` — nastavením na `=0` sa sidecar obíde a použije sa cesta TS).

Tieto dva profily predstavujú **možnosti škálovania pre nasadenia, ktoré dosiahnu limity SQLite** — nejde o migrácie. Oba sú predvolene vypnuté.

## Dva profily

### `memory` — sidecar Qdrant pre vektorovú pamäť

**Kedy ho zapnúť:**

- > 1 milión embeddingov na jedno nasadenie (sqlite-vec sa pri veľkom rozsahu začína spomaľovať).
- Nasadenie s viacerými replikami, ktoré potrebuje zdieľaný stav vektorov medzi `omniroute-1/2/3`.
- Už máte externý klaster Qdrant (Qdrant Cloud, lokálne nasadenie).

**Čo pridáva:**

| Služba   | Obraz                   | Porty       | Poznámky                                          |
| -------- | ----------------------- | ----------- | ------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Index HNSW; trvalý zväzok `omniroute_qdrant_data` |

**Aktivácia:** zapnite `qdrantEnabled = true` v používateľskom rozhraní Settings **alebo** nastavte premennú prostredia `QDRANT_HOST=qdrant`. Pravidlá priority (tabuľka nastavení → premenná prostredia → predvolená hodnota) nájdete v súbore [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Premenné prostredia:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (pozrite si riadky 1672-1683 v súbore `.env.example`).

### `bifrost` — sidecar smerovača Bifrost úrovne Tier-1

**Kedy ho zapnúť:**

- Prevádzkujete ≥3 repliky `omniroute` a chcete rotáciu poskytovateľov centralizovať v jednom procese Go.
- Chcete jednotné miesto na auditovanie a protokolovanie požiadaviek na upstream poskytovateľov naprieč všetkými replikami.
- Chcete horizontálne škálovať smerovaciu vrstvu Tier-1 nezávisle od replík OmniRoute.

**Čo pridáva:**

| Služba    | Obraz                             | Porty  | Poznámky                                                                          |
| --------- | --------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Smerovač Tier-1 založený na Go; trvalý zväzok protokolov `omniroute_bifrost_logs` |

**Aktivácia:** nastavte `BIFROST_BASE_URL=http://bifrost:8080` v súbore `.env.example`. Existujúca trasa sidecar proxy v súbore [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (pridaná v PR #4381) toto nastavenie automaticky použije.

**Premenné prostredia:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (pozrite si riadky 1685-1695 v súbore `.env.example`).

## Čo tento PR výslovne NEROBÍ

V pôvodnom vlákne problému sa zvažovalo rozsiahlejšie prepracovanie klastra. Po audite skutočného charakteru záťaže boli nasledujúce komponenty z uvedených dôvodov **zamietnuté**:

| Komponent                            | Verdikt      | Dôvod                                                                                                                                     |
| ------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **VYNECHAŤ** | `redis:7-alpine` už postačuje na obmedzovanie frekvencie požiadaviek v produkčnom rozsahu; nie je tu limit, ktorý by bolo treba prekonať. |
| **NATS**                             | **VYNECHAŤ** | Každá replika `omniroute` je jeden proces Node.js; neexistuje žiadna viacprocesová záťaž typu pub/sub.                                    |
| **PostgreSQL**                       | **VYNECHAŤ** | SQLite + sqlite-vec + FTS5 pokrývajú všetky 3 prípady použitia; migrácii bráni 97 migrácií a balenie pre Electron.                        |
| **Neo4j**                            | **VYNECHAŤ** | Smerovanie je spojenie 5 tabuliek; rekurzívny CTE v SQLite postačuje.                                                                     |
| **MinIO**                            | **VYNECHAŤ** | Neexistuje záťaž s objektmi blob s veľkosťou niekoľkých MB; obrázky a zvuk prechádzajú cez proxy bez spracovania.                         |
| **pgvector / pg_ai / pg_textsearch** | **VYNECHAŤ** | Rovnaký dôvod týkajúci sa limitov SQLite ako pri PostgreSQL; ekosystém pgvector je fragmentovaný.                                         |
| **HAProxy / Envoy**                  | **VYNECHAŤ** | Caddy už zabezpečuje vyvažovanie záťaže + TLS; oba boli výslovne zamietnuté ako smerovače úrovne Tier-1 (pozri `AGENTS.md`).              |

Ak budúci prípad použitia preukáže opodstatnenosť niektorého z nich, tento dokument je miestom, kde sa má rozhodnutie upraviť.

## 4-týždňové nasadenie (v prípade schválenia)

1. **1. týždeň** — Začleniť tento PR + overiť voliteľné profily pomocou compose stacku s 3 replikami.
2. **2. týždeň** — Úplná aktivácia Bifrost pre OpenAI/Claude/Gemini/Ollama (4 zo 14+ poskytovateľov) pomocou trasy sidecar proxy na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (riadené premennou `BIFROST_ENABLED`, s možnosťou vypnutia za behu).
3. **3. týždeň** — Povoliť pamäťový profil Qdrant v jednom testovacom nasadení; zmerať rozdiel latencie oproti sqlite-vec.
4. **4. týždeň** — Kontroly stavu pozorovateľnosti (návratové kódy `docker compose ps` + základné testy pomocou `wget`); aktualizácia 71 pilierov podľa ADR-041.

## Súbory zmenené v tomto PR

| Súbor                                                  | Zmena                                                                                                                                                                                                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                   | +30 riadkov: profil `memory` (Qdrant), profil `bifrost` (Bifrost), trvalé zväzky, kontroly stavu.                                                                                                                                                          |
| `.env.example`                                         | +24 riadkov: `QDRANT_*` (6 premenných), `BIFROST_*` (4 premenné).                                                                                                                                                                                          |
| `docs/reference/ENVIRONMENT.md`                        | +6 riadkov v sekcii 25 pre premenné prostredia `QDRANT_*`.                                                                                                                                                                                                 |
| `src/lib/memory/qdrant.ts`                             | +33 riadkov: reťazec náhradných hodnôt premenných prostredia (nastavenia → prostredie → predvolená hodnota) pre `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`       | +88 riadkov: 9 nových testovacích prípadov určujúcich prioritu náhradných hodnôt premenných prostredia.                                                                                                                                                    |
| `docs/architecture/cluster-decisions.md` (tento súbor) | NOVÝ — záznam rozhodnutia pre voliteľné profily.                                                                                                                                                                                                           |
| `AGENTS.md`                                            | +1 riadok: odkaz na tento dokument v tabuľke referenčnej dokumentácie.                                                                                                                                                                                     |

**Čistý počet dotknutých súborov s kódom:** 4 produkčné súbory (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testovací súbor (`qdrant-wiring.test.ts`), 2 dokumentačné súbory (`cluster-decisions.md`, `AGENTS.md`).
