# 📖 Setup Guide — OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Tài liệu tham khảo thiết lập đầy đủ cho OmniRoute. Để xem phiên bản nhanh, hãy tham khảo [Khởi động nhanh trong README](../README.md#-quick-start).

## Mục lục

- [Phương thức cài đặt](#install-methods)
- [Cấu hình công cụ CLI](#cli-tool-configuration)
- [Thiết lập giao thức (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Cấu hình thời gian chờ](#timeout-configuration)
- [Chế độ chia tách cổng](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Gỡ cài đặt](#uninstalling)

---

## Phương thức cài đặt

### npm (khuyến nghị)

```bash
npm install -g omniroute
omniroute
```

Bảng điều khiển sẽ mở tại `http://localhost:20128` và URL cơ sở của API là `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Người dùng pnpm:** cờ `--allow-build` là bắt buộc để bật các tập lệnh build gốc cho `better-sqlite3` và `@swc/core`. Lệnh `pnpm approve-builds -g` không được hỗ trợ cho các bản cài đặt toàn cục trên pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Gói AUR](https://aur.archlinux.org/packages/omniroute-bin) cài đặt OmniRoute và cung cấp một dịch vụ người dùng systemd.

### Từ mã nguồn

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Lưu ý dành cho Windows:** Theo mặc định, OmniRoute sử dụng `%APPDATA%\omniroute` khi thư mục cũ `%USERPROFILE%\.omniroute` không tồn tại. Đặt `DATA_DIR` để chọn một vị trí thư mục dữ liệu khác.

> **Lưu ý:** `npm install` tự động tạo `.env` từ `.env.example` trong lần chạy đầu tiên. Các lần cài đặt tiếp theo sẽ không ghi đè lên `.env` hiện có, vì vậy các tùy chỉnh sẽ được giữ nguyên. Để khởi tạo lại, hãy xóa `.env` trước khi chạy lại.

### Docker

Xem [Hướng dẫn Docker](./DOCKER_GUIDE.md) để biết cách thiết lập Docker đầy đủ, bao gồm các cấu hình Compose và Caddy HTTPS.

### Ứng dụng máy tính (Electron)

OmniRoute đi kèm một trình bao ứng dụng máy tính được xây dựng trên Electron 41 + electron-builder 26.10. Các tập lệnh khả dụng (thư mục gốc của workspace):

```bash
npm run electron:dev          # Chạy ứng dụng máy tính với tính năng tải lại nóng
npm run electron:build        # Build cho hệ điều hành hiện tại (được tự động phát hiện)
npm run electron:build:win    # Trình cài đặt Windows (NSIS + bản portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Kiểm thử nhanh bản build đã đóng gói
```

Các bản phát hành của trình cài đặt ứng dụng máy tính được đính kèm vào GitHub Releases. Để tìm hiểu chuyên sâu đầy đủ về Electron (ký mã, cầu nối IPC, các bản phân phối), hãy xem [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(được tạo ở giai đoạn sau)_.

### Máy chủ không giao diện (CI/tự động hóa)

Đối với các thiết lập không cần giám sát (Docker, Kubernetes, CI), hãy sử dụng:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Kết hợp với các biến môi trường (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, v.v.), cách này cho phép bạn khởi chạy một phiên bản OmniRoute có thể được tự động hóa hoàn toàn bằng tập lệnh.

### Tùy chọn CLI

| Lệnh                    | Mô tả                                                                     |
| ----------------------- | ------------------------------------------------------------------------- |
| `omniroute`             | Khởi động máy chủ (`PORT=20128`, API và bảng điều khiển trên cùng cổng)   |
| `omniroute setup`       | Quy trình CLI có hướng dẫn để thiết lập mật khẩu và nhà cung cấp đầu tiên |
| `omniroute doctor`      | Chạy kiểm tra tình trạng cục bộ mà không khởi động máy chủ                |
| `omniroute providers`   | Khám phá, liệt kê, xác thực và kiểm thử nhà cung cấp từ CLI               |
| `omniroute config`      | Cấu hình công cụ CLI — liệt kê, lấy, đặt và xác thực cấu hình             |
| `omniroute status`      | Bảng điều khiển trạng thái ngoại tuyến — phiên bản, DB, công cụ, cấu hình |
| `omniroute logs`        | Truyền phát nhật ký sử dụng từ API (hỗ trợ `--follow`)                    |
| `omniroute update`      | Kiểm tra hoặc áp dụng các bản cập nhật OmniRoute                          |
| `omniroute provider`    | Quản lý kết nối nhà cung cấp — thêm, liệt kê, xóa, kiểm thử, đặt mặc định |
| `omniroute --port 3000` | Đặt cổng chuẩn/API thành 3000                                             |
| `omniroute --mcp`       | Khởi động máy chủ MCP (giao thức truyền tải stdio)                        |
| `omniroute --no-open`   | Không tự động mở trình duyệt                                              |
| `omniroute --help`      | Hiển thị trợ giúp                                                         |

Thiết lập không giao diện có thể được tự động hóa bằng các cờ hoặc biến môi trường:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Chạy chẩn đoán cục bộ mà không mở bảng điều khiển:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Quản lý nhà cung cấp qua SSH hoặc tập lệnh mà không cần mở bảng điều khiển:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## Cấu hình công cụ CLI

### 1) Kết nối nhà cung cấp và tạo khóa API

1. Mở Dashboard → `Providers` và kết nối ít nhất một nhà cung cấp (OAuth hoặc khóa API).
2. Mở Dashboard → `Endpoints` và tạo một khóa API.
3. (Tùy chọn) Mở Dashboard → `Combos` và thiết lập chuỗi dự phòng.

### 2) Trỏ công cụ lập trình của bạn đến dịch vụ

```txt
URL cơ sở: http://localhost:20128/v1
Khóa API:   [sao chép từ trang Endpoint]
Mô hình:    if/qwen3.8-max-preview (hoặc bất kỳ tiền tố nhà cung cấp/mô hình nào)
```

Nếu trình soạn thảo của bạn không thể gửi `Authorization: Bearer ...`, hãy sử dụng URL cơ sở tương thích có chứa token:

```txt
URL cơ sở: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL mô hình: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL trò chuyện: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL thẻ Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Hoạt động với Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode và các SDK tương thích với OpenAI.

#### Tự động cấu hình bằng `setup-*`

Thay vì dán URL cơ sở và khóa theo cách thủ công, hãy để OmniRoute ghi cấu hình riêng của từng công cụ từ danh mục mô hình trực tiếp. Mỗi công cụ dùng một lệnh:

```bash
omniroute setup-codex        # Các hồ sơ ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (tương thích với OpenAI)
omniroute setup-cline        # Cài đặt Cline CLI + tiện ích mở rộng VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # In ra các bước thực hiện trong ứng dụng Cursor
omniroute setup-roo          # Tệp nhập Roo Code + con trỏ autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Mỗi lệnh chấp nhận `--remote <url> --api-key <key>` để cấu hình một công cụ cục bộ dùng với OmniRoute **từ xa**, cùng với `--dry-run` để xem trước. Để khởi chạy CLI với các biến môi trường thích hợp được chèn vào mà hoàn toàn không ghi cấu hình, hãy sử dụng trình khởi chạy chung `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); các trình khởi chạy cũ dành riêng cho từng công cụ là `omniroute launch` (Claude Code) và `omniroute launch-codex` (Codex) vẫn khả dụng.

Để xem bảng đầy đủ (nội dung được ghi bởi từng lệnh, mọi cờ, chế độ cục bộ so với từ xa, quy ước `/v1` của URL cơ sở), hãy xem **[Tích hợp CLI](./CLI-INTEGRATIONS.md)**.

Để biết cấu hình chi tiết cho từng công cụ (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot và nhiều công cụ khác), hãy xem **[Hướng dẫn công cụ CLI](../reference/CLI-TOOLS.md)** chuyên biệt.

---

## Thiết lập giao thức (MCP + A2A)

### Thiết lập MCP (Model Context Protocol)

Khởi động giao thức truyền tải MCP ở chế độ stdio:

```bash
omniroute --mcp
```

Quy trình xác thực được khuyến nghị:

```bash
# 1. Khởi động máy chủ MCP
omniroute --mcp

# 2. Từ máy khách MCP của bạn, gọi:
omniroute_get_health        # Sẽ trả về tình trạng hệ thống
omniroute_list_combos       # Sẽ trả về các combo đang hoạt động

# 3. Hoặc chạy toàn bộ bộ kiểm thử E2E:
npm run test:protocols:e2e
```

#### Cấu hình máy khách MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Thêm vào phần cài đặt MCP của bạn:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**Tài liệu MCP đầy đủ:** [README máy chủ MCP](../../open-sse/mcp-server/README.md) — 110 công cụ, cấu hình IDE, máy khách Python/TS/Go.

### Thiết lập A2A (Agent-to-Agent Protocol)

Xác minh Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Gửi một tác vụ:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Tài liệu A2A đầy đủ:** [README máy chủ A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, kỹ năng, truyền trực tuyến, vòng đời tác vụ.

---

## Cấu hình thời gian chờ

### Thời gian chờ cơ bản

Đối với hầu hết các triển khai, bạn chỉ cần hai biến sau:

| Biến                     | Mặc định                     | Mục đích                                                                                                                                                                         |
| ------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                     | Mốc cơ sở dùng chung cho thời gian chờ bắt đầu phản hồi từ upstream, các thời gian chờ ẩn của Undici, yêu cầu lấy dấu vân tay TLS và thời gian chờ yêu cầu/proxy của cầu nối API |
| `STREAM_IDLE_TIMEOUT_MS` | kế thừa `REQUEST_TIMEOUT_MS` | Khoảng thời gian tối đa giữa các khối dữ liệu truyền phát trước khi OmniRoute hủy luồng SSE                                                                                      |

Khả năng tương thích ngược vẫn được duy trì: các biến `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` hiện có và các biến thời gian chờ khác theo từng lớp vẫn hoạt động và ghi đè mốc cơ sở dùng chung.

### Lưu ý dành riêng cho nhà cung cấp

Đối với các upstream tương thích với Claude Code (`anthropic-compatible-cc-*`), OmniRoute suy ra header `X-Stainless-Timeout` gửi đi từ thời gian chờ fetch đã được phân giải để thời gian chờ đọc phía nhà cung cấp luôn đồng bộ với cấu hình môi trường của bạn.

Đối với các reverse proxy tương thích với Claude Code của bên thứ ba, OmniRoute duy trì tập `anthropic-beta` mặc định ở mức thận trọng và khi `Client Cache Control` được để ở chế độ `Auto`, chỉ chuyển tiếp các dấu `cache_control` do client cung cấp. Chỉ bật tùy chọn "Enable redact-thinking beta" cho từng kết nối khi upstream yêu cầu cụ thể các luồng suy luận Claude đã được ẩn.

### Ghi đè thời gian chờ nâng cao

| Biến                                     | Mặc định                                   | Mục đích                                                                                    |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | kế thừa `REQUEST_TIMEOUT_MS`               | Thời gian chờ bắt đầu phản hồi từ upstream, được dùng cho đến khi nhận được header phản hồi |
| `FETCH_HEADERS_TIMEOUT_MS`               | kế thừa `FETCH_TIMEOUT_MS`                 | Giới hạn thời gian Undici chờ nhận header phản hồi từ upstream                              |
| `FETCH_BODY_TIMEOUT_MS`                  | kế thừa `FETCH_TIMEOUT_MS`                 | Giới hạn thời gian Undici giữa các khối nội dung từ upstream (`0` sẽ vô hiệu hóa)           |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Thời gian chờ kết nối TCP của Undici                                                        |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Thời gian chờ socket keep-alive nhàn rỗi của Undici                                         |
| `TLS_CLIENT_TIMEOUT_MS`                  | kế thừa `FETCH_TIMEOUT_MS`                 | Thời gian chờ cho các yêu cầu lấy dấu vân tay TLS được thực hiện qua `wreq-js`              |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | kế thừa `REQUEST_TIMEOUT_MS` hoặc `600000` | Thời gian chờ chuyển tiếp proxy `/v1` từ cổng API đến cổng dashboard                        |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Thời gian chờ yêu cầu đến trên máy chủ cầu nối API                                          |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Thời gian chờ header đến trên máy chủ cầu nối API                                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Thời gian chờ keep-alive trên máy chủ cầu nối API                                           |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Thời gian chờ khi socket không hoạt động trên máy chủ cầu nối API (`0` sẽ vô hiệu hóa)      |

> **Lưu ý:** Đối với các yêu cầu truyền phát, `FETCH_TIMEOUT_MS` chỉ bao gồm quá trình thiết lập kết nối / chờ phản hồi đầu tiên từ upstream. Sau khi luồng hoạt động, OmniRoute sẽ chỉ hủy khi thực sự bị đình trệ (`STREAM_IDLE_TIMEOUT_MS`) hoặc khi nội dung Undici không hoạt động (`FETCH_BODY_TIMEOUT_MS`).

### Khả năng tương thích với reverse proxy

Nếu bạn chạy OmniRoute phía sau Nginx, Caddy, Cloudflare hoặc một reverse proxy khác, hãy đảm bảo thời gian chờ của proxy cũng cao hơn thời gian chờ luồng/fetch của OmniRoute.

---

## Chế độ chia cổng

Chạy API và Dashboard trên các cổng riêng biệt cho các tình huống nâng cao (reverse proxy, mạng container):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Mẫu Void Linux (xbps-src)

Đối với người dùng Void Linux, bạn có thể tạo một gói native bằng `xbps-src`. Lưu khối này dưới dạng `srcpkgs/omniroute/template`:

```bash
# Tệp mẫu cho 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Tạo lại checksum cho mỗi bản phát hành bằng:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## Gỡ cài đặt

| Lệnh                     | Hành động                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Xóa ứng dụng khỏi hệ thống nhưng **giữ lại DB và các cấu hình của bạn** trong `~/.omniroute`. |
| `npm run uninstall:full` | Xóa ứng dụng VÀ **xóa vĩnh viễn toàn bộ cấu hình, khóa và cơ sở dữ liệu**.                    |

> Để xem hướng dẫn gỡ cài đặt chi tiết cho tất cả các phương thức, hãy xem [UNINSTALL.md](./UNINSTALL.md).
