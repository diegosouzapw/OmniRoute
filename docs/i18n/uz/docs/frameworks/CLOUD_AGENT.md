# Cloud Agents (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Haqiqat manbasi:** `src/lib/cloudAgent/` va `src/app/api/v1/agents/tasks/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40 (frontmatter yangilandi; cursor-cloud bilan birga 4 ta agent)

OmniRoute uchinchi tomon bulutida joylashtirilgan dasturlash agentlarini (Codex Cloud, Cursor,
Devin, Jules) uzoq davom etuvchi vazifalar sifatida boshqaradi. Har bir agent yagona interfeys
orqali o‘ralgan, shu sababli mijozlar provayderga xos API’lar bilan ishlamasdan prompt + repo
URL manzilini yuborishi va natijalarni olishi mumkin.

Cloud Agent vazifasi odatiy chat yakunlashi **emas**. U bir necha daqiqadan bir necha
soatgacha davom etishi, artefakt sifatida Pull Request yaratishi hamda keyingi xabarlar va
(ayrim provayderlarda) reja tasdiqlash bosqichlarini qo‘llab-quvvatlashi mumkin bo‘lgan,
saqlanuvchi, ko‘p bosqichli ish birligidir.

![Cloud Agent vazifasining hayot sikli](../diagrams/exported/cloud-agent-flow.svg)

> Manba: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Qo‘llab-quvvatlanadigan agentlar

| Provayder ID’si | Klass              | Manba                                 | Yuqori oqim asosiy URL manzili          | Rejani tasdiqlash |
| --------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`         | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ha                |
| `devin`         | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ha                |
| `codex-cloud`   | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Yo‘q (avtomatik)  |
| `cursor-cloud`  | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Yo‘q (avtomatik)  |

Reyestr: `src/lib/cloudAgent/registry.ts` — `getAgent(providerId)`,
`getAvailableAgents()` va `isCloudAgentProvider(providerId)` funksiyalarini eksport qiladi.
Reyestr modul yuklanganda to‘ldiriladigan oddiy xotira ichidagi
`Record<string, CloudAgentBase>` hisoblanadi.

## Arxitektura

```
Mijoz (boshqaruv paneli / CLI / API)
  → POST /api/v1/agents/tasks (boshqaruv autentifikatsiyasi talab qilinadi)
    → CreateCloudAgentTaskSchema tekshiruvi (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ getProviderConnections({ provider, isActive: true }) dan oladi
         (avval apiKey, topilmasa accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ Yuqori oqim provayderi API’siga HTTP POST
      └─ ichki id + externalId bilan CloudAgentTask qaytaradi
    → cloud_agent_tasks (SQLite) ichiga insertCloudAgentTask(...)

So‘rov yuborib tekshirish (o‘qish paytidagi kechiktirilgan sinxronlash):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // holat + faoliyatlarni yangilaydi
    → yangi holat, natija, completed_at bilan updateCloudAgentTask(...)
    → seriyalashtirilgan vazifani qaytaradi

O‘zaro amallar:
  POST /api/v1/agents/tasks/[id]  so‘rov tanasi: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)          "approve" uchun
    → agent.sendMessage(externalId, message, credentials) "message" uchun
    → holat "cancelled" ga o‘zgaradi                       "cancel" uchun (faqat lokal)
```

Sinxronlash **kechiktirilgan**: har bir `GET /tasks/[id]` so‘rovida holat yuqori oqimdan
yangilanadi. Fon rejimida so‘rov yuborib tekshiruvchi mexanizm mavjud emas. Yangi holat
kerak bo‘lgan boshqaruv panellari GET endpoint’ini maqbul vaqt oralig‘ida so‘rab turishi
kerak.

## `CloudAgentBase` interfeysi

Manba: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // yuqori oqim satri → enum evristikasi
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` ataylab xatolik chiqaradi — Codex Cloud rejalarni avtomatik ravishda tuzadi va
tasdiqlash bosqichiga ega emas. `CodexCloudAgent.listSources` `[]` qaytaradi.

`CursorCloudAgent` Cursor’ning Background / Cloud Agents xizmatlarini uning rasmiy REST
API’si (`api.cursor.com/v0`) orqali **foydalanuvchi yoki xizmat hisobi API kaliti** yordamida boshqaradi — bu Cursor IDE OAuth seansidan qayta foydalanishga nisbatan xavfsizroq,
birlamchi tomon muqobilidir (`cursor` provayderida bloklanish xavfi haqida ogohlantirish mavjud).
Bu oddiy REST adapteridir (`@cursor/sdk` mahalliy bogʻliqligi yoʻq).
`approvePlan` xatolik chiqaradi (Cursor agentlari avtonom ishlaydi); `listSources` esa
kalit orqali foydalanish mumkin boʻlgan repozitoriylarni roʻyxatlaydi. Cursor UPPERCASE holat enumlarini
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`) qaytaradi va ular umumiy
`CloudAgentStatus` qiymatlariga aniq moslashtiriladi. API versiyasi/yoʻlini
kodni oʻzgartirmasdan tuzatish mumkin boʻlishi uchun `baseUrl` har bir hisob maʼlumoti darajasida qayta belgilanishi mumkin.

## Domen turlari

Manba: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // yaroqli URL boʻlishi kerak
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // soniyalar, musbat butun son
  cost?: number; // musbat oʻnli son
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // ichki `task_...` identifikatori
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // yuqori oqim provayderining identifikatori
  status: CloudAgentStatus;
  prompt: string; // 1..10000 ta belgi
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

Validatsiya sxemalari (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`)
turlar bilan birga eksport qilinadi va marshrut ishlov beruvchilari tomonidan qoʻllanadi.

