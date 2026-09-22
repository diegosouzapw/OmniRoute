# RTK Compression (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Nén RTK là công cụ nén nhận biết lệnh của OmniRoute dành cho đầu ra của terminal và công cụ. Công cụ này được
thiết kế cho các phiên tác nhân lập trình, trong đó phần lớn mức tăng ngữ cảnh đến từ nhật ký kiểm thử, đầu ra bản dựng,
nhiễu từ trình quản lý gói, bản ghi shell, đầu ra Docker, đầu ra git và dấu vết ngăn xếp.

RTK có thể chạy trực tiếp với `defaultMode: "rtk"` hoặc dưới dạng bước đầu tiên trong một pipeline xếp chồng, thường là:

```txt
rtk -> caveman
```

Thứ tự đó nén đầu ra máy nhiều nhiễu trước, sau đó cho phép Caveman cô đọng phần văn xuôi còn lại.

RTK thượng nguồn báo cáo mức tiết kiệm `60-90%` đối với đầu ra lệnh. Phiên mẫu trong README của nó giảm từ
`~118,000` token tiêu chuẩn xuống còn `~23,900` token RTK, tương đương tiết kiệm `79.7%` (`~80%`). OmniRoute sử dụng
mức trung bình thượng nguồn đó để tính toán mức tiết kiệm xếp chồng với tính năng nén đầu vào của Caveman:

```txt
Trung bình RTK:  tiết kiệm 80%
Đầu vào Caveman: tiết kiệm 46%
Xếp chồng:       1 - (1 - 0.80) * (1 - 0.46) = tiết kiệm 89.2%
Phạm vi:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Nội Dung Được Nén

Danh mục tích hợp hiện cung cấp 49 bộ lọc thuộc các danh mục sau:

| Danh mục  | Ví dụ                                                              |
| --------- | ------------------------------------------------------------------ |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                  |
| `test`    | Vitest, Jest, Pytest, Playwright, kiểm thử Go, kiểm thử Cargo      |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx      |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler      |
| `shell`   | `ls`, `find`, `grep`, nhật ký shell chung                          |
| `docker`  | `docker ps`, nhật ký Docker                                        |
| `infra`   | Terraform, OpenTofu, `systemctl status`                            |
| `generic` | đầu ra JSON, dấu vết ngăn xếp, phương án dự phòng cho đầu ra chung |

Bộ phát hiện trong `open-sse/services/compression/engines/rtk/commandDetector.ts` phân loại đầu ra
trước khi lựa chọn bộ lọc. Các bộ lọc cũng có thể khớp theo mẫu lệnh hoặc biểu thức chính quy của đầu ra khi chỉ
lớp lệnh là chưa đủ.

## Phân Giải Bộ Lọc

RTK tải các bộ lọc theo thứ tự sau:

1. Bộ lọc dự án từ `.rtk/filters.toml` và `.rtk/filters.json`, chỉ khi được tin cậy.
2. Bộ lọc toàn cục từ `DATA_DIR/rtk/filters.toml` và `DATA_DIR/rtk/filters.json`.
3. Bộ lọc tích hợp từ `open-sse/services/compression/engines/rtk/filters/`.

Trong cùng một phạm vi, các bộ lọc RTK TOML schema v1 được ưu tiên hơn các bộ lọc JSON của OmniRoute. Các biểu thức
`match_command` trong TOML được kiểm tra trước việc khớp theo loại lệnh để một bộ lọc dành riêng cho lệnh đã nhập
có thể ghi đè một bộ lọc rộng hơn trong phạm vi đó. Phạm vi dự án vẫn được ưu tiên hơn phạm vi toàn cục,
bất kể định dạng tệp.

Các bộ lọc dự án được cố ý kiểm soát bằng cơ chế tin cậy vì bộ lọc biểu thức chính quy có thể thay đổi cách đầu ra công cụ
được hiển thị cho các tác nhân. Một tệp bộ lọc dự án được chấp nhận khi một trong các điều kiện sau là đúng:

- `rtkConfig.trustProjectFilters` là `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` được thiết lập.
- `.rtk/trust.json` chứa hàm băm SHA-256 khớp với tệp bộ lọc dự án.

Ví dụ về tệp tin cậy:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Các hàm băm là riêng biệt: `filtersSha256` xác thực `.rtk/filters.json`, còn `filtersTomlSha256`
xác thực `.rtk/filters.toml`. Việc chỉnh sửa một trong hai tệp chỉ làm mất hiệu lực mục tin cậy của chính tệp đó. Các tệp toàn cục
do quản trị viên cài đặt và sử dụng hành vi tin cậy bộ lọc toàn cục hiện có.

Bộ lọc tùy chỉnh có thể là một đối tượng bộ lọc hoặc một mảng các đối tượng bộ lọc. Các bộ lọc tùy chỉnh không hợp lệ sẽ
bị bỏ qua và được báo cáo bởi chẩn đoán `/api/context/rtk/filters`. Các bộ lọc tích hợp không hợp lệ sẽ khiến hệ thống dừng ngay.

## Khả năng tương thích với RTK TOML schema v1

OmniRoute có thể phân tích cú pháp, xác thực, kiểm thử và cài đặt các tệp bộ lọc khai báo sử dụng RTK TOML schema v1.
Các trường được hỗ trợ gồm `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` và các kiểm thử nội tuyến `[[tests.<filter>]]`.
Các trường không xác định, biểu thức chính quy không hợp lệ hoặc không an toàn, quy tắc loại bỏ/giữ lại được dùng đồng thời, tệp lớn hơn
1 MiB và tham chiếu đến bộ lọc không xác định đều bị từ chối. Một tệp có các kiểm thử nội tuyến thất bại có thể được
xác thực để kiểm tra nhưng không thể được cài đặt hoặc tải. Lỗi tải tệp tùy chỉnh vẫn tuân theo cơ chế
fail-open: tệp không hợp lệ bị bỏ qua và các bộ lọc còn lại tiếp tục hoạt động.

OmniRoute nhận đầu ra của công cụ sau khi máy khách đã thu thập đầu ra đó, vì vậy `filter_stderr = true`
không thể thay đổi quá trình thu thập của tiến trình. Trường này được chấp nhận dưới dạng thao tác không có hiệu lực và quá trình xác thực trả về một cảnh báo.
Điều này được mô tả có chủ đích là **khả năng tương thích với RTK TOML schema v1**, chứ không phải khả năng tương thích hoàn toàn
với tệp thực thi RTK, shell hook, các triển khai lệnh Rust hoặc bố cục kho lưu trữ tin cậy của RTK.

Chế độ xem RTK nâng cao của bảng điều khiển chấp nhận TOML được dán hoặc tải lên. Quá trình xác thực chỉ đọc.
Quá trình cài đặt ghi nguyên tử vào `DATA_DIR/rtk/filters.toml` với quyền hạn chế và làm mới
danh mục bộ lọc đang hoạt động mà không cần khởi động lại. Việc thay thế tệp hiện có yêu cầu xác nhận `overwrite`
rõ ràng và trước tiên sẽ tạo `DATA_DIR/rtk/filters.toml.bak`.

## DSL bộ lọc

Các bộ lọc sử dụng lược đồ JSON được mô tả trong [Định dạng quy tắc nén](./COMPRESSION_RULES_FORMAT.md).
Môi trường thực thi áp dụng các giai đoạn này theo thứ tự:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> loại bỏ/bao gồm các dòng
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Các trường quan trọng:

| Trường                       | Mục đích                                                             |
| ---------------------------- | -------------------------------------------------------------------- |
| `rules.stripAnsi`            | Loại bỏ chuỗi màu/điều khiển của terminal trước khi so khớp          |
| `rules.filterStderr`         | Chuẩn hóa các tiền tố stderr phổ biến trước khi so khớp/lọc          |
| `rules.replace`              | Áp dụng các phép thay thế bằng biểu thức chính quy theo thứ tự       |
| `rules.matchOutput`          | Trả về bản tóm tắt cô đọng khi đầu ra khớp với một điều kiện đã biết |
| `rules.matchOutput[].unless` | Bỏ qua lối tắt khi có mẫu lỗi/thất bại                               |
| `rules.dropPatterns`         | Loại bỏ các dòng gây nhiễu                                           |
| `rules.includePatterns`      | Ưu tiên các dòng có thể hành động                                    |
| `rules.collapsePatterns`     | Thu gọn các dòng khớp lặp lại                                        |
| `rules.deduplicate`          | Tùy chọn theo từng bộ lọc: thu gọn các dòng trùng lặp liên tiếp      |
| `rules.truncateLineAt`       | Cắt ngắn từng dòng một cách an toàn với Unicode                      |
| `rules.onEmpty`              | Thông báo dự phòng nếu tất cả các dòng đều bị lọc bỏ                 |
| `tests[]`                    | Các mẫu nội tuyến được cổng xác minh sử dụng                         |

Các bộ lọc tích hợp sẵn được kỳ vọng sẽ bao gồm các mẫu `tests[]` nội tuyến. Các bộ lọc tùy chỉnh cũng nên bao gồm
chúng, đặc biệt khi được chia sẻ giữa nhiều dự án.

## Khử trùng lặp dòng (hai lớp)

RTK thu gọn các dòng trùng lặp ở hai lớp độc lập:

1. **`deduplicate` theo từng bộ lọc (tùy chọn bật, mặc định là `false`).** Một bộ lọc có thể đặt `rules.deduplicate: true`
   để thu gọn các dòng trùng lặp liên tiếp _trong đầu ra khớp của bộ lọc đó_, trước khi cắt bớt.
   Quá trình này chạy bên trong `lineFilter.ts`. Đối với các bộ lọc cũ, tính năng này được tự động bật khi bộ lọc định nghĩa
   `collapsePatterns`. Lược đồ: `deduplicate: z.boolean().default(false)` trong
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` trên toàn bộ engine (mặc định là `3`).** Sau khi tất cả bộ lọc chạy xong, engine sẽ thu gọn
   mọi chuỗi gồm `>= deduplicateThreshold` dòng liên tiếp giống hệt nhau trên toàn bộ kết quả
   (`deduplicateRepeatedLines`, được áp dụng trong `engines/rtk/index.ts`). Giá trị được giới hạn trong khoảng 2–100 khi
   chuẩn hóa.

