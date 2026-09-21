# Chaos Mode (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **لوحة التحكم:** **وضع الفوضى** (الشريط الجانبي) → `/dashboard/chaos`  
> **واجهة API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (جلسة لوحة التحكم) · `POST /api/skills/collect/chaos` (مفتاح API)  
> **المصدر:** `src/lib/chaos/chaosExecutor.ts`، `src/lib/chaos/chaosConfig.ts`

يرسل وضع الفوضى **مهمة واحدة إلى عدة مزوّدين في الوقت نفسه** — يساهم كل مزوّد مشارك
بمثيل واحد من نموذج، وتحصل على جميع الإجابات جنبًا إلى جنب (أو على شكل سلسلة). وهو
واجهة تنفيذ متعددة النماذج، وليس استراتيجية توجيه: لا تتأثر به مطلقًا حركة بيانات
`/v1/chat/completions` المعتادة.

**توضيح — توجد ثلاثة أشياء مختلفة تحمل كلمة "chaos" في الاسم:**

| الشيء              | ماهيته                                                                                                                | موضع توثيقه                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **وضع الفوضى**     | صفحة لوحة التحكم + واجهة API الموضحتان هنا: توزيع مهمة واحدة على عدة مزوّدين (بالتوازي أو بصورة تعاونية).             | هذا الدليل                                   |
| `auto/chaos`       | معرّف نموذج Auto-Combo بأوزان تقييم لحقن الأعطال، لاختبار المرونة. لا يتطلب أي إعداد.                                 | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| إعداد مجموعة Chaos | مجموعة محفوظة تستخدم `config.chaos.enabled` لتوزيع المهمة على مجموعة من النماذج مع نموذج تحكيم اختياري (عبر API فقط). | `open-sse/services/autoCombo/chaosEngine.ts` |

## الإعداد

1. افتح **لوحة التحكم → وضع الفوضى** (`/dashboard/chaos`).
2. فعّله — يأتي وضع الفوضى **معطّلًا افتراضيًا** (`enabled: false` في
   `src/lib/chaos/chaosConfig.ts`). عندما يكون معطّلًا، يستجيب `POST /api/chaos/run`
   بالرسالة `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. اختر المشاركين والإعدادات الافتراضية (تُحفَظ لكل مثيل عبر مخزن الإعدادات):

   | الحقل               | المعنى                                                         | القيمة الافتراضية / الحدود        |
   | ------------------- | -------------------------------------------------------------- | --------------------------------- |
   | `enabled`           | مفتاح التشغيل الرئيسي                                          | `false`                           |
   | `defaultMode`       | `parallel` أو `collaborative` (انظر أدناه)                     | `parallel`                        |
   | `providerOverrides` | مشاركة كل مزوّد (`providerId`، و`modelId` اختياري، و`enabled`) | فارغ = كل مزوّد نشط، بحد أقصى 200 |
   | `systemPrompt`      | تجاوز موجّه النظام المضمّن لوضع الفوضى                         | اختياري، بحد أقصى 10 000 حرف      |
   | `timeoutMs`         | أقصى مدة لكل استدعاء نموذج                                     | `120000` (5 000–600 000)          |
   | `maxTokens`         | قيمة `max_tokens` لكل استدعاء نموذج                            | `4096` (256–128 000)              |

4. شغّل **اختبارًا من الصفحة نفسها** — تعرض لوحة النتائج إجابة كل مزوّد
   وحالته ومدته.

## أوضاع التنفيذ

- **`parallel`** — يتلقى كل نموذج المهمة نفسها في الوقت ذاته؛ وتتلقى جميع الإجابات
  بصورة مستقلة.
- **`collaborative`** — تعمل النماذج **في سلسلة**: يرى كل نموذج مخرجات النموذج السابق
  ويُطلب منه تنقيحها أو توسيعها أو نقدها أو تقديم بديل. يدمج حقل `summary` في الاستجابة
  المخرجات الناجحة وفق ترتيب السلسلة (لا تحتوي عمليات التشغيل المتوازية على `summary`).

## واجهة API

### `POST /api/chaos/run` — جلسة لوحة التحكم

تتم المصادقة باستخدام ملفات تعريف الارتباط (جلسة الإدارة — راجع
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md))؛ وتستخدمها صفحة لوحة التحكم.

```jsonc
// نص الطلب
{
  "task": "Compare approaches to X", // مطلوب
  "providers": ["glm", "kimi"], // عامل تصفية اختياري
  "mode": "parallel", // اختياري — يتجاوز defaultMode
  "systemPrompt": "…", // تجاوز اختياري
  "maxTokens": 4096, // تجاوز اختياري
}
```

### `POST /api/skills/collect/chaos` — مفتاح API

نسخة تستخدم رمز Bearer للمتصلين الخارجيين. يجب أن يحمل المفتاح **صلاحية وضع الفوضى**
(`chaosModeEnabled`)، وهي **معطّلة افتراضيًا** — فعّلها لكل مفتاح من
**لوحة التحكم → مدير API → تعديل المفتاح → الصلاحيات → وضع الفوضى**. يستخدم نص الطلب نفسه الوارد أعلاه.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

تعيد نقطتا النهاية البنية نفسها:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // لوضع collaborative فقط
}
```

## استكشاف الأخطاء وإصلاحها

- **`400 Chaos Mode is not enabled`** — راجع الخطوة 2 أعلاه: مفتاح التشغيل العام معطّل.
- **يُرفض مفتاح API عند استخدام `/api/skills/collect/chaos`** — يفتقر المفتاح إلى صلاحية
  `chaosModeEnabled` الخاصة بكل مفتاح (وهي معطّلة افتراضيًا؛ هذا إعداد وليس خطأً).
- **مزوّد توقعت ظهوره غير موجود في النتائج** — تحقق من `providerOverrides` في صفحة
  وضع الفوضى (يؤدي التجاوز المعطّل إلى استبعاده)، وتحقق مما إذا كان اتصال المزوّد
  نشطًا.
