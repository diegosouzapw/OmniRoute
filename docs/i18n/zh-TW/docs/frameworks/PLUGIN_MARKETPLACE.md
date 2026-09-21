# Plugin Marketplace (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **真實來源：** `src/lib/plugins/`（`marketplace.ts`、`manager.ts`、`manifest.ts`、
> `scanner.ts`、`loader.ts`）、`src/app/api/plugins/`，以及
> `src/app/(dashboard)/dashboard/plugins/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 隨附一套 WordPress 風格的外掛系統。外掛是自包含的目錄——每個目錄都有一份 `plugin.json` 資訊清單與一個進入點檔案——可掛接至請求管線（`onRequest` / `onResponse` / `onError`）及生命週期事件（`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`）。

**外掛市集**是建構於該系統之上的探索層。它提供可供瀏覽的可安裝外掛目錄。預設情況下，該目錄使用一個小型的內建種子登錄檔；操作人員可以將其指向自訂的遠端登錄檔 URL，在此情況下，擷取作業會受到具備 DNS 解析功能的 SSRF 防護機制保護（請參閱[安全性](#security)）。

每個外掛路由皆**僅限迴路位址**（第 1 層級 — `LOCAL_ONLY`）：外掛會在子行程中載入並執行程式碼，因此無論驗證狀態如何，都無法從非迴路來源存取這些路由。請參閱
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)。

## 整體運作方式

```
儀表板 (/dashboard/plugins)
  ├─「已安裝」分頁 → GET /api/plugins            (listPlugins)
  │                  POST /api/plugins/scan      (pluginManager.scan)
  │                  POST /api/plugins/{name}/activate|deactivate
  │                  DELETE /api/plugins/{name}   (解除安裝)
  └─「市集」分頁     → GET /api/plugins/marketplace
                        → listMarketplacePlugins()
                          ├─ 無自訂 URL → 內建 SEED_REGISTRY
                          └─ 自訂 URL → isSafeMarketplaceUrl() SSRF 防護
                                      → safeOutboundFetch(guard:"public-only")
```

- **登錄層** — `src/lib/plugins/marketplace.ts`：列出／搜尋目錄，發生任何失敗時皆回退至種子登錄檔。
- **生命週期層** — `src/lib/plugins/manager.ts`（`pluginManager` 單例）：安裝、升級、啟用、停用、解除安裝、掃描、啟動時載入。
- **資訊清單層** — `src/lib/plugins/manifest.ts`：`plugin.json` 的 Zod 結構描述與預設值。
- **掃描器** — `src/lib/plugins/scanner.ts`：探索外掛目錄下磁碟中的外掛。
- **載入器** — `src/lib/plugins/loader.ts`：在隔離的子行程中啟動各外掛，並透過 IPC 代理掛鉤呼叫。

## 市集目錄

`listMarketplacePlugins()`（`src/lib/plugins/marketplace.ts`）會傳回
`MarketplaceEntry` 物件的清單：

| 欄位          | 類型     | 備註                     |
| ------------- | -------- | ------------------------ |
| `name`        | string   | kebab-case 外掛名稱      |
| `version`     | string   | semver                   |
| `description` | string   | 簡短摘要                 |
| `author`      | string   | 作者／組織               |
| `license`     | string   | SPDX 風格的授權條款 ID   |
| `downloadUrl` | string   | 來源下載 URL（可為空白） |
| `repository`  | string?  | 選用的儲存庫 URL         |
| `tags`        | string[] | 搜尋／篩選標籤           |
| `downloads`   | number   | 下載次數                 |
| `rating`      | number   | 0–5                      |
| `verified`    | boolean  | 該項目是否標示為已驗證   |
| `lastUpdated` | string   | 類 ISO 日期字串          |

未設定自訂登錄檔 URL 時，目錄會使用內建的 `SEED_REGISTRY`（目前包含 `request-logger`、`rate-limiter`、`cost-tracker` 與 `theme-manager`）。種子登錄檔永遠可用——如果已設定的遠端登錄檔無法連線、傳回非 `200` 狀態，或傳回無法辨識的內容，`listMarketplacePlugins()` 會記錄警告並回退至種子清單。

> 注意：市集**目錄**（瀏覽／搜尋）已完成端對端串接，但從目錄一鍵**安裝**市集外掛的功能尚未實作——目前儀表板中市集項目的「安裝」按鈕只會顯示「即將推出」通知。目前的安裝方式是透過本機路徑安裝流程（`POST /api/plugins`）及磁碟探索（`POST /api/plugins/scan`）。

## REST API

所有端點都需要管理驗證（`requireManagementAuth`），**而且**僅限迴路位址存取 — `/api/plugins` 和 `/api/plugins/` 均列於
`LOCAL_ONLY_API_PREFIXES`（`src/server/authz/routeGuard.ts`）中。

| 端點                             | 方法   | 說明                                             |
| -------------------------------- | ------ | ------------------------------------------------ |
| `/api/plugins`                   | GET    | 列出已安裝的外掛程式（可使用 `?status=` 篩選器） |
| `/api/plugins`                   | POST   | 從絕對本機路徑安裝外掛程式                       |
| `/api/plugins/scan`              | POST   | 掃描外掛程式目錄並註冊新的外掛程式               |
| `/api/plugins/marketplace`       | GET    | 列出市集目錄項目                                 |
| `/api/plugins/[name]`            | GET    | 取得已安裝外掛程式的詳細資料                     |
| `/api/plugins/[name]`            | DELETE | 解除安裝外掛程式                                 |
| `/api/plugins/[name]/activate`   | POST   | 啟用（載入並註冊掛鉤）                           |
| `/api/plugins/[name]/deactivate` | POST   | 停用（觸發 `onDeactivate` 並取消註冊掛鉤）       |
| `/api/plugins/[name]/config`     | GET    | 取得外掛程式設定與設定結構描述                   |
| `/api/plugins/[name]/config`     | PUT    | 更新外掛程式設定（依照結構描述進行驗證）         |

`GET /api/plugins` 的 `status` 篩選器接受以下其中一個值：
`installed` / `active` / `inactive` / `error`。無效值會傳回 `400`。

### 列出已安裝的外掛程式

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### 從本機路徑安裝

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` 必須是**絕對路徑**，且不得包含 `..` 路徑遍歷片段或 Null 位元組（由 Zod 強制執行）。來源目錄必須包含有效的
`plugin.json`（或是包含該檔案之目錄的父目錄）。成功時，回應為 `201`，並包含已安裝的外掛程式資料列。

