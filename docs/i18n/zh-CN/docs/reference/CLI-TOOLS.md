---
title: "CLI 工具 — OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# CLI 工具 — OmniRoute

最后更新：2026-06-28

OmniRoute 与三类 CLI 工具集成，分布在三个专用的 dashboard 页面中：

| 页面             | 路由                     | 概念                                                                        | 数量         |
| ---------------- | ------------------------ | --------------------------------------------------------------------------- | ------------ |
| **CLI Code's**   | `/dashboard/cli-code`    | 指向 OmniRoute 的编程工具（客户端 → CLI → OmniRoute → 服务商）               | 19           |
| **CLI Agents**   | `/dashboard/cli-agents`  | 指向 OmniRoute 的自主代理（相同流程，更广泛的范围）                           | 6            |
| **ACP Agents**   | `/dashboard/acp-agents`  | OmniRoute 通过 stdio/ACP 作为后端启动的 CLI（反向流程）                       | 见注册表      |

旧路由通过 308 重定向：`/dashboard/cli-tools` → `/dashboard/cli-code`，`/dashboard/agents` → `/dashboard/acp-agents`。

---

## 工作原理

```
CLI Code's / CLI Agents（消费流程）：
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  （全部指向 OmniRoute）
    http://YOUR_SERVER:20128/v1
           │
           ▼  （OmniRoute 路由到合适的服务商）
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents（反向启动流程）：
    客户端请求 → OmniRoute → 通过 stdio/ACP 启动 CLI → 响应
```

**优势：**

- 一个 API Key 管理所有工具
- 在 dashboard 中追踪所有 CLI 的成本
- 无需重新配置每个工具即可切换模型
- 在本地和远程服务器（VPS、Docker、Akamai、Cloudflare Tunnel）均可使用

---

## 使用 `setup-*` 自动配置

无需手动编写每个工具的配置。OmniRoute 为每个支持的 CLI 提供对应的 `setup-*` 命令，该命令从运行中的 OmniRoute（本地或远程）读取**实时**模型目录并将工具的配置写入你的机器：

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

每个命令接受 `--remote <url> --api-key <key>`（针对远程 OmniRoute 配置本地工具）、`--dry-run`（预览不写入）和 `--port`。不支持模型自动发现的工具（Cline、Kilo、Roo、Goose、Qwen、Aider、Gemini）接受 `--model <id>`（以及用于非交互式运行的 `--yes`）。启动器 `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex）在注入正确的环境变量后启动 CLI，不写入任何配置。

> **完整参考：** 主表 — 每个命令写入的内容、所有标志、本地 vs 远程，以及哪些工具需要 `/v1` 后缀 — 在 **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)** 中。

---

## 数据源

统一目录位于 `src/shared/constants/cliTools.ts`，定义为 `CLI_TOOLS: Record<string, CliCatalogEntry>`。

每个条目包含以下字段（定义在 `src/shared/schemas/cliCatalog.ts`）：

| 字段                                             | 类型                                                         | 说明                                                     |
| ------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| `category`                                       | `"code" \| "agent"`                                          | 工具显示的页面                                           |
| `vendor`                                         | `string`                                                     | 工具来源（"Anthropic"、"OSS (P. Gauthier)"）             |
| `acpSpawnable`                                   | `boolean`                                                    | 也可作为 ACP Agent 使用（显示徽章）                       |
| `baseUrlSupport`                                 | `"full" \| "partial" \| "none"`                              | 自定义端点支持级别。`"none"` = MITM 待办列表              |
| `configType`                                     | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 配置机制                                                 |
| `id`、`name`、`color`、`description`、`docsUrl`  | 标准字段                                                     | 核心显示字段                                             |

`baseUrlSupport: "none"` 的条目**不会显示**在 dashboard 页面中 — 它们注册在 MITM 待办列表中，供 plan 11 使用（参见 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`）。

---

## 1. CLI Code's 目录（19 个工具）

支持自定义 base URL 并出现在 `/dashboard/cli-code` 中的工具：