Lượt xử lý theo từng bộ lọc chạy trước (bên trong bộ lọc), còn lượt xử lý trên toàn bộ engine chạy sau cùng (trên đầu ra
đã được nối), vì vậy hai lượt phối hợp với nhau mà không tính trùng.

## Nhóm dòng (`enableGrouping`)

Khi `rtkConfig.enableGrouping` là `true` (mặc định là `false`), RTK chạy thêm một lượt `groupSimilarLines`
trên kết quả sau khi khử trùng lặp để thu gọn các chuỗi dòng liên tiếp _gần tương đương_ (không giống hệt nhau theo từng byte).
`rtkConfig.groupingThreshold` (mặc định là `3`) là độ dài chuỗi tối thiểu để kích hoạt
việc nhóm. Đây là cơ chế tương ứng về mặt cấu trúc với `deduplicateThreshold`: khử trùng lặp xử lý các dòng lặp lại chính xác,
còn nhóm xử lý "cùng một cấu trúc với một vài khác biệt nhỏ". Cả hai cờ đều là một phần của JSON `rtkConfig`
được lưu trong bảng `key_value` (xem phần Cấu hình ở trên), vì vậy thiết lập vẫn được duy trì sau khi khởi động lại.

## Loại bỏ chú thích mã (`stripCodeComments` / `preserveDocstrings`)

Khi `rtkConfig.applyToCodeBlocks` được bật, RTK cũng có thể loại bỏ chú thích khỏi các khối mã có hàng rào:

- `stripCodeComments` (mặc định là `false`) — tùy chọn bật. Khi là `true`, RTK loại bỏ chú thích khỏi các khối có hàng rào JavaScript
  và TypeScript. Trước đây, cờ này được đọc nhưng chưa bao giờ được áp dụng, vì vậy giá trị mặc định vẫn là
  "giữ nguyên" để tránh thay đổi âm thầm trong môi trường production.
- `preserveDocstrings` (mặc định là `true`) — khi loại bỏ chú thích, các chú thích khối JSDoc/`/** … */` được
  giữ lại (chúng chứa tài liệu API có giá trị cao hơn số byte mà chúng chiếm dụng). Đặt thành `false` để loại bỏ
  cả những chú thích này.

Việc loại bỏ chú thích được triển khai trong `open-sse/services/compression/engines/rtk/codeStripper.ts`. Cơ chế này sử dụng
**trình phân tích cú pháp TypeScript** (không phải biểu thức chính quy), nhờ đó các literal chuỗi, template và biểu thức chính quy không bao giờ bị nhầm
là chú thích, đồng thời quá trình sẽ dừng hoàn toàn khi phát hiện JSX (để các chú thích trong vùng chứa biểu thức JSX không bao giờ
bị hỏng). Hiện tại, việc loại bỏ chú thích chỉ áp dụng cho **JavaScript và TypeScript** — các
ngôn ngữ khác trong tập `CodeLanguage` của trình loại bỏ (Python, Rust, Go, Ruby, Java) có tính năng thu gọn dòng trống và
khoảng trắng nhưng không loại bỏ chú thích. Lượt xử lý khối đã loại bỏ chú thích được gắn thẻ `rtk:code-strip` trong
`rulesApplied`.

> **Lưu ý — mã hóa GCF / dạng bảng là một engine riêng biệt.** RTK **không** chứa bộ mã hóa JSON dạng bảng/cột
> "GCF" (Graph Compact Format). Bộ mã hóa đó — vốn thay thế bộ mã hóa `omni-tabular` cũ —
> nằm trong engine **headroom**
> (`open-sse/services/compression/engines/headroom/`, với codec được tích hợp sẵn nằm trong
> `headroom/gcf/`). Nó không liên quan đến pipeline bộ lọc RTK được mô tả tại đây.

## Cấu hình

Các cài đặt toàn cục có sẵn thông qua `/api/settings/compression`. Các cài đặt dành riêng cho RTK cũng
có sẵn thông qua `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` và `disabledFilters` sử dụng id bộ lọc, ví dụ `test-vitest` hoặc `git-diff`.

Cấu trúc đầy đủ của `rtkConfig` được định nghĩa bởi `RtkConfig` / `DEFAULT_RTK_CONFIG` trong
`open-sse/services/compression/types.ts`. Toàn bộ đối tượng được lưu dưới dạng một giá trị JSON duy nhất trong
bảng SQLite `key_value` với `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) và được chuẩn hóa khi đọc bởi `normalizeRtkConfig`. Vì vậy, mọi trường bên dưới
— bao gồm `enableGrouping`, `groupingThreshold`, `stripCodeComments` và `preserveDocstrings` —
đều được lưu và đọc lại qua cùng một kho lưu trữ, đồng thời vẫn được giữ nguyên sau khi khởi động lại.

| Khóa                   | Mặc định | Mục đích                                                                               |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`      | Toàn bộ engine: số dòng giống hệt nhau liên tiếp tối thiểu để thu gọn (giới hạn 2–100) |
| `enableGrouping`       | `false`  | Tùy chọn bật: thu gọn các chuỗi dòng liên tiếp gần tương đương                         |
| `groupingThreshold`    | `3`      | Số dòng tương tự liên tiếp tối thiểu để kích hoạt việc nhóm                            |
| `stripCodeComments`    | `false`  | Tùy chọn bật: xóa chú thích khỏi các khối mã có hàng rào (cần `applyToCodeBlocks`)     |
| `preserveDocstrings`   | `true`   | Khi xóa chú thích, giữ lại các khối JSDoc/`/** … */`                                   |