### 瀏覽市集

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### 更新外掛程式設定

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` 會依據外掛程式的 `configSchema`（於資訊清單中宣告）驗證每個提供的值：`number` 欄位會遵循 `min`/`max`，
`select` 欄位必須符合宣告的 `enum`。結構描述中不存在的鍵可直接通過。

## 設定

### 外掛程式目錄

外掛程式位於 OmniRoute 資料目錄下：

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          #（或 manifest.main 指向的任何檔案）
```

`getDefaultPluginDir()`（`src/lib/plugins/scanner.ts`）會分三個步驟解析該目錄：

1. **`OMNIROUTE_PLUGINS_DIR`**，若已設定 — 無論 `HOME` 為何，皆會逐字採用。這是 Docker/K8s 的明確設定選項；在這些環境中，外掛程式目錄樹會繫結掛載至通常與容器主目錄無關的路徑（#11827）。
2. `<home>/.omniroute/plugins`，其中 `<home>` 來自 `HOME` / `USERPROFILE` 環境變數。
3. `/tmp/.omniroute/plugins`，當程序完全未匯出主目錄時使用。

解析出的目錄會在啟動時以 `scanner.dir_resolved` 記錄一次，並指出最後採用的輸入（`OMNIROUTE_PLUGINS_DIR`、`home` 或 `no-home-fallback`）— 因此，若映像檔無聲地落到步驟 3，記錄會明確指出此情況，而不只是回報空的外掛程式清單。
`POST /api/plugins/scan` 會探索該目錄下任何包含有效
`plugin.json` 的子目錄並加以註冊；同一目錄也是
`pluginManager.install()` 複製外掛程式時使用的根目錄，因此覆寫此目錄會同時移動探索與安裝位置。

> **`OMNIROUTE_PLUGINS_DIR` 並不是 `OMNIROUTE_PLUGIN_PATH`。** 後者僅由
> CLI 命令外掛程式載入器（`bin/cli/plugins.mjs`）讀取，用來尋找會新增 `omniroute` 子命令的 `omniroute-cmd-*` npm
> 套件 — 它不會影響此處所述的執行階段掃描器。相關部分請參閱 [PLUGINS.md](./PLUGINS.md)。

### 自訂市集登錄 URL

