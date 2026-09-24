# Traffic Inspector (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector 是 OmniRoute 内置的 HTTPS 流量调试器——类似于 Charles Proxy / mitmweb / HTTP Toolkit，但它能够**感知 LLM**和**感知代理**。它位于 `/dashboard/tools/traffic-inspector`，最多可接收来自 5 个并发捕获源的实时流量。

**仪表板位置：** `/dashboard/tools/traffic-inspector`
**侧边栏分组：** 工具（位于 AgentBridge 之后）
**另请参阅：** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md)——AgentBridge 是捕获模式 1。

---

## §1 概述

### Traffic Inspector 的独特之处

| 功能                                                            | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
| --------------------------------------------------------------- | :-----: | :-----: | :-----: | :-----------------------------: |
| 基于 Web                                                        |    ✓    |    ✗    |    ✗    |                ✓                |
| 开源                                                            |    ✓    |    ✗    |  部分   |                ✓                |
| **可感知代理**（知道请求是否来自 Antigravity/Copilot 等）       |    ✗    |    ✗    |    ✗    |                ✓                |
| **可感知 LLM**（解析 OpenAI/Anthropic/Gemini 格式、令牌、模型） |    ✗    |    ✗    |    ✗    |                ✓                |
| **模型映射可见**（gemini-3-flash → claude-sonnet-4.7）          |    ✗    |    ✗    |    ✗    |                ✓                |
| **区分代理/上游延迟**                                           |  部分   |    ✗    |    ✗    |                ✓                |
| **与 OmniRoute 集成**，涵盖路由、故障转移、成本                 |    ✗    |    ✗    |    ✗    |                ✓                |
| **系统级代理调试**（计算机上的任何应用）                        |    ✓    |    ✓    |    ✓    |                ✓                |
| **自定义主机捕获**（按主机进行 DNS 重定向）                     |    ✓    |    ✓    |    ✓    |                ✓                |
| **HTTP_PROXY 环境变量模式**                                     |    ✓    |    ✓    |    ✓    |                ✓                |
| **对话视图**（多轮气泡、tool_use/tool_result）                  |    ✗    |    ✗    |    ✗    |                ✓                |
| **SSE 流合并器**（从增量事件重建）                              |    ✗    |    ✗    |    ✗    |                ✓                |
| **会话录制**（可命名，可导出为 .har/.jsonl）                    |    ✗    |    ✓    |    ✓    |                ✓                |

### 架构概述

`TrafficBuffer`（`src/mitm/inspector/buffer.ts`）是一个共享的内存环形缓冲区（默认 1000 个条目，可通过 `INSPECTOR_BUFFER_SIZE` 配置）。所有捕获源均通过 `push()` 写入其中。该缓冲区使用 `kindDetector.ts` 对每个条目进行分类（判断其是否为 LLM 请求），计算 `contextKey`（系统提示词的 SHA-256 指纹），并通过 `globalTrafficBuffer.subscribe()` 广播给所有 WebSocket 订阅者。仪表板通过 `GET /api/tools/traffic-inspector/ws` 建立连接，连接后会收到一份快照，随后接收 `new`/`update`/`clear` 事件。

---

## §2 捕获模式

流量检查器支持 **5 个并行捕获源**。每个捕获源都可以独立开启或关闭。每个 `InterceptedRequest`（`src/mitm/inspector/types.ts`）上的 `source` 字段是 `"agent-bridge"`、`"custom-host"`、`"http-proxy"`、`"system-proxy"` 或 `"tproxy"` 之一。

### 模式 1 — AgentBridge（默认，始终开启）

**来源：** AgentBridge 处理程序（`src/mitm/handlers/base.ts`）
**机制：** `MitmHandlerBase` 中的每次 `intercept()` 调用都会在转发前调用 `hookBufferStart()`，并在完成时调用 `hookBufferUpdate()`。无需额外配置——AgentBridge 一经运行即可工作。
**覆盖范围：** AgentBridge 中配置的 9 个 IDE 智能体
**注意：** `InterceptedRequest` 中的 `source` 字段 = `"agent-bridge"`

