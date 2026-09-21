# Radar Free-Model Catalog (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Nguồn chuẩn:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Cập nhật lần cuối:** 2026-09-01 — v3.8.51
> **Phạm vi bằng chứng về dịch vụ được lưu trữ:** các quy tắc phía máy chủ được mô tả tại đây đã được xác minh vào
> 2026-09-01 đối với máy chủ Radar riêng tư có chủ đích tại bản sửa đổi chính xác
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Phần triển khai đó không được phân phối trong
> kho lưu trữ OSS này; khả năng cung cấp của dịch vụ được lưu trữ vẫn là một trạng thái vận hành riêng biệt.

Radar là một **tiện ích bổ sung tùy chọn** phủ một danh mục mô hình miễn phí được tuyển chọn mới,
có chữ ký lên trên đường cơ sở của bản phát hành (`FREE_MODEL_BUDGETS` trong
`open-sse/config/freeModelCatalog.data.ts`). Tiện ích này tồn tại vì bối cảnh gói miễn phí thay đổi
nhanh hơn nhịp độ phát hành — các nhà cung cấp bổ sung, thu hẹp hoặc ngừng hạn ngạch miễn phí giữa
các bản phát hành, còn danh mục cơ sở chỉ có thể được làm mới khi một phiên bản mới được phát hành.

