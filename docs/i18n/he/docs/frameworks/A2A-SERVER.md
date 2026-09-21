# OmniRoute A2A Server Documentation (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> פרוטוקול Agent-to-Agent גרסה v0.3 — ‏OmniRoute כסוכן ניתוב חכם

לממשק A2A יש שני פנים:

- **JSON-RPC 2.0** בכתובת `POST /a2a` (נקודת הכניסה הקנונית, המוגדרת ב־`src/app/a2a/route.ts`).
- **REST** תחת `/api/a2a/*` עבור לוחות מחוונים וכלי עזר (סטטוס, רשימת משימות, ביטול).

המעקב אחר משימות מתבצע באמצעות `A2ATaskManager` ‏(`src/lib/a2a/taskManager.ts`, ברירת המחדל של TTL היא 5 דקות). מיומנויות מועברות לטיפול באמצעות `A2A_SKILL_HANDLERS` בקובץ `src/lib/a2a/taskExecution.ts`.

## גילוי הסוכן

```bash
curl http://localhost:20128/.well-known/agent.json
```

מחזירה את כרטיס הסוכן המתאר את היכולות, המיומנויות ודרישות האימות של OmniRoute.

השדה `version` בכרטיס הסוכן נלקח מתוך `process.env.npm_package_version` (ראו `src/app/.well-known/agent.json/route.ts:13`), ולכן הוא נשאר מסונכרן אוטומטית עם `package.json` בכל גרסה חדשה.

---

## אימות

כל הבקשות אל `/a2a` דורשות מפתח API דרך הכותרת `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

אם לא מוגדר מפתח API בשרת, האימות נעקף.

## הפעלה

A2A נשלט באמצעות המתג **נקודות קצה → A2A** ומושבת כברירת מחדל. כאשר הוא מושבת,
`GET /api/a2a/status` מדווח על `status: "disabled"` ועל `online: false`; קריאות JSON-RPC אל
`POST /a2a` מחזירות HTTP 503 עם קוד השגיאה `-32000` של JSON-RPC.

---

## מתודות JSON-RPC 2.0

### `message/send` — ביצוע סינכרוני

שולחת הודעה למיומנות וממתינה לתגובה המלאה.

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

**תגובה:**

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

### `message/stream` — הזרמת SSE

זהה ל־`message/send`, אך מחזירה אירועים שנשלחים מהשרת לצורך הזרמה בזמן אמת.

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

**אירועי SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — שאילתת סטטוס משימה

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ביטול משימה

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## מיומנויות זמינות

OmniRoute חושפת 6 מיומנויות A2A המחוברות ב-`src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. כל מודול מיומנות נמצא ב-`src/lib/a2a/skills/`.

| מיומנות      | מזהה                 | תיאור                                                                                                                                           | תגיות                   | דוגמאות                                 |
| :----------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :-------------------------------------- |
| ניתוב חכם    | `smart-routing`      | מנתבת הנחיה דרך הספק או השילוב המיטבי באמצעות מנוע השילובים והניקוד של OmniRoute                                                                | ניתוב, ספקים            | "נתב הנחיה זו באמצעות המודל הטוב ביותר" |
| ניהול מכסות  | `quota-management`   | מדווחת על מצב המכסה של כל ספק ומסייעת למשתמשים להחליט מתי להגביל קצב או להחליף ספק                                                              | מכסה, ספקים             | "בדוק את המכסה של anthropic"            |
| גילוי ספקים  | `provider-discovery` | מציגה את הספקים המותקנים, כולל יכולות, סימוני מסלול חינמי וסטטוס OAuth                                                                          | ספקים, גילוי            | "אילו ספקים זמינים?"                    |
| ניתוח עלויות | `cost-analysis`      | מעריכה את העלות של בקשה או שיחה על סמך הקטלוג והשימוש האחרון                                                                                    | עלות, שימוש             | "הערך את העלות של שיחה זו"              |
| דוח תקינות   | `health-report`      | מרכזת את מצבי מפסק הזרם, תקופת הצינון והנעילה עבור כל ספק                                                                                       | תקינות, עמידות          | "הצג את מצב התקינות של כל הספקים"       |
| רשימת יכולות | `list-capabilities`  | מחזירה את קטלוג מיומנויות הסוכן המלא, הכולל 45 רשומות (23 API + 21 CLI + 1 הגדרה), כטבלת markdown עם כתובות URL גולמיות של SKILL.md להזרקת הקשר | קטלוג, גילוי, מיומנויות | "הצג את כל היכולות של OmniRoute"        |

> יש לשמור את כרטיס הסוכן מסונכרן עם הקטלוג הפעיל הכולל 352 ספקים; מספרי הספקים ומטא-נתוני החינמיות או היעדר הצורך באימות מתקבלים ממרשם זמן הריצה.

### פרטי המיומנות `list-capabilities`

המיומנות `list-capabilities` שימושית במיוחד לסוכנים חיצוניים שצריכים לגלות מה OmniRoute חושפת לפני שליחת קריאות API. היא מחזירה ארטיפקט מובנה של טבלת markdown:

