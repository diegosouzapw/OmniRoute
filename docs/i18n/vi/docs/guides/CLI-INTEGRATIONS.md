# CLI-INTEGRATIONS (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Tích hợp CLI — chỉ định bất kỳ CLI lập trình nào vào OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Tích hợp CLI

OmniRoute cung cấp một loạt các lệnh `setup-*` để cấu hình một CLI lập trình (Codex, Claude Code, OpenCode, Cline, …) sử dụng OmniRoute làm backend — vì vậy công cụ này giao tiếp với **một** điểm cuối và OmniRoute sẽ định tuyến đến nhà cung cấp đúng với chế độ tự động chuyển đổi. Mỗi lệnh đọc danh mục mô hình **trực tiếp** từ một OmniRoute đang chạy (cục bộ hoặc từ xa) và ghi tệp cấu hình của công cụ trên **máy của bạn**. Khóa API được tham chiếu bởi một biến môi trường ở bất kỳ đâu mà công cụ hỗ trợ. Các lệnh mà lưu trữ tệp môi trường cục bộ của công cụ được ghi chú bên dưới.

Cũng có một trình khởi động chung — `omniroute run <target>` — tạo ra `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` hoặc `gemini` với môi trường đúng được tiêm vào, mà không ghi bất kỳ cấu hình nào. Các mục tiêu và bí danh của chúng đến từ bản khai báo chính thức `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), và `omniroute completion` cung cấp các từ mục tiêu được lấy từ bản khai báo tương tự. Các trình khởi động theo công cụ cũ — `omniroute launch` (Claude Code) và `omniroute launch-codex` (Codex) — vẫn có sẵn.

Việc onboard nhà cung cấp có sẵn từ cùng một ngữ cảnh cục bộ/ từ xa. Các lệnh API-first dưới đây giữ cho xác thực quản lý tách biệt với thông tin xác thực của nhà cung cấp và không bao giờ in thông tin xác thực trong đầu ra có cấu trúc:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Đối với các kịch bản, hãy ưu tiên `--credential-stdin` hoặc `--credential-env`; `--credential` được giữ lại cho việc sử dụng cục bộ có kiểm soát. `providers remove` yêu cầu `--yes` trên một terminal không tương tác, và tất cả năm lệnh đều tôn trọng ngữ cảnh hoạt động hoặc các tùy chọn toàn cầu `--base-url`/`--api-key`.

Đối với việc thiết lập cơ bản một lần, viết tay cho hai tích hợp phong phú nhất, hãy xem các bài sâu về từng công cụ:

- [Cấu hình Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Cấu hình Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Chế độ từ xa](./REMOTE-MODE.md) — điều khiển một OmniRoute từ xa (VPS / Tailnet) từ máy tính xách tay của bạn
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — tiện ích mở rộng OmniCopilot; nó cũng có thể chạy các lệnh `setup-*` này cho bạn từ bên trong trình soạn thảo

---

## Bảng chính

Mỗi lệnh tôn trọng **ngữ cảnh hoạt động** (được thiết lập với `omniroute connect`, xem [Chế độ từ xa](./REMOTE-MODE.md)) hoặc các cờ `--remote <url> --api-key <key>` rõ ràng. "Cục bộ so với từ xa" bên dưới có nghĩa là: không có cờ nào nó nhắm đến `http://localhost:20128`; với `--remote` (hoặc một ngữ cảnh từ xa đang hoạt động) nó lấy danh mục từ máy chủ đó và ghi cấu hình cục bộ.

