# Subscription-first routing (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md)

---

> 兩個新的 `auto/*` id — `auto/subscription` 與 `auto/thrifty`。兩者皆採明確選用方式，只有在
> 被請求時才會啟用：除非呼叫端按名稱要求該 id，否則不會有任何請求透過它們路由，而且
> 既有的集區、策略或預設值都不會變更。

## 為何需要此功能

OmniRoute 已經能回答兩個成本問題，但兩者都不是大多數營運人員真正想問的問題。

| 既有機制                                                 | 回答的問題                         |
| -------------------------------------------------------- | ---------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | 「此模型是否被歸類為免費？」       |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | 「此連線是否可能向我收費？」       |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | 「此連線是否接近其上限？」         |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | 「限制支出，並降級至最便宜的選項」 |

所有僅限免費的機制都會**以封閉方式失敗**——耗盡的免費集區就是空集區，絕不會
升級至付費選項——而所有付費端機制都不區分層級。兩者都無法回答：

> 「使用我已經付費取得的配額。配額用完時，要麼停止，要麼逐級升級至最便宜的
> 付費選項——並在配額重設時立即恢復使用。」

## 計費是連線的屬性，而非模型的屬性

`classifyTier()` (`open-sse/services/tierResolver.ts`) 以 `(provider, model)` 為鍵，
並根據目錄定價傳回 `free | cheap | premium`。但某個請求是否會產生增量費用，
取決於**由哪個連線處理該請求**：同一個模型透過 Claude Code OAuth 連線使用時，
包含在方案內；透過 API 金鑰連線使用時，則按 token 計費。

`provider_connections.auth_type` 在任何方向上都不是可靠的替代判斷依據——確實存在
按量計費的 OAuth 連線，也存在包含於方案內的 API 金鑰連線（Copilot 席位 token
並不是按量計費的 API 金鑰）。因此，計費類別來自**人工維護的目錄**
`open-sse/config/connectionBillingCatalog.ts`，並根據各提供者公布的條款手動設定——
這與 `FreeModelBudget.hardStopGuaranteed` 已為免費模型建立的模式相同。

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

解析順序（`autoCombo/connectionBilling.ts`）：合成的免驗證哨兵值 →
`keyless`；同時符合提供者**及** `authType` 的目錄項目；提供者層級的項目；
否則為 `unknown`。**未經整理不代表免費**——`unknown` 在所有情況下都會被視為
`metered`，因此明天新增的提供者一開始會位於訂閱階級之外，且必須刻意加入目錄。

## 階級模型

依升級順序共有五個階級。它們的差異不只在於價格——每個階級都有其**自身的**
耗盡訊號，因此這不只是單純的排序。

| #   | 階級           | 成員資格                                     | 耗盡條件                 |
| --- | -------------- | -------------------------------------------- | ------------------------ |
| 0   | `subscription` | 經整理的 `billing: "subscription"`           | 配額視窗達到或低於臨界值 |
| 1   | `keyless`      | 合成的免驗證路徑                             | 連線冷卻／斷路器         |
| 2   | `free`         | 按量計費連線，`classifyTier() === "free"`    | 免費額度耗盡             |
| 3   | `cheap`        | 按量計費連線，`classifyTier() === "cheap"`   | 該階級預算用盡           |
| 4   | `premium`      | 按量計費連線，`classifyTier() === "premium"` | 該階級預算用盡           |

階級 0–2 因**配額**而耗盡；配額是可觀察的，且已受到追蹤。階級 3–4 沒有配額——
付費連線可以無限期提供服務——因此唯一合理的耗盡訊號就是各階級的**預算**。
若沒有預算，「在便宜階級耗盡時升級」便沒有任何觸發條件。

## `auto/subscription` — 失敗時封閉

候選池 = 僅限第 0 階，且只納入超額使用已明確記載為 `hard-stop`、並已逐一即時驗證仍有配額餘裕的連線。所有不明確的情況都會排除：未經整理的提供者、無法驗證的配額讀數、過期讀數，或超額使用會按量計費的情況。

空候選池是**預期**結果，而非缺陷——呼叫端既有的空候選池處理路徑會將其轉換為明確錯誤，而不是悄無聲息地退回可能產生費用的選項。這就是此 id 的完整承諾。

`keyless` 刻意**不**符合資格：此分組代表「我付費訂閱的方案」，因此無需驗證的後端不屬於此分組。這種情況請使用 `auto/thrifty`（或 `auto/best-free`）。

### 連線安全性

候選項不一定只繫結至單一連線——一個邏輯候選項會攜帶 `allowedConnectionIds` 允許清單，而實際使用的帳戶會在稍後分派時，由 `open-sse/services/combo/autoStrategy.ts` 選定。因此，這兩個分組都會**個別驗證每條連線**，並將 `allowedConnectionIds` 改寫為恰好只包含通過驗證的子集——絕不使用完整的原始清單，也不會任意選擇其中一個成員。由於 `autoStrategy.ts` 已將該陣列強制實施為硬性允許清單，在此改寫即可從結構上確保「已驗證」與「實際使用」是同一個集合。這與 [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) 採用相同的不變條件與推理。

