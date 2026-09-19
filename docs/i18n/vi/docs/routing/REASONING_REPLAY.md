# Reasoning Replay Cache (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Nguồn tham chiếu chuẩn:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute ghi lại `reasoning_content` của trợ lý do các mô hình ở chế độ suy luận tạo ra và phát lại nội dung này một cách trong suốt trong các yêu cầu nhiều lượt khi nhà cung cấp thượng nguồn yêu cầu. Điều này loại bỏ các lỗi HTTP 400 mà những nhà cung cấp nghiêm ngặt trả về khi lịch sử hội thoại của máy khách thiếu phần suy luận của lượt trước.

## Lý Do Tính Năng Này Tồn Tại

Một số nhà cung cấp chế độ suy luận từ chối lượt tiếp theo trừ khi **tin nhắn trước đó của trợ lý bao gồm `reasoning_content` gốc**. Dịch vụ thượng nguồn trả về mã 400 với các thông báo như:

```
Tham số không chính xác: reasoning_content trong chế độ suy luận phải được truyền trở lại API.
```

Tuy nhiên, các máy khách phổ biến (Cursor, Cline, Roo Code, OpenAI SDK) loại bỏ `reasoning_content` khỏi lịch sử mà chúng gửi lại. OmniRoute khôi phục nội dung này từ bộ nhớ đệm phía máy chủ để yêu cầu mà dịch vụ thượng nguồn nhận được luôn nhất quán. Issue #1628 đã giới thiệu cơ chế lưu trữ kết hợp giữa bộ nhớ và SQLite để bộ nhớ đệm vẫn tồn tại sau khi tiến trình khởi động lại.

## Kiến Trúc

```
Lượt N (trợ lý tạo phản hồi):
  → phản hồi chứa reasoning_content + tool_calls
  → nếu requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      ghi vào (bộ nhớ + DB), với khóa là từng tool_call.id
  → chuyển tiếp phản hồi đến máy khách (có thể giữ lại hoặc không giữ lại phần suy luận)

Lượt N+1 (máy khách gửi lượt tiếp theo):
  → trình chuyển đổi phát hiện: requiresReasoningReplay(provider, model) === true
  → với mỗi tin nhắn của trợ lý có tool_calls nhưng không có reasoning_content:
      lookupReasoning(toolCalls[0].id) → bộ nhớ → DB
      trúng  → msg.reasoning_content = cached; recordReplay()
      trượt → msg.reasoning_content = "" (phương án dự phòng cũ dành cho DeepSeek phiên bản cũ)
  → dịch vụ thượng nguồn nhận được lịch sử nhất quán → không còn lỗi 400
```

Việc ghi nhận diễn ra trong `open-sse/handlers/chatCore.ts` (tại hai vị trí gọi `cacheReasoningFromAssistantMessage`). Việc phát lại diễn ra trong `open-sse/translator/index.ts` sau khi ép kiểu schema nhưng trước khi điều phối.

## Lưu Trữ — Kết Hợp Bộ Nhớ + SQLite

Luồng xử lý chính sử dụng một `Map` trong bộ nhớ (LRU theo thời điểm tạo), được hỗ trợ bởi một bảng SQLite để phục hồi sau sự cố và cung cấp khả năng hiển thị trên bảng điều khiển.

| Lớp    | Cách triển khai                                   | Mục đích                                                     |
| ------ | ------------------------------------------------- | ------------------------------------------------------------ |
| Bộ nhớ | `Map` trong `open-sse/services/reasoningCache.ts` | Tra cứu nhanh, loại bỏ mục cũ nhất khi đạt 200               |
| DB     | Bảng `reasoning_cache` (`src/lib/db/`)            | Duy trì qua các lần khởi động lại, cung cấp số liệu thống kê |

Dữ liệu được ghi vào cả hai lớp. Khi đọc, hệ thống kiểm tra bộ nhớ trước, sau đó dự phòng bằng DB (các kết quả tìm thấy trong DB được đưa trở lại bộ nhớ). Lỗi DB không gây gián đoạn nghiêm trọng — bộ nhớ đệm trong bộ nhớ tiếp tục phục vụ luồng xử lý chính.

**Giá trị mặc định:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Số mục tối đa trong bộ nhớ: `200` (`MAX_MEMORY_ENTRIES`)
- Loại bỏ: `createdAt` cũ nhất trước

## Schema Cơ Sở Dữ Liệu

