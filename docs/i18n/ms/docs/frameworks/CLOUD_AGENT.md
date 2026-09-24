# Cloud Agents (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Sumber rujukan utama:** `src/lib/cloudAgent/` dan `src/app/api/v1/agents/tasks/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40 (penyegaran frontmatter; 4 ejen termasuk cursor-cloud)

OmniRoute mengatur ejen pengekodan pihak ketiga yang dihoskan di awan (Codex Cloud, Cursor,
Devin, Jules) sebagai tugasan jangka panjang. Setiap ejen dibalut di sebalik antara muka seragam supaya
klien boleh menghantar gesaan + URL repositori dan menerima hasil tanpa perlu berurusan dengan
API khusus penyedia.

Tugasan Cloud Agent **bukan** pelengkapan sembang biasa. Ia ialah unit kerja berbilang langkah
yang tahan lama, yang mungkin mengambil masa beberapa minit hingga beberapa jam, boleh menghasilkan Pull Request sebagai
artifaknya, serta menyokong mesej susulan dan (bagi sesetengah penyedia) peringkat kelulusan pelan.

![Kitar hayat tugasan Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Sumber: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Ejen yang Disokong

| ID Penyedia    | Kelas              | Sumber                                | URL Asas Huluan                         | Kelulusan Pelan   |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Ya                |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Ya                |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Tidak (automatik) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Tidak (automatik) |

Pendaftaran: `src/lib/cloudAgent/registry.ts` — mengeksport `getAgent(providerId)`,
`getAvailableAgents()`, dan `isCloudAgentProvider(providerId)`. Pendaftaran tersebut ialah
`Record<string, CloudAgentBase>` dalam memori biasa yang diisi semasa modul dimuatkan.

## Seni Bina

```
Klien (Papan Pemuka / CLI / API)
  → POST /api/v1/agents/tasks (pengesahan pengurusan diperlukan)
    → pengesahan CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ mengambil daripada getProviderConnections({ provider, isActive: true })
         (apiKey dahulu, kembali menggunakan accessToken jika tiada)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST ke API penyedia huluan
      └─ mengembalikan CloudAgentTask dengan id dalaman + externalId
    → insertCloudAgentTask(...) ke dalam cloud_agent_tasks (SQLite)

Pendapatan status (penyegerakan malas ketika dibaca):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // menyegarkan status + aktiviti
    → updateCloudAgentTask(...) dengan status, result, completed_at baharu
    → mengembalikan tugasan bersiri

Interaksi:
  POST /api/v1/agents/tasks/[id]  badan: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        untuk "approve"
    → agent.sendMessage(externalId, message, credentials) untuk "message"
    → status bertukar kepada "cancelled"                untuk "cancel" (setempat sahaja)
```

Penyegerakan adalah **malas**: status disegarkan daripada sistem huluan pada setiap `GET /tasks/[id]`.
Tiada peninjau latar belakang. Papan pemuka yang memerlukan keadaan terkini hendaklah meninjau titik akhir GET
pada selang masa yang munasabah.

## Antara Muka `CloudAgentBase`

Sumber: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // rentetan huluan heuristik → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` sengaja melontarkan ralat — Codex Cloud merancang secara automatik dan
tidak mempunyai gerbang kelulusan. `CodexCloudAgent.listSources` mengembalikan `[]`.

`CursorCloudAgent` mengendalikan Background / Cloud Agents Cursor melalui REST API
rasminya (`api.cursor.com/v0`) menggunakan **kunci API pengguna atau akaun perkhidmatan** — alternatif
pihak pertama yang lebih selamat berbanding menggunakan semula sesi OAuth Cursor IDE (penyedia `cursor`,
yang disertakan dengan amaran risiko pengharaman). Ia merupakan penyesuai REST biasa (tiada kebergantungan
asli `@cursor/sdk`). `approvePlan` melontarkan ralat (ejen Cursor berjalan secara autonomi); `listSources`
menyenaraikan repositori yang boleh dicapai oleh kunci tersebut. Cursor mengembalikan enum status berhuruf besar
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), yang dipetakan secara eksplisit kepada
`CloudAgentStatus` yang dikongsi. `baseUrl` boleh ditindih bagi setiap kelayakan supaya versi/laluan API boleh
dibetulkan tanpa perubahan kod.

