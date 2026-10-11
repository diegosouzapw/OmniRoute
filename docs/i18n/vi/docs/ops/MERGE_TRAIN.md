# Merge Queue & Manual Merge-Train Runbook (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Kể từ v3.8.49 (WS3.2/WS3.4 của kế hoạch chất lượng/tốc độ), đường dẫn hợp nhất mặc định cho
các PR đã được đánh giá vào `release/vX.Y.Z` là **hàng đợi hợp nhất Mergify** (`.mergify.yml`);
**đoàn tàu hợp nhất thủ công** được ghi lại bên dưới là phương án DỰ PHÒNG — được sử dụng khi xảy ra sự cố,
đóng băng phát hành hoặc nếu gói Mã nguồn Mở của Mergify có thay đổi.

## Đường dẫn mặc định: hàng đợi Mergify

1. PR được các chiến dịch xem xét/xác nhận đạt yêu cầu và được cổng ⭐ trước khi hợp nhất của chủ sở hữu phê duyệt
   (báo cáo + quyết định cho từng mục — xem `/merge-prs` Bước 0.75).
2. Chủ sở hữu (hoặc phiên làm việc thực hiện quyết định của chủ sở hữu) áp dụng nhãn **`queue`**.
   Nhãn này CHÍNH LÀ phê duyệt hợp nhất; Mergify chỉ thực thi quyết định đó.