| id | name | vendor | baseUrlSupport | configType | acpSpawnable |
|----|------|--------|---------------|-----------|-------------|
| claude | Claude Code | Anthropic | full | env | true |
| codex | OpenAI Codex CLI | OpenAI | full | custom | true |
| cline | Cline | OSS (ex-Claude Dev) | full | custom | true |
| kilo | Kilo Code | Kilo-Org | full | custom | false |
| roo | Roo Code | Roo (OSS) | full | guide | false |
| continue | Continue | continue.dev | full | guide | false |
| qwen | Qwen Code | Alibaba | full | guide | true |
| aider | Aider | OSS (P. Gauthier) | full | guide | true |
| forge | ForgeCode | Antinomy HQ | full | custom | true |
| jcode | jcode | 1jehuang (OSS) | full | custom | false |
| deepseek-tui | DeepSeek TUI | Hunter Bown (OSS) | full | custom | false |
| opencode | OpenCode | Anomaly (ex-SST) | full | guide | true |
| droid | Factory Droid | Factory AI | partial | guide | false |
| copilot | GitHub Copilot CLI | GitHub/MS | full | custom | false |
| cursor-cli | Cursor CLI | Anysphere | partial | guide | true |
| smelt | Smelt | leonardcser (OSS) | full | custom | false |
| pi | Pi (pi-coding-agent) | M. Zechner (OSS) | full | custom | false |
| custom | Custom CLI | — | full | custom-builder | false |

`baseUrlSupport: "partial"` 的工具在 dashboard 卡片中显示徽章 "⚠ Base URL parcial"。

---

## 2. CLI Agents 目录（6 个工具）

出现在 `/dashboard/cli-agents` 中的自主代理：

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |

---

## 3. ACP Agents（/dashboard/acp-agents）

此页面（从 `/dashboard/agents` 重命名而来）显示 OmniRoute 可以通过 stdio/ACP 协议**启动**为后端执行引擎的 CLI。目录在 `src/lib/acp/registry.ts` 中单独维护，**不同于** `CLI_TOOLS`。

---

## 4. MITM 待办列表（不在 dashboard 中显示）

以下 CLI 原生不支持自定义 base URL，因此**不会**在 CLI Code's 或 CLI Agents 页面中列出。它们是 plan 11 中 MITM 拦截的候选项：

| CLI                 | 原因                                                          |
| ------------------- | ------------------------------------------------------------- |
| windsurf            | BYOK 限于部分 Claude 模型 + 企业 URL/Token                     |
| amp                 | 封闭生态系统（Sourcegraph）                                     |
| amazon-q / kiro-cli | AWS SSO 认证，无自定义 URL                                     |
| cowork              | Anthropic Desktop，无可配置端点                                |

完整对照参见 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`。

---

## 5. 批量检测 API

所有工具检测通过单个端点聚合：

**`GET /api/cli-tools/all-statuses`**

- 认证：`requireCliToolsAuth(request)`（与其他 `/api/cli-tools/` 路由相同）
- 返回：`Record<toolId, ToolBatchStatus>`（类型：`src/shared/types/cliBatchStatus.ts`）
- 策略：对全部工具执行 `Promise.all`，每个工具 5 秒超时
- 缓存：以配置文件 `mtime` 为索引的内存 LRU 缓存。当 mtime 变化时缓存失效。服务器重启时重置。

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
  error?: string; // 已脱敏，无堆栈跟踪
}
```

---

## 6. 新工具的 Settings 处理器

`configType: "custom"` 的新工具具有专用的 settings API 路由：

| 路由                                         | 工具                             |
| -------------------------------------------- | -------------------------------- |
| `POST /api/cli-tools/forge-settings`         | ForgeCode (.forge.toml)          |
| `POST /api/cli-tools/jcode-settings`         | jcode (--base-url 标志)          |
| `POST /api/cli-tools/deepseek-tui-settings`  | DeepSeek TUI (OPENAI_BASE_URL)   |
| `POST /api/cli-tools/smelt-settings`         | Smelt                            |
| `POST /api/cli-tools/pi-settings`            | Pi coding agent                  |

所有路由均使用 `sanitizeErrorMessage()` 处理错误响应（Hard Rule #12）。

---

## 7. Dashboard 页面架构

### CLI Code's（`/dashboard/cli-code`）

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — 服务端组件
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — 客户端网格
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — 工具详情页
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 个专用工具卡片 + `ToolDetailClient.tsx`

### CLI Agents（`/dashboard/cli-agents`）

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — 服务端组件
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — 客户端网格
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — 复用 `ToolDetailClient`

### ACP Agents（`/dashboard/acp-agents`）

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — 服务端组件（从 `agents/` 迁移而来）

### 共享 UI 组件（`src/shared/components/cli/`）

