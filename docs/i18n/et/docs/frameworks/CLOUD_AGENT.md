# Cloud Agents (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Tõeallikas:** `src/lib/cloudAgent/` ja `src/app/api/v1/agents/tasks/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40 (frontmatter'i värskendus; 4 agenti, sh cursor-cloud)

OmniRoute orkestreerib kolmandate osapoolte pilvemajutusega programmeerimisagente (Codex Cloud, Cursor,
Devin, Jules) pikaajaliste ülesannetena. Iga agent on ümbritsetud ühtse liidesega, et
kliendid saaksid esitada viiba + repositooriumi URL-i ja saada tulemusi ilma
teenusepakkujapõhiste API-dega tegelemata.

Cloud Agenti ülesanne **ei ole** tavaline vestluse lõpuleviimine. See on püsiv, mitmeetapiline
tööüksus, mille täitmine võib võtta minuteid kuni tunde, mille artefaktiks võib olla Pull Request
ja mis toetab järelteateid ning (mõne teenusepakkuja puhul) plaani kinnitamise kontrollpunkte.

![Cloud Agenti ülesande elutsükkel](../diagrams/exported/cloud-agent-flow.svg)

> Allikas: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Toetatud agendid

| Teenusepakkuja ID | Klass              | Lähtekood                             | Ülesvoolu baas-URL                      | Plaani kinnitamine |
| ----------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------ |
| `jules`           | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Jah                |
| `devin`           | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Jah                |
| `codex-cloud`     | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Ei (automaatne)    |
| `cursor-cloud`    | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Ei (automaatne)    |

Register: `src/lib/cloudAgent/registry.ts` — ekspordib funktsioonid `getAgent(providerId)`,
`getAvailableAgents()` ja `isCloudAgentProvider(providerId)`. Register on
lihtne mälusisene `Record<string, CloudAgentBase>`, mis täidetakse mooduli laadimisel.

## Arhitektuur

```
Klient (töölaud / CLI / API)
  → POST /api/v1/agents/tasks (halduse autentimine on nõutav)
    → CreateCloudAgentTaskSchema valideerimine (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ hangib andmed funktsioonist getProviderConnections({ provider, isActive: true })
         (esmalt apiKey, varuvariandina accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST ülesvoolu teenusepakkuja API-le
      └─ tagastab CloudAgentTask-i koos sisemise id ja externalId-ga
    → insertCloudAgentTask(...) tabelisse cloud_agent_tasks (SQLite)

Küsitlemine (laisk sünkroonimine lugemisel):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // värskendab olekut + tegevusi
    → updateCloudAgentTask(...) uue oleku, tulemuse ja completed_at väärtusega
    → tagastab serialiseeritud ülesande

Interaktsioonid:
  POST /api/v1/agents/tasks/[id]  keha: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        tegevuse "approve" korral
    → agent.sendMessage(externalId, message, credentials) tegevuse "message" korral
    → olekuks määratakse "cancelled"                    tegevuse "cancel" korral (ainult lokaalselt)
```

Sünkroonimine on **laisk**: olekut värskendatakse ülesvoolu teenusest iga `GET /tasks/[id]`
päringu korral. Taustal töötavat küsitlejat ei ole. Värsket olekut vajavad töölauad peaksid GET-
lõpp-punkti mõistliku intervalliga küsitlema.

## Liides `CloudAgentBase`

