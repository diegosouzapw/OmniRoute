# Cost & Spend Tracking (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md)

---

OmniRoute 如何估算、記錄及回報每個請求的成本——以及為什麼儀表板上的數字是**節省追蹤器**，而不是帳單。

另請參閱：[使用者指南](./USER_GUIDE.md) · [功能展示](./FEATURES.md)

---

## 它是什麼（以及不是什麼）

OmniRoute 會將權杖數量乘以模型的定價費率，為每個補全請求計算以美元計價的單次請求成本。這些數字會用於**成本**儀表板、`omniroute cost` / `omniroute usage` CLI、CSV/JSON 匯出，以及各 API 金鑰的預算。

> **儀表板上的「成本」是節省追蹤器，而不是帳單。** OmniRoute 絕不會向你收費
> ——它會將你的請求路由至你已連接的提供者（你自己的訂閱、免費方案及 API
> 金鑰）。如果「總成本 $290」完全來自免費模型，這表示你大約**省下了原本可能要支付給付費 API 的 $290**。此數字是以標準牌價估算相同流量原本可能產生的費用，讓你能查看用量集中在哪裡，以及透過路由至較便宜／免費的提供者節省了多少費用。

此定位已直接載明於專案的 [README](../../README.md)（「儀表板上的『成本』是節省追蹤器，而不是帳單」）。

由於此數字是估算值：

- 它取決於 OmniRoute 為每個模型提供的定價表。沒有定價項目的模型會產生 `0` 成本（在瀏覽器中顯示為「舊版／免費」資料列）。
- 免費方案及訂閱流量仍會累計_估算_成本——這是你節省的金額，而不是應付金額。

---

## 成本如何估算

### 定價來源

