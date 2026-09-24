# ACP (Agent Client Protocol) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **简而言之**：ACP 允许 OmniRoute 将 CLI 代理（例如 Claude Code、Codex）作为子进程启动，而不是使用 HTTP API。这为你提供了“CLI 即后端”的传输方式。

---

## 什么是 ACP？

ACP（Agent Client Protocol，代理客户端协议）是 OmniRoute 的一种**“CLI 即后端”传输方式**。ACP 不会拦截对 AI 提供者的 HTTP API 调用，而是**将 CLI 代理作为子进程启动**，并通过其原生接口传递提示词。

### 为什么使用 ACP？

| 优势              | 说明                             |
| ----------------- | -------------------------------- |
| **无需 API 密钥** | 使用现有的 CLI 身份验证          |
| **原生协议**      | 使用每个 CLI 的原生输入/输出格式 |
| **自动发现**      | 检测系统中已安装的 CLI           |
| **15 个内置代理** | 已针对常用 CLI 工具进行预配置    |
| **自定义代理**    | 通过设置添加你自己的 CLI 工具    |
| **进程管理**      | 处理生命周期（启动、发送、终止） |

---

## 支持的 CLI 代理

ACP 开箱即用地支持 **15 个内置 CLI 代理**：

| 代理 ID       | 显示名称           | 二进制文件    | 协议  |
| ------------- | ------------------ | ------------- | ----- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio |
| `claude`      | Claude Code CLI    | `claude`      | stdio |
| `goose`       | Goose CLI          | `goose`       | stdio |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio |
| `aider`       | Aider              | `aider`       | stdio |
| `opencode`    | OpenCode           | `opencode`    | stdio |
| `cline`       | Cline              | `cline`       | stdio |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio |
| `forge`       | ForgeCode          | `forge`       | stdio |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio |
| `interpreter` | Open Interpreter   | `interpreter` | stdio |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio |
| `warp`        | Warp AI            | `warp`        | stdio |
| `gemini`      | Gemini CLI         | `gemini`      | stdio |
| `zcode`       | ZCode              | `zcode`       | stdio |

### 自定义代理

你可以通过设置添加自己的 CLI 代理。自定义代理支持与内置代理相同的功能。

---

## 快速开始

### 第 1 步：安装 CLI 代理

```bash
# 示例：安装 Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

### 第 2 步：ACP 自动检测

ACP 会自动检测系统中已安装的 CLI 代理。无需配置！

### 第 3 步：使用 ACP 传输

检测到 CLI 后，ACP 可用作任何受支持提供者的传输方式。当 CLI 可用时，OmniRoute 将自动使用 ACP。

---

## ACP 的工作原理

### 架构

```
┌─────────────────┐
│  OmniRoute      │
│  （HTTP 代理）  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  子进程         │
│  （CLI 代理）   │
│                 │
│  stdin  ◄──────┤  发送提示词
│  stdout ──────►│  接收响应
│  stderr ──────►│  接收错误
└─────────────────┘
```

### 进程生命周期

1. **启动** — ACP 为 CLI 代理创建一个子进程
2. **发送** — ACP 将提示词写入进程的 stdin
3. **接收** — ACP 从 stdout/stderr 读取响应
4. **空闲检测** — ACP 等待 2 秒无活动后，将响应视为完成
5. **终止** — ACP 终止进程（先发送 SIGTERM，5 秒后再发送 SIGKILL）

### 通信协议

ACP 使用 **stdio**（标准输入/输出）与 CLI 代理通信。协议如下：

1. **发送提示词** — 将内容连同换行符写入 stdin
2. **等待响应** — 从 stdout 读取内容，直到进入空闲状态（2 秒无输出）
3. **超时** — 默认为 120 秒（可配置）

---

## API 参考

### 注册表函数

#### `detectInstalledAgents()`

检测系统上所有已安装的 CLI 代理。结果会缓存 60 秒。

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// 返回：CliAgentInfo[]

interface CliAgentInfo {
  id: string; // 例如："codex"、"claude"
  name: string; // 显示名称
  binary: string; // 要启动的二进制文件名称
  versionCommand: string; // 版本检测命令
  version: string | null; // 检测到的版本（未安装时为 null）
  installed: boolean; // 代理是否已安装
  providerAlias: string; // OmniRoute 中的提供者 ID
  spawnArgs: string[]; // 启动时传递的参数
  protocol: "stdio" | "http"; // 通信协议
  isCustom?: boolean; // 是否为用户定义的自定义代理
}
```

#### `getAvailableAgents()`

仅获取已安装且可用于 ACP 的代理。

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// 返回：CliAgentInfo[]（仅包含已安装的代理）
```

#### `getAgentById(id)`

按 ID 获取指定代理。

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// 返回：CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

通过设置配置自定义代理定义。

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### 管理器函数

#### `acpManager.spawn(agentId, binary, args, env)`

启动新的 CLI 代理进程。

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* 自定义环境变量 */
});
// 返回：AcpSession
```

**允许的代理 ID**：`["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

向 CLI 代理发送提示词并收集响应。

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 超时 2 分钟
);
// 返回：Promise<string>
```

#### `acpManager.kill(sessionId)`

终止会话并执行清理。

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// 返回：boolean
```

#### `acpManager.getActiveSessions()`

获取所有活动会话。

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// 返回：AcpSession[]
```

#### `acpManager.killAll()`

终止所有会话。

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### 会话接口