## API

| Tuyến                              | Phương thức | Mục đích                                          |
| ---------------------------------- | ----------- | ------------------------------------------------- |
| `/api/context/rtk/config`          | GET         | Đọc cấu hình RTK                                  |
| `/api/context/rtk/config`          | PUT         | Cập nhật cấu hình RTK                             |
| `/api/context/rtk/filters`         | GET         | Liệt kê danh mục bộ lọc và chẩn đoán tải          |
| `/api/context/rtk/import`          | POST        | Xác thực hoặc cài đặt các tệp lược đồ RTK TOML v1 |
| `/api/context/rtk/test`            | POST        | Xem trước quá trình nén RTK cho một tải văn bản   |
| `/api/context/rtk/raw-output/[id]` | GET         | Đọc đầu ra thô đã được che thông tin và lưu giữ   |
| `/api/compression/preview`         | POST        | Xem trước bất kỳ chế độ nén nào                   |

Tải kiểm thử RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Tải xem trước quá trình nén:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Các tuyến quản lý yêu cầu xác thực quản lý bảng điều khiển hoặc chính sách API-key tương ứng.

Tải xác thực RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Sử dụng `"action": "install"` để cài đặt tệp đã được xác thực trên toàn cục. Chỉ thêm `"overwrite": true`
sau khi xem xét và xác nhận việc thay thế một tệp toàn cục hiện có.

## Khôi phục đầu ra thô

RTK thường chỉ trả về văn bản đã nén. Để gỡ lỗi, `rawOutputRetention` có thể giữ lại đầu ra thô đã được
che thông tin nhạy cảm:

| Giá trị    | Hành vi                                                      |
| ---------- | ------------------------------------------------------------ |
| `never`    | Không giữ lại đầu ra thô                                     |
| `failures` | Chỉ giữ lại đầu ra có khả năng là lỗi                        |
| `always`   | Giữ lại mọi đầu ra thô đã nén của RTK, sau khi che thông tin |

Các tệp được giữ lại sẽ được ghi vào:

```txt
DATA_DIR/rtk/raw-output/
```

Thông tin bí mật được che trước khi lưu trữ, bao gồm các bearer token phổ biến, khóa API, token Slack,
khóa truy cập AWS và các giá trị kiểu gán `token=...`, `secret=...`, `password=...`. Dữ liệu phân tích
chỉ lưu id con trỏ, kích thước và siêu dữ liệu hash.

## Cổng xác minh

Cổng xác minh có phạm vi tập trung chạy các kiểm thử bộ lọc nội tuyến tích hợp sẵn mà không gọi các lệnh bên ngoài qua shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Cổng RTK rộng hơn là:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Chạy cổng kiểm thử nén toàn diện trước khi phát hành:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Mở rộng RTK

1. Thêm hoặc cập nhật một tệp JSON bộ lọc.
2. Bao gồm ít nhất một mẫu `tests[]` chứng minh hành vi quan trọng.
3. Thêm một fixture trong `tests/unit/compression/fixtures/rtk/` cho các họ lệnh mới.
4. Bổ sung phạm vi kiểm thử phát hiện lệnh khi thêm một lớp đầu ra mới.
5. Chạy cổng xác minh và cổng RTK rộng hơn.
6. Nếu bộ lọc chỉ dùng cục bộ trong dự án, hãy commit `.rtk/filters.json` và chỉ làm mới `.rtk/trust.json` sau khi xem xét.

---

## Các mức cường độ (v3.8.16+)

RTK hỗ trợ **3 mức cường độ** cân bằng giữa **mức độ nén mạnh** và **độ an toàn**. Mức này được thiết lập qua `config.intensity` trong cấu hình engine.

### 3 mức

