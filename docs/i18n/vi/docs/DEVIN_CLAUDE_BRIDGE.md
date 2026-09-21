# Devin Claude Bridge (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` cho phép runtime Claude Code thực sử dụng endpoint Anthropic
Messages cục bộ của OmniRoute, trong khi Devin CLI chính thức cung cấp phản hồi mô hình qua ACP stdio. Nó
không sửa đổi các provider Anthropic, Claude OAuth, Claude Web hoặc `devin-cli` hiện có.

> **Trạng thái hiện tại: đã ghim Claude Code `2.1.258`; lần xác thực ngoại tuyến và trực tiếp gần nhất được ghi nhận
> trên `2.1.220`.** Bản ghim `2.1.220` đã hoàn tất ba kịch bản biệt lập thông qua Devin CLI
> `3000.2.17` và mô hình `swe-1-7-lightning`; lần chạy trực tiếp cuối cùng đó đã chứng minh các lượt `Read`,
> `Edit` và `Bash` do client sở hữu, kết quả `npm test` thành công, khả năng khám phá lệnh và skill
> của dự án, định tuyến chỉ qua Devin và không có lưu lượng đi ra Claude. Sau đó, bản ghim được nâng lên `2.1.258`
> (thế hệ CLI mà danh tính Claude của OmniRoute mạo nhận và là dòng đầu tiên tích hợp sẵn
> tầng Fable 5.1). Trên bản ghim mới, lớp cài đặt và `claude --version` đã được
> xác minh trên base image đã ghim, đồng thời bộ kiểm thử đơn vị của bridge, `compose config` và
> bằng chứng cách ly tĩnh đều đạt — nhưng kịch bản mô phỏng ngoại tuyến và bộ ba kịch bản
> trực tiếp vẫn chưa được chạy lại. Hãy chạy lại chúng (xem "Cập nhật các công cụ đã ghim") trước khi dựa vào
> bridge với bản ghim này.

## Kiến trúc

```text
Claude Code 2.1.258 (container Linux không phải root được cách ly)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (provider định dạng Claude, không xác thực)
  -> devin acp --agent-type summarizer (ACP stdio chính thức, không có công cụ Devin)
  -> Tài khoản Devin trong volume devin-auth chuyên dụng
```

Agent ACP mặc định của CLI chính thức có thể thực thi các công cụ riêng, vì vậy bridge này không sử dụng
nó. Bridge khởi động agent ACP `summarizer` cố định, với chế độ CLI chính thức không có công cụ, và
đóng khung yêu cầu Anthropic đã tuần tự hóa như một dấu vết thực thi. Khi cần một
hành động khác do Claude sở hữu, phản hồi phải chứa chính xác một phong bì công cụ client. Mọi
`tool_call` hoặc `tool_call_update` của ACP đều bị từ chối trước khi phản hồi có thể được báo cáo là
thành công.

Bộ tuần tự hóa trong `open-sse/executors/devin-agentic/serializer.ts` giữ nguyên `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` và các
công cụ do Claude Code cung cấp. Hình ảnh và các khối không xác định sẽ thất bại một cách tường minh. Các kết quả công cụ lớn
sử dụng một dấu cắt ngắn hiển thị rõ.

Bộ phân tích cú pháp chấp nhận một phong bì `<tool>{...}</tool>` độc lập cho mỗi lượt của mô hình. Nó kiểm tra
tên dựa trên danh sách công cụ của yêu cầu, xác thực các đối số theo JSON
Schema của công cụ đó, từ chối nội dung tường thuật/hành động hỗn hợp và cho phép một lần sửa chữa có giới hạn. Sau đó, Claude Code
thực thi `tool_use` Anthropic thu được tại máy cục bộ và gửi `tool_result` trở lại thông qua
OmniRoute.

## Mô hình cách ly và mối đe dọa

Bản cài đặt, tài khoản và cấu hình Claude trên máy chủ nằm ngoài phạm vi và được xem là
bị cấm. Các dịch vụ Compose:

- chạy dưới UID/GID `10001:10001`, với hệ thống tệp gốc chỉ đọc, các capability bị loại bỏ và
  `no-new-privileges`;
- sử dụng `/home/bridge` riêng tư, một volume cấu hình Claude chuyên dụng, dữ liệu OmniRoute được cách ly
  và một volume `devin-auth` riêng biệt;
- chỉ gắn kết các workspace/bằng chứng `.sandbox` dùng một lần;
- không gắn kết thư mục home của máy chủ, Keychain, SSH, thông tin xác thực đám mây hoặc socket Docker;
- xây dựng các môi trường tường minh và loại bỏ các biến API/OAuth/định tuyến của Anthropic;
- chỉ hướng suy luận của Claude Code đến `http://omniroute:20128` bằng một khóa chỉ dùng cục bộ.

Profile ngoại tuyến sử dụng mạng nội bộ. Trong profile trực tiếp, OmniRoute chỉ truy cập các
endpoint Devin chính thức thông qua `network-guard`; các đích không liên quan bị từ chối.
Claude Code có một bộ bảo vệ lưu lượng đi ra từ chối tất cả riêng biệt và chỉ có thể truy cập dịch vụ OmniRoute cục bộ
thông qua `NO_PROXY`. Các tệp kiểm toán của bộ bảo vệ chỉ được gắn kết bởi tiến trình bảo vệ tương ứng. Các
script xác minh quyền sở hữu tệp, chế độ, số lượng liên kết và mọi quyết định trước khi xuất
bằng chứng không chứa token.

Chạy độc lập bằng chứng cách ly:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Nó xác thực topology, các mount được đặt tên, thiết lập không phải root/chỉ đọc, định tuyến cục bộ
tường minh, không có các biến môi trường nhạy cảm, không có socket Docker, quyền truy cập bị chặn đến
`api.anthropic.com` và `claude.ai`, lựa chọn provider chỉ qua Devin và lỗi tường minh khi
backend ACP không khả dụng.

