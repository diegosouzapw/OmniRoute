# Cloud Agents (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/cloudAgent/` at `src/app/api/v1/agents/tasks/`
> **Huling na-update:** 2026-06-28 — v3.8.40 (pag-refresh ng frontmatter; 4 na agent kasama ang cursor-cloud)

Isinasaayos ng OmniRoute ang mga coding agent na hino-host sa cloud ng mga third party (Codex Cloud, Cursor,
Devin, Jules) bilang mga pangmatagalang task. Ang bawat agent ay nakabalot sa likod ng isang pare-parehong interface upang
makapagsumite ang mga client ng prompt + repo URL at makatanggap ng mga resulta nang hindi kailangang direktang pangasiwaan ang
mga API na partikular sa provider.

Ang isang Cloud Agent task ay **hindi** karaniwang chat completion. Isa itong matibay at maraming hakbang na
yunit ng trabaho na maaaring tumagal mula ilang minuto hanggang ilang oras, maaaring gumawa ng Pull Request bilang
artifact nito, at sumusuporta sa mga follow-up na mensahe at (sa ilang provider) mga hakbang na nangangailangan ng pag-apruba sa plano.

![Siklo ng Cloud Agent task](../diagrams/exported/cloud-agent-flow.svg)

> Pinagmulan: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Mga Sinusuportahang Agent

| Provider ID    | Class              | Pinagmulan                            | Upstream Base URL                       | Pag-apruba sa Plano |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Oo                  |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Oo                  |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Hindi (awtomatiko)  |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Hindi (awtomatiko)  |

Registry: `src/lib/cloudAgent/registry.ts` — ine-export ang `getAgent(providerId)`,
`getAvailableAgents()`, at `isCloudAgentProvider(providerId)`. Ang registry ay isang
payak na in-memory na `Record<string, CloudAgentBase>` na pinupunan kapag nilo-load ang module.

## Arkitektura

```
Client (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (kailangan ng awtorisasyon sa pamamahala)
    → pagpapatunay ng CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ kumukuha mula sa getProviderConnections({ provider, isActive: true })
         (apiKey muna, pagkatapos ay accessToken bilang fallback)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST sa upstream na provider API
      └─ nagbabalik ng CloudAgentTask na may panloob na id + externalId
    → insertCloudAgentTask(...) sa cloud_agent_tasks (SQLite)

Pag-poll (lazy sync kapag binasa):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // nire-refresh ang status + mga activity
    → updateCloudAgentTask(...) gamit ang bagong status, result, completed_at
    → ibalik ang naka-serialize na task

Mga interaksyon:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        para sa "approve"
    → agent.sendMessage(externalId, message, credentials) para sa "message"
    → magbabago ang status sa "cancelled"               para sa "cancel" (lokal lamang)
```

**Lazy** ang pag-sync: nire-refresh ang status mula sa upstream sa bawat `GET /tasks/[id]`.
Walang background poller. Dapat i-poll ng mga dashboard na nangangailangan ng pinakabagong state ang GET
endpoint sa makatuwirang agwat.

## Interface ng `CloudAgentBase`

Pinagmulan: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // heuristikong upstream-string → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

Sadyang nagti-throw ang `CodexCloudAgent.approvePlan` — awtomatikong nagpaplano ang Codex Cloud at
wala itong gate ng pag-apruba. Nagbabalik ang `CodexCloudAgent.listSources` ng `[]`.

Pinapatakbo ng `CursorCloudAgent` ang Background / Cloud Agents ng Cursor sa pamamagitan ng opisyal nitong REST
API (`api.cursor.com/v0`) gamit ang **API key ng user o service account** — ang mas ligtas at
first-party na alternatibo sa muling paggamit ng OAuth session ng Cursor IDE (provider na `cursor`,
na may babala tungkol sa panganib na ma-ban). Isa itong simpleng REST adapter (walang native na
dependency na `@cursor/sdk`). Nagti-throw ang `approvePlan` (kusang tumatakbo ang mga Cursor agent); inililista ng `listSources`
ang mga repository na maa-access ng key. Nagbabalik ang Cursor ng mga UPPERCASE status enum
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), na tahasang minamapa sa nakabahaging
`CloudAgentStatus`. Maaaring i-override ang `baseUrl` sa bawat credential upang maitama ang bersyon/path ng API
nang walang pagbabago sa code.

