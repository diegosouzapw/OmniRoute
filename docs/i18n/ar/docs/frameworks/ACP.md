# ACP registry and registered CLI launchers (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

يفصل OmniRoute بين **اكتشاف CLI** و**بروتوكول Agent Client Protocol الأصلي** و**محولات stdio القديمة**. إن العثور على ملف تنفيذي مثبّت لا يثبت مصادقته أو توافقه مع النموذج أو جاهزيته لمعالجة مطالبة.

تستخدم لوحة المعلومات `GET /api/acp/agents` و`POST /api/acp/agents` للجرد وتسجيل الوكلاء المخصصين. هذه مسارات إدارة محلية فقط، وليست API عامة لتشغيل العمليات أو إرسال المطالبات. لا يتحول `AcpManager` الداخلي تلقائيًا إلى موفر HTTP احتياطي.

## العقود المسجّلة

يُعد `config/cli-tools-manifest.json` مصدر الحقيقة لملفات التشغيل التنفيذية المضمنة والوسائط وأوضاع الواجهة الخلفية. يستمد السجل تعريفاته من ذلك البيان. تُخزّن نتائج الاكتشاف مؤقتًا لمدة 60 ثانية.

- `acp`: يشغّل عقد Gemini الأمر `gemini --experimental-acp` ويتواصل باستخدام ACP JSON-RPC المحدد بأسطر جديدة عبر حزمة TypeScript SDK الرسمية.
- `stdio-adapter`: تحتفظ العقود المسجّلة الأخرى بالمحول القديم الذي يستقبل الإدخال المحدد بأسطر جديدة ويُخرج النتائج عبر stdout. تنهي فترة خمول في الإخراج مدتها ثانيتان استجابته.
  لا يشهد هذا المحول **بوجود** دعم ACP أصلي في أدوات CLI هذه.

