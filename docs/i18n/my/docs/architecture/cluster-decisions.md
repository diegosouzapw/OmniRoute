# Cluster Decisions — Optional Sidecar Profiles (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**အခြေအနေ:** အဆိုပြုချက် (@diegosouzapw ၏ သုံးသပ်ချက်ကို စောင့်ဆိုင်းနေသည်)
**ရက်စွဲ:** 2026-06-20
**ကိုးကားချက်များ:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## အကျဉ်းချုပ်

[`docker-compose.yml`](../../docker-compose.yml) ရှိ လက်ရှိ ဝန်ဆောင်မှု 8 ခု deployment အတွက် မိမိဆန္ဒအလျောက် ဖွင့်သုံးနိုင်သော compose profile နှစ်ခု (`memory`, `bifrost`) ဖြစ်သည်။ ပုံမှန်စတင်မှု အပြုအမူမှာ **မပြောင်းလဲပါ**- `omniroute` replica 3 ခု + Caddy + Redis + CliproxyAPI ဖြစ်သည်။ Profile အသစ်နှစ်ခုသည် Qdrant နှင့် Bifrost ကို ရွေးချယ်နိုင်သော sidecar များအဖြစ် ထည့်သွင်းပေးပြီး `docker compose --profile <name> up` ဖြင့်သာ ဖွင့်သုံးနိုင်သည်။ **လက်ရှိဝန်ဆောင်မှုတစ်ခုမျှ ဖယ်ရှားခြင်း သို့မဟုတ် အစားထိုးခြင်း မရှိပါ။**

## ဤအဆိုပြုချက်သည် အဘယ်ကြောင့် သတိထားချဉ်းကပ်ထားသနည်း

OmniRoute ၏ လက်ရှိ deployment ပုံစံသည် ရိုးရှင်းကျစ်လျစ်ပြီး လက်တွေ့စမ်းသပ်အတည်ပြုပြီးသား ဖြစ်သည်-

- **`redis:7-alpine`** သည် ထုတ်လုပ်မှုပမာဏတွင် rate-limit/cache workload ကို ကိုင်တွယ်သည်။
- **SQLite + sqlite-vec + FTS5** သည် local memory + vector + စာသားရှာဖွေမှုတို့ကို ပံ့ပိုးပေးသည် ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) ကို ကြည့်ပါ)။
- **Caddy** သည် LB + TLS terminator အဖြစ် အသုံးပြုထားပြီးသား ဖြစ်သည် ([`docker-compose.yml`](../../docker-compose.yml))။
- **Bifrost** ကို [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) တွင် Tier-1 router အဖြစ် ပေါင်းစည်းထားပြီးသား ဖြစ်သည် (`BIFROST_ENABLED` env var မှတစ်ဆင့် kill switch ပါရှိသော sidecar proxy ဖြစ်သည် — sidecar ကို ကျော်ပြီး TS လမ်းကြောင်းသို့ ဆက်လက်အသုံးပြုရန် `=0` သတ်မှတ်ပါ)။

ဤ profile နှစ်ခုသည် **SQLite ၏ လုပ်ဆောင်နိုင်စွမ်း အကန့်အသတ်ကို ရောက်ရှိသော deployment များအတွက် scale-out ရွေးချယ်စရာများ** ဖြစ်ပြီး migration မဟုတ်ပါ။ နှစ်ခုစလုံးကို ပုံမှန်အားဖြင့် ပိတ်ထားသည်။

## Profile နှစ်ခု

### `memory` — Qdrant Vector Memory Sidecar

**ဖွင့်သုံးသင့်သည့်အချိန်-**

- Deployment တစ်ခုလျှင် embedding 1M ကျော်ရှိသည့်အခါ (sqlite-vec သည် ပမာဏကြီးမားလာချိန်တွင် စတင်နှေးကွေးလာသည်)။
- `omniroute-1/2/3` တစ်လျှောက် မျှဝေထားသော vector state လိုအပ်သည့် multi-replica deployment ဖြစ်သည့်အခါ။
- External Qdrant cluster (Qdrant Cloud၊ on-prem) ရှိပြီးသားဖြစ်သည့်အခါ။

**ထည့်သွင်းပေးသည့်အရာ-**

