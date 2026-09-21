# AgentBridge (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge là proxy MITM (Man-in-the-Middle — trung gian) của OmniRoute, chặn lưu lượng HTTPS từ các tác nhân AI trong IDE và định tuyến lại lưu lượng đó thông qua công cụ định tuyến hợp nhất của OmniRoute. Công cụ này hỗ trợ **10 tác nhân IDE** — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code và Trae (đang được nghiên cứu) — giúp OmniRoute trở thành proxy MITM có phạm vi hỗ trợ rộng nhất dành cho các trợ lý lập trình AI trên thị trường.

**Vị trí trên bảng điều khiển:** `/dashboard/tools/agent-bridge`
**Nhóm trên thanh bên:** Công cụ (sau Cloud Agents)
**Xem thêm:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — giám sát toàn bộ lưu lượng bị chặn theo thời gian thực; `docs/security/MITM-TPROXY-DECRYPT.md` (git; không được biên dịch vào `/docs`) — chế độ thu thập giải mã trong suốt TPROXY trên Linux, được điều khiển bởi tuyến `/api/tools/agent-bridge/tproxy`.

---

## §1 Tổng quan

### AgentBridge là gì?

Khi một tác nhân IDE (ví dụ: GitHub Copilot, Cursor, Claude Code) thực hiện lệnh gọi API, tác nhân đó sẽ kết nối trực tiếp với nhà cung cấp AI thượng nguồn (OpenAI, Anthropic, v.v.). AgentBridge chặn kết nối này một cách trong suốt ở lớp TLS — mà không yêu cầu bất kỳ thay đổi cấu hình nào đối với tác nhân — và ghi lại yêu cầu để chuyển qua OmniRoute.

Điều này cho phép bạn:

- **Định tuyến lại bất kỳ tác nhân nào đến bất kỳ nhà cung cấp nào**: Copilot đang giao tiếp với OpenAI? Hãy chuyển hướng tác nhân đó đến Anthropic Claude, Gemini hoặc bất kỳ nhà cung cấp nào trong số 352 nhà cung cấp của OmniRoute.
- **Áp dụng ánh xạ mô hình**: `gemini-3-flash` → `claude-sonnet-4.7` một cách trong suốt ở cấp trình xử lý.
- **Quan sát toàn bộ lưu lượng của tác nhân**: mọi yêu cầu bị chặn đều được gửi đến [Trình kiểm tra lưu lượng](./TRAFFIC_INSPECTOR.md).
- **Áp dụng khả năng phục hồi của OmniRoute**: định tuyến kết hợp, bộ ngắt mạch, phương án dự phòng và theo dõi chi phí cũng hoạt động với lưu lượng của tác nhân IDE.

### Vị thế so với thị trường

| Tính năng                 | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| ------------------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity               |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot            |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)                |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex              |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE                |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries            |    —    |    ✓     |        —        |             ✓             |
| Claude Code               |    —    |    —     |        ✓        |             ✓             |
| Open Code                 |    —    |    —     |        ✓        |             ✓             |
| Trae                      |    —    |    —     |        —        |    🔍 Đang nghiên cứu     |
| Giao diện bảng điều khiển |    ✓    |    ✗     |        ✗        |             ✓             |
| Trình kiểm tra lưu lượng  |    ✗    |    ✗     |        ✓        |             ✓             |
| Định tuyến OmniRoute      |    ✗    |    ✗     |        ✗        |             ✓             |
| Giao diện ánh xạ mô hình  |    ✗    |    ✗     |        ✗        |             ✓             |
| Danh sách bỏ qua          |    ✗    |    ✗     |        ✓        |             ✓             |
| Chứng chỉ CA thượng nguồn |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Kiến trúc

### 2.1 Tổng quan về các thành phần

```
Tác nhân IDE (VS Code / Cursor / v.v.)
    │  HTTPS (cổng 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← chuyển hướng DNS
    │
    ▼
src/mitm/server.cjs  (cổng 443, tiến trình con CJS)
    │  phân giải đích theo SNI trong tiêu đề Host
    │  tạo chứng chỉ TLS riêng cho từng SNI, được ký bởi CA của AgentBridge
    ├── Khớp danh sách bỏ qua? → chuyển tiếp TCP (không giải mã)
    ├── Khớp đích? → fetch → bộ định tuyến OmniRoute (cổng 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() trên nội dung yêu cầu/tiêu đề
    │               ├── TrafficBuffer.push() — xuất bản lên Trình kiểm tra lưu lượng
    │               └── fetchRouter() → /v1/chat/completions
    └── Không khớp? → chuyển tiếp TCP (không giải mã)
```

### 2.2 Máy chủ MITM (`src/mitm/server.cjs`)

Máy chủ MITM cốt lõi chạy dưới dạng tiến trình con Node.js CJS (để tránh phải viết lại cơ sở mã CJS hiện có). Máy chủ này:

