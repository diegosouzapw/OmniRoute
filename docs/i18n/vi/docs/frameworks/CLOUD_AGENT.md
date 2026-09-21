# Cloud Agents (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Nguồn chính xác:** `src/lib/cloudAgent/` và `src/app/api/v1/agents/tasks/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40 (làm mới frontmatter; 4 agent, bao gồm cursor-cloud)

OmniRoute điều phối các agent lập trình được lưu trữ trên đám mây của bên thứ ba (Codex Cloud, Cursor,
Devin, Jules) dưới dạng các tác vụ chạy dài hạn. Mỗi agent được đóng gói phía sau một giao diện thống nhất để
client có thể gửi prompt + URL kho mã nguồn và nhận kết quả mà không cần xử lý
các API riêng của từng nhà cung cấp.

Tác vụ Cloud Agent **không phải** là một lượt hoàn thành trò chuyện thông thường. Đây là một
đơn vị công việc bền vững, gồm nhiều bước, có thể mất từ vài phút đến vài giờ, có thể tạo ra Pull Request làm
artifact và hỗ trợ các thông báo tiếp nối cũng như (ở một số nhà cung cấp) các bước phê duyệt kế hoạch.

![Vòng đời tác vụ Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Nguồn: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Các agent được hỗ trợ

| ID nhà cung cấp | Lớp                | Nguồn                                 | URL cơ sở thượng nguồn                  | Phê duyệt kế hoạch |
| --------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------ |
| `jules`         | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Có                 |
| `devin`         | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Có                 |
| `codex-cloud`   | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Không (tự động)    |
| `cursor-cloud`  | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Không (tự động)    |

Registry: `src/lib/cloudAgent/registry.ts` — xuất `getAgent(providerId)`,
`getAvailableAgents()` và `isCloudAgentProvider(providerId)`. Registry là một
`Record<string, CloudAgentBase>` thuần túy trong bộ nhớ, được điền dữ liệu khi mô-đun được tải.

## Kiến trúc

```
Client (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (yêu cầu xác thực quản lý)
    → xác thực CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ lấy từ getProviderConnections({ provider, isActive: true })
         (ưu tiên apiKey, dự phòng bằng accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST đến API của nhà cung cấp thượng nguồn
      └─ trả về CloudAgentTask với id nội bộ + externalId
    → insertCloudAgentTask(...) vào cloud_agent_tasks (SQLite)

Thăm dò (đồng bộ lười khi đọc):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // làm mới trạng thái + hoạt động
    → updateCloudAgentTask(...) với trạng thái, kết quả, completed_at mới
    → trả về tác vụ đã được tuần tự hóa

Tương tác:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        cho "approve"
    → agent.sendMessage(externalId, message, credentials) cho "message"
    → trạng thái chuyển thành "cancelled"               cho "cancel" (chỉ cục bộ)
```

Quá trình đồng bộ là **lười**: trạng thái được làm mới từ hệ thống thượng nguồn trong mỗi yêu cầu `GET /tasks/[id]`.
Không có trình thăm dò chạy nền. Các dashboard cần trạng thái mới nhất nên thăm dò endpoint GET
theo một khoảng thời gian hợp lý.

## Giao diện `CloudAgentBase`

Nguồn: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // chuỗi ngược dòng theo phương pháp heuristic → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` chủ ý ném lỗi — Codex Cloud tự động lập kế hoạch và
không có cổng phê duyệt. `CodexCloudAgent.listSources` trả về `[]`.

`CursorCloudAgent` điều khiển các Background / Cloud Agents của Cursor thông qua REST
API chính thức (`api.cursor.com/v0`) bằng **khóa API của người dùng hoặc tài khoản dịch vụ** — phương án
bên thứ nhất an toàn hơn so với việc tái sử dụng phiên OAuth của Cursor IDE (nhà cung cấp `cursor`,
có kèm cảnh báo về nguy cơ bị cấm). Đây là một bộ điều hợp REST thuần túy (không có phần phụ thuộc gốc
`@cursor/sdk`). `approvePlan` ném lỗi (các agent Cursor chạy tự động); `listSources` liệt kê
các kho lưu trữ mà khóa có thể truy cập. Cursor trả về các enum trạng thái viết hoa
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), được ánh xạ rõ ràng sang
`CloudAgentStatus` dùng chung. `baseUrl` có thể được ghi đè theo từng thông tin xác thực để phiên bản/đường dẫn API
có thể được sửa mà không cần thay đổi mã.

