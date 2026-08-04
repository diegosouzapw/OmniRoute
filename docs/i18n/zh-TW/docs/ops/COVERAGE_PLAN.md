---
title: "測試覆蓋率計畫"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 測試覆蓋率計畫

最後更新：2026-06-28

> 狀態測量於 2026-05-13：行 82.58%、陳述式 82.58%、函式 84.23%、條件分支 75.22%。第 1–5 階段已完成。當前重點為第 6 階段（>=85%）與第 7 階段（>=90%）。

## 基準

根據報告計算方式的不同，會有多組覆蓋率數字。在規劃上，只有其中一組具有參考價值。

| 指標                   | 範圍                                                  | 陳述式／行 | 條件分支 | 函式      | 備註                                              |
| ---------------------- | ----------------------------------------------------- | ---------: | -------: | --------: | ------------------------------------------------- |
| 舊版                   | 舊有 `npm run test:coverage`                          |     79.42% |   75.15% |    67.94% | 失真：計入了測試檔且排除 `open-sse`                |
| 診斷用                 | 僅原始碼，排除測試檔且排除 `open-sse`                 |     68.16% |   63.55% |    64.06% | 僅用於隔離 `src/**` 分析                          |
| 建議基準               | 僅原始碼，排除測試檔且納入 `open-sse`                 |     82.58% |   75.22% |    84.23% | 這是應改善的專案級基準                             |

建議基準是應優化的目標數字。

## 規則

- 覆蓋率目標適用於原始碼，不包含 `tests/**`。
- `open-sse/**` 屬於產品的一部分，必須納入範圍。
- 新程式碼不應降低受影響區域的覆蓋率。
- 優先測試行為與條件分支結果，而非實作細節。
- 對於 `src/lib/db/**`，優先使用暫存 SQLite 資料庫與小型測試資料，而非廣泛的 Mock。

## 當前指令集

- `npm run test:coverage`
  - 單元測試套件的主要原始碼覆蓋率閘門
  - 產生 `text-summary`、`html`、`json-summary` 與 `lcov`
- `npm run coverage:report`
  - 來自最近一次執行的逐檔詳細報告
- `npm run test:coverage:legacy`
  - 僅供歷史比較

## 里程碑

| 階段     |                  目標 | 重點                                             | 狀態          |
| -------- | -------------------: | ------------------------------------------------ | ------------- |
| 第 1 階段 | 60% 陳述式／行       | 快速取勝與低風險通用工具覆蓋率                    | ✅ 已完成     |
| 第 2 階段 | 65% 陳述式／行       | 資料庫與路由基礎                                  | ✅ 已完成     |
| 第 3 階段 | 70% 陳述式／行       | Provider 驗證與使用分析                           | ✅ 已完成     |
| 第 4 階段 | 75% 陳述式／行       | `open-sse` 轉換器與輔助工具                       | ✅ 已完成     |
| 第 5 階段 | 80% 陳述式／行       | `open-sse` 處理器與執行器分支                     | ✅ 已完成     |
| 第 6 階段 | 85% 陳述式／行       | 較難的邊界案例、分支負債、回歸測試套件            | 進行中        |
| 第 7 階段 | 90% 陳述式／行       | 最終掃蕩、缺口補齊、嚴格棘輪機制                  | 待處理        |

條件分支與函式應隨各階段逐步提升，但主要硬目標仍為陳述式／行。

## 優先熱點

這些檔案目前行覆蓋率最低（< 60%），在第 6–7 階段中能帶來最佳改善效益。資料來源為 `coverage/coverage-summary.json`（2026-05-13）：

