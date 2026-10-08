# Tunnels Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Nguồn tham chiếu chính xác:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute có thể đưa máy chủ cục bộ (`http://localhost:20128`) ra internet công
khai thông qua ba backend đường hầm. Điều này hữu ích cho:

- Các callback OAuth từ nhà cung cấp đám mây (Antigravity, Gemini, Cursor) cần
  một URL chuyển hướng có thể truy cập công khai.
- Chia sẻ phiên bản cục bộ của bạn với đồng đội mà không cần triển khai máy ảo.
- Kiểm thử trên thiết bị di động, từ xa hoặc xuyên mạng.

Cả ba backend đều được quản lý trong tiến trình — OmniRoute khởi động/dừng tệp
nhị phân hoặc SDK nền từ bảng điều khiển hay REST API. Không cần thiết lập
reverse proxy hoặc systemd.

## Tổng quan về các backend

| Backend                     | Tính ổn định                                       | Chi phí                | Thiết lập                                          |
| --------------------------- | -------------------------------------------------- | ---------------------- | -------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Tạm thời (URL thay đổi sau mỗi lần khởi động lại)  | Miễn phí               | Không cần — tự động cài đặt `cloudflared`          |
| **ngrok**                   | Ổn định khi cấu hình gói trả phí hoặc miền cố định | Gói miễn phí + trả phí | Yêu cầu tài khoản ngrok + authtoken                |
| **Tailscale Funnel**        | Ổn định theo từng nút trong tailnet của bạn        | Miễn phí cho cá nhân   | Yêu cầu cài đặt Tailscale + đăng nhập + ACL Funnel |

Các phần triển khai nằm trong `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` và `src/lib/tailscaleTunnel.ts`. Cả ba đều trả về một
đối tượng `status` có cấu trúc chung với các trường `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` và `lastError`, nhờ đó bảng điều khiển có thể hiển thị chúng
một cách thống nhất.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` chạy `cloudflared` dưới dạng tiến trình con. Nó hỗ trợ
hai chế độ, được chọn dựa trên việc có cung cấp cấu hình đường hầm được đặt tên hay không:

- **Đường hầm nhanh (mặc định).** Chạy `cloudflared tunnel --url
http://localhost:<apiPort>` và phân tích URL `*.trycloudflare.com` được cấp
  từ stdout. Các URL là tạm thời và thay đổi sau mỗi lần khởi động lại.
- **Đường hầm được đặt tên (tùy chọn).** Khi `CLOUDFLARED_CONFIG` trỏ đến một
  `config.yml` của cloudflared được quản lý cục bộ, OmniRoute chạy `cloudflared tunnel --no-autoupdate
--config <path> run`, cung cấp cho bạn một **tên máy chủ ổn định, có tên xác định**. Tệp cấu hình
  cung cấp UUID đường hầm, `credentials-file` và định tuyến `ingress`, vì vậy
  không truyền `--url` và không cần token của bảng điều khiển Zero Trust. `run` đọc
  thông tin xác thực từ đường dẫn tuyệt đối `credentials-file` trong tệp cấu hình — không cần
  `cert.pem` (tệp đó chỉ được dùng để quản lý vòng đời đường hầm).

Các hành vi chính:

- **Tự động cài đặt.** Trong lần sử dụng đầu tiên, OmniRoute tải xuống tệp nhị phân
  `cloudflared` mới nhất từ các bản phát hành GitHub chính thức (bản cài đặt được quản lý nằm trong
  `DATA_DIR/cloudflared/`). SHA256 của tài nguyên đã tải xuống được xác minh dựa trên
  bản kê khai phát hành trước khi thực thi.
- **Giám sát tiến trình.** PID của cloudflared và URL đã phân giải được lưu vào
  `quick-tunnel-state.json` để bảng điều khiển có thể khôi phục trạng thái sau khi tải lại.

### Thiết lập đường hầm được đặt tên (tên máy chủ ổn định)

