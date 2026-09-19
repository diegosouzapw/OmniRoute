# CLOUD_AGENT (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

# Cloud agenti

> **Izvor istine:** `src/lib/cloudAgent/` i `src/app/api/v1/agents/tasks/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40 (osvježavanje frontmatter-a; 4 agenta uklj. cursor-cloud)

OmniRoute orkestrira cloud-hostovane kodirajuće agente trećih strana (Codex Cloud, Cursor, Devin, Jules) kao dugotrajne zadatke. Svaki agent je umotan iza uniformnog interfejsa tako da klijenti mogu poslati prompt + URL repozitorija i primiti rezultate bez bavljenja API-jima specifičnim za provajdera.

Zadatak Cloud agenta **nije** obično dovršavanje chata. To je trajna, višestepena jedinica rada koja može trajati od nekoliko minuta do nekoliko sati, može proizvesti Pull Request kao svoj artefakt, i podržava naknadne poruke i (kod nekih provajdera) kapije za odobrenje plana.

![Životni ciklus zadatka Cloud agenta](../diagrams/exported/cloud-agent-flow.svg)

> Izvor: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Podržani agenti

| ID provajdera  | Klasa              | Izvor                                 | Upstream bazni URL                      | Odobrenje plana |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | --------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Da              |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Da              |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Ne (automatski) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Ne (automatski) |

Registar: `src/lib/cloudAgent/registry.ts` — eksportuje `getAgent(providerId)`, `getAvailableAgents()` i `isCloudAgentProvider(providerId)`. Registar je običan in-memory `Record<string, CloudAgentBase>` popunjen pri učitavanju modula.

## Arhitektura

```
Klijent (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (potrebna autorizacija za upravljanje)
    → CreateCloudAgentTaskSchema validacija (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ povlači iz getProviderConnections({ provider, isActive: true })
         (prvo apiKey, fallback na accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST ka upstream API-ju provajdera
      └─ vraća CloudAgentTask sa internim id + externalId
    → insertCloudAgentTask(...) u cloud_agent_tasks (SQLite)

Polling (lijena sinhronizacija pri čitanju):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // osvježava status + aktivnosti
    → updateCloudAgentTask(...) sa novim statusom, rezultatom, completed_at
    → vraća serijalizovani zadatak

Interakcije:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        za "approve"
    → agent.sendMessage(externalId, message, credentials) za "message"
    → status se mijenja u "cancelled"                   za "cancel" (samo lokalno)
```

Sinhronizacija je **lijena** (lazy): status se osvježava sa upstream-a pri svakom `GET /tasks/[id]`. Ne postoji pozadinski poller. Dashboardi kojima je potrebno svježe stanje trebaju pollati GET endpoint u razumnom intervalu.

## `CloudAgentBase` Interfejs

Izvor: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristika upstream-string → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` namjerno baca izuzetak — Codex Cloud automatski planira i nema kapiju za odobrenje. `CodexCloudAgent.listSources` vraća `[]`.

`CursorCloudAgent` pokreće Cursorove pozadinske / Cloud agente putem njihovog zvaničnog REST API-ja (`api.cursor.com/v0`) sa **API ključem korisnika ili servisnog naloga** — sigurnija, "first-party" alternativa ponovnoj upotrebi OAuth sesije Cursor IDE-a (provajder `cursor`, koji nosi upozorenje o riziku od zabrane). To je običan REST adapter (bez izvorne `@cursor/sdk` zavisnosti). `approvePlan` baca izuzetak (Cursor agenti rade autonomno); `listSources` navodi repozitorijume dostupne putem ključa. Cursor vraća statusne enume velikim slovima (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), eksplicitno mapirane na zajednički `CloudAgentStatus`. `baseUrl` se može nadjačati po akreditivu tako da se verzija/putanja API-ja može ispraviti bez promjene koda.

## Domenski tipovi

Izvor: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // mora biti validan URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekunde, pozitivan cijeli broj
  cost?: number; // pozitivan decimalni broj
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // interni `task_...` ID
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ID upstream provajdera
  status: CloudAgentStatus;
  prompt: string; // 1..10000 znakova
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

Validacione šeme (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) su izvezene zajedno sa tipovima i koriste ih handleri ruta.

## Baza podataka

Izvor: `src/lib/cloudAgent/db.ts` — tabela se kreira lijeno (lazily) putem
`createCloudAgentTaskTable()` (također se poziva iz `src/lib/cloudAgent/index.ts` prilikom uvoza modula).

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

`updateCloudAgentTask` primjenjuje **bijelu listu kolona** (column whitelist) kako bi spriječio SQL injekciju:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Bilo koji drugi ključ u djelimičnom ažuriranju se tiho odbacuje.

## REST API — Životni ciklus zadatka

**Autentifikacija:** Sve `/api/v1/agents/tasks*` krajnje tačke (endpoints) zahtijevaju **upravljačku autentifikaciju**
(`requireCloudAgentManagementAuth` obmotava `requireManagementAuth` iz
`src/lib/api/requireManagementAuth`). Ovo je primijenjeno nakon commita `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Metoda  | Putanja                       | Svrha                                                         |
| ------- | ----------------------------- | ------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS preflight                                                |
| GET     | `/api/v1/agents/tasks`        | Listanje zadataka (filter: `provider`, `status`, `limit≤500`) |
| POST    | `/api/v1/agents/tasks`        | Kreiranje zadatka (šalje uzvodno + pohranjuje)                |
| DELETE  | `/api/v1/agents/tasks?id=...` | Brisanje zadatka putem query id-a (ne otkazuje uzvodno)       |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS preflight                                                |
| GET     | `/api/v1/agents/tasks/[id]`   | Čitanje zadatka + lijena sinhronizacija statusa uzvodno       |
| POST    | `/api/v1/agents/tasks/[id]`   | Akcija: `approve` / `message` / `cancel`                      |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Brisanje zadatka putem path id-a                              |

### Kreiranje zadatka

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

Odgovor `201`:

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

### Odobravanje plana

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Slanje naknadne poruke

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Otkazivanje (samo lokalni status)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` mijenja `status` u `"cancelled"` u lokalnoj bazi podataka, ali **ne** poziva
uzvodnog provajdera — ne postoji abort RPC u `CloudAgentBase`. Da biste zaustavili
naplatu uzvodno, prekinite zadatak u konzoli samog provajdera.

## REST API — Infrastruktura Cloud provajdera

Ove pomoćne krajnje tačke (endpoints) pod `src/app/api/cloud/` koriste se od strane udaljenih klijenata (CLI, Electron aplikacija ili sync worker-i) za čitanje metapodataka konekcije provajdera i razrješavanje aliasa modela. Oni su autentifikovani pomoću **regularnog API ključa** (putem `validateApiKey`), a ne upravljačkom autentifikacijom koja se koristi za krajnje tačke zadataka.

| Metoda | Putanja                         | Svrha                                                                                 |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Validacija API ključa, vraćanje maskiranih metapodataka konekcije + aliasa modela     |
| PUT    | `/api/cloud/credentials/update` | Osvježavanje `accessToken` / `refreshToken` / `expiresAt`                             |
| POST   | `/api/cloud/model/resolve`      | Razrješavanje aliasa modela u `{ provider, model }`                                   |
| GET    | `/api/cloud/models/alias`       | Listanje svih aliasa modela                                                           |
| PUT    | `/api/cloud/models/alias`       | Postavljanje aliasa modela (i automatska sinhronizacija sa Cloud-om ako je omogućeno) |

`/api/cloud/auth` nikada ne vraća sirovi `apiKey` / `accessToken` / `refreshToken`. On vraća `hasApiKey`, `hasAccessToken`, `hasRefreshToken` i maskirani pregled (`maskedApiKey`: prva 4 + `****` + zadnja 4).

## Razrješavanje akreditiva

`getCloudAgentCredentials(providerId)` u `src/lib/cloudAgent/api.ts`:

1. Učitava aktivne konekcije provajdera putem `getProviderConnections({ provider: providerId, isActive: true })`.
2. Za svaku konekciju, preferira `apiKey` (trimovan). Koristi `accessToken` kao rezervnu opciju.
3. Vraća prvi neprazan token upakovan kao `{ apiKey: token }`.
4. Vraća `null` ako nije pronađen upotrebljiv token — API odgovara sa `400` uz `"No active credentials configured for cloud agent provider: <id>"`.

Ovo znači da Cloud Agenti ponovo koriste istu tabelu konekcija provajdera kao i regularni LLM provajderi. Da biste omogućili Jules, kreirajte aktivnu konekciju sa `provider: "jules"` i popunjenim `apiKey`.

## Kontrolna tabla

Izvor: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

`"use client"` React stranica koja:

- Listira zadatke (dohvaćeno putem polling-a `GET /api/v1/agents/tasks`).
- Šalje nove zadatke putem forme koja se mapira na `CreateCloudAgentTaskSchema`.
- Prikazuje bedževe statusa (`queued`, `running`, `awaiting_approval`, `completed`, `failed`, `cancelled`) i renderuje `activities[]` vremensku liniju.
- Prikazuje `result.prUrl` / `commitMessage` / `summary` kada je `status === "completed"`.

## Integracija sa A2A

Cloud Agenti se mogu izložiti kao A2A vještine registracijom A2A vještine koja delegira svoj `tasks/send` handler na `getAgent(...).createTask(...)` i prevodi događaje statusa A2A zadatka u JSON-RPC 2.0 protokol. Pogledajte [A2A-SERVER.md](./A2A-SERVER.md).

## Dodavanje novog Cloud Agenta

1. Kreirajte `src/lib/cloudAgent/agents/<name>.ts` koji proširuje `CloudAgentBase`.
2. Implementirajte `createTask`, `getStatus`, `approvePlan` (ili bacite izuzetak ako nije primjenjivo), `sendMessage`, `listSources`. Koristite `this.mapStatus(...)` za normalizaciju statusa.
3. Registrujte u `src/lib/cloudAgent/registry.ts` pod stabilnim `providerId`.
4. Proširite `providerId` literal union u `src/lib/cloudAgent/types.ts` (`CloudAgentTask.providerId` i `CreateCloudAgentTaskSchema`).
5. Dodajte provajdera u `src/shared/constants/providers.ts` ako mu je potreban zapis konekcije. Provajderi zasnovani na OAuth-u takođe trebaju `src/lib/oauth/providers/`.
6. Dodajte testove pod `tests/unit/cloud-agent-*.test.ts`.
7. Ažurirajte ovaj dokument i `CLOUD_AGENTS` konstantu kontrolne table.

## Konfiguracija

| Varijabla okruženja | Namjena                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| `DATA_DIR`          | Lokacija SQLite baze podataka koja sadrži `cloud_agent_tasks`                       |
| `JWT_SECRET`        | Potrebno za upravljačku autentifikaciju na krajnjim tačkama zadataka                |
| `API_KEY_SECRET`    | Potrebno za šifriranje vjerodajnica za povezivanje s provajderom u stanju mirovanja |

Trenutno ne postoje varijable okruženja specifične za Cloud-Agent — svaka tajna se nalazi u tabeli `provider_connections`.

## Vidi također

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Izvorni kod: `src/lib/cloudAgent/`
- Rute: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Kontrolna tabla: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
