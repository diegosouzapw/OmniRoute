# 🗜️ Prompt Compression Guide — OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Tự động tiết kiệm 15-95% đối với ngữ cảnh đủ điều kiện. Để xem tổng quan nhanh, hãy xem [phần Nén trong README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Tổng quan

OmniRoute triển khai một quy trình nén prompt dạng mô-đun, chạy **chủ động** trước khi các yêu cầu đến nhà cung cấp thượng nguồn. Điều này có nghĩa là việc tiết kiệm token diễn ra một cách minh bạch — bạn không cần thay đổi quy trình làm việc.

```
Yêu cầu từ máy khách
  → Bộ chọn chiến lược nén
    → Có ghi đè bằng tổ hợp? → Sử dụng cài đặt của tổ hợp
    → Đạt ngưỡng tự động kích hoạt? → Sử dụng chế độ tự động
    → Chế độ mặc định? → Sử dụng cài đặt toàn cục
    → Tắt? → Bỏ qua việc nén
  → Chế độ nén đã chọn
    → Tắt: Không nén
    → Nhẹ: Dọn dẹp khoảng trắng/định dạng an toàn (~15%)
    → Tiêu chuẩn: Loại bỏ từ ngữ dư thừa theo kiểu điện tín (~30%)
    → Mạnh: Làm cũ lịch sử + tóm tắt (~50%)
    → Siêu nén: Cắt tỉa theo phương pháp heuristic + tinh gọn khối mã (~75%)
    → RTK: Lọc đầu ra terminal/công cụ có nhận biết lệnh (phạm vi thượng nguồn 60-90%)
    → Xếp chồng: Quy trình đa công cụ theo thứ tự, thường là RTK rồi Caveman (phạm vi đủ điều kiện 78-95%)
  → Yêu cầu đã nén → Nhà cung cấp
```

---

## Các chế độ nén

### Tắt

Không áp dụng nén. Tất cả thông báo được chuyển tiếp mà không thay đổi.

### Chế độ nhẹ (tiết kiệm ~15%, độ trễ <1ms)

Chế độ an toàn nhất — không thay đổi ngữ nghĩa, chỉ dọn dẹp định dạng:

| Kỹ thuật                 | Mô tả                                                    |
| ------------------------ | -------------------------------------------------------- |
| `collapseWhitespace`     | Gộp các dòng trống liên tiếp và khoảng trắng ở cuối dòng |
| `dedupSystemPrompt`      | Loại bỏ các thông báo hệ thống trùng lặp                 |
| `compressToolResults`    | Nén đầu ra dài dòng của công cụ/hàm                      |
| `removeRedundantContent` | Loại bỏ các hướng dẫn lặp lại                            |
| `replaceImageUrls`       | Rút gọn URI dữ liệu hình ảnh base64                      |

**Phù hợp nhất cho:** Sử dụng thường xuyên, các quy trình làm việc yêu cầu an toàn cao.

### Chế độ tiêu chuẩn (tiết kiệm ~30%)

