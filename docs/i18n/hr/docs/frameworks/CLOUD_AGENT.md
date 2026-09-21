# Cloud Agents (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Izvor istine:** `src/lib/cloudAgent/` i `src/app/api/v1/agents/tasks/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40 (osvježeni frontmatter; 4 agenta uključujući cursor-cloud)

OmniRoute orkestrira agente za programiranje smještene u oblaku trećih strana (Codex Cloud, Cursor,
Devin, Jules) kao dugotrajne zadatke. Svaki je agent obuhvaćen jedinstvenim sučeljem kako bi
klijenti mogli poslati upit + URL repozitorija i primiti rezultate bez bavljenja
API-jima specifičnima za pojedinog pružatelja usluge.

Zadatak Cloud Agenta **nije** uobičajeno dovršavanje razgovora. To je trajna jedinica rada
s više koraka koja može potrajati od nekoliko minuta do nekoliko sati, može proizvesti zahtjev za
povlačenje (Pull Request) kao svoj artefakt te podržava naknadne poruke i (kod nekih pružatelja)
kontrolne točke za odobravanje plana.

![Životni ciklus zadatka Cloud Agenta](../diagrams/exported/cloud-agent-flow.svg)

> Izvor: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Podržani agenti

| ID pružatelja  | Klasa              | Izvor                                 | Osnovni URL nadređenog API-ja           | Odobravanje plana |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Da                |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Da                |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Ne (automatski)   |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Ne (automatski)   |

Registar: `src/lib/cloudAgent/registry.ts` — izvozi `getAgent(providerId)`,
`getAvailableAgents()` i `isCloudAgentProvider(providerId)`. Registar je
običan memorijski `Record<string, CloudAgentBase>` koji se popunjava pri učitavanju modula.

## Arhitektura

```
Klijent (nadzorna ploča / CLI / API)
  → POST /api/v1/agents/tasks (potrebna je autentifikacija za upravljanje)
    → provjera valjanosti pomoću CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ dohvaća iz getProviderConnections({ provider, isActive: true })
         (prvo apiKey, uz rezervni accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST prema API-ju nadređenog pružatelja
      └─ vraća CloudAgentTask s internim id + externalId
    → insertCloudAgentTask(...) u cloud_agent_tasks (SQLite)

Periodička provjera (lijena sinkronizacija pri čitanju):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // osvježava status + aktivnosti
    → updateCloudAgentTask(...) s novim statusom, rezultatom i completed_at
    → vraća serijalizirani zadatak

Interakcije:
  POST /api/v1/agents/tasks/[id]  tijelo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)          za "approve"
    → agent.sendMessage(externalId, message, credentials) za "message"
    → status se mijenja u "cancelled"                     za "cancel" (samo lokalno)
```

Sinkronizacija je **lijena**: status se osvježava iz nadređenog sustava pri svakom zahtjevu `GET /tasks/[id]`.
Ne postoji pozadinski mehanizam za periodičku provjeru. Nadzorne ploče kojima je potrebno ažurno stanje trebaju u razumnim
intervalima periodički pozivati krajnju točku GET.

## Sučelje `CloudAgentBase`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristički uzvodni niz → enumeracija
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` namjerno izbacuje iznimku — Codex Cloud automatski izrađuje plan i
nema korak odobravanja. `CodexCloudAgent.listSources` vraća `[]`.

`CursorCloudAgent` upravlja Cursorovim pozadinskim agentima / agentima u oblaku putem njegova službenog REST
API-ja (`api.cursor.com/v0`) s pomoću **API ključa korisnika ili servisnog računa** — sigurnije
rješenje samog proizvođača u odnosu na ponovnu upotrebu OAuth sesije Cursor IDE-a (pružatelj `cursor`,
koji sadrži upozorenje o riziku zabrane). To je običan REST adapter (bez izvorne ovisnosti
`@cursor/sdk`). `approvePlan` izbacuje iznimku (Cursorovi agenti rade autonomno); `listSources` navodi
repozitorije dostupne ključu. Cursor vraća enumeracije statusa zapisane velikim slovima
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), koje se izričito preslikavaju na zajednički
`CloudAgentStatus`. `baseUrl` se može nadjačati za svaku vjerodajnicu kako bi se verzija/putanja API-ja mogla
ispraviti bez promjene koda.

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
  repoUrl: string; // mora biti valjani URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekunde, pozitivan cijeli broj
  cost?: number; // pozitivan broj s pomičnim zarezom
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // interni ID `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ID uzvodnog pružatelja
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