### 模式 2 — 自定义主机（DNS 重定向）

**来源：** 用户定义的主机列表（`inspector_custom_hosts` 表）
**机制：** 通过 UI 添加主机时，会将 `127.0.0.1 <host>` 添加到 `/etc/hosts`（需要 sudo）。现有的 AgentBridge MITM 服务器（端口 443）会动态为新主机生成 SNI 证书。
**覆盖范围：** 使用所添加主机的任何应用程序——无需更改应用配置
**注意：** `source` = `"custom-host"`

示例用例：

- 监控 Python 脚本对 `api.openai.com` 的访问
- 调试 `my-internal-llm.company.com`
- 捕获同一网络中移动设备的流量（通过 ARP 欺骗——高级用法）

### 模式 3 — HTTP_PROXY 监听器（端口 8080）

**来源：** 使用 `HTTP_PROXY`/`HTTPS_PROXY` 环境变量的应用程序
**机制：** 端口 8080 上的辅助监听器（`src/mitm/inspector/httpProxyServer.ts`），充当标准的显式 HTTP/HTTPS 代理。接受 `CONNECT` 隧道（HTTPS）和直接 HTTP 请求。
**覆盖范围：** 任何遵循 `HTTP_PROXY` 环境变量的应用程序——无需更改 DNS，无需 sudo
**注意：** `source` = `"http-proxy"`

