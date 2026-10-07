# Quota Sharing Engine (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md)

---

> **文件參考**：`docs/routing/QUOTA_SHARE.md`
> 屬於 B 組（計畫 16 + 22）。

---

## 概述

配額共享引擎會將提供者以時間為基礎的配額（例如 Codex 的
5 小時視窗、Kimi 的 1500 req/h）公平分配給共用相同連線的多個 API 金鑰。

**其解決的問題：** OmniRoute 會透過同一個上游提供者帳戶代理許多 API 金鑰。
若沒有共享邏輯，金鑰 A 突然產生的大量請求可能會耗盡該小時的提供者配額，
導致金鑰 B 和 C 在視窗重設之前都遭到封鎖。引擎透過以下方式避免此問題：

1. 追蹤每個金鑰在各維度（%、請求、權杖、$）的滾動用量。
2. 套用工作守恆的公平份額演算法：只要全域集區尚未飽和，金鑰即可借用閒置份額。
3. 在請求抵達上游執行器之前，於熱路徑（`chatCore.ts`）中強制執行結果。

---

## 演算法：工作守恆公平份額

實作於 `src/lib/quota/fairShare.ts`。

### 模式

| 條件                                       | 模式     | 行為                                   |
| ------------------------------------------ | -------- | -------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **寬鬆** | 金鑰最多可借用至全域限制減去已消耗總量 |
| `globalUsedPercent >= saturationThreshold` | **嚴格** | 嚴格執行個別公平份額                   |

預設 `saturationThreshold = 0.5`（環境變數 `QUOTA_SATURATION_THRESHOLD`）。

### 各維度的判定

針對集區中的每個作用中維度，引擎會計算：

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

接著：

- **`policy = hard`**：若 `consumed > fairShareAllowed` 且模式為嚴格 → **封鎖**。
- **`policy = soft`**：若 `consumed > fairShareAllowed` 且模式為嚴格 → **懲罰**（降低其在組合中的優先順序；絕不硬性封鎖）。
- **`policy = burst`**：只要仍有全域餘裕，無論公平份額為何皆允許。

### 絕對上限

配置中的 `capValue` + `capUnit` 是獨立於模式或原則的硬性上限。
任何維度只要 `consumed >= capValue`，都一律會**封鎖**請求。

### 多維度檢查

如果集區中的**任何**維度會封鎖請求，該請求就會被封鎖。各維度彼此獨立——
5h% 耗盡並不會影響 weekly% 維度。

### 借用

在寬鬆模式下，配置尚未完全使用的金鑰可以使用其他金鑰未配置份額中的剩餘量。
公式如下：

```
maxAllowed = globalLimit - consumedByOtherKeys
```

其中 `consumedByOtherKeys = consumedTotal - consumedByThisKey`。全域上限
（該維度的集區 `limit`）始終是硬性上限。

---

## 滑動視窗計數器

實作於 `src/lib/quota/sqliteQuotaStore.ts` 和 `redisQuotaStore.ts`。

每個 `(apiKeyId, dimensionKey)` 有兩個分桶：

- `curr`：目前分桶（`floor(nowMs / windowMs)`）
- `prev`：前一個分桶（`curr - 1`）

有效滾動值：

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**精確度**：準確度約為 99%。在分桶邊界處，誤差最多為視窗大小的 1%
（這是雙分桶近似法的固有限制）。

### 並行處理

SQLite 驅動程式：針對每個 `(apiKeyId | dimensionKey)` 金鑰使用記憶體內互斥鎖，
以避免讀取－修改－寫入競爭。此模式仿照 `src/sse/services/auth.ts` 的防驚群機制。

Redis 驅動程式：使用 Lua EVAL 指令碼進行不可分割的遞增操作——以單一 Redis 命令執行。

---

## 驅動程式

### SQLite（預設、免安裝）

- 資料表：`quota_consumption`（請參閱遷移檔案 `073_quota_pools.sql` / `074_quota_consumption.sql`）。
- 最適合單一執行個體部署。
- 所有持久化資料皆儲存在現有的 OmniRoute SQLite DB（`DATA_DIR/storage.sqlite`）中。

### Redis（選用、多執行個體）

- 需要 `ioredis` npm 套件。
- 計數器儲存在 Redis 中；中繼資料（資源池／配額分配）仍儲存在 SQLite 中。
- 最適合需要共用計數器的多副本部署。

