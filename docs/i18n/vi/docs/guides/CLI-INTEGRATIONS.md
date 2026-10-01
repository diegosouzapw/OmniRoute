# CLI Integrations (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute cung cấp một nhóm các lệnh `setup-*` cấu hình một CLI lập trình (Codex, Claude Code, OpenCode, Cline, …) để sử dụng OmniRoute làm backend của nó — nhờ đó công cụ chỉ giao tiếp với **một** điểm cuối và OmniRoute sẽ định tuyến đến nhà cung cấp phù hợp với tính năng tự động dự phòng. Mỗi lệnh đọc danh mục mô hình **trực tiếp** từ một OmniRoute đang chạy (cục bộ hoặc từ xa) và ghi tệp cấu hình riêng của công cụ vào máy **của bạn**. Khóa API được tham chiếu bởi một biến môi trường ở bất cứ đâu công cụ hỗ trợ nó. Các lệnh lưu trữ tệp môi trường cục bộ của công cụ được ghi chú bên dưới.

Ngoài ra còn có một trình khởi chạy chung — `omniroute run <target>` — khởi tạo `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` hoặc `gemini` với các biến môi trường phù hợp được đưa vào, mà không cần ghi bất kỳ cấu hình nào. Các mục tiêu và bí danh của chúng đến từ manifest chuẩn `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), và `omniroute completion` cung cấp các từ khóa mục tiêu tương tự được lấy từ manifest. Các trình khởi chạy cũ theo công cụ — `omniroute launch` (Claude Code) và `omniroute launch-codex` (Codex) — vẫn khả dụng.

Quy trình tích hợp nhà cung cấp có sẵn từ cùng một ngữ cảnh cục bộ/từ xa. Các lệnh ưu tiên API dưới đây giữ xác thực quản lý tách biệt khỏi thông tin xác thực của nhà cung cấp và không bao giờ in thông tin xác thực trong đầu ra có cấu trúc:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Đối với các script, hãy ưu tiên `--credential-stdin` hoặc `--credential-env`; `--credential` được giữ lại để sử dụng cục bộ có kiểm soát. Lệnh `providers remove` yêu cầu `--yes` trên một terminal không tương tác, và cả năm lệnh đều tuân thủ ngữ cảnh hoạt động hoặc các tùy chọn `--base-url`/`--api-key` toàn cục.

Bộ chọn nhà cung cấp từ chối các tiền tố ID, tên hoặc tên nhà cung cấp không rõ ràng; hãy sử dụng ID kết nối đầy đủ khi có nhiều kết nối trùng khớp. Các lệnh tạo và chỉnh sửa đọc lại kết nối đã lưu, và việc xóa sẽ xác minh rằng nó không còn có thể đọc được. Một thao tác nhập sẽ bỏ qua cặp nhà cung cấp/tên đã tồn tại. Các mục đã nhập không thể ghi đè điểm cuối quản lý, ngữ cảnh hoặc thông tin xác thực quản lý được cung cấp cho CLI.

Để thiết lập cơ bản một lần, thủ công cho hai tích hợp phong phú nhất, hãy xem các bài tìm hiểu chuyên sâu theo công cụ:

- [Cấu hình Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Cấu hình Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Chế độ Từ xa](./REMOTE-MODE.md) — điều khiển một OmniRoute từ xa (VPS / Tailnet) từ máy tính xách tay của bạn
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — tiện ích mở rộng OmniCopilot; nó cũng có thể chạy các lệnh `setup-*` này cho bạn từ bên trong trình chỉnh sửa

---

## Bảng tổng hợp

Mọi lệnh đều tuân theo **ngữ cảnh đang hoạt động** (được thiết lập bằng `omniroute connect`, xem
[Chế độ từ xa](./REMOTE-MODE.md)) hoặc các cờ tường minh `--remote <url> --api-key <key>`.
“Cục bộ so với từ xa” bên dưới có nghĩa là: khi không có cờ, lệnh nhắm đến `http://localhost:20128`;
với `--remote` (hoặc một ngữ cảnh từ xa đang hoạt động), lệnh tìm nạp danh mục từ
máy chủ đó và ghi cấu hình cục bộ.