```typescript
interface AcpSession {
  id: string; // 唯一会话 ID
  agentId: string; // 代理 ID（例如："claude"）
  process: ChildProcess; // 子进程句柄
  alive: boolean; // 进程是否存活
  stdoutBuffer: string; // 累积的 stdout 缓冲区
  stderrBuffer: string; // 累积的 stderr 缓冲区
  createdAt: Date; // 创建时间戳
}
```

### 事件

`AcpManager` 扩展了 `EventEmitter`，并会触发以下事件：

#### `stdout`

当 CLI 代理写入 stdout 时触发。

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

当 CLI 代理写入 stderr 时触发。

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

当 CLI 代理进程退出时触发。

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

当 CLI 代理进程发生错误时触发。

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## 配置

### 环境变量

ACP 会继承父进程的所有环境变量，也可以使用自定义环境变量进行扩展：

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### 启动参数

每个智能体都有在注册表中定义的默认启动参数。你可以覆盖这些参数：

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### 超时

默认提示词超时时间为 **120 秒**（2 分钟）。你可以覆盖此设置：

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 分钟
```

### 检测缓存

智能体检测结果会缓存 **60 秒**，以避免高开销的文件系统扫描。强制刷新：

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## 安全性

### 防止命令注入

ACP 会验证版本命令，以防止命令注入攻击：

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

包含以下字符的版本命令会被拒绝：

- `;` — 命令分隔符
- `&` — 后台进程
- `|` — 管道
- `<`, `>` — 重定向
- `` ` `` — 命令替换
- `$` — 变量展开
- `\r`, `\n` — 换行符

### 二进制文件名验证

ACP 会验证版本命令中的二进制文件名是否与预期的二进制文件名匹配（自定义智能体除外）。

### 进程隔离

每个 ACP 会话都在其自己的子进程中运行。当会话结束或超时时，该进程会被终止。

---

## 性能

### 检测性能

- **首次调用**：约 50-200ms（为每个智能体运行 `version` 命令）
- **缓存调用**：<1ms（从缓存返回）
- **缓存 TTL**：60 秒

### 提示词性能

- **启动**：约 50-100ms
- **发送提示词**：约 10-50ms
- **等待响应**：取决于 CLI 智能体（通常为 1-30 秒）
- **终止**：约 5 秒（SIGTERM）+ 立即终止（SIGKILL）

### 资源使用情况

- **每个会话的内存**：约 10-50MB（取决于 CLI 智能体）
- **CPU**：极低（I/O 密集型）
- **磁盘**：无

---

## 故障排除

### “Unknown agent” 错误

**问题**：`acpManager.spawn()` 抛出 `Unknown agent: <id>`

**解决方案**：`spawn()` 仅允许使用以下智能体：

- `claude`
- `codex`
- `gemini`
- `qwen`

其他智能体必须手动启动或通过自定义智能体定义启动。

### “Session not alive” 错误

**问题**：`acpManager.sendPrompt()` 抛出 `Session ${sessionId} is not alive`

**解决方案**：会话可能已退出或被终止。请检查会话状态：

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // 重新启动会话
  acpManager.spawn("claude", "claude", [], {});
}
```

### “ACP timeout” 错误

**问题**：`acpManager.sendPrompt()` 抛出 `ACP timeout after 120000ms`

**解决方案**：增加超时时间：

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 分钟
```

### 未检测到 CLI

**问题**：`detectInstalledAgents()` 找不到你的 CLI

**解决方案**：

1. **检查 PATH**：确保 CLI 位于系统 PATH 中
2. **检查版本命令**：手动运行 `claude --version`
3. **检查权限**：确保 CLI 可执行
4. **自定义智能体**：为非标准 CLI 添加自定义智能体定义

### 权限被拒绝

**问题**：ACP 无法执行 CLI

**解决方案**：

1. **检查文件权限**：`chmod +x /usr/local/bin/claude`
2. **检查所有权**：确保 OmniRoute 具有读取/执行权限
3. **检查 SELinux/AppArmor**：它们可能会阻止进程启动

---

## 示例

### 示例 1：启动并使用 Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// 检测已安装的智能体
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // 启动一个新会话
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // 发送提示词
  const response = await acpManager.sendPrompt(session.id, "用 100 个单词解释量子计算");

  console.log("Claude 的响应：", response);

  // 清理资源
  acpManager.kill(session.id);
}
```

### 示例 2：自动发现并提供回退方案

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// 首先尝试 Claude，如果不可用则回退到 Codex
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("未找到兼容 ACP 的 CLI 智能体");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "你好！");

acpManager.kill(session.id);
```

### 示例 3：自定义智能体

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// 注册自定义 CLI 智能体
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// 现在 detectInstalledAgents() 将包含 "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## 后续内容

- **[API 参考](../reference/API_REFERENCE.md)** — REST API 端点
- **[提供者参考](../reference/PROVIDER_REFERENCE.md)** — 全部 352 个提供者
- **[MCP 服务器](./MCP-SERVER.md)** — 模型上下文协议集成
- **[A2A 服务器](./A2A-SERVER.md)** — 智能体间协议
- **[云智能体](./CLOUD_AGENT.md)** — 基于云的智能体

---

## 参考资料

- [AionUi 项目](https://github.com/iOfficeAI/AionUi) — ACP 自动检测的灵感来源
- [ACP 源代码](../../src/lib/acp/) — 实现细节
  - `manager.ts` — 进程生命周期管理
  - `registry.ts` — 智能体发现与注册
  - `index.ts` — 公共 API 导出