| 文件                      | 用途                                                |
| ------------------------- | --------------------------------------------------- |
| `CliToolCard.tsx`         | 智能状态卡片（检测 + 配置 + 端点）                    |
| `CliConceptCard.tsx`      | 每页概念说明卡片                                    |
| `CliComparisonCard.tsx`   | 三类 CLI 对比卡                                     |
| `BaseUrlSelect.tsx`       | 端点下拉选择（本地/云端/自定义）                      |
| `ApiKeySelect.tsx`        | API Key 选择器                                      |
| `ManualConfigModal.tsx`   | 可复制的配置片段弹窗                                |

### 共享 Hook（`src/shared/hooks/cli/`）

| 文件                        | 用途                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| `useToolBatchStatuses.ts`   | 获取 `/api/cli-tools/all-statuses`，管理 loading/refresh 状态          |

---

## 8. i18n

在 plan 14 F9 中添加的新命名空间：

| 命名空间    | 用途                                                                         |
| ----------- | ---------------------------------------------------------------------------- |
| `cliCommon` | 共享字符串（卡片标签、概念/对比文本、详情页标签）                               |
| `cliCode`   | CLI Code's 页面字符串                                                         |
| `cliAgents` | CLI Agents 页面字符串                                                         |
| `acpAgents` | ACP Agents 页面字符串                                                         |

提供完整的 PT-BR 和 EN 翻译。其余 39 个语言环境通过 `src/i18n/request.ts` 中的命名空间级合并自动回退到 EN。

---

## 9. 快速开始

### 步骤 1 — 获取 OmniRoute API Key

1. 打开 `/dashboard/api-manager` → **创建 API Key**
2. 为其命名（例如 `cli-tools`）并选择所有权限
3. 复制 Key — 以下所有 CLI 都会用到

> 你的 Key 格式为：`sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

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

# Qwen Code (Alibaba)
npm install -g @qwen-code/qwen-code

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust 编写

# Pi coding agent
# 安装参见 https://github.com/zechnerj/pi-coding-agent

# jcode
# 安装参见 https://github.com/1jehuang/jcode
```

---

### 步骤 3 — 通过 Dashboard 配置

1. 访问 `http://localhost:20128/dashboard/cli-code`
2. 在网格中找到你的工具
3. 点击卡片进入工具详情页
4. 选择你的 API Key 和 base URL
5. 点击**应用配置**或复制手动配置片段

---

### 步骤 4 — 设置全局环境变量

```bash
# OmniRoute 通用端点
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> 对于**远程服务器**，将 `localhost:20128` 替换为服务器的 IP 或域名，
> 例如 `http://<your-server-ip>:20128`。

---

### 步骤 4 — 配置每个工具

#### Claude Code

```bash
# 创建 ~/.claude/settings.json：
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code 使用统一的 Anthropic 网关根路径。不要在这里添加 `/v1`。

**测试：** `claude "say hello"`

---

#### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

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
> 发送 thinking 变体。

---

#### Cline（CLI 或 VS Code）

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
Cline 扩展设置 → API Provider：`OpenAI Compatible` → Base URL：`http://localhost:20128/v1`

或使用 OmniRoute dashboard → **CLI Tools → Cline → 应用配置**。

---

#### KiloCode（CLI 或 VS Code）

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

或使用 OmniRoute dashboard → **CLI Tools → KiloCode → 应用配置**。

---

#### Continue（VS Code 扩展）

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

#### VS Code Insiders（`chatLanguageModels.json`）

当 VS Code Insiders 配置了自定义端点模型，且你希望 OmniRoute 在不使用自定义请求头字段的情况下工作时使用。

**推荐位置：**

- Linux：`~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows：`%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**使用 Token 化 OmniRoute 别名的示例：**

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

**说明：**

- 将 `sk-your-omniroute-key` 替换为在 OmniRoute 中创建的 API Key。
- `url` 字段应指向 `/api/v1/vscode/{token}/chat/completions`。
- `modelsUrl` 字段应指向 `/api/v1/vscode/{token}/models`。
- 只要客户端支持自定义请求头，应优先使用正常的 `/v1` + Bearer 请求头流程。
- URL 嵌入的 Token 是兼容性回退方案，可能出现在编辑器日志或代理历史中。

---

#### Kiro CLI（Amazon）

```bash
# 登录你的 AWS/Kiro 账户：
kiro-cli login

# CLI 使用自己的认证 — Kiro CLI 本身不需要 OmniRoute 作为后端。
# 将 kiro-cli 与 OmniRoute 配合用于其他工具。
kiro-cli status
```

