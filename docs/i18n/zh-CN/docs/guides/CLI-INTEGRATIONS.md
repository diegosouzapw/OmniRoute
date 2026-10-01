# CLI Integrations (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute 附带一系列 `setup-*` 命令，用于配置编码 CLI（Codex、Claude Code、OpenCode、Cline 等）以使用 OmniRoute 作为其后端——这样工具就可以与**一个**端点通信，而 OmniRoute 会自动回退并路由到正确的提供者。每个命令都会从运行中的 OmniRoute（本地或远程）读取**实时**模型目录，并在**您的**机器上写入工具自己的配置文件。只要工具支持，API 密钥就会通过环境变量引用。下面列出了那些持久化工具本地环境文件的命令。

还有一个通用启动器——`omniroute run <target>`——它会启动 `claude`、`codex`、`aider`、`goose`、`opencode`、`qwen` 或 `gemini`，并注入正确的环境变量，而无需写入任何配置。目标及其别名来自规范清单 `bin/cli/cli-manifest.mjs`（`claude-code|cc|anthropic`、`codex-cli|openai-codex|openai`、`goose-cli`、`open-code`、`qwen-code`、`gemini-cli`），并且 `omniroute completion` 提供相同的源自清单的目标词。旧版按工具启动器——`omniroute launch` (Claude Code) 和 `omniroute launch-codex` (Codex)——仍然可用。

提供者入驻可从相同的本地/远程上下文进行。下面的 API 优先命令将管理认证与提供者凭据分开，并且从不在结构化输出中打印凭据：

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

对于脚本，请优先使用 `--credential-stdin` 或 `--credential-env`；`--credential` 保留用于受控的本地使用。`providers remove` 在非交互式终端上需要 `--yes`，并且所有五个命令都遵循活动上下文或全局 `--base-url`/`--api-key` 选项。

提供者选择器会拒绝模糊的 ID 前缀、名称或提供者名称；当有多个连接匹配时，请使用完整的连接 ID。创建和编辑命令会读回保存的连接，并且删除操作会验证它是否不再可读。导入会跳过现有的提供者/名称对。导入的条目不能覆盖提供给 CLI 的管理端点、上下文或管理凭据。

对于两个最丰富的集成的一次性、手动基础设置，请参阅按工具的深入探讨：

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md)
- [远程模式](./REMOTE-MODE.md) — 从您的笔记本电脑驱动远程 OmniRoute (VPS / Tailnet)
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot 扩展；它也可以在编辑器内部为您运行这些 `setup-*` 命令

---

## 总表

每个命令都会遵循**当前活动上下文**（使用 `omniroute connect` 设置，参见
[远程模式](./REMOTE-MODE.md)）或显式指定的 `--remote <url> --api-key <key>` 标志。
下文中的“本地与远程”含义如下：不使用任何标志时，它以 `http://localhost:20128`
为目标；使用 `--remote`（或活动的远程上下文）时，它会从相应服务器获取目录，
并在本地写入配置。

