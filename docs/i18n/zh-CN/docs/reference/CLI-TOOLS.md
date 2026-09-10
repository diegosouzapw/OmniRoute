# CLI-TOOLS (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI 工具 — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI 工具 — OmniRoute

最后更新：2026-08-18

OmniRoute 集成了三类 CLI 工具，分布在三个专用仪表板页面上：

| 页面         | 路由                    | 概念                                                           | 数量     |
| ------------ | ----------------------- | -------------------------------------------------------------- | -------- |
| **CLI 代码** | `/dashboard/cli-code`   | 指向 OmniRoute 的编码工具（客户端 → CLI → OmniRoute → 提供者） | 26       |
| **CLI 代理** | `/dashboard/cli-agents` | 指向 OmniRoute 的自主代理（相同流程，更广泛的范围）            | 8        |
| **ACP 代理** | `/dashboard/acp-agents` | OmniRoute 通过 stdio/ACP 作为后端生成的 CLI（反向流程）        | 见注册表 |

遗留路由通过 308 重定向：`/dashboard/cli-tools` → `/dashboard/cli-code`，`/dashboard/agents` → `/dashboard/acp-agents`。

---

## 工作原理

```
CLI 代码 / CLI 代理（消费流程）：
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (全部指向 OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute 路由到正确的提供者)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP 代理（反向生成流程）：
    客户端请求 → OmniRoute → 通过 stdio/ACP 生成 CLI → 响应
```

**好处：**

- 一个 API 密钥管理所有工具
- 仪表板中所有 CLI 的成本跟踪
- 模型切换无需重新配置每个工具
- 本地和远程服务器（VPS、Docker、Akamai、Cloudflare Tunnel）均可使用

---

## 使用 `setup-*` 自动配置

您无需手动编写每个工具的配置。OmniRoute 为每个支持的 CLI 提供一个 `setup-*` 命令，该命令从正在运行的 OmniRoute（本地或远程）读取 **实时** 模型目录，并在您的机器上写入工具自己的配置：

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

每个命令接受 `--remote <url> --api-key <key>`（将本地工具配置为远程 OmniRoute），`--dry-run`（预览而不写入）和 `--port`。没有模型自动发现的工具（Cline、Kilo、Roo、Goose、Aider、Qwen）需要 `--model <id>`（并且 `--yes` 用于非交互式运行）。要启动一个 CLI，并注入正确的环境而不写入任何配置，请使用通用的 `omniroute run <target>` 启动器（claude、codex、aider、goose、opencode、qwen、gemini — 目标和别名来自 `bin/cli/cli-manifest.mjs`）；遗留的每个工具启动器 `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex）仍然可用。Gemini CLI 仅用于启动：它是一个 `omniroute run` 目标，但没有 `setup-*`/`configure` 配方。

> **完整参考：** 主表 — 每个命令写入的内容、每个标志、本地与远程，以及哪些工具需要 `/v1` 后缀 — 位于 **[CLI 集成](../guides/CLI-INTEGRATIONS.md)**。

### 在容器内运行这些命令

在 OmniRoute 容器内执行的 `setup-*` 命令会写入容器自己的主目录，主机 CLI 无法读取，并且随着容器的消失而消失。OmniRoute 检测到这一点并以 `2` 退出，给出说明而不是写入。前进的两种支持方式 — 在主机上安装 CLI 并 `omniroute connect` 到容器，或绑定挂载配置目录并设置 `CLI_CONFIG_HOME`（compose `host` 配置文件）。每个 `setup-*` 命令，以及 `omniroute configure` 和 `omniroute config set`，在配置容器自己的 CLI 时接受 `--allow-container-write`；`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` 对服务器也有相同效果。请参见
[Docker 指南 → 配置主机 CLI 工具](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)。

仪表板的 **应用端点** (`POST /api/cli-tools/apply`) 强制执行相同的保护：在容器中，目标不是从主机绑定挂载的写入会返回 **`422`**，并带有 `containerEphemeralTarget: true`，安全错误文本，以及对于具有主机配方的工具（claude、codex、opencode、cline、kilo、continue） — 一个 `hostSetupCommand`（例如 `omniroute setup-opencode`）以便在主机上运行；不会写入任何内容。`dryRun: true` 在容器模式下继续工作，并返回生成的内容 + 目标路径而不触及磁盘，因此您可以从仪表板预览并在主机上应用。此行为是故意的，并通过 `tests/unit/api/cli-tools/apply-container-guard.test.ts` 进行回归保护 — 永远不要通过移除保护来“修复” 422。

---

## 真实来源

统一目录位于 `src/shared/constants/cliTools.ts` 中，作为 `CLI_TOOLS: Record<string, CliCatalogEntry>`。

每个条目具有以下字段（在 `src/shared/schemas/cliCatalog.ts` 中定义）：

| 字段                                            | 类型                                                         | 描述                                         |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | 工具出现的页面                               |
| `vendor`                                        | `string`                                                     | 工具来源（"Anthropic", "OSS (P. Gauthier)"） |
| `acpSpawnable`                                  | `boolean`                                                    | 也可以作为 ACP Agent 使用（显示徽章）        |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | 自定义端点支持级别。`"none"` = MITM 待办事项 |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 配置机制                                     |
| `id`, `name`, `color`, `description`, `docsUrl` | 标准                                                         | 核心显示字段                                 |

具有 `baseUrlSupport: "none"` 的条目在仪表板页面中**不显示** — 它们在 MITM 待办事项中注册，属于计划 11（见 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`）。

