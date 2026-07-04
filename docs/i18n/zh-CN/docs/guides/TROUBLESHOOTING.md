---
title: "故障排除"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 故障排除

> **致用户**：想快速解决问题？请参阅下方的[快速参考](#快速参考)。

🌐 **Languages:** 🇺🇸 [English](../../../../docs/guides/TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../../pt-BR/docs/guides/TROUBLESHOOTING.md) | 🇪🇸 [Español](../../es/docs/guides/TROUBLESHOOTING.md) | 🇫🇷 [Français](../../fr/docs/guides/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../../it/docs/guides/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../../ru/docs/guides/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../../zh-CN/docs/guides/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../../de/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../../in/docs/guides/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../../th/docs/guides/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../../uk-UA/docs/guides/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../../ar/docs/guides/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../../ja/docs/guides/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../../vi/docs/guides/TROUBLESHOOTING.md) | 🇧🇬 [Български](../../bg/docs/guides/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../../da/docs/guides/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../../fi/docs/guides/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../../he/docs/guides/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../../hu/docs/guides/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../../id/docs/guides/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../../ko/docs/guides/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../../ms/docs/guides/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../../nl/docs/guides/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../../no/docs/guides/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../../pt/docs/guides/TROUBLESHOOTING.md) | 🇷🇴 [Română](../../ro/docs/guides/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../../pl/docs/guides/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../../sk/docs/guides/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../../sv/docs/guides/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../../phi/docs/guides/TROUBLESHOOTING.md) | 🇨🇿 [Čeština](../../cs/docs/guides/TROUBLESHOOTING.md)

OmniRoute 常见问题及解决方案。

---

## 快速参考

**刚接触 OmniRoute？** 从这里开始 —— 以下内容可解决 90% 的问题：

| 你看到的提示            | 含义                     | 解决方法                                                                                          |
| ----------------------- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| "Can't connect"         | OmniRoute 未运行          | 运行 `omniroute` 或 `docker restart omniroute`                                                     |
| "Invalid API key"       | API 密钥错误或已过期      | 从服务商网站重新复制密钥                                                                          |
| "Rate limit exceeded"   | 请求频率过高              | 等待 1 分钟，或使用 `model: "auto"` 自动容灾                                                     |
| "Quota exceeded"        | 免费/付费配额已用尽       | 接入更多服务商，或使用免费服务商（Kiro、Pollinations）                                              |
| "Slow responses"        | 服务商繁忙或距离较远      | 使用 `model: "auto/fast"` 或接入速度更快的服务商（Groq、Cerebras）                                 |
| "Wrong provider used"   | `auto` 选择了其他服务商    | 这是正常现象！`auto` 会选取最优服务商。如需指定，使用 `model: "openai/gpt-4o"`                       |
| "502 Bad Gateway"       | 服务商宕机                | 等待重试，或使用 `model: "auto"` 切换服务商                                                        |
| "401 Unauthorized"      | 凭据有误                  | 检查 API 密钥或通过 OAuth 重新认证                                                                |
| "429 Too Many Requests" | 触发速率限制              | 等待 1 分钟，或接入更多服务商                                                                     |

**还是不行？** 请参阅下方的[详细故障排除](#详细故障排除)，或前往 [Discord](https://discord.gg/EkzRkpzKYt) 提问。

---

## 详细故障排除

---

## 快速修复

| 问题                                                | 解决方案                                                                                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 首次登录无法使用                                    | 在 `.env` 中设置 `INITIAL_PASSWORD`（无硬编码默认值）                                                                                                  |
| 仪表盘打开的端口不对                                | 设置 `PORT=20128` 和 `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                                                                                    |
| 没有日志写入磁盘                                    | 设置 `APP_LOG_TO_FILE=true` 并确认已启用调用日志捕获                                                                                                  |
| EACCES: permission denied                           | 设置 `DATA_DIR=/path/to/writable/dir` 覆盖 `~/.omniroute`                                                                                             |
| 路由策略无法保存                                    | 更新至最新 v3.x 版本（早期版本中已修复 settings 持久化的 Zod Schema 问题）                                                                            |
| 登录崩溃 / 空白页面                                 | 检查 Node.js 版本 —— 参见下方的 [Node.js 兼容性](#nodejs-兼容性)                                                                                      |
| `dlopen` / `slice is not valid mach-o file` (macOS) | 运行 `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` —— 参见下方的 [macOS 原生模块重新编译](#macos-原生模块重新编译)         |
| 代理 "fetch failed"                                 | 请确认代理配置已设置在正确的层级 —— 参见下方的[代理问题](#代理问题)                                                                                  |

---

## Node.js 兼容性

<a name="nodejs-compatibility"></a>

### 登录页面崩溃或显示 "Module self-registration" 错误

**原因：** 你使用的 Node.js 版本不在 OmniRoute 批准的安全运行时范围内。最常见的情况是运行的 Node.js 22 或 24 补丁版本过低，未达到 OmniRoute 所需的安全补丁基线。

**症状：**

- 登录页面显示空白或服务器报错
- 控制台显示 `Error: Module did not self-register` 或类似的原生绑定错误
- 如果运行时不在支持的安全策略范围内，登录页面会显示一个**橙色警告横幅**，标明你的 Node 版本

**修复：**

1. 安装受支持的 Node.js LTS 版本（推荐：Node.js 24.x）：
   ```bash
   nvm install 24
   nvm use 24
   ```
2. 验证版本：`node --version` 应显示 `v24.0.0` 或 24.x LTS 线上的更高版本
3. 重新安装 OmniRoute：`npm install -g omniroute`
4. 重启：`omniroute`

> **受支持的安全版本：** `>=22.22.2 <23` 或 `>=24.0.0 <27`。Node.js 24.x LTS (Krypton) 和 Node.js 26 完全支持。

### macOS：`dlopen` / "slice is not valid mach-o file"

<a name="macos-native-module-rebuild"></a>

**原因：** 执行全局 `npm install -g omniroute` 后，包内的 `better-sqlite3` 原生二进制文件可能被编译为与你本地运行环境不同的架构或 Node.js ABI。这在 macOS 上很常见（Apple Silicon 和 Intel 均如此），当预编译的二进制文件与你的环境不匹配时就会发生。

**症状：**

- 服务器启动时立即报出 `dlopen` 错误
- 错误信息包含 `slice is not valid mach-o file`
- 完整示例：

```
dlopen(/Users/<user>/.nvm/versions/node/v24.14.1/lib/node_modules/omniroute/app/node_modules/better-sqlite3/build/Release/better_sqlite3.node, 0x0001): tried: '...' (slice is not valid mach-o file)
```

**修复 —— 针对本地环境重新编译（无需降级 Node.js）：**

```bash
cd $(npm root -g)/omniroute/app
npm rebuild better-sqlite3
omniroute
```

> **说明：** 这会针对你的本地 Node.js 版本和 CPU 架构重新编译原生绑定，解决二进制不匹配问题。官方支持的运行时范围为 **`>=22.22.2 <23` 或 `>=24.0.0 <27`**（`src/shared/utils/nodeRuntimeSupport.ts` 中的 `SUPPORTED_NODE_RANGE`，与 `package.json` 的 `engines` 字段一致）。Node.js 24.x LTS (Krypton) 和 Node.js 26 在 `better-sqlite3` v12.x 下完全支持。

---

## 代理问题

<a name="proxy-issues"></a>

### 服务商验证提示 "fetch failed"

**原因：** API 密钥验证端点（`POST /api/providers/validate`）之前绕过了代理配置，导致在需要代理路由的环境中验证失败。

**修复（v3.5.5+）：** 已修复。服务商验证现在通过 `runWithProxyContext` 路由，自动遵循服务商级别和全局代理设置。

### Token 健康检查报错 "fetch failed"

**原因：** 后台 OAuth Token 刷新未解析每个连接对应的代理配置。

**修复（v3.5.5+）：** Token 健康检查调度器现在在尝试刷新之前会按连接解析代理配置。请更新至 v3.5.5+。

### SOCKS5 代理返回 "invalid onRequestStart method"

**原因：** 在 Node.js 22 上，undici@8 调度器与 Node 内置的 `fetch()` 实现不兼容。

**修复（v3.5.5+）：** OmniRoute 现在在代理调度器激活时使用 undici 自身的 `fetch()` 函数，确保行为一致。请更新至 v3.5.5+。

### WSL 下的 MITM 代理：Windows 主机上的桌面应用未被拦截

**原因：** MITM 代理及其 CA 证书安装在 OmniRoute 运行的环境中。在 WSL 下，该环境是 Linux 客户机，而 AI 桌面应用（Kiro、Trae、Copilot、Zed 等）运行在 Windows 主机上。主机应用不信任客户机的证书存储，也不会通过客户机的系统代理路由，因此桌面拦截不会在那里生效。

**建议：** 将 OmniRoute 以原生方式运行在与你想要拦截的桌面应用相同的操作系统上（Windows 应用在 Windows 上运行；macOS/Linux 同理）。将 OmniRoute 留在 WSL 内同时针对主机应用，需要手动在 Windows 主机上信任生成的 CA 证书，并将每个主机应用的网络/代理设置指向 WSL 代理端点 —— 这是一种不受支持、脆弱的配置方案。

---

## 服务商问题

### "Language model did not provide messages"

**原因：** 服务商配额耗尽。

**修复：**

1. 检查仪表盘配额追踪器
2. 使用包含容灾层级的 Combo
3. 切换到更便宜/免费的层级

### 速率限制

**原因：** 订阅配额耗尽。

**修复：**

- 添加容灾：`cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- 使用 GLM/MiniMax 作为廉价备用

### OAuth Token 过期

OmniRoute 会自动刷新 Token。如果问题持续：

1. 仪表盘 → 服务商 → 重新连接
2. 删除并重新添加该服务商连接

### Kiro 多账号：第二个账号使第一个失效

**原因：** Kiro 后端强制每个 OIDC 客户端注册仅允许一个活跃会话。当两个账号共享同一个注册客户端（v3.8.0 之前导入的连接）时，刷新一个账号的 Token 会使另一个账号的 refresh token 失效。

**修复（v3.8.0+）：** 重新导入受影响的连接。从 v3.8.0 开始，每个通过 **Import Token**、**Google/GitHub 社交登录**或 **Auto-Import** 创建的 Kiro 新连接，都会自动注册自己的独立 OIDC 客户端。因此每个连接完全隔离，刷新一个账号对其他账号没有影响。

在 v3.8.0 之前导入的连接没有携带每个连接独立的客户端注册。这些连接继续使用共享的社交认证刷新端点。要获得隔离，请从仪表盘 → 服务商中删除旧连接，然后通过三种导入流程之一重新添加。

详细信息和添加两个 Kiro 账号的逐步说明，请参阅 [`docs/guides/KIRO_SETUP.md`](./KIRO_SETUP.md)。

---

## 云端问题

### 云端同步错误

1. 验证 `BASE_URL` 指向你正在运行的实例（例如 `http://localhost:20128`）
2. 验证 `CLOUD_URL` 指向你的云端端点（例如 `https://omniroute.dev`）
3. 保持 `NEXT_PUBLIC_*` 值与服务器端值一致

### 云端 `stream=false` 返回 500

**症状：** 云端端点上非流式调用出现 `Unexpected token 'd'...`。

**原因：** 上游返回 SSE 载荷，而客户端期望 JSON。

**临时方案：** 对云端直接调用使用 `stream=true`。本地运行时包含 SSE→JSON 容灾。

### 云端显示已连接但报 "Invalid API key"

1. 从本地仪表盘创建一个新密钥（`/api/keys`）
2. 运行云端同步：启用 Cloud → Sync Now
3. 旧的/未同步的密钥在云端可能仍然返回 `401`

---

## Docker 问题

### CLI 工具显示未安装

1. 检查运行时字段：`curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. 便携模式：使用镜像目标 `runner-cli`（内嵌 CLI）
3. 主机挂载模式：设置 `CLI_EXTRA_PATHS` 并以只读方式挂载主机 bin 目录
4. 如果 `installed=true` 且 `runnable=false`：二进制文件已找到但健康检查失败

### 快速运行时验证

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## 费用问题

### 费用过高

1. 在仪表盘 → Usage 中查看用量统计
2. 将主模型切换到 GLM/MiniMax
3. 对非关键任务使用免费层级（Qoder、Kiro）
4. 按 API 密钥设置费用预算：仪表盘 → API Keys → Budget

---

## 调试

### 启用日志文件

在 `.env` 文件中设置 `APP_LOG_TO_FILE=true`。应用日志将写入 `logs/` 目录。当调用日志流水线在设置中启用时，请求产物存储在 `${DATA_DIR}/call_logs/` 下。当流水线捕获启用时，可设置 `CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS=false` 来省略流式分块载荷，或调整 `CALL_LOG_PIPELINE_MAX_SIZE_KB` 来修改产物上限（单位 KB）。

### 检查服务商健康状态

```bash
# 健康仪表盘
http://localhost:20128/dashboard/health

# API 健康检查
curl http://localhost:20128/api/monitoring/health
```

### 运行时存储

- 主状态：`${DATA_DIR}/storage.sqlite`（服务商、Combo、别名、密钥、设置）
- 用量：`storage.sqlite` 中的 SQLite 表（`usage_history`、`call_logs`、`proxy_logs`）+ 可选的 `${DATA_DIR}/call_logs/`
- 应用日志：`<repo>/logs/...`（当 `APP_LOG_TO_FILE=true` 时）
- 调用日志产物：当调用日志流水线启用时为 `${DATA_DIR}/call_logs/YYYY-MM-DD/...`

请求日志页面的 **Clean history** 操作会清除 `call_logs`、旧版 `request_detail_logs` 以及本地 `${DATA_DIR}/call_logs/` 产物目录。

---

## 熔断器问题

### 服务商卡在 OPEN 状态

当服务商的熔断器处于 OPEN 状态时，请求会被阻止，直到冷却时间结束。

**修复：**

1. 前往 **仪表盘 → Settings → Resilience**
2. 查看受影响服务商的熔断器卡片
3. 点击 **Reset All** 清除所有熔断器，或等待冷却时间结束
4. 重置前请先确认该服务商确实可用

### 服务商反复触发熔断器

如果服务商反复进入 OPEN 状态：

1. 在 **仪表盘 → Health → Provider Health** 中查看报错模式
2. 前往 **Settings → Resilience → Provider Profiles** 提高失败阈值
3. 检查服务商是否更改了 API 限额或需要重新认证
4. 审查延迟遥测数据 —— 高延迟可能导致超时类报错

---

## 音频转写问题

### "Unsupported model" 错误

- 请确认使用正确的前缀：`deepgram/nova-3` 或 `assemblyai/best`
- 在 **仪表盘 → Providers** 中验证该服务商已连接

### 转写返回空结果或失败

- 检查支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`
- 验证文件大小是否在服务商限制内（通常 < 25MB）
- 在服务商卡片中检查 API 密钥有效性

---

## 格式转换器调试

使用 **仪表盘 → Translator** 来调试格式转换问题：

| 模式             | 使用场景                                                                  |
| ---------------- | ------------------------------------------------------------------------- |
| **Playground**   | 并排对比输入/输出格式 —— 粘贴一个失败的请求，查看其转换结果               |
| **Chat Tester**  | 发送实时消息并检查完整的请求/响应载荷，包括 headers                       |
| **Test Bench**   | 跨格式组合运行批量测试，找出哪些转换存在问题                              |
| **Live Monitor** | 实时观察请求流，捕获间歇性的转换问题                                      |

### 常见格式问题

- **thinking 标签不显示** —— 检查目标服务商是否支持 thinking 以及 thinking 预算设置
- **工具调用丢失** —— 部分格式转换可能会去除不支持的字段；在 Playground 模式下验证
- **系统提示丢失** —— Claude 和 Gemini 处理系统提示的方式不同；检查转换输出
- **SDK 返回原始字符串而非对象** —— 已在 v1.x 修复；响应清理器现在会去除导致 OpenAI SDK Pydantic 校验失败的非标准字段（`x_groq`、`usage_breakdown` 等）。如果在 v3.x+ 上仍遇到此问题，请提交 issue
- **GLM/ERNIE 拒绝 `system` 角色** —— 已在 v1.x 修复；角色规范化器对不兼容模型自动将系统消息合并到用户消息中。如果在 v3.x+ 上仍遇到此问题，请提交 issue
- **`developer` 角色不被识别** —— 已在 v1.x 修复；对非 OpenAI 服务商自动转换为 `system`。如果在 v3.x+ 上仍遇到此问题，请提交 issue
- **`json_schema` 在 Gemini 上不生效** —— 已在 v1.x 修复；`response_format` 现在会转换为 Gemini 的 `responseMimeType` + `responseSchema`。如果在 v3.x+ 上仍遇到此问题，请提交 issue

---

## 容灾设置

### 自动速率限制未触发

- 自动速率限制仅适用于 API 密钥类服务商（不适用于 OAuth/订阅类）
- 验证 **Settings → Resilience → Provider Profiles** 已启用自动速率限制
- 检查服务商是否返回 `429` 状态码或 `Retry-After` header

### 调整指数退避参数

服务商配置文件支持以下设置：

- **Base delay** —— 首次失败后的初始等待时间（默认：1s）
- **Max delay** —— 最大等待时间上限（默认：30s）
- **Multiplier** —— 每次连续失败延时的增加倍数（默认：2x）

### 防惊群效应

当大量并发请求同时打到一个受速率限制的服务商时，OmniRoute 使用互斥锁 + 自动速率限制来串行化请求，防止级联失败。这对 API 密钥类服务商是自动生效的。

---

## 可选的 RAG / LLM 失败分类法（16 种问题）

部分 OmniRoute 用户将网关部署在 RAG 或代理栈之前。在这些场景中，经常会出现一种奇怪的现象：OmniRoute 看起来一切正常（服务商在线、路由配置正常、无线速告警），但最终答案仍然不对。

实际上，这些事件通常来自下游的 RAG 流水线，而非网关本身。

如果你想要一套共享词汇来描述这些失败，可以使用 WFGY ProblemMap —— 一个外部的 MIT 许可文本资源，定义了 16 种常见的 RAG / LLM 失败模式。其高层次覆盖内容如下：

- 检索漂移和上下文边界断裂
- 索引和向量存储为空或过期
- 嵌入向量与语义不匹配
- 提示组装和上下文窗口问题
- 逻辑崩溃和过度自信的答案
- 长链和代理协调失败
- 多代理记忆和角色漂移
- 部署和启动顺序问题

思路很简单：

1. 当你调查一个错误响应时，捕获：
   - 用户任务和请求
   - OmniRoute 中的路由或服务商 Combo
   - 下游使用的任何 RAG 上下文（检索到的文档、工具调用等）
2. 将该事件映射到一个或两个 WFGY ProblemMap 编号（`No.1` … `No.16`）。
3. 将编号存储在你自己的仪表盘、runbook 或事件追踪器中，紧邻 OmniRoute 日志。
4. 使用对应的 WFGY 页面来判断是需要调整 RAG 栈、检索器还是路由策略。

完整文本和具体方案在此（MIT 许可，纯文本）：

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

如果你不在 OmniRoute 后面运行 RAG 或代理流水线，可以忽略本节。

---

## v3.8.0 已知问题

v3.8.0 版本特有的问题及其当前临时方案。如果后续补丁中得到了修复，对应条目将更新或移除。

### Windsurf OAuth 流程报 401

**症状：**

- 从仪表盘完成 Windsurf OAuth 流程时出现 "401 unauthorized"
- OAuth 回调后 Windsurf 服务商卡片持续显示"需要重新连接"状态

**原因：**

- `WINDSURF_FIREBASE_API_KEY` 环境变量缺失或为空
- `WINDSURF_API_KEY` 配置错误或指向了过期的 Token
- 本地防火墙/代理阻止了 OAuth 回调

**修复：**

1. 验证 `.env` 中已设置 `WINDSURF_FIREBASE_API_KEY` 和 `WINDSURF_API_KEY`
2. 重启 OmniRoute 使新的环境变量生效
3. 从 **仪表盘 → Providers → Windsurf → Reconnect** 重新运行 OAuth 流程

### Devin CLI 认证失败

**症状：**

- 调用 Devin 支持的工具时出现 "Devin CLI not found" 或 "auth failed"
- CLI 运行时检查报告 `installed=false`

**原因：**

- `CLI_DEVIN_BIN` 指向的路径不存在
- 主机上未安装 Devin CLI

**修复：**

1. 为你的平台安装 Devin CLI
2. 在 `.env` 中设置 `CLI_DEVIN_BIN=/usr/local/bin/devin`（或实际路径）
3. 重启 OmniRoute 并从 **仪表盘 → CLI Tools** 重新测试

### 模型冷却卡住（手动重置）

**症状：**

- 即便过期时间已过，某模型仍然显示在冷却列表中
- Combo 路由在时间戳已过期的情况下仍然跳过该模型

**手动重置：**

- **仪表盘：** **Settings → Model Cooldowns** → 点击受影响卡片上的 **Re-enable**
- **API：** 使用管理认证 headers 调用 `DELETE /api/resilience/model-cooldowns`

### Command Code 服务商连接返回 403

**症状：**

- 测试 Command Code 服务商连接时返回 403
- 新添加后服务商卡片显示 "unauthorized"

**原因：** OAuth 流程未完成（未收到回调或 Token 未持久化）。

**修复：**

- 从 CLI 运行 `omniroute providers` 重新触发 OAuth 流程，或
- 从 **仪表盘 → Providers → Command Code → Reconnect** 重新运行 OAuth

### ModelScope 返回过于激进的 429 冷却

**症状：**

- ModelScope 在少量请求后触发极短或立即的冷却
- Combo 路由比预期更早地跳过 ModelScope

**原因：** ModelScope 会发出服务商专用的 `Retry-After` header。v3.8.0 对这些 header 进行了专门处理，而旧版本会将其误读为通用速率限制提示。

**修复：**

- 确认你使用的是 v3.8.0 或更高版本
- 验证 **Settings → Resilience** 下的 `useUpstream429BreakerHints` 开关已启用

### 生产环境缺少 OMNIROUTE_WS_BRIDGE_SECRET

**症状：**

- 在远程生产主机上运行时，每个 Codex/Responses WebSocket bridge 请求都返回 401
- WebSocket bridge 握手在连接后立即关闭

**原因：** 生产环境中缺少 `OMNIROUTE_WS_BRIDGE_SECRET` 环境变量。

**修复：**

1. 生成一个随机密钥：`openssl rand -hex 32`
2. 在生产服务器环境中设置 `OMNIROUTE_WS_BRIDGE_SECRET=<random-secret>`（以及任何与该 bridge 通信的客户端）
3. 重启 OmniRoute

### Responses API：后台模式降级为同步

**症状：**

- 日志警告：`background mode degraded to synchronous`
- `background: true` 的请求返回了普通同步响应，而非后台任务句柄

**原因：** v3.8.0 有意将 Responses API 上的 `background: true` 降级为同步执行，同时发出警告。完整的异步后台执行是未来的交付内容。

**修复：**

- 调整客户端调用时不带 `background`，或
- 等待后续版本提供完整的异步后台模式（关注更新日志）

---

## 仍然卡住了？

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **架构**：内部细节请参见 [`docs/architecture/ARCHITECTURE.md`](../../../../docs/architecture/ARCHITECTURE.md)
- **API 参考**：所有端点请参见 [`docs/reference/API_REFERENCE.md`](../../../../docs/reference/API_REFERENCE.md)
- **健康仪表盘**：在 **仪表盘 → Health** 中查看实时系统状态
- **格式转换器**：使用 **仪表盘 → Translator** 调试格式问题
