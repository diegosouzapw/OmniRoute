# CLI-TOOLS (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Công cụ CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Công cụ CLI — OmniRoute

Cập nhật lần cuối: 2026-08-18

OmniRoute tích hợp với ba loại công cụ CLI trải rộng trên ba trang bảng điều khiển chuyên dụng:

| Trang          | Đường dẫn               | Khái niệm                                                                                     | Số lượng      |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------- | ------------- |
| **Mã CLI**     | `/dashboard/cli-code`   | Công cụ lập trình mà bạn chỉ định cho OmniRoute (Khách hàng → CLI → OmniRoute → Nhà cung cấp) | 26            |
| **Đại lý CLI** | `/dashboard/cli-agents` | Các đại lý tự động mà bạn chỉ định cho OmniRoute (cùng quy trình, phạm vi rộng hơn)           | 8             |
| **Đại lý ACP** | `/dashboard/acp-agents` | Các CLI mà OmniRoute khởi tạo như backend qua stdio/ACP (quy trình ngược)                     | xem danh sách |

Các đường dẫn cũ chuyển hướng qua 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Cách hoạt động

```
Mã CLI / Đại lý CLI (quy trình tiêu thụ):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (tất cả đều chỉ vào OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute định tuyến đến nhà cung cấp đúng)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Đại lý ACP (quy trình khởi tạo ngược):
    Yêu cầu của khách hàng → OmniRoute → khởi tạo CLI qua stdio/ACP → phản hồi
```

**Lợi ích:**

- Một khóa API để quản lý tất cả các công cụ
- Theo dõi chi phí trên tất cả các CLI trong bảng điều khiển
- Chuyển đổi mô hình mà không cần cấu hình lại từng công cụ
- Hoạt động cả trên máy cục bộ và trên các máy chủ từ xa (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Tự động cấu hình với `setup-*`

Bạn không cần phải viết cấu hình cho từng công cụ bằng tay. OmniRoute cung cấp một lệnh `setup-*`
cho mỗi CLI được hỗ trợ, đọc danh mục mô hình **trực tiếp** từ một OmniRoute đang chạy
(cục bộ hoặc từ xa) và ghi cấu hình của công cụ đó trên máy của bạn:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Mỗi lệnh chấp nhận `--remote <url> --api-key <key>` (cấu hình một công cụ cục bộ chống lại một
OmniRoute từ xa), `--dry-run` (xem trước mà không ghi), và `--port`. Các công cụ
không có tự động phát hiện mô hình (Cline, Kilo, Roo, Goose, Aider, Qwen) nhận
`--model <id>` (và `--yes` cho các lần chạy không tương tác). Để khởi động một CLI với
môi trường đúng được tiêm và không ghi cấu hình nào, hãy sử dụng lệnh khởi động chung
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — các mục tiêu và bí danh đến từ `bin/cli/cli-manifest.mjs`); các lệnh khởi động theo công cụ cũ `omniroute launch` (Claude Code) và `omniroute launch-codex`
(Codex) vẫn có sẵn. CLI Gemini chỉ có thể khởi động: nó là một mục tiêu `omniroute run`
nhưng không có công thức `setup-*`/`configure`.

> **Tài liệu tham khảo đầy đủ:** bảng chính — những gì mỗi lệnh ghi, mọi cờ,
> cục bộ so với từ xa, và các công cụ nào cần hậu tố `/v1` — nằm trong
> **[Tích hợp CLI](../guides/CLI-INTEGRATIONS.md)**.

### Chạy những lệnh này trong một container

