# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute có **hai** hệ thống lane cục bộ theo tiến trình với phạm vi khác nhau. Chúng
bổ trợ cho nhau; người vận hành cần biết mình đang xem hệ thống nào.

## 1. Kiểm soát tiếp nhận trên toàn tiến trình theo cấp byte (`chatBodyAdmission.ts`)

- **Phạm vi:** đường dẫn bộ nhớ đệm phần thân/heap dành cho `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` và các route khác có cấu trúc dạng chat. Bảo vệ
  khỏi hiện tượng khuếch đại heap do phần thân lớn từ coding-agent (#4380).
- **Một bộ điều khiển toàn cục cho tiến trình, không phải các lane theo từng khóa (#10110).** Mọi API key
  (đã băm) hoặc phiên `anonymous` đều được tiếp nhận dựa trên **cùng một** ngân sách dùng chung —
  id phiên đã băm CHỈ được dùng làm khóa lập lịch công bằng (điều phối round-robin
  giữa các yêu cầu đang chờ), không bao giờ dùng làm phân vùng dung lượng. Một phiên bản trước đây của tài liệu này
  mô tả các lane theo từng khóa với dung lượng độc lập; mô hình đó đã bị
  loại bỏ trong #10110 vì nó cho phép thông tin xác thực giả chưa được xác thực làm tăng
  giới hạn trên toàn tiến trình.
- **Cổng kiểm soát (#503-fanout): ngân sách BYTE tiếp nhận được tự động suy ra, không phải số lượng yêu cầu
  cố định.** Giới hạn số lượng yêu cầu `CHAT_MAX_HEAVY_IN_FLIGHT` cũ (mặc định là `1`
  trước bản sửa lỗi này) đã làm giảm fan-out của coding-agent (nhiều subagent/CLI,
  phần thân thường xuyên > 256 KB) xuống mức đồng thời hiệu dụng khoảng 1, dẫn đến lỗi 503
  dưới tải hoàn toàn bình thường. Giờ đây, giới hạn này chỉ có hiệu lực khi người vận hành thiết lập rõ ràng
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Khi không được thiết lập, việc tiếp nhận thay vào đó
  được kiểm soát bởi `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — một ngân sách được tự động suy ra từ
  giới hạn bộ nhớ thực tế của tiến trình (`src/shared/middleware/admissionBudget.ts`):
  25% của giá trị nhỏ hơn giữa giới hạn heap V8 và bất kỳ giới hạn cgroup/container nào,
  chia cho hệ số khuếch đại tạm thời 8x, được giới hạn trong khoảng từ 8 MiB đến
  2 GiB. Các giá trị ghi đè rõ ràng cũng sử dụng cùng các giới hạn này. Cơ chế này tự điều chỉnh từ
  container 512 MB đến máy tính để bàn 32 GB mà không cần tinh chỉnh biến môi trường. Phần thân không thể
  vừa trong ngân sách hiệu dụng sẽ thất bại ngay lập tức với `413 body_exceeds_budget`;
  chỉ sự tranh chấp giữa các phần thân mà từng phần có thể được phục vụ mới đi vào hàng đợi công bằng
  có giới hạn. Một bộ theo dõi áp lực tài nguyên trực tiếp dựa trên nhiều tín hiệu (tỷ lệ heap V8,
  cgroup, PSI, sự kiện OOM — `open-sse/utils/resourcePressurePolicy.ts`) rút ngắn
  thời gian chờ có giới hạn khi áp lực ở mức `high` và loại tải ngay lập tức với
  `503 resource_pressure` khi áp lực ở mức `critical`, trước khi bất kỳ byte nào được
  tiếp nhận. PSI được đọc từ `memory.pressure` của cgroup thuộc đơn vị này khi có
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` áp dụng
  trên toàn host và chỉ được dùng làm phương án dự phòng trên bare metal / cgroup v1, để một host
  đang swap không thể khiến container nhàn rỗi trả về 503.
- **Tinh chỉnh:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — giá trị ghi đè cho ngân sách byte được tự động suy ra
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — giới hạn số lượng yêu cầu cũ, chỉ bật khi được chọn
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — thời gian chờ trong hàng đợi trước khi trả về 503 (mặc định 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — van bảo vệ heap theo số byte trong hàng đợi (mặc định 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — đã lỗi thời
    và không còn tác dụng kể từ #10110 (được chấp nhận để tương thích cấu hình nhưng bị bỏ qua)
- **Báo cáo:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — bao gồm
  các trường bổ sung từ #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` và `countCapEnabled`
  (false trên triển khai mặc định — xác nhận rằng ngân sách byte, chứ không phải giới hạn
  số lượng cũ, mới là cơ chế thực sự đang áp đặt giới hạn).

## 2. Làn ảo thích ứng trong thời gian chạy (`open-sse/services/admission`)

- **Phạm vi:** kiểm soát tiếp nhận theo khóa tenant cho quá trình điều phối đến nhà cung cấp — chi phí hàng đợi, điều chỉnh giới hạn dựa trên độ trễ, xếp hàng theo làn và số liệu làn.
- **Cổng:** **chọn bật.** Bị tắt trừ khi `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Nếu không bật, bộ điều khiển thích ứng vẫn duy trì hành vi hàng đợi dùng chung (tiêu chí 1 của #9654 chỉ được đáp ứng sau khi bên vận hành bật các làn).
- **Tinh chỉnh:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + cấu hình thích ứng (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Báo cáo:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID làn không rõ nghĩa, tuyệt đối không phải khóa thô) và `virtualLanes` — cờ có thẩm quyền xác nhận "các làn đang bật" trong bản chụp nhanh.

## 3. Thăm dò fan-out — kiểm soát tiếp nhận theo từng đích cho combo/fusion (#9654 Wave 2)

Combo (ưu tiên / luân phiên) và fusion fan-out đến N đích mô hình trong một yêu cầu cha. Kể từ #9654 Wave 2, **mỗi đích fan-out đều được kiểm soát trước khi điều phối** bằng một thăm dò theo từng đích (`PerTargetAdmissionHook`, được tạo bởi `createPerTargetAdmissionHook`) đối với làn tenant của **yêu cầu cha**.

- **Phạm vi:** mọi đích fan-out được combo, fusion và công cụ chaos điều phối. Hệ thống 1 (cấp byte) không bị ảnh hưởng — hệ thống này không bao giờ thăm dò các đích fan-out.
- **Cổng:** **chọn bật cùng hệ thống 2.** Không thực hiện thao tác nào khi `OMNIROUTE_CHAT_VIRTUAL_LANES` chưa được đặt — ở chế độ đó, yêu cầu cha đã giữ lease của hàng đợi dùng chung, vì vậy việc thăm dò sẽ tính trùng và từ chối các đích combo.
- **Ngữ nghĩa:**
  - **Hoàn toàn không chặn — bỏ qua, tuyệt đối không xếp hàng.** `maxWaitMs 0`: khi một làn đầy, đích sẽ bị bỏ qua và cơ chế dự phòng của combo (hoặc nhóm phần tử sống sót của fusion) sẽ phục vụ thay thế. Đây là chủ ý: một đích fan-out là công việc dư thừa, và việc xếp hàng đích đó sẽ chất thêm tải lên chính điểm tắc nghẽn mà các làn được thiết kế để ngăn chặn. Vì vậy, `defaultMaxWaitMs` chỉ áp dụng cho **yêu cầu cha**; các thăm dò fan-out không bao giờ chờ và chủ ý là **không có tùy chọn cấu hình** để buộc chúng chờ (lịch sử sự cố cho thấy các tùy chọn chờ đã gây ra hàng loạt lỗi thuộc nhóm 502/504 mà #9654 ngăn chặn — chỉ xem xét lại nếu bên vận hành báo cáo rằng việc bỏ qua các đích fan-out làm giảm chất lượng phản hồi).
  - **Giải phóng khi được tiếp nhận.** Một thăm dò được tiếp nhận sẽ giải phóng lease ngay lập tức: đây là cổng kiểm soát dung lượng, không phải cơ chế giữ chỗ. Lease của yêu cầu cha bao phủ fan-out; việc giữ thêm N lease sẽ làm tăng giả tạo chi phí hoạt động dùng chung và khiến các tenant khác bị từ chối. Đây là cơ chế nỗ lực tối đa, không phải đặt trước: làn có thể đầy lại trong khoảng thời gian từ lúc thăm dò đến lúc điều phối, vì vậy khi có tranh chấp cao, cổng có thể tiếp nhận vào một làn đã đầy trở lại vào thời điểm đích được điều phối.
  - **Định giá từ phần thân fan-out thực tế.** Thăm dò ước tính chi phí từ phần thân thực tế của đích — bao gồm lớp yêu cầu được suy ra từ cờ `stream` của đích, hoàn toàn giống đường dẫn cha — nhờ đó các thành viên trong nhóm fusion (`stream: false`) được định giá theo lớp không phát trực tuyến mà chúng thực sự chiếm dụng, còn các đích ưu tiên/RR được định giá theo đúng yêu cầu của người dùng.
- **Báo cáo:** một thăm dò bị bỏ qua sau đích đầu tiên sẽ làm tăng `fallbackCount` theo từng yêu cầu của combo (phản ánh ngữ nghĩa dự phòng hiện có; hiển thị trong nhật ký combo); fusion trả về 503 khi mọi thành viên trong nhóm đều bị bỏ qua. Hiện tại **không có bộ đếm tổng hợp** (ví dụ: `virtualFanoutSkipped`) trên bản chụp nhanh — nếu bên vận hành báo cáo rằng họ không thể biết cổng làn bỏ qua các đích fan-out thường xuyên đến mức nào, đó là điều kiện để bổ sung một bộ đếm như vậy.

## Cái nào đang hiển thị trên dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **các làn ảo thích ứng** (hệ thống 2).
- `adaptiveAdmission.virtualLanes === true` → các probe fan-out trong phần 3 cũng
  đang hoạt động. Payload thiếu `virtualLanes` hoặc có giá trị `false` nghĩa là
  `OMNIROUTE_CHAT_VIRTUAL_LANES` chưa được thiết lập — các làn cấp byte (hệ thống 1)
  vẫn đang hoạt động, nhưng không có gì trong `adaptiveAdmission` (và không có cơ chế
  kiểm soát fan-out) có hiệu lực cho đến khi tính năng này được bật.

## Tại sao cả hai cùng tồn tại

Các làn cấp byte giới hạn đường dẫn phân tích/nén tiêu tốn nhiều bộ nhớ; các làn thích ứng
giới hạn chi phí điều phối theo từng tenant. Tiêu chí 1 của #9654 ("lưu lượng tăng đột biến
của một phiên không khiến phiên khác nhận lỗi 503") được hệ thống 1 thực thi vô điều kiện
và được hệ thống 2 thực thi sau khi tính năng tùy chọn này được bật.

## 4. `/v1/responses` kéo dài trong một tiến trình (dư địa lành mạnh)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) đã bổ sung
`tryAcquireHealthyHeadroom` để một yêu cầu thứ hai có cấu trúc nặng được chấp nhận
khi heap thấp hơn `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Đường dẫn BYTE
được `admitChatRequest` sử dụng (các body ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
mặc định 256 KiB, bao gồm `POST /v1/responses`) sử dụng **cùng** cơ chế ngoại lệ này.

Đây là công thức **một tiến trình** được hỗ trợ để xử lý nhiều hơn hai kết nối SSE
`/v1/responses` kéo dài đồng thời: chỉ tăng giới hạn chính + dư địa lành mạnh trong phạm vi
mà heap và ngân sách byte inflight trên toàn tiến trình (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) cho phép. Việc hỗ trợ hàng chục máy khách SSE kéo dài (40–50) là bài toán
ngân sách bộ nhớ, không phải giới hạn cứng “tối đa 2” của sản phẩm. Khi heap chịu áp lực,
hệ thống vẫn loại tải bằng lỗi `503` có thể thử lại để #7849 không tái diễn.

Để **nhân rộng số heap**, hãy chạy N `DATA_DIR` độc lập (#11024). Không bao giờ đặt
`replicas > 1` trên cùng một tệp SQLite (#10350). Phần này không phải là việc mở lại
công thức scale-out bằng DATA_DIR.
