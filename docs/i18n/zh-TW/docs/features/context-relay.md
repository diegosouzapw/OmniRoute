# Context Relay（繁體中文）

🌐 **語言:** 🇺🇸 [English](../../../../../docs/features/context-relay.md) · 🇪🇸 [es](../../../es/docs/features/context-relay.md) · 🇫🇷 [fr](../../../fr/docs/features/context-relay.md) · 🇩🇪 [de](../../../de/docs/features/context-relay.md) · 🇮🇹 [it](../../../it/docs/features/context-relay.md) · 🇷🇺 [ru](../../../ru/docs/features/context-relay.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/features/context-relay.md) · 🇯🇵 [ja](../../../ja/docs/features/context-relay.md) · 🇰🇷 [ko](../../../ko/docs/features/context-relay.md) · 🇸🇦 [ar](../../../ar/docs/features/context-relay.md) · 🇮🇳 [hi](../../../hi/docs/features/context-relay.md) · 🇮🇳 [in](../../../in/docs/features/context-relay.md) · 🇹🇭 [th](../../../th/docs/features/context-relay.md) · 🇻🇳 [vi](../../../vi/docs/features/context-relay.md) · 🇮🇩 [id](../../../id/docs/features/context-relay.md) · 🇲🇾 [ms](../../../ms/docs/features/context-relay.md) · 🇳🇱 [nl](../../../nl/docs/features/context-relay.md) · 🇵🇱 [pl](../../../pl/docs/features/context-relay.md) · 🇸🇪 [sv](../../../sv/docs/features/context-relay.md) · 🇳🇴 [no](../../../no/docs/features/context-relay.md) · 🇩🇰 [da](../../../da/docs/features/context-relay.md) · 🇫🇮 [fi](../../../fi/docs/features/context-relay.md) · 🇵🇹 [pt](../../../pt/docs/features/context-relay.md) · 🇷🇴 [ro](../../../ro/docs/features/context-relay.md) · 🇭🇺 [hu](../../../hu/docs/features/context-relay.md) · 🇧🇬 [bg](../../../bg/docs/features/context-relay.md) · 🇸🇰 [sk](../../../sk/docs/features/context-relay.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/features/context-relay.md) · 🇮🇱 [he](../../../he/docs/features/context-relay.md) · 🇵🇭 [phi](../../../phi/docs/features/context-relay.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/features/context-relay.md) · 🇨🇿 [cs](../../../cs/docs/features/context-relay.md) · 🇹🇷 [tr](../../../tr/docs/features/context-relay.md)

---

`context-relay` 是一種 combo 策略，可在活躍帳戶於對話完成前輪換時，保持工作階段的連續性。

目前的執行時期行為類似於模型選擇的優先路由，然後在上方加入一層交接層：

- 在活躍帳戶耗盡之前，OmniRoute 會產生一個精簡的結構化摘要
- 在認證為同一個工作階段選取不同帳戶後，OmniRoute 會將該摘要作為系統訊息注入到下一個請求中
- 交接成功消耗後，會從儲存中移除

## 何時使用

當以下所有條件成立時，請使用 `context-relay`：

- combo 預計會在同一個提供商的多個帳戶之間輪換
- 失去短期對話連續性會影響任務品質
- 提供商暴露了足夠的配額資訊，可以預測即將到來的帳戶限制

這對於可能超過單一帳戶視窗的長時間編碼或研究會話最為有用。

## 執行時期流程

目前的行為有意分散在兩個執行時期層中。

### 已使用 0% 至 84% 的配額

不會產生交接。請求的行為就像一般的優先路由。

### 已使用 85% 至 94% 的配額

如果活躍提供商在 `handoffProviders` 中啟用，OmniRoute 會在帳戶完全耗盡之前在背景產生結構化的交接摘要。

重要細節：

- 預設警告閾值為 `0.85`
- 產生作業的硬性停止點為 `0.95`
- 每個 `sessionId + comboName` 只允許一個進行中的交接產生作業
- 如果該工作階段/combo 已有活躍的交接，則不會產生重複的摘要

### 已使用 95% 或更多的配額

不會產生新的交接。此時系統已處於或接近耗盡狀態，執行時期會避免排程另一個摘要請求。

### 帳戶輪換後

當同一個工作階段的下一個請求解析到不同的已認證帳戶時，OmniRoute 會將儲存的交接作為系統訊息預先加入。只有在實際帳戶切換已知後才會進行注入。

## 交接酬載

持久化的交接酬載儲存在 `context_handoffs` 中，包括：

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

摘要模型被指示回傳具有此結構的 JSON 物件：

```json
{
  "summary": "關於哪些內容對連續性重要的精簡摘要",
  "keyDecisions": ["決策 1", "決策 2"],
  "taskProgress": "已完成的事項、待辦事項以及下一步",
  "activeEntities": ["fileA.ts", "功能 X", "提供商 Y"]
}
```

在注入時，OmniRoute 會將該酬載轉換為 `<context_handoff>` 系統訊息，以便下一個帳戶能以正確的本地上下文繼續。

## 設定

`context-relay` 支援以下配置欄位：

- `handoffThreshold`：摘要產生的警告閾值，預設 `0.85`
- `handoffModel`：可選的模型覆寫，僅用於摘要產生
- `handoffProviders`：允許觸發交接產生的提供商允許清單

全域預設值可在設定中配置，combo 專用值可在 Combos 頁面中覆寫。

## 架構說明

目前的實作未使用獨立的 `handleContextRelayCombo` 處理器。

而是：

- `open-sse/services/combo.ts` 決定成功的回合是否應產生交接
- `src/sse/handlers/chat.ts` 僅在認證解析出請求使用的實際帳戶後才注入交接

這種分離在目前的程式碼庫中是有意的，因為 combo 迴圈本身無法知道請求是停留在同一個帳戶還是實際切換了帳戶。

## 限制

- 目前的執行時期支援主要集中在 `codex` 配額輪換上
- `handoffProviders` 已建模為配置表面，但實際的交接產生仍依賴於提供商特定的配額管線
- 摘要刻意保持精簡並基於近期歷史；它不是完整的對話記錄重播機制
- 交接以 `sessionId + comboName` 為範圍，並會自動過期
- 如果工作階段未切換帳戶，則不會注入儲存的交接

## 建議使用模式

- 使用同一個提供商的多個帳戶
- 在整個工作階段中保持穩定的 `sessionId` 值
- 儘早設定 `handoffThreshold`，為背景摘要請求預留空間
- 將此功能視為連續性輔助，而非持久化記憶體的替代方案
