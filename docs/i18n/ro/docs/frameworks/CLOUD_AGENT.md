# Cloud Agents (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Sursa adevărului:** `src/lib/cloudAgent/` și `src/app/api/v1/agents/tasks/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40 (actualizare frontmatter; 4 agenți, inclusiv cursor-cloud)

OmniRoute orchestrează agenți de programare găzduiți în cloud de terțe părți (Codex Cloud, Cursor,
Devin, Jules) sub forma unor sarcini de lungă durată. Fiecare agent este încapsulat în spatele unei interfețe uniforme, astfel încât
clienții să poată trimite un prompt + URL-ul unui depozit și să primească rezultate fără a interacționa cu
API-urile specifice furnizorului.

O sarcină Cloud Agent **nu** este o completare obișnuită de chat. Este o unitate de lucru persistentă, cu mai mulți pași,
care poate dura de la câteva minute la câteva ore, poate produce un Pull Request drept
artefact și acceptă mesaje ulterioare și (în cazul unor furnizori) puncte de control pentru aprobarea planului.

![Ciclul de viață al sarcinii Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Sursă: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Agenți acceptați

| ID furnizor    | Clasă              | Sursă                                 | URL de bază upstream                    | Aprobarea planului |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------ |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Da                 |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Da                 |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nu (automat)       |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nu (automat)       |

Registru: `src/lib/cloudAgent/registry.ts` — exportă `getAgent(providerId)`,
`getAvailableAgents()` și `isCloudAgentProvider(providerId)`. Registrul este un
`Record<string, CloudAgentBase>` simplu, stocat în memorie și populat la încărcarea modulului.

## Arhitectură

```
Client (Panou de control / CLI / API)
  → POST /api/v1/agents/tasks (este necesară autentificarea de administrare)
    → validare CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ preia din getProviderConnections({ provider, isActive: true })
         (mai întâi apiKey, cu revenire la accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST către API-ul furnizorului upstream
      └─ returnează CloudAgentTask cu id intern + externalId
    → insertCloudAgentTask(...) în cloud_agent_tasks (SQLite)

Interogare periodică (sincronizare leneșă la citire):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // reîmprospătează starea + activitățile
    → updateCloudAgentTask(...) cu noua stare, result, completed_at
    → returnează sarcina serializată

Interacțiuni:
  POST /api/v1/agents/tasks/[id]  corp: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        pentru "approve"
    → agent.sendMessage(externalId, message, credentials) pentru "message"
    → starea devine "cancelled"                         pentru "cancel" (doar local)
```

Sincronizarea este **leneșă**: starea este reîmprospătată din serviciul upstream la fiecare `GET /tasks/[id]`.
Nu există niciun proces de interogare periodică în fundal. Panourile de control care necesită o stare actualizată trebuie să interogheze endpoint-ul GET
la un interval rezonabil.

## Interfața `CloudAgentBase`

Sursă: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // șir euristic de la furnizor → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` generează intenționat o excepție — Codex Cloud creează automat planuri și nu are
nicio etapă de aprobare. `CodexCloudAgent.listSources` returnează `[]`.

`CursorCloudAgent` controlează agenții Background / Cloud Agents ai Cursor prin API-ul REST
oficial (`api.cursor.com/v0`), folosind o **cheie API de utilizator sau de cont de serviciu** — alternativa
oficială și mai sigură la reutilizarea sesiunii OAuth a IDE-ului Cursor (furnizorul `cursor`,
care include un avertisment privind riscul de interdicție). Este un adaptor REST simplu (fără dependența nativă
`@cursor/sdk`). `approvePlan` generează o excepție (agenții Cursor rulează autonom); `listSources` listează
depozitele accesibile cu cheia. Cursor returnează enumerări de stare cu majuscule
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), mapate explicit la tipul comun
`CloudAgentStatus`. `baseUrl` poate fi suprascris pentru fiecare set de credențiale, astfel încât versiunea/calea API-ului să poată
fi corectată fără modificarea codului.

## Tipuri de domeniu

Sursă: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // trebuie să fie un URL valid
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // secunde, număr întreg pozitiv
  cost?: number; // număr zecimal pozitiv
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // id intern `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // id-ul furnizorului din amonte
  status: CloudAgentStatus;
  prompt: string; // 1..10000 de caractere
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

Schemele de validare (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) sunt
exportate împreună cu tipurile și sunt utilizate de gestionarii rutelor.

## Baza de date

Sursă: `src/lib/cloudAgent/db.ts` — tabelul este creat la cerere prin
`createCloudAgentTaskTable()` (apelată și din `src/lib/cloudAgent/index.ts` la
importarea modulului).

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

`updateCloudAgentTask` aplică o **listă albă de coloane** pentru a preveni injecțiile SQL:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Orice altă cheie din actualizarea parțială este eliminată fără notificare.

## API REST — Ciclul de viață al sarcinilor

**Autentificare:** Toate endpointurile `/api/v1/agents/tasks*` necesită **autentificare de administrare**
(`requireCloudAgentManagementAuth` încapsulează `requireManagementAuth` din
`src/lib/api/requireManagementAuth`). Această cerință este aplicată după commitul `588a0333`
(_„fix(auth): necesită autentificare de administrare pentru API-urile agenților și perioadei de așteptare”_).

| Metodă  | Cale                          | Scop                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | Cerere CORS preliminară                                               |
| GET     | `/api/v1/agents/tasks`        | Listează sarcinile (filtre: `provider`, `status`, `limit≤500`)        |
| POST    | `/api/v1/agents/tasks`        | Creează sarcina (o trimite către serviciul upstream și o persistă)    |
| DELETE  | `/api/v1/agents/tasks?id=...` | Șterge sarcina după ID-ul din interogare (**nu** o anulează upstream) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Cerere CORS preliminară                                               |
| GET     | `/api/v1/agents/tasks/[id]`   | Citește sarcina și sincronizează la cerere starea din upstream        |
| POST    | `/api/v1/agents/tasks/[id]`   | Acțiune: `approve` / `message` / `cancel`                             |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Șterge sarcina după ID-ul din cale                                    |

