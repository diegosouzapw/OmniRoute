# Cloud Agents (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Hiteles forrás:** `src/lib/cloudAgent/` és `src/app/api/v1/agents/tasks/`
> **Utolsó frissítés:** 2026-06-28 — v3.8.40 (frontmatter frissítése; 4 ügynök, köztük a cursor-cloud)

Az OmniRoute harmadik fél által felhőben üzemeltetett kódoló ügynököket (Codex Cloud, Cursor,
Devin, Jules) hangol össze hosszú ideig futó feladatokként. Minden ügynök egységes interfész
mögé van csomagolva, így az ügyfelek beküldhetnek egy promptot és egy adattár-URL-t, majd
anélkül kaphatják meg az eredményeket, hogy a szolgáltatóspecifikus API-kkal kellene foglalkozniuk.

Egy Cloud Agent-feladat **nem** hagyományos csevegéskiegészítés. Ez egy tartós, többlépéses
munkaegység, amelynek végrehajtása percektől akár órákig is tarthat, eredménytermékként
Pull Requestet hozhat létre, valamint támogatja az utólagos üzeneteket és — egyes szolgáltatóknál —
a tervjóváhagyási ellenőrzési pontokat.

![A Cloud Agent-feladat életciklusa](../diagrams/exported/cloud-agent-flow.svg)

> Forrás: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Támogatott ügynökök

