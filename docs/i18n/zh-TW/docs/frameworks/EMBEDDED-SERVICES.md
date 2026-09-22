# Embedded Services (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **版本：** v3.8.44
> **最後更新：** 2026-09-09
> **適用對象：** 新增、維護或偵錯嵌入式服務（9Router、CLIProxyAPI、Mux、Bifrost、open-wa）的工程師。

嵌入式服務是安裝於本機的程序附屬工具，由 OmniRoute 負責安裝、監督，並將其公開為第一級路由目標。不同於透過 API 金鑰經由網際網路存取的外部提供者，嵌入式服務與 OmniRoute 在同一台機器上執行，並透過迴路介面通訊。

---

## 目錄

1. [概觀](#1-overview)
2. [架構 — 4 層](#2-architecture--4-layers)
3. [生命週期狀態機](#3-lifecycle-state-machine)
4. [API 參考](#4-api-reference)
5. [安全性](#5-security)
6. [新增嵌入式服務](#6-adding-a-new-embedded-service)
7. [疑難排解](#7-troubleshooting)
8. [常見問題](#8-faq)

---

## 1. 概述

### 為什麼要使用嵌入式服務？

內嵌了六項服務：

| 服務            | npm 套件                            | 預設連接埠 | 用途                                                                                                                                                                |
| --------------- | ----------------------------------- | :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                           |   20130    | OmniRoute 可作為子提供者使用的 AI 路由器。模型以 `9router/{sub}/{model}` 格式公開                                                                                   |
| **CLIProxyAPI** | GitHub 發行版二進位檔（`cliproxy`） |    8317    | 用於 Anthropic CLI 驗證流程的本機代理配接器。當 OAuth 權杖到期時提供後備路由                                                                                        |
| **Mux**         | `mux`（無介面的 `mux server`）      |    8322    | 本機代理程式協調守護程序（coder/mux）。僅管理生命週期，不是路由目標（不代理 LLM）。                                                                                 |
| **Bifrost**     | `@maximhq/bifrost`                  |    8080    | Go AI 閘道轉送後端。執行時會由轉送路由（`/v1/relay/`）自動選取                                                                                                      |
| **Dario**       | `@askalf/dario`                     |    3456    | Claude 訂閱代理，作為 CLIProxyAPI 的替代方案／容錯移轉選項，用於 Claude Code 格式的流量；注入的金鑰會成為 `DARIO_ADMIN_TOKEN`，用來保護其 `/admin/*` OAuth 控制平面 |
| **open-wa**     | `@open-wa/wa-automate`              |    8323    | WhatsApp Web 自動化（透過 Puppeteer 執行無介面的 Chromium）。僅管理生命週期，不是路由目標。                                                                         |

這六項服務皆採用相同的監督模型：

- OmniRoute 會將它們安裝於 `DATA_DIR/services/{name}/` 下（與 OmniRoute 本身的 `package.json` 隔離）
- OmniRoute 會將它們作為子行程啟動並監控
- OmniRoute 會將臨時 API 金鑰注入子行程的環境，並在適用時於不中斷服務的情況下輪替金鑰
- 所有管理路由（`/api/services/*`）均為 **LOCAL_ONLY**，只能從回送介面存取（硬性規則 #17）

### 關鍵決策（源自設計方案）

| 決策                         | 值                                                                |
| ---------------------------- | ----------------------------------------------------------------- |
| 從儀表板存取 9Router 原生 UI | 位於 `/dashboard/providers/services/9router/embed/*` 的反向代理   |
| 安裝機制                     | 透過 `execFile` 執行 `npm install {package}`（不使用 shell 插值） |
| 使用模式                     | 在路由引擎中將提供者註冊為 `9router/{sub}/{model}`                |
| API 金鑰管理                 | 由 OmniRoute 產生、靜態加密（AES-256-GCM），並透過環境變數注入    |
| 儀表板位置                   | `/dashboard/providers/services`（三個分頁）                       |
| 自動啟動                     | 各服務獨立切換，預設為關閉                                        |

---

## 2. 架構 — 4 層

```
┌────────────────────────────────────────────────────────────────────┐
│  第 1 層 — UI                                                      │
│  /dashboard/providers/services  （分頁：CLIProxyAPI | 9Router | Mux）│
│  即時日誌（SSE）、啟動／停止／重新啟動／更新、設定、安裝            │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               外殼 + 依 ?tab= 進行分頁路由          │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP（Next.js fetch）
┌──────────────────────▼─────────────────────────────────────────────┐
│  第 2 層 — API（LOCAL_ONLY — 僅限迴路位址）                         │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    （反向 HTTP + WebSocket 代理 → 9Router 上游）                    │
│                                                                    │
│  閘門：LOCAL_ONLY_API_PREFIXES 包含 "/api/services/" 與             │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ 程序內呼叫
┌──────────────────────▼─────────────────────────────────────────────┐
│  第 3 層 — ServiceSupervisor（src/lib/services/）                  │
│                                                                    │
│  ServiceSupervisor.ts   通用監督器（child_process.spawn）          │
│    ├── 安裝：      execFile('npm', ['install', pkg, '--prefix'])   │
│    ├── 啟動：      spawn(node, [entrypoint], {env, cwd})           │
│    ├── API 金鑰：  crypto.randomBytes(32) → env NINEROUTER_API_KEY │
│    ├── 連接埠：    9Router 使用 20130（可設定）                     │
│    ├── 日誌：      stdio 環形緩衝區 5 MB → SSE 事件                 │
│    ├── 健康檢查：  每 2–5 秒 HTTP GET /health，延遲復原             │
│    └── 生命週期：  SIGTERM 15 秒 → SIGKILL                         │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       在程序啟動時啟動所有 SERVICES[]                │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       定期 GET /v1/models → service_models 資料表    │
│  ringBuffer.ts      循環日誌緩衝區（每個服務 5 MB）                 │
│  healthCheck.ts     輪詢 HTTP 健康探測                             │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      （安裝程式轉接器）                             │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ 相容 OpenAI 的 HTTP（迴路位址）
┌──────────────────────▼─────────────────────────────────────────────┐
│  第 4 層 — 提供者／路由                                            │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    每次請求都重新查詢連接埠與 API 金鑰（不快取）。                  │
│    代理前從模型 ID 移除 "9router/" 前綴。                           │
│    若監督器並非處於 "running" 狀態，則傳回 503 service_not_running。│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    "9router" 的項目：isEmbeddedService: true                       │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    模型儲存為 "9router/{sub}/{model}"（含前綴）。                   │
│    由 modelSync.ts 每 5 分鐘同步一次。                              │
│                                                                    │
│  Mux 僅受生命週期管理（第 1–3 層）— 它是代理程式協調守護程序，      │
│  而非 LLM 代理，因此沒有第 4 層執行器／提供者項目，亦永遠不會成為   │
│  路由目標。                                                        │
└────────────────────────────────────────────────────────────────────┘
```

### 主要原始碼檔案

| 檔案                                        | 角色                                           |
| ------------------------------------------- | ---------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | 核心類別：生命週期、鎖定、健康狀態、環形緩衝區 |
| `src/lib/services/bootstrap.ts`             | 行程層級的註冊與自動啟動                       |
| `src/lib/services/registry.ts`              | 單例映射 `tool → supervisor`                   |
| `src/lib/services/apiKey.ts`                | 金鑰產生、AES-256-GCM 靜態加密                 |
| `src/lib/services/modelSync.ts`             | 定期同步模型（每 5 分鐘）＋隨選同步            |
| `src/lib/services/ringBuffer.ts`            | 具備 SSE 訂閱功能的 5 MB 環形日誌緩衝區        |
| `src/lib/services/healthCheck.ts`           | HTTP 健康狀態探測（間隔可設定）                |
| `src/lib/services/installers/ninerouter.ts` | 9Router 的 npm 安裝／更新／解除安裝            |
| `src/lib/services/installers/cliproxy.ts`   | CLIProxyAPI 的 npm 安裝／更新／解除安裝        |
| `src/lib/services/installers/mux.ts`        | Mux 的 npm 安裝／更新／解除安裝                |
| `src/lib/services/installers/openwa.ts`     | open-wa 的 npm 安裝／更新／解除安裝            |
| `src/app/api/services/9router/_lib.ts`      | `getOrInitSupervisor()` 輔助函式               |
| `src/app/api/services/[name]/logs/route.ts` | 共用的 SSE 日誌端點                            |
| `open-sse/executors/ninerouter.ts`          | 提供者執行器（第 4 層）                        |

---

## 3. 生命週期狀態機

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
                  健康探測成功      │         當機 / SIGTERM     │
                               ┌────▼─────┐  （5 秒內結束）      │
                               │ running  │──── 當機 ───────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

狀態儲存在 `version_manager` 資料庫資料表（`status` 欄位）中，並同步至
`ServiceSupervisor` 的記憶體內狀態。對執行中的程序而言，記憶體內狀態具有權威性；
資料庫狀態則是啟動時的持久化備援。

### 狀態轉換

| 來源            | 事件                          | 目標                   |
| --------------- | ----------------------------- | ---------------------- |
| `not_installed` | `install()` 成功              | `stopped`              |
| `stopped`       | 呼叫 `start()`                | `starting`             |
| `starting`      | 健康探測回傳 200              | `running`              |
| `starting`      | 程序在健康狀態前結束          | `error`                |
| `running`       | 呼叫 `stop()`                 | `stopping` → `stopped` |
| `running`       | 程序意外結束（< 5 秒）        | `error`（快速當機）    |
| `running`       | 程序意外結束（> 5 秒）        | `error`                |
| `error`         | 呼叫 `start()`                | `starting`             |
| 任意狀態        | 在 `stopping` 時呼叫 `stop()` | 不執行任何操作         |

### 操作鎖

`ServiceSupervisor` 透過非同步操作鎖（`withLock()`）將生命週期操作序列化。
對同一個監督器同時呼叫 `start()` 時，只會產生一個程序；第二個呼叫者會等待，
並回傳現有狀態。這可避免例如自動啟動與 UI 按鈕同時觸發時產生競爭條件。

---

## 4. API 參考

`/api/services/` 下的所有路由均為 **LOCAL_ONLY**（僅限迴環介面，強制規則 #17）。
無論驗證權杖為何，非迴環請求都會收到 `403 LOCAL_ONLY`。

### 4.1 9Router 端點（11 條路由）

#### `POST /api/services/9router/install`

從 npm 安裝 9Router。建立包含其自有 `package.json` 和 `node_modules/` 的
`DATA_DIR/services/9router/`。不會與 OmniRoute 自身的相依套件衝突。

**請求本文**（全部為選填）：

```json
{ "version": "latest" }
```

| 欄位      | 類型     | 預設值     | 說明                           |
| --------- | -------- | ---------- | ------------------------------ |
| `version` | `string` | `"latest"` | 要安裝的 npm 版本標籤或 semver |

**回應：**

| 狀態碼 | 說明                                                   |
| ------ | ------------------------------------------------------ |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }` |
| `400`  | 無效的請求本文（Zod 驗證失敗）                         |
| `409`  | 已在安裝中（鎖定已被持有）                             |
| `500`  | npm 安裝失敗 — 參閱 `message` 以取得易懂的錯誤訊息     |

**注意事項：** 使用 `execFile('npm', [...])` — 不使用 shell，也不進行插值（強制規則 #13）。
EACCES 錯誤會以易懂的訊息顯示。

---

#### `POST /api/services/9router/start`

啟動 9Router。若尚未註冊監督器，則先註冊，然後呼叫
`supervisor.start()`。服務已在執行時，此操作具冪等性。

**請求本文：** 無

**回應：**

| 狀態碼 | 說明                                          |
| ------ | --------------------------------------------- |
| `200`  | `ServiceStatus` 物件（參閱下方結構描述）      |
| `409`  | 尚未安裝 9Router（`status: "not_installed"`） |
| `503`  | 啟動失敗（處理程序錯誤 — 參閱 `lastError`）   |

**ServiceStatus 結構描述：**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

正常停止 9Router。傳送 SIGTERM，等待 15 秒，若仍在執行則傳送 SIGKILL。
服務已停止時，此操作具冪等性。

**請求本文：** 無

**回應：**

| 狀態碼 | 說明                                |
| ------ | ----------------------------------- |
| `200`  | `ServiceStatus`（state: "stopped"） |
| `503`  | 停止操作意外失敗                    |

---

#### `POST /api/services/9router/restart`

等同於在操作鎖定下依序執行 `stop()` 和 `start()`。

**請求本文：** 無

**回應：** 與 `start` 相同（傳回最終的 `ServiceStatus`）。

---

#### `POST /api/services/9router/update`

將 9Router 更新至較新的 npm 版本。若服務正在執行，會先將其停止，
接著執行 npm 安裝（就地安裝較新的版本），然後重新啟動服務。

**請求本文**（全部為選填）：

```json
{ "version": "latest" }
```

**回應：**

| 狀態碼 | 說明                                                            |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | 無效的本文                                                      |
| `500`  | npm 更新失敗                                                    |

---

#### `POST /api/services/9router/rotate-key`

為 9Router 產生新的 API 金鑰、加密靜態儲存，並重新啟動服務
（若正在執行），使其從環境中取得新金鑰。舊金鑰會立即失效。

**請求本文：** 無

**回應：**

| 狀態碼 | 說明                                       |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | 輪替失敗                                   |

**安全性：** 回應中絕不會傳回新金鑰（避免憑證洩漏）。
該金鑰會以加密形式（AES-256-GCM）儲存在 `version_manager` 資料表中。

---

#### `GET /api/services/9router/status`

傳回合併的即時 + 資料庫狀態，包括版本中繼資料和 API 金鑰預覽。

**回應：**

| 狀態碼 | 說明             |
| ------ | ---------------- |
| `200`  | 參閱下方結構描述 |
| `500`  | 狀態讀取失敗     |

**回應結構描述：**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

切換自動啟動旗標。當 `enabled: true` 時，OmniRoute 下次啟動時會自動啟動此服務
（前提是已安裝該服務）。

**請求本文：**

```json
{ "enabled": true }
```

**回應：**

| 狀態碼 | 說明                  |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | 無效的本文            |

---

#### `GET /api/services/9router/logs`

來自 9Router stdout/stderr 環形緩衝區的即時日誌 SSE 串流。

**查詢參數：**

| 參數     | 類型      | 預設值 | 說明                                                      |
| -------- | --------- | ------ | --------------------------------------------------------- |
| `tail`   | `integer` | 200    | 一開始要傳送的歷史行數（上限 1000）                       |
| `filter` | `string`  | 無     | 不區分大小寫的子字串篩選器（不使用 regex — 可避免 ReDoS） |

**SSE 事件：**

| 事件        | 資料        | 說明                 |
| ----------- | ----------- | -------------------- |
| `snapshot`  | `LogLine[]` | 初始歷史尾端內容     |
| `log`       | `LogLine`   | 即時日誌行           |
| `heartbeat` | `{}`        | 每 15 秒保持連線一次 |

**LogLine 結構描述：**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**回應：**

| 狀態  | 說明                              |
| ----- | --------------------------------- |
| `200` | `text/event-stream`               |
| `400` | `filter` 參數過長（> 200 個字元） |
| `404` | 找不到服務（supervisor 未註冊）   |

---

### 4.2 CLIProxyAPI 端點（10 條路由）

CLIProxyAPI 的端點形式與 9Router 相同，但不包含 `rotate-key`，並另外提供
`accounts`、`provider-expose` 和 `auto-restart-adopted`。它現在會接收一個
在啟動時注入的專用資料平面 API 金鑰（`bootstrap.ts` 中的 `needsApiKey: true`，
用於模型同步）；`status` 包含的欄位較少。

| 方法   | 路徑                                | 說明                                  |
| ------ | ----------------------------------- | ------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | 從 npm 安裝 CLIProxyAPI               |
| `POST` | `/api/services/cliproxy/start`      | 啟動 CLIProxyAPI                      |
| `POST` | `/api/services/cliproxy/stop`       | 停止 CLIProxyAPI                      |
| `POST` | `/api/services/cliproxy/restart`    | 重新啟動 CLIProxyAPI                  |
| `POST` | `/api/services/cliproxy/update`     | 更新至較新版本                        |
| `GET`  | `/api/services/cliproxy/status`     | 即時 + DB 狀態（不含 `apiKeyMasked`） |
| `POST` | `/api/services/cliproxy/auto-start` | 切換自動啟動                          |

共用的 `GET /api/services/{name}/logs` 端點（請參閱 §4.1）透過 `[name]`
動態區段支援全部四項服務。

---

### 4.3 Mux 端點（8 條路由）

Mux 的端點形式與 CLIProxyAPI 相同——API 介面中沒有 `rotate-key` 路由
（bearer token 的產生方式與 9Router 相同，透過 `getOrCreateApiKey("mux")`
產生並經由 `MUX_SERVER_AUTH_TOKEN` 環境變數注入，但目前尚未提供專用的輪替端點）。
Mux 僅受生命週期管理：與 9Router 不同，它沒有第 4 層執行器，也永遠不會註冊為路由提供者。

| 方法   | 路徑                           | 說明                           |
| ------ | ------------------------------ | ------------------------------ |
| `POST` | `/api/services/mux/install`    | 從 npm 安裝 Mux（`npm i mux`） |
| `POST` | `/api/services/mux/start`      | 啟動 Mux（`mux server`）       |
| `POST` | `/api/services/mux/stop`       | 停止 Mux                       |
| `POST` | `/api/services/mux/restart`    | 重新啟動 Mux                   |
| `POST` | `/api/services/mux/update`     | 更新至較新的 npm 版本          |
| `GET`  | `/api/services/mux/status`     | 即時 + DB 狀態                 |
| `POST` | `/api/services/mux/auto-start` | 切換自動啟動                   |

---

### 4.4 Bifrost 端點（8 條路由）

Bifrost 是 Go AI 閘道中繼後端（`@maximhq/bifrost`）。它使用與 CLIProxyAPI 相同的
端點形式（沒有 `rotate-key`——Bifrost 會在其 `-app-dir` 下的 `config.json`
中管理自己的提供者金鑰）。

| 方法   | 路徑                               | 說明                                                  |
| ------ | ---------------------------------- | ----------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | 從 npm 安裝 Bifrost（`@maximhq/bifrost`）             |
| `POST` | `/api/services/bifrost/start`      | 在連接埠 8080（預設）上啟動 Bifrost                   |
| `POST` | `/api/services/bifrost/stop`       | 停止 Bifrost                                          |
| `POST` | `/api/services/bifrost/restart`    | 重新啟動 Bifrost                                      |
| `POST` | `/api/services/bifrost/update`     | 更新至較新版本                                        |
| `GET`  | `/api/services/bifrost/status`     | 即時 + DB 狀態                                        |
| `POST` | `/api/services/bifrost/auto-start` | 切換自動啟動                                          |
| `GET`  | `/api/services/bifrost/logs`       | SSE 日誌尾端串流（透過共用的 `[name]/logs` 動態路由） |

**路由連接：** 當未設定 `BIFROST_BASE_URL` 且受監管的 Bifrost
執行個體正在執行時，`getBifrostRoutingConfig()`（位於 `routingBackend.ts`）
會自動使用 `http://127.0.0.1:{port}` 作為中繼基底 URL。明確設定的
`BIFROST_BASE_URL` 環境變數一律具有優先權。

---

### 4.5 Dario 端點（12 條路由）

生命週期形式與其他服務相同（`install`、`start`、`stop`、`restart`、
`update`、`status`、`auto-start`、`auto-restart-adopted`），並在 `admin/`
下提供受 token 保護的 OAuth 控制平面：`admin/accounts`、
`admin/import-from-omniroute`、`admin/login-start`、`admin/login-complete`
（全部受 `DARIO_ADMIN_TOKEN` 保護）。

### 4.6 open-wa 端點（7 條路由）

open-wa（`@open-wa/wa-automate`）會驅動無頭 Chromium 執行個體（透過
Puppeteer）來自動化 WhatsApp Web。它使用與 Mux 相同的端點形式（目前沒有
`rotate-key` 路由）。它僅受生命週期管理——不是路由目標，也沒有第 4 層
執行器／提供者項目。

| 方法   | 路徑                              | 說明                                                  |
| ------ | --------------------------------- | ----------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | 從 npm 安裝 open-wa（`@open-wa/wa-automate`）         |
| `POST` | `/api/services/openwa/start`      | 在連接埠 8323（預設）啟動 open-wa                     |
| `POST` | `/api/services/openwa/stop`       | 停止 open-wa                                          |
| `POST` | `/api/services/openwa/restart`    | 重新啟動 open-wa                                      |
| `POST` | `/api/services/openwa/update`     | 更新至較新版本                                        |
| `GET`  | `/api/services/openwa/status`     | 即時狀態 + 資料庫狀態                                 |
| `POST` | `/api/services/openwa/auto-start` | 切換自動啟動                                          |
| `GET`  | `/api/services/openwa/logs`       | SSE 日誌尾端串流（透過共用的 `[name]/logs` 動態路由） |

**API 金鑰：** 以 `WA_KEY` 注入——open-wa 的通用 `WA_*` 前綴環境變數
覆寫機制會將其對應至 `--key`/`-k` CLI 選項
（`dist/cli/setup.js::envArgs()`，已針對已安裝的 4.76.0
套件完成驗證）。由 `generateServiceApiKey()` 產生時，會加上 `ow_` 前綴。open-wa
會從 `key`/`api_key` HTTP 標頭讀取金鑰（而非 `Authorization:
Bearer`）；`/api-docs*` 已明確免除此檢查
（`dist/cli/server.js` 中的 `setupAuthenticationLayer`），因此健康狀態探測
不需要驗證標頭。

**配對：** open-wa 是非官方工具，且與 WhatsApp 無關——
已連線的號碼可能因 WhatsApp 自身的自動化偵測而遭封鎖。
首次啟動時，配對 QR 碼會輸出至 stdout，並透過
現有的日誌面板/SSE 串流顯示——此整合目前尚無專用的 QR 圖片端點。

---

### 4.7 反向代理（9Router 儀表板嵌入）

儀表板透過位於以下位置的內部反向代理，將 9Router 網頁 UI 嵌入 iframe：

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

此代理會：

- 將請求轉送至 `http://127.0.0.1:{port}/{path}`（僅限迴路介面）
- 移除傳入的 `cookie` 與 `authorization` 標頭（避免 OmniRoute 工作階段洩漏）
- 注入 `Authorization: Bearer {apiKey}`，用於 9Router 驗證
- 從回應中移除 `set-cookie`、`content-security-policy`、`x-frame-options`、`cross-origin-*`
- 重寫 HTML 回應，以注入 `<base href>` 並正規化絕對路徑（`/foo` → `/dashboard/.../embed/foo`）

嵌入式儀表板的 WebSocket 升級由專用連接埠上的輔助伺服器處理
（請參閱 `src/lib/services/embedWsProxy.ts`）。

**安全性：** 嵌入代理路由歸類於 `LOCAL_ONLY_API_PREFIXES`，
且只能從迴路介面存取。即使攻擊者透過
Cloudflare/Ngrok 通道取得 JWT，也無法代理存取嵌入式服務。

---

## 5. 安全性

### LOCAL_ONLY 強制執行（硬性規則 #17）

`/api/services/` 與 `/dashboard/providers/services/*/embed/` 下的所有路由，在 `src/server/authz/routeGuard.ts` 中皆被分類為 LOCAL_ONLY。迴送位址檢查會在任何驗證分支之前無條件執行：

```
請求抵達
  → isLocalOnlyPath(path)?
      → 非迴送位址 → 403 LOCAL_ONLY（永遠在驗證檢查之前）
      → 迴送位址   → 繼續執行一般驗證
```

這可防止洩漏的 JWT（例如透過隧道）觸發 `npm install` 或衍生程序。完整的層級矩陣請參閱 `docs/security/ROUTE_GUARD_TIERS.md`。

### API 金鑰注入

9Router 與 Mux 的 HTTP 端點需要 API 金鑰／Bearer 權杖。OmniRoute：

1. 使用 `crypto.randomBytes(32).toString("base64url")` 產生金鑰，並加上服務專用前綴（9Router 使用 `nr_`，Mux 使用 `mx_`）。
2. 使用 AES-256-GCM 將其加密後靜態儲存（與提供者憑證使用相同的密碼）。
3. 在衍生程序時解密並注入為環境變數——9Router 使用 `NINEROUTER_API_KEY`，Mux 使用 `MUX_SERVER_AUTH_TOKEN`（絕不使用 CLI 旗標，因此權杖絕不會出現在 `ps`／程序清單中）。
4. 絕不在任何 HTTP 回應中傳回明文金鑰。

CLIProxyAPI 會在衍生程序時接收專用的資料平面金鑰（`needsApiKey: true`——用於透過轉接器同步模型）。

### SSRF 防禦

反向 HTTP Proxy（`/dashboard/.../embed/[...path]`）已硬式編碼為僅轉送至 `http://127.0.0.1:{port}`。它絕不會跟隨重新導向至非迴送位址的目的地。系統使用 `ssrf-req-filter` 程式庫拒絕任何解析至迴送位址範圍之外的上游 URL。

### Shell 安全性（硬性規則 #13）

`npm install` 透過 `execFile('npm', ['install', pkg, '--prefix', dir])` 呼叫——不使用範本字面值、不使用 Shell，也不會將外部路徑插入命令字串。執行階段值（連接埠、API 金鑰）會透過子程序的 `env` 物件傳遞。

### 錯誤清理（硬性規則 #12）

來自 `/api/services/*` 的所有錯誤回應都會經過 `buildErrorBody()` 或 `sanitizeErrorMessage()`。原始的 `err.stack` 與 `err.message` 絕不會逐字傳回給呼叫者。

---

## 6. 新增嵌入式服務

請依照以下 8 個步驟操作。請以 `src/lib/services/installers/` 與 `src/app/api/services/` 中的現有實作作為標準參考。

### 步驟 1——建立安裝程式

以 `ninerouter.ts` 為範本建立 `src/lib/services/installers/{name}.ts`：

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // 選擇一個未使用的連接埠

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

使用 `installers/utils.ts` 中的 `runNpm(['install', NAME_PACKAGE, '--prefix', dir])`——絕不可使用 `execSync` 或 Shell 插值。

### 步驟 2——在啟動程序中註冊

在 `src/lib/services/bootstrap.ts` 的 `SERVICES` 陣列中新增一個 `ServiceEntry`：

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // 若不需要 API 金鑰則設為 false
}
```

擴充 `buildSpawnArgsFactory()`，使其能處理 `cfg.tool === "myservice"`。

#### 可插拔的提供者外掛契約（階段 1，#7333）

`src/lib/services/providerPlugins/` 引入了 `ServiceProviderPlugin` 契約，將後端的 `bootstrap.ts` `ServiceEntry` 欄位與 `serviceBackends.ts` 資訊清單範本欄位封裝成單一物件，而不是在兩個互不相關的檔案中分別表達同一個後端的結構。截至本文撰寫時，**只有 `9router` 已完成遷移**——`bootstrap.ts` 會從 `getServiceProviderPlugin("9router")`（`src/lib/services/providerPlugins/registry.ts`）衍生其 `SERVICES[]` 項目；若此外掛不存在，便會擲回啟動錯誤。`cliproxy`、`mux` 與 `bifrost` 則維持使用原有的行內 `SERVICES[]` 常值，不作變更。

`open-sse/config/providerPluginManifest.ts` 也新增了附加的 `createServiceBackendManifestEntry(pluginId, template)` 輔助函式，可根據 `SERVICE_BACKEND_MANIFEST_TEMPLATE` 項目建立格式正確的 `ProviderPluginManifestEntry`——目前它**尚未**連接至任何實際請求路徑（包括 `generateProviderPluginManifestFromRegistry()` 與 `/v1/providers/[provider]/models`）；待此契約在第二個後端上獲得驗證後，才會於後續工作中完成。

以下項目已延後至後續 PR，並由議題 #7333 追蹤：透過相同登錄機制遷移 `cliproxyapi`、將 `mux`／`bifrost` 泛化至 `ServiceBackendPluginId` 聯集、將執行器路由的特殊處理（`open-sse/executors/index.ts`、`open-sse/handlers/chatCore/executorProxy.ts`）納入外掛契約，以及將 `createServiceBackendManifestEntry()` 連接至實際的資訊清單／模型程式碼路徑。

### 步驟 3——新增遷移與資料庫種子資料

透過 `src/lib/db/migrations/` 中的遷移，確保服務在 `version_manager` 中有一筆資料。該資料列應包含：

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### 步驟 4——建立 7 個 API 端點

在 `src/app/api/services/{name}/` 下建立：

```
_lib.ts            getOrInitSupervisor() 輔助函式
install/route.ts   POST——呼叫 installer.install()
start/route.ts     POST——呼叫 supervisor.start()
stop/route.ts      POST——呼叫 supervisor.stop()
restart/route.ts   POST——呼叫 supervisor.restart()
update/route.ts    POST——呼叫 installer.update()
status/route.ts    GET——合併即時狀態與資料庫狀態
auto-start/route.ts POST——切換 auto_start 旗標
```

共用的 `GET /api/services/[name]/logs` 路由已完成連接——無需在此進行任何變更。

所有錯誤回應皆委派給 `createErrorResponse()` / `buildErrorBody()` 處理。

### 步驟 5 — 新增至 LOCAL_ONLY_API_PREFIXES

在 `src/server/authz/routeGuard.ts` 中，確認 `/api/services/` 已列於其中。
若引入新的前綴（例如 `/api/tools/`），請將其新增至
`LOCAL_ONLY_API_PREFIXES`；若其會產生程序，也請新增至 `SPAWN_CAPABLE_PREFIXES`。
在 `tests/unit/authz/routeGuard.test.ts` 中新增測試。

### 步驟 6 — 新增 UI 分頁

建立 `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`。
重複使用共用元件：

- `ServiceStatusCard` — 即時狀態 + 健康狀態徽章
- `ServiceLifecycleButtons` — 啟動 / 停止 / 重新啟動 / 更新
- `ServiceLogsPanel` — SSE 日誌尾端串流（連線至 `/api/services/{name}/logs`）
- `ApiKeyCard` — 顯示 + 輪替金鑰（若 `needsApiKey: true`）

在 `ServicesPageShell.tsx` 中註冊此分頁。

### 步驟 7 — 新增提供者項目（若服務是路由目標）

若內嵌服務公開與 OpenAI 相容的 `/v1/chat/completions` 端點：

1. 在 `src/shared/constants/providers.ts` 中新增提供者項目，並設置 `isEmbeddedService: true`。
2. 建立繼承 `BaseExecutor` 的 `open-sse/executors/{name}.ts`。每次請求都要重新查詢連接埠和
   API 金鑰（切勿在建構函式中快取）。當監督器狀態不是 `"running"` 時，回傳 `503 service_not_running`
   回應。
3. 在 `open-sse/config/providerRegistry.ts` 中使用服務前綴註冊模型
   （例如 `myservice/sub/model`）。`modelSync.ts` 會使其保持更新。

### 步驟 8 — 撰寫文件並測試

1. 更新 `docs/frameworks/EMBEDDED-SERVICES.md`（本文件）——將服務新增至
   §1 的表格，並將任何新端點新增至 §4。
2. 在 `tests/unit/services/` 中新增單元測試（生命週期、安裝程式、API 結構）。
3. 在 `tests/integration/services/` 中新增整合測試（置於 `RUN_SERVICES_INT=1` 開關之後）。
4. 以新端點更新 `docs/openapi.yaml`。

---

## 7. 疑難排解

### 服務無法啟動

**症狀：** 啟動按鈕傳回 503，狀態維持在 `"error"` 或 `"starting"`。

**檢查清單：**

1. 檢查 `GET /api/services/{name}/logs`（或儀表板中的「記錄」面板）。尋找類似 `Error: ENOENT`、`address already in use` 或 `Cannot find module` 的內容。
2. 確認 `npm` 位於 PATH 中：使用執行 OmniRoute 的同一使用者帳戶執行 `which npm`。
3. 確認服務已安裝：檢查 `GET /api/services/{name}/status` 中的 `installedVersion`。如果是 `null`，請先執行安裝。
4. 檢查 `DATA_DIR/services/{name}/node_modules/` 是否存在且並非空目錄。
5. 檢查狀態回應中的 `lastError` 欄位，以取得經過清理的結束原因。

---

### 冷啟動速度緩慢（超過 10 秒才達到 `running`）

**症狀：** 狀態長時間維持在 `"starting"`，之後才變為 `"running"` 或 `"error"`。

**說明：** 9Router 的冷啟動過程包含匯入大型相依性樹狀結構（DNS、隧道、MITM 模組）。預設的健康檢查間隔為 2 秒，在監督程式宣告逾時前會嘗試 3 次（但仍會繼續輪詢）。

**修正方法：** `healthIntervalMs` 和 `waitForHealthy` 逾時值（`healthIntervalMs * 3`）可在 `bootstrap.ts` 中設定。對於需要較長啟動時間的服務，請將 `healthIntervalMs` 增加至 5000，並將 `stopTimeoutMs` 增加至 30 000。

---

### 連接埠衝突（`EADDRINUSE`）

**症狀：** 記錄顯示 `address already in use :::20130`。

**原因：**

- 另一個程序已在使用連接埠 20130。
- 先前的 9Router 程序未完全停止（殭屍 PID）。

**修正方法：**

1. 透過 `.env` 中的 `NINEROUTER_PORT` 環境變數變更預設連接埠。
2. 找出並終止衝突的程序：`lsof -ti :20130 | xargs kill -9`。
3. 可透過 `bootstrap.ts` 中的 `port` 欄位，為每個服務設定連接埠。

**注意：** 9Router 特別預設使用連接埠 20130，以避免與 OmniRoute 的預設連接埠 20128 衝突。

---

### 安裝時權限遭拒（EACCES）

**症狀：** 安裝傳回 500，記錄顯示 `EACCES` 或 `permission denied`。

**原因：**

- OmniRoute 程序無法寫入 `DATA_DIR` 或其父目錄。
- 在無根 Docker 中執行，但沒有對映磁碟區的寫入權限。

**修正方法：**

1. 檢查 `DATA_DIR`（預設值：`~/.omniroute/`）：`ls -la ~/.omniroute/`
2. 確保 OmniRoute 程序的使用者擁有該目錄：`chown -R $USER ~/.omniroute/`
3. 在 Docker 中，確保磁碟區掛載具有適用於容器使用者的正確權限。

---

### 更新失敗（`npm install` 逾時或網路錯誤）

**症狀：** 更新傳回 500 並顯示 `InstallError`，記錄顯示網路逾時。

**檢查清單：**

1. 確認可連線至 npm registry：`npm ping`。
2. 檢查企業代理伺服器：`npm config get proxy`、`npm config get https-proxy`。
3. 嘗試手動安裝：`npm install {package}@latest --prefix ~/.omniroute/services/{name}/`。
4. 如果環境與外部網路隔離，請預先下載 tarball，然後使用 `npm install /path/to/tarball.tgz`。

---

### 服務在啟動後立即顯示 `"error"` 狀態（快速崩潰）

**症狀：** 狀態在 5 秒內從 `"starting"` 轉為 `"error"`。`lastError` 顯示 `"Fast crash (exited with code 1)"`。

**檢查清單：**

1. 讀取完整的記錄尾端內容：`GET /api/services/{name}/logs?tail=500`。
2. 常見原因：缺少服務所需的環境變數。
3. 對於 9Router：確認產生程序時傳入的環境中包含 `NINEROUTER_DISABLE_MITM=true` 和 `NINEROUTER_DISABLE_TUNNEL=true`（請參閱 `installers/ninerouter.ts` 中的 `resolveSpawnArgs`）。

---

## 8. 常見問題

**問：我可以將嵌入式服務端點公開給非迴路介面用戶端嗎？**

不可以。LOCAL_ONLY 層級是刻意如此設計的（硬性規則 #17）。可呼叫
`npm install` 或產生 `node` 程序的路由不得讓非迴路介面流量存取，
否則透過通道（Cloudflare、Ngrok、Tailscale）洩漏的 JWT 將可能允許
任意產生程序。`/api/services/` 沒有可選擇退出此限制的例外；與
`/api/mcp/` 不同，它不在 manage 範圍略過清單中。請參閱
`docs/security/ROUTE_GUARD_TIERS.md`。

---

**問：9Router 和 CLIProxyAPI 可在正式環境／雲端部署中使用嗎？**

可以。這兩項服務都遵循與 OmniRoute 本身相同的本機優先模型。它們在
同一台機器上執行，並透過迴路介面通訊。此處的「正式環境」是指部署
OmniRoute 的 VPS 或本機伺服器，而非遠端雲端提供者。

---

**問：如何偵錯監督器？**

1. 持續查看 SSE 日誌串流：`curl -N http://localhost:20128/api/services/9router/logs`。
2. 在 OmniRoute 的 pino 輸出中檢查結構化日誌，並依
   `service:supervisor` 命名空間篩選。
3. 檢查資料庫資料列：`sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`。
4. 使用 `GET /api/services/9router/status`，透過單次呼叫查看目前的即時狀態、PID、健康狀況
   和 `lastError`。

---

**問：監督器顯示 `health: "degraded"` 或 `health: "unknown"`，但狀態是 `"running"`。這有問題嗎？**

`"degraded"` 表示健康狀況探測傳回非 200 回應。`"unknown"` 表示尚未有
任何探測完成（與第一次輪詢發生競爭狀況）。在啟動期間，這兩種狀況都是暫時的。
若進入 `"running"` 後，健康狀況維持 `"degraded"` 超過
`healthIntervalMs * 3` 毫秒，表示嵌入式服務正在執行，但其 HTTP API 沒有回應。請檢查
狀態回應中的連接埠是否正確，以及服務是否確實正在該連接埠上接聽。

---

**問：我可以在不完整重新啟動的情況下變更 9Router API 金鑰嗎？**

不可以。API 金鑰會在產生程序時，透過環境變數傳遞給 9Router。
執行中程序的環境變數無法變更。`POST .../rotate-key`
會自動停止並重新啟動服務，以套用新金鑰。金鑰輪替會在服務的
`stopTimeoutMs`（預設為 15 秒）加上其啟動時間內生效。

---

**問：環形緩衝區的限制是多少？填滿後會發生什麼事？**

每項服務都有專用的 5 MB 環形緩衝區。緩衝區填滿後，最舊的
日誌行會被移除，以便為新的日誌行騰出空間。SSE `snapshot` 事件會傳回
`tail` 限制範圍內最新的日誌行。除非資料庫資料列中設定了
`logsBufferPath`，否則日誌不會持久化至磁碟。

---

## 另請參閱

- `docs/security/ROUTE_GUARD_TIERS.md` — LOCAL_ONLY 層級的詳細資訊
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 嵌入式服務模組對應
- `docs/architecture/ARCHITECTURE.md` — 系統層級的背景資訊
- `docs/openapi.yaml` — 機器可讀的端點定義
- `CLAUDE.md` §「新增嵌入式服務」— 快速參考檢查清單
