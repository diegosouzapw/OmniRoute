# Release-Green: keeping the queue and release branch green (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Vấn đề được giải quyết

**Cổng kiểm tra đầy đủ** (`.github/workflows/ci.yml` — các shard unit test, vitest, ratchet,
`package-artifact`, SonarQube, E2E) **chỉ chạy trên PR phát hành** (PR → `main`). Các PR nhắm đến
`release/**` nhận các **cổng kiểm tra nhanh** (`quality.yml`: các bài kiểm thử bị ảnh hưởng theo TIA + kiểm tra kiểu + lint)
và, đối với các thay đổi mã nguồn, một bản dựng production mang tính **tham khảo**. Hệ quả: các lỗi đỏ chỉ xuất hiện khi phát hành vẫn có thể
âm thầm tích tụ trên nhánh phát hành và **bùng nổ thành từng lớp mất khoảng 40 phút** vào thời điểm phát hành,
lần lượt từng lỗi một.

"Nhóm release-green" tồn tại để **dự đoán trước** những lỗi đỏ đó — xác thực tương đương với cổng kiểm tra đầy đủ
**cục bộ / bên ngoài quy trình phát hành**, vào bất kỳ lúc nào, để PR phát hành đã
xanh ngay trong lần chạy CI đầu tiên.

> **Nguyên tắc không thể thương lượng:** không phần nào trong số này chặn người đóng góp. Chúng tôi không thêm một bước kiểm tra bắt buộc
> khiến PR của họ thất bại. **Độ lệch** (ratchet) là để người bảo trì tái lập đường cơ sở khi phát hành —
> tuyệt đối không phải mối bận tâm của người đóng góp. Không phần nào **đóng** PR (chiếm công) hoặc
> **làm yếu** một bài kiểm thử để vượt qua.

## Nhóm này (4 thành phần) — và cách mỗi thành phần chạy độc lập

| Thành phần                                                                  | Nội dung                                                                                 | Thời điểm chạy                                                                   | Phạm vi                            |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------- |
| **`/green-prs`** (Giải pháp A)                                              | Người bảo trì quét theo yêu cầu **hàng đợi các PR đang mở**                              | **Độc lập, định kỳ** — và đặc biệt là **trước** một lần chạy `/generate-release` | Toàn bộ hàng đợi PR → `release/**` |
| **`/validate-release-green`** (Giải pháp C — `npm run check:release-green`) | Công cụ xác thực: tái tạo cổng kiểm tra đầy đủ trên một nhánh HOẶC một ứng viên hợp nhất | Độc lập, vào bất kỳ lúc nào                                                      | Một nhánh cụ thể hoặc một merge-PR |
| **`/babysit <PR#>`**                                                        | Điều phối **CI trực tiếp** của **một** PR cho đến khi xanh                               | Độc lập, theo từng PR                                                            | Một PR duy nhất                    |
| **`nightly-release-green.yml`** (Giải pháp D)                               | Workflow hằng đêm tự động; mở issue khi có lỗi đỏ HARD                                   | Tự động (cron)                                                                   | Nhánh phát hành đang hoạt động     |

**Câu trả lời ngắn cho "cái này chỉ dành cho các bản phát hành phải không?":** **không.** `/green-prs` được thiết kế để
chạy **định kỳ, giữa các lần phát hành**. Chạy độc lập là cách sử dụng thông thường — phát hành chỉ là
thời điểm mà việc chạy nó mang lại nhiều giá trị nhất.

## Bản build tư vấn từ PR đến bản phát hành

`quality.yml` hiện bao gồm `Build (advisory)` cho các PR mã không phải bản nháp và các nhánh hàng đợi Mergify.
Nó mô phỏng quy trình build production từ `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` và `npm run build` với `OMNIROUTE_USE_TURBOPACK=1`. Quy trình này chủ ý
không tải lên artifact build vì không có job kiểm tra chất lượng hạ nguồn nào sử dụng artifact trong workflow này.
Hãy xóa `continue-on-error` sau một tuần chạy ổn định trên các PR phát hành để tín hiệu này trở thành
cổng chặn bắt buộc từ PR đến bản phát hành.

