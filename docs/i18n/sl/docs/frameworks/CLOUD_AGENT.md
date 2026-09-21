# Cloud Agents (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Vir resnice:** `src/lib/cloudAgent/` in `src/app/api/v1/agents/tasks/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40 (osvežitev frontmatterja; 4 agenti, vključno s cursor-cloud)

OmniRoute usklajuje kodirne agente tretjih ponudnikov, ki gostujejo v oblaku (Codex Cloud, Cursor,
Devin, Jules), kot dolgotrajna opravila. Vsak agent je ovit v enoten vmesnik, tako da
lahko odjemalci pošljejo poziv + URL repozitorija in prejmejo rezultate, ne da bi se morali ukvarjati
z API-ji posameznih ponudnikov.

Opravilo agenta v oblaku **ni** običajna dokončitev klepeta. Je trajna, večstopenjska
enota dela, ki lahko traja od nekaj minut do več ur, kot svoj artefakt lahko ustvari zahtevo za združitev (Pull Request)
ter podpira nadaljnja sporočila in (pri nekaterih ponudnikih) kontrolne točke za odobritev načrta.

![Življenjski cikel opravila agenta v oblaku](../diagrams/exported/cloud-agent-flow.svg)

> Vir: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Podprti agenti

| ID ponudnika   | Razred             | Vir                                   | Osnovni URL zunanjega ponudnika         | Odobritev načrta |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Da               |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Da               |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Ne (samodejno)   |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Ne (samodejno)   |

Register: `src/lib/cloudAgent/registry.ts` — izvaža `getAgent(providerId)`,
`getAvailableAgents()` in `isCloudAgentProvider(providerId)`. Register je preprost
`Record<string, CloudAgentBase>` v pomnilniku, ki se napolni ob nalaganju modula.

## Arhitektura

```
Odjemalec (nadzorna plošča / CLI / API)
  → POST /api/v1/agents/tasks (zahtevano je upravljavsko preverjanje pristnosti)
    → preverjanje veljavnosti CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ pridobi iz getProviderConnections({ provider, isActive: true })
         (najprej apiKey, nato nadomestno accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST v API zunanjega ponudnika
      └─ vrne CloudAgentTask z notranjim id + externalId
    → insertCloudAgentTask(...) v cloud_agent_tasks (SQLite)

Pozivanje (leno usklajevanje ob branju):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // osveži stanje + dejavnosti
    → updateCloudAgentTask(...) z novim stanjem, rezultatom, completed_at
    → vrne serializirano opravilo

Interakcije:
  POST /api/v1/agents/tasks/[id]  telo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)          za "approve"
    → agent.sendMessage(externalId, message, credentials) za "message"
    → stanje se spremeni v "cancelled"                    za "cancel" (samo lokalno)
```

Usklajevanje je **leno**: stanje se osveži pri zunanjem ponudniku ob vsakem `GET /tasks/[id]`.
Ozadni pozivalnik ne obstaja. Nadzorne plošče, ki potrebujejo sveže stanje, naj v smiselnem
intervalu poizvedujejo po končni točki GET.

## Vmesnik `CloudAgentBase`