| Lệnh                       | Công cụ                          | Nội dung được ghi                                                                                                                                                                 | Các cờ chính                                                                                                                               | Cục bộ và từ xa |
| -------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                 | `~/.codex/<name>.config.toml` — một hồ sơ cho mỗi mô hình văn bản tương thích (`codex --profile <name>`)                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Cả hai          |
| `omniroute setup-claude`   | Claude Code                      | `~/.claude/profiles/<name>/settings.json` — một hồ sơ cho mỗi mô hình khớp (`CLAUDE_CONFIG_DIR`)                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Cả hai          |
| `omniroute setup-opencode` | OpenCode (tương thích openai)    | `~/.config/opencode/opencode.json` — nhà cung cấp `omniroute` với mọi mô hình trong danh mục (`opencode -m omniroute/<model>`)                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Cả hai          |
| `omniroute setup-cline`    | Cline                            | `~/.cline/data/{globalState,secrets}.json` (chế độ CLI) + in ra các thiết lập tiện ích mở rộng VS Code                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Cả hai          |
| `omniroute setup-kilo`     | Kilo Code                        | `~/.local/share/kilo/auth.json` (CLI) + hợp nhất `kilocode.*` vào `settings.json` của VS Code nếu tệp này tồn tại                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Cả hai          |
| `omniroute setup-continue` | Continue / `cn` CLI              | `~/.continue/config.yaml` — các mô hình `provider: openai`, khóa qua `${{ secrets.OMNIROUTE_API_KEY }}`                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Cả hai          |
| `omniroute setup-cursor`   | Cursor                           | Không ghi gì — in ra các bước thực hiện trong ứng dụng (cấu hình Cursor là SQLite không công khai)                                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | Cả hai          |
| `omniroute setup-roo`      | Roo Code                         | `~/.omniroute/roo-settings.json` (tài liệu nhập) + đặt `roo-cline.autoImportSettingsPath` nếu có `settings.json` của VS Code                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Cả hai          |
| `omniroute setup-crush`    | Crush                            | `~/.config/crush/crush.json` — nhà cung cấp `openai-compat`, khóa qua `$OMNIROUTE_API_KEY`                                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Cả hai          |
| `omniroute setup-goose`    | Goose                            | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + in ra công thức thiết lập môi trường                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Cả hai          |
| `omniroute setup-aider`    | Aider                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + in ra công thức thiết lập môi trường                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Cả hai          |
| `omniroute setup-qwen`     | Qwen Code                        | `~/.qwen/settings.json` — mảng V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` trong `~/.qwen/.env`                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Cả hai          |
| `omniroute setup-5dive`    | 5dive (đội tác nhân)             | Không ghi gì trong `$HOME` — ghi một **hồ sơ xác thực** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) qua `5dive agent auth set`; chỉ dành cho root, chạy trên máy chủ của đội   | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Cả hai          |
| `omniroute run <target>`   | Khởi chạy thời gian chạy (chung) | Không ghi gì — tạo tiến trình `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` với môi trường và đối số phù hợp; Qwen và Gemini sử dụng thư mục chính tạm thời, cô lập | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Cả hai          |
| `omniroute launch`         | Claude Code                      | Không ghi gì — tạo tiến trình `claude` với `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` được chèn vào                                                                              | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Cả hai          |
| `omniroute launch-codex`   | OpenAI Codex CLI                 | Không ghi gì — tạo tiến trình `codex` với nhà cung cấp `omniroute` được chèn qua các cờ `-c`                                                                                      | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Cả hai          |

Lưu ý về các cờ (đã được xác minh trong mã nguồn của lệnh):

- `--remote <url>` — lấy danh mục từ một OmniRoute từ xa (ghi đè `--port`
  và ngữ cảnh đang hoạt động). `--api-key <key>` cung cấp thông tin xác thực cho
  máy chủ đó (mặc định là biến môi trường `OMNIROUTE_API_KEY` hoặc token của ngữ cảnh đang hoạt động).
- `--only <patterns>` — các chuỗi con được phân tách bằng dấu phẩy; chỉ giữ lại những ID mô hình khớp
  (ví dụ: `--only glm,kimi`). Khả dụng trên `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — in chính xác nội dung sẽ được ghi mà không thay đổi
  hệ thống tệp. Khả dụng trên mọi lệnh `setup-*` **ngoại trừ** `setup-cursor`
  (lệnh này không bao giờ ghi tệp).
