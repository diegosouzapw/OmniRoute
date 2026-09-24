# Cluster Decisions — Optional Sidecar Profiles (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Katayuan:** panukala (hinihintay ang pagsusuri ni @diegosouzapw)
**Petsa:** 2026-06-20
**Mga Sanggunian:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Dalawang opt-in na compose profile (`memory`, `bifrost`) para sa kasalukuyang 8-service deployment sa [`docker-compose.yml`](../../docker-compose.yml). **Hindi nagbabago** ang default na gawi sa pag-up: 3 × `omniroute` replica + Caddy + Redis + CliproxyAPI. Idinaragdag ng dalawang bagong profile ang Qdrant at Bifrost bilang mga opsyonal na sidecar, na pinapagana sa pamamagitan ng `docker compose --profile <name> up`. **Walang kasalukuyang service na inaalis o pinapalitan.**

## Bakit konserbatibo ang paraang ito

Payak at subok na ang kasalukuyang deployment setup ng OmniRoute:

- Pinangangasiwaan ng **`redis:7-alpine`** ang rate-limit/cache workload sa production scale.
- Saklaw ng **SQLite + sqlite-vec + FTS5** ang lokal na memory + vector + text search (tingnan ang [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- Ang **Caddy** na ang kasalukuyang LB + TLS terminator ([`docker-compose.yml`](../../docker-compose.yml)).
- Naka-integrate na ang **Bifrost** bilang Tier-1 router sa [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar proxy na may kill switch sa pamamagitan ng `BIFROST_ENABLED` env var — itakda sa `=0` upang i-bypass ang sidecar at bumalik sa TS path).

Ang dalawang profile na ito ay mga **opsyon sa scale-out para sa mga deployment na umaabot sa limitasyon ng SQLite** — hindi mga migration. Parehong naka-off bilang default.

## Ang dalawang profile

### `memory` — Qdrant Vector Memory Sidecar

**Kailan ito dapat i-on:**

- > 1M embedding bawat deployment (nagsisimulang bumagal ang sqlite-vec sa malaking scale).
- Multi-replica deployment na nangangailangan ng nakabahaging vector state sa `omniroute-1/2/3`.
- Mayroon ka nang external na Qdrant cluster (Qdrant Cloud, on-prem).

**Ano ang idinaragdag nito:**

| Service  | Image                   | Mga Port    | Mga Tala                                                 |
| -------- | ----------------------- | ----------- | -------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index; persistent volume na `omniroute_qdrant_data` |

**Pag-activate:** itakda ang `qdrantEnabled = true` sa Settings UI **o** itakda ang `QDRANT_HOST=qdrant` env. Tingnan ang [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) para sa mga panuntunan sa precedence (settings table → env var → default).

**Mga env var:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (tingnan ang mga linya 1672-1683 ng `.env.example`).

### `bifrost` — Bifrost Tier-1 Router Sidecar

**Kailan ito dapat i-on:**

- Nagpapatakbo ka ng ≥3 `omniroute` replica at nais mong isentralisa ang provider rotation sa iisang Go process.
- Nais mo ng iisang audit/logging surface para sa mga request sa upstream provider mula sa lahat ng replica.
- Nais mong i-horizontal scale ang Tier-1 routing layer nang hiwalay sa mga OmniRoute replica.

**Ano ang idinaragdag nito:**

| Service   | Image                             | Mga Port | Mga Tala                                                                      |
| --------- | --------------------------------- | -------- | ----------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`   | Go-based na Tier-1 router; persistent logs volume na `omniroute_bifrost_logs` |

**Pag-activate:** itakda ang `BIFROST_BASE_URL=http://bifrost:8080` sa `.env.example`. Awtomatikong gagamitin ito ng kasalukuyang sidecar proxy route sa [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (idinagdag sa PR #4381).

**Mga env var:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (tingnan ang mga linya 1685-1695 ng `.env.example`).

## Ano ang tahasang HINDI ginagawa ng PR na ito

Iminungkahi sa orihinal na thread ng isyu ang mas malawak na muling pagsulat ng cluster. Pagkatapos suriin ang aktuwal na anyo ng workload, ang mga sumusunod ay **tinanggihan** dahil sa mga ibinigay na dahilan:

| Component                            | Pasya      | Dahilan                                                                                                                            |
| ------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ALISIN** | Sapat na ang `redis:7-alpine` para sa rate-limit workload sa production scale; walang limitasyong kailangang lampasan.             |
| **NATS**                             | **ALISIN** | Ang bawat replica ng `omniroute` ay iisang proseso ng Node.js; walang umiiral na multi-process pub/sub workload.                   |
| **PostgreSQL**                       | **ALISIN** | Sinasaklaw ng SQLite + sqlite-vec + FTS5 ang lahat ng 3 use case; hinaharangan ng 97 migration + Electron packaging ang migration. |
| **Neo4j**                            | **ALISIN** | Ang routing ay isang 5-table join; sapat ang recursive CTE sa SQLite.                                                              |
| **MinIO**                            | **ALISIN** | Walang multi-MB blob workload; passthrough proxy ang mga larawan/audio.                                                            |
| **pgvector / pg_ai / pg_textsearch** | **ALISIN** | Kaparehong dahilan tungkol sa limitasyon ng SQLite gaya ng sa PostgreSQL; watak-watak ang ecosystem ng pgvector.                   |
| **HAProxy / Envoy**                  | **ALISIN** | Ginagawa na ng Caddy ang LB + TLS; tahasang tinanggihan ang dalawa bilang mga Tier-1 router (tingnan ang `AGENTS.md`).             |

Kung mapatutunayan ng isang use case sa hinaharap ang pangangailangan sa isa sa mga ito, ang dokumentong ito ang lugar na dapat amyendahan.

## 4-na-linggong rollout (kung maaaprubahan)

1. **Linggo 1** — I-land ang PR na ito + beripikasyon ng mga opt-in profile gamit ang 3-replica compose stack.
2. **Linggo 2** — Ganap na pag-activate ng Bifrost para sa OpenAI/Claude/Gemini/Ollama (4 sa 14+ provider) gamit ang sidecar proxy route sa [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (kontrolado ng `BIFROST_ENABLED`, maaaring i-kill switch sa runtime).
3. **Linggo 3** — Paganahin ang Qdrant memory profile sa iisang test deployment; sukatin ang diperensiya sa latency kumpara sa sqlite-vec.
4. **Linggo 4** — Mga healthcheck para sa observability (`docker compose ps` exit code + mga `wget` smoke test); pag-refresh ng 71 pillar alinsunod sa ADR-041.

## Mga file na binago sa PR na ito

| File                                                       | Pagbabago                                                                                                                                                                                                          |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                       | +30 linya: `memory` profile (Qdrant), `bifrost` profile (Bifrost), mga persistent volume, mga healthcheck.                                                                                                         |
| `.env.example`                                             | +24 linya: `QDRANT_*` (6 na variable), `BIFROST_*` (4 na variable).                                                                                                                                                |
| `docs/reference/ENVIRONMENT.md`                            | +6 na row sa seksyon 25 para sa mga `QDRANT_*` env var.                                                                                                                                                            |
| `src/lib/memory/qdrant.ts`                                 | +33 linya: env-var fallback chain (mga setting → env → default) para sa `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`           | +88 linya: 9 na bagong test case na nagtatakda sa precedence ng env-var fallback.                                                                                                                                  |
| `docs/architecture/cluster-decisions.md` (ang file na ito) | BAGO — talaan ng desisyon para sa mga opt-in profile.                                                                                                                                                              |
| `AGENTS.md`                                                | +1 linya: panturo sa dokumentong ito sa talahanayan ng reference documentation.                                                                                                                                    |

**Kabuuang code na nabago:** 4 na production file (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test file (`qdrant-wiring.test.ts`), 2 doc file (`cluster-decisions.md`, `AGENTS.md`).