| Lệnh                       | Công cụ                          | Nội dung ghi                                                                                                                                                            | Cờ chính                                                                                                                                   | Cục bộ so với từ xa |
| -------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                 | `~/.codex/<name>.config.toml` — một hồ sơ cho mỗi mô hình văn bản tương thích (`codex --profile <name>`)                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Cả hai              |
| `omniroute setup-claude`   | Claude Code                      | `~/.claude/profiles/<name>/settings.json` — một hồ sơ cho mỗi mô hình phù hợp (`CLAUDE_CONFIG_DIR`)                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Cả hai              |
| `omniroute setup-opencode` | OpenCode (tương thích openai)    | `~/.config/opencode/opencode.json` — nhà cung cấp `omniroute` với mọi mô hình trong danh mục (`opencode -m omniroute/<model>`)                                          | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Cả hai              |
| `omniroute setup-cline`    | Cline                            | `~/.cline/data/{globalState,secrets}.json` (chế độ CLI) + in cài đặt tiện ích mở rộng VS Code                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Cả hai              |
| `omniroute setup-kilo`     | Kilo Code                        | `~/.local/share/kilo/auth.json` (CLI) + hợp nhất `kilocode.*` vào `settings.json` của VS Code nếu có                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Cả hai              |
| `omniroute setup-continue` | Continue / `cn` CLI              | `~/.continue/config.yaml` — mô hình `provider: openai`, khóa thông qua `${{ secrets.OMNIROUTE_API_KEY }}`                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Cả hai              |
| `omniroute setup-cursor`   | Cursor                           | Không có gì — in các bước trong ứng dụng (cấu hình Cursor là SQLite không rõ ràng)                                                                                      | `--remote` `--api-key` `--only` `--port`                                                                                                   | Cả hai              |
| `omniroute setup-roo`      | Roo Code                         | `~/.omniroute/roo-settings.json` (tài liệu nhập) + thiết lập `roo-cline.autoImportSettingsPath` nếu có `settings.json` của VS Code                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Cả hai              |
| `omniroute setup-crush`    | Crush                            | `~/.config/crush/crush.json` — nhà cung cấp `openai-compat`, khóa thông qua `$OMNIROUTE_API_KEY`                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Cả hai              |
| `omniroute setup-goose`    | Goose                            | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + in công thức môi trường                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Cả hai              |
| `omniroute setup-aider`    | Aider                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + in công thức môi trường                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Cả hai              |
| `omniroute setup-qwen`     | Qwen Code                        | `~/.qwen/settings.json` — mảng `modelProviders.openai` V4 + `OMNIROUTE_API_KEY` trong `~/.qwen/.env`                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Cả hai              |
| `omniroute run <target>`   | Khởi động thời gian chạy (chung) | Không có gì — khởi động `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` với môi trường và tham số đúng; Qwen và Gemini sử dụng một thư mục tạm thời cách ly | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Cả hai              |
| `omniroute launch`         | Claude Code                      | Không có gì — khởi động `claude` với `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` được tiêm vào                                                                          | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Cả hai              |
| `omniroute launch-codex`   | OpenAI Codex CLI                 | Không có gì — khởi động `codex` với nhà cung cấp `omniroute` được tiêm qua các cờ `-c`                                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Cả hai              |

Ghi chú về các cờ (đã xác minh trong mã lệnh):

- `--remote <url>` — lấy danh mục từ một OmniRoute từ xa (ghi đè `--port` và ngữ cảnh hoạt động). `--api-key <key>` cung cấp thông tin xác thực cho máy chủ đó (mặc định là biến môi trường `OMNIROUTE_API_KEY`, hoặc mã thông báo của ngữ cảnh hoạt động).
- `--only <patterns>` — các chuỗi con phân tách bằng dấu phẩy; chỉ giữ lại các ID mô hình phù hợp (ví dụ: `--only glm,kimi`). Có sẵn trên `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — in chính xác những gì sẽ được ghi mà không chạm vào hệ thống tệp. Có sẵn trên mọi lệnh `setup-*` **ngoại trừ** `setup-cursor` (không bao giờ ghi tệp).
- `--model <id>` — yêu cầu (hoặc được chọn tương tác) cho các công cụ không có phát hiện mô hình tự động: Cline, Kilo, Roo, Goose, Qwen, Aider. Những công cụ đó cũng chấp nhận `--yes` cho các lần chạy không tương tác (sau đó yêu cầu `--model`). `setup-opencode` nhận `--model` để thiết lập mô hình cấp cao nhất mặc định.
- `--model <id>` trên `omniroute run` theo cách kết nối theo từng mục tiêu trong bản khai báo (`bin/cli/cli-manifest.mjs`): **aider** nhận `--model openai/<id>` và **opencode** `--model omniroute/<id>` (tiền tố chỉ được thêm vào khi ID không đã mang nó); **qwen** và **gemini** nhận ID nguyên văn; **claude** nhận nó qua `ANTHROPIC_MODEL`, **goose** qua `GOOSE_MODEL`, và **codex** qua các tham số `-c model_providers.omniroute.*`. **Qwen là mục tiêu chạy duy nhất yêu cầu cứng `--model`** — `omniroute run qwen` mà không có nó thoát `2` với một lỗi rõ ràng.
- `--port <port>` — cổng OmniRoute cục bộ (mặc định `20128`, bị bỏ qua khi `--remote` được thiết lập). Có mặt trên tất cả các lệnh `setup-*` và cả hai trình khởi động.
- Mã thoát của `omniroute run`: mã thoát của CLI con được truyền đạt nguyên văn; `2` = tham số không hợp lệ (mục tiêu không được hỗ trợ, thiếu `--model` cần thiết, bảo vệ container); `127` = nhị phân mục tiêu không có trong `PATH`; `130`/`143`/`129` khi việc khởi động bị kết thúc bởi `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = lỗi khởi động thời gian chạy khác.
- Hai trình khởi động (`launch`, `launch-codex`) chấp nhận `--profile <name>` để chọn một hồ sơ được viết bởi `setup-claude` / `setup-codex`, cộng với các tham số truyền qua cho nhị phân `claude` / `codex` cơ bản.

