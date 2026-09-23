# Cloud Agents (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Sannhetskilde:** `src/lib/cloudAgent/` og `src/app/api/v1/agents/tasks/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40 (oppdatering av frontmatter; 4 agenter inkl. cursor-cloud)

OmniRoute orkestrerer tredjeparts kodeagenter som driftes i skyen (Codex Cloud, Cursor,
Devin, Jules), som langvarige oppgaver. Hver agent er pakket inn bak et enhetlig grensesnitt, slik at
klienter kan sende inn en ledetekst + repo-URL og motta resultater uten å måtte forholde seg til
leverandørspesifikke API-er.

En Cloud Agent-oppgave er **ikke** en vanlig chatfullføring. Det er en varig enhet med arbeid i
flere trinn som kan ta fra minutter til timer, kan produsere en Pull Request som
artefakt og støtter oppfølgingsmeldinger samt (hos enkelte leverandører) godkjenningsporter for planer.

![Livssyklusen til en Cloud Agent-oppgave](../diagrams/exported/cloud-agent-flow.svg)

> Kilde: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Støttede agenter

| Leverandør-ID  | Klasse             | Kilde                                 | Oppstrøms basis-URL                     | Plangodkjenning  |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ja               |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ja               |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nei (automatisk) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nei (automatisk) |

Register: `src/lib/cloudAgent/registry.ts` — eksporterer `getAgent(providerId)`,
`getAvailableAgents()` og `isCloudAgentProvider(providerId)`. Registeret er en
enkel `Record<string, CloudAgentBase>` i minnet som fylles ut ved modulinnlasting.

## Arkitektur

```
Klient (dashbord / CLI / API)
  → POST /api/v1/agents/tasks (administrasjonsautentisering kreves)
    → Validering med CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ henter fra getProviderConnections({ provider, isActive: true })
         (apiKey først, med accessToken som reserve)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST til oppstrøms leverandør-API
      └─ returnerer CloudAgentTask med intern id + externalId
    → insertCloudAgentTask(...) i cloud_agent_tasks (SQLite)

Avspørring (utsatt synkronisering ved lesing):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // oppdaterer status + aktiviteter
    → updateCloudAgentTask(...) med ny status, resultat og completed_at
    → returnerer serialisert oppgave

Interaksjoner:
  POST /api/v1/agents/tasks/[id]  brødtekst: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        for "approve"
    → agent.sendMessage(externalId, message, credentials) for "message"
    → status endres til "cancelled"                     for "cancel" (kun lokalt)
```

Synkronisering er **utsatt**: Status oppdateres fra oppstrømstjenesten ved hver `GET /tasks/[id]`.
Det finnes ingen avspørrer i bakgrunnen. Dashbord som trenger oppdatert tilstand, bør avspørre GET-
endepunktet med et fornuftig intervall.

## `CloudAgentBase`-grensesnitt

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristisk oppstrømsstreng → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` utløser med hensikt et unntak — Codex Cloud planlegger automatisk og har
ingen godkjenningsport. `CodexCloudAgent.listSources` returnerer `[]`.

`CursorCloudAgent` styrer Cursors Background / Cloud Agents gjennom det offisielle REST-
API-et (`api.cursor.com/v0`) med en **API-nøkkel for bruker eller tjenestekonto** — det sikrere
førstepartsalternativet til å gjenbruke OAuth-økten fra Cursor IDE (leverandøren `cursor`,
som har en advarsel om risiko for utestengelse). Det er en enkel REST-adapter (ingen innebygd
`@cursor/sdk`-avhengighet). `approvePlan` utløser et unntak (Cursor-agenter kjører autonomt); `listSources` viser
repositoriene som er tilgjengelige med nøkkelen. Cursor returnerer status-enumerasjoner med STORE BOKSTAVER
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), som eksplisitt tilordnes den delte
`CloudAgentStatus`. `baseUrl` kan overstyres per påloggingsinformasjon, slik at API-versjonen/-banen kan
korrigeres uten en kodeendring.

## Domenetyper

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
  repoUrl: string; // må være en gyldig URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekunder, positivt heltall
  cost?: number; // positivt flyttall
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // intern `task_...`-ID
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // oppstrømsleverandørens ID
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

Valideringsskjemaene (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`)
eksporteres sammen med typene og brukes av rutebehandlerne.

## Database