| Mức                   | Ngưỡng cắt bớt   | Mức tiết kiệm token | Rủi ro     | Phù hợp nhất với                           |
| --------------------- | ---------------- | ------------------- | ---------- | ------------------------------------------ |
| `minimal`             | 24 dòng mỗi phần | ~20-40%             | Rất thấp   | Môi trường production có ngữ cảnh hệ trọng |
| `standard` (mặc định) | 24 dòng mỗi phần | ~50-70%             | Thấp       | Các phiên lập trình hằng ngày              |
| `aggressive`          | 16 dòng mỗi phần | ~70-90%             | Trung bình | Phiên dài, tiết kiệm tối đa                |

### Vị trí diễn ra việc cắt bớt

Ngưỡng cắt bớt ảnh hưởng đến `lineFilter.ts`:

```ts
// Từ open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Cả phần **đầu** và **cuối** của mỗi phần đều được giữ lại; nội dung ở giữa sẽ bị loại bỏ khi việc cắt bớt được kích hoạt.

### Nội dung được giữ lại và nội dung bị cắt

| Nội dung                            | minimal         | standard        | aggressive      |
| ----------------------------------- | --------------- | --------------- | --------------- |
| Lỗi / stack trace                   | ✅ được giữ lại | ✅ được giữ lại | ✅ được giữ lại |
| Kiểm thử thất bại                   | ✅ được giữ lại | ✅ được giữ lại | ✅ được giữ lại |
| Lỗi build                           | ✅ được giữ lại | ✅ được giữ lại | ✅ được giữ lại |
| Kiểm thử thành công (chi tiết)      | ✅ được giữ lại | 🟡 được thu gọn | 🟡 được thu gọn |
| Đầu ra thông thường (log thông tin) | 🟡 được thu gọn | 🟡 được thu gọn | ❌ bị loại bỏ   |
| Thanh tiến trình                    | 🟡 được thu gọn | ❌ bị loại bỏ   | ❌ bị loại bỏ   |
| Banner / nghệ thuật ASCII           | 🟡 được thu gọn | ❌ bị loại bỏ   | ❌ bị loại bỏ   |

### Chọn cường độ phù hợp

```
                  Việc mất ngữ cảnh có gây hậu quả nghiêm trọng không?
                  │
      ┌───────────┼───────────┐
      │           │           │
     CÓ          KHÔNG      KHÔNG CHẮC
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Thông lượng     Hãy thử `standard` trước
      │      quan trọng      (phù hợp với 80%
      │      đến mức nào?    trường hợp)
      │           │
      │      ┌────┴────┐
      │      │         │
      │     THẤP       CAO
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Cấu hình cường độ

**Theo từng combo** (trong cấu hình combo):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Bằng mã**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) là một
`CompressionEngine` và không có phương thức `updateConfig`. Thay vào đó, hãy cập nhật cấu hình
của engine thông qua helper registry:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Xác minh hiệu quả