- `--model <id>` — bắt buộc (hoặc được chọn tương tác) đối với các công cụ không có
  khả năng tự động khám phá mô hình: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Các công cụ đó
  cũng chấp nhận `--yes` cho các lần chạy không tương tác (khi đó yêu cầu `--model`).
  `setup-opencode` nhận `--model` để đặt mô hình cấp cao nhất mặc định.
- `--model <id>` trên `omniroute run` tuân theo cách kết nối riêng cho từng đích trong manifest
  (`bin/cli/cli-manifest.mjs`): **aider** nhận `--model openai/<id>` và
  **opencode** nhận `--model omniroute/<id>` (tiền tố chỉ được thêm khi ID
  chưa có tiền tố đó); **qwen** và **gemini** nhận nguyên trạng ID;
  **claude** nhận ID qua `ANTHROPIC_MODEL`, **goose** qua `GOOSE_MODEL`, và
  **codex** qua các đối số `-c model_providers.omniroute.*`. **Qwen là đích chạy duy nhất
  bắt buộc phải có `--model`** — `omniroute run qwen` khi không có cờ này sẽ thoát
  với mã `2` và lỗi rõ ràng.
- `--port <port>` — cổng OmniRoute cục bộ (mặc định `20128`, bị bỏ qua khi đặt
  `--remote`). Có mặt trên tất cả các lệnh `setup-*` và cả hai trình khởi chạy.
- Mã thoát của `omniroute run`: mã thoát riêng của CLI con được truyền tiếp
  nguyên trạng; `2` = đối số không hợp lệ (đích không được hỗ trợ, thiếu
  `--model` bắt buộc, cơ chế bảo vệ container); `127` = tệp nhị phân của đích không có trong `PATH`;
  `130`/`143`/`129` khi quá trình khởi chạy bị kết thúc bởi `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = lỗi khởi chạy trong thời gian chạy khác.
- Hai trình khởi chạy (`launch`, `launch-codex`) chấp nhận `--profile <name>` để chọn
  một hồ sơ được ghi bởi `setup-claude` / `setup-codex`, cùng với các đối số truyền tiếp cho
  tệp nhị phân `claude` / `codex` bên dưới.

Trình chọn tương tác cũng được dùng chung bởi các công thức thiết lập:

```bash
# Chọn từ danh mục mô hình cục bộ hoặc từ xa đang hoạt động và cấu hình đích.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` hiện ủy quyền cho các công thức đã được kiểm thử dành cho `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` và `5dive`.
Các mục danh mục chỉ dành cho IDE,
MITM và chỉ mang tính hướng dẫn vẫn sử dụng các quy trình `setup-*`/thủ công riêng biệt và
không được hiển thị dưới dạng các đích có thể khởi chạy.

> `setup-opencode` là tích hợp OpenCode **nhẹ, tương thích với openai**.
> Ngoài ra còn có một tích hợp plugin giàu tính năng hơn — `omniroute setup opencode` — cài đặt
> `@omniroute/opencode-plugin`. Đây là các lệnh khác nhau; bảng
> bên trên mô tả `setup-opencode`.
>
> Plugin có hai gói, mỗi gói dành cho một phiên bản chính của OpenCode, vì hai
> trình tải yêu cầu các điểm vào khác nhau:
> `@omniroute/opencode-plugin` dành cho OpenCode v1 và
> `@omniroute/opencode-plugin-v2` dành cho OpenCode v2. Gói v2 là gói mới
> (`0.1.0`) và tuân theo một giao ước máy chủ vẫn đang thay đổi, vì vậy nó đọc
> cấu trúc mà OpenCode đưa vào bản nháp danh mục thay vì giả định một cấu trúc cụ thể. Cài đặt
> gói này bằng cách thêm một mục `plugins` vào `opencode.json`; `omniroute setup opencode`
> vẫn cài đặt gói v1. Các tùy chọn và thứ tự tra cứu thông tin xác thực có trong
> README của gói.

