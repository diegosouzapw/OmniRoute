# Cloud Agents (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Sandhedskilde:** `src/lib/cloudAgent/` og `src/app/api/v1/agents/tasks/`
> **Senest opdateret:** 2026-06-28 — v3.8.40 (opdatering af frontmatter; 4 agenter inkl. cursor-cloud)

OmniRoute orkestrerer tredjeparts-kodningsagenter, der hostes i skyen (Codex Cloud, Cursor,
Devin, Jules), som langvarige opgaver. Hver agent er indkapslet bag en ensartet grænseflade, så
klienter kan indsende en prompt + repository-URL og modtage resultater uden at skulle håndtere
udbyderspecifikke API'er.

En Cloud Agent-opgave er **ikke** en almindelig chatfuldførelse. Det er en varig arbejdsenhed
med flere trin, der kan tage fra minutter til timer, kan producere en pull request som sit
artefakt og understøtter opfølgende beskeder samt (hos visse udbydere) godkendelsesporte for planer.

![Cloud Agent-opgavens livscyklus](../diagrams/exported/cloud-agent-flow.svg)

> Kilde: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Understøttede agenter

| Udbyder-ID     | Klasse             | Kilde                                 | Overordnet basis-URL                    | Plangodkendelse  |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ja               |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ja               |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nej (automatisk) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nej (automatisk) |

Register: `src/lib/cloudAgent/registry.ts` — eksporterer `getAgent(providerId)`,
`getAvailableAgents()` og `isCloudAgentProvider(providerId)`. Registeret er en
simpel `Record<string, CloudAgentBase>` i hukommelsen, som udfyldes ved modulindlæsning.

## Arkitektur

```
Klient (dashboard / CLI / API)
  → POST /api/v1/agents/tasks (administrationsgodkendelse påkrævet)
    → validering med CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ henter fra getProviderConnections({ provider, isActive: true })
         (apiKey først, med accessToken som reserve)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST til den overordnede udbyders API
      └─ returnerer CloudAgentTask med internt id + externalId
    → insertCloudAgentTask(...) i cloud_agent_tasks (SQLite)

Polling (doven synkronisering ved læsning):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // opdaterer status + aktiviteter
    → updateCloudAgentTask(...) med ny status, resultat og completed_at
    → returnerer den serialiserede opgave

Interaktioner:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        for "approve"
    → agent.sendMessage(externalId, message, credentials) for "message"
    → status ændres til "cancelled"                     for "cancel" (kun lokalt)
```

Synkronisering er **doven**: Status opdateres fra den overordnede udbyder ved hver
`GET /tasks/[id]`. Der findes ingen baggrundspoller. Dashboards, der har brug for en
opdateret tilstand, bør polle GET-slutpunktet med et passende interval.

## `CloudAgentBase`-grænseflade

Kilde: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristisk upstream-streng → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` udløser med vilje en undtagelse — Codex Cloud planlægger automatisk og har
ingen godkendelsesport. `CodexCloudAgent.listSources` returnerer `[]`.

`CursorCloudAgent` styrer Cursors Background / Cloud Agents gennem den officielle REST-
API (`api.cursor.com/v0`) med en **API-nøgle til en bruger- eller tjenestekonto** — det sikrere,
officielle alternativ til at genbruge Cursor IDE's OAuth-session (udbyderen `cursor`,
som har en advarsel om risiko for udelukkelse). Det er en almindelig REST-adapter (ingen oprindelig
`@cursor/sdk`-afhængighed). `approvePlan` udløser en undtagelse (Cursor-agenter kører autonomt); `listSources` viser
de repositories, som nøglen har adgang til. Cursor returnerer status-enums med STORE BOGSTAVER
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), som eksplicit knyttes til den fælles
`CloudAgentStatus`. `baseUrl` kan tilsidesættes for hvert legitimationssæt, så API-versionen/-stien kan
rettes uden en kodeændring.

## Domænetyper

Kilde: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // skal være en gyldig URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekunder, positivt heltal
  cost?: number; // positivt kommatal
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // internt `task_...`-id
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // upstream-udbyderens id
  status: CloudAgentStatus;
  prompt: string; // 1..10000 tegn
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

Valideringsskemaer (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`)
eksporteres sammen med typerne og bruges af route-handlerne.

## Database

Kilde: `src/lib/cloudAgent/db.ts` — tabellen oprettes først efter behov via
`createCloudAgentTaskTable()` (kaldes også fra `src/lib/cloudAgent/index.ts` ved
modulimport).

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

`updateCloudAgentTask` håndhæver en **hvidliste over kolonner** for at forhindre SQL-injektion:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Alle andre nøgler i den delvise opdatering ignoreres uden varsel.

## REST API — Opgavens livscyklus

**Godkendelse:** Alle `/api/v1/agents/tasks*`-endpoints kræver **administrationsgodkendelse**
(`requireCloudAgentManagementAuth` ombryder `requireManagementAuth` fra
`src/lib/api/requireManagementAuth`). Dette håndhæves efter commit `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metode  | Sti                           | Formål                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS-preflight                                                    |
| GET     | `/api/v1/agents/tasks`        | Vis opgaver (filter: `provider`, `status`, `limit≤500`)           |
| POST    | `/api/v1/agents/tasks`        | Opret opgave (sender til upstream + gemmer)                       |
| DELETE  | `/api/v1/agents/tasks?id=...` | Slet opgave efter forespørgsels-id (annullerer **ikke** upstream) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS-preflight                                                    |
| GET     | `/api/v1/agents/tasks/[id]`   | Læs opgave + synkroniser status fra upstream efter behov          |
| POST    | `/api/v1/agents/tasks/[id]`   | Handling: `approve` / `message` / `cancel`                        |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Slet opgave efter sti-id                                          |

### Opret en opgave

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

Svar `201`:

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

### Godkend en plan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Send en opfølgende besked

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Annuller (kun lokal status)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` ændrer `status` til `"cancelled"` i den lokale database, men kalder **ikke**
upstream-udbyderen — der findes ingen RPC til afbrydelse i `CloudAgentBase`. For at stoppe
faktureringen upstream skal opgaven afsluttes i udbyderens egen konsol.

