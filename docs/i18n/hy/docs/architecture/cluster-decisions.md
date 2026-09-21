# Cluster Decisions — Optional Sidecar Profiles (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Կարգավիճակ՝** առաջարկ (սպասում է @diegosouzapw-ի վերանայմանը)
**Ամսաթիվ՝** 2026-06-20
**Հղումներ՝** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Կարճ ամփոփում

Երկու կամընտիր compose պրոֆիլ (`memory`, `bifrost`)՝ [`docker-compose.yml`](../../docker-compose.yml)-ում առկա 8 ծառայություններից բաղկացած տեղակայման համար։ Լռելյայն գործարկման վարքագիծը **անփոփոխ է**՝ 3 × `omniroute` ռեպլիկա + Caddy + Redis + CliproxyAPI։ Երկու նոր պրոֆիլները Qdrant-ը և Bifrost-ն ավելացնում են որպես կամընտիր կողմնակի ծառայություններ, որոնք ակտիվացվում են `docker compose --profile <name> up` հրամանով։ **Առկա որևէ ծառայություն չի հեռացվում կամ փոխարինվում։**

## Ինչու է այս մոտեցումը պահպանողական

OmniRoute-ի առկա տեղակայման կառուցվածքն արդեն իսկ թեթև և փորձարկված է․

- **`redis:7-alpine`**-ը արտադրական մասշտաբով սպասարկում է հարցումների հաճախականության սահմանափակման/քեշի ծանրաբեռնվածությունը։
- **SQLite + sqlite-vec + FTS5**-ը սպասարկում են տեղային հիշողությունը + վեկտորային + տեքստային որոնումը (տե՛ս [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts))։
- **Caddy**-ն արդեն իսկ բեռի հավասարակշռիչն ու TLS-ի վերջնավորողն է ([`docker-compose.yml`](../../docker-compose.yml))։
- **Bifrost**-ն արդեն ինտեգրված է որպես Tier-1 երթուղիչ՝ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-ում (կողմնակի պրոքսի՝ `BIFROST_ENABLED` միջավայրի փոփոխականի միջոցով վթարային անջատման հնարավորությամբ․ կողմնակի ծառայությունը շրջանցելու և TS ուղուն անցնելու համար սահմանեք `=0`)։

Այստեղ ներկայացված երկու պրոֆիլները **մասշտաբավորման տարբերակներ են այն տեղակայումների համար, որոնք հասնում են SQLite-ի սահմանաչափին**․ դրանք միգրացիաներ չեն։ Երկուսն էլ լռելյայն անջատված են։

## Երկու պրոֆիլները

### `memory` — Qdrant վեկտորային հիշողության կողմնակի ծառայություն

**Երբ միացնել՝**

- Յուրաքանչյուր տեղակայման համար > 1M ներդրում (sqlite-vec-ը մեծ մասշտաբի դեպքում սկսում է դանդաղել)։
- Բազմառեպլիկա տեղակայում, որին անհրաժեշտ է ընդհանուր վեկտորային վիճակ `omniroute-1/2/3`-ի միջև։
- Դուք արդեն ունեք արտաքին Qdrant կլաստեր (Qdrant Cloud, տեղային ենթակառուցվածք)։

**Ինչ է այն ավելացնում՝**

| Ծառայություն | Պատկեր                  | Պորտեր      | Նշումներ                                           |
| ------------ | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant`     | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ինդեքս, մշտական `omniroute_qdrant_data` հատոր |

**Ակտիվացում՝** Settings UI-ում միացրեք `qdrantEnabled = true`-ը **կամ** սահմանեք `QDRANT_HOST=qdrant` միջավայրի փոփոխականը։ Առաջնահերթության կանոնները տե՛ս [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts)-ում (կարգավորումների աղյուսակ → միջավայրի փոփոխական → լռելյայն արժեք)։

**Միջավայրի փոփոխականներ՝** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (տե՛ս `.env.example`-ի 1672-1683 տողերը)։

### `bifrost` — Bifrost Tier-1 երթուղիչի կողմնակի ծառայություն

**Երբ միացնել՝**

- Դուք գործարկում եք ≥3 `omniroute` ռեպլիկա և ցանկանում եք մատակարարների հերթափոխը կենտրոնացնել մեկ Go գործընթացում։
- Ցանկանում եք բոլոր ռեպլիկաներից դեպի վերին մակարդակի մատակարարներ ուղարկվող հարցումների համար ունենալ աուդիտի/մատյանների վարման միասնական միջերես։
- Ցանկանում եք Tier-1 երթուղավորման շերտը հորիզոնական մասշտաբավորել՝ OmniRoute-ի ռեպլիկաներից անկախ։

**Ինչ է այն ավելացնում՝**

| Ծառայություն | Պատկեր                            | Պորտեր | Նշումներ                                                                            |
| ------------ | --------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `bifrost`    | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-ի վրա հիմնված Tier-1 երթուղիչ, մատյանների մշտական `omniroute_bifrost_logs` հատոր |

**Ակտիվացում՝** `.env.example`-ում սահմանեք `BIFROST_BASE_URL=http://bifrost:8080`։ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-ում առկա կողմնակի պրոքսիի երթուղին (ավելացվել է PR #4381-ում) սա ինքնաբերաբար կօգտագործի։

**Միջավայրի փոփոխականներ՝** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (տե՛ս `.env.example`-ի 1685-1695 տողերը)։

## Ինչ այս PR-ը հստակ ՉԻ անում