1. Tạo một đường hầm được quản lý cục bộ bằng CLI cloudflared (chỉ một lần):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Tạo `~/.cloudflared/config.yml` để định tuyến tên máy chủ của bạn đến cổng API
   cục bộ của OmniRoute (mặc định là 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Trỏ OmniRoute đến tệp cấu hình và (khởi động lại) đường hầm:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # tùy chọn — ghi đè tên máy chủ mà OmniRoute báo cáo; nếu không, tên này được đọc từ
   # quy tắc ingress đầu tiên của tệp cấu hình:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Bật đường hầm theo cách tương tự như đường hầm nhanh (REST / bảng điều khiển / CLI
   bên dưới). Đường hầm được đặt tên không phát ra URL công khai để thu thập, vì vậy
   trạng thái sẵn sàng được phát hiện từ kết nối biên đã đăng ký của cloudflared, còn
   `publicUrl`/`apiUrl` được báo cáo từ `CLOUDFLARED_HOSTNAME` (hoặc tên máy chủ
   ingress đầu tiên trong tệp cấu hình).

### Bật / tắt qua REST

Endpoint sử dụng phần thân `{action: "enable" | "disable"}`, không phải các đường dẫn
`start`/`stop` riêng biệt. Yêu cầu xác thực quản trị (phiên quản trị viên hoặc khóa API
quản trị viên).

```bash
# Bật
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Trạng thái
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Tắt
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Hoặc qua bảng điều khiển: **Settings → Tunnels → Cloudflare**.

### Các biến môi trường tùy chọn

| Biến                                                 | Mục đích                                                                                                                                                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Ghi đè đường dẫn tệp nhị phân. Nếu được đặt và hợp lệ, OmniRoute sẽ sử dụng tệp này thay vì tải xuống.                                                                                                     |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Giao thức truyền tải (mặc định là `http2`; cũng hỗ trợ `quic`, `auto`).                                                                                                                                    |
| `CLOUDFLARED_CONFIG`                                 | Đường dẫn đến tệp `config.yml` của cloudflared được quản lý cục bộ. Khi được đặt, OmniRoute sẽ chạy một đường hầm **được đặt tên/duy trì lâu dài** (`tunnel --config <path> run`) thay vì đường hầm nhanh. |
| `CLOUDFLARED_HOSTNAME`                               | Ghi đè tên máy chủ công khai được báo cáo của đường hầm được đặt tên (ví dụ: `ai.example.com`). Khi không được đặt, giá trị được đọc từ tên máy chủ `ingress` đầu tiên trong cấu hình.                     |

## 2. ngrok

`src/lib/ngrokTunnel.ts` sử dụng **SDK `@ngrok/ngrok`** (chạy trong tiến trình, không có tiến trình con CLI). Mô-đun gốc được nhập theo cơ chế lazy khi khởi động lần đầu để các nền tảng không có tệp nhị phân dựng sẵn không làm ứng dụng gặp lỗi khi khởi động.

### Điều kiện tiên quyết

1. Đăng ký tại <https://ngrok.com>.
2. Sao chép authtoken của bạn từ bảng điều khiển ngrok.
3. Cung cấp token theo một trong các cách sau:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, hoặc
   - Bảng điều khiển: **Settings → Tunnels → ngrok**, hoặc
   - Nội dung REST (dùng một lần): `{"action":"enable","authToken":"<token>"}`.

Nếu không có cách nào được cấu hình, trạng thái sẽ trả về `phase: "needs_auth"`.

### Bật / tắt qua REST

```bash
# Bật (sử dụng NGROK_AUTHTOKEN từ biến môi trường)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Bật bằng token nội tuyến
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Trạng thái
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Tắt
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Phản hồi bao gồm `publicUrl` được chỉ định (ví dụ:
`https://abcd-1234.ngrok-free.app`). Các miền tùy chỉnh, khu vực và quy tắc chính sách phải được cấu hình trong bảng điều khiển ngrok — bản thân OmniRoute chỉ chuyển tiếp URL đích cục bộ đến SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` điều phối CLI hệ thống `tailscale` để công khai cổng API cục bộ qua **Funnel** (cổng ra internet công cộng của Tailscale dành cho serve). Thành phần này hỗ trợ toàn bộ vòng đời: cài đặt, đăng nhập, khởi động daemon, bật và tắt.

Phần triển khai gọi `tailscale funnel --bg <port>` (chế độ nền). URL công khai có dạng `https://<machine>.<tailnet>.ts.net/`.

