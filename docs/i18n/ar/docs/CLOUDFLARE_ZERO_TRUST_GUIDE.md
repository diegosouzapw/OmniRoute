# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

يوثق هذا الدليل المعيار الذهبي للبنية التحتية للشبكة لحماية**OmniRoute**وعرض تطبيقك بشكل آمن على الإنترنت،**دون فتح أي منافذ (Zero Inbound)**.## What was done on your VM?

قمنا بتمكين OmniRoute في وضع**Split-Port**عبر PM2:

-**المنفذ `20128`:**يعمل**فقط على واجهة برمجة التطبيقات**`/v1`. -**المنفذ `20129`:**يعمل**فقط على لوحة المعلومات الإدارية**.

علاوة على ذلك، تتطلب الخدمة الداخلية `REQUIRE_API_KEY=true`، مما يعني أنه لا يمكن لأي وكيل استهلاك نقاط نهاية API دون إرسال "Bearer Token" الشرعي الذي تم إنشاؤه في علامة التبويب API Keys في لوحة المعلومات.

يتيح لنا ذلك إنشاء قاعدتين مستقلتين تمامًا للشبكة. هذا هو المكان الذي يأتي فيه**نفق Cloudflare (cloudflare)**.---

## 1. How to Create the Tunnel in Cloudflare

الأداة المساعدة `cloudflared` مثبتة بالفعل على جهازك. اتبع الخطوات التالية في السحابة:

1. قم بالوصول إلى لوحة معلومات**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. في القائمة اليسرى، انتقل إلى**الشبكات > الأنفاق**.
3. انقر فوق**إضافة نفق**، واختر**Cloudflared**، وقم بتسميته `OmniRoute-VM`.
4. سيتم إنشاء أمر على الشاشة يسمى "تثبيت وتشغيل موصل".**ما عليك سوى نسخ الرمز المميز (السلسلة الطويلة بعد `--token`)**.
5. قم بتسجيل الدخول عبر SSH إلى جهازك الظاهري (أو Proxmox Terminal) وقم بتنفيذ: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

لا يزال على شاشة النفق التي تم إنشاؤها حديثًا، انتقل إلى علامة التبويب**أسماء المضيفين العامة**وأضف**المسارين**، مع الاستفادة من الفصل الذي قمنا به:### Route 1: Secure API (Limited)

-**النطاق الفرعي:**`api` -**النطاق:**`yourglobal.com` (اختر نطاقك الحقيقي) -**نوع الخدمة:**`HTTP` -**URL:**`127.0.0.1:20128` _(منفذ API الداخلي)_### Route 2: Zero Trust Dashboard (Closed)

-**النطاق الفرعي:**`الطريق الشامل` أو `اللوحة` -**النطاق:**`yourglobal.com` -**نوع الخدمة:**`HTTP` -**URL:**`127.0.0.1:20129` _(التطبيق الداخلي/المنفذ المرئي)_

عند هذه النقطة، يتم حل الاتصال "المادي". الآن دعونا نحميها حقًا.---

## 3. Shielding the Dashboard with Zero Trust (Access)

لا توجد كلمة مرور محلية تحمي لوحة المعلومات الخاصة بك بشكل أفضل من إزالة الوصول إليها بالكامل من الإنترنت المفتوح.

1. في لوحة معلومات Zero Trust، انتقل إلى**الوصول > التطبيقات > إضافة تطبيق**.
2. حدد**استضافة ذاتية**.
3. في**اسم التطبيق**، أدخل لوحة OmniRoute.
4. في**مجال التطبيق**، أدخل `omniroute.yourglobal.com` (نفس النطاق الذي استخدمته في "Route 2").
5. انقر**التالي**.
6. في**إجراء القاعدة**، اختر "السماح". بالنسبة لاسم القاعدة، أدخل "المسؤول فقط".
7. في**تضمين**، ضمن القائمة المنسدلة "المحدد"، اختر "رسائل البريد الإلكتروني" واكتب بريدك الإلكتروني، على سبيل المثال "admin@spgeo.com.br".
8. احفظ ("أضف تطبيقًا").

> **ماذا حدث:**إذا حاولت فتح `omniroute.yourglobal.com`، فلن يصل بعد ذلك إلى تطبيق OmniRoute الخاص بك! يتم عرضه على شاشة Cloudflare الأنيقة التي تطلب منك إدخال بريدك الإلكتروني. فقط إذا قمت بكتابة أنت (أو البريد الإلكتروني الذي أدخلته) هناك، فسوف تتلقى رمزًا مؤقتًا مكونًا من 6 أرقام في Outlook/Gmail يفتح النفق إلى المنفذ `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

لا تنطبق لوحة معلومات Zero Trust على مسار واجهة برمجة التطبيقات (`api.yourglobal.com`)، لأنها عبارة عن وصول برمجي عبر أدوات تلقائية (وكلاء) بدون متصفح. لهذا، سوف نستخدم جدار الحماية الرئيسي (WAF) الخاص بـ Cloudflare.

1. قم بالوصول إلى**Normal Cloudflare Dashboard**(dash.cloudflare.com) وانتقل إلى المجال الخاص بك.
2. في القائمة اليسرى، انتقل إلى**Security > WAF > Rate Limiting Rules**.
3. انقر على**إنشاء قاعدة**. 4.**الاسم:**`OmniRoute API Anti-Abuse` 5.**في حالة تطابق الطلبات الواردة...**
   - اختر الحقل: "اسم المضيف".
   - المشغل: "يساوي".
   - القيمة: `api.yourglobal.com`
4. ضمن**بنفس الخصائص:**احتفظ بـ "IP".
5. بالنسبة للحدود (الحد): -**عند تجاوز الطلبات:**`50` -**المدة:**`1 دقيقة`
6. في النهاية، ضمن**الإجراء**: `الحظر` وحدد ما إذا كان الحظر سيستمر لمدة دقيقة واحدة أو ساعة واحدة. 9.**النشر**.

> **ما حدث:**لا يمكن لأي شخص إرسال أكثر من 50 طلبًا في فترة 60 ثانية إلى عنوان URL لواجهة برمجة التطبيقات (API) الخاصة بك. نظرًا لأنك تقوم بتشغيل العديد من الوكلاء والاستهلاك الذي خلفهم يصل بالفعل إلى حدود المعدل ويتتبع الرموز المميزة، فهذا مجرد إجراء في Internet Edge Layer يحمي المثيل الداخلي الخاص بك من الانخفاض بسبب الإجهاد الحراري قبل أن تنخفض حركة المرور إلى النفق.---

## Finalization

1. جهاز VM الخاص بك**لا يحتوي على منافذ مكشوفة**في `/etc/ufw`.
2. يتحدث OmniRoute فقط عن HTTPS الصادر (`cloudflared`) ولا يتلقى TCP مباشرًا من العالم.
3. طلباتك إلى OpenAI مبهمة لأننا قمنا بتكوينها عالميًا للمرور عبر وكيل SOCKS5 (لا تهتم السحابة بـ SOCKS5 لأنه يأتي واردًا).
4. تحتوي لوحة معلومات الويب الخاصة بك على مصادقة ثنائية باستخدام البريد الإلكتروني.
5. واجهة برمجة التطبيقات (API) الخاصة بك محدودة السعر عند الحافة بواسطة Cloudflare وتتاجر فقط بـ Bearer Tokens.