```bash
# 快速捕获单条命令的流量：
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# 在 shell 会话中持续捕获：
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**TLS 限制：** HTTPS `CONNECT` 隧道仅捕获元数据（主机、端口、计时）——默认情况下不会解密 TLS 正文。开启“在代理模式下解密 HTTPS”开关（选择启用，需要信任 AgentBridge 证书）即可完整检查正文。

**端口冲突：** 如果端口 8080 已被占用，AgentBridge 会返回 409 和结构化错误。可通过 `INSPECTOR_HTTP_PROXY_PORT` 环境变量更改端口。

### 模式 4 — 系统级代理（高级，选择启用）

**来源：** 操作系统级代理设置（应用于计算机上的所有应用程序）
**机制：** 使用操作系统 API 将所有 HTTP/HTTPS 流量重定向至 HTTP_PROXY 监听器：

- **macOS：** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux：** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows：** `netsh winhttp set proxy 127.0.0.1:8080`
  **覆盖范围：** 计算机上所有遵循系统代理设置的应用程序
  **注意：** `source` = `"system-proxy"`

**安全机制：**

- 自动禁用计时器（默认 30 分钟，可通过 `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES` 配置）
- 先前的系统代理状态会保存在数据库中，并在还原时恢复
- 如果用户在系统代理处于活动状态时离开页面，仪表板会显示“正在还原系统代理”提示
- UI 显示 `⚠ 高级` 徽章和明确的确认复选框

### 模式 5 — TPROXY 透明解密（Linux、root、选择启用）

**来源：** 内核 TPROXY + 策略路由（`src/mitm/tproxy/`）
**机制：** 在 `mangle OUTPUT` 中标记发往目标端口（默认为 `443`）的新本地出站 TCP 连接，由 `ip rule` 将标记的数据包重新路由至本地传送，再由 `mangle PREROUTING` 的 `TPROXY` 目标将其交给透明（**IP_TRANSPARENT**）监听器（默认端口 `8443`）。监听器使用动态 CA 按需为**每个 SNI 主机名签发**叶证书以终止 TLS，捕获解密后的交换内容，然后重新加密请求并将其转发至原始目标。
**覆盖范围：** 目标端口上的**任意**目标主机——无需伪造 `/etc/hosts`，无需 `HTTP_PROXY` 环境变量，也无需修改系统级代理。被拦截的进程无需更改任何配置，但必须信任动态 CA。
**注意：** `source` = `"tproxy"`

**要求：** 仅限 Linux（**IP_TRANSPARENT** 仅适用于 Linux）、**CAP_NET_ADMIN** 能力（root），以及必须使用 C 工具链构建的原生 N-API 插件（`npm run build:native:tproxy`）。不可用时，仪表板开关将被禁用，并显示工具提示“TPROXY 解密需要 Linux + root + 原生插件”。防火墙规则以事务方式应用/还原（崩溃绝不会遗留 `mangle` 规则），并在重启时清除。基于 SO_MARK 的防循环机制可防止代理自身重新加密后的转发流量再次被拦截。

这是一个规模较大的子系统，拥有专门的操作指南——有关完整的防火墙配置方案、按 SNI 动态生成的 CA + 信任库安装程序、仅限本地的路由、防循环细节以及配置架构，请参阅 `docs/security/MITM-TPROXY-DECRYPT.md`（位于 git 中；不会编译到 `/docs`）。该开关由 `GET / POST / DELETE /api/tools/agent-bridge/tproxy` 驱动（注意：该路由位于 AgentBridge 前缀下，而不是流量检查器前缀下）。

### 捕获模式比较

| 模式           | 设置                         |     需要 Sudo？      | 作用范围             | 备注                                                                                                      |
| -------------- | ---------------------------- | :------------------: | -------------------- | --------------------------------------------------------------------------------------------------------- |
| 1. AgentBridge | 自动                         | 一次（证书 + hosts） | 9 个 IDE 代理        | 默认开启                                                                                                  |
| 2. 自定义主机  | 按主机输入                   |   是（hosts 文件）   | 使用该主机的任何应用 | 持久化存储在数据库中                                                                                      |
| 3. HTTP_PROXY  | `export HTTPS_PROXY=...`     |          否          | 遵循环境变量的应用   | 端口 8080，默认不进行 TLS 解密                                                                            |
| 4. 系统级      | 切换开关并确认               |          是          | 计算机上的所有应用   | 30 分钟后自动禁用                                                                                         |
| 5. TPROXY 解密 | 切换开关（Linux + 原生插件） | 是（root + 安装 CA） | 目标端口上的任何主机 | 解密任意主机；默认关闭 — 请参阅 `docs/security/MITM-TPROXY-DECRYPT.md`（git 中提供；未编译到 `/docs` 中） |

---

## §3 UI

### 3.1 布局

```
┌─ 流量检查器 ───────────────────────────────────────────────────────────┐
│ ┌─ 捕获源工具栏 ───────────────────────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ 自定义主机 (3)]  [○ HTTP_PROXY]  [○ 系统]    │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ 筛选/控制栏 ────────────────────────────────────────────────────┐   │
│ │ 配置：(●) 仅 LLM  (○) 自定义  (○) 全部                          │   │
│ │ [⎉ 暂停] [🗑 清除] [⬇ .har] [● 录制会话]       ● 实时 482/1k   │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ 请求列表（可调整大小）           ║ 详情面板                            ▲ │
│ ────────────────────────────── │ ║ [对话][请求头][请求]                │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [响应][计时][LLM][统计]              │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 自定义 ║                                       │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 请求列表（左侧面板）

- **虚拟化**（`useVirtualList` + `ResizeObserver`）：可处理 1000 个条目而不会卡顿
- **自动滚动**，可在检查时切换为暂停
- **按状态着色**：绿色（2xx）、黄色（3xx）、红色（4xx/5xx）、灰色（进行中）
- **代理表情符号**：🔵 Antigravity、🟢 Copilot、🟠 Kiro、🟣 Codex、🔷 Cursor、🟤 Zed、🟡 Claude Code、⚫ Open Code、🌐 自定义主机
- **上下文颜色条**：左侧 1px 边框按 `contextKey`（系统提示词的 SHA-256）着色——直观地将相关对话分组
- **延迟加载正文**：仅在详情选项卡中实体化所选请求的正文（避免渲染 1000 × 1MB 的正文）

### 3.3 详情面板——7 个选项卡

