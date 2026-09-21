# Cloud Agents (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Əsas mənbə:** `src/lib/cloudAgent/` və `src/app/api/v1/agents/tasks/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40 (frontmatter yeniləməsi; cursor-cloud daxil olmaqla 4 agent)

OmniRoute üçüncü tərəflərin buludda yerləşdirilən kodlaşdırma agentlərini (Codex Cloud, Cursor,
Devin, Jules) uzunmüddətli tapşırıqlar kimi idarə edir. Hər bir agent vahid interfeys arxasında
əhatələnir ki, müştərilər provayderə xas API-lərlə işləmədən sorğu mətni + repozitoriya URL-i
göndərə və nəticələri əldə edə bilsinlər.

Cloud Agent tapşırığı adi çat tamamlaması **deyil**. Bu, dəqiqələrdən saatlara qədər davam edə
bilən, artefakt kimi Pull Request yarada bilən və əlavə mesajları, həmçinin (bəzi provayderlərdə)
plan təsdiqi mərhələlərini dəstəkləyən davamlı, çoxmərhələli iş vahididir.

![Cloud Agent tapşırığının həyat dövrü](../diagrams/exported/cloud-agent-flow.svg)

> Mənbə: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Dəstəklənən agentlər

| Provayder ID-si | Sinif              | Mənbə                                 | İlkin baza URL-i                        | Plan təsdiqi     |
| --------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------- |
| `jules`         | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Bəli             |
| `devin`         | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Bəli             |
| `codex-cloud`   | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Xeyr (avtomatik) |
| `cursor-cloud`  | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Xeyr (avtomatik) |

Reyestr: `src/lib/cloudAgent/registry.ts` — `getAgent(providerId)`,
`getAvailableAgents()` və `isCloudAgentProvider(providerId)` funksiyalarını ixrac edir.
Reyestr modul yüklənərkən doldurulan sadə yaddaşdaxili `Record<string, CloudAgentBase>`-dir.

## Arxitektura

```
Müştəri (İdarə paneli / CLI / API)
  → POST /api/v1/agents/tasks (idarəetmə autentifikasiyası tələb olunur)
    → CreateCloudAgentTaskSchema yoxlaması (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ getProviderConnections({ provider, isActive: true }) vasitəsilə əldə edir
         (əvvəlcə apiKey, ehtiyat variant kimi accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ ilkin provayder API-sinə HTTP POST
      └─ daxili id + externalId ilə CloudAgentTask qaytarır
    → cloud_agent_tasks (SQLite) daxilinə insertCloudAgentTask(...)

Sorğulama (oxuma zamanı tənbəl sinxronizasiya):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // statusu + fəaliyyətləri yeniləyir
    → yeni status, nəticə və completed_at ilə updateCloudAgentTask(...)
    → serializasiya edilmiş tapşırığı qaytarır

Qarşılıqlı əməliyyatlar:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)          "approve" üçün
    → agent.sendMessage(externalId, message, credentials) "message" üçün
    → status "cancelled" olaraq dəyişir                    "cancel" üçün (yalnız lokal)
```

Sinxronizasiya **tənbəldir**: status hər `GET /tasks/[id]` sorğusunda ilkin mənbədən yenilənir.
Arxa planda işləyən sorğulayıcı yoxdur. Aktual vəziyyətə ehtiyac duyan idarə panelləri GET
son nöqtəsini münasib intervalla sorğulamalıdır.

## `CloudAgentBase` interfeysi

Mənbə: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // evristik yuxarı səviyyə sətri → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` qəsdən xəta atır — Codex Cloud planları avtomatik yaradır və təsdiqləmə mərhələsi yoxdur. `CodexCloudAgent.listSources` `[]` qaytarır.

