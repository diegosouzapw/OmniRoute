# Cloud Agents (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Zdroj pravdy:** `src/lib/cloudAgent/` a `src/app/api/v1/agents/tasks/`
> **Naposledy aktualizováno:** 2026-06-28 — v3.8.40 (aktualizace frontmatteru; 4 agenti včetně cursor-cloud)

OmniRoute řídí cloudové programovací agenty třetích stran (Codex Cloud, Cursor,
Devin, Jules) jako dlouhotrvající úlohy. Každý agent je zapouzdřen za jednotným rozhraním,
takže klienti mohou odeslat prompt + URL repozitáře a získat výsledky, aniž by museli pracovat
s API specifickými pro jednotlivé poskytovatele.

Úloha Cloud Agent **není** běžné dokončení chatu. Jde o trvalou, vícekrokovou
pracovní jednotku, jejíž dokončení může trvat minuty až hodiny, může jako svůj
artefakt vytvořit Pull Request a podporuje následné zprávy a (u některých poskytovatelů)
schvalovací brány plánu.

![Životní cyklus úlohy Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Zdroj: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Podporovaní agenti

| ID poskytovatele | Třída              | Zdroj                                 | Základní URL upstreamu                  | Schválení plánu  |
| ---------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------- |
| `jules`          | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ano              |
| `devin`          | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ano              |
| `codex-cloud`    | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Ne (automaticky) |
| `cursor-cloud`   | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Ne (automaticky) |

Registr: `src/lib/cloudAgent/registry.ts` — exportuje `getAgent(providerId)`,
`getAvailableAgents()` a `isCloudAgentProvider(providerId)`. Registr je prostý
`Record<string, CloudAgentBase>` v paměti, který se naplní při načtení modulu.

## Architektura

```
Klient (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (vyžadováno ověření pro správu)
    → validace CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ načítá z getProviderConnections({ provider, isActive: true })
         (nejprve apiKey, záložně accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST do API upstreamového poskytovatele
      └─ vrací CloudAgentTask s interním id + externalId
    → insertCloudAgentTask(...) do cloud_agent_tasks (SQLite)

Dotazování (opožděná synchronizace při čtení):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // aktualizuje stav + aktivity
    → updateCloudAgentTask(...) s novým stavem, výsledkem, completed_at
    → vrátí serializovanou úlohu

Interakce:
  POST /api/v1/agents/tasks/[id]  tělo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        pro "approve"
    → agent.sendMessage(externalId, message, credentials) pro "message"
    → stav se změní na "cancelled"                      pro "cancel" (pouze lokálně)
```

Synchronizace je **opožděná**: stav se z upstreamu aktualizuje při každém požadavku
`GET /tasks/[id]`. Neexistuje žádný proces dotazování na pozadí. Dashboardy, které
potřebují aktuální stav, by měly endpoint GET dotazovat v rozumném intervalu.

## Rozhraní `CloudAgentBase`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristické mapování řetězce poskytovatele → výčtový typ
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` záměrně vyvolá výjimku — Codex Cloud vytváří plány automaticky a
nemá žádný schvalovací krok. `CodexCloudAgent.listSources` vrací `[]`.

`CursorCloudAgent` ovládá Cursor Background / Cloud Agents prostřednictvím jeho oficiálního REST
API (`api.cursor.com/v0`) pomocí **API klíče uživatele nebo servisního účtu** — jde o bezpečnější
alternativu první strany k opětovnému použití relace OAuth z Cursor IDE (poskytovatel `cursor`,
u kterého je uvedeno varování před rizikem zablokování). Jde o jednoduchý REST adaptér (bez nativní
závislosti `@cursor/sdk`). `approvePlan` vyvolá výjimku (agenti Cursor běží autonomně); `listSources` vypíše
repozitáře dostupné pomocí daného klíče. Cursor vrací výčtové hodnoty stavů psané VELKÝMI PÍSMENY
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), které jsou explicitně mapovány na sdílený
`CloudAgentStatus`. `baseUrl` lze přepsat pro jednotlivé přihlašovací údaje, takže verzi/cestu API lze
opravit bez změny kódu.

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
  repoUrl: string; // musí být platná URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // sekundy, kladné celé číslo
  cost?: number; // kladné desetinné číslo
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // interní ID `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ID poskytovatele
  status: CloudAgentStatus;
  prompt: string; // 1..10000 znaků
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

Validační schémata (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) jsou
exportována společně s typy a používají je obslužné rutiny tras.

## Databáze

Zdroj: `src/lib/cloudAgent/db.ts` — tabulka se vytváří líně pomocí
`createCloudAgentTaskTable()` (volá se také ze souboru `src/lib/cloudAgent/index.ts` při
importu modulu).

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

`updateCloudAgentTask` vynucuje **seznam povolených sloupců**, aby zabránil SQL injection:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Jakýkoli jiný klíč v částečné aktualizaci je bez upozornění odstraněn.

## REST API — životní cyklus úlohy

**Autentizace:** Všechny endpointy `/api/v1/agents/tasks*` vyžadují **autentizaci pro správu**
(`requireCloudAgentManagementAuth` obaluje `requireManagementAuth` ze souboru
`src/lib/api/requireManagementAuth`). Toto je vynucováno od commitu `588a0333`
(_„fix(auth): vyžadovat autentizaci pro správu u API agentů a cooldownů“_).

| Metoda  | Cesta                         | Účel                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS preflight                                                |
| GET     | `/api/v1/agents/tasks`        | Výpis úloh (filtry: `provider`, `status`, `limit≤500`)        |
| POST    | `/api/v1/agents/tasks`        | Vytvoření úlohy (odešle upstreamu + uloží)                    |
| DELETE  | `/api/v1/agents/tasks?id=...` | Odstranění úlohy podle ID v dotazu (**nezruší** ji upstreamu) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS preflight                                                |
| GET     | `/api/v1/agents/tasks/[id]`   | Načtení úlohy + líná synchronizace stavu z upstreamu          |
| POST    | `/api/v1/agents/tasks/[id]`   | Akce: `approve` / `message` / `cancel`                        |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Odstranění úlohy podle ID v cestě                             |

### Vytvoření úlohy

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

Odpověď `201`:

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

### Schválení plánu

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Odeslání doplňující zprávy

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Zrušení (pouze místní stav)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` změní `status` v místní databázi na `"cancelled"`, ale **nevolá**
upstream poskytovatele — v `CloudAgentBase` neexistuje žádné RPC pro přerušení. Chcete-li zastavit
účtování upstreamu, ukončete úlohu ve vlastní konzoli poskytovatele.

## REST API — integrace poskytovatelů cloudu

Tyto pomocné endpointy v `src/app/api/cloud/` používají vzdálení klienti
(CLI, aplikace Electron nebo synchronizační workery) ke čtení metadat připojení
poskytovatelů a překladu aliasů modelů. Ověřují se pomocí **běžného API klíče**
(prostřednictvím `validateApiKey`), nikoli pomocí ověřování pro správu používaného endpointy úloh.

| Metoda | Cesta                           | Účel                                                                            |
| ------ | ------------------------------- | ------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Ověřit API klíč a vrátit maskovaná metadata připojení + aliasy modelů           |
| PUT    | `/api/cloud/credentials/update` | Obnovit `accessToken` / `refreshToken` / `expiresAt`                            |
| POST   | `/api/cloud/model/resolve`      | Přeložit alias modelu na `{ provider, model }`                                  |
| GET    | `/api/cloud/models/alias`       | Vypsat všechny aliasy modelů                                                    |
| PUT    | `/api/cloud/models/alias`       | Nastavit alias modelu (a při povolení jej automaticky synchronizovat do cloudu) |

`/api/cloud/auth` nikdy nevrací nezpracované hodnoty `apiKey` / `accessToken` / `refreshToken`.
Vrací `hasApiKey`, `hasAccessToken`, `hasRefreshToken` a maskovaný náhled
(`maskedApiKey`: první 4 + `****` + poslední 4).

## Vyhledání přihlašovacích údajů

`getCloudAgentCredentials(providerId)` v `src/lib/cloudAgent/api.ts`:

1. Načte aktivní připojení poskytovatele pomocí `getProviderConnections({ provider: providerId, isActive: true })`.
2. Pro každé připojení upřednostní `apiKey` (bez okolních mezer). Pokud není k dispozici, použije `accessToken`.
3. Vrátí první neprázdný token zabalený jako `{ apiKey: token }`.
4. Pokud není nalezen žádný použitelný token, vrátí `null` — API odpoví stavem `400` a zprávou
   `"Pro poskytovatele cloudového agenta nejsou nakonfigurovány žádné aktivní přihlašovací údaje: <id>"`.

To znamená, že cloudoví agenti znovu používají stejnou tabulku připojení poskytovatelů jako běžní
poskytovatelé LLM. Chcete-li povolit Jules, vytvořte aktivní připojení s `provider: "jules"`
a vyplněným `apiKey`.

## Řídicí panel

Zdroj: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Stránka React s direktivou `"use client"`, která:

- Vypisuje úlohy (pravidelně načítané prostřednictvím `GET /api/v1/agents/tasks`).
- Odesílá nové úlohy prostřednictvím formuláře mapovaného na `CreateCloudAgentTaskSchema`.
- Zobrazuje odznaky stavů (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) a vykresluje časovou osu `activities[]`.
- Zobrazuje `result.prUrl` / `commitMessage` / `summary`, když platí `status === "completed"`.

## Integrace s A2A

Cloudové agenty lze zpřístupnit jako dovednosti A2A registrací dovednosti A2A, která deleguje
svůj obslužný program `tasks/send` na `getAgent(...).createTask(...)` a převádí události stavu
úloh A2A do protokolu JSON-RPC 2.0. Viz [A2A-SERVER.md](./A2A-SERVER.md).

## Přidání nového cloudového agenta

1. Vytvořte `src/lib/cloudAgent/agents/<name>.ts` rozšiřující `CloudAgentBase`.
2. Implementujte `createTask`, `getStatus`, `approvePlan` (nebo vyvolejte výjimku, pokud se nepoužívá),
   `sendMessage`, `listSources`. Pro normalizaci stavu použijte `this.mapStatus(...)`.
3. Zaregistrujte jej v `src/lib/cloudAgent/registry.ts` pod stabilním `providerId`.
4. Rozšiřte sjednocení literálů `providerId` v `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` a `CreateCloudAgentTaskSchema`).
5. Pokud potřebuje záznam připojení, přidejte poskytovatele do `src/shared/constants/providers.ts`.
   Poskytovatelé založení na OAuth také potřebují `src/lib/oauth/providers/`.
6. Přidejte testy do `tests/unit/cloud-agent-*.test.ts`.
7. Aktualizujte tento dokument a konstantu `CLOUD_AGENTS` řídicího panelu.

## Konfigurace

| Proměnná prostředí | Účel                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ |
| `DATA_DIR`         | Umístění databáze SQLite obsahující tabulku `cloud_agent_tasks`                      |
| `JWT_SECRET`       | Vyžadováno pro ověřování správy na koncových bodech úloh                             |
| `API_KEY_SECRET`   | Vyžadováno k šifrování přihlašovacích údajů připojení poskytovatele v klidovém stavu |

V současnosti neexistují žádné proměnné prostředí specifické pro Cloud-Agent — všechny tajné údaje jsou uloženy v tabulce
`provider_connections`.

## Viz také

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Zdroj: `src/lib/cloudAgent/`
- Trasy: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Řídicí panel: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