- Lắng nghe trên cổng 443 (yêu cầu đặc quyền hoặc `authbind`/`setcap`)
- Nhận các đường hầm CONNECT từ hệ điều hành (thông qua chuyển hướng DNS trong `/etc/hosts`)
- Tạo chứng chỉ TLS riêng cho từng SNI, được ký bởi CA của AgentBridge (`DATA_DIR/mitm/ca.crt`)
- Phân giải tác nhân đích theo tiêu đề Host thông qua sổ đăng ký `targets/index.ts`
- Điều phối đến lớp trình xử lý TypeScript qua HTTP tại `http://127.0.0.1:20128`

`TARGET_HOSTS` được tải từ `DATA_DIR/mitm/targets.json` (do `targets/index.ts` ghi khi khởi động), cho phép cập nhật động mà không cần khởi động lại máy chủ CJS.

> **Mô hình CA gốc (#6684).** Mô tả ở trên về chứng chỉ riêng cho từng SNI được ký bởi một CA
> là mô hình CA gốc được lưu bền vững, bổ sung trong #6684 (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, tái sử dụng cơ chế mật mã CA/chứng chỉ lá đã
> được kiểm chứng cho TPROXY trong `src/mitm/tproxy/dynamicCert.ts`) — mô hình này thay thế
> chứng chỉ lá tự ký tĩnh duy nhất trước đây (`src/mitm/cert/generate.ts`, vẫn
> chỉ giới hạn cho các máy chủ antigravity) vốn được biểu thị bằng một cặp
> `server.crt`/`server.key` đơn thuần trên đĩa. **Hành vi di chuyển**: bản cài đặt mới (không có
> `server.crt` trước đó) tự động sử dụng mô hình CA gốc; bản cài đặt đã
> tin cậy chứng chỉ lá tĩnh cũ sẽ tiếp tục sử dụng chứng chỉ đó cho đến khi người vận hành đặt
> `MITM_ROOT_CA_ENABLED=true` và khởi động lại bridge (`src/mitm/cert/migration.ts`
> là hàm quyết định thuần túy — một CA MITM đáng tin cậy có thể ký chứng chỉ lá cho
> **bất kỳ** máy chủ nào có quyền lực lớn hơn đáng kể so với chứng chỉ lá SAN cố định cũ, vì vậy
> quá trình chuyển đổi sẽ không bao giờ diễn ra âm thầm đối với một bản cài đặt đã được tin cậy). Chứng chỉ CA được cài đặt
> vào cùng vị trí `omniroute-mitm.crt` trong kho tin cậy mà chứng chỉ lá cũ đã sử dụng
> (`cert/install.ts::installCaCert`) — không cần dọn dẹp cơ chế tin cậy kép.

### 2.3 Lớp cơ sở của trình xử lý (`src/mitm/handlers/base.ts`)