| 选项卡       | 内容                                                         | 备注                                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| **对话**     | 多轮聊天气泡（system/user/assistant + tool_use/tool_result） | 从任意提供者格式标准化；仅在 `detectedKind === "llm"` 时显示             |
| **请求头**   | 请求和响应标头表                                             | 敏感标头（Authorization、Cookie、api-key）默认被遮蔽；提供“显示密钥”开关 |
| **请求**     | 原始正文、JSON 树视图、模型字段徽章                          | 格式化的 JSON 或原始文本                                                 |
| **响应**     | 原始正文或 SSE 事件列表；“原始 ↔ 合并”切换                   | SSE 合并器从增量事件中重建最终消息                                       |
| **计时**     | 瀑布图：代理开销与上游延迟对比                               | 总耗时、TTFB 和大小                                                      |
| **LLM 详情** | 提供者、模型、消息数、输入/输出 token、成本估算、映射目标    | 仅对 LLM 请求显示                                                        |
| **统计**     | Recharts：延迟时间线、token 条形图、工具调用散点图           | 仅在加载已录制会话时显示                                                 |

### 3.4 工具栏控件

| 控件           | 操作                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| ⎉ 暂停         | 停止渲染新请求；累积“X 个新请求”徽章                                   |
| 🗑 清除         | 清除 UI 列表（不影响服务器缓冲区）                                     |
| ⬇ 导出 .har    | 将当前筛选后的列表下载为 HAR 文件                                      |
| ● 录制会话     | 开始一个命名的录制会话                                                 |
| 配置选择器     | 仅 LLM / 自定义主机 / 全部                                             |
| 主机筛选器     | 对 `host` 字段进行子字符串匹配                                         |
| 代理筛选器     | 下拉菜单：全部 / 按代理                                                |
| 状态筛选器     | 全部 / 2xx / 3xx / 4xx / 5xx / 错误                                    |
| 来源筛选器     | 全部 / agent-bridge / custom-host / http-proxy / system-proxy / tproxy |
| **实时**筛选器 | 仅显示进行中（打开）的请求——`liveOnly` 开关（参见 §4.6）               |

### 3.5 可调整大小的面板

- 列表和详情面板之间由拖动手柄分隔
- 列表宽度：最小 280px，最大 720px，持久化到 `localStorage`（`inspector.listWidth`）
- 可折叠为 48px 导轨（仅显示图标）；单击导轨中的某一行即可展开

---

## §4 LLM 感知功能

### 4.1 类型检测器（`src/mitm/inspector/kindDetector.ts`）

使用 4 种信号将每个请求分类为 `"llm"`、`"app"` 或 `"unknown"`：

1. **主机注册表** — 约 18 个已知的 LLM API 主机名（OpenAI、Anthropic、Gemini、Groq、Mistral、Together、Fireworks、Cohere、Perplexity、Hugging Face、OpenRouter、xAI、Moonshot 等）
2. **路径模式** — `/v1/chat/completions`、`/v1/messages`、`/generateContent`、`/v1/responses` 等
3. **请求体结构** — 检测 `messages[]`（OpenAI/Claude）、`contents[]`（Gemini）、`prompt`、`input` 字段
4. **用户代理提示** — UA 字符串中的 `codex`、`claude`、`gemini`、`antigravity`、`kiro`、`copilot`、`cursor`

通过模式 2 添加的自定义主机会从表单输入继承其 `kind`（默认为 `"custom"`）。

### 4.2 SSE 合并器（`src/mitm/inspector/sseMerger.ts`）

**独立的洁净室实现。**事件解析遵循
[WHATWG 服务器发送事件算法](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream)，
而重建遵循公开的 [OpenAI](https://platform.openai.com/docs/api-reference/chat/create)、
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) 和
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent)
流式传输架构。

从原始 SSE 增量事件重建最终的助手消息：

- **Anthropic**：按索引累积 `content_block_delta`；处理 `text_delta`、`input_json_delta`（工具调用）、`thinking_delta`
- **OpenAI**：按索引累积 Chat Completions 的选项/工具调用以及 Responses API 的输出项
- **Gemini**：累积 `candidates[i].content.parts`
- **未知**：按原样返回原始事件

响应选项卡会显示一个切换开关：**“原始事件 ↔ 已合并”**。

### 4.3 对话规范化器（`src/mitm/inspector/conversationNormalizer.ts`）

**独立的洁净室实现。**规范化由本地黑盒契约以及公开的 OpenAI、Anthropic 和 Gemini 消息架构定义；未使用任何上游实现源代码。