Allikas: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristiline ülesvoolu string → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` viskab tahtlikult erindi — Codex Cloud koostab plaani automaatselt ja sellel
puudub kinnitusetapp. `CodexCloudAgent.listSources` tagastab `[]`.

`CursorCloudAgent` juhib Cursori tausta-/pilveagente selle ametliku REST
API (`api.cursor.com/v0`) kaudu, kasutades **kasutaja või teenusekonto API-võtit** — see on turvalisem,
esimese osapoole alternatiiv Cursor IDE OAuth-seansi taaskasutamisele (pakkuja `cursor`,
millega kaasneb blokeerimisohu hoiatus). See on lihtne REST-adapter (puudub `@cursor/sdk` natiivne
sõltuvus). `approvePlan` viskab erindi (Cursori agendid töötavad autonoomselt); `listSources` loetleb
võtmega ligipääsetavad hoidlad. Cursor tagastab SUURTÄHTEDES olekuloendid
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), mis vastendatakse sõnaselgelt ühisele
`CloudAgentStatus`-ele. `baseUrl` on iga mandaadi puhul ülekirjutatav, et API versiooni/teed saaks
parandada ilma koodi muutmata.

## Domeenitüübid

Allikas: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // peab olema kehtiv URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekundid, positiivne täisarv
  cost?: number; // positiivne ujukomaarv
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // sisemine `task_...` ID
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ülesvoolu pakkuja ID
  status: CloudAgentStatus;
  prompt: string; // 1..10000 märki
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

Valideerimisskeemid (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) eksporditakse
koos tüüpidega ja marsruudikäitlejad kasutavad neid.

## Andmebaas

Allikas: `src/lib/cloudAgent/db.ts` — tabel luuakse vajaduspõhiselt funktsiooni
`createCloudAgentTaskTable()` kaudu (seda kutsutakse ka failist `src/lib/cloudAgent/index.ts`
mooduli importimisel).

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

`updateCloudAgentTask` rakendab SQL-süstide vältimiseks **veergude lubatud loendit**:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Kõik muud osalise värskenduse võtmed jäetakse vaikimisi välja.

## REST API — ülesande elutsükkel

**Autentimine:** Kõik `/api/v1/agents/tasks*` lõpp-punktid nõuavad **halduse autentimist**
(`requireCloudAgentManagementAuth` mähistab funktsiooni `requireManagementAuth` failist
`src/lib/api/requireManagementAuth`). Seda rakendatakse pärast commiti `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Meetod  | Tee                           | Otstarve                                                          |
| ------- | ----------------------------- | ----------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS-i eelpäring                                                  |
| GET     | `/api/v1/agents/tasks`        | Ülesannete loend (filter: `provider`, `status`, `limit≤500`)      |
| POST    | `/api/v1/agents/tasks`        | Ülesande loomine (edastab ülesvoolu ja salvestab)                 |
| DELETE  | `/api/v1/agents/tasks?id=...` | Ülesande kustutamine päringu id järgi (**ei** tühista ülesvoolu)  |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS-i eelpäring                                                  |
| GET     | `/api/v1/agents/tasks/[id]`   | Ülesande lugemine + oleku vajaduspõhine sünkroonimine ülesvoolust |
| POST    | `/api/v1/agents/tasks/[id]`   | Toiming: `approve` / `message` / `cancel`                         |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Ülesande kustutamine tee id järgi                                 |

### Ülesande loomine

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Paranda viga failis src/foo.ts, mille tõttu parser tagastab null-väärtuse",
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

Vastus `201`:

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

### Plaani kinnitamine

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Järelteate saatmine

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Lisa parserile ka ühiktest"}'
```

### Tühistamine (ainult kohalik olek)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` muudab kohalikus andmebaasis välja `status` väärtuseks `"cancelled"`, kuid
**ei** kutsu ülesvoolu teenusepakkujat — `CloudAgentBase` ei sisalda katkestamise RPC-d.
Ülesvoolu arvelduse peatamiseks lõpetage ülesanne teenusepakkuja enda konsoolis.

## REST API — pilveteenuse pakkujate integratsioon

Neid abipunkte kataloogis `src/app/api/cloud/` kasutavad kaugkliendid
(CLI, Electroni rakendus või sünkroonimistöötajad), et lugeda teenusepakkuja ühenduse metaandmeid
ja lahendada mudelite aliaseid. Need autentitakse **tavalise API-võtmega**
(`validateApiKey` kaudu), mitte ülesannete lõpp-punktides kasutatava haldusautentimisega.

| Meetod | Tee                             | Eesmärk                                                                             |
| ------ | ------------------------------- | ----------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Valideerib API-võtme ning tagastab maskitud ühenduse metaandmed ja mudelite aliased |
| PUT    | `/api/cloud/credentials/update` | Värskendab `accessToken` / `refreshToken` / `expiresAt`                             |
| POST   | `/api/cloud/model/resolve`      | Lahendab mudeli aliase väärtuseks `{ provider, model }`                             |
| GET    | `/api/cloud/models/alias`       | Loetleb kõik mudelite aliased                                                       |
| PUT    | `/api/cloud/models/alias`       | Määrab mudeli aliase (ja sünkroonib selle lubamise korral automaatselt pilvega)     |

