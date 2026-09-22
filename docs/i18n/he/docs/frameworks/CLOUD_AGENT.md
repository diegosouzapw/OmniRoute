# Cloud Agents (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **מקור האמת:** `src/lib/cloudAgent/` ו-`src/app/api/v1/agents/tasks/`
> **עודכן לאחרונה:** 2026-06-28 — v3.8.40 (רענון frontmatter; ארבעה סוכנים, כולל cursor-cloud)

OmniRoute מתזמר סוכני תכנות של צד שלישי המתארחים בענן (Codex Cloud, Cursor,
Devin, Jules) כמשימות ארוכות טווח. כל סוכן נעטף מאחורי ממשק אחיד, כך
שלקוחות יכולים לשלוח הנחיה + כתובת URL של מאגר ולקבל תוצאות בלי להתמודד עם
ממשקי API ייחודיים לספק.

משימה של סוכן ענן היא **לא** השלמת צ'אט רגילה. זוהי יחידת עבודה מתמשכת ורב-שלבית
שעשויה להימשך מדקות ועד שעות, יכולה להפיק בקשת משיכה (Pull Request)
כתוצר שלה, ותומכת בהודעות המשך ובשערי אישור תוכנית (אצל חלק מהספקים).

![מחזור החיים של משימת סוכן ענן](../diagrams/exported/cloud-agent-flow.svg)

> מקור: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## סוכנים נתמכים

| מזהה ספק       | מחלקה              | מקור                                  | כתובת URL בסיסית במעלה                  | אישור תוכנית |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------ |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | כן           |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | כן           |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | לא (אוטומטי) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | לא (אוטומטי) |

מרשם: `src/lib/cloudAgent/registry.ts` — מייצא את `getAgent(providerId)`,
`getAvailableAgents()` ואת `isCloudAgentProvider(providerId)`. המרשם הוא
`Record<string, CloudAgentBase>` פשוט בזיכרון, המאוכלס בעת טעינת המודול.

## ארכיטקטורה

```
לקוח (לוח מחוונים / CLI / API)
  → POST /api/v1/agents/tasks (נדרש אימות ניהולי)
    → אימות CreateCloudAgentTaskSchema‏ (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ נשלפים מתוך getProviderConnections({ provider, isActive: true })
         (apiKey תחילה, עם חזרה ל-accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ בקשת HTTP POST אל ה-API של הספק במעלה
      └─ מחזיר CloudAgentTask עם id פנימי + externalId
    → insertCloudAgentTask(...) אל cloud_agent_tasks‏ (SQLite)

תשאול (סנכרון עצל בעת קריאה):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // מרענן את הסטטוס + הפעילויות
    → updateCloudAgentTask(...) עם סטטוס חדש, תוצאה ו-completed_at
    → החזרת המשימה לאחר סריאליזציה

אינטראקציות:
  POST /api/v1/agents/tasks/[id]  גוף: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        עבור "approve"
    → agent.sendMessage(externalId, message, credentials) עבור "message"
    → הסטטוס משתנה ל-"cancelled"                        עבור "cancel" (מקומי בלבד)
```

הסנכרון הוא **עצל**: הסטטוס מתרענן מהשירות במעלה בכל `GET /tasks/[id]`.
אין מתשאל רקע. לוחות מחוונים הזקוקים למצב עדכני צריכים לתשאל את נקודת הקצה GET
במרווח זמן סביר.

## ממשק `CloudAgentBase`

מקור: `src/lib/cloudAgent/baseAgent.ts`

```typescript
export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(p: CreateTaskParams, c: AgentCredentials): Promise<CloudAgentTask>;
  abstract getStatus(externalId: string, c: AgentCredentials): Promise<GetStatusResult>;
  abstract approvePlan(externalId: string, c: AgentCredentials): Promise<void>;
  abstract sendMessage(
    externalId: string,
    message: string,
    c: AgentCredentials
  ): Promise<CloudAgentActivity>;
  abstract listSources(
    c: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(raw: string): CloudAgentStatus; // מחרוזת מקור היוריסטית → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` זורקת שגיאה במכוון — Codex Cloud מתכנן אוטומטית ואין לו
שלב אישור. `CodexCloudAgent.listSources` מחזירה `[]`.

`CursorCloudAgent` מפעילה את Background / Cloud Agents של Cursor דרך ממשק ה-REST הרשמי
שלה (`api.cursor.com/v0`), באמצעות **מפתח API של משתמש או של חשבון שירות** — החלופה
הבטוחה יותר והישירה מהספק לשימוש חוזר בהפעלת OAuth של סביבת הפיתוח Cursor (הספק `cursor`,
אשר כולל אזהרה לגבי סיכון לחסימה). זהו מתאם REST פשוט (ללא תלות מקורית ב-`@cursor/sdk`).
`approvePlan` זורקת שגיאה (סוכני Cursor פועלים באופן אוטונומי); `listSources` מציגה את
המאגרים שאליהם המפתח מאפשר גישה. Cursor מחזירה ערכי enum של סטטוס באותיות רישיות
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), הממופים במפורש אל
`CloudAgentStatus` המשותף. ניתן לדרוס את `baseUrl` עבור כל פרטי הזדהות, כך שאפשר לתקן
את גרסת/נתיב ה-API ללא שינוי בקוד.