Tất cả trình xử lý tác nhân đều mở rộng `MitmHandlerBase`:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Các phương thức hỗ trợ được bảo vệ: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Mỗi trình xử lý gọi `hookBufferStart()` trước khi ủy quyền và gọi `hookBufferUpdate()` khi hoàn tất. Các lệnh này đẩy những mục `InterceptedRequest` vào `globalTrafficBuffer` (xem [Trình kiểm tra lưu lượng](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Sổ đăng ký đích (`src/mitm/targets/`)

Mỗi tác nhân có một tệp đích khai báo:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

Sổ đăng ký (`targets/index.ts`) xuất `ALL_TARGETS` và tạo `DATA_DIR/mitm/targets.json` khi khởi động.

### 2.5 Chuyển tiếp và danh sách bỏ qua (`src/mitm/passthrough.ts`)

**Danh sách bỏ qua** (được kiểm tra đầu tiên, có độ ưu tiên cao hơn việc khớp đích):

- Các mẫu mặc định: máy chủ ngân hàng, `.gov.`, nhà cung cấp OAuth/SSO (Okta, Auth0), v.v.
- Các mẫu của người dùng: được lưu trong bảng cơ sở dữ liệu `agent_bridge_bypass`
- Các máy chủ được bỏ qua sẽ nhận một đường hầm TCP trong suốt — TLS **không bao giờ được giải mã**

**Chuyển tiếp mặc định** (không khớp đích và không nằm trong danh sách bỏ qua):

- Cũng nhận một đường hầm TCP — các kết nối không bao giờ bị gián đoạn
- Ngăn AgentBridge làm gián đoạn lưu lượng HTTPS chung của hệ thống

Thứ tự ưu tiên định tuyến:

```
danh sách bỏ qua → khớp đích → chuyển tiếp
```

### 2.6 Chứng chỉ CA thượng nguồn (`src/mitm/upstreamTrust.ts`)

Đối với môi trường mạng doanh nghiệp có CA tùy chỉnh:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Khi được đặt, biến này cấu hình bộ điều phối toàn cục của `undici` với chứng chỉ CA bổ sung, cho phép AgentBridge kết nối đến các nhà cung cấp thượng nguồn thông qua proxy chấm dứt TLS của doanh nghiệp.

### 2.7 Che giấu bí mật (`src/mitm/maskSecrets.ts`)

Trình quét clean-room độc lập được áp dụng cho nội dung yêu cầu và các tiêu đề chứa thông tin xác thực
**trước khi** chúng đi vào bộ đệm của Trình kiểm tra lưu lượng hoặc bất kỳ nhật ký nào. Trình quét thực hiện một lượt quét tuyến tính duy nhất:

- Các token có tiền tố `sk-` / `ak-` / `pk-` (theo kiểu OpenAI/Anthropic)
- Thông tin xác thực RFC 6750 `Authorization: Bearer <token>`, với toàn bộ token được ưu tiên
- Các token bất định dạng dài phổ biến (≥40 ký tự), bao gồm cả dạng có dấu chấm và phần đệm

`sanitizeHeaders()` chuyển tên được giữ lại thành chữ thường, nối các giá trị mảng theo cách xác định, loại bỏ
danh sách chặn dùng chung cho các tiêu đề từng chặng/định khung (bao gồm xác thực proxy), che hoàn toàn `cookie` và
`set-cookie`, đồng thời giao các giá trị thông tin xác thực cho trình quét.

---

## §3 Thiết lập

### 3.1 Khởi động/dừng máy chủ MITM

Sử dụng thẻ AgentBridge Server tại `/dashboard/tools/agent-bridge`:

| Hành động             | Mô tả                                                                           |
| --------------------- | ------------------------------------------------------------------------------- |
| Khởi động máy chủ     | Khởi chạy `src/mitm/server.cjs` trên cổng 443                                   |
| Dừng máy chủ          | Tắt tiến trình con một cách an toàn                                             |
| Khởi động lại máy chủ | Dừng + khởi động (áp dụng các thay đổi về đích)                                 |
| Tin cậy chứng chỉ     | Cài đặt `DATA_DIR/mitm/ca.crt` vào kho tin cậy của hệ điều hành                 |
| Tải xuống chứng chỉ   | Tải xuống `ca.crt` để cài đặt thủ công                                          |
| Tạo lại chứng chỉ     | Tạo cặp khóa CA mới (tất cả chứng chỉ hiện có của từng agent sẽ bị vô hiệu hóa) |

### 3.2 Tin cậy chứng chỉ

Chứng chỉ CA của AgentBridge phải được hệ điều hành tin cậy trước khi các IDE chấp nhận kết nối MITM.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Keychain):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Hoặc sử dụng nút "Tin cậy chứng chỉ" trên bảng điều khiển (nút này chạy lệnh phù hợp với hệ điều hành của bạn và hiển thị lời nhắc sudo nếu cần).

#### Các IDE dựa trên Electron bỏ qua kho tin cậy của hệ điều hành (`NODE_EXTRA_CA_CERTS`)

Một số IDE — đáng chú ý là **Antigravity IDE** và các ứng dụng khác bắt nguồn từ Electron / VS Code — đóng gói
môi trường chạy Node.js riêng, vốn **không tham chiếu kho tin cậy của hệ điều hành** cho các yêu cầu
`fetch`/HTTPS gửi đi. Việc tin cậy CA ở cấp hệ điều hành/NSS là đủ cho **backend** gốc của IDE
(ví dụ: máy chủ ngôn ngữ Go sử dụng gói CA của hệ điều hành), nhưng **frontend Electron** vẫn
không thể thiết lập TLS — biểu hiện là ứng dụng ở trạng thái _đã đăng xuất_ hoặc hiển thị _"lỗi kết nối"_
mặc dù nhật ký MITM cho thấy các lệnh gọi khởi tạo của backend trả về `200`. Cần thực hiện hai bước,
và cả hai đều quan trọng:

1. Trỏ môi trường chạy đến CA một cách rõ ràng:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Khởi chạy IDE từ shell đó.** Việc khởi động từ biểu tượng trên màn hình nền / Dock / menu Start
   **không** kế thừa các biến được xuất trong shell, còn `~/.config/environment.d/*.conf` chỉ được áp dụng sau
   một lần đăng nhập đồ họa mới. Trước tiên, hãy thoát hoàn toàn khỏi IDE — khóa singleton của Electron khiến lần
   khởi chạy thứ hai chỉ đưa tiến trình hiện có lên phía trước và môi trường mới bị bỏ qua.

Bước thiết lập tin cậy ở cấp hệ điều hành + NSS nêu trên vẫn cần thiết (ngăn xếp mạng Chromium được một số luồng xác thực
sử dụng sẽ đọc kho NSS của từng người dùng và có các pin tĩnh riêng cho `*.googleapis.com` mà một
CA được tin cậy cục bộ có thể ghi đè). `NODE_EXTRA_CA_CERTS` bổ sung phạm vi cho đường dẫn `fetch` của Node.

### 3.3 Định tuyến DNS

Đối với mỗi agent mà bạn muốn chặn bắt, (các) máy chủ API của agent đó phải phân giải thành `127.0.0.1`. AgentBridge tự động quản lý các mục nhập `/etc/hosts` khi bạn bật/tắt DNS cho một agent trong Trình hướng dẫn thiết lập.

Ví dụ về các mục nhập `/etc/hosts` cho GitHub Copilot:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Ánh xạ mô hình

Sử dụng Bảng ánh xạ mô hình trong mỗi thẻ agent để xác định các ánh xạ nguồn → đích:

| Mô hình nguồn (gốc của agent) | Mô hình đích (OmniRoute) |
| ----------------------------- | ------------------------ |
| `gpt-4o`                      | `claude-sonnet-4.7`      |
| `*` (ký tự đại diện)          | `claude-haiku-4.7`       |

Ký tự đại diện `*` ánh xạ bất kỳ mô hình không được nhận dạng nào tới đích đã chỉ định. Dữ liệu được lưu bền vững trong bảng `agent_bridge_mappings`.

> **Mẹo — khám phá ID mô hình thực tế của agent.** Một IDE có thể gửi các tên mô hình khác với
> nhãn giao diện người dùng và các tên này có thể thay đổi giữa các phiên bản lớn. Ví dụ: **Antigravity 2** gửi
> `gemini-3.1-pro-low`, `gemini-pro-agent` và `gemini-3.1-flash-lite` qua đường truyền — không phải
> `gemini-2.5-pro` được hiển thị trong các tài liệu cũ. Hãy gửi một cuộc trò chuyện khi chưa có ánh xạ phù hợp: MITM
> sẽ ghi nhật ký chính xác giá trị `model:` nhận được và chuyển tiếp yêu cầu. Ánh xạ giá trị nguyên văn đó, sau đó
> yêu cầu tiếp theo sẽ được chặn bắt và định tuyến đến đích của bạn.

### 3.5 Thông báo rủi ro

AgentBridge chặn bắt thông tin xác thực (token OAuth, khóa API) mà IDE sử dụng để xác thực với các nhà cung cấp thượng nguồn. Các thông tin này được **che trước khi ghi nhật ký** (xem §2.7) nhưng vẫn hiển thị với lớp MITM của OmniRoute. Lần kích hoạt đầu tiên của mỗi agent sẽ hiển thị một hộp thoại thông báo rủi ro có thể đóng.

### 3.6 Bảo trì & Chẩn đoán

Bảng điều khiển cung cấp một thẻ **Bảo trì & Chẩn đoán** (`AgentBridgeMaintenanceCard`, trong `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`) để hiển thị các tuyến MITM vận hành mà trước đây không có giao diện người dùng. Phụ đề của thẻ: _"Tự kiểm tra quy trình chặn bắt, hoàn tác trạng thái hệ thống còn sót lại và di chuyển cấu hình của bạn giữa các máy."_ Các trình trợ giúp phía client của thẻ nằm trong `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Nút               | Route                                  | Chức năng                                                                                                                                                                                        |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Chẩn đoán**     | `GET /api/tools/agent-bridge/diagnose` | Chạy quy trình tự kiểm tra của pipeline thu thập và hiển thị báo cáo cho từng mục kiểm tra (✓/✗ + gợi ý khắc phục).                                                                              |
| **Sửa chữa**      | `POST /api/tools/agent-bridge/repair`  | Hoàn tác trạng thái hệ thống MITM mồ côi (các mục giả mạo DNS, CA gốc, proxy hệ thống) còn sót lại do sự cố hoặc SIGKILL. Có tính lũy đẳng — báo "Không có gì cần sửa chữa" khi trạng thái sạch. |
| **Xóa CA**        | `DELETE /api/tools/agent-bridge/cert`  | Hủy tin cậy và xóa CA gốc MITM khỏi kho tin cậy của HĐH (tường minh, có tính lũy đẳng). Chỉ hiển thị khi CA hiện đang được tin cậy; yêu cầu xác nhận nội tuyến "Xóa CA?".                        |
| **Xuất cấu hình** | `GET /api/tools/agent-bridge/config`   | Tải xuống JSON cấu hình có thể di chuyển (xem §3.7).                                                                                                                                             |
| **Nhập cấu hình** | `POST /api/tools/agent-bridge/config`  | Tải lên JSON cấu hình đã xuất trước đó (xem §3.7).                                                                                                                                               |

**Các mục kiểm tra chẩn đoán** (`summarizeDiagnostics()` trong `src/mitm/inspector/diagnostics.ts`). Route chạy phép thăm dò có hiệu ứng cho từng mục rồi truyền các giá trị boolean vào bộ tổng hợp thuần túy; kết quả trả về gồm một kết luận `healthy` duy nhất cùng gợi ý cho từng lỗi:

| Tên mục kiểm tra   | Nội dung xác minh                                             | Gợi ý khi thất bại                                                                                                                                           |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `server-running`   | Tiến trình máy chủ MITM đang hoạt động                        | "Máy chủ MITM không chạy. Hãy khởi động máy chủ từ tab AgentBridge."                                                                                         |
| `server-reachable` | Máy chủ MITM chấp nhận kết nối trên cổng của nó (thăm dò TCP) | "Máy chủ MITM không chấp nhận kết nối trên cổng của nó. Hãy kiểm tra xem cổng có đang trống hay không và bạn có quyền liên kết với cổng đó hay không."       |
| `cert-exists`      | Chứng chỉ MITM đã được tạo trên đĩa                           | "Chưa có chứng chỉ MITM nào được tạo. Hãy tạo chứng chỉ từ tab AgentBridge."                                                                                 |
| `cert-trusted`     | CA gốc MITM nằm trong kho tin cậy của HĐH                     | "CA gốc MITM không được kho tin cậy của HĐH tin cậy, vì vậy việc chặn bắt TLS sẽ thất bại. Hãy tin cậy chứng chỉ từ tab AgentBridge."                        |
| `dns-configured`   | Các tên máy chủ đích được giả mạo trong `/etc/hosts`          | "Các tên máy chủ đích không được giả mạo trong /etc/hosts, vì vậy lưu lượng không bao giờ đến được proxy. Hãy bật DNS cho (các) agent mà bạn muốn thu thập." |

**Biểu ngữ trạng thái mồ côi:** khi trang phát hiện trạng thái còn sót lại do sự cố (giả mạo DNS / CA / proxy hệ thống), thẻ sẽ hiển thị một biểu ngữ màu hổ phách — _"Một phiên trước đó đã để lại trạng thái hệ thống (giả mạo DNS, CA hoặc proxy hệ thống). Hãy chạy Sửa chữa để dọn dẹp."_ — và làm nổi bật nút **Sửa chữa**. `Repair` là thành phần tương đương ở tầng ứng dụng với cờ `--cleanup` của ProxyBridge (nó ủy quyền cho `repairMitm()` trong `src/mitm/manager.ts`).

> CA gốc MITM được giữ nguyên trạng thái cài đặt qua các lần dừng/khởi động để tránh
> phải nhập sudo nhiều lần (cùng hành vi như mitmproxy/Charles), vì vậy việc xóa CA là
> một hành động **Xóa CA** tường minh thay vì tự động diễn ra khi dừng.

### 3.7 Nhập/xuất cấu hình có thể di chuyển

AgentBridge có thể tuần tự hóa trạng thái **mà người vận hành có thể điều chỉnh** thành một blob JSON có phiên bản để có thể sao chép thiết lập giữa các máy. Bộ tuần tự hóa là `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), được xác thực bởi `AgentBridgeConfigSchema`.

