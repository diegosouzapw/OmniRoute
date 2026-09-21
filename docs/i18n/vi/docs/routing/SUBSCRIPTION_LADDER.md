# Subscription-first routing (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Hai id `auto/*` mới — `auto/subscription` và `auto/thrifty`. Cả hai đều là tùy chọn chủ động thông qua việc
> được yêu cầu: không có gì được định tuyến qua chúng trừ khi bên gọi yêu cầu đích danh id, và không có
> pool, chiến lược hay giá trị mặc định hiện có nào thay đổi.

## Lý do tồn tại

OmniRoute đã trả lời hai câu hỏi về chi phí, nhưng cả hai đều không phải là điều mà phần lớn đơn vị vận hành quan tâm.

| Cơ chế hiện có                                           | Trả lời                                      |
| -------------------------------------------------------- | -------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "mô hình này có được phân loại là miễn phí?" |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "kết nối này có bao giờ tính phí tôi không?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "kết nối này có gần chạm giới hạn không?"    |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "giới hạn chi tiêu, hạ xuống rẻ nhất"        |

Mọi cơ chế chỉ-miễn-phí đều **đóng khi thất bại** — một pool miễn phí đã cạn sẽ trở thành một pool trống, tuyệt đối không
nâng lên tùy chọn trả phí — và mọi cơ chế phía trả phí đều không phân biệt bậc. Không cơ chế nào trả lời:

> "Sử dụng hạn ngạch mà tôi đã trả tiền. Khi hạn ngạch cạn, hoặc dừng lại, hoặc nâng lên từng bậc một
> qua các tùy chọn trả phí rẻ nhất — và quay lại ngay khi hạn ngạch được đặt lại."

## Thanh toán là thuộc tính của kết nối, không phải thuộc tính của mô hình

`classifyTier()` (`open-sse/services/tierResolver.ts`) sử dụng khóa `(provider, model)` và trả về
`free | cheap | premium` dựa trên giá trong danh mục. Nhưng liệu một yêu cầu có phát sinh thêm chi phí hay không
phụ thuộc vào **kết nối nào phục vụ yêu cầu đó**: cùng một mô hình được bao gồm trong gói khi dùng qua kết nối OAuth Claude Code
nhưng lại được tính phí theo token khi dùng qua kết nối khóa API.

`provider_connections.auth_type` không phải là một chỉ dấu thay thế đáng tin cậy theo cả hai chiều — tồn tại các kết nối OAuth
tính phí theo mức sử dụng và các kết nối khóa API được bao gồm trong gói (token chỗ ngồi Copilot không phải là
khóa API tính phí theo mức sử dụng). Vì vậy, lớp thanh toán đến từ một **danh mục được tuyển chọn**,
`open-sse/config/connectionBillingCatalog.ts`, được thiết lập thủ công dựa trên các điều khoản công bố của từng nhà cung cấp —
cùng một mẫu mà `FreeModelBudget.hardStopGuaranteed` đã thiết lập cho các mô hình miễn phí.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Thứ tự phân giải (`autoCombo/connectionBilling.ts`): sentinel không-xác-thực tổng hợp →
`keyless`; một mục danh mục khớp cả nhà cung cấp **và** `authType`; một mục áp dụng cho toàn bộ nhà cung cấp;
nếu không thì là `unknown`. **Không được tuyển chọn không có nghĩa là miễn phí** — `unknown` được xử lý như `metered`
ở mọi nơi, vì vậy một nhà cung cấp được thêm vào ngày mai sẽ bắt đầu bên ngoài bậc thuê bao và phải được
chủ động tuyển chọn vào.

## Mô hình bậc

Năm bậc theo thứ tự nâng cấp. Chúng khác nhau không chỉ về giá — mỗi bậc có tín hiệu cạn kiệt **riêng**,
đó là lý do đây không đơn thuần là một thao tác sắp xếp.

| #   | Bậc            | Thành viên                                                    | Cạn khi                                 |
| --- | -------------- | ------------------------------------------------------------- | --------------------------------------- |
| 0   | `subscription` | `billing: "subscription"` được tuyển chọn                     | cửa sổ hạn ngạch ở mức hoặc dưới ngưỡng |
| 1   | `keyless`      | đường dẫn không-xác-thực tổng hợp                             | kết nối bị tạm ngưng / bộ ngắt mạch     |
| 2   | `free`         | kết nối tính theo mức sử dụng, `classifyTier() === "free"`    | hạn mức miễn phí đã cạn                 |
| 3   | `cheap`        | kết nối tính theo mức sử dụng, `classifyTier() === "cheap"`   | ngân sách của bậc đã dùng hết           |
| 4   | `premium`      | kết nối tính theo mức sử dụng, `classifyTier() === "premium"` | ngân sách của bậc đã dùng hết           |