### 能力层级（已编目 × 可检测 × 可配置 × 可启动）

并非每个已编目的工具都是可检测的、可配置的或可启动的。每个层级都有一个声明源，漂移测试保持它们的一致性：

| 层级       | 意义                                                     | 声明于                                                       |
| ---------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **已编目** | 出现在仪表板目录中（名称、供应商、文档、配置类型）       | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)             |
| **可检测** | 二进制/配置检测、健康检查、配置路径                      | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` 运行时目录) |
| **可配置** | 由 `omniroute configure <cli>` 支持（存在设置配方）      | `bin/cli/cli-manifest.mjs` (`configure: true`)               |
| **可启动** | 由 `omniroute run <target>` 支持（定义了 env/args 注入） | `bin/cli/cli-manifest.mjs` (`run: true`)                     |

`bin/cli/cli-manifest.mjs` 是 CLI 命令的规范可执行清单：`run`、`configure` 和 shell 完成生成器都从中派生其目标列表、别名解析（例如 `kilocode`/`kilo-code`/`kilo_cli` → `kilo`）和 `--model` 标志连接。漂移保护 `tests/unit/cli/cli-manifest-drift.test.ts` 确保清单、运行时目录、UI 目录和每个消费者表面保持同步 — 如果在一个表面添加了目标而其他表面没有，则测试套件会失败，而不是静默漂移。

## 1. CLI 代码目录 (26 个工具)

所有出现在 `/dashboard/cli-code` 的工具。那些 `baseUrlSupport: none` 的工具是通过 MITM 或手动指南连接，而不是自定义基本 URL：

| id           | name                 | vendor               | baseUrlSupport | configType     | acpSpawnable |
| ------------ | -------------------- | -------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code          | Anthropic            | full           | env            | true         |
| codex        | OpenAI Codex CLI     | OpenAI               | full           | custom         | true         |
| zcode        | ZCode (GLM 编码计划) | Z.ai                 | none           | custom         | false        |
| cline        | Cline                | OSS (前 Claude 开发) | full           | custom         | true         |
| kilo         | Kilo Code            | Kilo-Org             | full           | custom         | false        |
| roo          | Roo Code             | Roo (OSS)            | full           | guide          | false        |
| continue     | Continue             | continue.dev         | full           | guide          | false        |
| aider        | Aider                | OSS (P. Gauthier)    | full           | guide          | true         |
| forge        | ForgeCode            | Antinomy HQ          | full           | custom         | true         |
| jcode        | jcode                | 1jehuang (OSS)       | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI         | Hunter Bown (OSS)    | full           | custom         | false        |
| codewhale    | CodeWhale            | Hmbown (OSS)         | full           | custom         | false        |
| opencode     | OpenCode             | Anomaly (前 SST)     | full           | guide          | true         |
| droid        | Factory Droid        | Factory AI           | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI   | GitHub/MS            | full           | custom         | false        |
| cursor-cli   | Cursor CLI           | Anysphere            | partial        | guide          | true         |
| smelt        | Smelt                | leonardcser (OSS)    | full           | custom         | false        |
| pi           | Pi (pi-coding-agent) | M. Zechner (OSS)     | full           | custom         | false        |
| grok-build   | Grok Build           | xAI                  | full           | custom         | false        |
| crush        | Crush                | OSS (Charm)          | full           | custom         | false        |
| qwen         | Qwen Code            | Alibaba              | full           | guide          | true         |
| cursor       | Cursor               | Anysphere            | none           | guide          | false        |
| antigravity  | Antigravity          | Google               | none           | mitm           | false        |
| hermes       | Hermes               | Nous Research        | none           | guide          | false        |
| kiro         | Kiro AI              | Amazon               | none           | mitm           | false        |
| custom       | 自定义 CLI           | —                    | full           | custom-builder | false        |

具有 `baseUrlSupport: "partial"` 的工具在仪表板卡片中显示徽章 "⚠ Base URL 部分"。

## 2. CLI 代理目录 (8 个工具)

出现在 `/dashboard/cli-agents` 的自主代理：

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes 代理      | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |

---

## 3. ACP 代理 (/dashboard/acp-agents)

此页面（从 `/dashboard/agents` 重命名）显示 OmniRoute 可以通过 stdio/ACP 协议 **生成** 的 CLI 作为后端执行引擎。目录在 `src/lib/acp/registry.ts` 中单独维护，并且与 `CLI_TOOLS` **不相同**。

---

## 4. MITM 待办事项 (未在仪表板中显示)

以下 CLI 原生不支持自定义基础 URL，并且 **未列出** 在 CLI 代码或 CLI 代理页面中。它们是计划 11 中 MITM 拦截的候选者：

| CLI                 | 理由                                           |
| ------------------- | ---------------------------------------------- |
| windsurf            | BYOK 限制在选择的 Claude 模型 + 企业 URL/token |
| amp                 | 封闭生态系统 (Sourcegraph)                     |
| amazon-q / kiro-cli | AWS SSO 认证，无自定义 URL                     |
| cowork              | Anthropic Desktop，无可配置的端点              |

请参见 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` 以获取完整的交叉引用。