## Maʼlumotlar bazasi

Manba: `src/lib/cloudAgent/db.ts` — jadval `createCloudAgentTaskTable()` orqali
zarurat tugʻilganda yaratiladi (u modul import qilinganda
`src/lib/cloudAgent/index.ts` ichidan ham chaqiriladi).

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

`updateCloudAgentTask` SQL inyeksiyasining oldini olish uchun **ustunlar oq roʻyxati**ni qoʻllaydi:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Qisman yangilashdagi boshqa har qanday kalit hech qanday ogohlantirishsiz olib tashlanadi.

## REST API — Vazifaning hayot sikli

**Autentifikatsiya:** Barcha `/api/v1/agents/tasks*` oxirgi nuqtalari **boshqaruv autentifikatsiyasi**ni
talab qiladi (`requireCloudAgentManagementAuth`
`src/lib/api/requireManagementAuth` faylidagi `requireManagementAuth`ni oʻrab turadi).
Bu talab `588a0333` kommitidan keyin kuchga kiritilgan
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metod   | Yoʻl                          | Maqsad                                                                               |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | CORS dastlabki soʻrovi                                                               |
| GET     | `/api/v1/agents/tasks`        | Vazifalar roʻyxati (filtr: `provider`, `status`, `limit≤500`)                        |
| POST    | `/api/v1/agents/tasks`        | Vazifa yaratish (yuqori oqimga yuboradi + saqlaydi)                                  |
| DELETE  | `/api/v1/agents/tasks?id=...` | Vazifani soʻrov identifikatori boʻyicha oʻchiradi (yuqori oqimda **bekor qilmaydi**) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS dastlabki soʻrovi                                                               |
| GET     | `/api/v1/agents/tasks/[id]`   | Vazifani oʻqish + holatni yuqori oqimdan kechiktirib sinxronlash                     |
| POST    | `/api/v1/agents/tasks/[id]`   | Amal: `approve` / `message` / `cancel`                                               |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Vazifani yoʻl identifikatori boʻyicha oʻchiradi                                      |

### Vazifa yaratish

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

`201` javobi:

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