Vir: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // hevristična preslikava niza ponudnika → naštevanje
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` namerno sproži izjemo — Codex Cloud načrtuje samodejno in
nima koraka za odobritev. `CodexCloudAgent.listSources` vrne `[]`.

`CursorCloudAgent` upravlja Cursorjeve agente Background / Cloud Agents prek njegovega uradnega
API-ja REST (`api.cursor.com/v0`) z **uporabniškim ključem API ali ključem API storitvenega računa** — to je varnejša
lastna alternativa ponovni uporabi seje OAuth okolja Cursor IDE (ponudnik `cursor`,
ki vsebuje opozorilo glede nevarnosti prepovedi). Gre za navaden adapter REST (brez izvorne
odvisnosti `@cursor/sdk`). `approvePlan` sproži izjemo (Cursorjevi agenti delujejo avtonomno); `listSources` navede
repozitorije, ki so dostopni s ključem. Cursor vrača naštevanja stanj z velikimi črkami
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), ki so izrecno preslikana v skupni
`CloudAgentStatus`. `baseUrl` je mogoče preglasiti za posamezne poverilnice, zato je mogoče različico/pot API-ja
popraviti brez spremembe kode.

## Domenske vrste

Vir: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // mora biti veljaven URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekunde, pozitivno celo število
  cost?: number; // pozitivno število s plavajočo vejico
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
  externalId?: string; // ID zunanjega ponudnika
  status: CloudAgentStatus;
  prompt: string; // 1..10000 znakov
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

Sheme za preverjanje veljavnosti (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) so
izvožene skupaj z vrstami in jih uporabljajo obdelovalniki poti.

## Podatkovna zbirka

Vir: `src/lib/cloudAgent/db.ts` — tabela se ustvari ob prvi uporabi prek
`createCloudAgentTaskTable()` (ki se ob uvozu modula kliče tudi iz
`src/lib/cloudAgent/index.ts`).

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

`updateCloudAgentTask` uveljavlja **seznam dovoljenih stolpcev**, da prepreči vrivanje SQL:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Vsi drugi ključi v delni posodobitvi se tiho zavržejo.

## REST API — življenjski cikel opravila

**Preverjanje pristnosti:** Vse končne točke `/api/v1/agents/tasks*` zahtevajo
**upravljavsko preverjanje pristnosti** (`requireCloudAgentManagementAuth` ovija
`requireManagementAuth` iz `src/lib/api/requireManagementAuth`). To se uveljavlja po
potrditvi `588a0333` (_»fix(auth): require management auth for agent and cooldown APIs«_).

| Metoda  | Pot                           | Namen                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | Predhodna zahteva CORS                                                         |
| GET     | `/api/v1/agents/tasks`        | Prikaz opravil (filter: `provider`, `status`, `limit≤500`)                     |
| POST    | `/api/v1/agents/tasks`        | Ustvarjanje opravila (posreduje nadrejenemu sistemu in ga shrani)              |
| DELETE  | `/api/v1/agents/tasks?id=...` | Brisanje opravila po ID-ju poizvedbe (**ne** prekliče ga v nadrejenem sistemu) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Predhodna zahteva CORS                                                         |
| GET     | `/api/v1/agents/tasks/[id]`   | Branje opravila in sprotna sinhronizacija stanja iz nadrejenega sistema        |
| POST    | `/api/v1/agents/tasks/[id]`   | Dejanje: `approve` / `message` / `cancel`                                      |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Brisanje opravila po ID-ju poti                                                |

### Ustvarjanje opravila

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

### Odobritev načrta

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Pošiljanje nadaljnjega sporočila

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Preklic (samo lokalno stanje)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` v lokalni podatkovni zbirki spremeni `status` v `"cancelled"`, vendar **ne**
pokliče nadrejenega ponudnika — v `CloudAgentBase` ni klica RPC za prekinitev. Če želite
ustaviti obračunavanje v nadrejenem sistemu, opravilo končajte v ponudnikovi lastni konzoli.

## REST API — povezovanje s ponudniki oblaka

Te pomožne končne točke v `src/app/api/cloud/` uporabljajo oddaljeni odjemalci
(CLI, aplikacija Electron ali sinhronizacijski procesi) za branje metapodatkov povezave
s ponudnikom in razreševanje vzdevkov modelov. Preverjanje pristnosti poteka z **običajnim ključem API**
(prek `validateApiKey`) in ne s skrbniškim preverjanjem pristnosti, ki ga uporabljajo končne točke opravil.

| Metoda | Pot                             | Namen                                                                            |
| ------ | ------------------------------- | -------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Preveri ključ API ter vrne prikrite metapodatke povezave in vzdevke modelov      |
| PUT    | `/api/cloud/credentials/update` | Osveži `accessToken` / `refreshToken` / `expiresAt`                              |
| POST   | `/api/cloud/model/resolve`      | Razreši vzdevek modela v `{ provider, model }`                                   |
| GET    | `/api/cloud/models/alias`       | Prikaže vse vzdevke modelov                                                      |
| PUT    | `/api/cloud/models/alias`       | Nastavi vzdevek modela (in ga samodejno sinhronizira z oblakom, če je omogočeno) |

