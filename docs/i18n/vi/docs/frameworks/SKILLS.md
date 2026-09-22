# Skills Framework (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Nguồn chuẩn:** `src/lib/skills/` và `src/app/api/skills/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute cung cấp một framework Skills có khả năng mở rộng, cho phép các mô hình ngôn ngữ (và người vận hành) kết hợp những năng lực có thể tái sử dụng — từ đọc hệ thống tệp và gửi yêu cầu HTTP đến thực thi mã trong sandbox và sử dụng các skill được tuyển chọn từ marketplace.

Một skill là một đơn vị công việc có phiên bản và được định nghĩa bằng schema. OmniRoute có thể chèn các skill dưới dạng định nghĩa công cụ vào những yêu cầu gửi đi, chặn các lệnh gọi công cụ được mô hình trả về, chạy handler tương ứng và đưa kết quả trở lại mô hình để cuộc hội thoại có thể tiếp tục. Mô hình không bao giờ thấy phần triển khai — chỉ thấy giao diện công cụ.

---

## Agent Skills và Omni Skills

OmniRoute có hai hệ thống skill riêng biệt nhưng bổ trợ lẫn nhau:

| Khía cạnh         | **Omni Skills** (tài liệu này)                                        | **Agent Skills**                                                                                  |
| :---------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Mục đích          | Chèn công cụ LLM + thực thi trong sandbox                             | Danh mục SKILL.md để các agent bên ngoài khám phá và sử dụng                                      |
| Nguồn chuẩn       | `src/lib/skills/` + marketplace                                       | `src/lib/agentSkills/` + thư mục `skills/`                                                        |
| Chế độ runtime    | Được chèn vào các yêu cầu gửi đi, thực thi khi có sự kiện gọi công cụ | Danh mục markdown tĩnh + các endpoint khám phá REST/MCP/A2A                                       |
| Đối tượng sử dụng | Chính OmniRoute (định tuyến kết hợp, các lệnh gọi LLM đến)            | Agent bên ngoài, client MCP, trình điều phối A2A                                                  |
| Số lượng          | Thay đổi (do marketplace quyết định)                                  | 45 mục danh mục (23 API + 21 CLI + 1 cấu hình)                                                    |
| Định dạng         | `SkillDefinition` với schema công cụ + handler                        | Frontmatter `SKILL.md` + nội dung markdown                                                        |
| Khám phá          | REST `/api/skills/*` + các công cụ MCP `omniroute_skills_*`           | REST `/api/agent-skills/*` + các công cụ MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** là công cụ thực thi — chúng xác định OmniRoute _có thể làm gì_ khi một LLM gọi công cụ.

**Agent Skills** là danh mục tài liệu — chúng giải thích cho các agent bên ngoài _cách sử dụng_ REST API và CLI của OmniRoute, thông qua các tệp SKILL.md có cấu trúc có thể được đưa trực tiếp vào prompt của agent.