在渲染之前，将 OpenAI、Anthropic 和 Gemini 消息格式转换为统一的 `NormalizedConversation`：

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // 来自请求体的 messages / contents / prompt
  response: NormalizedTurn[]; // 助手响应（通过 sseMerger 合并）
  contextKey: string | null; // SHA-256 系统提示词指纹
}
```

块类型：`text`、`tool_use`、`tool_result`。无论提供者是谁，对话选项卡都使用此结构。

### 4.4 上下文键着色（`src/mitm/inspector/contextKey.ts`）

- 计算系统提示词的 `SHA-256`（第一个 `role:system` 消息、`system` 字段或 Gemini `systemInstruction`）
- 返回 12 个字符的十六进制前缀（`"a3f9c2..."`）
- 前端将该键映射为确定性的 HSL 颜色，用于左侧边框条
- **“相同上下文”筛选器**：单击 `ctx #a3f` 标签，即可添加筛选条件，仅显示具有相同指纹的请求

这样可以轻松直观地区分同一代理会话中运行的不同“角色”或任务。

### 4.5 LLM 元数据提取

对于 LLM 请求，LLM 详细信息选项卡会提取：

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // 来自请求体或响应
  messages: number; // 轮次计数
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // 如果是 SSE 响应，则为 true
  mappedTo: string | null; // x-omniroute-mapped 标头
  costEstimateUsd: number | null; // 基于 OmniRoute 定价估算的成本
}
```

### 4.6 实时进行中请求筛选器

请求的 `status` 字段为 `number | "in-flight" | "error"`——请求开始时，会立即以 `"in-flight"` 状态推送一个条目；响应（或错误）到达后，则**原地更新**
该条目。工具栏中的**“实时”**切换开关
（`liveOnly`，i18n 键 `trafficInspector.liveOnly`）会将列表限制为
`status === "in-flight"` 的条目，以便实时观察仍处于打开状态的连接。

该筛选器是
`src/lib/inspector/matchesTrafficFilter.ts` 中的纯客户端谓词：

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

切换状态位于 `useTrafficFilters`（检查器仪表板钩子）中，并与其他筛选器（配置文件、主机、代理、来源、状态、上下文）组合使用。

### 4.7 进程归属（Linux）

在 Linux 上，每个被拦截的请求都可以归属于**发起请求的本地进程**。`InterceptedRequest` 中新增了两个可选字段：

```ts
pid?: number;          // 发起请求的进程 ID（仅限 Linux）
processName?: string;  // 发起请求的进程名称（仅限 Linux）
```

`src/mitm/inspector/processAttribution.ts` 通过以下步骤将连接的_客户端_
临时端口映射到 PID 和名称：

1. 读取 `/proc/net/tcp` 和 `/proc/net/tcp6`，查找该端口对应的套接字 inode（`parseProcNetTcpForInode`，一个可使用固件进行测试的纯解析器）。
2. 扫描 `/proc/<pid>/fd/`，查找指向 `socket:[<inode>]` 的符号链接。
3. 从 `/proc/<pid>/comm` 读取进程名称。

1 秒 TTL 缓存限制了负载下 procfs 扫描的成本。归属采用
**尽力而为**的方式——任何失败都会解析为 `null`，且绝不会阻塞捕获。在
macOS/Windows 上，该函数返回 `null`（存根；对 `lsof`/`GetExtendedTcpTable`
的支持将在后续实现）。

---

## §5 会话

### 5.1 录制会话

1. 点击工具栏中的 **“● 录制会话”** → 输入名称（可选）
2. 实时跟踪会正常继续；红色脉冲指示器显示 `◉ 录制中 · <名称> · 00:42 · 23 个请求`
3. 点击 **“⏹ 停止”** → 会话快照将保存到 `inspector_sessions` + `inspector_session_requests`

### 5.2 查看已录制的会话

工具栏中的 **会话** 下拉菜单会列出已保存的会话。选择其中一个会：

- 加载该会话的快照（冻结状态）
- 显示横幅：`正在查看已录制的会话“<名称>” — [返回实时模式]`
- 统计信息选项卡变为可用，并显示 Recharts 聚合数据

### 5.3 导出格式

每个会话均可导出为：

| 格式                       | 用途                                                           |
| -------------------------- | -------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | 与 Chrome DevTools、Charles、Fiddler 兼容 — 可导入进行离线分析 |
| **JSONL**                  | 每行一个 `InterceptedRequest` — 与 `llm-interceptor` 格式兼容  |

可通过 `GET /api/tools/traffic-inspector/sessions/{id}/export.har` 或会话下拉菜单中的 ⬇ 按钮导出。

---

## §6 安全性

流量检查器会显示**所有被拦截的 HTTPS 流量**，包括授权标头和请求正文。现有以下控制措施：

| 控制措施         | 详细信息                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **LOCAL_ONLY**   | 所有路由和 WebSocket 端点仅限环回访问（在身份验证之前由 `routeGuard.ts` 强制执行）                                        |
| **敏感信息掩码** | 线性 `maskSecret()` 扫描器会在 `TrafficBuffer.push()` 之前遮盖 RFC 6750 Bearer 凭据、带提供者前缀的密钥和较长的不透明令牌 |
| **正文大小上限** | 大于 `INSPECTOR_MAX_BODY_KB`（默认值为 1024 KB）的正文将被截断，并附带 `“出于性能考虑已截断”` 提示                        |
| **标头清理**     | 名称转换为小写；移除分帧/逐跳标头和代理身份验证标头；Cookie 被完全遮盖；凭据值交由 `maskSecret()` 处理                    |
| **CSP**          | 在流量检查器页面上实施严格的内容安全策略，防止通过注入响应正文实施 XSS                                                    |
| **默认不持久化** | `TrafficBuffer` 存储于内存中，并会在服务器重启时丢失。仅在明确录制会话时才会持久化会话                                    |

### 应用的硬性规则

| 规则                              | 应用方式                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | 流量检查器路由返回的所有 HTTP 错误响应都会经过清理                            |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` 为 LOCAL_ONLY + SPAWN_CAPABLE（系统代理命令） |

