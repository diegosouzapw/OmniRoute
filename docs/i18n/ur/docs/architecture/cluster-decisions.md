# Cluster Decisions — Optional Sidecar Profiles (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**حیثیت:** تجویز (‏@diegosouzapw کے جائزے کی منتظر)
**تاریخ:** 2026-06-20
**حوالہ جات:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932)، PR #4381

## خلاصہ

[`docker-compose.yml`](../../docker-compose.yml) میں موجودہ 8-سروس تعیناتی کے لیے دو اختیاری compose پروفائلز (`memory`، `bifrost`)۔ ڈیفالٹ `up` رویہ **غیر تبدیل شدہ** ہے: 3 × `omniroute` ریپلیکا + Caddy + Redis + CliproxyAPI۔ دونوں نئے پروفائلز، `docker compose --profile <name> up` کے ذریعے فعال کیے جانے پر، Qdrant اور Bifrost کو اختیاری سائیڈ کارز کے طور پر شامل کرتے ہیں۔ **کسی موجودہ سروس کو حذف یا تبدیل نہیں کیا جاتا۔**

## یہ محتاط طریقۂ کار کیوں ہے

OmniRoute کی موجودہ تعیناتی ساخت پہلے ہی ہلکی پھلکی اور آزمودہ ہے:

- **`redis:7-alpine`** پیداواری پیمانے پر شرح محدودیت/کیش کا کام سنبھالتا ہے۔
- **SQLite + sqlite-vec + FTS5** مقامی میموری + ویکٹر + متنی تلاش کی ضروریات پوری کرتے ہیں ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) دیکھیں)۔
- **Caddy** پہلے ہی LB + TLS ٹرمینیٹر ہے ([`docker-compose.yml`](../../docker-compose.yml))۔
- **Bifrost** پہلے ہی [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) میں Tier-1 راؤٹر کے طور پر مربوط ہے (`BIFROST_ENABLED` ماحولیاتی متغیر کے ذریعے کِل سوئچ رکھنے والا سائیڈ کار پراکسی — سائیڈ کار کو بائی پاس کرکے TS راستے پر جانے کے لیے `=0` مقرر کریں)۔

یہ دونوں پروفائلز **ان تعیناتیوں کے لیے پیمانہ بڑھانے کے اختیارات ہیں جو SQLite کی حد تک پہنچ جاتی ہیں** — یہ مائیگریشنز نہیں ہیں۔ دونوں ڈیفالٹ طور پر غیر فعال ہیں۔

## دونوں پروفائلز

### `memory` — Qdrant ویکٹر میموری سائیڈ کار

**کب فعال کریں:**

- فی تعیناتی > 1M ایمبیڈنگز (sqlite-vec بڑے پیمانے پر سست ہونا شروع ہو جاتا ہے)۔
- ایسی کثیر ریپلیکا تعیناتی جسے `omniroute-1/2/3` کے درمیان مشترکہ ویکٹر حالت درکار ہو۔
- آپ کے پاس پہلے ہی ایک بیرونی Qdrant کلسٹر موجود ہو (Qdrant Cloud، آن پریمائز)۔

**یہ کیا شامل کرتا ہے:**

| سروس     | امیج                    | پورٹس       | نوٹس                                              |
| -------- | ----------------------- | ----------- | ------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW انڈیکس؛ مستقل والیوم `omniroute_qdrant_data` |

**فعال کرنا:** Settings UI میں `qdrantEnabled = true` کریں **یا** `QDRANT_HOST=qdrant` ماحولیاتی متغیر مقرر کریں۔ ترجیحی قواعد (settings ٹیبل → ماحولیاتی متغیر → ڈیفالٹ) کے لیے [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) دیکھیں۔

**ماحولیاتی متغیرات:** `QDRANT_HOST`، `QDRANT_PORT`، `QDRANT_API_KEY`، `QDRANT_COLLECTION`، `QDRANT_VECTOR_SIZE`، `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` کی سطریں 1672-1683 دیکھیں)۔

### `bifrost` — Bifrost Tier-1 راؤٹر سائیڈ کار

**کب فعال کریں:**

- آپ ≥3 `omniroute` ریپلیکا چلاتے ہوں اور فراہم کنندہ کی روٹیشن کو ایک واحد Go پراسیس میں مرکزی بنانا چاہتے ہوں۔
- آپ تمام ریپلیکاز میں اپ اسٹریم فراہم کنندہ کی درخواستوں کے لیے ایک واحد آڈٹ/لاگنگ سطح چاہتے ہوں۔
- آپ Tier-1 راؤٹنگ تہہ کو OmniRoute ریپلیکاز سے آزادانہ طور پر افقی پیمانے پر بڑھانا چاہتے ہوں۔

**یہ کیا شامل کرتا ہے:**

| سروس      | امیج                              | پورٹس  | نوٹس                                                                |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go پر مبنی Tier-1 راؤٹر؛ مستقل لاگز والیوم `omniroute_bifrost_logs` |

