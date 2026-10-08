# Monitoring & Observability Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**：OmniRoute 內建健康狀態監控、提供者自動駕駛、配額追蹤及可觀測性鉤子。本指南涵蓋儀表板、警示與疑難排解。

**來源：**

- `src/lib/monitoring/observability.ts` — 可觀測性快照
- `src/lib/monitoring/comboHealthAutopilot.ts` — 組合健康狀態自動駕駛
- `src/lib/monitoring/providerHealthAutopilot.ts` — 提供者自動駕駛
- `src/lib/monitoring/providerHealthMatrix.ts` — 提供者健康狀態矩陣
- `src/lib/localHealthCheck.ts` — 本機健康狀態檢查
- `src/lib/tokenHealthCheck.ts` — 權杖重新整理健康狀態
- `src/lib/proxyHealth.ts` — Proxy 健康狀態快取（詳見 PROXY_GUIDE.md）

---

## 概覽

OmniRoute 具有 **3 層監控機制**：

```
┌──────────────────────────────────────────────────────────────┐
│  第 1 層：系統健康狀態（伺服器層級）                          │
│  ├─ localHealthCheck.ts — 資料庫、連接埠、原生相依套件        │
│  ├─ db/healthCheck.ts — 完整性、外鍵、孤立產物                │
│  └─ 儀表板：/dashboard/health                                 │
├──────────────────────────────────────────────────────────────┤
│  第 2 層：提供者健康狀態（各提供者的韌性）                    │
│  ├─ providerHealthAutopilot.ts — 斷路器、冷卻期               │
│  ├─ providerHealthMatrix.ts — 依提供者／模型分類的健康分數    │
│  └─ 儀表板：/dashboard/providers                              │
├──────────────────────────────────────────────────────────────┤
│  第 3 層：即時可觀測性（執行階段快照）                        │
│  ├─ observability.ts — 斷路器、工作階段、配額                 │
│  ├─ tokenHealthCheck.ts — OAuth 權杖重新整理健康狀態          │
│  └─ MCP 工具：omniroute_get_health、omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## 儀表板頁面

### `/dashboard/health`（系統健康狀態）

頂層健康狀態儀表板顯示：

| 區段           | 顯示內容                                 |
| -------------- | ---------------------------------------- |
| **伺服器狀態** | 運作時間、版本、連接埠、作用中連線數     |
| **資料庫**     | 連線、完整性、WAL 大小、近期遷移         |
| **提供者摘要** | 作用中數量、健康數量、已開啟的斷路器數量 |
| **配額監控器** | 作用中工作階段、警示中、已耗盡           |
| **近期錯誤**   | 最近 10 筆錯誤及其堆疊追蹤               |
| **資源使用量** | 記憶體、CPU、堆積壓力指標                |

### `/dashboard/providers`（提供者健康狀態）

各提供者儀表板：

| 欄位     | 說明                             |
| -------- | -------------------------------- |
| 提供者   | 提供者 ID + 顯示名稱             |
| 健康狀態 | 綠色／黃色／紅色狀態             |
| 斷路器   | 開啟／關閉／半開狀態             |
| 連線     | 連線數量、上次重新整理時間       |
| 模型     | 可用模型、各模型的健康狀態       |
| 成本     | 今日成本、7 天趨勢               |
| 錯誤     | 過去 24 小時錯誤數、主要錯誤類別 |

按一下提供者即可查看：

- 包含延遲細目的近期要求
- 各連線的健康分數
- 各模型的鎖定狀態
- 自動駕駛建議

### `/dashboard/quota`（配額追蹤）

每個 API 金鑰的資訊：

- 目前使用量與限制的比較（進度列）
- 配額趨勢（30 天圖表）
- 下次重設時間
- 警示歷程記錄

### `/dashboard/combos`（組合健康狀態）

各組合的資訊：

- 策略 + 目標
- 各目標的健康狀態
- 近期備援事件
- 成功率（24 小時、7 天、30 天）

---

## 健康檢查 API

OmniRoute 提供 **兩個** HTTP 健康狀態端點。對協調器而言，兩者不可互換。

| 路徑                         | 用途                                                     | 負載                    | 適用情境                                                             |
| ---------------------------- | -------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------- |
| `GET /healthz`               | 生命週期存活／就緒狀態（`ok` / `starting` / `stopping`） | 極低（僅檢查階段旗標）  | Kubernetes **就緒探測**；若必須使用 HTTP，則可作為寬鬆的**存活探測** |
| `GET /api/monitoring/health` | 深度系統與提供者摘要（DB、堆積、目錄計數等）             | 高（同步 DB／監控工作） | 儀表板、黑箱深度檢查、Docker 內建健康檢查                            |

> **注意：**提供者健康狀態矩陣、自動駕駛問題、配額監控器、權杖健康狀態，以及超出 `/api/monitoring/health` 所提供範圍的延遲詳細資訊，可透過 **MCP 工具** `observability_snapshot` 或**儀表板**頁面取得——這些資訊沒有專用的 REST 路由。

這兩個路由與請求處理執行於**同一個 Node 事件迴圈**。受 CPU 限制的路徑（例如大型 `GET /v1/models` 目錄處理、長上下文壓縮／權杖計數）可能延遲**所有** HTTP 處理常式，包括 `/healthz`。事件迴圈忙碌 ≠ 程序已停止運作。應優先修正造成壟斷的工作；調整探測參數只能減少誤殺。

### 輕量型協調器探測

```bash
GET /healthz
# 或 HEAD /healthz
```

- 當伺服器生命週期階段已就緒時，傳回 **200** + 本文 `ok`
- 在啟動或關閉期間，傳回 **503** + `starting` / `stopping`
- 實作：`src/app/healthz/route.ts`（不會 ping DB）

### 系統健康狀態（深度）

```bash
GET /api/monitoring/health
```

回應：

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`：探測快取與 SQLite `test_status` 的比較

