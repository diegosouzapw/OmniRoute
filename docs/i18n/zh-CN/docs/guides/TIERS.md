# OmniRoute Tiers — User Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute 将支持的 352 个提供者划分为 3 个经济层级。每个请求会按顺序经过这些层级，直到其中一个成功返回——无需编写任何回退代码，即可获得成本最低的可用响应。

## 层级 1 — 订阅

**您已经付费的提供者。** OmniRoute 会在配额到期前充分利用每一份配额。

| 提供者                       | 归入层级 1 的原因                            |
| ---------------------------- | -------------------------------------------- |
| Claude Code OAuth            | Anthropic Pro/Team——固定费率，通常未充分使用 |
| OpenAI Codex（ChatGPT 订阅） | Plus/Team 包含 Codex 配额                    |
| GitHub Copilot               | 按席位收费——配额每月重置                     |
| Cursor IDE                   | Pro 计划配额                                 |
| Antigravity / Devin Desktop  | 内置配额                                     |

**策略**：对于符合模型优势的每个请求，优先路由到此层级。配额跟踪器会监控即将到来的配额重置，而 `reset-aware` 组合策略会据此确定优先级。若要首先路由到层级 1，并仅在配额耗尽时转向付费层级，请使用 `auto/thrifty` ID；或者使用 `auto/subscription`，以仅使用计划内包含的容量，并在不可用时直接失败。请参阅[订阅优先路由](../routing/SUBSCRIPTION_LADDER.md)。

## 层级 2 — 低成本

**每 100 万 token 价格低于 $1 的按 token 付费提供者。** 保留用于高吞吐量工作，或在层级 1 配额达到上限后使用。

| 提供者                 | 价格（输入/输出）       | 优势                  |
| ---------------------- | ----------------------- | --------------------- |
| DeepSeek V4 Pro        | 每 100 万 $0.27 / $1.10 | 代码、推理            |
| GLM-4.5                | 每 100 万 $0.60 / $2.20 | 长上下文              |
| MiniMax M1             | 每 100 万 $0.20 / $1.10 | 速度                  |
| Qwen Coder             | 每 100 万 $0.30 / $1.20 | 代码                  |
| OpenRouter（价格优化） | 不定                    | 100+ 个模型、动态选择 |

**策略**：组合策略 `cost-optimized` 会选择满足任务能力筛选条件（视觉、JSON 模式、工具、最大上下文）的最低 $/token 模型。

## 层级 3 — 免费

**零成本提供者**——免费层级、积分计划、OAuth 每日配额。

| 提供者           | 免费配额 / 积分                        |
| ---------------- | -------------------------------------- |
| Kiro AI          | 免费 Claude 层级（宽松的合理使用限制） |
| OpenCode Free    | 无需身份验证，宽松的速率限制           |
| Qoder            | 免费 OAuth                             |
| Google Vertex AI | 新账户 $300 积分                       |
| Amazon Q         | 面向 AWS 用户的免费层级                |
| Pollinations     | 开放的公共 API                         |
| Cloudflare AI    | Workers AI 免费层级                    |

**策略**：当层级 1 和层级 2 均失败，或设置了 `useFreeOnly=true` 时，带预算上限的组合策略 `auto` 会将请求路由到此层级。免费提供者的速率限制通常更严格——熔断器会在退避后恢复使用它们。

## 配置层级

控制面板 → **层级** → 分配您的提供者。默认设置（来自 `tierDefaults.json`）通常很合理；当您需要优先使用特定订阅或排除某些提供者时，可以进行编辑。

Auto-Combo 的 16 因素评分也会考虑层级。请参阅
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md)。

## 遥测

控制面板 → **使用情况** 会显示每天每个层级消耗的 token。您可以利用这些数据：

- 确认层级 1 已得到充分利用（否则您正在浪费订阅价值）
- 确定哪些层级 2 模型最常被选中（整合至 1–2 个）
- 验证层级 3 是否为测试/探索类工作负载节省了成本

## 常见模式

### 纯免费工作负载

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

强力倾向于层级 3；仅当层级 3 不可用时才使用层级 2。

### 订阅优先，低成本回退

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

与层级 1 → 层级 2 → 层级 3 对应的显式有序列表。