| Szolgáltatóazonosító | Osztály            | Forrás                                | Külső szolgáltatás alap-URL-je          | Tervjóváhagyás    |
| -------------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`              | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Igen              |
| `devin`              | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Igen              |
| `codex-cloud`        | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Nem (automatikus) |
| `cursor-cloud`       | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Nem (automatikus) |

Regisztrációs adatbázis: `src/lib/cloudAgent/registry.ts` — exportálja a `getAgent(providerId)`,
`getAvailableAgents()` és `isCloudAgentProvider(providerId)` elemeket. A regisztrációs adatbázis
egy egyszerű, memóriában tárolt `Record<string, CloudAgentBase>`, amely a modul betöltésekor
töltődik fel.

## Architektúra

```
Ügyfél (irányítópult / CLI / API)
  → POST /api/v1/agents/tasks (kezelési hitelesítés szükséges)
    → CreateCloudAgentTaskSchema-ellenőrzés (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ lekéri innen: getProviderConnections({ provider, isActive: true })
         (először apiKey, ennek hiányában accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST-kérés a külső szolgáltató API-jához
      └─ belső id-val és externalId-val rendelkező CloudAgentTask értéket ad vissza
    → insertCloudAgentTask(...) a cloud_agent_tasks táblába (SQLite)

Lekérdezés (késleltetett szinkronizálás olvasáskor):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // frissíti az állapotot és a tevékenységeket
    → updateCloudAgentTask(...) az új állapottal, eredménnyel és completed_at értékkel
    → visszaadja a szerializált feladatot

Interakciók:
  POST /api/v1/agents/tasks/[id]  törzs: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        az "approve" művelethez
    → agent.sendMessage(externalId, message, credentials) a "message" művelethez
    → az állapot "cancelled" értékre vált               a "cancel" művelethez (csak helyileg)
```

A szinkronizálás **késleltetett**: az állapot minden `GET /tasks/[id]` kéréskor frissül a külső
szolgáltatásból. Nincs háttérben futó lekérdező. A friss állapotot igénylő irányítópultoknak
észszerű időközönként le kell kérdezniük a GET-végpontot.

## `CloudAgentBase` interfész

Forrás: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heurisztikus upstream-karakterlánc → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

A `CodexCloudAgent.approvePlan` szándékosan kivételt dob — a Codex Cloud automatikusan készít tervet, és
nem rendelkezik jóváhagyási kapuval. A `CodexCloudAgent.listSources` visszatérési értéke `[]`.

A `CursorCloudAgent` a Cursor Background / Cloud Agents szolgáltatását vezérli annak hivatalos REST
API-ján (`api.cursor.com/v0`) keresztül, egy **felhasználói vagy szolgáltatásfiókhoz tartozó API-kulccsal** — ez a biztonságosabb,
első féltől származó alternatívája a Cursor IDE OAuth-munkamenete újrafelhasználásának (`cursor`
szolgáltató, amely kitiltási kockázatra vonatkozó figyelmeztetést tartalmaz). Ez egy egyszerű REST-adapter (nincs natív
`@cursor/sdk` függősége). Az `approvePlan` kivételt dob (a Cursor-ügynökök önállóan futnak); a `listSources` felsorolja
a kulccsal elérhető adattárakat. A Cursor NAGYBETŰS állapot-enumokat ad vissza
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), amelyek explicit módon vannak leképezve a közös
`CloudAgentStatus` értékeire. A `baseUrl` hitelesítő adatonként felülírható, így az API verziója/útvonala
kódmódosítás nélkül javítható.

## Tartománytípusok

Forrás: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // érvényes URL-nek kell lennie
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // másodperc, pozitív egész szám
  cost?: number; // pozitív lebegőpontos szám
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // belső `task_...` azonosító
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // az upstream szolgáltató azonosítója
  status: CloudAgentStatus;
  prompt: string; // 1..10000 karakter
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

A validációs sémák (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) a típusokkal
együtt vannak exportálva, és az útvonalkezelők használják őket.

## Adatbázis

Forrás: `src/lib/cloudAgent/db.ts` — a tábla késleltetve, a
`createCloudAgentTaskTable()` segítségével jön létre (a `src/lib/cloudAgent/index.ts`
is meghívja a modul importálásakor).

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

Az `updateCloudAgentTask` egy **engedélyezett oszloplistát** alkalmaz az SQL-injektálás megakadályozására:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. A részleges frissítés minden más kulcsát figyelmen kívül hagyja.

## REST API — Feladatok életciklusa

**Hitelesítés:** Minden `/api/v1/agents/tasks*` végpont **kezelői hitelesítést**
igényel (a `requireCloudAgentManagementAuth` a
`src/lib/api/requireManagementAuth` fájlból származó `requireManagementAuth`
függvényt burkolja). Ezt a `588a0333` commit óta kényszeríti ki a rendszer
(_„fix(auth): kezelői hitelesítés megkövetelése az ügynök- és cooldown API-khoz”_).

| Metódus | Útvonal                       | Cél                                                                                    |
| ------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS előzetes kérés                                                                    |
| GET     | `/api/v1/agents/tasks`        | Feladatok listázása (szűrő: `provider`, `status`, `limit≤500`)                         |
| POST    | `/api/v1/agents/tasks`        | Feladat létrehozása (továbbítás a külső szolgáltatónak + mentés)                       |
| DELETE  | `/api/v1/agents/tasks?id=...` | Feladat törlése lekérdezési azonosító alapján (a külső feladatot **nem** szakítja meg) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS előzetes kérés                                                                    |
| GET     | `/api/v1/agents/tasks/[id]`   | Feladat lekérése + az állapot késleltetett szinkronizálása a külső szolgáltatótól      |
| POST    | `/api/v1/agents/tasks/[id]`   | Művelet: `approve` / `message` / `cancel`                                              |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Feladat törlése az útvonalbeli azonosító alapján                                       |

### Feladat létrehozása

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

`201` válasz:

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

### Terv jóváhagyása

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Utólagos üzenet küldése

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Megszakítás (csak a helyi állapotban)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

A `cancel` a helyi adatbázisban `"cancelled"` értékre állítja a `status` mezőt, de
**nem** hívja meg a külső szolgáltatót — a `CloudAgentBase` nem rendelkezik megszakítási RPC-vel.
A külső számlázás leállításához szüntesse meg a feladatot a szolgáltató saját konzolján.

## REST API — felhőszolgáltatói integráció

A `src/app/api/cloud/` alatti kiegészítő végpontokat távoli kliensek
(a CLI, az Electron-alkalmazás vagy a szinkronizálási feldolgozók) használják a szolgáltatói kapcsolat metaadatainak
lekérésére és a modellálnevek feloldására. A hitelesítésük **normál API-kulccsal**
(a `validateApiKey` használatával) történik, nem pedig a feladatvégpontok által használt adminisztrációs hitelesítéssel.

| Metódus | Útvonal                         | Cél                                                                                                  |
| ------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| POST    | `/api/cloud/auth`               | API-kulcs ellenőrzése, maszkolt kapcsolati metaadatok és modellálnevek visszaadása                   |
| PUT     | `/api/cloud/credentials/update` | Az `accessToken` / `refreshToken` / `expiresAt` frissítése                                           |
| POST    | `/api/cloud/model/resolve`      | Modellálnév feloldása `{ provider, model }` értékre                                                  |
| GET     | `/api/cloud/models/alias`       | Az összes modellálnév listázása                                                                      |
| PUT     | `/api/cloud/models/alias`       | Modellálnév beállítása (és automatikus szinkronizálása a Cloud szolgáltatással, ha engedélyezve van) |

Az `/api/cloud/auth` soha nem adja vissza a nyers `apiKey` / `accessToken` / `refreshToken` értékeket. Ehelyett
a `hasApiKey`, `hasAccessToken`, `hasRefreshToken` mezőket és egy maszkolt előnézetet ad vissza
(`maskedApiKey`: az első 4 karakter + `****` + az utolsó 4 karakter).

## Hitelesítő adatok feloldása

A `getCloudAgentCredentials(providerId)` működése a `src/lib/cloudAgent/api.ts` fájlban:

1. Betölti az aktív szolgáltatói kapcsolatokat a `getProviderConnections({ provider: providerId, isActive: true })` használatával.
2. Minden kapcsolatnál előnyben részesíti az `apiKey` értékét (a szélső szóközök eltávolítása után). Ha ez nem érhető el, az `accessToken` értékét használja.
3. Az első nem üres tokent `{ apiKey: token }` formában adja vissza.
4. `null` értéket ad vissza, ha nem talál használható tokent — az API `400` választ küld a következő üzenettel:
   `"Nincsenek aktív hitelesítő adatok konfigurálva a felhőügynök-szolgáltatóhoz: <id>"`.

Ez azt jelenti, hogy a felhőügynökök ugyanazt a Provider Connection táblát használják, mint a normál LLM-szolgáltatók.
A Jules engedélyezéséhez hozzon létre egy aktív kapcsolatot `provider: "jules"` értékkel
és kitöltött `apiKey` mezővel.

## Irányítópult

Forrás: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Egy `"use client"` React-oldal, amely:

- Listázza a feladatokat (rendszeres lekérdezéssel a `GET /api/v1/agents/tasks` végponton).
- Új feladatokat küld be egy, a `CreateCloudAgentTaskSchema` sémához illeszkedő űrlapon keresztül.
- Állapotjelvényeket jelenít meg (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`), és megjeleníti az `activities[]` idővonalat.
- Megjeleníti a `result.prUrl` / `commitMessage` / `summary` értékeket, amikor `status === "completed"`.

## Integráció az A2A-val

A felhőügynökök A2A-képességekként is elérhetővé tehetők egy olyan A2A-képesség regisztrálásával, amely
a `tasks/send` kezelőjét a `getAgent(...).createTask(...)` hívásnak delegálja, és az A2A-feladatok
állapoteseményeit a JSON-RPC 2.0 protokollra fordítja le. Lásd: [A2A-SERVER.md](./A2A-SERVER.md).

## Új felhőügynök hozzáadása

1. Hozza létre a `src/lib/cloudAgent/agents/<name>.ts` fájlt a `CloudAgentBase` kiterjesztésével.
2. Implementálja a `createTask`, `getStatus`, `approvePlan` (vagy dobjon kivételt, ha nem alkalmazható),
   `sendMessage`, `listSources` metódusokat. Az állapotok normalizálásához használja a `this.mapStatus(...)` metódust.
3. Regisztrálja a `src/lib/cloudAgent/registry.ts` fájlban egy stabil `providerId` alatt.
4. Bővítse a `providerId` literáluniót a `src/lib/cloudAgent/types.ts` fájlban
   (`CloudAgentTask.providerId` és `CreateCloudAgentTaskSchema`).
5. Adja hozzá a szolgáltatót a `src/shared/constants/providers.ts` fájlhoz, ha kapcsolati
   rekordra van szüksége. Az OAuth-alapú szolgáltatókhoz a `src/lib/oauth/providers/` alatt is szükséges kiegészítés.
6. Adjon hozzá teszteket a `tests/unit/cloud-agent-*.test.ts` alatt.
7. Frissítse ezt a dokumentációt és az irányítópult `CLOUD_AGENTS` konstansát.

## Konfiguráció

| Környezeti változó | Rendeltetés                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `DATA_DIR`         | A `cloud_agent_tasks` táblát tartalmazó SQLite-adatbázis helye                               |
| `JWT_SECRET`       | A feladat-végpontok kezelési hitelesítéséhez szükséges                                       |
| `API_KEY_SECRET`   | A szolgáltatói kapcsolatok hitelesítő adatainak titkosításához szükséges nyugalmi állapotban |

Jelenleg nincsenek Cloud-Agent-specifikus környezeti változók — minden titkos adat a
`provider_connections` táblában található.

## Lásd még

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Forrás: `src/lib/cloudAgent/`
- Útvonalak: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Irányítópult: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
