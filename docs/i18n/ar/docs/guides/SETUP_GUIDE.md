# 📖 Setup Guide — OmniRoute (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> مرجع الإعداد الكامل لـ OmniRoute. للاطلاع على النسخة السريعة، راجع [البدء السريع في README](../README.md#-quick-start).

## جدول المحتويات

- [طرق التثبيت](#install-methods)
- [تهيئة أداة CLI](#cli-tool-configuration)
- [إعداد البروتوكول (MCP + A2A)](#protocol-setup-mcp--a2a)
- [تهيئة المهلة الزمنية](#timeout-configuration)
- [وضع المنافذ المنفصلة](#split-port-mode)
- [Void Linux ‏(xbps-src)](#void-linux-xbps-src-template)
- [إلغاء التثبيت](#uninstalling)

---

## طرق التثبيت

### npm (موصى به)

```bash
npm install -g omniroute
omniroute
```

تُفتح لوحة المعلومات على `http://localhost:20128`، ويكون عنوان URL الأساسي لواجهة API هو `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **مستخدمو pnpm:** يلزم استخدام الخيار `--allow-build` لتمكين نصوص البناء الأصلية الخاصة بـ `better-sqlite3` و`@swc/core`. الأمر `pnpm approve-builds -g` غير مدعوم لعمليات التثبيت العامة على pnpm v11.

### Arch Linux ‏(AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

تُثبّت [حزمة AUR](https://aur.archlinux.org/packages/omniroute-bin) برنامج OmniRoute وتوفّر خدمة مستخدم systemd.

### من المصدر

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **ملاحظة خاصة بـ Windows:** يستخدم OmniRoute افتراضيًا `%APPDATA%\omniroute` عندما لا يكون الدليل القديم `%USERPROFILE%\.omniroute` موجودًا. عيّن `DATA_DIR` لاختيار موقع مختلف لدليل البيانات.

> **ملاحظة:** ينشئ `npm install` ملف `.env` تلقائيًا من `.env.example` عند التشغيل الأول. لن تستبدل عمليات التثبيت اللاحقة ملف `.env` موجودًا، ولذلك تُحفظ التخصيصات. لإعادة إنشائه من القالب، احذف `.env` قبل إعادة التشغيل.

### Docker

راجع [دليل Docker](./DOCKER_GUIDE.md) للحصول على إعداد Docker الكامل، بما في ذلك ملفات تعريف Compose وHTTPS باستخدام Caddy.

### تطبيق سطح المكتب (Electron)

يتضمن OmniRoute غلافًا لسطح المكتب مبنيًا باستخدام Electron 41 وelectron-builder 26.10. النصوص البرمجية المتاحة (في جذر مساحة العمل):

```bash
npm run electron:dev          # تشغيل تطبيق سطح المكتب مع إعادة التحميل الفوري
npm run electron:build        # البناء لنظام التشغيل الحالي (يُكتشف تلقائيًا)
npm run electron:build:win    # مثبّت Windows ‏(NSIS + نسخة محمولة)
npm run electron:build:mac    # macOS ‏(dmg + zip، ‏arm64+x64)
npm run electron:build:linux  # Linux ‏(AppImage + deb + rpm)
npm run electron:smoke:packaged  # اختبار تمهيدي سريع للحزمة المبنية
```

تُرفق إصدارات مثبّتات سطح المكتب بإصدارات GitHub. للاطلاع على شرح متعمق وكامل لـ Electron (التوقيع وجسر IPC والتوزيعات)، راجع [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(أُنشئ في مرحلة لاحقة)_.

### خادم دون واجهة رسومية (CI/الأتمتة)

للإعدادات غير الخاضعة للإشراف (Docker وKubernetes وCI)، استخدم:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

عند دمج ذلك مع متغيرات البيئة (`INITIAL_PASSWORD` و`OMNIROUTE_WS_BRIDGE_SECRET` وغيرها)، يمكنك تشغيل نسخة OmniRoute قابلة للبرمجة بالكامل.

### خيارات CLI

| الأمر                   | الوصف                                                                          |
| ----------------------- | ------------------------------------------------------------------------------ |
| `omniroute`             | بدء الخادم (`PORT=20128`، وAPI ولوحة المعلومات على المنفذ نفسه)                |
| `omniroute setup`       | إعداد موجّه عبر CLI لكلمة المرور ومزوّد الخدمة الأول                           |
| `omniroute doctor`      | تشغيل فحوصات السلامة المحلية دون بدء الخادم                                    |
| `omniroute providers`   | اكتشاف المزوّدين وعرضهم والتحقق منهم واختبارهم من CLI                          |
| `omniroute config`      | تهيئة أداة CLI — عرض الإعدادات والحصول عليها وتعيينها والتحقق منها             |
| `omniroute status`      | لوحة حالة دون اتصال — الإصدار وقاعدة البيانات والأدوات والتهيئة                |
| `omniroute logs`        | بث سجلات الاستخدام من API (يدعم `--follow`)                                    |
| `omniroute update`      | التحقق من تحديثات OmniRoute أو تطبيقها                                         |
| `omniroute provider`    | إدارة اتصالات المزوّدين — الإضافة والعرض والإزالة والاختبار والتعيين الافتراضي |
| `omniroute --port 3000` | تعيين المنفذ الأساسي/منفذ API إلى 3000                                         |
| `omniroute --mcp`       | بدء خادم MCP ‏(نقل stdio)                                                      |
| `omniroute --no-open`   | عدم فتح المتصفح تلقائيًا                                                       |
| `omniroute --help`      | عرض المساعدة                                                                   |

يمكن برمجة الإعداد دون واجهة رسومية باستخدام الخيارات أو متغيرات البيئة:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

شغّل عمليات التشخيص المحلية دون فتح لوحة المعلومات:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

أدِر المزوّدين عبر SSH أو النصوص البرمجية دون فتح لوحة المعلومات:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## تهيئة أداة سطر الأوامر

### 1) ربط المزوّدين وإنشاء مفتاح API

1. افتح لوحة المعلومات ← `Providers` واربط مزوّدًا واحدًا على الأقل (عبر OAuth أو مفتاح API).
2. افتح لوحة المعلومات ← `Endpoints` وأنشئ مفتاح API.
3. (اختياري) افتح لوحة المعلومات ← `Combos` واضبط سلسلة الرجوع الاحتياطية.

### 2) توجيه أداة البرمجة الخاصة بك

```txt
عنوان URL الأساسي: http://localhost:20128/v1
مفتاح API:         [انسخه من صفحة Endpoint]
النموذج:           if/qwen3.8-max-preview (أو أي بادئة مزوّد/نموذج)
```

إذا لم يتمكن محررك من إرسال `Authorization: Bearer ...`، فاستخدم بدلًا من ذلك العنوان الأساسي المتوافق والمضمَّن فيه الرمز:

```txt
عنوان URL الأساسي: http://localhost:20128/api/v1/vscode/YOUR_KEY/
عنوان URL للنماذج: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
عنوان URL للدردشة: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
عنوان URL لوسوم Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

يعمل مع Claude Code وCodex CLI وCursor وCline وOpenClaw وOpenCode وحِزم SDK المتوافقة مع OpenAI.

#### التهيئة التلقائية باستخدام `setup-*`

بدلًا من لصق عنوان URL الأساسي والمفتاح يدويًا، دع OmniRoute يكتب إعدادات كل أداة
من كتالوج النماذج المباشر. أمر واحد لكل أداة:

```bash
omniroute setup-codex        # ملفات تعريف ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (متوافق مع openai)
omniroute setup-cline        # إعدادات Cline CLI وامتداد VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # يطبع خطوات Cursor داخل التطبيق
omniroute setup-roo          # استيراد Roo Code ومؤشر autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json و~/.qwen/.env
```

يقبل كل منها `--remote <url> --api-key <key>` لتهيئة أداة محلية للعمل مع
OmniRoute **بعيد**، بالإضافة إلى `--dry-run` للمعاينة. لتشغيل أداة CLI مع حقن
متغيرات البيئة الصحيحة من دون كتابة أي إعدادات إطلاقًا، استخدم المشغّل العام
`omniroute run <target>` ‏(claude وcodex وaider وgoose وopencode وqwen وgemini)؛
وتظل مشغّلات الأدوات القديمة `omniroute launch` ‏(Claude Code) و
`omniroute launch-codex` ‏(Codex) متاحة.

للاطلاع على الجدول الكامل (ما يكتبه كل أمر، وجميع العلامات، والوضع المحلي مقابل البعيد، واصطلاحات
عنوان URL الأساسي `/v1`)، راجع **[تكاملات CLI](./CLI-INTEGRATIONS.md)**.

للحصول على تفاصيل تهيئة كل أداة (Claude Code وCodex CLI وCursor وCline وOpenClaw وKilo Code وCopilot والمزيد)، راجع **[دليل أدوات CLI](../reference/CLI-TOOLS.md)** المخصص.

---

## إعداد البروتوكولات (MCP + A2A)

### إعداد MCP (بروتوكول سياق النموذج)

ابدأ نقل MCP في وضع stdio:

```bash
omniroute --mcp
```

مسار التحقق الموصى به:

```bash
# 1. ابدأ خادم MCP
omniroute --mcp

# 2. من عميل MCP الخاص بك، استدعِ:
omniroute_get_health        # يجب أن يعيد حالة النظام
omniroute_list_combos       # يجب أن يعيد التركيبات النشطة

# 3. أو شغّل حزمة اختبارات E2E الكاملة:
npm run test:protocols:e2e
```

#### تهيئة عميل MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

أضف ما يلي إلى إعدادات MCP الخاصة بك:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**وثائق MCP الكاملة:** [README لخادم MCP](../../open-sse/mcp-server/README.md) — ‏110 أداة، وإعدادات IDE، وعملاء Python/TS/Go.

### إعداد A2A (بروتوكول وكيل إلى وكيل)

تحقق من بطاقة الوكيل:

```bash
curl http://localhost:20128/.well-known/agent.json
```

أرسل مهمة:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**وثائق A2A الكاملة:** [README لخادم A2A](../../src/lib/a2a/README.md) — ‏JSON-RPC 2.0، والمهارات، والبث، ودورة حياة المهمة.

---

## إعداد المهلات الزمنية

### المهلات الزمنية الأساسية

بالنسبة إلى معظم عمليات النشر، لا تحتاج سوى إلى هذين المتغيرين:

| المتغير                  | القيمة الافتراضية        | الغرض                                                                                                     |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                 | خط الأساس المشترك لمهلة بدء استجابة المصدر، ومهل Undici المخفية، وطلبات بصمة TLS، ومهل طلبات/وكيل جسر API |
| `STREAM_IDLE_TIMEOUT_MS` | يرث `REQUEST_TIMEOUT_MS` | أقصى فاصل زمني بين أجزاء البث قبل أن يوقف OmniRoute بث SSE                                                |

يظل التوافق مع الإصدارات السابقة محفوظًا: تستمر متغيرات المهلة الحالية مثل `FETCH_TIMEOUT_MS` و`API_BRIDGE_PROXY_TIMEOUT_MS` وغيرها من متغيرات المهلة الخاصة بكل طبقة في العمل، وتتجاوز خط الأساس المشترك.

### ملاحظات خاصة بموفّري الخدمة

بالنسبة إلى المصادر المتوافقة مع Claude Code (`anthropic-compatible-cc-*`)، يشتق OmniRoute ترويسة `X-Stainless-Timeout` الصادرة من مهلة الجلب المحددة، بحيث تظل مهل القراءة لدى موفّر الخدمة متوافقة مع إعدادات البيئة لديك.

بالنسبة إلى الوكلاء العكسيين الخارجيين المتوافقين مع Claude Code، يحافظ OmniRoute على مجموعة `anthropic-beta` الافتراضية بإعدادات متحفظة، وعند إبقاء `Client Cache Control` على `Auto`، لا يمرر سوى علامات `cache_control` المقدمة من العميل. فعّل مفتاح "Enable redact-thinking beta" الخاص بكل اتصال فقط عندما يتطلب المصدر تحديدًا تدفقات تفكير Claude المنقحة.

### تجاوزات متقدمة للمهلات الزمنية

| المتغير                                  | القيمة الافتراضية                          | الغرض                                                                    |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | يرث `REQUEST_TIMEOUT_MS`                   | مهلة بدء استجابة المصدر، وتُستخدم حتى وصول ترويسات الاستجابة             |
| `FETCH_HEADERS_TIMEOUT_MS`               | يرث `FETCH_TIMEOUT_MS`                     | الحد الزمني لـ Undici لتلقي ترويسات استجابة المصدر                       |
| `FETCH_BODY_TIMEOUT_MS`                  | يرث `FETCH_TIMEOUT_MS`                     | الحد الزمني لـ Undici بين أجزاء نص استجابة المصدر (`0` يعطّله)           |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | مهلة اتصال TCP في Undici                                                 |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | مهلة مقبس الاتصال المستمر الخامل في Undici                               |
| `TLS_CLIENT_TIMEOUT_MS`                  | يرث `FETCH_TIMEOUT_MS`                     | مهلة طلبات بصمة TLS المُرسلة عبر `wreq-js`                               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | يرث `REQUEST_TIMEOUT_MS` أو `600000`       | مهلة إعادة توجيه الوكيل للمسار `/v1` من منفذ API إلى منفذ لوحة المعلومات |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | مهلة الطلبات الواردة على خادم جسر API                                    |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | مهلة الترويسات الواردة على خادم جسر API                                  |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | مهلة الاتصال المستمر على خادم جسر API                                    |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | مهلة خمول المقبس على خادم جسر API (`0` يعطّلها)                          |

> **ملاحظة:** بالنسبة إلى طلبات البث، لا يغطي `FETCH_TIMEOUT_MS` سوى إعداد الاتصال / انتظار أول استجابة من المصدر. بعد تنشيط البث، لن يوقفه OmniRoute إلا عند حدوث توقف فعلي (`STREAM_IDLE_TIMEOUT_MS`) أو خمول نص الاستجابة في Undici (`FETCH_BODY_TIMEOUT_MS`).

### التوافق مع الوكيل العكسي

إذا كنت تشغّل OmniRoute خلف Nginx أو Caddy أو Cloudflare أو وكيل عكسي آخر، فتأكد أيضًا من أن مهل الوكيل أعلى من مهل البث/الجلب في OmniRoute.

---

## وضع المنافذ المنفصلة

شغّل واجهة API ولوحة التحكم على منافذ منفصلة للسيناريوهات المتقدمة (الوكيل العكسي، وشبكات الحاويات):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# واجهة API:    http://localhost:20128/v1
# لوحة التحكم: http://localhost:20129
```

---

## قالب Void Linux ‏(xbps-src)

يمكن لمستخدمي Void Linux إنشاء حزمة أصلية باستخدام `xbps-src`. احفظ هذه الكتلة باسم `srcpkgs/omniroute/template`:

```bash
# ملف قالب لـ 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# أعد إنشاء المجموع الاختباري لكل إصدار باستخدام:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## إلغاء التثبيت

| الأمر                    | الإجراء                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| `npm run uninstall`      | يزيل تطبيق النظام، لكنه **يحتفظ بقاعدة بياناتك وإعداداتك** في `~/.omniroute`. |
| `npm run uninstall:full` | يزيل التطبيق **ويمحو نهائيًا جميع الإعدادات والمفاتيح وقواعد البيانات**.      |

> للحصول على تعليمات مفصّلة لإلغاء التثبيت عبر جميع الطرق، راجع [UNINSTALL.md](./UNINSTALL.md).