يوثّق Gemini علامة التشغيل في [مرجع CLI](https://geminicli.com/docs/cli/cli-reference/).
يستخدم العميل [حزمة ACP SDK الرسمية](https://github.com/agentclientprotocol/typescript-sdk)
للتهيئة وإنشاء الجلسات وطلبات المطالبات والإشعارات والإلغاء.

تظل تعريفات الوكلاء المخصصين عقود تشغيل يتحكم فيها المسؤول. يمنح تسجيل ملف تنفيذي ووسائطه تلك العملية امتيازات التنفيذ المحلية لمستخدم الخادم؛ فالتسجيل ليس بيئة معزولة. لا تقبل عمليات التحقق من الإصدار سوى الملف التنفيذي المسجّل وعلامة إصدار معروفة.

## API التشغيل الداخلية

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // مرّر فقط متغيرات الموفّر المعيّنة عمدًا لهذا الوكيل.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "اشرح هذا المشروع", 120_000);
  // استخدم الاستجابة في التطبيق المستدعي.
} finally {
  acpManager.kill(session.id);
}
```

يحلّ `spawn(agentId, options)` الملف التنفيذي والوسائط من التعريف المسجّل. خيارات المستدعي الوحيدة هي `cwd` و`env`؛ ويُرفض التوقيع القديم `spawn(agentId, binary, args, env)` وتجاوز الملفات التنفيذية. لا يدعم هذا المدير عقود تشغيل HTTP.

ترث العملية الفرعية نظام التشغيل والطرفية والإعدادات المحلية وقائمة الشهادات المسموح بها نفسها التي تستخدمها مشغلات CLI. لا تُنسخ أسرار الخادم/الموفّر من البيئة الأصلية. يجب تمرير بيانات الاعتماد التي تحتاج إليها أداة CLI المختارة صراحةً أو توفيرها من خلال المصادقة المحلية الخاصة بأداة CLI نفسها. ومع ذلك، تظل للعملية الفرعية أذونات نظام الملفات الخاصة بالمستخدم المحلي، وقد تقرأ إعداداتها الخاصة.

## دورة الحياة الأصلية والحدود

1. شغّل الملف التنفيذي المسجّل، وهيّئ ACP، وأنشئ جلسة متجذرة في دليل العمل المحدد. للتهيئة حد زمني قدره عشر ثوانٍ.
2. أرسل مطالبة واجمع الإشعارات النصية لتلك الجلسة فقط.
   يكتمل الطلب عند وصول استجابة RPC للمطالبة، وليس بعد فترة من صمت stdout.
3. استخدم مهلة نهائية واحدة للمطالبة، بما في ذلك أي تهيئة غير مكتملة؛ والقيمة الافتراضية هي 120 ثانية. تُرفض المطالبات المتزامنة داخل العملية نفسها.
4. عند انتهاء المهلة الأصلية، حاول تنفيذ `session/cancel` وأنهِ العملية. تتيح نافذة محدودة قدرها 100 ms تفريغ الإشعارات قبل الإنهاء.
5. أغلق حالة النقل وأزل الجلسة عند فشل التهيئة أو إغلاق الاتصال أو خروج العملية أو إنهائها بواسطة المستدعي.

تُرفض طلبات أذونات الأدوات. ولا يُعلَن عن أي إمكانات للعميل تخص نظام الملفات أو الطرفية. لا تعزل هذه القيود الملف التنفيذي للعملية الفرعية نفسه، ولا تحل محل إعدادات التخويل الخاصة بأداة CLI.

يحتفظ كل من النص الأصلي وstdout/stderr القديم بما لا يزيد على 1 MiB من المحارف، مع الاحتفاظ بأحدث إخراج وإضافة إشعار بالاقتطاع. يقتصر إطار نقل أصلي منفرد على 2 MiB من البايتات قبل تحليل SDK. يُعاد ضبط المخازن المؤقتة لكل مطالبة.

يرسل `kill(sessionId)` الإشارة SIGTERM، ثم SIGKILL بعد خمس ثوانٍ إذا لم تخرج العملية. تحرر انتهاءات مهلة المطالبات القديمة المستمعين والمؤقتات، لكنها تترك الجلسة متاحة لمطالبة أخرى؛ ويظل المستدعون مسؤولين عن استدعاء `kill()` أو `killAll()` عند الانتهاء.

## الأحداث والفحص

يصدر المدير أحداث `stdout` و`stderr` و`exit`، ويتضمن كل منها `sessionId`.
يبلغ `sessionError` عن خطأ نقل منقّح. لا يُصدر حدث التوافق `error` إلا عندما يكون لديه مشترك، بحيث لا يؤدي غياب ملف تنفيذي إلى خطأ EventEmitter غير معالج.

- يعيد `getSession(sessionId)` جلسة مُدارة أو `undefined`.
- يستبعد `getActiveSessions()` الجلسات المتوقفة أو التي يجري إيقافها.
- لا يتوفر `sendInput(sessionId, input)` إلا لمحول قديم نشط؛ يرفض ACP الأصلي الإدخال الخام لحماية تدفق JSON-RPC الخاص به.
- ينهي `killAll()` كل جلسة تديرها تلك النسخة.

## حدود التحقق

تغطي التركيبات الحتمية المصافحة الأصلية والإخراج النصي والأذونات المرفوضة والإلغاء والمطالبات المتزامنة وفشل التهيئة وخروج العملية وحدود الإخراج وعزل الأسرار. وتظل حالات انحدار المخازن المؤقتة/المستمعين القديمة الحالية مغطاة. لا تثبت هذه الاختبارات تسجيل دخول فعليًا إلى Gemini أو استدلالًا ناجحًا للموفّر؛ إذ يتطلب ذلك اختبارًا تمهيديًا مخولًا بصورة منفصلة في البيئة المستهدفة.

## الوثائق ذات الصلة

- [بروتوكولات الوكلاء](./AGENT_PROTOCOLS_GUIDE.md)
- [عقود تشغيل CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [أدوات CLI](../reference/CLI-TOOLS.md)
- [خادم A2A](./A2A-SERVER.md)
- [الوكلاء السحابيون](./CLOUD_AGENT.md)
