# Cloud Agents (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Maßgebliche Quelle:** `src/lib/cloudAgent/` und `src/app/api/v1/agents/tasks/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40 (Frontmatter-Aktualisierung; 4 Agenten einschließlich cursor-cloud)

OmniRoute orchestriert von Drittanbietern in der Cloud gehostete Coding-Agenten (Codex Cloud, Cursor,
Devin, Jules) als langlebige Tasks. Jeder Agent wird hinter einer einheitlichen Schnittstelle gekapselt,
sodass Clients einen Prompt und eine Repository-URL übermitteln und Ergebnisse empfangen können,
ohne sich mit anbieterspezifischen APIs befassen zu müssen.

Ein Cloud-Agent-Task ist **keine** reguläre Chat-Vervollständigung. Er ist eine dauerhafte, mehrstufige
Arbeitseinheit, deren Ausführung Minuten bis Stunden dauern kann, die einen Pull Request als
Artefakt erzeugen kann und Folgenachrichten sowie (bei einigen Anbietern) Freigabeschritte für Pläne unterstützt.

![Lebenszyklus eines Cloud-Agent-Tasks](../diagrams/exported/cloud-agent-flow.svg)

> Quelle: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Unterstützte Agenten

| Anbieter-ID    | Klasse             | Quelle                                | Upstream-Basis-URL                      | Planfreigabe       |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------ |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ja                 |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ja                 |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nein (automatisch) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nein (automatisch) |

Registry: `src/lib/cloudAgent/registry.ts` — exportiert `getAgent(providerId)`,
`getAvailableAgents()` und `isCloudAgentProvider(providerId)`. Die Registry ist ein
einfaches speicherinternes `Record<string, CloudAgentBase>`, das beim Laden des Moduls befüllt wird.

## Architektur

```
Client (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (Management-Authentifizierung erforderlich)
    → Validierung durch CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ ruft Daten aus getProviderConnections({ provider, isActive: true }) ab
         (zuerst apiKey, ersatzweise accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST an die Upstream-Anbieter-API
      └─ gibt CloudAgentTask mit interner id und externalId zurück
    → insertCloudAgentTask(...) in cloud_agent_tasks (SQLite)

Polling (verzögerte Synchronisierung beim Lesen):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // aktualisiert Status und Aktivitäten
    → updateCloudAgentTask(...) mit neuem Status, Ergebnis und completed_at
    → gibt den serialisierten Task zurück

Interaktionen:
  POST /api/v1/agents/tasks/[id]  Body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)          für "approve"
    → agent.sendMessage(externalId, message, credentials) für "message"
    → Status wechselt zu "cancelled"                      für "cancel" (nur lokal)
```

Die Synchronisierung erfolgt **verzögert**: Der Status wird bei jedem `GET /tasks/[id]`
vom Upstream aktualisiert. Es gibt keinen Hintergrund-Poller. Dashboards, die einen
aktuellen Zustand benötigen, sollten den GET-Endpunkt in einem sinnvollen Intervall abfragen.

## `CloudAgentBase`-Schnittstelle