### Crearea unei sarcini

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

Răspuns `201`:

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

### Aprobarea unui plan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Trimiterea unui mesaj suplimentar

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Anularea (doar starea locală)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` schimbă `status` la `"cancelled"` în baza de date locală, dar **nu** apelează
furnizorul upstream — nu există niciun RPC de anulare în `CloudAgentBase`. Pentru a opri
facturarea upstream, încheiați sarcina din consola proprie a furnizorului.

## API REST — infrastructura furnizorilor cloud

Aceste endpointuri auxiliare din `src/app/api/cloud/` sunt utilizate de clienții la distanță
(CLI-ul, aplicația Electron sau procesele de sincronizare) pentru a citi metadatele conexiunilor
furnizorilor și pentru a rezolva aliasurile modelelor. Acestea sunt autentificate cu o **cheie API obișnuită**
(prin `validateApiKey`), nu cu autentificarea de administrare utilizată de endpointurile pentru sarcini.

| Metodă | Cale                            | Scop                                                                                     |
| ------ | ------------------------------- | ---------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Validează cheia API, returnează metadatele mascate ale conexiunii + aliasurile modelelor |
| PUT    | `/api/cloud/credentials/update` | Actualizează `accessToken` / `refreshToken` / `expiresAt`                                |
| POST   | `/api/cloud/model/resolve`      | Rezolvă un alias de model la `{ provider, model }`                                       |
| GET    | `/api/cloud/models/alias`       | Listează toate aliasurile modelelor                                                      |
| PUT    | `/api/cloud/models/alias`       | Setează un alias de model (și îl sincronizează automat cu Cloud, dacă este activat)      |

`/api/cloud/auth` nu returnează niciodată valorile brute `apiKey` / `accessToken` / `refreshToken`. Acesta
returnează `hasApiKey`, `hasAccessToken`, `hasRefreshToken` și o previzualizare mascată
(`maskedApiKey`: primele 4 caractere + `****` + ultimele 4 caractere).

## Rezolvarea acreditărilor

`getCloudAgentCredentials(providerId)` din `src/lib/cloudAgent/api.ts`:

1. Încarcă conexiunile active ale furnizorului prin `getProviderConnections({ provider: providerId, isActive: true })`.
2. Pentru fiecare conexiune, preferă `apiKey` (fără spațiile de la început și sfârșit). Dacă aceasta lipsește, utilizează `accessToken`.
3. Returnează primul token nevid, împachetat ca `{ apiKey: token }`.
4. Returnează `null` dacă nu este găsit niciun token utilizabil — API-ul răspunde cu `400` și
   `"No active credentials configured for cloud agent provider: <id>"`.

Aceasta înseamnă că agenții cloud reutilizează același tabel Provider Connection ca furnizorii LLM
obișnuiți. Pentru a activa Jules, creați o conexiune activă cu `provider: "jules"`
și cu `apiKey` completată.

## Panou de control

Sursă: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

O pagină React `"use client"` care:

- Listează sarcinile (interogate periodic prin `GET /api/v1/agents/tasks`).
- Trimite sarcini noi printr-un formular mapat la `CreateCloudAgentTaskSchema`.
- Afișează insigne de stare (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) și redă cronologia `activities[]`.
- Afișează `result.prUrl` / `commitMessage` / `summary` atunci când `status === "completed"`.

## Integrarea cu A2A

Agenții cloud pot fi expuși ca abilități A2A prin înregistrarea unei abilități A2A care deleagă
handlerul său `tasks/send` către `getAgent(...).createTask(...)` și traduce evenimentele de stare
ale sarcinilor A2A în protocolul JSON-RPC 2.0. Consultați [A2A-SERVER.md](./A2A-SERVER.md).

## Adăugarea unui nou agent cloud

1. Creați `src/lib/cloudAgent/agents/<name>.ts`, extinzând `CloudAgentBase`.
2. Implementați `createTask`, `getStatus`, `approvePlan` (sau generați o excepție dacă nu se aplică),
   `sendMessage`, `listSources`. Utilizați `this.mapStatus(...)` pentru normalizarea stării.
3. Înregistrați-l în `src/lib/cloudAgent/registry.ts` sub un `providerId` stabil.
4. Extindeți uniunea de literali `providerId` din `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` și `CreateCloudAgentTaskSchema`).
5. Adăugați furnizorul în `src/shared/constants/providers.ts` dacă necesită o înregistrare
   de conexiune. Furnizorii bazați pe OAuth necesită, de asemenea, `src/lib/oauth/providers/`.
6. Adăugați teste în `tests/unit/cloud-agent-*.test.ts`.
7. Actualizați acest document și constanta `CLOUD_AGENTS` a panoului de control.

## Configurare

| Variabilă de mediu | Scop                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| `DATA_DIR`         | Locația bazei de date SQLite care conține `cloud_agent_tasks`                |
| `JWT_SECRET`       | Necesară pentru autentificarea de administrare pe endpointurile sarcinilor   |
| `API_KEY_SECRET`   | Necesară pentru criptarea în repaus a credențialelor conexiunii furnizorului |

În prezent, nu există variabile de mediu specifice Cloud-Agent — fiecare secret se află în
tabelul `provider_connections`.

## Consultați și

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Sursă: `src/lib/cloudAgent/`
- Rute: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Panou de control: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
