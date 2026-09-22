# Cursor Provider in Docker Environments (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Khi OmniRoute chạy bên trong Docker, các luồng **Nhập từ Cursor IDE** /
`cursor-agent` cũ sẽ thất bại vì container không thể truy cập bản cài đặt Cursor
trên máy chủ. Thay vào đó, hãy sử dụng **Đăng nhập bằng Cursor** (PKCE deep-control).

## Tại sao nhập từ IDE / CLI thất bại trong Docker

1. **Cô lập hệ thống tệp** — Tính năng tự động nhập tìm kiếm các đường dẫn Linux như
   `~/.config/Cursor/User/globalStorage/state.vscdb` _bên trong_ container.
   Trên Docker Desktop dành cho macOS, cơ sở dữ liệu IDE của máy chủ không được gắn kết theo mặc định và
   hệ điều hành của container là Linux ngay cả khi máy chủ là Darwin.
2. **Không có tệp nhị phân `cursor-agent`** — Các image OmniRoute chính thức không đi kèm
   `cursor-agent`. Trước đây, Mô hình khả dụng gọi
   `cursor-agent --list-models` qua shell và quay về danh mục tĩnh khi thất bại.
3. **Sai tệp nhị phân** — **Không** bind-mount `cursor-agent` dành cho macOS vào một
   container Linux. Tệp này sẽ không thể thực thi.

## Khuyến nghị: Đăng nhập bằng Cursor

1. Mở **Bảng điều khiển → Nhà cung cấp → Cursor**.
2. Chọn tab **Đăng nhập bằng Cursor**.
3. Nhấp vào **Đăng nhập bằng Cursor** — OmniRoute sẽ mở
   `https://cursor.com/loginDeepControl?…` trong trình duyệt trên **máy chủ** của bạn.
4. Phê duyệt đăng nhập trong trình duyệt, sau đó quay lại bảng điều khiển. OmniRoute
   thăm dò `api2.cursor.sh/auth/poll` cho đến khi nhận được token.
5. OmniRoute lưu trữ cả token **truy cập + làm mới** và làm mới chúng thông qua
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Quy trình này không yêu cầu Cursor IDE hoặc `cursor-agent` bên trong container.

## Khám phá mô hình

Với một kết nối đã đăng nhập, **Mô hình khả dụng / Tự động đồng bộ** ưu tiên danh mục
HTTP `AiService/AvailableModels` của Cursor bằng token bearer của kết nối.
Nếu thao tác đó thất bại, OmniRoute vẫn thử `cursor-agent` trên máy chủ (khi có), sau đó
sử dụng dữ liệu khởi tạo từ registry tĩnh.

OmniRoute luôn hiển thị **`auto`** trong danh mục (tên hiển thị “Auto”), cùng với
các chế độ bộ định tuyến theo phong cách OpenCodex là **`auto-cost`**, **`auto-balance`** và
**`auto-intelligence`**. Khi truyền trên giao thức, chúng ánh xạ tới mô hình `default` của Cursor
(với một `optimization` ModelParameter cho ba biến thể). Nên ưu tiên
`cu/auto` khi các mô hình cao cấp đã hết hạn mức sử dụng — Auto thường vẫn còn ngân sách.

### Danh mục trực tiếp là danh mục độc quyền sau khi đồng bộ

Sau khi đồng bộ mô hình Cursor thành công (`cursor-agent --list-models` → danh mục
đã đồng bộ và được lưu trữ, hoặc yêu cầu tìm nạp `AvailableModels` đã xác thực bằng bearer ở trên),
**bảng điều khiển**, **`/v1/models`** và **Kiểm tra tất cả** sẽ liệt kê:

1. Các mô hình được trả về từ lần đồng bộ trực tiếp
2. Các id bộ định tuyến tự động được chèn: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Các mô hình **tùy chỉnh** của người vận hành (Nhập / thủ công) — không bao giờ bị loại bỏ khi đồng bộ

Registry tĩnh lớn tại
`open-sse/config/providers/registry/cursor/` **chỉ dùng làm phương án dự phòng ngoại tuyến**. Khi
danh mục đã đồng bộ trống (hoặc quá trình khám phá thất bại), danh sách sẽ quay về sử dụng registry đó.

