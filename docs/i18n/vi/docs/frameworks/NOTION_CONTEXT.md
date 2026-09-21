# Notion Context Source (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Nguồn chuẩn:** `src/lib/notion/api.ts` (máy khách REST), `src/lib/db/notion.ts`
> (lưu trữ token), `open-sse/mcp-server/tools/notionTools.ts` (6 công cụ MCP),
> `src/app/api/settings/notion/route.ts` (API cài đặt). Việc đăng ký công cụ và kết nối
> phạm vi nằm trong `open-sse/mcp-server/server.ts`.

## Đây là gì

OmniRoute có thể kết nối với một không gian làm việc **Notion** làm **nguồn ngữ cảnh** — một
cơ sở tri thức có thể đọc/ghi mà các tác tử truy cập thông qua máy chủ MCP tích hợp sẵn. Sau khi
token tích hợp Notion được cấu hình, các công cụ MCP cho phép LLM tìm kiếm các trang và cơ sở dữ liệu,
đọc nội dung trang và cây khối, truy vấn cơ sở dữ liệu bằng bộ lọc/cách sắp xếp, cũng như nối thêm các
khối mới — tất cả đều được ủy quyền thông qua OmniRoute (với cơ chế thử lại, thời gian chờ và phân loại lỗi)
để mô hình không bao giờ truy cập trực tiếp API Notion.

Tích hợp này là một lớp bọc mỏng, được gia cố trên API REST chính thức của Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Máy khách
(`src/lib/notion/api.ts`) bổ sung:

- **Thử lại với thời gian chờ tăng theo cấp số nhân** (tối đa 3 lần thử) cho `429` và `5xx`.
- **Thời gian chờ yêu cầu 55 giây** thông qua `AbortController`.
- **Phân loại lỗi có kiểu** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, tuân theo gợi ý `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Làm sạch thông báo** để loại bỏ các đoạn giống dấu vết ngăn xếp trước khi hiển thị.

## Thiết lập

Không có **biến môi trường** nào cho token Notion — token được lưu trữ trong
bảng SQLite `key_value` (không gian tên `notion`, khóa `integration_token`) thông qua
`src/lib/db/notion.ts`. Hãy cấu hình token từ thẻ **Nguồn ngữ cảnh** trên bảng điều khiển Endpoint
(`NotionSourceCard`, thành phần cùng cấp với `ObsidianSourceCard`), hoặc thông qua API REST cài đặt.

> [!NOTE]
> Token là một **token tích hợp nội bộ của Notion**. Tạo một tích hợp tại
> <https://www.notion.com/my-integrations>, sau đó chia sẻ các trang/cơ sở dữ liệu mà bạn muốn
> OmniRoute truy cập với tích hợp đó (mô hình quyền của Notion dựa trên việc chia sẻ,
> không áp dụng cho toàn bộ không gian làm việc).

### Cấu hình qua REST

```bash
# Lưu + xác thực token tích hợp (POST xác thực bằng cách gửi một truy vấn tìm kiếm thử)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Kiểm tra trạng thái kết nối
curl http://localhost:20128/api/settings/notion

# Ngắt kết nối (xóa token đã lưu)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Cả ba phương thức đều yêu cầu xác thực bảng điều khiển (`isAuthenticated`). Khi gọi `POST`,
OmniRoute lưu token và ngay lập tức chạy một tìm kiếm thử với 1 kết quả; nếu Notion
trả về một đối tượng lỗi, token sẽ bị xóa và lệnh gọi thất bại với `400`.

## Công cụ MCP (6)

Được định nghĩa trong `open-sse/mcp-server/tools/notionTools.ts`. Token được phân giải tại thời điểm
gọi thông qua `getNotionToken()`; nếu chưa được cấu hình, công cụ sẽ ném ra lỗi
`"Token tích hợp Notion chưa được cấu hình. Hãy thiết lập token trong Cài đặt > Nguồn ngữ cảnh."`