## `auto/thrifty` — 一次升級一階

候選池 = 所有階級，依階級索引排序，並排除已耗盡的候選項。`auto` 引擎仍會在存活的候選池**內部**評分：階梯決定哪些階級可參與，評分則決定其中哪個候選項勝出。同一階級內的順序保持穩定，因此評分器自身的排序絕不會被此疊加層重新排列。

這是一個排序 + 閘控疊加層，**不是**新的分派器：`combo.ts` 的推測式迴圈已經會依序走訪目標，並在失敗時繼續嘗試下一個，因此，即使執行階段發生預檢未能捕捉的耗盡情況，仍會在同一個請求內升級至下一階。

`auto/subscription` 採取失敗時**封閉**，而 `auto/thrifty` 則採取失敗時**開放**：即使方案內含的連線沒有可用的配額讀數，仍會優先嘗試。嘗試它不會產生費用，而若它其實已經耗盡，失敗後無論如何都會繼續嘗試下一階——相反地，若因遙測資料缺失而拒絕嘗試，就會把請求送至付費階級，這正是此分組存在所要避免的結果。

## 重設後返回方案

路由返回第 0 階之前，必須有三個彼此獨立的項目到期。若只修正其中一項，方案補充配額後，階梯仍會長時間卡在付費階級。

1. **配額狀態快取**——`freeAccessQuota.ts` 會以 `(provider, connection)` 為單位進行快取，TTL 為 180 秒。若快取項目自身的 `resetAt` 已經過期，它所描述的視窗便已不復存在，因此現在會**不論項目存續時間**都將其視為過期，並強制重新整理。否則，在午夜補充配額的方案仍會持續顯示為已耗盡，直到 TTL 恰好到期。
2. **階梯自身的狀態**——依設計並不存在。每次建構候選池時，都會根據即時配額狀態重新計算階級資格；不存在任何持久化的「目前位於第 3 階」記錄，因而不會發生該記錄持續存在超過重設時間並卡死路由的情況。
3. **連線冷卻時間**——導致耗盡的 429 會根據指數退避設定 `rateLimitedUntil`，而對方案連線而言，這可能超過實際重設時間。`clampCooldownToReset()`（`subscriptionLadder.ts`）會將冷卻時間縮短至上游自身的重設時刻，且絕不會延長冷卻時間。**它已實作並經過測試，但尚未接線啟用**：配額快取會在寫入任何冷卻時間_之前_於 `src/sse/services/auth.ts` 中失效，因此必須更早在該函式中擷取 `resetAt`——這項對韌性關鍵路徑的變更應放在自身獨立且經審查的 PR 中。在此之前，重新加入必須等待連線冷卻時間結束（當提供者送出上游 `Retry-After` 提示時，現有機制已會優先採用該提示）。

### 防抖動

剛完成重設的階級，只有在高於 `reentryMinRemainingPercent`（預設為 5）時才會重新納入；而已在使用中的連線只需維持在 `exitCutoffPercent`（預設為 2，與 `quotaPreflight.defaultThresholdPercent` 相符）以上即可。兩者之間的差距就是遲滯區間——若沒有此區間，剩餘配額徘徊在截止值附近的連線會在連續請求之間反覆切換階級。

## 設定

僅供調校。此處刻意**沒有** `enabled` 旗標：能夠關閉這些功能的切換開關，會讓 `auto/subscription` 悄悄提供完整集區——包括付費模型——卻使用一個承諾恰好相反行為的名稱。

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 會直接停用某個梯級
  },
}
```

在接上支出解析器之前，預算閘控不會生效：若沒有可用的計費資料，付費梯級仍會排序，但絕不會受到閘控。截至 v3.8.51，結構描述會接受 `rungBudgetUsd` 設定，但尚未實際強制執行——請將其視為保留設定，而非有效的支出上限。即使沒有此設定，梯級排序、依配額判定耗盡，以及重設後重新加入都能正常運作。

## 組合

`subscription` 與 `thrifty` 都是 `AutoTier` 值，因此可與每個類別組合：`auto/coding:thrifty`、`auto/reasoning:subscription`，依此類推。兩個扁平 ID（`auto/subscription`、`auto/thrifty`）會顯示在 `/v1/models` 與儀表板中。

這兩個 ID 都不屬於付費層級，因此 `isPaidTierAutoId()` 對兩者都會傳回 `false`，而且 `auto/subscription` 不會被 `hidePaidModels` 隱藏。

## 程式碼位置

| 關注事項                     | 檔案                                                |
| ---------------------------- | --------------------------------------------------- |
| 精選的計費資料               | `open-sse/config/connectionBillingCatalog.ts`       |
| 分類器                       | `open-sse/services/autoCombo/connectionBilling.ts`  |
| 梯級、兩種分組方式、重新加入 | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| 接入候選集區                 | `open-sse/services/autoCombo/virtualFactory.ts`     |
| 感知重設的快取過期機制       | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| 層級介面                     | `open-sse/services/autoCombo/suffixComposition.ts`  |
| 公告的 ID                    | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| 測試                         | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
