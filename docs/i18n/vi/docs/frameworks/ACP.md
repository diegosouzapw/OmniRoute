# ACP registry and registered CLI launchers (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute phân tách **khả năng phát hiện CLI**, **Agent Client Protocol gốc** và
**các bộ điều hợp stdio cũ**. Việc tìm thấy một tệp nhị phân đã cài đặt không chứng minh được
khả năng xác thực, tính tương thích với mô hình hoặc mức độ sẵn sàng xử lý lời nhắc của nó.

Bảng điều khiển sử dụng `GET /api/acp/agents` và `POST /api/acp/agents` để quản lý danh mục
và đăng ký tác nhân tùy chỉnh. Đây là các tuyến quản lý chỉ dành cho cục bộ, không phải
API công khai để khởi chạy tiến trình hoặc gửi lời nhắc. `AcpManager` nội bộ
không tự động trở thành phương án dự phòng cho nhà cung cấp HTTP.

## Các hợp đồng đã đăng ký

`config/cli-tools-manifest.json` là nguồn thông tin chuẩn cho các tệp nhị phân khởi chạy,
đối số và chế độ backend tích hợp sẵn. Registry lấy các định nghĩa từ
manifest đó. Kết quả phát hiện được lưu vào bộ nhớ đệm trong 60 giây.

- `acp`: hợp đồng Gemini khởi chạy `gemini --experimental-acp` và giao tiếp bằng
  ACP JSON-RPC phân tách theo dòng thông qua SDK TypeScript chính thức.
- `stdio-adapter`: các hợp đồng đã đăng ký khác tiếp tục sử dụng bộ điều hợp cũ với đầu vào
  theo dòng mới và đầu ra qua stdout. Khoảng thời gian đầu ra không hoạt động trong hai giây
  sẽ kết thúc phản hồi. Bộ điều hợp này **không** chứng nhận rằng các CLI đó hỗ trợ ACP gốc.

