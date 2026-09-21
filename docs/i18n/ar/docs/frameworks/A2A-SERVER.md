# OmniRoute A2A Server Documentation (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> بروتوكول Agent-to-Agent الإصدار v0.3 — ‏OmniRoute كوكيل توجيه ذكي

تتكون واجهة A2A من جانبين:

- **JSON-RPC 2.0** عند `POST /a2a` (نقطة الدخول الأساسية، المعرّفة في `src/app/a2a/route.ts`).
- **REST** ضمن `/api/a2a/*` للوحات المعلومات والأدوات (الحالة، وقائمة المهام، والإلغاء).

تُتتبّع المهام بواسطة `A2ATaskManager` (`src/lib/a2a/taskManager.ts`، بمدة TTL افتراضية قدرها 5 دقائق). ويجري توجيه المهارات عبر `A2A_SKILL_HANDLERS` في `src/lib/a2a/taskExecution.ts`.

## اكتشاف الوكيل

```bash
curl http://localhost:20128/.well-known/agent.json
```

يعيد بطاقة الوكيل التي تصف إمكانات OmniRoute ومهاراته ومتطلبات المصادقة الخاصة به.

تُستمد قيمة الحقل `version` في بطاقة الوكيل من `process.env.npm_package_version` (راجع `src/app/.well-known/agent.json/route.ts:13`)، ولذلك تظل متزامنة تلقائيًا مع `package.json` في كل إصدار.

---

## المصادقة

تتطلب جميع طلبات `/a2a` مفتاح API عبر ترويسة `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

إذا لم يُضبط أي مفتاح API على الخادم، فسيجري تجاوز المصادقة.

## التفعيل

يُتحكم في A2A بواسطة مفتاح التبديل **Endpoints → A2A**، وهو معطّل افتراضيًا. عند تعطيله،
يُبلغ `GET /api/a2a/status` عن `status: "disabled"` و`online: false`؛ وتعيد استدعاءات JSON-RPC إلى
`POST /a2a` حالة HTTP 503 مع رمز خطأ JSON-RPC بالقيمة `-32000`.

---

## أساليب JSON-RPC 2.0

### `message/send` — التنفيذ المتزامن

يرسل رسالة إلى مهارة وينتظر الاستجابة الكاملة.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**الاستجابة:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — البث عبر SSE

يماثل `message/send`، لكنه يعيد أحداثًا يرسلها الخادم للبث في الوقت الفعلي.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**أحداث SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — الاستعلام عن حالة المهمة

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — إلغاء مهمة

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## المهارات المتاحة

يوفّر OmniRoute عددًا قدره 6 مهارات A2A مرتبطة في `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. توجد كل وحدة مهارة في `src/lib/a2a/skills/`.

| المهارة          | المعرّف              | الوصف                                                                                                                                                                      | الوسوم                       | أمثلة                              |
| :--------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :--------------------------------- |
| التوجيه الذكي    | `smart-routing`      | يوجّه مطالبة عبر المزوّد/التركيبة المثلى باستخدام محرك التركيبات في OmniRoute مع نظام التقييم                                                                              | التوجيه، المزوّدون           | "وجّه هذه المطالبة عبر أفضل نموذج" |
| إدارة الحصص      | `quota-management`   | يعرض حالة الحصة لكل مزوّد، ويساعد المستدعين على تحديد وقت تقييد المعدل/التبديل                                                                                             | الحصص، المزوّدون             | "تحقق من حصة anthropic"            |
| اكتشاف المزوّدين | `provider-discovery` | يسرد المزوّدين المثبّتين مع الإمكانات، ومؤشرات الطبقة المجانية، وحالة OAuth                                                                                                | المزوّدون، الاكتشاف          | "ما المزوّدون المتاحون؟"           |
| تحليل التكلفة    | `cost-analysis`      | يقدّر تكلفة طلب/محادثة استنادًا إلى الكتالوج والاستخدام الحديث                                                                                                             | التكلفة، الاستخدام           | "قدّر تكلفة هذه المحادثة"          |
| تقرير السلامة    | `health-report`      | يجمع حالة قاطع الدائرة، وفترة التهدئة، والإقفال لكل مزوّد                                                                                                                  | السلامة، المرونة             | "اعرض حالة سلامة جميع المزوّدين"   |
| سرد الإمكانات    | `list-capabilities`  | يعيد كتالوج مهارات الوكيل الكامل المكوّن من 45 إدخالًا (23 لواجهة API و21 لواجهة CLI و1 للإعداد) كجدول markdown يحتوي على عناوين URL خام لملفات SKILL.md من أجل حقن السياق | الكتالوج، الاكتشاف، المهارات | "اسرد جميع إمكانات OmniRoute"      |

> يجب إبقاء بطاقة الوكيل متوافقة مع الكتالوج الفعلي الذي يضم 352 مزوّدًا؛ وتُستمد أعداد المزوّدين والبيانات الوصفية الخاصة بالمجانية/عدم الحاجة إلى المصادقة من سجل وقت التشغيل.

### تفاصيل مهارة `list-capabilities`

تُعد مهارة `list-capabilities` مفيدة بوجه خاص للوكلاء الخارجيين الذين يحتاجون إلى اكتشاف ما يوفّره OmniRoute قبل إرسال استدعاءات API. وهي تعيد عنصرًا منظمًا على هيئة جدول markdown:

```
| المعرّف | الاسم | الفئة | المجال | نقاط النهاية/الأوامر | عنوان URL الخام |
| --- | --- | --- | --- | --- | --- |
| omni-auth | المصادقة والجلسات | api | المصادقة | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

يتضمن كل صف العمود `rawUrl` حتى تتمكن الوكلاء من جلب ملف SKILL.md الكامل فورًا. يعكس الحقل `metadata.totalSkills` حجم الكتالوج (45 حاليًا). التنفيذ: `src/lib/a2a/skills/listCapabilities.ts`. راجع أيضًا [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## واجهة REST API (مساعدة)

نقطة نهاية JSON-RPC‏ `/a2a` هي نقطة الدخول الأساسية لـ A2A. توفّر نقاط نهاية REST أدناه وصولًا مساعدًا للوحات المعلومات والأدوات الخارجية:

| نقطة النهاية                 | الطريقة | الوصف                                                   | المصادقة                                        |
| :--------------------------- | :------ | :------------------------------------------------------ | :---------------------------------------------- |
| `/api/a2a/status`            | GET     | حالة الخادم، والمهارات المسجّلة                         | (عام)                                           |
| `/api/a2a/tasks`             | GET     | سرد المهام باستخدام عوامل التصفية                       | إدارية                                          |
| `/api/a2a/tasks/[id]`        | GET     | الحصول على المهمة حسب المعرّف                           | إدارية                                          |
| `/api/a2a/tasks/[id]/cancel` | POST    | إلغاء مهمة قيد التشغيل                                  | إدارية                                          |
| `/.well-known/agent.json`    | GET     | بطاقة الوكيل (اكتشاف A2A)                               | (عام، مخزّن مؤقتًا لمدة 3600s)                  |
| `/api/a2a/tasks`             | POST    | تفويض وارد إلى أسطول OmniConductor‏ (Conductor PRD RF5) | Bearer مقابل `OMNIROUTE_API_KEY` + `a2aEnabled` |

**تفويض Conductor الوارد (`POST /api/a2a/tasks`):** تفوّض وكلاء A2A الخارجيون أعمال البرمجة إلى أسطول OmniConductor عبر OmniRoute. النص الأساسي: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — لا يمكن تفويض سوى مهارات أسطول Conductor (وهي المهارات المُعلنة في بطاقة الوكيل)؛ والحقل `metadata.conductor.repo.url` مطلوب (يعمل الأسطول على مستودعات git). يُترجم المسار إلى `POST /v1/tasks` الخاص بالمحور باستخدام `CONDUCTOR_ORCHESTRATOR_TOKEN` من جانب الخادم (مع الرجوع إلى `CONDUCTOR_HUB_TOKEN` كخيار بديل)، ويُرجع `201 { conductor_task_id, state: "submitted" }`؛ وتتدفق حالات المهام عائدةً عبر مرآة SSE→A2A‏ (RF1)، ويمكن عرضها عبر `GET /api/a2a/tasks?skill=conductor`.

---

## إضافة مهارة جديدة

1. **أنشئ ملف المهارة:** `src/lib/a2a/skills/<your-skill>.ts`

   صدّر دالة غير متزامنة `(task: A2ATask) => Promise<{ artifacts, metadata }>`. اتبع بنية المهارات الموجودة مثل `smartRouting.ts`.

2. **سجّل المعالج:** في `src/lib/a2a/taskExecution.ts`، أضف إدخالًا إلى `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...المهارات الموجودة
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **أظهرها في بطاقة الوكيل:** في `src/app/.well-known/agent.json/route.ts`، ألحق العنصر التالي بمصفوفة `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **اكتب الاختبارات:** `tests/unit/a2a-<your-skill>.test.ts`. غطِّ مسار النجاح ومسار الخطأ.

5. **وثّق** المهارة الجديدة في جدول `Available Skills` بهذا الملف.

---

## مدة صلاحية المهمة

تنتهي صلاحية المهام بعد `ttlMinutes` (القيمة الافتراضية 5 دقائق) — ويُضبط ذلك في مُنشئ `A2ATaskManager` في `src/lib/a2a/taskManager.ts:82`. للتخصيص، أنشئ نسخة متفرعة من إنشاء `A2ATaskManager` ومرّر قيمة مختلفة (مثلًا، `new A2ATaskManager(15)` لمدة صلاحية تبلغ 15 دقيقة). تفحص عملية دورية في الخلفية المهام منتهية الصلاحية كل 60 ثانية.

---

## دورة حياة المهمة

```
مُرسلة → قيد التنفيذ → مكتملة
                      → فاشلة
                      → ملغاة
```

- تنتهي صلاحية المهام بعد 5 دقائق افتراضيًا (راجع [مدة صلاحية المهمة](#task-ttl))
- الحالات النهائية: `completed`، و`failed`، و`cancelled`
- يتتبع سجل الأحداث كل انتقال بين الحالات

---

## رموز الأخطاء

| الرمز  | المعنى                         |
| :----- | :----------------------------- |
| -32700 | خطأ في التحليل (JSON غير صالح) |
| -32600 | طلب غير صالح / غير مصرّح به    |
| -32601 | الطريقة أو المهارة غير موجودة  |
| -32602 | معاملات غير صالحة              |
| -32603 | خطأ داخلي                      |
| -32000 | نقطة نهاية A2A معطّلة          |

---

## أمثلة التكامل

### Python ‏(requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript ‏(fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
