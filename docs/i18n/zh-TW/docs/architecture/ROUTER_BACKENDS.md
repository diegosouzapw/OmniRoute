# Router Backends & Embedded Services — architecture contract (ADR) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md)

---

> **狀態：** 已接受 · **背景：** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670)、
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **契約：** `domain/routing/routerBackends.ts`
> （類型化登錄表——程式碼隨 [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) 合併）

本 ADR 明確界定 `ts`（原生）、`bifrost`、`cliproxy`、`9router` 與
VibeProxy 相容引擎之間的關係，避免貢獻者繼續混淆兩個在架構上截然不同的概念。本文將由路由後端登錄表工作所引入的類型化登錄表，確立為此模型的唯一真實來源。

## 核心區別——兩個正交軸

引擎的角色由**兩個獨立的軸**描述，並共同編碼於登錄表的
`RouterBackendDefinition` 中：

1. **生命週期**（`RouterBackendLifecycle`）——_引擎如何執行_：
   - `in-process`——在 OmniRoute Node 行程內執行（原生 TS 管線）。
   - `supervised`——由 OmniRoute 透過 `ServiceSupervisor` 安裝／啟動／停止／健康檢查的本機子行程，之後作為提供者連線使用。
   - `external`——OmniRoute 會向其分派請求、但**不會**管理的 HTTP 端點
     （透過環境變數中的基底 URL 設定）。
   - `disabled`——已登錄，但不可選取。
2. **選擇軸**（中繼路由後端）——_中繼是否將請求分派給它_：
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`，定義於
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`。

應避免的錯誤：將「嵌入式服務」與「路由後端」視為同一份清單。兩者並不相同。`supervised` 引擎（9router/cliproxy）是**由原生管線使用的提供者連線**，而不是替代性的中繼分派後端。`bifrost` 則相反——它是中繼分派後端，但（過去）僅支援 `external`。

## 登錄表——唯一真實來源

`domain/routing/routerBackends.ts` 契約（程式碼隨
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) 合併）會一次宣告每個引擎，包括其生命週期、功能、服務識別資訊、預設連接埠、健康檢查設定及遙測支援。使用者端會透過 `getRouterBackend(id)`、
`listRouterBackends()` 與 `listRouterBackendsByCapability(cap)` 查詢引擎，而非針對每個 Sidecar 寫死特殊處理邏輯。

| 後端        | 生命週期     | 服務（軸 A） | 中繼後端（軸 B）   | 健康檢查      | 預設連接埠 |
| ----------- | ------------ | ------------ | ------------------ | ------------- | ---------- |
| `ts`        | `in-process` | —            | `ts`（原生）       | —             | —          |
| `bifrost`   | `external`¹  | —¹           | `bifrost` / `auto` | `/health`     | —          |
| `cliproxy`  | `supervised` | `cliproxy`   | —（提供者）        | `/v1/models`  | 8317       |
| `9router`   | `supervised` | `9router`    | —（提供者）        | `/api/health` | 20130      |
| `vibeproxy` | `external`   | —            | —（提供者配接器）  | `/v1/models`  | —          |

¹ 將 Bifrost 提升為 `supervised` 嵌入式服務（可從 `/api/services/bifrost/` 安裝／啟動）的工作正在
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) 中追蹤；在其合併之前，Bifrost 僅支援 `external`（只能透過 `BIFROST_BASE_URL` 存取）。

`capabilities`（`chat`、`responses`、`streaming`、`tools`、`vision`、
`oauth-backed`、`dashboard-embed`、`model-sync`、`native-hot-path`）讓呼叫端可依引擎實際具備的功能進行篩選，而不必針對每個 ID 寫死條件分支。

## 軸線 A — 內嵌服務（受監督程序端）

- **受監督程序的登錄檔：** `src/lib/services/bootstrap.ts` `SERVICES[]`
  （目前：`9router`、`cliproxy`）。
- **生命週期擁有者：** `src/lib/services/ServiceSupervisor.ts` — `start()` 會產生
  子程序、以 `waitForHealthy()` 作為閘門，並將 stdout/stderr 擷取至環形緩衝區；
  `stop()` 依序傳送 SIGTERM→SIGKILL；所有操作均在鎖定下序列化執行。
- **狀態聯集**（`src/lib/services/types.ts`）：
  `not_installed | stopped | starting | running | stopping | error`，另有正交的
  `HealthState = healthy | unhealthy | unknown`。
