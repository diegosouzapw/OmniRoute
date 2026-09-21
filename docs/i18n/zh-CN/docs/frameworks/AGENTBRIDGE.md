# AgentBridge (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge 是 OmniRoute 的 MITM（中间人）代理，可拦截来自 IDE AI 智能体的 HTTPS 流量，并通过 OmniRoute 的统一路由引擎重新路由。它支持 **10 个 IDE 智能体** — Antigravity、Kiro、GitHub Copilot、GHE Copilot、OpenAI Codex、Cursor、Zed、Claude Code、Open Code 和 Trae（正在调研）— 使 OmniRoute 成为市场上覆盖范围最广的 AI 编程助手 MITM 代理。

**仪表板位置：** `/dashboard/tools/agent-bridge`
**侧边栏分组：** 工具（位于 Cloud Agents 之后）
**另请参阅：** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — 实时监控所有被拦截的流量；`docs/security/MITM-TPROXY-DECRYPT.md`（位于 git 中；未编译到 `/docs`）— 由 `/api/tools/agent-bridge/tproxy` 路由驱动的 Linux TPROXY 透明解密捕获模式。

---

## §1 概述

### 什么是 AgentBridge？

当 IDE 智能体（例如 GitHub Copilot、Cursor、Claude Code）发起 API 调用时，它会直接连接到上游 AI 提供者（OpenAI、Anthropic 等）。AgentBridge 在 TLS 层透明地拦截该连接 — 无需更改任何智能体配置 — 并通过 OmniRoute 重写请求。

这意味着你可以：

- **将任何智能体重新路由到任何提供者**：Copilot 正在与 OpenAI 通信？可将其重定向到 Anthropic Claude、Gemini 或 OmniRoute 的任意一家 352 个提供者。
- **应用模型映射**：在处理程序层透明地将 `gemini-3-flash` → `claude-sonnet-4.7`。
- **观察所有智能体流量**：每个被拦截的请求都会发布到[流量检查器](./TRAFFIC_INSPECTOR.md)。
- **应用 OmniRoute 弹性机制**：组合路由、断路器、回退和成本跟踪同样适用于 IDE 智能体流量。

### 与市场产品的定位对比

| 功能           | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| -------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity    |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)     |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex   |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE     |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries |    —    |    ✓     |        —        |             ✓             |
| Claude Code    |    —    |    —     |        ✓        |             ✓             |
| Open Code      |    —    |    —     |        ✓        |             ✓             |
| Trae           |    —    |    —     |        —        |        🔍 正在调研        |
| 仪表板 UI      |    ✓    |    ✗     |        ✗        |             ✓             |
| 流量检查器     |    ✗    |    ✗     |        ✓        |             ✓             |
| OmniRoute 路由 |    ✗    |    ✗     |        ✗        |             ✓             |
| 模型映射 UI    |    ✗    |    ✗     |        ✗        |             ✓             |
| 绕过列表       |    ✗    |    ✗     |        ✓        |             ✓             |
| 上游 CA 证书   |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 架构

### 2.1 组件概览

```
IDE 代理（VS Code / Cursor / 等）
    │  HTTPS（端口 443）
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← DNS 重定向
    │
    ▼
src/mitm/server.cjs  （端口 443，CJS 子进程）
    │  根据 Host 标头的 SNI 解析目标
    │  生成由 AgentBridge CA 签名的逐 SNI TLS 证书
    ├── 匹配绕过列表？→ TCP 直通（不解密）
    ├── 匹配目标？→ fetch → OmniRoute 路由器（端口 20128）
    │       └── handler.intercept() — TypeScript
    │               ├── 对请求正文/标头调用 maskSecrets()
    │               ├── TrafficBuffer.push() — 发布到流量检查器
    │               └── fetchRouter() → /v1/chat/completions
    └── 未匹配？→ TCP 直通（不解密）
```

