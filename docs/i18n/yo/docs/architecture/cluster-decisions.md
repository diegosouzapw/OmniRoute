# Cluster Decisions — Optional Sidecar Profiles (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Ipò:** àbá (ń dúró de àyẹ̀wò @diegosouzapw)
**Ọjọ́:** 2026-06-20
**Àwọn ìtọ́kasí:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Àwọn compose profile méjì tí a lè yàn láti lò (`memory`, `bifrost`) fún ìmúlò iṣẹ́ mẹ́jọ tó wà tẹ́lẹ̀ nínú [`docker-compose.yml`](../../docker-compose.yml). Ìhùwàsí ìbẹ̀rẹ̀ àìyípadà jẹ́ **bákan náà**: àwọn replica `omniroute` 3 + Caddy + Redis + CliproxyAPI. Àwọn profile tuntun méjèèjì náà ń ṣàfikún Qdrant àti Bifrost gẹ́gẹ́ bí sidecar àṣàyàn, tí `docker compose --profile <name> up` ń ṣàkóso. **Kò sí iṣẹ́ tó wà tẹ́lẹ̀ tí a yọ kúrò tàbí rọ́pò.**

## Ìdí tí èyí fi jẹ́ ọ̀nà ìṣọ́ra

Ìṣètò ìmúlò OmniRoute tó wà tẹ́lẹ̀ ti fẹ́rẹ̀ẹ́ tó, ó sì ti jẹ́rìí pé ó ṣiṣẹ́ dáadáa:

- **`redis:7-alpine`** ń bójú tó iṣẹ́ ìdíwọ̀n-oṣùwọ̀n/cache ní ìwọ̀n iṣelọpọ.
- **SQLite + sqlite-vec + FTS5** ń bójú tó memory agbègbè + vector + ìṣàwárí ọ̀rọ̀ (wo [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** ti jẹ́ LB + olùparí TLS tẹ́lẹ̀ ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ti jẹ́ apá kan gẹ́gẹ́ bí router Tier-1 nínú [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar pẹ̀lú kill switch nípasẹ̀ env var `BIFROST_ENABLED` — ṣètò `=0` láti fò kọjá sidecar náà kí o sì tẹ̀síwájú sí ọ̀nà TS).

Àwọn profile méjèèjì níbí jẹ́ **àwọn àṣàyàn ìfẹ̀síwájú fún àwọn ìmúlò tí ó dé ààlà SQLite** — wọn kì í ṣe ìṣíkiri. Wọ́n jẹ́ pípà ní àìyípadà.

## Àwọn profile méjèèjì

### `memory` — Sidecar Iranti Vector Qdrant

**Ìgbà tí ó yẹ kí o tan-an:**

- > 1M embeddings fún ìmúlò kọ̀ọ̀kan (sqlite-vec bẹ̀rẹ̀ sí í lọra ní ìwọ̀n ńlá).
- Ìmúlò replica-púpọ̀ tí ó nílò ipò vector tí a pín láàárín `omniroute-1/2/3`.
- O ti ní cluster Qdrant ti òde tẹ́lẹ̀ (Qdrant Cloud, on-prem).

**Ohun tí ó ń ṣàfikún:**

| Iṣẹ́      | Image                   | Àwọn port   | Àwọn àkíyèsí                                    |
| -------- | ----------------------- | ----------- | ----------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Atọ́ka HNSW; volume pípẹ́ `omniroute_qdrant_data` |

**Ìmúṣiṣẹ́:** yí `qdrantEnabled = true` padà nínú UI Settings **tàbí** ṣètò env `QDRANT_HOST=qdrant`. Wo [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) fún àwọn òfin àṣáájú (tábìlì ètò → env var → àìyípadà).

**Àwọn env var:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (wo àwọn ìlà 1672-1683 nínú `.env.example`).

### `bifrost` — Sidecar Router Tier-1 Bifrost

**Ìgbà tí ó yẹ kí o tan-an:**

- O ń ṣiṣẹ́ àwọn replica `omniroute` ≥3, o sì fẹ́ kí a ṣe àárín gbùngbùn fún yíyí provider nínú process Go kan ṣoṣo.
- O fẹ́ ojú-ọ̀nà audit/ìforúkọsílẹ̀ kan ṣoṣo fún àwọn ìbéèrè sí upstream-provider láti gbogbo replica.
- O fẹ́ ìfẹ̀síwájú petele ti ipele routing Tier-1 láìdá lórí àwọn replica OmniRoute.

**Ohun tí ó ń ṣàfikún:**

| Iṣẹ́       | Image                             | Àwọn port | Àwọn àkíyèsí                                                          |
| --------- | --------------------------------- | --------- | --------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`    | Router Tier-1 tó dá lórí Go; volume log pípẹ́ `omniroute_bifrost_logs` |

**Ìmúṣiṣẹ́:** ṣètò `BIFROST_BASE_URL=http://bifrost:8080` nínú `.env.example`. Ọ̀nà proxy sidecar tó wà tẹ́lẹ̀ ní [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (tí a ṣàfikún nínú PR #4381) yóò gbé èyí láìfọwọ́ṣe.

**Àwọn env var:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (wo àwọn ìlà 1685-1695 nínú `.env.example`).

## Ohun tí PR yìí kò ṣe ní pàtó

Okùn ìjíròrò ọ̀ràn àkọ́kọ́ dábàá àtúnkọ ìdìpọ̀ tó tóbi sí i. Lẹ́yìn ṣíṣàyẹ̀wò ìrísí ẹrù iṣẹ́ gangan, a **kọ** àwọn nǹkan wọ̀nyí fún àwọn ìdí tí a sọ:

| Ẹ̀yà                                  | Ìdájọ́       | Ìdí                                                                                                      |
| ------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **YỌ KÚRÒ** | `redis:7-alpine` ti péye fún ẹrù iṣẹ́ ààlà-oṣuwọn ní ìwọ̀n iṣelọpọ; kò sí ààlà kankan láti kọjá.           |
| **NATS**                             | **YỌ KÚRÒ** | Ẹ̀dà `omniroute` kọ̀ọ̀kan jẹ́ ilana Node.js kan ṣoṣo; kò sí ẹrù iṣẹ́ pub/sub oní-ilana-púpọ̀.                  |
| **PostgreSQL**                       | **YỌ KÚRÒ** | SQLite + sqlite-vec + FTS5 bo gbogbo ọ̀nà ìlò mẹ́ta; àwọn ìṣíkiri 97 + ìdìpọ̀ Electron dí ìṣíkiri lọ́nà.     |
| **Neo4j**                            | **YỌ KÚRÒ** | Ìdarí ọ̀nà jẹ́ ìsopọ̀ tábìlì márùn-ún; CTE oníṣàtúnṣe lórí SQLite ti tó.                                    |
| **MinIO**                            | **YỌ KÚRÒ** | Kò sí ẹrù iṣẹ́ blob oní-MB-púpọ̀; àwọn àwòrán/ohùn jẹ́ àwọn aṣojú ìkọjá-nìkan.                              |
| **pgvector / pg_ai / pg_textsearch** | **YỌ KÚRÒ** | Ìdí ààlà SQLite kan náà bíi PostgreSQL; ẹ̀ka-ọ̀nà pgvector ti pín sí wẹ́wẹ́.                                 |
| **HAProxy / Envoy**                  | **YỌ KÚRÒ** | Caddy ti ń ṣe LB + TLS tẹ́lẹ̀; a kọ àwọn méjèèjì ní pàtó gẹ́gẹ́ bí àwọn olùdarí ọ̀nà Tier-1 (wo `AGENTS.md`). |

Tí ọ̀nà ìlò ọjọ́ iwájú bá fi ẹ̀rí hàn pé ọ̀kan nínú àwọn wọ̀nyí wúlò, doc yìí ni ibi láti ṣe àtúnṣe.

## Ìmújáde ọ̀sẹ̀ mẹ́rin (tí a bá fọwọ́ sí i)

1. **Ọ̀s 1** — Ṣàkópọ̀ PR yìí + ìfìdímúlẹ̀ àwọn profile àṣàyàn-wọlé pẹ̀lú stack compose oní-ẹ̀dà mẹ́ta.
2. **Ọ̀s 2** — Ìmúṣiṣẹ́ Bifrost ní kíkún fún OpenAI/Claude/Gemini/Ollama (4 nínú 14+ olùpèsè) nípa lílo ọ̀nà aṣojú sidecar ní [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (tí `BIFROST_ENABLED` ń ṣàkóso, tí a sì lè pa nígbà ìṣiṣẹ́).
3. **Ọ̀s 3** — Mú profile ìrántí Qdrant ṣiṣẹ́ nínú ìmúṣiṣẹ́ ìdánwò kan ṣoṣo; wọn ìyàtọ̀ ìdádúró rẹ̀ sí sqlite-vec.
4. **Ọ̀s 4** — Àwọn àyẹ̀wò ìlera àkíyèsí (`docker compose ps` exit codes + àwọn ìdánwò smoke `wget`); ìsọdọ̀tun ọ̀wọ́n 71 gẹ́gẹ́ bí ADR-041.

## Àwọn fáìlì tí a yí padà nínú PR yìí

| Fáìlì                                                | Ìyípadà                                                                                                                                                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 ìlà: profile `memory` (Qdrant), profile `bifrost` (Bifrost), àwọn volume tó dúró pẹ́, àwọn àyẹ̀wò ìlera.                                                                                               |
| `.env.example`                                       | +24 ìlà: `QDRANT_*` (vars 6), `BIFROST_*` (vars 4).                                                                                                                                                      |
| `docs/reference/ENVIRONMENT.md`                      | +6 ìlà nínú abala 25 fún àwọn env vars `QDRANT_*`.                                                                                                                                                       |
| `src/lib/memory/qdrant.ts`                           | +33 ìlà: ẹ̀wọ̀n àfẹ́yinti env-var (settings → env → default) fún `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 ìlà: àwọn ìṣẹ̀lẹ̀ ìdánwò tuntun 9 tó ń fìdí ìṣáájú àfẹ́yinti env-var múlẹ̀.                                                                                                                              |
| `docs/architecture/cluster-decisions.md` (fáìlì yìí) | TUNTUN — àkọsílẹ̀ ìpinnu fún àwọn profile àṣàyàn-wọlé.                                                                                                                                                    |
| `AGENTS.md`                                          | +1 ìlà: atọ́ka sí doc yìí nínú tábìlì àkọsílẹ̀ ìtọ́kasí.                                                                                                                                                    |

**Àpapọ̀ kóòdù tí a kàn:** àwọn fáìlì iṣelọpọ 4 (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), fáìlì ìdánwò 1 (`qdrant-wiring.test.ts`), àwọn fáìlì doc 2 (`cluster-decisions.md`, `AGENTS.md`).
