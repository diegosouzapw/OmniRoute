# Providers — Claude Web (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` gửi các yêu cầu trò chuyện theo định dạng OpenAI thông qua một phiên trình duyệt `claude.ai`
đã được xác thực. Bộ thực thi chuẩn hóa cookie được cung cấp, phân giải một tổ chức đã xác thực,
chuẩn bị trạng thái hội thoại, chọn phương thức truyền tải trực tiếp hoặc qua trình duyệt và
chuyển đổi nghiêm ngặt phản hồi SSE từ thượng nguồn. Logic điều phối nằm tại
`open-sse/executors/claude-web.ts:320`.

> **Bạn mới sử dụng các nhà cung cấp Web Cookie?**
>
> Hãy đọc **`docs/getting-started/WEB-COOKIE-GUIDE.md`** để tìm hiểu quy trình thiết lập chung, hướng dẫn xác thực, các giới hạn và cách khắc phục sự cố trước khi làm theo hướng dẫn dành riêng cho nhà cung cấp này.

### Danh mục mô hình

Registry của nhà cung cấp hiện công khai chính xác bảy ID mô hình tĩnh sau
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID mô hình                  | Tên hiển thị            |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Nhà cung cấp này chưa triển khai tính năng khám phá mô hình động. Danh sách trên là
danh mục tại thời gian chạy.

### Thông tin xác thực và phân giải tổ chức

Cung cấp toàn bộ header Cookie của `claude.ai` hoặc một giá trị phiên đơn thuần. Các giá trị đơn thuần được
chuẩn hóa thành `sessionKey`; các cookie khác vẫn được giữ nguyên nếu được cung cấp. Bộ thực thi chấp nhận
cookie thông qua `cookie` hoặc `apiKey` và
đọc các giá trị `deviceId` và `orgId` không bắt buộc từ dữ liệu kết nối
(`open-sse/executors/claude-web.ts:72`).

Nếu không có `orgId`, bộ thực thi gọi `GET https://claude.ai/api/organizations` và sử dụng tổ chức đầu tiên
do phiên Claude Web đã xác thực trả về
(`open-sse/executors/claude-web.ts:141`). Bộ thực thi từ chối theo nguyên tắc an toàn khi không có tổ chức hợp lệ nào
được trả về, báo cáo việc ủy quyền phiên bị từ chối bằng mã 401 và phân biệt một thử thách Cloudflare
với lỗi xác thực.

### Thao tác hội thoại

Đối tượng `claude_web` cấp cao nhất không bắt buộc được kiểm tra nghiêm ngặt. Các trường không xác định sẽ bị từ chối. Những
trường được chấp nhận được định nghĩa trong `open-sse/executors/claude-web/session.ts:50`:

| Trường                | Ý nghĩa                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `operation`           | Mặc định là `completion`; sử dụng `retry` cho lượt thử lại           |
| `conversation_id`     | UUID rõ ràng cho một hội thoại hiện có                               |
| `parent_message_uuid` | UUID rõ ràng cho thông điệp trợ lý cha                               |
| `timezone`            | Tên múi giờ IANA hợp lệ                                              |
| `locale`              | Locale hợp lệ về cấu trúc                                            |
| `tool_states`         | Mảng trạng thái công cụ tài khoản không bắt buộc, giới hạn ở 128 mục |

Các yêu cầu đã chuẩn bị sử dụng một trong hai endpoint thượng nguồn
(`open-sse/executors/claude-web.ts:203`):

- Một lượt mới hoặc lượt tiếp theo gửi yêu cầu đến
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Một lượt thử lại gửi yêu cầu đến
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Một lượt mới bao gồm `create_conversation_params`. Một lượt tiếp theo được lưu trong bộ nhớ đệm hoặc được liên kết rõ ràng
bao gồm `parent_message_uuid` và bỏ qua `create_conversation_params`. Thao tác thử lại yêu cầu cả
trạng thái hội thoại và thông điệp cha, đồng thời không gửi prompt
(`open-sse/executors/claude-web/session.ts:254`). Các hội thoại mới mở giao diện người dùng đã xác thực
tại `/new`; các lượt tiếp theo được lưu trong bộ nhớ đệm hoặc được liên kết rõ ràng sẽ mở đúng trang hội thoại
(`open-sse/executors/claude-web/session.ts:324`).