Dữ liệu xuất bao gồm chính xác ba phần (các giá trị mặc định tích hợp sẵn cố ý **KHÔNG** được xuất, vì vậy thao tác nhập không bao giờ sao chép trùng hoặc xung đột với chúng):

| Trường           | Nguồn                                                                  | Ghi chú                                                       |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| `bypassPatterns` | các mẫu bỏ qua do người dùng định nghĩa (`agent_bridge_bypass`)        | các mẫu bank/gov/okta mặc định bị loại trừ                    |
| `customHosts`    | các máy chủ tùy chỉnh của Traffic Inspector (`inspector_custom_hosts`) | mỗi mục: `{ host, kind: "llm"\|"app"\|"custom", label? }`     |
| `agentMappings`  | ánh xạ mô hình theo từng agent (`agent_bridge_mappings`)               | `{ [agentId]: [{ source, target }] }` cho mọi agent có ánh xạ |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Hành vi nhập** (`POST /api/tools/agent-bridge/config`): các mẫu bỏ qua và ánh xạ theo từng agent được **thay thế toàn bộ**; các máy chủ tùy chỉnh được thêm theo cách **lũy đẳng** (`INSERT OR IGNORE`). Phản hồi cho biết số lượng mục của từng loại đã được áp dụng:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

Những gì **KHÔNG** có trong cấu hình: trạng thái chạy của máy chủ, đường dẫn chứng chỉ, trạng thái DNS của từng agent, đường dẫn CA thượng nguồn và các cài đặt TPROXY — đó là trạng thái máy chủ/môi trường chạy, không phải các tùy chọn có thể di chuyển.

