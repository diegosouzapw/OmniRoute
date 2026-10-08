# Cluster Decisions — Optional Sidecar Profiles (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** forslag (avventer gjennomgang av @diegosouzapw)
**Dato:** 2026-06-20
**Referanser:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Kort fortalt

To valgfrie Compose-profiler (`memory`, `bifrost`) for den eksisterende distribusjonen med åtte tjenester i [`docker-compose.yml`](../../docker-compose.yml). Standardoppførselen ved oppstart er **uendret**: 3 × `omniroute`-replikaer + Caddy + Redis + CliproxyAPI. De to nye profilene legger til Qdrant og Bifrost som valgfrie sidevogner, aktivert via `docker compose --profile <name> up`. **Ingen eksisterende tjenester fjernes eller erstattes.**

## Hvorfor dette er en konservativ løsning

OmniRoutes eksisterende distribusjonsoppsett er allerede effektivt og velprøvd:

- **`redis:7-alpine`** håndterer arbeidslasten for hastighetsbegrensning og hurtigbufring i produksjonsskala.
- **SQLite + sqlite-vec + FTS5** dekker lokalt minne samt vektor- og tekstsøk (se [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** er allerede lastbalanserer og TLS-terminator ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** er allerede integrert som nivå 1-ruter i [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidevognproxy med nødstopp via miljøvariabelen `BIFROST_ENABLED` — angi `=0` for å omgå sidevognen og gå videre til TS-banen).

De to profilene her er **alternativer for horisontal skalering for distribusjoner som når kapasitetsgrensen til SQLite** — ikke migreringer. Begge er deaktivert som standard.

## De to profilene

### `memory` — Qdrant-sidevogn for vektorminne

**Når den bør aktiveres:**

- > 1M innebygginger per distribusjon (sqlite-vec begynner å bli tregere i stor skala).
- Distribusjon med flere replikaer som trenger delt vektortilstand på tvers av `omniroute-1/2/3`.
- Du har allerede en ekstern Qdrant-klynge (Qdrant Cloud, lokalt driftet).

**Dette legges til:**

| Tjeneste | Avbildning              | Porter      | Merknader                                        |
| -------- | ----------------------- | ----------- | ------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-indeks; varig volum `omniroute_qdrant_data` |

**Aktivering:** sett `qdrantEnabled = true` i innstillingsgrensesnittet **eller** angi miljøvariabelen `QDRANT_HOST=qdrant`. Se [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) for prioritetsreglene (innstillingstabell → miljøvariabel → standardverdi).

**Miljøvariabler:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (se linje 1672–1683 i `.env.example`).

### `bifrost` — Bifrost-sidevogn for nivå 1-ruting

**Når den bør aktiveres:**

- Du kjører ≥3 `omniroute`-replikaer og ønsker sentralisert leverandørrotasjon i én enkelt Go-prosess.
- Du ønsker ett samlet revisjons- og loggføringsgrensesnitt for forespørsler til oppstrømsleverandører på tvers av alle replikaer.
- Du ønsker horisontal skalering av rutingslaget på nivå 1 uavhengig av OmniRoute-replikaene.

**Dette legges til:**

| Tjeneste  | Avbildning                        | Porter | Merknader                                                        |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-basert nivå 1-ruter; varig loggvolum `omniroute_bifrost_logs` |

**Aktivering:** angi `BIFROST_BASE_URL=http://bifrost:8080` i `.env.example`. Den eksisterende sidevognproxyruten i [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (lagt til i PR #4381) vil registrere dette automatisk.

**Miljøvariabler:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (se linje 1685–1695 i `.env.example`).

## Hva denne PR-en uttrykkelig IKKE gjør

Den opprinnelige problemtråden foreslo en større omskriving av klyngen. Etter en gjennomgang av den faktiske arbeidslasten er følgende **avvist** av de oppgitte årsakene:

| Komponent                            | Konklusjon | Begrunnelse                                                                                                                            |
| ------------------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **FJERN**  | `redis:7-alpine` er allerede tilstrekkelig for hastighetsbegrensningsarbeidslasten i produksjonsskala; ingen kapasitetsgrense å bryte. |
| **NATS**                             | **FJERN**  | Hver `omniroute`-replika er én enkelt Node.js-prosess; det finnes ingen pub/sub-arbeidslast med flere prosesser.                       |
| **PostgreSQL**                       | **FJERN**  | SQLite + sqlite-vec + FTS5 dekker alle de tre brukstilfellene; 97 migreringer + Electron-pakking blokkerer migreringen.                |
| **Neo4j**                            | **FJERN**  | Ruting er en sammenføyning av fem tabeller; en rekursiv CTE i SQLite er tilstrekkelig.                                                 |
| **MinIO**                            | **FJERN**  | Ingen blob-arbeidslast på flere MB; bilder/lyd er proxy-gjennomstrømming.                                                              |
| **pgvector / pg_ai / pg_textsearch** | **FJERN**  | Samme SQLite-begrensning som for PostgreSQL; pgvector-økosystemet er fragmentert.                                                      |
| **HAProxy / Envoy**                  | **FJERN**  | Caddy håndterer allerede lastbalansering + TLS; begge ble uttrykkelig avvist som Tier-1-rutere (se `AGENTS.md`).                       |

Hvis et fremtidig brukstilfelle dokumenterer behovet for ett av disse alternativene, er dette dokumentet stedet å oppdatere beslutningen.

## Fire ukers utrulling (hvis godkjent)

1. **Uke 1** — Slå sammen denne PR-en + verifiser profiler som må aktiveres eksplisitt, med en Compose-stakk med tre replikaer.
2. **Uke 2** — Full aktivering av Bifrost for OpenAI/Claude/Gemini/Ollama (4 av 14+ leverandører) ved bruk av sidecar-proxyruten på [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (styrt av `BIFROST_ENABLED`, med mulighet for umiddelbar deaktivering under kjøring).
3. **Uke 3** — Aktiver Qdrant-minneprofilen i én enkelt testdistribusjon; mål latensforskjellen mot sqlite-vec.
4. **Uke 4** — Helsesjekker for observerbarhet (`docker compose ps`-sluttkoder + `wget`-røyktester); oppdatering av de 71 søylene i henhold til ADR-041.

## Filer endret i denne PR-en

| Fil                                                    | Endring                                                                                                                                                                                                                            |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                   | +30 linjer: `memory`-profil (Qdrant), `bifrost`-profil (Bifrost), persistente volumer, helsesjekker.                                                                                                                               |
| `.env.example`                                         | +24 linjer: `QDRANT_*` (6 variabler), `BIFROST_*` (4 variabler).                                                                                                                                                                   |
| `docs/reference/ENVIRONMENT.md`                        | +6 rader i del 25 for miljøvariablene `QDRANT_*`.                                                                                                                                                                                  |
| `src/lib/memory/qdrant.ts`                             | +33 linjer: reservekjede for miljøvariabler (innstillinger → miljø → standardverdi) for `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`       | +88 linjer: 9 nye testtilfeller som låser prioriteringsrekkefølgen for reserveverdier fra miljøvariabler.                                                                                                                          |
| `docs/architecture/cluster-decisions.md` (denne filen) | NY — beslutningslogg for profilene som må aktiveres eksplisitt.                                                                                                                                                                    |
| `AGENTS.md`                                            | +1 linje: peker til dette dokumentet i tabellen over referansedokumentasjon.                                                                                                                                                       |

**Netto berørt kode:** 4 produksjonsfiler (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testfil (`qdrant-wiring.test.ts`), 2 dokumentasjonsfiler (`cluster-decisions.md`, `AGENTS.md`).
