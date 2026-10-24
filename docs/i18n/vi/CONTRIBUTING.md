# Contributing to OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Thiết lập môi trường phát triển

### Điều kiện tiên quyết

- **Node.js** `>=22.22.2 <23`, hoặc `>=24.0.0 <27` (khuyến nghị: 24 LTS)
- **npm** 10+

> **Người dùng npm v11+ (Node 24+):** Sau khi chạy `npm install`, hãy xác minh rằng các mô-đun native đã được cài đặt:
> `node -e "require('better-sqlite3')"`. Nếu lệnh thất bại với lỗi `MODULE_NOT_FOUND`,
> hãy chạy `npm approve-scripts better-sqlite3 && npm install`. Xem
> [Khắc phục sự cố](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Sao chép & Cài đặt

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Biến môi trường

```bash
# Tạo tệp .env từ mẫu
cp .env.example .env

# Tạo các khóa bí mật bắt buộc
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Các biến chính dành cho môi trường phát triển:

| Biến                   | Giá trị mặc định khi phát triển | Mô tả                       |
| ---------------------- | ------------------------------- | --------------------------- |
| `PORT`                 | `20128`                         | Cổng máy chủ                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`        | URL cơ sở cho frontend      |
| `JWT_SECRET`           | (tạo ở trên)                    | Khóa bí mật để ký JWT       |
| `INITIAL_PASSWORD`     | `CHANGEME`                      | Mật khẩu đăng nhập lần đầu  |
| `APP_LOG_LEVEL`        | `info`                          | Mức độ chi tiết của nhật ký |

### Cài đặt bảng điều khiển

Bảng điều khiển cung cấp các nút bật/tắt trên giao diện người dùng cho những tính năng cũng có thể được cấu hình thông qua biến môi trường:

| Vị trí cài đặt     | Nút bật/tắt                 | Mô tả                                  |
| ------------------ | --------------------------- | -------------------------------------- |
| Cài đặt → Nâng cao | Chế độ gỡ lỗi               | Bật nhật ký yêu cầu gỡ lỗi (giao diện) |
| Cài đặt → Chung    | Khả năng hiển thị thanh bên | Hiển thị/ẩn các phần của thanh bên     |

Các cài đặt này được lưu trong cơ sở dữ liệu và duy trì qua các lần khởi động lại, đồng thời ghi đè các giá trị mặc định của biến môi trường khi được thiết lập.

### Chạy cục bộ

```bash
# Chế độ phát triển (tự động tải lại)
npm run dev

# Bản dựng production
npm run build    # next build → .build/next/ rồi assembleStandalone → dist/
npm run start

# Biên dịch nhanh chỉ dành cho backend/API đối với các thay đổi của người đóng góp
npm run build:contributor

# Bản dựng phát hành (dựng lại từ đầu + dấu kiểm tra HEAD — bắt buộc để triển khai)
npm run build:release   # rm -rf .build dist && build + ghi dist/BUILD_SHA

# Cấu hình cổng thường dùng
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Bản dựng dành cho người đóng góp chỉ thực hiện xác thực biên dịch: nó không đóng gói bản phân phối độc lập
hoặc dựng các tài nguyên đóng gói native tùy chọn. Hãy sử dụng bản dựng production thông thường khi
bạn cần xác thực gói có thể phát hành.

### Bố cục đầu ra bản dựng

| Thư mục   | Nội dung                                                                          | Được theo dõi |
| --------- | --------------------------------------------------------------------------------- | ------------- |
| `src/`    | Mã nguồn ứng dụng (TypeScript / TSX)                                              | Có            |
| `.build/` | Tệp trung gian — đầu ra của `next build` (bị git bỏ qua, `distDir = .build/next`) | Không         |
| `dist/`   | Gói có thể phát hành — được tạo bởi `assembleStandalone` (bị git bỏ qua)          | Không         |

Quy trình dựng chỉ gồm một lượt:

```
npm run build
  └─ next build → .build/next/standalone  (đầu ra Next.js)
  └─ assembleStandalone()                 (sao chép bản độc lập + tệp tĩnh + public + tài nguyên native)
       └─ đầu ra: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` còn dọn sạch cả hai thư mục trước tiên và ghi
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) làm dấu kiểm tra tính toàn vẹn khi triển khai.

`npm run build:contributor` sử dụng cấu hình dựng chỉ dành cho backend. Nó tạm thời thay thế
các tệp giao diện bảng điều khiển bằng tệp giả trong khi dựng, giữ nguyên các trình xử lý tuyến API và khôi phục các tệp gốc
sau khi dựng. Hãy sử dụng `npm run build` cho những thay đổi ảnh hưởng đến giao diện bảng điều khiển hoặc để
xác thực đầy đủ bản phát hành; cấu hình dành cho người đóng góp không thay thế cho bản dựng phát hành.

> **Lưu ý khi triển khai VPS:** thư mục image từ xa `/usr/lib/node_modules/omniroute/app/`
> không thay đổi. Các kỹ năng triển khai dùng rsync để đồng bộ nội dung của `dist/` vào thư mục đó.
> Chỉ đường dẫn đầu ra bản dựng trong kho lưu trữ thay đổi (`app/` → `dist/`).

Các URL mặc định:

- **Bảng điều khiển**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Quy trình làm việc với Git

> ⚠️ **KHÔNG BAO GIỜ commit trực tiếp vào `main`.** Luôn sử dụng các nhánh tính năng.
>
> **Nhánh cơ sở của PR:** nhắm đến nhánh `release/vX.Y.Z` đang hoạt động (không phải `main`). Xem
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) để biết mô hình
> mỗi bản phát hành một nhánh + gắn thẻ khi phát hành.

```bash
# Tạo nhánh từ đầu nhánh phát hành đang hoạt động (ví dụ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... thực hiện thay đổi ...
git commit -m "feat: mô tả thay đổi của bạn"
git push -u origin feat/your-feature-name
# Mở Pull Request với base = release/v3.8.49
```

### Quy tắc đặt tên nhánh

| Tiền tố     | Mục đích                        |
| ----------- | ------------------------------- |
| `feat/`     | Tính năng mới                   |
| `fix/`      | Sửa lỗi                         |
| `refactor/` | Tái cấu trúc mã nguồn           |
| `docs/`     | Thay đổi tài liệu               |
| `test/`     | Bổ sung/sửa kiểm thử            |
| `chore/`    | Công cụ, CI, các phần phụ thuộc |

### Thông điệp commit

Tuân theo [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: thêm circuit breaker cho các lệnh gọi đến nhà cung cấp
fix: xử lý trường hợp biên khi xác thực JWT secret
docs: cập nhật SECURITY.md với biện pháp bảo vệ PII
test: thêm các kiểm thử đơn vị về khả năng quan sát
refactor(db): hợp nhất các bảng giới hạn tốc độ
```

Phạm vi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Chạy kiểm thử

```bash
# Tất cả kiểm thử (unit + vitest + ecosystem + e2e)
npm run test:all

# Một tệp kiểm thử duy nhất (trình chạy kiểm thử gốc của Node.js — hầu hết kiểm thử sử dụng cách này)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Chỉ các kiểm thử đơn vị bị ảnh hưởng bởi thay đổi của bạn (cùng bộ chọn TIA như cổng CI, #8084)
npm run test:scoped            # các thay đổi trong commit gần nhất (hoặc cây làm việc)
npm run test:scoped:staged     # chỉ các thay đổi đã staged — phù hợp để chạy cùng pre-commit
npm run test:scoped:full       # xây dựng lại ánh xạ đồ thị nhập trước (sau khi thêm/di chuyển tệp)
# Mã thoát 1 + "run the full suite" có nghĩa là một tệp trung tâm (tsconfig, package.json, …) hoặc
# nguồn chưa được ánh xạ đã thay đổi — bộ chọn chuyển sang chế độ an toàn, không bao giờ âm thầm bỏ qua.

# Vitest (máy chủ MCP, autoCombo, bộ nhớ đệm)
npm run test:vitest

# Kiểm thử E2E (yêu cầu Playwright)
npm run test:e2e

# E2E cho các máy khách giao thức (phương thức truyền tải MCP, A2A)
npm run test:protocols:e2e

# Kiểm thử khả năng tương thích hệ sinh thái
npm run test:ecosystem

# Ngưỡng độ bao phủ: 60% câu lệnh/dòng/hàm/nhánh
npm run test:coverage
npm run coverage:report

# Kiểm tra lint + định dạng
npm run lint
npm run check

# Kiểm thử nhanh tổ hợp thực tế có kiểm soát với upstream (yêu cầu quyền truy cập VPS + tín dụng nhà cung cấp thực)
# Gọi các nhà cung cấp THỰC — tốn một ít chi phí. KHÔNG BAO GIỜ chạy trong CI. Bỏ qua an toàn nếu không có cổng kiểm soát.
# Yêu cầu: quyền truy cập ssh root@192.168.0.15 (nạp ảnh chụp nhanh DB chỉ đọc từ VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Kiểm thử nhanh trực tiếp VPS giai đoạn 3 — các tập lệnh Node ESM thuần túy, gọi trực tiếp máy chủ .15 đang hoạt động.
# Yêu cầu: quyền truy cập ssh root@192.168.0.15 (các tổ hợp được tạo/xóa qua SSH sqlite).
# Gọi các nhà cung cấp THỰC (chi phí nhỏ). Chỉ tạo/xóa các tổ hợp __live_test__*. KHÔNG BAO GIỜ chạy trong CI.
# REQUIRE_API_KEY=false trên .15 nên không cần khóa API, nhưng vẫn tuân theo COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY nếu được đặt.
npm run test:combo:live:vps              # 7 kịch bản HTTP (ưu tiên/luân phiên/có trọng số/chi phí/hợp nhất/tự động + trạng thái)
npm run test:combo:live:vps:failover     # thêm một kịch bản chuyển đổi dự phòng thực giữa các nhà cung cấp (tổng cộng 8)
```

Ghi chú về độ bao phủ:

- `npm run test:coverage` đo độ bao phủ mã nguồn cho bộ kiểm thử đơn vị chính, loại trừ `tests/**` và bao gồm `open-sse/**`
- Các pull request phải duy trì ngưỡng độ bao phủ ở mức **60%+** đối với câu lệnh/dòng/hàm/nhánh
- Nếu một PR thay đổi mã production trong `src/`, `open-sse/`, `electron/` hoặc `bin/`, PR đó phải thêm hoặc cập nhật các kiểm thử tự động trong cùng PR
- `npm run coverage:report` in báo cáo chi tiết theo từng tệp từ lần chạy độ bao phủ gần nhất
- `npm run test:coverage:legacy` giữ lại chỉ số cũ để so sánh theo lịch sử
- Xem `docs/ops/COVERAGE_PLAN.md` để biết lộ trình cải thiện độ bao phủ theo từng giai đoạn

### Yêu cầu đối với Pull Request

Trước khi mở một PR, hãy sử dụng
[Quy trình chuẩn để đóng góp](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) để chạy vòng lặp tập trung cho
những gì bạn đã thay đổi. Toàn bộ bộ kiểm thử đơn vị (4 phân đoạn CI), Vitest, ngưỡng độ bao phủ **60%+** và
bản dựng production thuộc trách nhiệm của CI — việc chạy chúng cục bộ không cung cấp thêm tín hiệu nào ngoài
những gì các bước kiểm tra PR đã cung cấp, đồng thời trên các máy cấu hình thấp hơn, việc này có thể làm quá tải máy chủ (#8084):

- Chạy các tệp kiểm thử bao phủ thay đổi của bạn: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Chạy `npm run lint`
- Thêm hoặc cập nhật các kiểm thử tự động trong cùng PR bất cứ khi nào mã production thay đổi
- Liệt kê các tệp kiểm thử đã thay đổi hoặc được thêm vào trong phần mô tả PR khi mã production thay đổi
- Kiểm tra kết quả SonarQube trên PR khi các secret của dự án được cấu hình trong CI

Trạng thái kiểm thử hiện tại: **122 tệp kiểm thử đơn vị** bao phủ:

- Các trình chuyển đổi nhà cung cấp và chuyển đổi định dạng
- Giới hạn tốc độ, bộ ngắt mạch và khả năng phục hồi
- Bộ nhớ đệm ngữ nghĩa, tính lũy đẳng, theo dõi tiến độ
- Các thao tác cơ sở dữ liệu và schema (21 mô-đun DB)
- Các luồng OAuth và xác thực
- Xác thực endpoint API (Zod v4)
- Các công cụ máy chủ MCP và thực thi phạm vi
- Các hệ thống Memory và Skills

---

## Phong cách mã nguồn

- **ESLint** — Chạy `npm run lint` trước khi commit
- **Prettier** — Tự động định dạng qua `lint-staged` khi commit (thụt lề 2 khoảng trắng, dấu chấm phẩy, dấu ngoặc kép, độ rộng 100 ký tự, dấu phẩy cuối theo es5)
- **TypeScript** — Toàn bộ mã trong `src/` sử dụng `.ts`/`.tsx`; `open-sse/` sử dụng `.ts`/`.js`; viết tài liệu bằng TSDoc (`@param`, `@returns`, `@throws`)
- **Không dùng `eval()`** — ESLint áp dụng các quy tắc `no-eval`, `no-implied-eval`, `no-new-func`
- **Xác thực bằng Zod** — Sử dụng schema Zod v4 để xác thực toàn bộ đầu vào API
- **Quy tắc đặt tên**: Tệp = camelCase/kebab-case, component = PascalCase, hằng số = UPPER_SNAKE

### Xử lý lỗi / khối catch rỗng

Không bao giờ để một `catch` mà không giải thích. Hãy phân loại nó vào một trong hai nhóm (cụ thể hóa
quy tắc nghiêm ngặt "không bao giờ âm thầm bỏ qua lỗi trong luồng SSE"):

- **Có chủ đích (hoạt động dọn dẹp/đo từ xa theo nỗ lực tối đa của chính chúng ta)** — lỗi ở đây là điều được dự kiến và
  vô hại; thêm một dòng chú thích nêu lý do, không ghi log (quy ước này nhằm tránh việc ghi log cho mọi
  request gây nhiễu).

  ```ts
  } catch {} // việc đóng một controller đã đóng sau khi client ngắt kết nối là điều được dự kiến
  ```

- **Nên ghi log (mã bên ngoài/do bên gọi cung cấp, hoặc việc bỏ qua làm thay đổi luồng điều khiển)** — giữ lại
  catch (không bao giờ để nó làm gián đoạn luồng) nhưng phát ra `console.debug`/`warn` có ngữ cảnh để
  lỗi có thể được phát hiện.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Xem `open-sse/utils/stream.ts` và `open-sse/utils/streamHandler.ts` để biết các ví dụ đã áp dụng.

---

## Cấu trúc dự án

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # App Router của Next.js 16
│   ├── (dashboard)/        # Các trang bảng điều khiển (23 phần)
│   ├── api/                # Các tuyến API (51 thư mục)
│   └── login/              # Các trang xác thực (.tsx)
├── domain/                 # Công cụ chính sách (policyEngine, comboResolver, costRules, v.v.)
├── lib/                    # Logic nghiệp vụ cốt lõi (.ts)
│   ├── a2a/                # Máy chủ giao thức Agent-to-Agent v0.3
│   ├── acp/                # Sổ đăng ký Agent Communication Protocol
│   ├── compliance/         # Công cụ chính sách tuân thủ
│   ├── db/                 # Các mô-đun miền SQLite + 130 bản di chuyển
│   ├── memory/             # Bộ nhớ hội thoại liên tục
│   ├── oauth/              # Các nhà cung cấp, dịch vụ và tiện ích OAuth
│   ├── skills/             # Khung kỹ năng có thể mở rộng
│   ├── usage/              # Theo dõi mức sử dụng và tính toán chi phí
│   └── localDb.ts          # Chỉ là lớp tái xuất — tuyệt đối không thêm logic tại đây
├── middleware/              # Phần mềm trung gian xử lý yêu cầu (promptInjectionGuard)
├── mitm/                   # Proxy MITM (chứng chỉ, DNS, định tuyến đích)
├── shared/
│   ├── components/         # Các thành phần React (.tsx)
│   ├── constants/          # Định nghĩa nhà cung cấp (329), phạm vi MCP, 21 chiến lược định tuyến
│   ├── utils/              # Bộ ngắt mạch, trình làm sạch, trình trợ giúp xác thực
│   └── validation/         # Các lược đồ Zod v4
└── sse/                    # Quy trình proxy SSE

open-sse/                   # Không gian làm việc @omniroute/open-sse
├── executors/              # 150 mô-đun thực thi (các lớp thực thi + trình trợ giúp cho từng nhà cung cấp)
├── handlers/               # 11 trình xử lý yêu cầu (trò chuyện, phản hồi, nhúng, hình ảnh, v.v.)
├── mcp-server/             # Máy chủ MCP (110 công cụ độc nhất, 3 phương thức truyền tải, 33 phạm vi)
├── services/               # 178 dịch vụ cấp cao nhất (combo, autoCombo, rateLimitManager, v.v.)
├── translator/             # Trình chuyển đổi định dạng (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Trình chuyển đổi Responses API
└── utils/                  # 22 mô-đun tiện ích (luồng, TLS, proxy, ghi nhật ký)

electron/                   # Ứng dụng máy tính Electron (đa nền tảng)

tests/
├── unit/                   # Trình chạy kiểm thử Node.js (1.574 tệp kiểm thử)
├── integration/            # Kiểm thử tích hợp
├── e2e/                    # Kiểm thử Playwright
├── security/               # Kiểm thử bảo mật
├── translator/             # Kiểm thử dành riêng cho trình chuyển đổi
└── load/                   # Kiểm thử tải

docs/
├── adr/                     # Hồ sơ quyết định kiến trúc
├── architecture/            # Kiến trúc hệ thống và khả năng phục hồi
├── comparison/              # OmniRoute so với các giải pháp thay thế
├── compression/             # Hướng dẫn và quy tắc nén
├── dev/                     # Hướng dẫn phát triển
├── diagrams/                # Sơ đồ kiến trúc
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Hướng dẫn người dùng, Docker, thiết lập, khắc phục sự cố
├── i18n/                    # Các bản dịch README được quốc tế hóa
├── marketing/               # Tài liệu tiếp thị
├── ops/                     # Triển khai, proxy, độ bao phủ, bản phát hành
├── providers/               # Tài liệu dành riêng cho nhà cung cấp
├── reference/               # Tài liệu tham khảo API, biến môi trường, công cụ CLI, gói miễn phí
├── releases/                # Ghi chú phát hành
├── routing/                 # Công cụ tổ hợp tự động, phát lại quá trình suy luận
├── screenshots/             # Ảnh chụp màn hình bảng điều khiển
├── security/                # Rào chắn bảo vệ, tuân thủ, chế độ ẩn, token
└── specs/                   # Đặc tả thiết kế
```

---

## Thêm Nhà cung cấp Mới

### Bước 1: Đăng ký các Hằng số của Nhà cung cấp

Thêm vào `src/shared/constants/providers.ts` — được Zod xác thực khi mô-đun tải.

### Bước 2: Thêm Executor (nếu cần logic tùy chỉnh)

Tạo executor trong `open-sse/executors/your-provider.ts`, kế thừa executor cơ sở.

### Bước 3: Thêm Translator (nếu không dùng định dạng OpenAI)

Tạo các translator cho yêu cầu/phản hồi trong `open-sse/translator/`.

### Bước 4: Thêm Cấu hình OAuth (nếu dựa trên OAuth)

Thêm thông tin xác thực OAuth trong `src/lib/oauth/constants/oauth.ts` và dịch vụ trong `src/lib/oauth/services/`.

Nếu nhà cung cấp thượng nguồn phân phối OAuth client_id/secret công khai hoặc khóa Firebase Web API bên trong CLI / gói trình duyệt công khai của họ, **không** nhúng dưới dạng chuỗi ký tự. Sử dụng `resolvePublicCred()` từ `open-sse/utils/publicCreds.ts` và thêm một mục byte đã che vào `EMBEDDED_DEFAULTS`. Quy trình bắt buộc đầy đủ được ghi lại trong [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Bên trong các handler/executor, thông báo lỗi gửi đến máy khách phải đi qua `buildErrorBody()` / `sanitizeErrorMessage()` từ `open-sse/utils/error.ts` — tuyệt đối không đưa trực tiếp `err.stack` hoặc `err.message` vào phần thân Response. Xem [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Bước 5: Đăng ký các Mô hình

Thêm định nghĩa mô hình trong `open-sse/config/providerRegistry.ts`.

### Bước 6: Thêm Kiểm thử

Viết các kiểm thử đơn vị trong `tests/unit/`, tối thiểu bao gồm:

- Đăng ký nhà cung cấp
- Chuyển đổi yêu cầu/phản hồi
- Xử lý lỗi

---

## Danh sách kiểm tra Pull Request

- [ ] Các bài kiểm thử đều đạt (`npm test`)
- [ ] Kiểm tra lint đạt (`npm run lint`)
- [ ] Build thành công (`npm run build`)
- [ ] Đã thêm kiểu TypeScript cho các hàm và interface công khai mới
- [ ] Không có secret hoặc giá trị dự phòng được hardcode
- [ ] Thông tin xác thực upstream công khai được nhúng qua `resolvePublicCred()` (xem [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), tuyệt đối không dùng giá trị literal
- [ ] Các phản hồi lỗi được xử lý qua `buildErrorBody()` / `sanitizeErrorMessage()` — không đưa stack trace thô vào nội dung phản hồi (xem [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Các lệnh shell (`exec` / `spawn`) truyền giá trị tại thời điểm chạy qua `env`, không dùng phép nội suy chuỗi
- [ ] Tất cả đầu vào đều được xác thực bằng schema Zod
- [ ] Đã thêm **fragment** changelog vào `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` đối với các thay đổi ảnh hưởng đến người dùng (xem [`changelog.d/README.md`](./changelog.d/README.md)) — **không** chỉnh sửa trực tiếp `CHANGELOG.md`; các fragment được tổng hợp khi phát hành và không bao giờ gây xung đột giữa các PR
- [ ] Đã cập nhật tài liệu (nếu áp dụng)
- [ ] Không phát sinh cảnh báo CodeQL / Secret-Scanning mới, hoặc mỗi cảnh báo đều đã được loại bỏ kèm giải thích kỹ thuật có tham chiếu đến tài liệu liên quan trong `docs/security/`
- [ ] Các route khởi chạy tiến trình con (`/api/mcp/`, `/api/cli-tools/runtime/`) được phân loại là `isLocalOnlyPath()` trong `src/server/authz/routeGuard.ts` — xem [Quy tắc bắt buộc #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Không có trailer `Co-authored-by` của AI/bot trong thông điệp commit (Quy tắc bắt buộc #16) — các cộng tác viên là con người có công việc được tái sử dụng phải được ghi nhận bằng trailer `Co-authored-by: Name <email>` tiêu chuẩn

---

## Phát hành

Các bản phát hành được quản lý thông qua quy trình làm việc `/generate-release`. Khi một GitHub Release mới được tạo, package sẽ được **tự động xuất bản lên npm** thông qua GitHub Actions.

Để triển khai lên VPS, hãy sử dụng `npm run build:release` (không dùng `npm run build`) — lệnh này thực hiện build lại từ đầu, tập hợp bundle vào `dist/` và ghi tệp đánh dấu `dist/BUILD_SHA`.
Sau đó, hãy sử dụng các skill `/deploy-vps-*-cc` để đồng bộ `dist/` bằng rsync tới thư mục `app/` trên máy chủ từ xa.

---

## Nhận trợ giúp

- **Kiến trúc**: Xem [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Tài liệu tham khảo API**: Xem [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Tài liệu bảo mật**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Tài liệu vận hành**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Vấn đề**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
