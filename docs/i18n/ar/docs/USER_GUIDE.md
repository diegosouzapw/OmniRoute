# User Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

الدليل الكامل لتكوين مقدمي الخدمات، وتشمل المجموعات، ودمج أدوات CLI، ونشر OmniRoute.---## Table of Contents

- [نظرة سريعة على التسعير](#- التسعير في لمحة سريعة)
- [حالات الاستخدام](#-حالات الاستخدام)
- [إعداد الموفر](#-إعداد الموفر)
- [تكامل CLI](#-cli-integration)
- [النشر](#-النشر)
- [النماذج التجريبية](#-النماذج التجريبية)
- [الميزات المتقدمة](#-الميزات المتقدمة)---## 💰 Pricing at a Glance

| ايرلندية                           | مقدم                         | التكلفة                | إعادة ضبط الحصص         | الكل لـ                               |
| ---------------------------------- | ---------------------------- | ---------------------- | ----------------------- | ------------------------------------- |
| **💳الإشتراك**                     | كلود كود (برو)               | 20 شهريًا              | 5 ساعات + أسبوعي        | ❤ت بالفعل                             |
|                                    | الدستور الغذائي (زائد / برو) | 20-200 دولار شهريًا    | 5 ساعات + أسبوعي        | مستخدم OpenAI                         |
|                                    | الجوزاء CLI                  | **مجاني**              | 180 ألف/شهر + 1 ألف/يوم | الجميع!                               |
|                                    | جيثب مساعد الطيار            | 10-19 شهريًا           | شهري                    | مستخدمين جيثب                         |
| **🔑 مفتاح واجهة برمجة التطبيقات** | ديب سيك                      | الدفع لكل استخدام      | لا شيء                  | الاستدلال الرخيص                      |
|                                    | جروك                         | الدفع لكل استخدام      | لا شيء                  | الاستدلال فائق السرعة                 |
|                                    | xAI (جروك)                   | الدفع لكل استخدام      | لا شيء                  | جروك 4 منطق                           |
|                                    | ميسترال                      | الدفع لكل استخدام      | لا شيء                  | التطورات التي يكملها الاتحاد الأوروبي |
|                                    | الحيرة                       | الدفع لكل استخدام      | لا شيء                  | البحث المعزز                          |
|                                    | منظمة العفو الدولية          | الدفع لكل استخدام      | لا شيء                  | نماذج مفتوحة المصدر                   |
|                                    | منظمة العفو الدولية للعبة    | الدفع لكل استخدام      | لا شيء                  | صور سريعة موتورز                      |
|                                    | الشيخ                        | الدفع لكل استخدام      | لا شيء                  | السرعة على نطاق الراقة                |
|                                    | كوهير                        | الدفع لكل استخدام      | لا شيء                  | الأمر R+ RAG                          |
|                                    | نفيديا نيم                   | الدفع لكل استخدام      | لا شيء                  | الأشياء                               |
| **💰 رخيص**                        | جي إل إم-4.7                 | 0.6 دولار/1 مليون      | يوميا 10 صباحا          | نسخة للميزانية                        |
|                                    | ميني ماكس M2.1               | 0.2 دولار/1 مليون      | التداول لمدة 5 ساعات    | الخيار الأرخص                         |
|                                    | كيمي ك2                      | 9 دولارات شهريًا مسطحة | 10 مليون رمز/شهر        | حساب التكلفة                          |
| **🆓مجانًا**                       | قدير                         | $0                     | غير محدود               | 8 نماذج مجانية                        |
|                                    | كوين                         | $0                     | غير محدود               | 3 نماذج مجانية                        |
|                                    | كيرو                         | $0                     | غير محدود               | كلود مجاني                            |

**💡 نصيحه العامه:**ابدأ مع Gemini CLI (180 ألف دولار شهريًا) + مجموعة Qoder (مجانية غير محدودة) = تكلفة 0 دولار!---## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**المشكلة:**تنتهي صلاحية الحصة غير المستخدمة، وتحد من المعدل أثناء عملية الترميز```
التحرير والسرد: "تعظيم كلود"

1. cc/clude-opus-4-6 (استخدم الاشتراك بالكامل)
2. glm/glm-4.7 (نسخة احتياطية رخيصة عند انتهاء الحصة)
3. if/kimi-k2-thinking (الاحتياطي المجاني في حالات الطوارئ)

التكلفة الشهرية: 20 دولارًا (اشتراك) + ~ 5 دولارات (احتياطي) = إجمالي 25 دولارًا
مقابل 20 دولارًا + حدود الوصول = الإحباط```

### Case 2: "I want zero cost"

**المشكلة:**لا أستطيع تحمل تكلفة الاشتراكات، وتحتاج إلى ترميز يعتمد على الذكاء الاصطناعي```
Combo: "free-forever"

1. gc/gemini-3-flash (180K free/month)
2. if/kimi-k2-thinking (unlimited free)
3. qw/qwen3-coder-plus (unlimited free)

Monthly cost: $0
Quality: Production-ready models

````

### Case 3: "I need 24/7 coding, no interruptions"

**المشكلة:**المواعيد النهائية، اضطرت إلى التوقف عن العمل```
التحرير والسرد: "دائما على"
  1.cc/كلود-opus-4-6 (أفضل جودة)
  2.cx/gpt-5.2-codex (الاشتراك الثاني)
  3. glm/glm-4.7 (رخيص، يُعاد ضبطه يوميًا)
  4. minimax/MiniMax-M2.1 (الأرخص، إعادة ضبط لمدة 5 ساعات)
  5. if/kimi-k2-thinking (مجاني غير محدود)

النتيجة: 5 طبقات احتياطية = صفر توقف
التكلفة الشهرية: 20-200 دولار (اشتراكات) + 10-20 دولار (احتياطي)```

### Case 4: "I want FREE AI in OpenClaw"

**المشكلة:**تحتاج إلى مساعد الذكاء الاصطناعي في تطبيقات المراسلة، مجانًا تمامًا```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**نصيحة الرأس:**استخدم Opus للمهام المعقدة، وSonnet للسرعة. OmniRoute يتتبع الحصة لكل نموذج!#### OpenAI Codex (Plus/Pro)```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
cx/gpt-5.2-codex
cx/gpt-5.1-codex-max

````

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
````

**أفضل قيمة:**طبقة مجانية كبيرة! استخدم هذا من قبل حتى لا يتطلب الأمر.#### GitHub Copilot```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
gh/gpt-5
gh/claude-4.5-sonnet
gh/gemini-3.1-pro-preview

````

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. قم بالتسجيل: [Zhipu AI](https://open.bigmodel.cn/)
2. احصل على مفتاح API من خطة الترميز
3. لوحة المعلومات → إضافة واجهة برمجة التطبيقات الرئيسية: الموفر: `glm`، واجهة برمجة التطبيقات الرئيسية: `your-key`

**الاستخدام:**`glm/glm-4.7` —**نصيحة الرئيسة:**توفر خطة للأهداف 3× لتغطية 1/7! إعادة ضبط الساعة اليومية 10:00 صباحًا.#### MiniMax M2.1 (5hset, $0.20/1M)

1. قم بالتسجيل: [MiniMax](https://www.minimax.io/)
2. الحصول على مفتاح API → لوحة المعلومات → إضافة مفتاح API

**الاستخدام:**`minimax/MiniMax-M2.1` —**نصيحة الرأس:**الخيار الأرخص للسياق الطويل (مليون رمز)!#### Kimi K2 ($9/شهر ثابت)

1. اشتراك: [Moonshot AI](https://platform.moonshot.ai/)
2. الحصول على مفتاح API → لوحة المعلومات → إضافة مفتاح API

**الاستخدام:**`kimi/kimi-latest` —**نصيحة شاملة:**سعر ثابت دفاع 9 دولارات شهريًا مقابل 10 ملايين رمز مميز = 0.90 دولار أمريكي/التكلفة يريد لمليون واحد!### 🆓 مقدمو الخدمات مجانًا#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
````

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

تحرير `~/.claude/config.json`:`json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "مفتاح واجهة برمجة التطبيقات الخاص بك"
}`

### Codex CLI

````bash
تصدير OPENAI_BASE_URL = "http://localhost:20128"
تصدير OPENAI_API_KEY = "مفتاح واجهة برمجة التطبيقات الخاص بك"
المخطوطة "المطالبة الخاصة بك"```

### OpenClaw

تحرير `~/.openclaw/openclaw.json`:```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
````

**أو استخدام معلومات اللوحة:**أدوات CLI → OpenClaw → تفعيل التشغيل### Cline / متابعة / RooCode```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## النشر

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

يقوم سطر التعديل بتحميل `.env` من `~/.omniroute/.env` أو `./.env`.### VPS Deployment```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start

# Or: pm2 start npm --name omniroute -- start

````

### PM2 Deployment (Low Memory)

بالنسبة لمكان فقدان الوصول العشوائي المحدودة، استخدم خيار الذاكرة:``bash
# بحد 512 ميجابايت (افتراضي)
PM2 ابدأ npm - اسم المسار الشامل - ابدأ

# أو مع حد الذاكرة المخصصة
OMNIROUTE_MEMORY_MB=512 مساءً2 ابدأ npm --اسم المسار الشامل -- ابدأ

# أو باستخدام النظام البيئي.config.js
PM2 ابدأ تشغيل النظام البيئي.config.js```

قم بإنشاء "ecosystem.config.js":```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

بالنسبة للوضع المدمج مع واجهة CLI، راجع قسم Docker في المستند الرئيسي.### Void Linux (xbps-src)

يمكن لمستخدمي Void Linux حزم OmniRoute وتثبيته محليًا باستخدام إطار عمل مشترك متقاطع `xbps-src`. يؤدي هذا إلى رسم إنشاء Node.js المستقل جنبًا إلى جنب مع الارتباطات الأصلية المطلوبة `better-sqlite3`.

<التفاصيل>

<summary><b>عرض قالب xbps-src</b></summary>```bash
# ملف القالب لـ "omniroute"
pkgname=omniroute
الإصدار=3.2.4
المراجعة=1
hostmakedepends = "nodejs python3 make"
يعتمد = "openssl"
short_desc="بوابة الذكاء الاصطناعي العالمية مع التوجيه الذكي لموفري LLM المتعددين"
المشرف = "zenobit <zenobit@disroot.org>"
ترخيص = "معهد ماساتشوستس للتكنولوجيا"
الصفحة الرئيسية = "https://github.com/diegosouzapw/OmniRoute"
distfiles = "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
المجموع الاختباري=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
حسابات النظام = "_omniroute"
omniroute_homedir = "/var/lib/omniroute"
تصدير NODE_ENV = الإنتاج
تصدير npm_config_engine_strict=false
تصدير npm_config_loglevel=خطأ
تصدير npm_config_fund=false
تصدير npm_config_audit=false

دو_بناء () { # تحديد قوس وحدة المعالجة المركزية المستهدف لـ Node-gyp
\_gyp_arch المحلي
الحالة "$XBPS_TARGET_MACHINE" في
aarch64*) \_gyp_arch=arm64 ;;
Armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
إسحاق

    # 1) قم بتثبيت كافة الطلبات – تخطي البرامج النصية
    NODE_ENV=تطوير npm ci --ignore-scripts

    # 2) أنشئ حزمة Next.js المستقلة
    بناء تشغيل npm

    # 3) انسخ الأصول الثابتة إلى قائمة بذاتها
    cp -r .next/static .next/standalone/.next/static
    [ -d عام ] && cp -r public .next/standalone/public || صحيح

    # 4) تجميع الربط الأصلي لـ sqlite3 بشكل أفضل
    local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
    (cdNode_modules/better-sqlite3 && العقدة "$_node_gyp" إعادة البناء --arch="$_gyp_arch")

    # 5) ضع الرابط المترجم في الحزمة المستقلة
    local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
    مكدير -p "$_bs3_release"
    cpNode_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

    # 6) إزالة الحزم الحادة الخاصة بالقوس
    rm -rf .next/standalone/node_modules/@img

    # 7) انسخ عمليات حذف وقت التشغيل pino التي تم حذفها بواسطة التحليل الثابت لـ Next.js:
    لـ _mod في تحذير عملية pino-abstract-transport Split2؛ افعل
    	cp -r "node_modules/$_mod" .next/standalone/node_modules/
    تم

}

دو_شيك () {
اختبار تشغيل npm: الوحدة
}

دو_تثبيت () {
vmkdir usr/lib/omniroute/.next
vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

    # منع إزالة توجيهات تطبيق Next.js الفارغة عن طريق ربط ما بعد التثبيت
    ل _د في \
    	.next/standalone/.next/server/app/dashboard \
    	.next/standalone/.next/server/app/dashboard/settings \
    	.next/standalone/.next/server/app/dashboard/providers؛ افعل
    	المس "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
    تمقطة > "${WRKDIR}/omniroute" <<'EOF'

#!/بن/ش
تصدير بورت = "$ {ميناء: -20128}"
تصدير DATA_DIR = "${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
تصدير APP_LOG_TO_FILE = "${APP_LOG_TO_FILE:-false}"
مكدير -p "${DATA_DIR}"
عقدة exec /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
فبن "${WRKDIR}/omniroute"
}

بوست_تثبيت () {
ترخيص vlicense
}```

</details>

### Environment Variables

| متغير                                   | الافتراضي                                            | الوصف                                                                                                                         |
| --------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `JWT_SECRET`                            | `الطريق الشامل الافتراضي السري تغيير لي`             | سر توقيع JWT (**تغيير في الإنتاج**)                                                                                           |
| `INITIAL_PASSWORD`                      | `123456`                                             | كلمة المرور الأولى لتسجيل الدخول                                                                                              |
| `DATA_DIR`                              | `~/.omniroute`                                       | دليل البيانات (ديسيبل، الاستخدام، السجلات)                                                                                    |
| "ميناء"                                 | الإطار الافتراضي                                     | منفذ الخدمة ('20128` في الأمثلة)                                                                                              |
| "اسم المضيف"                            | الإطار الافتراضي                                     | ربط المضيف (إعدادات Docker الافتراضية هي `0.0.0.0`)                                                                           |
| `NODE_ENV`                              | وقت التشغيل الافتراضي                                | اضبط "الإنتاج" للنشر                                                                                                          |
| `BASE_URL`                              | `http://localhost:20128`                             | عنوان URL الأساسي الداخلي من جانب الخادم                                                                                      |
| `CLOUD_URL`                             | `https://omniroute.dev`                              | عنوان URL الأساسي لنقطة نهاية المزامنة السحابية                                                                               |
| `API_KEY_SECRET`                        | `نقطة النهاية-الوكيل-واجهة برمجة التطبيقات-مفتاح-سر` | سر HMAC لمفاتيح API التي تم إنشاؤها                                                                                           |
| `REQUIRE_API_KEY`                       | `كاذبة`                                              | فرض مفتاح Bearer API على `/v1/*`                                                                                              |
| `ALLOW_API_KEY_REVEAL`                  | `كاذبة`                                              | السماح لـ Api Manager بنسخ مفاتيح API الكاملة عند الطلب                                                                       |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                                 | إيقاع التحديث من جانب الخادم لبيانات حدود الموفر المخزنة مؤقتًا؛ لا تزال أزرار تحديث واجهة المستخدم تؤدي إلى المزامنة اليدوية |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `كاذبة`                                              | تعطيل لقطات SQLite التلقائية قبل الكتابة/الاستيراد/الاستعادة؛ النسخ الاحتياطية اليدوية لا تزال تعمل                           |
| `APP_LOG_TO_FILE`                       | `true`                                               | Enables application and audit log output to disk                                                                              |
| `AUTH_COOKIE_SECURE`                    | `كاذبة`                                              | فرض ملف تعريف ارتباط المصادقة "الآمن" (خلف الوكيل العكسي HTTPS)                                                               |
| `CLOUDFLARED_BIN`                       | غير محدد                                             | استخدم ملفًا ثنائيًا موجودًا `cloudflared` بدلاً من التنزيل المُدار                                                           |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                                              | النقل للأنفاق السريعة المُدارة (`http2` أو `quic` أو `auto`)                                                                  |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                                | الحد الأقصى لكومة Node.js بالميجابايت                                                                                         |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                                 | الحد الأقصى لإدخالات ذاكرة التخزين المؤقت السريعة                                                                             |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                                | الحد الأقصى لإدخالات ذاكرة التخزين المؤقت الدلالية                                                                            | للحصول على مرجع متغير البيئة الكامل، راجع [README](../README.md).--- |

## 📊 Available Models

<التفاصيل>

<summary><b>عرض جميع النماذج المتاحة</b></summary>

**كود كلود (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`، `cc/claude-sonnet-4-5-20250929`، `cc/claude-haiku-4-5-20251001`

**المخطوطة (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`، `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— مجانًا: `gc/gemini-3-flash-preview`، `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`، `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— 0.6 دولار/1 مليون: `glm/glm-4.7`

**MiniMax (`minimax/`)**— 0.2 دولار/1 مليون: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**- مجانًا: `if/kimi-k2-thinking`، `if/qwen3-coder-plus`، `if/deepseek-r1`

**Qwen (`qw/`)**— مجانًا: `qw/qwen3-coder-plus`، `qw/qwen3-coder-flash`

**كيرو (`kr/`)**— مجانًا: `kr/clude-sonnet-4.5`، `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`، `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`، `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`، `xai/grok-4-0709-fast-reasoning`، `xai/grok-code-mini`

**ميسترال (`ميسترال/`)**: `ميسترال/ميسترال-كبير-2501`، `ميسترال/كودسترال-2501`

**الحيرة (`pplx/`)**: `pplx/sonar-pro`، `pplx/sonar`

**معًا AI (`معًا/`)**: `معًا/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**المخ (`المخ/`)**: `المخ/اللاما-3.3-70ب`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

أضف أي معرف نموذج إلى أي مزود دون انتظار تحديث التطبيق:```bash

# Via API

curl -X POST http://localhost:20128/api/provider-models \
 -H "Content-Type: application/json" \
 -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai

# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"

````

أو استخدام معلومات اللوحة:**المزودون → [الموفر] → الارتباطات الارتباطية**.

التعليقات:

- تم إدارة موفري خدمات OpenRouter وOpenAI/Anthropic المتوافقين من**نماذج النماذج**فقط. يمكنك الإضافة اليدوية والاستيراد والنوبات بشكل تلقائي لجميع العناصر الموجودة في نفس قائمة الارتباطات المتاحة، لذلك لا يوجد قسم منفصل للنماذج المخصصة لهؤلاء الموفرين.
- قسم**النماذج المتخصصة**مخصص للموزعين الذين لا يقومون بإدارة المنتجات المقدمة منهم، استيراد النتائج المتاحة للمصممين.### مسارات موفر مخصصة

توجيه الطلبات مباشرة إلى موفر محدد مع التحقق من صحة النموذج:```bash
نشر http://localhost:20128/v1/providers/openai/chat/completions
مشاركة http://localhost:20128/v1/providers/openai/embeddings
نشر http://localhost:20128/v1/providers/fireworks/images/generations```

تتم إضافة بادئة الموفر تلقائيًا في حالة فقدانها. تُرجع النماذج غير المتطابقة "400".### Network Proxy Configuration

```bash
# تعيين الوكيل العالمي
حليقة -X ضع http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type": "http"، "host": "proxy.example.com"، "port": "8080"}}'

# وكيل لكل مزود
حليقة -X ضع http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type": "socks5"، "host": "proxy.example.com"، "port": "1080"}}}'

# اختبار الوكيل
حليقة -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type": "socks5"، "host": "proxy.example.com"، "port": "1080"}}'```

**الأسبقية:**خاص بالمفتاح ← خاص بالسرد والسرد ← خاص بالموفر ← عالمي ← البيئة.### Model Catalog API

```bash
حليقة http://localhost:20128/api/models/catalog```

إرجاع النماذج المجمعة حسب الموفر مع الأنواع (`الدردشة`، و`التضمين`، و`الصورة`).### Cloud Sync

- موفري المزامنة والمجموعات والإعدادات عبر الأجهزة
- مزامنة خلفية تلقائية مع انتهاء المهلة + فشل سريع
- تفضيل `BASE_URL`/`CLOUD_URL` من جانب الخادم في الإنتاج### Cloudflare Quick Tunnel

- متوفر في**Dashboard → Endpoints**لـ Docker وعمليات النشر الأخرى المستضافة ذاتيًا
- إنشاء عنوان URL مؤقت `https://*.trycloudflare.com` يقوم بإعادة التوجيه إلى نقطة النهاية الحالية المتوافقة مع OpenAI `/v1`
- قم أولاً بتمكين عمليات التثبيت `cloudflared` فقط عند الحاجة؛ يتم إعادة التشغيل لاحقًا لإعادة استخدام نفس الملف الثنائي المُدار
- لا تتم استعادة الأنفاق السريعة تلقائيًا بعد إعادة تشغيل OmniRoute أو الحاوية؛ أعد تمكينها من لوحة التحكم عند الحاجة
- عناوين URL للأنفاق سريعة الزوال وتتغير في كل مرة تقوم فيها بإيقاف/بدء تشغيل النفق
- الأنفاق السريعة المدارة هي النقل الافتراضي عبر HTTP/2 لتجنب تحذيرات المخزن المؤقت QUIC UDP المزعجة في الحاويات المقيدة
- قم بتعيين `CLOUDFLARED_PROTOCOL=quic` أو `auto` إذا كنت تريد تجاوز اختيار النقل المُدار
- قم بتعيين `CLOUDFLARED_BIN` إذا كنت تفضل استخدام الملف الثنائي `cloudflared` المثبت مسبقًا بدلاً من التنزيل المُدار### LLM Gateway Intelligence (Phase 9)

-**ذاكرة التخزين المؤقت الدلالية**— ذاكرة تخزين مؤقت تلقائية غير متدفقة، درجة الحرارة = 0 استجابات (تجاوز باستخدام `X-OmniRoute-No-Cache: true`)
-**Request Idempotency**— إلغاء تكرار الطلبات خلال 5 ثوانٍ عبر رأس `Idempotency-Key` أو رأس `X-Request-Id`
-**تتبع التقدم**— الاشتراك في أحداث SSE `الحدث: التقدم` عبر رأس `X-OmniRoute-Progress: true`---

### Translator Playground

الوصول عبر**لوحة المعلومات → المترجم**. تصحيح الأخطاء وتصور كيفية قيام OmniRoute بترجمة طلبات واجهة برمجة التطبيقات (API) بين مقدمي الخدمة.

| الوضع | الغرض |
| ---------------- | -------------------------------------------------------------------------------------- |
|**ساحة اللعب**| حدد تنسيقات المصدر/الهدف، والصق طلبًا، وشاهد المخرجات المترجمة على الفور |
|**اختبار الدردشة**| أرسل رسائل الدردشة المباشرة من خلال الوكيل وافحص دورة الطلب/الاستجابة الكاملة |
|**مقعد الاختبار**| قم بإجراء اختبارات مجمعة عبر مجموعات تنسيقات متعددة للتحقق من صحة الترجمة |
|**مراقبة حية**| شاهد الترجمات في الوقت الفعلي أثناء تدفق الطلبات عبر الوكيل |

**حالات الاستخدام:**

- تصحيح سبب فشل مجموعة محددة من العميل/الموفر
- التحقق من ترجمة علامات التفكير واستدعاءات الأدوات ومطالبات النظام بشكل صحيح
- مقارنة اختلافات التنسيق بين تنسيقات OpenAI وClaude وGemini وResponsions API---

### Routing Strategies

قم بالتكوين عبر**لوحة المعلومات → الإعدادات → التوجيه**.

| استراتيجية | الوصف |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
|**املأ أولا**| يستخدم الحسابات بترتيب الأولوية — يعالج الحساب الأساسي جميع الطلبات حتى تصبح غير متاحة |
|**راوند روبن**| للتنقل عبر جميع الحسابات بحد ثابت قابل للتكوين (الافتراضي: 3 مكالمات لكل حساب) |
|**P2C (قوة الاختيارين)**| يختار حسابين عشوائيين ويوجهك إلى الحساب الأكثر صحة - الأرصدة محملة بالوعي الصحي |
|**عشوائي**| تحديد حساب عشوائيًا لكل طلب باستخدام خلط Fisher-Yates |
|**الأقل استخدامًا**| توجيهات إلى الحساب ذو الطابع الزمني الأقدم `lastUsedAt`، مع توزيع حركة المرور بالتساوي |
|**التكلفة الأمثل**| التوجيهات إلى الحساب ذي أقل قيمة أولوية، مع تحسين موفري الخدمة الأقل تكلفة |#### External Sticky Session Header

بالنسبة لتقارب الجلسة الخارجية (على سبيل المثال، وكلاء Claude Code/Codex خلف الوكلاء العكسيين)، أرسل:```http
X-Session-Id: your-session-key
````

يقبل OmniRoute أيضًا `x_session_id` ويعيد مفتاح الكلام الفعال في `X-OmniRoute-Session-Id`.

إذا كنت تستخدم Nginx وترسل ترويسات على شكل شرطة سفلية، المجاورة بتمكين:`nginx
underscores_in_headers على؛`

#### Wildcard Model Aliases

قم بإنشاء أنماط أحرف البدل لإعادة تعيين أسماء النماذج:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

تدعم أحرف البدل `*` (أي حرف) و`?` (حرف واحد).#### السلاسل الاحتياطية

تحديد الخطوط التقليدية العالمية التي تنطبق على جميع الطلبات:```
السلسلة: الإنتاج الاحتياطي
  1. سم مكعب/كلود-أوبوس-4-6
  2.gh/gpt-5.1-codex
  3.glm/glm-4.7```

---

### Resilience & Circuit Breakers

قم بالتكوين عبر**لوحة المعلومات → الإعدادات → المرونة**.

تطبق OmniRoute المرونة على مستوى المزود من خلال أربعة مكونات:

1.**ملفات تعريف الموفر**— التكوين لكل موفر لـ:
   - عتبة الفشل (كم عدد حالات الفشل قبل الفتح)
   - مدة التهدئة
   - حساسية الكشف عن حد المعدل
   - معلمات التراجع الأسي

2.**حدود المعدل القابلة للتحرير**— الإعدادات الافتراضية على مستوى النظام قابلة للتكوين في لوحة المعلومات:
   -**الطلبات في الدقيقة (RPM)**— الحد الأقصى للطلبات في الدقيقة لكل حساب
   -**الحد الأدنى للوقت بين الطلبات**— الحد الأدنى للفجوة بالمللي ثانية بين الطلبات
   -**الحد الأقصى للطلبات المتزامنة**— الحد الأقصى للطلبات المتزامنة لكل حساب
   - انقر**تحرير**للتعديل، ثم**حفظ**أو**إلغاء**. تستمر القيم عبر واجهة برمجة تطبيقات المرونة.

3.**قاطع الدائرة**— يتتبع حالات الفشل لكل مزود ويفتح الدائرة تلقائيًا عند الوصول إلى الحد الأدنى:
   -**مغلق**(صحي) — تتدفق الطلبات بشكل طبيعي
   -**مفتوح**— تم حظر الموفر مؤقتًا بعد الفشل المتكرر
   -**HALF_OPEN**— اختبار ما إذا كان الموفر قد استعاد عافيته

4.**السياسات والمعرفات المقفلة**— تعرض حالة قاطع الدائرة والمعرفات المقفلة مع إمكانية إلغاء القفل بالقوة.

5.**الاكتشاف التلقائي لحدود المعدل**— يراقب الرؤوس `429` و`إعادة المحاولة بعد` لتجنب الوصول إلى حدود معدل الموفر بشكل استباقي.

**نصيحة احترافية:**استخدم زر**إعادة تعيين الكل**لمسح جميع قواطع الدائرة وفترات التهدئة عندما يتعافى المزود من انقطاع الخدمة.---

### Database Export / Import

إدارة النسخ الاحتياطية لقاعدة البيانات في**لوحة المعلومات → الإعدادات → النظام والتخزين**.

| العمل | الوصف |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|**تصدير قاعدة البيانات**| يقوم بتنزيل قاعدة بيانات SQLite الحالية كملف `.sqlite` |
|**تصدير الكل (.tar.gz)**| تنزيل أرشيف نسخ احتياطي كامل بما في ذلك: قاعدة البيانات، والإعدادات، والمجموعات، واتصالات الموفر (بدون بيانات اعتماد)، وبيانات تعريف مفتاح API |
|**استيراد قاعدة البيانات**| قم بتحميل ملف `.sqlite` ليحل محل قاعدة البيانات الحالية. يتم إنشاء نسخة احتياطية للاستيراد المسبق تلقائيًا ما لم `DISABLE_SQLITE_AUTO_BACKUP=true` |```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
````

**التحقق من صحة الاستيراد:**التحقق من صحة الملف المستورد للتأكد من سلامته (التحقق من صحة الملف المستورد)، والجداول الأساسية (`provider_connections`، و`provider_nodes`، و`combos`، و`api_keys`)، غير (بحد أقصى 100 ميجابايت).

**حالات الاستخدام:**

- رحيل OmniRoute بين الأجهزة
- إنشاء نسخة احتياطية خارجية للتعافي من الكوارث
- مشاركة تلكات بين أعضاء الفريق (تصدير الكل → مشاركة الأرشيف)---### Settings Dashboard

يتم تنظيم إعدادات الصفحات في 6 علامات مخصصة للتخصيص:

| علامة التبويب        | محتويات                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **عام**              | النظام، تحتاج إلى تخزين الأدوات، وعناصر التحكم في الميزات، وإمكانية رؤية الشريط الجانبي لكل العناصر                        |
| **الأمن**            | إعدادات تسجيل الدخول/كلمة المرور، تسجيل الدخول إلى IP، ومصادقة واجهة برمجة التطبيقات لـ `/models`، وحظر الموفر             |
| **التوجيه**          | استراتيجية التوجيه العالمية (6 خيارات)، والأسماء المستعارة لنماذج أحرف البدل، والطرق الاحتياطية، وافتراضيات التحرير والسرد |
| **المرونة**          | ملفات تعريف الموفر، وحدود التصاميم الجميلة للتحرير، وحالة حدود، والسياسات والمعرفات المحجوبة                               |
| **الذكاء الاصطناعي** | الاختيار الاختيار، والحقن القصير الشامل، وذاكرة الإحصائيات للتخزين السريع                                                  |
| **متقدم**            | المهمة الرسمية العالمية (HTTP/SOCKS5)                                                                                      | ---### Costs & Budget Management |

عبر**لوحة التحكم ← الأسعار**.

| علامة التبويب | الحصاد                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| **الميزانية** | قم بتغطية النطاق الأقصى لكل مفتاح API باستخدام القياسات اليومية/الأسبوعية/الشهرية وتتبع الوقت الفعلي |
| **التسعير**   | نموذج عرض وتحرير التسجيلات الرقمية - التكلفة لكل ألف رمز التسجيل/الإخراج لكل تلفزيون                 | ```bash |

# API: تحديد الميزانية

حليقة -X POST http://localhost:20128/api/usage/budget \
 -H "نوع المحتوى: application/json" \
 -d '{"keyId": "key-123"، "الحد": 50.00، "الفترة": "شهريًا"}'

# API: احصل على حالة الميزانية الحالية

حليقة http://localhost:20128/api/usage/budget```

**تتبع التكلفة:**يقوم كل طلب بتسجيل استخدام الرمز المميز وحساب التكلفة باستخدام جدول التسعير. عرض التفاصيل في**لوحة المعلومات → الاستخدام**حسب الموفر والطراز ومفتاح واجهة برمجة التطبيقات.---

### Audio Transcription

يدعم OmniRoute النسخ الصوتي عبر نقطة النهاية المتوافقة مع OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

الموفرون متاحون:**Deepgram**(`deepgram/`)،**AssemblyAI**(`assemblyai/`).

تنسيقات الصوت المدعومة: `mp3`، `wav`، `m4a`، `flac`، `ogg`، `webm`.---### Combo Balancing Strategies

قم بتكوين مجموعة متنوعة في**لوحة المعلومات → المجموعات → إنشاء/تحرير → اختيار**.

| استراتيجية | الوصف |
| ------------------ | ------------------------------------------------------------------------ |
|**جولة روبن**| التفاعل عبر الاتجاهات بالتتابع |
|**الأولوية**| يحاول دائمًا النموذج الأول؛ لا يعود إلا على الخطأ |
|**عشوائي**| اختيار نموذجًا من المجموعة لكل طلب |
|**المولد**| تعتمد المسارات بشكل يتناسب مع الوزن المخصص لكل نموذج |
|**الأقل استخدامًا**| توجيهات إلى النموذج الذي يحتوي على أقل عدد من الطلبات الأخيرة (يستخدم مقاييس التحرير والسرد) |
|**التكلفة المقررة**| الطريق إلى خيارات الخيارات (يستخدم جدول التسعير) |

يمكن ضبط إعدادات التحرير والسرد العام في**لوحة المعلومات → الإعدادات → التوجيه → إعدادات التحرير والسرد الافتراضي**.---### Health Dashboard

عبر**لوحة التحكم → الصحة**. نظرة عامة على صحة النظام في الوقت الحقيقي مع 6 بطاقات:

| بطاقة | ما يظهر |
| --------------------- | ----------------------------------------------------------- |
|**حالة النظام**| وقت التشغيل، الإصدار، استخدام الذاكرة، دليل البيانات |
|**صحة المزود**| حالة فاصل كهربائي لكل الدائرة (مغلق/مفتوح/نصف مفتوح) |
|**حدود التعديل**| لتهدئة بعض التغيير لأي حساب مع الوقت المؤقت |
|**عمليات التأمين العضوي**| تم حظر مقدمي الخدمة مؤقتًا بواسطة شركة التأمين للتأمين |
|**ذاكرة تخزين مؤقت للتوقيع**| إحصائيات إلغاء البيانات المكررة (المفاتيح العضوية، معدل الدخول) |
|**قياس زمن الوصول**| p50/p95/p99 تجميع زمن الوصول لكل حدود |

**نصيحة شاملة:**يتم تحديث صفحة الصحة الطازجة كل 10. استخدم بطاقة القاطع للخدمة المقدمة الذين يستفيدون.---## 🖥️ Desktop Application (Electron)

يسمى OmniRoute كتطبيق سطح المكتب الأصلي لأنظمة التشغيل Windows وmacOS وLinux.### تثبيت```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

المنتج → ``الإلكترون/توزيع الإلكترون/`### الميزات الرئيسية

| غرض                      | الوصف                                                    |
| ------------------------ | -------------------------------------------------------- | ------------------ |
| **جاهزة للخدم**          | وكيلات قبل بدء التشغيل (لا توجد شاشة كافية)              |
| **علبة النظام**          | تصغير إلى المرحاض، تغيير الشراب، والخروج من قائمة الدرج  |
| **إدارة المشاريع**       | تغيير مدير الخادم من الدرج (خادم إعادة التشغيل التلقائي) |
| **سياسة امان المحتوى**   | ليس CSP عبر الحروف اللامكانية                            |
| **مثيل واحد**            | يمكن تشغيل تطبيق واحد فقط في الاستخدام                   |
| **وضع غير متصل بالشبكة** | خادم Next.js المجمع يعمل بدون إنترنت                     | ### متغيرات البيئة |

| فنية                  | افتراضي | الوصف                                         |
| --------------------- | ------- | --------------------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | منفذ الخادم                                   |
| `OMNIROUTE_MEMORY_MB` | `512`   | الحد الأقصى لكومة Node.js (64–16384 ميجابايت) |

📖 التوثيق الكامل: [`electron/README.md`](../electron/README.md)