## REST API — integration med cloududbydere

Disse hjælpeendpoints under `src/app/api/cloud/` bruges af fjernklienter
(CLI'en, Electron-appen eller synkroniseringsprocesser) til at læse metadata om udbyderforbindelser
og fortolke modelaliasser. De godkendes med en **almindelig API-nøgle**
(via `validateApiKey`), ikke den administrationsgodkendelse, som opgaveendpoints bruger.

| Metode | Sti                             | Formål                                                                      |
| ------ | ------------------------------- | --------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Valider API-nøglen, returner maskerede forbindelsesmetadata + modelaliasser |
| PUT    | `/api/cloud/credentials/update` | Opdater `accessToken` / `refreshToken` / `expiresAt`                        |
| POST   | `/api/cloud/model/resolve`      | Fortolk en modelalias som `{ provider, model }`                             |
| GET    | `/api/cloud/models/alias`       | Vis alle modelaliasser                                                      |
| PUT    | `/api/cloud/models/alias`       | Angiv en modelalias (og synkroniser automatisk til Cloud, hvis aktiveret)   |

`/api/cloud/auth` returnerer aldrig rå `apiKey` / `accessToken` / `refreshToken`. Den
returnerer `hasApiKey`, `hasAccessToken`, `hasRefreshToken` og en maskeret forhåndsvisning
(`maskedApiKey`: de første 4 + `****` + de sidste 4).

## Fortolkning af legitimationsoplysninger

`getCloudAgentCredentials(providerId)` i `src/lib/cloudAgent/api.ts`:

1. Indlæser aktive udbyderforbindelser via `getProviderConnections({ provider: providerId, isActive: true })`.
2. For hver forbindelse foretrækkes `apiKey` (uden indledende og afsluttende mellemrum). Hvis den ikke findes, bruges `accessToken`.
3. Returnerer den første ikke-tomme token pakket som `{ apiKey: token }`.
4. Returnerer `null`, hvis der ikke findes en anvendelig token — API'et svarer med `400` og
   `"Ingen aktive legitimationsoplysninger konfigureret for cloudagentudbyderen: <id>"`.

Det betyder, at Cloud Agents genbruger den samme tabel over udbyderforbindelser som almindelige LLM-udbydere.
For at aktivere Jules skal du oprette en aktiv forbindelse med `provider: "jules"`
og en udfyldt `apiKey`.

## Dashboard

Kilde: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

En React-side med `"use client"`, som:

- Viser opgaver (hentes regelmæssigt via `GET /api/v1/agents/tasks`).
- Indsender nye opgaver via en formular, der knyttes til `CreateCloudAgentTaskSchema`.
- Viser statusmærker (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) og gengiver tidslinjen `activities[]`.
- Viser `result.prUrl` / `commitMessage` / `summary`, når `status === "completed"`.

## Integration med A2A

Cloud Agents kan eksponeres som A2A-færdigheder ved at registrere en A2A-færdighed, der delegerer
sin `tasks/send`-håndtering til `getAgent(...).createTask(...)` og oversætter A2A-opgavers
statushændelser til JSON-RPC 2.0-protokollen. Se [A2A-SERVER.md](./A2A-SERVER.md).

## Tilføjelse af en ny cloudagent

1. Opret `src/lib/cloudAgent/agents/<name>.ts`, der udvider `CloudAgentBase`.
2. Implementer `createTask`, `getStatus`, `approvePlan` (eller udløs en fejl, hvis det ikke er relevant),
   `sendMessage`, `listSources`. Brug `this.mapStatus(...)` til statusnormalisering.
3. Registrer den i `src/lib/cloudAgent/registry.ts` under et stabilt `providerId`.
4. Udvid literal-unionen `providerId` i `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` og `CreateCloudAgentTaskSchema`).
5. Føj udbyderen til `src/shared/constants/providers.ts`, hvis den kræver en forbindelsespost.
   OAuth-baserede udbydere kræver også `src/lib/oauth/providers/`.
6. Tilføj tests under `tests/unit/cloud-agent-*.test.ts`.
7. Opdater dette dokument og dashboardets `CLOUD_AGENTS`-konstant.

## Konfiguration

| Miljøvariabel    | Formål                                                                                |
| ---------------- | ------------------------------------------------------------------------------------- |
| `DATA_DIR`       | Placering af SQLite-databasen, der indeholder `cloud_agent_tasks`                     |
| `JWT_SECRET`     | Påkrævet til administrationsgodkendelse på opgaveslutpunkter                          |
| `API_KEY_SECRET` | Påkrævet for at kryptere legitimationsoplysninger til udbyderforbindelser ved lagring |

Der findes i øjeblikket ingen miljøvariabler, der er specifikke for Cloud-Agent — alle hemmeligheder findes i
tabellen `provider_connections`.

## Se også

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Kilde: `src/lib/cloudAgent/`
- Ruter: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Kontrolpanel: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
