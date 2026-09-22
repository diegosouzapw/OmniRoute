# Cloud Agents (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Patiesības avots:** `src/lib/cloudAgent/` un `src/app/api/v1/agents/tasks/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40 (frontmatter atsvaidzināšana; 4 aģenti, tostarp cursor-cloud)

OmniRoute vada trešo pušu mākoņvidē mitinātus programmēšanas aģentus (Codex Cloud, Cursor,
Devin, Jules) kā ilgstošus uzdevumus. Katrs aģents ir ietverts aiz vienotas saskarnes, lai
klienti varētu iesniegt uzvedni un repozitorija URL un saņemt rezultātus bez nepieciešamības
strādāt ar konkrētiem pakalpojumu sniedzēju API.

Mākoņa aģenta uzdevums **nav** parasta tērzēšanas pabeigšana. Tā ir noturīga, vairāku darbību
darba vienība, kuras izpilde var ilgt no dažām minūtēm līdz vairākām stundām, kura kā
artefaktu var izveidot Pull Request un kura atbalsta turpmākus ziņojumus un (dažiem
pakalpojumu sniedzējiem) plāna apstiprināšanas posmus.

![Mākoņa aģenta uzdevuma dzīves cikls](../diagrams/exported/cloud-agent-flow.svg)

> Avots: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Atbalstītie aģenti

| Pakalpojumu sniedzēja ID | Klase              | Avots                                 | Augšupstraumes bāzes URL                | Plāna apstiprināšana |
| ------------------------ | ------------------ | ------------------------------------- | --------------------------------------- | -------------------- |
| `jules`                  | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Jā                   |
| `devin`                  | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Jā                   |
| `codex-cloud`            | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nē (automātiski)     |
| `cursor-cloud`           | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nē (automātiski)     |

Reģistrs: `src/lib/cloudAgent/registry.ts` — eksportē `getAgent(providerId)`,
`getAvailableAgents()` un `isCloudAgentProvider(providerId)`. Reģistrs ir vienkāršs
atmiņā glabāts `Record<string, CloudAgentBase>`, kas tiek aizpildīts moduļa ielādes laikā.

## Arhitektūra

```
Klients (informācijas panelis / CLI / API)
  → POST /api/v1/agents/tasks (nepieciešama pārvaldības autentifikācija)
    → CreateCloudAgentTaskSchema validācija (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ iegūst no getProviderConnections({ provider, isActive: true })
         (vispirms apiKey, atkāpšanās variants — accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST uz augšupstraumes pakalpojumu sniedzēja API
      └─ atgriež CloudAgentTask ar iekšējo id un externalId
    → insertCloudAgentTask(...) datubāzes cloud_agent_tasks tabulā (SQLite)

Aptauja (slinkā sinhronizācija lasīšanas laikā):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // atsvaidzina statusu un aktivitātes
    → updateCloudAgentTask(...) ar jauno statusu, rezultātu un completed_at
    → atgriež serializētu uzdevumu

Mijiedarbības:
  POST /api/v1/agents/tasks/[id]  pamatteksts: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        darbībai "approve"
    → agent.sendMessage(externalId, message, credentials) darbībai "message"
    → statuss tiek mainīts uz "cancelled"               darbībai "cancel" (tikai lokāli)
```

Sinhronizācija ir **slinka**: statuss no augšupstraumes tiek atsvaidzināts katrā
`GET /tasks/[id]` pieprasījumā. Fona aptaujas mehānisma nav. Informācijas paneļiem,
kuriem nepieciešams aktuāls stāvoklis, GET galapunkts jāaptaujā ar saprātīgu intervālu.

## `CloudAgentBase` saskarne

