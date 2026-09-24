# Cluster Decisions — Optional Sidecar Profiles (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** voorstel (in afwachting van beoordeling door @diegosouzapw)
**Datum:** 2026-06-20
**Referenties:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Kort samengevat

Twee optionele Compose-profielen (`memory`, `bifrost`) voor de bestaande implementatie met 8 services in [`docker-compose.yml`](../../docker-compose.yml). Het standaardgedrag bij het opstarten blijft **ongewijzigd**: 3 × `omniroute`-replica's + Caddy + Redis + CliproxyAPI. De twee nieuwe profielen voegen Qdrant en Bifrost toe als optionele sidecars, geactiveerd via `docker compose --profile <name> up`. **Er wordt geen bestaande service verwijderd of vervangen.**

## Waarom dit een voorzichtige aanpak is

De bestaande implementatiearchitectuur van OmniRoute is al gestroomlijnd en beproefd:

- **`redis:7-alpine`** verwerkt de belasting voor snelheidsbegrenzing en caching op productieschaal.
- **SQLite + sqlite-vec + FTS5** ondersteunen lokaal geheugen plus vector- en tekstzoekfunctionaliteit (zie [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** fungeert al als load balancer en TLS-terminator ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** is al geïntegreerd als Tier 1-router in [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecarproxy met noodstop via de omgevingsvariabele `BIFROST_ENABLED` — stel deze in op `=0` om de sidecar te omzeilen en terug te vallen op het TS-pad).

De twee profielen zijn **opties voor horizontale opschaling van implementaties die de limiet van SQLite bereiken** — geen migraties. Beide zijn standaard uitgeschakeld.

## De twee profielen

### `memory` — Qdrant-sidecar voor vectorgeheugen

**Wanneer inschakelen:**

- > 1 miljoen embeddings per implementatie (sqlite-vec wordt op grote schaal trager).
- Een implementatie met meerdere replica's waarvoor een gedeelde vectorstatus tussen `omniroute-1/2/3` nodig is.
- Je beschikt al over een extern Qdrant-cluster (Qdrant Cloud, on-premises).

**Wat het toevoegt:**

| Service  | Image                   | Poorten     | Opmerkingen                                          |
| -------- | ----------------------- | ----------- | ---------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-index; permanent volume `omniroute_qdrant_data` |

**Activering:** stel `qdrantEnabled = true` in via de instellingeninterface **of** stel de omgevingsvariabele `QDRANT_HOST=qdrant` in. Zie [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) voor de prioriteitsregels (instellingentabel → omgevingsvariabele → standaardwaarde).

**Omgevingsvariabelen:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (zie regels 1672-1683 in `.env.example`).

### `bifrost` — Bifrost-sidecar voor Tier 1-routering

**Wanneer inschakelen:**

- Je voert ≥3 `omniroute`-replica's uit en wilt de providerrotatie centraliseren in één Go-proces.
- Je wilt één centraal audit- en logregistratiepunt voor aanvragen aan upstreamproviders vanuit alle replica's.
- Je wilt de Tier 1-routeringslaag horizontaal kunnen schalen, onafhankelijk van de OmniRoute-replica's.

**Wat het toevoegt:**

| Service   | Image                             | Poorten | Opmerkingen                                                               |
| --------- | --------------------------------- | ------- | ------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Go-gebaseerde Tier 1-router; permanent logvolume `omniroute_bifrost_logs` |

**Activering:** stel `BIFROST_BASE_URL=http://bifrost:8080` in binnen `.env.example`. De bestaande sidecarproxyroute in [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (toegevoegd in PR #4381) neemt deze instelling automatisch over.

**Omgevingsvariabelen:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (zie regels 1685-1695 in `.env.example`).

## Wat deze PR expliciet NIET doet

In de oorspronkelijke issue-thread werd een bredere herziening van het cluster voorgesteld. Na analyse van de daadwerkelijke workload worden de volgende onderdelen om de genoemde redenen **afgewezen**:

| Component                            | Oordeel       | Reden                                                                                                                  |
| ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **SCHRAPPEN** | `redis:7-alpine` voldoet al op productieschaal voor de workload van snelheidslimieten; er is geen grens te doorbreken. |
| **NATS**                             | **SCHRAPPEN** | Elke `omniroute`-replica is één Node.js-proces; er bestaat geen pub/sub-workload met meerdere processen.               |
| **PostgreSQL**                       | **SCHRAPPEN** | SQLite + sqlite-vec + FTS5 dekken alle 3 usecases; 97 migraties + Electron-packaging blokkeren de migratie.            |
| **Neo4j**                            | **SCHRAPPEN** | Routering is een join van 5 tabellen; een recursieve CTE in SQLite is voldoende.                                       |
| **MinIO**                            | **SCHRAPPEN** | Er is geen blob-workload van meerdere MB's; afbeeldingen/audio worden via passthrough-proxy's doorgegeven.             |
| **pgvector / pg_ai / pg_textsearch** | **SCHRAPPEN** | Dezelfde reden rond de SQLite-limiet als bij PostgreSQL; het pgvector-ecosysteem is gefragmenteerd.                    |
| **HAProxy / Envoy**                  | **SCHRAPPEN** | Caddy verzorgt al LB + TLS; beide zijn expliciet afgewezen als Tier-1-routers (zie `AGENTS.md`).                       |

Als een toekomstige usecase de geschiktheid van een van deze opties aantoont, moet dit document worden aangepast.

## Uitrol van 4 weken (indien goedgekeurd)

1. **Week 1** — Deze PR samenvoegen + verificatie van opt-in-profielen met een Compose-stack met 3 replica's.
2. **Week 2** — Volledige activering van Bifrost voor OpenAI/Claude/Gemini/Ollama (4 van de 14+ providers) via de sidecar-proxyroute op [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (afgeschermd door `BIFROST_ENABLED`, tijdens runtime uitschakelbaar via een noodschakelaar).
3. **Week 3** — Qdrant-geheugenprofiel ingeschakeld in één testdeployment; meet het latentieverschil ten opzichte van sqlite-vec.
4. **Week 4** — Healthchecks voor observeerbaarheid (`docker compose ps`-exitcodes + `wget`-rooktests); vernieuwing van de 71 pijlers volgens ADR-041.

## Bestanden gewijzigd in deze PR

| Bestand                                                | Wijziging                                                                                                                                                                                                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                   | +30 regels: `memory`-profiel (Qdrant), `bifrost`-profiel (Bifrost), persistente volumes, healthchecks.                                                                                                                                          |
| `.env.example`                                         | +24 regels: `QDRANT_*` (6 variabelen), `BIFROST_*` (4 variabelen).                                                                                                                                                                              |
| `docs/reference/ENVIRONMENT.md`                        | +6 rijen in sectie 25 voor de `QDRANT_*`-omgevingsvariabelen.                                                                                                                                                                                   |
| `src/lib/memory/qdrant.ts`                             | +33 regels: fallback-keten voor omgevingsvariabelen (instellingen → omgeving → standaardwaarde) voor `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`       | +88 regels: 9 nieuwe testcases die de fallback-prioriteit van omgevingsvariabelen vastleggen.                                                                                                                                                   |
| `docs/architecture/cluster-decisions.md` (dit bestand) | NIEUW — beslissingsverslag voor de opt-in-profielen.                                                                                                                                                                                            |
| `AGENTS.md`                                            | +1 regel: verwijzing naar dit document in de tabel met referentiedocumentatie.                                                                                                                                                                  |

**Netto aangeraakte code:** 4 productiebestanden (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testbestand (`qdrant-wiring.test.ts`), 2 documentatiebestanden (`cluster-decisions.md`, `AGENTS.md`).
