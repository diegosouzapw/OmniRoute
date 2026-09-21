# Cluster Decisions — Optional Sidecar Profiles (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** forslag (afventer gennemgang fra @diegosouzapw)
**Dato:** 2026-06-20
**Referencer:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Kort fortalt

To tilvalgsprofiler til Compose (`memory`, `bifrost`) for den eksisterende implementering med 8 tjenester i [`docker-compose.yml`](../../docker-compose.yml). Standardadfærden ved opstart er **uændret**: 3 × `omniroute`-replikaer + Caddy + Redis + CliproxyAPI. De to nye profiler tilføjer Qdrant og Bifrost som valgfrie sidecars, aktiveret via `docker compose --profile <name> up`. **Ingen eksisterende tjenester fjernes eller erstattes.**

## Hvorfor dette er en konservativ tilgang

OmniRoutes eksisterende implementeringsarkitektur er allerede kompakt og gennemprøvet:

- **`redis:7-alpine`** håndterer arbejdsbelastningen fra hastighedsbegrænsning og cache i produktionsskala.
- **SQLite + sqlite-vec + FTS5** dækker lokal hukommelse samt vektor- og tekstsøgning (se [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** fungerer allerede som belastningsfordeler og TLS-terminator ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** er allerede integreret som Tier-1-routeren i [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar-proxy med nødstop via miljøvariablen `BIFROST_ENABLED` — angiv `=0` for at omgå sidecaren og falde tilbage til TS-stien).

De to profiler her er **muligheder for skalering af installationer, der rammer SQLites kapacitetsgrænse** — ikke migreringer. Begge er deaktiveret som standard.

## De to profiler

### `memory` — Qdrant-sidecar til vektorhukommelse

**Hvornår den bør aktiveres:**

- > 1 mio. embeddings pr. installation (sqlite-vec begynder at blive langsommere i stor skala).
- Installation med flere replikaer, som har brug for delt vektortilstand på tværs af `omniroute-1/2/3`.
- Du har allerede en ekstern Qdrant-klynge (Qdrant Cloud, lokalt).

**Hvad den tilføjer:**

| Tjeneste | Image                   | Porte       | Bemærkninger                                             |
| -------- | ----------------------- | ----------- | -------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-indeks; permanent diskenhed `omniroute_qdrant_data` |

**Aktivering:** angiv `qdrantEnabled = true` i brugerfladen under Settings, **eller** indstil miljøvariablen `QDRANT_HOST=qdrant`. Se [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) for prioritetsreglerne (indstillingstabel → miljøvariabel → standardværdi).

**Miljøvariabler:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (se linje 1672-1683 i `.env.example`).

### `bifrost` — Bifrost-sidecar til Tier-1-routing

**Hvornår den bør aktiveres:**

- Du kører ≥3 `omniroute`-replikaer og ønsker providerrotation centraliseret i én Go-proces.
- Du ønsker én samlet grænseflade til revision og logføring af forespørgsler til upstream-providere på tværs af alle replikaer.
- Du ønsker horisontal skalering af Tier-1-routinglaget uafhængigt af OmniRoute-replikaerne.

**Hvad den tilføjer:**

| Tjeneste  | Image                             | Porte  | Bemærkninger                                                              |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-baseret Tier-1-router; permanent logdiskenhed `omniroute_bifrost_logs` |

**Aktivering:** angiv `BIFROST_BASE_URL=http://bifrost:8080` i `.env.example`. Den eksisterende sidecar-proxyrute i [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (tilføjet i PR #4381) registrerer automatisk denne værdi.

**Miljøvariabler:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (se linje 1685-1695 i `.env.example`).

## Hvad denne PR udtrykkeligt IKKE gør

Den oprindelige issue-tråd foreslog en større omskrivning af klyngen. Efter en gennemgang af den faktiske workload er følgende **afvist** af de angivne årsager:

| Komponent                            | Beslutning | Årsag                                                                                                                  |
| ------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **AFVIS**  | `redis:7-alpine` er allerede tilstrækkelig til rate limit-workloaden i produktionsskala; der er ingen grænse at bryde. |
| **NATS**                             | **AFVIS**  | Hver `omniroute`-replika er en enkelt Node.js-proces; der findes ingen pub/sub-workload med flere processer.           |
| **PostgreSQL**                       | **AFVIS**  | SQLite + sqlite-vec + FTS5 dækker alle 3 use cases; 97 migreringer + Electron-pakning blokerer en migrering.           |
| **Neo4j**                            | **AFVIS**  | Routing er et join mellem 5 tabeller; en rekursiv CTE i SQLite er tilstrækkelig.                                       |
| **MinIO**                            | **AFVIS**  | Ingen blob-workload på flere MB; billeder/lyd videresendes via proxyer.                                                |
| **pgvector / pg_ai / pg_textsearch** | **AFVIS**  | Samme SQLite-grænse som for PostgreSQL; pgvector-økosystemet er fragmenteret.                                          |
| **HAProxy / Envoy**                  | **AFVIS**  | Caddy håndterer allerede LB + TLS; begge blev udtrykkeligt afvist som Tier-1-routere (se `AGENTS.md`).                 |

Hvis et fremtidigt use case dokumenterer behovet for en af disse, er dette dokument stedet, der skal ændres.

## 4-ugers udrulning (hvis godkendt)

1. **Uge 1** — Merge denne PR + verificering af tilvalgsprofiler med en compose-stack med 3 replikaer.
2. **Uge 2** — Fuld aktivering af Bifrost for OpenAI/Claude/Gemini/Ollama (4 ud af 14+ udbydere) via sidecar-proxyruten i [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (styret af `BIFROST_ENABLED`, kan deaktiveres under kørsel med en kill switch).
3. **Uge 3** — Qdrant-hukommelsesprofil aktiveret i en enkelt testinstallation; mål forskellen i latenstid i forhold til sqlite-vec.
4. **Uge 4** — Sundhedstjek for observerbarhed (`docker compose ps`-exitkoder + `wget`-smoketests); opdatering af de 71 søjler i henhold til ADR-041.

## Filer ændret i denne PR

| Fil                                                  | Ændring                                                                                                                                                                                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 linjer: `memory`-profil (Qdrant), `bifrost`-profil (Bifrost), permanente diskenheder, sundhedstjek.                                                                                                                             |
| `.env.example`                                       | +24 linjer: `QDRANT_*` (6 variabler), `BIFROST_*` (4 variabler).                                                                                                                                                                    |
| `docs/reference/ENVIRONMENT.md`                      | +6 rækker i afsnit 25 for `QDRANT_*`-miljøvariablerne.                                                                                                                                                                              |
| `src/lib/memory/qdrant.ts`                           | +33 linjer: fallback-kæde for miljøvariabler (indstillinger → miljø → standardværdi) for `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 linjer: 9 nye testcases, der fastholder prioritetsrækkefølgen for fallback af miljøvariabler.                                                                                                                                   |
| `docs/architecture/cluster-decisions.md` (denne fil) | NY — beslutningslog for tilvalgsprofilerne.                                                                                                                                                                                         |
| `AGENTS.md`                                          | +1 linje: henvisning til dette dokument i tabellen over referencedokumentation.                                                                                                                                                     |

**Berørt kode i alt:** 4 produktionsfiler (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testfil (`qdrant-wiring.test.ts`), 2 dokumentationsfiler (`cluster-decisions.md`, `AGENTS.md`).