Avots: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heiristiska augšupstraumes virkne → uzskaitījums
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` ar nolūku izmet izņēmumu — Codex Cloud automātiski izveido plānu, un tam
nav apstiprināšanas posma. `CodexCloudAgent.listSources` atgriež `[]`.

`CursorCloudAgent` vada Cursor fona/mākoņa aģentus, izmantojot tā oficiālo REST
API (`api.cursor.com/v0`) ar **lietotāja vai pakalpojuma konta API atslēgu** — drošāku
pirmās puses alternatīvu Cursor IDE OAuth sesijas atkārtotai izmantošanai (nodrošinātājs `cursor`,
kam ir brīdinājums par konta bloķēšanas risku). Tas ir vienkāršs REST adapteris (bez vietējas
`@cursor/sdk` atkarības). `approvePlan` izmet izņēmumu (Cursor aģenti darbojas autonomi); `listSources` uzskaita
repozitorijus, kuriem var piekļūt ar šo atslēgu. Cursor atgriež statusa uzskaitījuma vērtības ar LIELAJIEM BURTIEM
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), kas tiek tieši kartētas uz kopīgo
`CloudAgentStatus`. `baseUrl` var pārrakstīt katriem akreditācijas datiem atsevišķi, lai API versiju/ceļu varētu
labot bez koda izmaiņām.

## Domēna tipi

Avots: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // jābūt derīgam URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekundes, pozitīvs vesels skaitlis
  cost?: number; // pozitīvs skaitlis ar peldošo komatu
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // iekšējais `task_...` identifikators
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // augšupstraumes nodrošinātāja identifikators
  status: CloudAgentStatus;
  prompt: string; // 1..10000 rakstzīmes
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

Validācijas shēmas (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) tiek
eksportētas kopā ar tipiem, un tās izmanto maršrutu apstrādātāji.

## Datubāze

Avots: `src/lib/cloudAgent/db.ts` — tabula tiek izveidota atlikti, izmantojot
`createCloudAgentTaskTable()` (tā tiek izsaukta arī no `src/lib/cloudAgent/index.ts`
moduļa importēšanas laikā).

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

`updateCloudAgentTask` izmanto **atļauto kolonnu sarakstu**, lai novērstu SQL injekciju:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Jebkura cita daļējā atjauninājuma atslēga tiek klusējot atmesta.

## REST API — uzdevuma dzīves cikls

**Autentifikācija:** visiem `/api/v1/agents/tasks*` galapunktiem ir nepieciešama **pārvaldības autentifikācija**
(`requireCloudAgentManagementAuth` ietver `requireManagementAuth` no
`src/lib/api/requireManagementAuth`). Šī prasība tiek piemērota pēc komita `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metode  | Ceļš                          | Nolūks                                                                   |
| ------- | ----------------------------- | ------------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | CORS priekšpieprasījums                                                  |
| GET     | `/api/v1/agents/tasks`        | Uzdevumu saraksts (filtri: `provider`, `status`, `limit≤500`)            |
| POST    | `/api/v1/agents/tasks`        | Izveidot uzdevumu (nosūta augšupējam pakalpojumam un saglabā)            |
| DELETE  | `/api/v1/agents/tasks?id=...` | Dzēst uzdevumu pēc vaicājuma id (**neatceļ** to augšupējā pakalpojumā)   |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS priekšpieprasījums                                                  |
| GET     | `/api/v1/agents/tasks/[id]`   | Nolasīt uzdevumu un atlikti sinhronizēt statusu no augšupējā pakalpojuma |
| POST    | `/api/v1/agents/tasks/[id]`   | Darbība: `approve` / `message` / `cancel`                                |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Dzēst uzdevumu pēc ceļa id                                               |

### Uzdevuma izveide

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

Atbilde `201`:

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

