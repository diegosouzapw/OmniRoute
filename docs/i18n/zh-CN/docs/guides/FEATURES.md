---
title: "OmniRoute — 控制台功能画廊"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — 控制台功能画廊

🌐 **Main README translations:** 🇺🇸 [English](../../guides/FEATURES.md) | 🇧🇷 [Português (Brasil)](../../i18n/pt-BR/docs/guides/FEATURES.md) | 🇪🇸 [Español](../../i18n/es/docs/guides/FEATURES.md) | 🇫🇷 [Français](../../i18n/fr/docs/guides/FEATURES.md) | 🇮🇹 [Italiano](../../i18n/it/docs/guides/FEATURES.md) | 🇷🇺 [Русский](../../i18n/ru/docs/guides/FEATURES.md) | 🇨🇳 [中文 (简体)](../../i18n/zh-CN/docs/guides/FEATURES.md) | 🇩🇪 [Deutsch](../../i18n/de/docs/guides/FEATURES.md) | 🇮🇳 [हिन्दी](../../i18n/in/docs/guides/FEATURES.md) | 🇹🇭 [ไทย](../../i18n/th/docs/guides/FEATURES.md) | 🇺🇦 [Українська](../../i18n/uk-UA/docs/guides/FEATURES.md) | 🇸🇦 [العربية](../../i18n/ar/docs/guides/FEATURES.md) | 🇯🇵 [日本語](../../i18n/ja/docs/guides/FEATURES.md) | 🇻🇳 [Tiếng Việt](../../i18n/vi/docs/guides/FEATURES.md) | 🇧🇬 [Български](../../i18n/bg/docs/guides/FEATURES.md) | 🇩🇰 [Dansk](../../i18n/da/docs/guides/FEATURES.md) | 🇫🇮 [Suomi](../../i18n/fi/docs/guides/FEATURES.md) | 🇮🇱 [עברית](../../i18n/he/docs/guides/FEATURES.md) | 🇭🇺 [Magyar](../../i18n/hu/docs/guides/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](../../i18n/id/docs/guides/FEATURES.md) | 🇰🇷 [한국어](../../i18n/ko/docs/guides/FEATURES.md) | 🇲🇾 [Bahasa Melayu](../../i18n/ms/docs/guides/FEATURES.md) | 🇳🇱 [Nederlands](../../i18n/nl/docs/guides/FEATURES.md) | 🇳🇴 [Norsk](../../i18n/no/docs/guides/FEATURES.md) | 🇵🇹 [Português (Portugal)](../../i18n/pt/docs/guides/FEATURES.md) | 🇷🇴 [Română](../../i18n/ro/docs/guides/FEATURES.md) | 🇵🇱 [Polski](../../i18n/pl/docs/guides/FEATURES.md) | 🇸🇰 [Slovenčina](../../i18n/sk/docs/guides/FEATURES.md) | 🇸🇪 [Svenska](../../i18n/sv/docs/guides/FEATURES.md) | 🇵🇭 [Filipino](../../i18n/phi/docs/guides/FEATURES.md) | 🇨🇿 [Čeština](../../i18n/cs/docs/guides/FEATURES.md)

OmniRoute 控制台各功能区的可视化指南。

> 📅 **最近更新：** 2026-06-28 — **v3.8.40**

---

## ✨ v3.8.0 亮点

v3.7.x → v3.8.0 版本周期引入了零配置自动路由、新的服务商、OAuth 流程、更深度的容灾能力，以及大幅增强的 CLI 体验。以下是主要功能——完整细节见下文及链接的规范文档。