- **為何採用獨立程序（而非程序內 SDK）？** 程序隔離使每個 sidecar 的
  安裝／啟動／停止／健康狀態／日誌可獨立控制，也讓迴環產生程序防護機制得以套用。
  對程序內轉接器進行建模屬於未來工作 — 屆時將透過
  `native-hot-path` 能力旗標來表達。

### 生命週期路由契約（`/api/services/<tool>/…`）

狀態碼是**依狀態／動詞／路徑刻意設計的** — 這是契約，而非
不一致：

| 呼叫                         | 條件                         | 狀態                                  |
| ---------------------------- | ---------------------------- | ------------------------------------- |
| `POST .../start`             | 服務為 `not_installed`       | **409**（前置條件）                   |
| `POST .../stop`              | 已停止                       | **200**（冪等的無操作）               |
| `GET .../status`             | 正常                         | **200**（`live ?? row ?? "unknown"`） |
| `POST .../start`             | 產生程序失敗                 | **503**（暫時性）                     |
| `GET .../status`, `.../stop` | 未捕捉的錯誤                 | **500**                               |
| `GET /api/services/<x>/logs` | 未知工具 `<x>`               | **404** `Service '<x>' not found`     |
| `GET .../status?reveal=key`  | 缺少 `X-Reveal-Confirm: yes` | **403**（僅限 9router）               |
| **任何** `/api/services/*`   | 呼叫端不在迴環／私有 LAN 上  | **403 LOCAL_ONLY**                    |

所有錯誤本文皆由 `createErrorResponse()` 塑形成 →
`{ error: { message, type }, requestId }`，其中 `type` 由狀態碼衍生
（`500→server_error`、`404→not_found`、`409→conflict`，其他則為 `invalid_request`），
並作為可供機器採取動作的判別欄位。訊息均已預先清理
（`sanitizeErrorMessage()`，硬性規則 #12）。

**迴環防護機制**是最常見的 `403` 來源：`/api/services/` 位於
`LOCAL_ONLY_API_PREFIXES`（`src/server/authz/routeGuard.ts`）中，而
`src/server/authz/policies/management.ts` 會在驗證身分**之前**拒絕任何非迴環／非私有 LAN
的呼叫端，因為這些路由會產生子程序（硬性規則 15
與 17）。依設計，透過公用隧道存取這些路由會得到 `403`。

## 軸線 B — 中繼路由後端（分派端）

只有中繼代理路徑 `/api/v1/relay/chat/completions` 會選擇分派
後端；主要的 `/api/v1/chat/completions` 介面絕不會查詢
`routingBackend.ts`。

- **選擇**（`resolveRelayRoutingBackend`）：單一全域環境變數切換開關 —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}。
  若未設定，則在 Bifrost 已設定且啟用時使用 `auto`，否則使用 `ts`。
- **行為：**
  - `bifrost`（強制）：Bifrost 失敗 → 直接回傳 `502`，不進行後援切換。
  - `auto`：嘗試 Bifrost，若失敗或處於冷卻期，則不發出提示並繼續使用原生實作。
  - `ts`／後援切換後：原生 `open-sse` 轉譯器／執行器管線。
- **冷卻期：** `bifrostCooldown.ts` 中針對每個 `baseUrl` 設定的失敗冷卻期。

目前的選擇在中繼層級是**全有或全無** — `release/v3.8.43` 上不存在依提供者
或依請求切換引擎的功能。sidecar manifest 工作正在加入依請求控制的閘門
（[#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`），
使 `auto` 僅將符合 manifest 資格的提供者透過 Bifrost 路由。

## 儀表板整合

服務儀表板會每 5 秒透過
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
輪詢 `GET /api/services/<tool>/status`，並傳回 `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`。目前沒有共用的可用性情境提供者——
每個元件都會針對各個工具呼叫此 hook。當 `!res.ok` 時，該 hook 目前只會顯示
未加說明的 `HTTP <status>`；將 `error.type` 欄位對應至易於理解的說明，
是已列入追蹤的使用者體驗改善項目，而非契約變更。

## 影響

- 新引擎只需在 `ROUTER_BACKENDS` 中註冊一次；使用端即可透過能力查詢取得它們，
  無須新增針對個別 ID 的分支。
- 「這是服務還是路由後端？」應由 `lifecycle` 欄位判定，而不是根據
  某個 ID 恰好出現在哪個清單中。
- Bifrost 監督機制（#5817）與原生熱路徑遷移（#5670）會以此
  共用契約為基礎，而不是對每個 sidecar 進行特殊處理。