Gemini mô tả cờ khởi chạy trong [tài liệu tham khảo CLI](https://geminicli.com/docs/cli/cli-reference/).
Client sử dụng [SDK ACP chính thức](https://github.com/agentclientprotocol/typescript-sdk)
để khởi tạo, tạo phiên, gửi yêu cầu lời nhắc, thông báo và hủy bỏ.

Các định nghĩa tác nhân tùy chỉnh vẫn là những hợp đồng khởi chạy do quản trị viên kiểm soát.
Việc đăng ký một tệp nhị phân và các đối số sẽ cấp cho tiến trình đó các đặc quyền thực thi cục bộ
của người dùng máy chủ; quá trình đăng ký không phải là sandbox. Các phép dò phiên bản
chỉ chấp nhận tệp thực thi đã đăng ký và một cờ phiên bản được nhận dạng.

## API khởi chạy nội bộ

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Chỉ truyền các biến của nhà cung cấp được chủ động gán cho tác nhân này.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Giải thích dự án này", 120_000);
  // Sử dụng phản hồi trong ứng dụng gọi.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` phân giải tệp thực thi và các đối số từ định nghĩa
đã đăng ký. Các tùy chọn duy nhất dành cho bên gọi là `cwd` và `env`; chữ ký cũ
`spawn(agentId, binary, args, env)` và các tùy chọn ghi đè tệp thực thi đều
bị từ chối. Trình quản lý này không hỗ trợ các hợp đồng khởi chạy HTTP.

Tiến trình con kế thừa cùng hệ điều hành, terminal, locale và danh sách cho phép chứng chỉ
như các trình khởi chạy CLI. Các bí mật của máy chủ/nhà cung cấp không được sao chép từ
môi trường của tiến trình cha. Thông tin xác thực mà CLI đã chọn cần phải có phải được truyền
một cách tường minh hoặc được cung cấp thông qua cơ chế xác thực cục bộ riêng của CLI đó.
Tiến trình con vẫn có các quyền truy cập hệ thống tệp của người dùng cục bộ và có thể đọc cấu hình riêng.

## Vòng đời và giới hạn gốc

1. Khởi chạy tệp nhị phân đã đăng ký, khởi tạo ACP và tạo một phiên có thư mục gốc là
   thư mục làm việc đã chọn. Quá trình khởi tạo có giới hạn mười giây.
2. Gửi một lời nhắc và thu thập thông báo văn bản chỉ dành cho phiên đó.
   Việc hoàn tất được xác định bởi phản hồi RPC của lời nhắc, không phải một khoảng thời gian stdout im lặng.
3. Sử dụng một thời hạn duy nhất cho lời nhắc, bao gồm cả mọi quá trình khởi tạo chưa hoàn tất;
   giá trị mặc định là 120 giây. Các lời nhắc đồng thời trong cùng một tiến trình sẽ bị từ chối.
4. Khi xảy ra thời gian chờ gốc, thử `session/cancel` và chấm dứt tiến trình. Một
   khoảng thời gian giới hạn 100 ms cho phép đẩy hết thông báo trước khi chấm dứt.
5. Đóng trạng thái truyền tải và xóa phiên khi quá trình khởi tạo thất bại,
   kết nối đóng, tiến trình thoát hoặc bên gọi kết thúc phiên.

Các yêu cầu quyền sử dụng công cụ bị từ chối. Không có khả năng client hệ thống tệp
hoặc terminal nào được công bố. Các hạn chế này không cô lập tệp nhị phân con trong sandbox
hoặc thay thế các thiết lập ủy quyền riêng của CLI.

Cả văn bản gốc lẫn stdout/stderr cũ đều giữ lại tối đa 1 MiB ký tự,
duy trì phần đầu ra mới nhất cùng thông báo cắt bớt. Mỗi frame truyền tải gốc riêng lẻ
bị giới hạn ở 2 MiB byte trước khi SDK phân tích cú pháp. Các bộ đệm được đặt lại theo từng lời nhắc.

`kill(sessionId)` gửi SIGTERM, sau đó gửi SIGKILL sau năm giây nếu tiến trình
chưa thoát. Thời gian chờ lời nhắc cũ giải phóng listener và bộ hẹn giờ nhưng vẫn để
phiên sẵn sàng cho một lời nhắc khác; bên gọi vẫn chịu trách nhiệm gọi
`kill()` hoặc `killAll()` khi hoàn tất.

## Sự kiện và kiểm tra

Trình quản lý phát ra `stdout`, `stderr` và `exit`, mỗi sự kiện đều có `sessionId`.
`sessionError` báo cáo lỗi truyền tải đã được làm sạch. Sự kiện tương thích `error`
chỉ được phát ra khi có subscriber, vì vậy việc thiếu tệp nhị phân không thể
gây ra lỗi EventEmitter không được xử lý.

- `getSession(sessionId)` trả về một phiên được quản lý hoặc `undefined`.
- `getActiveSessions()` loại trừ các phiên đã dừng hoặc đang dừng.
- `sendInput(sessionId, input)` chỉ khả dụng cho một bộ điều hợp cũ đang hoạt động;
  ACP gốc từ chối đầu vào thô để bảo vệ luồng JSON-RPC của nó.
- `killAll()` chấm dứt mọi phiên được phiên bản trình quản lý đó quản lý.

## Ranh giới xác thực

Các fixture tất định bao phủ quá trình bắt tay gốc, đầu ra văn bản, quyền bị từ chối,
hủy bỏ, lời nhắc đồng thời, khởi tạo thất bại, tiến trình thoát, giới hạn đầu ra
và sự cô lập bí mật. Các trường hợp hồi quy hiện có về bộ đệm/listener cũ
vẫn được bao phủ. Những kiểm thử này không chứng minh khả năng đăng nhập Gemini trực tiếp
hoặc suy luận thành công từ nhà cung cấp; những việc đó yêu cầu một kiểm thử khói
được ủy quyền riêng trong môi trường đích.

## Tài liệu liên quan

- [Các giao thức tác nhân](./AGENT_PROTOCOLS_GUIDE.md)
- [Các hợp đồng khởi chạy CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Các công cụ CLI](../reference/CLI-TOOLS.md)
- [Máy chủ A2A](./A2A-SERVER.md)
- [Các tác nhân đám mây](./CLOUD_AGENT.md)
