# Cloud Agents (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Zdroj pravdy:** `src/lib/cloudAgent/` a `src/app/api/v1/agents/tasks/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40 (aktualizácia frontmatteru; 4 agenti vrátane cursor-cloud)

OmniRoute koordinuje cloudových programovacích agentov tretích strán (Codex Cloud, Cursor,
Devin, Jules) ako dlhodobé úlohy. Každý agent je sprístupnený prostredníctvom jednotného rozhrania, takže
klienti môžu odoslať prompt + URL repozitára a získať výsledky bez toho, aby museli pracovať
s API špecifickými pre jednotlivých poskytovateľov.

Úloha cloudového agenta **nie je** bežné dokončenie chatu. Ide o trvalú, viackrokovú
pracovnú jednotku, ktorá môže trvať niekoľko minút až hodín, môže vytvoriť Pull Request ako svoj
artefakt a podporuje následné správy a (u niektorých poskytovateľov) schvaľovacie brány plánu.

![Životný cyklus úlohy cloudového agenta](../diagrams/exported/cloud-agent-flow.svg)

> Zdroj: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Podporovaní agenti

| ID poskytovateľa | Trieda             | Zdroj                                 | Základná URL upstreamu                  | Schválenie plánu  |
| ---------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`          | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Áno               |
| `devin`          | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Áno               |
| `codex-cloud`    | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nie (automatické) |
| `cursor-cloud`   | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nie (automatické) |

Register: `src/lib/cloudAgent/registry.ts` — exportuje `getAgent(providerId)`,
`getAvailableAgents()` a `isCloudAgentProvider(providerId)`. Register je jednoduchý
`Record<string, CloudAgentBase>` v pamäti, ktorý sa naplní pri načítaní modulu.

## Architektúra

```
Klient (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (vyžaduje sa autentifikácia na správu)
    → validácia CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ získava z getProviderConnections({ provider, isActive: true })
         (najprv apiKey, náhradou je accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST do API upstream poskytovateľa
      └─ vráti CloudAgentTask s interným id + externalId
    → insertCloudAgentTask(...) do cloud_agent_tasks (SQLite)

Dopytovanie (oneskorená synchronizácia pri čítaní):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // obnoví stav + aktivity
    → updateCloudAgentTask(...) s novým stavom, výsledkom, completed_at
    → vráti serializovanú úlohu

Interakcie:
  POST /api/v1/agents/tasks/[id]  telo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        pre "approve"
    → agent.sendMessage(externalId, message, credentials) pre "message"
    → stav sa zmení na "cancelled"                      pre "cancel" (iba lokálne)
```

Synchronizácia je **oneskorená**: stav sa obnovuje z upstreamu pri každom `GET /tasks/[id]`.
Neexistuje žiadny poller na pozadí. Dashboardy, ktoré potrebujú aktuálny stav, by mali odosielať dopyty na GET
endpoint vo vhodnom intervale.

## Rozhranie `CloudAgentBase`

Zdroj: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristické mapovanie reťazca od poskytovateľa → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` zámerne vyvolá výnimku — Codex Cloud vytvára plány automaticky a
nemá schvaľovaciu bránu. `CodexCloudAgent.listSources` vracia `[]`.

`CursorCloudAgent` ovláda Background / Cloud Agents služby Cursor prostredníctvom jej oficiálneho REST
API (`api.cursor.com/v0`) s **API kľúčom používateľa alebo servisného účtu** — bezpečnejšou
alternatívou prvej strany k opätovnému používaniu relácie OAuth z Cursor IDE (poskytovateľ `cursor`,
ktorý obsahuje varovanie pred rizikom zablokovania). Ide o jednoduchý adaptér REST (bez natívnej
závislosti `@cursor/sdk`). `approvePlan` vyvolá výnimku (agenti Cursor pracujú autonómne); `listSources` vypíše
repozitáre dostupné pomocou daného kľúča. Cursor vracia stavové hodnoty enum zapísané VEĽKÝMI PÍSMENAMI
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), ktoré sa explicitne mapujú na spoločný
`CloudAgentStatus`. `baseUrl` možno prepísať pre jednotlivé prihlasovacie údaje, aby bolo možné
opraviť verziu/cestu API bez zmeny kódu.

## Doménové typy

Zdroj: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // musí byť platná URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekundy, kladné celé číslo
  cost?: number; // kladné desatinné číslo
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // interné ID `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ID poskytovateľa
  status: CloudAgentStatus;
  prompt: string; // 1 až 10000 znakov
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

Validačné schémy (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) sa
exportujú spolu s typmi a používajú ich obslužné rutiny trás.

## Databáza

Zdroj: `src/lib/cloudAgent/db.ts` — tabuľka sa vytvára len v prípade potreby prostredníctvom
`createCloudAgentTaskTable()` (volá sa aj zo súboru `src/lib/cloudAgent/index.ts` pri
importe modulu).

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

`updateCloudAgentTask` vynucuje **zoznam povolených stĺpcov**, aby zabránil SQL injection:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Každý iný kľúč v čiastočnej aktualizácii sa bez upozornenia zahodí.

## REST API — životný cyklus úlohy

**Autentifikácia:** Všetky koncové body `/api/v1/agents/tasks*` vyžadujú **autentifikáciu správy**
(`requireCloudAgentManagementAuth` obaľuje `requireManagementAuth` zo súboru
`src/lib/api/requireManagementAuth`). Toto sa vynucuje od commitu `588a0333`
(_„fix(auth): vyžadovať autentifikáciu správy pre API agentov a cooldownov“_).

| Metóda  | Cesta                         | Účel                                                                     |
| ------- | ----------------------------- | ------------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | Predbežná požiadavka CORS                                                |
| GET     | `/api/v1/agents/tasks`        | Zoznam úloh (filter: `provider`, `status`, `limit≤500`)                  |
| POST    | `/api/v1/agents/tasks`        | Vytvorenie úlohy (odošle ju nadradenej službe a uloží)                   |
| DELETE  | `/api/v1/agents/tasks?id=...` | Odstránenie úlohy podľa ID v dopyte (**nezruší** ju v nadradenej službe) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Predbežná požiadavka CORS                                                |
| GET     | `/api/v1/agents/tasks/[id]`   | Načítanie úlohy + priebežná synchronizácia stavu z nadradenej služby     |
| POST    | `/api/v1/agents/tasks/[id]`   | Akcia: `approve` / `message` / `cancel`                                  |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Odstránenie úlohy podľa ID v ceste                                       |

### Vytvorenie úlohy

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

Odpoveď `201`:

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

### Schválenie plánu

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Odoslanie doplňujúcej správy

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Zrušenie (iba lokálny stav)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` zmení `status` na `"cancelled"` v lokálnej databáze, ale **nezavolá**
nadradeného poskytovateľa — v `CloudAgentBase` nie je žiadne RPC na prerušenie. Ak chcete zastaviť
účtovanie nadradenej služby, ukončite úlohu vo vlastnej konzole poskytovateľa.

## REST API — infraštruktúra cloudových poskytovateľov

Tieto pomocné koncové body v adresári `src/app/api/cloud/` používajú vzdialení klienti
(CLI, aplikácia Electron alebo synchronizačné procesy) na čítanie metadát pripojenia
poskytovateľov a rozpoznávanie aliasov modelov. Overujú sa pomocou **bežného API kľúča**
(prostredníctvom `validateApiKey`), nie pomocou správcovského overenia používaného koncovými bodmi úloh.

| Metóda | Cesta                           | Účel                                                                                |
| ------ | ------------------------------- | ----------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Overiť API kľúč a vrátiť maskované metadáta pripojenia + aliasy modelov             |
| PUT    | `/api/cloud/credentials/update` | Obnoviť `accessToken` / `refreshToken` / `expiresAt`                                |
| POST   | `/api/cloud/model/resolve`      | Rozpoznať alias modelu na `{ provider, model }`                                     |
| GET    | `/api/cloud/models/alias`       | Vypísať všetky aliasy modelov                                                       |
| PUT    | `/api/cloud/models/alias`       | Nastaviť alias modelu (a automaticky ho synchronizovať do Cloud, ak je to povolené) |

`/api/cloud/auth` nikdy nevracia nespracované hodnoty `apiKey` / `accessToken` / `refreshToken`.
Vracia `hasApiKey`, `hasAccessToken`, `hasRefreshToken` a maskovaný náhľad
(`maskedApiKey`: prvé 4 + `****` + posledné 4).

## Rozpoznávanie prihlasovacích údajov

`getCloudAgentCredentials(providerId)` v súbore `src/lib/cloudAgent/api.ts`:

1. Načíta aktívne pripojenia poskytovateľov prostredníctvom `getProviderConnections({ provider: providerId, isActive: true })`.
2. Pre každé pripojenie uprednostní `apiKey` (bez okolitých medzier). Ak nie je k dispozícii, použije `accessToken`.
3. Vráti prvý neprázdny token zabalený ako `{ apiKey: token }`.
4. Ak sa nenájde žiadny použiteľný token, vráti `null` — API odpovie stavom `400` so správou
   `"No active credentials configured for cloud agent provider: <id>"`.

To znamená, že cloudoví agenti opätovne používajú rovnakú tabuľku pripojení poskytovateľov
ako bežní poskytovatelia LLM. Ak chcete povoliť Jules, vytvorte aktívne pripojenie s hodnotou
`provider: "jules"` a vyplneným `apiKey`.

## Ovládací panel

Zdroj: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

React stránka s direktívou `"use client"`, ktorá:

- Zobrazuje zoznam úloh (pravidelne získavaný prostredníctvom `GET /api/v1/agents/tasks`).
- Odosiela nové úlohy prostredníctvom formulára mapovaného na `CreateCloudAgentTaskSchema`.
- Zobrazuje stavové odznaky (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) a vykresľuje časovú os `activities[]`.
- Keď platí `status === "completed"`, zobrazuje `result.prUrl` / `commitMessage` / `summary`.

## Integrácia s A2A

Cloudových agentov možno sprístupniť ako zručnosti A2A zaregistrovaním zručnosti A2A, ktorá deleguje
svoju obsluhu `tasks/send` na `getAgent(...).createTask(...)` a prekladá udalosti stavu úloh A2A
do protokolu JSON-RPC 2.0. Pozrite si [A2A-SERVER.md](./A2A-SERVER.md).

## Pridanie nového cloudového agenta

1. Vytvorte `src/lib/cloudAgent/agents/<name>.ts`, ktorý rozširuje `CloudAgentBase`.
2. Implementujte `createTask`, `getStatus`, `approvePlan` (alebo vyvolajte výnimku, ak sa nepoužíva),
   `sendMessage`, `listSources`. Na normalizáciu stavu použite `this.mapStatus(...)`.
3. Zaregistrujte ho v `src/lib/cloudAgent/registry.ts` pod stabilným `providerId`.
4. Rozšírte zjednotenie literálov `providerId` v `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` a `CreateCloudAgentTaskSchema`).
5. Ak potrebuje záznam pripojenia, pridajte poskytovateľa do `src/shared/constants/providers.ts`.
   Poskytovatelia založení na OAuth potrebujú tiež `src/lib/oauth/providers/`.
6. Pridajte testy do `tests/unit/cloud-agent-*.test.ts`.
7. Aktualizujte tento dokument a konštantu `CLOUD_AGENTS` ovládacieho panela.

## Konfigurácia

| Premenná prostredia | Účel                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------ |
| `DATA_DIR`          | Umiestnenie databázy SQLite obsahujúcej tabuľku `cloud_agent_tasks`                  |
| `JWT_SECRET`        | Vyžaduje sa na overovanie správy v koncových bodoch úloh                             |
| `API_KEY_SECRET`    | Vyžaduje sa na šifrovanie prihlasovacích údajov pripojení poskytovateľov pri uložení |

V súčasnosti neexistujú žiadne premenné prostredia špecifické pre Cloud-Agent — všetky tajné údaje sa nachádzajú v tabuľke
`provider_connections`.

## Pozrite tiež

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Zdroj: `src/lib/cloudAgent/`
- Trasy: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Riadiaci panel: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