`/api/cloud/auth` ei tagasta kunagi `apiKey` / `accessToken` / `refreshToken` töötlemata väärtusi. See
tagastab `hasApiKey`, `hasAccessToken`, `hasRefreshToken` ja maskitud eelvaate
(`maskedApiKey`: esimesed 4 + `****` + viimased 4).

## Mandaatide lahendamine

`getCloudAgentCredentials(providerId)` failis `src/lib/cloudAgent/api.ts`:

1. Laadib aktiivsed teenusepakkuja ühendused funktsiooniga `getProviderConnections({ provider: providerId, isActive: true })`.
2. Eelistab iga ühenduse puhul `apiKey` väärtust (kärbitud). Selle puudumisel kasutab `accessToken` väärtust.
3. Tagastab esimese mittetühja loa kujul `{ apiKey: token }`.
4. Tagastab `null`, kui kasutatavat luba ei leita — API vastab olekukoodiga `400` ja teatega
   `"Pilveagendi teenusepakkuja jaoks pole aktiivseid mandaate seadistatud: <id>"`.

See tähendab, et pilveagendid kasutavad sama teenusepakkuja ühenduste tabelit nagu tavalised LLM-i
teenusepakkujad. Julesi lubamiseks looge aktiivne ühendus väärtusega `provider: "jules"`
ja täidetud väljaga `apiKey`.

## Töölaud

Lähtekood: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Reacti leht direktiiviga `"use client"`, mis:

- Loetleb ülesanded (küsitledes perioodiliselt `GET /api/v1/agents/tasks`).
- Edastab vormi kaudu uusi ülesandeid, mis vastavad skeemile `CreateCloudAgentTaskSchema`.
- Kuvab olekumärgendeid (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) ja renderdab ajajoone `activities[]`.
- Kuvab `result.prUrl` / `commitMessage` / `summary`, kui `status === "completed"`.

## Integratsioon A2A-ga

Pilveagente saab avaldada A2A oskustena, registreerides A2A oskuse, mis delegeerib
oma `tasks/send` töötleja funktsioonile `getAgent(...).createTask(...)` ja teisendab A2A ülesande
olekusündmused JSON-RPC 2.0 protokolli. Vaadake [A2A-SERVER.md](./A2A-SERVER.md).

## Uue pilveagendi lisamine

1. Looge `src/lib/cloudAgent/agents/<name>.ts`, mis laiendab klassi `CloudAgentBase`.
2. Rakendage `createTask`, `getStatus`, `approvePlan` (või väljastage erind, kui see pole asjakohane),
   `sendMessage`, `listSources`. Kasutage oleku normaliseerimiseks `this.mapStatus(...)`.
3. Registreerige see failis `src/lib/cloudAgent/registry.ts` stabiilse `providerId` all.
4. Laiendage failis `src/lib/cloudAgent/types.ts` literaalide ühendit `providerId`
   (`CloudAgentTask.providerId` ja `CreateCloudAgentTaskSchema`).
5. Lisage teenusepakkuja faili `src/shared/constants/providers.ts`, kui see vajab ühenduse
   kirjet. OAuth-põhised teenusepakkujad vajavad ka kataloogi `src/lib/oauth/providers/`.
6. Lisage testid asukohta `tests/unit/cloud-agent-*.test.ts`.
7. Värskendage seda dokumenti ja töölaua konstanti `CLOUD_AGENTS`.

## Konfiguratsioon

| Keskkonnamuutuja | Eesmärk                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| `DATA_DIR`       | `cloud_agent_tasks` sisaldava SQLite'i andmebaasi asukoht              |
| `JWT_SECRET`     | Nõutav ülesannete lõpp-punktide haldusautentimiseks                    |
| `API_KEY_SECRET` | Nõutav teenusepakkuja ühenduse identimisteabe krüptimiseks jõudeolekus |

Praegu pole ühtegi Cloud-Agentile spetsiifilist keskkonnamuutujat — kõik saladused asuvad tabelis
`provider_connections`.

## Vaata ka

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Lähtekood: `src/lib/cloudAgent/`
- Marsruudid: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Töölaud: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