Trạng thái hội thoại là một bộ nhớ đệm trong bộ nhớ, được định khóa bằng phạm vi tài khoản SHA-256 và bản chép lời chuẩn hóa
của bên gọi. Các mục hết hạn sau 30 phút và bộ nhớ đệm được giới hạn ở 5.000 mục
(`open-sse/executors/claude-web/session.ts:12`). Trạng thái chỉ được ghi nhận sau khi
bộ phân tích luồng nghiêm ngặt quan sát thấy `message_stop`; việc khởi động lại tiến trình sẽ loại bỏ trạng thái đó. Khi không tìm thấy trong bộ nhớ đệm,
một yêu cầu có nhiều thông điệp được tuần tự hóa thành một prompt khôi phục duy nhất thay vì âm thầm loại bỏ
các thông điệp trước đó.

Locale và múi giờ sử dụng thứ tự ưu tiên sau: giá trị `claude_web` trong yêu cầu, giá trị kết nối,
giá trị tại thời gian chạy, sau đó là `en-US` cho locale hoặc `UTC` cho múi giờ
(`open-sse/executors/claude-web/session.ts:218`).

### Công cụ và payload yêu cầu

Các yêu cầu trực tiếp chỉ chuyển đổi những công cụ hàm OpenAI hợp lệ về cấu trúc do
bên gọi cung cấp. Không có danh sách công cụ mặc định tĩnh được tạo giả
(`open-sse/executors/claude-web/payload.ts:102`).

Thay vào đó, các yêu cầu qua trình duyệt ghi lại yêu cầu của giao diện người dùng đã xác thực và giữ lại các công cụ tài khoản,
trạng thái công cụ và kiểu cá nhân hóa của yêu cầu đó. Các trường hội thoại, mô hình, suy luận, prompt và
UUID thông điệp đã chuẩn bị vẫn ghi đè yêu cầu được ghi lại
(`open-sse/executors/claude-web/browserTransport.ts:175`). Các mẫu trình duyệt được phân phạm vi bằng một
giá trị băm của tài khoản, tổ chức, cookie, locale và múi giờ, đồng thời hết hạn sau 30 phút
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Khi một yêu cầu trực tiếp không có công cụ từ bên gọi,
yêu cầu đó có thể tái sử dụng mẫu trong phạm vi này; các công cụ được bên gọi cung cấp rõ ràng sẽ được ưu tiên
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Lựa chọn phương thức truyền tải

Luồng mặc định là `sendClaudeWebDirect()`, gọi `tlsFetchClaude()` bằng cấu hình
Chrome 146 đã định cấu hình và cookie được cung cấp (`open-sse/services/claudeTlsClient.ts:23`). Luồng này
không khởi chạy trình giải hoặc tạo một cookie thay thế.

Đặt `WEB_COOKIE_USE_BROWSER` thành `1`, `true` hoặc `on` để dùng adapter trình duyệt theo phạm vi tài khoản làm phương thức truyền tải chính. Đặt `OMNIROUTE_BROWSER_POOL` thành một trong các giá trị tương tự để cho phép một thử thách Cloudflare 403 đã được nhận diện chuyển dự phòng từ phương thức truyền tải trực tiếp sang adapter trình duyệt (`open-sse/executors/claude-web.ts:195`). Các lỗi HTTP khác không kích hoạt cơ chế chuyển dự phòng đó.