| ဝန်ဆောင်မှု | Image                   | Port များ   | မှတ်ချက်များ                                          |
| ----------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant`    | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index၊ persistent volume `omniroute_qdrant_data` |

**ဖွင့်သုံးခြင်း:** Settings UI တွင် `qdrantEnabled = true` သို့ ပြောင်းပါ **သို့မဟုတ်** `QDRANT_HOST=qdrant` env ကို သတ်မှတ်ပါ။ ဦးစားပေးစည်းမျဉ်းများ (settings table → env var → ပုံသေတန်ဖိုး) အတွက် [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) ကို ကြည့်ပါ။

**Env var များ:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` ၏ လိုင်း 1672-1683 ကို ကြည့်ပါ)။

### `bifrost` — Bifrost Tier-1 Router Sidecar

**ဖွင့်သုံးသင့်သည့်အချိန်-**

- `omniroute` replica ≥3 ခု အသုံးပြုနေပြီး provider rotation ကို Go process တစ်ခုတည်းတွင် ဗဟိုမှ စီမံလိုသည့်အခါ။
- Replica အားလုံးမှ upstream-provider request များအတွက် တစ်နေရာတည်းတွင် audit/logging ပြုလုပ်နိုင်လိုသည့်အခါ။
- OmniRoute replica များနှင့် သီးခြားလွတ်လပ်စွာ Tier-1 routing layer ကို horizontal scaling ပြုလုပ်လိုသည့်အခါ။

**ထည့်သွင်းပေးသည့်အရာ-**

| ဝန်ဆောင်မှု | Image                             | Port များ | မှတ်ချက်များ                                                              |
| ----------- | --------------------------------- | --------- | ------------------------------------------------------------------------- |
| `bifrost`   | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`    | Go အခြေပြု Tier-1 router၊ persistent logs volume `omniroute_bifrost_logs` |

**ဖွင့်သုံးခြင်း:** `.env.example` တွင် `BIFROST_BASE_URL=http://bifrost:8080` ဟု သတ်မှတ်ပါ။ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ရှိ လက်ရှိ sidecar proxy route (PR #4381 တွင် ထည့်သွင်းထားသည်) သည် ဤသတ်မှတ်ချက်ကို အလိုအလျောက် အသုံးပြုမည်ဖြစ်သည်။