Sheme za provjeru valjanosti (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`)
izvoze se zajedno s tipovima i upotrebljavaju ih rukovatelji ruta.

## Baza podataka

Izvor: `src/lib/cloudAgent/db.ts` — tablica se stvara odgođeno putem funkcije
`createCloudAgentTaskTable()` (koja se također poziva iz `src/lib/cloudAgent/index.ts` pri
uvozu modula).

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

`updateCloudAgentTask` primjenjuje **popis dopuštenih stupaca** radi sprječavanja SQL injekcija:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Svi ostali ključevi u djelomičnom ažuriranju prešutno se odbacuju.

## REST API — životni ciklus zadatka

**Autorizacija:** Sve krajnje točke `/api/v1/agents/tasks*` zahtijevaju **upravljačku autorizaciju**
(`requireCloudAgentManagementAuth` omata `requireManagementAuth` iz
`src/lib/api/requireManagementAuth`). To se provodi nakon commita `588a0333`
(_"popravak autorizacije: zahtijevaj upravljačku autorizaciju za API-je agenata i razdoblja mirovanja"_).

| Metoda  | Putanja                       | Svrha                                                                       |
| ------- | ----------------------------- | --------------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS predzahtjev                                                            |
| GET     | `/api/v1/agents/tasks`        | Popis zadataka (filtri: `provider`, `status`, `limit≤500`)                  |
| POST    | `/api/v1/agents/tasks`        | Stvaranje zadatka (šalje nadređenom sustavu i pohranjuje)                   |
| DELETE  | `/api/v1/agents/tasks?id=...` | Brisanje zadatka prema ID-u upita (**ne** otkazuje ga u nadređenom sustavu) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS predzahtjev                                                            |
| GET     | `/api/v1/agents/tasks/[id]`   | Dohvaćanje zadatka + odgođena sinkronizacija statusa iz nadređenog sustava  |
| POST    | `/api/v1/agents/tasks/[id]`   | Radnja: `approve` / `message` / `cancel`                                    |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Brisanje zadatka prema ID-u iz putanje                                      |

### Stvaranje zadatka

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
nadređenog pružatelja usluge — u `CloudAgentBase` ne postoji RPC za prekid. Kako biste zaustavili
naplatu u nadređenom sustavu, prekinite zadatak u vlastitoj konzoli pružatelja usluge.

## REST API — povezivanje pružatelja usluga u oblaku

Ove pomoćne krajnje točke u `src/app/api/cloud/` udaljeni klijenti
(CLI, Electron aplikacija ili radni procesi za sinkronizaciju) koriste za čitanje metapodataka o vezi s pružateljem
i razrješavanje aliasa modela. Autentificiraju se **običnim API ključem**
(putem `validateApiKey`), a ne upravljačkom autentifikacijom koju koriste krajnje točke za zadatke.

| Metoda | Putanja                         | Svrha                                                                               |
| ------ | ------------------------------- | ----------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Provjera API ključa i vraćanje maskiranih metapodataka o vezi + aliasa modela       |
| PUT    | `/api/cloud/credentials/update` | Osvježavanje `accessToken` / `refreshToken` / `expiresAt`                           |
| POST   | `/api/cloud/model/resolve`      | Razrješavanje aliasa modela u `{ provider, model }`                                 |
| GET    | `/api/cloud/models/alias`       | Popis svih aliasa modela                                                            |
| PUT    | `/api/cloud/models/alias`       | Postavljanje aliasa modela (i automatska sinkronizacija s oblakom ako je omogućena) |

`/api/cloud/auth` nikada ne vraća neobrađene vrijednosti `apiKey` / `accessToken` / `refreshToken`. Vraća
`hasApiKey`, `hasAccessToken`, `hasRefreshToken` i maskirani pregled
(`maskedApiKey`: prva 4 znaka + `****` + posljednja 4 znaka).

## Razrješavanje vjerodajnica

`getCloudAgentCredentials(providerId)` u `src/lib/cloudAgent/api.ts`:

1. Učitava aktivne veze s pružateljima putem `getProviderConnections({ provider: providerId, isActive: true })`.
2. Za svaku vezu daje prednost vrijednosti `apiKey` (bez okolnih bjelina). Ako nije dostupna, koristi `accessToken`.
3. Vraća prvi token koji nije prazan, omotan kao `{ apiKey: token }`.
4. Vraća `null` ako nije pronađen nijedan upotrebljiv token — API odgovara statusom `400` uz
   `"Nisu konfigurirane aktivne vjerodajnice za pružatelja agenta u oblaku: <id>"`.

To znači da agenti u oblaku ponovno upotrebljavaju istu tablicu veza s pružateljima kao i uobičajeni LLM
pružatelji. Da biste omogućili Jules, stvorite aktivnu vezu s `provider: "jules"`
i popunjenim poljem `apiKey`.

## Nadzorna ploča

Izvor: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

React stranica s direktivom `"use client"` koja:

- Prikazuje popis zadataka (periodički dohvaćen putem `GET /api/v1/agents/tasks`).
- Šalje nove zadatke putem obrasca koji se preslikava na `CreateCloudAgentTaskSchema`.
- Prikazuje oznake statusa (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) i vremensku crtu `activities[]`.
- Prikazuje `result.prUrl` / `commitMessage` / `summary` kada je `status === "completed"`.

## Integracija s A2A

Agenti u oblaku mogu se izložiti kao A2A vještine registriranjem A2A vještine koja delegira
svoj obrađivač `tasks/send` pozivu `getAgent(...).createTask(...)` i prevodi događaje statusa A2A zadataka
u protokol JSON-RPC 2.0. Pogledajte [A2A-SERVER.md](./A2A-SERVER.md).

## Dodavanje novog agenta u oblaku

1. Stvorite `src/lib/cloudAgent/agents/<name>.ts` koji proširuje `CloudAgentBase`.
2. Implementirajte `createTask`, `getStatus`, `approvePlan` (ili bacite iznimku ako nije primjenjivo),
   `sendMessage`, `listSources`. Za normalizaciju statusa koristite `this.mapStatus(...)`.
3. Registrirajte ga u `src/lib/cloudAgent/registry.ts` pod stabilnim `providerId`.
4. Proširite uniju literala `providerId` u `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` i `CreateCloudAgentTaskSchema`).
5. Dodajte pružatelja u `src/shared/constants/providers.ts` ako mu je potreban zapis
   veze. Pružatelji koji se temelje na OAuth-u također trebaju `src/lib/oauth/providers/`.
6. Dodajte testove u `tests/unit/cloud-agent-*.test.ts`.
7. Ažurirajte ovaj dokument i konstantu `CLOUD_AGENTS` nadzorne ploče.

## Konfiguracija

| Varijabla okruženja | Svrha                                                                |
| ------------------- | -------------------------------------------------------------------- |
| `DATA_DIR`          | Lokacija SQLite baze podataka koja sadrži `cloud_agent_tasks`        |
| `JWT_SECRET`        | Potreban za autentifikaciju upravljanja na krajnjim točkama zadataka |
| `API_KEY_SECRET`    | Potreban za šifriranje vjerodajnica veze pružatelja u mirovanju      |

Trenutačno ne postoje varijable okruženja specifične za Cloud-Agent — sve se tajne nalaze u
tablici `provider_connections`.

## Vidi također

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Izvor: `src/lib/cloudAgent/`
- Rute: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Nadzorna ploča: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
