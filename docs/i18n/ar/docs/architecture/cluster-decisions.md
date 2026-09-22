# Cluster Decisions — Optional Sidecar Profiles (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**الحالة:** مقترح (بانتظار مراجعة @diegosouzapw)
**التاريخ:** 2026-06-20
**المراجع:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932)، PR #4381

## الخلاصة

ملفّا تعريف اختياريان لـ Compose (`memory` و`bifrost`) لعملية النشر الحالية المكوّنة من 8 خدمات في [`docker-compose.yml`](../../docker-compose.yml). يظل السلوك الافتراضي عند التشغيل **دون تغيير**: 3 نسخ متماثلة من `omniroute` + Caddy + Redis + CliproxyAPI. يضيف ملفّا التعريف الجديدان Qdrant وBifrost كخدمات جانبية اختيارية، ولا يتم تفعيلهما إلا باستخدام `docker compose --profile <name> up`. **لا تُزال أو تُستبدل أي خدمة حالية.**

## لماذا يُعد هذا نهجًا متحفظًا

إن بنية النشر الحالية لـ OmniRoute بسيطة ومُثبتة الفاعلية بالفعل:

- يتولى **`redis:7-alpine`** عبء عمل تحديد المعدل/التخزين المؤقت على نطاق الإنتاج.
- تغطي **SQLite + sqlite-vec + FTS5** الذاكرة المحلية + المتجهات + البحث النصي (راجع [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- يُستخدم **Caddy** بالفعل لموازنة الأحمال + إنهاء TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- تم دمج **Bifrost** بالفعل كموجّه من المستوى الأول في [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (وكيل جانبي مزوّد بمفتاح إيقاف عبر متغير البيئة `BIFROST_ENABLED` — اضبطه على `=0` لتجاوز الخدمة الجانبية والرجوع إلى مسار TS).

ملفّا التعريف هذان هما **خياران للتوسّع الأفقي لعمليات النشر التي تبلغ حدود SQLite** — وليسا عمليتي ترحيل. كلاهما معطّل افتراضيًا.

## ملفّا التعريف

### `memory` — خدمة Qdrant الجانبية للذاكرة المتجهية

**متى ينبغي تفعيله:**

- أكثر من مليون تضمين لكل عملية نشر (يبدأ sqlite-vec بالتباطؤ على نطاق واسع).
- عملية نشر متعددة النسخ تحتاج إلى حالة متجهية مشتركة عبر `omniroute-1/2/3`.
- لديك بالفعل عنقود Qdrant خارجي (Qdrant Cloud أو داخل البنية التحتية المحلية).

**ما الذي يضيفه:**

| الخدمة   | الصورة                  | المنافذ     | الملاحظات                                           |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | فهرس HNSW؛ وحدة تخزين دائمة `omniroute_qdrant_data` |

**التفعيل:** اضبط `qdrantEnabled = true` في واجهة إعدادات المستخدم **أو** عيّن متغير البيئة `QDRANT_HOST=qdrant`. راجع [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) لمعرفة قواعد الأولوية (جدول الإعدادات ← متغير البيئة ← القيمة الافتراضية).

**متغيرات البيئة:** `QDRANT_HOST`، `QDRANT_PORT`، `QDRANT_API_KEY`، `QDRANT_COLLECTION`، `QDRANT_VECTOR_SIZE`، `QDRANT_HNSW_EF_CONSTRUCT` (راجع الأسطر 1672-1683 في `.env.example`).

### `bifrost` — خدمة Bifrost الجانبية للتوجيه من المستوى الأول

**متى ينبغي تفعيله:**

- تشغّل 3 نسخ متماثلة أو أكثر من `omniroute` وتريد إدارة التناوب بين المزوّدين مركزيًا ضمن عملية Go واحدة.
- تريد واجهة موحّدة للتدقيق/التسجيل لطلبات المزوّدين الخارجيين عبر جميع النسخ المتماثلة.
- تريد توسيع طبقة التوجيه من المستوى الأول أفقيًا وبشكل مستقل عن نسخ OmniRoute المتماثلة.

**ما الذي يضيفه:**

| الخدمة    | الصورة                            | المنافذ | الملاحظات                                                                             |
| --------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | موجّه من المستوى الأول قائم على Go؛ وحدة تخزين دائمة للسجلات `omniroute_bifrost_logs` |

**التفعيل:** عيّن `BIFROST_BASE_URL=http://bifrost:8080` في `.env.example`. سيتعرّف مسار الوكيل الجانبي الحالي في [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (المضاف في PR #4381) على هذا الإعداد تلقائيًا.

**متغيرات البيئة:** `BIFROST_BASE_URL`، `BIFROST_API_KEY`، `BIFROST_STREAMING_ENABLED`، `BIFROST_TIMEOUT_MS` (راجع الأسطر 1685-1695 في `.env.example`).

## ما لا يفعله طلب السحب هذا صراحةً

طرحت سلسلة المشكلة الأصلية إعادة كتابة أوسع للعنقود. بعد تدقيق الشكل الفعلي لأعباء العمل، تم **رفض** ما يلي للأسباب الموضحة:

| المكوّن                              | القرار    | السبب                                                                                                           |
| ------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **إسقاط** | `redis:7-alpine` مناسب بالفعل لعبء عمل تحديد المعدّل على نطاق الإنتاج؛ ولا يوجد سقف أداء يستدعي تجاوزه.         |
| **NATS**                             | **إسقاط** | كل نسخة متماثلة من `omniroute` هي عملية Node.js واحدة؛ ولا يوجد عبء عمل نشر/اشتراك متعدد العمليات.              |
| **PostgreSQL**                       | **إسقاط** | تغطي SQLite + sqlite-vec + FTS5 حالات الاستخدام الثلاث كلها؛ وتمنع 97 عملية ترحيل وحزم Electron عملية الانتقال. |
| **Neo4j**                            | **إسقاط** | التوجيه عبارة عن ربط بين 5 جداول؛ ويكفي استخدام CTE تكراري على SQLite.                                          |
| **MinIO**                            | **إسقاط** | لا يوجد عبء عمل لكائنات ثنائية بحجم عدة ميغابايت؛ فالصور/الصوت تمر عبر وكلاء دون معالجة.                        |
| **pgvector / pg_ai / pg_textsearch** | **إسقاط** | للسبب نفسه المتعلق بسقف SQLite كما في PostgreSQL؛ كما أن منظومة pgvector مجزأة.                                 |
| **HAProxy / Envoy**                  | **إسقاط** | يتولى Caddy بالفعل موازنة الأحمال + TLS؛ وقد رُفض كلاهما صراحةً كموجّهين من المستوى الأول (راجع `AGENTS.md`).   |

إذا أثبتت حالة استخدام مستقبلية جدوى أحد هذه المكونات، فهذا المستند هو المكان المناسب لتعديله.

## طرح على مدى 4 أسابيع (في حال الموافقة)

1. **الأسبوع 1** — دمج طلب السحب هذا + التحقق من ملفات التعريف الاختيارية باستخدام مكدس compose يتكون من 3 نسخ متماثلة.
2. **الأسبوع 2** — التفعيل الكامل لـ Bifrost من أجل OpenAI/Claude/Gemini/Ollama (أربعة من أكثر من 14 مزودًا) باستخدام مسار وكيل sidecar في [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (مقيّد بواسطة `BIFROST_ENABLED`، ويمكن إيقافه فورًا في وقت التشغيل).
3. **الأسبوع 3** — تمكين ملف تعريف ذاكرة Qdrant في عملية نشر اختبارية واحدة؛ وقياس فرق زمن الاستجابة مقارنةً بـ sqlite-vec.
4. **الأسبوع 4** — فحوصات سلامة قابلية الرصد (رموز خروج `docker compose ps` + اختبارات تحقق أولية باستخدام `wget`)؛ وتحديث الركائز الـ71 وفقًا لـ ADR-041.

## الملفات التي تغيرت في طلب السحب هذا

| الملف                                                | التغيير                                                                                                                                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                 | +30 سطرًا: ملف تعريف `memory` ‏(Qdrant)، وملف تعريف `bifrost` ‏(Bifrost)، ووحدات تخزين دائمة، وفحوصات سلامة.                                                                                                                         |
| `.env.example`                                       | +24 سطرًا: `QDRANT_*` ‏(6 متغيرات)، و`BIFROST_*` ‏(4 متغيرات).                                                                                                                                                                       |
| `docs/reference/ENVIRONMENT.md`                      | +6 صفوف في القسم 25 لمتغيرات البيئة `QDRANT_*`.                                                                                                                                                                                      |
| `src/lib/memory/qdrant.ts`                           | +33 سطرًا: سلسلة قيم احتياطية لمتغيرات البيئة (الإعدادات ← البيئة ← القيمة الافتراضية) لـ `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 سطرًا: 9 حالات اختبار جديدة لتثبيت أسبقية القيم الاحتياطية لمتغيرات البيئة.                                                                                                                                                      |
| `docs/architecture/cluster-decisions.md` (هذا الملف) | جديد — سجل قرارات لملفات التعريف الاختيارية.                                                                                                                                                                                         |
| `AGENTS.md`                                          | +1 سطر: مؤشر إلى هذا المستند في جدول الوثائق المرجعية.                                                                                                                                                                               |

**صافي الشيفرة المتأثرة:** 4 ملفات إنتاج (`docker-compose.yml`، و`qdrant.ts`، و`.env.example`، و`ENVIRONMENT.md`)، وملف اختبار واحد (`qdrant-wiring.test.ts`)، وملفا توثيق (`cluster-decisions.md`، و`AGENTS.md`).