---

## §4 Tham chiếu theo từng tác nhân

| #   | Tác nhân           | Trạng thái       | Máy chủ bị chặn bắt                                                | Loại xác thực  |
| --- | ------------------ | ---------------- | ------------------------------------------------------------------ | -------------- |
| 1   | **Antigravity**    | ✅ Được hỗ trợ   | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth |
| 2   | **Kiro (AWS)**     | ✅ Được hỗ trợ   | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4      |
| 3   | **GitHub Copilot** | ✅ Được hỗ trợ   | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth   |
| 4   | **OpenAI Codex**   | ✅ Được hỗ trợ   | `api.openai.com` (các đường dẫn Codex), `chatgpt.com`              | Khóa OpenAI    |
| 5   | **Cursor IDE**     | ✅ Được hỗ trợ   | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth   |
| 6   | **Zed Industries** | ✅ Được hỗ trợ   | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth      |
| 7   | **Claude Code**    | ✅ Được hỗ trợ   | `api.anthropic.com` (tùy chọn bật)                                 | Khóa Anthropic |
| 8   | **Open Code**      | ✅ Được hỗ trợ   | `openrouter.ai`, `api.openai.com` (các đường dẫn zen)              | Khóa API       |
| 9   | **Trae**           | 🔍 Đang điều tra | Chưa xác định — xem §8                                             | Chưa xác định  |

