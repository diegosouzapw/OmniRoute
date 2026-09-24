# Cloud Agents (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Sanningskälla:** `src/lib/cloudAgent/` och `src/app/api/v1/agents/tasks/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40 (uppdatering av frontmatter; 4 agenter inkl. cursor-cloud)

OmniRoute orkestrerar molnbaserade kodningsagenter från tredje part (Codex Cloud, Cursor,
Devin, Jules) som långvariga uppgifter. Varje agent kapslas in bakom ett enhetligt gränssnitt så att
klienter kan skicka en prompt + URL till ett kodarkiv och ta emot resultat utan att behöva hantera
leverantörsspecifika API:er.

En Cloud Agent-uppgift är **inte** en vanlig chattkomplettering. Det är en beständig
arbetsenhet i flera steg som kan ta allt från minuter till timmar, kan skapa en pull request som sin
artefakt och stöder uppföljningsmeddelanden samt (hos vissa leverantörer) godkännandesteg för planer.

![Livscykel för en Cloud Agent-uppgift](../diagrams/exported/cloud-agent-flow.svg)

> Källa: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Agenter som stöds

| Leverantörs-ID | Klass              | Källa                                 | Överordnad bas-URL                      | Plangodkännande   |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ja                |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ja                |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nej (automatiskt) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nej (automatiskt) |

Register: `src/lib/cloudAgent/registry.ts` — exporterar `getAgent(providerId)`,
`getAvailableAgents()` och `isCloudAgentProvider(providerId)`. Registret är ett
enkelt minnesbaserat `Record<string, CloudAgentBase>` som fylls när modulen läses in.

## Arkitektur

```
Klient (instrumentpanel / CLI / API)
  → POST /api/v1/agents/tasks (hanteringsautentisering krävs)
    → validering med CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ hämtar från getProviderConnections({ provider, isActive: true })
         (apiKey först, med accessToken som reserv)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST till den överordnade leverantörens API
      └─ returnerar CloudAgentTask med internt id + externalId
    → insertCloudAgentTask(...) till cloud_agent_tasks (SQLite)

Avsökning (lat synkronisering vid läsning):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // uppdaterar status + aktiviteter
    → updateCloudAgentTask(...) med ny status, nytt resultat och completed_at
    → returnerar serialiserad uppgift

Interaktioner:
  POST /api/v1/agents/tasks/[id]  innehåll: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        för "approve"
    → agent.sendMessage(externalId, message, credentials) för "message"
    → status ändras till "cancelled"                    för "cancel" (endast lokalt)
```

Synkroniseringen är **lat**: statusen uppdateras från den överordnade leverantören vid varje `GET /tasks/[id]`.
Det finns ingen bakgrundsprocess för avsökning. Instrumentpaneler som behöver aktuell status bör anropa GET-slutpunkten
med ett lämpligt intervall.

## Gränssnittet `CloudAgentBase`

Källa: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristisk uppströmssträng → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` utlöser avsiktligt ett undantag — Codex Cloud planerar automatiskt och har
ingen godkännandegrind. `CodexCloudAgent.listSources` returnerar `[]`.

`CursorCloudAgent` styr Cursors Background / Cloud Agents via dess officiella REST-
API (`api.cursor.com/v0`) med en **API-nyckel för en användare eller ett tjänstekonto** — det säkrare
förstahandsalternativet till att återanvända Cursor IDE:s OAuth-session (leverantören `cursor`,
som har en varning om avstängningsrisk). Det är en ren REST-adapter (inget inbyggt
beroende av `@cursor/sdk`). `approvePlan` utlöser ett undantag (Cursor-agenter körs autonomt); `listSources` listar
de kodförråd som nyckeln har åtkomst till. Cursor returnerar status-enumvärden med VERSALER
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), som uttryckligen mappas till den gemensamma
`CloudAgentStatus`. `baseUrl` kan åsidosättas per autentiseringsuppgift så att API-versionen/sökvägen kan
korrigeras utan en kodändring.

## Domäntyper

Källa: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // måste vara en giltig URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekunder, positivt heltal
  cost?: number; // positivt flyttal
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
  externalId?: string; // uppströmsleverantörens id
  status: CloudAgentStatus;
  prompt: string; // 1..10000 tecken
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

Valideringsscheman (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) exporteras
tillsammans med typerna och används av routens hanterare.

## Databas

Källa: `src/lib/cloudAgent/db.ts` — tabellen skapas vid behov via
`createCloudAgentTaskTable()` (anropas även från `src/lib/cloudAgent/index.ts` vid
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

`updateCloudAgentTask` tillämpar en **vitlista för kolumner** för att förhindra SQL-injektion:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Alla andra nycklar i den partiella uppdateringen ignoreras utan meddelande.

## REST-API — uppgiftens livscykel

**Autentisering:** Alla ändpunkter under `/api/v1/agents/tasks*` kräver
**hanteringsautentisering** (`requireCloudAgentManagementAuth` omsluter
`requireManagementAuth` från `src/lib/api/requireManagementAuth`). Detta tillämpas efter
commit `588a0333` (_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metod   | Sökväg                        | Syfte                                                       |
| ------- | ----------------------------- | ----------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS-förfrågan                                              |
| GET     | `/api/v1/agents/tasks`        | Lista uppgifter (filter: `provider`, `status`, `limit≤500`) |
| POST    | `/api/v1/agents/tasks`        | Skapa uppgift (skickar till uppströmsleverantören + sparar) |
| DELETE  | `/api/v1/agents/tasks?id=...` | Ta bort uppgift via fråge-id (avbryter **inte** uppströms)  |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS-förfrågan                                              |
| GET     | `/api/v1/agents/tasks/[id]`   | Läs uppgift + synkronisera status vid behov från uppströms  |
| POST    | `/api/v1/agents/tasks/[id]`   | Åtgärd: `approve` / `message` / `cancel`                    |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Ta bort uppgift via sökvägs-id                              |

### Skapa en uppgift

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

### Godkänn en plan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Skicka ett uppföljningsmeddelande

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Avbryt (endast lokal status)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` ändrar `status` till `"cancelled"` i den lokala databasen men anropar **inte**
uppströmsleverantören — det finns ingen RPC för avbrott i `CloudAgentBase`. För att stoppa
debiteringen uppströms måste uppgiften avslutas i leverantörens egen konsol.

