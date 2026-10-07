# Cluster Decisions — Optional Sidecar Profiles (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** proposta (qed tistenna r-rieżami ta’ @diegosouzapw)
**Data:** 2026-06-20
**Referenzi:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Fil-qosor

Żewġ profili compose fakultattivi (`memory`, `bifrost`) għad-deployment eżistenti ta’ 8 servizzi f’[`docker-compose.yml`](../../docker-compose.yml). L-imġiba awtomatika meta jitħaddem is-servizz hija **l-istess**: 3 repliki ta’ `omniroute` + Caddy + Redis + CliproxyAPI. Iż-żewġ profili l-ġodda jżidu Qdrant u Bifrost bħala sidecars fakultattivi, attivati permezz ta’ `docker compose --profile <name> up`. **L-ebda servizz eżistenti ma jitneħħa jew jiġi sostitwit.**

## Għaliex dan l-approċċ huwa konservattiv

L-istruttura eżistenti tad-deployment ta’ OmniRoute hija diġà ħafifa u ppruvata:

- **`redis:7-alpine`** jimmaniġġja l-workload tal-limitazzjoni tar-rata/cache fuq skala ta’ produzzjoni.
- **SQLite + sqlite-vec + FTS5** ikopru l-memorja lokali + vetturi + tiftix fit-test (ara [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** diġà huwa l-LB + terminatur TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** diġà huwa integrat bħala r-router tal-Livell 1 f’[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar bi kill switch permezz tal-varjabbli env `BIFROST_ENABLED` — issettja `=0` biex taqbeż is-sidecar u tgħaddi għall-perkors TS).

Iż-żewġ profili hawnhekk huma **għażliet ta’ scale-out għal deployments li jilħqu l-limitu ta’ SQLite** — mhumiex migrazzjonijiet. It-tnejn huma diżattivati awtomatikament.

## Iż-żewġ profili

### `memory` — Sidecar tal-Memorja Vettorjali Qdrant

**Meta għandek tattivah:**

- > 1M embeddings għal kull deployment (sqlite-vec jibda jonqos fil-prestazzjoni fuq skala kbira).
- Deployment b’diversi repliki li jeħtieġ stat vettorjali kondiviż bejn `omniroute-1/2/3`.
- Diġà għandek cluster Qdrant estern (Qdrant Cloud, on-prem).

**X’iżid:**

| Servizz  | Image                   | Ports       | Noti                                                   |
| -------- | ----------------------- | ----------- | ------------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Indiċi HNSW; volum persistenti `omniroute_qdrant_data` |

**Attivazzjoni:** issettja `qdrantEnabled = true` fl-interfaċċa tal-Utent tas-Settings **jew** issettja l-env `QDRANT_HOST=qdrant`. Ara [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) għar-regoli ta’ preċedenza (tabella tas-settings → varjabbli env → valur awtomatiku).

**Varjabbli env:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (ara l-linji 1672-1683 ta’ `.env.example`).

### `bifrost` — Sidecar tar-Router tal-Livell 1 Bifrost

**Meta għandek tattivah:**

- Tħaddem ≥3 repliki ta’ `omniroute` u trid li r-rotazzjoni tal-providers tkun iċċentralizzata fi proċess Go wieħed.
- Trid wiċċ wieħed għall-awditjar/logging tat-talbiet lill-providers upstream mir-repliki kollha.
- Trid skalabbiltà orizzontali tas-saff tar-routing tal-Livell 1 indipendentement mir-repliki ta’ OmniRoute.

**X’iżid:**

| Servizz   | Image                             | Ports  | Noti                                                                                     |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Router tal-Livell 1 ibbażat fuq Go; volum persistenti għal-logs `omniroute_bifrost_logs` |

**Attivazzjoni:** issettja `BIFROST_BASE_URL=http://bifrost:8080` f’`.env.example`. Ir-rotta eżistenti tal-proxy sidecar f’[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (miżjuda fi PR #4381) taqra dan awtomatikament.

**Varjabbli env:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (ara l-linji 1685-1695 ta’ `.env.example`).

## Dak li din il-PR espliċitament MA tagħmilx

It-thread tal-issue oriġinali ppropona kitba mill-ġdid usa’ tal-cluster. Wara verifika tal-forma reali tal-workload, dawn li ġejjin huma **miċħuda** għar-raġunijiet mogħtija:

| Komponent                            | Verdett   | Raġuni                                                                                                                                  |
| ------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **NEĦĦI** | `redis:7-alpine` diġà huwa adegwat għall-workload tar-rate limiting fuq skala ta’ produzzjoni; m’hemm l-ebda limitu massimu x’jinqabeż. |
| **NATS**                             | **NEĦĦI** | Kull replika ta’ `omniroute` hija proċess Node.js wieħed; ma jeżisti l-ebda workload pub/sub b’diversi proċessi.                        |
| **PostgreSQL**                       | **NEĦĦI** | SQLite + sqlite-vec + FTS5 ikopru t-3 każijiet ta’ użu kollha; 97 migrazzjoni + l-ippakkjar ta’ Electron jimblukkaw il-migrazzjoni.     |
| **Neo4j**                            | **NEĦĦI** | Ir-routing huwa join ta’ 5 tabelli; CTE rikursiva fuq SQLite hija biżżejjed.                                                            |
| **MinIO**                            | **NEĦĦI** | M’hemm l-ebda workload ta’ blobs ta’ diversi MB; l-immaġnijiet/l-awdjo huma proxies passthrough.                                        |
| **pgvector / pg_ai / pg_textsearch** | **NEĦĦI** | L-istess raġuni tal-limitu massimu ta’ SQLite bħal PostgreSQL; l-ekosistema ta’ pgvector hija frammentata.                              |
| **HAProxy / Envoy**                  | **NEĦĦI** | Caddy diġà jagħmel LB + TLS; it-tnejn ġew espliċitament miċħuda bħala routers ta’ Tier-1 (ara `AGENTS.md`).                             |

Jekk każ ta’ użu futur juri l-ħtieġa għal wieħed minn dawn, dan id-dokument huwa l-post fejn għandu jiġi emendat.

## Tnedija fuq 4 ġimgħat (jekk approvata)

1. **Ġimgħa 1** — Integra din il-PR + verifika tal-profili opt-in bi stack compose ta’ 3 repliki.
2. **Ġimgħa 2** — Attivazzjoni sħiħa ta’ Bifrost għal OpenAI/Claude/Gemini/Ollama (4 minn 14+ providers) permezz tar-rotta tal-proxy sidecar f’[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ikkontrollata minn `BIFROST_ENABLED`, b’kill switch waqt ir-runtime).
3. **Ġimgħa 3** — Il-profil tal-memorja Qdrant attivat f’deployment wieħed tat-test; kejjel id-differenza fil-latenza meta mqabbla ma’ sqlite-vec.
4. **Ġimgħa 4** — Healthchecks tal-osservabbiltà (exit codes ta’ `docker compose ps` + smoke tests b’`wget`); aġġornament tal-71 pilastru skont ADR-041.

## Fajls mibdula f’din il-PR

| Fajl                                                   | Bidla                                                                                                                                                                                                                                              |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                   | +30 linja: profil `memory` (Qdrant), profil `bifrost` (Bifrost), volumi persistenti, healthchecks.                                                                                                                                                 |
| `.env.example`                                         | +24 linja: `QDRANT_*` (6 varjabbli), `BIFROST_*` (4 varjabbli).                                                                                                                                                                                    |
| `docs/reference/ENVIRONMENT.md`                        | +6 ringieli fit-taqsima 25 għall-varjabbli tal-ambjent `QDRANT_*`.                                                                                                                                                                                 |
| `src/lib/memory/qdrant.ts`                             | +33 linja: katina ta’ fallback għall-varjabbli tal-ambjent (settings → ambjent → valur predefinit) għal `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`       | +88 linja: 9 każijiet ġodda tat-test li jiffissaw il-preċedenza tal-fallback tal-varjabbli tal-ambjent.                                                                                                                                            |
| `docs/architecture/cluster-decisions.md` (dan il-fajl) | ĠDID — rekord tad-deċiżjoni għall-profili opt-in.                                                                                                                                                                                                  |
| `AGENTS.md`                                            | +1 linja: referenza għal dan id-dokument fit-tabella tad-dokumentazzjoni ta’ referenza.                                                                                                                                                            |

**Kodiċi totali affettwat:** 4 fajls tal-produzzjoni (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), fajl tat-test wieħed (`qdrant-wiring.test.ts`), 2 fajls tad-dokumentazzjoni (`cluster-decisions.md`, `AGENTS.md`).