---

## Sử dụng cục bộ

Khi OmniRoute đang chạy trên `localhost:20128`, chỉ cần chạy lệnh thiết lập cho
công cụ của bạn. Danh mục được tải từ máy chủ cục bộ.

```bash
# Codex: ghi một profile cho mỗi model khớp vào ~/.codex/
omniroute setup-codex
codex --profile glm52            # sử dụng một profile đã tạo

# Claude Code: ghi các profile riêng cho từng model, sau đó khởi chạy một profile
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: ghi provider tương thích với openai cùng toàn bộ model trong danh mục
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # được tham chiếu qua {env:OMNIROUTE_API_KEY}, không bao giờ được ghi ra đĩa
opencode -m omniroute/glm/glm-5.2 "..."

# Các công cụ không có khả năng tự động khám phá cần chỉ định model rõ ràng:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Xem trước mà không ghi bất kỳ thứ gì:
omniroute setup-continue --dry-run
```

Khởi chạy mà không ghi bất kỳ cấu hình nào (chỉ chèn biến môi trường):

```bash
omniroute launch                 # Claude Code → OmniRoute cục bộ
omniroute launch-codex           # Codex CLI → OmniRoute cục bộ
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Đường dẫn lệnh rõ ràng: chuyển tiếp mọi thứ đứng sau --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Sử dụng từ xa

Trỏ bất kỳ lệnh thiết lập nào đến một OmniRoute từ xa bằng `--remote` + `--api-key`.
Danh mục được tải từ máy chủ từ xa; cấu hình được ghi trên máy cục bộ của bạn.

```bash
# OpenCode kết nối đến VPS từ xa, chỉ giữ lại các model glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # trước tiên hãy export OMNIROUTE_API_KEY

# Các profile Codex từ danh mục từ xa
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Khởi chạy CLI trực tiếp với máy chủ từ xa
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Thay vì truyền `--remote`/`--api-key` mỗi lần, hãy đăng nhập một lần và để
**ngữ cảnh đang hoạt động** tự động cung cấp chúng:

```bash
omniroute connect 192.168.0.15        # tạo token có phạm vi và lưu ngữ cảnh
omniroute setup-codex                 # ← giờ đây sử dụng danh mục từ xa
omniroute setup-opencode              # ← tương tự
omniroute launch                      # ← Claude Code kết nối đến máy chủ từ xa
```

Xem [Chế độ từ xa](./REMOTE-MODE.md) để biết về ngữ cảnh, phạm vi và quản lý token.

---

## Các đội agent 5dive

