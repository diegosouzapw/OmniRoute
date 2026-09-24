# Cloud Agents (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Bron van waarheid:** `src/lib/cloudAgent/` en `src/app/api/v1/agents/tasks/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40 (frontmatter vernieuwd; 4 agents, incl. cursor-cloud)

OmniRoute orkestreert door derden in de cloud gehoste programmeeragents (Codex Cloud, Cursor,
Devin, Jules) als langlopende taken. Elke agent wordt achter een uniforme interface geplaatst, zodat
clients een prompt + repository-URL kunnen indienen en resultaten kunnen ontvangen zonder
providerspecifieke API's te hoeven gebruiken.

Een Cloud Agent-taak is **geen** gewone chatvoltooiing. Het is een duurzame werkunit met meerdere
stappen die minuten tot uren kan duren, een Pull Request als artefact kan opleveren en
vervolgberichten en (bij sommige providers) goedkeuringsstappen voor plannen ondersteunt.

![Levenscyclus van een Cloud Agent-taak](../diagrams/exported/cloud-agent-flow.svg)

> Bron: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Ondersteunde agents

| Provider-ID    | Klasse             | Bron                                  | Upstream-basis-URL                      | Plangoedkeuring   |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ja                |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ja                |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nee (automatisch) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nee (automatisch) |

Register: `src/lib/cloudAgent/registry.ts` — exporteert `getAgent(providerId)`,
`getAvailableAgents()` en `isCloudAgentProvider(providerId)`. Het register is een
eenvoudige `Record<string, CloudAgentBase>` in het geheugen, die bij het laden van de module wordt gevuld.

## Architectuur

```
Client (dashboard / CLI / API)
  → POST /api/v1/agents/tasks (beheerautorisatie vereist)
    → validatie met CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ haalt gegevens op uit getProviderConnections({ provider, isActive: true })
         (eerst apiKey, met accessToken als terugvaloptie)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST naar de upstream-provider-API
      └─ retourneert CloudAgentTask met interne id + externalId
    → insertCloudAgentTask(...) in cloud_agent_tasks (SQLite)

Polling (luie synchronisatie bij lezen):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // vernieuwt status + activiteiten
    → updateCloudAgentTask(...) met nieuwe status, resultaat, completed_at
    → retourneert geserialiseerde taak

Interacties:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        voor "approve"
    → agent.sendMessage(externalId, message, credentials) voor "message"
    → status verandert in "cancelled"                   voor "cancel" (alleen lokaal)
```

Synchronisatie is **lui**: de status wordt bij elke `GET /tasks/[id]` vanuit de upstream vernieuwd.
Er is geen poller op de achtergrond. Dashboards die een actuele status nodig hebben, moeten het GET-
endpoint met een geschikt interval pollen.

## `CloudAgentBase`-interface

Bron: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristische upstream-tekenreeks → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` genereert bewust een fout — Codex Cloud maakt automatisch plannen en heeft
geen goedkeuringsstap. `CodexCloudAgent.listSources` retourneert `[]`.

`CursorCloudAgent` stuurt de Background / Cloud Agents van Cursor aan via de officiële REST-
API (`api.cursor.com/v0`) met een **API-sleutel van een gebruiker of serviceaccount** — het veiligere,
first-party alternatief voor het hergebruiken van de OAuth-sessie van de Cursor IDE (provider `cursor`,
waarvoor een waarschuwing geldt wegens het risico op een ban). Het is een gewone REST-adapter (zonder native
afhankelijkheid van `@cursor/sdk`). `approvePlan` genereert een fout (Cursor-agents werken autonoom); `listSources` vermeldt
de repositories die met de sleutel toegankelijk zijn. Cursor retourneert status-enums in hoofdletters
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), die expliciet worden toegewezen aan de gedeelde
`CloudAgentStatus`. `baseUrl` kan per credential worden overschreven, zodat de API-versie of het pad
zonder codewijziging kan worden gecorrigeerd.

## Domeintypen

Bron: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // moet een geldige URL zijn
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // seconden, positief geheel getal
  cost?: number; // positief kommagetal
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // interne `task_...`-id
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // id van de upstream-provider
  status: CloudAgentStatus;
  prompt: string; // 1..10000 tekens
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

Validatieschema's (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) worden
samen met de typen geëxporteerd en worden door de routehandlers gebruikt.

## Database

Bron: `src/lib/cloudAgent/db.ts` — de tabel wordt indien nodig aangemaakt via
`createCloudAgentTaskTable()` (ook aangeroepen vanuit `src/lib/cloudAgent/index.ts` bij
het importeren van de module).

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

`updateCloudAgentTask` dwingt een **whitelist van kolommen** af om SQL-injectie te voorkomen:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Elke andere sleutel in de gedeeltelijke update wordt stilzwijgend verwijderd.

## REST API — Levenscyclus van taken

**Authenticatie:** Alle `/api/v1/agents/tasks*`-endpoints vereisen **beheerautorisatie**
(`requireCloudAgentManagementAuth` is een wrapper rond `requireManagementAuth` uit
`src/lib/api/requireManagementAuth`). Dit wordt afgedwongen sinds commit `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Methode | Pad                           | Doel                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS-preflight                                                  |
| GET     | `/api/v1/agents/tasks`        | Taken weergeven (filter: `provider`, `status`, `limit≤500`)     |
| POST    | `/api/v1/agents/tasks`        | Taak aanmaken (stuurt door naar upstream + slaat op)            |
| DELETE  | `/api/v1/agents/tasks?id=...` | Taak verwijderen via query-id (annuleert **niet** upstream)     |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS-preflight                                                  |
| GET     | `/api/v1/agents/tasks/[id]`   | Taak lezen + status indien nodig synchroniseren vanuit upstream |
| POST    | `/api/v1/agents/tasks/[id]`   | Actie: `approve` / `message` / `cancel`                         |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Taak verwijderen via pad-id                                     |