`GET /api/monitoring/health` → `credentialHealth` 是**記憶體內的探測快取
量測值**，而非 `provider_connections.test_status` 的即時傾印。在 #12532 之後，
請求路徑只會讀取 `getCachedCredentialHealthSummary()`；背景探測則會在事件迴圈之外
重新整理快取。

| 層級             | 位置                                                                  | 含義                                                                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 探測快取量測值   | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | 仍保留於程序記憶體中的最新憑證健康探測結果。`source` 一律為 `probe-cache`。                                                                                                                              |
| 失敗連線詳細資訊 | `credentialHealth.failedConnections`                                  | **僅在 `failed > 0` 時**存在。這是狀態為 `status=error` 的快取資料列限量清單（`connectionId`、`status`、經過清理的 `lastError` / `lastErrorType`）。若清單因達到上限而被截斷，則會設定 `failedOmitted`。 |
| SQLite 黏性狀態  | `credentialHealth.staleDbNonOkCount`                                  | `test_status` 持久化值為已知非正常狀態（`error`、`expired`、`credits_exhausted`、`banned`、`deactivated`、`unavailable`）的**作用中**（`is_active=1`）連線資料列數量。                                   |

這兩個層級可能有意地不一致：

- 量測值為 `failed=0`，但 `staleDbNonOkCount>0`——SQLite 中仍有黏性的
  `test_status`（例如 `expired` 或 `credits_exhausted`），而最新的
  探測快取快照未將其計為 `status=error`。
- 量測值為 `failed>0`，但 SQLite 顯示正常——近期有探測失敗且結果已
  快取；DB 資料列尚未更新，或之後已被清除。

擷取此端點時，請勿僅依據 `provider_connections.test_status` 發出警示。
即時探測失敗應使用 `failed` + `failedConnections`；若需要持久化的
黏性狀態計數，則使用 `staleDbNonOkCount`。

### Kubernetes 探測建議

OmniRoute 是**單一 Node 程序**（一個事件迴圈）。標準 Docker `HEALTHCHECK` 以輕量型 `/healthz` 為目標。對 kubelet 的存活探測間隔而言，`/api/monitoring/health` **負載過高**。