[5dive](https://5dive.ai) vận hành một đội gồm các agent lập trình chạy dài hạn, mỗi
agent là một unit systemd dưới tài khoản người dùng Unix riêng. Bản thân nó không
phải là một CLI lập trình, vì vậy không có gì để `omniroute run` khởi chạy —
`5dive` là một đích **chỉ dành cho cấu hình**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Cả hai dạng đều ghi một **profile xác thực** 5dive, và sau đó mọi seat `claude` được
liên kết với profile đó sẽ giao tiếp với OmniRoute. Có ba điểm riêng biệt đối với
đích này:

- **Nó chạy trên máy chủ của đội agent với quyền root.** Các động từ của 5dive tác
  động lên các unit systemd cục bộ và một thư mục trạng thái thuộc sở hữu của root;
  không có chế độ từ xa. Quy trình sẽ tự thực thi lại thông qua `sudo` khi chưa chạy
  với quyền root (`--no-sudo` sẽ tắt hành vi đó và in lệnh ra thay thế).
- **Endpoint phải dùng `https://` trừ khi đó là địa chỉ loopback.** API key của agent
  được gửi qua URL đó trong mọi yêu cầu, và 5dive từ chối endpoint không mã hóa nằm
  ngoài máy. Địa chỉ LAN riêng cũng không phải ngoại lệ.
- **Model được ghim riêng cho từng seat có mức ưu tiên cao hơn profile.** Profile
  chứa `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, nhưng một seat vẫn được ghim
  vào model id mặc định sẽ thất bại ngay ở lượt đầu tiên với thông báo _"Có vấn đề
  với model đã chọn"_. Truyền `--agent <name>` (có thể lặp lại) để ghim cả các seat;
  quy trình sẽ in lệnh ra khi bạn không làm như vậy.

API key được chuyển cho 5dive qua **stdin** (`--api-key=-`), vì vậy nó không bao giờ
xuất hiện trong đầu ra của `ps`.

Việc trỏ profile đến một **combo** OmniRoute thay vì một model đơn lẻ chính là cách
đội agent có được khả năng chuyển đổi dự phòng giữa các provider: khi endpoint
chính ngừng hoạt động hoàn toàn giữa chừng trong lượt chạy được ghi lại tại
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent đã hoàn tất
các bước còn lại trên phương án dự phòng mà không để sự cố gián đoạn lộ ra ngoài.

---

## Quy ước URL cơ sở (công cụ nào cần `/v1`)

OmniRoute cung cấp giao diện OpenAI tại `/v1`, giao diện Anthropic tại thư mục gốc,
và giao diện Gemini nguyên bản tại `/v1beta`. Mỗi tích hợp được cấu hình theo định dạng mà
công cụ tương ứng yêu cầu (đã xác minh trong mã nguồn lệnh):

| Tích hợp                                                                   | URL cơ sở được ghi | `/v1`?                                          |
| -------------------------------------------------------------------------- | ------------------ | ----------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | gốc                | Không — Cline nối thêm `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | gốc                | Không — Goose nối thêm đường dẫn                |
| `setup-aider` (`OPENAI_API_BASE`)                                          | gốc                | Không — LiteLLM nối thêm `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | có `/v1`           | Có                                              |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | gốc                | Không — Claude Code nối thêm `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | có `/v1`           | Có                                              |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | có `/v1`           | Có                                              |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | gốc                | Không — SDK nối thêm `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` trong hồ sơ xác thực)                  | gốc                | Không — Claude Code nối thêm `/v1/messages`     |

---

## Giữ lại các phần phụ thuộc nguyên bản khi cập nhật: `--include=optional`

Khi bạn cập nhật bằng `omniroute update` (sau khi xác nhận hoặc dùng `--apply`),
OmniRoute chạy lệnh cài đặt với `--include=optional` được tích hợp sẵn:

```bash
npm install -g omniroute@latest --include=optional
```