---

## 5. 批量检测 API

所有工具检测通过单个端点聚合：

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)`（与其他 `/api/cli-tools/` 路由相同）
- 返回: `Record<toolId, ToolBatchStatus>`（类型: `src/shared/types/cliBatchStatus.ts`）
- 策略: 对所有工具使用 `Promise.all`，每个工具 5 秒超时
- 缓存: 内存 LRU，按配置文件 `mtime` 索引。当 mtime 变化时，缓存失效。服务器重启时重置。

每个工具的响应结构：

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // 已清理，无堆栈跟踪
}
```

## 6. 新工具的设置处理程序

具有 `configType: "custom"` 的新工具具有专用的设置 API 路由：

| 路由                                        | 工具                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url 标志)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` 同步) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi 编码代理                                                      |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + 专用 `.env` 键)             |

所有路由都使用 `sanitizeErrorMessage()` 处理错误响应（硬性规则 #12）。

---

## 7. 仪表板页面架构

### CLI 代码 (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — 服务器组件
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — 客户端网格
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — 工具详情页面
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 个专用工具卡片 + `ToolDetailClient.tsx`

### CLI 代理 (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — 服务器组件
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — 客户端网格
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — 重用 `ToolDetailClient`

### ACP 代理 (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — 服务器组件（从 `agents/` 移动过来）

### 共享 UI 组件 (`src/shared/components/cli/`)

| 文件                    | 目的                               |
| ----------------------- | ---------------------------------- |
| `CliToolCard.tsx`       | 智能状态卡片（检测 + 配置 + 端点） |
| `CliConceptCard.tsx`    | 每页概念解释卡片                   |
| `CliComparisonCard.tsx` | 三列比较不同 CLI 类型              |
| `BaseUrlSelect.tsx`     | 端点下拉菜单（本地/云/自定义）     |
| `ApiKeySelect.tsx`      | API 密钥选择器                     |
| `ManualConfigModal.tsx` | 可复制的配置片段模态框             |

### 共享 Hook (`src/shared/hooks/cli/`)

| 文件                      | 目的                                                  |
| ------------------------- | ----------------------------------------------------- |
| `useToolBatchStatuses.ts` | 获取 `/api/cli-tools/all-statuses`，管理加载/刷新状态 |

---

## 8. 国际化 (i18n)

在计划 14 F9 中添加的新命名空间：

| 命名空间    | 目的                                                |
| ----------- | --------------------------------------------------- |
| `cliCommon` | 共享字符串（卡片标签、概念/比较文本、详细页面标签） |
| `cliCode`   | CLI 代码页面字符串                                  |
| `cliAgents` | CLI 代理页面字符串                                  |
| `acpAgents` | ACP 代理页面字符串                                  |

提供完整的 PT-BR 和 EN 翻译。其他 39 种语言通过 `src/i18n/request.ts` 中的命名空间级合并自动回退到 EN。

---

## 9. 快速开始

### 步骤 1 — 获取 OmniRoute API 密钥

1. 打开 `/dashboard/api-manager` → **创建 API 密钥**
2. 给它起个名字（例如 `cli-tools`）并选择所有权限
3. 复制密钥 — 你将在下面的每个 CLI 中需要它

> 你的密钥看起来像： `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 步骤 2 — 安装 CLI 工具