**Không có nội dung nào đang miễn phí hôm nay ngừng miễn phí vì nguồn cấp dữ liệu từ xa.** Radar không bao giờ
đặt mục cơ sở sau tường phí; nó chỉ làm mới các trường giới hạn/trạng thái tại thời điểm đọc và có thể
bổ sung theo lớp các mô hình miễn phí mới được phát hiện giữa các bản phát hành. Người vận hành vẫn có thể ẩn
một mô hình cục bộ và có thể khôi phục mô hình đó từ cùng bảng điều khiển. Bản thân danh mục cơ sở
không bao giờ bị sửa đổi trên đĩa — xem
[Quy tắc hợp nhất lớp phủ tại thời điểm đọc](#read-time-overlay-merge-rules) bên dưới.

---

## Trạng thái cung cấp trong v3.8.51

Trạng thái sau đây phân biệt những gì bản phát hành OSS này triển khai với các luồng công việc Radar
về sau. Đây là trạng thái ở cấp độ mã nguồn, không phải lời hứa rằng một môi trường triển khai được lưu trữ cụ thể
hoặc một tích hợp bên ngoài hiện đang khả dụng.

| Khu vực                            | Trạng thái trong bản phát hành này                                                                                                                                                                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máy khách danh mục có chữ ký       | Được triển khai phía sau `RADAR_ENABLED`, với cơ chế đồng ý riêng biệt, xác minh Ed25519, cài đặt/bộ nhớ đệm cục bộ được mã hóa, các tùy chỉnh hiển thị/kích hoạt bền vững, dấu xóa có thể đảo ngược, bộ lập lịch và bảng điều khiển.                                                  |
| Kích hoạt cộng tác viên            | Bảng điều khiển liên kết đến luồng xác nhận GitHub do máy chủ lưu trữ và chấp nhận khóa `omr_…` hiện có. Điều kiện của cộng tác viên do dịch vụ riêng tư xác định; máy khách OSS không chứa token GitHub hoặc logic cấp phát.                                                          |
| Kích hoạt bằng khóa người ủng hộ   | Đã triển khai. Khóa thô được xác thực, mã hóa khi lưu trữ, che bớt khi đọc và chỉ được gửi bởi quá trình đồng bộ phía máy chủ. Việc thay đổi hoặc xóa khóa sẽ vô hiệu hóa cả bốn bộ nhớ đệm nguồn cấp phụ thuộc vào quyền lợi.                                                         |
| Liên kết giới thiệu                | Được triển khai dưới dạng nguồn cấp có chữ ký riêng biệt, được làm mới hàng giờ. Các liên kết cố định được cung cấp ngay cho cấp cộng đồng; các chiến dịch có giới hạn vẫn là dữ liệu cấp trực tiếp.                                                                                   |
| Ưu đãi dành cho người ủng hộ       | Được triển khai dưới dạng nguồn cấp trực tiếp riêng biệt có chữ ký và trang bảng điều khiển. Máy khách xác thực lại lược đồ quyền lợi đóng, bảo toàn bộ nhớ đệm hợp lệ gần nhất, lọc các mục hết hạn và gắn nhãn rõ ràng cho ưu đãi đối tác.                                           |
| Thông tin và ghi nhận người ủng hộ | Được triển khai dưới dạng nguồn cấp nghiêm ngặt, có chữ ký và chỉ hoạt động trực tiếp, với ELO do Radar sở hữu, thông tin thực tế về độ mới/xu hướng của danh mục, huy hiệu người ủng hộ cục bộ đã xác minh, trang bảng điều khiển và các lệnh trạng thái/đồng bộ CLI chỉ chạy cục bộ. |
| Thanh toán và email giao dịch      | Chưa được triển khai trong máy khách OSS. Việc mua hàng, quyên góp, xem xét biên nhận, khôi phục và gửi thư thuộc về dịch vụ riêng tư; khả năng cung cấp dịch vụ lưu trữ vẫn phụ thuộc vào việc triển khai có giám sát và cấu hình nhà cung cấp của dịch vụ đó.                        |
| Luồng công việc tác tử nghiên cứu  | Không thuộc bản phát hành máy khách này. Nội dung nguồn cấp được tuyển chọn vẫn là dữ liệu phía máy chủ; không có tác tử nghiên cứu tự động nào chạy trong một bản cài đặt OmniRoute.                                                                                                  |

---

## Trình đọc thông báo công khai

Trình đọc thông báo dùng chung tách biệt với cờ tính năng Radar. Trang chủ dashboard và
trình xem Changelog lấy tệp `news.json` công khai của kho lưu trữ thông qua một yêu cầu `GET` thuần túy tới
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Chúng không gửi bất kỳ cài đặt Radar, prompt, cấu hình
nhà cung cấp, bản ghi sử dụng hay trạng thái bỏ qua cục bộ nào.

`news.json` sử dụng schema v2 đóng được triển khai bởi `parseNewsPayload()`:

- `schemaVersion: 2` và tập hợp `items[]` có giới hạn;
- các giá trị `id` thông báo ổn định, duy nhất;
- các trường `active` và `publishedAt` theo ISO được khai báo rõ ràng;
- nội dung tiếng Anh bắt buộc cùng nội dung bản địa hóa tùy chọn;
- các liên kết HTTPS tùy chọn không yêu cầu thông tin xác thực và biểu tượng thuộc danh sách cho phép;
- lựa chọn mục đang hoạt động mới nhất trước, dự phòng ngôn ngữ về tiếng Anh và bỏ qua cục bộ theo từng ID.

Trình phân tích cú pháp tạm thời chấp nhận định dạng số ít trước đây `{ active, title, message, ... }` để
các fork cũ có thể chuyển đổi mà không làm hỏng chế độ xem Changelog. Các feed không hợp lệ sẽ không có tác dụng. Mục
khởi chạy Radar được phát hành với `active: false`; việc đổi thành `true` là một hành động phát hành riêng biệt
sau khi hợp nhất và triển khai, đồng thời không thay đổi `RADAR_ENABLED` hoặc lựa chọn đồng bộ feed độc lập.

---

## Cờ: `RADAR_ENABLED` (mặc định tắt)

Radar được kiểm soát xuyên suốt bởi cờ tính năng `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, danh mục `policies`,
`defaultValue: "false"`).

**Khi cờ bị tắt, bề mặt tính năng không tồn tại:**

- Tất cả endpoint `/api/radar/*`, bao gồm việc đọc và ghi trạng thái mô hình cục bộ,
  trả về `404` trước khi truy cập bất kỳ mô-đun Radar nào.
- Các màn hình dashboard (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) hiển thị
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) trả về đường cơ sở không bị thay đổi —
  cùng số lượng mục, cùng giá trị, mọi mục đều được gắn `origin: "baseline"` — và không bao giờ
  đọc bộ nhớ đệm feed.
- Không có lệnh gọi mạng Radar nào được thực hiện; mỗi mô-đun đồng bộ trả về `{ status: "disabled" }`
  trước khi truy cập `fetch`.

Đây là một cổng siêu tập hợp nghiêm ngặt: bật cờ chỉ mở khóa các _màn hình_, không
hơn. Việc này không tải dữ liệu lên, không bắt đầu đồng bộ nền và không thay đổi
định tuyến hay lựa chọn mô hình — hãy xem lựa chọn tham gia riêng biệt bên dưới.

---

## Đồng bộ dữ liệu là một lựa chọn tham gia RIÊNG BIỆT — cam kết về quyền riêng tư

Việc bật `RADAR_ENABLED` chỉ mở khóa giao diện người dùng. Đồng bộ feed yêu cầu lựa chọn tham gia thứ hai,
độc lập, được lưu trong `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migration `136_radar_cache_settings.sql`). `syncRadar()` kiểm tra cả cờ _và_ lựa chọn
tham gia trước khi thực hiện bất kỳ lệnh gọi mạng nào:

```
Cờ tắt               → { status: "disabled" }   — không có lệnh gọi mạng
Không chọn tham gia  → { status: "opt_out" }    — không có lệnh gọi mạng
```

Khi cả hai đều được bật, luồng đồng bộ là:

1. `GET <feed base URL>/v1/catalog/latest` với `x-omniroute-radar-schema: 2` và header
   `Authorization: Bearer <supporter key>` tùy chọn (xem bên dưới). Khi không có header schema, máy chủ mặc định
   sử dụng cấu phần chuyển tiếp v1 được ký riêng, nhờ đó các máy khách cũ đã cài đặt vẫn tiếp tục
   nhận được bản cập nhật.
2. Đây là luồng ứng dụng chỉ tải xuống, nhưng vẫn là một yêu cầu HTTPS. Cơ sở hạ tầng
   được lưu trữ nhận siêu dữ liệu kết nối thông thường, chẳng hạn như địa chỉ IP nguồn. Khi supporter
   key được cấu hình, quá trình đồng bộ cũng gửi key đó trong header Bearer để dịch vụ có thể xác định
   quyền lợi. Tại đúng bản sửa đổi máy chủ riêng được xác định trong ranh giới bằng chứng ở trên,
   việc thống kê yêu cầu feed sử dụng hash của key, dữ liệu sử dụng tổng hợp và HMAC rút gọn xoay vòng hằng ngày
   của IP để phục vụ việc xem xét lạm dụng thủ công; các bảng đó không lưu key hay IP ở dạng thô.
   Nhật ký truy cập cơ sở hạ tầng và hộp thư đi phân phối được mã hóa là các ranh giới vận hành
   riêng biệt.
3. OmniRoute không bao giờ gửi prompt, phản hồi, cuộc trò chuyện, thông tin xác thực của nhà cung cấp, lưu lượng mô hình,
   thời gian hoạt động, độ trễ hoặc cấu hình nhà cung cấp cục bộ tới dịch vụ Radar.
4. Phản hồi được xác minh, kiểm tra tính hợp lệ và lưu vào bộ nhớ đệm cục bộ (xem
   [Mô hình bảo mật](#security-model)). Radar có đúng bốn đường dẫn mạng phía máy chủ:
   `syncRadar()` cho danh mục, `syncRadarReferrals()` cho giới thiệu và
   `syncRadarOffers()` / `syncRadarIntel()` cho ưu đãi và Intel chỉ dành cho người ủng hộ.

**Supporter key** là một Bearer token tùy chọn (`radar_settings.supporter_key`)
cho phép dịch vụ feed quyết định cấp nào sẽ được cung cấp (xem
[Các cấp](#tiers-community-and-live)). Key này:

- Được lưu trữ **ở trạng thái nghỉ dưới dạng mã hóa** bằng cùng các helper AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) được dùng cho thông tin xác thực của nhà cung cấp.
- Được đặt thông qua `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) và
  **không bao giờ được trả lại nguyên dạng** — phản hồi trả về dạng đã che (`omr_****abcd`).
- Việc thay đổi hoặc xóa key sẽ vô hiệu hóa nguyên tử các bộ nhớ đệm danh mục, giới thiệu, ưu đãi và Intel. Lần
  đồng bộ/đọc tiếp theo sẽ xác định quyền lợi mới ở phía máy chủ; việc lưu key tự nó không
  tạo yêu cầu mạng hoặc sử dụng key kích hoạt dùng một lần.
- Được gửi tới dịch vụ feed dưới dạng Bearer token trong yêu cầu GET đồng bộ — không có thông tin nào khác về
  key rời khỏi máy khách.

---

## Quy tắc truy cập và an toàn được hiển thị trước khi chọn tham gia

Bảng điều khiển chưa kích hoạt hiển thị các quy tắc này từ
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **trước** một trong hai thao tác kích hoạt.
Thang truy cập chuẩn là:

| Cấp độ                       | Điều kiện đủ                                                                                   | Quyền truy cập                                          | Quy tắc lặp lại/hết hạn                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Cộng đồng                    | Bất kỳ ai; không cần khóa                                                                      | Toàn bộ danh mục bị trì hoãn khoảng 30 ngày             | Luôn khả dụng; không cấp phát                                               |
| Gắn sao + theo dõi           | GitHub OAuth xác minh cả việc gắn sao cho kho lưu trữ và theo dõi chủ sở hữu                   | Một lần đọc danh mục trực tiếp, sau đó về Cộng đồng     | Một lần cấp phát cho mỗi lượt đăng nhập; không bao giờ cấp lại              |
| Cộng tác viên Top 10         | Vị trí 1–10 trong bảng xếp hạng tuần hoàn chỉnh gần nhất                                       | 365 ngày trực tiếp                                      | Yêu cầu nhận khi cần; việc rời bảng xếp hạng không rút ngắn thời hạn đã cấp |
| Cộng tác viên Top 100        | Vị trí 11–100 trong bảng xếp hạng đó                                                           | 90 ngày trực tiếp                                       | Áp dụng cùng quy tắc yêu cầu nhận theo nhu cầu/đảm bảo tính lũy đẳng        |
| Gói mua của người ủng hộ     | Mua một lần cho thời hạn 6 tháng, 1 năm hoặc trọn đời                                          | Danh mục trực tiếp, ưu đãi trực tiếp có chữ ký và Intel | Không tự động gia hạn                                                       |
| Khoản quyên góp/cấp thủ công | Khoản quyên góp được chủ sở hữu xét duyệt hoặc do chủ sở hữu cấp trong số ngày cụ thể/trọn đời | Cùng quyền truy cập trực tiếp trong thời hạn được cấp   | Việc cấp được kiểm tra và đảm bảo tính lũy đẳng                             |

Các PR đã hợp nhất, commit và số dòng thay đổi **chỉ là dữ liệu đầu vào cho bảng xếp hạng**. Một lượt đăng nhập ngoài Top 100 sẽ
không nhận được quyền dành cho cộng tác viên, bất kể số lượng PR. Các gói mua có thời hạn, khoản quyên góp, thời hạn dành cho cộng tác viên và
quyền cấp thủ công được cộng dồn từ ngày hết hạn hiện tại; quyền trọn đời được ưu tiên cao nhất. Thay đổi thứ hạng không bao giờ
thu hồi hoặc rút ngắn hồi tố thời gian đã được cấp.

Giấy phép được lưu trữ trên máy chủ dành cho cá nhân và quy tắc hiển thị cho người dùng là mỗi lần chỉ được có một bản cài đặt đang hoạt động. Bản phát hành này
**không** tuyên bố có khóa phần cứng: quá trình đồng bộ OSS không lấy dấu vân tay phần cứng hoặc duy trì
hợp đồng thuê thiết bị bằng mật mã. Ở bản sửa đổi máy chủ riêng đã được xác minh nêu trên, biện pháp thực thi đã triển khai
là xác thực quyền truy cập cùng với tín hiệu yêu cầu xem xét thủ công khi cùng một khóa trực tiếp được ghi nhận từ địa chỉ IP riêng biệt thứ tư
trong vòng 24 giờ. Tín hiệu đó không bao giờ tự động chặn hoặc thu hồi khóa. Quá trình khôi phục
thu hồi và thay thế khóa bị mất trong khi giữ nguyên ngày hết hạn hiện có; quá trình này không khởi động lại
thời hạn đã mua hoặc được cấp.

Các ưu đãi trực tiếp được tuyển chọn thủ công và có thể thay đổi hoặc hết hạn. Màn hình chọn tham gia cũng nêu rõ
ranh giới quyền riêng tư chính xác: siêu dữ liệu danh mục/giới thiệu có chữ ký được tải xuống; khóa hợp lệ còn mở khóa
các ưu đãi có chữ ký và Intel; khóa Bearer và siêu dữ liệu kết nối thông thường được gửi đến dịch vụ lưu trữ;
các prompt, phản hồi, cuộc hội thoại, thông tin xác thực của nhà cung cấp, lưu lượng mô hình, thời gian hoạt động, độ trễ và cấu hình
nhà cung cấp cục bộ thì không.

---

## Nhận khóa người ủng hộ

Màn hình kích hoạt (`/dashboard/radar`) liên kết đến hai quy trình để **nhận** khóa
người ủng hộ. Bản thân kho lưu trữ OSS không bao giờ phát hành khóa, không bao giờ chạy mã thanh toán và
**không bao giờ nêu giá** — giá được quyết định và hiển thị hoàn toàn trên các
trang đích, không phải trong kho lưu trữ này (quyết định đặc tả D14).

- **"Tôi là người đóng góp"** — mở `RADAR_CONTRIBUTOR_CLAIM_URL` (mặc định
  `https://radar.omniroute.online/auth/github`), một quy trình yêu cầu quyền lợi qua GitHub OAuth được lưu trữ trên
  máy chủ Radar riêng tư. Quy trình này kiểm tra bảng xếp hạng hoàn chỉnh mới nhất theo tuần: Top 10 nhận được 365 ngày
  và các vị trí 11–100 nhận được 90 ngày. Ngoài Top 100, số lượng PR không bao giờ cấp quyền truy cập; thay vào đó,
  quy trình sẽ kiểm tra cấp độ dùng một lần riêng biệt dựa trên việc đánh dấu sao + theo dõi.
- **"Ủng hộ dự án"** — mở `RADAR_SUPPORTER_PLANS_URL` (mặc định
  `https://radar.omniroute.online/planos`), trang được lưu trữ dành cho các tùy chọn thanh toán một lần gồm 6 tháng, 1 năm và
  trọn đời. Trang OSS vẫn không hiển thị bất kỳ giá trị tiền tệ nào.

Cả hai URL đều được phân giải phía máy chủ (`src/lib/radar/links.ts`, cùng mẫu ghi đè bằng biến môi trường
như `RADAR_FEED_URL`) và được chuyển tiếp đến bảng điều khiển thông qua phản hồi
`GET /api/radar/settings` hiện có (`contributorClaimUrl`, `supporterPlansUrl`) — thành phần
máy khách không bao giờ tự đọc `process.env`.

| Biến                          | Mục đích                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Ghi đè URL yêu cầu quyền lợi dành cho người đóng góp (mặc định `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Ghi đè URL các gói dành cho người ủng hộ (mặc định `https://radar.omniroute.online/planos`).                  |

### Khôi phục khóa người ủng hộ bị mất

Điểm truy cập khôi phục của dịch vụ được lưu trữ là `https://radar.omniroute.online/recover`; liên kết này cũng
có trên trang các gói. Việc khôi phục vẫn diễn ra hoàn toàn bên ngoài máy khách OSS vì bản cài đặt cục bộ
không bao giờ nhận được e-mail của người mua/người đóng góp và không thể tái tạo khóa thô từ
các cài đặt đã mã hóa.

1. Gửi e-mail được liên kết với khóa. Dịch vụ trả về cùng một trang xác nhận tiếp nhận bất kể
   có giấy phép có thể khôi phục hay không, vì vậy biểu mẫu không làm lộ danh sách tài khoản.
2. Nếu đủ điều kiện, tiến trình giao nhận sẽ gửi một liên kết dùng một lần có thời hạn ngắn. Khi mở, liên kết này lập tức chuyển
   token vào cookie `HttpOnly`/`Secure` tạm thời đã mã hóa và chuyển hướng đến URL
   `/recover` sạch; trang không chứa token, e-mail, khóa cũ hay khóa thay thế.
3. Xác nhận việc thu hồi. Dịch vụ riêng tư sẽ thu hồi khóa trước đó, tạo khóa thay thế với
   cùng gói/ngày hết hạn và xếp khóa đó vào hàng đợi gửi e-mail trong một giao dịch. Khóa thay thế không bao giờ
   được trả về trình duyệt.
4. Dán khóa thay thế vào `/dashboard/radar`. Khóa cũ lúc này phải hạ xuống `community`;
   khóa thay thế phải tạo ra một lần đồng bộ `live` đã xác minh. Việc mở lại cùng liên kết khôi phục phải thất bại với
   phản hồi chung chung cho biết liên kết không hợp lệ/đã hết hạn.

Tuyến khôi phục được lưu trữ và tiến trình thư có thể hiện diện trong mã nhưng vẫn không khả dụng trong một
bản triển khai cụ thể. Không được coi quy trình là sẵn sàng cho môi trường sản xuất cho đến khi máy chủ đã được triển khai, nhà cung cấp
dịch vụ gửi thư đã được cấu hình với người nhận được kiểm soát và toàn bộ liên kết dùng một lần đã được kiểm thử.

Khi khách truy cập đã có khóa (`omr_` + 40 ký tự hex), màn hình kích hoạt
(`src/app/(dashboard)/dashboard/radar/page.tsx`) cung cấp ô nhập để dán khóa làm phương thức
chính: việc dán khóa và gửi sẽ thực hiện `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) trong một lần gọi — dán khóa vừa thiết lập khóa vừa đăng ký tham gia,
qua đó mở khóa màn hình. Định dạng (`omr_` + 40 ký tự hex) trước tiên được kiểm tra phía máy khách
bằng hàm trợ giúp dùng chung `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
như một tiện ích UX; trong mọi trường hợp, schema Zod của máy chủ vẫn là bước kiểm tra có thẩm quyền. Sau khi
khóa được thiết lập, màn hình kích hoạt sẽ hiển thị dạng đã che (`supporterKeyMasked` từ
`GET /api/radar/settings`) thay vì ô nhập trống, cùng với nút điều khiển "thay đổi khóa" để
dán khóa mới — khóa thô không bao giờ được hiển thị lại. Hai nút yêu cầu quyền lợi/các gói ở trên
vẫn là cách để _nhận_ khóa ngay từ đầu; ô nhập này là nơi người vận hành
đã có khóa kích hoạt khóa đó.

### Kích hoạt đầu cuối và thiết lập có hướng dẫn

Dịch vụ feed riêng tư và máy khách OSS này có một ranh giới được chủ ý giới hạn chặt chẽ: dịch vụ
phát hành và xác thực khóa người ủng hộ, trong khi bản cài đặt OmniRoute cục bộ mã hóa khóa,
đồng bộ các tạo tác đã ký ở phía máy chủ và hướng dẫn thiết lập nhà cung cấp. Thứ tự xác thực có hỗ trợ là:

1. Lấy khóa mới được cấp hoặc đã khôi phục từ quy trình xác nhận dành cho người đóng góp, plans/checkout, quy trình
   khôi phục, hoặc từ một đơn vị vận hành máy chủ riêng được ủy quyền. Không dán khóa thô vào nhật ký,
   ảnh chụp màn hình, bình luận trong issue hoặc đối số dòng lệnh.
2. Bật cờ tính năng `RADAR_ENABLED` trên bản cài đặt OmniRoute cục bộ. Thao tác này hiển thị giao diện người dùng
   nhưng vẫn không hoạt động trên mạng cho đến khi tùy chọn đồng ý riêng biệt được lưu.
3. Mở `/dashboard/radar`, dán khóa và kích hoạt. Trình duyệt gửi một yêu cầu cục bộ
   `POST /api/radar/settings` với `{ optIn: true, supporterKey }`; khóa được mã hóa cục bộ và
   phản hồi chỉ chứa `omr_****<last4>`.
4. Để màn hình kích hoạt chạy quá trình đồng bộ danh mục, hoặc chọn **Đồng bộ ngay**. Xác nhận rằng trang
   hiển thị `live`, phiên bản nguồn cấp dữ liệu và thời gian tìm nạp. Để chẩn đoán cục bộ có xác thực,
   `GET /api/radar/status` báo cáo trạng thái đồng ý/sự hiện diện của khóa và bốn trạng thái bộ nhớ đệm mà không trả về
   khóa. `POST /api/radar/sync-all` có thể làm mới rõ ràng danh mục, lượt giới thiệu, ưu đãi và Intel.
5. Mở `/dashboard/radar/setup?provider=<provider>`. Truy cập URL thông tin xác thực do nhà cung cấp quản lý,
   chọn **Thêm khóa API**, lưu thông qua biểu mẫu thực tế của nhà cung cấp, quay lại hướng dẫn và chạy
   **Kiểm tra kết nối**. Hướng dẫn sử dụng các tuyến `/api/providers` và
   `/api/providers/<connection-id>/test` thông thường; hướng dẫn không tạo thông tin xác thực Radar song song.
6. Mở `/dashboard/radar/combos` sau khi ít nhất hai kết nối nhà cung cấp tương thích đang hoạt động.
   Xem xét nhóm được đề xuất và tạo combo thông qua API combo hiện có. Ưu đãi và
   Intel vẫn là các bộ nhớ đệm đã ký chỉ dành cho dữ liệu trực tiếp, riêng biệt và có thể được kiểm tra trên các trang Radar chuyên biệt tương ứng.
7. Tải lại `/dashboard/radar` và trang thiết lập. Trạng thái đồng ý, trạng thái khóa đã che, bộ nhớ đệm đã xác minh, kết nối
   nhà cung cấp đã lưu và thao tác kiểm tra phải được duy trì sau khi tải lại. Chỉ thu thập bằng chứng sau khi
   khóa thô và thông tin xác thực của nhà cung cấp không còn hiển thị.

Việc lưu khóa tự nó không chứng minh quyền truy cập trực tiếp. Bằng chứng là sự kết hợp giữa kết quả
`GET /v1/license/check` của dịch vụ riêng, tầng `live` do danh mục OSS cung cấp, bộ nhớ đệm đã ký
được xác minh và quy trình kết nối/kiểm tra nhà cung cấp thực tế. Khóa không hợp lệ, hết hạn hoặc bị thu hồi sẽ
hạ cấp danh mục về `community` một cách an toàn; trường hợp này không được báo cáo là xác thực khóa trực tiếp thành công.

### Liên kết bảng quản trị riêng

`RADAR_ADMIN_URL` tùy chọn thêm **Quản trị Radar ↗** ngay sau mục Radar dành cho người dùng
trong phần Chi phí của thanh bên. Biến này được chủ ý không đặt giá trị mặc định: khi biến
không được đặt hoặc không hợp lệ, thanh bên tĩnh, bảng lệnh và màn hình tùy chỉnh thanh bên sẽ không chứa
mục quản trị hoặc URL riêng nào.

Giá trị được phân giải ở phía máy chủ và chỉ được chuyển tiếp qua phản hồi
`GET /api/settings` có xác thực quản lý đến một phiên bảng điều khiển đã xác thực, hoặc đến chủ sở hữu
loopback đáng tin cậy trong quá trình khởi tạo cục bộ không cần đăng nhập. Xác thực bằng khóa API thuộc CLI, dịch vụ nội bộ
và phạm vi quản lý không nhận được giá trị này. Trình duyệt xác thực lại phản hồi trước khi tạo
liên kết bên ngoài, liên kết này được mở với `noopener noreferrer`.

Sử dụng URL HTTPS của tunnel/tailnet không chứa thông tin xác thực. HTTP thuần túy chỉ được chấp nhận cho chuyển tiếp SSH qua loopback,
chẳng hạn như `http://127.0.0.1:9351`; các scheme khác, thông tin xác thực được nhúng, URL không đúng định dạng và
đích HTTP từ xa đều bị từ chối theo cơ chế đóng an toàn và khiến điều hướng không hoạt động.

---

## Mô hình bảo mật

### Chữ ký Ed25519 trên chính xác các byte

Payload của feed được ký bằng Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) xác minh chữ ký trên **chính xác các byte phản hồi**
nhận được qua đường truyền — payload không bao giờ được tuần tự hóa lại trước khi xác minh, vì vậy
việc mã hóa lại theo từng byte không thể âm thầm làm mất hiệu lực hoặc bỏ qua bước kiểm tra chữ ký.
Nếu xác minh thất bại (`invalid_signature`), quá trình đồng bộ sẽ bị hủy trước khi payload
được phân tích cú pháp hoặc lưu vào bộ nhớ đệm.

### Khóa công khai được ghim + luân chuyển

Khóa công khai dùng để xác minh được ghim trong `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), dưới dạng một mảng để có thể thêm khóa mới vào đầu trước khi
luân chuyển, trong khi các feed cũ trong bộ nhớ đệm được ký bằng khóa trước đó vẫn hợp lệ cho đến khi
được đồng bộ lại.

### Ghi đè bằng biến môi trường, thân thiện với các bản fork

Hai biến môi trường cho phép các bản fork và bên tự lưu trữ trỏ máy khách đến feed riêng thay vì
dịch vụ OmniRoute mặc định — xem
[Cách tự lưu trữ feed](#how-to-self-host-a-feed) bên dưới:

| Biến                | Mục đích                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Ghi đè URL cơ sở của feed (mặc định `https://radar.omniroute.online`).                                                |
| `RADAR_FEED_PUBKEY` | Ghi đè khóa công khai được ghim (SPKI DER mã hóa base64 hoặc PEM), thay thế mảng tích hợp sẵn bằng khóa duy nhất này. |

### Ngưỡng phiên bản tối thiểu

`syncRadar()` từ chối feed đã tải xuống nếu `version` của feed không mới hơn một cách nghiêm ngặt so với
phiên bản hiện đang được lưu trong bộ nhớ đệm (so sánh `compareVersions()` theo định dạng phân tách bằng dấu chấm `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Điều này ngăn một điểm cuối feed bị xâm phạm hoặc cấu hình sai
hạ cấp máy khách xuống một payload cũ hơn, được ký bằng chữ ký khác.

### Hai ngày tháng và lý do giữ lại cả hai

Một feed trong bộ nhớ đệm mang hai ngày tháng riêng biệt, và mục đích của việc
giữ lại cả hai chính là để tránh nhầm lẫn giữa chúng:

| Trường        | Nguồn gốc                   | Cho biết                                 |
| ------------- | --------------------------- | ---------------------------------------- |
| `generatedAt` | phần thân feed đã ký        | **dữ liệu** đã cũ đến mức nào            |
| `fetchedAt`   | đồng hồ của bản cài đặt này | bản cài đặt này đã **tải xuống** khi nào |

Một feed được tải xuống cách đây vài phút vẫn có thể chứa các số liệu cũ hàng tuần, vì vậy chỉ riêng `fetchedAt` không thể
cho người vận hành biết lớp phủ có mới hơn dữ liệu cơ sở mà nó nằm trên hay không. Cả hai đều
được lưu trong `radar_feed_cache`, được trả về bởi `getRadarCatalog().meta`, và được báo cáo
riêng biệt bởi `GET /api/radar/status`. Một hàng được lưu vào bộ nhớ đệm trước khi cột `generated_at`
tồn tại (migration 163) sẽ được đọc lại dưới dạng `null` — giá trị chưa biết vẫn là chưa biết thay vì
mượn thời điểm tải xuống. `radar_referrals_cache` đã lưu `generated_at` riêng kể từ
migration 142.

Ngưỡng phiên bản tối thiểu ở trên so sánh `version`, không phải một trong hai ngày tháng.

Vẫn còn hai khoảng trống, và cả hai đều là chủ ý: bảng điều khiển vẫn chỉ hiển thị `Last fetched`, vì vậy việc đọc
ngày tạo bản dựng tại đó cần một nhãn mới (cùng 41 mục bản địa hóa tương ứng); còn các bộ nhớ đệm offers và intel
hoàn toàn không lưu ngày tạo bản dựng, dù schema feed của chúng có chứa ngày này — do đó `GET
/api/radar/status` bỏ qua trường này đối với hai loại đó thay vì báo cáo một giá trị `null`
có thể được hiểu là "chưa biết".

### Xác thực schema

Các byte đã tải xuống được phân tích cú pháp và xác thực theo `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, một schema Zod) **sau khi** xác minh chữ ký. Nếu
schema không khớp, hệ thống trả về `{ status: "invalid_schema" }` và bộ nhớ đệm
không bị thay đổi. Payload trong bộ nhớ đệm được chủ động xác thực lại mỗi lần đọc
(`getRadarCatalog()`) — một hàng bộ nhớ đệm bị hỏng hoặc được chỉnh sửa thủ công sẽ dùng dữ liệu
cơ sở dự phòng thay vì được cung cấp.

### Giới hạn kích thước phản hồi (10 MB)

`syncRadar()` áp dụng **giới hạn cứng 10 MB** đối với phần thân phản hồi của feed — feed đã ký
là một tài liệu JSON có quy mô KB, vì vậy bất kỳ dữ liệu nào vượt quá mức này đều cho thấy một
`RADAR_FEED_URL` bị cấu hình sai hoặc có tính thù địch (hoặc một nguồn thượng nguồn đang cung cấp dữ liệu rác), chứ không phải một danh mục hợp lệ.
Việc thực thi gồm hai lớp:

1. Kiểm tra sơ bộ `Content-Length` sẽ bỏ qua hoàn toàn việc đọc phần thân khi
   header đã khai báo một giá trị vượt quá giới hạn.
2. Kiểm tra tổng lũy kế trong khi đọc phần thân sẽ áp dụng giới hạn ngay cả khi
   `Content-Length` không có hoặc khai báo thấp hơn kích thước thực — không bao giờ
   chỉ tin tưởng riêng header này. Việc nối các khối dữ liệu đã tích lũy sẽ bảo toàn chính xác
   các byte cần thiết cho bước kiểm tra chữ ký Ed25519 sau đó.

Việc vượt quá giới hạn sẽ trả về `{ status: "too_large" }` và giữ nguyên bộ nhớ đệm,
tuân theo cùng một nguyên tắc không phá hủy như mọi lỗi đồng bộ khác
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Các cấp: `community` và `live`

Lược đồ feed chứa trường `tier: "community" | "live"`, được dịch vụ feed quyết định
**ở phía máy chủ** dựa trên yêu cầu (sự hiện diện và tính hợp lệ của khóa người ủng hộ)
— client không bao giờ tự quyết định cấp của mình.

- **`community`** — danh mục miễn phí chậm hơn khoảng 30 ngày so với dữ liệu mới nhất.
  Đây là cấp mà yêu cầu không được xác thực hoặc có khóa không hợp lệ sẽ nhận được.
- **`live`** — danh mục mới nhất, được cung cấp cho các yêu cầu mang khóa người ủng hộ
  hợp lệ.

**Khóa người ủng hộ không hợp lệ hoặc đã hết hạn sẽ hạ xuống `community` — trường hợp này
không bao giờ là lỗi.** Luồng đồng bộ chỉ phân biệt các lỗi chữ ký/lược đồ/phiên bản (tất cả
đều có thể khôi phục, tất cả đều không gây ảnh hưởng nghiêm trọng đến trạng thái được lưu
trong bộ nhớ đệm) với kết quả thành công `{ status:
"updated", version, tier }`. Không có đường dẫn lỗi riêng theo cấp mà client cần
xử lý.

### Cấp được cung cấp đến từ header phản hồi, không phải phần thân đã ký

Trường `tier` trong **phần thân** feed đã ký luôn là `"live"` — dịch vụ feed phân phối
**hai artifact đã ký cho mỗi phiên bản**: live bao gồm các chiến dịch hiện tại còn community
thì loại bỏ chúng. Mỗi artifact được ký trên chính xác các byte của nó. Phần thân vẫn không
được dùng làm quyết định về quyền truy cập; cấp thực sự được chọn cho một yêu cầu được truyền
trong **header phản hồi `x-omniroute-feed-tier`**, do phía máy chủ quyết định dựa trên khóa
`Authorization` của yêu cầu.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) là nơi duy nhất
phân giải cấp mà client nên tin cậy:

1. Phân tích `x-omniroute-feed-tier` bằng `RadarTierSchema` (Zod) — header bị thiếu hoặc
   giá trị không chính xác là `"community"` hay `"live"` sẽ được xem là **không
   tồn tại** (không bao giờ được đưa nguyên trạng vào bộ nhớ đệm/UI như một giá trị đáng tin cậy;
   điều này cũng bao quát các máy chủ feed cũ có từ trước khi header này xuất hiện).
2. Chỉ dùng trường `tier` của phần thân đã ký (luôn là `"live"`) làm phương án dự phòng khi bước 1
   không cho kết quả.
3. Cấp đã phân giải là giá trị được lưu vào bộ nhớ đệm và trả về dưới dạng `{ status: "updated",
version, tier }` — đây là giá trị mà bảng điều khiển hiển thị, không bao giờ là trường thô
   trong phần thân.

---

## Quy tắc hợp nhất lớp phủ tại thời điểm đọc

`applyFeed()` (`src/lib/radar/applyFeed.ts`) hợp nhất feed được lưu trong bộ nhớ đệm **lên trên**
đường cơ sở tĩnh tại **thời điểm đọc**, bên trong `getRadarCatalog()`. Mảng đường cơ sở
(`FREE_MODEL_BUDGETS`) không bao giờ bị thay đổi — một `MergedEntry[]` mới được tính toán trong mỗi
lần gọi.

Bốn quy tắc, theo thứ tự ưu tiên:

1. **Feed không bao giờ ghi đè một tùy chỉnh cục bộ.** Theo từng trường: nếu người vận hành đã
   tùy chỉnh một trường trên mục (`localOverrides` map, với khóa `provider:modelId`),
   giá trị của feed cho trường cụ thể đó sẽ bị bỏ qua — giá trị của người vận hành được ưu tiên.
2. **`enabled: false` vô hiệu hóa mục và ghi lại nguồn gốc.** Một mục feed tắt
   một mục sẽ đặt `enabled: false` và `disabledBy: "radar"` trên kết quả đã hợp nhất,
   để UI có thể giải thích _tại sao_ một mục chuyển từ khả dụng sang bị vô hiệu hóa.
3. **Mục do người dùng thêm nhưng không có trong feed vẫn được giữ nguyên.** Các mục
   chỉ tồn tại trong đường cơ sở (hoặc được thêm cục bộ) và không có mục feed tương ứng
   sẽ được chuyển tiếp mà không thay đổi.
4. **Mục đã bị đánh dấu xóa không bao giờ được khôi phục.** Nếu người vận hành đã xóa rõ ràng một
   mục (`tombstones` set), việc feed thêm lại `provider:modelId` đó trong một
   phiên bản sau sẽ không khôi phục mục này.

Các trường có thể chỉnh sửa và tombstone được lưu bền vững trong
`radar_local_model_state` (migration `153_radar_local_model_state.sql`). Bộ điều hợp DB công khai
(`src/lib/db/radar.ts`) chuyển đổi các hàng này thành `localOverrides` map và
`tombstones` set được `applyFeed()` sử dụng; `getRadarCatalog()` trong môi trường production tải trạng thái đó
sau khi vượt qua các bước kiểm tra cờ, bộ nhớ đệm và lược đồ. Chỉ `displayName` và `enabled` là
người vận hành có thể chỉnh sửa. Danh tính provider/model, nguồn gốc feed, hạn ngạch, khả năng, ToS
và dữ liệu thiết lập không thể được ghi qua bề mặt này.

Bảng điều khiển cung cấp bốn thao tác cục bộ:

- **Chỉnh sửa** thay đổi tên hiển thị cục bộ và trạng thái bật.
- **Đặt lại các thay đổi cục bộ** xóa cả hai trường có thể chỉnh sửa mà không thay đổi tombstone.
- **Ẩn** tạo một tombstone để các bản cập nhật feed sau này không thể tạo lại hàng.
- **Khôi phục** xóa tombstone; mọi tùy chỉnh được lưu riêng vẫn tiếp tục có hiệu lực.

Giá trị `enabled: false` từ feed vẫn là ngoại lệ an toàn: nó được ưu tiên hơn giá trị cục bộ
`enabled: true` đã cũ, giữ cho mục đã hợp nhất ở trạng thái vô hiệu hóa và ghi lại
`disabledBy: "radar"`.

Các bản phát hành danh mục sử dụng `schemaVersion: 2`. `contextWindow` và từng trường `tools`, `vision` và
`thinking` độc lập có kiểu `number | null` / `boolean | null`: `null` nghĩa là không xác định, trong khi
`false` nghĩa là một nguồn chính thức của provider đã được D16 xác nhận nêu rõ rằng khả năng đó không tồn tại.
Các cờ model-spec/registry nội bộ của OmniRoute không bao giờ được trực tiếp nâng thành dữ kiện của feed. Client
vẫn chấp nhận các snapshot v1; vì builder cũ dùng `false` làm giá trị giữ chỗ cho sự vắng mặt, `false` trong v1 được
chuẩn hóa thành không xác định, còn `true` trong v1 vẫn là dữ kiện. Các phiên bản lược đồ không xác định sẽ bị từ chối
theo nguyên tắc đóng an toàn và bộ nhớ đệm hợp lệ gần nhất vẫn khả dụng. Mọi model v2 có context/khả năng không phải null
đều phải có `metadataEvidenceUrls[]` HTTPS không yêu cầu thông tin xác thực; nếu không, quá trình xác thực lược đồ sẽ thất bại
và bộ nhớ đệm không được thay thế. Bảng danh mục hiển thị cả ba trạng thái dưới dạng `✓`, `✕` và `?`.

### Các combo được hướng dẫn và quyền truy cập MCP

Các giá trị `familyId` đã được xác nhận vẫn tồn tại sau lớp phủ tại thời điểm đọc và được dùng cho module thuần
`buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Một family chỉ được đề xuất
khi ít nhất hai provider riêng biệt có kết nối đang hoạt động và cung cấp chính xác model ID được tuyển chọn.
Các model bị vô hiệu hóa, provider không hoạt động, model ID bị thiếu, family chỉ có một thành viên và các
kết quả khớp alias/prefix mơ hồ đều bị từ chối theo nguyên tắc đóng an toàn. Các đề xuất sử dụng chiến lược
`priority` hiện có, sắp xếp ngân sách hằng tháng định kỳ lớn nhất lên trước; UI chỉ tạo chúng thông qua `POST /api/combos`.

Giao diện người dùng có hướng dẫn nằm tại `/dashboard/radar/combos`. Giao diện này chỉ đọc các endpoint cục bộ
`GET /api/radar/catalog` và `GET /api/combos/builder/options`. Giao diện không bao giờ kích hoạt đồng bộ Radar,
đọc thông tin xác thực của nhà cung cấp hoặc ghi trực tiếp vào cơ sở dữ liệu combo.

Các máy khách MCP có thể đọc cùng một phép chiếu cục bộ bằng `omniroute_radar_catalog` (`read:radar`). Các bộ lọc
`provider`, `familyId` và `enabledOnly` tùy chọn được đánh giá sau một lần đọc cục bộ từ
`GET /api/radar/catalog`. Đầu ra khép kín của công cụ bao gồm siêu dữ liệu danh mục cùng với nhà cung cấp/mô hình,
tên hiển thị, `familyId`, hạn ngạch, các khả năng, trạng thái kích hoạt, nguồn gốc và `disabledBy`; URL thiết lập,
các bước, kết nối, địa chỉ email, khóa và dữ liệu giới thiệu không bao giờ được trả về. Công cụ này
chỉ đọc và không bao giờ gọi `/api/radar/sync`.

### Dấu chỉ nguồn gốc

Mỗi mục đã hợp nhất đều có một trường `origin` mà giao diện người dùng hiển thị dưới dạng huy hiệu:

- `"baseline"` — không thay đổi so với danh mục bản phát hành tĩnh.
- `"radar"` — một hoặc nhiều trường đã được làm mới bởi nguồn cấp dữ liệu.
- `"local"` — người vận hành có ít nhất một ghi đè cục bộ trên mục này (các ghi đè cục bộ
  luôn được ưu tiên hơn nguồn cấp dữ liệu theo quy tắc 1, bất kể nguồn cấp dữ liệu nói gì).

---

## Các bề mặt cục bộ — tuyệt đối không làm proxy cho feed

Các nhóm route Radar cục bộ dưới đây hỗ trợ UI trong `src/app/api/radar/`:

| Route                          | Phương thức | Mục đích                                                                                                                              |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET         | Trả về catalog đã hợp nhất (`getRadarCatalog()`) từ cache cục bộ.                                                                     |
| `/api/radar/sync`              | POST        | Kích hoạt `syncRadar()` ở phía máy chủ; trả về trạng thái kết quả.                                                                    |
| `/api/radar/settings`          | GET         | Trả về `{ optIn, hasSupporterKey, supporterKeyMasked }` — tuyệt đối không trả về khóa thô.                                            |
| `/api/radar/settings`          | POST        | Thiết lập trạng thái tham gia và/hoặc khóa người ủng hộ (đã mã hóa).                                                                  |
| `/api/radar/referrals`         | GET         | Trả về `{ fixed, campaigns, tier }` từ cache cục bộ — xem [Liên kết giới thiệu](#referral-links-free-credits) bên dưới.               |
| `/api/radar/offers`            | GET         | Trả về các ưu đãi đang hoạt động từ cache trực tiếp cục bộ đã xác minh; tuyệt đối không trả về khóa người ủng hộ.                     |
| `/api/radar/offers/sync`       | POST        | Kích hoạt pipeline `syncRadarOffers()` chỉ dùng khóa trực tiếp ở phía máy chủ.                                                        |
| `/api/radar/intel`             | GET         | Trả về Intel trực tiếp cục bộ đã xác minh cùng một giá trị boolean nhận diện người ủng hộ; tuyệt đối không trả về danh tính hay khóa. |
| `/api/radar/intel/sync`        | POST        | Kích hoạt pipeline `syncRadarIntel()` chỉ dùng khóa trực tiếp ở phía máy chủ.                                                         |
| `/api/radar/status`            | GET         | Trả về trạng thái chỉ đọc của cài đặt/cache cục bộ cho catalog, giới thiệu, ưu đãi và Intel mà không chứa thông tin bí mật.           |
| `/api/radar/sync-all`          | POST        | Chạy cả bốn mô-đun đồng bộ phía máy chủ và trả về trạng thái riêng cho từng feed.                                                     |
| `/api/radar/local-model-state` | GET         | Liệt kê các giá trị ghi đè và tombstone đã lưu để phục vụ các điều khiển chỉnh sửa/khôi phục.                                         |
| `/api/radar/local-model-state` | PATCH       | Thiết lập hoặc xóa các trường ghi đè `displayName`/`enabled` đã được xác thực.                                                        |
| `/api/radar/local-model-state` | PUT         | Tạo hoặc xóa tombstone bằng `{ provider, modelId, tombstoned }`.                                                                      |
| `/api/radar/local-model-state` | DELETE      | Xóa các trường ghi đè có thể chỉnh sửa trong khi vẫn giữ nguyên mọi tombstone.                                                        |

**Quy tắc bắt buộc: các route này tuyệt đối không làm proxy cho dịch vụ feed.** Trình duyệt chỉ giao tiếp
với máy chủ OmniRoute cục bộ. Bốn mô-đun có tương tác với dịch vụ Radar là
`src/lib/radar/sync.ts` (catalog), `src/lib/radar/referralsSync.ts` (giới thiệu), và
`src/lib/radar/offersSync.ts` (ưu đãi) cùng với `src/lib/radar/intelSync.ts` (Intel); tất cả đều chạy
ở phía máy chủ, tuyệt đối không chạy ở phía máy khách. Điều này đảm bảo
URL feed và mọi khóa người ủng hộ hoàn toàn không xuất hiện trong lưu lượng mạng phía máy khách.

Tất cả endpoint Radar đều trả về `404` khi `RADAR_ENABLED` bị tắt (xem
[Cờ](#flag-radar_enabled-default-off) ở trên), đồng thời chuyển các phản hồi lỗi qua
`buildErrorBody()`/`sanitizeErrorMessage()` theo quy tắc làm sạch lỗi áp dụng cho toàn bộ repo
(`docs/security/ERROR_SANITIZATION.md`).

### Xác thực

Tất cả endpoint Radar đều yêu cầu xác thực thông qua `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — cookie phiên dashboard hoặc API key có phạm vi quản lý,
cùng một cổng bảo vệ phần còn lại của `/api/settings/*`. Kiểm tra `404` khi cờ bị tắt
luôn chạy **trước** bước kiểm tra xác thực, vì vậy một bản cài đặt có `RADAR_ENABLED`
bị tắt vẫn giữ nguyên từng byte (không hiện lời nhắc xác thực chỉ để biết rằng bề mặt này không tồn tại);
sau khi cờ được bật, yêu cầu chưa xác thực sẽ nhận `401` trước mọi thao tác đọc hoặc
ghi DB. `GET /api/radar/settings` tuyệt đối không trả về khóa người ủng hộ thô bất kể
trạng thái xác thực — chỉ trả về dạng đã che và một giá trị boolean `hasSupporterKey`.

---

## Ưu đãi dành cho người ủng hộ

Các ưu đãi sử dụng artifact có chữ ký riêng, `GET /v1/offers/latest`, và không bao giờ dùng chung bộ nhớ đệm danh mục hoặc lượt giới thiệu. Điểm cuối máy chủ yêu cầu khóa Bearer hợp lệ đang hoạt động dành cho người ủng hộ; không có phương án dự phòng cho cộng đồng. Do đó, `syncRadarOffers()` dừng trước khi thực hiện yêu cầu mạng nếu cờ tính năng bị tắt, nhà vận hành chưa đồng ý tham gia hoặc chưa cấu hình khóa dành cho người ủng hộ.

Sau một yêu cầu GET thành công, máy khách xác minh chữ ký Ed25519 trên chính xác các byte phản hồi, xác thực `RadarOffersFeedSchema`, yêu cầu cả phần nội dung đã ký và header `x-omniroute-feed-tier` đều phải là `live`, thực thi yêu cầu phiên bản dạng phân tách bằng dấu chấm phải mới hơn một cách nghiêm ngặt, và chỉ khi đó mới thay thế nguyên tử `radar_offers_cache` (migration `144_radar_offers_cache.sql`). Giới hạn 10 MB cho header cộng với luồng dữ liệu, giống như giới hạn dùng cho các nguồn cấp dữ liệu khác, cũng được áp dụng. Mọi lỗi về chữ ký, schema, tầng, phát lại, kích thước, HTTP và mạng đều giữ nguyên bộ nhớ đệm đã xác minh gần nhất.

Cấu trúc ưu đãi đóng hỗ trợ ba loại lợi ích có thể so sánh: tỷ lệ phần trăm tính theo điểm cơ bản, tín dụng tính theo đơn vị tiền tệ nhỏ nhất hoặc số ngày dùng thử. Ưu đãi của đối tác phải bao gồm giá trị cơ sở công khai cùng loại và lợi ích của ưu đãi phải lớn hơn một cách nghiêm ngặt; ưu đãi chính thức không có giá trị cơ sở của đối tác. URL phải sử dụng HTTPS và không được chứa thông tin xác thực. `getRadarOffers()` tái xác thực có tính phòng vệ đối với payload đã lưu trong bộ nhớ đệm và lọc các mục đã hết hạn trong mỗi lần đọc cục bộ; `/dashboard/radar/offers` lọc lại thời hạn trước khi kết xuất, sử dụng văn bản tiếng Bồ Đào Nha khi có và dùng tiếng Anh làm phương án dự phòng, đồng thời gắn nhãn rõ ràng cho các ưu đãi của đối tác.

Trình duyệt chỉ gọi các route cục bộ: trình duyệt đọc ảnh chụp nhanh cài đặt đã che, yêu cầu `POST /api/radar/offers/sync` làm mới phía máy chủ, sau đó đọc `GET /api/radar/offers`. Khi không có khóa, trình duyệt hiển thị các liên kết dành cho người đóng góp/ủng hộ hiện có thay vì cố gắng thực hiện yêu cầu đến nguồn cấp dữ liệu. Các liên kết ưu đãi bên ngoài mở trong tab mới với `noopener noreferrer`. Không có công cụ MCP `radar_offers` nào được cung cấp trong bản phát hành này.

---

## Radar Intel, huy hiệu người ủng hộ và CLI

Intel là một artifact có chữ ký tại `GET /v1/intel/latest`. `RadarIntelFeedSchema` đóng chỉ chấp nhận các bảng xếp hạng ELO thuộc sở hữu của Radar, do bộ phận tuyển chọn riêng tư tạo ra từ các phép so sánh đã xác nhận, cùng các mức chênh lệch thực tế về tuổi/số lượng danh mục được suy ra từ các ảnh chụp nhanh danh mục có chữ ký. Phương pháp được cố định với điểm xếp hạng ban đầu là 1000 và K=32. Bảng xếp hạng trống là hợp lệ khi chưa có phép so sánh nào được xác nhận; máy khách không bao giờ tự tổng hợp bảng xếp hạng.

`syncRadarIntel()` áp dụng cùng cơ chế Bearer phía máy chủ, thời gian chờ 30 giây, giới hạn luồng dữ liệu 10 MiB, xác minh Ed25519 trên chính xác các byte, schema nghiêm ngặt, yêu cầu nội dung/header là `live`, mức sàn phiên bản và cơ chế giữ nguyên bộ nhớ đệm hợp lệ gần nhất như đối với các ưu đãi. Sau khi ảnh chụp nhanh trực tiếp đã xác minh được lưu trữ, máy khách tạo `radar:<sha256(supporter key)>`, chỉ lưu danh tính một chiều đó và phát sự kiện ghi nhận chuyên biệt `radar_supporter`. Huy hiệu `radar-supporter` có tính lũy đẳng và trao 0 XP; huy hiệu này không bao giờ cập nhật bảng xếp hạng hoặc tái sử dụng `token_share`. `/dashboard/radar/intel` chỉ kết xuất huy hiệu từ metadata bộ nhớ đệm cục bộ đã xác minh.

CLI cung cấp `omniroute radar status` và `omniroute radar sync`. Cả hai chỉ giao tiếp với API OmniRoute cục bộ. `status` thực hiện yêu cầu chỉ đọc `GET /api/radar/status`; `sync` gửi một yêu cầu `POST /api/radar/sync-all` và in kết quả cho từng nguồn cấp dữ liệu. Không lệnh nào đọc, chấp nhận hoặc in khóa dành cho người ủng hộ, và cũng không lệnh nào liên hệ trực tiếp với dịch vụ Radar.

---

## Liên kết giới thiệu (tín dụng miễn phí)

Các liên kết giới thiệu được cung cấp từ một nguồn cấp dữ liệu **độc lập, luôn được cập nhật** —
`GET /v1/referrals/latest` — tách biệt với nguồn cấp dữ liệu danh mục. Đây là chủ ý: nguồn cấp dữ liệu
danh mục ở bậc community là một bản chụp có thể cũ tới 30 ngày, vì vậy một
liên kết giới thiệu được trích xuất từ đó trước đây có thể chậm hơn danh sách liên kết thực tế của máy chủ
một khoảng thời gian tương ứng (một liên kết giới thiệu mới được thêm có thể mất tới một tháng mới đến được
người dùng miễn phí/community). Nguồn cấp dữ liệu giới thiệu loại bỏ độ trễ đó bằng cách đồng bộ theo
nhịp riêng, ngắn hơn nhiều.

```ts
// Nội dung phản hồi của GET /v1/referrals/latest (được ký bằng Ed25519, dùng cùng khóa được ghim như
// nguồn cấp dữ liệu danh mục):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — mang tính tất định: max(updatedAt) trên tất cả liên kết
                                  // giới thiệu, vì vậy hai yêu cầu giống hệt nhau sẽ tạo ra chính xác
                                  // cùng số byte/chữ ký đã ký
  referrals: {
    fixed: RadarReferral[],      // hiện diện trong MỌI bậc, bao gồm không xác thực/community
    campaigns: RadarReferral[],  // chỉ được điền đối với khóa Bearer đang hoạt động hợp lệ (supporter);
                                  // các yêu cầu không xác thực/khóa hết hạn nhận được []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Không giống nguồn cấp dữ liệu danh mục, phần nội dung này hoàn toàn không có trường `tier` — máy chủ quyết định
nội dung cần đưa vào cho từng yêu cầu dựa trên khóa `Authorization`, vì vậy header phản hồi
`x-omniroute-feed-tier` là nguồn DUY NHẤT xác định bậc được cung cấp
(`referralsSync.ts::syncRadarReferrals`); header bị thiếu/không được nhận diện sẽ hạ xuống
`"community"`, giả định có ít đặc quyền nhất. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) xác thực toàn bộ nội dung, tái sử dụng cùng
`RadarReferralSchema` cho từng liên kết giới thiệu được xuất từ `feedSchema.ts`, nhờ đó cả hai nguồn cấp dữ liệu
đều xác thực từng liên kết giới thiệu theo cùng một cách. Mọi `RadarReferral.url` phải dùng `https://` — một
URL `http://` sẽ không vượt qua được quá trình xác thực schema.

Trường `referrals` CŨ được nhúng trong danh mục trên `RadarFeedSchema` (`feedSchema.ts`) được
giữ lại để tương thích ngược với các nguồn cấp dữ liệu danh mục đã được lưu vào bộ nhớ đệm, nhưng `getRadarReferrals()`
không còn đọc trường đó — xem [Bộ truy cập](#accessor) bên dưới.

### Đồng bộ hóa

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) là module DUY NHẤT
truy cập mạng cho các liên kết giới thiệu, phản ánh chính xác hợp đồng của `syncRadar()`: cờ bị tắt
→ `disabled`; không đồng ý tham gia → `opt_out`; tải xuống `${RADAR_FEED_URL}/v1/referrals/latest`
(cùng các giá trị ghi đè fork `RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` như danh mục), xác minh
chữ ký Ed25519 trên chính xác các byte phản hồi (`verifyFeedBytes`), xác thực bằng
`RadarReferralsFeedSchema`, rồi lưu vào bảng `radar_referrals_cache`
(migration `142_radar_referrals_cache.sql`) — một bảng hoàn toàn tách biệt với
`radar_feed_cache` của danh mục. Giới hạn phản hồi 10 MB và ngưỡng dưới `generatedAt` sẽ từ chối
nguồn cấp dữ liệu đến nếu cũ hơn nguồn đã lưu trong bộ nhớ đệm, nhằm bảo vệ khỏi việc phát lại một
tạo phẩm đã ký cũ hơn. Dấu thời gian bằng nhau được chấp nhận: máy chủ chủ ý cung cấp cho các biến thể
liên kết giới thiệu community và live cùng một `generatedAt` tất định, nhờ đó nội dung đã ký
và bậc được cung cấp có thể thay đổi sau khi khóa supporter thay đổi mà không cần tập hợp liên kết cơ sở
thay đổi. Không bao giờ ném ngoại lệ — luôn trả về một đối tượng trạng thái; lỗi không bao giờ chứa stack trace
trong `reason`.

Hai trình kích hoạt giữ cho bộ nhớ đệm liên kết giới thiệu luôn sẵn sàng, cả hai đều độc lập với
nhịp 24 giờ của chính danh mục:

- **Đồng bộ khi đọc** — bản thân `GET /api/radar/referrals` gọi `syncRadarReferrals()`
  trực tiếp bất cứ khi nào bộ nhớ đệm bị thiếu hoặc cũ hơn `REFERRALS_STALE_MS` (1 giờ,
  `shouldSyncReferralsOnRead()`), trước khi cung cấp phản hồi. Đây là cơ chế giúp các liên kết cố định
  "luôn được cập nhật" ngay trong lần tải dashboard tiếp theo, mà không phải chờ bất kỳ
  bộ hẹn giờ nền nào.
- **Đồng bộ phụ của scheduler** — `radarSchedulerTick()` (`scheduler.ts`) đánh giá độc lập
  độ cũ của các liên kết giới thiệu trong cùng nhịp hàng giờ được dùng cho danh mục, gọi
  `syncRadarReferrals()` khi đến hạn. Cơ chế này chạy bất kể danh mục có
  đến hạn trong nhịp đó hay không và không bao giờ ảnh hưởng đến hình dạng của `RadarTickResult` (chỉ là
  tác dụng phụ theo kiểu nỗ lực tối đa, lỗi sẽ bị bỏ qua).

### Bộ truy cập

`src/lib/radar/index.ts` xuất hai bộ truy cập chỉ đọc, cả hai đều không bao giờ ném ngoại lệ (cùng
hợp đồng phòng vệ như `getRadarCatalog()` — cờ bị tắt, không có bộ nhớ đệm hoặc payload được lưu
trong bộ nhớ đệm bị hỏng đều trả về cấu trúc rỗng thay vì lỗi):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  đọc từ `radar_referrals_cache` (thông qua `getRadarReferralsCache()`) và xác thực
  bằng `RadarReferralsFeedSchema` — **không phải** bộ nhớ đệm danh mục.
- `getDefaultReferralFor(provider)` → liên kết giới thiệu `fixed` có `isDefault: true` cho
  provider đó, hoặc `null`. Chỉ xem xét `fixed` — một campaign không bao giờ được dùng làm
  liên kết "mặc định" của provider.

Quy tắc thực tế xác định "liên kết giới thiệu nào là mặc định cho một provider" nằm trong
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), một hàm thuần túy nhỏ **không
import DB** — có thể import an toàn vào một component `"use client"`. `getRadarReferrals`/
`getDefaultReferralFor` (trong `index.ts`) kéo theo `@/lib/db/radar` và do đó chỉ dành cho
phía máy chủ; dashboard provider import trực tiếp `referrals.ts` thay vì
`index.ts` (xem bên dưới) để tránh đóng gói `better-sqlite3` vào trình duyệt.

### `GET /api/radar/referrals`

Tuân theo chính xác thứ tự kiểm tra như mọi route Radar khác: `RADAR_ENABLED` tắt →
`404` (được kiểm tra đầu tiên, giữ nguyên từng byte theo quán tính); chưa xác thực → `401`; nếu không thì
kích hoạt đồng bộ khi đọc (xem ở trên) khi dữ liệu cũ, sau đó trả về `200` với
`{ fixed, campaigns, tier }` — `tier` được lấy trực tiếp từ hàng bộ nhớ đệm (có thể vừa được làm mới)
và chỉ mang tính cung cấp thông tin (điều khiển nội dung upsell mềm của UI bên dưới). Không bao giờ
proxy trực tiếp máy chủ feed — mã nguồn của chính route không chứa lời gọi `fetch(`;
mạng chỉ được truy cập bên trong `syncRadarReferrals()`, theo cùng nguyên tắc chỉ dùng
bộ nhớ đệm cục bộ như `/api/radar/catalog`.

### UI Dashboard — tab "Tín dụng miễn phí" trên `/dashboard/radar`

Tái sử dụng trang Radar hiện có (`src/app/(dashboard)/dashboard/radar/page.tsx`) dưới dạng
tab thứ hai thay vì route mới — giảm phạm vi routing/i18n cho một tính năng chỉ là biến thể
của dữ liệu mà trang đã tìm nạp. Sau khi chọn tham gia, thanh tab cung cấp
**Danh mục** (bảng hiện có) và **Tín dụng miễn phí**:

- Các liên kết cố định được nhóm theo nhà cung cấp, mỗi liên kết hiển thị `requiredAction` (khi có)
  và một nút `target="_blank" rel="noopener noreferrer"` dẫn đến URL giới thiệu.
- Các chiến dịch hiển thị tương tự, cộng thêm `validUntil` khi có.
- Khi `campaigns` trống **và** tier được phục vụ là `community`, UI hiển thị một
  ghi chú upsell ngắn ("các chiến dịch có thời hạn là quyền lợi bổ sung dành cho người ủng hộ") — điều này **không bao giờ**
  ẩn hoặc hạn chế danh sách liên kết cố định, vốn luôn được điền đầy đủ cho mọi tier. Nội dung
  upsell chỉ là thông điệp nhẹ nhàng, không bao giờ là rào cản.

### Liên kết giới thiệu trên tên nhà cung cấp (dashboard nhà cung cấp)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
đã liên kết tên nhà cung cấp với `providerInfo.website` khi có, với một
tiền lệ về liên kết kiếm tiền: ghi chú liên kết đối tác Kimi (Moonshot AI)
(khóa i18n `providers.kimiPartnerLinkNote`). D28 tái sử dụng chính xác mẫu ghi chú kín đáo
đó cho các liên kết giới thiệu mặc định của Radar thay vì tạo khóa mới.

Ghép nối lỏng theo chủ đích:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  là một hàm **thuần túy** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — không phụ thuộc vào `@/lib/radar` hoặc `@/lib/db/*`. Toàn bộ
  `providerPageUtils.ts` không chứa các import đó (được xác nhận bởi
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (một component `"use client"`) là nơi duy nhất được phép
  tìm nạp dữ liệu Radar — thông qua `fetch("/api/radar/referrals")`, cùng mẫu route cục bộ
  mà chính trang dashboard Radar sử dụng — và tính toán liên kết giới thiệu mặc định
  phía client bằng `findDefaultReferral()` từ `src/lib/radar/referrals.ts` không phụ thuộc DB.
- Khi `RADAR_ENABLED` tắt, yêu cầu fetch trả về 404, `referralUrl` vẫn là `null`, và
  `resolveProviderHeaderLink()` trả về `website` tĩnh trong danh mục mà không thay đổi — trang
  nhà cung cấp giữ nguyên từng byte như trước khi tính năng này tồn tại. Kết quả tương tự khi
  chưa có bộ nhớ đệm hoặc không có liên kết giới thiệu mặc định cho nhà cung cấp cụ thể đó.
- Khi có liên kết giới thiệu mặc định phù hợp, `ProviderPageHeader` nhận `isReferralLink`
  và hiển thị cùng ghi chú/chú giải kín đáo như liên kết đối tác Kimi (tái sử dụng khóa
  `providers.kimiPartnerLinkNote`) — không bao giờ có cách trình bày trực quan mới, riêng biệt.

---

## Cách tự lưu trữ feed

Một bản fork hoặc bên tự lưu trữ muốn có toàn quyền kiểm soát catalog có thể chạy dịch vụ feed
riêng mà không cần sửa đổi mã máy khách:

1. Cung cấp endpoint `GET /v1/catalog/latest` trả về phần thân JSON đáp ứng
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — gồm các trường cấp cao nhất `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` và `totals`. Hỗ trợ `x-omniroute-radar-schema: 2`; một máy chủ tương thích trong giai đoạn chuyển đổi
   nên mặc định chuyển các yêu cầu không có header này sang một artifact v1 được ký riêng.
2. Ký chính xác các byte phản hồi bằng một cặp khóa Ed25519 và trả về chữ ký base64
   trong header phản hồi `x-omniroute-feed-signature`.
3. Đặt `RADAR_FEED_URL` thành URL cơ sở mới và `RADAR_FEED_PUBKEY` thành khóa công khai
   tương ứng (SPKI dạng base64-DER hoặc PEM) — xem
   [tài liệu tham chiếu biến môi trường](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Bật `RADAR_ENABLED` và đồng ý tham gia qua `POST /api/radar/settings`
   (`{ optIn: true }`).

Không cần thay đổi mã nào khác — `verifyFeedBytes()` tự động nhận cấu hình ghi đè
(`getFeedPublicKeys()` trong `src/lib/radar/pinnedKeys.ts`), đồng thời việc so sánh
phiên bản, xác thực schema và các quy tắc hợp nhất được áp dụng giống hệt cho một feed
tự lưu trữ.

Các liên kết giới thiệu (xem [Liên kết giới thiệu (tín dụng miễn phí)](#referral-links-free-credits)
ở trên) là một artifact riêng biệt, không bắt buộc: một bản fork chỉ cung cấp `/v1/catalog/latest`
vẫn hoạt động đầy đủ — `syncRadarReferrals()` chuyển xuống `{ status: "error" }` khi nhận `404`
từ `/v1/referrals/latest` và cache chỉ đơn giản là vẫn trống, vì vậy
`GET /api/radar/referrals` tiếp tục trả về `{ fixed: [], campaigns: [], tier: null }`
thay vì khiến phần còn lại của trang gặp lỗi. Để cung cấp thêm các liên kết giới thiệu, hãy phục vụ
`GET /v1/referrals/latest` đáp ứng `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) và ký bằng cùng cặp khóa Ed25519 như
feed catalog.

Các ưu đãi dành cho người ủng hộ là một artifact không bắt buộc khác. Để cung cấp chúng, hãy triển khai
`GET /v1/offers/latest` với `RadarOffersFeedSchema` đóng
(`src/lib/radar/offersFeedSchema.ts`), yêu cầu quyền lợi trực tiếp, trả về
`x-omniroute-feed-tier: live` và ký chính xác các byte bằng cùng khóa đó. Một bản fork bỏ qua
endpoint này vẫn giữ nguyên hành vi của catalog/referrals; việc làm mới ưu đãi sẽ thất bại mà không
gây mất dữ liệu và cache ưu đãi cục bộ đã được xác minh gần nhất vẫn khả dụng.

Intel cũng không bắt buộc theo cách tương tự. Bên tự lưu trữ có thể cung cấp `GET /v1/intel/latest` bằng
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), yêu cầu quyền lợi trực tiếp, trả về
`x-omniroute-feed-tier: live` và ký chính xác các byte bằng khóa Ed25519 dùng chung. Việc bỏ qua
endpoint này không làm thay đổi catalog, referrals và offers; quá trình làm mới Intel sẽ giữ lại mọi
snapshot cục bộ đã được xác minh gần nhất.

---

## Tài liệu liên quan

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — mẫu
  phản hồi lỗi mà các route `/api/radar/*` tuân theo.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — tài liệu tham chiếu `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