### Điều kiện tiên quyết

1. Cài đặt Tailscale (hoặc để OmniRoute thực hiện — xem endpoint `install` bên dưới).
2. Đăng nhập (`tailscale login` hoặc qua endpoint `login` của OmniRoute).
3. Bật Funnel cho tailnet của bạn trong bảng điều khiển quản trị Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Trên Linux và macOS, daemon (`tailscaled`) yêu cầu `sudo` để điều khiển. Các endpoint POST chấp nhận trường `sudoPassword` tùy chọn, trường này được chuyển tiếp đến bộ nhớ đệm mật khẩu MITM của OmniRoute (`getCachedPassword` / `setCachedPassword`) trong suốt thời gian xử lý lệnh gọi. Windows sử dụng bản cài đặt dịch vụ mặc định tại `C:\Program Files\Tailscale\tailscale.exe`.

### Các endpoint REST

Tailscale có giao diện phong phú hơn các backend khác vì việc cài đặt, đăng nhập, daemon và đường hầm là các phần riêng biệt.

| Endpoint                              | Phương thức | Mục đích                                                                     |
| ------------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`       | Trạng thái đường hầm tổng hợp (`phase`, `tunnelUrl`, `apiUrl`, v.v.)         |
| `/api/tunnels/tailscale/check`        | `GET`       | Kiểm tra cấp thấp hơn: đã cài đặt? đã đăng nhập? daemon đang chạy?           |
| `/api/tunnels/tailscale/install`      | `POST`      | Cài đặt Tailscale (các sự kiện tiến trình được truyền qua SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST`      | Khởi động `tailscaled` trên Linux/macOS                                      |
| `/api/tunnels/tailscale/login`        | `POST`      | Bắt đầu quy trình đăng nhập; trả về `authUrl` để mở trong trình duyệt        |
| `/api/tunnels/tailscale/enable`       | `POST`      | Khởi động Funnel cho cổng API                                                |
| `/api/tunnels/tailscale/disable`      | `POST`      | Dừng Funnel                                                                  |

Tất cả các endpoint Tailscale đều yêu cầu xác thực quản lý (xem `routeUtils.ts ::
requireTailscaleAuth`).

Ví dụ bật:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Nếu Funnel chưa được bật trong bảng điều khiển quản trị, phản hồi sẽ bao gồm `funnelNotEnabled: true` cùng với `enableUrl` để mở trong trình duyệt.

### Các biến môi trường tùy chọn

| Biến            | Mục đích                                  |
| --------------- | ----------------------------------------- |
| `TAILSCALE_BIN` | Ghi đè đường dẫn tệp nhị phân `tailscale` |

## Tóm tắt endpoint

| Endpoint                              | Phương thức | Nội dung yêu cầu                    | Xác thực |
| ------------------------------------- | ----------- | ----------------------------------- | -------- |
| `/api/tunnels/cloudflared`            | `GET`       | —                                   | quản trị |
| `/api/tunnels/cloudflared`            | `POST`      | `{action: "enable" \| "disable"}`   | quản trị |
| `/api/tunnels/ngrok`                  | `GET`       | —                                   | quản trị |
| `/api/tunnels/ngrok`                  | `POST`      | `{action, authToken?}`              | quản trị |
| `/api/tunnels/tailscale`              | `GET`       | —                                   | quản trị |
| `/api/tunnels/tailscale/check`        | `GET`       | —                                   | quản trị |
| `/api/tunnels/tailscale/install`      | `POST`      | `{sudoPassword?}` (SSE)             | quản trị |
| `/api/tunnels/tailscale/start-daemon` | `POST`      | `{sudoPassword?}`                   | quản trị |
| `/api/tunnels/tailscale/login`        | `POST`      | `{hostname?}`                       | quản trị |
| `/api/tunnels/tailscale/enable`       | `POST`      | `{sudoPassword?, hostname?, port?}` | quản trị |
| `/api/tunnels/tailscale/disable`      | `POST`      | `{sudoPassword?}`                   | quản trị |