Սկզբնական խնդրի քննարկման ընթացքում առաջարկվել էր կլաստերի ավելի լայնածավալ վերամշակում։ Փաստացի ծանրաբեռնվածության բնույթը վերլուծելուց հետո ստորև նշված տարբերակները **մերժվել են**՝ ներկայացված պատճառներով.

| Բաղադրիչ                             | Վճիռ         | Պատճառ                                                                                                                                                       |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **ՀԵՌԱՑՆԵԼ** | `redis:7-alpine`-ն արդեն բավարար է արտադրական մասշտաբում հարցումների հաճախականության սահմանափակման ծանրաբեռնվածության համար․ հաղթահարելու սահմանափակում չկա։ |
| **NATS**                             | **ՀԵՌԱՑՆԵԼ** | `omniroute`-ի յուրաքանչյուր ռեպլիկ մեկ Node.js պրոցես է․ բազմապրոցեսային pub/sub ծանրաբեռնվածություն գոյություն չունի։                                       |
| **PostgreSQL**                       | **ՀԵՌԱՑՆԵԼ** | SQLite + sqlite-vec + FTS5-ը ծածկում են բոլոր 3 կիրառման դեպքերը․ 97 միգրացիաները + Electron-ի փաթեթավորումն արգելափակում են միգրացիան։                      |
| **Neo4j**                            | **ՀԵՌԱՑՆԵԼ** | Երթուղավորումը 5 աղյուսակների միավորում է․ SQLite-ում ռեկուրսիվ CTE-ն բավարար է։                                                                             |
| **MinIO**                            | **ՀԵՌԱՑՆԵԼ** | Բազմամեգաբայթանոց blob-ների ծանրաբեռնվածություն չկա․ պատկերները/ձայնագրությունները միջանցիկ պրոքսիներ են։                                                    |
| **pgvector / pg_ai / pg_textsearch** | **ՀԵՌԱՑՆԵԼ** | Նույն SQLite-ի սահմանափակման պատճառն է, ինչ PostgreSQL-ի դեպքում․ pgvector-ի էկոհամակարգը մասնատված է։                                                       |
| **HAProxy / Envoy**                  | **ՀԵՌԱՑՆԵԼ** | Caddy-ն արդեն իրականացնում է բեռի հավասարակշռում + TLS․ երկուսն էլ հստակ մերժվել են որպես Tier-1 երթուղավորիչներ (տե՛ս `AGENTS.md`)։                         |

Եթե ապագա կիրառման որևէ դեպք հաստատի այս տարբերակներից մեկի անհրաժեշտությունը, այս փաստաթուղթը պետք է համապատասխանաբար փոփոխվի։

## 4-շաբաթյա ներդրում (հաստատվելու դեպքում)

1. **Շբթ. 1** — Միավորել այս PR-ը + ստուգել ընտրովի պրոֆիլները 3 ռեպլիկով compose ստեկի միջոցով։
2. **Շբթ. 2** — Bifrost-ի ամբողջական ակտիվացում OpenAI/Claude/Gemini/Ollama-ի համար (14+-ից 4 մատակարար)՝ օգտագործելով sidecar պրոքսիի երթուղին՝ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (`BIFROST_ENABLED`-ով վերահսկվող, կատարման ընթացքում անջատման հնարավորությամբ)։
3. **Շբթ. 3** — Միացնել Qdrant հիշողության պրոֆիլը մեկ փորձնական տեղակայման մեջ․ չափել ուշացման տարբերությունը sqlite-vec-ի համեմատ։
4. **Շբթ. 4** — Դիտարկելիության աշխատունակության ստուգումներ (`docker compose ps`-ի ելքի կոդեր + `wget`-ի նախնական ստուգումներ)․ 71 հենասյուների թարմացում՝ ըստ ADR-041-ի։

## Այս PR-ում փոփոխված ֆայլերը

| Ֆայլ                                                 | Փոփոխություն                                                                                                                                                                                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 տող՝ `memory` պրոֆիլ (Qdrant), `bifrost` պրոֆիլ (Bifrost), մշտական հատորներ, աշխատունակության ստուգումներ։                                                                                                                                             |
| `.env.example`                                       | +24 տող՝ `QDRANT_*` (6 փոփոխական), `BIFROST_*` (4 փոփոխական)։                                                                                                                                                                                              |
| `docs/reference/ENVIRONMENT.md`                      | +6 տող 25-րդ բաժնում՝ `QDRANT_*` միջավայրի փոփոխականների համար։                                                                                                                                                                                            |
| `src/lib/memory/qdrant.ts`                           | +33 տող՝ միջավայրի փոփոխականների հետադարձ ընտրության շղթա (կարգավորումներ → միջավայր → լռելյայն արժեք)՝ `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`-ի համար։ |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 տող՝ 9 նոր թեստային դեպք, որոնք ամրագրում են միջավայրի փոփոխականների հետադարձ ընտրության առաջնահերթությունը։                                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (այս ֆայլը) | ՆՈՐ — ընտրովի պրոֆիլների վերաբերյալ որոշման գրառում։                                                                                                                                                                                                       |
| `AGENTS.md`                                          | +1 տող՝ հղում այս փաստաթղթին տեղեկատու փաստաթղթերի աղյուսակում։                                                                                                                                                                                            |

**Փոփոխված կոդի ընդհանուր ծավալը՝** 4 արտադրական ֆայլ (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 թեստային ֆայլ (`qdrant-wiring.test.ts`), 2 փաստաթղթային ֆայլ (`cluster-decisions.md`, `AGENTS.md`)։