### Een taak aanmaken

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

Respons `201`:

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

### Een plan goedkeuren

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Een vervolgbericht verzenden

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Annuleren (alleen lokale status)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` wijzigt `status` naar `"cancelled"` in de lokale database, maar roept de
upstreamprovider **niet** aan — er is geen RPC voor afbreken in `CloudAgentBase`. Om
upstreamfacturering te stoppen, beëindigt u de taak in de eigen console van de provider.

## REST API — Cloudprovider-infrastructuur

Deze ondersteunende endpoints onder `src/app/api/cloud/` worden gebruikt door externe clients
(de CLI, de Electron-app of synchronisatieworkers) om verbindingsmetadata van providers te lezen
en modelaliassen om te zetten. Ze worden geauthenticeerd met een **reguliere API-sleutel**
(via `validateApiKey`), niet met de beheer-authenticatie die door de taakendpoints wordt gebruikt.

| Methode | Pad                             | Doel                                                                                   |
| ------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| POST    | `/api/cloud/auth`               | API-sleutel valideren en gemaskeerde verbindingsmetadata + modelaliassen retourneren   |
| PUT     | `/api/cloud/credentials/update` | `accessToken` / `refreshToken` / `expiresAt` vernieuwen                                |
| POST    | `/api/cloud/model/resolve`      | Een modelalias omzetten naar `{ provider, model }`                                     |
| GET     | `/api/cloud/models/alias`       | Alle modelaliassen weergeven                                                           |
| PUT     | `/api/cloud/models/alias`       | Een modelalias instellen (en automatisch met Cloud synchroniseren indien ingeschakeld) |

`/api/cloud/auth` retourneert nooit de onbewerkte `apiKey` / `accessToken` / `refreshToken`. Het
retourneert `hasApiKey`, `hasAccessToken`, `hasRefreshToken` en een gemaskeerde voorvertoning
(`maskedApiKey`: eerste 4 + `****` + laatste 4).

## Referenties oplossen

`getCloudAgentCredentials(providerId)` in `src/lib/cloudAgent/api.ts`:

1. Laadt actieve providerverbindingen via `getProviderConnections({ provider: providerId, isActive: true })`.
2. Geeft voor elke verbinding de voorkeur aan `apiKey` (zonder omringende witruimte). Valt terug op `accessToken`.
3. Retourneert het eerste niet-lege token verpakt als `{ apiKey: token }`.
4. Retourneert `null` als geen bruikbaar token wordt gevonden — de API antwoordt met `400` en
   `"No active credentials configured for cloud agent provider: <id>"`.

Dit betekent dat Cloud Agents dezelfde Provider Connection-tabel hergebruiken als reguliere
LLM-providers. Om Jules in te schakelen, maakt u een actieve verbinding met `provider: "jules"`
en een ingevulde `apiKey`.

## Dashboard

Bron: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Een `"use client"` React-pagina die:

- Taken weergeeft (periodiek opgehaald via `GET /api/v1/agents/tasks`).
- Nieuwe taken indient via een formulier dat wordt toegewezen aan `CreateCloudAgentTaskSchema`.
- Statusbadges toont (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) en de tijdlijn `activities[]` weergeeft.
- De `result.prUrl` / `commitMessage` / `summary` toont wanneer `status === "completed"`.

## Integratie met A2A

Cloud Agents kunnen als A2A-vaardigheden beschikbaar worden gesteld door een A2A-vaardigheid te registreren die
de bijbehorende `tasks/send`-handler delegeert aan `getAgent(...).createTask(...)` en A2A-taakstatusgebeurtenissen
vertaalt naar het JSON-RPC 2.0-protocol. Zie [A2A-SERVER.md](./A2A-SERVER.md).

## Een nieuwe Cloud Agent toevoegen

1. Maak `src/lib/cloudAgent/agents/<name>.ts` aan en breid `CloudAgentBase` uit.
2. Implementeer `createTask`, `getStatus`, `approvePlan` (of genereer een fout indien niet van toepassing),
   `sendMessage`, `listSources`. Gebruik `this.mapStatus(...)` voor statusnormalisatie.
3. Registreer deze in `src/lib/cloudAgent/registry.ts` onder een stabiele `providerId`.
4. Breid de unie van letterlijke `providerId`-waarden uit in `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` en `CreateCloudAgentTaskSchema`).
5. Voeg de provider toe aan `src/shared/constants/providers.ts` als deze een verbindingsrecord
   nodig heeft. Op OAuth gebaseerde providers hebben ook `src/lib/oauth/providers/` nodig.
6. Voeg tests toe onder `tests/unit/cloud-agent-*.test.ts`.
7. Werk dit document en de constante `CLOUD_AGENTS` van het dashboard bij.

## Configuratie

| Omgevingsvariabele | Doel                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `DATA_DIR`         | Locatie van de SQLite-database met `cloud_agent_tasks`               |
| `JWT_SECRET`       | Vereist voor beheerauthenticatie op taakeindpunten                   |
| `API_KEY_SECRET`   | Vereist om verbindingsgegevens van providers versleuteld op te slaan |

Er bestaan momenteel geen Cloud-Agent-specifieke omgevingsvariabelen — elk geheim bevindt zich in de tabel
`provider_connections`.

## Zie ook

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Bron: `src/lib/cloudAgent/`
- Routes: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Dashboard: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
