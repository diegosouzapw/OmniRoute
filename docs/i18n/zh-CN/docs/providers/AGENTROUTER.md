# AgentRouter Setup Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) 是一个与 Anthropic 兼容的中继服务，以通常低于直接使用 Anthropic API 的价格转售
Claude 和其他模型。它被设计为官方 Claude Code
客户端的即插即用 `ANTHROPIC_BASE_URL` 替代方案，因此只接受符合 Claude Code 请求特征的流量（特定的
User-Agent、`anthropic-beta` 标志、Stainless SDK 请求头等）。

## 快速开始 — 使用原生 `agentrouter` 提供者（推荐）

对于大多数用户，**无需特殊设置**。OmniRoute 内置了一个
`agentrouter` 提供者，其中已完整包含 Claude Code 请求特征（参见
`open-sse/config/providerRegistry.ts` → `agentrouter`）。使用方法：

1. 打开**控制面板 → 提供者 → 添加提供者**。
2. 从列表中选择 **AgentRouter**。
3. 粘贴你的 `sk-...` API 密钥并保存。

就是这样——无需环境变量，也无需自定义提供者类型。内置模型
包括 `claude-opus-4-6`、`claude-haiku-4-5-20251001`、`glm-5.1` 和
`deepseek-v3.2`。

本指南的其余部分介绍**高级方式**：使用
`anthropic-compatible-cc-*` 提供者类型。当你需要更精细地控制
请求特征时，请使用此方式——例如，连接到尚未纳入原生提供者注册表的其他 AgentRouter 风格
中继服务，或者覆盖基础 URL、聊天路径或请求头集合。

---

## 高级：通过 Claude Code 兼容提供者类型连接

OmniRoute 还通过 **Claude Code
兼容**提供者类型（`anthropic-compatible-cc-*`）支持 AgentRouter（以及类似的中继服务），该类型使用具有正确请求特征的
Anthropic Messages API。将通用
`openai-compatible-chat` 提供者指向 `https://agentrouter.org` 将
**无法**正常工作——上游 WAF 会拒绝看起来不像 Claude
Code 的请求。

---

## 前提条件

- 一个 AgentRouter 账户和 API 密钥。新注册用户可通过项目 [README](../README.md) 中的推广
  链接获得免费额度。
- 运行 OmniRoute 时已启用 `ENABLE_CC_COMPATIBLE_PROVIDER` 功能标志
  （见下文）。

## 1. 启用 CC 兼容提供者类型

Claude Code 兼容提供者类型受功能标志控制，因为它发送的流量会高度模拟官方 Claude Code 客户端。请在
启动 OmniRoute 前设置以下环境变量来启用它：

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker 示例：

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

重启后，除现有的 OpenAI 兼容和 Anthropic 兼容流程外，控制面板中还会显示**添加 Claude Code 兼容提供者**选项。

## 2. 在控制面板中创建提供者

1. 打开**控制面板 → 提供者 → 添加提供者**。
2. 选择**添加 Claude Code 兼容提供者**（仅在设置上述标志后可见）。
3. 填写以下字段：

| 字段     | 值                                                |
| -------- | ------------------------------------------------- |
| 名称     | `AgentRouter`（或任意标签）                       |
| 前缀     | `agentrouter`（显示在日志和控制面板中的友好别名） |
| 基础 URL | `https://agentrouter.org`                         |
| 聊天路径 | `/v1/messages?beta=true`（默认值——保持不变）      |

> 规范模型标识符仍使用完整的提供者节点 ID
> （`anthropic-compatible-cc-{uuid}/{model}`）。**前缀**只是一个显示
> 别名，由 `src/lib/usage/callLogs.ts` 解析，以提供更友好的日志输出。

4. （可选）在**验证**字段中粘贴你的 API 密钥，然后点击**检查**，以便在保存前
   确认连接是否正常。
5. 点击**添加**。

创建完成后，打开该提供者，并使用你的 AgentRouter API
密钥（`sk-...`）添加一个**连接**。该连接的 `test_status` 应变为 `active`。