| 命令                       | 工具                    | 写入内容                                                                                                                                                         | 关键标志                                                                                                                                   | 本地与远程 |
| -------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `omniroute setup-codex`    | OpenAI Codex CLI        | `~/.codex/<name>.config.toml` — 每个兼容的文本模型对应一个配置文件（`codex --profile <name>`）                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 两者       |
| `omniroute setup-claude`   | Claude Code             | `~/.claude/profiles/<name>/settings.json` — 每个匹配的模型对应一个配置文件（`CLAUDE_CONFIG_DIR`）                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 两者       |
| `omniroute setup-opencode` | OpenCode（兼容 OpenAI） | `~/.config/opencode/opencode.json` — 包含目录中所有模型的 `omniroute` 提供者（`opencode -m omniroute/<model>`）                                                  | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 两者       |
| `omniroute setup-cline`    | Cline                   | `~/.cline/data/{globalState,secrets}.json`（CLI 模式）+ 输出 VS Code 扩展设置                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 两者       |
| `omniroute setup-kilo`     | Kilo Code               | `~/.local/share/kilo/auth.json`（CLI）+ 如果存在 VS Code `settings.json`，则将 `kilocode.*` 合并到其中                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 两者       |
| `omniroute setup-continue` | Continue / `cn` CLI     | `~/.continue/config.yaml` — `provider: openai` 模型，通过 `${{ secrets.OMNIROUTE_API_KEY }}` 提供密钥                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 两者       |
| `omniroute setup-cursor`   | Cursor                  | 无 — 输出应用内操作步骤（Cursor 配置存储在不透明的 SQLite 中）                                                                                                   | `--remote` `--api-key` `--only` `--port`                                                                                                   | 两者       |
| `omniroute setup-roo`      | Roo Code                | `~/.omniroute/roo-settings.json`（导入文档）+ 如果存在 VS Code `settings.json`，则设置 `roo-cline.autoImportSettingsPath`                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 两者       |
| `omniroute setup-crush`    | Crush                   | `~/.config/crush/crush.json` — `openai-compat` 提供者，通过 `$OMNIROUTE_API_KEY` 提供密钥                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 两者       |
| `omniroute setup-goose`    | Goose                   | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`）+ 输出环境变量配置方法                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 两者       |
| `omniroute setup-aider`    | Aider                   | `~/.aider.conf.yml`（`openai-api-base` + `model: openai/<id>`）+ 输出环境变量配置方法                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 两者       |
| `omniroute setup-qwen`     | Qwen Code               | `~/.qwen/settings.json` — V4 `modelProviders.openai` 数组 + `~/.qwen/.env` 中的 `OMNIROUTE_API_KEY`                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 两者       |
| `omniroute setup-5dive`    | 5dive（智能体集群）     | 不在 `$HOME` 下写入任何内容 — 通过 `5dive agent auth set` 写入 5dive **身份验证配置文件**（`/var/lib/5dive/auth-profiles/<name>/`）；仅限 root，在集群主机上运行 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | 两者       |
| `omniroute run <target>`   | 运行时启动（通用）      | 无 — 使用正确的环境变量和参数启动 `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`；Qwen 和 Gemini 使用临时隔离的主目录                               | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 两者       |
| `omniroute launch`         | Claude Code             | 无 — 启动 `claude`，并注入 `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                           | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 两者       |
| `omniroute launch-codex`   | OpenAI Codex CLI        | 无 — 启动 `codex`，并通过 `-c` 标志注入 `omniroute` 提供者                                                                                                       | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 两者       |

标志说明（已在命令源代码中验证）：

- `--remote <url>` — 从远程 OmniRoute 获取目录（覆盖 `--port`
  和活动上下文）。`--api-key <key>` 为该服务器提供凭据
  （默认为 `OMNIROUTE_API_KEY` 环境变量，或活动上下文的令牌）。
- `--only <patterns>` — 以逗号分隔的子字符串；仅保留匹配的模型 ID
  （例如 `--only glm,kimi`）。可用于 `setup-codex`、`setup-claude`、
  `setup-opencode`、`setup-continue`、`setup-cursor`、`setup-crush`。
- `--dry-run` — 在不改动文件系统的情况下，准确打印将要写入的内容。
  适用于所有 `setup-*` 命令，**但 `setup-cursor` 除外**
  （该命令从不写入文件）。
- `--model <id>` — 对于没有模型自动发现功能的工具，此选项是必需的
  （也可以通过交互方式选择）：Cline、Kilo、Roo、Goose、Qwen、Aider、5dive。
  这些工具也接受 `--yes`，用于非交互式运行（此时必须提供 `--model`）。
  `setup-opencode` 接受 `--model`，用于设置默认的顶层模型。
