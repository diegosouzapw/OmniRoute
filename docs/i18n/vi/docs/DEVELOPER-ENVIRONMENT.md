# Developer environment notes (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Trang này giải thích cách dự án xử lý tệp `.env` cục bộ cũng như cách quản lý các tệp môi trường và bí mật khi phát triển OmniRoute.

## Hành vi postinstall của .env

Dự án có thể tạo một tệp `.env` cục bộ trong quá trình chạy `npm install` / `postinstall` để thuận tiện cho nhà phát triển. Tệp này chỉ dành cho việc phát triển và kiểm thử cục bộ, tuyệt đối không được commit vào hệ thống quản lý phiên bản.

Các điểm chính:

- Tệp `.gitignore` của kho lưu trữ đã bỏ qua các tệp `.env*` (xem mục tương ứng trong `.gitignore`). Không xóa hoặc thay đổi quy tắc đó, trừ khi bạn chủ ý muốn commit một tệp ví dụ cụ thể và đã có quy trình được ghi lại cho việc này.
- Nếu một bí mật thực bị vô tình commit vào kho lưu trữ, hãy xoay vòng/thu hồi thông tin xác thực ngay lập tức và xóa bí mật đó khỏi lịch sử kho lưu trữ (ví dụ: sử dụng `git filter-repo` hoặc một quy trình khắc phục tương đương). Hãy liên hệ với người phụ trách bảo mật/đầu mối liên hệ nếu bạn cần trợ giúp.
- Đối với CI và môi trường sản xuất, hãy sử dụng bí mật CI hoặc một trình quản lý bí mật (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, v.v.) thay vì commit bí mật vào tệp.

## Quy trình làm việc cục bộ được khuyến nghị

- Chỉ lưu `.env` trong không gian làm việc cục bộ của bạn. Sử dụng `.env.example` (đã được theo dõi) để ghi lại các biến bắt buộc và những giá trị ví dụ được chấp nhận.
- Khi chạy các bài kiểm thử cục bộ yêu cầu những giá trị tương tự bí mật, hãy ưu tiên các giá trị giữ chỗ tổng hợp hoặc khóa tạm thời được tạo khi chạy thay vì thông tin xác thực thực.
- Thêm một chú thích ngắn trong các bài kiểm thử sử dụng giá trị giữ chỗ để người đánh giá hiểu rằng dữ liệu kiểm thử này là dữ liệu tổng hợp.

## Lưu ý về trình quét

- Một số tài nguyên đã biên dịch hoặc tài nguyên nhị phân (ví dụ: các blob WASM base64 được nhúng) có thể chứa các chuỗi con ASCII trông giống như thông tin xác thực và có thể kích hoạt các trình quét bí mật dựa trên văn bản. Nếu những tài nguyên này là hợp lệ, hãy thêm chúng vào danh sách cho phép của trình quét hoặc loại trừ các thư mục tương ứng trong cấu hình trình quét.

## Nếu bạn phát hiện rò rỉ

1. Xoay vòng/thu hồi khóa ngay lập tức.
2. Xóa bí mật khỏi lịch sử và buộc đẩy một nhánh đã được làm sạch nếu cần.
3. Thông báo cho những người bảo trì và tuân theo danh sách kiểm tra ứng phó sự cố của tổ chức bạn.
