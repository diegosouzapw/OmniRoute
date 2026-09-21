# Remote Mode (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

在你的笔记本电脑上运行 `omniroute` CLI，而 OmniRoute 本身则运行在其他位置
（VPS、家庭服务器或 Tailnet 中的另一台机器）。你只需使用
`omniroute connect` 登录一次，此后**每个** CLI 命令都会以该远程
服务器为目标——命令相同、输出相同，只是在远程服务器上执行。

无需安装第二个工具：远程模式就是常规的 `omniroute` CLI
加上具有作用域的**访问令牌**。

```bash
npm install -g omniroute                 # 常规 CLI
omniroute connect 192.168.0.15           # 登录（密码 → 具有作用域的令牌）
omniroute models list                    # ← 现在列出远程服务器的模型
omniroute configure codex                # ← 根据远程目录写入本地 Codex 配置
```

---

## 工作原理

```
你的笔记本电脑                          远程 OmniRoute（VPS）
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  （密码 → 令牌）            │
│  上下文：vps        │ ───────────────►  │ 签发具有作用域的访问令牌        │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ 每个管理路由都会根据令牌的       │
│ 在本地写入配置       │ ◄───────────────  │ 作用域进行检查                  │
│                    │                   └───────────────────────────────┘
└────────────────────┘
```

- **上下文**分别存储一个服务器（`~/.omniroute/config.json`，`chmod 600`）。
  `omniroute contexts use <name>` 用于切换活动服务器；`default` 表示本地。
- **访问令牌**（`oma_live_…`）用于授权管理命令。它们不同于推理 API 密钥
  （`sk-…`，用于 `/v1/chat/completions`）。
- 服务器端仅存储令牌的 SHA-256 哈希值。明文仅在创建时显示
  **一次**。

---

## 连接

### 使用管理密码（引导方式）

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 的管理密码：********
# ✔ 已连接到 http://192.168.0.15:20128 — 上下文 '192.168.0.15'（作用域：admin）
```

默认情况下，密码流程会签发一个 **admin** 令牌（你持有密码，因此
已经拥有完全控制权）。使用 `--scope` 缩小作用域：

```bash
omniroute connect 192.168.0.15 --scope write
```

选项：`--port <p>`（当主机中未包含端口时）、`--name <ctx>`（上下文名称）、
`--scope read|write|admin`。完整 URL 会按原样使用：
`omniroute connect https://omni.example.com`。

### 使用预先生成的令牌

在仪表板中生成一个具有作用域的令牌（或使用 `omniroute tokens create`），然后
粘贴该令牌——无需密码：

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI 会通过 `GET /api/cli/whoami` 验证令牌，并将其保存为活动上下文。

---

## 作用域

三个层级，按层次包含（`admin ⊃ write ⊃ read`）：

| 作用域  | 可以执行                                                                |
| ------- | ----------------------------------------------------------------------- |
| `read`  | 列出/检查——`models list`、`providers status`、`logs`、`usage`、`cost`   |
| `write` | read **+** 配置/应用——`setup-codex`、`keys add`、`config set`、组合操作 |
| `admin` | write **+** 管理——`tokens` CRUD、添加提供者、服务、策略、oauth          |

服务器会根据 HTTP 方法推断每个路由所需的作用域
（`GET`→read，变更操作→write），并通过管理员白名单限制敏感接口
（`/api/cli/tokens`、`/api/providers` 变更操作、`/api/oauth`、`/api/services`，……）。
作用域不足的令牌会收到 `403` 响应以及清晰的说明消息。

> 会启动进程的路由（`/api/services/*`、`/api/mcp/*`，……）仍然
> **仅限回环地址访问**——无论作用域为何，远程令牌都无法访问这些路由。

---

## 在远程安装中连接 Antigravity

Antigravity 使用 Google 的第一方/原生应用同意屏幕。只有当**批准登录的浏览器能够访问环回重定向地址**（`http://127.0.0.1:<port>/callback`）时，Google 才会返回授权码。在远程 VPS 安装中，该环回地址位于服务器上，而不是你的计算机上，因此同意屏幕会**一直卡住，且永远不会生成授权码**——常规的“粘贴回调 URL”备用方案也没有任何内容可粘贴。（这是 Google 端的限制：任何使用内置 Antigravity 桌面客户端的代理都会出现同样的卡住问题，并非 OmniRoute 独有。）

