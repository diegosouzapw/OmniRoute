# ADR: Pluggable persistence boundary (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md)

---

- **狀態：** 提議中 — 在執行階段相關工作開始前，需要維護者核准
- **追蹤議題：** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **範圍：** 僅限持久化架構；此決策不會新增或選定外部資料庫

## 背景

OmniRoute 目前從 `src/lib/db/` 提供以領域為導向的持久化函式，而由 `src/lib/db/core.ts` 傳回的共用連線，則實作了 `src/lib/db/adapters/types.ts` 中的同步 `SqliteAdapter` 契約。該適配器支援數種 SQLite 執行階段，但其介面仍採用 SQLite 的設計形態：同步預備陳述式、`pragma`、延遲與立即交易、原生／檔案複製備份、檢查點，以及本機資料庫控制代碼。

目前的啟動與復原路徑也負責管理 SQLite 檔案生命週期。`src/lib/db/core.ts` 解析 `storage.sqlite`、維護單一行程全域適配器、為 WAL 建立檢查點、在復原期間保留指定資料表，並在重建資料庫時移除 SQLite 伴隨檔案。`src/lib/db/adapters/driverFactory.ts` 中的驅動程式選擇邏輯會在支援的 SQLite 執行階段之間進行選擇；它並非外部後端的抽象層。

結構描述演進也具有類似的耦合。`src/lib/db/migrationRunner.ts` 會套用帶編號的 SQL 檔案、探查 `sqlite_master` 與 `PRAGMA table_info`、偵測選用的 FTS5 支援，並在 SQLite 交易中執行遷移工作。`src/lib/db/backup.ts` 與 `src/lib/db/optimizationSettings.ts` 等維運模組會直接使用備份、`PRAGMA`、WAL、頁面大小、自動清理，以及 `VACUUM` 語意。

這些都是嵌入式 SQLite 部署的合理特性。應繼續保留這些特性，而不強迫 PostgreSQL 或 MySQL 模擬 SQLite API。

## 決策

為可攜式的持久狀態採用兩層持久化邊界：

1. **領域儲存庫契約**定義業務與路由程式碼所需的持久化操作。呼叫端依賴領域行為與領域資料，而非 SQL 文字、預備陳述式、資料庫檔案或方言物件。
2. **內部非同步後端契約**透過交易上下文、健康狀態／就緒狀態、遷移協調、後端能力及分類錯誤來支援儲存庫實作。確切的 TypeScript 介面將隨第一個實作 PR 一同提出，並由一致性測試加以驗證；此 ADR 刻意不凍結推測性的 API。

SQLite 仍是預設實作。現有的 SQLite 驅動程式級聯選擇與同步 `SqliteAdapter` 會保留在 SQLite 儲存庫實作之後，同時以小型垂直切片逐步遷移各領域。使用者無須設定外部服務。

在以 SQLite 驗證儲存庫邊界後，PostgreSQL 將是第一個提議的外部實作。MySQL 隨後會作為同等實作，針對相同的一致性測試套件進行驗證，而非成為第二個業務邏輯分支。

## 邊界規則

### 可攜式儲存庫介面

可攜式儲存庫可以公開：

- 領域讀取與寫入；
- 明確的原子操作，以及交易範圍內的儲存庫存取；
- 當並行語意屬於領域的一部分時，提供比較／更新或租約操作；
- 與後端無關的分頁、排序及約束錯誤。

後端健康狀態、就緒狀態及遷移協調屬於內部後端／維運契約，而非個別領域儲存庫。

可攜式儲存庫不得公開：

- `prepare`、`get`、`all`、`run` 或原始驅動程式控制代碼；
- `PRAGMA`、WAL 檢查點模式、`VACUUM` 或頁面／快取調校；
- SQLite 檔案路徑、伴隨檔案或檔案複製備份；
- 將 `lastInsertRowid` 作為跨後端領域契約；
- FTS5 或 `sqlite-vec` 語法；
- 由一般業務程式碼使用的通用方言逃生出口。

### 後端能力介面

後端特有行為會維持明確且可探索。僅限 SQLite 的維護功能會保留在其專屬實作與維運介面之後，包括：

- 執行階段驅動程式選擇；
- WAL 檢查點與 SQLite 關閉行為；
- 頁面大小、快取大小及自動清理設定；
- 資料庫檔案備份、還原及復原；
- SQLite 結構描述內省；
- FTS5 與 `sqlite-vec` 整合。

外部後端無須模仿這些功能。儲存庫必須使用可攜式能力、提供具有文件化行為的後端特定實作，或回報能力無法使用。

## 交易與遷移模型

儲存庫 API 定義原子性業務操作；呼叫端不選擇 SQL 交易模式。
每個操作都必須定義其可觀察的並行處理保證：受保護的不變量、衝突偵測、
重試分類、冪等性要求，以及交易上下文傳播。
只有在這些可觀察保證維持等效的情況下，實作才可使用不同的交易與隔離機制。只要符合操作契約，
SQLite 內部可繼續使用其目前的延遲或立即交易行為。

外部後端需要明確的遷移擁有權，避免多個應用程式複本競逐相同的結構描述變更。
後端遷移歷程可以共用邏輯里程碑，但不得假設 SQLite SQL
檔案可移植至或重複用於其他方言。

## 跨後端一致性語意

一致性測試必須涵蓋行為，而不僅是儲存庫方法簽章。每個已遷移的領域
都必須定義並驗證：

