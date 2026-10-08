# ADR: Pluggable persistence boundary (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Trạng thái:** Đề xuất — cần được người bảo trì phê duyệt trước khi bắt đầu công việc runtime
- **Vấn đề theo dõi:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Phạm vi:** Chỉ kiến trúc lưu trữ bền vững; quyết định này không bổ sung hoặc lựa chọn cơ sở dữ liệu bên ngoài

## Bối cảnh

OmniRoute hiện cung cấp các hàm lưu trữ bền vững hướng miền từ `src/lib/db/`, trong khi kết nối dùng chung do `src/lib/db/core.ts` trả về triển khai giao ước `SqliteAdapter` đồng bộ trong `src/lib/db/adapters/types.ts`. Adapter đó hỗ trợ nhiều runtime SQLite, nhưng bề mặt của nó vẫn mang đặc trưng SQLite: các câu lệnh chuẩn bị sẵn đồng bộ, `pragma`, giao dịch trì hoãn và tức thời, sao lưu gốc/sao chép tệp, checkpoint và một handle cơ sở dữ liệu cục bộ.

Luồng khởi động và khôi phục hiện tại cũng quản lý vòng đời tệp SQLite. `src/lib/db/core.ts` phân giải `storage.sqlite`, duy trì một adapter toàn cục cho mỗi tiến trình, tạo checkpoint cho WAL, bảo toàn các bảng được chọn trong quá trình khôi phục và xóa các tệp phụ trợ của SQLite khi dựng lại cơ sở dữ liệu. Việc lựa chọn driver trong `src/lib/db/adapters/driverFactory.ts` chọn giữa các runtime SQLite được hỗ trợ; đây không phải là một lớp trừu tượng cho backend bên ngoài.

Quá trình phát triển lược đồ cũng được ghép nối tương tự. `src/lib/db/migrationRunner.ts` áp dụng các tệp SQL được đánh số, thăm dò `sqlite_master` và `PRAGMA table_info`, phát hiện khả năng hỗ trợ FTS5 tùy chọn và chạy công việc migration trong các giao dịch SQLite. Các mô-đun vận hành như `src/lib/db/backup.ts` và `src/lib/db/optimizationSettings.ts` sử dụng trực tiếp các ngữ nghĩa sao lưu, `PRAGMA`, WAL, kích thước trang, tự động vacuum và `VACUUM`.

Đây là những đặc tính hợp lệ của phương thức triển khai SQLite nhúng. Chúng nên tiếp tục khả dụng mà không buộc PostgreSQL hoặc MySQL phải mô phỏng API SQLite.

## Quyết định

Áp dụng ranh giới lưu trữ bền vững hai cấp cho trạng thái bền vững có tính di động:

1. **Các giao ước repository miền** xác định những thao tác lưu trữ bền vững mà mã nghiệp vụ và định tuyến cần. Bên gọi phụ thuộc vào hành vi và dữ liệu miền, không phụ thuộc vào văn bản SQL, câu lệnh chuẩn bị sẵn, tệp cơ sở dữ liệu hoặc đối tượng phương ngữ.
2. **Một giao ước backend bất đồng bộ nội bộ** hỗ trợ các triển khai repository bằng ngữ cảnh giao dịch, tình trạng hoạt động/sẵn sàng, điều phối migration, khả năng của backend và các lỗi được phân loại. Bề mặt TypeScript chính xác sẽ được đề xuất trong PR triển khai đầu tiên và được kiểm chứng bằng các bài kiểm thử tuân thủ; ADR này chủ ý không cố định một API mang tính suy đoán.

SQLite vẫn là triển khai mặc định. Chuỗi lựa chọn driver SQLite hiện có và `SqliteAdapter` đồng bộ vẫn nằm phía sau triển khai repository SQLite trong khi các miền được chuyển đổi theo từng lát cắt dọc nhỏ. Không người dùng nào bị yêu cầu cấu hình một dịch vụ bên ngoài.

PostgreSQL là triển khai bên ngoài đầu tiên được đề xuất sau khi ranh giới repository được kiểm chứng với SQLite. MySQL sẽ tiếp nối như một triển khai ngang hàng dựa trên cùng một bộ kiểm thử tuân thủ, thay vì trở thành một nhánh logic nghiệp vụ thứ hai.

## Quy tắc ranh giới

