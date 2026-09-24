# OmniRoute A2A Server Documentation (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute như một tác nhân định tuyến thông minh

Bề mặt A2A có hai giao diện:

- **JSON-RPC 2.0** tại `POST /a2a` (điểm truy cập chuẩn, được định nghĩa trong `src/app/a2a/route.ts`).
- **REST** trong `/api/a2a/*` dành cho bảng điều khiển và công cụ (trạng thái, danh sách tác vụ, hủy).

Các tác vụ được theo dõi bởi `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL mặc định là 5 phút). Các kỹ năng được điều phối thông qua `A2A_SKILL_HANDLERS` trong `src/lib/a2a/taskExecution.ts`.

## Khám phá tác nhân

```bash
curl http://localhost:20128/.well-known/agent.json
```

Trả về Agent Card mô tả các khả năng, kỹ năng và yêu cầu xác thực của OmniRoute.

Trường `version` của Agent Card được lấy từ `process.env.npm_package_version` (xem `src/app/.well-known/agent.json/route.ts:13`), vì vậy trường này luôn được tự động đồng bộ với `package.json` trong mỗi bản phát hành.

---

## Xác thực

Tất cả yêu cầu tới `/a2a` đều yêu cầu khóa API thông qua tiêu đề `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Nếu không có khóa API nào được cấu hình trên máy chủ, bước xác thực sẽ được bỏ qua.

## Kích hoạt

A2A được kiểm soát bằng nút chuyển đổi **Endpoints → A2A** và bị tắt theo mặc định. Khi bị tắt,
`GET /api/a2a/status` báo cáo `status: "disabled"` và `online: false`; các lệnh gọi JSON-RPC tới
`POST /a2a` trả về HTTP 503 với mã lỗi JSON-RPC `-32000`.

---

## Các phương thức JSON-RPC 2.0

### `message/send` — Thực thi đồng bộ

Gửi một thông điệp tới một kỹ năng và chờ phản hồi hoàn chỉnh.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**Phản hồi:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — Truyền phát SSE

Tương tự như `message/send` nhưng trả về Server-Sent Events để truyền phát theo thời gian thực.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Các sự kiện SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Truy vấn trạng thái tác vụ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Hủy tác vụ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Các kỹ năng khả dụng