市集目錄來源讀取自 `pluginMarketplaceUrl` 設定
（`src/lib/plugins/marketplace.ts` 會讀取 `settings.pluginMarketplaceUrl`）。當其設為 `http(s)` URL 時，`listMarketplacePlugins()` 會擷取該 URL，並接受頂層為項目 JSON 陣列，或包含 `plugins` 陣列的物件；不含字串 `name` 的項目會被篩除。若未設定（或擷取未通過 SSRF 防護／傳回不良回應），則會使用內建的種子登錄。

儀表板的「Marketplace」分頁提供此 URL 的欄位（從
`GET /api/settings` 讀回）。

> 實作注意事項：儀表板的「Save」動作會將
> `pluginMarketplaceUrl` 傳送至 `PATCH /api/settings`。截至撰寫本文時，此
> 鍵尚未在 `updateSettingsSchema`
> （`src/shared/validation/settingsSchemas.ts`）中宣告，因此在依賴它之前，請先確認您所使用版本中的持久化行為 — 一旦該鍵存在於設定儲存區中，**讀取**路徑（`getSettings()` →
> `listMarketplacePlugins()`）便會遵循該鍵。

## 安全性

### 路由層級 — 僅限迴路介面

外掛程式會在衍生的子行程中執行程式碼，因此整個 `/api/plugins`
介面均歸類為 `LOCAL_ONLY`（第 1 層）。迴路介面限制會無條件地在任何驗證檢查**之前**執行，因此即使外洩的管理權杖透過通道傳入該主機，仍無法安裝、啟用或解除安裝外掛程式。
請參閱 [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) 以及
強制規則 #15 / #17。

### 市集登錄檔 SSRF 防護

自訂登錄檔 URL 是可能受攻擊者影響的設定，因此在擷取之前，`listMarketplacePlugins()` 會讓它通過兩層防護：

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`)：
   - 拒絕任何不是 `http:` / `https:` 的內容。
   - 透過標準的 `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) 拒絕字面形式的私有／迴路／鏈路本機／ULA 主機（IPv4 **及** IPv6，包括 IPv4 映射位址）。
   - 解析 `A` 與 `AAAA` 記錄，並在**任何**已解析位址為私有位址時拒絕 — 封堵公開主機名稱 → 私有 IP 的繞過方式。
   - **故障時封閉**：DNS 解析失敗時會拒絕該 URL。
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`)：在擷取時重新套用僅限公開位址的 URL 防護，並**封鎖重新導向**（不允許公開位址 → 私有位址的 `30x` 樞紐跳轉）。

URL 未通過任一層防護時不會中止要求 — 市集會靜默回退至內建的種子登錄檔，並記錄警告。

> 此防護已在 PR #3774 中強化，明確解析 A + AAAA，並使用標準的 `isPrivateHost`，取代僅檢查 IPv4 的機制。

### 外掛程式執行隔離

- **行程隔離** — `loadPlugin()` (`src/lib/plugins/loader.ts`) 會在個別的 Node.js 子行程中衍生每個外掛程式，並透過 IPC 通訊。
  Hook 呼叫設有逾時，並依 `SIGTERM` → `SIGKILL` 的順序逐級終止。
- **環境變數允許清單** — 子行程只會收到允許清單中的環境變數；只有當資訊清單要求 `env` 權限時，才會授予較完整的集合。
- **路徑限制** — 安裝／升級／解除安裝會先確認外掛程式目錄與 `manifest.main` 解析後位於受管理的外掛程式根目錄**之內**，才會執行任何複製或遞迴刪除（防止遭竄改的資料庫路徑，以及 `manifest.main` 中的 `../` 路徑遍歷）。啟用時會透過 `realpath` 解析符號連結，並拒絕載入逸出外掛程式目錄的進入點。
- **選用的完整性固定值** — 資訊清單可宣告 `integrity`
  (`sha256-<base64>`，SRI 格式) 欄位。若存在此欄位，載入器會在載入時驗證進入點檔案的雜湊值，若不相符則拒絕啟用。這是選用的竄改偵測機制，**並非**安全邊界 — 僅限迴路介面的路由與權限模型才是真正的安全邊界。

## 資訊清單 (`plugin.json`)

由 `PluginManifestSchema` (`src/lib/plugins/manifest.ts`) 驗證：

| 欄位               | 類型      | 說明                                                     |
| ------------------ | --------- | -------------------------------------------------------- |
| `name`             | string    | 必填；kebab-case (`^[a-z0-9-]+$`)，1–100 個字元          |
| `version`          | string    | 必填；semver (`MAJOR.MINOR.PATCH`)                       |
| `description`      | string?   | ≤ 500 個字元                                             |
| `author`           | string?   | ≤ 200 個字元                                             |
| `license`          | string?   | 預設為 `MIT`                                             |
| `main`             | string?   | 進入點檔案；預設為 `index.js`                            |
| `source`           | enum?     | `local` \| `marketplace`（預設為 `local`）               |
| `tags`             | string[]? | 搜尋標籤                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                          |
| `hooks`            | object?   | 宣告外掛程式實作哪些 Hook 的布林值                       |
| `skills`           | object[]? | 選用的技能定義                                           |
| `enabledByDefault` | boolean?  | 安裝時自動啟用                                           |
| `configSchema`     | object?   | 設定欄位的對映表（`string`/`number`/`boolean`/`select`） |
| `integrity`        | string?   | 選用的 `sha256-<base64>` 進入點檔案固定值                |

權限取自以下列舉值：
`network` / `file-read` / `file-write` / `env` / `exec`。

## 生命週期流程

```
安裝（POST /api/plugins，路徑）
  → 掃描／驗證資訊清單 → 複製到暫存區 → 確認主檔案位於目錄內
  → 以不可分割方式重新命名至 ~/.omniroute/plugins/<name> → 插入資料庫資料列
  → 觸發 onInstall → 若 enabledByDefault：啟用