- `omniroute run` 上的 `--model <id>` 遵循清单中的各目标接线规则
  （`bin/cli/cli-manifest.mjs`）：**aider** 接收 `--model openai/<id>`，
  **opencode** 接收 `--model omniroute/<id>`（仅当 id 尚未包含该前缀时才会添加）；
  **qwen** 和 **gemini** 原样接收该 id；**claude** 通过 `ANTHROPIC_MODEL` 获取，
  **goose** 通过 `GOOSE_MODEL` 获取，**codex** 则通过
  `-c model_providers.omniroute.*` 参数获取。**Qwen 是唯一强制要求
  `--model` 的运行目标** — 不带该选项运行 `omniroute run qwen` 时，
  会以退出码 `2` 退出并显示明确的错误。
- `--port <port>` — 本地 OmniRoute 端口（默认为 `20128`，设置 `--remote`
  时会被忽略）。所有 `setup-*` 命令和两个启动器都支持此选项。
- `omniroute run` 退出码：子 CLI 自身的退出码会原样传播；
  `2` = 参数无效（不支持的目标、缺少必需的 `--model`、容器保护）；
  `127` = 在 `PATH` 中找不到目标二进制文件；
  当启动因 `SIGINT`/`SIGTERM`/`SIGHUP` 结束时，分别为 `130`/`143`/`129`；
  `1` = 其他运行时启动失败。
- 两个启动器（`launch`、`launch-codex`）都接受 `--profile <name>`，
  用于选择由 `setup-claude` / `setup-codex` 写入的配置文件，
  并接受要透传给底层 `claude` / `codex` 二进制文件的参数。

设置流程也共享此交互式选择器：

```bash
# 从活动的本地或远程模型目录中选择模型，并配置目标。
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` 目前会委托给已测试的 `codex`、`claude`、
`opencode`、`qwen`、`aider`、`goose`、`cline`、`continue`、`kilo` 和 `5dive`
设置流程。仅限 IDE、MITM 和仅提供指南的目录条目仍需通过明确的
`setup-*`/手动流程进行配置，不会作为可启动目标呈现。

> `setup-opencode` 是**轻量级 openai-compatible** OpenCode 集成。
> 此外还有一个功能更丰富的插件集成 — `omniroute setup opencode` —
> 它会安装 `@omniroute/opencode-plugin`。两者是不同的命令；上表说明的是
> `setup-opencode`。
>
> 该插件分为两个软件包，分别对应一个 OpenCode 主版本，因为这两个
> 加载器需要不同的入口点：
> OpenCode v1 使用 `@omniroute/opencode-plugin`，
> OpenCode v2 使用 `@omniroute/opencode-plugin-v2`。v2 软件包是新增的
> （`0.1.0`），并遵循一个仍在变化的宿主契约，因此它会读取 OpenCode
> 植入目录草稿中的结构，而不是假设某种结构。要安装它，请在
> `opencode.json` 中添加一个 `plugins` 条目；`omniroute setup opencode`
> 仍会安装 v1 软件包。选项和凭据查找顺序请参阅软件包 README。

---

## 本地使用

当 OmniRoute 运行在 `localhost:20128` 时，只需为你的工具运行设置命令即可。模型目录会从本地服务器获取。

```bash
# Codex：为每个匹配的模型将一个配置写入 ~/.codex/
omniroute setup-codex
codex --profile glm52            # 使用生成的配置

# Claude Code：写入各模型的配置，然后启动其中一个
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode：写入包含目录中所有模型的 openai-compatible provider
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # 通过 {env:OMNIROUTE_API_KEY} 引用，绝不写入磁盘
opencode -m omniroute/glm/glm-5.2 "..."

# 不支持自动发现的工具需要显式指定模型：
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 预览而不写入任何内容：
omniroute setup-continue --dry-run
```

完全不写入任何配置即可启动（仅注入环境变量）：

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

# 显式命令路径：原样传递 -- 之后的所有内容
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 远程使用

使用 `--remote` + `--api-key` 将任意设置命令指向远程 OmniRoute。模型目录会从远程获取；配置则写入你的本地计算机。

