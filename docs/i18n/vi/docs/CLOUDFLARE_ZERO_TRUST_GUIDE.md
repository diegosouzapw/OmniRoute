# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Hướng dẫn này ghi lại tiêu chuẩn vàng của cơ sở hạ tầng mạng để bảo vệ**OmniRoute**và hiển thị ứng dụng của bạn trên Internet một cách an toàn**mà không cần mở bất kỳ cổng nào (Zero Inbound)**.## What was done on your VM?

Chúng tôi đã bật OmniRoute ở chế độ**Split-Port**qua PM2:

-**Cổng `20128`:**Chạy**chỉ API**`/v1`. -**Cổng `20129`:**Chạy**chỉ Bảng điều khiển quản trị**.

Hơn nữa, dịch vụ nội bộ yêu cầu `REQUIRE_API_KEY=true`, nghĩa là không có tác nhân nào có thể sử dụng điểm cuối API mà không gửi "Mã thông báo mang" hợp pháp được tạo trong tab Khóa API của Trang tổng quan.

Điều này cho phép chúng tôi tạo hai quy tắc mạng hoàn toàn độc lập. Đây là nơi**Đường hầm Cloudflare (cloudflared)**phát huy tác dụng.---

## 1. How to Create the Tunnel in Cloudflare

Tiện ích `cloudflared` đã được cài đặt trên máy của bạn. Hãy làm theo các bước sau trên đám mây:

1. Truy cập bảng điều khiển**Cloudflare Zero Trust**của bạn (one.dash.cloudflare.com).
2. Trong menu bên trái, đi tới**Mạng > Đường hầm**.
3. Nhấp vào**Thêm đường hầm**, chọn**Cloudflared**và đặt tên là `OmniRoute-VM`.
4. Nó sẽ tạo ra một lệnh trên màn hình có tên "Cài đặt và chạy trình kết nối".**Bạn chỉ cần sao chép Token (chuỗi dài sau `--token`)**.
5. Đăng nhập qua SSH vào máy ảo của bạn (hoặc Proxmox Terminal) và thực thi: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Vẫn trên màn hình Đường hầm mới được tạo, hãy chuyển đến tab**Tên máy chủ công cộng**và thêm các tuyến**hai**, tận dụng sự phân tách mà chúng tôi đã thực hiện:### Route 1: Secure API (Limited)

-**Tên miền phụ:**`api` -**Tên miền:**`yourglobal.com` (chọn tên miền thực của bạn) -**Loại dịch vụ:**`HTTP` -**URL:**`127.0.0.1:20128` _(Cổng API nội bộ)_### Route 2: Zero Trust Dashboard (Closed)

-**Miền phụ:**`omniroute` hoặc `panel` -**Tên miền:**`yourglobal.com` -**Loại dịch vụ:**`HTTP` -**URL:**`127.0.0.1:20129` _(Ứng dụng nội bộ/Cổng trực quan)_

Tại thời điểm này, kết nối "Vật lý" đã được giải quyết. Bây giờ chúng ta hãy thực sự bảo vệ nó.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Không có mật khẩu cục bộ nào bảo vệ trang tổng quan của bạn tốt hơn việc loại bỏ hoàn toàn quyền truy cập vào trang tổng quan đó khỏi mạng internet mở.

1. Trong bảng điều khiển Zero Trust, hãy đi tới**Truy cập > Ứng dụng > Thêm ứng dụng**.
2. Chọn**Tự lưu trữ**.
3. Trong**Tên ứng dụng**, nhập `Bảng điều khiển OmniRoute`.
4. Trong**Miền ứng dụng**, nhập `omniroute.yourglobal.com` (Miền bạn đã sử dụng trong "Tuyến đường 2").
5. Nhấp vào**Tiếp theo**.
6. Trong**Hành động quy tắc**, chọn `Cho phép`. Đối với Tên quy tắc, hãy nhập `Chỉ dành cho quản trị viên`.
7. Trong**Bao gồm**, trong danh sách thả xuống "Bộ chọn", hãy chọn `Email` và nhập email của bạn, ví dụ: `admin@spgeo.com.br`.
8. Lưu (`Thêm ứng dụng`).

> **Điều này đã làm gì:**Nếu bạn cố mở `omniroute.yourglobal.com`, nó sẽ không còn xuất hiện trên ứng dụng OmniRoute của bạn nữa! Nó xuất hiện trên màn hình Cloudflare trang nhã yêu cầu bạn nhập email của mình. Chỉ khi bạn (hoặc email bạn đã nhập) được nhập vào đó, bạn sẽ nhận được mã tạm thời gồm 6 chữ số trong Outlook/Gmail để mở khóa đường hầm tới cổng `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Bảng điều khiển Zero Trust không áp dụng cho lộ trình API (`api.yourglobal.com`), vì đây là quyền truy cập có lập trình thông qua các công cụ (tác nhân) tự động mà không cần trình duyệt. Để làm điều này, chúng tôi sẽ sử dụng Tường lửa chính (WAF) của Cloudflare.

1. Truy cập**Bảng điều khiển Cloudflare thông thường**(dash.cloudflare.com) và truy cập Miền của bạn.
2. Trong menu bên trái, đi tới**Bảo mật > WAF > Quy tắc giới hạn tốc độ**.
3. Nhấp vào**Tạo quy tắc**. 4.**Tên:**`Chống lạm dụng API OmniRoute` 5.**Nếu yêu cầu đến khớp...**
   - Chọn trường: `Tên máy chủ`
   - Toán tử: `bằng`
   - Giá trị: `api.yourglobal.com`
4. Trong**Có cùng đặc điểm:**Giữ `IP`.
5. Về giới hạn (Limit): -**Khi yêu cầu vượt quá:**`50` -**Thời gian:**`1 phút`
6. Cuối cùng, trong**Hành động**: `Chặn` và quyết định xem việc chặn kéo dài trong 1 phút hay 1 giờ. 9.**Triển khai**.

> **Điều này đã xảy ra:**Không ai có thể gửi hơn 50 yêu cầu trong khoảng thời gian 60 giây tới URL API của bạn. Vì bạn điều hành nhiều tác nhân và mức tiêu thụ đằng sau chúng đã đạt đến giới hạn tốc độ và theo dõi mã thông báo, đây chỉ là một biện pháp ở Lớp Internet Edge để bảo vệ Phiên bản tại chỗ của bạn không bị ngừng hoạt động do căng thẳng nhiệt trước khi lưu lượng truy cập đi xuống đường hầm.---

## Finalization

1. VM của bạn**không có cổng nào bị lộ**trong `/etc/ufw`.
2. OmniRoute chỉ hỗ trợ HTTPS gửi đi (`cloudflared`) và không nhận TCP trực tiếp từ thế giới.
3. Các yêu cầu của bạn tới OpenAI bị xáo trộn vì chúng tôi đã định cấu hình chúng trên toàn cầu để chuyển qua Proxy SOCKS5 (Đám mây không quan tâm đến SOCKS5 vì nó được gửi đến).
4. Trang tổng quan web của bạn có xác thực 2 yếu tố bằng Email.
5. API của bạn bị Cloudflare giới hạn tỷ lệ ở mức biên và chỉ giao dịch Mã thông báo mang.