Không có endpoint `/api/settings/tunnels` trung tâm — mỗi backend hoạt động
độc lập.

## Những điều cần lưu ý về callback OAuth

Khi bạn cung cấp quyền truy cập OmniRoute thông qua một đường hầm, bảng điều khiển và các luồng OAuth phải
tạo URL callback dựa trên tên máy chủ **công khai**, không phải `localhost`. Nếu không,
nhà cung cấp OAuth sẽ chuyển hướng người dùng trở lại một URL mà máy chủ của họ không thể truy cập,
khiến quá trình bắt tay thất bại.

Việc chỉnh sửa trên bảng điều khiển và lưu cài đặt không yêu cầu cố định tên máy chủ đường hầm trong
`NEXT_PUBLIC_BASE_URL`. Bảng điều khiển đã xác thực gửi các yêu cầu không an toàn cùng nguồn
kèm theo token CSRF được liên kết với phiên, vì vậy các máy chủ Cloudflare Quick Tunnel tạm thời
vẫn có thể được sử dụng để quản lý giao diện người dùng thông thường sau khi đăng nhập.

Đặt:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

và khởi động lại OmniRoute trước khi bắt đầu OAuth. Với Cloudflare Quick
Tunnel tạm thời, URL sẽ thay đổi sau mỗi lần khởi động lại, vì vậy khi sử dụng OAuth trong môi trường production,
hãy ưu tiên ngrok với tên miền dành riêng hoặc Tailscale Funnel.

## Tình trạng hoạt động và giám sát

Bảng điều khiển hiển thị trạng thái đường hầm trong **Settings → Tunnels**:

- Các backend đang hoạt động và `phase` hiện tại (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- URL công khai hiện tại và URL API được suy ra (`<publicUrl>/v1`).
- URL đích cục bộ mà đường hầm đang chuyển tiếp đến.
- Thông báo lỗi gần nhất, nếu có.

Để giám sát bằng chương trình, hãy thăm dò các endpoint `GET` tương ứng của từng backend. Có thể chạy đồng thời
nhiều backend; OmniRoute sẽ theo dõi từng backend
một cách độc lập.

## Khắc phục sự cố

### "Không tìm thấy tệp nhị phân cloudflared"

OmniRoute sẽ cố gắng tự động cài đặt trong lần sử dụng đầu tiên. Nếu quá trình cài đặt bị chặn
(mạng bị hạn chế, không thể truy cập GitHub), hãy tải xuống `cloudflared` theo cách thủ công từ
<https://github.com/cloudflare/cloudflared/releases> và đặt
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: yêu cầu authtoken"

`phase: "needs_auth"` có nghĩa là không tìm thấy authtoken. Đặt `NGROK_AUTHTOKEN` trong
`.env`, cấu hình thông qua bảng điều khiển hoặc truyền `authToken` trong nội dung yêu cầu POST
kích hoạt.

### "tailscale: funnel chưa được bật"

Khi phản hồi kích hoạt bao gồm `funnelNotEnabled: true`, Funnel đang bị tắt
cho tailnet của bạn. Mở `enableUrl` được trả về (hoặc trang tính năng trong bảng điều khiển quản trị)
và bật Funnel.

### URL đường hầm thay đổi làm hỏng OAuth

Sử dụng ngrok với tên miền dành riêng hoặc Tailscale Funnel (cả hai đều ổn định theo từng node).
Cloudflare Quick Tunnel được thiết kế để hoạt động tạm thời và không được khuyến nghị sử dụng cho
callback OAuth dài hạn.

### Quyền bị từ chối trên Linux/macOS đối với Tailscale

`tailscaled` cần quyền root. Cung cấp `sudoPassword` cho endpoint POST tương ứng
hoặc tự chạy daemon (`sudo systemctl start tailscaled`).

## Xem thêm

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy đầu ra (1proxy, SOCKS5, HTTP) cho
  lưu lượng đi ra ngoài.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — danh sách đầy đủ các biến môi trường, bao gồm
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — các phương án thay thế cho đường hầm để lưu trữ
  công khai ổn định.
- Mã nguồn: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