成本來自按以下優先順序解析的定價表
（[`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)）：

1. **使用者覆寫值**——你在儀表板中或透過 `PATCH /api/pricing` 設定的價格。
2. **同步的外部定價**——啟用同步時，從 LiteLLM 的公開
   `model_prices_and_context_window.json` 擷取（儲存在獨立的
   `pricing_synced` 命名空間中，因此絕不會覆蓋你的覆寫值）。
3. **硬編碼預設值**——隨 OmniRoute 一併提供。

外部定價同步是**選用功能**，預設為停用。相關環境變數
（請參閱 [`.env.example`](../../.env.example)）：

| 環境變數                | 預設值    | 用途                                           |
| ----------------------- | --------- | ---------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | 啟用啟動時的背景 LiteLLM 定價同步。            |
| `PRICING_SYNC_INTERVAL` | `86400`   | 同步間隔，以**秒**為單位（預設為每日）。       |
| `PRICING_SYNC_SOURCES`  | `litellm` | 以逗號分隔的來源清單（目前僅支援 `litellm`）。 |

### 成本公式

成本會根據權杖數量及每百萬權杖費率，按請求個別計算。相關程式碼位於
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
（`computeCostFromPricing` / `calculateCost`）：

- **輸入權杖**（扣除快取讀取及快取建立權杖）× `input` 費率。
- **快取讀取權杖** × `cached` 費率（若無則回退使用輸入費率）。
- **快取建立權杖** × `cache_creation` 費率（若無則回退使用輸入費率）。
- **輸出權杖** × `output` 費率。
- **推理權杖** × `reasoning` 費率（若無則回退使用輸出費率）。

所有費率均解讀為每 1,000,000 個權杖的美元價格。Codex 的「fast」／「priority」或「flex」服務層級會套用成本乘數（`getCodexFastCostMultiplier`）——例如 flex 會以權杖費用五折計費，並在儀表板中顯示為 **flex 節省金額**。

模型名稱會先經過正規化（移除 `openai/` 或
`accounts/fireworks/models/` 等提供者路徑前綴），讓歷史資料列仍能與價格相符。

### 支出如何記錄

- 每個請求的成本會在回應後計算，並以「送出後不等待」的方式記錄，因此絕不會增加用戶端延遲。共享配額的消耗會透過 [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts)，排程至下一個事件迴圈刻度執行。
- API 金鑰支出會先緩衝，再由
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) 批次寫入（預設清理間隔為 60 秒，緩衝區容量為 1,000 筆）。可透過以下變數調整：

  | 環境變數                            | 預設值  | 用途                       |
  | ----------------------------------- | ------- | -------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | 清理間隔，以毫秒為單位。   |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | 清理前可緩衝的項目數上限。 |

儀表板上的成本數字**並非**讀取每筆資料列中儲存的美元金額——每次分析端點執行時，都會根據權杖數量及目前的定價表即時計算。這表示修正錯誤價格（並重新同步）後，歷史成本估算也會隨之回溯更新。

---

## 儀表板：成本頁面

**成本**頁面位於 `/dashboard/costs`
（`src/app/(dashboard)/dashboard/costs/`）。
其主要檢視為**成本概覽**分頁
（`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`），
此分頁會從 `GET /api/usage/analytics` 載入所有資料。

顯示內容：

- **支出資訊方塊** — _今日（1d）_、_7d_、_30d_ 及所選時間範圍的預估支出。
  範圍選擇器：`7d`、`30d`、`90d`、`all`。
- **主要指標** — 時間範圍內的請求數、作用中的提供者、作用中的模型，以及每次請求的
  平均成本。
- **成本探索器** — 可排序及篩選的表格，依**提供者**、**模型**、
  **API 金鑰**、**帳戶**或**服務層級**分組，並顯示成本、請求數、權杖數、每次請求的
  平均成本，以及佔總額的百分比。
- **權杖用量** — 權杖總數／輸入／輸出，以及輸入與輸出比例。
- **路由效率** — 後援次數、後援率，以及所請求模型的涵蓋率。
- **每月預測** — 根據近期每日平均值預測月底支出。
- **期間比較** — 時間範圍前半段與後半段之間的百分比變化。
- **圖表** — 每日成本趨勢、提供者佔比（圓餅圖）、主要提供者、主要模型、各 API 金鑰的成本、
  各帳戶的成本、每週用量模式，以及活動熱度圖。
- **匯出** — 將目前時間範圍下載為 **CSV** 或 **JSON**（當成本資料非零時，
  按鈕才會出現）。

沒有已計價流量時，各列會顯示「舊版／免費」標籤，而不是 `$0`，
以反映節省追蹤器模型。

### 相關的成本子頁面

成本區域也包含下列頁面（皆位於 `/dashboard/costs/` 下）：

- **定價**（`/dashboard/costs/pricing`）— 檢視及覆寫每個模型的價格（呈現
  共用的定價分頁）。
- **預算**（`/dashboard/costs/budget`）— 設定各範圍的支出上限（呈現共用的
  預算分頁）。
- **配額共享**（`/dashboard/costs/quota-share`）— 共用配額集區及消耗率
  檢視。

---

## API 端點

除非另有註明，以下所有端點皆需要管理驗證（loopback/JWT，透過 `requireManagementAuth`）。

### 用量與成本分析

| 方法  | 端點                     | 用途                                                                                                                                                      |
| ----- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET` | `/api/usage/analytics`   | 完整的成本／用量分析：摘要、每日趨勢，以及依提供者／模型／API 金鑰／帳戶／層級分類的資料。查詢：`range`、`startDate`、`endDate`、`apiKeyIds`、`presets`。 |
| `GET` | `/api/usage/utilization` | 各提供者隨時間變化的配額使用率。查詢：`range`（`1h`/`24h`/`7d`/`30d`）、`provider`。                                                                      |
| `GET` | `/api/usage/history`     | 原始用量歷史記錄。                                                                                                                                        |
| `GET` | `/api/usage/call-logs`   | 各請求的呼叫記錄（模型、權杖、成本、延遲、狀態）。                                                                                                        |
| `GET` | `/api/usage/quota`       | 提供者配額狀態。                                                                                                                                          |
| `GET` | `/api/usage/proxy-logs`  | Proxy 請求記錄。                                                                                                                                          |

### 預算

| 方法   | 端點                     | 用途                                                            |
| ------ | ------------------------ | --------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | 單一 API 金鑰的成本摘要與預算檢查（需要 `apiKeyId` 查詢參數）。 |
| `POST` | `/api/usage/budget`      | 設定 API 金鑰的每日／每週／每月美元上限及警告閾值。             |
| `GET`  | `/api/usage/budget/bulk` | 跨 API 金鑰的批次預算摘要。                                     |

> 預算 API 的範圍是各個 **API 金鑰**（`apiKeyId`）。由
> `GET /api/usage/budget` 傳回的上限包括 `dailyLimitUsd`、`weeklyLimitUsd`、`monthlyLimitUsd`、
> `warningThreshold`，以及累計總額（`totalCostToday`、`totalCostMonth` 等）。

### 定價

| 方法     | 端點                    | 用途                                                                                      |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | 目前合併後的定價（使用者 + 已同步 + 預設值）。使用 `?includeSources=1` 查看各項目的來源。 |
| `PATCH`  | `/api/pricing`          | 覆寫 `{ provider: { model: { input, output, cached, … } } }` 的定價。                     |
| `DELETE` | `/api/pricing`          | 將定價重設為預設值（可選擇透過 `?provider=&model=` 限定範圍）。                           |
| `GET`    | `/api/pricing/defaults` | 顯示每 1M 的預設後援費率。                                                                |
| `GET`    | `/api/pricing/models`   | 以模型為索引的定價。                                                                      |
| `POST`   | `/api/pricing/sync`     | 觸發從外部來源（LiteLLM）進行手動同步。                                                   |
| `GET`    | `/api/pricing/sync`     | 目前的同步狀態。                                                                          |
| `DELETE` | `/api/pricing/sync`     | 清除所有已同步的定價資料。                                                                |

### 其他與成本相關的端點

| 方法  | 端點                          | 用途                                               |
| ----- | ----------------------------- | -------------------------------------------------- |
| `GET` | `/api/free-tier/summary`      | 免費模型的權杖總量、本月已用量，以及剩餘免費額度。 |
| `GET` | `/api/quota/pools/[id]/usage` | 共用配額集區的使用量。                             |

---

## CLI

OmniRoute 的 CLI 提供成本、用量與定價命令（註冊於
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)）。

