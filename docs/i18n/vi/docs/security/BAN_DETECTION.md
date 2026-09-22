# Account-Ban / Banned-Keyword Detection (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute quét các phản hồi lỗi từ upstream để tìm những tín hiệu cho biết **tài khoản của nhà cung cấp đã ngừng hoạt động vĩnh viễn** (bị đình chỉ / vô hiệu hóa / cấm do vi phạm Điều khoản dịch vụ) và khi khớp, chuyển kết nối đó sang **trạng thái `banned` cuối cùng** để kết nối không còn được chọn cho các yêu cầu. Đây là nội dung được cấu hình trong thẻ cài đặt **Bảo mật → Từ khóa cấm** ("Các từ khóa bổ sung kích hoạt việc phát hiện tài khoản bị cấm vĩnh viễn. Các từ khóa tích hợp sẵn luôn được áp dụng.").

Trang này ghi lại danh sách tích hợp sẵn, luồng phát hiện, phạm vi áp dụng, cách thêm từ khóa tùy chỉnh một cách an toàn và cách khôi phục một kết nối đã bị gắn cờ. Bản thân trạng thái cuối cùng là một phần của mô hình khả năng phục hồi — xem
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Trạng thái cuối cùng").

**Nguồn chuẩn:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Từ khóa tích hợp sẵn

8 chuỗi con sau luôn được áp dụng (không phân biệt chữ hoa chữ thường), bất kể danh sách tùy chỉnh:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Danh sách này thay đổi khi các nhà cung cấp thay đổi cách diễn đạt thông báo cấm. Bản
> chính thức là `ACCOUNT_DEACTIVATED_SIGNALS` trong `open-sse/services/accountFallback.ts`;
> hãy coi khối bên trên là một bản chụp tại thời điểm hiện tại.

Hai bảng tín hiệu liền kề, **tách biệt** nằm trong cùng tệp và _không_ thuộc về
cơ chế phát hiện từ khóa cấm:

- `CREDITS_EXHAUSTED_SIGNALS` — khoản thanh toán/hạn ngạch đã cạn (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → trạng thái cuối cùng `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **không phải trạng thái cuối cùng**; việc làm mới token có thể khôi phục.

Lưu ý: các cụm từ tạm thời phổ biến như **`rate limit`** / `429` được xử lý bởi
luồng giới hạn tốc độ / thời gian chờ của kết nối và **không** phải là tín hiệu cấm.

## Luồng phát hiện

```
phản hồi lỗi từ upstream
  → phần thân được chuyển thành chuỗi + chuyển sang chữ thường
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [khớp chuỗi con]
  → khớp?
      → testStatus của kết nối = "banned"      (vĩnh viễn — thời gian chờ 1 năm, không bao giờ tự động khôi phục)
      → nếu cài đặt `autoDisableBannedAccounts` đang bật và `autoDisableBannedScope`
        bao gồm kết nối này (`all`, hoặc `subscription` đối với OAuth/cookie/session)
        → đồng thời isActive = false. Các khóa API trả trước vẫn hoạt động khi phạm vi là
        `subscription`.
      → kết nối bị bỏ qua trong quá trình chọn tài khoản (các trạng thái QUOTA_BLOCKING của combo)
```

- Việc khớp là phép tìm kiếm **chuỗi con không phân biệt chữ hoa chữ thường** trên **phần thân**
  phản hồi (`isAccountDeactivated`, `accountFallback.ts`).
- Việc chuyển vĩnh viễn sang trạng thái cuối cùng `banned` được kích hoạt khi phần thân chứa tín hiệu cấm ở **bất kỳ
  mã trạng thái HTTP nào** (thông qua `markAccountUnavailable` → `checkFallbackError`). Nhãn
  **`deactivated`** có phạm vi hẹp hơn (`isActive=false` khi kết nối không có
  khóa API dự phòng) được ghi bởi luồng nội tuyến `chatCore.ts` trên **HTTP 401 / 403**
  (được phân loại thông qua `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Lưu ý rằng
  luồng `markAccountUnavailable()` ghi một trạng thái cuối cùng _khác_ —
  **`expired`** — cho cùng tín hiệu `ACCOUNT_DEACTIVATED` (thông qua
  `resolveTerminalConnectionStatus`), vì vậy cùng một lệnh cấm có thể xuất hiện dưới dạng
  `deactivated` hoặc `expired` tùy thuộc vào luồng nào đã xử lý phản hồi. (Chú thích
  cũ trong mã cho biết "khi phần thân của phản hồi 401 chứa các chuỗi này" — mô tả đó
  chưa đầy đủ so với hành vi hiện tại.)
- Một kết nối `banned` bị loại khỏi quá trình lựa chọn ở mọi nơi có lọc các trạng thái
  cuối cùng (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` của combo).

## Phạm vi — những nhà cung cấp nào được quét

**Tất cả nhà cung cấp.** Việc kiểm tra chạy trong quy trình xử lý lỗi chung mà
mọi yêu cầu upstream thất bại đều đi qua — quy trình này **không** chỉ giới hạn
ở các trình thu thập OAuth/gói đăng ký. Trạng thái kết thúc thu được áp dụng cho
từng **kết nối**, không phải từng nhà cung cấp.

Tuy vậy, các _chuỗi_ tích hợp sẵn hướng đến những nhà cung cấp dạng gói đăng ký/OAuth
có nguy cơ bị cấm thực sự (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Một nhà cung cấp dùng khóa API chỉ kích hoạt bộ phát hiện nếu phần
thân lỗi của nhà cung cấp đó chứa nguyên văn một trong các chuỗi con.

`autoDisableBannedScope` (`all` | `subscription`, mặc định `all`) kiểm soát việc
một kết quả khớp có đồng thời chuyển `isActive=false` hay không. `subscription`
chỉ các tài khoản đăng nhập (gói đăng ký trả phí và tài khoản miễn phí, bao gồm
các phiên dùng cookie web). Tùy chọn này vẫn ghi `testStatus=banned` cho các khóa
API trả trước nhưng giữ chúng trong nhóm định tuyến. Thiết kế lâu dài là cơ chế
ghi đè theo từng nhà cung cấp và từng tài khoản; enum toàn cục là phiên bản triển
khai đầu tiên.

## Từ khóa cấm tùy chỉnh

Thêm hoặc xóa từ khóa trong **Bảo mật → Từ khóa cấm** (được lưu dưới dạng cài đặt
toàn cục `customBannedSignals` qua `PATCH /api/settings`). Chúng được **thêm vào**
danh sách tích hợp sẵn — không bao giờ thay thế danh sách đó — và được tải lại
ngay khi lưu (cũng như khi khởi động) thông qua `setCustomBannedSignals()`. Mỗi từ
khóa bị giới hạn ở 200 ký tự; không có giới hạn về độ dài mảng.

**⚠ Nguy cơ dương tính giả — hãy chọn các cụm từ cụ thể.** Việc phát hiện sử dụng
phép khớp chuỗi con thô trên toàn bộ phần thân phản hồi và một kết quả khớp là
**vĩnh viễn** (thời gian chờ 1 năm, khôi phục thủ công). Một từ khóa quá rộng có
thể khiến một kết nối hoàn toàn bình thường bị cấm:

- **Không tốt:** `quota`, `limit`, `error`, `denied` — xuất hiện trong nhiều lỗi tạm thời.
- **Tốt:** các câu thông báo cấm đầy đủ, ví dụ `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Ưu tiên cụm từ rõ ràng, không mơ hồ và dài nhất mà nhà cung cấp trả về khi tài
khoản thực sự bị cấm. Nếu chưa chắc chắn, trước tiên hãy theo dõi `lastError` của
kết nối, sau đó thêm chính xác nội dung đó.

## Khôi phục kết nối bị gắn cờ

Các trạng thái kết thúc `banned` / `deactivated` **không bao giờ tự động khôi phục**
(chúng bị loại khỏi nhịp khôi phục chủ động — chỉ các khoảng chờ `unavailable`
mới tự khôi phục). Người vận hành phải xóa chúng một cách rõ ràng:

1. **Kiểm tra lại kết nối** — thao tác **Kiểm tra** trên bảng điều khiển
   (`POST /api/providers/{id}/test`); một lần thăm dò thành công sẽ đặt lại
   `testStatus` thành `active` và xóa các trường lỗi.
2. **Xác thực lại / chỉnh sửa thông tin xác thực** — đối với nhà cung cấp OAuth,
   hãy chạy lại quy trình đăng nhập / làm mới; các route tạo/nhập nhà cung cấp sẽ
   đặt `isActive = true`.
3. **Bật lại kết nối** — nếu tính năng tự động vô hiệu hóa đã đặt
   `isActive = false` (phạm vi `all`, hoặc `subscription` đối với kết nối
   OAuth/cookie/phiên), hãy bật lại sau khi sửa tài khoản.

Không có nút "xóa cờ cấm" riêng — việc khôi phục được thực hiện bằng cách kiểm tra
lại, xác thực lại hoặc bật lại, phù hợp với quy tắc chung về trạng thái kết thúc
trong [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Cách ly lần thăm dò (kiểm tra tất cả mô hình)

Một **lỗi có nguồn gốc từ lần thăm dò** (các lượt điều phối kiểm tra tất cả mô
hình / kiểm tra tình trạng được thực thi bên trong `runAsProbe`) không bao giờ
loại kết nối khỏi nhóm (#9817): lỗi được **ghi lại để có thể theo dõi**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`) nhưng bỏ qua
**mọi** thay đổi định tuyến — thời gian chờ, trạng thái kết thúc (`banned` /
`deactivated` / `credits_exhausted`), khóa theo mô hình, bộ ngắt mạch của nhà
cung cấp, bộ nhớ đệm hạn ngạch 5 phút, làm mới token OAuth và tự động vô hiệu hóa.
Chỉ lỗi trên đường dẫn yêu cầu thực mới gây vô hiệu hóa. Lỗi đã ghi chính là yếu
tố giúp tài khoản bị gắn cờ hiển thị trên bảng điều khiển trong khi tài khoản đó
vẫn tiếp tục phục vụ lưu lượng.

Điểm quyết định duy nhất là `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), được **mọi** vị trí có khả năng thay đổi
trạng thái định tuyến do lỗi có nguồn gốc từ lần thăm dò tham chiếu:

- `markAccountUnavailable` (`auth.ts`) — chỉ ghi lại (`lastError` là văn bản thô,
  `lastErrorType`, `errorCode`, `lastErrorAt`; chủ ý **không** có
  `backoffLevel`, vì trường này sẽ kích hoạt cơ chế tự suy giảm tại thời điểm lựa
  chọn và xóa bản ghi)
- `maybeAutoDisableBannedAccount` — không tự động vô hiệu hóa
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (chỉ ghi lại,
  không đặt trạng thái kết thúc `credits_exhausted`), GEO_BLOCKED (không loại trừ
  trong 24 giờ), MODEL_NOT_FOUND (không gọi `lockModel`), cơ chế chuyển đổi dự
  phòng bằng cách xoay vòng tài khoản khi codex gặp lỗi 429 (không gọi
  `markCodexScopeRateLimited`, không lưu `rate_limited_until`, không xóa quan hệ
  liên kết phiên), `persistCodexQuotaState` (không ghi trạng thái hạn ngạch,
  không vô hiệu hóa bộ nhớ đệm), `recordKeyHealthStatus` (không tác động đến bộ
  xoay vòng tình trạng khóa)
- Làm mới OAuth — cả quá trình làm mới chủ động trong lớp cơ sở của trình thực thi
  (`base.ts` `execute()`, không tiêu thụ lượt xoay vòng refresh-token) lẫn đường
  dẫn phản ứng với lỗi 401/403 trong `chatCore` (không vô hiệu hóa với trạng thái
  `expired`)
- `chat.ts` — bộ ngắt mạch của nhà cung cấp và bộ nhớ đệm hạn ngạch 5 phút
  (`markAccountExhaustedFrom429`) không bao giờ bị suy giảm

Lỗi đã ghi chính là yếu tố giúp tài khoản bị gắn cờ hiển thị trên bảng điều khiển
trong khi tài khoản đó vẫn tiếp tục phục vụ lưu lượng. Lưu ý: bản ghi thăm dò lưu
văn bản lỗi **thô** (không cắt), khác với thao tác cắt ngắn `slice(0,100)` trên
đường dẫn thực.

Người vận hành sử dụng tính năng kiểm tra tất cả như một công cụ bảo trì có thể
khôi phục hành vi trước đây (lần thăm dò được tính là một lượt tạo thực) bằng một
trong hai cách:

- cài đặt `probeCanDisable` (`POST /api/settings` với
  `{"probeCanDisable": true}`, hoặc chỉnh sửa trực tiếp cơ sở dữ liệu `key_value`), hoặc
- cờ tính năng **`PROBE_CAN_DISABLE=true`** (ghi đè qua biến môi trường hoặc cơ sở
  dữ liệu; được ưu tiên hơn cài đặt).

Cơ chế an toàn: nếu quá trình tra cứu cờ hoặc cài đặt phát sinh lỗi, chế độ cách
ly vẫn BẬT.

## Tệp nguồn

| Vấn đề                             | Tệp                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Bảng tín hiệu + đối sánh           | `open-sse/services/accountFallback.ts`                                                                        |
| Kết thúc / lưu trạng thái          | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Phạm vi tự động vô hiệu hóa        | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Phân loại nội tuyến                | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Loại trừ khôi phục trạng thái cuối | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Tải từ khóa tùy chỉnh khi chạy     | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Giao diện cài đặt                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