### 切換驅動程式

透過設定 UI（`/dashboard/settings` → 配額儲存區），或透過環境變數：

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB 設定的優先順序高於環境變數。若 `driver=redis` 但未提供 URL，或未安裝
`ioredis`，工廠會回退至 SQLite 並記錄警告。

驅動程式選擇順序：

1. DB 設定 `quotaStore.driver`
2. 環境變數 `QUOTA_STORE_DRIVER`
3. 預設：`sqlite`

---

## 多維度

資源池可以有多個維度。每個維度皆彼此獨立：

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // 此維度的全域資源池上限
}
```

**範例：Codex 方案**（5h% + weekly%）：

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

請求必須滿足所有維度才會獲准。

---

## 方案解析器

實作於 `src/lib/quota/planResolver.ts`。

優先順序（由高至低）：

1. **手動 DB 覆寫** — `provider_plans` 資料表，依各個 `connectionId` 設定。
2. **已知目錄** — `src/lib/quota/planRegistry.ts`（僅資料）。
3. **空白方案** — 無維度，需要手動設定。

### 已知目錄

| 提供者                | 維度                                                          |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h`（limit=0，未知）、`tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | 無預設值 — 需要手動設定                                       |

---

## 管線整合

### PRE 鉤子（`open-sse/handlers/chatCore.ts`）

在身分驗證與原則檢查之後、上游執行器之前執行：

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → 對每個維度呼叫 getQuotaStore().peek()
      → fairShare.decideFairShare()
      → 若封鎖 → 傳回 429（buildErrorBody，硬性規則 #12）
      → 若允許 + 降低優先順序 → 在候選項目上設定 quotaSoftPenalty=true
  → executor.execute()
```

**失敗時開放**：若 `enforceQuotaShare` 擲回錯誤，請求仍會獲准通過，
並產生一筆 `pino.warn` 記錄。這可防止配額引擎錯誤封鎖所有
流量。

### POST 鉤子（記錄用量）

成功回應後：

```
executor 傳回成功
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → 對每個維度呼叫 getQuotaStore().consume()
      → 失敗時開放：錯誤記錄為 pino.warn，絕不傳播至用戶端
```

**漂移說明**：若 `consume` 在回應後失敗，滾動計數器會少計用量。
來自提供者的飽和度訊號（例如 `anthropic-ratelimit-unified-5h-utilization`）
會在下一個請求中修正全域估算值。

### 組合模式軟性懲罰（`open-sse/services/combo.ts`）

當 `decision.deprioritize === true` 時：

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // 預設為 0.7
}
```

此懲罰會在所有其他評分因子之後套用。它會降低自動組合模式選擇已飽和金鑰的
機率，但不會將其硬性封鎖。

---

## UI 操作導覽

### `/dashboard/costs/quota-share` — 主要集區頁面

元件（皆位於 `src/app/(dashboard)/dashboard/costs/quota-share/`）：

| 元件                   | 用途                                                     |
| ---------------------- | -------------------------------------------------------- |
| `QuotaConceptCard`     | 向新使用者說明配額共享的介紹卡片                         |
| `CreatePoolModal`      | 建立新的配額集區（連線 + 名稱 + 初始分配）               |
| `PoolCard`             | 各集區摘要：名稱、連線、分配數量                         |
| `DimensionBar`         | 各維度的堆疊長條圖：每個鍵的占比 + 全域使用量            |
| `AllocationTable`      | 顯示已消耗量、公平配額、短缺／剩餘及借用旗標的表格       |
| `BurnRateChart`        | EMA 消耗速率折線圖（透過 `dynamic()` 延遲載入 Recharts） |
| `EditAllocationsModal` | 編輯集區的分配權重、上限及政策                           |

頁面 hooks：

- `usePools` — 每 30 秒擷取 `GET /api/quota/pools`。
- `usePoolUsage` — 視需要擷取 `GET /api/quota/pools/[id]/usage`。
- `useLocalStoragePoolMigration` — 掛載時執行一次，以遷移舊版 LS 資料。

### `/dashboard/costs/quota-share/plans` — 提供者方案設定

- `ProviderPlanConfigClient.tsx`：用於選取提供者、檢視解析後方案（從目錄自動取得或手動覆寫）及編輯維度的下拉式選單。
- 變更會寫入 `PUT /api/quota/plans/[connectionId]`。
- 刪除後會還原為目錄方案或空白方案。

---

## 環境變數

| 變數                               | 預設值     | 說明                                             |
| ---------------------------------- | ---------- | ------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | 要使用的驅動程式：`sqlite` 或 `redis`            |
| `QUOTA_STORE_REDIS_URL`            | _（空白）_ | Redis URL，例如 `redis://localhost:6379`         |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1；`>= threshold` 時啟用嚴格模式              |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1；軟性政策組合分數的乘數                     |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | GC 移除舊 `quota_consumption` 儲存桶前的保留天數 |