Sử dụng **Cổng xác minh** (xem bên dưới) để xác nhận bộ lọc của bạn an toàn ở cường độ đã chọn:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Bộ lọc thất bại ở cường độ aggressive");
}
```

---

## Phát triển bộ lọc tùy chỉnh (v3.8.16+)

Thư mục `engines/rtk/filters/` chứa **hơn 49 tệp JSON bộ lọc tích hợp sẵn**. Bạn có thể thêm bộ lọc riêng để nén đầu ra từ các công cụ tùy chỉnh không được cấu hình mặc định hỗ trợ.

### Lược đồ bộ lọc (Zod)

```ts
{
  "id": "string",                      // Bắt buộc. Mã định danh bộ lọc (dạng kebab-case, ví dụ: "python-traceback")
  "label": "string",                   // Bắt buộc. Tên bộ lọc dễ đọc
  "description": "string",             // Tùy chọn (mặc định: ""). Mô tả ngắn về chức năng của bộ lọc
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Tùy chọn (0-100, mặc định: 50). Thứ tự thực thi (cao hơn = trước)
  "match": {
    "commands": ["string"],            // Tên lệnh cần khớp (ví dụ: "python", "pytest")
    "patterns": ["string"],            // Các mẫu biểu thức chính quy để khớp với đầu ra
    "outputTypes": ["string"]          // Các lớp đầu ra được phát hiện (ví dụ: "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Tùy chọn (mặc định: false). Loại bỏ mã màu ANSI
    "replace": [                       // Các quy tắc tìm và thay thế (mặc định: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Dừng xử lý sớm khi mẫu khớp (mặc định: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Bỏ qua nếu mẫu này khớp
      }
    ],
    "includePatterns": ["string"],     // Các dòng cần giữ lại (mẫu biểu thức chính quy, mặc định: [])
    "dropPatterns": ["string"],        // Các dòng cần loại bỏ (mẫu biểu thức chính quy, mặc định: [])
    "collapsePatterns": ["string"],    // Các dòng cần thu gọn thành một lần xuất hiện duy nhất (mặc định: [])
    "deduplicate": boolean,            // Tùy chọn (mặc định: false). Loại bỏ các dòng trùng lặp
    "truncateLineAt": number,          // Tùy chọn (mặc định: 0). Cắt ngắn dòng theo số ký tự tối đa
    "maxLines": number,                // Tùy chọn (mặc định: 0). Giới hạn cứng tổng số dòng
    "headLines": number,               // Tùy chọn (mặc định: 20). Giữ lại N dòng đầu tiên của đầu ra khớp
    "tailLines": number,               // Tùy chọn (mặc định: 20). Giữ lại N dòng cuối cùng của đầu ra khớp
    "onEmpty": "string",               // Tùy chọn (mặc định: ""). Thông báo dự phòng nếu tất cả các dòng đều bị lọc
    "filterStderr": boolean            // Tùy chọn (mặc định: false). Đồng thời lọc đầu ra stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Các mẫu phải luôn được giữ lại (mặc định: [])
    "summaryPatterns": ["string"]      // Các mẫu dành cho dòng tóm tắt cuối cùng (mặc định: [])
  },
  "tests": [                           // Các kiểm thử nội tuyến để xác minh (mặc định: [])
    {
      "name": "string",               // Bắt buộc. Tên kiểm thử
      "input": "sample output",        // Bắt buộc. Văn bản đầu vào mẫu
      "expected": "expected output",   // Bắt buộc. Đầu ra nén mong đợi
      "command": "optional command"    // Tùy chọn. Ngữ cảnh lệnh
    }
  ]
}
```

### Ví dụ: Bộ lọc traceback của Python

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Tải bộ lọc tùy chỉnh

Đặt tệp tại một vị trí được nhận diện:

```
~/.omniroute/rtk/filters/my-filter.json     # Cấp người dùng
<project>/.rtk/filters/my-filter.json      # Cấp dự án
```

Các bộ lọc được tải tự động khi khởi động thông qua `loadRtkFilters()` trong `open-sse/services/compression/engines/rtk/filterLoader.ts`. Trình tải phát hiện các bộ lọc từ:

- Danh mục tích hợp sẵn: `open-sse/services/compression/engines/rtk/filters/`
- Thư mục người dùng: `~/.omniroute/rtk/filters/`
- Thư mục dự án: `<project>/.rtk/filters/`

Để tải bộ lọc bằng mã:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Các tùy chọn: customFiltersEnabled (tải bộ lọc người dùng/dự án, mặc định bật),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Xác thực

Các bộ lọc được xác thực theo lược đồ Zod khi tải. Bộ lọc có cấu trúc không hợp lệ sẽ không tải được và ghi lỗi vào nhật ký:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Để xác thực tất cả các bộ lọc đã cài đặt, hãy gọi `runRtkFilterTests()`, hàm này được xuất từ `open-sse/services/compression/engines/rtk/verify.ts`.

### Các phương pháp hay nhất

1. **Luôn bao gồm `tests[]`** — chúng chứng minh bộ lọc của bạn hoạt động và ngăn lỗi tái diễn
2. **Sử dụng `matchOutput` cho các trường hợp thoát sớm** — nếu một dòng duy nhất truyền tải đầy đủ ý nghĩa, hãy thay thế toàn bộ khối
3. **Ưu tiên `keep` hơn `strip`** — các quy tắc rõ ràng về việc "luôn giữ lại" an toàn hơn so với "luôn loại bỏ"
4. **Kiểm thử ở cả 3 mức cường độ** — `minimal` không nên thực hiện thay đổi nào, còn `aggressive` vẫn phải giữ lại các lỗi
5. **Sử dụng trường `unless`** — bảo vệ các trường hợp thoát sớm bằng điều kiện "không kích hoạt nếu có X"

---

## Khôi phục đầu ra thô & Cổng xác minh

Khi RTK nén đầu ra mạnh, bạn có thể **khôi phục văn bản gốc** để gỡ lỗi, kiểm tra hoặc phát lại.

### Cách hoạt động của tính năng khôi phục đầu ra thô

```
Đầu ra gốc (10K token)
        │
        ▼