### 已知限制

- **系统级代理模式**会影响计算机上的所有应用程序，包括 VPN 客户端和 SSO。请始终与自动禁用计时器配合使用。请勿在共享计算机上使用。
- **CONNECT 隧道 HTTPS**：除非启用 TLS 拦截，否则模式 3 (HTTP_PROXY) 仅捕获 HTTPS 目标的隧道元数据。这是有意为之 — 如果应用不信任 AgentBridge 证书，透明捕获会破坏这些应用的 TLS 验证。
- **部分组件中的硬编码字符串**：某些 UI 组件 (F7/F8) 包含少量尚未由 i18n 键覆盖的硬编码字符串。这些内容已在 i18n 缺口报告中记录为已知限制；后续将进行迁移。受影响的字符串是 UI 装饰性标签，不翻译也不会影响功能使用。

---

## §7 故障排除

### WebSocket 断开连接

如果实时尾随视图显示“已断开连接”：

1. 检查服务器是否仍在运行：`GET /api/tools/traffic-inspector/capture-modes`
2. 重新加载页面 — WebSocket 会重新连接并接收新的快照
3. 如果服务器已重启，内存缓冲区会被清空 — 除非已录制会话，否则旧条目将丢失

### 端口 8080 冲突

如果 HTTP_PROXY 模式启动失败：

```bash
lsof -i :8080    # 查找进程
```

更改端口：

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### 系统代理未还原

如果 OmniRoute 在系统级代理模式处于活动状态时崩溃：

**macOS：**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux（GNOME）：**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows：**

```cmd
netsh winhttp reset proxy
```

如果仪表板在下次加载时检测到数据库状态表明代理曾处于活动状态，还会提供“还原系统代理”选项。

### 缓冲区已满

当缓冲区达到 `INSPECTOR_BUFFER_SIZE`（默认值为 1000）时，新条目会覆盖最旧的条目。如果重要请求正在丢失：

- 增大 `INSPECTOR_BUFFER_SIZE`（例如 5000）— 以更多内存占用换取更长的保留时间
- 录制会话，将相关时间窗口持久化到数据库