所有基于 npm 的工具需要 Node.js 22.22.2+ 或 24.x：

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (可通过 `omniroute run gemini` 启动 → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # 基于 Rust

# Pi coding agent
# 请参见 https://github.com/zechnerj/pi-coding-agent 进行安装

# jcode
# 请参见 https://github.com/1jehuang/jcode 进行安装
```

---

### 步骤 3 — 通过仪表板配置

1. 转到 `http://localhost:20128/dashboard/cli-code`
2. 在网格中找到你的工具
3. 点击卡片以打开工具详细页面
4. 选择你的 API 密钥和基础 URL
5. 点击 **应用配置** 或复制手动配置片段

---

### 步骤 4 — 设置全局环境变量

```bash
# OmniRoute 通用端点
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI 在根目录读取 GOOGLE_GEMINI_BASE_URL（其 SDK 自行附加 /v1beta/...）
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> 对于 **远程服务器**，将 `localhost:20128` 替换为服务器 IP 或域名，
> 例如 `http://<your-server-ip>:20128`。

---

### 步骤 4 — 配置每个工具

#### Claude Code

```bash
# 创建 ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

使用统一的 Anthropic 网关根目录用于 Claude Code。此处不要附加 `/v1`。

**测试：** `claude "say hello"`

---

#### OpenAI Codex

现代 Codex (v0.137+) 仅读取 `~/.codex/config.toml` — 旧的
`config.yaml` 属于遗留的 npm CLI，并被静默忽略。API
密钥保留在 `OMNIROUTE_API_KEY` 环境变量中（`env_key`），而不是文件内：

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

完整参考（配置文件、`wire_api`、上下文窗口）： [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md)。

**测试：** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**测试：** `opencode`

> 使用 `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> 发送思考变体。

---

#### Cline (CLI 或 VS Code)

**CLI 模式：**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code 模式：**
Cline 扩展设置 → API 提供者：`OpenAI Compatible` → 基础 URL：`http://localhost:20128/v1`

或使用 OmniRoute 仪表板 → **CLI 工具 → Cline → 应用配置**。

---

#### KiloCode (CLI 或 VS Code)

**CLI 模式：**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code 设置：**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

或使用 OmniRoute 仪表板 → **CLI 工具 → KiloCode → 应用配置**。

---

#### Continue (VS Code 扩展)

编辑 `~/.continue/config.yaml`：

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

编辑后重启 VS Code。

---

#### VS Code Insiders (`chatLanguageModels.json`)

当 VS Code Insiders 配置为自定义端点模型时使用此配置，且希望 OmniRoute 在没有自定义头字段的情况下工作。

**推荐位置：**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**使用标记化的 OmniRoute 别名的示例：**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**注意：**

- 将 `sk-your-omniroute-key` 替换为在 OmniRoute 中创建的 API 密钥。
- `url` 字段应指向 `/api/v1/vscode/{token}/chat/completions`。
- `modelsUrl` 字段应指向 `/api/v1/vscode/{token}/models`。
- 当客户端支持自定义头时，优先使用正常的 `/v1` + Bearer 头流。
- 嵌入 URL 的令牌是兼容性回退，可能会出现在编辑器日志或代理历史中。

---

#### Kiro CLI (亚马逊)

```bash
# 登录到你的 AWS/Kiro 账户：
kiro-cli login

# CLI 使用自己的身份验证 — OmniRoute 不需要作为 Kiro CLI 本身的后端。
# 将 kiro-cli 与 OmniRoute 一起使用以支持其他工具。
kiro-cli status
```

对于 **Kiro IDE** 桌面应用，使用 OmniRoute 在 `/dashboard/cli-tools → Kiro` 下暴露的 MITM 端点。

---

## 10. 内部 OmniRoute CLI

`omniroute` 二进制文件提供服务器生命周期、设置、诊断和提供者管理的命令。入口点：`bin/omniroute.mjs`。

```bash
omniroute                              # 启动服务器（默认端口 20128）
omniroute setup                        # 交互式设置向导
omniroute doctor                       # 检查配置、数据库、端口、运行时
omniroute providers list               # 配置的提供者连接
omniroute providers test-all           # 测试每个活动连接
omniroute reset-password               # 重置管理员密码
omniroute logs                         # 流式请求日志
omniroute health                       # 详细健康状态（断路器、缓存、内存）
omniroute --version                    # 打印版本
omniroute --help                       # 显示所有命令
```

### 设置与初始化

```bash
omniroute setup                        # 交互式设置向导
omniroute setup --non-interactive      # CI/自动化模式（读取环境变量 + 标志）
omniroute setup --password '<value>'   # 直接设置管理员密码
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # 一次性添加并测试提供者
```

非交互式设置的环境变量：

| 变量                | 目的                                                          |
| ------------------- | ------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | 提供者 API 密钥（通过 Commander `.env()` 绑定到 `--api-key`） |
| `DATA_DIR`          | 覆盖 OmniRoute 数据目录                                       |

所有其他非交互式输入作为标志传递，而不是环境变量：
`--password`、`--provider`、`--provider-name`、`--provider-base-url`、`--default-model`
（请参见上面的 `omniroute setup` 选项）。

### 诊断

```bash
omniroute doctor                       # 检查配置、数据库、端口、运行时、内存、存活性
omniroute doctor --json                # 机器可读的 JSON
omniroute doctor --no-liveness         # 跳过 HTTP 健康探测
omniroute doctor --host 0.0.0.0        # 覆盖存活性主机
omniroute doctor --liveness-url <url>  # 完整健康端点 URL 覆盖
```

医生运行这些检查：`配置`、`数据库`、`存储/加密`、
`端口可用性`、`节点运行时`、`本地二进制`（better-sqlite3）、
`内存`和`服务器存活性`。如果任何检查失败，则退出非零。

### 提供者管理

```bash
omniroute providers available                       # OmniRoute 提供者目录
omniroute providers available --search openai       # 按 id/名称/别名/类别过滤目录
omniroute providers available --category api-key    # 按类别过滤（api-key、oauth、free 等）
omniroute providers available --json                # 机器可读的 JSON

omniroute providers list                            # 配置的提供者连接
omniroute providers list --json

omniroute providers test <id|name>                  # 测试一个配置的连接
omniroute providers test-all                        # 测试每个活动连接
omniroute providers validate                        # 仅限本地的结构验证
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # 现有的 OAuth 流程
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` 是 API 优先的，因此针对
活动的本地或远程上下文工作。凭证输入应使用
`--credential-stdin` 或 `--credential-env`；`--dry-run --json` 仅报告
已编辑的存在/形状。`providers available` 读取 OmniRoute 目录；
`providers list/test/test-all/validate` 保留其本地 SQLite 行为，并且
不需要服务器运行。

### 恢复与重置

```bash
omniroute reset-password                # 重置管理员密码（也可使用：omniroute-reset-password）
omniroute reset-encrypted-columns       # 显示警告 + 加密凭证重置的干运行
omniroute reset-encrypted-columns --force  # 实际清空 SQLite 中的加密凭证
```

### 凭证导出 (⚠ 小心处理)

```bash
omniroute auth export                                 # 显示警告 + 确认门 — 无数据库访问
omniroute auth export --force                          # 将所有连接的解密凭证导出到 stdout 作为 JSON
omniroute auth export --force --id <id>                 # 仅导出匹配的连接
omniroute auth export --force --format env               # 输出 OMNIROUTE_<PROVIDER>_<FIELD>=<value> 行
omniroute auth export --force --out creds.json           # 写入文件（以 0600 权限创建）
```

`auth export` 是 **仅限本地**（直接 SQLite 读取，无 HTTP 路由），并故意打印/写入
**明文** `apiKey`/`accessToken`/`refreshToken`/`idToken` 值 — 这是功能，而不是
错误。在没有 `--force` 的情况下，不会从数据库读取任何内容，也不会解密任何内容。任何明文输出之前总是会打印 stderr 警告横幅。需要设置 `STORAGE_ENCRYPTION_KEY`。无法解密的字段（过期密钥、损坏的密文）将报告为
`<field>DecryptFailed: true`，而不是中止整个导出或泄露底层错误。

### 其他子命令

这些假定正在运行的 OmniRoute 服务器，除非另有说明：

```bash
omniroute status                       # 综合运行时状态
omniroute logs                         # 流式请求日志 (--json, --search, --follow)
omniroute config show                  # 显示当前配置

omniroute provider list                # 列出可用提供者（providers list 的别名）
omniroute provider add                 # 将 OmniRoute 注册为工具上的提供者
omniroute keys add | list | remove     # 管理 API 密钥
omniroute models [provider]            # 列出模型 (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # 快照配置 + 数据库
omniroute restore                      # 从先前的快照恢复

omniroute health                       # 详细健康状态（断路器、缓存、内存）
omniroute quota                        # 提供者配额使用情况
omniroute cache                        # 缓存状态
omniroute cache clear                  # 清除语义 + 签名缓存

omniroute mcp status | restart         # MCP 服务器状态 / 重启
omniroute a2a status | card            # A2A 服务器状态 / 代理卡

omniroute tunnel list | create | stop  # 管理隧道（cloudflare/tailscale/ngrok）
omniroute env show | get <k> | set <k> <v>  # 检查 / 设置环境变量（临时）

omniroute test                         # 提供者连接性烟雾测试
omniroute update                       # 检查更新
omniroute completion                   # 生成 shell 完成
```

### 常见标志

| 标志                | 描述                                         |
| ------------------- | -------------------------------------------- |
| `--no-open`         | 启动时不自动打开浏览器                       |
| `--port <n>`        | 覆盖 API 端口（默认 20128）                  |
| `--mcp`             | 作为 MCP 服务器通过 stdio 运行（用于 IDE）   |
| `--non-interactive` | CI 模式（无提示；从环境/标志读取）           |
| `--json`            | 机器可读的 JSON 输出（doctor、providers 等） |
| `--help`, `-h`      | 显示命令特定帮助                             |
| `--version`, `-v`   | 打印已安装版本                               |

---

## 可用的 API 端点

| 端点                       | 描述                    | 用途                    |
| -------------------------- | ----------------------- | ----------------------- |
| `/v1/chat/completions`     | 标准聊天（所有提供者）  | 所有现代工具            |
| `/v1/responses`            | 响应 API（OpenAI 格式） | Codex，代理工作流       |
| `/v1/completions`          | 旧版文本补全            | 使用 `prompt:` 的旧工具 |
| `/v1/embeddings`           | 文本嵌入                | RAG，搜索               |
| `/v1/images/generations`   | 图像生成                | GPT-Image，Flux 等      |
| `/v1/audio/speech`         | 文本转语音              | ElevenLabs，OpenAI TTS  |
| `/v1/audio/transcriptions` | 语音转文本              | Deepgram，AssemblyAI    |

准备粘贴的示例，带有标记的 OmniRoute URL：

```txt
Token 示例: sk-a3ab3c080beaee3a-69f4a4-070d71af

标准 OpenAI 基础: http://localhost:20128/v1
VS Code 模型: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code 聊天: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code 响应: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama 标签: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama 聊天: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## 故障排除

| 错误                            | 原因                   | 修复                                       |
| ------------------------------- | ---------------------- | ------------------------------------------ |
| `Connection refused`            | OmniRoute 未运行       | `omniroute serve`                          |
| `401 Unauthorized`              | API 密钥错误           | 在 `/dashboard/api-manager` 中检查         |
| `No combo configured`           | 没有活动的路由组合     | 在 `/dashboard/combos` 中设置              |
| CLI 显示 "not installed"        | 二进制文件不在 PATH 中 | 检查 `which <command>`                     |
| 安装后仪表板显示 "not detected" | 缓存过期               | 在仪表板中点击 "⟳ 刷新检测"                |
| 旧链接 `/dashboard/cli-tools`   | 预 v3.8.6 书签         | 自动重定向到 `/dashboard/cli-code` (308)   |
| 旧链接 `/dashboard/agents`      | 预 v3.8.6 书签         | 自动重定向到 `/dashboard/acp-agents` (308) |