### 2.2 MITM 服务器（`src/mitm/server.cjs`）

核心 MITM 服务器作为 Node.js CJS 子进程运行（以避免重写现有 CJS 代码库）。它：

- 监听端口 443（需要特权或 `authbind`/`setcap`）
- 接收来自操作系统的 CONNECT 隧道（通过 `/etc/hosts` DNS 重定向）
- 生成由 AgentBridge CA（`DATA_DIR/mitm/ca.crt`）签名的逐 SNI TLS 证书
- 通过 `targets/index.ts` 注册表，根据 Host 标头解析目标代理
- 通过 HTTP 将请求分派至 `http://127.0.0.1:20128` 上的 TypeScript 处理器层

`TARGET_HOSTS` 从 `DATA_DIR/mitm/targets.json` 加载（由 `targets/index.ts` 在启动时写入），从而无需重启 CJS 服务器即可动态更新。

> **根 CA 模型（#6684）。** 上述由 CA 签名逐 SNI 证书的描述
> 是 #6684 中新增的持久化根 CA 模型（`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`，复用了已在
> `src/mitm/tproxy/dynamicCert.ts` 中为 TPROXY 验证过的 CA/叶证书加密实现）——它取代了
> 旧版的单个静态自签名叶证书（`src/mitm/cert/generate.ts`，其范围仍
> 仅限于 antigravity 主机）；磁盘上仅存在 `server.crt`/`server.key`
> 对即表明使用的是旧模型。**迁移行为**：全新安装（不存在先前的
> `server.crt`）会自动使用根 CA 模型；已经信任
> 旧静态叶证书的安装会继续使用该证书，直至操作员设置
> `MITM_ROOT_CA_ENABLED=true` 并重启桥接器（`src/mitm/cert/migration.ts`
> 是纯决策函数——能够为**任意**主机签发叶证书的受信任 MITM CA，
> 其能力远强于旧的固定 SAN 叶证书，因此对于已建立信任的安装，
> 切换绝不会静默进行）。CA 证书会安装到旧叶证书所使用的同一个
> `omniroute-mitm.crt` 信任存储槽位
> （`cert/install.ts::installCaCert`）——无需进行双重信任清理。

### 2.3 处理器基类（`src/mitm/handlers/base.ts`）