RTK nén (với rawOutput.enabled=true)
        │
        ├─▶ Đầu ra đã nén (2K token)  ──▶ gửi tới LLM
        │
        └─▶ Đầu ra gốc (10K token)    ──▶ được lưu trong DB
                                               (được liên kết bằng request_id)
```

### Bật lưu trữ đầu ra thô

**Theo từng yêu cầu** (trong cấu hình kết hợp):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Giới hạn 1MB
    }
  }
}
```

**Mặc định**: `rawOutput.enabled: false` (tiết kiệm dung lượng lưu trữ).

### Chi phí lưu trữ

| Theo từng yêu cầu       | Giới hạn 1MB  | Giới hạn 10MB  |
| ----------------------- | ------------- | -------------- |
| Đầu ra nén trung bình   | ~5KB          | ~5KB           |
| Đầu ra thô được lưu trữ | ~50-500KB     | ~500KB-5MB     |
| Với 1000 yêu cầu/ngày   | 50-500MB/ngày | 500MB-5GB/ngày |

> **Khuyến nghị**: Chỉ bật đầu ra thô cho **các phiên gỡ lỗi** hoặc **kiểm tra lấy mẫu**, không nên bật liên tục.

### Khôi phục đầu ra gốc

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId từ số liệu thống kê nén
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` được trả về trong `CompressionStats.rtkRawOutputPointers[]` sau khi nén.
Xem `open-sse/services/compression/engines/rtk/rawOutput.ts:102` để biết chữ ký hàm.

### Cổng xác minh

**Xác minh bộ lọc RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) xác thực tất cả bộ lọc dựa trên `tests[]` tương ứng và đảm bảo hành vi chính xác ở cả 3 mức cường độ.

**Gọi `runRtkFilterTests()`** để chạy xác minh:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Nội dung được xác thực**:

1. Mọi bộ lọc đều tải được và vượt qua quá trình xác thực lược đồ
2. Mọi mục trong `tests[]` đều tạo ra đầu ra mong đợi
3. Cường độ `minimal` không thực hiện thao tác nào (giữ nguyên bản gốc, chỉ áp dụng các bộ lọc cấu trúc)
4. Cường độ `aggressive` giữ nguyên lỗi, lỗi kiểm thử và dấu vết ngăn xếp
5. Đầu ra đã nén không bao giờ lớn hơn đầu vào gốc

- Nguồn: `open-sse/services/compression/engines/rtk/` (63 tệp, ~70KB)

- **Trước khi hợp nhất thay đổi bộ lọc** — luôn đảm bảo các kiểm thử đều vượt qua
- **Sau khi nâng cấp công cụ RTK** — lược đồ có thể đã thay đổi
- **Định kỳ trong quá trình giám sát** — bảo vệ khỏi sự sai lệch trong các fixture kiểm thử
- **Khi thêm một họ công cụ/lệnh mới** — chứng minh bộ lọc mới hoạt động

---

## Xem thêm

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Tổng quan đầy đủ về quy trình nén
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Sổ đăng ký engine và các engine tích hợp sẵn
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Engine tùy chỉnh, gói ngôn ngữ, quy trình xếp chồng
- Mã nguồn: `open-sse/services/compression/engines/rtk/` (63 tệp, ~70KB)