## Giải pháp C — `npm run check:release-green` (bộ máy)

Tái tạo quy trình xác thực tương đương bản phát hành trên cây làm việc hiện tại và phân loại từng trạng thái đỏ:

- **HARD** (typecheck, lỗi lint, unit, vitest, db-rules, public-creds, `package-artifact`
  tùy chọn) → **lỗi thực sự**; `exit 1`. Được sửa trên nhánh nguồn (TDD, Quy tắc #18).
- **DRIFT** (**cảnh báo** eslint, cognitive-complexity, file-size) → độ lệch ratchet tích lũy trong
  chu kỳ, **không phải lỗi của người đóng góp**; chỉ được báo cáo và **được người bảo trì thiết lập lại đường cơ sở khi
  phát hành**. DRIFT **không bao giờ** thay đổi mã thoát — vì vậy nó không bao giờ chặn bất kỳ ai.

```bash
npm run check:release-green                 # nhánh hiện tại (cây làm việc)
node scripts/quality/validate-release-green.mjs --json   # đầu ra có cấu trúc
node scripts/quality/validate-release-green.mjs --quick  # bỏ qua unit+vitest (chỉ drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # bao gồm package-artifact (chậm)
```

Chỉ chẩn đoán và **báo cáo** (không tự động sửa). Quy trình điều phối sửa để đạt trạng thái xanh nằm trong
`/green-prs` và `/review-prs`.

## Giải pháp A — `/green-prs` (quét hàng đợi)

Quy trình (tóm tắt — xem kỹ năng `green-prs` để biết chi tiết):

1. **Kiểm kê** hàng đợi các PR đang mở nhắm đến nhánh phát hành hiện hoạt.
2. **Phân loại** từng PR (khả thi / đáng từ chối / cần tác giả xử lý) — các PR đáng từ chối/cần tác giả xử lý
   **được báo cáo, không bị đóng** (tác giả quyết định).
3. Với mỗi PR khả thi, trong một **worktree biệt lập** (Quy tắc #19), đưa PR lên đầu nhánh phát hành rồi chạy
   `npm run check:release-green`:
   - **HARD** → sửa **trên nhánh của người đóng góp** thông qua đồng tác giả (giữ nguyên trạng thái "Merged" của tác giả),
     chạy lại cho đến khi xử lý hết mọi trạng thái HARD.
   - **DRIFT** → giữ nguyên; đường cơ sở sẽ được thiết lập lại khi phát hành.
4. **Báo cáo** bảng PR × (kết luận, trạng thái đỏ HARD, đã sửa?, DRIFT, hiện đã release-green?).

Có thể **chuẩn bị** hàng đợi mà không merge; chỉ merge khi được yêu cầu rõ ràng — và không bao giờ đóng PR.

## Nhịp chạy được đề xuất

- Chạy **`/green-prs` định kỳ** (ví dụ: hàng tuần) và **luôn chạy trước khi
  chạy `/generate-release`**.
- Duy trì **`nightly-release-green.yml`** (Giải pháp D) làm tín hiệu liên tục: khi nó mở một issue
  có trạng thái đỏ HARD, đó là lúc cần quét.
- Dùng **`/validate-release-green`** tùy trường hợp để kiểm tra một nhánh hoặc một ứng viên merge cụ thể.
- Dùng **`/babysit <PR#>`** khi cần theo sát một PR cụ thể để đưa nó về trạng thái xanh trên CI trực tiếp.

## Mối quan hệ với bản phát hành

- `/generate-release` gọi quy trình xác thực trong **Giai đoạn 0 (kiểm tra trước)**: thiết lập lại đường cơ sở cho DRIFT và sửa
  HARD trước khi mở PR phát hành.
- `/review-prs` sử dụng cổng release-green tại bước quyết định merge (xanh-trước-khi-merge).

Mục tiêu của tất cả các thành phần đều giống nhau: **PR phát hành xanh ngay trong lần chạy CI đầu tiên**, thay vì phải xử lý
các trạng thái đỏ theo từng lớp kéo dài 40 phút vào ngày phát hành.
