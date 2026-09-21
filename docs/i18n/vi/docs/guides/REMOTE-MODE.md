# Remote Mode (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Chạy CLI `omniroute` trên máy tính xách tay của bạn trong khi OmniRoute chạy ở một nơi khác
(một VPS, máy chủ tại nhà hoặc một máy khác trong Tailnet của bạn). Bạn đăng nhập một lần bằng
`omniroute connect`, và từ đó trở đi, **mọi** lệnh CLI đều nhắm đến máy chủ từ xa đó
— cùng lệnh, cùng đầu ra, chỉ khác là được thực thi trên máy chủ từ xa.

Không cần cài đặt công cụ thứ hai: chế độ từ xa sử dụng CLI `omniroute` thông thường
cùng với **access token** có phạm vi.

```bash
npm install -g omniroute                 # CLI thông thường
omniroute connect 192.168.0.15           # đăng nhập (mật khẩu → token có phạm vi)
omniroute models list                    # ← giờ đây liệt kê các model của máy chủ TỪ XA
omniroute configure codex                # ← ghi một hồ sơ Codex cục bộ từ danh mục từ xa
```

---

## Cách hoạt động

```
máy tính xách tay của bạn                 OmniRoute từ xa (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (mật khẩu → token)         │
│  ngữ cảnh: vps     │ ───────────────►  │ cấp một access token có phạm vi│
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ mọi route quản lý đều được kiểm│
│ ghi cấu hình       │ ◄───────────────  │ tra theo phạm vi của token     │
│ CỤC BỘ             │                   └───────────────────────────────┘
└────────────────────┘
```