### Bề mặt repository có tính di động

Một repository có tính di động có thể cung cấp:

- các thao tác đọc và ghi miền;
- các thao tác nguyên tử tường minh và quyền truy cập repository trong phạm vi giao dịch;
- các thao tác so sánh/cập nhật hoặc lease khi ngữ nghĩa đồng thời là một phần của miền;
- phân trang, sắp xếp và lỗi ràng buộc trung lập với backend.

Tình trạng hoạt động, mức độ sẵn sàng và việc điều phối migration của backend thuộc về giao ước backend/vận hành nội bộ thay vì từng repository miền riêng lẻ.

Một repository có tính di động không được phép cung cấp:

- `prepare`, `get`, `all`, `run` hoặc các handle driver thô;
- `PRAGMA`, các chế độ checkpoint WAL, `VACUUM` hoặc tinh chỉnh trang/bộ nhớ đệm;
- đường dẫn tệp SQLite, tệp phụ trợ hoặc sao lưu bằng cách sao chép tệp;
- `lastInsertRowid` dưới dạng giao ước miền xuyên backend;
- cú pháp FTS5 hoặc `sqlite-vec`;
- một lối thoát phương ngữ chung được mã nghiệp vụ thông thường sử dụng.

### Bề mặt khả năng của backend

Hành vi dành riêng cho backend vẫn phải tường minh và có thể khám phá. Hoạt động bảo trì chỉ dành cho SQLite vẫn nằm phía sau triển khai và giao diện vận hành riêng của nó, bao gồm:

- lựa chọn driver runtime;
- checkpoint WAL và hành vi tắt SQLite;
- các thiết lập kích thước trang, kích thước bộ nhớ đệm và tự động vacuum;
- sao lưu, khôi phục và phục hồi tệp cơ sở dữ liệu;
- xem xét nội quan lược đồ SQLite;
- tích hợp FTS5 và `sqlite-vec`.

Backend bên ngoài không bắt buộc phải mô phỏng các tính năng đó. Các repository phải sử dụng một khả năng có tính di động, cung cấp một triển khai dành riêng cho backend với hành vi được lập tài liệu hoặc báo cáo rằng khả năng đó không khả dụng.

## Mô hình giao dịch và migration

Các API repository xác định thao tác nghiệp vụ nguyên tử; bên gọi không lựa chọn chế độ giao dịch SQL.
Mỗi thao tác phải xác định các bảo đảm đồng thời có thể quan sát được: các bất biến được bảo vệ, khả năng
phát hiện xung đột, phân loại retry, yêu cầu về tính idempotent và lan truyền ngữ cảnh giao dịch.
Các implementation có thể sử dụng những cơ chế giao dịch và mức cô lập khác nhau chỉ khi các bảo đảm
có thể quan sát được đó vẫn tương đương. SQLite có thể tiếp tục sử dụng hành vi giao dịch deferred hoặc
immediate hiện tại trong nội bộ khi hành vi đó đáp ứng hợp đồng của thao tác.

Các backend bên ngoài yêu cầu quyền sở hữu migration rõ ràng để nhiều replica ứng dụng không thể đồng thời
thực hiện cùng một thay đổi schema. Lịch sử migration của các backend có thể dùng chung các mốc logic,
nhưng các tệp SQL của SQLite không được mặc định là có tính di động hoặc có thể tái sử dụng cho một
phương ngữ khác.

## Ngữ nghĩa tuân thủ xuyên backend

Các bài kiểm thử tuân thủ phải bao quát hành vi, không chỉ chữ ký phương thức của repository. Mỗi domain
được migration phải xác định và xác minh:

- múi giờ, độ chính xác và cách tuần tự hóa timestamp;
- thứ tự `NULL`, collation và các yêu cầu về phân biệt chữ hoa chữ thường;
- cách biểu diễn và hành vi so sánh JSON;
- độ chính xác của số nguyên, số thập phân và giá trị tiền tệ;
- thứ tự ổn định và các tiêu chí phân định khi hòa mang tính xác định cho phân trang;
- tạo ID mà không phụ thuộc vào row ID của SQLite;
- phân loại vi phạm ràng buộc duy nhất và khóa ngoại;
- hành vi về số hàng bị ảnh hưởng đối với các thao tác no-op, so sánh/cập nhật và xóa;
- kết quả của các thao tác ghi đồng thời, các xung đột có thể retry và các lần retry idempotent.