- 🤖 **Auto Combo / 零配置自动路由** — 使用 `auto/coding`、`auto/fast`、`auto/cheap`、`auto/offline`、`auto/smart`、`auto/lkgp` 前缀。背后是 9 因子评分引擎和 4 个精选**模式包**（快速交付、成本优先、质量优先、离线友好）
- 🆕 **Command Code 服务商** (#2199) — 一线注册，含模型目录和配额追踪
- 🆕 **Z.AI 服务商** — 新增免费层服务商，带配额标签
- 🎬 **KIE 媒体扩展** — 扩展目录，包含视频生成模型
- 🔐 **Windsurf + Devin CLI OAuth 流程** (#2168) — 端到端浏览器登录
- 🆓 **9 个新的免费服务商** — LLM7、Lepton、Kluster、UncloseAI、BazaarLink、Completions、Enally、FreeTheAi、Command Code
- 🎯 **Manifest 感知层级路由 W1–W4** — 服务商 Manifest 驱动加权层级选择
- 🎨 **Cursor 完全兼容 OpenAI 格式** — 工具调用、流式传输、会话管理端到端打通
- 📊 **Cursor Pro 计划用量** — 配额和周期数据在服务商限制控制台中展示
- ⚡ **服务层级细分 / Codex 快速层分析** — 按层级的用量可见性
- 📌 **按会话粘性路由** — Codex 会话在轮次之间固定到同一账户
- 🔊 **Inworld TTS 增强** — 语音目录、流式传输和延迟改进
- 🔑 **Kiro 无头认证** — 通过本地 `kiro-cli` SQLite 存储登录，无需浏览器
- 📉 **DeepSeek 配额和限制监控** — 通过控制台暴露每日/每月用量
- 🔄 **Reset 感知路由策略** — Combo 现在优先选择配额窗口最早重置的账户
- ⏱️ **`fallbackDelayMs`** 和**动态工具限制检测** — 更精细的容灾时机 + 按服务商的工具数限制
- 🔧 **后台模式降级（Responses API）** — 当上游不支持后台轮询时，以结构化警告降级到同步模式
- 🚦 **按服务商的 429 分类** + `useUpstream429BreakerHints` 开关 — 利用上游速率限制提示实现更精细的熔断行为
- 🩺 **模型冷却控制台** — 观察每个模型的锁定状态，并通过 UI 手动恢复
- 🔒 **MITM 动态 Linux 证书检测** — 跨 Debian/Ubuntu、Fedora/RHEL、Arch 等发行版
- 💻 **CLI 增强套件** — 20+ 命令，包括 `omniroute providers`、`omniroute combos`、`omniroute doctor`、`omniroute setup`
- 🔍 **Qdrant 嵌入模型发现** — 自动探测向量存储模型
- 🔑 **带 `manage` 权限域的 API Key / Bearer Key** — 通过 API 以编程方式执行管理操作
- 🏥 **Combo 目标健康分析** + **结构化 Combo 构建器** — 按目标健康分析 + UI 构建器，用于组装 `(服务商, 模型, 连接)` 步骤
- 🤝 **GitLab Duo OAuth 服务商** — 使用 GitLab 凭据登录
- 🧠 **推理回放缓存** — 混合内存 + SQLite 持久化推理痕迹

📚 **相关文档：** [技能框架](../frameworks/SKILLS.md) · [记忆系统](../frameworks/MEMORY.md) · [云代理](../frameworks/CLOUD_AGENT.md) · [Webhook](../frameworks/WEBHOOKS.md) · [推理回放缓存](../routing/REASONING_REPLAY.md)

---

## 🔌 服务商

管理 AI 服务商连接：OAuth 服务商（Claude Code、Codex）、API Key 服务商（Groq、DeepSeek、OpenRouter）和免费服务商（Qoder、Qwen、Kiro）。Kiro 账户包含积分余额追踪——剩余积分、总额度和续期日期可在 控制台 → 用量 中查看。

OpenRouter 连接可以在 高级设置 中存储每个连接的 `preset`。设置后，除非客户端请求已提供自己的 `preset`，否则 OmniRoute 会将其作为 OpenRouter 的顶层请求字段发送，例如 `"preset": "email-copywriter"`。

![服务商控制台](../../screenshots/01-providers.png)

---

## 🎨 Combo

使用 17 种策略创建模型路由 Combo：priority、weighted、fill-first、round-robin、p2c（power-of-two-choices）、random、least-used、cost-optimized、reset-aware、reset-window、headroom、strict-random、auto、lkgp（last-known-good-provider）、context-optimized、context-relay，以及 **fusion**（并行扇出到一组模型，然后通过评判模型合成一个答案）。每个 Combo 将多个模型串联起来，具备自动容灾能力，并包含快速模板和就绪检查。

最近的 Combo 改进：

- **结构化 Combo 构建器** — 通过选择服务商、模型和具体账户/连接来创建每个步骤
- **重复服务商支持** — 同一个服务商可以在一个 Combo 中多次使用，只要 `(服务商, 模型, 连接)` 元组唯一即可
- **Combo 目标健康** — 分析和健康数据面现在区分单独的 Combo 目标/步骤，而非将所有内容折叠为模型字符串
- **复合层级排序** — `defaultTier -> fallbackTier` 现在影响顶层 Combo 步骤的运行时执行/容灾顺序

![Combo 控制台](../../screenshots/02-combos.png)

---

## 📊 分析

全面的用量分析，包括 Token 消耗、费用估算、活跃度热力图、周分布图和按服务商的细分视图。

![分析控制台](../../screenshots/03-analytics.png)

---

## 🏥 系统健康

实时监控：运行时长、内存、版本、延迟百分位数（p50/p95/p99）、缓存统计、服务商熔断器状态、活跃的配额监控会话，以及 Combo 目标健康。

![健康控制台](../../screenshots/04-health.png)

---

## 🔧 翻译器 Playground

四种调试 API 翻译的模式：**Playground**（格式转换器）、**Chat Tester**（实时请求）、**Test Bench**（批量测试）和 **Live Monitor**（实时流监控）。

![翻译器 Playground](../../screenshots/05-translator.png)

---

## 🎮 模型 Playground _(v2.0.9+)_

直接在控制台中测试任何模型。选择服务商、模型和端点，使用 Monaco Editor 编写提示，实时流式接收响应，支持中途中止和查看耗时指标。

---

## 🎨 主题 _(v2.0.5+)_

整个控制台的可定制配色主题。支持从 7 种预设色（Coral、Blue、Red、Green、Violet、Orange、Cyan）中选择，或通过选取任意 hex 色值创建自定义主题。支持浅色、深色和跟随系统模式。

---

## ⚙️ 设置

全面的设置面板，包含 **7 个选项卡**：

- **通用** — 系统存储、备份管理（导出/导入数据库）
- **外观** — 主题选择器（深色/浅色/系统）、配色主题预设和自定义颜色、健康日志可见性、侧边栏项目和分组分隔线可见性控制、端点隧道可见性控制
- **AI** — AI 助手功能、默认路由预设（Auto Combo `auto/coding`、`auto/fast`、`auto/cheap`、`auto/smart`）、推理回放缓存，以及技能/记忆开关
- **安全** — API 端点保护、自定义服务商屏蔽、IP 过滤、会话信息
- **路由** — 模型别名、后台任务降级、Manifest 感知层级路由（W1–W4）、`fallbackDelayMs`、按会话粘性路由
- **容灾** — 速率限制持久化、熔断器调优、自动禁用被禁账户、服务商过期监控、**Context Relay** 交接阈值和摘要模型配置、按服务商的 429 分类与 `useUpstream429BreakerHints` 开关、模型冷却
- **高级** — 配置覆盖、配置审计追踪、容灾降级模式、Responses API 的后台模式降级

![设置控制台](../../screenshots/06-settings.png)

---

## 🔧 CLI 工具

AI 编程工具的一键配置：Claude Code、Codex CLI、OpenClaw、Kilo Code、Antigravity、Cline、Continue、Cursor 和 Factory Droid。支持自动应用/重置配置、连接配置文件和模型映射。

![CLI 工具控制台](../../screenshots/07-cli-tools.png)

---

## 🤖 CLI 智能体 _(v2.0.11+)_

CLI 智能体发现与管理控制台。以网格形式展示 17 个内置智能体（Codex、Claude、Goose、OpenClaw、Aider、OpenCode、Cline、Qwen Code、ForgeCode、Amazon Q、Open Interpreter、Cursor CLI、Warp、**Windsurf**、**Devin CLI**、**Kimi Coding**、**Command Code**），提供：

- **安装状态** — 已安装 / 未找到，含版本检测
- **协议 Badge** — stdio、HTTP 等
- **自定义智能体** — 通过表单注册任意 CLI 工具（名称、二进制文件、版本命令、启动参数）
- **CLI 指纹匹配** — 按服务商切换，匹配原生 CLI 请求签名，降低封禁风险同时保留代理 IP
- **OAuth 支持的智能体** — Windsurf 与 Devin CLI 现使用浏览器 OAuth 流程进行认证（v3.8.0+）

---

## 🔗 Context Relay _(v3.5.5+)_

一种 Combo 策略，在会话中途发生账户轮换时保持连续性。活跃账户配额耗尽前，OmniRoute 在后台生成结构化的交接摘要。后续请求切换到其他账户后，摘要以系统消息形式注入，使新账户以完整上下文继续服务。

支持 Combo 级别或全局配置：

- **交接阈值** — 触发摘要生成的配额使用百分比（默认 85%）
- **最近消息摘要数量限制** — 压缩多少最近的历史记录
- **摘要模型** — 可选，用于生成交接摘要的覆盖模型

目前支持 Codex 账户轮换。详见 [Context Relay 文档](../architecture/ARCHITECTURE.md)。

---

## 🗜️ 提示压缩 _(v3.7.9+)_

Context & Cache 现在为 Caveman、RTK 和压缩 Combo 提供专属页面：

- **Caveman** — 语言感知规则包、预览、输出模式控制和用量分析
- **RTK** — 命令感知压缩，适用 shell、git、测试、构建、包管理、Docker、基础设施、JSON 和堆栈跟踪输出
- **压缩 Combo** — 命名管道，如 `rtk -> caveman`，可分配给路由 Combo；默认级联压缩在两个引擎同时生效时达到 **~89%** 平均节省率和 **78–95%** 合格上下文节省率
- **原始输出恢复** — 可选 RTK 脱敏原始输出指针，用于调试压缩失败

详见 [压缩指南](../compression/COMPRESSION_GUIDE.md)、[RTK 压缩](../compression/RTK_COMPRESSION.md) 和 [压缩引擎](../compression/COMPRESSION_ENGINES.md)。

---

## 🛡️ 代理加固 _(v3.5.5+)_

全请求链路的代理配置强制执行：

- **Token 健康检查** — 后台 OAuth 刷新现按连接解析代理配置，避免代理必需环境下认证失败
- **API Key 校验** — 服务商 Key 校验（`POST /api/providers/validate`）通过 `runWithProxyContext` 路由，遵循服务商级和全局代理设置
- **undici Dispatcher 修复** — 代理 Dispatcher 使用 undici 自带的 fetch 实现替代 Node 内置 fetch，解决 Node.js 22 上的 `invalid onRequestStart method` 错误
- **Node.js 版本检测** — 登录页主动检测不兼容的 Node.js 版本（24+），并显示警告横幅，引导用户使用 Node 22 LTS

---

## 📧 邮箱隐私脱敏 _(v3.5.6+)_

OAuth 账户邮箱默认脱敏显示（例如 `di*****@g****.com`），防止截图或录屏时意外暴露。使用 设置 → 外观 → 账户邮箱可见性 可在服务商、Combo、日志、配额和 Playground 页中全局显示或隐藏完整邮箱。

---

## 👁️ 模型可见性切换 _(v3.5.6+)_

服务商页面模型列表新增：

- **实时搜索/过滤栏** — 快速查找特定模型
- **单个模型可见性切换**（👁 图标）— 隐藏的模型置灰并从 `/v1/models` 目录中排除
- **活跃数 Badge**（`N/M active`）— 一目了然地显示启用模型数 vs 总数

---

## 🔧 OAuth 环境修复 _(v3.6.1+)_

OAuth 服务商的一键"环境修复"操作，恢复缺失的环境变量并修复损坏的认证状态。入口：`控制台 → 服务商 → [OAuth 服务商] → 环境修复`。自动检测并修复：

- 缺失的 OAuth 客户端凭据
- 损坏的 env 文件条目
- 备份路径清理

---

## 🗑️ 卸载 / 完全卸载 _(v3.6.2+)_

面向所有安装方式的清理卸载脚本：

| 命令                     | 操作                                                                |
| ------------------------ | ------------------------------------------------------------------- |
| `npm run uninstall`      | 移除系统应用，但**保留数据库和配置**在 `~/.omniroute`。              |
| `npm run uninstall:full` | 移除应用，并永久**清除所有配置、密钥和数据库**。                    |

---

## 🖼️ 媒体 _(v2.0.3+)_

从控制台生成图像、视频和音乐。支持 OpenAI、xAI、Together、Hyperbolic、SD WebUI、ComfyUI、AnimateDiff、Stable Audio Open 和 MusicGen。

---

## 📝 请求日志

实时请求日志，支持按服务商、模型、账户和 API Key 筛选。显示状态码、Token 用量、延迟和响应详情。

![用量日志](../../screenshots/08-usage.png)

---

## 🌐 API 端点

统一 API 端点及其能力概览：Chat Completions、Responses API、Embeddings、Image Generation、Reranking、Audio Transcription、Text-to-Speech、Moderations 和已注册的 API Key。支持 Cloudflare Quick Tunnel、Tailscale Funnel、ngrok Tunnel 和云代理，实现远程访问。

![端点控制台](../../screenshots/09-endpoint.png)

---

## 🔑 API Key 管理

创建、划分权限域和撤销 API Key。每个 Key 可限制到特定模型/服务商，支持完全访问或只读权限。可视化密钥管理，附带用量追踪。

---

## 📋 审计日志

管理操作追踪，支持按操作类型、执行人、目标、IP 地址和时间戳筛选。完整的安全事件历史。

---

## 🖥️ 桌面应用

面向 Windows、macOS 和 Linux 的原生 Electron 桌面应用。以独立应用程序形式运行 OmniRoute，集成系统托盘、离线支持、自动更新和一键安装。

关键功能：

- 服务器就绪轮询（冷启动不白屏）
- 带端口管理的系统托盘
- Content Security Policy
- 单实例锁
- 重启时自动更新
- 平台自适应 UI（macOS 红绿灯、Windows/Linux 默认标题栏）
- 加固的 Electron 构建打包 — 独立包中符号链接的 `node_modules` 在打包前被检测并拒绝，防止对构建机器的运行时依赖（v2.5.5+）
- **优雅关闭** — Electron `before-quit` 干净关闭 Next.js，防止 SQLite WAL 数据库锁定（v3.6.2+）

📖 详见 [`electron/README.md`](../../../electron/README.md)。

---

## 🌐 V1 WebSocket Bridge _(v3.6.6+)_

OmniRoute 现通过 `/v1/ws` 升级端点支持 OpenAI 兼容的 WebSocket 客户端。自定义 `scripts/dev/v1-ws-bridge.mjs` 服务器包装 Next.js，将 WS 连接升级为全双工流式会话。认证使用与 HTTP 请求相同的 API Key 或会话 Cookie。

关键行为：

- WS 升级在连接建立前经过 `src/lib/ws/handshake.ts` 校验
- 会话关闭或上游错误时干净终止流
- 与现有 HTTP+SSE 流式路径同时运行

---

## 🔑 同步 Token 与配置包 _(v3.6.6+)_

通过限域同步 Token 实现多设备和外部运维访问：

- **`POST /api/sync/tokens`** — 签发新的同步 Token（限域，可选过期时间）
- **`DELETE /api/sync/tokens/:id`** — 撤销 Token
- **`GET /api/sync/bundle`** — 下载带版本号、ETag 键控的 JSON 快照，包含所有非敏感设置（密码已脱敏）

配置包由 `src/lib/sync/bundle.ts` 构建。消费者比较 `ETag` 响应头即可检测变更，无需重新下载完整载荷。

---

## 🧠 GLM Thinking 预设 _(v3.6.6+)_

**GLM Thinking（`glmt`）** 现作为一线服务商注册：最大输出 Token 65,536、Thinking 预算 24,576、默认超时 900 秒、Claude 兼容 API 格式，并与 GLM 系列共享用量同步。

**混合 Token 计数**也在 v3.6.6 中落地：当 Claude 兼容的服务商暴露 `/messages/count_tokens` 端点时，OmniRoute 在大请求前调用该端点，并提供优雅的估算回退。

---

## 🛡️ 安全外发请求与 SSRF 防护 _(v3.6.6+)_

所有服务商校验和模型发现调用现经过两层外发防护：

1. **URL guard**（`src/shared/network/outboundUrlGuard.ts`）— 在套接字打开前拦截 private/loopback/link-local IP 范围。
2. **Safe fetch wrapper**（`src/shared/network/safeOutboundFetch.ts`）— 应用 URL guard、标准化超时并以指数退避重试瞬时错误。

防护违规通过 HTTP 422（`URL_GUARD_BLOCKED`）暴露，并写入合规审计日志（`providerAudit.ts`）。

---

## 🔄 冷却感知重试 _(v3.6.6+)_

当上游服务商返回模型级冷却时，聊天请求现自动重试。通过 `REQUEST_RETRY`（默认：2）和 `MAX_RETRY_INTERVAL_SEC`（默认：30 秒）配置。速率限制头学习能力在 `x-ratelimit-reset-requests`、`x-ratelimit-reset-tokens` 和 `Retry-After` 间改进——每个模型的冷却状态在容灾控制台中可见。

---

## 📋 合规审计 v2 _(v3.6.6+)_

审计日志新增基于游标的分页、请求上下文增强（请求 ID、User-Agent、IP）、结构化认证事件、带差异上下文的服务商 CRUD 事件，以及 SSRF 拦截日志。新事件由 `src/lib/compliance/providerAudit.ts` 触发。