## REST API — infrastruktur för molnleverantörer

Dessa kompletterande slutpunkter under `src/app/api/cloud/` används av fjärrklienter
(CLI:n, Electron-appen eller synkroniseringsprocesser) för att läsa anslutningsmetadata
för leverantörer och matcha modellalias. De autentiseras med en **vanlig API-nyckel**
(via `validateApiKey`), inte med den administrationsautentisering som används av uppgiftsslutpunkterna.

| Metod | Sökväg                          | Syfte                                                                         |
| ----- | ------------------------------- | ----------------------------------------------------------------------------- |
| POST  | `/api/cloud/auth`               | Validera API-nyckeln och returnera maskerad anslutningsmetadata + modellalias |
| PUT   | `/api/cloud/credentials/update` | Uppdatera `accessToken` / `refreshToken` / `expiresAt`                        |
| POST  | `/api/cloud/model/resolve`      | Matcha ett modellalias till `{ provider, model }`                             |
| GET   | `/api/cloud/models/alias`       | Lista alla modellalias                                                        |
| PUT   | `/api/cloud/models/alias`       | Ange ett modellalias (och synkronisera automatiskt till molnet om aktiverat)  |

`/api/cloud/auth` returnerar aldrig obearbetade `apiKey` / `accessToken` / `refreshToken`. Den
returnerar `hasApiKey`, `hasAccessToken`, `hasRefreshToken` och en maskerad förhandsvisning
(`maskedApiKey`: de första 4 + `****` + de sista 4).

## Matchning av autentiseringsuppgifter

`getCloudAgentCredentials(providerId)` i `src/lib/cloudAgent/api.ts`:

1. Läser in aktiva leverantörsanslutningar via `getProviderConnections({ provider: providerId, isActive: true })`.
2. Föredrar `apiKey` (rensad från omgivande blanksteg) för varje anslutning. Använder annars `accessToken`.
3. Returnerar den första icke-tomma token innesluten som `{ apiKey: token }`.
4. Returnerar `null` om ingen användbar token hittas — API:t svarar med `400` och
   `"Inga aktiva autentiseringsuppgifter har konfigurerats för molnagentleverantören: <id>"`.

Det innebär att molnagenter återanvänder samma tabell för leverantörsanslutningar som vanliga LLM-
leverantörer. För att aktivera Jules skapar du en aktiv anslutning med `provider: "jules"`
och ett ifyllt `apiKey`.

## Kontrollpanel

Källa: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

En React-sida med `"use client"` som:

- Listar uppgifter (avfrågas regelbundet via `GET /api/v1/agents/tasks`).
- Skickar nya uppgifter via ett formulär som mappas till `CreateCloudAgentTaskSchema`.
- Visar statusmärken (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) och renderar tidslinjen `activities[]`.
- Visar `result.prUrl` / `commitMessage` / `summary` när `status === "completed"`.

## Integrering med A2A

Molnagenter kan exponeras som A2A-funktioner genom att registrera en A2A-funktion som delegerar
sin `tasks/send`-hanterare till `getAgent(...).createTask(...)` och översätter A2A-uppgiftens
statushändelser till JSON-RPC 2.0-protokollet. Se [A2A-SERVER.md](./A2A-SERVER.md).

## Lägga till en ny molnagent

1. Skapa `src/lib/cloudAgent/agents/<name>.ts` som utökar `CloudAgentBase`.
2. Implementera `createTask`, `getStatus`, `approvePlan` (eller utlös ett undantag om ej tillämpligt),
   `sendMessage`, `listSources`. Använd `this.mapStatus(...)` för statusnormalisering.
3. Registrera den i `src/lib/cloudAgent/registry.ts` under ett stabilt `providerId`.
4. Utöka literalunionen för `providerId` i `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` och `CreateCloudAgentTaskSchema`).
5. Lägg till leverantören i `src/shared/constants/providers.ts` om den behöver en anslutningspost.
   OAuth-baserade leverantörer behöver även `src/lib/oauth/providers/`.
6. Lägg till tester under `tests/unit/cloud-agent-*.test.ts`.
7. Uppdatera det här dokumentet och kontrollpanelens konstant `CLOUD_AGENTS`.

## Konfiguration

| Miljövariabel    | Syfte                                                                             |
| ---------------- | --------------------------------------------------------------------------------- |
| `DATA_DIR`       | Plats för SQLite-databasen som innehåller `cloud_agent_tasks`                     |
| `JWT_SECRET`     | Krävs för hanteringsautentisering på uppgiftsslutpunkter                          |
| `API_KEY_SECRET` | Krävs för att kryptera autentiseringsuppgifter för leverantörsanslutningar i vila |

Det finns för närvarande inga miljövariabler specifika för Cloud-Agent – alla hemligheter lagras i tabellen
`provider_connections`.

## Se även

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Källa: `src/lib/cloudAgent/`
- Rutter: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Instrumentpanel: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