### `omniroute cost`

彙總自 `/api/usage/analytics` 的成本報告。

```bash
omniroute cost                          # 最近 30 天，依提供者分組
omniroute cost --period 7d              # 最近 7 天
omniroute cost --group-by model         # 依 provider | model | combo | api-key | day 分組
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

欄位：群組、請求數、輸入／輸出 token 數、成本（USD），以及占總計的百分比。最後會印出總計列
（使用 `--quiet` 或 `--output json` 時不顯示）。

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # 各提供者的成本摘要
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# 預算
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` 會讀取 `GET /api/pricing/defaults`。若要改為編輯個別模型的
> 價格，請使用儀表板的 **定價** 頁面或 `PATCH /api/pricing`。

---

## 疑難排解

- **所有成本都顯示為 $0／「舊版／免費」。** 使用中的模型沒有定價項目。
  啟用外部同步（`PRICING_SYNC_ENABLED=true`）並執行 `omniroute pricing sync`，或
  透過定價頁面／`PATCH /api/pricing` 手動設定價格。
- **歷史模型的定價不正確。** 修正價格（覆寫或重新同步）——每次讀取分析資料時，
  都會根據 token 數重新計算成本，因此估算值會溯及更新。
- **支出資料落後於即時狀況。** 各金鑰的支出會批次處理；如果需要更新的數字，請調低
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`。

---

如需瞭解此功能在整體儀表板中的位置，請參閱[使用者指南](./USER_GUIDE.md)與
[功能展示](./FEATURES.md)。