`CursorCloudAgent` Cursor-un Background / Cloud Agents xidmətlərini onun rəsmi REST API-si (`api.cursor.com/v0`) vasitəsilə, **istifadəçi və ya xidmət hesabı API açarı** ilə idarə edir — bu, Cursor IDE-nin OAuth sessiyasını təkrar istifadə etməyə nisbətən daha təhlükəsiz, birbaşa istehsalçı tərəfindən təqdim olunan alternativdir (ban riski barədə xəbərdarlıq daşıyan `cursor` provayderi). Bu, sadə REST adapteridir (`@cursor/sdk` yerli asılılığı yoxdur). `approvePlan` xəta atır (Cursor agentləri avtonom işləyir); `listSources` açarın giriş əldə edə bildiyi repozitoriyaları siyahıya alır. Cursor ortaq `CloudAgentStatus`-a aşkar şəkildə uyğunlaşdırılan BÖYÜK HƏRFLİ status enum-ları (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`) qaytarır. API versiyasının/yolunun kod dəyişikliyi olmadan düzəldilə bilməsi üçün `baseUrl` hər bir etimad məlumatı üzrə dəyişdirilə bilər.

## Domen tipləri

Mənbə: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // etibarlı URL olmalıdır
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // saniyə, müsbət tam ədəd
  cost?: number; // müsbət onluq ədəd
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // daxili `task_...` identifikatoru
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // yuxarı səviyyəli provayderin identifikatoru
  status: CloudAgentStatus;
  prompt: string; // 1..10000 simvol
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

Validasiya sxemləri (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) tiplərlə yanaşı ixrac edilir və marşrut emalçıları tərəfindən istifadə olunur.

## Verilənlər bazası

Mənbə: `src/lib/cloudAgent/db.ts` — cədvəl `createCloudAgentTaskTable()` vasitəsilə tənbəl şəkildə yaradılır (`src/lib/cloudAgent/index.ts` faylında modul idxal edilərkən də çağırılır).

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

`updateCloudAgentTask` SQL inyeksiyasının qarşısını almaq üçün **sütunların icazə siyahısını** tətbiq edir:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Qismən yeniləmədəki istənilən digər açar səssizcə nəzərə alınmır.

## REST API — Tapşırığın həyat dövrü

**Autentifikasiya:** Bütün `/api/v1/agents/tasks*` son nöqtələri **idarəetmə autentifikasiyası** tələb edir (`requireCloudAgentManagementAuth`, `src/lib/api/requireManagementAuth` daxilindəki `requireManagementAuth` funksiyasını əhatə edir). Bu tələb `588a0333` kommitindən sonra tətbiq edilir (_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metod   | Yol                           | Məqsəd                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS ilkin sorğusu                                                  |
| GET     | `/api/v1/agents/tasks`        | Tapşırıqları siyahıla (filtr: `provider`, `status`, `limit≤500`)    |
| POST    | `/api/v1/agents/tasks`        | Tapşırıq yarat (yuxarı axına göndərir + saxlayır)                   |
| DELETE  | `/api/v1/agents/tasks?id=...` | Tapşırığı sorğu id-si ilə sil (yuxarı axında **ləğv etmir**)        |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS ilkin sorğusu                                                  |
| GET     | `/api/v1/agents/tasks/[id]`   | Tapşırığı oxu + statusu yuxarı axından tənbəl şəkildə sinxronlaşdır |
| POST    | `/api/v1/agents/tasks/[id]`   | Əməl: `approve` / `message` / `cancel`                              |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Tapşırığı yoldakı id ilə sil                                        |

### Tapşırıq yaratmaq

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

`201` cavabı:

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

### Planı təsdiqləmək

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Əlavə mesaj göndərmək

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Ləğv etmək (yalnız lokal status)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` lokal verilənlər bazasında `status` dəyərini `"cancelled"` olaraq dəyişir, lakin yuxarı axın provayderini **çağırmır** — `CloudAgentBase` daxilində dayandırma RPC-si yoxdur. Yuxarı axında hesablanmanı dayandırmaq üçün tapşırığı provayderin öz konsolunda sonlandırın.

## REST API — Bulud Provayderi İnfrastrukturu

`src/app/api/cloud/` altındakı bu köməkçi son nöqtələr uzaq müştərilər
(CLI, Electron tətbiqi və ya sinxronizasiya işçiləri) tərəfindən provayder bağlantısının metadatasını
oxumaq və model ləqəblərini həll etmək üçün istifadə olunur. Onlar tapşırıq son nöqtələrinin istifadə etdiyi idarəetmə autentifikasiyası ilə deyil,
**adi API açarı** ilə (`validateApiKey` vasitəsilə) autentifikasiya olunur.

| Metod | Yol                             | Məqsəd                                                                                   |
| ----- | ------------------------------- | ---------------------------------------------------------------------------------------- |
| POST  | `/api/cloud/auth`               | API açarını doğrulamaq, maskalanmış bağlantı metadatasını və model ləqəblərini qaytarmaq |
| PUT   | `/api/cloud/credentials/update` | `accessToken` / `refreshToken` / `expiresAt` məlumatlarını yeniləmək                     |
| POST  | `/api/cloud/model/resolve`      | Model ləqəbini `{ provider, model }` dəyərinə həll etmək                                 |
| GET   | `/api/cloud/models/alias`       | Bütün model ləqəblərini siyahılamaq                                                      |
| PUT   | `/api/cloud/models/alias`       | Model ləqəbi təyin etmək (və aktivdirsə, avtomatik olaraq Cloud ilə sinxronlaşdırmaq)    |

`/api/cloud/auth` heç vaxt xam `apiKey` / `accessToken` / `refreshToken` dəyərlərini qaytarmır. O,
`hasApiKey`, `hasAccessToken`, `hasRefreshToken` və maskalanmış önizləmə
(`maskedApiKey`: ilk 4 + `****` + son 4) qaytarır.

## Giriş Məlumatlarının Müəyyənləşdirilməsi

`src/lib/cloudAgent/api.ts` faylındakı `getCloudAgentCredentials(providerId)`:

1. Aktiv provayder bağlantılarını `getProviderConnections({ provider: providerId, isActive: true })` vasitəsilə yükləyir.
2. Hər bağlantı üçün `apiKey` dəyərinə (boşluqları təmizlənmiş) üstünlük verir. Mövcud deyilsə, `accessToken` istifadə edir.
3. İlk boş olmayan tokeni `{ apiKey: token }` şəklində qaytarır.
4. İstifadəyə yararlı token tapılmadıqda `null` qaytarır — API `400` statusu və
   `"Bulud agenti provayderi üçün aktiv giriş məlumatları konfiqurasiya edilməyib: <id>"` mesajı ilə cavab verir.

Bu o deməkdir ki, Cloud Agents adi LLM provayderləri ilə eyni Provider Connection cədvəlindən
təkrar istifadə edir. Jules-u aktivləşdirmək üçün `provider: "jules"` və doldurulmuş
`apiKey` ilə aktiv bağlantı yaradın.

## İdarəetmə Paneli

Mənbə: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Aşağıdakıları edən `"use client"` React səhifəsi:

- Tapşırıqları siyahılayır (`GET /api/v1/agents/tasks` vasitəsilə periodik sorğulanır).
- `CreateCloudAgentTaskSchema` ilə uyğunlaşdırılan forma vasitəsilə yeni tapşırıqlar göndərir.
- Status nişanlarını (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) göstərir və `activities[]` zaman xəttini təqdim edir.
- `status === "completed"` olduqda `result.prUrl` / `commitMessage` / `summary` məlumatlarını göstərir.

## A2A ilə İnteqrasiya

Cloud Agents, `tasks/send` emalçısını `getAgent(...).createTask(...)` metoduna həvalə edən
və A2A tapşırıq statusu hadisələrini JSON-RPC 2.0 protokoluna çevirən A2A bacarığını qeydiyyatdan keçirməklə
A2A bacarıqları kimi təqdim edilə bilər. Baxın: [A2A-SERVER.md](./A2A-SERVER.md).

## Yeni Cloud Agent Əlavə Etmək

1. `CloudAgentBase` sinfini genişləndirən `src/lib/cloudAgent/agents/<name>.ts` faylı yaradın.
2. `createTask`, `getStatus`, `approvePlan` (və ya tətbiq edilmirsə, xəta yaradın),
   `sendMessage`, `listSources` metodlarını həyata keçirin. Statusun normallaşdırılması üçün `this.mapStatus(...)` istifadə edin.
3. `src/lib/cloudAgent/registry.ts` daxilində sabit `providerId` altında qeydiyyatdan keçirin.
4. `src/lib/cloudAgent/types.ts` daxilindəki `providerId` literal birləşməsini
   (`CloudAgentTask.providerId` və `CreateCloudAgentTaskSchema`) genişləndirin.
5. Bağlantı qeydinə ehtiyacı varsa, provayderi `src/shared/constants/providers.ts` faylına əlavə edin.
   OAuth əsaslı provayderlər üçün həmçinin `src/lib/oauth/providers/` daxilində müvafiq fayllar tələb olunur.
6. Testləri `tests/unit/cloud-agent-*.test.ts` altında əlavə edin.
7. Bu sənədi və idarəetmə panelinin `CLOUD_AGENTS` sabitini yeniləyin.

## Konfiqurasiya

| Mühit dəyişəni   | Təyinatı                                                                        |
| ---------------- | ------------------------------------------------------------------------------- |
| `DATA_DIR`       | `cloud_agent_tasks` cədvəlini saxlayan SQLite verilənlər bazasının yeri         |
| `JWT_SECRET`     | Tapşırıq son nöqtələrində idarəetmə autentifikasiyası üçün tələb olunur         |
| `API_KEY_SECRET` | Provayder bağlantısı məlumatlarını saxlanma zamanı şifrələmək üçün tələb olunur |

Hazırda Cloud-Agent-ə xas mühit dəyişənləri mövcud deyil — bütün məxfi məlumatlar
`provider_connections` cədvəlində saxlanılır.

## Həmçinin baxın

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Mənbə: `src/lib/cloudAgent/`
- Marşrutlar: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- İdarəetmə paneli: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