对于 **Kiro IDE** 桌面应用，使用 OmniRoute 通过 `/dashboard/cli-tools → Kiro` 暴露的 MITM 端点。

---

#### Qwen Code（Alibaba）

Qwen Code 通过环境变量或 `settings.json` 支持 OpenAI 兼容的 API 端点。

> Qwen OAuth 免费层已于 2026-04-15 停用。改为使用 OmniRoute 搭配
> `bailian-coding-plan` / `alibaba` / `alibaba-cn` / `openrouter` / `anthropic` /
> `gemini` 服务商。

**选项 1：环境变量（`~/.qwen/.env`）**

```bash
mkdir -p ~/.qwen && cat > ~/.qwen/.env << EOF
OPENAI_API_KEY="sk-your-omniroute-key"
OPENAI_BASE_URL="http://localhost:20128/v1"
OPENAI_MODEL="auto"
EOF
```

**选项 2：`settings.json` 配合 `security.auth`**

```json
// ~/.qwen/settings.json
{
  "security": {
    "auth": {
      "selectedType": "openai",
      "apiKey": "sk-your-omniroute-key",
      "baseUrl": "http://localhost:20128/v1"
    }
  },
  "model": {
    "name": "claude-sonnet-4-6"
  }
}
```

**选项 3：内联 CLI 标志**

```bash
OPENAI_BASE_URL="http://localhost:20128/v1" \
OPENAI_API_KEY="sk-your-omniroute-key" \
OPENAI_MODEL="auto" \
qwen
```

> 对于**远程服务器**，将 `localhost:20128` 替换为服务器的 IP 或域名。

---

## 10. OmniRoute 内置 CLI

`omniroute` 二进制文件提供服务端生命周期、设置、诊断和服务商管理的命令。入口点：`bin/omniroute.mjs`。

```bash
omniroute                              # 启动服务器（默认端口 20128）
omniroute setup                        # 交互式设置向导
omniroute doctor                       # 检查配置、数据库、端口、运行时
omniroute providers list               # 已配置的服务商连接
omniroute providers test-all           # 测试所有活跃连接
omniroute reset-password               # 重置管理员密码
omniroute logs                         # 流式输出请求日志
omniroute health                       # 详细健康状态（熔断器、缓存、内存）
omniroute --version                    # 输出版本号
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
  --test-provider                      # 一步添加并测试服务商
```

非交互式设置识别的环境变量：

| 变量                | 用途                                                        |
| ------------------- | ----------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | 服务商 API Key（通过 Commander `.env()` 绑定到 `--api-key`） |
| `DATA_DIR`          | 覆盖 OmniRoute 数据目录                                      |

其他所有非交互式输入通过标志传入，而非环境变量：
`--password`、`--provider`、`--provider-name`、`--provider-base-url`、`--default-model`
（参见上述 `omniroute setup` 选项）。

### 诊断

```bash
omniroute doctor                       # 检查配置、数据库、端口、运行时、内存、存活状态
omniroute doctor --json                # 机器可读的 JSON
omniroute doctor --no-liveness         # 跳过 HTTP 健康探测
omniroute doctor --host 0.0.0.0        # 覆盖存活探测的主机
omniroute doctor --liveness-url <url>  # 完全覆盖健康端点 URL
```

doctor 运行以下检查：`Config`、`Database`、`Storage/encryption`、`Port availability`、`Node runtime`、`Native binary`（better-sqlite3）、`Memory` 和 `Server liveness`。任何检查为 `fail` 时以非零退出码退出。

### 服务商管理

```bash
omniroute providers available                       # OmniRoute 服务商目录
omniroute providers available --search openai       # 按 id/name/alias/category 过滤目录
omniroute providers available --category api-key    # 按分类过滤（api-key、oauth、free 等）
omniroute providers available --json                # 机器可读的 JSON

omniroute providers list                            # 已配置的服务商连接
omniroute providers list --json

omniroute providers test <id|name>                  # 测试一个已配置的连接
omniroute providers test-all                        # 测试所有活跃连接
omniroute providers validate                        # 仅本地结构校验
```

> `providers available` 读取 OmniRoute 目录；`providers list/test/test-all/validate`
> 直接读取本地 SQLite 数据库，不需要服务器运行。

### 恢复与重置