| 探針             | 建議目標                                                                         | 備註                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **啟動**         | HTTP `GET /healthz`，搭配較長的 `failureThreshold`（或較大的 `startPeriod`）     | 冷啟動 + SQLite 遷移可能需要數秒以上                                                                                                                                                                                                                                                              |
| **就緒狀態**     | HTTP `GET /healthz`                                                              | 生命週期 `ok` / `starting` / `stopping`（200 對 503）。如果事件迴圈遭 CPU 阻塞，狀態仍會反覆變化。**耗時數秒才傳回 200 並不代表健康**（#10303）——這表示事件迴圈在執行這個 3 位元組的處理常式之前已長時間無法取得執行機會                                                                          |
| **存活狀態**     | HTTP `GET /livez`，**或對主要服務連接埠（`PORT`，預設為 `20128`）執行 TCP 探測** | `/livez` 只表示程序仍存活（只要處理常式能執行，就一律傳回 200）。它仍與主服務共用事件迴圈——忙碌 ≠ 已死，而且在偵測事件迴圈無法取得執行機會（#10303）方面不比 TCP 更好。如果 HTTP 探針在目錄處理／壓縮負載下逾時，請優先使用 **TCP**；無論採用哪一種方式，都**不要**因短暫的事件迴圈停滯而終止 Pod |
| **深度健康檢查** | 由外部檢查程式呼叫 `GET /api/monitoring/health`                                  | 不適合用於 kubelet `livenessProbe`／頻繁執行的 `readinessProbe`                                                                                                                                                                                                                                   |

設定範例（請依冷啟動與壓縮負載調整閾值）：

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # 當事件迴圈停滯時，HTTP /livez 仍可能逾時。TCP 是較
  # 保守的替代方案：
  # tcpSocket:
  #   port: http
```

**不要**將 kubelet 的**存活探針**指向 `/api/monitoring/health`。該路徑會實際執行資料庫／監控工作，並在高負載下產生誤判。

相關資訊：[#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052)（事件迴圈忙碌時的探針）、[#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055)（目錄定價占用大量資源）、[#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117)（壓縮詞元計數占用大量資源）。

### 選用的請求路徑工作（記憶、技能、權杖重新整理）

記憶擷取、技能注入和 OAuth 權杖重新整理會與 `/healthz` 共用**主要 Node 事件迴圈**。它們是可在儀表板中切換的功能（`memoryEnabled`、`skillsEnabled`），並非工作執行緒集區。請參閱[環境——事件迴圈成本](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)。

### 提供者健康狀態

> **沒有 REST 端點。** 提供者健康狀態資料可透過 MCP 工具 `observability_snapshot` 或儀表板的 `/dashboard/providers` 頁面取得。

### 提供者詳細資訊

> **沒有 REST 端點。** 各提供者的詳細資訊可透過儀表板的 `/dashboard/providers` 頁面取得。

---

## 提供者健康狀況自動駕駛

`providerHealthAutopilot.ts` 模組是一個**自我修復系統**，其功能包括：

1. 偵測提供者問題（斷路器開啟、冷卻、鎖定、配額警告）
2. 產生可解決問題的**建議動作**
3. 選擇性地**自動執行**低風險動作

### 偵測到的問題類型

| 問題種類                     | 嚴重程度 | 條件範例                       |
| ---------------------------- | -------- | ------------------------------ |
| `provider_circuit_open`      | 嚴重     | 發生 5 次失敗後斷路器開啟      |
| `provider_circuit_half_open` | 警告     | 斷路器正在測試是否已恢復       |
| `connection_cooldown`        | 警告     | 連線在收到 429 後進入冷卻狀態  |
| `stale_connection_error`     | 警告     | 上次重新整理於 30 多分鐘前失敗 |
| `terminal_connection_error`  | 嚴重     | OAuth 已撤銷、金鑰無效         |
| `inactive_connection`        | 資訊     | 已在設定中停用連線             |
| `model_lockout`              | 警告     | 特定模型處於隔離狀態           |
| `quota_monitor_warning`      | 警告     | 配額使用率達 80% 以上          |

### 產生的動作類型

| 動作                           | 風險 | 說明                   |
| ------------------------------ | ---- | ---------------------- |
| `clear_provider_breaker`       | 中   | 將斷路器重設為關閉狀態 |
| `clear_connection_cooldown`    | 低   | 移除連線的冷卻狀態     |
| `clear_stale_connection_error` | 低   | 清除過期的錯誤旗標     |
| `clear_model_lockout`          | 低   | 重新啟用遭隔離的模型   |
| `reactivate_connection`        | 中   | 重新啟用已停用的連線   |
| `deactivate_connection`        | 高   | 停用有問題的連線       |

### API

> **沒有 REST 端點。**自動駕駛問題可透過 MCP 工具 `observability_snapshot` 或儀表板取得。自動駕駛在內部執行；其行為透過設定資料庫（每個連線的 `autopilotMode` 欄位）進行設定，而非環境變數——使用 `grep -rn` 搜尋自動駕駛模式的環境變數會找不到任何結果。

### 自動駕駛模式

自動駕駛預設以**手動模式**運作——它會偵測問題並產生建議動作，但不會自動套用。可透過儀表板套用動作。

---

## 組合健康狀況自動駕駛

`comboHealthAutopilot.ts` 是提供者自動駕駛的**組合專用**版本。其功能包括：

- 偵測不健康的組合
- 建議重新排序目標
- 建議停用故障的目標
- 在失敗 N 次後自動移除失效目標

### 組合問題範例

```
組合 "always-on"（優先順序策略）
├─ 目標 1：openai/gpt-5（健康）
├─ 目標 2：anthropic/claude-opus-4-6（⚠️ 模型鎖定至 14:00）
└─ 目標 3：kiro/claude-sonnet-4-5（健康）

