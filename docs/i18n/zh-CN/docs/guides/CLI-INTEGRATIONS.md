# CLI-INTEGRATIONS (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI 集成 — 将任何编码 CLI 指向 OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI 集成

OmniRoute 提供了一系列 `setup-*` 命令，用于配置编码 CLI（Codex、Claude Code、OpenCode、Cline 等）以使用 OmniRoute 作为其后端——因此该工具只需与 **一个** 端点通信，OmniRoute 会自动路由到正确的提供者并进行自动回退。每个命令从运行中的 OmniRoute（本地或远程）读取 **实时** 模型目录，并在 **你的** 机器上写入工具自己的配置文件。API 密钥通过环境变量引用，工具支持的地方均如此。持久化工具本地环境文件的命令在下面注明。

还有一个通用启动器 — `omniroute run <target>` — 它会启动 `claude`、`codex`、`aider`、`goose`、`opencode`、`qwen` 或 `gemini`，并注入正确的环境，而无需写入任何配置。目标及其别名来自规范清单 `bin/cli/cli-manifest.mjs`（`claude-code|cc|anthropic`、`codex-cli|openai-codex|openai`、`goose-cli`、`open-code`、`qwen-code`、`gemini-cli`），而 `omniroute completion` 提供相同的基于清单的目标词。遗留的每个工具启动器 — `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex） — 仍然可用。

提供者的入驻可以从相同的本地/远程上下文进行。下面的 API 优先命令将管理身份验证与提供者凭据分开，并且从不在结构化输出中打印凭据：

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

对于脚本，优先使用 `--credential-stdin` 或 `--credential-env`；`--credential` 保留用于受控的本地使用。`providers remove` 在非交互式终端上需要 `--yes`，所有五个命令都遵循活动上下文或全局 `--base-url`/`--api-key` 选项。

有关两个最丰富集成的一次性手动基础设置，请参见每个工具的深入探讨：

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md)
- [远程模式](./REMOTE-MODE.md) — 从你的笔记本电脑驱动远程 OmniRoute（VPS / Tailnet）
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot 扩展；它还可以在编辑器内部为你运行这些 `setup-*` 命令

---

## 主表

每个命令都遵循 **活动上下文**（通过 `omniroute connect` 设置，见 [远程模式](./REMOTE-MODE.md)）或显式的 `--remote <url> --api-key <key>` 标志。下面的“本地与远程”意味着：没有标志时，它的目标是 `http://localhost:20128`；使用 `--remote`（或活动的远程上下文）时，它从该服务器获取目录并在本地写入配置。