| Công cụ                      | Phạm vi        | Mô tả                                                                                           |
| ---------------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Tìm kiếm trang và cơ sở dữ liệu bằng truy vấn văn bản (trả về tiêu đề, ID, URL). Có phân trang. |
| `notion_get_page`            | `read:notion`  | Lấy nội dung và siêu dữ liệu của một trang theo ID.                                             |
| `notion_list_block_children` | `read:notion`  | Liệt kê tất cả khối con của một khối hoặc trang (cây khối). Có phân trang.                      |
| `notion_query_database`      | `read:notion`  | Truy vấn cơ sở dữ liệu với `filter` + `sorts` tùy chọn (định dạng API Notion). Có phân trang.   |
| `notion_get_database`        | `read:notion`  | Lấy lược đồ/siêu dữ liệu của một cơ sở dữ liệu theo ID.                                         |
| `notion_append_blocks`       | `write:notion` | Nối thêm các khối con vào một khối hoặc trang hiện có (tối đa 100 khối cho mỗi yêu cầu).        |

### Tham số đầu vào

- `notion_search` — `query` (1–500 ký tự), `pageSize` (1–100, mặc định 20),
  `startCursor` (tùy chọn).
- `notion_get_page` — `pageId` (chuỗi hex 32 ký tự hoặc UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, mặc định 50),
  `startCursor` (tùy chọn).
- `notion_query_database` — `databaseId`, `filter` (tùy chọn, định dạng bộ lọc Notion),
  `sorts` (mảng tùy chọn), `pageSize` (1–100, mặc định 50), `startCursor` (tùy chọn).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (mảng các đối tượng khối),
  `after` (vị trí tùy chọn).

### Phạm vi

Các công cụ đọc yêu cầu `read:notion` và công cụ ghi yêu cầu `write:notion`.
Phạm vi được thực thi bởi `withScopeEnforcement()` trong
`open-sse/mcp-server/server.ts` chỉ khi `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; các
phạm vi được phép của bên gọi đến từ `OMNIROUTE_MCP_SCOPES` (phân tách bằng dấu phẩy) hoặc
ngữ cảnh phạm vi của khóa API đã xác thực. Xem [MCP-SERVER.md](./MCP-SERVER.md) để biết
đầy đủ mô hình phạm vi.

## Điểm cuối

| Phương thức | Đường dẫn              | Mục đích                          |
| ----------- | ---------------------- | --------------------------------- |
| `GET`       | `/api/settings/notion` | Trả về `{ connected, hasToken }`. |
| `POST`      | `/api/settings/notion` | Lưu + xác thực token tích hợp.    |
| `DELETE`    | `/api/settings/notion` | Ngắt kết nối (xóa token đã lưu).  |

> Đây là các route cài đặt của bảng điều khiển. **Không có điểm cuối proxy Notion `/v1`
> công khai** — Notion chỉ được truy cập thông qua các công cụ MCP ở trên.

## Trường hợp sử dụng

- **Câu trả lời dựa trên kiến thức** — cho phép một agent dùng `notion_search` để tìm kiếm trong không gian làm việc và
  dùng `notion_get_page` để lấy kết quả hàng đầu trước khi trả lời, nhờ đó phản hồi có thể trích dẫn tài liệu nội bộ thực tế.
- **Quy trình làm việc dựa trên cơ sở dữ liệu** — dùng `notion_query_database` để truy vấn cơ sở dữ liệu tác vụ/CRM với
  các bộ lọc + cách sắp xếp, sau đó tóm tắt hoặc phân loại các hàng.
- **Ghi ngược / ghi nhật ký** — dùng `notion_append_blocks` để nối thêm ghi chú cuộc họp, bản tóm tắt
  lần chạy hoặc đầu ra của agent vào một trang hiện có (chỉ nối thêm; không chỉnh sửa mang tính phá hủy).
- **Khám phá cấu trúc** — dùng `notion_list_block_children` để duyệt cây khối của một trang,
  hoặc `notion_get_database` để khám phá lược đồ thuộc tính của cơ sở dữ liệu trước khi truy vấn.

## Liên quan

- [Máy chủ MCP](./MCP-SERVER.md) — phương thức truyền tải, thực thi phạm vi, danh mục công cụ đầy đủ.
- [Nguồn ngữ cảnh Obsidian](./OBSIDIAN_CONTEXT.md) — nguồn ngữ cảnh tích hợp sẵn còn lại.
- [Hệ thống bộ nhớ](./MEMORY.md) — bộ nhớ hội thoại lâu dài (lớp ngữ cảnh bổ sung,
  được tự động chèn thay vì truy xuất bằng công cụ).
