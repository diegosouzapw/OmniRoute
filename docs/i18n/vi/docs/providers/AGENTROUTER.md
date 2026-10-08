# AgentRouter Setup Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) là một dịch vụ chuyển tiếp tương thích với Anthropic, cung cấp lại
Claude và các mô hình khác, thường có giá thấp hơn API Anthropic trực tiếp. Dịch vụ này
được thiết kế để thay thế trực tiếp `ANTHROPIC_BASE_URL` cho client Claude Code
chính thức, vì vậy chỉ chấp nhận lưu lượng khớp với đặc trưng giao tiếp của Claude Code
(User-Agent cụ thể, các cờ `anthropic-beta`, header của Stainless SDK, v.v.).

## Bắt đầu nhanh — sử dụng provider `agentrouter` gốc (khuyến nghị)

Đối với hầu hết người dùng, **không cần thiết lập đặc biệt**. OmniRoute tích hợp sẵn
provider `agentrouter` với đầy đủ đặc trưng giao tiếp của Claude Code (xem
`open-sse/config/providerRegistry.ts` → `agentrouter`). Để sử dụng:

1. Mở **Bảng điều khiển → Provider → Thêm provider**.
2. Chọn **AgentRouter** từ danh sách.
3. Dán API key `sk-...` của bạn và lưu lại.

Vậy là xong — không cần biến môi trường, không cần loại provider tùy chỉnh. Các mô hình
tích hợp sẵn bao gồm `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` và
`deepseek-v3.2`.

Phần còn lại của hướng dẫn này trình bày **cách nâng cao**: sử dụng loại provider
`anthropic-compatible-cc-*`. Hãy sử dụng cách này khi bạn cần kiểm soát nhiều hơn
đối với đặc trưng giao tiếp — ví dụ: khi kết nối với các dịch vụ chuyển tiếp kiểu
AgentRouter khác chưa có trong registry provider gốc, hoặc khi ghi đè
URL cơ sở, đường dẫn trò chuyện hay bộ header.

---

## Nâng cao: kết nối thông qua loại provider tương thích với Claude Code

OmniRoute cũng hỗ trợ AgentRouter (và các dịch vụ chuyển tiếp tương tự) thông qua loại
provider **tương thích với Claude Code** (`anthropic-compatible-cc-*`), sử dụng
Anthropic Messages API với đặc trưng giao tiếp chính xác. Một provider
`openai-compatible-chat` thông thường trỏ đến `https://agentrouter.org` sẽ
**không** hoạt động — WAF phía thượng nguồn từ chối các yêu cầu không có đặc điểm
giống Claude Code.

---

## Điều kiện tiên quyết

- Tài khoản và API key AgentRouter. Người đăng ký mới nhận được tín dụng miễn phí thông qua
  liên kết tiếp thị liên kết trong [README](../README.md) của dự án.
- OmniRoute đang chạy với cờ tính năng `ENABLE_CC_COMPATIBLE_PROVIDER` được bật
  (xem bên dưới).

## 1. Bật loại provider tương thích với CC

Loại provider tương thích với Claude Code được kiểm soát bằng một cờ tính năng vì nó
gửi lưu lượng mô phỏng sát client Claude Code chính thức. Bật loại này bằng cách
đặt biến môi trường trước khi khởi động OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Ví dụ với Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Sau khi khởi động lại, bảng điều khiển sẽ hiển thị tùy chọn **Thêm Claude Code Compatible**
bên cạnh các quy trình tương thích với OpenAI và tương thích với Anthropic hiện có.

## 2. Tạo provider trong bảng điều khiển

1. Mở **Bảng điều khiển → Provider → Thêm provider**.
2. Chọn **Thêm Claude Code Compatible** (chỉ hiển thị khi cờ ở trên được đặt).
3. Điền vào các trường:

| Trường         | Giá trị                                                                      |
| -------------- | ---------------------------------------------------------------------------- |
| Tên            | `AgentRouter` (hoặc bất kỳ nhãn nào)                                         |
| Tiền tố        | `agentrouter` (bí danh thân thiện hiển thị trong nhật ký và bảng điều khiển) |
| URL cơ sở      | `https://agentrouter.org`                                                    |
| Đường dẫn chat | `/v1/messages?beta=true` (mặc định — giữ nguyên)                             |

> Mã định danh mô hình chuẩn vẫn sử dụng ID node provider đầy đủ
> (`anthropic-compatible-cc-{uuid}/{model}`). **Tiền tố** chỉ là bí danh hiển thị
> được `src/lib/usage/callLogs.ts` phân giải để tạo đầu ra nhật ký dễ đọc hơn.

4. (Tùy chọn) Dán API key của bạn vào trường **Xác thực** và nhấp vào **Kiểm tra** để
   xác nhận khả năng kết nối trước khi lưu.
5. Nhấp vào **Thêm**.

Sau khi tạo, hãy mở provider và thêm một **Kết nối** bằng API key AgentRouter
(`sk-...`) của bạn. `test_status` của kết nối sẽ chuyển thành `active`.

## 3. Sử dụng thông qua combo hoặc trực tiếp

Tham chiếu mô hình bằng cách sử dụng tiền tố của nhà cung cấp làm namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