### Các bước của trình hướng dẫn thiết lập (theo từng tác nhân)

Mỗi thẻ tác nhân có một trình hướng dẫn thiết lập gồm 3 bước:

1. **Xác minh điều kiện tiên quyết** — Máy chủ đang chạy? Chứng chỉ đã được tin cậy? IDE đã được cài đặt (tự động phát hiện)?
2. **Bật DNS** — Thêm các mục vào `/etc/hosts` (yêu cầu sudo). Hiển thị chính xác những dòng sẽ được thêm.
3. **Ánh xạ mô hình** — Bảng ánh xạ mô hình tùy chọn. Chấp nhận ký tự đại diện.

### Phát hiện tác nhân

Đối với các tác nhân 1–8, AgentBridge cố gắng tự động phát hiện IDE đã được cài đặt:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Trả về: { installed: boolean, version?: string, path?: string }
```

Quá trình phát hiện sử dụng các đường dẫn và phép kiểm tra tệp nhị phân dành riêng cho từng hệ điều hành (ví dụ: `code --list-extensions | grep github.copilot` cho Copilot, `~/.config/antigravity/` cho Antigravity).

---

## §5 Bảo mật

### Các quy tắc nghiêm ngặt được áp dụng

| Quy tắc                                  | Cách áp dụng                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`           | Mọi lỗi của trình xử lý đều được làm sạch trước khi phản hồi hoặc ghi vào bộ đệm                     |
| **#13** Truyền biến môi trường cho shell | Các chỉnh sửa `/etc/hosts` sử dụng tùy chọn `env` — không nội suy chuỗi cho đường dẫn                |
| **#15 + #17** `isLocalOnlyPath()`        | `/api/tools/agent-bridge/` là LOCAL_ONLY + SPAWN_CAPABLE — bắt buộc dùng loopback trước khi xác thực |

### Danh sách bỏ qua dành cho các máy chủ nhạy cảm

Danh sách bỏ qua đảm bảo rằng các tổ chức tài chính, nhà cung cấp OAuth/SSO và các máy chủ nhạy cảm khác **không bao giờ bị giải mã**. Lưu lượng TLS của chúng đi qua dưới dạng đường hầm TCP trong suốt — OmniRoute không bao giờ nhìn thấy dữ liệu văn bản thuần.

Các mẫu bỏ qua mặc định bao gồm:

- `*.bank.*`, `*.gov.*` (tài chính/chính phủ)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/danh tính)
- `*.apple.com`, `*.icloud.com` (các dịch vụ hệ thống của Apple)

Các mẫu bỏ qua do người dùng thêm được lưu trong bảng `agent_bridge_bypass` và được ưu tiên hơn mọi thứ khác.

### Che giấu bí mật

`maskSecrets()` từ `src/mitm/maskSecrets.ts` được áp dụng:

- Trên mọi nội dung yêu cầu trước `TrafficBuffer.push()`
- Trên mọi header trước khi ghi nhật ký hoặc phát sóng

Các mẫu: token có tiền tố `sk-`/`ak-`/`pk-`, token `Bearer` và token thông thường dài ≥40 ký tự.

### Chứng chỉ CA thượng nguồn

Khi `AGENTBRIDGE_UPSTREAM_CA_CERT` được đặt, tệp sẽ được đọc lúc khởi động. Nếu đường dẫn tồn tại nhưng không thể đọc tệp, AgentBridge sẽ ghi một lỗi rõ ràng vào nhật ký và từ chối khởi động (ngăn ngừa lỗi TLS âm thầm trong môi trường doanh nghiệp).

### Các hạn chế đã biết