---

## §8 API 参考

所有路由均为 `LOCAL_ONLY`（仅限环回地址）和 `SPAWN_CAPABLE`（系统代理命令）。请参阅 `src/server/authz/routeGuard.ts`。

基础路径：`/api/tools/traffic-inspector/`

### 请求管理

| 方法   | 路径                        | 描述                                                                       |
| ------ | --------------------------- | -------------------------------------------------------------------------- |
| GET    | `/requests`                 | 列出请求（可筛选：`?profile=llm&host=&agent=&status=&source=&sessionId=`） |
| GET    | `/requests/{id}`            | 单个请求的详细信息                                                         |
| DELETE | `/requests`                 | 清空内存缓冲区                                                             |
| POST   | `/requests/{id}/replay`     | 通过 OmniRoute 路由器重新执行同一请求                                      |
| PUT    | `/requests/{id}/annotation` | 保存或更新请求备注                                                         |

### WebSocket

| 方法 | 路径  | 描述                                                                           |
| ---- | ----- | ------------------------------------------------------------------------------ |
| GET  | `/ws` | 实时 WebSocket 流。连接时发送 `snapshot`，之后发送 `new`/`update`/`clear` 事件 |

### 导出

| 方法 | 路径          | 描述                             |
| ---- | ------------- | -------------------------------- |
| GET  | `/export.har` | 将当前筛选后的列表导出为 HAR 1.2 |

### 自定义主机

| 方法   | 路径            | 描述                              |
| ------ | --------------- | --------------------------------- |
| GET    | `/hosts`        | 列出自定义主机                    |
| POST   | `/hosts`        | 添加主机（自动编辑 `/etc/hosts`） |
| DELETE | `/hosts/{host}` | 移除主机                          |
| PATCH  | `/hosts/{host}` | 切换 `enabled` 状态               |

### 捕获模式

| 方法 | 路径                           | 描述                                                                                  |
| ---- | ------------------------------ | ------------------------------------------------------------------------------------- |
| GET  | `/capture-modes`               | AgentBridge / 自定义主机 / HTTP_PROXY / 系统代理模式的状态，以及 `tls-intercept` 开关 |
| POST | `/capture-modes/http-proxy`    | 启动/停止 HTTP_PROXY 监听器（`{action: "start"\|"stop"}`）                            |
| POST | `/capture-modes/system-proxy`  | 应用/还原系统级代理（`{action: "apply"\|"revert"}`）                                  |
| POST | `/capture-modes/tls-intercept` | 在代理模式下切换 HTTPS 正文解密（`{enabled: boolean}`）                               |

> **TPROXY 解密**（捕获模式 5）由 AgentBridge 前缀下的**单独**路由驱动 —
> `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — 不位于
> `/api/tools/traffic-inspector/` 下。请参阅
> `docs/security/MITM-TPROXY-DECRYPT.md`（位于 git 中；不会编译到 `/docs`）。

### 会话

| 方法   | 路径                        | 描述                                                        |
| ------ | --------------------------- | ----------------------------------------------------------- |
| POST   | `/sessions`                 | 开始录制（`{name?: string}`）                               |
| PATCH  | `/sessions/{id}`            | 停止或重命名（`{action: "stop"\|"rename", name?: string}`） |
| GET    | `/sessions`                 | 列出所有已保存的会话                                        |
| GET    | `/sessions/{id}`            | 会话快照（所有请求）                                        |
| DELETE | `/sessions/{id}`            | 删除会话                                                    |
| GET    | `/sessions/{id}/export.har` | 将会话导出为 HAR 1.2                                        |

### 内部摄取（D4 回退）

| 方法 | 路径               | 描述                                                                                      |
| ---- | ------------------ | ----------------------------------------------------------------------------------------- |
| POST | `/internal/ingest` | 接收来自 `server.cjs` 直通路径的已拦截请求；需要 `INSPECTOR_INTERNAL_INGEST_TOKEN` 请求头 |

完整的 OpenAPI 架构：`docs/openapi.yaml` → 标签 `Traffic Inspector`。