仪表板会提前检测到这一情况，避免你被卡住：从非 localhost 地址打开 **Providers → Antigravity → Connect** 时，通用的“复制回调 URL”提示会替换为下面两种解决方案，并且每种方案都已自动填入你的主机和端口。（局域网地址也算——对于此回调而言，`192.168.x.x` 并不是 localhost。）

支持通过以下两种方式将 Antigravity 连接到远程 OmniRoute。

### 选项 A — 本地登录辅助工具（推荐）

在**你自己的计算机**上运行 OAuth，因为该计算机可以访问 `127.0.0.1`。辅助工具会直接与 Google 通信，因此可以在仪表板版本无法完成授权的位置完成同意流程。

**如果你已经建立连接**（`omniroute connect <host>`），则无需复制任何内容——辅助工具会替你将凭据传送到该安装：

```bash
# 在你的本地计算机上（需要 Node.js + 浏览器）：
omniroute connect 192.168.0.15        # 仅一次——生成具有管理员作用域的上下文令牌
npx omniroute login antigravity
#   ↳ 打开 Google 同意页面，在本地环回端口捕获回调，
#     完成交换，并将凭据 POST 到当前上下文：
#
#   Antigravity 已连接到 http://192.168.0.15:20128（连接 abc123）。
#   无需粘贴任何内容——你可以关闭此终端。
```

只要当前上下文指向另一台计算机，就会自动推送。可使用 `--push` / `--no-push` 强制启用或禁用推送，或使用 `--context <name>` 指定特定上下文。

**如果你的计算机无法访问 VPS**（受防火墙限制、没有 SSH、使用隔离网络的工作电脑），辅助工具仍然可用——它实际上只需连接 Google。使用 `--no-push`，或者直接让推送失败：它会回退为输出凭据数据，而不会丢弃你已经完成的授权。

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

然后，在**远程**仪表板中打开 **Providers → Antigravity → Connect**，并将 `omniroute-cred-v1.…` 数据粘贴到 **Step 2** 字段中（该字段既接受回调 URL，也接受凭据数据）。OmniRoute 会将其解码，在服务器端运行 Cloud Code 引导流程，并持久保存连接。

> 该数据包含刷新令牌——请像对待密码一样保护它。使用推送方式时，它会通过上下文中经过身份验证的连接发送一次；使用粘贴方式时，则会通过仪表板连接发送。无论使用哪种方式，它都会以加密形式静态存储，并且成功推送后绝不会将其输出到终端。

标志：`--no-browser`（输出 URL，而不是自动打开）、`--port <n>`（固定环回端口）、`--timeout <ms>`、`--push` / `--no-push`（覆盖自动传送行为）、`--context <name>`（指定特定上下文）。

### 选项 B — SSH 本地转发隧道

如果你拥有 VPS 的 SSH 访问权限，请转发仪表板端口，使环回回调能够通过隧道返回服务器：

```bash
# 在你的本地计算机上：
ssh -L 20128:127.0.0.1:20128 user@your-vps
# 然后在你的本地浏览器中打开 http://localhost:20128，并按常规方式连接 Antigravity
# ——现在，127.0.0.1:20128/callback 重定向会通过 SSH 到达 VPS。
```

由于你通过 `localhost:20128` 访问仪表板，因此 Google 同意流程可以完成，回调也会通过同一条隧道传送到服务器——无需凭据数据。请保持隧道开启，直到连接显示为活动状态。

与下面使用固定环回地址的提供者不同，**这里一次转发就足够了**：Antigravity 回调使用的就是仪表板端口，因此无需为提供者特定的第二个端口建立隧道。

> 完全无头的替代方案（无需辅助工具，也无需隧道）是配置你**自己的** Google OAuth Web 凭据和公共基础 URL；请参阅该提供者的 OAuth 环境变量。上述两种方案都无需进行额外的 Google 设置。

---

## 在远程安装中连接 Codex / Grok（固定回环地址提供者）

Codex、xAI（`xai-oauth`）和 Grok CLI（`grok-cli`）会在其上游 OAuth 应用中注册一个**固定的**回环
`redirect_uri`。OmniRoute 无法更改它——提供者始终会将浏览器重定向到同一个硬编码地址：

