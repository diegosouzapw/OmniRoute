# Delegated Context Editing (Anthropic) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Chỉnh sửa ngữ cảnh** được ủy quyền là một tính năng quản lý ngữ cảnh chỉ dành cho Claude. Không giống như các
công cụ nén cục bộ của OmniRoute (Caveman, RTK, LLMLingua, các pipeline xếp chồng) — vốn ghi lại nội dung yêu cầu
_trước khi_ nội dung đó rời khỏi proxy — Chỉnh sửa ngữ cảnh yêu cầu **nhà cung cấp** xóa các khối
sử dụng công cụ / kết quả công cụ đã cũ khỏi cửa sổ ngữ cảnh đang hoạt động của chính họ. OmniRoute chỉ đính kèm một tham số
trong phần thân (`context_management.edits[]`); Claude thực hiện việc xóa thực tế dựa trên tokenizer của chính mình.

Về bản chất, đây là một khả năng được ủy quyền: các nhà cung cấp khác sẽ từ chối tham số này, vì vậy OmniRoute giới hạn
nghiêm ngặt tính năng này cho Claude và các relay tương thích với Claude Code.

Nguồn tham chiếu chính thức: `open-sse/config/contextEditing.ts` (ID chiến lược, chèn nội dung thân, trích xuất
dữ liệu đo từ xa), `open-sse/executors/base.ts` (cổng chèn + cơ chế dự phòng khi gặp lỗi 400), và
`open-sse/services/compression/types.ts` (cấu trúc cấu hình + giá trị mặc định).

## `clear_tool_uses` làm gì

OmniRoute chèn một chỉnh sửa duy nhất vào phần thân Anthropic Messages gửi đi:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — ID chiến lược có ngày của Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — khi số token đầu vào của yêu cầu vượt quá ngưỡng này, Claude bắt đầu
  xóa các cặp sử dụng công cụ/kết quả cũ (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, giá trị mặc định của Anthropic).
- `keep.value: 3` — N cặp sử dụng công cụ/kết quả gần đây nhất được giữ nguyên
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Bản beta được khai báo qua header `anthropic-beta: context-management-2025-06-27`, header mà
OmniRoute đã gửi trong các yêu cầu Claude.

Việc chèn được thực hiện bởi `applyContextEditingToBody()` và có tính **lũy đẳng**: nếu một chỉnh sửa `clear_tool_uses`
đã tồn tại trong phần thân (được thêm bởi một lệnh gọi trước đó hoặc do máy khách cung cấp), phần thân sẽ
được giữ nguyên. Nếu chỉnh sửa `clear_thinking_20251015` cũng xuất hiện, OmniRoute sẽ sắp xếp ổn định để đưa chỉnh sửa
`clear_thinking` lên đầu, vì Anthropic yêu cầu `clear_thinking` phải đứng trước
`clear_tool_uses` trong mảng `edits[]`.

## Công tắc bật theo từng tổ hợp

Chỉnh sửa ngữ cảnh **bị tắt theo mặc định** và cần được chủ động bật. Công tắc là một giá trị boolean duy nhất nằm trong
cấu hình nén:

- Khóa cài đặt: `contextEditing.enabled` (camelCase — **không phải** `context_editing` / `context-editing`).
- Kiểu: `ContextEditingConfig { enabled: boolean }` trong
  `open-sse/services/compression/types.ts`.
- Mặc định: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Schema Zod: `contextEditingConfigSchema` trong `src/shared/validation/compressionConfigSchemas.ts`.
- Lưu trữ: được lưu cùng với các cài đặt nén còn lại (được chuẩn hóa trong
  `src/lib/db/compression.ts`).

Trong bảng điều khiển, công tắc nằm trong trung tâm nén
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) và ghi
`{ contextEditing: { enabled: … } }` trở lại thông qua `saveSettings()`. Vì được chứa trong đối tượng
cài đặt nén, nó kết hợp với cấu hình nén theo từng tổ hợp thay vì là một bề mặt cấu hình
hoàn toàn độc lập — cấu hình chỉ chứa cờ bật/tắt; tất cả các ngưỡng (`trigger`,
`keep`) đều là các hằng số được ghi lại ở trên.

## Giới hạn chỉ dành cho Claude

Việc chèn chỉ diễn ra đối với Claude chính thức hoặc các relay tương thích với Claude Code. Điều kiện kiểm tra trong
`open-sse/executors/base.ts` là:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — khóa Anthropic/OAuth chính thức.
- `isClaudeCodeCompatible(this.provider)` — các relay có ID nhà cung cấp bắt đầu bằng tiền tố
  `anthropic-compatible-cc-` (chúng công bố khả năng tương thích với Claude Code, vì vậy đây là các relay
  có nhiều khả năng chấp nhận beta nhất). Xem `open-sse/services/provider.ts`.

Cố ý **loại trừ**:

- `claude-web` — một relay trình duyệt với cấu trúc yêu cầu `create_conversation_params` không bao giờ nhận
  `context_management`.
- Các relay `anthropic-compatible-*` thông thường (không có tiền tố `-cc-`) — các endpoint bên thứ ba với
  khả năng hỗ trợ beta chưa chắc chắn.