Tệp migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Các chỉ mục: `expires_at`, `provider`, `model`, `created_at`. `expires_at` được lưu dưới dạng số giây của Unix epoch; lớp SELECT chuẩn hóa các giá trị văn bản cũ thông qua `EXPIRES_AT_EPOCH_SQL`.

## Phát hiện nhà cung cấp / mô hình

Tính năng phát lại được bật khi `requiresReasoningReplay(provider, model)` trả về `true`. Hàm này kiểm tra hai danh sách trong `open-sse/services/reasoningCache.ts`.

**ID nhà cung cấp (khớp chính xác, không phân biệt chữ hoa chữ thường):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Mẫu biểu thức chính quy cho mô hình (không phân biệt chữ hoa chữ thường):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` và `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, hậu tố `-free` không bắt buộc)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Việc thêm một nhà cung cấp/mô hình nghiêm ngặt mới đồng nghĩa với việc bổ sung vào một trong các danh sách này và viết một kiểm thử đơn vị để xác nhận thao tác chèn phát lại. Phần mô tả PR phải trích dẫn chính xác chuỗi lỗi 400 từ nguồn ngược dòng đã thúc đẩy thay đổi này.

## REST API

Bộ nhớ đệm cung cấp hai điểm cuối trong `src/app/api/cache/reasoning/route.ts`. Cả hai đều yêu cầu xác thực quản trị (`isAuthenticated` từ `@/shared/utils/apiAuth`).

| Phương thức | Điểm cuối                                                 | Mô tả                                                     |
| ----------- | --------------------------------------------------------- | --------------------------------------------------------- |
| GET         | `/api/cache/reasoning`                                    | Thống kê + các mục được phân trang                        |
| GET         | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Danh sách đã lọc (`limit` được giới hạn trong `[1, 200]`) |
| DELETE      | `/api/cache/reasoning`                                    | Xóa toàn bộ (bộ nhớ + DB) và đặt lại số lượt hit/miss     |
| DELETE      | `/api/cache/reasoning?provider=deepseek`                  | Chỉ xóa các mục của một nhà cung cấp                      |
| DELETE      | `/api/cache/reasoning?toolCallId=call_abc`                | Xóa một mục duy nhất                                      |

**Cấu trúc phản hồi GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Ghi chú vận hành

- **Dọn dẹp:** `cleanupReasoningCache()` loại bỏ các mục đã hết hạn trong bộ nhớ và chạy `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Các worker kiểm tra tình trạng gọi hàm này định kỳ.
- **Khôi phục sau sự cố:** Sau khi khởi động lại, bộ nhớ sẽ trống nhưng DB vẫn giữ các mục chưa hết hạn. Lần tra cứu đầu tiên cho một `tool_call_id` nhất định là một lần truy cập DB; các lần tra cứu tiếp theo là những lần truy cập bộ nhớ.
- **Không có nội dung suy luận, không lưu vào bộ nhớ đệm:** `cacheReasoningFromAssistantMessage` trả về `0` khi thông báo của trợ lý không có trường `reasoning_content` / `reasoning`, vì vậy các phản hồi không suy luận không phát sinh chi phí.
- **Thao tác ghi cũng được kiểm soát:** cả hai vị trí gọi trong `chatCore.ts` (không phát trực tuyến và phát trực tuyến) chỉ gọi `cacheReasoningFromAssistantMessage()` khi `requiresReasoningReplay(provider, model)` là `true` — cùng một vị từ mà phía đọc kiểm tra. Các bản cài đặt không bao giờ sử dụng nhà cung cấp phát lại sẽ không còn phải chịu chi phí cho thao tác ghi, cập nhật chỉ mục và `try/catch` trên mọi phản hồi có nội dung suy luận.
- **Nhà cung cấp không nghiêm ngặt:** Khi `requiresReasoningReplay` là `false` và định dạng đích là OpenAI, trình chuyển đổi **loại bỏ** mọi trường `reasoning_content` khỏi các thông báo gửi đi — OpenAI Chat Completions không chấp nhận trường này.

## Xem thêm

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — bộ ngắt mạch, thời gian chờ, khóa mô hình
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — chẩn đoán lỗi 400 từ dịch vụ thượng nguồn
- Mã nguồn: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Di chuyển cơ sở dữ liệu: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Tuyến API: `src/app/api/cache/reasoning/route.ts`
- Vấn đề ban đầu: #1628