## Các kiểu miền

Nguồn: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // phải là một URL hợp lệ
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // số giây, số nguyên dương
  cost?: number; // số thực dương
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // id nội bộ `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // id của nhà cung cấp ngược dòng
  status: CloudAgentStatus;
  prompt: string; // 1..10000 ký tự
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

Các schema xác thực (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) được
xuất cùng với các kiểu và được các trình xử lý tuyến sử dụng.

## Cơ sở dữ liệu

Nguồn: `src/lib/cloudAgent/db.ts` — bảng được tạo theo cơ chế lazy thông qua
`createCloudAgentTaskTable()` (cũng được gọi từ `src/lib/cloudAgent/index.ts` khi
nhập mô-đun).

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

`updateCloudAgentTask` áp dụng **danh sách cho phép của các cột** để ngăn chặn SQL injection:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Mọi khóa khác trong bản cập nhật một phần đều bị loại bỏ mà không có thông báo.

## REST API — Vòng đời tác vụ

**Xác thực:** Tất cả endpoint `/api/v1/agents/tasks*` đều yêu cầu **xác thực quản trị**
(`requireCloudAgentManagementAuth` bao bọc `requireManagementAuth` từ
`src/lib/api/requireManagementAuth`). Yêu cầu này được thực thi sau commit `588a0333`
(_"fix(auth): yêu cầu xác thực quản trị cho API agent và cooldown"_).

| Phương thức | Đường dẫn                     | Mục đích                                                   |
| ----------- | ----------------------------- | ---------------------------------------------------------- |
| OPTIONS     | `/api/v1/agents/tasks`        | Kiểm tra trước CORS                                        |
| GET         | `/api/v1/agents/tasks`        | Liệt kê tác vụ (bộ lọc: `provider`, `status`, `limit≤500`) |
| POST        | `/api/v1/agents/tasks`        | Tạo tác vụ (gửi đến dịch vụ thượng nguồn + lưu trữ)        |
| DELETE      | `/api/v1/agents/tasks?id=...` | Xóa tác vụ theo query id (**không** hủy ở thượng nguồn)    |
| OPTIONS     | `/api/v1/agents/tasks/[id]`   | Kiểm tra trước CORS                                        |
| GET         | `/api/v1/agents/tasks/[id]`   | Đọc tác vụ + đồng bộ lazy trạng thái từ thượng nguồn       |
| POST        | `/api/v1/agents/tasks/[id]`   | Hành động: `approve` / `message` / `cancel`                |
| DELETE      | `/api/v1/agents/tasks/[id]`   | Xóa tác vụ theo path id                                    |

### Tạo tác vụ

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Sửa lỗi trong src/foo.ts khiến trình phân tích cú pháp trả về null",
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

Phản hồi `201`:

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

### Phê duyệt kế hoạch

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Gửi tin nhắn tiếp theo

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Đồng thời thêm một unit test cho trình phân tích cú pháp"}'
```

### Hủy (chỉ áp dụng cho trạng thái cục bộ)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` chuyển `status` thành `"cancelled"` trong DB cục bộ nhưng **không** gọi
nhà cung cấp thượng nguồn — không có RPC hủy bỏ trong `CloudAgentBase`. Để dừng tính phí
ở thượng nguồn, hãy chấm dứt tác vụ trong bảng điều khiển riêng của nhà cung cấp.

## REST API — Hạ tầng Nhà cung cấp Đám mây

Các endpoint phụ trợ này trong `src/app/api/cloud/` được các máy khách từ xa
(CLI, ứng dụng Electron hoặc các worker đồng bộ) sử dụng để đọc siêu dữ liệu kết nối của nhà cung cấp
và phân giải bí danh mô hình. Chúng được xác thực bằng **API key thông thường**
(thông qua `validateApiKey`), không phải cơ chế xác thực quản trị được các endpoint tác vụ sử dụng.

| Phương thức | Đường dẫn                       | Mục đích                                                               |
| ----------- | ------------------------------- | ---------------------------------------------------------------------- |
| POST        | `/api/cloud/auth`               | Xác thực API key, trả về siêu dữ liệu kết nối đã che + bí danh mô hình |
| PUT         | `/api/cloud/credentials/update` | Làm mới `accessToken` / `refreshToken` / `expiresAt`                   |
| POST        | `/api/cloud/model/resolve`      | Phân giải bí danh mô hình thành `{ provider, model }`                  |
| GET         | `/api/cloud/models/alias`       | Liệt kê tất cả bí danh mô hình                                         |
| PUT         | `/api/cloud/models/alias`       | Đặt bí danh mô hình (và tự động đồng bộ lên Cloud nếu được bật)        |