Adapter trình duyệt lưu cookie trong cùng ngữ cảnh Playwright dùng chung, sử dụng khóa băm theo phạm vi được mô tả ở trên và gửi kết quả hoàn thành từ ngữ cảnh đó (`open-sse/executors/claude-web/browserTransport.ts:444`). Adapter này không bao giờ xuất cookie do trình duyệt xử lý sang máy khách TLS trực tiếp. Việc thử lại bằng trình duyệt yêu cầu một mẫu giao diện người dùng chưa hết hạn, được liên kết với chính ngữ cảnh Playwright thực tế đó (`open-sse/executors/claude-web/browserTransport.ts:467`). Quá trình đọc phản hồi của trình duyệt diễn ra tăng dần trong trang đã xác thực, tuân thủ việc hủy yêu cầu và hủy nội dung phản hồi phía máy chủ ngay khi vượt quá 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Bộ thực thi trả về một phép chiếu kiểm toán đã biên tập cho trình ghi nhật ký yêu cầu dùng chung: UUID của tổ chức, cuộc hội thoại và tin nhắn, văn bản lời nhắc, định nghĩa công cụ, cookie và mã định danh thiết bị đều bị loại trừ (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Các ngoại lệ truyền tải cũng trả về lỗi kết nối chung thay vì thông báo được ném ra.

### Hành vi SSE

`createClaudeWebResponse()` xử lý định dạng khung LF hoặc CRLF và các trường `data:` nhiều dòng. Hàm này ánh xạ các phần thay đổi văn bản sang `content`, các phần thay đổi suy luận sang `reasoning_content` và các sự kiện siêu dữ liệu đã biết sang phần mở rộng phản hồi `claude_web`. Mỗi sự kiện siêu dữ liệu được chiếu qua danh sách cho phép riêng theo trường của sự kiện đó (`open-sse/executors/claude-web/stream.ts:37`). Siêu dữ liệu về cuộc hội thoại, tin nhắn cha, tin nhắn của trợ lý và thao tác cũng được trả về trong các header `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Trình phân tích dừng an toàn khi gặp JSON không hợp lệ, các sự kiện `error` từ phía máy chủ, loại sự kiện không xác định, thứ tự không hợp lệ, khối nội dung không khớp hoặc EOF trước `message_stop`. Đầu ra dạng luồng phát ra một khối kết thúc và một `[DONE]`; đầu ra có bộ đệm sử dụng cùng trình phân tích. Trình phân tích coi `message_stop` là trạng thái kết thúc ngay lập tức, hủy dữ liệu còn lại từ phía máy chủ và truyền việc hủy từ phía máy khách đến trình đọc phía máy chủ (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Các dòng SSE chưa kết thúc và các sự kiện tích lũy bị giới hạn ở 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Tệp

| Tệp                                                      | Mục đích                                   |
| -------------------------------------------------------- | ------------------------------------------ |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registry mô hình nhà cung cấp tĩnh         |
| `open-sse/executors/claude-web.ts`                       | Điều phối bộ thực thi                      |
| `open-sse/executors/claude-web/payload.ts`               | Chuyển đổi payload và công cụ              |
| `open-sse/executors/claude-web/session.ts`               | Trạng thái lượt và bộ nhớ đệm bản chép     |
| `open-sse/executors/claude-web/transport.ts`             | Adapter truyền tải trực tiếp               |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adapter trình duyệt theo phạm vi tài khoản |
| `open-sse/executors/claude-web/stream.ts`                | Chuyển đổi SSE nghiêm ngặt                 |
| `open-sse/services/claudeTlsClient.ts`                   | Phương thức truyền tải TLS gốc             |
| `open-sse/services/browserPool.ts`                       | Các ngữ cảnh Playwright dùng chung         |

### Kiểm thử

Chạy bộ kiểm thử Claude Web có tính xác định mà không cần thông tin xác thực thật:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Các trường hợp phụ thuộc vào Playwright trong `tests/unit/claude-web-auto-refresh.test.ts` được bỏ qua một cách rõ ràng. Kho lưu trữ này hiện không định nghĩa script kiểm thử trực tiếp Claude Web có sử dụng thông tin xác thực, vì vậy các trường hợp bị bỏ qua đó không phải là bằng chứng về hành vi khi chạy thực tế.

### Thiết lập

1. Khởi động OmniRoute bằng `npm run dev` hoặc từ một bản cài đặt đã được dựng.
2. Mở Dashboard → Providers → Add Provider.
3. Chọn danh mục Web Cookie và Claude Web.
4. Dán toàn bộ header Cookie được sao chép từ một yêu cầu `claude.ai` đã xác thực.
