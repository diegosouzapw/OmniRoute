# Tunnels Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **مصدر الحقيقة:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`، و`src/app/api/tunnels/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يمكن لـ OmniRoute إتاحة خادمه المحلي (`http://localhost:20128`) على شبكة
الإنترنت العامة عبر ثلاث خلفيات للأنفاق. يفيد ذلك في:

- استدعاءات OAuth من موفّري الخدمات السحابية (Antigravity وGemini وCursor) التي تحتاج إلى
  عنوان URL لإعادة التوجيه يمكن الوصول إليه علنًا.
- مشاركة مثيلك المحلي مع زملائك في الفريق دون نشر آلة افتراضية.
- الاختبار عبر الأجهزة المحمولة أو عن بُعد أو بين شبكات مختلفة.

تُدار الخلفيات الثلاث جميعها داخل العملية — إذ يبدأ OmniRoute البرنامج الثنائي
أو SDK الأساسي ويوقفه من لوحة المعلومات أو REST API. ولا يلزم إعداد وكيل عكسي أو
systemd.

## نظرة سريعة على الخلفيات

| الخلفية                     | الاستمرارية                                | التكلفة                | الإعداد                                         |
| --------------------------- | ------------------------------------------ | ---------------------- | ----------------------------------------------- |
| **Cloudflare Quick Tunnel** | مؤقتة (يتغير عنوان URL عند كل إعادة تشغيل) | مجاني                  | لا شيء — يثبّت `cloudflared` تلقائيًا           |
| **ngrok**                   | ثابتة عند إعداد خطة مدفوعة أو نطاق ثابت    | فئة مجانية + مدفوعة    | يتطلب حساب ngrok ورمز authtoken                 |
| **Tailscale Funnel**        | ثابتة لكل عقدة ضمن tailnet الخاصة بك       | مجاني للاستخدام الشخصي | يتطلب تثبيت Tailscale وتسجيل الدخول وFunnel ACL |

توجد عمليات التنفيذ في `src/lib/cloudflaredTunnel.ts`
و`src/lib/ngrokTunnel.ts` و`src/lib/tailscaleTunnel.ts`. تعيد الخلفيات الثلاث جميعها
كائن `status` ذا بنية موحّدة، يحتوي على الحقول `phase` و`running` و`publicUrl` و`apiUrl`
و`targetUrl` و`lastError`، بحيث تتمكن لوحة المعلومات من عرضها بصورة موحّدة.

## 1. نفق Cloudflare (النفق السريع + النفق المسمّى)

يشغّل `src/lib/cloudflaredTunnel.ts` البرنامج `cloudflared` كعملية فرعية. وهو يدعم
وضعين، يُحدَّد أحدهما بناءً على توفير إعداد لنفق مسمّى من عدمه:

- **النفق السريع (الافتراضي).** يشغّل `cloudflared tunnel --url
http://localhost:<apiPort>` ويستخرج عنوان URL المعيّن بالنمط `*.trycloudflare.com`
  من stdout. تكون عناوين URL مؤقتة وتتغير عند كل إعادة تشغيل.
- **النفق المسمّى (اختياري).** عندما يشير `CLOUDFLARED_CONFIG` إلى ملف
  `config.yml` خاص بـ cloudflared وتتم إدارته محليًا، يشغّل OmniRoute الأمر `cloudflared tunnel --no-autoupdate
--config <path> run`، ما يمنحك **اسم مضيف ثابتًا ومسمّى**. يوفّر ملف الإعداد
  معرّف UUID للنفق و`credentials-file` وتوجيه `ingress`، ولذلك لا يتم تمرير
  `--url` ولا يلزم رمز من لوحة معلومات Zero Trust. يقرأ `run`
  بيانات الاعتماد من المسار المطلق لـ `credentials-file` في ملف الإعداد — ولا حاجة إلى `cert.pem`
  (فهو يُستخدم فقط لإدارة دورة حياة النفق).

السلوكيات الرئيسية:

- **التثبيت التلقائي.** عند الاستخدام لأول مرة، ينزّل OmniRoute أحدث برنامج ثنائي من `cloudflared`
  من إصدارات GitHub الرسمية (يوجد التثبيت المُدار ضمن
  `DATA_DIR/cloudflared/`). ويجري التحقق من SHA256 للأصل المنزّل مقابل
  بيان الإصدار قبل التنفيذ.
- **الإشراف على العملية.** يُحفظ معرّف PID الخاص بـ cloudflared وعنوان URL الذي تم تحديده في
  `quick-tunnel-state.json` حتى تتمكن لوحة المعلومات من استئناف عرض الحالة بعد إعادة التحميل.