Đây **không phải** là cờ bạn truyền cho `omniroute update` — trình cập nhật luôn tự động
áp dụng cờ này. Điều đó bảo đảm các `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, ngăn xếp SLM LLMLingua) vẫn được giữ lại sau khi cập nhật, ngay cả khi cấu hình npm
của bạn đặt `omit=optional`; nếu không, trình điều khiển SQLite nguyên bản và thành phần liên kết
với kho khóa của hệ điều hành sẽ bị loại bỏ âm thầm. Để xem trước chính xác lệnh mà không áp dụng:

```bash
omniroute update --dry-run
# [CHẠY THỬ] Sẽ chạy: npm install -g omniroute@latest --include=optional
```

Các cờ khác của `omniroute update` (đã xác minh trong mã nguồn): `--check` (thoát với mã 1 nếu
đã lỗi thời), `--apply` (cài đặt mà không hỏi xác nhận), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI thông qua `omniroute run gemini`

Giao ước đã được xác minh với `@google/gemini-cli` 0.50.0: CLI tuân theo
`GOOGLE_GEMINI_BASE_URL` và gửi `POST /v1beta/models/<model>:generateContent`
(cũng như `:streamGenerateContent?alt=sse`) đến URL đó — khớp chính xác với giao diện Gemini
nguyên bản của OmniRoute (`/v1beta`). `omniroute run gemini` tự động cấu hình như sau:

- `GOOGLE_GEMINI_BASE_URL` → URL cơ sở OmniRoute đang hoạt động (gốc, không có `/v1`);
- `GEMINI_API_KEY` → thông tin xác thực OmniRoute đã được phân giải (tùy chọn/biến môi trường/ngữ cảnh);
- một **`GEMINI_CLI_HOME` tạm thời và biệt lập**, trong đó `.gemini/settings.json`
  chọn phương thức xác thực `gemini-api-key`, để phiên Google OAuth đã lưu (Code Assist)
  không bao giờ ghi đè lần khởi chạy được định tuyến qua OmniRoute — thư mục này bị xóa sau khi thoát;
- **vệ sinh môi trường**: môi trường của tiến trình con được loại bỏ `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` và `GOOGLE_GENAI_USE_GCA` (những biến có thể chuyển hướng
  xác thực sang Vertex/Code Assist), đồng thời đặt `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  làm phương án dự phòng bổ sung — các đích `run` khác cũng được xử lý tương tự đối với
  các biến xung đột riêng của chúng;
- chèn `--model <id>` từ `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Cơ chế bảo vệ độ tin cậy của không gian làm việc trong Gemini vẫn được áp dụng ở chế độ không giao diện — hãy tự truyền
`--skip-trust` (hoặc đánh dấu thư mục là đáng tin cậy theo cách tương tác); trình khởi chạy
cố ý không bỏ qua cơ chế này. Trình khởi chạy này khác với **đăng ký ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), vốn vẫn là
tích hợp giao thức tác tử dành cho `/dashboard/acp-agents`.

---

## Quét smoke thực tế (tùy chọn bật)

Các lần chạy hồi quy kế hoạch khởi chạy mang tính xác định được thực hiện trong CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Để kiểm tra các tệp nhị phân THỰC TẾ với một máy chủ
OmniRoute THỰC TẾ, có một bộ kiểm thử tùy chọn bật tại
`tests/integration/upstream-cli-smoke.int.test.ts`. Bộ kiểm thử này không bao giờ tự động chạy
(mọi kiểm thử con đều bị bỏ qua trừ khi `RUN_CLI_SMOKE=1`), truyền thông tin xác thực bằng TÊN
biến môi trường (không bao giờ truyền giá trị), che các chuỗi có dạng khóa khỏi mọi đầu ra được ghi lại, bỏ qua
các mục tiêu có tệp nhị phân chưa được cài đặt và phân loại lỗi thành
xác thực / thượng nguồn / cấu hình thay vì chỉ dùng giá trị boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Tùy chọn: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` giới hạn phạm vi quét;
`OMNIROUTE_SMOKE_TIMEOUT_MS` ghi đè thời gian chờ 120 giây cho mỗi mục tiêu.

---

## Xem thêm

- [Cấu hình Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — hướng dẫn chuyên sâu hơn về Claude Code
- [Cấu hình Codex CLI](./CODEX-CLI-CONFIGURATION.md) — thiết lập cơ sở `[model_providers.omniroute]` một lần
- [Chế độ từ xa](./REMOTE-MODE.md) — ngữ cảnh, token truy cập có phạm vi và điều khiển máy chủ từ xa
- [Tài liệu tham khảo về công cụ CLI](../reference/CLI-TOOLS.md) — danh mục đầy đủ các công cụ được hỗ trợ + các trang bảng điều khiển
- [Hướng dẫn thiết lập](./SETUP_GUIDE.md) — các phương thức cài đặt và quy trình làm quen trong lần chạy đầu tiên