啟用（POST /api/plugins/{name}/activate）
  → realpath 包含範圍檢查 → loadPlugin()（產生子程序）
  → 註冊已宣告的掛鉤 → 狀態 = "active" → 觸發 onActivate

停用（POST /api/plugins/{name}/deactivate）
  → 觸發 onDeactivate（在取消註冊之前）→ 取消註冊掛鉤
  → 終止子程序 → 狀態 = "inactive"

解除安裝（DELETE /api/plugins/{name}）
  → 若為啟用狀態則停用 → 觸發 onUninstall
  → 經包含範圍檢查後，遞迴刪除外掛程式目錄 → 刪除資料庫資料列
```

若對某個目錄重新執行 `install`，且其資訊清單版本**嚴格高於**
已安裝的版本，則會自動升級（全新重新安裝；設定重設為
預設值）。相同或更舊的版本將被拒絕。

## 資料庫

資料表 `plugins`（遷移 `076_create_plugins.sql`）：

| 欄位            | 類型    | 備註                                             |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | 唯一                                             |
| `version`       | TEXT    | semver；預設為 `1.0.0`                           |
| `description`   | TEXT    | 選填                                             |
| `author`        | TEXT    | 選填                                             |
| `license`       | TEXT    | 預設為 `MIT`                                     |
| `main`          | TEXT    | 進入點檔案；預設為 `index.js`                    |
| `source`        | TEXT    | 預設為 `local`                                   |
| `tags`          | TEXT    | JSON 陣列；預設為 `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1；預設為 0                                    |
| `manifest`      | TEXT    | 完整的資訊清單 JSON                              |
| `config`        | TEXT    | JSON；預設為 `{}`                                |
| `config_schema` | TEXT    | JSON；預設為 `{}`                                |
| `hooks`         | TEXT    | 已宣告掛鉤名稱的 JSON 陣列；預設為 `[]`          |
| `permissions`   | TEXT    | JSON 陣列；預設為 `[]`                           |
| `plugin_dir`    | TEXT    | 絕對安裝目錄                                     |
| `error_message` | TEXT    | 當 `status = "error"` 時設定                     |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | 啟用時設定                                       |

外掛程式的指標／分析資料會記錄在其他資料表中
（`090_plugin_metrics.sql`、`091_plugin_analytics.sql`）。

## 儀表板

位於 `/dashboard/plugins`
（`src/app/(dashboard)/dashboard/plugins/page.tsx`）的儀表板頁面提供兩個分頁：

- **已安裝** — 列出已安裝的外掛程式及其宣告的掛鉤、啟用／停用切換開關、解除安裝按鈕，以及「掃描外掛程式」操作（`POST /api/plugins/scan`）。
- **市集** — 顯示來自 `GET /api/plugins/marketplace` 的目錄，並提供用於設定自訂登錄庫 URL 的欄位。

各外掛程式的設定頁面位於 `/dashboard/plugins/[name]/config`
（`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`）。

## 另請參閱

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` 為何僅限回環存取（第 1 級）
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — 相關的技能框架
  (`src/lib/skills/`)；外掛程式可在其資訊清單中宣告技能
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — 事件驅動的對外
  整合
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  每個外掛程式路由用於錯誤回應的 `buildErrorBody()` 模式
