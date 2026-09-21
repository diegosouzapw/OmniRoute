# Log export (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Xuất liên tục, tăng dần nhật ký cuộc gọi OmniRoute sang một kho phân tích bên ngoài.

Tab Logs trên bảng điều khiển lưu lịch sử yêu cầu trong SQLite (`call_logs`), với dung lượng bị giới hạn bởi cơ chế
xoay vòng và chính sách lưu giữ. Tính năng xuất nhật ký chuyển cùng một tập bản ghi ra ngoài theo lịch để dữ liệu có thể tồn tại lâu hơn
cơ sở dữ liệu cục bộ và được kết hợp với dữ liệu khác. BigQuery là đích đầu tiên; pipeline sử dụng một registry, vì vậy có thể bổ sung
thêm các đích khác.

---

## 1. Cách hoạt động

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (tập trường của tab Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Lịch chạy** — một tác vụ cron `JobRegistry`, `log_export`, mặc định là `0 * * * *` (mỗi giờ,
  UTC). Được đăng ký trong `src/lib/initCloudSync.ts`; có thể ghi đè bằng `OMNIROUTE_LOG_EXPORT_CRON`.
  Mỗi lần kích hoạt sẽ lần lượt xử lý hết dữ liệu cho mọi đích **đã bật**.
- **Con trỏ** — `call_logs.rowid` ngầm định của SQLite, được lưu riêng cho từng đích trong
  `log_export_destinations.cursor_row_id`. `timestamp` được chủ ý không dùng làm con trỏ: bên gọi
  có thể cung cấp giá trị riêng, do đó một yêu cầu chậm có thể được ghi sau một yêu cầu nhanh hơn nhưng bắt đầu
  muộn hơn, và con trỏ theo dấu thời gian sẽ bỏ qua yêu cầu đó.
- **Chia lô** — `batch_size` hàng cho mỗi yêu cầu (mặc định 500), `max_rows_per_run` hàng cho mỗi lần chạy
  (mặc định 10000), để lượng dữ liệu tồn đọng lớn được xử lý qua nhiều lần kích hoạt thay vì chặn một lần chạy.
- **Phân phối** — con trỏ chỉ tiến lên sau khi `send()` hoàn tất. Một lô bị lỗi sẽ giữ nguyên
  vị trí con trỏ, vì vậy cùng các hàng đó sẽ được thử lại trong lần chạy tiếp theo. Cơ chế bảo đảm là
  ít nhất một lần cùng với việc khử trùng lặp ở phía đích, chứ không thực sự chính xác một lần: BigQuery định danh mỗi
  hàng bằng id nhật ký cuộc gọi và áp dụng điều này theo khả năng tốt nhất trong khoảng thời gian khử trùng lặp riêng của nó.
- **Bảo vệ khỏi chạy chồng lấn** — lần kích hoạt cron và `POST .../run` có thể xảy ra đồng thời. Một đích
  đang được xử lý sẽ bị bỏ qua thay vì được xử lý hai lần (`skipped: true` trong kết quả chạy),
  vì vậy một lần chạy đồng thời không thể gửi lại một lô hoặc ghi lùi con trỏ.
- **Khôi phục sau khi xóa dữ liệu** — nếu `cursor_row_id` lớn hơn `MAX(rowid)` (toàn bộ bảng đã bị
  xóa và rowid được khởi tạo lại), trình chạy sẽ đưa con trỏ về 0 thay vì mất khả năng nhìn thấy dữ liệu vĩnh viễn.

### Payload (prompt và nội dung hoàn thành)

Theo mặc định, dữ liệu xuất chỉ chứa các trường tóm tắt hiển thị trong **danh sách** Logs. Việc bật
**Xuất prompt và phản hồi** (`includeBodies`) sẽ gửi thêm những gì khung **chi tiết**
Logs hiển thị cho mỗi cuộc gọi:

| Trường                           | Nội dung lưu trữ                                                            |
| -------------------------------- | --------------------------------------------------------------------------- |
| `request_body` / `response_body` | Payload cuộc gọi theo cách bảng điều khiển hiển thị                         |
| `pipeline_route_decision`        | Đích và mô hình mà router đã chọn                                           |
| `pipeline_client_request`        | Yêu cầu thô chính xác như client đã gửi                                     |
| `pipeline_openai_request`        | Sau khi được chuyển đổi sang định dạng OpenAI nội bộ                        |
| `pipeline_provider_request`      | Dữ liệu thực tế được gửi lên thượng nguồn, theo phương ngữ của nhà cung cấp |
| `pipeline_provider_response`     | Phản hồi thô từ thượng nguồn                                                |
| `pipeline_client_response`       | Nội dung được trả lại cho bên gọi                                           |
| `pipeline_error`                 | Chi tiết lỗi ở cấp pipeline cho một cuộc gọi thất bại                       |
| `bodies_truncated`               | True khi bất kỳ trường nào ở trên đạt `maxBodyBytes`                        |

Đây là nội dung prompt, vì vậy tính năng này **bị tắt theo mặc định** và được chủ ý cấu hình riêng cho từng đích.
Dữ liệu được gửi chính là dữ liệu bảng điều khiển hiển thị, vì cả hai đều đọc qua `getCallLogById`: payload
đã được làm sạch PII và che thông tin bí mật khi được ghi, còn cuộc gọi được thực hiện bằng khóa API
`noLog` hoàn toàn không lưu payload, nên không có gì để xuất.

Payload được đọc theo từng hàng từ artifact trên hệ thống tệp, vì vậy quá trình nạp dữ liệu chỉ chạy cho các đích
đã yêu cầu tính năng này. Một hàng có artifact bị thiếu hoặc hỏng sẽ xuất phần tóm tắt với các payload
null thay vì làm hỏng lô và khiến con trỏ bị mắc kẹt.

`maxBodyBytes` (mặc định 262144) giới hạn kích thước của từng trường. Payload dài hơn sẽ được **cắt ngắn thay vì
loại bỏ** — một prompt bị cắt vẫn trả lời được câu hỏi "đã hỏi điều gì" — và hàng đó được đánh dấu bằng
`bodies_truncated`. Các delta được truyền trực tuyến theo từng phần không được xuất; phản hồi đã ghép hoàn chỉnh
đã có trong `pipeline_provider_response` và `pipeline_client_response`.

---

## 2. Tệp

| Thành phần                    | Vị trí                                       |
| ----------------------------- | -------------------------------------------- |
| Hợp đồng đích                 | `src/lib/logExport/types.ts`                 |
| Registry                      | `src/lib/logExport/registry.ts`              |
| Xử lý bí mật                  | `src/lib/logExport/secrets.ts`               |
| Trình chạy (vòng lặp con trỏ) | `src/lib/logExport/runner.ts`                |
| Ánh xạ API                    | `src/lib/logExport/presenter.ts`             |
| Đích BigQuery                 | `src/lib/logExport/destinations/bigquery.ts` |
| Xác thực Google SA            | `src/lib/logExport/googleServiceAccount.ts`  |
| Nguồn nhật ký cuộc gọi        | `src/lib/usage/callLogExportSource.ts`       |
| Lưu trữ bền vững              | `src/lib/db/logExportDestinations.ts`        |
| Tác vụ cron                   | `src/lib/jobs/logExportJob.ts`               |
| Lớp REST                      | `src/app/api/log-export/`                    |
| Trang bảng điều khiển         | `src/app/(dashboard)/dashboard/log-export/`  |

Lược đồ: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Tất cả các tuyến đều yêu cầu xác thực quản trị (`requireManagementAuth`). Bí mật không bao giờ được trả về:
một bí mật đã lưu sẽ được trả về dưới dạng giá trị chữ `__stored__`, và việc gửi lại giá trị đó trong một lần cập nhật
sẽ giữ nguyên thông tin xác thực đã lưu.

Việc tạo hoặc cập nhật một đích mà kiểu của nó khai báo có bí mật **yêu cầu
`STORAGE_ENCRYPTION_KEY`**. Nếu không có biến này, `encrypt()` sẽ âm thầm truyền nguyên giá trị, vì vậy thao tác ghi
sẽ bị từ chối với mã 400 thay vì đưa thông tin xác thực vào SQLite dưới dạng văn bản thuần túy (cùng cơ chế bảo vệ mà
webhook Telegram áp dụng).

| Phương thức | Đường dẫn                                | Mục đích                                                       |
| ----------- | ---------------------------------------- | -------------------------------------------------------------- |
| `GET`       | `/api/log-export/types`                  | Các kiểu đích + danh sách trường cấu hình của chúng            |
| `GET`       | `/api/log-export/destinations`           | Liệt kê các đích (bí mật đã được che)                          |
| `POST`      | `/api/log-export/destinations`           | Tạo một đích                                                   |
| `GET`       | `/api/log-export/destinations/{id}`      | Đọc một đích                                                   |
| `PUT`       | `/api/log-export/destinations/{id}`      | Cập nhật tên / trạng thái bật / cấu hình / chia lô             |
| `DELETE`    | `/api/log-export/destinations/{id}`      | Xóa                                                            |
| `POST`      | `/api/log-export/destinations/{id}/test` | Kiểm tra thông tin xác thực, không ghi gì                      |
| `POST`      | `/api/log-export/destinations/{id}/run`  | Xử lý ngay, cùng luồng với lần chạy theo lịch                  |
| `GET`       | `/api/log-export/status`                 | Trạng thái cron, các lần chạy gần đây, tồn đọng theo từng đích |

`GET /api/log-export/types` là yếu tố giúp giao diện người dùng trở nên tổng quát: biểu mẫu trên bảng điều khiển được kết xuất từ
các mô tả trường được trả về, vì vậy việc thêm một đích mới không yêu cầu thay đổi giao diện người dùng.

---

## 4. Đích BigQuery

Các khóa cấu hình (`type: "bigquery"`):

| Khóa                 | Ghi chú                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| `projectId`          | Dự án GCP chứa tập dữ liệu                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                           |
| `location`           | Chỉ được dùng khi cần tạo tập dữ liệu (mặc định `EU`)                     |
| `serviceAccountJson` | Khóa tài khoản dịch vụ. Bí mật: được mã hóa khi lưu, không bao giờ trả về |
| `autoCreate`         | Tạo tập dữ liệu và bảng trong lần xuất đầu tiên (mặc định `true`)         |

Tài khoản dịch vụ cần quyền `bigquery.tables.updateData` trên bảng đích, cùng với
`bigquery.datasets.create` / `bigquery.tables.create` khi `autoCreate` được bật.

Một lô đã cấu hình là đơn vị **con trỏ**, không phải đơn vị HTTP: `send()` chia lô đó thành các lời gọi insertAll
với tối đa 500 hàng, vì vậy một `batch_size` lớn không thể vượt quá giới hạn yêu cầu 10 MB của BigQuery.
Các trạng thái tạm thời (408/429/500/502/503/504) được thử lại tối đa ba lần với thời gian chờ tăng theo cấp số nhân,
đồng thời tái sử dụng cùng các insertIds; lỗi xác thực và lược đồ sẽ ném lỗi ngay trong lần thử đầu tiên thay vì
lãng phí cả lượt chạy.

Một bảng vừa được tạo chưa thể xuất hiện ngay với điểm cuối truyền phát, nên điểm cuối này sẽ trả về
404 trong vài giây. Lỗi 404 đó được thử lại, nhưng **chỉ khi lượt chạy này đã tạo bảng** —
một bảng thực sự không tồn tại vẫn sẽ thất bại ngay. Lưu ý rằng việc tạo lại một bảng bằng tên của
một bảng vừa bị xóa gần đây khiến BigQuery từ chối các thao tác chèn truyền phát trong vài phút; đây là
đặc tính của quy trình xóa rồi tạo lại, vì vậy hãy ưu tiên dùng tên bảng mới thay vì xóa và thêm lại bảng.

**Lỗi một phần được trả về dưới dạng HTTP 200 với `insertErrors[]` không rỗng.** Trường hợp này được xem là
lỗi và sẽ ném lỗi, nhờ đó con trỏ không tiến qua những hàng mà BigQuery chưa từng chấp nhận;
`tests/unit/log-export-bigquery.test.ts` cố định hành vi này.

Giao vận sử dụng REST thuần túy — một assertion RS256 tự ký được trao đổi để lấy mã truy cập tại
`https://oauth2.googleapis.com/token`, sau đó các hàng được gửi đến `tabledata.insertAll`. Không sử dụng
Google SDK. Các mã truy cập được lưu vào bộ nhớ đệm trong tiến trình theo từng cặp (tài khoản dịch vụ, phạm vi).

Bảng được tạo có một cột cho mỗi trường trong thẻ Logs, cùng với `exported_at`, và được bố trí phù hợp với
cách nhật ký cuộc gọi thực sự được truy vấn:

- **Phân vùng theo ngày dựa trên `timestamp`**, vì vậy một truy vấn bị giới hạn theo ngày chỉ quét những ngày đó.
- **Phân cụm theo `api_key_name`, `provider`, `model`, `status`** (theo thứ tự đó), nhờ vậy việc lọc theo
  người chạy, nơi yêu cầu được gửi đến hoặc liệu yêu cầu có thất bại hay không sẽ loại bỏ các khối không liên quan trong mỗi phân vùng. BigQuery
  cho phép tối đa bốn cột phân cụm và thứ tự có ý nghĩa quan trọng: chỉ riêng bộ lọc theo `api_key_name`
  có thể loại bỏ các khối, còn chỉ riêng bộ lọc theo `status` thì không.
- **Thời gian lưu giữ phân vùng tùy chọn** thông qua `partitionExpirationDays` (0 giữ lại mọi thứ), được áp dụng
  khi bảng được tạo.

Cả hai thiết lập đều được áp dụng tại thời điểm tạo. Một bảng hiện có sẽ giữ nguyên bố cục hiện tại, vì vậy
hãy trỏ đích đến một table id mới nếu bạn muốn áp dụng chúng.

`tests/unit/log-export-bigquery.test.ts` xác nhận rằng mapper và schema của bảng luôn
đồng bộ chặt chẽ, nhờ đó một cột call-log mới không thể bị âm thầm loại bỏ trong quá trình xuất.

Các batch được chia chunk dựa trên **cả** số lượng hàng và số byte sau khi tuần tự hóa. Chỉ số lượng hàng là không đủ
khi payload được xuất: 500 hàng chứa prompt có thể chiếm hàng chục megabyte, và insertAll
từ chối yêu cầu vượt quá 10 MB. Các chunk được đóng khi đạt 500 hàng hoặc 9 MB, tùy điều kiện nào đến trước.

---

## 5. Thêm một đích đến

1. Tạo `src/lib/logExport/destinations/<name>.ts` để export một `LogExportDestinationType`:
   một `configSchema` của Zod, một mảng mô tả `fields` cho UI, `secretFields`, và một
   `createClient(config)` trả về `test()` / `prepare()` / `send(records)`.
2. Thêm nó vào mảng `DESTINATIONS` trong `src/lib/logExport/registry.ts`.
3. Viết các bài kiểm thử trong `tests/unit/`.

Đó là toàn bộ thay đổi: cơ chế lưu trữ, cron job, lớp REST, mã hóa thông tin bí mật và biểu mẫu
trên dashboard đều đọc từ registry.

Hai quy tắc dành cho đích đến mới:

- `send()` **phải throw** khi xảy ra lỗi một phần. Việc resolve có nghĩa là "đích đến đã có các hàng này",
  và con trỏ sẽ vĩnh viễn di chuyển qua chúng.
- Một đích đến nhận URL do người dùng cung cấp phải xác thực URL đó thông qua
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) trước khi fetch,
  tương tự như cách webhook thực hiện. BigQuery không cần bước này vì các host của nó là hằng số.

---

## 6. Vận hành

- **Dashboard**: Integrations → Log export. Thêm một đích đến, chạy **Test** để kiểm tra thông tin xác thực
  mà không ghi các hàng, sau đó bật đích đến.
- **Dữ liệu tồn đọng**: mỗi thẻ đích đến hiển thị số hàng đang chờ và con trỏ; `GET
/api/log-export/status` trả về các số liệu tương tự cùng 20 lần chạy job gần nhất.
- **Một đích đến bị lỗi không làm các đích đến khác thất bại** — bản tóm tắt lần chạy ghi lại trạng thái
  của từng đích đến trong `last_status` / `last_error`, còn lịch sử chạy job lưu giữ thông tin tổng hợp.
- **Xóa một đích đến cũng sẽ xóa con trỏ của nó.** Khi thêm lại, hệ thống sẽ bắt đầu từ nhật ký cuộc gọi
  cũ nhất còn được lưu giữ, khiến các hàng mà đích đến có thể đã lưu bị gửi lại. Trên BigQuery, `insertId`
  của từng hàng chỉ xử lý việc này trong khoảng thời gian chống trùng lặp riêng của BigQuery, vì vậy nên
  ưu tiên tắt một đích đến thay vì xóa nó.