```bash
# 针对远程 VPS 配置 OpenCode，仅保留 glm/kimi 模型
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 请先导出 OMNIROUTE_API_KEY

# 根据远程模型目录生成 Codex 配置
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 直接针对远程服务启动 CLI
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

无需每次都传递 `--remote`/`--api-key`，只需登录一次，之后让**活动上下文**自动提供这些参数：

```bash
omniroute connect 192.168.0.15        # 签发一个限定作用域的令牌，并存储上下文
omniroute setup-codex                 # ← 现在使用远程模型目录
omniroute setup-opencode              # ← 同上
omniroute launch                      # ← Claude Code 连接远程服务
```

有关上下文、作用域和令牌管理，请参阅[远程模式](./REMOTE-MODE.md)。

---

## 5dive 智能体集群

[5dive](https://5dive.ai) 运行着一组长期运行的编码智能体，每个智能体都作为其各自 Unix 用户名下的一个 systemd 单元运行。它本身并不是编码 CLI，因此 `omniroute run` 没有可启动的对象——`5dive` 是一个**仅配置**目标。

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

这两种形式都会写入一个 5dive **身份验证配置**，此后绑定到该配置的每个 `claude` 席位都会与 OmniRoute 通信。此目标有三项特殊之处：

- **它以 root 身份在集群主机上运行。** 5dive 的操作命令作用于本地 systemd 单元和由 root 所有的状态目录；不存在远程模式。该方案在尚未以 root 身份运行时会通过 `sudo` 重新执行（`--no-sudo` 会禁用此行为并改为打印命令）。
- **除非端点是回环地址，否则必须使用 `https://`。** 智能体的 API 密钥会随每个请求通过该 URL 传输，而且 5dive 拒绝使用指向本机之外的明文端点。专用局域网地址也不例外。
- **每个席位自身固定的模型优先于配置。** 配置中包含 `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`，但如果某个席位仍固定使用原始模型 ID，其首次交互将失败并显示 _"所选模型存在问题"_。传递 `--agent <name>`（可重复使用）也可固定这些席位；若你没有这样做，该方案会打印相应命令。

API 密钥通过 **stdin**（`--api-key=-`）传递给 5dive，因此绝不会出现在 `ps` 输出中。

将配置指向 OmniRoute **组合**而非单一模型，才能让集群获得提供者故障转移能力：在 [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) 记录的运行中，主要端点在交互中途完全宕机后，智能体通过后备端点完成了剩余步骤，且未向外暴露此次中断。

---

## Base URL 约定（哪些工具需要 `/v1`）

OmniRoute 在 `/v1` 提供 OpenAI 接口，在根地址提供 Anthropic 接口，
并在 `/v1beta` 提供原生 Gemini 接口。每项集成都配置为其工具所预期的形式
（已在命令源代码中验证）：

| 集成                                                                       | 写入的 Base URL | `/v1`？                                    |
| -------------------------------------------------------------------------- | --------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | 根地址          | 否 — Cline 会追加 `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | 根地址          | 否 — Goose 会追加路径                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 根地址          | 否 — LiteLLM 会追加 `/v1/chat/completions` |
| `setup-kilo`、`setup-roo`、`setup-continue`、`setup-crush`、`setup-cursor` | 包含 `/v1`      | 是                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`)、`launch`                            | 根地址          | 否 — Claude Code 会追加 `/v1/messages`     |
| `setup-codex`、`launch-codex` (`model_providers.omniroute.base_url`)       | 包含 `/v1`      | 是                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | 包含 `/v1`      | 是                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 根地址          | 否 — SDK 会追加 `/v1beta/models/…`         |
| `setup-5dive`（身份验证配置文件中的 `ANTHROPIC_BASE_URL`）                 | 根地址          | 否 — Claude Code 会追加 `/v1/messages`     |

---

## 更新时保留原生依赖：`--include=optional`

使用 `omniroute update` 更新时（确认后，或使用 `--apply`），
OmniRoute 会运行已内置 `--include=optional` 的安装命令：

```bash
npm install -g omniroute@latest --include=optional
```

