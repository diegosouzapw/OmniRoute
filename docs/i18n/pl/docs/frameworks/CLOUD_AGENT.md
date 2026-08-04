---
title: "Cloud Agenci"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Cloud Agenci

> **Source of truth:** `src/lib/cloudAgent/` and `src/app/api/v1/agents/tasks/`
> **Last updated:** 2026-06-28 — v3.8.40 (frontmatter refresh; 4 agents incl. cursor-cloud)

OmniRoute orkiestruje zewnętrznych, hostowanych w chmurze agentów kodujących (Codex Cloud, Cursor,
Devin, Jules) jako długotrwałe taski. Każdy agent jest opakowany jednolitym interfejsem, dzięki czemu
klienci mogą przesłać prompt + URL repozytorium i otrzymać wyniki bez kontaktu z
API specyficznymi dla providera.

Task Cloud Agenta to **nie** zwykłe chat completion. To trwały, wieloetapowy
element pracy, który może trwać od minut do godzin, może wygenerować Pull Request jako
artefakt i obsługuje wiadomości follow-up oraz (u części providerów) bramki zatwierdzania planu.

![Cloud Agent task lifecycle](../diagrams/exported/cloud-agent-flow.svg)

> Source: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Obsługiwani agenci

| Provider ID    | Class              | Source                                | Upstream Base URL                       | Plan Approval |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Yes           |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Yes           |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | No (auto)     |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | No (auto)     |

Registry: `src/lib/cloudAgent/registry.ts` — eksportuje `getAgent(providerId)`,
`getAvailableAgents()` oraz `isCloudAgentProvider(providerId)`. Registry to
zwykły in-memory `Record<string, CloudAgentBase>` wypełniany przy ładowaniu modułu.

## Architektura

```
Client (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (management auth required)
    → CreateCloudAgentTaskSchema validation (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ pulls from getProviderConnections({ provider, isActive: true })
         (apiKey first, fallback to accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST to upstream provider API
      └─ returns CloudAgentTask with internal id + externalId
    → insertCloudAgentTask(...) into cloud_agent_tasks (SQLite)

Polling (lazy sync on read):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // refreshes status + activities
    → updateCloudAgentTask(...) with new status, result, completed_at
    → return serialized task

Interactions:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        for "approve"
    → agent.sendMessage(externalId, message, credentials) for "message"
    → status flips to "cancelled"                       for "cancel" (local-only)
```

Synchronizacja jest **leniwa**: status jest odświeżany z upstreamu przy każdym `GET /tasks/[id]`.
Nie ma background pollera. Dashboardy potrzebujące świeżego stanu powinny odpytywać endpoint GET
w rozsądnym interwale.

## Interfejs `CloudAgentBase`

Source: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristic upstream-string → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` celowo rzuca wyjątek — Codex Cloud planuje automatycznie i nie ma
bramki zatwierdzania. `CodexCloudAgent.listSources` zwraca `[]`.

`CursorCloudAgent` steruje Background / Cloud Agents Cursora przez oficjalne REST
API (`api.cursor.com/v0`) z **kluczem API użytkownika lub konta serwisowego** — bezpieczniejszą,
first-party alternatywą wobec ponownego użycia sesji OAuth IDE Cursor (provider `cursor`,
który niesie ostrzeżenie o ryzyku bana). To zwykły adapter REST (bez natywnej zależności
`@cursor/sdk`). `approvePlan` rzuca wyjątek (agenci Cursora działają autonomicznie); `listSources` listuje
repozytoria dostępne dla klucza. Cursor zwraca statusy enum UPPERCASE
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), mapowane jawnie na wspólny
`CloudAgentStatus`. `baseUrl` jest nadpisywalny per-credential, więc wersję/ścieżkę API można
skorygować bez zmiany kodu.

## Typy domenowe

Source: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // must be a valid URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // seconds, positive int
  cost?: number; // positive float
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // internal `task_...` id
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // upstream provider's id
  status: CloudAgentStatus;
  prompt: string; // 1..10000 chars
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

Schematy walidacji (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) są
eksportowane obok typów i używane przez handlery route'ów.

## Baza danych

Source: `src/lib/cloudAgent/db.ts` — tabela jest tworzona leniwie przez
`createCloudAgentTaskTable()` (wywoływane także z `src/lib/cloudAgent/index.ts` przy
importcie modułu).

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

`updateCloudAgentTask` wymusza **whitelistę kolumn**, aby zapobiec SQL injection:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Każdy inny klucz w częściowej aktualizacji jest cicho pomijany.

## REST API — cykl życia taska

**Auth:** Wszystkie endpointy `/api/v1/agents/tasks*` wymagają **management auth**
(`requireCloudAgentManagementAuth` opakowuje `requireManagementAuth` z
`src/lib/api/requireManagementAuth`). Jest to wymuszane od commita `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Method  | Path                          | Purpose                                                |
| ------- | ----------------------------- | ------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | CORS preflight                                         |
| GET     | `/api/v1/agents/tasks`        | List tasks (filter: `provider`, `status`, `limit≤500`) |
| POST    | `/api/v1/agents/tasks`        | Create task (dispatches to upstream + persists)        |
| DELETE  | `/api/v1/agents/tasks?id=...` | Delete task by query id (does **not** cancel upstream) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS preflight                                         |
| GET     | `/api/v1/agents/tasks/[id]`   | Read task + lazy-sync status from upstream             |
| POST    | `/api/v1/agents/tasks/[id]`   | Action: `approve` / `message` / `cancel`               |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Delete task by path id                                 |