**Env var များ:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` ၏ လိုင်း 1685-1695 ကို ကြည့်ပါ)။

## ဤ PR က အတိအလင်း မလုပ်ဆောင်သည့်အရာများ

မူလ issue thread တွင် ပိုမိုကြီးမားသော cluster ပြန်လည်ရေးသားမှုတစ်ခုကို အကြံပြုခဲ့သည်။ လက်တွေ့ workload ပုံစံကို စစ်ဆေးပြီးနောက် အောက်ပါအရာများကို ဖော်ပြထားသော အကြောင်းပြချက်များကြောင့် **ပယ်ချခဲ့သည်**-

| အစိတ်အပိုင်း                         | ဆုံးဖြတ်ချက် | အကြောင်းပြချက်                                                                                                                                           |
| ------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ဖယ်ရှား**  | `redis:7-alpine` သည် production အတိုင်းအတာရှိ rate-limit workload အတွက် လုံလောက်ကောင်းမွန်ပြီးဖြစ်သည်။ ကျော်လွန်ရမည့် ကန့်သတ်ချက် မရှိပါ။                |
| **NATS**                             | **ဖယ်ရှား**  | `omniroute` replica တစ်ခုစီသည် Node.js process တစ်ခုတည်းဖြစ်ပြီး multi-process pub/sub workload မရှိပါ။                                                  |
| **PostgreSQL**                       | **ဖယ်ရှား**  | SQLite + sqlite-vec + FTS5 သည် use case ၃ မျိုးလုံးကို ဖြည့်ဆည်းပေးနိုင်သည်။ migration ၉၇ ခုနှင့် Electron packaging တို့က migration ကို ပိတ်ဆို့ထားသည်။ |
| **Neo4j**                            | **ဖယ်ရှား**  | Routing သည် table ၅ ခု join လုပ်ခြင်းဖြစ်ပြီး SQLite ပေါ်ရှိ recursive CTE ဖြင့် လုံလောက်သည်။                                                            |
| **MinIO**                            | **ဖယ်ရှား**  | Multi-MB blob workload မရှိပါ။ ပုံနှင့် အသံများသည် passthrough proxy များဖြစ်သည်။                                                                        |
| **pgvector / pg_ai / pg_textsearch** | **ဖယ်ရှား**  | PostgreSQL နှင့် တူညီသော SQLite ကန့်သတ်ချက်ဆိုင်ရာ အကြောင်းပြချက်ဖြစ်ပြီး pgvector ecosystem သည် အစိတ်စိတ်အမြွှာမြွှာ ဖြစ်နေသည်။                         |
| **HAProxy / Envoy**                  | **ဖယ်ရှား**  | Caddy က LB + TLS ကို လုပ်ဆောင်ပြီးဖြစ်သည်။ နှစ်ခုလုံးကို Tier-1 router များအဖြစ် အတိအလင်း ပယ်ချထားသည် (`AGENTS.md` ကို ကြည့်ပါ)။                         |

အနာဂတ် use case တစ်ခုက ဤအရာများထဲမှ တစ်ခုကို သင့်လျော်ကြောင်း သက်သေပြပါက ဤ doc သည် ပြင်ဆင်ရမည့်နေရာဖြစ်သည်။

## ၄ ပတ်တာ rollout (အတည်ပြုပါက)

1. **ပတ် ၁** — ဤ PR ကို ထည့်သွင်းပြီး replica ၃ ခုပါ compose stack ဖြင့် opt-in profile များကို စစ်ဆေးအတည်ပြုမည်။
2. **ပတ် ၂** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ရှိ sidecar proxy route ကို အသုံးပြု၍ OpenAI/Claude/Gemini/Ollama (provider ၁၄ ခုကျော်အနက် ၄ ခု) အတွက် Bifrost ကို အပြည့်အဝ ဖွင့်မည် (`BIFROST_ENABLED` ဖြင့် ထိန်းချုပ်ထားပြီး runtime တွင် kill switch ဖြင့် ပိတ်နိုင်သည်)။
3. **ပတ် ၃** — Test deployment တစ်ခုတည်းတွင် Qdrant memory profile ကို ဖွင့်ပြီး sqlite-vec နှင့် နှိုင်းယှဉ်ကာ latency ကွာခြားချက်ကို တိုင်းတာမည်။
4. **ပတ် ၄** — Observability healthcheck များ (`docker compose ps` exit code များ + `wget` smoke test များ) ကို ပြုလုပ်ပြီး ADR-041 အတိုင်း pillar ၇၁ ခုကို refresh လုပ်မည်။

## ဤ PR တွင် ပြောင်းလဲထားသော file များ

| File                                              | ပြောင်းလဲမှု                                                                                                                                                                                                     |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                              | စာကြောင်း +၃၀- `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volume များနှင့် healthcheck များ။                                                                                             |
| `.env.example`                                    | စာကြောင်း +၂၄- `QDRANT_*` (var ၆ ခု), `BIFROST_*` (var ၄ ခု)။                                                                                                                                                    |
| `docs/reference/ENVIRONMENT.md`                   | `QDRANT_*` env var များအတွက် အပိုင်း ၂၅ တွင် row +၆ ခု။                                                                                                                                                          |
| `src/lib/memory/qdrant.ts`                        | စာကြောင်း +၃၃- `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` အတွက် env-var fallback အစဉ် (settings → env → default)။ |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`  | စာကြောင်း +၈၈- env-var fallback ဦးစားပေးအစဉ်ကို အတည်ပြုထားသည့် test case အသစ် ၉ ခု။                                                                                                                              |
| `docs/architecture/cluster-decisions.md` (ဤ file) | အသစ် — opt-in profile များအတွက် ဆုံးဖြတ်ချက်မှတ်တမ်း။                                                                                                                                                            |
| `AGENTS.md`                                       | စာကြောင်း +၁- reference documentation table ထဲရှိ ဤ doc သို့ pointer။                                                                                                                                            |

**ထိတွေ့ပြောင်းလဲထားသော code စုစုပေါင်း-** production file ၄ ခု (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), test file ၁ ခု (`qdrant-wiring.test.ts`), doc file ၂ ခု (`cluster-decisions.md`, `AGENTS.md`)။
