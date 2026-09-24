# Zed IDE Integration in Docker Environments (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

عندما يعمل OmniRoute داخل Docker، تفشل عملية «الاستيراد من سلسلة مفاتيح Zed» القياسية
لأن الحاوية لا تستطيع الوصول إلى خدمة سلسلة مفاتيح نظام التشغيل المضيف (`libsecret` على Linux،
وKeychain على macOS، وCredential Manager على Windows)، كما أن مجلدات إعدادات Zed الموجودة
على نظام ملفات المضيف لا تكون مرئية داخل الحاوية افتراضيًا.

## لماذا يفشل الاستيراد من سلسلة المفاتيح في Docker

تحدث مشكلتان مانعتان داخل الحاوية:

1. **عزل نظام الملفات** — تبحث `isZedInstalled()` عن `~/.config/zed` ‏(Linux)،
   أو `~/Library/Application Support/Zed` ‏(macOS)، أو المسار المكافئ على Windows. توجد هذه
   المسارات على المضيف ولا تكون متاحة ما لم يتم تركيبها صراحةً كوحدات تخزين.
2. **عزل IPC** — حتى عند تركيب مجلد الإعدادات، تتواصل وحدة `keytar` الأصلية
   مع خدمة سلسلة مفاتيح نظام التشغيل عبر مقبس Unix أو جلسة D-Bus.
   ولا تتم إتاحة أي منهما داخل الحاوية افتراضيًا، لذلك تفشل دائمًا عمليات قراءة بيانات الاعتماد.

يكتشف OmniRoute بيئة Docker عبر طريقتين استدلاليتين:

- وجود `/.dockerenv` (ينشئه برنامج Docker الخفي عند بدء تشغيل الحاوية).
- ظهور السلسلة `docker` في `/proc/1/cgroup` ‏(Linux cgroup v1).

عند تحقق أي من هذين الشرطين، يعيد مسار الاستيراد HTTP 422 مع
`zedDockerEnvironment: true` ورسالة توجهك إلى علامة تبويب الاستيراد اليدوي للرمز المميز.

## استخدام علامة تبويب الاستيراد اليدوي للرمز المميز

1. افتح **لوحة المعلومات ← موفرو الخدمة ← Zed**.
2. تظهر لوحة **الاستيراد اليدوي للرمز المميز** أسفل بطاقة الاستيراد من سلسلة المفاتيح. عندما
   يكتشف OmniRoute وجود Docker، تتوسع هذه اللوحة تلقائيًا بعد أول محاولة فاشلة
   للاستيراد من سلسلة المفاتيح.
3. حدد موفر الخدمة من القائمة المنسدلة (OpenAI أو Anthropic أو Google أو Mistral أو xAI
   أو OpenRouter أو DeepSeek).
4. الصق مفتاح API في حقل كلمة المرور.
5. انقر على **استيراد**.

يُحفظ المفتاح كاتصال جديد بموفر الخدمة بالاسم
`Zed Manual Import (<provider>)`.

## أين يخزن Zed مفاتيح API على المضيف

يخزن Zed مفاتيح موفري خدمات الذكاء الاصطناعي في سلسلة مفاتيح نظام التشغيل تحت أسماء خدمات مثل
`zed-openai` و`ai.zed.openai` و`zed-anthropic` وغيرها. لاستردادها من أجل
الاستيراد اليدوي، ابحث في:

**Linux**

```
~/.config/zed/settings.json
```

يحتوي قسم `language_models` على إعدادات موفري الخدمة. لا تكون المفاتيح المحفوظة في
سلسلة المفاتيح عبر واجهة Zed موجودة كنص صريح في `settings.json`؛ استردها باستخدام
عارض لسلسلة المفاتيح مثل GNOME Keyring / Seahorse، أو عبر تشغيل:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

يمكن العثور على إدخالات سلسلة المفاتيح في **Keychain Access.app** عبر البحث عن `zed`.

## خيار تركيب وحدة تخزين (متقدم)

يمكنك اختياريًا تركيب مجلد إعدادات Zed داخل الحاوية بوضع القراءة فقط.
لا يؤدي ذلك إلى حل مشكلة سلسلة المفاتيح، لكنه قد يكون مفيدًا للميزات المستقبلية التي تقرأ
قيم إعدادات Zed غير السرية (مثل تفضيلات النماذج).

```yaml
# مقتطف من docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # مضيف Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # مضيف macOS (أزل التعليق عن هذا السطر بدلًا من ذلك)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ميزة مستقبلية: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

ملاحظة: لم يُنفذ بعد تجاوز المسار عبر متغير البيئة `ZED_CONFIG_PATH`. يُقدَّم هذا
المقتطف كمرجع عند إضافة هذه الميزة.

## واجهة API للاستيراد اليدوي

يمكن أيضًا استدعاء نقطة نهاية الاستيراد اليدوي مباشرةً:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // اختياري
}
```

عند النجاح، تُرجع:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## استكشاف الأخطاء وإصلاحها

| العَرَض                             | السبب                                      | الحل                                             |
| ----------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`  | التشغيل داخل Docker                        | استخدم علامة تبويب الاستيراد اليدوي للرمز المميز |
| 404 + `zedInstalled: false`         | Zed غير مثبت على المضيف                    | ثبّت Zed أو استخدم الاستيراد اليدوي              |
| 403 + رفض الوصول إلى سلسلة المفاتيح | رفض نظام التشغيل الوصول إلى سلسلة المفاتيح | امنح الإذن في مطالبة نظام التشغيل                |
| 404 + خدمة سلسلة المفاتيح غير متاحة | `libsecret` غير موجودة على Linux           | ثبّت `libsecret-1-dev`                           |