| 命令                       | 工具                    | 写入内容                                                                                                                           | 关键标志                                                                                                                                   | 本地与远程 |
| -------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `omniroute setup-codex`    | OpenAI Codex CLI        | `~/.codex/<name>.config.toml` — 每个兼容文本模型一个配置文件（`codex --profile <name>`）                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 两者       |
| `omniroute setup-claude`   | Claude Code             | `~/.claude/profiles/<name>/settings.json` — 每个匹配模型一个配置文件（`CLAUDE_CONFIG_DIR`）                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 两者       |
| `omniroute setup-opencode` | OpenCode（兼容 openai） | `~/.config/opencode/opencode.json` — 包含每个目录模型的 `omniroute` 提供者（`opencode -m omniroute/<model>`）                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 两者       |
| `omniroute setup-cline`    | Cline                   | `~/.cline/data/{globalState,secrets}.json`（CLI 模式） + 打印 VS Code 扩展设置                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 两者       |
| `omniroute setup-kilo`     | Kilo Code               | `~/.local/share/kilo/auth.json`（CLI） + 如果存在，则将 `kilocode.*` 合并到 VS Code `settings.json`                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 两者       |
| `omniroute setup-continue` | Continue / `cn` CLI     | `~/.continue/config.yaml` — `provider: openai` 模型，通过 `${{ secrets.OMNIROUTE_API_KEY }}` 提供密钥                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 两者       |
| `omniroute setup-cursor`   | Cursor                  | 无 — 打印应用内步骤（Cursor 配置是模糊的 SQLite）                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | 两者       |
| `omniroute setup-roo`      | Roo Code                | `~/.omniroute/roo-settings.json`（导入文档） + 如果存在 VS Code `settings.json`，则设置 `roo-cline.autoImportSettingsPath`         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 两者       |
| `omniroute setup-crush`    | Crush                   | `~/.config/crush/crush.json` — `openai-compat` 提供者，通过 `$OMNIROUTE_API_KEY` 提供密钥                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 两者       |
| `omniroute setup-goose`    | Goose                   | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`） + 打印环境配方                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 两者       |
| `omniroute setup-aider`    | Aider                   | `~/.aider.conf.yml`（`openai-api-base` + `model: openai/<id>`） + 打印环境配方                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 两者       |
| `omniroute setup-qwen`     | Qwen Code               | `~/.qwen/settings.json` — V4 `modelProviders.openai` 数组 + `OMNIROUTE_API_KEY` 在 `~/.qwen/.env`                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 两者       |
| `omniroute run <target>`   | 运行时启动（通用）      | 无 — 启动 `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`，并使用正确的环境和参数；Qwen 和 Gemini 使用临时隔离的主目录 | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 两者       |
| `omniroute launch`         | Claude Code             | 无 — 启动 `claude`，注入 `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 两者       |
| `omniroute launch-codex`   | OpenAI Codex CLI        | 无 — 启动 `codex`，通过 `-c` 标志注入 `omniroute` 提供者                                                                           | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 两者       |

关于标志的说明（在命令源中验证）：

- `--remote <url>` — 从远程 OmniRoute 获取目录（覆盖 `--port` 和活动上下文）。`--api-key <key>` 为该服务器提供凭据（默认为 `OMNIROUTE_API_KEY` 环境变量，或活动上下文的令牌）。
- `--only <patterns>` — 以逗号分隔的子字符串；仅保留匹配的模型 ID（例如 `--only glm,kimi`）。适用于 `setup-codex`、`setup-claude`、`setup-opencode`、`setup-continue`、`setup-cursor`、`setup-crush`。
- `--dry-run` — 打印将要写入的内容，而不触碰文件系统。适用于每个 `setup-*` 命令 **除了** `setup-cursor`（该命令从不写入文件）。
- `--model <id>` — 对于没有模型自动发现的工具是必需的（或通过交互选择）：Cline、Kilo、Roo、Goose、Qwen、Aider。这些工具还接受 `--yes` 以进行非交互式运行（这时需要 `--model`）。`setup-opencode` 采用 `--model` 来设置默认的顶级模型。
- `--model <id>` 在 `omniroute run` 上遵循清单的每个目标连接（`bin/cli/cli-manifest.mjs`）：**aider** 接收 `--model openai/<id>`，**opencode** 接收 `--model omniroute/<id>`（前缀仅在 ID 不包含时添加）；**qwen** 和 **gemini** 直接接收 ID；**claude** 通过 `ANTHROPIC_MODEL` 获取，**goose** 通过 `GOOSE_MODEL`，**codex** 通过 `-c model_providers.omniroute.*` 参数获取。**Qwen 是唯一一个强制要求 `--model` 的运行目标** — `omniroute run qwen` 如果没有它将以明确错误退出 `2`。
- `--port <port>` — 本地 OmniRoute 端口（默认 `20128`，在设置 `--remote` 时被忽略）。在所有 `setup-*` 和两个启动器上均存在。
- `omniroute run` 退出代码：子 CLI 的自身退出代码被逐字传播；`2` = 无效参数（不支持的目标，缺少必需的 `--model`，容器保护）；`127` = 目标二进制不在 `PATH` 中；`130`/`143`/`129` 当启动被 `SIGINT`/`SIGTERM`/`SIGHUP` 结束时；`1` = 其他运行时启动失败。
- 两个启动器（`launch`、`launch-codex`）接受 `--profile <name>` 以选择由 `setup-claude` / `setup-codex` 写入的配置文件，并为底层的 `claude` / `codex` 二进制文件传递参数。