建議動作：重新排序——在鎖定到期前，將 kiro 移至 anthropic 上方
```

---

## 配額監控器

`observability.ts` 為訂閱型提供者（Claude Code、Codex、GitHub Copilot）公開**個別工作階段的配額監控器**：

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### 狀態含義

| 狀態        | 發生時機       | UI 動作                              |
| ----------- | -------------- | ------------------------------------ |
| `starting`  | 初始輪詢進行中 | 顯示載入動畫                         |
| `idle`      | 最近沒有活動   | 從儀表板隱藏                         |
| `healthy`   | 剩餘配額 > 50% | 顯示綠點                             |
| `warning`   | 剩餘配額 < 50% | 顯示黃色警告                         |
| `exhausted` | 配額 = 0%      | 顯示紅色阻擋狀態，路由至下一個提供者 |
| `error`     | 輪詢失敗       | 顯示紅點，稍後重試                   |

### API

> **沒有 REST 端點。**配額監控資料可透過 MCP 工具 `observability_snapshot` 或儀表板取得。

---

## 可觀測性快照

MCP 工具 `observability_snapshot` 會為 AI 代理程式傳回一份**完整的系統快照**：

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* 請參閱上文 */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

代理程式會使用此資訊來做出**路由決策**——例如，「如果 openai 的斷路器處於開啟狀態，則優先路由至 anthropic」。

---

## 權杖健康狀態檢查

OAuth 提供者（Claude Code、GitHub Copilot、Cursor）需要**定期重新整理權杖**。`src/lib/tokenHealthCheck.ts` 會執行背景排程器：

- **掃描週期**：每 60 秒（於 `src/lib/tokenHealthCheck.ts:30` 中使用 `TICK_MS = 60 * 1000` 進行掃描）
- **各連線的健康狀態檢查間隔**：預設為 60 分鐘（`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`）；可透過設定資料庫進行設定
- **收到 401 時預先重新整理**：由各連線的攔截器處理

### 權杖健康狀態

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### 設定

權杖健康狀態檢查的設定由 `tokenHealthCheck.ts` 內部處理。

### 權杖健康狀態

> **沒有 REST 端點。** 權杖健康狀態資料可透過儀表板或 MCP 工具 `observability_snapshot` 取得。

---

## 警示

### 內建管道

OmniRoute 支援 **3 種警示管道**：

| 管道       | 設定     | 使用情境                  |
| ---------- | -------- | ------------------------- |
| 儀表板橫幅 | 永遠啟用 | 應用程式內通知            |
| Webhook    | 設定 URL | Slack、Discord、PagerDuty |
| 日誌       | 預設     | 用於外部日誌彙整          |

### Webhook 設定

> **注意：** Webhook 警示設定是透過儀表板的「設定」頁面處理。請參閱設定 UI，以設定 Webhook URL、事件篩選及承載資料自訂。

### 警示類型

| 警示                         | 觸發時機                        | 預設嚴重性 |
| ---------------------------- | ------------------------------- | ---------- |
| `provider_circuit_open`      | 斷路器開啟                      | 嚴重       |
| `provider_circuit_half_open` | 斷路器測試復原                  | 資訊       |
| `quota_warning`              | 配額達到 80% 以上               | 警告       |
| `quota_exhausted`            | 配額達到 100%                   | 嚴重       |
| `token_refresh_failed`       | 連續重新整理失敗 3 次以上       | 警告       |
| `token_expired`              | 權杖已過期                      | 嚴重       |
| `combo_target_unhealthy`     | 組合目標處於冷卻狀態 1 小時以上 | 警告       |
| `db_integrity_warning`       | FK 違規數量 > 0                 | 警告       |
| `heap_pressure`              | 堆積使用量 > 閾值的 80%         | 警告       |

---

## 效能指標

### 追蹤的指標

| 指標                    | 類型   | 來源                            |
| ----------------------- | ------ | ------------------------------- |
| `request_count`         | 計數器 | `services/usage.ts`             |
| `request_latency_ms`    | 直方圖 | `services/usage.ts`             |
| `tokens_consumed`       | 計數器 | `services/usage.ts`             |
| `cost_usd`              | 計數器 | `services/usage.ts`             |
| `provider_errors`       | 計數器 | `services/errorClassifier.ts`   |
| `circuit_state_changes` | 計數器 | `services/resilience.ts`        |
| `cache_hits`            | 計數器 | `services/signatureCache.ts`    |
| `compression_savings`   | 直方圖 | `services/compression/stats.ts` |
| `quota_used`            | 儀表   | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | 儀表   | `observability.ts`              |

### 延遲百分位數（p50/p95/p99）

> **沒有 REST 端點。** 延遲百分位數資料可透過儀表板的 `/dashboard/health` 頁面取得。Prometheus/OpenTelemetry 匯出功能預計於 v3.9 推出。

### Prometheus / OpenTelemetry 匯出（第 2 階段）

預計於 v3.9 推出：原生匯出至 Prometheus、OpenTelemetry、Datadog。

目前可使用任何以 HTTP 為基礎的監控系統（Prometheus blackbox exporter、Datadog HTTP check 等）抓取 `/api/monitoring/health`。

---

## 警示設定範例

### Slack

> **注意：** Webhook 警示是透過儀表板的「設定」頁面進行設定——沒有專用的 webhook 環境變數（`grep -rn` 找不到任何結果）。請參閱設定 UI，以設定 webhook URL、事件篩選及承載資料自訂。

### Discord

> Webhook 警示使用與 Slack 相同的設定 UI 流程。Discord 接受相同的 JSON 承載資料格式。

### PagerDuty

> Webhook 警示使用相同的設定 UI 流程。PagerDuty Events API v2 路由金鑰是在設定 UI 中設定。

### 自訂 Webhook（JSON）

> 任何接受含 JSON 內文之 POST 的 HTTP 端點都可以使用。請在設定 UI 中設定 URL。

---

## 儀表板設定

### 自訂健康狀態儀表板

建立 `~/.omniroute/dashboard.json`：

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### 將提供者釘選至頂端

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## 疑難排解

### 「提供者顯示健康，但請求失敗」

1. 檢查 **autopilot 問題**——可能有模型遭到鎖定
2. 查看**近期錯誤**，確認特定的錯誤類別
3. 嘗試提供者卡片中的**連線測試**
4. 檢查提供者是否受到**上游速率限制**（無法在本機查看）

### 「配額顯示健康，但我看到 429」

- 429 表示提供者認為你已用完配額
- OmniRoute 的配額追蹤可能已**過時**——應以上游提供者的資料為準
- 配額資料會透過內部配額監控器自動重新整理

### 「組合失敗，但所有目標看起來都很健康」

- 檢查**組合健康狀態**儀表板，確認是否有目標排序問題
- 查看**後援事件**——組合可能太快耗盡所有目標
- 確認所選的**策略**符合你的使用情境（優先順序、輪詢或自動）

### 「資料庫健康狀態檢查失敗」

- 執行 `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- 如果顯示「ok」——這是誤報，健康狀態檢查過於嚴格
- 如果顯示其他任何內容——請**停止 OmniRoute**，並遵循[災難復原指南](./DATABASE_GUIDE.md#disaster-recovery)

### 「記憶體堆積壓力已達嚴重程度」

```bash
# 檢查目前的堆積記憶體
node -e "console.log(process.memoryUsage())"

# 觸發手動 GC（若使用 --expose-gc）
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# 減少並行請求數（透過儀表板的「設定」頁面進行設定，而非使用環境變數）
# 沒有 `MAX_CONCURRENT_REQUESTS` 環境變數——請前往「設定」→「並行」進行設定。
```

---

## 另請參閱

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用量與成本追蹤
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — 資料庫結構描述與健康狀態
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — Proxy 健康狀態（獨立快取）
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 系統架構
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 斷路器詳細資訊
- 原始碼：`src/lib/monitoring/`（4 個檔案，2121 行程式碼）
