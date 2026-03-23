<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — 免费 AI 网关

### 永不停止编程。智能路由至**免费和低成本 AI 模型**，自动故障转移。

_您的通用 API 代理 — 一个端点，36+ 提供商，零停机时间。_

**Chat Completions • Embeddings • 图像生成 • 音频 • Reranking • 100% TypeScript**

---

### 🆕 v2.7.0 新功能

- **可插拔 RouterStrategy** — 支持规则、成本和延迟策略
- **多语言意图检测** — 支持 30+ 语言的路由评分
- **请求去重** — 基于内容哈希避免重复 API 调用
- **新增提供商：** Grok-4 Fast (xAI)、GLM-5 / Z.AI、MiniMax M2.5、Kimi K2.5
- **价格更新：** Grok-4 Fast $0.20/$0.50/M，GLM-5 $0.50/M，MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 为您最爱的编程代理提供免费 AI

_通过 OmniRoute 连接任何 AI 驱动的 IDE 或 CLI 工具 — 免费 API 网关，无限编程。_

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 所有代理通过 <code>http://localhost:20128/v1</code> 或 <code>http://cloud.omniroute.online/v1</code> 连接 — 一个配置，无限模型和配额</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 网站](https://omniroute.online) • [🚀 快速开始](#-快速开始) • [💡 功能特性](#-核心功能) • [📖 文档](#-文档) • [💰 定价](#-定价概览)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 为什么选择 OmniRoute？

**停止浪费金钱和遭遇限制：**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 订阅配额每月未使用就过期
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 速率限制在编程中途停止你
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 昂贵的 API（每个提供商 $20-50/月）
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 手动在提供商间切换

**OmniRoute 解决这些问题：**

- ✅ **最大化订阅** — 追踪配额，在重置前用完每一点
- ✅ **自动故障转移** — 订阅 → API Key → 低价 → 免费，零停机
- ✅ **多账号** — 每个提供商的账号轮询
- ✅ **通用** — 适用于 Claude Code、Codex、Gemini CLI、Cursor、Cline、OpenClaw、任何 CLI 工具

---

## 📧 支持

