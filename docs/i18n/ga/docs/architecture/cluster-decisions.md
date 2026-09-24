# Cluster Decisions — Optional Sidecar Profiles (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Stádas:** togra (ag feitheamh le hathbhreithniú ó @diegosouzapw)
**Dáta:** 2026-06-20
**Tagairtí:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Achoimre

Dhá phróifíl roghnacha compose (`memory`, `bifrost`) don imscaradh 8 seirbhís atá ann cheana in [`docker-compose.yml`](../../docker-compose.yml). Tá an t-iompar réamhshocraithe tosaithe **gan athrú**: 3 × macasamhail `omniroute` + Caddy + Redis + CliproxyAPI. Cuireann an dá phróifíl nua Qdrant agus Bifrost leis mar thaobhcharranna roghnacha, arna rialú ag `docker compose --profile <name> up`. **Ní bhaintear aon seirbhís atá ann cheana ná ní chuirtear seirbhís eile ina hionad.**

## Cén fáth a bhfuil sé seo coimeádach

Tá struchtúr imscartha OmniRoute atá ann cheana éadrom agus cruthaithe:

- Láimhseálann **`redis:7-alpine`** an t-ualach oibre teorannaithe ráta/taisce ar scála táirgeachta.
- Clúdaíonn **SQLite + sqlite-vec + FTS5** cuimhne áitiúil + veicteoirí + cuardach téacs (féach [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- Is é **Caddy** an cothromóir lóid + críochfort TLS cheana féin ([`docker-compose.yml`](../../docker-compose.yml)).
- Tá **Bifrost** comhtháite cheana féin mar an ródaire Sraith 1 in [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (seachfhreastalaí taobhcharr le lasc éigeandála tríd an athróg timpeallachta `BIFROST_ENABLED` — socraigh `=0` chun an taobhcharr a sheachaint agus titim siar chuig an gcosán TS).

Is **roghanna leathnaithe iad an dá phróifíl anseo le haghaidh imscaradh a bhaineann teorainn SQLite amach** — ní ascnaimh iad. Tá an dá cheann múchta de réir réamhshocraithe.

## An dá phróifíl

### `memory` — Taobhcharr Cuimhne Veicteoirí Qdrant

**Cathain ba cheart é a chur ar siúl:**

- > 1M leabú in aghaidh an imscartha (tosaíonn sqlite-vec ag moilliú ar scála).
- Imscaradh ilmhacasamhla a dteastaíonn staid chomhroinnte veicteoirí uaidh thar `omniroute-1/2/3`.
- Tá braisle sheachtrach Qdrant agat cheana féin (Qdrant Cloud, ar an láthair).

**An méid a chuireann sé leis:**

| Seirbhís | Íomhá                   | Poirt       | Nótaí                                                     |
| -------- | ----------------------- | ----------- | --------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Innéacs HNSW; imleabhar seasmhach `omniroute_qdrant_data` |

**Gníomhachtú:** athraigh `qdrantEnabled = true` sa Chomhéadan Socruithe **nó** socraigh an athróg timpeallachta `QDRANT_HOST=qdrant`. Féach [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) le haghaidh na rialacha tosaíochta (tábla socruithe → athróg timpeallachta → réamhshocrú).

**Athróga timpeallachta:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (féach línte 1672-1683 in `.env.example`).

### `bifrost` — Taobhcharr Ródaire Sraith 1 Bifrost

**Cathain ba cheart é a chur ar siúl:**

- Ritheann tú ≥3 mhacasamhail `omniroute` agus tá tú ag iarraidh rothlú soláthraithe a lárú i bpróiseas Go amháin.
- Tá dromchla aonair iniúchóireachta/logála uait le haghaidh iarratais chuig soláthraithe réamhtheachtacha thar gach macasamhail.
- Tá tú ag iarraidh ciseal ródaithe Shraith 1 a scálú go cothrománach, go neamhspleách ar mhacasamhlacha OmniRoute.

**An méid a chuireann sé leis:**

| Seirbhís  | Íomhá                             | Poirt  | Nótaí                                                                               |
| --------- | --------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Ródaire Sraith 1 bunaithe ar Go; imleabhar seasmhach logaí `omniroute_bifrost_logs` |

**Gníomhachtú:** socraigh `BIFROST_BASE_URL=http://bifrost:8080` in `.env.example`. Piocfaidh an bealach seachfhreastalaí taobhcharr atá ann cheana ag [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (a cuireadh leis in PR #4381) é seo suas go huathoibríoch.

**Athróga timpeallachta:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (féach línte 1685-1695 in `.env.example`).

## Na ruda nach ndéanann an PR seo go sainráite

Moladh athscríobh braisle níos mó sa snáithe bunaidh faoin tsaincheist. Tar éis iniúchadh a dhéanamh ar chruth iarbhír an ualaigh oibre, **diúltaíodh** dóibh seo a leanas ar na cúiseanna a tugadh:

| Comhpháirt                           | Breith         | Cúis                                                                                                                              |
| ------------------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **FÁG AR LÁR** | Tá `redis:7-alpine` breá cheana féin don ualach oibre teorannaithe ráta ar scála táirgeachta; níl aon uasteorainn le sárú.        |
| **NATS**                             | **FÁG AR LÁR** | Is próiseas aonair Node.js é gach macasamhail `omniroute`; níl aon ualach oibre foilsithe/síntiúis ilphróisis ann.                |
| **PostgreSQL**                       | **FÁG AR LÁR** | Clúdaíonn SQLite + sqlite-vec + FTS5 na 3 chás úsáide ar fad; cuireann 97 ascnamh + pacáistiú Electron bac ar an ascnamh.         |
| **Neo4j**                            | **FÁG AR LÁR** | Is ceangal 5 thábla é an ródú; is leor CTE athchúrsach ar SQLite.                                                                 |
| **MinIO**                            | **FÁG AR LÁR** | Níl aon ualach oibre blob il-MB ann; is seachfhreastalaithe tréchuir iad íomhánna/fuaim.                                          |
| **pgvector / pg_ai / pg_textsearch** | **FÁG AR LÁR** | An chúis chéanna maidir le huasteorainn SQLite agus a bhaineann le PostgreSQL; tá éiceachóras pgvector ilroinnte.                 |
| **HAProxy / Envoy**                  | **FÁG AR LÁR** | Déanann Caddy cothromú ualaigh + TLS cheana féin; diúltaíodh don dá cheann go sainráite mar ródairí Sraith-1 (féach `AGENTS.md`). |

Má chruthaíonn cás úsáide amach anseo gur fiú ceann díobh seo, is í an cháipéis seo an áit lena leasú.

## Rolladh amach 4 seachtaine (má cheadaítear é)

1. **Seachtain 1** — Cumaisc an PR seo + fíorú na bpróifílí roghnacha le cruach compose 3 mhacasamhail.
2. **Seachtain 2** — Gníomhachtú iomlán Bifrost do OpenAI/Claude/Gemini/Ollama (4 as 14+ soláthraí) ag úsáid bhealach seachfhreastalaí an taoibhcharr ag [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (rialaithe ag `BIFROST_ENABLED`, agus is féidir é a mhúchadh ag am rite).
3. **Seachtain 3** — Próifíl chuimhne Qdrant cumasaithe in imscaradh tástála amháin; tomhais an difríocht aga folaigh i gcomparáid le sqlite-vec.
4. **Seachtain 4** — Seiceálacha sláinte inbhraiteachta (cóid scoir `docker compose ps` + tástálacha deataigh `wget`); athnuachan 71 colún de réir ADR-041.

## Comhaid athraithe sa PR seo

| Comhad                                                   | Athrú                                                                                                                                                                                                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                     | +30 líne: próifíl `memory` (Qdrant), próifíl `bifrost` (Bifrost), imleabhair mharthanacha, seiceálacha sláinte.                                                                                                                       |
| `.env.example`                                           | +24 líne: `QDRANT_*` (6 athróg), `BIFROST_*` (4 athróg).                                                                                                                                                                              |
| `docs/reference/ENVIRONMENT.md`                          | +6 ró i rannán 25 do na hathróga timpeallachta `QDRANT_*`.                                                                                                                                                                            |
| `src/lib/memory/qdrant.ts`                               | +33 líne: slabhra cúltaca athróg timpeallachta (socruithe → timpeallacht → réamhshocrú) do `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`         | +88 líne: 9 gcás tástála nua a shocraíonn tosaíocht an chúltaca athróg timpeallachta.                                                                                                                                                 |
| `docs/architecture/cluster-decisions.md` (an comhad seo) | NUA — taifead cinnidh do na próifílí roghnacha.                                                                                                                                                                                       |
| `AGENTS.md`                                              | +1 líne: pointeoir chuig an gcáipéis seo sa tábla cáipéisíochta tagartha.                                                                                                                                                             |

**Glanlíon an chóid ar baineadh leis:** 4 chomhad táirgeachta (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 chomhad tástála (`qdrant-wiring.test.ts`), 2 chomhad cáipéise (`cluster-decisions.md`, `AGENTS.md`).
