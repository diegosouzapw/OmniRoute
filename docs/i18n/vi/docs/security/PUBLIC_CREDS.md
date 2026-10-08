# Public Credentials Handling (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Nguồn tham chiếu chuẩn:** `open-sse/utils/publicCreds.ts`
> **Kiểm thử:** `tests/unit/publicCreds.test.ts`
> **Cập nhật lần cuối:** 2026-08-07 — v3.8.50
> **Đối tượng:** Các kỹ sư tích hợp những nhà cung cấp phân phối OAuth client_id / client_secret / Firebase Web API keys công khai trong CLI công khai của họ.
> **Trạng thái:** **BẮT BUỘC** đối với mọi mã mới nhúng các mã định danh từ upstream.

## Tại sao cơ chế này tồn tại

- [OAuth 2.0 cho ứng dụng gốc (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret dành cho ứng dụng đã cài đặt là công khai; PKCE cung cấp khả năng bảo mật thực sự.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Các mã định danh ứng dụng Web được thiết kế để công khai.

OmniRoute phải nhúng các giá trị này để người dùng không cấu hình `.env` vẫn có được luồng OAuth hoạt động ngay khi sử dụng. Nếu không có giá trị dự phòng được nhúng, các nhà cung cấp Gemini / Antigravity sẽ ngừng hoạt động đối với bất kỳ người dùng nào làm theo quy trình "chỉ cần clone và chạy".

Tuy nhiên, các giá trị dạng chuỗi trực tiếp như `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` bị **GitHub Secret Scanning**, **Semgrep** và các trình quét mẫu tương tự phát hiện. Mỗi bản phát hành tạo ra hàng loạt kết quả dương tính giả gây nhiễu, tính năng bảo vệ khi push chặn các commit hợp lệ và đội ngũ vận hành không còn tin tưởng luồng cảnh báo.

Tiện ích `open-sse/utils/publicCreds.ts` giải quyết đồng thời cả hai ràng buộc:

- Nhúng mã định danh công khai dưới dạng **chuỗi byte được che bằng XOR** (không có mẫu mà trình quét có thể nhận diện trong mã nguồn).
- Giải mã tại thời điểm chạy thông qua `decodePublicCred` / `resolvePublicCred`.
- Phát hiện các giá trị thô đã tuân theo những tiền tố phổ biến (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) và chuyển tiếp chúng mà không thay đổi, nhờ đó người dùng có giá trị thô trong `.env` hiện tại vẫn tiếp tục sử dụng được mà **không cần di chuyển gì**.

Đây là **làm rối mã, không phải mã hóa.** Bất kỳ ai đọc mã nguồn đều có thể khôi phục giá trị — điều này hoàn toàn phù hợp vì theo thiết kế, giá trị đó là công khai. Mục tiêu duy nhất là tránh bị các biểu thức chính quy của trình quét phát hiện.

## Mẫu bắt buộc

### 1. Thêm thông tin xác thực công khai mới

Khi bạn cần nhúng một giá trị mới do upstream cung cấp mà:

- đến từ CLI / ứng dụng desktop / gói trình duyệt công khai, **và**
- được nhà cung cấp upstream ghi rõ trong tài liệu (hoặc xem) là mã định danh ứng dụng công khai, **và**
- nếu không thì sẽ bị trình quét mẫu phát hiện (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, v.v.),

…hãy thực hiện theo danh sách kiểm tra sau:

1. Tạo chuỗi byte được che:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Thêm một mục mới vào `EMBEDDED_DEFAULTS` trong `open-sse/utils/publicCreds.ts` với **tên khóa trung lập** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, v.v.). **Không** sử dụng các tên như `client_secret` hoặc `api_key` trong tiện ích — những từ đó kích hoạt các quy tắc phát hiện bí mật chung của Semgrep.

3. Thêm một `keyof typeof EMBEDDED_DEFAULTS` vào kiểu union công khai (kiểu này được suy luận tự động).

4. Trong mã sử dụng, thay chuỗi trực tiếp được ghi cứng bằng:

   ```ts
   // một biến môi trường ghi đè
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // nhiều bí danh biến môi trường (giá trị không rỗng đầu tiên sẽ được chọn)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // không có biến môi trường ghi đè (luôn dùng giá trị mặc định được nhúng)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Xóa chuỗi trực tiếp khỏi `.env.example` (thay bằng tài liệu chỉ gồm chú thích, hướng người đọc đến đây):

   ```dotenv
   # ── Nhà cung cấp (Google / Firebase / v.v.) ──
   # Thông tin xác thực OAuth công khai được nhúng vào mã thông qua
   # open-sse/utils/publicCreds.ts. Chỉ đặt các biến này để dùng thông tin của riêng bạn.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Cập nhật `tests/unit/publicCreds.test.ts` để thêm phép kiểm tra hình dạng cho khóa mới (xác minh định dạng, không xác minh giá trị trực tiếp — xem các kiểm thử hiện có để biết mẫu).

7. **Không bao giờ** thêm các chuỗi trực tiếp `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` vào tệp kiểm thử. Hãy sử dụng các hằng số `FAKE_*` được tạo từ những đoạn ghép bằng `.join("")` (xem các kiểm thử hiện có).

### 2. Mã sử dụng

- **Chỉ đọc từ `resolvePublicCred()` / `resolvePublicCredMulti()`** — không bao giờ gọi trực tiếp `decodePublicCredBytes()` bên ngoài tiện ích.
- Tiện ích này được chủ ý thiết kế để có chi phí thấp (XOR byte tuyến tính) và an toàn khi gọi tại thời điểm tải mô-đun; các giá trị mặc định chỉ được tính một lần.
- Giá trị ghi đè từ biến môi trường luôn được ưu tiên. Nếu người dùng đặt `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, tiện ích sẽ chuyển tiếp nguyên trạng giá trị thô đó.

### 3. Các mẫu bị cấm

❌ **Không bao giờ** thực hiện bất kỳ điều nào sau đây trong mã production (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// KHÔNG TỐT: giá trị trực tiếp kích hoạt Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// KHÔNG TỐT: base64 của chuỗi trực tiếp — GitHub vẫn phát hiện kể từ 02/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// KHÔNG TỐT: nối chuỗi để tái tạo mẫu tại thời điểm chạy
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// KHÔNG TỐT: mã hóa hex/ROT13 — cách làm rối khác nhưng vẫn có cùng rủi ro bị phát hiện
clientSecret: hexDecode("474f4353..."),
```

Tất cả các cách này cuối cùng đều kích hoạt trình quét. Hãy sử dụng `resolvePublicCred()`.

❌ **Không bao giờ** thêm thông tin xác thực dạng chuỗi trực tiếp vào `.env.example`. Người dùng cần các giá trị upstream thực có thể tự trích xuất chúng từ CLI công khai hoặc sử dụng đăng ký OAuth của riêng mình.

❌ **Không bao giờ** bỏ qua một cảnh báo quét bí mật mới khi chưa kiểm tra trước xem thông tin xác thực đó có nên được chuyển sang tiện ích này hay không.

## Các biện pháp kiểm soát liên quan

- `RAW_VALUE_PATTERN` trong `publicCreds.ts` liệt kê các tiền tố kích hoạt cơ chế truyền nguyên giá trị (tương thích ngược). Chỉ mở rộng mẫu này cho các định dạng thông tin xác thực công khai đã được ghi lại trong tài liệu, tuyệt đối không áp dụng cho các bí mật độc quyền.
- `.env.example` được kiểm tra bởi script `check-env-doc-sync` trong CI — khi xóa một biến tại đây, hãy đảm bảo tài liệu cũng được cập nhật tương ứng.
- Cả hai bộ kiểm thử `npm run test:vitest` và `node --import tsx/esm --test tests/unit/publicCreds.test.ts` đều phải tiếp tục chạy thành công.

## Khi KHÔNG nên sử dụng helper này

Helper này **chỉ** dành cho thông tin xác thực:

1. Được nhà cung cấp thượng nguồn phân phối công khai (tệp nhị phân CLI, gói trình duyệt, tài liệu chính thức).
2. Được ghi rõ hoặc ngụ ý rõ ràng là không cần bảo mật (được bảo vệ bằng PKCE, khóa Firebase Web hoặc tương tự).

Đối với tất cả các trường hợp khác — token do người vận hành cấp, bí mật riêng theo từng tenant, `client_secret` của ứng dụng OAuth của riêng bạn, khóa mã hóa, bí mật JWT, mật khẩu cơ sở dữ liệu — **chỉ sử dụng biến môi trường** (`process.env.FOO`, dự phòng bằng `||` thành giá trị rỗng / lỗi tường minh). Những thông tin này phải được lưu trong `.env` và [kho lưu trữ thông tin xác thực được mã hóa](./COMPLIANCE.md), không phải trong mã nguồn.

## Tài liệu tham khảo

- [Google: OAuth 2.0 cho ứng dụng gốc](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Khóa API để nhận dạng ứng dụng khách](https://firebase.google.com/docs/projects/api-keys)
- [Các bí mật được GitHub Secret Scanning hỗ trợ](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: phát hiện token được mã hóa base64 (tháng 2 năm 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit giới thiệu helper này: `1a39c31f` — _fix(security): che thông tin xác thực thượng nguồn công khai + tập trung hóa việc làm sạch lỗi_
