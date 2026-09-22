# Cluster Decisions — Optional Sidecar Profiles (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Ọnọdụ:** atụmatụ (na-eche nyocha @diegosouzapw)
**Ụbọchị:** 2026-06-20
**Ntụaka:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Profaịlụ compose abụọ a na-ahọrọ iji mee ihe (`memory`, `bifrost`) maka nhazi ọrụ 8 dị ugbu a na [`docker-compose.yml`](../../docker-compose.yml). Omume ndabara mgbe e mere `up` **agbanwebeghị**: oyiri `omniroute` 3 + Caddy + Redis + CliproxyAPI. Profaịlụ ọhụrụ abụọ ahụ na-agbakwunye Qdrant na Bifrost dị ka sidecar nhọrọ, nke a na-eme ka ọ rụọ ọrụ site na `docker compose --profile <name> up`. **E wepụbeghị ma ọ bụ dochie ọrụ ọ bụla dị ugbu a.**

## Ihe mere usoro a ji kpachapụ anya

Ụdị nhazi OmniRoute dị ugbu a adịlarị mfe ma gosipụta na ọ na-arụ ọrụ nke ọma:

- **`redis:7-alpine`** na-ahụ maka ibu ọrụ mmachi ọnụego/cache n'ọ̀tụ̀tụ̀ mmepụta.
- **SQLite + sqlite-vec + FTS5** na-ahụ maka ebe nchekwa mpaghara + vector + ọchụchọ ederede (lee [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** abụrụlarị ihe na-ekesa ibu (LB) + ihe na-akwụsị TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** etinyelarị dịka router Tier-1 na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar nwere kill switch site na mgbanwe env `BIFROST_ENABLED` — tọọ `=0` iji gafere sidecar ahụ ma laghachi n'ụzọ TS).

Profaịlụ abụọ a bụ **nhọrọ maka ịgbasa nhazi ndị ruru oke SQLite** — ha abụghị mbugharị. Ha abụọ anaghị arụ ọrụ na ndabara.

## Profaịlụ abụọ ahụ

### `memory` — Sidecar Ebe Nchekwa Vector Qdrant

**Mgbe a ga-eme ka ọ rụọ ọrụ:**

- > embeddings 1M n'otu nhazi (sqlite-vec na-amalite iji nwayọọ mgbe ọnụ ọgụgụ buru ibu).
- Nhazi nwere ọtụtụ oyiri nke chọrọ ka `omniroute-1/2/3` kerịta ọnọdụ vector.
- Ị nweelarị cluster Qdrant mpụga (Qdrant Cloud, nke dị n'ime ụlọ ọrụ).

**Ihe ọ na-agbakwunye:**

| Ọrụ      | Image                   | Ports       | Nkọwa                                                         |
| -------- | ----------------------- | ----------- | ------------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Index HNSW; volume na-adịgide adịgide `omniroute_qdrant_data` |

**Ime ka ọ rụọ ọrụ:** mee ka `qdrantEnabled = true` na UI Ntọala **ma ọ bụ** tọọ mgbanwe env `QDRANT_HOST=qdrant`. Lee [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) maka iwu usoro ebute ụzọ (tebụl ntọala → mgbanwe env → ndabara).

**Mgbanwe env:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (lee ahịrị 1672-1683 na `.env.example`).

### `bifrost` — Sidecar Router Tier-1 Bifrost

**Mgbe a ga-eme ka ọ rụọ ọrụ:**

- Ị na-eji oyiri `omniroute` ≥3 ma chọọ ka e jikọta ntụgharị ndị na-eweta ọrụ n'otu usoro Go.
- Ị chọrọ otu ebe maka audit/ndekọ log nke arịrịọ ndị na-aga n'aka ndị na-eweta ọrụ upstream n'ofe oyiri niile.
- Ị chọrọ ịgbasa oyi akwa routing Tier-1 n'ụzọ kwụ ọtọ, na-adabereghị na oyiri OmniRoute.

**Ihe ọ na-agbakwunye:**

| Ọrụ       | Image                             | Ports  | Nkọwa                                                                              |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Router Tier-1 e wuru na Go; volume log na-adịgide adịgide `omniroute_bifrost_logs` |

**Ime ka ọ rụọ ọrụ:** tọọ `BIFROST_BASE_URL=http://bifrost:8080` na `.env.example`. Ụzọ proxy sidecar dị ugbu a na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (nke agbakwunyere na PR #4381) ga-achọpụta nke a na-akpaghị aka.

**Mgbanwe env:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (lee ahịrị 1685-1695 na `.env.example`).

## Ihe PR a na-ekwupụta hoo haa na ọ naghị eme

Eriri okwu mbụ ahụ tụpụtara idegharị cluster n’ụzọ sara mbara karị. Mgbe e nyochachara ụdị ọrụ a na-arụ n’ezie, a **jụrụ** ihe ndị a n’ihi ihe ndị e depụtara:

| Akụkụ                                | Mkpebi   | Ihe kpatara ya                                                                                                       |
| ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **WEPU** | `redis:7-alpine` ezuolarị maka ọrụ rate-limit n’ogo mmepụta; enweghị oke arụmọrụ a ga-agbaji.                        |
| **NATS**                             | **WEPU** | Replica `omniroute` ọ bụla bụ otu process Node.js; enweghị ọrụ pub/sub nke ọtụtụ process.                            |
| **PostgreSQL**                       | **WEPU** | SQLite + sqlite-vec + FTS5 na-ekpuchi use case atọ ahụ niile; migration 97 + nkwakọba Electron na-egbochi migration. |
| **Neo4j**                            | **WEPU** | Routing bụ njikọ table 5; recursive CTE na SQLite zuru oke.                                                          |
| **MinIO**                            | **WEPU** | Enweghị ọrụ blob ọtụtụ-MB; onyonyo/audio bụ passthrough proxy.                                                       |
| **pgvector / pg_ai / pg_textsearch** | **WEPU** | Otu ihe kpatara oke SQLite ahụ dị ka PostgreSQL; ecosystem pgvector kewara ekewa.                                    |
| **HAProxy / Envoy**                  | **WEPU** | Caddy na-arụrịrị LB + TLS; a jụrụ ha abụọ hoo haa dị ka router Tier-1 (lee `AGENTS.md`).                             |

Ọ bụrụ na use case n’ọdịnihu egosi na otu n’ime ihe ndị a bara uru, doc a bụ ebe a ga-eme mgbanwe ahụ.

## Mwepụta izu 4 (ọ bụrụ na akwadoro ya)

1. **Izu 1** — Tinye PR a + nkwenye nke profile opt-in site na compose stack nwere replica 3.
2. **Izu 2** — Mee ka Bifrost rụọ ọrụ n’uju maka OpenAI/Claude/Gemini/Ollama (4 n’ime provider 14+) site n’ụzọ sidecar proxy dị na [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (`BIFROST_ENABLED` na-achịkwa ya, a pụkwara iji kill-switch gbanyụọ ya n’oge ọ na-arụ ọrụ).
3. **Izu 3** — Gbanye profile memory Qdrant n’otu test deployment; tụọ ọdịiche latency ya ma e jiri ya tụnyere sqlite-vec.
4. **Izu 4** — Healthcheck observability (`docker compose ps` exit code + `wget` smoke test); mmelite pillar 71 dịka ADR-041 si dị.

## Faịlụ ndị gbanwere na PR a

| Faịlụ                                              | Mgbanwe                                                                                                                                                                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                               | Ahịrị +30: profile `memory` (Qdrant), profile `bifrost` (Bifrost), volume na-adịgide adịgide, healthcheck.                                                                                                   |
| `.env.example`                                     | Ahịrị +24: `QDRANT_*` (var 6), `BIFROST_*` (var 4).                                                                                                                                                          |
| `docs/reference/ENVIRONMENT.md`                    | Row +6 na ngalaba 25 maka env var `QDRANT_*`.                                                                                                                                                                |
| `src/lib/memory/qdrant.ts`                         | Ahịrị +33: usoro fallback env-var (settings → env → default) maka `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | Ahịrị +88: test case ọhụrụ 9 na-eme ka usoro mkpa fallback env-var guzosie ike.                                                                                                                              |
| `docs/architecture/cluster-decisions.md` (faịlụ a) | ỌHỤRỤ — ndekọ mkpebi maka profile opt-in.                                                                                                                                                                    |
| `AGENTS.md`                                        | Ahịrị +1: ntụaka gaa na doc a n’ime table akwụkwọ ntụaka.                                                                                                                                                    |

**Koodu emetụtara n’ozuzu:** faịlụ mmepụta 4 (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), faịlụ test 1 (`qdrant-wiring.test.ts`), faịlụ doc 2 (`cluster-decisions.md`, `AGENTS.md`).