```
| מזהה | שם | קטגוריה | תחום | נקודות קצה/פקודות | כתובת URL גולמית |
| --- | --- | --- | --- | --- | --- |
| omni-auth | אימות והפעלות | api | אימות | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

כל שורה כוללת את העמודה `rawUrl`, כדי שסוכנים יוכלו לאחזר מיד את קובץ SKILL.md המלא. השדה `metadata.totalSkills` משקף את גודל הקטלוג (45 כיום). מימוש: `src/lib/a2a/skills/listCapabilities.ts`. ראו גם [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (משני)

נקודת הקצה JSON-RPC‏ `/a2a` היא נקודת הכניסה הקנונית של A2A. נקודות הקצה של REST שלהלן מספקות גישה משנית עבור לוחות מחוונים וכלים חיצוניים:

| נקודת קצה                    | שיטה | תיאור                                              | אימות                                         |
| :--------------------------- | :--- | :------------------------------------------------- | :-------------------------------------------- |
| `/api/a2a/status`            | GET  | מצב השרת, מיומנויות רשומות                         | (ציבורי)                                      |
| `/api/a2a/tasks`             | GET  | הצגת משימות עם מסננים                              | ניהול                                         |
| `/api/a2a/tasks/[id]`        | GET  | קבלת משימה לפי מזהה                                | ניהול                                         |
| `/api/a2a/tasks/[id]/cancel` | POST | ביטול משימה פעילה                                  | ניהול                                         |
| `/.well-known/agent.json`    | GET  | כרטיס סוכן (גילוי A2A)                             | (ציבורי, נשמר במטמון למשך 3600 שניות)         |
| `/api/a2a/tasks`             | POST | האצלה נכנסת לצי OmniConductor‏ (Conductor PRD RF5) | Bearer מול `OMNIROUTE_API_KEY` + `a2aEnabled` |

**האצלת Conductor נכנסת (`POST /api/a2a/tasks`):** סוכני A2A חיצוניים מאצילים עבודת קוד לצי OmniConductor דרך OmniRoute. גוף הבקשה: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ניתן להאציל רק מיומנויות של צי Conductor (אלו שמוכרזות בכרטיס הסוכן); השדה `metadata.conductor.repo.url` הוא חובה (הצי עובד על מאגרי git). הנתיב מתרגם את הבקשה ל-`POST /v1/tasks` של ה-hub באמצעות `CONDUCTOR_ORCHESTRATOR_TOKEN` בצד השרת (עם `CONDUCTOR_HUB_TOKEN` כחלופה), ומחזיר `201 { conductor_task_id, state: "submitted" }`; מצבי המשימה זורמים בחזרה דרך שיקוף SSE→A2A‏ (RF1) וניתן לצפות בהם באמצעות `GET /api/a2a/tasks?skill=conductor`.

---

## הוספת מיומנות חדשה

1. **יצירת קובץ מיומנות:** `src/lib/a2a/skills/<your-skill>.ts`

   יש לייצא פונקציה אסינכרונית `(task: A2ATask) => Promise<{ artifacts, metadata }>`. יש לפעול לפי המבנה של מיומנויות קיימות, כגון `smartRouting.ts`.

2. **רישום המטפל:** בקובץ `src/lib/a2a/taskExecution.ts`, יש להוסיף רשומה אל `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...מיומנויות קיימות
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **חשיפה בכרטיס הסוכן:** בקובץ `src/app/.well-known/agent.json/route.ts`, יש לצרף למערך `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **כתיבת בדיקות:** `tests/unit/a2a-<your-skill>.test.ts`. יש לכסות את התרחיש התקין ואת תרחיש השגיאה.

5. **תיעוד** המיומנות החדשה בטבלה `Available Skills` שבקובץ זה.

---

## זמן חיות של משימה (TTL)

תוקף המשימות פג לאחר `ttlMinutes` (ברירת המחדל היא 5 דקות) — מוגדר בבנאי `A2ATaskManager` שבקובץ `src/lib/a2a/taskManager.ts:82`. להתאמה אישית, צרו פיצול של יצירת המופע `A2ATaskManager` והעבירו ערך אחר (למשל, `new A2ATaskManager(15)` עבור TTL של 15 דקות). תהליך רקע סורק משימות שתוקפן פג מדי 60 שניות.

---

## מחזור חיי משימה

```
הוגשה → בעבודה → הושלמה
                 → נכשלה
                 → בוטלה
```

- תוקף המשימות פג לאחר 5 דקות כברירת מחדל (ראו [זמן חיות של משימה (TTL)](#task-ttl))
- מצבים סופיים: `completed`, `failed`, `cancelled`
- יומן האירועים עוקב אחר כל מעבר בין מצבים

---

## קודי שגיאה

| קוד    | משמעות                     |
| :----- | :------------------------- |
| -32700 | שגיאת ניתוח (JSON לא תקין) |
| -32600 | בקשה לא תקינה / ללא הרשאה  |
| -32601 | השיטה או המיומנות לא נמצאו |
| -32602 | פרמטרים לא תקינים          |
| -32603 | שגיאה פנימית               |
| -32000 | נקודת הקצה של A2A מושבתת   |

---

## דוגמאות לשילוב

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
