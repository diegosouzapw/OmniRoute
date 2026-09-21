# Compression Engines (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Khả năng nén của OmniRoute được xây dựng dựa trên các hợp đồng engine. Một chế độ có thể chạy trực tiếp một engine
(`caveman` hoặc `rtk`) hoặc một pipeline xếp chồng có tính xác định, thực thi nhiều engine theo thứ tự.

## Các chế độ

| Chế độ       | Lộ trình engine                          | Đầu vào dự kiến                                                 |
| ------------ | ---------------------------------------- | --------------------------------------------------------------- |
| `off`        | không có                                 | Giữ nguyên prompt một cách chính xác                            |
| `lite`       | Các helper lite của Caveman              | Dọn dẹp luôn bật, rủi ro thấp                                   |
| `standard`   | Caveman                                  | Cô đọng prompt bằng ngôn ngữ tự nhiên                           |
| `aggressive` | Caveman + các bộ tóm tắt lịch sử/công cụ | Các phiên trò chuyện dài                                        |
| `ultra`      | Caveman + các helper cắt tỉa             | Khôi phục khi chạm giới hạn ngữ cảnh                            |
| `rtk`        | RTK                                      | Đầu ra terminal, shell, build, test và git                      |
| `omniglyph`  | OmniGlyph                                | Ngữ cảnh dưới dạng hình ảnh trên giao thức gốc của nhà cung cấp |
| `stacked`    | Pipeline, mặc định `rtk -> caveman`      | Log công cụ lẫn văn xuôi, mức tiết kiệm tối đa                  |

### Các profile nén của OmniGlyph

Engine `omniglyph` (package `omniglyph`, 1.4.0+) chấp nhận một profile ngữ nghĩa có tên, được thiết lập
toàn cục thông qua `omniglyph.profile` trong cài đặt nén hoặc theo từng bước thông qua cấu hình bước
của pipeline xếp chồng:

| Profile       | Ranh giới                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Mặc định. Chính sách được đo lường trong các kết quả đã công bố — chuyển system, tài liệu công cụ và lịch sử dày đặc thành hình ảnh |
| `balanced`    | Giữ trạng thái trực tiếp ở dạng gốc, bảo vệ 8 lượt cuối, thu gọn lịch sử cũ đã khép lại                                             |
| `coding-safe` | Giữ chỉ thị có thẩm quyền, schema công cụ và đầu ra công cụ trực tiếp ở dạng gốc, bảo vệ 12 lượt cuối                               |
| `passthrough` | Định tuyến mà không biến đổi; engine được bỏ qua                                                                                    |

Profile là một **giới hạn trên, không phải giới hạn dưới**: `mergeCompressionProfileOptions` trong package
không cho phép giá trị ghi đè từ bên gọi mở lại một luồng nén có tổn hao mà profile đã đóng, vì vậy cấu hình theo bước
`preserveSystemPrompt: false` không thể bật lại tính năng nén system trong `coding-safe`.

Theo phép đo trên codebase này: `coding-safe` và `balanced` nâng `minCompressChars` lên
giá trị tối đa, đồng thời giữ system, schema công cụ và kết quả công cụ ở dạng gốc, vì vậy một phiên chưa
tích lũy lịch sử sẽ dừng tại `below_min_chars` và engine không biến đổi gì. Đó
là lý do mặc định là `aggressive` thay vì profile an toàn nhất.

Package tự phân giải phạm vi model và profile từ cấu hình môi trường của nó.
OmniRoute không bao giờ ủy quyền quyết định này: adapter ghim cổng kiểm soát model vào phạm vi
hạn chế nhất của package, vì vậy các cài đặt môi trường của host chỉ có thể thu hẹp danh sách cho phép, không bao giờ
mở rộng nó vượt quá các kết quả đo lường của OmniRoute.

## Registry Engine

Registry nằm tại `open-sse/services/compression/engines/registry.ts`. Các engine cung cấp một hợp đồng dùng chung:

- `id`: id engine ổn định, chẳng hạn như `caveman` hoặc `rtk`
- `apply(text, config)`: đường dẫn thực thi cũ được các pipeline xếp chồng sử dụng
- `compress(input, config)`: đường dẫn thực thi chính, trả về văn bản + thống kê
- `getConfigSchema()`: trả về cấu trúc tương tự JSON Schema của cấu hình hợp lệ
- `validateConfig(config)`: trả về `{ valid, errors[] }`