Các id có hậu tố mức độ nỗ lực (ví dụ `claude-4.6-sonnet-high`) vẫn có thể được
**yêu cầu** trong thời gian chạy: `resolveRequestedModel` loại bỏ hậu tố để tạo thành một
`ModelParameter` truyền trên giao thức. Danh sách độc quyền cố ý ẩn các biến thể tĩnh đó
khỏi Kiểm tra tất cả để các phép thăm dò khớp với những gì Cursor thực sự trả về là khả dụng.

### Hàm hỗ trợ

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — hợp nhất trên bảng điều khiển
- `ensureCursorAutoCatalogEntry` — chèn auto* khi khám phá + liệt kê
- `shouldSuppressStaticModelForExclusiveListing` — vòng lặp tĩnh của `/v1/models`

## Giới hạn của nhà cung cấp (hạn ngạch)

**Mức sử dụng → Giới hạn nhà cung cấp** cho Cursor sử dụng các API Bearer trên `api2.cursor.sh`
(`GetCurrentPeriodUsage` → tóm tắt mức sử dụng → auth/usage) sau khi đăng nhập PKCE hoặc nhập
token. Đường dẫn bảng điều khiển cookie/`cursor.com` cũ vẫn được giữ làm phương án dự phòng cuối cùng
cho các phiên cũ được nhập từ IDE.

Các cửa sổ thường bao gồm **Tổng cộng**, **Auto + Composer** và **API**. Nếu
các giới hạn hiển thị trống, hãy chạy lại **Đăng nhập bằng Cursor** hoặc nhập lại token (chỉ nhập từ IDE
không còn là yêu cầu bắt buộc).

## Lượt trống / hết hạn mức sử dụng

Khi Cursor chấp nhận một Run nhưng không trả về văn bản của trợ lý (thường xảy ra khi
đã dùng hết hạn mức cao cấp), OmniRoute trả về lỗi **429** có thể xử lý (kèm dấu hiệu về hạn ngạch) hoặc
**502** kèm hướng dẫn — thay vì chỉ có “Nhà cung cấp trả về nội dung trống”. Các lỗi
phát trực tuyến như `not_found: AI Model Not Found` (đã dùng hết cửa sổ hạn mức)
được phân loại là **Đã vượt quá giới hạn tốc độ / hạn mức sử dụng của Cursor** và thông báo đó
được giữ nguyên xuyên suốt pipeline SSE (cơ chế bảo vệ luồng trống dùng chung không ghi đè
lỗi đã được phát ra). Hãy kiểm tra Giới hạn nhà cung cấp, thử mô hình **`auto`** hoặc tăng
giới hạn gói Cursor.

## Phiên bản máy khách (headless)

Khi không có bản cài đặt `cursor-agent` cục bộ, OmniRoute xác định
`x-cursor-client-version` thông qua biến môi trường `CURSOR_AGENT_CLI_VERSION`, sau đó là kết quả thu thập
từ tập lệnh cài đặt Cursor được lưu vào bộ nhớ đệm trên đĩa, rồi đến một build id được ghim. Ghi đè bằng
`CURSOR_AGENT_CLI_VERSION` khi cần.

## Phương án dự phòng: Nhập token thủ công

Nếu bạn không thể hoàn tất đăng nhập qua trình duyệt:

1. Trên máy chủ, trích xuất token từ `state.vscdb` của Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Mở **Nhập token** trong hộp thoại xác thực Cursor.
3. Dán **Token truy cập** và, khi có, **Token làm mới** (bắt buộc để
   tự động làm mới). ID máy là tùy chọn.

Các lượt nhập chỉ có token truy cập vẫn hoạt động nhưng sẽ hết hạn nếu không có token làm mới —
hãy nhập lại khi tính năng trò chuyện trả về lỗi xác thực.

## Liên quan

- Hướng dẫn Docker cho Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Tài liệu tham khảo bên ngoài về đăng nhập Cursor của OpenCodex:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