Các bậc 0-2 cạn dựa trên **hạn ngạch**, yếu tố có thể quan sát và đã được theo dõi. Các bậc 3-4 không có
hạn ngạch — một kết nối trả phí sẽ phục vụ vô thời hạn — vì vậy tín hiệu cạn kiệt hợp lý duy nhất của chúng là **ngân sách**
theo từng bậc. Nếu không có ngân sách, "nâng cấp khi bậc rẻ đã cạn" sẽ không có điều kiện kích hoạt.

## `auto/subscription` — đóng khi không chắc chắn

Nhóm = chỉ bậc 0, giới hạn ở các kết nối có phần sử dụng vượt hạn mức được ghi rõ là `hard-stop`, và từng kết nối đều được xác minh trực tiếp là vẫn còn dư hạn ngạch. Mọi trường hợp không rõ ràng đều bị loại trừ: nhà cung cấp chưa được tuyển chọn, số liệu hạn ngạch không thể xác minh, số liệu đã lỗi thời hoặc phần sử dụng vượt hạn mức được tính phí.

Nhóm rỗng là kết quả **có chủ đích**, không phải lỗi — luồng xử lý nhóm rỗng hiện có của bên gọi sẽ chuyển nó thành một lỗi rõ ràng thay vì âm thầm dự phòng sang lựa chọn có thể phát sinh phí. Đó là toàn bộ cam kết của id này.

`keyless` chủ ý **không** đủ điều kiện: nhóm này có nghĩa là "gói mà tôi trả tiền", vì vậy backend không cần xác thực không thuộc về nhóm này. Hãy dùng `auto/thrifty` (hoặc `auto/best-free`) cho trường hợp đó.

### An toàn kết nối