Một lệnh `setup-*` được thực hiện bên trong container OmniRoute sẽ ghi vào
thư mục chính của container, mà không có CLI nào trên máy chủ đọc được và sẽ biến mất cùng với
container. OmniRoute phát hiện điều đó và thoát với mã `2` kèm theo hướng dẫn thay vì
ghi. Hai cách hỗ trợ để tiến hành — cài đặt CLI trên máy chủ và
`omniroute connect` đến container, hoặc gắn kết các thư mục cấu hình và thiết lập
`CLI_CONFIG_HOME` (hồ sơ `host` trong compose). Mỗi lệnh `setup-*`, cùng với
`omniroute configure` và `omniroute config set`, chấp nhận
`--allow-container-write` khi cấu hình các CLI của container là điều bạn
thực sự muốn; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` làm điều tương tự cho
máy chủ. Xem
[Hướng dẫn Docker → Cấu hình các công cụ CLI trên máy chủ](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Điểm cuối áp dụng** của bảng điều khiển (`POST /api/cli-tools/apply`) thực thi
cùng một bảo vệ: trong một container, một ghi mà mục tiêu không được gắn kết từ
máy chủ sẽ trả về **`422`** với `containerEphemeralTarget: true`, văn bản lỗi an toàn và — đối với các công cụ có công thức trên máy chủ (claude, codex, opencode, cline,
kilo, continue) — một `hostSetupCommand` (ví dụ: `omniroute setup-opencode`) để chạy
trên máy chủ thay thế; không có gì được ghi. `dryRun: true` vẫn hoạt động trong chế độ container
và trả về nội dung được tạo + đường dẫn mục tiêu mà không chạm vào đĩa, vì vậy
bạn có thể xem trước từ bảng điều khiển và áp dụng trên máy chủ. Hành vi này là
cố ý và được bảo vệ bằng kiểm tra
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — không bao giờ "sửa" một mã 422
bằng cách loại bỏ bảo vệ.

## Nguồn Thông Tin

Danh mục thống nhất nằm trong `src/shared/constants/cliTools.ts` dưới dạng `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Mỗi mục có các trường sau (được định nghĩa trong `src/shared/schemas/cliCatalog.ts`):

| Trường                                          | Loại                                                         | Mô tả                                                     |
| ----------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Trang nào công cụ xuất hiện                               |
| `vendor`                                        | `string`                                                     | Nguồn gốc công cụ ("Anthropic", "OSS (P. Gauthier)")      |
| `acpSpawnable`                                  | `boolean`                                                    | Cũng có thể sử dụng như một ACP Agent (huy hiệu hiển thị) |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Mức độ hỗ trợ endpoint tùy chỉnh. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Cơ chế cấu hình                                           |
| `id`, `name`, `color`, `description`, `docsUrl` | tiêu chuẩn                                                   | Các trường hiển thị chính                                 |