> 💬 **加入我们的社区！** [WhatsApp 群组](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — 获取帮助、分享技巧、了解最新动态。

- **网站**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [社区群组](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **原始项目**: [decolua 的 9router](https://github.com/decolua/9router)

---

## 🔄 工作原理

```
┌─────────────┐
│  您的 CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   工具      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│         OmniRoute（智能路由器）           │
│  • 格式转换（OpenAI ↔ Claude）          │
│  • 配额追踪 + Embeddings + 图像         │
│  • 自动令牌刷新                         │
└──────┬──────────────────────────────────┘
       │
       ├─→ [第1层: 订阅] Claude Code, Codex, Gemini CLI
       │   ↓ 配额用完
       ├─→ [第2层: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM 等
       │   ↓ 预算限制
       ├─→ [第3层: 低价] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ 预算限制
       └─→ [第4层: 免费] iFlow, Qwen, Kiro（无限制）

结果：永不停止编程，成本最低
```

---

## 🎯 OmniRoute 解决了什么 — 30 个真正的痛点和用例

> **每个使用 AI 工具的开发人员每天都会面临这些问题。** OmniRoute 的构建是为了解决所有这些问题 - 从成本超支到区域封锁，从损坏的 OAuth 流程到协议操作和企业可观察性。

<details>
<summary><b>💸 1.“我支付了昂贵的订阅费用，但仍然受到限制的干扰”</b></summary>

开发人员每月为 Claude Pro、Codex Pro 或 GitHub Copilot 支付 20-200 美元。即使付费，配额也有上限——5 小时的使用时间、每周限制或每分钟的费率限制。在编码会话中，提供商停止响应，开发人员失去流量和生产力。

**OmniRoute 如何解决：**

- **智能 4 层回退** — 如果订阅配额用完，自动重定向到 API 密钥 → 便宜 → 免费，零手动干预
- **实时配额跟踪** — 实时显示代币消耗情况并重置倒计时（5 小时、每日、每周）
- **多帐户支持** — 每个提供商有多个帐户，具有自动循环 — 当一个帐户用完时，切换到下一个帐户
- **自定义组合** — 可定制的后备链，具有 6 种平衡策略（先填充、循环、P2C、随机、最少使用、成本优化）
- **Codex Business Quotas** — 直接在仪表板中监控业务/团队工作空间配额

</details>

<details>
<summary><b>🔌 2.“我需要使用多个提供程序，但每个提供程序都有不同的 API”</b></summary>

OpenAI 使用一种格式，Claude（Anthropic）使用另一种格式，Gemini 使用另一种格式。如果开发人员想要测试来自不同提供商的模型或在它们之间进行回退，他们需要重新配置 SDK、更改端点、处理不兼容的格式。自定义提供程序（FriendLI、NIM）具有非标准模型端点。

**OmniRoute 如何解决：**

- **统一端点** — 单个 `http://localhost:20128/v1` 充当所有 36 个以上提供商的代理
- **格式翻译** — 自动且透明：OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **响应清理** — 删除破坏 OpenAI SDK v1.83+ 的非标准字段（`x_groq`、`usage_breakdown`、`service_tier`）
- **角色标准化** — 对于非 OpenAI 提供商，将 `developer` → `system` 转换； `system` → `user` 适用于 GLM/ERNIE
- **Think Tag Extraction** — 将 DeepSeek R1 等模型中的 `<think>` 块提取为标准化 `reasoning_content`
- **Gemini 的结构化输出** — `json_schema` → `responseMimeType`/`responseSchema` 自动转换
- **`stream` 默认为 `false`** — 与 OpenAI 规范保持一致，避免 Python/Rust/Go SDK 中出现意外的 SSE

</details>

<details>
<summary><b>🌐 3.“我的人工智能提供商封锁了我的地区/国家”</b></summary>

OpenAI/Codex 等提供商会阻止来自某些地理区域的访问。用户在 OAuth 和 API 连接期间收到类似 `unsupported_country_region_territory` 的错误。这对于发展中国家的开发商来说尤其令人沮丧。

**OmniRoute 如何解决：**

- **3 级代理配置** — 3 级可配置代理：全局（所有流量）、每个提供商（仅一个提供商）和每个连接/密钥
- **颜色编码的代理徽章** — 视觉指示器：🟢 全局代理、🟡 提供商代理、🔵 连接代理，始终显示 IP
- **通过代理进行 OAuth 令牌交换** — OAuth 流程也通过代理，解决了 `unsupported_country_region_territory`
- **通过代理进行连接测试** — 连接测试使用配置的代理（不再直接绕过）
- **SOCKS5 支持** — 对出站路由的完整 SOCKS5 代理支持
- **TLS 指纹欺骗** — 通过 `wreq-js` 的类似浏览器的 TLS 指纹来绕过机器人检测

</details>

<details>
<summary><b>🆓 4.“我想用AI编码，但我没有钱”</b></summary>

并不是每个人都能每月支付 20-200 美元来订阅 AI。来自新兴国家的学生、开发人员、业余爱好者和自由职业者需要以零成本获得优质模型。

**OmniRoute 如何解决：**

- **内置免费层级提供商** — 对 100% 免费提供商的本机支持：iFlow（8 个无限型号）、Qwen（3 个无限型号）、Kiro（Claude 免费）、Gemini CLI（180K/月免费）
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **仅限免费组合** — 链 `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 美元/月，零停机时间
- **NVIDIA NIM 免费积分** — 集成 1000 个免费积分
- **成本优化策略** — 自动选择最便宜的可用提供商的路由策略

</details>

<details>
<summary><b>🔒 5.“我需要保护我的AI网关免遭未经授权的访问”</b></summary>

当将人工智能网关暴露到网络（LAN、VPS、Docker）时，任何拥有该地址的人都可以消耗开发者的代币/配额。如果没有保护，API 很容易被误用、提示注入和滥用。

**OmniRoute 如何解决：**

- **API 密钥管理** — 使用专用的 `/dashboard/api-manager` 页面为每个提供商生成、轮换和范围界定
- **模型级权限** — 将 API 密钥限制为特定模型（`openai/*`、通配符模式），并具有“允许全部”/“限制”切换功能
- **API 端点保护** — 需要 `/v1/models` 的密钥并阻止列表中的特定提供商
- **Auth Guard + CSRF 保护** — 所有仪表板路由均受 `withAuth` 中间件 + CSRF 令牌保护
- **速率限制器** — 通过可配置窗口限制每个 IP 的速率
- **IP 过滤** — 用于访问控制的允许列表/阻止列表
- **Prompt Injection Guard** — 针对恶意提示模式的清理
- **AES-256-GCM 加密** — 静态加密的凭证

</details>

<details>
<summary><b>🛑 6.“我的提供商宕机了，我失去了编码流程”</b></summary>

AI 提供商可能会变得不稳定、返回 5xx 错误或达到临时速率限制。如果开发人员依赖于单一提供商，他们就会受到干扰。如果没有断路器，重复重试可能会使应用程序崩溃。

**OmniRoute 如何解决：**

- **每个提供商的断路器** — 自动打开/关闭，具有可配置的阈值和冷却时间（关闭/打开/半打开）
- **指数退避** — 渐进式重试延迟
- **Anti-Thundering Herd** — 互斥锁 + 信号量保护，防止并发重试风暴
- **组合后备链** — 如果主要提供商发生故障，则自动从该链中掉下来，无需干预
- **组合断路器** — 自动禁用组合链中出现故障的提供商
- **运行状况仪表板** — 正常运行时间监控、断路器状态、锁定、缓存统计、p50/p95/p99 延迟

</details>

<details>
<summary><b>🔧 7. “配置每个AI工具都是繁琐且重复的”</b></summary>

开发人员使用 Cursor、Claude Code、Codex CLI、OpenClaw、Gemini CLI、Kilo Code...每个工具都需要不同的配置（API 端点、密钥、模型）。切换提供商或模型时重新配置是浪费时间。

**OmniRoute 如何解决：**

- **CLI 工具仪表板** — 专用页面，可一键设置 Claude Code、Codex CLI、OpenClaw、Kilo Code、Antigravity、Cline
- **GitHub Copilot 配置生成器** — 通过批量模型选择为 VS Code 生成 `chatLanguageModels.json`
- **入门向导** — 为首次使用的用户提供 4 步设置指导
- **一个端点，所有型号** — 配置 `http://localhost:20128/v1` 一次，访问 36 个以上提供商

</details>

<details>
<summary><b>🔑 8.“管理来自多个提供商的 OAuth 令牌简直就是地狱”</b></summary>

Claude Code、Codex、Gemini CLI、Copilot — 全部使用带有过期令牌的 OAuth 2.0。开发人员需要不断地重新进行身份验证，处理`client_secret is missing`、`redirect_uri_mismatch`以及远程服务器上的故障。 LAN/VPS 上的 OAuth 问题尤其严重。

**OmniRoute 如何解决：**

- **自动令牌刷新** — OAuth 令牌在过期前在后台刷新
- **OAuth 2.0 (PKCE) 内置** — Claude Code、Codex、Gemini CLI、Copilot、Kiro、Qwen、iFlow 的自动流程
- **多帐户 OAuth** — 每个提供商通过 JWT/ID 令牌提取多个帐户
- **OAuth LAN/远程修复** — `redirect_uri` 的私有 IP 检测 + 远程服务器的手动 URL 模式
- **Nginx 背后的 OAuth** — 使用 `window.location.origin` 实现反向代理兼容性
- **远程 OAuth 指南** — VPS/Docker 上的 Google Cloud 凭据分步指南

</details>

<details>
<summary><b>📊 9.“我不知道我花了多少钱或在哪里”</b></summary>

开发商使用多个付费提供商，但对支出没有统一的看法。每个提供商都有自己的计费仪表板，但没有统一的视图。意外的成本可能会不断增加。

**OmniRoute 如何解决：**

- **成本分析仪表板** — 每个提供商的每个代币成本跟踪和预算管理
- **每层预算限制** — 触发自动回退的每层支出上限
- **按型号定价配置** — 每个型号的可配置价格
- **每个 API 密钥的使用统计信息** — 每个密钥的请求计数和上次使用的时间戳
- **分析仪表板** — 统计卡、模型使用图表、包含成功率和延迟的提供商表

</details>

<details>
<summary><b>🐛 10.“我无法诊断人工智能调用中的错误和问题”</b></summary>

当调用失败时，开发人员不知道这是否是速率限制、令牌过期、格式错误或提供商错误。跨不同终端的碎片日志。如果没有可观察性，调试就是反复试验。

**OmniRoute 如何解决：**

- **统一日志仪表板** — 4 个选项卡：请求日志、代理日志、审核日志、控制台
- **控制台日志查看器** — 实时终端式查看器，具有颜色编码级别、自动滚动、搜索、过滤功能
- **SQLite 代理日志** — 服务器重新启动后仍保留的持久日志
- **Translator Playground** — 4 种调试模式：Playground（格式翻译）、Chat Tester（往返）、Test Bench（批量）、Live Monitor（实时）
- **请求遥测** — p50/p95/p99 延迟 + X-Request-Id 跟踪
- **基于文件的日志记录与旋转** — 控制台拦截器通过基于大小的旋转将所有内容捕获到 JSON 日志

</details>

<details>
<summary><b>🏗️ 11.“部署和维护网关很复杂”</b></summary>

跨不同环境（本地、VPS、Docker、云）安装、配置和维护 AI 代理是一项劳动密集型工作。硬编码路径、目录上的 `EACCES`、端口冲突和跨平台构建等问题会增加摩擦。

**OmniRoute 如何解决：**

- **npm 全局安装** — `npm install -g omniroute && omniroute` — 完成
- **Docker 多平台** — AMD64 + ARM64 本机（Apple Silicon、AWS Graviton、Raspberry Pi）
- **Docker Compose Profiles** — `base`（无 CLI 工具）和 `cli`（带有 Claude Code、Codex、OpenClaw）
- **Electron 桌面应用程序** — 适用于 Windows/macOS/Linux 的本机应用程序，带系统托盘、自动启动、离线模式
- **分割端口模式** — API 和仪表板位于单独的端口上，适用于高级场景（反向代理、容器网络）
- **云同步** — 通过 Cloudflare Workers 跨设备配置同步
- **数据库备份** — 自动备份、恢复、导出和导入所有设置

</details>

<details>
<summary><b>🌍 12.“界面只有英文，我的团队不会说英语”</b></summary>

非英语国家的团队，尤其是拉丁美洲、亚洲和欧洲的团队，在纯英文界面上遇到了困难。语言障碍会降低采用率并增加配置错误。

**OmniRoute 如何解决：**

- **仪表板 i18n — 30 种语言** — 所有 500 多个按键已翻译，包括阿拉伯语、保加利亚语、丹麦语、德语、西班牙语、芬兰语、法语、希伯来语、印地语、匈牙利语、印度尼西亚语、意大利语、日语、韩语、马来语、荷兰语、挪威语、波兰语、葡萄牙语（PT/BR）、罗马尼亚语、俄语、斯洛伐克语、瑞典语、泰语、乌克兰语、越南语、中文、菲律宾语、英语
- **RTL 支持** — 从右到左支持阿拉伯语和希伯来语
- **多语言自述文件** — 30 个完整的文档翻译
- **语言选择器** — 标题中的地球图标用于实时切换

</details>

<details>
<summary><b>🔄 13.“我需要的不仅仅是聊天 - 我需要嵌入、图像、音频”</b></summary>

人工智能不仅仅是完成聊天。开发人员需要生成图像、转录音频、为 RAG 创建嵌入、重新排列文档以及审核内容。每个 API 都有不同的端点和格式。

**OmniRoute 如何解决：**

- **嵌入** — `/v1/embeddings` 具有 6 个提供商和 9 个以上模型
- **图像生成** — `/v1/images/generations` 具有 10 个提供商和 20 多个模型（OpenAI、xAI、Together、Fireworks、Nebius、Hyperbolic、NanoBanana、Antigravity、SD WebUI、ComfyUI）
- **文本到视频** — `/v1/videos/generations` — ComfyUI（AnimateDiff、SVD）和 SD WebUI
- **文本转音乐** — `/v1/music/generations` — ComfyUI（稳定音频打开，MusicGen）
- **音频转录** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM、HuggingFace、Qwen3
- **文本转语音** — `/v1/audio/speech` — ElevenLabs、Nvidia NIM、HuggingFace、Coqui、Tortoise、Qwen3 以及现有提供商
- **审核** — `/v1/moderations` — 内容安全检查
- **重新排名** — `/v1/rerank` — 文档相关性重新排名
- **响应 API** — 对 Codex 的完整 `/v1/responses` 支持

</details>

<details>
<summary><b>🧪 14.“我无法测试和比较不同型号的质量”</b></summary>

开发人员想知道哪种模型最适合他们的用例（代码、翻译、推理），但手动比较速度很慢。不存在集成的评估工具。

**OmniRoute 如何解决：**

- **LLM 评估** — 黄金套装测试，包含 10 个预加载案例，涵盖问候语、数学、地理、代码生成、JSON 合规性、翻译、降价、安全拒绝
- **4种匹配策略** — `exact`、`contains`、`regex`、`custom`（JS函数）
- **Translator Playground 测试台** — 使用多个输入和预期输出进行批量测试、跨提供商比较
- **聊天测试器** — 带有视觉响应渲染的完整往返
- **实时监控** — 流经代理的所有请求的实时流

</details>

<details>
<summary><b>📈 15.“我需要在不损失性能的情况下进行扩展”</b></summary>

随着请求量的增长，如果不缓存相同的问题，就会产生重复的成本。如果没有幂等性，重复的请求就会浪费处理。必须遵守每个提供商的速率限制。

**OmniRoute 如何解决：**

- **语义缓存** - 两层缓存（签名+语义）降低成本和延迟
- **请求幂等性** — 相同请求的 5 秒重复数据删除窗口
- **速率限制检测** — 每个提供商的 RPM、最小间隙和最大并发跟踪
- **可编辑的速率限制** — 可在“设置”→“持久弹性”中配置默认值
- **API 密钥验证缓存** — 用于提高生产性能的 3 层缓存
- **带有遥测功能的运行状况仪表板** — p50/p95/p99 延迟、缓存统计数据、正常运行时间

</details>

<details>
<summary><b>🤖 16.“我想全局控制模型行为”</b></summary>

希望所有响应都以特定语言、特定语气或想要限制推理标记的开发人员。在每个工具/请求中配置此功能是不切实际的。

**OmniRoute 如何解决：**

- **系统提示注入** — 全局提示应用于所有请求
- **思考预算验证** - 每个请求的推理令牌分配控制（直通、自动、自定义、自适应）
- **6 种路由策略** — 确定如何分发请求的全局策略
- **通配符路由器** — `provider/*` 模式动态路由到任何提供商
- **组合启用/禁用切换** — 直接从仪表板切换组合
- **提供商切换** — 一键启用/禁用提供商的所有连接
- **阻止的提供商** — 从 `/v1/models` 列表中排除特定提供商

</details>

<details>
<summary><b>🧰 17.“我需要MCP工具作为一流的产品能力”</b></summary>

许多 AI 网关仅将 MCP 作为隐藏的实现细节公开。团队需要一个可见的、可管理的操作层。

**OmniRoute 如何解决：**

- MCP 显示在仪表板导航和端点协议选项卡中
- 专用 MCP 管理页面，包含流程、工具、范围和审计
- `omniroute --mcp` 和客户入门的内置快速启动

</details>

<details>
<summary><b>🧠 18.“我需要具有同步+流任务路径的 A2A 编排”</b></summary>

代理工作流程需要直接回复和具有生命周期控制的长时间运行的流式执行。

**OmniRoute 如何解决：**

- A2A JSON-RPC 端点 (`POST /a2a`) 与 `message/send` 和 `message/stream`
- 具有终端状态传播的 SSE 流式传输
- `tasks/get` 和 `tasks/cancel` 的任务生命周期 API

</details>

<details>
<summary><b>🛰️ 19.“我需要真实的 MCP 进程运行状况，而不是猜测的状态”</b></summary>

运营团队需要知道 MCP 是否确实存在，而不仅仅是 API 是否可访问。

**OmniRoute 如何解决：**

- 带有 PID、时间戳、传输、工具计数和范围模式的运行时心跳文件
- MCP状态API结合心跳+最近的活动
- 用于流程/正常运行时间/心跳新鲜度的 UI 状态卡

</details>

<details>
<summary><b>📋 20.“我需要可审核的 MCP 工具执行”</b></summary>

当工具改变配置或触发操作操作时，团队需要取证可追溯性。

**OmniRoute 如何解决：**

- SQLite 支持的 MCP 工具调用审核日志记录
- 按工具、成功/失败、API 密钥和分页过滤
- 仪表板审核表+自动化统计端点

</details>

<details>
<summary><b>🔐 21.“每次集成我都需要范围内的 MCP 权限”</b></summary>

不同的客户端应该具有对工具类别的最低权限访问权限。

**OmniRoute 如何解决：**

- 9 个粒度 MCP 范围，用于受控工具访问
- MCP 管理 UI 中的范围执行和可见性
- 操作工具的安全默认姿势

</details>

<details>
<summary><b>⚙️ 22.“我需要操作控制而不重新部署”</b></summary>

团队需要在事件或成本事件期间快速更改运行时。

**OmniRoute 如何解决：**

- 直接从 MCP 仪表板切换组合激活
- 应用预定义策略包中的弹性配置文件
- 从同一操作面板重置断路器状态

</details>

<details>
<summary><b>🔄 23.“我需要实时 A2A 任务生命周期可见性和取消”</b></summary>

如果没有生命周期可见性，任务事件就很难分类。

**OmniRoute 如何解决：**

- 任务列表/按状态/技能过滤并分页
- 深入了解任务元数据、事件和工件
- 任务取消端点和带有确认的 UI 操作

</details>

<details>
<summary><b>🌊 24.“我需要 A2A 负载的活动流指标”</b></summary>

流媒体工作流程需要对并发和实时连接的操作洞察。

**OmniRoute 如何解决：**

- 活动流计数器集成到 A2A 状态中
- 最后任务时间戳和每个状态计数
- 用于实时操作监控的 A2A 仪表板卡

</details>

<details>
<summary><b>🪪 25.“我需要为客户发现标准代理”</b></summary>

外部客户端和协调器需要机器可读的元数据来进行引导。

**OmniRoute 如何解决：**

- 特工卡暴露在`/.well-known/agent.json`
- 管理 UI 中显示的能力和技能
- A2A 状态 API 包括用于自动化的发现元数据

</details>

<details>
<summary><b>🧭 26.“我需要产品 UX 中的协议可发现性”</b></summary>

如果用户无法发现协议表面，采用和支持质量就会下降。

**OmniRoute 如何解决：**

- MCP 和 A2A 的侧边栏条目
- 端点页面“协议”选项卡包含快速启动和状态
- 从概述到专用管理仪表板的链接

</details>

<details>
<summary><b>🧪 27.“我需要与真实客户端进行端到端协议验证”</b></summary>

模拟测试不足以在发布前验证协议兼容性。

**OmniRoute 如何解决：**

- E2E 套件，可启动应用程序并使用真正的 MCP SDK 客户端传输
- A2A 客户端测试发现、发送、流式传输、获取和取消流程
- 针对 MCP 审计和 A2A 任务 API 交叉检查断言

</details>

<details>
<summary><b>📡 28.“我需要跨所有接口的统一可观察性”</b></summary>

按协议分割可观察性会产生盲点和更长的 MTTR。

**OmniRoute 如何解决：**

- 一个产品中的统一仪表板/日志/分析
- 跨 OpenAI、MCP 和 A2A 层的运行状况 + 审计 + 请求遥测
- 用于状态和自动化的操作 API

</details>

<details>
<summary><b>💼 29.“我需要一个用于代理+工具+代理编排的运行时”</b></summary>

运行许多单独的服务会增加运营成本和故障模式。

**OmniRoute 如何解决：**

- 兼容 OpenAI 的代理、MCP 服务器和 A2A 服务器位于一个堆栈中
- 共享身份验证、弹性、数据存储和可观察性
- 所有交互界面上一致的策略模型

</details>

<details>
<summary><b>🚀 30.“我需要在没有胶水代码蔓延的情况下交付代理工作流程”</b></summary>

拼接多个临时服务和脚本时，团队会失去速度。

**OmniRoute 如何解决：**

- 客户端和代理的统一端点策略
- 内置协议管理 UI 和烟雾验证路径
- 生产就绪的基础（安全性、日志记录、弹性、备份）

</details>

### 示例手册（集成用例）

**剧本 A：最大化付费订阅 + 廉价备份**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**剧本 B：零成本编码堆栈**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**剧本 C：24/7 始终在线的后备链**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**剧本 D：使用 MCP + A2A 的特工操作**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ 快速开始

**1. 全局安装：**

```bash
npm install -g omniroute
omniroute
```

🎉 仪表板在 `http://localhost:20128` 打开

| 命令                    | 描述                         |
| ----------------------- | ---------------------------- |
| `omniroute`             | 启动服务器（默认端口 20128） |
| `omniroute --port 3000` | 使用自定义端口               |
| `omniroute --no-open`   | 不自动打开浏览器             |
| `omniroute --help`      | 显示帮助                     |

**2. 连接免费提供商：**

仪表板 → 提供商 → 连接 **Claude Code** 或 **Antigravity** → OAuth 登录 → 完成！

**3. 在 CLI 工具中使用：**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline 设置：
  Endpoint: http://localhost:20128/v1
  API Key: [从仪表板复制]
  Model: if/kimi-k2-thinking
```

**完成！** 开始使用免费 AI 模型编程。

**替代方案 — 从源代码运行：**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute 作为公共 Docker 镜像在 [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute) 上可用。

**快速运行：**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**使用环境文件：**

```bash
# 先复制并编辑 .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**使用 Docker Compose：**

```bash
# 基础配置（无 CLI 工具）
docker compose --profile base up -d

# CLI 配置（内置 Claude Code、Codex、OpenClaw）
docker compose --profile cli up -d
```

| 镜像                     | 标签     | 大小   | 描述       |
| ------------------------ | -------- | ------ | ---------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | 最新稳定版 |
| `diegosouzapw/omniroute` | `1.0.6`  | ~250MB | 当前版本   |

---

---

## 🖥️

> 🆕 **全新！** OmniRoute 现已提供适用于 Windows、macOS 和 Linux 的**原生桌面应用程序**。

- 🖥️ **原生窗口** — 专属应用窗口，集成系统托盘
- 🔄 **自动启动** — 系统登录时启动 OmniRoute
- 🔔 **原生通知** — 配额耗尽或提供商问题时收到提醒
- ⚡ **一键安装** — NSIS (Windows)、DMG (macOS)、AppImage (Linux)
- 🌐 **离线模式** — 内置服务器，完全离线工作

```bash
npm run electron:dev           # 开发模式
npm run electron:build         # 当前平台
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 完整文档：[`electron/README.md`](electron/README.md)

---

## 💰 定价概览

| 层级           | 提供商            | 费用                  | 配额重置        | 最适合       |
| -------------- | ----------------- | --------------------- | --------------- | ------------ |
| **💳 订阅**    | Claude Code (Pro) | $20/月                | 5小时 + 每周    | 已订阅用户   |
|                | Codex (Plus/Pro)  | $20-200/月            | 5小时 + 每周    | OpenAI 用户  |
|                | Gemini CLI        | **免费**              | 180K/月 + 1K/天 | 所有人！     |
|                | GitHub Copilot    | $10-19/月             | 每月            | GitHub 用户  |
| **🔑 API KEY** | NVIDIA NIM        | **免费**（1000 积分） | 一次性          | 免费测试     |
|                | DeepSeek          | 按使用量              | 无              | 最佳性价比   |
|                | Groq              | 免费层 + 付费         | 限速            | 超快推理     |
|                | xAI (Grok)        | 按使用量              | 无              | Grok 模型    |
|                | Mistral           | 免费层 + 付费         | 限速            | 欧洲 AI      |
|                | OpenRouter        | 按使用量              | 无              | 100+ 模型    |
| **💰 低价**    | GLM-4.7           | $0.6/1M               | 每日 10时       | 经济备用     |
|                | MiniMax M2.1      | $0.2/1M               | 5小时滚动       | 最便宜选项   |
|                | Kimi K2           | $9/月固定             | 每月 10M Token  | 可预测成本   |
| **🆓 免费**    | iFlow             | $0                    | 无限制          | 8 个免费模型 |
|                | Qwen              | $0                    | 无限制          | 3 个免费模型 |
|                | Kiro              | $0                    | 无限制          | 免费 Claude  |

**💡 专业建议：** 从 Gemini CLI（每月 180K 免费）+ iFlow（无限免费）开始 = $0 成本！

---

## 💡 核心功能

### 🧠 路由与智能

| 功能                          | 功能描述                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------- |
| 🎯 **智能 4 层故障转移**      | 自动路由：订阅 → API Key → 低价 → 免费                                        |
| 📊 **实时配额追踪**           | 实时 Token 计数 + 每个提供商的重置倒计时                                      |
| 🔄 **格式转换**               | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro 无缝切换                             |
| 👥 **多账号支持**             | 每个提供商多个账号，智能选择                                                  |
| 🔄 **自动令牌刷新**           | OAuth 令牌自动刷新并重试                                                      |
| 🎨 **自定义组合**             | 6 种策略：fill-first、round-robin、p2c、random、least-used、cost-optimized    |
| 🧩 **自定义模型**             | 为任何提供商添加任何模型 ID                                                   |
| 🌐 **通配符路由**             | 动态路由 `provider/*` 模式到任何提供商                                        |
| 🧠 **推理预算**               | passthrough、auto、custom 和 adaptive 模式用于推理模型                        |
| 🔀 **Model Aliases**          | Auto-forward deprecated model IDs to current replacements (built-in + custom) |
| ⚡ **Background Degradation** | Auto-route background tasks (titles, summaries) to cheaper models             |
| 💬 **System Prompt 注入**     | 全局 System Prompt 应用于所有请求                                             |
| 📄 **Responses API**          | 完整支持 OpenAI Responses API (`/v1/responses`) 用于 Codex                    |

### 🎵 多模态 API

| 功能              | 功能描述                                                                                                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **图像生成**   | `/v1/images/generations` — 4 个提供商，9+ 模型                                                                                                                             |
| 📐 **Embeddings** | `/v1/embeddings` — 6 个提供商，9+ 模型                                                                                                                                     |
| 🎤 **音频转录**   | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **文字转语音** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **内容审核**   | `/v1/moderations` — 内容安全检查                                                                                                                                           |
| 🔀 **重排序**     | `/v1/rerank` — 文档相关性重排序                                                                                                                                            |

### 🛡️ 弹性与安全

| 功能                            | 功能描述                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------- |
| 🔌 **断路器**                   | 每个提供商自动打开/关闭，可配置阈值                                          |
| 🛡️ **反惊群**                   | Mutex + 信号量限速用于 API Key 提供商                                        |
| 🧠 **语义缓存**                 | 两层缓存（签名 + 语义）降低成本和延迟                                        |
| ⚡ **请求幂等性**               | 5 秒去重窗口防止重复请求                                                     |
| 🔒 **TLS 指纹伪装**             | 通过 wreq-js 绕过基于 TLS 的机器人检测                                       |
| 🌐 **IP 过滤**                  | 白名单/黑名单用于 API 访问控制                                               |
| 📊 **可编辑速率限制**           | 可配置的 RPM、最小间隔和最大并发                                             |
| 💾 **Rate Limit Persistence**   | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness |
| 🔄 **Token Refresh Resilience** | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt       |

### 📊 可观察性与分析

| 功能               | 功能描述                                   |
| ------------------ | ------------------------------------------ |
| 📝 **请求日志**    | 调试模式，完整的请求/响应日志              |
| 💾 **SQLite 日志** | 持久化代理日志，服务器重启后仍然保留       |
| 📊 **分析仪表板**  | Recharts：统计卡片、使用量图表、提供商表格 |
| 📈 **进度追踪**    | 流式传输的 SSE 进度事件（可选）            |
| 🧪 **LLM 评估**    | 黄金集测试，4 种匹配策略                   |
| 🔍 **请求遥测**    | p50/p95/p99 延迟聚合 + X-Request-Id 追踪   |
| 📋 **日志 + 配额** | 专用页面用于日志浏览和配额追踪             |
| 🏥 **健康仪表板**  | 运行时间、断路器状态、锁定、缓存统计       |
| 💰 **成本追踪**    | 预算管理 + 每模型定价配置                  |

### ☁️ 部署与同步

| 功能                  | 功能描述                                                   |
| --------------------- | ---------------------------------------------------------- |
| 💾 **Cloud Sync**     | 通过 Cloudflare Workers 在设备间同步配置                   |
| 🌐 **随处部署**       | Localhost、VPS、Docker、Cloudflare Workers                 |
| 🔑 **API Key 管理**   | 按提供商生成、轮换和设定 API Key 范围                      |
| 🧙 **配置向导**       | 4 步引导式设置，面向新用户                                 |
| 🔧 **CLI 工具仪表板** | 一键配置 Claude、Codex、Cline、OpenClaw、Kilo、Antigravity |
| 🔄 **数据库备份**     | 自动备份和恢复所有设置                                     |

<details>
<summary><b>📖 功能详情</b></summary>

### 🎯 智能 4 层故障转移

创建带自动故障转移的组合：

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        （您的订阅）
  2. nvidia/llama-3.3-70b      （免费 NVIDIA API）
  3. glm/glm-4.7               （便宜备用，$0.6/1M）
  4. if/kimi-k2-thinking       （免费后备）

→ 配额用完或出错时自动切换
```

### 📊 实时配额追踪

- 每个提供商的 Token 消耗
- 重置倒计时（5 小时、每日、每周）
- 付费层级的成本估算
- 月度支出报告

### 🔄 格式转换

格式间的无缝转换：

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI Responses**
- 您的 CLI 发送 OpenAI 格式 → OmniRoute 转换 → 提供商接收原生格式
- 适用于任何支持自定义 OpenAI 端点的工具

### 👥 多账号支持

- 每个提供商添加多个账号
- 自动轮询或基于优先级的路由
- 当一个账号达到配额时自动切换到下一个

### 🔄 自动令牌刷新

- OAuth 令牌在过期前自动刷新
- 无需手动重新认证
- 所有提供商的无缝体验

### 🎨 自定义组合

- 创建无限模型组合
- 6 种策略：fill-first、round-robin、power-of-two-choices、random、least-used、cost-optimized
- 通过 Cloud Sync 在设备间共享组合

### 🏥 健康仪表板

- 系统状态（运行时间、版本、内存使用）
- 每个提供商的断路器状态（Closed/Open/Half-Open）
- 速率限制状态和活动锁定
- 签名缓存统计
- 延迟遥测（p50/p95/p99）+ 提示缓存
- 一键重置健康状态

### 🔧 翻译器 Playground

- 调试、测试和可视化 API 格式转换
- 发送请求并查看 OmniRoute 如何在提供商格式间转换
- 对排查集成问题非常有价值

### 💾 Cloud Sync

- 在设备间同步提供商、组合和设置
- 自动后台同步
- 安全加密存储

</details>

## 🧪 评估 (Evals)

OmniRoute 包含内置评估框架，用于针对黄金集测试 LLM 响应质量。通过仪表板中的 **Analytics → Evals** 访问。

### 内置黄金集

预加载的「OmniRoute Golden Set」包含 10 个测试用例：

- 问候、数学、地理、代码生成
- JSON 格式合规性、翻译、markdown
- 安全拒绝（有害内容）、计数、布尔逻辑

### 评估策略

| 策略       | 描述                             | 示例                             |
| ---------- | -------------------------------- | -------------------------------- |
| `exact`    | 输出必须完全匹配                 | `"4"`                            |
| `contains` | 输出必须包含子串（不区分大小写） | `"Paris"`                        |
| `regex`    | 输出必须匹配正则表达式模式       | `"1.*2.*3"`                      |
| `custom`   | 自定义 JS 函数返回 true/false    | `(output) => output.length > 10` |

---

## 📖 设置指南

<details>
<summary><b>💳 订阅提供商</b></summary>

### Claude Code (Pro/Max)

```bash
仪表板 → 提供商 → 连接 Claude Code
→ OAuth 登录 → 自动令牌刷新
→ 5 小时 + 每周配额追踪

模型：
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**专业建议：** 复杂任务用 Opus，追求速度用 Sonnet。OmniRoute 按模型追踪配额！

### OpenAI Codex (Plus/Pro)

```bash
仪表板 → 提供商 → 连接 Codex
→ OAuth 登录（端口 1455）
→ 5 小时 + 每周重置

模型：
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI（免费 180K/月！）

```bash
仪表板 → 提供商 → 连接 Gemini CLI
→ Google OAuth
→ 每月 180K completions + 每天 1K

模型：
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**最佳价值：** 巨大的免费额度！在付费层级之前使用。

### GitHub Copilot

```bash
仪表板 → 提供商 → 连接 GitHub
→ 通过 GitHub OAuth
→ 每月重置（每月 1 日）

模型：
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 API Key 提供商</b></summary>

### NVIDIA NIM（免费 1000 积分！）

1. 注册：[build.nvidia.com](https://build.nvidia.com)
2. 获取免费 API key（包含 1000 推理积分）
3. 仪表板 → 添加提供商 → NVIDIA NIM：
   - API Key：`nvapi-your-key`

**模型：** `nvidia/llama-3.3-70b-instruct`、`nvidia/mistral-7b-instruct` 及 50+ 更多

**专业建议：** OpenAI 兼容的 API — 与 OmniRoute 的格式转换完美配合！

### DeepSeek

1. 注册：[platform.deepseek.com](https://platform.deepseek.com)
2. 获取 API key
3. 仪表板 → 添加提供商 → DeepSeek

**模型：** `deepseek/deepseek-chat`、`deepseek/deepseek-coder`

### Groq（免费层可用！）

1. 注册：[console.groq.com](https://console.groq.com)
2. 获取 API key（包含免费层）
3. 仪表板 → 添加提供商 → Groq

**模型：** `groq/llama-3.3-70b`、`groq/mixtral-8x7b`

**专业建议：** 超快推理 — 最适合实时编程！

### OpenRouter（100+ 模型）

1. 注册：[openrouter.ai](https://openrouter.ai)
2. 获取 API key
3. 仪表板 → 添加提供商 → OpenRouter

**模型：** 通过一个 API key 访问所有主要提供商的 100+ 模型。

</details>

<details>
<summary><b>💰 低价提供商（备用）</b></summary>

### GLM-4.7（每日重置，$0.6/1M）

1. 注册：[Zhipu AI](https://open.bigmodel.cn/)
2. 从 Coding Plan 获取 API key
3. 仪表板 → 添加 API Key：
   - 提供商：`glm`
   - API Key：`your-key`

**使用：** `glm/glm-4.7`

**专业建议：** Coding Plan 以 1/7 的价格提供 3 倍配额！每日 10:00 AM 重置。

### MiniMax M2.1（5 小时重置，$0.20/1M）

1. 注册：[MiniMax](https://www.minimax.io/)
2. 获取 API key
3. 仪表板 → 添加 API Key

**使用：** `minimax/MiniMax-M2.1`

**专业建议：** 长上下文（1M Token）最便宜的选项！

### Kimi K2（$9/月固定）

1. 订阅：[Moonshot AI](https://platform.moonshot.ai/)
2. 获取 API key
3. 仪表板 → 添加 API Key

**使用：** `kimi/kimi-latest`

**专业建议：** 固定 $9/月 10M Token = $0.90/1M 有效成本！

</details>

<details>
<summary><b>🆓 免费提供商（应急备用）</b></summary>

### iFlow（8 个免费模型）

```bash
仪表板 → 连接 iFlow
→ iFlow OAuth 登录
→ 无限使用

模型：
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen（3 个免费模型）

```bash
仪表板 → 连接 Qwen
→ 设备码授权
→ 无限使用

模型：
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro（免费 Claude）

```bash
仪表板 → 连接 Kiro
→ AWS Builder ID 或 Google/GitHub
→ 无限使用

模型：
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 创建组合</b></summary>

### 示例 1：最大化订阅 → 便宜备用

```
仪表板 → 组合 → 创建新的

名称：premium-coding
模型：
  1. cc/claude-opus-4-6（订阅主力）
  2. glm/glm-4.7（便宜备用，$0.6/1M）
  3. minimax/MiniMax-M2.1（最便宜的后备，$0.20/1M）

在 CLI 中使用：premium-coding
```

### 示例 2：仅免费（零成本）

```
名称：free-combo
模型：
  1. gc/gemini-3-flash-preview（每月 180K 免费）
  2. if/kimi-k2-thinking（无限制）
  3. qw/qwen3-coder-plus（无限制）

成本：永远 $0！
```

</details>

<details>
<summary><b>🔧 CLI 集成</b></summary>

### Cursor IDE

```
设置 → 模型 → 高级：
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [从 OmniRoute 仪表板获取]
  Model: cc/claude-opus-4-6
```

### Claude Code

使用仪表板中的 **CLI Tools** 页面一键配置，或手动编辑 `~/.claude/settings.json`。

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**选项 1 — 仪表板（推荐）：**

```
仪表板 → CLI Tools → OpenClaw → 选择模型 → 应用
```

**选项 2 — 手动：** 编辑 `~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **注意：** OpenClaw 仅支持本地 OmniRoute。使用 `127.0.0.1` 而非 `localhost` 以避免 IPv6 解析问题。

### Cline / Continue / RooCode

```
设置 → API 配置：
  提供商：OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [从 OmniRoute 仪表板获取]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 故障排除

<details>
<summary><b>点击展开故障排除指南</b></summary>

**"Language model did not provide messages"**

- 提供商配额已耗尽 → 检查仪表板配额追踪器
- 解决方案：使用组合故障转移或切换到更便宜的层级

**速率限制**

- 订阅配额耗尽 → 回退到 GLM/MiniMax
- 添加组合：`cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth 令牌过期**

- OmniRoute 自动刷新
- 如果问题持续：仪表板 → 提供商 → 重新连接

**高成本**

- 在仪表板 → 成本中检查使用统计
- 将主要模型切换为 GLM/MiniMax
- 对非关键任务使用免费层（Gemini CLI、iFlow）

**仪表板在错误端口打开**

- 设置 `PORT=20128` 和 `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Cloud sync 错误**

- 验证 `BASE_URL` 指向您正在运行的实例
- 验证 `CLOUD_URL` 指向预期的云端点
- 保持 `NEXT_PUBLIC_*` 值与服务器端值一致

**首次登录不工作**

- 检查 `.env` 中的 `INITIAL_PASSWORD`
- 如未设置，默认密码为 `123456`

**没有请求日志**

- 在 `.env` 中设置 `ENABLE_REQUEST_LOGS=true`

**兼容 OpenAI 的提供商连接测试显示 "Invalid"**

- 许多提供商不暴露 `/models` 端点
- OmniRoute v1.0.6+ 包含通过 chat completions 的回退验证
- 确保 base URL 包含 `/v1` 后缀

</details>

---

## 🛠️

- **运行时**: Node.js 20+
- **语言**: TypeScript 5.9 — `src/` 和 `open-sse/` 中 **100% TypeScript**（v1.0.6）
- **框架**: Next.js 16 + React 19 + Tailwind CSS 4
- **数据库**: LowDB (JSON) + SQLite（领域状态 + 代理日志）
- **流式传输**: Server-Sent Events (SSE)
- **认证**: OAuth 2.0 (PKCE) + JWT + API Keys
- **测试**: Node.js test runner（368+ 单元测试）
- **CI/CD**: GitHub Actions（发布时自动 npm 发布 + Docker Hub）
- **网站**: [omniroute.online](https://omniroute.online)
- **包**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **弹性**: 断路器、指数退避、反惊群、TLS 伪装

---

## 📖 文档

| 文档                                | 描述                                                   |
| ----------------------------------- | ------------------------------------------------------ |
| 🎯 **Endpoint-Aware Models**        | Custom models declare supported endpoints + API format |
| [用户指南](docs/USER_GUIDE.md)      | 提供商、组合、CLI 集成、部署                           |
| [API 参考](docs/API_REFERENCE.md)   | 所有端点及示例                                         |
| [故障排除](docs/TROUBLESHOOTING.md) | 常见问题和解决方案                                     |
| [架构](docs/ARCHITECTURE.md)        | 系统架构和内部机制                                     |
| [贡献指南](CONTRIBUTING.md)         | 开发设置和指南                                         |
| [OpenAPI 规范](docs/openapi.yaml)   | OpenAPI 3.0 规范                                       |
| [安全策略](SECURITY.md)             | 漏洞报告和安全实践                                     |

---

## 🗺️

## 👥 贡献者

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### 如何贡献

1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开 Pull Request

详细指南请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。

### 发布新版本

```bash
# 创建发布 — npm 发布自动完成
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Star 历史

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 致谢

特别感谢 **[decolua](https://github.com/decolua)** 的 **[9router](https://github.com/decolua/9router)** — 启发了本 fork 的原始项目。OmniRoute 在这个令人难以置信的基础上添加了额外功能、多模态 API 和完整的 TypeScript 重写。

特别感谢 **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — 启发了本 JavaScript 移植的原始 Go 实现。

---

## 📄 许可证

MIT 许可证 — 详见 [LICENSE](LICENSE)。

---

<div align="center">
  <sub>用 ❤️ 为 24/7 编程的开发者打造</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
