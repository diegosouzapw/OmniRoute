# Evaluations (Evals) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md)

---

> **事實來源：** `src/lib/evals/`、`src/lib/db/evals.ts`、`src/app/api/evals/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 隨附一套通用評估框架，可用於對路由設定、單一提供者/模型，或內建的「黃金集」套件進行基準測試。
使用此框架可驗證路由變更、檢驗新的提供者，並在將版本推送至正式環境流量前設定發布門檻。

此框架的實作包含：

- 純執行器（`src/lib/evals/evalRunner.ts`），用於註冊記憶體內建套件、依據預期準則評估輸出，並彙整評分表。
- 持久化層（`src/lib/db/evals.ts`），用於將自訂（使用者定義）套件及歷史執行記錄儲存在 SQLite 中。
- 協調層（`src/lib/evals/runtime.ts`），透過將實際呼叫分派至 `POST /v1/chat/completions` 來執行各個案例、擷取延遲與輸出，並持久化執行記錄。
- `/api/evals/*` 下的 REST 端點（僅限管理驗證）。
- 位於 `Dashboard → Usage → Evals` 的儀表板介面（`EvalsTab.tsx`）。

## 概念

### 套件

套件是具名的測試案例集合，包含一個 `description` 及一或多個案例。套件來自兩種來源：

| 來源       | 定義位置                                      | 執行階段可變更？   |
| ---------- | --------------------------------------------- | ------------------ |
| `built-in` | 啟動時透過 `registerSuite()` 註冊             | 否（由程式碼定義） |
| `custom`   | 儲存在 SQLite `eval_suites` + `eval_cases` 中 | 是（透過 API/UI）  |

目前的內建套件（請參閱 `src/lib/evals/evalRunner.ts`）：

- `golden-set` — 涵蓋問候/數學/翻譯/安全性的 10 個基準案例
- `coding-proficiency` — Python/JS/SQL/TS/錯誤偵測
- `reasoning-logic` — 三段論、文字題、模式辨識
- `multilingual` — 翻譯與語言偵測
- `safety-guardrails` — PII、越獄攻擊、拒絕回應、偏見意識
- `instruction-following` — 僅限 JSON、編號清單、語言限制
- `codex-comparison` — 適用於比較模式的正面交鋒程式設計任務

### 案例

每個案例包含：

| 欄位       | 說明                                                        |
| ---------- | ----------------------------------------------------------- |
| `id`       | 穩定識別碼（用於作為輸出及指標的鍵）                        |
| `name`     | 人類可讀的標籤                                              |
| `model`    | 執行使用 `suite-default` 目標時的預設模型                   |
| `input`    | `{ messages, max_tokens? }` — 傳送至 `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — 評分準則（請參閱下文）              |
| `tags`     | 選用標籤（例如 `safety`、`pii`、`jailbreak`）               |

### 目標

同一個套件可以針對不同目標執行。目標結構描述為 `src/shared/validation/schemas.ts` 中的 `evalTargetSchema`：

| 目標類型        | `id`     | 行為                                              |
| --------------- | -------- | ------------------------------------------------- |
| `suite-default` | `null`   | 每個案例使用其內建的 `model` 欄位                 |
| `model`         | 模型名稱 | 強制所有案例通過單一直接模型執行（例如 `gpt-4o`） |
| `combo`         | 組合名稱 | 透過單一組合執行所有案例（用以測試路由引擎）      |

對於 `model` 和 `combo`，`id` 欄位為必填（由 Zod `superRefine` 強制執行）。提供 `compareTarget` 時，兩個目標必須不同——執行器會將兩次執行結果持久化在同一個 `runGroupId` 下，以進行 A/B 比較。

## 評分規則

實作於 `evaluateCase()`（evalRunner.ts）：

| 策略       | 通過條件……                                                          |
| ---------- | ------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())` |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` 為真值              |
| `custom`   | `expected.fn(actualOutput, evalCase)` 回傳真值（僅限內建）          |

**注意：** 自訂函式評分僅保留給以程式碼定義的（內建）測試套件，因為函式無法透過 API 序列化。`evalCaseBuilderSchema` 對於使用者建立的測試套件僅接受 `contains | exact | regex`。

目前沒有使用 LLM 作為評審，也沒有基於嵌入向量的相似度評分器——這會是 `evaluateCase()` 中一個明確的擴充點。

## 資料庫結構

三個資料表（遷移檔案 `030_create_eval_runs.sql` 和 `031_create_eval_suites.sql`）：

| 資料表        | 用途                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | 自訂測試套件中繼資料（`id`、`name`、`description`）                                                                      |
| `eval_cases`  | 每個測試套件的案例——`input_json`、`expected_*`、`tags_json`                                                              |
| `eval_runs`   | 歷史執行紀錄——`pass_rate`、`total`、`passed`、`failed`、`avg_latency_ms`、`summary_json`、`results_json`、`outputs_json` |

內建測試套件**不會**儲存在資料庫中。它們存在於記憶體內，且每次匯入 `evalRunner.ts` 時都會重新註冊。

## REST API

所有端點都需要管理驗證（`requireManagementAuth`）——它們不屬於公開的代理介面。

| 端點                          | 方法     | 說明                                                      |
| ----------------------------- | -------- | --------------------------------------------------------- |
| `/api/evals`                  | `GET`    | 列出測試套件 + 最近執行紀錄 + 計分卡 + 目標 + 金鑰        |
| `/api/evals`                  | `POST`   | 執行測試套件（單一或比較）——結構描述 `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | 擷取一個測試套件（內建或自訂）                            |
| `/api/evals/suites`           | `POST`   | 建立自訂測試套件——結構描述 `evalSuiteSaveSchema`          |
| `/api/evals/suites/{suiteId}` | `GET`    | 擷取自訂測試套件                                          |
| `/api/evals/suites/{suiteId}` | `PUT`    | 取代自訂測試套件（案例會重新插入）                        |
| `/api/evals/suites/{suiteId}` | `DELETE` | 刪除自訂測試套件及其案例                                  |

### 執行測試套件

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

選用欄位：

- `outputs`——預先計算輸出的 `Record<caseId, string>`。提供此欄位時，執行器會**略過分派**，僅對快取的輸出進行評分（適用於離線評估）。
- `compareTarget`——要平行執行的第二個目標；兩次執行會共用產生的 `runGroupId`，以便進行直接比較檢視。
- `apiKeyId`——用於驗證所分派之 `/v1/chat/completions` 呼叫的內部 API 金鑰。啟用 `REQUIRE_API_KEY` 時為必填。

### 建立自訂測試套件

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## 分派管線

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`)：

1. 解析套件（內建或自訂）。
2. 針對每個案例，建立傳送至 `/v1/chat/completions` 的 `Request`，其中包含案例的 `messages`、解析後的 `model`、`stream: false`，以及 `max_tokens: 512`（或案例的覆寫值）。
3. 直接呼叫聊天處理常式（程序內執行，不會產生額外的 HTTP 往返）。
4. 擷取延遲時間，並從 `choices[0].message.content` 或 Responses API 的 `output[]` 承載資料中擷取文字。
5. 透過 `runSuite()` 為所有輸出評分，然後透過 `saveEvalRun()` 保存。

案例會**依序**執行。目前沒有並行旗標。

## 儀表板

UI 位於 `Dashboard → Usage → Evals`
（`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`）。您可以在其中：

- 瀏覽內建與自訂套件，並逐一預覽案例。
- 使用案例建構器建立、編輯及刪除自訂套件。
- 選擇目標（套件預設值／模型／combo）、選擇性的第二個 `compareTarget`、選擇性的 API 金鑰，然後依需求執行。
- 查看執行歷程、各案例的通過／失敗狀態、延遲時間，以及擷取的輸出。
- 查看依每個 `(suite, target)` 範圍的最新執行彙總而成的滾動計分卡。

## 與自動評估 RFC 的關係

另一套範圍較窄的評估子系統位於 `src/domain/assessment/`
（另請參閱 [AUTO-COMBO.md](../routing/AUTO-COMBO.md) 以瞭解即時評分引擎）。
該子系統以 Auto Combo 引擎為目標，自動為提供者與模型評分，使 combo 能在上游發生故障時自行修復。它使用自己的執行器、分類器及評分邏輯。

此處記錄的 Evals 框架是**範圍更廣的通用測試介面**。對於任意的迴歸測試套件、A/B 比較及各版本的冒煙測試，應優先使用此框架。當您需要以即時提供者健康狀態影響路由決策時，請使用自動評估子系統。

## CI 整合

目前沒有專用的 `eval:ci` npm 指令碼。如果您想根據評估結果設置版本發布閘門，有兩種方式：

- **HTTP 路徑**：啟動伺服器，使用已知的 `suiteId` + `target` 呼叫 `POST /api/evals`，並判定回應中的 `runs[].summary.passRate >= N`。
- **程序內路徑**：從指令碼中的 `@/lib/evals/runtime` 匯入 `runEvalSuiteAgainstTarget()`，針對測試資料庫執行，並檢查傳回的 `PersistedEvalRun.summary`。

涵蓋路由與歷程的測試位於
`tests/unit/evals-route.test.ts` 及 `tests/unit/evals-history.test.ts`。

## 擴充點

常見變更及其修改位置：

- **新的評分策略** — 擴充 `evaluateCase()`（`evalRunner.ts`）中的 `switch (evalCase.expected.strategy)` 區塊，並擴充 `src/lib/db/evals.ts` 中的 `EvalCaseStrategy`，以及 `schemas.ts` 中的 `evalCaseBuilderSchema`。
- **新的內建套件** — 定義套件物件，並在 `evalRunner.ts` 底部呼叫 `registerSuite()`。`listSuites()` 將會自動探索該套件。
- **以並行方式執行** — 將 `runEvalSuiteAgainstTarget()` 中依序執行的 `for` 迴圈改為有界的 `Promise.all`（目前沒有並行控制機制）。
- **串流／工具呼叫案例** — 執行器目前會強制使用 `stream: false`。串流或能感知工具的評估需要變更 `runtime.ts`（在評分前擷取並彙總 SSE 區塊）。

## 另請參閱

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — 整體產品操作指南
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 請求管線參考
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo 評分引擎（即時執行環境）
- 原始碼：`src/lib/evals/`、`src/lib/db/evals.ts`、`src/app/api/evals/`
- UI：`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