Lấy cảm hứng từ [Caveman](https://github.com/JuliusBrussee/caveman) — loại bỏ các từ đệm và cách diễn đạt dài dòng trong khi vẫn giữ nguyên ý nghĩa:

- Loại bỏ các từ đệm ("please", "I think", "basically", "actually")
- Rút gọn các cụm từ dài dòng ("in order to" → "to", "as a result of" → "because")
- Loại bỏ cách diễn đạt giảm nhẹ mang tính lịch sự ("Would you mind...", "If you could possibly...")
- Hơn 30 quy tắc regex được tinh chỉnh cho prompt lập trình

**Phù hợp nhất cho:** Quy trình lập trình hằng ngày, các nhóm chú trọng chi phí.

### Chế độ mạnh (tiết kiệm ~50%)

Quản lý lịch sử thông minh cho các phiên làm việc dài:

- **Làm cũ thông báo** — các thông báo cũ hơn được nén dần dần
- **Tóm tắt kết quả công cụ** — đầu ra dài của công cụ được thay thế bằng bản tóm tắt
- **Cơ chế bảo vệ tính toàn vẹn cấu trúc** — đảm bảo các cặp `tool_use` + `tool_result` luôn nhất quán
- **Nhận biết cửa sổ ngữ cảnh** — tuân thủ giới hạn token của từng mô hình

**Phù hợp nhất cho:** Các phiên gỡ lỗi kéo dài, cơ sở mã lớn.

### Chế độ siêu nén (tiết kiệm ~75%)

Mức nén tối đa cho các tình huống khắt khe về token:

- **Cắt tỉa theo phương pháp heuristic** — loại bỏ các thông báo có mức độ liên quan thấp hơn ngưỡng
- **Tinh gọn khối mã** — nén các ví dụ mã lặp lại
- **Cắt ngắn bằng tìm kiếm nhị phân** — tìm điểm cắt tối ưu cho cửa sổ ngữ cảnh
- Bao gồm tất cả tính năng của chế độ Mạnh

**Phù hợp nhất cho:** Khi bạn liên tục chạm giới hạn ngữ cảnh.

### Chế độ RTK (phạm vi thượng nguồn 60-90%)

Chế độ RTK được tối ưu hóa cho đầu ra dài dòng của công cụ xuất hiện trong các phiên tác nhân lập trình:

- Phát hiện các lớp lệnh/đầu ra như `git status`, `git diff`, `git log`, trình chạy kiểm thử,
  bản dựng TypeScript/Vite/Webpack, ESLint/Biome/Prettier, hoạt động kiểm tra/cài đặt npm, nhật ký Docker, đầu ra
  hạ tầng và đầu ra shell chung
- Áp dụng các gói bộ lọc JSON từ `open-sse/services/compression/engines/rtk/filters/`
- Nhập bộ lọc theo lược đồ RTK TOML v1 từ các tệp `filters.toml` của dự án hoặc toàn cục, kèm theo
  xác thực kiểm thử nội tuyến và cơ chế kiểm soát độ tin cậy đối với tệp dự án
- Đi kèm 49 bộ lọc tích hợp sẵn cùng các mẫu xác minh nội tuyến
- Loại bỏ chuỗi điều khiển ANSI, thanh tiến trình, các dòng lặp lại và nội dung nhiễu không hữu ích
- Giữ lại lỗi nghiêm trọng, lỗi, cảnh báo, các tệp đã thay đổi, bản tóm tắt và phần cuối của đầu ra dài
- Hỗ trợ bộ lọc dự án có kiểm soát độ tin cậy, bộ lọc toàn cục và tùy chọn khôi phục đầu ra thô đã được che thông tin nhạy cảm

**Phù hợp nhất cho:** Các phiên tác nhân có bản ghi shell, bản dựng, kiểm thử, git, grep và đầu ra tệp.

### Chế độ xếp chồng (phạm vi đủ điều kiện 78-95%)

Chế độ xếp chồng chạy nhiều công cụ nén theo một thứ tự xác định. Quy trình mặc định là:

```txt
RTK -> Caveman
```

Thứ tự này trước tiên giúp thu gọn đầu ra terminal/công cụ, sau đó áp dụng khả năng cô đọng ngữ nghĩa của Caveman cho
phần prompt ngôn ngữ tự nhiên còn lại. Các quy trình xếp chồng có thể được cấu hình toàn cục hoặc thông qua
các tổ hợp nén được gán cho tổ hợp định tuyến.

**Phù hợp nhất cho:** Ngữ cảnh hỗn hợp có nhật ký công cụ lớn cùng với hướng dẫn của con người hoặc bản tóm tắt của trợ lý.

---

## Phép tính mức tiết kiệm từ các dự án thượng nguồn

OmniRoute ghi nhận mức tiết kiệm nhờ nén từ hai nguồn: các phép đo hiệu năng của dự án thượng nguồn và
sự kết hợp các engine của chính OmniRoute.

| Nguồn   | Số liệu từ README thượng nguồn được sử dụng tại đây                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | Ít hơn `~75%` token đầu ra, mức tiết kiệm đầu ra trung bình theo phép đo là `65%`, phạm vi `22-87%` và công cụ nén đầu vào `~46%` |
| RTK     | Tiết kiệm `60-90%` đối với đầu ra lệnh; phiên mẫu từ `~118,000 -> ~23,900` token, tương đương tiết kiệm `79.7%` (`~80%`)          |

Đối với các tải trọng công cụ/ngữ cảnh chồng lấn, tổ hợp OmniRoute mặc định xếp chồng các engine:

```txt
RTK -> Caveman
```

Mức tiết kiệm kết hợp được tính theo phép nhân, không phải phép cộng:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Con số `78-95%` đó áp dụng khi cả RTK và Caveman đều có thể giảm cùng một tải trọng đầu vào/ngữ cảnh.
Chế độ đầu ra phản hồi của Caveman là riêng biệt: khi được bật, hãy sử dụng mức tiết kiệm đầu ra riêng của Caveman (trung bình `65%`,
con số nổi bật `~75%`, phạm vi `22-87%`). Tổng mức tiết kiệm chi phí phụ thuộc vào tỷ lệ giữa prompt và đầu ra của bạn.

### "Đủ điều kiện" thực sự có nghĩa là gì

Phạm vi nổi bật 15-95% là có thật, nhưng chỉ áp dụng cho nội dung **dư thừa hoặc dài dòng** — các dòng
lỗi lặp lại, nhật ký build liên tục xuất cùng một cảnh báo, dữ liệu kết xuất quá lớn từ `grep`/đọc tệp. Điều đó
**không** có nghĩa là mọi yêu cầu đều tiết kiệm được nhiều như vậy.

Đã được xác minh bằng thực nghiệm (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): một lần chạy
`stacked` (RTK + Caveman) trên khối `tool_result` theo cấu trúc Anthropic chứa 300 dòng
lỗi giống hệt nhau đã tạo ra **mức tiết kiệm token 95.93% / mức tiết kiệm ký tự 96.26%** — hoàn toàn nằm trong phạm vi
được công bố. Tuy nhiên, khi cùng quy trình đó chạy trên đầu ra công cụ thông thường, không dư thừa (một danh sách kết quả khớp `grep` gọn gàng,
một lần đọc tệp ngắn, văn bản hội thoại thông thường), nó tạo ra **mức tiết kiệm gần bằng không** như mong đợi, vì
không có nội dung lặp lại nào để loại bỏ và `validateCompression()` (`validation.ts`) từ chối gửi một
bản viết lại có thể làm mất hoặc thay đổi các khối mã, URL, tiêu đề, phiên bản hoặc các định danh hằng số viết HOA-TOÀN-BỘ.

Đây là hành vi an toàn và đúng như mong đợi, không phải lỗi: một phiên lập trình chủ yếu đọc/dùng `grep` trên các tệp gọn gàng sẽ
chỉ đạt tổng mức tiết kiệm khiêm tốn ngay cả khi tính năng nén được bật hoàn toàn, trong khi một phiên gặp phải
vòng lặp lỗi hoặc một linter xuất quá nhiều thông tin sẽ đạt được toàn bộ phạm vi 78-95% trên lưu lượng đó. Đừng dùng
tỷ lệ tiết kiệm tổng hợp thấp của một phiên duy nhất làm bằng chứng rằng tính năng nén bị cấu hình sai — trước tiên hãy kiểm tra xem
đầu ra công cụ bên dưới có thực sự dư thừa hay không.

---

## Trực quan hóa mức tiết kiệm token

```
Không nén:             47K token được gửi đến LLM
Với Lite:              40K token được gửi          (tiết kiệm 15% — an toàn, luôn bật)
Với Standard:          33K token được gửi          (tiết kiệm 30% — các quy tắc caveman-speak)
Với Aggressive:        24K token được gửi          (tiết kiệm 50% — lão hóa + tóm tắt)
Với Ultra:             12K token được gửi          (tiết kiệm 75% — cắt tỉa theo phương pháp heuristic)
Với RTK:               19K-5K token được gửi       (tiết kiệm 60-90% trên đầu ra lệnh/công cụ)
Với Stacked:           10K-2.5K token được gửi     (phạm vi RTK+Caveman đủ điều kiện 78-95%)
```

---

## Cấu hình

### Bảng điều khiển

Điều hướng đến `Dashboard → Context & Cache`:

- **Caveman** — lựa chọn chế độ, gói ngôn ngữ, xem trước và cài đặt mặc định toàn cầu
- **RTK** — xem trước bộ lọc lệnh, cài đặt an toàn RTK và danh mục bộ lọc
- **Compression Combos** — các pipeline engine được đặt tên được gán cho các combo định tuyến
- **Auto-Trigger Threshold** — tự động kích hoạt nén khi số lượng token vượt quá ngưỡng

### Ghi đè theo từng Combo

Trong `Dashboard → Context & Cache → Compression Combos`, gán một combo nén cho một combo định tuyến:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Điều này cho phép bạn sử dụng nén xếp chồng trên các nhà cung cấp miễn phí/mã hóa trong khi vẫn giữ chế độ lite trên các gói đăng ký trả phí.

Việc gán "Ghi đè theo từng Combo" này là một điều khiển khác với ghi đè **chế độ nén combo định tuyến** (Default/Off/Lite/Standard/Aggressive/Ultra) — ghi đè đó không chọn một pipeline combo nén được đặt tên; nó chỉ đặt trường `compressionMode` được tham chiếu bởi `resolveCompressionPlan`. Nó có thể được đặt trên thẻ combo (`Dashboard → Combos`) hoặc, kể từ #6760, theo từng combo định tuyến trong danh sách "Assign to routing" trên `Dashboard → Context & Cache → Compression Combos`, ngay bên cạnh hộp kiểm gán pipeline đã được ghi lại ở trên. Cả hai giao diện đều được duy trì thông qua cùng một điểm cuối `PUT /api/combos/{id}`.

### Ghi đè theo từng yêu cầu

Gửi tiêu đề yêu cầu `x-omniroute-compression` để ghi đè kế hoạch nén cho một yêu cầu duy nhất. Nó có độ ưu tiên cao nhất — nó đánh bại ghi đè combo định tuyến, hồ sơ hoạt động, tự động kích hoạt và bảng điều khiển Mặc định. Các giá trị không xác định bị bỏ qua (yêu cầu không bao giờ bị từ chối) và công tắc chính toàn cầu vẫn kiểm soát mọi thứ: khi nén bị tắt toàn cầu, tiêu đề không thể bật nó lên. Các giá trị:

| Giá trị       | Hiệu ứng                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| `off`         | Không nén cho yêu cầu này.                                                                                  |
| `default`     | Hồ sơ Mặc định được lấy từ bảng điều khiển (bỏ qua hồ sơ hoạt động). Các engine mất dữ liệu bị tắt.         |
| `safe`        | Giống như bỏ qua tiêu đề: chỉ loại bỏ trùng lặp và gộp khoảng trắng.                                        |
| `allow-lossy` | Giữ nguyên kế hoạch vận hành của yêu cầu này, bao gồm tóm tắt, bộ lọc liên quan và viết lại kiểu.           |
| `engine:<id>` | Một engine duy nhất khi được bật, ví dụ: `engine:rtk`. Đây là tùy chọn tham gia theo yêu cầu cho engine đó. |
| `<combo>`     | Một combo được đặt tên, được khớp theo tên (không phân biệt chữ hoa chữ thường) trước, sau đó theo id.      |

Nếu không có `allow-lossy`, `engine:<id>`, hoặc một combo được đặt tên, các engine mất dữ liệu sẽ không được áp dụng. Yêu cầu vẫn nhận được loại bỏ trùng lặp phiên và gộp khoảng trắng khi nén được bật.

Kế hoạch được áp dụng được phản hồi lại trong tiêu đề phản hồi `X-OmniRoute-Compression: <mode>; source=<source>`, trong đó `<source>` là một trong `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, hoặc `off`.

### API

```bash
# Lấy cài đặt nén
curl http://localhost:20128/api/settings/compression

# Cập nhật cài đặt nén
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Xem trước một payload RTK/stacked cụ thể
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Liệt kê các gói bộ lọc RTK
curl http://localhost:20128/api/context/rtk/filters

# Kiểm tra RTK trực tiếp với siêu dữ liệu lệnh tùy chọn
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Những gì được bảo vệ

Công cụ nén **luôn bảo toàn:**

- ✅ Các khối mã (có hàng rào và nội tuyến)
- ✅ URL và đường dẫn tệp
- ✅ Cấu trúc JSON và dữ liệu có cấu trúc
- ✅ Các định danh và token kỹ thuật được bảo vệ
- ✅ Biểu thức toán học
- ✅ Định nghĩa lệnh gọi công cụ/hàm
- ✅ Prompt hệ thống (ở chế độ lite)

Cơ chế khôi phục đầu ra thô của RTK sẽ biên tập ẩn các khóa API phổ biến, bearer token, Slack token, khóa truy cập AWS,
mật khẩu, token và thông tin bí mật trước khi bất kỳ dữ liệu nào được lưu trữ.

---

## Thống kê nén

Mỗi yêu cầu đã nén đều bao gồm các số liệu thống kê trong nhật ký máy chủ:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Lộ trình các giai đoạn

| Giai đoạn    | Chế độ                                                                                                                                                                   | Trạng thái      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| Giai đoạn 1  | Off, Lite                                                                                                                                                                | ✅ Đã phát hành |
| Giai đoạn 2  | Standard, Aggressive, Ultra                                                                                                                                              | ✅ Đã phát hành |
| Giai đoạn 3  | RTK, Stacked, Compression Combos                                                                                                                                         | ✅ Đã phát hành |
| Giai đoạn 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                              | ✅ Đã phát hành |
| Giai đoạn 4C | Ngân sách ngữ cảnh thích ứng ("quay số") — công cụ tính toán + API (`contextBudget` trên `PUT /api/settings/compression`) + điều khiển chế độ/chính sách bảng điều khiển | ✅ Đã phát hành |

---

## Lời cảm ơn

Các quy tắc nén của chế độ Standard được lấy cảm hứng từ **[Caveman](https://github.com/JuliusBrussee/caveman)** của **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ hơn 51 nghìn) — dự án lan truyền mạnh với phương châm "tại sao dùng nhiều token khi ít token cũng làm được". Caveman báo cáo đầu ra ít hơn `~75%` token, mức tiết kiệm đầu ra trung bình theo điểm chuẩn là `65%`, phạm vi tiết kiệm đầu ra `22-87%` và một công cụ nén đầu vào `~46%`.

Chế độ RTK được lấy cảm hứng từ **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** của **[RTK AI](https://github.com/rtk-ai)** — dự án nén đầu ra lệnh hiệu năng cao dành cho việc lọc đầu ra của terminal, bản dựng, kiểm thử, git và công cụ. RTK báo cáo mức tiết kiệm `60-90%`, trong đó phiên mẫu trong README cho thấy mức tiết kiệm `~80%`.

---

## Hệ thống nén nâng cao

Ngoài 7 chế độ tiêu chuẩn, OmniRoute còn bao gồm một số hệ thống nén nâng cao hoạt động tự động dựa trên ngữ cảnh.

### Nén nhận biết bộ nhớ đệm (Cache-Aware Compression)

Một số nhà cung cấp (như Anthropic với tính năng prompt caching) hỗ trợ **prompt caching**, cho phép họ lưu trữ các phần của prompt để giảm chi phí và độ trễ. Khi tính năng caching được bật, việc nén mạnh có thể thực sự **làm giảm** hiệu suất vì nó thay đổi các token đã được lưu vào bộ nhớ đệm, làm mất hiệu lực của bộ nhớ đệm.

Mô-đun `cachingAware.ts` giải quyết vấn đề này bằng cách **phát hiện ngữ cảnh caching** và **điều chỉnh chiến lược nén** cho phù hợp.

#### Cách hoạt động

1.  **Phát hiện ngữ cảnh caching** — Quét phần thân yêu cầu để tìm các dấu hiệu `cache_control`
2.  **Xác định nhà cung cấp hỗ trợ caching** — Kiểm tra xem nhà cung cấp mục tiêu có hỗ trợ caching hay không
3.  **Điều chỉnh chiến lược** — Hạ cấp `aggressive`/`ultra` xuống `standard` cho các nhà cung cấp hỗ trợ caching
4.  **Bỏ qua prompt hệ thống** — Các prompt hệ thống thường được lưu vào bộ nhớ đệm, vì vậy không nén chúng
5.  **Sử dụng các phép biến đổi xác định** — Chỉ sử dụng các phép biến đổi tạo ra đầu ra nhất quán

#### Ví dụ mã

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Khi nào sử dụng

Nén nhận biết bộ nhớ đệm (Cache-aware compression) **luôn bật** — không cần cấu hình. Nó chỉ hoạt động khi:

- Yêu cầu có các dấu hiệu `cache_control`
- Nhà cung cấp mục tiêu hỗ trợ prompt caching (Anthropic, OpenAI, v.v.)

### Lão hóa lũy tiến (Progressive Aging)

Các cuộc hội thoại dài tích lũy nhiều lượt tin nhắn, nhưng các lượt cũ hơn trở nên ít liên quan hơn. Mô-đun `progressiveAging.ts` **giảm chất lượng tin nhắn theo khoảng cách lượt**:

- **Các lượt gần đây (0-3)**: Giữ nguyên (chi tiết đầy đủ)
- **Các lượt trung bình (4-8)**: Nén nhẹ (xóa khoảng trắng, dọn dẹp định dạng)
- **Các lượt cũ (9+)**: Nén kiểu "người tiền sử" (Caveman compression) (loại bỏ từ đệm, tóm tắt)
- **Các lượt rất cũ (20+)**: Tóm tắt rất nhiều hoặc bị loại bỏ

#### Ví dụ mã

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // First 3 turns: verbatim
  light: 8, // Turns 4-8: lite compression
  moderate: 20, // Turns 9-20: caveman compression
  // Turns 21+: heavy summarization
});

// saved = number of tokens saved
```

#### Khi nào sử dụng

Lão hóa lũy tiến (Progressive aging) **luôn bật** cho các chế độ `aggressive` và `ultra`. Nó đặc biệt hiệu quả cho:

- Các phiên viết mã kéo dài
- Các cuộc hội thoại kéo dài nhiều ngày
- Các quy trình làm việc của tác nhân (agentic workflows) với nhiều lệnh gọi công cụ

### Chế độ đầu ra Caveman (Caveman Output Mode)

Mô-đun `outputMode.ts` chèn **hướng dẫn prompt hệ thống** để làm cho chính mô hình tạo ra đầu ra nén, ngắn gọn (kiểu "người tiền sử").

#### Cách hoạt động

Thay vì nén đầu vào, chế độ này thêm một prompt hệ thống như:

> "Trả lời bằng ít từ nhất. Bỏ qua những lời xã giao. Sử dụng câu ngắn."

Điều này hoạt động đặc biệt tốt cho:

- Tạo mã (đầu ra ngắn gọn hơn = ít token hơn)
- Hỏi & Đáp nhanh (không cần giải thích phức tạp)
- Xử lý hàng loạt (tối đa hóa thông lượng)

#### Khi nào sử dụng

Chế độ đầu ra Caveman (Caveman output mode) là **tùy chọn** — hãy đặt nó thông qua cấu hình kết hợp:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Các kiểu đầu ra (danh mục)

Chế độ đầu ra Caveman ở trên là **đường dẫn kiểu đơn kế thừa**. Giai đoạn 4 đã khái quát hóa nó thành một danh mục các kiểu đầu ra có thể kết hợp: `OUTPUT_STYLE_CATALOG` trong `open-sse/services/compression/outputStyles/catalog.ts`. Mỗi kiểu là một hướng dẫn prompt hệ thống làm cho chính mô hình tạo ra đầu ra rẻ hơn; các kiểu có thể được bật cùng nhau và được chèn theo thứ tự danh mục.

| Kiểu                              | `id`          | Chức năng                                                                                                                                                                                                                                       | Ngôn ngữ hướng dẫn                                                                  |
| --------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Văn xuôi súc tích                 | `terse-prose` | Bỏ các từ đệm/mạo từ/cách nói vòng vo; giữ nội dung kỹ thuật chính xác. Văn bản giống hệt chế độ đầu ra `caveman` cũ (được tham chiếu, không gõ lại).                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| Ít code hơn                       | `less-code`   | Thang YAGNI: thay đổi nhỏ nhất có thể hoạt động, không có các trừu tượng không được yêu cầu.                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| Ponytail (dev cấp cao lười biếng) | `ponytail`    | "Code tốt nhất là code không bao giờ được viết": tái sử dụng > viết lại, nguyên nhân gốc rễ > triệu chứng, diff hoạt động ngắn nhất.                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| Tôi bị ADHD (hành động trước)     | `i-have-adhd` | Hành động trước (lệnh/đường dẫn/đoạn mã trước văn xuôi), các bước được đánh số giới hạn, MỘT bước tiếp theo cụ thể, không có lời mở đầu/tóm tắt/kết thúc. Được điều chỉnh từ [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                       |
| CJK súc tích (文言)               | `terse-cjk`   | Phong cách cực kỳ súc tích theo kiểu Hán văn cổ điển.                                                                                                                                                                                           | zh (giới hạn theo ngôn ngữ: chỉ được cung cấp khi ngôn ngữ được giải quyết là `zh`) |

Mỗi kiểu đi kèm ba mức độ cường độ — `lite`, `full`, `ultra` — và mỗi mức độ kết thúc bằng điều khoản giới hạn chung, giữ nguyên các khối mã, đường dẫn tệp, lệnh, chuỗi lỗi, URL và định danh.

#### Cách thức hoạt động của việc chèn

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) giải quyết lựa chọn dựa trên danh mục (các id không xác định và các kiểu không khớp ngôn ngữ sẽ bị loại bỏ, không bao giờ gây lỗi), nối các hướng dẫn đã chọn theo thứ tự danh mục, thêm điều khoản giới hạn **một lần**, và tải kết quả vào lời nhắc hệ thống phía sau một dấu hiệu bất biến duy nhất (`[OmniRoute Output Styles]`) — việc áp dụng lại sẽ không có tác dụng. Khi ngôn ngữ yêu cầu được phát hiện có bản dịch, hướng dẫn đã được bản địa hóa sẽ được chèn vào thay vì tiếng Anh.

#### Cách bật

Trong bảng điều khiển: **Context → Settings → Compression** — mỗi kiểu một hàng với nút bật/tắt và bộ chọn mức độ. Theo chương trình, cấu hình nén lưu trữ lựa chọn dưới dạng:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Tương thích ngược: cài đặt kết hợp `outputMode: "caveman"` cũ vẫn hoạt động và ánh xạ tới `terse-prose`, giống hệt về byte với cách chèn cũ trong mọi ngôn ngữ cũ.

Chọn ngôn ngữ: khi `languageConfig.enabled` được bật, `autoDetect` sẽ chọn ngôn ngữ của tin nhắn người dùng gần nhất (cùng bộ phát hiện với các công cụ đầu vào); tắt `autoDetect` sẽ ghim `defaultLanguage`. Tắt → Tiếng Anh.

Ma trận kiểu × ngôn ngữ được ghim bởi `tests/unit/compression/output-styles-i18n-matrix.test.ts`: một kiểu mới không thể được phát hành nếu không có ít nhất một bản dịch tiếng pt-BR (hoặc một ngoại lệ được theo dõi rõ ràng), và một kiểu hiện có không thể tự động mất một ngôn ngữ. Để thêm một kiểu, xem [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Nén Kết Quả Công Cụ

Mô-đun `toolResultCompressor.ts` cung cấp **5 chiến lược nén chuyên biệt** cho kết quả công cụ (gọi hàm, đầu ra tác nhân, kết quả tìm kiếm, v.v.):

1.  **Nén kết quả tìm kiếm** — Loại bỏ các kết quả dư thừa, giữ lại N kết quả hàng đầu
2.  **Nén đọc tệp** — Cắt bớt các tệp lớn, giữ lại tiêu đề/import
3.  **Nén thực thi mã** — Chỉ giữ lại stdout/stderr thiết yếu
4.  **Nén truy vấn cơ sở dữ liệu** — Giới hạn số hàng, loại bỏ siêu dữ liệu dài dòng
5.  **Nén phản hồi API** — Loại bỏ các trường null, cô đọng các mảng

#### Khi nào nên sử dụng

Nén kết quả công cụ **luôn được bật** khi có các lệnh gọi công cụ. Không cần cấu hình.

### Pipeline xếp chồng

Chế độ xếp chồng chạy **nhiều công cụ theo trình tự** — thường là RTK trước (tiết kiệm 60-90% trên đầu ra công cụ), sau đó là Caveman (tiết kiệm thêm 30% trên văn bản còn lại). Điều này đạt được **tổng mức tiết kiệm 78-95%**.

#### Cách thức hoạt động

```
Input (1000 tokens)
  → RTK (bộ lọc nhận biết lệnh) → 200 tokens
    → Caveman (loại bỏ từ đệm) → 140 tokens
  → Output (140 tokens, tiết kiệm 86%)
```

#### Khi nào nên sử dụng

Sử dụng chế độ xếp chồng cho:

- Các quy trình làm việc nặng về công cụ (mã hóa tác nhân, nghiên cứu)
- Xử lý hàng loạt nhạy cảm về chi phí
- Khi bạn cần tiết kiệm token tối đa

Cấu hình qua kết hợp:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Ghi đè nén cho từng combo

Bạn có thể ghi đè chế độ nén toàn cục **cho từng combo** để tinh chỉnh hành vi
cho các trường hợp sử dụng khác nhau:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Tính năng này hữu ích cho:

- **Combo lập trình**: Sử dụng chế độ `aggressive` cho các phiên làm việc dài
- **Combo Hỏi & Đáp nhanh**: Sử dụng chế độ `lite` để phản hồi nhanh
- **Combo sử dụng nhiều công cụ**: Sử dụng chế độ `stacked` để tiết kiệm tối đa
- **Combo production**: Sử dụng chế độ `cache-aware` cho các nhà cung cấp hỗ trợ lưu vào bộ nhớ đệm

---

## Xem thêm

- [Cấu hình môi trường](../reference/ENVIRONMENT.md) — Các biến môi trường nén
- [Hướng dẫn kiến trúc](../architecture/ARCHITECTURE.md) — Cơ chế nội bộ của pipeline nén
- [Hướng dẫn người dùng](../guides/USER_GUIDE.md) — Bắt đầu sử dụng tính năng nén
- [Nén RTK](./RTK_COMPRESSION.md) — Bộ lọc RTK, mô hình tin cậy, cổng xác minh và khôi phục đầu ra thô
- [Các engine nén](./COMPRESSION_ENGINES.md) — Caveman, RTK, chế độ stacked, API, MCP và dashboard
- [Định dạng quy tắc nén](./COMPRESSION_RULES_FORMAT.md) — Định dạng gói quy tắc JSON
- [Các gói ngôn ngữ nén](./COMPRESSION_LANGUAGE_PACKS.md) — Quy tắc Caveman dành riêng cho từng ngôn ngữ
