# Cluster Decisions — Optional Sidecar Profiles (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Matsayi:** shawara (ana jiran bitar @diegosouzapw)
**Kwanan wata:** 2026-06-20
**Manazarta:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Compose profiles guda biyu na zaɓi (`memory`, `bifrost`) don tsarin turawa na ayyuka 8 da ake da shi a [`docker-compose.yml`](../../docker-compose.yml). Halayyar kunnawa ta asali **ba ta canza ba**: kwafi 3 × na `omniroute` + Caddy + Redis + CliproxyAPI. Sabbin profiles guda biyun suna ƙara Qdrant da Bifrost a matsayin sidecars na zaɓi, waɗanda ake kunnawa ta `docker compose --profile <name> up`. **Ba a cire ko maye gurbin wani sabis da ake da shi ba.**

## Dalilin da ya sa wannan yake taka-tsantsan

Tsarin turawa na OmniRoute da ake da shi ya riga ya kasance mai sauƙi kuma tabbatacce:

- **`redis:7-alpine`** yana sarrafa aikin iyakance ƙimar buƙatu/cache a ma'aunin production.
- **SQLite + sqlite-vec + FTS5** suna kula da local memory + vector + binciken rubutu (duba [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** ya riga ya zama LB + mai ƙare TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ya riga ya haɗu a matsayin Tier-1 router a [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar proxy mai kill switch ta hanyar env var `BIFROST_ENABLED` — saita `=0` don tsallake sidecar ɗin kuma a ci gaba zuwa hanyar TS).

Profiles guda biyun nan **zaɓuɓɓukan faɗaɗa ma'auni ne ga tsarin turawa da ya kai iyakar SQLite** — ba migrations ba ne. Dukansu a kashe suke ta tsohuwa.

## Profiles guda biyu

### `memory` — Qdrant Vector Memory Sidecar

**Lokacin kunnawa:**

- > Embeddings 1M a kowane tsarin turawa (sqlite-vec yana fara yin jinkiri a babban ma'auni).
- Tsarin turawa mai replicas da yawa wanda yake buƙatar vector state ɗin da aka raba tsakanin `omniroute-1/2/3`.
- Kun riga kuna da external Qdrant cluster (Qdrant Cloud, on-prem).

**Abin da yake ƙarawa:**

| Sabis    | Image                   | Ports       | Bayanan kula                                          |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index; persistent volume `omniroute_qdrant_data` |

**Kunnawa:** sauya `qdrantEnabled = true` a cikin Settings UI **ko** saita env `QDRANT_HOST=qdrant`. Duba [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) don ƙa'idojin fifiko (settings table → env var → default).

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (duba layukan 1672-1683 na `.env.example`).

### `bifrost` — Bifrost Tier-1 Router Sidecar

**Lokacin kunnawa:**

- Kuna gudanar da replicas ≥3 na `omniroute` kuma kuna son a tattara juyawar providers a cikin Go process guda ɗaya.
- Kuna son wuri guda na audit/logging don buƙatun upstream-provider a duk replicas.
- Kuna son horizontal scaling na Tier-1 routing layer ba tare da dogaro da OmniRoute replicas ba.

**Abin da yake ƙarawa:**

| Sabis     | Image                             | Ports  | Bayanan kula                                                         |
| --------- | --------------------------------- | ------ | -------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Tier-1 router na Go; persistent logs volume `omniroute_bifrost_logs` |

**Kunnawa:** saita `BIFROST_BASE_URL=http://bifrost:8080` a cikin `.env.example`. Hanyar sidecar proxy da ake da ita a [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (wadda aka ƙara a PR #4381) za ta ɗauki wannan ta atomatik.

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (duba layukan 1685-1695 na `.env.example`).

## Abubuwan da wannan PR bai yi ba a sarari

A cikin tattaunawar matsalar ta asali, an gabatar da ra'ayin sake fasalin cluster gaba ɗaya. Bayan binciken ainihin yanayin aikin, an **ƙi** waɗannan saboda dalilan da aka bayar:

| Bangare                              | Hukunci     | Dalili                                                                                                                          |
| ------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **A JEFAR** | `redis:7-alpine` ya riga ya isa ga aikin iyakance ƙimar amfani a matakin samarwa; babu wata iyaka da za a karya.                |
| **NATS**                             | **A JEFAR** | Kowace replica ta `omniroute` tsari guda ɗaya ne na Node.js; babu aikin pub/sub mai amfani da tsare-tsare da yawa.              |
| **PostgreSQL**                       | **A JEFAR** | SQLite + sqlite-vec + FTS5 suna ɗaukar dukkan yanayin amfani guda 3; migrations 97 + shiryawa don Electron suna hana migration. |
| **Neo4j**                            | **A JEFAR** | Routing haɗin tables 5 ne; recursive CTE a kan SQLite ya wadatar.                                                               |
| **MinIO**                            | **A JEFAR** | Babu aikin blob mai girman multi-MB; hotuna/sauti proxies ne masu wucewa kai tsaye.                                             |
| **pgvector / pg_ai / pg_textsearch** | **A JEFAR** | Dalilin iyakar SQLite iri ɗaya da PostgreSQL; ecosystem na pgvector ya rarrabu.                                                 |
| **HAProxy / Envoy**                  | **A JEFAR** | Caddy ya riga yana yin LB + TLS; an ƙi dukansu a sarari a matsayin Tier-1 routers (duba `AGENTS.md`).                           |

Idan wani yanayin amfani a nan gaba ya tabbatar da dacewar ɗaya daga cikin waɗannan, wannan doc ne wurin da za a yi gyara.

## Fitarwa cikin makonni 4 (idan an amince)

1. **Mako na 1** — Haɗa wannan PR + tabbatar da profiles na opt-in ta amfani da compose stack mai replicas 3.
2. **Mako na 2** — Cikakken kunna Bifrost don OpenAI/Claude/Gemini/Ollama (4 daga cikin providers 14+) ta amfani da hanyar sidecar proxy a [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ana sarrafa shi da `BIFROST_ENABLED`, kuma ana iya kashe shi nan take yayin aiki).
3. **Mako na 3** — Kunna profile na ƙwaƙwalwar Qdrant a deployment na gwaji guda ɗaya; auna bambancin latency idan aka kwatanta da sqlite-vec.
4. **Mako na 4** — Healthchecks na observability (`docker compose ps` exit codes + gwaje-gwajen smoke na `wget`); sabunta ginshiƙai 71 bisa ADR-041.

## Fayilolin da aka canza a wannan PR

| Fayil                                                   | Canji                                                                                                                                                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                    | Layuka +30: profile na `memory` (Qdrant), profile na `bifrost` (Bifrost), persistent volumes, healthchecks.                                                                                                     |
| `.env.example`                                          | Layuka +24: `QDRANT_*` (vars 6), `BIFROST_*` (vars 4).                                                                                                                                                          |
| `docs/reference/ENVIRONMENT.md`                         | Rows +6 a sashe na 25 don env vars na `QDRANT_*`.                                                                                                                                                               |
| `src/lib/memory/qdrant.ts`                              | Layuka +33: jerin fallback na env-var (settings → env → default) don `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | Layuka +88: sabbin test cases 9 da ke tabbatar da fifikon fallback na env-var.                                                                                                                                  |
| `docs/architecture/cluster-decisions.md` (wannan fayil) | SABO — kundin yanke shawara don profiles na opt-in.                                                                                                                                                             |
| `AGENTS.md`                                             | Layi +1: nuni zuwa wannan doc a cikin jadawalin reference documentation.                                                                                                                                        |

**Jimillar code da aka taɓa:** Fayilolin production 4 (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), fayil ɗin test 1 (`qdrant-wiring.test.ts`), fayilolin doc 2 (`cluster-decisions.md`, `AGENTS.md`).