## טיפוסי תחום

מקור: `src/lib/cloudAgent/types.ts`

```typescript
export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string; // חייבת להיות כתובת URL תקינה
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // שניות, מספר שלם חיובי
  cost?: number; // מספר עשרוני חיובי
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // מזהה `task_...` פנימי
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // המזהה של הספק החיצוני
  status: CloudAgentStatus;
  prompt: string; // 1..10000 תווים
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

סכמות האימות (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) מיוצאות
לצד הטיפוסים ומשמשות את מטפלי הנתיבים.

## מסד נתונים

מקור: `src/lib/cloudAgent/db.ts` — הטבלה נוצרת באופן עצל באמצעות
`createCloudAgentTaskTable()` (שנקראת גם מתוך `src/lib/cloudAgent/index.ts` בעת
ייבוא המודול).

```sql
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id           TEXT PRIMARY KEY,
  provider_id  TEXT NOT NULL,
  external_id  TEXT,
  status       TEXT NOT NULL DEFAULT 'queued',
  prompt       TEXT NOT NULL,
  source       TEXT NOT NULL,             -- JSON
  options      TEXT DEFAULT '{}',         -- JSON
  result       TEXT,                       -- JSON
  activities   TEXT DEFAULT '[]',          -- JSON
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status   ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created  ON cloud_agent_tasks(created_at DESC);
```

`updateCloudAgentTask` אוכפת **רשימה לבנה של עמודות** כדי למנוע הזרקת SQL:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. כל מפתח אחר בעדכון החלקי מושמט ללא הודעה.

## REST API — מחזור החיים של משימה

**אימות:** כל נקודות הקצה `/api/v1/agents/tasks*` דורשות **אימות ניהולי**
(`requireCloudAgentManagementAuth` עוטפת את `requireManagementAuth` מתוך
`src/lib/api/requireManagementAuth`). דרישה זו נאכפת לאחר הקומיט `588a0333`
(_"תיקון (אימות): דרישת אימות ניהולי עבור ממשקי ה-API של סוכנים ותקופות צינון"_).

| שיטה    | נתיב                          | מטרה                                                           |
| ------- | ----------------------------- | -------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | בקשת קדם של CORS                                               |
| GET     | `/api/v1/agents/tasks`        | הצגת משימות (סינון: `provider`, `status`, `limit≤500`)         |
| POST    | `/api/v1/agents/tasks`        | יצירת משימה (שולחת לספק החיצוני ושומרת)                        |
| DELETE  | `/api/v1/agents/tasks?id=...` | מחיקת משימה לפי מזהה בשאילתה (**אינה** מבטלת אצל הספק החיצוני) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | בקשת קדם של CORS                                               |
| GET     | `/api/v1/agents/tasks/[id]`   | קריאת משימה וסנכרון עצל של הסטטוס מהספק החיצוני                |
| POST    | `/api/v1/agents/tasks/[id]`   | פעולה: `approve` / `message` / `cancel`                        |
| DELETE  | `/api/v1/agents/tasks/[id]`   | מחיקת משימה לפי מזהה בנתיב                                     |

### יצירת משימה

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Fix the bug in src/foo.ts where the parser returns null",
    "source": {
      "repoName": "user/repo",
      "repoUrl": "https://github.com/user/repo",
      "branch": "main"
    },
    "options": {
      "autoCreatePr": true,
      "planApprovalRequired": false
    }
  }'
```

תגובת `201`:

```json
{
  "data": {
    "id": "task_1731512345678_abc123def",
    "providerId": "devin",
    "externalId": "session_xyz",
    "status": "queued",
    "prompt": "...",
    "source": { "repoName": "user/repo", "repoUrl": "...", "branch": "main" },
    "options": { "autoCreatePr": true },
    "createdAt": "2026-05-13T12:34:56.789Z"
  }
}
```

### אישור תוכנית

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### שליחת הודעת המשך

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### ביטול (סטטוס מקומי בלבד)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` משנה את `status` ל-`"cancelled"` במסד הנתונים המקומי, אך **אינה** פונה
לספק החיצוני — אין RPC לביטול ב-`CloudAgentBase`. כדי להפסיק את החיוב אצל
הספק החיצוני, יש לסיים את המשימה במסוף של הספק עצמו.

## REST API — תשתית ספקי ענן

נקודות קצה מסייעות אלה תחת `src/app/api/cloud/` משמשות לקוחות מרוחקים
(ה-CLI, אפליקציית Electron או תהליכי סנכרון) לקריאת מטא-נתונים של חיבורי ספקים
ולפתרון כינויים של מודלים. הן מאומתות באמצעות **מפתח API רגיל**
(דרך `validateApiKey`), ולא באמצעות אימות הניהול המשמש את נקודות הקצה של המשימות.

