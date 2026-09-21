# OmniRoute A2A Server Documentation (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> پروتکل Agent-to-Agent نسخه 0.3 — OmniRoute بهعنوان یک عامل مسیریابی هوشمند

سطح A2A دو رابط دارد:

- **JSON-RPC 2.0** در `POST /a2a` (نقطه ورود استاندارد که در `src/app/a2a/route.ts` تعریف شده است).
- **REST** در مسیر `/api/a2a/*` برای داشبوردها و ابزارها (وضعیت، فهرست وظایف و لغو).

وظایف توسط `A2ATaskManager` مدیریت میشوند (`src/lib/a2a/taskManager.ts`، با TTL پیشفرض ۵ دقیقه). مهارتها از طریق `A2A_SKILL_HANDLERS` در `src/lib/a2a/taskExecution.ts` هدایت میشوند.

## کشف عامل

```bash
curl http://localhost:20128/.well-known/agent.json
```

کارت عامل را برمیگرداند که قابلیتها، مهارتها و الزامات احراز هویت OmniRoute را توصیف میکند.

فیلد `version` در کارت عامل از `process.env.npm_package_version` گرفته میشود (نگاه کنید به `src/app/.well-known/agent.json/route.ts:13`)؛ بنابراین در هر انتشار، بهطور خودکار با `package.json` همگام باقی میماند.

---

## احراز هویت

تمام درخواستهای `/a2a` به یک کلید API از طریق هدر `Authorization` نیاز دارند:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

اگر هیچ کلید API روی سرور پیکربندی نشده باشد، احراز هویت نادیده گرفته میشود.

## فعالسازی

A2A از طریق کلید **Endpoints → A2A** کنترل میشود و بهطور پیشفرض غیرفعال است. هنگامی که غیرفعال باشد،
`GET /api/a2a/status` مقادیر `status: "disabled"` و `online: false` را گزارش میکند؛ فراخوانیهای JSON-RPC به
`POST /a2a` نیز HTTP 503 را همراه با کد خطای JSON-RPC برابر با `-32000` برمیگردانند.

---

## متدهای JSON-RPC 2.0

### `message/send` — اجرای همگام

پیامی را به یک مهارت ارسال میکند و تا دریافت پاسخ کامل منتظر میماند.

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

**پاسخ:**

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

### `message/stream` — استریم SSE

مانند `message/send` عمل میکند، اما برای استریم بلادرنگ، رویدادهای ارسالشده از سوی سرور را برمیگرداند.

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

**رویدادهای SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — استعلام وضعیت وظیفه

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — لغو یک وظیفه

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## مهارتهای موجود

OmniRoute شش مهارت A2A را ارائه میکند که در `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` متصل شدهاند. هر ماژول مهارت در `src/lib/a2a/skills/` قرار دارد.

| مهارت           | شناسه                | توضیحات                                                                                                                                                                | برچسبها                | مثالها                                          |
| :-------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :---------------------------------------------- |
| مسیریابی هوشمند | `smart-routing`      | یک درخواست را با استفاده از موتور ترکیب و امتیازدهی OmniRoute، از طریق ارائهدهنده/ترکیب بهینه مسیریابی میکند                                                           | مسیریابی، ارائهدهندگان | «این درخواست را از طریق بهترین مدل مسیریابی کن» |
| مدیریت سهمیه    | `quota-management`   | وضعیت سهمیه هر ارائهدهنده را گزارش میکند و به فراخوانندگان کمک میکند درباره محدودسازی نرخ/تعویض ارائهدهنده تصمیم بگیرند                                                | سهمیه، ارائهدهندگان    | «سهمیه anthropic را بررسی کن»                   |
| کشف ارائهدهنده  | `provider-discovery` | ارائهدهندگان نصبشده را همراه با قابلیتها، وضعیت طرح رایگان و وضعیت OAuth فهرست میکند                                                                                   | ارائهدهندگان، کشف      | «چه ارائهدهندگانی موجود هستند؟»                 |
| تحلیل هزینه     | `cost-analysis`      | هزینه یک درخواست/گفتوگو را بر اساس کاتالوگ و میزان استفاده اخیر تخمین میزند                                                                                            | هزینه، استفاده         | «هزینه این گفتوگو را تخمین بزن»                 |
| گزارش سلامت     | `health-report`      | وضعیت قطعکننده مدار، دوره انتظار و قفلشدگی را برای هر ارائهدهنده تجمیع میکند                                                                                           | سلامت، تابآوری         | «وضعیت سلامت همه ارائهدهندگان را نشان بده»      |
| فهرست قابلیتها  | `list-capabilities`  | کاتالوگ کامل 45 موردی Agent Skills ‏(23 مورد API،‏ 21 مورد CLI و 1 مورد پیکربندی) را بهصورت یک جدول markdown همراه با URLهای خام SKILL.md برای تزریق زمینه بازمیگرداند | کاتالوگ، کشف، مهارتها  | «همه قابلیتهای OmniRoute را فهرست کن»           |

> Agent Card باید با کاتالوگ زنده 352 ارائهدهندهای همگام نگه داشته شود؛ تعداد ارائهدهندگان و فراداده مربوط به رایگان بودن/عدم نیاز به احراز هویت از رجیستری زمان اجرا دریافت میشوند.

### جزئیات مهارت `list-capabilities`

مهارت `list-capabilities` بهویژه برای عاملهای خارجی مفید است که باید پیش از ارسال فراخوانیهای API، امکانات ارائهشده توسط OmniRoute را کشف کنند. این مهارت یک آرتیفکت جدولی ساختیافته در قالب markdown بازمیگرداند:

```
| شناسه | نام | دستهبندی | حوزه | نقاط پایانی/فرمانها | URL خام |
| --- | --- | --- | --- | --- | --- |
| omni-auth | احراز هویت و نشستها | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

هر ردیف شامل ستون `rawUrl` است تا عاملها بتوانند بلافاصله فایل کامل SKILL.md را دریافت کنند. فیلد `metadata.totalSkills` اندازه کاتالوگ را منعکس میکند (امروز 45). پیادهسازی: `src/lib/a2a/skills/listCapabilities.ts`. همچنین [AGENT-SKILLS.md](./AGENT-SKILLS.md) را ببینید.

---

## REST API (کمکی)

نقطهٔ پایانی JSON-RPC در `/a2a`، نقطهٔ ورود اصلی A2A است. نقاط پایانی REST زیر، دسترسی کمکی را برای داشبوردها و ابزارهای خارجی فراهم میکنند:

| نقطهٔ پایانی                 | متد  | توضیحات                                                   | احراز هویت                                         |
| :--------------------------- | :--- | :-------------------------------------------------------- | :------------------------------------------------- |
| `/api/a2a/status`            | GET  | وضعیت سرور، مهارتهای ثبتشده                               | (عمومی)                                            |
| `/api/a2a/tasks`             | GET  | فهرست وظایف با فیلترها                                    | مدیریتی                                            |
| `/api/a2a/tasks/[id]`        | GET  | دریافت وظیفه بر اساس شناسه                                | مدیریتی                                            |
| `/api/a2a/tasks/[id]/cancel` | POST | لغو وظیفهٔ در حال اجرا                                    | مدیریتی                                            |
| `/.well-known/agent.json`    | GET  | کارت عامل (کشف A2A)                                       | (عمومی، با کش 3600 ثانیهای)                        |
| `/api/a2a/tasks`             | POST | واگذاری ورودی به ناوگان OmniConductor (Conductor PRD RF5) | Bearer در برابر `OMNIROUTE_API_KEY` + `a2aEnabled` |

**واگذاری ورودی Conductor (`POST /api/a2a/tasks`):** عاملهای خارجی A2A، کارهای کدنویسی را از طریق OmniRoute به ناوگان OmniConductor واگذار میکنند. بدنه: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — فقط مهارتهای ناوگان Conductor (همانهایی که در کارت عامل اعلام شدهاند) قابل واگذاری هستند؛ `metadata.conductor.repo.url` الزامی است (ناوگان روی مخازن git کار میکند). این مسیر با استفاده از `CONDUCTOR_ORCHESTRATOR_TOKEN` سمت سرور (با `CONDUCTOR_HUB_TOKEN` بهعنوان جایگزین) به `POST /v1/tasks` هاب ترجمه میشود و `201 { conductor_task_id, state: "submitted" }` را برمیگرداند؛ وضعیتهای وظیفه از طریق آینهٔ SSE→A2A (RF1) بازگردانده میشوند و از طریق `GET /api/a2a/tasks?skill=conductor` قابل مشاهده هستند.

---

## افزودن یک مهارت جدید

1. **ایجاد فایل مهارت:** `src/lib/a2a/skills/<your-skill>.ts`

   یک تابع ناهمگام بهشکل `(task: A2ATask) => Promise<{ artifacts, metadata }>` صادر کنید. از ساختار مهارتهای موجود مانند `smartRouting.ts` پیروی کنید.

2. **ثبت کنترلکننده:** در `src/lib/a2a/taskExecution.ts`، یک ورودی به `A2A_SKILL_HANDLERS` اضافه کنید:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...مهارتهای موجود
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **ارائه در کارت عامل:** در `src/app/.well-known/agent.json/route.ts`، موردی را به آرایهٔ `skills` اضافه کنید:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **نوشتن آزمونها:** `tests/unit/a2a-<your-skill>.test.ts`. مسیر موفقیت و مسیر خطا را پوشش دهید.

5. مهارت جدید را در جدول `Available Skills` این فایل **مستند کنید**.

---

## TTL وظیفه

وظایف پس از `ttlMinutes` (بهطور پیشفرض ۵ دقیقه) منقضی میشوند — این مقدار در سازندهٔ `A2ATaskManager` در `src/lib/a2a/taskManager.ts:82` پیکربندی شده است. برای سفارشیسازی، نمونهسازی `A2ATaskManager` را فورک کنید و مقدار متفاوتی به آن بدهید (برای مثال، `new A2ATaskManager(15)` برای TTL پانزدهدقیقهای). یک بازهٔ زمانی پسزمینه هر ۶۰ ثانیه وظایف منقضیشده را پاکسازی میکند.

---

## چرخهٔ حیات وظیفه

```
ارسالشده → در حال انجام → تکمیلشده
                         → ناموفق
                         → لغوشده
```

- وظایف بهطور پیشفرض پس از ۵ دقیقه منقضی میشوند (به [TTL وظیفه](#task-ttl) مراجعه کنید)
- وضعیتهای پایانی: `completed`، `failed`، `cancelled`
- گزارش رویدادها همهٔ انتقالهای وضعیت را ثبت میکند

---

## کدهای خطا

| کد     | معنی                              |
| :----- | :-------------------------------- |
| -32700 | خطای تجزیه (JSON نامعتبر)         |
| -32600 | درخواست نامعتبر / احراز هویت نشده |
| -32601 | متد یا مهارت یافت نشد             |
| -32602 | پارامترهای نامعتبر                |
| -32603 | خطای داخلی                        |
| -32000 | نقطهٔ پایانی A2A غیرفعال است      |

---

## نمونههای یکپارچهسازی

### Python (requests)

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

### TypeScript (fetch)

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