### إعداد نفق مسمّى (اسم مضيف ثابت)

1. أنشئ نفقًا مُدارًا محليًا باستخدام cloudflared CLI (مرة واحدة):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. أنشئ ملف `~/.cloudflared/config.yml` يوجّه اسم مضيفك إلى منفذ API المحلي
   الخاص بـ OmniRoute (الافتراضي 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. وجّه OmniRoute إلى ملف الإعداد ثم أعد تشغيل النفق أو شغّله:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # اختياري — يتجاوز اسم المضيف الذي يعرضه OmniRoute؛ وإلا فستُقرأ القيمة من
   # أول قاعدة ingress في ملف الإعداد:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   فعّل النفق بالطريقة نفسها المتبعة مع النفق السريع (عبر REST أو لوحة المعلومات أو CLI
   أدناه). لا يُصدر النفق المسمّى عنوان URL عامًا لاستخراجه، ولذلك يُكتشف
   الاستعداد من اتصال cloudflared المسجّل بالحافة، وتُعرض قيمتا `publicUrl` و`apiUrl`
   من `CLOUDFLARED_HOSTNAME` (أو من اسم المضيف في أول قاعدة ingress بملف الإعداد).

### التفعيل / التعطيل عبر REST

تستخدم نقطة النهاية نص طلب `{action: "enable" | "disable"}`، وليس مساري
`start`/`stop` منفصلين. ويلزم توثيق الإدارة (جلسة مسؤول أو مفتاح API للمسؤول).

```bash
# تفعيل
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# الحالة
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# تعطيل
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

أو عبر لوحة المعلومات: **Settings → Tunnels → Cloudflare**.

### متغيرات البيئة الاختيارية

| المتغير                                              | الغرض                                                                                                                                                            |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | تجاوز مسار الملف التنفيذي. إذا كان معيّنًا وصالحًا، فسيستخدمه OmniRoute بدلًا من تنزيله.                                                                         |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | بروتوكول النقل (الافتراضي `http2`؛ ويتوفر أيضًا `quic` و`auto`).                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | مسار ملف `config.yml` الخاص بـ cloudflared والمدار محليًا. عند تعيينه، يشغّل OmniRoute نفقًا **مُسمّى/دائمًا** (`tunnel --config <path> run`) بدلًا من نفق سريع. |
| `CLOUDFLARED_HOSTNAME`                               | يتجاوز اسم المضيف العام المُبلّغ عنه للنفق المُسمّى (مثل `ai.example.com`). وعند عدم تعيينه، يُقرأ من أول اسم مضيف ضمن `ingress` في ملف الإعداد.                 |

## 2. ngrok

يستخدم `src/lib/ngrokTunnel.ts` **حزمة SDK ‏`@ngrok/ngrok`** (داخل العملية، من دون عملية فرعية لـ CLI). تُستورد الوحدة الأصلية بشكل كسول عند أول تشغيل، كي لا تتسبب المنصات التي لا تتوفر لها ملفات ثنائية مسبقة البناء في تعطّل التطبيق عند الإقلاع.

### المتطلبات الأساسية

1. أنشئ حسابًا في <https://ngrok.com>.
2. انسخ رمز المصادقة الخاص بك من لوحة تحكم ngrok.
3. وفّره بإحدى الطرق التالية:
   - عبر `.env`:‏ `NGROK_AUTHTOKEN=<token>`، أو
   - عبر لوحة التحكم: **الإعدادات → الأنفاق → ngrok**، أو
   - عبر جسم طلب REST (لمرة واحدة):‏ `{"action":"enable","authToken":"<token>"}`.

إذا لم تتم تهيئة أيٍّ منهما، فستُرجع الحالة `phase: "needs_auth"`.

### التمكين / التعطيل عبر REST

```bash
# التمكين (يستخدم NGROK_AUTHTOKEN من البيئة)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# التمكين باستخدام رمز مضمّن
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# الحالة
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# التعطيل
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

تتضمن الاستجابة `publicUrl` المُعيَّن (مثل
`https://abcd-1234.ngrok-free.app`). يجب تهيئة النطاقات المخصصة والمناطق وقواعد السياسات
في لوحة تحكم ngrok — لا يقوم OmniRoute نفسه سوى بتمرير عنوان URL للهدف المحلي
إلى حزمة SDK.

## 3. Tailscale Funnel