## 3. 通过组合或直接使用

使用提供者的前缀作为命名空间来引用模型：

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

规范模型 ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` 也可使用，
并且数据库和组合配置中显示的正是此 ID。

或者，像使用任何其他提供者一样，将其添加到组合中，以实现路由、故障转移和配额管理。

---

## 线路镜像详情

作为参考，cc-compatible 桥接器会在每个上游请求中发送以下内容
（参见 `open-sse/services/claudeCodeCompatible.ts`）：

| 请求头                                      | 值                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `Authorization`                             | `Bearer <api-key>`                                                       |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                 |
| `anthropic-version`                         | `2023-06-01`                                                             |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24` |
| 每个连接的思维内容脱敏测试版开关            | 对明确要求思维流经过脱敏的上游添加 `redact-thinking-2026-02-12`          |
| 每个连接的思维内容摘要开关                  | 对尚未设置显示模式的 CC Compatible 思维请求添加 `display: "summarized"`  |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                   |
| `x-app`                                     | `cli`                                                                    |
| `X-Stainless-*`                             | 各种 Stainless SDK 请求头（语言、软件包版本、操作系统、架构等）          |

这使请求能够通过上游 WAF / 客户端白名单。

---

## 故障排除

**`{"error":{"message":"unauthorized client detected, ..."}}`** — 你的请求
与 Claude Code 线路镜像不匹配。当提供者被配置为
`openai-compatible-chat` 而不是 `anthropic-compatible-cc`，或者启动时
未设置 `ENABLE_CC_COMPATIBLE_PROVIDER=true` 标志时，就会发生这种情况。

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
“令牌无效”。线路镜像正确，但 API 密钥被拒绝。请在 AgentRouter 控制面板中生成
新密钥并更新连接。

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter 的审核钩子拒绝了请求内容，或者该密钥的套餐不允许使用所请求的模型。请尝试其他提示词或模型；如果正常提示词持续被阻止，请联系 AgentRouter 支持。

**仅在特定模型上出现 `[400]: content-blocked`** — 大多数 AgentRouter 套餐仅
允许使用部分模型（例如 `claude-opus-4-6`）。即使密钥有效，其他模型 ID 也会返回
`unauthorized_client_error`。请在 AgentRouter 控制面板中检查你的套餐涵盖哪些模型。

**omniroute 日志中的 `Invalid JSON response from provider (reset after Ns)`** —
上游返回了非 JSON 正文（通常是来自 WAF 的 HTML 错误页面）。
这通常意味着请求根本没有到达 AgentRouter 后端——请再次确认
提供者 ID 以 `anthropic-compatible-cc-` 开头（注意末尾的连字符——
参见 `open-sse/services/claudeCodeCompatible.ts` 中的
`CLAUDE_CODE_COMPATIBLE_PREFIX`），并确保该功能标志已启用。

**即使 AgentRouter 提供者已存在，仍出现 `unauthorized client detected` / HTML 错误页面** —
你很可能拥有**多个** AgentRouter 提供者，并且请求命中了错误的提供者。如果之前遗留的手动创建的
`anthropic-compatible-*`（非 `cc`）或 `openai-compatible-chat-*` 提供者
使用了 `agentrouter` 前缀，它可能会占用 `agentrouter/<model>` 模型
ID（组合也可能通过节点 ID 引用它），从而将流量路由到该提供者——
它发送通用 User-Agent，因而被拒绝——而不是路由到已内置正确线路镜像的
`agentrouter` 提供者。请在 omniroute 日志中检查模型实际解析到的位置
（`ROUTING` 标签会显示
`agentrouter/<model> → <providerId>/<model>`）；如果 `<providerId>` 不是
`agentrouter`，请统一使用原生提供者：将组合指向
`agentrouter/<model>`（providerId 为 `agentrouter`），并删除重复的
兼容提供者。原生提供者无需任何线路镜像配置，也无需
`customUserAgent`。

---

## 另请参阅

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web 提供者集成说明
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — 免费套餐提供者
  目录
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire 图像实现