Nếu một domain không thể nêu rõ ngữ nghĩa có thể quan sát tương đương, thì domain đó chưa có tính di động
và phải duy trì đặc thù theo backend cho đến khi hợp đồng đó được thiết kế.

## Yêu cầu tương thích

Mọi implementation tuân theo ADR này phải bảo toàn các thuộc tính sau:

- SQLite vẫn là lựa chọn mặc định không cần cấu hình.
- Các tệp SQLite và lịch sử migration hiện có vẫn có thể đọc được.
- Các fallback SQLite cho npm, Electron, Docker và môi trường runtime bị hạn chế vẫn giữ nguyên quy trình khởi động hiện tại.
- Thông tin xác thực của provider được lưu trữ tiếp tục sử dụng hành vi mã hóa hiện có của ứng dụng.
- Migration repository không được âm thầm thay đổi ngữ nghĩa về định tuyến, quota, API key hoặc audit.
- Hành vi sao lưu và phục hồi được lập tài liệu riêng cho từng backend thay vì được trình bày như một cơ chế dùng chung.
- Một bản cài đặt sạch chỉ sử dụng SQLite không tải hoặc yêu cầu driver cơ sở dữ liệu bên ngoài.

## Trình tự triển khai

1. Công bố một bản kiểm kê có thể tái tạo về mức độ phụ thuộc vào SQLite dưới dạng một artifact review riêng biệt.
2. Đưa vào các hợp đồng repository cho domain đầu tiên và các bài kiểm thử tuân thủ.
3. Điều chỉnh implementation SQLite hiện có để hoạt động phía sau các hợp đồng đó mà không thay đổi các giá trị mặc định.
4. Tùy thuộc vào sự phê duyệt của maintainer, bổ sung PostgreSQL làm implementation bên ngoài đầu tiên cho một
   phần control-plane có phạm vi giới hạn.
5. Chỉ mở rộng trạng thái dùng chung sau khi đã có các bài kiểm thử về ghi đồng thời và quyền sở hữu migration.
6. Bổ sung một quy trình migration từ SQLite sang backend bên ngoài theo cách ngoại tuyến và đã được xác thực trước khi quảng bá khả năng chuyển đổi cơ sở dữ liệu.
7. Bổ sung MySQL dựa trên các hợp đồng repository và backend đã được kiểm chứng.

Mỗi bước runtime là một PR riêng biệt và có thể được review độc lập. Không được sử dụng một bước sau đó để biện minh cho việc merge một abstraction chưa được kiểm chứng ở bước trước.

## Lát cắt triển khai đầu tiên

Lát cắt runtime đầu tiên nên được lựa chọn sau khi đã rà soát bản kiểm kê mức độ liên kết. Kết nối
nhà cung cấp, API key, tổ hợp và cấu hình định tuyến là các ứng viên vì các bảng cơ sở của chúng
hiển thị trong `src/lib/db/core.ts`, nhưng ADR này không phê duyệt danh sách bảng hay một PR di chuyển.
Lát cắt này phải bao gồm:

- các bài kiểm thử bảo toàn hành vi của SQLite;
- các bài kiểm thử tuân thủ của repository;
- ranh giới giao dịch rõ ràng;
- xác minh việc mã hóa và che giấu thông tin xác thực được lưu trữ;
- không thay đổi cấu hình khởi động mặc định.

## Các phương án đã cân nhắc

### Thêm PostgreSQL bên dưới `SqliteAdapter`

Đã bác bỏ. `SqliteAdapter` là một lớp tương thích dành cho các runtime SQLite và cung cấp các
thao tác đặc thù của SQLite. Việc mô phỏng giao diện đó sẽ làm rò rỉ các giả định về tính đồng bộ
và đặc thù phương ngữ vào một backend mới.

### Cung cấp API truy vấn/thực thi chung cho tất cả các miền

Đã bác bỏ với vai trò là ranh giới chính. Phương án này sẽ tập trung hóa việc xử lý kết nối nhưng
vẫn để sự phụ thuộc vào phương ngữ SQL, giao dịch và bảng trong các mô-đun nghiệp vụ. Một thành phần
backend cấp thấp có thể tồn tại bên trong các phần triển khai repository, không phải dưới dạng API
lưu trữ hướng đến ứng dụng.

