# Thinking Budget (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **控制台：**设置 → **AI** → 思考预算  
> **API：**`GET` / `PUT` `/api/settings/thinking-budget`  
> **源文件：**`open-sse/services/thinkingBudget.ts`

思考预算控制 OmniRoute 是否在请求发送给提供者之前**重写客户端的思考/推理参数**。它**不会**开启或关闭压缩、路由或提示词缓存。

## 模式

| 模式                      | OmniRoute 的行为                                                                                        | 适用场景                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`**（默认） | 保留客户端字段不变（`reasoning`、`reasoning_effort`、Claude `thinking`、Gemini `thinking_config` 等）。 | **Codex / Desktop / 任何应由客户端控制推理强度和推理摘要的客户端。**当客户端请求 `reasoning.summary` 时，这是显示思考面板的必要条件。 |
| **`auto`**                | 在向上游发送之前，从请求正文中**移除所有**思考/推理字段。                                               | 仅当你明确希望由**提供者**自行设置默认值，并且**不**需要由客户端控制思考时使用。它**不**表示“自动显示思考过程”。                      |
| **`custom`**              | 使用固定的思考 token 预算覆盖所有请求。                                                                 | 为所有流量设置思考 token 硬上限。                                                                                                     |
| **`adaptive`**            | 根据消息数量、工具和提示词长度，从基础推理强度动态调整预算。                                            | 在不完全移除客户端意图的情况下，对 token 进行弹性控制。                                                                               |

### `auto` 会移除哪些内容

当模式为 `auto` 时，`stripThinkingConfig()` 会删除以下字段（以及其他相关字段）：

- OpenAI / Responses：`reasoning`、`reasoning_effort`
- Claude：`thinking`，以及存在时的 `output_config.effort`
- Gemini：`generationConfig.thinking_config` / `thinkingConfig`

如果客户端（例如 Codex Desktop）发送了 `reasoning: { effort: "ultra", summary: "detailed" }`，**auto 会丢弃该对象**。上游可能仍会对部分推理 token 计费，但通常只返回**空的或仅加密的**推理项，因此 UI 不会显示有用的思考流。

## 这**不是什么**

| 功能                                 | 关系                                                                                                       |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **压缩**（Caveman、RTK、stacked 等） | 独立的处理管线。在所有思考预算模式下均可运行。                                                             |
| **提示词/语义缓存**                  | 独立功能。不受思考预算模式影响。                                                                           |
| **组合路由/回退**                    | 独立功能。不受影响。                                                                                       |
| **API 密钥 token 限制/成本预算**     | 独立功能。不受影响。                                                                                       |
| **推理重放缓存**                     | 针对严格提供者（DeepSeek、Kimi、Qwen-thinking 等）的多轮重新注入机制。与 Desktop 的“显示思考过程”不同。    |
| **解密 `encrypted_content`**         | **不可能。**OpenAI/Codex 的私有推理数据块是不透明的。OmniRoute 从不解密这些内容（#7095 / #7176 / #7304）。 |

## 可见思考内容（Codex / Responses 客户端）

若要让客户端显示思考文本，需要同时满足以下**所有**条件：

1. Thinking Budget 模式 = **`passthrough`**（或者使用 custom/adaptive，但仍需为所用路径充分保留摘要请求）。
2. 客户端请求摘要，例如 Codex 的 `model_reasoning_summary = "detailed"` / `auto`（不能是 `none`）。
3. 上游实际以流式方式返回 `response.reasoning_summary_text.*`（或者条目中存在非空的 `reasoning.summary`）。

如果只得到“加密的私有推理”，可能是因为：

- 模式为 **`auto`**（客户端请求已被移除），或者
- 上游返回了不含摘要文本的 `encrypted_content`（提供者限制；OmniRoute 只能显示占位符，无法显示明文）。

## API 示例

```bash
# 读取
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# 推荐用于在 Codex / Desktop 中显示思考内容
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

架构（`updateThinkingBudgetSchema`）：`mode` ∈ `passthrough|auto|custom|adaptive`；可选字段为 `customBudget`、`effortLevel`、`baseBudget`、`complexityMultiplier`。

### 持久化 / 重启

该值存储在设置键 `thinkingBudget` 下，并在进程启动时加载（`hydrateThinkingBudgetConfig`）。通过数据库或某些非 API 路径进行更改后，请**重启 OmniRoute 进程**，以确保内存中的单例与磁盘上的值保持一致。

## 运维人员检查清单

- [ ] Codex / Desktop 用户：模式 = **passthrough**
- [ ] 如果希望减少**消息**的令牌用量，请保持启用压缩，而不是通过移除思考内容来实现
- [ ] 不要指望 `auto` 会“显示更多思考内容”
- [ ] 仅提供加密摘要属于**提供者**行为；passthrough 无法对其进行解密

## 相关文档

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — 多轮 `reasoning_content` 缓存
- [USER_GUIDE.md](./USER_GUIDE.md) — 设置仪表板选项卡
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 设置端点