OmniRoute cung cấp 6 kỹ năng A2A được liên kết trong `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Mỗi mô-đun kỹ năng nằm trong `src/lib/a2a/skills/`.

| Kỹ năng               | ID                   | Mô tả                                                                                                                                          | Thẻ                           | Ví dụ                                                    |
| :-------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :------------------------------------------------------- |
| Định tuyến thông minh | `smart-routing`      | Định tuyến một câu lệnh qua nhà cung cấp/tổ hợp tối ưu bằng công cụ tổ hợp + chấm điểm của OmniRoute                                           | định tuyến, nhà cung cấp      | "Định tuyến câu lệnh này qua mô hình tốt nhất"           |
| Quản lý hạn ngạch     | `quota-management`   | Báo cáo trạng thái hạn ngạch theo từng nhà cung cấp, giúp bên gọi quyết định thời điểm điều tiết/chuyển đổi                                    | hạn ngạch, nhà cung cấp       | "Kiểm tra hạn ngạch cho anthropic"                       |
| Khám phá nhà cung cấp | `provider-discovery` | Liệt kê các nhà cung cấp đã cài đặt cùng khả năng, cờ gói miễn phí và trạng thái OAuth                                                         | nhà cung cấp, khám phá        | "Có những nhà cung cấp nào?"                             |
| Phân tích chi phí     | `cost-analysis`      | Ước tính chi phí của một yêu cầu/cuộc hội thoại dựa trên danh mục + mức sử dụng gần đây                                                        | chi phí, mức sử dụng          | "Ước tính chi phí cho cuộc hội thoại này"                |
| Báo cáo tình trạng    | `health-report`      | Tổng hợp trạng thái bộ ngắt mạch, thời gian chờ và khóa theo từng nhà cung cấp                                                                 | tình trạng, khả năng phục hồi | "Hiển thị trạng thái tình trạng của tất cả nhà cung cấp" |
| Liệt kê khả năng      | `list-capabilities`  | Trả về toàn bộ danh mục 45 mục Kỹ năng Agent (23 API + 21 CLI + 1 cấu hình) dưới dạng bảng markdown cùng các URL SKILL.md thô để chèn ngữ cảnh | danh mục, khám phá, kỹ năng   | "Liệt kê tất cả khả năng của OmniRoute"                  |

> Thẻ Agent phải được duy trì đồng bộ với danh mục trực tiếp gồm 352 nhà cung cấp; số lượng nhà cung cấp và siêu dữ liệu miễn phí/không cần xác thực được lấy từ sổ đăng ký thời gian chạy.

### Chi tiết kỹ năng `list-capabilities`

Kỹ năng `list-capabilities` đặc biệt hữu ích cho các agent bên ngoài cần khám phá những gì OmniRoute cung cấp trước khi gửi lệnh gọi API. Kỹ năng này trả về một thành phần bảng markdown có cấu trúc:

```
| ID | Tên | Danh mục | Lĩnh vực | Điểm cuối/Lệnh | URL thô |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Xác thực & Phiên | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Mỗi hàng bao gồm cột `rawUrl` để các agent có thể ngay lập tức truy xuất toàn bộ SKILL.md. Trường `metadata.totalSkills` phản ánh kích thước danh mục (hiện là 45). Phần triển khai: `src/lib/a2a/skills/listCapabilities.ts`. Xem thêm [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (bổ trợ)

Điểm cuối JSON-RPC `/a2a` là điểm truy cập A2A chính thức. Các điểm cuối REST bên dưới cung cấp quyền truy cập bổ trợ cho bảng điều khiển và công cụ bên ngoài:

| Điểm cuối                    | Phương thức | Mô tả                                              | Xác thực                                                |
| :--------------------------- | :---------- | :------------------------------------------------- | :------------------------------------------------------ |
| `/api/a2a/status`            | GET         | Trạng thái máy chủ, các kỹ năng đã đăng ký         | (công khai)                                             |
| `/api/a2a/tasks`             | GET         | Liệt kê tác vụ kèm bộ lọc                          | quản trị                                                |
| `/api/a2a/tasks/[id]`        | GET         | Lấy tác vụ theo ID                                 | quản trị                                                |
| `/api/a2a/tasks/[id]/cancel` | POST        | Hủy tác vụ đang chạy                               | quản trị                                                |
| `/.well-known/agent.json`    | GET         | Agent Card (khám phá A2A)                          | (công khai, được lưu vào bộ nhớ đệm 3600 giây)          |
| `/api/a2a/tasks`             | POST        | Ủy quyền đến đội OmniConductor (Conductor PRD RF5) | Bearer đối chiếu với `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Ủy quyền Conductor đầu vào (`POST /api/a2a/tasks`):** các tác nhân A2A bên ngoài ủy quyền công việc lập trình cho đội OmniConductor thông qua OmniRoute. Phần thân: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — chỉ các kỹ năng của đội Conductor (những kỹ năng được công bố trên Agent Card) mới có thể được ủy quyền; `metadata.conductor.repo.url` là bắt buộc (đội làm việc trên các kho git). Tuyến này chuyển đổi thành `POST /v1/tasks` của hub bằng `CONDUCTOR_ORCHESTRATOR_TOKEN` phía máy chủ (dự phòng bằng `CONDUCTOR_HUB_TOKEN`) và trả về `201 { conductor_task_id, state: "submitted" }`; trạng thái tác vụ được truyền ngược qua cơ chế phản chiếu SSE→A2A (RF1) và có thể xem qua `GET /api/a2a/tasks?skill=conductor`.

---

## Thêm kỹ năng mới

1. **Tạo tệp kỹ năng:** `src/lib/a2a/skills/<your-skill>.ts`

   Xuất một hàm bất đồng bộ `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Tuân theo cấu trúc của các kỹ năng hiện có như `smartRouting.ts`.

2. **Đăng ký trình xử lý:** trong `src/lib/a2a/taskExecution.ts`, thêm một mục vào `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...các kỹ năng hiện có
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Công khai trong Agent Card:** trong `src/app/.well-known/agent.json/route.ts`, thêm vào mảng `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Viết kiểm thử:** `tests/unit/a2a-<your-skill>.test.ts`. Bao quát luồng thành công + luồng lỗi.

5. **Ghi lại tài liệu** cho kỹ năng mới trong bảng `Available Skills` của tệp này.

---

## TTL của tác vụ

Các tác vụ hết hạn sau `ttlMinutes` (mặc định 5 phút) — được cấu hình trong hàm khởi tạo `A2ATaskManager` tại `src/lib/a2a/taskManager.ts:82`. Để tùy chỉnh, hãy phân nhánh phần khởi tạo `A2ATaskManager` và truyền một giá trị khác (ví dụ: `new A2ATaskManager(15)` để đặt TTL là 15 phút). Một khoảng thời gian chạy nền sẽ quét các tác vụ đã hết hạn sau mỗi 60 giây.

---

## Vòng đời của tác vụ

```
đã gửi → đang xử lý → hoàn tất
                      → thất bại
                      → đã hủy
```

- Theo mặc định, các tác vụ hết hạn sau 5 phút (xem [TTL của tác vụ](#task-ttl))
- Các trạng thái kết thúc: `completed`, `failed`, `cancelled`
- Nhật ký sự kiện theo dõi mọi lần chuyển đổi trạng thái

---

## Mã lỗi

| Mã     | Ý nghĩa                                   |
| :----- | :---------------------------------------- |
| -32700 | Lỗi phân tích cú pháp (JSON không hợp lệ) |
| -32600 | Yêu cầu không hợp lệ / Chưa được ủy quyền |
| -32601 | Không tìm thấy phương thức hoặc kỹ năng   |
| -32602 | Tham số không hợp lệ                      |
| -32603 | Lỗi nội bộ                                |
| -32000 | Điểm cuối A2A đã bị vô hiệu hóa           |

---

## Ví dụ tích hợp

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
