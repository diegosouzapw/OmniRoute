# ACP registry and registered CLI launchers (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute 将 **CLI 发现**、**原生 Agent Client Protocol** 和
**旧版 stdio 适配器**区分开来。发现已安装的二进制文件并不能证明其
身份验证、模型兼容性或处理提示词的就绪状态。

仪表板使用 `GET /api/acp/agents` 和 `POST /api/acp/agents` 进行清单管理
和自定义智能体注册。这些是仅限本地使用的管理路由，并非用于生成进程
或提交提示词的公共 API。内部 `AcpManager` 不会自动成为 HTTP 提供者的后备方案。

## 已注册的契约

`config/cli-tools-manifest.json` 是内置启动二进制文件、参数和后端模式的
权威来源。注册表从该清单派生其定义。检测结果会缓存 60 秒。

- `acp`：Gemini 契约会启动 `gemini --experimental-acp`，并通过官方 TypeScript SDK
  使用以换行符分隔的 ACP JSON-RPC 进行通信。
- `stdio-adapter`：其他已注册的契约保留旧版的换行输入、stdout 输出适配器。
  输出空闲两秒后，其响应即告结束。此适配器**并不**证明这些 CLI
  原生支持 ACP。

Gemini 在其 [CLI 参考文档](https://geminicli.com/docs/cli/cli-reference/)中记录了该启动标志。
客户端使用[官方 ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
执行初始化、会话创建、提示词请求、通知和取消操作。

自定义智能体定义仍是由管理员控制的启动契约。
注册二进制文件及其参数会授予该进程服务器用户的本地执行权限；
注册并非沙箱。版本探测仅接受已注册的可执行文件和可识别的版本标志。

## 内部启动 API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // 仅传递特意分配给此智能体的提供者变量。
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // 在调用方应用程序中使用响应。
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` 从已注册的定义中解析可执行文件和参数。
调用方仅可使用 `cwd` 和 `env` 选项；旧的
`spawn(agentId, binary, args, env)` 签名和可执行文件覆盖将被拒绝。
此管理器不支持 HTTP 启动契约。

子进程继承与 CLI 启动器相同的操作系统、终端、区域设置和证书允许列表。
服务器/提供者密钥不会从父环境复制。所选 CLI 所需的凭据必须显式传递，
或通过该 CLI 自身的本地身份验证提供。子进程仍拥有本地用户的文件系统权限，
并且可以读取自己的配置。

## 原生生命周期和限制

1. 生成已注册的二进制进程，初始化 ACP，并创建以所选工作目录为根目录的会话。
   初始化时限为十秒。
2. 提交提示词，并且仅收集该会话的文本通知。
   提示词 RPC 响应即表示完成，而不是等待 stdout 进入一段静默期。
3. 使用一个提示词截止时间，其中包括任何尚未完成的初始化；默认时限
   为 120 秒。同一进程中的并发提示词将被拒绝。
4. 原生模式超时时，尝试执行 `session/cancel` 并终止进程。
   终止前提供一个有界的 100 ms 窗口，让通知完成刷新。
5. 初始化失败、连接关闭、进程退出或调用方终止进程时，
   关闭传输状态并移除会话。

工具权限请求将被拒绝。不声明任何文件系统或终端客户端能力。
这些限制不会对该子二进制进程本身实施沙箱隔离，
也不会取代 CLI 自身的授权设置。

原生文本和旧版 stdout/stderr 最多都保留 1 MiB 字符，
仅保留最新输出并附带截断通知。单个原生线路帧在 SDK 解析前
最多允许 2 MiB 字节。每次提示词请求都会重置缓冲区。

`kill(sessionId)` 先发送 SIGTERM；如果进程在五秒后仍未退出，则发送 SIGKILL。
旧版提示词超时会释放监听器和计时器，但会让会话保持可用，以便再次提交提示词；
完成后，调用方仍有责任调用 `kill()` 或 `killAll()`。

## 事件和检查

管理器会发出 `stdout`、`stderr` 和 `exit` 事件，每个事件都带有 `sessionId`。
`sessionError` 报告经过净化处理的传输错误。仅当存在订阅者时，
才会发出兼容性 `error` 事件，因此缺少二进制文件不会导致未处理的 EventEmitter 错误。

- `getSession(sessionId)` 返回托管会话或 `undefined`。
- `getActiveSessions()` 排除已停止或正在停止的会话。
- `sendInput(sessionId, input)` 仅适用于仍在运行的旧版适配器；
  原生 ACP 会拒绝原始输入，以保护其 JSON-RPC 流。
- `killAll()` 终止该实例管理的所有会话。

## 验证边界

确定性固件涵盖原生握手、文本输出、权限拒绝、取消、并发提示词、
初始化失败、进程退出、输出限制和密钥隔离。现有的旧版缓冲区/监听器
回归场景仍在覆盖范围内。这些测试无法证明 Gemini 实时登录或提供者推理成功；
这些功能需要在目标环境中单独进行已授权的冒烟测试。

## 相关文档

- [智能体协议](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI 启动契约](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI 工具](../reference/CLI-TOOLS.md)
- [A2A 服务器](./A2A-SERVER.md)
- [云端智能体](./CLOUD_AGENT.md)