Việc đăng ký sử dụng `registerCompressionEngine(engine)` (hoặc `registerEngine` cho các trường hợp nâng cao), hàm này gọi `assertValidEngine()` và `validateConfig(defaultConfig)` trước khi chấp nhận.
Sử dụng `unregisterCompressionEngine(id)` để loại bỏ một engine trong thời gian chạy.

`strategySelector.ts` đăng ký các engine tích hợp sẵn trước khi quá trình nén chạy. Điều này cho phép bản xem trước, quá trình nén khi chạy, chế độ xếp chồng, các bài kiểm thử và các engine trong tương lai sử dụng cùng một đường dẫn thực thi.

### Nén mô tả MCP (liên quan)

Một registry riêng biệt nén metadata mô tả công cụ MCP ở cấp registry — xem `open-sse/mcp-server/descriptionCompressor.ts` và [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Registry này tái sử dụng các quy tắc Caveman nhưng hoạt động trên metadata công cụ, không phải payload của yêu cầu.

### Các engine tích hợp sẵn bổ sung

Ngoài Caveman, RTK và LLMLingua-2, registry còn cung cấp một số engine không mất dữ liệu / có cấu trúc chuyên biệt (được sử dụng bởi các pipeline xếp chồng, playground và các bài kiểm thử):

| Engine        | Id              | Chức năng                                                                                                                                                                                              |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): thay thế các khối văn bản liền kề lớn bằng các tham chiếu được định địa chỉ theo nội dung, nhờ đó các khối lặp lại/lớn chỉ được gửi một lần và được tham chiếu về sau. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): nén dạng bảng không mất dữ liệu cho các payload mảng JSON đồng nhất thành dạng cột `[N rows]`.                                                                                 |
| ionizer       | `ionizer`       | Lấy mẫu các hàng đầu/giữa/cuối cho các khối đồng nhất rất lớn, đồng thời lưu phần giữa bị lược bỏ dưới dạng tham chiếu CCR được định địa chỉ theo nội dung.                                            |
| session-dedup | `session-dedup` | Khử trùng lặp giữa các lượt dựa trên địa chỉ nội dung (lấy cảm hứng từ TokenMizer): lược bỏ văn bản đã xuất hiện trong các lượt trước của cùng một phiên.                                              |