| 提供者      | 提供者重定向到的固定回调地址          |
| ----------- | ------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback` |
| `xai-oauth` | `http://127.0.0.1:56121/callback`     |
| `grok-cli`  | `http://127.0.0.1:56122/callback`     |

这里的 `localhost` 指的是**运行浏览器的机器**，而 OmniRoute 的 PKCE
回调服务器监听的是**服务器的**回环地址。如果通过类似
`http://192.168.0.15:20128` 的 LAN 地址打开仪表板，两者就无法相遇：授权
代码会被发送到您自己笔记本电脑的 `localhost:1455`，但那里没有任何程序监听，
因此提供者会使登录失败，却不显示任何错误。

仪表板会在打开弹出窗口前检测到这一情况，并显示隧道命令，
而不是让登录静默失败（#8046）。

### 修复方法——转发**两个**端口

```bash
# 在运行浏览器的机器上：
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# 然后访问 http://localhost:20128，并从那里连接 Codex
```

必须配置两个转发，仅转发其中一个仍然会失败：

- **`20128`**（仪表板端口）使来源成为真正的本机 localhost，而这正是
  让 OmniRoute 启动 PKCE 回调服务器的条件——LAN 来源永远
  不会进入该分支。
- **`1455`**（提供者的固定回调端口）是浏览器被重定向回来的位置；
  它必须通过隧道连接到服务器的回环地址。

连接 xAI 或 Grok CLI 时，将 `1455` 替换为 `56121`/`56122`，并将 `20128` 替换为
您实际使用的仪表板端口。在连接显示为活动状态之前，请保持隧道开启。

> **没有 SSH 访问权限？** Codex 和 Grok CLI 也支持粘贴令牌——连接对话框中的
> **粘贴 API 密钥** / **导入 auth.json** 选项卡。该方式不使用回环
> 回调，因此可从任何来源使用。Codex 还支持直接使用访问
> 令牌或 `~/.codex/auth.json` 会话数据。

---

## 管理令牌

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ 密钥仅显示一次——请立即复制
omniroute tokens list                 # 已掩码：ID、名称、作用域、前缀、状态、过期时间
omniroute tokens revoke <id|prefix>   # 立即撤销
omniroute tokens scopes               # 说明三种作用域
```

`tokens` 命令需要**管理员**凭据。您也可以在仪表板的
**设置 → 访问令牌**下管理令牌（创建、撤销、仅复制一次）。

---

## 从远程目录配置编码 CLI

`omniroute configure` 会读取**活动服务器的**实时模型目录，并在
**您的**机器上写入配置。

```bash
omniroute configure codex
#   提供者：glm、kmc、ollamacloud、opencode-go、……
#   提供者：glm
#   模型 ID：glm/glm-5.2
#   ✔ 已写入 ~/.codex/glm52.config.toml
#   使用方式：codex --profile glm52

# 非交互模式
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# 将常用模型保留在交互式选择器顶部
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

选择器只会在本地 `model-preferences.json` 文件中保存模型 ID（绝不会保存 URL 或凭据），
并按上下文和 CLI 目标划分作用域。收藏项会显示在最近选择项之前；使用
`--unfavorite` 可从该上下文/目标列表中移除所选模型。

写入的配置文件通过环境变量（`OMNIROUTE_API_KEY`）引用推理密钥——
密钥绝不会写入磁盘。有关一次性的 Codex 基础设置
（`[model_providers.omniroute]` 块），请参阅
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md)。

### 针对远程启动 CLI（不写入配置）