交互式选择器也与设置配方共享：

```bash
# 从活动的本地或远程模型目录中选择并配置目标。
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` 目前委托给 `codex`、`claude`、`opencode`、`qwen`、`aider`、`goose`、`cline`、`continue` 和 `kilo` 的测试配方。仅限 IDE、MITM 和仅限指南的目录条目仍然是显式的 `setup-*`/手动流程，并未作为可启动目标呈现。

> `setup-opencode` 是 **轻量级的兼容 openai** 的 OpenCode 集成。
> 还有一个更丰富的插件集成 — `omniroute setup opencode` — 它安装 `@omniroute/opencode-plugin`。这两个命令不同；上表记录了 `setup-opencode`。

---

## 本地使用

在 `localhost:20128` 上运行 OmniRoute，只需为您的工具运行设置命令。目录从本地服务器获取。

```bash
# Codex: 为每个匹配的模型写入配置文件到 ~/.codex/
omniroute setup-codex
codex --profile glm52            # 使用生成的配置文件

# Claude Code: 为每个模型写入配置文件，然后启动一个
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: 写入与所有目录模型兼容的 openai 提供者
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # 通过 {env:OMNIROUTE_API_KEY} 引用，绝不存储在磁盘上
opencode -m omniroute/glm/glm-5.2 "..."

# 没有自动发现的工具需要显式模型：
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 预览而不写入任何内容：
omniroute setup-continue --dry-run
```

在不写入任何配置的情况下启动（仅环境注入）：

```bash
omniroute launch                 # Claude Code → 本地 OmniRoute
omniroute launch-codex           # Codex CLI → 本地 OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 显式命令路径：传递后面的所有内容 --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 远程使用

将任何设置命令指向远程 OmniRoute，使用 `--remote` + `--api-key`。目录从远程获取；配置写入您的本地机器。

```bash
# OpenCode 针对远程 VPS，仅保留 glm/kimi 模型
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 首先导出 OMNIROUTE_API_KEY

# 从远程目录获取 Codex 配置文件
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 直接针对远程启动 CLI
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

无需每次都传递 `--remote`/`--api-key`，只需登录一次，让 **活动上下文** 自动提供它们：

```bash
omniroute connect 192.168.0.15        # 生成一个作用域令牌，存储上下文
omniroute setup-codex                 # ← 现在使用远程目录
omniroute setup-opencode              # ← 同上
omniroute launch                      # ← Claude Code 针对远程
```

请参阅 [远程模式](./REMOTE-MODE.md) 以获取上下文、作用域和令牌管理。

---

## 基础 URL 约定（哪些工具需要 `/v1`）

OmniRoute 在 `/v1` 上暴露 OpenAI 接口，在根目录上暴露 Anthropic 接口，并在 `/v1beta` 上提供原生 Gemini 接口。每个集成都连接到其工具所期望的形式（在命令源中验证）：