### Plāna apstiprināšana

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Papildu ziņojuma nosūtīšana

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Atcelšana (tikai lokālais statuss)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` lokālajā datubāzē maina `status` uz `"cancelled"`, bet **neizsauc**
augšupējo pakalpojuma sniedzēju — `CloudAgentBase` nav pārtraukšanas RPC. Lai apturētu
augšupējā pakalpojuma rēķinu aprēķinu, pārtrauciet uzdevumu paša pakalpojuma sniedzēja konsolē.

## REST API — mākoņpakalpojumu sniedzēju integrācija

Šie palīgendpunkti direktorijā `src/app/api/cloud/` tiek izmantoti attālinātajos klientos
(CLI, Electron lietotnē vai sinhronizācijas procesos), lai nolasītu pakalpojumu sniedzēju savienojumu metadatus
un atrisinātu modeļu aizstājvārdus. To autentifikācijai tiek izmantota **parasta API atslēga**
(ar `validateApiKey`), nevis uzdevumu galapunktos izmantotā pārvaldības autentifikācija.

| Metode | Ceļš                            | Mērķis                                                                               |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------ |
| POST   | `/api/cloud/auth`               | Validēt API atslēgu, atgriezt maskētus savienojuma metadatus un modeļu aizstājvārdus |
| PUT    | `/api/cloud/credentials/update` | Atjaunināt `accessToken` / `refreshToken` / `expiresAt`                              |
| POST   | `/api/cloud/model/resolve`      | Atrisināt modeļa aizstājvārdu uz `{ provider, model }`                               |
| GET    | `/api/cloud/models/alias`       | Uzskaitīt visus modeļu aizstājvārdus                                                 |
| PUT    | `/api/cloud/models/alias`       | Iestatīt modeļa aizstājvārdu (un automātiski sinhronizēt ar Cloud, ja iespējots)     |

`/api/cloud/auth` nekad neatgriež neapstrādātus `apiKey` / `accessToken` / `refreshToken`. Tas
atgriež `hasApiKey`, `hasAccessToken`, `hasRefreshToken` un maskētu priekšskatījumu
(`maskedApiKey`: pirmās 4 rakstzīmes + `****` + pēdējās 4 rakstzīmes).

## Akreditācijas datu noteikšana

`getCloudAgentCredentials(providerId)` failā `src/lib/cloudAgent/api.ts`:

1. Ielādē aktīvos pakalpojumu sniedzēju savienojumus, izmantojot `getProviderConnections({ provider: providerId, isActive: true })`.
2. Katram savienojumam priekšroka tiek dota `apiKey` (ar noņemtām atstarpēm). Ja tā nav pieejama, izmanto `accessToken`.
3. Atgriež pirmo netukšo pilnvaru, kas ietverta objektā `{ apiKey: token }`.
4. Atgriež `null`, ja netiek atrasta neviena izmantojama pilnvara — API atbild ar `400` un
   `"Mākoņa aģenta pakalpojumu sniedzējam nav konfigurēti aktīvi akreditācijas dati: <id>"`.

Tas nozīmē, ka mākoņa aģenti atkārtoti izmanto to pašu pakalpojumu sniedzēju savienojumu tabulu, ko parastie LLM
pakalpojumu sniedzēji. Lai iespējotu Jules, izveidojiet aktīvu savienojumu ar `provider: "jules"`
un aizpildītu `apiKey`.

## Informācijas panelis

Avots: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

React lapa ar `"use client"`, kas:

- Uzskaita uzdevumus (periodiski pieprasot `GET /api/v1/agents/tasks`).
- Iesniedz jaunus uzdevumus, izmantojot veidlapu, kas atbilst `CreateCloudAgentTaskSchema`.
- Rāda statusu emblēmas (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) un attēlo `activities[]` laika skalu.
- Parāda `result.prUrl` / `commitMessage` / `summary`, ja `status === "completed"`.

## Integrācija ar A2A

Mākoņa aģentus var padarīt pieejamus kā A2A prasmes, reģistrējot A2A prasmi, kas deleģē
tās `tasks/send` apstrādātāju uz `getAgent(...).createTask(...)` un pārveido A2A uzdevumu
statusa notikumus atbilstoši JSON-RPC 2.0 protokolam. Skatiet [A2A-SERVER.md](./A2A-SERVER.md).

## Jauna mākoņa aģenta pievienošana

1. Izveidojiet `src/lib/cloudAgent/agents/<name>.ts`, kas paplašina `CloudAgentBase`.
2. Implementējiet `createTask`, `getStatus`, `approvePlan` (vai izraisiet izņēmumu, ja nav piemērojams),
   `sendMessage`, `listSources`. Statusa normalizēšanai izmantojiet `this.mapStatus(...)`.
3. Reģistrējiet to failā `src/lib/cloudAgent/registry.ts` ar stabilu `providerId`.
4. Paplašiniet `providerId` literāļu apvienojumu failā `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` un `CreateCloudAgentTaskSchema`).
5. Pievienojiet pakalpojumu sniedzēju failā `src/shared/constants/providers.ts`, ja tam nepieciešams savienojuma
   ieraksts. Uz OAuth balstītiem pakalpojumu sniedzējiem nepieciešams arī `src/lib/oauth/providers/`.
6. Pievienojiet testus direktorijā `tests/unit/cloud-agent-*.test.ts`.
7. Atjauniniet šo dokumentu un informācijas paneļa konstanti `CLOUD_AGENTS`.

## Konfigurācija

| Vides mainīgais  | Nolūks                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `DATA_DIR`       | SQLite datubāzes, kurā tiek glabāti `cloud_agent_tasks`, atrašanās vieta                      |
| `JWT_SECRET`     | Nepieciešams pārvaldības autentifikācijai uzdevumu galapunktos                                |
| `API_KEY_SECRET` | Nepieciešams pakalpojumu sniedzēju savienojumu akreditācijas datu šifrēšanai glabāšanas laikā |

Pašlaik nav neviena Cloud-Agent specifiska vides mainīgā — visi noslēpumi tiek glabāti
tabulā `provider_connections`.

## Skatiet arī

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Avots: `src/lib/cloudAgent/`
- Maršruti: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Informācijas panelis: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