- 時間戳記的時區、精確度與序列化；
- `NULL` 排序、定序規則與區分大小寫的預期；
- JSON 表示法與比較行為；
- 整數、小數與貨幣的精確度；
- 分頁的穩定排序與確定性同值排序準則；
- 不依賴 SQLite 資料列 ID 的 ID 產生方式；
- 唯一性與外部索引鍵違規分類；
- 無操作、比較／更新及刪除操作的受影響資料列行為；
- 並行寫入結果、可重試衝突與冪等重試。

若某個領域無法陳述等效的可觀察語意，則其尚不可移植，並且在該契約完成設計之前，
必須維持後端專屬。

## 相容性要求

任何遵循此 ADR 的實作都必須保留以下特性：

- SQLite 維持為零設定的預設選項。
- 現有 SQLite 檔案與遷移歷程維持可讀。
- npm、Electron、Docker，以及受限執行環境中的 SQLite 備援機制，保留其目前的啟動路徑。
- 已儲存的提供者憑證繼續使用現有的應用程式加密行為。
- 儲存庫遷移不得默默變更路由、配額、API 金鑰或稽核語意。
- 備份與復原行為須依後端分別記錄，而不得描述為通用行為。
- 純 SQLite 的全新安裝不會載入或要求外部資料庫驅動程式。

## 交付順序

1. 將可重現的 SQLite 耦合清單發布為獨立的審查成品。
2. 引入第一批領域儲存庫契約與一致性測試。
3. 在不變更預設行為的情況下，調整現有 SQLite 實作以置於這些契約之後。
4. 經維護者核准後，將 PostgreSQL 新增為第一個外部實作，套用於一個
   範圍受限的控制平面切片。
5. 只有在具備並行寫入與遷移擁有權測試後，才擴展共享狀態。
6. 在宣告支援資料庫切換之前，新增離線且經驗證的 SQLite 至外部資料庫遷移路徑。
7. 依據已驗證的儲存庫與後端契約新增 MySQL。

每個執行階段步驟都必須是獨立且可審查的 PR。不得以後續步驟為由，
合理化在較早步驟中合併尚未驗證的抽象化設計。

## 第一個實作切片

第一個執行階段切片應在檢視耦合清單後選定。提供者連線、API 金鑰、組合及路由設定皆是候選項目，因為其基礎資料表可在 `src/lib/db/core.ts` 中看到，但此 ADR 並未核准任何資料表清單或遷移 PR。
此切片必須包含：

- SQLite 行為保留測試；
- 儲存庫一致性測試；
- 明確的交易邊界；
- 對已儲存憑證進行加密及遮蔽驗證；
- 不變更預設啟動設定。

## 已考慮的替代方案

### 在 `SqliteAdapter` 下方加入 PostgreSQL

否決。`SqliteAdapter` 是 SQLite 執行環境的相容層，並公開 SQLite 特有的操作。模擬此介面會使同步及特定方言的假設滲漏至新的後端。

### 向所有領域公開通用的查詢／執行 API

否決作為主要邊界。這會集中處理連線，但仍將 SQL 方言、交易及資料表耦合留在業務模組中。低階後端基礎元件可以存在於儲存庫實作內部，但不應作為面向應用程式的持久化 API。

### 在驗證單一切片前重寫所有持久化機制

否決。目前的持久化介面範圍廣泛，涵蓋檔案生命週期、復原、搜尋及營運設定。垂直切片可提供可供審查的行為及回復邊界。

### 取代 SQLite 作為預設值

否決。嵌入式及桌面部署依賴目前不需額外服務的啟動模式。外部後端為選用功能。

### 使用 Redis 作為持久性權威來源

否決。Redis 可支援明確定義為暫時性的協調、快取或計數器，但無法取代此處所述的持久性儲存庫契約。

## 後果

### 正面影響

- 業務程式碼獲得不受資料庫方言影響的穩定持久化接合點。
- 在由外部後端定義抽象之前，先測試 SQLite 行為。
- PostgreSQL 與 MySQL 共用契約及測試，而非重複領域邏輯。
- SQLite 專屬功能維持為一級功能，而不會成為洩漏實作細節的相容性墊片。
- 多複本遷移及交易行為成為明確的設計考量。

### 成本與風險

- 儲存庫抽取需要漸進式遷移呼叫端。
- 非同步邊界可能會擴散至目前採用同步方式的服務程式碼。
- 跨後端語意需要超越 SQL 語法相容性的契約一致性測試。
- 備份、搜尋、向量儲存及維護仍為特定能力。
- 執行多種持久化實作會增加 CI 及營運支援成本。

## 非目標

此 ADR 不會：

- 新增資料庫相依套件、環境變數、結構描述或遷移；
- 變更現行的 SQLite 單例或驅動程式級聯機制；
- 承諾在特定版本中支援 PostgreSQL 或 MySQL；
- 使 FTS5、`sqlite-vec`、備份檔案或 SQLite 維護功能具備可攜性；
- 在共享狀態及協調測試存在之前定義主動－主動就緒條件；
- 核准一次性重寫 `src/lib/db/`。

## 待維護者核准的開放問題

1. 儲存庫加上內部非同步後端邊界是否為偏好的方向，或者外部持久化應置於獨立的控制平面服務之後？
2. 在符合 SQLite 規範之後，PostgreSQL 是否可作為第一個外部實作？
3. 哪個領域應作為第一個有界的儲存庫切片？
4. 第一個多副本里程碑必須共享哪些狀態，而哪些狀態仍維持為節點本機狀態？
5. 對於中斷或回復的儲存庫遷移，需要多長的相容性期間？

在這些問題獲得解決之前，本文僅為提案，並不表示會進行任何執行階段重構。