## Thiết lập lần đầu và sử dụng thông thường

Xây dựng image đã được ghim phiên bản:

```bash
./scripts/devin-bridge/build
```

Chỉ xác thực volume Devin được cô lập:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Lệnh đăng nhập sử dụng quy trình token thủ công chính thức dành cho môi trường từ xa/container. Giá trị được nhập trực tiếp vào lời nhắc của CLI; giá trị này không được truyền dưới dạng đối số tiến trình, ghi vào Git hoặc sao chép từ máy chủ.

Khởi chạy môi trường runtime Claude Code được cô lập:

```bash
./scripts/devin-bridge/launch
```

`launch` kiểm tra lại tính cô lập, trạng thái xác thực Devin và việc khám phá model trước khi khởi động Claude Code được container hóa. Lệnh này không bao giờ chạy tệp thực thi Claude trên máy chủ. Có thể thiết lập bí danh model trong `.env.devin-bridge`; mọi giá trị được cấu hình phải giữ tiền tố `devin-cli-agentic/`.

## Các lệnh xác thực

Quy trình ngoại tuyến có khả năng tái lập không yêu cầu tài khoản Devin và không cần Internet trong thời gian chạy:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Quy trình trực tiếp có xác thực và yêu cầu chủ động bật là:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Trình chạy trực tiếp sẽ chờ giữa các kịch bản để tránh mở hàng loạt phiên ACP và xác thực các sự kiện luồng Claude có cấu trúc thay vì tin vào các tuyên bố dạng văn bản. Ba kịch bản của trình chạy chứng minh:

1. đọc trực tiếp dự án và phân tích lỗi;
2. một thao tác `Edit` thực sự, một lệnh `Bash` `npm test` do máy khách sở hữu và một kết quả cuối cùng;
3. khám phá `/bridge-check` cùng `bridge-proof`, đọc dự án, thực hiện thêm một lệnh `npm test` do máy khách sở hữu thành công và hoàn tất mà không còn công việc đang chờ xử lý.

Cổng kiểm tra cuối cùng cũng kiểm tra bản ghi kiểm toán mạng Devin và yêu cầu bản ghi kiểm toán lưu lượng đi ra của Claude vẫn trống.

## Cập nhật các công cụ đã ghim phiên bản

Image ghim phiên bản Node, Claude Code và Devin CLI trong `docker/devin-bridge/Dockerfile`. Để cập nhật:

1. thay đổi các phiên bản được chỉ định rõ ràng;
2. thay thế cả hai checksum của kho lưu trữ Devin dành riêng cho từng kiến trúc bằng các giá trị của artifact chính thức;
3. xây dựng lại và chạy mọi lệnh xác thực ngoại tuyến;
4. xác nhận các phiên bản bên trong image;
5. chạy lại bộ ba kịch bản trực tiếp có xác thực.

Không cài đặt toàn cục bất kỳ CLI nào trên máy chủ hoặc thay thế bước xác minh checksum bằng một bản tải xuống chưa được xác minh.

## Chẩn đoán và dọn dẹp

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  hiển thị thông tin định tuyến cục bộ và các lỗi của bộ thực thi đã được làm sạch.
- `.sandbox/evidence/mock-acp.jsonl` ghi lại các hành động ACP giả lập có tính xác định.
- `.sandbox/evidence/claude-stream.jsonl` ghi lại lần chạy ngoại tuyến thực tế của Claude Code.
- `.sandbox/evidence/live-*.jsonl` ghi lại ba luồng trực tiếp đã được xác thực.
- `.sandbox/evidence/egress.jsonl` và `.sandbox/evidence/claude-egress.jsonl` là các bản sao đã được xác thực, không chứa token của nhật ký kiểm toán bảo vệ.

Dừng các container và mạng thuộc sở hữu của bridge trong khi vẫn giữ lại các volume đăng nhập/cấu hình:

```bash
./scripts/devin-bridge/clean
```

Xóa toàn bộ môi trường thuộc sở hữu của bridge, bao gồm các volume được đặt tên:

```bash
./scripts/devin-bridge/clean --all
```

## Giới hạn

- Cầu nối phụ thuộc vào vai trò `summarizer` cố định không dùng công cụ vì Devin CLI `3000.2.17`
  không cung cấp tác nhân ACP trung lập không dùng công cụ. Bộ điều hợp bù trừ cho các phản hồi trung gian
  có dạng bản tóm tắt, nhưng một lần sửa chữa có giới hạn vẫn có thể thất bại một cách rõ ràng.
- Các lệnh gọi ACP trực tiếp có thể trả về phản hồi `502`/`504` tạm thời. Bộ kiểm thử giãn cách các kịch bản;
  lỗi kéo dài vẫn khiến hệ thống đóng khi có lỗi và không bao giờ chọn nhà cung cấp khác.
- Ngữ cảnh ACP được tái tạo từ mỗi yêu cầu Anthropic; không có tính gắn kết
  với tiến trình/phiên.
- Mỗi phản hồi của mô hình hỗ trợ một lệnh gọi công cụ; các lệnh gọi song song sẽ bị từ chối.
- Hình ảnh hoàn toàn không được hỗ trợ. Khả năng thị giác, đầu ra suy luận, các tùy chọn kiểm soát mức độ nỗ lực và cửa sổ ngữ cảnh 1M
  không được công bố.
- SSE sử dụng các sự kiện vòng đời Anthropic hợp lệ nhưng chỉ được phát sau khi lượt ACP có giới hạn
  đã được thu thập; các đoạn ACP không được chuyển tiếp tăng dần.