`omniroute run <target>` 同样会遵循活动上下文：远程基础 URL
和上下文凭据仅会被注入启动的进程中。

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → 远程
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# 准确预览将要启动的内容（仅显示环境变量的键名，绝不显示值）：
omniroute run codex --dry-run --json
```

目标：`claude`、`codex`、`aider`、`goose`、`opencode`、`qwen`、`gemini`
（单一来源：`bin/cli/cli-manifest.mjs`）。Qwen 和 Gemini 会使用一个
临时隔离的主目录运行，该目录会在退出时移除，因此启动过程绝不会修改——
或泄露到——您的个人工具配置中。

### 各 CLI 的设置命令

每个受支持的 CLI 都有一个支持远程的设置命令（均遵循活动
上下文，也可使用 `--remote <url> --api-key <key>`）：

| CLI         | 命令                       | 写入内容                                                                                                                                                   |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` 配置文件（每个模型一个）                                                                                                     |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json`（每个模型一个）                                                                                                  |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — 包含目录中所有模型的 `omniroute` OpenAI 兼容提供者（运行 `opencode -m omniroute/<model>`）                            |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json`（CLI 模式）+ 输出供粘贴的 VS Code 扩展设置（OpenAI 兼容，Base URL **不含** `/v1`）                              |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json`（CLI）+ VS Code `kilocode.*` 设置 — OpenAI 兼容，Base URL **包含** `/v1`                                                   |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml`（VS Code/JetBrains + `cn` CLI）— `provider: openai`，`apiBase` **包含** `/v1`，通过 `${{ secrets.OMNIROUTE_API_KEY }}` 获取密钥  |
| Cursor      | `omniroute setup-cursor`   | 输出应用内操作步骤（Settings → Models → Override OpenAI Base URL **包含** `/v1` + 密钥 + 模型）。Cursor 配置存储在不透明的 SQLite 中 — 仅适用于聊天面板    |
| Roo Code    | `omniroute setup-roo`      | 写入 Roo 导入 JSON（`~/.omniroute/roo-settings.json`）+ 设置 `roo-cline.autoImportSettingsPath` + 输出 UI 操作步骤（OpenAI 兼容，Base URL **包含** `/v1`） |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` 提供者，`base_url` **包含** `/v1`，通过 `$OMNIROUTE_API_KEY` 获取密钥                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **不含** `/v1` + `GOOSE_MODEL`）+ 环境变量配置方法                                  |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml`（`openai-api-base` **不含** `/v1` + `model: openai/<id>`）+ 环境变量配置方法（`aider --message --yes`）                                |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 中的 `modelProviders.openai` 条目 + `~/.qwen/.env` 中的 `OMNIROUTE_API_KEY`                                                     |

```bash
# OpenCode（OpenAI 兼容提供者、所有目录模型、远程 VPS）
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # 仅保留匹配的模型
opencode -m omniroute/glm/glm-5.2 "..."          # 请先导出 OMNIROUTE_API_KEY
```

> OpenCode 还提供功能更丰富的**插件**集成：`omniroute setup opencode`
> （现已通过 `--remote` 支持远程模式）会安装 `@omniroute/opencode-plugin`。
> `setup-opencode` 是轻量级的 OpenAI 兼容替代方案。API 密钥通过
> `{env:OMNIROUTE_API_KEY}` 引用 — 绝不会写入磁盘。
>
> 在 OpenCode v2 上，请改用 `@omniroute/opencode-plugin-v2`：目录相同，
> 但加载器约定不同。连接集成后，它会从 OpenCode 自身的凭据
> 存储中读取密钥，因此远程网关完全不需要在 `opencode.json` 中配置密钥。

---

## 管理上下文（在服务器之间切换）

**上下文**是已保存的服务器配置（baseUrl + 凭据 + 作用域）。`omniroute connect`
会创建一个上下文并将其设为活动上下文；此后的每个命令都会以该上下文为目标。使用
`omniroute contexts` 管理并切换上下文：

```bash
omniroute contexts list            # 所有上下文；活动上下文以 ● 标记
omniroute contexts current         # 活动服务器、认证状态和作用域
```

```text
  | 名称    | 基础 URL                  | 认证  | 作用域 | 描述
● | vps     | http://100.67.86.91:20128 | token | admin | 远程 OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**切换服务器** — 此后的每个命令都会使用活动上下文：

```bash
omniroute contexts use vps         # → 现在所有命令都会访问远程 VPS
omniroute tokens list              #   （针对该 VPS 运行）

omniroute contexts use default     # → 返回 localhost
omniroute tokens list              #   （针对本地服务器运行）
```

**手动添加上下文**（而不是使用 `connect`），以及查看或重命名上下文：

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "暂存服务器"
omniroute contexts show staging    # 查看一个上下文的完整详细信息
omniroute contexts rename staging stg
```

**删除上下文** — 系统会提示确认；传入 `--yes` 可跳过确认
（脚本/非交互式 shell 必须使用，否则将安全地拒绝操作）：