所有代理处理器都扩展 `MitmHandlerBase`：

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // 受保护的辅助方法：fetchRouter、pipeSSE、hookBufferStart、hookBufferUpdate
}
```

每个处理器都会在代理请求前调用 `hookBufferStart()`，并在完成时调用 `hookBufferUpdate()`。这些方法会将 `InterceptedRequest` 条目推送到 `globalTrafficBuffer` 中（参见[流量检查器](./TRAFFIC_INSPECTOR.md) §4）。

### 2.4 目标注册表（`src/mitm/targets/`）

每个代理都有一个声明式目标文件：

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

注册表（`targets/index.ts`）导出 `ALL_TARGETS`，并在启动时生成 `DATA_DIR/mitm/targets.json`。

### 2.5 直通和绕过列表（`src/mitm/passthrough.ts`）

**绕过列表**（首先检查，优先于目标匹配）：

- 默认模式：银行主机、`.gov.`、OAuth/SSO 提供者（Okta、Auth0）等
- 用户模式：存储在数据库表 `agent_bridge_bypass` 中
- 被绕过的主机会获得透明 TCP 隧道——TLS **绝不会被解密**

**默认直通**（未匹配目标且不在绕过列表中）：

- 同样会获得 TCP 隧道——连接绝不会被中断
- 防止 AgentBridge 干扰常规系统 HTTPS 流量

路由优先级：

```
绕过列表 → 目标匹配 → 直通
```

### 2.6 上游 CA 证书（`src/mitm/upstreamTrust.ts`）

对于使用自定义 CA 的企业网络环境：

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

设置后，会使用额外的 CA 证书配置 `undici` 的全局调度器，使 AgentBridge 能够通过企业 TLS 终止代理连接上游提供者。

### 2.7 密钥遮蔽（`src/mitm/maskSecrets.ts`）

独立的洁净室扫描器会在请求正文和凭据标头进入流量检查器缓冲区或任何日志
**之前**应用于它们。它会执行单次线性扫描：

- 带 `sk-` / `ak-` / `pk-` 前缀的令牌（OpenAI/Anthropic 风格）
- RFC 6750 `Authorization: Bearer <token>` 凭据，完整令牌优先
- 通用长不透明令牌（≥40 个字符），包括带点和填充的形式

`sanitizeHeaders()` 会将保留的名称转换为小写，以确定性方式连接数组值，丢弃
共享的逐跳/帧控制拒绝列表中的标头（包括代理身份验证），完整遮蔽 `cookie` 和
`set-cookie`，并将凭据值交由扫描器处理。

---

## §3 设置

### 3.1 启动/停止 MITM 服务器

使用 `/dashboard/tools/agent-bridge` 中的 AgentBridge 服务器卡片：

| 操作         | 描述                                                 |
| ------------ | ---------------------------------------------------- |
| 启动服务器   | 在端口 443 上启动 `src/mitm/server.cjs`              |
| 停止服务器   | 优雅地关闭子进程                                     |
| 重启服务器   | 停止并重新启动（应用目标变更）                       |
| 信任证书     | 将 `DATA_DIR/mitm/ca.crt` 安装到操作系统信任存储区   |
| 下载证书     | 下载 `ca.crt` 以便手动安装                           |
| 重新生成证书 | 创建新的 CA 密钥对（现有的所有代理专用证书都将失效） |

### 3.2 信任证书

在 IDE 接受 MITM 连接之前，操作系统必须信任 AgentBridge CA 证书。

**Linux（NSS — Chrome/Firefox）：**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS（钥匙串）：**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows（certmgr）：**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

也可以使用仪表板中的“信任证书”按钮（它会运行适用于你操作系统的命令，并在需要时提示输入 sudo 密码）。

#### 基于 Electron 的 IDE 会忽略操作系统信任存储区（`NODE_EXTRA_CA_CERTS`）

某些 IDE——尤其是 **Antigravity IDE**，以及其他基于 Electron / VS Code 的应用——内置了自己的 Node.js 运行时，该运行时在执行出站 `fetch`/HTTPS 请求时**不会查询操作系统信任存储区**。在操作系统/NSS 层面信任 CA 足以让 IDE 的原生**后端**正常工作（例如使用操作系统 CA 证书包的 Go 语言服务器），但 **Electron 前端**仍会发生 TLS 失败——表现为应用处于_已登出_状态或显示_“连接错误”_，即使 MITM 日志显示后端的引导调用返回了 `200`。需要完成以下两个步骤，缺一不可：

1. 明确指定运行时使用该 CA：
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **从该 shell 启动 IDE。** 从桌面图标 / Dock / 开始菜单启动时，应用**不会**继承 shell 中导出的变量，而 `~/.config/environment.d/*.conf` 仅会在重新登录图形界面后生效。请先彻底退出 IDE——Electron 的单实例锁意味着第二次启动只会聚焦现有进程，并忽略新的环境变量。

上述操作系统信任 + NSS 步骤仍然必不可少（某些身份验证流程使用的 Chromium 网络栈会读取每用户 NSS 存储区，并且对 `*.googleapis.com` 设有自己的静态固定规则，而本地受信任的 CA 可以覆盖这些规则）。在此基础上，`NODE_EXTRA_CA_CERTS` 用于覆盖 Node 的 `fetch` 路径。

### 3.3 DNS 路由

对于你想要拦截的每个代理，其 API 主机都必须解析到 `127.0.0.1`。当你在设置向导中为代理切换 DNS 状态时，AgentBridge 会自动管理 `/etc/hosts` 条目。

GitHub Copilot 的 `/etc/hosts` 条目示例：

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 模型映射

使用每个代理卡片中的模型映射表来定义源模型 → 目标模型映射：

| 源模型（代理原生） | 目标模型（OmniRoute） |
| ------------------ | --------------------- |
| `gpt-4o`           | `claude-sonnet-4.7`   |
| `*`（通配符）      | `claude-haiku-4.7`    |

通配符 `*` 会将任何无法识别的模型映射到指定目标。映射持久化存储在 `agent_bridge_mappings` 表中。

> **提示——确定代理真实使用的模型 ID。** IDE 发送的模型名称可能与其 UI 标签不同，也可能随主要版本更新而变化。例如，**Antigravity 2** 实际传输的是 `gemini-3.1-pro-low`、`gemini-pro-agent` 和 `gemini-3.1-flash-lite`，而不是旧版文档中显示的 `gemini-2.5-pro`。在没有匹配映射的情况下发送一次聊天请求：MITM 会记录传入的确切 `model:` 值，并将请求直接转发。映射该字面值后，下一个请求就会被拦截并路由到你的目标模型。

### 3.5 风险提示

AgentBridge 会拦截 IDE 用于向上游提供者进行身份验证的凭据（OAuth 令牌、API 密钥）。这些凭据在记录日志前会被**掩码处理**（请参阅 §2.7），但 OmniRoute 的 MITM 层仍可看到它们。首次激活每个代理时，系统都会显示一个可关闭的风险提示模态框。

### 3.6 维护与诊断

仪表板提供了一个**维护与诊断**卡片（`AgentBridgeMaintenanceCard`，位于 `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`），用于展示此前没有 UI 的 MITM 运维路由。其副标题为：_“对捕获管道执行自检、撤销遗留的系统状态，并在不同计算机之间迁移你的设置。”_ 该卡片的客户端辅助函数位于 `src/lib/inspector/agentBridgeMaintenanceApi.ts`。

| 按钮         | 路由                                   | 功能                                                                                                                           |
| ------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **诊断**     | `GET /api/tools/agent-bridge/diagnose` | 运行捕获管线自检，并显示每项检查的报告（✓/✗ + 修复提示）。                                                                     |
| **修复**     | `POST /api/tools/agent-bridge/repair`  | 撤销因崩溃或 SIGKILL 遗留的孤立 MITM 系统状态（DNS 欺骗条目、根 CA、系统代理）。此操作具有幂等性——当状态干净时报告“无需修复”。 |
| **移除 CA**  | `DELETE /api/tools/agent-bridge/cert`  | 取消信任 MITM 根 CA 并将其从操作系统信任存储中移除（显式、幂等）。仅当 CA 当前受信任时显示；需要进行内联的“移除 CA？”确认。    |
| **导出配置** | `GET /api/tools/agent-bridge/config`   | 下载可移植配置 JSON（参见 §3.7）。                                                                                             |
| **导入配置** | `POST /api/tools/agent-bridge/config`  | 上传之前导出的配置 JSON（参见 §3.7）。                                                                                         |

**诊断检查**（`src/mitm/inspector/diagnostics.ts` 中的 `summarizeDiagnostics()`）。该路由会为每项检查运行有副作用的探测，并将布尔值传入纯汇总器；返回一个统一的 `healthy` 判定以及每项失败对应的提示：

| 检查名称           | 验证内容                                  | 失败时的提示                                                                                     |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `server-running`   | MITM 服务器进程处于活动状态               | “MITM 服务器未运行。请从 AgentBridge 选项卡启动它。”                                             |
| `server-reachable` | MITM 服务器在其端口上接受连接（TCP 探测） | “MITM 服务器未在其端口上接受连接。请检查该端口是否空闲，以及您是否具有绑定该端口的权限。”        |
| `cert-exists`      | MITM 证书已生成并保存在磁盘上             | “尚未生成 MITM 证书。请从 AgentBridge 选项卡生成一个证书。”                                      |
| `cert-trusted`     | MITM 根 CA 位于操作系统信任存储中         | “MITM 根 CA 不受操作系统信任存储信任，因此 TLS 拦截将失败。请从 AgentBridge 选项卡信任该证书。”  |
| `dns-configured`   | 目标主机名已在 `/etc/hosts` 中进行欺骗    | “目标主机名未在 /etc/hosts 中进行欺骗，因此流量永远不会到达代理。请为您要捕获的智能体启用 DNS。” |

**孤立状态横幅：**当页面检测到崩溃后遗留的状态（DNS 欺骗 / CA / 系统代理）时，卡片会显示一条琥珀色横幅——*“上一次会话遗留了系统状态（DNS 欺骗、CA 或系统代理）。请运行修复以将其清理。”*——并突出显示**修复**按钮。`Repair` 是 ProxyBridge 的 `--cleanup` 标志在应用层的对应机制（它委托给 `src/mitm/manager.ts` 中的 `repairMitm()`）。

> MITM 根 CA 会在停止/启动之间保持安装状态，以避免重复出现 sudo
> 提示（行为与 mitmproxy/Charles 相同），因此移除它需要执行显式的
> **移除 CA**操作，而不是在停止时自动进行。

### 3.7 可移植配置的导入/导出

AgentBridge 可以将**操作员可调**状态序列化为带版本的 JSON 数据块，以便在不同计算机之间复现设置。序列化器为 `src/lib/inspector/configPortability.ts`（`exportConfig()` / `importConfig()`），并由 `AgentBridgeConfigSchema` 进行验证。

导出内容恰好包括三个部分（内置默认值有意**不**导出，因此导入操作绝不会复制它们或与它们发生冲突）：

| 字段             | 来源                                                     | 备注                                                            |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| `bypassPatterns` | 用户定义的绕过模式（`agent_bridge_bypass`）              | 不包括默认的银行/政府/okta 模式                                 |
| `customHosts`    | Traffic Inspector 自定义主机（`inspector_custom_hosts`） | 每项：`{ host, kind: "llm"\|"app"\|"custom", label? }`          |
| `agentMappings`  | 每个智能体的模型映射（`agent_bridge_mappings`）          | 对于每个存在映射的智能体：`{ [agentId]: [{ source, target }] }` |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**导入行为**（`POST /api/tools/agent-bridge/config`）：绕过模式和每个智能体的映射将被**整体替换**；自定义主机会以**幂等**方式添加（`INSERT OR IGNORE`）。响应会报告每类配置的应用数量：

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

配置中**不包含**的内容：服务器运行状态、证书路径、各代理的 DNS 状态、上游 CA 路径以及 TPROXY 设置——这些属于主机/运行时状态，而非可移植的偏好设置。

---

## §4 各代理参考

| #   | 代理               | 状态      | 拦截的主机                                                         | 认证类型       |
| --- | ------------------ | --------- | ------------------------------------------------------------------ | -------------- |
| 1   | **Antigravity**    | ✅ 支持   | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth |
| 2   | **Kiro (AWS)**     | ✅ 支持   | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4      |
| 3   | **GitHub Copilot** | ✅ 支持   | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth   |
| 4   | **OpenAI Codex**   | ✅ 支持   | `api.openai.com`（Codex 路径）、`chatgpt.com`                      | OpenAI 密钥    |
| 5   | **Cursor IDE**     | ✅ 支持   | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth   |
| 6   | **Zed Industries** | ✅ 支持   | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth      |
| 7   | **Claude Code**    | ✅ 支持   | `api.anthropic.com`（选择启用）                                    | Anthropic 密钥 |
| 8   | **Open Code**      | ✅ 支持   | `openrouter.ai`, `api.openai.com`（zen 路径）                      | API 密钥       |
| 9   | **Trae**           | 🔍 调查中 | 待定 — 参见 §8                                                     | 待定           |

### 设置向导步骤（按代理）

每个代理卡片都有一个三步设置向导：

1. **验证前置条件** — 服务器是否正在运行？证书是否受信任？IDE 是否已安装（自动检测）？
2. **启用 DNS** — 添加 `/etc/hosts` 条目（需要 sudo）。准确显示将要添加的行。
3. **映射模型** — 可选的模型映射表。支持通配符。

### 代理检测

对于代理 1–8，AgentBridge 会尝试自动检测 IDE 安装：

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// 返回：{ installed: boolean, version?: string, path?: string }
```

检测使用特定于操作系统的路径和二进制文件检查（例如，对 Copilot 使用 `code --list-extensions | grep github.copilot`，对 Antigravity 使用 `~/.config/antigravity/`）。

---

## §5 安全性

### 已应用的硬性规则

| 规则                              | 应用方式                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | 所有处理程序错误在响应或写入缓冲区之前都会经过清理                                  |
| **#13** Shell 环境变量传递        | 编辑 `/etc/hosts` 时使用 `env` 选项 — 不对路径进行字符串插值                        |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/agent-bridge/` 为 LOCAL_ONLY + SPAWN_CAPABLE — 在认证前强制要求回环地址 |

### 敏感主机绕过列表

绕过列表确保金融机构、OAuth/SSO 提供者以及其他敏感主机的流量**永远不会被解密**。它们的 TLS 流量会通过透明 TCP 隧道传输 — OmniRoute 永远无法看到明文。

默认绕过模式包括：

- `*.bank.*`、`*.gov.*`（金融/政府）
- `*.okta.com`、`*.auth0.com`、`*.microsoft.com`（SSO/身份认证）
- `*.apple.com`、`*.icloud.com`（Apple 系统服务）

用户添加的绕过模式存储在 `agent_bridge_bypass` 表中，并且优先于其他所有规则。

### 密钥掩码

应用了来自 `src/mitm/maskSecrets.ts` 的 `maskSecrets()`：

- 在每个请求正文传入 `TrafficBuffer.push()` 之前
- 在记录或广播每个请求头之前

匹配模式：带有 `sk-`/`ak-`/`pk-` 前缀的令牌、`Bearer` 令牌，以及长度 ≥40 个字符的通用令牌。

### 上游 CA 证书

设置 `AGENTBRIDGE_UPSTREAM_CA_CERT` 后，系统会在启动时读取该文件。如果路径存在但文件不可读，AgentBridge 会记录清晰的错误并拒绝启动（防止企业环境中出现无提示的 TLS 故障）。

### 已知限制

- **端口 443 需要特权**：在 Linux 上，AgentBridge 需要对 Node 二进制文件执行 `setcap 'cap_net_bind_service=+ep'`，或通过 `authbind` 运行。设置向导会显示特定于操作系统的说明。
- **需要重启 IDE**：完成 DNS 重定向后，必须重启 IDE，新的主机解析才会生效。
- **硬编码的 OAuth 令牌**：某些代理（Kiro、Antigravity）会在本地存储 OAuth 刷新令牌。这些令牌对 AgentBridge 是透明的 — 它会看到每个请求中的 Bearer 令牌，并在记录日志之前对其进行掩码处理。
- **Electron 前端需要 `NODE_EXTRA_CA_CERTS`**：前端运行在捆绑 Node/Electron 运行时中的 IDE 会忽略操作系统/NSS 信任存储，因此必须从设置了 `NODE_EXTRA_CA_CERTS` 的 shell 中启动（参见 §3.2）。缺少此设置时的症状：IDE 后端认证成功（MITM 显示 `200`），但 UI 仍保持未登录状态。
- **同一 IDE 的多个安装相互独立**：系统安装（例如 `/usr/share/antigravity/antigravity`）和用户本地的“完整”安装（例如 `~/AntigravityIDE_Full/antigravity-ide`）是具有各自运行时的独立进程 — 每个进程都必须在注入 CA 的情况下重新启动。重新启动前，请通过二进制文件路径确认当前正在运行的是哪一个。
- **身份由代理的系统提示词决定，而不是由路由后的模型决定**：将代理的模型重新映射到其他提供者后，回复仍会声称自己具有该代理的原生身份（例如，Antigravity 回答“我由 Gemini 提供支持”），因为 IDE 会将该信息注入系统提示词。请通过 `call_logs` / `proxy_logs`（`provider`、`model`、`target_format`）确认实际后端，而不要询问模型它是谁。

---

## §6 故障排除

### 端口 443 冲突

如果已有其他进程正在监听端口 443（Web 服务器、VPN 等）：

```bash
lsof -i :443          # 查找该进程
sudo fuser -k 443/tcp  # 强制终止（请谨慎使用）
```

或者，在 AgentBridge 设置中配置一个非特权端口，并设置 `iptables` / `pf` 重定向规则。

### 证书不受信任

如果启动 AgentBridge 后 IDE 显示 TLS 错误：

1. 验证证书是否已安装：`security find-certificate -c "OmniRoute AgentBridge"`（macOS）或 `certutil -L -d sql:$HOME/.pki/nssdb`（Linux/NSS）
2. 某些应用会维护自己的信任存储区（如 Firefox、Linux 上的 Chrome）。再次运行“Trust Cert”，并检查 NSS/Firefox 专用证书存储区。
3. 信任证书后重启 IDE——进行中的 TLS 会话仍使用旧的信任状态。

### 尽管 CA 已受信任，IDE 仍处于已注销状态/显示“连接错误”

症状：重定向 DNS 并信任 CA 后，基于 Electron 的 IDE（例如 Antigravity）
启动时显示为**已注销**或出现身份验证/连接错误，但 MITM 日志显示
引导调用（`loadCodeAssist`、`fetchAvailableModels` 等）返回 `200`。

原因：IDE **内置的 Node/Electron 运行时会忽略操作系统信任存储区**。原生
后端（Go 语言服务器）信任操作系统 CA 并能通过身份验证，但 Electron 前端
并不信任——因此 UI 认为自身处于离线状态。

修复方法（两个步骤都要执行）：导出 `NODE_EXTRA_CA_CERTS=<ca.crt>`，**然后从该
shell 重新启动 IDE**，不要从桌面图标启动。请先完全退出 IDE——Electron 的单实例锁意味着
第二次启动只会聚焦现有进程，而新的环境变量会被忽略。请参阅 §3.2。
这与上游的一份未关闭报告中的情况一致：独立代理可以通过 MITM 工作，但 IDE
版本在相同设置下会失败。

### DNS 未传播

检查 `/etc/hosts` 是否已更新：

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

刷新 DNS 缓存：

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux（systemd-resolved）
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### 未检测到 IDE

自动检测使用常见安装路径。如果 IDE 已安装但检测失败：

- 检查 IDE 二进制文件是否位于非标准位置
- 设置向导仍可正常工作——检测失败仅意味着徽标不会显示安装路径

### 处理程序错误（上游获取失败）

如果 AgentBridge 已拦截请求，但所有请求均失败：

1. 验证 `/dashboard/providers` 中至少已连接一个提供者
2. 检查 OmniRoute 服务器日志：在 `.env` 中设置 `APP_LOG_LEVEL=debug`
3. 验证 `OMNIROUTE_BASE_URL` 是否指向正确的路由器端点（默认值：`http://127.0.0.1:20128`）

---

## §7 API 参考

所有路由均为 `LOCAL_ONLY`（仅限环回地址，在身份验证前强制执行）和 `SPAWN_CAPABLE`。请参阅 `src/server/authz/routeGuard.ts`。

基础路径：`/api/tools/agent-bridge/`

| 方法                | 路径                                           | 描述                                                                                                   |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| GET                 | `/api/tools/agent-bridge/state`                | 全局服务器状态 + 各代理的检测结果/状态                                                                 |
| GET                 | `/api/tools/agent-bridge/agents`               | 列出已注册的代理（id、名称、主机、可用性、状态）                                                       |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | 单个代理的状态（目标配置 + 检测结果 + 已存储状态）                                                     |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | 更新代理的 `setup_completed`                                                                           |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | 对代理运行检测探针（`installed`、`version?`、`path?`）                                                 |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | 为代理启用/禁用 DNS（`{enabled: boolean}`）                                                            |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | 获取代理的模型映射                                                                                     |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | 替换模型映射                                                                                           |
| POST                | `/api/tools/agent-bridge/server`               | 启动/停止/重启服务器（`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`）          |
| GET                 | `/api/tools/agent-bridge/cert`                 | 证书状态（`exists`、`trusted`、`path`）                                                                |
| POST                | `/api/tools/agent-bridge/cert`                 | 信任（安装）MITM 根 CA                                                                                 |
| DELETE              | `/api/tools/agent-bridge/cert`                 | 取消信任（移除）MITM 根 CA — 幂等操作（参见 §3.6）                                                     |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | 重新生成自签名 MITM 证书                                                                               |
| GET                 | `/api/tools/agent-bridge/cert/download`        | 以流式方式传输 PEM 证书供下载                                                                          |
| GET                 | `/api/tools/agent-bridge/bypass`               | 列出绕过模式（`default` + `user`）                                                                     |
| POST                | `/api/tools/agent-bridge/bypass`               | 整体替换用户定义的绕过模式                                                                             |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | 移除单个用户定义的绕过模式                                                                             |
| GET                 | `/api/tools/agent-bridge/diagnose`             | 捕获管道自检（参见 §3.6）                                                                              |
| POST                | `/api/tools/agent-bridge/repair`               | 撤销遗留的 MITM 系统状态（参见 §3.6）                                                                  |
| GET                 | `/api/tools/agent-bridge/config`               | 导出可移植配置 JSON（参见 §3.7）                                                                       |
| POST                | `/api/tools/agent-bridge/config`               | 导入可移植配置 JSON（参见 §3.7）                                                                       |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | 获取已配置的上游 CA 路径                                                                               |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | 验证并持久保存上游 CA 路径                                                                             |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | 仅验证（试运行）上游 CA 路径 — 不进行持久化                                                            |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | TPROXY 透明解密捕获模式 — 参见 `docs/security/MITM-TPROXY-DECRYPT.md`（位于 git 中；未编译到 `/docs`） |

完整的 OpenAPI 架构：`docs/openapi.yaml` → 标签 `AgentBridge`。

---

## §8 路线图

### Trae 调研

Trae 是一款相对较新的 AI 编程助手。在实现处理器之前：

1. 在 VS Code / JetBrains 市场中或作为独立应用识别其二进制文件/扩展
2. 使用 mitmproxy 捕获流量，以发现 API 主机和端点结构
3. 确定身份验证机制
4. 根据 TOS 和 API 的可发现性评估是否继续

在调研完成之前，仪表板中的 Trae 卡片会显示“调研中”徽章和“报告可行性”链接。位于 `src/mitm/handlers/trae.ts` 的处理器存根会抛出结构化的“尚未实现”错误。

### 待办代理（需要 MITM — 不支持自定义基础 URL）

以下工具的当前版本不支持自定义基础 URL，因此 MITM 是唯一的拦截途径。可行性评估尚未完成：

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — 与 Kiro IDE 不同)
- **Cowork** (Anthropic 桌面版)

注意：GitHub Copilot CLI ≥v1.0.19 支持 `COPILOT_PROVIDER_BASE_URL` — 对该工具请使用直接配置，而不是 MITM。