Trình chọn tương tác cũng được chia sẻ bởi các công thức thiết lập:

```bash
# Chọn từ danh mục mô hình cục bộ hoặc từ xa đang hoạt động và cấu hình mục tiêu.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` hiện tại ủy quyền cho các công thức đã thử nghiệm cho `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, và `kilo`. Các mục nhập chỉ dành cho IDE, MITM, và chỉ hướng dẫn vẫn giữ nguyên các quy trình `setup-*`/thủ công và không được trình bày như các mục tiêu có thể khởi động.

> `setup-opencode` là tích hợp OpenCode **tương thích openai nhẹ**.
> Cũng có một tích hợp plugin phong phú hơn — `omniroute setup opencode` — mà
> cài đặt `@omniroute/opencode-plugin`. Chúng là các lệnh khác nhau; bảng
> trên tài liệu `setup-opencode`.

---

## Sử dụng cục bộ

Với OmniRoute chạy trên `localhost:20128`, chỉ cần chạy lệnh thiết lập cho công cụ của bạn. Danh mục được lấy từ máy chủ cục bộ.

```bash
# Codex: viết một hồ sơ cho mỗi mô hình khớp vào ~/.codex/
omniroute setup-codex
codex --profile glm52            # sử dụng hồ sơ đã tạo

# Claude Code: viết hồ sơ theo mô hình, sau đó khởi động một cái
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: viết nhà cung cấp tương thích với openai với tất cả các mô hình trong danh mục
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # được tham chiếu qua {env:OMNIROUTE_API_KEY}, không bao giờ trên đĩa
opencode -m omniroute/glm/glm-5.2 "..."

# Các công cụ không có tự động phát hiện cần một mô hình rõ ràng:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Xem trước mà không ghi bất cứ điều gì:
omniroute setup-continue --dry-run
```

Khởi động mà không ghi bất kỳ cấu hình nào (chỉ tiêm môi trường):

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

# Đường dẫn lệnh rõ ràng: truyền qua bất cứ điều gì đến sau --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Sử dụng từ xa

Chỉ định bất kỳ lệnh thiết lập nào đến một OmniRoute từ xa với `--remote` + `--api-key`. Danh mục được lấy từ xa; cấu hình được ghi trên máy tính cục bộ của bạn.

```bash
# OpenCode chống lại một VPS từ xa, chỉ giữ lại các mô hình glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # xuất OMNIROUTE_API_KEY trước

# Hồ sơ Codex từ một danh mục từ xa
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Khởi động một CLI trực tiếp chống lại từ xa
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Thay vì phải truyền `--remote`/`--api-key` mỗi lần, hãy đăng nhập một lần và để **ngữ cảnh hoạt động** cung cấp chúng tự động:

```bash
omniroute connect 192.168.0.15        # tạo một mã thông báo có phạm vi, lưu ngữ cảnh
omniroute setup-codex                 # ← bây giờ sử dụng danh mục từ xa
omniroute setup-opencode              # ← giống nhau
omniroute launch                      # ← Claude Code chống lại từ xa
```

Xem [Chế độ từ xa](./REMOTE-MODE.md) để biết ngữ cảnh, phạm vi và quản lý mã thông báo.

---

## Quy ước URL cơ sở (các công cụ muốn `/v1`)

OmniRoute cung cấp bề mặt OpenAI tại `/v1`, bề mặt Anthropic tại gốc, và một bề mặt Gemini gốc tại `/v1beta`. Mỗi tích hợp được kết nối với hình thức mà công cụ của nó mong đợi (được xác minh trong nguồn lệnh):

| Tích hợp                                                                   | URL cơ sở được ghi | `/v1`?                                      |
| -------------------------------------------------------------------------- | ------------------ | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | gốc                | Không — Cline thêm `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | gốc                | Không — Goose thêm đường dẫn                |
| `setup-aider` (`OPENAI_API_BASE`)                                          | gốc                | Không — LiteLLM thêm `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | với `/v1`          | Có                                          |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | gốc                | Không — Claude Code thêm `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | với `/v1`          | Có                                          |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | với `/v1`          | Có                                          |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | gốc                | Không — SDK thêm `/v1beta/models/…`         |

---

## Giữ các phụ thuộc gốc khi cập nhật: `--include=optional`

Khi bạn cập nhật với `omniroute update` (sau khi xác nhận, hoặc với `--apply`),
OmniRoute sẽ chạy lệnh cài đặt với `--include=optional` được tích hợp sẵn:

```bash
npm install -g omniroute@latest --include=optional
```

Đây **không** phải là một cờ bạn truyền cho `omniroute update` — nó luôn được áp dụng bởi
trình cập nhật. Nó đảm bảo rằng các `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, ngăn xếp LLMLingua SLM) vẫn tồn tại sau khi cập nhật ngay cả khi cấu hình npm của bạn
có `omit=optional` được thiết lập, điều này sẽ âm thầm loại bỏ trình điều khiển SQLite gốc
và liên kết OS-keyring. Để xem trước lệnh chính xác mà không áp dụng:

```bash
omniroute update --dry-run
# [DRY RUN] Would run: npm install -g omniroute@latest --include=optional
```

Các cờ khác của `omniroute update` (đã được xác minh trong mã nguồn): `--check` (thoát 1 nếu
có phiên bản cũ), `--apply` (cài đặt mà không cần nhắc), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI qua `omniroute run gemini`

Hợp đồng đã được xác minh với `@google/gemini-cli` 0.50.0: CLI tôn trọng
`GOOGLE_GEMINI_BASE_URL` và phát hành `POST /v1beta/models/<model>:generateContent`
(và `:streamGenerateContent?alt=sse`) chống lại nó — chính xác là bề mặt Gemini gốc của OmniRoute
(`/v1beta`). `omniroute run gemini` tự động kết nối điều đó:

- `GOOGLE_GEMINI_BASE_URL` → URL cơ sở OmniRoute đang hoạt động (gốc, không có `/v1`);
- `GEMINI_API_KEY` → thông tin xác thực OmniRoute đã được giải quyết (tùy chọn/env/ngữ cảnh);
- một **`GEMINI_CLI_HOME` tạm thời cách ly** mà `.gemini/settings.json`
  chọn xác thực `gemini-api-key`, vì vậy một phiên Google OAuth đã lưu (Code Assist)
  không bao giờ ghi đè lên việc khởi động theo hướng OmniRoute — sẽ bị xóa sau khi thoát;
- **vệ sinh môi trường**: môi trường con được làm sạch khỏi `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` và `GOOGLE_GENAI_USE_GCA` (cái sẽ chuyển hướng
  xác thực đến Vertex/Code Assist), và `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` được
  thiết lập như một biện pháp phòng ngừa — các mục tiêu `run` khác cũng nhận được sự
  điều trị tương tự cho các biến xung đột của riêng chúng;
- tiêm `--model <id>` từ `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Bảo vệ độ tin cậy của không gian làm việc của Gemini vẫn áp dụng trong chế độ không giao diện — hãy
truyền `--skip-trust` (hoặc tin tưởng thư mục một cách tương tác) bạn tự làm; trình khởi động
cố ý không bỏ qua nó. Trình khởi động này khác với **đăng ký ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), cái vẫn là
tích hợp giao thức đại lý cho `/dashboard/acp-agents`.

---

## Quét khói thực sự (tùy chọn)

Các kế hoạch khởi động hồi quy xác định chạy trong CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Để xác thực các nhị phân THỰC sự chống lại một máy chủ
OmniRoute THỰC sự, một khung tùy chọn tồn tại tại
`tests/integration/upstream-cli-smoke.int.test.ts`. Nó không bao giờ chạy tự động
(tất cả các bài kiểm tra con đều bỏ qua trừ khi `RUN_CLI_SMOKE=1`), truyền thông tin xác thực qua biến môi trường
NAME (không bao giờ qua giá trị), che giấu các chuỗi hình dạng khóa khỏi bất kỳ đầu ra nào được ghi lại, bỏ qua
các mục tiêu mà nhị phân không được cài đặt, và phân loại các lỗi là
xác thực / upstream / cấu hình thay vì một boolean đơn giản:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Tùy chọn: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` giới hạn quét;
`OMNIROUTE_SMOKE_TIMEOUT_MS` ghi đè thời gian chờ 120 giây cho mỗi mục tiêu.

---

## Xem thêm

- [Cấu hình Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — hướng dẫn sâu hơn về Claude Code
- [Cấu hình Codex CLI](./CODEX-CLI-CONFIGURATION.md) — thiết lập cơ bản một lần `[model_providers.omniroute]`
- [Chế độ từ xa](./REMOTE-MODE.md) — ngữ cảnh, mã truy cập có phạm vi, điều khiển một máy chủ từ xa
- [Tài liệu tham khảo CLI Tools](../reference/CLI-TOOLS.md) — danh mục đầy đủ các công cụ được hỗ trợ + trang bảng điều khiển
- [Hướng dẫn thiết lập](./SETUP_GUIDE.md) — phương pháp cài đặt và hướng dẫn khởi động lần đầu
