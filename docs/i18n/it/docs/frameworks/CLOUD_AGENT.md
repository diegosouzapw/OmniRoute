# Cloud Agents (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Fonte attendibile:** `src/lib/cloudAgent/` e `src/app/api/v1/agents/tasks/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40 (aggiornamento del frontmatter; 4 agenti, incluso cursor-cloud)

OmniRoute orchestra agenti di programmazione di terze parti ospitati nel cloud (Codex Cloud, Cursor,
Devin, Jules) sotto forma di attività a lunga esecuzione. Ogni agente è incapsulato dietro un'interfaccia uniforme, così
i client possono inviare un prompt + l'URL di un repository e ricevere i risultati senza dover gestire
API specifiche del provider.

Un'attività di un agente cloud **non** è un normale completamento di chat. È un'unità di lavoro
persistente e articolata in più passaggi, che può richiedere da minuti a ore, può produrre una Pull Request come
artefatto e supporta messaggi di follow-up e, per alcuni provider, passaggi di approvazione del piano.

![Ciclo di vita di un'attività di un agente cloud](../diagrams/exported/cloud-agent-flow.svg)

> Fonte: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Agenti supportati

| ID provider    | Classe             | Sorgente                              | URL di base upstream                    | Approvazione del piano |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Sì                     |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Sì                     |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | No (automatica)        |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | No (automatica)        |

Registro: `src/lib/cloudAgent/registry.ts` — esporta `getAgent(providerId)`,
`getAvailableAgents()` e `isCloudAgentProvider(providerId)`. Il registro è un semplice
`Record<string, CloudAgentBase>` in memoria, popolato al caricamento del modulo.

## Architettura

```
Client (dashboard / CLI / API)
  → POST /api/v1/agents/tasks (autenticazione di gestione obbligatoria)
    → validazione CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ recupera da getProviderConnections({ provider, isActive: true })
         (prima apiKey, con fallback su accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST all'API del provider upstream
      └─ restituisce CloudAgentTask con id interno + externalId
    → insertCloudAgentTask(...) in cloud_agent_tasks (SQLite)

Polling (sincronizzazione differita in lettura):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // aggiorna stato + attività
    → updateCloudAgentTask(...) con nuovo stato, risultato, completed_at
    → restituisce l'attività serializzata

Interazioni:
  POST /api/v1/agents/tasks/[id]  corpo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        per "approve"
    → agent.sendMessage(externalId, message, credentials) per "message"
    → lo stato passa a "cancelled"                      per "cancel" (solo locale)
```

La sincronizzazione è **differita**: lo stato viene aggiornato dal sistema upstream a ogni richiesta `GET /tasks/[id]`.
Non è presente alcun processo di polling in background. Le dashboard che necessitano di uno stato aggiornato devono interrogare l'endpoint GET
a intervalli ragionevoli.

## Interfaccia `CloudAgentBase`

Origine: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // stringa upstream euristica → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` genera intenzionalmente un'eccezione: Codex Cloud crea automaticamente i piani e non prevede alcun passaggio di approvazione. `CodexCloudAgent.listSources` restituisce `[]`.

`CursorCloudAgent` gestisce i Background / Cloud Agents di Cursor tramite la relativa API REST ufficiale (`api.cursor.com/v0`) con una **chiave API utente o di account di servizio**: l'alternativa proprietaria più sicura rispetto al riutilizzo della sessione OAuth dell'IDE Cursor (provider `cursor`, che include un avviso relativo al rischio di ban). È un semplice adattatore REST (senza dipendenza nativa da `@cursor/sdk`). `approvePlan` genera un'eccezione (gli agenti Cursor vengono eseguiti autonomamente); `listSources` elenca i repository accessibili tramite la chiave. Cursor restituisce enum di stato in maiuscolo (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), mappati esplicitamente al tipo condiviso `CloudAgentStatus`. `baseUrl` può essere sovrascritto per ciascuna credenziale, in modo che sia possibile correggere la versione o il percorso dell'API senza modificare il codice.

## Tipi di dominio

Origine: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // deve essere un URL valido
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // secondi, intero positivo
  cost?: number; // numero in virgola mobile positivo
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // ID interno `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ID del provider upstream
  status: CloudAgentStatus;
  prompt: string; // da 1 a 10000 caratteri
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

Gli schemi di convalida (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) vengono esportati insieme ai tipi e sono utilizzati dai gestori delle route.

## Database

Fonte: `src/lib/cloudAgent/db.ts` — la tabella viene creata in modo differito tramite
`createCloudAgentTaskTable()` (chiamata anche da `src/lib/cloudAgent/index.ts`
all'importazione del modulo).

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

`updateCloudAgentTask` applica una **lista consentita di colonne** per impedire la SQL injection:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Qualsiasi altra chiave nell'aggiornamento parziale viene ignorata senza segnalazioni.

## API REST — Ciclo di vita delle attività

**Autenticazione:** tutti gli endpoint `/api/v1/agents/tasks*` richiedono
l'**autenticazione di gestione** (`requireCloudAgentManagementAuth` esegue il wrapping di
`requireManagementAuth` da `src/lib/api/requireManagementAuth`). Questo requisito è applicato dopo il commit `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metodo  | Percorso                      | Scopo                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | Preflight CORS                                                                       |
| GET     | `/api/v1/agents/tasks`        | Elenca le attività (filtro: `provider`, `status`, `limit≤500`)                       |
| POST    | `/api/v1/agents/tasks`        | Crea un'attività (la inoltra al servizio upstream e la salva)                        |
| DELETE  | `/api/v1/agents/tasks?id=...` | Elimina l'attività tramite ID della query (**non** la annulla nel servizio upstream) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Preflight CORS                                                                       |
| GET     | `/api/v1/agents/tasks/[id]`   | Legge l'attività e ne sincronizza in modo differito lo stato dal servizio upstream   |
| POST    | `/api/v1/agents/tasks/[id]`   | Azione: `approve` / `message` / `cancel`                                             |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Elimina l'attività tramite ID nel percorso                                           |

### Creare un'attività

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

Risposta `201`:

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

### Approvare un piano

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Inviare un messaggio di follow-up

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Annullare (solo stato locale)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` imposta `status` su `"cancelled"` nel DB locale, ma **non** chiama il
provider upstream: non esiste alcuna RPC di interruzione in `CloudAgentBase`. Per interrompere la fatturazione
upstream, terminare l'attività nella console del provider.

## API REST — Infrastruttura dei Cloud Provider

Questi endpoint ausiliari in `src/app/api/cloud/` vengono utilizzati dai client remoti
(la CLI, l'app Electron o i worker di sincronizzazione) per leggere i metadati di connessione
dei provider e risolvere gli alias dei modelli. Sono autenticati con una **normale chiave API**
(tramite `validateApiKey`), non con l'autenticazione di gestione utilizzata dagli endpoint delle attività.

| Metodo | Percorso                        | Scopo                                                                                        |
| ------ | ------------------------------- | -------------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Convalida la chiave API e restituisce metadati di connessione mascherati + alias dei modelli |
| PUT    | `/api/cloud/credentials/update` | Aggiorna `accessToken` / `refreshToken` / `expiresAt`                                        |
| POST   | `/api/cloud/model/resolve`      | Risolve un alias di modello in `{ provider, model }`                                         |
| GET    | `/api/cloud/models/alias`       | Elenca tutti gli alias dei modelli                                                           |
| PUT    | `/api/cloud/models/alias`       | Imposta un alias di modello (e lo sincronizza automaticamente con Cloud, se abilitato)       |

`/api/cloud/auth` non restituisce mai i valori non elaborati di `apiKey` / `accessToken` / `refreshToken`.
Restituisce `hasApiKey`, `hasAccessToken`, `hasRefreshToken` e un'anteprima mascherata
(`maskedApiKey`: primi 4 caratteri + `****` + ultimi 4 caratteri).

## Risoluzione delle credenziali

`getCloudAgentCredentials(providerId)` in `src/lib/cloudAgent/api.ts`:

1. Carica le connessioni attive dei provider tramite `getProviderConnections({ provider: providerId, isActive: true })`.
2. Per ogni connessione, preferisce `apiKey` (senza spazi iniziali e finali). In alternativa, utilizza `accessToken`.
3. Restituisce il primo token non vuoto nel formato `{ apiKey: token }`.
4. Restituisce `null` se non viene trovato alcun token utilizzabile — l'API risponde con `400` e
   `"Nessuna credenziale attiva configurata per il provider del cloud agent: <id>"`.

Ciò significa che i Cloud Agent riutilizzano la stessa tabella Provider Connection dei normali
provider LLM. Per abilitare Jules, crea una connessione attiva con `provider: "jules"`
e un valore `apiKey` impostato.

## Dashboard

Origine: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Una pagina React `"use client"` che:

- Elenca le attività (aggiornate periodicamente tramite `GET /api/v1/agents/tasks`).
- Invia nuove attività tramite un modulo associato a `CreateCloudAgentTaskSchema`.
- Mostra badge di stato (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) e visualizza la timeline `activities[]`.
- Mostra `result.prUrl` / `commitMessage` / `summary` quando `status === "completed"`.

## Integrazione con A2A

I Cloud Agent possono essere esposti come skill A2A registrando una skill A2A che deleghi
il proprio gestore `tasks/send` a `getAgent(...).createTask(...)` e traduca gli eventi di stato
delle attività A2A nel protocollo JSON-RPC 2.0. Consulta [A2A-SERVER.md](./A2A-SERVER.md).

## Aggiunta di un nuovo Cloud Agent

1. Crea `src/lib/cloudAgent/agents/<name>.ts` estendendo `CloudAgentBase`.
2. Implementa `createTask`, `getStatus`, `approvePlan` (oppure genera un'eccezione se non applicabile),
   `sendMessage`, `listSources`. Utilizza `this.mapStatus(...)` per la normalizzazione dello stato.
3. Registralo in `src/lib/cloudAgent/registry.ts` con un `providerId` stabile.
4. Estendi l'unione di valori letterali `providerId` in `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` e `CreateCloudAgentTaskSchema`).
5. Aggiungi il provider a `src/shared/constants/providers.ts` se richiede un record di connessione.
   I provider basati su OAuth richiedono anche `src/lib/oauth/providers/`.
6. Aggiungi i test in `tests/unit/cloud-agent-*.test.ts`.
7. Aggiorna questo documento e la costante `CLOUD_AGENTS` della dashboard.

## Configurazione

| Variabile d'ambiente | Scopo                                                                              |
| -------------------- | ---------------------------------------------------------------------------------- |
| `DATA_DIR`           | Posizione del database SQLite contenente `cloud_agent_tasks`                       |
| `JWT_SECRET`         | Necessaria per l'autenticazione di gestione sugli endpoint delle attività          |
| `API_KEY_SECRET`     | Necessaria per crittografare le credenziali di connessione dei provider archiviate |

Attualmente non esistono variabili d'ambiente specifiche di Cloud-Agent: ogni segreto risiede nella
tabella `provider_connections`.

## Vedi anche

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Sorgente: `src/lib/cloudAgent/`
- Route: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Dashboard: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