3. Mergify xác thực các PR trong hàng đợi **theo tuần tự** (mỗi lần một PR) dựa trên các cổng kiểm tra nhanh
   rồi hợp nhất (squash). Xử lý theo lô + tự động chia đôi để xác định lỗi thuộc gói Mergify trả phí
   ("Cannot use Merge Queue batch" trên gói miễn phí, #7220), vì vậy `.mergify.yml` không đặt
   `batch_size`; việc xử lý theo lô vẫn là nhiệm vụ của quy trình merge-train thủ công bên dưới. Một PR có
   các bước kiểm tra vẫn đang chờ sau `checks_timeout` (240 phút = 2× p95 đo được của
   `quality.yml`) sẽ bị loại khỏi hàng đợi thay vì làm đình trệ hàng đợi.
4. Sau khi hợp nhất, quy trình làm việc liên tục xác nhận trạng thái sẵn sàng phát hành sẽ kiểm tra đầu nhánh mới khi có push
   và mở một issue ghi nhận trách nhiệm nếu tổ hợp đó gây hồi quy (không bao giờ tự động revert).

Các biện pháp bảo vệ (phản ánh `CLAUDE.md` Quy tắc Cứng #21/#22):

- **Đang đóng băng bản phát hành** → KHÔNG gắn nhãn cho các PR nhắm đến nhánh bị đóng băng; trước tiên hãy đổi đích sang
  `release/vX+1` đang hoạt động.
- **PR đang được xử lý của phiên khác** → không bao giờ gắn nhãn cho PR đó; chỉ phiên sở hữu mới đưa
  công việc của mình vào hàng đợi.
- Các diff chỉ liên quan đến kiểm thử và các PR có nhãn `hotfix` đã chạy CI rút gọn (xem
  `RELEASE_CHECKLIST.md` → Làn Nhanh Hotfix); các điều kiện của hàng đợi chấp nhận bất kỳ
  tập kiểm tra nào thực sự đã chạy (`#check-failure=0` + `#check-pending=0`).

## Phương án dự phòng: đoàn tàu hợp nhất thủ công

Được sử dụng khi hàng đợi không khả dụng. Quy trình này chính thức hóa cách làm đã xử lý xong 33 PR
trong một ngày ở chu kỳ v3.8.47:

1. **Tập hợp lô** (~10–30 PR đã được đánh giá+phê duyệt). Kiểm tra các xung đột `linked:`
   (cùng `tap.testFiles`, cùng các đoạn CHANGELOG) và xử lý tuần tự những PR đó.
2. **Xác thực MỘT LẦN**: trong một worktree cô lập tách từ đầu nhánh phát hành, hợp nhất cục bộ tất cả
   các đầu nhánh trong lô, sau đó chạy bộ kiểm thử tương đương phát hành
   (`npm run check:release-green`, thêm `--with-build` trước khi phát hành).
   `scripts/release/merge-train.sh <base> <PR#>…` tự động hóa các bước 1–2 (các
   PR xung đột bị loại ra, đoàn tàu tiếp tục). Chế độ đầy đủ chạy `npm run test:unit` — trình
   chạy được tinh chỉnh theo máy (`--test-concurrency=20`), **không phải** hai phân đoạn CI 4 lõi
   tuần tự, vốn khiến giai đoạn chiếm ưu thế chỉ sử dụng khoảng ~25% máy 16 lõi (đã sửa
   ngày 2026-07-18). `--fast` (dùng để xử lý các đoàn tàu cực lớn trong ngày, được chủ sở hữu phê duyệt ngày 2026-07-18)
   giữ lại mọi cổng tĩnh + vitest nhưng chỉ chạy các tệp node:test được thay đổi bởi
   các PR đã lên tàu; bộ kiểm thử ĐẦY ĐỦ vẫn phải chạy ít nhất một lần mỗi ngày trên
   đầu nhánh tích lũy (một đoàn tàu không dùng `--fast`).
3. **Xanh** → hợp nhất các PR theo thứ tự (kiểm tra lại `state,headRefOid` trước mỗi PR —
   PR có đầu nhánh đã thay đổi phải được đánh giá lại). Chứng minh diff ròng của mỗi lần hợp nhất là
   thay đổi riêng của PR đó (không hoàn tác qua tự động giải quyết xung đột: kiểm tra `git diff --stat` để phát hiện
   các nội dung bị xóa nằm ngoài phạm vi).
4. **Đỏ** → chia đôi lô (xác thực từng nửa) thay vì xác thực lại
   từng PR một; đưa PR gây lỗi trở lại hàng đợi đánh giá kèm theo bằng chứng.
5. **Không bao giờ**: hợp nhất vào nhánh bị đóng băng trong thời gian đóng băng; dùng `git stash` ở bất kỳ đâu;
   chạy lại CI hàng loạt với hy vọng trạng thái đỏ sẽ biến mất (quy tắc: trạng thái đỏ là thông tin).

## Phân tầng (vì sao hàng đợi an toàn khi chỉ dùng các cổng kiểm tra nhanh)

- **Mỗi PR** (các cổng kiểm tra nhanh trong quality.yml): các kiểm thử chịu tác động theo TIA + bộ kiểm thử đơn vị đầy đủ chia 4 phân đoạn +
  vitest + nhóm kiểm tra lint + kiểm tra kiểu + tính toàn vẹn của tài liệu/changelog.
- **Mỗi lô/đầu nhánh** (phát hành xanh liên tục): các cổng CỨNG `--quick` trên mỗi lần push vào
  nhánh phát hành; các lượt quét đầy đủ `--with-build --full-ci` 3 lần/ngày.
- **Mỗi bản phát hành** (ci.yml trên PR phát hành): ma trận hoàn chỉnh bao gồm E2E ×9,
  package-artifact + kiểm thử khởi động nhanh tarball, độ bao phủ/các ngưỡng tăng dần.

Không có nội dung nào được xác thực ít hơn trước — phần kiểm tra nặng chỉ được chạy theo từng lô/đầu nhánh
thay vì theo từng PR, và chính điều này loại bỏ số vòng trao đổi O(N).

## Điều kiện tiên quyết trên bản checkout mới cho `merge-train.sh`

Script chạy bước **kiểm tra trước** theo kiểu thất bại nhanh trên bản checkout gốc (trước mọi thao tác với worktree)
để một bản cài đặt lỗi không bao giờ có thể bị nhầm thành đoàn tàu đỏ:

1. Chạy `npm ci`, sau đó chạy postinstall của `bun` mà npm chặn:
   `(cd node_modules/bun && node install.js)` — nếu không, `check:provider-consistency`
   và `check:known-symbols` (cả hai đều là `bun scripts/…`) sẽ thất bại trên CẢ đoàn tàu VÀ nhánh cơ sở mà
   không có dòng báo vi phạm.
2. Không được có `node_modules/node_modules` dư thừa (một cây phụ thuộc trùng lặp; React được tải hai lần
   và các bộ kiểm thử UI vitest thất bại ngay lập tức).
3. `node_modules/.bin/tsc` phải tồn tại và có thể thực thi (bản cài đặt không đầy đủ sẽ thiếu tệp này).

Đoàn tàu chạy lệnh bắt buộc `npm run check:cycles:ratchet`; `npm run check:cycles`
đơn thuần chỉ mang tính tư vấn (liệt kê các SCC và thoát với mã khác không ngay cả trên một nhánh cơ sở khỏe mạnh).
