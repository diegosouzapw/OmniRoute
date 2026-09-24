# Merge Queue & Manual Merge-Train Runbook (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Kể từ v3.8.49 (WS3.2/WS3.4 của kế hoạch chất lượng/tốc độ), đường dẫn hợp nhất mặc định cho
các PR đã được đánh giá vào `release/vX.Y.Z` là **hàng đợi hợp nhất của Mergify** (`.mergify.yml`);
**đoàn tàu hợp nhất thủ công** được ghi lại dưới đây là phương án DỰ PHÒNG — được dùng khi có sự cố,
đóng băng phát hành hoặc nếu gói Mã nguồn mở của Mergify thay đổi.

## Đường dẫn mặc định: hàng đợi Mergify

1. PR được các chiến dịch đánh giá/đưa về trạng thái xanh và được cổng ⭐ trước hợp nhất
   của chủ sở hữu phê duyệt (báo cáo + quyết định cho từng mục — xem `/merge-prs` Bước 0.75).
2. Chủ sở hữu (hoặc phiên làm việc thực hiện quyết định của chủ sở hữu) áp dụng nhãn **`queue`**.
   Nhãn này CHÍNH LÀ sự phê duyệt hợp nhất; Mergify chỉ thực thi việc đó.
3. Mergify gom tối đa 10 PR đang chờ thành một lô, xác thực lô theo các cổng kiểm tra nhanh
   và hợp nhất (squash). Một lô đỏ được **tự động chia đôi để xác định lỗi** — PR gây lỗi
   được cô lập sau khoảng ~log2(N) lần xác thực lại và bị loại khỏi hàng đợi; các PR còn lại tiếp tục.
4. Sau khi hợp nhất, quy trình release-green liên tục xác thực đầu nhánh mới khi có push
   và mở một issue quy trách nhiệm nếu tổ hợp thay đổi gây hồi quy (không bao giờ tự động hoàn tác).

Các biện pháp bảo vệ (phản ánh `CLAUDE.md` Quy tắc Cứng #21/#22):

- **Đang đóng băng phát hành** → KHÔNG gắn nhãn cho các PR nhắm đến nhánh đang bị đóng băng;
  trước tiên hãy đổi mục tiêu sang `release/vX+1` đang hoạt động.
- **PR đang được xử lý của một phiên khác** → không bao giờ gắn nhãn cho PR đó; chỉ phiên sở hữu
  mới đưa công việc của mình vào hàng đợi.
- Các diff chỉ chứa kiểm thử và PR có nhãn `hotfix` đã chạy CI rút gọn (xem
  `RELEASE_CHECKLIST.md` → Luồng Nhanh Hotfix); các điều kiện của hàng đợi chấp nhận bất kỳ
  tập kiểm tra nào thực sự đã chạy (`#check-failure=0` + `#check-pending=0`).

## Phương án dự phòng: đoàn tàu hợp nhất thủ công

Được dùng khi hàng đợi không khả dụng. Quy trình này chuẩn hóa cách làm đã xử lý hết 33 PR
trong một ngày trong chu kỳ v3.8.47:

1. **Tập hợp lô** (~10–30 PR đã được đánh giá+phê duyệt). Kiểm tra các xung đột `linked:`
   (cùng `tap.testFiles`, cùng các đoạn CHANGELOG) và xử lý tuần tự những PR đó.
2. **Xác thực MỘT LẦN**: trong một worktree cô lập tách từ đầu nhánh phát hành, hợp nhất cục bộ
   tất cả các head của lô, sau đó chạy bộ kiểm thử tương đương với bản phát hành
   (`npm run check:release-green`, thêm `--with-build` trước một bản phát hành).
   `scripts/release/merge-train.sh <base> <PR#>…` tự động hóa các bước 1–2 (các PR xung đột
   bị loại ra, đoàn tàu tiếp tục). Chế độ đầy đủ chạy `npm run test:unit` — trình chạy được
   tinh chỉnh cho máy (`--test-concurrency=20`), **không phải** hai shard CI 4 lõi chạy tuần tự,
   vốn khiến giai đoạn chi phối chỉ sử dụng ~25% máy 16 lõi (đã sửa
   2026-07-18). `--fast` (xử lý các siêu đoàn tàu trong ngày, được chủ sở hữu phê duyệt 2026-07-18)
   giữ lại mọi cổng tĩnh + vitest nhưng chỉ chạy các tệp node:test được thay đổi bởi những PR
   đã lên tàu; bộ kiểm thử ĐẦY ĐỦ vẫn phải chạy ít nhất một lần mỗi ngày trên đầu nhánh
   tích lũy (một đoàn tàu không có `--fast`).
3. **Xanh** → hợp nhất các PR theo trình tự (kiểm tra lại `state,headRefOid` trước mỗi PR —
   PR có head đã thay đổi phải quay lại quy trình đánh giá). Chứng minh rằng diff ròng của mỗi
   lần hợp nhất chính là thay đổi của PR đó (không tự động giải quyết bằng cách hoàn tác: kiểm tra
   `git diff --stat` để phát hiện các phần xóa nằm ngoài phạm vi).
4. **Đỏ** → chia đôi lô (xác thực từng nửa) thay vì xác thực lại từng PR một; đưa PR gây lỗi
   trở lại hàng đợi đánh giá cùng với bằng chứng.
5. **Không bao giờ**: hợp nhất vào nhánh đang bị đóng băng trong thời gian đóng băng phát hành;
   dùng `git stash` ở bất cứ đâu; chạy lại CI hàng loạt với hy vọng trạng thái đỏ sẽ biến mất
   (quy tắc: trạng thái đỏ là thông tin).

## Phân tầng (lý do hàng đợi an toàn khi chỉ dùng các cổng kiểm tra nhanh)

- **Mỗi PR** (các cổng kiểm tra nhanh của quality.yml): các kiểm thử chịu tác động theo TIA +
  toàn bộ kiểm thử đơn vị với 4 shard + vitest + nhóm lint + kiểm tra kiểu + tính toàn vẹn của
  tài liệu/changelog.
- **Mỗi lô/đầu nhánh** (release-green liên tục): các cổng CỨNG `--quick` trên mỗi lần push vào
  nhánh phát hành; các lượt quét đầy đủ `--with-build --full-ci` 3×/ngày.
- **Mỗi bản phát hành** (ci.yml trên PR phát hành): ma trận hoàn chỉnh, bao gồm E2E ×9,
  package-artifact + kiểm tra khởi động nhanh tarball, độ bao phủ/các ngưỡng tăng dần.

Không có gì được xác thực ít hơn trước — phần kiểm tra nặng chỉ được chạy theo từng lô/đầu nhánh
thay vì theo từng PR, và chính điều đó loại bỏ các lượt khứ hồi O(N).