## Mga Uri ng Domain

Pinagmulan: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // dapat ay valid na URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // mga segundo, positibong integer
  cost?: number; // positibong float
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // panloob na `task_...` id
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // id ng upstream provider
  status: CloudAgentStatus;
  prompt: string; // 1..10000 character
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

Ang mga validation schema (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) ay
ini-export kasama ng mga uri at ginagamit ng mga route handler.

## Database

Pinagmulan: `src/lib/cloudAgent/db.ts` — ginagawa ang talahanayan kapag kailangan sa pamamagitan ng
`createCloudAgentTaskTable()` (tinatawag din mula sa `src/lib/cloudAgent/index.ts` sa
pag-import ng module).

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

Nagpapatupad ang `updateCloudAgentTask` ng **whitelist ng mga column** upang maiwasan ang SQL injection:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Tahimik na inaalis ang anumang ibang key sa bahagyang update.

## REST API — Lifecycle ng Gawain

**Auth:** Nangangailangan ang lahat ng endpoint na `/api/v1/agents/tasks*` ng **management auth**
(binabalot ng `requireCloudAgentManagementAuth` ang `requireManagementAuth` mula sa
`src/lib/api/requireManagementAuth`). Ipinatutupad ito pagkatapos ng commit na `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Paraan  | Path                          | Layunin                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | CORS preflight                                                           |
| GET     | `/api/v1/agents/tasks`        | Ilista ang mga gawain (filter: `provider`, `status`, `limit≤500`)        |
| POST    | `/api/v1/agents/tasks`        | Gumawa ng gawain (ipinapadala sa upstream + sine-save)                   |
| DELETE  | `/api/v1/agents/tasks?id=...` | Burahin ang gawain ayon sa query id (hindi **kinakansela** ang upstream) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS preflight                                                           |
| GET     | `/api/v1/agents/tasks/[id]`   | Basahin ang gawain + i-lazy-sync ang status mula sa upstream             |
| POST    | `/api/v1/agents/tasks/[id]`   | Aksyon: `approve` / `message` / `cancel`                                 |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Burahin ang gawain ayon sa path id                                       |

### Gumawa ng gawain

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

Tugon na `201`:

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

### Aprubahan ang isang plano

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Magpadala ng follow-up na mensahe

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Kanselahin (lokal na status lamang)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

Binabago ng `cancel` ang `status` sa `"cancelled"` sa lokal na DB ngunit **hindi** nito tinatawag ang
upstream provider — walang abort RPC sa `CloudAgentBase`. Upang ihinto ang pagsingil
sa upstream, wakasan ang gawain sa sariling console ng provider.

## REST API — Imprastraktura ng Cloud Provider

Ginagamit ng mga remote client ang mga auxiliary endpoint na ito sa ilalim ng `src/app/api/cloud/`
(ang CLI, Electron app, o mga sync worker) upang basahin ang metadata ng koneksyon ng provider
at lutasin ang mga alias ng modelo. Ina-authenticate ang mga ito gamit ang **regular na API key**
(sa pamamagitan ng `validateApiKey`), hindi ang management auth na ginagamit ng mga task endpoint.

| Paraan | Path                            | Layunin                                                                                     |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | I-validate ang API key, ibalik ang naka-mask na metadata ng koneksyon + mga alias ng modelo |
| PUT    | `/api/cloud/credentials/update` | I-refresh ang `accessToken` / `refreshToken` / `expiresAt`                                  |
| POST   | `/api/cloud/model/resolve`      | Lutasin ang alias ng modelo tungo sa `{ provider, model }`                                  |
| GET    | `/api/cloud/models/alias`       | Ilista ang lahat ng alias ng modelo                                                         |
| PUT    | `/api/cloud/models/alias`       | Magtakda ng alias ng modelo (at awtomatikong i-sync sa Cloud kung naka-enable)              |

Hindi kailanman ibinabalik ng `/api/cloud/auth` ang raw na `apiKey` / `accessToken` / `refreshToken`. Sa halip,
ibinabalik nito ang `hasApiKey`, `hasAccessToken`, `hasRefreshToken`, at isang naka-mask na preview
(`maskedApiKey`: unang 4 + `****` + huling 4).

## Pagresolba ng mga Credential

`getCloudAgentCredentials(providerId)` sa `src/lib/cloudAgent/api.ts`:

1. Nilo-load ang mga aktibong koneksyon ng provider sa pamamagitan ng `getProviderConnections({ provider: providerId, isActive: true })`.
2. Para sa bawat koneksyon, inuuna ang `apiKey` (na-trim). Kung wala ito, ginagamit ang `accessToken`.
3. Ibinabalik ang unang token na hindi walang laman, na nakabalot bilang `{ apiKey: token }`.
4. Ibinabalik ang `null` kung walang makitang magagamit na token — tumutugon ang API ng `400` na may
   `"Walang naka-configure na aktibong credential para sa cloud agent provider: <id>"`.

Nangangahulugan itong muling ginagamit ng Cloud Agents ang parehong talahanayan ng Provider Connection na ginagamit ng mga regular na LLM
provider. Upang i-enable ang Jules, gumawa ng aktibong koneksyon na may `provider: "jules"`
at may laman na `apiKey`.

## Dashboard

Source: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Isang `"use client"` React page na:

- Naglilista ng mga task (pana-panahong kinukuha sa pamamagitan ng `GET /api/v1/agents/tasks`).
- Nagsusumite ng mga bagong task sa pamamagitan ng form na naka-map sa `CreateCloudAgentTaskSchema`.
- Nagpapakita ng mga status badge (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) at nire-render ang timeline ng `activities[]`.
- Ipinapakita ang `result.prUrl` / `commitMessage` / `summary` kapag `status === "completed"`.

## Integrasyon sa A2A

Maaaring ilantad ang Cloud Agents bilang mga A2A skill sa pamamagitan ng pagpaparehistro ng A2A skill na nagde-delegate
ng `tasks/send` handler nito sa `getAgent(...).createTask(...)` at nagsasalin ng mga event ng status ng A2A task
sa JSON-RPC 2.0 protocol. Tingnan ang [A2A-SERVER.md](./A2A-SERVER.md).

## Pagdaragdag ng Bagong Cloud Agent

1. Gumawa ng `src/lib/cloudAgent/agents/<name>.ts` na nag-e-extend sa `CloudAgentBase`.
2. Ipatupad ang `createTask`, `getStatus`, `approvePlan` (o mag-throw kung N/A),
   `sendMessage`, `listSources`. Gamitin ang `this.mapStatus(...)` para sa normalisasyon ng status.
3. Irehistro sa `src/lib/cloudAgent/registry.ts` sa ilalim ng isang matatag na `providerId`.
4. Palawakin ang literal union ng `providerId` sa `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` at `CreateCloudAgentTaskSchema`).
5. Idagdag ang provider sa `src/shared/constants/providers.ts` kung kailangan nito ng record ng koneksyon.
   Kailangan din ng mga OAuth-based provider ang `src/lib/oauth/providers/`.
6. Magdagdag ng mga test sa ilalim ng `tests/unit/cloud-agent-*.test.ts`.
7. I-update ang dokumentong ito at ang `CLOUD_AGENTS` constant ng dashboard.

## Configuration

| Env Var          | Layunin                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------ |
| `DATA_DIR`       | Lokasyon ng SQLite database na naglalaman ng `cloud_agent_tasks`                           |
| `JWT_SECRET`     | Kinakailangan para sa authentication ng pamamahala sa mga task endpoint                    |
| `API_KEY_SECRET` | Kinakailangan upang i-encrypt ang mga credential ng koneksyon sa provider habang nakaimbak |

Walang umiiral na mga env var na partikular sa Cloud-Agent sa kasalukuyan — ang bawat secret ay nasa
talahanayang `provider_connections`.

## Tingnan Din

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Pinagmulan: `src/lib/cloudAgent/`
- Mga Route: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Dashboard: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
