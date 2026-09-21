# Developer environment notes (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

تشرح هذه الصفحة سلوك ملف `.env` المحلي في المشروع وكيفية التعامل مع ملفات البيئة والأسرار عند تطوير OmniRoute.

## سلوك .env أثناء postinstall

قد ينشئ المشروع ملف `.env` محليًا أثناء `npm install` / `postinstall` لتسهيل عمل المطورين. هذا الملف مخصص للتطوير والاختبار المحليين فقط، ويجب عدم إيداعه مطلقًا في نظام التحكم في الإصدارات.

النقاط الرئيسية:

- يتجاهل ملف `.gitignore` في المستودع بالفعل ملفات `.env*` (راجع الإدخال في `.gitignore`). لا تُزل هذه القاعدة أو تعدّلها إلا إذا كنت تقصد عمدًا إيداع ملف مثال محدد ولديك عملية موثقة لذلك.
- إذا تم إيداع سر حقيقي في المستودع عن طريق الخطأ، فدوّر بيانات الاعتماد أو ألغِها فورًا، وأزلها من سجل المستودع (على سبيل المثال، باستخدام `git filter-repo` أو سير عمل معالجة مكافئ). تواصل مع المسؤول عن الأمان أو جهة الاتصال إذا كنت بحاجة إلى مساعدة.
- بالنسبة إلى CI وبيئات الإنتاج، استخدم أسرار CI أو مدير أسرار (GitHub Actions Secrets أو Azure Key Vault أو HashiCorp Vault، وما إلى ذلك) بدلًا من إيداع الأسرار في الملفات.

## سير العمل المحلي الموصى به

- احتفظ بملف `.env` في مساحة العمل المحلية فقط. استخدم `.env.example` (المتتبّع بالفعل) لتوثيق المتغيرات المطلوبة وقيم الأمثلة المقبولة.
- عند تشغيل اختبارات محليًا تتطلب قيمًا شبيهة بالأسرار، فضّل العناصر النائبة الاصطناعية أو المفاتيح المؤقتة التي تُنشأ في وقت التشغيل بدلًا من بيانات الاعتماد الحقيقية.
- أضف تعليقًا موجزًا في الاختبارات التي تستخدم عناصر نائبة حتى يفهم المراجعون أن بيانات الاختبار اصطناعية.

## ملاحظات حول أدوات الفحص

- قد تحتوي بعض الأصول المترجمة أو الثنائية (مثل كتل WASM المضمّنة والمرمّزة بصيغة base64) على سلاسل ASCII فرعية تبدو كبيانات اعتماد، وقد تؤدي إلى إطلاق تنبيهات أدوات فحص الأسرار النصية. إذا كانت هذه الأصول مشروعة، فأضفها إلى قائمة السماح الخاصة بأداة الفحص أو استبعد الأدلة من إعدادات أداة الفحص.

## إذا اكتشفت تسرّبًا

1. دوّر المفتاح أو ألغِه فورًا.
2. أزل السر من السجل، وادفع الفرع المنقّح قسرًا إذا لزم الأمر.
3. أخطر المشرفين واتبع قائمة التحقق الخاصة بالاستجابة للحوادث في مؤسستك.