`/api/cloud/auth` nikoli ne vrne neobdelanih vrednosti `apiKey` / `accessToken` / `refreshToken`.
Vrne `hasApiKey`, `hasAccessToken`, `hasRefreshToken` in prikrit predogled
(`maskedApiKey`: prvi 4 znaki + `****` + zadnji 4 znaki).

## Razreševanje poverilnic

`getCloudAgentCredentials(providerId)` v `src/lib/cloudAgent/api.ts`:

1. Naloži aktivne povezave s ponudniki prek `getProviderConnections({ provider: providerId, isActive: true })`.
2. Za vsako povezavo prednostno uporabi `apiKey` (brez začetnih in končnih presledkov). Če ta ni na voljo, uporabi `accessToken`.
3. Vrne prvi neprazen žeton, ovit kot `{ apiKey: token }`.
4. Vrne `null`, če ne najde nobenega uporabnega žetona — API odgovori s `400` in
   `"Za ponudnika agenta v oblaku ni konfiguriranih aktivnih poverilnic: <id>"`.

To pomeni, da agenti v oblaku znova uporabljajo isto tabelo povezav s ponudniki kot običajni
ponudniki LLM. Če želite omogočiti Jules, ustvarite aktivno povezavo z `provider: "jules"`
in izpolnjenim poljem `apiKey`.

## Nadzorna plošča

Izvorna koda: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Stran React z `"use client"`, ki:

- Prikaže opravila (periodično pridobljena prek `GET /api/v1/agents/tasks`).
- Pošlje nova opravila prek obrazca, ki se preslika v `CreateCloudAgentTaskSchema`.
- Prikaže značke stanja (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) in izriše časovnico `activities[]`.
- Prikaže `result.prUrl` / `commitMessage` / `summary`, ko je `status === "completed"`.

## Integracija z A2A

Agente v oblaku je mogoče izpostaviti kot veščine A2A z registracijo veščine A2A, ki obravnavo
`tasks/send` prenese na `getAgent(...).createTask(...)` in dogodke stanja opravil A2A
prevede v protokol JSON-RPC 2.0. Glejte [A2A-SERVER.md](./A2A-SERVER.md).

## Dodajanje novega agenta v oblaku

1. Ustvarite `src/lib/cloudAgent/agents/<name>.ts`, ki razširja `CloudAgentBase`.
2. Implementirajte `createTask`, `getStatus`, `approvePlan` (ali sprožite izjemo, če ni na voljo),
   `sendMessage`, `listSources`. Za normalizacijo stanja uporabite `this.mapStatus(...)`.
3. Registrirajte ga v `src/lib/cloudAgent/registry.ts` pod stabilnim `providerId`.
4. Razširite unijo literalov `providerId` v `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` in `CreateCloudAgentTaskSchema`).
5. Dodajte ponudnika v `src/shared/constants/providers.ts`, če potrebuje zapis povezave.
   Ponudniki, ki temeljijo na OAuth, potrebujejo tudi `src/lib/oauth/providers/`.
6. Dodajte teste v `tests/unit/cloud-agent-*.test.ts`.
7. Posodobite ta dokument in konstanto `CLOUD_AGENTS` nadzorne plošče.

## Konfiguracija

| Spremenljivka okolja | Namen                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `DATA_DIR`           | Lokacija podatkovne zbirke SQLite, ki vsebuje `cloud_agent_tasks` |
| `JWT_SECRET`         | Zahtevano za avtentikacijo upravljanja na končnih točkah opravil  |
| `API_KEY_SECRET`     | Zahtevano za šifriranje poverilnic povezav ponudnikov v mirovanju |

Trenutno ni spremenljivk okolja, specifičnih za Cloud-Agent — vse skrivnosti so shranjene v
tabeli `provider_connections`.

## Glejte tudi

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Izvorna koda: `src/lib/cloudAgent/`
- Poti: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Nadzorna plošča: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