Để tìm hiểu về danh mục Agent Skills, trình tạo, các công cụ MCP và skill A2A, hãy xem [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Khái niệm

### Nguồn Skill

Ba nguồn skill cùng tồn tại trong một registry:

1. **Skill tích hợp sẵn** (`src/lib/skills/builtins.ts`) — được phân phối cùng OmniRoute. Bao quát các trường hợp phổ biến:
   - `file_read`, `file_write` — workspace sandbox theo từng khóa API tại `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP gửi ra ngoài thông qua `safeOutboundFetch` với `guard: "public-only"`
   - `web_search` — nhà cung cấp tìm kiếm có thể thay thế với cơ chế lưu cache (`executeWebSearch`)
   - `eval_code` — thực thi `node` hoặc `python` trong sandbox Docker
   - `execute_command` — lệnh shell trong sandbox Docker
   - `browser` — cấu trúc nền tảng dựa trên Playwright, bị tắt theo mặc định (`builtin/browser.ts`)
2. **SkillsMP** (Marketplace của OmniRoute) — được tải từ `https://skillsmp.com/api/v1/skills/search`. Yêu cầu `skillsmpApiKey` trong phần Cài đặt.
3. **SkillsSH** (danh mục cộng đồng `skills.sh`) — được tải từ `https://skills.sh/api/search`. Không cần xác thực; nội dung SKILL.md được lấy từ dữ liệu thô trên GitHub.

Một "nhà cung cấp đang hoạt động" duy nhất kiểm soát dashboard sẽ cài đặt từ danh mục nào (`src/lib/skills/providerSettings.ts`). Chuyển đổi trong **Cài đặt → Bộ nhớ & Skill**. Mặc định: `skillsmp`.

### Danh tính Skill

Các skill được định danh bằng `name@version` trong registry trong bộ nhớ (`src/lib/skills/registry.ts`). Phiên bản phải tuân theo semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` hiểu các ràng buộc `^`, `~`, `>`, `>=`, `<`, `<=`, `==` và khớp chính xác.

### Chế độ Skill

Mỗi skill có một chế độ runtime kiểm soát thời điểm skill được chèn:

| Chế độ | Hành vi                                                                                        |
| ------ | ---------------------------------------------------------------------------------------------- |
| `on`   | Luôn được chèn dưới dạng định nghĩa công cụ                                                    |
| `off`  | Không bao giờ được chèn, không bao giờ có thể thực thi                                         |
| `auto` | Được chấm điểm dựa trên yêu cầu đến; chỉ được chèn nếu điểm ≥ `AUTO_MIN_SCORE` (mặc định là 3) |

`auto` là chế độ mặc định cho các skill được cài đặt từ marketplace. `enabled=true` kết hợp với `mode="off"` có nghĩa là "đã đăng ký nhưng không hoạt động" — việc chuyển đổi `enabled` qua cột cũ cũng cập nhật `mode` để các luồng mã cũ vẫn nhất quán (`src/app/api/skills/[id]/route.ts`).

### Trạng thái (thực thi)

Các lần thực thi skill được theo dõi trong bảng `skill_executions` với các trạng thái sau (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache Registry

`SkillRegistry` là một singleton với cache TTL 60 giây (`registry.ts:14`). `loadFromDatabase()` có tính lũy đẳng và loại bỏ các lệnh gọi đồng thời trùng lặp thông qua `pendingLoad`. Mọi thao tác ghi (`register`/`unregister`/`unregisterById`) đều làm mất hiệu lực cache. Tra cứu các phiên bản qua `getSkillVersions(name)` và `resolveVersion(name, constraint)`.

### Chèn theo Nhà cung cấp

`injectSkills()` trong `src/lib/skills/injection.ts` là điểm vào chuyển đổi các skill đã đăng ký thành các định nghĩa công cụ dành riêng cho từng nhà cung cấp:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Tên công cụ được mã hóa dưới dạng `name@version` để trình xử lý có thể chọn đúng phiên bản khi mô hình gọi lại công cụ đó.

### Chấm điểm AUTO

Khi `mode="auto"`, mỗi kỹ năng ứng viên được chấm điểm dựa trên ngữ cảnh yêu cầu (`scoreAutoSkill()` trong `injection.ts`):

| Tín hiệu                                                       | Điểm         |
| -------------------------------------------------------------- | ------------ |
| Tên kỹ năng xuất hiện nguyên văn trong ngữ cảnh                | +6           |
| Mỗi token trong tên khớp với một token trong ngữ cảnh          | +2           |
| Mỗi chuỗi con của thẻ khớp với ngữ cảnh                        | +3           |
| Mỗi token trong phần mô tả khớp với ngữ cảnh                   | +1           |
| Lý do nền khớp với một token trong tên                         | +2 mỗi token |
| Lý do nền khớp với một thẻ                                     | +2 mỗi token |
| Gợi ý nhà cung cấp trong thẻ khớp với nhà cung cấp của yêu cầu | +2 / −2      |

Tối đa `AUTO_MAX_SKILLS = 5` kỹ năng có `score >= AUTO_MIN_SCORE = 3` được chèn vào. Trường hợp hòa điểm được phân định theo `installCount` (giảm dần), sau đó theo tên theo thứ tự bảng chữ cái (`injection.ts:225-235`).

### Chặn lệnh gọi công cụ

`handleToolCallExecution()` trong `src/lib/skills/interception.ts` được trình xử lý trò chuyện gọi sau khi dịch vụ thượng nguồn trả về phản hồi có lệnh gọi công cụ:

1. `extractToolCalls()` đọc các cấu trúc riêng của từng nhà cung cấp (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Các bí danh của công cụ tích hợp sẵn (ví dụ: `omniroute_web_search` → `web_search`) được phân giải trước. Các trình xử lý tích hợp sẵn được chạy trực tiếp.
3. Mọi trường hợp khác được định tuyến qua `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Kết quả được chèn trở lại vào phản hồi — dưới dạng các mục `tool_results`, `function_call_output` hoặc các khối `tool_result` của Anthropic, tùy trường hợp.

`customSkillExecutionEnabled` trong ngữ cảnh thực thi có thể được đặt thành `false` để chỉ cho phép chặn các công cụ tích hợp sẵn (được sử dụng bởi các đường dẫn yêu cầu vô hiệu hóa rõ ràng các trình xử lý do người dùng định nghĩa).

---

## Hộp cát Docker

Các đường dẫn mã không tích hợp sẵn (`eval_code`, `execute_command`) chạy bên trong Docker thông qua `SandboxRunner` (`src/lib/skills/sandbox.ts`). Mỗi container được khởi chạy với:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (khi readOnly=true)
```

Các giá trị mặc định (`SandboxRunner.DEFAULT_CONFIG`):

| Trường           | Mặc định        | Ghi chú                                          |
| ---------------- | --------------- | ------------------------------------------------ |
| `cpuLimit`       | 100 (= 0.1 CPU) | Được chia cho 1000 trước khi truyền vào `--cpus` |
| `memoryLimit`    | 256 MB          | Giới hạn cứng                                    |
| `timeout`        | 30000 ms        | Dừng mềm qua `SIGTERM` + `docker kill`           |
| `networkEnabled` | `false`         | Trở thành `--network none`                       |
| `readOnly`       | `true`          | FS gốc chỉ đọc; `/tmp` và `/workspace` là tmpfs  |

`SandboxRunner.kill(id)` và `killAll()` được cung cấp để tắt; các container đang chạy được theo dõi trong `runningContainers: Map<string, ChildProcess>`.

### Biến môi trường của hộp cát

Được cấu hình thông qua `process.env` trong `src/lib/skills/builtins.ts`:

| Biến môi trường                   | Mặc định         | Mục đích                                                                                                         |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Giới hạn cho `file_read` và `file_write`                                                                         |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Giới hạn phần thân phản hồi của `http_request`                                                                   |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Giới hạn stdout/stderr được trả về cho bên gọi                                                                   |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Thời gian chờ mặc định cho các lệnh trong hộp cát; tối đa 60 s                                                   |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Cổng kiểm soát chính cho lưu lượng đi ra. Đặt thành `1` hoặc `true` để cho phép chọn tham gia theo từng lệnh gọi |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (xem bên dưới)   | Danh sách cho phép các image Docker, phân tách bằng dấu phẩy                                                     |

Các image được phép theo mặc định: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Mọi mục bổ sung thông qua `SKILLS_ALLOWED_SANDBOX_IMAGES` được hợp nhất với các giá trị mặc định; các image không xác định bị `normalizeImage()` từ chối.

> Lưu ý: không có biến môi trường `SKILLS_EXECUTION_TIMEOUT_MS` riêng biệt. Thời gian chờ của trình xử lý ngoài hộp cát được mã hóa cứng thành 30 s trong `SkillExecutor` (`executor.ts:13`) nhưng có thể được ghi đè khi chạy thông qua `skillExecutor.setTimeout(ms)`.

### Cách ly không gian làm việc

`file_read` và `file_write` phân giải mọi đường dẫn tương đối với một không gian làm việc riêng cho từng khóa API tại `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Việc duyệt ngược đường dẫn (`..`) và các phân đoạn bị cấm (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) bị từ chối trước khi thực hiện bất kỳ thao tác I/O đĩa nào.

### Tăng cường bảo mật HTTP

`http_request` (`builtins.ts:257`):

- Danh sách phương thức được phép: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Các header gửi đi bị chặn: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Chuyển hướng bị vô hiệu hóa (`allowRedirect: false`)
- Được định tuyến thông qua `safeOutboundFetch` với `guard: "public-only"` (các dải địa chỉ riêng/loopback bị chặn)
- Phản hồi bị cắt bớt tại `SKILLS_MAX_HTTP_RESPONSE_BYTES`; phía máy khách nhận được `truncated: true`

---

## Trình thực thi kết hợp (bản xem trước)

`src/lib/skills/hybrid.ts` định nghĩa một `HybridExecutor` quyết định giữa thực thi `direct` (trong tiến trình) và `sandbox` cho từng lần gọi, với cơ chế thử lại `autoUpgrade` khi xảy ra lỗi hết thời gian chờ/bộ nhớ. Các triển khai `directExecutor` / `sandboxRunner` được tích hợp sẵn hiện chỉ là các stub (`executeDirect`, `executeInSandbox` trả về các đối tượng giữ chỗ) — hãy xem mô-đun này như một giao kèo đang được xây dựng. Quá trình thực thi thực tế vẫn đi qua `skillExecutor` + `SandboxRunner`.

---

## Lưu trữ

Lược đồ nằm trong hai migration:

- `src/lib/db/migrations/016_create_skills.sql` — các bảng `skills` và `skill_executions` cơ sở, với các chỉ mục trên `(api_key_id, name)` và `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — thêm `mode`, `source_provider`, `tags` (JSON), `install_count` vào `skills`.

`skill_executions.status` bị ràng buộc ở cấp cơ sở dữ liệu: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Tất cả endpoint đều nằm trong `src/app/api/skills/`. Các endpoint quản lý (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) yêu cầu **xác thực quản lý** thông qua `requireManagementAuth()`. Các luồng marketplace/cài đặt sử dụng `isAuthenticated()` nhẹ hơn (phiên hoặc khóa API).

| Endpoint | Phương thức | Mục đích |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Liệt kê các skill đã đăng ký. Hỗ trợ `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, phân trang |
| `/api/skills/[id]` | PUT | Cập nhật `enabled` hoặc `mode` |
| `/api/skills/[id]` | DELETE | Hủy đăng ký theo id |
| `/api/skills/install` | POST | Cài đặt một skill tùy chỉnh (mã trình xử lý + lược đồ) |
| `/api/skills/marketplace` | GET | Tìm kiếm danh mục SkillsMP (trả về các mục phổ biến mặc định khi `q` trống) |
| `/api/skills/marketplace/install` | POST | Cài đặt một skill SkillsMP (yêu cầu nhà cung cấp đang hoạt động = `skillsmp`) |
| `/api/skills/skillssh` | GET | Tìm kiếm danh mục skills.sh (`?q=&limit=`, giới hạn tối đa 100) |
| `/api/skills/skillssh/install` | POST | Cài đặt một skill skills.sh (yêu cầu nhà cung cấp đang hoạt động = `skillssh`) |
| `/api/skills/executions` | GET | Lịch sử thực thi được phân trang (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Thực thi tùy thời điểm một skill đã đăng ký |

Endpoint `POST /api/skills/executions` trả về HTTP `503` với `{ error: "Skills execution is disabled..." }` khi `settings.skillsEnabled === false` (`executor.ts:42-45`). Người vận hành có thể bật/tắt công tắc chính từ **Cài đặt → AI**.

### Ví dụ: cài đặt một skill tùy chỉnh

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

Chuỗi `handlerCode` là một **phép tra cứu tên trình xử lý** — không phải mã có thể thực thi. Trình thực thi ánh xạ chuỗi này thông qua `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Các lượt cài đặt từ marketplace lưu văn bản SKILL.md trong trường này dưới dạng tài liệu và định tuyến quá trình thực thi thông qua các lệnh gọi công cụ do mô hình tạo ra. Mã nguồn tùy ý do người dùng cung cấp không được eval.

---

## Công cụ MCP

Bốn công cụ MCP bao bọc bề mặt skill (`open-sse/mcp-server/tools/skillTools.ts`). Chúng được tự động đăng ký khi máy chủ MCP khởi động.

| Công cụ                       | Mô tả                                                             |
| ----------------------------- | ----------------------------------------------------------------- |
| `omniroute_skills_list`       | Liệt kê các skill, bộ lọc tùy chọn: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Bật/tắt một skill theo `skillId`                                  |
| `omniroute_skills_execute`    | Thực thi một skill với payload đầu vào                            |
| `omniroute_skills_executions` | Lịch sử thực thi gần đây (mặc định 50, tối đa 100)                |

Xem [MCP-SERVER.md](./MCP-SERVER.md) để biết cách thiết lập phương thức truyền tải và gán phạm vi.

---

## Tích hợp A2A

`src/lib/skills/a2a.ts` xuất bộ mô tả skill A2A `memory_aware_routing` và hàm trợ giúp `registerA2ASkill(registry)`. Các skill A2A tùy chỉnh nằm trong `src/lib/a2a/skills/` và được điều phối thông qua `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Xem [A2A-SERVER.md](./A2A-SERVER.md) để biết toàn bộ vòng đời của tác vụ.

---

## Thêm một skill tích hợp sẵn mới

1. **Định nghĩa trình xử lý** trong `src/lib/skills/builtins.ts` (hoặc một tệp cùng cấp trong `src/lib/skills/builtin/`). Chữ ký: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Đường dẫn mã được sandbox hóa?** Gọi `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Sử dụng `normalizeImage()` để đối chiếu với danh sách cho phép.
3. **Đường dẫn hệ thống tệp?** Luôn truyền qua `resolveWorkspacePath(input, context)` trước khi truy cập ổ đĩa.
4. **Lệnh gọi mạng?** Sử dụng `safeOutboundFetch` với `guard: "public-only"`; làm sạch các header thông qua `sanitizeHeaders()`.
5. **Đăng ký** bằng cách thêm mục vào `builtinSkills` (hoặc gọi theo kiểu `registerBrowserSkill(executor)` khi khởi động).
6. **Kết nối các bí danh công cụ tích hợp sẵn** (tùy chọn) trong `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) nếu mô hình thượng nguồn phát ra một tên khác.
7. **Kiểm thử** trong `src/lib/skills/__tests__/` (Vitest).

---

## Thêm một skill tùy chỉnh (không tích hợp sẵn)

1. Đăng ký trình xử lý khi tiến trình khởi động:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Chèn skill thông qua `POST /api/skills/install` (trường `handlerCode` phải khớp với tên trình xử lý đã đăng ký).
3. Chuyển `mode` thành `on` hoặc `auto` thông qua `PUT /api/skills/[id]`.

---

## Mẹo vận hành

- **Công tắc chính:** `settings.skillsEnabled = false` chặn mọi hoạt động thực thi và trả về HTTP `503` trên `/api/skills/executions`. Registry vẫn tiếp tục tải.
- **Hạn chế lưu lượng đi:** giữ `SKILLS_SANDBOX_NETWORK_ENABLED` ở trạng thái chưa thiết lập (mặc định) để sandbox hoàn toàn cách ly mạng. `networkEnabled: true` trên từng lệnh gọi vẫn yêu cầu cổng kiểm soát chính.
- **Cho phép các image cụ thể:** đặt `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` để mở rộng danh sách cho phép.
- **Kiểm tra hoạt động thực thi:** `/dashboard/skills/executions` và `omniroute_skills_executions` đều truy vấn `skill_executions`. Các lần chạy thành công bao gồm `durationMs`; các lần thất bại bao gồm `errorMessage`.
- **Vô hiệu hóa bộ nhớ đệm:** gọi `skillRegistry.invalidateCache()` sau khi chỉnh sửa DB theo cách thủ công; nếu không, hãy chờ 60 giây.
- **Workspace ẩn danh:** khi `apiKeyId` trống, tất cả lệnh gọi đều được băm vào cùng một workspace `"anonymous"` — mã có nhận thức về việc chia sẻ phải luôn truyền một khóa thực.

---

## Vòng đời thực thi (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) là một **singleton** quản lý mọi lần gọi skill. Việc hiểu vòng đời của nó rất quan trọng để gỡ lỗi timeout, thử lại và trạng thái thực thi.

### Vòng đời gồm 5 giai đoạn

```
   execute() được gọi
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← đã xếp hàng, chưa bắt đầu (đã tạo hàng DB)
  └──────┬──────┘
         │ khởi chạy handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler được gọi với timeout
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (không có đường dẫn nào khác — bị tiến trình cha chấm dứt)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Hàng DB được cập nhật với trạng thái, đầu ra, durationMs
```

### Cấu hình mặc định

| Thiết lập    | Mặc định          | Có thể cấu hình qua                  |
| ------------ | ----------------- | ------------------------------------ |
| `timeout`    | `30000` (30 giây) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`               | `skillExecutor.setMaxRetries(count)` |

> **Quan trọng**: Executor là một singleton — việc gọi `setTimeout()` sẽ ảnh hưởng đến tất cả các lần gọi tiếp theo trên toàn cục. Timeout theo từng skill hiện chưa được hỗ trợ; nếu cần timeout khác nhau cho từng skill, hãy gửi các tiến trình riêng biệt hoặc phân nhánh executor.

### Các giá trị trạng thái

Từ `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Đã xếp hàng, chưa bắt đầu
  RUNNING = "running", // Handler đã được gọi
  SUCCESS = "success", // Handler trả về đầu ra hợp lệ
  ERROR = "error", // Handler đã ném ra một ngoại lệ
  TIMEOUT = "timeout", // Vượt quá timeout của executor
}
```

> **Lưu ý**: Trạng thái `TIMEOUT` được định nghĩa trong enum nhưng **thực tế không được ghi vào DB** bởi cách triển khai executor hiện tại — timeout xuất hiện dưới dạng `ERROR` với thông báo `"Skill execution timed out"`. Enum trạng thái này được dành riêng để sử dụng trong tương lai.

### Kiểm tra các lần thực thi

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Lấy một lần thực thi cụ thể theo ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Liệt kê các lần thực thi gần đây cho một API key
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Đếm tổng số lần thực thi
const total = skillExecutor.countExecutions("api-key-id");
```

