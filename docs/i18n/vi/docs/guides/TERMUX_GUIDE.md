# Termux Headless Setup (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute có thể chạy dưới dạng máy chủ không giao diện trên Android thông qua Termux. Ứng dụng Electron dành cho máy tính để bàn không được hỗ trợ trong Termux, nhưng bảng điều khiển web và API tương thích với OpenAI có thể hoạt động từ trình duyệt cục bộ hoặc từ các thiết bị khác trên cùng mạng.

## Điều kiện tiên quyết

Cài đặt Termux từ F-Droid hoặc các bản phát hành trên GitHub, sau đó cập nhật các gói và cài đặt những công cụ xây dựng cần thiết cho các phần phụ thuộc native như `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Phiên bản Node.js:** OmniRoute yêu cầu Node `>=22.22.2 <23 || >=24.0.0 <27` (khớp với `engines` trong `package.json` / `SUPPORTED_NODE_RANGE`). `nodejs-lts` của Termux thường cung cấp Node 20 LTS, phiên bản này **không còn được hỗ trợ** — thay vào đó, hãy cài đặt `pkg install nodejs` (phiên bản hiện hành) và xác minh rằng `node --version` báo phiên bản thuộc dòng 22.x/24.x trở lên.

Nếu quá trình biên dịch gói native thất bại, hãy chạy lại lệnh `pkg install` ở trên rồi thử cài đặt OmniRoute lại.

## Cài đặt

Chạy trực tiếp gói mới nhất đã được phát hành:

```bash
npx -y omniroute@latest
```

Bạn cũng có thể cài đặt gói trên toàn hệ thống:

```bash
npm install -g omniroute
omniroute
```

## Chạy

Khởi động OmniRoute ở chế độ máy chủ không giao diện:

```bash
omniroute
```

hoặc:

```bash
npx omniroute
```

Bảng điều khiển lắng nghe tại:

```text
http://localhost:20128
```

Mở URL đó trong trình duyệt Android. Nếu bạn chạy các máy khách bên trong Termux, hãy sử dụng cùng máy chủ và cổng làm URL cơ sở tương thích với OpenAI.

## Chạy trong nền

Để chạy một tiến trình nền đơn giản:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Để dừng tiến trình:

```bash
pkill -f omniroute
```

Để tự động khởi động sau khi thiết bị khởi động, hãy cài đặt tiện ích bổ sung Termux:Boot và tạo một tập lệnh khởi động:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Tính năng tối ưu hóa pin của Android có thể dừng các tiến trình nền chạy lâu. Hãy tắt tính năng tối ưu hóa pin cho Termux nếu máy chủ cần duy trì trạng thái trực tuyến.

## Truy cập từ các thiết bị khác

Tìm địa chỉ IP của điện thoại trên mạng WiFi:

```bash
ip addr show wlan0
```

Sau đó mở bảng điều khiển từ một thiết bị khác:

```text
http://PHONE_IP:20128
```

Ví dụ:

```text
http://192.168.1.50:20128
```

Hãy giữ điện thoại và máy khách trên cùng một mạng đáng tin cậy. Nếu bạn cho phép truy cập OmniRoute từ bên ngoài điện thoại, hãy bật khóa API và xác thực bảng điều khiển.

## Thư mục dữ liệu

Theo mặc định, OmniRoute lưu trữ dữ liệu trong thư mục chính của Termux, tuân theo cùng hành vi về đường dẫn dữ liệu phía máy chủ được sử dụng trên Linux. Để đặt cơ sở dữ liệu tại một vị trí cụ thể:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Hạn chế

- Electron không chạy trong Termux.
- Không có khay hệ thống hoặc tích hợp với môi trường máy tính để bàn.
- Thiết lập này chỉ dành cho máy chủ: hãy sử dụng bảng điều khiển trên trình duyệt.
- Các phần phụ thuộc native có thể cần được biên dịch cục bộ.
- Các thiết bị Android có ít bộ nhớ có thể cần giảm số lượng yêu cầu đồng thời.
- Các tính năng chứng chỉ MITM/hệ thống có thể yêu cầu thao tác với kho tin cậy ở cấp Android bên ngoài Termux.

## Khắc phục sự cố

### Nền tảng không được hỗ trợ: android (mọi yêu cầu đều trả về HTTP 500)

**Triệu chứng:** `omniroute` / `omniroute serve` hiển thị `✔ OmniRoute is running!`, nhưng mọi yêu cầu đến bảng điều khiển hoặc API đều trả về `500 Internal Server Error` đơn thuần. `~/.omniroute/logs/application/app.log` vẫn trống, `APP_LOG_LEVEL=debug` không hiển thị thông tin hữu ích nào và nội dung phản hồi là văn bản thuần túy (`Internal Server Error`) mà không có chi tiết JSON.

**Nguyên nhân:** Một số bản dựng Termux/Node báo cáo `process.platform === "android"`. `getCacheDirectory()` của Next.js không xử lý nền tảng đó: nó yêu cầu `~/.cache` (hoặc một thư mục tmp chung) phải _tồn tại sẵn_, nếu không, quá trình tải hook đo lường sẽ thất bại với thông báo:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Vì hook không bao giờ được tải nên tính năng ghi nhật ký không bao giờ khởi động — khiến lỗi 500 trông hoàn toàn không thể chẩn đoán. OmniRoute tạo `~/.cache` (và đặt `XDG_CACHE_HOME` khi chưa được thiết lập) trong điểm vào CLI trước khi Next.js khởi động để bước kiểm tra này thành công trên Android/Termux.

**Giải pháp được hỗ trợ (không vá gói):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Trên các bản dựng OmniRoute hiện tại, CLI tự động thực hiện việc này trên Android/Termux — một lần chạy mới bằng `npx -y omniroute@latest` / cài đặt toàn hệ thống sẽ không yêu cầu bước thủ công. Nếu bạn vẫn gặp lỗi sau khi nâng cấp, hãy tạo `~/.cache` một lần như trên rồi khởi động lại.

**Không** vá `dist/server.js` để buộc `process.platform = "linux"`. Kiểu vá gói này sẽ bị ghi đè sau mỗi lần cài đặt lại/nâng cấp và không cần thiết khi thư mục bộ nhớ đệm đã tồn tại.

### Lỗi xây dựng better-sqlite3

Cài đặt bộ công cụ xây dựng Termux:

```bash
pkg install nodejs python build-essential
```

Sau đó chạy lại:

```bash
npx -y omniroute@latest
```

### Cổng đã được sử dụng

Kiểm tra tiến trình nào đang lắng nghe trên cổng mặc định:

```bash
ss -ltnp | grep 20128
```

Dừng tiến trình cũ:

```bash
pkill -f omniroute
```

### Không thể truy cập bảng điều khiển từ thiết bị khác

Xác minh rằng cả hai thiết bị đều đang kết nối với cùng một mạng WiFi, sau đó kiểm tra từ Termux:

```bash
curl http://localhost:20128
```

Nếu truy cập cục bộ hoạt động nhưng truy cập qua mạng LAN không hoạt động, hãy kiểm tra tính năng cô lập điểm phát sóng/WiFi của Android và mọi hồ sơ tường lửa hoặc VPN trên điện thoại.