Các nhà cung cấp không phải Claude sẽ không bao giờ nhận tham số `context_management`, ngay cả khi tùy chọn này được bật.

## Cơ chế dự phòng 400 / phạm vi hỗ trợ relay

Một relay tương thích với Claude có thể công bố hỗ trợ beta nhưng vẫn từ chối tham số `context_management`
bằng HTTP 400. Để suy giảm chức năng một cách an toàn thay vì làm yêu cầu thất bại, executor sẽ loại bỏ
tham số này và thử lại cùng một URL **một lần**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Hành vi:

1. Chỉ được kích hoạt khi có lỗi `400`, tính năng chỉnh sửa ngữ cảnh đang được bật và phần thân thực sự chứa
   `context_management`.
2. Phần thân của phản hồi 400 được đọc thông qua `clone()` để phản hồi ban đầu vẫn nguyên vẹn đối với
   nhánh không khớp.
3. Văn bản lỗi phải khớp với `/context[_-]management|context editing/i` — một lỗi 400 không liên quan (ví dụ:
   `max_tokens must be >= 1`) sẽ **không** kích hoạt cơ chế dự phòng; lỗi ban đầu sẽ được truyền tiếp.
4. Khi khớp, hệ thống đặt `contextEditingDisabled = true` (ngăn việc chèn lại nếu một
   `transformedBody` mới được tạo sau đó cho URL thử lại/dự phòng), xóa `context_management`,
   ký lại phần thân cho Claude / các relay tương thích với Claude Code (`signRequestBody`) và thử lại
   cùng một URL một lần.

Claude chính thức mang beta trong `ANTHROPIC_BETA_BASE` và không đi qua nhánh dự phòng này.

## Dữ liệu đo từ xa `applied_edits`

Sau một phản hồi của Claude, OmniRoute ghi lại lượng ngữ cảnh mà nhà cung cấp thực sự đã xóa. Dữ liệu này
**không** được truyền trực tuyến — nó được trích xuất từ phần thân phản hồi không truyền trực tuyến theo cơ chế nỗ lực tối đa và không bao giờ
ảnh hưởng đến phản hồi (các lỗi đo từ xa đều bị bỏ qua).

- Trích xuất: `extractContextEditingTelemetry(responseBody)` trong `open-sse/config/contextEditing.ts`.
  Hàm này dò tìm `applied_edits` tại ba vị trí (để phòng vệ trước các cấu trúc phản hồi khác nhau):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Các trường của từng chỉnh sửa được đọc từ mỗi mục: `cleared_input_tokens` và `cleared_tool_uses`
  (snake_case, định dạng gốc của Anthropic), với các phương án dự phòng camelCase là `clearedInputTokens` / `clearedToolUses`.
- Trả về `null` khi không tìm thấy mảng `applied_edits` hoặc không có nội dung nào thực sự được xóa.

Cấu trúc biên nhận là `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Việc ghi nhận diễn ra trong `open-sse/handlers/chatCore.ts` (chỉ áp dụng khi `provider === "claude"`) thông qua
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), hàm này ghi một hàng phân tích nén
được gắn nhãn:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = số lượng token đầu vào đã được xóa
- `request_id` có hậu tố `::context-editing`

Nhờ đó, hoạt động xóa được ủy quyền xuất hiện trong phần phân tích nén cùng với các engine cục bộ, dưới nhãn engine
`context-editing`, và có thể phân biệt với mức tiết kiệm của RTK/Caveman/LLMLingua.

## Mối quan hệ với các công cụ nén cục bộ

| Khía cạnh                | Công cụ cục bộ (Caveman / RTK / LLMLingua / stacked) | Chỉnh sửa ngữ cảnh được ủy quyền                           |
| ------------------------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| Nơi chạy                 | Trong OmniRoute, trước khi yêu cầu rời khỏi proxy    | Trong nhà cung cấp (Claude), phía máy chủ                  |
| Nội dung được chỉnh sửa  | Văn bản prompt / ngữ cảnh / kết quả công cụ          | Các khối sử dụng công cụ / kết quả công cụ cũ              |
| Phạm vi nhà cung cấp     | Tất cả nhà cung cấp                                  | Chỉ `claude` + `anthropic-compatible-cc-*`                 |
| Chuyển đổi               | Cài đặt chế độ nén                                   | `contextEditing.enabled`                                   |
| Chế độ khi lỗi           | Cho phép tiếp tục khi lỗi (văn bản gốc)              | Dự phòng khi gặp lỗi 400: loại bỏ tham số, thử lại một lần |
| Dữ liệu đo mức tiết kiệm | `engine: <engine id>`                                | `engine: "context-editing"`                                |

Hai cơ chế này bổ trợ cho nhau: các công cụ cục bộ nén số byte mà OmniRoute gửi đi; Chỉnh sửa ngữ cảnh cho phép
Claude lược bỏ ngữ cảnh đang tích lũy qua các lượt. Có thể bật cả hai cùng lúc.

## Xem thêm

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — danh mục công cụ và các công cụ nén
  cục bộ
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — nén đầu ra của lệnh/công cụ
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — nén mô tả MCP và
  giảm số lượng công cụ
- Nguồn: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