Quelle: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristische Zuordnung einer Upstream-Zeichenfolge → Enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` löst absichtlich eine Ausnahme aus – Codex Cloud plant automatisch und verfügt über
keinen Genehmigungsschritt. `CodexCloudAgent.listSources` gibt `[]` zurück.

`CursorCloudAgent` steuert Cursors Background / Cloud Agents über dessen offizielle REST-
API (`api.cursor.com/v0`) mit einem **API-Schlüssel eines Benutzers oder Dienstkontos** – die sicherere,
direkte Alternative zur Wiederverwendung der OAuth-Sitzung der Cursor IDE (Anbieter `cursor`,
für den eine Warnung vor einem Sperrrisiko gilt). Es handelt sich um einen einfachen REST-Adapter (keine native
Abhängigkeit von `@cursor/sdk`). `approvePlan` löst eine Ausnahme aus (Cursor-Agenten werden autonom ausgeführt); `listSources` listet
die Repositorys auf, auf die mit dem Schlüssel zugegriffen werden kann. Cursor gibt Status-Enums in Großbuchstaben zurück
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), die explizit dem gemeinsamen
`CloudAgentStatus` zugeordnet werden. `baseUrl` kann für jeden Berechtigungsnachweis überschrieben werden, sodass die API-Version bzw. der API-Pfad
ohne Codeänderung korrigiert werden kann.

## Domänentypen

Quelle: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // muss eine gültige URL sein
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // Sekunden, positive Ganzzahl
  cost?: number; // positive Fließkommazahl
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // interne `task_...`-ID
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ID des Upstream-Anbieters
  status: CloudAgentStatus;
  prompt: string; // 1..10000 Zeichen
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

Die Validierungsschemas (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) werden
zusammen mit den Typen exportiert und von den Routen-Handlern verwendet.

## Datenbank

Quelle: `src/lib/cloudAgent/db.ts` — die Tabelle wird bei Bedarf über
`createCloudAgentTaskTable()` erstellt (wird außerdem beim Modulimport aus
`src/lib/cloudAgent/index.ts` aufgerufen).

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

`updateCloudAgentTask` erzwingt eine **Positivliste für Spalten**, um SQL-Injection zu verhindern:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Jeder andere Schlüssel in der partiellen Aktualisierung wird stillschweigend verworfen.

## REST-API — Aufgabenlebenszyklus

**Authentifizierung:** Alle `/api/v1/agents/tasks*`-Endpunkte erfordern eine
**Management-Authentifizierung** (`requireCloudAgentManagementAuth` umschließt
`requireManagementAuth` aus `src/lib/api/requireManagementAuth`). Dies wird seit
Commit `588a0333` erzwungen (_„fix(auth): Management-Authentifizierung für Agenten- und Cooldown-APIs erforderlich machen“_).

| Methode | Pfad                          | Zweck                                                                |
| ------- | ----------------------------- | -------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS-Preflight                                                       |
| GET     | `/api/v1/agents/tasks`        | Aufgaben auflisten (Filter: `provider`, `status`, `limit≤500`)       |
| POST    | `/api/v1/agents/tasks`        | Aufgabe erstellen (an Upstream weiterleiten + persistieren)          |
| DELETE  | `/api/v1/agents/tasks?id=...` | Aufgabe anhand der Abfrage-ID löschen (bricht Upstream **nicht** ab) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS-Preflight                                                       |
| GET     | `/api/v1/agents/tasks/[id]`   | Aufgabe lesen + Status verzögert mit Upstream synchronisieren        |
| POST    | `/api/v1/agents/tasks/[id]`   | Aktion: `approve` / `message` / `cancel`                             |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Aufgabe anhand der Pfad-ID löschen                                   |

### Aufgabe erstellen

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

Antwort `201`:

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

### Einen Plan genehmigen

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Eine Folgenachricht senden

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Abbrechen (nur lokaler Status)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` setzt `status` in der lokalen Datenbank auf `"cancelled"`, ruft jedoch
**nicht** den Upstream-Anbieter auf — in `CloudAgentBase` gibt es keinen RPC zum
Abbrechen. Um die Abrechnung beim Upstream-Anbieter zu stoppen, beenden Sie die
Aufgabe in der eigenen Konsole des Anbieters.

## REST-API — Cloud-Provider-Anbindung

Diese zusätzlichen Endpunkte unter `src/app/api/cloud/` werden von Remote-Clients
(der CLI, der Electron-App oder Synchronisierungs-Workern) verwendet, um Verbindungsmetadaten
von Providern abzurufen und Modellaliase aufzulösen. Sie werden mit einem **regulären API-Schlüssel**
(über `validateApiKey`) authentifiziert, nicht mit der von den Aufgabenendpunkten verwendeten Verwaltungsauthentifizierung.

| Methode | Pfad                            | Zweck                                                                                       |
| ------- | ------------------------------- | ------------------------------------------------------------------------------------------- |
| POST    | `/api/cloud/auth`               | API-Schlüssel validieren, maskierte Verbindungsmetadaten + Modellaliase zurückgeben         |
| PUT     | `/api/cloud/credentials/update` | `accessToken` / `refreshToken` / `expiresAt` aktualisieren                                  |
| POST    | `/api/cloud/model/resolve`      | Einen Modellalias in `{ provider, model }` auflösen                                         |
| GET     | `/api/cloud/models/alias`       | Alle Modellaliase auflisten                                                                 |
| PUT     | `/api/cloud/models/alias`       | Einen Modellalias festlegen (und bei Aktivierung automatisch mit der Cloud synchronisieren) |