Kilde: `src/lib/cloudAgent/db.ts` — tabellen opprettes ved behov via
`createCloudAgentTaskTable()` (kalles også fra `src/lib/cloudAgent/index.ts` ved
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

`updateCloudAgentTask` håndhever en **hviteliste over kolonner** for å forhindre SQL-injeksjon:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Alle andre nøkler i den delvise oppdateringen fjernes uten varsel.

## REST-API — oppgavens livssyklus

**Autentisering:** Alle `/api/v1/agents/tasks*`-endepunkter krever **administrasjonsautentisering**
(`requireCloudAgentManagementAuth` omslutter `requireManagementAuth` fra
`src/lib/api/requireManagementAuth`). Dette håndheves etter commit `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metode  | Bane                          | Formål                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS-forhåndsforespørsel                                          |
| GET     | `/api/v1/agents/tasks`        | List oppgaver (filter: `provider`, `status`, `limit≤500`)         |
| POST    | `/api/v1/agents/tasks`        | Opprett oppgave (sender til oppstrømstjenesten + lagrer)          |
| DELETE  | `/api/v1/agents/tasks?id=...` | Slett oppgave etter ID i spørringen (avbryter **ikke** oppstrøms) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS-forhåndsforespørsel                                          |
| GET     | `/api/v1/agents/tasks/[id]`   | Les oppgave + synkroniser status ved behov fra oppstrømstjenesten |
| POST    | `/api/v1/agents/tasks/[id]`   | Handling: `approve` / `message` / `cancel`                        |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Slett oppgave etter ID i banen                                    |

### Opprett en oppgave

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

### Godkjenn en plan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Send en oppfølgingsmelding

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Avbryt (kun lokal status)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` endrer `status` til `"cancelled"` i den lokale databasen, men kaller **ikke**
oppstrømsleverandøren — det finnes ingen RPC for avbrytelse i `CloudAgentBase`. For å stoppe
fakturering hos oppstrømsleverandøren må oppgaven avsluttes i leverandørens egen konsoll.

## REST-API — integrasjon mot skyleverandører

Disse hjelpeendepunktene under `src/app/api/cloud/` brukes av eksterne klienter
(CLI-en, Electron-appen eller synkroniseringsarbeidere) til å lese metadata for leverandørtilkoblinger
og slå opp modellaliaser. De autentiseres med en **vanlig API-nøkkel**
(via `validateApiKey`), ikke administrasjonsautentiseringen som brukes av oppgaveendepunktene.

| Metode | Bane                            | Formål                                                                      |
| ------ | ------------------------------- | --------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Valider API-nøkkelen, returner maskerte tilkoblingsmetadata + modellaliaser |
| PUT    | `/api/cloud/credentials/update` | Oppdater `accessToken` / `refreshToken` / `expiresAt`                       |
| POST   | `/api/cloud/model/resolve`      | Slå opp et modellalias til `{ provider, model }`                            |
| GET    | `/api/cloud/models/alias`       | Vis alle modellaliaser                                                      |
| PUT    | `/api/cloud/models/alias`       | Angi et modellalias (og synkroniser automatisk til Cloud hvis aktivert)     |

`/api/cloud/auth` returnerer aldri rå `apiKey` / `accessToken` / `refreshToken`. Det
returnerer `hasApiKey`, `hasAccessToken`, `hasRefreshToken` og en maskert forhåndsvisning
(`maskedApiKey`: de første 4 + `****` + de siste 4).

## Oppslag av påloggingsinformasjon

`getCloudAgentCredentials(providerId)` i `src/lib/cloudAgent/api.ts`:

1. Laster aktive leverandørtilkoblinger via `getProviderConnections({ provider: providerId, isActive: true })`.
2. Foretrekker `apiKey` (uten innledende og etterfølgende mellomrom) for hver tilkobling. Faller tilbake til `accessToken`.
3. Returnerer det første tokenet som ikke er tomt, pakket inn som `{ apiKey: token }`.
4. Returnerer `null` hvis det ikke finnes noe brukbart token — API-et svarer med `400` og
   `"Ingen aktiv påloggingsinformasjon er konfigurert for skyleverandøragenten: <id>"`.

Dette betyr at skyagenter bruker den samme tabellen for leverandørtilkoblinger som vanlige LLM-
leverandører. For å aktivere Jules oppretter du en aktiv tilkobling med `provider: "jules"`
og en utfylt `apiKey`.

## Kontrollpanel

Kilde: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

En React-side med `"use client"` som:

- Viser oppgaver (hentes regelmessig via `GET /api/v1/agents/tasks`).
- Sender inn nye oppgaver via et skjema som tilordnes til `CreateCloudAgentTaskSchema`.
- Viser statusmerker (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) og gjengir tidslinjen `activities[]`.
- Viser `result.prUrl` / `commitMessage` / `summary` når `status === "completed"`.

## Integrasjon med A2A

Skyagenter kan eksponeres som A2A-ferdigheter ved å registrere en A2A-ferdighet som delegerer
sin `tasks/send`-håndterer til `getAgent(...).createTask(...)` og oversetter A2A-oppgavenes
statushendelser til JSON-RPC 2.0-protokollen. Se [A2A-SERVER.md](./A2A-SERVER.md).

## Legge til en ny skyagent

1. Opprett `src/lib/cloudAgent/agents/<name>.ts` som utvider `CloudAgentBase`.
2. Implementer `createTask`, `getStatus`, `approvePlan` (eller kast en feil hvis det ikke er aktuelt),
   `sendMessage`, `listSources`. Bruk `this.mapStatus(...)` til statusnormalisering.
3. Registrer den i `src/lib/cloudAgent/registry.ts` under en stabil `providerId`.
4. Utvid unionen av literaler for `providerId` i `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` og `CreateCloudAgentTaskSchema`).
5. Legg til leverandøren i `src/shared/constants/providers.ts` hvis den trenger en tilkoblingsoppføring.
   OAuth-baserte leverandører trenger også `src/lib/oauth/providers/`.
6. Legg til tester under `tests/unit/cloud-agent-*.test.ts`.
7. Oppdater dette dokumentet og kontrollpanelets `CLOUD_AGENTS`-konstant.

## Konfigurasjon

| Miljøvariabel    | Formål                                                                      |
| ---------------- | --------------------------------------------------------------------------- |
| `DATA_DIR`       | Plassering av SQLite-databasen som inneholder `cloud_agent_tasks`           |
| `JWT_SECRET`     | Påkrevd for administrasjonsautentisering på oppgaveendepunkter              |
| `API_KEY_SECRET` | Påkrevd for å kryptere tilkoblingslegitimasjon for leverandører ved lagring |

Det finnes ingen Cloud-Agent-spesifikke miljøvariabler i dag – alle hemmeligheter ligger i
tabellen `provider_connections`.

## Se også

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Kilde: `src/lib/cloudAgent/`
- Ruter: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Kontrollpanel: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