### Utworzenie taska

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

Odpowiedź `201`:

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

### Zatwierdzenie planu

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Wysłanie wiadomości follow-up

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Anulowanie (tylko status lokalny)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` ustawia `status` na `"cancelled"` w lokalnej bazie, ale **nie** wywołuje
upstream providera — w `CloudAgentBase` nie ma abort RPC. Aby zatrzymać billing
upstream, zakończ task w konsoli samego providera.

## REST API — infrastruktura Cloud Provider

Te pomocnicze endpointy pod `src/app/api/cloud/` są używane przez zdalnych klientów
(CLI, aplikacja Electron lub workery sync) do odczytu metadanych połączeń providerów
oraz rozwiązywania aliasów modeli. Są uwierzytelniane **zwykłym kluczem API**
(przez `validateApiKey`), a nie management auth używanym przez endpointy tasków.

| Method | Path                            | Purpose                                                             |
| ------ | ------------------------------- | ------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Validate API key, return masked connection metadata + model aliases |
| PUT    | `/api/cloud/credentials/update` | Refresh `accessToken` / `refreshToken` / `expiresAt`                |
| POST   | `/api/cloud/model/resolve`      | Resolve a model alias to `{ provider, model }`                      |
| GET    | `/api/cloud/models/alias`       | List all model aliases                                              |
| PUT    | `/api/cloud/models/alias`       | Set a model alias (and auto-sync to Cloud if enabled)               |

`/api/cloud/auth` nigdy nie zwraca surowego `apiKey` / `accessToken` / `refreshToken`. Zwraca
`hasApiKey`, `hasAccessToken`, `hasRefreshToken` oraz zamaskowany podgląd
(`maskedApiKey`: pierwsze 4 + `****` + ostatnie 4).

## Rozwiązywanie poświadczeń

`getCloudAgentCredentials(providerId)` w `src/lib/cloudAgent/api.ts`:

1. Ładuje aktywne połączenia providerów przez `getProviderConnections({ provider: providerId, isActive: true })`.
2. Dla każdego połączenia preferuje `apiKey` (trimmed). Fallback na `accessToken`.
3. Zwraca pierwszy niepusty token opakowany jako `{ apiKey: token }`.
4. Zwraca `null`, gdy nie znaleziono użytecznego tokena — API odpowiada `400` z
   `"No active credentials configured for cloud agent provider: <id>"`.

Oznacza to, że Cloud Agenci współdzielą tę samą tabelę Provider Connection co zwykli
providerzy LLM. Aby włączyć Jules, utwórz aktywne połączenie z `provider: "jules"`
i wypełnionym `apiKey`.

## Dashboard

Source: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Strona React `"use client"`, która:

- Listuje taski (polling przez `GET /api/v1/agents/tasks`).
- Przesyła nowe taski formularzem mapowanym na `CreateCloudAgentTaskSchema`.
- Pokazuje badge'e statusu (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) i renderuje timeline `activities[]`.
- Wyświetla `result.prUrl` / `commitMessage` / `summary`, gdy `status === "completed"`.

## Integracja z A2A

Cloud Agenci mogą być eksponowani jako skill'e A2A przez zarejestrowanie skill'a A2A, który deleguje
swój handler `tasks/send` do `getAgent(...).createTask(...)` i tłumaczy zdarzenia statusu tasków A2A
na protokół JSON-RPC 2.0. Zobacz [A2A-SERVER.md](./A2A-SERVER.md).

## Dodawanie nowego Cloud Agenta

1. Utwórz `src/lib/cloudAgent/agents/<name>.ts` rozszerzające `CloudAgentBase`.
2. Zaimplementuj `createTask`, `getStatus`, `approvePlan` (lub rzuć wyjątek, jeśli N/A),
   `sendMessage`, `listSources`. Użyj `this.mapStatus(...)` do normalizacji statusu.
3. Zarejestruj w `src/lib/cloudAgent/registry.ts` pod stabilnym `providerId`.
4. Rozszerz unię literałów `providerId` w `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` oraz `CreateCloudAgentTaskSchema`).
5. Dodaj providera do `src/shared/constants/providers.ts`, jeśli potrzebuje rekordu
   połączenia. Providery oparte na OAuth wymagają też `src/lib/oauth/providers/`.
6. Dodaj testy w `tests/unit/cloud-agent-*.test.ts`.
7. Zaktualizuj ten dokument oraz stałą `CLOUD_AGENTS` w dashboardzie.

## Konfiguracja

| Env Var          | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| `DATA_DIR`       | Location of the SQLite database holding `cloud_agent_tasks` |
| `JWT_SECRET`     | Required for management auth on task endpoints              |
| `API_KEY_SECRET` | Required to encrypt provider connection credentials at rest |

Dziś nie ma env varów specyficznych dla Cloud Agentów — każdy sekret żyje w tabeli
`provider_connections`.

## Zobacz też

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Source: `src/lib/cloudAgent/`
- Routes: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Dashboard: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
