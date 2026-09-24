# Cluster Decisions — Optional Sidecar Profiles (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**وضعیت:** پیشنهاد (در انتظار بررسی @diegosouzapw)
**تاریخ:** 2026-06-20
**ارجاعات:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932)، PR #4381

## خلاصه

دو پروفایل اختیاری Compose (`memory` و `bifrost`) برای استقرار ۸ سرویسی موجود در [`docker-compose.yml`](../../docker-compose.yml). رفتار پیشفرض اجرا **بدون تغییر** باقی میماند: ۳ نمونهٔ `omniroute` + Caddy + Redis + CliproxyAPI. دو پروفایل جدید، Qdrant و Bifrost را بهعنوان سرویسهای جانبی اختیاری اضافه میکنند که از طریق `docker compose --profile <name> up` فعال میشوند. **هیچیک از سرویسهای موجود حذف یا جایگزین نمیشود.**

## چرا این رویکرد محافظهکارانه است

ساختار استقرار فعلی OmniRoute از قبل سبک و اثباتشده است:

- **`redis:7-alpine`** بار کاری محدودسازی نرخ/کش را در مقیاس عملیاتی مدیریت میکند.
- **SQLite + sqlite-vec + FTS5** حافظهٔ محلی + بردار + جستوجوی متنی را پوشش میدهند (نگاه کنید به [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** از قبل متعادلکنندهٔ بار + خاتمهدهندهٔ TLS است ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** از قبل بهعنوان مسیریاب سطح ۱ در [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) یکپارچه شده است (پراکسی جانبی با کلید توقف از طریق متغیر محیطی `BIFROST_ENABLED` — برای دور زدن سرویس جانبی و بازگشت به مسیر TS، مقدار `=0` را تنظیم کنید).

دو پروفایل ارائهشده در اینجا **گزینههایی برای مقیاسپذیری استقرارهایی هستند که به سقف ظرفیت SQLite رسیدهاند** — نه مهاجرت. هر دو بهصورت پیشفرض غیرفعالاند.

## دو پروفایل

### `memory` — سرویس جانبی حافظهٔ برداری Qdrant

**چه زمانی فعال شود:**

- بیش از ۱ میلیون embedding در هر استقرار (sqlite-vec در مقیاس بالا شروع به کند شدن میکند).
- استقرار چندنمونهای که به وضعیت برداری مشترک میان `omniroute-1/2/3` نیاز دارد.
- از قبل یک کلاستر خارجی Qdrant دارید (Qdrant Cloud یا درونسازمانی).

**چه چیزی اضافه میکند:**

| سرویس    | ایمیج                   | پورتها      | توضیحات                                            |
| -------- | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | ایندکس HNSW؛ والیوم پایدار `omniroute_qdrant_data` |

**فعالسازی:** در رابط کاربری تنظیمات، `qdrantEnabled = true` را فعال کنید **یا** متغیر محیطی `QDRANT_HOST=qdrant` را تنظیم کنید. برای قواعد اولویتبندی (جدول تنظیمات ← متغیر محیطی ← مقدار پیشفرض)، به [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) مراجعه کنید.

**متغیرهای محیطی:** `QDRANT_HOST`، `QDRANT_PORT`، `QDRANT_API_KEY`، `QDRANT_COLLECTION`، `QDRANT_VECTOR_SIZE`، `QDRANT_HNSW_EF_CONSTRUCT` (نگاه کنید به خطوط 1672-1683 در `.env.example`).

### `bifrost` — سرویس جانبی مسیریاب سطح ۱ Bifrost

**چه زمانی فعال شود:**

- حداقل ۳ نمونهٔ `omniroute` را اجرا میکنید و میخواهید چرخش ارائهدهندگان در یک پردازش Go متمرکز شود.
- یک سطح واحد برای ممیزی/ثبت درخواستهای ارائهدهندگان بالادستی در تمام نمونهها میخواهید.
- میخواهید لایهٔ مسیریابی سطح ۱ را مستقل از نمونههای OmniRoute بهصورت افقی مقیاس دهید.

**چه چیزی اضافه میکند:**

| سرویس     | ایمیج                             | پورتها | توضیحات                                                                 |
| --------- | --------------------------------- | ------ | ----------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | مسیریاب سطح ۱ مبتنی بر Go؛ والیوم پایدار لاگها `omniroute_bifrost_logs` |

**فعالسازی:** مقدار `BIFROST_BASE_URL=http://bifrost:8080` را در `.env.example` تنظیم کنید. مسیر پراکسی جانبی موجود در [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (اضافهشده در PR #4381) آن را بهطور خودکار دریافت خواهد کرد.

**متغیرهای محیطی:** `BIFROST_BASE_URL`، `BIFROST_API_KEY`، `BIFROST_STREAMING_ENABLED`، `BIFROST_TIMEOUT_MS` (نگاه کنید به خطوط 1685-1695 در `.env.example`).

## کارهایی که این PR صراحتاً انجام **نمیدهد**

در رشتهگفتوگوی اولیهٔ مسئله، بازنویسی گستردهتری برای کلاستر مطرح شده بود. پس از بررسی شکل واقعی بار کاری، گزینههای زیر به دلایل ذکرشده **رد شدهاند**:

| مؤلفه                                | نتیجه   | دلیل                                                                                                                      |
| ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **حذف** | `redis:7-alpine` در مقیاس تولید برای بار کاری محدودسازی نرخ کاملاً مناسب است؛ سقفی وجود ندارد که نیاز به رفع داشته باشد.  |
| **NATS**                             | **حذف** | هر replica از `omniroute` یک فرایند منفرد Node.js است؛ هیچ بار کاری pub/sub چندفرایندی وجود ندارد.                        |
| **PostgreSQL**                       | **حذف** | SQLite + sqlite-vec + FTS5 هر ۳ مورد استفاده را پوشش میدهند؛ ۹۷ migration بههمراه بستهبندی Electron مانع مهاجرت میشوند.   |
| **Neo4j**                            | **حذف** | مسیریابی یک join پنججدولی است؛ CTE بازگشتی در SQLite کفایت میکند.                                                         |
| **MinIO**                            | **حذف** | هیچ بار کاری blob چندمگابایتی وجود ندارد؛ تصاویر/صدا از طریق پراکسیهای passthrough عبور میکنند.                           |
| **pgvector / pg_ai / pg_textsearch** | **حذف** | همان دلیل مربوط به سقف SQLite که برای PostgreSQL ذکر شد؛ اکوسیستم pgvector پراکنده است.                                   |
| **HAProxy / Envoy**                  | **حذف** | Caddy از قبل LB + TLS را انجام میدهد؛ هر دو نیز صراحتاً بهعنوان مسیریابهای Tier-1 رد شدهاند (به `AGENTS.md` مراجعه کنید). |

اگر در آینده مورد استفادهای کارآمدی یکی از این گزینهها را اثبات کند، این سند محل اصلاح تصمیم خواهد بود.

## عرضهٔ ۴هفتهای (در صورت تأیید)

1. **هفتهٔ ۱** — ادغام این PR + راستیآزمایی پروفایلهای opt-in با یک پشتهٔ compose دارای ۳ replica.
2. **هفتهٔ ۲** — فعالسازی کامل Bifrost برای OpenAI/Claude/Gemini/Ollama (۴ مورد از بیش از ۱۴ ارائهدهنده) با استفاده از مسیر پراکسی sidecar در [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (تحت کنترل `BIFROST_ENABLED` و با قابلیت توقف فوری در زمان اجرا).
3. **هفتهٔ ۳** — فعالسازی پروفایل حافظهٔ Qdrant در یک استقرار آزمایشی منفرد؛ اندازهگیری اختلاف تأخیر نسبت به sqlite-vec.
4. **هفتهٔ ۴** — بررسیهای سلامت مشاهدهپذیری (کدهای خروج `docker compose ps` + آزمونهای سریع `wget`)؛ بهروزرسانی ۷۱ ستون مطابق ADR-041.

## فایلهای تغییرکرده در این PR

| فایل                                                | تغییر                                                                                                                                                                                                             |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | ۳۰+ خط: پروفایل `memory` ‏(Qdrant)، پروفایل `bifrost` ‏(Bifrost)، volumeهای پایدار و بررسیهای سلامت.                                                                                                              |
| `.env.example`                                      | ۲۴+ خط: `QDRANT_*` ‏(۶ متغیر)، `BIFROST_*` ‏(۴ متغیر).                                                                                                                                                            |
| `docs/reference/ENVIRONMENT.md`                     | ۶+ ردیف در بخش ۲۵ برای متغیرهای محیطی `QDRANT_*`.                                                                                                                                                                 |
| `src/lib/memory/qdrant.ts`                          | ۳۳+ خط: زنجیرهٔ fallback متغیرهای محیطی (تنظیمات ← محیط ← پیشفرض) برای `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | ۸۸+ خط: ۹ مورد آزمون جدید برای تثبیت اولویت fallback متغیرهای محیطی.                                                                                                                                              |
| `docs/architecture/cluster-decisions.md` (این فایل) | جدید — سابقهٔ تصمیمگیری برای پروفایلهای opt-in.                                                                                                                                                                   |
| `AGENTS.md`                                         | ۱+ خط: اشارهگر به این سند در جدول مستندات مرجع.                                                                                                                                                                   |

**مجموع کدهای دستخورده:** ۴ فایل تولیدی (`docker-compose.yml`، `qdrant.ts`، `.env.example`، `ENVIRONMENT.md`)، ۱ فایل آزمون (`qdrant-wiring.test.ts`) و ۲ فایل مستندات (`cluster-decisions.md`، `AGENTS.md`).
