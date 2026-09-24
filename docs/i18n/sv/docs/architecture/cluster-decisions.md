# Cluster Decisions — Optional Sidecar Profiles (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** förslag (inväntar granskning av @diegosouzapw)
**Datum:** 2026-06-20
**Referenser:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Kortfattat

Två valfria Compose-profiler (`memory`, `bifrost`) för den befintliga driftsättningen med 8 tjänster i [`docker-compose.yml`](../../docker-compose.yml). Standardbeteendet vid uppstart är **oförändrat**: 3 × `omniroute`-repliker + Caddy + Redis + CliproxyAPI. De två nya profilerna lägger till Qdrant och Bifrost som valfria sidoprocesser, aktiverade via `docker compose --profile <name> up`. **Ingen befintlig tjänst tas bort eller ersätts.**

## Varför detta är en försiktig förändring

OmniRoutes befintliga driftsättningsarkitektur är redan resurssnål och beprövad:

- **`redis:7-alpine`** hanterar belastningen från hastighetsbegränsning och cachelagring i produktionsskala.
- **SQLite + sqlite-vec + FTS5** täcker lokalt minne samt vektor- och textsökning (se [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** är redan lastbalanserare och TLS-termineringspunkt ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** är redan integrerad som Tier-1-router i [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidoproxy med avstängningsmekanism via miljövariabeln `BIFROST_ENABLED` — ange `=0` för att kringgå sidoproxyn och falla tillbaka till TS-sökvägen).

De två profilerna här är **alternativ för horisontell skalning av driftsättningar som når SQLite-gränsen** — inte migreringar. Båda är inaktiverade som standard.

## De två profilerna

### `memory` — Qdrant-sidoprocess för vektorminne

**När den bör aktiveras:**

- > 1 miljon inbäddningar per driftsättning (sqlite-vec börjar bli långsamt i stor skala).
- Driftsättning med flera repliker som behöver delat vektortillstånd mellan `omniroute-1/2/3`.
- Du har redan ett externt Qdrant-kluster (Qdrant Cloud, lokalt).

**Vad den lägger till:**

| Tjänst   | Avbild                  | Portar      | Anmärkningar                                        |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-index; beständig volym `omniroute_qdrant_data` |

**Aktivering:** ange `qdrantEnabled = true` i inställningsgränssnittet **eller** ställ in miljövariabeln `QDRANT_HOST=qdrant`. Se [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) för prioritetsreglerna (inställningstabell → miljövariabel → standardvärde).

**Miljövariabler:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (se raderna 1672–1683 i `.env.example`).

### `bifrost` — Bifrost-sidoprocess för Tier-1-routing

**När den bör aktiveras:**

- Du kör ≥3 `omniroute`-repliker och vill centralisera leverantörsrotationen i en enda Go-process.
- Du vill ha en gemensam yta för granskning och loggning av förfrågningar till uppströmsleverantörer från alla repliker.
- Du vill kunna skala Tier-1-routinglagret horisontellt oberoende av OmniRoute-replikerna.

**Vad den lägger till:**

| Tjänst    | Avbild                            | Portar | Anmärkningar                                                           |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-baserad Tier-1-router; beständig loggvolym `omniroute_bifrost_logs` |

**Aktivering:** ange `BIFROST_BASE_URL=http://bifrost:8080` i `.env.example`. Den befintliga sidoproxysökvägen i [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (tillagd i PR #4381) hämtar detta automatiskt.

**Miljövariabler:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (se raderna 1685–1695 i `.env.example`).

## Vad denna PR uttryckligen INTE gör

I den ursprungliga ärendetråden föreslogs en större omskrivning av klustret. Efter en granskning av den faktiska arbetslastens karaktär **avvisas** följande av de angivna skälen:

| Komponent                            | Beslut     | Skäl                                                                                                                          |
| ------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **AVVISA** | `redis:7-alpine` räcker redan för hastighetsbegränsningens arbetslast i produktionsskala; inget kapacitetstak att överskrida. |
| **NATS**                             | **AVVISA** | Varje `omniroute`-replik är en enda Node.js-process; det finns ingen pub/sub-arbetslast med flera processer.                  |
| **PostgreSQL**                       | **AVVISA** | SQLite + sqlite-vec + FTS5 täcker alla tre användningsfall; 97 migreringar + Electron-paketering blockerar en migrering.      |
| **Neo4j**                            | **AVVISA** | Routningen är en join mellan fem tabeller; en rekursiv CTE i SQLite är tillräcklig.                                           |
| **MinIO**                            | **AVVISA** | Ingen blobarbetslast på flera MB; bilder/ljud vidarebefordras via proxyer.                                                    |
| **pgvector / pg_ai / pg_textsearch** | **AVVISA** | Samma skäl gällande SQLite-taket som för PostgreSQL; pgvector-ekosystemet är fragmenterat.                                    |
| **HAProxy / Envoy**                  | **AVVISA** | Caddy hanterar redan lastbalansering + TLS; båda avvisades uttryckligen som nivå 1-routrar (se `AGENTS.md`).                  |

Om ett framtida användningsfall visar att något av dessa behövs är detta dokument rätt plats att uppdatera.

## 4-veckorsutrullning (om den godkänns)

1. **Vecka 1** — Slå samman denna PR + verifiera profilerna som kräver aktivt val med en Compose-stack med tre repliker.
2. **Vecka 2** — Full aktivering av Bifrost för OpenAI/Claude/Gemini/Ollama (4 av 14+ leverantörer) via sidecar-proxyrouten på [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (styrs av `BIFROST_ENABLED` och kan stängas av under körning).
3. **Vecka 3** — Aktivera Qdrant-minnesprofilen i en enskild testdistribution; mät latensskillnaden jämfört med sqlite-vec.
4. **Vecka 4** — Hälsokontroller för observerbarhet (`docker compose ps`-slutkoder + röktester med `wget`); uppdatering av de 71 pelarna enligt ADR-041.

## Filer som ändrats i denna PR

| Fil                                                  | Ändring                                                                                                                                                                                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 rader: profilen `memory` (Qdrant), profilen `bifrost` (Bifrost), beständiga volymer, hälsokontroller.                                                                                                                        |
| `.env.example`                                       | +24 rader: `QDRANT_*` (6 variabler), `BIFROST_*` (4 variabler).                                                                                                                                                                  |
| `docs/reference/ENVIRONMENT.md`                      | +6 rader i avsnitt 25 för miljövariablerna `QDRANT_*`.                                                                                                                                                                           |
| `src/lib/memory/qdrant.ts`                           | +33 rader: reservkedja för miljövariabler (inställningar → miljö → standardvärde) för `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 rader: 9 nya testfall som fastställer prioritetsordningen för miljövariablernas reservvärden.                                                                                                                                |
| `docs/architecture/cluster-decisions.md` (denna fil) | NY — beslutsdokumentation för profilerna som kräver aktivt val.                                                                                                                                                                  |
| `AGENTS.md`                                          | +1 rad: hänvisning till detta dokument i tabellen över referensdokumentation.                                                                                                                                                    |

**Netto berörd kod:** 4 produktionsfiler (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testfil (`qdrant-wiring.test.ts`), 2 dokumentationsfiler (`cluster-decisions.md`, `AGENTS.md`).