### Hành vi thử lại

Thiết lập `maxRetries` được lưu trữ nhưng **hiện chưa được sử dụng** bởi phương thức `execute()` của executor — phương thức này chỉ thực hiện một lần thử duy nhất. Giá trị `maxRetries` được cung cấp để phục vụ việc triển khai trong tương lai và cho các hook cần đọc giá trị đó.

Hiện tại, logic thử lại phải được triển khai bên trong chính skill handler. Các skill
tích hợp sẵn được đăng ký với executor (ví dụ: `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` trong `src/lib/skills/builtin/`); bất kỳ handler nào
bạn đăng ký đều có thể bao bọc vòng lặp thử lại riêng:

```ts
// bên trong một skill handler
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## Chi tiết về SkillMode

Enum `SkillMode` (`src/lib/skills/types.ts`) kiểm soát **thời điểm và cách thức** các skill được gọi:

```ts
enum SkillMode {
  AUTO = "auto", // LLM quyết định khi nào gọi skill
  MANUAL = "manual", // Chỉ được gọi khi người dùng yêu cầu rõ ràng
  HYBRID = "hybrid", // Chấm điểm AUTO + ghi đè thủ công
}
```

> **Lưu ý**: Codebase định nghĩa `SkillMode` (AUTO/MANUAL/HYBRID), trong khi trường `Skill.mode` sử dụng một cấu trúc khác (`"on" | "off" | "auto"`). Chúng có liên quan nhưng không giống nhau — `SkillMode` dành cho chính sách thực thi, còn `Skill.mode` dùng để bật/tắt từng skill.

### Khi nào nên sử dụng từng chế độ

| Chế độ   | Hành vi của LLM                                                                   | Trường hợp sử dụng                                    |
| -------- | --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `AUTO`   | LLM có thể gọi skill khi nhận thấy cần thiết                                      | Các skill đa dụng (đọc tệp, yêu cầu HTTP)             |
| `MANUAL` | LLM không thể gọi skill; chỉ lệnh gọi API `executeSkill` rõ ràng mới kích hoạt nó | Các thao tác nhạy cảm (ghi cơ sở dữ liệu, thanh toán) |
| `HYBRID` | LLM có thể đề xuất skill; người dùng phải xác nhận                                | Các skill có tác dụng phụ nhưng không nguy hiểm       |

### Chấm điểm AUTO

Khi chế độ `AUTO` được kích hoạt, mỗi skill ứng viên được chấm điểm dựa trên ngữ cảnh yêu cầu
bởi `scoreAutoSkill()` trong `src/lib/skills/injection.ts` — một hệ thống điểm
nguyên có tính cộng dồn (khớp tên skill, mức độ trùng khớp token trong tên/thẻ/mô tả,
gợi ý về lý do chạy nền, điểm thưởng/phạt từ gợi ý nhà cung cấp). Tối đa
`AUTO_MAX_SKILLS = 5` skill có `score >= AUTO_MIN_SCORE = 3` được chèn dưới dạng
các công cụ có thể gọi; trường hợp bằng điểm được phân định theo `installCount`, sau đó theo tên. Xem bảng điểm đầy đủ
trong [**Tạo lược đồ công cụ → Chấm điểm AUTO**](#auto-scoring) ở phần trước của
tài liệu này; không có ngưỡng số thực kiểu `0.6` và không có việc chấm điểm trong `registry.ts`.

---

## Danh mục skill tích hợp sẵn

OmniRoute đi kèm một tập hợp skill tích hợp sẵn đã được tuyển chọn trong `src/lib/skills/builtin/`. Những skill phổ biến nhất:

### Skill tự động hóa trình duyệt

Skill trình duyệt (`src/lib/skills/builtin/browser.ts`) cung cấp khả năng tự động hóa trình duyệt headless thông qua Playwright/Puppeteer. **Nó đã được triển khai nhưng không nằm trong danh mục skill mặc định** — để sử dụng, hãy cài đặt riêng plugin tiện ích mở rộng trình duyệt.

```ts
// Bật trong cấu hình của bạn
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Luôn yêu cầu gọi một cách rõ ràng
  allowedSkills: ["browser"],
  timeout: 60000, // 60 giây để tải trang
  maxRetries: 1,
};
```

### Các danh mục tích hợp sẵn khác

| Danh mục    | Skill                                          | Chế độ |
| ----------- | ---------------------------------------------- | ------ |
| I/O tệp     | `file_read`, `file_write`                      | AUTO   |
| HTTP        | `http_request`                                 | AUTO   |
| Tìm kiếm    | `web_search`                                   | AUTO   |
| Thực thi mã | `eval_code` (JavaScript/Python trong sandbox)  | HYBRID |
| Hệ thống    | `execute_command` (thực thi CLI trong sandbox) | MANUAL |

### Thêm skill tùy chỉnh

Xem [SDK plugin & Tích hợp skill](./PLUGIN_SDK.md) để biết cách thêm một skill tùy chỉnh thông qua hệ thống plugin.

---

## Xem thêm

- [MCP-SERVER.md](./MCP-SERVER.md) — đăng ký công cụ MCP và các phương thức truyền tải
- [A2A-SERVER.md](./A2A-SERVER.md) — vòng đời tác vụ A2A và điều phối kỹ năng
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — phần giới thiệu dành cho người dùng
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — quy trình xử lý yêu cầu và sơ đồ thành phần
- Mã nguồn: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Kiểm thử: `src/lib/skills/__tests__/integration.test.ts`
