# Termux Headless Setup (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

يمكن تشغيل OmniRoute كخادم دون واجهة رسومية على Android من خلال Termux. تطبيق Electron لسطح المكتب غير مدعوم في Termux، لكن لوحة تحكم الويب وواجهة API المتوافقة مع OpenAI تعملان من المتصفح المحلي أو من أجهزة أخرى على الشبكة نفسها.

## المتطلبات الأساسية

ثبّت Termux من F-Droid أو من إصدارات GitHub، ثم حدّث الحزم وثبّت أدوات البناء التي تتطلبها الاعتماديات الأصلية مثل `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **إصدار Node.js:** يتطلب OmniRoute إصدار Node ضمن النطاق `>=22.22.2 <23 || >=24.0.0 <27` (وهو ما يطابق `engines` في `package.json` / `SUPPORTED_NODE_RANGE`). عادةً ما تتضمن حزمة `nodejs-lts` في Termux إصدار Node 20 LTS، الذي **لم يعد مدعومًا** — ثبّت `pkg install nodejs` (الإصدار الحالي) بدلًا منه، وتحقق من أن `node --version` يعرض إصدارًا من سلسلة 22.x/24.x أو أحدث.

إذا فشل تجميع إحدى الحزم الأصلية، فأعد تشغيل أمر `pkg install` أعلاه، ثم أعد محاولة تثبيت OmniRoute.

## التثبيت

شغّل أحدث حزمة منشورة مباشرةً:

```bash
npx -y omniroute@latest
```

يمكنك أيضًا تثبيتها بشكل عام:

```bash
npm install -g omniroute
omniroute
```

## التشغيل

شغّل OmniRoute في وضع الخادم دون واجهة رسومية:

```bash
omniroute
```

أو:

```bash
npx omniroute
```

تستمع لوحة التحكم على:

```text
http://localhost:20128
```

افتح عنوان URL هذا في متصفح Android. إذا كنت تشغّل العملاء داخل Termux، فاستخدم المضيف والمنفذ نفسيهما كعنوان URL أساسي متوافق مع OpenAI.

## التشغيل في الخلفية

لتشغيل عملية بسيطة في الخلفية:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

لإيقافها:

```bash
pkill -f omniroute
```

لبدء التشغيل تلقائيًا بعد إقلاع الجهاز، ثبّت إضافة Termux:Boot وأنشئ برنامجًا نصيًا للإقلاع:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

قد تؤدي ميزة تحسين البطارية في Android إلى إيقاف عمليات الخلفية طويلة التشغيل. عطّل تحسين البطارية لتطبيق Termux إذا كان من المتوقع أن يظل الخادم متصلًا.

## الوصول من أجهزة أخرى

اعثر على عنوان IP الخاص بالهاتف على شبكة WiFi:

```bash
ip addr show wlan0
```

ثم افتح لوحة التحكم من جهاز آخر:

```text
http://PHONE_IP:20128
```

على سبيل المثال:

```text
http://192.168.1.50:20128
```

أبقِ الهاتف والعميل على الشبكة الموثوقة نفسها. إذا أتحت OmniRoute للوصول من خارج الهاتف، ففعّل مفاتيح API ومصادقة لوحة التحكم.

## دليل البيانات

يخزّن OmniRoute البيانات افتراضيًا ضمن دليل Termux الرئيسي، باتباع سلوك مسار البيانات نفسه المستخدم على جانب الخادم في Linux. لوضع قاعدة البيانات في موقع محدد صراحةً:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## القيود

- لا يعمل Electron في Termux.
- لا توجد علبة نظام أو إمكانية تكامل مع سطح المكتب.
- هذا الإعداد مخصص للخادم فقط: استخدم لوحة التحكم عبر المتصفح.
- قد تتطلب الاعتماديات الأصلية تجميعًا محليًا.
- قد تحتاج أجهزة Android ذات الذاكرة المنخفضة إلى عدد أقل من الطلبات المتزامنة.
- قد تتطلب ميزات شهادات MITM/النظام العمل على مخزن الثقة على مستوى Android من خارج Termux.

## استكشاف الأخطاء وإصلاحها

### منصة غير مدعومة: android (يعيد كل طلب HTTP 500)

**العَرَض:** يطبع `omniroute` / `omniroute serve` الرسالة `✔ OmniRoute is running!`، لكن كل طلب إلى لوحة التحكم أو API يعيد استجابة `500 Internal Server Error` مجردة. يظل `~/.omniroute/logs/application/app.log` فارغًا، ولا يطبع `APP_LOG_LEVEL=debug` أي معلومات مفيدة، ويكون نص الاستجابة نصًا عاديًا (`Internal Server Error`) من دون تفاصيل JSON.

**السبب:** تعرض بعض إصدارات Termux/Node القيمة `process.platform === "android"`. لا تتعامل الدالة `getCacheDirectory()` في Next.js مع هذه المنصة: فهي تتطلب أن يكون `~/.cache` (أو دليل tmp عام) موجودًا _مسبقًا_، وإلا تفشل أثناء تحميل رابط instrumentation مع:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

لأن الرابط لا يُحمّل مطلقًا، لا يبدأ التسجيل — ما يجعل الخطأ 500 يبدو غير قابل للتشخيص تمامًا. ينشئ OmniRoute المسار `~/.cache` (ويضبط `XDG_CACHE_HOME` عندما لا يكون مضبوطًا) عند نقطة دخول CLI قبل بدء Next.js، لكي ينجح هذا الفحص على Android/Termux.

**الحل المدعوم (من دون تعديل الحزمة):**

```bash
mkdir -p ~/.cache
omniroute serve
```

في إصدارات OmniRoute الحالية، تنفذ CLI هذه الخطوة تلقائيًا على Android/Termux — لذلك لا يُفترض أن يتطلب تثبيت جديد عبر `npx -y omniroute@latest` / التثبيت العام هذه الخطوة اليدوية. إذا استمر ظهور الخطأ بعد الترقية، فأنشئ `~/.cache` مرة واحدة كما هو موضح أعلاه، ثم أعد التشغيل.

**لا** تعدّل `dist/server.js` لفرض `process.platform = "linux"`. يُستبدل هذا النوع من تعديلات الحزمة عند كل إعادة تثبيت/ترقية، ولا تكون له ضرورة بعد وجود دليل ذاكرة التخزين المؤقت.

### أخطاء بناء better-sqlite3

ثبّت سلسلة أدوات البناء الخاصة بـ Termux:

```bash
pkg install nodejs python build-essential
```

ثم أعد تشغيل:

```bash
npx -y omniroute@latest
```

### المنفذ مستخدم بالفعل

تحقق مما يستمع على المنفذ الافتراضي:

```bash
ss -ltnp | grep 20128
```

أوقف العملية القديمة:

```bash
pkill -f omniroute
```

### تعذر الوصول إلى لوحة التحكم من جهاز آخر

تحقق من أن كلا الجهازين متصلان بشبكة WiFi نفسها، ثم اختبر من Termux:

```bash
curl http://localhost:20128
```

إذا كان الوصول المحلي يعمل، لكن الوصول عبر LAN لا يعمل، فتحقق من عزل نقطة اتصال Android/WiFi ومن أي ملف تعريف لجدار الحماية أو VPN على الهاتف.