`/api/cloud/auth` gibt niemals `apiKey` / `accessToken` / `refreshToken` im Klartext zurück. Der Endpunkt
gibt `hasApiKey`, `hasAccessToken`, `hasRefreshToken` sowie eine maskierte Vorschau zurück
(`maskedApiKey`: erste 4 + `****` + letzte 4).

## Auflösung der Anmeldedaten

`getCloudAgentCredentials(providerId)` in `src/lib/cloudAgent/api.ts`:

1. Lädt aktive Provider-Verbindungen über `getProviderConnections({ provider: providerId, isActive: true })`.
2. Bevorzugt für jede Verbindung `apiKey` (bereinigt). Verwendet ersatzweise `accessToken`.
3. Gibt das erste nicht leere Token als `{ apiKey: token }` zurück.
4. Gibt `null` zurück, wenn kein verwendbares Token gefunden wird — die API antwortet mit `400` und
   `"Keine aktiven Anmeldedaten für den Cloud-Agent-Provider konfiguriert: <id>"`.

Das bedeutet, dass Cloud Agents dieselbe Provider-Verbindungstabelle wie reguläre LLM-Provider
verwenden. Um Jules zu aktivieren, erstellen Sie eine aktive Verbindung mit `provider: "jules"`
und einem ausgefüllten `apiKey`.

## Dashboard

Quelle: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Eine React-Seite mit `"use client"`, die:

- Aufgaben auflistet (regelmäßig über `GET /api/v1/agents/tasks` abgefragt).
- Neue Aufgaben über ein Formular übermittelt, das `CreateCloudAgentTaskSchema` zugeordnet ist.
- Status-Badges (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) anzeigt und die Zeitleiste `activities[]` darstellt.
- `result.prUrl` / `commitMessage` / `summary` anzeigt, wenn `status === "completed"`.

## Integration mit A2A

Cloud Agents können als A2A-Skills bereitgestellt werden, indem ein A2A-Skill registriert wird, der
seinen `tasks/send`-Handler an `getAgent(...).createTask(...)` delegiert und A2A-Aufgabenstatusereignisse
in das JSON-RPC-2.0-Protokoll übersetzt. Siehe [A2A-SERVER.md](./A2A-SERVER.md).

## Hinzufügen eines neuen Cloud Agents

1. Erstellen Sie `src/lib/cloudAgent/agents/<name>.ts` als Erweiterung von `CloudAgentBase`.
2. Implementieren Sie `createTask`, `getStatus`, `approvePlan` (oder lösen Sie eine Exception aus, falls nicht zutreffend),
   `sendMessage`, `listSources`. Verwenden Sie `this.mapStatus(...)` zur Statusnormalisierung.
3. Registrieren Sie den Agenten in `src/lib/cloudAgent/registry.ts` unter einer stabilen `providerId`.
4. Erweitern Sie die Literal-Union `providerId` in `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` und `CreateCloudAgentTaskSchema`).
5. Fügen Sie den Provider zu `src/shared/constants/providers.ts` hinzu, falls er einen Verbindungseintrag
   benötigt. OAuth-basierte Provider benötigen außerdem `src/lib/oauth/providers/`.
6. Fügen Sie Tests unter `tests/unit/cloud-agent-*.test.ts` hinzu.
7. Aktualisieren Sie dieses Dokument und die Konstante `CLOUD_AGENTS` des Dashboards.

## Konfiguration

| Umgebungsvariable | Zweck                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------- |
| `DATA_DIR`        | Speicherort der SQLite-Datenbank, die `cloud_agent_tasks` enthält                       |
| `JWT_SECRET`      | Erforderlich für die Verwaltungsauthentifizierung an Aufgabenendpunkten                 |
| `API_KEY_SECRET`  | Erforderlich, um Anmeldedaten für Provider-Verbindungen im Ruhezustand zu verschlüsseln |

Derzeit gibt es keine Cloud-Agent-spezifischen Umgebungsvariablen — jedes Geheimnis befindet sich in der Tabelle
`provider_connections`.

## Siehe auch

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Quellcode: `src/lib/cloudAgent/`
- Routen: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Dashboard: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