- **Cổng 443 yêu cầu đặc quyền**: Trên Linux, AgentBridge cần `setcap 'cap_net_bind_service=+ep'` trên tệp nhị phân Node hoặc phải chạy qua `authbind`. Trình hướng dẫn thiết lập hiển thị các hướng dẫn dành riêng cho từng hệ điều hành.
- **Cần khởi động lại IDE**: Sau khi chuyển hướng DNS, IDE phải được khởi động lại để phân giải máy chủ mới có hiệu lực.
- **Token OAuth được mã hóa cứng**: Một số tác nhân (Kiro, Antigravity) lưu token làm mới OAuth cục bộ. Những token này trong suốt đối với AgentBridge — nó nhìn thấy token Bearer trong mỗi yêu cầu và token đó được che giấu trước khi ghi nhật ký.
- **Frontend Electron cần `NODE_EXTRA_CA_CERTS`**: Các IDE có frontend chạy trên runtime Node/Electron đi kèm sẽ bỏ qua kho tin cậy của hệ điều hành/NSS và phải được khởi chạy từ shell có đặt `NODE_EXTRA_CA_CERTS` (xem §3.2). Triệu chứng khi thiếu: backend của IDE xác thực thành công (MITM hiển thị các phản hồi `200`) nhưng giao diện người dùng vẫn ở trạng thái chưa đăng nhập.
- **Nhiều bản cài đặt của cùng một IDE hoạt động độc lập**: một bản cài đặt hệ thống (ví dụ: `/usr/share/antigravity/antigravity`) và một bản cài đặt "Full" cục bộ của người dùng (ví dụ: `~/AntigravityIDE_Full/antigravity-ide`) là các tiến trình riêng biệt với runtime riêng — mỗi bản đều phải được khởi chạy lại với CA đã chèn. Hãy xác định bản nào đang chạy bằng đường dẫn tệp nhị phân trước khi khởi chạy lại.
- **Danh tính được thiết lập bởi system prompt của tác nhân, không phải mô hình được định tuyến**: khi bạn ánh xạ lại mô hình của một tác nhân sang nhà cung cấp khác, phản hồi vẫn tự nhận danh tính gốc của tác nhân (ví dụ: Antigravity trả lời "Tôi được vận hành bởi Gemini") vì IDE chèn thông tin đó vào system prompt. Hãy xác nhận backend thực tế trong `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), thay vì hỏi mô hình xem nó là ai.

---

## §6 Khắc phục sự cố

### Xung đột cổng 443

Nếu một tiến trình khác đang lắng nghe trên cổng 443 (máy chủ web, VPN, v.v.):

```bash
lsof -i :443          # tìm tiến trình
sudo fuser -k 443/tcp  # buộc dừng tiến trình (hãy thận trọng khi sử dụng)
```

Ngoài ra, hãy cấu hình một cổng không đặc quyền trong phần cài đặt AgentBridge và thiết lập các quy tắc chuyển hướng `iptables` / `pf`.

### Chứng chỉ không được tin cậy

Nếu IDE hiển thị lỗi TLS sau khi khởi động AgentBridge:

1. Xác minh chứng chỉ đã được cài đặt: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) hoặc `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Một số ứng dụng duy trì kho tin cậy riêng (Firefox, Chrome trên Linux). Chạy lại "Trust Cert" và kiểm tra kho chứng chỉ dành riêng cho NSS/Firefox.
3. Khởi động lại IDE sau khi thiết lập tin cậy — các phiên TLS đang hoạt động sử dụng trạng thái tin cậy cũ.

### IDE bị đăng xuất / "lỗi kết nối" dù CA đã được tin cậy

Triệu chứng: sau khi chuyển hướng DNS và thiết lập CA là đáng tin cậy, một IDE dựa trên Electron (ví dụ: Antigravity)
mở ở trạng thái **đã đăng xuất** hoặc hiển thị lỗi xác thực/kết nối, nhưng nhật ký MITM cho thấy các lệnh gọi
khởi tạo (`loadCodeAssist`, `fetchAvailableModels`, …) trả về `200`.

Nguyên nhân: **runtime Node/Electron đi kèm của IDE bỏ qua kho tin cậy của hệ điều hành**. Phần backend
gốc (một máy chủ ngôn ngữ Go) tin cậy CA của hệ điều hành và xác thực thành công, nhưng frontend Electron
thì không — vì vậy giao diện người dùng cho rằng nó đang ngoại tuyến.

Cách khắc phục (cả hai bước): xuất `NODE_EXTRA_CA_CERTS=<ca.crt>` **và khởi chạy lại IDE từ
shell đó**, không phải từ biểu tượng trên màn hình nền. Trước tiên, hãy thoát hoàn toàn khỏi IDE — khóa singleton của Electron khiến
lần khởi chạy thứ hai chỉ đưa tiến trình hiện có ra trước và môi trường mới bị bỏ qua. Xem §3.2.
Điều này tương ứng với một báo cáo upstream đang mở, trong đó một agent độc lập hoạt động thông qua MITM nhưng biến thể
IDE lại không hoạt động với cùng một thiết lập.

### DNS chưa được truyền bá

Kiểm tra xem `/etc/hosts` đã được cập nhật chưa:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Xóa bộ nhớ đệm DNS:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### Không phát hiện được IDE

Tính năng tự động phát hiện sử dụng các đường dẫn cài đặt phổ biến. Nếu không phát hiện được dù IDE đã được cài đặt:

- Kiểm tra xem tệp nhị phân của IDE có nằm ở vị trí không chuẩn hay không
- Trình hướng dẫn thiết lập vẫn hoạt động — việc không phát hiện được chỉ có nghĩa là huy hiệu sẽ không hiển thị đường dẫn cài đặt

### Lỗi trình xử lý (không thể tìm nạp từ upstream)

Nếu AgentBridge chặn được lưu lượng nhưng tất cả yêu cầu đều thất bại:

1. Xác minh có ít nhất một nhà cung cấp được kết nối tại `/dashboard/providers`
2. Kiểm tra nhật ký máy chủ OmniRoute: `APP_LOG_LEVEL=debug` trong `.env`
3. Xác minh `OMNIROUTE_BASE_URL` trỏ đến đúng endpoint của bộ định tuyến (mặc định: `http://127.0.0.1:20128`)

---

## §7 Tham chiếu API