| 集成                                                                       | 写入的基础 URL | `/v1`?                                   |
| -------------------------------------------------------------------------- | -------------- | ---------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | 根             | 否 — Cline 附加 `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | 根             | 否 — Goose 附加路径                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 根             | 否 — LiteLLM 附加 `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | 带 `/v1`       | 是                                       |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 根             | 否 — Claude Code 附加 `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | 带 `/v1`       | 是                                       |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | 带 `/v1`       | 是                                       |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 根             | 否 — SDK 附加 `/v1beta/models/…`         |

---

## 保持本地依赖更新：`--include=optional`

当你使用 `omniroute update` 更新时（在确认后，或使用 `--apply`），
OmniRoute 会自动运行带有 `--include=optional` 的安装：

```bash
npm install -g omniroute@latest --include=optional
```

这**不是**你传递给 `omniroute update` 的标志——它始终由更新器应用。它保证 `optionalDependencies`（`better-sqlite3`、`keytar`、`tls-client`、LLMLingua SLM 堆栈）在更新后仍然存在，即使你的 npm 配置中设置了 `omit=optional`，否则会默默地丢弃本地 SQLite 驱动程序和操作系统密钥绑定。要预览确切的命令而不应用：

```bash
omniroute update --dry-run
# [干运行] 将运行：npm install -g omniroute@latest --include=optional
```

其他 `omniroute update` 标志（在源代码中验证）：`--check`（如果过时则退出 1）、`--apply`（无提示安装）、`--changelog`、`--no-backup`、`--yes`。

---

## 通过 `omniroute run gemini` 使用 Google Gemini CLI

与 `@google/gemini-cli` 0.50.0 验证的合同：CLI 尊重 `GOOGLE_GEMINI_BASE_URL` 并对其发出 `POST /v1beta/models/<model>:generateContent`
（和 `:streamGenerateContent?alt=sse`）——这正是 OmniRoute 的本地
Gemini 接口（`/v1beta`）。`omniroute run gemini` 会自动连接这些：

- `GOOGLE_GEMINI_BASE_URL` → 活动的 OmniRoute 基础 URL（根，不带 `/v1`）；
- `GEMINI_API_KEY` → 解析后的 OmniRoute 凭证（选项/环境/上下文）；
- **临时隔离的 `GEMINI_CLI_HOME`**，其 `.gemini/settings.json`
  选择 `gemini-api-key` 认证，因此存储的 Google OAuth 会话（代码助手）
  永远不会覆盖 OmniRoute 指定的启动——退出后删除；
- **环境卫生**：子环境中清除了 `GOOGLE_API_KEY`、
  `GOOGLE_GENAI_USE_VERTEXAI` 和 `GOOGLE_GENAI_USE_GCA`（这些会将
  认证重定向到 Vertex/代码助手），并设置 `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  作为备用——其他 `run` 目标也会对其自身的冲突变量进行相同处理；
- 从 `--provider`/`--model` 注入 `--model <id>`。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini 的工作区信任保护在无头模式下仍然适用——自己传递
`--skip-trust`（或交互式信任目录）；启动器故意不绕过它。这个启动器与 **ACP
注册**（`src/lib/acp/registry.ts`，`gemini --acp`）不同，后者仍然是
`/dashboard/acp-agents` 的代理协议集成。

---

## 实际烟雾测试（自愿参与）

确定性启动计划回归在 CI 中运行（`tests/unit/cli/run-command.test.ts`，
`tests/unit/cli/run-execution.test.ts`）。为了验证真实的二进制文件与真实的
OmniRoute 服务器，存在一个自愿参与的工具在
`tests/integration/upstream-cli-smoke.int.test.ts`。它不会自动运行
（每个子测试都会跳过，除非 `RUN_CLI_SMOKE=1`），通过环境变量
名称传递凭证（从不通过值），从任何记录的输出中删除密钥形状的字符串，跳过
未安装二进制文件的目标，并将失败分类为
认证 / 上游 / 配置，而不是简单的布尔值：

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

可选：`OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` 限制测试范围；
`OMNIROUTE_SMOKE_TIMEOUT_MS` 覆盖每个目标的 120 秒超时。

---

## 另请参阅

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md) — 更深入的 Claude Code 指南
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md) — 一次性的 `[model_providers.omniroute]` 基础设置
- [远程模式](./REMOTE-MODE.md) — 上下文、范围访问令牌、驱动远程服务器
- [CLI 工具参考](../reference/CLI-TOOLS.md) — 支持工具和仪表板页面的完整目录
- [安装指南](./SETUP_GUIDE.md) — 安装方法和首次运行入门
