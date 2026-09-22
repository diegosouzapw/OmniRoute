# Cluster Decisions — Optional Sidecar Profiles (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Hali:** pendekezo (linasubiri uhakiki wa @diegosouzapw)
**Tarehe:** 2026-06-20
**Marejeleo:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Kwa ufupi

Profaili mbili za hiari za compose (`memory`, `bifrost`) kwa usanidi uliopo wa huduma 8 katika [`docker-compose.yml`](../../docker-compose.yml). Tabia chaguomsingi ya kuwasha huduma **haijabadilika**: nakala 3 × `omniroute` + Caddy + Redis + CliproxyAPI. Profaili hizo mbili mpya huongeza Qdrant na Bifrost kama huduma saidizi za hiari, zinazowezeshwa kupitia `docker compose --profile <name> up`. **Hakuna huduma iliyopo inayoondolewa au kubadilishwa.**

## Kwa nini mbinu hii ni ya tahadhari

Muundo uliopo wa usanidi wa OmniRoute tayari ni mwepesi na umethibitishwa:

- **`redis:7-alpine`** hushughulikia mzigo wa kazi wa udhibiti wa kiwango/hifadhi muda katika kiwango cha uzalishaji.
- **SQLite + sqlite-vec + FTS5** hushughulikia kumbukumbu ya ndani + vekta + utafutaji wa maandishi (tazama [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** tayari ni kisawazisha mzigo + kikomesha TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** tayari imeunganishwa kama kipanga njia cha Tier-1 katika [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proksi ya huduma saidizi yenye swichi ya kuzima kupitia kigezo cha mazingira cha `BIFROST_ENABLED` — weka `=0` ili kukwepa huduma saidizi na kurejea kwenye njia ya TS).

Profaili hizi mbili ni **chaguo za kupanua uwezo kwa usawa kwa usanidi unaofikia kikomo cha SQLite** — si uhamishaji. Zote zimezimwa kwa chaguomsingi.

## Profaili hizi mbili

### `memory` — Huduma Saidizi ya Kumbukumbu ya Vekta ya Qdrant

**Wakati wa kuiwasha:**

- Zaidi ya embeddings 1M kwa kila usanidi (sqlite-vec huanza kupungua kasi inapofikia kiwango kikubwa).
- Usanidi wenye nakala nyingi unaohitaji hali ya vekta inayoshirikiwa kwenye `omniroute-1/2/3`.
- Tayari una cluster ya nje ya Qdrant (Qdrant Cloud, on-prem).

**Inachoongeza:**

| Huduma   | Image                   | Porti       | Maelezo                                                    |
| -------- | ----------------------- | ----------- | ---------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Fahirisi ya HNSW; volume ya kudumu `omniroute_qdrant_data` |

**Uwezeshaji:** weka `qdrantEnabled = true` katika kiolesura cha Mipangilio **au** weka kigezo cha mazingira `QDRANT_HOST=qdrant`. Tazama [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) kwa kanuni za kipaumbele (jedwali la mipangilio → kigezo cha mazingira → chaguomsingi).

**Vigezo vya mazingira:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (tazama mistari ya 1672-1683 katika `.env.example`).

### `bifrost` — Huduma Saidizi ya Kipanga Njia cha Tier-1 cha Bifrost

**Wakati wa kuiwasha:**

- Unaendesha nakala ≥3 za `omniroute` na unataka mzunguko wa watoa huduma uwe katika mchakato mmoja wa Go.
- Unataka sehemu moja ya ukaguzi/uwekaji kumbukumbu kwa maombi kwa watoa huduma wa juu kutoka kwenye nakala zote.
- Unataka upanuzi wa usawa wa safu ya upangaji njia ya Tier-1 bila kutegemea nakala za OmniRoute.

**Inachoongeza:**

| Huduma    | Image                             | Porti  | Maelezo                                                                                          |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Kipanga njia cha Tier-1 kinachotumia Go; volume ya kudumu ya kumbukumbu `omniroute_bifrost_logs` |

**Uwezeshaji:** weka `BIFROST_BASE_URL=http://bifrost:8080` katika `.env.example`. Njia iliyopo ya proksi ya huduma saidizi katika [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (iliyoongezwa katika PR #4381) itaitambua hii kiotomatiki.

**Vigezo vya mazingira:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (tazama mistari ya 1685-1695 katika `.env.example`).

## Mambo ambayo PR hii kwa uwazi HAIFANYI

Hoja ya awali ilipendekeza uandishi upya wa klasta kwa kiwango kikubwa zaidi. Baada ya kukagua muundo halisi wa mzigo wa kazi, yafuatayo **yamekataliwa** kwa sababu zilizotolewa:

| Kipengele                            | Uamuzi    | Sababu                                                                                                                          |
| ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ONDOA** | `redis:7-alpine` tayari inafaa kwa mzigo wa kazi wa udhibiti wa kasi katika kiwango cha uzalishaji; hakuna kikomo cha kuvunja.  |
| **NATS**                             | **ONDOA** | Kila nakala ya `omniroute` ni mchakato mmoja wa Node.js; hakuna mzigo wa kazi wa pub/sub wa michakato mingi.                    |
| **PostgreSQL**                       | **ONDOA** | SQLite + sqlite-vec + FTS5 zinashughulikia hali zote 3 za matumizi; uhamishaji 97 + ufungashaji wa Electron unazuia uhamishaji. |
| **Neo4j**                            | **ONDOA** | Uelekezaji ni uunganishaji wa majedwali 5; CTE rekursivu kwenye SQLite inatosha.                                                |
| **MinIO**                            | **ONDOA** | Hakuna mzigo wa kazi wa blob wa MB nyingi; picha/sauti hupitishwa kupitia proksi bila kubadilishwa.                             |
| **pgvector / pg_ai / pg_textsearch** | **ONDOA** | Sababu ileile ya kikomo cha SQLite kama PostgreSQL; mfumo ikolojia wa pgvector umegawanyika.                                    |
| **HAProxy / Envoy**                  | **ONDOA** | Caddy tayari inafanya LB + TLS; zote mbili zilikataliwa waziwazi kama vielekezaji vya Tier-1 (angalia `AGENTS.md`).             |

Ikiwa hali ya matumizi ya baadaye itathibitisha mojawapo ya hizi, hati hii ndiyo mahali pa kuifanyia marekebisho.

## Utekelezaji wa wiki 4 (ukiidhinishwa)

1. **Wiki ya 1** — Unganisha PR hii + uthibitishaji wa wasifu wa hiari kwa kutumia safu ya compose yenye nakala 3.
2. **Wiki ya 2** — Uanzishaji kamili wa Bifrost kwa OpenAI/Claude/Gemini/Ollama (4 kati ya watoa huduma 14+) kwa kutumia njia ya proksi ya sidecar katika [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (inadhibitiwa na `BIFROST_ENABLED`, na inaweza kuzimwa wakati wa utekelezaji).
3. **Wiki ya 3** — Wasifu wa kumbukumbu wa Qdrant uwezeshwe katika utekelezaji mmoja wa majaribio; pima tofauti ya muda wa kusubiri dhidi ya sqlite-vec.
4. **Wiki ya 4** — Ukaguzi wa afya wa uangalizi (`docker compose ps` misimbo ya kutoka + majaribio ya msingi ya `wget`); usasishaji wa nguzo 71 kulingana na ADR-041.

## Faili zilizobadilishwa katika PR hii

| Faili                                                | Badiliko                                                                                                                                                                                                                                     |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | Mistari +30: wasifu wa `memory` (Qdrant), wasifu wa `bifrost` (Bifrost), hifadhi endelevu, ukaguzi wa afya.                                                                                                                                  |
| `.env.example`                                       | Mistari +24: `QDRANT_*` (vigezo 6), `BIFROST_*` (vigezo 4).                                                                                                                                                                                  |
| `docs/reference/ENVIRONMENT.md`                      | Safu mlalo +6 katika sehemu ya 25 kwa vigezo vya mazingira vya `QDRANT_*`.                                                                                                                                                                   |
| `src/lib/memory/qdrant.ts`                           | Mistari +33: mnyororo mbadala wa vigezo vya mazingira (mipangilio → mazingira → chaguomsingi) kwa `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | Mistari +88: hali 9 mpya za majaribio zinazothibitisha mpangilio wa kipaumbele wa chaguo mbadala za vigezo vya mazingira.                                                                                                                    |
| `docs/architecture/cluster-decisions.md` (faili hii) | MPYA — rekodi ya uamuzi kwa wasifu wa hiari.                                                                                                                                                                                                 |
| `AGENTS.md`                                          | Mstari +1: kiashiria cha hati hii katika jedwali la nyaraka za marejeleo.                                                                                                                                                                    |

**Jumla ya msimbo ulioguswa:** faili 4 za uzalishaji (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), faili 1 ya majaribio (`qdrant-wiring.test.ts`), faili 2 za nyaraka (`cluster-decisions.md`, `AGENTS.md`).