| שיטה | נתיב                            | מטרה                                                          |
| ---- | ------------------------------- | ------------------------------------------------------------- |
| POST | `/api/cloud/auth`               | אימות מפתח API והחזרת מטא-נתוני חיבור מוסווים + כינויי מודלים |
| PUT  | `/api/cloud/credentials/update` | רענון `accessToken` / `refreshToken` / `expiresAt`            |
| POST | `/api/cloud/model/resolve`      | פתרון כינוי מודל ל-`{ provider, model }`                      |
| GET  | `/api/cloud/models/alias`       | הצגת כל כינויי המודלים                                        |
| PUT  | `/api/cloud/models/alias`       | הגדרת כינוי מודל (וסנכרון אוטומטי לענן, אם מופעל)             |

`/api/cloud/auth` לעולם אינה מחזירה ערכי `apiKey` / `accessToken` / `refreshToken` גולמיים. היא
מחזירה `hasApiKey`,‏ `hasAccessToken`,‏ `hasRefreshToken` ותצוגה מקדימה מוסווית
(`maskedApiKey`: ארבעת התווים הראשונים + `****` + ארבעת התווים האחרונים).

## פתרון פרטי גישה

`getCloudAgentCredentials(providerId)` בקובץ `src/lib/cloudAgent/api.ts`:

1. טוענת חיבורי ספקים פעילים באמצעות `getProviderConnections({ provider: providerId, isActive: true })`.
2. עבור כל חיבור, מעדיפה את `apiKey` (לאחר הסרת רווחים). אם אינו קיים, משתמשת ב-`accessToken`.
3. מחזירה את האסימון הלא-ריק הראשון כשהוא עטוף כ-`{ apiKey: token }`.
4. מחזירה `null` אם לא נמצא אסימון שמיש — ה-API משיב בקוד `400` עם
   `"No active credentials configured for cloud agent provider: <id>"`.

משמעות הדבר היא שסוכני ענן משתמשים מחדש באותה טבלת חיבורי ספקים שבה משתמשים ספקי
LLM רגילים. כדי להפעיל את Jules, יש ליצור חיבור פעיל עם `provider: "jules"`
ועם `apiKey` מאוכלס.

## לוח בקרה

מקור: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

דף React מסוג `"use client"` אשר:

- מציג משימות (הנבדקות תקופתית באמצעות `GET /api/v1/agents/tasks`).
- שולח משימות חדשות באמצעות טופס הממופה אל `CreateCloudAgentTaskSchema`.
- מציג תגי סטטוס (`queued`,‏ `running`,‏ `awaiting_approval`,‏ `completed`,
  `failed`,‏ `cancelled`) ומרנדר את ציר הזמן `activities[]`.
- מציג את `result.prUrl` / `commitMessage` / `summary` כאשר `status === "completed"`.

## שילוב עם A2A

ניתן לחשוף סוכני ענן כמיומנויות A2A באמצעות רישום מיומנות A2A שמעבירה
את הטיפול שלה ב-`tasks/send` אל `getAgent(...).createTask(...)` ומתרגמת אירועי סטטוס של משימות A2A
לפרוטוקול JSON-RPC 2.0. ראו [A2A-SERVER.md](./A2A-SERVER.md).

## הוספת סוכן ענן חדש

1. צרו את `src/lib/cloudAgent/agents/<name>.ts` שמרחיב את `CloudAgentBase`.
2. ממשו את `createTask`,‏ `getStatus`,‏ `approvePlan` (או זרקו חריגה אם לא רלוונטי),
   `sendMessage`,‏ `listSources`. השתמשו ב-`this.mapStatus(...)` לנרמול סטטוסים.
3. רשמו אותו ב-`src/lib/cloudAgent/registry.ts` תחת `providerId` יציב.
4. הרחיבו את איחוד הליטרלים `providerId` ב-`src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` ו-`CreateCloudAgentTaskSchema`).
5. הוסיפו את הספק אל `src/shared/constants/providers.ts` אם הוא זקוק לרשומת
   חיבור. ספקים מבוססי OAuth זקוקים גם ל-`src/lib/oauth/providers/`.
6. הוסיפו בדיקות תחת `tests/unit/cloud-agent-*.test.ts`.
7. עדכנו מסמך זה ואת הקבוע `CLOUD_AGENTS` של לוח הבקרה.

## הגדרות

| משתנה סביבה      | מטרה                                                  |
| ---------------- | ----------------------------------------------------- |
| `DATA_DIR`       | מיקום מסד הנתונים SQLite המכיל את `cloud_agent_tasks` |
| `JWT_SECRET`     | נדרש לאימות ניהולי בנקודות הקצה של משימות             |
| `API_KEY_SECRET` | נדרש להצפנת פרטי הגישה לחיבורי ספקים במצב מנוחה       |

כיום לא קיימים משתני סביבה ייעודיים ל-Cloud-Agent — כל סוד נשמר בטבלה
`provider_connections`.

## ראו גם

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- מקור: `src/lib/cloudAgent/`
- נתיבים: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- לוח בקרה: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