DB 設定（`quotaStore.*`）會覆寫環境變數。

---

## 疑難排解

### 已設定 Redis 但無法連線

請確認已安裝 `ioredis`（`npm ls ioredis`），且可連線至 `QUOTA_STORE_REDIS_URL`。連線失敗時，factory 會退回使用 SQLite（以 `warn` 層級記錄）。

### `peek` 傳回過時資料／開放式失敗

如果 `peek` 擲回錯誤，`enforceQuotaShare` 會將結果視為「允許」（開放式失敗）。請檢查 `pino` 日誌中的 `quota:enforce` 與 `quota:factory` 項目，以找出根本原因。

### 消耗計數器偏移

如果實際提供者使用量與計數器不同，這屬於預期情況——雙儲存桶滑動視窗在視窗邊界約有 1% 的誤差，而且 `consume` 是在回應後以即發即棄方式執行。飽和度訊號（`saturationSignals.ts`）會以 30 秒 TTL 讀取真實的提供者使用率，並據此調整 `globalUsedPercent`。

### 集區的消耗速率顯示「無資料」

`computeBurnRate` 至少需要 2 個歷史樣本。先前沒有 `consume` 呼叫的新集區將顯示 `tokensPerSecond: 0` 和 `timeToExhaustionMs: null`。

---

## 從 localStorage 遷移

當 `/dashboard/costs/quota-share` 首次載入時，hook `useLocalStoragePoolMigration`
會檢查：

1. `localStorage.getItem("omniroute:quota-share:pools")` 不為空。
2. `GET /api/quota/pools` 傳回 `[]`（DB 為空）。

若兩者皆為真，則會將每個舊版資源池批次發送至 `POST /api/quota/pools`，
然後移除 localStorage 金鑰。此遷移具備冪等性：條件 2 可防止
重複遷移。

---

## 內部策略分類

`quota-share` 是一種**僅限內部使用**的路由策略（位於
`src/shared/constants/routingStrategies.ts` 中的 `INTERNAL_ROUTING_STRATEGY_VALUES`）。
它僅供系統建立的 `qtSd/` 資源池組合使用，並刻意從 `ROUTING_STRATEGY_VALUES` 中排除，
因此絕不會在 UI 或 API 中顯示為使用者可選取的選項。

---

## 測試涵蓋範圍

配額共享引擎隨附兩層自動化測試：

| 測試套件              | 命令                                                                   | 涵蓋內容                                                                                                                                                         |
| :-------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 單元測試（29 項測試） | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR 排程器、飽和度閘控、並行數上限、fairShare 計算、待處理工作排入佇列                                                                                           |
| 整合矩陣              | `npm run test:combo:matrix`                                            | 透過實際組合管線進行端對端路由決策；透過即時接縫（`registerQuotaFetcher`、`setLKGP`、`__setHeadroomSaturationFetcherForTests`）驗證 DRR 公平性與飽和度降優先處理 |

整合矩陣會在 CI 中與全部 19 種公開策略一併執行。單元測試套件
亦可獨立執行。

---

## DB 結構摘要

由遷移 `078`、`079` 與 `085` 新增三個資料表：

- `quota_pools` + `quota_allocations` — 資源池定義與各金鑰的配額分配。
- `quota_consumption` — 每個 `(apiKeyId, dimensionKey)` 的滾動式雙儲存區計數器。
- `provider_plans` — 手動提供者方案覆寫（每個 connectionId 的維度 JSON）。

所有資料表皆透過具冪等性的 `CREATE TABLE IF NOT EXISTS` 遷移新增。