Các mục có `baseUrlSupport: "none"` **không được hiển thị** trên các trang bảng điều khiển — chúng được đăng ký trong MITM backlog cho kế hoạch 11 (xem `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Các cấp độ khả năng (đã được lập danh mục × có thể phát hiện × có thể cấu hình × có thể khởi chạy)

Không phải công cụ nào đã được lập danh mục cũng có thể phát hiện, cấu hình hoặc khởi chạy. Mỗi cấp độ có một nguồn tuyên bố, và một bài kiểm tra độ trôi giữ chúng đồng bộ:

| Cấp độ               | Ý nghĩa                                                                               | Tuyên bố trong                                                    |
| -------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Đã lập danh mục**  | Xuất hiện trong danh mục bảng điều khiển (tên, nhà cung cấp, tài liệu, loại cấu hình) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Có thể phát hiện** | Phát hiện nhị phân/cấu hình, kiểm tra sức khỏe, đường dẫn cấu hình                    | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Có thể cấu hình**  | Được hỗ trợ bởi `omniroute configure <cli>` (công thức thiết lập tồn tại)             | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Có thể khởi chạy** | Được hỗ trợ bởi `omniroute run <target>` (tiêm env/args được định nghĩa)              | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` là bản khai báo thực thi chính thức cho các lệnh CLI: `run`, `configure` và các trình tạo hoàn thành shell đều lấy danh sách mục tiêu, giải quyết bí danh (ví dụ `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) và kết nối cờ `--model` từ nó. Bảo vệ độ trôi
`tests/unit/cli/cli-manifest-drift.test.ts` xác nhận rằng bản khai báo, danh mục runtime, danh mục UI và mọi bề mặt tiêu thụ đều đồng bộ — một mục tiêu được thêm vào một bề mặt mà không có các bề mặt khác sẽ làm cho bài kiểm tra thất bại thay vì trôi một cách im lặng.

## 1. Danh sách Công cụ CLI (26 công cụ)

Tất cả các công cụ xuất hiện trong `/dashboard/cli-code`. Những công cụ có `baseUrlSupport: none` được kết nối thông qua MITM hoặc một hướng dẫn thủ công thay vì một URL cơ sở tùy chỉnh:

| id           | name                           | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ------------------------------ | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code                    | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI               | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (Kế hoạch Lập trình GLM) | Z.ai                | none           | custom         | false        |
| cline        | Cline                          | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code                      | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                       | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                       | continue.dev        | full           | guide          | false        |
| aider        | Aider                          | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode                      | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                          | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI                   | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale                      | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                       | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid                  | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI             | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI                     | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                          | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (đại lý lập trình pi)       | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build                     | xAI                 | full           | custom         | false        |
| crush        | Crush                          | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code                      | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                         | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity                    | Google              | none           | mitm           | false        |
| hermes       | Hermes                         | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                        | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI                     | —                   | full           | custom-builder | false        |

Các công cụ có `baseUrlSupport: "partial"` hiển thị một biểu tượng "⚠ Base URL parcial" trong thẻ bảng điều khiển.

## 2. Danh mục CLI Agents (8 công cụ)

Các tác nhân tự động xuất hiện trong `/dashboard/cli-agents`:

| id           | tên              | nhà cung cấp             | hỗ trợBaseUrl | cóThểSpawnACP |
| ------------ | ---------------- | ------------------------ | ------------- | ------------- |
| hermes-agent | Tác nhân Hermes  | Nous Research            | đầy đủ        | sai           |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | đầy đủ        | đúng          |
| goose        | Goose            | Block / Linux Foundation | đầy đủ        | đúng          |
| interpreter  | Open Interpreter | OSS                      | đầy đủ        | đúng          |
| warp         | Warp AI          | Warp Inc.                | một phần      | đúng          |
| agent-deck   | Bảng tác nhân    | asheshgoplani (OSS)      | đầy đủ        | sai           |
| omp          | Oh My Pi         | OSS                      | đầy đủ        | đúng          |
| letta        | Letta CLI        | Letta                    | đầy đủ        | sai           |

---

## 3. ACP Agents (/dashboard/acp-agents)

Trang này (được đổi tên từ `/dashboard/agents`) hiển thị các CLI mà OmniRoute có thể **spawn** như các động cơ thực thi backend thông qua giao thức stdio/ACP. Danh mục được duy trì riêng biệt trong `src/lib/acp/registry.ts` và **không** giống như `CLI_TOOLS`.

---

## 4. Danh sách MITM Backlog (không hiển thị trong bảng điều khiển)

Các CLI sau đây không hỗ trợ URL cơ sở tùy chỉnh một cách tự nhiên và **không được liệt kê** trong trang mã CLI hoặc trang tác nhân CLI. Chúng là ứng cử viên cho việc chặn MITM trong kế hoạch 11:

| CLI                 | Lý do                                                          |
| ------------------- | -------------------------------------------------------------- |
| windsurf            | BYOK giới hạn ở một số mô hình Claude + URL/token doanh nghiệp |
| amp                 | Hệ sinh thái đóng (Sourcegraph)                                |
| amazon-q / kiro-cli | AWS SSO xác thực, không có URL tùy chỉnh                       |
| cowork              | Anthropic Desktop, không có điểm cuối có thể cấu hình          |

Xem `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` để biết tham chiếu đầy đủ.

---

## 5. API Phát hiện Lô

Tất cả việc phát hiện công cụ được tổng hợp qua một điểm cuối duy nhất:

**`GET /api/cli-tools/all-statuses`**

- Xác thực: `requireCliToolsAuth(request)` (giống như các tuyến đường khác `/api/cli-tools/`)
- Trả về: `Record<toolId, ToolBatchStatus>` (kiểu: `src/shared/types/cliBatchStatus.ts`)
- Chiến lược: `Promise.all` trên tất cả các công cụ, thời gian chờ 5s cho mỗi công cụ
- Bộ nhớ đệm: trong bộ nhớ LRU được chỉ mục bởi tệp cấu hình `mtime`. Bộ nhớ đệm bị vô hiệu hóa khi mtime thay đổi. Đặt lại khi máy chủ khởi động lại.

Hình dạng phản hồi theo công cụ:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // đã được làm sạch, không có dấu vết ngăn xếp
}
```

## 6. Bộ xử lý Cài đặt cho Công cụ Mới

Các công cụ mới với `configType: "custom"` có các tuyến API cài đặt riêng:

| Tuyến                                       | Công cụ                                                          |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

Tất cả các tuyến đều sử dụng `sanitizeErrorMessage()` cho phản hồi lỗi (Quy tắc Cứng #12).

---

## 7. Kiến trúc Trang Dashboard

### Mã CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — thành phần máy chủ
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — lưới khách hàng
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — trang chi tiết công cụ
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 thẻ công cụ chuyên biệt + `ToolDetailClient.tsx`

### Đại lý CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — thành phần máy chủ
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — lưới khách hàng
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — tái sử dụng `ToolDetailClient`

### Đại lý ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — thành phần máy chủ (đã di chuyển từ `agents/`)

### Các Thành phần UI Chia sẻ (`src/shared/components/cli/`)

| Tệp                     | Mục đích                                                     |
| ----------------------- | ------------------------------------------------------------ |
| `CliToolCard.tsx`       | Thẻ trạng thái thông minh (phát hiện + cấu hình + điểm cuối) |
| `CliConceptCard.tsx`    | Thẻ giải thích khái niệm theo trang                          |
| `CliComparisonCard.tsx` | So sánh ba cột giữa các loại CLI                             |
| `BaseUrlSelect.tsx`     | Dropdown điểm cuối (Local/Cloud/Custom)                      |
| `ApiKeySelect.tsx`      | Trình chọn khóa API                                          |
| `ManualConfigModal.tsx` | Hộp thoại đoạn cấu hình có thể sao chép                      |

### Hook Chia sẻ (`src/shared/hooks/cli/`)

| Tệp                       | Mục đích                                                          |
| ------------------------- | ----------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Lấy `/api/cli-tools/all-statuses`, quản lý trạng thái tải/làm mới |

---

## 8. i18n

Các không gian tên mới được thêm vào kế hoạch 14 F9:

| Không gian tên | Mục đích                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| `cliCommon`    | Chuỗi chia sẻ (nhãn thẻ, văn bản khái niệm/so sánh, nhãn trang chi tiết) |
| `cliCode`      | Chuỗi trang của CLI Code                                                 |
| `cliAgents`    | Chuỗi trang của CLI Agents                                               |
| `acpAgents`    | Chuỗi trang của ACP Agents                                               |

Bản dịch đầy đủ PT-BR và EN được cung cấp. 39 ngôn ngữ khác sẽ tự động quay lại EN thông qua việc hợp nhất ở cấp không gian tên trong `src/i18n/request.ts`.

---

## 9. Bắt đầu nhanh

### Bước 1 — Lấy khóa API OmniRoute

1. Mở `/dashboard/api-manager` → **Tạo khóa API**
2. Đặt tên cho nó (ví dụ: `cli-tools`) và chọn tất cả quyền
3. Sao chép khóa — bạn sẽ cần nó cho mọi CLI bên dưới

> Khóa của bạn trông như: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Bước 2 — Cài đặt công cụ CLI

Tất cả các công cụ dựa trên npm yêu cầu Node.js 22.22.2+ hoặc 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (có thể khởi động qua `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Dựa trên Rust

# Pi coding agent
# xem https://github.com/zechnerj/pi-coding-agent để cài đặt

# jcode
# xem https://github.com/1jehuang/jcode để cài đặt
```

---

### Bước 3 — Cấu hình qua Dashboard

1. Đi tới `http://localhost:20128/dashboard/cli-code`
2. Tìm công cụ của bạn trong lưới
3. Nhấp vào thẻ để mở trang chi tiết công cụ
4. Chọn khóa API và URL cơ sở của bạn
5. Nhấp vào **Áp dụng cấu hình** hoặc sao chép đoạn cấu hình thủ công

---

### Bước 4 — Đặt biến môi trường toàn cục

```bash
# Điểm cuối toàn cầu OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI đọc GOOGLE_GEMINI_BASE_URL ở ROOT (SDK của nó tự động thêm /v1beta/... )
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Đối với **máy chủ từ xa**, thay thế `localhost:20128` bằng IP hoặc miền của máy chủ,
> ví dụ: `http://<your-server-ip>:20128`.

---

### Bước 4 — Cấu hình từng công cụ

#### Claude Code

```bash
# Tạo ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Sử dụng cổng gốc thống nhất của Anthropic cho Claude Code. Không thêm `/v1` ở đây.

**Kiểm tra:** `claude "say hello"`

---

#### OpenAI Codex

Codex hiện đại (v0.137+) chỉ đọc `~/.codex/config.toml` — `config.yaml` cũ thuộc về CLI npm kế thừa và bị bỏ qua một cách im lặng. Khóa API nằm trong biến môi trường `OMNIROUTE_API_KEY` (`env_key`), không bao giờ nằm trong tệp:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Tham khảo đầy đủ (hồ sơ, `wire_api`, cửa sổ ngữ cảnh): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Kiểm tra:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Kiểm tra:** `opencode`

> Sử dụng `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> để gửi các biến thể suy nghĩ.

---

#### Cline (CLI hoặc VS Code)

**Chế độ CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Chế độ VS Code:**
Cài đặt mở rộng Cline → Nhà cung cấp API: `OpenAI Compatible` → URL cơ sở: `http://localhost:20128/v1`

Hoặc sử dụng bảng điều khiển OmniRoute → **Công cụ CLI → Cline → Áp dụng cấu hình**.

---

#### KiloCode (CLI hoặc VS Code)

**Chế độ CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Cài đặt VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Hoặc sử dụng bảng điều khiển OmniRoute → **Công cụ CLI → KiloCode → Áp dụng cấu hình**.

---

#### Continue (Mở rộng VS Code)

Chỉnh sửa `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Khởi động lại VS Code sau khi chỉnh sửa.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Sử dụng điều này khi VS Code Insiders được cấu hình cho các mô hình điểm cuối tùy chỉnh và bạn muốn OmniRoute hoạt động mà không cần trường tiêu đề tùy chỉnh.

**Vị trí được khuyến nghị:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Ví dụ sử dụng bí danh OmniRoute đã được mã hóa:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Ghi chú:**

- Thay thế `sk-your-omniroute-key` bằng khóa API được tạo trong OmniRoute.
- Trường `url` nên trỏ đến `/api/v1/vscode/{token}/chat/completions`.
- Trường `modelsUrl` nên trỏ đến `/api/v1/vscode/{token}/models`.
- Ưu tiên luồng `/v1` bình thường + tiêu đề Bearer khi khách hàng hỗ trợ tiêu đề tùy chỉnh.
- Các mã thông báo nhúng trong URL là một biện pháp tương thích và có thể xuất hiện trong nhật ký biên tập viên hoặc lịch sử proxy.

---

#### Kiro CLI (Amazon)

```bash
# Đăng nhập vào tài khoản AWS/Kiro của bạn:
kiro-cli login

# CLI sử dụng xác thực riêng — OmniRoute không cần thiết làm backend cho Kiro CLI.
# Sử dụng kiro-cli cùng với OmniRoute cho các công cụ khác.
kiro-cli status
```

Đối với ứng dụng máy tính để bàn **Kiro IDE**, sử dụng điểm cuối MITM được OmniRoute cung cấp
dưới `/dashboard/cli-tools → Kiro`.

---

## 10. OmniRoute CLI Nội Bộ

Tập tin nhị phân `omniroute` cung cấp các lệnh cho vòng đời máy chủ, thiết lập, chẩn đoán và quản lý nhà cung cấp. Điểm vào: `bin/omniroute.mjs`.

```bash
omniroute                              # Khởi động máy chủ (cổng mặc định 20128)
omniroute setup                        # Trình hướng dẫn thiết lập tương tác
omniroute doctor                       # Kiểm tra cấu hình, DB, cổng, thời gian chạy
omniroute providers list               # Kết nối nhà cung cấp đã cấu hình
omniroute providers test-all           # Kiểm tra mọi kết nối đang hoạt động
omniroute reset-password               # Đặt lại mật khẩu quản trị viên
omniroute logs                         # Phát trực tiếp nhật ký yêu cầu
omniroute health                       # Tình trạng chi tiết (circuit breakers, bộ nhớ đệm, bộ nhớ)
omniroute --version                    # In phiên bản
omniroute --help                       # Hiển thị tất cả các lệnh
```

### Thiết lập & Khởi tạo

```bash
omniroute setup                        # Trình hướng dẫn thiết lập tương tác
omniroute setup --non-interactive      # Chế độ CI/tự động (đọc biến môi trường + cờ)
omniroute setup --password '<value>'   # Đặt mật khẩu quản trị viên trực tiếp
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Thêm và kiểm tra một nhà cung cấp trong một lần
```

Các biến môi trường được công nhận cho thiết lập không tương tác:

| Var                 | Mục đích                                                                        |
| ------------------- | ------------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Khóa API của nhà cung cấp (liên kết với `--api-key` qua `.env()` của Commander) |
| `DATA_DIR`          | Ghi đè thư mục dữ liệu của OmniRoute                                            |

Tất cả các đầu vào không tương tác khác được truyền dưới dạng cờ, không phải biến môi trường:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(xem các tùy chọn `omniroute setup` ở trên).

### Chẩn đoán

```bash
omniroute doctor                       # Kiểm tra cấu hình, DB, cổng, thời gian chạy, bộ nhớ, tình trạng sống
omniroute doctor --json                # Định dạng JSON có thể đọc được
omniroute doctor --no-liveness         # Bỏ qua kiểm tra tình trạng HTTP
omniroute doctor --host 0.0.0.0        # Ghi đè máy chủ tình trạng sống
omniroute doctor --liveness-url <url>  # Ghi đè URL điểm cuối tình trạng đầy đủ
```

Chương trình chẩn đoán thực hiện các kiểm tra này: `Cấu hình`, `Cơ sở dữ liệu`, `Lưu trữ/mã hóa`,
`Khả dụng cổng`, `Thời gian chạy Node`, `Tập tin nhị phân gốc` (better-sqlite3),
`Bộ nhớ`, và `Tình trạng sống của máy chủ`. Nó thoát với mã không bằng 0 nếu bất kỳ kiểm tra nào là `thất bại`.

### Quản lý Nhà cung cấp

```bash
omniroute providers available                       # Danh mục nhà cung cấp OmniRoute
omniroute providers available --search openai       # Lọc danh mục theo id/tên/bí danh/danh mục
omniroute providers available --category api-key    # Lọc theo danh mục (api-key, oauth, miễn phí, ...)
omniroute providers available --json                # Định dạng JSON có thể đọc được

omniroute providers list                            # Kết nối nhà cung cấp đã cấu hình
omniroute providers list --json

omniroute providers test <id|name>                  # Kiểm tra một kết nối đã cấu hình
omniroute providers test-all                        # Kiểm tra mọi kết nối đang hoạt động
omniroute providers validate                        # Kiểm tra cấu trúc chỉ cục bộ
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Quy trình OAuth hiện có
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` là API-first và do đó hoạt động với
ngữ cảnh cục bộ hoặc từ xa đang hoạt động. Đầu vào thông tin xác thực nên sử dụng
`--credential-stdin` hoặc `--credential-env`; `--dry-run --json` chỉ báo cáo
sự hiện diện/hình dạng đã được làm mờ. `providers available` đọc danh mục OmniRoute;
`providers list/test/test-all/validate` giữ nguyên hành vi SQLite cục bộ của chúng và
không yêu cầu máy chủ phải đang chạy.

### Khôi phục & Đặt lại

```bash
omniroute reset-password                # Đặt lại mật khẩu quản trị viên (cũng: omniroute-reset-password)
omniroute reset-encrypted-columns       # Hiển thị cảnh báo + chạy thử cho việc đặt lại thông tin xác thực đã mã hóa
omniroute reset-encrypted-columns --force  # Thực sự xóa thông tin xác thực đã mã hóa trong SQLite
```

### Xuất Thông tin xác thực (⚠ xử lý cẩn thận)

```bash
omniroute auth export                                 # Hiển thị cảnh báo + cổng xác nhận — không truy cập DB
omniroute auth export --force                          # Xuất tất cả thông tin xác thực đã GIẢI MÃ của tất cả các kết nối ra stdout dưới dạng JSON
omniroute auth export --force --id <id>                 # Xuất chỉ kết nối phù hợp
omniroute auth export --force --format env               # Xuất các dòng OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Ghi vào một tệp (được tạo với quyền 0600)
```

`auth export` là **chỉ cục bộ** (đọc trực tiếp từ SQLite, không có tuyến HTTP) và cố ý in/ghi
các giá trị **dạng văn bản** `apiKey`/`accessToken`/`refreshToken`/`idToken` — đó là tính năng, không phải
lỗi. Không có gì được đọc từ cơ sở dữ liệu, và không có gì được giải mã, mà không có `--force`. Một banner cảnh báo stderr
luôn được in trước khi bất kỳ văn bản nào được phát ra. Cần phải đặt `STORAGE_ENCRYPTION_KEY`.
Một trường không thể giải mã (khóa cũ, văn bản mã hóa bị hỏng) được báo cáo là
`<field>DecryptFailed: true` thay vì hủy bỏ toàn bộ xuất hoặc rò rỉ lỗi cơ bản.

### Các lệnh con khác

Các lệnh này giả định một máy chủ OmniRoute đang chạy, trừ khi có ghi chú khác:

```bash
omniroute status                       # Tình trạng thời gian chạy toàn diện
omniroute logs                         # Phát trực tiếp nhật ký yêu cầu (--json, --search, --follow)
omniroute config show                  # Hiển thị cấu hình hiện tại

omniroute provider list                # Liệt kê các nhà cung cấp có sẵn (bí danh của providers list)
omniroute provider add                 # Đăng ký OmniRoute như một nhà cung cấp trên một công cụ
omniroute keys add | list | remove     # Quản lý các khóa API
omniroute models [provider]            # Liệt kê các mô hình (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Chụp ảnh cấu hình + DB
omniroute restore                      # Khôi phục từ một ảnh chụp trước đó

omniroute health                       # Tình trạng chi tiết (circuit breakers, bộ nhớ đệm, bộ nhớ)
omniroute quota                        # Sử dụng hạn ngạch nhà cung cấp
omniroute cache                        # Tình trạng bộ nhớ đệm
omniroute cache clear                  # Xóa bộ nhớ đệm ngữ nghĩa + chữ ký

omniroute mcp status | restart         # Tình trạng máy chủ MCP / khởi động lại
omniroute a2a status | card            # Tình trạng máy chủ A2A / thẻ đại lý

omniroute tunnel list | create | stop  # Quản lý các đường hầm (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Kiểm tra / đặt biến môi trường (tạm thời)

omniroute test                         # Kiểm tra kết nối nhà cung cấp
omniroute update                       # Kiểm tra cập nhật
omniroute completion                   # Tạo hoàn thành shell
```

### Cờ chung

| Cờ                  | Mô tả                                                 |
| ------------------- | ----------------------------------------------------- |
| `--no-open`         | Không tự động mở trình duyệt khi khởi động            |
| `--port <n>`        | Ghi đè cổng API (mặc định 20128)                      |
| `--mcp`             | Chạy như máy chủ MCP qua stdio (cho IDE)              |
| `--non-interactive` | Chế độ CI (không có nhắc nhở; đọc từ env/cờ)          |
| `--json`            | Đầu ra JSON có thể đọc được (doctor, providers, v.v.) |
| `--help`, `-h`      | Hiển thị trợ giúp cụ thể cho lệnh                     |
| `--version`, `-v`   | In phiên bản đã cài đặt                               |

---

## Các Điểm Cuối API Có Sẵn

| Điểm Cuối                  | Mô Tả                                       | Sử Dụng Cho                  |
| -------------------------- | ------------------------------------------- | ---------------------------- |
| `/v1/chat/completions`     | Trò chuyện tiêu chuẩn (tất cả nhà cung cấp) | Tất cả công cụ hiện đại      |
| `/v1/responses`            | API phản hồi (định dạng OpenAI)             | Codex, quy trình tác động    |
| `/v1/completions`          | Hoàn thành văn bản cũ                       | Công cụ cũ sử dụng `prompt:` |
| `/v1/embeddings`           | Nhúng văn bản                               | RAG, tìm kiếm                |
| `/v1/images/generations`   | Tạo hình ảnh                                | GPT-Image, Flux, v.v.        |
| `/v1/audio/speech`         | Chuyển văn bản thành giọng nói              | ElevenLabs, OpenAI TTS       |
| `/v1/audio/transcriptions` | Chuyển giọng nói thành văn bản              | Deepgram, AssemblyAI         |

Ví dụ sẵn sàng để dán với URL OmniRoute đã được phân tách:

```txt
Ví dụ token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Cơ sở OpenAI tiêu chuẩn: http://localhost:20128/v1
Mô hình VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Trò chuyện VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Phản hồi VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Thẻ Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Trò chuyện Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Khắc Phục Sự Cố

| Lỗi                                               | Nguyên Nhân                         | Cách Khắc Phục                                         |
| ------------------------------------------------- | ----------------------------------- | ------------------------------------------------------ |
| `Connection refused`                              | OmniRoute không chạy                | `omniroute serve`                                      |
| `401 Unauthorized`                                | Khóa API sai                        | Kiểm tra trong `/dashboard/api-manager`                |
| `No combo configured`                             | Không có combo định tuyến hoạt động | Thiết lập trong `/dashboard/combos`                    |
| CLI hiển thị "not installed"                      | Nhị phân không có trong PATH        | Kiểm tra `which <command>`                             |
| Dashboard hiển thị "not detected" sau khi cài đặt | Bộ nhớ cache cũ                     | Nhấn "⟳ Làm mới phát hiện" trong bảng điều khiển       |
| Liên kết cũ `/dashboard/cli-tools`                | Đánh dấu trước v3.8.6               | Tự động chuyển hướng đến `/dashboard/cli-code` (308)   |
| Liên kết cũ `/dashboard/agents`                   | Đánh dấu trước v3.8.6               | Tự động chuyển hướng đến `/dashboard/acp-agents` (308) |