- **Ngữ cảnh** lưu trữ một máy chủ cho mỗi ngữ cảnh (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` chuyển máy chủ đang hoạt động; `default` là cục bộ.
- **Access token** (`oma_live_…`) cấp quyền cho các lệnh quản lý. Chúng
  khác với khóa API suy luận (`sk-…`, được dùng cho `/v1/chat/completions`).
- Chỉ mã băm SHA-256 của token được lưu trữ phía máy chủ. Giá trị thuần văn bản chỉ được hiển thị
  **một lần**, tại thời điểm tạo.

---

## Kết nối

### Bằng mật khẩu quản lý (khởi tạo)

```bash
omniroute connect 192.168.0.15
# Mật khẩu quản lý cho http://192.168.0.15:20128: ********
# ✔ Đã kết nối với http://192.168.0.15:20128 — ngữ cảnh '192.168.0.15' (phạm vi: admin)
```

Luồng dùng mật khẩu mặc định cấp một token **admin** (bạn nắm giữ mật khẩu, vì vậy
bạn đã có toàn quyền kiểm soát). Giới hạn phạm vi bằng `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Các tùy chọn: `--port <p>` (khi máy chủ không có cổng), `--name <ctx>` (tên ngữ cảnh),
`--scope read|write|admin`. URL đầy đủ được giữ nguyên:
`omniroute connect https://omni.example.com`.

### Bằng token được tạo sẵn

Tạo một token có phạm vi trong bảng điều khiển (hoặc bằng `omniroute tokens create`) và
dán token đó — không cần mật khẩu:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI xác thực token qua `GET /api/cli/whoami` và lưu token làm ngữ cảnh đang hoạt động.

---

## Phạm vi

Ba cấp độ, theo thứ bậc (`admin ⊃ write ⊃ read`):

| Phạm vi | Có thể thực hiện                                                                   |
| ------- | ---------------------------------------------------------------------------------- |
| `read`  | liệt kê/kiểm tra — `models list`, `providers status`, `logs`, `usage`, `cost`      |
| `write` | read **+** cấu hình/áp dụng — `setup-codex`, `keys add`, `config set`, tổ hợp      |
| `admin` | write **+** quản lý — CRUD `tokens`, thêm nhà cung cấp, dịch vụ, chính sách, oauth |

Máy chủ suy luận phạm vi mà mỗi route yêu cầu từ phương thức HTTP
(`GET`→read, thao tác thay đổi→write), cộng với danh sách cho phép dành cho admin đối với các bề mặt nhạy cảm
(các thao tác thay đổi `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token không đủ phạm vi sẽ nhận mã `403` kèm thông báo rõ ràng.

> Các route khởi tạo tiến trình (`/api/services/*`, `/api/mcp/*`, …) vẫn
> **chỉ dành cho loopback** — token từ xa không bao giờ có thể truy cập chúng, bất kể phạm vi.

## Kết nối Antigravity trên bản cài đặt từ xa

Antigravity sử dụng màn hình đồng ý firstparty/nativeapp của Google. Google chỉ
trả về mã ủy quyền khi **chuyển hướng loopback**
(`http://127.0.0.1:<port>/callback`) **có thể được truy cập từ trình duyệt
phê duyệt đăng nhập**. Trên bản cài đặt VPS từ xa, loopback đó nằm trên máy chủ,
không phải trên máy của bạn, vì vậy màn hình đồng ý **bị treo vĩnh viễn và không
bao giờ phát ra mã** — phương án dự phòng thông thường là "dán URL callback"
không có gì để dán. (Đây là hạn chế từ phía Google: tình trạng treo tương tự xảy
ra trong bất kỳ proxy nào sử dụng ứng dụng desktop Antigravity đi kèm, không chỉ
OmniRoute.)

Dashboard phát hiện điều này trước khi bạn bị kẹt: khi mở **Providers → Antigravity →
Connect** từ một địa chỉ không phải localhost, thông báo chung "sao chép URL callback"
sẽ được thay thế bằng hai biện pháp khắc phục bên dưới, trong đó host và cổng của
bạn đã được điền sẵn. (Địa chỉ LAN cũng được tính — `192.168.x.x` không phải là
localhost đối với callback này.)

Có hai cách được hỗ trợ để kết nối Antigravity với OmniRoute từ xa.

### Tùy chọn A — trình trợ giúp đăng nhập cục bộ (khuyến nghị)

Chạy OAuth trên **máy tính của chính bạn**, nơi có thể truy cập `127.0.0.1`. Trình
trợ giúp giao tiếp trực tiếp với Google, vì vậy quá trình đồng ý có thể hoàn tất
ở nơi mà phiên bản trên dashboard không thể thực hiện được.

**Nếu bạn đã kết nối** (`omniroute connect <host>`), bạn không cần sao chép gì cả —
trình trợ giúp sẽ chuyển thông tin xác thực tới bản cài đặt đó cho bạn:

```bash
# Trên máy CỤC BỘ của bạn (cần Node.js + trình duyệt):
omniroute connect 192.168.0.15        # một lần — tạo context token có phạm vi quản trị viên
npx omniroute login antigravity
#   ↳ mở màn hình đồng ý của Google, thu callback trên một cổng loopback cục bộ,
#     trao đổi callback và POST thông tin xác thực tới context đang hoạt động:
#
#   Antigravity đã được kết nối trên http://192.168.0.15:20128 (kết nối abc123).
#   Không cần dán gì — bạn có thể đóng terminal này.
```

Việc đẩy dữ liệu diễn ra tự động mỗi khi context đang hoạt động trỏ tới một máy
khác. Buộc bật hoặc tắt tính năng này bằng `--push` / `--no-push`, hoặc nhắm tới
một context cụ thể bằng `--context <name>`.

**Nếu máy của bạn không thể truy cập VPS** (bị tường lửa chặn, không có SSH, máy
làm việc cách ly mạng), trình trợ giúp vẫn hoạt động — nó chỉ thực sự _cần_
Google. Sử dụng `--no-push`, hoặc cứ để thao tác đẩy thất bại: trình trợ giúp sẽ
chuyển sang in blob thay vì loại bỏ một phiên ủy quyền mà bạn đã hoàn tất.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Sau đó, trên dashboard **từ xa**: **Providers → Antigravity → Connect**, rồi dán
blob `omniroute-cred-v1.…` vào trường **Step 2** (trường này chấp nhận URL
callback hoặc blob thông tin xác thực). OmniRoute sẽ giải mã blob, chạy quy trình
onboarding Cloud Code ở phía máy chủ và lưu kết nối.

> Blob chứa refresh token — hãy bảo vệ nó như mật khẩu. Khi sử dụng phương thức
> đẩy, blob được gửi một lần qua kết nối đã xác thực của context; khi sử dụng
> phương thức dán, blob được gửi qua kết nối dashboard của bạn. Trong cả hai
> trường hợp, blob được lưu trữ ở trạng thái mã hóa và một lần đẩy thành công sẽ
> không bao giờ in blob ra terminal của bạn.

Các cờ: `--no-browser` (in URL thay vì tự động mở), `--port <n>`
(cố định cổng loopback), `--timeout <ms>`, `--push` / `--no-push` (ghi đè cơ chế
gửi tự động), `--context <name>` (nhắm tới một context cụ thể).

### Tùy chọn B — đường hầm chuyển tiếp cục bộ SSH

Nếu bạn có quyền truy cập SSH vào VPS, hãy chuyển tiếp cổng dashboard để callback
loopback được định tuyến trở lại máy chủ thông qua đường hầm:

```bash
# Trên máy CỤC BỘ của bạn:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# sau đó mở http://localhost:20128 trong trình duyệt CỤC BỘ và kết nối Antigravity
# như bình thường — chuyển hướng 127.0.0.1:20128/callback giờ đây sẽ đến VPS qua SSH.
```

Vì bạn truy cập dashboard dưới dạng `localhost:20128`, quá trình đồng ý của
Google sẽ hoàn tất và callback được chuyển tới máy chủ qua cùng đường hầm đó —
không cần blob. Hãy giữ đường hầm mở cho đến khi kết nối hiển thị là đang hoạt
động.

Không giống các provider sử dụng loopback cố định bên dưới, **chỉ cần một lần
chuyển tiếp** trong trường hợp này: callback Antigravity sử dụng chính cổng
dashboard, vì vậy không cần tạo đường hầm cho cổng thứ hai dành riêng cho
provider.

> Một phương án thay thế hoàn toàn headless (không cần trình trợ giúp, không cần
> đường hầm) là cấu hình thông tin xác thực Google OAuth **của riêng bạn** cùng
> một URL cơ sở công khai; hãy xem các biến môi trường OAuth của provider. Hai
> tùy chọn bên trên không yêu cầu thiết lập Google bổ sung.

---

## Kết nối Codex / Grok trên bản cài đặt từ xa (các nhà cung cấp dùng loopback cố định)

Codex, xAI (`xai-oauth`) và Grok CLI (`grok-cli`) đăng ký một `redirect_uri`
loopback **cố định** với ứng dụng OAuth thượng nguồn của họ. OmniRoute không thể
thay đổi URI này — nhà cung cấp luôn chuyển hướng trình duyệt trở lại cùng một
địa chỉ được mã hóa cứng:

| Nhà cung cấp | Callback cố định mà nhà cung cấp chuyển hướng đến |
| ------------ | ------------------------------------------------- |
| `codex`      | `http://localhost:1455/auth/callback`             |
| `xai-oauth`  | `http://127.0.0.1:56121/callback`                 |
| `grok-cli`   | `http://127.0.0.1:56122/callback`                 |

`localhost` ở đây có nghĩa là **máy đang chạy trình duyệt**, trong khi máy chủ
callback PKCE của OmniRoute lắng nghe trên loopback của **máy chủ**. Nếu mở bảng
điều khiển tại một địa chỉ LAN như `http://192.168.0.15:20128`, hai bên sẽ không
bao giờ kết nối được với nhau: mã ủy quyền được gửi đến `localhost:1455` trên
chính laptop của bạn, nơi không có gì đang lắng nghe, và nhà cung cấp không thể
hoàn tất đăng nhập mà không hiển thị lỗi.

Bảng điều khiển phát hiện trường hợp này trước khi mở cửa sổ bật lên và hiển thị
lệnh tạo đường hầm thay vì để quá trình đăng nhập âm thầm thất bại (#8046).

### Cách khắc phục — chuyển tiếp **cả hai** cổng

```bash
# Trên máy đang chạy TRÌNH DUYỆT:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# sau đó truy cập http://localhost:20128 và kết nối Codex từ đó
```

Cần hai chuyển tiếp, và chỉ chuyển tiếp một cổng vẫn sẽ thất bại:

- **`20128`** (cổng bảng điều khiển) khiến origin trở thành localhost thực sự,
  đây là điều kiện để OmniRoute khởi động máy chủ callback PKCE — origin LAN
  không bao giờ đi vào nhánh đó.
- **`1455`** (cổng callback cố định của nhà cung cấp) là nơi trình duyệt được
  chuyển hướng trở lại; cổng này phải được truyền qua đường hầm đến loopback
  của máy chủ.

Thay `1455` bằng `56121`/`56122` khi kết nối xAI hoặc Grok CLI, và thay `20128`
bằng cổng bảng điều khiển thực tế của bạn. Giữ đường hầm mở cho đến khi kết nối
hiển thị là đang hoạt động.

> **Không có quyền truy cập SSH?** Codex và Grok CLI cũng chấp nhận token được
> dán vào — tab **Paste API Key** / **Import auth.json** trong hộp thoại kết nối.
> Cách này không có callback loopback, nên hoạt động từ bất kỳ origin nào. Codex
> còn chấp nhận một access token thuần túy hoặc blob phiên `~/.codex/auth.json`.

---

## Quản lý token

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ chỉ in secret MỘT LẦN — hãy sao chép ngay
omniroute tokens list                 # được che: id, tên, phạm vi, tiền tố, trạng thái, ngày hết hạn
omniroute tokens revoke <id|prefix>   # thu hồi ngay lập tức
omniroute tokens scopes               # giải thích ba phạm vi
```

Các lệnh `tokens` yêu cầu thông tin xác thực **admin**. Bạn cũng có thể quản lý
token trong bảng điều khiển tại **Settings → Access Tokens** (tạo, thu hồi, chỉ
sao chép một lần).

---

## Cấu hình một CLI lập trình từ catalog từ xa

`omniroute configure` đọc catalog mô hình trực tiếp của **máy chủ đang hoạt động**
và ghi cấu hình trên máy **của bạn**.

```bash
omniroute configure codex
#   Nhà cung cấp: glm, kmc, ollamacloud, opencode-go, …
#   Nhà cung cấp: glm
#   ID mô hình: glm/glm-5.2
#   ✔ Đã ghi ~/.codex/glm52.config.toml
#   Sử dụng:  codex --profile glm52

# không tương tác
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# giữ một mô hình thường dùng ở đầu bộ chọn tương tác
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Bộ chọn chỉ lưu ID mô hình (không bao giờ lưu URL hoặc thông tin xác thực) trong
tệp `model-preferences.json` cục bộ, được phân phạm vi theo ngữ cảnh và CLI đích.
Các mục yêu thích được hiển thị trước những lựa chọn gần đây; dùng `--unfavorite`
để xóa mô hình đã chọn khỏi danh sách ngữ cảnh/đích đó.

Hồ sơ được ghi tham chiếu khóa suy luận thông qua biến môi trường
(`OMNIROUTE_API_KEY`) — secret không bao giờ được ghi vào đĩa. Để biết cách thiết
lập Codex cơ sở một lần (khối `[model_providers.omniroute]`), hãy xem
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Khởi chạy CLI với máy chủ từ xa (không ghi cấu hình)

`omniroute run <target>` cũng tuân theo ngữ cảnh đang hoạt động: URL cơ sở từ xa
và thông tin xác thực theo ngữ cảnh chỉ được đưa vào tiến trình được tạo.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → máy chủ từ xa
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Xem trước chính xác tiến trình sẽ được tạo (chỉ TÊN KHÓA env, không bao giờ có giá trị):
omniroute run codex --dry-run --json
```

Các đích: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(nguồn duy nhất: `bin/cli/cli-manifest.mjs`). Qwen và Gemini chạy với một thư
mục home tạm thời, biệt lập và được xóa khi thoát, vì vậy việc khởi chạy không bao
giờ động đến — hoặc làm rò rỉ vào — cấu hình công cụ cá nhân của bạn.

### Các lệnh thiết lập cho từng CLI

Mỗi CLI được hỗ trợ đều có một lệnh thiết lập nhận biết máy chủ từ xa (tất cả đều
tuân theo ngữ cảnh đang hoạt động hoặc `--remote <url> --api-key <key>`):

| CLI         | Lệnh                       | Nội dung được ghi                                                                                                                                                                         |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | Các profile `~/.codex/<name>.config.toml` (theo từng mô hình)                                                                                                                             |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (theo từng mô hình)                                                                                                                             |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — provider tương thích với openai `omniroute`, chứa mọi mô hình trong danh mục (chạy `opencode -m omniroute/<model>`)                                  |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (chế độ CLI) + in ra các cài đặt tiện ích mở rộng VS Code để dán vào (tương thích với OpenAI, Base URL **không có** `/v1`)                     |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + các cài đặt VS Code `kilocode.*` — tương thích với OpenAI, Base URL **có** `/v1`                                                                  |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **có** `/v1`, khóa qua `${{ secrets.OMNIROUTE_API_KEY }}`                                        |
| Cursor      | `omniroute setup-cursor`   | in ra các bước trong ứng dụng (Settings → Models → Override OpenAI Base URL **có** `/v1` + khóa + mô hình). Cấu hình Cursor là SQLite không rõ định dạng — chỉ dành cho bảng trò chuyện   |
| Roo Code    | `omniroute setup-roo`      | ghi JSON nhập vào Roo (`~/.omniroute/roo-settings.json`) + đặt `roo-cline.autoImportSettingsPath` + in các bước trên giao diện người dùng (tương thích với OpenAI, Base URL **có** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — provider `openai-compat`, `base_url` **có** `/v1`, khóa qua `$OMNIROUTE_API_KEY`                                                                           |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **không có** `/v1` + `GOOSE_MODEL`) + hướng dẫn thiết lập biến môi trường                                          |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **không có** `/v1` + `model: openai/<id>`) + hướng dẫn thiết lập biến môi trường (`aider --message --yes`)                                         |
| Qwen Code   | `omniroute setup-qwen`     | mục V4 `modelProviders.openai` trong `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` trong `~/.qwen/.env`                                                                                   |

```bash
# OpenCode (provider tương thích với openai, tất cả mô hình trong danh mục, VPS từ xa)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # chỉ giữ lại các mô hình khớp
opencode -m omniroute/glm/glm-5.2 "..."          # trước tiên hãy export OMNIROUTE_API_KEY
```

> OpenCode cũng có tích hợp **plugin** phong phú hơn: `omniroute setup opencode`
> (hiện hỗ trợ máy chủ từ xa qua `--remote`) cài đặt `@omniroute/opencode-plugin`.
> `setup-opencode` là phương án thay thế gọn nhẹ, tương thích với openai. Khóa API
> được tham chiếu qua `{env:OMNIROUTE_API_KEY}` — không bao giờ được ghi vào ổ đĩa.
>
> Trên OpenCode v2, hãy dùng `@omniroute/opencode-plugin-v2` thay thế: cùng danh mục,
> nhưng hợp đồng loader khác. Plugin đọc khóa từ kho thông tin xác thực riêng của OpenCode
> khi tích hợp được kết nối, vì vậy gateway từ xa hoàn toàn không cần khóa trong
> `opencode.json`.

---

## Quản lý context (chuyển đổi giữa các máy chủ)

Một **context** là một máy chủ đã lưu (baseUrl + thông tin xác thực + phạm vi). `omniroute connect`
tạo một context và đặt nó làm context đang hoạt động; từ thời điểm đó, mọi lệnh đều nhắm đến context này. Quản lý và
chuyển đổi giữa các context bằng `omniroute contexts`:

```bash
omniroute contexts list            # tất cả context; context đang hoạt động được đánh dấu ●
omniroute contexts current         # máy chủ đang hoạt động, trạng thái xác thực, phạm vi
```

```text
  | Tên     | URL cơ sở                 | Xác thực | Phạm vi | Mô tả
● | vps     | http://100.67.86.91:20128 | token    | admin   | OmniRoute từ xa (…)
  | default | http://localhost:20128    | ✗        |         |
```

**Chuyển đổi máy chủ** — mọi lệnh tiếp theo đều sử dụng context đang hoạt động:

```bash
omniroute contexts use vps         # → tất cả lệnh giờ đây đều truy cập VPS từ xa
omniroute tokens list              #   (chạy trên VPS)

omniroute contexts use default     # → quay lại localhost
omniroute tokens list              #   (chạy trên máy chủ cục bộ)
```

**Thêm context theo cách thủ công** (thay vì `connect`), xem chi tiết hoặc đổi tên:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "máy staging"
omniroute contexts show staging    # toàn bộ thông tin chi tiết của một context
omniroute contexts rename staging stg
```

**Xóa một context** — yêu cầu xác nhận; truyền `--yes` để bỏ qua
(bắt buộc đối với script / shell không tương tác, nếu không thao tác sẽ được từ chối một cách an toàn):

```bash
omniroute contexts remove stg --yes
```

> Không thể xóa `default` (localhost). Khi xóa context đang hoạt động, hệ thống sẽ quay về
> `default`. Mẹo: việc xóa một context chỉ loại bỏ thông tin xác thực đã lưu **cục bộ** —
> hãy thu hồi token trên máy chủ bằng `omniroute tokens revoke <id>` để thực sự
> vô hiệu hóa quyền truy cập.

**Xuất / nhập** các context (ví dụ: để di chuyển chúng giữa các máy). Các context mới chỉ lưu
tham chiếu đến chuỗi khóa; thông tin xác thực không được sao chép vào bản xuất khi chuỗi khóa
của hệ điều hành khả dụng:

```bash
omniroute contexts export --out contexts.json     # mặc định: stdout
omniroute contexts import contexts.json            # ghi đè; dùng --merge để giữ lại các context hiện có
omniroute contexts migrate --yes                  # di chuyển các token dạng văn bản thuần cũ sang chuỗi khóa
```

Trên các hệ thống không giao diện không có chuỗi khóa hệ điều hành khả dụng, CLI sẽ chuyển sang dùng
`config.json` với chế độ `0600` và hiển thị cảnh báo một lần. Hãy coi các bản xuất từ
cơ chế dự phòng đó (và mọi cấu hình cũ trước khi di chuyển) là dữ liệu bí mật.

---

## Kiểm tra nhanh từ đầu đến cuối

Một quy trình có thể sao chép-dán để xác minh thiết lập từ xa từ đầu — kết nối, tạo một
token có phạm vi, định tuyến một lệnh, chuyển trở lại và dọn dẹp. Thay
`192.168.0.15` bằng host/IP của máy chủ của bạn (Tailscale, LAN hoặc một URL
`https://…` công khai).

```bash
# 1. Kết nối (mật khẩu → token quản trị, được lưu dưới dạng context và trở thành context đang hoạt động)
omniroute connect 192.168.0.15                 # hoặc: --key oma_live_xxxx  (không cần mật khẩu)
omniroute contexts current                     # hiển thị máy chủ từ xa + phạm vi

# 2. Sử dụng — các lệnh quản lý giờ đây chạy trên máy chủ từ xa
omniroute tokens create --name laptop --scope read   # tạo một token có phạm vi hẹp hơn
omniroute tokens list                                 # danh sách được che, từ máy chủ từ xa

# 3. Chuyển đổi qua lại
omniroute contexts use default                 # → cục bộ
omniroute contexts use 192-168-0-15            # → lại từ xa (tên lấy từ `contexts list`)

# 4. Dọn dẹp. LƯU Ý: `contexts remove` chỉ xóa thông tin xác thực CỤC BỘ —
#    lệnh này KHÔNG thu hồi token trên máy chủ. Trước tiên, hãy thu hồi ở phía máy chủ nếu bạn
#    muốn thực sự vô hiệu hóa quyền truy cập.
omniroute tokens revoke <id|prefix>            # vô hiệu hóa quyền truy cập trên máy chủ
omniroute contexts remove 192-168-0-15 --yes   # xóa context cục bộ (ngay cả khi đang hoạt động → quay về default), không hỏi xác nhận
```

> `--yes` khiến `contexts remove` chạy không tương tác (bắt buộc trong script/CI; nếu không có
> tùy chọn này, shell không tương tác sẽ từ chối một cách an toàn thay vì bị treo). Khi xóa
> context **đang hoạt động**, hệ thống sẽ tự động quay về `default`.

---

## Ghi chú bảo mật

- Token dạng văn bản thuần chỉ được hiển thị một lần; chỉ hàm băm SHA-256 được lưu trữ (tương tự như khóa API).
- `omniroute connect` sử dụng lại cơ chế khóa khi đăng nhập do thử sai quá nhiều lần cùng chức năng ghi nhật ký kiểm tra.
- Nên ưu tiên HTTPS hoặc Tailnet cho phương thức truyền tải; máy chủ không kèm giao thức sẽ mặc định dùng `http://`
  để thuận tiện cho LAN/Tailscale — hãy truyền URL `https://…` đầy đủ để sử dụng TLS.
- Tệp ngữ cảnh cục bộ được ưu tiên là `~/.omniroute/config.json` (`chmod 600`),
  chỉ chứa một `credentialRef`; bản thân token được lưu trong kho khóa của hệ điều hành
  (`keytar`) và không bao giờ được in trong nhật ký. Các bản cài đặt không giao diện không có
  kho khóa gốc hoạt động sẽ sử dụng chính tệp `0600` đó làm phương án dự phòng rõ ràng và
  đưa ra cảnh báo một lần. Sử dụng `omniroute contexts migrate --yes` sau khi cài đặt
  phần phụ trợ kho khóa.

---

## Điểm cuối API (tham khảo)

| Phương thức | Tuyến                 | Xác thực         | Phạm vi                                  |
| ----------- | --------------------- | ---------------- | ---------------------------------------- |
| POST        | `/api/cli/connect`    | mật khẩu quản lý | — (công khai, được bảo vệ bằng mật khẩu) |
| GET         | `/api/cli/whoami`     | token truy cập   | đọc                                      |
| GET         | `/api/cli/tokens`     | token truy cập   | quản trị                                 |
| POST        | `/api/cli/tokens`     | token truy cập   | quản trị                                 |
| DELETE      | `/api/cli/tokens/:id` | token truy cập   | quản trị                                 |

Xem [openapi.yaml](../openapi.yaml) để biết đầy đủ các lược đồ.