ID mô hình chuẩn `anthropic-compatible-cc-{uuid}/claude-opus-4-6` cũng hoạt động
và là ID xuất hiện trong cơ sở dữ liệu cũng như cấu hình combo.

Hoặc thêm mô hình này vào một combo để định tuyến, chuyển sang phương án dự phòng và quản lý hạn ngạch như với bất kỳ
nhà cung cấp nào khác.

---

## Chi tiết wire image

Để tham khảo, cầu nối tương thích cc gửi các thông tin sau trong mỗi yêu cầu đến upstream
(xem `open-sse/services/claudeCodeCompatible.ts`):

| Header                                            | Giá trị                                                                                            |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `Authorization`                                   | `Bearer <api-key>`                                                                                 |
| `User-Agent`                                      | `claude-cli/2.1.258 (external, sdk-cli)`                                                           |
| `anthropic-version`                               | `2023-06-01`                                                                                       |
| `anthropic-beta`                                  | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                           |
| Nút bật/tắt beta redact-thinking cho từng kết nối | Thêm `redact-thinking-2026-02-12` cho các upstream yêu cầu cụ thể luồng suy luận đã được che đi    |
| Nút bật/tắt suy luận tóm tắt cho từng kết nối     | Thêm `display: "summarized"` vào các yêu cầu suy luận CC Compatible chưa thiết lập chế độ hiển thị |
| `anthropic-dangerous-direct-browser-access`       | `true`                                                                                             |
| `x-app`                                           | `cli`                                                                                              |
| `X-Stainless-*`                                   | Các header SDK Stainless khác nhau (ngôn ngữ, phiên bản gói, hệ điều hành, kiến trúc, v.v.)        |

Đây là yếu tố cho phép các yêu cầu vượt qua WAF / danh sách cho phép ứng dụng khách của upstream.

---

## Khắc phục sự cố

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Yêu cầu của bạn
không khớp với wire image của Claude Code. Điều này xảy ra khi nhà cung cấp được cấu hình
là `openai-compatible-chat` thay vì `anthropic-compatible-cc`, hoặc khi cờ
`ENABLE_CC_COMPATIBLE_PROVIDER=true` chưa được thiết lập lúc khởi động.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token không hợp lệ". Wire image là chính xác nhưng API key bị từ chối. Hãy tạo một
key mới trong bảng điều khiển AgentRouter và cập nhật kết nối.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Hook kiểm duyệt của AgentRouter đã từ chối nội dung yêu cầu, hoặc
gói của key không cho phép mô hình được yêu cầu. Hãy thử một prompt hoặc mô hình khác;
liên hệ bộ phận hỗ trợ AgentRouter nếu một prompt vô hại liên tục bị chặn.

**`[400]: content-blocked` chỉ xảy ra trên một số mô hình cụ thể** — Hầu hết các gói AgentRouter chỉ
cho phép một tập hợp con các mô hình (ví dụ: `claude-opus-4-6`). Các ID mô hình khác trả về
`unauthorized_client_error` ngay cả khi key hợp lệ. Hãy kiểm tra các mô hình mà
gói của bạn hỗ trợ trong bảng điều khiển AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` trong nhật ký omniroute** —
Upstream đã trả về nội dung không phải JSON (thường là một trang lỗi HTML từ WAF).
Điều này thường có nghĩa là yêu cầu chưa bao giờ đến được backend AgentRouter — hãy kiểm tra lại rằng
ID nhà cung cấp bắt đầu bằng `anthropic-compatible-cc-` (lưu ý dấu gạch ngang ở cuối —
xem `CLAUDE_CODE_COMPATIBLE_PREFIX` trong `open-sse/services/claudeCodeCompatible.ts`)
và cờ tính năng đã được bật.

**`unauthorized client detected` / trang lỗi HTML ngay cả khi một nhà cung cấp AgentRouter
đã tồn tại** — có thể bạn có **nhiều hơn một** nhà cung cấp AgentRouter
và yêu cầu đang được chuyển đến nhầm nhà cung cấp. Nếu một nhà cung cấp được tạo thủ công còn sót lại
`anthropic-compatible-*` (không phải `cc`) hoặc `openai-compatible-chat-*`
được tạo với tiền tố `agentrouter`, nhà cung cấp đó có thể sở hữu các ID mô hình `agentrouter/<model>`
(và các combo có thể tham chiếu đến nó bằng ID nút), vì vậy lưu lượng được định tuyến đến nhà cung cấp đó —
nơi gửi User-Agent chung và bị từ chối — thay vì nhà cung cấp
`agentrouter` tích hợp sẵn vốn đã cung cấp wire image chính xác. Hãy kiểm tra nơi
mô hình thực sự được phân giải trong nhật ký omniroute (thẻ `ROUTING` hiển thị
`agentrouter/<model> → <providerId>/<model>`); nếu `<providerId>` không phải là
`agentrouter`, hãy hợp nhất về nhà cung cấp gốc: trỏ các combo đến
`agentrouter/<model>` (providerId `agentrouter`) và xóa các nhà cung cấp
tương thích trùng lặp. Nhà cung cấp gốc không cần cấu hình wire image và cũng không cần
`customUserAgent`.

---

## Xem thêm

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Ghi chú tích hợp nhà cung cấp Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Danh mục nhà cung cấp
  có gói miễn phí
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Triển khai truyền hình ảnh