Tất cả các route đều là `LOCAL_ONLY` (chỉ dành cho loopback, được thực thi trước khi xác thực) và `SPAWN_CAPABLE`. Xem `src/server/authz/routeGuard.ts`.

Đường dẫn cơ sở: `/api/tools/agent-bridge/`

| Phương thức         | Đường dẫn                                      | Mô tả                                                                                                                          |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| GET                 | `/api/tools/agent-bridge/state`                | Trạng thái máy chủ toàn cục + trạng thái/phát hiện theo từng agent                                                             |
| GET                 | `/api/tools/agent-bridge/agents`               | Liệt kê các agent đã đăng ký (id, tên, máy chủ, khả năng hoạt động, trạng thái)                                                |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | Trạng thái của một agent (cấu hình đích + kết quả phát hiện + trạng thái đã lưu)                                               |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Cập nhật `setup_completed` cho agent                                                                                           |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Chạy phép kiểm tra phát hiện cho agent (`installed`, `version?`, `path?`)                                                      |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Bật/tắt DNS cho agent (`{enabled: boolean}`)                                                                                   |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Ánh xạ mô hình cho agent                                                                                                       |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Thay thế các ánh xạ mô hình                                                                                                    |
| POST                | `/api/tools/agent-bridge/server`               | Khởi động/dừng/khởi động lại máy chủ (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                   |
| GET                 | `/api/tools/agent-bridge/cert`                 | Trạng thái chứng chỉ (`exists`, `trusted`, `path`)                                                                             |
| POST                | `/api/tools/agent-bridge/cert`                 | Tin cậy (cài đặt) CA gốc MITM                                                                                                  |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Hủy tin cậy (gỡ bỏ) CA gốc MITM — có tính lũy đẳng (xem §3.6)                                                                  |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Tạo lại chứng chỉ MITM tự ký                                                                                                   |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Truyền phát chứng chỉ PEM để tải xuống                                                                                         |
| GET                 | `/api/tools/agent-bridge/bypass`               | Liệt kê các mẫu bỏ qua (`default` + `user`)                                                                                    |
| POST                | `/api/tools/agent-bridge/bypass`               | Thay thế toàn bộ các mẫu bỏ qua do người dùng định nghĩa                                                                       |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Xóa một mẫu bỏ qua do người dùng định nghĩa                                                                                    |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Tự kiểm tra quy trình thu thập (xem §3.6)                                                                                      |
| POST                | `/api/tools/agent-bridge/repair`               | Hoàn tác trạng thái hệ thống MITM bị bỏ lại (xem §3.6)                                                                         |
| GET                 | `/api/tools/agent-bridge/config`               | Xuất cấu hình JSON có tính di động (xem §3.7)                                                                                  |
| POST                | `/api/tools/agent-bridge/config`               | Nhập cấu hình JSON có tính di động (xem §3.7)                                                                                  |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Lấy đường dẫn CA thượng nguồn đã cấu hình                                                                                      |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Xác thực + lưu đường dẫn CA thượng nguồn                                                                                       |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Chỉ xác thực (chạy thử) đường dẫn CA thượng nguồn — không lưu                                                                  |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | Chế độ thu thập giải mã trong suốt TPROXY — xem `docs/security/MITM-TPROXY-DECRYPT.md` (git; không được biên dịch vào `/docs`) |

Các lược đồ OpenAPI đầy đủ: `docs/openapi.yaml` → thẻ `AgentBridge`.

---

## §8 Lộ trình

### Khảo sát Trae

Trae là một trợ lý lập trình AI tương đối mới. Trước khi triển khai một handler:

1. Xác định tệp nhị phân/tiện ích mở rộng trên các marketplace của VS Code / JetBrains hoặc dưới dạng ứng dụng độc lập
2. Ghi lại lưu lượng truy cập bằng mitmproxy để xác định các máy chủ API và cấu trúc endpoint
3. Xác định cơ chế xác thực
4. Đánh giá nên tiếp tục hay dừng lại dựa trên TOS và khả năng khám phá API

Cho đến khi quá trình khảo sát hoàn tất, thẻ Trae trên dashboard sẽ hiển thị huy hiệu "Đang khảo sát" cùng liên kết "Báo cáo tính khả thi". Stub của handler tại `src/mitm/handlers/trae.ts` sẽ đưa ra lỗi có cấu trúc `Chưa được triển khai`.

### Các agent tồn đọng (bắt buộc dùng MITM — không hỗ trợ base URL tùy chỉnh)

Các công cụ sau không hỗ trợ base URL tùy chỉnh trong phiên bản hiện tại, khiến MITM trở thành phương thức chặn bắt duy nhất. Việc đánh giá tính khả thi vẫn đang chờ xử lý:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — tách biệt với Kiro IDE)
- **Cowork** (ứng dụng desktop của Anthropic)

Lưu ý: GitHub Copilot CLI ≥v1.0.19 hỗ trợ `COPILOT_PROVIDER_BASE_URL` — hãy sử dụng cấu hình trực tiếp thay vì MITM cho công cụ đó.