Một ứng viên không phải lúc nào cũng gắn với một kết nối — ứng viên logic mang theo danh sách cho phép `allowedConnectionIds`, còn tài khoản thực sự được sử dụng sẽ được `open-sse/services/combo/autoStrategy.ts` chọn sau, tại thời điểm điều phối. Do đó, cả hai cách nhóm đều xác minh **từng kết nối riêng lẻ** và ghi lại `allowedConnectionIds` để chỉ còn đúng tập con vượt qua xác minh — không bao giờ là toàn bộ danh sách ban đầu, cũng không bao giờ là một thành viên được chọn tùy ý. Vì `autoStrategy.ts` vốn đã thực thi mảng đó như một danh sách cho phép nghiêm ngặt, việc ghi lại nó tại đây đảm bảo theo cấu trúc rằng tập "đã xác minh" và tập "thực sự được sử dụng" là một. Đây chính là cùng một bất biến và cùng một lập luận như trong [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — mỗi lần nâng một bậc

Nhóm = tất cả các bậc, được sắp xếp theo chỉ số bậc, trong đó các ứng viên đã cạn hạn ngạch bị chặn. Công cụ `auto` vẫn chấm điểm **bên trong** nhóm còn lại: thang bậc quyết định những bậc nào được tham gia, còn việc chấm điểm quyết định ứng viên nào chiến thắng trong số đó. Thứ tự trong mỗi bậc được giữ ổn định, vì vậy thứ hạng riêng của bộ chấm điểm không bao giờ bị lớp phủ này xáo trộn.

Đây là lớp phủ sắp xếp thứ tự + chặn, **không phải** một bộ điều phối mới: vòng lặp thực thi thăm dò của `combo.ts` vốn đã duyệt các mục tiêu theo thứ tự và chuyển sang mục tiêu tiếp theo khi thất bại, vì vậy nếu xảy ra tình trạng cạn hạn ngạch trong lúc chạy mà bước kiểm tra trước không phát hiện được, hệ thống vẫn nâng lên bậc tiếp theo trong cùng một yêu cầu.

Trong khi `auto/subscription` đóng khi không chắc chắn, `auto/thrifty` lại **mở**: một kết nối nằm trong gói nhưng không có số liệu hạn ngạch khả dụng vẫn được thử trước. Việc thử kết nối đó không tốn phí, và nếu hóa ra nó đã cạn hạn ngạch thì cơ chế chuyển tiếp vẫn đi đến bậc tiếp theo — trái lại, từ chối thử nó sẽ chuyển yêu cầu sang một bậc trả phí chỉ vì thiếu dữ liệu đo từ xa, đúng vào kết quả mà cách nhóm này tồn tại để tránh.

## Quay lại gói sau khi đặt lại

Ba yếu tố độc lập phải hết hiệu lực trước khi định tuyến quay lại bậc 0. Chỉ sửa một yếu tố sẽ khiến thang bậc mắc kẹt ở các bậc trả phí rất lâu sau khi gói đã được nạp lại.

1. **Bộ nhớ đệm trạng thái hạn ngạch** — `freeAccessQuota.ts` lưu vào bộ nhớ đệm theo từng `(provider, connection)` với TTL 180 giây. Một mục được lưu trong bộ nhớ đệm có `resetAt` riêng đã trôi qua mô tả một cửa sổ không còn tồn tại, vì vậy giờ đây mục đó được coi là lỗi thời **bất kể tuổi của nó** và buộc phải làm mới. Nếu không có cơ chế này, một gói được nạp lại lúc nửa đêm vẫn tiếp tục được đọc là đã cạn cho đến khi TTL tình cờ hết hạn.
2. **Trạng thái riêng của thang bậc** — theo thiết kế, trạng thái đó không tồn tại. Điều kiện tham gia của bậc được tính lại từ trạng thái hạn ngạch trực tiếp mỗi khi xây dựng nhóm; không tồn tại bản ghi "hiện đang ở bậc 3" được lưu bền vững có thể tồn tại lâu hơn lần đặt lại và làm kẹt việc định tuyến.
3. **Thời gian chờ của kết nối** — lỗi 429 do cạn hạn ngạch đặt `rateLimitedUntil` dựa trên cơ chế chờ lũy thừa, và đối với kết nối thuộc gói, thời điểm này có thể vượt quá thời điểm đặt lại thực tế. `clampCooldownToReset()` (`subscriptionLadder.ts`) thu hẹp thời gian chờ về thời điểm đặt lại của chính thượng nguồn và không bao giờ có thể kéo dài thời gian đó. **Hàm này đã được triển khai và kiểm thử nhưng chưa được kết nối vào luồng xử lý**: bộ nhớ đệm hạn ngạch bị vô hiệu hóa trong `src/sse/services/auth.ts` _trước khi_ bất kỳ thời gian chờ nào được ghi, vì vậy `resetAt` phải được thu thập sớm hơn trong hàm đó — một thay đổi đối với luồng trọng yếu về khả năng phục hồi cần nằm trong PR riêng được rà soát độc lập. Cho đến lúc đó, việc quay lại phải chờ hết thời gian chờ của kết nối (cơ chế này vốn đã ưu tiên các gợi ý `Retry-After` từ thượng nguồn khi nhà cung cấp gửi chúng).

### Chống dao động

Một bậc vừa được đặt lại chỉ được đưa trở lại khi cao hơn `reentryMinRemainingPercent` (mặc định là 5), trong khi một kết nối đang được sử dụng chỉ cần duy trì cao hơn `exitCutoffPercent` (mặc định là 2, khớp với `quotaPreflight.defaultThresholdPercent`). Khoảng cách này là dải trễ — nếu không có nó, một kết nối dao động quanh ngưỡng sẽ liên tục chuyển qua lại giữa các bậc trong những yêu cầu liên tiếp.

## Cấu hình

Chỉ dành cho việc tinh chỉnh. Cố ý **không** có cờ `enabled`: một công tắc có thể tắt các chế độ này
sẽ khiến `auto/subscription` âm thầm phục vụ toàn bộ nhóm mô hình — bao gồm cả các mô hình trả phí — dưới một
tên gọi mang hàm ý ngược lại.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 sẽ vô hiệu hóa hoàn toàn một bậc
  },
}
```

Cơ chế giới hạn theo ngân sách không hoạt động cho đến khi một trình phân giải chi tiêu được kết nối: khi không có dữ liệu kế toán, một
bậc trả phí vẫn được sắp xếp nhưng không bao giờ bị giới hạn. Kể từ v3.8.51, thiết lập `rungBudgetUsd` được
schema chấp nhận nhưng CHƯA được thực thi — hãy xem đây là cấu hình dành riêng cho tương lai, không phải giới hạn chi tiêu đang hoạt động. Thứ tự các bậc, việc cạn hạn ngạch và tái gia nhập sau khi đặt lại đều
hoạt động mà không cần thiết lập này.

## Kết hợp

`subscription` và `thrifty` là các giá trị `AutoTier`, vì vậy chúng có thể kết hợp với mọi danh mục:
`auto/coding:thrifty`, `auto/reasoning:subscription`, v.v. Hai id phẳng
(`auto/subscription`, `auto/thrifty`) được công bố trong `/v1/models` và bảng điều khiển.

Cả hai id đều không thuộc bậc trả phí, vì vậy `isPaidTierAutoId()` trả về `false` cho cả hai và
`auto/subscription` không bị `hidePaidModels` ẩn đi.

## Vị trí mã nguồn

| Hạng mục                                     | Tệp                                                 |
| -------------------------------------------- | --------------------------------------------------- |
| Dữ liệu thanh toán được tuyển chọn           | `open-sse/config/connectionBillingCatalog.ts`       |
| Bộ phân loại                                 | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Các bậc, cả hai cách phân nhóm, tái gia nhập | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Kết nối vào nhóm ứng viên                    | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Độ cũ bộ nhớ đệm có nhận biết việc đặt lại   | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Bề mặt bậc                                   | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Các id được công bố                          | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Kiểm thử                                     | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
