# Context Relay（上下文中继）(中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../../docs/features/context-relay.md) · 🇪🇸 [es](../../../es/docs/features/context-relay.md) · 🇫🇷 [fr](../../../fr/docs/features/context-relay.md) · 🇩🇪 [de](../../../de/docs/features/context-relay.md) · 🇮🇹 [it](../../../it/docs/features/context-relay.md) · 🇷🇺 [ru](../../../ru/docs/features/context-relay.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/features/context-relay.md) · 🇯🇵 [ja](../../../ja/docs/features/context-relay.md) · 🇰🇷 [ko](../../../ko/docs/features/context-relay.md) · 🇸🇦 [ar](../../../ar/docs/features/context-relay.md) · 🇮🇳 [hi](../../../hi/docs/features/context-relay.md) · 🇮🇳 [in](../../../in/docs/features/context-relay.md) · 🇹🇭 [th](../../../th/docs/features/context-relay.md) · 🇻🇳 [vi](../../../vi/docs/features/context-relay.md) · 🇮🇩 [id](../../../id/docs/features/context-relay.md) · 🇲🇾 [ms](../../../ms/docs/features/context-relay.md) · 🇳🇱 [nl](../../../nl/docs/features/context-relay.md) · 🇵🇱 [pl](../../../pl/docs/features/context-relay.md) · 🇸🇪 [sv](../../../sv/docs/features/context-relay.md) · 🇳🇴 [no](../../../no/docs/features/context-relay.md) · 🇩🇰 [da](../../../da/docs/features/context-relay.md) · 🇫🇮 [fi](../../../fi/docs/features/context-relay.md) · 🇵🇹 [pt](../../../pt/docs/features/context-relay.md) · 🇷🇴 [ro](../../../ro/docs/features/context-relay.md) · 🇭🇺 [hu](../../../hu/docs/features/context-relay.md) · 🇧🇬 [bg](../../../bg/docs/features/context-relay.md) · 🇸🇰 [sk](../../../sk/docs/features/context-relay.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/features/context-relay.md) · 🇮🇱 [he](../../../he/docs/features/context-relay.md) · 🇵🇭 [phi](../../../phi/docs/features/context-relay.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/features/context-relay.md) · 🇨🇿 [cs](../../../cs/docs/features/context-relay.md) · 🇹🇷 [tr](../../../tr/docs/features/context-relay.md)

---

`context-relay` 是一种 Combo 策略，可在活跃账户在对话结束前轮换时保持会话连续性。

当前运行时在模型选择上表现为优先级路由，并在此基础上增加了一个交接层：

- 在活跃账户耗尽之前，OmniRoute 生成一份紧凑的结构化摘要
- 身份认证为同一会话选择了不同账户后，OmniRoute 将该摘要作为系统消息注入下一次请求
- 交接被成功消费后，将从存储中移除

## 适用场景

在以下条件全部满足时使用 `context-relay`：

- Combo 预期会在同一服务商的多个账户之间轮换
- 丢失短期会话连续性会损害任务质量
- 服务商暴露了足够的配额信息以预测即将达到的账户限制

这对于可能超出单个账户窗口的长时间编程或研究会话最为有用。

## 运行时流程

当前行为有意分为两个运行时层。

### 配额用量 0% 到 84%

不生成交接。请求行为与普通优先级路由一致。

### 配额用量 85% 到 94%

如果活跃服务商在 `handoffProviders` 中已启用，OmniRoute 将在账户完全耗尽前在后台生成一份结构化的交接摘要。

重要细节：

- 默认警告阈值为 `0.85`
- 生成的硬停止线为 `0.95`
- 每个 `sessionId + comboName` 只允许一个进行中的交接生成
- 如果该会话/Combo 已有活跃交接，则不会生成重复摘要

### 配额用量 95% 或以上

不再生成新交接。此时系统已处于或接近耗尽状态，运行时会避免调度另一个摘要请求。

### 账户轮换后

当同一会话的下一次请求解析到不同的认证账户时，OmniRoute 将存储的交接作为系统消息前置注入。注入仅在实际账户切换被确认后发生。

## 交接载荷

持久化的交接载荷存储在 `context_handoffs` 中，包含：

- `sessionId`
- `comboName`
- `fromAccount`
- `summary`
- `keyDecisions`
- `taskProgress`
- `activeEntities`
- `messageCount`
- `model`
- `warningThresholdPct`
- `generatedAt`
- `expiresAt`

摘要模型被指示返回一个包含以下结构的 JSON 对象：

```json
{
  "summary": "对连续性重要内容的紧凑摘要",
  "keyDecisions": ["决策 1", "决策 2"],
  "taskProgress": "已完成项、待完成项以及下一步",
  "activeEntities": ["fileA.ts", "功能 X", "服务商 Y"]
}
```

在注入时，OmniRoute 将该载荷转换为 `<context_handoff>` 系统消息，使下一个账户能够在正确的本地上下文中继续。

## 配置

`context-relay` 支持以下配置字段：

- `handoffThreshold`：摘要生成的警告阈值，默认 `0.85`
- `handoffModel`：可选的模型覆盖，仅用于摘要生成
- `handoffProviders`：允许触发交接生成的服务商白名单

全局默认值可在设置中配置，Combo 特定值可在 Combos 页面中覆盖。

## 架构说明

当前实现不采用独立的 `handleContextRelayCombo` 处理器。

相反：

- `open-sse/services/combo.ts` 决定成功的回合是否应生成交接
- `src/sse/handlers/chat.ts` 仅在身份认证解析了请求实际使用的账户后注入交接

在当前代码库中，这种分离是刻意的，因为 Combo 循环本身不知道请求是停留在同一账户上还是实际切换了账户。

## 局限性

- 有效运行时支持目前集中于 `codex` 配额轮换。
- `handoffProviders` 已建模为配置界面，但实际交接生成仍依赖于特定服务商的配额管道。
- 摘要刻意保持紧凑并基于近期历史；它不是完整的对话回放机制。
- 交接范围限定于 `sessionId + comboName`，并自动过期。
- 如果会话未切换账户，存储的交接不会被注入。

## 推荐使用模式

- 使用同一服务商的多个账户
- 在整个会话中保持稳定的 `sessionId` 值
- 将 `handoffThreshold` 设置得足够早，为后台摘要请求留出空间
- 将此功能视为连续性辅助工具，而非持久记忆的替代品