ينسّق `src/lib/tailscaleTunnel.ts` أداة CLI ‏`tailscale` الخاصة بالنظام لإتاحة
منفذ API المحلي عبر **Funnel** (آلية الخروج إلى الإنترنت العام في Tailscale لخدمة serve).
وهو يدعم دورة الحياة الكاملة: التثبيت، وتسجيل الدخول، وبدء البرنامج الخفي، والتمكين، والتعطيل.

يستدعي التنفيذ الأمر `tailscale funnel --bg <port>` (وضع الخلفية). ويأخذ
عنوان URL العام الشكل `https://<machine>.<tailnet>.ts.net/`.

### المتطلبات الأساسية

1. ثبّت Tailscale (أو دع OmniRoute يتولى ذلك — راجع نقطة نهاية `install` أدناه).
2. سجّل الدخول (`tailscale login` أو عبر نقطة نهاية `login` الخاصة بـ OmniRoute).
3. فعّل Funnel لشبكة tailnet الخاصة بك في وحدة تحكم إدارة Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

على Linux وmacOS، يتطلب البرنامج الخفي (`tailscaled`) استخدام `sudo` للتحكم به. تقبل
نقاط نهاية POST حقلًا اختياريًا باسم `sudoPassword`، ويُمرَّر إلى
ذاكرة التخزين المؤقت لكلمة مرور MITM في OmniRoute ‏(`getCachedPassword` / `setCachedPassword`) طوال
مدة الاستدعاء. يستخدم Windows تثبيت الخدمة الافتراضي في
`C:\Program Files\Tailscale\tailscale.exe`.

### نقاط نهاية REST

يقدم Tailscale واجهة أوسع من الواجهات الخلفية الأخرى، لأن التثبيت
وتسجيل الدخول والبرنامج الخفي والنفق جوانب منفصلة.