```bash
omniroute contexts remove stg --yes
```

> 无法删除 `default`（localhost）。删除活动上下文后，会回退到
> `default`。提示：删除上下文只会移除**本地**保存的凭据 —
> 要真正撤销访问权限，请在服务器上使用 `omniroute tokens revoke <id>` 撤销令牌。

**导出/导入**上下文（例如，在计算机之间迁移上下文）。当操作系统
钥匙串可用时，新上下文仅持久保存钥匙串引用；凭据不会被复制到导出内容中：

```bash
omniroute contexts export --out contexts.json     # 默认：stdout
omniroute contexts import contexts.json            # 覆盖；使用 --merge 保留现有内容
omniroute contexts migrate --yes                  # 将旧版明文令牌迁移到钥匙串
```

在没有可用操作系统钥匙串的无头系统上，CLI 会回退到
权限模式为 `0600` 的 `config.json`，并显示一次性警告。应将此回退方式生成的导出内容
（以及迁移前的任何旧版配置）视为机密材料。

---

## 快速端到端检查

以下是一套可直接复制粘贴的生命周期操作，用于从头验证远程设置 — 连接、签发一个
有作用域限制的令牌、路由命令、切换回来并清理。请将
`192.168.0.15` 替换为服务器的主机名/IP（Tailscale、LAN 或公共
`https://…` URL）。

```bash
# 1. 连接（密码 → 管理员令牌，保存为上下文并设为活动上下文）
omniroute connect 192.168.0.15                 # 或：--key oma_live_xxxx（无需密码）
omniroute contexts current                     # 显示远程服务器和作用域

# 2. 使用它 — 管理命令现在会针对远程服务器运行
omniroute tokens create --name laptop --scope read   # 签发权限范围更窄的令牌
omniroute tokens list                                 # 来自远程服务器的脱敏列表

# 3. 来回切换
omniroute contexts use default                 # → 本地
omniroute contexts use 192-168-0-15            # → 再次切换到远程（名称来自 `contexts list`）

# 4. 清理。注意：`contexts remove` 只会删除本地凭据 —
#    它不会撤销服务器上的令牌。如果你确实想要终止访问权限，
#    请先在服务器端撤销令牌。
omniroute tokens revoke <id|prefix>            # 终止服务器上的访问权限
omniroute contexts remove 192-168-0-15 --yes   # 删除本地上下文（即使处于活动状态，也会回退到 default），且不提示
```

> `--yes` 会使 `contexts remove` 以非交互方式运行（脚本/CI 中必须使用；如果不使用，
> 非交互式 shell 会安全地拒绝操作，而不是一直挂起）。删除
> **活动**上下文后，会自动回退到 `default`。

---

## 安全说明

- 令牌明文仅显示一次；只会持久化保存 SHA-256 哈希值（与 API 密钥相同）。
- `omniroute connect` 复用登录暴力破解锁定机制和审计日志记录。
- 传输时优先使用 HTTPS 或 Tailnet；为方便在 LAN/Tailscale 中使用，仅指定主机时默认为 `http://`——如需 TLS，请传入完整的 `https://…` URL。
- 首选的本地上下文文件是 `~/.omniroute/config.json`（`chmod 600`），其中仅包含 `credentialRef`；令牌本身存储在操作系统密钥链（`keytar`）中，且绝不会输出到日志。对于原生密钥链不可用的无头安装，将明确回退到使用同一个权限为 `0600` 的文件，并发出一次警告。安装密钥链后端后，请使用 `omniroute contexts migrate --yes`。

---

## API 端点（参考）

| 方法   | 路由                  | 身份验证方式 | 权限范围                |
| ------ | --------------------- | ------------ | ----------------------- |
| POST   | `/api/cli/connect`    | 管理密码     | —（公开，但受密码保护） |
| GET    | `/api/cli/whoami`     | 访问令牌     | read                    |
| GET    | `/api/cli/tokens`     | 访问令牌     | admin                   |
| POST   | `/api/cli/tokens`     | 访问令牌     | admin                   |
| DELETE | `/api/cli/tokens/:id` | 访问令牌     | admin                   |

完整架构请参阅 [openapi.yaml](../openapi.yaml)。