**Chỉ dẫn giao thức truy xuất CCR (#8033):** lần đầu tiên CCR thay thế ≥1 khối trong một yêu cầu, engine sẽ thêm vào đầu một thông điệp `system` duy nhất, có tính lũy đẳng (bắt đầu bằng sentinel `[CCR protocol]`) để hướng dẫn bên gọi về hợp đồng marker → công cụ: marker `[CCR retrieve hash=<24hex> chars=N]` có ý nghĩa gì, rằng hash phải được sao chép nguyên văn (đủ cả 24 ký tự hex — hash bị sao chép sai có khả năng là nguyên nhân gây ra lỗi "không tìm thấy khối"), và rằng marker `[dedup:ref sha=...]` có nghĩa là "xem lại lịch sử", chứ không phải "gọi công cụ". Ghi chú chỉ được chèn **khi `tools[]` do bên gọi công bố chứng minh rằng bên gọi thực sự có thể truy cập `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` trong `open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — một bên gọi tương thích OpenAI thông thường không có công cụ đó sẽ không bao giờ nhận được chỉ dẫn gọi thứ mà nó không thể truy cập. Tính lũy đẳng được đảm bảo bằng cách quét lịch sử thông điệp để tìm sentinel trước khi chèn, do đó các yêu cầu nhiều lượt (phát lại các thông điệp trước đó) sẽ không chồng thêm ghi chú sau mỗi lượt.

## Caveman

Chế độ Caveman tập trung vào việc cô đọng ngữ nghĩa của văn xuôi thông thường:

- giữ nguyên các khối mã, URL, JSON, đường dẫn và dữ liệu có cấu trúc
- loại bỏ nội dung đệm, cách diễn đạt dè dặt, ngữ cảnh lặp lại và các cụm từ liên kết dài dòng
- hỗ trợ các bộ quy tắc tệp theo từng ngôn ngữ trong `open-sse/services/compression/rules/`
- vẫn khả dụng thông qua các chế độ cũ `standard`, `aggressive` và `ultra`

Giao diện trên bảng điều khiển nằm tại `Dashboard -> Context & Cache -> Caveman`.

Dự án Caveman thượng nguồn báo cáo số token đầu ra giảm `~75%`, mức tiết kiệm đầu ra trung bình `65%` trong các bài benchmark
với phạm vi `22-87%`, cùng một công cụ nén đầu vào `~46%`. OmniRoute sử dụng số liệu phía đầu vào của Caveman
khi mô tả mức tiết kiệm prompt/ngữ cảnh xếp chồng; chế độ đầu ra của Caveman vẫn là một
tính năng hành vi phản hồi riêng biệt.

## RTK

Chế độ RTK tập trung vào đầu ra của lệnh và công cụ:

- phát hiện các lớp đầu ra như `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  kiểm thử Cargo/Go, bản dựng TypeScript/Vite/Webpack, ESLint, kiểm tra/cài đặt npm, nhật ký Docker,
  `find`/`grep` trong shell, stack trace và nhật ký chung
- áp dụng 49 bộ lọc JSON từ `open-sse/services/compression/engines/rtk/filters/`
- hỗ trợ pipeline khai báo kiểu RTK: loại bỏ ANSI, thay thế, dừng sớm khi đầu ra khớp,
  loại bỏ/giữ lại dòng, cắt ngắn theo từng dòng, cắt ngắn theo phần đầu/phần cuối/số dòng tối đa và phương án dự phòng khi trống
- hỗ trợ các bộ lọc dự án có kiểm soát độ tin cậy trong `.rtk/filters.json` và các bộ lọc toàn cục trong
  `DATA_DIR/rtk/filters.json`
- loại bỏ chuỗi ANSI, nhiễu tiến trình, các dòng lặp lại và nội dung khuôn mẫu không hữu ích
- giữ lại các lỗi có thể xử lý, cảnh báo, bản tóm tắt, tệp đã thay đổi và ngữ cảnh ở phần cuối
- có thể tùy chọn giữ lại đầu ra thô đã che dữ liệu nhạy cảm để khôi phục/gỡ lỗi thông qua các tuyến quản lý đã xác thực

Giao diện trên bảng điều khiển nằm tại `Dashboard -> Context & Cache -> RTK`.

Chi tiết vận hành về bộ lọc tùy chỉnh, độ tin cậy, xác minh và khôi phục đầu ra thô có trong
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Dự án RTK thượng nguồn báo cáo mức tiết kiệm `60-90%` khi nén đầu ra lệnh. Ví dụ trong README cho thấy một
phiên Claude Code kéo dài 30 phút giảm từ `~118,000` token xuống còn `~23,900`, tương đương tiết kiệm `79.7%`.

## LLMLingua-2 (Lược bỏ theo ngữ nghĩa)

Chế độ LLMLingua-2 thực hiện **lược bỏ token theo ngữ nghĩa** trên văn xuôi bằng một bộ
phân loại token ONNX nhỏ, bổ trợ cho các engine Caveman và RTK dựa trên quy tắc:

- chỉ nén văn xuôi trong các thông điệp không thuộc hệ thống; các khối mã có hàng rào và những
  cấu trúc được giữ nguyên khác không bao giờ bị thay đổi
- chạy backend `@atjsh/llmlingua-2` (ONNX thông qua `@huggingface/transformers`) trong một
  worker thread, vì vậy quá trình suy luận mô hình không bao giờ chặn vòng lặp sự kiện của yêu cầu
- có thể **xếp chồng** (`stackPriority` 35): trong một pipeline xếp chồng, nó chạy sau các
  engine cấu trúc (CCR, session-dedup, headroom, Caveman) nhưng trước `ultra`, vì
  việc lược bỏ theo ngữ nghĩa hiệu quả nhất trên văn bản đã được nén về mặt cấu trúc — ví dụ:
  `rtk -> caveman -> llmlingua`
- **chuyển sang chế độ cho qua khi có bất kỳ lỗi nào** (thiếu dependency tùy chọn, khởi tạo worker, tải mô hình, suy luận
  hoặc hết thời gian chờ) → văn bản gốc được trả về mà không thay đổi, không bao giờ trả về lỗi

Vị trí engine: `open-sse/services/compression/engines/llmlingua/`. Giao diện trên bảng điều khiển
nằm tại `Dashboard -> Context & Cache -> LLMLingua`.

### Mô hình

Mô hình mặc định là **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
nhanh). Một mô hình **BERT-base** có độ chính xác cao hơn (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) khả dụng thông qua trường `model` trong cấu hình engine. `@huggingface/transformers`
tải mô hình được chọn theo cơ chế lazy từ HuggingFace Hub vào
`${DATA_DIR}/models/llmlingua` trong lần gọi đầu tiên (`modelStore.ts`); tùy chọn ghi đè cấu hình `modelPath`
sẽ trỏ đến một bản sao cục bộ thay thế (dành cho cài đặt ngoại tuyến / cách ly mạng).

### Dependency tùy chọn và cài đặt theo nhu cầu

Ngăn xếp peer runtime LLMLingua có thể loại bỏ là **tùy chọn**. Hai package được khai báo dưới dạng
`optionalDependencies` trong `package.json` và được giữ ở trạng thái **external** trong bản dựng production
(`scripts/build/prepublish.ts` không đóng gói chúng):

| Package              | Phiên bản (được ghim) | Ghi chú                                            |
| -------------------- | --------------------- | -------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`               | Package đầu vào; khai báo các package khác là peer |
| `js-tiktoken`        | `^1.0.20`             | Bộ tách token                                      |

`@huggingface/transformers` được ghim ở `^4.2.0` (dùng chung với đường dẫn embedding cục bộ và
cũng được truy vết vào bundle độc lập); `@atjsh/llmlingua-2@2.0.5` khai báo peer dependency với
`"^3.5.2 || ^4.0.0"`, vì vậy cả Transformers.js v3 và v4 đều được hỗ trợ. Kể từ 2.0.4,
`@atjsh/llmlingua-2` không còn yêu cầu `@tensorflow/tfjs`, qua đó loại bỏ thành phần riêng lẻ lớn nhất
(TensorFlow.js) khỏi ngăn xếp SLM. Chỉ hai package ở trên là các peer SLM có thể loại bỏ.
Một lệnh `npm install` tiêu chuẩn (dev) sẽ tự động cài đặt ngăn xếp tùy chọn, trừ khi các dependency tùy chọn
bị bỏ qua.

**Lý do cài đặt theo nhu cầu:** package được phát hành trên npm, bundle độc lập và image Docker
được phân phối **không kèm** các dependency này để duy trì kích thước nhỏ gọn. Khi chúng không tồn tại, bước
kiểm tra dependency của worker (một phép thử phân giải `@atjsh/llmlingua-2` trong `worker.ts`) sẽ thất bại và engine
**âm thầm chuyển sang chế độ cho qua** — việc chọn LLMLingua sẽ không tạo ra tác động nào (văn bản được trả về không thay đổi,
không ghi nhật ký lỗi). Để kích hoạt nó trong một môi trường đã được tinh giản, hãy cài đặt ngăn xếp tùy chọn:

```bash
# ghim theo các phiên bản được khai báo trong optionalDependencies của package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Việc loại bỏ `@tensorflow/tfjs` (2.0.4+) giúp loại trừ thành phần ~800 MB từng chiếm dung lượng lớn nhất
trước đây — phần dung lượng còn lại gồm các runtime transformers.js + onnxruntime-node,
cùng với mô hình TinyBERT (~57 MB) được tải xuống trong lần sử dụng đầu tiên (không thông qua npm).

Theo từng môi trường:

- **Môi trường phát triển / `npm install`** — được cài đặt tự động trừ khi bạn đã truyền `--omit=optional`
  (hoặc `--no-optional`). Không cần thực hiện thêm thao tác nào.
- **npm toàn cục (`npm i -g omniroute`) / bản độc lập** — chạy lệnh cài đặt ở trên bên trong
  thư mục gói đã cài đặt, hoặc cài đặt lại mà không bỏ qua các dependency tùy chọn.
- **Docker** — thêm lệnh cài đặt vào một lớp image dẫn xuất; image được phát hành
  được thiết kế theo hướng tinh gọn.
- **VPS (PM2)** — cài đặt vào `node_modules` của ứng dụng, sau đó khởi động lại tiến trình để
  worker kiểm tra lại cổng.
- **Next độc lập nguyên bản (`npm run build` → `.build/next/standalone/server.js`)** — bản
  trace độc lập KHÔNG chứa worker lẫn các dependency tùy chọn, vì vậy engine âm thầm
  chuyển sang trạng thái cho phép khi lỗi. `scripts/build/colocate-standalone.mjs` áp dụng lại cả hai (esbuild worker +
  tập hợp đầy đủ dependency tùy chọn vào cây độc lập); tập lệnh này tự động chạy thông qua hook npm
  `postbuild` sau mỗi lần build. Có tính lũy đẳng và tiếp tục an toàn khi thiếu dependency.

**Xác minh tính năng đang hoạt động:** khi chọn LLMLingua, văn bản thực tế sẽ được rút gọn (engine
không còn chuyển sang trạng thái cho phép khi lỗi), và yêu cầu đầu tiên sẽ kích hoạt việc tải model xuống
`${DATA_DIR}/models/llmlingua`. Cổng chủ ý chỉ kiểm tra `@atjsh/llmlingua-2` —
các peer khác chỉ hỗ trợ ESM và `require.resolve` sẽ ném lỗi đối với chúng ngay cả khi chúng hiện diện — vì vậy
worker vẫn chuyển sang trạng thái cho phép khi lỗi nếu thực sự thiếu bất kỳ peer nào tại thời điểm `import()`.

## Pipeline Xếp chồng

Chế độ xếp chồng chạy các bước pipeline theo thứ tự. Mặc định là:

```txt
rtk -> caveman
```

Sử dụng chế độ này cho các phiên coding-agent mà prompt kết hợp đầu ra lệnh với văn bản do người dùng hoặc trợ lý tạo ra. RTK giảm các nhật ký công cụ nhiều nhiễu trước, sau đó Caveman nén phần ngôn ngữ tự nhiên còn lại.

Các bước pipeline được cấu hình bằng `stackedPipeline` trong cài đặt nén hoặc thông qua các tổ hợp nén.

Khi cả hai engine cùng giảm một payload đủ điều kiện, mức tiết kiệm sẽ được cộng dồn:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Bộ lọc Cây Trợ năng MCP

Bộ lọc thông minh cây trợ năng MCP là một lớp nén sau thực thi, chạy trên **kết quả công cụ** MCP, không chạy trên prompt hoặc ngữ cảnh. Bộ lọc này nhắm đến các payload cây trợ năng và ảnh chụp nhanh trình duyệt dài dòng do các công cụ như Playwright, computer-use và các máy chủ MCP tự động hóa trình duyệt trả về.

### Chức năng

1. **Loại bỏ nhiễu** — loại bỏ các mục generic/text trống (`- generic:`, `- text: ""`)
2. **Thu gọn mục cùng cấp** — khi có ≥ `collapseThreshold` (mặc định là 30) dòng liên tiếp lặp lại về cấu trúc, thu gọn chúng thành `collapseKeepHead` dòng đầu tiên (mặc định là 10) + phần tóm tắt số lượng + `collapseKeepTail` dòng cuối cùng (mặc định là 5)
3. **Bảo toàn ref** — các điểm neo `[ref=eXX]` mà Playwright/computer-use yêu cầu sẽ không bao giờ bị thay đổi
4. **Cắt bớt cứng** — nếu văn bản sau khi thu gọn vẫn vượt quá `maxTextChars` (mặc định là 50.000), cắt bớt kèm theo gợi ý điều hướng để agent có thể tiếp tục làm việc

### Vị trí engine

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← điểm vào smartFilterText()
  collapseRepeated.ts ← thuật toán thu gọn mục cùng cấp
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Cấu hình

Được kiểm soát bởi `compression.mcpAccessibility` trong cài đặt toàn cục (migration 056). Cấu hình mặc định:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Bộ lọc chỉ được áp dụng cho các payload kết quả công cụ có `type` là `"text"` và có độ dài vượt quá `minLengthToProcess`. Bộ lọc không ảnh hưởng đến việc nén prompt hoặc các payload yêu cầu.

### Mức tiết kiệm dự kiến

60–80% đối với các kết quả công cụ ảnh chụp nhanh trình duyệt, tùy thuộc vào độ phức tạp của trang. Thuật toán thu gọn có độ phức tạp O(n) theo số dòng và làm tăng độ trễ không đáng kể.

### So sánh bộ lọc này với các engine nén ở trên

| Khía cạnh    | Caveman / RTK / Xếp chồng | Bộ lọc trợ năng MCP                    |
| ------------ | ------------------------- | -------------------------------------- |
| Đối tượng    | Prompt / ngữ cảnh yêu cầu | Kết quả công cụ MCP                    |
| Kích hoạt    | Cài đặt chế độ nén        | `compression.mcpAccessibility.enabled` |
| Phạm vi      | Tất cả thông báo SSE      | Chỉ kết quả công cụ                    |
| Điểm neo ref | Không áp dụng             | Luôn được bảo toàn                     |

---

## Tổ hợp nén

Tổ hợp nén là các cấu hình nén có tên có thể được gán cho các tổ hợp định tuyến:

- `compression_combos`: lưu trữ chế độ, pipeline, cấu hình RTK, cấu hình ngôn ngữ và dấu đánh dấu mặc định
- `compression_combo_assignments`: ánh xạ một tổ hợp nén tới một tổ hợp định tuyến
- tích hợp runtime phân giải tổ hợp nén được gán trước các ghi đè tổ hợp chung
- dữ liệu phân tích bao gồm `compression_combo_id` và `engine`

Vị trí trên Dashboard: `Dashboard -> Context & Cache -> Compression Combos`.

## Bề mặt API

| Tuyến                                  | Mục đích                                                   |
| -------------------------------------- | ---------------------------------------------------------- |
| `/api/settings/compression`            | Cài đặt nén toàn cục (bao gồm cấu hình `mcpAccessibility`) |
| `/api/compression/preview`             | Xem trước bất kỳ chế độ nén nào                            |
| `/api/compression/language-packs`      | Liệt kê các gói ngôn ngữ Caveman có sẵn                    |
| `/api/context/caveman/config`          | Bí danh cài đặt Caveman                                    |
| `/api/context/rtk/config`              | Các giá trị mặc định và cài đặt RTK                        |
| `/api/context/rtk/filters`             | Danh mục bộ lọc RTK                                        |
| `/api/context/rtk/test`                | Điểm cuối xem trước/kiểm thử RTK                           |
| `/api/context/rtk/raw-output/[id]`     | Khôi phục đầu ra thô đã ẩn thông tin và được xác thực      |
| `/api/context/combos`                  | CRUD tổ hợp nén                                            |
| `/api/context/combos/[id]/assignments` | CRUD phép gán tổ hợp định tuyến                            |
| `/api/context/analytics`               | Bí danh phân tích nén                                      |

Các tuyến quản lý yêu cầu xác thực quản lý hoặc kiểm tra chính sách khóa API.

## Công cụ MCP

Tính năng nén cung cấp năm công cụ MCP:

| Công cụ                             | Phạm vi             | Mục đích                                |
| ----------------------------------- | ------------------- | --------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Cài đặt, phân tích, thống kê bộ nhớ đệm |
| `omniroute_compression_configure`   | `write:compression` | Cập nhật cài đặt toàn cục               |
| `omniroute_set_compression_engine`  | `write:compression` | Đặt chế độ và pipeline tùy chọn         |
| `omniroute_list_compression_combos` | `read:compression`  | Liệt kê các tổ hợp nén                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Đọc dữ liệu phân tích tổ hợp/engine     |

## Phạm vi & các trường hợp loại trừ

**Embedding không bao giờ bị nén.** `open-sse/handlers/embeddings.ts` không bao giờ gọi bất kỳ
engine nén nào — phần thân yêu cầu/phản hồi được chuyển thẳng tới executor mà không bị thay đổi.
Hiện tại, đây là đặc điểm mang tính cấu trúc (embedding và chat completion được xử lý bởi các handler
tách biệt), không phải là bước kiểm tra runtime, nhưng điều đó có nghĩa là mối lo ngại về biến dạng
vector trong #8034 không có bề mặt ảnh hưởng trong luồng embedding.

**Bộ lọc loại trừ theo model/điểm cuối (#8034).** Đối với chat completion, operator có thể chỉ định
các model id / đích `provider/model` không bao giờ được phép nén — một cơ chế bảo vệ hữu ích nếu
sau này tính năng nén được kết nối gần hơn với một luồng liền kề embedding, đồng thời cũng hữu ích
nói chung cho bất kỳ model nào cần prompt chính xác đến từng byte (đánh giá tất định, tiền tố nhạy
với bộ nhớ đệm, v.v.).

- Trường cài đặt: `exclusions?: string[]` trong cấu hình nén toàn cục
  (`GET`/`PUT /api/settings/compression`), được duy trì thông qua namespace nén `key_value` hiện có
  (`src/lib/db/compression.ts`) — không cần bảng mới.
- Tab Dashboard: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Cú pháp mẫu: `*` là ký tự đại diện duy nhất. Mọi siêu ký tự biểu thức chính quy khác trong mẫu đều
  được thoát trước khi đối sánh, vì vậy `gpt-5.6` chỉ khớp với chuỗi ký tự đó, không bao giờ khớp với
  `gpt-5x6` (an toàn trước ReDoS, có giới hạn, không có bộ định lượng lồng nhau). Các mẫu được đối sánh
  không phân biệt chữ hoa chữ thường với cả model id thuần và chuỗi kết hợp `provider/model` —
  `gpt-5-6`, `openai/gpt-5-6` và `openai/*` đều hoạt động, còn riêng `*` sẽ loại trừ mọi model.
- Đối sánh: `isCompressionExcluded()` / `normalizeCompressionExclusions()` trong
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kiểm tra đích bị loại trừ
  ngay sau khi phân giải cài đặt nén, **trước khi bất kỳ engine nào chạy**, và xử lý trường hợp khớp
  hoàn toàn giống như khi tính năng nén bị vô hiệu hóa toàn cục — phần thân yêu cầu được đảm bảo
  giống hệt từng byte. Lần bỏ qua này được ghi lại thông qua `writeCompressionSkip(..., "excluded")`
  để có thể quan sát trong dữ liệu phân tích.
- Mặc định (danh sách trống/không có): giống hệt hành vi trước #8034 — không có gì bị loại trừ.

## Các hạn chế đã biết

- **LLMLingua-2 (SLM) yêu cầu các dependency tùy chọn được đặt cùng vị trí.** Worker chỉ chạy trong
  bản dựng production khi `@atjsh/llmlingua-2` + các peer dependency được đặt cùng vị trí trong
  `dist/node_modules` (xem `scripts/build/colocateOptionals.mjs`, #4286). Nếu không có chúng,
  engine sẽ chuyển sang chế độ bỏ qua lỗi (trả về văn bản gốc). Việc phân giải worker không còn phụ thuộc vào
  `import.meta.url` (cơ chế này không hoạt động trong bundle độc lập) — thay vào đó, nó neo vào
  cwd / `argv[1]` lúc runtime.
- **Các gói ngôn ngữ Caveman `de` / `fr` / `ja` chưa hoàn chỉnh.** Chúng cung cấp các quy tắc `context` +
  `filler` + `structural` nhưng không có các gói `dedup` / `ultra`, vì vậy mức cường độ `ultra`
  không mạnh hơn `full` đối với các ngôn ngữ này (chúng chỉ sử dụng các quy tắc riêng — không có
  cơ chế ngầm chuyển về các quy tắc `dedup`/`ultra` tiếng Anh, vốn sẽ làm hỏng văn bản tiếng nước ngoài).
  `en` / `es` / `id` / `pt-BR` đã hoàn chỉnh. Chúng tôi hoan nghênh các đóng góp `dedup.json` + `ultra.json`
  cho những gói chưa hoàn chỉnh.
- **Telemetry xếp chồng chỉ liệt kê các engine đã thực hiện nén.** Một bước trong pipeline xếp chồng có
  engine đã chạy nhưng đạt mức tiết kiệm 0 % sẽ trả về `stats:null`, do đó không xuất hiện trong
  `engineBreakdown` — không thể phân biệt với một bước đã bị bỏ qua. Việc phân biệt
  "đã chạy, 0 %" với "đã bỏ qua" sẽ yêu cầu thay đổi mô hình breakdown và được hoãn lại.

## Xác thực

Các bước kiểm tra tập trung cho khu vực này là:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