| نقطة النهاية                          | الطريقة | الغرض                                                                              |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`   | حالة النفق المجمّعة (`phase` و`tunnelUrl` و`apiUrl` وما إلى ذلك)                   |
| `/api/tunnels/tailscale/check`        | `GET`   | فحص منخفض المستوى: هل هو مثبّت؟ هل تم تسجيل الدخول؟ هل البرنامج الخفي قيد التشغيل؟ |
| `/api/tunnels/tailscale/install`      | `POST`  | تثبيت Tailscale (أحداث تقدم متدفقة عبر SSE) — Linux/macOS                          |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | بدء `tailscaled` على Linux/macOS                                                   |
| `/api/tunnels/tailscale/login`        | `POST`  | بدء تدفق تسجيل الدخول؛ يُرجع `authUrl` لفتحه في متصفح                              |
| `/api/tunnels/tailscale/enable`       | `POST`  | بدء Funnel لمنفذ API                                                               |
| `/api/tunnels/tailscale/disable`      | `POST`  | إيقاف Funnel                                                                       |

تتطلب جميع نقاط نهاية Tailscale مصادقة الإدارة (راجع `routeUtils.ts ::
requireTailscaleAuth`).

مثال على التمكين:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

إذا لم يكن Funnel مفعّلًا في وحدة تحكم الإدارة، فستتضمن الاستجابة
`funnelNotEnabled: true` بالإضافة إلى `enableUrl` لفتحه في متصفح.

### متغيرات البيئة الاختيارية

| المتغير         | الغرض                                |
| --------------- | ------------------------------------ |
| `TAILSCALE_BIN` | تجاوز مسار الملف الثنائي `tailscale` |

## ملخص نقاط النهاية

| نقطة النهاية                          | الطريقة | النص                                | المصادقة |
| ------------------------------------- | ------- | ----------------------------------- | -------- |
| `/api/tunnels/cloudflared`            | `GET`   | —                                   | الإدارة  |
| `/api/tunnels/cloudflared`            | `POST`  | `{action: "enable" \| "disable"}`   | الإدارة  |
| `/api/tunnels/ngrok`                  | `GET`   | —                                   | الإدارة  |
| `/api/tunnels/ngrok`                  | `POST`  | `{action, authToken?}`              | الإدارة  |
| `/api/tunnels/tailscale`              | `GET`   | —                                   | الإدارة  |
| `/api/tunnels/tailscale/check`        | `GET`   | —                                   | الإدارة  |
| `/api/tunnels/tailscale/install`      | `POST`  | `{sudoPassword?}` (SSE)             | الإدارة  |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `{sudoPassword?}`                   | الإدارة  |
| `/api/tunnels/tailscale/login`        | `POST`  | `{hostname?}`                       | الإدارة  |
| `/api/tunnels/tailscale/enable`       | `POST`  | `{sudoPassword?, hostname?, port?}` | الإدارة  |
| `/api/tunnels/tailscale/disable`      | `POST`  | `{sudoPassword?}`                   | الإدارة  |

لا توجد نقطة نهاية مركزية باسم `/api/settings/tunnels` — فكل واجهة خلفية
مستقلة.

## اعتبارات رد نداء OAuth

عند إتاحة OmniRoute عبر نفق، يجب أن تنشئ لوحة المعلومات وتدفقات OAuth
عناوين URL لرد النداء باستخدام اسم المضيف **العام**، وليس `localhost`. وإلا
فسيعيد موفر OAuth توجيه المستخدم إلى عنوان URL لا تستطيع خوادمه الوصول إليه،
وستفشل المصافحة.

لا تتطلب تعديلات لوحة المعلومات وعمليات حفظ الإعدادات تثبيت اسم مضيف النفق في
`NEXT_PUBLIC_BASE_URL`. ترسل لوحة المعلومات المصادَق عليها طلبات غير آمنة من
المصدر نفسه باستخدام رمز CSRF مرتبط بالجلسة، ولذلك يمكن الاستمرار في استخدام
مضيفي Cloudflare Quick Tunnel المؤقتين لإدارة واجهة المستخدم العادية بعد تسجيل الدخول.

عيّن:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

وأعد تشغيل OmniRoute قبل بدء OAuth. يتغير عنوان URL في Cloudflare Quick
Tunnels المؤقتة بعد كل إعادة تشغيل، لذا يُفضَّل استخدام ngrok مع نطاق محجوز
أو Tailscale Funnel عند استخدام OAuth في بيئة الإنتاج.

## السلامة والمراقبة

تعرض لوحة المعلومات حالة النفق ضمن **الإعدادات ← الأنفاق**:

- الواجهة الخلفية النشطة (أو الواجهات النشطة) وقيمة `phase` الحالية (`stopped`، و`starting`، و`running`،
  و`needs_auth`، و`error`).
- عنوان URL العام الحالي وعنوان URL المشتق لواجهة API (`<publicUrl>/v1`).
- عنوان URL للهدف المحلي الذي يعيد النفق توجيه الحركة إليه.
- آخر رسالة خطأ، إن وُجدت.

للمراقبة البرمجية، استطلع نقاط نهاية `GET` الخاصة بكل واجهة خلفية. يُسمح بتشغيل أكثر
من واجهة خلفية واحدة في الوقت نفسه؛ وسيتتبع OmniRoute كلًا منها
بشكل مستقل.

## استكشاف الأخطاء وإصلاحها

### "لم يُعثر على الملف الثنائي cloudflared"

يحاول OmniRoute إجراء التثبيت تلقائيًا عند الاستخدام الأول. إذا كان التثبيت محظورًا
(بسبب شبكة مقيّدة أو عدم توفر الوصول إلى GitHub)، فنزّل `cloudflared` يدويًا من
<https://github.com/cloudflare/cloudflared/releases> وعيّن
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: يلزم authtoken"

تعني `phase: "needs_auth"` أنه لم يتم العثور على authtoken. عيّن `NGROK_AUTHTOKEN` في
`.env`، أو اضبطه من خلال لوحة المعلومات، أو مرّر `authToken` في نص طلب POST
الخاص بالتمكين.

### "tailscale: لم يتم تمكين Funnel"

عندما تتضمن استجابة التمكين `funnelNotEnabled: true`، فهذا يعني أن Funnel معطّل
لشبكة tailnet الخاصة بك. افتح `enableUrl` المُعاد (أو صفحة الميزة في وحدة تحكم
المشرف) وفعّل Funnel.

### تغييرات عنوان URL للنفق تؤدي إلى تعطّل OAuth

استخدم ngrok مع نطاق محجوز أو Tailscale Funnel (كلاهما ثابت لكل عقدة).
تُعد Cloudflare Quick Tunnels مؤقتة بطبيعتها، ولا يُنصح بها
لردود نداء OAuth طويلة الأمد.

### رفض الإذن على Linux/macOS عند استخدام Tailscale

يحتاج `tailscaled` إلى صلاحيات root. قدّم `sudoPassword` إلى نقطة نهاية POST ذات الصلة،
أو شغّل البرنامج الخفي بنفسك (`sudo systemctl start tailscaled`).

## انظر أيضًا

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — وكيل صادر (1proxy وSOCKS5 وHTTP) لحركة
  البيانات الصادرة.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — القائمة الكاملة لمتغيرات البيئة، بما في ذلك
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md)،
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — بدائل للأنفاق من أجل استضافة عامة
  مستقرة.
- المصدر: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`،
  `src/app/api/tunnels/`.