### Rejani tasdiqlash

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Qoʻshimcha xabar yuborish

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Bekor qilish (faqat mahalliy holat)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` mahalliy maʼlumotlar bazasidagi `status` qiymatini `"cancelled"`ga oʻzgartiradi, ammo
yuqori oqim provayderini chaqirmaydi — `CloudAgentBase`da bekor qilish uchun RPC mavjud emas.
Yuqori oqimdagi hisob-kitobni toʻxtatish uchun vazifani provayderning oʻz konsolida yakunlang.

## REST API — Bulut provayderi integratsiyasi

`src/app/api/cloud/` ichidagi ushbu yordamchi endpointlardan masofaviy mijozlar
(CLI, Electron ilovasi yoki sinxronlash worker'lari) provayder ulanish metamaʼlumotlarini
oʻqish va model taxalluslarini aniqlash uchun foydalanadi. Ular vazifa endpointlarida
ishlatiladigan boshqaruv autentifikatsiyasi bilan emas, balki **oddiy API kaliti**
(`validateApiKey` orqali) bilan autentifikatsiya qilinadi.

| Metod | Yoʻl                            | Maqsad                                                                                          |
| ----- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST  | `/api/cloud/auth`               | API kalitini tekshirish, niqoblangan ulanish metamaʼlumotlari va model taxalluslarini qaytarish |
| PUT   | `/api/cloud/credentials/update` | `accessToken` / `refreshToken` / `expiresAt` qiymatlarini yangilash                             |
| POST  | `/api/cloud/model/resolve`      | Model taxallusini `{ provider, model }` ko‘rinishiga aniqlash                                   |
| GET   | `/api/cloud/models/alias`       | Barcha model taxalluslarini roʻyxatlash                                                         |
| PUT   | `/api/cloud/models/alias`       | Model taxallusini belgilash (va yoqilgan boʻlsa, Cloud bilan avtomatik sinxronlash)             |

`/api/cloud/auth` hech qachon asl `apiKey` / `accessToken` / `refreshToken` qiymatlarini qaytarmaydi. U
`hasApiKey`, `hasAccessToken`, `hasRefreshToken` va niqoblangan koʻrinishni
(`maskedApiKey`: dastlabki 4 ta belgi + `****` + oxirgi 4 ta belgi) qaytaradi.

## Hisob maʼlumotlarini aniqlash

`src/lib/cloudAgent/api.ts` ichidagi `getCloudAgentCredentials(providerId)`:

1. `getProviderConnections({ provider: providerId, isActive: true })` orqali faol provayder ulanishlarini yuklaydi.
2. Har bir ulanish uchun avval `apiKey` (boʻsh joylari olib tashlangan) qiymatini tanlaydi. U mavjud boʻlmasa, `accessToken` qiymatidan foydalanadi.
3. Birinchi boʻsh boʻlmagan tokenni `{ apiKey: token }` ko‘rinishida qaytaradi.
4. Foydalanish mumkin boʻlgan token topilmasa, `null` qaytaradi — API `400` holat kodi bilan
   `"Bulut agenti provayderi uchun faol hisob maʼlumotlari sozlanmagan: <id>"` xabarini qaytaradi.

Bu Cloud Agent'lar oddiy LLM provayderlari bilan bir xil Provider Connection jadvalidan
foydalanishini anglatadi. Jules'ni yoqish uchun `provider: "jules"` va toʻldirilgan
`apiKey` qiymatiga ega faol ulanish yarating.

## Boshqaruv paneli

Manba: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Quyidagilarni bajaruvchi `"use client"` React sahifasi:

- Vazifalarni roʻyxatlaydi (`GET /api/v1/agents/tasks` orqali davriy soʻrov yuboriladi).
- `CreateCloudAgentTaskSchema` ga mos keladigan forma orqali yangi vazifalarni yuboradi.
- Holat nishonlarini (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) koʻrsatadi va `activities[]` vaqt jadvalini tasvirlaydi.
- `status === "completed"` boʻlganda `result.prUrl` / `commitMessage` / `summary` qiymatlarini koʻrsatadi.

## A2A bilan integratsiya

Cloud Agent'larni `tasks/send` ishlov beruvchisini `getAgent(...).createTask(...)` ga
yoʻnaltiradigan va A2A vazifa holati hodisalarini JSON-RPC 2.0 protokoliga oʻgiradigan
A2A ko‘nikmasini roʻyxatdan oʻtkazish orqali A2A ko‘nikmalari sifatida taqdim etish mumkin. [A2A-SERVER.md](./A2A-SERVER.md) ga qarang.

## Yangi Cloud Agent qoʻshish

1. `CloudAgentBase` ni kengaytiruvchi `src/lib/cloudAgent/agents/<name>.ts` faylini yarating.
2. `createTask`, `getStatus`, `approvePlan` (yoki qoʻllanilmasa, xatolik qaytaring),
   `sendMessage`, `listSources` metodlarini amalga oshiring. Holatlarni meʼyorlashtirish uchun `this.mapStatus(...)` dan foydalaning.
3. Uni `src/lib/cloudAgent/registry.ts` ichida barqaror `providerId` ostida roʻyxatdan oʻtkazing.
4. `src/lib/cloudAgent/types.ts` ichidagi `providerId` literal birlashmasini
   (`CloudAgentTask.providerId` va `CreateCloudAgentTaskSchema`) kengaytiring.
5. Agar provayder uchun ulanish yozuvi kerak boʻlsa, uni `src/shared/constants/providers.ts` ga qoʻshing.
   OAuth asosidagi provayderlar uchun `src/lib/oauth/providers/` ham kerak boʻladi.
6. Testlarni `tests/unit/cloud-agent-*.test.ts` ostiga qoʻshing.
7. Ushbu hujjatni va boshqaruv panelidagi `CLOUD_AGENTS` konstantasini yangilang.

## Konfiguratsiya

| Muhit o‘zgaruvchisi | Maqsadi                                                                          |
| ------------------- | -------------------------------------------------------------------------------- |
| `DATA_DIR`          | `cloud_agent_tasks` saqlanadigan SQLite ma’lumotlar bazasining joylashuvi        |
| `JWT_SECRET`        | Vazifa endpointlarida boshqaruv autentifikatsiyasi uchun talab qilinadi          |
| `API_KEY_SECRET`    | Provayder ulanishi hisob ma’lumotlarini saqlashda shifrlash uchun talab qilinadi |

Hozirda Cloud-Agent’ga xos muhit o‘zgaruvchilari mavjud emas — barcha maxfiy ma’lumotlar
`provider_connections` jadvalida saqlanadi.

## Shuningdek qarang

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Manba: `src/lib/cloudAgent/`
- Yo‘nalishlar: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Boshqaruv paneli: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