`/api/cloud/auth` không bao giờ trả về `apiKey` / `accessToken` / `refreshToken` thô. Endpoint này
trả về `hasApiKey`, `hasAccessToken`, `hasRefreshToken` và bản xem trước đã che
(`maskedApiKey`: 4 ký tự đầu + `****` + 4 ký tự cuối).

## Phân giải Thông tin xác thực

`getCloudAgentCredentials(providerId)` trong `src/lib/cloudAgent/api.ts`:

1. Tải các kết nối nhà cung cấp đang hoạt động thông qua `getProviderConnections({ provider: providerId, isActive: true })`.
2. Với mỗi kết nối, ưu tiên `apiKey` (đã loại bỏ khoảng trắng thừa). Nếu không có thì dùng `accessToken`.
3. Trả về token không rỗng đầu tiên được bao bọc dưới dạng `{ apiKey: token }`.
4. Trả về `null` nếu không tìm thấy token khả dụng — API phản hồi `400` với
   `"Không có thông tin xác thực đang hoạt động nào được cấu hình cho nhà cung cấp tác tử đám mây: <id>"`.

Điều này có nghĩa là Cloud Agents dùng lại cùng bảng Provider Connection như các nhà cung cấp LLM
thông thường. Để bật Jules, hãy tạo một kết nối đang hoạt động với `provider: "jules"`
và `apiKey` đã được điền.

## Bảng điều khiển

Mã nguồn: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Một trang React `"use client"` có chức năng:

- Liệt kê các tác vụ (được thăm dò qua `GET /api/v1/agents/tasks`).
- Gửi tác vụ mới thông qua biểu mẫu ánh xạ tới `CreateCloudAgentTaskSchema`.
- Hiển thị huy hiệu trạng thái (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) và kết xuất dòng thời gian `activities[]`.
- Hiển thị `result.prUrl` / `commitMessage` / `summary` khi `status === "completed"`.

## Tích hợp với A2A

Cloud Agents có thể được cung cấp dưới dạng các kỹ năng A2A bằng cách đăng ký một kỹ năng A2A để ủy quyền
trình xử lý `tasks/send` của nó cho `getAgent(...).createTask(...)` và chuyển đổi các sự kiện trạng thái tác vụ A2A
sang giao thức JSON-RPC 2.0. Xem [A2A-SERVER.md](./A2A-SERVER.md).

## Thêm Cloud Agent Mới

1. Tạo `src/lib/cloudAgent/agents/<name>.ts` mở rộng `CloudAgentBase`.
2. Triển khai `createTask`, `getStatus`, `approvePlan` (hoặc ném lỗi nếu không áp dụng),
   `sendMessage`, `listSources`. Sử dụng `this.mapStatus(...)` để chuẩn hóa trạng thái.
3. Đăng ký trong `src/lib/cloudAgent/registry.ts` với một `providerId` ổn định.
4. Mở rộng hợp kiểu literal `providerId` trong `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` và `CreateCloudAgentTaskSchema`).
5. Thêm nhà cung cấp vào `src/shared/constants/providers.ts` nếu cần bản ghi kết nối.
   Các nhà cung cấp dựa trên OAuth cũng cần `src/lib/oauth/providers/`.
6. Thêm kiểm thử trong `tests/unit/cloud-agent-*.test.ts`.
7. Cập nhật tài liệu này và hằng số `CLOUD_AGENTS` của bảng điều khiển.

## Cấu hình

| Biến môi trường  | Mục đích                                                               |
| ---------------- | ---------------------------------------------------------------------- |
| `DATA_DIR`       | Vị trí của cơ sở dữ liệu SQLite chứa `cloud_agent_tasks`               |
| `JWT_SECRET`     | Bắt buộc để xác thực quản trị trên các endpoint tác vụ                 |
| `API_KEY_SECRET` | Bắt buộc để mã hóa thông tin xác thực kết nối nhà cung cấp khi lưu trữ |

Hiện tại không có biến môi trường dành riêng cho Cloud-Agent — mọi khóa bí mật đều nằm trong bảng
`provider_connections`.

## Xem thêm

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Mã nguồn: `src/lib/cloudAgent/`
- Các route: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Bảng điều khiển: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