这**不是**传递给 `omniroute update` 的标志，而是更新程序始终会应用的选项。
它可确保 `optionalDependencies`（`better-sqlite3`、`keytar`、
`tls-client`、LLMLingua SLM 技术栈）在更新后仍然保留，即使你的 npm 配置中
设置了 `omit=optional` 也不例外；否则，原生 SQLite 驱动程序和操作系统
密钥环绑定会被静默移除。若要在不实际执行的情况下预览确切命令：

```bash
omniroute update --dry-run
# [试运行] 将运行：npm install -g omniroute@latest --include=optional
```

其他 `omniroute update` 标志（已在源代码中验证）：`--check`（如果
已过时则以状态码 1 退出）、`--apply`（无需提示直接安装）、`--changelog`、`--no-backup`、
`--yes`。

---

## 通过 `omniroute run gemini` 使用 Google Gemini CLI

已根据 `@google/gemini-cli` 0.50.0 验证其约定：该 CLI 遵循
`GOOGLE_GEMINI_BASE_URL`，并向其发送 `POST /v1beta/models/<model>:generateContent`
（以及 `:streamGenerateContent?alt=sse`）请求——这与 OmniRoute 的原生
Gemini 接口（`/v1beta`）完全一致。`omniroute run gemini` 会自动完成以下配置：

- `GOOGLE_GEMINI_BASE_URL` → 当前生效的 OmniRoute Base URL（根地址，不含 `/v1`）；
- `GEMINI_API_KEY` → 解析后的 OmniRoute 凭据（来自选项、环境变量或上下文）；
- 一个**临时且隔离的 `GEMINI_CLI_HOME`**，其 `.gemini/settings.json`
  会选择 `gemini-api-key` 身份验证，因此已存储的 Google OAuth 会话（Code Assist）
  永远不会覆盖指向 OmniRoute 的启动配置——退出后会将其删除；
- **环境变量卫生处理**：从子进程环境中清除 `GOOGLE_API_KEY`、
  `GOOGLE_GENAI_USE_VERTEXAI` 和 `GOOGLE_GENAI_USE_GCA`（这些变量会将
  身份验证重定向至 Vertex/Code Assist），并设置
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` 作为双重保险的后备方案——其他
  `run` 目标也会对各自冲突的变量执行相同处理；
- 根据 `--provider`/`--model` 注入 `--model <id>`。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini 的工作区信任防护在无头模式下仍然有效——请自行传递
`--skip-trust`（或以交互方式信任该目录）；启动器刻意不会绕过此防护。
此启动器不同于 **ACP 注册**
（`src/lib/acp/registry.ts`、`gemini --acp`），后者仍然是
`/dashboard/acp-agents` 的智能体协议集成。

---

## 真实冒烟扫描（选择启用）

确定性的启动计划回归测试会在 CI 中运行（`tests/unit/cli/run-command.test.ts`、
`tests/unit/cli/run-execution.test.ts`）。为了针对真实的 OmniRoute 服务器验证真实的二进制文件，
项目在 `tests/integration/upstream-cli-smoke.int.test.ts` 中提供了一个选择启用的测试工具。
它绝不会自动运行（除非设置 `RUN_CLI_SMOKE=1`，否则每个子测试都会跳过）；它通过环境变量的
名称（绝不会通过值）传递凭据；从所有记录的输出中脱敏形似密钥的字符串；跳过未安装对应
二进制文件的目标；并将失败分类为身份验证 / 上游 / 配置，而不是仅返回布尔值：

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

可选：`OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` 可限制扫描目标；
`OMNIROUTE_SMOKE_TIMEOUT_MS` 可覆盖每个目标 120 秒的超时时间。

---

## 另请参阅

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md) — 更深入的 Claude Code 指南
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md) — 一次性的 `[model_providers.omniroute]` 基础设置
- [远程模式](./REMOTE-MODE.md) — 上下文、限定范围的访问令牌以及远程服务器操作
- [CLI 工具参考](../reference/CLI-TOOLS.md) — 受支持工具及仪表板页面的完整目录
- [设置指南](./SETUP_GUIDE.md) — 安装方法和首次运行引导