### Viết lại toàn bộ tầng lưu trữ trước khi xác thực một lát cắt

Đã bác bỏ. Phạm vi lưu trữ hiện tại rất rộng và bao gồm vòng đời tệp, khôi phục, tìm kiếm và các
thiết lập vận hành. Các lát cắt dọc cung cấp hành vi và ranh giới hoàn tác có thể xem xét được.

### Thay thế SQLite làm mặc định

Đã bác bỏ. Các bản triển khai nhúng và desktop phụ thuộc vào mô hình khởi động hiện tại không yêu
cầu dịch vụ. Backend bên ngoài là tùy chọn chủ động bật.

### Sử dụng Redis làm nguồn dữ liệu bền vững có thẩm quyền

Đã bác bỏ. Redis có thể hỗ trợ việc điều phối, bộ nhớ đệm hoặc bộ đếm được xác định rõ là tạm thời,
nhưng không thay thế hợp đồng repository bền vững được mô tả ở đây.

## Hệ quả

### Tích cực

- Mã nghiệp vụ có được một ranh giới lưu trữ ổn định, độc lập với phương ngữ cơ sở dữ liệu.
- Hành vi của SQLite được kiểm thử trước khi một backend bên ngoài định hình lớp trừu tượng.
- PostgreSQL và MySQL dùng chung các hợp đồng và bài kiểm thử thay vì sao chép logic miền.
- Các khả năng chỉ có ở SQLite vẫn là những thành phần hạng nhất thay vì trở thành các lớp tương
  thích làm rò rỉ chi tiết triển khai.
- Hành vi di chuyển và giao dịch trong môi trường nhiều replica trở thành một mối quan tâm thiết
  kế rõ ràng.

### Chi phí và rủi ro

- Việc trích xuất repository đòi hỏi di chuyển dần các call site.
- Các ranh giới bất đồng bộ có thể lan truyền qua mã dịch vụ hiện đang đồng bộ.
- Ngữ nghĩa xuyên backend đòi hỏi các bài kiểm thử tuân thủ vượt ra ngoài khả năng tương thích cú
  pháp SQL.
- Sao lưu, tìm kiếm, lưu trữ vector và bảo trì vẫn phụ thuộc vào từng khả năng cụ thể.
- Việc vận hành nhiều hơn một phần triển khai lưu trữ làm tăng chi phí CI và hỗ trợ vận hành.

## Các mục tiêu không thuộc phạm vi

ADR này không:

- thêm dependency cơ sở dữ liệu, biến môi trường, schema hoặc migration;
- thay đổi singleton SQLite đang hoạt động hoặc chuỗi dự phòng driver;
- cam kết hỗ trợ PostgreSQL hoặc MySQL trong một bản phát hành cụ thể;
- làm cho FTS5, `sqlite-vec`, các tệp sao lưu hoặc hoạt động bảo trì SQLite có tính di động;
- xác định mức độ sẵn sàng active-active trước khi có các bài kiểm thử trạng thái dùng chung và
  điều phối;
- phê duyệt việc viết lại toàn bộ `src/lib/db/` trong một lần.

## Các câu hỏi mở cần người bảo trì phê duyệt

1. Hướng ưu tiên có phải là sử dụng kho lưu trữ cùng với ranh giới backend bất đồng bộ nội bộ hay không, hay việc lưu trữ dữ liệu bên ngoài nên được đặt sau một dịch vụ mặt phẳng điều khiển riêng biệt?
2. PostgreSQL có được chấp nhận làm phương án triển khai bên ngoài đầu tiên sau khi xác nhận tính tương thích với SQLite không?
3. Miền nào nên là phạm vi kho lưu trữ giới hạn đầu tiên?
4. Trạng thái nào phải được chia sẻ cho cột mốc đa bản sao đầu tiên và trạng thái nào vẫn chỉ nằm cục bộ trên nút?
5. Cần khoảng thời gian tương thích nào khi quá trình di chuyển kho lưu trữ bị gián đoạn hoặc được hoàn tác?

Cho đến khi các câu hỏi này được giải quyết, tài liệu này chỉ là một đề xuất và không ngụ ý bất kỳ việc tái cấu trúc nào trong thời gian chạy.