## Jenis Domain

Sumber: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // mestilah URL yang sah
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // saat, integer positif
  cost?: number; // nombor titik terapung positif
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // id `task_...` dalaman
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // id penyedia huluan
  status: CloudAgentStatus;
  prompt: string; // 1..10000 aksara
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

Skema pengesahan (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`)
dieksport bersama-sama jenis tersebut dan digunakan oleh pengendali laluan.

## Pangkalan Data

Sumber: `src/lib/cloudAgent/db.ts` — jadual dicipta secara malas melalui
`createCloudAgentTaskTable()` (turut dipanggil daripada `src/lib/cloudAgent/index.ts` semasa
import modul).

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

`updateCloudAgentTask` menguatkuasakan **senarai putih lajur** untuk mencegah suntikan SQL:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Sebarang kekunci lain dalam kemas kini separa akan digugurkan secara senyap.

## REST API — Kitaran Hayat Tugasan

**Pengesahan:** Semua titik akhir `/api/v1/agents/tasks*` memerlukan **pengesahan pengurusan**
(`requireCloudAgentManagementAuth` membalut `requireManagementAuth` daripada
`src/lib/api/requireManagementAuth`). Ini dikuatkuasakan selepas commit `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Kaedah  | Laluan                        | Tujuan                                                                 |
| ------- | ----------------------------- | ---------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | Praujian CORS                                                          |
| GET     | `/api/v1/agents/tasks`        | Senaraikan tugasan (penapis: `provider`, `status`, `limit≤500`)        |
| POST    | `/api/v1/agents/tasks`        | Cipta tugasan (menghantar ke huluan + menyimpan)                       |
| DELETE  | `/api/v1/agents/tasks?id=...` | Padam tugasan mengikut id pertanyaan (**tidak** membatalkan di huluan) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Praujian CORS                                                          |
| GET     | `/api/v1/agents/tasks/[id]`   | Baca tugasan + segerakkan status secara malas dari huluan              |
| POST    | `/api/v1/agents/tasks/[id]`   | Tindakan: `approve` / `message` / `cancel`                             |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Padam tugasan mengikut id laluan                                       |

### Cipta tugasan

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

Respons `201`:

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

### Luluskan pelan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Hantar mesej susulan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Batalkan (status tempatan sahaja)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` menukar `status` kepada `"cancelled"` dalam DB tempatan tetapi **tidak** memanggil
penyedia huluan — tiada RPC pembatalan dalam `CloudAgentBase`. Untuk menghentikan pengebilan
di huluan, tamatkan tugasan dalam konsol penyedia itu sendiri.

## REST API — Pendawaian Penyedia Cloud

Titik akhir tambahan di bawah `src/app/api/cloud/` ini digunakan oleh klien jauh
(CLI, aplikasi Electron atau pekerja penyegerakan) untuk membaca metadata sambungan
penyedia dan menyelesaikan alias model. Titik akhir ini disahkan menggunakan **kunci API biasa**
(melalui `validateApiKey`), bukan pengesahan pengurusan yang digunakan oleh titik akhir tugas.

| Kaedah | Laluan                          | Tujuan                                                                         |
| ------ | ------------------------------- | ------------------------------------------------------------------------------ |
| POST   | `/api/cloud/auth`               | Sahkan kunci API, kembalikan metadata sambungan bertopeng + alias model        |
| PUT    | `/api/cloud/credentials/update` | Segarkan `accessToken` / `refreshToken` / `expiresAt`                          |
| POST   | `/api/cloud/model/resolve`      | Selesaikan alias model kepada `{ provider, model }`                            |
| GET    | `/api/cloud/models/alias`       | Senaraikan semua alias model                                                   |
| PUT    | `/api/cloud/models/alias`       | Tetapkan alias model (dan segerakkan secara automatik ke Cloud jika didayakan) |

`/api/cloud/auth` tidak pernah mengembalikan `apiKey` / `accessToken` / `refreshToken` mentah. Ia
mengembalikan `hasApiKey`, `hasAccessToken`, `hasRefreshToken` dan pratonton bertopeng
(`maskedApiKey`: 4 aksara pertama + `****` + 4 aksara terakhir).

## Penyelesaian Kelayakan

`getCloudAgentCredentials(providerId)` dalam `src/lib/cloudAgent/api.ts`:

1. Memuatkan sambungan penyedia aktif melalui `getProviderConnections({ provider: providerId, isActive: true })`.
2. Bagi setiap sambungan, mengutamakan `apiKey` (selepas ruang kosong dibuang). Jika tiada, gunakan `accessToken`.
3. Mengembalikan token pertama yang tidak kosong, dibalut sebagai `{ apiKey: token }`.
4. Mengembalikan `null` jika tiada token yang boleh digunakan ditemui — API memberikan respons `400` dengan
   `"No active credentials configured for cloud agent provider: <id>"`.

Ini bermakna Ejen Cloud menggunakan semula jadual Sambungan Penyedia yang sama seperti penyedia LLM
biasa. Untuk mendayakan Jules, cipta sambungan aktif dengan `provider: "jules"`
dan `apiKey` yang telah diisi.

## Papan Pemuka

Sumber: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Halaman React `"use client"` yang:

- Menyenaraikan tugas (ditinjau secara berkala melalui `GET /api/v1/agents/tasks`).
- Menghantar tugas baharu melalui borang yang dipetakan kepada `CreateCloudAgentTaskSchema`.
- Menunjukkan lencana status (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) dan memaparkan garis masa `activities[]`.
- Memaparkan `result.prUrl` / `commitMessage` / `summary` apabila `status === "completed"`.

## Penyepaduan dengan A2A

Ejen Cloud boleh didedahkan sebagai kemahiran A2A dengan mendaftarkan kemahiran A2A yang mewakilkan
pengendali `tasks/send` kepada `getAgent(...).createTask(...)` dan menterjemahkan peristiwa status
tugas A2A kepada protokol JSON-RPC 2.0. Lihat [A2A-SERVER.md](./A2A-SERVER.md).

## Menambah Ejen Cloud Baharu

1. Cipta `src/lib/cloudAgent/agents/<name>.ts` yang melanjutkan `CloudAgentBase`.
2. Laksanakan `createTask`, `getStatus`, `approvePlan` (atau lontarkan ralat jika tidak berkenaan),
   `sendMessage`, `listSources`. Gunakan `this.mapStatus(...)` untuk penormalan status.
3. Daftarkannya dalam `src/lib/cloudAgent/registry.ts` di bawah `providerId` yang stabil.
4. Lanjutkan kesatuan literal `providerId` dalam `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` dan `CreateCloudAgentTaskSchema`).
5. Tambahkan penyedia kepada `src/shared/constants/providers.ts` jika ia memerlukan rekod
   sambungan. Penyedia berasaskan OAuth juga memerlukan `src/lib/oauth/providers/`.
6. Tambahkan ujian di bawah `tests/unit/cloud-agent-*.test.ts`.
7. Kemas kini dokumen ini dan pemalar `CLOUD_AGENTS` pada papan pemuka.

## Konfigurasi

| Pemboleh Ubah Persekitaran | Tujuan                                                                    |
| -------------------------- | ------------------------------------------------------------------------- |
| `DATA_DIR`                 | Lokasi pangkalan data SQLite yang menyimpan `cloud_agent_tasks`           |
| `JWT_SECRET`               | Diperlukan untuk pengesahan pengurusan pada titik akhir tugasan           |
| `API_KEY_SECRET`           | Diperlukan untuk menyulitkan kelayakan sambungan penyedia ketika disimpan |

Pada masa ini, tiada pemboleh ubah persekitaran khusus Cloud-Agent — setiap rahsia disimpan dalam jadual
`provider_connections`.

## Lihat Juga

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Sumber: `src/lib/cloudAgent/`
- Laluan: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Papan pemuka: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