```bash
omniroute reset-password                # 重置管理员密码（旧别名仍然可用）
omniroute reset-encrypted-columns       # 显示加密凭证重置的警告 + 干运行
omniroute reset-encrypted-columns --force  # 实际在 SQLite 中将加密凭证设为 null
```

### 其他子命令

以下命令假定 OmniRoute 服务器正在运行（另有说明除外）：

```bash
omniroute status                       # 全面的运行时状态
omniroute logs                         # 流式输出请求日志（--json、--search、--follow）
omniroute config show                  # 显示当前配置

omniroute provider list                # 列出可用服务商（providers list 的别名）
omniroute provider add                 # 将 OmniRoute 注册为某个工具的服务商
omniroute keys add | list | remove     # 管理 API Key
omniroute models [provider]            # 列出模型（--json、--search）
omniroute combo list | switch | create | delete

omniroute backup                       # 快照配置 + 数据库
omniroute restore                      # 从之前的快照恢复

omniroute health                       # 详细健康状态（熔断器、缓存、内存）
omniroute quota                        # 服务商配额用量
omniroute cache                        # 缓存状态
omniroute cache clear                  # 清除语义 + 签名缓存

omniroute mcp status | restart         # MCP 服务器状态 / 重启
omniroute a2a status | card            # A2A 服务器状态 / agent card

omniroute tunnel list | create | stop  # 管理隧道（cloudflare/tailscale/ngrok）
omniroute env show | get <k> | set <k> <v>  # 检查 / 设置环境变量（临时）

omniroute test                         # 服务商连通性冒烟测试
omniroute update                       # 检查更新
omniroute completion                   # 生成 shell 补全
```

### 通用标志

| 标志                | 说明                                                   |
| ------------------- | ------------------------------------------------------ |
| `--no-open`         | 启动时不自动打开浏览器                                  |
| `--port <n>`        | 覆盖 API 端口（默认 20128）                             |
| `--mcp`             | 以 MCP 服务器通过 stdio 运行（供 IDE 使用）             |
| `--non-interactive` | CI 模式（无交互提示；从 env/flags 读取）                |
| `--json`            | 机器可读的 JSON 输出（doctor、providers 等）            |
| `--help`、`-h`      | 显示命令特定的帮助                                      |
| `--version`、`-v`   | 输出版本号                                              |

---

## 可用 API 端点

| 端点                         | 说明                           | 用途                       |
| ---------------------------- | ------------------------------ | -------------------------- |
| `/v1/chat/completions`       | 标准聊天（所有服务商）          | 所有现代工具               |
| `/v1/responses`              | Responses API（OpenAI 格式）   | Codex、代理工作流           |
| `/v1/completions`            | 旧版文本补全                    | 使用 `prompt:` 的旧工具     |
| `/v1/embeddings`             | 文本嵌入                        | RAG、搜索                  |
| `/v1/images/generations`     | 图像生成                        | GPT-Image、Flux 等         |
| `/v1/audio/speech`           | 文本转语音                      | ElevenLabs、OpenAI TTS    |
| `/v1/audio/transcriptions`   | 语音转文本                      | Deepgram、AssemblyAI      |

可直接粘贴的示例（使用 Token 化 OmniRoute URL）：

```txt
Token 示例：sk-a3ab3c080beaee3a-69f4a4-070d71af

标准 OpenAI base：http://localhost:20128/v1
VS Code 模型：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code 聊天：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code Responses：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama 标签：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama 聊天：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## 故障排除

| 错误                                          | 原因                     | 修复方法                                          |
| --------------------------------------------- | ------------------------ | ------------------------------------------------- |
| `Connection refused`                          | OmniRoute 未运行          | `omniroute serve`                                 |
| `401 Unauthorized`                            | API Key 错误             | 在 `/dashboard/api-manager` 中检查                 |
| `No combo configured`                         | 无活跃的路由 Combo        | 在 `/dashboard/combos` 中设置                      |
| CLI 显示 "not installed"                      | 二进制文件不在 PATH 中    | 检查 `which <command>`                            |
| Dashboard 安装后显示 "not detected"            | 缓存过期                 | 点击 dashboard 中的 "⟳ 刷新检测"                  |
| 旧链接 `/dashboard/cli-tools`                 | v3.8.6 之前的书签         | 自动重定向到 `/dashboard/cli-code`（308）          |
| 旧链接 `/dashboard/agents`                    | v3.8.6 之前的书签         | 自动重定向到 `/dashboard/acp-agents`（308）        |