**فعال کرنا:** `.env.example` میں `BIFROST_BASE_URL=http://bifrost:8080` مقرر کریں۔ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) میں موجودہ سائیڈ کار پراکسی روٹ (PR #4381 میں شامل کردہ) اسے خودکار طور پر استعمال کرے گا۔

**ماحولیاتی متغیرات:** `BIFROST_BASE_URL`، `BIFROST_API_KEY`، `BIFROST_STREAMING_ENABLED`، `BIFROST_TIMEOUT_MS` (`.env.example` کی سطریں 1685-1695 دیکھیں)۔

## یہ PR واضح طور پر کیا **نہیں** کرتا

اصل issue thread میں cluster کی ایک بڑی rewrite تجویز کی گئی تھی۔ حقیقی workload کی ساخت کا جائزہ لینے کے بعد، درج ذیل کو بیان کردہ وجوہات کی بنا پر **مسترد** کر دیا گیا ہے:

| جزو                                  | فیصلہ    | وجہ                                                                                                                              |
| ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **خارج** | production scale پر rate-limit workload کے لیے `redis:7-alpine` پہلے ہی کافی ہے؛ توڑنے کے لیے کوئی حد موجود نہیں۔                |
| **NATS**                             | **خارج** | ہر `omniroute` replica ایک واحد Node.js process ہے؛ کوئی multi-process pub/sub workload موجود نہیں۔                              |
| **PostgreSQL**                       | **خارج** | SQLite + sqlite-vec + FTS5 تینوں use cases کو پورا کرتے ہیں؛ 97 migrations + Electron packaging منتقلی میں رکاوٹ ہیں۔            |
| **Neo4j**                            | **خارج** | Routing ایک 5-table join ہے؛ SQLite پر recursive CTE کافی ہے۔                                                                    |
| **MinIO**                            | **خارج** | کوئی multi-MB blob workload نہیں؛ images/audio passthrough proxies ہیں۔                                                          |
| **pgvector / pg_ai / pg_textsearch** | **خارج** | وہی SQLite کی حد والی وجہ جو PostgreSQL کے لیے ہے؛ pgvector ecosystem بکھرا ہوا ہے۔                                              |
| **HAProxy / Envoy**                  | **خارج** | Caddy پہلے ہی LB + TLS انجام دیتا ہے؛ دونوں کو واضح طور پر Tier-1 routers کے طور پر مسترد کیا گیا تھا (`AGENTS.md` ملاحظہ کریں)۔ |

اگر مستقبل کا کوئی use case ان میں سے کسی کی افادیت ثابت کرتا ہے، تو ترمیم کے لیے یہی doc موزوں جگہ ہے۔

## 4 ہفتوں کا rollout (اگر منظور ہو جائے)

1. **ہفتہ 1** — اس PR کو ضم کرنا + 3-replica compose stack کے ساتھ opt-in profiles کی تصدیق۔
2. **ہفتہ 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) پر sidecar proxy route استعمال کرتے ہوئے OpenAI/Claude/Gemini/Ollama (14+ providers میں سے 4) کے لیے Bifrost کی مکمل فعالیت (`BIFROST_ENABLED` کے ذریعے محدود، runtime پر kill-switch کے قابل)۔
3. **ہفتہ 3** — ایک test deployment میں Qdrant memory profile فعال کرنا؛ sqlite-vec کے مقابلے میں latency کا فرق ناپنا۔
4. **ہفتہ 4** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests)؛ ADR-041 کے مطابق 71-pillar refresh۔

## اس PR میں تبدیل کردہ فائلیں

| فائل                                               | تبدیلی                                                                                                                                                                                                         |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 سطریں: `memory` profile (Qdrant)، `bifrost` profile (Bifrost)، persistent volumes، healthchecks۔                                                                                                           |
| `.env.example`                                     | +24 سطریں: `QDRANT_*` (6 vars)، `BIFROST_*` (4 vars)۔                                                                                                                                                          |
| `docs/reference/ENVIRONMENT.md`                    | `QDRANT_*` env vars کے لیے section 25 میں +6 rows۔                                                                                                                                                             |
| `src/lib/memory/qdrant.ts`                         | +33 سطریں: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` کے لیے env-var fallback chain (settings → env → default)۔ |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 سطریں: env-var fallback precedence کو مقرر کرنے والے 9 نئے test cases۔                                                                                                                                     |
| `docs/architecture/cluster-decisions.md` (یہ فائل) | نئی — opt-in profiles کے لیے decision record۔                                                                                                                                                                  |
| `AGENTS.md`                                        | +1 سطر: reference documentation table میں اس doc کی طرف اشارہ۔                                                                                                                                                 |

**مجموعی طور پر تبدیل شدہ code:** 4 production فائلیں (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`)، 1 test فائل (`qdrant-wiring.test.ts`)، 2 doc فائلیں (`cluster-decisions.md`, `AGENTS.md`)۔