| #   | 檔案                                                          | 行覆蓋率 % |
| --- | ------------------------------------------------------------- | --------: |
| 1   | `open-sse/services/compression/validation.ts`                 |     7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                             |     9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                  |     9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`       |    10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                   |    10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`     |    10.96% |
| 7   | `open-sse/services/specificityRules.ts`                       |    11.28% |
| 8   | `src/mitm/systemCommands.ts`                                  |    12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                 |    12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                 |    12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`           |    13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts`  |    13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`   |    13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                          |    13.52% |
| 15  | `open-sse/services/compression/lite.ts`                       |    14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                              |    14.94% |
| 17  | `open-sse/services/compression/preservation.ts`               |    15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                          |    15.54% |
| 19  | `open-sse/services/tierResolver.ts`                           |    16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                 |    16.66% |

第 6–7 階段的主題：

- `open-sse/services/compression/**` 是低覆蓋率最密集的區塊，主導了剩餘差距。
- 批次與重排序 API 路由（`src/app/api/v1/batches/**`、`src/app/api/v1/rerank/route.ts`）需要處理器層級的測試。
- Cloud Agent 轉接器（`src/lib/cloudAgent/agents/jules.ts`、`codex.ts`）與 `tierResolver.ts` 需要情境測試。
- Docs UI 元件與 `src/mitm/systemCommands.ts` 優先級較低，但屬於低成本的分支改善機會。

## 執行檢查清單

### 第 1 階段：56.95% -> 60%

- [x] 修正覆蓋率指標，使其反映原始碼而非測試檔
- [x] 保留舊版覆蓋率腳本以供比較
- [x] 在儲存庫中記錄基準與熱點
- [ ] 為低風險通用工具新增聚焦測試：
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] 為以下路由新增測試：
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### 第 2 階段：60% -> 65%

- [ ] 新增資料庫驅動測試：
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] 涵蓋以下項目的條件分支行為：
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### 第 3 階段：65% -> 70%

- [ ] 新增使用分析測試：
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] 擴充 Proxy 管理與設定分支的路由覆蓋率

### 第 4 階段：70% -> 75%

- [ ] 涵蓋轉換器輔助工具與中央翻譯路徑：
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### 第 5 階段：75% -> 80%

- [ ] 新增處理器層級測試：
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] 針對 Provider 特定的驗證、重試與端點覆寫，新增執行器分支覆蓋率

### 第 6 階段：80% -> 85%

- [ ] 將更多邊界案例測試套件納入主要覆蓋率路徑
- [ ] 提升建構子／輔助工具覆蓋率薄弱的資料庫模組的函式覆蓋率
- [ ] 補齊 `settings.ts`、`registeredKeys.ts`、`validation.ts` 與轉換器輔助工具中的條件分支缺口

### 第 7 階段：85% -> 90%

- [ ] 將剩餘低覆蓋率檔案視為阻擋事項
- [ ] 為在推進至 90% 過程中所修正的每一個未覆蓋的正式環境錯誤，新增回歸測試
- [ ] 僅在本地基準連續兩次執行穩定後，才在 CI 中調高覆蓋率閘門

## 棘輪機制

僅在專案實際以充裕緩衝超越下一里程碑後，才更新 `npm run test:coverage` 的閾值。

**當前閘門：**`npm run test:coverage` 強制執行 **60 陳述式 / 60 行 / 60 函式 / 60 條件分支**（該指標已在 Quality-Gates 第 6A.1 階段重新基準化——先前的 82.58% 基準因計入測試檔且排除 `open-sse` 而有失真）。`test:coverage:legacy` 指令保留舊有的 50/50/50 指標以供歷史比較。

如需針對最新報告進行臨時閾值檢查，請使用：

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

建議的棘輪序列（順序為 `陳述式-行 / 條件分支 / 函式`）：

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- 當前閘門（75/70/75）
6. 80/75/78
7. 85/80/84
8. 90/85/88

下一個棘輪目標為 `80/75/78`，當條件分支覆蓋率連續兩次執行維持在 78% 以上時即生效。

## 已知缺口

目前的覆蓋率指令測量的是主要的 Node 單元測試套件，並包含從中可達的原始碼（包括 `open-sse`）。它尚未將 Vitest 覆蓋率合併為單一統一報告。這項合併工作值得日後進行，但不會阻礙從 60% 邁向 80% 的爬升。
